import { Dao } from "@/interfaces/dao.interface"
import lang from "@/lang/zh"
import OpenInNew from "../atoms/open-in-new"
import { API_URL, DaoStates, ETHERSCAN_LINK } from "@/constant"
import { shortenWallet } from "@/utils/string"
import Image from "next/image"
import { validateUrl } from "@/utils/validate"

const Row = ({
  label,
  type = "text",
  value,
  link = "",
  lineClamp = 0
}: {
  label: string
  type?: "text" | "link"
  value: string
  link?: string
  lineClamp?: number
}) => {
  return (
    <div className="flex w-full flex-col">
      <p className="text-deepgray">{`${label}:`}</p>
      <div className="flex flex-row items-center gap-2">
        {type === "text" && (
          <>
            <p className={`max-w-[90%] break-words ${lineClamp > 0 && `line-clamp-${lineClamp}`}`}>
              {value}
            </p>
            {link && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 11"
                className="h-3 w-3 flex-none fill-white duration-300 ease-in-out hover:cursor-pointer hover:fill-highlight"
                onClick={() => {
                  window.open(link, "_blank")
                }}
              >
                <path d="M7.01707 3.98301C8.30069 5.26797 8.28308 7.32808 7.0248 8.59334C7.02244 8.59591 7.01965 8.59871 7.01707 8.60128L5.57332 10.045C4.29994 11.3184 2.22822 11.3182 0.955034 10.045C-0.318345 8.77187 -0.318345 6.69992 0.955034 5.42676L1.75223 4.62956C1.96364 4.41816 2.32771 4.55866 2.33863 4.85743C2.35255 5.23817 2.42083 5.6207 2.54681 5.9901C2.58948 6.11518 2.55899 6.25354 2.46554 6.347L2.18437 6.62816C1.58225 7.23028 1.56336 8.2107 2.15956 8.81871C2.76163 9.43271 3.75125 9.43636 4.35795 8.82966L5.8017 7.38613C6.40736 6.78047 6.40483 5.80151 5.8017 5.19838C5.72218 5.11902 5.64209 5.05736 5.57953 5.01428C5.53527 4.98389 5.49872 4.94357 5.47281 4.89655C5.4469 4.84953 5.43233 4.7971 5.43027 4.74345C5.42177 4.51643 5.5022 4.28248 5.6816 4.10309L6.13393 3.65074C6.25255 3.53212 6.43862 3.51755 6.57616 3.61355C6.73368 3.72354 6.88122 3.84717 7.01707 3.98301ZM10.045 0.954968C8.77178 -0.318237 6.70007 -0.318409 5.42669 0.954968L3.98294 2.39872C3.98036 2.40129 3.97756 2.40409 3.9752 2.40666C2.71695 3.67192 2.69931 5.73203 3.98294 7.01699C4.11878 7.15283 4.26631 7.27645 4.42382 7.38643C4.56136 7.48242 4.74746 7.46784 4.86605 7.34924L5.31838 6.89689C5.49778 6.7175 5.57821 6.48355 5.56971 6.25653C5.56765 6.20288 5.55309 6.15045 5.52717 6.10343C5.50126 6.05641 5.46472 6.01609 5.42046 5.9857C5.35789 5.94262 5.2778 5.88096 5.19829 5.8016C4.59515 5.19847 4.59262 4.21951 5.19829 3.61385L6.64204 2.17032C7.24873 1.56362 8.23833 1.56727 8.84042 2.18127C9.43662 2.78928 9.41775 3.7697 8.81561 4.37182L8.53444 4.65298C8.44099 4.74644 8.4105 4.8848 8.45317 5.00988C8.57915 5.37928 8.64743 5.76181 8.66135 6.14255C8.67229 6.44131 9.03634 6.58182 9.24775 6.37042L10.0449 5.57322C11.3183 4.30008 11.3183 2.22813 10.045 0.954968Z" />
              </svg>
            )}
          </>
        )}

        {type === "link" && (
          <a
            href={validateUrl(value)}
            target="_blank"
            className={`w-full break-words text-white ${
              lineClamp > 0 && `line-clamp-${lineClamp}`
            } hover:text-highlight hover:underline`}
            rel="noopener noreferrer"
          >
            {value}
          </a>
        )}
      </div>
    </div>
  )
}

