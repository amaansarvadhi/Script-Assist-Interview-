import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware"; // Import createJSONStorage

type ProductStore = {
  search: string;
  category: string;
  sort: string;
  order: "asc" | "desc";
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
  setOrder: (order: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setLimit: (page: any) => void;
};

const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set) => ({
        search: "",
        category: "",
        sort: "name",
        order: "asc",
        page: 1,
        limit: 20,
        setSearch: (search) => set({ search }),
        setCategory: (category) => set({ category }),
        setSort: (sort) => set({ sort }),
        setOrder: (order) => set({ order }),
        setPage: (page) => set({ page }),
        setLimit: (limit) => set({ limit }),
      }),
      {
        name: "product-storage", // Storage key name
        storage: createJSONStorage(() => localStorage), // Use createJSONStorage for correct type handling
      }
    )
  )
);

export default useProductStore;
