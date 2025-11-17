---
name: review-coordinator
description: Spawns 4 parallel review agents (Accessibility, React Router, React Core, Anders Hejlsberg) to conduct comprehensive multi-perspective code reviews
allowed-tools: Task, Read, Grep, Glob
---

# Review Coordinator Skill

Orchestrates comprehensive code reviews by spawning 4 specialized review agents in parallel:
1. **Marcy Sutton & Léonie Watson** - Inclusive design, semantic HTML, keyboard/screen reader accessibility
2. **React Router Team** - Progressive enhancement, nested routing, loaders/actions, web platform APIs
3. **React Core Team** - Declarative UI, functional design, state predictability
4. **Anders Hejlsberg** - Type safety, developer productivity, tooling ergonomics

## Critical Workflow

**When this skill is activated:**

1. **Gather context** - Identify what code to review (files, diffs, specific components)

2. **Spawn 4 agents in PARALLEL** - Use a SINGLE message with 4 Task tool calls:
   - Agent 1: Accessibility perspective (using `.claude/skills/review/references/a11y-reviewer.md`)
   - Agent 2: React Router perspective (using `.claude/skills/review/references/react-router-reviewer.md`)
   - Agent 3: React Core perspective (using `.claude/skills/review/references/react-reviewer.md`)
   - Agent 4: Anders Hejlsberg perspective (using `.claude/skills/review/references/anders-reviewer.md`)

3. **Collect results** - Each agent returns independent review findings

4. **Synthesize findings** - Combine all 4 perspectives into a unified report:
   - Group issues by severity (critical, major, minor)
   - Highlight where perspectives agree (cross-cutting concerns)
   - Note perspective-specific insights
   - Prioritize actionable recommendations

5. **Create daily note** - After synthesizing the review, use the notes skill to save findings:
   - **REQUIRED**: Read the template reference at `.claude/skills/notes/references/review-note-template.md`
   - Use `Skill("notes")` to activate the notes skill
   - Follow the review note template structure from the reference
   - Store in `docs/notes/reviews/[YYYY-MM-DD].md`

## Agent Prompts Template

Each spawned agent receives:
```
You are conducting a code review from the [PERSONA] perspective.

REQUIRED: First, read the persona reference file at .claude/skills/review/references/[reviewer-name].md to understand your review priorities, what to push back against, and your evaluation criteria.

Then review the following code:
[CODE/FILES/DIFF]

Apply your persona's specific priorities and provide:
1. Critical issues (blocking)
2. Major concerns (should fix)
3. Minor suggestions (nice to have)
4. What's done well

Format: Use clear headings, cite file:line numbers, provide concrete examples.
```

## Output Format

```markdown
# Multi-Perspective Code Review

## Executive Summary
[Brief overview of critical issues across all perspectives]

## Critical Issues
- **[Issue description]** - *Routing, TypeScript*
  - [Details with file:line references]
  - [Rationale from each reviewer]

## Major Issues
- **[Issue description]** - *TypeScript*
  - [Details with file:line references]
  - [Rationale]

## Minor Issues
- **[Issue description]** - *React*
  - [Details with file:line references]
  - [Rationale]

## What's Done Well
- **[Praise item]** - *Routing, TypeScript*
  - [What they liked and why]

## Detailed Reviewer Findings

### React Router Team
[Full review findings organized by severity]

### React Core Team
[Full review findings organized by severity]

### Anders Hejlsberg
[Full review findings organized by severity]

## Synthesis & Recommendations
[Unified action items prioritized by impact]
```

## Best Practices

- **Parallel execution**: ALWAYS spawn all 4 agents in a single message (4 Task calls)
- **Clear boundaries**: Each agent reviews independently without cross-talk
- **Concrete examples**: Agents should cite specific file:line references
- **Actionable output**: Synthesize into clear next steps, not just criticism
- **Balance**: Celebrate good patterns alongside flagging issues
- **Document findings**: After completing review, prompt user about creating a daily note using the notes skill

## Post-Review Workflow

After presenting the synthesized review to the user, offer to save the findings as a daily note:

```
Would you like me to save this review to your daily notes? I can create a structured note in docs/notes/reviews/[YYYY-MM-DD].md using the review note template.
```

If user agrees, use `Skill("notes")` and follow the review note template from `.claude/skills/notes/references/review-note-template.md`.

## When NOT to Use This Skill

- For single-perspective reviews (use the `review` skill directly)
- For automated testing (not code review)
- For implementation tasks (this skill only reviews, doesn't write code)
