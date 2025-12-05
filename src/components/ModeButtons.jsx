// src/components/ModeButtons.jsx

function ModeButtons({ onSelectMode }) {
  return (
    <div className="mode-buttons">
      <button onClick={() => onSelectMode("nation")}>나라별 추천</button>
      <button onClick={() => onSelectMode("ingredient")}>재료별 추천</button>
      <button onClick={() => onSelectMode("random")}>완전 랜덤</button>
    </div>
  );
}

export default ModeButtons;
