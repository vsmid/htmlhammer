import HTML from './html.js';
import REF  from './ref.js';

export const {
    html,
    base, head, link, meta, style,
    title,
    body,
    address, article, aside, footer, header,
    h1, h2, h3, h4, h5,
    h6, hggroup, main, nav, section,
    blockquote, dd, div, dl, dt,
    figcaption, figure, hr, li, ol,
    p, pre, ul,
    a, abbr, b, bdi, bdo,
    br, cite, code, data, dfn,
    em, i, kbd, mark, q,
    rb, rp, rt, rtc, ruby,
    s, samp, small, span, strong, sub, sup,
    time, u, variable, wbr,
    area, audio, img, map, track,
    video,
    embed, iframe, object, param, picture,
    source,
    canvas, noscript, script,
    del, ins,
    caption, col, colgroup, table, tbody,
    td, tfoot, th, thead, tr,
    button, datalist, fieldset, form, input,
    label, legend, meter, oprgroup, option,
    output, progress, select, textarea,
    details, dialog, menu, summary,
    slot, template
} = HTML;
export const { ref, setRef } = REF;