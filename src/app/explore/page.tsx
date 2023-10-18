"use client"
import React, { useEffect, useState } from "react"
import Header from "@/components/organisms/header"
import Title from "@/components/atoms/title"
import lang from "@/lang/en"
import { getDaos } from "@/utils/api"
import DaoView from "@/components/organisms/dao-view"
import { Dao } from "@/interfaces/dao.interface"
import useXCA from "@/hooks/useXCA"
import TextInput from "@/components/atoms/input"
import Button from "@/components/atoms/button"

const Explore = () => {
  const { address, burn, mint } = useXCA()
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    getDaos()
      .then((daos) => {
        console.log(daos)
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const handleSearch = () => {
    getDaos({
      name: search
    })
      .then((daos) => {
        console.log(daos)
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

      <div className="grid w-full grid-cols-3 gap-8">
        {daos && daos.map((dao, i) => <DaoView dao={dao} key={i} />)}
      </div>
    </>
  )
}

export default Explore
