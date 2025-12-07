import { useState } from "react";
import "./styles/App.css";

import { MENUS } from "./data/menus";
import ModeButtons from "./components/ModeButtons";
import SubCategoryButtons from "./components/SubCategoryButtons";
import ResultBox from "./components/ResultBox";

/* ================================
   헬퍼 함수들 (컴포넌트 밖으로 분리)
================================ */

// 리스트에서 랜덤으로 하나 뽑기
const pickRandom = (list) => {
  if (!list || list.length === 0) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
};

// mode + subKey 기반으로 메뉴 필터링
const filterMenusByMode = (mode, subKey, menus) => {
  if (mode === "nation" && subKey) {
    return menus.filter((menu) => menu.nation === subKey);
  }
  if (mode === "ingredient" && subKey) {
    return menus.filter((menu) => menu.ingredient === subKey);
  }
  if (mode === "random") {
    // random 모드는 전체 목록이 대상
    return menus;
  }
  // none 이거나 아직 서브 선택 전일 때
  return [];
};

// 상태 표시용 텍스트 매핑
const MODE_LABEL = {
  none: "선택 안됨",
  nation: "나라별 추천",
  ingredient: "재료별 추천",
  random: "완전 랜덤",
};

function App() {
  const [mode, setMode] = useState("none"); // nation | ingredient | random | none
  const [selectedSub, setSelectedSub] = useState(null); // 한식/중식/밥/면 등
  const [result, setResult] = useState(null); // 추천된 메뉴 객체

  // 메인 3버튼 클릭 시
  const handleSelectMode = (newMode) => {
    setMode(newMode);
    setSelectedSub(null); // 서브 선택 초기화

    if (newMode === "random") {
      // 전체 메뉴에서 바로 랜덤 추천
      setResult(pickRandom(MENUS));
    } else {
      // nation 또는 ingredient일 때는 아직 서브 선택 전이므로 결과 비움
      setResult(null);
    }
  };

  // 나라별/재료별 서브 버튼 클릭 시
  const handleSelectSub = (subKey) => {
    setSelectedSub(subKey);

    const filtered = filterMenusByMode(mode, subKey, MENUS);
    setResult(pickRandom(filtered));
  };

  // mode + selectedSub 기반 필터 결과 (렌더마다 1번만 계산)
  const filteredForRetry = filterMenusByMode(mode, selectedSub, MENUS);
  const canRetry = filteredForRetry.length > 0;

  // 같은 조건으로 다시 뽑기
  const handleRetry = () => {
    if (!canRetry) return; // 조건 안 되면 그냥 반환
    setResult(pickRandom(filteredForRetry)); // 이미 필터된 결과 재사용
  };

  const handleReset = () => {
    setMode("none");
    setSelectedSub(null);
    setResult(null);
  };

  const displayMode = MODE_LABEL[mode] ?? mode;
  const displaySub = selectedSub ?? "없음";

  return (
    <div className="app">
      {/* 왼쪽 패널 */}
      <div className="left-panel">
        <h1 className="title-left">점.메.추</h1>

        <div className="top-buttons">
          <ModeButtons mode={mode} onSelectMode={handleSelectMode} />
        </div>

        <div className="sub-buttons">
          <SubCategoryButtons
            mode={mode}
            selectedSub={selectedSub}
            onSelectSub={handleSelectSub}
          />
        </div>

        <div className="side-actions">
          <button onClick={handleRetry} disabled={!canRetry}>
            다시 추천
          </button>
          <button onClick={handleReset}>처음으로</button>
        </div>
      </div>

      {/* 오른쪽 메인 콘텐츠 */}
      <div className="content-area">
        <ResultBox result={result} />

        <div className="status">
          <p>현재 모드: {displayMode}</p>
          <p>세부 선택: {displaySub}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
