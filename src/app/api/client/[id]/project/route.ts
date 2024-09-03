import { getProjectListByClientApi } from "@/lib/supabase/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await getProjectListByClientApi(params.id)
  return NextResponse.json(result)
}