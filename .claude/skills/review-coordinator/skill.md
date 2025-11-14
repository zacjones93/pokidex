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

## Critical Issues (All Reviewers)
[Issues flagged by multiple reviewers - highest priority]

## Accessibility Team Findings (Marcy Sutton & Léonie Watson)
### Critical
### Major
### Minor
### Praise

## React Router Team Findings
### Critical
### Major
### Minor
### Praise

## React Core Team Findings
### Critical
### Major
### Minor
### Praise

## Anders Hejlsberg Findings
### Critical
### Major
### Minor
### Praise

## Synthesis & Recommendations
[Unified action items prioritized by impact]
```

## Best Practices

- **Parallel execution**: ALWAYS spawn all 4 agents in a single message (4 Task calls)
- **Clear boundaries**: Each agent reviews independently without cross-talk
- **Concrete examples**: Agents should cite specific file:line references
- **Actionable output**: Synthesize into clear next steps, not just criticism
- **Balance**: Celebrate good patterns alongside flagging issues

## When NOT to Use This Skill

- For single-perspective reviews (use the `review` skill directly)
- For automated testing (not code review)
- For implementation tasks (this skill only reviews, doesn't write code)
