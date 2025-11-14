
# Typography Callouts

Expert guidance on creating impactful callouts, blockquotes, and pull quotes that add visual interest and draw attention to key information, based on Shift Nudge principles.

## What Are Callouts?

Callouts (also known as blockquotes or pull quotes) are used in content-heavy layouts to:
* Add visual interest and rhythm to long-form content
* Draw attention to key information
* Highlight testimonials or important quotes
* Break up dense text blocks
* Provide visual entry points for scanning readers

## Core Principle

A callout should be **immediately recognizable** as different from body content. It should stand out without disrupting the reading flow.

## Creating Effective Callouts

### 1. Change Scale & Case

Dramatically increase the text size or switch to ALL CAPS.

**Scale changes:**
* Double or triple the body text size
* Minimum scale ratio: 1.5x body size
* Optimal ratio: 2-3x body size

```css
/* Body text is 16px */
.body-text {
  font-size: 16px;
  line-height: 1.6;
}

/* Pull quote at 2x scale */
.pull-quote {
  font-size: 32px; /* 2x */
  line-height: 1.2; /* Tighter for larger text */
  font-weight: 600;
}

/* Or 3x for dramatic emphasis */
.featured-quote {
  font-size: 48px; /* 3x */
  line-height: 1.1;
  font-weight: 700;
}
```

**Case changes:**

```css
/* ALL CAPS callout */
.caps-callout {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.1em; /* Add spacing for caps */
  font-weight: 700;
  line-height: 1.4;
}
```

**Important**: Remember to tighten line height for larger text and add letter-spacing for ALL CAPS.

### 2. Use Color

Change the text or background color to create visual separation.

**Text color:**
```css
/* Colored text callout */
.callout-colored {
  color: #0066FF; /* Brand accent */
  font-size: 24px;
  font-weight: 600;
}

/* Subdued callout */
.callout-subdued {
  color: #6B7280; /* Gray for secondary info */
  font-size: 18px;
  font-style: italic;
}
```

**Background color:**
```css
/* Background panel callout */
.callout-panel {
  background: #F3F4F6; /* Light gray */
  padding: 24px;
  border-left: 4px solid #0066FF;
  margin: 32px 0;
}

/* High-contrast callout */
.callout-highlight {
  background: #FEF3C7; /* Soft yellow */
  padding: 20px 24px;
  border-radius: 8px;
}

/* Brand-colored callout */
.callout-brand {
  background: #0066FF;
  color: white;
  padding: 32px;
  border-radius: 12px;
}
```

**Warning**: Be careful not to use colors already assigned a specific function in your UI (e.g., error red, success green, primary link blue).

### 3. Add Supporting Elements

Combine text with graphic elements to create a compelling visual lockup.

**Quotation marks:**
```css
.quote-with-marks {
  position: relative;
  font-size: 28px;
  font-style: italic;
  padding-left: 40px;
}

.quote-with-marks::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -10px;
  font-size: 72px;
  color: #E5E7EB;
  font-family: Georgia, serif;
  line-height: 1;
}
```

**Horizontal lines:**
```html
<div class="callout-bordered">
  <div class="border-top"></div>
  <blockquote>Your impactful quote here</blockquote>
  <div class="border-bottom"></div>
</div>
```

```css
.callout-bordered {
  margin: 48px 0;
}

.border-top, .border-bottom {
  width: 60px;
  height: 3px;
  background: #0066FF;
  margin: 16px 0;
}
```

**User avatars (for testimonials):**
```html
<div class="testimonial">
  <img src="avatar.jpg" class="avatar" />
  <blockquote>"This changed how we work."</blockquote>
  <cite>Jane Doe, CEO at Company</cite>
</div>
```

```css
.testimonial {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px;
  background: #F9FAFB;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 16px;
}

blockquote {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 12px;
}

cite {
  font-size: 14px;
  color: #6B7280;
  font-style: normal;
}
```

**Icons:**
```css
.callout-with-icon {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: #EFF6FF;
  border-radius: 8px;
}

.icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: #0066FF;
}
```

### 4. Break the Grid

