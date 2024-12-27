import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade, Pagination } from "swiper/modules";
import useGetAnnouncements from "../../../../hooks/dashboard/useGetAnnouncements";
import AnnouncementModal from "../../../../ui/modals/AnnouncementModal";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AnnouncementsSlider = () => {
  const { data: announcements, isLoading } = useGetAnnouncements();
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState(null);

  return isLoading ? null : (
    <>
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        speed={1000}
        loop={true}
        modules={[Navigation, EffectFade, Autoplay, Pagination]}
        effect="fade"
        navigation={{
          nextEl: ".announcements_swiper-button-next",
          prevEl: ".announcements_swiper-button-prev",
        }}
        pagination={{
          el: ".announcements-pagination",
          clickable: true,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {!isLoading &&
          announcements?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="img">
                <img src={item?.image || "/images/s1.png"} alt="s1" />
              </div>
              <div className="slide_content">
                <h6>{item?.title}</h6>
                <p>{item?.Description}</p>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setTargetId(item?.id);
                  }}
                >
                  Learn More <i className="fa-regular fa-angle-right"></i>
                </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <AnnouncementModal
        showModal={showModal}
        setShowModal={setShowModal}
        targetId={targetId}
        setTargetId={setTargetId}
      />
    </>
  );
};

export default AnnouncementsSlider;
