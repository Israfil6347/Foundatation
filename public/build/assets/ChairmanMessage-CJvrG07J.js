import{D as n,r,j as s,Y as o}from"./app-PNeZ1Cfk.js";import{P as c}from"./PublicTemplateLayout-CJozbsGw.js";import{m as d}from"./motion-DUcTn-y-.js";function p({auth:i}){const[e,t]=n();return r.useEffect(()=>{axios.get("/pages/chairman-message").then(a=>{console.log(a),t(a.data.data)}).catch(a=>{console.log(a)}).finally(()=>{})},[]),s.jsx("div",{children:s.jsxs(c,{auth:i,children:[s.jsx(o,{title:"Chairman Message"}),s.jsx(d.div,{className:"",transition:{type:"spring",stiffness:100,damping:20},exit:{opacity:0,x:-window.innerWidth,transition:{duration:.3}},initial:{opacity:0,x:-window.innerWidth},animate:{x:0,opacity:1},children:s.jsx("div",{className:"container mx-auto",children:s.jsx("div",{className:"border border-dashed border-secondary bg-surface text-onSurface",children:s.jsx("div",{className:"px-4 py-10 md:px-6 lg:py-20 lg:px-10",children:s.jsxs("div",{className:"container mx-auto",children:[s.jsxs("div",{className:"mb-20 text-center",children:[s.jsx("div",{className:"font-semibold uppercase text-secondary",children:e==null?void 0:e.subtitle}),s.jsx("div",{className:"text-3xl font-extrabold text-primary"}),s.jsx("div",{className:""})]}),s.jsx("section",{className:"space-y-6",children:s.jsx("div",{className:"max-w-full prose",dangerouslySetInnerHTML:{__html:(e==null?void 0:e.body)??""}})})]})})})})})]})})}export{p as default};
