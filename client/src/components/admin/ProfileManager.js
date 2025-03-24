import React, { useRef } from "react";

function ProfileManager({
  profile,
  handleUpdateProfile,
  editingProfile,
  setEditingProfile,
}) {
  const formRef = useRef(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile((prev) => ({ ...prev, [name]: value }));
  };

  const onEditProfile = () => {
    setEditingProfile({
      name: profile.name || "",
      email: profile.email || "",
      username: profile.username || "",
      phone: profile.phone || "",
      password: "",
      location: profile.location || "",
      resume: profile.resume || "", // Added resume
      summary: profile.summary || "", // Added summary
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dashboard-profile-section"
      className="profile-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Profile</h2>
      <div className="card mb-4 profile-card" ref={formRef}>
        <div className="card-body">
          {editingProfile ? (
            <>
              <h5 className="card-title mb-4">Edit Profile</h5>
              <form onSubmit={handleUpdateProfile}>
                <div className="row g-3">
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profileName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profileName"
                      name="name"
                      value={editingProfile.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profileEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="profileEmail"
                      name="email"
                      value={editingProfile.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profileUsername" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profileUsername"
                      name="username"
                      value={editingProfile.username}
                      onChange={handleProfileChange}
                      required
                      pattern="^[a-zA-Z0-9._-]+$"
                      minLength="3"
                      maxLength="30"
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profilePhone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profilePhone"
                      name="phone"
                      value={editingProfile.phone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profilePassword" className="form-label">
                      Password (min 6)
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="profilePassword"
                      name="password"
                      value={editingProfile.password}
                      onChange={handleProfileChange}
                      minLength="6"
                      placeholder="Leave blank to keep unchanged"
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profileLocation" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profileLocation"
                      name="location"
                      value={editingProfile.location}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label htmlFor="profileResume" className="form-label">
                      Resume URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="profileResume"
                      name="resume"
                      value={editingProfile.resume}
                      onChange={handleProfileChange}
                      placeholder="Enter resume URL"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="profileSummary" className="form-label">
                      Summary
                    </label>
                    <textarea
                      className="form-control"
                      id="profileSummary"
                      name="summary"
                      value={editingProfile.summary}
                      onChange={handleProfileChange}
                      rows="3"
                      placeholder="Enter a brief summary about yourself"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button type="submit" className="btn btn-success">
                    Save Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingProfile(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="profile-display">
              <h5 className="card-title mb-4">Your Profile</h5>
              <p className="mb-1">
                <strong>Name:</strong> {profile.name || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {profile.email || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>Username:</strong> {profile.username || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {profile.phone || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>Location:</strong> {profile.location || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>Resume:</strong>{" "}
                {profile.resume ? (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  "Not provided"
                )}
              </p>
              <p className="mb-1">
                <strong>Summary:</strong> {profile.summary || "Not provided"}
              </p>
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={onEditProfile}>
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileManager;
