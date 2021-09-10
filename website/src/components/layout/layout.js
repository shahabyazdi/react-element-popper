import React, { useState, useEffect, useRef } from "react";
import Title from "../title/title";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Demo from "../demo/demo";
import Example from "../example/example";
import Prism from "prismjs";
import Arrow from "../arrow/arrow";
import english from "../../languages/en.json";
import farsi from "../../languages/fa.json";
import useClickOutSide from "./useClickOutside";

import "./layout.css";
import "./multi_select.css";
import "./navbar.css";

import "prismjs/components/prism-jsx.min";
import "prismjs/themes/prism-okaidia.css";

const sidebar = {
  default: [
    { name: "Home", path: "" },
    { name: "Installation & Usage", path: "installation/" },
    { name: "Props & Positions", path: "props/" },
    { name: "Core Concepts", path: "core-concepts/" },
    { name: "Active Prop", path: "active-prop/" },
    { name: "Refreshing Position", path: "refresh-position/" },
    { name: "Creating DropDown", path: "dropdown/" },
    { name: "Nested DropDown", path: "nested-dropdown/" },
    { name: "Multi Select & Handle Click Outside", path: "multi-select/" },
    { name: "NavBar", path: "navbar/" },
  ],
};

export default function Layout({ language, doc, section }) {
  const [active, setActive] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => Prism.highlightAll(), [doc]);

  useClickOutSide(sidebarRef, setActive);

  const toggleSidebar = () => setActive(!active);

  const translate = (string) =>
    language === "fa" ? farsi[string] ?? string : english[string] ?? string;

  const pathname =
    typeof window !== "undefined"
      ? window.location.pathname.replace("/react-element-popper", "")
      : "";

  return (
    <main className={language === "fa" ? "rtl" : ""}>
      <Title
        language={language}
        translate={translate}
        section={section}
        sidebar={sidebar}
        pathname={pathname}
      />

      <Navbar
        language={language}
        toggleSidebar={toggleSidebar}
        pathname={pathname}
      />

      <Sidebar
        ref={sidebarRef}
        sidebar={sidebar}
        pathname={pathname}
        language={language}
        translate={translate}
        section={section}
        active={active}
      />

      <div className="main">
        <div className="scroll-to-top">
          <Arrow direction="rmdp-up" />
        </div>
        {getDoc()}
      </div>
    </main>
  );

  function getDoc() {
    if (!doc) return <Demo language={language} translate={translate} />;

    doc = doc(translate, language, Code);

    return doc.map(
      ({ title = "", description = "", code = "", jsx }, index) => {
        title = translate(title);
        description = translate(description);

        if (Array.isArray(description)) {
          description = description.map((desc, index) => {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: `<p>${desc}</p>` }}
              ></div>
            );
          });
        } else if (typeof description === "string") {
          description = (
            <div
              dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }}
            ></div>
          );
        }

        return (
          <div key={index}>
            <Example
              id={title.replace(/\s/g, "-").toLowerCase()}
              title={title}
              description={description}
              code={code}
              jsx={jsx}
            />
          </div>
        );
      }
    );
  }

  function Code({ title, children, language = "jsx" }) {
    useEffect(() => Prism.highlightAll(), [children]);

    return (
      <>
        {title && <p>{translate(title)}</p>}
        <pre>
          <code className={"language-" + language}>{children}</code>
        </pre>
      </>
    );
  }
}
