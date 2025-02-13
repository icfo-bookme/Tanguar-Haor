
const getPropertyPackages = async (id) => {
    try {
        const response = await fetch(`https://freecvbd.com/admin/api/propertyUnit/${id}`);
        const propertyPackages = await response.json();
        return propertyPackages;
    } catch (error) {
        console.log(error);
        return [];
    }  
};

export default getPropertyPackages;