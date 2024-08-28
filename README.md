# one_click_service
 
# 로그인 과정 간소화를 위한 자동 인증 프로그램 구현

## 1. 개요

### 1. 프로젝트 배경

 오늘날 사용자 경험을 개선하고 업무 효율성을 높이기 위해 웹 애플리케이션에서 2차 인증 절차가 점점 더 중요해지고 있습니다. 저희 학교 역시 로그인 시  매번 2차인증을 해야합니다. 그러나 이러한 절차는 사용자(학생 및 교직원)가 매번 메일을 열어 인증 코드를 복사하고 붙여넣는 번거로운 과정을 거치게 만듭니다. 특히, 자주 로그인해야 하는 환경에서는 이러한 과정이 비효율적이며 사용자에게 불편함을 초래할 수 있습니다. 학교 커뮤니티에서도 이를 불편하게 여기는 학생들이 많음을 확인할 수 있었습니다. 이를 해결하기 위해, 사용자의 경험을 개선하고 로그인 프로세스를 간소화하는 방법이 필요했습니다.

### 2. 프로젝트 목적

 이 프로젝트의 목적은 메일 크롤링을 활용하여 2차 인증 과정을 자동화하는 구글 크롬 확장 프로그램을 개발하는 것입니다. 사용자가 로그인 시, 메일에서 인증 코드를 자동으로 추출하고, 해당 코드를 자동으로 입력하여 로그인 과정을 단순화합니다. 이를 통해 사용자의 시간을 절약하고 불필요한 반복 작업을 최소화하며, 사용자 경험을 향상시키는 것을 목표로 합니다.

### 3. 접근 방식

1. **메일 크롤링 및 데이터 추출**: 웹 크롤링 기술을 활용하여 메일함에서 인증 코드를 포함한 메일을 자동으로 탐색하고, 해당 메일에서 인증 코드를 추출합니다.
2. **자동화 구현**: 구글 크롬 확장 프로그램 API를 사용하여 사용자가 학교 사이트에 로그인할 때 자동으로 인증 코드를 입력하는 기능을 구현합니다. 이를 통해 전체 인증 과정을 자동화합니다.
3. **비동기 작업 처리**: 메일 검색 및 코드 추출 과정에서 발생하는 비동기 작업을 효율적으로 처리하기 위해 JavaScript의 Promise와 async/await 패턴을 적용하였습니다.

### 4. 사용 기술 및 도구

- **프로그래밍 언어**: JavaScript, HTML, CSS
- **웹 크롤링**: DOM 조작 및 웹 크롤링을 위한 JavaScript
- **브라우저 확장 프로그램 개발**: Chrome Extensions API
- **비동기 작업 처리**: Promise, async/await
- **디버깅 및 테스트**: Chrome Developer Tools

### 5. 기대 효과 및 비즈니스 임팩트

 이 프로젝트는 사용자가 2차 인증 과정에서 겪는 불편함을 크게 줄이고, 로그인 프로세스를 간소화함으로써 생산성을 향상시킵니다. 또한, 반복적인 작업을 자동화함으로써 사용자의 시간과 노력을 절약할 수 있습니다. 이 프로젝트는 사용자가 더 원활하게 웹 애플리케이션을 이용할 수 있도록 도와줌으로써, 사용자 만족도를 높이고 비즈니스 효율성을 강화하는 데 기여할 수 있습니다.



## 2. 개발 과정

### 1. 설계 및 아키텍처

 사용자가 학교 사이트에 로그인하면 자동으로 2차 인증을 수행할 수 있도록 하기 위해, 메일 사이트와 학교 사이트 간의 데이터 흐름을 자동화하는 구조를 설계했습니다.

프로젝트는 크게 세 가지 주요 모듈로 구성되었습니다:

- **메일 크롤링 모듈**: 사용자의 메일함에서 인증 코드를 포함한 메일을 자동으로 탐색하고, 해당 메일을 파싱하여 인증 코드를 추출하는 기능을 담당합니다.
- **자동 로그인 및 입력 모듈**: 추출된 인증 코드를 자동으로 학교 사이트에 입력하고, 로그인을 완료하는 기능을 담당합니다.
- **크롬 확장 프로그램 인터페이스**: 사용자가 간편하게 이 기능을 사용할 수 있도록 크롬 확장 프로그램으로 구현했습니다.

