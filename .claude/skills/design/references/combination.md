
# Combining Typography with Elements

Expert guidance on creating visual balance between text, icons, images, and other UI components, based on Shift Nudge principles.

## Core Principle

Most interfaces are a combination of text, icons, images, and other components. Creating visual balance between these different elements is key to a successful design.

**Three essential practices:**
1. Give text breathing room with generous negative space
2. Check balance at all levels (zoom out for composition, zoom in for details)
3. Align to the baseline for professional, stable layouts

## Negative Space Around Text

### Why Breathing Room Matters

Proper spacing prevents a cramped feeling, improves readability, and helps establish hierarchy.

### Minimum Spacing Guidelines

**Between text and container edges:**
```css
/* Minimum padding for cards/panels */
.card {
  padding: 20px; /* Mobile minimum */
}

/* Comfortable spacing */
.card {
  padding: 32px; /* Desktop standard */
}

/* Generous spacing for important content */
.hero-card {
  padding: 48px 64px;
}
```

**Between text elements:**
```css
/* Heading to body text */
h2 {
  margin-bottom: 16px; /* 1em equivalent for 16px text */
}

/* Paragraph spacing */
p + p {
  margin-top: 20px; /* 1.25em equivalent */
}

/* Section breaks */
section + section {
  margin-top: 64px; /* Clear visual separation */
}
```

**Around inline elements:**
```css
/* Icon + text */
.icon-text {
  gap: 8px; /* Minimum for 16px text */
}

/* Button padding */
button {
  padding: 12px 24px; /* Vertical: 0.75em, Horizontal: 1.5em */
}

/* Tag/badge spacing */
.tag {
  padding: 4px 12px;
  margin: 4px;
}
```

### The 8-Point Grid System

Use multiples of 8px for consistent spacing:

```css
/* Spacing scale based on 8px units */
--space-xs: 4px;   /* 0.5 units */
--space-sm: 8px;   /* 1 unit */
--space-md: 16px;  /* 2 units */
--space-lg: 24px;  /* 3 units */
--space-xl: 32px;  /* 4 units */
--space-2xl: 48px; /* 6 units */
--space-3xl: 64px; /* 8 units */
```

### Progressive Spacing

Increase spacing as content becomes more important:

```css
/* Tertiary content */
.metadata {
  padding: 8px 12px;
  margin: 8px 0;
}

/* Secondary content */
.card-content {
  padding: 20px;
  margin: 16px 0;
}

/* Primary content */
.hero-content {
  padding: 48px;
  margin: 32px 0;
}
```

## Checking Balance at All Levels

### Zoom Out (Composition Level)

Check the overall layout and visual weight distribution.

**Questions to ask:**
* Does the page feel top-heavy or bottom-heavy?
* Are large blocks of text balanced with images or whitespace?
* Is the visual weight evenly distributed across the viewport?
* Do headings create clear visual entry points?

**Common fixes:**
```css
/* Balance text-heavy section with image */
.text-image-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* Balance heavy header with spacer */
.content-with-header {
  padding-top: 120px; /* Account for fixed header height */
}

/* Create visual rhythm with consistent spacing */
.section {
  margin-bottom: 96px; /* Large, consistent gaps */
}
```

### Zoom In (Detail Level)

Refine micro-details of spacing, size, and color between adjacent elements.

**Check:**
* Spacing between icon and label
* Alignment of text with checkboxes/radio buttons
* Padding inside buttons and form fields
* Spacing between badge and text

**Example refinements:**
```css
/* Icon + text alignment */
.icon-label {
  display: flex;
  align-items: center; /* Vertical center */
  gap: 8px;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

/* Checkbox + label */
.checkbox-label {
  display: flex;
  align-items: flex-start; /* Align to top */
  gap: 12px;
}

.checkbox {
  margin-top: 2px; /* Optical alignment with first line */
}

/* Button icon spacing */
button {
  display: flex;
  align-items: center;
  gap: 10px;
}
```

## Baseline Alignment

### What Is Baseline Alignment?

The baseline is the invisible line that letters sit on (excluding descenders like 'g', 'p', 'y').

When aligning text horizontally with other elements, align to the **baseline** for a clean, stable, and professional appearance.

### Text + Text Baseline Alignment

```css
/* Two text elements side by side */
.label-value {
  display: flex;
  align-items: baseline; /* Not center! */
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 600;
}

.value {
  font-size: 24px;
  font-weight: 400;
}
```

**Result**: Even though the font sizes differ, the text appears properly aligned because they share a baseline.

### Text + Icon Alignment

