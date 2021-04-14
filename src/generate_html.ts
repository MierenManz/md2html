import type { AST } from "./AST_types.ts";
import { NodeType } from "./AST_types.ts";
import { generateAST } from "./AST.ts";
export function generateHTML(AST: AST): string {
  // let html = "";
  const length = AST.body.length;
  for (let i = 0; i < length; i++) {
    const node = AST.body[i];
    console.log(node);
  }
  return "";
}

const md = Deno.readTextFileSync(Deno.args[0] ?? "backup.md");
const s = performance.now();
const generatedAST = generateAST(md);
generateHTML(generatedAST);
const ss = performance.now();
console.log(ss - s);
