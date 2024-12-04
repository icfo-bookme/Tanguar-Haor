

const getPropertyDetails = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary/${id}`);
        const propertyDetails = await response.json();
        return propertyDetails; 
    } catch (error) {
        console.log(error);
        return [];
    }
   
    
};

export default getPropertyDetails;