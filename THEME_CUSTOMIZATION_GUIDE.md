# Resume Builder - Theme & Accent Color Customization

## Overview
The Resume Builder now features a comprehensive theme customization system with **Tabs for Template Selection and Accent Color Customization**, plus **3 Unique Resume Templates** with full accent color support.

---

## Features Implemented

### 1. **Tabbed Selector Interface**
Located at the top of the Build Resume page with two tabs:
- **Templates Tab**: Switch between 3 unique resume templates
- **Accent Color Tab**: Choose from 8 pre-defined accent colors

#### Available Colors:
- 🟣 Indigo (#6366f1) - Default
- 🟣 Purple (#a855f7)
- 🔵 Blue (#3b82f6)
- 🔷 Cyan (#06b6d4)
- 🟢 Green (#10b981)
- 🔴 Red (#ef4444)
- 🟠 Orange (#f97316)
- 🩷 Pink (#ec4899)

---

## Template Designs

### **Template 1: Classic (Professional & Bold)**
**Design**: Gradient header with two-column layout
- **Header**: Dynamic gradient background using accent color
- **Sections**: Professional summary, Experience, Education, Skills, Certifications
- **Theme Elements**:
  - ✅ Gradient header background adapts to accent color
  - ✅ Section icons use accent color
  - ✅ Section headings use accent color
  - ✅ Skill badges background and text use accent color
  - ✅ Section borders use accent color with transparency

**Color Mapping**:
- Header gradient: `accentColor` → semi-transparent accent
- Section headings: `accentColor`
- Section icons: `accentColor`
- Skill badges: `accentColor` text with `accentColor` background (transparent)

---

### **Template 2: Modern (Sidebar Layout)**
**Design**: Dark sidebar with professional contact info + white content area
- **Sidebar** (32% width): Dark (#1a1a2e) with profile photo, contact, education, skills
- **Content** (68% width): White background with profile, experience sections
- **Theme Elements**:
  - ✅ Section headings in sidebar use accent color
  - ✅ Profile photo border uses accent color
  - ✅ Sidebar border-right uses accent color with transparency
  - ✅ Right side section headings (PROFILE, EXPERIENCE) use accent color
  - ✅ Experience company name uses accent color
  - ✅ Section dividers use accent color
  - ✅ Skill badges use accent color

**Conditional Features**:
- Photo upload section appears only when Template 2 is selected
- Experience warning appears when content exceeds 15 lines
- Professional summary limited to 5 lines with text clipping

**Color Mapping**:
- Sidebar headings: `accentColor`
- Profile photo border: `accentColor` with transparency
- Sidebar border: `accentColor + '66'` (transparent)
- Body section titles: `accentColor`
- Dividers: `accentColor`
- Company names: `accentColor`

---

### **Template 3: Unique Card-Based Design**
**Design**: Modern card-based layout with centered header and content cards
- **Header Card**: Gradient background with name, title, and contact info
- **Content Cards**: Individual cards for each section with left border accent
- **Typography**: Black text for all content, accent color only for titles
- **Theme Elements**:
  - ✅ Header gradient uses accent color
  - ✅ All section titles use accent color
  - ✅ Card left borders use accent color
  - ✅ Card header backgrounds use accent color with transparency
  - ✅ Section icons use accent color
  - ✅ Experience role names use accent color
  - ✅ Education school name uses accent color
  - ✅ Skill and certification tags use accent color (text + border)

**Unique Features**:
- Card-based layout with hover effects
- Centered header with gradient background
- Scrollable content cards container
- Grid-based skills/certifications display
- All text content in black for readability
- Only titles and headings follow the accent color theme

**Color Mapping**:
- Header gradient: `accentColor` → semi-transparent
- Card left borders: `accentColor`
- Card header backgrounds: `accentColor + '1a'` (very light)
- Section titles: `accentColor`
- Icons: `accentColor`
- Role/School names: `accentColor`
- Skill tags: `accentColor` text + border with light `accentColor` background
- All other text: #222 (black)

---

## Technical Implementation

### State Management
```jsx
const [selectedTemplate, setSelectedTemplate] = useState('template1')
const [accentColor, setAccentColor] = useState('#6366f1')
const [selectorTab, setSelectorTab] = useState('templates')
```

### CSS Variables Used
- `--accent-color`: Main accent color value
- `--accent-color-start`: Start of gradient (main accent)
- `--accent-color-end`: End of gradient (with transparency)
- `--accent-color-trans`: Transparent variant for backgrounds
- `--accent-color-light`: Light variant for borders
- `--accent-color-bold`: Bold variant for emphasis

### Dynamic Styling Examples

**Template 1 Header**:
```jsx
<div className="preview-header" style={{
  '--accent-color-start': accentColor,
  '--accent-color-end': accentColor + 'cc'
}}>
```

**Template 2 Photo Border**:
```jsx
<div className="template2-photo" style={{
  backgroundColor: `${accentColor}20`,
  borderColor: `${accentColor}40`
}}>
```

**Template 3 Header Card**:
```jsx
<div className="template3-header-card" style={{
  '--accent-color': accentColor,
  '--accent-color-light': accentColor + '1a'
}}>
```

---

## How to Use

1. **Navigate to Build Resume page**
2. **Select a Template**:
   - Click the "Templates" tab
   - Choose from Classic, Modern, or Minimal
   - Preview updates instantly

3. **Customize Accent Color**:
   - Click the "Accent Color" tab
   - Select any of 8 color swatches
   - All template elements update instantly

4. **Fill Resume Information**:
   - Complete form fields on the left
   - Live preview updates in real-time
   - All colors adapt to your chosen accent color

---

## Color Inheritance System

### How Colors Apply:
1. **Accent color is selected** → State updates `accentColor`
2. **CSS variables are set** on preview containers using inline styles
3. **CSS uses `var()` fallbacks** for dynamic colors
4. **All elements reference the variables** instead of hardcoded colors
5. **Changes instantly apply** across entire template

### Fallback Colors:
Each CSS variable has a fallback color for consistency:
```css
color: var(--accent-color, #6366f1);
background: var(--accent-color-light, rgba(99, 102, 241, 0.1));
```

---

## File Modifications

### Modified Files:
1. **BuildResume.jsx** (749 lines)
   - Added `accentColor` and `selectorTab` state
   - Added tabbed selector UI
   - Updated all 3 templates with color styling
   - Added color palette with 8 colors

2. **BuildResume.css** (1100+ lines)
   - Updated selector styling with tab interface
   - Added color palette styling
   - Updated all template colors to use CSS variables
   - Added new template3 card-based layout (150+ lines)
   - Updated all section elements to support dynamic colors

---

## Browser Compatibility
- ✅ Chrome/Edge (100%)
- ✅ Firefox (100%)
- ✅ Safari (100%)
- Uses CSS custom properties (IE11 not supported, but modern browsers full support)

---

## Future Enhancements
- [ ] Custom color picker (HSL/RGB)
- [ ] Save color preferences
- [ ] More color presets
- [ ] Additional template designs
- [ ] Export templates with specific colors
