import { Dialog } from "@headlessui/react"
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="relative mx-auto max-w-sm rounded bg-primary p-8 pt-14 text-white">
          <button onClick={onClose} className="absolute right-4 top-4 outline-none">
            <svg className="h-4 w-4 stroke-white stroke-2 duration-300 ease-in-out hover:stroke-highlight">
              <line x1="0%" y1="0%" x2="100%" y2="100%" />
              <line x1="100%" y1="0%" x2="0%" y2="100%" />
            </svg>
          </button>
          <div className="relative flex max-h-[50vh] w-full flex-col items-center gap-4 overflow-scroll">
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
