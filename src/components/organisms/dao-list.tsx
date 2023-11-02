"use client"
import React, { useCallback, useEffect, useState } from "react"
import { Dao } from "@/interfaces/dao.interface"
import { authAddress, deleteDao, getDaos, validateDao } from "@/utils/api"
import TextInput from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import DaoPreview, { DaoView } from "@/components/organisms/dao-view"
import { CustomDialog } from "@/components/molecules/custom-dialog"
import lang from "@/lang/zh"
import TabGroup from "../molecules/tab-group"
import useXCA from "@/hooks/useXCA"
import { usePathname, useRouter } from "next/navigation"
import { API_URL, DaoStates } from "@/constant"

enum DialogType {
  Hidden,
  Approve,
  Deny,
  Revoke
}

enum Status {
  New,
  Loading,
  Success,
  Fail
}

const DaoList = ({
  filterTitle = false,
  filterState = false,
  filterCreator = false,
  type = "normal"
}: {
  filterTitle?: boolean
  filterState?: boolean
  filterCreator?: boolean
  type?: "normal" | "creator" | "admin"
}) => {
  const { address, mint, burn } = useXCA()
  const router = useRouter()
  const pathname = usePathname()
  const [auth, setAuth] = useState<boolean>(false)
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [daoToExpand, setDaoToExpand] = useState<Dao | null>(null)
  const [search, setSearch] = useState<string>("")
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0)
  const [daoToCancel, setDaoToCancel] = useState<Dao | null>(null)
  const [status, setStatus] = useState<Status>(Status.New)
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.Hidden)

  const fetchDaos = useCallback(() => {
    if (!address) return

    getDaos({
      creator: filterCreator ? address : "",
      state: filterState ? selectedTabIdx.toString() : ""
    })
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [address, selectedTabIdx])

  useEffect(() => {
    if (address) {
      if (pathname === "/admin") {
        authAddress(address)
          .then((isAdmin) => {
            setAuth(isAdmin)

            if (!isAdmin) {
              router.push("/explore")
            } else {
              fetchDaos()
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        setAuth(true)
      }
    }

    fetchDaos()
  }, [fetchDaos])

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

  const handleDelete = (dao: Dao) => {
    deleteDao(dao.address).then(() => {
      setDaoToCancel(null)
      fetchDaos()
    })
  }

  const handleApprove = (daoAddress: string) => {
    setStatus(Status.Loading)
    mint(
      daoAddress,
      `${API_URL}/dao/${daoAddress}`,
      () => setStatus(Status.Success),
      () => setStatus(Status.Fail)
    )
  }

  const handleDeny = (daoAddress: string) => {
    setStatus(Status.Loading)
    validateDao(daoAddress, {
      validate: false
    })
      .then(() => {
        setStatus(Status.Success)
      })
      .catch((err) => {
        setStatus(Status.Fail)
        console.log(err)
      })
  }

  const handleRevoke = (daoAddress: string, tokenId: number) => {
    setStatus(Status.Loading)
    burn(
      daoAddress,
      tokenId,
      () => setStatus(Status.Success),
      () => setStatus(Status.Fail)
    )
  }

  const handleCloseDialog = () => {
    setDialogType(DialogType.Hidden)
    setStatus(Status.New)
  }

  return (
    <>
      {filterTitle && (
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
      )}

      {filterState && (
        <TabGroup
          items={Object.values(lang.filter)}
          selectedIdx={selectedTabIdx}
          onSelect={(idx) => {
            setSelectedTabIdx(idx)
          }}
        />
      )}

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
              {type === "creator" && (
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

      {daoToExpand && (
        <CustomDialog isOpen={daoToExpand != null} onClose={() => setDaoToExpand(null)}>
          <DaoView dao={daoToExpand} />
        </CustomDialog>
      )}

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
    </>
  )
}

export default DaoList
