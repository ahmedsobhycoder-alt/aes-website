/**
 * Fill named placeholders in a message template.
 *
 *   fmt("Show {label}", { label: "Ozel" })  ->  "Show Ozel"
 *
 * Always use this instead of string concatenation: Arabic word order differs
 * from English, so the translator must own the whole sentence.
 */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
