import type { AST, Node } from "./AST_types.ts";
import {
  getAttributes,
  headerNode,
  listNode,
  newLine,
  normalLine,
} from "./AST_function.ts";

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
      let buff = {};
      line = line.trimStart();
      if (line[0] === "#") {
        line = line.trim();
        buff = headerNode(line, getAttributes(line));
        if (
          (buff as Node).text?.value.endsWith("\\") ||
          (buff as Node).text?.value.endsWith("  ")
        ) {
          markdown.body.push(newLine());
        }
        //deno-fmt-ignore
      } else if (line.substring(0, 2) === "- " || line.substring(0, 2) === "* " ||line.substring(0, 3).match(/[0-9]\.\s/g)) {
        markdown.body.push(listNode(line, getAttributes(line)));
      } else if (line !== "") {
        markdown.body.push(normalLine(line, getAttributes(line)));
      }
      i++;
      line = "";
    }
  }
  return markdown;
}

export function generateAST2(text: string): AST {
  const markdown: AST = {
    body: [],
  };
  const charArray = text.replace(/\r\n/g, "\n").split("");
  const arrayLength = charArray.length - 1;
  let line = "";
  let i = 0;
  let buff: Node = {} as Node;
  for (const [index, char] of charArray.entries()) {
    if (char !== "\n") line += char;
    if (char === "\n" || index === arrayLength) {
      if (line.startsWith("#")) {
        buff = headerNode(line, getAttributes(line));
      }
    }
  }
  return markdown;
}
