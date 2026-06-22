'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createArtwork = async (newArtworkData) => {
    const res = await fetch(`${baseUrl}/api/artworks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArtworkData),
    });

    return res.json();
}