import React from "react";

const FloatingShapes: React.FC = () => (
  <div className="floating-shapes pointer-events-none fixed top-0 left-0 w-full h-full z-0">
    <div className="shape shape-1 absolute w-20 h-20 top-[10%] left-[5%] border-4 border-black bg-[#4ECDC4] animate-float rotate-45" style={{ animationDelay: "0s" }} />
    <div className="shape shape-2 absolute w-16 h-16 top-[30%] right-[10%] border-4 border-black bg-[#FF6B6B] rounded-full animate-float" style={{ animationDelay: "2s" }} />
    <div className="shape shape-3 absolute w-[100px] h-10 bottom-[20%] left-[10%] border-4 border-black bg-[#FFE066] animate-float" style={{ animationDelay: "4s" }} />
    <div className="shape shape-4 absolute w-[70px] h-[70px] bottom-[40%] right-[5%] border-4 border-black bg-[#9B59B6] animate-float rotate-[30deg]" style={{ animationDelay: "1s" }} />
  </div>
);

export default FloatingShapes; 