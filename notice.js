// notice.js - 토크픽 모든 페이지 공통 공지사항 관리
(function() {
  // 💡 [공지사항 설정] 여기서 문구를 바꾸면 모든 탭에 1초 만에 일괄 반영됩니다.
  const NOTICE_CONFIG = {
    badge: "📢 공지",
    // index.html에서 사용 중이신 실제 공지 문구로 아래 따옴표 안을 바꿔주세요!
    message: "토크픽에 오신 것을 환영합니다! 어색한 침묵을 깨는 센스 있는 질문을 나눠보세요.",
    // 링크가 필요하면 URL 입력 (예: "./board.html"), 필요 없으면 "" 로 비워두기
    linkUrl: "./board.html",
    linkText: "질문 남기러 가기 →"
  };

  // 1. 공지사항 스타일 자동 주입
  const style = document.createElement('style');
  style.textContent = `
    .site-common-notice {
      width: 100%;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      border-radius: 12px;
      padding: 9px 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.84rem;
      color: #3730a3;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgba(79, 70, 229, 0.05);
      animation: noticeFadeIn 0.25s ease-out;
    }
    .site-notice-badge {
      background: #4f46e5;
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .site-notice-text {
      flex: 1;
      font-weight: 600;
      line-height: 1.45;
      word-break: keep-all;
    }
    .site-notice-link {
      color: #4338ca;
      font-weight: 700;
      text-decoration: underline;
      margin-left: 6px;
      white-space: nowrap;
    }
    @keyframes noticeFadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // 2. 상단 탭 바로 위에 공지 바 동적 삽입
  function injectNotice() {
    if (document.getElementById('siteCommonNoticeBar')) return;

    const noticeBox = document.createElement('div');
    noticeBox.id = 'siteCommonNoticeBar';
    noticeBox.className = 'site-common-notice';

    let html = `<span class="site-notice-badge">${NOTICE_CONFIG.badge}</span><span class="site-notice-text">${NOTICE_CONFIG.message}`;
    if (NOTICE_CONFIG.linkUrl) {
      html += `<a href="${NOTICE_CONFIG.linkUrl}" class="site-notice-link">${NOTICE_CONFIG.linkText}</a>`;
    }
    html += `</span>`;
    noticeBox.innerHTML = html;

    // 상단 탭(.nav-wrapper 또는 .top-nav) 바로 위에 삽입
    const navEl = document.querySelector('.nav-wrapper') || document.querySelector('.top-nav');
    const container = document.querySelector('.container') || document.body;

    if (navEl && navEl.parentNode) {
      navEl.parentNode.insertBefore(noticeBox, navEl);
    } else if (container.firstChild) {
      container.insertBefore(noticeBox, container.firstChild);
    } else {
      container.appendChild(noticeBox);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNotice);
  } else {
    injectNotice();
  }
})();
