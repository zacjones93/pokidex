
# Typography Hierarchy

Expert guidance on creating visual hierarchy through typography, based on Shift Nudge principles.

## Foundational Principle: Visual Hierarchy

Hierarchy is the arrangement and presentation of elements in a way that implies importance. In UI design, it guides the user's attention to the most important information and actions on a screen.

A strong hierarchy answers these questions for the user:

* What is this screen about?  
* What is the most important information here?  
* What can I do on this screen?  
* What should I do first?

### Before Applying Typographic Rules

Define your screen's hierarchy by considering:

1. **User Goal**: Is the user exploring content or trying to accomplish a specific task?  
2. **Intended Action**: What is the primary action you want the user to take?  
3. **Information Priority**: What is the most critical piece of information? What is the second-most? Third?

Your answers will determine which elements (titles, actions, data) should be most prominent.

## The Rule of Four

### Core Concept

For consistent UI design, limit your typography to a maximum of **four distinct font sizes**. This is a flexible guideline; using fewer sizes is often better. The goal is to create a reliable system that users can learn.

### The Four Common Roles

Your chosen sizes should typically map to four common UI roles:

1. **Titles**: Primary headings
2. **Subtitles**: Secondary headings or body copy
3. **Actions**: Buttons, links, and interactive elements
4. **Metadata**: Captions, timestamps, and other tertiary info

### Example System: iOS

* **Titles & Actions**: 17pt  
* **Subtitles & Body**: 15pt  
* **Secondary Actions**: 13pt  
* **Metadata**: 11pt

### Application for Complex UIs

For larger websites or desktop apps, the Rule of Four can apply to individual, self-contained sections (e.g., a hero banner, a sidebar).

* **Guideline**: When different sections need unique font sizes, **reuse sizes** from other sections whenever possible to maintain consistency
* **Best Practice**: Avoid minor size variations. If you introduce a new size, ensure it's visually distinct by at least **2px** (e.g., use 14px and 16px, not 13px and 14px)

## Creating Hierarchy & Emphasis

Create a rich visual hierarchy by modifying text properties and context. These variations do **not** count toward your four-size limit.

### Font Weight (Intrinsic Property)

Font weight is a critical tool for establishing hierarchy, affecting readability, and signaling interactivity.

* **Source of Truth**: The available weights (e.g., Light, Regular, Medium, Bold, Black) are built into the typeface file itself. The font you choose dictates the weights you can use
* **Warning**: Avoid "faux bold" or "faux italics." These are low-quality, computer-generated styles used when a true bold/italic weight isn't available in the font file. Always use the weights provided by the typeface designer

### Visual Weight (Extrinsic Property)

You can create emphasis without changing font properties by manipulating the surrounding context.

* **Negative Space**: Surrounding an element with generous empty space makes it a focal point, giving it significant visual weight and importance
* **Color & Contrast**: A block of text on a high-contrast background (like a button) has heavy visual weight, drawing the user's attention regardless of the font's size or intrinsic weight

### Other Variations for Emphasis

**Case:**
* **UPPERCASE**: Appears larger. Good for small titles or primary buttons
* **Title Case**: Ideal for primary titles and can be used for actions
* **Sentence case**: The standard for body copy and paragraphs
* **lowercase**: Use sparingly, typically only for strong, specific branding reasons

**Other Modifiers:**
* **Style**: Use *italics* for emphasis
* **Position**: Change alignment to imply function (e.g., right-aligning a value in a settings list)
* **Decoration**: Use underlines or background colors, often to indicate interactivity

## Analysis Checklist

When reviewing a design, check:

1. Can users immediately identify the most important information?
2. Is there clear differentiation between primary, secondary, and tertiary content?
3. Are you using 4 or fewer distinct font sizes?
4. Do similar elements use consistent sizes?
5. Are size differences meaningful (at least 2px apart)?
6. Is font weight being used effectively to create hierarchy?
7. Is negative space being used to create visual weight?
