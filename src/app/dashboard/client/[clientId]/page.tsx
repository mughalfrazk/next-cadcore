import { getProfileByIdApi } from "@/lib/supabase/profiles.service";
import ClientPage from "@/components/client/ClientPage";
import { getEmployeeAssignmentByClientApi } from "@/lib/supabase/employee_assignment.service";
import { notFound } from "next/navigation";
import { serverApi } from "@/lib/supabase/serverApi";

const UserDetail = async ({ params }: { params: { clientId: string } }) => {
  const client = await getProfileByIdApi(params.clientId);
  const employeeAssignment = await getEmployeeAssignmentByClientApi(client.id)
  console.log("employeeAssignment: ", employeeAssignment)

  return <ClientPage client={client} />;
};

export default UserDetail;
