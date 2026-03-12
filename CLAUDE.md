# Vibe Kit - 비개발자를 위한 프로젝트 초기화 SDK

이 프로젝트는 **비개발자가 Claude Code만으로 웹 프로젝트를 만들 수 있도록** 돕는 도구입니다.

## 핵심 동작

유저가 **"프로젝트 시작"** 이라고 입력하면 `/start` 커맨드를 실행하세요.

## 전체 플로우

```
"프로젝트 시작" → /start
  → 1. /brainstorming → 아이디어를 구체적인 기획으로 (project-brief.md 생성)
  → 2. /design → 디자인 정보 확인 및 추가
  → 3. /setup-supabase → 데이터베이스/인증 준비
  → 4. /setup-github → 코드 저장소 준비
  → 5. /generate → 실제 프로젝트 코드 생성 & push
```

## 기술 스택

- **프레임워크**: Next.js (App Router)
- **데이터베이스/인증**: Supabase
- **스타일링**: Tailwind CSS

## 커뮤니케이션 원칙

- 유저는 **비개발자**입니다. 기술 용어를 최소화하고 쉬운 말로 설명하세요.
- 각 단계마다 유저가 **직접 행동해야 할 것**을 명확히 안내하세요.
- 유저가 막히면 **스크린샷 기반**으로 설명하거나 대안을 제시하세요.
- 항상 **한국어**로 대화하세요.

## 주요 파일

- `.claude/commands/` - 각 단계별 커맨드 파일
- `guides/` - Supabase, GitHub 온보딩 가이드
- `templates/next-supabase/` - 프로젝트 보일러플레이트
- `project-brief.md` - 유저의 기획 문서 (brainstorming 단계에서 생성됨)
