var gh=Object.defineProperty;var Vl=e=>{throw TypeError(e)};var fh=(e,t,n)=>t in e?gh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Re=(e,t,n)=>fh(e,typeof t!="symbol"?t+"":t,n),Ri=(e,t,n)=>t.has(e)||Vl("Cannot "+n);var Ee=(e,t,n)=>(Ri(e,t,"read from private field"),n?n.call(e):t.get(e)),ut=(e,t,n)=>t.has(e)?Vl("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ht=(e,t,n,r)=>(Ri(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),Et=(e,t,n)=>(Ri(e,t,"access private method"),n);var Ni=(e,t,n,r)=>({set _(s){ht(e,t,s,n)},get _(){return Ee(e,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const mh=!1,ph=(e,t)=>e===t,Kt=Symbol("solid-proxy"),mc=typeof Proxy=="function",us=Symbol("solid-track"),za={equals:ph};let na=null,pc=yc;const sn=1,Wa=2,vc={owned:null,cleanups:null,context:null,owner:null},Oi={};var Se=null;let Fi=null,vh=null,Pe=null,$t=null,Wt=null,hi=0;function ra(e,t){const n=Pe,r=Se,s=e.length===0,a=t===void 0?r:t,l=s?vc:{owned:null,cleanups:null,context:a?a.context:null,owner:a},o=s?e:()=>e(()=>Ae(()=>oa(l)));Se=l,Pe=null;try{return an(o,!0)}finally{Pe=n,Se=r}}function O(e,t){t=t?Object.assign({},za,t):za;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),bc(n,s));return[_c.bind(n),r]}function $h(e,t,n){const r=$a(e,t,!0,sn);Nr(r)}function L(e,t,n){const r=$a(e,t,!1,sn);Nr(r)}function q(e,t,n){pc=Ah;const r=$a(e,t,!1,sn);r.user=!0,Wt?Wt.push(r):Nr(r)}function N(e,t,n){n=n?Object.assign({},za,n):za;const r=$a(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Nr(r),_c.bind(r)}function _h(e){return e&&typeof e=="object"&&"then"in e}function bh(e,t,n){let r,s,a;r=!0,s=e,a={};let l=null,o=Oi,c=!1,h="initialValue"in a,u=typeof r=="function"&&N(r);const f=new Set,[g,m]=(a.storage||O)(a.initialValue),[y,v]=O(void 0),[$,k]=O(void 0,{equals:!1}),[C,w]=O(h?"ready":"unresolved");function _(x,I,E,P){return l===x&&(l=null,P!==void 0&&(h=!0),(x===o||I===o)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(P,{value:I})),o=Oi,A(I,E)),I}function A(x,I){an(()=>{I===void 0&&m(()=>x),w(I!==void 0?"errored":h?"ready":"unresolved"),v(I);for(const E of f.keys())E.decrement();f.clear()},!1)}function S(){const x=kh,I=g(),E=y();if(E!==void 0&&!l)throw E;return Pe&&Pe.user,I}function b(x=!0){if(x!==!1&&c)return;c=!1;const I=u?u():r;if(I==null||I===!1){_(l,Ae(g));return}const E=o!==Oi?o:Ae(()=>s(I,{value:g(),refetching:x}));return _h(E)?(l=E,"value"in E?(E.status==="success"?_(l,E.value,void 0,I):_(l,void 0,gs(E.value),I),E):(c=!0,queueMicrotask(()=>c=!1),an(()=>{w(h?"refreshing":"pending"),k()},!1),E.then(P=>_(E,P,void 0,I),P=>_(E,void 0,gs(P),I)))):(_(l,E,void 0,I),E)}return Object.defineProperties(S,{state:{get:()=>C()},error:{get:()=>y()},loading:{get(){const x=C();return x==="pending"||x==="refreshing"}},latest:{get(){if(!h)return S();const x=y();if(x&&!l)throw x;return g()}}}),u?$h(()=>b(!1)):b(!1),[S,{refetch:b,mutate:m}]}function Oe(e){return an(e,!1)}function Ae(e){if(Pe===null)return e();const t=Pe;Pe=null;try{return e()}finally{Pe=t}}function le(e,t,n){const r=Array.isArray(e);let s,a=n&&n.defer;return l=>{let o;if(r){o=Array(e.length);for(let h=0;h<e.length;h++)o[h]=e[h]()}else o=e();if(a)return a=!1,l;const c=Ae(()=>t(o,s,l));return s=o,c}}function Ln(e){q(()=>Ae(e))}function He(e){return Se===null||(Se.cleanups===null?Se.cleanups=[e]:Se.cleanups.push(e)),e}function yh(e,t){na||(na=Symbol("error")),Se=$a(void 0,void 0,!0),Se.context={...Se.context,[na]:[t]};try{return e()}catch(n){_a(n)}finally{Se=Se.owner}}function hs(){return Pe}function Rr(){return Se}function $c(e,t){const n=Se,r=Pe;Se=e,Pe=null;try{return an(t,!0)}catch(s){_a(s)}finally{Se=n,Pe=r}}function wh(e){const t=Pe,n=Se;return Promise.resolve().then(()=>{Pe=t,Se=n;let r;return an(e,!1),Pe=Se=null,r?r.done:void 0})}const[U3,V3]=O(!1);function Zt(e,t){const n=Symbol("context");return{id:n,Provider:xh(n),defaultValue:e}}function jt(e){let t;return Se&&Se.context&&(t=Se.context[e.id])!==void 0?t:e.defaultValue}function gi(e){const t=N(e),n=N(()=>fs(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let kh;function _c(){if(this.sources&&this.state)if(this.state===sn)Nr(this);else{const e=$t;$t=null,an(()=>Ja(this),!1),$t=e}if(Pe){const e=this.observers?this.observers.length:0;Pe.sources?(Pe.sources.push(this),Pe.sourceSlots.push(e)):(Pe.sources=[this],Pe.sourceSlots=[e]),this.observers?(this.observers.push(Pe),this.observerSlots.push(Pe.sources.length-1)):(this.observers=[Pe],this.observerSlots=[Pe.sources.length-1])}return this.value}function bc(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&an(()=>{for(let s=0;s<e.observers.length;s+=1){const a=e.observers[s],l=Fi&&Fi.running;l&&Fi.disposed.has(a),(l?!a.tState:!a.state)&&(a.pure?$t.push(a):Wt.push(a),a.observers&&wc(a)),l||(a.state=sn)}if($t.length>1e6)throw $t=[],new Error},!1)),t}function Nr(e){if(!e.fn)return;oa(e);const t=hi;Sh(e,e.value,t)}function Sh(e,t,n){let r;const s=Se,a=Pe;Pe=Se=e;try{r=e.fn(t)}catch(l){return e.pure&&(e.state=sn,e.owned&&e.owned.forEach(oa),e.owned=null),e.updatedAt=n+1,_a(l)}finally{Pe=a,Se=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?bc(e,r):e.value=r,e.updatedAt=n)}function $a(e,t,n,r=sn,s){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Se,context:Se?Se.context:null,pure:n};return Se===null||Se!==vc&&(Se.owned?Se.owned.push(a):Se.owned=[a]),a}function Ka(e){if(e.state===0)return;if(e.state===Wa)return Ja(e);if(e.suspense&&Ae(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<hi);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===sn)Nr(e);else if(e.state===Wa){const r=$t;$t=null,an(()=>Ja(e,t[0]),!1),$t=r}}function an(e,t){if($t)return e();let n=!1;t||($t=[]),Wt?n=!0:Wt=[],hi++;try{const r=e();return Ch(n),r}catch(r){n||(Wt=null),$t=null,_a(r)}}function Ch(e){if($t&&(yc($t),$t=null),e)return;const t=Wt;Wt=null,t.length&&an(()=>pc(t),!1)}function yc(e){for(let t=0;t<e.length;t++)Ka(e[t])}function Ah(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Ka(r)}for(t=0;t<n;t++)Ka(e[t])}function Ja(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===sn?r!==t&&(!r.updatedAt||r.updatedAt<hi)&&Ka(r):s===Wa&&Ja(r,t)}}}function wc(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Wa,n.pure?$t.push(n):Wt.push(n),n.observers&&wc(n))}}function oa(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const a=s.pop(),l=n.observerSlots.pop();r<s.length&&(a.sourceSlots[l]=r,s[r]=a,n.observerSlots[r]=l)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)oa(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)oa(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function gs(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Gl(e,t,n){try{for(const r of t)r(e)}catch(r){_a(r,n&&n.owner||null)}}function _a(e,t=Se){const n=na&&t&&t.context&&t.context[na],r=gs(e);if(!n)throw r;Wt?Wt.push({fn(){Gl(r,n,t)},state:sn}):Gl(r,n,t)}function fs(e){if(typeof e=="function"&&!e.length)return fs(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=fs(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function xh(e,t){return function(r){let s;return L(()=>s=Ae(()=>(Se.context={...Se.context,[e]:r.value},gi(()=>r.children))),void 0),s}}const Th=Symbol("fallback");function Hl(e){for(let t=0;t<e.length;t++)e[t]()}function Ih(e,t,n={}){let r=[],s=[],a=[],l=0,o=t.length>1?[]:null;return He(()=>Hl(a)),()=>{let c=e()||[],h=c.length,u,f;return c[us],Ae(()=>{let m,y,v,$,k,C,w,_,A;if(h===0)l!==0&&(Hl(a),a=[],r=[],s=[],l=0,o&&(o=[])),n.fallback&&(r=[Th],s[0]=ra(S=>(a[0]=S,n.fallback())),l=1);else if(l===0){for(s=new Array(h),f=0;f<h;f++)r[f]=c[f],s[f]=ra(g);l=h}else{for(v=new Array(h),$=new Array(h),o&&(k=new Array(h)),C=0,w=Math.min(l,h);C<w&&r[C]===c[C];C++);for(w=l-1,_=h-1;w>=C&&_>=C&&r[w]===c[_];w--,_--)v[_]=s[w],$[_]=a[w],o&&(k[_]=o[w]);for(m=new Map,y=new Array(_+1),f=_;f>=C;f--)A=c[f],u=m.get(A),y[f]=u===void 0?-1:u,m.set(A,f);for(u=C;u<=w;u++)A=r[u],f=m.get(A),f!==void 0&&f!==-1?(v[f]=s[u],$[f]=a[u],o&&(k[f]=o[u]),f=y[f],m.set(A,f)):a[u]();for(f=C;f<h;f++)f in v?(s[f]=v[f],a[f]=$[f],o&&(o[f]=k[f],o[f](f))):s[f]=ra(g);s=s.slice(0,l=h),r=c.slice(0)}return s});function g(m){if(a[f]=m,o){const[y,v]=O(f);return o[f]=v,t(c[f],y)}return t(c[f])}}}function i(e,t){return Ae(()=>e(t||{}))}function Ca(){return!0}const ms={get(e,t,n){return t===Kt?n:e.get(t)},has(e,t){return t===Kt?!0:e.has(t)},set:Ca,deleteProperty:Ca,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Ca,deleteProperty:Ca}},ownKeys(e){return e.keys()}};function Bi(e){return(e=typeof e=="function"?e():e)?e:{}}function Eh(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Fe(...e){let t=!1;for(let l=0;l<e.length;l++){const o=e[l];t=t||!!o&&Kt in o,e[l]=typeof o=="function"?(t=!0,N(o)):o}if(mc&&t)return new Proxy({get(l){for(let o=e.length-1;o>=0;o--){const c=Bi(e[o])[l];if(c!==void 0)return c}},has(l){for(let o=e.length-1;o>=0;o--)if(l in Bi(e[o]))return!0;return!1},keys(){const l=[];for(let o=0;o<e.length;o++)l.push(...Object.keys(Bi(e[o])));return[...new Set(l)]}},ms);const n={},r=Object.create(null);for(let l=e.length-1;l>=0;l--){const o=e[l];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let h=c.length-1;h>=0;h--){const u=c[h];if(u==="__proto__"||u==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,u);if(!r[u])r[u]=f.get?{enumerable:!0,configurable:!0,get:Eh.bind(n[u]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const g=n[u];g&&(f.get?g.push(f.get.bind(o)):f.value!==void 0&&g.push(()=>f.value))}}}const s={},a=Object.keys(r);for(let l=a.length-1;l>=0;l--){const o=a[l],c=r[o];c&&c.get?Object.defineProperty(s,o,c):s[o]=c?c.value:void 0}return s}function fi(e,...t){if(mc&&Kt in e){const s=new Set(t.length>1?t.flat():t[0]),a=t.map(l=>new Proxy({get(o){return l.includes(o)?e[o]:void 0},has(o){return l.includes(o)&&o in e},keys(){return l.filter(o=>o in e)}},ms));return a.push(new Proxy({get(l){return s.has(l)?void 0:e[l]},has(l){return s.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!s.has(l))}},ms)),a}const n={},r=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const a=Object.getOwnPropertyDescriptor(e,s),l=!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable;let o=!1,c=0;for(const h of t)h.includes(s)&&(o=!0,l?r[c][s]=a.value:Object.defineProperty(r[c],s,a)),++c;o||(l?n[s]=a.value:Object.defineProperty(n,s,a))}return[...r,n]}const kc=e=>`Stale read from <${e}>.`;function H(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Ih(()=>e.each,e.children,t||void 0))}function T(e){const t=e.keyed,n=N(()=>e.when,void 0,void 0),r=t?n:N(n,void 0,{equals:(s,a)=>!s==!a});return N(()=>{const s=r();if(s){const a=e.children;return typeof a=="function"&&a.length>0?Ae(()=>a(t?s:()=>{if(!Ae(r))throw kc("Show");return n()})):a}return e.fallback},void 0,void 0)}function W(e){const t=gi(()=>e.children),n=N(()=>{const r=t(),s=Array.isArray(r)?r:[r];let a=()=>{};for(let l=0;l<s.length;l++){const o=l,c=s[l],h=a,u=N(()=>h()?void 0:c.when,void 0,void 0),f=c.keyed?u:N(u,void 0,{equals:(g,m)=>!g==!m});a=()=>h()||(f()?[o,u,c]:void 0)}return a});return N(()=>{const r=n()();if(!r)return e.fallback;const[s,a,l]=r,o=l.children;return typeof o=="function"&&o.length>0?Ae(()=>o(l.keyed?a():()=>{var h;if(((h=Ae(n)())==null?void 0:h[0])!==s)throw kc("Match");return a()})):o},void 0,void 0)}function M(e){return e}let pr;function Lh(){pr&&[...pr].forEach(e=>e())}function ct(e){let t;const[n,r]=O(t,void 0);return pr||(pr=new Set),pr.add(r),He(()=>pr.delete(r)),N(()=>{let s;if(s=n()){const a=e.fallback;return typeof a=="function"&&a.length?Ae(()=>a(s,()=>r())):a}return yh(()=>e.children,r)},void 0,void 0)}const Ph=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Mh=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Ph]),Dh=new Set(["innerHTML","textContent","innerText","children"]),Rh=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Nh=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Oh(e,t){const n=Nh[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Fh=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Bh=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),Uh={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Vh(e,t,n){let r=n.length,s=t.length,a=r,l=0,o=0,c=t[s-1].nextSibling,h=null;for(;l<s||o<a;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[a-1];)s--,a--;if(s===l){const u=a<r?o?n[o-1].nextSibling:n[a-o]:c;for(;o<a;)e.insertBefore(n[o++],u)}else if(a===o)for(;l<s;)(!h||!h.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[a-1]&&n[o]===t[s-1]){const u=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--a],u),t[s]=n[a]}else{if(!h){h=new Map;let f=o;for(;f<a;)h.set(n[f],f++)}const u=h.get(t[l]);if(u!=null)if(o<u&&u<a){let f=l,g=1,m;for(;++f<s&&f<a&&!((m=h.get(t[f]))==null||m!==u+g);)g++;if(g>u-o){const y=t[l];for(;o<u;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const jl="_$DX_DELEGATE";function Gh(e,t,n,r={}){let s;return ra(a=>{s=a,t===document?e():d(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function p(e,t,n,r){let s;const a=()=>{const o=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:r?o.firstChild:o.content.firstChild},l=t?()=>Ae(()=>document.importNode(s||(s=a()),!0)):()=>(s||(s=a())).cloneNode(!0);return l.cloneNode=l,l}function $e(e,t=window.document){const n=t[jl]||(t[jl]=new Set);for(let r=0,s=e.length;r<s;r++){const a=e[r];n.has(a)||(n.add(a),t.addEventListener(a,Kh))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Hh(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function jh(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Bt(e,t){t==null?e.removeAttribute("class"):e.className=t}function Xa(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=a=>s.call(e,n[1],a))}else e.addEventListener(t,n,typeof n!="function"&&n)}function Yh(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let a,l;for(a=0,l=s.length;a<l;a++){const o=s[a];!o||o==="undefined"||t[o]||(Yl(e,o,!1),delete n[o])}for(a=0,l=r.length;a<l;a++){const o=r[a],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(Yl(e,o,!0),n[o]=c)}return n}function qh(e,t,n){if(!t)return n?G(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,a;for(a in n)t[a]==null&&r.removeProperty(a),delete n[a];for(a in t)s=t[a],s!==n[a]&&(r.setProperty(a,s),n[a]=s);return n}function Lt(e,t={},n,r){const s={};return r||L(()=>s.children=ca(e,t.children,s.children)),L(()=>typeof t.ref=="function"&&he(t.ref,e)),L(()=>zh(e,t,n,!0,s,!0)),s}function he(e,t,n){return Ae(()=>e(t,n))}function d(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ca(e,t,r,n);L(s=>ca(e,t(),s,n),r)}function zh(e,t,n,r,s={},a=!1){t||(t={});for(const l in s)if(!(l in t)){if(l==="children")continue;s[l]=ql(e,l,null,s[l],n,a,t)}for(const l in t){if(l==="children")continue;const o=t[l];s[l]=ql(e,l,o,s[l],n,a,t)}}function Wh(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Yl(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,a=r.length;s<a;s++)e.classList.toggle(r[s],n)}function ql(e,t,n,r,s,a,l){let o,c,h,u,f;if(t==="style")return qh(e,n,r);if(t==="classList")return Yh(e,n,r);if(n===r)return r;if(t==="ref")a||n(e);else if(t.slice(0,3)==="on:"){const g=t.slice(3);r&&e.removeEventListener(g,r,typeof r!="function"&&r),n&&e.addEventListener(g,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const g=t.slice(10);r&&e.removeEventListener(g,r,!0),n&&e.addEventListener(g,n,!0)}else if(t.slice(0,2)==="on"){const g=t.slice(2).toLowerCase(),m=Fh.has(g);if(!m&&r){const y=Array.isArray(r)?r[0]:r;e.removeEventListener(g,y)}(m||n)&&(Xa(e,g,n,m),m&&$e([g]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")jh(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(h=Dh.has(t))||!s&&((u=Oh(t,e.tagName))||(c=Mh.has(t)))||(o=e.nodeName.includes("-")||"is"in l))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?Bt(e,n):o&&!c&&!h?e[Wh(t)]=n:e[u||t]=n;else{const g=s&&t.indexOf(":")>-1&&Uh[t.split(":")[0]];g?Hh(e,g,t,n):G(e,Rh[t]||t,n)}return n}function Kh(e){let t=e.target;const n=`$$${e.type}`,r=e.target,s=e.currentTarget,a=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),l=()=>{const c=t[n];if(c&&!t.disabled){const h=t[`${n}Data`];if(h!==void 0?c.call(t,h,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&a(t.host),!0},o=()=>{for(;l()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();a(c[0]);for(let h=0;h<c.length-2&&(t=c[h],!!l());h++){if(t._$host){t=t._$host,o();break}if(t.parentNode===s)break}}else o();a(r)}function ca(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,l=r!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(l){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=or(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=or(e,n,r);else{if(a==="function")return L(()=>{let o=t();for(;typeof o=="function";)o=o();n=ca(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(ps(o,t,n,s))return L(()=>n=ca(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=or(e,n,r),l)return n}else c?n.length===0?zl(e,o,r):Vh(e,n,o):(n&&or(e),zl(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=or(e,n,r,t);or(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ps(e,t,n,r){let s=!1;for(let a=0,l=t.length;a<l;a++){let o=t[a],c=n&&n[e.length],h;if(!(o==null||o===!0||o===!1))if((h=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))s=ps(e,o,c)||s;else if(h==="function")if(r){for(;typeof o=="function";)o=o();s=ps(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const u=String(o);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return s}function zl(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function or(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let a=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!a&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else a=!0}}else e.insertBefore(s,n);return[s]}const Jh=!1,Xh="http://www.w3.org/2000/svg";function Zh(e,t=!1){return t?document.createElementNS(Xh,e):document.createElement(e)}function Qh(e,t){const n=N(e);return N(()=>{const r=n();switch(typeof r){case"function":return Ae(()=>r(t));case"string":const s=Bh.has(r),a=Zh(r,s);return Lt(a,t,s),a}})}function Ui(e){const[,t]=fi(e,["component"]);return Qh(()=>e.component,t)}function Sc(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,a){if(n)return!(n=!1);const l={to:s,options:a,defaultPrevented:!1,preventDefault:()=>l.defaultPrevented=!0};for(const o of e)o.listener({...l,from:o.location,retry:c=>{c&&(n=!0),o.navigate(s,{...a,resolve:!1})}});return!l.defaultPrevented}return{subscribe:t,confirm:r}}let vs;function js(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),vs=window.history.state._depth}js();function eg(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function tg(e,t){let n=!1;return()=>{const r=vs;js();const s=r==null?null:vs-r;if(n){n=!1;return}s&&t(s)?(n=!0,window.history.go(-s)):e()}}const ng=/^(?:[a-z0-9]+:)?\/\//i,rg=/^\/+|(\/)\/+$/g,Cc="http://sr";function zn(e,t=!1){const n=e.replace(rg,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function ja(e,t,n){if(ng.test(t))return;const r=zn(e),s=n&&zn(n);let a="";return!s||t.startsWith("/")?a=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?a=r+s:a=s,(a||"/")+zn(t,!a)}function ag(e,t){if(e==null)throw new Error(t);return e}function ig(e,t){return zn(e).replace(/\/*(\*.*)?$/g,"")+zn(t)}function Ac(e){const t={};return e.searchParams.forEach((n,r)=>{r in t?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),t}function sg(e,t,n){const[r,s]=e.split("/*",2),a=r.split("/").filter(Boolean),l=a.length;return o=>{const c=o.split("/").filter(Boolean),h=c.length-l;if(h<0||h>0&&s===void 0&&!t)return null;const u={path:l?"":"/",params:{}},f=g=>n===void 0?void 0:n[g];for(let g=0;g<l;g++){const m=a[g],y=m[0]===":",v=y?c[g]:c[g].toLowerCase(),$=y?m.slice(1):m.toLowerCase();if(y&&Vi(v,f($)))u.params[$]=v;else if(y||!Vi(v,$))return null;u.path+=`/${v}`}if(s){const g=h?c.slice(-h).join("/"):"";if(Vi(g,f(s)))u.params[s]=g;else return null}return u}}function Vi(e,t){const n=r=>r===e;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function lg(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,a)=>s+(a.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function xc(e){const t=new Map,n=Rr();return new Proxy({},{get(r,s){return t.has(s)||$c(n,()=>t.set(s,N(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function og(e,t){const n=new URLSearchParams(e);Object.entries(t).forEach(([s,a])=>{a==null||a===""||a instanceof Array&&!a.length?n.delete(s):a instanceof Array?(n.delete(s),a.forEach(l=>{n.append(s,String(l))})):n.set(s,String(a))});const r=n.toString();return r?`?${r}`:""}function Tc(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return Tc(r).reduce((a,l)=>[...a,...s.map(o=>o+l)],[])}const cg=100,Ic=Zt(),Ys=Zt(),ba=()=>ag(jt(Ic),"<A> and 'use' router primitives can be only used inside a Route."),dg=()=>jt(Ys)||ba().base,ug=e=>{const t=dg();return N(()=>t.resolvePath(e()))},hg=e=>{const t=ba();return N(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},pn=()=>ba().navigatorFactory(),Qt=()=>ba().location,ne=()=>ba().params,Te=()=>{const e=Qt(),t=pn(),n=(r,s)=>{const a=Ae(()=>og(e.search,r)+e.hash);t(a,{scroll:!1,resolve:!1,...s})};return[e.query,n]};function gg(e,t=""){const{component:n,preload:r,load:s,children:a,info:l}=e,o=!a||Array.isArray(a)&&!a.length,c={key:e,component:n,preload:r||s,info:l};return Ec(e.path).reduce((h,u)=>{for(const f of Tc(u)){const g=ig(t,f);let m=o?g:g.split("/*",1)[0];m=m.split("/").map(y=>y.startsWith(":")||y.startsWith("*")?y:encodeURIComponent(y)).join("/"),h.push({...c,originalPath:u,pattern:m,matcher:sg(m,!o,e.matchFilters)})}return h},[])}function fg(e,t=0){return{routes:e,score:lg(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const a=e[s],l=a.matcher(n);if(!l)return null;r.unshift({...l,route:a})}return r}}}function Ec(e){return Array.isArray(e)?e:[e]}function Lc(e,t="",n=[],r=[]){const s=Ec(e);for(let a=0,l=s.length;a<l;a++){const o=s[a];if(o&&typeof o=="object"){o.hasOwnProperty("path")||(o.path="");const c=gg(o,t);for(const h of c){n.push(h);const u=Array.isArray(o.children)&&o.children.length===0;if(o.children&&!u)Lc(o.children,h.pattern,n,r);else{const f=fg([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((a,l)=>l.score-a.score)}function Gi(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function mg(e,t,n){const r=new URL(Cc),s=N(u=>{const f=e();try{return new URL(f,r)}catch{return console.error(`Invalid path ${f}`),u}},r,{equals:(u,f)=>u.href===f.href}),a=N(()=>s().pathname),l=N(()=>s().search,!0),o=N(()=>s().hash),c=()=>"",h=le(l,()=>Ac(s()));return{get pathname(){return a()},get search(){return l()},get hash(){return o()},get state(){return t()},get key(){return c()},query:n?n(h):xc(h)}}let Hn;function pg(){return Hn}function vg(e,t,n,r={}){const{signal:[s,a],utils:l={}}=e,o=l.parsePath||(V=>V),c=l.renderPath||(V=>V),h=l.beforeLeave||Sc(),u=ja("",r.base||"");if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!s().value&&a({value:u,replace:!0,scroll:!1});const[f,g]=O(!1);let m;const y=(V,X)=>{X.value===v()&&X.state===k()||(m===void 0&&g(!0),Hn=V,m=X,wh(()=>{m===X&&($(m.value),C(m.state),Lh(),A[1](j=>j.filter(K=>K.pending)))}).finally(()=>{m===X&&Oe(()=>{Hn=void 0,V==="navigate"&&R(m),g(!1),m=void 0})}))},[v,$]=O(s().value),[k,C]=O(s().state),w=mg(v,k,l.queryWrapper),_=[],A=O([]),S=N(()=>typeof r.transformUrl=="function"?Gi(t(),r.transformUrl(w.pathname)):Gi(t(),w.pathname)),b=()=>{const V=S(),X={};for(let j=0;j<V.length;j++)Object.assign(X,V[j].params);return X},x=l.paramsWrapper?l.paramsWrapper(b,t):xc(b),I={pattern:u,path:()=>u,outlet:()=>null,resolvePath(V){return ja(u,V)}};return L(le(s,V=>y("native",V),{defer:!0})),{base:I,location:w,params:x,isRouting:f,renderPath:c,parsePath:o,navigatorFactory:P,matches:S,beforeLeave:h,preloadRoute:B,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:A};function E(V,X,j){Ae(()=>{if(typeof X=="number"){X&&(l.go?l.go(X):console.warn("Router integration does not support relative routing"));return}const K=!X||X[0]==="?",{replace:ae,resolve:re,scroll:Q,state:J}={replace:!1,resolve:!K,scroll:!0,...j},pe=re?V.resolvePath(X):ja(K&&w.pathname||"",X);if(pe===void 0)throw new Error(`Path '${X}' is not a routable path`);if(_.length>=cg)throw new Error("Too many redirects");const ve=v();(pe!==ve||J!==k())&&(Jh||h.confirm(pe,j)&&(_.push({value:ve,replace:ae,scroll:Q,state:k()}),y("navigate",{value:pe,state:J})))})}function P(V){return V=V||jt(Ys)||I,(X,j)=>E(V,X,j)}function R(V){const X=_[0];X&&(a({...V,replace:X.replace,scroll:X.scroll}),_.length=0)}function B(V,X){const j=Gi(t(),V.pathname),K=Hn;Hn="preload";for(let ae in j){const{route:re,params:Q}=j[ae];re.component&&re.component.preload&&re.component.preload();const{preload:J}=re;X&&J&&$c(n(),()=>J({params:Q,location:{pathname:V.pathname,search:V.search,hash:V.hash,query:Ac(V),state:null,key:""},intent:"preload"}))}Hn=K}}function $g(e,t,n,r){const{base:s,location:a,params:l}=e,{pattern:o,component:c,preload:h}=r().route,u=N(()=>r().path);c&&c.preload&&c.preload();const f=h?h({params:l,location:a,intent:Hn||"initial"}):void 0;return{parent:t,pattern:o,path:u,outlet:()=>c?i(c,{params:l,location:a,data:f,get children(){return n()}}):n(),resolvePath(m){return ja(s.path(),m,u())}}}const _g=e=>t=>{const{base:n}=t,r=gi(()=>t.children),s=N(()=>Lc(r(),t.base||""));let a;const l=vg(e,s,()=>a,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(l),i(Ic.Provider,{value:l,get children(){return i(bg,{routerState:l,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[N(()=>(a=Rr())&&null),i(yg,{routerState:l,get branches(){return s()}})]}})}})};function bg(e){const t=e.routerState.location,n=e.routerState.params,r=N(()=>e.preload&&Ae(()=>{e.preload({params:n,location:t,intent:pg()||"initial"})}));return i(T,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:s=>i(s,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function yg(e){const t=[];let n;const r=N(le(e.routerState.matches,(s,a,l)=>{let o=a&&s.length===a.length;const c=[];for(let h=0,u=s.length;h<u;h++){const f=a&&a[h],g=s[h];l&&f&&g.route.key===f.route.key?c[h]=l[h]:(o=!1,t[h]&&t[h](),ra(m=>{t[h]=m,c[h]=$g(e.routerState,c[h-1]||e.routerState.base,Wl(()=>r()[h+1]),()=>e.routerState.matches()[h])}))}return t.splice(s.length).forEach(h=>h()),l&&o?l:(n=c[0],c)}));return Wl(()=>r()&&n)()}const Wl=e=>()=>i(T,{get when(){return e()},keyed:!0,children:t=>i(Ys.Provider,{value:t,get children(){return t.outlet()}})}),oe=e=>{const t=gi(()=>e.children);return Fe(e,{get children(){return t()}})};function wg([e,t],n,r){return[e,r?s=>t(r(s)):t]}function kg(e){let t=!1;const n=s=>typeof s=="string"?{value:s}:s,r=wg(O(n(e.get()),{equals:(s,a)=>s.value===a.value&&s.state===a.state}),void 0,s=>(!t&&e.set(s),s));return e.init&&He(e.init((s=e.get())=>{t=!0,r[1](n(s)),t=!1})),_g({signal:r,create:e.create,utils:e.utils})}function Sg(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Cg(e,t){const n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const Ag=new Map;function xg(e=!0,t=!1,n="/_server",r){return s=>{const a=s.base.path(),l=s.navigatorFactory(s.base);let o,c;function h(v){return v.namespaceURI==="http://www.w3.org/2000/svg"}function u(v){if(v.defaultPrevented||v.button!==0||v.metaKey||v.altKey||v.ctrlKey||v.shiftKey)return;const $=v.composedPath().find(S=>S instanceof Node&&S.nodeName.toUpperCase()==="A");if(!$||t&&!$.hasAttribute("link"))return;const k=h($),C=k?$.href.baseVal:$.href;if((k?$.target.baseVal:$.target)||!C&&!$.hasAttribute("state"))return;const _=($.getAttribute("rel")||"").split(/\s+/);if($.hasAttribute("download")||_&&_.includes("external"))return;const A=k?new URL(C,document.baseURI):new URL(C);if(!(A.origin!==window.location.origin||a&&A.pathname&&!A.pathname.toLowerCase().startsWith(a.toLowerCase())))return[$,A]}function f(v){const $=u(v);if(!$)return;const[k,C]=$,w=s.parsePath(C.pathname+C.search+C.hash),_=k.getAttribute("state");v.preventDefault(),l(w,{resolve:!1,replace:k.hasAttribute("replace"),scroll:!k.hasAttribute("noscroll"),state:_?JSON.parse(_):void 0})}function g(v){const $=u(v);if(!$)return;const[k,C]=$;r&&(C.pathname=r(C.pathname)),s.preloadRoute(C,k.getAttribute("preload")!=="false")}function m(v){clearTimeout(o);const $=u(v);if(!$)return c=null;const[k,C]=$;c!==k&&(r&&(C.pathname=r(C.pathname)),o=setTimeout(()=>{s.preloadRoute(C,k.getAttribute("preload")!=="false"),c=k},20))}function y(v){if(v.defaultPrevented)return;let $=v.submitter&&v.submitter.hasAttribute("formaction")?v.submitter.getAttribute("formaction"):v.target.getAttribute("action");if(!$)return;if(!$.startsWith("https://action/")){const C=new URL($,Cc);if($=s.parsePath(C.pathname+C.search),!$.startsWith(n))return}if(v.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const k=Ag.get($);if(k){v.preventDefault();const C=new FormData(v.target,v.submitter);k.call({r:s,f:v.target},v.target.enctype==="multipart/form-data"?C:new URLSearchParams(C))}}$e(["click","submit"]),document.addEventListener("click",f),e&&(document.addEventListener("mousemove",m,{passive:!0}),document.addEventListener("focusin",g,{passive:!0}),document.addEventListener("touchstart",g,{passive:!0})),document.addEventListener("submit",y),He(()=>{document.removeEventListener("click",f),e&&(document.removeEventListener("mousemove",m),document.removeEventListener("focusin",g),document.removeEventListener("touchstart",g)),document.removeEventListener("submit",y)})}}function Tg(e){const t=()=>{const r=window.location.pathname.replace(/^\/+/,"/")+window.location.search,s=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:r+window.location.hash,state:s}},n=Sc();return kg({get:t,set({value:r,replace:s,scroll:a,state:l}){s?window.history.replaceState(eg(l),"",r):window.history.pushState(l,"",r),Cg(decodeURIComponent(window.location.hash.slice(1)),a),js()},init:r=>Sg(window,"popstate",tg(r,s=>{if(s&&s<0)return!n.confirm(s);{const a=t();return!n.confirm(a.value,{state:a.state})}})),create:xg(e.preload,e.explicitLinks,e.actionBase,e.transformUrl),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var Ig=p("<a>");function U(e){e=Fe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=fi(e,["href","state","class","activeClass","inactiveClass","end"]),n=ug(()=>e.href),r=hg(n),s=Qt(),a=N(()=>{const l=n();if(l===void 0)return[!1,!1];const o=zn(l.split(/[?#]/,1)[0]).toLowerCase(),c=decodeURI(zn(s.pathname).toLowerCase());return[e.end?o===c:c.startsWith(o+"/")||c===o,o===c]});return(()=>{var l=Ig();return Lt(l,Fe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!a()[0],[e.activeClass]:a()[0],...t.classList}},link:"",get"aria-current"(){return a()[1]?"page":void 0}}),!1,!1),l})()}function hn(e){const t=pn(),n=Qt(),{href:r,state:s}=e,a=typeof r=="function"?r({navigate:t,location:n}):r;return t(a,{replace:!0,state:s}),null}const $s=Symbol("store-raw"),br=Symbol("store-node"),gn=Symbol("store-has"),Pc=Symbol("store-self");function Mc(e){let t=e[Kt];if(!t&&(Object.defineProperty(e,Kt,{value:t=new Proxy(e,Pg)}),!Array.isArray(e))){const n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++){const l=n[s];r[l].get&&Object.defineProperty(e,l,{enumerable:r[l].enumerable,get:r[l].get.bind(t)})}}return t}function An(e){let t;return e!=null&&typeof e=="object"&&(e[Kt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function Pr(e,t=new Set){let n,r,s,a;if(n=e!=null&&e[$s])return n;if(!An(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let l=0,o=e.length;l<o;l++)s=e[l],(r=Pr(s,t))!==s&&(e[l]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const l=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,h=l.length;c<h;c++)a=l[c],!o[a].get&&(s=e[a],(r=Pr(s,t))!==s&&(e[a]=r))}return e}function Za(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function da(e,t,n){if(e[t])return e[t];const[r,s]=O(n,{equals:!1,internal:!0});return r.$=s,e[t]=r}function Eg(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===Kt||t===br||(delete n.value,delete n.writable,n.get=()=>e[Kt][t]),n}function Dc(e){hs()&&da(Za(e,br),Pc)()}function Lg(e){return Dc(e),Reflect.ownKeys(e)}const Pg={get(e,t,n){if(t===$s)return e;if(t===Kt)return n;if(t===us)return Dc(e),n;const r=Za(e,br),s=r[t];let a=s?s():e[t];if(t===br||t===gn||t==="__proto__")return a;if(!s){const l=Object.getOwnPropertyDescriptor(e,t);hs()&&(typeof a!="function"||e.hasOwnProperty(t))&&!(l&&l.get)&&(a=da(r,t,a)())}return An(a)?Mc(a):a},has(e,t){return t===$s||t===Kt||t===us||t===br||t===gn||t==="__proto__"?!0:(hs()&&da(Za(e,gn),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:Lg,getOwnPropertyDescriptor:Eg};function Nt(e,t,n,r=!1){if(!r&&e[t]===n)return;const s=e[t],a=e.length;n===void 0?(delete e[t],e[gn]&&e[gn][t]&&s!==void 0&&e[gn][t].$()):(e[t]=n,e[gn]&&e[gn][t]&&s===void 0&&e[gn][t].$());let l=Za(e,br),o;if((o=da(l,t,s))&&o.$(()=>n),Array.isArray(e)&&e.length!==a){for(let c=e.length;c<a;c++)(o=l[c])&&o.$();(o=da(l,"length",a))&&o.$(e.length)}(o=l[Pc])&&o.$()}function Rc(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];Nt(e,s,t[s])}}function Mg(e,t){if(typeof t=="function"&&(t=t(e)),t=Pr(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const s=t[n];e[n]!==s&&Nt(e,n,s)}Nt(e,"length",r)}else Rc(e,t)}function Qr(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const l=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)Qr(e,[r[c]].concat(t),n);return}else if(o&&l==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&Qr(e,[c].concat(t),n);return}else if(o&&l==="object"){const{from:c=0,to:h=e.length-1,by:u=1}=r;for(let f=c;f<=h;f+=u)Qr(e,[f].concat(t),n);return}else if(t.length>1){Qr(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let a=t[0];typeof a=="function"&&(a=a(s,n),a===s)||r===void 0&&a==null||(a=Pr(a),r===void 0||An(s)&&An(a)&&!Array.isArray(a)?Rc(s,a):Nt(e,r,a))}function We(...[e,t]){const n=Pr(e||{}),r=Array.isArray(n),s=Mc(n);function a(...l){Oe(()=>{r&&l.length===1?Mg(n,l[0]):Qr(n,l)})}return[s,a]}const _s=Symbol("store-root");function hr(e,t,n,r,s){const a=t[n];if(e===a)return;const l=Array.isArray(e);if(n!==_s&&(!An(e)||!An(a)||l!==Array.isArray(a)||s&&e[s]!==a[s])){Nt(t,n,e);return}if(l){if(e.length&&a.length&&(!r||s&&e[0]&&e[0][s]!=null)){let h,u,f,g,m,y,v,$;for(f=0,g=Math.min(a.length,e.length);f<g&&(a[f]===e[f]||s&&a[f]&&e[f]&&a[f][s]===e[f][s]);f++)hr(e[f],a,f,r,s);const k=new Array(e.length),C=new Map;for(g=a.length-1,m=e.length-1;g>=f&&m>=f&&(a[g]===e[m]||s&&a[g]&&e[m]&&a[g][s]===e[m][s]);g--,m--)k[m]=a[g];if(f>m||f>g){for(u=f;u<=m;u++)Nt(a,u,e[u]);for(;u<e.length;u++)Nt(a,u,k[u]),hr(e[u],a,u,r,s);a.length>e.length&&Nt(a,"length",e.length);return}for(v=new Array(m+1),u=m;u>=f;u--)y=e[u],$=s&&y?y[s]:y,h=C.get($),v[u]=h===void 0?-1:h,C.set($,u);for(h=f;h<=g;h++)y=a[h],$=s&&y?y[s]:y,u=C.get($),u!==void 0&&u!==-1&&(k[u]=a[h],u=v[u],C.set($,u));for(u=f;u<e.length;u++)u in k?(Nt(a,u,k[u]),hr(e[u],a,u,r,s)):Nt(a,u,e[u])}else for(let h=0,u=e.length;h<u;h++)hr(e[h],a,h,r,s);a.length>e.length&&Nt(a,"length",e.length);return}const o=Object.keys(e);for(let h=0,u=o.length;h<u;h++)hr(e[o[h]],a,o[h],r,s);const c=Object.keys(a);for(let h=0,u=c.length;h<u;h++)e[c[h]]===void 0&&Nt(a,c[h],void 0)}function Jt(e,t={}){const{merge:n,key:r="id"}=t,s=Pr(e);return a=>{if(!An(a)||!An(s))return s;const l=hr(s,{[_s]:a},_s,n,r);return l===void 0?a:l}}const Nc=Zt(),qs=()=>jt(Nc),Oc=Zt(),tt=()=>jt(Oc),Fc=Zt(),zs=()=>jt(Fc),Bc=Zt(),ce=()=>jt(Bc),Uc=Zt(),en=()=>jt(Uc),Vc=Zt(),Ws=()=>jt(Vc),Gc=Zt(),Ks=()=>jt(Gc),Hc=Zt(),jc=()=>jt(Hc),Js=Zt(),vn=()=>jt(Js);var Dg=p("<div class=cp-install-pwa-container>Install as Progressive Web App to get more screen space.<button>Install</button><button>Not now");function Rg(){const{isTouch:e,isPWA:t}=en(),[n,r]=O(!1),[s,a]=O(!1);let l;return window.addEventListener("beforeinstallprompt",o=>{l=o,r(!0)}),i(T,{get when(){return N(()=>!!(n()&&e()))()&&!t()},get children(){var o=Dg(),c=o.firstChild,h=c.nextSibling,u=h.nextSibling;return d(o,i(T,{get when(){return s()},children:" Failed to install"}),h),h.$$click=async()=>{if(l!==null){l.prompt();const{outcome:f}=await l.userChoice;if(f==="accepted")return l=null,r(!1)}a(!0)},u.$$click=()=>r(!1),o}})}$e(["click"]);const Zn=location.hostname==="localhost",zt={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};zt.flavorTexts=mi(zt);const Wn={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};Wn.flavorTexts=mi(Wn);const ua={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};ua.flavorTexts=mi(ua);const Sn={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};Sn.flavorTexts=mi(Sn);const Yc={CN:{flavorText:"China"},JP:{flavorText:"Japan"},KR:{flavorText:"South Korea"},TW:{flavorText:"Taiwan"}},Xs={anime:{api:"ANIME",flavorText:"Anime"},comic:{api:"COMIC",flavorText:"Comic"},doujinshi:{api:"DOUJINSHI",flavorText:"Doujinshi"},game:{api:"GAME",flavorText:"Game"},light_novel:{api:"LIGHT_NOVEL",flavorText:"Light Novel"},live_action:{api:"LIVE_ACTION",flavorText:"Live Action"},manga:{api:"MANGA",flavorText:"Manga"},multimedia_project:{api:"MULTIMEDIA_PROJECT",flavorText:"Multimedia Project"},novel:{api:"NOVEL",flavorText:"Novel"},original:{api:"ORIGINAL",flavorText:"Original"},other:{api:"OTHER",flavorText:"Other"},picture_book:{api:"PICTURE_BOOK",flavorText:"Picture Book"},video_game:{api:"VIDEO_GAME",flavorText:"Video Game"},visual_novel:{api:"VISUAL_NOVEL",flavorText:"Visual Novel"},web_novel:{api:"WEB_NOVEL",flavorText:"Web Novel"}};function mi(e){return Object.values(e).reduce((t,n)=>Object.values(n).reduce((r,s)=>Object.entries(s).reduce((a,[l,o])=>(a[l]=o.flavorText,a),r),t),{})}const Pn="anilist",Qn="jikan",qc="animethemes",Kl="LOB_DEV_BRANCH",bs="ani",Qa="mal",pi="only-if-cached",Ng="default",Og="fetch-once",Fg="reload",zc="no-store",ya="anime",Wc="manga",Bg="ANIME",Kc="Japanese",Jc="Not yet aired",Ug="Finished Airing",Vg="Currently Airing",Gg="Publishing",Jl="Finished",Hg="Discontinued",jg="On Hiatus",ha=e=>typeof e=="object"&&e,vi=(e,...t)=>{rd(t.length<1,"Give more objects");for(const n of t)Xc(e,n);return e},Xc=(e,t)=>{for(const n in t)e[n]??(e[n]=t[n]),ha(e[n])&&ha(t[n])?Xc(e[n],t[n]):e[n]=t[n]},Yg=(e,...t)=>{rd(t.length<1,"Give more objects");for(const n of t)Zc(e,n);return e},Zc=(e,t)=>{for(const n in t){if(n in e)ha(e[n])||(e[n]=t[n]);else continue;ha(t[n])&&Zc(e[n],t[n])}},F=(e,t="Not true")=>{if(!e)throw new Error(t)},Qc=(e,t="Not false")=>F(!e,t),qg=(e="Assert unreachable")=>F(!1,e),It=(e,t="Value",n="")=>F(typeof e=="string",t+" is not type of string. "+n),fn=(e,t="Value",n="")=>F(typeof e=="function",t+" is not type of function. "+n),ed=(e,t="Value",n="")=>F(Number.isInteger(e),t+" is not type of integer. "+n),$i=(e,t="Value",n="")=>{const r=t+" is not integer. "+n;F(typeof e=="string"||Number.isInteger(e),r),F(e&&Number.isInteger(+e),r)},zg=(e,t="Value is not type Array",n)=>{_i(Array.isArray(e),t)},td=(e,t="Value is not type String",n)=>{_i(typeof e=="string",t)},nd=(e,t="Value is not type Integer",n)=>{_i(Number.isInteger(e),t)},Wg=(e,t="Value is not thruthy",n)=>{_i(e,t)},rd=(e,t="Value is not falsy",n)=>{Kg(e,t)},Kg=(e,t,n)=>{e&&ad(t)},_i=(e,t,n)=>{e||ad(t)},ad=(e,t)=>{throw e??(e="Assertion failed."),new Error(e)},Mn=e=>Array.isArray(e);function Xt(e,t){if(e){if(Mn(e))return Object.fromEntries(e.map(n=>[n,!0]))}else return t||null;return{[e]:!0}}function Ke(e){return Mn(e)?e:e?[e]:[]}const Jg=(...e)=>{const t=[];for(const n of e)t.push(...Ke(n));return t},Xl=(e,t)=>(e=Ke(e),e.includes(t)),Xg=(e,...t)=>Ke(e).filter(n=>!t.includes(n)),Zl=(e,t,n)=>(e=Ke(e),(n===void 0?e.includes(t):n)?e=Xg(e,t):e.push(t),e);function vr(e){return new Set(Ke(e))}function Zg(e){F(Mn(e),"Not array");const t=new Map;return e.forEach(n=>t.set(n.toLowerCase(),n)),Array.from(t.values())}function ea(e,t){return e===t?!0:typeof e!=typeof t?!1:Mn(e)?e.length===t.length&&e.every((n,r)=>ea(n,t[r])):!1}function qt(e){return Mn(e)?e[0]:e}function id(e,t,n=0,r=e.length-1){for(;n<=r;){const s=(r+n)/2|0,a=t(e[s],s,e);if(a===0)return s;a<0?r=s-1:n=s+1}return-1}function yr(e,t,n=0,r=e.length-1){let s=null;for(;n<=r;){const l=(r+n)/2|0;if(s=t(e[l],l,e),s===0)return l;s<0?r=l-1:n=l+1}return s===null?0:((r+n)/2|0)==e.length-1?s<0?e.length-1:e.length:s<0?r+1:n-1}const Qg=(e,t,n)=>(fn(t),!Mn(e)||e.length===0?n:e.find(t)??e[0]??n),ef=(e,t,n)=>!Mn(e)||e.length===0?n:e.at(t%e.length);function ga(e,t){if(Mn(e))return e[Math.round((e.length-1)*t)]}const Ne=e=>e!==1?"s":"",Je=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Zs=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},tf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"China";case"TW":return"Taiwan";case"KR":return"South Korea";default:return"Japan"}},Mr=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Je(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}};function nf(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Je(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:return console.error("Unknown status"),e}}const ye=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Ql=e=>{if(e!=null)return F(typeof e=="number","Number is not typeof number"),Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e)},Xe=e=>(F(e!=null,"No title given"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Ge=e=>(F(e.type,"type is missing"),F("id"in e,"id is missing"),"/ani/"+e.type.toLowerCase()+"/"+e.id+"/"+Xe(e.title.userPreferred)),ei=e=>{if(F("year"in e,"No year found"),F("month"in e,"No month found"),F("day"in e,"No day found"),!e.year&&!e.month&&!e.day)return"";if(e.year&&!e.month&&!e.day)return e.year.toString();const t={};return e.year&&(t.year="numeric"),e.month&&(t.month="short"),e.day&&(t.day="numeric"),new Date(e.year||1970,e.month-1||0,e.day||1).toLocaleDateString("us-US",t)},sd=e=>{const t=new Date(e),n={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString("us-US",n)};function Aa(e,t){t&&e(Ge(t))}const Qs=e=>typeof e=="function",ld=e=>Qs(e)?e():e,rf=(e,t)=>{fn(e);const n=[];for(const r of t){const s=ld(r);if(s===void 0)return;n.push(s)}return e(...n)},Me=(e,...t)=>N(()=>rf(e,t)),af=[pi,Ng,Og,Fg,zc],xn=e=>N(()=>{for(const t of af)if(ld(e[t]))return t});class sf{constructor(t={}){this.expiresInSeconds=t.expiresInSeconds,this.fetchOnDebug=t.fetchOnDebug||!1,this.storeName=t.storeName||"",this.type=t.type||"default",this.saveToSessionStorage=t.saveToSessionStorage,F(typeof t=="object","Settings must be object"),F(!t.active||typeof t.active=="function","settings.active should a signal"),F(t.type==="no-store"||Number.isInteger(t.expiresInSeconds),"Give explicit expiration time. 0 if the data never expires"),F(t.type==="no-store"||t.expiresInSeconds>0,"Expiration time should be more than 0"),F(t.type!=="no-store"||!t.storeName,"StoreName is not used because cache type is no-store"),F(!t.saveToSessionStorage||typeof t.saveToSessionStorage=="function","saveToSessionStorage is not function")}}class el{constructor(t,n,r){F(t,"URL is missing"),this.url=t,this.options=n,this.formatResponse=r,this.settings=new sf({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365})}get cacheKey(){var t;return`${this.url}${((t=JSON.stringify(this.options))==null?void 0:t.replaceAll('"',""))||""}${this.formatResponse||""}`}}const bi=(e,t)=>(e&&(e.settings.type=t),e),lf=(e,t)=>(Sf(e.url),of(e,t).finally(()=>Cf(e.url))),of=(e,t)=>{const n={...e.options||{},signal:t};if(n.body&&(n.body=JSON.stringify(e.options.body)),n.cache??(n.cache="default"),Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",n);case 2:return fetch("https://http.codes/500",n);case 3:return fetch("https://http.codes/cors",n)}else return e.delay?new Promise((r,s)=>{fetch(e.url,n).then(a=>setTimeout(()=>r(a),e.delay)).catch(s)}):fetch(e.url,n)},xa={},Ta={};let Hi=0;const cf=async(e,t)=>{var s,a,l;try{const{resolve:o,promise:c}=Promise.withResolvers();for(let h=0;h<3&&!t.aborted;h++){kf(e.url)&&(Ea(e.url,o),await c);try{var n=await(xa[s=e.cacheKey]??(xa[s]=lf(e,t)))}catch{if(t.aborted)return null}finally{delete xa[e.cacheKey]}const u=yf(e.url,(n==null?void 0:n.status)||"cors");if((n==null?void 0:n.status)===429&&n.headers.get("Retry-After")){Ea(e.url,o);const f=parseInt(n.headers.get("Retry-After"));await new Promise(g=>setTimeout(g,f*1e3));continue}else if((n==null?void 0:n.status)===400&&Hi<3){if(Ea(e.url,o),(await n.json()).errors.some(g=>g.message==="Invalid token")){Hi++,await new Promise(g=>setTimeout(g,3e3));continue}}else if(u){Ea(e.url,o),await new Promise(f=>setTimeout(f,u));continue}else if(!(n!=null&&n.ok))return null;e.url.includes(Pn)&&(Hi=0);try{var r=await(Ta[a=e.cacheKey]??(Ta[a]=n.json()))}catch(f){return console.error(f),null}finally{delete Ta[e.cacheKey]}return((l=e.formatResponse)==null?void 0:l.call(e,r))||r}}finally{wf(e.url)}return null},wa=(e,t,n=1)=>{const r=[];let s=null,a=!1;async function l(...c){r.push(async()=>{r.shift(),a=!0,await e(...c),a=!1,o(t)}),r.length==n+1&&r.shift(),!a&&(s===null?o():o(t))}return l.bufferSize=()=>r.length,l;function o(c){const h=r[0];clearTimeout(s),s=null,h&&(c?s=setTimeout(h,c):(a=!0,h()))}},od=e=>{let t;const n=(r,...s)=>{clearTimeout(t),t=setTimeout(()=>e(...s),r)};return He(()=>clearTimeout(t)),n},df=e=>{const t=new Date;return t.setMilliseconds(t.getMilliseconds()+e),t},uf=e=>df(e*1e3),fa=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},hf=e=>!isNaN(e)&&typeof e=="number",gf=(e,t)=>{const n=Number(e);return hf(n)?n:t},ff=(e,t)=>Math.max(e??t,t??e),Ia=(e,t,n)=>e+n*(t-e),eo=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",mf=e=>{if(!(e!=null&&e.length))return"";switch(e){case Ug:case Jl:return Jl;case Jc:return"Not yet released";case Vg:case Gg:return"Releasing";case Hg:return"Cancelled";case jg:return"On hiatus";default:return console.error("Unknown media format"),e}},cd=(e,t)=>"/mal/"+e+"/"+t.mal_id+"/"+Kn(t.title),pf=e=>"/mal/character/"+e.mal_id+"/"+Kn(e.name),dd=e=>{It(e.type,"Media type"),ed(e.id,"Media id");const t="/ani/"+e.type.toLowerCase()+"/"+e.id;return e.title.userPreferred?t+"/"+Kn(e.title.userPreferred):t},vf=()=>location.hostname==="kassu11.github.io"?24951:location.port==5173?7936:location.port==5174?31649:-1,Kn=e=>(It(e,"title"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),$f=e=>e!==1?"s":"",Dr=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",_f=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},bf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"ANIME":case"COMIC":case"DOUJINSHI":case"GAME":case"MANGA":case"NOVEL":case"ORIGINAL":case"OTHER":return Dr(e);case"LIGHT_NOVEL":case"LIVE_ACTION":case"MULTIMEDIA_PROJECT":case"PICTURE_BOOK":case"VISUAL_NOVEL":case"VIDEO_GAME":case"WEB_NOVEL":return Dr(e.replace("_"," "));default:return console.error("Unknown media format"),e}},ys=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Dr(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}},ud=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CANCELLED":case"FINISHED":case"HIATUS":case"NOT_YET_RELEASED":case"RELEASING":return Dr(e.replaceAll("_"," "));default:return console.error("Unknown media format"),e}},yf=(e,t)=>{if(e.includes(Pn))switch(t){case 429:return 25e3;case 500:return 3e3;case"cors":return 4e4}if(e.includes(Qn))switch(t){case 429:return 1e3}if(e.includes(qc))switch(t){case 429:return 25e3}},Ea=(e,t)=>{e.includes(Pn)?Dm(t):e.includes(Qn)&&Fm(t)},wf=e=>{e.includes(Pn)?Rm():e.includes(Qn)&&Bm()},kf=e=>{if(e.includes(Pn))return Ot!==null;if(e.includes(Qn))return Ft!==null},Sf=e=>{e.includes(Pn)?Mm():e.includes(Qn)&&Om()},Cf=e=>{e.includes(Pn)?Nm():e.includes(Qn)&&Um()},er=(e,t,n={},r)=>{F(t.length>10,"Query must be above of length 10");const s={"Content-Type":"application/json"};return e&&(s.Authorization="Bearer "+e),new el("https://graphql.anilist.co",{method:"POST",headers:s,body:{query:t,variables:n}},r)},tl=(e,t,n={},r)=>{const s=er(e,t,n,r);return bi(s,zc)},Tn=(e,t)=>new el(e,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},t),nl=e=>e.data.Page,hd=(e,t,n=1)=>tl(e,Ld,{...t,page:n},nl),Af=(e,t)=>{const n=hd(e,t,"pageless");return bi(n,pi)},xf=({token:e,id:t,isMalId:n,type:r})=>n?gd(e,r,t):er(e,rl,{id:t},s=>s.data.Media),tn=(e,t)=>{var r,s;F(t.id_in||t.idMal_in,"Missing list for ids");const n=((r=t.id_in)==null?void 0:r.length)||((s=t.idMal_in)==null?void 0:s.length);if(n)return er(e,im(n),t,a=>Object.values(a.data).map(l=>l.media).flat())},Tf=(e,t,n=1)=>er(e,Bf,{id:t,page:n},r=>r.data.Media.recommendations),gd=(e,t,n)=>er(e,rl,{idMal:n,type:t.toUpperCase()},r=>r.data.Media),If=({token:e,id:t,...n})=>{if(t)return er(e,Id,{id:t,...n},nl)},Ef=e=>{switch(e){case"airing":return["AIRING"];case"activity":return["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"];case"forum":return["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"];case"follows":return["FOLLOWING"];case"media":return["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"];case"all":return;default:qg("Unknown notification type")}},fd=(e,t,n=1)=>{const r=Ef(t);return tl(e,Vn,{page:n,types:r},nl)},Lf=(e,t)=>{const n=fd(e,t,"pageless");return bi(n,pi)},md=(e,t,n=1)=>tl(e,Ed,{id:t,page:n},r=>r.data.Media),Pf=(e,t)=>{const n=md(e,t,"pageless");return bi(n,pi)},Mf=({name:e,type:t,token:n})=>(F(e,"Name is missing"),er(n,ws,{userName:e.toLowerCase(),type:t.toUpperCase()},r=>r.data.MediaListCollection)),pd=(e,t)=>{switch(It(e,"type"),$i(t,"id"),e){case ya:return Tn(bd(t),n=>n.data);case Wc:return Tn(yd(t),n=>n.data)}},vd=(e,t)=>{switch(It(e,"type"),$i(t,"id"),e){case ya:return Tn(wd(t),n=>n.data);case Wc:return Tn(kd(t),n=>n.data)}},$d=(e,t)=>{if(It(e,"type"),$i(t,"id"),e===ya)return Tn(Sd(t),n=>n.data)},Df=e=>($i(e,"id"),Tn(Hf(e),t=>t.data)),to=e=>{var t,n;return((n=(t=e.anime)==null?void 0:t[0])==null?void 0:n.animethemes)??[]},Rf=({id:e,api:t,type:n})=>{if(n===ya)switch(t){case bs:return Tn(_d(e),to);case Qa:return Tn(Vf(e),to)}};class Nf{constructor(t,n,r){F(t,"Missing cacheKey"),F(r,"Don't cache empty data"),F(n,"Expiration date is missing"),this.data=r,this.cacheKey=t,this.expires=uf(n)}}const rl=be`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
  Media(id: $id, idMal: $idMal, type: $type, isAdult: $isAdult) {
    id
    idMal
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
    }
    bannerImage
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    description
    season
    seasonYear
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    synonyms
    source(version: 3)
    isAdult
    isLocked
    meanScore
    averageScore
    popularity
    favourites
    isFavouriteBlocked
    hashtag
    countryOfOrigin
    isLicensed
    isFavourite
    isRecommendationBlocked
    isFavouriteBlocked
    isReviewBlocked
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    relations {
      edges {
        id
        relationType(version: 2)
        node {
          id
          title {
            userPreferred
          }
          format
          type
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
    characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
      edges {
        id
        role
        name
        voiceActors(sort: [RELEVANCE, ID]) {
          id
          name {
            userPreferred
          }
          language: languageV2
          image {
            large
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
    staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
      edges {
        id
        role
        node {
          id
          name {
            userPreferred
          }
          language: languageV2
          image {
            large
          }
        }
      }
    }
    studios {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
      }
      nodes {
        id
        summary
        rating
        ratingAmount
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
    recommendations(perPage: 7, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
      }
      nodes {
        id
        rating
        userRating
        mediaRecommendation {
          id
          title {
            userPreferred
          }
          averageScore
          format
          type
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
    externalLinks {
      id
      site
      url
      type
      language
      color
      icon
      notes
      isDisabled
    }
    streamingEpisodes {
      site
      title
      thumbnail
      url
    }
    trailer {
      id
      site
    }
    rankings {
      id
      rank
      type
      format
      year
      season
      allTime
      context
    }
    tags {
      id
      name
      description
      rank
      isMediaSpoiler
      isGeneralSpoiler
      userId
    }
    mediaListEntry {
      id
      progress
      progressVolumes
      repeat
      score
      status
    }
    stats {
      statusDistribution {
        status
        amount
      }
      scoreDistribution {
        score
        amount
      }
    }
  }
}`,Of=be`query ($page: Int, $id: Int, $type: LikeableType) {
  Page(page: $page, perPage: 5) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    likes(likeableId: $id, type: $type) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,Ff=be`query (
  $page: Int = 1
  $search: String
  $sort: [UserSort] = SEARCH_MATCH
) {
  Page(page: $page, perPage: 20) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    users(search: $search, sort: $sort) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,Bf=be`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    title {
      userPreferred
    }
    recommendations(page: $page, sort: [RATING_DESC, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      nodes {
        id
        rating
        userRating
        mediaRecommendation {
          id
          title {
            userPreferred
          }
          format
          type
          averageScore
          status(version: 2)
          bannerImage
          coverImage {
            large
          }
        }
        user {
          id
          name
          avatar {
            large
          }
        }
      }
    }
  }
}`,Uf=be`mutation (
  $mediaId: Int
  $mediaRecommendationId: Int
  $rating: RecommendationRating
) {
  SaveRecommendation(
    mediaId: $mediaId
    mediaRecommendationId: $mediaRecommendationId
    rating: $rating
  ) {
    id
    rating
    userRating
    mediaRecommendation {
      id
      title {
        userPreferred
      }
      format
      type
      status(version: 2)
      bannerImage
      coverImage {
        large
      }
    }
  }
}`,_d=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Vf=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Gf=e=>`https://api.animethemes.moe/artist/${e}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`,bd=e=>`https://api.jikan.moe/v4/anime/${e}/full`,yd=e=>`https://api.jikan.moe/v4/manga/${e}/full`,wd=e=>`https://api.jikan.moe/v4/anime/${e}/characters`,kd=e=>`https://api.jikan.moe/v4/manga/${e}/characters`,Hf=e=>`https://api.jikan.moe/v4/characters/${e}/full`,Sd=e=>`https://api.jikan.moe/v4/anime/${e}/staff`,jf=(e,t)=>`https://api.jikan.moe/v4/${e}?${t}`,Yf=(e,t)=>`https://api.jikan.moe/v4/seasons/${e}?${t}`,qf=e=>`https://api.jikan.moe/v4/genres/${e}`,zf=be`query ($id: Int, $page: Int) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activityReplies(activityId: $id) {
      id
      userId
      text
      createdAt
      activityId
      isLiked
      likeCount
      user {
        id
        name
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}`,Wf=be`query ($id: Int) {
  Activity(id: $id) {
    ... on ListActivity {
      id
      type
      replyCount
      status
      progress
      isLocked
      isSubscribed
      isLiked
      likeCount
      createdAt
      user {
        id
        name
        donatorTier
        donatorBadge
        avatar {
          large
        }
      }
      media {
        id
        type
        status(version: 2)
        isAdult
        title {
          userPreferred
        }
        bannerImage
        coverImage {
          large
        }
      }
    }
    ... on TextActivity {
      id
      type
      text
      replyCount
      isLocked
      isSubscribed
      isLiked
      likeCount
      createdAt
      user {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
    }
    ... on MessageActivity {
      id
      type
      message
      replyCount
      isLocked
      isPrivate
      isSubscribed
      isLiked
      likeCount
      createdAt
      user: recipient {
        id
        name
        avatar {
          large
        }
      }
      messenger {
        id
        name
        donatorTier
        donatorBadge
        moderatorRoles
        avatar {
          large
        }
      }
    }
  }
}`,Vn=be`query ($page: Int, $types: [NotificationType]) {
  Page(page: $page, perPage: 15) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    notifications(type_in: $types, resetNotificationCount: true) {
      ... on AiringNotification {
        id
        type
        episode
        contexts
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        createdAt
      }
      ... on RelatedMediaAdditionNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        createdAt
      }
      ... on FollowingNotification {
        id
        type
        context
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityMessageNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityMentionNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplyNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplySubscribedNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityLikeNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ActivityReplyLikeNotification {
        id
        type
        context
        activityId
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentMentionNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentReplyNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentSubscribedNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadCommentLikeNotification {
        id
        type
        context
        commentId
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on ThreadLikeNotification {
        id
        type
        context
        thread {
          id
          title
        }
        user {
          id
          name
          avatar {
            large
          }
        }
        createdAt
      }
      ... on MediaDataChangeNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        reason
        createdAt
      }
      ... on MediaMergeNotification {
        id
        type
        context
        media {
          id
          type
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        deletedMediaTitles
        reason
        createdAt
      }
      ... on MediaDeletionNotification {
        id
        type
        context
        deletedMediaTitle
        reason
        createdAt
      }
    }
  }
}`,Cd=e=>be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        formats {
          format
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        statuses {
          status
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        scores {
          score
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        lengths {
          length
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        releaseYears {
          releaseYear
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        startYears {
          startYear
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
        countries {
          country
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,Kf=Cd("anime"),Jf=Cd("manga"),Ad=e=>be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        genres {
          genre
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,Xf=Ad("manga"),Zf=Ad("anime"),xd=e=>be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        tags {
          tag {
            id
            name
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,Qf=xd("manga"),em=xd("anime"),tm=be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      anime {
        studios {
          studio {
            id
            name
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,nm=be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      anime {
        voiceActors {
          voiceActor {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
          characterIds
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,Td=e=>be`query ($name: String) {
  User(name: $name) {
    id
    name
    statistics {
      ${e} {
        staff {
          staff {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
          count
          meanScore
          minutesWatched
          chaptersRead
          mediaIds
        }
      }
    }
  }
}`,rm=Td("manga"),am=Td("anime"),im=e=>be`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
  ${[...Array(Math.ceil(e/50))].map((t,n)=>`page${n+1}: Page(page: ${n+1}) {
      media(type: $type, id_in: $id_in, idMal_in: $idMal_in) {
        ...media
      }
    }`).join(" ")}
}

fragment media on Media {
  id
  idMal
  type
  bannerImage
  title {
    userPreferred
  }
  coverImage {
    large
  }
}`,sm=e=>be`query ($ids: [Int]) {
  ${[...Array(Math.ceil(e.length/50))].map((t,n)=>`page${n+1}: Page(page: ${n+1}) {
      characters(id_in: $ids) {
        ...characters
      }
    }`).join(" ")}
}

fragment characters on Character {
  id
  name {
    userPreferred
  }
  image {
    large
  }
}`,lm=be`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,om=be`query ($id: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    followers(userId: $id, sort: USERNAME) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,cm=be`query ($id: Int!, $page: Int) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    following(userId: $id, sort: USERNAME) {
      id
      name
      avatar {
        large
      }
    }
  }
}`,Id=be`query ($id: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
      id
      status
      repeat
      score
      progress
      progressVolumes
      user {
        id
        name
        avatar {
          large
        }
        mediaListOptions {
          scoreFormat
        }
      }
    }
  }
}`,dm=be`mutation (
  $animeIds: [Int]
  $mangaIds: [Int]
  $characterIds: [Int]
  $staffIds: [Int]
  $studioIds: [Int]
  $animeOrder: [Int]
  $mangaOrder: [Int]
  $characterOrder: [Int]
  $staffOrder: [Int]
  $studioOrder: [Int]
) {
  UpdateFavouriteOrder(
    animeIds: $animeIds
    mangaIds: $mangaIds
    characterIds: $characterIds
    staffIds: $staffIds
    studioIds: $studioIds
    animeOrder: $animeOrder
    mangaOrder: $mangaOrder
    characterOrder: $characterOrder
    staffOrder: $staffOrder
    studioOrder: $studioOrder
  ) {
    anime {
      pageInfo {
        total
      }
    }
  }
}`,um=be`query (
  $id: Int
  $name: String
  $page: Int
) {
  User(id: $id, name: $name) {
    id
    name
    favourites {
      anime(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      manga(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      characters(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staff(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      studios(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          favouriteOrder
          node {
            id
            name
          }
        }
      }
    }
  }
}`,ws=be`query ($userId: Int, $userName: String, $type: MediaType) {
  MediaListCollection(userId: $userId, userName: $userName, type: $type) {
    lists {
      name
      isCustomList
      isCompletedList: isSplitCompletedList
      entries {
        ...mediaListEntry
      }
    }
    user {
      id
      name
      avatar {
        large
      }
      mediaListOptions {
        scoreFormat
        rowOrder
        animeList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
        }
        mangaList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
        }
      }
    }
  }
}
fragment mediaListEntry on MediaList {
  status
  score
  progress
  progressVolumes
  repeat
  priority
  private
  hiddenFromStatusLists
  customLists
  advancedScores
  notes
  updatedAt
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  media {
    id
    idMal
    synonyms
    title {
      userPreferred
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      color
    }
    type
    season
    seasonYear
    format
    status(version: 2)
    episodes
    volumes
    chapters
    averageScore
    popularity
    isAdult
    countryOfOrigin
    genres
    bannerImage
    tags {
      name
      rank
      isMediaSpoiler
      isGeneralSpoiler
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
    startDate {
      year
      month
      day
    }
  }
}`,Ed=be`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    idMal
    countryOfOrigin,
    characters(page: $page, sort: [ROLE, RELEVANCE, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        role
        name
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
  }
}`,hm=be`query media($id: Int, $page: Int) {
  Media(id: $id) {
    id
    idMal
    staff(page: $page, sort: [RELEVANCE, ID]) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        role
        node {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
  }
}`,gm=be`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,fm=be`mutation (
  $ANIME: Int
  $MANGA: Int
  $CHARACTER: Int
  $STAFF: Int
  $STUDIO: Int
) {
  ToggleFavourite(
    animeId: $ANIME
    mangaId: $MANGA
    characterId: $CHARACTER
    staffId: $STAFF
    studioId: $STUDIO
  ) {
    anime {
      pageInfo {
        total
      }
    }
    manga {
      pageInfo {
        total
      }
    }
    characters {
      pageInfo {
        total
      }
    }
    staff {
      pageInfo {
        total
      }
    }
    studios {
      pageInfo {
        total
      }
    }
  }
}`,mm=be`mutation ($id: Int, $type: LikeableType) {
  ToggleLike: ToggleLikeV2(id: $id, type: $type) {
    ... on ListActivity {
      id
      likeCount
      isLiked
    }
    ... on MessageActivity {
      id
      likeCount
      isLiked
    }
    ... on TextActivity {
      id
      likeCount
      isLiked
    }
    ... on ActivityReply {
      id
      likeCount
      isLiked
    }
    ... on Thread {
      id
      likeCount
      isLiked
    }
    ... on ThreadComment {
      id
      likeCount
      isLiked
    }
  }
}`,Ld=be`query (
  $isFollowing: Boolean = true
  $hasReplies: Boolean = false
  $activityType: ActivityType
  $page: Int
) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(
      isFollowing: $isFollowing
      type: $activityType
      hasRepliesOrTypeText: $hasReplies
      type_in: [TEXT, ANIME_LIST, MANGA_LIST]
      sort: ID_DESC
    ) {
      ... on TextActivity {
        id
        userId
        type
        replyCount
        text
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
      ... on ListActivity {
        id
        userId
        type
        status
        progress
        replyCount
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user {
          id
          name
          donatorTier
          donatorBadge
          avatar {
            large
          }
        }
        media {
          id
          type
          status
          isAdult
          title {
            userPreferred
          }
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
  }
}`,no=be`query ($userId: Int, $type: MediaType, $perPage: Int) {
  Page(perPage: $perPage) {
    mediaList(
      userId: $userId
      type: $type
      status_in: [CURRENT, REPEATING]
      sort: UPDATED_TIME_DESC
    ) {
      id
      status
      score
      progress
      progressVolumes
      media {
        id
        type
        status(version: 2)
        format
        episodes
        chapters
        bannerImage
        title {
          userPreferred
        }
        coverImage {
          large
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
}`,pm=be`query ($userId: Int, $statusIn: [MediaListStatus]) {
  anime: MediaListCollection(userId: $userId type: ANIME status_in: $statusIn sort: UPDATED_TIME_DESC) {
    ...mediaListCollection
  }
  manga: MediaListCollection(userId: $userId type: MANGA status_in: $statusIn sort: UPDATED_TIME_DESC) {
    ...mediaListCollection
  }
}

fragment mediaListCollection on MediaListCollection {
  lists {
    name
    entries {
      id
      status
      progress
      progressVolumes
      updatedAt
      media {
        id
        type
        status(version: 2)
        format
        episodes
        chapters
        title {
          userPreferred
        }
        coverImage {
          large
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
}`,Pd=be`mutation (
  $id: Int
  $mediaId: Int
  $status: MediaListStatus
  $score: Float
  $progress: Int
  $progressVolumes: Int
  $repeat: Int
  $private: Boolean
  $notes: String
  $customLists: [String]
  $hiddenFromStatusLists: Boolean
  $advancedScores: [Float]
  $startedAt: FuzzyDateInput
  $completedAt: FuzzyDateInput
) {
  SaveMediaListEntry(
    id: $id
    mediaId: $mediaId
    status: $status
    score: $score
    progress: $progress
    progressVolumes: $progressVolumes
    repeat: $repeat
    private: $private
    notes: $notes
    customLists: $customLists
    hiddenFromStatusLists: $hiddenFromStatusLists
    advancedScores: $advancedScores
    startedAt: $startedAt
    completedAt: $completedAt
  ) {
    id
    mediaId
    status
    score
    advancedScores
    progress
    progressVolumes
    repeat
    priority
    private
    hiddenFromStatusLists
    customLists
    notes
    updatedAt
    startedAt {
      year
      month
      day
    }
    completedAt {
      year
      month
      day
    }
    user {
      id
      name
    }
    media {
      id
      title {
        userPreferred
      }
      coverImage {
        large
      }
      type
      format
      status
      episodes
      volumes
      chapters
      averageScore
      popularity
      isAdult
      startDate {
        year
      }
    }
  }
}`,ji=be`query staff(
  $id: Int
  $sort: [MediaSort]
  $characterPage: Int
  $staffPage: Int
  $onList: Boolean
  $type: MediaType
  $withCharacterRoles: Boolean = false
  $withStaffRoles: Boolean = false
) {
  Staff(id: $id) {
    id
    name {
      first
      middle
      last
      full
      native
      userPreferred
      alternative
    }
    image {
      large
    }
    description
    favourites
    isFavourite
    isFavouriteBlocked
    age
    gender
    yearsActive
    homeTown
    bloodType
    primaryOccupations
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    language: languageV2
    characterMedia(page: $characterPage, sort: $sort, onList: $onList)
      @include(if: $withCharacterRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        characterRole
        characterName
        node {
          id
          type
          bannerImage
          isAdult
          title {
            userPreferred
          }
          coverImage {
            large
          }
          startDate {
            year
          }
          mediaListEntry {
            id
            status
          }
        }
        characters {
          id
          name {
            userPreferred
          }
          image {
            large
          }
        }
      }
    }
    staffMedia(page: $staffPage, type: $type, sort: $sort, onList: $onList)
      @include(if: $withStaffRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        staffRole
        node {
          id
          type
          isAdult
          startDate {
            year
          }
          title {
            userPreferred
          }
          coverImage {
            large
          }
          mediaListEntry {
            id
            status
          }
        }
      }
    }
  }
}`,vm=be`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
  Studio(id: $id) {
    id
    name
    isAnimationStudio
    favourites
    isFavourite
    media(page: $page, sort: $sort, onList: $onList) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        isMainStudio
        node {
          id
          title {
            userPreferred
          }
          coverImage {
            extraLarge
            large
            color
          }
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          bannerImage
          season
          description
          type
          format
          status(version: 2)
          episodes
          duration
          chapters
          volumes
          genres
          isAdult
          averageScore
          popularity
          mediaListEntry {
            id
            status
          }
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
        }
      }
    }
  }
}`,ro=be`query character(
  $id: Int
  $page: Int = 1
  $sort: [MediaSort]
  $onList: Boolean
  $withRoles: Boolean = false
) {
  Character(id: $id) {
    id
    name {
      first
      middle
      last
      full
      native
      userPreferred
      alternative
      alternativeSpoiler
    }
    image {
      large
    }
    favourites
    isFavourite
    isFavouriteBlocked
    description
    age
    gender
    bloodType
    dateOfBirth {
      year
      month
      day
    }
    media(page: $page, sort: $sort, onList: $onList) @include(if: $withRoles) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        id
        characterRole
        voiceActorRoles(sort: [RELEVANCE, ID]) {
          roleNotes
          dubGroup
          voiceActor {
            id
            name {
              userPreferred
            }
            image {
              large
            }
            language: languageV2
          }
        }
        node {
          id
          type
          isAdult
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
          startDate {
            year
          }
          mediaListEntry {
            id
            status
          }
        }
      }
    }
  }
}`,$m=be`query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, isAdult: false) {
      ...media
    }
  }
  newAnime: Page(page: 1, perPage: 6) {
    media(sort: ID_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  newManga: Page(page: 1, perPage: 6) {
    media(sort: ID_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  finishedAnime: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: ANIME, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  finishedManga: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}`,_m=be`query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  finishedManga: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED, format: MANGA) {
      ...media
    }
  }
  finishedNovel: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: MANGA, isAdult: false, status: FINISHED, format: NOVEL) {
      ...media
    }
  }
  manhwa: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC type: MANGA countryOfOrigin: KR isAdult: false) {
      ...media
    }
  }
  novel: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC type: MANGA isAdult: false format: NOVEL) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
}`,bm=be`query (
  $season: MediaSeason
  $seasonYear: Int
  $nextSeason: MediaSeason
  $nextYear: Int
) {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  season: Page(page: 1, perPage: 6) {
    media(
      season: $season
      seasonYear: $seasonYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  nextSeason: Page(page: 1, perPage: 6) {
    media(
      season: $nextSeason
      seasonYear: $nextYear
      sort: POPULARITY_DESC
      type: ANIME
      isAdult: false
    ) {
      ...media
    }
  }
  finished: Page(page: 1, perPage: 6) {
    media(sort: END_DATE_DESC, type: ANIME, isAdult: false, status: FINISHED) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  top: Page(page: 1, perPage: 10) {
    media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
}
fragment media on Media {
  id
  title {
    userPreferred
  }
  coverImage {
    extraLarge
    large
    color
  }
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  bannerImage
  season
  seasonYear
  description
  type
  format
  status(version: 2)
  episodes
  duration
  chapters
  volumes
  genres
  isAdult
  averageScore
  popularity
  mediaListEntry {
    id
    status
  }
  nextAiringEpisode {
    airingAt
    timeUntilAiring
    episode
  }
  studios(isMain: true) {
    edges {
      isMain
      node {
        id
        name
      }
    }
  }
}`,ao=be`query (
  $page: Int = 1
  $id: Int
  $type: MediaType
  $isAdult: Boolean
  $search: String
  $format: [MediaFormat]
  $status: MediaStatus
  $countryOfOrigin: CountryCode
  $source: MediaSource
  $season: MediaSeason
  $year: String
  $seasonYear: Int
  $endDateLike: String
  $endDateLesser: FuzzyDateInt 
  $endDateGreater: FuzzyDateInt 
  $onList: Boolean
  $yearLesser: FuzzyDateInt
  $yearGreater: FuzzyDateInt
  $episodeLesser: Int
  $episodeGreater: Int
  $durationLesser: Int
  $durationGreater: Int
  $chapterLesser: Int
  $chapterGreater: Int
  $volumeLesser: Int
  $volumeGreater: Int
  $licensedBy: [Int]
  $isLicensed: Boolean
  $genres: [String]
  $excludedGenres: [String]
  $tags: [String]
  $excludedTags: [String]
  $minimumTagRank: Int
  $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
) {
  Page(page: $page) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(
      id: $id
      type: $type
      season: $season
      format_in: $format
      status: $status
      countryOfOrigin: $countryOfOrigin
      source: $source
      search: $search
      onList: $onList
      seasonYear: $seasonYear
      startDate_like: $year
      startDate_lesser: $yearLesser
      startDate_greater: $yearGreater
      endDate_like: $endDateLike
      endDate_lesser: $endDateLesser
      endDate_greater: $endDateGreater
      episodes_lesser: $episodeLesser
      episodes_greater: $episodeGreater
      duration_lesser: $durationLesser
      duration_greater: $durationGreater
      chapters_lesser: $chapterLesser
      chapters_greater: $chapterGreater
      volumes_lesser: $volumeLesser
      volumes_greater: $volumeGreater
      licensedById_in: $licensedBy
      isLicensed: $isLicensed
      genre_in: $genres
      genre_not_in: $excludedGenres
      tag_in: $tags
      tag_not_in: $excludedTags
      minimumTagRank: $minimumTagRank
      sort: $sort
      isAdult: $isAdult
    ) {
      id
      title {
        userPreferred
      }
      coverImage {
        extraLarge
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      bannerImage
      season
      seasonYear
      description
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      isAdult
      averageScore
      popularity
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      mediaListEntry {
        id
        status
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
    }
  }
}`,ym=be`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,wm=be`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,km=be`query ($mediaId: Int) {
  Media(id: $mediaId) {
    id
    title {
      userPreferred
    }
    coverImage {
      large
    }
    bannerImage
    type
    status(version: 2)
    episodes
    chapters
    volumes
    isFavourite
    mediaListEntry {
      id
      mediaId
      status
      score
      advancedScores
      progress
      progressVolumes
      repeat
      priority
      private
      hiddenFromStatusLists
      customLists
      notes
      updatedAt
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      user {
        id
        name
      }
    }
  }
}`,Sm=be`query ($id: Int, $name: String) {
  User(id: $id, name: $name) {
    id
    name
    previousNames {
      name
      updatedAt
    }
    avatar {
      large
    }
    bannerImage
    about
    isFollowing
    isFollower
    donatorTier
    donatorBadge
    createdAt
    moderatorRoles
    isBlocked
    bans
    options {
      profileColor
      restrictMessagesToFollowing
    }
    mediaListOptions {
      scoreFormat
    }
    statistics {
      anime {
        count
        meanScore
        standardDeviation
        minutesWatched
        episodesWatched
        genrePreview: genres(limit: 10, sort: COUNT_DESC) {
          genre
          count
        }
      }
      manga {
        count
        meanScore
        standardDeviation
        chaptersRead
        volumesRead
        genrePreview: genres(limit: 10, sort: COUNT_DESC) {
          genre
          count
        }
      }
    }
    stats {
      activityHistory {
        date
        amount
        level
      }
    }
    favourites {
      anime {
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      manga {
        edges {
          favouriteOrder
          node {
            id
            type
            status(version: 2)
            format
            isAdult
            bannerImage
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
          }
        }
      }
      characters {
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staff {
        edges {
          favouriteOrder
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      studios {
        edges {
          favouriteOrder
          node {
            id
            name
          }
        }
      }
    }
  }
}`,Cm=be`query ($id: Int, $type: ActivityType, $page: Int) {
  Page(page: $page, perPage: 25) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    activities(userId: $id, type: $type, sort: [PINNED, ID_DESC]) {
      ... on ListActivity {
        id
        type
        replyCount
        status
        progress
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
        media {
          id
          type
          status(version: 2)
          isAdult
          bannerImage
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
      }
      ... on TextActivity {
        id
        type
        text
        replyCount
        isLocked
        isSubscribed
        isLiked
        isPinned
        likeCount
        createdAt
        user {
          id
          name
          avatar {
            large
          }
        }
      }
      ... on MessageActivity {
        id
        type
        message
        replyCount
        isPrivate
        isLocked
        isSubscribed
        isLiked
        likeCount
        createdAt
        user: recipient {
          id
        }
        messenger {
          id
          name
          donatorTier
          donatorBadge
          moderatorRoles
          avatar {
            large
          }
        }
      }
    }
  }
}`,Am=be`query {
  Viewer {
    id
    name
    about
    avatar {
      large
    }
    bannerImage
    unreadNotificationCount
    donatorTier
    donatorBadge
    moderatorRoles
    options {
      titleLanguage
      staffNameLanguage
      restrictMessagesToFollowing
      airingNotifications
      displayAdultContent
      profileColor
      notificationOptions {
        type
        enabled
      }
      disabledListActivity {
        type
        disabled
      }
    }
    mediaListOptions {
      scoreFormat
      rowOrder
      animeList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
      mangaList {
        customLists
        sectionOrder
        splitCompletedSectionByFormat
        advancedScoring
        advancedScoringEnabled
      }
    }
  }
}`;function be(e,...t){const n=[];for(let s=0;s<e.length;s++)n.push(e[s],t[s]||"");const r=/\s*([{}():,[\]])\s*/g;return n.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}const ks=["WINTER","SPRING","SUMMER","FALL"],Ya=(e=7)=>{const t=new Date;t.setDate(t.getDate()+e);const n=t.getFullYear(),r=xm(t.getMonth());return F(Number.isInteger(e),"Offsetdays is not an integer"),{season:r,seasonYear:n,nextSeason:$r(r,n,1).season,nextYear:$r(r,n,1).year}};function $r(e,t,n=0){F(typeof t=="number","year is not a number"),F(typeof e=="string","season is not a string");const r=n%4,s=Math.trunc(n/4),a=ks.indexOf(e.toUpperCase());return(a+r<0||a+r>3)&&(t+=r/Math.abs(r)),{year:t+s,season:ks[(4+a+r)%4]}}function xm(e){return ks[Math.floor(e/3)]}var wr,kr,pa,xt,Sr,va,Cr,Ar,xr,Tr,Ht,Ss,Md,Cs,Dd;const Ll=class Ll{constructor({start:t,limit:n,interval:r=60,fillAmount:s=1,pool:a,defaultDelay:l=30}){ut(this,Ht);ut(this,wr,[]);ut(this,kr,null);ut(this,pa,null);ut(this,xt);ut(this,Sr);ut(this,va);ut(this,Cr);ut(this,Ar);ut(this,xr);ut(this,Tr,Promise.resolve());ht(this,xt,t),ht(this,Sr,n),ht(this,va,r),ht(this,Cr,s),ht(this,xr,l),ht(this,Ar,a),Et(this,Ht,Ss).call(this)}requestToken(){return Ee(this,xt)>0?(Ni(this,xt)._--,!0):!1}enqueue(t){return ht(this,Tr,Ee(this,Tr).then(t).catch(n=>{console.error("Request error:",n)})),Ee(this,Tr)}getDefaultDelay(){return Ee(this,xr)}getsNextToken(){const{promise:t,resolve:n}=Promise.withResolvers();return this.addToBucket(n),t}addToBucket(t){Ee(this,wr).push(t)}delayBucket(t){Et(this,Ht,Md).call(this,t||Ee(this,xr))}};wr=new WeakMap,kr=new WeakMap,pa=new WeakMap,xt=new WeakMap,Sr=new WeakMap,va=new WeakMap,Cr=new WeakMap,Ar=new WeakMap,xr=new WeakMap,Tr=new WeakMap,Ht=new WeakSet,Ss=function(){clearInterval(Ee(this,kr)),ht(this,kr,setInterval(()=>Et(this,Ht,Cs).call(this),Ee(this,va)*1e3))},Md=function(t){ht(this,xt,0),clearInterval(Ee(this,kr)),clearTimeout(Ee(this,pa)),ht(this,pa,setTimeout(()=>{Et(this,Ht,Ss).call(this),Et(this,Ht,Cs).call(this)},t*1e3))},Cs=function(){var n;Ee(this,Ar)instanceof Ll?ht(this,xt,Math.min(Ee(this,xt)+Math.min(Ee(this,Cr),Et(n=Ee(this,Ar),Ht,Dd).call(n)),Ee(this,Sr))):ht(this,xt,Math.min(Ee(this,xt)+Ee(this,Cr),Ee(this,Sr)));const t=Ee(this,wr).slice();Ee(this,wr).length=0,t.forEach(r=>r())},Dd=function(){return Ee(this,xt)>0?Ni(this,xt)._--:Ee(this,xt)};let kn=Ll;const Yi=Zn,Ce=yi({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),Tm=yi({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),pt=yi({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),io=yi({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),qi={animeThemes:new kn({start:90,limit:90,interval:60,defaultDelay:20}),anilist:new kn({start:5,limit:5,interval:2,defaultDelay:20,pool:new kn({start:60,limit:90,interval:60,fillAmount:60})}),jikan:new kn({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new kn({start:3,limit:3,interval:1.25,pool:new kn({start:60,limit:60,interval:60,fillAmount:60})})})};function so(e,t,n){let r=null;const s=t.reduce((a,l)=>(l.active&&(l.key==="season"?r=l.value:a.push(`${l.key}=${l.value}`)),a),[]);return n>1&&s.push(`page=${n}`),r?se.getJson(Yf(r,s.sort().join("&")),a=>(a.data.forEach(l=>{l.titles=l.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),a)):se.getJson(jf(e,s.sort().join("&")),a=>(a.data.forEach(l=>{l.titles=l.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),a))}const ue={animeThemes:{themesByAniListId:pt(e=>se.getJson(_d(e))),artisBySlug:pt(e=>se.getJson(Gf(e)))},myAnimeList:{animeById:pt(e=>se.getJson(bd(e),t=>t.data)),mangaById:pt(e=>se.getJson(yd(e),t=>t.data)),animeCharactersById:pt(e=>se.getJson(wd(e),t=>t.data)),mangaCharactersById:pt(e=>se.getJson(kd(e),t=>t.data)),animeStaffById:pt(e=>se.getJson(Sd(e))),mediaSearch:pt(so),mediaSearchCache:io(so),genresAndThemes:pt(e=>se.getJson(qf(e),t=>{const n=new Set,r=["genres","genres","themes"],s={genres:[],themes:[]};let a=0;return t.data.reduce((l,o)=>n.has(o.mal_id)?l:(o.name<l&&(a=Math.min(a+1,r.length-1)),s[r[a]].push(o),n.add(o.mal_id),o.name),""),s.genres.sort(),{translations:{[e]:Object.fromEntries(t.data.map(l=>[l.name,l.mal_id]))},...s}}))},anilist:{mediaId:Ce((e,t)=>se.authAnilist(t,rl,{id:e,perPage:6})),rateRecommendation:async(e,t,n,r,s)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!=null,"Id missing"),F(n!=null,"Rating missing"),F(r!=null,"MediaId missing"),F(s!=null,"MediaRecommendationId missing"),await se.authAnilist(e,Uf,{id:t,rating:n,mediaId:r,mediaRecommendationId:s},l=>l.data.SaveRecommendation).send()),userByName:Ce((e,t)=>(F(e,"Name is missing"),se.authAnilist(t,Sm,{name:e},n=>n.data.User))),toggleFollow:async(e,t)=>(F(t,"id is missing"),await se.authAnilist(e,lm,{id:t},r=>r.data.ToggleFollow).send()),userFollowing:Ce((e,t=1,n)=>(F(e,"id is missing"),se.authAnilist(n,cm,{id:e,page:t},r=>r.data.Page))),userAnimeStats:Ce((e,t)=>se.authAnilist(t,Kf,{name:e},n=>n.data.User.statistics.anime)),userMangaStats:Ce((e,t)=>se.authAnilist(t,Jf,{name:e},n=>n.data.User.statistics.manga)),userAnimeGenres:Ce((e,t)=>se.authAnilist(t,Zf,{name:e},n=>n.data.User.statistics.anime.genres)),userMangaGenres:Ce((e,t)=>se.authAnilist(t,Xf,{name:e},n=>n.data.User.statistics.manga.genres)),userAnimeTags:Ce((e,t)=>se.authAnilist(t,em,{name:e},n=>n.data.User.statistics.anime.tags)),userMangaTags:Ce((e,t)=>se.authAnilist(t,Qf,{name:e},n=>n.data.User.statistics.manga.tags)),userAnimeStudios:Ce((e,t)=>se.authAnilist(t,tm,{name:e},n=>n.data.User.statistics.anime.studios)),userAnimeVoiceActors:Ce((e,t)=>se.authAnilist(t,nm,{name:e},n=>n.data.User.statistics.anime.voiceActors)),userAnimeStaff:Ce((e,t)=>se.authAnilist(t,am,{name:e},n=>n.data.User.statistics.anime.staff)),userMangaStaff:Ce((e,t)=>se.authAnilist(t,rm,{name:e},n=>n.data.User.statistics.manga.staff)),characterIds:pt((e,t)=>se.authAnilist(t,sm(e),{ids:e},n=>Object.values(n.data).map(r=>r.characters).flat())),userFollowers:Ce((e,t=1,n)=>(F(e,"id is missing"),se.authAnilist(n,om,{id:e,page:t},r=>r.data.Page))),activityByUserId:Ce((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,Cm,{id:e}))),activityById:Ce((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,Wf,{id:e},n=>n.data.Activity))),listOfActivityLikes:pt((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,Of,{id:e,type:"ACTIVITY"},n=>n.data.Page))),activityRepliesById:Ce((e,t,n)=>(F(e,"Id is missing"),se.authAnilist(n,zf,{id:e,page:t},r=>r.data.Page))),notifications:Tm((e,t,n=1)=>{switch(t){case"airing":return se.authAnilist(e,Vn,{page:n,types:["AIRING"]},r=>r.data.Page);case"activity":return se.authAnilist(e,Vn,{page:n,types:["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"]},r=>r.data.Page);case"forum":return se.authAnilist(e,Vn,{page:n,types:["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"]},r=>r.data.Page);case"follows":return se.authAnilist(e,Vn,{page:n,types:["FOLLOWING"]},r=>r.data.Page);case"media":return se.authAnilist(e,Vn,{page:n,types:["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"]},r=>r.data.Page);case"all":default:return se.authAnilist(e,Vn,{page:n},r=>r.data.Page)}}),searchUsers:pt((e,t,n)=>(F(e,"Search is missing"),se.authAnilist(n,Ff,{search:e,page:t},r=>r.data.Page))),mediaListByUserName:Ce((e,t,n)=>(F(e,"Name is missing"),se.authAnilist(n,ws,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),mediaListByUserNameFetchOnce:pt((e,t,n)=>(F(e,"Name is missing"),se.authAnilist(n,ws,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),favouritesByUserId:Ce((e,t,n)=>(F(e,"Id is missing"),F(t,"Page is missing"),se.authAnilist(n,um,{id:e,page:t},r=>r.data.User.favourites))),mutateFavourites:async(e,t)=>await se.authAnilist(e,dm,t).send(),characterInfoById:Ce((e,t)=>se.authAnilist(t,ro,{id:e},n=>n.data.Character)),characterMediaById:Ce((e,t,n={})=>se.authAnilist(e,ro,{...n,page:n.page||1,sort:n.sort||"POPULARITY_DESC",onList:n.onList,withRoles:n.withRoles||!0,id:t},r=>r.data.Character.media)),staffInfoById:Ce((e,t)=>se.authAnilist(t,ji,{id:e},n=>n.data.Staff)),studioInfoAndMediaById:Ce((e,t={},n)=>se.authAnilist(n,vm,{...t,page:t.page||1,sort:t.sort||"START_DATE_DESC",onList:t.onList,id:e},r=>r.data.Studio)),staffCharactersById:Ce((e,t,n={})=>se.authAnilist(e,ji,{...n,characterPage:n.characterPage||1,sort:n.sort||"START_DATE_DESC",onList:n.onList,withCharacterRoles:!0,id:t},r=>r.data.Staff.characterMedia)),staffMediaById:Ce((e,t,n,r)=>se.authAnilist(e,ji,{...r,staffPage:r.staffPage||1,sort:r.sort||"START_DATE_DESC",onList:r.onList,withStaffRoles:!0,id:t,type:n},s=>s.data.Staff.staffMedia)),genresAndTags:pt(()=>se.anilist(ym,{},e=>e.data)),externalSources:pt(e=>se.anilist(wm,{type:e||void 0},t=>t.data.ExternalLinkSourceCollection)),characters:Ce((e,t=1,n)=>se.authAnilist(n,Ed,{id:e,page:t},r=>r.data.Media)),allMediaStaff:Ce((e,t=1,n)=>se.authAnilist(n,hm,{id:e,page:t},r=>r.data.Media)),trendingMedia:Ce(e=>{const t=Ya();return se.authAnilist(e,$m,{season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingAnime:Ce(e=>{const t=Ya();return se.authAnilist(e,bm,{type:"ANIME",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingManga:Ce(e=>{const t=Ya();return se.authAnilist(e,_m,{type:"MANGA",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),mediaListEntry:async(e,t)=>(F(t,"MediaId missing"),F(typeof e!="function","This specific api doesnt support signals"),await se.authAnilist(e,km,{mediaId:t}).send()),getActivity:Ce((e,t,n=1)=>se.authAnilist(e,Ld,{...t,page:n},r=>r.data.Page)),searchMedia:pt((e,t,n,r={})=>{const s=t.reduce((a,l)=>(l.active&&(a[l.key]=l.value),a),{page:n});return Object.entries(r).forEach(([a,l])=>{a==="format"||a==="season"||a==="seasonYear"?s[a]=l:a==="episodeGreater"?s[a]=Math.max(l,s[a]||0):(s[a]&&(s[a]=[l,s[a]].flat()),s[a]??(s[a]=l))}),se.authAnilist(e,ao,s,a=>a.data.Page)}),searchMediaCache:io((e,t,n)=>{const r=t.reduce((s,a)=>(a.active&&(s[a.key]=a.value),s),{page:n});return se.authAnilist(e,ao,r,s=>s.data.Page)}),friendsMediaScore:Ce((e,t,n)=>se.authAnilist(e,Id,{id:t,...n})),mutateMedia:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t,"Variables missing"),F(t.id||t.mediaId,"No mutation id given"),await se.authAnilist(e,Pd,t,r=>r.data.SaveMediaListEntry).send()),deleteMediaListEntry:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!==void 0,"Variables missing"),await se.authAnilist(e,gm,{id:t}).send()),toggleActivityLike:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t.id||t.mediaId,"No mutation id given"),await se.authAnilist(e,mm,{...t,type:"ACTIVITY"}).send()),toggleFavourite:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),await se.authAnilist(e,fm,t).send()),wachingAnime:Ce((e,t)=>se.authAnilist(t,no,{userId:e,type:"ANIME",perPage:40})),readingManga:Ce((e,t)=>se.authAnilist(t,no,{userId:e,type:"MANGA",perPage:40}))}};var qn,Ir,Er,En,Rd,Nd,Od;const la=class la{constructor(t,{method:n="POST",headers:r,body:s},a){ut(this,En);Re(this,"expires");ut(this,qn);ut(this,Ir);ut(this,Er);F(t,"Url missing"),F(n,"Method missing"),n==="POST"&&F(s,"Body is missing");const l={"Content-Type":"application/json"};this.url=t,this.method=n,this.headers=r||l,this.body=s,this.fromCache=!0,ht(this,qn,a),this.cacheKey=Et(this,En,Rd).call(this)}abort(){var t;(t=Ee(this,Ir))==null||t.abort()}async send(){var s;const t=Et(this,En,Nd).call(this);ht(this,Ir,new AbortController),ht(this,Er,Ee(this,Ir).signal);const n=await t.enqueue(async()=>{for(;;){if(Ee(this,Er).aborted)return null;if(document.hidden){const{promise:o,resolve:c}=Promise.withResolvers();document.addEventListener("visibilitychange",c,{once:!0}),await o}if(!t.requestToken()){await Promise.race([t.getsNextToken(),new Promise(o=>Ee(this,Er).addEventListener("abort",o))]);continue}const l=await Et(this,En,Od).call(this);if(l.status===429){console.warn("429 received, backing off...",this.url);const o=parseInt(l.headers.get("Retry-After"))||t.getDefaultDelay();await new Promise(c=>setTimeout(c,o*1e3));continue}if(l.status===500&&this.url.includes("anilist")){console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds"),await new Promise(o=>setTimeout(o,2e3));continue}return l}});if(n==null)return null;if(this.status=n.status,!n.ok)return this.error=!0,this;const r=await n.json();return this.data=((s=Ee(this,qn))==null?void 0:s.call(this,r))||r,this.fromCache=!1,this}static anilist(t,n={},r){return la.authAnilist(null,t,n,r)}static authAnilist(t,n,r={},s){F(n.length>10,"Query must be above of length 10");const a={"Content-Type":"application/json"};return t&&(a.Authorization="Bearer "+t),new la("https://graphql.anilist.co",{method:"POST",headers:a,body:{query:n,variables:r}},s)}static getJson(t,n){return new la(t,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},n)}};qn=new WeakMap,Ir=new WeakMap,Er=new WeakMap,En=new WeakSet,Rd=function(){let t=`${this.url}-${this.method}`;if(this.body){const n=JSON.stringify(this.body).replaceAll('"',"");t+=n}if(this.headers){const n=JSON.stringify(this.headers).replaceAll('"',"");t+=n}if(Ee(this,qn)){const n=Ee(this,qn).toString().replace(/[\n\t\r ]+/g,"");t+=n}return t},Nd=function(){if(this.url.startsWith("https://graphql.anilist.co"))return qi.anilist;if(this.url.startsWith("https://api.jikan.moe"))return qi.jikan;if(this.url.startsWith("https://api.animethemes.moe"))return qi.animeThemes;F(!1,`Fetch to url "${this.url}" does not have any rate limits`)},Od=function(){const t={method:this.method,headers:this.headers,body:JSON.stringify(this.body),cache:"default"};return Math.random()>1?(console.log("Error route"),fetch("http://127.0.0.1:3000/api/version",t)):fetch(this.url,t)};let se=la;const zi=new Map,La=new Map;function yi(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(n){return(...r)=>{const[s,a]=O(void 0),[l,o]=O(!1),[c,h]=O(!1),[u,f]=O(!0);let g=null;const m=e.type=="default"||e.type=="only-if-cached",y=(Yi==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&m==!1,v=(w,_)=>{if(typeof w=="function"&&(w=w(Ae(s))),w=structuredClone(w),F(Ae(s)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof w=="object","Data should always be JSON object data"),e.type!=="no-store"&&(zi.set(g.cacheKey,w),e.storeName)){f(!1);const A=ze.fetchCache();A.onsuccess=S=>{const b=S.target.result,I=ze.store(b,e.storeName,"readwrite",()=>f(!0),()=>f(!0)).put(w);_&&(I.onsuccess=_)}}},$=w=>{w.cacheKey===g.cacheKey&&a(w)},k=w=>{typeof w=="function"&&(w=w(Ae(s))),a(w)},C=async()=>{if(e.type==="only-if-cached")return h(!1),a(null);La.has(g.cacheKey)||La.set(g.cacheKey,g.send());const w=await La.get(g.cacheKey);if(La.delete(g.cacheKey),w!==null){if(e.expiresInSeconds){const _=new Date;w.expires=_.setSeconds(_.getSeconds()+e.expiresInSeconds)}Oe(()=>{w.error?(o(!0),console.assert(!Yi,"Fetch error, not saving data to cache")):(v(w),$(w)),h(!1)})}};return q(()=>{const w=r.map(A=>typeof A=="function"?A():A);if(w.some(A=>A===void 0))return;g==null||g.abort(),g=n(...w),Yi&&console.log("Fetching",e.type,g.body||g.url),Oe(()=>{h(!0),o(!1)});const _=zi.get(g.cacheKey);if(_&&_.expires>new Date)if($({..._,fromCache:!0}),e.type==="fetch-once"){h(!1);return}else y===!1&&h(!1);else if(e.type!=="no-store"&&e.storeName){const A=ze.fetchCache();A.onerror=C,A.onsuccess=S=>{const b=S.target.result,I=ze.store(b,e.storeName,"readonly").get(g.cacheKey);I.onerror=C,I.onsuccess=E=>{if(E.target.result&&(F(E.target.result.expires,"Cache should have a expiration date"),F(E.target.result.data,"Cache should always have data"),E.target.result.expires>new Date)){y==!1&&h(!1);const P={...E.target.result,fromCache:!0};return e.type!=="only-if-cached"&&zi.set(P.cacheKey,P),$(P)}y==!1&&C()}}}else y==!1&&C();y&&C()}),Object.defineProperties(s,{error:{get:()=>l()},loading:{get:()=>c()},indexedDBClosed:{get:()=>u()}}),He(()=>g==null?void 0:g.abort()),[s,{mutate:k,refetch:C,mutateCache:v}]}}}var Lr,qa;const _r=class _r{static store(t,n,r,s,a){const l=t.transaction(n,r);return s?l.onerror=s:l.onerror=console.warn,a&&(l.oncomplete=a),l.objectStore(n)}static fetchCache(t){const n=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var a,l;const s=r.target.result;switch(r.oldVersion){case 0:Et(a=_r,Lr,qa).call(a,s,"results",{keyPath:"cacheKey"});case 1:Et(l=_r,Lr,qa).call(l,s,"debug",{keyPath:"cacheKey"})}},n}static user(t){const n=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var a;const s=r.target.result;switch(r.oldVersion){case 0:Et(a=_r,Lr,qa).call(a,s,"data")}},n}};Lr=new WeakSet,qa=function(t,n,r){t.objectStoreNames.contains(n)||t.createObjectStore(n,r)},ut(_r,Lr);let ze=_r;class un{constructor(t,n,r){F(t,"CacheKey is missing"),this.cacheKey=t,this.data=n,this.cacheType=r}}const Wi={},nt=e=>il({cacheTypeSignal:()=>null,disableNullValues:!1,senderDisabledSignal:()=>!1,fetcherSignal:e}),In=(e,t)=>il({cacheTypeSignal:e,disableNullValues:!0,senderDisabledSignal:()=>!1,enableDebugLogs:!1,fetcherSignal:t}),al=(e,t)=>il({cacheTypeSignal:()=>null,disableNullValues:!0,senderDisabledSignal:e,enableDebugLogs:!1,fetcherSignal:t}),il=({cacheTypeSignal:e,disableNullValues:t,senderDisabledSignal:n,enableDebugLogs:r,fetcherSignal:s,fetchOnDebug:a})=>{fn(e,"cacheTypeSignal is not a function"),fn(n,"senderDisabledSignal is not a function"),fn(s,"fetcherSignal is not a function");const[l,o,c]=Pm(void 0),[h,u]=O(!1),[f,g]=O(!1),[m,y]=O(!0);let v=null,$=null;const k=I=>{if(typeof I=="function"){const{data:E,cacheType:P}=Ae(l)||{};return I(new un(v.cacheKey,E,P))}return I},C=(I,E)=>{var j,K;const P=k(I),R=new Nf(P.cacheKey,v.settings.expiresInSeconds,structuredClone(P.data));R.cacheKey===v.cacheKey&&c(P);const{type:B,storeName:V}=v.settings;if(B==="no-store"||!V)return;(K=(j=v.settings).saveToSessionStorage)==null||K.call(j,R),Wi[R.cacheKey]=R,y(!1);const X=ze.fetchCache();X.onsuccess=ae=>{const re=ae.target.result,J=ze.store(re,V,"readwrite",()=>y(!0),()=>y(!0)).put(R);E&&(J.onsuccess=E)}},w=I=>{F(I instanceof un),I.cacheKey===v.cacheKey&&o(I)},_=I=>{I=k(I),F(I instanceof un),o(I)},A=(I,E)=>{I=k(I),C(I,E),_(I)},S=async(I,E)=>{if(I!==v)return;if(F(I,"fetcher should not be undefined"),E==="only-if-cached"){Oe(()=>{t||(o(new un(I.cacheKey,null)),g(!1))});return}$==null||$.abort();const P=new AbortController;$=P;const R=await cf(I,P.signal);R===null?I===v&&Oe(()=>{u(!0),g(!1),!P.signal.aborted&&!t&&o(new un(I.cacheKey,null))}):Oe(()=>{const B=new un(I.cacheKey,R);C(B),w(B),I===v&&g(!1)})},b=N(I=>{const E=s(),P=e()||(E==null?void 0:E.settings.type)||I;if(v!==E)return P;switch(It(I,"prev","If fetcher is same as currentFetcher why is there no previous cacheType"),I){case"only-if-cached":if(P==="default")return P;case"default":if(P==="fetch-once")return P;case"fetch-once":if(P==="reload"||P==="no-store")return P}return I}),x=N(()=>{const I=s(),E=n();return v!==I?E:!1});return L(()=>{if(x())return;const I=s();if(!I){v=null,o(void 0);return}F(I instanceof el);const E=b();It(E,"caheType");const P=Zn&&!I.settings.fetchOnDebug&&!a&&E!=="no-store",R=!P&&(E==="fetch-once"||E==="reload"||E==="no-store"),B=I.cacheKey;if(v=I,Oe(()=>{u(!1),g(!0)}),B in Wi){const V=Wi[B];if(P||E==="only-if-cached"||E==="fetch-once"||E==="default"){Oe(()=>{o(new un(V.cacheKey,V.data,"local")),g(!1)});return}else o(new un(V.cacheKey,V.data,"local"))}else if(E!=="no-store"&&I.settings.storeName){const V=ze.fetchCache(),X=()=>!R&&S(I,E);V.onerror=X,V.onsuccess=j=>{const K=j.target.result,re=ze.store(K,I.settings.storeName,"readonly").get(B);re.onerror=X,re.onsuccess=Q=>{const J=Q.target.result;if(J&&(F(J.expires,"Cache should have a expiration date"),F(J.data,"Cache should always have data"),J.expires>new Date)){const pe=new un(B,J.data,"indexedDB");R?w(pe):Oe(()=>{w(pe),g(!1)});return}X()}}}R&&S(I,E)}),Object.defineProperties(l,{error:{get:()=>h()},loading:{get:()=>f()},indexedDBClosed:{get:()=>m()}}),He(()=>$==null?void 0:$.abort()),[l,{mutate:_,refetch:()=>S(Ae(s),Ae(s).settings.type),mutateCache:C,mutateBoth:A}]},Fd=(e,t)=>{const[n,r]=O(localStorage.getItem(e)??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,o),o})}]},Im=e=>{if(e==="true")return!0;if(e==="false")return!1},lo=(e,t)=>{const[n,r]=O(Im(localStorage.getItem(e))??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,String(o)),o})}]},Em=e=>{try{return JSON.parse(e)}catch{return null}},Lm=(e,t)=>{const[n,r]=O(Em(localStorage.getItem(e))??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o)),o})}]},sl=(e=!0)=>O(Zn===e),oo=e=>{fn(e);const[t,n]=O();return L(()=>{const r=e();n(r)}),[t,n]},Pm=e=>{const[t,n]=O(0);let r=e;return[()=>(t(),r),o=>(r=typeof o=="function"?o(r):o,n(h=>h+1),r),o=>(r=typeof o=="function"?o(r):o,r)]},Mm=()=>{Oe(()=>{Bd(e=>e+1),Vd(e=>e+1),Ud(e=>e+1),Gd(e=>e+1)})};let Ot=null;const Dm=e=>{Ot===null?(Ot=[e],e()):Ot.includes(e)||Ot.push(e)},Rm=()=>{Ot==null||Ot.shift();const e=Ot==null?void 0:Ot[0];e?e():Ot=null},Nm=()=>{setTimeout(()=>Bd(e=>e-1),1e3),setTimeout(()=>Ud(e=>e-1),3e3),setTimeout(()=>Vd(e=>e-1),5e3),setTimeout(()=>Gd(e=>e-1),1e4)},[G3,Bd]=O(0),[H3,Ud]=O(0),[ti,Vd]=O(0),[j3,Gd]=O(0),Om=()=>{Oe(()=>{Hd(e=>e+1),jd(e=>e+1),Yd(e=>e+1),qd(e=>e+1)})};let Ft=null;const Fm=e=>{Ft===null?(Ft=[e],e()):Ft.includes(e)||Ft.push(e)},Bm=()=>{Ft==null||Ft.shift();const e=Ft==null?void 0:Ft[0];e?e():Ft=null},Um=()=>{setTimeout(()=>Hd(e=>e-1),1e3),setTimeout(()=>jd(e=>e-1),2e3),setTimeout(()=>Yd(e=>e-1),5e3),setTimeout(()=>qd(e=>e-1),1e4)},[wi,Hd]=O(0),[Vm,jd]=O(0),[Y3,Yd]=O(0),[q3,qd]=O(0),[co,Gm]=We({}),ma=7*24*60*60,cr=24*60*60,As=new Date/1e3;function zd(e,t){try{return JSON.parse(e)||t}catch{return t}}function ll(e,t){try{return JSON.stringify(e)||t}catch{return t}}function Wd(e,t){const n=localStorage[e];return n?zd(n,t):t}function Hm(e,t){const n=ll(t);n?localStorage[e]=n:localStorage.removeItem(e)}const jm=(e,t)=>{const[n,r]=O(Wd(e,t));return[n,a=>{r(l=>{const o=Qs(a)?a(l):a;return Hm(e,o),o})}]},ni={"https://graphql.anilist.co":{limit:60,remaining:60,resetTime:0,requests:[],timeToWait:e=>{var h,u,f,g,m,y,v;const t=new Date;if(e.resetTime>t)return e.resetTime-t;if(e.remaining===0){const{end:$,start:k}=e.requests.at(-e.limit)??{},C=($||k||t)+6e4;return Math.max(C-t,0)}const n=((h=e.requests.at(-4))==null?void 0:h.start)+9e4||t,r=Math.min(((u=e.requests.at(-3))==null?void 0:u.start)+1e3,n)||t,s=Math.min(((f=e.requests.at(-4))==null?void 0:f.start)+2e3,n)||t,a=((g=e.requests.at(-6))==null?void 0:g.start)+5e3||t,l=e.remaining<=10&&((m=e.requests.at(-1))==null?void 0:m.start)+1e3||t,o=e.remaining<=5&&((y=e.requests.at(-1))==null?void 0:y.start)+2e3||t,c=e.remaining<=2&&((v=e.requests.at(-1))==null?void 0:v.start)+4e3||t;return Math.max(t,r,s,a,l,o,c)-t}}};function Ym(e){const t=Kd(e);if(!t)return;const n=new Date().getTime();t.requests.push({start:n}),t.requests=t.requests.filter(r=>n-r.start>12e4),zm()}function Kd(e){const[t]=e,n=Object.keys(ni).find(r=>t.includes(r));if(n)return qm(),ni[n]}function qm(){const e=Wd("LOB-external-rate-limits",{});Yg(ni,e)}function zm(){localStorage["LOB-external-rate-limits"]=JSON.stringify(ni)}function Wm(e){const t=Kd(e);if(!t)return 0;const n=t.timeToWait(t);return nd(n,"Rate limit delay did not return number"),n}const[jn,ri]=jm("LOB-authed-used-data"),[Cn,xs]=O(sessionStorage["LOB-token"]);sessionStorage.removeItem("LOB-token");var fc;const[Km,Jd]=O((fc=jn())==null?void 0:fc.data.id),[uo,ho]=O(0),Jm=()=>{const e=ze.user();e.onsuccess=t=>{const n=t.target.result,r=ze.store(n,"data","readwrite");r.delete("access_token"),r.delete("auth_profile_info"),Oe(()=>{xs(null),Jd(null),ri(null)})}};function Ki(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return(t>>>0).toString(16)}const Xm=(e,t,n)=>{if(!e.objectStoreNames.contains(t))return e.createObjectStore(t,n)},ki=(e,t)=>{const n=indexedDB.open("legendary-octo-barnacle-cache2",1);return n.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:{const a=Xm(s,"fetches",{keyPath:"cacheKey"});a.createIndex("Cache key","cacheKey",{unique:!0}),a.createIndex("Name","name",{unique:!1}),a.createIndex("Data","data",{unique:!1}),a.createIndex("Expiration","expires",{unique:!1}),a.createIndex("Last modified","modified",{unique:!1})}}},new Promise((r,s)=>{n.onerror=s,n.onsuccess=a=>{try{const l=a.target.result;Wg(l.objectStoreNames.contains(e),`Unknown store name "${e}"`);const o=l.transaction(e,t);r(o.objectStore(e))}catch(l){s(l)}}})},Zm=async(e,t,n)=>{const{promise:r,resolve:s,reject:a}=Promise.withResolvers(),o=(await ki(e,"readwrite")).put(t,n);return o.onerror=a,o.onsuccess=s,await r},Qm=async(e,t)=>{const n=await ki(e,"readonly");return await tp(n,t)},ep=async(e,t)=>{(await ki(e,"readwrite")).delete(t)},tp=(e,t)=>new Promise((n,r)=>{const s=e.get(t);s.onsuccess=a=>{var l;((l=a.target.result)==null?void 0:l.expires)<Xd?n(null):n(a.target.result)},s.onerror=r}),Xd=new Date;async function np(e){const n=(await ki(e,"readwrite")).index("Expiration"),r=IDBKeyRange.lowerBound(Xd,!0),s=n.openCursor(r);s.onsuccess=a=>{const l=a.target.result;l&&(l.delete(),l.continue())}}setTimeout(()=>{np("fetches")},5e3);function rp(e,t){const n=sessionStorage[e];return n?zd(n,t):t}function ap(e,t,n){sessionStorage[e]=ll(t,n)}const Zd=e=>{e!=null&&e.cacheKey&&(e?(Zm("fetches",e),ap(e.cacheKey,e)):(ep("fetches",e),sessionStorage.removeItem(e.cacheKey)))};function ip(e,t,n=sp){td(e),ha(t==null?void 0:t.body)&&(t.body=JSON.stringify(t.body));const r=[e,t];return r.cacheKey=n(e,t),r}function ol(e,t,n){td(e);const r=Cn(),s={"Content-Type":"application/json"};return r&&(s.Authorization=`Bearer ${r}`),ip("https://graphql.anilist.co",{method:"POST",headers:s,signal:n,body:{query:e,variables:t}})}function sp(e,t){const n=ll(t,"missing");return Ki(e)+Ki(n)+Ki(e+n)}function Qd(e){if(Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",e[1]);case 2:return fetch("https://http.codes/500",e[1]);case 3:return fetch("https://http.codes/cors",e[1])}return lp(e)}const Pa={};async function lp(e){var r,s;const t=(r=e==null?void 0:e[1])==null?void 0:r.signal;for(let a=0;a<3&&!(t!=null&&t.aborted);a++){try{var n=await(Pa[s=e.cacheKey]??(Pa[s]=op(e)))}catch{if(t!=null&&t.aborted)return null}finally{delete Pa[e.cacheKey]}if(n!=null&&n.ok)break;const l=await cp(e,n,a);if(!l)break;await new Promise(o=>setTimeout(o,l))}return n}function op(e){return Ym(e),fetch(...e)}async function cp(e,t,n){var o;const r=(t==null?void 0:t.status)||"cors",s=(o=t==null?void 0:t.headers)==null?void 0:o.get("Retry-After");if(s)return parseInt(s)*1e3;const[a]=e;if(a.includes(Pn))switch(r){case 400:{if(n<2){const{errors:c}=await t.json();var l=c.some(h=>h.message==="Invalid token")}return l?3e3:0}case 429:return 25e3;case 500:return 3e3;case 502:return 15e3;case"cors":return 6e4}if(a.includes(Qn))switch(r){case 429:return 1e3}if(a.includes(qc))switch(r){case 429:return 25e3}}const dp=[{url:"anilist",queue:[],timeout:null},{url:"jikan",queue:[],timeout:null},{url:"animeTheme",queue:[],timeout:null}],go={active:(e,t)=>{if(e){if(t.debug)return!1}else return!0;return!fo.has(e.cacheKey)},debug:Zn,loadingBar:!0,cache:{get:async(e,t)=>{const n=!t.debug&&rp(e.cacheKey,null);return n||await Qm("fetches",e.cacheKey)},set:async e=>{fo.add(e.cacheKey),Zd(e)}},setValue:e=>console.error("Missing setValue",e),parse:e=>e.json(),queue:!0,onStart:()=>{},onError:()=>{},onFetch:()=>{}};async function up(e,t={}){var u,f,g,m,y;if(!e)return;zg(e),t=vi({...go,cache:{...go.cache}},t);const n=performance.now();(u=t.onStart)==null||u.call(t,performance.now()-n);var r=t.file?await(await fetch("/legendary-octo-barnacle/"+t.file)).json():await((g=(f=t.cache)==null?void 0:f.get)==null?void 0:g.call(f,e,t));const s=(m=t.active)==null?void 0:m.call(t,r,t);if(r&&t.setValue(r,{fetcher:e}),!s){(y=t.onStop)==null||y.call(t,performance.now()-n);return}t.loadingBar&&ho(v=>v+1);const[a,{signal:l}]=e,o=dp.find(v=>a.includes(v.url));async function c(){var v,$,k,C,w;if((v=t.onFetch)==null||v.call(t,performance.now()-n),(l==null?void 0:l.aborded)!==!0)try{const _=await Qd(e);if(!(_!=null&&_.ok))throw _;const A=await t.parse(_),S={cacheKey:e.cacheKey,data:A,expires:t.expires||new Date().getTime()+1e3*60*60*24*30,modified:new Date().getTime()};t.name&&(S.name=t.name),t.setValue({...S,cache:!1}),A&&((k=($=t.cache)==null?void 0:$.set)==null||k.call($,S,{fetcher:e}))}catch(_){(C=t.onError)==null||C.call(t,_)}(w=t.onStop)==null||w.call(t,performance.now()-n),t.loadingBar&&ho(_=>_-1),clearTimeout(o.timeout),o.timeout=setTimeout(h,10)}if(t.queue===!1){c();return}else o.queue.push({event:c,fetcher:e}),h();function h(){if(!o.queue.length)return;const{event:v,fetcher:$}=o.queue.at(-1),k=Wm($);k===0?(o.queue.pop(),v()):(clearTimeout(o.timeout),o.timeout=setTimeout(h,k))}}const fo=new Set,mo={name:"AniList fetch",onError:async e=>{if(!e)return;const{errors:t}=await e.json();for(const{message:n,status:r}of t)r===400&&n==="Invalid token"&&Jm()}};function eu(e,t=mo){if(t){const{cache:n,...r}=mo;t=vi({...r,cache:{...n}},t)}up(e,t)}var hp=p("<li data-k-8fed7792><button data-k-8fed7792>Logout"),gp=p("<li data-k-8fed7792>"),fp=p('<img data-k-8fed7792 alt="Profile avatar">'),mp=p("<li data-k-8fed7792 class=profile>"),pp=p("<li data-k-8fed7792><a data-k-8fed7792>Login with AniList"),vp=p("<nav data-k-8fed7792 class=main-navigation><ul data-k-8fed7792><li data-k-8fed7792></li><li data-k-8fed7792></li><li data-k-8fed7792></li><li data-k-8fed7792>");const $p=`https://anilist.co/api/v2/oauth/authorize?client_id=${vf()}&response_type=token`;function _p(){const{logoutUser:e}=ce();return q(()=>{if(!Cn())return;const n=ol(Am,{},new AbortController().signal);eu(n,{name:"AniList authed user",setValue:r=>{Oe(()=>{ri({data:r.data.data.Viewer}),Jd(r.data.data.Viewer.id)})}})}),(()=>{var t=vp(),n=t.firstChild,r=n.firstChild,s=r.nextSibling,a=s.nextSibling,l=a.nextSibling;return d(r,i(U,{href:"/",children:"Home"})),d(s,i(U,{href:"/browse/anime",children:"Anime"})),d(a,i(U,{href:"/browse/manga",children:"Manga"})),d(l,i(U,{href:"/browse/media",children:"Search"})),d(n,i(W,{get children(){return[i(M,{get when(){return Cn()},get children(){return[(()=>{var o=hp(),c=o.firstChild;return c.$$click=()=>e(),o})(),i(T,{get when(){return jn()},get children(){return[(()=>{var o=gp();return d(o,i(U,{href:"/notifications",get children(){return["Notifications (",N(()=>jn().data.unreadNotificationCount),")"]}})),o})(),(()=>{var o=mp();return d(o,i(U,{get href(){return"/user/"+jn().data.name},get children(){return[N(()=>jn().data.name),(()=>{var c=fp();return L(()=>G(c,"src",jn().data.avatar.large)),c})()]}})),o})()]}})]}}),i(M,{get when(){return!Cn()},get children(){var o=pp(),c=o.firstChild;return G(c,"href",$p),o}})]}}),null),t})()}$e(["click"]);var bp=p("<div data-k-d92f1ee3 class=loading-bar>");function yp(){const e=N(r=>uo()||r),t=N(()=>uo()===0);let n;return q(()=>{t()||(n.style.animation="none",n.offsetHeight,n.style.animation=null)}),i(T,{get when(){return e()},get children(){var r=bp(),s=n;return typeof s=="function"?he(s,r):n=r,L(()=>r.classList.toggle("done",!!t())),r}})}var wp=p("<main data-k-c7a289e2 id=page-content>"),kp=p("<footer data-k-c7a289e2 class=main-footer>"),Sp=p("<div data-k-c7a289e2 class=dev-branch><p data-k-c7a289e2>Preview: </p><button data-k-c7a289e2>Back to Production");const Cp=e=>fetch("http://localhost:"+e,{signal:AbortSignal.timeout(100)}).then(()=>!0).catch(()=>!1);function Ap(e){let t=new AbortController;return q(()=>{t.abort(),t=new AbortController,window.addEventListener("keydown",async n=>{if(n.target!==document.body||n.shiftKey||n.ctrlKey)return;const{port:r,hostname:s,href:a,origin:l}=location;n.key==="d"&&n.altKey&&(n.preventDefault(),s==="localhost"?r!=5174&&await Cp(5174)?window.open(a.replace(l,"http://localhost:5174")):window.open(a.replace(l,"https://kassu11.github.io")):window.open(a.replace(l,"http://localhost:5173")))},{signal:t.signal})}),[i(yp,{}),i(_p,{}),i(T,{get when(){return localStorage.getItem(Kl)},children:n=>(()=>{var r=Sp(),s=r.firstChild;s.firstChild;var a=s.nextSibling;return d(s,n,null),a.$$click=()=>{localStorage.removeItem(Kl),location.reload()},r})()}),i(Rg,{}),(()=>{var n=wp();return d(n,()=>e.children),n})(),kp()]}$e(["click"]);var xp=p("<p>");const[Ji,Tp]=O(As);setInterval(()=>Tp(new Date/1e3),1e3*30);function Ip(e){const t=e.airingAt<Ji(),n=N(()=>{const s=Math.abs(e.airingAt-Ji());return t?ma-s%ma:s}),r=N(s=>s===!1&&e.airingAt<Ji()?(e.setAiringEpisode(a=>a+1),!0):s,!1);return[i(T,{get when(){return!t&&r()},children:"aired in"}),(()=>{var s=xp();return d(s,i(T,{get when(){return Math.floor(n()/3600/24)},children:a=>[a,"d "]}),null),d(s,i(T,{get when(){return Math.floor(n()/3600%24)},children:a=>[a,"h "]}),null),d(s,i(T,{get when(){return Math.floor(n()%3600/60)},children:a=>[a,"m "]}),null),s})()]}var Ep=p('<button data-k-9c12ef02 class="cp-current-card-hover-info normal">Completed'),Lp=p("<button data-k-9c12ef02 class=cp-current-card-hover-info> <span data-k-9c12ef02 class=plus>+"),Pp=p("<img data-k-9c12ef02 alt=Cover.>"),Mp=p("<div data-k-9c12ef02 class=is-behind-container>"),Dp=p("<div data-k-9c12ef02 class=cp-current-card-info><p data-k-9c12ef02>Ep "),Rp=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> behind"),Np=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> left"),Op=p("<p data-k-9c12ef02> chapter<! data-k-9c12ef02> left"),Fp=p('<div data-k-9c12ef02 class=hover data-tooltip-positions="right left middle"><p data-k-9c12ef02 class=line-clamp></p><p data-k-9c12ef02 class=progress-status>Progress: ');function Bp(e){if(!(e!=null&&e.episode))return null;if((e==null?void 0:e.airingAt)<As){const t=Math.abs(e.airingAt-As);return e.episode+Math.floor(t/ma)+1}return e.episode}function Up(e){const t=wa(async(n,r)=>{const s=ol(Pd,{mediaId:n,progress:r},AbortSignal.timeout(3e4));try{const a=await Qd(s);if(a.status!==200)return;const l=await a.json();nd(l.data.SaveMediaListEntry.progress,"No progress found"),vi(e.data,l.data.SaveMediaListEntry),l.data.SaveMediaListEntry.status==="COMPLETED"?e.mutateCache(o=>{for(const{lists:c}of Object.values(o.data.data))for(const h of c)h.entries=h.entries.filter(u=>u.media.id!==n);return o}):e.mutateCache(o=>o)}catch{console.error("Error")}},250,2);return i(W,{get fallback(){return(()=>{var n=Lp(),r=n.firstChild;return n.$$click=s=>{s.preventDefault(),t(e.data.media.id,e.progress()+1),e.setProgress(a=>a+1)},d(n,()=>e.progress,r),n})()},get children(){return i(M,{get when(){return e.data.media.episodes===e.progress()||e.data.media.chapters===e.progress()},get children(){var n=Ep();return n.$$click=r=>r.preventDefault(),n}})}})}function Vp(e){const[t,n]=O(e.data.progress),[r,s]=O(Bp(e.data.media.nextAiringEpisode)),a=N(()=>r()>t()+1),l=()=>r()-(t()+1),o=()=>Math.min(l()/10,.45),c=()=>1/(l()-o())*100;return i(U,{get href(){return Ge(e.data.media)},"data-tooltip-trigger":!0,class:"cp-current-card",get children(){return[(()=>{var h=Pp();return L(()=>G(h,"src",e.data.media.coverImage.large)),h})(),i(T,{get when(){var h;return(h=e.data.media.nextAiringEpisode)==null?void 0:h.airingAt},get children(){var h=Dp(),u=h.firstChild;return u.firstChild,d(u,r,null),d(h,i(Ip,{get airingAt(){return e.data.media.nextAiringEpisode.airingAt},setAiringEpisode:s}),null),d(h,i(T,{get when(){return a()},get children(){var f=Mp();return L(g=>(g=`repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${c()*(1-o())}%, transparent ${c()*(1-o())}%, transparent ${c()}%)`)!=null?f.style.setProperty("background",g):f.style.removeProperty("background")),f}}),null),h}}),i(Up,{get data(){return e.data},get mutateCache(){return e.mutateCache},progress:t,setProgress:n}),(()=>{var h=Fp(),u=h.firstChild,f=u.nextSibling;return f.firstChild,d(h,i(W,{get children(){return[i(M,{get when(){return N(()=>!!r())()&&a()},get children(){var g=Rp(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>r()-(t()+1),m),d(g,()=>r()-(t()+1)>1&&"s",y),g}}),i(M,{get when(){return N(()=>r()==null)()&&e.data.media.episodes-t()>0},get children(){var g=Np(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.episodes-t(),m),d(g,()=>e.data.media.episodes-t()>1&&"s",y),g}}),i(M,{get when(){return e.data.media.chapters-t()>0},get children(){var g=Op(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.chapters-t(),m),d(g,()=>e.data.media.chapters-t()>1&&"s",y),g}})]}}),u),d(u,()=>e.data.media.title.userPreferred),d(f,t,null),d(f,i(T,{get when(){return e.data.media.episodes},get children(){return["/",N(()=>e.data.media.episodes)]}}),null),d(f,i(T,{get when(){return e.data.media.chapters},get children(){return["/",N(()=>e.data.media.chapters)]}}),null),h})()]}})}$e(["click"]);var Gp=p('<div data-k-ea0ffbeb class="grid-column-auto-fill current">');function Hp(e){return i(T,{get when(){return e.cards.length},get children(){var t=Gp();return d(t,i(H,{get each(){return e.cards},children:n=>i(Vp,{data:n,get mutateCache(){return e.mutateCache}})})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}function jp(){const[e,t]=O(0);let n=!1;const r=(l=0)=>{t(l),n=!0,requestAnimationFrame(o=>{requestAnimationFrame(c=>a(o,c))})},s=l=>{n=!1,l&&t(l)},a=(l,o)=>{n&&(t(c=>c+(o-l)),requestAnimationFrame(c=>a(o,c)))};return He(()=>n=!1),[e,r,s]}function Yp(e){return e>=1e3?`${(e/1e3).toFixed(1)} s`:`${Math.round(e)} ms`}var qp=p("<div data-k-b9535d1e class=pg-home-current><p data-k-b9535d1e>");function zp(){const[e,t]=O(),[n,r]=O(!1),[s,a,l]=jp();let o,c;q(()=>{const u=Km();if(!Cn()||!u)return;o==null||o.abort(),o=new AbortController;const g=ol(pm,{userId:u,statusIn:["CURRENT","REPEATING"]},o.signal);eu(g,{name:"Currently watching",onStart:m=>{r(!0),a(m)},onStop:m=>{r(!1),l(m)},setValue:m=>{c=m,t(Wp(m))}})});const h=u=>{c!=null&&c.cacheKey&&(u=Qs(u)?u(c):u,u&&Zd(u))};return(()=>{var u=qp(),f=u.firstChild;return d(f,()=>Yp(s())),d(u,i(H,{get each(){return e()},children:g=>i(Hp,{get cards(){return g.entries},mutateCache:h,get loading(){return n()}})}),null),u})()}function Wp(e){var s;const t=[],r=new Date/1e3;for(const a of Object.values(e.data.data))for(const{name:l,entries:o}of a.lists){const c=[],h={name:l,entries:[]};o.sort((u,f)=>f.updatedAt-u.updatedAt);for(const u of o){if(((s=u.media.nextAiringEpisode)==null?void 0:s.airingAt)<r){const f=Math.max((u.media.episodes||99999)-u.media.nextAiringEpisode.episode,0),g=Math.min(Math.ceil((r-u.media.nextAiringEpisode.airingAt)/ma),f);g===f?u.media.nextAiringEpisode=null:(u.media.nextAiringEpisode.airingAt+=ma*g,u.media.nextAiringEpisode.episode+=g)}u.media.nextAiringEpisode?c.push(u):h.entries.push(u)}c.sort((u,f)=>u.media.nextAiringEpisode.airingAt-f.media.nextAiringEpisode.airingAt),c.length<5?h.entries.unshift(...c):t.push({name:l+" (Airing)",entries:c}),t.push(h)}return t}const mn=(e,t)=>{let n;const r=()=>clearTimeout(n);return Rr()&&He(r),Object.assign((...a)=>{n!==void 0&&r(),n=setTimeout(()=>e(...a),t)},{clear:r})};function tr(e,t,n){let r;(function(c){c[c.Ready=0]="Ready",c[c.Leading=1]="Leading",c[c.Trailing=2]="Trailing"})(r||(r={}));let s=r.Ready;const a=e(c=>{s===r.Trailing&&t(...c),s=r.Ready},n),l=(...c)=>{s!==r.Trailing&&(s===r.Ready&&t(...c),s+=1),a(c)},o=()=>{s=r.Ready,a.clear()};return Rr()&&He(o),Object.assign(l,{clear:o})}var Kp=p("<span>");function Jn(e){const[t,n]=fi(e,["class"]);return(()=>{var r=Kp();return Lt(r,Fe({get class(){return"cp-loader-circle "+t.class||""}},n),!1,!1),r})()}var Jp=p("<tool-tip inert role=tooltip>",!0,!1,!1);function Tt(e){return(()=>{var t=Jp();return Lt(t,e,!1,!1),t._$owner=Rr(),L(()=>G(t,"tip-position",e.tipPosition)),t})()}function cl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let nr=cl();function tu(e){nr=e}const aa={exec:()=>null};function Le(e,t=""){let n=typeof e=="string"?e:e.source;const r={replace:(s,a)=>{let l=typeof a=="string"?a:a.source;return l=l.replace(yt.caret,"$1"),n=n.replace(s,l),r},getRegex:()=>new RegExp(n,t)};return r}const yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Xp=/^(?:[ \t]*(?:\n|$))+/,Zp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ka=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ev=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,dl=/(?:[*+-]|\d{1,9}[.)])/,nu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ru=Le(nu).replace(/bull/g,dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),tv=Le(nu).replace(/bull/g,dl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ul=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nv=/^[^\n]+/,hl=/(?!\s*\])(?:\\.|[^\[\]\\])+/,rv=Le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",hl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),av=Le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,dl).getRegex(),Si="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",gl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,iv=Le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",gl).replace("tag",Si).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),au=Le(ul).replace("hr",ka).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),sv=Le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",au).getRegex(),fl={blockquote:sv,code:Zp,def:rv,fences:Qp,heading:ev,hr:ka,html:iv,lheading:ru,list:av,newline:Xp,paragraph:au,table:aa,text:nv},po=Le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ka).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),lv={...fl,lheading:tv,table:po,paragraph:Le(ul).replace("hr",ka).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",po).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex()},ov={...fl,html:Le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",gl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:aa,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Le(ul).replace("hr",ka).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ru).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,dv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,iu=/^( {2,}|\\)\n(?!\s*$)/,uv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ci=/[\p{P}\p{S}]/u,ml=/[\s\p{P}\p{S}]/u,su=/[^\s\p{P}\p{S}]/u,hv=Le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ml).getRegex(),lu=/(?!~)[\p{P}\p{S}]/u,gv=/(?!~)[\s\p{P}\p{S}]/u,fv=/(?:[^\s\p{P}\p{S}]|~)/u,mv=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ou=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pv=Le(ou,"u").replace(/punct/g,Ci).getRegex(),vv=Le(ou,"u").replace(/punct/g,lu).getRegex(),cu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$v=Le(cu,"gu").replace(/notPunctSpace/g,su).replace(/punctSpace/g,ml).replace(/punct/g,Ci).getRegex(),_v=Le(cu,"gu").replace(/notPunctSpace/g,fv).replace(/punctSpace/g,gv).replace(/punct/g,lu).getRegex(),bv=Le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,su).replace(/punctSpace/g,ml).replace(/punct/g,Ci).getRegex(),yv=Le(/\\(punct)/,"gu").replace(/punct/g,Ci).getRegex(),wv=Le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kv=Le(gl).replace("(?:-->|$)","-->").getRegex(),Sv=Le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ai=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Cv=Le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",ai).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),du=Le(/^!?\[(label)\]\[(ref)\]/).replace("label",ai).replace("ref",hl).getRegex(),uu=Le(/^!?\[(ref)\](?:\[\])?/).replace("ref",hl).getRegex(),Av=Le("reflink|nolink(?!\\()","g").replace("reflink",du).replace("nolink",uu).getRegex(),pl={_backpedal:aa,anyPunctuation:yv,autolink:wv,blockSkip:mv,br:iu,code:dv,del:aa,emStrongLDelim:pv,emStrongRDelimAst:$v,emStrongRDelimUnd:bv,escape:cv,link:Cv,nolink:uu,punctuation:hv,reflink:du,reflinkSearch:Av,tag:Sv,text:uv,url:aa},xv={...pl,link:Le(/^!?\[(label)\]\((.*?)\)/).replace("label",ai).getRegex(),reflink:Le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ai).getRegex()},Ts={...pl,emStrongRDelimAst:_v,emStrongLDelim:vv,url:Le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Tv={...Ts,br:Le(iu).replace("{2,}","*").getRegex(),text:Le(Ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ma={normal:fl,gfm:lv,pedantic:ov},jr={normal:pl,gfm:Ts,breaks:Tv,pedantic:xv},Iv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vo=e=>Iv[e];function rn(e,t){if(t){if(yt.escapeTest.test(e))return e.replace(yt.escapeReplace,vo)}else if(yt.escapeTestNoEncode.test(e))return e.replace(yt.escapeReplaceNoEncode,vo);return e}function $o(e){try{e=encodeURI(e).replace(yt.percentDecode,"%")}catch{return null}return e}function _o(e,t){var a;const n=e.replace(yt.findPipe,(l,o,c)=>{let h=!1,u=o;for(;--u>=0&&c[u]==="\\";)h=!h;return h?"|":" |"}),r=n.split(yt.splitPipe);let s=0;if(r[0].trim()||r.shift(),r.length>0&&!((a=r.at(-1))!=null&&a.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(yt.slashPipe,"|");return r}function Yr(e,t,n){const r=e.length;if(r===0)return"";let s=0;for(;s<r&&e.charAt(r-s-1)===t;)s++;return e.slice(0,r-s)}function Ev(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1}function bo(e,t,n,r,s){const a=t.href,l=t.title||null,o=e[1].replace(s.other.outputLinkReplace,"$1");if(e[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:n,href:a,title:l,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:n,href:a,title:l,text:o}}function Lv(e,t,n){const r=e.match(n.other.indentCodeCompensation);if(r===null)return t;const s=r[1];return t.split(`
`).map(a=>{const l=a.match(n.other.beginningSpace);if(l===null)return a;const[o]=l;return o.length>=s.length?a.slice(s.length):a}).join(`
`)}class ii{constructor(t){Re(this,"options");Re(this,"rules");Re(this,"lexer");this.options=t||nr}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const r=n[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yr(r,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const r=n[0],s=Lv(r,n[3]||"",this.rules);return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:s}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let r=n[2].trim();if(this.rules.other.endingHash.test(r)){const s=Yr(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:Yr(n[0],`
`)}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){let r=Yr(n[0],`
`).split(`
`),s="",a="";const l=[];for(;r.length>0;){let o=!1;const c=[];let h;for(h=0;h<r.length;h++)if(this.rules.other.blockquoteStart.test(r[h]))c.push(r[h]),o=!0;else if(!o)c.push(r[h]);else break;r=r.slice(h);const u=c.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,a=a?`${a}
${f}`:f;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,l,!0),this.lexer.state.top=g,r.length===0)break;const m=l.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.blockquote(v);l[l.length-1]=$,s=s.substring(0,s.length-y.raw.length)+$.raw,a=a.substring(0,a.length-y.text.length)+$.text;break}else if((m==null?void 0:m.type)==="list"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.list(v);l[l.length-1]=$,s=s.substring(0,s.length-m.raw.length)+$.raw,a=a.substring(0,a.length-y.raw.length)+$.raw,r=v.substring(l.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:l,text:a}}}list(t){let n=this.rules.block.list.exec(t);if(n){let r=n[1].trim();const s=r.length>1,a={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");const l=this.rules.other.listItemRegex(r);let o=!1;for(;t;){let h=!1,u="",f="";if(!(n=l.exec(t))||this.rules.block.hr.test(t))break;u=n[0],t=t.substring(u.length);let g=n[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),m=t.split(`
`,1)[0],y=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):y?v=n[1].length+1:(v=n[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=n[1].length),y&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,t=t.substring(m.length+1),h=!0),!h){const C=this.rules.other.nextBulletRegex(v),w=this.rules.other.hrRegex(v),_=this.rules.other.fencesBeginRegex(v),A=this.rules.other.headingBeginRegex(v),S=this.rules.other.htmlBeginRegex(v);for(;t;){const b=t.split(`
`,1)[0];let x;if(m=b,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),x=m):x=m.replace(this.rules.other.tabCharGlobal,"    "),_.test(m)||A.test(m)||S.test(m)||C.test(m)||w.test(m))break;if(x.search(this.rules.other.nonSpaceChar)>=v||!m.trim())f+=`
`+x.slice(v);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||_.test(g)||A.test(g)||w.test(g))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),u+=b+`
`,t=t.substring(b.length+1),g=x.slice(v)}}a.loose||(o?a.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0));let $=null,k;this.options.gfm&&($=this.rules.other.listIsTask.exec(f),$&&(k=$[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),a.items.push({type:"list_item",raw:u,task:!!$,checked:k,loose:!1,text:f,tokens:[]}),a.raw+=u}const c=a.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let h=0;h<a.items.length;h++)if(this.lexer.state.top=!1,a.items[h].tokens=this.lexer.blockTokens(a.items[h].text,[]),!a.loose){const u=a.items[h].tokens.filter(g=>g.type==="space"),f=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));a.loose=f}if(a.loose)for(let h=0;h<a.items.length;h++)a.items[h].loose=!0;return a}}html(t){const n=this.rules.block.html.exec(t);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(t){const n=this.rules.block.def.exec(t);if(n){const r=n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=n[2]?n[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:s,title:a}}}table(t){var o;const n=this.rules.block.table.exec(t);if(!n||!this.rules.other.tableDelimiter.test(n[2]))return;const r=_o(n[1]),s=n[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=(o=n[3])!=null&&o.trim()?n[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],l={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===s.length){for(const c of s)this.rules.other.tableAlignRight.test(c)?l.align.push("right"):this.rules.other.tableAlignCenter.test(c)?l.align.push("center"):this.rules.other.tableAlignLeft.test(c)?l.align.push("left"):l.align.push(null);for(let c=0;c<r.length;c++)l.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:l.align[c]});for(const c of a)l.rows.push(_o(c,l.header.length).map((h,u)=>({text:h,tokens:this.lexer.inline(h),header:!1,align:l.align[u]})));return l}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:n[1]}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&this.rules.other.startATag.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const r=n[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const l=Yr(r.slice(0,-1),"\\");if((r.length-l.length)%2===0)return}else{const l=Ev(n[2],"()");if(l>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+l;n[2]=n[2].substring(0,l),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let s=n[2],a="";if(this.options.pedantic){const l=this.rules.other.pedanticHrefTitle.exec(s);l&&(s=l[1],a=l[3])}else a=n[3]?n[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),bo(n,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer,this.rules)}}reflink(t,n){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){const s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=n[s.toLowerCase()];if(!a){const l=r[0].charAt(0);return{type:"text",raw:l,text:l}}return bo(r,a,r[0],this.lexer,this.rules)}}emStrong(t,n,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const l=[...s[0]].length-1;let o,c,h=l,u=0;const f=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*t.length+l);(s=f.exec(n))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(c=[...o].length,s[3]||s[4]){h+=c;continue}else if((s[5]||s[6])&&l%3&&!((l+c)%3)){u+=c;continue}if(h-=c,h>0)continue;c=Math.min(c,c+h+u);const g=[...s[0]][0].length,m=t.slice(0,l+s.index+g+c);if(Math.min(l,c)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let r=n[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(r),a=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&a&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:n[0],text:r}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t){const n=this.rules.inline.autolink.exec(t);if(n){let r,s;return n[2]==="@"?(r=n[1],s="mailto:"+r):(r=n[1],s=r),{type:"link",raw:n[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){var r;let n;if(n=this.rules.inline.url.exec(t)){let s,a;if(n[2]==="@")s=n[0],a="mailto:"+s;else{let l;do l=n[0],n[0]=((r=this.rules.inline._backpedal.exec(n[0]))==null?void 0:r[0])??"";while(l!==n[0]);s=n[0],n[1]==="www."?a="http://"+n[0]:a=n[0]}return{type:"link",raw:n[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){const n=this.rules.inline.text.exec(t);if(n){const r=this.lexer.state.inRawBlock;return{type:"text",raw:n[0],text:n[0],escaped:r}}}}class Ut{constructor(t){Re(this,"tokens");Re(this,"options");Re(this,"state");Re(this,"tokenizer");Re(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||nr,this.options.tokenizer=this.options.tokenizer||new ii,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:yt,block:Ma.normal,inline:jr.normal};this.options.pedantic?(n.block=Ma.pedantic,n.inline=jr.pedantic):this.options.gfm&&(n.block=Ma.gfm,this.options.breaks?n.inline=jr.breaks:n.inline=jr.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ma,inline:jr}}static lex(t,n){return new Ut(n).lex(t)}static lexInline(t,n){return new Ut(n).inlineTokens(t)}lex(t){t=t.replace(yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var s,a,l;for(this.options.pedantic&&(t=t.replace(yt.tabCharGlobal,"    ").replace(yt.spaceLine,""));t;){let o;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(h=>(o=h.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const h=n.at(-1);o.raw.length===1&&h!==void 0?h.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.at(-1).src=h.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((l=this.options.extensions)!=null&&l.startBlock){let h=1/0;const u=t.slice(1);let f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},u),typeof f=="number"&&f>=0&&(h=Math.min(h,f))}),h<1/0&&h>=0&&(c=t.substring(0,h+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const h=n.at(-1);r&&(h==null?void 0:h.type)==="paragraph"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):n.push(o),r=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):n.push(o);continue}if(t){const h="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,h;let r=t,s=null;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a=!1,l="";for(;t;){a||(l=""),a=!1;let u;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(g=>(u=g.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);const g=n.at(-1);u.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=u.raw,g.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,l)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let f=t;if((h=this.options.extensions)!=null&&h.startInline){let g=1/0;const m=t.slice(1);let y;this.options.extensions.startInline.forEach(v=>{y=v.call({lexer:this},m),typeof y=="number"&&y>=0&&(g=Math.min(g,y))}),g<1/0&&g>=0&&(f=t.substring(0,g+1))}if(u=this.tokenizer.inlineText(f)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(l=u.raw.slice(-1)),a=!0;const g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=u.raw,g.text+=u.text):n.push(u);continue}if(t){const g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class si{constructor(t){Re(this,"options");Re(this,"parser");this.options=t||nr}space(t){return""}code({text:t,lang:n,escaped:r}){var l;const s=(l=(n||"").match(yt.notSpaceStart))==null?void 0:l[0],a=t.replace(yt.endingNewline,"")+`
`;return s?'<pre><code class="language-'+rn(s)+'">'+(r?a:rn(a,!0))+`</code></pre>
`:"<pre><code>"+(r?a:rn(a,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:n}){return`<h${n}>${this.parser.parseInline(t)}</h${n}>
`}hr(t){return`<hr>
`}list(t){const n=t.ordered,r=t.start;let s="";for(let o=0;o<t.items.length;o++){const c=t.items[o];s+=this.listitem(c)}const a=n?"ol":"ul",l=n&&r!==1?' start="'+r+'"':"";return"<"+a+l+`>
`+s+"</"+a+`>
`}listitem(t){var r;let n="";if(t.task){const s=this.checkbox({checked:!!t.checked});t.loose?((r=t.tokens[0])==null?void 0:r.type)==="paragraph"?(t.tokens[0].text=s+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=s+" "+rn(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):n+=s+" "}return n+=this.parser.parse(t.tokens,!!t.loose),`<li>${n}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let n="",r="";for(let a=0;a<t.header.length;a++)r+=this.tablecell(t.header[a]);n+=this.tablerow({text:r});let s="";for(let a=0;a<t.rows.length;a++){const l=t.rows[a];r="";for(let o=0;o<l.length;o++)r+=this.tablecell(l[o]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){const n=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+n+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${rn(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:n,tokens:r}){const s=this.parser.parseInline(r),a=$o(t);if(a===null)return s;t=a;let l='<a href="'+t+'"';return n&&(l+=' title="'+rn(n)+'"'),l+=">"+s+"</a>",l}image({href:t,title:n,text:r}){const s=$o(t);if(s===null)return rn(r);t=s;let a=`<img src="${t}" alt="${r}"`;return n&&(a+=` title="${rn(n)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:rn(t.text)}}class vl{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}}class Vt{constructor(t){Re(this,"options");Re(this,"renderer");Re(this,"textRenderer");this.options=t||nr,this.options.renderer=this.options.renderer||new si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vl}static parse(t,n){return new Vt(n).parse(t)}static parseInline(t,n){return new Vt(n).parseInline(t)}parse(t,n=!0){var s,a;let r="";for(let l=0;l<t.length;l++){const o=t[l];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[o.type]){const h=o,u=this.options.extensions.renderers[h.type].call({parser:this},h);if(u!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(h.type)){r+=u||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let h=c,u=this.renderer.text(h);for(;l+1<t.length&&t[l+1].type==="text";)h=t[++l],u+=`
`+this.renderer.text(h);n?r+=this.renderer.paragraph({type:"paragraph",raw:u,text:u,tokens:[{type:"text",raw:u,text:u,escaped:!0}]}):r+=u;continue}default:{const h='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return r}parseInline(t,n=this.renderer){var s,a;let r="";for(let l=0;l<t.length;l++){const o=t[l];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[o.type]){const h=this.options.extensions.renderers[o.type].call({parser:this},o);if(h!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=h||"";continue}}const c=o;switch(c.type){case"escape":{r+=n.text(c);break}case"html":{r+=n.html(c);break}case"link":{r+=n.link(c);break}case"image":{r+=n.image(c);break}case"strong":{r+=n.strong(c);break}case"em":{r+=n.em(c);break}case"codespan":{r+=n.codespan(c);break}case"br":{r+=n.br(c);break}case"del":{r+=n.del(c);break}case"text":{r+=n.text(c);break}default:{const h='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return r}}class ia{constructor(t){Re(this,"options");Re(this,"block");this.options=t||nr}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}}Re(ia,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class Pv{constructor(...t){Re(this,"defaults",cl());Re(this,"options",this.setOptions);Re(this,"parse",this.parseMarkdown(!0));Re(this,"parseInline",this.parseMarkdown(!1));Re(this,"Parser",Vt);Re(this,"Renderer",si);Re(this,"TextRenderer",vl);Re(this,"Lexer",Ut);Re(this,"Tokenizer",ii);Re(this,"Hooks",ia);this.use(...t)}walkTokens(t,n){var s,a;let r=[];for(const l of t)switch(r=r.concat(n.call(this,l)),l.type){case"table":{const o=l;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,n));for(const c of o.rows)for(const h of c)r=r.concat(this.walkTokens(h.tokens,n));break}case"list":{const o=l;r=r.concat(this.walkTokens(o.items,n));break}default:{const o=l;(a=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&a[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const h=o[c].flat(1/0);r=r.concat(this.walkTokens(h,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...t){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{const s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const l=n.renderers[a.name];l?n.renderers[a.name]=function(...o){let c=a.renderer.apply(this,o);return c===!1&&(c=l.apply(this,o)),c}:n.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const l=n[a.level];l?l.unshift(a.tokenizer):n[a.level]=[a.tokenizer],a.start&&(a.level==="block"?n.startBlock?n.startBlock.push(a.start):n.startBlock=[a.start]:a.level==="inline"&&(n.startInline?n.startInline.push(a.start):n.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(n.childTokens[a.name]=a.childTokens)}),s.extensions=n),r.renderer){const a=this.defaults.renderer||new si(this.defaults);for(const l in r.renderer){if(!(l in a))throw new Error(`renderer '${l}' does not exist`);if(["options","parser"].includes(l))continue;const o=l,c=r.renderer[o],h=a[o];a[o]=(...u)=>{let f=c.apply(a,u);return f===!1&&(f=h.apply(a,u)),f||""}}s.renderer=a}if(r.tokenizer){const a=this.defaults.tokenizer||new ii(this.defaults);for(const l in r.tokenizer){if(!(l in a))throw new Error(`tokenizer '${l}' does not exist`);if(["options","rules","lexer"].includes(l))continue;const o=l,c=r.tokenizer[o],h=a[o];a[o]=(...u)=>{let f=c.apply(a,u);return f===!1&&(f=h.apply(a,u)),f}}s.tokenizer=a}if(r.hooks){const a=this.defaults.hooks||new ia;for(const l in r.hooks){if(!(l in a))throw new Error(`hook '${l}' does not exist`);if(["options","block"].includes(l))continue;const o=l,c=r.hooks[o],h=a[o];ia.passThroughHooks.has(l)?a[o]=u=>{if(this.defaults.async)return Promise.resolve(c.call(a,u)).then(g=>h.call(a,g));const f=c.call(a,u);return h.call(a,f)}:a[o]=(...u)=>{let f=c.apply(a,u);return f===!1&&(f=h.apply(a,u)),f}}s.hooks=a}if(r.walkTokens){const a=this.defaults.walkTokens,l=r.walkTokens;s.walkTokens=function(o){let c=[];return c.push(l.call(this,o)),a&&(c=c.concat(a.call(this,o))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,n){return Ut.lex(t,n??this.defaults)}parser(t,n){return Vt.parse(t,n??this.defaults)}parseMarkdown(t){return(r,s)=>{const a={...s},l={...this.defaults,...a},o=this.onError(!!l.silent,!!l.async);if(this.defaults.async===!0&&a.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));l.hooks&&(l.hooks.options=l,l.hooks.block=t);const c=l.hooks?l.hooks.provideLexer():t?Ut.lex:Ut.lexInline,h=l.hooks?l.hooks.provideParser():t?Vt.parse:Vt.parseInline;if(l.async)return Promise.resolve(l.hooks?l.hooks.preprocess(r):r).then(u=>c(u,l)).then(u=>l.hooks?l.hooks.processAllTokens(u):u).then(u=>l.walkTokens?Promise.all(this.walkTokens(u,l.walkTokens)).then(()=>u):u).then(u=>h(u,l)).then(u=>l.hooks?l.hooks.postprocess(u):u).catch(o);try{l.hooks&&(r=l.hooks.preprocess(r));let u=c(r,l);l.hooks&&(u=l.hooks.processAllTokens(u)),l.walkTokens&&this.walkTokens(u,l.walkTokens);let f=h(u,l);return l.hooks&&(f=l.hooks.postprocess(f)),f}catch(u){return o(u)}}}onError(t,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const s="<p>An error occurred:</p><pre>"+rn(r.message+"",!0)+"</pre>";return n?Promise.resolve(s):s}if(n)return Promise.reject(r);throw r}}}const Xn=new Pv;function xe(e,t){return Xn.parse(e,t)}xe.options=xe.setOptions=function(e){return Xn.setOptions(e),xe.defaults=Xn.defaults,tu(xe.defaults),xe};xe.getDefaults=cl;xe.defaults=nr;xe.use=function(...e){return Xn.use(...e),xe.defaults=Xn.defaults,tu(xe.defaults),xe};xe.walkTokens=function(e,t){return Xn.walkTokens(e,t)};xe.parseInline=Xn.parseInline;xe.Parser=Vt;xe.parser=Vt.parse;xe.Renderer=si;xe.TextRenderer=vl;xe.Lexer=Ut;xe.lexer=Ut.lex;xe.Tokenizer=ii;xe.Hooks=ia;xe.parse=xe;xe.options;xe.setOptions;xe.use;xe.walkTokens;xe.parseInline;Vt.parse;Ut.lex;/*! @license DOMPurify 3.4.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.1/LICENSE */const{entries:hu,setPrototypeOf:yo,isFrozen:Mv,getPrototypeOf:Dv,getOwnPropertyDescriptor:Rv}=Object;let{freeze:wt,seal:Gt,create:gr}=Object,{apply:Is,construct:Es}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});Gt||(Gt=function(t){return t});Is||(Is=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),a=2;a<r;a++)s[a-2]=arguments[a];return t.apply(n,s)});Es||(Es=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});const qr=Qe(Array.prototype.forEach),Nv=Qe(Array.prototype.lastIndexOf),wo=Qe(Array.prototype.pop),zr=Qe(Array.prototype.push),Ov=Qe(Array.prototype.splice),bt=Array.isArray,ta=Qe(String.prototype.toLowerCase),Xi=Qe(String.prototype.toString),ko=Qe(String.prototype.match),dr=Qe(String.prototype.replace),So=Qe(String.prototype.indexOf),Fv=Qe(String.prototype.trim),Bv=Qe(Number.prototype.toString),Uv=Qe(Boolean.prototype.toString),Co=typeof BigInt>"u"?null:Qe(BigInt.prototype.toString),Ao=typeof Symbol>"u"?null:Qe(Symbol.prototype.toString),qe=Qe(Object.prototype.hasOwnProperty),Wr=Qe(Object.prototype.toString),gt=Qe(RegExp.prototype.test),Da=Vv(TypeError);function Qe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Is(e,t,r)}}function Vv(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Es(e,n)}}function we(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ta;if(yo&&yo(e,null),!bt(t))return e;let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){const a=n(s);a!==s&&(Mv(t)||(t[r]=a),s=a)}e[s]=!0}return e}function Gv(e){for(let t=0;t<e.length;t++)qe(e,t)||(e[t]=null);return e}function At(e){const t=gr(null);for(const[n,r]of hu(e))qe(e,n)&&(bt(r)?t[n]=Gv(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=At(r):t[n]=r);return t}function Hv(e){switch(typeof e){case"string":return e;case"number":return Bv(e);case"boolean":return Uv(e);case"bigint":return Co?Co(e):"0";case"symbol":return Ao?Ao(e):"Symbol()";case"undefined":return Wr(e);case"function":case"object":{if(e===null)return Wr(e);const t=e,n=fr(t,"toString");if(typeof n=="function"){const r=n(t);return typeof r=="string"?r:Wr(r)}return Wr(e)}default:return Wr(e)}}function fr(e,t){for(;e!==null;){const r=Rv(e,t);if(r){if(r.get)return Qe(r.get);if(typeof r.value=="function")return Qe(r.value)}e=Dv(e)}function n(){return null}return n}function jv(e){try{return gt(e,""),!0}catch{return!1}}const xo=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Zi=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Qi=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yv=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),es=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qv=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),To=wt(["#text"]),Io=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),ts=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=wt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ra=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zv=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Wv=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Kv=Gt(/\$\{[\w\W]*/gm),Jv=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xv=Gt(/^aria-[\-\w]+$/),gu=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zv=Gt(/^(?:\w+script|data):/i),Qv=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fu=Gt(/^html$/i),e$=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i);var Lo=Object.freeze({__proto__:null,ARIA_ATTR:Xv,ATTR_WHITESPACE:Qv,CUSTOM_ELEMENT:e$,DATA_ATTR:Jv,DOCTYPE_NAME:fu,ERB_EXPR:Wv,IS_ALLOWED_URI:gu,IS_SCRIPT_OR_DATA:Zv,MUSTACHE_EXPR:zv,TMPLIT_EXPR:Kv});const Kr={element:1,text:3,progressingInstruction:7,comment:8,document:9},t$=function(){return typeof window>"u"?null:window},n$=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));const a="dompurify"+(r?"#"+r:"");try{return t.createPolicy(a,{createHTML(l){return l},createScriptURL(l){return l}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Po=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function mu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:t$();const t=me=>mu(me);if(t.version="3.4.1",t.removed=[],!e||!e.document||e.document.nodeType!==Kr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const r=n,s=r.currentScript,{DocumentFragment:a,HTMLTemplateElement:l,Node:o,Element:c,NodeFilter:h,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,y=c.prototype,v=fr(y,"cloneNode"),$=fr(y,"remove"),k=fr(y,"nextSibling"),C=fr(y,"childNodes"),w=fr(y,"parentNode");if(typeof l=="function"){const me=n.createElement("template");me.content&&me.content.ownerDocument&&(n=me.content.ownerDocument)}let _,A="";const{implementation:S,createNodeIterator:b,createDocumentFragment:x,getElementsByTagName:I}=n,{importNode:E}=r;let P=Po();t.isSupported=typeof hu=="function"&&typeof w=="function"&&S&&S.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:B,TMPLIT_EXPR:V,DATA_ATTR:X,ARIA_ATTR:j,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:ae,CUSTOM_ELEMENT:re}=Lo;let{IS_ALLOWED_URI:Q}=Lo,J=null;const pe=we({},[...xo,...Zi,...Qi,...es,...To]);let ve=null;const fe=we({},[...Io,...ts,...Eo,...Ra]);let ee=Object.seal(gr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,je=null;const De=Object.seal(gr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Be=!0,et=!0,Pt=!1,Mt=!0,rt=!1,kt=!0,at=!1,dt=!1,Dt=!1,ft=!1,te=!1,Z=!1,_e=!0,ke=!1;const it="user-content-";let _t=!0,Ie=!1,Ve={},st=null;const Dn=we({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let rr=null;const ar=we({},["audio","video","img","source","image","track"]);let ir=null;const Br=we({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Rn="http://www.w3.org/1998/Math/MathML",Nn="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml";let ln=lt,sr=!1,Ur=null;const Ii=we({},[Rn,Nn,lt],Xi);let Vr=we({},["mi","mo","mn","ms","mtext"]),lr=we({},["annotation-xml"]);const Ei=we({},["title","style","font","a","script"]);let On=null;const Li=["application/xhtml+xml","text/html"],on="text/html";let Ye=null,ge=null;const cn=n.createElement("form"),nn=function(D){return D instanceof RegExp||D instanceof Function},Gr=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ge&&ge===D)return;(!D||typeof D!="object")&&(D={}),D=At(D),On=Li.indexOf(D.PARSER_MEDIA_TYPE)===-1?on:D.PARSER_MEDIA_TYPE,Ye=On==="application/xhtml+xml"?Xi:ta,J=qe(D,"ALLOWED_TAGS")&&bt(D.ALLOWED_TAGS)?we({},D.ALLOWED_TAGS,Ye):pe,ve=qe(D,"ALLOWED_ATTR")&&bt(D.ALLOWED_ATTR)?we({},D.ALLOWED_ATTR,Ye):fe,Ur=qe(D,"ALLOWED_NAMESPACES")&&bt(D.ALLOWED_NAMESPACES)?we({},D.ALLOWED_NAMESPACES,Xi):Ii,ir=qe(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)?we(At(Br),D.ADD_URI_SAFE_ATTR,Ye):Br,rr=qe(D,"ADD_DATA_URI_TAGS")&&bt(D.ADD_DATA_URI_TAGS)?we(At(ar),D.ADD_DATA_URI_TAGS,Ye):ar,st=qe(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)?we({},D.FORBID_CONTENTS,Ye):Dn,z=qe(D,"FORBID_TAGS")&&bt(D.FORBID_TAGS)?we({},D.FORBID_TAGS,Ye):At({}),je=qe(D,"FORBID_ATTR")&&bt(D.FORBID_ATTR)?we({},D.FORBID_ATTR,Ye):At({}),Ve=qe(D,"USE_PROFILES")?D.USE_PROFILES&&typeof D.USE_PROFILES=="object"?At(D.USE_PROFILES):D.USE_PROFILES:!1,Be=D.ALLOW_ARIA_ATTR!==!1,et=D.ALLOW_DATA_ATTR!==!1,Pt=D.ALLOW_UNKNOWN_PROTOCOLS||!1,Mt=D.ALLOW_SELF_CLOSE_IN_ATTR!==!1,rt=D.SAFE_FOR_TEMPLATES||!1,kt=D.SAFE_FOR_XML!==!1,at=D.WHOLE_DOCUMENT||!1,ft=D.RETURN_DOM||!1,te=D.RETURN_DOM_FRAGMENT||!1,Z=D.RETURN_TRUSTED_TYPE||!1,Dt=D.FORCE_BODY||!1,_e=D.SANITIZE_DOM!==!1,ke=D.SANITIZE_NAMED_PROPS||!1,_t=D.KEEP_CONTENT!==!1,Ie=D.IN_PLACE||!1,Q=jv(D.ALLOWED_URI_REGEXP)?D.ALLOWED_URI_REGEXP:gu,ln=typeof D.NAMESPACE=="string"?D.NAMESPACE:lt,Vr=qe(D,"MATHML_TEXT_INTEGRATION_POINTS")&&D.MATHML_TEXT_INTEGRATION_POINTS&&typeof D.MATHML_TEXT_INTEGRATION_POINTS=="object"?At(D.MATHML_TEXT_INTEGRATION_POINTS):we({},["mi","mo","mn","ms","mtext"]),lr=qe(D,"HTML_INTEGRATION_POINTS")&&D.HTML_INTEGRATION_POINTS&&typeof D.HTML_INTEGRATION_POINTS=="object"?At(D.HTML_INTEGRATION_POINTS):we({},["annotation-xml"]);const Y=qe(D,"CUSTOM_ELEMENT_HANDLING")&&D.CUSTOM_ELEMENT_HANDLING&&typeof D.CUSTOM_ELEMENT_HANDLING=="object"?At(D.CUSTOM_ELEMENT_HANDLING):gr(null);if(ee=gr(null),qe(Y,"tagNameCheck")&&nn(Y.tagNameCheck)&&(ee.tagNameCheck=Y.tagNameCheck),qe(Y,"attributeNameCheck")&&nn(Y.attributeNameCheck)&&(ee.attributeNameCheck=Y.attributeNameCheck),qe(Y,"allowCustomizedBuiltInElements")&&typeof Y.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=Y.allowCustomizedBuiltInElements),rt&&(et=!1),te&&(ft=!0),Ve&&(J=we({},To),ve=gr(null),Ve.html===!0&&(we(J,xo),we(ve,Io)),Ve.svg===!0&&(we(J,Zi),we(ve,ts),we(ve,Ra)),Ve.svgFilters===!0&&(we(J,Qi),we(ve,ts),we(ve,Ra)),Ve.mathMl===!0&&(we(J,es),we(ve,Eo),we(ve,Ra))),De.tagCheck=null,De.attributeCheck=null,qe(D,"ADD_TAGS")&&(typeof D.ADD_TAGS=="function"?De.tagCheck=D.ADD_TAGS:bt(D.ADD_TAGS)&&(J===pe&&(J=At(J)),we(J,D.ADD_TAGS,Ye))),qe(D,"ADD_ATTR")&&(typeof D.ADD_ATTR=="function"?De.attributeCheck=D.ADD_ATTR:bt(D.ADD_ATTR)&&(ve===fe&&(ve=At(ve)),we(ve,D.ADD_ATTR,Ye))),qe(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)&&we(ir,D.ADD_URI_SAFE_ATTR,Ye),qe(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)&&(st===Dn&&(st=At(st)),we(st,D.FORBID_CONTENTS,Ye)),qe(D,"ADD_FORBID_CONTENTS")&&bt(D.ADD_FORBID_CONTENTS)&&(st===Dn&&(st=At(st)),we(st,D.ADD_FORBID_CONTENTS,Ye)),_t&&(J["#text"]=!0),at&&we(J,["html","head","body"]),J.table&&(we(J,["tbody"]),delete z.tbody),D.TRUSTED_TYPES_POLICY){if(typeof D.TRUSTED_TYPES_POLICY.createHTML!="function")throw Da('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof D.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Da('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');_=D.TRUSTED_TYPES_POLICY,A=_.createHTML("")}else _===void 0&&(_=n$(m,s)),_!==null&&typeof A=="string"&&(A=_.createHTML(""));wt&&wt(D),ge=D},Fn=we({},[...Zi,...Qi,...Yv]),Hr=we({},[...es,...qv]),Bn=function(D){let Y=w(D);(!Y||!Y.tagName)&&(Y={namespaceURI:ln,tagName:"template"});const de=ta(D.tagName),Ue=ta(Y.tagName);return Ur[D.namespaceURI]?D.namespaceURI===Nn?Y.namespaceURI===lt?de==="svg":Y.namespaceURI===Rn?de==="svg"&&(Ue==="annotation-xml"||Vr[Ue]):!!Fn[de]:D.namespaceURI===Rn?Y.namespaceURI===lt?de==="math":Y.namespaceURI===Nn?de==="math"&&lr[Ue]:!!Hr[de]:D.namespaceURI===lt?Y.namespaceURI===Nn&&!lr[Ue]||Y.namespaceURI===Rn&&!Vr[Ue]?!1:!Hr[de]&&(Ei[de]||!Fn[de]):!!(On==="application/xhtml+xml"&&Ur[D.namespaceURI]):!1},St=function(D){zr(t.removed,{element:D});try{w(D).removeChild(D)}catch{$(D)}},Un=function(D,Y){try{zr(t.removed,{attribute:Y.getAttributeNode(D),from:Y})}catch{zr(t.removed,{attribute:null,from:Y})}if(Y.removeAttribute(D),D==="is")if(ft||te)try{St(Y)}catch{}else try{Y.setAttribute(D,"")}catch{}},Pl=function(D){let Y=null,de=null;if(Dt)D="<remove></remove>"+D;else{const Ze=ko(D,/^[\r\n\t ]+/);de=Ze&&Ze[0]}On==="application/xhtml+xml"&&ln===lt&&(D='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+D+"</body></html>");const Ue=_?_.createHTML(D):D;if(ln===lt)try{Y=new g().parseFromString(Ue,On)}catch{}if(!Y||!Y.documentElement){Y=S.createDocument(ln,"template",null);try{Y.documentElement.innerHTML=sr?A:Ue}catch{}}const mt=Y.body||Y.documentElement;return D&&de&&mt.insertBefore(n.createTextNode(de),mt.childNodes[0]||null),ln===lt?I.call(Y,at?"html":"body")[0]:at?Y.documentElement:mt},Ml=function(D){return b.call(D.ownerDocument||D,D,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},Pi=function(D){return D instanceof f&&(typeof D.nodeName!="string"||typeof D.textContent!="string"||typeof D.removeChild!="function"||!(D.attributes instanceof u)||typeof D.removeAttribute!="function"||typeof D.setAttribute!="function"||typeof D.namespaceURI!="string"||typeof D.insertBefore!="function"||typeof D.hasChildNodes!="function")},Mi=function(D){return typeof o=="function"&&D instanceof o};function dn(me,D,Y){qr(me,de=>{de.call(t,D,Y,ge)})}const Dl=function(D){let Y=null;if(dn(P.beforeSanitizeElements,D,null),Pi(D))return St(D),!0;const de=Ye(D.nodeName);if(dn(P.uponSanitizeElement,D,{tagName:de,allowedTags:J}),kt&&D.hasChildNodes()&&!Mi(D.firstElementChild)&&gt(/<[/\w!]/g,D.innerHTML)&&gt(/<[/\w!]/g,D.textContent)||kt&&D.namespaceURI===lt&&de==="style"&&Mi(D.firstElementChild)||D.nodeType===Kr.progressingInstruction||kt&&D.nodeType===Kr.comment&&gt(/<[/\w]/g,D.data))return St(D),!0;if(z[de]||!(De.tagCheck instanceof Function&&De.tagCheck(de))&&!J[de]){if(!z[de]&&Nl(de)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,de)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(de)))return!1;if(_t&&!st[de]){const Ue=w(D)||D.parentNode,mt=C(D)||D.childNodes;if(mt&&Ue){const Ze=mt.length;for(let Ct=Ze-1;Ct>=0;--Ct){const Rt=v(mt[Ct],!0);Ue.insertBefore(Rt,k(D))}}}return St(D),!0}return D instanceof c&&!Bn(D)||(de==="noscript"||de==="noembed"||de==="noframes")&&gt(/<\/no(script|embed|frames)/i,D.innerHTML)?(St(D),!0):(rt&&D.nodeType===Kr.text&&(Y=D.textContent,qr([R,B,V],Ue=>{Y=dr(Y,Ue," ")}),D.textContent!==Y&&(zr(t.removed,{element:D.cloneNode()}),D.textContent=Y)),dn(P.afterSanitizeElements,D,null),!1)},Rl=function(D,Y,de){if(je[Y]||_e&&(Y==="id"||Y==="name")&&(de in n||de in cn))return!1;if(!(et&&!je[Y]&&gt(X,Y))){if(!(Be&&gt(j,Y))){if(!(De.attributeCheck instanceof Function&&De.attributeCheck(Y,D))){if(!ve[Y]||je[Y]){if(!(Nl(D)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,D)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(D))&&(ee.attributeNameCheck instanceof RegExp&&gt(ee.attributeNameCheck,Y)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck(Y,D))||Y==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,de)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(de))))return!1}else if(!ir[Y]){if(!gt(Q,dr(de,ae,""))){if(!((Y==="src"||Y==="xlink:href"||Y==="href")&&D!=="script"&&So(de,"data:")===0&&rr[D])){if(!(Pt&&!gt(K,dr(de,ae,"")))){if(de)return!1}}}}}}}return!0},hh=we({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Nl=function(D){return!hh[ta(D)]&&gt(re,D)},Ol=function(D){dn(P.beforeSanitizeAttributes,D,null);const{attributes:Y}=D;if(!Y||Pi(D))return;const de={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0};let Ue=Y.length;for(;Ue--;){const mt=Y[Ue],{name:Ze,namespaceURI:Ct,value:Rt}=mt,Yt=Ye(Ze),Di=Rt;let ot=Ze==="value"?Di:Fv(Di);if(de.attrName=Yt,de.attrValue=ot,de.keepAttr=!0,de.forceKeepAttr=void 0,dn(P.uponSanitizeAttribute,D,de),ot=de.attrValue,ke&&(Yt==="id"||Yt==="name")&&So(ot,it)!==0&&(Un(Ze,D),ot=it+ot),kt&&gt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ot)){Un(Ze,D);continue}if(Yt==="attributename"&&ko(ot,"href")){Un(Ze,D);continue}if(de.forceKeepAttr)continue;if(!de.keepAttr){Un(Ze,D);continue}if(!Mt&&gt(/\/>/i,ot)){Un(Ze,D);continue}rt&&qr([R,B,V],Ul=>{ot=dr(ot,Ul," ")});const Bl=Ye(D.nodeName);if(!Rl(Bl,Yt,ot)){Un(Ze,D);continue}if(_&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!Ct)switch(m.getAttributeType(Bl,Yt)){case"TrustedHTML":{ot=_.createHTML(ot);break}case"TrustedScriptURL":{ot=_.createScriptURL(ot);break}}if(ot!==Di)try{Ct?D.setAttributeNS(Ct,Ze,ot):D.setAttribute(Ze,ot),Pi(D)?St(D):wo(t.removed)}catch{Un(Ze,D)}}dn(P.afterSanitizeAttributes,D,null)},Fl=function(D){let Y=null;const de=Ml(D);for(dn(P.beforeSanitizeShadowDOM,D,null);Y=de.nextNode();)dn(P.uponSanitizeShadowNode,Y,null),Dl(Y),Ol(Y),Y.content instanceof a&&Fl(Y.content);dn(P.afterSanitizeShadowDOM,D,null)};return t.sanitize=function(me){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},Y=null,de=null,Ue=null,mt=null;if(sr=!me,sr&&(me="<!-->"),typeof me!="string"&&!Mi(me)&&(me=Hv(me),typeof me!="string"))throw Da("dirty is not a string, aborting");if(!t.isSupported)return me;if(dt||Gr(D),t.removed=[],typeof me=="string"&&(Ie=!1),Ie){const Rt=me.nodeName;if(typeof Rt=="string"){const Yt=Ye(Rt);if(!J[Yt]||z[Yt])throw Da("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof o)Y=Pl("<!---->"),de=Y.ownerDocument.importNode(me,!0),de.nodeType===Kr.element&&de.nodeName==="BODY"||de.nodeName==="HTML"?Y=de:Y.appendChild(de);else{if(!ft&&!rt&&!at&&me.indexOf("<")===-1)return _&&Z?_.createHTML(me):me;if(Y=Pl(me),!Y)return ft?null:Z?A:""}Y&&Dt&&St(Y.firstChild);const Ze=Ml(Ie?me:Y);for(;Ue=Ze.nextNode();)Dl(Ue),Ol(Ue),Ue.content instanceof a&&Fl(Ue.content);if(Ie)return me;if(ft){if(rt){Y.normalize();let Rt=Y.innerHTML;qr([R,B,V],Yt=>{Rt=dr(Rt,Yt," ")}),Y.innerHTML=Rt}if(te)for(mt=x.call(Y.ownerDocument);Y.firstChild;)mt.appendChild(Y.firstChild);else mt=Y;return(ve.shadowroot||ve.shadowrootmode)&&(mt=E.call(r,mt,!0)),mt}let Ct=at?Y.outerHTML:Y.innerHTML;return at&&J["!doctype"]&&Y.ownerDocument&&Y.ownerDocument.doctype&&Y.ownerDocument.doctype.name&&gt(fu,Y.ownerDocument.doctype.name)&&(Ct="<!DOCTYPE "+Y.ownerDocument.doctype.name+`>
`+Ct),rt&&qr([R,B,V],Rt=>{Ct=dr(Ct,Rt," ")}),_&&Z?_.createHTML(Ct):Ct},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Gr(me),dt=!0},t.clearConfig=function(){ge=null,dt=!1},t.isValidAttribute=function(me,D,Y){ge||Gr({});const de=Ye(me),Ue=Ye(D);return Rl(de,Ue,Y)},t.addHook=function(me,D){typeof D=="function"&&zr(P[me],D)},t.removeHook=function(me,D){if(D!==void 0){const Y=Nv(P[me],D);return Y===-1?void 0:Ov(P[me],Y,1)[0]}return wo(P[me])},t.removeHooks=function(me){P[me]=[]},t.removeAllHooks=function(){P=Po()},t}var pu=mu();const r$="_spoiler_fn1ga_1",Mo={spoiler:r$};var vu=p("<div>");const a$={name:"spoiler",level:"inline",start(e){var t;return(t=e.match(/~!/))==null?void 0:t.index},tokenizer(e){const t=/^~!([^!~]+)!~/.exec(e);if(t)return{type:"spoiler",raw:t[0],text:t[1]}},renderer(e){return`<details class="${Mo.spoiler}"><summary><span class="${Mo.text}">${xe.parseInline(e.text)}</span></summary></details>`}};xe.use({extensions:[a$]});function $l(e){if(!e.children)return null;const t=xe(e.children),n=pu.sanitize(t),r=(()=>{var s=vu();return s.innerHTML=n,s})();return i(H,{get each(){return r.childNodes},children:s=>s})}const i$=/([^\n])\n([^\n])/g,s$=(e,t,n)=>t+"<br>"+n;function li(e){const t=N(()=>{if(!e.text)return[];const n=e.singleLineBreaks?e.text.replace(i$,s$):e.text,r=xe(n),s=pu.sanitize(r);return[...(()=>{var l=vu();return l.innerHTML=s,l})().childNodes]});return i(H,{get each(){return t()},children:n=>n})}var l$=p("<time class=cp-created-at>");function Yn(e){const[t,n]=O(Math.max(1,Math.abs(new Date/1e3-e.createdAt)));let r=null;return t()<60?r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3):t()<3600&&(r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3*60)),He(()=>clearInterval(r)),(()=>{var s=l$();return d(s,i(W,{get children(){return[i(M,{get when(){return Math.floor(t()/3600/24/365.25)},children:a=>[a," years",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24/30)},children:a=>[a," month",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24/7)},children:a=>[a," week",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24)},children:a=>[a," day",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600%24)},children:a=>[a," hour",N(()=>Ne(a()))," ago"]}),i(M,{get when(){return Math.floor(t()%3600/60)},children:a=>[a," minute",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()%3600%60)},children:a=>[a," second",N(()=>Ne(a()))," ago "]})]}})),L(a=>{var l=new Date(e.createdAt*1e3).toISOString(),o=new Date(e.createdAt*1e3).toLocaleString();return l!==a.e&&G(s,"datetime",a.e=l),o!==a.t&&G(s,"title",a.t=o),a},{e:void 0,t:void 0}),s})()}var o$=p("<div>"),Do=p("<img class=profile alt=Profile>"),c$=p("<div class=header>"),d$=p("<div class=content>"),u$=p("<div class=footer>"),h$=p("<img class=cover alt=Cover>"),Ro=p("<p> "),g$=p("<div class=main>"),f$=p("<div class=right>"),m$=p("<ol>"),p$=p("<button class=cp-activity-like>Like "),v$=p('<li><img alt="Profile picture">');function _l(e){const t=Fe({hideProfile:!1,small:!1,wrapper:n=>(()=>{var r=o$();return Lt(r,n,!1,!1),r})()},e);return F(typeof t.hideProfile=="boolean","hideProfile needs to be boolean"),F(typeof t.small=="boolean","small needs to be boolean"),i(W,{get children(){return[i(M,{get when(){return t.activity.type==="TEXT"},get children(){return i(Ui,{get component(){return t.wrapper},class:"activity-card-text",get children(){return[(()=>{var n=c$();return d(n,i(U,{get href(){return"/user/"+t.activity.user.name},class:"activity-profile-header",get children(){return[(()=>{var r=Do();return L(()=>G(r,"src",t.activity.user.avatar.large)),r})(),N(()=>t.activity.user.name)]}}),null),d(n,i(Yn,{get createdAt(){return t.activity.createdAt}}),null),n})(),(()=>{var n=d$();return d(n,i($l,{get children(){return t.activity.text}})),n})(),(()=>{var n=u$();return d(n,i(No,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}})),n})()]}})}}),i(M,{get when(){return t.activity.type==="ANIME_LIST"||t.activity.type==="MANGA_LIST"},get children(){return i(Ui,{get component(){return t.wrapper},class:"activity-card-media",get classList(){return{small:t.small}},get children(){return[i(U,{get href(){return Ge(t.activity.media)},get children(){var n=h$();return L(()=>G(n,"src",t.activity.media.coverImage.large)),n}}),(()=>{var n=g$();return d(n,i(W,{get children(){return[i(M,{get when(){return t.hideProfile===!0},get children(){var r=Ro(),s=r.firstChild;return d(r,()=>Je(t.activity.status),s),d(r,i(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,i(U,{get href(){return Ge(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),r}}),i(M,{get when(){return t.hideProfile===!1},get children(){return[i(U,{get href(){return"/user/"+t.activity.user.name},get children(){return t.activity.user.name}}),(()=>{var r=Ro(),s=r.firstChild;return d(r,()=>Je(t.activity.status),s),d(r,i(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,i(U,{get href(){return Ge(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),d(r,i(U,{get href(){return"/user/"+t.activity.user.name},get children(){var a=Do();return L(()=>G(a,"src",t.activity.user.avatar.large)),a}}),null),r})()]}})]}})),n})(),(()=>{var n=f$();return d(n,i(Yn,{get createdAt(){return t.activity.createdAt}}),null),d(n,i(No,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}}),null),n})()]}})}}),i(M,{get when(){return t.activity.type==="MESSAGE"},get children(){return i(Ui,{get component(){return t.wrapper},children:"message"})}})]}})}function No(e){const[t,n]=O(e.activity.isLiked),[r,s]=O(e.activity.likeCount),{accessToken:a}=ce(),[l,o]=O(void 0),[c]=ue.anilist.listOfActivityLikes(e.activity.id,a,l);let h=e.activity.isLiked;const u=wa(async(f,g,m)=>{if(m!==h){const y=await ue.anilist.toggleActivityLike(f,{id:g});F(!y.fromCache,"Mutation should never be cached"),y.status===200&&(e.activity.likeCount=y.data.data.ToggleLike.likeCount,e.activity.isLiked=y.data.data.ToggleLike.isLiked,e.mutateCache(v=>v),h===y.data.data.ToggleLike.isLiked&&(s(y.data.data.ToggleLike.likeCount),n(y.data.data.ToggleLike.isLiked)),h=m)}},500);return(()=>{var f=p$();return f.firstChild,f.$$click=()=>{n(g=>{F(typeof g=="boolean");const m=+!g*2-1;return s(y=>y+m),u(a(),e.activity.id,!g),!g})},f.$$mousemove=()=>r()&&o(!0),d(f,r,null),d(f,i(T,{get when(){var g;return N(()=>!!l())()&&((g=c())==null?void 0:g.data.likes.length)},get children(){return i(Tt,{tipPosition:"left",get children(){var g=m$();return d(g,i(H,{get each(){return c().data.likes},children:m=>(()=>{var y=v$(),v=y.firstChild;return d(y,()=>m.name,null),L(()=>G(v,"src",m.avatar.large)),y})()})),g}})}}),null),L(()=>f.classList.toggle("active",!!t())),f})()}$e(["mousemove","click"]);var $$=p('<ol data-k-82ba8cab class="flex-space-between activity">'),_$=p("<button data-k-82ba8cab>Refresh"),b$=p("<li data-k-82ba8cab>");function y$(e){const{accessToken:t}=ce(),[n,r]=O(e.cache.length?void 0:1),s=Me(hd,t,e.variables,n),[a]=al(e.isDebug,s);let l=0;const[o,c]=O(!1),[h,u]=O(!0),f=od(u),g=new Set,m=tr(mn,_=>!a.loading&&r(_),1e3);function y(){const _=v();_&&m(_)}function v(){var S,b;const _=Ae(o),A=Ae(h);if(k.has((S=e.cache.at(-1))==null?void 0:S.id)&&_)return Math.max(Math.floor(e.cache.length/25)+1,l+1);if(k.has((b=e.cache[0])==null?void 0:b.id)&&A)return 1;if(_){const x=[...k.difference(g)].sort((P,R)=>R-P);if(!x.length)return;const I=ga(x,.5),E=id(e.cache,P=>P.id-I);return E==-1?void 0:Math.ceil((E+1)/25)}}let $=0;q(le(a,_=>{var x,I,E,P,R;if(!((x=_==null?void 0:_.data)!=null&&x.activities.length))return;_.data.activities.forEach(B=>{g.add(B.id)});const A=((I=_.data.activities[0])==null?void 0:I.createdAt)||0,S=((E=ga(_.data.activities,.5))==null?void 0:E.createdAt)||A,b=Math.min(1e3*60*5,Math.max((A-S)*1e3,15e3));l=Math.max(l,_.data.pageInfo.currentPage),_.data.pageInfo.currentPage===1?(u(!1),c(!0),f(b,!0),l=1):_.data.pageInfo.currentPage>e.cache.length/25&&(((P=_.data.activities.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(u(!0),c(!1),l=0,$=0)),e.updateCache(_),y()}));const k=new Set,C=_=>{for(const A of _){const S=parseInt(A.target.dataset.id);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return He(()=>w.disconnect()),[i(T,{get when(){return N(()=>!!a.loading)()&&n()===1},get children(){return i(Jn,{class:"refresh",get children(){return i(Tt,{tipPosition:"bottom",get children(){return i(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh activities",children:"Loading activities"})}})}})}}),(()=>{var _=$$();return d(_,i(H,{get each(){return e.cache},children:A=>{let S;return Ln(()=>w.observe(S)),i(_l,{activity:A,get mutateCache(){return e.mutateCache},wrapper:b=>(()=>{var x=b$(),I=S;return typeof I=="function"?he(I,x):S=x,Lt(x,b,!1,!1),L(()=>G(x,"data-id",A.id)),x})()})}})),L(()=>_.classList.toggle("loading",!!(a.loading&&n()===1))),_})(),i(W,{get children(){return[i(M,{get when(){return a.loading&&n()>l&&e.cache.length},get children(){return i(Jn,{class:"new",get children(){return i(Tt,{tipPosition:"bottom",children:"Loading activities"})}})}}),i(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh activity feed to load more",(()=>{var _=_$();return _.$$click=()=>r(1),_})()]}})]}})]}$e(["click"]);var w$=p("<button>debug: ");function k$(e){const{accessToken:t}=ce(),n=Me(Af,t,e.variables),[r,{mutateCache:s,mutateBoth:a}]=nt(n),l=h=>{var u,f;(f=(u=h==null?void 0:h.data)==null?void 0:u.activities)!=null&&f.length&&a(g=>{var S,b,x;if(!((S=g==null?void 0:g.data)!=null&&S.length))return g.data=[h.data.activities],g;const m=h.data.activities.at(-1).id,y=yr(g.data[0],I=>I.id-m),v=((b=g.data[0][y])==null?void 0:b.id)===m;if(h.data.pageInfo.currentPage===1)return v?(g.data[0].splice(0,y+1,...h.data.activities),g):(g.data.unshift(h.data.activities),g.data.length=Math.min(g.data.length,5),g);const $=h.data.activities[0].id,k=yr(g.data[0],I=>I.id-$);if(k===0&&g.data[0][k].id!==$||(g.data[0].splice(k,y-k+v,...h.data.activities),v||g.data.length===1))return g;const w=yr(g.data[1],I=>I.id-m);if(((x=g.data[1][w])==null?void 0:x.id)!==m)return g;const[A]=g.data.splice(1,1);return A.splice(0,w+1),g.data[0].push(...A),g})},[o,c]=sl();return i(T,{get when(){return!r.loading},get children(){return[i(T,{get when(){return Zn},get children(){var h=w$();return h.firstChild,h.$$click=()=>c(u=>!u),d(h,()=>""+o(),null),h}}),i(y$,Fe({get cache(){var h,u;return((u=(h=r())==null?void 0:h.data)==null?void 0:u[0])||[]},isDebug:o,updateCache:l,mutateCache:s},e))]}})}$e(["click"]);var S$=p("<div><h2>Activity</h2><div><button>All</button><button>Text Status</button><button>List Progress</button></div><button>Following</button><button>Global");function C$(){const[e,t]=Fd("LOB_ACTIVITY_TYPE",void 0),[n,r]=lo("LOB_ACTIVITY_IS_FOLLOWING",!0),[s,a]=lo("LOB_ACTIVITY_HAS_REPLIES",void 0),[l,o]=Lm("LOB_ACTIVITY_QUERY",{isFollowing:!0});return q(()=>{o(c=>{const h={...c,activityType:e(),isFollowing:n(),hasReplies:s()};for(const u of Object.keys(h))if(h[u]!==c[u])return h;return c})}),(()=>{var c=S$(),h=c.firstChild,u=h.nextSibling,f=u.firstChild,g=f.nextSibling,m=g.nextSibling,y=u.nextSibling,v=y.nextSibling;return f.$$click=()=>t(void 0),g.$$click=()=>t("TEXT"),m.$$click=()=>t("MEDIA_LIST"),y.$$click=()=>{Oe(()=>{r(!0),a(void 0)})},v.$$click=()=>{Oe(()=>{r(!1),a(!0)})},d(c,i(T,{get when(){return l()},keyed:!0,get children(){return i(k$,{get variables(){return l()}})}}),null),c})()}$e(["click"]);var A$=p("<div data-k-9b8ac37b class=pg-home>");function x$(){const{accessToken:e,authUserData:t}=ce();return document.title="Home - LOB",i(T,{get when(){return t()},get children(){var n=A$();return d(n,i(zp,{get token(){return e()},get userId(){return t().data.id}}),null),d(n,i(C$,{get token(){return e()}}),null),n}})}function T$(){const t=Qt().hash.substring(1),r=new URLSearchParams(t).get("access_token");if(document.title="Authentication - LOB",(r==null?void 0:r.length)>50){const{setAccessToken:s}=ce();s(r)}return i(hn,{href:"/"})}function I$(e){const[t,{mutate:n}]=bh(async()=>new Promise(o=>{const c=()=>o(null),h=ze.user(c);h.onsuccess=u=>{const f=u.target.result,m=ze.store(f,"data","readonly",c).get("access_token");m.onsuccess=y=>o(y.target.result||null),m.onerror=c}})),r=o=>{Oe(()=>{xs(o),n(o)})};q(()=>{const o=t();o!==void 0&&xs(o)}),window.addEventListener("beforeunload",()=>{const o=Cn();o&&(sessionStorage["LOB-token"]=o)});const s=ze.user();s.onsuccess=o=>{const c=o.target.result,u=ze.store(c,"data","readonly").get("auth_profile_info");u.onsuccess=f=>{f.target.result!=null&&ri(f.target.result)}};const a=o=>{const c=ze.user();c.onsuccess=h=>{const u=h.target.result,g=ze.store(u,"data","readwrite").put(o,"access_token");g.onsuccess=()=>r(o)}},l=()=>{const o=ze.user();o.onsuccess=c=>{const h=c.target.result,u=ze.store(h,"data","readwrite");u.delete("access_token"),u.delete("auth_profile_info"),r(null),ri(null)}};return i(Bc.Provider,{value:{accessToken:Cn,setAccessToken:a,authUserData:jn,logoutUser:l},get children(){return i(T,{get when(){return Cn()!==void 0},get children(){return e.children}})}})}function _n(e){const[t,n]=O(window.matchMedia(e).matches),r=window.matchMedia(e),s=a=>n(a.matches);return r.addEventListener("change",s),He(()=>r.removeEventListener("change",s)),t}function E$(e){const t=_n("(max-width: 30em)"),n=_n("(max-width: 48em)"),r=_n("(max-width: 64em)"),s=_n("(max-width: 80em)"),a=_n("(max-width: 90em)"),l=_n("(max-width: 160em)"),o=_n("(hover: none) and (pointer: coarse)"),c=_n("(display-mode: standalone)");return i(Uc.Provider,{value:{isMobilSmall:t,isMobilLarge:n,isTablet:r,isLaptop:s,isDesktop:a,isDesktopLarge:l,isTouch:o,isPWA:c},get children(){return e.children}})}var L$=p("<div>Intersection");function $n(e){let t=L$();Ln(()=>{s.observe(t)}),He(()=>{s.disconnect()});const n={rootMargin:e.rootMargin||"800px"},r=a=>{a[0].isIntersecting!==!1&&(s.unobserve(a[0].target),e.onIntersection())},s=new IntersectionObserver(r,n);return i(W,{fallback:t,get children(){return[i(M,{get when(){return e.fetchResponse()},get children(){return e.children(e.fetchResponse.loading&&e.loading)}}),i(M,{get when(){return e.fetchResponse.loading},get children(){return e.loadingElement||"loading..."}})]}})}var P$=p("<div data-k-d1a22b47 class=multi-input-footer><button data-k-d1a22b47>Cancel</button><button data-k-d1a22b47>Ok"),M$=p("<form data-k-d1a22b47 class=multi-input><button data-k-d1a22b47 class=open-multi-input>Rating</button><dialog data-k-d1a22b47><div data-k-d1a22b47 class=wrapper><div data-k-d1a22b47 class=scroll-wrapper>"),D$=p("<li data-k-d1a22b47><label data-k-d1a22b47>G - All ages <input data-k-d1a22b47 type=checkbox name=rating value=g>"),R$=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG - Children <input data-k-d1a22b47 type=checkbox name=rating value=pg>"),N$=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG-13 - Teen 13 or older <input data-k-d1a22b47 type=checkbox name=rating value=pg13>"),O$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R - 17+ (violence & profanity) <input data-k-d1a22b47 type=checkbox name=rating value=r17>"),F$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - Mild nudity <input data-k-d1a22b47 type=checkbox name=rating value=r>"),B$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - (violence, profanity & mild nudity)<input data-k-d1a22b47 type=checkbox name=rating value=r>"),U$=p("<ol data-k-d1a22b47><li data-k-d1a22b47><label data-k-d1a22b47>Any rating <input data-k-d1a22b47 type=checkbox name=rating value=any></label></li><li data-k-d1a22b47><label data-k-d1a22b47>Rx - Hentai <input data-k-d1a22b47 type=checkbox name=rating value=rx>");function V$(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=M$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const b=S.currentTarget.querySelectorAll("input").length,I=new FormData(S.currentTarget).getAll("rating");S.target.value==="any"?S.target.checked?t({rating:"any"}):t({rating:void 0}):S.target.checked&&b-1===I.length?t({rating:"any"}):t({rating:I.filter(E=>E!=="any")})},m.addEventListener("submit",S=>{S.preventDefault()});var C=h;typeof C=="function"?he(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const S=o.signal;s=e.rating,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",b=>{b.target===a&&a.addEventListener("touchend",x=>{x.target===a&&(x.preventDefault(),u())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",b=>b.target!==c&&b.target.closest("dialog")!==a&&u(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?he(w,y):c=y,v.addEventListener("close",u);var _=a;typeof _=="function"?he(_,v):a=v;var A=l;return typeof A=="function"?he(A,k):l=k,d(k,i(g,{})),d($,i(T,{get when(){return n()},get children(){var S=P$(),b=S.firstChild,x=b.nextSibling;return b.$$click=()=>{u(),t({rating:s})},x.$$click=u,S}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({});return q(()=>{Array.isArray(m.rating)?v(Jt(m.rating.reduce(($,k)=>({...$,[k]:!0}),{}))):v(Jt({[m.rating]:!0}))}),(()=>{var $=U$(),k=$.firstChild,C=k.firstChild,w=C.firstChild,_=w.nextSibling,A=k.nextSibling,S=A.firstChild,b=S.firstChild,x=b.nextSibling;return d($,i(T,{get when(){return m.malSearch==="true"},get children(){return[(()=>{var I=D$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.g),I})(),(()=>{var I=R$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.pg),I})(),(()=>{var I=N$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.pg13),I})(),(()=>{var I=O$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r17),I})(),(()=>{var I=F$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r),I})()]}}),A),d($,i(T,{get when(){return m.malSearch!=="true"},get children(){var I=B$(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r),I}}),A),L(()=>_.checked=y.any),L(()=>x.checked=y.any||y.rx),$})()}}$e(["input","click"]);var G$=p('<label data-k-48bbc0c0 class=switch><input data-k-48bbc0c0 type=checkbox><span data-k-48bbc0c0 class="slider round">');function H$(e){return(()=>{var t=G$(),n=t.firstChild;return Lt(n,e,!1,!1),t})()}var j$=p("<div data-k-93c05ee9 class=multi-input-footer><button data-k-93c05ee9>Cancel</button><button data-k-93c05ee9>Ok"),Y$=p('<form data-k-93c05ee9 class=multi-input><button data-k-93c05ee9 class=open-multi-input>Genres</button><dialog data-k-93c05ee9><div data-k-93c05ee9 class=wrapper><div data-k-93c05ee9 class=multi-input-header><input data-k-93c05ee9 type=search placeholder="Filter genres"></div><div data-k-93c05ee9 class=scroll-wrapper>'),Oo=p("<h3 data-k-93c05ee9>Genres"),Na=p("<ol data-k-93c05ee9>"),q$=p("<h3 data-k-93c05ee9>Tags"),z$=p("<h3 data-k-93c05ee9>Themes"),Oa=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=excludeGenre>"),Fa=p("<li data-k-93c05ee9><label data-k-93c05ee9>"),Ba=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=genre>");function W$(e){const[t,n]=Te(),{isTouch:r}=en(),[s,a]=O("");let l=!1,o,c,h,u,f,g;function m(){c.close(),l=!1,u==null||u.abort(),n({preventFetch:void 0})}function y(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(le(r,m)),(()=>{var $=Y$(),k=$.firstChild,C=k.nextSibling,w=C.firstChild,_=w.firstChild,A=_.firstChild,S=_.nextSibling;$.$$input=P=>{const R=P.target.closest("li"),B=P.target.name;!P.target.checked&&!R.classList.contains("exclude")?(R.classList.add("exclude"),P.target.checked=!0,P.target.name="excludeGenre"):R.classList.contains("exclude")&&R.classList.remove("exclude");const V=new FormData(P.currentTarget);R.classList.contains("exclude")?n({[B]:V.getAll(B),[P.target.name]:V.getAll(P.target.name)}):n({[P.target.name]:V.getAll(P.target.name)})},$.addEventListener("submit",P=>{P.preventDefault()});var b=g;typeof b=="function"?he(b,$):g=$,k.$$click=()=>{if(l)m();else{u=new AbortController;const P=u.signal;o=t.genre,r()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",B=>{B.target===c&&(B.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),l=!0}};var x=f;typeof x=="function"?he(x,k):f=k,C.addEventListener("close",m);var I=c;typeof I=="function"?he(I,C):c=C,A.$$input=P=>{P.stopPropagation(),a(P.target.value.toLowerCase())};var E=h;return typeof E=="function"?he(E,S):h=S,d(S,i(v,{})),d(w,i(T,{get when(){return r()},get children(){var P=j$(),R=P.firstChild,B=R.nextSibling;return R.$$click=()=>{m(),n({genre:o})},B.$$click=m,P}}),null),L(()=>$.classList.toggle("mobile",!!r())),$})();function v(){const[$]=Te(),[k,C]=We({include:{},exclude:{}});return q(()=>{C(Jt({include:Xt($.genre,{}),exclude:Xt($.excludeGenre,{})}))}),i(W,{get children(){return[i(M,{get when(){return e.engine==="ani"},get children(){return i(T,{get when(){return e.aniGenres()},fallback:"Loading...",get children(){return[Oo(),(()=>{var w=Na();return d(w,i(H,{get each(){return e.aniGenres().data.genres},children:_=>(()=>{var A=Fa(),S=A.firstChild;return d(S,_,null),d(S,i(T,{get when(){return k.exclude[_]},get fallback(){return(()=>{var b=Ba();return b.value=_,L(()=>b.checked=k.include[_]),b})()},get children(){var b=Oa();return b.value=_,L(()=>b.checked=k.exclude[_]),b}}),null),L(b=>{var x=!!k.exclude[_],I=!_.toLowerCase().includes(s());return x!==b.e&&A.classList.toggle("exclude",b.e=x),I!==b.t&&A.classList.toggle("hidden",b.t=I),b},{e:void 0,t:void 0}),A})()})),w})(),q$(),(()=>{var w=Na();return d(w,i(H,{get each(){return e.aniGenres().data.tags},children:_=>(()=>{var A=Fa(),S=A.firstChild;return d(S,()=>_.name,null),d(S,i(T,{get when(){return k.exclude[_.name]},get fallback(){return(()=>{var b=Ba();return L(()=>b.value=_.name),L(()=>b.checked=k.include[_.name]),b})()},get children(){var b=Oa();return L(()=>b.value=_.name),L(()=>b.checked=k.exclude[_.name]),b}}),null),L(b=>{var x=!!k.exclude[_.name],I=!_.name.toLowerCase().includes(s());return x!==b.e&&A.classList.toggle("exclude",b.e=x),I!==b.t&&A.classList.toggle("hidden",b.t=I),b},{e:void 0,t:void 0}),A})()})),w})()]}})}}),i(M,{get when(){return e.engine==="mal"},get children(){return i(T,{get when(){return e.malGenres()},fallback:"Loading...",get children(){return[Oo(),(()=>{var w=Na();return d(w,i(H,{get each(){return e.malGenres().data.genres},children:_=>(()=>{var A=Fa(),S=A.firstChild;return d(S,()=>_.name,null),d(S,i(T,{get when(){return k.exclude[_.name]},get fallback(){return(()=>{var b=Ba();return L(()=>b.value=_.name),L(()=>b.checked=k.include[_.name]),b})()},get children(){var b=Oa();return L(()=>b.value=_.name),L(()=>b.checked=k.exclude[_.name]),b}}),null),L(b=>{var x=!!k.exclude[_.name],I=!_.name.toLowerCase().includes(s());return x!==b.e&&A.classList.toggle("exclude",b.e=x),I!==b.t&&A.classList.toggle("hidden",b.t=I),b},{e:void 0,t:void 0}),A})()})),w})(),z$(),(()=>{var w=Na();return d(w,i(H,{get each(){return e.malGenres().data.themes},children:_=>(()=>{var A=Fa(),S=A.firstChild;return d(S,()=>_.name,null),d(S,i(T,{get when(){return k.exclude[_.name]},get fallback(){return(()=>{var b=Ba();return L(()=>b.value=_.name),L(()=>b.checked=k.include[_.name]),b})()},get children(){var b=Oa();return L(()=>b.value=_.name),L(()=>b.checked=k.exclude[_.name]),b}}),null),L(b=>{var x=!!k.exclude[_.name],I=!_.name.toLowerCase().includes(s());return x!==b.e&&A.classList.toggle("exclude",b.e=x),I!==b.t&&A.classList.toggle("hidden",b.t=I),b},{e:void 0,t:void 0}),A})()})),w})()]}})}})]}})}}$e(["input","click"]);var K$=p('<div data-k-4bf0065c class=cp-two-headed-range><div data-k-4bf0065c class="point start"></div><div data-k-4bf0065c class="point end"></div><div data-k-4bf0065c class=progress-bar>');function $u(e){F(e.onChange,"onChange is missing");const t=Fe({min:0,max:100,separation:1},e),n=Fe({value:[t.min,t.max]},t);let r,s;q(le(()=>n.minValue,u=>{c(r,u||n.min)})),q(le(()=>n.maxValue,u=>{c(s,u||n.max)}));let a;Ln(()=>{o.observe(a)}),He(()=>{o.disconnect()});const l=u=>{u[0].isIntersecting===!0&&(c(s,n.maxValue),c(r,n.minValue))},o=new IntersectionObserver(l);return(()=>{var u=K$(),f=u.firstChild,g=f.nextSibling;u.$$mousedown=h,u.$$touchstart=h;var m=a;typeof m=="function"?he(m,u):a=u;var y=r;typeof y=="function"?he(y,f):r=f,f.style.setProperty("--percentage","0%");var v=s;return typeof v=="function"?he(v,g):s=g,g.style.setProperty("--percentage","100%"),L($=>{var k=n.min,C=n.max;return k!==$.e&&(($.e=k)!=null?f.style.setProperty("--value",k):f.style.removeProperty("--value")),C!==$.t&&(($.t=C)!=null?g.style.setProperty("--value",C):g.style.removeProperty("--value")),$},{e:void 0,t:void 0}),u})();function c(u,f){const g=u.closest(".cp-two-headed-range"),m=g.querySelector(".point.start"),y=g.querySelector(".point.end"),v=m.getBoundingClientRect(),$=y.getBoundingClientRect(),k=g.getBoundingClientRect();if(u===m){const C=$.left-k.left-v.width/2,_=Math.min(1,Math.max(0,(f-n.min)/(parseInt(y.style.getPropertyValue("--value"))-n.min)))*C/k.width;g.querySelector(".progress-bar").style.left=`${(_*100).toFixed(1)}%`,g.querySelector(".progress-bar").style.width=`${(parseInt(y.style.getPropertyValue("--percentage"))-_*100).toFixed(1)}%`,u.style.setProperty("--percentage",(_*100||0).toFixed(1)+"%"),u.style.setProperty("--value",f)}else if(u===y){const C=k.width-(v.right-k.left)-$.width/2,w=parseInt(m.style.getPropertyValue("--value")),_=Math.min(1,Math.max(0,(f-w)/(n.max-w)))*C,A=(v.right-k.left+$.width/2+_)/k.width;g.querySelector(".progress-bar").style.width=`${(A*100-parseInt(m.style.getPropertyValue("--percentage"))).toFixed(1)}%`,u.style.setProperty("--percentage",(A*100||0).toFixed(1)+"%"),u.style.setProperty("--value",f)}}function h(u){u.preventDefault();const f=new AbortController,g=f.signal,m=u.target.closest(".cp-two-headed-range"),y=u.clientX||u.touches[0].clientX,v=m.querySelector(".point.start").getBoundingClientRect(),$=m.querySelector(".point.end").getBoundingClientRect(),k=Math.min(Math.abs(y-v.left),Math.abs(y-v.right)),C=Math.min(Math.abs(y-$.left),Math.abs(y-$.right));let w,_,A=0;u.target.classList.contains("start")?(w=u.target,_=m.querySelector(".point.end")):u.target.classList.contains("end")?(w=u.target,_=m.querySelector(".point.start")):k<C?(w=m.querySelector(".point.start"),_=m.querySelector(".point.end")):(w=m.querySelector(".point.end"),_=m.querySelector(".point.start"));const S=w.classList.contains("end"),b=m.getBoundingClientRect(),x=w.getBoundingClientRect(),I=_.getBoundingClientRect();let E,P=b.left;S?(E=b.width-(I.right-b.left)-I.width/2,P=I.right+I.width/2):E=I.left-b.left-x.width/2,u.target===w&&(A=y-(x.left+x.width/2)),R(y);function R(B){const V=Math.max(Math.min(1,(B-A-P)/E),0),X=S?parseInt(_.style.getPropertyValue("--value"))+n.separation:n.min,j=S?n.max:parseInt(_.style.getPropertyValue("--value"))-n.separation,K=S?(b.width-E)/b.width:0,ae=S?1:E/b.width,re=Math.max(Math.min(ae,(B-A-b.left)/b.width),K);S?m.querySelector(".progress-bar").style.width=`${(re*100-parseInt(_.style.getPropertyValue("--percentage"))).toFixed(1)}%`:(m.querySelector(".progress-bar").style.left=`${(re*100).toFixed(1)}%`,m.querySelector(".progress-bar").style.width=`${(parseInt(_.style.getPropertyValue("--percentage"))-re*100).toFixed(1)}%`),w.style.setProperty("--percentage",(re*100).toFixed(1)+"%"),w.style.setProperty("--value",X+Math.round((j-X)*V))}w.classList.add("active"),g.addEventListener("abort",()=>{w.classList.remove("active"),S?n.onChange([parseInt(_.style.getPropertyValue("--value")),parseInt(w.style.getPropertyValue("--value"))]):n.onChange([parseInt(w.style.getPropertyValue("--value")),parseInt(_.style.getPropertyValue("--value"))])}),window.addEventListener("mousemove",B=>{B.preventDefault(),B.buttons===1?R(B.clientX):f.abort()},{signal:g}),window.addEventListener("touchmove",B=>{B.preventDefault();const[{clientX:V}]=B.touches;R(V)},{signal:g}),window.addEventListener("touchend",()=>{f.abort()},{signal:g,once:!0})}}$e(["touchstart","mousedown"]);const bn=Ya(),ns={trending:{order:"trending"},popular:{order:"popularity"},novel:{format:"lightnovel"},finished:{order:"end_date_filtered",status:"complete"},new:{order:"id"},"top-100":{order:"score"},"finished-manga":{order:"end_date_filtered",status:"complete",format:"manga"},"finished-novel":{order:"end_date_filtered",status:"complete",format:"lightnovel"},ani:{tba:{season:"tba",status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{country:"KR"}},mal:{tba:{status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{format:"manhwa"}}};function J$(e,...t){return t.some(n=>n in e&&(e[n]==null||e[n].length===0))}function Ai(){const e=ne(),t=Qt(),n=pn(),[r,s]=Te();return[a=>Q$(r,e,a),(a,l)=>e1(r,s,e,n,t,a,l)]}function X$(){const e=ne(),t=Qt(),n=pn(),[r]=Te();return s=>t1(r,e,n,t,s)}function Z$(){const e=ne(),t=Qt(),n=pn(),[r]=Te();return()=>n(`/search/${e.type}${yl(r,e,t,{})}`,{scroll:!1})}function Q$(e,t,n){return e[n]||bl(e,t)[n]}function bl(e,t,n){return Ls(e.malSearch==="true",t.header,t.type,n)||{}}function Ls(e,t,n,r){var l,o,c;const s=r||t;if(s!=null&&s.match(/^(summer|fall|spring|winter)-\d+$/)){const[h,u]=s.split("-");return{year:u,season:h,order:"title_romaji",sort:"ASC"}}const a=e?"mal":"ani";return ns[s]||((l=ns[a])==null?void 0:l[s])||((c=(o=ns[a])==null?void 0:o[n])==null?void 0:c[s])}function e1(e,t,n,r,s,a,l){var h;const o=bl(e,n),c=(...u)=>yl(e,n,s,...u);if(J$(a,...Object.keys(o)))return r(`/search/${n.type}${c(a)}`,{scroll:!1,...l});if((h=n.header)!=null&&h.match(/^(summer|fall|spring|winter)-\d+$/)){const{season:u=o.season,year:f=o.year,...g}=a,m=`${u}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...l})}if(n.header==="this-season"||n.header==="next-season"){const{season:u=e.season,year:f=e.year,...g}=a;if(u!=null&&f!=null){const m=`${u}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...l})}}t(a,l)}function t1(e,t,n,r,s){const a=Ls(e.malSearch==="true",t.header,t.type),l=Ls(e.malSearch==="true",t.header,s);return!a||l?n("/"+t.mode+"/"+s+(t.header?"/"+t.header:"")+r.search):n(`/search/${s}${yl(e,t,r,{},!0)}`,{scroll:!1})}function yl(e,t,n,r,s=!0,a){const l=bl(e,t,a),o=Object.fromEntries(new URLSearchParams(n.search)),c=[...new URLSearchParams(n.search)].filter(([g,m])=>!(g in r||!s&&g in l&&l[g]==m)).map(([g,m])=>`${g}=${m}`),h=s===!1?[]:Object.entries(l).filter(([g])=>!(g in r||g in o)).map(([g,m])=>`${g}=${m}`),u=Object.entries(r).filter(([,g])=>n1(g)).map(([g,m])=>Array.isArray(m)?m.map(y=>`${g}=${y}`).join("&"):`${g}=${m}`),f=h.concat(c).concat(u).join("&");return f.length?"?"+f:""}function n1(e){return e!=null&&e.length!=0}var r1=p("<button data-k-53d51b9e>Cancel"),a1=p("<button data-k-53d51b9e>Ok"),i1=p('<form data-k-53d51b9e class=multi-input><button data-k-53d51b9e class=open-multi-input>Year</button><dialog data-k-53d51b9e closedby=any><div data-k-53d51b9e class=wrapper><div data-k-53d51b9e class=multi-input-header><input data-k-53d51b9e type=search placeholder="Search year"></div><div data-k-53d51b9e class=scroll-wrapper></div><div data-k-53d51b9e class=multi-input-footer><div data-k-53d51b9e class=flex-space-between><input data-k-53d51b9e type=number inputmode=numeric name=startYear><input data-k-53d51b9e type=number inputmode=numeric name=endYear>'),s1=p("<ol data-k-53d51b9e>"),l1=p("<li data-k-53d51b9e><label data-k-53d51b9e> <input data-k-53d51b9e type=radio name=year>");function o1(){const[e,t]=Ai(),{isTouch:n}=en(),[r,s]=O(""),a=new Date().getFullYear()+2;let l=!1,o={},c,h,u,f,g;const m=tr(mn,(k,C)=>t(k,C),100);function y(){c.close(),l=!1,u==null||u.abort(),t({preventFetch:void 0})}function v(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(le(n,y)),(()=>{var k=i1(),C=k.firstChild,w=C.nextSibling,_=w.firstChild,A=_.firstChild,S=A.firstChild,b=A.nextSibling,x=b.nextSibling,I=x.firstChild,E=I.firstChild,P=E.nextSibling;k.$$input=j=>{j.target.name==="year"&&m({[j.target.name]:j.target.checked?j.target.value:void 0,season:e("season"),startYear:void 0,endYear:void 0})},k.addEventListener("submit",j=>{j.preventDefault()});var R=g;typeof R=="function"?he(R,k):g=k,C.$$click=()=>{if(l)y();else{u=new AbortController;const j=u.signal;o={year:e("year"),startYear:e("startYear"),endYear:e("endYear")},n()?(c.showModal(),m({preventFetch:!0}),v(),window.addEventListener("resize",v,{signal:j}),c.addEventListener("touchstart",K=>{K.target===c&&c.addEventListener("touchend",ae=>{ae.target===c&&(ae.preventDefault(),y())},{once:!0,signal:j})},{signal:j})):(window.addEventListener("mousedown",K=>K.target!==f&&K.target.closest("dialog")!==c&&y(),{signal:j}),c.show()),l=!0}};var B=f;typeof B=="function"?he(B,C):f=C,w.addEventListener("close",y);var V=c;typeof V=="function"?he(V,w):c=w,S.$$input=j=>{j.stopPropagation(),s(j.target.value.toLowerCase())};var X=h;return typeof X=="function"?he(X,b):h=b,d(b,i($,{})),d(x,i($u,{min:1970,max:a,separation:1,get minValue(){return+e("startYear")||1970},get maxValue(){return+e("endYear")||a},onChange:([j,K])=>m({startYear:j,endYear:K,year:void 0})}),I),E.$$beforeinput=j=>{var K;(K=j.data)!=null&&K.toLowerCase().includes("e")&&j.preventDefault()},E.addEventListener("blur",j=>j.target.value=e("startYear")||1970),E.addEventListener("change",j=>{m({startYear:Math.min(+j.target.value,+e("endYear")||a),endYear:Math.max(+j.target.value,+e("endYear")||a),year:void 0})}),P.$$beforeinput=j=>{var K;(K=j.data)!=null&&K.toLowerCase().includes("e")&&j.preventDefault()},P.addEventListener("blur",j=>j.target.value=e("endYear")||a),P.addEventListener("change",j=>{m({startYear:Math.min(+j.target.value,+e("startYear")||1970),endYear:Math.max(+j.target.value,+e("startYear")||1970),year:void 0})}),d(x,i(T,{get when(){return n()},get children(){return[(()=>{var j=r1();return j.$$click=()=>{y(),t(o)},j})(),(()=>{var j=a1();return j.$$click=y,j})()]}}),null),L(()=>k.classList.toggle("mobile",!!n())),L(()=>E.value=+e("startYear")||1970),L(()=>P.value=+e("endYear")||a),k})();function $(){return(()=>{var k=s1();return d(k,i(H,{get each(){return Array.from({length:Math.abs(a-1969)},(C,w)=>a-w)},children:C=>(()=>{var w=l1(),_=w.firstChild,A=_.firstChild,S=A.nextSibling;return d(_,C,A),S.value=C,L(()=>w.classList.toggle("hidden",!C.toString().startsWith(r()))),L(()=>S.checked=e("year")==C),w})()})),k})()}}$e(["input","click","beforeinput"]);var c1=p("<div data-k-ddc3fe99 class=multi-input-footer><button data-k-ddc3fe99>Cancel</button><button data-k-ddc3fe99>Ok"),d1=p("<form data-k-ddc3fe99 class=multi-input><button data-k-ddc3fe99 class=open-multi-input>Formats</button><dialog data-k-ddc3fe99><div data-k-ddc3fe99 class=wrapper><div data-k-ddc3fe99 class=scroll-wrapper>"),u1=p("<ol data-k-ddc3fe99>"),h1=p("<li data-k-ddc3fe99><label data-k-ddc3fe99><input data-k-ddc3fe99 type=checkbox name=format>");function g1(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=d1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const x=new FormData(S.currentTarget).getAll("format");t({format:x})},m.addEventListener("submit",S=>{S.preventDefault()});var C=h;typeof C=="function"?he(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const S=o.signal;s=e.format,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",b=>{b.target===a&&a.addEventListener("touchend",x=>{x.target===a&&(x.preventDefault(),u())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",b=>b.target!==c&&b.target.closest("dialog")!==a&&u(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?he(w,y):c=y,v.addEventListener("close",u);var _=a;typeof _=="function"?he(_,v):a=v;var A=l;return typeof A=="function"?he(A,k):l=k,d(k,i(g,{})),d($,i(T,{get when(){return n()},get children(){var S=c1(),b=S.firstChild,x=b.nextSibling;return b.$$click=()=>{u(),t({format:s})},x.$$click=u,S}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.format,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani";return(()=>{var C=u1();return d(C,i(H,{get each(){return Object.entries(Wn[k()][$.type]||{})},fallback:"Something went wrong",children:([w,_])=>(()=>{var A=h1(),S=A.firstChild,b=S.firstChild;return d(S,()=>_.flavorText,b),b.value=w,L(()=>b.checked=y[w]),A})()})),C})()}}$e(["input","click"]);var f1=p("<div data-k-3f80fe5b class=multi-input-footer><button data-k-3f80fe5b>Cancel</button><button data-k-3f80fe5b>Ok"),m1=p("<form data-k-3f80fe5b class=multi-input><div data-k-3f80fe5b class=open-button-wrapper><button data-k-3f80fe5b class=open-multi-input>Sort order</button><button data-k-3f80fe5b type=button></button></div><dialog data-k-3f80fe5b><div data-k-3f80fe5b class=wrapper><div data-k-3f80fe5b class=scroll-wrapper>"),p1=p("<ol data-k-3f80fe5b>"),v1=p("<li data-k-3f80fe5b><label data-k-3f80fe5b><input data-k-3f80fe5b type=radio name=order>");function $1(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=m1(),y=m.firstChild,v=y.firstChild,$=v.nextSibling,k=y.nextSibling,C=k.firstChild,w=C.firstChild;m.$$input=x=>{t({order:x.target.value})},m.addEventListener("submit",x=>{x.preventDefault()});var _=h;typeof _=="function"?he(_,m):h=m,v.$$click=()=>{if(r)u();else{o=new AbortController;const x=o.signal;s=e.order,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:x}),a.addEventListener("touchstart",I=>{I.target===a&&a.addEventListener("touchend",E=>{E.target===a&&(E.preventDefault(),u())},{once:!0,signal:x})},{signal:x})):(window.addEventListener("mousedown",I=>I.target!==c&&I.target.closest("dialog")!==a&&u(),{signal:x}),a.show()),r=!0}};var A=c;typeof A=="function"?he(A,v):c=v,$.$$click=()=>t({sort:e.sort?void 0:"ASC"}),d($,()=>e.sort||"DESC"),k.addEventListener("close",u);var S=a;typeof S=="function"?he(S,k):a=k;var b=l;return typeof b=="function"?he(b,w):l=w,d(w,i(g,{})),d(C,i(T,{get when(){return n()},get children(){var x=f1(),I=x.firstChild,E=I.nextSibling;return I.$$click=()=>{u(),t({order:s})},E.$$click=u,x}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.order,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(zt[k()][$.type]||{}).sort(([,w],[,_])=>w.flavorText.localeCompare(_));return(()=>{var w=p1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([_,A])=>(()=>{var S=v1(),b=S.firstChild,x=b.firstChild;return d(b,()=>A.flavorText,x),L(()=>x.value=A.alternative_key||_),L(()=>x.checked=y[_]||A.alternative_key&&y[A.alternative_key]),S})()})),w})()}}$e(["input","click"]);var _1=p("<div data-k-d25d331a class=multi-input-footer><button data-k-d25d331a>Cancel</button><button data-k-d25d331a>Ok"),b1=p("<form data-k-d25d331a class=multi-input><button data-k-d25d331a class=open-multi-input>Status</button><dialog data-k-d25d331a><div data-k-d25d331a class=wrapper><div data-k-d25d331a class=scroll-wrapper>"),y1=p("<ol data-k-d25d331a>"),w1=p("<li data-k-d25d331a><label data-k-d25d331a><input data-k-d25d331a type=radio name=status>");function k1(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=b1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{t({[S.target.name]:S.target.value})},m.addEventListener("submit",S=>{S.preventDefault()});var C=h;typeof C=="function"?he(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const S=o.signal;s=e.status,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",b=>{b.target===a&&a.addEventListener("touchend",x=>{x.target===a&&(x.preventDefault(),u())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",b=>b.target!==c&&b.target.closest("dialog")!==a&&u(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?he(w,y):c=y,v.addEventListener("close",u);var _=a;typeof _=="function"?he(_,v):a=v;var A=l;return typeof A=="function"?he(A,k):l=k,d(k,i(g,{})),d($,i(T,{get when(){return n()},get children(){var S=_1(),b=S.firstChild,x=b.nextSibling;return b.$$click=()=>{u(),t({status:s})},x.$$click=u,S}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.status,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(Sn[k()][$.type]||{}).sort(([,w],[,_])=>w.flavorText.localeCompare(_));return(()=>{var w=y1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([_,A])=>(()=>{var S=w1(),b=S.firstChild,x=b.firstChild;return d(b,()=>A.flavorText,x),x.value=_,L(()=>x.checked=y[_]),S})()})),w})()}}$e(["input","click"]);var S1=p("<div data-k-829b0f47 class=multi-input-footer><button data-k-829b0f47>Cancel</button><button data-k-829b0f47>Ok"),C1=p("<form data-k-829b0f47 class=multi-input><button data-k-829b0f47 class=open-multi-input>Country</button><dialog data-k-829b0f47><div data-k-829b0f47 class=wrapper><div data-k-829b0f47 class=scroll-wrapper>"),A1=p("<ol data-k-829b0f47>"),x1=p("<li data-k-829b0f47><label data-k-829b0f47><input data-k-829b0f47 type=radio name=country>");function T1(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=C1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{t({[S.target.name]:S.target.value})},m.addEventListener("submit",S=>{S.preventDefault()});var C=h;typeof C=="function"?he(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const S=o.signal;s=e.country,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",b=>{b.target===a&&a.addEventListener("touchend",x=>{x.target===a&&(x.preventDefault(),u())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",b=>b.target!==c&&b.target.closest("dialog")!==a&&u(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?he(w,y):c=y,v.addEventListener("close",u);var _=a;typeof _=="function"?he(_,v):a=v;var A=l;return typeof A=="function"?he(A,k):l=k,d(k,i(g,{})),d($,i(T,{get when(){return n()},get children(){var S=S1(),b=S.firstChild,x=b.nextSibling;return b.$$click=()=>{u(),t({country:s})},x.$$click=u,S}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({});q(()=>{v(Jt(Xt(m.country,{})))});const $=()=>Object.entries(Yc).sort(([,k],[,C])=>k.flavorText.localeCompare(C));return(()=>{var k=A1();return d(k,i(H,{get each(){return $()},fallback:"Something went wrong",children:([C,w])=>(()=>{var _=x1(),A=_.firstChild,S=A.firstChild;return d(A,()=>w.flavorText,S),S.value=C,L(()=>S.checked=y[C]),_})()})),k})()}}$e(["input","click"]);var I1=p("<div data-k-de2dabd3 class=multi-input-footer><button data-k-de2dabd3>Cancel</button><button data-k-de2dabd3>Ok"),E1=p('<form data-k-de2dabd3 class=multi-input><button data-k-de2dabd3 class=open-multi-input>Source</button><dialog data-k-de2dabd3><div data-k-de2dabd3 class=wrapper><div data-k-de2dabd3 class=multi-input-header><input data-k-de2dabd3 type=search placeholder="Filter sources"></div><div data-k-de2dabd3 class=scroll-wrapper>'),L1=p("<ol data-k-de2dabd3>"),P1=p("<li data-k-de2dabd3><label data-k-de2dabd3><input data-k-de2dabd3 type=radio name=source>");function M1(){const[e,t]=Te(),[n,r]=O(""),{isTouch:s}=en();let a=!1,l,o,c,h,u,f;function g(){o.close(),a=!1,h==null||h.abort(),t({preventFetch:void 0})}function m(){c.classList.toggle("has-scroll-bar",c.scrollHeight-c.clientHeight>0)}return q(le(s,g)),(()=>{var v=E1(),$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=C.firstChild,_=w.firstChild,A=w.nextSibling;v.$$input=E=>{t({[E.target.name]:E.target.value})},v.addEventListener("submit",E=>{E.preventDefault()});var S=f;typeof S=="function"?he(S,v):f=v,$.$$click=()=>{if(a)g();else{h=new AbortController;const E=h.signal;l=e.source,s()?(o.showModal(),t({preventFetch:!0}),m(),window.addEventListener("resize",m,{signal:E}),o.addEventListener("touchstart",P=>{P.target===o&&o.addEventListener("touchend",R=>{R.target===o&&(R.preventDefault(),g())},{once:!0,signal:E})},{signal:E})):(window.addEventListener("mousedown",P=>P.target!==u&&P.target.closest("dialog")!==o&&g(),{signal:E}),o.show()),a=!0}};var b=u;typeof b=="function"?he(b,$):u=$,k.addEventListener("close",g);var x=o;typeof x=="function"?he(x,k):o=k,_.$$input=E=>{E.stopPropagation(),r(E.target.value.toLowerCase())};var I=c;return typeof I=="function"?he(I,A):c=A,d(A,i(y,{})),d(C,i(T,{get when(){return s()},get children(){var E=I1(),P=E.firstChild,R=P.nextSibling;return P.$$click=()=>{g(),t({source:l})},R.$$click=g,E}}),null),L(()=>v.classList.toggle("mobile",!!s())),v})();function y(){const[v]=Te(),[$,k]=We({});q(()=>{k(Jt(Xt(v.source,{})))});const C=()=>Object.entries(Xs).sort(([,w],[,_])=>w.flavorText.localeCompare(_));return(()=>{var w=L1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([_,A])=>(()=>{var S=P1(),b=S.firstChild,x=b.firstChild;return d(b,()=>A.flavorText,x),x.value=_,L(()=>S.classList.toggle("hidden",!A.flavorText.toLowerCase().includes(n()))),L(()=>x.checked=$[_]),S})()})),w})()}}$e(["input","click"]);var D1=p("<div data-k-86a7e743 class=multi-input-footer><button data-k-86a7e743>Cancel</button><button data-k-86a7e743>Ok"),R1=p('<form data-k-86a7e743 class=multi-input><button data-k-86a7e743 class=open-multi-input>ExternalSources</button><dialog data-k-86a7e743><div data-k-86a7e743 class=wrapper><div data-k-86a7e743 class=multi-input-header><input data-k-86a7e743 type=search placeholder="Filter external sources"></div><div data-k-86a7e743 class=scroll-wrapper>'),N1=p("<ol data-k-86a7e743>"),O1=p('<img data-k-86a7e743 alt="External source logo">'),F1=p("<sup data-k-86a7e743>"),B1=p("<li data-k-86a7e743><label data-k-86a7e743><div data-k-86a7e743 class=grid-wrapper><span data-k-86a7e743></span></div><input data-k-86a7e743 type=checkbox name=externalSource>");function U1(e){const[t,n]=Te(),[r,s]=O(""),{isTouch:a}=en();let l=!1,o,c,h,u,f,g;function m(){c.close(),l=!1,u==null||u.abort(),n({preventFetch:void 0})}function y(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(le(a,m)),(()=>{var $=R1(),k=$.firstChild,C=k.nextSibling,w=C.firstChild,_=w.firstChild,A=_.firstChild,S=_.nextSibling;$.$$input=P=>{const R=new FormData(P.currentTarget);n({[P.target.name]:R.getAll(P.target.name)})},$.addEventListener("submit",P=>{P.preventDefault()});var b=g;typeof b=="function"?he(b,$):g=$,k.$$click=()=>{if(l)m();else{u=new AbortController;const P=u.signal;o=t.externalSource,a()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",B=>{B.target===c&&(B.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),l=!0}};var x=f;typeof x=="function"?he(x,k):f=k,C.addEventListener("close",m);var I=c;typeof I=="function"?he(I,C):c=C,A.$$input=P=>{P.stopPropagation(),s(P.target.value.toLowerCase())};var E=h;return typeof E=="function"?he(E,S):h=S,d(S,i(v,{})),d(w,i(T,{get when(){return a()},get children(){var P=D1(),R=P.firstChild,B=R.nextSibling;return R.$$click=()=>{m(),n({externalSource:o})},B.$$click=m,P}}),null),L(()=>$.classList.toggle("mobile",!!a())),$})();function v(){const[$]=Te(),[k,C]=We({});return q(()=>{C(Jt(Xt($.externalSource,{})))}),(()=>{var w=N1();return d(w,i(H,{get each(){var _;return((_=e.sources())==null?void 0:_.data)||[]},fallback:"Loading",children:_=>(()=>{var A=B1(),S=A.firstChild,b=S.firstChild,x=b.firstChild,I=b.nextSibling;return d(b,i(T,{get when(){return _.icon},get children(){var E=O1();return L(P=>{var R=_.icon,B=_.color;return R!==P.e&&G(E,"src",P.e=R),B!==P.t&&((P.t=B)!=null?E.style.setProperty("background-color",B):E.style.removeProperty("background-color")),P},{e:void 0,t:void 0}),E}}),x),d(x,()=>_.site,null),d(x,i(T,{get when(){return _.language},get children(){var E=F1();return d(E,()=>_.language),E}}),null),L(()=>A.classList.toggle("hidden",!_.site.toLowerCase().includes(r()))),L(()=>I.value=_.id),L(()=>I.checked=k[_.id]),A})()})),w})()}}$e(["input","click"]);var V1=p("<div data-k-b93bd9f3 class=multi-input-footer><button data-k-b93bd9f3>Cancel</button><button data-k-b93bd9f3>Ok"),G1=p("<form data-k-b93bd9f3 class=multi-input><button data-k-b93bd9f3 class=open-multi-input>Seasons</button><dialog data-k-b93bd9f3><div data-k-b93bd9f3 class=wrapper><div data-k-b93bd9f3 class=scroll-wrapper>"),H1=p("<ol data-k-b93bd9f3>"),j1=p("<li data-k-b93bd9f3><label data-k-b93bd9f3><input data-k-b93bd9f3 type=radio name=season>");function Y1(){const[e,t]=Ai(),{isTouch:n}=en();let r=!1,s,a,l,o,c,h;function u(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return q(le(n,u)),(()=>{var m=G1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const x=new FormData(S.currentTarget).getAll("season");t({season:x,year:e("year")})},m.addEventListener("submit",S=>{S.preventDefault()});var C=h;typeof C=="function"?he(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const S=o.signal;s=e("season"),n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",b=>{b.target===a&&a.addEventListener("touchend",x=>{x.target===a&&(x.preventDefault(),u())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",b=>b.target!==c&&b.target.closest("dialog")!==a&&u(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?he(w,y):c=y,v.addEventListener("close",u);var _=a;typeof _=="function"?he(_,v):a=v;var A=l;return typeof A=="function"?he(A,k):l=k,d(k,i(g,{})),d($,i(T,{get when(){return n()},get children(){var S=V1(),b=S.firstChild,x=b.nextSibling;return b.$$click=()=>{u(),t({season:s})},x.$$click=u,S}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const m=ne(),[y,v]=We({});q(()=>{v(Jt(Xt(e("season"),{})))});const $=()=>e("malSearch")==="true"&&(m.type==="anime"||m.type==="manga")?"mal":"ani";return(()=>{var k=H1();return d(k,i(H,{get each(){var C;return Object.entries(((C=ua[$()])==null?void 0:C[m.type])||{})},fallback:"Something went wrong",children:([C,w])=>i(T,{when:C!=="tba",get children(){var _=j1(),A=_.firstChild,S=A.firstChild;return d(A,()=>w.flavorText,S),S.value=C,L(()=>S.checked=y[C]),_}})})),k})()}}$e(["input","click"]);var q1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 0.01 512.01 511.99"><path fill=currentColor d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">');function _u(){return q1()}var z1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">');function W1(){return z1()}var K1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0.03 447.99 512.02"><path fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">');function J1(){return K1()}var X1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 65.1 512 381.8"><path fill=currentColor d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">');function Z1(){return X1()}var Q1=p('<svg viewBox="0 0 16 16"xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z">');function e_(){return Q1()}var t_=p('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path fill=currentColor d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">');function Sa(e){return(()=>{var t=t_();return Lt(t,e,!0,!0),t})()}var n_=p("<tool-tip2 data-k-6bfde80e inert role=tooltip>",!0,!1,!1);function r_(e){return It(e.positions,"positions"),(()=>{var t=n_();return Lt(t,e,!1,!1),t._$owner=Rr(),L(()=>G(t,"data-tooltip-positions",e.positions)),t})()}var a_=p("<li data-k-5face4dc>"),i_=p("<button data-k-5face4dc class=cp-media-action-item data-tooltip-trigger>");function Jr(e){return(()=>{var t=a_();return d(t,i(bu,e)),t})()}function bu(e){return It(e.label,"label"),fn(e.onClick,"onClick"),(()=>{var t=i_();return Xa(t,"click",e.onClick,!0),d(t,()=>e.children,null),d(t,i(r_,{positions:"left right",get children(){return e.label}}),null),L(()=>t.classList.toggle("big",!!e.big)),t})()}$e(["click"]);var s_=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z">');function l_(){return s_()}var o_=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z">');function c_(){return o_()}var yu=p("<div data-k-2ffecdb9 class=score> "),wu=p("<div data-k-2ffecdb9 class=wrapper><img data-k-2ffecdb9 class=absolute-inset alt=Cover.>"),d_=p("<div data-k-2ffecdb9 class=list-status>"),ku=p("<p data-k-2ffecdb9 class=line-clamp>"),Su=p('<li data-k-2ffecdb9 class="cp-media-card inline-container">'),u_=p("<ul data-k-2ffecdb9 class=cp-media-card-quick-action-items>"),h_=p('<div data-k-2ffecdb9 class="absolute-inset recommendation-rating-wrapper"><div data-k-2ffecdb9 class=flex-space-between><div data-k-2ffecdb9><button data-k-2ffecdb9></button><button data-k-2ffecdb9></button></div><span data-k-2ffecdb9>'),Cu=p("<li data-k-2ffecdb9 class=cp-character-card>"),g_=p("<img data-k-2ffecdb9>"),f_=p("<div data-k-2ffecdb9 class=grid><span data-k-2ffecdb9></span><span data-k-2ffecdb9>");function Au(e){return F(e.media,"Missing media"),(()=>{var t=Su();return d(t,i(U,{class:"block-link",get href(){return dd(e.media)},get children(){return[(()=>{var n=wu(),r=n.firstChild;return d(n,i(T,{get when(){return e.media.averageScore},get children(){var s=yu(),a=s.firstChild;return d(s,i(Sa,{}),a),d(s,()=>e.media.averageScore/10,null),s}}),null),d(n,()=>e.children,null),L(()=>G(r,"src",e.media.coverImage.large)),n})(),(()=>{var n=ku();return d(n,i(T,{get when(){var r;return(r=e.media.mediaListEntry)==null?void 0:r.status},get children(){var r=d_();return L(()=>G(r,"data-status",e.media.mediaListEntry.status)),r}}),null),d(n,()=>e.media.title.userPreferred,null),n})()]}})),t})()}function m_(e){return F(e.media,"Missing media"),(()=>{var t=Su();return d(t,i(U,{class:"block-link",get href(){return cd(e.type,e.media)},get children(){return[(()=>{var n=wu(),r=n.firstChild;return d(n,i(T,{get when(){return e.media.score},get children(){var s=yu(),a=s.firstChild;return d(s,i(Sa,{}),a),d(s,()=>e.media.score,null),s}}),null),d(n,()=>e.children,null),L(()=>G(r,"src",e.media.images.webp.large_image_url)),n})(),(()=>{var n=ku();return d(n,i(T,{get when(){return e.media.titles},get fallback(){return e.media.title},get children(){return i(W,{get children(){return[i(M,{get when(){return e.media.titles.English},get children(){return e.media.titles.English}}),i(M,{get when(){return e.media.titles.Default},get children(){return e.media.titles.Default}})]}})}})),n})()]}})),t})()}function xi(e){return F(e.media,"Missing media"),i(Au,Fe(e,{get children(){return i(xu,e)}}))}function Ps(e){return F(e.media,"Missing media"),It(e.type),i(m_,Fe(e,{get children(){return i(T,{get when(){return co[e.media.mal_id]},get children(){return i(xu,{get media(){return co[e.media.mal_id]}})}})}}))}function xu(e){const{openEditor:t}=zs(),{accessToken:n}=ce();return F(e.media,"Missing media"),i(T,{get when(){return n()},get children(){var r=u_();return d(r,i(Jr,{label:"Edit media",onClick:s=>{s.preventDefault(),t(e.media)},get children(){return i(_u,{})}}),null),d(r,i(Jr,{label:"Set to planning",onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"PLANNING"})},get children(){return i(W1,{})}}),null),d(r,i(Jr,{get label(){return"Set to "+(e.media.type==="ANIME"?"watching":"reading")},onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"CURRENT"})},get children(){return i(J1,{})}}),null),d(r,i(Jr,{label:"Set to completed",onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"COMPLETED"})},get children(){return i(Z1,{})}}),null),d(r,i(Jr,{get label(){return"Set to "+(e.media.type==="ANIME"?"rewatching":"rereading")},onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"REPEAT"})},get children(){return i(e_,{})}}),null),r}})}function p_(e){return F(e.node,"Missing node"),fn(e.handleRateUp,"handleRateUp"),fn(e.handleRateDown,"handleRateDown"),It(e.userRating,"userRating"),ed(e.rating,"rating"),i(Au,{get media(){return e.node.mediaRecommendation},get children(){var t=h_(),n=t.firstChild,r=n.firstChild,s=r.firstChild,a=s.nextSibling,l=r.nextSibling;return Xa(s,"click",e.handleRateUp,!0),s.style.setProperty("--color","lime"),d(s,i(l_,{})),Xa(a,"click",e.handleRateDown,!0),a.style.setProperty("--color","crimson"),d(a,i(c_,{})),d(l,i(T,{get when(){return e.rating>0},children:"+"}),null),d(l,()=>e.rating,null),L(o=>{var c=e.userRating==="RATE_UP",h=e.userRating==="RATE_DOWN";return c!==o.e&&s.classList.toggle("active",o.e=c),h!==o.t&&a.classList.toggle("active",o.t=h),o},{e:void 0,t:void 0}),t}})}function Tu(e){return F(e.character,"character"),It(e.role,"role"),(()=>{var t=Cu();return d(t,i(Ms,{get href(){return pf(e.character)},get src(){return e.character.images.webp.image_url},get name(){return e.character.name},get extra(){return e.role},alt:"Character."}),null),d(t,i(T,{get when(){return e.voiceActor},get children(){return i(Ms,{get href(){return e.voiceActor.person.url},get src(){return e.voiceActor.person.images.jpg.image_url},get name(){return e.voiceActor.person.name},get extra(){return e.voiceActor.language},alt:"Voice actor.",class:"dir-rtl"})}}),null),t})()}function wl(e){return F(e.staff,"staff"),F(e.positions,"positions"),(()=>{var t=Cu();return d(t,i(Ms,{get href(){return e.staff.url},get src(){return e.staff.images.jpg.image_url},get name(){return e.staff.name},get extra(){return e.positions.join(", ")},alt:"Staff."})),t})()}function Ms(e){return It(e.alt),i(U,{className:"clean-link flex",get class(){return e.class},get href(){return e.href},get children(){return[(()=>{var t=g_();return L(n=>{var r=e.src,s=e.alt;return r!==n.e&&G(t,"src",n.e=r),s!==n.t&&G(t,"alt",n.t=s),n},{e:void 0,t:void 0}),t})(),(()=>{var t=f_(),n=t.firstChild,r=n.nextSibling;return d(n,()=>e.name),d(r,()=>e.extra),t})()]}})}$e(["click"]);var v_=p("<section data-k-1bb8fda2>");function Iu(e){return(()=>{var t=v_();return Lt(t,e,!1,!1),t})()}var $_=p("<button data-k-89909c33>TBA"),__=p("<button data-k-89909c33>Current season"),b_=p("<button data-k-89909c33>Next season"),y_=p("<div data-k-89909c33>"),w_=p("<div data-k-89909c33 class=search-page><div data-k-89909c33 class=header-row><h1 data-k-89909c33></h1><select data-k-89909c33 name=type id=type><option data-k-89909c33 value=anime>Anime</option><option data-k-89909c33 value=manga>Manga</option><option data-k-89909c33 value=media>Media</option></select></div><div data-k-89909c33 class=grid-column-auto-fill><input data-k-89909c33 type=search><span data-k-89909c33><p data-k-89909c33>Search MAL</p></span><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hideMyAnime id=hideMyAnime><label data-k-89909c33 for=hideMyAnime> Hide my </label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=showMyAnime id=showMyAnime><label data-k-89909c33 for=showMyAnime> Only show my </label></div><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hasNotLicense id=hasNotLicense><label data-k-89909c33 for=hasNotLicense> Licensed</label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=hasLicense id=hasLicense><label data-k-89909c33 for=hasLicense> Unlicensed"),k_=p('<ol data-k-89909c33 class="flex-space-between cp-search-season-controls"><li data-k-89909c33><button data-k-89909c33>&lt;</button></li><li data-k-89909c33><button data-k-89909c33>>'),S_=p("<h1 data-k-89909c33> "),rs=p("<h1 data-k-89909c33>"),C_=p("<h1 data-k-89909c33>TBA"),A_=p('<ol data-k-89909c33 class="search-page-content grid-column-auto-fill">'),x_=p("<li data-k-89909c33 class=item><button data-k-89909c33><h3 data-k-89909c33></h3><p data-k-89909c33>"),T_=p("<ol data-k-89909c33 class=search-meta-tags><li data-k-89909c33><button data-k-89909c33>Clear all"),I_=p("<li data-k-89909c33><button data-k-89909c33>"),Ds=p("<li data-k-89909c33 class=grid-full-span><h2 data-k-89909c33>");class ie{constructor({url:t,key:n,value:r,active:s=!0,visuallyDisabled:a=!1,reason:l,desc:o,name:c,hidden:h=!1,canClear:u=!0,addUrl:f}){F(!s||n,"key missing"),F(h||c,"Name is missing"),F(!u||!s||t,"Url is missing"),F(u||h,"Don't show user meta tags they can't clear"),F(typeof s=="boolean","active is not boolean"),F(typeof a=="boolean","visuallyDisabled is not boolean"),F(typeof h=="boolean","hidden is not boolean"),F(typeof u=="boolean","canClear is not boolean"),this.name=c,this.url=t,this.addUrl=f,this.key=n,this.value=r,this.active=s,this.visuallyDisabled=a,this.reason=l,this.desc=o,this.hidden=h,this.canClear=u}match(t={}){return this.name===t.name&&ea(this.url,t.url)&&ea(this.addUrl,t.addUrl)&&this.key===t.key&&ea(this.value,t.value)&&this.active===t.active&&this.visuallyDisabled===t.visuallyDisabled&&this.reason===t.reason&&this.desc===t.desc&&this.hidden===t.hidden&&this.canClear===t.canClear}looseMatch(t={}){return this.key===t.key&&ea(this.value,t.value)&&this.active===t.active}}function E_(){var $,k,C,w,_,A,S;const e=ne(),[t]=Te(),[n]=Ai(),r=e.type,s=t.malSearch==="true"&&e.type!=="media"?"mal":"ani",a=s==="ani"?"mal":"ani",l=[];let o=t.preventFetch==="true";const[c]=Ke(n("season"));if(c&&s===bs){const{api:b,flavorText:x}=((k=($=ua[s])==null?void 0:$[r])==null?void 0:k[c])||{flavorText:Sn.flavorTexts[c]||c};l.push(new ie({name:x,url:`season=${c}`,key:"season",value:b,active:b!==void 0,visuallyDisabled:b===void 0}))}const[h]=Ke(n("year"));let u=!1,f=!1,g=!1;if(c&&h&&s===Qa){const{api:b,flavorText:x}=((w=(C=ua[s])==null?void 0:C[r])==null?void 0:w[c])||{flavorText:Sn.flavorTexts[c]||c};l.push(new ie({name:x,url:`season=${c}`,key:"season",value:h+"/"+b,active:b!==void 0,visuallyDisabled:b===void 0})),l.push(new ie({name:h,url:`year=${h}`,active:!1})),g=!0}else h&&(u=!0,f=!0,s==="ani"?c&&r==="anime"?l.push(new ie({name:h,url:`year=${h}`,active:!0,key:"seasonYear",value:h})):l.push(new ie({name:h,url:`year=${h}`,active:!0,key:"year",value:`${h}%`})):s==="mal"&&(l.push(new ie({name:h,url:`year=${h}`,active:!0,key:"start_date",value:`${h}-01-01`})),l.push(new ie({hidden:!0,canClear:!1,key:"end_date",value:`${h}-12-31`}))));if(Qc(g&&s===bs,"Season disabling should only have on MAL search"),t.q&&l.push(new ie({url:"q="+t.q,key:s==="ani"?"search":"q",value:t.q,name:"Search: "+t.q,active:!g,visuallyDisabled:g})),s==="ani"&&(e.type==="anime"?l.push(new ie({key:"type",value:"ANIME",hidden:!0,canClear:!1})):e.type==="manga"?l.push(new ie({key:"type",value:"MANGA",hidden:!0,canClear:!1})):e.type==="media"&&l.push(new ie({key:"type",value:void 0,hidden:!0,canClear:!1}))),t.rating===void 0)s==="ani"?l.push(new ie({key:"isAdult",value:!1,hidden:!0,canClear:!1})):s==="mal"&&l.push(new ie({key:"sfw",value:!0,hidden:!0,canClear:!1}));else{const b=Xt(t.rating);if(b.any)s==="ani"?l.push(new ie({name:"Any rating",url:"rating=any",key:"isAdult",value:void 0})):s==="mal"&&l.push(new ie({name:"Any rating",url:"rating=any",active:!1,visuallyDisabled:g}));else{const x={g:"G - All ages",pg:"PG - Children",pg13:"PG-13",r17:"R - 17+",r:"R+",rx:"Rx - Hentai"};new Set([t.rating].flat()).forEach(E=>{E==="g"||E==="pg"||E==="pg13"||E==="r17"?l.push(new ie({name:x[E],url:`rating=${E}`,key:"rating",value:E,visuallyDisabled:s==="ani"||g,active:s==="mal"&&!g})):(E==="r"||E==="rx")&&l.push(new ie({name:x[E],url:`rating=${E}`,key:"rating",value:E,active:s==="mal"&&!g,visuallyDisabled:g}))}),s==="ani"&&(b.rx&&(b.g||b.pg||b.pg13||b.r17||b.r)?l.push(new ie({key:"isAdult",value:void 0,hidden:!0,canClear:!1})):l.push(new ie({key:"isAdult",value:b.rx===!0,hidden:!0,canClear:!1})))}}if(t.genre){const[,b,x]=[...vr(t.genre)].reduce(m,["genre"]);s==="ani"?(b.length&&l.push(new ie({key:"genres",value:b,hidden:!0,canClear:!1})),x.length&&l.push(new ie({key:"tags",value:x,hidden:!0,canClear:!1}))):s==="mal"&&b.length&&l.push(new ie({key:"genres",value:b.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}if(t.excludeGenre){const[,b,x]=[...vr(t.excludeGenre)].reduce(m,["excludeGenre"]);s==="ani"?(b.length&&l.push(new ie({key:"excludedGenres",value:b,hidden:!0,canClear:!1})),x.length&&l.push(new ie({key:"excludeTags",value:x,hidden:!0,canClear:!1}))):s==="mal"&&b.length&&l.push(new ie({key:"genres_exclude",value:b.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}function m([b,x=[],I=[]],E){let P=!1;return s==="ani"?Gn.genres===null?o=!0:Gn.tags[E]?I.push(E):Gn.genres[E]?x.push(E):P=!0:s==="mal"&&(Gn[r]===null?o=!0:Number.isInteger(Gn[r][E])?x.push(Gn[r][E]):P=!0),l.push(new ie({name:E,url:`${b}=${E}`,active:!1,visuallyDisabled:P||g})),[b,x,I]}const[y]=[+t.startYear].flat();y&&(f=!0,s==="ani"?l.push(new ie({name:`Year greater than ${y-1}`,active:!h,visuallyDisabled:!!h,url:`startYear=${y}`,key:"yearGreater",value:parseInt(`${y-1}9999`)})):s==="mal"&&l.push(new ie({name:`Year greater than ${y-1}`,active:!h&&!g,visuallyDisabled:!!h||g,url:`startYear=${y}`,key:"start_date",value:`${y}-01-01`})));const[v]=[+t.endYear].flat();v&&(u=!0,s==="ani"?l.push(new ie({name:`Year lesser than ${v+1}`,active:!h,visuallyDisabled:!!h,url:`startYear=${y}`,key:"yearLesser",value:parseInt(`${v+1}0000`)})):s==="mal"&&l.push(new ie({name:`Year lesser than ${v+1}`,active:!h&&!g,visuallyDisabled:!!h||g,url:`endYear=${v}`,key:"start_date",value:`${v}-12-31`}))),t.onList==="true"&&l.push(new ie({name:`Show my ${r}`,active:s==="ani",visuallyDisabled:s!=="ani",url:"onList=true",key:"onList",value:!0})),t.onList==="false"&&l.push(new ie({name:`Hide my ${r}`,active:s==="ani",visuallyDisabled:s!=="ani",url:"onList=false",key:"onList",value:!1}));{const b=[];vr(n("format")).forEach(x=>{var R;const{api:I,flavorText:E}=((R=Wn[s][r])==null?void 0:R[x])||{},P=E||Wn.flavorTexts[x]||x;s==="ani"&&I&&b.push(I),I?g&&s===Qa?l.push(new ie({name:"Format: "+E,key:"filter",value:I,url:`format=${x}`})):l.push(new ie({name:"Format: "+E,active:s==="mal",key:"type",value:I,url:`format=${x}`})):l.push(new ie({name:"Format: "+P,active:!1,visuallyDisabled:!0,url:`format=${x}`}))}),b.length&&l.push(new ie({key:"format",value:b,canClear:!1,hidden:!0}))}{const b=[];let x=!1,I=!1;vr(n("order")).forEach(P=>{var ae,re,Q;let R=P;if(P===zt.ani.anime.duration.alternative_key)R="duration",l.push(new ie({name:"Duration greater than 0",url:`order=${P}`,active:s==="ani",visuallyDisabled:s!=="ani",addUrl:`order=${R}`,key:"durationGreater",value:0}));else if(P===zt.mal.anime.episodes.alternative_key)R="episodes",s==="ani"?r==="anime"?l.push(new ie({name:"Episodes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="manga"?l.push(new ie({name:"Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="media"&&l.push(new ie({name:"Episodes/Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):s==="mal"&&l.push(new ie({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===zt.mal.manga.volumes.alternative_key)R="volumes",s==="ani"?l.push(new ie({name:"Volumes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,active:r==="manga"&&!g,visuallyDisabled:r!=="manga"||g,key:"volumeGreater",value:0})):s==="mal"&&l.push(new ie({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===zt.mal.anime.end_date.alternative_key){R="end_date";const J={name:"Only valid dates",active:!u&&!g,hidden:u,url:`order=${P}`,addUrl:`order=${R}`};s==="ani"?l.push(new ie({...J,key:"endDateGreater",value:0})):s==="mal"&&l.push(new ie({...J,key:"end_date",value:`${new Date().getFullYear()+100}-01-01`,visuallyDisabled:g}))}else if(P===zt.mal.anime.start_date.alternative_key){R="start_date";const J={name:"Only valid dates",active:!f&&!g,hidden:f,url:`order=${P}`,addUrl:`order=${R}`};s==="ani"?l.push(new ie({...J,key:"yearGreater",value:0})):s==="mal"&&l.push(new ie({...J,key:"start_date",value:"0000-01-01",visuallyDisabled:g}))}const{api:B,flavorText:V,reverse:X}=((ae=zt[s][r])==null?void 0:ae[R])||{},j=V||((Q=(re=zt[s==="ani"?"mal":"ani"][r])==null?void 0:re[R])==null?void 0:Q.flavorText)||zt.flavorTexts[R]||P;s==="ani"&&B?t.sort==="ASC"?b.push(B):b.push(B+"_DESC"):s==="mal"&&X&&(I=!0);const K=[`order=${P}`];t.sort&&K.push(`sort=${t.sort}`),B?(x||(x=s==="mal"),l.push(new ie({name:"Sort: "+V,active:s==="mal"&&!g,visuallyDisabled:g,key:"order_by",value:B,url:K}))):l.push(new ie({name:"Sort: "+j,active:!1,visuallyDisabled:!0,url:K}))}),F(b.length===0||s==="ani","validAniOrder should not have anilist orders when engine is mal"),F(x===!1||s==="mal","validMalOrder should be false if engine is ani"),s==="ani"?b.length?l.push(new ie({key:"sort",value:b,canClear:!1,hidden:!0})):t.q?l.push(new ie({key:"sort",value:"SEARCH_MATCH",canClear:!1,hidden:!0})):l.push(new ie({key:"sort",value:"POPULARITY_DESC",canClear:!1,hidden:!0})):s==="mal"&&(!x&&!t.q&&(I=!0,l.push(new ie({key:"order_by",value:"popularity",canClear:!1,hidden:!0,active:!g,visuallyDisabled:g}))),I?l.push(new ie({key:"sort",value:t.sort==="ASC"?"desc":"asc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})):l.push(new ie({key:"sort",value:t.sort==="ASC"?"asc":"desc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})))}if(n("status")){const[b]=Ke(n("status")),{api:x,flavorText:I}=((_=Sn[s][r])==null?void 0:_[b])||{flavorText:((S=(A=Sn[a][r])==null?void 0:A[b])==null?void 0:S.flavorText)||Sn.flavorTexts[b]||b};l.push(new ie({name:I,active:!!x,visuallyDisabled:!x,key:"status",value:x,url:`status=${b}`}))}if(n("country")){const[b]=Ke(n("country")),{flavorText:x}=Yc[b]||{flavorText:b};l.push(new ie({name:x,active:s==="ani",visuallyDisabled:s!=="ani",key:"countryOfOrigin",value:b,url:`country=${b}`}))}if(t.source){const[b]=Ke(t.source),{api:x,flavorText:I}=Xs[b]||{flavorText:b};l.push(new ie({name:I,active:s==="ani",visuallyDisabled:s!=="ani",key:"source",value:x,url:`source=${b}`}))}if(t.license!==void 0){const b=t.license==="true";l.push(new ie({name:b?"Licensed":"Unlicensed",active:s==="ani",visuallyDisabled:s!=="ani",key:"isLicensed",value:b,url:`license=${b}`}))}if(t.externalSource!==void 0){const b=Ke(t.externalSource).map(Number);b.forEach(x=>{l.push(new ie({name:L_[x]||x,active:!1,visuallyDisabled:s!=="ani",url:`externalSource=${x}`}))}),l.push(new ie({active:s==="ani",hidden:!0,canClear:!1,key:"licensedBy",value:b}))}if(t.episodeGreater!==void 0){const[b]=Ke(t.episodeGreater).map(Number),x={active:s==="ani",visuallyDisabled:s!=="ani",key:"episodeGreater",value:Math.max(b+1,0),url:`episodeGreater=${b}`};r==="manga"?l.push(new ie({name:`Chapters greater than ${b}`,...x})):r==="anime"?l.push(new ie({name:`Episodes greater than ${b}`,...x})):r==="media"&&l.push(new ie({name:`Episode/Chapters greater than ${b}`,...x}))}if(t.episodeLesser!==void 0){const[b]=Ke(t.episodeLesser).map(Number),x={active:s==="ani",visuallyDisabled:s!=="ani",key:"episodeLesser",value:Math.max(b,0),url:`episodeLesser=${b}`};r==="manga"?l.push(new ie({name:`Chapters lesser than ${b}`,...x})):r==="anime"?l.push(new ie({name:`Episodes lesser than ${b}`,...x})):r==="media"&&l.push(new ie({name:`Episode/Chapters lesser than ${b}`,...x}))}if(t.rank){const[b]=Ke(t.rank);l.push(new ie({name:`Tags above ${b}%`,url:`rank=${b}`,key:"minimumTagRank",value:b,active:s==="ani",visuallyDisabled:s!=="ani"}))}return[r,s,l,o]}const[Gn,Fo]=We({anime:null,manga:null,genres:null,tags:null}),[L_,P_]=We({});function M_(e){const t=X$(),n=ne(),[r,s]=Te(),[a,l]=O(),[o,c]=O(),[h,u]=O(),[f,g]=O(),[m,y]=O(),[v,$]=O(),[k]=ue.anilist.genresAndTags(()=>r.malSearch!=="true"||void 0),[C]=ue.anilist.externalSources(()=>r.malSearch!=="true"||n.type==="media"?null:n.type==="anime"||n.type==="manga"?n.type.toUpperCase():void 0),[w]=ue.myAnimeList.genresAndThemes(()=>r.malSearch==="true"&&(n.type==="anime"||n.type==="manga")?n.type:void 0),_=mn(s,300),A=tr(mn,(S,b,x)=>{Oe(()=>{g(S),y(b),$(I=>{const E=(I==null?void 0:I.filter(R=>R.active))||[],P=x.filter(R=>R.active);return E.length===P.length&&E.every((R,B)=>R.looseMatch(P[B]))?I:x})})},300);return q(le(w,S=>{S&&Fo(S.data.translations)})),q(le(k,S=>{S&&Fo({genres:Xt(S.data.genres),tags:S.data.tags.reduce((b,x)=>(b[x.name]=x,b),{})})})),q(le(C,S=>{S&&P_(S.data.reduce((b,x)=>(b[x.id]=x.site,b),{}))})),q(()=>{const[S,b,x,I]=E_();I||Oe(()=>{l(S),c(b),u(E=>(E==null?void 0:E.length)===x.length&&x.every((P,R)=>P.match(E[R]))?E:x),A(S,b,x)})}),(()=>{var S=w_(),b=S.firstChild,x=b.firstChild,I=x.nextSibling,E=b.nextSibling,P=E.firstChild,R=P.nextSibling;R.firstChild;var B=R.nextSibling,V=B.firstChild,X=V.nextSibling;X.firstChild;var j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling;ae.firstChild;var re=B.nextSibling,Q=re.firstChild,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling;return d(x,()=>Je(n.mode)),I.addEventListener("change",fe=>t(fe.target.value)),P.$$input=fe=>{_({q:fe.target.value})},d(R,i(H$,{get disabled(){return n.type==="media"},name:"malSearch",get checked(){return r.malSearch==="true"&&n.type!=="media"},onInput:fe=>{s({malSearch:fe.target.checked||void 0})}}),null),V.$$input=fe=>{s({onList:fe.target.checked?!1:void 0})},d(X,()=>n.type,null),K.$$input=fe=>{s({onList:fe.target.checked||void 0})},d(ae,()=>n.type,null),Q.$$input=fe=>{s({license:fe.target.checked||void 0})},ve.$$input=fe=>{s({license:fe.target.checked?!1:void 0})},d(E,i(V$,{}),null),d(E,i(W$,{aniGenres:k,malGenres:w,translation:Gn,get engine(){return o()},showAdult:!0}),null),d(E,i(o1,{}),null),d(E,i(g1,{}),null),d(E,i($1,{}),null),d(E,i(k1,{}),null),d(E,i(T1,{}),null),d(E,i(M1,{}),null),d(E,i(Y1,{}),null),d(E,i(U1,{sources:C}),null),d(E,i($u,{min:0,max:500,separation:1,get minValue(){return+r.episodeGreater||0},get maxValue(){return+r.episodeLesser||500},onChange:([fe,ee])=>s({episodeLesser:ee,episodeGreater:fe})}),null),d(E,i(T,{get when(){return n.type==="anime"},get children(){var fe=y_();return d(fe,i(U,{get href(){return"/search/anime/tba"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return $_()}}),null),d(fe,i(U,{get href(){return"/search/anime/this-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return __()}}),null),d(fe,i(U,{get href(){return"/search/anime/next-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return b_()}}),null),fe}}),null),d(S,i(Nc.Provider,{value:{searchType:a,searchEngine:o,searchVariables:h,debouncedSearchType:f,debouncedSearchEngine:m,debouncedSearchVariables:v},get children(){return e.children}}),null),L(()=>G(P,"placeholder","Search "+(n.type||"All"))),L(()=>I.value=n.type),L(()=>P.value=r.q||""),L(()=>V.checked=r.onList==="false"),L(()=>K.checked=r.onList==="true"),L(()=>Q.checked=r.license==="true"),L(()=>ve.checked=r.license==="false"),S})()}function D_(e){const t=ne(),[n]=Te(),[r,s]=Ai(),{debouncedSearchEngine:a,debouncedSearchType:l,searchVariables:o,debouncedSearchVariables:c}=qs(),h=pn();return[i(W,{get children(){return i(M,{get when(){var u;return((u=t.header)==null?void 0:u.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){var u=k_(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild;return g.$$click=()=>{const v=$r(qt(r("season")),+qt(r("year")),-1);s({year:v.year,season:v.season.toLowerCase()})},d(u,i(H,{each:["winter","spring","summer","fall"],children:v=>(()=>{var $=x_(),k=$.firstChild,C=k.firstChild,w=C.nextSibling;return k.$$click=()=>s({season:v,year:+qt(r("year"))}),d(C,()=>Je(v)),d(w,()=>qt(r("year"))),L(()=>$.classList.toggle("selected",v===qt(r("season")))),$})()}),m),y.$$click=()=>{const v=$r(qt(r("season")),+qt(r("year")),1);s({year:v.year,season:v.season.toLowerCase()})},u}})}}),i(W,{get children(){return[i(M,{get when(){var u;return(u=t.header)==null?void 0:u.match(/^(summer|fall|spring|winter)-\d+$/)},get children(){var u=S_(),f=u.firstChild;return d(u,()=>Je(t.header.split("-")[0]),f),d(u,()=>t.header.split("-")[1],null),u}}),i(M,{get when(){return t.header==="this-season"},get children(){var u=rs();return d(u,i(T,{get when(){return n.season||n.year},fallback:"Current season",get children(){return[N(()=>Je(qt(r("season"))))," ",N(()=>qt(r("year")))]}})),u}}),i(M,{get when(){return t.header==="next-season"},get children(){var u=rs();return d(u,i(T,{get when(){return n.season||n.year},fallback:"Next season",get children(){return[N(()=>Je(qt(r("season"))))," ",N(()=>qt(r("year")))]}})),u}}),i(M,{get when(){return t.header==="tba"},get children(){return C_()}}),i(M,{get when(){return t.header},get children(){var u=rs();return d(u,()=>t.header),u}})]}}),N(()=>e.children),i(T,{get when(){var u;return(u=o())==null?void 0:u.filter(f=>!f.hidden)},children:u=>i(T,{get when(){return u().length},get children(){return["Tags:",(()=>{var f=T_(),g=f.firstChild,m=g.firstChild;return d(f,i(H,{get each(){return u()},children:y=>i(T,{get when(){return!y.hidden},get children(){var v=I_(),$=v.firstChild;return $.$$click=()=>{const k={};Ke(y.url).forEach(C=>{const[w,..._]=C.split("="),A=_.join("=");k[w]=Ke(k[w]||n[w]).filter(S=>S!==A)}),Ke(y.addUrl).forEach(C=>{const[w,..._]=C.split("="),A=_.join("=");k[w]??(k[w]=Ke(n[w])),k[w].push(A)}),s(k)},d($,()=>y.name),L(()=>v.classList.toggle("disabled",!!y.visuallyDisabled)),v}})}),g),m.$$click=()=>{n.malSearch==="true"?h("/search/"+t.type+"?malSearch=true"):h("/search/"+t.type)},f})()]}})}),i(Iu,{get children(){var u=A_();return d(u,i(W,{get children(){return[i(M,{get when(){return a()==="ani"},get children(){return i(W,{get children(){return[i(M,{get when(){var f;return((f=t.header)==null?void 0:f.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){return[i(T,{get when(){var f;return(f=c().find(g=>g.key==="seasonYear"))==null?void 0:f.value},children:f=>i(T,{get when(){var g;return(g=c().find(m=>m.key==="season"))==null?void 0:g.value},children:g=>i(T,{get when(){return c().filter(m=>m.key==="format").length===0||c().some(m=>{var y;return m.key==="format"&&((y=m.value)==null?void 0:y.includes("TV"))})},get children(){return i(Rs,{page:1,get variables(){return c()},title:"Leftovers",groupCards:!1,get extraVariables(){return{seasonYear:$r(g(),+f(),-1).year,season:$r(g(),+f(),-1).season,episodeGreater:16,format:"TV"}}})}})})}),i(Rs,{page:1,get variables(){return c()},extraVariables:{sort:"FORMAT"}})]}}),i(M,{when:!0,get children(){return i(Eu,{nestLevel:1,page:1,get variables(){return c()}})}})]}})}}),i(M,{get when(){return a()==="mal"},get children(){return i(W,{get children(){return[i(M,{get when(){return l()==="anime"},get children(){return i(Ns,{nestLevel:1,type:"anime",page:1,get variables(){return c()}})}}),i(M,{get when(){return l()==="manga"},get children(){return i(Ns,{nestLevel:1,type:"manga",page:1,get variables(){return c()}})}})]}})}})]}})),u}})]}function R_(){Z$()()}function Eu(e){const{accessToken:t}=ce(),{debouncedSearchVariables:n}=qs(),[r,s]=O(void 0),[a]=ue.anilist.searchMediaCache(t,n,e.page),[l]=ue.anilist.searchMedia(t,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O();return q(le(a,h=>h&&c(h.data.media))),q(le(l,h=>h&&c(h.data.media))),i($n,{onIntersection:()=>s(e.variables),fetchResponse:l,get loadingElement(){return N(()=>!!o())()&&i(Os,{get data(){return o()}})},get loading(){return e.loading},children:h=>[i(Os,{get data(){return o()}}),i(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return l().data.media},get keyed(){return e.nestLevel===1},get children(){return i(T,{get when(){return e.variables},children:u=>i(T,{when:h===!1,fallback:"Fetch cooldown",get children(){return i(Eu,{get variables(){return u()},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return l.loading}})}})})}})}})]})}function Rs(e){const t=Fe({groupCards:!0},e);F(t.page,"page is missing"),F(t.extraVariables,"extraVariables is missing");const{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.searchMedia(n,()=>t.variables,t.page,()=>t.extraVariables);return q(le(a,l=>{l!=null&&l.data.pageInfo.hasNextPage&&s(t.variables)})),i(T,{get when(){return a()},get children(){return[i(T,{get when(){return N(()=>!!t.title)()&&a().data.media.length},get children(){var l=Ds(),o=l.firstChild;return d(o,()=>t.title),l}}),i(W,{get children(){return[i(M,{get when(){return t.groupCards},get children(){return i(N_,{get data(){return a().data.media},get lastFormat(){return t.previousFormat||"Unknown format"}})}}),i(M,{get when(){return t.groupCards===!1},get children(){return i(Os,{get data(){return a().data.media}})}})]}}),i(T,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(Rs,{get variables(){return r()},get extraVariables(){return t.extraVariables},get page(){return t.page+1},get previousFormat(){var l;return((l=a().data.media.at(-1))==null?void 0:l.format)||"Unknown format"}})}})]}})}const Bo=new Set;function Ns(e){const{accessToken:t}=ce(),{debouncedSearchVariables:n}=qs(),[r,s]=O(void 0),[a]=ue.myAnimeList.mediaSearchCache(e.type,n,e.page),[l]=ue.myAnimeList.mediaSearch(e.type,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O(),h=N(m=>{var $;const y=new Set;($=o())==null||$.forEach(k=>y.add(k.mal_id));const v=[...y.difference(Bo)];return v.length?(v.forEach(k=>Bo.add(k)),v):m||[]}),f=Me(tn,t,()=>({idMal_in:h(),type:e.type.toUpperCase()})),[g]=nt(f);return q(le(g,m=>{var v;if(!((v=m==null?void 0:m.data)!=null&&v.length))return;const y=Object.fromEntries(Object.values(m.data).map($=>[$.idMal,$]));Gm(y)})),q(le(a,m=>m&&c(m.data.data))),q(le(l,m=>m&&c(m.data.data))),i($n,{rootMargin:"200px",onIntersection:()=>s(e.variables),fetchResponse:l,get loadingElement(){return N(()=>!!o())()&&i(Uo,{get data(){return o()}})},get loading(){return e.loading},children:m=>[i(Uo,{get data(){return o()}}),i(T,{get when(){return l().data.pagination.has_next_page},get children(){return i(T,{get when(){return l().data.data},get keyed(){return e.nestLevel===1},get children(){return i(T,{get when(){return e.variables},children:y=>i(T,{when:m===!1,fallback:"Fetch cooldown",get children(){return i(Ns,{get variables(){return y()},get type(){return e.type},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return l.loading}})}})})}})}})]})}function Uo(e){const t=ne();return i(H,{get each(){return e.data},children:n=>i(Ps,{media:n,get type(){return t.type}})})}function N_(e){return[i(T,{get when(){return e.data[0]&&e.lastFormat!==e.data[0].format},get children(){var t=Ds(),n=t.firstChild;return d(n,()=>Mr(e.data[0].format)||"Unknown format"),t}}),i(H,{get each(){return e.data},children:(t,n)=>[i(T,{get when(){return N(()=>n()>0)()&&e.data[n()-1].format!==t.format},get children(){var r=Ds(),s=r.firstChild;return d(s,()=>Mr(t.format)),r}}),i(xi,{media:t})]})]}function Os(e){return i(H,{get each(){return e.data},children:t=>i(xi,{media:t})})}$e(["input","click"]);var O_=p("<div data-k-f58f9d48>Error user not found"),F_=p("<img data-k-f58f9d48 class=banner alt=Banner>"),B_=p("<button data-k-f58f9d48>"),U_=p("<span data-k-f58f9d48 class=user-profile-following-badge>Follows you"),V_=p("<div data-k-f58f9d48 class=user-page><div data-k-f58f9d48 class=profile-banner-container><div data-k-f58f9d48 class=user-profile-container><img data-k-f58f9d48 class=profile alt=Profile><div data-k-f58f9d48 class=content><h2 data-k-f58f9d48><a data-k-f58f9d48 target=_blank></a></h2><p data-k-f58f9d48>Joined <! data-k-f58f9d48> (<! data-k-f58f9d48> days)</p></div></div></div><nav data-k-f58f9d48 class=profile-navigation><ul data-k-f58f9d48><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48>"),G_=p("<div data-k-f58f9d48 class=banner>");function H_(e){const t=ne(),{accessToken:n}=ce(),[r,{mutateCache:s}]=ue.anilist.userByName(()=>t.name,n),a=l=>{s(o=>(o.data.isFollowing=l,r().data.isFollowing=l,o))};return q(le(r,l=>{l&&(document.title=`${l.data.name} profile - LOB`)})),i(Oc.Provider,{value:{user:()=>r().data,following:a},get children(){return i(W,{get children(){return[i(M,{get when(){return N(()=>{var l;return!!((l=r())!=null&&l.data)})()&&(!r.loading||r().data.name===t.name)},get children(){return i(j_,{get children(){return e.children}})}}),i(M,{get when(){var l;return(l=r())==null?void 0:l.error},get children(){return O_()}})]}})}})}function j_(e){const{user:t,following:n}=tt(),{authUserData:r,accessToken:s}=ce(),[a,l]=O(t().isFollowing);return q(()=>{l(t().isFollowing)}),(()=>{var o=V_(),c=o.firstChild,h=c.firstChild,u=h.firstChild,f=u.nextSibling,g=f.firstChild,m=g.firstChild,y=g.nextSibling,v=y.firstChild,$=v.nextSibling,k=$.nextSibling,C=k.nextSibling;C.nextSibling;var w=c.nextSibling,_=w.firstChild,A=_.firstChild,S=A.nextSibling,b=S.nextSibling,x=b.nextSibling,I=x.nextSibling,E=I.nextSibling;return d(c,i(T,{get when(){return t().bannerImage},get fallback(){return G_()},get children(){var P=F_();return L(()=>G(P,"src",t().bannerImage)),P}}),h),d(f,i(T,{get when(){var P;return t().id!==((P=r())==null?void 0:P.data.id)},get children(){var P=B_();return P.$$click=async()=>{l(B=>!B);const R=await ue.anilist.toggleFollow(s(),t().id);R.status===200?n(R.data.isFollowing):l(t().isFollowing)},d(P,i(T,{get when(){return a()},fallback:"Follow",children:"Following"})),P}}),g),d(m,()=>t().name),d(g,i(T,{get when(){return t().isFollower},get children(){return U_()}}),null),d(y,()=>sd(t().createdAt*1e3),$),d(y,()=>Math.floor((new Date-t().createdAt*1e3)/1e3/60/60/24),C),d(A,i(U,{href:"",children:"Overview"})),d(S,i(U,{href:"anime",children:"Anime list"})),d(b,i(U,{href:"manga",children:"Manga list"})),d(x,i(U,{href:"favourites",children:"Favourites"})),d(I,i(U,{href:"stats",children:"Stats"})),d(E,i(U,{href:"socials",children:"Socials"})),d(o,()=>e.children,null),L(P=>{var R=t().options.profileColor,B=t().avatar.large,V="https://anilist.co/user/"+t().name;return R!==P.e&&((P.e=R)!=null?o.style.setProperty("--user-color",R):o.style.removeProperty("--user-color")),B!==P.t&&G(u,"src",P.t=B),V!==P.a&&G(m,"href",P.a=V),P},{e:void 0,t:void 0,a:void 0}),o})()}$e(["click"]);var Y_=p("<p data-k-fa035f06 class=time>");function as(e){const t=ne();return(()=>{var n=Y_();return d(n,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[i(T,{get when(){return Math.floor(e.stats.minutesWatched/60/24)},children:r=>[N(()=>ye(r()))," day",N(()=>Ne(r()))," "]}),i(T,{get when(){return Math.floor(e.stats.minutesWatched/60%24)},children:r=>[N(()=>ye(r()))," hour",N(()=>Ne(r()))," "]}),i(T,{get when(){return e.stats.minutesWatched<60},get children(){return[N(()=>e.stats.minutesWatched)," minute",N(()=>Ne(e.stats.minutesWatched))]}})]}}),i(M,{get when(){return t.type==="manga"},get children(){return["Chapters read ",N(()=>ye(e.stats.chaptersRead))]}})]}})),n})()}var q_=p("<section data-k-9dc7c2b9 class=user-profile-stats-formats><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Format distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Status distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Country distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler>"),is=p("<li data-k-9dc7c2b9><div data-k-9dc7c2b9><div data-k-9dc7c2b9 class=container><p data-k-9dc7c2b9></p></div></div><div data-k-9dc7c2b9 class=right><p data-k-9dc7c2b9>%</p><p data-k-9dc7c2b9>/");function z_(e){const[t,n]=O(),r=ne(),{user:s}=tt();return q(()=>{n(e.formats.reduce((a,l)=>a+l.count,0))}),(()=>{var a=q_(),l=a.firstChild,o=l.firstChild,c=o.nextSibling,h=l.nextSibling,u=h.firstChild,f=u.nextSibling,g=h.nextSibling,m=g.firstChild,y=m.nextSibling;return d(c,i(H,{get each(){return e.formats},children:v=>(()=>{var $=is(),k=$.firstChild,C=k.firstChild,w=C.firstChild,_=k.nextSibling,A=_.firstChild,S=A.firstChild,b=A.nextSibling,x=b.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"/?format="+v.format},get children(){return Mr(v.format)}}),w),d(w,()=>v.meanScore||""),d(k,i(as,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(b,()=>ye(v.count),x),d(b,t,null),$})()})),d(f,i(H,{get each(){return e.statuses},children:v=>(()=>{var $=is(),k=$.firstChild,C=k.firstChild,w=C.firstChild,_=k.nextSibling,A=_.firstChild,S=A.firstChild,b=A.nextSibling,x=b.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"?userStatus="+v.status},get children(){return i(W,{get fallback(){return Je(v.status)},get children(){return[i(M,{get when(){return v.status==="CURRENT"},get children(){return i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Watching"}),i(M,{get when(){return r.type==="manga"},children:"Reading"})]}})}}),i(M,{get when(){return v.status==="REPEATING"},get children(){return i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatching"}),i(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})}})]}})}}),w),d(w,()=>v.meanScore||""),d(k,i(as,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(b,()=>ye(v.count),x),d(b,t,null),$})()})),d(y,i(H,{get each(){return e.countries},children:v=>(()=>{var $=is(),k=$.firstChild,C=k.firstChild,w=C.firstChild,_=k.nextSibling,A=_.firstChild,S=A.firstChild,b=A.nextSibling,x=b.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"?countryOfOrigin="+v.country},get children(){return tf(v.country)}}),w),d(w,()=>v.meanScore||""),d(k,i(as,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(b,()=>ye(v.count),x),d(b,t,null),$})()})),a})()}var W_=p("<div data-k-9dd95ab0 class=scroll-line-chart>"),K_=p("<div data-k-9dd95ab0 class=scroll-bar-chart>");function J_(e){let t=0,n=0,r=NaN,s;return(()=>{var a=W_();a.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,s.style.userSelect="none",s.scrollTo(n-c,0)}else{s.style.userSelect=null,t=o.clientX,n=s.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const h=(u,f,g)=>{Math.abs(g)<.5||(s.scrollBy(-g*2,0),requestAnimationFrame(m=>h(u,m,g*(f-u<200?.99:.95))))};requestAnimationFrame(u=>h(u,u,c))}}};var l=s;return typeof l=="function"?he(l,a):s=a,d(a,()=>e.children),a})()}function Lu(e){let t=0,n=0,r=NaN,s;return(()=>{var a=K_();a.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,s.style.userSelect="none",s.scrollTo(n-c,0)}else{s.style.userSelect=null,t=o.clientX,n=s.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const h=(u,f,g)=>{Math.abs(g)<.5||(s.scrollBy(-g*2,0),requestAnimationFrame(m=>h(u,m,g*(f-u<200?.99:.95))))};requestAnimationFrame(u=>h(u,u,c))}}};var l=s;return typeof l=="function"?he(l,a):s=a,d(a,()=>e.children),a})()}$e(["mousemove"]);var X_=p("<button data-k-3e65cd93>Hours Watched"),Z_=p("<button data-k-3e65cd93>Chapters Read"),Q_=p("<ol data-k-3e65cd93>"),eb=p("<section data-k-3e65cd93><div data-k-3e65cd93 class=flex-space-between><h2 data-k-3e65cd93>Score distributions</h2><div data-k-3e65cd93><button data-k-3e65cd93>"),tb=p("<li data-k-3e65cd93><p data-k-3e65cd93></p><div data-k-3e65cd93></div><p data-k-3e65cd93>");function nb(e){const t=ne(),[n,r]=O("count"),[s,a]=O(0);return q(()=>{const l=e.data.reduce((o,c)=>Math.max(o,c[n()]),0);a(l)}),(()=>{var l=eb(),o=l.firstChild,c=o.firstChild,h=c.nextSibling,u=h.firstChild;return u.$$click=()=>r("count"),d(u,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),i(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(h,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var f=X_();return f.$$click=()=>r("minutesWatched"),f}}),i(M,{get when(){return t.type==="manga"},get children(){var f=Z_();return f.$$click=()=>r("chaptersRead"),f}})]}}),null),d(l,i(Lu,{get children(){var f=Q_();return d(f,i(H,{get each(){return e.data},children:g=>(()=>{var m=tb(),y=m.firstChild,v=y.nextSibling,$=v.nextSibling;return d(y,()=>g.score),d($,i(T,{get when(){return n()==="minutesWatched"},get fallback(){return ye(g[n()])},get children(){return ye(Math.ceil(g[n()]/60))}})),L(k=>(k=`${g[n()]/s()*85}%`)!=null?v.style.setProperty("height",k):v.style.removeProperty("height")),m})()})),f}}),null),l})()}$e(["click"]);var rb=p("<button data-k-d05f0288>Hours Watched"),ab=p("<button data-k-d05f0288>Chapters Read"),ib=p("<div data-k-d05f0288><button data-k-d05f0288></button><button data-k-d05f0288>Mean Score");function Or(e){const t=ne();return(()=>{var n=ib(),r=n.firstChild,s=r.nextSibling;return r.$$click=()=>e.setState("count"),d(r,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),i(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(n,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var a=rb();return a.$$click=()=>e.setState("minutesWatched"),a}}),i(M,{get when(){return t.type==="manga"},get children(){var a=ab();return a.$$click=()=>e.setState("chaptersRead"),a}})]}}),s),s.$$click=()=>e.setState("meanScore"),n})()}$e(["click"]);var sb=p("<ol data-k-614cd53d>"),lb=p("<section data-k-614cd53d><div data-k-614cd53d class=flex-space-between><h2 data-k-614cd53d>Episode count"),ob=p("<li data-k-614cd53d><p data-k-614cd53d class=no-wrap></p><div data-k-614cd53d></div><p data-k-614cd53d>");function cb(e){const[t,n]=O("count"),[r,s]=O(0);return q(()=>{const a=e.data.reduce((l,o)=>Math.max(l,o[t()]),0);s(a)}),(()=>{var a=lb(),l=a.firstChild;return l.firstChild,d(l,i(Or,{setState:n}),null),d(a,i(Lu,{get children(){var o=sb();return d(o,i(H,{get each(){return e.data},children:c=>(()=>{var h=ob(),u=h.firstChild,f=u.nextSibling,g=f.nextSibling;return d(u,()=>c.length||"Unknown"),d(g,i(T,{get when(){return t()==="minutesWatched"},get fallback(){return ye(c[t()])},get children(){return ye(Math.ceil(c[t()]/60))}})),L(m=>(m=`${c[t()]/r()*85}%`)!=null?f.style.setProperty("height",m):f.style.removeProperty("height")),h})()})),o}}),null),a})()}function db(e){var s;const[t,n]=O(((s=e())==null?void 0:s.getBoundingClientRect().width)||0),r=()=>{var a;n(((a=e())==null?void 0:a.getBoundingClientRect().width)||0)};return q(le(e,r)),window.addEventListener("resize",r),He(()=>{window.removeEventListener("resize",r)}),t}var ub=p("<svg data-k-ecb119dc><path data-k-ecb119dc stroke=none stroke-width=0 fill=var(--background-350)></path><rect data-k-ecb119dc x=0 width=100% height=60 fill=var(--background-300) stroke=none pointer-events=all></rect><path data-k-ecb119dc stroke=black stroke-width=5 fill=transparent>"),hb=p("<section data-k-ecb119dc class=no-motion><div data-k-ecb119dc class=flex-space-between><h2 data-k-ecb119dc>"),gb=p("<svg data-k-ecb119dc><g data-k-ecb119dc class=item><rect data-k-ecb119dc y=0 height=100% fill=none stroke=none pointer-events=all></rect><circle data-k-ecb119dc r=6 pointer-events=none></circle><text data-k-ecb119dc fill=currentColor class=text y=0 text-anchor=middle></text><text data-k-ecb119dc fill=currentColor class=year y=304 text-anchor=middle></svg>",!1,!0,!1);function Vo(e){let t;const[n,r]=O(0),s=db(()=>t),[a,l]=O("count"),o=32,c=64,h=60,u=()=>Math.max(50,s()/e.data.length),f=v=>o+v*u(),g=v=>Math.ceil((1-v/n())*200+c);q(()=>{const v=e.data.reduce(($,k)=>Math.max($,k[a()]),0);r(v)}),q(le(s,()=>{t==null||t.classList.add("no-motion"),setTimeout(()=>{t==null||t.classList.remove("no-motion")},100)}));const m=N(()=>e.data.map(($,k,C)=>k===0?"M"+f(k)+" "+g($[a()]):k<C.length-1?"S"+Ia(f(k),f(k-1),.35)+" "+Ia(g($[a()]),g($[a()])+(g(C[k-1][a()])-g(C[k+1][a()]))/2,.35)+","+f(k)+" "+g($[a()]):"S"+Ia(f(k),f(k-1),.35)+" "+Ia(g($[a()]),g(C[k-1][a()]),.35)+","+f(k)+" "+g($[a()])).join("")),y=N(()=>m()+"L"+f(e.data.length-1)+" "+g(0)+h+"L"+o+" "+g(0)+h);return i(T,{get when(){return e.data.length},get children(){var v=hb(),$=v.firstChild,k=$.firstChild,C=t;return typeof C=="function"?he(C,v):t=v,d(k,()=>e.heading),d($,i(Or,{setState:l}),null),d(v,i(J_,{get children(){var w=ub(),_=w.firstChild,A=_.nextSibling,S=A.nextSibling;return d(w,i(H,{get each(){return e.data},children:(b,x)=>(()=>{var I=gb(),E=I.firstChild,P=E.nextSibling,R=P.nextSibling,B=R.nextSibling;return d(R,i(T,{get when(){return a()==="minutesWatched"},get fallback(){return ye(b[a()])},get children(){return ye(Math.ceil(b[a()]/60))}})),d(B,()=>b.releaseYear||b.startYear),L(V=>{var X=f(x())-u()/2,j=u(),K=f(x()),ae=g(b[a()]),re=f(x()),Q=`0 ${g(b[a()])-10}px`,J=f(x());return X!==V.e&&G(E,"x",V.e=X),j!==V.t&&G(E,"width",V.t=j),K!==V.a&&G(P,"cx",V.a=K),ae!==V.o&&G(P,"cy",V.o=ae),re!==V.i&&G(R,"x",V.i=re),Q!==V.n&&((V.n=Q)!=null?R.style.setProperty("translate",Q):R.style.removeProperty("translate")),J!==V.s&&G(B,"x",V.s=J),V},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),I})()}),null),L(b=>{var x=f(e.data.length-1)+o,I=g(0)+h,E=y(),P=g(0),R=m();return x!==b.e&&G(w,"width",b.e=x),I!==b.t&&G(w,"height",b.t=I),E!==b.a&&G(_,"d",b.a=E),P!==b.o&&G(A,"y",b.o=P),R!==b.i&&G(S,"d",b.i=R),b},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),w}}),null),v}})}var fb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"><path data-k-c7f2c6bd fill=currentColor d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z">'),mb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">'),pb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">'),vb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z">'),$b=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">'),_b=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path data-k-c7f2c6bd fill=currentColor d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">'),bb=p('<section data-k-c7f2c6bd class=user-profile-stats-header-section><ul data-k-c7f2c6bd class=user-profile-stats-general-header><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Total </p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Mean score</p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Standard Deviation');function yb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStats(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Pu,{get stats(){return n().data}})}})}function wb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaStats(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Pu,{get stats(){return n().data}})}})}function Pu(e){const t=ne(),{user:n}=tt();return[(()=>{var r=bb(),s=r.firstChild,a=s.firstChild,l=a.firstChild,o=l.nextSibling,c=o.firstChild,h=c.nextSibling;h.firstChild;var u=a.nextSibling,f=u.firstChild,g=f.nextSibling,m=g.firstChild,y=m.nextSibling,v=u.nextSibling,$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=C.nextSibling,_=v.nextSibling,A=_.firstChild,S=A.nextSibling,b=S.firstChild,x=b.nextSibling,I=_.nextSibling,E=I.firstChild,P=E.nextSibling,R=P.firstChild,B=I.nextSibling,V=B.firstChild,X=V.nextSibling,j=X.firstChild;return d(l,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return fb()}}),i(M,{get when(){return t.type==="manga"},get children(){return mb()}})]}})),d(c,()=>ye(n().statistics[t.type].count||0)),d(h,()=>t.type,null),d(f,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return pb()}}),i(M,{get when(){return t.type==="manga"},get children(){return vb()}})]}})),d(m,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return ye(n().statistics.anime.episodesWatched||0)}}),i(M,{get when(){return t.type==="manga"},get children(){return ye(n().statistics.manga.chaptersRead||0)}})]}})),d(y,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Episodes watched"}),i(M,{get when(){return t.type==="manga"},children:"Chapters read"})]}})),d($,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return $b()}}),i(M,{get when(){return t.type==="manga"},get children(){return _b()}})]}})),d(C,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return((n().statistics.anime.minutesWatched||0)/60/24).toFixed(1)}}),i(M,{get when(){return t.type==="manga"},get children(){return n().statistics.manga.volumesRead||0}})]}})),d(w,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Days watched"}),i(M,{get when(){return t.type==="manga"},children:"Volumes read"})]}})),d(b,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var K;return((((K=e.stats.statuses.find(ae=>ae.status==="PLANNING"))==null?void 0:K.minutesWatched)||0)/60/24).toFixed(1)}}),i(M,{get when(){return t.type==="manga"},get children(){var K;return((K=e.stats.statuses.find(ae=>ae.status==="PLANNING"))==null?void 0:K.chaptersRead)||0}})]}})),d(x,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Days planned"}),i(M,{get when(){return t.type==="manga"},children:"Chapters planned"})]}})),d(R,()=>(n().statistics[t.type].meanScore||0).toFixed(2)),d(j,()=>(n().statistics[t.type].standardDeviation||0).toFixed(1)),r})(),i(nb,{get data(){return e.stats.scores.sort((r,s)=>r.score-s.score)}}),i(cb,{get data(){return e.stats.lengths.sort((r,s)=>(parseInt(r.length)||1/0)-(parseInt(s.length)||1/0))}}),i(z_,{get formats(){return e.stats.formats},get statuses(){return e.stats.statuses},get countries(){return e.stats.countries}}),i(Vo,{heading:"Release year",get data(){return e.stats.releaseYears.sort((r,s)=>r.releaseYear-s.releaseYear)}}),i(Vo,{heading:"Watch year",get data(){return e.stats.startYears.sort((r,s)=>r.startYear-s.startYear)}})]}var Go=p("<p data-k-3a6faa9d class=value>"),kb=p("<p data-k-3a6faa9d class=title>Time watched"),Sb=p("<p data-k-3a6faa9d class=title>Chapters read"),Cb=p("<ol data-k-3a6faa9d class=flex-space-between><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Count</p></li><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Mean score</p></li><li data-k-3a6faa9d>");function Ab(e){const t=ne();return(()=>{var n=Cb(),r=n.firstChild,s=r.firstChild,a=r.nextSibling,l=a.firstChild,o=a.nextSibling;return d(s,()=>ye(e.genre.count||0)),d(l,()=>e.genre.meanScore||0),d(o,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var c=Go();return d(c,i(T,{get when(){return Math.floor(e.genre.minutesWatched/60/24)},children:h=>[N(()=>ye(h()))," day",N(()=>Ne(h()))," "]}),null),d(c,i(T,{get when(){return Math.floor(e.genre.minutesWatched/60%24)},children:h=>[N(()=>ye(h()))," hour",N(()=>Ne(h()))," "]}),null),d(c,i(T,{get when(){return e.genre.minutesWatched<60},get children(){return[N(()=>e.genre.minutesWatched)," minute",N(()=>Ne(e.genre.minutesWatched))]}}),null),c})(),kb()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var c=Go();return d(c,()=>ye(e.genre.chaptersRead)),c})(),Sb()]}})]}})),n})()}var xb=p("<div data-k-ac00d55b class=inline-container><ol data-k-ac00d55b class=grid-reel-auto-fill>"),Tb=p('<img data-k-ac00d55b class=cover-image alt="Media cover">'),Ib=p("<li data-k-ac00d55b>"),Eb=p("<div data-k-ac00d55b class=cover-image>");function Lb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return q(le(()=>e.mediaIds,()=>{c=!0})),q(le(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=xb(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(u,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=Ib();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(T,{get when(){return e.store[f]},get fallback(){return Eb()},get children(){var m=Tb();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}var Pb=p("<ol data-k-28186292 class=grid-column-auto-fill>"),Mb=p("<li data-k-28186292 class=item><div data-k-28186292 class=header><div data-k-28186292 class=flex-space-between><h2 data-k-28186292></h2><p data-k-28186292 class=ranking>#</p></div></div><div data-k-28186292 class=wrapper><div data-k-28186292 class=flex-space-between><p data-k-28186292>User ");function Db(e){const t=ne(),{user:n}=tt();return(()=>{var r=Pb();return d(r,i(H,{get each(){return e.genres.sort((s,a)=>a[e.state()]-s[e.state()]||s.genre.localeCompare(a.genre))},children:(s,a)=>(()=>{var l=Mb(),o=l.firstChild,c=o.firstChild,h=c.firstChild,u=h.nextSibling;u.firstChild;var f=o.nextSibling,g=f.firstChild,m=g.firstChild;return m.firstChild,d(h,i(U,{get href(){return"/search/"+t.type+"?onList=false&genre="+s.genre},get children(){return s.genre}})),d(u,()=>a()+1,null),d(o,i(Ab,{genre:s}),null),d(m,()=>t.type,null),d(g,i(U,{get href(){return"/user/"+n().name+"/"+t.type+"?genre="+s.genre},children:"Show all"}),null),d(f,i(Lb,{get store(){return e.store},get setStore(){return e.setStore},get mediaIds(){return s.mediaIds},get allMediaIds(){return e.mediaIds()},get mutate(){return e.mutate}}),null),l})()})),r})()}var Rb=p("<section data-k-c1e76fe3 class=user-profile-stats-genres><div data-k-c1e76fe3 class=flex-space-between><h2 data-k-c1e76fe3>Genres");function Nb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeGenres(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Mu,{get genres(){return n().data}})}})}function Ob(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaGenres(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Mu,{get genres(){return n().data}})}})}function Mu(e){const{accessToken:t}=ce(),[n,r]=O(new Set),[s,a]=O("count"),o=Me(tn,t,()=>({id_in:[...n()]})),[c,{mutate:h}]=nt(o),[u,f]=We({});return q(le(()=>e.genres,g=>{r(m=>{const y=new Set(g.map(v=>v.mediaIds.slice(0,6)).flat());return y.difference(m).size?y:m})})),q(le(c,g=>{g==null||g.data.forEach(m=>f(m.id,m))})),(()=>{var g=Rb(),m=g.firstChild;return m.firstChild,d(m,i(Or,{setState:a}),null),d(g,i(Db,{get genres(){return e.genres},state:s,store:u,setStore:f,mediaIds:n,mutate:h}),null),g})()}var Fb=p("<section data-k-c5aa48c0 class=user-profile-stats-genres><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0>Tags</h2></div><ol data-k-c5aa48c0 class=grid-column-auto-fill>"),Ho=p("<p data-k-c5aa48c0 class=value>"),Bb=p("<p data-k-c5aa48c0 class=title>Time watched"),Ub=p("<p data-k-c5aa48c0 class=title>Chapters read"),Vb=p('<li data-k-c5aa48c0 class=item><div data-k-c5aa48c0 class=header><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0></h2><p data-k-c5aa48c0 class=ranking>#</p></div><ol data-k-c5aa48c0 class=flex-space-between><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Count</p></li><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Mean score</p></li><li data-k-c5aa48c0></li></ol></div><div data-k-c5aa48c0 class="wrapper tags"><div data-k-c5aa48c0 class=flex-space-between><p data-k-c5aa48c0>User '),Gb=p("<div data-k-c5aa48c0 class=inline-container><ol data-k-c5aa48c0 class=grid-reel-auto-fill>"),Hb=p('<img data-k-c5aa48c0 class=cover-image alt="Media cover">'),jb=p("<li data-k-c5aa48c0>"),Yb=p("<div data-k-c5aa48c0 class=cover-image> ");function qb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeTags(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Du,{get genres(){return n().data}})}})}function zb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaTags(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Du,{get genres(){return n().data}})}})}function Du(e){const t=ne(),{user:n}=tt(),{accessToken:r}=ce(),[s,a]=O(new Set),[l,o]=O("count"),c=Me(tn,r,()=>({id_in:[...s()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(le(()=>e.genres,m=>{a(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(le(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=Fb(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:o}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[l()]-$[l()]||$.tag.name.localeCompare(k.tag.name))},children:($,k)=>(()=>{var C=Vb(),w=C.firstChild,_=w.firstChild,A=_.firstChild,S=A.nextSibling;S.firstChild;var b=_.nextSibling,x=b.firstChild,I=x.firstChild,E=x.nextSibling,P=E.firstChild,R=E.nextSibling,B=w.nextSibling,V=B.firstChild,X=V.firstChild;return X.firstChild,d(A,i(U,{get href(){return"/search/"+t.type+"?onList=false&tag="+$.tag.name},get children(){return $.tag.name}})),d(S,()=>k()+1,null),d(I,()=>ye($.count||0)),d(P,()=>$.meanScore||0),d(R,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var j=Ho();return d(j,i(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(j,i(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(j,i(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),j})(),Bb()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var j=Ho();return d(j,()=>ye($.chaptersRead)),j})(),Ub()]}})]}})),d(X,()=>t.type,null),d(V,i(U,{get href(){return"/user/"+n().name+"/"+t.type+"?tag="+$.tag.name},children:"Show all"}),null),d(B,i(Wb,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return s()},mutate:u}),null),C})()})),m})()}function Wb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),a=Me(tn,n,()=>({id_in:[...r()]})),[l]=nt(a);let o=!1;return q(le(()=>e.mediaIds,()=>{o=!0})),q(le(l,c=>{c==null||c.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var c=Gb(),h=c.firstChild;return h.addEventListener("scroll",()=>{if(!o)return;o=!1;const f=new Set(e.mediaIds).difference(e.allMediaIds);f.forEach(g=>e.allMediaIds.add(g)),s(f)}),d(h,i(H,{get each(){return e.mediaIds},children:u=>(()=>{var f=jb();return d(f,i(U,{get href(){var g;return"/ani/"+t.type+"/"+u+"/"+Xe(((g=e.store[u])==null?void 0:g.title.userPreferred)||"")},get children(){return i(T,{get when(){return e.store[u]},get fallback(){return Yb()},get children(){var g=Hb();return L(()=>G(g,"src",e.store[u].coverImage.large)),g}})}})),f})()})),c})()}var Kb=p("<section data-k-306b0b72 class=user-profile-stats-genres><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72>Studios</h2></div><ol data-k-306b0b72 class=grid-column-auto-fill>"),jo=p("<p data-k-306b0b72 class=value>"),Jb=p("<p data-k-306b0b72 class=title>Time watched"),Xb=p("<p data-k-306b0b72 class=title>Chapters read"),Zb=p('<li data-k-306b0b72 class=item><div data-k-306b0b72 class=header><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72></h2><p data-k-306b0b72 class=ranking>#</p></div><ol data-k-306b0b72 class=flex-space-between><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Count</p></li><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Mean score</p></li><li data-k-306b0b72></li></ol></div><div data-k-306b0b72 class="wrapper tags">'),Qb=p("<div data-k-306b0b72 class=inline-container><ol data-k-306b0b72 class=grid-reel-auto-fill>"),ey=p('<img data-k-306b0b72 class=cover-image alt="Media cover">'),ty=p("<li data-k-306b0b72>"),ny=p("<div data-k-306b0b72 class=cover-image> ");function ry(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStudios(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(ay,{get genres(){return n().data}})}})}function ay(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(le(()=>e.genres,m=>{s(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(le(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=Kb(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:l}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[a()]-$[a()]||$.studio.name.localeCompare(k.studio.name))},children:($,k)=>(()=>{var C=Zb(),w=C.firstChild,_=w.firstChild,A=_.firstChild,S=A.nextSibling;S.firstChild;var b=_.nextSibling,x=b.firstChild,I=x.firstChild,E=x.nextSibling,P=E.firstChild,R=E.nextSibling,B=w.nextSibling;return d(A,i(U,{get href(){return"/ani/studio/"+$.studio.id+"/"+Xe($.studio.name)},get children(){return $.studio.name}})),d(S,()=>k()+1,null),d(I,()=>ye($.count||0)),d(P,()=>$.meanScore||0),d(R,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var V=jo();return d(V,i(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:X=>[N(()=>ye(X()))," day",N(()=>Ne(X()))," "]}),null),d(V,i(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:X=>[N(()=>ye(X()))," hour",N(()=>Ne(X()))," "]}),null),d(V,i(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),V})(),Jb()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var V=jo();return d(V,()=>ye($.chaptersRead)),V})(),Xb()]}})]}})),d(B,i(iy,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:u})),C})()})),m})()}function iy(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return q(le(()=>e.mediaIds,()=>{c=!0})),q(le(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=Qb(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(u,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=ty();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(T,{get when(){return e.store[f]},get fallback(){return ny()},get children(){var m=ey();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}var sy=p("<button data-k-8711eb31>Time Watched"),ly=p("<button data-k-8711eb31>Chapters Read"),oy=p('<section data-k-8711eb31 class=user-profile-stats-genres><div data-k-8711eb31 class=flex-space-between><h2 data-k-8711eb31>Voice actors</h2><div data-k-8711eb31><button data-k-8711eb31>Anime</button><button data-k-8711eb31>Characters</button></div><div data-k-8711eb31><button data-k-8711eb31>Count</button><button data-k-8711eb31>Mean Score</button></div></div><ol data-k-8711eb31 class="grid-column-auto-fill staff">'),Yo=p("<p data-k-8711eb31 class=value>"),cy=p("<p data-k-8711eb31 class=title>Time watched"),dy=p("<p data-k-8711eb31 class=title>Chapters read"),uy=p('<li data-k-8711eb31 class=item><div data-k-8711eb31 class="flex-space-between staff-name-wrapper"><h2 data-k-8711eb31></h2><p data-k-8711eb31 class=ranking>#</p></div><div data-k-8711eb31 class=inline-container><div data-k-8711eb31 class=main-content><img data-k-8711eb31 class=staff-cover alt="Staff profile cover"><ol data-k-8711eb31 class="flex-space-between stats"><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Count</p></li><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Mean score</p></li><li data-k-8711eb31></li></ol><div data-k-8711eb31 class=wrapper>'),hy=p("<div data-k-8711eb31 class=inline-container><ol data-k-8711eb31 class=grid-reel-auto-fill>"),gy=p('<img data-k-8711eb31 class=cover-image alt="Media cover">'),qo=p("<li data-k-8711eb31>"),zo=p("<div data-k-8711eb31 class=cover-image> "),fy=p('<img data-k-8711eb31 class=cover-image alt="Character cover">');function my(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeVoiceActors(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(py,{get genres(){return n().data}})}})}function py(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O(new Set),[o,c]=O("count"),[h,u]=O("media"),g=Me(tn,n,()=>h()==="media"?{id_in:[...r()]}:void 0),[m]=nt(g),[y]=ue.anilist.characterIds(()=>a().size>0&&h()==="characters"?[...a()]:void 0,n),[v,$]=We({}),[k,C]=We({});return q(le(()=>e.genres,w=>{s(_=>{const A=new Set(w.map(S=>S.mediaIds.slice(0,6)).flat());return A.difference(_).size?A:_}),l(new Set(w.map(_=>_.characterIds.slice(0,6)).flat()))})),q(le(m,w=>{w==null||w.data.forEach(_=>$(_.id,_))})),q(le(y,w=>{w==null||w.data.forEach(_=>C(_.id,_))})),(()=>{var w=oy(),_=w.firstChild,A=_.firstChild,S=A.nextSibling,b=S.firstChild,x=b.nextSibling,I=S.nextSibling,E=I.firstChild,P=E.nextSibling,R=_.nextSibling;return b.$$click=()=>u("media"),x.$$click=()=>u("characters"),E.$$click=()=>c("count"),d(I,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var B=sy();return B.$$click=()=>c("minutesWatched"),B}}),i(M,{get when(){return t.type==="manga"},get children(){var B=ly();return B.$$click=()=>c("chaptersRead"),B}})]}}),P),P.$$click=()=>c("meanScore"),d(R,i(H,{get each(){return e.genres.sort((B,V)=>V[o()]-B[o()]||B.voiceActor.name.userPreferred.localeCompare(V.voiceActor.name.userPreferred))},children:(B,V)=>(()=>{var X=uy(),j=X.firstChild,K=j.firstChild,ae=K.nextSibling;ae.firstChild;var re=j.nextSibling,Q=re.firstChild,J=Q.firstChild,pe=J.nextSibling,ve=pe.firstChild,fe=ve.firstChild,ee=ve.nextSibling,z=ee.firstChild,je=ee.nextSibling,De=pe.nextSibling;return d(K,i(U,{get href(){return"/ani/staff/"+B.voiceActor.id+"/"+Xe(B.voiceActor.name.userPreferred)},get children(){return B.voiceActor.name.userPreferred}})),d(ae,()=>V()+1,null),d(fe,()=>ye(B.count||0)),d(z,()=>B.meanScore||0),d(je,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Be=Yo();return d(Be,i(T,{get when(){return Math.floor(B.minutesWatched/60/24)},children:et=>[N(()=>ye(et()))," day",N(()=>Ne(et()))," "]}),null),d(Be,i(T,{get when(){return Math.floor(B.minutesWatched/60%24)},children:et=>[N(()=>ye(et()))," hour",N(()=>Ne(et()))," "]}),null),d(Be,i(T,{get when(){return B.minutesWatched<60},get children(){return[N(()=>B.minutesWatched)," minute",N(()=>Ne(B.minutesWatched))]}}),null),Be})(),cy()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Be=Yo();return d(Be,()=>ye(B.chaptersRead)),Be})(),dy()]}})]}})),d(De,i(vy,{mediaStore:v,setMediaStore:$,characterStore:k,setCharacterStore:C,get pageType(){return h()},get mediaIds(){return B.mediaIds},get allMediaIds(){return r()},get characterIds(){return B.characterIds},get allCharacterIds(){return a()}})),L(()=>G(J,"src",B.voiceActor.image.large)),X})()})),w})()}function vy(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O(new Set),c=Me(tn,n,()=>({id_in:[...r()]})),[h]=nt(c),[u]=ue.anilist.characterIds(()=>a().size>0?[...a()]:void 0,n);let f,g=!1;q(()=>{e.mediaIds,e.characterIds,g=!0});let m=!1;return q(()=>{e.pageType,m=!0,g=!0,f.scrollLeft=0}),q(le(h,y=>{y==null||y.data.forEach(v=>e.setMediaStore(v.id,v))})),q(le(u,y=>{y==null||y.data.forEach(v=>e.setCharacterStore(v.id,v))})),(()=>{var y=hy(),v=y.firstChild;v.addEventListener("scroll",()=>{if(g){if(m){m=!1;return}if(g=!1,e.pageType==="media"){const C=new Set(e.mediaIds).difference(e.allMediaIds);C.forEach(w=>e.allMediaIds.add(w)),s(C)}else{const C=new Set(e.characterIds).difference(e.allCharacterIds);C.forEach(w=>e.allCharacterIds.add(w)),l(C)}}});var $=f;return typeof $=="function"?he($,v):f=v,d(v,i(W,{get children(){return[i(M,{get when(){return e.pageType==="media"},get children(){return i(H,{get each(){return e.mediaIds},children:k=>(()=>{var C=qo();return d(C,i(U,{get href(){var w;return"/ani/"+t.type+"/"+k+"/"+Xe(((w=e.mediaStore[k])==null?void 0:w.title.userPreferred)||"")},get children(){return i(T,{get when(){return e.mediaStore[k]},get fallback(){return zo()},get children(){var w=gy();return L(()=>G(w,"src",e.mediaStore[k].coverImage.large)),w}})}})),C})()})}}),i(M,{get when(){return e.pageType==="characters"},get children(){return i(H,{get each(){return e.characterIds},children:k=>(()=>{var C=qo();return d(C,i(U,{get href(){var w;return"/ani/character/"+k+"/"+Xe(((w=e.characterStore[k])==null?void 0:w.name.userPreferred)||"")},get children(){return i(T,{get when(){return e.characterStore[k]},get fallback(){return zo()},get children(){var w=fy();return L(()=>G(w,"src",e.characterStore[k].image.large)),w}})}})),C})()})}})]}})),y})()}$e(["click"]);var $y=p('<section data-k-63df6417 class=user-profile-stats-genres><div data-k-63df6417 class=flex-space-between><h2 data-k-63df6417>Staff</h2></div><ol data-k-63df6417 class="grid-column-auto-fill staff">'),Wo=p("<p data-k-63df6417 class=value>"),_y=p("<p data-k-63df6417 class=title>Time watched"),by=p("<p data-k-63df6417 class=title>Chapters read"),yy=p('<li data-k-63df6417 class=item><div data-k-63df6417 class="flex-space-between staff-name-wrapper"><h2 data-k-63df6417></h2><p data-k-63df6417 class=ranking>#</p></div><div data-k-63df6417 class=inline-container><div data-k-63df6417 class=main-content><img data-k-63df6417 class=staff-cover alt="Staff profile cover"><ol data-k-63df6417 class="flex-space-between stats"><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Count</p></li><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Mean score</p></li><li data-k-63df6417></li></ol><div data-k-63df6417 class=wrapper>'),wy=p("<div data-k-63df6417 class=inline-container><ol data-k-63df6417 class=grid-reel-auto-fill>"),ky=p('<img data-k-63df6417 class=cover-image alt="Media cover">'),Sy=p("<li data-k-63df6417>"),Cy=p("<div data-k-63df6417 class=cover-image> ");function Ay(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStaff(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Ru,{get genres(){return n().data}})}})}function xy(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaStaff(()=>e.name,t);return i(T,{get when(){return n()},get children(){return i(Ru,{get genres(){return n().data}})}})}function Ru(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(le(()=>e.genres,m=>{s(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(le(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=$y(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:l}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[a()]-$[a()]||$.staff.name.userPreferred.localeCompare(k.staff.name.userPreferred))},children:($,k)=>(()=>{var C=yy(),w=C.firstChild,_=w.firstChild,A=_.nextSibling;A.firstChild;var S=w.nextSibling,b=S.firstChild,x=b.firstChild,I=x.nextSibling,E=I.firstChild,P=E.firstChild,R=E.nextSibling,B=R.firstChild,V=R.nextSibling,X=I.nextSibling;return d(_,i(U,{get href(){return"/ani/staff/"+$.staff.id+"/"+Xe($.staff.name.userPreferred)},get children(){return $.staff.name.userPreferred}})),d(A,()=>k()+1,null),d(P,()=>ye($.count||0)),d(B,()=>$.meanScore||0),d(V,i(W,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var j=Wo();return d(j,i(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(j,i(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(j,i(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),j})(),_y()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var j=Wo();return d(j,()=>ye($.chaptersRead)),j})(),by()]}})]}})),d(X,i(Ty,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:u})),L(()=>G(x,"src",$.staff.image.large)),C})()})),m})()}function Ty(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return q(le(()=>e.mediaIds,()=>{c=!0})),q(le(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=wy(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(u,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=Sy();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(T,{get when(){return e.store[f]},get fallback(){return Cy()},get children(){var m=ky();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}const Iy="_theme-container_4h5lo_1",Ey="_header_4h5lo_5",Ly="_details_4h5lo_11",Py="_play-button-container_4h5lo_16",My="_play-button_4h5lo_16",Dy="_spoiler_4h5lo_31",ur={themeContainer:Iy,header:Ey,details:Ly,playButtonContainer:Py,playButton:My,spoiler:Dy};var Ry=p("<video src controls autoplay>"),Ny=p("<div><h2>Themes"),Oy=p("<p>"),Fy=p("<div><div><p>"),By=p("<p>Spoilers"),Uy=p("<div><p>v</p><p>Ep: </p><div>"),Vy=p("<div><button>play</button><span></span><span></span><span>");function Gy(){const e=ne(),[t]=Te(),{anilistData:n}=vn(),r=Ry(),s=Me(Rf,()=>({id:e.id,api:t.isMalId!=null?Qa:e.api,type:e.type})),[a]=nt(s);return q(()=>{e.id,e.api,e.type,r.src=""}),i(ct,{fallback:"AnimeThemes error",get children(){return i(T,{get when(){var l,o;return N(()=>!!a())()&&((o=(l=n())==null?void 0:l.data)==null?void 0:o.type)===Bg},get children(){var l=Ny();return l.firstChild,d(l,i(H,{get each(){return a().data},children:o=>i(Nu,{theme:o,video:r})}),null),d(l,r,null),l}})}})}function Nu(e){F(e.video,"Missing video element for playback"),F(e.theme,"Theme data is missing");let t=!1;return i(ct,{fallback:"AnimeThemes row error",get children(){var n=Fy(),r=n.firstChild,s=r.firstChild;return d(s,()=>e.theme.slug),d(r,i(T,{get when(){return e.theme.song},get children(){var a=Oy();return d(a,()=>e.theme.song.title,null),d(a,i(W,{get children(){return[i(M,{get when(){return e.mainArtist},get children(){return i(T,{get when(){var l;return((l=e.theme.song.artists)==null?void 0:l.length)>1},children:" feat "})}}),i(M,{get when(){var l;return(l=e.theme.song.artists)==null?void 0:l.length},children:" by "})]}}),null),d(a,i(H,{get each(){return e.theme.song.artists},children:l=>i(T,{get when(){return!e.mainArtist||l.slug!==e.mainArtist},get children(){return[i(T,{when:t,fallback:t=!0,children:" & "}),i(U,{get href(){return"/artist/"+l.slug},get children(){return l.name}})]}})}),null),a}}),null),d(n,i(H,{get each(){return e.theme.animethemeentries},children:a=>(()=>{var l=Uy(),o=l.firstChild;o.firstChild;var c=o.nextSibling;c.firstChild;var h=c.nextSibling;return d(o,()=>a.version||1,null),d(c,()=>a.episodes||"-",null),d(l,i(T,{get when(){return a.spoiler},get children(){var u=By();return L(()=>u.className=ur.spoiler),u}}),h),d(h,i(H,{get each(){return a.videos},children:u=>(()=>{var f=Vy(),g=f.firstChild,m=g.nextSibling,y=m.nextSibling,v=y.nextSibling;return g.$$click=()=>e.video.src=u.link,d(m,()=>u.resolution),d(y,()=>u.source),d(v,()=>u.nc&&"NC"),L(()=>f.className=ur.playButton),f})()})),L(u=>{var f=ur.details,g=ur.playButtonContainer;return f!==u.e&&(l.className=u.e=f),g!==u.t&&(h.className=u.t=g),u},{e:void 0,t:void 0}),l})()}),null),L(a=>{var l=ur.themeContainer,o=ur.header;return l!==a.e&&(n.className=a.e=l),o!==a.t&&(r.className=a.t=o),a},{e:void 0,t:void 0}),n}})}$e(["click"]);const Hy="_themes_1brzn_1",Ko={themes:Hy};var jy=p("<video src controls autoplay>"),Yy=p("<h1>Artist"),qy=p("<p>"),zy=p("<img alt=Artist>"),Jo=p("<div>"),Wy=p('<img src=https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg alt="Artist missing">');function Ky(){const e=ne(),[t]=ue.animeThemes.artisBySlug(()=>e.name),n=jy();return document.title="Artist - LOB",[Yy(),i(T,{get when(){return t()},get children(){return[(()=>{var r=qy();return d(r,()=>t().data.artist.name),r})(),i(T,{get when(){return t().data.artist.images.length},get fallback(){return Wy()},get children(){var r=zy();return L(()=>G(r,"src",t().data.artist.images[0].link)),r}}),(()=>{var r=Jo();return d(r,i(H,{get each(){return t().data.artist.songs},children:s=>(()=>{var a=Jo();return d(a,i(H,{get each(){return s.animethemes},children:l=>i(Nu,{theme:l,video:n,get mainArtist(){return e.name}})})),L(()=>Bt(a,Ko.episode)),a})()})),L(()=>Bt(r,Ko.themes)),r})(),n]}})]}var Jy=p("<div class=notification-page><ol class=flex-space-between><li><button>All</button></li><li><button>Airing</button></li><li><button>Activity</button></li><li><button>Forum</button></li><li><button>Follows</button></li><li><button>Media"),Xy=p("<button>debug: "),Zy=p("<ol class=notifications-container>"),Qy=p("<button>Refresh"),Ua=p('<img alt="Media cover">'),ss=p("<div class=content><p>"),e0=p("<div class=content>"),t0=p("<li>");function n0(){const[e,t]=O("all");return document.title="Notifications - LOB",(()=>{var n=Jy(),r=n.firstChild,s=r.firstChild,a=s.firstChild,l=s.nextSibling,o=l.firstChild,c=l.nextSibling,h=c.firstChild,u=c.nextSibling,f=u.firstChild,g=u.nextSibling,m=g.firstChild,y=g.nextSibling,v=y.firstChild;return a.$$click=()=>t("all"),o.$$click=()=>t("airing"),h.$$click=()=>t("activity"),f.$$click=()=>t("forum"),m.$$click=()=>t("follows"),v.$$click=()=>t("media"),d(n,i(r0,{type:e}),null),n})()}function r0(e){const{accessToken:t}=ce(),n=Me(Lf,t,e.type),[r,{mutateBoth:s}]=nt(n),a=c=>{var h,u;(u=(h=c==null?void 0:c.data)==null?void 0:h.notifications)!=null&&u.length&&s(f=>{var A,S,b;if(!((A=f==null?void 0:f.data)!=null&&A.length))return f.data=[c.data.notifications],f;const g=c.data.notifications.at(-1).id,m=yr(f.data[0],x=>x.id-g),y=((S=f.data[0][m])==null?void 0:S.id)===g;if(c.data.pageInfo.currentPage===1)return y?(f.data[0].splice(0,m+1,...c.data.notifications),f):(f.data.unshift(c.data.notifications),f.data.length=Math.min(f.data.length,5),f);const v=c.data.notifications[0].id,$=yr(f.data[0],x=>x.id-v);if($===0&&f.data[0][$].id!==v||(f.data[0].splice($,m-$+y,...c.data.notifications),y||f.data.length===1))return f;const C=yr(f.data[1],x=>x.id-g);if(((b=f.data[1][C])==null?void 0:b.id)!==g)return f;const[_]=f.data.splice(1,1);return _.splice(0,C+1),f.data[0].push(..._),f})},[l,o]=sl();return i(T,{get when(){return!r.loading},get children(){return[i(T,{get when(){return Zn},get children(){var c=Xy();return c.firstChild,c.$$click=()=>o(h=>!h),d(c,()=>""+l(),null),c}}),i(a0,Fe({get cache(){var c,h;return((h=(c=r())==null?void 0:c.data)==null?void 0:h[0])||[]},updateCache:a,isDebug:l},e))]}})}function a0(e){const{accessToken:t}=ce(),[n,r]=O(e.cache.length?void 0:1),s=Me(fd,t,e.type,n),[a]=al(e.isDebug,s);let l=0;const[o,c]=O(!1),[h,u]=O(!0),f=od(u),g=new Set,m=tr(mn,_=>!a.loading&&r(_),1e3);function y(){const _=v();_&&m(_)}function v(){var S,b;const _=Ae(o),A=Ae(h);if(k.has((S=e.cache.at(-1))==null?void 0:S.id)&&_)return Math.max(Math.floor(e.cache.length/15)+1,l+1);if(k.has((b=e.cache[0])==null?void 0:b.id)&&A)return 1;if(_){const x=[...k.difference(g)].sort((P,R)=>R-P);if(!x.length)return;const I=ga(x,.5),E=id(e.cache,P=>P.id-I);return E==-1?void 0:Math.ceil((E+1)/15)}}let $=0;q(le(a,_=>{var x,I,E,P,R;if(!((x=_==null?void 0:_.data)!=null&&x.notifications.length))return;_.data.notifications.forEach(B=>{g.add(B.id)});const A=((I=_.data.notifications[0])==null?void 0:I.createdAt)||0,S=((E=ga(_.data.notifications,.5))==null?void 0:E.createdAt)||A,b=Math.min(1e3*60*5,Math.max((A-S)*1e3,15e3));l=Math.max(l,_.data.pageInfo.currentPage),_.data.pageInfo.currentPage===1?(u(!1),c(!0),f(b,!0),l=1):_.data.pageInfo.currentPage>e.cache.length/15&&(((P=_.data.notifications.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(u(!0),c(!1),l=0,$=0)),e.updateCache(_),y()}));const k=new Set,C=_=>{for(const A of _){const S=parseInt(A.target.dataset.id);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return He(()=>w.disconnect()),[i(T,{get when(){return N(()=>!!a.loading)()&&n()===1},get children(){return i(Jn,{class:"refresh",get children(){return i(Tt,{tipPosition:"bottom",get children(){return i(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh notifications",children:"Loading notifications"})}})}})}}),(()=>{var _=Zy();return d(_,i(H,{get each(){return e.cache},children:A=>{let S;return Ln(()=>w.observe(S)),(()=>{var b=t0(),x=S;return typeof x=="function"?he(x,b):S=b,d(b,i(W,{get fallback(){return'Notification type "'+A.type+'" not supported.'},get children(){return[i(M,{get when(){return A.type==="RELATED_MEDIA_ADDITION"},get children(){return[i(U,{get href(){return Ge(A.media)},get children(){var I=Ua();return L(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=ss(),E=I.firstChild;return d(E,i(U,{get href(){return Ge(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.context,null),d(I,i(Yn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="AIRING"},get children(){return[i(U,{get href(){return Ge(A.media)},get children(){var I=Ua();return L(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=ss(),E=I.firstChild;return d(E,()=>A.contexts[0],null),d(E,()=>A.episode,null),d(E,()=>A.contexts[1],null),d(E,i(U,{get href(){return Ge(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.contexts[2],null),d(I,i(Yn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="ACTIVITY_REPLY_LIKE"||A.type==="ACTIVITY_LIKE"||A.type==="ACTIVITY_REPLY"},get children(){return[i(U,{get href(){return"/user/"+A.user.name},get children(){var I=Ua();return L(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=e0();return d(I,i(U,{get href(){return"/activity/"+A.activityId},get children(){return[N(()=>A.user.name),N(()=>A.context)]}}),null),d(I,i(Yn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="FOLLOWING"},get children(){return[i(U,{get href(){return"/user/"+A.user.name},get children(){var I=Ua();return L(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=ss(),E=I.firstChild;return d(E,i(U,{get href(){return"/user/"+A.user.name},get children(){return A.user.name}}),null),d(E,()=>A.context,null),d(I,i(Yn,{get createdAt(){return A.createdAt}}),null),I})()]}})]}})),L(()=>G(b,"data-id",A.id)),b})()}})),L(()=>_.classList.toggle("loading",!!(a.loading&&n()===1))),_})(),i(W,{get children(){return[i(M,{get when(){return a.loading&&n()>l&&e.cache.length},get children(){return i(Jn,{class:"new",get children(){return i(Tt,{tipPosition:"bottom",children:"Loading notifications"})}})}}),i(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh notification feed to load more",(()=>{var _=Qy();return _.$$click=()=>r(1),_})()]}})]}})]}$e(["click"]);var Ou=p("<ol class=grid-column-auto-fill>"),i0=p("<div class=entities-page>"),s0=p("<button>debug: "),l0=p("<select name=roles id=roles>"),o0=p("<option>"),c0=p("<img class=entity-image alt=Character>"),Fu=p("<div class=content><p class=line-clamp></p><p>"),d0=p('<p class="line-clamp small">'),u0=p("<span class=role-notes>(<!>)"),h0=p("<div class=content><p class=voice-actor-language>"),g0=p('<img class=entity-image alt="Voice actor">'),Bu=p("<li class=entities-page-entity>"),f0=p("<p class=line-clamp>"),m0=p("<img class=entity-image alt=Staff>"),p0=p('<li class="entities-page-entity loading"><div class=entity-left><div class=entity-image></div><div class=content><p class=line-clamp></p></div></div><div class=entity-right><div class=content><p class=line-clamp></p></div><div class=entity-image>');function v0(){const[e,t]=O(),[n]=ue.myAnimeList.animeCharactersById(e);return i(Ti,{type:"CHARACTER",setIdMal:t,malData:n})}function $0(){const[e,t]=O(),[n]=ue.myAnimeList.mangaCharactersById(e);return i(Ti,{type:"CHARACTER",setIdMal:t,malData:n})}function _0(){const[e,t]=O(),[n]=ue.myAnimeList.animeStaffById(e);return i(Ti,{type:"STAFF",setIdMal:t,malData:n})}function b0(){const[,e]=O();return i(Ti,{type:"STAFF",setIdMal:e})}function Ti(e){const t=ne();return(()=>{var n=i0();return d(n,i(W,{get children(){return[i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(y0,{})}}),i(M,{get when(){return e.type==="STAFF"},get children(){var r=Ou();return d(r,i(Uu,{get id(){return t.id},page:1,get setIdMal(){return e.setIdMal}})),r}})]}})),n})()}function ls(e,t,n,r){for(let s=e;s<=t;s++)n[r[s].id]=s;return n}function y0(e){const t=ne(),{accessToken:n}=ce(),r=Me(Pf,n,()=>t.id),[s,{mutateBoth:a}]=nt(r),l=(h,u)=>{var f,g;(g=(f=h==null?void 0:h.data)==null?void 0:f.characters.edges)!=null&&g.length&&a(m=>{var y,v;if(!((v=(y=m==null?void 0:m.data)==null?void 0:y.items)!=null&&v.length))return m.data={items:h.data.characters.edges,indices:ls(0,h.data.characters.edges.length-1,{},h.data.characters.edges),roles:u},m;for(let $=0;$<h.data.characters.edges.length;$++){const k=h.data.characters.edges[$],C=$+(h.data.characters.pageInfo.currentPage-1)*h.data.characters.pageInfo.perPage,w=m.data.indices[k.id];if(k.id in m.data.indices){if(w<C)for(let _=w;_<C;_++)m.data.items[_]=m.data.items[_+1];else if(w>C)for(let _=C;_>w;_--)m.data.items[_]=m.data.items[_-1];m.data.items[C]=k,ls(Math.min(C,w),Math.max(C,w),m.data.indices,m.data.items)}else m.data.items.splice(C,0,k),ls(C,m.data.items.length-1,m.data.indices,m.data.items)}return m.data.roles=u,m})},[o,c]=sl();return i(T,{get when(){return!s.loading},get children(){return[i(T,{get when(){return Zn},get children(){var h=s0();return h.firstChild,h.$$click=()=>c(u=>!u),d(h,()=>""+o(),null),h}}),i(w0,Fe({get cache(){var h,u;return((u=(h=s())==null?void 0:h.data)==null?void 0:u.items)||[]},get roles(){var h,u;return((u=(h=s())==null?void 0:h.data)==null?void 0:u.roles)||[]},updateCache:l,isDebug:o},e))]}})}function w0(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(e.cache.length?void 0:1),a=Me(md,n,()=>t.id,r),[l]=al(e.isDebug,a),o=N(_=>{var A,S;return _&&((S=(A=l())==null?void 0:A.data)==null?void 0:S.characters.pageInfo.hasNextPage)!==!1},!0),[c,h]=O({language:"Japanese",dubGroup:null}),u=N(()=>{var _,A;return((A=(_=l())==null?void 0:_.data)==null?void 0:A.countryOfOrigin)||"JP"}),f=N(()=>{var A,S,b;if(((b=(S=(A=l())==null?void 0:A.data)==null?void 0:S.characters)==null?void 0:b.pageInfo.currentPage)!==1)return e.roles;const _=new Map;for(const x of l().data.characters.edges)for(const I of x.voiceActorRoles){const E=I.voiceActor.language+I.dubGroup;_.has(E)===!1&&_.set(E,{language:I.voiceActor.language,dubGroup:I.dubGroup})}return[..._.values()]});L(()=>{if(f().length){const _=Zs(u()),A=f().findIndex(b=>b.language===_),S=A!==-1?A:f().findIndex(b=>b.language==="Japanese");h(f()[S===-1?0:S])}});const g=new Set,m=tr(mn,_=>!l.loading&&s(_),1e3);function y(){const _=$();_&&m(_)}const v=25;function $(){const _=Ae(o),A=Math.ceil(e.cache.length/v);if(k.has(A)&&!g.has(A))return A;if(k.has(A)&&_&&g.has(A))return A+1;{const S=[...k.difference(g)].sort((b,x)=>x-b);return S.length?ga(S,.5):void 0}}q(le(l,_=>{var A;(A=_==null?void 0:_.data)!=null&&A.characters.edges.length&&(F(v===_.data.characters.pageInfo.perPage,"Page count is wrong"),g.add(_.data.characters.pageInfo.currentPage),e.updateCache(_,f()),y())}));const k=new Set,C=_=>{for(const A of _){const S=parseInt(A.target.dataset.page);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return He(()=>w.disconnect()),[i(T,{get when(){return f().length},get children(){var _=l0();return _.addEventListener("change",A=>h(f()[A.target.value])),d(_,i(H,{get each(){return f()},children:(A,S)=>(()=>{var b=o0();return d(b,()=>A.language,null),d(b,i(T,{get when(){return A.dubGroup},get children(){return[" (",N(()=>A.dubGroup),")"]}}),null),L(()=>b.value=S()),b})()})),L(()=>_.value=f().findIndex(A=>A===c())),_}}),(()=>{var _=Ou();return d(_,i(H,{get each(){return e.cache},children:(A,S)=>i(T,{get when(){return A.voiceActorRoles.filter(b=>b.voiceActor.language===c().language&&b.dubGroup===c().dubGroup)},children:b=>i(T,{get when(){return b().length},get fallback(){return i(Xo,{edge:A,get page(){return Math.ceil((S()+1)/v)},intersectionObserver:w})},get children(){return i(H,{get each(){return b()},children:x=>i(Xo,{edge:A,get i(){return S()},actorRole:x,get page(){return Math.ceil((S()+1)/v)},intersectionObserver:w})})}})})})),_})(),i(T,{get when(){return l.loading&&r()>Math.ceil(e.cache.length/v)&&e.cache.length},get children(){return i(Jn,{class:"new",get children(){return i(Tt,{tipPosition:"bottom",children:"Loading characters"})}})}})]}function Uu(e){const[t,n]=O(e.page===1?1:void 0),{accessToken:r}=ce(),[s]=ue.anilist.allMediaStaff(()=>e.id,t,r);return e.page===1&&q(()=>{s()&&e.setIdMal(s().data.idMal??void 0)}),i($n,{onIntersection:()=>n(e.page),fetchResponse:s,get loadingElement(){return i(S0,{})},get loading(){return e.loading},children:a=>[i(H,{get each(){return s().data.staff.edges},children:l=>i(k0,{edge:l})}),i(T,{get when(){return s().data.staff.pageInfo.hasNextPage},get children(){return i(T,{when:a===!1,fallback:"Fetch cooldown",get children(){return i(Uu,{get id(){return e.id},get page(){return e.page+1},get loading(){return s.loading}})}})}})]})}function Xo(e){let t;return Ln(()=>e.intersectionObserver.observe(t)),(()=>{var n=Bu(),r=t;return typeof r=="function"?he(r,n):t=n,d(n,i(U,{get href(){return"/ani/character/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var s=c0();return L(()=>G(s,"src",e.edge.node.image.large)),s})(),(()=>{var s=Fu(),a=s.firstChild,l=a.nextSibling;return d(a,()=>e.edge.node.name.userPreferred),d(l,()=>Je(e.edge.role)),s})()]}}),null),d(n,i(T,{get when(){return e.actorRole},get children(){return i(U,{get href(){return"/ani/staff/"+e.actorRole.voiceActor.id},class:"entity-right",get children(){return[(()=>{var s=h0(),a=s.firstChild;return d(s,i(T,{get when(){return e.actorRole.roleNotes},get fallback(){return(()=>{var l=f0();return d(l,()=>e.actorRole.voiceActor.name.userPreferred),l})()},get children(){return[(()=>{var l=d0();return d(l,()=>e.actorRole.voiceActor.name.userPreferred),l})(),(()=>{var l=u0(),o=l.firstChild,c=o.nextSibling;return c.nextSibling,d(l,()=>e.actorRole.roleNotes,c),l})()]}}),a),d(a,()=>e.actorRole.voiceActor.language),s})(),(()=>{var s=g0();return L(()=>G(s,"src",e.actorRole.voiceActor.image.large)),s})()]}})}}),null),L(()=>G(n,"data-page",e.page)),n})()}function k0(e){return(()=>{var t=Bu();return d(t,i(U,{get href(){return"/ani/staff/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var n=m0();return L(()=>G(n,"src",e.edge.node.image.large)),n})(),(()=>{var n=Fu(),r=n.firstChild,s=r.nextSibling;return d(r,()=>e.edge.node.name.userPreferred),d(s,()=>Je(e.edge.role)),n})()]}})),t})()}function S0(){return i(H,{get each(){return Array(3)},children:()=>p0()})}$e(["click"]);var C0=p('<svg aria-hidden=true class=svg-heart focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 31.97 512.01 448.01"><path fill=currentColor d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">');function A0(){return C0()}var x0=p('<svg class=svg-anilist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 2.95 24 18.1"><path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z">');function kl(){return x0()}var T0=p('<svg class=svg-myanimelist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 7.19 24 9.63"><path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z">');function Sl(){return T0()}var I0=p('<label class="cp-toggle-favourite-button flex-no-shrink"><input type=checkbox id=favourite-toggle name=favourite-toggle>'),E0=p("<div class=grid-center><span class=visually-hidden>Anilist favourites: "),L0=p("<div class=grid-center><span class=visually-hidden>MyAnimeList favourites: "),P0=p("<div class=flex-no-shrink>");function Fr(e){const{accessToken:t}=ce();let n=null;const r=wa(async(l,o,c)=>{if(c!==n){const h=await ue.anilist.toggleFavourite(l,o);Qc(h.fromCache,"Mutation should never be cached"),e.mutateCache(c,o)}n=c},500),s=()=>!e.idType||!e.onChange||!e.variableId||!e.mutateCache||!e.idType;return(()=>{var l=I0(),o=l.firstChild;return o.addEventListener("change",c=>{if(Ae(s))return;const h=e.idType;F(h==="MANGA"||h==="ANIME"||h==="STAFF"||h==="CHARACTER"||h==="STUDIO","Missing idType"),e.onChange(c.target.checked),r(t(),{[e.idType]:e.variableId},c.target.checked)}),d(l,i(A0,{}),null),d(l,i(a,{}),null),L(c=>{var h=!!s(),u=s();return h!==c.e&&l.classList.toggle("disabled",c.e=h),u!==c.t&&(o.disabled=c.t=u),c},{e:void 0,t:void 0}),L(()=>o.checked=e.checked),l})();function a(){const l=()=>"jikanValue"in e||e.jikanLoading,o=()=>"anilistValue"in e||e.anilistLoading;return i(T,{get when(){return l()||o()},get children(){var c=P0();return d(c,i(T,{get when(){return o()},get children(){var h=E0();return h.firstChild,d(h,i(kl,{}),null),d(h,i(W,{get children(){return[i(M,{get when(){return e.anilistLoading},children:"..."}),i(M,{get when(){return e.anilistValue!=null},get children(){return Ql(e.anilistValue)}}),i(M,{get when(){return e.anilistValue==null},children:"N/A"})]}}),null),h}}),null),d(c,i(T,{get when(){return l()},get children(){var h=L0();return h.firstChild,d(h,i(Sl,{}),null),d(h,i(W,{get children(){return[i(M,{get when(){return e.jikanLoading},children:"..."}),i(M,{get when(){return e.jikanValue!=null},get children(){return Ql(e.jikanValue)}}),i(M,{get when(){return e.jikanValue==null},children:"N/A"})]}}),null),h}}),null),c}})}}var M0=p("<li><strong>Birth:</strong> "),D0=p("<li><strong>Age:</strong> "),R0=p("<li><strong>Gender:</strong> "),N0=p("<li><strong>Active years: </strong>"),O0=p("<li><strong>Home town:</strong> "),F0=p("<li><strong>Blood type:</strong> "),oi=p("<li>"),B0=p("<div class=entity-page-header><img class=cover><div class=row><h1></h1><p class=entity-page-alternative-names></p></div><ul class=description>"),U0=p("<form class=entity-page-form><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=CHAPTERS>CHAPTERS</option><option value=CHAPTERS_DESC>CHAPTERS_DESC</option><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=SEARCH_MATCH>SEARCH_MATCH</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=TYPE>TYPE</option><option value=TYPE_DESC>TYPE_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC</option><option value=VOLUMES>VOLUMES</option><option value=VOLUMES_DESC>VOLUMES_DESC"),V0=p("<div class=entity-page>"),G0=p("<select>"),H0=p("<details class=entity-page-details open><summary class=entity-page-summary><h2></h2><div><label><input type=checkbox> Show years</label></div></summary><ol class=grid-column-auto-fill>"),j0=p("<option>"),Zo=p("<li class=entity-page-grid-year-header><h3>"),Vu=p("<img>"),Cl=p("<div class=list-status>"),Gu=p("<span class=role> "),Al=p("<p>"),Hu=p("<ol>"),Y0=p("<li class=entity-page-media-voice-actor>"),ju=p("<span>"),Qo=p("<span class=role> (<!>)"),q0=p('<img alt="Staff profile"class=background>'),Yu=p("<img alt=Character class=background>"),z0=p("<li><div class=entity-page-character-cover>");function W0(){const e=ne(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.characterInfoById(()=>e.id,t);return document.title="Character - LOB",i(qu,{type:"CHARACTER",entityInfo:n,mutateEntityInfoCache:r})}function K0(){const e=ne(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.staffInfoById(()=>e.id,t);return document.title="Staff - LOB",i(qu,{type:"STAFF",entityInfo:n,mutateEntityInfoCache:r})}function qu(e){const[t,n]=Te(),r=tr(mn,n,300),[s,a]=O(),[l,o]=O(!1);return q(le(e.entityInfo,c=>{o(c==null?void 0:c.data.isFavourite)})),q(()=>{a({onList:t.list?t.list==="true":void 0,sort:t.sort})}),(()=>{var c=V0();return d(c,i(T,{get when(){return e.entityInfo()},get children(){return[(()=>{var h=B0(),u=h.firstChild,f=u.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling;return d(g,()=>e.entityInfo().data.name.userPreferred),d(m,()=>[...Ke(e.entityInfo().data.name.native),...Ke(e.entityInfo().data.name.alternative)].join(", ")),d(f,i(Fr,{get checked(){return l()},get idType(){return e.type},get variableId(){return e.entityInfo().data.id},get anilistValue(){return e.entityInfo().data.favourites},onChange:o,mutateCache:v=>{e.entityInfo().data.isFavourite=v,e.mutateEntityInfoCache($=>$)}}),null),d(y,i(T,{get when(){return ei(e.entityInfo().data.dateOfBirth)},get children(){var v=M0(),$=v.firstChild;return $.nextSibling,d(v,()=>ei(e.entityInfo().data.dateOfBirth),null),v}}),null),d(y,i(T,{get when(){return e.entityInfo().data.age},get children(){var v=D0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.age,null),v}}),null),d(y,i(T,{get when(){return e.entityInfo().data.gender},get children(){var v=R0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.gender,null),v}}),null),d(y,i(T,{get when(){var v;return(v=e.entityInfo().data.yearsActive)==null?void 0:v.length},get children(){var v=N0();return v.firstChild,d(v,()=>e.entityInfo().data.yearsActive.join("-"),null),d(v,i(W,{get children(){return[i(M,{get when(){var $;return N(()=>{var k;return!!((k=e.entityInfo().data.dateOfDeath)!=null&&k.year)})()&&e.entityInfo().data.yearsActive.at(-1)!==(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)},get children(){return["-",N(()=>e.entityInfo().data.dateOfDeath.year)]}}),i(M,{get when(){var $;return(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)==null},children:"-Present"})]}}),null),v}}),null),d(y,i(T,{get when(){return e.entityInfo().data.homeTown},get children(){var v=O0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.homeTown,null),v}}),null),d(y,i(T,{get when(){return e.entityInfo().data.bloodType},get children(){var v=F0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.bloodType,null),v}}),null),d(y,i(T,{get when(){return e.entityInfo().data.description},get children(){var v=oi();return d(v,i($l,{get children(){return e.entityInfo().data.description}})),v}}),null),L(v=>{var $=e.entityInfo().data.image.large,k=Je(e.type)+" profile";return $!==v.e&&G(u,"src",v.e=$),k!==v.t&&G(u,"alt",v.t=k),v},{e:void 0,t:void 0}),h})(),(()=>{var h=U0(),u=h.firstChild,f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.nextSibling,v=y.firstChild,$=u.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,_=w.nextSibling,A=_.nextSibling,S=A.nextSibling,b=S.nextSibling,x=b.nextSibling,I=x.nextSibling,E=I.nextSibling,P=E.nextSibling,R=P.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling,re=ae.nextSibling,Q=re.nextSibling,J=Q.nextSibling;return h.addEventListener("submit",pe=>pe.preventDefault()),g.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),v.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),$.addEventListener("change",pe=>r({sort:pe.target.value})),L(()=>g.checked=t.list==="false"),L(()=>v.checked=t.list==="true"),L(()=>j.value=e.type==="CHARACTER"&&t.sort!=="POPULARITY_DESC"?"":"POPULARITY_DESC"),L(()=>J.value=e.type==="STAFF"&&t.sort!=="START_DATE_DESC"?"":"START_DATE_DESC"),L(()=>$.value=t.sort||""),h})()]}}),null),d(c,i(W,{get children(){return[i(M,{get when(){return e.type==="STAFF"},get children(){return[i(Va,{get variables(){return s()},type:"CHARACTER",showYears:!0,title:"Characters"}),i(Va,{get variables(){return s()},type:"ANIME",title:"Anime staff roles"}),i(Va,{get variables(){return s()},type:"MANGA",title:"Manga staff roles"})]}}),i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(Va,{get variables(){return s()},type:"MEDIA",title:"Media entries"})}})]}}),null),c})()}function Va(e){F(e.title,"title missing"),F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(e.showYears||!1),[r,s]=O(!1),[a,l]=O([]),[o,c]=O(["Japanese"]);return e.type==="MEDIA"&&q(()=>{a().length&&c(a().find(h=>h==="Japanese")||a().find(h=>h==="Chinese")||a()[0])}),(()=>{var h=H0(),u=h.firstChild,f=u.firstChild,g=f.nextSibling,m=g.firstChild,y=m.firstChild,v=u.nextSibling;return d(f,()=>e.title),y.addEventListener("change",$=>{$.preventDefault(),n($.target.checked)}),d(g,i(T,{get when(){return N(()=>e.type==="MEDIA")()&&a().length},get children(){var $=G0();return $.$$input=k=>c(k.target.value),d($,i(H,{get each(){return a()},children:k=>(()=>{var C=j0();return C.value=k,d(C,k),C})()})),L(()=>$.value=o()),$}}),null),d(v,i(W,{get children(){return[i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(Wu,{setVisible:s,get variables(){return e.variables},showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="ANIME"},get children(){return i(Fs,{setVisible:s,get variables(){return e.variables},type:"ANIME",showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="MANGA"},get children(){return i(Fs,{setVisible:s,get variables(){return e.variables},type:"MANGA",showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="MEDIA"},get children(){return i(zu,{setVisible:s,get variables(){return e.variables},showYears:t,setLanguages:l,language:o,nestLevel:1})}})]}})),L(()=>h.classList.toggle("hidden",!r())),L(()=>y.checked=t()),h})()}function zu(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.characterMediaById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(le(a,l=>{e.setVisible((l==null?void 0:l.data.edges.length)>0);const o=new Set;for(const c of(l==null?void 0:l.data.edges)||[])for(const h of c.voiceActorRoles)o.add(h.voiceActor.language);e.setLanguages([...o])})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:l=>[i(J0,{get language(){return e.language},get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(T,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return a().data.edges},get keyed(){return e.nestLevel===1},get children(){return i(T,{get when(){return e.variables},children:o=>i(T,{when:l===!1,fallback:"Fetch cooldown",get children(){return i(zu,{get variables(){var c;return{...o(),page:(((c=o())==null?void 0:c.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastYearGroup(){var c,h;return((h=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return a.loading}})}})})}})}})]})}function Wu(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.staffCharactersById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(le(a,l=>{e.setVisible((l==null?void 0:l.data.edges.length)>0)})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:l=>[i(Z0,{get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(T,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return a().data.edges},get keyed(){return e.nestLevel===1},get children(){return i(T,{get when(){return e.variables},children:o=>i(T,{when:l===!1,fallback:"Fetch cooldown",get children(){return i(Wu,{get variables(){var c;return{...o(),characterPage:(((c=o())==null?void 0:c.characterPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get lastYearGroup(){var c,h;return((h=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return a.loading}})}})})}})}})]})}function Fs(e){F(e.type,"Type is missing"),F(e.nestLevel,"nestLevel is missing");const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a,{mutate:l}]=ue.anilist.staffMediaById(n,()=>t.id,e.type,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(le(a,o=>{e.setVisible((o==null?void 0:o.data.edges.length)>0)})),q(le(a,o=>{if(!e.lastMediaId||!(o!=null&&o.data.edges.length))return;const c=structuredClone(o.data.edges),h=[];for(const u of o.data.edges){if(u.node.id!==e.lastMediaId)break;h.push(c.shift())}h.length!==0&&(e.mutate(u=>(u.data.edges=[...u.data.edges,...h],{...u})),l(u=>(u.data.edges=c,{...u})))})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:o=>[i(X0,{get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(T,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return e.variables},get keyed(){return e.nestLevel===1},get children(){return i(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return i(Fs,{get variables(){var c;return{...e.variables,staffPage:(((c=e.variables)==null?void 0:c.staffPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},mutate:l,get type(){return e.type},get lastYearGroup(){var c,h;return((h=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get lastMediaId(){var c;return(c=a().data.edges.at(-1))==null?void 0:c.node.id},get loading(){return a.loading}})}})}})}})]})}function xl(e){return i(T,{get when(){return e.showYears()},get children(){return i(W,{get children(){return[i(M,{get when(){return e.index()===0},get children(){return i(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Zo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),i(M,{when:!0,get children(){return i(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Zo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function J0(e){return F(e.showYears,"showYears signal is missing"),F(e.language,"language signal is missing"),i(H,{get each(){return e.edges},children:(t,n)=>[i(xl,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),i(T,{get when(){return t.voiceActorRoles.filter(r=>r.voiceActor.language===e.language())},children:r=>(()=>{var s=Y0();return d(s,i(U,{get href(){return Ge(t.node)},get children(){var a=Vu();return L(l=>{var o=t.node.coverImage.large,c=Je(t.node.type)+" cover";return o!==l.e&&G(a,"src",l.e=o),c!==l.t&&G(a,"alt",l.t=c),l},{e:void 0,t:void 0}),a}}),null),d(s,i(U,{get href(){return Ge(t.node)},get children(){var a=Al();return d(a,i(T,{get when(){var l;return(l=t.node.mediaListEntry)==null?void 0:l.status},get children(){var l=Cl();return L(()=>G(l,"data-status",t.node.mediaListEntry.status)),l}}),null),d(a,()=>t.node.title.userPreferred,null),d(a,i(T,{get when(){return t.characterRole},get children(){var l=Gu();return l.firstChild,d(l,()=>Je(t.characterRole),null),l}}),null),a}}),null),d(s,i(T,{get when(){return r().length},get children(){var a=Hu();return d(a,i(H,{get each(){return r()},children:l=>(()=>{var o=oi();return d(o,i(U,{class:"actor",get href(){return"/ani/staff/"+l.voiceActor.id+"/"+Xe(l.voiceActor.name.userPreferred)},get children(){return[(()=>{var c=ju();return d(c,()=>l.voiceActor.name.userPreferred),c})(),i(T,{get when(){return l.roleNotes},get children(){var c=Qo(),h=c.firstChild,u=h.nextSibling;return u.nextSibling,d(c,()=>l.roleNotes,u),c}}),i(T,{get when(){return l.dubGroup},get children(){var c=Qo(),h=c.firstChild,u=h.nextSibling;return u.nextSibling,d(c,()=>l.dubGroup,u),c}}),(()=>{var c=q0();return L(()=>G(c,"src",l.voiceActor.image.large)),c})()]}})),o})()})),a}}),null),s})()})]})}function X0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{const s=n.at(-1);return(s==null?void 0:s.node.id)!==r.node.id?(r.staffRoles=[r.staffRole],n.push(r)):s!=null&&s.staffRoles&&s.staffRoles.push(r.staffRole),n};return i(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[i(xl,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),(()=>{var s=oi();return d(s,i(U,{get href(){return Ge(n.node)},get children(){return[(()=>{var a=Yu();return L(()=>G(a,"src",n.node.coverImage.large)),a})(),(()=>{var a=Al();return d(a,i(T,{get when(){var l;return(l=n.node.mediaListEntry)==null?void 0:l.status},get children(){var l=Cl();return L(()=>G(l,"data-status",n.node.mediaListEntry.status)),l}}),null),d(a,()=>n.node.title.userPreferred,null),a})(),i(T,{get when(){return n.staffRoles},get children(){var a=Hu();return d(a,i(H,{get each(){return n.staffRoles},children:l=>(()=>{var o=oi();return d(o,l),o})()})),a}})]}})),s})()]})}function Z0(e){return F(e.showYears,"showYears signal is missing"),i(H,{get each(){return e.edges},children:(t,n)=>i(H,{get each(){return t.characters},children:r=>i(T,{when:r,get children(){return[i(xl,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),(()=>{var s=z0(),a=s.firstChild;return d(a,i(U,{get href(){return"/ani/character/"+r.id+"/"+Xe(r.name.userPreferred)},get children(){var l=Yu();return L(()=>G(l,"src",r.image.large)),l}}),null),d(a,i(U,{class:"media",get href(){return Ge(t.node)},get children(){var l=Vu();return L(o=>{var c=t.node.coverImage.large,h=Je(t.node.type)+" cover";return c!==o.e&&G(l,"src",o.e=c),h!==o.t&&G(l,"alt",o.t=h),o},{e:void 0,t:void 0}),l}}),null),d(s,i(U,{get href(){return"/ani/character/"+r.id+"/"+Xe(r.name.userPreferred)},get children(){return[(()=>{var l=ju();return d(l,()=>r.name.userPreferred),l})(),(()=>{var l=Gu();return l.firstChild,d(l,()=>Je(t.characterRole),null),l})()]}}),null),d(s,i(U,{get href(){return Ge(t.node)},get children(){var l=Al();return d(l,i(T,{get when(){var o;return(o=t.node.mediaListEntry)==null?void 0:o.status},get children(){var o=Cl();return L(()=>G(o,"data-status",t.node.mediaListEntry.status)),o}}),null),d(l,()=>t.node.title.userPreferred,null),l}}),null),s})()]}})})})}$e(["input"]);var Q0=p("<div class=flex-space-between><h1>"),e2=p("<form><label><input type=checkbox> Show years</label><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option value=POPULARITY_DESC>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC"),t2=p("<ol class=grid-column-auto-fill>"),n2=p("<div class=studio-page>"),ec=p("<li class=grid-full-span><h3>");function r2(){const e=ne(),{accessToken:t}=ce(),[n,r]=Te(),s=tr(mn,r,300),[a,l]=O(),[o,c]=O(!0),[h,{mutateCache:u}]=ue.anilist.studioInfoAndMediaById(()=>e.id,a,t);document.title="Studio - LOB";const[f,g]=O(!1);return q(le(h,m=>{g(m==null?void 0:m.data.isFavourite)})),q(()=>{l({onList:n.list?n.list==="true":void 0,sort:n.sort})}),(()=>{var m=n2();return d(m,i(T,{get when(){return h()},get children(){return[(()=>{var y=Q0(),v=y.firstChild;return d(v,()=>h().data.name),d(y,i(Fr,{get checked(){return f()},get variableId(){return e.id},idType:"STUDIO",get anilistValue(){return h().data.favourites},onChange:g,mutateCache:$=>{h().data.isFavourite=$,u(k=>k)}}),null),y})(),(()=>{var y=e2(),v=y.firstChild,$=v.firstChild,k=v.nextSibling,C=k.firstChild,w=C.firstChild,_=C.nextSibling,A=_.nextSibling,S=A.firstChild,b=k.nextSibling,x=b.firstChild,I=x.nextSibling,E=I.nextSibling,P=E.nextSibling,R=P.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling,re=ae.nextSibling,Q=re.nextSibling,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling,fe=ve.nextSibling,ee=fe.nextSibling;return y.addEventListener("submit",z=>z.preventDefault()),$.addEventListener("change",z=>c(z.target.checked)),w.addEventListener("change",z=>s({list:z.target.checked?z.target.value:void 0})),S.addEventListener("change",z=>s({list:z.target.checked?z.target.value:void 0})),b.addEventListener("change",z=>s({sort:z.target.value})),L(()=>$.checked=o()),L(()=>w.checked=n.list==="false"),L(()=>S.checked=n.list==="true"),L(()=>ee.value=n.sort==="START_DATE_DESC"?"START_DATE_DESC":""),L(()=>b.value=n.sort||""),y})(),i(Iu,{get children(){var y=t2();return d(y,i(Ku,{get variables(){return a()},studioInfo:h,showYears:o,nestLevel:1})),y}})]}})),m})()}function Ku(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.studioInfoAndMediaById(()=>t.id,e.nestLevel===1?void 0:r,n),l=e.studioInfo||a;return i($n,{onIntersection:()=>s(e.variables),fetchResponse:l,get loading(){return e.loading},children:o=>[i(i2,{get edges(){return l().data.media.edges},get showYears(){return e.showYears},get lastMediaId(){return e.lastMediaId},get lastYearGroup(){return e.lastYearGroup}}),i(T,{get when(){return l().data.media.pageInfo.hasNextPage},get children(){return i(T,{get when(){return l().data.media.edges},get keyed(){return e.nestLevel===1},get children(){return i(T,{get when(){return e.variables},children:c=>i(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return i(Ku,{get variables(){var h;return{...c(),page:(((h=c())==null?void 0:h.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastMediaId(){var h;return(h=l().data.media.edges.at(-1))==null?void 0:h.node.id},get lastYearGroup(){var h,u;return((u=(h=l().data.media.edges.at(-1))==null?void 0:h.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function a2(e){return i(T,{get when(){return e.showYears()},get children(){return i(W,{get children(){return[i(M,{get when(){return e.index()===0},get children(){return i(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=ec(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),i(M,{when:!0,get children(){return i(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=ec(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function i2(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{var s;return((s=n.at(-1))==null?void 0:s.node.id)!==r.node.id&&e.lastMediaId!==r.node.id&&n.push(r),n};return i(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[i(a2,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),i(xi,{get media(){return n.node}})]})}var s2=p("<div data-k-8e2716fd class=activity-page>"),l2=p("<img data-k-8e2716fd class=profile alt=Profile>"),o2=p("<div data-k-8e2716fd class=activity-message-card><div data-k-8e2716fd class=header></div><div data-k-8e2716fd class=content>");function c2(){const{accessToken:e}=ce(),t=ne(),[n]=ue.anilist.activityById(()=>t.id,e),[r]=ue.anilist.activityRepliesById(()=>t.id,1,e);return document.title="Activity - LOB",(()=>{var s=s2();return d(s,i(T,{get when(){var a;return(a=n())==null?void 0:a.data},get children(){return i(_l,{get activity(){return n().data},mutateCache:a=>console.log("mutate",a)})}}),null),d(s,i(T,{get when(){var a;return(a=r())==null?void 0:a.data},get children(){return i(H,{get each(){return r().data.activityReplies},children:a=>(()=>{var l=o2(),o=l.firstChild,c=o.nextSibling;return d(o,i(U,{get href(){return"/user/"+a.user.name},class:"message-card-profile-header",get children(){return[(()=>{var h=l2();return L(()=>G(h,"src",a.user.avatar.large)),h})(),N(()=>a.user.name)]}}),null),d(o,i(Yn,{get createdAt(){return a.createdAt}}),null),d(c,i($l,{get children(){return a.text}})),l})()})}}),null),s})()}function d2(e){const t=ne(),n=Qt();return i(T,{get when(){return!n.search},get fallback(){return i(hn,{get href(){return"/search/"+t.type+n.search}})},get children(){return e.children}})}var u2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"fill=currentColor>'),h2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"fill=currentColor>'),g2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"fill=currentColor>');function sa(e){return F("score"in e,"Score is missing"),i(W,{get children(){return[i(M,{get when(){return e.score>=75},get children(){var t=u2();return L(()=>G(t,"class",`good ${e.class||""}`)),t}}),i(M,{get when(){return e.score>=60},get children(){var t=h2();return L(()=>G(t,"class",`average ${e.class||""}`)),t}}),i(M,{get when(){return e.score>=0},get children(){var t=g2();return L(()=>G(t,"class",`bad ${e.class||""}`)),t}})]}})}var f2=p("<label>"),m2=p("<p>"),p2=p("<input type=number inputmode=numeric min=0 max=10>"),v2=p("<input type=number inputmode=numeric min=0 max=100>"),$2=p("<input type=number inputmode=decimal min=0 max=10 step=.1>"),_2=p("<div class=score-star-input>"),b2=p("<div class=score-emoji-input>"),Ju=p("<label class=radio-container><input type=radio class=radio>");function tc(e){F(e.format,"Score format is missing"),F(e.onChange,"onChange is missing (give signal)");const t=Fe({name:"score",id:"score",value:0},e),[n]=fi(t,["id","name","value"]),r={onBeforeInput:s=>{var a;(a=s.data)!=null&&a.toLowerCase().includes("e")&&s.preventDefault()},onBlur:s=>s.target.value=n.value};return[i(T,{get when(){return e.label},get children(){return i(W,{get children(){return[i(M,{get when(){return e.format==="POINT_10"||e.format==="POINT_100"||e.format==="POINT_10_DECIMAL"},get children(){var s=f2();return d(s,()=>e.label),L(()=>G(s,"for",n.id)),s}}),i(M,{get when(){return e.format==="POINT_5"||e.format==="POINT_3"},get children(){var s=m2();return d(s,()=>e.label),s}})]}})}}),i(W,{get children(){return[i(M,{get when(){return e.format==="POINT_10"},get children(){var s=p2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Math.floor(Number(a.target.value)||0);e.onChange(Math.max(0,Math.min(l,10)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_100"},get children(){var s=v2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Math.floor(Number(a.target.value)||0);e.onChange(Math.max(0,Math.min(l,100)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){var s=$2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Number((Number(a.target.value)||0).toFixed(1));e.onChange(Math.max(0,Math.min(l,10)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_5"},get children(){var s=_2();return d(s,i(y2,Fe(n,{get onChange(){return e.onChange}}))),s}}),i(M,{get when(){return e.format==="POINT_3"},get children(){var s=b2();return d(s,i(w2,Fe(n,{get onChange(){return e.onChange}}))),s}})]}})]}function y2(e){return i(H,{each:[1,2,3,4,5],children:t=>(()=>{var n=Ju(),r=n.firstChild;return r.$$click=s=>{e.value==s.target.value?(s.target.checked=!1,e.onChange(0)):e.onChange(+s.target.value)},r.value=t,d(n,i(Sa,{class:"score-star"}),null),L(s=>{var a=t<=e.value,l=e.name,o=e.id;return a!==s.e&&n.classList.toggle("selected",s.e=a),l!==s.t&&G(r,"name",s.t=l),o!==s.a&&G(r,"id",s.a=o),s},{e:void 0,t:void 0,a:void 0}),L(()=>r.checked=e.value==t),n})()})}function w2(e){const t=["",0,60,80];return i(H,{each:[1,2,3],children:n=>(()=>{var r=Ju(),s=r.firstChild;return s.$$click=a=>{e.value==a.target.value?(a.target.checked=!1,e.onChange(0)):e.onChange(+a.target.value)},s.value=n,d(r,i(sa,{get score(){return t[n]}}),null),L(a=>{var l=n==e.value,o=e.name,c=e.id;return l!==a.e&&r.classList.toggle("selected",a.e=l),o!==a.t&&G(s,"name",a.t=o),c!==a.a&&G(s,"id",a.a=c),a},{e:void 0,t:void 0,a:void 0}),L(()=>s.checked=e.value==n),r})()})}$e(["click"]);var k2=p("<form class=exit-media-editor method=dialog><button>Close"),S2=p("<img class=banner alt=Banner>"),C2=p('<div class="media-editor-input volume-progress"><label for=progress-volumes>Volume Progress</label><input type=number inputmode=numeric id=progress-volumes name=progressVolumes min=0>'),A2=p("<p class=advanced-scoring-header>Advanced scoring"),x2=p("<ul>"),T2=p("<hr>"),I2=p("<button type=button>Delete"),E2=p('<form method=dialog><header class=media-editor-header><img class=cover alt=Cover><h2 class="line-clamp header"></h2><div class=container><button type=submit>Save</button></div></header><div class=media-editor-body><div><div class="media-editor-input status"><label for=status>Status</label><select name=status id=status><option value=none disabled hidden>Select status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select></div><div class="media-editor-input score"></div><div class="media-editor-input progress"><label for=progress></label><input type=number inputmode=numeric id=progress name=progress min=0></div><div class="media-editor-input start-date"><label for=start-date>Start date</label><input type=date id=start-date name=startedAt></div><div class="media-editor-input finish-date"><label for=end-date>Finish date</label><input type=date id=end-date name=completedAt></div><div class="media-editor-input repeat"><label for=repeat></label><input type=number inputmode=numeric id=repeat name=repeat min=0></div><div class="media-editor-input notes"><label for=notes>Notes</label><textarea type=text id=notes placeholder=Notes... name=notes></textarea></div></div><div><h3>Custom Lists</h3><div><input type=checkbox name=hiddenFromStatusLists id=hide-from-status><label for=hide-from-status> Hide from status lists</label></div><div><input type=checkbox name=private id=private><label for=private> Private'),L2=p("<dialog class=media-editor-warning-dialog><p>Are you sure you want to delete this media entry</p><form method=dialog><button>Yes</button><button>No"),P2=p("<dialog class=media-editor>"),M2=p('<div class="media-editor-input advanced-score">'),D2=p("<li><input type=checkbox name=customLists><label> ");function R2(e,t){F(!t,"Should not be able to edit if not authenticated");const[n,r]=O(),[s,a]=O(),[l,o]=O(),[c,h]=O(),[u,f]=O(),[g,m]=O(),[y,v]=O(),[$,k]=O(),[C,w]=O(),[_,A]=O(),[S,b]=O(),[x,I]=O(),[E,P]=O(),[R,B]=O(),[V,X]=O(),[j,K]=O(),[ae,re]=O(),[Q,J]=O(),[pe,ve]=O();function fe(ee,z){Oe(()=>{var je,De,Be,et,Pt,Mt,rt,kt,at,dt,Dt,ft;k(ee==null?void 0:ee.data.mediaListOptions.scoreFormat),o(()=>(z==null?void 0:z.type)==="ANIME"?ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoringEnabled:(z==null?void 0:z.type)==="MANGA"?ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoringEnabled:!1),h(()=>(z==null?void 0:z.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoring)||[]:(z==null?void 0:z.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoring)||[]:[]),f(()=>(z==null?void 0:z.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.customLists)||[]:(z==null?void 0:z.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.customLists)||[]:[]),r(((je=z==null?void 0:z.mediaListEntry)==null?void 0:je.score)??""),a(((De=z==null?void 0:z.mediaListEntry)==null?void 0:De.advancedScores)??{}),v(((Be=z==null?void 0:z.mediaListEntry)==null?void 0:Be.status)??"none"),A(((et=z==null?void 0:z.mediaListEntry)==null?void 0:et.progress)??""),b(((Pt=z==null?void 0:z.mediaListEntry)==null?void 0:Pt.progressVolumes)??""),I((z==null?void 0:z.episodes)??(z==null?void 0:z.chapters)??null),P(ci((Mt=z==null?void 0:z.mediaListEntry)==null?void 0:Mt.startedAt)),B(ci((rt=z==null?void 0:z.mediaListEntry)==null?void 0:rt.completedAt)),X(((kt=z==null?void 0:z.mediaListEntry)==null?void 0:kt.repeat)??""),K(((at=z==null?void 0:z.mediaListEntry)==null?void 0:at.notes)||""),w((z==null?void 0:z.isFavourite)||!1),ve(((dt=z==null?void 0:z.mediaListEntry)==null?void 0:dt.private)||!1),J(((Dt=z==null?void 0:z.mediaListEntry)==null?void 0:Dt.hiddenFromStatusLists)||!1),m(((ft=z==null?void 0:z.mediaListEntry)==null?void 0:ft.customLists)||{})})}return fe(e,t),[{score:n,setScore:r,advancedScores:s,setAdvancedScores:a,advancedScoresEnabled:l,setAdvancedScoresEnabled:o,advancedScoring:c,setAdvancedScoring:h,customLists:u,setCustomLists:f,mediaCustomLists:g,setMediaCustomLists:m,status:y,setStatus:v,format:$,setFormat:k,progress:_,setProgress:A,volumeProgress:S,setvolumeProgress:b,maxProgress:x,setMaxProgress:I,startedAt:E,setStartedAt:P,completedAt:R,setCompletedAt:B,isFavourite:C,setIsFavourite:w,repeat:V,setRepeat:X,notes:j,setNotes:K,like:ae,setLike:re,hideFromStatus:Q,setHideFromStatus:J,mediaPrivate:pe,setMediaPrivate:ve},fe]}function N2(e){const[t,n]=O(void 0),[r,s]=O(void 0),{accessToken:a,authUserData:l}=ce(),[o,c]=R2();let h,u;const f=async m=>{var k,C,w,_,A,S,b,x,I,E,P,R,B,V,X,j,K,ae;const v=new FormData(m.currentTarget).entries().reduce((re,[Q,J])=>(Array.isArray(re[Q])?re[Q].push(J||null):Q in re?re[Q]=[re[Q],J||null]:re[Q]=J||null,re),{}),$={};if(Number.isNaN(+v.progress)===!1&&v.progress!=(((k=t().mediaListEntry)==null?void 0:k.progress)||0)&&($.progress=Number(v.progress)),Number.isNaN(+v.progressVolumes)===!1&&v.progressVolumes!=(((C=t().mediaListEntry)==null?void 0:C.progressVolumes)||0)&&($.progressVolumes=Number(v.progressVolumes)),Number.isNaN(+v.score)===!1&&v.score!=(((w=t().mediaListEntry)==null?void 0:w.score)||0)&&($.score=Number(v.score)),Number.isNaN(+v.repeat)===!1&&v.repeat!=(((_=t().mediaListEntry)==null?void 0:_.repeat)||0)&&($.repeat=Number(v.repeat)),o.advancedScoresEnabled()){const Q=o.advancedScoring().map((fe,ee)=>v["advanced-scores-"+ee]).map(fe=>Number(fe||0)),J=!Q.some(Number.isNaN),pe=Object.values(((A=t().mediaListEntry)==null?void 0:A.advancedScores)||{}),ve=Q.some((fe,ee)=>fe!=pe[ee]);J&&ve&&($.advancedScores=Q)}if(F(v.status!="none"||((S=t().mediaListEntry)==null?void 0:S.score)==null,"Replacing current status with default none value"),v.status=="none"||((b=t().mediaListEntry)==null?void 0:b.status)==v.status||($.status=v.status),(v.startedAt||"")!=ci((x=t().mediaListEntry)==null?void 0:x.startedAt)){const[re,Q,J]=v.startedAt.split("-");$.startedAt={year:re,month:Q,day:J}}if((v.completedAt||"")!=ci((I=t().mediaListEntry)==null?void 0:I.completedAt)){const[re,Q,J]=v.completedAt.split("-");$.completedAt={year:re,month:Q,day:J}}if(v.notes!=((E=t().mediaListEntry)==null?void 0:E.notes)&&($.notes=v.notes),v.customLists||(P=t().mediaListEntry)!=null&&P.customLists){const re=v.customLists||[],Q=Array.isArray(re)?re:[re];(Q.length>0&&((R=t().mediaListEntry)==null?void 0:R.customLists)==null||(B=t().mediaListEntry)!=null&&B.customLists&&Object.entries((V=t().mediaListEntry)==null?void 0:V.customLists).some(([pe,ve])=>Q.includes(pe)!==ve))&&($.customLists=Q)}if(v.hiddenFromStatusLists==="on"!=(((X=t().mediaListEntry)==null?void 0:X.hiddenFromStatusLists)??!1)&&($.hiddenFromStatusLists=v.hiddenFromStatusLists==="on"),v.private==="on"!=(((j=t().mediaListEntry)==null?void 0:j.private)??!1)&&($.private=v.private==="on"),m.submitter.type==="submit"&&Object.keys($).length>0){$.mediaId=t().id;for(const[Q,J]of Object.entries($))F(Number.isNaN(J)===!1,`Key "${Q}" is NaN`);const re=await ue.anilist.mutateMedia(a(),$);re.status===200&&((ae=(K=r())==null?void 0:K.mutateMedia)==null||ae.call(K,re.data))}};async function g(m,y){F("id"in m,"Missing editor id"),Oe(()=>{n(m),s(y),c(l(),m)}),h.showModal();const v=await ue.anilist.mediaListEntry(a(),m.id);Oe(()=>{n(v.data.data.Media),c(l(),v.data.data.Media)})}return i(Fc.Provider,{value:{openEditor:g},get children(){return[(()=>{var m=P2(),y=h;return typeof y=="function"?he(y,m):h=m,d(m,i(T,{get when(){return t()},get children(){return[k2(),(()=>{var v=E2(),$=v.firstChild,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,_=w.firstChild,A=$.nextSibling,S=A.firstChild,b=S.firstChild,x=b.firstChild,I=x.nextSibling,E=I.firstChild,P=E.nextSibling,R=P.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=b.nextSibling,ae=K.nextSibling,re=ae.firstChild,Q=re.nextSibling,J=ae.nextSibling,pe=J.firstChild,ve=pe.nextSibling,fe=J.nextSibling,ee=fe.firstChild,z=ee.nextSibling,je=fe.nextSibling,De=je.firstChild,Be=De.nextSibling,et=je.nextSibling,Pt=et.firstChild,Mt=Pt.nextSibling,rt=S.nextSibling,kt=rt.firstChild,at=kt.nextSibling,dt=at.firstChild,Dt=at.nextSibling,ft=Dt.firstChild;return v.addEventListener("submit",f),d($,i(T,{get when(){return t().bannerImage},get children(){var te=S2();return L(()=>G(te,"src",t().bannerImage)),te}}),k),d(C,()=>{var te;return(te=t().title)==null?void 0:te.userPreferred}),d(w,i(Fr,{get checked(){return o.isFavourite()},get idType(){return t().type},get variableId(){return t().id},get onChange(){return o.setIsFavourite},mutateCache:(te,Z)=>{var _e,ke;(ke=(_e=r())==null?void 0:_e.setIsFavourite)==null||ke.call(_e,te,Z)}}),_),I.addEventListener("change",te=>{o.setStatus(te.target.value),(te.target.value==="CURRENT"||te.target.value==="COMPLETED")&&o.startedAt()===""&&o.setStartedAt(new Date().toISOString().substring(0,10)),te.target.value==="COMPLETED"&&((o.progress()===""||o.progress()==0)&&o.maxProgress()>0&&o.setProgress(o.maxProgress()),(o.volumeProgress()===""||o.volumeProgress()==0)&&t().volumes>0&&o.setvolumeProgress(t().volumes),o.completedAt()===""&&o.setCompletedAt(new Date().toISOString().substring(0,10)))}),d(R,i(W,{get children(){return[i(M,{get when(){return t().type==="MANGA"},children:" Reading"}),i(M,{get when(){return t().type==="ANIME"},children:" Watching"})]}})),d(j,i(W,{get children(){return[i(M,{get when(){return t().type==="MANGA"},children:"Rereading"}),i(M,{get when(){return t().type==="ANIME"},children:"Rewatching"})]}})),d(K,i(tc,{get value(){return o.score()},label:"Score",get onChange(){return o.setScore},get format(){return o.format()}})),d(re,i(W,{get children(){return[i(M,{get when(){return t().type==="ANIME"},children:"Episode Progress"}),i(M,{get when(){return t().type==="MANGA"},children:"Chapter Progress"})]}})),Q.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Q.addEventListener("blur",te=>te.target.value=o.progress()),Q.addEventListener("change",te=>o.setProgress(Math.max(0,Math.min(+te.target.value,o.maxProgress()??1/0)))),d(S,i(T,{get when(){return t().type==="MANGA"},get children(){var te=C2(),Z=te.firstChild,_e=Z.nextSibling;return _e.$$beforeinput=ke=>{var it;(it=ke.data)!=null&&it.toLowerCase().includes("e")&&ke.preventDefault()},_e.addEventListener("blur",ke=>ke.target.value=o.volumeProgress()),_e.addEventListener("change",ke=>o.setvolumeProgress(Math.max(0,Math.min(+ke.target.value,t().volumes??1/0)))),L(()=>G(_e,"max",t().volumes)),L(()=>_e.value=o.volumeProgress()),te}}),J),ve.addEventListener("change",te=>o.setStartedAt(te.target.value)),z.addEventListener("change",te=>o.setCompletedAt(te.target.value)),d(De,i(W,{get children(){return[i(M,{get when(){return t().type==="ANIME"},children:"Total Rewatches"}),i(M,{get when(){return t().type==="MANGA"},children:"Total Rereads"})]}})),Be.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Be.addEventListener("blur",te=>te.target.value=o.repeat()),Be.addEventListener("change",te=>o.setRepeat(Math.max(0,Math.min(+te.target.value,Number.MAX_SAFE_INTEGER)))),Mt.addEventListener("change",te=>o.setNotes(te.target.value)),d(S,i(T,{get when(){return N(()=>!!o.advancedScoresEnabled())()&&o.advancedScoring().length},get children(){return[A2(),i(H,{get each(){return o.advancedScoring()},children:(te,Z)=>(()=>{var _e=M2();return d(_e,i(tc,{get value(){return o.advancedScores()[te]??""},get id(){return"advanced-score-"+Z()},get name(){return"advanced-scores-"+Z()},label:te,onChange:ke=>{o.setAdvancedScores(it=>{const _t={...it,[te]:ke};let Ie=0,Ve=0;return Object.values(_t).forEach(st=>{Ie+=st>0,Ve+=st||0}),F(Ie!==0||Ve===0,"Total is 0"),Number.isNaN(Ve)===!1&&typeof Ve=="number"&&Ie>0&&o.setScore(()=>{switch(o.format()){case"POINT_10":return Math.max(0,Math.min(Math.round(Ve/Ie),10));case"POINT_100":return Math.max(0,Math.min(Math.round(Ve/Ie),100));case"POINT_10_DECIMAL":return Math.max(0,Math.min(Number((Ve/Ie).toFixed(1)),10));case"POINT_5":return Math.max(0,Math.min(Math.round(Ve/Ie),5));case"POINT_3":return Math.max(0,Math.min(Math.round(Ve/Ie),3));default:F(!1,`Format "${o.format()}" not found`)}}),_t})},get format(){return o.format()}})),_e})()})]}}),null),d(rt,i(T,{get when(){var te;return(te=o.customLists())==null?void 0:te.length},get children(){return[(()=>{var te=x2();return d(te,i(H,{get each(){return o.customLists()},children:(Z,_e)=>(()=>{var ke=D2(),it=ke.firstChild,_t=it.nextSibling;return _t.firstChild,it.addEventListener("change",Ie=>o.setMediaCustomLists(Ve=>({...Ve,[Z]:Ie.target.checked}))),it.value=Z,d(_t,Z,null),L(Ie=>{var Ve="custom-list-"+_e(),st="custom-list-"+_e();return Ve!==Ie.e&&G(it,"id",Ie.e=Ve),st!==Ie.t&&G(_t,"for",Ie.t=st),Ie},{e:void 0,t:void 0}),L(()=>{var Ie;return it.checked=(Ie=o.mediaCustomLists())==null?void 0:Ie[Z]}),ke})()})),te})(),T2()]}}),at),dt.addEventListener("change",te=>o.setHideFromStatus(te.target.checked)),ft.addEventListener("change",te=>o.setMediaPrivate(te.target.checked)),d(rt,i(T,{get when(){return t().mediaListEntry},get children(){var te=I2();return te.$$click=()=>u.showModal(),te}}),null),L(te=>{var it,_t;var Z=(it=t().coverImage)==null?void 0:it.large,_e="media-editor-input-grid "+((_t=t().type)==null?void 0:_t.toLowerCase())||"",ke=o.maxProgress();return Z!==te.e&&G(k,"src",te.e=Z),_e!==te.t&&Bt(S,te.t=_e),ke!==te.a&&G(Q,"max",te.a=ke),te},{e:void 0,t:void 0,a:void 0}),L(()=>I.value=o.status()),L(()=>Q.value=o.progress()),L(()=>ve.value=o.startedAt()),L(()=>z.value=o.completedAt()),L(()=>Be.value=o.repeat()),L(()=>Mt.value=o.notes()),L(()=>dt.checked=o.hideFromStatus()),L(()=>ft.checked=o.mediaPrivate()),v})(),(()=>{var v=L2(),$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=u;return typeof w=="function"?he(w,v):u=v,C.$$click=async()=>{var _,A;h.close(),(A=(_=r())==null?void 0:_.deleteMedia)==null||A.call(_)},v})()]}})),m})(),N(()=>e.children)]}})}function ci(e){if(!e||!e.day||!e.month||!e.year)return"";const t=String(e.day).padStart(2,"0"),n=String(e.month).padStart(2,"0");return`${e.year}-${n}-${t}`}$e(["beforeinput","click"]);function O2(e){return new Worker("/legendary-octo-barnacle/branches/rework-change-fetching-and-caching/assets/compare-media-list-LL2sZrPK.js",{name:e==null?void 0:e.name})}var F2=p("<div class=score-component-container>");function Tl(e){return i(T,{get when(){return e.score!==0},get children(){var t=F2();return d(t,i(W,{get children(){return[i(M,{get when(){return e.format==="POINT_10"},get children(){return[N(()=>e.score),"/10"]}}),i(M,{get when(){return e.format==="POINT_100"},get children(){return[N(()=>e.score),"/100"]}}),i(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){return[N(()=>e.score),"/10"]}}),i(M,{get when(){return e.format==="POINT_5"},get children(){return[N(()=>e.score),"/5 ",i(Sa,{class:"score-star"})]}}),i(M,{get when(){return e.format==="POINT_3"},get children(){return i(W,{get children(){return[i(M,{get when(){return e.score===1},get children(){return i(sa,{class:"score-emoji",score:0})}}),i(M,{get when(){return e.score===2},get children(){return i(sa,{class:"score-emoji",score:70})}}),i(M,{get when(){return e.score===3},get children(){return i(sa,{class:"score-emoji",score:80})}})]}})}})]}})),t}})}var B2=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z">');function di(){return B2()}var U2=p("<ol><li><button>All "),V2=p("<option value>All formats"),G2=p("<option value>Any User Status"),H2=p("<option value>Any Status"),j2=p("<option value>All genres"),Y2=p("<option value>All countries"),q2=p("<option value>All ratings"),z2=p("<option value=chapters>Chapters"),W2=p("<option value=episodes>Episodes"),K2=p("<option value=volumes>Volumes"),J2=p("<i>(default is all users)"),X2=p("<button>Reset filters"),Z2=p('<div class=pg-compare><div><ul class=pg-compare-users></ul></div><div class=pg-compare-filter-panel><input type=text placeholder=Search><select name=format><option value hidden>Format</option><option value=MOVIE>Movie</option><option value=MUSIC>Music</option><option value=ONA>Ona</option><option value=OVA>Ova</option><option value=SPECIAL>Special</option><option value=TV>TV</option><option value=TV_SHORT>TV short</option></select><select name=userStatus><option value hidden>User Status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select><select name=status><option value hidden>Status</option><option value=RELEASING>Releasing</option><option value=FINISHED>Finished</option><option value=NOT_YET_RELEASED>Not Yet Released</option><option value=CANCELLED>Cancelled</option></select><select name=genre><option value hidden>Genre</option><option value=Action>Action</option><option value=Adventure>Adventure</option><option value=Comedy>Comedy</option><option value=Drama>Drama</option><option value=Ecchi>Ecchi</option><option value=Fantasy>Fantasy</option><option value=Hentai>Hentai</option><option value=Horror>Horror</option><option value="Mahou Shoujo">Mahou Shoujo</option><option value=Mecha>Mecha</option><option value=Music>Music</option><option value=Mystery>Mystery</option><option value=Psychological>Psychological</option><option value=Romance>Romance</option><option value=Sci-Fi>Sci-Fi</option><option value="Slice of Life">Slice of Life</option><option value=Sports>Sports</option><option value=Supernatural>Supernatural</option><option value=Thriller>Thriller</option></select><select name=countryOfOrigin><option value hidden>Country</option><option value=CN>China</option><option value=JP>Japan</option><option value=KR>South Korea</option><option value=TW>Taiwan</option></select><select name=isAdult><option value hidden>Age rating</option><option value=false>R-17+</option><option value=true>R-18</option></select><input type=number name=year placeholder="Release year"max=9999 min=0><label for=repeat><input type=checkbox name=repeat id=repeat> </label><label for=missingScore><input type=checkbox name=missingScore id=missingScore> Allow missing scores</label><label for=reverse><input type=checkbox name=reverse id=reverse> Reverse order</label><select name=sort><option value=completedAt>Completed Date</option><option value=averageScore>Global Score</option><option value=updatedAt>Last updated</option><option value=popularity>Popularity</option><option value=releaseDate>Release Date</option><option value=repeat></option><option value=title>Title</option><option value=score>User score</option></select><label for=reviewsNeeded>Reviews needed: <input type=number inputmode=numeric min=1 name=reviewsNeeded id=reviewsNeeded><button class=help>?'),Q2=p("<li><button> "),ew=p("<ol>"),tw=p('<form class=pg-compare-user-search><input type=search name=user id=user placeholder="Search users">'),nw=p('<li><img alt="Profile picture">'),rw=p('<p class=error>No user found with name: "<!>"'),aw=p("<img>"),iw=p("<p>"),sw=p("<label><input type=checkbox name=enable> Disable <button>?"),lw=p("<label><input type=checkbox name=enable> Filter out <button>?"),ow=p("<li><button>Remove"),cw=p("<p>Loading user data"),dw=p("<h1>Total <!> "),uw=p('<ol class="pg-compare-content grid-column-auto-fill">'),hw=p('<img loading=lazy class=bg inert alt="Background banner">',!0,!1,!1),nc=p("<div class=cp-card-repeat>"),gw=p('<img class=cover loading=lazy alt="Media cover">',!0,!1,!1),fw=p("<br>"),mw=p("<span>"),pw=p('<div class="footer flex-space-between"><span>'),vw=p('<div class=cover-wrapper><div class="header flex-space-between"><div class=score> '),$w=p("<div class=pg-compare-card-content><p class=title></p><ol class=pg-compare-media-users></ol><ul class=flex-bullet-separator>"),_w=p('<li class="pg-compare-media-card inline-container"><div class=wrapper>'),bw=p('<img class=profile alt="Profile picture">'),yw=p("<span class=status>"),rc=p("<li>");const ww=()=>{const e=gf(sessionStorage.getItem(window.location.href),0);return Array(e).fill({id:-1,coverImage:{}})};function kw(){const e=Qt(),[t,n]=Te(),r=ne(),[s,a]=We([]),[l,o]=We({}),[c,h]=O(ww()),u=Q=>{sessionStorage.setItem(window.location.href,Q.length),h(Q)},[f,g]=O([]),[m,y]=O([]),[v,$]=O(!0);q(le(()=>t.user,Q=>{const J=vr(Q);a(Jt([...J],[]))}));const k=()=>t.search||"",C=()=>t.format||"",w=()=>t.reviewsNeeded||f().length,_=()=>t.status||"",A=()=>t.genre||"",S=()=>t.countryOfOrigin||"",b=()=>t.year||"",x=()=>t.private==="true",I=()=>t.notes==="true",E=()=>t.repeat==="true",P=()=>t.missingStart==="true",R=()=>t.missingScore!=="false",B=()=>t.reverse==="true",V=()=>t.sort||"score",X=()=>t.userStatus||"",j=()=>{if(t.isAdult==="true")return!0;if(t.isAdult==="false")return!1};let K;function ae(){if(!window.Worker)return;K=K instanceof Worker?K:new O2;const Q={includeKeys:f(),excludeKeys:m(),search:k(),format:C(),status:_(),genre:A(),reverse:B(),countryOfOrigin:S(),missingStart:P(),missingScore:R(),isAdult:j(),year:+b()||void 0,private:x(),notes:I(),repeat:E(),reviewsNeeded:w(),sort:V(),type:r.type,userStatus:X()};K.postMessage(Q),$(!0),K.onmessage=J=>{if(J.data==="success"){const pe=ze.user();pe.onsuccess=ve=>{const fe=ve.target.result,z=ze.store(fe,"data","readonly").get("compare_list");z.onerror=()=>$(!1),z.onsuccess=je=>{$(!1),u(je.target.result||[])}}}else $(!1),console.error("Error")}}q(ae),document.title=`Compare ${r.type} - LOB`;const re=pn();return i(Gc.Provider,{value:{compareMediaList:c,includeKeys:f,setIncludeKeys:g,setExcludeKeys:y,users:l,storeUsers:o,loading:v},get children(){var Q=Z2(),J=Q.firstChild,pe=J.firstChild,ve=J.nextSibling,fe=ve.firstChild,ee=fe.nextSibling,z=ee.firstChild,je=z.nextSibling,De=ee.nextSibling,Be=De.firstChild,et=Be.nextSibling,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=De.nextSibling,Dt=dt.firstChild,ft=Dt.nextSibling,te=dt.nextSibling,Z=te.firstChild,_e=Z.nextSibling,ke=te.nextSibling,it=ke.firstChild,_t=it.nextSibling,Ie=ke.nextSibling,Ve=Ie.firstChild,st=Ve.nextSibling,Dn=Ie.nextSibling,rr=Dn.nextSibling,ar=rr.firstChild;ar.nextSibling;var ir=rr.nextSibling,Br=ir.firstChild,Rn=ir.nextSibling,Nn=Rn.firstChild,lt=Rn.nextSibling,ln=lt.firstChild,sr=ln.nextSibling,Ur=sr.nextSibling,Ii=Ur.nextSibling,Vr=Ii.nextSibling,lr=Vr.nextSibling,Ei=lr.nextSibling;Ei.nextSibling;var On=lt.nextSibling,Li=On.firstChild,on=Li.nextSibling,Ye=on.nextSibling;return Ye.firstChild,d(Q,i(Sw,{}),J),d(pe,i(H,{each:s,children:ge=>i(Cw,{name:ge})})),fe.$$input=ge=>n({search:ge.target.value||void 0}),d(ve,i(T,{get when(){},get children(){var ge=U2(),cn=ge.firstChild,nn=cn.firstChild,Gr=nn.firstChild;return nn.$$click=()=>re(""),d(nn,i(T,{get when(){return r.list===void 0},children:"> "}),Gr),d(nn,()=>null.data.total,null),d(ge,i(H,{get each(){return null.data.lists},children:Fn=>(()=>{var Hr=Q2(),Bn=Hr.firstChild,St=Bn.firstChild;return Bn.$$click=()=>re(Fn.name),d(Bn,i(T,{get when(){return decodeURI(r.list)===Fn.name},children:"> "}),St),d(Bn,()=>Fn.name,St),d(Bn,()=>Fn.entries.length,null),Hr})()}),null),ge}}),ee),ee.addEventListener("change",ge=>n({format:ge.target.value||void 0})),d(ee,i(T,{get when(){return C()},get children(){return V2()}}),je),De.addEventListener("change",ge=>n({userStatus:ge.target.value||void 0})),d(De,i(T,{get when(){return X()},get children(){return G2()}}),et),d(Pt,i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Watching"}),i(M,{get when(){return r.type==="manga"},children:"Reading"})]}})),d(at,i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatching"}),i(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})),dt.addEventListener("change",ge=>n({status:ge.target.value||void 0})),d(dt,i(T,{get when(){return _()},get children(){return H2()}}),ft),te.addEventListener("change",ge=>n({genre:ge.target.value||void 0})),d(te,i(T,{get when(){return A()},get children(){return j2()}}),_e),ke.addEventListener("change",ge=>n({countryOfOrigin:ge.target.value||void 0})),d(ke,i(T,{get when(){return S()},get children(){return Y2()}}),_t),Ie.addEventListener("change",ge=>n({isAdult:ge.target.value||void 0})),d(Ie,i(T,{get when(){return j()!==void 0},get children(){return q2()}}),st),Dn.$$input=ge=>n({year:ge.target.value||void 0}),ar.addEventListener("change",ge=>n({repeat:ge.target.checked?"true":void 0})),d(rr,i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatched"}),i(M,{get when(){return r.type==="manga"},children:"Reread"})]}}),null),Br.addEventListener("change",ge=>n({missingScore:ge.target.checked?void 0:"false"})),Nn.addEventListener("change",ge=>n({reverse:ge.target.checked?"true":void 0})),lt.addEventListener("change",ge=>n({sort:ge.target.value==="score"?void 0:ge.target.value})),d(lt,i(T,{get when(){return r.type==="manga"},get children(){return z2()}}),ln),d(lt,i(T,{get when(){return r.type==="anime"},get children(){return W2()}}),sr),d(lr,i(W,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatches"}),i(M,{get when(){return r.type==="manga"},children:"Rereads"})]}})),d(lt,i(T,{get when(){return r.type==="manga"},get children(){return K2()}}),null),on.$$input=ge=>n({reviewsNeeded:ge.target.value==f().length?void 0:ge.target.value}),on.$$beforeinput=ge=>{var cn;(cn=ge.data)!=null&&cn.toLowerCase().includes("e")&&ge.preventDefault()},on.addEventListener("blur",ge=>n({reviewsNeeded:Number(ge.target.value)>=f().length?void 0:+ge.target.value||""})),d(Ye,i(Tt,{tipPosition:"bottom",get children(){return["Count of how many users need to have the ",N(()=>r.type)," on their list ",J2()]}}),null),d(ve,i(W,{get children(){return i(M,{get when(){return new URLSearchParams(e.search).keys().some(ge=>ge!=="user")},get children(){var ge=X2();return ge.$$click=()=>{n({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,reviewsNeeded:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0})},ge.style.setProperty("background","var(--crimson-400)"),ge}})}}),null),d(Q,i(Aw,{}),null),L(ge=>{var cn=f().length,nn=f().length+" (All)";return cn!==ge.e&&G(on,"max",ge.e=cn),nn!==ge.t&&G(on,"placeholder",ge.t=nn),ge},{e:void 0,t:void 0}),L(()=>fe.value=k()),L(()=>ee.value=C()||""),L(()=>De.value=X()||""),L(()=>dt.value=_()||""),L(()=>te.value=A()||""),L(()=>ke.value=S()||""),L(()=>Ie.value=j()===void 0?"":String(j())),L(()=>Dn.value=b()),L(()=>ar.checked=E()),L(()=>Br.checked=R()),L(()=>Nn.checked=B()),L(()=>lt.value=V()),L(()=>on.value=w()),Q}})}function Sw(){const[e,t]=O(""),[n,r]=O(0),[s,a]=O(void 0),{accessToken:l}=ce(),[o,{mutate:c}]=ue.anilist.searchUsers(s,1,l),h=mn(a,300),[u,f]=Te();let g;q(le(n,y=>{const v=g==null?void 0:g.querySelectorAll("li")[y],$=g==null?void 0:g.querySelector("ol");if(!v||!$)return;const{height:k,top:C}=$.getBoundingClientRect(),{top:w,bottom:_}=v.getBoundingClientRect(),A=_-C-k;A>0&&($.scrollTop+=A);const S=w-C;S<0&&($.scrollTop+=S)}));function m(y){y=(y==null?void 0:y.trim())||"",y&&f({user:Zg([...vr(u.user).add(y)])}),Oe(()=>{h(void 0),c(void 0),r(0),t("")})}return(()=>{var y=tw(),v=y.firstChild;y.addEventListener("submit",k=>{var C,w,_;k.preventDefault(),m(((_=(w=(C=o())==null?void 0:C.data.users)==null?void 0:w[n()])==null?void 0:_.name)||e())}),y.$$keydown=k=>{var w,_,A;const C=((A=(_=(w=o())==null?void 0:w.data)==null?void 0:_.users)==null?void 0:A.length)||0;C&&(k.key==="ArrowDown"?(k.preventDefault(),r(S=>(S+1)%C)):k.key==="ArrowUp"&&(k.preventDefault(),r(S=>(C+S-1)%C)))};var $=g;return typeof $=="function"?he($,y):g=y,v.$$input=k=>{Oe(()=>{t(k.target.value),r(0),h(k.target.value.trim()||void 0),c(void 0)})},d(y,i(T,{get when(){return e()},get children(){var k=ew();return d(k,i(H,{get each(){var C;return(C=o())==null?void 0:C.data.users},children:(C,w)=>(()=>{var _=nw(),A=_.firstChild;return _.addEventListener("mouseenter",()=>r(w())),_.$$click=()=>m(C.name),d(_,()=>C.name,null),L(S=>{var b=n()===w(),x=C.avatar.large;return b!==S.e&&_.classList.toggle("selected",S.e=b),x!==S.t&&G(A,"src",S.t=x),S},{e:void 0,t:void 0}),_})()})),k}}),null),L(()=>v.value=e()),y})()}function Cw(e){F(e.name,"Name is missing");const t=ne(),{setIncludeKeys:n,setExcludeKeys:r,storeUsers:s}=Ks(),[a,l]=Te(),{accessToken:o}=ce(),[c,h]=oo(()=>!Xl(a.disabled,e.name)),[u,f]=oo(()=>Xl(a.exclude,e.name)),[g]=ue.anilist.mediaListByUserNameFetchOnce(()=>e.name,()=>t.type.toUpperCase(),o);function m(k,C){return c()&&u()===C?[...new Set([...k,g().cacheKey])]:k.filter(w=>w!==g().cacheKey)}function y(){n(k=>k.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),r(k=>k.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),l({user:Ke(a.user).filter(k=>k!==e.name)})}q(()=>{g()&&(s(g().data.user.name,g().data.user),g.indexedDBClosed&&(n(k=>m(k,!1)),r(k=>m(k,!0))))});const v=k=>{h(!k.target.checked),l({disabled:Zl(a.disabled,e.name,!k.target.checked)})},$=k=>{f(!k.target.checked),l({exclude:Zl(a.exclude,e.name,!k.target.checked)})};return(()=>{var k=ow(),C=k.firstChild;return d(k,i(W,{get children(){return[i(M,{get when(){return g.error},get children(){var w=rw(),_=w.firstChild,A=_.nextSibling;return A.nextSibling,d(w,()=>e.name,A),w}}),i(M,{get when(){return g()||g.loading},get children(){return[i(T,{get when(){return g()},get fallback(){return i(Jn,{get children(){return i(Tt,{tipPosition:"right",get children(){return cw()}})}})},get children(){var w=aw();return L(_=>{var A=g().data.user.avatar.large,S=g().data.user.name+" profile picture";return A!==_.e&&G(w,"src",_.e=A),S!==_.t&&G(w,"alt",_.t=S),_},{e:void 0,t:void 0}),w}}),(()=>{var w=iw();return d(w,i(T,{get when(){return g()},get fallback(){return e.name},get children(){return g().data.user.name}})),w})(),(()=>{var w=sw(),_=w.firstChild,A=_.nextSibling,S=A.nextSibling;return S.firstChild,_.addEventListener("change",v),d(S,i(Tt,{tipPosition:"bottom",children:"Disabling a user removes them from search and filtering, just like removing them."}),null),L(()=>_.checked=!c()),w})(),(()=>{var w=lw(),_=w.firstChild,A=_.nextSibling,S=A.nextSibling;return S.firstChild,_.addEventListener("change",$),d(S,i(Tt,{tipPosition:"bottom",get children(){return["Filters out all ",N(()=>t.type)," from user ",N(()=>{var b,x,I;return((I=(x=(b=g())==null?void 0:b.data)==null?void 0:x.user)==null?void 0:I.name)||e.name})]}}),null),L(()=>_.checked=u()),w})()]}})]}}),C),C.$$click=()=>{var w;return y((w=g())==null?void 0:w.cacheKey)},L(w=>{var _=!c(),A=!!u();return _!==w.e&&k.classList.toggle("disabled",w.e=_),A!==w.t&&k.classList.toggle("exclude",w.t=A),w},{e:void 0,t:void 0}),k})()}function Aw(){const{compareMediaList:e,loading:t,includeKeys:n}=Ks(),[r]=Te(),s=ne();return[(()=>{var a=dw(),l=a.firstChild,o=l.nextSibling;return o.nextSibling,d(a,()=>s.type,o),d(a,()=>e().length,null),a})(),(()=>{var a=uw();return d(a,i(Jn,{}),null),d(a,i(T,{get when(){return e()},keyed:!0,get children(){return i(Iw,{})}}),null),L(()=>a.classList.toggle("loading",!!t())),a})(),i(T,{get when(){return e().length===0},get children(){return i(W,{fallback:"No content",get children(){return[i(M,{get when(){return t()},children:"Loading content"}),i(M,{get when(){return!r.user},children:"No users selected"}),i(M,{get when(){return n().length===0},children:"All users are disabled"})]}})}})]}const[xw,Tw]=We([]);function Iw(){const{compareMediaList:e,users:t}=Ks(),n=ne(),r=[];function s(c){r.push(c)}Ln(()=>{r.forEach(c=>o.observe(c))}),He(()=>{o.disconnect()});const a={rootMargin:"500px"},l=c=>{for(const h of c)Tw(h.target.dataset.index,h.isIntersecting)},o=new IntersectionObserver(l,a);return i(H,{get each(){return e()},children:(c,h)=>(()=>{var u=_w(),f=u.firstChild;return he(s,u,()=>!0),d(f,i(T,{get when(){return xw[h()]&&c.id!==-1},get children(){return[i(T,{get when(){return c.bannerImage},get children(){var g=hw();return L(()=>G(g,"src",c.bannerImage)),g}}),(()=>{var g=vw(),m=g.firstChild,y=m.firstChild,v=y.firstChild;return d(m,i(T,{get when(){return c.repeat},get children(){var $=nc();return d($,i(Tt,{tipPosition:"right",get children(){return["Compined ",N(()=>n.type==="anime"?"rewatches":"rereads")," ",N(()=>c.repeat)]}}),null),d($,()=>c.repeat,null),d($,i(di,{}),null),$}}),y),d(y,i(Tt,{tipPosition:"right",children:"Global average score"}),v),d(y,i(Sa,{}),v),d(y,()=>c.averageScore/10||"N/A",null),d(g,i(U,{class:"cover-link",get href(){return Ge(c)},get children(){var $=gw();return L(()=>G($,"src",c.coverImage.large)),$}}),null),d(g,i(T,{get when(){return c.episodes||c.chapters||c.volumes||c.score},get children(){var $=pw(),k=$.firstChild;return d(k,i(W,{get children(){return[i(M,{get when(){return n.type==="anime"},get children(){return i(T,{get when(){return c.episodes},get children(){return["Ep ",N(()=>c.episodes)]}})}}),i(M,{get when(){return n.type==="manga"},get children(){return[i(T,{get when(){return c.chapters},get children(){return["Ch ",N(()=>c.chapters)]}}),fw(),i(T,{get when(){return c.volumes},get children(){return["Vol ",N(()=>c.volumes)]}})]}})]}})),d($,i(T,{get when(){return c.score},get children(){var C=mw();return d(C,()=>Math.round(c.score*100)/100,null),d(C,i(Tt,{tipPosition:"right",children:"Users average score"}),null),C}}),null),$}}),null),L(()=>G(g,"href",Ge(c))),g})(),(()=>{var g=$w(),m=g.firstChild,y=m.nextSibling,v=y.nextSibling;return d(m,()=>c.title.userPreferred),d(y,i(H,{get each(){return c.mediaEntries},children:$=>(()=>{var k=rc();return d(k,i(U,{get href(){return"/user/"+$.name},class:"name",get children(){return[(()=>{var C=bw();return L(()=>G(C,"src",t[$.name].avatar.large)),C})(),N(()=>$.name)]}}),null),d(k,i(T,{get when(){return $.status!=="COMPLETED"},get children(){var C=yw();return d(C,()=>nf($.status,n.type)),C}}),null),d(k,i(T,{get when(){return $.repeat},get children(){var C=nc();return d(C,()=>$.repeat,null),d(C,i(di,{}),null),C}}),null),d(k,i(Tl,{get score(){return $.score},get format(){return t[$.name].mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),k})()})),d(v,i(T,{get when(){var $;return($=Object.entries(Wn.ani.media).find(([,k])=>k.api===c.format))==null?void 0:$[0]},children:$=>(()=>{var k=rc();return d(k,i(W,{get children(){return[i(M,{get when(){return c.countryOfOrigin!=="JP"},get children(){return i(U,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()+"&country="+c.countryOfOrigin},get children(){return[N(()=>Mr(c.format))," (",N(()=>Zs(c.countryOfOrigin)),")"]}})}}),i(M,{get when(){return c.countryOfOrigin==="JP"},get children(){return i(U,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()},get children(){return Mr(c.format)}})}})]}})),k})()}),null),d(v,i(W,{get children(){return[i(M,{get when(){return n.type==="manga"},get children(){return i(W,{get children(){return[i(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return i(U,{get href(){return"/search/manga?year="+c.startDate.year},get children(){return c.startDate.year}})}}),i(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return i(U,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),i(M,{get when(){return n.type==="anime"},get children(){return i(W,{get children(){return[i(M,{get when(){return c.seasonYear&&c.season},get children(){return i(U,{get href(){return"/search/anime/"+c.season.toLowerCase()+"-"+c.seasonYear},get children(){return[N(()=>Je(c.season))," ",N(()=>c.seasonYear)]}})}}),i(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return i(U,{get href(){return"/search/anime?year="+c.startDate.year},get children(){return c.startDate.year}})}}),i(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return i(U,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}}),null),g})()]}})),L(g=>{var m=h(),y=c.coverImage.color;return m!==g.e&&G(u,"data-index",g.e=m),y!==g.t&&((g.t=y)!=null?u.style.setProperty("--color",y):u.style.removeProperty("--color")),g},{e:void 0,t:void 0}),u})()})}$e(["input","click","beforeinput","keydown"]);var Ew=p("<button>Watch trailer"),Lw=p("<iframe frameborder=0 allowfullscreen>"),Pw=p("<dialog class=cp-trailer-dialog><div class=wrapper><form method=dialog class=close><button>Close trailer");function Xu(e){const[t,n]=O(!1);let r;return i(T,{get when(){return e.id},get children(){return[(()=>{var s=Ew();return s.$$click=()=>{r.showModal(),n(!0)},s})(),(()=>{var s=Pw(),a=s.firstChild,l=a.firstChild;s.$$click=c=>c.target===r&&r.close();var o=r;return typeof o=="function"?he(o,s):r=s,s.addEventListener("close",()=>n(!1)),d(a,i(T,{get when(){return t()},get children(){return i(W,{get children(){return i(M,{get when(){return e.site==="youtube"},get children(){var c=Lw();return L(()=>G(c,"src","https://www.youtube-nocookie.com/embed/"+e.id+"?enablejsapi=1&wmode=opaque&autoplay=1")),c}})}})}}),l),s})()]}})}$e(["click"]);var Mw=p("<div data-k-0bff354a class=scores><div data-k-0bff354a><p data-k-0bff354a>Mean</p><span data-k-0bff354a></span></div><div data-k-0bff354a><p data-k-0bff354a>Average</p><span data-k-0bff354a></span></div><p data-k-0bff354a class=anilist-users> Users</p><div data-k-0bff354a><p data-k-0bff354a>MAL</p><span data-k-0bff354a></span></div><p data-k-0bff354a> Users");function Zu(){const{anilistData:e,jikanData:t}=vn();return(()=>{var n=Mw(),r=n.firstChild,s=r.firstChild,a=s.nextSibling,l=r.nextSibling,o=l.firstChild,c=o.nextSibling,h=l.nextSibling,u=h.firstChild,f=h.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling,v=y.firstChild;return d(a,i(T,{get when(){var $,k;return((k=($=e())==null?void 0:$.data)==null?void 0:k.meanScore)>0},fallback:"N/A",get children(){var $,k;return((((k=($=e())==null?void 0:$.data)==null?void 0:k.meanScore)||0)/10).toFixed(1)}})),d(c,i(T,{get when(){var $,k;return((k=($=e())==null?void 0:$.data)==null?void 0:k.averageScore)>0},fallback:"N/A",get children(){var $,k;return((((k=($=e())==null?void 0:$.data)==null?void 0:k.averageScore)||0)/10).toFixed(1)}})),d(h,i(T,{get when(){var $,k,C;return(C=(k=($=e())==null?void 0:$.data)==null?void 0:k.stats.scoreDistribution)==null?void 0:C.reduce((w,_)=>_.amount+w,0)},fallback:"-",get children(){var $,k,C;return fa((C=(k=($=e())==null?void 0:$.data)==null?void 0:k.stats.scoreDistribution)==null?void 0:C.reduce((w,_)=>_.amount+w,0))}}),u),d(m,i(W,{fallback:"N/A",get children(){return[i(M,{get when(){return t.loading},children:"..."}),i(M,{get when(){var $;return(($=t())==null?void 0:$.data.score)>0},get children(){return(t().data.score||0).toFixed(2)}})]}})),d(y,i(T,{get when(){var $,k;return(k=($=t())==null?void 0:$.data)==null?void 0:k.scored_by},fallback:"-",get children(){return fa(t().data.scored_by)}}),v),n})()}var Dw=p('<svg class=svg-external-source xmlns=http://www.w3.org/2000/svg viewBox="4 3 17 17"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7">');function Qu(){return Dw()}var Rw=p('<svg aria-hidden=true class=svg-link focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">');function Nw(){return Rw()}var Ow=p("<li data-k-e748b7cf><a data-k-e748b7cf target=_blank>"),Fw=p("<div data-k-e748b7cf class=external><h2 data-k-e748b7cf>External links</h2><ul data-k-e748b7cf>"),Bw=p('<img data-k-e748b7cf alt="Site favicon.">'),Uw=p("<sup data-k-e748b7cf>"),Vw=p("<li data-k-e748b7cf class=cp-external-link><div data-k-e748b7cf class=icon></div><span data-k-e748b7cf><a data-k-e748b7cf target=_blank>");function eh(e){return i(ct,{fallback:"External links error",get children(){return i(T,{get when(){var t;return e.hastag||((t=e.externalLinks)==null?void 0:t.length)},get children(){var t=Fw(),n=t.firstChild,r=n.nextSibling;return d(r,i(T,{get when(){return e.hashtag},get children(){var s=Ow(),a=s.firstChild;return d(a,()=>e.hashtag),L(()=>G(a,"href",`https://nitter.net/search?q=${e.hashtag.replaceAll("#","%23")}`)),s}}),null),d(r,i(H,{get each(){return e.externalLinks},children:s=>(()=>{var a=Vw(),l=a.firstChild,o=l.nextSibling,c=o.firstChild;return d(l,i(T,{get when(){return s.icon},get fallback(){return i(Nw,{})},get children(){var h=Bw();return L(()=>G(h,"src",s.icon)),h}})),d(c,()=>s.site||s.name),d(o,i(T,{get when(){return s.language},get children(){var h=Uw();return d(h,i(W,{get fallback(){return s.language},get children(){return[i(M,{get when(){return s.language==="Japanese"},children:"JP"}),i(M,{get when(){return s.language==="English"},children:"EN"})]}})),h}}),null),d(o,i(T,{get when(){return s.notes},get children(){return[" (",N(()=>s.notes),")"]}}),null),L(h=>{var u=s.color,f=s.url;return u!==h.e&&((h.e=u)!=null?l.style.setProperty("background",u):l.style.removeProperty("background")),f!==h.t&&G(c,"href",h.t=f),h},{e:void 0,t:void 0}),a})()}),null),t}})}})}var Gw=p("<span class=visually-hidden>Switch to anilist mode"),Hw=p("<div><h2>Studios</h2><ol>"),jw=p("<div><h2>Producers</h2><ol>"),Yw=p("<aside class=left><img alt=Cover><div class=cp-media-api-switcher><a class=active target=_black><span class=visually-hidden>Go to MyAnimeList"),qw=p("<li>Source: "),zw=p("<div class=header><h1></h1><ul class=flex-bullet-separator><li></li><li></li><li></li></ul><ul><li>Members: </li><li>Ranked: #</li><li>Popularity: #"),Ww=p("<div class=pg-media-info-jikan><div class=body>"),ac=p("<li><a target=_black>"),Kw=p("<li>Author<!>: "),Jw=p("<a>"),Xw=p("<div class=pg-media-jikan-desc>"),Zw=p("<div><strong>Background"),Qw=p("<div class=relations><h2>Relations</h2><ol class=grid-column-auto-fill>"),ek=p("<h2>Characters"),ic=p("<div><ol class=grid-column-auto-fill>"),tk=p("<h2>Staff"),nk=p('<p class="name line-clamp">'),rk=p("<p class=type> (<!>)"),ak=p("<li>");function ik(e){const t=ne(),{accessToken:n}=ce(),r=Me(pd,()=>t.type,()=>t.id),s=xn({"only-if-cached":()=>wi()}),[a]=In(s,r),l=Me(gd,n,()=>t.type,()=>t.id),[o,{mutateBoth:c}]=nt(l),[h,u]=O();L(le(o,g=>{var m;u(((m=g==null?void 0:g.data)==null?void 0:m.isFavourite)??!1)}));const f=(g,m)=>{var v,$,k,C;const y=m[($=(v=o())==null?void 0:v.data)==null?void 0:$.type]??null;((C=(k=o())==null?void 0:k.data)==null?void 0:C.id)===y&&(u(g),c(w=>(w.data.isFavourite=g,w)))};return i(ct,{fallback:"Jikan media error",get children(){return i(Js.Provider,{value:{anilistData:o,jikanData:a},get children(){var g=Ww(),m=g.firstChild;return d(g,i(T,{get when(){return a()},get children(){var y=Yw(),v=y.firstChild,$=v.nextSibling,k=$.firstChild;return k.firstChild,d($,i(T,{get when(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get children(){return i(U,{get href(){var C,w,_,A;return"/ani/"+t.type+"/"+((w=(C=o())==null?void 0:C.data)==null?void 0:w.id)+"/"+Kn((A=(_=o())==null?void 0:_.data)==null?void 0:A.title.userPreferred)},get children(){return[Gw(),i(kl,{})]}})}}),k),d(k,i(Sl,{}),null),d(k,i(Qu,{}),null),d(y,i(Zu,{}),null),d(y,i(Fr,{get checked(){return h()},onChange:u,get idType(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.type},get variableId(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get anilistValue(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.favourites},get jikanValue(){var C;return(C=a())==null?void 0:C.data.favorites},mutateCache:f}),null),d(y,i(Xu,{get id(){var C,w;return(w=(C=a())==null?void 0:C.data.trailer)==null?void 0:w.youtube_id},site:"youtube"}),null),d(y,i(T,{get when(){var C,w;return(w=(C=a())==null?void 0:C.data.studios)==null?void 0:w.length},get children(){var C=Hw(),w=C.firstChild,_=w.nextSibling;return d(_,i(H,{get each(){var A;return(A=a())==null?void 0:A.data.studios},children:A=>(()=>{var S=ac(),b=S.firstChild;return d(b,()=>A.name),L(()=>G(b,"href",A.url)),S})()})),C}}),null),d(y,i(T,{get when(){var C,w;return(w=(C=a())==null?void 0:C.data.producers)==null?void 0:w.length},get children(){var C=jw(),w=C.firstChild,_=w.nextSibling;return d(_,i(H,{get each(){var A;return(A=a())==null?void 0:A.data.producers},children:A=>(()=>{var S=ac(),b=S.firstChild;return d(b,()=>A.name),L(()=>G(b,"href",A.url)),S})()})),C}}),null),d(y,i(eh,{get externalLinks(){var C;return(C=a())==null?void 0:C.data.external}}),null),L(C=>{var A;var w=a().data.images.webp.large_image_url,_=(A=a())==null?void 0:A.data.url;return w!==C.e&&G(v,"src",C.e=w),_!==C.t&&G(k,"href",C.t=_),C},{e:void 0,t:void 0}),y}}),m),d(m,i(T,{get when(){return a()},get children(){var y=zw(),v=y.firstChild,$=v.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,_=$.nextSibling,A=_.firstChild;A.firstChild;var S=A.nextSibling;S.firstChild;var b=S.nextSibling;return b.firstChild,d(v,()=>a().data.title),d(k,i(W,{get children(){return[i(M,{get when(){return N(()=>!!a().data.year)()&&a().data.season},get children(){return i(U,{get href(){return"/search/"+t.type+"?year="+a().data.year+"&season="+a().data.season+"&malSearch=true"},get children(){return[N(()=>eo(a().data.season))," ",N(()=>a().data.year)]}})}}),i(M,{get when(){return a().data.season},get children(){return i(U,{get href(){return"/search/"+t.type+"?season="+a().data.season+"&malSearch=true"},get children(){return eo(a().data.season)}})}}),i(M,{get when(){return a().data.year},get children(){return i(U,{get href(){return"/search/"+t.type+"?year="+a().data.year+"&malSearch=true"},get children(){return a().data.year}})}}),i(M,{get when(){var x,I,E,P,R,B;return((E=(I=(x=a().data.aired)==null?void 0:x.prop)==null?void 0:I.from)==null?void 0:E.year)||((B=(R=(P=a().data.published)==null?void 0:P.prop)==null?void 0:R.from)==null?void 0:B.year)},children:x=>i(U,{get href(){return"/search/"+t.type+"?year="+x()+"&malSearch=true"},get children(){return x()}})}),i(M,{get when(){var x,I,E,P,R,B;return((E=(I=(x=a().data.aired)==null?void 0:x.prop)==null?void 0:I.to)==null?void 0:E.year)||((B=(R=(P=a().data.published)==null?void 0:P.prop)==null?void 0:R.to)==null?void 0:B.year)},children:x=>i(U,{get href(){return"/search/"+t.type+"?year="+x()+"&malSearch=true"},get children(){return x()}})}),i(M,{get when(){return a().data.status==Jc},get children(){return i(U,{get href(){return"/search/"+t.type+"/tba"},children:"TBA"})}})]}})),d(C,i(U,{get href(){return"/search/"+t.type+"?format="+a().data.type.toLowerCase()+"&malSearch=true"},get children(){return a().data.type}})),d(w,()=>{var x;return mf((x=a())==null?void 0:x.data.status)}),d(_,i(T,{get when(){var x;return(x=a())==null?void 0:x.data.source},get children(){var x=qw();return x.firstChild,d(x,i(U,{get href(){return"/search/"+t.type+"?source="+a().data.source},get children(){var I;return(I=a())==null?void 0:I.data.source}}),null),x}}),A),d(A,()=>fa(a().data.members||0)||"N/A",null),d(S,()=>a().data.rank||"N/A",null),d(b,()=>a().data.popularity||"N/A",null),d(_,i(T,{get when(){var x;return(x=a().data.authors)==null?void 0:x.length},children:x=>(()=>{var I=Kw(),E=I.firstChild,P=E.nextSibling;return P.nextSibling,d(I,()=>$f(x()),P),d(I,i(H,{get each(){return a().data.authors},children:(R,B)=>[(()=>{var V=Jw();return d(V,()=>R.name),L(()=>G(V,"href",R.url)),V})(),i(T,{get when(){return B()<x()-1},children:" & "})]}),null),I})()}),null),y}}),null),d(m,()=>e.children,null),g}})}})}function sk(){const e=ne(),{jikanData:t}=vn(),n=Me(vd,()=>e.type,()=>e.id),r=xn({"only-if-cached":()=>wi()||t.loading}),[s]=In(r,n),a=Me($d,()=>e.type,()=>e.id),l=xn({"only-if-cached":()=>Vm()||s.loading}),[o]=In(l,a);return[i(T,{get when(){return t()},get children(){return[i(T,{get when(){return t().data.synopsis},get children(){var c=Xw();return d(c,i(li,{get text(){return t().data.synopsis},singleLineBreaks:!0})),c}}),i(T,{get when(){return t().data.background},get children(){var c=Zw();return c.firstChild,d(c,i(li,{get text(){return t().data.background}}),null),c}}),i(T,{get when(){var c;return(c=t().data.relations)==null?void 0:c.length},get children(){var c=Qw(),h=c.firstChild,u=h.nextSibling;return d(u,i(H,{get each(){return t().data.relations},children:f=>i(H,{get each(){return f.entry},children:g=>(()=>{var m=ak();return d(m,i(U,{class:"item",get href(){return cd(g.type,{mal_id:g.mal_id,title:g.name})},get children(){return[(()=>{var y=nk();return d(y,()=>g.name),y})(),(()=>{var y=rk(),v=y.firstChild,$=v.nextSibling;return $.nextSibling,d(y,()=>f.relation,v),d(y,()=>Dr(g.type),$),y})()]}})),m})()})})),c}}),i(T,{get when(){return s()},get children(){var c=ic(),h=c.firstChild;return d(c,i(U,{href:"characters",get children(){return ek()}}),h),d(h,i(H,{get each(){return s().data.slice(0,6)},children:({voice_actors:u,...f})=>i(Tu,Fe({get voiceActor(){return Qg(u,({language:g})=>g===Kc)}},f))})),c}}),i(T,{get when(){return o()},get children(){var c=ic(),h=c.firstChild;return d(c,i(U,{href:"staff",get children(){return tk()}}),h),d(h,i(H,{get each(){return o().data.slice(0,6)},children:({person:u,positions:f})=>i(wl,{staff:u,positions:f})})),c}}),N(()=>console.log("jikan",t()))]}}),N(()=>console.log("characters",s()))]}let Bs,Us;function lk({target:e}){const t=e.querySelector("[data-tooltip-positions]");t&&(Bs=t,ui(t))}function th(){Us&&ui(Us),Bs&&ui(Bs)}let os;function nh({target:e}){if(e===os||!e)return;os=e;const t=e.matches("[data-tooltip-trigger]")?e:e.closest("[data-tooltip-trigger]");if(!t)return;const n=t.querySelector("[data-tooltip-positions]");let r=0;s();function s(){t.matches(":hover")?(Us=n,ui(n)):(r++<500||os!==e)&&requestAnimationFrame(s)}}function ui(e){const t=e.dataset.tooltipPositions.split(" "),n=e.closest("[data-tooltip-wrapper]"),r=n==null?void 0:n.getBoundingClientRect(),s=document.body.getBoundingClientRect(),a=e.classList.value;for(const l of t){e.classList.remove(...t),e.classList.add(l);let o=e.getBoundingClientRect();if(!(r&&(o.left<r.left||o.right>r.right||o.top<r.top||o.bottom>r.bottom))&&!(o.left<0||o.right>s.width||o.top<0||o.bottom>s.height))return}e.classList=a}window.addEventListener("focusin",lk);window.addEventListener("pointermove",nh);window.addEventListener("pointerdown",nh);window.addEventListener("scroll",th,{passive:!0});window.addEventListener("resize",th,{passive:!0});var ok=p("<select>"),ck=p("<div><ol>"),dk=p("<option>");function uk(){const e=ne(),{jikanData:t}=vn(),n=Me(vd,()=>e.type,()=>e.id),r=xn({"only-if-cached":()=>wi()||t.loading}),[s]=In(r,n),[a,l]=Fd(Kc),o=N(()=>{var f;const c=new Set,h=(f=s())==null?void 0:f.data;if(!(h!=null&&h.length))return[];h.forEach(g=>{var m;(m=g.voice_actors)==null||m.forEach(y=>c.add(y.language))});const u=[...c].sort();return l(g=>c.has(g)?g:u[0]),u});return i(ct,{fallback:"MAL characters error",get children(){return i(T,{get when(){return t()},get children(){return i(T,{get when(){return s()},get children(){var c=ck(),h=c.firstChild;return d(c,i(T,{get when(){return o().length},get children(){var u=ok();return u.addEventListener("change",f=>l(f.target.value)),d(u,i(H,{get each(){return o()},children:f=>(()=>{var g=dk();return g.value=f,d(g,f),g})()})),L(()=>u.value=a()),u}}),h),d(h,i(H,{get each(){return s().data},children:({voice_actors:u,...f})=>i(Tu,Fe({get voiceActor(){return u==null?void 0:u.find(g=>g.language===a())},get language(){return a()}},f))})),L(()=>h.className=`grid-column-auto-fill ${e.type||""}`),c}})}})}})}var hk=p("<div><ol class=grid-column-auto-fill>");function gk(){const e=ne(),{jikanData:t}=vn(),n=Me($d,ya,()=>e.id),r=xn({"only-if-cached":()=>wi()||t.loading}),[s]=In(r,n);return i(ct,{fallback:"MAL staff page error",get children(){return i(T,{get when(){return t()},get children(){return i(T,{get when(){return s()},get children(){var a=hk(),l=a.firstChild;return d(l,i(H,{get each(){return s().data},children:({person:o,positions:c})=>i(wl,{staff:o,positions:c})})),a}})}})}})}var sc=p('<ol data-k-eb389524 class="grid-column-auto-fill card">'),fk=p("<ol data-k-eb389524 class=grid-column-auto-fill>"),mk=p('<div data-k-eb389524 class="page-normal pg-jikan-character"><div data-k-eb389524 class=header><img data-k-eb389524 alt="Character profile."><div data-k-eb389524 class=grid><div data-k-eb389524><h1 data-k-eb389524></h1><p data-k-eb389524></p></div></div><div data-k-eb389524>'),pk=p("<details data-k-eb389524 open><summary data-k-eb389524><h2 data-k-eb389524>");function vk(){const e=ne(),t=Me(Df,()=>e.id),[n]=nt(t);return L(()=>{var s,a;const r=(a=(s=n())==null?void 0:s.data)==null?void 0:a.name;r&&(document.title=r)}),i(ct,{fallback:"Jikan character error",get children(){return i(T,{get when(){return n()},get children(){var r=mk(),s=r.firstChild,a=s.firstChild,l=a.nextSibling,o=l.firstChild,c=o.firstChild,h=c.nextSibling,u=l.nextSibling;return d(c,()=>n().data.name),d(h,()=>Jg(n().data.name_kanji,n().data.nicknames).join(", ")),d(l,i(Fr,{get jikanValue(){return n().data.favorites}}),null),d(u,i(li,{get text(){return n().data.about},singleLineBreaks:!0})),d(r,i(cs,{title:"Anime",get children(){var f=sc();return d(f,i(H,{get each(){return n().data.anime},children:g=>i(Ps,{type:"anime",get media(){return g.anime}})})),f}}),null),d(r,i(cs,{title:"Manga",get children(){var f=sc();return d(f,i(H,{get each(){return n().data.manga},children:g=>i(Ps,{type:"manga",get media(){return g.manga}})})),f}}),null),d(r,i(cs,{title:"Voice actors",get children(){var f=fk();return d(f,i(H,{get each(){return n().data.voices},children:g=>i(wl,{get staff(){return g.person},get positions(){return[g.language]}})})),f}}),null),L(()=>G(a,"src",n().data.images.webp.image_url)),r}})}})}function cs(e){return(()=>{var t=pk(),n=t.firstChild,r=n.firstChild;return d(r,()=>e.title),d(t,()=>e.children,null),t})()}var $k=p("<div data-k-47610970><h3 data-k-47610970>Activity</h3><div data-k-47610970 class=activity-history-container><ol data-k-47610970 class=activity-history-header-list></ol><ol data-k-47610970 class=activity-history-list>"),_k=p("<li data-k-47610970 class=activity-history-header>"),bk=p("<li data-k-47610970 class=activity-item>"),yk=p("<p data-k-47610970>"),wk=p("<p data-k-47610970>Amount: ");function kk(e){const t=Sk()/1e3,n=N(()=>{var h,u,f;const a=new Date/1e3,l=[];(h=e.history)==null||h.forEach((g,m,y)=>{var $;const v=g.date-ff(($=y[m-1])==null?void 0:$.date,t-cr);if(!(g.date<t||g.date>a+cr)){for(let k=Math.floor(v/cr)-1;k>0;k--)l.push({date:g.date-cr*k});l.push(g)}});const o=(f=(u=e.history)==null?void 0:u.at(-1))==null?void 0:f.date,c=Math.floor((a-o)/cr);for(let g=1;g<c;g++)l.push({date:o+cr*g});return l}),r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return i(T,{get when(){return e.history.at(-1).date>t},get children(){var a=$k(),l=a.firstChild,o=l.nextSibling,c=o.firstChild,h=c.nextSibling;return d(c,i(H,{each:r,children:(u,f)=>(()=>{var g=_k();return d(g,()=>ef(r,f()+rh)),g})()})),d(h,i(H,{get each(){return n()},children:u=>(()=>{var f=bk();return d(f,i(s,{get date(){return u.date*1e3},get amount(){return u.amount}})),L(()=>G(f,"data-level",u.level)),f})()})),a}});function s(a){const l=o=>{if(o<(t+5184e3)*1e3)return"right";if(o>(t+10368e3)*1e3)return"left"};return i(Tt,{get tipPosition(){return l(a.date)},get children(){return[(()=>{var o=yk();return d(o,()=>sd(a.date)),o})(),(()=>{var o=wk();return o.firstChild,d(o,()=>a.amount||0,null),o})()]}})}}const rh=1,Sk=()=>{const[e]=new Date().toISOString().split("T"),t=new Date(`${e}T00:00`);return t.setDate(t.getDate()-182),t.setDate(t.getDate()-t.getDay()+rh),t.getTime()};var Ck=p("<p>"),Ak=p("<p> (fancy)"),xk=p("<p> (extra fancy)"),Tk=p("<div class=user-favourites><h3>Favourite animes</h3><ol class=grid-reel-auto-fill>"),Ik=p("<div class=user-favourites><h3>Favourite manga</h3><ol class=grid-reel-auto-fill>"),Ek=p("<div class=user-favourites><h3>Favourite characters</h3><ol class=grid-reel-auto-fill>"),Lk=p("<div class=user-favourites><h3>Favourite staff</h3><ol class=grid-reel-auto-fill>"),Pk=p("<div class=user-favourites-studio><h3>Favourite studio</h3><ol>"),Mk=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total anime</p></div><div class=profile-progress-item><p class=header></p><p>Days watched</p></div><div class=profile-progress-item><p class=header></p><p>Episodes watched</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),Dk=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total manga</p></div><div class=profile-progress-item><p class=header></p><p>Chapters read</p></div><div class=profile-progress-item><p class=header></p><p>Volumes read</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),Rk=p("<div class=user-profile-overview-body><div class=user-info-container></div><div class=user-activity-container><div class=user-profile-progress></div><div class=user-profile-genres></div><div class=user-profile-activity>"),Ga=p("<img alt=Cover>"),mr=p("<li class=item>"),Nk=p("<div class=user-genres-overview><h3></h3><ol>"),Ok=p("<span>%");function Fk(){const{user:e}=tt(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.activityByUserId(()=>e().id||void 0,t);return(()=>{var s=Rk(),a=s.firstChild,l=a.nextSibling,o=l.firstChild,c=o.nextSibling,h=c.nextSibling;return d(a,i(W,{get children(){return[i(M,{get when(){return e().donatorTier===1},get children(){var u=Ck();return d(u,()=>e().donatorBadge),u}}),i(M,{get when(){return e().donatorTier===2},get children(){var u=Ak(),f=u.firstChild;return d(u,()=>e().donatorBadge,f),u}}),i(M,{get when(){return e().donatorTier===3},get children(){var u=xk(),f=u.firstChild;return d(u,()=>e().donatorBadge,f),u}})]}}),null),d(a,i(kk,{get history(){var u;return((u=e().stats)==null?void 0:u.activityHistory)||[]}}),null),d(a,i(T,{get when(){return e().favourites.anime.edges.length},get children(){var u=Tk(),f=u.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.anime.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return Ge(m.node)},get children(){var v=Ga();return L(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),u}}),null),d(a,i(T,{get when(){return e().favourites.manga.edges.length},get children(){var u=Ik(),f=u.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.manga.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return Ge(m.node)},get children(){var v=Ga();return L(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),u}}),null),d(a,i(T,{get when(){return e().favourites.characters.edges.length},get children(){var u=Ek(),f=u.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.characters.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/character/"+m.node.id+"/"+Xe(m.node.name.userPreferred)},get children(){var v=Ga();return L(()=>G(v,"src",m.node.image.large)),v}})),y})()})),u}}),null),d(a,i(T,{get when(){return e().favourites.staff.edges.length},get children(){var u=Lk(),f=u.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.staff.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/staff/"+m.node.id+"/"+Xe(m.node.name.userPreferred)},get children(){var v=Ga();return L(()=>G(v,"src",m.node.image.large)),v}})),y})()})),u}}),null),d(a,i(T,{get when(){return e().favourites.studios.edges.length},get children(){var u=Pk(),f=u.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.studios.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/studio/"+m.node.id+"/"+Xe(m.node.name)},get children(){return m.node.name}})),y})()})),u}}),null),d(o,i(T,{get when(){return e().statistics.anime.count},get children(){var u=Mk(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,k=v.nextSibling,C=k.firstChild;return d(g,()=>ye(e().statistics.anime.count)),d(y,()=>(e().statistics.anime.minutesWatched/60/24).toFixed(1)),d($,()=>ye(e().statistics.anime.episodesWatched)),d(C,()=>e().statistics.anime.meanScore),u}}),null),d(o,i(T,{get when(){return e().statistics.manga.count},get children(){var u=Dk(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,k=v.nextSibling,C=k.firstChild;return d(g,()=>ye(e().statistics.manga.count)),d(y,()=>ye(e().statistics.manga.chaptersRead)),d($,()=>ye(e().statistics.manga.volumesRead)),d(C,()=>e().statistics.manga.meanScore),u}}),null),d(c,i(lc,{title:"Anime genre overview",type:"anime",get genres(){return e().statistics.anime.genrePreview},get total(){return e().statistics.anime.count}}),null),d(c,i(lc,{title:"Manga genre overview",type:"manga",get genres(){return e().statistics.manga.genrePreview},get total(){return e().statistics.manga.count}}),null),d(h,i(H,{get each(){var u;return(u=n())==null?void 0:u.data.data.Page.activities},children:u=>i(_l,{activity:u,mutateCache:r,hideProfile:!0,small:!0})})),s})()}function lc(e){F(e.genres,"Genres missing"),F(e.title,"Title missing");const{user:t}=tt();return i(T,{get when(){return e.total},get children(){var n=Nk(),r=n.firstChild,s=r.nextSibling;return d(r,()=>e.title),d(s,i(H,{get each(){return e.genres},children:a=>(()=>{var l=mr();return d(l,i(U,{get href(){return"/user/"+t().name+"/"+e.type+"?genre="+a.genre},get children(){return[N(()=>a.genre)," ",(()=>{var o=Ok(),c=o.firstChild;return d(o,()=>Math.round(a.count/e.total*100),c),o})()]}})),l})()})),n}})}function Bk(e){return new Worker("/legendary-octo-barnacle/branches/rework-change-fetching-and-caching/assets/user-media-list-O67hlifX.js",{name:e==null?void 0:e.name})}var Uk=p("<button data-k-cd7ed032>+");function ds(e){const[t,n]=O(e.entry[e.progressKey]),{triggerProgressIncrease:r,isOwnProfile:s}=Ws();return q(le(()=>e.entry,a=>n(a[e.progressKey]),{defer:!0})),[N(()=>e.label)," ",N(t),i(T,{get when(){return t()<e.entry.media[e.maxProgressKey]},get children(){return["/",N(()=>e.entry.media[e.maxProgressKey])]}}),i(T,{get when(){return s()},get children(){return i(T,{get when(){return e.entry.media[e.maxProgressKey]===null||t()<e.entry.media[e.maxProgressKey]},get children(){var a=Uk();return a.$$click=l=>{l.preventDefault(),n(o=>{const c=Math.min(e.entry.media[e.maxProgressKey]||o+1,o+1);return r(e.entry.media.id,c,e.progressKey),c})},a}})}})]}$e(["click"]);var Vk=p("<br>"),Gk=p("<p>");function Hk(e){return(()=>{var t=Gk();return d(t,i(W,{get children(){return[i(M,{get when(){return e.entry.media.type==="ANIME"},get children(){return i(ds,Fe(e,{label:"Ep",progressKey:"progress",maxProgressKey:"episodes"}))}}),i(M,{get when(){return e.entry.media.type==="MANGA"},get children(){return[i(ds,Fe(e,{label:"Ch",progressKey:"progress",maxProgressKey:"chapters"})),Vk(),i(ds,Fe(e,{label:"Vol",progressKey:"progressVolumes",maxProgressKey:"volumes"}))]}})]}})),t})()}var jk=p("<div data-k-406f27d4>"),ah=p("<h2 data-k-406f27d4>"),ih=p("<ol data-k-406f27d4 class=user-profile-media-list-grid>"),Yk=p('<div data-k-406f27d4 class="badge repeat">'),qk=p('<div data-k-406f27d4 class="badge notes"><svg data-k-406f27d4 aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path data-k-406f27d4 fill=currentColor d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z">'),zk=p("<p data-k-406f27d4 class=adult-warning>18+"),Wk=p("<div data-k-406f27d4 class=container><img data-k-406f27d4 class=cover alt=Cover.><div data-k-406f27d4 class=card-header></div><div data-k-406f27d4 class=card-footer><p data-k-406f27d4></p><div data-k-406f27d4 class=scores>"),sh=p("<li data-k-406f27d4 class=card>");function Kk(e){const[t,n]=We({}),r=ne(),{user:s}=tt(),{openEditor:a}=zs(),{isOwnProfile:l}=Ws(),o=h=>{for(const u of h)n(u.target.dataset.list,u.target.dataset.index,u.isIntersecting)},c=new IntersectionObserver(o,{rootMargin:"500px"});return He(()=>{c.disconnect()}),q(()=>{var h,u;(h=e.listData())!=null&&h.data&&(lh[r.name]=(u=e.listData())==null?void 0:u.data.lists.map(f=>({name:f.name,entries:new Int8Array(f.entries.length)})))}),(()=>{var h=jk();return d(h,i(T,{get when(){var u;return(u=e.listData())==null?void 0:u.data},get fallback(){return i(Jk,{})},get children(){return i(H,{get each(){return e.listData().data.lists},children:u=>(n(u.name,{}),i(T,{get when(){return N(()=>!!u.entries.length)()&&(!r.list||decodeURIComponent(r.list)===u.name)},get children(){return[(()=>{var f=ah();return d(f,()=>u.name),f})(),(()=>{var f=ih();return d(f,i(H,{get each(){return u.entries},children:(g,m)=>{let y;return Ln(()=>c.observe(y)),He(()=>c.unobserve(y)),(()=>{var v=sh(),$=y;return typeof $=="function"?he($,v):y=v,d(v,i(T,{get when(){return t[u.name][m()]},get children(){return i(U,{class:"clean-link",get href(){return Ge(g.media)},get children(){var k=Wk(),C=k.firstChild,w=C.nextSibling,_=w.nextSibling,A=_.firstChild,S=A.nextSibling;return d(w,i(T,{get when(){return g.repeat},get children(){var b=Yk();return d(b,()=>g.repeat,null),d(b,i(di,{}),null),L(()=>G(b,"label","Rewatched "+g.repeat+" times")),b}}),null),d(w,i(T,{get when(){return g.notes},get children(){var b=qk();return L(()=>G(b,"label",g.notes)),b}}),null),d(_,i(T,{get when(){return g.media.isAdult},get children(){return zk()}}),A),d(A,()=>g.media.title.userPreferred),d(S,i(Hk,{entry:g}),null),d(S,i(Tl,{get score(){return g.score},get format(){return s().mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),d(k,i(T,{get when(){return l()},get children(){return i(bu,{big:!0,label:"Edit media",onClick:b=>{b.preventDefault(),a({...g.media,mediaListEntry:g},{mutateMedia:x=>{x=vi(g,x),e.mutateMediaListCache(I=>{function E(P,R){const B=I.data.lists.findIndex(X=>X.name===P&&X.isCustomList===R);B===-1&&I.data.lists.push({name:P,isCustomList:!1,isCompletedList:!1,entries:[]});const V=I.data.lists.at(B);V.entries.push(x),e.listData().data.indecies[g.media.id].push([B===-1?I.data.lists.length-1:B,V.entries.length-1])}if(e.listData().data.indecies[g.media.id].forEach(([P,R])=>{I.data.lists[P].entries.splice(R,1)}),e.listData().data.indecies[g.media.id]=[],!x.hiddenFromStatusLists){const P=ch(x.status,r.type);E(P,!1)}for(const[P,R]of Object.entries(x.customLists??{}))R&&E(P,!0);return I},e.updateListInfo)},deleteMedia:()=>{e.mutateMediaListCache(x=>(e.listData().data.indecies[g.media.id].forEach(([I,E])=>{x.data.lists[I].entries.splice(E,1)}),x),e.updateListInfo)}})},get children(){return i(_u,{})}})}}),null),L(()=>G(C,"src",g.media.coverImage.large)),k}})}})),L(k=>{var C=m(),w=u.name;return C!==k.e&&G(v,"data-index",k.e=C),w!==k.t&&G(v,"data-list",k.t=w),k},{e:void 0,t:void 0}),v})()}})),f})()]}}))})}})),h})()}const lh={};function Jk(){const e=ne(),t=N(()=>lh[e.name]??[]);return i(H,{get each(){return t()},children:n=>i(T,{get when(){return N(()=>!!n.entries.length)()&&(!e.list||decodeURIComponent(e.list)===n.name)},get children(){return[(()=>{var r=ah();return d(r,()=>n.name),r})(),(()=>{var r=ih();return d(r,i(H,{get each(){return n.entries},children:()=>sh()})),r})()]}})})}var Xk=p("<ol><li><button>All "),Zk=p("<li><button> ");function Qk(e){const t=oh(),n=ne();return i(T,{get when(){var r;return(r=e.listData())==null?void 0:r.data},get children(){var r=Xk(),s=r.firstChild,a=s.firstChild,l=a.firstChild;return a.$$click=()=>t(""),d(a,i(T,{get when(){return n.list===void 0},children:"> "}),l),d(a,()=>e.listData().data.total,null),d(r,i(H,{get each(){return e.listData().data.lists},children:o=>(()=>{var c=Zk(),h=c.firstChild,u=h.firstChild;return h.$$click=()=>t(encodeURIComponent(o.name)),d(h,i(T,{get when(){return decodeURIComponent(n.list)===o.name},children:"> "}),u),d(h,()=>o.name,u),d(h,()=>o.entries.length,null),c})()}),null),r}})}$e(["click"]);var eS=p("<option data-k-4ded799d value>All formats"),tS=p("<option data-k-4ded799d value>Any User Status"),nS=p("<option data-k-4ded799d value>Any Status"),rS=p("<option data-k-4ded799d value>All genres"),aS=p("<option data-k-4ded799d value>All countries"),iS=p("<option data-k-4ded799d value>All ratings"),sS=p("<option data-k-4ded799d value>All studios"),lS=p("<select data-k-4ded799d name=studio><option data-k-4ded799d value hidden>Studio"),oS=p("<option data-k-4ded799d value>All tags"),cS=p("<label data-k-4ded799d for=private><input data-k-4ded799d type=checkbox name=private id=private> Private"),dS=p("<button data-k-4ded799d>Compare with your list"),uS=p("<button data-k-4ded799d>Open in compare page"),hS=p('<div data-k-4ded799d class=user-profile-media-list-search><input data-k-4ded799d type=text placeholder=Search><select data-k-4ded799d name=format><option data-k-4ded799d value hidden>Format</option><option data-k-4ded799d value=MOVIE>Movie</option><option data-k-4ded799d value=MUSIC>Music</option><option data-k-4ded799d value=ONA>Ona</option><option data-k-4ded799d value=OVA>Ova</option><option data-k-4ded799d value=SPECIAL>Special</option><option data-k-4ded799d value=TV>TV</option><option data-k-4ded799d value=TV_SHORT>TV short</option></select><select data-k-4ded799d name=userStatus><option data-k-4ded799d value hidden>User Status</option><option data-k-4ded799d value=COMPLETED>Completed</option><option data-k-4ded799d value=CURRENT></option><option data-k-4ded799d value=DROPPED>Dropped</option><option data-k-4ded799d value=PAUSED>Paused</option><option data-k-4ded799d value=PLANNING>Planning</option><option data-k-4ded799d value=REPEATING></option></select><select data-k-4ded799d name=status><option data-k-4ded799d value hidden>Status</option><option data-k-4ded799d value=RELEASING>Releasing</option><option data-k-4ded799d value=FINISHED>Finished</option><option data-k-4ded799d value=NOT_YET_RELEASED>Not Yet Released</option><option data-k-4ded799d value=CANCELLED>Cancelled</option></select><select data-k-4ded799d name=genre><option data-k-4ded799d value hidden>Genre</option><option data-k-4ded799d value=Action>Action</option><option data-k-4ded799d value=Adventure>Adventure</option><option data-k-4ded799d value=Comedy>Comedy</option><option data-k-4ded799d value=Drama>Drama</option><option data-k-4ded799d value=Ecchi>Ecchi</option><option data-k-4ded799d value=Fantasy>Fantasy</option><option data-k-4ded799d value=Hentai>Hentai</option><option data-k-4ded799d value=Horror>Horror</option><option data-k-4ded799d value="Mahou Shoujo">Mahou Shoujo</option><option data-k-4ded799d value=Mecha>Mecha</option><option data-k-4ded799d value=Music>Music</option><option data-k-4ded799d value=Mystery>Mystery</option><option data-k-4ded799d value=Psychological>Psychological</option><option data-k-4ded799d value=Romance>Romance</option><option data-k-4ded799d value=Sci-Fi>Sci-Fi</option><option data-k-4ded799d value="Slice of Life">Slice of Life</option><option data-k-4ded799d value=Sports>Sports</option><option data-k-4ded799d value=Supernatural>Supernatural</option><option data-k-4ded799d value=Thriller>Thriller</option></select><select data-k-4ded799d name=countryOfOrigin><option data-k-4ded799d value hidden>Country</option><option data-k-4ded799d value=CN>China</option><option data-k-4ded799d value=JP>Japan</option><option data-k-4ded799d value=KR>South Korea</option><option data-k-4ded799d value=TW>Taiwan</option></select><select data-k-4ded799d name=isAdult><option data-k-4ded799d value hidden>Age rating</option><option data-k-4ded799d value=false>R-17+</option><option data-k-4ded799d value=true>R-18</option></select><select data-k-4ded799d name=tag><option data-k-4ded799d value hidden>Tag</option></select><input data-k-4ded799d type=number placeholder="Release year"max=9999 min=0><label data-k-4ded799d for=notes><input data-k-4ded799d type=checkbox name=notes id=notes> Notes</label><label data-k-4ded799d for=repeat><input data-k-4ded799d type=checkbox name=repeat id=repeat> </label><label data-k-4ded799d for=missingStart><input data-k-4ded799d type=checkbox name=missingStart id=missingStart> Missing start date</label><label data-k-4ded799d for=missingScore><input data-k-4ded799d type=checkbox name=missingScore id=missingScore> Missing score</label><label data-k-4ded799d for=reverse><input data-k-4ded799d type=checkbox name=reverse id=reverse> Reverse order</label><select data-k-4ded799d name=sort><option data-k-4ded799d value=score>Score</option><option data-k-4ded799d value=title>Title</option><option data-k-4ded799d value=progress>Progress</option><option data-k-4ded799d value=updatedAt>Last Updated</option><option data-k-4ded799d value=startedAt>Start Date</option><option data-k-4ded799d value=completedAt>Completed Date</option><option data-k-4ded799d value=releaseDate>Release Date</option><option data-k-4ded799d value=averageScore>Average Score</option><option data-k-4ded799d value=popularity>Popularity</option><option data-k-4ded799d value=repeat>'),oc=p("<option data-k-4ded799d>"),gS=p("<button data-k-4ded799d>Remove filters"),fS=p("<button data-k-4ded799d>Back to home");function mS(e){const t=oh(),n=Qt(),{authUserData:r}=ce(),{isOwnProfile:s}=Ws(),{user:a}=tt(),l=ne();return(()=>{var c=hS(),h=c.firstChild,u=h.nextSibling,f=u.firstChild,g=f.nextSibling,m=u.nextSibling,y=m.firstChild,v=y.nextSibling,$=v.nextSibling,k=$.nextSibling,C=k.nextSibling,w=C.nextSibling,_=w.nextSibling,A=m.nextSibling,S=A.firstChild,b=S.nextSibling,x=A.nextSibling,I=x.firstChild,E=I.nextSibling,P=x.nextSibling,R=P.firstChild,B=R.nextSibling,V=P.nextSibling,X=V.firstChild,j=X.nextSibling,K=V.nextSibling;K.firstChild;var ae=K.nextSibling,re=ae.nextSibling,Q=re.firstChild,J=re.nextSibling,pe=J.firstChild;pe.nextSibling;var ve=J.nextSibling,fe=ve.firstChild,ee=ve.nextSibling,z=ee.firstChild,je=ee.nextSibling,De=je.firstChild,Be=je.nextSibling,et=Be.firstChild,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=at.nextSibling,Dt=dt.nextSibling,ft=Dt.nextSibling,te=ft.nextSibling;return h.$$input=Z=>e.setSearchParams({search:Z.target.value||void 0}),d(c,i(Qk,{get listData(){return e.listData}}),u),u.addEventListener("change",Z=>e.setSearchParams({format:Z.target.value||void 0})),d(u,i(T,{get when(){return e.format()},get children(){return eS()}}),g),m.addEventListener("change",Z=>e.setSearchParams({userStatus:Z.target.value||void 0})),d(m,i(T,{get when(){return e.userStatus()},get children(){return tS()}}),v),d($,i(W,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Watching"}),i(M,{get when(){return l.type==="manga"},children:"Reading"})]}})),d(_,i(W,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatching"}),i(M,{get when(){return l.type==="manga"},children:"Rereading"})]}})),A.addEventListener("change",Z=>e.setSearchParams({status:Z.target.value||void 0})),d(A,i(T,{get when(){return e.status()},get children(){return nS()}}),b),x.addEventListener("change",Z=>e.setSearchParams({genre:Z.target.value||void 0})),d(x,i(T,{get when(){return e.genre()},get children(){return rS()}}),E),P.addEventListener("change",Z=>e.setSearchParams({countryOfOrigin:Z.target.value||void 0})),d(P,i(T,{get when(){return e.countryOfOrigin()},get children(){return aS()}}),B),V.addEventListener("change",Z=>e.setSearchParams({isAdult:Z.target.value||void 0})),d(V,i(T,{get when(){return e.isAdult()!==void 0},get children(){return iS()}}),j),d(c,i(T,{get when(){return l.type==="anime"},get children(){var Z=lS();return Z.firstChild,Z.addEventListener("change",_e=>e.setSearchParams({studio:_e.target.value||void 0})),d(Z,i(T,{get when(){return e.studio()},get children(){return sS()}}),null),d(Z,i(H,{get each(){var _e,ke;return(ke=(_e=e.listData())==null?void 0:_e.data)==null?void 0:ke.studios},children:_e=>(()=>{var ke=oc();return ke.value=_e,d(ke,_e),L(()=>ke.selected=_e==e.studio()),ke})()}),null),L(()=>Z.value=e.studio()),Z}}),K),K.addEventListener("change",Z=>e.setSearchParams({tag:Z.target.value||void 0})),d(K,i(T,{get when(){return e.tag()},get children(){return oS()}}),null),d(K,i(H,{get each(){var Z,_e;return(_e=(Z=e.listData())==null?void 0:Z.data)==null?void 0:_e.tags},children:Z=>(()=>{var _e=oc();return _e.value=Z,d(_e,Z),L(()=>_e.selected=Z==e.tag()),_e})()}),null),ae.$$input=Z=>e.setSearchParams({year:Z.target.value||void 0}),d(c,i(T,{get when(){return s()},get children(){var Z=cS(),_e=Z.firstChild;return _e.addEventListener("change",ke=>e.setSearchParams({private:ke.target.checked?"true":void 0})),L(()=>_e.checked=e.privateFilter()),Z}}),re),Q.addEventListener("change",Z=>e.setSearchParams({notes:Z.target.checked?"true":void 0})),pe.addEventListener("change",Z=>e.setSearchParams({repeat:Z.target.checked?"true":void 0})),d(J,i(W,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatched"}),i(M,{get when(){return l.type==="manga"},children:"Reread"})]}}),null),fe.addEventListener("change",Z=>e.setSearchParams({missingStart:Z.target.checked?"true":void 0})),z.addEventListener("change",Z=>e.setSearchParams({missingScore:Z.target.checked?"true":void 0})),De.addEventListener("change",Z=>e.setSearchParams({reverse:Z.target.checked?"true":void 0})),Be.addEventListener("change",Z=>e.setSearchParams({sort:Z.target.value==="score"?void 0:Z.target.value})),d(te,i(W,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatches"}),i(M,{get when(){return l.type==="manga"},children:"Rereads"})]}})),d(c,i(W,{get children(){return[i(M,{get when(){var Z,_e;return N(()=>!s())()&&((_e=(Z=r())==null?void 0:Z.data)==null?void 0:_e.name)},get children(){return i(U,{get href(){return"/compare/"+l.type+"?user="+a().name+"&user="+r().data.name},get children(){return dS()}})}}),i(M,{when:!0,get children(){return i(U,{get href(){return"/compare/"+l.type+"?user="+a().name},get children(){return uS()}})}})]}}),null),d(c,i(o,{}),null),L(()=>h.value=e.search()),L(()=>u.value=e.format()||""),L(()=>m.value=e.userStatus()||""),L(()=>A.value=e.status()||""),L(()=>x.value=e.genre()),L(()=>P.value=e.countryOfOrigin()||""),L(()=>V.value=e.isAdult()===void 0?"":String(e.isAdult())),L(()=>K.value=e.tag()),L(()=>ae.value=e.year()),L(()=>Q.checked=e.notesFilter()),L(()=>pe.checked=e.rewatchedFilter()),L(()=>fe.checked=e.missingStartFilter()),L(()=>z.checked=e.missingScoreFilter()),L(()=>De.checked=e.reverse()),L(()=>Be.value=e.sort()),c})();function o(){return i(W,{get children(){return[i(M,{get when(){return n.search},get children(){var c=gS();return c.$$click=()=>{e.setSearchParams({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0,studio:void 0,tag:void 0})},c.style.setProperty("background","skyblue"),c}}),i(M,{get when(){return l.list},get children(){var c=fS();return c.$$click=()=>{t("")},c.style.setProperty("background","lime"),c}})]}})}}$e(["input","click"]);var pS=p("<div data-k-45f62037 class=user-profile-media-list-body>");const oh=()=>{const e=pn(),{user:t}=tt(),n=ne();return r=>{e(`/user/${t().name}/${n.type}${r?"/"+r:""}${location.search}`,{replace:!0})}};function cc(){const{user:e}=tt(),t=ne(),{accessToken:n,authUserData:r}=ce(),s=N(()=>Mf({token:n(),name:e().name,type:t.type})),a=xn({default:()=>ti()>2}),[l,{mutateCache:o}]=In(a,s),[c,h]=Te(),[u,f]=O({});let g;q(le(e,ae=>{ae&&(document.title=`${ae.name} ${t.type} - LOB`)})),document.title="Authentication - LOB";const m=ae=>{h(ae,{replace:!0})},y=()=>c.search||"",v=()=>c.format||"",$=()=>c.status||"",k=()=>c.genre||"",C=()=>c.countryOfOrigin||"",w=()=>{if(c.isAdult==="true")return!0;if(c.isAdult==="false")return!1},_=()=>c.year||"",A=()=>c.private==="true",S=()=>c.notes==="true",b=()=>c.repeat==="true",x=()=>c.missingStart==="true",I=()=>c.missingScore==="true",E=()=>c.reverse==="true",P=()=>c.sort||"score",R=()=>c.userStatus||"",B=()=>c.studio||"",V=()=>c.tag||"",X=wa(async(ae,re,Q)=>{F(Q,"Progress key is undefined");const J=await ue.anilist.mutateMedia(n(),{mediaId:ae,[Q]:re});J.status===200&&o(pe=>{function ve(fe,ee){const z=pe.data.lists.findIndex(De=>De.name===fe&&De.isCustomList===ee);z===-1&&pe.data.lists.push({name:fe,isCustomList:!1,isCompletedList:!1,entries:[]});const je=pe.data.lists.at(z);je.entries.push(J.data),u().data.indecies[ae].push([z===-1?pe.data.lists.length-1:z,je.entries.length-1])}if(u().data.indecies[ae].forEach(([fe,ee])=>{pe.data.lists[fe].entries.splice(ee,1)}),u().data.indecies[ae]=[],!J.data.hiddenFromStatusLists){const fe=ch(J.data.status,t.type);ve(fe,!1)}for(const[fe,ee]of Object.entries(J.data.customLists??{}))ee&&ve(fe,!0);return pe})},250,2),j=()=>{var ae,re;if(window.Worker&&((ae=l())!=null&&ae.data)){g=g instanceof Worker?g:new Bk;const Q={data:(re=l())==null?void 0:re.data,search:y(),format:v(),status:$(),genre:k(),reverse:E(),countryOfOrigin:C(),missingStart:x(),missingScore:I(),isAdult:w(),year:+_()||void 0,private:A(),notes:S(),repeat:b(),sort:P(),studio:B(),type:t.type,userStatus:R(),tag:V()};g.postMessage(Q),g.onmessage=f}};q(j),He(()=>{g instanceof Worker&&g.terminate()});function K(){var ae;return e().id===((ae=r())==null?void 0:ae.data.id)}return i(Vc.Provider,{value:{triggerProgressIncrease:X,isOwnProfile:K},get children(){var ae=pS();return d(ae,i(mS,{listData:u,setSearchParams:m,search:y,format:v,status:$,genre:k,countryOfOrigin:C,isAdult:w,year:_,privateFilter:A,notesFilter:S,rewatchedFilter:b,missingStartFilter:x,missingScoreFilter:I,reverse:E,sort:P,userStatus:R,studio:B,tag:V}),null),d(ae,i(Kk,{listData:u,mutateMediaListCache:o,updateListInfo:j}),null),ae}})}function ch(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Je(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:F(!1,"Unkown status: "+e)}}var vS=p("<button data-k-1fe26ca9 class=cp-delete-favourite>Delete");function Xr(e){const{authUserData:t,accessToken:n}=ce(),{user:r}=tt();return F(e.onClick,"onClick is missing"),F(e.mutate,"mutate is missing"),i(T,{get when(){var s;return r().id===((s=t())==null?void 0:s.data.id)},get children(){var s=vS();return s.$$click=async a=>{a.preventDefault(),e.onClick(),(await ue.anilist.toggleFavourite(n(),{mangaId:e.mangaId,animeId:e.animeId,staffId:e.staffId,characterId:e.characterId,studioId:e.studioId})).status===200&&e.mutate()},s}})}$e(["click"]);var Ha=p("<img data-k-81c02ac9 alt=Cover>"),$S=p("<li data-k-81c02ac9>");function _S(e){const[t,n]=O(!1),{setAllEdges:r,type:s}=jc(),a=l=>r(o=>o.filter(c=>c.node.id!==l));return(()=>{var l=$S();return d(l,i(W,{get children(){return[i(M,{when:s==="anime",get children(){return i(U,{get href(){return Ge(e.edge.node)},get children(){return[i(Xr,{get animeId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ha();return L(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),i(M,{when:s==="manga",get children(){return i(U,{get href(){return Ge(e.edge.node)},get children(){return[i(Xr,{get mangaId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ha();return L(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),i(M,{when:s==="characters",get children(){return i(U,{get href(){return"/ani/character/"+e.edge.node.id+"/"+Xe(e.edge.node.name.userPreferred)},get children(){return[i(Xr,{get characterId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ha();return L(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),i(M,{when:s==="staff",get children(){return i(U,{get href(){return"/ani/staff/"+e.edge.node.id+"/"+Xe(e.edge.node.name.userPreferred)},get children(){return[i(Xr,{get staffId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ha();return L(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),i(M,{when:s==="studios",get children(){return i(U,{get href(){return"/ani/studio/"+e.edge.node.id+"/"+Xe(e.edge.node.name)},get children(){return[i(Xr,{get studioId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),N(()=>e.edge.node.name)]}})}})]}})),L(o=>{var c=!!t(),h=e.edge.node.id;return c!==o.e&&l.classList.toggle("hidden",o.e=c),h!==o.t&&G(l,"data-id",o.t=h),o},{e:void 0,t:void 0}),l})()}function dh(e){const{user:t}=tt(),{type:n,allEdges:r}=jc(),{accessToken:s}=ce(),[a,l]=O(void 0),[o,{mutateCache:c}]=ue.anilist.favouritesByUserId(()=>t().id||void 0,e.page===1?()=>e.page:a,s);return q(()=>{var h,u,f,g;((u=(h=o())==null?void 0:h.data[n])==null?void 0:u.edges.length)>0&&Ae(r).splice((e.page-1)*25,25,...o().data[n].edges),e.page===1&&e.setVisible(((g=(f=o())==null?void 0:f.data[n])==null?void 0:g.edges.length)>0)}),q(le(r,h=>{Ae(o).data[n].edges=h.slice((e.page-1)*25,e.page*25),c(u=>u)},{defer:!0})),i($n,{rootMargin:"100px",onIntersection:()=>l(e.page),get loading(){return e.loading},fetchResponse:o,children:h=>[i(H,{get each(){var u;return(u=o())==null?void 0:u.data[n].edges},children:u=>i(_S,{edge:u})}),i(T,{get when(){return o().data[n].pageInfo.hasNextPage},get children(){return i(T,{when:h===!1,fallback:"Fetch cooldown",get children(){return i(dh,{get page(){return e.page+1},get loading(){return o.loading}})}})}})]})}var bS=p("<button data-k-05269ec0>Save"),yS=p("<button data-k-05269ec0>Cancel"),wS=p("<button data-k-05269ec0>Reorder"),kS=p("<details data-k-05269ec0 open><summary data-k-05269ec0><h3 data-k-05269ec0></h3></summary><ol data-k-05269ec0>");function Zr(e){F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(!1),[r,s]=O(!1),[a,l]=O([]),{accessToken:o,authUserData:c}=ce(),{user:h}=tt();let u,f,g,m;const y=()=>{s(!1),a().forEach(C=>{const w=u.querySelector(`li[data-id="${C.node.id}"]`);w&&u.append(w)})},v=C=>{if(!r())return;const w=C.target.closest("li");if(!w)return;w.classList.add("dragging");const _=w.getBoundingClientRect();if(C.type==="touchstart"){const A=C.touches[0];g=A.clientX-_.x,m=A.clientY-_.y}else g=C.clientX-_.x,m=C.clientY-_.y;f=w},$=C=>{var _,A;if(!r()||!f)return;if(C.type==="touchmove"){const S=C.touches[0],b=(_=document.elementFromPoint(S.clientX,S.clientY))==null?void 0:_.closest("li");b&&(f.nextElementSibling===b?b.after(f):b.before(f)),w()}else C.buttons===1&&((A=C.target)==null?void 0:A.tagName)==="LI"?f.nextElementSibling===C.target?C.target.after(f):C.target.before(f):C.buttons!==1&&k();C.buttons===1&&w();function w(){const S=f.getBoundingClientRect();let b=0,x=0,I=C.clientX,E=C.clientY;if(C.type==="touchmove"){const P=C.touches[0];I=P.clientX,E=P.clientY}f.style.transform&&([b,x]=f.style.transform.match(/-?[\d.]+(?=px)/g).map(Number)),f.style.transform=`translate(${b+(I-(S.x+g))}px, ${x+(E-(S.y+m))}px)`}},k=()=>{f&&(f.style.transform=null,f.classList.remove("dragging")),f=null};return(()=>{var C=kS(),w=C.firstChild,_=w.firstChild,A=w.nextSibling;return d(_,()=>e.title),d(w,i(T,{get when(){var S;return h().id===((S=c())==null?void 0:S.data.id)},get children(){return i(W,{get children(){return[i(M,{get when(){return r()},get children(){return[(()=>{var S=bS();return S.$$click=async()=>{const b=[...u.childNodes].map(E=>+E.dataset.id),x=b.map((E,P)=>P+1);let I;e.type==="anime"?I=await ue.anilist.mutateFavourites(o(),{animeIds:b,animeOrder:x}):e.type==="manga"?I=await ue.anilist.mutateFavourites(o(),{mangaIds:b,mangaOrder:x}):e.type==="studios"?I=await ue.anilist.mutateFavourites(o(),{studioIds:b,studioOrder:x}):e.type==="staff"?I=await ue.anilist.mutateFavourites(o(),{staffIds:b,staffOrder:x}):e.type==="characters"&&(I=await ue.anilist.mutateFavourites(o(),{characterIds:b,characterOrder:x})),I.status===200?(l(E=>{const P=Object.fromEntries(E.map((R,B)=>[R.node.id,B]));return E.map((R,B)=>E[P[b[B]]])}),s(!1)):(y(),console.error("mutation failed"))},S})(),(()=>{var S=yS();return S.$$click=y,S})()]}}),i(M,{get when(){return!r()},get children(){var S=wS();return S.$$click=()=>s(b=>!b),S}})]}})}}),null),A.$$touchstart=v,A.$$mousedown=v,A.$$touchend=k,A.$$touchmove=$,A.$$mousemove=$,he(S=>u=S,A),d(A,i(Hc.Provider,{get value(){return{type:e.type,setAllEdges:l,allEdges:a}},get children(){return i(T,{get when(){return h().id},keyed:!0,get children(){return i(dh,{page:1,setVisible:n})}})}})),L(S=>{var b=!t(),x=!!r(),I=e.type!=="studios",E=e.type==="studios";return b!==S.e&&C.classList.toggle("hidden",S.e=b),x!==S.t&&A.classList.toggle("reorder",S.t=x),I!==S.a&&A.classList.toggle("grid",S.a=I),E!==S.o&&A.classList.toggle("flex",S.o=E),S},{e:void 0,t:void 0,a:void 0,o:void 0}),C})()}$e(["click","mousemove","touchmove","touchend","mousedown","touchstart"]);var SS=p("<div data-k-821c40e4 class=user-profile-favourites>");function CS(){const{user:e}=tt();return q(le(e,t=>{document.title=`${t.name} favourites - LOB`})),(()=>{var t=SS();return d(t,i(Zr,{title:"Favourite animes",type:"anime"}),null),d(t,i(Zr,{title:"Favourite characters",type:"characters"}),null),d(t,i(Zr,{title:"Favourite manga",type:"manga"}),null),d(t,i(Zr,{title:"Favourite staff",type:"staff"}),null),d(t,i(Zr,{title:"Favourite studios",type:"studios"}),null),t})()}var AS=p("<div data-k-011bdddf class=user-profile-stats-page><div data-k-011bdddf><ol data-k-011bdddf><li data-k-011bdddf>Anime stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li><li data-k-011bdddf>Manga stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li></ol></div><div data-k-011bdddf class=content>");function xS(e){const{user:t}=tt();return q(()=>{document.title=`${t().name} stats - LOB`}),(()=>{var n=AS(),r=n.firstChild,s=r.firstChild,a=s.firstChild,l=a.firstChild,o=l.nextSibling,c=o.firstChild,h=c.nextSibling,u=h.nextSibling,f=u.nextSibling,g=f.nextSibling,m=g.nextSibling,y=a.nextSibling,v=y.firstChild,$=v.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,_=w.nextSibling,A=r.nextSibling;return d(c,i(U,{get href(){return"/user/"+t().name+"/stats/anime/overview"},children:"Overview"})),d(h,i(U,{get href(){return"/user/"+t().name+"/stats/anime/genres"},children:"Genres"})),d(u,i(U,{get href(){return"/user/"+t().name+"/stats/anime/tags"},children:"Tags"})),d(f,i(U,{get href(){return"/user/"+t().name+"/stats/anime/voice-actors"},children:"Voice actors"})),d(g,i(U,{get href(){return"/user/"+t().name+"/stats/anime/studios"},children:"Studios"})),d(m,i(U,{get href(){return"/user/"+t().name+"/stats/anime/staff"},children:"Staff"})),d(k,i(U,{get href(){return"/user/"+t().name+"/stats/manga/overview"},children:"Overview"})),d(C,i(U,{get href(){return"/user/"+t().name+"/stats/manga/genres"},children:"Genres"})),d(w,i(U,{get href(){return"/user/"+t().name+"/stats/manga/tags"},children:"Tags"})),d(_,i(U,{get href(){return"/user/"+t().name+"/stats/manga/staff"},children:"Staff"})),d(A,()=>e.children),n})()}var TS=p("<div data-k-f2870773><h2 data-k-f2870773>Relations</h2><ol data-k-f2870773 class=grid-column-auto-fill>"),IS=p("<img data-k-f2870773 alt=Cover>"),ES=p("<div data-k-f2870773 class=content><span data-k-f2870773 class=type></span><span data-k-f2870773 class=line-clamp></span><p data-k-f2870773 class=flex-bullet-separator><span data-k-f2870773></span><span data-k-f2870773>"),LS=p("<li data-k-f2870773>");function PS(e){return i(ct,{fallback:"Anilist relations preview error",get children(){return i(T,{get when(){var t;return(t=e.relations)==null?void 0:t.edges.length},get children(){var t=TS(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.relations.edges},children:s=>(()=>{var a=LS();return d(a,i(U,{get href(){return dd(s.node)},class:"media-page-relation",get children(){return[(()=>{var l=IS();return L(()=>G(l,"src",s.node.coverImage.large)),l})(),(()=>{var l=ES(),o=l.firstChild,c=o.nextSibling,h=c.nextSibling,u=h.firstChild,f=u.nextSibling;return d(o,()=>s.relationType),d(c,()=>s.node.title.userPreferred),d(u,()=>ys(s.node.format)),d(f,()=>ud(s.node.status)),l})()]}})),a})()})),t}})}})}const MS="_character-container_1mdg4_1",DS="_character_1mdg4_1",RS="_character-left_1mdg4_21",NS="_character-right_1mdg4_21",OS="_content_1mdg4_26",yn={characterContainer:MS,character:DS,characterLeft:RS,characterRight:NS,content:OS};var FS=p("<h2>Characters"),BS=p("<div><ol class=grid-column-auto-fill>"),US=p("<img alt=Character>"),dc=p("<div><p></p><p>"),VS=p("<li>"),GS=p('<img alt="Voice actor">');const uc=(e,t)=>{const n=Zs(t);return n!=="Japanese"&&e.some(r=>r.voiceActors.some(s=>s.language===n))?n:"Japanese"};function HS(e){const t=Fe({characters:[],countryOfOrigin:"JP"},e),[n,r]=O(uc(t.characters,t.countryOfOrigin));return q(()=>{r(uc(t.characters,t.countryOfOrigin))}),i(ct,{fallback:"Characters error",get children(){return i(T,{get when(){return t.characters.length},get children(){var s=BS(),a=s.firstChild;return d(s,i(U,{href:"characters",get children(){return FS()}}),a),d(a,i(H,{get each(){return t.characters},children:l=>(()=>{var o=VS();return d(o,i(U,{get href(){return"/ani/character/"+l.node.id+"/"+Xe(l.node.name.userPreferred)},get class(){return yn.characterLeft},get children(){return[(()=>{var c=US();return L(()=>G(c,"src",l.node.image.large)),c})(),(()=>{var c=dc(),h=c.firstChild,u=h.nextSibling;return d(h,()=>l.node.name.userPreferred),d(u,()=>l.role),L(f=>{var g=yn.content,m=yn.lineClamp;return g!==f.e&&Bt(c,f.e=g),m!==f.t&&Bt(h,f.t=m),f},{e:void 0,t:void 0}),c})()]}}),null),d(o,i(T,{get when(){return l.voiceActors.find(c=>c.language===n())},children:c=>i(U,{get href(){return"/ani/staff/"+c().id+"/"+Xe(c().name.userPreferred)},get class(){return yn.characterRight},get children(){return[(()=>{var h=dc(),u=h.firstChild,f=u.nextSibling;return d(u,()=>c().name.userPreferred),d(f,()=>c().language),L(g=>{var m=yn.content,y=yn.lineClamp;return m!==g.e&&Bt(h,g.e=m),y!==g.t&&Bt(u,g.t=y),g},{e:void 0,t:void 0}),h})(),(()=>{var h=GS();return L(()=>G(h,"src",c().image.large)),h})()]}})}),null),L(()=>Bt(o,yn.character)),o})()})),L(()=>Bt(s,yn.characterContainer)),s}})}})}var jS=p("<h2 data-k-b8cc53b3>Staff"),YS=p('<div data-k-b8cc53b3><ol data-k-b8cc53b3 class="grid-row-clamp grid-column-auto-fill">'),qS=p('<img data-k-b8cc53b3 alt="Staff profile">'),zS=p("<div data-k-b8cc53b3><p data-k-b8cc53b3></p><p data-k-b8cc53b3>"),WS=p("<li data-k-b8cc53b3>");function KS(e){return i(ct,{fallback:"Anilist staff preview error",get children(){return i(T,{get when(){return e.staff},get children(){var t=YS(),n=t.firstChild;return d(t,i(U,{href:"staff",get children(){return jS()}}),n),d(n,i(H,{get each(){return e.staff},children:r=>(()=>{var s=WS();return d(s,i(U,{get href(){return"/ani/staff/"+r.node.id+"/"+Kn(r.node.name.userPreferred)},get children(){return[(()=>{var a=qS();return L(()=>G(a,"src",r.node.image.large)),a})(),(()=>{var a=zS(),l=a.firstChild,o=l.nextSibling;return d(l,()=>r.node.name.userPreferred),d(o,()=>r.role),a})()]}})),s})()})),t}})}})}var JS=p("<p class=friend-list-status>");function XS(e){return(()=>{var t=JS();return d(t,i(W,{get fallback(){return e.friend.status},get children(){return[i(M,{get when(){return e.friend.status==="COMPLETED"},children:"Completed"}),i(M,{get when(){return e.friend.status==="CURRENT"},get children(){return i(W,{get children(){return[i(M,{get when(){return e.type==="ANIME"},children:"Watching"}),i(M,{get when(){return e.type==="MANGA"},children:"Reading"})]}})}}),i(M,{get when(){return e.friend.status==="DROPPED"},children:"Dropped"}),i(M,{get when(){return e.friend.status==="PAUSED"},children:"Paused"}),i(M,{get when(){return e.friend.status==="PLANNING"},children:"Planning"}),i(M,{get when(){return e.friend.status==="REPEATING"},get children(){return i(W,{get children(){return[i(M,{get when(){return e.type==="ANIME"},children:"Rewatching"}),i(M,{get when(){return e.type==="MANGA"},children:"Rereading"})]}})}})]}}),null),d(t,i(T,{get when(){return e.friend.progress>0&&e.friend.progress!==e.media.episodes&&e.friend.progress!==e.media.chapters},get children(){return i(W,{get children(){return[i(M,{get when(){return e.type==="ANIME"},get children(){return[" Ep. ",N(()=>e.friend.progress)]}}),i(M,{get when(){return e.type==="MANGA"},get children(){return[" Ch. ",N(()=>e.friend.progress)]}})]}})}}),null),d(t,i(T,{get when(){return e.friend.progressVolumes>0&&e.friend.progressVolumes!==e.media.volumes},get children(){return[" ","Vol. ",N(()=>e.friend.progressVolumes)]}}),null),t})()}const ZS="_friend-container_8e4dk_1",QS="_friend_8e4dk_1",eC="_friend-repeat_8e4dk_35",Vs={friendContainer:ZS,friend:QS,friendRepeat:eC};var tC=p("<div><ul>"),nC=p('<img alt="User profile">'),rC=p("<p>"),aC=p("<div>"),iC=p("<li>");function sC(){const e=ne(),[t]=Te(),{accessToken:n,authUserData:r}=ce(),{anilistData:s}=vn(),a=Me(If,()=>{var u,f;return{token:n(),id:t.isMalId!=null?(f=(u=s())==null?void 0:u.data)==null?void 0:f.id:e.id,page:1,perPage:8}}),l=xn({default:()=>ti()>1,"only-if-cached":()=>ti()>2}),[o]=In(l,a),[c,h]=O();return L(()=>{var u,f,g;(f=(u=s())==null?void 0:u.data)!=null&&f.mediaListEntry&&r()?h({...(g=s().data)==null?void 0:g.mediaListEntry,user:r().data}):h(null)}),i(ct,{fallback:"Friends error",get children(){return i(T,{get when(){return N(()=>{var u,f;return!!(((f=(u=o())==null?void 0:u.data)!=null&&f.mediaList.length||c())&&s())})()&&r()},get children(){var u=tC(),f=u.firstChild;return d(f,i(T,{get when(){return c()},get children(){return i(hc,{get friend(){return c()}})}}),null),d(f,i(H,{get each(){var g,m;return(m=(g=o())==null?void 0:g.data)==null?void 0:m.mediaList},children:g=>i(T,{get when(){var m;return g.user.id!==((m=r())==null?void 0:m.data.id)},get children(){return i(hc,{friend:g})}})}),null),L(()=>Bt(u,Vs.friendContainer)),u}})}})}function hc(e){const{anilistData:t}=vn();return(()=>{var n=iC();return d(n,i(U,{get class(){return Vs.friend},get href(){return"/user/"+e.friend.user.name},get children(){return[(()=>{var r=nC();return L(()=>G(r,"src",e.friend.user.avatar.large)),r})(),(()=>{var r=rC();return d(r,()=>e.friend.user.name),r})(),i(XS,{get friend(){return e.friend},get media(){var r;return(r=t())==null?void 0:r.data},get type(){var r;return(r=t())==null?void 0:r.data.type}}),i(T,{get when(){return e.friend.repeat},get children(){var r=aC();return d(r,()=>e.friend.repeat,null),d(r,i(di,{}),null),L(()=>Bt(r,Vs.friendRepeat)),r}}),i(Tl,{get format(){return e.friend.user.mediaListOptions.scoreFormat},get score(){return e.friend.score}})]}})),n})()}var lC=p("<button data-k-c63ce0c8>Show"),oC=p('<div data-k-c63ce0c8 class=recommendations><div data-k-c63ce0c8 class=flex-space-between><h2 data-k-c63ce0c8>Recommendations</h2><div data-k-c63ce0c8></div></div><ol data-k-c63ce0c8 class="grid-column-auto-fill recommendations">');function cC(e){const t=ne(),[n,r]=O(!1),[s,a]=O();return q(le(()=>t.id,l=>{r(!1),a(l)})),i(T,{get when(){var l;return((l=e.recommendations)==null?void 0:l.nodes.length)>0},get children(){var l=oC(),o=l.firstChild,c=o.firstChild,h=c.nextSibling,u=o.nextSibling;return d(h,i(T,{get when(){return e.recommendations.pageInfo.total>e.recommendations.nodes.length},get children(){var f=lC();return f.firstChild,f.$$click=()=>r(g=>!g),d(f,i(T,{get when(){return n()},fallback:" more",children:" less"}),null),f}})),d(u,i(W,{get children(){return[i(M,{get when(){return!n()},get children(){return i(Gs,{get nodes(){return e.recommendations.nodes},get mutateCache(){return e.mutateCache}})}}),i(M,{get when(){return n()},get children(){return i(uh,{get id(){return s()},page:1,get mutateOldCardsCache(){return e.mutateCache},get oldCards(){return e.recommendations.nodes}})}})]}})),l}})}function uh(e){const{accessToken:t}=ce(),[n,r]=O(void 0),s=Me(Tf,t,n,e.page),[a,{mutateCache:l}]=nt(s),o=(c,h)=>l(u=>(u.data.nodes[c]=h,u));return i($n,{onIntersection:()=>r(e.id),fetchResponse:a,get loadingElement(){return i(Gs,{get nodes(){return e.oldCards||[]},get mutateCache(){return e.mutateCache}})},get loading(){return e.loading},children:c=>[i(Gs,{get nodes(){return a().data.nodes},mutateCache:o,get mutateOldCardsCache(){return e.mutateOldCardsCache},get oldCards(){return e.oldCards}}),i(T,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(T,{when:c===!1,fallback:"Fetch cooldown",get children(){return i(uh,{get id(){return n()},get page(){return e.page+1},get loading(){return a.loading}})}})}})]})}function Gs(e){return F(!e.oldCards==!e.mutateOldCardsCache,"These two props needs to be used together"),i(H,{get each(){return e.nodes},children:(t,n)=>i(T,{get when(){return t.mediaRecommendation},get children(){return i(dC,{node:t,mutateCache:r=>{Oe(()=>{var s;n()<((s=e.oldCards)==null?void 0:s.length)&&e.mutateOldCardsCache(n(),r),e.mutateCache(n(),r)})}})}})})}function dC(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(e.node.userRating),[a,l]=O(e.node.rating);let o=e.node.userRating;const c=wa(async(f,g,m,y,v)=>{if(m!==o){const $=await ue.anilist.rateRecommendation(f,g,m,y,v);F(!$.fromCache,"Mutation should never be cached"),$.status===200&&e.mutateCache($.data)}o=m},1e3);return i(p_,{get node(){return e.node},get rating(){return a()},get userRating(){return r()},handleRateUp:f=>{f.preventDefault(),s(g=>g==="RATE_UP"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),l(m=>m-1),"NO_RATING"):(c(n(),e.node.id,"RATE_UP",t.id,e.node.mediaRecommendation.id),l(m=>m+1),"RATE_UP"))},handleRateDown:f=>{f.preventDefault(),s(g=>g==="RATE_DOWN"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),l(m=>m+1),"NO_RATING"):(c(n(),e.node.id,"RATE_DOWN",t.id,e.node.mediaRecommendation.id),l(m=>m-1),"RATE_DOWN"))}})}$e(["click"]);var uC=p("<h1>"),hC=p("<ul class=flex-bullet-separator><li></li><li>"),gC=p("<li>Source: "),fC=p("<ul><li>Members: </li><li>Favourites: "),mC=p("<div class=pg-ani-media-info>"),pC=p("<li>");function vC(){const{anilistData:e}=vn();return i(ct,{fallback:"Anilist media page info error",get children(){var t=mC();return d(t,i(T,{get when(){var n;return(n=e())==null?void 0:n.data},get children(){return[(()=>{var n=uC();return d(n,()=>{var r;return(r=e())==null?void 0:r.data.title.userPreferred}),n})(),(()=>{var n=hC(),r=n.firstChild,s=r.nextSibling;return d(r,i(W,{get children(){return[i(M,{get when(){var a;return((a=e())==null?void 0:a.data.type)==="MANGA"},get children(){return i(W,{get children(){return[i(M,{get when(){var a,l;return(l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year},get children(){return i(U,{get href(){var a;return"/search/manga?year="+((a=e())==null?void 0:a.data.startDate.year)},get children(){var a;return(a=e())==null?void 0:a.data.startDate.year}})}}),i(M,{get when(){var a,l;return((l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year)==null},get children(){return i(U,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),i(M,{get when(){var a;return((a=e())==null?void 0:a.data.type)==="ANIME"},get children(){return i(W,{get children(){return[i(M,{get when(){var a;return N(()=>{var l;return!!((l=e())!=null&&l.data.seasonYear)})()&&((a=e())==null?void 0:a.data.season)},get children(){return i(U,{get href(){var a,l;return"/search/anime/"+((a=e())==null?void 0:a.data.season.toLowerCase())+"-"+((l=e())==null?void 0:l.data.seasonYear)},get children(){return[N(()=>{var a;return Dr((a=e())==null?void 0:a.data.season)})," ",N(()=>{var a;return(a=e())==null?void 0:a.data.seasonYear})]}})}}),i(M,{get when(){var a,l;return(l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year},get children(){return i(U,{get href(){var a;return"/search/anime?year="+((a=e())==null?void 0:a.data.startDate.year)},get children(){var a;return(a=e())==null?void 0:a.data.startDate.year}})}}),i(M,{get when(){var a,l;return((l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year)==null},get children(){return i(U,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}})),d(n,i(T,{get when(){var a;return(a=Object.entries(Wn.ani.media).find(([,l])=>{var o;return l.api===((o=e())==null?void 0:o.data.format)}))==null?void 0:a[0]},children:a=>(()=>{var l=pC();return d(l,i(W,{get children(){return[i(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)!=="JP"},get children(){return i(U,{get href(){var o,c;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+a()+"&country="+((c=e())==null?void 0:c.data.countryOfOrigin)},get children(){return[N(()=>{var o;return ys((o=e())==null?void 0:o.data.format)})," (",N(()=>{var o;return _f((o=e())==null?void 0:o.data.countryOfOrigin)}),")"]}})}}),i(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)==="JP"},get children(){return i(U,{get href(){var o;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+a()},get children(){var o;return ys((o=e())==null?void 0:o.data.format)}})}})]}})),l})()}),s),d(s,()=>{var a;return ud((a=e())==null?void 0:a.data.status)}),n})(),(()=>{var n=fC(),r=n.firstChild;r.firstChild;var s=r.nextSibling;return s.firstChild,d(n,i(T,{get when(){var a;return(a=e())==null?void 0:a.data.source},get children(){var a=gC();return a.firstChild,d(a,i(U,{get href(){var l;return"/search/"+((l=e())==null?void 0:l.data.type.toLowerCase())+"?source="+Object.entries(Xs).find(([,o])=>{var c;return o.api===((c=e())==null?void 0:c.data.source)})[0]},get children(){var l;return bf((l=e())==null?void 0:l.data.source)}}),null),a}}),r),d(r,()=>{var a;return fa((a=e())==null?void 0:a.data.popularity)},null),d(s,()=>{var a;return fa((a=e())==null?void 0:a.data.favourites)},null),n})()]}})),t}})}var $C=p("<h2 data-k-c68b4600>Tags"),_C=p("<button data-k-c68b4600>"),bC=p("<div data-k-c68b4600 class=pg-media-tags><div data-k-c68b4600 class=flex-space-between></div><ol data-k-c68b4600>"),yC=p("<span data-k-c68b4600>%"),wC=p("<li data-k-c68b4600>");const kC=e=>{const[t,n]=O(!1);q(le(()=>e.tags,()=>{n(!1)}));function r(){const s=[];for(const a of e.tags){if(a.rank<90&&s.length>=3)break;(t()||!a.isMediaSpoiler&&!a.isGeneralSpoiler)&&s.push(`genre=${a.name}`)}return s}return i(ct,{fallback:"Tags error",get children(){return i(T,{get when(){var s;return(s=e.tags)==null?void 0:s.length},get children(){var s=bC(),a=s.firstChild,l=a.nextSibling;return d(a,i(U,{get href(){return"/search/"+e.type.toLowerCase()+"?"+r().join("&")},get children(){return $C()}}),null),d(a,i(T,{get when(){return e.tags.some(o=>o.isMediaSpoiler||o.isGeneralSpoiler)},get children(){var o=_C();return o.$$click=()=>n(c=>!c),d(o,i(T,{get when(){return!t()},fallback:"Hide spoilers",children:"Show spoilers"})),o}}),null),d(l,i(H,{get each(){return e.tags},children:o=>(()=>{var c=wC();return d(c,i(U,{get href(){return"/search/"+e.type.toLowerCase()+"?genre="+o.name+"&rank="+o.rank},get children(){return[N(()=>o.name)," ",(()=>{var h=yC(),u=h.firstChild;return d(h,()=>o.rank,u),h})()]}})),L(h=>{var u=!!(o.isMediaSpoiler||o.isGeneralSpoiler),f=!!((o.isMediaSpoiler||o.isGeneralSpoiler)&&!t()),g=o.description;return u!==h.e&&c.classList.toggle("spoiler",h.e=u),f!==h.t&&c.classList.toggle("hidden",h.t=f),g!==h.a&&G(c,"title",h.a=g),h},{e:void 0,t:void 0,a:void 0}),c})()})),L(()=>s.classList.toggle("loading",!!e.loading)),s}})}})};$e(["click"]);var SC=p("<div data-k-203e4d26 class=wrapper><h2 data-k-203e4d26></h2><ul data-k-203e4d26 class=genres>"),CC=p("<li data-k-203e4d26 class=genre>");const AC=e=>i(ct,{fallback:"Genres error",get children(){return i(T,{get when(){var t;return(t=e.genres)==null?void 0:t.length},get children(){var t=SC(),n=t.firstChild,r=n.nextSibling;return d(n,i(U,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?"+e.genres.map(s=>"genre="+s).join("&")},children:"Genres"})),d(r,i(H,{get each(){return e.genres},children:s=>(()=>{var a=CC();return d(a,i(U,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?genre="+s},children:s})),a})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var xC=p("<div data-k-737e8a49 class=pg-media-ranking><h2 data-k-737e8a49>Ranking</h2><ul data-k-737e8a49>"),TC=p("<li data-k-737e8a49>#<! data-k-737e8a49> <! data-k-737e8a49> <! data-k-737e8a49> ");const IC=e=>i(ct,{fallback:"Ranking error",get children(){return i(T,{get when(){return e.rankings},get children(){var t=xC(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.rankings},children:s=>(()=>{var a=TC(),l=a.firstChild,o=l.nextSibling,c=o.nextSibling,h=c.nextSibling,u=h.nextSibling,f=u.nextSibling;return f.nextSibling,d(a,()=>s.rank,o),d(a,()=>s.context,h),d(a,()=>s.season,f),d(a,()=>s.year,null),a})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var EC=p("<li data-k-439c0d70>Episodes: "),LC=p("<li data-k-439c0d70>Volumes: "),PC=p("<li data-k-439c0d70>Chapters: "),MC=p("<li data-k-439c0d70>Duration: <! data-k-439c0d70> mins"),DC=p("<li data-k-439c0d70>English: "),RC=p("<li data-k-439c0d70>Romaji: "),NC=p("<li data-k-439c0d70>Native: "),OC=p("<li data-k-439c0d70>Synonyms:<ul data-k-439c0d70>"),FC=p("<div data-k-439c0d70><h2 data-k-439c0d70>Extra info</h2><ul data-k-439c0d70>"),BC=p("<li data-k-439c0d70>Start Date: "),UC=p("<li data-k-439c0d70>End Date: "),VC=p("<li data-k-439c0d70>");const GC=e=>{const{authUserData:t}=ce();return i(ct,{fallback:"ExtraInfo error",get children(){return i(T,{get when(){return e.media},get children(){var n=FC(),r=n.firstChild,s=r.nextSibling;return d(s,i(T,{get when(){return e.media.episodes},get children(){var a=EC();return a.firstChild,d(a,()=>e.media.episodes,null),a}}),null),d(s,i(T,{get when(){return e.media.volumes},get children(){var a=LC();return a.firstChild,d(a,()=>e.media.volumes,null),a}}),null),d(s,i(T,{get when(){return e.media.chapters},get children(){var a=PC();return a.firstChild,d(a,()=>e.media.chapters,null),a}}),null),d(s,i(T,{get when(){return e.media.duration},get children(){var a=MC(),l=a.firstChild,o=l.nextSibling;return o.nextSibling,d(a,()=>e.media.duration,o),a}}),null),d(s,i(T,{get when(){return ei(e.media.startDate)},children:a=>(()=>{var l=BC();return l.firstChild,d(l,a,null),l})()}),null),d(s,i(T,{get when(){return ei(e.media.endDate)},children:a=>(()=>{var l=UC();return l.firstChild,d(l,a,null),l})()}),null),d(s,i(T,{get when(){return!t()||t().data.options.titleLanguage!=="ENGLISH"},get children(){var a=DC();return a.firstChild,d(a,()=>e.media.title.english,null),a}}),null),d(s,i(T,{get when(){return!t()||t().data.options.titleLanguage!=="ROMAJI"},get children(){var a=RC();return a.firstChild,d(a,()=>e.media.title.romaji,null),a}}),null),d(s,i(T,{get when(){return!t()||t().data.options.titleLanguage!=="NATIVE"},get children(){var a=NC();return a.firstChild,d(a,()=>e.media.title.native,null),a}}),null),d(s,i(T,{get when(){return e.media.synonyms.length},get children(){var a=OC(),l=a.firstChild,o=l.nextSibling;return d(o,i(H,{get each(){return e.media.synonyms},children:c=>(()=>{var h=VC();return d(h,c),h})()})),a}}),null),L(()=>n.classList.toggle("loading",!!e.loading)),n}})}})};var HC=p("<div data-k-611537d3 class=pg-media-banner><img data-k-611537d3 alt=Banner>");const jC=e=>i(T,{get when(){return e.src},get children(){var t=HC(),n=t.firstChild;return L(r=>{var s=!!e.loading,a=e.src;return s!==r.e&&t.classList.toggle("loading",r.e=s),a!==r.t&&G(n,"src",r.t=a),r},{e:void 0,t:void 0}),t}});var YC=p("<img data-k-543bd5d1 alt=Cover class=media-page-cover>"),qC=p("<a data-k-543bd5d1 target=_black class=active><span data-k-543bd5d1 class=visually-hidden>Go to Anilist"),zC=p("<span data-k-543bd5d1 class=visually-hidden>Switch to MyAnimeList mode"),WC=p("<div data-k-543bd5d1 class=cp-media-api-switcher>"),KC=p("<button data-k-543bd5d1>"),JC=p("<div data-k-543bd5d1 class=media-page-content><aside data-k-543bd5d1 class=media-page-left-aside></aside><section data-k-543bd5d1 class=media-page-main>"),XC=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Studios</h2><ol data-k-543bd5d1>"),Hs=p("<li data-k-543bd5d1>"),ZC=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Producers</h2><ol data-k-543bd5d1>"),QC=p("<div data-k-543bd5d1 class=media-page-description>"),e3=p('<div data-k-543bd5d1 class="no-overflow media-page-watch-episodes"><h2 data-k-543bd5d1>Watch</h2><ol data-k-543bd5d1 class=grid-reel-auto-fill>'),t3=p('<a data-k-543bd5d1 target=_black><img data-k-543bd5d1 alt="Episode thumbnail"><div data-k-543bd5d1 class=wrapper><p data-k-543bd5d1>');function n3(e){const t=ne(),[n]=Te(),{accessToken:r}=ce(),[s,a]=O(),l=Me(xf,()=>({token:r(),id:t.id,isMalId:n.isMalId!=null,type:t.type})),o=xn({default:()=>ti()>2}),[c,{mutateBoth:h}]=In(o,l),u=N(()=>{var _;const w=(_=c())==null?void 0:_.data;if(!(!w||w.idMal==null||w.type.toLowerCase()!==t.type))return w.idMal});L(le(c,w=>{var _;a(((_=w==null?void 0:w.data)==null?void 0:_.isFavourite)??!1)}));const f=Me(pd,()=>t.type,u),[g]=nt(f),m=N(()=>{var w,_,A,S;if((w=c())!=null&&w.data.idMal&&((A=(_=g())==null?void 0:_.data)==null?void 0:A.mal_id)===((S=c())==null?void 0:S.data.idMal))return g()}),{openEditor:y}=zs(),v=pn();L(()=>{var w,_;(w=c())!=null&&w.data&&t.sub?document.title=`${c().data.title.userPreferred} - ${t.sub} - LOB`:(_=c())!=null&&_.data&&(document.title=`${c().data.title.userPreferred} - LOB`)});const $=new AbortController;Ln(()=>{window.addEventListener("keydown",w=>{if(w.target!==document.body||w.shiftKey||w.altKey)return;function _(A){var S,b,x,I,E;return w.preventDefault(),(E=(I=(x=(b=(S=c())==null?void 0:S.data)==null?void 0:b.relations)==null?void 0:x.edges)==null?void 0:I.find(P=>(P==null?void 0:P.relationType)===A))==null?void 0:E.node}if(w.key==="l"&&!w.ctrlKey||w.key==="ArrowRight"&&w.ctrlKey)Aa(v,_("SEQUEL"));else if(w.key==="h"&&!w.ctrlKey||w.key==="ArrowLeft"&&w.ctrlKey)Aa(v,_("PREQUEL"));else if(w.key==="j"&&!w.ctrlKey||w.key==="ArrowDown"&&w.ctrlKey){const A=_("ADAPTATION")||_("ALTERNATIVE");Aa(v,A)}else(w.key==="k"&&!w.ctrlKey||w.key==="ArrowUp"&&w.ctrlKey)&&Aa(v,_("SOURCE")||_("PARENT"))},{signal:$.signal})}),He(()=>$.abort());const k=()=>{var w;return c.loading&&((w=c())==null?void 0:w.data.id)!=t.id},C=(w,_)=>{var S,b,x,I;const A=_[(b=(S=c())==null?void 0:S.data)==null?void 0:b.type]??null;((I=(x=c())==null?void 0:x.data)==null?void 0:I.id)===A&&(a(w),h(E=>(E.data.isFavourite=w,E)))};return i(ct,{fallback:"Media page error",get children(){return i(Js.Provider,{value:{anilistData:c,mutateBothAnilistData:h,jikanData:m},get children(){return[i(jC,{get src(){var w,_;return(_=(w=c())==null?void 0:w.data)==null?void 0:_.bannerImage},get loading(){return k()}}),(()=>{var w=JC(),_=w.firstChild,A=_.nextSibling;return d(_,i(T,{get when(){var S;return(S=c())==null?void 0:S.data},get children(){return[(()=>{var S=YC();return L(()=>{var b,x;return G(S,"src",(x=(b=c())==null?void 0:b.data)==null?void 0:x.coverImage.large)}),S})(),(()=>{var S=WC();return d(S,i(T,{get when(){var b;return(b=c())==null?void 0:b.data.id},get children(){var b=qC();return b.firstChild,d(b,i(kl,{}),null),d(b,i(Qu,{}),null),L(()=>{var x;return G(b,"href","https://anilist.co/"+t.type+"/"+(((x=c())==null?void 0:x.data.id)??t.id))}),b}}),null),d(S,i(T,{get when(){var b;return(b=c())==null?void 0:b.data.idMal},get children(){return i(U,{get href(){var b;return"/mal/"+t.type+"/"+((b=c())==null?void 0:b.data.idMal)+"/"+t.name},get children(){return[zC(),i(Sl,{})]}})}}),null),S})(),i(Zu,{}),i(T,{get when(){return r()},get children(){return[(()=>{var S=KC();return S.$$click=()=>{var b;y((b=c())==null?void 0:b.data,{setIsFavourite:C,mutateMedia:x=>{var I,E;((E=(I=c())==null?void 0:I.data)==null?void 0:E.id)===(x==null?void 0:x.media.id)&&h(P=>(P.data.mediaListEntry=x,P))}})},d(S,()=>{var b,x;return((x=(b=c())==null?void 0:b.data.mediaListEntry)==null?void 0:x.status)||"Edit"}),S})(),i(Fr,{get checked(){return s()},onChange:a,get idType(){var S;return(S=c())==null?void 0:S.data.type},get variableId(){var S;return(S=c())==null?void 0:S.data.id},get anilistValue(){var S;return(S=c())==null?void 0:S.data.favourites},get jikanValue(){var S;return(S=m())==null?void 0:S.data.favorites},mutateCache:C})]}}),i(Xu,{get id(){var S,b,x;return(x=(b=(S=c())==null?void 0:S.data)==null?void 0:b.trailer)==null?void 0:x.id},get site(){var S,b,x;return(x=(b=(S=c())==null?void 0:S.data)==null?void 0:b.trailer)==null?void 0:x.site}}),i(T,{get when(){var S;return(S=c())==null?void 0:S.data.studios.edges.filter(b=>b.isMain)},children:S=>i(T,{get when(){return S().length>0},get children(){var b=XC(),x=b.firstChild,I=x.nextSibling;return d(I,i(H,{get each(){return S()},children:E=>(()=>{var P=Hs();return d(P,i(U,{get href(){return"/ani/studio/"+E.node.id+"/"+Kn(E.node.name)},get children(){return E.node.name}})),P})()})),b}})}),i(T,{get when(){var S;return(S=c())==null?void 0:S.data.studios.edges.filter(b=>b.isMain===!1)},children:S=>i(T,{get when(){return S().length>0},get children(){var b=ZC(),x=b.firstChild,I=x.nextSibling;return d(I,i(H,{get each(){return S()},children:E=>(()=>{var P=Hs();return d(P,i(U,{get href(){return"/ani/studio/"+E.node.id+"/"+Kn(E.node.name)},get children(){return E.node.name}})),P})()})),b}})}),i(eh,{get hashtag(){var S;return(S=c())==null?void 0:S.data.hashtag},get externalLinks(){var S;return(S=c())==null?void 0:S.data.externalLinks}}),i(GC,{get media(){var S;return(S=c())==null?void 0:S.data},get loading(){return k()}}),i(IC,{get rankings(){var S;return(S=c())==null?void 0:S.data.rankings},get loading(){return k()}}),i(AC,{get genres(){var S;return(S=c())==null?void 0:S.data.genres},get type(){var S;return(S=c())==null?void 0:S.data.type},get loading(){return k()}}),i(kC,{get tags(){var S;return(S=c())==null?void 0:S.data.tags},get type(){var S;return(S=c())==null?void 0:S.data.type},get loading(){return k()}})]}})),d(A,i(vC,{}),null),d(A,()=>e.children,null),L(()=>w.classList.toggle("loading",!!k())),w})()]}})}})}function r3(){const{accessToken:e}=ce(),{anilistData:t,mutateBothAnilistData:n}=vn();return i(ct,{fallback:"Media page home content error",get children(){return i(T,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[i(T,{get when(){return t().data.description},get children(){var r=QC();return d(r,i(li,{get text(){return t().data.description}})),r}}),i(PS,{get relations(){return t().data.relations}}),i(HS,{get characters(){return t().data.characterPreview.edges},get countryOfOrigin(){return t().data.countryOfOrigin}}),i(KS,{get staff(){return t().data.staffPreview.edges}}),i(T,{get when(){return e()},get children(){return i(sC,{})}}),i(Gy,{}),i(i3,{get streamingEpisodes(){return t().data.streamingEpisodes}}),i(cC,{get recommendations(){return t().data.recommendations},mutateCache:(r,s)=>{n(a=>(a.data.recommendations.nodes[r]=s,a))}})]}})}})}function a3(){const e=ne(),t=Qt();return i(hn,{get href(){return"/ani/"+e.type+"/"+e.id+"/"+(e.name||"")+t.search}})}function i3(e){return i(T,{get when(){var t;return(t=e.streamingEpisodes)==null?void 0:t.length},get children(){var t=e3(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.streamingEpisodes},children:s=>(()=>{var a=Hs();return d(a,i(W,{get children(){return i(M,{get when(){return s.site==="Crunchyroll"},get children(){var l=t3(),o=l.firstChild,c=o.nextSibling,h=c.firstChild;return d(h,()=>s.title),L(u=>{var f=s.url,g=s.thumbnail;return f!==u.e&&G(l,"href",u.e=f),g!==u.t&&G(o,"src",u.t=g),u},{e:void 0,t:void 0}),l}})}})),a})()})),t}})}$e(["click"]);var s3=p('<img alt="User profile">'),l3=p("<p>"),o3=p("<li>"),c3=p("<button>Load more");function Il(e){F(e.page,"Page is missing");const{user:t}=tt(),{accessToken:n}=ce(),[r]=ue.anilist.userFollowers(()=>t().id,e.page,n),[s,a]=O(!1);return i(T,{get when(){return r()},get children(){return[i(H,{get each(){return r().data.followers},children:l=>(()=>{var o=o3();return d(o,i(U,{get href(){return"/user/"+l.name},get children(){return[(()=>{var c=s3();return L(()=>G(c,"src",l.avatar.large)),c})(),(()=>{var c=l3();return d(c,()=>l.name),c})()]}})),o})()}),i(T,{get when(){return r().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return s()},get fallback(){return(()=>{var l=c3();return l.$$click=()=>a(!0),l})()},get children(){return i(Il,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var d3=p('<img alt="User profile">'),u3=p("<p>"),h3=p("<button>Unfollow"),g3=p("<li>"),f3=p("<button>Load more");function m3(e){F(e.page,"Page is missing");const{user:t}=tt(),{authUserData:n,accessToken:r}=ce(),[s]=ue.anilist.userFollowing(()=>t().id,e.page,r),[a,l]=O(!1);return i(T,{get when(){return s()},get children(){return[i(H,{get each(){return s().data.following},children:o=>(()=>{var c=g3();return d(c,i(U,{get href(){return"/user/"+o.name},get children(){return[(()=>{var h=d3();return L(()=>G(h,"src",o.avatar.large)),h})(),(()=>{var h=u3();return d(h,()=>o.name),h})(),i(T,{get when(){var h;return t().id===((h=n())==null?void 0:h.data.id)},get children(){var h=h3();return h.$$click=async u=>{u.preventDefault()},h}})]}})),c})()}),i(T,{get when(){return s().data.pageInfo.hasNextPage},get children(){return i(T,{get when(){return a()},get fallback(){return(()=>{var o=f3();return o.$$click=()=>l(!0),o})()},get children(){return i(Il,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var gc=p("<ol class=user-profile-social-grid>"),p3=p("<div class=user-profile-socials-page><ul><li><button>Following</button></li><li><button>Followers");function v3(){const{user:e}=tt(),[t,n]=O("following");return q(le(e,r=>{document.title=`${r.name} socials - LOB`})),(()=>{var r=p3(),s=r.firstChild,a=s.firstChild,l=a.firstChild,o=a.nextSibling,c=o.firstChild;return l.$$click=()=>n("following"),c.$$click=()=>n("followers"),d(r,i(W,{get children(){return[i(M,{get when(){return t()==="following"},get children(){var h=gc();return d(h,i(T,{get when(){return e().id},keyed:!0,get children(){return i(m3,{page:1})}})),h}}),i(M,{get when(){return t()==="followers"},get children(){var h=gc();return d(h,i(T,{get when(){return e().id},keyed:!0,get children(){return i(Il,{page:1})}})),h}})]}}),null),r})()}$e(["click"]);var $3=p("<h2 data-k-a9353a86>"),_3=p("<span data-k-a9353a86>View all"),b3=p("<section data-k-a9353a86><ol data-k-a9353a86 class=grid-reel-auto-fill>");function vt(e){return F("href"in e,"Link is missing"),(()=>{var t=b3(),n=t.firstChild;return d(t,i(U,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=$3();return d(r,()=>e.title),r})(),_3()]}}),n),d(n,i(H,{get each(){return e.data},children:r=>i(xi,{media:r})})),t})()}var y3=p("<h2 data-k-a96044c6>"),w3=p("<section data-k-a96044c6><ol data-k-a96044c6 class=vertical-search-card-row>"),k3=p("<img data-k-a96044c6 class=cover alt=Cover.>"),S3=p('<li data-k-a96044c6 class=vertical-search-card><p data-k-a96044c6 class=ranking>#<span data-k-a96044c6></span></p><div data-k-a96044c6 class=vertical-search-card-body><div data-k-a96044c6 class="vertical-search-card-content clamp"><ol data-k-a96044c6 class=vertical-search-card-genre-list></ol></div><div data-k-a96044c6 class=vertical-search-card-info><div data-k-a96044c6 class=vertical-search-card-score><div data-k-a96044c6 class=clamp><p data-k-a96044c6>%</p><p data-k-a96044c6> users</p></div></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6></p><p data-k-a96044c6></p></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6> </p><p data-k-a96044c6>'),C3=p("<li data-k-a96044c6 class=vertical-search-card-genre>");function El(e){return F("href"in e,"Link is missing"),It(e.type,"type"),(()=>{var t=w3(),n=t.firstChild;return d(t,i(U,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=y3();return d(r,()=>e.title),r})(),"View all"]}}),n),d(n,i(H,{get each(){return e.data},children:(r,s)=>(()=>{var a=S3(),l=a.firstChild,o=l.firstChild,c=o.nextSibling,h=l.nextSibling,u=h.firstChild,f=u.firstChild,g=u.nextSibling,m=g.firstChild,y=m.firstChild,v=y.firstChild,$=v.firstChild,k=v.nextSibling,C=k.firstChild,w=m.nextSibling,_=w.firstChild,A=_.nextSibling,S=w.nextSibling,b=S.firstChild,x=b.firstChild,I=b.nextSibling;return d(c,()=>s()+1),d(h,i(U,{class:"cover-container",get href(){return Ge(r)},get children(){var E=k3();return L(()=>G(E,"src",r.coverImage.large)),E}}),u),d(u,i(U,{class:"line-clamp",get href(){return Ge(r)},get children(){return r.title.userPreferred}}),f),d(f,i(H,{get each(){return r.genres},children:E=>(()=>{var P=C3();return d(P,i(U,{get href(){return`/search${e.type?"/"+e.type:""}?genre=`+E},children:E})),P})()})),d(m,i(sa,{get score(){return r.averageScore}}),y),d(v,()=>r.averageScore,$),d(k,()=>ye(r.popularity),C),d(_,()=>Mr(r.format)),d(A,i(W,{get children(){return[i(M,{get when(){return r.type==="ANIME"},get children(){return i(T,{get when(){return r.episodes},fallback:"Ongoing",get children(){return[N(()=>ye(r.episodes))," Episode",i(T,{get when(){return r.episodes>1},children:"s"})]}})}}),i(M,{get when(){return r.type==="MANGA"},get children(){return i(T,{get when(){return r.chapters},fallback:"Ongoing",get children(){return[N(()=>ye(r.chapters))," Chapter",i(T,{get when(){return r.chapters>1},children:"s"})]}})}})]}})),d(b,()=>Je(r.season),x),d(b,()=>r.seasonYear,null),d(I,()=>Je(r.status)),L(E=>(E=r.coverImage.color)!=null?a.style.setProperty("--media-background-color",E):a.style.removeProperty("--media-background-color")),a})()})),t})()}var A3=p("<div data-k-bc27f66a class=browse-content>");function x3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingManga(e);return document.title="Browse manga - LOB",i(T,{get when(){return t()},get children(){var n=A3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/manga/trending",title:"Trending now"}),null),d(n,i(vt,{get data(){return t().data.data.novel.media},href:"/search/manga/novel",title:"Popular light novels"}),null),d(n,i(vt,{get data(){return t().data.data.manhwa.media},href:"/search/manga/manhwa",title:"Popular Manhwas"}),null),d(n,i(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished-manga",title:"Recently finished mangas"}),null),d(n,i(vt,{get data(){return t().data.data.finishedNovel.media},href:"/search/manga/finished-novel",title:"Recently finished light novels"}),null),d(n,i(vt,{get data(){return t().data.data.popular.media},href:"/search/manga/popular",title:"All time popular"}),null),d(n,i(El,{get data(){return t().data.data.top.media},type:"manga",href:"/search/manga/top-100",title:"Top 100 manga"}),null),n}})}var T3=p("<div data-k-ac073097 class=browse-content>");function I3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingAnime(e);return document.title="Browse anime - LOB",i(T,{get when(){return t()},get children(){var n=T3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/anime/trending",title:"Trending now"}),null),d(n,i(vt,{get data(){return t().data.data.season.media},href:"/search/anime/this-season?order=popularity",title:"Popular this season"}),null),d(n,i(vt,{get data(){return t().data.data.nextSeason.media},href:"/search/anime/next-season?order=popularity",title:"Upcoming next season"}),null),d(n,i(vt,{get data(){return t().data.data.finished.media},href:"/search/anime/finished",title:"Recently finished"}),null),d(n,i(vt,{get data(){return t().data.data.popular.media},href:"/search/anime/popular",title:"All time popular"}),null),d(n,i(El,{get data(){return t().data.data.top.media},type:"anime",href:"/search/anime/top-100",title:"Top 100 anime"}),null),n}})}var E3=p("<div data-k-49f3f573 class=browse-content>");function L3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingMedia(e);return document.title="Browse media - LOB",i(T,{get when(){return t()},get children(){var n=E3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/media/trending",title:"Trending anime and manga"}),null),d(n,i(vt,{get data(){return t().data.data.newAnime.media},href:"/search/anime/new",title:"Newly added anime"}),null),d(n,i(vt,{get data(){return t().data.data.newManga.media},href:"/search/manga/new",title:"Newly added manga"}),null),d(n,i(vt,{get data(){return t().data.data.finishedAnime.media},href:"/search/anime/finished",title:"Recently finished anime"}),null),d(n,i(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished",title:"Recently finished manga"}),null),d(n,i(El,{get data(){return t().data.data.top.media},type:"media",href:"/search/media/top-100",title:"Top 100 anime and manga"}),null),n}})}var P3=p("<div data-k-77b7dd9c>This is div text");function M3(){return P3()}var D3=p("<div>Not fould 404");const R3=document.getElementById("root"),wn={id:/^\d+$/},N3={type:"anime",header:e=>e.match(/^(summer|fall|spring|winter)-\d+$/)?!0:["finished","this-season","new","tba","next-season","trending","popular","top-100"].includes(e)},O3={type:"manga",header:["finished","finished-manga","tba","finished-novel","novel","new","manhwa","trending","popular","top-100"]},F3={type:"media",header:["finished","trending","popular","top-100","tba"]};Gh(()=>i(I$,{get children(){return i(E$,{get children(){return i(N2,{get children(){return i(Tg,{root:Ap,base:"/legendary-octo-barnacle",get children(){return[i(oe,{path:"/",component:x$}),i(oe,{path:"/authentication",component:T$}),i(oe,{path:"/notifications",component:n0}),i(oe,{path:"/settings",component:M3}),i(oe,{path:"/activity/:id",matchFilters:wn,component:c2}),i(oe,{path:"/compare",get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"anime"})}),i(oe,{path:"/:type",matchFilters:{type:["anime","manga"]},component:kw}),i(oe,{path:"*",component:()=>i(hn,{href:"/compare"})})]}}),i(oe,{path:"/:mode",matchFilters:{mode:["browse","search"]},component:M_,get children(){return[i(oe,{path:"/",matchFilters:{mode:"browse"},component:d2,get children(){return[i(oe,{path:"/:type",matchFilters:{type:"media"},component:L3}),i(oe,{path:"/:type",matchFilters:{type:"anime"},component:I3}),i(oe,{path:"/:type",matchFilters:{type:"manga"},component:x3})]}}),i(oe,{path:"/",matchFilters:{mode:"search"},component:D_,get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"media"})}),i(oe,{path:"/:type",matchFilters:{type:["anime","manga","media"]},get children(){return[i(oe,{path:"/:header?",matchFilters:N3}),i(oe,{path:"/:header?",matchFilters:O3}),i(oe,{path:"/:header?",matchFilters:F3}),i(oe,{path:"/:header?",component:R_})]}})]}})]}}),i(oe,{path:"/artist/:name",component:Ky}),i(oe,{path:"/:api",get children(){return[i(oe,{path:"/:sub/:id/:name?",matchFilters:{api:"ani"},get children(){return[i(oe,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:W0}),i(oe,{path:"/",get matchFilters(){return{...wn,sub:"staff"}},component:K0}),i(oe,{path:"/",get matchFilters(){return{...wn,sub:"studio"}},component:r2})]}}),i(oe,{path:"/:sub/:id/:name?",matchFilters:{api:"mal"},get children(){return i(oe,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:vk})}})]}}),i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,type:["anime","manga"]}},component:a3}),i(oe,{path:"/:api",get children(){return[i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"ani"}},component:n3,get children(){return[i(oe,{path:"/",matchFilters:{type:["anime","manga"]},component:r3}),i(oe,{path:"/:sub",matchFilters:{sub:"characters"},get children(){return[i(oe,{path:"/",matchFilters:{type:"anime"},component:v0}),i(oe,{path:"/",matchFilters:{type:"manga"},component:$0})]}}),i(oe,{path:"/:sub",matchFilters:{sub:"staff"},get children(){return[i(oe,{path:"/",matchFilters:{type:"anime"},component:_0}),i(oe,{path:"/",matchFilters:{type:"manga"},component:b0})]}})]}}),i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"mal"}},component:ik,get children(){return[i(oe,{path:"/",matchFilters:{type:["anime","manga"]},component:sk}),i(oe,{path:"/:sub",get children(){return[i(oe,{path:"/",matchFilters:{sub:"characters",type:["anime","manga"]},component:uk}),i(oe,{path:"/",matchFilters:{sub:"staff",type:"anime"},component:gk})]}})]}})]}}),i(oe,{path:"/user/:name",component:H_,get children(){return[i(oe,{path:"/",component:Fk}),i(oe,{path:"/:type/:list?",matchFilters:{type:"anime"},component:cc}),i(oe,{path:"/:type/:list?",matchFilters:{type:"manga"},component:cc}),i(oe,{path:"/favourites",component:CS}),i(oe,{path:"/stats",component:xS,get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"anime"})}),i(oe,{path:"/:type",matchFilters:{type:"anime"},get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"overview"})}),i(oe,{path:"/overview",component:yb}),i(oe,{path:"/genres",component:Nb}),i(oe,{path:"/tags",component:qb}),i(oe,{path:"/studios",component:ry}),i(oe,{path:"/staff",component:Ay}),i(oe,{path:"/voice-actors",component:my})]}}),i(oe,{path:"/:type",matchFilters:{type:"manga"},get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"overview"})}),i(oe,{path:"/overview",component:wb}),i(oe,{path:"/genres",component:Ob}),i(oe,{path:"/tags",component:zb}),i(oe,{path:"/staff",component:xy})]}})]}}),i(oe,{path:"/socials",component:v3})]}}),i(oe,{path:"*404",component:()=>D3()})]}})}})}})}}),R3);
