import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroups(currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get("/groups", {
        params: {
          page: currentPage
        }
      });
      return {
        data: res?.data?.data,
        count: res?.data?.count
      };
    },
    retry: false
  });

  return { data, isLoading, error };
}
