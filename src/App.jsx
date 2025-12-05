// src/App.jsx
import { useState } from "react";
import "./styles/App.css";

import { MENUS } from "./data/menus";
import ModeButtons from "./components/ModeButtons";
import SubCategoryButtons from "./components/SubCategoryButtons";
import ResultBox from "./components/ResultBox";

function App() {
  const [mode, setMode] = useState("none"); // nation | ingredient | random | none
  const [selectedSub, setSelectedSub] = useState(null); // 한식/중식/밥/면 등
  const [result, setResult] = useState(null); // 추천된 메뉴 객체

  // 랜덤으로 하나 뽑는 헬퍼 함수
  const pickRandom = (list) => {
    if (!list || list.length === 0) return null;
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
  };

  // 메인 3버튼 클릭 시
  const handleSelectMode = (newMode) => {
    setMode(newMode);
    setSelectedSub(null); // 서브 선택 초기화

    if (newMode === "random") {
      // 전체 메뉴에서 바로 랜덤 추천
      const chosen = pickRandom(MENUS);
      setResult(chosen);
    } else {
      // nation 또는 ingredient일 때는 아직 서브 선택 전이므로 결과 비움
      setResult(null);
    }
  };

  // 나라별/재료별 서브 버튼 클릭 시
  const handleSelectSub = (subKey) => {
    setSelectedSub(subKey);

    let filtered = [];

    if (mode === "nation") {
      filtered = MENUS.filter((menu) => menu.nation === subKey);
    } else if (mode === "ingredient") {
      filtered = MENUS.filter((menu) => menu.ingredient === subKey);
    }

    const chosen = pickRandom(filtered);
    setResult(chosen);
  };

  // 같은 조건으로 다시 뽑기
  const handleRetry = () => {
    if (mode === "random") {
      setResult(pickRandom(MENUS));
      return;
    }

    if (mode === "nation" && selectedSub) {
      const filtered = MENUS.filter((m) => m.nation === selectedSub);
      setResult(pickRandom(filtered));
      return;
    }

    if (mode === "ingredient" && selectedSub) {
      const filtered = MENUS.filter((m) => m.ingredient === selectedSub);
      setResult(pickRandom(filtered));
      return;
    }
  };

  const handleReset = () => {
    setMode("none");
    setSelectedSub(null);
    setResult(null);
  };

  return (
    <div className="app">
      <h1>점.메.추</h1>

      {/* 메인 3버튼 */}
      <ModeButtons onSelectMode={handleSelectMode} />

      {/* 선택된 모드에 따라 나라/재료별 버튼 */}
      <SubCategoryButtons mode={mode} onSelectSub={handleSelectSub} />

      {/* 현재 선택 상태 출력 (디버깅 겸 설명용) */}
      <div className="status">
        <p>현재 모드: {mode === "none" ? "선택 안됨" : mode}</p>
        <p>세부 선택: {selectedSub ?? "없음"}</p>
      </div>

      {/* 결과 박스 */}
      <ResultBox result={result} />

      {/* 하단 조작 버튼 */}
      <div className="actions">
        <button onClick={handleRetry}>다시 추천</button>
        <button onClick={handleReset}>처음으로</button>
      </div>
    </div>
  );
}

export default App;
