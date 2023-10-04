"use client"
import Header from "../components/organisms/header"
import Title from "../components/atoms/title"
import lang from "@../../../public/lang/en.json"

export const Explore = () => {
  return (
    <>
      <Header />
      <Title>{lang.page.explore.title}</Title>
    </>
  )
}

export default Explore
