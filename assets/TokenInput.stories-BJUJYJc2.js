import{r as n,R as e}from"./index-CDs2tPxN.js";/* empty css              */import{c as T}from"./index-DX8y_bUt.js";import{Z as g}from"./index.esm-DT8E0T4M.js";const N=({label:s,tokens:m})=>{const[u,l]=n.useState(m),[o,r]=n.useState(""),[p,k]=n.useState(null),c=n.useRef(null),i=t=>{t.key==="Enter"&&o.trim()!==""&&(l(a=>[...a,o]),r(""))},f=t=>{var a;t.target===t.currentTarget&&((a=c.current)==null||a.focus())};return e.createElement("div",{className:"token-input-wrapper"},e.createElement("label",{className:"input-label"},s),e.createElement("div",{className:"tokens-wrapper",onClick:f},u.map((t,a)=>e.createElement("div",{key:`${t}-${a}`,onClick:()=>k(a),className:T("token-item-wrapper",{selected:p===a})},e.createElement("span",{className:"token-label"},t),e.createElement("span",{className:"token-close-btn",onClick:()=>l(d=>d.filter((v,E)=>E!==a))},e.createElement(g,null)))),e.createElement("input",{type:"text",value:o,onChange:t=>r(t.target.value),onKeyDown:i,className:"token-input",ref:c})))},C={component:N,args:{label:"Favorite colors",tokens:["Yellow","Orange","Red","Black"]},decorators:[s=>e.createElement("div",{style:{maxWidth:"20rem"}},e.createElement(s,null))],title:"TokenInput",tags:["autodocs"]},S={args:{}},h=["Default"];export{S as Default,h as __namedExportsOrder,C as default};
