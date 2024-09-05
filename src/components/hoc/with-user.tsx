import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import ProfileProvider from "@/context/profile-context";
import { ProfileModel } from "@/lib/models/Profile";
import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { createClient } from "@/utils/supabase/server";

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
