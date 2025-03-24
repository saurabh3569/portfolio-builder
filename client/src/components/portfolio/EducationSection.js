import React from "react";

function EducationSection({ educations }) {
  return (
    <section
      id="education-section"
      className="education-section"
      data-aos="fade-up"
    >
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="row justify-content-center">
          {educations && educations.length ? (
            educations.map((edu, idx) => (
              <div
                key={idx}
                className="col-lg-6 col-md-8 col-sm-10 mb-4"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="education-card">
                  <h5 className="card-title">{edu.degree}</h5>
                  <p className="card-institution">{edu.institution}</p>
                  <p className="card-date">
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                  {edu.description && (
                    <p className="card-description">{edu.description}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-light-subtle">
              <p>No Educations Available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
