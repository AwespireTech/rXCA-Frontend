import TabItem from "../atoms/tab-item"

export const TabGroup = ({
  items,
  selectedIdx,
  onSelect
}: {
  items: string[]
  selectedIdx?: number
  onSelect: (idx: number) => void
}) => {
  return (
    <div className="flex flex-row gap-4">
      {items.map((item, idx) => (
        <TabItem
          key={idx}
          selected={idx === selectedIdx}
          onClick={() => {
            onSelect(idx)
          }}
        >
          {item}
        </TabItem>
      ))}
    </div>
  )
}

export default TabGroup
