import { useMemo, useState } from "react";
import { apiUrl } from "../lib/api.js";
import ThemeToggleButton from "../components/ThemeToggleButton.jsx";

const logoMark = "https://www.figma.com/api/mcp/asset/7afe63f8-4a34-4b4f-80b8-acdd6f98b132";
const projectImages = [
  "https://www.figma.com/api/mcp/asset/82c0d7bb-8959-4f5b-ab64-42ae3f89e756",
  "https://www.figma.com/api/mcp/asset/1f879047-452b-4616-aacc-a741e28edb15",
  "https://www.figma.com/api/mcp/asset/cc97764c-b518-4f79-9963-8a31f85273ee"
];
const faqIllustration = "https://www.figma.com/api/mcp/asset/bf33f9e6-bf64-4ae4-a4cb-f89727bab20d";

const navItems = [
  { href: "#features", label: "Products" },
  { href: "#features", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Resources" },
  { href: "#contact", label: "About" }
];

const pressNames = ["The Washington Post", "RUDAW", "Bloomberg", "WIRED", "Forbes"];

const featureCards = [
  {
    title: "Design Boards",
    body: "Build silhouette concepts, fabric boards, and references in one visual workspace."
  },
  {
    title: "Pattern Toolkit",
    body: "Reuse sleeve and collar blocks with clean naming and fast export to production teams."
  },
  {
    title: "Studio Reviews",
    body: "Collect feedback from classmates, mentors, and clients in one approval timeline."
  }
];

const pricingPlans = [
  {
    name: "Novice",
    tag: "Most popular plan for aspiring designers",
    monthly: 10,
    cta: "Start designing",
    features: [
      "Access to basic design tools",
      "Up to 10 design saves",
      "Community chat support",
      "Automated measurements",
      "Design version history"
    ]
  },
  {
    name: "Designer",
    tag: "Advanced features for designers",
    monthly: 20,
    cta: "Start designing",
    features: [
      "Access to basic design tools",
      "Up to 10 design saves",
      "Community chat support",
      "Automated measurements",
      "Design version history"
    ]
  }
];

const faqItems = [
  {
    question: "Is there a free trial available?",
    answer: "Yes. You can test Neergz for 7 days with all core workspace tools included."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes. You can switch plans anytime from account settings without losing projects."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancel anytime. Annual plans are prorated to match the months already used."
  },
  {
    question: "Can extra billing details be added?",
    answer: "Yes. Team accounts can add company fields for accounting and invoice workflows."
  }
];

const testimonials = [
  {
    text: "Neergz gave our fashion class one professional workflow from sketch to feedback.",
    name: "Vane",
    role: "Fashion Designer"
  },
  {
    text: "We start projects faster and deliver better reviews with clients using shared boards.",
    name: "Jaza",
    role: "Pattern Designer"
  },
  {
    text: "It is organized, efficient, and keeps our team moving forward every week.",
    name: "Phoenix",
    role: "Fashion Designer"
  }
];

const footerColumns = [
  {
    title: "Product",
    links: ["Overview", "Features", "Solutions", "Tutorials", "Pricing"]
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "News", "Contact"]
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Events", "Help Center"]
  },
  {
    title: "Use cases",
    links: ["Designers", "Brands", "Students", "Universities"]
  },
  {
    title: "Social",
    links: ["Instagram", "LinkedIn", "Facebook", "GitHub"]
  }
];

function formatPrice(monthly, annual) {
  if (annual) {
    const annualPrice = monthly * 10;
    return `$${annualPrice}`;
  }
  return `$${monthly}`;
}

