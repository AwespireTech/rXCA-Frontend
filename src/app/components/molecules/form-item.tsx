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
      <p className="text-lg">
        {label}
        <span className="text-highlight">{isRequired ? "*" : " (optional)"}</span>
        <span>:</span>
      </p>
      {children}
    </div>
  )
}
