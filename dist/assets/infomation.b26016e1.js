import{u as e}from"./index.4fc6acd1.js";import{u as l}from"./useAppInfo.0744a0c1.js";import{d as a,k as t,n as s,e as d,r as n,o,c as u,w as c,a as i,I as r,C as p,P as f,F as b,H as m}from"./vendor.f7361d5e.js";const v={class:"text-lg"},y=r("获取源码"),_=i("div",{class:"flex flex-col items-center justify-center"},[i("img",{src:"/admin-work/assets/qrcode.0a69adee.jpg"}),i("div",null,[r("关注公众号："),i("strong",null,"知码前端"),r("获取源码")])],-1);var h=a({setup(a){const{version:h,dependencies:j,devDependencies:w}=l(),k=t(!1),x=e().state,g=s([]),C=s([]);return d((()=>{const e=Object.values(j);Object.keys(j).map(((l,a)=>{g.push({label:l,value:e[a]})}));const l=Object.values(w);Object.keys(w).map(((e,a)=>{C.push({label:e,value:l[a]})}))})),(e,l)=>{const a=n("n-button"),t=n("n-card"),s=n("n-descriptions-item"),d=n("n-descriptions"),j=n("Close"),w=n("n-icon"),O=n("n-modal"),z=n("n-space");return o(),u(z,{vertical:""},{default:c((()=>[i(t,null,{default:c((()=>[i("div",v,[r(" 当前版本号："+p(f(h))+" ",1),i(a,{class:"ml-4",type:"primary",onClick:l[1]||(l[1]=e=>k.value=!0)},{default:c((()=>[y])),_:1})])])),_:1}),i(t,{title:"依赖"},{default:c((()=>[i(d,{"label-placement":"top",bordered:"",column:4,"label-style":{"font-weight":"bold","font-size":"16px"}},{default:c((()=>[(o(!0),u(b,null,m(f(g),(e=>(o(),u(s,{label:e.label,key:e.label},{default:c((()=>[r(p(e.value),1)])),_:2},1032,["label"])))),128))])),_:1})])),_:1}),i(t,{title:"开发依赖"},{default:c((()=>[i(d,{"label-placement":"top",bordered:"",column:4,"label-style":{"font-weight":"bold","font-size":"16px"}},{default:c((()=>[(o(!0),u(b,null,m(f(C),(e=>(o(),u(s,{label:e.label,key:e.label},{default:c((()=>[r(p(e.value),1)])),_:2},1032,["label"])))),128))])),_:1})])),_:1}),i(O,{show:k.value,"onUpdate:show":l[3]||(l[3]=e=>k.value=e),"display-directive":"show",style:{width:"mobile"===f(x).device?"80%":"40%"}},{default:c((()=>[i(t,{title:"获取源码",bordered:!1,preset:"card"},{"header-extra":c((()=>[i(w,{size:"20"},{default:c((()=>[i(j,{onClick:l[2]||(l[2]=e=>k.value=!1)})])),_:1})])),default:c((()=>[_])),_:1})])),_:1},8,["show","style"])])),_:1})}}});export default h;