### 2. 메일 크롤링 및 인증 코드 추출

 크롬 확장 프로그램이 사용자의 메일함에 접근하여, 최신 메일에서 인증 코드를 추출하는 기능을 구현했습니다. 메일함의 구조가 서비스마다 달라 각각의 경우에 맞는 크롤링 로직을 작성했습니다. 예를 들어, 네이버 메일과 구글 메일의 HTML 구조가 다르므로, 각각에 대해 다른 `querySelector`를 사용하여 데이터를 추출했습니다.

 또한, 메일함에 여러 개의 메일이 도착해 있는 상황에서 가장 최신의 인증 메일을 정확히 선택하도록 알고리즘을 설계했습니다. 이 과정에서 메일의 제목과 발신자를 분석하여 인증 메일을 식별했습니다.

### 3. 자동 로그인 및 인증 코드 입력

 추출된 인증 코드를 자동으로 입력하고 로그인을 완료하는 모듈을 구현했습니다. 이 과정에서는 학교 사이트의 로그인 페이지를 대상으로 특정 입력 필드를 찾아 코드를 자동으로 채우고, 로그인 버튼을 클릭하는 작업을 자동화했습니다. JavaScript를 이용해 DOM 요소를 제어하며, 다양한 경우의 수에 대비해 로그인 과정을 안정적으로 처리할 수 있도록 했습니다.

### 4. 디버깅 및 최적화

 개발 과정 중에는 다양한 디버깅 도구와 방법을 사용하여 발생하는 문제를 해결했습니다. 특히 크롬 개발자 도구(Chrome DevTools)를 활용해 DOM 구조를 확인하고, 스크립트가 의도한 대로 작동하는지 확인했습니다. 또한, 비동기 작업의 실행 순서나 타이밍 문제를 해결하기 위해 `console.log()`를 통해 상세한 로그를 출력하며 디버깅을 진행했습니다.

최종적으로, 프로그램이 다양한 상황에서도 안정적으로 작동할 수 있도록 테스트를 거쳤으며, 코드 최적화를 통해 성능을 향상시켰습니다.



## 3. 코드 분석

 이 프로젝트는 **popup.html**, **background.js**, **content.js**, **popup.js**, **manifest.json**의 총 5개의 파일로 구성되어 있으며, 각각의 파일은 특정 역할을 담당하여 확장 프로그램의 기능을 구현합니다.

1. **`manifest.json`**: 이 파일은 크롬 확장 프로그램의 설정 파일로, 확장 프로그램의 메타데이터(이름, 버전, 권한 등)를 정의하고, 어떤 스크립트와 리소스를 사용할지를 설정합니다.
2. **`popup.html`**: 사용자가 확장 프로그램 아이콘을 클릭했을 때 표시되는 팝업의 구조와 UI를 정의합니다. 이 파일은 사용자가 선택할 수 있는 옵션이나 버튼을 제공하며, 확장 프로그램의 초기 설정을 관리합니다.
3. **`background.js`**: 백그라운드에서 실행되며, 확장 프로그램의 주요 로직과 이벤트 처리 기능을 담당합니다. 사용자의 명령을 수신하고, 웹 페이지와의 상호작용을 처리하며, 메시지 전달을 관리합니다.
4. **`content.js`**: 웹 페이지의 DOM과 상호작용하여, 특정 페이지에서 필요한 요소를 탐색하고 조작하는 역할을 합니다. 사용자가 방문한 페이지에서 자동화 작업을 수행하는 스크립트를 포함하고 있습니다.
5. **`popup.js`**: 팝업 창에서 발생하는 사용자 입력 이벤트를 처리하며, 사용자가 선택한 옵션을 백그라운드 스크립트로 전달하는 역할을 합니다.

 이번 보고서에서는 이 중 **`manifest.json`**, **`background.js`**, **`content.js`** 세 파일을 중심으로 확장 프로그램의 동작 원리와 기술적 구현 방식을 자세히 살펴보겠습니다. 이 파일들은 확장 프로그램의 설정 및 핵심 로직을 담당하며, 프로그램이 어떻게 사용자와 상호작용하고, 웹 페이지에서 인증 과정을 자동화하는지를 이해하는 데 필수적입니다.

### 1. manifest.json

