import { getProfileByIdApi } from "@/lib/supabase/profiles";
import ClientPage from "@/components/client/ClientPage";
import { Suspense } from "react";

const UserDetail = async ({ params }: { params: { clientId: string } }) => {
  const client = await getProfileByIdApi(params.clientId);

  return <ClientPage client={client} />;
};

export default UserDetail;
