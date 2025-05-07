import ApiService from "./ApiService";

export async function apiFetchProducts(
  search: string = "", // Search query for product name or other fields
  category: string = "", // Category filter (if required)
  sort: string = "name", // Sorting parameter (if required)
  order: "asc" | "desc" = "asc", // Sorting order (if required)
  page: number = 1, // Current page (used for pagination)
  limit: number = 10 // Pagination: items per page (if required)
): Promise<any> {
  const skip = (page - 1) * limit; // Calculate skip based on page and limit

  let baseUrl = "products";
  if (search) {
    baseUrl = "products/search";
  } else if (category) {
    baseUrl = `products/category/${category}`;
  }

  // Build the query string for parameters
  const queryParams: Record<string, string> = {
    skip: String(skip), // Pagination: offset
    limit: String(limit), // Pagination: items per page
  };

  // Include search query if present
  if (search) {
    queryParams["q"] = search;
  }

  // Add sort and order to the query string if provided
  if (sort) {
    queryParams["sortBy"] = sort;
  }
  if (order) {
    queryParams["order"] = order;
  }

  // Construct the query string using URLSearchParams
  const query = new URLSearchParams(queryParams).toString();

  // Build the final API URL
  const apiUrl = `${baseUrl}?${query}`;

  // Call the API with the constructed URL
  return ApiService.fetchData<any>({
    url: apiUrl, // Full URL with or without search or category path
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export async function apiFetchCategories(): Promise<any> {
  // Fetch the list of categories from the API
  return ApiService.fetchData<any>({
    url: `products/categories`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}


export const fetchProductDetail = async (id: string) => {
  return ApiService.fetchData<any>({
    url: `products/${id}`,
    method: "GET",
  });
};


export const fetchRelatedProducts = async (category: string) => {
  return ApiService.fetchData<any>({
    url: `products/category/${category}`,
    method: "GET",
  });
};
