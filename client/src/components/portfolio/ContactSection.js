// src/components/home/ContactSection.jsx
import React from "react";

function ContactSection({
  contactForm,
  formStatus,
  handleContactSubmit,
  handleInputChange,
  user,
}) {
  return (
    <section
      id="contact-section"
      className="contact-section"
      data-aos="fade-up"
    >
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="row justify-content-center">
          {/* Contact Form */}
          <div className="col-lg-6 col-md-8 col-sm-10 mb-4">
            <div className="contact-card">
              <h5 className="card-title mb-4">Get in Touch</h5>
              {formStatus && (
                <div className="alert alert-success" role="alert">
                  {formStatus}
                </div>
              )}
              <form onSubmit={handleContactSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control contact-input"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control contact-input"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control contact-input"
                    id="message"
                    name="message"
                    rows="4"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn contact-btn">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6 col-md-8 col-sm-10 mb-4">
            <div className="contact-details-card">
              <h5 className="card-title mb-4">Contact Details</h5>
              <ul className="list-unstyled contact-details-list">
                <li className="mb-3">
                  <i className="fas fa-envelope me-2"></i>
                  <span>Email: </span>
                  <a href={`mailto:${user.email}`} className="contact-link">
                    {user.email}
                  </a>
                </li>
                <li className="mb-3">
                  <i className="fas fa-phone me-2"></i>
                  <span>Phone: </span>
                  <a href="tel:+1234567890" className="contact-link">
                    {user.phone}
                  </a>
                </li>
                <li className="mb-3">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <span>Location: </span>
                  <span>{user.location}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
