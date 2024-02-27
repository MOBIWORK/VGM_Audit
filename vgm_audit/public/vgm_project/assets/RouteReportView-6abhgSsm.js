import{a5 as x,at as J,k as B,au as O,as as Q,_ as G,aC as oe,ae as V,aj as Y,an as re,aD as le,aE as ie,a9 as se,r as S,h as Z,g as ce,m as de,u as R,aF as me,e as ue,aG as ge,a7 as pe,aH as he,am as W,a6 as X,aI as fe,j as n,R as z,y as M,F as K,z as D,G as ve,T as xe,a1 as Ce,W as U,a2 as be,aB as ye,H as $e}from"./main-G_t2WruL.js";import{U as Ie}from"./index-bXvn_M5b.js";var ee=x.forwardRef(function(a,e){var t,o=a.prefixCls,l=a.forceRender,g=a.className,u=a.style,i=a.children,s=a.isActive,v=a.role,_=x.useState(s||l),r=J(_,2),c=r[0],p=r[1];return x.useEffect(function(){(l||s)&&p(!0)},[l,s]),c?x.createElement("div",{ref:e,className:B("".concat(o,"-content"),(t={},O(t,"".concat(o,"-content-active"),s),O(t,"".concat(o,"-content-inactive"),!s),t),g),style:u,role:v},x.createElement("div",{className:"".concat(o,"-content-box")},i)):null});ee.displayName="PanelContent";var je=["showArrow","headerClass","isActive","onItemClick","forceRender","className","prefixCls","collapsible","accordion","panelKey","extra","header","expandIcon","openMotion","destroyInactivePanel","children"],ae=x.forwardRef(function(a,e){var t,o,l=a.showArrow,g=l===void 0?!0:l,u=a.headerClass,i=a.isActive,s=a.onItemClick,v=a.forceRender,_=a.className,r=a.prefixCls,c=a.collapsible,p=a.accordion,k=a.panelKey,f=a.extra,d=a.header,b=a.expandIcon,y=a.openMotion,I=a.destroyInactivePanel,h=a.children,w=Q(a,je),C=c==="disabled",P=c==="header",j=c==="icon",N=f!=null&&typeof f!="boolean",m=function(){s?.(k)},$=function(T){(T.key==="Enter"||T.keyCode===V.ENTER||T.which===V.ENTER)&&m()},E=typeof b=="function"?b(a):x.createElement("i",{className:"arrow"});E&&(E=x.createElement("div",{className:"".concat(r,"-expand-icon"),onClick:["header","icon"].includes(c)?m:void 0},E));var L=B((t={},O(t,"".concat(r,"-item"),!0),O(t,"".concat(r,"-item-active"),i),O(t,"".concat(r,"-item-disabled"),C),t),_),F=B(u,(o={},O(o,"".concat(r,"-header"),!0),O(o,"".concat(r,"-header-collapsible-only"),P),O(o,"".concat(r,"-icon-collapsible-only"),j),o)),H={className:F,"aria-expanded":i,"aria-disabled":C,onKeyDown:$};return!P&&!j&&(H.onClick=m,H.role=p?"tab":"button",H.tabIndex=C?-1:0),x.createElement("div",G({},w,{ref:e,className:L}),x.createElement("div",H,g&&E,x.createElement("span",{className:"".concat(r,"-header-text"),onClick:c==="header"?m:void 0},d),N&&x.createElement("div",{className:"".concat(r,"-extra")},f)),x.createElement(oe,G({visible:i,leavedClassName:"".concat(r,"-content-hidden")},y,{forceRender:v,removeOnLeave:I}),function(A,T){var ne=A.className,te=A.style;return x.createElement(ee,{ref:T,prefixCls:r,className:ne,style:te,isActive:i,forceRender:v,role:p?"tabpanel":void 0},h)}))}),Se=["children","label","key","collapsible","onItemClick","destroyInactivePanel"],_e=function(e,t){var o=t.prefixCls,l=t.accordion,g=t.collapsible,u=t.destroyInactivePanel,i=t.onItemClick,s=t.activeKey,v=t.openMotion,_=t.expandIcon;return e.map(function(r,c){var p=r.children,k=r.label,f=r.key,d=r.collapsible,b=r.onItemClick,y=r.destroyInactivePanel,I=Q(r,Se),h=String(f??c),w=d??g,C=y??u,P=function(m){w!=="disabled"&&(i(m),b?.(m))},j=!1;return l?j=s[0]===h:j=s.indexOf(h)>-1,x.createElement(ae,G({},I,{prefixCls:o,key:h,panelKey:h,isActive:j,accordion:l,openMotion:v,expandIcon:_,header:k,collapsible:w,onItemClick:P,destroyInactivePanel:C}),p)})},Pe=function(e,t,o){if(!e)return null;var l=o.prefixCls,g=o.accordion,u=o.collapsible,i=o.destroyInactivePanel,s=o.onItemClick,v=o.activeKey,_=o.openMotion,r=o.expandIcon,c=e.key||String(t),p=e.props,k=p.header,f=p.headerClass,d=p.destroyInactivePanel,b=p.collapsible,y=p.onItemClick,I=!1;g?I=v[0]===c:I=v.indexOf(c)>-1;var h=b??u,w=function(j){h!=="disabled"&&(s(j),y?.(j))},C={key:c,panelKey:c,header:k,headerClass:f,isActive:I,prefixCls:l,destroyInactivePanel:d??i,openMotion:_,accordion:g,children:e.props.children,onItemClick:w,expandIcon:r,collapsible:h};return typeof e.type=="string"?e:(Object.keys(C).forEach(function(P){typeof C[P]>"u"&&delete C[P]}),x.cloneElement(e,C))};function Ne(a,e,t){return Array.isArray(a)?_e(a,t):Y(e).map(function(o,l){return Pe(o,l,t)})}function we(a){var e=a;if(!Array.isArray(e)){var t=ie(e);e=t==="number"||t==="string"?[e]:[]}return e.map(function(o){return String(o)})}var ke=x.forwardRef(function(a,e){var t=a.prefixCls,o=t===void 0?"rc-collapse":t,l=a.destroyInactivePanel,g=l===void 0?!1:l,u=a.style,i=a.accordion,s=a.className,v=a.children,_=a.collapsible,r=a.openMotion,c=a.expandIcon,p=a.activeKey,k=a.defaultActiveKey,f=a.onChange,d=a.items,b=B(o,s),y=re([],{value:p,onChange:function(N){return f?.(N)},defaultValue:k,postState:we}),I=J(y,2),h=I[0],w=I[1],C=function(N){return w(function(){if(i)return h[0]===N?[]:[N];var m=h.indexOf(N),$=m>-1;return $?h.filter(function(E){return E!==N}):[].concat(se(h),[N])})};le(!v,"[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");var P=Ne(d,v,{prefixCls:o,accordion:i,openMotion:r,expandIcon:c,collapsible:_,destroyInactivePanel:g,onItemClick:C,activeKey:h});return x.createElement("div",{ref:e,className:b,style:u,role:i?"tablist":void 0},P)});const q=Object.assign(ke,{Panel:ae});q.Panel;const Ee=S.forwardRef((a,e)=>{const{getPrefixCls:t}=S.useContext(Z),{prefixCls:o,className:l,showArrow:g=!0}=a,u=t("collapse",o),i=B({[`${u}-no-arrow`]:!g},l);return S.createElement(q.Panel,Object.assign({ref:e},a,{prefixCls:u,className:i}))}),Re=Ee,Ae=a=>{const{componentCls:e,contentBg:t,padding:o,headerBg:l,headerPadding:g,collapseHeaderPaddingSM:u,collapseHeaderPaddingLG:i,collapsePanelBorderRadius:s,lineWidth:v,lineType:_,colorBorder:r,colorText:c,colorTextHeading:p,colorTextDisabled:k,fontSizeLG:f,lineHeight:d,lineHeightLG:b,marginSM:y,paddingSM:I,paddingLG:h,paddingXS:w,motionDurationSlow:C,fontSizeIcon:P,contentPadding:j,fontHeight:N,fontHeightLG:m}=a,$=`${R(v)} ${_} ${r}`;return{[e]:Object.assign(Object.assign({},ue(a)),{backgroundColor:l,border:$,borderBottom:0,borderRadius:s,"&-rtl":{direction:"rtl"},[`& > ${e}-item`]:{borderBottom:$,"&:last-child":{[`
            &,
            & > ${e}-header`]:{borderRadius:`0 0 ${R(s)} ${R(s)}`}},[`> ${e}-header`]:{position:"relative",display:"flex",flexWrap:"nowrap",alignItems:"flex-start",padding:g,color:p,lineHeight:d,cursor:"pointer",transition:`all ${C}, visibility 0s`,[`> ${e}-header-text`]:{flex:"auto"},"&:focus":{outline:"none"},[`${e}-expand-icon`]:{height:N,display:"flex",alignItems:"center",paddingInlineEnd:y},[`${e}-arrow`]:Object.assign(Object.assign({},ge()),{fontSize:P,svg:{transition:`transform ${C}`}}),[`${e}-header-text`]:{marginInlineEnd:"auto"}},[`${e}-icon-collapsible-only`]:{cursor:"unset",[`${e}-expand-icon`]:{cursor:"pointer"}}},[`${e}-content`]:{color:c,backgroundColor:t,borderTop:$,[`& > ${e}-content-box`]:{padding:j},"&-hidden":{display:"none"}},"&-small":{[`> ${e}-item`]:{[`> ${e}-header`]:{padding:u,paddingInlineStart:w,[`> ${e}-expand-icon`]:{marginInlineStart:a.calc(I).sub(w).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:I}}},"&-large":{[`> ${e}-item`]:{fontSize:f,lineHeight:b,[`> ${e}-header`]:{padding:i,paddingInlineStart:o,[`> ${e}-expand-icon`]:{height:m,marginInlineStart:a.calc(h).sub(o).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:h}}},[`${e}-item:last-child`]:{[`> ${e}-content`]:{borderRadius:`0 0 ${R(s)} ${R(s)}`}},[`& ${e}-item-disabled > ${e}-header`]:{"\n          &,\n          & > .arrow\n        ":{color:k,cursor:"not-allowed"}},[`&${e}-icon-position-end`]:{[`& > ${e}-item`]:{[`> ${e}-header`]:{[`${e}-expand-icon`]:{order:1,paddingInlineEnd:0,paddingInlineStart:y}}}}})}},Oe=a=>{const{componentCls:e}=a,t=`> ${e}-item > ${e}-header ${e}-arrow svg`;return{[`${e}-rtl`]:{[t]:{transform:"rotate(180deg)"}}}},Te=a=>{const{componentCls:e,headerBg:t,paddingXXS:o,colorBorder:l}=a;return{[`${e}-borderless`]:{backgroundColor:t,border:0,[`> ${e}-item`]:{borderBottom:`1px solid ${l}`},[`
        > ${e}-item:last-child,
        > ${e}-item:last-child ${e}-header
      `]:{borderRadius:0},[`> ${e}-item:last-child`]:{borderBottom:0},[`> ${e}-item > ${e}-content`]:{backgroundColor:"transparent",borderTop:0},[`> ${e}-item > ${e}-content > ${e}-content-box`]:{paddingTop:o}}}},Me=a=>{const{componentCls:e,paddingSM:t}=a;return{[`${e}-ghost`]:{backgroundColor:"transparent",border:0,[`> ${e}-item`]:{borderBottom:0,[`> ${e}-content`]:{backgroundColor:"transparent",border:0,[`> ${e}-content-box`]:{paddingBlock:t}}}}}},Ke=a=>({headerPadding:`${a.paddingSM}px ${a.padding}px`,headerBg:a.colorFillAlter,contentPadding:`${a.padding}px 16px`,contentBg:a.colorBgContainer}),Be=ce("Collapse",a=>{const e=de(a,{collapseHeaderPaddingSM:`${R(a.paddingXS)} ${R(a.paddingSM)}`,collapseHeaderPaddingLG:`${R(a.padding)} ${R(a.paddingLG)}`,collapsePanelBorderRadius:a.borderRadiusLG});return[Ae(e),Te(e),Me(e),Oe(e),me(e)]},Ke),He=S.forwardRef((a,e)=>{const{getPrefixCls:t,direction:o,collapse:l}=S.useContext(Z),{prefixCls:g,className:u,rootClassName:i,style:s,bordered:v=!0,ghost:_,size:r,expandIconPosition:c="start",children:p,expandIcon:k}=a,f=pe(m=>{var $;return($=r??m)!==null&&$!==void 0?$:"middle"}),d=t("collapse",g),b=t(),[y,I,h]=Be(d),w=S.useMemo(()=>c==="left"?"start":c==="right"?"end":c,[c]),C=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const $=k?k(m):S.createElement(fe,{rotate:m.isActive?90:void 0});return X($,()=>({className:B($.props.className,`${d}-arrow`)}))},P=B(`${d}-icon-position-${w}`,{[`${d}-borderless`]:!v,[`${d}-rtl`]:o==="rtl",[`${d}-ghost`]:!!_,[`${d}-${f}`]:f!=="middle"},l?.className,u,i,I,h),j=Object.assign(Object.assign({},he(b)),{motionAppear:!1,leavedClassName:`${d}-content-hidden`}),N=S.useMemo(()=>p?Y(p).map((m,$)=>{var E,L;if(!((E=m.props)===null||E===void 0)&&E.disabled){const F=(L=m.key)!==null&&L!==void 0?L:String($),{disabled:H,collapsible:A}=m.props,T=Object.assign(Object.assign({},W(m.props,["disabled"])),{key:F,collapsible:A??(H?"disabled":void 0)});return X(m,T)}return m}):null,[p]);return y(S.createElement(q,Object.assign({ref:e,openMotion:j},W(a,["rootClassName"]),{expandIcon:C,prefixCls:d,className:P,style:Object.assign(Object.assign({},l?.style),s)}),N))}),De=Object.assign(He,{Panel:Re});var Le={VITE_BASE_PATH:"/vgm_project",BASE_URL:"/assets/vgm_audit/vgm_project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};function ze({form:a,recordData:e}){const[t,o]=S.useState([]);return S.useEffect(()=>{if(e){let l=[];a.setFieldsValue({store:e.campaign_code,campaign_name:e.campaign_name,date_check_in:e.date_check_in,date_check_out:e.date_check_out,employee_code:e.employee_code,quatity:"3"}),l.push({uid:"-1",name:"image.png",status:"done",url:Le.VITE_BASE_URL+JSON.parse(e.detail[0].images)[0]}),o(l)}},[e]),n.jsx(n.Fragment,{children:n.jsxs("div",{className:"p-4 pt-6 pb-[58px]",children:[n.jsxs(z,{children:[n.jsx(M,{span:12,children:n.jsx(K,{label:"Cửa hàng",name:"store",required:!0,children:n.jsx(D,{})})}),n.jsx(M,{span:12,children:n.jsx(K,{label:"Chiến dịch",name:"campaign_name",required:!0,children:n.jsx(D,{})})})]}),n.jsxs(z,{className:"pt-2",children:[n.jsx(M,{span:12,children:n.jsx(K,{label:"Thời gian vào",name:"date_check_in",required:!0,children:n.jsx(D,{})})}),n.jsx(M,{span:12,children:n.jsx(K,{label:"Thời gian ra",name:"date_check_out",required:!0,children:n.jsx(D,{})})})]}),n.jsxs(z,{className:"pt-2",children:[n.jsx(M,{span:12,children:n.jsx(K,{label:"Nhân viên thực hiện",name:"employee_code",required:!0,children:n.jsx(D,{})})}),n.jsx(M,{span:12,children:n.jsx(K,{label:"Số lượng danh mục sản phẩm",name:"quatity",required:!0,children:n.jsx(D,{})})})]}),n.jsx(z,{className:"pt-2",children:n.jsx(M,{span:12,children:n.jsx(K,{label:"Hình ảnh",name:"image",required:!0,children:n.jsx(Ie,{listType:"picture-card",fileList:t})})})})]})})}function Fe(a){console.log(a.recordData),S.useState(!1);const[e,t]=S.useState([]);e.length>0;const o=a.recordData?.category_names.map((i,s)=>({key:s.toString(),stt:(s+1).toString(),categoryName:Object.values(i)[0]})),l=[{title:"STT",dataIndex:"stt"},{title:"Tên sản phẩm",dataIndex:"name_product"},{title:"Số lượng sản phẩm máy chấm",dataIndex:"sum_product"},{title:"Ảnh trưng bày",dataIndex:"image",render:i=>n.jsx("a",{children:"Xem ảnh"})}],g=[{title:"STT",dataIndex:"stt"},{title:"Danh mục sản phẩm",dataIndex:"categoryName"}],u=a.recordData?.category_names.map((i,s)=>{const v=Object.keys(i)[0];return(a.recordData?.detail.filter(r=>r.category===v)).map((r,c)=>({key:`${s}-${c}`,stt:`${s+1}`,name_product:r.product_name,sum_product:r.sum_product.toString(),image:r.images,creation:r.creation}))});return n.jsx(n.Fragment,{children:n.jsx(ve,{columns:g,expandable:{expandedRowRender:(i,s)=>n.jsx(xe,{columns:l,dataSource:u[s],pagination:!1}),rowExpandable:i=>u[i.key].length>0},dataSource:o})})}function Ge(){const[a,e]=S.useState(null),t=Ce(),o=i=>{console.log(i)},[l]=U.useForm(),g=[{key:"1",label:n.jsx("span",{style:{fontWeight:700},children:"Thông tin chung"}),children:n.jsx(ze,{form:l,recordData:a})},{key:"2",label:n.jsx("span",{style:{fontWeight:700},children:"Sản phẩm"}),children:n.jsx(Fe,{recordData:a})}];S.useEffect(()=>{const i=localStorage.getItem("recordData");i&&e(JSON.parse(i)),localStorage.removeItem("recordData")},[]);const u=()=>a?`${a.retail_code} - ${a.campaign_name}`:"Tiêu đề";return n.jsxs(n.Fragment,{children:[n.jsx(be,{title:u(),icon:n.jsx("p",{onClick:()=>t("/"),className:"mr-2 cursor-pointer",children:n.jsx(ye,{})})}),n.jsx("div",{className:"bg-white  rounded-xl",children:n.jsx(U,{layout:"vertical",form:l,children:n.jsx(De,{items:g,defaultActiveKey:["1","2"],onChange:o,className:"custom-collapse"})})})]})}function We(){return n.jsxs(n.Fragment,{children:[n.jsx($e,{children:n.jsx("title",{children:"BÁO CÁO"})}),n.jsx(Ge,{})]})}export{We as default};
