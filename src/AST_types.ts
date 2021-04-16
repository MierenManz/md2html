export enum NodeType {
  Header = "HEADER",
  NewLine = "NEW_LINE",
  NormalLine = "NORMAL_LINE",
  UList = "UNSORTED_LIST",
  SList = "SORTED_LIST",
}

export interface Attributes {
  imageOrLink: boolean;
  strike: boolean;
  boldOrItalics: boolean;
}
export interface Text {
  value: string;
  attributes: Attributes;
}
export interface Node {
  type: NodeType;
  header?: string;
  text?: Text;
  includeNextLine: boolean;
}

export interface AST {
  body: Node[];
}
