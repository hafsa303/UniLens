---
name: Orbital Intelligence
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
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
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  metric-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 32px
  gutter: 24px
  sidebar-width: 240px
  card-padding: 20px
  section-gap: 40px
---

## Brand & Style

The design system is engineered for high-stakes intelligence and deep-scale analytics. It targets data scientists, security analysts, and executive stakeholders who require high information density without cognitive overload. 

The aesthetic is **Sophisticated Minimalism** with a **Futuristic** edge. It leans heavily into a "Dark Mode First" philosophy to reduce eye strain during long analytical sessions while creating a premium, cinematic feel. The interface avoids standard decorative elements, opting instead for functional beauty—using light, transparency, and precision lines to guide the user's eye. The emotional response is one of calm, lethal efficiency and absolute clarity.

## Colors

The palette is anchored in deep, obsidian blacks and charcoals to provide a canvas for vibrant data visualizations. 

- **Primary & Secondary:** A range of Indigo and Periwinkle used for focus states, primary actions, and brand accents.
- **Surface Strategy:** Use `#0A0A0B` for the main application backdrop and `#111114` for elevated surfaces like cards and sidebars.
- **Borders:** Use low-alpha slate grays to create "ghost" boundaries that define structure without creating visual noise.
- **Indicators:** Small, high-saturation "glow" colors are used for status updates (e.g., active node, alert, system health). These should have a subtle outer glow (2-4px blur) to simulate a physical light source.

## Typography

Typography in this design system prioritizes precision and hierarchy. 

- **Display & Headlines:** Hanken Grotesk provides a modern, sharp geometric feel. Use tight letter-spacing for large titles to create a high-end editorial look.
- **Body:** Inter is used for its exceptional legibility in data-dense environments. Generous line-heights are essential to maintain "breathing room."
- **Data & Labels:** JetBrains Mono is used sparingly for technical labels, IDs, and timestamps. Its monospaced nature emphasizes the analytical, "machine-processed" feel of the platform.
- **Letter Spacing:** Increase letter-spacing for all labels and small body text to enhance clarity against dark backgrounds.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for the main content area, anchored by a fixed-width compact sidebar.

- **Negative Space:** Generous margins are mandatory. Data cards should not feel "packed"; they require significant padding to allow the user to focus on specific metrics.
- **Sidebar:** The navigation is collapsed by default or kept very slim (icons + text) to maximize the analytical workspace.
- **Breakpoints:**
  - **Desktop (1440px+):** Full 12-column visibility with dual-pane analytical views.
  - **Tablet (768px - 1024px):** Sidebar collapses to an icon-only rail; cards reflow to 2-column layouts.
  - **Mobile:** Single column stack; complex visualizations are replaced by summary metrics with "drill-down" capabilities.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Restrained Glassmorphism** rather than traditional heavy shadows.

- **The Base:** The primary background is the deepest value.
- **The Surface:** Metric cards and modals use a slightly lighter charcoal with a subtle 1px border (`border_subtle`).
- **Glassmorphism:** Modals, dropdowns, and navigation overlays should use a 12px backdrop-blur with a semi-transparent fill (`rgba(17, 17, 20, 0.7)`). This maintains the sense of space and context.
- **Depth Shadows:** Use extremely soft, large-radius shadows (e.g., `0 20px 40px rgba(0,0,0,0.4)`) only for elements that float above the layout, such as context menus or active tooltips.

## Shapes

The design system employs a **Rounded** shape language to soften the "industrial" feel of the dark UI.

- **Metric Cards:** Use `rounded-xl` (1.5rem / 24px) to create a soft, containerized look that feels modern and approachable.
- **Buttons & Inputs:** Use `rounded-lg` (1rem / 16px) for a consistent tactile feel.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from functional UI buttons.
- **Node Visualization:** Nodes in relationship maps should be perfect circles with a subtle outer glow to denote activity.

## Components

### Metric Cards
Sleek, non-boxy cards. They should feature a `label-sm` title, a `metric-xl` primary value, and a small sparkline or trend indicator. No heavy headers—use whitespace to separate the title from the data.

### Buttons
- **Primary:** Gradient fill (Indigo to Purple), white text, `rounded-lg`.
- **Secondary:** Ghost style with `border_subtle` and a hover state that increases border opacity.
- **Ghost:** No border or fill, primary color text; used for low-priority actions in lists.

### Input Fields
Minimalist design. Background should match the surface color (`#111114`) with a 1px `border_subtle`. On focus, the border transitions to the primary Indigo with a very subtle outer glow.

### Relationship / Node Visuals
Lines connecting nodes should be 1px wide, using `border_subtle` colors. Active connections should animate a pulse or use a gradient line. Nodes should vary in size based on data weight.

### Action Lists
Found in side-panels or modals. High-density, subtle dividers, and use `jetbrainsMono` for any ID-based data. Hover states should use a subtle background highlight (`rgba(255, 255, 255, 0.03)`).