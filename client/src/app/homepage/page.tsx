import { getProducts } from "@/api/product";
import { Footer } from "@/components/Footer";
import Heropage from "@/components/Heropage";
import Landingpage from "@/components/Landingpage";
import Navbar from "@/components/Navbar";
export default async function Homepage() {
  const products = await getProducts(8);
  return (
    <>
      <Navbar />
      <Heropage/>
      <Landingpage products={products}/>
      <Footer/>
    </>
  );
}    
