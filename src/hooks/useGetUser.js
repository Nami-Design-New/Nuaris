import axios from "./../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("https://newstagingapi.nuaris.co/users");
      return res.data;
    },
    retry: false
  });

  return { data, isLoading, error };
}
