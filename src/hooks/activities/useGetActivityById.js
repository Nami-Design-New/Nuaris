import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetActivityById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/activity/get_activity_by_id?activity_id=${id}`
      );
      return res.data;
    },
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
