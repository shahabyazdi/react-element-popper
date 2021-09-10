import React, { useEffect, useState } from "react";
import ElementPopper from "../../../src/index";

export default function Doc(translate, language) {
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [isPopperReady, setIsPopperReady] = useState(false);

  const activeProp = {
    title: "Active Prop",
    description: (
      <>
        <p>{translate("active_prop_1")}</p>

        <pre>
          <code className="language-jsx">
            {`const [active, setActive] = useState(false)

<ElementPopper
  element={<Element />}
  popper={active && <Popper />}
/>`}
          </code>
        </pre>

        <p>{translate("active_prop_2")}</p>

        <pre>
          <code className="language-jsx">
            {`function AsyncPopper() {
  const [element, setElement] = useState()
          
  useEffect(() => {
    //async operation
    setTimeout(() => {
      setElement(
        <div 
          style={{ 
            width: "120px", 
            height: "120px",
            backgroundColor: "white" 
          }}
        >
          Popper Element
        </div>
      )
    }, 200);
  }, [])
          
  return element || <div>Loading ...</div>
}

const [active, setActive] = useState(false)

<ElementPopper
  element={<Element />}
  popper={<AsyncPopper />}
  active={active}
/>`}
          </code>
        </pre>

        <p>{translate("active_prop_3")}</p>
        <p>{translate("active_prop_4")}</p>
      </>
    ),
  };

  const firstExample = {
    title: "First Example",
    description: "first_example",
    code: `import React, { useState } from "react"
import ElementPopper from "react-element-popper"

function Component({ height, width, backgroundColor, children }) {
  return (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        backgroundColor,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {children}
    </div>
  )
}

export default function Example() {
  const [active, setActive] = useState(false)

  return (
    <>
      <button 
        onClick={() => setActive(!active)}
      >
        ${translate("toggle visible")}
      </button>
      <br />
      <ElementPopper
        element={(
          <Component
            height={40}
            width={120}
            backgroundColor="red"
          >
            Refrence Element
          </Component>
        )}
        popper={active && (
          <Component
            height={120}
            width={120}
            backgroundColor="gray"
          >
            Popper Element
          </Component>
        )}
        position="${language === "en" ? "right" : "left"}"
      />
    </>
  )
}`,
    jsx: (
      <>
        <button onClick={() => setActive(!active)}>
          {translate("toggle visible")}
        </button>
        <br />
        <ElementPopper
          element={
            <Component
              height={40}
              width={120}
              backgroundColor="red"
              translate={translate}
            >
              Refrence Element
            </Component>
          }
          popper={
            active && (
              <Component
                height={120}
                width={120}
                backgroundColor="gray"
                translate={translate}
              >
                Popper Element
              </Component>
            )
          }
          position={language === "en" ? "right" : "left"}
        />
      </>
    ),
  };

  const secondExample = {
    title: "Second Example",
    jsx: (
      <>
        <p>{translate("second_example")}</p>
        <button onClick={() => setActive1(!active1)}>
          {translate("toggle visible")}
        </button>
        <br />
        <ElementPopper
          element={
            <Component
              height={40}
              width={120}
              backgroundColor="red"
              translate={translate}
            >
              Refrence Element
            </Component>
          }
          popper={
            active1 && (
              <AsyncComponent
                height={120}
                width={120}
                backgroundColor="gray"
                translate={translate}
              >
                Popper Element
              </AsyncComponent>
            )
          }
          position={language === "en" ? "right" : "left"}
        />

        <pre>
          <code className="language-jsx">
            {`function AsyncComponent({ height, width, backgroundColor, children }) {
  const [props, setProps] = useState()
          
  useEffect(() => {
    setProps({
      style: {
        width: width + "px",
        height: height + "px",
        backgroundColor,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    })
  }, [height, width, backgroundColor])
          
  return props ?
    <div {...props}>
      {children}
    </div>
    :
    null
}

export default function Example() {
  const [active, setActive] = useState(false)

  return (
    <>
      <button 
        onClick={() => setActive(!active)}
      >
        ${translate("toggle visible")}
      </button>
      <br />
      <ElementPopper
        element={(
          <Component
            height={40}
            width={120}
            backgroundColor="red"
          >
            Refrence Element
          </Component>
        )}
        popper={active && (
          <AsyncComponent
            height={120}
            width={120}
            backgroundColor="gray"
          >
            Popper Element
          </AsyncComponent>
        )}
        position="${language === "en" ? "right" : "left"}"
      />
    </>
  )
}`}
          </code>
        </pre>

        <p>{translate("second_example_1")}</p>
        <p>{translate("second_example_2")}</p>

        <pre>
          <code className="language-jsx">
            {`export default function Example() {
  const [active, setActive] = useState(false)

  return (
    <>
      <button 
        onClick={() => setActive(!active)}
      >
        ${translate("toggle visible")}
      </button>
      <br />
      <ElementPopper
        element={(
          <Component
            height={40}
            width={120}
            backgroundColor="red"
          >
            Refrence Element
          </Component>
        )}
        popper={(
          <AsyncComponent
            height={120}
            width={120}
            backgroundColor="gray"
          >
            Popper Element
          </AsyncComponent>
        )}
        position="${language === "en" ? "right" : "left"}"
        active={active}
      />
    </>
  )
}`}
          </code>
        </pre>

        <button onClick={() => setActive2(!active2)}>
          {translate("toggle visible")}
        </button>
        <br />
        <ElementPopper
          element={
            <Component
              height={40}
              width={120}
              backgroundColor="red"
              translate={translate}
            >
              Refrence Element
            </Component>
          }
          popper={
            <AsyncComponent
              height={120}
              width={120}
              backgroundColor="gray"
              translate={translate}
            >
              Popper Element
            </AsyncComponent>
          }
          position={language === "en" ? "right" : "left"}
          active={active2}
        />

        <p>{translate("second_example_3")}</p>
      </>
    ),
  };

  const thirdExample = {
    title: "Third Example",
    jsx: (
      <>
        <p>{translate("third_example")}</p>
        <p>{translate("third_example_1")}</p>

        <pre>
          <code className="language-jsx">
            {`function AsyncComponent({ height, width, backgroundColor, children, onReady }) {
  const [state, setState] = useState({})
            
  useEffect(() => {
    setState({
      props: {
        style: {
          width: width + "px",
          height: height + "px",
          backgroundColor,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }
      },
      ready: true
    })
  }, [height, width, backgroundColor])
            
  useEffect(() => {
    if (!state.ready) return

    onReady()
  }, [state.ready, onReady])
            
  return state.ready ?
    <div {...state.props}>
      {children}
    </div>
    :
    null
}
            
export default function Example() {
  const [active, setActive] = useState(false)
  const [isPopperReady, setIsPopperReady] = useState(false)
            
  return (
    <>
      <button 
        onClick={() => {
          if (!active) {
            setActive(true)
          } else {
            setActive(false)
            setIsPopperReady(false)
          }
        }}
      >
        ${translate("toggle visible")}
      </button>
      <br />
      <ElementPopper
        element={(
          <Component
            height={40}
            width={120}
            backgroundColor="red"
          >
            Refrence Element
          </Component>
        )}
        popper={active && (
          <AsyncComponent
            height={120}
            width={120}
            backgroundColor="gray"
            onReady={() => setIsPopperReady(true)}
          >
            Popper Element
          </AsyncComponent>
        )}
        position="${language === "en" ? "right" : "left"}"
        active={isPopperReady}
      />
    </>
  )
}`}
          </code>
        </pre>

        <button
          onClick={() => {
            if (!active3) {
              setActive3(true);
            } else {
              setActive3(false);
              setIsPopperReady(false);
            }
          }}
        >
          {translate("toggle visible")}
        </button>
        <br />
        <ElementPopper
          element={
            <Component
              height={40}
              width={120}
              backgroundColor="red"
              translate={translate}
            >
              Refrence Element
            </Component>
          }
          popper={
            active3 && (
              <AsyncComponent2
                height={120}
                width={120}
                backgroundColor="gray"
                translate={translate}
                onReady={() => {
                  setIsPopperReady(true);
                }}
              >
                Popper Element
              </AsyncComponent2>
            )
          }
          position={language === "en" ? "right" : "left"}
          active={isPopperReady}
        />
      </>
    ),
  };

  return [activeProp, firstExample, secondExample, thirdExample];
}

function Component({ height, width, backgroundColor, children, translate }) {
  return (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        backgroundColor,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: "16px",
      }}
    >
      {translate(children)}
    </div>
  );
}

function AsyncComponent({
  height,
  width,
  backgroundColor,
  children,
  translate,
}) {
  const [props, setProps] = useState();

  useEffect(() => {
    setProps({
      style: {
        width: width + "px",
        height: height + "px",
        backgroundColor,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    });
  }, [height, width, backgroundColor]);

  return props ? <div {...props}>{translate(children)}</div> : null;
}

function AsyncComponent2({
  height,
  width,
  backgroundColor,
  children,
  onReady,
  translate,
}) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      props: {
        style: {
          width: width + "px",
          height: height + "px",
          backgroundColor,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
      ready: true,
    });
  }, [height, width, backgroundColor]);

  useEffect(() => {
    if (!state.ready) return;

    onReady();
  }, [state.ready, onReady]);

  return state.ready ? <div {...state.props}>{translate(children)}</div> : null;
}
