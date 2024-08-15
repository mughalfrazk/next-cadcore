"use server";

import { Fragment } from "react";
import { Card, TreeNodeData } from "@mantine/core";

import FileStructure from "../common/Tree";
import Leaf from "./LeafItem";
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
