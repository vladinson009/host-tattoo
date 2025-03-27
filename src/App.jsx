import { Suspense, useRef, lazy } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Routes, useLocation } from "react-router";
import { Analytics } from "@vercel/analytics/react"

import ContextProvider from "./context/ContextProvider";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import NewsFeed from "./components/post/NewsFeed";
import LoginSection from "./components/user/LoginSection";
import RegisterSection from "./components/user/RegisterSection";
import Logout from "./components/user/Logout";
import GallerySection from "./components/gallery/GallerySection";
import DetailsSection from "./components/gallery/DetailsSection";
import CreatePost from "./components/post/CreatePost";
import ArtistsSection from "./components/artist/ArtistsSection";
import ArtistDetails from "./components/artist/ArtistDetails";
import Spinner from "./components/partials/Spinner";
import PublicGuard from "./components/guards/PublicGuard";
import PrivateGuard from "./components/guards/PrivateGuard";
import CreateTattoo from "./components/gallery/CreateTattoo";
import BookingSection from "./components/booking/BookingSection";
import NotFound from "./components/error/NotFound";
import Error from "./components/error/Error";

const MyPosts = lazy(() => import("./components/profile/MyPosts"));
const MyMessages = lazy(() => import("./components/profile/MyMessages"));
const MyPortfolio = lazy(() => import("./components/profile/MyPortfolio"));
const WishlistSection = lazy(() => import("./components/wishlist/WishlistSection"));

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
          classNames="fade"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div style={{ minHeight: 'calc(100vh - 3.8rem)' }} ref={nodeRef}>
            <Suspense fallback={<Spinner />}>
              <Routes location={location}>

                <Route element={<PublicGuard />} >
                  <Route path="/login" element={<LoginSection />} />
                  <Route path="/register" element={<RegisterSection />} />
                </Route >
                <Route element={<PrivateGuard />}>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/wishlist" element={<WishlistSection />} />
                  <Route path="/booking" element={<BookingSection />} />
                  <Route path="/my-posts" element={<MyPosts />} />
                  <Route path="/my-portfolio" element={<MyPortfolio />} />
                  <Route path="/my-messages" element={<MyMessages />} />
                  <Route path="/create-tattoo" element={<CreateTattoo />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route path="/news-feed" element={<NewsFeed />} />

                <Route path='/artists'>
                  <Route index element={<ArtistsSection />} />
                  <Route path=":artistId" element={<ArtistDetails />} />
                </Route>

                <Route path="/gallery">
                  <Route index element={<GallerySection />} />
                  <Route path="details/:tattooId" element={<DetailsSection />} />
                </Route>
                <Route path="/error" element={<Error />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </CSSTransition>
      </TransitionGroup>

      <Footer />
      <Analytics />
    </ContextProvider>
  );
}

export default App;
