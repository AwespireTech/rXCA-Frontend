"use client"

import React, { useState } from "react"
import Explore from "./explore/page"

export default function Home() {
  const [value, setValue] = useState("")
  const [selectedDropdown, setSelectedDropdown] = useState("pending")
  const [selectFilterIdx, setFilterIdx] = useState(0)

  return (
    <Explore />
    // <>
    //   <Title>Component Testing</Title>
    //   <Button id="id" variant="primary" size="large" onClick={() => console.log("clicked")}>
    //     Click me
    //   </Button>
    //   <Filter
    //     items={["pending", "approved"]}
    //     selectedIdx={selectFilterIdx}
    //     onSelect={(idx) => {
    //       setFilterIdx(idx)
    //     }}
    //   />
    //   <FormItem
    //     label="label"
    //     // isRequired
    //   >
    //     <TextInput
    //       id="id"
    //       placeholder="placeholder"
    //       value={value}
    //       onChange={(value) => {
    //         setValue(value)
    //       }}
    //     />
    //   </FormItem>
    //   <Dropdown
    //     id="dropdown"
    //     options={["pending", "approved", "longlonglonglong"]}
    //     selectedOption={selectedDropdown}
    //     // selectedIdx={selectedDropdownIdx}
    //     onSelect={(item: string) => {
    //       setSelectedDropdown(item)
    //     }}
    //   />
    //   <FormItem label="label" isRequired>
    //     <Dropdown
    //       id="dropdown"
    //       options={["pending", "approved", "longlonglonglong"]}
    //       selectedOption={selectedDropdown}
    //       // selectedIdx={selectedDropdownIdx}
    //       onSelect={(item: string) => {
    //         setSelectedDropdown(item)
    //       }}
    //       full
    //     />
    //   </FormItem>
    //   <DaoView dao={testDao}>
    //     <Button id="id" variant="secondary" size="normal" onClick={() => console.log("clicked")}>
    //       Click me
    //     </Button>
    //   </DaoView>
    // </>
  )
}
