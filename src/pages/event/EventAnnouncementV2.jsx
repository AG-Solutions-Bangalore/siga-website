import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/ui/register-modal";
import { animate, motion, useReducedMotion } from "framer-motion";
import { Award, Calendar, ChevronRight, Clock, DollarSign, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import { useQuery } from "@tanstack/react-query";
import BASE_URL from "@/config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import arch from "../../assets/images/arch.jpg";
import pathway from "../../assets/images/pathway.jpg";
import bags from "../../assets/images/bags.jpg";
import EventHeader from "@/components/EventHeader/EventHeader";

const ease = [0.22, 1, 0.36, 1];

export default function EventAnnouncementV2() {
  const shouldReduce = useReducedMotion();
  const [stats, setStats] = useState({
    years: 0,
    brands: 0,
    states: 0,
    visitors: 0,
  });

  const schedule = [
    {
      day: "Day 1",
      date: "28 July",
      time: "10:00 AM - 8:00 PM",
      title: "Grand Opening",
    },
    {
      day: "Day 2",
      date: "29 July",
      time: "10:00 AM - 8:00 PM",
      title: "Interactive Session",
    },
    {
      day: "Day 3",
      date: "30 July",
      time: "10:00 AM - 8:00 PM",
      title: "Closing Day",
    },
  ];

  const [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const fetchBrandLogos = async () => {
    const res = await axios.get(`${BASE_URL}/api/getFeatureBrandLogos`);
    return res?.data?.feature_brands || [];
  };

  const {
    data: brandLogos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFeatureBrandLogos"],
    queryFn: fetchBrandLogos,
  });

  useEffect(() => {
    if (shouldReduce) {
      setStats({ years: 30, brands: 500, states: 20, visitors: 13000 });
      return;
    }
    const c = [];
    c.push(
      animate(0, 30, {
        duration: 1.1,
        onUpdate: (v) => setStats((s) => ({ ...s, years: Math.round(v) })),
      }),
    );
    c.push(
      animate(0, 500, {
        duration: 1.25,
        onUpdate: (v) => setStats((s) => ({ ...s, brands: Math.round(v) })),
      }),
    );
    c.push(
      animate(0, 20, {
        duration: 1.05,
        onUpdate: (v) => setStats((s) => ({ ...s, states: Math.round(v) })),
      }),
    );
    c.push(
      animate(0, 13000, {
        duration: 1.35,
        onUpdate: (v) => setStats((s) => ({ ...s, visitors: Math.round(v) })),
      }),
    );

    return () => c.forEach((x) => x.stop && x.stop());
  }, [shouldReduce]);



  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email)
      return alert("Please provide name and email");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReg(false);
      alert("Registration request received. We'll contact you soon.");
      setForm({ name: "", email: "", phone: "" });
    }, 900);
  };
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
    <div className="relative w-full min-h-screen text-slate-900 antialiased overflow-x-hidden">
      <EventHeader />

      <div className="mx-auto max-w-7xl px-4 md:px-10 -mt-6">
        <div className="color-divider w-full rounded-lg" aria-hidden></div>
      </div>

      <main>
        <section
          id="highlights"
          className="py-12 md:py-16 bg-white flex flex-col gap-10 w-full"
        >
          <div className="mx-auto w-[90%] px-4 md:px-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Event Highlights
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Key statistics that define the scale and impact of SIGA Fair
                2026
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  {stats.years}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Industry leadership
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  {stats.brands}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Exhibiting collections
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  {stats.states}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  State participation
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  {stats.visitors.toLocaleString()}+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Retailers Connected
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-[90%] px-4 md:px-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Past Two Fairs Performance:
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Scale and impact of SIGA Fair
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  1900+{" "}
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Visiters in 2024
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  2300+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Visiters in 2025
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  5500+
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Invitation Cards
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-br from-white to-[#394263]/10 border border-gray-100 rounded-2xl shadow transition hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-extrabold text-[#314899]">
                  11000+{" "}
                </div>
                <div className="mt-1 text-xs md:text-sm text-slate-600">
                  Text Messages
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* new */}
        {/* <section className="py-10 rounded  bg-gradient-to-r from-[#394263] to-[#394263]">
          <div className="mx-auto max-w-7xl px-4 md:px-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              SHOWCASE : Men, Women & Children Wears
            </h3>
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">
              Wedding Wear, Ethnic Wear, Western Wear, Denims, Casual & Formal
              Wear, Lounge Wear, Winter Wears, Women Kur es & Women daily use
              dresses & Accessories AND ERP & Accoun ng system, security &
              inventory management, tex le tes ng technology & bags .
            </p>
          </div>
        </section> */}

        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Featuring <span className="text-[#314899]">500+</span> Past At A
                Glance
              </h2>

              <p className="text-gray-600 max-w-3xl mx-auto">
                Join India's premier brands showcasing their exclusive
                Autumn-Winter 2026 collections
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {brandLogos?.slice(0, 24).map((logo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.min(0.6, idx * 0.03),
                    duration: 0.45,
                  }}
                  className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden group hover:border-[#780900] transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={logo}
                    alt={`Brand ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              ))}
            </div>

            {/* <div className="text-center">
              <button
                onClick={() => {
                  navigate("/gallery");
                }}
                className="inline-flex  cursor-pointer items-center gap-2 px-4 py-2 bg-[#394263] text-white rounded-full text-sm font-semibold shadow"
              >
                View All Brands
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </section>

        {/* new */}
        <section className="py-10 rounded  bg-gradient-to-r from-[#394263] to-[#394263]">
          <div className="mx-auto max-w-7xl px-10 md:px-10 space-y-10">
            <h3 className="text-2xl md:text-3xl -ms-5 md:ms-25 font-bold text-white">
              Branding Options
            </h3>
            <div className="text-white/90 mt-3 w-4xl mx-auto flex ">
              <ol className="w-1/2" style={{ listStyleType: "disc" }}>
                <li>Event Sponsorship </li>
                <li>Sponsorship of Main Arch</li>
                <li>Sponsorship of Main Hall Entrance Arch</li>
                <li>Branding at Path Way</li>
                <li>Branding at Catering Area</li>
              </ol>
              <ol className="w-1/2" style={{ listStyleType: "disc" }}>
                <li>Visitor’s badges sponsorship</li>
                <li>Water bottles Sponsorship</li>
                <li>Invitation cards sponsorship (6000 cards)</li>
                <li>Carry Bags Sponsorship</li>
                <li>Advertisement in Fair book</li>
              </ol>
            </div>
            <h5 className="text-xl md:text-xl w-full flex items-center justify-center font-bold text-white">
              <ul className="flex gap-10 flex-col md:flex-row">
                <li className="space-y-2">
                  <p>ARCH</p>
                  <img
                    src={arch}
                    alt="arch"
                    className="rounded-2xl hover:scale-105 transition-all duration-300"
                  />
                </li>
                <li className="space-y-2">
                  <p>PATHWAY</p>
                  <img
                    src={pathway}
                    alt="pathway"
                    className="rounded-2xl hover:scale-105 transition-all duration-300"
                  />
                </li>
                <li className="space-y-2">
                  <p>BAGS</p>
                  <img
                    src={bags}
                    alt="bags"
                    className="rounded-2xl hover:scale-105 transition-all duration-300"
                  />
                </li>
              </ul>
            </h5>
          </div>
        </section>

        {/* ---------- INSERTED: Pricing Section 2 ---------- */}
        <section id="packages" className="py-20 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Stall Packages
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the perfect space for your business
              </p>
            </motion.div>

            <div className="w-full">
              {/* Mobile View: Cards */}
              <div className="grid grid-cols-1 gap-6 md:hidden">
                {[
                  {
                    type: "Business Stall",
                    size: "12 Sqr Mtr 129 sq ft",
                    size2: "(4 X 3)",
                    price: "₹ 70,800",
                    include1: "1 Table, 2 chair, 3 spot light, 1 halogen lamp,",
                    include2: "1 power point, 2 Complimentary Lunch",
                    popular: true,
                  },
                  {
                    type: "Brand Wagon",
                    size: "24 Sqr Mtr 258 sq ft",
                    size2: "(6 X 4)",
                    price: "₹ 1,41,600",
                    include1: "2 Table, 4 chair, 4 spot light, 2 halogen lamp,",
                    include2: "2 power point, 4 Complimentary Lunch",
                    popular: false,
                  },
                  {
                    type: "Premium Wagon",
                    size: "30 Sqr Mtr 322 sq ft",
                    size2: "(6 X 5)",
                    price: "₹ 1,77,000",
                    include1:
                      "3 Table, 6 chair, 6 spot light, 3 halogen lamps,",
                    include2: "2 power point, 5 Complimentary Lunch",
                    popular: true,
                  },
                  {
                    type: "Executive Wagon",
                    size: "40 Sqr Mtr 428 sq ft",
                    size2: "(8 X 5)",
                    price: "₹ 2,36,000",
                    include1:
                      "4 Table, 8 chair, 8 spot light, 4 halogen lamps,",
                    include2: "2 power point, 6 Complimentary Lunch",
                    popular: false,
                  },
                  {
                    type: "Executive Wagon plus",
                    size: "48 Sqr Mtr 516 sq ft",
                    size2: "(8 X 6)",
                    price: "₹ 2,83,200",
                    include1:
                      "6 Table, 8 chair, 8 spot light, 4 halogen lamps,",
                    include2: "2 power point, 8 Complimentary Lunch",
                    popular: true,
                  },
                ].map((row, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      row.popular
                        ? "bg-[#394263]/5 border-[#394263]/20 shadow-lg"
                        : "bg-white border-gray-100 shadow-md"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {row.size}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {row.size2}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-2xl font-black text-[#314899]">
                        {row.price}
                      </div>
                      <div className="text-xs text-gray-500">+ GST 18%</div>
                    </div>

                    <div className="space-y-2 mb-8 text-sm text-gray-700">
                      <div className="flex gap-2">
                        <ChevronRight className="size-4 shrink-0 text-[#314899] mt-0.5" />
                        <span>{row.include1}</span>
                      </div>
                      <div className="flex gap-2">
                        <ChevronRight className="size-4 shrink-0 text-[#314899] mt-0.5" />
                        <span>{row.include2}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#394263] hover:bg-[#314899] text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95"
                      onClick={() => navigate("/participants-form")}
                    >
                      BOOK NOW
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="flex flex-col gap-10 justify-center items-center">
                  <table className="w-full lg:w-[90%] border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                          SIZE
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                          PRICE
                        </th>
                        <th className="py-4 px-6 text-left text-sm font-bold text-gray-900">
                          INCLUDES
                        </th>
                        <th className="py-4 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          type: "Business Stall",
                          size: "12 Sqr Mtr 129 sq ft",
                          size2: "(4 X 3)",
                          price: "₹ 70,800",
                          include1:
                            "1 Table, 2 chair, 3 spot light, 1 halogen lamp,",
                          include2: "1 power point, 2 Complimentary Lunch",
                          popular: true,
                        },
                        {
                          type: "Brand Wagon",
                          size: "24 Sqr Mtr 258 sq ft",
                          size2: "(6 X 4)",
                          price: "₹ 1,41,600",
                          include1:
                            "2 Table, 4 chair, 4 spot light, 2 halogen lamp,",
                          include2: "2 power point, 4 Complimentary Lunch",
                          popular: false,
                        },
                        {
                          type: "Premium Wagon",
                          size: "30 Sqr Mtr 322 sq ft",
                          size2: "(6 X 5)",
                          price: "₹ 1,77,000",
                          include1:
                            "3 Table, 6 chair, 6 spot light, 3 halogen lamps,",
                          include2: "2 power point, 5 Complimentary Lunch",
                          popular: true,
                        },
                        {
                          type: "Executive Wagon",
                          size: "40 Sqr Mtr 428 sq ft",
                          size2: "(8 X 5)",
                          price: "₹ 2,36,000",
                          include1:
                            "4 Table, 8 chair, 8 spot light, 4 halogen lamps,",
                          include2: "2 power point, 6 Complimentary Lunch",
                          popular: false,
                        },
                        {
                          type: "Executive Wagon plus",
                          size: "48 Sqr Mtr 516 sq ft",
                          size2: "(8 X 6)",
                          price: "₹ 2,83,200",
                          include1:
                            "6 Table, 8 chair, 8 spot light, 4 halogen lamps,",
                          include2: "2 power point, 8 Complimentary Lunch",
                          popular: true,
                        },
                      ].map((row, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                            row.popular ? "bg-[#394263]/5" : ""
                          }`}
                        >
                          <td className="py-6 px-6">
                            <div className="font-bold text-gray-900">
                              {row.size}
                            </div>
                            <div className="text-sm text-gray-500">
                              {row.size2}
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <div className="font-black text-[#314899] text-lg">
                              {row.price}
                            </div>
                            <div className="text-xs text-gray-500">
                              + GST 18%
                            </div>
                          </td>
                          <td className="py-6 px-6 text-gray-700 text-sm">
                            {row.include1}
                            <br />
                            {row.include2}
                          </td>
                          <td className="py-6 px-6">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-[#394263] hover:bg-[#314899] text-white text-sm font-bold flex items-center gap-2 rounded-lg shadow-md transition-all"
                              onClick={() => navigate("/participants-form")}
                            >
                              <ChevronRight size={14} />
                              BOOK NOW
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full mt-8 md:mt-12">
                <div className="w-full md:w-[85%] mx-auto p-4 bg-[#394263]/5 rounded-xl border border-[#394263]/10">
                  <div className="flex gap-3">
                    <div className="font-black text-[#314899] shrink-0">
                      Note :
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      Extra Lights, Halogen, stands, Hangars, Mannequins,
                      Display Recks & other display supports, Helper Staff &
                      Hostess available at venue subject to prior booking.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  END INSERTED: Pricing Section 2 */}

        <footer className="py-10 rounded  bg-gradient-to-r from-[#394263] to-[#394263]">
          <div className="mx-auto max-w-7xl px-4 md:px-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Ready to Exhibit at SIGA Fair 2026?
            </h3>
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">
              Limited stalls available. Secure your spot today and connect with
              10,000+ buyers from across India.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  navigate("/participants-form");
                }}
                className="px-6 py-3 bg-white text-[#394263] rounded-full font-semibold shadow"
                onMouseDown={ripple}
              >
                BOOK YOUR STALL NOW
              </button>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("highlights");
                }}
                href="#highlights"
                className="px-4 py-2 rounded-full border border-white/30 text-white/90"
              >
                Learn more
              </a>
            </div>
          </div>
        </footer>
        <section className="relative md:h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#394263]/10  to-[#394263]/10"></div>

          <div className="container max-w-7xl mx-auto py-20 md:py-0 px-4 md:px-8 ">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4 ">
                <Calendar className="text-[#394263]" size={28} />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Event Schedule
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three days of intensive business networking and exhibitions
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stalls Preparation on 27 July
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {schedule.map((day, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-8 z-10 bg-white shadow-[0_10px_5px_#394263] rounded-sm border-2 border-gray-100 hover:border-[#394263] transition-colors`}
                >
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
                      <Clock size={14} />
                      {day.day}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {day.date}
                    </div>
                    <div className="text-lg text-[#394263] font-medium">
                      {day.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {day.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#394263]/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#394263]/50 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </section>
      </main>

      <div className="fixed left-4 bottom-6 z-50 md:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenReg(true)}
          className="px-4 py-3 rounded-full bg-[#394263] text-white shadow-lg"
          onMouseDown={ripple}
        >
          Register
        </motion.button>
      </div>

      <BrandLogo />

      <RegistrationModal
        open={openReg}
        onClose={() => setOpenReg(false)}
        form={form}
        setForm={setForm}
        onSubmit={submitForm}
        loading={loading}
      />
    </div>
  );
}
