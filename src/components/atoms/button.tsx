"use client"
import React, { useState } from "react"

export const Button = ({
  id = "id",
  variant,
  size = "normal",
  disabled = false,
  onClick,
  children
}: {
  id: string
  children: React.ReactNode
  variant: "primary" | "secondary"
  size?: "normal" | "large" | "extra-large"
  disabled?: boolean
  onClick: () => void
}) => {
  const [isClicked, setIsClicked] = useState(false)

  let style = ""
  switch (variant) {
    default:
    case "primary":
      style = "border-white bg-highlight text-white"
      break
    case "secondary":
      style = "border-black bg-lightgray text-black"
      break
  }

  switch (size) {
    default:
    case "normal":
      style += " py-1 px-6 text-base"
      break
    case "large":
      style += " py-2 px-8 text-2xl"
      break
    case "extra-large":
      style += " py-3 px-10 text-3xl"
      break
  }

  return (
    <div className="relative mb-1 w-fit rounded-full">
      <button
        id={id}
        disabled={disabled}
        className={`relative ${
          isClicked ? "translate-y-[12%]" : "translate-y-0"
        } z-10 box-border rounded-full border border-secondary ${style} whitespace-nowrap duration-200 ease-in-out ${
          disabled ? "opacity-50" : "opacity-100"
        }`}
        onClick={() => {
          onClick()
        }}
        /* animation on desktop */
        onMouseDownCapture={() => {
          setIsClicked((state) => !state)
        }}
        onMouseUpCapture={() => {
          setIsClicked((state) => !state)
        }}
        /* animation on mobile */
        onTouchStartCapture={() => {
          setIsClicked((state) => !state)
        }}
        onTouchEndCapture={() => {
          setIsClicked((state) => !state)
        }}
      >
        {children}
      </button>
      <div className={`absolute left-0 top-[12%] z-0 h-full w-full rounded-full bg-deepgray`} />
    </div>
  )
}

export default Button
