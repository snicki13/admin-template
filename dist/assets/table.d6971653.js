import{V as e,k as t,l as n,au as a,n as i}from"./vendor.f7361d5e.js";const l=async function(e){const t=document.body.clientHeight;return new Promise((n=>{setTimeout((()=>{if(e){let a=0;if(e.refs.tableHeaderRef){const t=e.refs.tableHeaderRef.$el.nextElementSibling;a+=t.offsetTop+t.clientHeight}if(e.refs.tableFooterRef){a+=e.refs.tableFooterRef.$el.clientHeight+65}else a+=60;n(t-a)}n(150)}),1e3)}))},o=function(){const n=e([]);let a=e([]);const i=t(null),l=t(null),o=t(200),s=t(!1),r=t(!0);return{dataList:n,tableHeaderRef:i,tableFooterRef:l,tableHeight:o,bordered:s,selectRows:a,tableLoading:r,handleSuccess:({data:e=[]})=>(r.value=!1,n.length=0,n.push(...e),Promise.resolve(e)),handleSelectionChange:e=>{a=e},useTableColumn:u,selectionColumn:{type:"selection"},indexColumn:c()}},s=function(e){return e.map((e=>n(a,{type:e.type||"primary",size:"small",disabled:e.disabled,onClick:e.onClick},{default:()=>e.label})))},r=function(e){return function(t){return t[e]}},u=function(e,t){return e.map((e=>Object.assign(e,t)))},c=function(){return{title:"序号",key:"index",width:80,render:(e,t)=>n("div",null,{default:()=>t+1})}},f=function(e){const t=i({page:1,pageSize:10,showSizePicker:!0,pageCount:1,pageSizes:[10,20,30,40],onChange:function(){e()},onPageSizeChange:function(){e()},setTotalSize(e){t.pageCount=Math.ceil(e/t.pageSize)}});return t};export{u as a,r as b,f as c,s as d,l as e,o as u};
