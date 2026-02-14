import { useTranslation } from "react-i18next";
import './AboutUs.scss';

function AboutUsPage() {
    const { t } = useTranslation();

    return (
        <div className="about-us-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">{t('about')}</h1>
                    <p className="about-hero-subtitle">
                        Bringing people together through great food experiences
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="about-container">
                {/* Mission Section */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-icon">🎯</span>
                        <h2 className="section-title">Our Mission</h2>
                    </div>
                    <div className="section-content">
                        <p>
                            GetherEat was born from a simple idea: deciding where to eat shouldn't be complicated.
                            We believe that discovering great restaurants and making dining decisions should be
                            fun, social, and stress-free.
                        </p>
                        <p>
                            Our mission is to help food lovers discover the best dining experiences in their area,
                            connect with friends over shared meals, and make group dining decisions effortlessly.
                        </p>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-icon">✨</span>
                        <h2 className="section-title">What We Do</h2>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3 className="feature-title">Discover</h3>
                            <p className="feature-description">
                                Browse through curated restaurants, read authentic reviews, and explore
                                menus to find your next favorite spot.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🗳️</div>
                            <h3 className="feature-title">Vote Together</h3>
                            <p className="feature-description">
                                Create polls and let your group vote on where to eat. Democracy has
                                never been more delicious!
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎰</div>
                            <h3 className="feature-title">Spin the Wheel</h3>
                            <p className="feature-description">
                                Can't decide? Let fate choose! Our spin wheel makes indecision fun
                                and exciting.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📍</div>
                            <h3 className="feature-title">Find Nearby</h3>
                            <p className="feature-description">
                                Use our location-based search to discover great restaurants within
                                your preferred distance.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="about-section story-section">
                    <div className="section-header">
                        <span className="section-icon">📖</span>
                        <h2 className="section-title">Our Story</h2>
                    </div>
                    <div className="section-content">
                        <p>
                            GetherEat started when a group of friends spent more time arguing about where
                            to eat than actually eating. We realized there had to be a better way to make
                            dining decisions as a group.
                        </p>
                        <p>
                            What began as a simple voting app has evolved into a comprehensive platform
                            for restaurant discovery, social dining decisions, and food exploration. Today,
                            GetherEat helps thousands of food lovers discover great restaurants and make
                            group dining decisions every day.
                        </p>
                        <p>
                            We're constantly working to improve the platform, add new features, and make
                            the dining decision process even more enjoyable. Because at the end of the day,
                            life's too short to eat at bad restaurants!
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-icon">💎</span>
                        <h2 className="section-title">Our Values</h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <h4>🤝 Community First</h4>
                            <p>We believe in the power of community-driven recommendations and reviews.</p>
                        </div>
                        <div className="value-card">
                            <h4>🎨 Simple & Fun</h4>
                            <p>Great UX shouldn't be complicated. We keep things simple and enjoyable.</p>
                        </div>
                        <div className="value-card">
                            <h4>🔒 Privacy Matters</h4>
                            <p>Your data is yours. We respect your privacy and protect your information.</p>
                        </div>
                        <div className="value-card">
                            <h4>🚀 Continuous Innovation</h4>
                            <p>We're always evolving, adding features, and improving the experience.</p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="about-section stats-section">
                    <div className="section-header">
                        <span className="section-icon">📊</span>
                        <h2 className="section-title">By The Numbers</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">1000+</div>
                            <div className="stat-label">Restaurants</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">5000+</div>
                            <div className="stat-label">Happy Users</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">10k+</div>
                            <div className="stat-label">Votes Cast</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Reviews</div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="about-section">
                    <div className="section-header">
                        <span className="section-icon">👥</span>
                        <h2 className="section-title">Meet The Team</h2>
                    </div>
                    <div className="section-content text-center">
                        <p>
                            GetherEat is built by a passionate team of food lovers, developers, and designers
                            who believe that technology can make dining decisions easier and more enjoyable.
                        </p>
                        <p className="team-note">
                            We're a small but dedicated team working hard to bring you the best restaurant
                            discovery and group dining decision platform. Have feedback? We'd love to hear
                            from you!
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <h2 className="cta-title">Ready to Discover Your Next Favorite Restaurant?</h2>
                    <p className="cta-description">
                        Join thousands of food lovers who use GetherEat to discover great restaurants
                        and make dining decisions together.
                    </p>
                    <div className="cta-buttons">
                        <a href="/" className="cta-button primary">
                            Explore Restaurants
                        </a>
                        <a href="/signup" className="cta-button secondary">
                            Sign Up Free
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AboutUsPage;