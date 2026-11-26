// Fails the build if content.en.json and content.de.json differ in structure (keys, types, array lengths, project slugs).
import { readFileSync } from 'node:fs';

const load = (l) => JSON.parse(readFileSync(new URL(`../src/data/content.${l}.json`, import.meta.url), 'utf8'));
const en = load('en');
const de = load('de');
const errors = [];

const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);

function compare(a, b, path) {
  // null and a value are both allowed (e.g. optional "end", "github", "publication")
  if (a === null || b === null) return;
  if (kind(a) !== kind(b)) return errors.push(`${path}: ${kind(a)} vs ${kind(b)}`);
  if (kind(a) === 'array') {
    if (a.length !== b.length && !path.endsWith('.points') && !path.endsWith('.items') && !path.endsWith('.tools') && !path.endsWith('.body')) {
      errors.push(`${path}: ${a.length} items vs ${b.length}`);
    }
    a.forEach((v, i) => i < b.length && compare(v, b[i], `${path}[${i}]`));
  } else if (kind(a) === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a) || !(k in b)) errors.push(`${path}.${k}: missing in ${k in a ? 'de' : 'en'}`);
      else compare(a[k], b[k], `${path}.${k}`);
    }
  }
}

compare(en, de, '$');
en.projects.forEach((p, i) => {
  if (de.projects[i] && p.slug !== de.projects[i].slug) errors.push(`$.projects[${i}].slug: "${p.slug}" vs "${de.projects[i].slug}" (slugs must match)`);
});

if (errors.length) {
  console.error('content.en.json and content.de.json do not match:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('content check: en/de structure matches');
