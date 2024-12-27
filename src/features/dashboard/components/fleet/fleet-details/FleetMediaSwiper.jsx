import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Badge from "../../../../../ui/Badge";
import { s3Url } from "../../../../../utils/constants";

export default function FleetMediaSwiper({ media, state }) {
  const videoRef = useRef(null);
  const [autoplayDelay, setAutoplayDelay] = useState(2500);

  let badge;

  switch (state) {
    case "Active":
      badge = <Badge state={1} content={"Available"} />;
      break;
    case "Hidden":
      badge = <Badge state={0} content={"Hidden"} />;
      break;
    case "Inactive":
      badge = <Badge state={2} content={"Inactive"} />;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        const videoDuration = videoRef.current.duration * 1000;
        setAutoplayDelay(videoDuration);
      };
    }
  }, [media?.video]);

  return (
    <div className="fleet-media-swiper">
      {badge}
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          if (swiper.realIndex === 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setAutoplayDelay(videoRef.current.duration * 1000);
          } else {
            setAutoplayDelay(2500);
          }
        }}
      >
        {media?.find((image) => image?.type === "VIDEO" && image?.is_active) && (
          <SwiperSlide>
            <video
              ref={videoRef}
              src={
                s3Url +
                media?.find(
                  (image) => image?.type === "VIDEO" && image?.is_active
                )?.path
              }
              autoPlay
              loop
              muted
              playsInline
            />
          </SwiperSlide>
        )}
        {media
          ?.filter((image) => image?.type === "IMAGE" && image?.is_active)
          ?.map((image) => (
            <SwiperSlide key={image?.id}>
              <img src={s3Url + image.path} alt="yacht" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
