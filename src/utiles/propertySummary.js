const propertySummary = async () => {
    try {
        // Log the API URL to confirm it's being hit
        console.log('Fetching data from:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary`);

        // Fetch data from the API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/propertySummary`);
        
        // Log the response status to confirm if it's a successful request
        console.log('Response Status:', response.status);

        // Check if the response is successful
        if (!response.ok) {
            console.error('Failed to fetch data, status code:', response.status);
            return [];
        }

        // Convert the response into JSON
        const data = await response.json();

        // Log the fetched data to ensure it's in the correct format
        console.log('Fetched Data:', data);
        
        return data;
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
        return [];
    }
};

export default propertySummary;
