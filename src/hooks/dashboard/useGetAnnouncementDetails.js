import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetAnnouncementDetails(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/announcement/get_announcement_by_id?id=${id}`
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
