import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetPeriodTypes(feature, enable = true) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["period_types", feature],
    queryFn: async () => {
      const res = await axiosInstance.get("/yacht/get_period_types", {
        params: {
          feature
        }
      });
      return res.data;
    },
    retry: false,
    enabled: enable,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
