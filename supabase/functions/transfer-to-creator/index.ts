// transfer-to-creator/index.ts
import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import Stripe from "npm:stripe@13.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface TransferToCreatorParams {
  transaction_id: string;
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

    const { transaction_id }: TransferToCreatorParams = await req.json();

    if (!transaction_id) {
      throw new Error("Missing transaction_id parameter");
    }

    // Get the transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .select(`
        *,
        deal:deal_id(
          *,
          campaign_match:campaign_match_id(
            *,
            creator:creator_id(*)
          )
        )
      `)
      .eq("id", transaction_id)
      .single();

    if (transactionError || !transaction) {
      throw new Error(`Transaction not found: ${transaction_id}`);
    }

    // Ensure the transaction is of the right type
    if (transaction.type !== "escrow_capture") {
      throw new Error(`Invalid transaction type: ${transaction.type}`);
    }

    // Ensure the transaction doesn't already have a transfer ID
    if (transaction.stripe_transfer_id) {
      throw new Error("Transaction already has a transfer ID");
    }

    // Calculate the amount to transfer (85% of the transaction amount)
    const transferAmount = Math.round(transaction.amount * 0.85 * 100); // Convert to cents

    // Get the creator's Stripe account ID
    const creatorId = transaction.deal.campaign_match.creator_id;
    const { data: creator, error: creatorError } = await supabase
      .from("user_profiles")
      .select("stripe_account_id")
      .eq("id", creatorId)
      .single();

    if (creatorError || !creator || !creator.stripe_account_id) {
      throw new Error("Creator has no Stripe account");
    }

    // Create a transfer to the creator
    const transfer = await stripe.transfers.create({
      amount: transferAmount,
      currency: "usd",
      destination: creator.stripe_account_id,
      metadata: {
        transaction_id: transaction.id,
        deal_id: transaction.deal_id,
      },
    });

    // Create a new transaction for the creator payout
    const { data: payoutTransaction, error: payoutError } = await supabase
      .from("transactions")
      .insert({
        deal_id: transaction.deal_id,
        amount: transferAmount / 100, // Convert back to dollars
        currency: "usd",
        type: "creator_payout",
        stripe_transfer_id: transfer.id,
      })
      .select()
      .single();

    if (payoutError) {
      throw new Error(`Error creating payout transaction: ${payoutError.message}`);
    }

    // Update the original transaction with the transfer ID
    await supabase
      .from("transactions")
      .update({
        stripe_transfer_id: transfer.id,
      })
      .eq("id", transaction_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Transfer to creator successful",
        transfer_id: transfer.id,
        payout_transaction_id: payoutTransaction.id,
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