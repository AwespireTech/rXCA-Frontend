"use client"

import React, { use, useEffect, useState } from "react"
import useXCA from "@/hooks/useXCA"
import Button from "@/components/atoms/button"
import lang from "@/lang/en"
import Dao from "@/interfaces/dao.interface"
import { authAddress, getDaos, validateDao } from "@/utils/api"
import DaoView from "@/components/organisms/dao-view"
import TabGroup from "@/components/molecules/tab-group"
import { DaoStates, daoStatesTab } from "@/constant"
import Title from "@/components/atoms/title"
import { useRouter } from "next/navigation"

export const Admin = () => {
  const { address, mint, burn } = useXCA()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0)

  useEffect(() => {
    if (address) {
      const isAdmin = authAddress(address)

      if (!isAdmin) {
        router.push("/explore")
      } else {
        getDaos({
          state: selectedTabIdx.toString()
        })
          .then((daos) => {
            setDaos(daos)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }, [address, router, selectedTabIdx])

  const handleApprove = (daoAddress: string) => {
    // TODO: check tokenURI
    mint(daoAddress, `${API_URL}/daos/${daoAddress}`)
  }

  const handleDeny = (daoAddress: string) => {
    validateDao(daoAddress, {
      validate: false
      // opHash: opHash as string
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRevoke = (daoAddress: string, tokenId: number) => {
    console.log(tokenId)
    burn(daoAddress, tokenId)
  }

  return (
    <>
      {!address && <div className="fixed top-1/2 translate-y-1/2">Please connect your wallet</div>}

      {address && (
        <>
          <Title>{lang.page.approval.title}</Title>
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
                  <>
                    {dao.state === DaoStates.Pending && (
                      <>
                        <Button
                          id="button-burn"
                          variant="secondary"
                          size="normal"
                          onClick={() => {
                            handleDeny(dao.address)
                          }}
                        >
                          {lang.action.deny}
                        </Button>

                        <Button
                          id="button-mint"
                          variant="primary"
                          size="normal"
                          onClick={() => {
                            handleApprove(dao.address)
                          }}
                        >
                          {lang.action.approve}
                        </Button>
                      </>
                    )}

                    {dao.state === DaoStates.Approved && (
                      <Button
                        id="button-burn"
                        variant="secondary"
                        size="normal"
                        onClick={() => {
                          handleRevoke(dao.address, dao.tokenId)
                        }}
                      >
                        {lang.action.revoke}
                      </Button>
                    )}
                  </>
                </DaoView>
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default Admin
