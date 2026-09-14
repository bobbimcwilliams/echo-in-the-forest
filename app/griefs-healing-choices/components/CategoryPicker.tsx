import { GRIEF_CATEGORIES, GriefCategory } from '../types';

interface Props {
  onSelect: (category: GriefCategory) => void;
}

export function CategoryPicker({ onSelect }: Props) {
  return (
    <div className="find-group__step">
      <h3 className="find-group__question">You&apos;re not meant to do this alone.</h3>
      <p className="find-group__question-sub">
        There&apos;s something different about talking with people who truly understand
        the kind of loss you&apos;re carrying. Choose what brought you here, and
        we&apos;ll help you find them.
      </p>
      <div className="category-grid">
        {GRIEF_CATEGORIES.map((category) => (
          <button
            key={category}
            className="category-card"
            onClick={() => onSelect(category)}
            type="button"
          >
            <span className="category-card__name">{category.replace('Loss of a ', '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
