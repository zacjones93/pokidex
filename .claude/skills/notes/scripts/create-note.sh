#!/bin/bash
# Usage: ./create-note.sh "Note title" "file/path.tsx:123" "Description"

set -e

# Get timestamp and date
TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
DATE=$(date +%Y-%m-%d)
TIME=$(echo $TIMESTAMP | cut -d'-' -f4-6 | sed 's/-/:/g')

# Args
TITLE="$1"
FILE_REF="$2"
CURRENT_APPROACH="$3"
SUGGESTED_UPDATE="$4"
CONTEXT="$5"
CODE_SNIPPET="$6"

# Validate args
if [ -z "$TITLE" ] || [ -z "$FILE_REF" ]; then
    echo "Usage: $0 \"Note title\" \"file/path:line\" \"Current approach\" \"Suggested update\" \"Context\" \"Code snippet (optional)\""
    exit 1
fi

# Create notes dir if needed
mkdir -p docs/notes

NOTE_FILE="docs/notes/${DATE}.md"

# Check if file exists for append vs create
if [ -f "$NOTE_FILE" ]; then
    echo "Appending to existing note file..."
else
    echo "## [${DATE}]" > "$NOTE_FILE"
    echo "Created new note file: $NOTE_FILE"
fi

# Append note entry
cat >> "$NOTE_FILE" << EOF

### [${TIME}] - ${TITLE}

- **File**: ${FILE_REF}
- **Current approach/pattern**: ${CURRENT_APPROACH}
- **Suggested update**: ${SUGGESTED_UPDATE}
- **Context**: ${CONTEXT}
EOF

# Add code snippet if provided
if [ -n "$CODE_SNIPPET" ]; then
    cat >> "$NOTE_FILE" << EOF
- **Code reference**:
  \`\`\`typescript
  ${CODE_SNIPPET}
  \`\`\`
EOF
fi

cat >> "$NOTE_FILE" << EOF
- **Next steps**:
  - [ ] Review and evaluate
  - [ ] Implement changes if approved

EOF

echo "✓ Note added to $NOTE_FILE"
echo "View: cat $NOTE_FILE"
