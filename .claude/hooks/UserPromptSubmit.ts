import type { UserPromptSubmitHookInput, HookJSONOutput } from "@anthropic-ai/claude-agent-sdk"

const input = await Bun.stdin.json() as UserPromptSubmitHookInput

const prompt = input.prompt.trim()

// Auto-activate skills based on prompt keywords
const skillActivations: { pattern: RegExp; skill: string; message: string }[] = [
  {
    pattern: /\b(research|study|investigate|analyze)\b/i,
    skill: "research",
    message: "🔍 INSTRUCTION: Use Skill(research) to handle this request with source verification."
  },
  {
    pattern: /\b(design|ux|ui|layout|styling)\b/i,
    skill: "design",
    message: "🎨 INSTRUCTION: Use Skill(design) to apply UI/UX best practices and design principles."
  },
  {
    pattern: /\b(diagram|architecture|ddd)\b/i,
    skill: "diagram",
    message: "📊 INSTRUCTION: Use Skill(diagram) to create or update diagrams following DDD methodology."
  },
  {
    pattern: /\b(review|critique|check code|code review)\b/i,
    skill: "review",
    message: "🔎 INSTRUCTION: Use Skill(review) to perform a comprehensive code review."
  },
  {
    pattern: /\b(github issue|gh issue|create issue)\b/i,
    skill: "github",
    message: "🐙 INSTRUCTION: Use Skill(github) to manage GitHub issues."
  },
  {
    pattern: /\b(note|notes|make a note|create a note|write a note)\b/i,
    skill: "notes",
    message: "📝 INSTRUCTION: Use Skill(notes) to create or manage project notes."
  }
]

// Check for skill activation matches
let matched = false
for (const activation of skillActivations) {
  if (activation.pattern.test(prompt)) {
    const output: HookJSONOutput = {
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: activation.message
      }
    }
    console.log(JSON.stringify(output, null, 2))
    matched = true
    break // Only activate first match
  }
}

// Always output something, even if no match
if (!matched) {
  const output: HookJSONOutput = {
    hookSpecificOutput: {
      hookEventName: "UserPromptSubmit"
    }
  }
  console.log(JSON.stringify(output, null, 2))
}
