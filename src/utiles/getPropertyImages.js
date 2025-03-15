export const getPropertyImages = async (id) => {
  try {
    const response = await fetch(
      `https://freecvbd.com/admin/api/propertyImages/${id}`
    );
    const propertyImages = await response.json();
    return propertyImages;
  } catch (error) {
    return [];
  }
};
