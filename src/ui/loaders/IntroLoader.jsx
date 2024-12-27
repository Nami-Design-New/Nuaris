import intro from "../../assets/lotties/intro.json";
import Lottie from "react-lottie";

export default function IntroLoader({ className }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: intro,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={`intro_loader ${className}`}>
      <Lottie options={defaultOptions} />
    </div>
  );
}
