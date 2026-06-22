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

// প্রোফাইল আপডেট করার জন্য ফ্রন্টএন্ড ফাংশন
export const updateArtistProfile = async (currentEmail, updateData) => {
    const res = await fetch(`${baseUrl}/api/users/${currentEmail}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });
    return res.json();
}