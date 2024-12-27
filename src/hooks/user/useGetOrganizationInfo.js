import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrganizationInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-info"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/organization/get_organization_info"
      );
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
