(this["webpackJsonpreact-client"]=this["webpackJsonpreact-client"]||[]).push([[0],{164:function(e,t,n){e.exports={layout:"AdminLayout_layout__3Urpo",content:"AdminLayout_content__3Vxtf",siteLayoutBackground:"AdminLayout_siteLayoutBackground__3DuLp"}},175:function(e,t,n){e.exports={inputId:"ProductUpdate_inputId__d26CZ"}},177:function(e,t,n){e.exports={inputId:"FilesUpdate_inputId__13bMz"}},202:function(e,t,n){e.exports={wrapper_svg:"Loading_wrapper_svg__34QF_"}},206:function(e,t,n){e.exports={logo:"AppMenu_logo__2s0i4"}},207:function(e,t,n){e.exports={wrapperHeader:"AppHeader_wrapperHeader__xXvM-"}},212:function(e,t,n){e.exports={product:"ProductsIndex_product__2CaA3"}},215:function(e,t,n){e.exports={labelFile:"FilesCreate_labelFile__3vTUb"}},236:function(e,t,n){},338:function(e,t,n){"use strict";n.r(t);var c,r,a,i,s,o,j,l,d,u,b=n(0),O=n.n(b),m=n(34),p=n.n(m),x=n(33),h=(n(236),n(237),n(24)),f=n(22),g=n(4),v=function(){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(f.b,{to:"/admin",children:"AdminArea"}),Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)("div",{children:"client layout"})}),Object(g.jsx)(h.b,{path:"users/*",element:Object(g.jsx)(y,{})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)("div",{children:"Client Error"})})]})]})},y=function(){return Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)("div",{children:"client users"})}),Object(g.jsx)(h.b,{path:":id",element:Object(g.jsx)("div",{children:"client user"})})]})},I=n(356),_=n(44),w=n(352),P=Object(w.a)(c||(c=Object(_.a)(["\n    query Me {\n        me {\n            user {\n                id\n                email\n                firstName\n                lastName\n                roles {\n                    id\n                    name\n                }\n            }\n            accessToken\n        }\n    }\n\n"]))),F=n(49),N=n(29),k=n.n(N),L=n(38),U=n(56),C={authData:null,isAuth:!1},S=function(e,t){return{type:"SET_AUTH_DATA",payload:{authData:e,isAuth:t}}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_AUTH_DATA":return Object(U.a)(Object(U.a)({},e),t.payload);default:return e}},E=n(202),T=n.n(E),R=n(203),$=function(){return Object(g.jsx)("div",{className:T.a.wrapper_svg,children:Object(g.jsx)(R.a,{size:"large"})})},D=function(e){return e.auth.authData},q=function(e){return e.auth.isAuth},M=n(342),H=n(77),z=n(360),G=n(361),V=n(362),B=n(363),Q=n(364),X=n(365),Z=n(366),J=n(206),K=n.n(J),W=M.a.Sider,Y=H.a.SubMenu,ee=function(){var e=Object(b.useState)(!1),t=Object(x.a)(e,2),n=t[0],c=t[1];return Object(g.jsxs)(W,{collapsible:!0,collapsed:n,onCollapse:c,children:[Object(g.jsx)("div",{className:K.a.logo}),Object(g.jsxs)(H.a,{theme:"dark",defaultSelectedKeys:["1"],mode:"inline",children:[Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(z.a,{}),children:Object(g.jsx)(f.b,{to:"/admin",children:"Home"})},"10"),Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(G.a,{}),children:Object(g.jsx)(f.b,{to:"/admin/products",children:"Products"})},"20"),Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(V.a,{}),children:Object(g.jsx)(f.b,{to:"/admin/categories",children:"Categories"})},"30"),Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(B.a,{}),children:Object(g.jsx)(f.b,{to:"/admin/files",children:"Files"})},"40"),Object(g.jsxs)(Y,{icon:Object(g.jsx)(Q.a,{}),title:"Users",children:[Object(g.jsx)(H.a.Item,{children:Object(g.jsx)(f.b,{to:"/admin/users",children:"Customers"})},"50"),Object(g.jsx)(H.a.Item,{children:Object(g.jsx)(f.b,{to:"/admin/users",children:"Employees"})},"60")]},"sub1"),Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(X.a,{}),children:"Settings"},"70"),Object(g.jsx)(H.a.Item,{icon:Object(g.jsx)(Z.a,{}),children:Object(g.jsx)(f.b,{to:"/",children:"Client site"})},"70")]})]})},te=n(149),ne=n(207),ce=n.n(ne),re=n(113),ae=M.a.Header,ie=function(){var e=Object(F.c)(D),t=Object(F.b)(),n=Object(g.jsxs)(H.a,{children:[Object(g.jsx)(H.a.Item,{children:Object(g.jsx)(f.b,{to:"",children:"1st menu item"})}),Object(g.jsx)(H.a.Item,{onClick:function(){return t(function(){var e=Object(L.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.removeItem("token"),t(S(null,!1));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},children:"Logout"})]});return Object(g.jsxs)(ae,{className:ce.a.wrapperHeader,children:[Object(g.jsx)("div",{}),Object(g.jsx)(te.a,{overlay:n,placement:"topRight",children:Object(g.jsxs)("div",{children:[Object(g.jsxs)("span",{children:[e.user.firstName," ",e.user.lastName]}),Object(g.jsx)(re.a,{})]})})]})},se=n(357),oe=function(){var e=Object(h.f)().pathname.split("/");return e=e.filter(Boolean),Object(g.jsx)(se.a,{children:e.map((function(e){return Object(g.jsx)(se.a.Item,{children:e})}))})},je=function(){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{children:"HOME"}),Object(g.jsx)(f.b,{to:"/",children:"client site"})]})},le=Object(w.a)(r||(r=Object(_.a)(["\n    query GetUsers($getUsersInput: GetUsersInput!){\n        getUsers(getUsersInput: $getUsersInput){\n            id\n            email\n            firstName\n            lastName\n            roles{\n                id\n                name\n            }\n        }\n    }\n"]))),de=function(){console.log("UsersIndex");var e=Object(I.a)(le,{variables:{getUsersInput:{skip:0,take:5}}}),t=e.loading,n=e.error,c=e.data;return t?Object(g.jsx)($,{}):(n&&console.log(n),Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("ul",{children:null===c||void 0===c?void 0:c.getUsers.map((function(e){return Object(g.jsxs)("li",{children:[Object(g.jsx)("div",{children:e.email}),Object(g.jsx)("div",{children:e.firstName}),Object(g.jsx)("div",{children:e.lastName}),Object(g.jsx)("ul",{children:e.roles.map((function(e){return Object(g.jsx)("li",{children:e.name},e.id)}))})]},e.id)}))})}))},ue=function(){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{children:"Error"}),Object(g.jsx)(f.b,{to:"/",children:"Go home"})]})},be=function(){return console.log("UsersController"),Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(de,{})}),Object(g.jsx)(h.b,{path:":id",element:Object(g.jsx)("div",{children:"user"})}),Object(g.jsx)(h.b,{path:"add",element:Object(g.jsx)("div",{children:"add user"})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)(ue,{})})]})},Oe=n(164),me=n.n(Oe),pe=n(358),xe=n(351),he=n(349),fe=n(353),ge=n(46),ve=Object(w.a)(a||(a=Object(_.a)(["\n    mutation CreateProduct($createProductInput: CreateProductInput!){\n        createProduct(createProductInput: $createProductInput){\n            id\n            name\n        }\n    }\n"]))),ye=Object(w.a)(i||(i=Object(_.a)(["\n    mutation UpdateProduct($updateProductInput: UpdateProductInput!){\n        updateProduct(updateProductInput: $updateProductInput){\n            id\n            name\n        }\n    }\n"]))),Ie=Object(w.a)(s||(s=Object(_.a)(["\n    mutation RemoveProduct($id: Int!){\n        removeProduct(id: $id)\n    }\n"]))),_e=n(218),we=function(){var e=Object(pe.a)(ve),t=Object(x.a)(e,2),n=t[0],c=t[1].loading,r=Object(h.g)(),a=function(){var e=Object(L.a)(k.a.mark((function e(t){var c;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Received values of form: ",t),e.next=3,n({variables:{createProductInput:Object(U.a)({},t)}});case 3:c=e.sent,console.log(c),c.data&&!c.errors?r(".."):console.log("error:",c.errors);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=Object(b.useState)([{uid:"-1",name:"image.png",status:"done",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}]),s=Object(x.a)(i,2),o=s[0],j=s[1],l=function(){var e=Object(L.a)(k.a.mark((function e(t){var n,c,r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.url){e.next=5;break}return e.next=4,new Promise((function(e){var n=new FileReader;n.readAsDataURL(t.originFileObj),n.onload=function(){return e(n.result)}}));case 4:n=e.sent;case 5:(c=new Image).src=n,null===(r=window.open(n))||void 0===r||r.document.write(c.outerHTML);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(xe.a,{name:"createProduct",onFinish:a,children:[Object(g.jsx)(_e.a,{rotate:!0,children:Object(g.jsx)(he.a,{action:window.location.protocol+"//"+window.location.host+"/api/files/upload",listType:"picture-card",fileList:o,onChange:function(e){j(e.fileList)},onPreview:l,maxCount:20,children:o.length<5&&"+ Upload"})}),Object(g.jsx)(xe.a.Item,{name:"name",label:"Name",rules:[{required:!0,message:"Please input product name"}],children:Object(g.jsx)(fe.a,{placeholder:"Product name"})}),Object(g.jsx)(xe.a.Item,{children:Object(g.jsx)(ge.a,{type:"primary",htmlType:"submit",loading:c,children:"Create"})})]})},Pe=Object(w.a)(o||(o=Object(_.a)(["\n    query GetProducts($getProductsInput: GetProductsInput!){\n        getProducts(getProductsInput: $getProductsInput){\n            id\n            name\n        }\n    }\n"]))),Fe=Object(w.a)(j||(j=Object(_.a)(["\n    query GetProduct($id: Int!){\n        getProduct(id: $id){\n            id\n            name\n        }\n    }\n"]))),Ne=n(212),ke=n.n(Ne),Le=function(){var e=Object(I.a)(Pe,{variables:{getProductsInput:{skip:0,take:10}}}),t=e.loading,n=e.error,c=e.data,r=Object(b.useState)(!1),a=Object(x.a)(r,2),i=(a[0],a[1],Object(b.useState)(null)),s=Object(x.a)(i,2);s[0],s[1];return t?Object(g.jsx)($,{}):(n&&console.log(n),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(f.b,{to:"create",children:Object(g.jsx)(ge.a,{children:"Create"})}),Object(g.jsx)("ul",{children:null===c||void 0===c?void 0:c.getProducts.map((function(e){return Object(g.jsxs)("li",{className:ke.a.product,children:[Object(g.jsx)("div",{children:Object(g.jsx)("div",{children:e.name})}),Object(g.jsxs)("div",{children:[Object(g.jsx)(f.b,{to:"../".concat(e.id),children:Object(g.jsx)(ge.a,{type:"default",children:"View"})}),Object(g.jsx)(f.b,{to:"update/".concat(e.id),children:Object(g.jsx)(ge.a,{type:"ghost",children:"Update"})}),Object(g.jsx)(f.b,{to:"remove/".concat(e.id),children:Object(g.jsx)(ge.a,{type:"primary",children:"Remove"})})]})]},e.id)}))})]}))},Ue=n(175),Ce=n.n(Ue),Se=function(){var e=Object(h.h)(),t=Object(I.a)(Fe,{variables:{id:e.id?parseInt(e.id):0}}),n=t.loading,c=t.error,r=t.data,a=Object(pe.a)(ye),i=Object(x.a)(a,1)[0],s=Object(h.g)();if(!e.id)return Object(g.jsx)(h.a,{to:"../../error"});if(n)return Object(g.jsx)($,{});c&&console.log(c);var o=function(){var e=Object(L.a)(k.a.mark((function e(t){var n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Received values of form: ",t),e.next=3,i({variables:{updateProductInput:Object(U.a)({},t)}});case 3:n=e.sent,console.log(n),n.data&&!n.errors?s(".."):console.log("error:",n.errors);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(xe.a,{name:"createProduct",onFinish:o,initialValues:{id:null===r||void 0===r?void 0:r.getProduct.id,name:null===r||void 0===r?void 0:r.getProduct.name},children:[Object(g.jsx)(xe.a.Item,{name:"id",className:Ce.a.inputId,children:Object(g.jsx)(fe.a,{type:"hidden",className:Ce.a.inputId})}),Object(g.jsx)(xe.a.Item,{name:"name",label:"Name",rules:[{required:!0,message:"Please input product name"}],children:Object(g.jsx)(fe.a,{placeholder:"Product name"})}),Object(g.jsx)(xe.a.Item,{children:Object(g.jsx)(ge.a,{type:"primary",htmlType:"submit",children:"Update"})})]})},Ae=function(){var e=Object(h.h)(),t=Object(I.a)(Fe,{variables:{id:e.id?parseInt(e.id):0}}),n=t.loading,c=t.error,r=t.data;return e.id?n?Object(g.jsx)($,{}):(c&&console.log(c),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{children:["id: ",null===r||void 0===r?void 0:r.getProduct.id]}),Object(g.jsxs)("div",{children:["name: ",null===r||void 0===r?void 0:r.getProduct.name]})]})):Object(g.jsx)(h.a,{to:"../../error"})},Ee=function(){var e=Object(h.h)(),t=Object(pe.a)(Ie),n=Object(x.a)(t,2),c=n[0],r=n[1].loading,a=Object(h.g)();if(!e||!e.id)return Object(g.jsx)(h.a,{to:"../../error"});var i=function(){var t=Object(L.a)(k.a.mark((function t(){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c({variables:{id:parseInt(e.id)}});case 2:(n=t.sent).data?a(".."):console.log(n.errors);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(Ae,{}),Object(g.jsx)(ge.a,{onClick:i,loading:r,children:"Remove"})]})},Te=function(){return Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(Le,{})}),Object(g.jsx)(h.b,{path:":id",element:Object(g.jsx)(Ae,{})}),Object(g.jsx)(h.b,{path:"create",element:Object(g.jsx)(we,{})}),Object(g.jsx)(h.b,{path:"update/:id",element:Object(g.jsx)(Se,{})}),Object(g.jsx)(h.b,{path:"remove/:id",element:Object(g.jsx)(Ee,{})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)(ue,{})})]})},Re=function(){return Object(g.jsx)("div",{children:"Categories"})},$e=function(){return Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(Re,{})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)(ue,{})})]})},De=n(178),qe=n(355),Me=Object(w.a)(l||(l=Object(_.a)(["\n    mutation CreateFile($createFileInput: CreateFileInput!) {\n        createFile(createFileInput: $createFileInput) {\n            id\n        }\n    }\n\n"]))),He=n(348),ze=n(225),Ge=function(e){var t=e.loading,n=e.files,c=e.setFiles,r=[{title:"Image",key:"image",render:function(e,t){var n=t.type.match(/image/);return Object(g.jsx)(qe.a,{shape:"square",size:48,src:n&&n.length?URL.createObjectURL(t):"/static/images/file.png",alt:t.name})}},{title:"Name",dataIndex:"name",key:"name"},{title:"Size",dataIndex:"size",key:"size"},{title:"Action",key:"action",render:function(e,t){return Object(g.jsx)("button",{className:"buttonRemove",onClick:function(){return e=t,n=n.filter((function(t){return t!==e})),void c(n);var e},children:Object(g.jsx)(qe.a,{size:24,icon:Object(g.jsx)(ze.a,{})})})}}];return Object(g.jsx)(He.a,{columns:r,dataSource:n,pagination:!1,loading:t})},Ve=n(367),Be=n(215),Qe=n.n(Be),Xe=n(216),Ze=n.n(Xe).a.create({withCredentials:!0,baseURL:window.location.protocol+"//"+window.location.host+"/api/"}),Je=function(e){var t=new FormData;return e.forEach((function(e,n){t.append("files[]",e)})),Ze.post("files/upload",t,{headers:{"Content-Type":"multipart-form-data"}}).then((function(e){return e.data}))},Ke={loading:!1,uploadedFiles:[]},We=function(e){return{type:"SET_LOADING",loading:e}},Ye=function(e){return{type:"SET_UPLOADED_FILES",uploadedFiles:e}},et=function(e){return function(){var t=Object(L.a)(k.a.mark((function t(n){var c;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Je(e);case 2:!0===(c=t.sent).result&&(n(Ye(c.files)),n(We(!1)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},tt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ke,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_LOADING":return Object(U.a)(Object(U.a)({},e),{},{loading:t.loading});case"SET_UPLOADED_FILES":return Object(U.a)(Object(U.a)({},e),{},{uploadedFiles:t.uploadedFiles});default:return e}},nt=function(e){return e.files.loading},ct=function(e){return e.files.uploadedFiles},rt=function(){var e=Object(F.b)(),t=Object(pe.a)(Me),n=Object(x.a)(t,2),c=n[0],r=n[1].loading,a=Object(h.g)(),i=Object(b.useState)([]),s=Object(x.a)(i,2),o=s[0],j=s[1],l=Object(F.c)(ct),d=Object(F.c)(nt);Object(b.useEffect)((function(){l.length&&(l.forEach(function(){var e=Object(L.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("upload file: ",t),e.next=3,c({variables:{createFileInput:Object(U.a)({},t)}});case 3:e.sent;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a(".."),e(Ye([])))}),[l]);var u=function(){var t=Object(L.a)(k.a.mark((function t(){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o.length&&(e(We(!0)),e(et(o)));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return console.log(o),Object(g.jsxs)(xe.a,{name:"createFile",onFinish:u,children:[Object(g.jsxs)(xe.a.Item,{children:[Object(g.jsx)("input",{type:"file",id:"file",multiple:!0,style:{display:"none"},onChange:function(e){var t;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&(o&&o.length>0?j([].concat(Object(De.a)(Array.from(o)),Object(De.a)(Array.from(e.target.files)))):j(Array.from(e.target.files)))}}),Object(g.jsx)("label",{className:Qe.a.labelFile,htmlFor:"file",children:Object(g.jsx)(qe.a,{icon:Object(g.jsx)(Ve.a,{})})})]}),o.length>0&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(xe.a.Item,{children:Object(g.jsx)(Ge,{loading:r||d,files:o,setFiles:j})}),Object(g.jsx)(xe.a.Item,{children:Object(g.jsx)(ge.a,{type:"primary",htmlType:"submit",loading:r||d,children:"Create"})})]})]})},at=Object(w.a)(d||(d=Object(_.a)(["\n    query GetFiles($getFilesInput: GetFilesInput!){\n        getFiles(getFilesInput: $getFilesInput){\n            id\n            mimetype\n            destination\n            fileName\n            size\n        }\n    }\n"]))),it=function(){var e=Object(I.a)(at,{variables:{getFilesInput:{skip:0,take:10}}}),t=e.loading,n=e.error,c=e.data;return t?Object(g.jsx)($,{}):(n&&console.log(n),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(f.b,{to:"create",children:Object(g.jsx)(ge.a,{children:"Create"})}),Object(g.jsx)("ul",{children:null===c||void 0===c?void 0:c.getFiles.map((function(e){return Object(g.jsxs)("li",{children:[Object(g.jsx)("div",{children:Object(g.jsx)("div",{children:e.fileName})}),Object(g.jsxs)("div",{children:[Object(g.jsx)(f.b,{to:"../".concat(e.id),children:Object(g.jsx)(ge.a,{type:"default",children:"View"})}),Object(g.jsx)(f.b,{to:"update/".concat(e.id),children:Object(g.jsx)(ge.a,{type:"ghost",children:"Update"})}),Object(g.jsx)(f.b,{to:"remove/".concat(e.id),children:Object(g.jsx)(ge.a,{type:"primary",children:"Remove"})})]})]},e.id)}))})]}))},st=n(177),ot=n.n(st),jt=function(){var e=Object(h.h)();Object(h.g)();if(!e.id)return Object(g.jsx)(h.a,{to:"../../error"});var t=function(){var e=Object(L.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Received values of form: ",t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(xe.a,{name:"createProduct",onFinish:t,children:[Object(g.jsx)(xe.a.Item,{name:"id",className:ot.a.inputId,children:Object(g.jsx)(fe.a,{type:"hidden",className:ot.a.inputId})}),Object(g.jsx)(xe.a.Item,{name:"name",label:"Name",rules:[{required:!0,message:"Please input product name"}],children:Object(g.jsx)(fe.a,{placeholder:"Product name"})}),Object(g.jsx)(xe.a.Item,{children:Object(g.jsx)(ge.a,{type:"primary",htmlType:"submit",children:"Update"})})]})},lt=function(){return Object(h.h)().id?Object(g.jsx)(g.Fragment,{}):Object(g.jsx)(h.a,{to:"../../error"})},dt=function(){var e=Object(h.h)();Object(h.g)();if(!e||!e.id)return Object(g.jsx)(h.a,{to:"../../error"});var t=function(){var e=Object(L.a)(k.a.mark((function e(){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(lt,{}),Object(g.jsx)(ge.a,{onClick:t,children:"Remove"})]})},ut=function(){return Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(it,{})}),Object(g.jsx)(h.b,{path:":id",element:Object(g.jsx)(lt,{})}),Object(g.jsx)(h.b,{path:"create",element:Object(g.jsx)(rt,{})}),Object(g.jsx)(h.b,{path:"update/:id",element:Object(g.jsx)(jt,{})}),Object(g.jsx)(h.b,{path:"remove/:id",element:Object(g.jsx)(dt,{})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)(ue,{})})]})},bt=M.a.Content,Ot=function(){return console.log("AppLayout"),Object(F.c)(q)?Object(g.jsxs)(M.a,{className:me.a.layout,children:[Object(g.jsx)(ee,{}),Object(g.jsxs)(M.a,{className:"site-layout",children:[Object(g.jsx)(ie,{}),Object(g.jsxs)(bt,{className:me.a.content,children:[Object(g.jsx)(oe,{}),Object(g.jsx)("div",{className:me.a.siteLayoutBackground,children:Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(je,{})}),Object(g.jsx)(h.b,{path:"products/*",element:Object(g.jsx)(Te,{})}),Object(g.jsx)(h.b,{path:"categories/*",element:Object(g.jsx)($e,{})}),Object(g.jsx)(h.b,{path:"files/*",element:Object(g.jsx)(ut,{})}),Object(g.jsx)(h.b,{path:"users/*",element:Object(g.jsx)(be,{})}),Object(g.jsx)(h.b,{path:"*",element:Object(g.jsx)(ue,{})})]})})]})]})]}):Object(g.jsx)(h.a,{to:"/admin/login"})},mt=n(95),pt=n.n(mt),xt=n(124),ht=n(368),ft=Object(w.a)(u||(u=Object(_.a)(["\n    mutation Login($loginInput: LoginInput!){\n        login(loginInput: $loginInput){\n            accessToken\n            user{\n                id\n                email\n                firstName\n                lastName\n                roles{\n                    id\n                    name\n                }\n            }\n        }\n    }\n"]))),gt=function(){console.log("admin login form");var e=Object(F.b)(),t=Object(F.c)(q),n=Object(pe.a)(ft),c=Object(x.a)(n,2),r=c[0],a=c[1],i=(a.data,a.loading,a.error);if(t)return Object(g.jsx)(h.a,{to:"/admin"});var s=function(){var t=Object(L.a)(k.a.mark((function t(n){var c;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Received values of form: ",n),t.next=3,r({variables:{loginInput:{email:n.email,password:n.password}}});case 3:c=t.sent,console.log(c),c.data&&!c.errors?(localStorage.setItem("token",c.data.login.accessToken),e(S(c.data.login,!0))):console.log("error:",i);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(g.jsxs)(xe.a,{name:"normal_login",className:pt.a.loginForm,initialValues:{remember:!0},onFinish:s,children:[Object(g.jsx)("h2",{className:pt.a.title,children:"Admin Panel"}),Object(g.jsx)(xe.a.Item,{name:"email",rules:[{required:!0,message:"Please input your Email!"}],children:Object(g.jsx)(fe.a,{prefix:Object(g.jsx)(Z.a,{className:"site-form-item-icon"}),placeholder:"Email",type:"email"})}),Object(g.jsx)(xe.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}],children:Object(g.jsx)(fe.a,{prefix:Object(g.jsx)(ht.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})}),Object(g.jsxs)(xe.a.Item,{children:[Object(g.jsx)(xe.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,className:pt.a.rememberMe,children:Object(g.jsx)(xt.a,{children:Object(g.jsx)("span",{className:pt.a.white,children:"Remember me"})})}),Object(g.jsx)(f.b,{className:pt.a.forgotPass,to:"",children:"Forgot password"})]}),Object(g.jsxs)(xe.a.Item,{children:[Object(g.jsx)(ge.a,{type:"primary",htmlType:"submit",className:["login-form-button",pt.a.submit].join(" "),children:"Log in"}),Object(g.jsx)("span",{className:pt.a.white,children:"Or "}),Object(g.jsx)(f.b,{to:"/admin-area/register",children:"register now!"})]})]})},vt=function(){var e=Object(F.b)(),t=Object(I.a)(P),n=t.loading,c=t.error,r=t.data,a=Object(b.useState)(!1),i=Object(x.a)(a,2),s=i[0],o=i[1];return Object(b.useEffect)((function(){r&&!c&&(e(S(r.me,!0)),o(!0)),c&&o(!0)}),[r,c]),console.log(n,!s,null===c||void 0===c?void 0:c.graphQLErrors,null===c||void 0===c?void 0:c.message),n||!s?Object(g.jsx)($,{}):Object(g.jsxs)(h.d,{children:[Object(g.jsx)(h.b,{path:"/",element:Object(g.jsx)(v,{})}),Object(g.jsx)(h.b,{path:"admin/*",element:Object(g.jsx)(Ot,{})}),Object(g.jsx)(h.b,{path:"admin/login",element:Object(g.jsx)(gt,{})})]})},yt=n(127),It=n(217),_t=Object(yt.b)({auth:A,files:tt}),wt=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||yt.c,Pt=Object(yt.d)(_t,wt(Object(yt.a)(It.a)));window.__store__=Pt;var Ft=Pt,Nt=n(350),kt=n(354),Lt=n(347),Ut=new Nt.a({uri:"/graphql",credentials:"include",cache:new kt.a,headers:{authorization:localStorage.getItem("token")?"Bearer ".concat(localStorage.getItem("token")):""},defaultOptions:{watchQuery:{fetchPolicy:"no-cache",errorPolicy:"all"},query:{fetchPolicy:"no-cache",errorPolicy:"all"}}});p.a.render(Object(g.jsx)(O.a.StrictMode,{children:Object(g.jsx)(F.a,{store:Ft,children:Object(g.jsx)(f.a,{children:Object(g.jsx)(Lt.a,{client:Ut,children:Object(g.jsx)(vt,{})})})})}),document.getElementById("root"))},95:function(e,t,n){e.exports={loginForm:"Login_loginForm__1TaLU",title:"Login_title__1yFpQ",white:"Login_white__1Hmsg",rememberMe:"Login_rememberMe__2NYZe",forgotPass:"Login_forgotPass__3PeBp",submit:"Login_submit__2M9pX"}}},[[338,1,2]]]);
//# sourceMappingURL=main.bd63b124.chunk.js.map