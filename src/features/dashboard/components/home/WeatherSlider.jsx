// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectFade } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function WeatherSlider() {
//   const [weatherData, setWeatherData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const { latitude, longitude } = position.coords;

//           console.log(position.coords);

//           const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=30&units=metric&appid=${
//               import.meta.env.VITE_WEATHER_API_KEY
//             }`
//           );

//           const data = await response.json();
//           setWeatherData(data.list);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return <div>Loading weather data...</div>;
//   }

//   return (
//     <Swiper
//       spaceBetween={24}
//       slidesPerView={1}
//       speed={1000}
//       loop={true}
//       modules={[Navigation, EffectFade, Autoplay]}
//       effect="fade"
//       navigation={{
//         nextEl: ".weather_swiper-button-next",
//         prevEl: ".weather_swiper-button-prev",
//       }}
//       autoplay={{ delay: 5000, disableOnInteraction: false }}
//     >
//       {weatherData.map((day, index) => (
//         <SwiperSlide key={index}>
//           <div className="slide-header">
//             <figure className="img-container">
//               <img
//                 src={`https://openweathermap.org/img/wn/${day?.weather?.[0]?.icon}@2x.png`}
//                 alt={day?.weather[0]?.description}
//               />
//             </figure>
//             <h3>{Math.round(day?.temp?.day)}&deg;</h3>
//           </div>
//           <div className="slide_content">
//             <div className="slide_content_box">
//               <p>
//                 Wind <span>{Math.round(day?.speed)} km/h</span>
//               </p>
//               <p>
//                 Pressure <span>{day?.pressure}MB</span>
//               </p>
//               <p>
//                 Sunrise{" "}
//                 <span>
//                   {new Date(day?.sunrise * 1000).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </p>
//             </div>
//             <div className="slide_content_box">
//               <p>
//                 Real Feel <span>{Math.round(day?.feels_like?.day)}&deg;</span>
//               </p>
//               <p>
//                 Humidity <span>{day?.humidity}%</span>
//               </p>
//               <p>
//                 Sunset{" "}
//                 <span>
//                   {new Date(day?.sunset * 1000).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </p>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// export default WeatherSlider;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

function WeatherSlider() {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      speed={1000}
      loop={true}
      modules={[Navigation, EffectFade, Autoplay]}
      effect="fade"
      navigation={{
        nextEl: ".weather_swiper-button-next",
        prevEl: ".weather_swiper-button-prev",
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img
              src="/images/icons/weather-icon.png"
              alt="weather icon"
            />
          </figure>
          <h3>16&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img
              src="/images/icons/weather-icon.png"
              alt="weather icon"
            />
          </figure>
          <h3>20&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-header">
          <figure className="img-container">
            <img
              src="/images/icons/weather-icon.png"
              alt="weather icon"
            />
          </figure>
          <h3>22&deg;</h3>
        </div>
        <div className="slide_content">
          <div className="slide_content_box">
            <p>
              Wind N-E. <span>6-7km/h</span>
            </p>
            <p>
              Pressure <span>100MB</span>
            </p>
            <p>
              Sunrise <span>5:30AM</span>
            </p>
          </div>
          <div className="slide_content_box">
            <p>
              Real Feel <span>18&deg;</span>
            </p>
            <p>
              Humidity <span>51%</span>
            </p>
            <p>
              Sunset <span>6:45</span>
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default WeatherSlider;

