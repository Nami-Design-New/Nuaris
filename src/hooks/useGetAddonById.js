import axios from "./../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetAddonById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["addon", id],
    queryFn: async () => {
      const res = await axios.get(
        `/addons/${id}`
      );
      return res.data;
    },
    retry: false
  });

  return { data, isLoading, error };
}
