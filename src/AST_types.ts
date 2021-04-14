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

export interface Node {
  type: NodeType;
  attributes?: Attributes;
  header?: string;
  text?: string;
}

export interface AST {
  body: Node[];
}
