
# Interactive Typography

Expert guidance on styling interactive text to clearly indicate clickability and action hierarchy, based on Shift Nudge principles.

## Guiding Principle

**The visual prominence of an interactive element should match the significance of its action.**

A primary, page-changing action (e.g., "Submit Form," "Purchase Now") should be more visually dominant than a secondary, contextual action (e.g., "Cancel," "Edit").

## Core Requirement

A user must immediately know what is clickable and what is not. Your styling choices define:
1. Whether text is interactive
2. What action it performs (navigation, task completion, data destruction)
3. The importance of that action

## Methods for Indicating Interactivity

### 1. Color

Use a distinct, consistent color for interactive elements.

**Best practices:**
* Choose a color that's noticeably different from body text
* Use the same color family for all similar actions
* Higher contrast = higher priority
* Reserve specific colors for specific action types:
  * Primary action: Brand color, high contrast
  * Secondary action: Subdued color, medium contrast
  * Destructive action: Red or warning color
  * Text links: Distinct link color (often blue for familiarity)

```css
/* Primary button */
background: #0066FF;
color: white;

/* Secondary button */
background: transparent;
color: #0066FF;
border: 1px solid #0066FF;

/* Text link */
color: #0066FF;
text-decoration: underline;

/* Destructive action */
color: #DC2626;
```

### 2. Weight & Style

Use a bolder weight or italic style to differentiate interactive text.

```css
/* Interactive text in a list */
font-weight: 600; /* Semibold vs Regular (400) */

/* Emphasized link */
font-weight: 500; /* Medium */
font-style: italic;
```

**Note**: Weight alone is often insufficient for indicating interactivity. Combine with color or decoration.

### 3. Decoration

Use underlines for text links, especially in body content.

**WCAG Accessibility Requirement**: Links within body text should always be underlined to distinguish them for color-blind users who cannot perceive color differences alone.

```css
/* Body text link */
color: #0066FF;
text-decoration: underline;

/* Optional: Remove underline on hover for feedback */
&:hover {
  text-decoration: none;
}

/* Or: Change underline style on hover */
&:hover {
  text-decoration-style: solid;
  text-decoration-thickness: 2px;
}
```

### 4. Background & Borders

Place text inside a button shape or give it a border.

**Hierarchy through treatment:**

```css
/* Primary: Filled background */
.button-primary {
  background: #0066FF;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
}

/* Secondary: Outline */
.button-secondary {
  background: transparent;
  color: #0066FF;
  border: 2px solid #0066FF;
  padding: 12px 24px;
  border-radius: 6px;
}

/* Tertiary: No background or border */
.button-tertiary {
  background: transparent;
  color: #0066FF;
  padding: 12px 24px;
  font-weight: 600;
}
```

### 5. Surrounding Elements

Pair text with an icon to indicate interactivity.

```html
<!-- Icon signals clickability -->
<button>
  <icon>→</icon>
  Continue
</button>

<!-- Icon reinforces action type -->
<button>
  <icon>🗑️</icon>
  Delete
</button>
```

**Best practice**: Icon + text is clearer than icon alone or text alone.

## Button Hierarchy

Establish clear hierarchy between primary, secondary, and tertiary actions.

### Primary Actions

The most important action on the screen.

**Characteristics:**
* Highest visual weight
* Solid, high-contrast background
* Prominent size
* Often the only filled button on screen

**Use cases:**
* Form submission
* Purchase/checkout
* Account creation
* Saving changes

```css
.button-primary {
  background: #0066FF;
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 28px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Secondary Actions

Important but not the primary focus.

**Characteristics:**
* Medium visual weight
* Outline or subtle background
* Similar size to primary
* Multiple can exist on screen

**Use cases:**
* Cancel/back
* Alternative actions
* Secondary navigation

```css
.button-secondary {
  background: white;
  color: #0066FF;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 28px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
}
```

### Tertiary Actions

Contextual, lower-priority actions.

**Characteristics:**
* Lowest visual weight
* Minimal styling (often just text + color)
* Smaller size
* Used for utility actions

**Use cases:**
* "Learn more" links
* Help/documentation links
* Settings/preferences
* Inline actions

```css
.button-tertiary {
  background: transparent;
  color: #6B7280;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 12px;
  text-decoration: underline;
}
```

### Destructive Actions

Actions that delete or remove data.

**Characteristics:**
* Red or warning color
* Clear, explicit labeling
* Often requires confirmation
* Visual treatment varies by severity

**Use cases:**
* Delete account
* Remove item
* Discard changes

```css
/* Destructive primary (dangerous) */
.button-destructive-primary {
  background: #DC2626;
  color: white;
  font-weight: 600;
  padding: 14px 28px;
}

/* Destructive secondary (safer) */
.button-destructive-secondary {
  background: transparent;
  color: #DC2626;
  border: 2px solid #DC2626;
  font-weight: 600;
  padding: 14px 28px;
}
```

## Text Links vs. Buttons

Distinguish between navigation (links) and actions (buttons).

### Links

Navigate to another page or section.

```css
/* Link in body text */
.text-link {
  color: #0066FF;
  text-decoration: underline;
  font-weight: inherit; /* Match surrounding text weight */
}

/* Standalone link */
.standalone-link {
  color: #0066FF;
  font-weight: 600;
  text-decoration: none;
}

.standalone-link:hover {
  text-decoration: underline;
}
```

### Buttons

Perform an action (submit, save, delete).

```css
.action-button {
  background: #0066FF;
  color: white;
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}
```

**Rule of thumb**: If it goes to a new page, it's a link. If it performs an action, it's a button.

## Interactive States

Always define hover, focus, active, and disabled states.

```css
.button {
  /* Base state */
  background: #0066FF;
  color: white;
  transition: all 150ms ease;
}

/* Hover: Subtle brightness increase */
.button:hover {
  background: #0052CC;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Focus: Obvious outline for keyboard navigation */
.button:focus {
  outline: 3px solid #93C5FD;
  outline-offset: 2px;
}

/* Active: Pressed state */
.button:active {
  background: #003D99;
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Disabled: Reduced opacity, no interaction */
.button:disabled {
  background: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
  box-shadow: none;
}
```

## Analysis Checklist

When reviewing interactive text, check:

### Clarity
- [ ] Can users immediately identify what's clickable?
- [ ] Are interactive elements visually distinct from static text?
- [ ] Do links in body text have underlines?
- [ ] Is color contrast sufficient (WCAG AA minimum)?

### Hierarchy
- [ ] Is there a clear primary action?
- [ ] Are secondary actions less prominent than primary?
- [ ] Do destructive actions use warning colors?
- [ ] Does visual weight match action importance?

### Consistency
- [ ] Do similar actions look similar?
- [ ] Are button styles consistent across the interface?
- [ ] Is the same color always used for the same type of action?

### States
- [ ] Are hover states defined?
- [ ] Is there a visible focus state for keyboard navigation?
- [ ] Do disabled states look inactive?
- [ ] Are transitions smooth and purposeful?

### Accessibility
- [ ] Are links underlined in body text?
- [ ] Is focus visible for keyboard users?
- [ ] Can elements be identified without color alone?
- [ ] Do interactive elements meet minimum size requirements (44x44px)?
