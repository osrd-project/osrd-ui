import{r as a,R as t}from"./index-CDs2tPxN.js";import{I as M}from"./Input-D2xsEWuq.js";/* empty css              */import"./index-DX8y_bUt.js";import"./FieldWrapper-BC_XAz-G.js";import"./index.esm-DT8E0T4M.js";import"./InputStatusIcon-CDXi2xVw.js";import"./useFocusByTab-DneHm485.js";const P=(n,s,i=3,o=10)=>{const[c,p]=a.useState({top:0,left:0}),l=a.useCallback(()=>{if(n.current&&s.current){const r=n.current.getBoundingClientRect(),d=s.current.getBoundingClientRect();let u=r.left+r.width/2-d.width/2,f=r.bottom+window.scrollY-i;u+d.width>window.innerWidth?u=window.innerWidth-d.width-o:u<0&&(u=o),f+d.height>window.innerHeight&&(f=window.innerHeight-d.height-o),p({top:f,left:u})}},[n,s,i,o]);return a.useEffect(()=>{l();const r=()=>l();return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[l]),{modalPosition:c,calculatePosition:l}},y=(n,s)=>{a.useEffect(()=>{const i=o=>{n.current&&!n.current.contains(o.target)&&s(o)};return document.addEventListener("mousedown",i),()=>{document.removeEventListener("mousedown",i)}},[n,s])},H=({inputRef:n,isOpen:s,onClose:i,children:o})=>{const c=a.useRef(null),{modalPosition:p,calculatePosition:l}=P(n,c);return a.useEffect(()=>{s&&l()},[l,s]),y(c,i),s?t.createElement("div",{className:"modal-overlay"},t.createElement("div",{ref:c,className:"modal-content",style:{top:p.top,left:p.left}},o)):null},O=n=>{const[s,i]=a.useState("00"),[o,c]=a.useState("00"),[p,l]=a.useState(!1),r=a.useRef(null),d=a.useCallback(e=>{i(e)},[]),u=a.useCallback(e=>{c(e)},[]),f=a.useCallback(e=>{c(E=>{let m=E!==null?parseInt(E):0;return e==="UP"&&m<59?m++:e==="DOWN"&&m>0&&m--,m.toString().padStart(2,"0")})},[]),v=e=>{const E=e.target.value,[m,k]=E.split(":");m!==void 0&&k!==void 0&&(i(m),c(k))},w=s.padStart(2,"0"),h=o.padStart(2,"0"),C=`${w}:${h}`,g=[...Array(24).keys()].map(e=>e.toString().padStart(2,"0")),b=[...Array(12).keys()].map(e=>(e*5).toString().padStart(2,"0")),N=()=>{l(!0)},S=()=>l(!1);return t.createElement("div",{className:"time-picker"},t.createElement(M,{type:"time",name:"time",value:C,onClick:N,onChange:v,ref:r,...n}),t.createElement(H,{inputRef:r,isOpen:p,onClose:S},t.createElement("div",{className:"time-picker-container"},t.createElement("div",{className:"time-grid"},g.map(e=>t.createElement("div",{key:e,className:`hour ${s===e?"selected":""}`,onClick:()=>d(e)},e))),t.createElement("div",{className:"time-separator"},":"),t.createElement("div",{className:"minute-container"},t.createElement("div",{className:"time-grid"},b.map(e=>t.createElement("div",{key:e,className:`minute ${o===e?"selected":""}`,onClick:()=>u(e)},e))),t.createElement("div",{className:"minute-buttons"},t.createElement("button",{onClick:()=>f("DOWN"),className:"minute-button"},"-1mn"),t.createElement("button",{onClick:()=>f("UP"),className:"minute-button"},"+1mn"))))))},z={component:O,args:{disabled:!1,readOnly:!1},title:"TimePicker",tags:["autodocs"],decorators:[n=>t.createElement("div",{style:{maxWidth:"7rem"}},t.createElement(n,null))]},B={args:{label:"Heure"}},A={args:{disabled:!0,label:"Heure"}},U=["Default","DisabledTimePicker"];export{B as Default,A as DisabledTimePicker,U as __namedExportsOrder,z as default};
