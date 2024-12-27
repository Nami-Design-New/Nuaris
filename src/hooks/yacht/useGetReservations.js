import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetReservations(fleet_id, date_of_booking, enabled) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations", fleet_id, date_of_booking],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/yacht/get_fleet_reservations",
        {
          params: {
            fleet_id: fleet_id,
            date_of_booking: date_of_booking
          }
        }
      );
      return res?.data?.results;
    },
    enabled: enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
