import React, { useEffect, useState } from "react"
import Link from "next/link"

const nav = ["Explore", "Register"]

export const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [currPath, setCurrPath] = useState<string>("")

  useEffect(() => {
    if (location.pathname?.split("/")[1]) {
      setCurrPath(location.pathname?.split("/")[1])
    } else {
      setCurrPath("")
    }
  }, [])

  return (
    <div className="box-border flex w-full flex-row items-center justify-between bg-primary">
      <div className="text-lg text-highlight">XCA</div>
      <div className="flex flex-row items-center gap-8">
        {nav.map((item, index) => (
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
            setShowMenu(true)
          }}
          onMouseOutCapture={() => {
            setShowMenu(false)
          }}
        >
          <button className="rounded-full border px-4 py-1 text-lg text-white">
            tz123...45678
          </button>
          {showMenu && (
            <div className="absolute flex w-full flex-col overflow-hidden rounded-2xl bg-lightgray text-black">
              <Link
                className="w-full bg-lightgray py-1 text-center text-black duration-300 ease-in-out hover:bg-highlight hover:text-white"
                href="/my-page"
              >
                My Page
              </Link>
              <button className="w-full bg-lightgray py-1 text-black duration-300 ease-in-out hover:bg-highlight hover:text-white">
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
