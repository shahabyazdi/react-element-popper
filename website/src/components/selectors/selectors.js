import React from "react"

export function Selector({ title, value = "", options = [], onChange = () => { }, disabled, translate }) {
  return (
    <div className="form-group flex-1">
      <label>{translate(title)}</label>
      <select className="select full-width" value={value} onChange={e => onChange(e.target.value)} disabled={disabled} onBlur={() => { }}>
        {options.map((item, index) => <option key={index} value={item[1]}>{translate(item[0])}</option>)}
      </select>
    </div>
  )
}

export default function Selectors({ selectors, translate }) {
  let result = []

  for (let i = 0; i < selectors.length; i += 2) {
    let first = selectors[i]
    let second = selectors[i + 1]

    if (!first) break

    result.push(
      <div key={i} className="display-flex">
        <Selector
          translate={translate}
          title={first.title}
          disabled={first.disabled}
          value={first.value}
          options={first.options}
          onChange={first.onChange}
        />
        {second &&
          <Selector
            translate={translate}
            title={second.title}
            disabled={second.disabled}
            value={second.value}
            options={second.options}
            onChange={second.onChange}
          />
        }
      </div>
    )
  }

  return result
}