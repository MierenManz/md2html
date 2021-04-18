import type { Node } from "./AST_types.ts";
import { NodeType } from "./AST_types.ts";

export function normalLine(line: string): Node {
  return {
    type: NodeType.NormalLine,
    text: line,
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}

export function newLine(): Node {
  return {
    type: NodeType.NewLine,
    includeNextLine: false,
    text: "undefined",
  };
}

export function listNode(line: string): Node {
  return {
    type: /^-\s+/.test(line) ? NodeType.UList : NodeType.SList,
    text: line,
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}

export function headerNode(line: string): Node {
  return {
    type: NodeType.Header,
    header: `H${line.split(" ")[0].length}`,
    text: line,
    includeNextLine: !(line.endsWith("  ") || line.endsWith("\\")),
  };
}
