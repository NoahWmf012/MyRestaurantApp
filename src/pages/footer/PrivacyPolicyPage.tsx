import './Legal.scss';

function PrivacyPolicyPage() {
    return (
        <div className="legal-page">
            {/* Hero Section */}
            <section className="legal-hero">
                <div className="legal-hero-content">
                    <h1 className="legal-hero-title">Privacy Policy</h1>
                    <p className="legal-hero-subtitle">
                        Your privacy is important to us. Learn how we collect, use, and protect your information.
                    </p>
                    <p className="legal-update">Last Updated: December 2, 2025</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="legal-container">
                {/* Table of Contents */}
                <aside className="legal-sidebar">
                    <div className="sidebar-sticky">
                        <h3 className="sidebar-title">Table of Contents</h3>
                        <nav className="sidebar-nav">
                            <a href="#introduction" className="nav-link">Introduction</a>
                            <a href="#information-we-collect" className="nav-link">Information We Collect</a>
                            <a href="#how-we-use" className="nav-link">How We Use Your Information</a>
                            <a href="#data-sharing" className="nav-link">Data Sharing</a>
                            <a href="#data-security" className="nav-link">Data Security</a>
                            <a href="#your-rights" className="nav-link">Your Rights</a>
                            <a href="#cookies" className="nav-link">Cookies & Tracking</a>
                            <a href="#children" className="nav-link">Children's Privacy</a>
                            <a href="#changes" className="nav-link">Changes to Policy</a>
                            {/* <a href="#contact" className="nav-link">Contact Us</a> */}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="legal-content">
                    {/* Introduction */}
                    <section id="introduction" className="legal-section">
                        <h2 className="section-title">1. Introduction</h2>
                        <p>
                            Welcome to GetherEat ("we," "our," or "us"). We are committed to protecting your personal
                            information and your right to privacy. This Privacy Policy explains how we collect, use,
                            disclose, and safeguard your information when you use our website and mobile application
                            (collectively, the "Service").
                        </p>
                        <p>
                            Please read this Privacy Policy carefully. By using our Service, you agree to the collection
                            and use of information in accordance with this policy. If you do not agree with our policies
                            and practices, please do not use our Service.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section id="information-we-collect" className="legal-section">
                        <h2 className="section-title">2. Information We Collect</h2>

                        <h3 className="subsection-title">2.1 Personal Information</h3>
                        <p>We collect information that you voluntarily provide to us when you:</p>
                        <ul className="legal-list">
                            <li>Register for an account</li>
                            <li>Create or participate in polls</li>
                            <li>Submit reviews or ratings</li>
                            <li>Contact us for support</li>
                            <li>Subscribe to our newsletter</li>
                        </ul>
                        <p>This information may include:</p>
                        <ul className="legal-list">
                            <li>Name and email address</li>
                            <li>Username and password</li>
                            <li>Profile picture</li>
                            <li>Dining preferences and dietary restrictions</li>
                            <li>Location data (with your permission)</li>
                        </ul>

                        <h3 className="subsection-title">2.2 Automatically Collected Information</h3>
                        <p>When you use our Service, we automatically collect certain information, including:</p>
                        <ul className="legal-list">
                            <li>Device information (type, operating system, unique device identifiers)</li>
                            <li>IP address and browser type</li>
                            <li>Usage data (pages viewed, time spent, features used)</li>
                            <li>Location data (if you grant permission)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h3 className="subsection-title">2.3 Information from Third Parties</h3>
                        <p>
                            We may receive information about you from third-party services if you choose to link your
                            account with social media platforms or use single sign-on features.
                        </p>
                    </section>

                    {/* How We Use Information */}
                    <section id="how-we-use" className="legal-section">
                        <h2 className="section-title">3. How We Use Your Information</h2>
                        <p>We use the information we collect for various purposes, including:</p>

                        <div className="purpose-grid">
                            <div className="purpose-card">
                                <div className="purpose-icon">🎯</div>
                                <h4>Service Delivery</h4>
                                <p>To provide, maintain, and improve our Service and personalize your experience</p>
                            </div>
                            <div className="purpose-card">
                                <div className="purpose-icon">💬</div>
                                <h4>Communication</h4>
                                <p>To respond to your inquiries, send notifications, and provide customer support</p>
                            </div>
                            <div className="purpose-card">
                                <div className="purpose-icon">📊</div>
                                <h4>Analytics</h4>
                                <p>To analyze usage patterns and improve our Service functionality</p>
                            </div>
                            <div className="purpose-card">
                                <div className="purpose-icon">🔒</div>
                                <h4>Security</h4>
                                <p>To detect, prevent, and address technical issues and fraudulent activity</p>
                            </div>
                            <div className="purpose-card">
                                <div className="purpose-icon">📧</div>
                                <h4>Marketing</h4>
                                <p>To send promotional materials (with your consent, and you can opt-out anytime)</p>
                            </div>
                            <div className="purpose-card">
                                <div className="purpose-icon">⚖️</div>
                                <h4>Legal Compliance</h4>
                                <p>To comply with legal obligations and enforce our terms of service</p>
                            </div>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section id="data-sharing" className="legal-section">
                        <h2 className="section-title">4. How We Share Your Information</h2>
                        <p>We may share your information in the following situations:</p>

                        <div className="info-box">
                            <h4>🤝 With Other Users</h4>
                            <p>
                                Your username, profile picture, and reviews are visible to other users as part of the
                                Service's social features. You control what information is public through your privacy
                                settings.
                            </p>
                        </div>

                        <div className="info-box">
                            <h4>🔧 Service Providers</h4>
                            <p>
                                We may share your information with third-party vendors who perform services on our behalf,
                                such as hosting, analytics, payment processing, and customer support. These providers are
                                contractually obligated to protect your information.
                            </p>
                        </div>

                        <div className="info-box">
                            <h4>📊 Business Transfers</h4>
                            <p>
                                If we are involved in a merger, acquisition, or sale of assets, your information may be
                                transferred as part of that transaction. We will notify you before your information is
                                transferred and becomes subject to a different privacy policy.
                            </p>
                        </div>

                        <div className="info-box">
                            <h4>⚖️ Legal Requirements</h4>
                            <p>
                                We may disclose your information if required by law, court order, or governmental request,
                                or to protect our rights, property, or safety, or that of our users or the public.
                            </p>
                        </div>

                        <div className="highlight-box">
                            <strong>We do not sell your personal information to third parties.</strong>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section id="data-security" className="legal-section">
                        <h2 className="section-title">5. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your
                            information against unauthorized access, alteration, disclosure, or destruction. These measures
                            include:
                        </p>
                        <ul className="legal-list">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security audits and assessments</li>
                            <li>Access controls and authentication procedures</li>
                            <li>Employee training on data protection</li>
                            <li>Secure data centers with physical security measures</li>
                        </ul>
                        <p>
                            However, no method of transmission over the Internet or electronic storage is 100% secure.
                            While we strive to protect your personal information, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section id="your-rights" className="legal-section">
                        <h2 className="section-title">6. Your Privacy Rights</h2>
                        <p>You have certain rights regarding your personal information:</p>

                        <div className="rights-grid">
                            <div className="right-item">
                                <h4>👁️ Right to Access</h4>
                                <p>You can request a copy of the personal information we hold about you.</p>
                            </div>
                            <div className="right-item">
                                <h4>✏️ Right to Correction</h4>
                                <p>You can update or correct inaccurate information through your account settings.</p>
                            </div>
                            <div className="right-item">
                                <h4>🗑️ Right to Deletion</h4>
                                <p>You can request deletion of your personal information, subject to certain exceptions.</p>
                            </div>
                            <div className="right-item">
                                <h4>📤 Right to Data Portability</h4>
                                <p>You can request a copy of your data in a portable format.</p>
                            </div>
                            <div className="right-item">
                                <h4>🚫 Right to Object</h4>
                                <p>You can object to certain types of data processing, such as marketing communications.</p>
                            </div>
                            <div className="right-item">
                                <h4>⏸️ Right to Restrict Processing</h4>
                                <p>You can request that we limit how we use your information.</p>
                            </div>
                        </div>

                        <p>
                            To exercise these rights, please contact us at <a href="mailto:privacy@gethereat.com">privacy@gethereat.com</a>.
                            We will respond to your request within 30 days.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section id="cookies" className="legal-section">
                        <h2 className="section-title">7. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to collect and track information and improve
                            our Service. You can instruct your browser to refuse all cookies or indicate when a cookie is
                            being sent.
                        </p>

                        <h3 className="subsection-title">Types of Cookies We Use:</h3>
                        <ul className="legal-list">
                            <li><strong>Essential Cookies:</strong> Required for the Service to function properly</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                            <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
                        </ul>

                        <p>
                            You can manage your cookie preferences through your browser settings. Note that disabling
                            certain cookies may affect the functionality of our Service.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section id="children" className="legal-section">
                        <h2 className="section-title">8. Children's Privacy</h2>
                        <p>
                            Our Service is not intended for children under the age of 13. We do not knowingly collect
                            personal information from children under 13. If you are a parent or guardian and believe your
                            child has provided us with personal information, please contact us immediately, and we will
                            take steps to remove such information from our systems.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section id="changes" className="legal-section">
                        <h2 className="section-title">9. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or for
                            legal, operational, or regulatory reasons. We will notify you of any material changes by:
                        </p>
                        <ul className="legal-list">
                            <li>Posting the new Privacy Policy on this page</li>
                            <li>Updating the "Last Updated" date at the top of this policy</li>
                            <li>Sending you an email notification (for significant changes)</li>
                        </ul>
                        <p>
                            We encourage you to review this Privacy Policy periodically. Your continued use of the Service
                            after changes are posted constitutes your acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact */}
                    {/* <section id="contact" className="legal-section">
                        <h2 className="section-title">10. Contact Us</h2>
                        <p>
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                            practices, please contact us:
                        </p>

                        <div className="contact-info-box">
                            <div className="contact-method">
                                <strong>📧 Email:</strong> <a href="mailto:privacy@gethereat.com">privacy@gethereat.com</a>
                            </div>
                            <div className="contact-method">
                                <strong>📍 Address:</strong> GetherEat, 123 Food Street, San Francisco, CA 94102
                            </div>
                            <div className="contact-method">
                                <strong>📞 Phone:</strong> +1 (555) 123-4567
                            </div>
                        </div>

                        <p>
                            We take your privacy seriously and will respond to all inquiries within 30 days.
                        </p>
                    </section> */}

                    {/* Footer Note */}
                    <div className="legal-footer">
                        <p>
                            By using GetherEat, you acknowledge that you have read and understood this Privacy Policy
                            and agree to its terms.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;