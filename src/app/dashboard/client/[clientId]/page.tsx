import { getProfileByIdApi } from "@/lib/supabase/profiles";
import ClientPage from "@/components/client/ClientPage";
import { Suspense } from "react";

const UserDetail = async ({ params }: { params: { clientId: string } }) => {
  const client = await getProfileByIdApi(params.clientId);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ClientPage client={client} />
    </Suspense>
  );
};

export default UserDetail;
