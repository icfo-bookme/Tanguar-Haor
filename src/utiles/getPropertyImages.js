// utils/getPropertyImages.js
export const getPropertyImages = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertyImages/${id}`);
    const propertyImages = await response.json();
   
    return propertyImages; 
};
