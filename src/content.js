import en from './data/content.en.json';
import de from './data/content.de.json';

export const content = { en, de };
export const langs = Object.keys(content);
export const otherLang = (lang) => (lang === 'en' ? 'de' : 'en');
