import{c as _}from"./index-DX8y_bUt.js";import{r as b,R as x}from"./index-CDs2tPxN.js";import{P as w,X as k,Y as A,S as V,O as S,z,a as M}from"./utils-D1jM7My1.js";import{g as C}from"./vectors-BMNFZSin.js";/* empty css                        */import"./lodash-B2soob2o.js";import"./chroma-vMwKRLDS.js";function N(p,h){const d=h-p.points[0].time;return{...p,points:p.points.map(g=>({...g,time:g.time+d}))}}const I=({enableDragPaths:p,pickingTolerance:h,enableMultiSelection:d,spaceScaleType:g})=>{const[T,Z]=b.useState(w),[t,s]=b.useState({xOffset:0,yOffset:0,xZoomLevel:k,yZoomLevel:A,selection:null,panTarget:null,hoveredPath:null});return x.createElement("div",{className:"inset-0"},x.createElement(V,{className:_("inset-0 absolute p-0 m-0",t.panTarget&&"cursor-grabbing",t.hoveredPath&&"cursor-pointer"),operationalPoints:S,spaceOrigin:0,spaceScales:S.slice(0,-1).map((a,e)=>({from:a.position,to:S[e+1].position,...g==="linear"?{size:50*t.yZoomLevel}:{coefficient:150/t.yZoomLevel}})),timeOrigin:+new Date("2024/04/02"),timeScale:6e4/t.xZoomLevel,xOffset:t.xOffset,yOffset:t.yOffset,onClick:({event:a})=>{const{hoveredPath:e,selection:r,panTarget:l}=t;if(!l)if(!e)(!d||!a.ctrlKey)&&s(i=>({...i,selection:null}));else if(!r)s({...t,selection:new Set([e.index])});else if(!d||!a.ctrlKey)s({...t,selection:r.has(e.index)?null:new Set([e.index])});else{const i=new Set(r);i.has(e.index)?i.delete(e.index):i.add(e.index),s({...t,selection:i.size?i:null})}},onHoveredChildUpdate:({item:a})=>{s(e=>({...e,hoveredPath:a}))},onPan:({initialPosition:a,position:e,initialData:r,data:l,isPanning:i})=>{const{panTarget:o,hoveredPath:c,selection:y}=t,P=C(a,e);if(!i)s(n=>({...n,panTarget:null}));else if(!o&&p&&c){const n=y!=null&&y.has(c.index)?y:new Set([c.index]);s(m=>({...m,selection:n,panTarget:{type:"items",initialTimeOrigins:Array.from(n).reduce((f,u)=>({...f,[u]:T[u].points[0].time}),{})}}))}else if(!o)s(n=>({...n,panTarget:{type:"stage",initialOffset:{x:n.xOffset,y:n.yOffset}}}));else if(o.type==="stage"){const n=o.initialOffset.x+P.x,m=o.initialOffset.y+P.y;s(f=>({...f,xOffset:n,yOffset:m}))}else if(o.type==="items"){const{initialTimeOrigins:n}=o,m=l.time-r.time;Z(f=>f.map((u,v)=>n[v]?N(u,n[v]+m):u))}},onZoom:a=>{s(e=>({...e,...z(e,a)}))}},T.map((a,e)=>{var r,l,i,o,c;return x.createElement(M,{key:a.id,index:e,path:a,color:a.color,pickingTolerance:h,level:((r=t.panTarget)==null?void 0:r.type)==="items"?(l=t.selection)!=null&&l.has(e)?1:4:(i=t.selection)!=null&&i.has(e)||((o=t.hoveredPath)==null?void 0:o.index)===e?1:(c=t.selection)!=null&&c.size?3:2})})))},j={title:"SpaceTimeChart/Paths interactions",component:I,argTypes:{enableDragPaths:{name:"Enable dragging paths?",defaultValue:!0,control:{type:"boolean"}},enableMultiSelection:{name:"Multi-selection?",defaultValue:!0,control:{type:"boolean"}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}},pickingTolerance:{name:"Picking tolerance",description:"(in pixels)",defaultValue:5,control:{type:"number",step:1,min:0,max:30}}}},O={name:"Default arguments",args:{enableDragPaths:!0,enableMultiSelection:!0,spaceScaleType:"linear",pickingTolerance:5}};var E,L,D;O.parameters={...O.parameters,docs:{...(E=O.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Default arguments',
  args: {
    enableDragPaths: true,
    enableMultiSelection: true,
    spaceScaleType: 'linear',
    pickingTolerance: 5
  }
}`,...(D=(L=O.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};const q=["DefaultArgs"];export{O as DefaultArgs,q as __namedExportsOrder,j as default};
