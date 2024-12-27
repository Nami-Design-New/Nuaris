import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="landing_footer">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-5">
            <div className="social">
              <h6>Get connected with us on social networks:</h6>
              <div className="links">
                <Link to="">
                  <img src="/images/icons/instagram.svg" alt="instagram" />
                </Link>
                <Link to="">
                  <img src="/images/icons/linkedin.svg" alt="linkedin" />
                </Link>
                <Link to="">
                  <img src="/images/icons/facebook.svg" alt="facebook" />
                </Link>
                <Link to="">
                  <img src="/images/icons/twitter.svg" alt="twitter" />
                </Link>
                <Link to="">
                  <img src="/images/icons/googlePlus.svg" alt="google" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-12 p-2">
            <Link to="/">
              <img src="/images/logoH.svg" alt="logo" />
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h3>Services</h3>
            <ul className="footer_links">
              <li>
                <Link to="">Maritime Services</Link>
              </li>
              <li>
                <Link to="">Partnership Services</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 p-2">
            <h3>Useful Links</h3>
            <ul className="footer_links">
              <li>
                <Link to="https://www.redsea.gov.sa/" target="_blank">
                  Saudi Red Sea Authority
                </Link>
              </li>
              <li>
                <Link to="https://www.visitsaudi.com/ar" target="_blank">
                  Visit Saudi
                </Link>
              </li>
              <li>
                <Link to="https://ebhar.naql.sa/Ebhar_Portal/" target="_blank">
                  Ebhar
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 col-12 p-2">
            <h3>Contact</h3>
            <ul className="footer_links contact">
              <li>
                <Link to="" target="_blank">
                  <img src="/images/icons/loc.svg" alt="" /> Jeddah - Saudi
                  Arabia
                </Link>
              </li>
              <li>
                <Link to="" target="_blank">
                  <img src="/images/icons/loc.svg" alt="" /> Dubai - United Arab
                  Emirates
                </Link>
              </li>
              <li>
                <Link to="tel:+966540380709">
                  <img src="/images/icons/phone.svg" alt="" /> +966 54 038 0709
                </Link>
              </li>
              <li>
                <Link to="tel:+971564352479">
                  <img src="/images/icons/phone.svg" alt="" /> +971 56 435 2479
                </Link>
              </li>
              <li>
                <Link to="https://wa.me/966540380709" target="_blank">
                  <img src="/images/icons/whatsapp.svg" alt="" /> +966 54 038
                  0709
                </Link>
              </li>
              <li>
                <Link to="mailto:info@nuaris.co">
                  <img src="/images/icons/email.svg" alt="" /> info@nuaris.co
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 p-2 mt-3">
            <div className="copy_rights">
              <h6>
                All Rights Reserved for <Link to="/">Nuaris</Link>{" "}
                <span>&copy; {new Date().getFullYear()}.</span>
              </h6>
              <div className="links">
                <Link to="terms-conditions">Terms & Conditions</Link>
                <Link to="privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