export const DaoPreview = ({
  dao,
  onExpand = () => {},
  showState = false,
  children
}: {
  dao: Dao
  onExpand?: () => void
  showState?: boolean
  children?: React.ReactNode
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-6 rounded-lg border-2 border-highlight bg-secondary p-4 ${
        !children && "pb-0"
      }`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col text-xl">
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex w-full flex-row items-end gap-2">
              <p className="leading-5 text-deepgray">{`#${dao.id}`}</p>
              {showState && (
                <div
                  className={`w-fit rounded-md bg-white px-1 py-0.5 text-xs leading-3 ${
                    dao.state === DaoStates.Pending
                      ? "text-label-pending"
                      : dao.state === DaoStates.Approved
                        ? "text-label-approved"
                        : "text-label-denied"
                  }`}
                >
                  {dao.state === DaoStates.Pending
                    ? lang.label.pending
                    : dao.state === DaoStates.Approved
                      ? lang.label.approved
                      : dao.state === DaoStates.Denied && lang.label.denied}
                </div>
              )}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-white duration-300 ease-in-out hover:cursor-pointer hover:fill-highlight"
              onClick={() => {
                onExpand()
              }}
            >
              <g clipPath="url(#clip0_105_758)">
                <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" />
              </g>
              <defs>
                <clipPath id="clip0_105_758">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {/* <svg className="h-4 w-12 fill-highlight">
              <polygon points="0,8 12,0 12,16" />
              <polygon points="18,8 30,0 30,16" />
              <polygon points="36,8 48,0 48,16" />
            </svg> */}
          </div>
          <div className="line-clamp-1 break-words">{dao.name}</div>
        </div>

        <div className="flex flex-col gap-2">
          <Row
            label={lang.dao.address.label}
            value={shortenWallet(dao.address)}
            link={`${ETHERSCAN_LINK}/${dao.address}`}
            lineClamp={1}
          />
          <Row label={lang.dao.network.label} value={dao.network} />
          <Row
            label={lang.dao.daoUri.label}
            type="link"
            value={`${API_URL}/dao/${dao.address}`}
            lineClamp={1}
          />
          <Row
            label={lang.dao.managerAddress.label}
            type={dao.managerAddress ? "link" : "text"}
            value={dao.managerAddress || lang.hint.none}
            lineClamp={1}
          />
        </div>
      </div>

      <div
        className={`grid h-full grid-cols-2 divide-x divide-dashed divide-deepgray border-t ${
          children && "border-b"
        } border-dashed border-deepgray`}
      >
        <div className={`flex flex-col items-start py-2 pr-2 ${!children && "pb-4"}`}>
          <Row label={lang.dao.desc.label} value={dao.description} lineClamp={4} />
        </div>
        <div
          className={`flex flex-col items-end justify-end gap-1 py-2 pl-1 ${!children && "pb-4"}`}
        >
          {/* // TODO: parse ipfs hash to link */}
          <OpenInNew label={lang.dao.membersUri.label.split(" ")[0]} link={dao.membersUri} />
          <OpenInNew label={lang.dao.proposalsUri.label.split(" ")[0]} link={dao.proposalsUri} />
          <OpenInNew label={lang.dao.issuersUri.label.split(" ")[0]} link={dao.issuersUri} />

          {dao.governanceDocument && (
            <OpenInNew
              label={lang.dao.governanceDocument.label.split(" ")[0]}
              link={dao.governanceDocument}
            />
          )}

          {dao.contractsRegUri && (
            <OpenInNew
              label={lang.dao.contractsRegUri.label.split(" ")[0]}
              link={dao.contractsRegUri}
            />
          )}
        </div>
      </div>

      {children && (
        <div className="flex w-full flex-row items-center justify-around">{children}</div>
      )}
    </div>
  )
}

export const DaoView = ({ dao }: { dao: Dao }) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-scroll">
      {dao.state === DaoStates.Approved && (
        <Image src="/images/token.png" width={100} height={100} alt="token" className="m-auto" />
      )}

      <div className="flex flex-col gap-0 text-xl">
        {/* <p className="text-deepgray">{`#${dao.id}`}</p> */}
        <div className="flex w-full flex-row items-end gap-2">
          <p className="leading-5 text-deepgray">{`#${dao.id}`}</p>
          <div
            className={`w-fit rounded-md bg-white px-1 py-0.5 text-xs leading-3 ${
              dao.state === DaoStates.Pending
                ? "text-label-pending"
                : dao.state === DaoStates.Approved
                  ? "text-label-approved"
                  : "text-label-denied"
            }`}
          >
            {dao.state === DaoStates.Pending
              ? lang.label.pending
              : dao.state === DaoStates.Approved
                ? lang.label.approved
                : dao.state === DaoStates.Denied && lang.label.denied}
          </div>
        </div>

        <div className="line-clamp-1 break-words">{dao.name}</div>
      </div>

      <Row label={lang.dao.desc.label} value={dao.description} />

      <Row
        label={lang.dao.address.label}
        value={dao.address}
        link={`${ETHERSCAN_LINK}/${dao.address}`}
      />

      <Row label={lang.dao.network.label} value={dao.network} />

      <Row label={lang.dao.daoUri.label} type="link" value={`${API_URL}/dao/${dao.address}`} />

      <Row
        label={lang.dao.managerAddress.label}
        type={dao.managerAddress ? "link" : "text"}
        value={dao.managerAddress || lang.hint.none}
      />

      <Row label={lang.dao.membersUri.label} type="link" value={dao.membersUri} />

      <Row label={lang.dao.proposalsUri.label} type="link" value={dao.proposalsUri} />

      <Row label={lang.dao.issuersUri.label} type="link" value={dao.issuersUri} />

      <Row
        label={lang.dao.governanceDocument.label}
        type={dao.governanceDocument ? "link" : "text"}
        value={dao.governanceDocument || lang.hint.none}
      />

      <Row
        label={lang.dao.contractsRegUri.label}
        type={dao.contractsRegUri ? "link" : "text"}
        value={dao.contractsRegUri || lang.hint.none}
      />
    </div>
  )
}

export default DaoPreview
