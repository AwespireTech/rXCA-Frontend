import lang from "@/lang/zh"

export const FormItem = ({
  label,
  isRequired = false,
  children
}: {
  label: string
  isRequired?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-xl">
        {label}
        <span className="text-highlight">{isRequired ? "*" : ` (${lang.hint.optional})`}</span>
        <span>:</span>
      </p>
      {children}
    </div>
  )
}

export default FormItem
