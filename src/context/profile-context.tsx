"use client";

import { ProfileModel } from "@/lib/models/Profile";
import { Skeleton } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type MeType = {
  session: User;
  profile: ProfileModel;
};

type ProfileContext = {
  me: MeType | undefined;
};

export const ProfileContext = createContext<ProfileContext>({
  me: undefined,
});

const ProfileProvider = ({
  children,
  ...props
}: {
  children: ReactNode;
  me: MeType;
}) => {
  const [me, setMe] = useState<MeType | undefined>();

  useEffect(() => {
    if (props.me) setMe(props.me);
  }, [props.me]);

  return (
    <ProfileContext.Provider value={{ me }}>
      <Skeleton visible={!me}>{children}</Skeleton>
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
export default ProfileProvider;
