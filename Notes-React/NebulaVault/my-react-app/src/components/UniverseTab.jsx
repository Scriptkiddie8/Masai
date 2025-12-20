import React, { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
const universeTab = ({ universe, freeze }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [activity, setActivity] = useState(false);

  const scrollRef = useRef(0);
  const bufferRef = useRef([]);
  const pendingWriteRef = useRef([]);

  useEffect(() => {
    const saved = localStorage.getItem(`${universe}-tab`);
    if (saved) {
      const { page: savedPage, scroll } = JSON.parse(saved);
      setPage(savedPage || 0);
      scrollRef.current = scroll || 0;
    }
  }, [universe]);

  useEffect(() => {
    localStorage.setItem(
      `${universe}-tab`,
      JSON.stringify({ page, scroll: scrollRef.current })
    );
  }, [page, items]);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const universeRef = ref(db, `universes/${universe}`);
    const unsubscribe = onChildAdded(universeRef, (snapshot) => {
      const newItem = { id: snapshot.key, ...snapshot.val() };
      if (freeze) {
        bufferRef.current.push(newItem);
      } else {
        setItem((prev) => [newItem, ...prev]);
      }

      setActivity(true);
      setTimeout(() => setActivity(false), 1000);
    });

    return () => unsubscribe();
  }, [universe, freeze]);

  useEffect(() => {
    if (!freeze && bufferRef.current.length > 0) {
      setItems((prev) => [...bufferRef.current], ...prev);
      bufferRef.current = [];
    }
  }, [freeze]);

  return (
    <div>
      <h2>{universe.charAt(0).toupperCase() + universe.slice(1)}</h2>
      <ActivityPulse active={activity} />
    </div>
  );
};

export default universeTab;
