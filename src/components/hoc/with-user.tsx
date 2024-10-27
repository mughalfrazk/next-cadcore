import { redirect } from "next/navigation";

import { getProfileByIdApi } from "@/lib/supabase/profiles.service";
import { createClient } from "@/utils/supabase/server";
import { ProfileModel } from "@/lib/models/Profile";

export type UserHocProps = {
  me: ProfileModel;
};

const withUser = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithUser: React.FC<P> = async (props) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) redirect("/auth");

    const profile = await getProfileByIdApi(data.user.id);

    return <Component {...props} me={profile} />;
  };
  return WithUser;
};

export default withUser;
