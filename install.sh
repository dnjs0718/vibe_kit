#!/bin/bash
# Vibe Kit - 비개발자를 위한 원클릭 설치 스크립트

set -e

echo ""
echo "🎉 Vibe Kit 설치를 시작합니다!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ─────────────────────────────────────
# 1. Node.js 확인 및 설치
# ─────────────────────────────────────
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  echo "✅ Node.js 설치됨: $NODE_VERSION"
else
  echo "📦 Node.js를 설치합니다..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
      brew install node
    else
      echo "Homebrew를 먼저 설치합니다..."
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      brew install node
    fi
  else
    # Linux
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
  echo "✅ Node.js 설치 완료"
fi

# ─────────────────────────────────────
# 2. Vibe Kit 다운로드
# ─────────────────────────────────────
VIBE_KIT_DIR="$HOME/vibe-kit"

if [ -d "$VIBE_KIT_DIR" ]; then
  echo "✅ Vibe Kit 이미 존재: $VIBE_KIT_DIR"
else
  echo "📦 Vibe Kit을 다운로드합니다..."
  # TODO: 실제 GitHub repo URL로 교체
  # git clone https://github.com/dnjs0718/vibe_kit.git "$VIBE_KIT_DIR"
  echo "⚠️  GitHub 저장소 URL을 설정해주세요 (install.sh 파일의 git clone 부분)"
  exit 1
fi

# ─────────────────────────────────────
# 3. MCP 서버 빌드
# ─────────────────────────────────────
echo "🔧 MCP 서버를 빌드합니다..."
cd "$VIBE_KIT_DIR/mcp-server"
npm install --silent
npm run build --silent
echo "✅ MCP 서버 빌드 완료"

# ─────────────────────────────────────
# 4. Claude Desktop 설정
# ─────────────────────────────────────
CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

echo ""
echo "🔧 Claude Desktop에 Vibe Kit을 연결합니다..."

mkdir -p "$CLAUDE_CONFIG_DIR"

MCP_SERVER_PATH="$VIBE_KIT_DIR/mcp-server/dist/index.js"

if [ -f "$CLAUDE_CONFIG_FILE" ]; then
  # 기존 설정 파일이 있으면 백업
  cp "$CLAUDE_CONFIG_FILE" "$CLAUDE_CONFIG_FILE.backup"
  echo "   (기존 설정 백업 완료: claude_desktop_config.json.backup)"

  # 기존 설정에 vibe-kit 서버 추가
  # jq가 없으면 설치
  if ! command -v jq &> /dev/null; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
      brew install jq
    else
      sudo apt-get install -y jq
    fi
  fi

  # 기존 설정에 vibe-kit MCP 서버 추가
  jq --arg path "$MCP_SERVER_PATH" '
    .mcpServers["vibe-kit"] = {
      "command": "node",
      "args": [$path]
    }
  ' "$CLAUDE_CONFIG_FILE" > "$CLAUDE_CONFIG_FILE.tmp" && mv "$CLAUDE_CONFIG_FILE.tmp" "$CLAUDE_CONFIG_FILE"
else
  # 새 설정 파일 생성
  cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "vibe-kit": {
      "command": "node",
      "args": ["$MCP_SERVER_PATH"]
    }
  }
}
EOF
fi

echo "✅ Claude Desktop 설정 완료"

# ─────────────────────────────────────
# 완료!
# ─────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 설치가 완료되었습니다!"
echo ""
echo "📌 사용 방법:"
echo "   1. Claude Desktop 앱을 (재)실행하세요"
echo "   2. 채팅창에서 '프로젝트 시작' 프롬프트를 선택하세요"
echo "   3. 대화하면서 웹 서비스를 만드세요!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
