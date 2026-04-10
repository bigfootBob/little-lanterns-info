import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

function useCollection(collectionName, childId) {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!childId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, collectionName),
      where('childId', '==', childId),
      orderBy('timestamp', 'desc'),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            const d = doc.data();
            return {
              id: doc.id,
              ...d,
              // Normalize Firestore Timestamp → JS Date
              timestamp: d.timestamp?.toDate ? d.timestamp.toDate() : new Date(d.timestamp),
            };
          }),
        );
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Firestore [${collectionName}]:`, err.message);
        setError(err.message);
        setLoading(false);
      },
    );
  }, [collectionName, childId]);

  return { data, loading, error };
}

export function useEpisodes(childId)    { return useCollection('episodes',      childId); }
export function useGILogs(childId)      { return useCollection('gi_logs',       childId); }
export function useHealthNotes(childId) { return useCollection('health_notes',  childId); }

export function useChildren(uid) {
  const [children, setChildren] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!uid) {
      setChildren([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, 'children'),
      where('caregivers', 'array-contains', uid),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        setChildren(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firestore [children]:', err.message);
        setError(err.message);
        setLoading(false);
      },
    );
  }, [uid]);

  return { children, loading, error };
}
