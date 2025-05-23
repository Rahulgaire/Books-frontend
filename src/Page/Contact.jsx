import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contact", contact);
      console.log("Server Response:", response.data);
      toast.success("Your message has been submitted!");
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission Error:", error.message);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <p>
            We would love to hear from you! Please fill out the form below or
            reach us through the contact details.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contact.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>

          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
          </div>
        </div>

        {/* Contact Info & Map */}
        <div className="contact-info-box">
          <div className="contact-details">
            <h3>Address</h3>
            <p>123 Book Street, Book City, BC 45678</p>
            <p>Email: support@bookstore.com</p>
            <p>Phone: +123 456 789</p>
          </div>

          <div className="contact-map">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086024253577!2d-122.41941508468126!3d37.77492977975962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064cb67f2b3%3A0x2f9f2b376cd5a579!2s123%20Book%20Street%2C%20Book%20City%2C%20BC%2045678!5e0!3m2!1sen!2sus!4v1614092959373!5m2!1sen!2sus"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
