export default function Benifits() {
  return (
    <section className="benifits_section">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="section_header">
              <img
                src="/images/icons/wheel.svg"
                alt="wheel"
                data-aos="fade-up"
              />
              <h4 data-aos="fade-up">Benefits of Nuaris' Services</h4>
              <p data-aos="fade-up">
                By leveraging Nuaris' comprehensive services, you can
              </p>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="benifits_cards">
              <div className="benifit_card" data-aos="fade-up">
                <img src="/images/icons/benifit1.svg" alt="benifit" />
                <h3>Increase efficiency</h3>
                <p>Streamline operations and reduce manual tasks.</p>
              </div>
              <div className="benifit_card" data-aos="fade-up">
                <img src="/images/icons/benifit2.svg" alt="benifit" />
                <h3>Enhance customer experience</h3>
                <p> Provide exceptional service and build loyalty</p>
              </div>
              <div className="benifit_card" data-aos="fade-up">
                <img src="/images/icons/benifit3.svg" alt="benifit" />
                <h3>Expand your reach</h3>
                <p> Attract new customers and grow your market share.</p>
              </div>
              <div className="benifit_card" data-aos="fade-up">
                <img src="/images/icons/benifit4.svg" alt="benifit" />
                <h3>Make data-driven decisions</h3>
                <p>Use analytics to optimise your business</p>
              </div>
              <div className="benifit_card" data-aos="fade-up">
                <img src="/images/icons/benifit5.svg" alt="benifit" />
                <h3>Network with industry professionals</h3>
                <p>Connect with other businesses in the marine industry.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
