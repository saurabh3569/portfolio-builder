import React from "react";
import moment from "moment";

function ContactManager({ contacts, handleDeleteContact }) {
  return (
    <section
      id="dashboard-contacts-section"
      className="contacts-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Contacts</h2>
      {contacts && contacts.length > 0 ? (
        <div className="contacts-list">
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="list-item"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <div>
                  <p className="mb-1">
                    <strong>Name:</strong> {contact.name || "Anonymous"}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {contact.email || "Not provided"}
                  </p>
                  <p className="mb-1">
                    <strong>Message:</strong> {contact.message || "No message"}
                  </p>
                  <p className="mb-0 received-date">
                    <strong>Received:</strong>{" "}
                    {contact.createdAt
                      ? moment(contact.createdAt).format("MMM Do YYYY, h:mm a")
                      : "Unknown"}
                  </p>
                </div>
                <div className="action-buttons">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteContact(contact.id)}
                    title="Delete Contact"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-light-subtle">No contacts available.</p>
      )}
    </section>
  );
}

export default ContactManager;
