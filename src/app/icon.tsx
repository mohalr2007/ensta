
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
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const image = await response.arrayBuffer();

    return new ImageResponse(
      (
        <img
          width={size.width}
          height={size.height}
          src={Buffer.from(image).toString('base64')}
          alt="ENSTA Logo"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating icon:', error);
    // Return a default response in case of error
    return new Response('Error generating icon', { status: 500 });
  }
}
