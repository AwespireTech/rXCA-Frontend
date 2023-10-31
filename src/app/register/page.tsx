import Registe from "@/fullpage/register/page"
import { headers } from "next/headers"
export default function page() {
  const nonce = headers().get("x-nonce")
  return <Registe />
}
