import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetAddons(currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["addons"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/api/v1/addon/get_addons_by_sub_user",
        {
          params: {
            page: currentPage
          }
        }
      );
      return {
        data: res?.data?.results,
        count: res?.data?.count
      };
    },
    retry: false
  });

  return { data, isLoading, error };
}
