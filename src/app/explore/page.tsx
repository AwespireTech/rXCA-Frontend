import Title from "@/components/atoms/title"
import lang from "@/lang/zh"
import DaoList from "@/components/organisms/dao-list"

const Explore = () => {
  return (
    <>
      <Title>{lang.page.explore.title}</Title>

      <DaoList filterTitle />
    </>
  )
}

export default Explore
