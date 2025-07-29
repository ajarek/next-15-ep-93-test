import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
  <div className="min-h-screen w-full bg-[#020617] relative">
  {/* Purple Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(139,92,246,0.4), transparent)`,
    }}
  />
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    
  <h1 className=" text-4xl font-bold text-center text-white  ">Home</h1>
  <Button className=" bg-blue-500">Click</Button>
    
    </div>  
</div>
  );
}
