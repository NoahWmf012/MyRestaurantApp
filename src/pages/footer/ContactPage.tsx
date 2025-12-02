import { useState } from 'react';
import './Contact.scss';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add actual form submission logic
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">Get In Touch</h1>
                    <p className="contact-hero-subtitle">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h2 className="info-title">Contact Information</h2>
                        <p className="info-description">
                            Have a question, feedback, or just want to say hello? We're here to help!
                        </p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="method-icon">📧</div>
                                <div className="method-content">
                                    <h3 className="method-title">Email Us</h3>
                                    <p className="method-text">support@gethereat.com</p>
                                    <p className="method-note">We typically respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">💬</div>
                                <div className="method-content">
                                    <h3 className="method-title">Live Chat</h3>
                                    <p className="method-text">Available Mon-Fri, 9am-5pm EST</p>
                                    <p className="method-note">Get instant help from our support team</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">🐦</div>
                                <div className="method-content">
                                    <h3 className="method-title">Social Media</h3>
                                    <p className="method-text">@GetherEat</p>
                                    <p className="method-note">Follow us for updates and news</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">📍</div>
                                <div className="method-content">
                                    <h3 className="method-title">Office</h3>
                                    <p className="method-text">123 Food Street</p>
                                    <p className="method-note">San Francisco, CA 94102</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Quick Links */}
                        <div className="faq-section">
                            <h3 className="faq-title">Quick Help</h3>
                            <ul className="faq-list">
                                <li>📖 How to create a poll?</li>
                                <li>🎰 How does the spin wheel work?</li>
                                <li>👤 How to manage my account?</li>
                                <li>🔒 Privacy and data security</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2 className="form-title">Send Us a Message</h2>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    Subject <span className="required">*</span>
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="feedback">Feedback & Suggestions</option>
                                    <option value="partnership">Partnership Opportunities</option>
                                    <option value="bug">Report a Bug</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message <span className="required">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Tell us how we can help you..."
                                    rows={6}
                                    required
                                />
                            </div>

                            <button type="submit" className="form-submit" disabled={submitted}>
                                {submitted ? (
                                    <>
                                        <span className="submit-icon">✓</span>
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <span className="submit-icon">📤</span>
                                        Send Message
                                    </>
                                )}
                            </button>

                            {submitted && (
                                <div className="success-message">
                                    Thank you for reaching out! We'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Additional Help Section */}
                <section className="help-section">
                    <div className="help-content">
                        <h2 className="help-title">Looking for Something Specific?</h2>
                        <div className="help-cards">
                            <div className="help-card">
                                <div className="help-icon">🏢</div>
                                <h3>Restaurant Owners</h3>
                                <p>Want to add your restaurant to GetherEat?</p>
                                <a href="mailto:business@gethereat.com" className="help-link">
                                    Contact Business Team →
                                </a>
                            </div>
                            <div className="help-card">
                                <div className="help-icon">🤝</div>
                                <h3>Partnerships</h3>
                                <p>Interested in partnering with us?</p>
                                <a href="mailto:partnerships@gethereat.com" className="help-link">
                                    Partnership Inquiries →
                                </a>
                            </div>
                            <div className="help-card">
                                <div className="help-icon">📰</div>
                                <h3>Press & Media</h3>
                                <p>Media inquiries and press information</p>
                                <a href="mailto:press@gethereat.com" className="help-link">
                                    Press Contact →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ContactPage;