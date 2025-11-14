---
name: notes
description: DO NOT USE THE APPLICATION NOTE SERVICE. Maintain and organize daily notes for the current project. Create, update, and manage these notes in a structured manner upon user request. Use this skill when the user requests "please make|create|write|add a note...".
allowed-tools: Bash, Glob, Read
---

# Notes Skill

Centralizes project development notes so Claude captures important insights, decisions, and learnings in a structured, timestamped format.

## Critical Workflow

**REQUIRED**: Use the `create-note.sh` script for ALL note creation:

```bash
./.claude/skills/notes/scripts/create-note.sh "Title" "file:line" "Body"
```

**Guidelines**:
1. **Always use the script**—it handles timestamps, file creation, and formatting
2. **Body format**: Use markdown with code blocks, evaluation points, next steps
3. **Keep it concise**: Focus on actionable insights
4. **IMPORTANT**: When user mentions "push to github" or creating issues, use `Skill("github")` tool (NOT bash `gh` commands)

## Note Structure

Use this format for all notes unless prompted otherwise:

```markdown
## [YYYY-MM-DD]

### [HH:MM:SS] - Brief note title

- **File**: path/to/file.tsx:line-number
- **Current approach/pattern**: description of current implementation
- **Suggested update**: description of improvement or change
- **Context**: explanation of why this matters
- **Code reference**:
  \`\`\`typescript
  // relevant code snippet
  \`\`\`
- **References**: (only if researched)
  - link 1
  - link 2
- **Next steps**:
  - step 1
  - step 2
```

## Key Guidelines

- Always include file paths with line numbers when referencing code
- Use code blocks to highlight relevant source code
- Timestamp each entry for tracking when insights were captured
- Include "Next steps" to actionable items from the note
- Keep references lean—only include if you performed research
- Don't over-explain; be concise and direct

## Helper Script

For quick note creation from the command line, use the included script:

```bash
# Usage
./.claude/skills/notes/scripts/create-note.sh \
  "Note title" \
  "file/path.tsx:123" \
  "Description of the note"

# Example
./.claude/skills/notes/scripts/create-note.sh \
  "Extract Pokemon type logic" \
  "app/components/pokemon-card.tsx:45" \
  "Type colors hardcoded, should use getTypeColor utility"
```

The script automatically:
- Generates timestamp in correct format
- Creates or appends to today's note file
- Maintains consistent note structure
- Creates `docs/notes/` directory if needed