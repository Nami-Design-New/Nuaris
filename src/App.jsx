import { useEffect, useState } from "react";
import { router } from "./providers/router";
import { RouterProvider } from "react-router-dom";
import IntroLoader from "./ui/loaders/IntroLoader";
import ReactGA from "react-ga4";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleLocationChange = () => {
      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
      });
    };

    ReactGA.initialize(import.meta.env.VITE_TRACKING_ID);
    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <IntroLoader className={showIntro ? "" : "hide"} />
      <RouterProvider router={router} />
    </>
  );
}
