import{R as n,r as E}from"./index-CDs2tPxN.js";import{l as T}from"./lodash-B2soob2o.js";import{O as g,p as f}from"./OperationalPoint-CNC8XtrB.js";const o=32,u=8,O=({operationalPoints:t,isProportionnal:r=!1,zoom:i=1})=>{const[d,m]=n.useState([]),y=(a,e)=>r?e?{height:`${f(e.position-a.position)*i*u}px`}:{height:`${o}px`}:{height:`${o*i}px`};return E.useEffect(()=>{m((()=>{if(r){const e=t.reduce((s,c)=>{const h=s[s.length-1];return f(c.position-h.position)*u*i>=o&&s.push(c),s},[t[0]]),l=t[t.length-1];T.isEqual(e[e.length-1],l)&&e.push(l);const p=e.length-2;if(p>=0){const s=e[p];f(l.position-s.position)*u*i<o&&e.splice(p,1)}return e}else return t})())},[t,r,i]),n.createElement("div",{className:"operational-point-list"},d.map((a,e)=>n.createElement("div",{key:e,className:"operational-point-wrapper flex flex-col justify-start",style:y(a,d[e+1])},n.createElement(g,{...a}))))};O.__docgenInfo={description:"",methods:[],displayName:"OperationalPointList",props:{operationalPoints:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"OperationalPointType[]"},description:""},isProportionnal:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},zoom:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}}}};export{O};
