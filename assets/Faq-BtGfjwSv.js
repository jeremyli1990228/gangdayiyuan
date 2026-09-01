import{_ as C,l as o,e as a,a as t,D as q,z as L,i as c,F as v,p,d as k,m as u,c as b,v as m,t as x}from"./index-CYUu2NOU.js";const B={class:"h5-page"},F={class:"search-bar"},M={class:"category-tabs"},D=["onClick"],V={class:"h5-content"},$={class:"faq-list"},j=["onClick"],z={class:"faq-title"},I={key:0,class:"faq-answer"},N={key:0,class:"empty-state"},E={__name:"Faq",setup(K){const f=m(),r=u(""),l=u(""),g=["服务态度","医疗质量","就医流程","环境卫生","其他"],y=u([{category:"服务态度",title:"医护人员态度不好怎么办？",content:`如遇到医护人员态度不好的情况，请记录具体时间、地点和人员，可通过以下渠道进行反馈：

1. 现场向科室主任或护士长反映
2. 拨打医院投诉电话：0755-xxxxxxx
3. 通过本系统提交投诉建议

我们会在24小时内响应您的投诉，并在规定时限内处理完成。`,expanded:!1},{category:"就医流程",title:"如何预约挂号？",content:`您可以通过以下方式预约挂号：

1. 微信公众号预约：关注"香港大学深圳医院"公众号，点击"预约挂号"
2. 医院官网预约：访问医院官网，登录后选择科室和时间
3. 现场自助机预约：医院各楼层设有自助挂号机
4. 电话预约：拨打预约热线 0755-xxxxxxx

建议提前3-7天预约，热门科室可能需要更长时间。`,expanded:!1},{category:"医疗质量",title:"对诊断结果有疑问怎么办？",content:`如对诊断结果有疑问，您可以：

1. 向主治医生提出疑问，要求详细解释
2. 申请专家会诊，获取第二诊疗意见
3. 到上级医院进行复诊
4. 通过医务处进行医疗咨询

医院设有医疗质量投诉渠道，如确有医疗质量问题，可提交书面投诉。`,expanded:!1},{category:"环境卫生",title:"病房环境问题如何反映？",content:`如发现病房环境问题（如卫生不达标、设施损坏等），您可以：

1. 向护士站反映情况
2. 拨打后勤服务热线
3. 通过本系统提交投诉建议

后勤部门会在24小时内处理，紧急情况会立即响应。`,expanded:!1},{category:"就医流程",title:"如何办理退费？",content:`退费办理流程：

1. 携带就诊卡、发票原件到收费窗口
2. 填写退费申请表
3. 科室医生签字确认
4. 收费窗口办理退费

注意：
- 已使用的药品、检查无法退费
- 退费需在缴费后30天内办理
- 医保退费需到医保窗口办理`,expanded:!1},{category:"其他",title:"医院停车难怎么解决？",content:`医院停车场资源有限，建议您：

1. 乘坐公共交通：地铁xx号线xx站直达
2. 错峰就诊：避开上午8-10点高峰期
3. 使用周边社会停车场：xx商场、xx小区提供停车服务
4. 预约就诊：按预约时间到达，减少等候时间

医院正在扩建停车场，预计年底投入使用。`,expanded:!1}]),i=b(()=>{let s=y.value;if(l.value&&(s=s.filter(e=>e.category===l.value)),r.value){const e=r.value.toLowerCase();s=s.filter(n=>n.title.toLowerCase().includes(e)||n.content.toLowerCase().includes(e))}return s}),h=s=>{const e=i.value[s];e.expanded=!e.expanded},_=()=>{},w=()=>{f.back()};return(s,e)=>(o(),a("div",B,[t("div",{class:"h5-header"},[t("button",{class:"back-btn",onClick:w},[...e[2]||(e[2]=[t("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[t("path",{d:"M15 18L9 12L15 6","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])]),e[3]||(e[3]=t("h1",{class:"h5-title"},"常见问题",-1))]),t("div",F,[q(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=n=>r.value=n),placeholder:"搜索问题...",onInput:_},null,544),[[L,r.value]]),e[4]||(e[4]=t("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[t("circle",{cx:"11",cy:"11",r:"8","stroke-width":"2"}),t("path",{d:"M21 21L16.65 16.65","stroke-width":"2","stroke-linecap":"round"})],-1))]),t("div",M,[t("button",{class:c(["category-tab",l.value===""?"active":""]),onClick:e[1]||(e[1]=n=>l.value="")},"全部",2),(o(),a(v,null,p(g,n=>t("button",{class:c(["category-tab",l.value===n?"active":""]),key:n,onClick:d=>l.value=n},x(n),11,D)),64))]),t("div",V,[t("div",$,[(o(!0),a(v,null,p(i.value,(n,d)=>(o(),a("div",{class:"faq-item",key:d},[t("div",{class:"faq-question",onClick:R=>h(d)},[t("span",z,x(n.title),1),(o(),a("svg",{class:c(["faq-arrow",n.expanded?"expanded":""]),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[...e[5]||(e[5]=[t("path",{d:"M6 9L12 15L18 9","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])],2))],8,j),n.expanded?(o(),a("div",I,x(n.content),1)):k("",!0)]))),128))]),i.value.length===0?(o(),a("div",N,[...e[6]||(e[6]=[t("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#d9d9d9"},[t("circle",{cx:"11",cy:"11",r:"8","stroke-width":"2"}),t("path",{d:"M21 21L16.65 16.65","stroke-width":"2","stroke-linecap":"round"})],-1),t("p",null,"未找到相关问题",-1)])])):k("",!0)])]))}},T=C(E,[["__scopeId","data-v-df31b120"]]);export{T as default};
