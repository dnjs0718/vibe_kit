# Supabase 시작하기 가이드

## Supabase란?

Supabase는 웹 서비스에 필요한 **데이터베이스**와 **로그인 기능**을 제공하는 클라우드 서비스입니다.
무료 플랜으로 충분히 시작할 수 있습니다.

---

## 1단계: 회원가입

1. https://supabase.com 에 접속합니다
2. 우측 상단 **"Start your project"** 버튼을 클릭합니다
3. **GitHub 계정**으로 로그인하는 것을 추천합니다 (GitHub 계정이 없다면 이메일로 가입)

---

## 2단계: 새 프로젝트 만들기

1. 로그인 후 **"New Project"** 버튼을 클릭합니다
2. 아래 정보를 입력합니다:
   - **Organization**: 기본값 사용 (처음이면 자동 생성됨)
   - **Project name**: 서비스 이름 입력 (예: my-todo-app)
   - **Database Password**: 비밀번호 설정 (**반드시 기억해두세요!**)
   - **Region**: `Northeast Asia (Seoul)` 선택
3. **"Create new project"** 클릭
4. 프로젝트가 생성될 때까지 1~2분 기다립니다

---

## 3단계: API 키 확인

프로젝트가 생성되면 API 키를 확인해야 합니다.

1. 왼쪽 메뉴에서 **⚙️ Project Settings** 클릭
2. **API** 탭 클릭
3. 아래 두 가지를 복사해두세요:

   - **Project URL**: `https://xxxx.supabase.co` 형태
   - **anon (public) key**: `eyJ...` 로 시작하는 긴 문자열

이 두 값을 Claude에게 알려주시면 됩니다.

---

## 자주 묻는 질문

**Q: 무료인가요?**
A: 네, 무료 플랜으로 2개 프로젝트를 만들 수 있고, 개인 프로젝트에 충분한 용량을 제공합니다.

**Q: 신용카드가 필요한가요?**
A: 무료 플랜은 신용카드 없이 사용할 수 있습니다.

**Q: 데이터가 어디에 저장되나요?**
A: Seoul 리전을 선택하면 한국에 가까운 서버에 저장됩니다.
