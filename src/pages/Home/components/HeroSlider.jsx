import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";

const slides = [
  {
    image: "https://www.experian.com/blogs/ask-experian/wp-content/uploads/Piggy-Bank-Next-To-Calculator-And-Coins-With-Person-In-Background.jpg",
    title: "Build a Strong Emergency Fund",
    desc: "Aim for 3–6 months of essential expenses in a high-yield savings account. It protects you from unexpected events and reduces financial stress.",
  },
  {
    image: "https://www.fidelity.com/bin-public/600_Fidelity_Com_English/images/learning-center/charts-and-graphics/retirement%20guidelines-10x%20journey.png",
    title: "Maximize Your Retirement Savings",
    desc: "Contribute enough to get your full employer match and increase contributions annually. Start early to harness the power of compound growth.",
  },
  {
    image: "https://www.incharge.org/wp-content/uploads/2017/03/High-Interest-Credit-Card.jpg",
    title: "Pay Off High-Interest Debt First",
    desc: "Tackle credit cards and loans aggressively. Reducing high-interest debt frees up money for saving and investing faster.",
  },
  {
    image: "https://files.consumerfinance.gov/f/images/cfpb_SSSU_transfer_automatic_check.original.png",
    title: "Automate Your Savings",
    desc: "Set up automatic transfers to savings and investment accounts right after payday. Pay yourself first and watch your wealth grow effortlessly.",
  },
  {
    image: "https://res.cloudinary.com/do3iu9q7d/image/upload/v1767425205/1722340744668_x44ufh.jpg",
    title: "Follow the 50/30/20 Rule",
    desc: "Allocate 50% to needs, 30% to wants, and 20% to savings/debt. This simple framework keeps your finances balanced and sustainable.",
  },
  {
    image: "https://www.citizensbank.com/assets/CB_media/images/infographics/What-is-Diversification_Micrographic_v5.jpg",
    title: "Review and Rebalance Investments",
    desc: "Check your portfolio annually and adjust to stay aligned with your goals and risk tolerance. Diversification is key to long-term success.",
  },
  {
    image: "https://topflightapps.com/wp-content/uploads/2020/10/mint-personal-finance-budgeting-app.jpg",
    title: "Track Spending Weekly",
    desc: "Regular monitoring helps spot leaks early and keeps you accountable. Small adjustments add up to big savings over time.",
  },
  {
    image: "https://www.self.inc/info/img/post/cost-of-unused-paid-subscriptions/cost-of-unused-paid-subscriptions-header.jpg",
    title: "Cut Unused Subscriptions",
    desc: "Audit recurring charges monthly. Eliminating just a few unused services can save hundreds of dollars each year.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  // Auto-play using actual slides.length
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation on slide change
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        descRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        btnRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.6"
      );
  }, [currentSlide]);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Animated Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl text-white">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl opacity-0"
          >
            {slides[currentSlide].title}
          </h1>
          <p
            ref={descRef}
            className="text-lg md:text-xl lg:text-2xl text-teal-100 mb-10 leading-relaxed drop-shadow-lg opacity-0"
          >
            {slides[currentSlide].desc}
          </p>

          <div ref={btnRef} className="flex flex-wrap gap-4 opacity-0">
            <Link
              to="/login"
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-teal-400 w-10" : "bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;