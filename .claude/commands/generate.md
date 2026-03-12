# 프로젝트 코드 생성

`project-brief.md` 기반으로 실제 프로젝트 코드를 생성하는 최종 단계입니다.

## 진행 방법

### 1단계: 기획 확인

`project-brief.md`를 읽고 유저에게 최종 확인:

"지금까지 정리된 내용을 바탕으로 프로젝트를 생성하겠습니다. 시작할까요?"

### 2단계: 프로젝트 디렉토리 생성

`project-brief.md`의 서비스 이름으로 새 디렉토리를 만드세요.
`templates/next-supabase/` 보일러플레이트를 기반으로 프로젝트를 생성합니다.

```bash
# 프로젝트 루트 밖에 새 프로젝트 디렉토리 생성
cp -r templates/next-supabase/ ../[서비스-이름]/
cd ../[서비스-이름]/
```

### 3단계: 환경 변수 설정

`project-brief.md`의 Supabase 정보로 `.env.local` 파일을 생성하세요:

```
NEXT_PUBLIC_SUPABASE_URL=[Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Anon Key]
```

### 4단계: 기획에 맞게 코드 커스터마이징

`project-brief.md`의 핵심 기능과 주요 화면을 기반으로:

1. **페이지 생성** - 주요 화면별 라우트 생성 (`app/` 디렉토리)
2. **컴포넌트 생성** - 필요한 UI 컴포넌트 생성
3. **데이터베이스 스키마** - Supabase에 필요한 테이블 정의
4. **인증 플로우** - 로그인/회원가입이 필요하면 구현

디자인 섹션의 스타일 정보를 반영하여 Tailwind CSS로 스타일링하세요.

### 5단계: 의존성 설치 및 테스트

```bash
npm install
npm run dev
```

정상 실행 확인 후 유저에게 로컬 주소 안내:
"브라우저에서 http://localhost:3000 을 열어보세요!"

### 6단계: GitHub에 Push

```bash
git init
git add .
git commit -m "Initial commit: [서비스 이름]"
git remote add origin [GitHub Repository URL]
git push -u origin main
```

### 7단계: 완료 축하

유저에게 완료 메시지를 전달하세요:

"축하합니다! 여러분의 [서비스 이름]이 완성되었습니다!

**다음 단계로 할 수 있는 것들:**
- `npm run dev`로 로컬에서 확인
- Vercel(https://vercel.com)에 배포하면 전 세계 누구나 접속 가능
- 추가 기능이 필요하면 언제든 Claude Code에서 요청

수고하셨습니다!"
