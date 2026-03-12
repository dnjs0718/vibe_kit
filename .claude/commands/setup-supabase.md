# Supabase 설정

Supabase를 설정하는 단계입니다. 비개발자 유저를 위해 쉽게 안내하세요.

## 진행 방법

### 1단계: Supabase 소개

유저에게 Supabase가 뭔지 쉽게 설명하세요:

"Supabase는 여러분의 서비스에 필요한 **데이터 저장소**와 **로그인 기능**을 제공하는 서비스입니다.
예를 들어, 회원 정보를 저장하거나 게시글을 저장하는 데 사용됩니다.
무료로 시작할 수 있어요!"

### 2단계: 계정 생성 확인

"Supabase 계정이 있으신가요?"

- **있다면** → 3단계로
- **없다면** → `guides/supabase-onboarding.md`를 참조하여 가입 절차를 안내하세요.

### 3단계: 프로젝트 생성

`guides/supabase-onboarding.md`의 "프로젝트 생성" 섹션을 참조하여 안내하세요.

유저에게 다음 정보를 요청하세요:
1. **프로젝트 URL** (예: https://xxxx.supabase.co)
2. **anon key** (공개 키)

### 4단계: 연결 확인

Supabase MCP가 연결되어 있다면 이를 통해 연결을 확인하세요.
연결되어 있지 않다면, 유저가 제공한 URL과 key를 `project-brief.md`에 기록하세요:

```markdown
## Supabase 설정
- Project URL: [URL]
- Anon Key: [KEY]
- 상태: 준비 완료
```

### 5단계: 완료 안내

"Supabase 설정이 완료되었습니다! 다음은 GitHub을 설정할 차례입니다."

그리고 `/setup-github` 커맨드를 실행하세요.
