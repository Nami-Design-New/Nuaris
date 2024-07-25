import axios from "./../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetAddons(currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["addons"],
    queryFn: async () => {
      const res = await axios.get("/addons", {
        params: {
          page: currentPage
        }
      });
      return {
        data: res?.data?.results,
        count: res?.data?.count
      };
    },
    retry: false
  });

  return { data, isLoading, error };
}
