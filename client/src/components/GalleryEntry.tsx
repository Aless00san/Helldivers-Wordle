import "../styles/Gallery.css";
import type { Stratagem } from "../types";

type Props = {
  stratagem: Stratagem;
  onClick: () => void;
};

function GalleryEntry({ stratagem, onClick }: Props) {
  const stratagemName = stratagem.name;
  return (
    <div
      className="stratagem-box"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img
        className="stratagem-icon"
        src={`/stratagems/${stratagemName}.svg`}
        alt={stratagemName}
      />
    </div>
  );
}

export default GalleryEntry;
