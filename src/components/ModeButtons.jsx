// src/components/ModeButtons.jsx
function ModeButtons({ mode, onSelectMode }) {
  return (
    <div className="mode-buttons">
      <button
        className={`btn-main ${mode === "nation" ? "active" : ""}`}
        onClick={() => onSelectMode("nation")}
      >
        나라별 추천
      </button>

      <button
        className={`btn-main ${mode === "ingredient" ? "active" : ""}`}
        onClick={() => onSelectMode("ingredient")}
      >
        재료별 추천
      </button>

      <button
        className={`btn-main ${mode === "random" ? "active" : ""}`}
        onClick={() => onSelectMode("random")}
      >
        완전 랜덤
      </button>
    </div>
  );
}

export default ModeButtons;