Intentionally position the callout to break the main layout grid. This creates tension and immediately draws the eye.

**Extend beyond content width:**
```css
/* Main content */
.article-content {
  max-width: 65ch;
  margin: 0 auto;
}

/* Callout breaks out */
.callout-breakout {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 48px 24px;
  background: #F3F4F6;
}
```

**Offset positioning:**
```css
.callout-offset {
  margin-left: -40px; /* Extend into left margin */
  padding-left: 40px;
  border-left: 4px solid #0066FF;
}

/* On mobile, reset */
@media (max-width: 768px) {
  .callout-offset {
    margin-left: 0;
    padding-left: 24px;
  }
}
```

**Floating callouts:**
```css
.callout-float {
  float: right;
  width: 300px;
  margin: 0 0 24px 32px;
  padding: 24px;
  background: #F9FAFB;
  border-left: 3px solid #0066FF;
}

@media (max-width: 768px) {
  .callout-float {
    float: none;
    width: 100%;
    margin: 32px 0;
  }
}
```

## Common Callout Patterns

### 1. Simple Blockquote

```css
.blockquote-simple {
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  color: #1F2937;
  margin: 48px 0;
  padding-left: 32px;
  border-left: 4px solid #0066FF;
}
```

### 2. Testimonial Card

```css
.testimonial-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 48px 0;
}

.testimonial-text {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.author-info {
  font-size: 14px;
}

.author-name {
  font-weight: 600;
  color: #1F2937;
}

.author-title {
  color: #6B7280;
}
```

### 3. Highlight Box

```css
.highlight-box {
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  color: white;
  padding: 40px;
  border-radius: 16px;
  margin: 48px 0;
}

.highlight-title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.9;
  margin-bottom: 12px;
}

.highlight-content {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
}
```

### 4. Pull Quote

```css
.pull-quote {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  color: #0066FF;
  margin: 64px auto;
  max-width: 600px;
  position: relative;
}

.pull-quote::before,
.pull-quote::after {
  content: '—';
  display: block;
  font-size: 24px;
  color: #E5E7EB;
  margin: 16px 0;
}
```

### 5. Info/Warning Callout

```css
/* Info callout */
.callout-info {
  background: #EFF6FF;
  border-left: 4px solid #3B82F6;
  padding: 20px 24px;
  margin: 32px 0;
}

/* Warning callout */
.callout-warning {
  background: #FFFBEB;
  border-left: 4px solid #F59E0B;
  padding: 20px 24px;
  margin: 32px 0;
}

/* Error callout */
.callout-error {
  background: #FEF2F2;
  border-left: 4px solid #EF4444;
  padding: 20px 24px;
  margin: 32px 0;
}

/* Success callout */
.callout-success {
  background: #F0FDF4;
  border-left: 4px solid #10B981;
  padding: 20px 24px;
  margin: 32px 0;
}
```

## Best Practices

### Frequency
* Use callouts sparingly—they lose impact if overused
* One callout per 500-1000 words of body text
* More than 3 callouts on a single screen feels cluttered

### Placement
* Position callouts at natural breaking points in content
* Use them to summarize or emphasize a preceding section
* Avoid interrupting a paragraph or thought mid-flow

### Content
* Keep callout text concise—under 50 words ideal
* The content should be self-contained and make sense out of context
* For pull quotes, extract the most impactful sentence

### Consistency
* Use similar styling for similar types of callouts
* Establish a system: testimonials look different from key takeaways
* Maintain consistent spacing before and after callouts

## Analysis Checklist

When reviewing callouts, check:

- [ ] Is the callout immediately distinguishable from body text?
- [ ] Does it use at least one strong differentiator (scale, color, or position)?
- [ ] Is line height appropriately tightened for larger text?
- [ ] Do colors avoid conflicting with functional UI colors?
- [ ] Are supporting elements (quotes, lines, icons) adding value?
- [ ] Does breaking the grid create tension without breaking layout?
- [ ] Is the callout frequency appropriate (not overused)?
- [ ] Is placement at natural content breaks?
- [ ] Is the content concise and self-contained?
- [ ] Is styling consistent with other similar callouts?
