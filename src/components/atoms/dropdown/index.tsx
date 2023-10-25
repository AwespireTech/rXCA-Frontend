import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"

export const Dropdown = ({
  id,
  options,
  selectedOption,
  onSelect,
  full = false
}: {
  id: string
  options: string[]
  selectedOption: string
  onSelect: (option: string) => void
  full?: boolean
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const selectedIdx = options.indexOf(selectedOption)

  useEffect(() => {
    const handleOnClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`#${id}`)) {
        setShowDropdown(false)
      }
    }

    window.addEventListener("click", handleOnClickOutside)
    return () => {
      window.removeEventListener("click", handleOnClickOutside)
    }
  }, [id])

  const handleOnSelect = (option: string) => {
    onSelect(option)
    setShowDropdown(false)
  }

  return (
    <div id={id} className={`${styles.dropdown} ${full ? styles.full : ""}`}>
      <button
        className={styles.dropdownButton}
        onClick={() => {
          setShowDropdown((state) => !state)
        }}
      >
        <p id={`${id}_shownText`}>{options[selectedIdx]}</p>
        <svg>
          <polygon points="0,0 8,8 16,0" />
        </svg>
      </button>

      <div className={`${styles.dropdownList} ${showDropdown ? styles.show : ""}`}>
        {options.map((option, idx) => (
          <button
            key={idx}
            className={styles.dropdownListItem}
            onClick={() => {
              handleOnSelect(options[idx])
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
