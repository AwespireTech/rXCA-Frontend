import { Dialog, DialogContent } from "@mui/material"
import { ReactNode } from "react"

export const CustomDialog = ({
  isOpen = false,
  onClose,
  children
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: 12,
          margin: "0",
          padding: "0",
          height: "85%",
          width: "90%"
        }
      }}
    >
      <DialogContent>
        <div className="absolute left-1/2 top-1/2 box-border max-h-full w-full translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-md border border-secondary bg-primary p-8 pt-14 text-white">
          <div className="absolute right-4 top-4">
            <button onClick={onClose}>
              <svg className="h-4 w-4 stroke-white stroke-2 duration-300 ease-in-out hover:stroke-highlight">
                <line x1="0%" y1="0%" x2="100%" y2="100%" />
                <line x1="100%" y1="0%" x2="0%" y2="100%" />
              </svg>
            </button>
          </div>
          <div className="relative flex h-full w-full flex-col items-center gap-4 overflow-scroll">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
