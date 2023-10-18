"use client"
import React, { useState } from "react"
import Header from "@/components/organisms/header"
import Title from "@/components/atoms/title"
import lang from "@/lang/en"
import FormItem from "@/components/molecules/form-item"
import Dropdown from "@/components/atoms/dropdown"
import TextInput from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import { defaultFramework, defaultNetwork, frameworkOptions, networkOptions } from "../../constant"
import { createDao } from "@/utils/api"
import useXCA from "../../hooks/useXCA"

const Register = () => {
  const { address } = useXCA()
  const API_URL = process.env.NEXT_PUBLIC_API_URL
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

  const handleRegister = () => {
    if (address) {
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
        daoUri: `${API_URL}/daos/${daoAddress}`,
        creator: address
      })
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <>
      <Title>{lang.page.register.title}</Title>
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
              isRequired
              onChange={(value) => setDaoAddress(value)}
            />
          </div>
        </FormItem>

        <FormItem label={lang.dao.name.label} isRequired>
          <TextInput
            id="input-name"
            placeholder={lang.dao.name.placeholder}
            value={name}
            isRequired
            onChange={(value) => setName(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.desc.label} isRequired>
          <TextInput
            id="input-desc"
            placeholder={lang.dao.desc.placeholder}
            value={description}
            isRequired
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
            isRequired
            onChange={(value) => setMembersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.proposalsUri.label} isRequired>
          <TextInput
            id="input-proposalsUri"
            placeholder={lang.dao.proposalsUri.placeholder}
            value={proposalsUri}
            isRequired
            onChange={(value) => setProposalsUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.issuersUri.label} isRequired>
          <TextInput
            id="input-issuersUri"
            placeholder={lang.dao.issuersUri.placeholder}
            value={issuersUri}
            isRequired
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
          // TODO: validate isRequired fields is filled (useMemo?)
          disabled={false}
          onClick={handleRegister}
        >
          {lang.action.register.short}
        </Button>

        {/* // TODO: success or fail popup */}
        <span>{lang.hint.register}</span>
      </div>
    </>
  )
}

export default Register
