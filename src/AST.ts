type Header = "H6" | "H5" | "H4" | "H3" | "H2" | "H1";
enum NodeType {
  Header = "HEADER",
  NewLine = "NEWLINE",
  EmptyLine = "EMPTYLINE",
  NormalLine = "NORMALLINE",
}
interface Attributes {
  strike: boolean;
  boldOrItalics: boolean;
}
interface BaseNode {
  type: NodeType;
}

interface Markdown {
  body: BaseNode[];
}

interface HeaderNode extends BaseNode {
  attributes: Attributes;
  text: string;
  header: Header | null;
}

interface NormalNode extends BaseNode {
  attributes: Attributes;
  text: string;
}

const headers: Record<string, Header> = {
  "######": "H6",
  "#####": "H5",
  "####": "H4",
  "###": "H3",
  "##": "H2",
  "#": "H1",
};
export function generateAST(text: string): Markdown {
  const markdown: Markdown = {
    body: [],
  };
  const charArray = text.replace(/\r\n/g, "\n").split("");
  const arrayLength = charArray.length - 1;
  let line = "";
  for (const index in charArray) {
    const char = charArray[index];
    if (char !== "\n") line += char;
    if (char === "\n" || index === arrayLength.toString()) {
      const attributes = getAttributes(line);
      if (line[0] === "#") {
        markdown.body.push(headerNode(line, attributes));
      } else if (line !== "") {
        markdown.body.push(normalLine(line, attributes));
      }
      markdown.body.push(newLine());
      line = "";
    }
  }
  return markdown;
}

function normalLine(text: string, attributes: Attributes): NormalNode {
  return {
    type: NodeType.NormalLine,
    text: text,
    attributes,
  } as NormalNode;
}

function newLine(): BaseNode {
  return {
    type: NodeType.NewLine,
  };
}

function headerNode(text: string, attributes: Attributes): HeaderNode {
  const obj: Record<string, string | Attributes> = {
    type: NodeType.Header,
    attributes,
  };
  obj.header = headers[text.split(" ")[0]] ?? null;
  obj.text = text;
  return obj as unknown as HeaderNode;
}

function getAttributes(line: string): Attributes {
  return {
    strike: RegExp("~~(.*)~~").test(line),
    boldOrItalics: RegExp("\\*(.*)\\*|_(.*)_").test(line),
  };
}

const md = await Deno.readTextFile("./ree.md");

const s = performance.now();
const ree = generateAST(md);
const e = performance.now();
console.log(ree, e - s);
