import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetAddonById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["addon", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/addons/${id}`
      );
      return res.data;
    },
    retry: false
  });

  return { data, isLoading, error };
}
