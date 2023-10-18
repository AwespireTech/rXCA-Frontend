import { Dao } from "@/interfaces/dao.interface"
import lang from "@../../../public/lang/en.json"
import OpenInNew from "../atoms/open-in-new"

const Row = ({
  label,
  value,
  lineClamp = 1
}: {
  label: string
  value: string
  lineClamp?: number
}) => {
  return (
    <div className="flex w-full flex-col">
      <p className="text-deepgray">{`${label}:`}</p>
      <p className={`break-words text-sm line-clamp-${lineClamp}`}>{value}</p>
    </div>
  )
}

export const DaoView = ({ dao, children }: { dao: Dao; children?: React.ReactNode }) => {
  return (
    <div
      className={`flex flex-col gap-6 rounded-lg border-2 border-highlight bg-secondary p-4 ${
        !children && "pb-0"
      }`}
    >
      <div className="flex flex-col text-xl">
        <div className="flex flex-row items-center gap-8">
          <p className="text-deepgray">{`#${dao.id}`}</p>
          {/* <svg className="h-4 w-12 fill-highlight">
            <polygon points="0,8 12,0 12,16" />
            <polygon points="18,8 30,0 30,16" />
            <polygon points="36,8 48,0 48,16" />
          </svg> */}
        </div>
        <div>{dao.name}</div>
      </div>

      <div className="flex flex-col gap-2">
        {/* // TODO: link to address (https://sepolia.etherscan.io/address/${dao.address}) */}
        {/* // TODO: line clamp */}
        <Row label={lang.dao.address.label} value={dao.address} />
        {/* // TODO: add dao uri */}
        {/* <Row label={lang.dao.daoUri.label} value={dao.daoUri!} /> */}
        <Row label={lang.dao.managerAddress.label} value={dao.managerAddress || "None"} />
        <Row label={lang.dao.network.label} value={dao.network} />
      </div>

      <div
        className={`grid grid-cols-2 divide-x divide-dashed divide-deepgray border-t ${
          children && "border-b"
        } border-dashed border-deepgray`}
      >
        <div className={`flex flex-col items-start py-2 pr-2 ${!children && "pb-4"}`}>
          <Row label={lang.dao.desc.label} value={dao.description} lineClamp={4} />
        </div>
        <div className={`flex flex-col items-end gap-1 py-2 pl-1 ${!children && "pb-4"}`}>
          {/* // TODO: parse ipfs hash to link */}
          <OpenInNew label={lang.dao.membersUri.label.split(" ")[0]} link={dao.membersUri} />
          {dao.governanceDocument && (
            <OpenInNew
              label={lang.dao.governanceDocument.label.split(" ")[0]}
              link={dao.governanceDocument}
            />
          )}
          <OpenInNew label={lang.dao.proposalsUri.label.split(" ")[0]} link={dao.proposalsUri} />
          <OpenInNew label={lang.dao.issuersUri.label.split(" ")[0]} link={dao.issuersUri} />
          {/* // TODO: contractsreguri */}
        </div>
      </div>

      {children && (
        <div className="flex w-full flex-row items-center justify-around">{children}</div>
      )}
    </div>
  )
}

export default DaoView
