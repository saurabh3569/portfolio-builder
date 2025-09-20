import React, { useState, useRef } from "react";
import { uploadResume } from "../../services/api";
import "./css//ResumeManager.css";

function ResumeManager({ resumeUrl, setResumeUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const dropRef = useRef(null);

  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Only PDF files are allowed!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a PDF file first");
      return;
    }

    try {
      setUploading(true);
      const res = await uploadResume(selectedFile);
      setResumeUrl(res.data.resumeUrl);
      setSelectedFile(null);
      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading resume");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section
      id="dashboard-resume-section"
      className="resume-section"
      data-aos="fade-up"
    >
      <h2 className="section-title text-center mb-4">Manage Resume</h2>
      <div className="resume-card card mx-auto p-4" ref={dropRef}>
        <form onSubmit={handleUpload}>
          <div
            className={`drop-zone ${selectedFile ? "has-file" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => dropRef.current.querySelector("input").click()}
          >
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p>Drag & Drop your PDF here or click to select</p>
            )}
          </div>
          <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn btn-success"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>

        {resumeUrl && (
          <div className="current-resume mt-4 text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowPreview(true)}
            >
              View Current Resume
            </button>
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {showPreview && (
        <div className="resume-modal" onClick={() => setShowPreview(false)}>
          <div
            className="resume-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              width="100%"
              height="600px"
              style={{ border: "none", borderRadius: "8px" }}
            />
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ResumeManager;
