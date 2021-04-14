import type { Attributes, Node } from "./AST_types.ts";
import { NodeType } from "./AST_types.ts";

export function normalLine(text: string, attributes: Attributes): Node {
  return {
    type: NodeType.NormalLine,
    text: text,
    attributes,
  };
}

export function newLine(): Node {
  return {
    type: NodeType.NewLine,
  };
}
export function listNode(text: string, attributes: Attributes): Node {
  return {
    type: /^-\s+/.test(text) ? NodeType.UList : NodeType.SList,
    text,
    attributes,
  };
}
export function headerNode(text: string, attributes: Attributes): Node {
  return {
    type: NodeType.Header,
    header: `H${text.split(" ")[0].length}`,
    text,
    attributes,
  };
}

export function getAttributes(line: string): Attributes {
  return {
    imageOrLink: /\[(.*)\]\((.*)\)/.test(line),
    strike: /~~(.*)~~/.test(line),
    boldOrItalics: /\*(.*)\*|_(.*)_/.test(line),
  };
}
