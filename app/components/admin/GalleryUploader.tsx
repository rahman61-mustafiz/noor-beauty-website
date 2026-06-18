'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const input =
  'rounded-sm border border-paper/15 bg-ink px-3 py-2 text-sm text-paper outline-none focus:border-gold'

export default function GalleryUploader({ categories }: { categories: readonly string[] }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const file = data.get('file')

    if (!(file instanceof File) || file.size === 0) {
      setStatus('error')
      setMessage('Please choose a file first.')
      return
    }

    setStatus('uploading')
    setMessage(`Uploading ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)…`)

    try {
      const res = await fetch('/api/admin/gallery', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMessage(json.error ?? `Upload failed (${res.status}).`)
        return
      }
      setStatus('done')
      setMessage('Uploaded successfully ✓')
      form.reset()
      router.refresh()
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 2500)
    } catch {
      setStatus('error')
      setMessage('Network error — please try again.')
    }
  }

  const uploading = status === 'uploading'

  return (
    <form
      onSubmit={onSubmit}
      className="mb-10 grid gap-4 rounded-sm border border-dashed border-paper/20 bg-ink-soft p-6 md:grid-cols-4"
    >
      <div className="md:col-span-2">
        <label className="mb-1 block text-sm text-paper/70">File (image or video) *</label>
        <input
          type="file"
          name="file"
          accept="image/*,video/*"
          required
          className={`${input} w-full file:mr-3 file:rounded-sm file:border-0 file:bg-gold file:px-3 file:py-1 file:text-ink`}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-paper/70">Category *</label>
        <select name="category" required className={`${input} w-full`} defaultValue={categories[0]}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-paper/70">Caption</label>
        <input name="caption" className={`${input} w-full`} placeholder="Optional" />
      </div>
      <div className="flex items-center gap-4 md:col-span-4">
        <button type="submit" disabled={uploading} className="btn-gold disabled:opacity-60">
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        {message && (
          <span
            className={`text-sm ${
              status === 'error' ? 'text-gold' : status === 'done' ? 'text-gold' : 'text-paper/60'
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
