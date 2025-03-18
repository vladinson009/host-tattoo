import TattoosComponent from "./TattoosComponent";
import { fetchGallery } from "./galleryUtils";


export default function GallerySection() {
    return <TattoosComponent title={'Our Tattoo Gallery'} fetchData={fetchGallery} />
}