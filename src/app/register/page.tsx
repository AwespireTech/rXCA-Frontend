"use client"
import React, { useState } from "react"
import Header from "../components/organisms/header"
import Title from "../components/atoms/title"
import lang from "@../../../public/lang/en.json"
import FormItem from "../components/molecules/form-item"
import Dropdown from "../components/atoms/dropdown"
import TextInput from "../components/atoms/input"
import Button from "../components/atoms/button"
import {
  API_URL,
  defaultFramework,
  defaultNetwork,
  frameworkOptions,
  networkOptions
} from "../../constant"

export const Register = () => {
  const [network, setNetwork] = useState<string>(defaultNetwork)
  const [address, setAddress] = useState<string>("")
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
    fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contract: network, // contract to be changed to network
        addr: address,
        name: name,
        contractsRegUri: description,
        framwork: framework,
        members_uri: membersUri,
        proposals_uri: proposalsUri,
        issuers_uri: issuersUri,
        contracts_reg_uri: contractsRegUri,
        manager_addr: managerAddress,
        governance_doc: governanceDocument
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <Header />
      <Title>{lang.page.register.title}</Title>
      <div className="flex w-[90%] flex-col gap-6 rounded-md border border-highlight p-8 xl:w-[70%]">
        <FormItem label={lang.dao.address.label} isRequired>
          <div className="flex flex-row justify-end gap-8">
            <Dropdown
              id="contractAddrNetwork"
              options={networkOptions}
              selectedOption={network}
              onSelect={(option: string) => setNetwork(option)}
            />
            <TextInput
              id="contract"
              placeholder={lang.dao.address.placeholder}
              value={address}
              onChange={(value) => setAddress(value)}
            />
          </div>
        </FormItem>

        <FormItem label={lang.dao.name.label} isRequired>
          <TextInput
            id="name"
            placeholder={lang.dao.name.placeholder}
            value={name}
            onChange={(value) => setName(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.desc.label} isRequired>
          <TextInput
            id="name"
            placeholder={lang.dao.desc.placeholder}
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.framework.label} isRequired>
          <Dropdown
            id="framework"
            options={frameworkOptions}
            selectedOption={framework}
            onSelect={(option: string) => setFramework(option)}
            full
          />
        </FormItem>

        <FormItem label={lang.dao.membersUri.label} isRequired>
          <TextInput
            id="membersUri"
            placeholder={lang.dao.membersUri.placeholder}
            value={membersUri}
            onChange={(value) => setMembersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.proposalsUri.label} isRequired>
          <TextInput
            id="proposalsUri"
            placeholder={lang.dao.proposalsUri.placeholder}
            value={proposalsUri}
            onChange={(value) => setProposalsUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.issuersUri.label} isRequired>
          <TextInput
            id="issuersUri"
            placeholder={lang.dao.issuersUri.placeholder}
            value={issuersUri}
            onChange={(value) => setIssuersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.contractsRegUri.label}>
          <TextInput
            id="contractsRegUri"
            placeholder={lang.dao.contractsRegUri.placeholder}
            value={contractsRegUri}
            onChange={(value) => setContractsRegUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.managerAddress.label}>
          <TextInput
            id="manager"
            placeholder={lang.dao.managerAddress.placeholder}
            value={managerAddress}
            onChange={(value) => setManagerAddr(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.governanceDocument.label}>
          <TextInput
            id="governanceDocument"
            placeholder={lang.dao.governanceDocument.placeholder}
            value={governanceDocument}
            onChange={(value) => setGovernanceDocument(value)}
          />
        </FormItem>
      </div>

      <Button id="register-btn" variant="primary" size="large" onClick={handleRegister}>
        {lang.action.register.short}
      </Button>
    </>
  )
}

export default Register
