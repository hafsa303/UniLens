---
name: Orbital Intelligence
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  surface-deep: '#000000'
  surface-elevated: '#1C1C1E'
  data-warning: '#F59E0B'
  border-muted: '#27272A'
  text-dim: '#888888'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style
The design system embodies "Clandestine Intelligence"—a sophisticated, high-fidelity aesthetic tailored for deep data analytics and AI-driven insights. It targets technical power users, analysts, and decision-makers who require high information density without cognitive overload.

The visual direction is a hybrid of **Minimalism** and **Glassmorphism**, drawing inspiration from precision engineering and modern developer tools. It emphasizes "Dark Mode" as the primary interface, utilizing depth, subtle luminosity, and high-quality typography to create a sense of focused expertise. The emotional response is one of calm authority, precision, and technological foresight.

## Colors
This design system utilizes a foundation of "Deep Charcoal" and "True Black" to maximize contrast and reduce eye strain during long-duration data sessions.

- **Primary & Secondary:** A duo of Indigo and Purple are used exclusively for interactive states, progress indicators, and active AI processes. These should be used with restraint to maintain the "clandestine" feel.
- **Surface Strategy:** Backgrounds are layered using `#000000` for the base canvas and `#131314` for primary containers. 
- **Luminosity:** Instead of heavy fills, use light-leak gradients and 1px borders with low-opacity indigo tints to define structure.

## Typography
Typography is the primary driver of the intelligence aesthetic. **Hanken Grotesk** provides a modern, clean, and highly legible sans-serif foundation for the bulk of the interface.

**JetBrains Mono** is introduced as a secondary functional typeface for metadata, coordinates, code snippets, and data labels, reinforcing the "technical intelligence" narrative. Large display titles should use tight letter-spacing, while mono labels should use increased tracking for better readability at small scales.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for dashboard views to ensure data visualization remains predictable and aligned. A 12-column system is used for desktop environments.

- **Breathing Room:** Utilize generous internal padding within cards (min 24px) to prevent data density from feeling cluttered.
- **Alignment:** All elements must align to a 4px baseline grid. 
- **Reflow:** On mobile, complex multi-column data grids should transition into searchable list views or prioritized "Signal" cards, maintaining the 16px safe-area margins.

## Elevation & Depth
Elevation is communicated through **Tonal Layers** and **Glassmorphism** rather than traditional heavy shadows.

- **Stacking:** The base layer is `#000000`. Content containers sit on `#131314`. Overlays and modals use a backdrop-filter (blur: 12px) with a semi-transparent `#1C1C1E` fill.
- **Glow:** Highly critical AI insights may feature a very subtle, diffused indigo outer glow (spread: 20px, opacity: 10%) to draw the eye.
- **Borders:** Define edges with 1px solid strokes. Use `#27272A` for standard boundaries and a linear-gradient (transparent to `#6366F1` at 20% opacity) for active or "hovered" elements.

## Shapes
The shape language is "Soft" and controlled. A 4px (0.25rem) radius is the standard for most UI elements, providing a technical, precise feel that isn't as aggressive as sharp corners nor as "consumer" as fully rounded ones. 

Larger containers like primary dashboard cards use an 8px (0.5rem) radius to create a distinct nesting hierarchy. Buttons and tags may occasionally use a pill-shape if they represent transient "chips" or status indicators, but structural elements should remain strictly geometric.

## Components
- **Buttons:** Primary buttons use a solid `#6366F1` fill with white text. Secondary buttons are "Ghost" style with a 1px border and no fill, intensifying on hover.
- **Inputs:** Fields are dark-filled (`#000000`) with a subtle bottom-border indicator that glows Indigo when focused.
- **Cards:** Utilize a "Glass-Dark" effect—dark background, 1px border, and a subtle inner shadow to simulate a recessed physical tray.
- **Data Tables:** High-density, borderless rows with subtle hover highlights. Use **JetBrains Mono** for numerical values to ensure tabular alignment.
- **AI Signals:** A custom component featuring a pulsing indigo dot and a soft background blur to indicate real-time intelligence processing.
- **Terminal Traces:** Small, monospaced text logs at the bottom of data modules to provide transparency into AI reasoning.