`manifest.json` 파일은 크롬 확장 프로그램의 설정 파일로, 확장 프로그램의 메타데이터(이름, 버전, 권한 등)를 정의하고, 확장 프로그램의 동작 방식을 설정하는 중요한 역할을 합니다. 이 파일을 통해 확장 프로그램이 어떤 리소스를 사용할지, 어떤 권한을 요청할지, 어떤 스크립트를 실행할지 등을 지정할 수 있습니다. 크롬 확장 프로그램이 브라우저에서 제대로 동작하기 위해서는 `manifest.json` 파일이 필수적입니다.

```json
{
    "permissions": [
        "activeTab",
        "scripting",
        "tabs",
        "storage"
    ],
    ...
}
```

  **`permissions`:** 확장 프로그램이 실행되기 위해 필요한 권한들을 정의합니다.

- **`activeTab`:** 현재 활성 탭에 대한 접근 권한을 부여합니다.
- **`scripting`:** 스크립트를 실행할 수 있는 권한을 부여합니다.
- **`tabs`:** 탭을 생성하거나 조작할 수 있는 권한을 부여합니다.
- **`storage`:** 확장 프로그램의 데이터를 로컬에 저장할 수 있는 권한을 부여합니다.

```json
{
    "host_permissions": [
        "https://mail.naver.com/*",
        "https://iam2.#####.ac.kr/*", //학교 이름은 #처리 하였음
        "https://mail.google.com/*"
    ],
    ...
}
```

  **`host_permissions`:** 특정 도메인에서 확장 프로그램이 동작할 수 있도록 허용합니다.

- 네이버 메일(`https://mail.naver.com/*`),
- 학교 인증 사이트(`https://iam2.#####.ac.kr/*`), //학교 이름은 #처리 하였음
- 구글 메일(`https://mail.google.com/*`)에서 동작하도록 설정되어 있습니다.

```json
{
    "background": {
      "service_worker": "background.js"
    },
    ...
}
```

    **`background`:** 확장 프로그램의 백그라운드에서 실행되는 스크립트를 정의합니다.

- 이 프로젝트에서는 `background.js`가 백그라운드 작업을 처리하는 서비스 워커로 설정되어 있습니다.

```json
{
    "content_scripts": [
        {
            "matches": ["https://iam2.#####.ac.kr/*"], //학교 이름은 #처리 하였음
            "js": ["content.js"],
            "run_at": "document_idle"
        }
    ]
}
```

  **`content_scripts`:** 특정 웹 페이지에서 실행되는 스크립트를 정의합니다.

- **`matches`:** 이 스크립트가 실행될 웹사이트의 URL 패턴을 정의합니다. 여기서는 `https://iam2.#####.ac.kr/*` 패턴의 페이지에서만 `content.js`가 실행됩니다.
- **`js`:** 실행될 자바스크립트 파일을 지정합니다.
- **`run_at`:** 스크립트가 실행될 시점을 정의합니다. 여기서는 페이지 로드가 끝난 후(`document_idle`)에 스크립트가 실행됩니다.

### 2. background.js

  `background.js` 파일은 크롬 확장 프로그램에서 백그라운드 스크립트를 실행하는 역할을 합니다. 이 스크립트는 브라우저가 실행되는 동안 계속 작동하며, 사용자의 명령이나 이벤트를 처리하고, 다른 스크립트 간의 통신을 관리합니다. 이 파일에서 주로 메시지 리스너를 등록하고, 웹 페이지 간의 상호작용을 처리하는 로직을 구현합니다.

 이 파일의 주요 기능은 사용자가 확장 프로그램을 통해 인증 프로세스를 시작할 때, 메일에서 인증 코드를 추출하고, 이를 로그인 페이지에 자동으로 입력하는 과정입니다.

```jsx
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startAuthProcess") {
    console.log("Received message to start auth process");

    chrome.storage.local.get('mailOption', (data) => {
      const mailOption = data.mailOption || 'naver';
      console.log("Selected mail option:", mailOption);
```

- **메시지 리스너 등록**: `chrome.runtime.onMessage.addListener` 메소드를 사용해 확장 프로그램이 특정 메시지를 수신할 때 실행될 코드를 정의합니다. 여기서는 `startAuthProcess` 메시지를 수신하면 인증 과정을 시작합니다.
- **사용자 선택 옵션**: `chrome.storage.local.get`을 사용해 사용자가 선택한 메일 서비스(네이버 또는 구글)를 로드합니다. 만약 설정된 값이 없으면 기본적으로 'naver'가 선택됩니다.

