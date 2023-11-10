import styles from "./styles.module.scss"

export const TextInput = ({
  id,
  placeholder,
  value,
  onChange
}: {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <input
      id={id}
      type="text"
      className={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  )
}

export default TextInput
