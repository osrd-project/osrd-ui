import{R as r,r as re}from"./index-CDs2tPxN.js";import{F as se}from"./FieldWrapper-BNxgbzXe.js";import{c as ae}from"./index-DX8y_bUt.js";/* empty css              */import"./index.esm-DT8E0T4M.js";import"./InputStatusIcon-CvRLOZHk.js";const h=r.forwardRef(({id:p,label:X,hint:Y,value:s,options:S,placeholder:f,statusWithMessage:a,required:W,disabled:q,readOnly:v,small:w,onChange:g},Z)=>{s&&s!=""&&!S.some(e=>e.value===s)&&console.warn(`option "${s}" does not match any option`);const[y,C]=re.useState(s||""),ee=e=>{C(e.target.value),g==null||g(e)};return r.createElement(se,{id:p,label:X,hint:Y,statusWithMessage:a,required:W,disabled:q,small:w},r.createElement("select",{className:ae("custom-select",{"placeholder-selected":y==="",small:w,"read-only":v,[(a==null?void 0:a.status)||""]:!!a}),value:y,required:W,disabled:q||v,ref:Z,onChange:ee},r.createElement("option",{value:""},f?`– ${f} –`:""),S.map(e=>r.createElement("option",{key:e.value,value:e.value},e.label))))});h.displayName="Select";h.__docgenInfo={description:"",methods:[],displayName:"Select"};const le={component:h,args:{label:"Fill colour",placeholder:"Choose",value:"blue",options:[{value:"blue",label:"Blue"},{value:"red",label:"Red"},{value:"green",label:"Green"}],small:!1,disabled:!1,readOnly:!1},decorators:[p=>r.createElement("div",{style:{maxWidth:"20rem"}},r.createElement(p,null))],title:"Select",tags:["autodocs"]},t={args:{value:void 0}},o={args:{value:"blue"}},n={args:{hint:"This is not a choice"}},c={args:{required:!0}},i={args:{required:!0,statusWithMessage:{status:"info",message:"This is a one way choice"}}},u={args:{required:!0,statusWithMessage:{status:"warning"}}},l={args:{required:!0,statusWithMessage:{status:"warning",message:"This is a one way choice"}}},m={args:{required:!0,statusWithMessage:{status:"error"}}},d={args:{required:!0,statusWithMessage:{status:"error",message:"This is a one way choice"}}};var E,b,M;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    value: undefined
  }
}`,...(M=(b=t.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var T,R,x;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: 'blue'
  }
}`,...(x=(R=o.parameters)==null?void 0:R.docs)==null?void 0:x.source}}};var I,O,_;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    hint: 'This is not a choice'
  }
}`,...(_=(O=n.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var F,N,D;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(D=(N=c.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var H,$,k;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    required: true,
    statusWithMessage: {
      status: 'info',
      message: 'This is a one way choice'
    }
  }
}`,...(k=($=i.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var B,G,j;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    required: true,
    statusWithMessage: {
      status: 'warning'
    }
  }
}`,...(j=(G=u.parameters)==null?void 0:G.docs)==null?void 0:j.source}}};var z,A,J;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    required: true,
    statusWithMessage: {
      status: 'warning',
      message: 'This is a one way choice'
    }
  }
}`,...(J=(A=l.parameters)==null?void 0:A.docs)==null?void 0:J.source}}};var K,L,P;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    required: true,
    statusWithMessage: {
      status: 'error'
    }
  }
}`,...(P=(L=m.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var Q,U,V;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    required: true,
    statusWithMessage: {
      status: 'error',
      message: 'This is a one way choice'
    }
  }
}`,...(V=(U=d.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const me=["Default","SelectedOption","Hint","RequiredInput","InformationSelect","WarningSelect","WarningWithMessageSelect","ErrorSelect","ErrorWithMessageSelect"];export{t as Default,m as ErrorSelect,d as ErrorWithMessageSelect,n as Hint,i as InformationSelect,c as RequiredInput,o as SelectedOption,u as WarningSelect,l as WarningWithMessageSelect,me as __namedExportsOrder,le as default};
