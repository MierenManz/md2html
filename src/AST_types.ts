export enum NodeType {
  Header = "HEADER",
  NewLine = "NEW_LINE",
  NormalLine = "NORMAL_LINE",
  UList = "UNSORTED_LIST",
  SList = "SORTED_LIST",
}

export interface Attributes {
  code: boolean;
  imageOrLink: boolean;
  strike: boolean;
  boldOrItalics: boolean;
}

export interface Node {
  type: NodeType;
  header?: string;
  text: string;
  includeNextLine: boolean;
}

export interface AST {
  body: Node[];
}
