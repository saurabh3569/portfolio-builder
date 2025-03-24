import React from "react";

function Footer({ socialLinks }) {
  return (
    <footer className="footer-section">
      <div className="container text-center">
        {socialLinks && socialLinks.length > 0 ? (
          <div className="social-links-footer mb-3" data-aos="fade-up">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-text mx-2"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "#5DADE2",
                  fontSize: "16px",
                }}
              >
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-light-subtle">
            No Social Links Available.
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
