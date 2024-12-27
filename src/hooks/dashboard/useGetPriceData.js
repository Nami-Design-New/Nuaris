import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetPriceData(id, amount) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["price-data", id, amount],
    queryFn: async () => {
      const res = await axiosInstance.get("/finance/get_booking_total_price", {
        params: {
          booking_id: id,
          amount_paid: amount,
        },
      });
      return res.data;
    },
    retry: false,
    enabled: !!id && !!amount,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
