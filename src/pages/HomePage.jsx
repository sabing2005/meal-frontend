import React from "react";
import {
  HeroSection,
  HowItWorksSection,
  OrderWithFork,
  GivingBack,
  ReviewsSection,
  FaqSection,
  OfferSection,
  MediaGallery,
} from "../components/homePage";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />
      {/* Order With Fork Section */}
      <OrderWithFork />

      {/* Giving Back Section */}
      <GivingBack />

      {/* Media Gallery Section */}
      <MediaGallery />

      
      {/* Reviews Section */}
      {/* <ReviewsSection /> */}


      {/* FAQ Section */}
      <FaqSection />

      {/* Offer Section */}
      <OfferSection />
    </>
  );
};

export default HomePage;
