
# Typography Systems

Expert guidance on defining, documenting, and systematizing typography for design systems and style guides, based on Shift Nudge principles.

## Foundational Philosophy

Just as legal documents define terms for clarity, designers must define the purpose of their text styles. Every stylistic choice—font, size, weight, color—assigns a specific **meaning** and **function** to that text.

**The goal**: Build a clear, systematic language that prevents confusion and inconsistency.

## Defining Text Styles

### Ask the Core Questions

For every text style in your system, answer:

1. **What does this style signify?** 
   - Is it a title? A label? Helper text? A value?
2. **How is it differentiated from other text?**
   - Interactive vs. static?
   - Primary vs. secondary information?
3. **What function does it serve?**
   - Navigation? Data display? Actions? Metadata?

### Common Style Categories

Most design systems need styles for these categories:

**Structural:**
* Page titles (H1)
* Section headings (H2-H6)
* Body copy
* Captions/metadata

**Interactive:**
* Primary buttons
* Secondary buttons
* Text links
* Destructive actions

**Functional:**
* Labels (form fields, data)
* Values (numbers, user input)
* Helper text
* Error messages
* Success messages

**Specialized:**
* Navigation items
* Breadcrumbs
* Tags/badges
* Tooltips

## Naming Conventions

Clear naming helps teams use styles correctly and consistently.

### Approach 1: Semantic Naming

Names describe the **meaning** or **purpose**, not appearance.

```css
/* Good: Semantic names */
--text-heading-primary: ...
--text-heading-secondary: ...
--text-body-default: ...
--text-body-emphasis: ...
--text-caption: ...
--text-label: ...
--text-button-primary: ...
--text-link-default: ...
--text-error: ...
```

**Benefits:**
* Clear purpose
* Survives visual redesigns
* Self-documenting

**Drawbacks:**
* Requires discipline
* Can become verbose

### Approach 2: Scale-Based Naming

Names describe **size** within a systematic scale.

```css
/* Typography scale */
--text-xs: 12px;   /* Extra small */
--text-sm: 14px;   /* Small */
--text-base: 16px; /* Base/body */
--text-lg: 18px;   /* Large */
--text-xl: 20px;   /* Extra large */
--text-2xl: 24px;  /* 2X large */
--text-3xl: 30px;  /* 3X large */
--text-4xl: 36px;  /* 4X large */
--text-5xl: 48px;  /* 5X large */
```

**Benefits:**
* Simple and predictable
* Easy to learn
* Flexible application

**Drawbacks:**
* Less self-documenting
* Can lead to inconsistent usage

### Approach 3: Hybrid Naming

Combine semantic and scale naming for best of both worlds.

```css
/* Foundational scale */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;

/* Semantic tokens that reference scale */
--text-heading-1: var(--font-size-xl);
--text-heading-2: var(--font-size-lg);
--text-body: var(--font-size-base);
--text-caption: var(--font-size-sm);
--text-overline: var(--font-size-xs);
```

**Benefits:**
* Flexibility of scale
* Clarity of semantic naming
* Easy to maintain

**Recommended**: Use this hybrid approach for most design systems.

## Creating a Typography Token System

### Step 1: Define Foundational Tokens

Start with the raw values.

```css
/* Font families */
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-family-serif: 'Merriweather', Georgia, serif;
--font-family-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Font sizes (Rule of Four + extensions) */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;
--font-size-2xl: 32px;
--font-size-3xl: 48px;

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line heights */
--line-height-tight: 1.2;
--line-height-snug: 1.4;
--line-height-normal: 1.6;
--line-height-relaxed: 1.8;

/* Letter spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
--letter-spacing-wider: 0.1em;
```

### Step 2: Create Semantic Component Tokens

Combine foundational tokens into reusable styles.

