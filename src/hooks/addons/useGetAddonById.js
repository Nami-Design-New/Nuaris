import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetAddonById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["addon", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/addon/get_addon?addon_id=${id}`
      );
      return res.data;
    },
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
