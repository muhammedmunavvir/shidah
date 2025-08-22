import { Footer } from "@/components/Footer";
import Heropage from "@/components/Heropage";
import Landingpage from "@/components/Landingpage";
import Navbar from "@/components/Navbar";
export default function Homepage() {
  return (
    <>
      <Navbar />
      <Heropage/>
      <Landingpage/>
      <Footer/>
    </>
  );
}    
