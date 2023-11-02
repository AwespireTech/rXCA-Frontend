"use client"
import React, { useEffect, useState, useCallback } from "react"
import useXCA from "@/hooks/useXCA"
import Button from "@/components/atoms/button"
import lang from "@/lang/zh"
import Dao from "@/interfaces/dao.interface"
import { authAddress, getDaos, validateDao } from "@/utils/api"
import DaoPreview, { DaoView } from "@/components/organisms/dao-view"
import TabGroup from "@/components/molecules/tab-group"
import { API_URL, DaoStates } from "@/constant"
import Title from "@/components/atoms/title"
import { useRouter } from "next/navigation"
import { CustomDialog } from "@/components/molecules/custom-dialog"
import DaoList from "@/components/organisms/dao-list"

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

const Admin = () => {
  const { address, mint, burn } = useXCA()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)
  const [daos, setDaos] = useState<Dao[] | null>(null)
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>(0)
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.Hidden)
  const [status, setStatus] = useState<Status>(Status.New)
  const [daoToExpand, setDaoToExpand] = useState<Dao | null>(null)
  const [daoToReview, setDaoToReview] = useState<Dao | null>(null)

  const fetchDaos = useCallback(() => {
    getDaos({
      state: selectedTabIdx.toString()
    })
      .then((daos) => {
        setDaos(daos)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [selectedTabIdx])

  useEffect(() => {
    if (address) {
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
    }
  }, [address, router, fetchDaos])

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
      {!address && <div className="fixed top-1/2 translate-y-1/2">Please connect your wallet</div>}

      <DaoList filterState filterCreator type="admin" />
      {/* {address && auth && (
        <>
          <Title>{lang.page.approval.title}</Title>
          <TabGroup
            items={Object.values(lang.filter)}
            selectedIdx={selectedTabIdx}
            onSelect={(idx) => {
              setSelectedTabIdx(idx)
            }}
          />
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-center gap-8">
            {daos &&
              auth &&
              daos.map((dao, i) => (
                <DaoPreview
                  dao={dao}
                  key={i}
                  onExpand={() => {
                    setDaoToExpand(dao)
                  }}
                >
                  {dao.state === DaoStates.Pending ? (
                    <>
                      <Button
                        id="button-burn"
                        variant="secondary"
                        size="normal"
                        onClick={() => {
                          setDialogType(DialogType.Deny)
                          setDaoToReview(dao)
                        }}
                      >
                        {lang.action.deny}
                      </Button>

                      <Button
                        id="button-mint"
                        variant="primary"
                        size="normal"
                        onClick={() => {
                          setDialogType(DialogType.Approve)
                          setDaoToReview(dao)
                        }}
                      >
                        {lang.action.approve}
                      </Button>
                    </>
                  ) : (
                    dao.state === DaoStates.Approved && (
                      <Button
                        id="button-burn"
                        variant="secondary"
                        size="normal"
                        onClick={() => {
                          setDialogType(DialogType.Revoke)
                          setDaoToReview(dao)
                        }}
                      >
                        {lang.action.revoke}
                      </Button>
                    )
                  )}
                </DaoPreview>
              ))}
          </div>

          {daoToReview && (
            <CustomDialog
              isOpen={dialogType !== DialogType.Hidden}
              onClose={() => {
                handleCloseDialog()
              }}
            >
              <>
                <p className="text-xl font-medium">
                  {status === Status.New
                    ? dialogType === DialogType.Deny
                      ? lang.dialog.confirm
                          .replace("{action}", lang.action.deny)
                          .replace("{name}", daoToReview.name)
                      : dialogType === DialogType.Approve
                      ? lang.dialog.confirm
                          .replace("{action}", lang.action.approve)
                          .replace("{name}", daoToReview.name)
                      : dialogType === DialogType.Revoke &&
                        lang.dialog.confirm
                          .replace("{action}", lang.action.revoke)
                          .replace("{name}", daoToReview.name)
                    : status === Status.Loading
                    ? lang.dialog.loading
                    : status === Status.Success
                    ? dialogType === DialogType.Deny
                      ? `${lang.action.deny}${lang.dialog.success}`
                      : dialogType === DialogType.Approve
                      ? `${lang.action.approve}${lang.dialog.success}`
                      : dialogType === DialogType.Revoke &&
                        `${lang.action.revoke}${lang.dialog.success}`
                    : status === Status.Fail && lang.dialog.fail}
                </p>
                <div className="flex flex-row gap-4">
                  {status === Status.New && (
                    <>
                      <Button
                        id="button-dialog-cancel"
                        variant="secondary"
                        size="normal"
                        onClick={() => {
                          handleCloseDialog()
                        }}
                      >
                        {lang.action.no}
                      </Button>

                      <Button
                        id="button-dialog-confirm"
                        variant="primary"
                        size="normal"
                        onClick={() => {
                          dialogType === DialogType.Deny
                            ? handleDeny(daoToReview.address)
                            : dialogType === DialogType.Approve
                            ? handleApprove(daoToReview.address)
                            : dialogType === DialogType.Revoke &&
                              handleRevoke(daoToReview.address, daoToReview.tokenId)
                        }}
                      >
                        {lang.action.yes}
                      </Button>
                    </>
                  )}

                  {status === Status.Success && (
                    <Button
                      id="button-dialog-close"
                      variant="primary"
                      size="normal"
                      onClick={() => {
                        handleCloseDialog()
                        fetchDaos()
                      }}
                    >
                      {lang.action.confirm}
                    </Button>
                  )}

                  {status === Status.Fail && (
                    <Button
                      id="button-dialog-close"
                      variant="primary"
                      size="normal"
                      onClick={() => {
                        handleCloseDialog()
                      }}
                    >
                      {lang.action.confirm}
                    </Button>
                  )}
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
      )} */}
    </>
  )
}

export default Admin
