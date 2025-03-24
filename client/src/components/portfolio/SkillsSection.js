import React from "react";

function SkillsSection({ skills, capitalizeFirstLetter }) {
  return (
    <section id="skills-section" className="skills-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        {skills && skills.length > 0 ? (
          <div className="skills-groups row justify-content-center">
            {(() => {
              const groupedSkills = skills.reduce((acc, skill) => {
                const type = skill.type;
                if (!acc[type]) {
                  acc[type] = [];
                }
                acc[type].push(skill.name);
                return acc;
              }, {});

              return Object.keys(groupedSkills).map((group, idx) => (
                <div
                  key={idx}
                  className="col-lg-3 col-md-6 col-sm-12 mb-4 skill-group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="skill-group-container">
                    <h4 className="skill-group-title">
                      {capitalizeFirstLetter(group)}
                    </h4>
                    <ul className="skill-list list-unstyled">
                      {groupedSkills[group].map((skill, skillIdx) => (
                        <li
                          key={skillIdx}
                          className="skill-item"
                          data-aos="fade-up"
                          data-aos-delay={skillIdx * 50}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ));
            })()}
          </div>
        ) : (
          <div className="col-12 text-center text-light-subtle">
            <p>No Skills Available.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
