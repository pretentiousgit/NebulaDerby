//	HYPE.documents["nebula_derby"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="nebula_derby.hyperesources",c="nebula_derby",e="nebuladerby_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/nebuladerby_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_584","HYPE_dtl_584",!0==(null!=a&&10>a||false==!0)?"HYPE-584.full.min.js":"HYPE-584.thin.min.js"),false==!0&&(a=a||l("HYPE_w_584","HYPE_wdtl_584","HYPE-584.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"initSocket",source:"function(hypeDocument, element, event) {\tconst whales = [{\n\t\tname: \"imperial\",\n\t\telement: hypeDocument.getElementById('imperialWhale'),\n\t\tposition: hypeDocument.getElementProperty(hypeDocument.getElementById('imperialWhale'), 'left')\n\t},\n\t{\n\t\tname: \"cyber\",\n\t\telement: hypeDocument.getElementById('cyberWhale'),\n\t\tposition: hypeDocument.getElementProperty(hypeDocument.getElementById('cyberWhale'), 'left')\n\t},\n\t{\n\t\tname: \"predator\",\n\t\telement: hypeDocument.getElementById('predatorWhale'),\n\t\tposition: hypeDocument.getElementProperty(hypeDocument.getElementById('predatorWhale'), 'left')\n\t},\n\t\t{\n\t\tname: \"love\",\n\t\telement: hypeDocument.getElementById('loveWhale'),\n\t\tposition: hypeDocument.getElementProperty(hypeDocument.getElementById('loveWhale'), 'left')\n\t}\n\t]\n\n\tsocket.on('startRace', function (msg) {\n  function millisToMinutesAndSeconds(millis) {\n    var minutes = Math.floor(millis / 60000);\n    var seconds = ((millis % 60000) / 1000).toFixed(0);\n    return (minutes + \":\" + (seconds < 10 ? '0' : '') + seconds);\n  }\n\n  const timer = hypeDocument.getElementById('gameTimer');\n  console.log('timer', timer, msg);\n\n  var timerValue = msg;\n\n  const intervalId = setInterval(() => {\n    timer.innerHTML = millisToMinutesAndSeconds(timerValue);\n    timerValue -= 20;\n  }, 20);\n  \n  \tsetTimeout(() => {\n  \t\tclearInterval(intervalId);\n  \t}, msg)\n  \n})\n\t\n\tsocket.on('whaleState', function(msg){\n\t\tconsole.log('server message!', msg);\n\t\tmsg.whales.map((whale) => {\t\n\t\t\tconst w = whales.find((obj) => obj.name === whale.name);\n\t\t\thypeDocument.setElementProperty(w.element, 'left', whale.position, 0.24, 'easeout');\n\t\t})\n\t})\n}",identifier:"10"},{name:"sendSocketMessage",source:"function(hypeDocument, element, event) {\tsocket.emit('message', 'helloWorld');\n\tconsole.log('emitted');\n}",identifier:"8"},{name:"untitledFunction",source:"function(hypeDocument, element, event) {\t\n\t\n}",identifier:"29"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_584(c,e,{"10":{p:1,n:"Untitled_Artwork_2x.png",g:"25",o:true,t:"@2x"},"2":{p:1,n:"IMG_0014_2x.png",g:"11",o:true,t:"@2x"},"15":{n:"AZSailorTattoo.woff"},"-2":{n:"blank.gif"},"3":{p:1,n:"Veil_Nebula_-_NGC6960.jpg",g:"14",o:true,t:"@1x"},"11":{n:"AZSailorTattoo.ttf"},"4":{p:1,n:"Veil_Nebula_-_NGC6960_2x.jpg",g:"14",o:true,t:"@2x"},"16":{n:"socketGlobal.js"},"5":{p:1,n:"IMG_0017.png",g:"16",o:true,t:"@1x"},"12":{n:"AZ%20Sailor%20Tattoo.otf"},"6":{p:1,n:"IMG_0017_2x.png",g:"16",o:true,t:"@2x"},"13":{n:"AZSailorTattoo.eot"},"7":{p:1,n:"IMG_0015.png",g:"18",o:true,t:"@1x"},"-1":{n:"PIE.htc"},"0":{n:"socket.io.slim.js"},"8":{p:1,n:"IMG_0015_2x.png",g:"18",o:true,t:"@2x"},"14":{p:1,n:"AZSailorTattoo.svg",g:"27",t:"image/svg+xml"},"1":{p:1,n:"IMG_0014.png",g:"11",o:true,t:"@1x"},"9":{p:1,n:"Untitled_Artwork.png",g:"25",o:true,t:"@1x"}},h,["<style>\n    @font-face {\n        font-family: 'AZSailorTattoo', Arial, Helvetica;\n        src: url('nebula_derby.hyperesources/AZSailorTattoo.eot?#iefix') format('embedded-opentype'),\n             url('nebula_derby.hyperesources/AZSailorTattoo.woff') format('woff'),\n             url('nebula_derby.hyperesources/AZSailorTattoo.ttf') format('truetype'),\n             url('nebula_derby.hyperesources/AZSailorTattoo.svg#AZSailorTattoo') format('svg');\n             font-weight: normal;\n\t\t\t font-style: normal;\n    }\n</style>"],d,[{n:"SendMessage",o:"1",X:[0]}],[{o:"3",A:{a:[{p:4,h:"10"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["33","31","34","30","32","35"],n:"MainRace","_":0,v:{"34":{w:"",h:"11",p:"no-repeat",x:"visible",tY:0,a:60,b:182,q:"100% 100%",dB:"img",z:5,j:"absolute",k:"div",d:125,i:"imperialWhale",c:250,r:"inline",aG:"A cartoonish blue sperm whale",tX:0},"30":{h:"16",p:"no-repeat",x:"visible",tY:0,q:"100% 100%",b:372,a:60,j:"absolute",z:7,k:"div",dB:"img",d:125,i:"predatorWhale",c:250,r:"inline",tX:0},"33":{cN:"none",w:"",h:"14",p:"no-repeat",x:"visible",a:-162,q:"100% 100%",b:-5,j:"absolute",dB:"img",z:1,k:"div",c:2665,d:1095,r:"inline",aP:"auto"},"32":{h:"18",p:"no-repeat",x:"visible",i:"cyberWhale",q:"100% 100%",b:572,a:60,j:"absolute",z:2,k:"div",dB:"img",d:125,c:250,r:"inline"},"35":{h:"25",p:"no-repeat",x:"visible",i:"loveWhale",q:"100% 100%",b:772,a:60,j:"absolute",z:3,k:"div",dB:"img",d:125,c:250,r:"inline"},"31":{G:"#FFD479",aU:8,c:196,aV:8,d:55,r:"inline",s:"AZSailorTattoo",t:48,Z:"break-word",i:"gameTimer",w:"<div style=\"text-align: right;\"><br></div>",j:"absolute",x:"visible",k:"div",y:"preserve",z:8,aS:8,aT:8,a:1666,b:49}}}],{},g,{},
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
