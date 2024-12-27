import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetDirectionsAll(filter) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["directions-all", filter],

    queryFn: async () => {
      const res = await axiosInstance.get(
        `/location/get_direction_by_sub_user`,
        {
          params: {
            location_type: filter,
            page_size: 1000
          }
        }
      );
      return res.data?.results;
    },

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error, refetch };
}
