import{a1 as p,r as s,j as e,a2 as u,F as r,z as g,Y as j,S as a,G as v,a4 as y,a as f,H as N}from"./main-ZqBQIJMP.js";const{RangePicker:I}=y,_=[{title:"STT",dataIndex:"stt"},{title:"Cửa hàng",dataIndex:"retail_code"},{title:"Tên chiến dịch",dataIndex:"campaign_name"},{title:"Nhân viên thực hiện",dataIndex:"employee_code"},{title:"Thời gian vào",dataIndex:"date_check_in"},{title:"Thời gian ra",dataIndex:"date_check_out"},{title:"Số lượng",dataIndex:"quantity_cate"}];function R(){const l=p(),[c,o]=s.useState([]);s.useState("checkbox");const d=t=>{localStorage.setItem("recordData",JSON.stringify(t)),l("/report-view")},x=async()=>{try{const n=await f.get("/api/method/vgm_audit.api.api.get_list_reports");if(n&&n.message.data){let h=n.message.data.map((i,m)=>({...i,key:i.name,stt:m+1,quantity_cate:"2"}));o(h)}}catch{}finally{}};return s.useEffect(()=>{x()},[]),e.jsxs(e.Fragment,{children:[e.jsx(u,{title:"Báo cáo"}),e.jsxs("div",{className:"bg-white rounded-xl",children:[e.jsxs("div",{className:"flex p-4",style:{alignItems:"flex-end"},children:[e.jsx(r,{className:"w-[320px] border-none mr-4 ",children:e.jsx(g,{placeholder:"Tìm kiếm theo chiến dịch",prefix:e.jsx(j,{})})}),e.jsx(r,{className:"w-[250px] border-none mr-4",label:"Thời gian thực hiện",children:e.jsx(I,{})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("label",{style:{paddingBottom:"5px"},children:"Nhân viên:"}),e.jsxs(a,{className:"w-[200px] h-[36px]",children:[e.jsx(a.Option,{value:"demo",children:"Nguyễn Văn A"}),e.jsx(a.Option,{value:"demo1",children:"Nguyễn Văn B"}),e.jsx(a.Option,{value:"demo2",children:"Nguyễn Văn C"}),e.jsx(a.Option,{value:"demo3",children:"Nguyễn Văn D"})]})]})]}),e.jsx("div",{className:"p-4",children:e.jsx(v,{columns:_,dataSource:c,onRow:(t,n)=>({onClick:()=>d(t)})})})]})]})}function k(){return e.jsxs(e.Fragment,{children:[e.jsx(N,{children:e.jsx("title",{children:"BÁO CÁO"})}),e.jsx(R,{})]})}export{k as default};