function GetStartedPage() {
  return (
    <div className="get-started-page page-overlay">
      <div className="section-container">

        <div className="page-hero">
          <h1>Get Started</h1>
          <p className="lead-text">
            Little Lanterns is currently in early access. Download the app or join the
            waitlist to start tracking your child&rsquo;s health data today.
          </p>
        </div>

        <section>
          <h2>Download the App</h2>
          <div className="download-cards">
            <div className="download-card">
              <div className="platform-icon platform-ios">iOS</div>
              <h3>iPhone &amp; iPad</h3>
              <p>Requires iOS 16 or later</p>
              <button className="btn btn-primary" disabled>App Store &mdash; Coming Soon</button>
            </div>
            <div className="download-card">
              <div className="platform-icon platform-android">APK</div>
              <h3>Android</h3>
              <p>Requires Android 10 or later</p>
              <button className="btn btn-outline" disabled>Google Play &mdash; Coming Soon</button>
            </div>
          </div>
        </section>

        <section>
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>
                  Set up your account and add your child&rsquo;s profile with their
                  diagnosis details and care team information.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Invite Your Care Team</h3>
                <p>
                  Add co-caregivers &mdash; family members, teachers, or therapists &mdash;
                  so everyone can log events and read updates from the same shared record.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Start Logging</h3>
                <p>
                  Track storms, GI events, and notes as they happen. The app works offline
                  and syncs when a connection is available.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Review on the Web Portal</h3>
                <p>
                  Come here &mdash; to this site &mdash; to view your data in a full desktop
                  layout. See trends, read notes, and prepare for medical appointments with
                  real numbers in hand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Request Early Access</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '24px', fontSize: '0.92rem', lineHeight: 1.6 }}>
            The app is currently in beta. Fill out the form below to join the waitlist
            and be notified when access opens.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="ea-name">Name</label>
              <input type="text" id="ea-name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="ea-email">Email</label>
              <input type="email" id="ea-email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="ea-role">Your Role</label>
              <select id="ea-role" defaultValue="">
                <option value="" disabled>Select your role</option>
                <option value="parent">Parent / Guardian</option>
                <option value="caregiver">Caregiver</option>
                <option value="educator">Educator</option>
                <option value="therapist">Therapist / Clinician</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Join the Waitlist</button>
          </form>
        </section>

      </div>
    </div>
  );
}

export default GetStartedPage;
