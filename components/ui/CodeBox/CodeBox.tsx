import React, { FC, useEffect, useRef, useState, useContext } from "react";
import { MainContext } from "context/MainProvider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { hopscotch } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBox: FC<codeBoxInterface> = ({ extendClasses, children }) => {
  const [code, setCode] = useState<codeInterface>({
    body: "",
    latestCharIndex: 0,
  });

  const { currentWallet } = useContext(MainContext);

  useEffect(() => {
    code.latestCharIndex &&
      setCode({ body: children, latestCharIndex: children.length });
  }, [children]);

  useEffect(() => {
    if (currentWallet) {
      let intervalId = setInterval(() => {
        if (code.latestCharIndex < children.length) {
          setCode({
            ...code,
            latestCharIndex: code.latestCharIndex + 1,
            body: code.body + children.charAt(code.latestCharIndex),
          });
        } else {
          clearInterval(intervalId);
        }
      }, 15);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [code, currentWallet]);
  return (
    <SyntaxHighlighter
      language="solidity"
      style={hopscotch}
      wrapLongLines
      codeTagProps={{
        style: {
          backgroundColor: "transparent",
        },
      }}
      customStyle={{
        backgroundColor: "#191635",
        fontSize: "inherit",
        padding: "0",
      }}
      className={`break-all`}
    >
      {code.body}
    </SyntaxHighlighter>
  );
};
export default CodeBox;
export interface codeBoxInterface {
  children: string;
  extendClasses?: string;
}
export interface codeInterface {
  body: string;
  latestCharIndex: number;
}
