import MyPage from "@/fullpage/my-page/page"
import { headers } from "next/headers"
export default function page() {
  const nonce = headers().get("x-nonce")
  return <MyPage />
}
