import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetBookingsStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/get_bookings_statistics");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
