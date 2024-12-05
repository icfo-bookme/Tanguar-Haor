const propertySummary = async () => {

    try {
        const response = await fetch(`https://freecvbd.com/admin/api/propertySummary`);
    const data = await response.json();
    return data; 
    } catch (error) {
        console.log(error);
        return []
    }
    
};

export default propertySummary;
