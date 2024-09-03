import useAPI from "."

export const useEmployeeAssignmentByEmployeeQuery = (employeeId: string) => {
  return useAPI(employeeId ? `/api/employee-assignment?employeeId=${employeeId}` : null)
}