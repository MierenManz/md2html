import { generateAST } from "./AST.ts";
import { NodeType } from "./AST_types.ts";
import { header } from "./html_functions.ts";
export function generateHTMLfromString(string: string): string {
  const AST = generateAST(string);
  const length = AST.body.length;
  for (let i = 0; i < length; i++) {
    const node = AST.body[i];
    switch (node.type) {
      case NodeType.Header:
        header(node);
    }
  }
  return JSON.stringify(AST);
}
