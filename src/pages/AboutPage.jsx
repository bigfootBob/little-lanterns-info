function AboutPage() {
  return (
    <div className="about-page page-overlay">
      <div className="section-container">

        <div className="page-hero">
          <h1>About Little Lanterns</h1>
          <p className="lead-text">
            Built by caregivers, for caregivers. Little Lanterns gives families of children
            with SCN2A a single place to collect, view, and share their most important health data.
          </p>
        </div>

        <section className="about-section">
          <h2>What is SCN2A?</h2>
          <p>
            SCN2A is a rare genetic condition caused by mutations in the <em>SCN2A</em> gene,
            which encodes a sodium channel critical to normal brain function. Children with SCN2A
            often experience a complex combination of challenges that can require around-the-clock
            monitoring and careful data collection.
          </p>
          <ul className="info-list">
            <li>Seizure events (&ldquo;storms&rdquo;) ranging from absence to tonic-clonic</li>
            <li>Autism spectrum characteristics</li>
            <li>Gastrointestinal challenges</li>
            <li>Developmental and intellectual delays</li>
            <li>Sleep disturbances</li>
            <li>Hypotonia and motor difficulties</li>
          </ul>
          <p>
            Families become expert data collectors by necessity &mdash; tracking patterns, triggers,
            and responses to medications over months and years. Little Lanterns gives that work a home.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Storm Log</h3>
              <p>
                Record seizure events with date, time, duration, type, and severity level.
                View trends over weeks and months to share meaningful data with neurologists
                and care teams.
              </p>
            </div>
            <div className="feature-item">
              <h3>GI Tracker</h3>
              <p>
                Monitor gastrointestinal symptoms, bowel patterns, vomiting episodes, and
                dietary correlations &mdash; an often-overlooked but critical piece of SCN2A health.
              </p>
            </div>
            <div className="feature-item">
              <h3>Group Notes</h3>
              <p>
                A shared notebook for your entire care network. Parents, grandparents, teachers,
                and therapists can all contribute observations and updates in one place.
              </p>
            </div>
            <div className="feature-item">
              <h3>Multi-Caregiver Access</h3>
              <p>
                Multiple caregivers can log data for the same child, keeping everyone on the
                same page regardless of who is with the child that day &mdash; at home, school, or therapy.
              </p>
            </div>
            <div className="feature-item">
              <h3>Web Portal</h3>
              <p>
                Review all of your child&rsquo;s data in a full desktop view. The companion
                website gives you a larger screen for reviewing trends, reading notes, and
                preparing for medical appointments.
              </p>
            </div>
            <div className="feature-item">
              <h3>Data Export <em style={{ fontWeight: 400, fontSize: '0.82rem' }}>(coming soon)</em></h3>
              <p>
                Export your logs for medical appointments. Give your doctors real numbers
                instead of trying to recall events from memory.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact</h2>
          <p>
            Have questions, feedback, or want to get involved in building Little Lanterns?
            We&rsquo;d love to hear from you.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input type="text" id="contact-name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input type="email" id="contact-email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" rows={5} placeholder="Your message..." />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
