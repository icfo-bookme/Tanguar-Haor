const getContactNumber = async () => {
    try {
        const res = await fetch(`https://freecvbd.com/admin/api/contact-attributes `, {
            cache: 'no-store', // Ensure no caching
        });
        const data = await res.json();
        return data; 
    } catch (error) {
        console.log('Error fetching contact attributes:', error);
        return [];
    }  
};

export default getContactNumber;
