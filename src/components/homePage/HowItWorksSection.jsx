import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { FaTruckFast } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import bgimg from "../../assets/images/bgimg2.png";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import BsStarsIcon from "../../assets/icons/BsStarsIcon.svg";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineLightningBolt } from "react-icons/hi";
import burgerImg from "../../assets/images/burger.png";
import hotdogImg from "../../assets/images/hotdog.png";
import friesImg from "../../assets/images/fries.png";
import { FaRegCheckCircle } from "react-icons/fa";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: <MdOutlineShoppingCart />,
      title: "Create a cart",
      description: "Build your order on Uber Eats, DoorDash, or Grubhub",
      badge: {
        text: "Easy - Just like normal",
        icon: <FaArrowTrendUp className="text-black text-md mr-2" />,
        color: "green",
      },
      color: "purple",
    },
    {
      number: 2,
      icon: <FiShare2 />,
      title: "Share with us",
      description: "Copy & paste your cart or group order link",
      badge: {
        text: "Quick - 10 seconds",
        icon: <MdOutlineAccessTime className="text-black text-md mr-2" />,
        color: "blue",
      },
      color: "blue",
    },
    {
      number: 3,
      icon: <BsLightningCharge />,
      title: "We place direct",
      description: "Skip platform fees & markups",
      badge: {
        text: "Magic happens here!",
        icon: <FaRegCircleCheck className="text-black text-md mr-2" />,
        color: "yellow",
      },
      color: "yellow",
      highlighted: true,
    },
    {
      number: 4,
      icon: <FaRegCheckCircle />,
      title: "Track & enjoy",
      description: "Same great food, delivered with huge savings",
      badge: {
        text: "Delivered fresh",
        icon: (
          <img
            src={BsStarsIcon}
            alt="star"
            className="text-black text-md mr-2 w-4 h-4"
          />
        ),
        color: "green",
      },
      color: "green",
    },
  ];

  return (
    <section
      className="py-20 mt-[-170px] md:mt-[-120px] xl:mt-[-160px] relative overflow-hidden"
      style={{
        background: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Floating Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Burger - Left side */}
        <div
          className="absolute left-16 top-2/4 w-48 h-48 opacity-100"
          style={{
            animation: "float 6s ease-in-out infinite",
            animationDelay: "0s",
          }}
        >
          <img
            src={burgerImg}
            alt="Burger"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hotdog - Above middle cards */}
        <div
          className="absolute left-2/3 top-1/4 transform -translate-x-1/2 w-48 h-48 opacity-100"
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "4s",
          }}
        >
          <img
            src={hotdogImg}
            alt="Hotdog"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Fries - Right side */}
        <div
          className="absolute right-16 top-2/4 w-48 h-48 opacity-100"
          style={{
            animation: "float 7s ease-in-out infinite",
            animationDelay: "4s",
          }}
        >
          <img
            src={friesImg}
            alt="Fries"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 top-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* SAVE 70% ON EVERY ORDER Label */}
          <div
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full relative"
            style={{
              background:
                "linear-gradient(90deg, rgba(153, 69, 255, 0.1) 0%, rgba(20, 241, 149, 0.1) 100%)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(153, 69, 255, 0.3) 0%, rgba(20, 241, 149, 0.3) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            ></div>
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent text-sm font-inter font-medium">
              SAVE 70% ON EVERY ORDER
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-inter !font-bold text-white mb-4">
            Here's How Forkward Works
          </h2>
          <p className="text-xl text-white/80 font-inter max-w-2xl mx-auto">
            Simple steps to start saving on every order
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 justify-center relative">
          {/* Connecting Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300/30 transform -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Glass Effect Background */}
              <div
                className="rounded-3xl p-6 border border-[#FFFFFF3B] max-w-sm w-full"
                style={{
                  background: "#FFFFFF33",
                  backdropFilter: "blur(1px)",
                  boxShadow: "0px 8px 32px rgba(59, 130, 246, 0.2)",
                }}
              >
                <div
                  className="relative bg-white backdrop-blur-md rounded-2xl p-4 h-[250px] border transition-all duration-300 hover:scale-105 z-10 shadow-lg w-full group flex flex-col justify-center items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)",
                    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 50%, #FEF3C7 100%)";
                    e.currentTarget.style.boxShadow =
                      "0px 8px 32px rgba(255, 193, 7, 0.3)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 193, 7, 0.5)";
                    // Change step number background on card hover
                    const stepNumber =
                      e.currentTarget.querySelector(".step-number");
                    if (stepNumber) {
                      stepNumber.style.background =
                        "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)";
                    e.currentTarget.style.boxShadow =
                      "0px 8px 32px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.2)";
                    // Reset step number background on card leave
                    const stepNumber =
                      e.currentTarget.querySelector(".step-number");
                    if (stepNumber) {
                      stepNumber.style.background =
                        "linear-gradient(90deg, rgba(153, 69, 255, 1) 0%, rgba(20, 241, 149, 1) 100%)";
                    }
                  }}
                >
                  {/* Gradient Border */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(153, 69, 255, 0.3) 0%, rgba(20, 241, 149, 0.3) 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      padding: "1px",
                    }}
                  ></div>

                  {/* Step Number */}
                  <div
                    className="step-number absolute -top-5 left-1/2 border-2 border-white transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(153, 69, 255, 1) 0%, rgba(20, 241, 149, 1) 100%)",
                    }}
                  >
                    <span className="text-white font-inter font-bold text-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 bg-gradient-to-r from-[rgba(153,69,255,0.2)] to-[rgba(20,241,149,0.2)] group-hover:bg-gradient-to-br group-hover:from-[#FEF08A] group-hover:to-[#FDE68A]">
                    <span className="text-2xl text-black group-hover:text-black transition-colors duration-300">
                      {step.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="!text-xl !font-inter !font-bold text-black mb-2 text-center !leading-tight group-hover:text-[#713F12] transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#4B5563] font-inter text-sm text-center mb-4 leading-relaxed group-hover:text-[#713F12] transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Badge */}
                  <div className="flex justify-center">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-inter font-medium transition-all duration-300 ${
                        step.badge.color === "green"
                          ? "group-hover:bg-green-400/20 group-hover:text-green-600"
                          : step.badge.color === "blue"
                          ? "group-hover:bg-blue-400/20 group-hover:text-blue-600"
                          : step.badge.color === "yellow"
                          ? "group-hover:bg-yellow-400/20 group-hover:text-yellow-600"
                          : "group-hover:bg-green-400/20 group-hover:text-green-600"
                      }`}
                      style={{
                        background:
                          step.badge.color === "green"
                            ? "rgba(34, 197, 94, 0.1)"
                            : step.badge.color === "blue"
                            ? "rgba(59, 130, 246, 0.1)"
                            : step.badge.color === "yellow"
                            ? "rgba(255, 193, 7, 0.1)"
                            : "rgba(34, 197, 94, 0.1)",
                        color:
                          step.badge.color === "green"
                            ? "#16a34a"
                            : step.badge.color === "blue"
                            ? "#2563eb"
                            : step.badge.color === "yellow"
                            ? "#ca8a04"
                            : "#16a34a",
                      }}
                    >
                      {step.badge.icon}
                      {step.badge.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secret to 70% Savings Card */}
        <div className="max-w-5xl mx-auto mb-40 md:mb-56">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 backdrop-blur-md rounded-3xl p-6 lg:p-8 relative overflow-hidden  border-2 border-[#FEF08A] shadow-lg">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:space-x-6 space-y-4 md:space-y-0">
                {/* Icon */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-[#FEF08A] to-[#FDE047] rounded-xl flex items-center justify-center">
                    <span className="text-xl lg:text-2xl">
                      <HiOutlineLightningBolt className="text-black text-md w-8 h-8" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-inter !font-bold text-[#713F12] mb-3 lg:mb-4 text-center md:text-left">
                    The Secret to 70% Savings
                  </h3>
                  <p className="text-[#854D0E] font-inter text-base lg:text-lg mb-4 lg:mb-6 leading-relaxed text-center md:text-left">
                    Traditional delivery apps charge restaurants{" "}
                    <span className="bg-[#FEF08A] px-2 py-1 rounded text-[#713F12] font-semibold">
                      70% commission
                    </span>{" "}
                    on every order. By placing orders directly with restaurants,
                    we eliminate these fees and pass the savings directly to
                    you.
                  </p>

                  {/* Bullet Points */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#A16207] font-inter font-medium text-sm">
                        🎯 No hidden fees • 🤝 Direct partnerships • 💸 Real
                        savings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
