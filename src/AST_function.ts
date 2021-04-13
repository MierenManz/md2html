import {
  Attributes,
  BaseNode,
  HeaderNode,
  ListNode,
  NodeType,
  NormalNode,
} from "./AST_types.ts";

export function normalLine(text: string, attributes: Attributes): NormalNode {
  return {
    type: NodeType.NormalLine,
    text: text,
    attributes,
  };
}

export function newLine(): BaseNode {
  return {
    type: NodeType.NewLine,
  };
}
export function listNode(text: string, attributes: Attributes): ListNode {
  return {
    type: /^-\s+/.test(text) ? NodeType.UList : NodeType.SList,
    text,
    attributes,
  };
}
export function headerNode(text: string, attributes: Attributes): HeaderNode {
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
