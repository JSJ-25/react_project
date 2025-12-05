// src/components/ResultBox.jsx

function ResultBox({ result }) {
  if (!result) {
    return (
      <div className="result-box empty">
        <p>아직 추천된 메뉴가 없습니다. 버튼을 눌러 메뉴를 골라보세요!</p>
      </div>
    );
  }

  return (
    <div className="result-box">
      <h2>오늘의 점심 메뉴</h2>
      <h3>{result.name}</h3>
      {result.description && <p>{result.description}</p>}
      <p className="tags">
        <span>나라: {result.nation}</span>{" "}
        <span>재료: {result.ingredient}</span>
      </p>
    </div>
  );
}

export default ResultBox;
