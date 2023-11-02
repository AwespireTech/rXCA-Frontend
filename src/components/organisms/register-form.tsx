"use client"
import React, { useState } from "react"
import FormItem from "@/components/molecules/form-item"
import Dropdown from "@/components/atoms/dropdown"
import TextInput from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import { defaultFramework, defaultNetwork, frameworkOptions, networkOptions } from "../../constant"
import { createDao } from "@/utils/api"
import useXCA from "../../hooks/useXCA"
import { DaoExistsError } from "@/interfaces/dao.interface"
import { CustomDialog } from "@/components/molecules/custom-dialog"
import { useRouter } from "next/navigation"
import lang from "@/lang/zh"

enum Status {
  New,
  Success,
  DuplicateError,
  Fail
}

const RegisterForm = () => {
  const { address } = useXCA()
  const router = useRouter()
  const [status, setStatus] = useState<Status>(Status.New)
  const [network, setNetwork] = useState<string>(defaultNetwork)
  const [daoAddress, setDaoAddress] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [framework, setFramework] = useState<string>(defaultFramework)
  const [membersUri, setMembersUri] = useState<string>("")
  const [proposalsUri, setProposalsUri] = useState<string>("")
  const [issuersUri, setIssuersUri] = useState<string>("")
  const [contractsRegUri, setContractsRegUri] = useState<string>("")
  const [managerAddress, setManagerAddr] = useState<string>("")
  const [governanceDocument, setGovernanceDocument] = useState<string>("")

  const validateRequired = () => {
    if (!daoAddress.trim()) {
      alert(lang.dao.address.placeholder)
      return false
    }

    if (!name.trim()) {
      alert(lang.dao.name.placeholder)
      return false
    }

    if (!description.trim()) {
      alert(lang.dao.desc.placeholder)
      return false
    }

    if (!membersUri.trim()) {
      alert(lang.dao.membersUri.placeholder)
      return false
    }

    if (!proposalsUri.trim()) {
      alert(lang.dao.proposalsUri.placeholder)
      return false
    }

    if (!issuersUri.trim()) {
      alert(lang.dao.issuersUri.placeholder)
      return false
    }

    return true
  }

  const handleRegister = () => {
    if (address && validateRequired()) {
      createDao({
        network,
        address: daoAddress,
        name,
        description,
        framework,
        membersUri,
        proposalsUri,
        issuersUri,
        contractsRegUri,
        managerAddress,
        governanceDocument,
        creator: address
      })
        .then((res) => {
          if (res.error === DaoExistsError) {
            setStatus(Status.DuplicateError)
          } else {
            setStatus(Status.Success)
          }
        })
        .catch((e) => {
          console.log(e)
          if (status === Status.DuplicateError) return
          setStatus(Status.Fail)
        })
    }
  }

  const handleDialogOnClose = () => {
    if (status === Status.Success) {
      router.push("/my-page")
      return
    }

    if (status === Status.DuplicateError) {
      setStatus(Status.New)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
      return
    }

    if (status === Status.Fail) {
      setStatus(Status.New)
      return
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-6 rounded-md border border-highlight p-8">
        <FormItem label={lang.dao.address.label} isRequired>
          <div className="flex flex-row justify-end gap-8">
            <Dropdown
              id="input-network"
              options={networkOptions}
              selectedOption={network}
              onSelect={(option: string) => setNetwork(option)}
            />
            <TextInput
              id="input-daoAddress"
              placeholder={lang.dao.address.placeholder}
              value={daoAddress}
              onChange={(value) => setDaoAddress(value)}
            />
          </div>
        </FormItem>

        <FormItem label={lang.dao.name.label} isRequired>
          <TextInput
            id="input-name"
            placeholder={lang.dao.name.placeholder}
            value={name}
            onChange={(value) => setName(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.desc.label} isRequired>
          <TextInput
            id="input-desc"
            placeholder={lang.dao.desc.placeholder}
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.framework.label} isRequired>
          <Dropdown
            id="input-framework"
            options={frameworkOptions}
            selectedOption={framework}
            onSelect={(option: string) => setFramework(option)}
            full
          />
        </FormItem>

        <FormItem label={lang.dao.membersUri.label} isRequired>
          <TextInput
            id="input-membersUri"
            placeholder={lang.dao.membersUri.placeholder}
            value={membersUri}
            onChange={(value) => setMembersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.proposalsUri.label} isRequired>
          <TextInput
            id="input-proposalsUri"
            placeholder={lang.dao.proposalsUri.placeholder}
            value={proposalsUri}
            onChange={(value) => setProposalsUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.issuersUri.label} isRequired>
          <TextInput
            id="input-issuersUri"
            placeholder={lang.dao.issuersUri.placeholder}
            value={issuersUri}
            onChange={(value) => setIssuersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.contractsRegUri.label}>
          <TextInput
            id="input-contractsRegUri"
            placeholder={lang.dao.contractsRegUri.placeholder}
            value={contractsRegUri}
            onChange={(value) => setContractsRegUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.managerAddress.label}>
          <TextInput
            id="input-manager"
            placeholder={lang.dao.managerAddress.placeholder}
            value={managerAddress}
            onChange={(value) => setManagerAddr(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.governanceDocument.label}>
          <TextInput
            id="input-governanceDocument"
            placeholder={lang.dao.governanceDocument.placeholder}
            value={governanceDocument}
            onChange={(value) => setGovernanceDocument(value)}
          />
        </FormItem>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <Button
          id="button-register"
          variant="primary"
          size="extra-large"
          onClick={() => handleRegister()}
        >
          {lang.action.register.short}
        </Button>

        <span>{lang.hint.register}</span>
      </div>

      <CustomDialog isOpen={status !== Status.New} onClose={() => handleDialogOnClose()}>
        <>
          <p className="text-xl font-medium">
            {status === Status.Success
              ? lang.dialog.createSuccess
              : status === Status.DuplicateError
              ? lang.dialog.duplicateError
              : status === Status.Fail && lang.dialog.fail}
          </p>
          <Button
            id="button-dialog"
            variant="primary"
            size="normal"
            onClick={() => handleDialogOnClose()}
          >
            {status === Status.Success ? lang.action.redirectToMyPage : lang.action.yes}
          </Button>
        </>
      </CustomDialog>
    </>
  )
}

export default RegisterForm
