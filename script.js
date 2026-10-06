/**
 * 오늘의 메뉴를 랜덤으로 추천해주는 스크립트
 */

// 1. 메뉴 데이터셋 (총 22개 - 한식, 중식, 일식, 양식, 분식/기타)
const MENU_DATA = [
  // 한식
  {
    name: "김치찌개와 계란말이",
    category: "한식",
    icon: "🥘",
    desc: "칼칼하고 깊은 국물에 부드러운 계란말이의 환상적인 꿀조합!",
    tags: ["#밥도둑", "#얼큰한국물", "#집밥감성"]
  },
  {
    name: "삼겹살과 된장찌개",
    category: "한식",
    icon: "🥓",
    desc: "지글지글 노릇하게 구운 삼겹살에 구수한 된장찌개 한 숟가락!",
    tags: ["#고기파티", "#쌈채소듬뿍", "#회식1순위"]
  },
  {
    name: "제육볶음 정식",
    category: "한식",
    icon: "🥩",
    desc: "불맛 가득 매콤달콤한 제육볶음에 흰 쌀밥을 슥슥 비벼서 한입!",
    tags: ["#불맛가득", "#남녀노소인기", "#든든한한끼"]
  },
  {
    name: "돌솥 전주비빔밥",
    category: "한식",
    icon: "🍲",
    desc: "형형색색 나물과 고소한 참기름, 바삭하게 눌어붙은 누룽지까지!",
    tags: ["#건강식단", "#채소듬뿍", "#고소한참기름"]
  },
  {
    name: "해물 순두부찌개",
    category: "한식",
    icon: "🥣",
    desc: "몽글몽글 부드러운 순두부에 신선한 해물이 어우러진 얼큰 시원한 맛!",
    tags: ["#해장추천", "#얼큰시원", "#날달걀톡"]
  },

  // 중식
  {
    name: "짜장면과 바삭 탕수육",
    category: "중식",
    icon: "🥢",
    desc: "진한 춘장 소스에 쫄깃한 면발, 겉바속촉 탕수육의 영원한 베스트셀러!",
    tags: ["#단짠조합", "#부먹찍먹", "#중식원탑"]
  },
  {
    name: "얼큰 해물짬뽕",
    category: "중식",
    icon: "🍜",
    desc: "불맛 가득한 얼큰한 해물 국물로 속을 확 풀어주는 국물 요리!",
    tags: ["#불향가득", "#해장추천", "#얼큰칼칼"]
  },
  {
    name: "마라탕",
    category: "중식",
    icon: "🌶️",
    desc: "원하는 재료를 듬뿍 담아 얼얼하고 중독적인 마라 소스로 끓여낸 별미!",
    tags: ["#알싸한맛", "#취향맞춤", "#스트레스해소"]
  },
  {
    name: "딤섬과 마파두부 덮밥",
    category: "중식",
    icon: "🥟",
    desc: "육즙 팡 터지는 딤섬과 매콤 알싸한 마파두부로 든든하고 특별한 식사!",
    tags: ["#육즙가득", "#매콤부드러움", "#중식미식"]
  },

  // 일식
  {
    name: "모둠 초밥",
    category: "일식",
    icon: "🍣",
    desc: "입안 가득 살살 녹는 싱싱한 제철 생선과 새콤달콤한 밥의 조화!",
    tags: ["#신선함", "#깔끔한맛", "#특식추천"]
  },
  {
    name: "바삭한 돈가스와 우동",
    category: "일식",
    icon: "🍱",
    desc: "두툼한 안심과 등심 돈가스의 바삭함과 따끈한 우동 국물의 조화!",
    tags: ["#겉바속촉", "#두툼한고기", "#인기만점"]
  },
  {
    name: "진한 국물 라멘",
    category: "일식",
    icon: "🍜",
    desc: "오랜 시간 우려낸 진하고 뽀얀 육수와 부드러운 고기, 반숙란의 깊은 풍미!",
    tags: ["#진한국물", "#고기토핑", "#따끈한국물"]
  },
  {
    name: "소고기 덮밥 (규동)",
    category: "일식",
    icon: "🍚",
    desc: "특제 간장 소스에 조려낸 부드러운 우삼겹과 노른자를 톡 터뜨려 냠냠!",
    tags: ["#초간단순삭", "#단짠매력", "#직장인추천"]
  },

  // 양식
  {
    name: "베이컨 크림 파스타",
    category: "양식",
    icon: "🍝",
    desc: "고소하고 꾸덕한 크림소스와 짭조름한 베이컨이 어우러진 면 요리!",
    tags: ["#꾸덕꾸덕", "#고소한맛", "#분위기맛집"]
  },
  {
    name: "수제 햄버거와 감자튀김",
    category: "양식",
    icon: "🍔",
    desc: "육즙 가득 수제 패티와 녹아내린 치즈, 바삭한 감자튀김의 환상적인 만남!",
    tags: ["#육즙가득", "#치즈듬뿍", "#행복한식사"]
  },
  {
    name: "화덕 마르게리타 피자",
    category: "양식",
    icon: "🍕",
    desc: "쫀득한 도우 위에 신선한 토마토소스, 바질, 모차렐라 치즈가 듬뿍!",
    tags: ["#화덕피자", "#치즈쭉쭉", "#푸짐한한끼"]
  },
  {
    name: "두툼한 소고기 스테이크",
    category: "양식",
    icon: "🥩",
    desc: "겉은 노릇 속은 촉촉하게 구워내 풍부한 육즙을 자랑하는 소고기 구이!",
    tags: ["#특별한날", "#단백질충전", "#고기사랑"]
  },

  // 분식 / 기타
  {
    name: "매콤 떡볶이와 모둠튀김",
    category: "분식/기타",
    icon: "🍢",
    desc: "매콤달콤 쫄깃한 떡볶이 국물에 바삭한 김말이, 오징어튀김 콕 찍먹!",
    tags: ["#국민간식", "#매콤달콤", "#순대추가"]
  },
  {
    name: "황금 바삭 닭튀김과 감자튀김",
    category: "분식/기타",
    icon: "🍗",
    desc: "오늘 하루 수고한 나를 위한 바삭바삭 황금빛 닭튀김과 시원한 음료!",
    tags: ["#바삭바삭", "#야식추천", "#최고의야식"]
  },
  {
    name: "바질 오일 파스타와 샐러드",
    category: "양식",
    icon: "🥗",
    desc: "향긋한 바질 소스와 신선한 채소로 가볍고 산뜻하게 즐기는 한 끼!",
    tags: ["#산뜻가벼움", "#건강한식사", "#가벼운한끼"]
  },
  {
    name: "베트남 소고기 쌀국수",
    category: "분식/기타",
    icon: "🍲",
    desc: "깊고 담백한 소고기 육수에 아삭한 숙주와 쪽파를 곁들인 따스한 국물!",
    tags: ["#시원담백", "#숙주듬뿍", "#속편한음식"]
  },
  {
    name: "따끈한 김치나베 돈가스",
    category: "일식",
    icon: "🥘",
    desc: "얼큰한 김치 국물에 촉촉하게 젖은 바삭 돈가스와 고소한 치즈 토핑!",
    tags: ["#촉촉한국물", "#얼큰고소", "#비오는날"]
  }
];

