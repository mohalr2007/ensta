
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <img 
            src="https://elearning.ensta.edu.dz/pluginfile.php/1/theme_academi/footerlogo/1715699273/ENSTA%20logo.png" 
            alt="ENSTA Logo"
            width={32}
            height={32}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
