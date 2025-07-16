import React, { useRef, useEffect } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, className = "" }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (show && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (show) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[1000]" style={{ display: "flex" }}>
      <div
        className={`relative bg-white p-10 border-4 border-black shadow-[12px_12px_0_#000] max-w-lg w-[90%] text-center rounded-2xl ${className}`}
        ref={modalRef}
      >
        <button className="absolute top-3 right-6 text-2xl font-bold text-black bg-none border-none cursor-pointer" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 