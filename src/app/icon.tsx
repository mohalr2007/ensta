import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  const imageUrl = 'https://i.ibb.co/yF2Dh8W/ENSTA-logo.png';

  try {
    // Fetch the image data from the provided URL
    const response = await fetch(imageUrl, { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const image = await response.arrayBuffer();

    // Return the image as a response
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
            objectFit: 'contain',
          }}
        />
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating icon:', error);
    // Fallback to a default icon if fetching fails to avoid breaking the build
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#002B5B', // A blue background
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
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
