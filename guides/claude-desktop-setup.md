# Claude Desktop으로 Vibe Kit 사용하기

터미널이 무서우신가요? 괜찮아요!
**Claude Desktop 앱**에서 채팅하듯이 웹 서비스를 만들 수 있습니다.

---

## 준비물

- **Claude 계정** (Pro 플랜 $20/월)
- **Mac 또는 Windows 컴퓨터**

---

## 설치 방법 (Mac 기준)

### 1단계: Claude Desktop 앱 설치

1. https://claude.ai/download 에 접속하세요
2. **"Download for Mac"** 버튼을 클릭하세요
3. 다운로드된 파일을 더블클릭하세요
4. Claude 앱을 **Applications 폴더**로 드래그하세요
5. 앱을 실행하고 로그인하세요

### 2단계: Vibe Kit 다운로드

1. 키보드에서 `Command + Space`를 누르세요 (Spotlight 검색)
2. **"터미널"** 이라고 입력하고 Enter를 누르세요
3. 아래 명령어를 **그대로 복사**해서 붙여넣고 Enter를 누르세요:

```
curl -fsSL https://raw.githubusercontent.com/dnjs0718/vibe_kit/main/install.sh | bash
```

> 💡 복사하려면: 위 텍스트를 드래그해서 선택 → Command+C
> 💡 붙여넣으려면: 터미널에서 Command+V

4. 설치가 자동으로 진행됩니다 (1~2분 소요)
5. "설치가 완료되었습니다!" 메시지가 나오면 터미널을 닫아도 됩니다

### 3단계: Claude Desktop에서 시작하기

1. **Claude Desktop 앱**을 종료했다가 다시 실행하세요
   - 상단 메뉴 바에서 Claude → Quit Claude 클릭
   - 다시 앱을 실행
2. 새 대화를 시작하세요
3. 채팅창 왼쪽 하단의 **📎 (첨부) 아이콘** 옆에 **🔧 (도구) 아이콘**이 보이면 설치 성공!
4. 채팅창에 이렇게 입력하세요:

```
프로젝트 시작해줘!
```

5. Claude가 차근차근 안내해줄 거예요. 대화하듯 따라가면 됩니다!

---

## 설치 방법 (Windows 기준)

### 1단계: Claude Desktop 앱 설치

1. https://claude.ai/download 에 접속하세요
2. **"Download for Windows"** 버튼을 클릭하세요
3. 다운로드된 설치 파일을 더블클릭하세요
4. 설치가 끝나면 앱을 실행하고 로그인하세요

### 2단계: Vibe Kit 다운로드

1. 키보드에서 `Windows + R`을 누르세요
2. **"powershell"** 이라고 입력하고 Enter를 누르세요
3. 아래 명령어를 복사해서 붙여넣고 Enter를 누르세요:

```
irm https://raw.githubusercontent.com/dnjs0718/vibe_kit/main/install.ps1 | iex
```

4. 설치가 완료되면 PowerShell을 닫아도 됩니다

### 3단계: Claude Desktop에서 시작하기

Mac과 동일합니다! Claude Desktop을 재시작하고 "프로젝트 시작해줘!" 라고 입력하세요.

---

## 사용 중 문제가 생기면?

| 문제 | 해결 방법 |
|------|-----------|
| 도구 아이콘이 안 보여요 | Claude Desktop을 완전히 종료 후 재시작 |
| 설치 중 오류가 나요 | 터미널에 나온 오류 메시지를 스크린샷 찍어서 공유해주세요 |
| Claude가 도구를 못 찾아요 | 2단계 설치를 다시 해보세요 |

---

## 이런 식으로 동작해요

```
나: "프로젝트 시작해줘!"
Claude: "안녕하세요! 어떤 서비스를 만들고 싶으세요?"
나: "동네 맛집을 공유하는 사이트요"
Claude: "좋은 아이디어네요! 몇 가지 더 여쭤볼게요..."
  ... (대화하면서 기획 → 디자인 → 설정 → 코드 생성)
Claude: "🎉 완성! 브라우저에서 확인해보세요!"
```

**터미널 명령어를 외울 필요 없어요.** Claude가 다 처리합니다!
