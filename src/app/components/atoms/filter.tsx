export const Filter = ({
  items,
  selectedIdx,
  onSelect
}: {
  items: string[]
  selectedIdx?: number
  onSelect: (idx: number) => void
}) => {
  let normal = "border-white bg-transparent text-white"
  let chosen = "border-highlight bg-white text-highlight font-bold"

  return (
    <div className="flex flex-row items-center gap-4">
      {items.map((item, idx) => (
        <button
          key={idx}
          className={`w-fit rounded-lg border px-4 py-2 duration-300 ease-in-out ${
            idx === selectedIdx ? chosen : normal
          }`}
          onClick={() => {
            onSelect(idx)
          }}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Filter
