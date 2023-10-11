"use client"

import React, { useState } from "react"
import Button from "./components/atoms/button"
import Filter from "./components/atoms/filter"
import Title from "./components/atoms/title"
import { TextInput } from "./components/atoms/input"
import { Dropdown } from "./components/atoms/dropdown"
import { FormItem } from "./components/molecules/form-item"
import DAOView from "./components/organisms/dao-view"
import Header from "./components/organisms/header"
import { testDao } from "../constant"

export default function Home() {
  const [value, setValue] = useState("")
  const [selectedDropdown, setSelectedDropdown] = useState("pending")
  const [selectFilterIdx, setFilterIdx] = useState(0)

  return (
    <>
      <Title>Component Testing</Title>
      <Button id="id" variant="primary" size="large" onClick={() => console.log("clicked")}>
        Click me
      </Button>
      <Filter
        items={["pending", "approved"]}
        selectedIdx={selectFilterIdx}
        onSelect={(idx) => {
          setFilterIdx(idx)
        }}
      />
      <FormItem
        label="label"
        // isRequired
      >
        <TextInput
          id="id"
          placeholder="placeholder"
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
        />
      </FormItem>
      <Dropdown
        id="dropdown"
        options={["pending", "approved", "longlonglonglong"]}
        selectedOption={selectedDropdown}
        // selectedIdx={selectedDropdownIdx}
        onSelect={(item: string) => {
          setSelectedDropdown(item)
        }}
      />
      <FormItem label="label" isRequired>
        <Dropdown
          id="dropdown"
          options={["pending", "approved", "longlonglonglong"]}
          selectedOption={selectedDropdown}
          // selectedIdx={selectedDropdownIdx}
          onSelect={(item: string) => {
            setSelectedDropdown(item)
          }}
          full
        />
      </FormItem>
      <DAOView dao={testDao}>
        <Button id="id" variant="secondary" size="normal" onClick={() => console.log("clicked")}>
          Click me
        </Button>
      </DAOView>
    </>
  )
}
