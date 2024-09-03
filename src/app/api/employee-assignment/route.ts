import { getEmployeeAssignmentByEmployeeApi } from "@/lib/supabase/employee_assignment";
import { NextRequest, NextResponse } from "next/server";
// { params }: { params: { employeeId: string } }

export async function GET(request: NextRequest) {
  const employeeId = request.nextUrl.searchParams.get("employeeId")

  if (!!employeeId) {
    const result = await getEmployeeAssignmentByEmployeeApi(employeeId)
    return NextResponse.json(result)
  }
}