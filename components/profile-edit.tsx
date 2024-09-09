import { useState } from 'react'

interface ProfileEditProps {
  initialUrls: Array<{ platform: string; url: string }>
  onSave: (urls: Array<{ platform: string; url: string }>) => void
}

export default function ProfileEdit({ initialUrls, onSave }: ProfileEditProps) {
  const [urls, setUrls] = useState(initialUrls)

  const handleUrlChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newUrls = [...urls]
    newUrls[index][field] = value
    setUrls(newUrls)
  }

  const handleAddUrl = () => {
    setUrls([...urls, { platform: '', url: '' }])
  }

  const handleRemoveUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index)
    setUrls(newUrls)
  }

  const handleSave = () => {
    onSave(urls)
  }

  return (
    <div className="space-y-4">
      {urls.map((url, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={url.platform}
            onChange={(e) => handleUrlChange(index, 'platform', e.target.value)}
            placeholder="Platform"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={url.url}
            onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
            placeholder="URL"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => handleRemoveUrl(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddUrl}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Add URL
      </button>
      <button
        onClick={handleSave}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  )
}