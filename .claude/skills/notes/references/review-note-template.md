# Code Review Note Template

Use this template when creating daily notes from code reviews.

## Structure

```markdown
### [HH:MM:SS] - Code Review: [Component/File Name]

**File**: path/to/file.tsx

**Reviewers**: [Accessibility, React Router, React Core, TypeScript, etc.]

#### Critical Issues (Blocking)
1. **[Issue Title]** (line X)
   - Problem: [description]
   - Impact: [user/developer impact]
   - Fix: [concrete solution]

2. **[Issue Title]** (line Y)
   - Problem: [description]
   - Impact: [user/developer impact]
   - Fix: [concrete solution]

#### Major Issues (Should Fix)
- **[Issue Title]** (line X): [brief description and fix]
- **[Issue Title]** (line Y): [brief description and fix]

#### Minor Issues
- **[Issue Title]** (line X): [brief description]
- **[Issue Title]** (line Y): [brief description]

#### What's Done Well
- **[Strength]**: [why this is good]
- **[Strength]**: [why this is good]

#### Next Steps
- [ ] Fix critical issues (items 1-N)
- [ ] Address major concerns
- [ ] Consider minor improvements
- [ ] Run tests and verify fixes
```

## Guidelines

1. **Organize by severity**: Critical → Major → Minor
2. **Include line numbers**: Always cite specific locations
3. **Concrete fixes**: Don't just identify problems, propose solutions
4. **Balance criticism with praise**: Note what's done well
5. **Actionable next steps**: Convert findings into todos
6. **Multiple perspectives**: Note which reviewer(s) flagged each issue
7. **Cross-cutting concerns**: Highlight issues multiple reviewers agreed on

## When to Use

- After running multi-perspective code reviews (review-coordinator)
- When documenting single-perspective reviews (review skill)
- For post-implementation review notes
- When capturing technical debt identified during reviews

## Storage Location

All review notes are stored in `docs/notes/reviews/[YYYY-MM-DD].md` to separate them from regular development notes.
