import useSWR from "swr"

const useAPI = (url: string | null) => {
  return useSWR(url)
}

export default useAPI;