#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Vibe Kit 루트 경로 (mcp-server의 상위 디렉토리)
const VIBE_KIT_ROOT = path.resolve(__dirname, "../..");

const server = new McpServer({
  name: "vibe-kit",
  version: "1.0.0",
});

// ─────────────────────────────────────────────
// 📁 Tools: 파일 시스템
// ─────────────────────────────────────────────

server.tool(
  "read_file",
  "파일 내용을 읽습니다",
  { file_path: z.string().describe("읽을 파일의 절대 경로") },
  async ({ file_path }) => {
    try {
      const content = fs.readFileSync(file_path, "utf-8");
      return { content: [{ type: "text", text: content }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `오류: ${e.message}` }], isError: true };
    }
  }
);

server.tool(
  "write_file",
  "파일을 생성하거나 수정합니다",
  {
    file_path: z.string().describe("파일의 절대 경로"),
    content: z.string().describe("파일에 쓸 내용"),
  },
  async ({ file_path, content }) => {
    try {
      const dir = path.dirname(file_path);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file_path, content, "utf-8");
      return { content: [{ type: "text", text: `✅ 파일 저장 완료: ${file_path}` }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `오류: ${e.message}` }], isError: true };
    }
  }
);

server.tool(
  "list_directory",
  "디렉토리의 파일 목록을 봅니다",
  { dir_path: z.string().describe("디렉토리의 절대 경로") },
  async ({ dir_path }) => {
    try {
      const items = fs.readdirSync(dir_path, { withFileTypes: true });
      const list = items
        .map((item) => `${item.isDirectory() ? "📁" : "📄"} ${item.name}`)
        .join("\n");
      return { content: [{ type: "text", text: list || "(빈 디렉토리)" }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `오류: ${e.message}` }], isError: true };
    }
  }
);

server.tool(
  "copy_directory",
  "디렉토리를 복사합니다 (템플릿 복사에 사용)",
  {
    source: z.string().describe("복사할 원본 디렉토리 절대 경로"),
    destination: z.string().describe("복사 대상 디렉토리 절대 경로"),
  },
  async ({ source, destination }) => {
    try {
      execSync(`cp -r "${source}" "${destination}"`);
      return { content: [{ type: "text", text: `✅ 복사 완료: ${source} → ${destination}` }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `오류: ${e.message}` }], isError: true };
    }
  }
);

// ─────────────────────────────────────────────
// 🖥️ Tools: 터미널 명령어 실행
// ─────────────────────────────────────────────

server.tool(
  "run_command",
  "터미널 명령어를 실행합니다 (npm, git, gh 등)",
  {
    command: z.string().describe("실행할 명령어"),
    cwd: z.string().optional().describe("작업 디렉토리 (선택)"),
  },
  async ({ command, cwd }) => {
    try {
      const output = execSync(command, {
        cwd: cwd || process.env.HOME,
        encoding: "utf-8",
        timeout: 120000,
        env: { ...process.env },
      });
      return { content: [{ type: "text", text: output || "(명령어 실행 완료)" }] };
    } catch (e: any) {
      const stderr = e.stderr || e.message;
      const stdout = e.stdout || "";
      return {
        content: [{ type: "text", text: `오류:\n${stderr}\n${stdout}` }],
        isError: true,
      };
    }
  }
);

// ─────────────────────────────────────────────
// 🚀 Tools: 프로젝트 시작 (워크플로우 가이드)
// ─────────────────────────────────────────────

