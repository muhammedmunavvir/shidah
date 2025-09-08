import { Toaster } from "@/components/ui/sonner";
import Homepage from "./homepage/page";

export default function Home() {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Homepage />
    </div>
  );
}
