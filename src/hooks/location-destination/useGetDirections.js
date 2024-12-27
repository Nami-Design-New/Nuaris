import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetDirections(filter) {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["directions", currentPage, filter],

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/location/get_direction_by_sub_user`,
        {
          params: {
            location_type: filter,
            page: currentPage
          }
        }
      );
      return {
        data: res?.data?.results,
        count: res?.data?.count
      };
    },

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error, refetch };
}