```jsx
const clickButton = async (selector, tabId, nextFunc, interval = 50, maxAttempts = 10) => {
  let attempts = 0;

  console.log(attempts);

  const tryClickButton = async () => {
    attempts++;
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (selector) => {
        const button = document.querySelector(selector);
        console.log(`Attempting to click button: ${selector}`);
        if (button) {
          console.log(`Button found: ${button}`);
          button.click();
          return { clicked: true, url: window.location.href };
        } else {
          console.log(`Button not found: ${selector}`);
          return { clicked: false };
        }
      },
      args: [selector]
    });

    if (result.result.clicked) {
      const initialUrl = result.result.url;
      chrome.tabs.get(tabId, (tab) => {
        if (tab.url !== initialUrl) {
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
            if (tabId === currentTabId && changeInfo.status === 'complete' && tab.url !== initialUrl) {
              console.log(`${selector} button click complete and page loaded`);
              chrome.tabs.onUpdated.removeListener(listener);
              nextFunc();
            }
          });
        } else {
          nextFunc();
        }
      });
    } else if (attempts < maxAttempts) {
      console.log(`Retrying to click button: ${selector}, attempt ${attempts}`);
      setTimeout(tryClickButton, interval);
    } else {
      console.error(`Failed to click button: ${selector} after ${maxAttempts} attempts`);
      sendResponse({ status: "error", message: `Button not found: ${selector}` });
    }
  };

  tryClickButton();
};
```

- **`clickButton` 함수**: 이 함수는 웹 페이지에서 특정 버튼을 찾고 클릭하는 작업을 수행합니다. 버튼이 존재하지 않으면 주어진 횟수만큼 다시 시도하며, 성공하면 다음 작업을 진행합니다.
- **비동기 실행**: `async/await`을 사용해 비동기적으로 버튼 클릭 작업을 처리하고, 페이지가 완전히 로드될 때까지 기다립니다.

```jsx
const startMailAuthProcess = async () => {
  let mailUrl;
  if (mailOption === 'naver') {
    mailUrl = "https://mail.naver.com/v2/folders/0/all";
  } else if (mailOption === 'google') {
    mailUrl = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
  }

  chrome.tabs.create({ url: mailUrl, active: false }, (tab) => {
    const mailTabId = tab.id;

    const extractAuthCode = () => {
      chrome.scripting.executeScript({
        target: { tabId: mailTabId },
        func: (mailOption) => {
          return new Promise((resolve) => {
            const findMailLinks = async () => {
              let mailLinks;
              if (mailOption === 'naver') {
                await new Promise(resolve => setTimeout(resolve, 300));
                mailLinks = document.querySelectorAll('.mail_title_link');
              } else if (mailOption === 'google') {
                await new Promise(resolve => setTimeout(resolve, 320));
                mailLinks = document.querySelectorAll('.zA');
              }

              if (mailLinks && mailLinks.length > 0) {
                console.log("found mail", mailLinks[0]);
                mailLinks[0].click();

                const checkMailContent = async () => {
                  let contentElement;
                  if (mailOption === 'naver') {
                    const previousMail = document.querySelector('.icon_previous_mail');
                    if (previousMail) {
                      const mailItem = previousMail.closest('.mail_item');
                      const mailSender = mailItem.querySelector('.mail_sender').innerText;
                      console.log(mailSender);
                      if (mailSender.includes('IAMPS Admin')) {
                        console.log("Found previous mail from IAMPS Admin. Clicking...");
                        previousMail.click();
                      } else {
                        console.log("Previous mail exists but not from IAMPS Admin. Not clicking.");
                      }
                    } else {
                      console.log("No previous mail found.");
                    }

                    contentElement = document.querySelector('.mail_view_contents_inner');
                  } 
                  else if (mailOption === 'google') {
                    const newMail = document.querySelector('.ata-asJ');
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (newMail) {
                      newMail.click();
                    }
                    contentElement = document.querySelectorAll('.a3s.aiL');
                    contentElement = contentElement[contentElement.length - 1];
                  }

                  if (contentElement) {
                    const content = contentElement.innerText;
                    const match = content.match(/\b\d{6}\b/);
                    resolve(match ? match[0] : 'No auth code found');
                  } else {
                    setTimeout(checkMailContent, 100);
                  }
                };

                setTimeout(checkMailContent, 100);
              } else {
                setTimeout(findMailLinks, 100);
              }
            };

            findMailLinks();
          });
        },
        args: [mailOption]
      }).then(results => {
        const authCode = results[0].result || 'Auth code not found.';
        console.log("Auth code extracted:", authCode);

        if (authCode !== 'Auth code not found.' && authCode !== 'No mails found') {
          chrome.windows.getCurrent((currentWindow) => {
            chrome.tabs.query({ active: true, windowId: currentWindow.id }, (tabs) => {
              if (tabs.length === 0) {
                console.error("No active tab found.");
                sendResponse({ status: "error", message: "No active tab found." });
                chrome.tabs.remove(mailTabId);
                return;
              }

              const currentTabId = tabs[0].id;
              console.log("Current tab ID:", currentTabId);

              chrome.tabs.update(currentTabId, { active: true }, () => {
                chrome.tabs.remove(mailTabId, () => {
                  enterAuthCode(authCode, currentTabId, sendResponse);
                });
              });
            });
          });
        } else {
          sendResponse({ authCode: authCode });
          chrome.tabs.remove(mailTabId);
        }
      }).catch(error => {
        console.error("Scripting error:", error.message);
        sendResponse({ authCode: 'Error: ' + error.message });
        chrome.tabs.remove(mailTabId);
      });
    };

    extractAuthCode();
  });
};
```

  **`startMailAuthProcess`** : 이 함수는 메일 사이트에 접속하여 인증 코드를 추출하는 전체 과정을 처리합니다.

