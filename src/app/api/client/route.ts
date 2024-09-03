import { getClientListApi } from "@/lib/supabase/profiles";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getClientListApi()
  return NextResponse.json(result)
}