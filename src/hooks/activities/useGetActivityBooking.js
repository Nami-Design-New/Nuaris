import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetActivityBooking(id, enabled) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity-booking", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/activity/get_activity_booking_details_by_id?booking_id=${id}`
      );
      return res.data;
    },
    enabled: enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