- **메일함 접근 및 링크 클릭**: 메일 사이트에 접속한 후, 가장 최신의 인증 메일을 찾아 클릭합니다.
- **인증 코드 추출**: 메일 내용에서 인증 코드를 추출하여, 이를 이후의 인증 프로세스에서 사용합니다.

```jsx
const enterAuthCode = async (authCode, currentTabId, sendResponse) => {
  chrome.scripting.executeScript({
    target: { tabId: currentTabId },
    func: async (code) => {
      const results = {
        authInputFound: false,
        submitButtonFound: false,
        submitButtonClicked: false
      };

      const authInput = document.querySelector('.pass input[type="password"]');
      if (authInput) {
        console.log("Auth input field found.");
        authInput.value = code;
        results.authInputFound = true;

        const event = new Event('input', { bubbles: true });
        authInput.dispatchEvent(event);

        console.log("#@");

        let attempts = 0;
        const maxAttempts = 20; // 최대 시도 횟수

        const clickSub = async () => {
          const button = document.querySelector('.log input[type="submit"][value="로그인"]');
          if (button) {
            console.log("Button found and clicked.");
            button.click();
          } else if (attempts < maxAttempts) {
            attempts++;
            console.log(`Button not found, retrying in 1 second (attempt ${attempts}).`);
            setTimeout(clickSub, 100); // 1초 후에 다시 시도
          } else {
            console.log("Max attempts reached. Stopping retry.");
          }
        };

        clickSub();
      } 
      else {
        console.log("@ Auth input field not found.");
        return results;
      }
    },
    args: [authCode]
  }).then(results => {
    console.log(results[0].result);
    sendResponse({ status: "success", results: results[0].result });
  }).catch(error => {
    console.error("Scripting error during auth code entry:", error.message);
    sendResponse({ status: "error", message: error.message });
  });
};
```

  **`enterAuthCode` :** 이 함수는 추출된 인증 코드를 로그인 페이지에 자동으로 입력하고, 로그인을 완료하는 작업을 처리합니다.

- **인증 입력 필드**: 페이지에서 인증 코드 입력 필드를 찾아 코드를 입력하고, 로그인 버튼을 클릭하여 인증을 완료합니다.

### 3. content.js

 `content.js` 파일은 크롬 확장 프로그램에서 웹 페이지의 DOM(Document Object Model)과 상호작용하는 스크립트를 정의합니다. 이 스크립트는 사용자가 특정 웹 페이지에 접근할 때 자동으로 로드되어, 페이지의 요소를 조작하거나 확장 프로그램과 상호작용하는 작업을 수행합니다. 이 파일은 웹 페이지에서 직접 실행되므로, 페이지의 특정 요소를 찾고, 이벤트를 처리하는 역할을 합니다.

 이 파일은 특정 URL 패턴과 일치하는 웹 페이지에서 "비밀번호 인증" 버튼을 찾고, 클릭 이벤트가 발생하면 확장 프로그램의 인증 프로세스를 시작하는 작업을 수행합니다.

