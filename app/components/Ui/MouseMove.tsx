'use client';
import { useEffect } from "react";

export default function MouseMove() {
  useEffect(() => {
    const mouseDiv = document.getElementById("mouse");
    const moveMouse = (e: MouseEvent) => {
      if (mouseDiv) {
        mouseDiv.style.left = `${e.pageX + 10  }px`;
        mouseDiv.style.top = `${e.pageY + 50 }px`;
      }
    };
    window.addEventListener("mousemove", moveMouse);


  }, []);

  return (
    <div>
      <div id="mouse" className="absolute z-100 hidden  w-0 lg:block" >
      </div>
    </div>
  );
}
