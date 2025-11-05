import Header from "@/app/layout/header/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import LowerBanner from "./components/LowerBanner";
import Footer from "./components/Footer";

export default function LandingPageScreen() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <WhyUs />
      <LowerBanner />
      <Footer />
    </>
  );
}
