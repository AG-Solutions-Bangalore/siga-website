import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Newsletter from "./components/newsletter/Newsletter.jsx";
import VerticalDottedText from "./components/verticalText/VerticalDottedText.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";
import Directory from "./pages/service/Directory.jsx";
import Efforts from "./pages/efforts/Efforts.jsx";
import MemberShip from "./pages/membership/MemberShip.jsx";
import ManagingCommitte from "./pages/committe/ManagingCommitte.jsx";
import JobOpeningList from "./pages/jobs/JobOpeningList.jsx";
import JobRequireList from "./pages/jobs/JobRequireList.jsx";
import { Toaster } from "sonner";
import SuspenseLoader from "./components/loader/SuspenseLoader.jsx";
import GalleryAllByYear from "./pages/gallery/GalleryAllByYear.jsx";
import EventAnnouncement from "./pages/event/EventAnnouncement.jsx";
import EventAnnounce from "./pages/event/EventAnnounce.jsx";
import CreateParticipation from "./pages/participants/create-participant.jsx";
import EventAnnouncementV2 from "./pages/event/EventAnnouncementV2.jsx";

const Home = lazy(() => import("./pages/home/Home"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const EventSection = lazy(() => import("./pages/event/EventSection"));

const Service = lazy(() => import("./pages/service/Service"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster richColors position="top-right" />

        <VerticalDottedText />
        <ScrollToTop />
        {/* <Newsletter /> */}

        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <AboutUs />
                </Suspense>
              }
            />
            <Route
              path="/event1"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <EventSection />
                </Suspense>
              }
            />
            <Route
              path="/event"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <EventAnnouncementV2 />
                </Suspense>
              }
            />
            <Route
              path="/participants-form"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <CreateParticipation />
                </Suspense>
              }
            />
            <Route
              path="/service"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Service />
                </Suspense>
              }
            />
            <Route
              path="/gallery"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Gallery />
                </Suspense>
              }
            />
            <Route
              path="/directory"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Directory />
                </Suspense>
              }
            />
            <Route
              path="/efforts"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <Efforts />
                </Suspense>
              }
            />
            <Route
              path="/become-member"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <MemberShip />
                </Suspense>
              }
            />
            <Route
              path="/committee"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <ManagingCommitte />
                </Suspense>
              }
            />
            <Route
              path="/jobopening"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <JobOpeningList />
                </Suspense>
              }
            />
            <Route
              path="/jobrequire"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <JobRequireList />
                </Suspense>
              }
            />
            <Route
              path="/galleryAll/:id"
              element={
                <Suspense fallback={<SuspenseLoader />}>
                  <GalleryAllByYear />
                </Suspense>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
