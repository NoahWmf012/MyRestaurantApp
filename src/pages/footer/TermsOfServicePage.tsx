import './Legal.scss';

function TermsOfServicePage() {
    return (
        <div className="legal-page">
            {/* Hero Section */}
            <section className="legal-hero">
                <div className="legal-hero-content">
                    <h1 className="legal-hero-title">Terms of Service</h1>
                    <p className="legal-hero-subtitle">
                        Please read these terms carefully before using GetherEat
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
                            <a href="#agreement" className="nav-link">Agreement to Terms</a>
                            <a href="#eligibility" className="nav-link">Eligibility</a>
                            <a href="#user-accounts" className="nav-link">User Accounts</a>
                            <a href="#acceptable-use" className="nav-link">Acceptable Use</a>
                            <a href="#content" className="nav-link">User Content</a>
                            <a href="#intellectual-property" className="nav-link">Intellectual Property</a>
                            <a href="#disclaimers" className="nav-link">Disclaimers</a>
                            <a href="#limitation" className="nav-link">Limitation of Liability</a>
                            <a href="#termination" className="nav-link">Termination</a>
                            <a href="#governing-law" className="nav-link">Governing Law</a>
                            <a href="#changes" className="nav-link">Changes to Terms</a>
                            {/* <a href="#contact" className="nav-link">Contact Us</a> */}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="legal-content">
                    {/* Agreement to Terms */}
                    <section id="agreement" className="legal-section">
                        <h2 className="section-title">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service ("Terms") constitute a legally binding agreement between you and
                            GetherEat ("Company," "we," "us," or "our") concerning your access to and use of the
                            GetherEat website and mobile application (collectively, the "Service").
                        </p>
                        <p>
                            By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.
                            If you do not agree to these Terms, you must not access or use the Service.
                        </p>
                        <div className="highlight-box">
                            <strong>⚠️ Important:</strong> These Terms contain an arbitration clause and class action waiver
                            that affect your legal rights. Please read them carefully.
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section id="eligibility" className="legal-section">
                        <h2 className="section-title">2. Eligibility</h2>
                        <p>To use our Service, you must:</p>
                        <ul className="legal-list">
                            <li>Be at least 13 years of age (or the age of majority in your jurisdiction)</li>
                            <li>Have the legal capacity to enter into these Terms</li>
                            <li>Not be prohibited from using the Service under applicable law</li>
                            <li>Provide accurate and complete registration information</li>
                        </ul>
                        <p>
                            If you are under 18, you represent that you have your parent's or legal guardian's permission
                            to use the Service. We reserve the right to request proof of age at any time.
                        </p>
                    </section>

                    {/* User Accounts */}
                    <section id="user-accounts" className="legal-section">
                        <h2 className="section-title">3. User Accounts</h2>

                        <h3 className="subsection-title">3.1 Account Creation</h3>
                        <p>To access certain features, you must create an account. When creating an account, you agree to:</p>
                        <ul className="legal-list">
                            <li>Provide accurate, current, and complete information</li>
                            <li>Maintain and promptly update your account information</li>
                            <li>Maintain the security of your password and account</li>
                            <li>Accept responsibility for all activities under your account</li>
                            <li>Notify us immediately of any unauthorized use</li>
                        </ul>

                        <h3 className="subsection-title">3.2 Account Security</h3>
                        <p>
                            You are responsible for maintaining the confidentiality of your login credentials. We are not
                            liable for any loss or damage arising from your failure to protect your account information.
                        </p>

                        <div className="info-box">
                            <h4>🔒 Security Best Practices</h4>
                            <ul>
                                <li>Use a strong, unique password</li>
                                <li>Enable two-factor authentication if available</li>
                                <li>Never share your password with others</li>
                                <li>Log out from shared devices</li>
                            </ul>
                        </div>
                    </section>

                    {/* Acceptable Use */}
                    <section id="acceptable-use" className="legal-section">
                        <h2 className="section-title">4. Acceptable Use Policy</h2>
                        <p>You agree NOT to use the Service to:</p>

                        <div className="prohibited-grid">
                            <div className="prohibited-item">
                                <span className="prohibited-icon">🚫</span>
                                <h4>Illegal Activities</h4>
                                <p>Violate any laws, regulations, or third-party rights</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">😤</span>
                                <h4>Harassment</h4>
                                <p>Harass, abuse, or harm other users</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">🎭</span>
                                <h4>Impersonation</h4>
                                <p>Impersonate any person or entity</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">📧</span>
                                <h4>Spam</h4>
                                <p>Send unsolicited messages or advertisements</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">🦠</span>
                                <h4>Malicious Code</h4>
                                <p>Upload viruses or malicious software</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">🤖</span>
                                <h4>Automation</h4>
                                <p>Use automated systems without permission</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">💔</span>
                                <h4>Interference</h4>
                                <p>Interfere with the Service's operation</p>
                            </div>
                            <div className="prohibited-item">
                                <span className="prohibited-icon">🔓</span>
                                <h4>Unauthorized Access</h4>
                                <p>Attempt to breach security measures</p>
                            </div>
                        </div>

                        <p>
                            Violation of this Acceptable Use Policy may result in suspension or termination of your account,
                            and we may report illegal activities to law enforcement.
                        </p>
                    </section>

                    {/* User Content */}
                    <section id="content" className="legal-section">
                        <h2 className="section-title">5. User Content</h2>

                        <h3 className="subsection-title">5.1 Your Content</h3>
                        <p>
                            You retain ownership of any content you submit, post, or display on the Service ("User Content"),
                            including reviews, ratings, comments, photos, and poll responses.
                        </p>

                        <h3 className="subsection-title">5.2 License Grant</h3>
                        <p>
                            By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, transferable
                            license to use, reproduce, distribute, prepare derivative works of, display, and perform your
                            User Content in connection with the Service.
                        </p>

                        <h3 className="subsection-title">5.3 Content Standards</h3>
                        <p>Your User Content must:</p>
                        <ul className="legal-list">
                            <li>Be accurate and not misleading</li>
                            <li>Not violate any third-party rights</li>
                            <li>Not contain offensive, defamatory, or inappropriate material</li>
                            <li>Comply with all applicable laws</li>
                            <li>Not contain false or fake reviews</li>
                        </ul>

                        <div className="info-box">
                            <h4>✍️ Review Guidelines</h4>
                            <p>
                                Reviews should be based on genuine experiences. We prohibit fake reviews, reviews in exchange
                                for compensation, and reviews posted by restaurant owners about their own establishments.
                            </p>
                        </div>

                        <h3 className="subsection-title">5.4 Content Monitoring</h3>
                        <p>
                            We reserve the right (but have no obligation) to monitor, review, and remove User Content that
                            violates these Terms or is otherwise objectionable.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section id="intellectual-property" className="legal-section">
                        <h2 className="section-title">6. Intellectual Property Rights</h2>

                        <h3 className="subsection-title">6.1 Our Property</h3>
                        <p>
                            The Service and its entire contents, features, and functionality (including but not limited to
                            all information, software, text, displays, images, video, and audio, and the design, selection,
                            and arrangement thereof) are owned by GetherEat and are protected by copyright, trademark, and
                            other intellectual property laws.
                        </p>

                        <h3 className="subsection-title">6.2 Trademarks</h3>
                        <p>
                            The GetherEat name, logo, and all related names, logos, product and service names, designs, and
                            slogans are trademarks of GetherEat. You must not use such marks without our prior written
                            permission.
                        </p>

                        <h3 className="subsection-title">6.3 Restrictions</h3>
                        <p>You may not:</p>
                        <ul className="legal-list">
                            <li>Reproduce, distribute, or create derivative works from the Service</li>
                            <li>Reverse engineer or attempt to extract source code</li>
                            <li>Remove or modify any proprietary notices</li>
                            <li>Use the Service for any commercial purpose without permission</li>
                        </ul>
                    </section>

                    {/* Disclaimers */}
                    <section id="disclaimers" className="legal-section">
                        <h2 className="section-title">7. Disclaimers</h2>

                        <div className="warning-box">
                            <h4>⚠️ IMPORTANT LEGAL NOTICE</h4>
                            <p>
                                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                                PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                            </p>
                        </div>

                        <p>We do not warrant that:</p>
                        <ul className="legal-list">
                            <li>The Service will be uninterrupted, secure, or error-free</li>
                            <li>The results obtained from the Service will be accurate or reliable</li>
                            <li>The quality of any products, services, or information obtained through the Service will meet your expectations</li>
                            <li>Any errors in the Service will be corrected</li>
                        </ul>

                        <h3 className="subsection-title">Restaurant Information</h3>
                        <p>
                            We provide restaurant information, reviews, and ratings for informational purposes only. We do
                            not guarantee the accuracy, completeness, or reliability of any content. Restaurant hours,
                            menus, and other details may change without notice.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section id="limitation" className="legal-section">
                        <h2 className="section-title">8. Limitation of Liability</h2>

                        <div className="warning-box">
                            <p>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL GETHEREAT, ITS AFFILIATES,
                                DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                                DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                                RESULTING FROM:
                            </p>
                            <ul>
                                <li>Your access to or use of (or inability to access or use) the Service</li>
                                <li>Any conduct or content of any third party on the Service</li>
                                <li>Any content obtained from the Service</li>
                                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                            </ul>
                        </div>

                        <p>
                            Some jurisdictions do not allow the exclusion or limitation of certain damages, so some or all
                            of the above exclusions may not apply to you.
                        </p>
                    </section>

                    {/* Termination */}
                    <section id="termination" className="legal-section">
                        <h2 className="section-title">9. Termination</h2>

                        <h3 className="subsection-title">9.1 By You</h3>
                        <p>
                            You may terminate your account at any time by contacting us or using the account deletion feature
                            in your settings.
                        </p>

                        <h3 className="subsection-title">9.2 By Us</h3>
                        <p>
                            We may suspend or terminate your account and access to the Service immediately, without prior
                            notice or liability, for any reason, including if you breach these Terms.
                        </p>

                        <h3 className="subsection-title">9.3 Effect of Termination</h3>
                        <p>
                            Upon termination, your right to use the Service will immediately cease. All provisions of these
                            Terms that by their nature should survive termination shall survive, including ownership
                            provisions, warranty disclaimers, and limitations of liability.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section id="governing-law" className="legal-section">
                        <h2 className="section-title">10. Governing Law and Dispute Resolution</h2>

                        <h3 className="subsection-title">10.1 Governing Law</h3>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the State of
                            California, without regard to its conflict of law provisions.
                        </p>

                        <h3 className="subsection-title">10.2 Dispute Resolution</h3>
                        <p>
                            Any disputes arising out of or relating to these Terms or the Service shall be resolved through
                            binding arbitration in accordance with the American Arbitration Association's rules, except that
                            either party may seek injunctive or other equitable relief in a court of competent jurisdiction.
                        </p>

                        <h3 className="subsection-title">10.3 Class Action Waiver</h3>
                        <div className="warning-box">
                            <p>
                                YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL
                                BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Terms */}
                    <section id="changes" className="legal-section">
                        <h2 className="section-title">11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time at our sole discretion. If a
                            revision is material, we will provide at least 30 days' notice prior to any new terms taking
                            effect.
                        </p>
                        <p>
                            By continuing to access or use our Service after revisions become effective, you agree to be
                            bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.
                        </p>
                    </section>

                    {/* Miscellaneous */}
                    <section className="legal-section">
                        <h2 className="section-title">12. Miscellaneous</h2>

                        <h3 className="subsection-title">12.1 Entire Agreement</h3>
                        <p>
                            These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                            GetherEat regarding the Service.
                        </p>

                        <h3 className="subsection-title">12.2 Severability</h3>
                        <p>
                            If any provision of these Terms is found to be unenforceable or invalid, that provision will be
                            limited or eliminated to the minimum extent necessary, and the remaining provisions will remain
                            in full force and effect.
                        </p>

                        <h3 className="subsection-title">12.3 Waiver</h3>
                        <p>
                            No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term
                            or any other term.
                        </p>

                        <h3 className="subsection-title">12.4 Assignment</h3>
                        <p>
                            You may not assign or transfer these Terms or your rights hereunder without our prior written
                            consent. We may assign these Terms without restriction.
                        </p>
                    </section>

                    {/* Contact */}
                    {/* <section id="contact" className="legal-section">
                        <h2 className="section-title">13. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us:
                        </p>

                        <div className="contact-info-box">
                            <div className="contact-method">
                                <strong>📧 Email:</strong> <a href="mailto:legal@gethereat.com">legal@gethereat.com</a>
                            </div>
                            <div className="contact-method">
                                <strong>📍 Address:</strong> GetherEat, 123 Food Street, San Francisco, CA 94102
                            </div>
                            <div className="contact-method">
                                <strong>📞 Phone:</strong> +1 (555) 123-4567
                            </div>
                        </div>
                    </section> */}

                    {/* Footer Note */}
                    <div className="legal-footer">
                        <p>
                            By using GetherEat, you acknowledge that you have read, understood, and agree to be bound by
                            these Terms of Service.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TermsOfServicePage;