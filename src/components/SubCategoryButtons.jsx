// src/components/SubCategoryButtons.jsx
function SubCategoryButtons({ mode, selectedSub, onSelectSub }) {
  // 모드가 nation/ingredient가 아니면 서브 버튼 없음
  if (mode !== "nation" && mode !== "ingredient") {
    return null;
  }

  // 나라별 서브 카테고리
  if (mode === "nation") {
    return (
      <div className="sub-buttons">
        <button
          className={`btn-sub ${selectedSub === "korean" ? "active" : ""}`}
          onClick={() => onSelectSub("korean")}
        >
          한식
        </button>
        <button
          className={`btn-sub ${selectedSub === "chinese" ? "active" : ""}`}
          onClick={() => onSelectSub("chinese")}
        >
          중식
        </button>
        <button
          className={`btn-sub ${selectedSub === "japanese" ? "active" : ""}`}
          onClick={() => onSelectSub("japanese")}
        >
          일식
        </button>
        <button
          className={`btn-sub ${selectedSub === "western" ? "active" : ""}`}
          onClick={() => onSelectSub("western")}
        >
          양식
        </button>
      </div>
    );
  }

  // 재료별 서브 카테고리 (ingredient)
  return (
    <div className="sub-buttons">
      <button
        className={`btn-sub ${selectedSub === "rice" ? "active" : ""}`}
        onClick={() => onSelectSub("rice")}
      >
        밥
      </button>
      <button
        className={`btn-sub ${selectedSub === "noodle" ? "active" : ""}`}
        onClick={() => onSelectSub("noodle")}
      >
        면
      </button>
      <button
        className={`btn-sub ${selectedSub === "tteok" ? "active" : ""}`}
        onClick={() => onSelectSub("tteok")}
      >
        떡
      </button>
      <button
        className={`btn-sub ${selectedSub === "bread" ? "active" : ""}`}
        onClick={() => onSelectSub("bread")}
      >
        빵
      </button>
    </div>
  );
}

export default SubCategoryButtons;
