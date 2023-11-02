"use client"
import Button from "@/components/atoms/button"
import { useRouter } from "next/navigation"
import lang from "@/lang/zh"

const RegisterButton = () => {
  const router = useRouter()
  return (
    <>
      <Button
        id="button-register"
        variant="primary"
        size="extra-large"
        onClick={() => {
          router.push("/register")
        }}
      >
        {lang.action.register.full}
      </Button>

      <div className="h-0.5 w-full bg-white" />
    </>
  )
}

export default RegisterButton
