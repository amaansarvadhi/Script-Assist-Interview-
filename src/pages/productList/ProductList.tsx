import React, { useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import { Select, Pagination } from "@mantine/core";
import DataTable from "@/components/DataTable";
import {
  apiFetchCategories,
  apiFetchProducts,
} from "@/services/ApiProductService";
import { AiOutlineEye } from "react-icons/ai";
import Input from "@/components/Input";
import useProductStore from "@/store/slices/productSlice";
import {
  calculateTotalPages,
  formatCategoryOptions,
  pageSizeOptions,
} from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  // Use zustand store for state management
  const {
    search,
    category,
    sort,
    order,
    page,
    limit,
    setSearch,
    setCategory,
    setPage,
    setLimit,
    setSort,
    setOrder,
  } = useProductStore();

  const [
    { data: productsData, isLoading: isLoadingProducts },
    { data: categoriesData },
  ] = useQueries({
    queries: [
      {
        queryKey: ["products", { search, category, sort, order, page, limit }],
        queryFn: () =>
          apiFetchProducts(search, category, sort, order, page, limit),
      },
      {
        queryKey: ["categories"],
        queryFn: apiFetchCategories,
      },
    ],
  });

  const columns = [
    { header: "Product Id", accessor: "id" },
    { header: "Name", accessor: "title" },
    {
      header: "Thumbnail",
      accessor: "thumbnail",
      Cell: ({ value }: { value: string }) => (
        <div className="flex justify-center items-center h-full">
          <img
            src={value}
            alt="Product Thumbnail"
            className="w-12 h-12 object-cover rounded-md"
          />
        </div>
      ),
    },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: "price" },
    { header: "Rating", accessor: "rating" },
    {
      header: "Action",
      accessor: "action",
      Cell: ({ row }: { row: any }) => (
        <div className="flex justify-center items-center space-x-2">
          <AiOutlineEye
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            size={20}
            onClick={() => navigate(`/product/${row.id}`)}
          />
        </div>
      ),
    },
  ];

  const handleInputChange = useCallback(
    (value: string) => {
      setPage(1);
      setCategory("");
      setSearch(value);
    },
    [setPage, setCategory, setSearch]
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleCategoryChange = (value: string) => {
    setSearch("");
    setPage(1);
    setCategory(value);
  };

  return (
    <div className="grid grid-cols-12">
      {/* Search and Filter */}
      <div className="col-span-12 flex flex-col md:flex-row md:justify-end md:space-x-3 space-y-2 md:space-y-0 mt-4 px-4">
        <div className="w-full md:w-1/5">
          <Input
            label="Search Products"
            placeholder="Enter product name or details"
            value={search}
            onDebouncedChange={handleInputChange}
            debounceDelay={500}
            mb="md"
          />
        </div>
        <div className="w-full md:w-1/5">
          <Select
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            data={formatCategoryOptions(categoriesData?.data)}
            mb="md"
          />
        </div>
      </div>
      {/* Data Table */}
      <div className="col-span-12 px-4 mt-4 md:mt-0">
        <DataTable
          data={productsData?.data?.products || []}
          columns={columns}
          loading={isLoadingProducts}
          onSort={(header, sortOrder) => {
            setSort(header);
            setOrder(sortOrder);
          }}
        />
      </div>
      {/* Pagination */}
      {!isLoadingProducts && productsData?.data?.products.length > 0 && (
        <div className="col-span-12 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 py-4 px-4">
          <Pagination
            total={calculateTotalPages(productsData?.data?.total || 0, limit)}
            value={page}
            onChange={handlePageChange}
          />
          <Select
            value={String(limit)}
            onChange={(value) => setLimit(Number(value))}
            data={pageSizeOptions}
            className="w-full sm:w-32"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
