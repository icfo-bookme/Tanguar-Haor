

const getFacilities =  async(id) => {
    let res= await fetch(`http://127.0.0.1:8000/api/propertyfacilities/${id}`);
    let propertyFacilities = await res.json();
    return propertyFacilities;
};

export default getFacilities;