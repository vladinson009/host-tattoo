import { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router-dom";

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
import Logout from "./components/user/Logout";
import CreatePost from "./components/gallery/CreatePost";

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <ContextProvider>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="slide"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Routes location={location}>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginSection />} />
              <Route path="/register" element={<RegisterSection />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/contact" element={<ContactSectioin />} />
              <Route path="/artists" element={<ArtistsSection />} />
              <Route path="/create-post" element={<CreatePost />} />

              <Route path="/gallery">
                <Route path="" element={<GallerySection />} />
                <Route path="details/:tattooId" element={<DetailsSection />} />
              </Route>

            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </ContextProvider>
  );
}

export default App;
