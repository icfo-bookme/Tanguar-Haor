const propertySummary = async () => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary`);
    const data = await response.json();
    return data; 
    } catch (error) {
        console.log(error);
        return []
    }
    
};

export default propertySummary;
