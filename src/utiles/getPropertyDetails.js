const getPropertyDetails = async (id) => {
  try {
    const response = await fetch(
      `https://freecvbd.com/admin/api/propertySummary/${id}`
    );
    const propertyDetails = await response.json();
    return propertyDetails;
  } catch (error) {
    return [];
  }
};

export default getPropertyDetails;
