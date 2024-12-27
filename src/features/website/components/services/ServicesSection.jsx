export default function ServicesSection() {
  return (
    <section className="services_section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section_header">
              <img
                src="/images/icons/wheel.svg"
                alt="wheel"
                data-aos="fade-up"
              />
              <h4 data-aos="fade-up">Our Services</h4>
              <p data-aos="fade-up">
                Elevating Your Maritime Business with Nuaris and its Partners
                services Discover how Nuaris can help you
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-12 p-2">
            <div className="service_dashed_card" data-aos="fade-up">
              <h3>1</h3>
              <h4>Seamless Booking Management</h4>
              <p>
                Streamline your booking process and provide a seamless
                experience for your customers.
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-12 p-2">
            <div className="service_dashed_card" data-aos="fade-up">
              <h3>2</h3>
              <h4>
                Comprehensive Marketplaces <span>( Coming soon )</span>
              </h4>
              <p>
                Showcase your brand & your offers to a wider audience and
                attract new clients by building and customizing your own
                marketplace on Nuaris Platform .
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-12 p-2">
            <div className="service_dashed_card" data-aos="fade-up">
              <h3>3</h3>
              <h4>Financial Oversight</h4>
              <p>
                Track revenue, expenses, and payments to optimize your
                operations and make data-driven decisions.
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-12 p-2">
            <div className="service_dashed_card" data-aos="fade-up">
              <h3>4</h3>
              <h4>Exceptional Customer Service</h4>
              <p>
                Build strong relationships with your clients and provide
                personalized support
              </p>
            </div>
          </div>

          <div className="col-12 p-2">
            <div className="service_dashed_card" data-aos="fade-up">
              <h3>5</h3>
              <h4>Robust Marketing Tools</h4>
              <p>
                Utilise our powerful marketing tools, including our expertise
                in:
              </p>
              <div className="inner_list">
                <div className="sub_item">
                  <h5>UI/UX Design</h5>
                  <p>
                    Create visually stunning and user-friendly websites and
                    applications, integrated with Nuaris Robust backend system.
                  </p>
                </div>
                <div className="sub_item">
                  <h5>Logo and Profile Design</h5>
                  <p>
                    Develop a strong brand identity with professional logo and
                    profile design.
                  </p>
                </div>
                <div className="sub_item">
                  <h5>Content Marketing</h5>
                  <p>
                    Develop compelling content for social media and other
                    platforms.
                  </p>
                </div>
                <div className="sub_item">
                  <h5>Video Production</h5>
                  <p>Produce high-quality videos to showcase your offerings.</p>
                </div>
                <div className="sub_item">
                  <h5>Professional Photo Sessions</h5>
                  <p>
                    Capture stunning images of your yachts or boats for
                    marketing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
