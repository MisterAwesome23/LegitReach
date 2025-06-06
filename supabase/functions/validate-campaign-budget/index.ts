// validate-campaign-budget/index.ts
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ValidateCampaignBudgetParams {
  campaign_id: string;
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
    const { campaign_id }: ValidateCampaignBudgetParams = await req.json();

    if (!campaign_id) {
      throw new Error("Missing campaign_id parameter");
    }

    // Fetch the campaign details
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaign_id)
      .single();

    if (campaignError) {
      throw new Error(`Error fetching campaign: ${campaignError.message}`);
    }

    // Simple validation example:
    // Ensure the budget is at least $300
    const minBudget = 300;
    const isValid = campaign.total_budget >= minBudget;
    
    // Calculate recommended budget based on objective
    let recommendedBudget = minBudget;
    
    if (campaign.objective === "impressions") {
      recommendedBudget = Math.max(minBudget, campaign.min_price_per_creator * 5);
    } else if (campaign.objective === "conversions") {
      recommendedBudget = Math.max(minBudget, campaign.min_price_per_creator * 7);
    } else if (campaign.objective === "affiliate") {
      recommendedBudget = Math.max(minBudget, campaign.min_price_per_creator * 3);
    }

    // Update the campaign status if valid
    if (isValid) {
      const { error: updateError } = await supabase
        .from("campaigns")
        .update({ status: "live" })
        .eq("id", campaign_id);

      if (updateError) {
        throw new Error(`Error updating campaign status: ${updateError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        is_valid: isValid,
        message: isValid 
          ? "Campaign budget is valid" 
          : `Campaign budget is too low. Minimum budget is $${minBudget}`,
        recommended_budget: recommendedBudget,
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