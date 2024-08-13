import { createClient } from "@/utils/supabase/server";

import CButton from "@/components/core/CButton";
import withAuth from "@/components/hoc/with-auth";
import { logout } from "@/lib/actions/auth";

const PrivatePage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <p>Hello {data?.user?.email}</p>
      <form action={logout}>
        <CButton type="submit">Log out</CButton>
      </form>
    </>
  );
}

export default withAuth(PrivatePage)