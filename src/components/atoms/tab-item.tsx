export const TabItem = ({
  selected = false,
  onClick,
  children
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) => {
  let style = ""
  switch (selected) {
    default:
    case false:
      style =
        "bg-transparent text-white border-white font-normal hover:bg-white hover:text-highlight hover:border-highlight hover:font-bold"
      break
    case true:
      style = "bg-white text-highlight border-highlight font-bold"
      break
  }

  const handleOnClick = () => {
    if (!selected) {
      onClick()
    }
  }

  return (
    <button
      className={`w-fit rounded-md border-2 px-4 py-2 duration-200 ease-in-out ${style}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  )
}

export default TabItem
