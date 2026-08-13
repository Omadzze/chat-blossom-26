/**
 * Маркировка демонстрационных (не настоящих) данных.
 *
 * Текстовые значения получают суффикс " [G]", числовые — "⁰".
 * Так на прототипе сразу видно, какие данные заполнены для дизайна,
 * а какие придут из реальной системы.
 */

const SKIP_KEYS = new Set([
  "id",
  "tone",
  "icon",
  "role",
  "kind",
  "type",
  "label",
  "unit",
  "name",
]);

export const TEXT_MARK = " [G]";
export const NUMBER_MARK = "⁰";

function isNumberLike(s: string) {
  if (!/\d/.test(s)) return false;
  const letters = s.replace(/[\d\s.,;:%$+\-—·/()]/g, "");
  return letters.length <= 8;
}

export function markValue(s: string): string {
  if (!s.trim()) return s;
  if (s.endsWith(TEXT_MARK) || s.endsWith(NUMBER_MARK)) return s;
  return isNumberLike(s) ? `${s}${NUMBER_MARK}` : `${s}${TEXT_MARK}`;
}

export function markMock<T>(input: T): T {
  if (typeof input === "string") return markValue(input) as unknown as T;
  if (Array.isArray(input)) return input.map((v) => markMock(v)) as unknown as T;
  if (input && typeof input === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      out[k] = SKIP_KEYS.has(k) ? v : markMock(v);
    }
    return out as unknown as T;
  }
  return input;
}
