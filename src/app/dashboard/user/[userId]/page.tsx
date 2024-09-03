import ClientContextWrapper from "@/components/client/ClientContextWrapper";
import EmployeeAssignmentList from "@/components/users/EmployeeAssignmentList";
import { getProfileByIdApi } from "@/lib/supabase/profiles";

const UserDetail = async ({ params }: { params: { userId: string } }) => {
  const client = await getProfileByIdApi(params.userId);

  return (
    <ClientContextWrapper client={client}>
      <EmployeeAssignmentList />
    </ClientContextWrapper>
  );
};

export default UserDetail;