// 2. DOM 요소 참조
const displayCard = document.getElementById("display-card");
const menuIcon = document.getElementById("menu-icon");
const menuCategory = document.getElementById("menu-category");
const menuName = document.getElementById("menu-name");
const menuDescription = document.getElementById("menu-description");
const menuTags = document.getElementById("menu-tags");

const recommendBtn = document.getElementById("recommend-btn");
const tabButtons = document.querySelectorAll(".tab-btn");
const soundToggleBtn = document.getElementById("sound-toggle-btn");
const soundIcon = document.getElementById("sound-icon");
const shareBtn = document.getElementById("share-btn");

const historySection = document.getElementById("history-section");
const historyChips = document.getElementById("history-chips");
const toastMessage = document.getElementById("toast-message");

// 3. 상태 변수
let currentCategory = "전체";
let isRolling = false;
let soundEnabled = true;
let currentSelectedMenu = null;
const historyList = [];

// 4. Web Audio API로 구현한 가벼운 자체 효과음 (별도 파일 로딩 불필요)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playTickSound() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(450 + Math.random() * 150, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // 오디오 컨텍스트 에러 방어
  }
}

function playWinSound() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (화음)
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const startTime = audioCtx.currentTime + idx * 0.09;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (e) {
    // 오디오 에러 방어
  }
}

// 5. 토스트 팝업 함수
let toastTimeout;
function showToast(text) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = text;
  toastMessage.classList.add("show");
  toastTimeout = setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2300);
}

// 6. UI 렌더링 함수
function renderMenu(menu, animate = false) {
  currentSelectedMenu = menu;
  menuIcon.textContent = menu.icon;
  menuCategory.textContent = `${menu.category} 추천`;
  menuName.textContent = menu.name;
  menuDescription.textContent = menu.desc;

  // 태그 렌더링
  menuTags.innerHTML = menu.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  if (animate) {
    displayCard.classList.remove("pop-success");
    void displayCard.offsetWidth; // reflow trigger
    displayCard.classList.add("pop-success");
  }
}

