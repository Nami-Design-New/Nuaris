import Badge from "../../../ui/Badge";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

export default function FleetMediaSwiper({ media }) {
  return (
    <div className="fleet-media-swiper">
      <Badge state={1} content={"available"} />
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper"
      >
        {media?.video && (
          <SwiperSlide>
            <video src={media?.video} autoPlay loop muted playsInline></video>
          </SwiperSlide>
        )}
        {media?.images?.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt="yacht" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
