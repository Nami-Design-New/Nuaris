import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetTripPackegesForBooking(formData) {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "trip-packages-for-booking",
      formData.location_id,
      formData.date_of_booking,
      formData.destination_id,
      formData.price_type,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/trip/get_trip_packages_for_booking",
        {
          params: {
            price_type: formData.price_type,
            location_id: formData.location_id,
            destination_id: formData.destination_id,
            date_of_booking: formData.date_of_booking,
          },
        }
      );
      return { data: res?.data?.results || [], count: res?.data?.count || 0 };
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
