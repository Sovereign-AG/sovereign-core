import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const client = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY || ''
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { amount, type, orgId } = await request.json();

    // Institutional Verification: Only allow authenticated entities to trigger settlement
    if (!session && !orgId) {
      return NextResponse.json({ error: "Unauthorized Institutional Access" }, { status: 401 });
    }

    const payment = await client.payments.create({
      billing: {
        city: "Mumbai",
        country: "IN",
        state: "Maharashtra",
        street: "Institutional Zone",
        zipcode: "400001"
      },
      customer: {
        email: session?.user?.email || "billing@sovereign.ag",
        name: session?.user?.name || "Sovereign Institutional Actor"
      },
      product_cart: [
        {
          quantity: 1,
          product_id: type === 'TOP_UP' ? "prd_credits" : "prd_settlement",
          amount: Math.round(amount * 100) // Convert to cents
        }
      ],
      metadata: {
        org_id: orgId || "GLOBAL_ADMIN",
        payment_type: type
      }
    });

    return NextResponse.json({ 
      url: typeof payment === 'object' && payment !== null && 'payment_link' in payment ? payment.payment_link : null 
    });

  } catch (error) {
    console.error("[DODO_CHECKOUT_ERROR]:", error);
    return NextResponse.json({ error: "Handshake with Dodo failed" }, { status: 500 });
  }
}
