import { supabase } from '../lib/supabase'

const MAX_EDGE = 1600
const QUALITY = 0.72

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('Could not compress this image.')
  }
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const webp = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', QUALITY),
  )
  if (webp) return { blob: webp, type: 'image/webp', ext: 'webp' }

  const jpeg = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', QUALITY),
  )
  if (!jpeg) throw new Error('Could not compress this image.')
  return { blob: jpeg, type: 'image/jpeg', ext: 'jpg' }
}

/** Shrink the file, then store it in the public cms-images bucket. */
export async function uploadCmsImage(file: File) {
  if (!supabase) throw new Error('Supabase is not configured.')
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.')

  const { blob, type, ext } = await compressImage(file)
  const path = `stories/${Date.now()}-${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('cms-images').upload(path, blob, {
    contentType: type,
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('cms-images').getPublicUrl(path)
  return data.publicUrl
}