server.tool(
  "start_project",
  "프로젝트를 시작합니다. 유저가 '프로젝트 시작', '시작', '만들어줘' 등을 말하면 반드시 이 도구를 먼저 호출하세요.",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: `[중요] 아래 가이드를 반드시 순서대로 따라 진행하세요. 절대 단계를 건너뛰지 마세요.
당신은 비개발자가 웹 서비스를 만들 수 있도록 도와주는 친절한 가이드입니다.
항상 한국어로 대화하고, 기술 용어를 최소화하세요.
유저의 답변을 기다린 후 다음으로 넘어가세요. 한꺼번에 여러 질문을 하지 마세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 1단계: 기획 브레인스토밍
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

먼저 유저에게 인사하고 이렇게 물어보세요:
"안녕하세요! 나만의 웹 서비스를 만들어볼 준비가 되셨나요? 😊 어떤 서비스를 만들고 싶으세요?"

유저의 답변을 듣고 추가로 물어보세요:
- "이 서비스는 누가 사용하게 되나요?"
- "이 서비스가 해결하려는 문제가 뭔가요?"

아이디어가 모호하면 "평소에 불편하다고 느꼈던 것이 있나요?"로 도와주세요.

아이디어가 충분히 파악되면 다음을 정리해서 유저에게 보여주세요:
- 서비스 이름(가제)
- 한 줄 설명
- 핵심 기능 3~5개
- 사용자 유형
- 주요 화면 목록

유저가 확인하면 write_file 도구로 프로젝트 작업 디렉토리에 project-brief.md를 저장하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 2단계: 디자인
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

유저에게 물어보세요: "혹시 미리 준비한 디자인이 있으신가요? (피그마, 이미지 파일 등)"

- 있으면 → 디자인 정보를 project-brief.md에 추가
- 없으면 → 두 가지 옵션 제시:
  A) "Google Stitch(https://stitch.withgoogle.com/)라는 AI 도구로 디자인을 만들 수 있어요"
  B) "제가 깔끔하게 만들어드릴게요! 선호하는 스타일이 있으면 알려주세요 (밝은/어두운, 미니멀/화려한 등)"

디자인 정보를 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗄️ 3단계: Supabase 설정
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

유저에게 설명하세요:
"다음은 데이터 저장소를 준비할 차례예요! Supabase라는 서비스를 사용하는데, 회원 정보나 게시글 같은 데이터를 저장하고 로그인 기능도 제공합니다. 무료예요!"

get_guide 도구로 'supabase' 가이드를 가져와서 단계별로 안내하세요.

유저에게 받아야 할 정보:
1. Project URL (예: https://xxxx.supabase.co)
2. anon key (공개 키)

받은 정보를 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐙 4단계: GitHub 설정
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

유저에게 설명하세요:
"이제 코드를 안전하게 보관할 곳을 만들 거예요! GitHub라는 서비스인데, Google Drive의 코드 버전이라고 생각하시면 됩니다."

get_guide 도구로 'github' 가이드를 가져와서 안내하세요.

run_command로 확인:
- git config user.name
- git config user.email
- gh auth status

설정이 안 되어있다면 가이드를 따라 안내하세요.
설정이 완료되면 run_command로 저장소를 생성하세요:
gh repo create [서비스-이름] --public --description "[한줄설명]"

GitHub URL을 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 5단계: 프로젝트 코드 생성
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. project-brief.md를 read_file로 읽고 유저에게 최종 확인
2. get_template_path로 템플릿 경로 확인
3. copy_directory로 템플릿을 새 프로젝트 디렉토리에 복사 (유저 홈 디렉토리 아래에)
4. write_file로 .env.local에 Supabase 정보 저장
5. 기획에 맞게 페이지, 컴포넌트, 스타일 코드를 write_file로 생성
6. run_command로 npm install && npm run build 실행
7. run_command로 git init, add, commit, push
8. 유저에게 축하 메시지와 다음 단계 안내:
   - "브라우저에서 http://localhost:3000 으로 확인"
   - "Vercel(https://vercel.com)에 배포하면 전 세계에 공개"

기술 스택: Next.js (App Router), Supabase, Tailwind CSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

지금 1단계부터 시작하세요! 인사와 함께 첫 번째 질문만 하세요.`,
        },
      ],
    };
  }
);

// ─────────────────────────────────────────────
// 📖 Tools: 가이드 & 템플릿
// ─────────────────────────────────────────────

server.tool(
  "get_guide",
  "비개발자를 위한 설정 가이드를 가져옵니다",
  {
    guide_name: z
      .enum(["supabase", "github"])
      .describe("가이드 이름: 'supabase' 또는 'github'"),
  },
  async ({ guide_name }) => {
    const guidePath = path.join(VIBE_KIT_ROOT, "guides", `${guide_name}-onboarding.md`);
    try {
      const content = fs.readFileSync(guidePath, "utf-8");
      return { content: [{ type: "text", text: content }] };
    } catch (e: any) {
      return { content: [{ type: "text", text: `오류: ${e.message}` }], isError: true };
    }
  }
);

