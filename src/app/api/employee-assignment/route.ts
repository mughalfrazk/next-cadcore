import { getEmployeeAssignmentByEmployeeApi } from "@/lib/supabase/employee_assignment.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ?employeeId={string}
  const employeeId = request.nextUrl.searchParams.get("employeeId")

  if (!!employeeId) {
    const result = await getEmployeeAssignmentByEmployeeApi(employeeId)
    return NextResponse.json(result)
  }
}