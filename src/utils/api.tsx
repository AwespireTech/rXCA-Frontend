import { API_URL } from "@/constant"
import { CreateDaoPayload } from "@/interfaces/dao.interface"

export const getAllDaos = async () => {
  const res = await fetch(`${API_URL}`)
  const json = await res.json()
  console.log(json)

  return json.daos
}

export const createDao = async (body: CreateDaoPayload) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const json = await res.json()
  console.log(json)

  return json
}
