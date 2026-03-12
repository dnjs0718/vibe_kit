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
  echo "✅ 1/4 Node.js 확인 완료"
else
  echo "📦 1/4 Node.js를 설치합니다... (잠시만 기다려주세요)"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v brew &> /dev/null; then
      brew install node > /dev/null 2>&1
    else
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" > /dev/null 2>&1
      brew install node > /dev/null 2>&1
    fi
  else
    curl -fsSL https://deb.nodesource.com/setup_lts.x 2>/dev/null | sudo -E bash - > /dev/null 2>&1
    sudo apt-get install -y nodejs > /dev/null 2>&1
  fi
  echo "✅ 1/4 Node.js 설치 완료"
fi

# ─────────────────────────────────────
# 2. Vibe Kit 다운로드
# ─────────────────────────────────────
VIBE_KIT_DIR="$HOME/vibe_kit"

if [ -d "$VIBE_KIT_DIR" ]; then
  echo "✅ 2/4 Vibe Kit 이미 다운로드됨"
else
  echo "📦 2/4 Vibe Kit을 다운로드합니다..."
  git clone --quiet https://github.com/dnjs0718/vibe_kit.git "$VIBE_KIT_DIR"
  echo "✅ 2/4 Vibe Kit 다운로드 완료"
fi

# ─────────────────────────────────────
# 3. MCP 서버 빌드
# ─────────────────────────────────────
echo "🔧 3/4 MCP 서버를 준비합니다..."
cd "$VIBE_KIT_DIR/mcp-server"
npm install --silent 2>/dev/null
npm run build --silent 2>/dev/null
echo "✅ 3/4 MCP 서버 준비 완료"

# ─────────────────────────────────────
# 4. Claude Desktop 설정
# ─────────────────────────────────────
echo "🔧 4/4 Claude Desktop에 연결합니다..."

MCP_SERVER_PATH="$VIBE_KIT_DIR/mcp-server/dist/index.js"
NODE_PATH=$(which node)

# OS별 설정 파일 경로
if [[ "$OSTYPE" == "darwin"* ]]; then
  CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
else
  CLAUDE_CONFIG_DIR="$HOME/.config/Claude"
fi
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

mkdir -p "$CLAUDE_CONFIG_DIR"

if [ -f "$CLAUDE_CONFIG_FILE" ]; then
  cp "$CLAUDE_CONFIG_FILE" "$CLAUDE_CONFIG_FILE.backup"

  # python3으로 JSON 수정 (jq 설치 불필요)
  python3 -c "
import json
with open('$CLAUDE_CONFIG_FILE') as f:
    config = json.load(f)
if 'mcpServers' not in config:
    config['mcpServers'] = {}
config['mcpServers']['vibe-kit'] = {'command': '$NODE_PATH', 'args': ['$MCP_SERVER_PATH']}
with open('$CLAUDE_CONFIG_FILE', 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)
"
else
  cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "vibe-kit": {
      "command": "$NODE_PATH",
      "args": ["$MCP_SERVER_PATH"]
    }
  }
}
EOF
fi

echo "✅ 4/4 Claude Desktop 설정 완료"

# ─────────────────────────────────────
# 완료!
# ─────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 설치가 완료되었습니다!"
echo ""
echo "📌 사용 방법:"
echo "   1. Claude Desktop 앱을 (재)실행하세요"
echo "   2. 새 대화에서 '프로젝트 시작해줘!' 라고 입력하세요"
echo "   3. 대화하면서 웹 서비스를 만드세요!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
