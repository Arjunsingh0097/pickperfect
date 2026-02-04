import { NextRequest, NextResponse } from "next/server";

const SHEETY_API_URL =
  process.env.SHEETY_API_URL ||
  "https://api.sheety.co/22fffe6f4f7e7d5b66825989b280ae34/pickPerfectLeads/leads";
const SHEETY_BEARER_TOKEN = process.env.SHEETY_BEARER_TOKEN;

export async function POST(request: NextRequest) {
  let token = (process.env.SHEETY_BEARER_TOKEN ?? "").trim();
  // In case .env included literal quotes around the value, strip them
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1).trim();
  }
  // Collapse any newlines/spaces from pasting into a single space so the header is valid
  token = token.replace(/\s+/g, " ").trim();
  if (!token) {
    console.error("submit-quote: SHEETY_BEARER_TOKEN is not set in .env.local");
    return NextResponse.json(
      { error: "Server missing Sheety configuration. Add SHEETY_BEARER_TOKEN to .env.local and restart the dev server." },
      { status: 503 },
    );
  }
  // Sheety may show "Bearer <token>" in the dashboard; use as-is, else add "Bearer " prefix
  const authHeader =
    /^Bearer\s+/i.test(token) ? token : `Bearer ${token}`;
  if (process.env.NODE_ENV === "development") {
    console.log("submit-quote: auth header length =", authHeader.length);
  }

  type Body = {
    moveType?: string;
    movingFrom?: string;
    movingTo?: string;
    jobType?: string;
    jobTypeDetails?: string;
    movingDate?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    additionalServices?: string;
  };
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const movingFrom = String(body.movingFrom ?? "").trim();
  const movingTo = String(body.movingTo ?? "").trim();
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!movingFrom || !movingTo) {
    return NextResponse.json(
      { error: "Moving from and moving to are required." },
      { status: 400 },
    );
  }
  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "Full name, email and phone are required." },
      { status: 400 },
    );
  }

  const moveTypeLabels: Record<string, string> = {
    local: "Local Move",
    interstate: "Interstate Move",
    international: "International Move",
  };
  const moveType = String(body.moveType ?? "").trim();
  const moveTypeLabel =
    moveTypeLabels[moveType] !== undefined ? moveTypeLabels[moveType] : moveType || "Local Move";

  // Sheety expects camelCase keys in the JSON body (e.g. "First Name" in sheet → "firstName" in API)
  const lead: Record<string, string> = {
    movingType: moveTypeLabel,
    moveFrom: movingFrom,
    moveTo: movingTo,
    jobType: String(body.jobType ?? "").trim(),
    jobTypeDetails: String(body.jobTypeDetails ?? "").trim(),
    movingDate: String(body.movingDate ?? "").trim(),
    fullName: fullName,
    emailAddress: email,
    phoneNumber: phone,
    additionalServices: String(body.additionalServices ?? "").trim(),
  };

  try {
    const res = await fetch(SHEETY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ lead }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Sheety error:", res.status, text);
      let message = "Failed to save lead. Please try again.";
      try {
        const json = JSON.parse(text) as { error?: string; message?: string; errors?: Array<{ detail?: string }> };
        if (json.error) message = json.error;
        else if (json.message) message = json.message;
        else if (json.errors?.[0]?.detail) message = json.errors[0].detail;
      } catch {
        if (text) message = text.slice(0, 200);
      }
      // Suggest token check when Sheety returns auth error
      if (res.status === 401 || res.status === 403) {
        message += " Use the exact Bearer token from Sheety → your project → Authentication (copy again and update .env.local, then restart dev server).";
      }
      return NextResponse.json(
        { error: message, detail: text.slice(0, 500) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Submit quote error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", detail: message },
      { status: 500 },
    );
  }
}
