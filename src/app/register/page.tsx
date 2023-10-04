"use client"
import React, { useState } from "react"
import Header from "../components/organisms/header"
import Title from "../components/atoms/title"
import lang from "@../../../public/lang/en.json"
import FormItem from "../components/molecules/form-item"
import Dropdown from "../components/atoms/dropdown"
import TextInput from "../components/atoms/input"
import Button from "../components/atoms/button"

const options = ["option1", "option2", "option3"]

const defaultNetwork = options[0]
const defaultFramework = options[0]

export const Register = () => {
  const [network, setNetwork] = useState<string>(defaultNetwork)
  const [contractAddr, setContractAddr] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [framework, setFramework] = useState<string>(defaultFramework)
  const [membersUri, setMembersUri] = useState<string>("")
  const [proposalsUri, setProposalsUri] = useState<string>("")
  const [issuersUri, setIssuersUri] = useState<string>("")
  const [registryUri, setRegistryUri] = useState<string>("")
  const [managerAddr, setManagerAddr] = useState<string>("")
  const [document, setDocument] = useState<string>("")

  const handleRegister = () => {}

  return (
    <>
      <Header />
      <Title>{lang.page.register.title}</Title>
      <div className="flex w-[90%] flex-col gap-6 rounded-md border border-highlight p-8 xl:w-[70%]">
        <FormItem label={lang.dao.contractAddr.label} isRequired>
          <div className="flex flex-row justify-end gap-8">
            <Dropdown
              id="contractAddrNetwork"
              options={options}
              selectedOption={network}
              onSelect={(option: string) => setNetwork(option)}
            />
            <TextInput
              id="contractAddr"
              placeholder={lang.dao.contractAddr.placeholder}
              value={contractAddr}
              onChange={(value) => setContractAddr(value)}
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
            options={options}
            selectedOption={framework}
            onSelect={(option: string) => setFramework(option)}
            full
          />
        </FormItem>

        <FormItem label={lang.dao.members.label} isRequired>
          <TextInput
            id="members"
            placeholder={lang.dao.members.placeholder}
            value={membersUri}
            onChange={(value) => setMembersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.proposals.label} isRequired>
          <TextInput
            id="proposals"
            placeholder={lang.dao.proposals.placeholder}
            value={proposalsUri}
            onChange={(value) => setProposalsUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.issuers.label} isRequired>
          <TextInput
            id="issuers"
            placeholder={lang.dao.issuers.placeholder}
            value={issuersUri}
            onChange={(value) => setIssuersUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.registry.label}>
          <TextInput
            id="registry"
            placeholder={lang.dao.registry.placeholder}
            value={registryUri}
            onChange={(value) => setRegistryUri(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.managerAddr.label}>
          <TextInput
            id="manager"
            placeholder={lang.dao.managerAddr.placeholder}
            value={managerAddr}
            onChange={(value) => setManagerAddr(value)}
          />
        </FormItem>

        <FormItem label={lang.dao.document.label}>
          <TextInput
            id="document"
            placeholder={lang.dao.document.placeholder}
            value={document}
            onChange={(value) => setDocument(value)}
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
