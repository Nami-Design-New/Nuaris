import axios from "./../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetYachts(pageSize = 10, currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["yachts", pageSize],
    queryFn: async () => {
      const res = await axios.get(`/yachts/?page_size=${pageSize}`, {
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
