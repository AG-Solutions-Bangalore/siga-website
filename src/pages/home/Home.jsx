/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

import HeroSection from "./HeroSection";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BASE_URL from "@/config/BaseUrl";

const WhyChoose = React.lazy(() => import("@/pages/home/WhyChoose"));
const ShowCaseCloth = React.lazy(() => import("@/pages/home/ShowCaseCloth"));
const HomeAbout = React.lazy(() => import("@/pages/home/HomeAbout"));
const Testimonial = React.lazy(() => import("@/pages/home/Testimonial"));
const TeamMeeting = React.lazy(() => import("@/pages/home/TeamMeeting"));
// const Event = React.lazy(() => import("@/pages/home/Event"));
const PhotoGallery = React.lazy(() => import("@/components/ui/photo-gallery"));
const ShuffleHero = React.lazy(() => import("@/components/ui/shuffle-grid"));

const updateVisitorCount = async () => {
  const response = await axios.put(`${BASE_URL}/api/update-visitors/1`, {});
  return response.data;
};

const Home = () => {
  const queryClient = useQueryClient();
  const shouldReduce = useReducedMotion();
  const heroRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateVisitorCount,
    onSuccess: () => {
      // console.log('visitor count',data)
      queryClient.invalidateQueries(["visitorCount"]);
    },
    onError: (error) => {
      console.error("Failed to update visitor count:", error);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (!heroRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = heroRef.current.getBoundingClientRect();
        const middle = rect.top + rect.height / 2 - window.innerHeight / 2;
        const mapped = Math.max(-30, Math.min(30, -middle / 15));
        setParallaxY(mapped);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const ripple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.className = "ripple-circle";
    const existing = btn.getElementsByClassName("ripple-circle");
    if (existing.length) existing[0].remove();
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 800);
  };

  return (
    <>
      <style>{`
        @keyframes gradientShift {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .animated-gradient {background: linear-gradient(90deg,#94b9ef,#94b9ef,#94b9ef); background-size:200% 200%; animation: gradientShift 6s ease infinite;}
        .ripple-circle{position:absolute;border-radius:50%;transform:scale(0);animation:ripple 0.8s linear;background:#94b9ef;pointer-events:none}
        @keyframes ripple{to{transform:scale(3);opacity:0}}
        .color-divider{height:6px;border-radius:6px;background:linear-gradient(90deg,#314899,#314899,#314899);background-size:200% 100%;animation:gradientShift 4s linear infinite}
        .cursive-invitation {
          font-family: 'Great Vibes', 'Playball', cursive;
        }
      `}</style>
      <div className="color-divider w-full " aria-hidden></div>

      {/* NEW ACTIVE HEADER */}
      <header
        ref={heroRef}
        className="relative py-25 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-[#c9f7f9] via-[#536999] to-[#394263]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Premium Text & CTAs */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#fff0f0] to-[#fff9f8] text-[#314899] text-sm font-semibold shadow-sm">
                Autumn Winter
              </span>
              
              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span>31st SIGA Fair</span>
                <span className="cursive-invitation text-amber-300 text-4xl sm:text-5xl lg:text-7xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  Invitation
                </span>
              </h1>
              
              <div className="mt-6 space-y-4 text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                <p>
                  Organized by the <strong className="font-semibold text-white">South India Garments Association (SIGA)</strong>, the 31st SIGA Fair stands as the ultimate B2B sourcing destination for apparel retailers, wholesalers, and distributors.
                </p>
                <p>
                  This season, over <strong className="font-semibold text-white">100+ leading apparel brands</strong> will showcase their exclusive Autumn Winter collections under one roof. It is a premier event designed to elevate business prospects, unveil emerging fashion trends, and enable high-value networking.
                </p>
                <p>
                  We cordially invite you to join us at Palace Grounds, Bangalore to explore the collections, connect directly with manufacturers, and build lucrative partnerships for the upcoming season.
                </p>
              </div>
              
              {/* Premium Styled Buttons */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <motion.a
                    href="https://www.sigafair.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: shouldReduce ? 1 : 1.035 }}
                    whileTap={{ scale: shouldReduce ? 1 : 0.985 }}
                    onMouseDown={ripple}
                    className="relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-full shadow-2xl font-bold transition-all focus:outline-none overflow-hidden text-center text-sm"
                  >
                    Pre Register Now
                  </motion.a>

                  <motion.a
                    href="tel:9632648525"
                    whileHover={{ scale: shouldReduce ? 1 : 1.035 }}
                    whileTap={{ scale: shouldReduce ? 1 : 0.985 }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-full font-semibold shadow-lg text-xs border border-emerald-400/20 text-center"
                  >
                    <Phone size={12} className="animate-pulse" />
                    <span>Call: 96326 48525</span>
                  </motion.a>
                </div>

                {/* Second row: Download Invitation text link */}
                <div className="mt-1">
                  <a
                    href="https://southindiagarmentsassociation.com/crmapi/public/assets/images/pdf/Siga-invite.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-amber-300 text-sm font-semibold transition-colors group underline decoration-white/20 hover:decoration-amber-300/40 underline-offset-4"
                  >
                    <svg
                      className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download Invitation</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Image Card (Portrait Invitation Card Floating directly) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div
                style={{ transform: `translateY(${parallaxY * 0.3}px)` }}
                className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 max-w-[420px] w-full transition-transform duration-500 hover:scale-[1.02] bg-white/5 backdrop-blur-sm"
              >
                <img
                  src="https://southindiagarmentsassociation.com/crmapi/public/assets/images/invite.jpg"
                  alt="31st SIGA Fair Invitation Flyer"
                  className="w-full h-auto block"
                  loading="lazy"
                />

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 text-white text-xs font-semibold tracking-wide border border-white/10 shadow-lg">
                  Palace Grounds, Bangalore • 28 - 30 Jul 2026
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-10 -mt-6">
        <div className="color-divider w-full rounded-lg" aria-hidden></div>
      </div>

      <HeroSection />

      {/* <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <PhotoGallery />
      {/* </Suspense> */}

      {/* <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <ShuffleHero />
      {/* </Suspense>
      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <WhyChoose />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      {/* <Event /> */}
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <HomeAbout />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <ShowCaseCloth />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <Testimonial />
      {/* </Suspense>

      <Suspense
        fallback={<div className="h-[400px] bg-red-500 animate-pulse"></div>}
      > */}
      <TeamMeeting />
      {/* </Suspense> */}
    </>
  );
};

export default React.memo(Home);
