import { API_URL } from "@/constant"

export const getAllDaos = async () => {
  const res = await fetch(`${API_URL}`)
  const json = await res.json()
  console.log(json)

  return json.daos
}
