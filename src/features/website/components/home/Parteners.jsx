// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/swiper-bundle.css";

import { useState } from "react";
import JoinPartenerModal from "./JoinPartenerModal";

export default function Parteners() {
  const [show, setShow] = useState(false);
  return (
    <section className="parteners_section">
      <div className="container">
        <div className="section_header">
          <img src="/images/icons/wheel.svg" alt="wheel" data-aos="fade-up" />
          <h4 data-aos="fade-up">Nuaris Partners</h4>
          <p data-aos="fade-up">
            We are excited to announce our upcoming partnerships. Stay tuned for
            more details.
          </p>
          <div data-aos="fade-up">
            <button className="join_btn" onClick={() => setShow(true)}>
              Join Us
            </button>
          </div>
        </div>
        {/* <div className="sliders" data-aos="fade-up">
          <Swiper
            speed={4000}
            loop={true}
            slidesPerView={3}
            spaceBetween={24}
            modules={[Autoplay]}
            className="parteners_slider"
            autoplay={{ delay: 0, disableOnInteraction: false }}
            breakpoints={{
              992: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 3,
              },
              350: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo1.png" alt="1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo2.png" alt="2" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo3.png" alt="3" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo4.png" alt="4" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo5.png" alt="5" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo6.png" alt="6" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="img">
                <img src="/images/parteners/logo7.png" alt="7" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div> */}
      </div>
      <JoinPartenerModal show={show} setShow={setShow} />
    </section>
  );
}
