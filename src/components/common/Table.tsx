"use client";

import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DataTable } from "mantine-datatable";
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

const PAGE_SIZE = 10;

const Table = ({
  columns = dummy_columns,
  records = dummy_rows,
  page_size = PAGE_SIZE,
}: any) => {
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState(records.slice(0, page_size));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setTableData(records.slice(from, to));
  }, [page]);

  return (
    <DataTable
      withTableBorder
      borderRadius="md"
      striped
      highlightOnHover
      records={tableData}
      columns={columns}
      totalRecords={tableData.length}
      recordsPerPage={10}
      page={1}
      onPageChange={(p) => setPage(p)}
      onRowClick={({ record: { name, party, bornIn } }: any) =>
        showNotification({
          title: `Clicked on ${name}`,
          message: `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`,
          withBorder: true,
        })
      }
    />
  );
};

export default Table;
