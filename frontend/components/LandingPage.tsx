"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const WalletButton = dynamic(() => import("./WalletButton"), { ssr: false });

const features = [
  {
    icon: "fa-chart-bar",
    title: "Savage Analytics",
    desc: "Brutal charts that show you exactly where your money went. No sugar-coating, just raw data that hits different."
  },
  {
    icon: "fa-link",
    title: "Multi-Chain Beast",
    desc: "Track everything from Bitcoin to obscure altcoins. One dashboard to rule them all."
  },
  {
    icon: "fa-shield-alt",
    title: "Fort Knox Security",
    desc: "Your keys, your crypto. We don't touch your funds, we just make them look pretty."
  },
  {
    icon: "fa-bolt",
    title: "Lightning Fast",
    desc: "Real-time updates faster than your portfolio crashes. No lag, no BS, just pure speed."
  },
  {
    icon: "fa-mobile-alt",
    title: "Mobile Domination",
    desc: "Check your gains (or losses) anywhere. Responsive design that works on everything."
  },
  {
    icon: "fa-bell",
    title: "Smart Alerts",
    desc: "Get notified when your portfolio moves. Perfect for FOMO and panic selling."
  }
];

const chains = [
  { icon: "₿", name: "Bitcoin" },
  { icon: "Ξ", name: "Ethereum" },
  { icon: "◎", name: "Solana" },
  { icon: "⬟", name: "Polygon" },
  { icon: "▲", name: "Arbitrum" },
  { icon: "~", name: "Sui" }
];

const featuresList = [
  "Unlimited wallet tracking",
  "Real-time price feeds",
  "Advanced portfolio analytics",
  "Multi-chain support",
  "Mobile app access",
  "Smart notifications",
  "Export capabilities"
];

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Support", href: "#" },
  { label: "API", href: "#" },
  { label: "Status", href: "#" }
];

