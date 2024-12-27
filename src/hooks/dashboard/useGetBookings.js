import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetBookings() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/get_bookings", {
        params: {
          page: currentPage,
        },
      });
      return {
        data: res.data.results,
        count: res.data.count,
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
