import React, { useState } from "react";
import { Skeleton } from "@mantine/core";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type Column<T> = {
  header: string;
  accessor: keyof T;
  Cell?: (props: { value: any; row: T }) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  onSort?: (header: string, sortOrder: "asc" | "desc") => void;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading,
  onSort,
}: DataTableProps<T>) => {
  const [sortState, setSortState] = useState<{
    header: string;
    order: "asc" | "desc" | null;
  }>({
    header: "",
    order: null,
  });

  const handleSort = (header: string) => {
    let newOrder: "asc" | "desc" = "asc";

    if (sortState.header === header && sortState.order === "asc") {
      newOrder = "desc";
    }

    setSortState({ header, order: newOrder });

    if (onSort) {
      onSort(header, newOrder);
    }
  };

  const getSortIcon = (header: string) => {
    if (sortState.header === header) {
      return sortState.order === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-500 bg-white table-fixed min-w-[600px] sm:min-w-full">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-3 text-sm font-semibold text-gray-600 text-center cursor-pointer"
              >
                {loading ? (
                  <Skeleton height={20} width={100} />
                ) : (
                  <div
                    className="flex justify-between items-center gap-2 sm:justify-center"
                    onClick={() => handleSort(column.accessor as string)}
                  >
                    <span className="truncate">{column.header}</span>
                    {column.accessor !== "id" &&
                      column.accessor !== "action" &&
                      getSortIcon(column.header)}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-500 bg-white table-fixed min-w-[600px] sm:min-w-full">
          <tbody>
            {loading ? (
              [...Array(10)].map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td key={column.header} className="px-4 py-3">
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className="px-4 py-3 text-center text-gray-800"
                    >
                      {column.Cell
                        ? column.Cell({ value: row[column.accessor], row })
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
