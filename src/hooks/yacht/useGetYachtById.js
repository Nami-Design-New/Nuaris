import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetYachtById(id, enable) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["yacht", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/yacht/get_fleet_by_id?fleet_id=${id}`
      );
      return res.data;
    },
    enabled: enable,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