server.tool(
  "get_template_path",
  "프로젝트 템플릿의 경로를 반환합니다",
  {},
  async () => {
    const templatePath = path.join(VIBE_KIT_ROOT, "templates", "next-supabase");
    const exists = fs.existsSync(templatePath);
    return {
      content: [
        {
          type: "text",
          text: exists
            ? `템플릿 경로: ${templatePath}`
            : "오류: 템플릿을 찾을 수 없습니다.",
        },
      ],
    };
  }
);

// ─────────────────────────────────────────────
// 📋 Prompts: 워크플로우 단계별 프롬프트
// ─────────────────────────────────────────────

server.prompt(
  "프로젝트-시작",
  "비개발자와 함께 웹 서비스를 만드는 전체 워크플로우를 시작합니다",
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `당신은 비개발자가 웹 서비스를 만들 수 있도록 도와주는 친절한 가이드입니다.
항상 한국어로 대화하고, 기술 용어를 최소화하세요.

다음 5단계를 순서대로 진행합니다. 한 단계가 끝나면 다음 단계로 자연스럽게 넘어가세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 1단계: 기획 브레인스토밍

유저에게 물어보세요:
- "어떤 서비스를 만들고 싶으세요?"
- "이 서비스는 누가 사용하나요?"
- "해결하려는 문제가 뭔가요?"

아이디어가 없다면 "평소 불편했던 것"부터 물어보세요.

파악이 되면 정리하세요:
- 서비스 이름(가제), 한 줄 설명
- 핵심 기능 3~5개
- 사용자 유형
- 주요 화면

정리 내용을 유저에게 확인받고, write_file 도구로 작업 디렉토리에 project-brief.md를 저장하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 2단계: 디자인

유저에게 물어보세요: "혹시 미리 준비한 디자인이 있으신가요?"

- 있으면: 디자인 정보를 project-brief.md에 추가
- 없으면 두 가지 옵션 제시:
  A) Google Stitch(https://stitch.withgoogle.com/)로 AI 디자인 생성
  B) "제가 깔끔하게 만들어드릴게요" → 선호 스타일(밝은/어두운, 미니멀/화려 등) 물어보기

디자인 정보를 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗄️ 3단계: Supabase 설정

"Supabase는 데이터를 저장하고 로그인 기능을 제공하는 서비스입니다. 무료예요!"

get_guide 도구로 'supabase' 가이드를 가져와서 안내하세요.

유저에게 받아야 할 정보:
1. Project URL (예: https://xxxx.supabase.co)
2. anon key

받은 정보를 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐙 4단계: GitHub 설정

"GitHub는 코드를 안전하게 보관하는 서비스입니다. Google Drive의 코드 버전이에요!"

get_guide 도구로 'github' 가이드를 가져와서 안내하세요.

run_command로 확인:
- git config user.name / user.email
- gh auth status

설정이 안 되어있다면 가이드를 따라 안내하세요.
설정이 완료되면 run_command로 저장소를 생성하세요:
gh repo create [서비스-이름] --public --description "[설명]"

GitHub URL을 project-brief.md에 추가하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 5단계: 프로젝트 코드 생성

1. project-brief.md를 읽고 유저에게 최종 확인
2. get_template_path로 템플릿 경로 확인
3. copy_directory로 템플릿을 새 프로젝트 디렉토리에 복사
4. write_file로 .env.local에 Supabase 정보 저장
5. 기획에 맞게 페이지, 컴포넌트, 스타일 코드를 생성
6. run_command로 npm install && npm run build
7. run_command로 git init, add, commit, push
8. 유저에게 축하 메시지와 다음 단계(Vercel 배포) 안내

기술 스택: Next.js (App Router), Supabase, Tailwind CSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

지금 유저에게 인사하고 1단계부터 시작하세요!`,
        },
      },
    ],
  })
);

// ─────────────────────────────────────────────
// 🚀 서버 시작
// ─────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
