import Button from "@/components/atoms/button"
import Explore from "./explore/page"
import Link from "next/link"
import lang from "@/lang/zh"
import { PHYSICAL_CARD_LINK } from "@/constant"

export default function Home() {
  return (
    <div className="flex gap-16 py-64">
      <Link
        className="box-border rounded-full border border-white bg-highlight px-10 py-3 text-3xl text-white"
        href="/explore"
      >
        {lang.page.home.daostar}
      </Link>
      <Link
        className="box-border rounded-full border border-white bg-highlight px-10 py-3 text-3xl text-white"
        href={PHYSICAL_CARD_LINK}
      >
        {lang.page.home.card}
      </Link>
    </div>
  )
}
