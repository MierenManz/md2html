import type { Attributes, Node } from "./AST_types.ts";
import { NodeType } from "./AST_types.ts";

export function normalLine(line: string): Node {
  return {
    type: NodeType.NormalLine,
    text: {
      value: line,
      attributes: getAttributes(line),
    },
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}

export function newLine(): Node {
  return {
    type: NodeType.NewLine,
    includeNextLine: false,
  };
}

export function listNode(line: string): Node {
  return {
    type: /^-\s+/.test(line) ? NodeType.UList : NodeType.SList,
    text: {
      value: line,
      attributes: getAttributes(line),
    },
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}

export function headerNode(line: string): Node {
  return {
    type: NodeType.Header,
    header: `H${line.split(" ")[0].length}`,
    text: {
      value: line,
      attributes: getAttributes(line),
    },
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}

export function getAttributes(line: string): Attributes {
  return {
    imageOrLink: /\[(.*)\]\((.*)\)/.test(line),
    strike: /~~(.*)~~/.test(line),
    boldOrItalics: /\*(.*)\*|_(.*)_/.test(line),
  };
}
