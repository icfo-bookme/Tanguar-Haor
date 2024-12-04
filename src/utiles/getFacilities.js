

const getFacilities =  async(id) => {
    let res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertyfacilities/${id}`);
    let propertyFacilities = await res.json();
    return propertyFacilities;
};

export default getFacilities;