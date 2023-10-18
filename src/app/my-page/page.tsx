"use client"
import Title from "@/components/atoms/title"
import lang from "@/lang/en"
import Button from "@/components/atoms/button"
import React, { useEffect, useState } from "react"
import Dao from "@/interfaces/dao.interface"
import DaoView from "@/components/organisms/dao-view"
import { deleteDao, getDaos } from "@/utils/api"
import useXCA from "@/hooks/useXCA"
import TabGroup from "@/components/molecules/tab-group"
import { daoStatesTab } from "@/constant"
import { useRouter } from "next/navigation"

const MyPage = () => {
  const { address } = useXCA()
  const router = useRouter()
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0)

  useEffect(() => {
    if (address) {
      getDaos({
        address,
        state: selectedTabIdx.toString()
      })
        .then((daos) => {
          setDaos(daos)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [address, selectedTabIdx])

  return (
    <>
      <Title>{lang.page.myPage.title}</Title>

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

      <TabGroup
        items={daoStatesTab}
        selectedIdx={selectedTabIdx}
        onSelect={(idx) => {
          setSelectedTabIdx(idx)
        }}
      />

      <div className="grid w-full grid-cols-3 gap-8">
        {daos &&
          daos.map((dao, i) => (
            <DaoView dao={dao} key={i}>
              <Button
                id={`cancel-${i}`}
                variant="secondary"
                size="normal"
                onClick={() => {
                  deleteDao(dao.address).then(() => {
                    getDaos().then((daos) => {
                      setDaos(daos)
                    })
                  })
                }}
              >
                {lang.action.cancel}
              </Button>
            </DaoView>
          ))}
      </div>
    </>
  )
}

export default MyPage
