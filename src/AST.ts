import type { AST, Node } from "./AST_types.ts";
import { headerNode, listNode, newLine, normalLine } from "./AST_function.ts";

export function generateAST(text: string): AST {
  const markdown: AST = {
    body: [],
  };
  const charArray = text.replace(/\r\n/g, "\n").split("");
  const arrayLength = charArray.length - 1;
  let line = "";
  let i = 0;
  for (const [index, char] of charArray.entries()) {
    if (char !== "\n") line += char;
    if (char === "\n" || index === arrayLength) {
      let buff = {} as Node;
      line = line.trimStart();

      if (/^[\#]{1,6}\s/.test(line)) {
        buff = headerNode(line);
      } else if (
        line.substring(0, 2) === "- " || line.substring(0, 2) === "* " ||
        line.substring(0, 3).match(/[0-9]\.\s/g)
      ) {
        buff = listNode(line);
        if (markdown.body[i - 1]) {
          markdown.body[i - 1].includeNextLine = false;
          markdown.body.push(newLine());
        }
      } else if (line !== "") {
        buff = normalLine(line);
      } else {
        buff = newLine();
      }
      if (buff.text !== "") markdown.body.push(buff);

      if (!buff.includeNextLine) markdown.body.push(newLine());
      line = "";
      i++;
    }
  }
  return markdown;
}
