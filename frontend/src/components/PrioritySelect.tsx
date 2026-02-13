import { useState, useRef, useEffect } from 'react';
import type { Priority } from '../types/api';

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Baixa Prioridade' },
  { value: 'MEDIUM', label: 'Média Prioridade' },
  { value: 'HIGH', label: 'Alta Prioridade' },
  { value: 'VERY_HIGH', label: 'Altíssima Prioridade' },
];

const getPriorityStyles = (priority: string): string => {
  switch (priority) {
    case 'LOW':
      return 'bg-lowPrio text-lowPrioText';
    case 'MEDIUM':
      return 'bg-mediumPrio text-mediumPrioText';
    case 'HIGH':
      return 'bg-highPrio text-highPrioText';
    case 'VERY_HIGH':
      return 'bg-veryHighPrio text-veryHighPrioText';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getPriorityLabel = (priority: Priority): string => {
  const option = PRIORITY_OPTIONS.find(opt => opt.value === priority);
  return option?.label || priority;
};

interface PrioritySelectProps {
  value: Priority | '';
  onChange: (priority: Priority) => void;
  mode: 'badge' | 'form';
  disabled?: boolean;
}

export function PrioritySelect({ value, onChange, mode, disabled = false }: PrioritySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (priority: Priority) => {
    onChange(priority);
    setIsOpen(false);
  };

  if (mode === 'badge') {
    const displayPriority = value || 'MEDIUM';
    const displayLabel = value ? getPriorityLabel(value) : 'Prioridade';
    
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${getPriorityStyles(displayPriority)} ${
            disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:opacity-80'
          } transition duration-200`}
        >
          {displayLabel}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-bgLight rounded-md shadow-lg py-1 z-20 min-w-[140px] animate-fadeIn">
            {PRIORITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-options-button-hover transition duration-200 flex items-center gap-2 ${
                  value === option.value ? 'bg-options-button-hover' : ''
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${getPriorityStyles(option.value).split(' ')[0]}`} />
                <span className="text-white">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Form mode
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 rounded text-left text-white bg-transparent border border-white focus:outline-none focus:ring ring-white transition duration-200 flex items-center justify-between"
      >
        <span className={value ? '' : 'text-gray-400'}>
          {value ? getPriorityLabel(value) : 'Prioridade'}
        </span>
        
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-bgLight rounded-md shadow-lg py-1 z-20 animate-fadeIn border border-options-button-hover">
          <button
            onClick={() => handleSelect('' as Priority)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-options-button-hover transition duration-200 text-gray-400 ${
              !value ? 'bg-options-button-hover' : ''
            }`}
          >
            Prioridade
          </button>
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-options-button-hover transition duration-200 flex items-center gap-2 ${
                value === option.value ? 'bg-options-button-hover' : ''
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${getPriorityStyles(option.value).split(' ')[0]}`} />
              <span className="text-white">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
