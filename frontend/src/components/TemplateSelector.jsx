import { useRef, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import './TemplateSelector.css'

const TEMPLATES = [
  {
    id: 'template1',
    name: 'Classic',
    description: 'A clean, traditional resume format with clear sections and professional typography'
  },
  {
    id: 'template2',
    name: 'Modern',
    description: 'Professional black and white resume with clean formatting and bulleted points'
  },
  {
    id: 'template3',
    name: 'Minimal Image',
    description: 'Minimal design with a single image and clean typography'
  },
  {
    id: 'template4',
    name: 'Professional',
    description: 'Professional multi-section layout with comprehensive formatting'
  }
]

export default function TemplateSelector({ isOpen, selectedTemplate, onTemplateSelect, onClose, buttonRef }) {
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
      if (dropdownRef?.current && !dropdownRef.current.contains(e.target) && 
          buttonRef?.current && !buttonRef.current.contains(e.target)) {
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
      className="template-selector-dropdown"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
    >
      <div className="template-grid">
        {TEMPLATES.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => {
              onTemplateSelect(template.id)
              onClose()
            }}
          >
            <div className="template-card-header">
              <h4 className="template-name">{template.name}</h4>
              {selectedTemplate === template.id && (
                <Check size={20} className="checkmark-icon" />
              )}
            </div>
            <p className="template-description">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
