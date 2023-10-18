"use client"

import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import useXCA, { XCAProvider } from "@/hooks/useXCA"
import lang from "@/lang/en"
import { shortenWallet } from "@/utils/string"
import { usePathname } from "next/navigation"
import Image from "next/image"

const nav = ["Explore", "Register"]
const adminPath = "admin"

export const Header = () => {
  const { address, connectMetamask, disconnectMetamask } = useXCA()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [currPath, setCurrPath] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.split("/")[1]) {
      setCurrPath(pathname?.split("/")[1])
    } else {
      setCurrPath("")
    }
  }, [pathname])

  return (
    <div className="box-border flex w-full flex-row items-center justify-between bg-primary">
      <div>
        <Image src="/images/XCA-logo.svg" alt="logo" width="100" height="100" className="h-auto" />
      </div>
      <div className="flex flex-row items-center gap-8">
        {currPath !== adminPath &&
          nav.map((item, index) => (
            <Link
              key={index}
              className={`text-lg ${
                currPath === item.toLowerCase() ? "text-highlight" : "text-white"
              } duration-300 ease-in-out hover:text-highlight`}
              href={item.toLowerCase()}
            >
              {item}
            </Link>
          ))}
        <div
          className="relative"
          onMouseOverCapture={() => {
            if (!address) return
            setShowMenu(true)
          }}
          onMouseOutCapture={() => {
            setShowMenu(false)
          }}
        >
          <button
            className={`rounded-full border px-4 py-1 text-lg text-white duration-300 ease-in-out ${
              !address && "hover:bg-highlight"
            }`}
            onClick={() => {
              !address && connectMetamask()
            }}
          >
            {address ? shortenWallet(address) : lang.wallet.connect}
          </button>
          {showMenu && (
            <div className="absolute flex w-full flex-col overflow-hidden rounded-2xl bg-lightgray text-black">
              {currPath !== adminPath && (
                <Link
                  className="w-full bg-lightgray py-1 text-center text-black duration-300 ease-in-out hover:bg-highlight hover:text-white"
                  href="/my-page"
                >
                  {lang.page.myPage.title}
                </Link>
              )}
              <button
                className="w-full bg-lightgray py-1 text-black duration-300 ease-in-out hover:bg-highlight hover:text-white"
                onClick={() => {
                  address && disconnectMetamask()
                }}
              >
                {lang.wallet.disconnect}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
