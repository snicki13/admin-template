import{d as e,k as a,r as t,o as l,c as s,w as d,a as u,I as n,C as r}from"./vendor.f7361d5e.js";const p=n(" 城市列表所需要的数据源在 src/assets/data/ 文件夹下面： "),o=n("src/assets/data/provinces.json：单独的省份列表"),c=n("src/assets/data/cities.json：单独的城市列表"),i=n("src/assets/data/areas.json：单独的地区列表"),f=n("src/assets/data/pc-code.json：级联的省市列表"),v=n("src/assets/data/pca-code.json：级联的省市区列表"),y=n("src/assets/data/pcas-code.json：级联的省市区、街道列表"),g={class:"flex justify-evenly"},_={class:"flex justify-evenly"};var j=e({setup(e){const j=a("11"),U=a("110101"),h=a("370102003"),m=a(""),x=a(""),S=a("");function k(e){m.value=e}function J(e){x.value=e}function N(e){S.value=e}return(e,a)=>{const O=t("n-gradient-text"),w=t("n-alert"),C=t("CitySelector",!0),I=t("n-space"),b=t("n-card");return l(),s(I,{vertical:""},{default:d((()=>[u(w,{title:"提示",type:"warning"},{default:d((()=>[p,u("ul",null,[u("li",null,[u(O,{type:"error"},{default:d((()=>[o])),_:1})]),u("li",null,[u(O,{type:"error"},{default:d((()=>[c])),_:1})]),u("li",null,[u(O,{type:"error"},{default:d((()=>[i])),_:1})]),u("li",null,[u(O,{type:"error"},{default:d((()=>[f])),_:1})]),u("li",null,[u(O,{type:"error"},{default:d((()=>[v])),_:1})]),u("li",null,[u(O,{type:"error"},{default:d((()=>[y])),_:1})])])])),_:1}),u(b,{"header-style":{padding:"10px"},title:"单选某个选项",segmented:""},{footer:d((()=>[n(" 当前选择的城市为："+r(JSON.stringify(m.value)),1)])),default:d((()=>[u(I,null,{default:d((()=>[u(C,{"data-type":"province","onUpdate:value":k}),u(C,{"data-type":"city","onUpdate:value":k}),u(C,{"data-type":"area","onUpdate:value":k})])),_:1})])),_:1}),u(b,{"header-style":{padding:"10px"},title:"级联选择",segmented:""},{footer:d((()=>[n(" 当前选择的城市为："+r(JSON.stringify(x.value)),1)])),default:d((()=>[u("div",g,[u(C,{"data-type":"pc","onUpdate:value":J}),u(C,{"data-type":"pca",style:{margin:"0 2%"},"onUpdate:value":J}),u(C,{"data-type":"pcas","check-strategy":"child","onUpdate:value":J})])])),_:1}),u(b,{"header-style":{padding:"10px"},title:"默认值",segmented:""},{footer:d((()=>[n(" 当前选择的城市为："+r(JSON.stringify(S.value)),1)])),default:d((()=>[u("div",_,[u(C,{"default-value":j.value,"data-type":"province","onUpdate:value":N},null,8,["default-value"]),u(C,{"default-value":U.value,"data-type":"pca",style:{margin:"0 2%"},"onUpdate:value":N},null,8,["default-value"]),u(C,{"default-value":h.value,"data-type":"pcas","check-strategy":"child","onUpdate:value":N},null,8,["default-value"])])])),_:1})])),_:1})}}});export default j;
