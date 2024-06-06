import{c as u}from"./index-DX8y_bUt.js";import{R as a,r as E}from"./index-CDs2tPxN.js";import{w as q,s as x,_ as B,N as W,A as j,r as S,a as K,T as U}from"./index.esm-DT8E0T4M.js";function M(e,s){var l={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&s.indexOf(t)<0&&(l[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var n=0;for(t=Object.getOwnPropertySymbols(e);n<t.length;n++)s.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(l[t[n]]=e[t[n]])}return l}const z=({htmlFor:e,text:s,required:l,hasHint:t,disabled:n,small:r=!1})=>a.createElement("div",{className:u("base-label-wrapper",{"has-hint":t,small:r})},l&&a.createElement("span",{className:"required"},a.createElement(B,null)),a.createElement("label",{className:u("label",{disabled:n}),htmlFor:e},s)),F=({text:e})=>a.createElement("span",{className:"base-hint"},e),R=({status:e,message:s})=>a.createElement("span",{className:u("base-status-message",{[e]:e})},s),P=({status:e,small:s})=>{const l=s?"sm":"lg";return a.createElement("span",{className:u("status-icon",e)},e==="loading"&&a.createElement(W,{size:l}),e==="info"&&a.createElement(j,{size:l}),e==="success"&&a.createElement(S,{variant:"fill",size:l}),e==="warning"&&a.createElement(K,{variant:"fill",size:l}),e==="error"&&a.createElement(U,{variant:"fill",size:l}))},v=({id:e,label:s,hint:l,required:t,disabled:n,statusWithMessage:r,small:i=!1,className:o,children:p})=>{const d=r?{[r.status]:!0}:{};return a.createElement("div",{className:u("feed-back",d,o,{small:i})},a.createElement("div",{className:"custom-field"},a.createElement(z,{htmlFor:e,text:s,required:t,hasHint:!!l,disabled:n,small:i}),l&&a.createElement(F,{text:l}),a.createElement("div",{className:"field-wrapper-and-status-icon"},p,r&&a.createElement(P,{status:r.status,small:i})),(r==null?void 0:r.message)&&a.createElement(R,{status:r.status,message:r.message})))};function T({onBlur:e,onKeyUp:s}){const[l,t]=E.useState(!1);return{handleKeyUp:E.useCallback(n=>{n.key==="Tab"&&t(!0),s==null||s(n)},[s]),handleBlur:E.useCallback(n=>{t(!1),e==null||e(n)},[e]),isFocusByTab:l}}const f=({value:e,type:s,disabled:l,readOnly:t})=>{const n=typeof e=="object"&&e!==null&&"onClickCallback"in e,r=n?e.content:e,i=n?{onClick:e.onClickCallback}:{};return a.createElement("div",Object.assign({className:u(`${s}-content-wrapper`,{disabled:l,"read-only":t})},i),a.createElement("span",{className:`${s}-content`},r))},N=a.forwardRef((e,s)=>{var{id:l,label:t,type:n,hint:r,leadingContent:i,trailingContent:o,required:p,disabled:d=!1,readOnly:b=!1,statusWithMessage:m,inputWrapperClassname:h,small:y=!1,onKeyUp:g,onBlur:c}=e,w=M(e,["id","label","type","hint","leadingContent","trailingContent","required","disabled","readOnly","statusWithMessage","inputWrapperClassname","small","onKeyUp","onBlur"]);const{handleKeyUp:O,handleBlur:C,isFocusByTab:k}=T({onBlur:c,onKeyUp:g});return a.createElement(v,{id:l,label:t,hint:r,statusWithMessage:m,disabled:d,required:p,small:y},a.createElement("div",{className:u("input-wrapper",h,{small:y,"focused-by-tab":k})},i&&a.createElement(f,{value:i,type:"leading",disabled:d,readOnly:b}),a.createElement("input",Object.assign({ref:s,className:u("input",{"with-leading-only":i&&!o,"with-trailing-only":o&&!i,"with-leading-and-trailing":i&&o,[(m==null?void 0:m.status)||""]:!!m}),id:l,type:n,disabled:d,readOnly:b,onKeyUp:O,onBlur:C},w)),o&&a.createElement(f,{value:o,type:"trailing",disabled:d,readOnly:b})))});N.displayName="Input";const $=a.forwardRef((e,s)=>{const[l,t]=E.useState(!1);return a.createElement(N,Object.assign({},e,{type:l?"text":"password",trailingContent:{content:l?a.createElement(q,null):a.createElement(x,null),onClickCallback:()=>t(!l)},inputWrapperClassname:"password-input",ref:s}))});$.displayName="PasswordInput";const I=a.forwardRef(({id:e,label:s,hint:l,value:t,options:n,placeholder:r,statusWithMessage:i,required:o,disabled:p,readOnly:d,small:b,onChange:m},h)=>{t&&t!=""&&!n.some(c=>c.value===t)&&console.warn(`option "${t}" does not match any option`);const[y,g]=E.useState(t||"");return a.createElement(v,{id:e,label:s,hint:l,statusWithMessage:i,required:o,disabled:p,small:b},a.createElement("select",{className:u("custom-select",{"placeholder-selected":y==="",small:b,"read-only":d,[(i==null?void 0:i.status)||""]:!!i}),value:y,required:o,disabled:p||d,ref:h,onChange:c=>{g(c.target.value),m==null||m(c)}},a.createElement("option",{value:""},r?`– ${r} –`:""),n.map(c=>a.createElement("option",{key:c.value,value:c.value},c.label))))});I.displayName="Select";export{N as O};
