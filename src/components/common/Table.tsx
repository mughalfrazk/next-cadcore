"use client";

import { Box, useMantineTheme } from "@mantine/core";
import { DataTable, DataTableRowClickHandler } from "mantine-datatable";
import { useEffect, useState } from "react";

const dummy_columns = [
  {
    accessor: "id",
    // this column has a custom title
    title: "#",
    // right-align column
    textAlign: "right",
  },
  { accessor: "name" },
  {
    accessor: "party",
    // this column has custom cell data rendering
    render: ({ party }: any) => (
      <Box fw={700} c={party === "Democratic" ? "blue" : "red"}>
        {party.slice(0, 3).toUpperCase()}
      </Box>
    ),
  },
  { accessor: "bornIn" },
];

const dummy_rows = [
  { id: 1, name: "Joe Biden", bornIn: 1942, party: "Democratic" },
];

const PAGE_SIZE = 30;

type TableProps = {
  data?: unknown[];
  columns?: any;
  page_size?: number;
  onRowClick?: DataTableRowClickHandler<unknown>;
};

const Table = ({
  columns = dummy_columns,
  data = dummy_rows,
  page_size = PAGE_SIZE,
  onRowClick = () => {},
}: TableProps) => {
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, page_size));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page]);

  return (
    <DataTable
      withTableBorder
      borderRadius={theme.defaultRadius}
      striped
      highlightOnHover
      records={data}
      columns={columns}
      minHeight={170}
      onRowClick={onRowClick}
      // totalRecords={records.length}
      // recordsPerPage={page_size}
      // page={1}
      // onPageChange={(p) => setPage(p)}
    />
  );
};

export default Table;
