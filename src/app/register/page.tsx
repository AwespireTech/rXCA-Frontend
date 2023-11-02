import Title from "@/components/atoms/title"
import RegisterForm from "@/components/organisms/register-form"
import lang from "@/lang/zh"

const Register = () => {
  return (
    <>
      <Title>{lang.page.register.title.full}</Title>

      <RegisterForm />
    </>
  )
}

export default Register
