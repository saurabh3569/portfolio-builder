import React, { useRef } from "react"; // Added useRef for scrolling

function SocialLinksManager({
  socialLinks,
  handleAddSocialLink,
  handleEditSocialLink,
  handleUpdateSocialLink,
  handleDeleteSocialLink,
  newSocialLink,
  setNewSocialLink,
  editingSocialLink,
  setEditingSocialLink,
}) {
  const formRef = useRef(null);

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setNewSocialLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setEditingSocialLink((prev) => ({ ...prev, [name]: value }));
  };

  const onEditSocialLink = (link) => {
    handleEditSocialLink(link);
    // Scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="dashboard-social-links-section"
      className="social-links-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Manage Social Links</h2>
      <div className="card mb-4" ref={formRef}>
        <div className="card-body">
          <h5 className="card-title mb-4">Add New Social Link</h5>
          <form onSubmit={handleAddSocialLink}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="linkPlatform" className="form-label">
                  Platform
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="linkPlatform"
                  name="platform"
                  value={newSocialLink.platform}
                  onChange={handleSocialLinkChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="linkUrl" className="form-label">
                  URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="linkUrl"
                  name="url"
                  value={newSocialLink.url}
                  onChange={handleSocialLinkChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Add Social Link
            </button>
          </form>
        </div>
      </div>
      {socialLinks && socialLinks.length > 0 ? (
        <div className="social-links-list">
          {socialLinks.map((link, idx) => (
            <div
              key={idx}
              className="list-item"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {editingSocialLink && editingSocialLink._id === link._id ? (
                <form
                  onSubmit={handleUpdateSocialLink}
                  className="edit-social-link-form"
                >
                  <div className="row align-items-center">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="platform"
                        value={editingSocialLink.platform}
                        onChange={handleEditSocialLinkChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="url"
                        className="form-control"
                        name="url"
                        value={editingSocialLink.url}
                        onChange={handleEditSocialLinkChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3 text-end">
                      <button type="submit" className="btn btn-success me-2">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditingSocialLink(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {link.platform}
                    </a>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => onEditSocialLink(link)} // Updated to use new handler
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSocialLink(link._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-light-subtle">
          No Social Links Available.
        </p>
      )}
    </section>
  );
}

export default SocialLinksManager;
