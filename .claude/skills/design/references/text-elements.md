
# Typography Text Elements

Expert guidance on styling core text elements for optimal readability and hierarchy, based on Shift Nudge principles.

## Titles

Titles are your primary communication tool for establishing hierarchy and guiding user attention.

### Weight Guidelines

* **Weight**: Should be 2-3 steps heavier than body copy (e.g., Bold title with Regular body)
* **Large Titles**: Can use lighter weights, as size naturally adds prominence
* **Never**: Use thin, light, or hairline weights for titles at small sizes

### Line Height

Use tighter line spacing than body copy:

* **Title/Sentence case**: 100%–120%  
* **UPPERCASE**: 80%–100% (blockier letterforms allow for tighter spacing)

**Why**: Titles are meant to be read as a single unit, not line by line. Tighter spacing creates cohesion.

### Width & Alignment

**On large screens:**
* Use negative space generously
* Break long titles manually for visual balance
* Consider the title's relationship to the content below

**On small screens:**
* Ensure adequate padding (minimum 16-24px on sides)
* Plan for 1, 2, and 3-line titles
* Account for truncation (...) with user-generated content
* Test with longer-than-expected content

**Alignment:**
* Align left or center, but be consistent
* **Avoid**: Centering a title above a long, left-aligned block of body text
* **Match**: Title alignment to the alignment of supporting content

### Example Specifications

```css
/* Large hero title */
font-size: 48px;
font-weight: 700; /* Bold */
line-height: 1.1; /* 110% */
letter-spacing: -0.02em; /* Slight negative tracking */

/* Section heading */
font-size: 24px;
font-weight: 600; /* Semibold */
line-height: 1.2; /* 120% */
```

## Body Copy

Body copy is where readability matters most. These are the most important reading guidelines.

### Size

* **Default**: 16px is a common and safe default for readability
* **Adjust based on context**: 
  * Smaller (14px) for dense, technical information
  * Larger (18-20px) for editorial or marketing content
* **Never**: Go below 14px for primary reading content

### Weight

* **Use**: Book, Regular, or Medium
* **Never**: Use thin, light, or hairline weights for body copy
* **Why**: Light weights are difficult to read at small sizes, especially on screens

### Line Height (Leading)

The optimal range for readability is **125%–175%**:

* **Shorter line lengths** (mobile): Use tighter line height (125-140%)
* **Longer line lengths** (desktop): Use more generous line height (150-175%)
* **Dense information**: Tighter line height helps group related content
* **Comfortable reading**: More generous line height reduces eye strain

**Common mistake**: Using the same line height for all content. Adjust based on line length and density.

### Line Length (Measure)

The ideal line length is **45–75 characters** (including spaces).

* **Too short** (<45 characters): Creates choppy rhythm, frequent line breaks
* **Too long** (>75 characters): Makes it hard for the reader's eye to track from one line to the next
* **Solution**: On wide screens, use `max-width` to prevent lines from becoming too long

```css
/* Constrain line length for readability */
.body-text {
  max-width: 65ch; /* 65 characters */
  font-size: 16px;
  line-height: 1.6; /* 160% */
}
```

### Alignment

* **Default**: Left-aligned for blocks of text in left-to-right languages
* **Never**: Fully justify body text on screens (creates uneven spacing)
* **Center**: Only for very short text blocks (1-3 lines)
* **Right**: Rarely appropriate for body copy

### Example Specifications

```css
/* Standard body text */
font-size: 16px;
font-weight: 400; /* Regular */
line-height: 1.6; /* 160% */
max-width: 65ch;

/* Dense information (tables, specs) */
font-size: 14px;
font-weight: 400;
line-height: 1.4; /* 140% */

/* Editorial content */
font-size: 18px;
font-weight: 400;
line-height: 1.7; /* 170% */
max-width: 70ch;
```

## Letter-spacing (Tracking)

Letter-spacing is one of the most misused properties in web typography.

### The Golden Rule

* **ONLY** apply noticeable letter-spacing to **ALL CAPS** text
* **NEVER** add significant letter-spacing to l o w e r c a s e text

### Why

* Lowercase letterforms are designed with specific spacing relationships
* Adding letter-spacing disrupts the natural shape of words
* It harms readability by breaking visual word patterns
* All caps text benefits from slight spacing because capital letters are designed to be used together less frequently

### Guidelines

**ALL CAPS:**
```css
/* Small caps or uppercase labels */
text-transform: uppercase;
letter-spacing: 0.05em; /* 5% spacing */
font-size: 12px;
```

**Lowercase or Mixed Case:**
```css
/* Default - no adjustment */
letter-spacing: 0;

/* Large display text - slight negative tracking */
font-size: 72px;
letter-spacing: -0.02em; /* Tighten large text */
```

### Exception: Display Type

Very large text (>48px) can benefit from slight **negative** letter-spacing:

```css
.hero-title {
  font-size: 64px;
  letter-spacing: -0.02em; /* Tighten optically */
}
```

## Analysis Checklist

When reviewing text elements, check:

### Titles
- [ ] Is the title weight 2-3 steps heavier than body?
- [ ] Is line height appropriate for the case (100-120%)?
- [ ] Does the title have adequate negative space?
- [ ] Is alignment consistent with supporting content?
- [ ] Have you tested with longer content?

### Body Copy
- [ ] Is the font size at least 14px (preferably 16px)?
- [ ] Is the weight readable (Regular or Medium, not Light)?
- [ ] Is line height between 125-175%?
- [ ] Is line length between 45-75 characters?
- [ ] Is text left-aligned (for blocks)?

### Letter-spacing
- [ ] Is letter-spacing only applied to ALL CAPS?
- [ ] Is lowercase text using default spacing?
- [ ] Is large display text optically balanced?
