const getFacilities = async (id) => {
  try {
    let res = await fetch(
      `https://freecvbd.com/admin/api/propertyfacilities/${id}`
    );
    let propertyFacilities = await res.json();
    return propertyFacilities;
  } catch (error) {
    return [];
  }
};

export default getFacilities;
