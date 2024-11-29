
import { getPropertyImages } from "@/utiles/getPropertyImages";
import ImageCarousel from "@/utiles/ImageCarousel";


// The component is now a server component (no use of `getServerSideProps`)
export default async function Page({ params }) {
    const {id}=await params;
    // Fetch property images using the parameter from the URL
    const propertyImages = await getPropertyImages(id);

    // Handle case where no images are found or data is missing
    if (!propertyImages || propertyImages.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-8">
                <ImageCarousel propertyImages={propertyImages} />
            </div>
        </div>
    );
}
