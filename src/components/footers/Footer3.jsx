import {
  carBrands,
  contactItems,
  navItems,
  socialMediaLinks,
  vehicleTypes,
} from "@/data/footerLinks";
import { Link } from "react-router-dom";
import React from "react";

export default function Footer3({
  parenttClass = "boxcar-footer footer-style-five",
}) {
  return (
    <footer className={parenttClass}>
      <div className="footer-top">
        <div className="boxcar-container">
          <div className="right-box">
            <div className="top-left wow fadeInUp">
              <h6 className="title">Join BoxCar</h6>
              <div className="text">
                Receive pricing updates, shopping tips &amp; more!
              </div>
            </div>
            <div className="subscribe-form wow fadeInUp" data-wow-delay="100ms">
              <form
                onSubmit={(e) => e.preventDefault()}
                method="post"
                action="#"
              >
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="email"
                    defaultValue=""
                    placeholder="Your e-mail address"
                    required
                  />
                  <button
                    type="button"
                    className="theme-btn btn-style-one hover-light"
                  >
                    <span className="btn-title">Sign Up</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="boxcar-container">
          <div className="row">
            {/* Footer COlumn */}
            <div className="footer-column-two col-lg-9 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Useful Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <h4 className="widget-title">Quick Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {contactItems.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="200ms"
                  >
                    <h4 className="widget-title">Our Brands</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {carBrands.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="300ms"
                  >
                    <h4 className="widget-title">Vehicles Type</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {vehicleTypes.map((elm, i) => (
                          <li key={i}>
                            <Link to={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* footer column */}
            <div className="footer-column col-lg-3 col-md-6 col-sm-12">
              <div
                className="footer-widget social-widget wow fadeInUp"
                data-wow-delay="400ms"
              >
                <h4 className="widget-title">Vehicles Type</h4>
                <div className="widget-content">
                  <div className="text">
                    Monday - Friday: 09:00AM - 09:00 PMSaturday: 09:00AM -
                    07:00PM Sunday: Closed
                  </div>
                  <div className="social-icons">
                    <h6 className="title">Connect With Us</h6>
                    <ul>
                      {socialMediaLinks.map((social, index) => (
                        <li key={index}>
                          <a href={social.link}>
                            <i className={social.iconClass} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Footer Bottom */}
      <div className="footer-bottom">
        <div className="boxcar-container">
          <div className="inner-container">
            <div className="copyright-text wow fadeInUp">
              © 2024{" "}
              <a
                href="https://themeforest.net/user/elite-themes24"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                elite-themes24
              </a>{" "}
              . All rights reserved.
            </div>
            <ul className="footer-nav wow fadeInUp" data-wow-delay="100ms">
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Notice</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