const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Animate in elements on scroll (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.animate-in').forEach(el => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Modal close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (showModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    }
    if (showModal) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showModal]);

  function handleSubscribe() {
    if (email) {
      alert("🔥 You're on the list! We'll hit you up when it's ready.");
      setShowModal(false);
      setEmail("");
    } else {
      alert("Drop your email first!");
    }
  }

  return (
    <>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <a href="#" className="logo">
              <div className="logo-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span className="logo-text">Lumina</span>
            </a>
            <div className="nav-buttons hidden md:flex" style={{ gap: '16px', justifyContent: 'flex-end' }}>
              <a
                href="https://github.com/yashvikram30/Lumina"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-card"
                style={{
                  background: '#FFD700',
                  padding: '0.5rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  color: '#000',
                  boxShadow: '6px 6px 0 #000',
                  borderRadius: '12px',
                  border: '4px solid #000',
                  gap: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                <i className="fas fa-star" style={{ fontSize: '1.2rem', color: '#000' }}></i>
                Star on GitHub
              </a>
              <div className="brutal-card" style={{ background: '#6C3DF4', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', boxShadow: '6px 6px 0 #000', borderRadius: '12px', border: '4px solid #000' }}>
                <WalletButton />
              </div>
            </div>
          </nav>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="hero-badge animate-in">
            <i className="fas fa-fire"></i> 6+ Blockchains Supported
          </div>
          <h1 className="hero-title animate-in">
            Track Your Crypto<br />Like a Boss
          </h1>
          <p className="hero-subtitle animate-in">
            The most powerful, beautiful, and brutally honest portfolio tracker. <br />See all your crypto assets in one place with zero BS.
          </p>
          <div className="cta-container animate-in" style={{ gap: '32px' }}>
            <a
              href="https://github.com/yashvikram30/Lumina"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-card"
              style={{
                background: '#FFD700',
                padding: '0.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                textDecoration: 'none',
                color: '#000',
                boxShadow: '6px 6px 0 #000',
                borderRadius: '12px',
                border: '4px solid #000',
                gap: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              <i className="fas fa-star" style={{ fontSize: '1.2rem', color: '#000' }}></i>
              Star on GitHub
            </a>
            <div className="brutal-card" style={{ background: '#6C3DF4', padding: '0.5rem 2rem', display: 'flex', alignItems: 'center', boxShadow: '6px 6px 0 #000', borderRadius: '12px', border: '4px solid #000' }}>
              <WalletButton />
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card animate-in">
              <span className="stat-number">200K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-card animate-in">
              <span className="stat-number">$6.9B</span>
              <span className="stat-label">Assets Tracked</span>
            </div>
            <div className="stat-card animate-in">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="container">
          <h2 className="section-title animate-in">Brutal Features</h2>
          <p className="section-subtitle animate-in">
            Everything you need to dominate your crypto portfolio game
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card animate-in" key={f.title}>
                <div className="feature-icon">
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="chains">
        <div className="container">
          <h2 className="section-title animate-in">Supported Chains</h2>
          <p className="section-subtitle animate-in">
            We support all the chains that matter (and some that don't)
          </p>
          <div className="chains-grid">
            {chains.map((c) => (
              <div className="chain-card animate-in" key={c.name}>
                <div className="chain-icon">{c.icon}</div>
                <div className="chain-name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pricing">
        <div className="container">
          <div className="pricing-card animate-in">
            <div className="pricing-badge">Limited Time</div>
            <h2 className="pricing-title">Get Started</h2>
            <div className="pricing-amount">$0</div>
            <p className="pricing-desc">
              Completely free. No credit card. No BS. Just connect and track.
            </p>
            <ul className="features-list">
              {featuresList.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <WalletButton />
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span className="footer-logo-text">Lumina</span>
            </div>
            <p>The most brutal portfolio tracker in crypto</p>
          </div>
          <div className="footer-links">
            {footerLinks.map((l) => (
              <a href={l.href} className="footer-link" key={l.label}>{l.label}</a>
            ))}
          </div>
          <div className="footer-content">
            <p>&copy; 2024 Lumina. Built with 🔥 for crypto degens.</p>
          </div>
        </div>
      </footer>
      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="modal-title">Demo Coming Soon!</h3>
            <p className="modal-text">
              We're cooking up something amazing. Get notified when our demo drops!
            </p>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSubscribe}>
              <i className="fas fa-bell"></i> Notify Me
            </button>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Space Grotesk', sans-serif;
            line-height: 1.6;
            color: #000;
            background: #FFE066;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Neobrutalist Card Base */
        .brutal-card {
            background: #fff;
            border: 4px solid #000;
            box-shadow: 8px 8px 0 #000;
            transition: all 0.3s ease;
        }

        .brutal-card:hover {
            box-shadow: 12px 12px 0 #000;
            transform: translate(-4px, -4px);
        }

        /* Button Styles */
        .btn {
            display: inline-block;
            padding: 16px 32px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            border: 4px solid #000;
            box-shadow: 6px 6px 0 #000;
            font-size: 16px;
            position: relative;
        }

        .btn:hover {
            transform: translate(-3px, -3px);
            box-shadow: 9px 9px 0 #000;
        }

        .btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 #000;
        }

        .btn-primary {
            background: #FF6B6B;
            color: #fff;
        }

        .btn-secondary {
            background: #4ECDC4;
            color: #000;
        }

        .btn-accent {
            background: #FFE066;
            color: #000;
        }

        .btn-dark {
            background: #000;
            color: #fff;
        }

        .btn-lg {
            padding: 20px 40px;
            font-size: 18px;
        }

        /* Floating Elements */
        .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .shape {
            position: absolute;
            border: 4px solid #000;
            background: #4ECDC4;
            animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 5%;
            animation-delay: 0s;
            transform: rotate(45deg);
        }

        .shape-2 {
            width: 60px;
            height: 60px;
            top: 30%;
            right: 10%;
            animation-delay: 2s;
            border-radius: 50%;
            background: #FF6B6B;
        }

        .shape-3 {
            width: 100px;
            height: 40px;
            bottom: 20%;
            left: 10%;
            animation-delay: 4s;
            background: #FFE066;
        }

        .shape-4 {
            width: 70px;
            height: 70px;
            bottom: 40%;
            right: 5%;
            animation-delay: 1s;
            transform: rotate(30deg);
            background: #9B59B6;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
        }

        /* Header */
        .header {
            position: sticky;
            top: 0;
            z-index: 100;
            background: #FFE066;
            border-bottom: 4px solid #000;
            padding: 20px 0;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 16px;
            text-decoration: none;
            color: #000;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background: #FF6B6B;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 24px;
            transform: rotate(-10deg);
        }

        .logo-text {
            font-size: 32px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .nav-buttons {
            display: flex;
            gap: 16px;
        }

        /* Hero Section */
        .hero {
            padding: 80px 0;
            position: relative;
            z-index: 1;
            text-align: center;
        }

        .hero-badge {
            display: inline-block;
            background: #4ECDC4;
            color: #000;
            padding: 12px 24px;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 40px;
            transform: rotate(-2deg);
        }

        .hero-title {
            font-size: clamp(40px, 8vw, 80px);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 24px;
            line-height: 1.1;
            color: #000;
        }

        .hero-subtitle {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 48px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            color: #333;
        }

        .cta-container {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-bottom: 80px;
            flex-wrap: wrap;
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-top: 80px;
        }

        .stat-card {
            background: #fff;
            padding: 30px;
            text-align: center;
            border: 4px solid #000;
            box-shadow: 8px 8px 0 #000;
            transform: rotate(1deg);
            transition: all 0.3s ease;
        }

        .stat-card:nth-child(2) {
            transform: rotate(-1deg);
            background: #FF6B6B;
            color: #fff;
        }

        .stat-card:nth-child(3) {
            transform: rotate(2deg);
            background: #4ECDC4;
        }

        .stat-card:hover {
            transform: rotate(0deg) scale(1.05);
            box-shadow: 12px 12px 0 #000;
        }

        .stat-number {
            font-size: 48px;
            font-weight: 700;
            display: block;
            margin-bottom: 8px;
        }

        .stat-label {
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Features Section */
        .features {
            padding: 120px 0;
            background: #4ECDC4;
            border-top: 4px solid #000;
            border-bottom: 4px solid #000;
        }

        .section-title {
            text-align: center;
            font-size: 64px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 24px;
            color: #000;
        }

        .section-subtitle {
            text-align: center;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 80px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            color: #000;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
        }

        .feature-card {
            background: #fff;
            padding: 40px;
            border: 4px solid #000;
            box-shadow: 8px 8px 0 #000;
            transform: rotate(-1deg);
            transition: all 0.3s ease;
        }

        .feature-card:nth-child(2n) {
            transform: rotate(1deg);
        }

        .feature-card:hover {
            transform: rotate(0deg) scale(1.02);
            box-shadow: 12px 12px 0 #000;
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            background: #FF6B6B;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 32px;
            margin-bottom: 24px;
            transform: rotate(-10deg);
        }

        .feature-card:nth-child(2n) .feature-icon {
            background: #FFE066;
            color: #000;
            transform: rotate(10deg);
        }

        .feature-card:nth-child(3n) .feature-icon {
            background: #9B59B6;
            color: #fff;
            transform: rotate(-5deg);
        }

        .feature-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #000;
        }

        .feature-desc {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
        }

        /* Chains Section */
        .chains {
            padding: 120px 0;
            background: #FF6B6B;
            border-bottom: 4px solid #000;
        }

        .chains-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 30px;
            margin-top: 60px;
        }

        .chain-card {
            background: #fff;
            padding: 30px 20px;
            text-align: center;
            border: 4px solid #000;
            box-shadow: 6px 6px 0 #000;
            transition: all 0.3s ease;
            transform: rotate(-2deg);
        }

        .chain-card:nth-child(2n) {
            transform: rotate(2deg);
        }

        .chain-card:hover {
            transform: rotate(0deg) scale(1.1);
            box-shadow: 10px 10px 0 #000;
        }

        .chain-icon {
            width: 60px;
            height: 60px;
            background: #000;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            margin: 0 auto 16px;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
        }

        .chain-name {
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #000;
        }

        /* Pricing Section */
        .pricing {
            padding: 120px 0;
            background: #9B59B6;
            text-align: center;
        }

        .pricing-card {
            max-width: 500px;
            margin: 0 auto;
            background: #fff;
            padding: 60px 40px;
            border: 4px solid #000;
            box-shadow: 12px 12px 0 #000;
            transform: rotate(-1deg);
            position: relative;
        }

        .pricing-badge {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%) rotate(5deg);
            background: #FFE066;
            color: #000;
            padding: 12px 24px;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .pricing-title {
            font-size: 32px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 24px;
            color: #000;
        }

        .pricing-amount {
            font-size: 80px;
            font-weight: 700;
            color: #FF6B6B;
            margin-bottom: 24px;
            line-height: 1;
        }

        .pricing-desc {
            font-size: 18px;
            margin-bottom: 40px;
            color: #333;
        }

        .features-list {
            list-style: none;
            text-align: left;
            margin-bottom: 40px;
        }

        .features-list li {
            padding: 12px 0;
            font-weight: 600;
            position: relative;
            padding-left: 30px;
            color: #000;
        }

        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4ECDC4;
            font-weight: 700;
            font-size: 18px;
        }

        /* Footer */
        .footer {
            background: #000;
            color: #fff;
            padding: 80px 0 40px;
            border-top: 4px solid #000;
        }

        .footer-content {
            text-align: center;
            margin-bottom: 40px;
        }

        .footer-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
        }

        .footer-logo-icon {
            width: 40px;
            height: 40px;
            background: #FFE066;
            border: 4px solid #fff;
            box-shadow: 4px 4px 0 #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-size: 20px;
            transform: rotate(-10deg);
        }

        .footer-logo-text {
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }

        .footer-link {
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: color 0.3s ease;
        }

        .footer-link:hover {
            color: #FFE066;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: #fff;
            padding: 40px;
            border: 4px solid #000;
            box-shadow: 12px 12px 0 #000;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 10px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #000;
            font-weight: 700;
        }

        .modal-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            color: #000;
        }

        .modal-text {
            margin-bottom: 30px;
            color: #333;
        }

        .email-input {
            width: 100%;
            padding: 16px;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            font-size: 16px;
            margin-bottom: 20px;
            background: #fff;
        }

        .email-input:focus {
            outline: none;
            box-shadow: 6px 6px 0 #000;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 48px;
            }
            
            .section-title {
                font-size: 40px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .cta-container {
                flex-direction: column;
                align-items: center;
            }
            
            .hero-stats {
                grid-template-columns: 1fr;
            }
            
            .nav-buttons {
                flex-direction: column;
                gap: 12px;
            }
        }

        /* Animation classes */
        .animate-in {
            opacity: 0;
            transform: translateY(50px);
            animation: slideIn 0.8s ease forwards;
        }

        @keyframes slideIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
      `}</style>
    </>
  );
};

export default LandingPage;