// affiliate-webhook-handler/index.ts
import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import Stripe from "npm:stripe@13.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface AffiliateWebhookPayload {
  legit_url: string;
  sale_amount: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey || !stripeSecretKey) {
      throw new Error("Missing environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const { legit_url, sale_amount }: AffiliateWebhookPayload = await req.json();

    if (!legit_url || sale_amount === undefined) {
      throw new Error("Missing required parameters");
    }

    // Find the affiliate link
    const { data: affLink, error: affLinkError } = await supabase
      .from("aff_links")
      .select("*, creator:creator_id(stripe_account_id)")
      .eq("legit_url", legit_url)
      .single();

    if (affLinkError || !affLink) {
      throw new Error(`Affiliate link not found: ${legit_url}`);
    }

    // Update clicks and sales
    const { error: updateError } = await supabase
      .from("aff_links")
      .update({
        sales: affLink.sales + 1,
      })
      .eq("id", affLink.id);

    if (updateError) {
      throw new Error(`Error updating affiliate link: ${updateError.message}`);
    }

    // Calculate payout amount
    const payoutAmount = affLink.payout_per_sale;

    // Create a transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        aff_link_id: affLink.id,
        amount: payoutAmount,
        currency: "usd",
        type: "affiliate_payout",
      })
      .select()
      .single();

    if (transactionError) {
      throw new Error(`Error creating transaction: ${transactionError.message}`);
    }

    // Transfer funds to creator if they have a Stripe account
    if (affLink.creator?.stripe_account_id) {
      const transfer = await stripe.transfers.create({
        amount: Math.round(payoutAmount * 100), // Convert to cents
        currency: "usd",
        destination: affLink.creator.stripe_account_id,
        metadata: {
          affiliate_link_id: affLink.id,
          transaction_id: transaction.id,
        },
      });

      // Update transaction with Stripe transfer ID
      await supabase
        .from("transactions")
        .update({
          stripe_transfer_id: transfer.id,
        })
        .eq("id", transaction.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Affiliate sale recorded successfully",
        transaction_id: transaction.id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        status: 400,
      }
    );
  }
});