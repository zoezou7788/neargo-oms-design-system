// ═══════════════════════════════════════════════════════════════
// NearGo OMS Component Library — Figma Plugin  v2.1 (fixed)
// Design System v2.0 · Built on Radix UI color scale methodology
// ═══════════════════════════════════════════════════════════════

figma.showUI(__html__, { width: 360, height: 430, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    try {
      await generateLibrary();
      figma.ui.postMessage({ type: 'done' });
      figma.notify('✓ NearGo Component Library ready!', { timeout: 4000 });
    } catch (err) {
      console.error('[NearGo Plugin Error]', err);
      figma.ui.postMessage({
        type: 'error',
        message: (err && err.message) ? err.message : String(err),
      });
    }
  }
  if (msg.type === 'close') figma.closePlugin();
};

function step(id, state, pct, label) {
  figma.ui.postMessage({ type: 'step', id, state, pct, label });
}

// ═══════════════════════════════════════════════════════════════
async function generateLibrary() {

  // ── 0. Load all pages (required when documentAccess = "dynamic-page") ───
  await figma.loadAllPagesAsync();

  // ── 1. Font loading ─────────────────────────────────────────
  // Only load fonts we actually use (avoids "font not found" errors)
  const FONTS = [
    { family: 'Inter', style: 'Regular'   },
    { family: 'Inter', style: 'Medium'    },
    { family: 'Inter', style: 'Semi Bold' },
    { family: 'Inter', style: 'Bold'      },
  ];
  for (const f of FONTS) {
    try {
      await figma.loadFontAsync(f);
    } catch (_) {
      // Inter might already be loaded; if not, try system fallback
      try { await figma.loadFontAsync({ family: 'Roboto', style: f.style }); } catch (__) {}
    }
  }

  // ── Colour helpers ──────────────────────────────────────────
  // Figma fill color = { r, g, b } only — NO 'a'.
  // Opacity is handled by the paint's own top-level `opacity` field.
  // Shadow/effect colors use { r, g, b, a } separately (set inline there).
  const H = (hex) => {
    const n = hex.replace('#', '');
    return {
      r: parseInt(n.slice(0,2), 16) / 255,
      g: parseInt(n.slice(2,4), 16) / 255,
      b: parseInt(n.slice(4,6), 16) / 255,
    };
  };
  const solid  = (hex, op = 1) => [{ type: 'SOLID', color: H(hex), opacity: op }];
  const noFill = [];

  // ── Text helper ─────────────────────────────────────────────
  // NOTE: Only plain Latin / CJK chars — no emoji, no unsupported Unicode
  function mkText(chars, size, style, colorHex) {
    const t = figma.createText();
    // Use Inter if loaded; the try/catch above ensures it
    try { t.fontName = { family: 'Inter', style }; }
    catch (_) { t.fontName = { family: 'Roboto', style }; }
    t.fontSize = size;
    t.characters = chars || ' ';
    t.fills = solid(colorHex);
    t.textAutoResize = 'WIDTH_AND_HEIGHT';
    return t;
  }

  // ── Auto-layout helper ──────────────────────────────────────
  function setAL(node, dir, gap, padH, padV, main = 'MIN', cross = 'CENTER') {
    node.layoutMode  = dir;
    node.itemSpacing = gap;
    node.paddingLeft = node.paddingRight  = padH;
    node.paddingTop  = node.paddingBottom = padV;
    node.primaryAxisAlignItems  = main;
    node.counterAxisAlignItems  = cross;
    node.primaryAxisSizingMode  = 'AUTO';
    node.counterAxisSizingMode  = 'AUTO';
  }

  const mkComp = (name) => {
    const c = figma.createComponent();
    c.name = name;
    return c;
  };

  function addLabel(text, x, y, page) {
    const t = figma.createText();
    try { t.fontName = { family: 'Inter', style: 'Semi Bold' }; }
    catch (_) { t.fontName = { family: 'Roboto', style: 'Medium' }; }
    t.fontSize = 10;
    t.characters = text.toUpperCase();
    t.fills = solid('#8c8a87');
    t.letterSpacing = { unit: 'PERCENT', value: 8 };
    t.x = x; t.y = y;
    page.appendChild(t);
  }

  function makeSet(comps, name, x, y, dir, gap, pad) {
    const set = figma.combineAsVariants(comps, figma.currentPage);
    set.name = name;
    set.x = x; set.y = y;
    set.fills = solid('#eceae7', 0.5);
    set.paddingLeft = set.paddingRight = set.paddingTop = set.paddingBottom = pad || 20;
    set.itemSpacing = gap || 10;
    set.layoutMode  = dir || 'HORIZONTAL';
    if ((dir || 'HORIZONTAL') === 'HORIZONTAL') {
      try { set.layoutWrap = 'WRAP'; } catch (_) {}
      try { set.counterAxisSpacing = gap || 10; } catch (_) {}
    }
    return set;
  }

  // ══════════════════════════════════════════════════════
  // PHASE 1 — DESIGN TOKEN VARIABLES
  // Variables API requires Figma Professional plan or above.
  // On Free plans we skip variables and go straight to components.
  // ══════════════════════════════════════════════════════
  const HAS_VARIABLES = (
    typeof figma.variables !== 'undefined' &&
    typeof figma.variables.createVariableCollection === 'function'
  );

  if (!HAS_VARIABLES) {
    step('vars', 'done', 14, 'Variables skipped (requires Professional plan)');
  } else {
  step('vars', 'active', 5, 'Creating design token variables…');

  function cleanCol(name) {
    try {
      const ex = figma.variables.getLocalVariableCollections()
        .find(c => c.name === name);
      if (ex) ex.remove();
    } catch (_) {}
    return figma.variables.createVariableCollection(name);
  }

  function CV(name, col, mid, hexVal, desc) {
    const v = figma.variables.createVariable(name, col, 'COLOR');
    // Variable color values require {r,g,b,a} — unlike fill colors which forbid 'a'
    var c = H(hexVal);
    v.setValueForMode(mid, { r: c.r, g: c.g, b: c.b, a: 1 });
    if (desc) v.description = desc;
    return v;
  }

  function NV(name, col, mid, val, desc) {
    const v = figma.variables.createVariable(name, col, 'FLOAT');
    v.setValueForMode(mid, val);
    if (desc) v.description = desc;
    return v;
  }

  // Amber 12-step  (step 9 = #FFA902 = brand)
  const aC = cleanCol('NearGo / Amber');
  const aM = aC.defaultModeId;
  [['1','#fdfaf0','App bg'],['2','#fff8d6','Subtle bg / brand tint'],
   ['3','#ffeea8','UI element bg'],['4','#ffe37c','Hovered UI bg'],
   ['5','#ffd652','Active bg'],['6','#f5c42a','Subtle border'],
   ['7','#e8af00','UI border + hover'],['8','#d49c00','Strong border'],
   ['9','#FFA902','BRAND SOLID — use ≤10% per screen'],
   ['10','#f09a00','Hovered solid'],['11','#8c5c00','Low-contrast text'],['12','#3c2500','High-contrast text'],
  ].forEach(([n,h,d]) => CV('amber-' + n, aC, aM, h, d));

  // Gray 12-step  (step 12 = #1F1D1C = primary action)
  const gC = cleanCol('NearGo / Gray');
  const gM = gC.defaultModeId;
  [['1','#fdfdfc','Page bg'],['2','#f9f9f8','Subtle bg'],
   ['3','#f2f1ef','UI element bg'],['4','#eceae7','Hovered UI bg'],
   ['5','#e5e3e0','Active UI bg'],['6','#dddbd8','Default border'],
   ['7','#cac8c4','Input border'],['8','#b0adaa','Strong border'],
   ['9','#8c8a87','Placeholder'],['10','#807e7b','Hovered solid'],
   ['11','#4a4846','Secondary text'],['12','#1F1D1C','PRIMARY — all key buttons'],
  ].forEach(([n,h,d]) => CV('gray-' + n, gC, gM, h, d));

  // Semantic
  const sC = cleanCol('NearGo / Semantic');
  const sM = sC.defaultModeId;
  [
    ['green-bg','#edfbf4'],['green-border','#cdf4ea'],
    ['green-solid','#29a383','Approved / Approve button'],['green-text','#107060'],
    ['red-bg','#fff5f5'],['red-border','#ffe0e0'],
    ['red-solid','#e5484d','Rejected / Reject button'],['red-text','#ce2c31'],
    ['blue-bg','#f0f8ff'],['blue-border','#d5efff'],
    ['blue-solid','#0090ff','Awaiting L2 / links'],['blue-text','#0060cf'],
    ['orange-bg','#fff6f0'],['orange-border','#ffe8d7'],
    ['orange-solid','#f76b15','Awaiting L1'],['orange-text','#bd4b00'],
    ['purple-bg','#faf5ff'],['purple-border','#ecdcfe'],
    ['purple-solid','#8e4ec6','Returned'],['purple-text','#793aaf'],
  ].forEach(([n,h,d]) => CV(n, sC, sM, h, d || ''));

  // Tokens
  const tC = cleanCol('NearGo / Tokens');
  const tM = tC.defaultModeId;
  [
    ['color-bg',             '#fdfdfc','Page bg = gray-1'],
    ['color-bg-subtle',      '#f9f9f8','Subtle bg = gray-2'],
    ['color-surface',        '#ffffff','Card surface'],
    ['color-border',         '#dddbd8','Default border = gray-6'],
    ['color-border-strong',  '#b0adaa','Strong border = gray-8'],
    ['color-text-hi',        '#1F1D1C','Primary text = gray-12'],
    ['color-text-mid',       '#4a4846','Secondary text = gray-11'],
    ['color-text-low',       '#8c8a87','Label text = gray-9'],
    ['color-text-disabled',  '#b0adaa','Disabled = gray-8'],
    ['color-brand',          '#FFA902','Brand amber (<=10% per screen)'],
    ['color-brand-bg',       '#fff8d6','Brand tint = amber-2'],
    ['color-brand-text',     '#8c5c00','Brand text = amber-11'],
    ['color-action-primary', '#1F1D1C','Key action buttons'],
    ['color-action-danger',  '#e5484d','Reject / danger'],
    ['color-action-positive','#29a383','Approve / success'],
    ['color-link',           '#0060cf','Links / ghost button'],
  ].forEach(([n,h,d]) => CV(n, tC, tM, h, d));

  // Spacing
  const spC = cleanCol('NearGo / Spacing');
  const spM = spC.defaultModeId;
  [[1,4,'Micro'],[2,8,'XS'],[3,12,'SM'],[4,16,'MD — form gap'],
   [5,24,'LG — card padding'],[6,32,'XL'],[7,40,'2XL'],[8,48,'3XL'],[9,64,'4XL'],
  ].forEach(([n,v,d]) => NV('space-' + n, spC, spM, v, d));

  // Radius
  const rC = cleanCol('NearGo / Radius');
  const rM = rC.defaultModeId;
  [[1,3,'Checkbox'],[2,4,'Badge/tag'],[3,6,'Button/input'],
   [4,8,'Card/dropdown'],[5,12,'Dialog/modal'],[6,999,'Pill/avatar'],
  ].forEach(([n,v,d]) => NV('radius-' + n, rC, rM, v, d));

  // Font sizes
  const fC = cleanCol('NearGo / Font Size');
  const fM = fC.defaultModeId;
  [[1,12,'Micro label'],[2,12,'Caption'],[3,13,'Small body'],
   [4,14,'Default body'],[5,14,'Body medium'],[6,16,'Section heading'],
   [7,20,'Page title'],[8,26,'KPI value'],[9,36,'Display'],
  ].forEach(([n,v,d]) => NV('size-' + n, fC, fM, v, d));

  step('vars', 'done', 14, 'Variables done (7 collections)');
  } // end HAS_VARIABLES

  // ══════════════════════════════════════════════════════
  // PHASE 2 — LIBRARY PAGE
  // ══════════════════════════════════════════════════════
  step('page', 'active', 16, 'Setting up component page…');

  // insertChild() returns void — must create page separately then insert
  var libPage = null;
  for (var pi = 0; pi < figma.root.children.length; pi++) {
    if (figma.root.children[pi].name === '🧩 NearGo Component Library') {
      libPage = figma.root.children[pi];
      break;
    }
  }
  if (libPage) {
    while (libPage.children.length > 0) { libPage.children[0].remove(); }
  } else {
    var newPage = figma.createPage();
    newPage.name = '🧩 NearGo Component Library';
    figma.root.insertChild(0, newPage);
    libPage = newPage;
  }
  await figma.setCurrentPageAsync(libPage);
  try { libPage.backgrounds = [{ type: 'SOLID', color: H('#f9f9f8') }]; } catch (_) {}

  const ML = 80;
  const SG = 68;
  let Y  = 80;

  step('page', 'done', 18, 'Page ready');

  // ══════════════════════════════════════════════════════
  // BUTTONS
  // ══════════════════════════════════════════════════════
  step('btns', 'active', 22, 'Creating buttons…');
  addLabel('Buttons', ML, Y - 22, libPage);

  const BTN = [
    { v: 'Primary',   bg: '#1F1D1C', fg: '#ffffff', bd: null,      lbl: 'Submit Approval', fw: 'Medium' },
    { v: 'Secondary', bg: '#ffffff', fg: '#1F1D1C', bd: '#cac8c4', lbl: 'Cancel',           fw: 'Medium' },
    { v: 'Positive',  bg: '#29a383', fg: '#ffffff', bd: null,      lbl: 'Approve',          fw: 'Medium' },
    { v: 'Danger',    bg: '#e5484d', fg: '#ffffff', bd: null,      lbl: 'Reject',           fw: 'Medium' },
    { v: 'Ghost',     bg: null,      fg: '#0060cf', bd: null,      lbl: 'View all',         fw: 'Medium' },
    { v: 'Brand',     bg: '#FFA902', fg: '#3c2500', bd: null,      lbl: 'Claim Offer',      fw: 'Bold'   },
  ];
  const SZ = [
    { s: 'Small',  fs: 12,   pH: 12, pV: 6  },
    { s: 'Medium', fs: 13.5, pH: 16, pV: 9  },
    { s: 'Large',  fs: 14.5, pH: 22, pV: 11 },
  ];

  const btnComps = [];
  for (const { s, fs, pH, pV } of SZ) {
    for (const { v, bg, fg, bd, lbl, fw } of BTN) {
      const c = mkComp('Variant=' + v + ', Size=' + s);
      setAL(c, 'HORIZONTAL', 6, pH, pV, 'CENTER', 'CENTER');
      c.cornerRadius = 6;
      c.fills  = bg ? solid(bg) : noFill;
      c.strokes = bd ? solid(bd) : [];
      if (bd) { c.strokeWeight = 1; c.strokeAlign = 'INSIDE'; }
      c.appendChild(mkText(lbl, fs, fw, fg));
      libPage.appendChild(c);
      btnComps.push(c);
    }
  }
  const btnSet = makeSet(btnComps, 'Button', ML, Y, 'HORIZONTAL', 10, 20);
  Y += btnSet.height + SG;
  step('btns', 'done', 34, 'Buttons done (' + btnComps.length + ' variants)');

  // ══════════════════════════════════════════════════════
  // BADGES
  // ══════════════════════════════════════════════════════
  step('badges', 'active', 38, 'Creating badges…');

  addLabel('Badge - Ticket Type', ML, Y - 22, libPage);
  const TYPE_CFG = [
    { v: 'KYC-Individual', bg: '#ecfcfd', fg: '#107ea0', bd: '#b8ecf5', lbl: 'KYC Individual' },
    { v: 'KYB-Enterprise',  bg: '#f0f8ff', fg: '#0060cf', bd: '#d5efff', lbl: 'KYB Enterprise'  },
    { v: 'Store-Creation',  bg: '#faf5ff', fg: '#793aaf', bd: '#ecdcfe', lbl: 'Store Creation'   },
  ];
  const typeBadges = TYPE_CFG.map(({ v, bg, fg, bd, lbl }) => {
    const c = mkComp('Type=' + v);
    setAL(c, 'HORIZONTAL', 4, 8, 3, 'CENTER', 'CENTER');
    c.cornerRadius = 4; c.fills = solid(bg);
    c.strokes = solid(bd); c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    c.appendChild(mkText(lbl, 11, 'Medium', fg));
    libPage.appendChild(c); return c;
  });
  const typeBadgeSet = makeSet(typeBadges, 'Badge / Ticket Type', ML, Y, 'HORIZONTAL', 10, 16);
  Y += typeBadgeSet.height + 36;

  addLabel('Badge - Priority', ML, Y - 22, libPage);
  const PRIO_CFG = [
    { v: 'Urgent', bg: '#fff5f5', fg: '#ce2c31', bd: '#ffe0e0', lbl: 'Urgent'             },
    { v: 'Normal', bg: '#f2f1ef', fg: '#4a4846', bd: '#dddbd8', lbl: 'Normal'             },
    { v: 'Low',    bg: '#fff8d6', fg: '#8c5c00', bd: '#f5c42a', lbl: 'Low priority'       },
    { v: 'Brand',  bg: '#FFA902', fg: '#3c2500', bd: null,      lbl: '10% OFF First Order' },
  ];
  const prioBadges = PRIO_CFG.map(({ v, bg, fg, bd, lbl }) => {
    const c = mkComp('Priority=' + v);
    setAL(c, 'HORIZONTAL', 4, 8, 3, 'CENTER', 'CENTER');
    c.cornerRadius = 4; c.fills = solid(bg);
    if (bd) { c.strokes = solid(bd); c.strokeWeight = 1; c.strokeAlign = 'INSIDE'; }
    else c.strokes = [];
    c.appendChild(mkText(lbl, 11, v === 'Brand' ? 'Bold' : 'Medium', fg));
    libPage.appendChild(c); return c;
  });
  const prioBadgeSet = makeSet(prioBadges, 'Badge / Priority', ML, Y, 'HORIZONTAL', 10, 16);
  Y += prioBadgeSet.height + SG;
  step('badges', 'done', 48, 'Badges done');

  // ══════════════════════════════════════════════════════
  // STATUS INDICATORS
  // ══════════════════════════════════════════════════════
  step('status', 'active', 52, 'Creating status indicators…');
  addLabel('Status Indicator', ML, Y - 22, libPage);

  const STATUS_CFG = [
    { v: 'Awaiting-L1', dot: '#f76b15', fg: '#bd4b00', lbl: 'Awaiting L1 Review'    },
    { v: 'Awaiting-L2', dot: '#0090ff', fg: '#0060cf', lbl: 'Awaiting L2 Review'    },
    { v: 'Approved',    dot: '#29a383', fg: '#107060', lbl: 'Approved'               },
    { v: 'Rejected',    dot: '#e5484d', fg: '#ce2c31', lbl: 'Rejected'               },
    { v: 'Returned',    dot: '#8e4ec6', fg: '#793aaf', lbl: 'Returned for Revision'  },
  ];
  const statusComps = STATUS_CFG.map(({ v, dot, fg, lbl }) => {
    const c = mkComp('State=' + v);
    setAL(c, 'HORIZONTAL', 6, 0, 0, 'MIN', 'CENTER');
    c.fills = noFill;
    const dotEl = figma.createEllipse();
    dotEl.resize(6, 6); dotEl.fills = solid(dot);
    c.appendChild(dotEl);
    c.appendChild(mkText(lbl, 13, 'Regular', fg));
    libPage.appendChild(c); return c;
  });
  const statusSet = makeSet(statusComps, 'Status Indicator', ML, Y, 'VERTICAL', 10, 16);
  Y += statusSet.height + SG;
  step('status', 'done', 60, 'Status indicators done');

  // ══════════════════════════════════════════════════════
  // INPUTS
  // ══════════════════════════════════════════════════════
  step('inputs', 'active', 63, 'Creating inputs…');
  addLabel('Input Field', ML, Y - 22, libPage);

  const INPUT_CFG = [
    { s: 'Default',   bg: '#ffffff', bd: '#cac8c4', fg: '#8c8a87', val: 'Placeholder text',       glow: null      },
    { s: 'Filled',    bg: '#ffffff', bd: '#cac8c4', fg: '#1F1D1C', val: 'Beijing Flagship Store',  glow: null      },
    { s: 'Focused',   bg: '#ffffff', bd: '#1F1D1C', fg: '#1F1D1C', val: 'Beijing Flagship Store',  glow: '#eceae7' },
    { s: 'Error',     bg: '#ffffff', bd: '#e5484d', fg: '#8c8a87', val: '',                         glow: '#ffe0e0' },
    { s: 'Read-Only', bg: '#f9f9f8', bd: '#dddbd8', fg: '#4a4846', val: 'Chen Meihua',              glow: null      },
    { s: 'Disabled',  bg: '#f2f1ef', bd: '#dddbd8', fg: '#b0adaa', val: 'Disabled field',           glow: null      },
  ];
  const inputComps = INPUT_CFG.map(({ s, bg, bd, fg, val, glow }) => {
    const c = mkComp('State=' + s);
    c.layoutMode = 'HORIZONTAL';
    c.paddingLeft = c.paddingRight = 11;
    c.paddingTop  = c.paddingBottom = 0;
    c.primaryAxisAlignItems  = 'MIN';
    c.counterAxisAlignItems  = 'CENTER';
    c.primaryAxisSizingMode  = 'FIXED';
    c.counterAxisSizingMode  = 'FIXED';
    c.resize(240, 36);
    c.cornerRadius = 6; c.fills = solid(bg);
    c.strokes = solid(bd); c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    if (glow) {
      try {
        var gc = H(glow);
        c.effects = [{
          type: 'DROP_SHADOW',
          color: { r: gc.r, g: gc.g, b: gc.b, a: 1 },
          offset: { x: 0, y: 0 }, radius: 0, spread: 2,
          visible: true, blendMode: 'NORMAL',
        }];
      } catch (_) {}
    }
    if (val) c.appendChild(mkText(val, 13.5, 'Regular', fg));
    libPage.appendChild(c); return c;
  });
  const inputSet = makeSet(inputComps, 'Input', ML, Y, 'VERTICAL', 10, 16);
  Y += inputSet.height + SG;
  step('inputs', 'done', 72, 'Inputs done');

  // ══════════════════════════════════════════════════════
  // NAVIGATION ITEM
  // ══════════════════════════════════════════════════════
  step('nav', 'active', 75, 'Creating navigation items…');
  addLabel('Navigation Item', ML, Y - 22, libPage);

  const NAV_CFG = [
    { s: 'Default', bg: null,      fg: '#4a4846', accent: null,      fw: 'Regular' },
    { s: 'Hover',   bg: '#f9f9f8', fg: '#1F1D1C', accent: null,      fw: 'Regular' },
    { s: 'Active',  bg: '#fff8d6', fg: '#1F1D1C', accent: '#FFA902', fw: 'Medium'  },
  ];
  const navComps = NAV_CFG.map(({ s, bg, fg, accent, fw }) => {
    const c = mkComp('State=' + s);
    c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 0;
    c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 0;
    c.primaryAxisAlignItems = 'MIN'; c.counterAxisAlignItems = 'MIN';
    c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED';
    c.resize(208, 32);
    c.fills = bg ? solid(bg) : noFill;
    // Left accent bar
    const bar = figma.createRectangle();
    bar.resize(2, 32); bar.fills = accent ? solid(accent) : noFill;
    c.appendChild(bar);
    // Inner label
    const inner = figma.createFrame();
    inner.layoutMode = 'HORIZONTAL';
    inner.primaryAxisSizingMode = 'FIXED'; inner.counterAxisSizingMode = 'FIXED';
    inner.resize(206, 32);
    inner.paddingLeft = inner.paddingRight = 14;
    inner.primaryAxisAlignItems = 'MIN'; inner.counterAxisAlignItems = 'CENTER';
    inner.fills = noFill; inner.itemSpacing = 8;
    inner.appendChild(mkText('Submit Approval', 13, fw, fg));
    c.appendChild(inner);
    libPage.appendChild(c); return c;
  });
  const navSet = makeSet(navComps, 'Navigation Item', ML, Y, 'VERTICAL', 4, 16);
  Y += navSet.height + SG;
  step('nav', 'done', 80, 'Navigation items done');

  // ══════════════════════════════════════════════════════
  // KPI CARDS  (icon = colored rect with letter, NO emoji)
  // ══════════════════════════════════════════════════════
  step('kpi', 'active', 83, 'Creating KPI cards…');
  addLabel('KPI Card', ML, Y - 22, libPage);

  // Icon colors and single-char labels — all safe Latin chars, no emoji
  const KPI_CFG = [
    { v: 'Pending',  iconBg: '#f0f8ff', iconFg: '#0060cf', iconChar: 'P', val: '2',  lbl: 'Pending Review',  sub: 'L1 queue'          },
    { v: 'Approved', iconBg: '#edfbf4', iconFg: '#107060', iconChar: 'A', val: '14', lbl: 'Approved Today',  sub: 'Full workflow'      },
    { v: 'Rejected', iconBg: '#fff5f5', iconFg: '#ce2c31', iconChar: 'R', val: '3',  lbl: 'Rejected Today',  sub: 'L1 + L2 combined'   },
    { v: 'Returned', iconBg: '#faf5ff', iconFg: '#793aaf', iconChar: 'T', val: '1',  lbl: 'Returned',        sub: 'Awaiting revision'   },
  ];
  const kpiComps = KPI_CFG.map(({ v, iconBg, iconFg, iconChar, val, lbl, sub }) => {
    const c = mkComp('Variant=' + v);
    c.layoutMode = 'VERTICAL'; c.itemSpacing = 10;
    c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 20;
    c.primaryAxisAlignItems = 'MIN'; c.counterAxisAlignItems = 'MIN';
    c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED';
    c.resize(192, 1);
    c.cornerRadius = 8; c.fills = solid('#ffffff');
    c.strokes = solid('#dddbd8'); c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    try {
      c.effects = [{
        type: 'DROP_SHADOW', color: { r:0, g:0, b:0, a: 0.06 },
        offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true, blendMode: 'NORMAL',
      }];
    } catch (_) {}

    // Icon frame — colored rounded square with a letter (no emoji)
    const iconFr = figma.createFrame();
    iconFr.resize(34, 34); iconFr.cornerRadius = 6; iconFr.fills = solid(iconBg);
    iconFr.layoutMode = 'HORIZONTAL';
    iconFr.primaryAxisAlignItems = 'CENTER'; iconFr.counterAxisAlignItems = 'CENTER';
    iconFr.primaryAxisSizingMode = 'FIXED'; iconFr.counterAxisSizingMode = 'FIXED';
    iconFr.appendChild(mkText(iconChar, 14, 'Bold', iconFg));

    c.appendChild(iconFr);
    c.appendChild(mkText(val,  26, 'Bold',    '#1F1D1C'));
    c.appendChild(mkText(lbl,  12.5,'Regular', '#4a4846'));
    c.appendChild(mkText(sub,  11,  'Regular', '#8c8a87'));
    libPage.appendChild(c); return c;
  });
  const kpiSet = makeSet(kpiComps, 'KPI Card', ML, Y, 'HORIZONTAL', 12, 20);
  Y += kpiSet.height + 36;

  // Stat Bars
  addLabel('Stat Bar - List Summary', ML, Y - 22, libPage);
  const STAT_CFG = [
    { v: 'Pending', bg: '#fff8d6', bd: '#f5c42a', vc: '#8c5c00', val: '2', lbl: 'Awaiting My Action'  },
    { v: 'L1',      bg: '#f0f8ff', bd: '#d5efff', vc: '#0060cf', val: '1', lbl: 'L1 Initial Review'   },
    { v: 'L2',      bg: '#faf5ff', bd: '#ecdcfe', vc: '#793aaf', val: '0', lbl: 'L2 Secondary Review' },
    { v: 'Urgent',  bg: '#fff5f5', bd: '#ffe0e0', vc: '#ce2c31', val: '1', lbl: 'Urgent Files'         },
  ];
  const statComps = STAT_CFG.map(({ v, bg, bd, vc, val, lbl }) => {
    const c = mkComp('Variant=' + v);
    c.layoutMode = 'VERTICAL'; c.itemSpacing = 5;
    c.paddingLeft = c.paddingRight = 18; c.paddingTop = c.paddingBottom = 16;
    c.primaryAxisAlignItems = 'MIN'; c.counterAxisAlignItems = 'MIN';
    c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'FIXED';
    c.resize(180, 1); c.cornerRadius = 8;
    c.fills = solid(bg); c.strokes = solid(bd); c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    c.appendChild(mkText(val, 24, 'Bold', vc));
    c.appendChild(mkText(lbl, 12, 'Regular', vc));
    libPage.appendChild(c); return c;
  });
  const statSet = makeSet(statComps, 'Stat Bar', ML, Y, 'HORIZONTAL', 12, 20);
  Y += statSet.height + SG;
  step('kpi', 'done', 90, 'KPI cards + Stat bars done');

  // ══════════════════════════════════════════════════════
  // TABLE ROWS
  // ══════════════════════════════════════════════════════
  step('table', 'active', 93, 'Creating table rows…');
  addLabel('Table Row', ML, Y - 22, libPage);

  const COLS = [
    { w: 140, hdr: 'TICKET ID',  val: 'AP2024031001',                    mono: true  },
    { w: 130, hdr: 'TYPE',       val: 'KYC Individual'                               },
    { w: 260, hdr: 'TITLE',      val: 'KYC Verification - Chen Meihua',  bold: true  },
    { w: 110, hdr: 'PRIORITY',   val: 'Urgent'                                       },
    { w: 150, hdr: 'STATUS',     val: 'Awaiting L1'                                  },
    { w: 100, hdr: 'SUBMITTED',  val: '10/06 09:15',                      mono: true  },
  ];
  const TW = COLS.reduce((s, col) => s + col.w, 0);

  function buildRow(variantName, rowH, rowBg, rowBd, isHeader) {
    const c = mkComp('Type=' + variantName);
    c.layoutMode = 'HORIZONTAL'; c.itemSpacing = 0;
    c.paddingLeft = c.paddingRight = c.paddingTop = c.paddingBottom = 0;
    c.primaryAxisAlignItems = 'MIN'; c.counterAxisAlignItems = 'MIN';
    c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED';
    c.resize(TW, rowH); c.fills = solid(rowBg);
    c.strokes = solid(rowBd); c.strokeWeight = 1; c.strokeAlign = 'INSIDE';
    COLS.forEach(({ w, hdr, val, mono, bold }) => {
      const cell = figma.createFrame();
      cell.resize(w, rowH); cell.fills = noFill;
      cell.layoutMode = 'HORIZONTAL'; cell.paddingLeft = cell.paddingRight = 14;
      cell.primaryAxisAlignItems = 'MIN'; cell.counterAxisAlignItems = 'CENTER';
      cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'FIXED';
      const txt   = isHeader ? hdr : val;
      const sz    = isHeader ? 10.5 : 13;
      const fw    = isHeader ? 'Medium' : (bold ? 'Medium' : 'Regular');
      const fg    = isHeader ? '#8c8a87' : (bold ? '#1F1D1C' : mono ? '#8c8a87' : '#4a4846');
      if (txt) cell.appendChild(mkText(txt, sz, fw, fg));
      c.appendChild(cell);
    });
    libPage.appendChild(c); return c;
  }

  const rowHeader = buildRow('Header', 40, '#f9f9f8', '#dddbd8', true);
  const rowData   = buildRow('Data',   50, '#ffffff',  '#f2f1ef', false);
  const rowHover  = buildRow('Hover',  50, '#f9f9f8',  '#f2f1ef', false);
  const tableSet  = makeSet([rowHeader, rowData, rowHover], 'Table Row', ML, Y, 'VERTICAL', 4, 16);
  Y += tableSet.height + SG;
  step('table', 'done', 98, 'Table rows done');

  // ── Viewport ──────────────────────────────────────────
  try {
    figma.viewport.scrollAndZoomIntoView(libPage.children);
  } catch (_) {}
}
