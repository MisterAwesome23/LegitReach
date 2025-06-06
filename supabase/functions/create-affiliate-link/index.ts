// create-affiliate-link/index.ts
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface CreateAffiliateLinkParams {
  brand_id: string;
  creator_id: string;
  original_url: string;
  payout_per_sale: number;
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
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { brand_id, creator_id, original_url, payout_per_sale }: CreateAffiliateLinkParams = await req.json();

    if (!brand_id || !creator_id || !original_url || payout_per_sale === undefined) {
      throw new Error("Missing required parameters");
    }

    // Validate the brand exists
    const { data: brand, error: brandError } = await supabase
      .from("user_profiles")
      .select("id, role")
      .eq("id", brand_id)
      .eq("role", "brand")
      .single();

    if (brandError || !brand) {
      throw new Error("Invalid brand_id");
    }

    // Validate the creator exists
    const { data: creator, error: creatorError } = await supabase
      .from("user_profiles")
      .select("id, role")
      .eq("id", creator_id)
      .eq("role", "creator")
      .single();

    if (creatorError || !creator) {
      throw new Error("Invalid creator_id");
    }

    // Generate a unique short code for the affiliate link
    const shortCode = crypto.randomUUID().substring(0, 8);
    const legitUrl = `https://legitreach.app/r/${shortCode}`;

    // Create the affiliate link
    const { data: affLink, error: insertError } = await supabase
      .from("aff_links")
      .insert({
        brand_id,
        creator_id,
        original_url,
        legit_url: legitUrl,
        payout_per_sale,
        clicks: 0,
        sales: 0,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Error creating affiliate link: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        affiliate_link: affLink,
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