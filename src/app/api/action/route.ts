import { getAllActionsApi } from "@/lib/supabase/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const result = await getAllActionsApi()
  return NextResponse.json(result)
}