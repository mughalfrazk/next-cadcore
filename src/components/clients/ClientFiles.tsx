"use server";

import { Card, TreeNodeData } from "@mantine/core";

import { ProfileModel } from "@/lib/models/Profile";
import FileStructure from "../common/Tree";
import Leaf from "./LeafItem";
import { Fragment } from "react";
import Viewer from "../viewer";

type ClientFilesProps = {
  files: TreeNodeData[];
};

const ClientFiles = async ({ files }: ClientFilesProps) => {
  return (
    <Fragment>
      <FileStructure data={files} renderNode={Leaf} />
      <Card withBorder mb={12} p={0}>
        <Viewer />
      </Card>
    </Fragment>
  );
};

export default ClientFiles;
