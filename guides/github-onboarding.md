# GitHub 시작하기 가이드

## GitHub란?

GitHub는 코드를 **안전하게 저장**하고 **버전 관리**할 수 있는 서비스입니다.
Google Drive가 문서를 저장하듯, GitHub는 코드를 저장합니다.

---

## 1단계: 회원가입

1. https://github.com 에 접속합니다
2. **"Sign up"** 버튼을 클릭합니다
3. 이메일, 비밀번호, 사용자 이름을 입력합니다
4. 이메일 인증을 완료합니다

---

## 2단계: Git 설정

터미널(명령어 입력창)에서 아래 명령어를 입력합니다.
이름과 이메일은 GitHub 가입 시 사용한 것으로 입력하세요.

```bash
git config --global user.name "본인이름"
git config --global user.email "이메일@example.com"
```

---

## 3단계: GitHub CLI 설치

코드를 GitHub에 올리려면 GitHub CLI라는 도구가 필요합니다.

### Mac 사용자

```bash
brew install gh
```

Homebrew가 없다면 먼저 설치하세요:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Windows 사용자

```bash
winget install --id GitHub.cli
```

---

## 4단계: GitHub CLI 로그인

```bash
gh auth login
```

실행하면 몇 가지 질문이 나옵니다:
1. `GitHub.com` 선택
2. `HTTPS` 선택
3. `Login with a web browser` 선택
4. 화면에 나오는 코드를 복사
5. 브라우저가 열리면 코드를 입력하고 승인

"Logged in as [사용자명]" 이 나오면 성공입니다!

---

## 자주 묻는 질문

**Q: 무료인가요?**
A: 네, 개인 사용은 완전 무료입니다. 공개/비공개 저장소 모두 무료로 만들 수 있습니다.

**Q: 꼭 GitHub CLI가 필요한가요?**
A: 필수는 아니지만, CLI를 사용하면 터미널에서 바로 코드를 올릴 수 있어 훨씬 편리합니다.
