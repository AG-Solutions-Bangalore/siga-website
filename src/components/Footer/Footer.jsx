/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BASE_URL from "@/config/BaseUrl";

const fetchVisitorcount = async () => {
  const response = await axios.get(`${BASE_URL}/api/getVisitorCount`);
  return response.data;
};

const data = {
  facebookLink: "https://www.facebook.com/siga.bangalore/",
  instaLink: "https://www.instagram.com/siga_bangalore/?hl=en",
  twitterLink: "#",
  githubLink: "#",
  dribbbleLink: "#",
  services: {
    jobOppurnites: "/service?tab=job_opportunities",
    payment: "/service?tab=payment_mediation",
    news: "/service?tab=latest_news",
    business: "/service?tab=business_expansion",
  },
  about: {
    history: "/event",
    team: "/about",
    handbook: "/efforts",
    careers: "/service",
  },
  help: {
    event: "/event",
    join: "/become-member",
    directory: "/directory",
    gallery: "/gallery",
  },
  contact: {
    email: "sigabengluru@gmail.com",
    phone: "+91 9632648525",
    address: "No. 308, 1st Floor, Auto Tower #9, J.C. Road, Bangalore-560002.",
  },
  company: {
    name: "SIGA-FAIR",
    description:
      "SIGA has been acting as a catalyst, interacting with the government in matters of development of the garment trade and industry and various policies.",
    logo: "/siga-fav.png",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
];

const aboutLinks = [
  { text: "Siga Event", href: data.about.history },
  { text: "Meet the Team", href: data.about.team },
  { text: "Efforts", href: data.about.handbook },
  { text: "Services", href: data.about.careers },
];

const serviceLinks = [
  { text: "Job Oppurtunities", href: data.services.jobOppurnites },
  { text: "Payment Mediation", href: data.services.payment },
  { text: "Latest News", href: data.services.news },
  { text: "Buisness Expansion", href: data.services.business },
];

const helpfulLinks = [
  { text: "Events", href: data.help.event },
  { text: "Join Us", href: data.help.join },
  { text: "Gallery", href: data.help.gallery },
  { text: "Directory", href: data.help.directory },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  const {
    data: visitorData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["visitorCount"],
    queryFn: fetchVisitorcount,
  });

  const vistorCounts = React.useMemo(() => {
    if (!visitorData || !visitorData.data) return [];

    return visitorData.data.map((visitor) => ({
      TotalVisitor: visitor?.visitor_tbl_count,
    }));
  }, [visitorData]);

  if (isLoading) {
    return (
      <div className="relative w-full bg-gradient-to-br from-red-50 via-transparent to-indigo-300/25 py-8">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-8 text-center gap-4">
            <div className="relative z-30">
              <Skeleton height={40} width={400} className="mx-auto" />
              <Skeleton height={20} width={200} className="mx-auto mt-2" />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-64 h-80">
                <Skeleton height={320} width={256} />
                <Skeleton height={20} width={150} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full bg-gradient-to-br from-red-50 via-transparent to-indigo-300/25 py-8">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <div className="text-red-500">
            Error loading brands. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className=" mt-16  w-full place-self-end rounded-t-xl">
      <div className="mx-auto max-w-[85rem] px-4 pt-5 pb-6 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-primary flex justify-center gap-2 sm:justify-start">
              <img
                alt="Company Logo"
                effect="blur"
                src="/siga-logo.png"
                className={" h-14 w-auto"}
              />
            </div>
            <p className="text-foreground/50 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-primary hover:text-primary/80 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-0 md:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left ">
              <p className="text-lg text-red-600 font-medium">About Us</p>
              <ul className="mt-1 md:mt-8 space-y-2 md:space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link to={href}>
                      <button className="text-secondary-foreground/70 transition hover:cursor-pointer hover:text-red-500">
                        {text}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left ">
              <p className="text-lg text-red-600 font-medium">Our Services</p>
              <ul className="mt-1 md:mt-8 space-y-2 md:space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link to={href}>
                      <button className="text-secondary-foreground/70 transition hover:cursor-pointer hover:text-red-500">
                        {text}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left ">
              <p className="text-lg text-red-600 font-medium">Helpful Links</p>
              <ul className="mt-1 md:mt-8 space-y-2 md:space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <Link to={href}>
                      <button
                        className={`${
                          hasIndicator
                            ? "group flex justify-center gap-1.5 sm:justify-start hover:cursor-pointer hover:text-red-500 "
                            : "text-secondary-foreground/70 transition hover:cursor-pointer hover:text-red-500 "
                        }`}
                      >
                        <span className="text-secondary-foreground/70 transition">
                          {text}
                        </span>
                        {hasIndicator && (
                          <span className="relative flex size-2">
                            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                            <span className="bg-primary relative inline-flex size-2 rounded-full" />
                          </span>
                        )}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left ">
              <p className="text-lg text-red-600 font-medium">Contact Us</p>
              <ul className="mt-1 md:mt-8 space-y-2 md:space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${data.contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:justify-start"
                  >
                    <Mail className="text-primary size-5 hidden md:block shrink-0" />
                    <span className="text-secondary-foreground/70 w-28 break-words">
                      {data.contact.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="flex items-center justify-center gap-1.5 sm:justify-start"
                  >
                    <Phone className="text-primary size-5 hidden md:block shrink-0" />
                    <span className="text-secondary-foreground/70">
                      {data.contact.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center justify-center gap-1.5 sm:justify-start">
                    <MapPin className="text-primary size-5 hidden md:block shrink-0" />
                    <address className="text-secondary-foreground/70 not-italic">
                      {data.contact.address}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-2 md:mt-12 border-t pt-1 md:pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-secondary-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              &copy; 2025 Made by{" "}
              <a
                href="https://ag-solutions.in/"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-red-600 hover:text-red-800"
              >
                AG-Solutions
              </a>
            </p>
            <p className="text-sm">
              <span className="block sm:inline">
                Visitor Count : {vistorCounts?.[0]?.TotalVisitor}
              </span>
            </p>
            <p className="text-sm">
              <span className="block sm:inline">All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
