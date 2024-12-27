import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetYachtMoreInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["more_info"],
    queryFn: async () => {
      const res = await axiosInstance.get("/yacht/get_fleet_more_info");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}
