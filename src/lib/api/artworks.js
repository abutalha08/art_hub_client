const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getArtistArtworks = async (email) => {
    const res = await fetch(`${baseUrl}/api/artworks/${email}`);
    return res.json();
}