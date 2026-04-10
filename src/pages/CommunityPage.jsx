import { useState } from 'react';

function CommunityPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const honeypot = e.target.querySelector('input[name="website"]').value;
    try {
      const res = await fetch('/subscribe.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honeypot }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="community-page page-overlay">
      <div className="section-container">

        <div className="page-hero">
          <h1>Community</h1>
          <p className="lead-text">
            You are not alone. Connect with other families navigating SCN2A, share what
            works, and find strength in a community that truly understands.
          </p>
        </div>

        <section>
          <h2>Stay Connected</h2>
          <div className="newsletter-card">
            <p>
              Subscribe to the Little Lanterns newsletter for app updates, SCN2A research
              news, community stories, and practical caregiving tips.
            </p>
            {subscribed ? (
              <div className="success-message">
                <p>Thank you for subscribing. We will be in touch soon.</p>
              </div>
            ) : (
              <>
                <form className="newsletter-form" onSubmit={handleSubscribe} autoComplete="off">
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {error && <p className="error-message">{error}</p>}
              </>
            )}
          </div>
        </section>

        <section>
          <h2>Tips from the Community</h2>
          <p className="section-subtitle">Practical wisdom from families who live this every day.</p>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-header">
                <span className="tip-author">A Little Lanterns Family</span>
                <span className="tip-tag">Sleep</span>
              </div>
              <p>
                &ldquo;We noticed storms cluster when sleep is disrupted. Logging both helped us
                show the pattern to our neurologist, which changed how they approached treatment.&rdquo;
              </p>
            </div>
            <div className="tip-card">
              <div className="tip-header">
                <span className="tip-author">A Little Lanterns Family</span>
                <span className="tip-tag">GI</span>
              </div>
              <p>
                &ldquo;GI issues were always secondary to seizures in our minds until we started
                tracking them together. The correlation was eye-opening.&rdquo;
              </p>
            </div>
            <div className="tip-card">
              <div className="tip-header">
                <span className="tip-author">A Little Lanterns Family</span>
                <span className="tip-tag">School</span>
              </div>
              <p>
                &ldquo;We added our daughter&rsquo;s teacher and aide to the app. Now we get
                their observations too, not just what happens at home. Game changer.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Community Forum</h2>
          <div className="coming-soon-card">
            <p>
              A full community forum is coming soon. In the meantime, connect with other
              SCN2A families through the SCN2A Alliance and the broader rare disease community.
            </p>
            <div className="external-links">
              <span className="link-placeholder">SCN2A Alliance</span>
              <span className="link-placeholder">Family Connections</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default CommunityPage;
