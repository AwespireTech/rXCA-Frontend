import { Dao } from "@/interfaces/dao.interface"
import lang from "@../../../public/lang/en.json"
import OpenInNew from "../atoms/open-in-new"

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <p className="text-deepgray">{`${label} :`}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}

export const DAOView = ({ dao, children }: { dao: Dao; children: React.ReactNode }) => {
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
        <div>{dao.name}</div>
      </div>

      <div className="flex flex-col gap-2">
        <Row label={lang.dao.address.label} value={dao.address} />
        <Row label={lang.dao.daoUri.label} value={dao.daoUri!} />
        <Row label={lang.dao.managerAddress.label} value={dao.managerAddress} />
        <Row label={lang.dao.network.label} value={dao.network} />
      </div>

      <div className="grid grid-cols-2 divide-x divide-dashed divide-deepgray border-y border-dashed border-deepgray">
        <div className="flex flex-col items-start py-2">
          <Row label={lang.dao.desc.label} value={dao.description} />
        </div>
        <div className="flex flex-col items-end gap-1 py-2">
          <OpenInNew label={lang.dao.membersUri.label.split(" ")[0]} link={dao.membersUri} />
          <OpenInNew
            label={lang.dao.governanceDocument.label.split(" ")[0]}
            link={dao.governanceDocument}
          />
          <OpenInNew label={lang.dao.proposalsUri.label.split(" ")[0]} link={dao.proposalsUri} />
          <OpenInNew label={lang.dao.issuersUri.label.split(" ")[0]} link={dao.issuersUri} />
        </div>
      </div>

      <div className="m-auto">{children}</div>
    </div>
  )
}

export default DAOView
