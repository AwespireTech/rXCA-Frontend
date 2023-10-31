import Explore from "@/fullpage/explore/page"
import { headers } from "next/headers"

export default function page() {
  const nonce = headers().get("x-nonce")
  return <Explore />
}
