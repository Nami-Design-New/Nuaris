import { Accordion } from "react-bootstrap";

export default function AdditionalServices() {
  return (
    <section className="additional_services">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 p-2 h-100">
            <div className="img_parent">
              <div className="img1" data-aos="zoom-in-up">
                <img src="/images/s1.jpeg" alt="s1" />
              </div>
              <div className="img2" data-aos="zoom-in-up">
                <img src="/images/s2.jpeg" alt="s2" />
              </div>
              <div className="img3" data-aos="zoom-in-up">
                <img src="/images/s3.jpeg" alt="s3" />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 p-2 gap-5 d-flex flex-column justify-content-center">
            <div className="header">
              <div
                className="d-flex align-items-center gap-2"
                data-aos="fade-up"
              >
                <img src="/images/icons/wheel.svg" alt="wheel" />
                <h4>
                  Additional Services <span>( Coming soon )</span>
                </h4>
              </div>
            </div>
            <Accordion defaultActiveKey={1}>
              <Accordion.Item eventKey={1} data-aos="fade-up">
                <Accordion.Header>
                  <span>1</span>
                  <h5>Buy and Sell Marine Vessels</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Explore our marketplace for buying and selling yachts,
                    boats, and other marine assets.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey={2} data-aos="fade-up">
                <Accordion.Header>
                  <span>2</span>
                  <h5>Insurance Solutions</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Find suitable insurance options to protect your business and
                    assets.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey={3} data-aos="fade-up">
                <Accordion.Header>
                  <span>3</span>
                  <h5>Financing Options</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Explore financing opportunities to support your growth and
                    expansion.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
