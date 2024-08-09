import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export type AuthHocProps = {
  me: User
}

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithAuth: React.FC<P> = async (props) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) redirect("/auth");

    return <Component {...props} me={data?.user} />;
  };
  return WithAuth;
};

export default withAuth;
