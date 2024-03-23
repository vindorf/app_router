import { fetcher } from "@/app/utils/fetcher";
import useSWR from "swr";


export const useUserApi = () => {
    const { data, error, isLoading, isValidating } = useSWR(
        "https://jsonplaceholder.typicode.com/users/",
        fetcher
      );
      return {data, error, isLoading, isValidating} ;
}
