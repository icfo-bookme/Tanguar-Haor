

const getPropertyDetails = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary/${id}`);
    const propertyDetails = await response.json();
    return propertyDetails; 
    
};

export default getPropertyDetails;