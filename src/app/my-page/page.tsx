"use client"
import Title from "@/components/atoms/title"
import lang from "@/lang/zh"
import Button from "@/components/atoms/button"
import React, { useCallback, useEffect, useState } from "react"
import Dao from "@/interfaces/dao.interface"
import DaoPreview, { DaoView } from "@/components/organisms/dao-view"
import { deleteDao, getDaos } from "@/utils/api"
import useXCA from "@/hooks/useXCA"
import TabGroup from "@/components/molecules/tab-group"
import { useRouter } from "next/navigation"
import { CustomDialog } from "@/components/molecules/custom-dialog"
import { DaoStates } from "@/constant"

const MyPage = () => {
  const { address } = useXCA()
  const router = useRouter()
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0)
  const [daoToCancel, setDaoToCancel] = useState<Dao | null>(null)
  const [daoToExpand, setDaoToExpand] = useState<Dao | null>(null)

  const fetchDaos = useCallback(() => {
    if (!address) return

    getDaos({
      creator: address,
      state: selectedTabIdx.toString()
    })
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [address, selectedTabIdx])

  useEffect(() => {
    fetchDaos()
  }, [fetchDaos])

  const handleDelete = (dao: Dao) => {
    deleteDao(dao.address).then(() => {
      setDaoToCancel(null)
      fetchDaos()
    })
  }

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
        items={Object.values(lang.filter)}
        selectedIdx={selectedTabIdx}
        onSelect={(idx) => {
          setSelectedTabIdx(idx)
        }}
      />

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-center gap-8">
        {daos &&
          daos.map((dao, i) => (
            <DaoPreview
              dao={dao}
              key={i}
              onExpand={() => {
                setDaoToExpand(dao)
              }}
            >
              {dao.state === DaoStates.Pending && (
                <Button
                  id={`cancel-${i}`}
                  variant="secondary"
                  size="normal"
                  onClick={() => {
                    setDaoToCancel(dao)
                  }}
                >
                  {lang.action.cancel}
                </Button>
              )}
            </DaoPreview>
          ))}
      </div>

      {daoToCancel && (
        <CustomDialog isOpen={daoToCancel !== null} onClose={() => setDaoToCancel(null)}>
          <>
            <p className="text-xl font-medium">
              {lang.dialog.confirm
                .replace("{action}", lang.action.cancel)
                .replace("{name}", daoToCancel.name)}
            </p>

            <div className="flex flex-row gap-4">
              <Button
                id="button-dialog-cancel"
                variant="secondary"
                size="normal"
                onClick={() => setDaoToCancel(null)}
              >
                {lang.action.no}
              </Button>

              <Button
                id="button-dialog-confirm"
                variant="primary"
                size="normal"
                onClick={() => handleDelete(daoToCancel)}
              >
                {lang.action.yes}
              </Button>
            </div>
          </>
        </CustomDialog>
      )}

      {daoToExpand && (
        <CustomDialog isOpen={daoToExpand != null} onClose={() => setDaoToExpand(null)}>
          <DaoView dao={daoToExpand} />
        </CustomDialog>
      )}
    </>
  )
}

export default MyPage
