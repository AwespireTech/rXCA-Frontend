export const OpenInNew = ({ label, link }: { label: string; link: string }) => {
  return (
    <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
      <p>{label}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 fill-white"
        width="19"
        height="18"
        viewBox="0 0 19 18"
      >
        <path d="M15.0417 14.1334H3.95832V3.72174H9.5V2.23438H3.95832C3.07958 2.23438 2.375 2.90369 2.375 3.72174V14.1334C2.375 14.9514 3.07958 15.6207 3.95832 15.6207H15.0417C15.9125 15.6207 16.625 14.9514 16.625 14.1334V8.92756H15.0417V14.1334ZM11.0833 2.23438V3.72174H13.9254L6.14332 11.0322L7.2596 12.0808L15.0417 4.77036V7.44019H16.625V2.23438H11.0833Z" />
      </svg>
    </div>
  )
}

export default OpenInNew
