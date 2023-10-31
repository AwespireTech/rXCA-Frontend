"use client"
import React, { useEffect, useState } from "react"
import Title from "@/components/atoms/title"
import lang from "@/lang/zh"
import { getDaos } from "@/utils/api"
import DaoPreview, { DaoView } from "@/components/organisms/dao-view"
import { Dao } from "@/interfaces/dao.interface"
import TextInput from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import { CustomDialog } from "@/components/molecules/custom-dialog"

const Explore = () => {
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [search, setSearch] = useState<string>("")
  const [daoToExpand, setDaoToExpand] = useState<Dao | null>(null)

  useEffect(() => {
    getDaos()
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const handleSearch = () => {
    getDaos({
      search
    })
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Title>{lang.page.explore.title}</Title>

      <div className="flex w-full flex-row gap-4">
        <TextInput
          id="input-search"
          placeholder="Search"
          value={search}
          onChange={(value: string) => setSearch(value)}
        />

        <Button
          id="button-search"
          variant="primary"
          size="normal"
          onClick={() => {
            handleSearch()
          }}
        >
          {lang.action.search}
        </Button>
      </div>

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-center gap-8">
        {daos &&
          daos.map((dao, i) => (
            <DaoPreview
              dao={dao}
              key={i}
              onExpand={() => {
                setDaoToExpand(dao)
              }}
            />
          ))}
      </div>

      {daoToExpand && (
        <CustomDialog isOpen={daoToExpand != null} onClose={() => setDaoToExpand(null)}>
          <DaoView dao={daoToExpand} />
        </CustomDialog>
      )}
    </>
  )
}

export default Explore
