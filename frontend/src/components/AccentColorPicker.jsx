import { useRef, useEffect, useState } from 'react'
import './AccentColorPicker.css'

const ACCENT_COLORS = [
  { name: 'Navy Blue', value: '#1E3A8A' },
  { name: 'Light Blue', value: '#3B82F6' },
  { name: 'Black', value: '#1F2937' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Dark Green', value: '#065F46' }
]

export default function AccentColorPicker({ isOpen, selectedColor, onColorSelect, onClose, buttonRef }) {
  const dropdownRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (isOpen && buttonRef?.current && dropdownRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      setPosition({
        top: buttonRect.bottom + 8,
        left: buttonRect.left
      })
    }
  }, [isOpen, buttonRef])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef?.current && !dropdownRef.current.contains(e.target) && buttonRef?.current && !buttonRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, buttonRef])

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="accent-color-dropdown"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <div className="color-grid-compact">
        {ACCENT_COLORS.map(color => (
          <button
            key={color.value}
            className={`color-option-compact ${selectedColor === color.value ? 'selected' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => {
              onColorSelect(color.value)
              onClose()
            }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          >
            {selectedColor === color.value && (
              <span className="checkmark-compact">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
