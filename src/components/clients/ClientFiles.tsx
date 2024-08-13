"use server"

import { IconFile3d } from "@tabler/icons-react";
import { Group, rem, RenderTreeNodePayload } from "@mantine/core";

import { ProfileModel } from "@/lib/models/Profile";
import { getListOfFilesApi } from "@/lib/supabase/files";
import { clientApi } from "@/lib/supabase/clientApi";
import FileStructure from "../common/Tree";
import Leaf from "./LeafItem";

type ClientFilesProps = {
  user: ProfileModel;
};

const ClientFiles = async ({ user }: ClientFilesProps) => {
  const files = await getListOfFilesApi(user.email);

  return <FileStructure data={files} renderNode={Leaf} />;
};

export default ClientFiles;
