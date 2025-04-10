const propertySummary = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary/1`, {
      cache: "no-store", // Ensure no caching
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
};

export default propertySummary;
