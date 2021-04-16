import { generateAST } from "./AST.ts";

export function generateHTMLfromString(string: string): string {
  const AST = generateAST(string);
  // const length = AST.body.length;
  // for (let i = 0; i < length; i++) {
  //   const node = AST.body[i];
  //   console.log(node);
  // }
  return JSON.stringify(AST);
}

export function generateHTMLfromFile(file: string | URL): string {
  return generateHTMLfromString(Deno.readTextFileSync(file));
}

export async function generateHTMLfromWeb(url: string | URL): Promise<string> {
  const res = await fetch(url);
  const contenttype = res.headers.get("content-type");
  if (
    res.status === 200 &&
    (contenttype?.includes("text/markdown") ||
      contenttype?.includes("text/plain"))
  ) {
    return generateHTMLfromString(await res.text());
  } else throw Error("INVALID URL!");
}
