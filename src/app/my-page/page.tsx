import Title from "@/components/atoms/title"
import lang from "@/lang/zh"
import RegisterButton from "@/components/molecules/register-button"
import DaoList from "@/components/organisms/dao-list"

const MyPage = () => {
  return (
    <>
      <Title>{lang.page.myPage.title}</Title>

      <RegisterButton />

      <DaoList filterState filterCreator type="creator" />
    </>
  )
}

export default MyPage
