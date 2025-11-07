import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Note: This file is simplified to generate a basic icon, 
// as directly referencing external URLs in this context can be unreliable on some platforms.
// The most robust method for favicons is placing a static favicon.ico in the /public directory.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#00205B', // A color from ENSTA's branding
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
          fontWeight: 'bold',
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    }
  )
}
