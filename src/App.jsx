import { Suspense, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router";
import { Analytics } from "@vercel/analytics/react"

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
import NewsFeed from "./components/news-feed/NewsFeed";
import ArtistDetails from "./components/artist/ArtistDetails";

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
          classNames="bounce"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div style={{ minHeight: 'calc(100vh - 3.8rem)' }} ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginSection />} />
              <Route path="/register" element={<RegisterSection />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/contact" element={<ContactSectioin />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/news-feed" element={<NewsFeed />} />

              <Route path='/artists'>
                <Route index element={<ArtistsSection />} />
                <Route path=":artistId" element={<ArtistDetails />} />

              </Route>

              <Route path="/gallery">
                <Route path="" element={<GallerySection />} />
                <Route path="details/:tattooId" element={<DetailsSection />} />
              </Route>

            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>

      <Footer />
      <Analytics />
    </ContextProvider>
  );
}

export default App;
