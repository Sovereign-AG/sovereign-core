import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import DodoPayments from 'dodopayments';

const DODO_API_KEY = process.env.DODO_API_KEY;

// Only initialize Dodo if key is present
const client = DODO_API_KEY ? new DodoPayments({
  bearerToken: DODO_API_KEY
}) : null;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { amount, type, orgId } = await request.json();

    if (!session && !orgId) {
      return NextResponse.json({ error: "Unauthorized Institutional Access" }, { status: 401 });
    }

    // --- INSTITUTIONAL SIMULATION MODE ---
    // If no API key is found, we trigger the simulation rail so the user can test the UI flow.
    if (!client) {
      console.warn("[SIMULATION_MODE]: DODO_API_KEY not found. Simulating institutional handshake.");
      
      // We return a mock checkout URL that points to a local simulation page
      return NextResponse.json({ 
        url: `/dashboard/billing/simulate?amount=${amount}&type=${type}`,
        isSimulation: true
      });
    }

    // --- PRODUCTION RAIL (DODO PAYMENTS) ---
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

  } catch (error: any) {
    console.error("[DODO_CHECKOUT_ERROR]:", error);
    return NextResponse.json({ 
      error: "Handshake failed", 
      message: error?.message || "Unknown error"
    }, { status: 500 });
  }
}
