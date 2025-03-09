import { Route, Routes } from "react-router-dom";
import ContextProvider from "./context/ContextProvider1";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import LoginSection from "./components/user/LoginSection";
import RegisterSection from "./components/user/RegisterSection";
import ContactSectioin from "./components/contact/ContactSection";
import GallerySection from "./components/gallery/GallerySection";
import DetailsSection from "./components/gallery/DetailsSection";
import ArtistsSection from "./components/artist/ArtistsSection";
function App() {

  return (
    <ContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactSectioin />} />
        <Route path="/artists" element={<ArtistsSection />} />

        <Route path="/gallery">
          <Route path="" element={<GallerySection />} />
          <Route path="details/:tattooId" element={<DetailsSection />} />
        </Route>

        <Route path="/users">
          <Route path="login" element={<LoginSection />} />
          <Route path="register" element={<RegisterSection />} />
        </Route>

      </Routes>
      <Footer />
    </ContextProvider>
  )
}

export default App
