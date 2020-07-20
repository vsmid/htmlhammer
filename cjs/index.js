"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  html: true,
  base: true,
  head: true,
  link: true,
  meta: true,
  style: true,
  title: true,
  body: true,
  address: true,
  article: true,
  aside: true,
  footer: true,
  header: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  hggroup: true,
  main: true,
  nav: true,
  section: true,
  blockquote: true,
  dd: true,
  div: true,
  dl: true,
  dt: true,
  figcaption: true,
  figure: true,
  hr: true,
  li: true,
  ol: true,
  p: true,
  pre: true,
  ul: true,
  a: true,
  abbr: true,
  b: true,
  bdi: true,
  bdo: true,
  br: true,
  cite: true,
  code: true,
  data: true,
  dfn: true,
  em: true,
  i: true,
  kbd: true,
  mark: true,
  q: true,
  rb: true,
  rp: true,
  rt: true,
  rtc: true,
  ruby: true,
  s: true,
  samp: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
  time: true,
  u: true,
  variable: true,
  wbr: true,
  area: true,
  audio: true,
  img: true,
  map: true,
  track: true,
  video: true,
  embed: true,
  iframe: true,
  object: true,
  param: true,
  picture: true,
  source: true,
  canvas: true,
  noscript: true,
  script: true,
  del: true,
  ins: true,
  caption: true,
  col: true,
  colgroup: true,
  table: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  thead: true,
  tr: true,
  button: true,
  datalist: true,
  fieldset: true,
  form: true,
  input: true,
  label: true,
  legend: true,
  meter: true,
  oprgroup: true,
  option: true,
  output: true,
  progress: true,
  select: true,
  textarea: true,
  details: true,
  dialog: true,
  menu: true,
  summary: true,
  slot: true,
  template: true,
  ref: true,
  setRef: true
};
exports.label = exports.input = exports.form = exports.fieldset = exports.datalist = exports.button = exports.tr = exports.thead = exports.th = exports.tfoot = exports.td = exports.tbody = exports.table = exports.colgroup = exports.col = exports.caption = exports.ins = exports.del = exports.script = exports.noscript = exports.canvas = exports.source = exports.picture = exports.param = exports.object = exports.iframe = exports.embed = exports.video = exports.track = exports.map = exports.img = exports.audio = exports.area = exports.wbr = exports.variable = exports.u = exports.time = exports.sup = exports.sub = exports.strong = exports.span = exports.small = exports.samp = exports.s = exports.ruby = exports.rtc = exports.rt = exports.rp = exports.rb = exports.q = exports.mark = exports.kbd = exports.i = exports.em = exports.dfn = exports.data = exports.code = exports.cite = exports.br = exports.bdo = exports.bdi = exports.b = exports.abbr = exports.a = exports.ul = exports.pre = exports.p = exports.ol = exports.li = exports.hr = exports.figure = exports.figcaption = exports.dt = exports.dl = exports.div = exports.dd = exports.blockquote = exports.section = exports.nav = exports.main = exports.hggroup = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.header = exports.footer = exports.aside = exports.article = exports.address = exports.body = exports.title = exports.style = exports.meta = exports.link = exports.head = exports.base = exports.html = void 0;
exports.setRef = exports.ref = exports.template = exports.slot = exports.summary = exports.menu = exports.dialog = exports.details = exports.textarea = exports.select = exports.progress = exports.output = exports.option = exports.oprgroup = exports.meter = exports.legend = void 0;

var _html = _interopRequireDefault(require("./html.js"));

var _ref = _interopRequireDefault(require("./ref.js"));

var _helper = require("./helper.js");