```css
/* Headings */
--text-h1: var(--font-weight-bold) var(--font-size-3xl)/var(--line-height-tight) var(--font-family-sans);
--text-h2: var(--font-weight-bold) var(--font-size-2xl)/var(--line-height-tight) var(--font-family-sans);
--text-h3: var(--font-weight-semibold) var(--font-size-xl)/var(--line-height-snug) var(--font-family-sans);
--text-h4: var(--font-weight-semibold) var(--font-size-lg)/var(--line-height-snug) var(--font-family-sans);

/* Body text */
--text-body-lg: var(--font-weight-normal) var(--font-size-lg)/var(--line-height-relaxed) var(--font-family-sans);
--text-body: var(--font-weight-normal) var(--font-size-base)/var(--line-height-normal) var(--font-family-sans);
--text-body-sm: var(--font-weight-normal) var(--font-size-sm)/var(--line-height-normal) var(--font-family-sans);

/* UI text */
--text-button: var(--font-weight-semibold) var(--font-size-base)/1 var(--font-family-sans);
--text-caption: var(--font-weight-normal) var(--font-size-sm)/var(--line-height-normal) var(--font-family-sans);
--text-overline: var(--font-weight-semibold) var(--font-size-xs)/1 var(--font-family-sans);
--text-label: var(--font-weight-medium) var(--font-size-sm)/1 var(--font-family-sans);
```

### Step 3: Apply to Components

Use semantic tokens in your components.

```css
.heading-1 {
  font: var(--text-h1);
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.body-text {
  font: var(--text-body);
  color: var(--color-text-primary);
  max-width: 65ch;
}

.button-primary {
  font: var(--text-button);
  padding: var(--space-md) var(--space-lg);
  /* ... other styles */
}

.form-label {
  font: var(--text-label);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}
```

## Documentation Template

### Typography Scale Definition

Document your complete typography system.

```markdown
# Typography System

## Font Families

- **Sans-serif**: Inter (primary UI font)
- **Serif**: Merriweather (editorial content)
- **Monospace**: JetBrains Mono (code)

## Type Scale

Based on Rule of Four with extensions:

| Token | Size | Use Case |
|-------|------|----------|
| `xs` | 12px | Overlines, tertiary metadata |
| `sm` | 14px | Captions, helper text, secondary actions |
| `base` | 16px | Body text, primary UI text |
| `lg` | 18px | Subtitles, emphasized body |
| `xl` | 24px | Section headings, card titles |
| `2xl` | 32px | Page titles |
| `3xl` | 48px | Hero titles, marketing headers |

## Text Styles

### Headings

**Heading 1** (`h1`)
- Size: 48px (3xl)
- Weight: 700 (Bold)
- Line height: 1.1
- Use: Page titles, hero headings

**Heading 2** (`h2`)
- Size: 32px (2xl)
- Weight: 700 (Bold)
- Line height: 1.2
- Use: Major section titles

**Heading 3** (`h3`)
- Size: 24px (xl)
- Weight: 600 (Semibold)
- Line height: 1.3
- Use: Subsection titles, card headers

### Body Text

**Body Large**
- Size: 18px (lg)
- Weight: 400 (Regular)
- Line height: 1.7
- Use: Lead paragraphs, important content

**Body Default**
- Size: 16px (base)
- Weight: 400 (Regular)
- Line height: 1.6
- Max width: 65ch
- Use: Standard paragraph text

**Body Small**
- Size: 14px (sm)
- Weight: 400 (Regular)
- Line height: 1.5
- Use: Dense content, compact layouts

### Interactive Elements

**Primary Button**
- Size: 16px (base)
- Weight: 600 (Semibold)
- Transform: none
- Use: Primary actions

**Secondary Button**
- Size: 16px (base)
- Weight: 600 (Semibold)
- Transform: none
- Use: Secondary actions

**Text Link**
- Size: Inherit from context
- Weight: 500 (Medium)
- Decoration: underline
- Use: Navigation, in-text links

### UI Elements

**Label**
- Size: 14px (sm)
- Weight: 500 (Medium)
- Transform: uppercase
- Letter-spacing: 0.05em
- Use: Form labels, data labels

**Caption**
- Size: 14px (sm)
- Weight: 400 (Regular)
- Line height: 1.5
- Use: Image captions, timestamps

**Overline**
- Size: 12px (xs)
- Weight: 600 (Semibold)
- Transform: uppercase
- Letter-spacing: 0.1em
- Use: Eyebrows, category labels
```

