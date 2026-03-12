# GitHub 설정

GitHub을 설정하는 단계입니다. 비개발자 유저를 위해 쉽게 안내하세요.

## 진행 방법

### 1단계: GitHub 소개

유저에게 GitHub가 뭔지 쉽게 설명하세요:

"GitHub는 여러분이 만든 코드를 **안전하게 보관**하고 **관리**할 수 있는 서비스입니다.
마치 Google Drive가 문서를 저장하듯, GitHub는 코드를 저장합니다.
무료로 사용할 수 있어요!"

### 2단계: 계정 확인

"GitHub 계정이 있으신가요?"

- **있다면** → 3단계로
- **없다면** → `guides/github-onboarding.md`를 참조하여 가입 절차를 안내하세요.

### 3단계: Git 설정 확인

터미널에서 git 설정이 되어있는지 확인하세요:

```bash
git config user.name
git config user.email
```

설정이 안 되어있다면 유저에게 이름과 이메일을 물어보고 설정하세요.

### 4단계: GitHub CLI 확인

`gh` 명령어가 설치되어 있는지 확인하세요:

```bash
gh auth status
```

- 설치되어 있고 로그인되어 있다면 → 5단계로
- 설치되어 있지 않다면 → `guides/github-onboarding.md`의 "GitHub CLI 설치" 섹션 참조
- 설치되어 있지만 로그인이 안 되어있다면 → `gh auth login` 안내

### 5단계: 저장소(Repository) 생성

`project-brief.md`에서 서비스 이름을 참고하여 저장소를 생성하세요:

```bash
gh repo create [서비스-이름] --public --description "[한 줄 설명]"
```

생성된 저장소 정보를 `project-brief.md`에 기록:

```markdown
## GitHub 설정
- Repository: [URL]
- 상태: 준비 완료
```

### 6단계: 완료 안내

"GitHub 설정이 완료되었습니다! 이제 드디어 프로젝트 코드를 생성할 차례입니다!"

그리고 `/generate` 커맨드를 실행하세요.
