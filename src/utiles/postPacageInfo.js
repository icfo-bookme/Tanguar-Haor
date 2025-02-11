const postPackageInfo = async (packageData) => {
    try {
        const res = await fetch(`https://freecvbd.com/admin/api/tour-consultations`, {
            method: 'POST', // Change to POST
            headers: {
                'Content-Type': 'application/json', // Set content type
            },
            body: JSON.stringify(packageData), // Send data in the body
            cache: 'no-store', // Ensure no caching
        });

        if (!res.ok) {
            throw new Error(`Failed to post package info: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)

        return data; 
    } catch (error) {
        console.error('Error posting package info:', error);
        return { error: error.message }; // Return error message
    }  
};

export default postPackageInfo;