## Iterative Process

Building a typography system is iterative. Don't try to be perfect from the start.

### Phase 1: Design & Apply

* Create individual components and screens
* Use typography naturally without overthinking
* Focus on solving immediate problems

### Phase 2: Abstract & Define

* Look for emerging patterns
* Pull out repeated styles
* Assign clear names and definitions
* Document the "why" behind each style

Example:
```markdown
**Button Text** 
- Size: 16px
- Weight: 600
- Why: Semibold weight makes buttons feel more tappable. 
  16px ensures readability at arm's length (mobile).
```

### Phase 3: Refine & Consolidate

* Review all definitions
* Look for opportunities to reuse
* Eliminate unnecessary variations
* Test across all contexts

**Questions to ask:**
* Can two similar styles be merged?
* Is this style used consistently?
* Does it need to exist, or can we use an existing style?
* Is the definition clear enough for others to use correctly?

### Phase 4: Solidify

* Lock in final definitions near project completion
* Create comprehensive documentation
* Build component library with examples
* Train team on usage

## Common Pitfalls

### 1. Too Many Styles Too Soon

**Problem**: Creating 20 different text styles on day one.

**Solution**: Start minimal. Add styles only when you have a clear need.

### 2. Inconsistent Application

**Problem**: Same-looking text using different styles in different places.

**Solution**: Audit regularly. Consolidate redundant styles.

### 3. Appearance-Based Naming

**Problem**: Styles named `blue-bold-text` or `20px-heading`.

**Solution**: Use semantic names that describe purpose, not appearance.

### 4. No Documentation

**Problem**: Styles exist but no one knows when to use them.

**Solution**: Document the "what," "why," and "when" for each style.

### 5. Ignoring Responsive Needs

**Problem**: Typography system doesn't account for mobile.

**Solution**: Define mobile variations where needed.

```css
/* Desktop */
--text-h1: 48px;

/* Tablet */
@media (max-width: 1024px) {
  --text-h1: 36px;
}

/* Mobile */
@media (max-width: 640px) {
  --text-h1: 32px;
}
```

## Maintenance Checklist

Regular system review ensures long-term consistency:

### Quarterly Review
- [ ] Are all styles still being used?
- [ ] Are there new patterns that need formalization?
- [ ] Is documentation up to date?
- [ ] Are there redundant styles to consolidate?

### Before Major Releases
- [ ] Audit all components for style consistency
- [ ] Check for rogue styles not in the system
- [ ] Update documentation with any changes
- [ ] Verify responsive behavior

### When Adding New Features
- [ ] Can existing styles be reused?
- [ ] If new style needed, does it fit the system?
- [ ] Document the new style immediately
- [ ] Update style guide with examples

## Analysis Checklist

When reviewing a typography system, check:

### Completeness
- [ ] Does it cover all common UI needs?
- [ ] Are interactive states defined?
- [ ] Are responsive variations included?
- [ ] Is there guidance for edge cases?

### Consistency
- [ ] Do similar elements use consistent styles?
- [ ] Is naming convention applied uniformly?
- [ ] Are scales mathematically coherent?
- [ ] Do weights progress logically?

### Usability
- [ ] Can designers easily choose the right style?
- [ ] Is documentation clear and accessible?
- [ ] Are examples provided for each style?
- [ ] Is the "why" explained, not just the "what"?

### Maintainability
- [ ] Are tokens properly abstracted?
- [ ] Can values be changed globally?
- [ ] Is there a clear process for updates?
- [ ] Are deprecated styles clearly marked?
