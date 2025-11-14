# Pokidex Diagrams Index

Unified Impact Diagrams (DDD methodology) documenting user value and technical implementation across the Pokidex application.

## Architecture

- [Data Loading Patterns](architecture/arch-data-loading-patterns.md) - SSR, lazy loading, and image streaming patterns that ensure fast initial page loads and progressive enhancements

---

## How to Use These Diagrams

Each diagram follows **Diagram Driven Development (DDD)** principles:
- **Front-Stage**: What users see and experience
- **Back-Stage**: Technical implementation that enables the experience
- **Impact Annotations**: Why each technical component matters to users

Use diagrams to:
- Understand system architecture from a user-value perspective
- Plan new features by connecting user needs to technical enablers
- Review code changes by visualizing impact on user experience
- Onboard new team members with clear system documentation

## Adding New Diagrams

1. Create diagram in appropriate subdirectory (`features/`, `architecture/`, `journeys/`, etc.)
2. Follow file naming: `{type}-{descriptive-name}.md`
3. Include all required sections: Purpose, Diagram, Key Insights, Related Files
4. Update this index
5. Commit with descriptive message

See `.claude/skills/diagram/` for detailed guidelines.
