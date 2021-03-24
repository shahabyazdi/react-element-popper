(self.webpackChunkreact_element_popper=self.webpackChunkreact_element_popper||[]).push([[108],{9860:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var m=t(7294),i=t(591),a=t(320);function s(e,n){return[{title:"NavBar",description:m.createElement(m.Fragment,null,m.createElement(r,null),m.createElement("p",null,e("style.css:")),m.createElement("pre",null,m.createElement("code",{className:"language-css"},".nested-navbar {\n  height: 55px;\n  background-color: rgb(146, 146, 221);\n  display: flex;\n  justify-content: space-between;\n}\n          \n.nested-navbar .navbar-item {\n  background-color: white;\n  padding: 5px 15px;\n  border-radius: 5px;\n  line-height: 20px;\n  margin: 0 10px;\n  cursor: pointer;\n}\n          \n.nested-navbar .navbar-item:hover {\n  background-color: rgb(170, 170, 247);\n  color: white;\n  transition: 0.4s;\n}\n          \n.items {\n  background-color: rgb(146, 146, 221);\n  min-width: 100px;\n}\n          \n.items .item {\n  cursor: pointer;\n  margin: 2px 0;\n  font-size: 12px;\n  color: white;\n  padding: 2px 10px;\n  width: 100%;\n  box-sizing: border-box;\n}\n          \n.items .item:hover {\n  background-color: rgb(115, 115, 196);\n}\n          \n.items .item span {\n  float: right;\n}")),m.createElement("pre",null,m.createElement("code",{className:"language-jsx"},'function NavBar() {\n  const [navItem, setNavItem] = useState("")\n  const navBarRef = useRef()\n          \n  useEffect(() => {\n    function handleClickOutSide(e) {\n      if (\n        (\n          navBarRef.current &&\n          !navBarRef.current.contains(e.target) &&\n          !e.target.classList.contains("navbar-item")\n        ) ||\n        e.target.classList.contains("navbar")\n      ) {\n        setNavItem("")\n      }\n    }\n          \n    document.addEventListener("click", handleClickOutSide)\n\n    return () => document.removeEventListener("click", handleClickOutSide)\n  }, [])\n          \n  const items = {\n    home: [\n      {\n        name: "item 1",\n        childs: [\n          {\n            name: "sub item 1",\n            childs: [\n              { name: "sub item 1" },\n              { name: "sub item 2" },\n              { name: "sub item 3" },\n              { name: "sub item 4" },\n              { name: "sub item 5" },\n              { name: "sub item 6" }\n            ]\n          },\n          { name: "sub item 2" },\n          { name: "sub item 3" },\n          { name: "sub item 4" }\n        ]\n      },\n      {\n        name: "item 2",\n        childs: [\n          { name: "sub item 1" },\n          { name: "sub item 2" },\n          { name: "sub item 3" },\n          { name: "sub item 4" },\n          { name: "sub item 5" },\n          { name: "sub item 6" }\n        ]\n      },\n      { name: "item 3" },\n      { name: "item 4" }\n    ],\n    store: [\n      { name: "item 1" },\n      { name: "item 2" },\n      { name: "item 3" },\n      {\n        name: "item 4",\n        childs: [\n          { name: "sub item 1" },\n          { name: "sub item 2" },\n          { name: "sub item 3" },\n          { name: "sub item 4" }\n        ]\n      }\n    ],\n    docs: [\n      { name: "item 1", },\n      {\n        name: "item 2",\n        childs: [\n          { name: "sub item 1" },\n          { name: "sub item 2" },\n          { name: "sub item 3" },\n          {\n            name: "sub item 4",\n            childs: [\n              { name: "sub item 1" }\n            ]\n          }\n        ]\n      },\n      { name: "item 3" },\n      { name: "item 4" }\n    ],\n    about: [\n      {\n        name: "item 1",\n        childs: [\n          { name: "sub item 1" },\n          { name: "sub item 2" },\n          { name: "sub item 3" },\n          { name: "sub item 4" }\n        ]\n      },\n      { name: "item 2" },\n      { name: "item 3" },\n      { name: "item 4" }\n    ]\n  }\n          \n  const itemNames = Object.keys(items)\n          \n  return (\n    <div\n      ref={navBarRef}\n      className="nested-navbar"\n    >\n      {itemNames.map((name, index) => {\n        return (\n          <ElementPopper\n            key={index}\n            element={<NavItem name={name} />}\n            popper={navItem === name && (\n              <List items={items[name]} />\n            )}\n            containerStyle={{ margin: "auto 0" }}\n            offsetY={12}\n            position={index === 0 ? "bottom-left" : index === (itemNames.length - 1) ? "bottom-right" : "bottom-center"}\n            fixMainPosition\n          />\n        )\n      })}\n    </div>\n  )\n          \n  function NavItem({ name }) {\n    return (\n      <div\n        className="navbar-item"\n        onClick={toggleVisible}\n      >\n        {name}\n      </div>\n    )\n          \n    function toggleVisible() {\n      setNavItem(navItem === name ? "" : name)\n    }\n  }\n          \n  function List({ items }) {\n    const [subMenu, setSubMenu] = useState("")\n          \n    return (\n      <div className="items">\n        {items.map((item, i) => {\n          return (item.childs ?\n            <ElementPopper\n              key={i}\n              element={<Item item={item} />}\n              popper={subMenu === item.name && <List items={item.childs} />}\n              containerStyle={{ width: "100%" }}\n              position="right-top"\n            /> :\n            <Item key={i} item={item} />\n          )\n        })}\n      </div>\n    )\n          \n    function Item({ item }) {\n      return (\n        <div\n          className="item"\n          onMouseOver={() => openSubMenu(item.name)}\n        >\n          {item.name}\n          {item.childs && <span>{">"}</span>}\n        </div>\n      )\n    }\n          \n    function openSubMenu(name) {\n      setSubMenu(name)\n    }\n  }\n}')))}]}function r(){var e=(0,m.useState)(""),n=e[0],t=e[1],i=(0,m.useRef)();(0,m.useEffect)((function(){function e(e){(i.current&&!i.current.contains(e.target)&&!e.target.classList.contains("navbar-item")||e.target.classList.contains("navbar"))&&t("")}return document.addEventListener("click",e),function(){return document.removeEventListener("click",e)}}),[]);var s={home:[{name:"item 1",childs:[{name:"sub item 1",childs:[{name:"sub item 1"},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4"},{name:"sub item 5"},{name:"sub item 6"}]},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4"}]},{name:"item 2",childs:[{name:"sub item 1"},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4"},{name:"sub item 5"},{name:"sub item 6"}]},{name:"item 3"},{name:"item 4"}],store:[{name:"item 1"},{name:"item 2"},{name:"item 3"},{name:"item 4",childs:[{name:"sub item 1"},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4"}]}],docs:[{name:"item 1"},{name:"item 2",childs:[{name:"sub item 1"},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4",childs:[{name:"sub item 1"}]}]},{name:"item 3"},{name:"item 4"}],about:[{name:"item 1",childs:[{name:"sub item 1"},{name:"sub item 2"},{name:"sub item 3"},{name:"sub item 4"}]},{name:"item 2"},{name:"item 3"},{name:"item 4"}]},r=Object.keys(s);return m.createElement("div",{ref:i,className:"nested-navbar"},r.map((function(e,t){return m.createElement(a.Z,{key:t,element:m.createElement(u,{name:e}),popper:n===e&&m.createElement(c,{items:s[e]}),containerStyle:{margin:"auto 0"},offsetY:12,position:0===t?"bottom-left":t===r.length-1?"bottom-right":"bottom-center",fixMainPosition:!0})})));function u(e){var i=e.name;return m.createElement("div",{className:"navbar-item",onClick:function(){t(n===i?"":i)}},i)}function c(e){var n=e.items,t=(0,m.useState)(""),i=t[0],s=t[1];return m.createElement("div",{className:"items"},n.map((function(e,n){return e.childs?m.createElement(a.Z,{key:n,element:m.createElement(r,{item:e}),popper:i===e.name&&m.createElement(c,{items:e.childs}),containerStyle:{width:"100%"},position:"right-top"}):m.createElement(r,{key:n,item:e})})));function r(e){var n=e.item;return m.createElement("div",{className:"item",onMouseOver:function(){return e=n.name,void s(e);var e}},n.name,n.childs&&m.createElement("span",null,">"))}}}function u(e){var n=e.pageContext.language||"en";return m.createElement(i.Z,{language:n,doc:s})}}}]);
//# sourceMappingURL=component---src-pages-navbar-js-3c57017984ee13d6e99f.js.map