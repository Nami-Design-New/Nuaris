import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAddonsForBooking() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["addons-for-booking"],
    queryFn: async () => {
      const res = await axiosInstance.get("/addon/get_addons_not_connected_to_fleets_by_sub_user", {
        params: {
          page: currentPage,
        },
      });
      return {
        data: res?.data?.results,
        count: res?.data?.count,
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error, refetch };
}
