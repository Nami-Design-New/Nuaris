import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetEmployees(currentPage = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees", {
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
