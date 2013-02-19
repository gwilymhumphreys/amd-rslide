var requirejs,require,define;(function(global){function isFunction(a){return ostring.call(a)==="[object Function]"}function isArray(a){return ostring.call(a)==="[object Array]"}function each(a,b){if(a){var c;for(c=0;c<a.length;c+=1)if(a[c]&&b(a[c],c,a))break}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1;c-=1)if(a[c]&&b(a[c],c,a))break}}function hasProp(a,b){return hasOwn.call(a,b)}function eachProp(a,b){var c;for(c in a)if(a.hasOwnProperty(c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){if(c||!hasProp(a,e))d&&typeof b!="string"?(a[e]||(a[e]={}),mixin(a[e],b,c,d)):a[e]=b}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeContextModuleFunc(a,b,c){return function(){var d=aps.call(arguments,0),e;return c&&isFunction(e=d[d.length-1])&&(e.__requireJsBuild=!0),d.push(b),a.apply(null,d)}}function addRequireMethods(a,b,c){each([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(d){var e=d[1]||d[0];a[d[0]]=b?makeContextModuleFunc(b[e],c):function(){var a=contexts[defContextName];return a[e].apply(a,arguments)}})}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function p(a){var b,c;for(b=0;a[b];b+=1){c=a[b];if(c===".")a.splice(b,1),b-=1;else if(c===".."){if(b===1&&(a[2]===".."||a[0]===".."))break;b>0&&(a.splice(b-1,2),b-=2)}}}function q(a,b,c){var d,e,f,h,i,j,k,l,m,n,o,q=b&&b.split("/"),r=q,s=g.map,t=s&&s["*"];a&&a.charAt(0)==="."&&(b?(g.pkgs[b]?r=q=[b]:r=q.slice(0,q.length-1),a=r.concat(a.split("/")),p(a),e=g.pkgs[d=a[0]],a=a.join("/"),e&&a===d+"/"+e.main&&(a=d)):a.indexOf("./")===0&&(a=a.substring(2)));if(c&&(q||t)&&s){h=a.split("/");for(i=h.length;i>0;i-=1){k=h.slice(0,i).join("/");if(q)for(j=q.length;j>0;j-=1){f=s[q.slice(0,j).join("/")];if(f){f=f[k];if(f){l=f,m=i;break}}}if(l)break;!n&&t&&t[k]&&(n=t[k],o=i)}!l&&n&&(l=n,m=o),l&&(h.splice(0,m,l),a=h.join("/"))}return a}function r(a){isBrowser&&each(scripts(),function(b){if(b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===d.contextName)return b.parentNode.removeChild(b),!0})}function s(a){var b=g.paths[a];if(b&&isArray(b)&&b.length>1)return r(a),b.shift(),d.undef(a),d.require([a]),!0}function t(a,b,c,e){var f,g,h,i=a?a.indexOf("!"):-1,j=null,l=b?b.name:null,o=a,p=!0,r="";return a||(p=!1,a="_@r"+(m+=1)),i!==-1&&(j=a.substring(0,i),a=a.substring(i+1,a.length)),j&&(j=q(j,l,e),g=k[j]),a&&(j?g&&g.normalize?r=g.normalize(a,function(a){return q(a,l,e)}):r=q(a,l,e):(r=q(a,l,e),f=d.nameToUrl(r))),h=j&&!g&&!c?"_unnormalized"+(n+=1):"",{prefix:j,name:r,parentMap:b,unnormalized:!!h,url:f,originalName:o,isDefine:p,id:(j?j+"!"+r:r)+h}}function u(a){var b=a.id,c=h[b];return c||(c=h[b]=new d.Module(a)),c}function v(a,b,c){var d=a.id,e=h[d];hasProp(k,d)&&(!e||e.defineEmitComplete)?b==="defined"&&c(k[d]):u(a).on(b,c)}function w(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=h[b];c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function x(){globalDefQueue.length&&(apsp.apply(j,[j.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function y(a,b,c){var e=a&&a.map,f=makeContextModuleFunc(c||d.require,e,b);return addRequireMethods(f,d,e),f.isBrowser=isBrowser,f}function z(a){delete h[a],each(o,function(b,c){if(b.map.id===a)return o.splice(c,1),b.defined||(d.waitCount-=1),!0})}function A(a,b){var c=a.map.id,d=a.depMaps,e;if(!a.inited)return;return b[c]?a:(b[c]=!0,each(d,function(a){var d=a.id,f=h[d];if(!f)return;return!f.inited||!f.enabled?(e=null,delete b[c],!0):e=A(f,mixin({},b))}),e)}function B(a,b,c){var d=a.map.id,f=a.depMaps;if(!a.inited||!a.map.isDefine)return;return b[d]?k[d]:(b[d]=a,each(f,function(f){var g=f.id,i=h[g],j;if(e[g])return;if(i){if(!i.inited||!i.enabled){c[d]=!0;return}j=B(i,b,c),c[g]||a.defineDepById(g,j)}}),a.check(!0),k[d])}function C(a){a.check()}function D(){var a,c,e,i,j=g.waitSeconds*1e3,k=j&&d.startTime+j<(new Date).getTime(),l=[],m=!1,n=!0;if(b)return;b=!0,eachProp(h,function(b){a=b.map,c=a.id;if(!b.enabled)return;if(!b.error)if(!b.inited&&k)s(c)?(i=!0,m=!0):(l.push(c),r(c));else if(!b.inited&&b.fetched&&a.isDefine){m=!0;if(!a.prefix)return n=!1}});if(k&&l.length)return e=makeError("timeout","Load timeout for modules: "+l,null,l),e.contextName=d.contextName,w(e);n&&(each(o,function(a){if(a.defined)return;var b=A(a,{}),c={};b&&(B(b,c,{}),eachProp(c,C))}),eachProp(h,C)),(!k||i)&&m&&(isBrowser||isWebWorker)&&!f&&(f=setTimeout(function(){f=0,D()},50)),b=!1}function E(a){u(t(a[0],null,!0)).init(a[1],a[2])}function F(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function G(a){var b=a.currentTarget||a.srcElement;return F(b,d.onScriptLoad,"load","onreadystatechange"),F(b,d.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}var b,c,d,e,f,g={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},h={},i={},j=[],k={},l={},m=1,n=1,o=[];return e={require:function(a){return y(a)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports=k[a.map.id]={}},module:function(a){return a.module={id:a.map.id,uri:a.map.url,config:function(){return g.config&&g.config[a.map.id]||{}},exports:k[a.map.id]}}},c=function(a){this.events=i[a.id]||{},this.map=a,this.shim=g.shim[a.id],this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},c.prototype={init:function(a,b,c,d){d=d||{};if(this.inited)return;this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.depMaps.rjsSkipMap=a.rjsSkipMap,this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check()},defineDepById:function(a,b){var c;return each(this.depMaps,function(b,d){if(b.id===a)return c=d,!0}),this.defineDep(c,b)},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(this.fetched)return;this.fetched=!0,d.startTime=(new Date).getTime();var a=this.map;if(!this.shim)return a.prefix?this.callPlugin():this.load();y(this,!0)(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()}))},load:function(){var a=this.map.url;l[a]||(l[a]=!0,d.load(this.map.id,a))},check:function(a){if(!this.enabled||this.enabling)return;var b,c,e=this.map.id,f=this.depExports,g=this.exports,i=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(isFunction(i)){if(this.events.error)try{g=d.execCb(e,i,f,g)}catch(j){b=j}else g=d.execCb(e,i,f,g);this.map.isDefine&&(c=this.module,c&&c.exports!==undefined&&c.exports!==this.exports?g=c.exports:g===undefined&&this.usingExports&&(g=this.exports));if(b)return b.requireMap=this.map,b.requireModules=[this.map.id],b.requireType="define",w(this.error=b)}else g=i;this.exports=g,this.map.isDefine&&!this.ignore&&(k[e]=g,req.onResourceLoad&&req.onResourceLoad(d,this.map,this.depMaps)),delete h[e],this.defined=!0,d.waitCount-=1,d.waitCount===0&&(o=[])}this.defining=!1,a||this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}},callPlugin:function(){var a=this.map,b=a.id,c=t(a.prefix,null,!1,!0);v(c,"defined",bind(this,function(c){var e,f,i,j=this.map.name,k=this.map.parentMap?this.map.parentMap.name:null;if(this.map.unnormalized){c.normalize&&(j=c.normalize(j,function(a){return q(a,k,!0)})||""),f=t(a.prefix+"!"+j,this.map.parentMap,!1,!0),v(f,"defined",bind(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),i=h[f.id],i&&(this.events.error&&i.on("error",bind(this,function(a){this.emit("error",a)})),i.enable());return}e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(h,function(a){a.map.id.indexOf(b+"_unnormalized")===0&&z(a.map.id)}),w(a)}),e.fromText=function(a,b){var c=useInteractive;c&&(useInteractive=!1),u(t(a)),req.exec(b),c&&(useInteractive=!0),d.completeLoad(a)},c.load(a.name,y(a.parentMap,!0,function(a,b,c){return a.rjsSkipMap=!0,d.require(a,b,c)}),e,g)})),d.enable(c,this),this.pluginMaps[c.id]=c},enable:function(){this.enabled=!0,this.waitPushed||(o.push(this),d.waitCount+=1,this.waitPushed=!0),this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,f,g;if(typeof a=="string"){a=t(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.depMaps.rjsSkipMap),this.depMaps[b]=a,g=e[a.id];if(g){this.depExports[b]=g(this);return}this.depCount+=1,v(a,"defined",bind(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&v(a,"error",this.errback)}c=a.id,f=h[c],!e[c]&&f&&!f.enabled&&d.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=h[a.id];b&&!b.enabled&&d.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),a==="error"&&delete this.events[a]}},d={config:g,contextName:a,registry:h,defined:k,urlFetched:l,waitCount:0,defQueue:j,Module:c,makeModuleMap:t,configure:function(a){a.baseUrl&&a.baseUrl.charAt(a.baseUrl.length-1)!=="/"&&(a.baseUrl+="/");var b=g.pkgs,c=g.shim,e=g.paths,f=g.map;mixin(g,a,!0),g.paths=mixin(e,a.paths,!0),a.map&&(g.map=mixin(f||{},a.map,!0,!0)),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),a.exports&&!a.exports.__buildReady&&(a.exports=d.makeShimExports(a.exports)),c[b]=a}),g.shim=c),a.packages&&(each(a.packages,function(a){var c;a=typeof a=="string"?{name:a}:a,c=a.location,b[a.name]={name:a.name,location:c||a.name,main:(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),g.pkgs=b),eachProp(h,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=t(b))}),(a.deps||a.callback)&&d.require(a.deps||[],a.callback)},makeShimExports:function(a){var b;return typeof a=="string"?(b=function(){return getGlobal(a)},b.exports=a,b):function(){return a.apply(global,arguments)}},requireDefined:function(a,b){return hasProp(k,t(a,b,!1,!0).id)},requireSpecified:function(a,b){return a=t(a,b,!1,!0).id,hasProp(k,a)||hasProp(h,a)},require:function(b,c,e,f){var g,h,i,l,m;if(typeof b=="string")return isFunction(c)?w(makeError("requireargs","Invalid require call"),e):req.get?req.get(d,b,c):(g=b,f=c,i=t(g,f,!1,!0),h=i.id,hasProp(k,h)?k[h]:w(makeError("notloaded",'Module name "'+h+'" has not been loaded yet for context: '+a)));e&&!isFunction(e)&&(f=e,e=undefined),c&&!isFunction(c)&&(f=c,c=undefined),x();while(j.length){m=j.shift();if(m[0]===null)return w(makeError("mismatch","Mismatched anonymous define() module: "+m[m.length-1]));E(m)}return l=u(t(null,f)),l.init(b,c,e,{enabled:!0}),D(),d.require},undef:function(a){x();var b=t(a,null,!0),c=h[a];delete k[a],delete l[b.url],delete i[a],c&&(c.events.defined&&(i[a]=c.events),z(a))},enable:function(a,b){var c=h[a.id];c&&u(a).enable()},completeLoad:function(a){var b,c,d,e=g.shim[a]||{},f=e.exports&&e.exports.exports;x();while(j.length){c=j.shift();if(c[0]===null){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}d=h[a];if(!b&&!k[a]&&d&&!d.inited){if(g.enforceDefine&&(!f||!getGlobal(f))){if(s(a))return;return w(makeError("nodefine","No define call for "+a,null,[a]))}E([a,e.deps||[],e.exports])}D()},toUrl:function(a,b){var c=a.lastIndexOf("."),e=null;return c!==-1&&(e=a.substring(c,a.length),a=a.substring(0,c)),d.nameToUrl(q(a,b&&b.id,!0),e)},nameToUrl:function(a,b){var c,d,e,f,h,i,j,k,l;if(req.jsExtRegExp.test(a))k=a+(b||"");else{c=g.paths,d=g.pkgs,h=a.split("/");for(i=h.length;i>0;i-=1){j=h.slice(0,i).join("/"),e=d[j],l=c[j];if(l){isArray(l)&&(l=l[0]),h.splice(0,i,l);break}if(e){a===e.name?f=e.location+"/"+e.main:f=e.location,h.splice(0,i,f);break}}k=h.join("/"),k+=b||(/\?/.test(k)?"":".js"),k=(k.charAt(0)==="/"||k.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+k}return g.urlArgs?k+((k.indexOf("?")===-1?"?":"&")+g.urlArgs):k},load:function(a,b){req.load(d,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if(a.type==="load"||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=G(a);d.completeLoad(b.id)}},onScriptError:function(a){var b=G(a);if(!s(b.id))return w(makeError("scripterror","Script error",a,[b.id]))}}}function getInteractiveScript(){return interactiveScript&&interactiveScript.readyState==="interactive"?interactiveScript:(eachReverse(scripts(),function(a){if(a.readyState==="interactive")return interactiveScript=a}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.0.5",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,aps=ap.slice,apsp=ap.splice,isBrowser=typeof window!="undefined"&&!!navigator&&!!document,isWebWorker=!isBrowser&&typeof importScripts!="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(typeof define!="undefined")return;if(typeof requirejs!="undefined"){if(isFunction(requirejs))return;cfg=requirejs,requirejs=undefined}typeof require!="undefined"&&!isFunction(require)&&(cfg=require,require=undefined),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return!isArray(a)&&typeof a!="string"&&(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=contexts[g],e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),addRequireMethods(req),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(a){throw a},req.load=function(a,b,c){var d=a&&a.config||{},e;if(isBrowser)return e=d.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),e.type=d.scriptType||"text/javascript",e.charset="utf-8",e.async=!0,e.setAttribute("data-requirecontext",a.contextName),e.setAttribute("data-requiremodule",b),e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!isOpera?(useInteractive=!0,e.attachEvent("onreadystatechange",a.onScriptLoad)):(e.addEventListener("load",a.onScriptLoad,!1),e.addEventListener("error",a.onScriptError,!1)),e.src=c,currentlyAddingScript=e,baseElement?head.insertBefore(e,baseElement):head.appendChild(e),currentlyAddingScript=null,e;isWebWorker&&(importScripts(c),a.completeLoad(b))},isBrowser&&eachReverse(scripts(),function(a){head||(head=a.parentNode),dataMain=a.getAttribute("data-main");if(dataMain)return cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0}),define=function(a,b,c){var d,e;typeof a!="string"&&(c=b,b=a,a=null),isArray(b)||(c=b,b=[]),!b.length&&isFunction(c)&&c.length&&(c.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(c.length===1?["require"]:["require","exports","module"]).concat(b)),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),(e?e.defQueue:globalDefQueue).push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)})(this),function(){(function(a){function b(a){if(a in h.style)return a;var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1);if(a in h.style)return a;for(a=0;a<b.length;++a){var d=b[a]+c;if(d in h.style)return d}}function c(a){return"string"==typeof a&&this.parse(a),this}function d(b,c,d,e){var f=[];a.each(b,function(b){b=a.camelCase(b),b=a.transit.propertyMap[b]||a.cssProps[b]||b,b=b.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()}),-1===a.inArray(b,f)&&f.push(b)}),a.cssEase[d]&&(d=a.cssEase[d]);var h=""+g(c)+" "+d;0<parseInt(e,10)&&(h+=" "+g(e));var i=[];return a.each(f,function(a,b){i.push(b+" "+h)}),i.join(", ")}function e(b,c){c||(a.cssNumber[b]=!0),a.transit.propertyMap[b]=i.transform,a.cssHooks[b]={get:function(c){return a(c).css("transit:transform").get(b)},set:function(c,d){var e=a(c).css("transit:transform");e.setFromString(b,d),a(c).css({"transit:transform":e})}}}function f(a,b){return"string"==typeof a&&!a.match(/^[\-0-9\.]+$/)?a:""+a+b}function g(b){return a.fx.speeds[b]&&(b=a.fx.speeds[b]),f(b,"ms")}a.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1};var h=document.createElement("div"),i={},j=-1<navigator.userAgent.toLowerCase().indexOf("chrome");i.transition=b("transition"),i.transitionDelay=b("transitionDelay"),i.transform=b("transform"),i.transformOrigin=b("transformOrigin"),h.style[i.transform]="",h.style[i.transform]="rotateY(90deg)",i.transform3d=""!==h.style[i.transform];var k=i.transitionEnd={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"}[i.transition]||null,l;for(l in i)i.hasOwnProperty(l)&&"undefined"==typeof a.support[l]&&(a.support[l]=i[l]);h=null,a.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"},a.cssHooks["transit:transform"]={get:function(b){return a(b).data("transform")||new c},set:function(b,d){var e=d;e instanceof c||(e=new c(e)),b.style[i.transform]="WebkitTransform"===i.transform&&!j?e.toString(!0):e.toString(),a(b).data("transform",e)}},a.cssHooks.transform={set:a.cssHooks["transit:transform"].set},"1.8">a.fn.jquery&&(a.cssHooks.transformOrigin={get:function(a){return a.style[i.transformOrigin]},set:function(a,b){a.style[i.transformOrigin]=b}},a.cssHooks.transition={get:function(a){return a.style[i.transition]},set:function(a,b){a.style[i.transition]=b}}),e("scale"),e("translate"),e("rotate"),e("rotateX"),e("rotateY"),e("rotate3d"),e("perspective"),e("skewX"),e("skewY"),e("x",!0),e("y",!0),c.prototype={setFromString:function(a,b){var d="string"==typeof b?b.split(","):b.constructor===Array?b:[b];d.unshift(a),c.prototype.set.apply(this,d)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=f(a,"deg")},rotateX:function(a){this.rotateX=f(a,"deg")},rotateY:function(a){this.rotateY=f(a,"deg")},scale:function(a,b){void 0===b&&(b=a),this.scale=a+","+b},skewX:function(a){this.skewX=f(a,"deg")},skewY:function(a){this.skewY=f(a,"deg")},perspective:function(a){this.perspective=f(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){void 0===this._translateX&&(this._translateX=0),void 0===this._translateY&&(this._translateY=0),null!==a&&void 0!==a&&(this._translateX=f(a,"px")),null!==b&&void 0!==b&&(this._translateY=f(b,"px")),this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");return a[0]&&(a[0]=parseFloat(a[0])),a[1]&&(a[1]=parseFloat(a[1])),a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));return a[3]&&(a[3]=f(a[3],"deg")),a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,c,d){b.setFromString(c,d)})},toString:function(a){var b=[],c;for(c in this)this.hasOwnProperty(c)&&(i.transform3d||"rotateX"!==c&&"rotateY"!==c&&"perspective"!==c&&"transformOrigin"!==c)&&"_"!==c[0]&&(a&&"scale"===c?b.push(c+"3d("+this[c]+",1)"):a&&"translate"===c?b.push(c+"3d("+this[c]+",0)"):b.push(c+"("+this[c]+")"));return b.join(" ")}},a.fn.transition=a.fn.transit=function(b,c,e,f){var h=this,j=0,l=!0;"function"==typeof c&&(f=c,c=void 0),"function"==typeof e&&(f=e,e=void 0),"undefined"!=typeof b.easing&&(e=b.easing,delete b.easing),"undefined"!=typeof b.duration&&(c=b.duration,delete b.duration),"undefined"!=typeof b.complete&&(f=b.complete,delete b.complete),"undefined"!=typeof b.queue&&(l=b.queue,delete b.queue),"undefined"!=typeof b.delay&&(j=b.delay,delete b.delay),"undefined"==typeof c&&(c=a.fx.speeds._default),"undefined"==typeof e&&(e=a.cssEase._default),c=g(c);var m=d(b,c,e,j),o=a.transit.enabled&&i.transition?parseInt(c,10)+parseInt(j,10):0;if(0===o)return c=l,e=function(a){h.css(b),f&&f.apply(h),a&&a()},!0===c?h.queue(e):c?h.queue(c,e):e(),h;var r={};return c=l,e=function(c){this.offsetWidth;var d=!1,e=function(){d&&h.unbind(k,e),0<o&&h.each(function(){this.style[i.transition]=r[this]||null}),"function"==typeof f&&f.apply(h),"function"==typeof c&&c()};0<o&&k&&a.transit.useTransitionEnd?(d=!0,h.bind(k,e)):window.setTimeout(e,o),h.each(function(){0<o&&(this.style[i.transition]=m),a(this).css(b)})},!0===c?h.queue(e):c?h.queue(c,e):e(),this},a.transit.getTransitionValue=d})(jQuery),define("jqueryTransit",function(){}),define("app/filler",["jqueryTransit"],function(){return function(a){var b=function(a,b,c,d,e){this.$outer=a,this.$inner=b,this.$container=c,this.$items=d,this.options=e,this.containerWidth=this.options.container.width||this.$inner.width(),this.calcWidths(this.containerWidth),this.preIndex=-1,this.postIndex=0,this.fillPre(this.options.items.buffer,!1),this.fillPost(this.options.items.buffer,!1),this.itemWidth=0};return b.prototype={fillPre:function(a,b){var c=this,d=this.getItems(this.$items,this.preIndex,a),e=this.$container.children().first().position().left;return[].reverse.call(d).each(function(a,b){c.$container.prepend(c.itemCss(b,e,c.itemWidth,-(a+1)))}),this.adjustPreIndex(a),b&&this.removePost(a),this},fillPost:function(a,b){var c=this,d=this.getItems(this.$items,this.postIndex,a),e=this.$container.children().last().position().left;return d.each(function(a,b){c.$container.append(c.itemCss(b,e,c.itemWidth,a+1))}),this.adjustPostIndex(a),b&&this.removePre(a),this},removePre:function(a){var b=this.$container.children();return b.slice(0,a).remove(),this.adjustPreIndex(-a),this},removePost:function(a){var b=this.$container.children();return b.slice(-a).remove(),this.adjustPostIndex(-a),this},adjustPreIndex:function(a){return this.preIndex=(this.preIndex-a)%this.$items.length,this},adjustPostIndex:function(a){return this.postIndex=(this.postIndex+a)%this.$items.length,this},fitItems:function(){var b=this,c=this.$inner.width(),d=0;return this.itemCount=this.calcItemCount(c,this.maxWidth),this.itemWidth=this.calcItemWidth(c,this.itemCount),this.$container.children().each(function(c,e){var f=a(e).css({width:b.itemWidth+"px",left:(c-b.options.items.buffer)*b.itemWidth+"px"}).height();d=f>d?f:d}),this.$container.height(d),this},calcWidths:function(a){return this.maxWidth=this.parseUnits(this.options.items.maxWidth,a)||this.getMax(this.$items,"width"),this.minWidth=this.parseUnits(this.options.items.minWidth,a)||this.maxWidth/2,this},calcItemCount:function(a,b){return Math.ceil(a/b)},calcItemWidth:function(a,b){return a/b},getMax:function(b,c){var d=-Infinity;return b.each(function(b,e){var f=c?a(e)[c]():e;f>d&&(d=f)}),d},parseUnits:function(a,b){return typeof a=="string"?a.charAt(a.length-1)=="%"?b*(a.slice(0,a.length-1)/100):(a.slice(-2,a.length)!=="px"&&console&&console.log("rslide: options.items.(max|min)Width must either be undefined, a number, or end with `%` or `px`. You provided: ",a,"("+typeof a+")"),parseFloat(a)):typeof a=="number"?a:undefined},itemCss:function(b,c,d,e){var f=c+e*d+"px",g=a(b).css({width:d+"px",position:"absolute",left:f});return g},getItems:function(b,c,d){var e,f,g=0,h=0;b=b.clone?b.clone():b,c<0&&(c=(b.length+c)%b.length),f=c+d,h=f-b.length,e=b.slice(c,f);if(h>0){var i=this.getItems(b,g,h);a.merge(e,i)}return e}},b}(window.jQuery)}),function(a){function m(){var a=e();a!==f&&(f=a,c.trigger("orientationchange"))}function t(b,c,d){var e=d.type;d.type=c,a.event.handle.call(b,d),d.type=e}var b={swipe_h_threshold:50,swipe_v_threshold:50,taphold_threshold:750,doubletap_int:500,touch_capable:"ontouchstart"in document.documentElement,orientation_support:"orientation"in window&&"onorientationchange"in window,startevent:"ontouchstart"in document.documentElement?"touchstart":"mousedown",endevent:"ontouchstart"in document.documentElement?"touchend":"mouseup",moveevent:"ontouchstart"in document.documentElement?"touchmove":"mousemove",tapevent:"ontouchstart"in document.documentElement?"tap":"click",scrollevent:"ontouchstart"in document.documentElement?"touchmove":"scroll",hold_timer:null,tap_timer:null};a.each("tapstart tapend tap singletap doubletap taphold swipe swipeup swiperight swipedown swipeleft scrollstart scrollend orientationchange".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn[c]=!0}),a.event.special.tapstart={setup:function(){var c=this,d=a(c);d.bind(b.startevent,function(a){if(a.which&&a.which!==1)return!1;t(c,"tapstart",a)})}},a.event.special.tapend={setup:function(){var c=this,d=a(c);d.bind(b.endevent,function(a){t(c,"tapend",a)})}},a.event.special.taphold={setup:function(){var c=this,d=a(c),e,f,g={x:0,y:0};d.bind(b.startevent,function(a){if(a.which&&a.which!==1)return!1;d.data("tapheld",!1),e=a.target,g.x=b.touch_capabale?a.targetTouches[0].pageX:a.pageX,g.y=b.touch_capabale?a.targetTouches[0].pageY:a.pageY,b.hold_timer=window.setTimeout(function(){var f=b.touch_capabale?a.targetTouches[0].pageX:a.pageX,h=b.touch_capabale?a.targetTouches[0].pageY:a.pageY;a.target==e&&g.x==f&&g.y==h&&(d.data("tapheld",!0),t(c,"taphold",a))},b.taphold_threshold)}).bind(b.endevent,function(){window.clearTimeout(b.hold_timer)})}},a.event.special.doubletap={setup:function(){var c=this,d=a(c),e,f;d.bind(b.startevent,function(a){if(a.which&&a.which!==1)return!1;d.data("doubletapped",!1),e=a.target}).bind(b.endevent,function(a){var g=(new Date).getTime(),h=d.data("lastTouch")||g+1,i=g-h;window.clearTimeout(f),i<b.doubletap_int&&i>0&&a.target==e&&i>100?(d.data("doubletapped",!0),window.clearTimeout(b.tap_timer),t(c,"doubletap",a)):(d.data("lastTouch",g),f=window.setTimeout(function(a){window.clearTimeout(f)},b.doubletap_int,[a])),d.data("lastTouch",g)})}},a.event.special.singletap={setup:function(){var c=this,d=a(c),e=null,f=null;d.bind(b.startevent,function(a){if(a.which&&a.which!==1)return!1;f=(new Date).getTime(),e=a.target}).bind(b.endevent,function(a){a.target==e&&(b.tap_timer=window.setTimeout(function(){!d.data("doubletapped")&&!d.data("tapheld")&&t(c,"singletap",a)},b.doubletap_int))})}},a.event.special.tap={setup:function(){var c=this,d=a(c),e=!1,f=null,g,h={x:0,y:0};d.bind(b.startevent,function(a){if(a.which&&a.which!==1)return!1;e=!0,h.x=b.touch_capabale?a.targetTouches[0].pageX:a.pageX,h.y=b.touch_capabale?a.targetTouches[0].pageY:a.pageY,g=(new Date).getTime(),f=a.target}).bind(b.endevent,function(a){var d=b.touch_capabale?a.targetTouches[0].pageX:a.pageX,i=b.touch_capabale?a.targetTouches[0].pageY:a.pageY;f==a.target&&e&&(new Date).getTime()-g<b.taphold_threshold&&h.x==d&&h.y==i&&t(c,"tap",a)})}},a.event.special.swipe={setup:function(){function g(a){e.x=b.touch_capable?a.targetTouches[0].pageX:a.pageX,e.y=b.touch_capable?a.targetTouches[0].pageY:a.pageY,f.x=e.x,f.y=e.y}function h(a){a.preventDefault(),f.x=b.touch_capable?a.targetTouches[0].pageX:a.pageX,f.y=b.touch_capable?a.targetTouches[0].pageY:a.pageY,window.clearTimeout(b.hold_timer)}function i(a){var c,g=d.attr("data-xthreshold"),h=d.attr("data-ythreshold"),i=typeof g!="undefined"&&g!==!1&&parseInt(g)?parseInt(g):b.swipe_h_threshold,j=typeof h!="undefined"&&h!==!1&&parseInt(h)?parseInt(h):b.swipe_v_threshold;e.y>f.y&&e.y-f.y>j&&(c="swipeup"),e.x<f.x&&f.x-e.x>i&&(c="swiperight"),e.y<f.y&&f.y-e.y>j&&(c="swipedown"),e.x>f.x&&e.x-f.x>i&&(c="swipeleft"),c!=undefined&&d.trigger("swipe").trigger(c)}var c=this,d=a(c),e={x:0,y:0},f={x:0,y:0};c.addEventListener?(c.addEventListener(b.startevent,g,!1),c.addEventListener(b.moveevent,h,!1),c.addEventListener(b.endevent,i,!1)):(c.attachEvent(b.startevent,g),c.attachEvent(b.moveevent,h),c.attachEvent(b.endevent,i))}},a.event.special.scrollstart={setup:function(){function g(a,b){e=b,t(c,e?"scrollstart":"scrollend",a)}var c=this,d=a(c),e,f;d.bind(b.scrollevent,function(a){e||g(a,!0),clearTimeout(f),f=setTimeout(function(){g(a,!1)},50)})}};var c=a(window),d,e,f,g,h,i={0:!0,180:!0};if(b.orientation_support){var j=window.innerWidth||a(window).width(),k=window.innerHeight||a(window).height(),l=50;g=j>k&&j-k>l,h=i[window.orientation];if(g&&h||!g&&!h)i={"-90":!0,90:!0}}a.event.special.orientationchange=d={setup:function(){if(b.orientation_support)return!1;f=e(),c.bind("throttledresize",m)},teardown:function(){if(b.orientation_support)return!1;c.unbind("throttledresize",m)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=e(),b.apply(this,arguments)}}},a.event.special.orientationchange.orientation=e=function(){var a=!0,c=document.documentElement;return b.orientation_support?a=i[window.orientation]:a=c&&c.clientWidth/c.clientHeight<1.1,a?"portrait":"landscape"},a.event.special.throttledresize={setup:function(){a(this).bind("resize",o)},teardown:function(){a(this).unbind("resize",o)}};var n=250,o=function(){r=(new Date).getTime(),s=r-p,s>=n?(p=r,a(this).trigger("throttledresize")):(q&&window.clearTimeout(q),q=window.setTimeout(m,n-s))},p=0,q,r,s;a.each({scrollend:"scrollstart",swipeup:"swipe",swiperight:"swipe",swipedown:"swipe",swipeleft:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})}(jQuery),define("jqueryMobileEvents",function(){}),define("app/rslide",["app/filler","jqueryMobileEvents"],function(a){return function(b){var c=function(c,d){var e;this.options=d,this.initElements(c),this.initControls(),this.offset=0,this.offsetItems=0,this.filler=new a(this.$outer,this.$inner,this.$container,this.$items,this.options),b(window).on("orientationchange, resize",b.proxy(this.onResize,this)),this.options.pause==="hover"&&this.$outer.on("mouseenter",b.proxy(this.pause,this)).on("mouseleave",b.proxy(this.cycle,this)),b.browser.msie&&parseInt(b.browser.version)<9&&(this.terribleBrowser=!0),this.$items.load(this.fit);var f=b("img",this.$container).each(function(a,b){if(!b.complete)return e=!0,!1});!e&&this.fit()};return c.prototype={fit:function(){this.filler.fitItems(),this.setOffsetByItems(this.offsetItems,0)},adjustOffsetByItems:function(a,b){return this.setOffsetByItems(this.offsetItems+a,b),this},setOffsetByItems:function(a,b){return this.offsetItems=a,this.setOffset(this.offsetItems*this.filler.itemWidth,b),this},setOffset:function(a,b){var c=this;return b=typeof b!="undefined"?b:this.options.slider.duration,this.sliding=!0,this.$outer.trigger("sliding"),this.offset=a,this.terribleBrowser?this.$container.animate({left:-a},b,function(){c.sliding=!1,c.$container.trigger("slid")}):this.$container.transition({x:-a},b,function(){c.sliding=!1,c.$container.trigger("slid")}),this},prev:function(a){a&&a.preventDefault();if(this.sliding)return;return this.sliding=!0,this.adjustOffsetByItems(-this.options.slider.count),this.filler.fillPre(this.options.slider.count,!0),this},next:function(a){a&&a.preventDefault();if(this.sliding)return;return this.sliding=!0,this.adjustOffsetByItems(this.options.slider.count),this.filler.fillPost(this.options.slider.count,!0),this},onResize:function(a){this.setOffsetByItems(0,0),this.fit()},initElements:function(a){this.$container=b(a).wrap('<div class="rslide-inner"></div>').css({padding:0,width:"99999px",margin:"0 auto",position:"relative"}),this.$inner=this.$container.parent().css({position:"relative",overflow:"hidden"}),this.$inner.wrap('<div class="rslide-outer"></div>'),this.$outer=this.$inner.parent().css({position:"relative"}),this.$items=this.$container.children().css({"list-style":"none",position:"absolute"}),this.options.items.fitImages&&this.$items.find(this.options.items.imageSelector).css({width:"100%",height:"auto"})},initControls:function(){return this.options.controls.create?(this.$next=b('<a href="" class="next"></a>').appendTo(this.$outer),this.$prev=b('<a href="" class="prev"></a>').appendTo(this.$outer)):(this.$next=b(this.options.controls.next),this.$prev=b(this.options.controls.prev)),this.$prev.on("click",b.proxy(this.prev,this)),this.$next.on("click",b.proxy(this.next,this)),this.$outer.on("swipeleft",b.proxy(this.next,this)),this.$outer.on("swiperight",b.proxy(this.prev,this)),this}},b.fn.rslide=function(a){return this.each(function(){var d=b(this),e=d.data("rslide"),f=b.extend({},b.fn.rslide.defaults,typeof a=="object"&&a),g=typeof a=="string"?a:f.slide;e||d.data("rslide",e=new c(this,f)),typeof a=="number"?e.to(a):g?e[g]():f.interval&&e.cycle()})},b.fn.rslide.defaults={items:{minWidth:undefined,maxWidth:"25%",min:2,max:4,buffer:1,fitImages:!0,imageSelector:"img"},container:{width:undefined},slider:{count:1,duration:300},controls:{next:"",prev:"",create:!0},pause:"hover"},b.fn.rslide.Constructor=c,b.fn.rslide}(window.jQuery)}),require.config({shim:{},paths:{jquery:"empty:",jqueryTransit:"vendor/jquery.transit.min",jqueryMobileEvents:"vendor/jquery.mobile-events"}}),require(["app/rslide"],function(a){$(document).ready(function(){$(".whee").rslide()})}),define("main",function(){})}();