import{f,S as H,L as O}from"./exports-maplibre-DyOGFD38.js";/* empty css                    */import{r as R,R as e}from"./index-CDs2tPxN.js";import{u as x,L as G,B as b,O as c,W as w,a as C,P as I,c as N,d as U,b as j,e as v}from"./helpers-YLlfLgms.js";import"./iframe-B-jqbcF-.js";import"../sb-preview/runtime.js";import"./index-B-yFm4aN.js";import"./lodash-B2soob2o.js";const m=[C],B={id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}},M=({path:n})=>{const p=x(()=>fetch(`/${n}.json`).then(T=>T.json()),[n]),a=p.type==="ready"?p.data:null,A=R.useMemo(()=>f(a?[a]:[]),[a]);return a?e.createElement("div",{key:n,style:{background:"lightgrey",display:"flex",flexDirection:"row",alignItems:"stretch",position:"absolute",inset:0}},e.createElement("div",{style:{marginRight:"1em",flexGrow:1}},e.createElement(b,{path:a,sources:m,mapStyle:c},e.createElement(H,{type:"geojson",data:A},e.createElement(O,{id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}})))),e.createElement("div",{style:{flexGrow:1}},e.createElement(w,{log:!0,path:a,pathLayer:B,sources:m,mapStyle:c}))):e.createElement(G,null)};M.__docgenInfo={description:"",methods:[],displayName:"SampleMap",props:{path:{required:!0,tsType:{name:"string"},description:""}}};const F={component:M,title:"WarpedMap component",argTypes:{path:{options:I,control:{type:"radio"}}}},t={name:"Short path",args:{path:N}},r={name:"Medium path",args:{path:U}},o={name:"Long path",args:{path:j}},s={name:"Longer path",args:{path:v}};var i,l,h;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Short path',
  args: {
    path: PATH_SHORT
  }
}`,...(h=(l=t.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var d,u,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Medium path',
  args: {
    path: PATH_MEDIUM
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var S,y,E;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Long path',
  args: {
    path: PATH_LONG
  }
}`,...(E=(y=o.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var P,_,L;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Longer path',
  args: {
    path: PATH_EXTRA_LONG
  }
}`,...(L=(_=s.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};const J=["PathShort","PathMedium","PathLong","PathLonger"];export{o as PathLong,s as PathLonger,r as PathMedium,t as PathShort,J as __namedExportsOrder,F as default};
