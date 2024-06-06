/* empty css              */import{c as U}from"./index-DX8y_bUt.js";import{R as e}from"./index-CDs2tPxN.js";import{N as W,l as m,k as X,f as Y,$ as Z}from"./index.esm-DT8E0T4M.js";const G=({label:H,variant:J="Primary",isLoading:a=!1,isDisabled:d=!1,leadingIcon:p=null,counter:g=null,size:K="large",onClick:v})=>{const M=()=>{!a&&!d&&v&&v()};return e.createElement("button",{className:U("button flex items-center",J.toLowerCase(),K.toLowerCase(),{loading:a}),onClick:M,disabled:d||a},a?e.createElement(e.Fragment,null,e.createElement("span",{className:"icon"},e.createElement(W,{variant:"fill",size:"lg"}))):e.createElement(e.Fragment,null,p&&e.createElement("span",{className:"leading-icon mr-2"},p),H,g!==null&&e.createElement("span",{className:"counter ml-2"},g)))};G.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'Normal' | 'Cancel' | 'Quiet' | 'Destructive' | 'Primary'",elements:[{name:"literal",value:"'Normal'"},{name:"literal",value:"'Cancel'"},{name:"literal",value:"'Quiet'"},{name:"literal",value:"'Destructive'"},{name:"literal",value:"'Primary'"}]},description:"",defaultValue:{value:"'Primary'",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},leadingIcon:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"null",computed:!1}},counter:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"null",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'large' | 'medium' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'small'"}]},description:"",defaultValue:{value:"'large'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const f={archive:e.createElement(m,null),bookmark:e.createElement(X,null),cloud:e.createElement(Y,null),clock:e.createElement(Z,null)},te={component:G,title:"Button",tags:["autodocs"],argTypes:{leadingIcon:{options:Object.keys(f),mapping:f,control:{type:"select",labels:{Archive:"Archive",Bookmark:"Bookmark",Cloud:"Cloud",Clock:"Clock"}}}}},r={args:{label:"Click me"}},n={args:{label:"Loading",isLoading:!0}},t={args:{label:"Disabled",isDisabled:!0}},l={args:{label:"Counter",counter:5}},s={args:{label:"Quiet",variant:"Quiet"}},o={args:{label:"Destructive",variant:"Destructive"}},c={args:{label:"Cancel",variant:"Cancel"}},i={args:{label:"Leading Icon",leadingIcon:e.createElement(m,null)}},u={args:{label:"Leading Icon Counter",leadingIcon:e.createElement(m,null),counter:5}};var b,C,y;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Click me'
  }
}`,...(y=(C=r.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var D,k,E;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Loading',
    isLoading: true
  }
}`,...(E=(k=n.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var I,L,N;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Disabled',
    isDisabled: true
  }
}`,...(N=(L=t.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var S,T,q;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Counter',
    counter: 5
  }
}`,...(q=(T=l.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var Q,h,V;s.parameters={...s.parameters,docs:{...(Q=s.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    label: 'Quiet',
    variant: 'Quiet'
  }
}`,...(V=(h=s.parameters)==null?void 0:h.docs)==null?void 0:V.source}}};var w,B,x;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Destructive',
    variant: 'Destructive'
  }
}`,...(x=(B=o.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var A,P,_;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Cancel',
    variant: 'Cancel'
  }
}`,...(_=(P=c.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var R,z,F;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Leading Icon',
    leadingIcon: <Archive />
  }
}`,...(F=(z=i.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var O,$,j;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Leading Icon Counter',
    leadingIcon: <Archive />,
    counter: 5
  }
}`,...(j=($=u.parameters)==null?void 0:$.docs)==null?void 0:j.source}}};const le=["Default","Loading","Disabled","Counter","Quiet","Destructive","Cancel","LeadingIcon","LeadingIconCounter"];export{c as Cancel,l as Counter,r as Default,o as Destructive,t as Disabled,i as LeadingIcon,u as LeadingIconCounter,n as Loading,s as Quiet,le as __namedExportsOrder,te as default};
