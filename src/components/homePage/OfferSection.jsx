import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import offerbg from "../../assets/images/offerbg.png";
import burgerImg from "../../assets/images/burger.png";
import hotdogImg from "../../assets/images/hotdog.png";

const OfferSection = () => {
  return (
    <section
      className="py-20 mt-[-110px] md:mt-[-111px] xl:mt-[-150px] relative overflow-hidden"
      style={{
        background: `url(${offerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Floating Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hotdog - Top right corner, peeking behind */}
        <div
          className="absolute right-12 top-32 w-48 h-48 opacity-100"
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

        {/* Burger - Bottom left corner, peeking behind */}
        <div
          className="absolute left-8 bottom-8 w-48 h-48 opacity-100"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 top-40">
        {/* Promotional Modal */}
        <div className="max-w-7xl mx-auto mb-40">
          <div
            className="rounded-3xl p-6 border border-[#FFFFFF3B]"
            style={{
              background: "#FFFFFF33",
              backdropFilter: "blur(1px)",
              boxShadow: "0px 8px 32px rgba(59, 130, 246, 0.2)",
            }}
          >
            <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Decorative circular shapes inside */}
              <div className="absolute bottom-[-30px] left-[-24px] w-24 h-24 bg-[#a761d5] rounded-full"></div>
              <div className="absolute top-[-60px] right-48 w-32 h-32 bg-[#5ace90] rounded-full"></div>

              <div className="relative z-10">
                {/* Top Banner */}
                <div className="inline-flex items-center gap-2 bg-[#FFFFFF66] text-white px-4 py-2 rounded-full text-sm font-inter !font-bold mb-6">
                  <BsLightningCharge className="text-white" />
                  <span>LIMITED TIME OFFER</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl lg:text-4xl font-inter !font-bold text-white mb-6">
                  Ready to save 70% on your next meal?
                </h2>

                {/* Body Text */}
                <p className="text-white/90 font-inter text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                  Let us be your agent and help you get the same food you love
                  at a lower price. Join thousands of students already saving.
                </p>

                {/* CTA Button */}
                <button className="bg-white py-4 px-8 rounded-full font-inter font-bold flex items-center justify-center gap-3 mx-auto mb-8 transition-all duration-300 hover:scale-105 relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #9945FF 0%, #14F195 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      padding: "1px",
                    }}
                  ></div>
                  <svg
                    className="text-lg relative z-10 w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="lightningGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" style={{ stopColor: "#9945FF" }} />
                        <stop offset="100%" style={{ stopColor: "#14F195" }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
                      fill="url(#lightningGradient)"
                    />
                  </svg>
                  <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent relative z-10">
                    GET 70% OFF NOW
                  </span>
                </button>

                {/* Benefit Points */}
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-white text-sm" />
                    <span className="text-white text-sm font-inter">
                      No commitment
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-white text-sm" />
                    <span className="text-white text-sm font-inter">
                      No hidden fees
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegCheckCircle className="text-white text-sm" />
                    <span className="text-white text-sm font-inter">
                      Instant savings
                    </span>
                  </div>
                  {/* Trust Indicator */}
                  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl gap-3 bg-white/10 backdrop-blur-sm px-16 py-3 rounded-full border-2 border-[#EBC633]">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-[#EBC633] text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-white text-sm font-inter font-medium">
                      Trusted by 2000+ students
                    </span>
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

export default OfferSection;
