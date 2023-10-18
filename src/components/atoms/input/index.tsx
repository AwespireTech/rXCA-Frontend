import styles from "./styles.module.scss"

export const TextInput = ({
  id,
  placeholder,
  value,
  isRequired = false,
  onChange
}: {
  id: string
  placeholder: string
  value: string
  isRequired?: boolean
  onChange: (value: string) => void
}) => {
  const handleOnChange = (value: string) => {
    if (isRequired) {
      const inputEl = document.getElementById(id)
      if (value === "") {
        inputEl?.classList.add(styles.error)
      } else {
        inputEl?.classList.remove(styles.error)
      }
    }
    onChange(value)
  }

  return (
    <input
      id={id}
      type="text"
      className={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        handleOnChange(event.target.value)
      }}
    />
  )
}

export default TextInput
