import { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/Gallery.css";
import GalleryEntry from "./GalleryEntry";
import type { Stratagem } from "../types";

function Gallery() {
  const [stratagems, setStratagems] = useState<Stratagem[]>([]);
  const [selected, setSelected] = useState<Stratagem | null>(null);

  // Fetch stratagems from the database
  useEffect(() => {
    const fetchStratagems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stratagems");
        if (!response.ok) {
          console.error("Failed to fetch stratagems:", response.statusText);
          return;
        }
        const data = await response.json();
        setStratagems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStratagems();
  }, []);

  return (
    <>
      {/* Hide gallery */}
      {!selected && (
        <div className="gallery-container">
          {stratagems.map((stratagem) => (
            <GalleryEntry
              key={stratagem.name}
              stratagem={stratagem}
              onClick={() => setSelected(stratagem)}
            />
          ))}
        </div>
      )}

      {/* Show modal */}
      {selected && (
        <div className="modal-container">
          <h3>{selected.name}</h3>
          <p>Category: {selected.category}</p>
          <p className="arrowbox my-2 px-5">Code: {selected.code.join(" ")}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </>
  );
}

export default Gallery;
