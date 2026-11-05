import { useState } from 'react'
import { uploadCmsImage } from '../../cms/uploadImage'

type Mode = 'link' | 'upload'

const inputClass =
  'mt-1 w-full border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary'

export function ImageSourceField({
  label,
  value,
  onChange,
  onBusy,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  onBusy?: (busy: boolean) => void
}) {
  const [mode, setMode] = useState<Mode>('link')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function choose(next: Mode) {
    setMode(next)
    setError(null)
  }

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    onBusy?.(true)
    setError(null)
    try {
      onChange(await uploadCmsImage(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
      onBusy?.(false)
    }
  }

  return (
    <div className="block text-sm">
      {label ? <span className="text-ink/70">{label}</span> : null}
      <div className={`flex gap-2 ${label ? 'mt-1' : ''}`}>
        {(['link', 'upload'] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => choose(option)}
            className={`border px-3 py-1 text-xs font-medium ${
              mode === option
                ? 'border-primary bg-primary text-warm-white'
                : 'border-ink/15 text-ink/70'
            }`}
          >
            {option === 'link' ? 'Link' : 'Upload'}
          </button>
        ))}
      </div>
      {mode === 'link' ? (
        <input
          value={value}
          placeholder="https://"
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ''
            void onFile(file)
          }}
          className={inputClass}
        />
      )}
      {busy ? (
        <p className="mt-1 text-xs text-ink/55">Compressing and uploading…</p>
      ) : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
      {value ? (
        <img
          src={value}
          alt=""
          className="mt-2 h-20 w-32 object-cover"
          referrerPolicy="no-referrer"
        />
      ) : null}
    </div>
  )
}
