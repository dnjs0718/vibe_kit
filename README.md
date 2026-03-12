# Vibe Kit

코딩을 몰라도 나만의 웹 서비스를 만들 수 있는 프로젝트 시작 키트입니다.

## 시작 방법 (2가지)

### 방법 1: Claude Desktop 앱 (추천 - 터미널 사용 최소화)

터미널이 익숙하지 않은 분에게 추천합니다.

1. [Claude Desktop](https://claude.ai/download) 앱을 설치하세요
2. 터미널에 아래 한 줄만 복사-붙여넣기하세요:

```bash
curl -fsSL https://raw.githubusercontent.com/dnjs0718/vibe_kit/main/install.sh | bash
```

3. Claude Desktop을 재시작하세요
4. 채팅창에 **"프로젝트 시작해줘!"** 라고 입력하세요

자세한 안내: [Claude Desktop 설치 가이드](guides/claude-desktop-setup.md)

---

### 방법 2: Claude Code (터미널)

터미널에 익숙한 분은 이 방법도 가능합니다.

```bash
git clone https://github.com/dnjs0718/vibe_kit.git
cd vibe-kit
claude
```

Claude Code가 실행되면 **"프로젝트 시작"** 이라고 입력하세요.

---

## 진행 순서

어떤 방법이든, Claude가 5단계로 안내합니다:

1. **기획** - 어떤 서비스를 만들고 싶은지 대화로 정리
2. **디자인** - 디자인 파일이 있으면 활용, 없으면 대안 제시
3. **Supabase 설정** - 데이터베이스와 로그인 기능 준비
4. **GitHub 설정** - 코드 저장소 준비
5. **프로젝트 생성** - 실제 코드 생성 및 배포 준비

## 필요한 것

- **Claude Pro 구독** ($20/월) - [가입하기](https://claude.ai)
- 인터넷 연결

나머지는 진행하면서 하나씩 안내해 드립니다.

## 기술 스택

- **Next.js** - 웹 프레임워크
- **Supabase** - 데이터베이스 + 로그인
- **Tailwind CSS** - 스타일링
