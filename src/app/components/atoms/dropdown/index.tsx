import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"

export const Dropdown = ({
  id,
  items,
  selectedItem,
  onSelect,
  full = false
}: {
  id: string
  items: string[]
  selectedItem: string
  // selectedIdx: number,
  onSelect: (item: string) => void
  full?: boolean
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const selectedIdx = items.indexOf(selectedItem)

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

  const handleOnSelect = (item: string) => {
    onSelect(item)
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
        <p id={`${id}_shownText`}>{items[selectedIdx]}</p>
        <svg>
          <polygon points="0,0 8,8 16,0" />
        </svg>
      </button>

      <div className={`${styles.dropdownList} ${showDropdown ? styles.show : ""}`}>
        {items.map((item, idx) => (
          <button
            key={idx}
            className={styles.dropdownListItem}
            onClick={() => {
              handleOnSelect(items[idx])
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
