import OpenInNew from "../atoms/open-in-new"

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-deepgray">{`${label} :`}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}

export const DAOView = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg border-2 border-highlight bg-secondary p-4">
      <div className="flex flex-col text-xl">
        <div className="flex flex-row items-center gap-8">
          <p className="text-deepgray">#1</p>
          <svg className="h-4 w-12 fill-highlight">
            <polygon points="0,8 12,0 12,16" />
            <polygon points="18,8 30,0 30,16" />
            <polygon points="36,8 48,0 48,16" />
          </svg>
        </div>
        <div>DOWDAO</div>
      </div>

      <div className="flex flex-col gap-2">
        <Row label="Contract address" value="0x1234567890123456789012345678901234567890" />
      </div>

      <div className="grid grid-cols-2 divide-x divide-dashed divide-deepgray border-y border-dashed border-deepgray">
        <div className="flex flex-col items-start py-2">
          <Row label="Description" value="A DAO for DOW" />
        </div>
        <div className="flex flex-col items-end gap-1 py-2">
          <OpenInNew label="Members" link="" />
          <OpenInNew label="Members" link="" />
        </div>
      </div>

      <div className="m-auto">{children}</div>
    </div>
  )
}

export default DAOView