Icons typically need optical adjustment to align with text baseline.

```css
/* Method 1: Position icon relative to text baseline */
.icon-text {
  display: inline-flex;
  align-items: baseline;
}

.icon {
  width: 20px;
  height: 20px;
  margin-bottom: -3px; /* Optical adjustment */
}

/* Method 2: Use relative positioning */
.icon {
  position: relative;
  top: 3px; /* Shift down to align with text */
}

/* Method 3: Use align-items: center for simple cases */
.simple-icon-text {
  display: flex;
  align-items: center; /* Acceptable for same-sized elements */
  gap: 8px;
}
```

**Pro tip**: The exact adjustment varies by icon and font. Always check visually.

### Text + Form Elements

Form inputs should align with their labels.

```css
/* Horizontal label + input */
.form-field {
  display: flex;
  align-items: baseline; /* Align label to input text */
  gap: 16px;
}

.label {
  font-size: 14px;
  min-width: 120px;
}

.input {
  font-size: 16px;
  padding: 10px 12px;
  /* Input text will align to label baseline */
}

/* Vertical label + input */
.form-field-vertical {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Space between label and input */
}
```

### Text + Badges/Tags

Badges next to text should align to the baseline or be optically centered.

```css
/* Baseline-aligned badge */
.title-with-badge {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #E5E7EB;
  transform: translateY(-2px); /* Optical adjustment */
}

/* Center-aligned for simpler layouts */
.tag-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
```

## Common Patterns

### 1. Icon + Label (Buttons, Menu Items)

```css
.button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
}

.button-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
```

### 2. Avatar + Text (User Info)

```css
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px; /* Tight spacing for related text */
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

.user-role {
  font-size: 12px;
  color: #6B7280;
}
```

### 3. Image + Caption

```css
.image-with-caption {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.caption {
  font-size: 14px;
  color: #6B7280;
  font-style: italic;
  padding: 0 8px; /* Slight indent */
}
```

### 4. Stats/Metrics Display

```css
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px; /* Very tight for cohesion */
  padding: 20px;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: #0066FF;
}

.stat-label {
  font-size: 14px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 5. List Item (Checkbox + Multi-line Text)

```css
.list-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #E5E7EB;
}

.checkbox {
  margin-top: 2px; /* Align with first line of text */
  flex-shrink: 0;
}

.item-content {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.item-description {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}
```

### 6. Card Header (Icon + Title + Action)

```css
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
}

.header-icon {
  width: 24px;
  height: 24px;
  color: #0066FF;
  flex-shrink: 0;
}

.header-title {
  flex: 1; /* Take remaining space */
  font-size: 18px;
  font-weight: 600;
}

.header-action {
  font-size: 14px;
  color: #0066FF;
  cursor: pointer;
}
```

## Responsive Considerations

Text + element combinations often need adjustment at different screen sizes.

```css
/* Desktop: Side-by-side */
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

/* Mobile: Stacked */
@media (max-width: 768px) {
  .feature {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

```css
/* Desktop: Horizontal layout */
.stat-group {
  display: flex;
  gap: 48px;
}

/* Mobile: Vertical layout with less gap */
@media (max-width: 768px) {
  .stat-group {
    flex-direction: column;
    gap: 24px;
  }
}
```

## Analysis Checklist

When reviewing text + element combinations, check:

### Spacing
- [ ] Is there adequate breathing room around all text (min 16-20px)?
- [ ] Are spacing values from a consistent scale (8px grid)?
- [ ] Does spacing increase for more important content?
- [ ] Is spacing too tight (causing cramped feel)?
- [ ] Is spacing too loose (causing disconnection)?

### Balance
- [ ] At composition level: Is visual weight well distributed?
- [ ] At detail level: Are micro-spacings refined?
- [ ] Do text-heavy sections have visual relief?
- [ ] Is there rhythm created by consistent spacing?

### Alignment
- [ ] Are text elements aligned to baseline?
- [ ] Are icons optically aligned with text?
- [ ] Do form elements align properly with labels?
- [ ] Are badges/tags positioned intentionally?
- [ ] Do multi-line elements align at the top?

### Responsiveness
- [ ] Do layouts adapt gracefully to smaller screens?
- [ ] Does spacing reduce appropriately on mobile?
- [ ] Do side-by-side elements stack on mobile?
- [ ] Is touch target size adequate on mobile (44x44px)?

### Flexibility
- [ ] Does layout handle varying content lengths?
- [ ] Do containers expand to fit content?
- [ ] Are icons set to not shrink (flex-shrink: 0)?
- [ ] Is text wrapping handled gracefully?
