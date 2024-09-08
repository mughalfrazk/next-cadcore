import { NextRequest, NextResponse } from "next/server";
import { getProjectListByClientApi } from "@/lib/supabase/project";

export async function GET(request: NextRequest) {
  // ?clientId={string}
  const clientId = request.nextUrl.searchParams.get("clientId")

  if (!!clientId) {
    const result = await getProjectListByClientApi(clientId)
    return NextResponse.json(result)
  }
}