export enum NodeType {
  Header = "HEADER",
  NewLine = "NEW_LINE",
  EmptyLine = "EMPTY_LINE",
  NormalLine = "NORMAL_LINE",
  UList = "UNSORTED_LIST",
  SList = "SORTED_LIST",
}

export interface Attributes {
  imageOrLink: boolean;
  strike: boolean;
  boldOrItalics: boolean;
}

export interface BaseNode {
  type: NodeType;
}

export interface Markdown {
  body: BaseNode[];
}

export interface HeaderNode extends BaseNode {
  attributes: Attributes;
  header: string;
  text: string;
}

export interface ListNode extends BaseNode {
  attributes: Attributes;
  text: string;
}

export interface NormalNode extends BaseNode {
  text: string;
  attributes: Attributes;
}
