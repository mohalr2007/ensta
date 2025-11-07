
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  const imageUrl = 'https://i.ibb.co/yF2Dh8W/ENSTA-logo.png';

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      // If fetching fails, return a default response to avoid breaking the build.
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 24,
              background: '#f8f9fa',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#343a40',
              borderRadius: '50%',
            }}
          >
            E
          </div>
        ),
        {
          ...size,
        }
      );
    }
    const image = await response.arrayBuffer();

    // The 'src' attribute for img in ImageResponse expects a Buffer or a Base64 string.
    // We cannot pass the ArrayBuffer directly.
    return new ImageResponse(
      (
        <img
          width={size.width}
          height={size.height}
          src={image as any}
          alt="ENSTA Logo"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%', // Making it round like a typical favicon
          }}
        />
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating icon:', error);
    // Return a default response in case of any other error
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#f8f9fa',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#343a40',
            borderRadius: '50%',
          }}
        >
          E
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
