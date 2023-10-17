"use client"
import React, { useEffect, useState } from "react"
import Header from "../components/organisms/header"
import Title from "../components/atoms/title"
import lang from "@../../../public/lang/en.json"
import { API_URL } from "../../constant"
import { json } from "stream/consumers"
import { getAllDaos } from "@/utils/api"
import DAOView from "../components/organisms/dao-view"
import { Dao } from "@/interfaces/dao.interface"

const Explore = () => {
  const [daos, setDaos] = useState<Dao[] | null>(null)

  useEffect(() => {
    getAllDaos()
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <Header />
      <Title>{lang.page.explore.title}</Title>
      <div className="grid w-[90%] grid-cols-3 gap-8 xl:w-[70%]">
        {daos &&
          daos.map((dao, i) => (
            <DAOView dao={dao} key={i}>
              {" "}
            </DAOView>
          ))}
      </div>
    </>
  )
}

export default Explore
