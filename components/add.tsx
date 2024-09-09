import { useState } from 'react'

interface AddProps {
  onAdd: (value: string) => void
  placeholder: string
  buttonText: string
}

export default function Add({ onAdd, placeholder, buttonText }: AddProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-grow p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {buttonText}
      </button>
    </form>
  )
}