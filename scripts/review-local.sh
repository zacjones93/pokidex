#!/bin/bash
# Local script to trigger multi-perspective review

set -e

# Check if files specified
if [ -z "$1" ]; then
  echo "Usage: ./scripts/review-local.sh <files...>"
  echo "Example: ./scripts/review-local.sh app/routes/pokemon.\$id.tsx"
  exit 1
fi

FILES="$@"

echo "Running multi-perspective review on: $FILES"

# Use skill directly via claude CLI
claude --print \
  --system-prompt "$(cat .claude/skills/review-coordinator/skill.md)" \
  "Review these files with React Router, React Core, and Anders perspectives: $FILES"
