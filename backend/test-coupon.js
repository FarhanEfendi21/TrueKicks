import supabase from "./config/supabase.js";

async function testCoupon() {
    console.log("Testing Supabase Connection for Coupons...");

    const code = "WELCOME10";

    try {
        const { data, error } = await supabase
            .from("coupons")
            .select("*")
            .eq("code", code)
            .single();

        if (error) {
            console.error("❌ ERROR:", error.message);
            console.error("Details:", error);
        } else if (!data) {
            console.error("❌ Coupon not found (Data is null)");
        } else {
            console.log("✅ SUCCESS! Coupon found:", data);
        }
    } catch (err) {
        console.error("❌ UNEXPECTED ERROR:", err);
    }
}

testCoupon();