```jsx
console.log("Content script loaded");

// URL 매칭 함수
const matchPattern = "https://iam2.#####.ac.kr/*"; //학교 이름은 #처리 하였음
const regex = new RegExp(matchPattern.replace("*", ".*"));

async function initialize() {
  console.log("DOM 초기화 시도");

  const currentUrl = window.location.href;
  console.log("현재 URL:", currentUrl);

  const isMatch = regex.test(currentUrl);
  console.log("URL 매칭 여부:", isMatch);
```

- **URL 매칭**: 스크립트가 특정 URL 패턴과 일치하는지 확인합니다. 여기서는 `https://iam2.#####.ac.kr/*` 패턴을 사용해, 사용자가 접속한 페이지가 이 패턴에 맞는지 검사합니다.
- **초기화 함수**: `initialize()` 함수는 DOM이 완전히 로드된 후, URL이 패턴과 일치하는지 확인하고, 일치할 경우 특정 작업을 수행하는 로직을 포함합니다.

```jsx
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
```

   **요소 대기 함수 (`waitForElement`)**: 이 함수는 특정 DOM 요소가 나타날 때까지 기다립니다. `interval` 간격으로 페이지를 확인하며, 지정된 `maxAttempts`만큼 시도한 후에도 요소를 찾지 못하면 에러를 반환합니다. 이 방식은 페이지 로드가 지연되거나 동적으로 추가되는 요소를 기다리는데 유용합니다.

```jsx
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded 이벤트 발생");
    initialize();
  });
} else {
  console.log("이미 DOM이 로드됨");
  initialize();
}
```

  **비밀번호 인증 버튼 탐색 및 이벤트 처리**:

- `waitForElement` 함수를 사용해 "비밀번호 인증" 버튼을 찾습니다. 이 버튼이 존재하면, 콘솔에 로그를 출력하고 클릭 이벤트 리스너를 등록합니다.
- 버튼이 클릭되면 `chrome.runtime.sendMessage`를 통해 백그라운드 스크립트에 `startAuthProcess` 메시지를 보내 인증 프로세스를 시작합니다.
- 만약 지정된 시간 내에 버튼을 찾지 못하면, 에러 메시지를 출력합니다.


## 4. 결과 및 성과

### 1. 결과 분석

 이번 프로젝트의 결과로, 2차 인증 과정을 크게 간소화할 수 있었습니다. 프로그램의 사용 전과 사용 후를 비교한 결과, 클릭 횟수와 로그인에 소요되는 시간을 대폭 줄일 수 있음을 확인했습니다.

---

1. **프로그램 미사용 시**:
    - 최소 **13번**의 클릭이 필요합니다.
    - 사용자는 다음과 같은 순서로 작업을 수행해야 합니다: 비밀번호 인증 버튼 클릭 → 로그인 버튼 클릭 → 외부 메일 버튼 클릭 → 새 탭 버튼 클릭 → 네이버 메일 접속 → 인증 메일 열기 → 인증 번호 복사 → 다시 학교 사이트로 돌아와 인증 번호 입력 → 로그인 버튼 클릭 → 로그인 완료.
    - 이 과정은 사용자에게 불편을 초래하며, 반복적인 작업으로 인해 시간이 소요됩니다.
2. **프로그램 사용 시**:
    - 단 **1번**의 클릭만으로 2차 인증 과정이 완료됩니다.
    - 사용자는 비밀번호 인증 버튼을 클릭하기만 하면 프로그램이 자동으로 외부 메일에 접속하고, 인증 메일을 찾아 인증 번호를 입력한 후, 최종적으로 로그인 절차를 완료합니다.
    - 이로 인해 사용자는 로그인 과정에서의 번거로움을 줄이고, 더 빠르고 효율적으로 작업을 수행할 수 있습니다.

 이 프로그램을 통해 사용자 경험이 크게 향상되었으며, 특히 반복적인 작업이 요구되는 환경에서 그 효과가 두드러지게 나타났습니다. 학교 로그인 시스템의 특성상 많은 학우들이 매일 2차 인증 과정을 거쳐야 하는데, 이 프로그램은 그 과정을 단순화하고 시간을 절약할 수 있는 강력한 도구가 될 것입니다.
