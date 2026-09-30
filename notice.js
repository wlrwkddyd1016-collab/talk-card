// notice.js - 토크픽 모든 페이지 공통 실시간 롤링 공지 전광판
(function() {
  // 💡 [공지 문구] 모든 탭에 똑같이 흘러가는 메시지들
  const NOTICES = [
    "✨ 토크픽 신규 질문 및 🎯 이미지 게임 업데이트 완료!",
    "💡 마음에 드는 질문은 '질문 복사하기'로 바로 공유해보세요.",
    "🎉 어색한 침묵을 깨는 센스 있는 질문이 꾸준히 추가됩니다."
  ];

  // 1. 모든 탭에 적용될 공통 롤링 전광판 스타일 (CSS)
  const style = document.createElement('style');
  style.id = 'unifiedNoticeTickerStyle';
  style.textContent = `
    .notice-ticker-wrapper {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      margin: 12px auto 14px auto;
      box-sizing: border-box;
      max-width: 620px;
      width: 95%;
    }
    .ticker-badge {
      background: #4f46e5;
      color: #ffffff;
      font-size: 0.74rem;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 9999px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ticker-track {
      overflow: hidden;
      white-space: nowrap;
      flex: 1;
      mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
      -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
    }
    .ticker-content {
      display: inline-flex;
      gap: 36px;
      animation: tickerConveyor 22s linear infinite;
    }
    .notice-ticker-wrapper:hover .ticker-content {
      animation-play-state: paused;
    }
    .ticker-item {
      font-size: 0.82rem;
      color: #475569;
      font-weight: 600;
      display: inline-block;
    }
    @keyframes tickerConveyor {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);

  // 2. 전광판 HTML 자동 생성 및 상단 메뉴 '완전 바깥 위쪽'에 배치
  function renderUnifiedTicker() {
    // 중복 전광판 제거
    document.querySelectorAll('.notice-ticker-wrapper, .site-common-notice').forEach(el => el.remove());

    const wrapper = document.createElement('div');
    wrapper.id = 'siteNoticeTicker';
    wrapper.className = 'notice-ticker-wrapper';
    wrapper.title = '마우스를 올리면 멈춥니다';

    const itemsHtml = NOTICES.map(text => `<span class="ticker-item">${text}</span>`).join('');
    wrapper.innerHTML = `
      <span class="ticker-badge">📢 공지</span>
      <div class="ticker-track">
        <div class="ticker-content">
          ${itemsHtml}
          ${itemsHtml}
        </div>
      </div>
    `;

    // 상단 네비게이션 탐색 (상단 탭 링크 기준)
    const navLink = document.querySelector('a[href*="balance.html"], a[href*="index.html"], a[href*="mbti.html"], a[href*="board.html"]');
    
    if (navLink) {
      // < > 화살표 버튼이 포함된 '가장 바깥쪽 스크롤 상자'를 찾아 그 위로 탈출
      let topNavContainer = navLink;
      while (
        topNavContainer.parentElement &&
        topNavContainer.parentElement !== document.body &&
        !topNavContainer.parentElement.classList.contains('container') &&
        topNavContainer.parentElement.tagName !== 'MAIN'
      ) {
        topNavContainer = topNavContainer.parentElement;
      }

      if (topNavContainer && topNavContainer.parentNode) {
        topNavContainer.parentNode.insertBefore(wrapper, topNavContainer);
        return;
      }
    }

    // 네비게이션 컨테이너를 찾지 못한 경우 컨테이너 또는 body 최상단에 삽입
    const mainContainer = document.querySelector('.container') || document.querySelector('.app-container') || document.body;
    if (mainContainer.firstChild) {
      mainContainer.insertBefore(wrapper, mainContainer.firstChild);
    } else {
      mainContainer.appendChild(wrapper);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUnifiedTicker);
  } else {
    renderUnifiedTicker();
  }
})();
