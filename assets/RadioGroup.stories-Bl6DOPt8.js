import{r as Z,R as r}from"./index-CDs2tPxN.js";/* empty css              */import{R as x}from"./RadioButton-C5kuPy7H.js";import{I as ee}from"./InputStatusIcon-CvRLOZHk.js";import{_ as re}from"./index.esm-DT8E0T4M.js";import{c as y}from"./index-DX8y_bUt.js";import"./useFocusByTab-Bv_kQF86.js";const a=({label:e,value:j,subtitle:b,readOnly:v,disabled:z,options:J,statusWithMessage:n,required:K,small:Q})=>{const[U,X]=Z.useState(j),Y=(t,s)=>{var h;v||(X(s.value),(h=s.onChange)==null||h.call(s,t))},f=n!=null&&n.status?{[n.status]:!0}:{};return r.createElement("div",{className:y("radio-button-wrapper",f)},e&&r.createElement("label",{className:"label"},K&&r.createElement("span",{className:"required"},r.createElement(re,null)),e," ",b&&r.createElement("span",{className:"subtitle"},b)),J.map(t=>r.createElement(x,{key:t.value,...t,readOnly:v,disabled:z,checked:U===t.value,onChange:s=>{Y(s,t)},small:Q})),(n==null?void 0:n.message)&&r.createElement("div",{className:"status-with-message"},r.createElement(ee,{status:n.status}),r.createElement("span",{className:y("status-message",f)},n.message)))};a.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{label:{required:!1,tsType:{name:"string"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""},small:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLLabelElement>,
  'value'
> & {
  label: string;
  value: string;
  hint?: string;
  small?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"ReactInputHTMLAttributes",raw:"React.InputHTMLAttributes<HTMLInputElement | HTMLLabelElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLLabelElement",elements:[{name:"HTMLInputElement"},{name:"HTMLLabelElement"}]}]},{name:"literal",value:"'value'"}],raw:`Omit<
  React.InputHTMLAttributes<HTMLInputElement | HTMLLabelElement>,
  'value'
>`},{name:"signature",type:"object",raw:`{
  label: string;
  value: string;
  hint?: string;
  small?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"hint",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}}]}}]}],raw:"RadioButtonProps[]"},description:""},statusWithMessage:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  status: status;
  message?: string;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'success' | 'info' | 'error' | 'warning' | 'loading'",elements:[{name:"literal",value:"'success'"},{name:"literal",value:"'info'"},{name:"literal",value:"'error'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'loading'"}],required:!0}},{key:"message",value:{name:"string",required:!1}}]}},description:""}}};const l=e=>[{id:`${e}-banana-${Date.now()}`,label:"Banana",value:"Banana"},{id:`${e}-pear-${Date.now()}`,label:"Pear",value:"Pear"},{id:`${e}-litchee-${Date.now()}`,label:"Litchee",value:"Litchee"}],ue={component:a,render:e=>r.createElement(a,{...e,options:l("doc")}),args:{small:!1,disabled:!1,readOnly:!1},tags:["autodocs"],title:"RadioGroup"},o={args:{options:l("default")}},i={args:{label:"Choose a flavour",options:l("groupWithLabel")},render:e=>r.createElement(a,{...e})},u={args:{label:"Pick a flower",subtitle:"And put a smile on your face",options:[{label:"Iris",value:"Iris"},{label:"Daisy",value:"Daisy"},{label:"Tulip",value:"Tulip"}]},render:e=>r.createElement(a,{...e})},c={args:{options:[{label:"Cycling around Britany",value:"Cycling around Britany"},{label:"Discovering forgotten tracks in the Italian Alps",value:"Discovering forgotten tracks in the Italian Alps"},{label:"Visiting middle age churches",value:"Visiting middle age churches"}]},render:e=>r.createElement(a,{...e})},m={args:{label:"Choose a flavour",required:!0,options:l("required")},render:e=>r.createElement(a,{...e})},d={args:{options:l("info"),statusWithMessage:{status:"info",message:"We made this choice for you"}},render:e=>r.createElement(a,{...e})},p={args:{label:"With your beverage",required:!0,options:[{label:"Milk",value:"Milk"},{label:"Sugar",value:"Sugar"},{label:"Lemon slice",value:"Lemon slice"}],statusWithMessage:{status:"warning",message:"Lemon and coffee is a rare match"}},render:e=>r.createElement(a,{...e})},g={args:{options:[{label:"Parsley",value:"Parsley"},{label:"Chives",value:"Chives"},{label:"Garlic",value:"Garlic"}],statusWithMessage:{status:"error",message:"The Chef refuses to cook omelettes with garlic"}},render:e=>r.createElement(a,{...e})};var L,E,R;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    options: buildFruitsOptions('default')
  }
}`,...(R=(E=o.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var T,q,A;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    label: 'Choose a flavour',
    options: buildFruitsOptions('groupWithLabel')
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(A=(q=i.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var w,I,k;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Pick a flower',
    subtitle: 'And put a smile on your face',
    options: [{
      label: 'Iris',
      value: 'Iris'
    }, {
      label: 'Daisy',
      value: 'Daisy'
    }, {
      label: 'Tulip',
      value: 'Tulip'
    }]
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(k=(I=u.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var C,G,B;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    options: [{
      label: 'Cycling around Britany',
      value: 'Cycling around Britany'
    }, {
      label: 'Discovering forgotten tracks in the Italian Alps',
      value: 'Discovering forgotten tracks in the Italian Alps'
    }, {
      label: 'Visiting middle age churches',
      value: 'Visiting middle age churches'
    }]
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(B=(G=c.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var S,H,M;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Choose a flavour',
    required: true,
    options: buildFruitsOptions('required')
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(M=(H=m.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var D,P,O;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    options: buildFruitsOptions('info'),
    statusWithMessage: {
      status: 'info',
      message: 'We made this choice for you'
    }
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(O=(P=d.parameters)==null?void 0:P.docs)==null?void 0:O.source}}};var N,V,W;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'With your beverage',
    required: true,
    options: [{
      label: 'Milk',
      value: 'Milk'
    }, {
      label: 'Sugar',
      value: 'Sugar'
    }, {
      label: 'Lemon slice',
      value: 'Lemon slice'
    }],
    statusWithMessage: {
      status: 'warning',
      message: 'Lemon and coffee is a rare match'
    }
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(W=(V=p.parameters)==null?void 0:V.docs)==null?void 0:W.source}}};var _,$,F;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    options: [{
      label: 'Parsley',
      value: 'Parsley'
    }, {
      label: 'Chives',
      value: 'Chives'
    }, {
      label: 'Garlic',
      value: 'Garlic'
    }],
    statusWithMessage: {
      status: 'error',
      message: 'The Chef refuses to cook omelettes with garlic'
    }
  },
  render: currentArgs => {
    return <RadioGroup {...currentArgs} />;
  }
}`,...(F=($=g.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};const ce=["Default","GroupWithLabel","GroupLabelCaption","LabelOverflow","RequiredRadioButton","InfoRadioButton","WarningRadioButton","ErrorRadioButton"];export{o as Default,g as ErrorRadioButton,u as GroupLabelCaption,i as GroupWithLabel,d as InfoRadioButton,c as LabelOverflow,m as RequiredRadioButton,p as WarningRadioButton,ce as __namedExportsOrder,ue as default};
