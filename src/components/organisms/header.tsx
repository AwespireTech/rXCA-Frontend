"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import useXCA from "@/hooks/useXCA"
import lang from "@/lang/zh"
import { shortenWallet } from "@/utils/string"
import { usePathname } from "next/navigation"
import Image from "next/image"

const nav = {
  explore: lang.page.explore.title,
  register: lang.page.register.title.short
}
const adminPath = "admin"

export const Header = () => {
  const { address, connectMetamask, disconnectMetamask } = useXCA()
  const [navIsOpen, setNavIsOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [currPath, setCurrPath] = useState<string>("")
  const pathname = usePathname()

  const isTablet = () => {
    return width < 764
  }

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (pathname?.split("/")[1]) {
      setCurrPath(pathname?.split("/")[1])
    } else {
      setCurrPath("")
    }
    setNavIsOpen(false)
  }, [pathname])

  return (
    <div className="fixed z-50 box-border flex w-full flex-row items-center justify-between bg-primary px-8 py-4">
      <Link href="/explore">
        <Image src="/images/XCA-logo.svg" alt="logo" width="80" height="80" className="h-auto" />
      </Link>
      <div className="flex flex-row items-center gap-8">
        {!isTablet() &&
          currPath !== adminPath &&
          Object.values(nav).map((item: string, index: number) => (
            <Link
              key={index}
              className={`text-lg ${
                currPath === Object.keys(nav)[index] ? "text-highlight" : "text-white"
              } duration-300 ease-in-out hover:text-highlight`}
              href={Object.keys(nav)[index]}
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

        {isTablet() && currPath !== adminPath && (
          <svg
            className="h-6 w-6 stroke-white stroke-2"
            onClick={() => setNavIsOpen((prev) => !prev)}
          >
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              className={`origin-center duration-500 ease-out ${
                navIsOpen ? "rotate-[45deg]" : "translate-y-[-25%]"
              }`}
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              className={`origin-center duration-100 ease-out ${navIsOpen ? "scale-[0.1]" : ""}`}
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              className={`origin-center duration-500 ease-out ${
                navIsOpen ? "rotate-[-45deg]" : "translate-y-[25%]"
              }`}
            />
          </svg>
        )}
      </div>

      {isTablet() && currPath !== adminPath && navIsOpen && (
        <div className="z-100 absolute right-0 top-[100%] flex h-fit w-full flex-col items-end border-b border-white bg-primary px-8 pb-4">
          {Object.values(nav).map((item: string, index: number) => (
            <Link
              key={index}
              className={`text-lg ${
                currPath === Object.keys(nav)[index] ? "text-highlight" : "text-white"
              } duration-300 ease-in-out hover:text-highlight`}
              href={Object.keys(nav)[index]}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
