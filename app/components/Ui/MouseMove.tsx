'use client';
import { useEffect } from "react";

export default function MouseMove() {
  useEffect(() => {
    const mouseDiv = document.getElementById("mouse");

    const moveMouse = (e: MouseEvent) => {
      if (mouseDiv) {
        mouseDiv.style.left = `${e.pageX - 40}px`;
        mouseDiv.style.top = `${e.pageY -40}px`;
      }
    };

    window.addEventListener("mousemove", moveMouse);


  }, []);

  return (
    <div>
      <div id="mouse" className="mouse w-full h-full relative hidden lg:block">

      </div>
    </div>
  );
}
