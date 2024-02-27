import{a1 as z,r as n,a as g,j as e,a2 as $,D as y,F as A,z as B,Y as G,G as K,M as S,d as _,aA as v,ar as P,V as r,H as J}from"./main-ZqBQIJMP.js";import{b as R}from"./index.esm-_kSkCyBH.js";import{V as U}from"./index.esm-e8SBkQF2.js";import{E as q}from"./EditOutlined-WDPL9wnr.js";function Q(){const p=z(),[M,W]=n.useState("checkbox"),T=[{title:"Tên chiến dịch",dataIndex:"campaign_name",render:a=>e.jsx("a",{children:a})},{title:"Trạng thái",dataIndex:"campaign_status",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.campaign_status==="Open"&&e.jsxs(_,{color:"green",children:[e.jsx("div",{className:"dot-tag-green"})," Hoạt động"]}),t.campaign_status==="Close"&&e.jsxs(_,{color:"red",children:[e.jsx("div",{className:"dot-tag-red"})," Không hoạt động"]})]})},{title:"Thời gian bắt đầu",dataIndex:"start_date",render:a=>v(a).format("DD/MM/YYYY")},{title:"Thời gian kết thúc",dataIndex:"end_date",render:a=>v(a).format("DD/MM/YYYY")},{title:"Action",key:"action",render:(a,t)=>e.jsxs(P,{size:"middle",children:[e.jsx("a",{children:e.jsx(q,{onClick:()=>Y(t)})}),e.jsx("a",{children:e.jsx(y,{onClick:()=>E(t)})})]})}],N={onChange:(a,t)=>{f(t),t.length>0?m(!0):m(!1)}},[O,x]=n.useState([]),[i,b]=n.useState(""),[o,u]=n.useState({}),[I,C]=n.useState(!1),[l,f]=n.useState([]),[L,m]=n.useState(!1),[w,j]=n.useState(!1);n.useEffect(()=>{c()},[]),n.useEffect(()=>{c()},[i]);const c=async()=>{let a='/api/resource/VGM_Campaign?fields=["*"]';i!=null&&i!=""&&(a+=`&filters=[["campaign_name","like","%${i}%"]]`);let t=await g.get(a);if(t&&t.data){let d=t.data.map(s=>({...s,key:s.name}));x(d)}else x([])},X=a=>{b(a.target.value)},Y=a=>{p(`/campaign-edit/${a.name}`)},E=a=>{u(a),C(!0)},F=async()=>{let a=`/api/resource/VGM_Campaign/${o.name}`,t=await g.delete(a);t!=null&&t.message!=null&&t.message=="ok"?(r.success("Xóa thành công"),c(),u({}),D()):r.error("Xóa thất bại")},D=()=>{C(!1)},H=()=>{j(!0)},V=async()=>{let a="/api/method/vgm_audit.api.api.deleteListByDoctype",t=[];for(let h=0;h<l.length;h++)t.push(l[h].name);let d={doctype:"VGM_Campaign",items:JSON.stringify(t)},s=await g.post(a,d);s!=null&&s.message!=null&&s.message.status=="success"?(r.success("Xóa thành công"),f([]),m(!1),c(),k()):r.error("Xóa thất bại")},k=()=>{j(!1)};return e.jsxs(e.Fragment,{children:[e.jsx($,{title:"Chiến dịch",buttons:[L&&{label:"Xóa",type:"primary",icon:e.jsx(y,{}),size:"20px",className:"flex items-center mr-2",danger:!0,action:H},{label:"Nhập file",icon:e.jsx(R,{className:"text-xl"}),size:"20px",className:"flex items-center mr-2"},{label:"Thêm mới",type:"primary",icon:e.jsx(U,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>p("/campaign-create")}]}),e.jsxs("div",{className:"bg-white rounded-xl pt-4",children:[e.jsx(A,{className:"w-[320px] border-none p-4",children:e.jsx(B,{value:i,onChange:X,placeholder:"Tìm kiếm chiến dịch",prefix:e.jsx(G,{})})}),e.jsx("div",{className:"p-4",children:e.jsx(K,{rowSelection:{type:M,...N},columns:T,dataSource:O})})]}),e.jsxs(S,{title:`Xóa ${o.campaign_name}?`,open:I,onOk:F,onCancel:D,okText:"Xác nhận",cancelText:"Hủy",children:[e.jsxs("div",{children:["Bạn có chắc muốn xóa ",o.campaign_name," ra khỏi hệ thống không?"]}),e.jsx("div",{children:"Khi thực hiện hành động này, sẽ không thể hoàn tác."})]}),e.jsxs(S,{title:`Xóa ${l.length} chiến dịch?`,open:w,onOk:V,onCancel:k,okText:"Xác nhận",cancelText:"Hủy",children:[e.jsxs("div",{children:["Bạn có chắc muốn xóa ",l.length," chiến dịch ra khỏi hệ thống không?"]}),e.jsx("div",{children:"Khi thực hiện hành động này, sẽ không thể hoàn tác."})]})]})}function ne(){return e.jsxs(e.Fragment,{children:[e.jsx(J,{children:e.jsx("title",{children:" Campaign"})}),e.jsx(Q,{})]})}export{ne as default};