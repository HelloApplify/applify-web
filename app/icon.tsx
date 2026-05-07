import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFile } from 'fs/promises'

export const size = { width: 256, height: 256 }
export const contentType = 'image/png'

export default async function Icon() {
  // Read the raw image buffer from the public folder
  const imageBuffer = await readFile(join(process.cwd(), 'public/applify-logo.png'))
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent'
        }}
      >
        <img 
          src={base64Image}
          width={256}
          height={201}
          alt="Applify Icon"
          style={{ display: 'flex' }}
        />
      </div>
    ),
    { ...size }
  )
}
