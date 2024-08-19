"use server";

import { TreeNodeData } from "@mantine/core";

import FileStructure from "../common/Tree";
import Leaf from "./LeafItem";
import { Fragment } from "react";
import HeadingBar from "../common/HeadingBar";

type ClientFilesProps = {
  files: TreeNodeData[];
};

const ClientFiles = async ({ files }: ClientFilesProps) => {
  return (
    <Fragment>
      <HeadingBar
        mt={30}
        title="Project Files"
        description="List of all the project files of the client."
      />
      <FileStructure data={files} renderNode={Leaf} />
    </Fragment>
  );
};

export default ClientFiles;
