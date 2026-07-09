import BecomeMember from "@/components/becomeMember/BecomeMember";
import { Highlight } from "@/components/ui/hero-highlight";
import { TextEffect } from "@/components/ui/text-effect";
import BASE_URL from "@/config/BaseUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fetchHeroImages = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/getHeroSection`);
  return data;
};

export default function HeroSection() {
  const {
    data: heroData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroImages"],
    queryFn: fetchHeroImages,
    staleTime: 60 * 1000 * 5,
  });

  const images = heroData?.hero_section || [];
  const duplicatedImages = [...images, ...images];
  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 60s linear infinite;
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        @keyframes moveBackground {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
          100% { transform: translate(-5px, 5px); }
        }

        /* Responsive breakpoints */
        @media (max-width: 480px) {
          .infinite-scroll {
            animation: scroll-right 45s linear infinite;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .infinite-scroll {
            animation: scroll-right 55s linear infinite;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .infinite-scroll {
            animation: scroll-right 65s linear infinite;
          }
        }

        @media (min-width: 1025px) {
          .infinite-scroll {
            animation: scroll-right 75s linear infinite;
          }
        }
      `}</style>

      <main className="overflow-hidden">
        <section className="relative">
          <div className="relative pt-24 sm:pt-24 md:pt-28 lg:pt-32">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            {/* <BackgroundBeamsWithCollision> */}
            {/* <FireworksBackground
              population={1}
              color={["#ff0000", "#00ff00", "#0000ff", "#ffff00"]}
              fireworkSpeed={{ min: 1, max: 5 }}
              fireworkSize={{ min: 0.8, max: 2 }}
              particleSpeed={{ min: 0.5, max: 2 }}
              particleSize={{ min: 0.3, max: 1 }}
            > */}
            <div className="mx-auto max-w-[85rem] px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row  gap-6 lg:gap-8">
                {/* Left Content */}
                <div className="w-full  lg:w-[40%] xl:w-[35%]">
                  <div className="text-center lg:text-left">
                    {/* Welcome Badge */}
                    <div className="mx-auto lg:mx-0 flex w-fit items-center gap-2 sm:gap-4 rounded-full border p-1 pl-3 sm:pl-4 shadow-md shadow-black/5 transition-all duration-300 bg-gray-50 hover:bg-white">
                      <span className="text-gray-800 text-xs sm:text-sm ">
                        Welcome to the Siga, Bengaluru
                      </span>
                      <span className="block h-3 sm:h-4 w-0.5 border-l bg-gray-300"></span>
                      <div className="bg-white hover:bg-gray-50 size-5 sm:size-6 overflow-hidden rounded-full duration-500 group">
                        <div className="flex w-10 sm:w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                          <span className="flex size-5 sm:size-6">
                            <ArrowRight className="m-auto size-2 sm:size-3" />
                          </span>
                          <span className="flex size-5 sm:size-6">
                            <ArrowRight className="m-auto size-2 sm:size-3" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Main Title */}
                    <div className="mt-6 sm:mt-8 lg:mt-16 max-w-5xl mx-auto lg:mx-0">
                      <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
                        {/* Celebrating */}
                        <TextEffect
                          className=" text-6xl md:text-7xl  xl:text-[5.25rem] text-balance "
                          preset="slide"
                          per="word"
                          delay={0.4}
                        >
                          Celebrating
                        </TextEffect>

                        {/* 30 Years */}
                        <div className="flex items-center justify-center lg:justify-start mt-2">
                          <TextEffect
                            className="text-6xl md:text-8xl font-semibold leading-none bg-gradient-to-b from-red-400 to-indigo-500 bg-clip-text text-transparent"
                            preset="slide"
                            per="char"
                            delay={0.6}
                          >
                            30
                          </TextEffect>

                          <TextEffect
                            className="text-6xl md:text-7xl  xl:text-[5.25rem] ml-2"
                            preset="slide"
                            per="word"
                            delay={0.7}
                          >
                            Years
                          </TextEffect>
                        </div>

                        {/* of SIGA */}
                        <span
                          className="text-6xl md:text-7xl  xl:text-[5.25rem] mt-2 "
                          preset="slide"
                          per="word"
                          delay={0.8}
                        >
                          of <Highlight>SIGA</Highlight>
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mt-4 sm:mt-6">
                        <TextEffect
                          className="mx-auto lg:mx-0 max-w-xl line-clamp-5 text-balance text-sm sm:text-base md:text-lg text-gray-600 px-2 sm:px-0"
                          preset="fade"
                          per="line"
                          delay={0.8}
                        >
                          South India Garment Association (SIGA) was formed more
                          than 3 decade ago to create a platform for
                          manufacturers, distributors, agents and retail traders
                          in the garment industry.
                        </TextEffect>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Images */}
                <div className="w-full lg:w-[60%] xl:w-[65%] relative mt-8 sm:mt-12 lg:mt-0 p-1 sm:p-2">
                  {/* Background Effects */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-indigo-50/20"></div>
                    <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-indigo-300/25 blur-[50px] sm:blur-[100px]"></div>
                    <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full bg-white/25 blur-[50px] sm:blur-[100px]"></div>
                    <div
                      className="absolute inset-0 opacity-5 sm:opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
                        backgroundSize: "25px 25px",
                      }}
                    ></div>
                    {/* <div
                        className="absolute inset-0 opacity-10 sm:opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 70% 30%, #7c3aed 1px, transparent 1.5px), radial-gradient(circle at 30% 70%, #db2777 1px, transparent 1.5px)",
                          backgroundSize: "30px 30px",
                          animation: "moveBackground 20s infinite alternate",
                        }}
                      ></div> */}
                  </div>

                  {/* Scrolling Images Container */}
                  <div className="w-full relative overflow-hidden flex items-center justify-center">
                    <div className="relative z-10 w-full  flex items-center justify-center py-8">
                      {/* <div className="scroll-container w-full max-w-6xl">
                          <div className="infinite-scroll flex gap-6 w-max">
                            {duplicatedImages.map((image, index) => (
                              <div
                                key={index}
                                className="image-item flex-shrink-0 w-auto h-48  md:h-64  lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                              >
                                <img
                                  src={image}
                                  alt={`Gallery image ${
                                    (index % images.length) + 1
                                  }`}
                                  className="w-auto h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div> */}
                      {isLoading ? (
                        <div className="flex gap-6 w-max">
                          {[...Array(14)].map((_, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 w-auto h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse"
                            ></div>
                          ))}
                        </div>
                      ) : isError ? (
                        <div className="text-center text-gray-500">
                          Failed to load images
                        </div>
                      ) : (
                        <div className="scroll-container w-full max-w-6xl">
                          <div className="infinite-scroll flex gap-6 w-max">
                            {duplicatedImages.map((image, index) => (
                              <div
                                key={index}
                                className="image-item flex-shrink-0 w-auto h-48  md:h-64  lg:h-80 rounded-xl overflow-hidden shadow-2xl"
                              >
                                <img
                                  src={image}
                                  alt={`Gallery image ${
                                    (index % images.length) + 1
                                  }`}
                                  className="w-auto h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex  flex-col md:flex-row items-center gap-2 mt-4 sm:mt-4 lg:mt-6">
                    {/* payment mediation  */}

                    <div
                      className="relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 backdrop-blur-lg text-center text-white overflow-hidden h-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(223, 197, 249) 0%, rgb(55, 111, 219) 100%)",
                        boxShadow:
                          "0 4px 16px rgba(34, 197, 94, 0.2), 0px 4px 16px rgba(22, 163, 74, 0.1) 0px 8px 32px",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-500/15"></div>
                        <div className="absolute top-1/4 left-1/4 w-8 sm:w-16 h-8 sm:h-16 rounded-full bg-green-400/10 blur-lg sm:blur-xl"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-12 sm:w-24 h-12 sm:h-24 rounded-full bg-green-500/15 blur-lg sm:blur-xl"></div>
                      </div>

                      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left justify-between">
                        <img
                          src="/rs.gif"
                          alt="green curl"
                          className="absolute top-1/2 -right-2 w-10 sm:w-14 lg:w-16 opacity-80 pointer-events-none"
                        />

                        <div className="flex flex-col items-center sm:items-start relative z-10">
                          <h3 className="text-lg  lg:text-xl font-semibold text-green-900 drop-shadow-md">
                            Payment Mediation
                          </h3>

                          <p className="text-green-950 text-sm sm:text-sm mt-2 sm:mt-3 font-light max-w-full ">
                            SIGA assist members to resolve the conflict/disputes
                            with their buyers/purchaser for recovery of pending
                            payments.
                          </p>
                        </div>

                        <div className="mt-1 sm:mt-0 relative z-10">
                          <Link to={"/service?tab=payment_mediation"}>
                            <Button
                              size="lg"
                              className="rounded-xl hover:scale-105 text-green-800 px-5 text-base relative overflow-hidden hover:cursor-pointer group"
                            >
                              <span className="relative z-10">Click Here</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/80 to-white opacity-100 transition-opacity duration-300 -skew-x-12" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Membership CTA */}
                    <div
                      className="relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 backdrop-blur-lg text-center text-white overflow-hidden h-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 193, 7, 1) 0%, rgba(245, 158, 11, 1) 100%)",
                        boxShadow:
                          "0 4px 16px rgba(251, 191, 36, 0.2), 0 8px 32px rgba(251, 191, 36, 0.1)",
                      }}
                    >
                      {/* Background Effects */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/15"></div>
                        <div className="absolute top-1/4 left-1/4 w-8 sm:w-16 h-8 sm:h-16 rounded-full bg-yellow-400/10 blur-lg sm:blur-xl"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-12 sm:w-24 h-12 sm:h-24 rounded-full bg-amber-500/15 blur-lg sm:blur-xl"></div>
                      </div>

                      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left justify-between">
                        {/* Decorative GIFs */}
                        <img
                          src="https://a-us.storyblok.com/f/1020544/500x500/fc53950a6e/blue-curl.gif"
                          alt="blue curl"
                          className="absolute -top-4 -left-4 w-10 sm:w-14 lg:w-16 opacity-80 pointer-events-none"
                        />
                        <img
                          src="https://a-us.storyblok.com/f/1019472/500x500/9353110b3c/yellow-star.gif"
                          alt="yellow star"
                          className="absolute -bottom-6 right-6 w-12 sm:w-16 lg:w-20 opacity-90 pointer-events-none"
                        />
                        <img
                          src="https://a-us.storyblok.com/f/1020544/500x500/39ac930bc7/green-curl.gif"
                          alt="green curl"
                          className="absolute top-1/2 -right-6 w-10 sm:w-14 lg:w-16 opacity-80 pointer-events-none"
                        />

                        {/* Text Content */}
                        <div className="flex flex-col items-center sm:items-start relative z-10">
                          <h3 className="text-lg  lg:text-xl font-semibold text-yellow-900 drop-shadow-md">
                            Join SIGA Membership
                          </h3>

                          <p className="text-yellow-950 text-sm sm:text-sm mt-2 sm:mt-3 font-light max-w-full ">
                            Company or person working as a manufacturer,
                            distributor, retailer or agent in the apparel sector
                            is eligible to join.
                          </p>
                        </div>

                        {/* Button */}
                        <div className="mt-1 sm:mt-0 relative z-10">
                          <BecomeMember />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </BackgroundBeamsWithCollision> */}
            {/* </FireworksBackground> */}
          </div>
        </section>
      </main>
    </>
  );
}
