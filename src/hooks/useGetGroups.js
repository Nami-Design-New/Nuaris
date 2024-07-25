import axios from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroups(currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", currentPage],
    queryFn: async () => {
      const res = await axios.get("/groups", {
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
