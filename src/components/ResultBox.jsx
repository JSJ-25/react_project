// src/components/ResultBox.jsx
import "../styles/ResultBox.css";

// 코드값 → 한글 레이블 매핑
const nationLabelMap = {
  korean: "한식 🇰🇷",
  chinese: "중식 🇨🇳",
  japanese: "일식 🇯🇵",
  western: "양식 🍽️",
};

const ingredientLabelMap = {
  rice: "밥 🍚",
  noodle: "면 🍜",
  tteok: "떡 🍢",
  bread: "빵 🥪",
};

function ResultBox({ result }) {
  if (!result) {
    return (
      <div className="result-box empty">
        아직 추천된 메뉴가 없습니다. 버튼을 눌러 메뉴를 골라보세요!
      </div>
    );
  }

  // nation / ingredient 표시용 텍스트
  const nationLabel = nationLabelMap[result.nation] ?? result.nation;
  const ingredientLabel =
    ingredientLabelMap[result.ingredient] ?? result.ingredient;

  return (
    <div className="result-box">
      <div className="result-content">
        <h2 className="result-title">오늘의 점심 메뉴</h2>

        <img src={result.image} alt={result.name} className="result-image" />

        <h3 className="menu-name">{result.name}</h3>

        {result.description && (
          <p className="menu-desc">{result.description}</p>
        )}

        <div className="tags">
          <span className="tag">{nationLabel}</span>
          <span className="tag">{ingredientLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default ResultBox;
