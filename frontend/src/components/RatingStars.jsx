// src/components/RatingStars.jsx
import { memo } from "react";

function RatingStars({ value, onRate }) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`star ${value >= n ? "filled" : ""}`}
          onClick={() => onRate(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// memo() prevents re-renders unless props change
export default memo(RatingStars);
