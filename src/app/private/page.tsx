import { createClient } from "@/utils/supabase/server";

import CButton from "@/components/core/CButton";
import withAuth from "@/components/hoc/with-auth";
import { logout } from "@/lib/actions/auth";
import { getRolesApi } from "@/lib/supabase/roles";

const PrivatePage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <p>Hello {data?.user?.email}</p>
      <form action={logout}>
        <CButton type="submit">Log out</CButton>
      </form>
      <form action={getRolesApi}>
        <CButton type="submit">Get Role</CButton>
      </form>
    </>
  );
}

export default withAuth(PrivatePage)