export default function Landing() {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const stageCards = useMemo(
    () => [
      { title: "Capelet coat", image: projectImages[0] },
      { title: "Hoodie", image: projectImages[1] },
      { title: "Peplum blouse", image: projectImages[2] }
    ],
    []
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", text: "Sending..." });

    try {
      const response = await fetch(apiUrl("/api/inquiries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus({ type: "success", text: "Thanks. We will reply within 48 hours." });
      setForm({ name: "", email: "", projectType: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="ngz-page">
      <header className="ngz-header">
        <a href="#top" className="ngz-brand" aria-label="Neergz home">
          <img src={logoMark} alt="Neergz" />
          <span>neergz</span>
        </a>

        <nav className="ngz-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={`${item.label}-${item.href}`} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ngz-header-actions">
          <ThemeToggleButton className="ngz-theme-toggle" />
          <a className="ngz-btn ngz-btn-outline" href="/admin/login">
            Log in
          </a>
        </div>
      </header>

      <main>
        <section id="top" className="ngz-section ngz-hero">
          <div className="ngz-hero-inner">
            <div className="ngz-badge-row">
              <span className="ngz-pill">New feature</span>
              <a href="/admin" className="ngz-inline-link">
                Check out the team dashboard
              </a>
            </div>

            <h1>Your Playground for Ultimate Fashion Innovation</h1>
            <p>
              Collaborate, iterate, and launch fashion collections for students, studios, and global teams on one professional platform.
            </p>

            <div className="ngz-hero-actions">
              <a href="#contact" className="ngz-btn ngz-btn-outline">Demo</a>
              <a href="#pricing" className="ngz-btn">Sign up</a>
            </div>

            <div className="ngz-stage" aria-label="Neergz workspace preview">
              <aside className="ngz-stage-sidebar" aria-hidden="true">
                <span className="ngz-side-dot active" />
                <span className="ngz-side-dot" />
                <span className="ngz-side-dot" />
                <span className="ngz-side-dot" />
              </aside>

              <div className="ngz-stage-main">
                <div className="ngz-stage-head">
                  <div>
                    <h3>Welcome Back, Sakar</h3>
                    <p>Design today, inspire others</p>
                  </div>
                  <button type="button" className="ngz-chip">New Project</button>
                </div>

                <div className="ngz-stage-grid">
                  {stageCards.map((card) => (
                    <article key={card.title} className="ngz-stage-card">
                      <header>
                        <span>{card.title}</span>
                        <span aria-hidden="true">↗</span>
                      </header>
                      <img src={card.image} alt={card.title} />
                    </article>
                  ))}
                </div>

                <div className="ngz-stage-banner">Best fashion designing tool for students and studios.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="ngz-section-sm ngz-press" aria-label="Press mentions">
          <p>We have been mentioned in the press</p>
          <ul>
            {pressNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        <section id="features" className="ngz-section ngz-features">
          <div className="ngz-split-head">
            <div>
              <span className="ngz-pill">Features</span>
              <h2>Cutting-edge features for advanced designing</h2>
            </div>
            <div>
              <p>
                Build and scale your creative pipeline with clear tooling for sketching, team critique, and launch preparation.
              </p>
              <div className="ngz-inline-actions">
                <a href="#faq" className="ngz-btn ngz-btn-outline">Features</a>
                <a href="#contact" className="ngz-btn">Get Started</a>
              </div>
            </div>
          </div>

          <div className="ngz-feature-grid">
            {featureCards.map((item) => (
              <article key={item.title} className="ngz-feature-card">
                <span className="ngz-feature-icon" aria-hidden="true">◉</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="ngz-section ngz-pricing">
          <div className="ngz-split-head">
            <div>
              <span className="ngz-pill">Pricing</span>
              <h2>Unleash your design potential with powerful features</h2>
            </div>
            <div>
              <p>Join thousands of designers bringing ideas to life with a platform built for execution.</p>
              <div className="ngz-billing-switch" role="tablist" aria-label="Billing period">
                <button
                  type="button"
                  role="tab"
                  className={!annualBilling ? "active" : ""}
                  onClick={() => setAnnualBilling(false)}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  role="tab"
                  className={annualBilling ? "active" : ""}
                  onClick={() => setAnnualBilling(true)}
                >
                  Annual
                </button>
              </div>
            </div>
          </div>

          <div className="ngz-pricing-grid">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className="ngz-price-card">
                <header>
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.tag}</p>
                  </div>
                  <div className="ngz-price-value">
                    <strong>{formatPrice(plan.monthly, annualBilling)}</strong>
                    <span>per month</span>
                  </div>
                </header>

                <ul>
                  {plan.features.map((feature) => (
                    <li key={`${plan.name}-${feature}`}>{feature}</li>
                  ))}
                </ul>

                <a href="#contact" className="ngz-btn ngz-btn-block">{plan.cta}</a>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="ngz-section ngz-faq">
          <div className="ngz-split-head">
            <div>
              <span className="ngz-pill">FAQ</span>
              <h2>Frequently Asked Questions about our platform</h2>
            </div>
            <div>
              <p>Get clear answers about setup, pricing, and how Neergz supports fashion teams and students.</p>
              <div className="ngz-inline-actions">
                <a href="#contact" className="ngz-btn ngz-btn-outline">Contact</a>
                <a href="#pricing" className="ngz-btn">Get Started</a>
              </div>
            </div>
          </div>

          <div className="ngz-faq-layout">
            <div className="ngz-faq-list">
              {faqItems.map((item) => (
                <article key={item.question} className="ngz-faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
            <div className="ngz-faq-art">
              <img src={faqIllustration} alt="Fashion sketch illustration" />
            </div>
          </div>
        </section>

        <section id="contact" className="ngz-section ngz-contact">
          <div className="ngz-contact-info">
            <span className="ngz-pill">Contact us</span>
            <h2>Our team would love to hear from you</h2>
            <p>Tell us what you are building. We support students, companies, and fashion professionals.</p>

            <div className="ngz-contact-block">
              <h3>Email</h3>
              <p>hi@neergz.com</p>
            </div>
            <div className="ngz-contact-block">
              <h3>Office</h3>
              <p>Dubai World Trade Center, Building 4, Level 3</p>
            </div>
            <div className="ngz-contact-block">
              <h3>Phone</h3>
              <p>+964 (770) 200-2002</p>
            </div>
          </div>

          <form className="ngz-contact-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="text"
              name="projectType"
              placeholder="Project type (student, studio, brand)"
              value={form.projectType}
              onChange={onChange}
              required
            />
            <textarea
              rows="4"
              name="message"
              placeholder="Tell us your goals"
              value={form.message}
              onChange={onChange}
              required
            />
            <button className="ngz-btn ngz-btn-block" type="submit" disabled={status.type === "loading"}>
              {status.type === "loading" ? "Sending..." : "Send message"}
            </button>
            {status.text && <span className={`form-status ${status.type}`}>{status.text}</span>}

            <div className="ngz-map-frame" aria-hidden="true">
              <div className="ngz-map-grid" />
              <span>Melbourne</span>
            </div>
          </form>
        </section>

        <section className="ngz-section-sm ngz-testimonials" aria-label="Testimonials">
          {testimonials.map((item) => (
            <article key={item.name} className="ngz-quote-card">
              <p>{item.text}</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="ngz-footer">
        <div className="ngz-footer-brand">
          <a href="#top" className="ngz-brand" aria-label="Neergz home">
            <img src={logoMark} alt="Neergz" />
            <span>neergz</span>
          </a>
          <p>Your fashion workspace from concept to production.</p>
        </div>

        <div className="ngz-footer-links">
          {footerColumns.map((column) => (
            <section key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link}`}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </footer>
    </div>
  );
}
