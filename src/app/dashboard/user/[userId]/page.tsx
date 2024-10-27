import ClientContextWrapper from "@/components/client/ClientContextWrapper";
import EmployeeAssignmentList from "@/components/users/EmployeeAssignmentList";
import { getProfileByIdApi } from "@/lib/supabase/profiles.service";

const UserDetail = async ({ params }: { params: { userId: string } }) => {
  const client = await getProfileByIdApi(params.userId);

  return (
    <ClientContextWrapper client={client}>
      {client.role.name === "employee" ? <EmployeeAssignmentList /> : client.role.name}
    </ClientContextWrapper>
  );
};

export default UserDetail;
