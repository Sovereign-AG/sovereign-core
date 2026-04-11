import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';

const apiKey = 'JaC0TCpdEFJGjmoz.bQgQydzDTzBxVGjxZNoOmDPk8kvM9XuDVac5JOaGAF5GEI3l';

const client = new DodoPayments({
  bearerToken: apiKey
});

export async function POST() {
  try {
    // Basic test creation for Dodo Payment Link
    const payment = await client.payments.create({
      billing: {
        city: "San Francisco",
        country: "US",
        state: "CA",
        street: "Enterprise Road",
        zipcode: "94103"
      },
      customer: {
        email: "ciso@sovereign.ag",
        name: "Security Lead"
      },
      product_cart: [
        {
          quantity: 1,
          product_id: "prd_institutional_baseline", // Standardizing on institutional product IDs
          amount: 10000 // $100.00 baseline in cents
        }
      ],
    });

    return NextResponse.json({ url: typeof payment === 'object' && payment !== null && 'payment_link' in payment ? payment.payment_link : null });
  } catch (error) {
    console.error("Dodo error details:", error);
    return NextResponse.json({ error: "Failed to initialize Dodo check-out" }, { status: 500 });
  }
}
