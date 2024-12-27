import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";

export default function Statistics() {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      intersectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        intersectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="statistics_section" ref={sectionRef}>
      <div className="container">
        <div className="section_header">
          <img src="/images/icons/wheel.svg" alt="wheel" data-aos="fade-up" />
          <h4 data-aos="fade-up">Nuaris Achievements</h4>
          <p data-aos="fade-up">
            We are proud of our achievements - innovation, Features, excellence
            & customer satisfaction. Here is to more success!
          </p>
        </div>
        <div className="statistics">
          <div className="statistic_card" data-aos="fade-up">
            <div className="icon">
              <img src="/images/icons/clients-icon.svg" alt="icon" />
            </div>
            <div className="content">
              <h3>
                {startCount && <CountUp duration={5} start={0} end={2615} />}
              </h3>
              <p>Client</p>
            </div>
          </div>

          <div className="statistic_card" data-aos="fade-up">
            <div className="icon">
              <img src="/images/icons/features.svg" alt="icon" />
            </div>
            <div className="content">
              <h3>
                {startCount && <CountUp duration={5} start={0} end={24} />}
              </h3>
              <p>Features</p>
            </div>
          </div>

          <div className="statistic_card" data-aos="fade-up">
            <div className="icon">
              <img src="/images/icons/happy.svg" alt="icon" />
            </div>
            <div className="content">
              <h3>
                {startCount && <CountUp duration={5} start={0} end={99} />}%
              </h3>
              <p>Happy Client</p>
            </div>
          </div>

          <div className="statistic_card" data-aos="fade-up">
            <div className="icon">
              <img src="/images/icons/yacht.svg" alt="icon" />
            </div>
            <div className="content">
              <h3>
                {startCount && <CountUp duration={5} start={0} end={2615} />}
              </h3>
              <p>Yacht</p>
            </div>
          </div>

          <div className="statistic_card" data-aos="fade-up">
            <div className="icon">
              <img src="/images/fav.svg" alt="icon" />
            </div>
            <div className="content">
              <h3>
                {startCount && <CountUp duration={5} start={0} end={924} />}
              </h3>
              <p>Trip</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
