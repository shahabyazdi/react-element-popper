import React, { useState, useRef, useEffect } from "react"
import ElementPopper from "../../../index"

export default function (translate, language) {
  const navbar = {
    title: "NavBar",
    description: <>
      <NavBar />
      <p>{translate("style.css:")}</p>
      <pre>
        <code className="language-css">
          {
            `.nested-navbar {
  height: 55px;
  background-color: rgb(146, 146, 221);
  display: flex;
  justify-content: space-between;
}
          
.nested-navbar .navbar-item {
  background-color: white;
  padding: 5px 15px;
  border-radius: 5px;
  line-height: 20px;
  margin: 0 10px;
  cursor: pointer;
}
          
.nested-navbar .navbar-item:hover {
  background-color: rgb(170, 170, 247);
  color: white;
  transition: 0.4s;
}
          
.items {
  background-color: rgb(146, 146, 221);
  min-width: 100px;
}
          
.items .item {
  cursor: pointer;
  margin: 2px 0;
  font-size: 12px;
  color: white;
  padding: 2px 10px;
  width: 100%;
  box-sizing: border-box;
}
          
.items .item:hover {
  background-color: rgb(115, 115, 196);
}
          
.items .item span {
  float: right;
}`
          }
        </code>
      </pre>
      <pre>
        <code className="language-jsx">
          {
            `function NavBar() {
  const [navItem, setNavItem] = useState("")
  const navBarRef = useRef()
          
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        (
          navBarRef.current &&
          !navBarRef.current.contains(e.target) &&
          !e.target.classList.contains("navbar-item")
        ) ||
        e.target.classList.contains("navbar")
      ) {
        setNavItem("")
      }
    }
          
    document.addEventListener("click", handleClickOutSide)

    return () => document.removeEventListener("click", handleClickOutSide)
  }, [])
          
  const items = {
    home: [
      {
        name: "item 1",
        childs: [
          {
            name: "sub item 1",
            childs: [
              { name: "sub item 1" },
              { name: "sub item 2" },
              { name: "sub item 3" },
              { name: "sub item 4" },
              { name: "sub item 5" },
              { name: "sub item 6" }
            ]
          },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      },
      {
        name: "item 2",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" },
          { name: "sub item 5" },
          { name: "sub item 6" }
        ]
      },
      { name: "item 3" },
      { name: "item 4" }
    ],
    store: [
      { name: "item 1" },
      { name: "item 2" },
      { name: "item 3" },
      {
        name: "item 4",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      }
    ],
    docs: [
      { name: "item 1", },
      {
        name: "item 2",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          {
            name: "sub item 4",
            childs: [
              { name: "sub item 1" }
            ]
          }
        ]
      },
      { name: "item 3" },
      { name: "item 4" }
    ],
    about: [
      {
        name: "item 1",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      },
      { name: "item 2" },
      { name: "item 3" },
      { name: "item 4" }
    ]
  }
          
  const itemNames = Object.keys(items)
          
  return (
    <div
      ref={navBarRef}
      className="nested-navbar"
    >
      {itemNames.map((name, index) => {
        return (
          <ElementPopper
            key={index}
            element={<NavItem name={name} />}
            popper={navItem === name && (
              <List items={items[name]} />
            )}
            containerStyle={{ margin: "auto 0" }}
            offsetY={12}
            position={index === 0 ? "bottom-left" : index === (itemNames.length - 1) ? "bottom-right" : "bottom-center"}
            fixMainPosition
          />
        )
      })}
    </div>
  )
          
  function NavItem({ name }) {
    return (
      <div
        className="navbar-item"
        onClick={toggleVisible}
      >
        {name}
      </div>
    )
          
    function toggleVisible() {
      setNavItem(navItem === name ? "" : name)
    }
  }
          
  function List({ items }) {
    const [subMenu, setSubMenu] = useState("")
          
    return (
      <div className="items">
        {items.map((item, i) => {
          return (item.childs ?
            <ElementPopper
              key={i}
              element={<Item item={item} />}
              popper={subMenu === item.name && <List items={item.childs} />}
              containerStyle={{ width: "100%" }}
              position="right-top"
            /> :
            <Item key={i} item={item} />
          )
        })}
      </div>
    )
          
    function Item({ item }) {
      return (
        <div
          className="item"
          onMouseOver={() => openSubMenu(item.name)}
        >
          {item.name}
          {item.childs && <span>{">"}</span>}
        </div>
      )
    }
          
    function openSubMenu(name) {
      setSubMenu(name)
    }
  }
}`
          }
        </code>
      </pre>
    </>
  }


  return [
    navbar
  ]
}

