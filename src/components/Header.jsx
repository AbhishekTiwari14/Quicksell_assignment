/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react"
import "../styles/Header.css"

export function Header({ grouping, setGrouping, sorting, setSorting }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside)
    } else {
      document.removeEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="header">
      <button
        className="display-button"
        onClick={(e) => {
          e.stopPropagation()
          toggleDropdown()
        }}
      >
        <img src="/icons/Display.svg" alt="Display Icon" />
        Display
        <img src="/icons/down.svg" alt="Down Icon" />
      </button>

      {isDropdownOpen && (
        <div className="dropdown" ref={dropdownRef}>
          <div className="dropdown-row">
            <label>Grouping:</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-row">
            <label>Ordering:</label>
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </header>
  )
}
