import { useState, useEffect } from "react";

function useCheckIfIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        );
      const hasTouch = "ontouchstart" in window;
      const smallScreen = window.innerWidth <= 768;

      setIsMobile(isMobileDevice || (hasTouch && smallScreen));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default useCheckIfIsMobile;