function NavBar() {
  const [navItem, setNavItem] = useState("")
  const navBarRef = useRef()

  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        (
          navBarRef.current &&
          !navBarRef.current.contains(e.target) &&
          !e.target.classList.contains("navbar-item")
        ) ||
        e.target.classList.contains("navbar")
      ) {
        setNavItem("")
      }
    }

    document.addEventListener("click", handleClickOutSide)

    return () => document.removeEventListener("click", handleClickOutSide)
  }, [])

  const items = {
    home: [
      {
        name: "item 1",
        childs: [
          {
            name: "sub item 1",
            childs: [
              { name: "sub item 1" },
              { name: "sub item 2" },
              { name: "sub item 3" },
              { name: "sub item 4" },
              { name: "sub item 5" },
              { name: "sub item 6" }
            ]
          },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      },
      {
        name: "item 2",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" },
          { name: "sub item 5" },
          { name: "sub item 6" }
        ]
      },
      { name: "item 3" },
      { name: "item 4" }
    ],
    store: [
      { name: "item 1" },
      { name: "item 2" },
      { name: "item 3" },
      {
        name: "item 4",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      }
    ],
    docs: [
      { name: "item 1", },
      {
        name: "item 2",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          {
            name: "sub item 4",
            childs: [
              { name: "sub item 1" }
            ]
          }
        ]
      },
      { name: "item 3" },
      { name: "item 4" }
    ],
    about: [
      {
        name: "item 1",
        childs: [
          { name: "sub item 1" },
          { name: "sub item 2" },
          { name: "sub item 3" },
          { name: "sub item 4" }
        ]
      },
      { name: "item 2" },
      { name: "item 3" },
      { name: "item 4" }
    ]
  }

  const itemNames = Object.keys(items)

  return (
    <div
      ref={navBarRef}
      className="nested-navbar"
    >
      {itemNames.map((name, index) => {
        return (
          <ElementPopper
            key={index}
            element={<NavItem name={name} />}
            popper={navItem === name && <List items={items[name]} />}
            containerStyle={{ margin: "auto 0" }}
            offsetY={12}
            position={index === 0 ? "bottom-left" : index === (itemNames.length - 1) ? "bottom-right" : "bottom-center"}
            fixMainPosition
          />
        )
      })}
    </div>
  )

  function NavItem({ name }) {
    return (
      <div
        className="navbar-item"
        onClick={toggleVisible}
      >
        {name}
      </div>
    )

    function toggleVisible() {
      setNavItem(navItem === name ? "" : name)
    }
  }

  function List({ items }) {
    const [subMenu, setSubMenu] = useState("")

    return (
      <div className="items">
        {items.map((item, i) => {
          return (item.childs ?
            <ElementPopper
              key={i}
              element={<Item item={item} />}
              popper={subMenu === item.name && <List items={item.childs} />}
              containerStyle={{ width: "100%" }}
              position="right-top"
            /> :
            <Item
              key={i}
              item={item}
            />
          )
        })}
      </div>
    )

    function Item({ item }) {
      return (
        <div
          className="item"
          onMouseOver={() => openSubMenu(item.name)}
        >
          {item.name}
          {item.childs && <span>{">"}</span>}
        </div>
      )
    }

    function openSubMenu(name) {
      setSubMenu(name)
    }
  }
}
