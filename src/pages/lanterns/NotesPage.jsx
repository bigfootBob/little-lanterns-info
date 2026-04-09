const notes = [
  {
    id: 1,
    author: 'Mom',
    date: '2026-04-08',
    content:
      'Sleep has been better this week — 2 nights in a row with no wake-ups. Storms have also been quieter. Keeping the new bedtime routine going.',
    tags: ['sleep', 'storms', 'routine'],
  },
  {
    id: 2,
    author: 'Dad',
    date: '2026-04-06',
    content:
      'School reported two absence seizures during math class. Spoke with Mrs. Rivera about the protocol. She has the rescue med kit and knows what to do.',
    tags: ['school', 'storms', 'absence'],
  },
  {
    id: 3,
    author: 'Grandma',
    date: '2026-04-04',
    content:
      'Wonderful day at the park — happy and engaged for about an hour. No storms. Ate a full lunch (chicken, rice). No GI issues afterward.',
    tags: ['positive', 'diet', 'behavior'],
  },
  {
    id: 4,
    author: 'Mom',
    date: '2026-04-01',
    content:
      'Neuro appointment today. Dr. Kim reviewed the storm log and is pleased with how detailed the data has been. Adjusting evening Depakote dose slightly. Follow-up in 6 weeks.',
    tags: ['neuro', 'medication', 'appointment'],
  },
  {
    id: 5,
    author: 'OT / Therapist',
    date: '2026-03-28',
    content:
      'Session went well. She engaged with the sensory bin for 15 minutes — longest yet! Recommending we add a brushing protocol at home twice daily.',
    tags: ['OT', 'therapy', 'sensory'],
  },
  {
    id: 6,
    author: 'Dad',
    date: '2026-03-25',
    content:
      'GI follow-up call with Dr. Patel. Reviewed the last month of logs. He wants us to track bowel movements daily for 2 weeks and report back.',
    tags: ['GI', 'appointment', 'tracking'],
  },
];

function NotesPage() {
  return (
    <div className="notes-page">
      <div className="data-header">
        <h2>Group Notes</h2>
        <button className="btn btn-primary btn-sm" disabled>+ Add Note</button>
      </div>

      <p className="data-description">
        A shared journal for your entire care team &mdash; parents, family, educators, and
        therapists. Everyone who contributes to your child&rsquo;s care can add observations here.
      </p>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-header">
              <span className="note-author">{note.author}</span>
              <span className="note-date">{note.date}</span>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-tags">
              {note.tags.map((tag) => (
                <span key={tag} className="note-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
