//	HYPE.documents["index"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="index.hyperesources",c="index",e="index_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/index_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_584","HYPE_dtl_584",!0==(null!=a&&10>a||false==!0)?"HYPE-584.full.min.js":"HYPE-584.thin.min.js"),false==!0&&(a=a||l("HYPE_w_584","HYPE_wdtl_584","HYPE-584.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"initSocket",source:"function(hypeDocument, element, event) {console.log('initSocket loaded');\n\nfunction offset(el) {\n    var rect = el.getBoundingClientRect(),\n    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,\n    scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width: rect.width, height: rect.height }\n}\n\nconst socket = io('http://localhost:3001');\nsocket.on('connect', () => {\n      console.log(\"socket connected\", socket.id);\n      const finishPos = document.getElementById('bolt');\n      const w = document.getElementById('loveWhale');\n      const whaleWidth = offset(w).width;\n      console.log('whalewidth', whaleWidth, w);\n      socket.emit('gameShake', { browserId: socket.id, message: 'game screen', finishLine: offset(finishPos).left, whaleWidth: whaleWidth });\n});\n\nfunction reset() {\n  console.log('play reset');\n  clearVictoryMessage();\n  clearEvents();\n  var arr = {\n    whales: [\n      {\n        name: 'loveWhale',\n        left: 60,\n        top: 808,\n        element: document.getElementById('loveWhale'),\n        opacity: hypeDocument.getElementProperty(document.getElementById('loveWhale'), 'opacity') || 1\n      },\n      {\n        name: 'cyberWhale',\n        left: 60,\n        top: 629,\n        element: document.getElementById('cyberWhale'),\n        opacity: hypeDocument.getElementProperty(document.getElementById('cyberWhale'), 'opacity') || 1\n      },\n      {\n        name: 'imperialWhale',\n        left: 60,\n        top: 257,\n        element: document.getElementById('imperialWhale'),\n        opacity: hypeDocument.getElementProperty(document.getElementById('imperialWhale'), 'opacity') || 1\n      },\n      {\n        name: 'predatorWhale',\n        left: 60,\n        top: 398,\n        element: document.getElementById('predatorWhale'),\n        opacity: hypeDocument.getElementProperty(document.getElementById('predatorWhale'), 'opacity') || 1\n      }\n    ]\n  };\n  console.log('Reset array', arr);\n  setWhalePositions(arr);\n\n};\n\nfunction playWiper() {\n  console.log('Playing wiper');\n  hypeDocument.startTimelineNamed('wiper', hypeDocument.kDirectionForward);\n}\n\nfunction pred_imperial() {\n  console.log('Playing pred_imperial');\n  hypeDocument.startTimelineNamed('predator_imperial', hypeDocument.kDirectionForward);\n}\n\nfunction pred_cyber() {\n  console.log('Playing pred_cyber');\n  hypeDocument.startTimelineNamed('predator_cyber', hypeDocument.kDirectionForward);\n}\n\nfunction pred_love() {\n  console.log('Playing pred_love');\n  hypeDocument.startTimelineNamed('predator_love', hypeDocument.kDirectionForward);\n}\n\nfunction setWhalePositions(array) {\n  console.log('check array', array);\n  array.whales.map((whale) => {\n    const el = whale.element || whales.find((obj) => obj.name === whale.name).element;\n    hypeDocument.setElementProperty(el, 'left', whale.left, 0.24, 'easeout');\n    hypeDocument.setElementProperty(el, 'top', whale.top, 0.24, 'easeout');\n    hypeDocument.setElementProperty(el, 'opacity', whale.opacity, 0.24, 'easeout');\n    hypeDocument.setElementProperty(el, 'rotateZ', 0, 0.24, 'easeout');\n    hypeDocument.setElementProperty(el, 'rotateY', 0, 0.24, 'easeout');\n    hypeDocument.setElementProperty(el, 'rotateX', 0, 0.24, 'easeout');\n  });\n}\n\nfunction raceWhalePositions(array) {\n  console.log('check array', array);\n  array.whales.map((whale) => {\n    const el = whale.element || whales.find((obj) => obj.name === whale.name).element;\n    hypeDocument.setElementProperty(el, 'left', whale.position, 0.24, 'easeout');\n  });\n}\n\n\n\nfunction getWhalePositions() {\n  document.getElementById('');\n}\n\nfunction clearVictoryMessage() {\n  hypeDocument.setElementProperty(hypeDocument.getElementById('victory'), 'opacity', 0);\n  hypeDocument.setElementProperty(hypeDocument.getElementById('victoryWhale'), 'opacity', 0);\n  hypeDocument.getElementById('victoryWhale').innerHTML = '';\n}\n\nfunction clearEvents() {\n  hypeDocument.pauseTimelineNamed('fleetLoop');\n  hypeDocument.pauseTimelineNamed('galactagasm');\n  hypeDocument.pauseTimelineNamed('tranzonic');\n\n  hypeDocument.setElementProperty(hypeDocument.getElementById('rectangle'), 'opacity', 0);\n\n  hypeDocument.setElementProperty(hypeDocument.getElementById('tranz1'), 'opacity', 0);\n  hypeDocument.setElementProperty(hypeDocument.getElementById('tranz2'), 'opacity', 0);\n  hypeDocument.setElementProperty(hypeDocument.getElementById('tranzBG'), 'opacity', 0);\n  hypeDocument.setElementProperty(hypeDocument.getElementById('tranzText'), 'opacity', 0);\n\n  hypeDocument.setElementProperty(hypeDocument.getElementById('gasm'), 'opacity', 0);\n\n  hypeDocument.setElementProperty(hypeDocument.getElementById('fleetAttackText'), 'opacity', 0);\n  hypeDocument.setElementProperty(hypeDocument.getElementById('fleetAttackBG'), 'opacity', 0);\n}\n\nconst whales = [{\n  name: \"imperial\",\n  element: hypeDocument.getElementById('imperialWhale')\n},\n{\n  name: \"cyber\",\n  element: hypeDocument.getElementById('cyberWhale')\n},\n{\n  name: \"predator\",\n  element: hypeDocument.getElementById('predatorWhale')\n},\n{\n  name: \"love\",\n  element: hypeDocument.getElementById('loveWhale')\n}];\n\ndocument.addEventListener(\"keydown\", function (e) {\n  console.log('event', e, e.which);\n\n  if (e.which === 32) {\n    pred_imperial();\n  }\n  if (e.which === 65) {\n    pred_cyber();\n  }\n  if (e.which === 83) {\n    pred_love();\n  }\n\n  if (e.which === 82) {\n    reset();\n  }\n});\n\nsocket.on('startRace', function (msg) {\n  clearVictoryMessage();\n  clearEvents();\n});\n\nsocket.on('whaleState', (msg) => {\n  console.log('Whale update', msg);\n  raceWhalePositions(msg);\n});\n\nsocket.on('newHeat', (msg) => {\n  reset();\n  clearVictoryMessage();\n  clearEvents();\n});\n\nsocket.on('loveBoost', (msg) => {\n\tconst boost = 'brightness('+ msg.boost * 100 +'%)';\n\tconsole.log('setting boost', boost);\n\tdocument.getElementById('loveWhale').style.filter = boost;\n});\n\nsocket.on('predator', (msg) => {\n  // set predator whale's target\n  // do a bunch of blood splashes\n  // have target whale turn belly-up and fall offscreen\n\n  // send a basic set of whale positions here\n  reset();\n  clearVictoryMessage();\n  clearEvents();\n  \n  // one of 'cyber' 'imperial' or 'love'\n  const timeline = `predator_${msg.target}`;\n  console.log('PREDATOR', timeline);\n  hypeDocument.startTimelineNamed(timeline, hypeDocument.kDirectionForward);\n});\n\nsocket.on('winner', (msg) => {\n  console.log('Winner', msg);\n\n  hypeDocument.pauseTimelineNamed('tranzonic');\n  hypeDocument.pauseTimelineNamed('galactagasm');\n  clearEvents();\n  \n  hypeDocument.getElementById('victoryWhale').innerHTML = msg.faction;\n  hypeDocument.startTimelineNamed('victory', hypeDocument.kDirectionForward);\n});\n\nsocket.on('adminEvent', (d) => {\n\tconsole.log('Admin event', d);\n});\n\nsocket.on('setBeacon', (d) => {\n\tconsole.log('Beacon', d);\n\tconst bl = hypeDocument.getElementById('blue');\n\tconst gr = hypeDocument.getElementById('green');\n\tconst rd = hypeDocument.getElementById('red');\n\t\n\tbl.style.display = d.blue ? \"block\" : \"none\";\n\tgr.style.display = d.green ? \"block\" : \"none\";\n\trd.style.display = d.red ? \"block\" : \"none\";\n});\n\n\nsocket.on('galactagasm', () => {\n\tclearVictoryMessage();\n\thypeDocument.startTimelineNamed('galactagasm', hypeDocument.kDirectionForward);\n    setTimeout(() => {\n      hypeDocument.pauseTimelineNamed('galactagasm');\n      clearEvents();\n    }, 15000);\t\n})\n\nsocket.on('tranzonicInterference', () => {\n\tclearVictoryMessage();\n    hypeDocument.startTimelineNamed('tranzonic', hypeDocument.kDirectionForward);\n    setTimeout(() => {\n      hypeDocument.pauseTimelineNamed('tranzonic');\n      clearEvents();\n    }, 15000);\n})\n\nsocket.on('fleetAttack', () => {\n\tclearVictoryMessage();\n    hypeDocument.startTimelineNamed('fleetAttack', hypeDocument.kDirectionForward);\n    hypeDocument.startTimelineNamed('fleetLoop', hypeDocument.kDirectionForward);\n\twhales.map((w) => {\n\t\tw.element.style.backgroundImage = \"url(index.hyperesources/splatter.svg)\";\n\t})\n})}",identifier:"10"},{name:"sendSocketMessage",source:"function(hypeDocument, element, event) {\tsocket.emit('message', 'helloWorld');\n\tconsole.log('emitted');\n}",identifier:"8"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_584(c,e,{"10":{p:1,n:"splatter.svg",g:"144",t:"image/svg+xml"},"2":{n:"AZSailorTattoo.ttf"},"-2":{n:"blank.gif"},"3":{n:"AZ%20Sailor%20Tattoo.otf"},"11":{p:1,n:"wiper.svg",g:"150",t:"image/svg+xml"},"4":{n:"AZSailorTattoo.eot"},"5":{p:1,n:"AZSailorTattoo.svg",g:"27",t:"image/svg+xml"},"12":{p:1,n:"bolt.svg",g:"184",t:"image/svg+xml"},"6":{p:1,n:"SketchBook90FA0702-DBC5-4648-A61F-8B57664C5276_2.png",g:"39",t:"@1x"},"7":{p:1,n:"SketchBookFC66D2B6-A0F5-4F72-A7E2-7F94A86054AF.png",g:"41",t:"@1x"},"-1":{n:"PIE.htc"},"0":{p:1,n:"IMG_0014.png",g:"11",t:"@1x"},"8":{p:1,n:"Untitled_4.png",g:"89",t:"@1x"},"1":{p:1,n:"Veil_Nebula_-_NGC6960.jpg",g:"14",t:"@1x"},"9":{p:1,n:"star.svg",g:"93",t:"image/svg+xml"}},h,["<style>\n    @font-face {\n        font-family: 'AZSailorTattoo', Arial, Helvetica;\n        src: url('index.hyperesources/AZSailorTattoo.eot?#iefix') format('embedded-opentype'),\n             url('index.hyperesources/AZSailorTattoo.woff') format('woff'),\n             url('index.hyperesources/AZSailorTattoo.ttf') format('truetype'),\n             url('index.hyperesources/AZSailorTattoo.svg#AZSailorTattoo') format('svg');\n             font-weight: normal;\n\t\t\t font-style: normal;\n    }\n</style>","<link href='https://fonts.googleapis.com/css?family=Miltonian+Tattoo&subset=latin' rel='stylesheet' type='text/css'>"],d,[{n:"SendMessage",o:"1",X:[0]}],[{o:"3",A:{a:[{p:4,h:"10"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#000000",L:[{a:[{}],B:"Custom"}],bY:1,d:1920,U:{},T:{"109":{i:"109",n:"fleetAttack",z:3,b:[],a:[{f:"f",y:0,z:3,i:"a",e:218,s:1678,o:"207"},{y:0,i:"e",s:0,z:0,o:"192",f:"c"},{y:0,i:"g",s:"#FF2600",z:0,o:"192",f:"c"},{y:0,i:"e",s:1,z:0,o:"207",f:"c"},{y:0,i:"e",s:0.59999999999999998,z:0,o:"199",f:"c"},{y:3,i:"a",s:218,z:0,o:"207",f:"c"}],f:30},"135":{f:30,z:5.15,i:"135",n:"predator_imperial",j:{"0":[[185,491,185,491,300,509,384,464],[384,464,438,435,507,351,492,291],[492,291,473,218,321,65,268,74],[268,74,193,86,181,496,181,496]]},a:[{f:"c",y:0,z:2,i:"f",e:-355,s:5,o:"206"},{o:"206",y:0,z:2,i:"b",e:403,a:"0",f:"c",s:398},{o:"206",y:0,z:2,i:"a",e:56,a:"0",f:"c",s:60},{f:"c",y:1.07,z:0.04,i:"e",e:1,s:0,o:"198"},{f:"c",y:1.09,z:0.27,i:"b",e:483,s:257,o:"205"},{f:"c",y:1.09,z:0.17,i:"a",e:216,s:60,o:"205"},{f:"c",y:1.11,z:0.14,i:"e",e:0,s:1,o:"198"},{f:"c",y:1.14,z:0.12,i:"f",e:-137,s:0,o:"205"},{f:"c",p:2,y:1.18,z:0,i:"ActionHandler",s:{a:[{b:"163",p:3,z:false,symbolOid:"2"}]},o:"135"},{y:1.25,i:"e",s:0,z:0,o:"198",f:"c"},{y:1.26,i:"a",s:216,z:0,o:"205",f:"c"},{y:1.26,i:"f",s:-137,z:0,o:"205",f:"c"},{y:2,i:"b",s:403,z:0,o:"206",f:"c"},{y:2,i:"a",s:56,z:0,o:"206",f:"c"},{y:2,i:"f",s:-355,z:0,o:"206",f:"c"},{y:2.06,i:"b",s:483,z:0,o:"205",f:"c"},{f:"c",y:3.22,z:1.23,i:"e",e:0.01,s:1,o:"205"},{y:5.15,i:"e",s:0.01,z:0,o:"205",f:"c"}],b:[]},"105":{i:"105",n:"tranzonic",z:2,b:[],a:[{y:0,i:"g",s:"#00F900",z:0,o:"192",f:"c"},{y:0,i:"e",s:0.5,z:0,o:"190",f:"c"},{f:"c",p:2,y:0,z:2,i:"ActionHandler",e:{a:[{b:"105",p:3,z:true,symbolOid:"2"}]},s:{a:[{b:"105",p:8,z:false,symbolOid:"2",J:true}]},o:"105"},{y:0,i:"e",s:1,z:0,o:"201",f:"c"},{f:"c",y:0,z:0.05,i:"e",e:1,s:0,o:"193"},{f:"c",y:0,z:0.03,i:"e",e:1,s:0,o:"208"},{f:"c",y:0,z:0.14,i:"e",e:0.39999999999999969,s:0,o:"192"},{f:"c",y:0.03,z:0.04,i:"e",e:0,s:1,o:"208"},{f:"c",y:0.05,z:0.05,i:"e",e:0,s:1,o:"193"},{f:"c",y:0.07,z:0.04,i:"e",e:1,s:0,o:"208"},{f:"c",y:0.1,z:0.1,i:"e",e:1,s:0,o:"193"},{f:"c",y:0.11,z:0.04,i:"e",e:0,s:1,o:"208"},{f:"c",y:0.14,z:0.15,i:"e",e:0,s:0.39999999999999969,o:"192"},{f:"c",y:0.15,z:0.15,i:"e",e:0,s:0,o:"208"},{f:"c",y:0.2,z:0.1,i:"e",e:0,s:1,o:"193"},{f:"c",y:0.29,z:0.14,i:"e",e:0.39999999999999969,s:0,o:"192"},{f:"c",y:1,z:0.26,i:"e",e:1,s:0,o:"193"},{f:"c",y:1,z:0.06,i:"e",e:1,s:0,o:"208"},{f:"c",y:1.06,z:0.24,i:"e",e:0,s:1,o:"208"},{f:"c",y:1.13,z:0.09,i:"e",e:0,s:0.39999999999999969,o:"192"},{f:"c",y:1.22,z:0.08,i:"e",e:0.39999999999999969,s:0,o:"192"},{f:"c",y:1.26,z:0.04,i:"e",e:0,s:1,o:"193"},{f:"c",p:2,y:2,z:0,i:"ActionHandler",s:{a:[{b:"105",p:3,z:true,symbolOid:"2"}]},o:"105"},{y:2,i:"e",s:0.39999999999999969,z:0,o:"192",f:"c"},{y:2,i:"e",s:0,z:0,o:"193",f:"c"},{y:2,i:"e",s:0,z:0,o:"208",f:"c"}],f:30},"134":{i:"134",n:"fleetLoop",z:0.25,b:[],a:[{f:"c",y:0,z:0.16,i:"e",e:0,s:0.40000000000000002,o:"192"},{y:0,i:"g",s:"#FF2600",z:0,o:"192",f:"c"},{f:"c",p:2,y:0,z:0.25,i:"ActionHandler",e:{a:[{b:"134",p:3,z:false,symbolOid:"2"}]},s:{a:[{b:"134",p:8,z:false,symbolOid:"2",J:true}]},o:"134"},{f:"c",y:0.16,z:0.09,i:"e",e:0.40000000000000002,s:0,o:"192"},{f:"c",p:2,y:0.25,z:0,i:"ActionHandler",s:{a:[{b:"134",p:3,z:false,symbolOid:"2"}]},o:"134"},{y:0.25,i:"e",s:0.40000000000000002,z:0,o:"192",f:"c"}],f:30},"92":{i:"92",n:"victory",z:0.25,b:[],a:[{f:"c",y:0,z:0.24,i:"e",e:-1,s:0,o:"204"},{f:"c",y:0,z:0.24,i:"e",e:-1,s:0,o:"195"},{f:"c",y:0.24,z:0.01,i:"e",e:1,s:-1,o:"204"},{f:"c",y:0.24,z:0.01,i:"e",e:1,s:-1,o:"195"},{f:"c",p:2,y:0.25,z:0,i:"ActionHandler",s:{a:[{}]},o:"92"},{y:0.25,i:"e",s:1,z:0,o:"204",f:"c"},{y:0.25,i:"e",s:1,z:0,o:"195",f:"c"}],f:30},"163":{f:30,z:4,i:"163",n:"wiper",j:{"1":[[2472,337,2472,337,1197,208,641,382],[641,382,96,552,-597,903,-597,903]]},a:[{f:"c",y:0,z:0.03,i:"cY",e:"0",s:"1",o:"191"},{y:0.03,i:"cY",s:"0",z:0,o:"191",f:"c"},{y:0.06,i:"cY",s:"0",z:0,o:"194",f:"a"},{o:"203",y:1.07,z:2.23,i:"b",e:615,a:"1",f:"c",s:49},{o:"203",y:1.07,z:2.23,i:"a",e:-1237,a:"1",f:"c",s:1832},{f:"c",y:2.12,z:0.26,i:"b",e:700,s:236,o:"194"},{f:"c",y:2.12,z:0.26,i:"a",e:-1184,s:160,o:"194"},{f:"c",y:2.21,z:0.17,i:"a",e:-1062,s:-138,o:"191"},{f:"c",y:2.21,z:0.17,i:"b",e:754,s:468,o:"191"},{y:3.08,i:"b",s:700,z:0,o:"194",f:"c"},{y:3.08,i:"a",s:-1184,z:0,o:"194",f:"c"},{y:3.08,i:"a",s:-1062,z:0,o:"191",f:"c"},{y:3.08,i:"b",s:754,z:0,o:"191",f:"c"},{y:4,i:"a",s:-1237,z:0,o:"203",f:"c"},{y:4,i:"b",s:615,z:0,o:"203",f:"c"}],b:[]},"170":{f:30,z:4,i:"170",n:"predator_cyber",j:{"2":[[185,491,185,491,318,501,410,547],[410,547,473,578,484,683,484,683]],"3":[[484,683,484,683,445,778,379,804],[379,804,306,833,207,793,207,793]],"4":[[207,793,207,793,185,493,185,493]]},a:[{o:"206",y:0,z:1,i:"b",e:590,a:"2",f:"c",s:398},{o:"206",y:0,z:1,i:"a",e:359,a:"2",f:"c",s:60},{f:"c",y:0,z:0.14,i:"f",e:34,s:5,o:"206"},{f:"c",y:0.14,z:0.13,i:"f",e:124,s:34,o:"206"},{f:"c",y:0.27,z:0.1,i:"f",e:174,s:124,o:"206"},{o:"206",y:1,z:0.13,i:"a",e:82,a:"3",f:"c",s:359},{o:"206",y:1,z:0.13,i:"b",e:700,a:"3",f:"c",s:590},{f:"c",y:1.07,z:0.06,i:"e",e:1,s:0,o:"198"},{f:"c",y:1.07,z:0.03,i:"f",e:220,s:174,o:"206"},{f:"c",y:1.1,z:0.03,i:"f",e:-180,s:0,o:"197"},{f:"c",y:1.1,z:0.07,i:"f",e:297,s:220,o:"206"},{f:"c",y:1.13,z:0.04,i:"e",e:0,s:1,o:"198"},{o:"206",y:1.13,z:0.08,i:"b",e:400,a:"4",f:"c",s:700},{o:"206",y:1.13,z:0.08,i:"a",e:60,a:"4",f:"c",s:82},{f:"c",y:1.13,z:0.04,i:"f",e:-225,s:-180,o:"197"},{f:"c",p:2,y:1.17,z:0,i:"ActionHandler",s:{a:[{b:"163",p:3,z:false,symbolOid:"2"}]},o:"170"},{y:1.17,i:"e",s:0,z:0,o:"198",f:"c"},{f:"c",y:1.17,z:0.06,i:"f",e:0,s:-225,o:"197"},{f:"c",y:1.17,z:0.06,i:"f",e:365,s:297,o:"206"},{f:"c",y:1.19,z:2.11,i:"e",e:0.01,s:1,o:"197"},{y:1.21,i:"a",s:60,z:0,o:"206",f:"c"},{y:1.21,i:"b",s:400,z:0,o:"206",f:"c"},{f:"c",y:1.23,z:0.03,i:"f",e:-180,s:0,o:"197"},{y:1.23,i:"f",s:365,z:0,o:"206",f:"c"},{f:"c",y:1.26,z:0.04,i:"f",e:-225,s:-180,o:"197"},{f:"c",y:2,z:0.05,i:"f",e:0,s:-225,o:"197"},{f:"c",y:2.05,z:0.03,i:"f",e:-180,s:0,o:"197"},{f:"c",y:2.08,z:0.04,i:"f",e:-225,s:-180,o:"197"},{y:2.12,i:"f",s:-225,z:0,o:"197",f:"c"},{y:4,i:"e",s:0.01,z:0,o:"197",f:"c"}],b:[]},kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:1,b:[],a:[{f:"c",y:0,z:0.15,i:"e",e:0.40000000000000002,s:1,o:"210"},{f:"c",y:0,z:0.15,i:"e",e:0.42236946202531644,s:1,o:"212"},{f:"c",y:0,z:0.11,i:"e",e:1,s:0.41999999999999998,o:"211"},{f:"c",y:0,z:0.21,i:"e",e:0.42236946202531639,s:1,o:"213"},{f:"c",y:0,z:0.11,i:"e",e:1,s:0.41999999999999998,o:"214"},{f:"c",y:0.11,z:0.19,i:"e",e:0.41376582278481011,s:1,o:"211"},{f:"c",y:0.11,z:0.19,i:"e",e:0.41376582278481011,s:1,o:"214"},{f:"c",y:0.15,z:0.15,i:"e",e:1,s:0.40000000000000002,o:"210"},{f:"c",y:0.15,z:0.15,i:"e",e:1,s:0.42236946202531644,o:"212"},{f:"c",y:0.21,z:0.09,i:"e",e:1,s:0.42236946202531639,o:"213"},{f:"c",p:2,y:1,z:0,i:"ActionHandler",s:{a:[{b:"kTimelineDefaultIdentifier",p:3,z:false,symbolOid:"2"}]},o:"kTimelineDefaultIdentifier"},{y:1,i:"e",s:1,z:0,o:"213",f:"c"},{y:1,i:"e",s:1,z:0,o:"212",f:"c"},{y:1,i:"e",s:1,z:0,o:"210",f:"c"},{y:1,i:"e",s:0.41376582278481011,z:0,o:"211",f:"c"},{y:1,i:"e",s:0.41376582278481011,z:0,o:"214",f:"c"}],f:30},"103":{i:"103",n:"galactagasm",z:1,b:[],a:[{f:"c",y:0,z:0.14,i:"e",e:0.69999999999999996,s:0.34999999999999998,o:"192"},{y:0,i:"g",s:"#FF40FF",z:0,o:"192",f:"c"},{f:"c",p:2,y:0,z:1,i:"ActionHandler",e:{a:[{b:"103",p:3,z:false,symbolOid:"2"}]},s:{a:[{b:"103",p:8,z:false,symbolOid:"2",J:true}]},o:"103"},{f:"c",y:0,z:0.23,i:"e",e:0,s:1,o:"209"},{f:"c",y:0.14,z:0.16,i:"e",e:0.34999999999999998,s:0.69999999999999996,o:"192"},{f:"c",y:0.23,z:0.07,i:"e",e:1,s:0,o:"209"},{f:"c",p:2,y:1,z:0,i:"ActionHandler",s:{a:[{b:"103",p:3,z:false,symbolOid:"2"}]},o:"103"},{y:1,i:"e",s:0.34999999999999998,z:0,o:"192",f:"c"},{y:1,i:"e",s:1,z:0,o:"209",f:"c"}],f:30},"171":{f:30,z:6,i:"171",n:"predator_love",j:{"5":[[185,491,185,491,371,579,464,644],[464,644,497,667,511,719,511,719]],"6":[[511,719,511,719,510,834,459,902],[459,902,389,995,263,1048,263,1048]],"7":[[263,1048,263,1048,169,1051,159,1022],[159,1022,134,948,185,495,185,495]]},a:[{o:"206",y:0,z:1,i:"b",e:626,a:"5",f:"c",s:398},{o:"206",y:0,z:1,i:"a",e:386,a:"5",f:"c",s:60},{f:"c",y:0.2,z:0.15,i:"f",e:125,s:5,o:"206"},{o:"206",y:1,z:0.16,i:"b",e:955,a:"6",f:"c",s:626},{o:"206",y:1,z:0.16,i:"a",e:138,a:"6",f:"c",s:386},{f:"c",y:1.05,z:0.09,i:"f",e:227,s:125,o:"206"},{f:"c",y:1.14,z:0.13,i:"f",e:264,s:227,o:"206"},{o:"206",y:1.16,z:0.14,i:"b",e:402,a:"7",f:"c",s:955},{o:"206",y:1.16,z:0.14,i:"a",e:60,a:"7",f:"c",s:138},{f:"c",y:1.2,z:0.04,i:"e",e:1,s:0,o:"198"},{f:"c",y:1.2,z:0.04,i:"f",e:158,s:0,o:"200"},{f:"c",y:1.24,z:0.05,i:"e",e:0,s:1,o:"198"},{f:"c",y:1.24,z:0.03,i:"f",e:360,s:158,o:"200"},{f:"c",p:2,y:1.25,z:0,i:"ActionHandler",s:{a:[{b:"163",p:3,z:false,symbolOid:"2"}]},o:"171"},{f:"c",y:1.27,z:0,i:"f",e:0,s:360,o:"200"},{f:"c",y:1.27,z:0.05,i:"f",e:360,s:264,o:"206"},{f:"c",y:1.27,z:0.04,i:"f",e:158,s:0,o:"200"},{y:1.29,i:"e",s:0,z:0,o:"198",f:"c"},{y:2,i:"a",s:60,z:0,o:"206",f:"c"},{y:2,i:"b",s:402,z:0,o:"206",f:"c"},{f:"c",y:2.01,z:0.03,i:"f",e:360,s:158,o:"200"},{y:2.02,i:"f",s:360,z:0,o:"206",f:"c"},{f:"c",y:2.04,z:0,i:"f",e:0,s:360,o:"200"},{f:"c",y:2.04,z:0.04,i:"f",e:158,s:0,o:"200"},{y:2.08,i:"f",s:158,z:0,o:"200",f:"c"},{f:"c",y:2.15,z:3.15,i:"e",e:0,s:1,o:"200"},{y:6,i:"e",s:0,z:0,o:"200",f:"c"}],b:[]}},bZ:180,O:["202","192","198","214","211","212","213","210","196","203","195","194","205","208","193","206","204","191","209","197","199","207","190","201","200"],n:"MainRace","_":0,v:{"200":{bJ:1,p:"no-repeat",c:250,q:"100% 100%",bS:86,d:125,r:"inline",e:1,f:0,BDbL:0,h:"41",BDbJ:1,i:"loveWhale",j:"absolute",x:"visible",k:"div",dB:"img",z:14,a:60,b:808},"194":{bI:1.3787574768066411,h:"144",w:"",x:"visible",a:160,q:"100% 100%",b:236,j:"absolute",cY:"1",z:21,dB:"img",k:"div",d:775,bS:82,BDbI:1,p:"no-repeat",c:1534,r:"inline"},"213":{c:34,d:34,I:"Solid",cY:"1",e:1,J:"Solid",bL:1.1520965189873418,K:"Solid",BDbL:4.7409018987341769,g:"#2EAFED",L:"Solid",M:4,i:"blue",N:4,aI:"50%",A:"#2AE1E4",O:4,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#2AE1E4",z:10,B:"#2AE1E4",D:"#2AE1E4",aK:"50%",P:4,a:134,aL:"50%",b:10},"205":{bJ:1,b:257,p:"no-repeat",q:"100% 100%",bS:86,d:125,c:250,r:"inline",e:1,f:0,aG:"A cartoonish blue sperm whale",BDbL:0,h:"11",v:"bold",BDbJ:1,w:"",i:"imperialWhale",j:"absolute",x:"visible",k:"div",dB:"img",z:6,bH:0,tX:0,bI:1.5448970794677734,a:60,tY:0},"199":{c:1923,bS:63,d:197,I:"None",e:0,J:"None",K:"None",g:"rgba(255, 38, 0, 0.450)",L:"None",M:0,i:"fleetAttackBG",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:29,P:0,D:"#D8DDE4",a:-4,b:669},"190":{c:1918,bS:63,d:198,I:"None",e:0,J:"None",K:"None",g:"#003600",L:"None",M:0,i:"tranzBG",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:34,P:0,D:"#D8DDE4",a:1,b:684},"201":{G:"#FFFC79",aU:8,c:1325,bS:151,d:122,aV:8,r:"inline",e:0,s:"Chalkduster,Papyrus,fantasy",t:96,Z:"break-word",i:"tranzText",w:"Tranzonic Interference!",j:"absolute",x:"visible",k:"div",y:"preserve",z:35,aS:8,aT:8,a:168,b:714},"195":{G:"#FFFB00",aU:8,c:1342,bS:45,d:343,aV:8,cY:"0",e:0,s:"'Miltonian Tattoo'",r:"inline",f:0,t:288,BDbL:0,u:"normal",Z:"break-word",v:"normal",BDbJ:1,w:"WINNER!<br>",i:"victory",j:"absolute",x:"visible",k:"div",y:"preserve",z:27,aS:8,aT:8,a:366,b:102},"214":{c:34,d:34,I:"Solid",cY:"1",e:0.41999999999999998,J:"Solid",bL:1.972903481012658,K:"Solid",g:"#ED1500",L:"Solid",M:4,N:4,aI:"50%",A:"#FF4C38",O:4,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#FF4C38",z:8,B:"#FF4C38",D:"#FF4C38",aK:"50%",P:4,a:30,aL:"50%",b:10},"206":{b:398,p:"no-repeat",c:250,q:"100% 100%",bS:86,d:186,r:"inline",cQ:1,f:5,BDbL:0,cR:1,h:"89",BDbJ:1,i:"predatorWhale",j:"absolute",x:"visible",k:"div",dB:"img",z:15,bH:120,tX:0.5,a:60,tY:0.5},"191":{bI:1.3787574768066411,h:"144",w:"",x:"visible",a:-138,q:"100% 100%",b:468,j:"absolute",cY:"1",z:22,dB:"img",k:"div",d:642,bS:82,BDbI:1,p:"no-repeat",c:1280,r:"inline"},"210":{h:"184",p:"no-repeat",x:"visible",a:1792,bJ:1.0619066455696202,b:31,q:"100% 100%",j:"absolute",z:38,dB:"img",k:"div",d:1019,bS:123,i:"bolt",bL:0.5,e:1,c:21,Y:0,r:"inline"},"202":{cN:"none",w:"",h:"14",p:"no-repeat",x:"visible",a:-162,q:"100% 100%",b:-5,j:"absolute",dB:"img",z:1,k:"div",bS:63,d:1095,c:2665,r:"inline",e:0.75,aP:"auto"},"196":{G:"#FFD479",aU:8,c:192,bS:33,d:70,aV:8,r:"inline",s:"'Miltonian Tattoo'",t:48,BDbL:0,Z:"break-word",BDbJ:1,w:"<div style=\"text-align: right;\"><br></div>",i:"gameTimer",j:"absolute",x:"visible",k:"div",y:"preserve",z:37,aS:8,aT:8,a:1532,b:49},"207":{G:"#FFFFFF",aU:8,c:1124,bS:151,d:163,aV:8,r:"inline",e:0,s:"'Courier New',Courier,Monospace",t:144,Z:"break-word",i:"fleetAttackText",w:"FLEET ATTACK!",j:"absolute",x:"visible",k:"div",y:"preserve",z:30,aS:8,aT:8,a:290,b:666},"192":{b:0,z:17,K:"None",c:1920,L:"None",d:1080,M:0,e:0,N:0,bS:63,O:0,g:"#FF40FF",P:0,BDbL:0,i:"rectangle",BDbH:50,j:"absolute",k:"div",bH:0,bI:0.9858583450317383,bJ:0.80735759493670889,A:"#FF40FF",B:"#FF40FF",r:"inline",bL:0,cY:"0",C:"#FF40FF",D:"#FF40FF",t:96,BDbJ:1,w:"",x:"visible",I:"None",a:0,J:"None"},"211":{c:34,d:34,I:"Solid",cY:"1",e:0.41999999999999998,J:"Solid",bL:1.9729034810126582,K:"Solid",g:"#ED1500",L:"Solid",M:4,i:"red",N:4,aI:"50%",A:"#FF4C38",O:4,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#FF4C38",z:7,B:"#FF4C38",D:"#FF4C38",aK:"50%",P:4,a:30,aL:"50%",b:10},"203":{h:"150",p:"no-repeat",x:"visible",tY:0.5,q:"100% 100%",b:49,a:1832,cY:"0",z:24,dB:"img",j:"absolute",d:576,k:"div",bS:82,c:1280,r:"inline",f:60,tX:0.5},"197":{p:"no-repeat",c:250,q:"100% 100%",bS:86,d:125,r:"inline",e:1,f:0,BDbL:0,h:"39",BDbJ:1,w:"",i:"cyberWhale",j:"absolute",x:"visible",k:"div",dB:"img",z:13,a:60,b:629},"208":{G:"#FFFB00",aU:8,c:849,bS:182,d:171,aV:8,r:"inline",e:0,s:"Chalkduster,Papyrus,fantasy",f:20,t:144,Z:"break-word",i:"tranz1",w:"BzZzzzT!!!",j:"absolute",x:"visible",k:"div",y:"preserve",z:33,aS:8,aT:8,a:238,b:279},"193":{bJ:1,aU:8,G:"#FFFB00",c:973,bS:54,d:341,aV:8,r:"inline",e:0,s:"Chalkduster,Papyrus,fantasy",f:323,t:288,Z:"break-word",BDbJ:0.95411392405063289,w:"BZZT!",i:"tranz2",j:"absolute",x:"visible",k:"div",y:"preserve",z:32,aS:8,aT:8,a:601,b:353},"212":{c:34,d:34,I:"Solid",cY:"1",e:1,J:"Solid",bL:1.2856012658227847,K:"Solid",BDbL:0,g:"#00B622",L:"Solid",M:4,i:"green",N:4,aI:"50%",A:"#5BE462",O:4,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#5BE462",z:9,B:"#5BE462",D:"#5BE462",aK:"50%",P:4,a:82,aL:"50%",b:10},"204":{G:"#FFFB00",aU:8,c:982,bS:45,d:177,aV:8,cY:"0",e:0,s:"'Miltonian Tattoo'",r:"inline",t:96,BDbL:0,Z:"break-word",BDbJ:1,w:"<br>",i:"victoryWhale",j:"absolute",x:"visible",k:"div",y:"preserve",z:28,aS:8,aT:8,a:490,F:"center",b:463},"198":{bJ:0.80735759493670889,c:1920,d:1080,I:"None",cY:"0",e:0,J:"None",bL:0,K:"None",BDbL:0,g:"#D70806",L:"None",t:96,M:0,BDbJ:1,w:"",N:0,A:"#FF40FF",O:0,x:"visible",j:"absolute",BDbH:50,k:"div",C:"#FF40FF",z:18,bH:0,D:"#FF40FF",B:"#FF40FF",P:0,bI:0.9858583450317383,a:10,b:10},"209":{b:540,z:36,BDbK:1,c:1903,d:201,BDbG:0,aS:8,e:0,aT:8,bS:151,aU:8,BDbL:0,i:"gasm",aV:8,BDbH:0,j:"absolute",bG:0,k:"div",bH:0,bI:1,bJ:1,BDbI:1,bK:1,Z:"break-word",r:"inline",bL:0,s:"Futura,Verdana,sans-serif",t:144,BDbJ:1,F:"center",G:"#FFFFFF",w:"\ud83d\udc9e\ud83d\udc96GALACTAGASM\ud83d\udc96\ud83d\udc9e",x:"visible",a:1,y:"preserve"}}}],{},g,{f:[[0,0,0.1971,0,0.3391,0.8944,0.3636,1],[0.3636,1,0.3636,1,0.4425,0.75,0.5455,0.75],[0.5455,0.75,0.6519,0.75,0.7273,1,0.7273,1],[0.7273,1,0.7273,1,0.7718,0.9375,0.8182,0.9375],[0.8182,0.9375,0.8646,0.9375,0.9091,1,0.9091,1],[0.9091,1,0.9091,1,0.9294,0.9844,0.9546,0.9844],[0.9546,0.9844,0.9798,0.9844,1,1,1,1]]},
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
