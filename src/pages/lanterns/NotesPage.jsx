import { useAuth } from '../../contexts/AuthContext';
import { useLanterns } from '../../contexts/LanternsContext';
import { useHealthNotes } from '../../hooks/useFirestoreData';

function NotesPage() {
  const { user }                              = useAuth();
  const { childId }                           = useLanterns();
  const { data: notes, loading, error }       = useHealthNotes(childId);

  if (!childId) return <div className="data-loading">Select a child profile above to view data.</div>;
  if (loading)  return <div className="data-loading"><div className="spinner" />Loading notes&hellip;</div>;
  if (error)    return <div className="data-loading" style={{ color: '#e57373' }}>Error loading data.</div>;

  return (
    <div className="notes-page">
      <div className="data-header">
        <h2>Group Notes</h2>
      </div>

      <p className="data-description">
        A shared journal for your entire care team &mdash; parents, family, educators, and therapists.
      </p>

      {notes.length === 0 ? (
        <div className="chart-empty">No notes yet. Add your first note in the app.</div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <span className="note-author">
                  {note.addedBy === user?.uid ? 'You' : 'Care Team'}
                </span>
                <span className="note-date">
                  {note.timestamp.toLocaleDateString('en-US', {
                    month: 'short',
                    day:   'numeric',
                    year:  'numeric',
                  })}
                  {' · '}
                  {note.timestamp.toLocaleTimeString('en-US', {
                    hour:   '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="note-content">{note.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesPage;
