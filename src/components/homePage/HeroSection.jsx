import React from "react";
import { Link } from "react-router-dom";
import BackgroundImg from "../../assets/images/herobg.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden min-h-[100vh] bg-cover bg-center pt-48 pb-32"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full relative"
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
                Each Order Helps Feed 10x More
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.125rem] font-inter !font-bold text-white md:leading-tight">
              Order Food, Pay in{" "}
              <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                $FORK
              </span>
              , Save 70%
            </h1>

            {/* Sub-text */}
            <p className="text-lg lg:text-xl text-white/90 font-poppins leading-relaxed max-w-xl">
              Every time you pay with $FORK, your order fuels real-world hunger
              relief — no subscriptions, no catches.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <IoMdCheckmarkCircleOutline
                  className="text-[#EBC633] w-6 h-6"
                  style={{
                    filter:
                      "drop-shadow(0px 0px 15px rgba(255, 255, 255, 01)) drop-shadow(0px 10px 15px rgba(255, 255, 255, 01))",
                  }}
                />
                <span
                  className="text-white font-inter text-lg"
                  style={{
                    textShadow:
                      "0px 0px 15px rgba(255, 255, 255, 01), 0px 10px 15px rgba(255, 255, 255, 01)",
                    filter: "none", 
                  }}
                >
                  Same restaurants you love
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <IoMdCheckmarkCircleOutline
                  className="text-[#EBC633] w-6 h-6"
                  style={{
                    filter:
                      "drop-shadow(0px 0px 15px rgba(255, 255, 255, 01)) drop-shadow(0px 10px 15px rgba(255, 255, 255, 01))",
                  }}
                />
                <span
                  className="text-white font-inter text-lg"
                  style={{
                    textShadow:
                      "0px 0px 15px rgba(255, 255, 255, 01), 0px 10px 15px rgba(255, 255, 255, 01)",
                    filter: "none",
                  }}
                >
                  Same delivery experience
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <IoMdCheckmarkCircleOutline
                  className="text-[#EBC633] w-6 h-6"
                  style={{
                    filter:
                      "drop-shadow(0px 0px 15px rgba(255, 255, 255, 01)) drop-shadow(0px 10px 15px rgba(255, 255, 255, 01))",
                  }}
                />
                <span
                  className="text-white font-inter text-lg"
                  style={{
                    textShadow:
                      "0px 0px 15px rgba(255, 255, 255, 01), 0px 10px 15px rgba(255, 255, 255, 01)",
                    filter: "none",
                  }}
                >
                  Zero subscription fees
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/order-now"
                className="bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white px-6 lg:px-8 py-3 lg:py-5 rounded-full font-outfit font-semibold text-base lg:text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                PLACE AN ORDER
              </Link>
              <button className="border-2 border-[#EBC633] bg-gradient-to-r from-[#EBC633]/10 to-[#FFE655]/10 text-[#EBC633] px-6 lg:px-8 py-3 lg:py-4 rounded-full font-outfit font-semibold text-base lg:text-lg hover:shadow-xl transition-all duration-300">
                BUY $FORK
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{
                      filter:
                        "drop-shadow(0px 0px 15px rgba(255, 255, 255, 01)) drop-shadow(0px 10px 15px rgba(255, 255, 255, 01))",
                    }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span
                className="text-white font-inter text-sm"
                style={{
                  textShadow:
                    "0px 0px 15px rgba(255, 255, 255, 01), 0px 10px 15px rgba(255, 255, 255, 01)",
                  filter: "blur(0.2px)",
                }}
              >
                4.8/5 from 2000+ Verified Orders
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="rounded-3xl p-4 border border-[#FFFFFF3B] max-w-md w-full"
              style={{
                background: "#FFFFFF33",
                backdropFilter: "blur(1px)",
                boxShadow: "0px 8px 32px rgba(59, 130, 246, 0.2)",
              }}
            >
              <div
                className="bg-white backdrop-blur-md rounded-2xl p-6 w-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)",
                  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-black text-lg font-inter font-semibold">
                        Original Price
                      </p>
                      <p className="text-[#6B7280] text-sm font-inter">
                        Delivery App
                      </p>
                    </div>
                    <p className="text-black text-2xl font-inter font-bold line-through">
                      $33.97
                    </p>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-black text-lg font-inter font-semibold">
                        FORKWARD Price
                      </p>
                      <p className="text-[#16A34A] text-xs font-inter font-medium">
                        Direct Order
                      </p>
                    </div>
                    <p className="text-[#16A34A] text-2xl font-inter font-bold">
                      $10.19
                    </p>
                  </div>

                  <div className="bg-[#F0FDF4] rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IoMdCheckmarkCircleOutline className="text-black w-5 h-5" />
                        <span className="text-[#166534] font-inter font-bold text-md">
                          You Save
                        </span>
                      </div>
                      <span className="text-[#166534] font-inter font-bold text-lg">
                        $23.78 (70%)
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex gap-2 rounded-lg p-3"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(153, 69, 255, 0.15) 0%, rgba(20, 241, 149, 0.15) 100%)",
                    }}
                  >
                    <div className="flex space-x-2">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-inter font-semibold text-md">
                        Making an Impact
                      </span>
                      <p className="text-[#374151] font-inter text-xs leading-relaxed">
                        For every 20 meals made with <strong>$FORK</strong>, we
                        donate 200 meals to those in need.{" "}
                        <u>Feeding America</u>.
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="w-full relative overflow-hidden rounded-full py-3 px-4 font-outfit font-semibold text-sm transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(153, 69, 255, 0.1) 0%, rgba(20, 241, 149, 0.1) 100%)",
                    }}
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] p-[1px]">
                      <div className="w-full h-full rounded-full bg-[#E9fbf6]"></div>
                    </div>
                    {/* Button Text */}
                    <span className="relative z-10 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                      FORK DASHBOARD
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
