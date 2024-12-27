import { Link } from "react-router-dom";

export default function SectionHeader({ title }) {
  return (
    <section className="page_header_landing">
      <div className="container h-100">
        <div className="content">
          <div className="header">
            <div className="links">
              <Link to="/">Home</Link>
              <span>
                <i className="fa-regular fa-angle-right"></i>
              </span>
              <Link>{title}</Link>
            </div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="img" data-aos="zoom-in-up">
            <img src="/images/bird.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
