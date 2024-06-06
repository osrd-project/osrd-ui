import{c as x}from"./index-DX8y_bUt.js";import{r as g,R as s}from"./index-CDs2tPxN.js";import{X as Z,Y as L,S as _,O as l,d,e as v,f as E,h as M,P as S,a as b}from"./utils-CC6EGafI.js";import{g as h}from"./vectors-BiytCEVh.js";/* empty css                        */import"./lodash-B2soob2o.js";import"./chroma-vMwKRLDS.js";const P=({xPan:f,yPan:m,xZoom:p,yZoom:c,spaceScaleType:y})=>{const[t,u]=g.useState({xOffset:0,yOffset:0,xZoomLevel:Z,yZoomLevel:L,panning:null});return s.createElement("div",{className:"inset-0"},s.createElement(_,{className:x("inset-0 absolute p-0 m-0",t.panning&&"cursor-grabbing"),operationalPoints:l,spaceOrigin:0,spaceScales:l.slice(0,-1).map((o,n)=>({from:o.position,to:l[n+1].position,...y==="linear"?{size:50*t.yZoomLevel}:{coefficient:150/t.yZoomLevel}})),timeOrigin:+new Date("2024/04/02"),timeScale:6e4/t.xZoomLevel,xOffset:t.xOffset,yOffset:t.yOffset,onPan:({initialPosition:o,position:n,isPanning:i})=>{if(!f&&!m)return;const a=h(o,n);u(e=>{if(i)if(e.panning){const{initialOffset:O}=e.panning,r={...e};return f&&(r.xOffset=O.x+a.x),m&&(r.yOffset=O.y+a.y),r}else return{...e,panning:{initialOffset:{x:e.xOffset,y:e.yOffset}}};else return{...e,panning:null}})},onZoom:({delta:o,position:{x:n,y:i}})=>{!p&&!c||u(a=>{const e={...a};return p&&(e.xZoomLevel=Math.min(Math.max(e.xZoomLevel*(1+o/10),d),v),e.xOffset=n-(n-a.xOffset)/a.xZoomLevel*e.xZoomLevel),c&&(e.yZoomLevel=Math.min(Math.max(e.yZoomLevel*(1+o/10),E),M),e.yOffset=i-(i-a.yOffset)/a.yZoomLevel*e.yZoomLevel),e})}},S.map((o,n)=>s.createElement(b,{key:o.id,index:n,path:o,color:o.color}))))},I={title:"SpaceTimeChart/Panning and zooming",component:P,argTypes:{xPan:{name:"Enable panning on the X axis?",defaultValue:!0,control:{type:"boolean"}},yPan:{name:"Enable panning on the Y axis?",defaultValue:!0,control:{type:"boolean"}},xZoom:{name:"Enable zooming on the X axis?",defaultValue:!0,control:{type:"boolean"}},yZoom:{name:"Enable zooming on the Y axis?",defaultValue:!0,control:{type:"boolean"}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}}}},z={name:"Default arguments",args:{xPan:!0,yPan:!0,xZoom:!0,yZoom:!0,spaceScaleType:"linear"}},w=["DefaultArgs"];export{z as DefaultArgs,w as __namedExportsOrder,I as default};
