console.log("Content script loaded");

// URL 매칭 함수
const matchPattern = "https://iam2.#####.ac.kr/*"; //##### : 학교 이름
const regex = new RegExp(matchPattern.replace("*", ".*"));

async function initialize() {
  console.log("DOM 초기화 시도");

  const currentUrl = window.location.href;
  console.log("현재 URL:", currentUrl);

  const isMatch = regex.test(currentUrl);
  console.log("URL 매칭 여부:", isMatch);

  if (isMatch) {
    console.log("페이지가 매칭됩니다.");

    const waitForElement = (selector, interval = 500, maxAttempts = 10) => {
      return new Promise((resolve, reject) => {
        let attempts = 0;

        const intervalId = setInterval(() => {
          const element = document.querySelector(selector);
          attempts++;

          if (element) {
            clearInterval(intervalId);
            resolve(element);
          } else if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            reject(new Error("Element not found within the maximum attempts"));
          }
        }, interval);
      });
    };

    try {
      const passwordAuthButton = await waitForElement('input[type="submit"][value="비밀번호 인증"]');
      console.log("비밀번호 인증 버튼이 존재합니다.");

      passwordAuthButton.addEventListener('click', () => {
        console.log("비밀번호 인증 버튼 클릭됨");
        chrome.runtime.sendMessage({ action: "startAuthProcess" });
      });
    } catch (error) {
      console.log("비밀번호 인증 버튼을 찾을 수 없습니다.");
    }
  } else {
    console.log("페이지가 매칭되지 않습니다.");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded 이벤트 발생");
    initialize();
  });
} else {
  console.log("이미 DOM이 로드됨");
  initialize();
}
