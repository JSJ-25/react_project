// src/components/SubCategoryButtons.jsx

const nationOptions = [
  { key: "korean", label: "한식" },
  { key: "chinese", label: "중식" },
  { key: "japanese", label: "일식" },
  { key: "western", label: "양식" },
];

const ingredientOptions = [
  { key: "rice", label: "밥" },
  { key: "noodle", label: "면" },
  { key: "tteok", label: "떡" },
  { key: "bread", label: "빵" },
];

function SubCategoryButtons({ mode, onSelectSub }) {
  if (mode !== "nation" && mode !== "ingredient") return null;

  const options = mode === "nation" ? nationOptions : ingredientOptions;

  return (
    <div className="sub-buttons">
      {options.map((opt) => (
        <button key={opt.key} onClick={() => onSelectSub(opt.key)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default SubCategoryButtons;
