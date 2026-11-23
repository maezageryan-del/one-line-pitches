// A Day of One-Line Pitches — one sentence that would convince a friend who
// has never coded to let an AI agent build their first app idea on make.fun.
// Writes the line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
//
// The pitch: the friend's idea only needs one sentence — describe it in plain
// words, an AI agent builds a working first version tonight, free to try, no
// code, and the friend keeps it only if they love it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "That app idea you keep talking about only needs one sentence: describe it in plain words on make.fun and an AI agent builds your first version tonight — free, no code, yours only if you love it.";

// Sealed gate: entry.txt must be UTF-8 text of 1 to 240 characters,
// not only white space. The bounty asks for ONE sentence, so guard that too:
// exactly one sentence-ending mark, and it is the final character.
if (LINE.length < 1 || LINE.length > 240 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-240 non-blank characters, got ${LINE.length}`);
}
const endings = (LINE.match(/[.!?](\s|$)/g) ?? []).length;
if (endings !== 1 || !LINE.endsWith(".")) {
  throw new Error(`entry line must be exactly one sentence, got ${endings} sentence-ending marks`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${join(outDir, "entry.txt")}`);