Object.keys(_helper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helper[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var html = _html["default"].html,
    base = _html["default"].base,
    head = _html["default"].head,
    link = _html["default"].link,
    meta = _html["default"].meta,
    style = _html["default"].style,
    title = _html["default"].title,
    body = _html["default"].body,
    address = _html["default"].address,
    article = _html["default"].article,
    aside = _html["default"].aside,
    footer = _html["default"].footer,
    header = _html["default"].header,
    h1 = _html["default"].h1,
    h2 = _html["default"].h2,
    h3 = _html["default"].h3,
    h4 = _html["default"].h4,
    h5 = _html["default"].h5,
    h6 = _html["default"].h6,
    hggroup = _html["default"].hggroup,
    main = _html["default"].main,
    nav = _html["default"].nav,
    section = _html["default"].section,
    blockquote = _html["default"].blockquote,
    dd = _html["default"].dd,
    div = _html["default"].div,
    dl = _html["default"].dl,
    dt = _html["default"].dt,
    figcaption = _html["default"].figcaption,
    figure = _html["default"].figure,
    hr = _html["default"].hr,
    li = _html["default"].li,
    ol = _html["default"].ol,
    p = _html["default"].p,
    pre = _html["default"].pre,
    ul = _html["default"].ul,
    a = _html["default"].a,
    abbr = _html["default"].abbr,
    b = _html["default"].b,
    bdi = _html["default"].bdi,
    bdo = _html["default"].bdo,
    br = _html["default"].br,
    cite = _html["default"].cite,
    code = _html["default"].code,
    data = _html["default"].data,
    dfn = _html["default"].dfn,
    em = _html["default"].em,
    i = _html["default"].i,
    kbd = _html["default"].kbd,
    mark = _html["default"].mark,
    q = _html["default"].q,
    rb = _html["default"].rb,
    rp = _html["default"].rp,
    rt = _html["default"].rt,
    rtc = _html["default"].rtc,
    ruby = _html["default"].ruby,
    s = _html["default"].s,
    samp = _html["default"].samp,
    small = _html["default"].small,
    span = _html["default"].span,
    strong = _html["default"].strong,
    sub = _html["default"].sub,
    sup = _html["default"].sup,
    time = _html["default"].time,
    u = _html["default"].u,
    variable = _html["default"].variable,
    wbr = _html["default"].wbr,
    area = _html["default"].area,
    audio = _html["default"].audio,
    img = _html["default"].img,
    map = _html["default"].map,
    track = _html["default"].track,
    video = _html["default"].video,
    embed = _html["default"].embed,
    iframe = _html["default"].iframe,
    object = _html["default"].object,
    param = _html["default"].param,
    picture = _html["default"].picture,
    source = _html["default"].source,
    canvas = _html["default"].canvas,
    noscript = _html["default"].noscript,
    script = _html["default"].script,
    del = _html["default"].del,
    ins = _html["default"].ins,
    caption = _html["default"].caption,
    col = _html["default"].col,
    colgroup = _html["default"].colgroup,
    table = _html["default"].table,
    tbody = _html["default"].tbody,
    td = _html["default"].td,
    tfoot = _html["default"].tfoot,
    th = _html["default"].th,
    thead = _html["default"].thead,
    tr = _html["default"].tr,
    button = _html["default"].button,
    datalist = _html["default"].datalist,
    fieldset = _html["default"].fieldset,
    form = _html["default"].form,
    input = _html["default"].input,
    label = _html["default"].label,
    legend = _html["default"].legend,
    meter = _html["default"].meter,
    oprgroup = _html["default"].oprgroup,
    option = _html["default"].option,
    output = _html["default"].output,
    progress = _html["default"].progress,
    select = _html["default"].select,
    textarea = _html["default"].textarea,
    details = _html["default"].details,
    dialog = _html["default"].dialog,
    menu = _html["default"].menu,
    summary = _html["default"].summary,
    slot = _html["default"].slot,
    template = _html["default"].template;
exports.template = template;
exports.slot = slot;
exports.summary = summary;
exports.menu = menu;
exports.dialog = dialog;
exports.details = details;
exports.textarea = textarea;
exports.select = select;
exports.progress = progress;
exports.output = output;
exports.option = option;
exports.oprgroup = oprgroup;
exports.meter = meter;
exports.legend = legend;
exports.label = label;
exports.input = input;
exports.form = form;
exports.fieldset = fieldset;
exports.datalist = datalist;
exports.button = button;
exports.tr = tr;
exports.thead = thead;
exports.th = th;
exports.tfoot = tfoot;
exports.td = td;
exports.tbody = tbody;
exports.table = table;
exports.colgroup = colgroup;
exports.col = col;
exports.caption = caption;
exports.ins = ins;
exports.del = del;
exports.script = script;
exports.noscript = noscript;
exports.canvas = canvas;
exports.source = source;
exports.picture = picture;
exports.param = param;
exports.object = object;
exports.iframe = iframe;
exports.embed = embed;
exports.video = video;
exports.track = track;
exports.map = map;
exports.img = img;
exports.audio = audio;
exports.area = area;
exports.wbr = wbr;
exports.variable = variable;
exports.u = u;
exports.time = time;
exports.sup = sup;
exports.sub = sub;
exports.strong = strong;
exports.span = span;
exports.small = small;
exports.samp = samp;
exports.s = s;
exports.ruby = ruby;
exports.rtc = rtc;
exports.rt = rt;
exports.rp = rp;
exports.rb = rb;
exports.q = q;
exports.mark = mark;
exports.kbd = kbd;
exports.i = i;
exports.em = em;
exports.dfn = dfn;
exports.data = data;
exports.code = code;
exports.cite = cite;
exports.br = br;
exports.bdo = bdo;
exports.bdi = bdi;
exports.b = b;
exports.abbr = abbr;
exports.a = a;
exports.ul = ul;
exports.pre = pre;
exports.p = p;
exports.ol = ol;
exports.li = li;
exports.hr = hr;
exports.figure = figure;
exports.figcaption = figcaption;
exports.dt = dt;
exports.dl = dl;
exports.div = div;
exports.dd = dd;
exports.blockquote = blockquote;
exports.section = section;
exports.nav = nav;
exports.main = main;
exports.hggroup = hggroup;
exports.h6 = h6;
exports.h5 = h5;
exports.h4 = h4;
exports.h3 = h3;
exports.h2 = h2;
exports.h1 = h1;
exports.header = header;
exports.footer = footer;
exports.aside = aside;
exports.article = article;
exports.address = address;
exports.body = body;
exports.title = title;
exports.style = style;
exports.meta = meta;
exports.link = link;
exports.head = head;
exports.base = base;
exports.html = html;
var ref = _ref["default"].ref,
    setRef = _ref["default"].setRef;
exports.setRef = setRef;
exports.ref = ref;