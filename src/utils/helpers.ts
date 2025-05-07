export const calculateTotalPages = (totalItems: number, limit: number) => {
  if (!limit || limit <= 0) return 0;
  return Math.ceil(totalItems / limit);
};

export const formatCategoryOptions = (categories: any) => {
  return [
    { value: "", label: "All Categories" },
    ...(categories?.map((cat: any) => ({
      value: cat.name,
      label: cat.name,
    })) || []),
  ];
};

export const pageSizeOptions = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
  ];
