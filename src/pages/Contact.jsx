function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contact Us</h2>

        <p>📧 Email: support@wellness.com</p>
        <p>📞 Phone: +91 9876543210</p>
        <p>🏫 Location: KL University</p>

        <form>
          <input placeholder="Your Name" className="input" />
          <input placeholder="Your Email" className="input" />
          <textarea placeholder="Your Message" className="input" rows="4" />

          <button className="btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;