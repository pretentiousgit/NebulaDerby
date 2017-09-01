//	HYPE.documents["nebula_derby"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="nebula_derby.hyperesources",c="nebula_derby",e="nebuladerby_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/nebuladerby_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_584","HYPE_dtl_584",!0==(null!=a&&10>a||false==!0)?"HYPE-584.full.min.js":"HYPE-584.thin.min.js"),false==!0&&(a=a||l("HYPE_w_584","HYPE_wdtl_584","HYPE-584.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"initSocket",source:"function(hypeDocument, element, event) {\n}",identifier:"10"},{name:"sendSocketMessage",source:"function(hypeDocument, element, event) {\tsocket.emit('message', 'helloWorld');\n\tconsole.log('emitted');\n}",identifier:"8"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_584(c,e,{"3":{n:"socketGlobal.js"},"1":{p:1,n:"IMG_0014.png",g:"11",o:true,t:"@1x"},"-2":{n:"blank.gif"},"-1":{n:"PIE.htc"},"2":{p:1,n:"IMG_0014_2x.png",g:"11",o:true,t:"@2x"},"0":{n:"socket.io.slim.js"}},h,[],d,[{n:"SendMessage",o:"1",X:[0]}],[{A:{a:[{p:4,h:"10"}]},o:"3",p:"600px",cA:false,Y:1920,Z:1080,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{"7_hover":{i:"7_hover",n:"7_hover",z:0,b:[],a:[],f:30},"7_pressed":{i:"7_pressed",n:"7_pressed",z:1,b:[],a:[{f:"c",y:0,z:1,i:"g",e:"#5BE847",s:"",o:"14"},{y:1,i:"g",s:"#5BE847",z:0,o:"14",f:"c"}],f:30},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["15","14"],n:"MainRace","_":0,v:{"15":{w:"",h:"11",p:"no-repeat",x:"visible",a:69,q:"100% 100%",b:58,j:"absolute",dB:"img",z:1,k:"div",c:289,d:144,r:"inline"},"14":{b:277,z:2,K:"Solid",c:90,L:"Solid",d:15,aS:6,M:1,bD:"none",N:1,aT:6,dB:"button",O:1,g:"",aU:6,P:1,aV:6,j:"absolute",k:"div",aI:4,aJ:4,aK:4,aL:4,A:"#A0A0A0",B:"#A0A0A0",aM:"7_hover",Z:"break-word",C:"#A0A0A0",r:"inline",D:"#A0A0A0",aN:"7_pressed",t:13,aA:{a:[{p:4,h:"8"}]},F:"center",G:"#000000",aP:"pointer",w:"Send A Socket&nbsp;<br>",x:"visible",I:"Solid",a:102,y:"preserve",J:"Solid"}}}],{},g,{},
(function (shouldShow, mainContentContainer) {
	var loadingPageID = mainContentContainer.id + "_loading";
	var loadingDiv = document.getElementById(loadingPageID);

	if(shouldShow == true) {
		if(loadingDiv == null) {	
			loadingDiv = document.createElement("div");
			loadingDiv.id = loadingPageID;
			loadingDiv.style.cssText = "overflow:hidden;position:absolute;width:150px;top:40%;left:0;right:0;margin:auto;padding:2px;border:3px solid #BBB;background-color:#EEE;border-radius:10px;text-align:center;font-family:Helvetica,Sans-Serif;font-size:13px;font-weight:700;color:#AAA;z-index:100000;";
			loadingDiv.innerHTML = "Loading";
			mainContentContainer.appendChild(loadingDiv);
		}
 
		loadingDiv.style.display = "block";
		loadingDiv.removeAttribute("aria-hidden");
		mainContentContainer.setAttribute("aria-busy", true);
	} else {
		loadingDiv.style.display = "none";
		loadingDiv.setAttribute("aria-hidden", true);
		mainContentContainer.removeAttribute("aria-busy");
	}
})

,false,true,-1,true,true,false,false);f[c]=a.API;document.getElementById(e).setAttribute("HYP_dn",
c);a.z_o(this.body)})();})();
