const propertySummary = async () => {

    try {
        const res = await fetch(`https://freecvbd.com/admin/api/propertySummary`);
    const data = await res.json();
    return data; 
    } catch (error) {
        console.log(error);
        return []
    }  
    ////
    
};

export default propertySummary;
