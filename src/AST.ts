import type { Markdown } from "./AST_types.ts";
import {
  getAttributes,
  headerNode,
  listNode,
  newLine,
  normalLine,
} from "./AST_function.ts";

export function generateAST(text: string): Markdown {
  const markdown: Markdown = {
    body: [],
  };
  const charArray = text.replace(/\r\n/g, "\n").split("");
  const arrayLength = charArray.length - 1;
  let line = "";
  for (const [index, char] of charArray.entries()) {
    if (char !== "\n") line += char;
    if (char === "\n" || index === arrayLength) {
      line = line.trim();
      if (line[0] === "#") {
        markdown.body.push(headerNode(line, getAttributes(line)));
      } else if (
        line.substring(0, 2) === "- " ||
        line.substring(0, 3).match(/[0-9]\.\s/g)
      ) {
        markdown.body.push(listNode(line, getAttributes(line)));
      } else if (line !== "") {
        markdown.body.push(normalLine(line, getAttributes(line)));
      }
      markdown.body.push(newLine());
      line = "";
    }
  }
  return markdown;
}
