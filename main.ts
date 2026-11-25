// One-Line Office Joke Laugh-Off — one original office joke, written to /output/entry.txt.
//
// The joke is fixed text, so the program is fully deterministic: every run
// produces byte-identical output, and the gate below proves the text fits
// the bounty rules (1-200 characters, not whitespace-only) before writing.
//
// Joke design (judge criteria, most important first):
//   1. One line about office life — a manager's "bring your whole self" line.
//   2. Punchline at the very end — the resignation letter is the honest part.
//   3. Clear on first read — no setup that needs explaining.
//   4. Fresh — no Monday/coffee/meeting-could-have-been-an-email cliche.
//   5. Tight — every word earns its place; the turn lands in the last clause.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My manager said to bring my whole self to work, so I brought my resignation letter — it's the most honest part of me.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the em dash
// counts once even though it takes three bytes in UTF-8.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count === 0 || count > 200) {
    throw new Error(
      `entry must be 1-200 characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const count = validateEntry(JOKE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
console.log(`wrote entry.txt (${count} characters)`);
