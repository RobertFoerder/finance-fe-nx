"use strict";(self.webpackChunkfinance_fe=self.webpackChunkfinance_fe||[]).push([[110],{110:(Jt,y,d)=>{d.r(y),d.d(y,{AccountsViewsModule:()=>Mt,ROUTES:()=>O});var u=d(6814),h=d(8136),o=d(4221),A=d(7398),N=d(8180);const x=(0,o.PH)("[Accounts/API] Load accounts"),S=(0,o.PH)("[Accounts/API] Load accounts success",(0,o.Ky)()),$=(0,o.PH)("[Accounts/API] Load accounts failure",(0,o.Ky)()),q=(0,o.PH)("[Accounts] Reset"),E=(0,o.PH)("[Accounts/API] Add",(0,o.Ky)()),R=(0,o.PH)("[Account/API] Add account success",(0,o.Ky)()),P=(0,o.PH)("[Accounts/API] Add account failure",(0,o.Ky)()),Y=(0,o.PH)("[Accounts] Reset add"),Z=(0,o.PH)("[Accounts/API] Delete",(0,o.Ky)()),b=(0,o.PH)("[Accounts/API] Delete account success",(0,o.Ky)()),F=(0,o.PH)("[Accounts/API] Delete account failure",(0,o.Ky)()),M=(0,o.PH)("[Accounts] Reset delete"),T=(0,o.PH)("[Accounts/API] Edit",(0,o.Ky)()),J=(0,o.PH)("[Accounts/API] Edit account success",(0,o.Ky)()),U=(0,o.PH)("[Accounts/API] Edit account failure",(0,o.Ky)()),I=(0,o.PH)("[Accounts] Reset edit");var K=d(6293);const L="accounts",m=(0,K.H)(),Q=m.getInitialState({readRequestStatus:"initial",addRequestStatus:"initial",deleteRequestStatus:"initial",editRequestStatus:"initial",loadError:void 0,addError:void 0,deleteError:void 0,editError:void 0}),G=(0,o.Lq)(Q,(0,o.on)(x,e=>({...e,readRequestStatus:"pending",loadError:void 0})),(0,o.on)(S,(e,{accounts:i})=>m.setAll(i,{...e,readRequestStatus:"successful"})),(0,o.on)($,(e,{error:i})=>({...e,loadError:i,readRequestStatus:"failed"})),(0,o.on)(E,e=>({...e,addRequestStatus:"pending",addError:void 0})),(0,o.on)(R,(e,{account:i})=>m.setOne(i,{...e,addRequestStatus:"successful"})),(0,o.on)(P,(e,{error:i})=>({...e,addRequestStatus:"failed",addError:i})),(0,o.on)(Z,e=>({...e,deleteRequestStatus:"pending",deleteError:void 0})),(0,o.on)(b,(e,{id:i})=>m.removeOne(i,{...e,deleteRequestStatus:"successful"})),(0,o.on)(F,(e,{error:i})=>({...e,deleteRequestStatus:"failed",deleteError:i})),(0,o.on)(T,e=>({...e,editRequestStatus:"pending",editError:void 0})),(0,o.on)(J,(e,{account:i})=>m.upsertOne(i,{...e,editRequestStatus:"successful"})),(0,o.on)(U,(e,{error:i})=>({...e,editRequestStatus:"failed",editError:i})),(0,o.on)(q,e=>({...e,loadError:void 0,readRequestStatus:"initial"})),(0,o.on)(Y,e=>({...e,addError:void 0,addRequestStatus:"initial"})),(0,o.on)(M,e=>({...e,deleteError:void 0,deleteRequestStatus:"initial"})),(0,o.on)(I,e=>({...e,editError:void 0,editRequestStatus:"initial"})));function j(e,i){return G(e,i)}const l=(0,o.ZF)(L),{selectAll:D,selectEntities:z}=m.getSelectors(),B=(0,o.P1)(l,e=>"pending"===e.readRequestStatus),V=(0,o.P1)(l,e=>"successful"===e.readRequestStatus),W=(0,o.P1)(l,e=>e.loadError),X=(0,o.P1)(l,e=>D(e)),k=(0,o.P1)(l,e=>z(e)),tt=(0,o.P1)(l,e=>"pending"===e.deleteRequestStatus),et=(0,o.P1)(l,e=>e.deleteError),nt=(0,o.P1)(l,e=>"pending"===e.addRequestStatus),ot=(0,o.P1)(l,e=>"successful"===e.addRequestStatus),ct=(0,o.P1)(l,e=>e.addError),st=(0,o.P1)(l,e=>"pending"===e.editRequestStatus),it=(0,o.P1)(l,e=>"successful"===e.editRequestStatus),at=(0,o.P1)(l,e=>e.editError);var t=d(9212),dt=d(7280);let v=(()=>{class e{constructor(n,s){this.store=n,this.sumUp=s,this.loading$=this.store.pipe((0,o.Ys)(B)),this.loaded$=this.store.pipe((0,o.Ys)(V)),this.collection$=this.store.pipe((0,o.Ys)(X)),this.entities$=this.store.pipe((0,o.Ys)(k)),this.loadError$=this.store.pipe((0,o.Ys)(W)),this.deleting$=this.store.pipe((0,o.Ys)(tt)),this.deleteError$=this.store.pipe((0,o.Ys)(et)),this.adding$=this.store.pipe((0,o.Ys)(nt)),this.added$=this.store.pipe((0,o.Ys)(ot)),this.addError$=this.store.pipe((0,o.Ys)(ct)),this.editing$=this.store.pipe((0,o.Ys)(st)),this.edited$=this.store.pipe((0,o.Ys)(it)),this.editError$=this.store.pipe((0,o.Ys)(at)),this.total$=this.collection$.pipe((0,A.U)(c=>this.sumUp.accounts(c)))}init(){this.loaded$.pipe((0,N.q)(1)).subscribe(n=>{n||this.store.dispatch(x())})}resetAccounts(){this.store.dispatch(q())}resetAdd(){this.store.dispatch(Y())}resetDelete(){this.store.dispatch(M())}resetEdit(){this.store.dispatch(I())}addAccount(n){this.store.dispatch(E({account:n}))}editAccount(n){n.id&&this.store.dispatch(T({id:n.id,account:n}))}deleteAccount(n){n&&this.store.dispatch(Z({id:n}))}static#t=this.\u0275fac=function(s){return new(s||e)(t.LFG(o.yh),t.LFG(dt.A))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})();var p=d(3109),rt=d(3536),_=d(7566),f=d(6884);let ut=(()=>{class e{constructor(n,s){this.actions$=n,this.service=s,this.load$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(x),(0,_.he)({run:()=>this.service.getAccounts().pipe((0,A.U)(c=>S({accounts:c}))),onError:(c,a)=>$({error:(0,f.xs)(a)})}))),this.add$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(E),(0,_.he)({run:({account:c})=>this.service.postAccount(c).pipe((0,A.U)(a=>R({account:a}))),onError:(c,a)=>P({error:(0,f.xs)(a)})}))),this.delete$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(Z),(0,_.he)({run:({id:c})=>this.service.deleteAccount(c).pipe((0,A.U)(()=>b({id:c}))),onError:(c,a)=>F({error:(0,f.xs)(a)})}))),this.edit$=(0,p.GW)(()=>this.actions$.pipe((0,p.l4)(T),(0,_.he)({run:({id:c,account:a})=>this.service.putAccount(c,a).pipe((0,A.U)(g=>J({account:g}))),onError:(c,a)=>U({error:(0,f.xs)(a)})})))}static#t=this.\u0275fac=function(s){return new(s||e)(t.LFG(p.eX),t.LFG(rt.iu))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac})}return e})();var C=d(1868);let lt=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({providers:[v],imports:[u.ez,o.Aw.forFeature(L,j),p.sQ.forFeature([ut]),C.m]})}return e})();var pt=d(4219);function ft(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Loading ..."),t.qZA())}function gt(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Error loading accounts..."),t.qZA())}function ht(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Deleting..."),t.qZA())}function At(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Error deleting account..."),t.qZA())}function mt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",12)(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"button",4),t.NdJ("click",function(){const a=t.CHM(n).$implicit,g=t.oxw(2);return t.KtG(g.editAccount(a.id))}),t._UZ(4,"img",13),t.qZA(),t.TgZ(5,"button",4),t.NdJ("click",function(){const a=t.CHM(n).$implicit,g=t.oxw(2);return t.KtG(g.deleteAccount(a.id,a.name))}),t._UZ(6,"img",14),t.qZA(),t.TgZ(7,"span",15),t._uU(8),t.ALo(9,"currency"),t.qZA()()}if(2&e){const n=i.$implicit;t.xp6(2),t.Oqu(n.name),t.xp6(5),t.ekj("expense",n.value&&n.value<0)("income",n.value&&n.value>0),t.xp6(1),t.hij(" ",t.xi3(9,6,n.value,"EUR")," ")}}function vt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div")(1,"div",1)(2,"div",2)(3,"span",3),t._uU(4,"Accounts"),t.qZA(),t.TgZ(5,"button",4),t.NdJ("click",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.addAccount())}),t.O4$(),t.TgZ(6,"svg",5)(7,"title"),t._uU(8,"Add"),t.qZA(),t._UZ(9,"path",6),t.qZA()()(),t.kcU(),t.TgZ(10,"div",7),t.YNc(11,mt,10,9,"div",8),t.ALo(12,"async"),t.qZA()(),t.TgZ(13,"div",9)(14,"span",10),t._uU(15),t.ALo(16,"currency"),t.qZA(),t.TgZ(17,"span",11),t._uU(18,"Total"),t.qZA()()()}if(2&e){const n=t.oxw();t.xp6(11),t.Q6J("ngForOf",t.lcZ(12,6,n.facade.collection$)),t.xp6(3),t.ekj("income",n.total>0)("expense",n.total<0),t.xp6(1),t.Oqu(t.xi3(16,8,n.total,"EUR"))}}let _t=(()=>{class e extends f.e${constructor(n,s,c,a){super(),this.facade=n,this.router=s,this.activatedRoute=c,this.confirmBox=a,this.total=0}ngOnInit(){this.subscribeTo(this.facade.total$,n=>{n&&(this.total=n)}),this.facade.init()}addAccount(){this.router.navigate(["add"],{relativeTo:this.activatedRoute})}deleteAccount(n,s){this.confirmBox.danger("Delete account",`Should account "${s}" really be deleted?`,"Yes","Cancel").subscribe(c=>{c.success&&this.facade.deleteAccount(n)})}editAccount(n){this.router.navigate(["edit",n],{relativeTo:this.activatedRoute})}static#t=this.\u0275fac=function(s){return new(s||e)(t.Y36(v),t.Y36(h.F0),t.Y36(h.gz),t.Y36(pt.jL))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],features:[t.qOj],decls:12,vars:19,consts:[[4,"ngIf"],[1,"shadow-lg","rounded-md","h-auto","bg-white","flex","flex-col","p-2"],[1,"flex","flex-row","items-center","border-b-0","border-black","border-b-2"],[1,"ml-2","text-lg","font-bold"],[1,"pl-2",3,"click"],["viewBox","0 0 20 20","xmlns","http://www.w3.org/2000/svg",1,"fill-current","h-4","w-4"],["d","M 10 8 L 10 1 L 8 1 L 8 8 l -7 0 l 0 2 L 8 10 l 0 7 l 2 -0 L 10 10 l 7 0 l -0 -2 z"],[1,"pt-4","pb-2","pl-2","divide-y-2"],["class","mb-2 flex flex-row",4,"ngFor","ngForOf"],[1,"mt-2","mr-2","flex","flex-row-reverse"],[1,"text-lg","font-bold"],[1,"font-bold","mr-2","text-lg"],[1,"mb-2","flex","flex-row"],["src","/assets/svg/edit.svg",1,"h-4","w-4","mr-2"],["src","/assets/svg/delete.svg",1,"h-4","w-4","mr-2"],[1,"flex-grow","text-right"]],template:function(s,c){1&s&&(t.YNc(0,ft,2,0,"span",0),t.ALo(1,"async"),t.YNc(2,gt,2,0,"span",0),t.ALo(3,"async"),t.YNc(4,ht,2,0,"span",0),t.ALo(5,"async"),t.YNc(6,At,2,0,"span",0),t.ALo(7,"async"),t.YNc(8,vt,19,11,"div",0),t.ALo(9,"async"),t.ALo(10,"async"),t.ALo(11,"async")),2&s&&(t.Q6J("ngIf",t.lcZ(1,5,c.facade.loading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(3,7,c.facade.loadError$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(5,9,c.facade.deleting$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(7,11,c.facade.deleteError$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(9,13,c.facade.loading$)&&void 0===t.lcZ(10,15,c.facade.loadError$)&&!1===t.lcZ(11,17,c.facade.deleting$)))},dependencies:[u.sg,u.O5,u.Ov,u.H9],encapsulation:2,changeDetection:0})}return e})(),xt=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[u.ez]})}return e})();var w=d(8763),r=d(95),H=d(4954);function Et(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Adding..."),t.qZA())}function Zt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"form",2,3),t.NdJ("ngSubmit",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.facade.addAccount(c.account))}),t.TgZ(2,"div")(3,"label",4),t._uU(4,"Name*"),t.qZA(),t.TgZ(5,"input",5),t.NdJ("ngModelChange",function(c){t.CHM(n);const a=t.oxw();return t.KtG(a.account.name=c)}),t.qZA()(),t.TgZ(6,"div")(7,"label",6),t._uU(8,"Value*"),t.qZA(),t.TgZ(9,"finance-fe-value-input",7),t.NdJ("ngModelChange",function(c){t.CHM(n);const a=t.oxw();return t.KtG(a.account.value=c)}),t.qZA()(),t.TgZ(10,"div")(11,"button",8),t._uU(12," Add account "),t.qZA()()()}if(2&e){const n=t.MAs(1),s=t.oxw();t.xp6(5),t.Q6J("ngModel",s.account.name),t.xp6(4),t.Q6J("income",!0)("ngModel",s.account.value),t.xp6(2),t.Q6J("disabled",n.form.untouched||!n.form.valid)}}let Tt=(()=>{class e extends f.e${constructor(n,s,c){super(),this.facade=n,this.toastr=s,this.router=c,this.account={name:""}}ngOnInit(){this.facade.resetAdd(),this.subscribeTo(this.facade.addError$,n=>{n&&this.toastr.error("Error adding account")}),this.subscribeTo(this.facade.added$,n=>{n&&this.router.navigate(["/accounts"])})}static#t=this.\u0275fac=function(s){return new(s||e)(t.Y36(v),t.Y36(w._W),t.Y36(h.F0))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],features:[t.qOj],decls:4,vars:6,consts:[[4,"ngIf"],["class","max-w-md",3,"ngSubmit",4,"ngIf"],[1,"max-w-md",3,"ngSubmit"],["accountForm","ngForm"],["for","name"],["name","name","type","text","required","",3,"ngModel","ngModelChange"],["for","value"],["required","","name","value",3,"income","ngModel","ngModelChange"],["type","submit",1,"btn-primary","mt-2",3,"disabled"]],template:function(s,c){1&s&&(t.YNc(0,Et,2,0,"span",0),t.ALo(1,"async"),t.YNc(2,Zt,13,4,"form",1),t.ALo(3,"async")),2&s&&(t.Q6J("ngIf",t.lcZ(1,2,c.facade.adding$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(3,4,c.facade.adding$)))},dependencies:[u.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.On,r.F,H.o,u.Ov],encapsulation:2,changeDetection:0})}return e})(),Ct=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[u.ez,r.u5,C.m]})}return e})();var yt=d(812),St=d(9397),$t=d(4664);function qt(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Editing..."),t.qZA())}function Rt(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"Loading..."),t.qZA())}function Pt(e,i){1&e&&(t.TgZ(0,"span"),t._uU(1,"No account with this id"),t.qZA())}function Yt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"form",2,3),t.NdJ("ngSubmit",function(){t.CHM(n);const c=t.oxw();return t.KtG(c.facade.editAccount(c.account))}),t.TgZ(2,"div")(3,"label",4),t._uU(4,"Name*"),t.qZA(),t.TgZ(5,"input",5),t.NdJ("ngModelChange",function(c){t.CHM(n);const a=t.oxw();return t.KtG(a.account.name=c)}),t.qZA()(),t.TgZ(6,"div")(7,"label",6),t._uU(8,"Value*"),t.qZA(),t.TgZ(9,"finance-fe-value-input",7),t.NdJ("ngModelChange",function(c){t.CHM(n);const a=t.oxw();return t.KtG(a.account.value=c)}),t.qZA()(),t.TgZ(10,"div")(11,"button",8),t._uU(12," Save "),t.qZA()()()}if(2&e){const n=t.MAs(1),s=t.oxw();t.xp6(5),t.Q6J("ngModel",s.account.name),t.xp6(4),t.Q6J("income",s.initialValue>=0)("ngModel",s.account.value),t.xp6(2),t.Q6J("disabled",n.form.untouched||!n.form.valid)}}let bt=(()=>{class e extends f.e${constructor(n,s,c,a,g){super(),this.facade=n,this.toastr=s,this.router=c,this.activatedRoute=a,this.cdr=g,this.account=void 0,this.loading=!0,this.initialValue=0}ngOnInit(){this.facade.init(),this.facade.resetEdit(),this.subscribeTo(this.facade.editError$,c=>{c&&this.toastr.error("Error adding account")}),this.subscribeTo(this.facade.edited$,c=>{c&&this.router.navigate(["/accounts"])});const n=this.activatedRoute.snapshot.params.accountId,s=this.facade.loaded$.pipe((0,yt.o)(()=>this.loading),(0,St.b)(c=>this.loading=!c),(0,$t.w)(()=>this.facade.collection$),(0,A.U)(c=>c.find(a=>a.id===n)));this.subscribeTo(s,c=>{this.account={...c},this.account&&(this.initialValue=this.account.value??0),this.cdr.detectChanges()})}static#t=this.\u0275fac=function(s){return new(s||e)(t.Y36(v),t.Y36(w._W),t.Y36(h.F0),t.Y36(h.gz),t.Y36(t.sBO))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],features:[t.qOj],decls:6,vars:8,consts:[[4,"ngIf"],["class","max-w-md",3,"ngSubmit",4,"ngIf"],[1,"max-w-md",3,"ngSubmit"],["accountForm","ngForm"],["for","name"],["name","name","type","text","required","","readonly","",3,"ngModel","ngModelChange"],["for","value"],["required","","name","value",3,"income","ngModel","ngModelChange"],["type","submit",1,"btn-primary","mt-2",3,"disabled"]],template:function(s,c){1&s&&(t.YNc(0,qt,2,0,"span",0),t.ALo(1,"async"),t.YNc(2,Rt,2,0,"span",0)(3,Pt,2,0,"span",0)(4,Yt,13,4,"form",1),t.ALo(5,"async")),2&s&&(t.Q6J("ngIf",t.lcZ(1,4,c.facade.editing$)),t.xp6(2),t.Q6J("ngIf",c.loading),t.xp6(1),t.Q6J("ngIf",!c.account&&!c.loading),t.xp6(1),t.Q6J("ngIf",!1===t.lcZ(5,6,c.facade.editing$)&&c.account))},dependencies:[u.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.On,r.F,H.o,u.Ov],encapsulation:2,changeDetection:0})}return e})(),Ft=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[u.ez,r.u5,C.m]})}return e})();const O=[{path:"",component:_t},{path:"add",component:Tt},{path:"edit/:accountId",component:bt}];let Mt=(()=>{class e{static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[u.ez,h.Bz.forChild(O),xt,Ct,Ft,lt]})}return e})()}}]);