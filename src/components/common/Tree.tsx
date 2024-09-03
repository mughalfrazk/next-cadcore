"use client";

import { ReactNode } from "react";
import {
  Tree as MantineTree,
  TreeNodeData,
  RenderTreeNodePayload,
} from "@mantine/core";
import classes from "./Tree.module.css";

export const dummy_data: TreeNodeData[] = [
  {
    label: "src",
    value: "src",
    children: [
      {
        label: "components",
        value: "src/components",
        children: [
          { label: "Accordion.tsx", value: "src/components/Accordion.tsx" },
          { label: "Tree.tsx", value: "src/components/Tree.tsx" },
          { label: "Button.tsx", value: "src/components/Button.tsx" },
        ],
      },
    ],
  },
  {
    label: "node_modules",
    value: "node_modules",
    children: [
      {
        label: "react",
        value: "node_modules/react",
        children: [
          { label: "index.d.ts", value: "node_modules/react/index.d.ts" },
          { label: "package.json", value: "node_modules/react/package.json" },
        ],
      },
      {
        label: "@mantine",
        value: "node_modules/@mantine",
        children: [
          {
            label: "core",
            value: "node_modules/@mantine/core",
            children: [
              {
                label: "index.d.ts",
                value: "node_modules/@mantine/core/index.d.ts",
              },
              {
                label: "package.json",
                value: "node_modules/@mantine/core/package.json",
              },
            ],
          },
          {
            label: "hooks",
            value: "node_modules/@mantine/hooks",
            children: [
              {
                label: "index.d.ts",
                value: "node_modules/@mantine/core/index.d.ts",
              },
              {
                label: "package.json",
                value: "node_modules/@mantine/core/package.json",
              },
            ],
          },
          {
            label: "form",
            value: "node_modules/@mantine/form",
            children: [
              {
                label: "index.d.ts",
                value: "node_modules/@mantine/core/index.d.ts",
              },
              {
                label: "package.json",
                value: "node_modules/@mantine/core/package.json",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "package.json",
    value: "package.json",
  },
  {
    label: "tsconfig.json",
    value: "tsconfig.json",
  },
];

const LeafItem = ({ node }: RenderTreeNodePayload) => {
  return node.label;
};

const Tree = ({
  data = dummy_data,
  renderNode = LeafItem,
}: {
  data?: TreeNodeData[];
  renderNode?: (payload: RenderTreeNodePayload) => ReactNode;
}) => {
  const Leaf = renderNode;

  return (
    <MantineTree
      data={data}
      mb={12}
      className={classes.tree}
      style={{
        border: "1px solid var(--app-shell-border-color)",
        borderRadius: "0.4rem",
      }}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
};

export default Tree;