// 7. 추천 히스토리 업데이트
function addHistory(menu) {
  // 중복이 바로 앞에 있지 않도록 관리
  if (historyList.length > 0 && historyList[0].name === menu.name) return;

  historyList.unshift(menu);
  if (historyList.length > 6) historyList.pop();

  historySection.style.display = "block";
  historyChips.innerHTML = "";

  historyList.forEach((item) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "history-chip";
    chip.textContent = `${item.icon} ${item.name}`;
    chip.addEventListener("click", () => {
      if (isRolling) return;
      renderMenu(item, true);
      showToast(`'${item.name}' 정보를 확인합니다!`);
    });
    historyChips.appendChild(chip);
  });
}

// 8. 컨페티(폭죽) 축하 효과
function fireCelebration() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#ff5722", "#ff9800", "#ffd54f", "#4caf50", "#2196f3"]
    });
  }
}

// 9. 슬롯머신 셔플 알고리즘
function rollMenu() {
  if (isRolling) return;

  // 필터된 메뉴 목록 추출
  let pool = MENU_DATA;
  if (currentCategory !== "전체" && currentCategory !== "all") {
    pool = MENU_DATA.filter(item => item.category === currentCategory);
  }

  if (pool.length === 0) {
    showToast("선택한 카테고리에 메뉴가 없습니다!");
    return;
  }

  isRolling = true;
  recommendBtn.disabled = true;
  recommendBtn.querySelector(".btn-text").textContent = "메뉴 고르는 중...";
  displayCard.classList.add("is-rolling");

  let counter = 0;
  const totalSteps = 18; // 셔플 전환 횟수
  let currentDelay = 50; // 초기 스피드 (ms)

  function shuffleStep() {
    // 랜덤 미리보기
    const randomTemp = pool[Math.floor(Math.random() * pool.length)];
    menuIcon.textContent = randomTemp.icon;
    menuName.textContent = randomTemp.name;
    menuCategory.textContent = "두구두구두구... 🥁";
    menuDescription.textContent = "오늘의 최고 맛있는 메뉴를 고르고 있어요!";
    playTickSound();

    counter++;
    if (counter < totalSteps) {
      // 속도가 점점 느려지는 감속 효과
      if (counter > totalSteps - 6) {
        currentDelay += 35;
      }
      setTimeout(shuffleStep, currentDelay);
    } else {
      // 최종 결과 선택
      // 바로 이전과 같지 않은 메뉴를 우선 선택
      let finalMenu = pool[Math.floor(Math.random() * pool.length)];
      if (pool.length > 1 && currentSelectedMenu && finalMenu.name === currentSelectedMenu.name) {
        const otherPool = pool.filter(m => m.name !== currentSelectedMenu.name);
        finalMenu = otherPool[Math.floor(Math.random() * otherPool.length)];
      }

      displayCard.classList.remove("is-rolling");
      renderMenu(finalMenu, true);
      playWinSound();
      fireCelebration();
      addHistory(finalMenu);

      isRolling = false;
      recommendBtn.disabled = false;
      recommendBtn.querySelector(".btn-text").textContent = "다른 메뉴 다시 추천받기";
    }
  }

  shuffleStep();
}

// 10. 카테고리 탭 변경 이벤트
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (isRolling) return;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");

    const categoryName = btn.textContent.trim();
    showToast(`'${categoryName}' 카테고리가 선택되었습니다.`);
  });
});

// 11. 사운드 토글 이벤트
soundToggleBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundIcon.textContent = "🔊";
    soundToggleBtn.innerHTML = `<span id="sound-icon">🔊</span> 소리 켜짐`;
    showToast("효과음이 켜졌습니다.");
  } else {
    soundIcon.textContent = "🔇";
    soundToggleBtn.innerHTML = `<span id="sound-icon">🔇</span> 소리 꺼짐`;
    showToast("효과음이 꺼졌습니다.");
  }
});

// 12. 결과 공유 / 클립보드 복사 이벤트
shareBtn.addEventListener("click", () => {
  if (!currentSelectedMenu) {
    showToast("먼저 메뉴를 추천받아 보세요!");
    return;
  }

  const shareText = `[오늘 뭐 먹지? 오늘의 추천 메뉴]\n🍽️ ${currentSelectedMenu.name} (${currentSelectedMenu.category})\n👉 ${currentSelectedMenu.desc}\n${currentSelectedMenu.tags.join(" ")}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        showToast("추천 메뉴 내용이 클립보드에 복사되었습니다! 🎉");
      })
      .catch(() => {
        fallbackCopyText(shareText);
      });
  } else {
    fallbackCopyText(shareText);
  }
});

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  showToast("추천 메뉴 내용이 복사되었습니다! 🎉");
}

// 13. 추천 버튼 클릭 이벤트
recommendBtn.addEventListener("click", () => {
  rollMenu();
});

// 14. 키보드 스페이스바 단축키 지원
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    if (!isRolling) {
      rollMenu();
    }
  }
});
