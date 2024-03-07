import yacht1 from "../../../../assets/images/yacht1.jpeg";
import yacht2 from "../../../../assets/images/yacht2.jpeg";
import yacht3 from "../../../../assets/images/yacht3.jpeg";
import yacht4 from "../../../../assets/images/yacht4.jpeg";
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
          clickable: true,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={yacht1} alt="yacht1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={yacht2} alt="yacht2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={yacht3} alt="yacht3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={yacht4} alt="yacht4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
