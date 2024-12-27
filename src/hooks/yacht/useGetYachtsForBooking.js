import { useQuery } from "@tanstack/react-query";
import { DAYS } from "../../utils/constants";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetYachtsForBooking(formData) {
  const date = new Date(formData.date_of_booking);
  const dayIndex = date.getDay();
  const bookingDay = DAYS[dayIndex];

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "yachts-for-booking",
      formData.location_id,
      formData.quantity,
      formData.date_of_booking,
      bookingDay,
      formData.period_id,
      formData.booking_starts_at,
    ],
    queryFn: async () => {
      const res = await axiosInstance.get("/yacht/get_fleets_for_booking", {
        params: {
          location_id: formData.location_id,
          quantity: formData.quantity,
          date_of_booking: formData.date_of_booking,
          booking_day: bookingDay,
          period_id: formData.period_id,
          booking_starts_at: formData.booking_starts_at,
        },
      });
      return { data: res?.data?.results || [], count: res?.data?.count || 0 };
    },
    enabled: !!bookingDay,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
