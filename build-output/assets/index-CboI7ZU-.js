var dh=Object.defineProperty;var Ul=e=>{throw TypeError(e)};var uh=(e,t,n)=>t in e?dh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Re=(e,t,n)=>uh(e,typeof t!="symbol"?t+"":t,n),Pi=(e,t,n)=>t.has(e)||Ul("Cannot "+n);var Ee=(e,t,n)=>(Pi(e,t,"read from private field"),n?n.call(e):t.get(e)),ut=(e,t,n)=>t.has(e)?Ul("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ht=(e,t,n,r)=>(Pi(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),Et=(e,t,n)=>(Pi(e,t,"access private method"),n);var Mi=(e,t,n,r)=>({set _(s){ht(e,t,s,n)},get _(){return Ee(e,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const hh=!1,gh=(e,t)=>e===t,Kt=Symbol("solid-proxy"),hc=typeof Proxy=="function",os=Symbol("solid-track"),qa={equals:gh};let na=null,gc=$c;const sn=1,za=2,fc={owned:null,cleanups:null,context:null,owner:null},Di={};var Se=null;let Ri=null,fh=null,Pe=null,$t=null,Wt=null,ui=0;function ra(e,t){const n=Pe,r=Se,s=e.length===0,a=t===void 0?r:t,l=s?fc:{owned:null,cleanups:null,context:a?a.context:null,owner:a},o=s?e:()=>e(()=>Ae(()=>oa(l)));Se=l,Pe=null;try{return an(o,!0)}finally{Pe=n,Se=r}}function O(e,t){t=t?Object.assign({},qa,t):qa;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),vc(n,s));return[pc.bind(n),r]}function mh(e,t,n){const r=va(e,t,!0,sn);Nr(r)}function P(e,t,n){const r=va(e,t,!1,sn);Nr(r)}function W(e,t,n){gc=kh;const r=va(e,t,!1,sn);r.user=!0,Wt?Wt.push(r):Nr(r)}function N(e,t,n){n=n?Object.assign({},qa,n):qa;const r=va(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Nr(r),pc.bind(r)}function ph(e){return e&&typeof e=="object"&&"then"in e}function vh(e,t,n){let r,s,a;r=!0,s=e,a={};let l=null,o=Di,c=!1,u="initialValue"in a,h=typeof r=="function"&&N(r);const f=new Set,[g,m]=(a.storage||O)(a.initialValue),[y,v]=O(void 0),[$,k]=O(void 0,{equals:!1}),[C,w]=O(u?"ready":"unresolved");function b(T,I,E,L){return l===T&&(l=null,L!==void 0&&(u=!0),(T===o||I===o)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(L,{value:I})),o=Di,A(I,E)),I}function A(T,I){an(()=>{I===void 0&&m(()=>T),w(I!==void 0?"errored":u?"ready":"unresolved"),v(I);for(const E of f.keys())E.decrement();f.clear()},!1)}function S(){const T=bh,I=g(),E=y();if(E!==void 0&&!l)throw E;return Pe&&Pe.user,I}function _(T=!0){if(T!==!1&&c)return;c=!1;const I=h?h():r;if(I==null||I===!1){b(l,Ae(g));return}const E=o!==Di?o:Ae(()=>s(I,{value:g(),refetching:T}));return ph(E)?(l=E,"value"in E?(E.status==="success"?b(l,E.value,void 0,I):b(l,void 0,ds(E.value),I),E):(c=!0,queueMicrotask(()=>c=!1),an(()=>{w(u?"refreshing":"pending"),k()},!1),E.then(L=>b(E,L,void 0,I),L=>b(E,void 0,ds(L),I)))):(b(l,E,void 0,I),E)}return Object.defineProperties(S,{state:{get:()=>C()},error:{get:()=>y()},loading:{get(){const T=C();return T==="pending"||T==="refreshing"}},latest:{get(){if(!u)return S();const T=y();if(T&&!l)throw T;return g()}}}),h?mh(()=>_(!1)):_(!1),[S,{refetch:_,mutate:m}]}function Oe(e){return an(e,!1)}function Ae(e){if(Pe===null)return e();const t=Pe;Pe=null;try{return e()}finally{Pe=t}}function le(e,t,n){const r=Array.isArray(e);let s,a=n&&n.defer;return l=>{let o;if(r){o=Array(e.length);for(let u=0;u<e.length;u++)o[u]=e[u]()}else o=e();if(a)return a=!1,l;const c=Ae(()=>t(o,s,l));return s=o,c}}function Pn(e){W(()=>Ae(e))}function ze(e){return Se===null||(Se.cleanups===null?Se.cleanups=[e]:Se.cleanups.push(e)),e}function $h(e,t){na||(na=Symbol("error")),Se=va(void 0,void 0,!0),Se.context={...Se.context,[na]:[t]};try{return e()}catch(n){$a(n)}finally{Se=Se.owner}}function cs(){return Pe}function Rr(){return Se}function mc(e,t){const n=Se,r=Pe;Se=e,Pe=null;try{return an(t,!0)}catch(s){$a(s)}finally{Se=n,Pe=r}}function _h(e){const t=Pe,n=Se;return Promise.resolve().then(()=>{Pe=t,Se=n;let r;return an(e,!1),Pe=Se=null,r?r.done:void 0})}const[E3,L3]=O(!1);function Zt(e,t){const n=Symbol("context");return{id:n,Provider:Sh(n),defaultValue:e}}function jt(e){let t;return Se&&Se.context&&(t=Se.context[e.id])!==void 0?t:e.defaultValue}function hi(e){const t=N(e),n=N(()=>us(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let bh;function pc(){if(this.sources&&this.state)if(this.state===sn)Nr(this);else{const e=$t;$t=null,an(()=>Ka(this),!1),$t=e}if(Pe){const e=this.observers?this.observers.length:0;Pe.sources?(Pe.sources.push(this),Pe.sourceSlots.push(e)):(Pe.sources=[this],Pe.sourceSlots=[e]),this.observers?(this.observers.push(Pe),this.observerSlots.push(Pe.sources.length-1)):(this.observers=[Pe],this.observerSlots=[Pe.sources.length-1])}return this.value}function vc(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&an(()=>{for(let s=0;s<e.observers.length;s+=1){const a=e.observers[s],l=Ri&&Ri.running;l&&Ri.disposed.has(a),(l?!a.tState:!a.state)&&(a.pure?$t.push(a):Wt.push(a),a.observers&&_c(a)),l||(a.state=sn)}if($t.length>1e6)throw $t=[],new Error},!1)),t}function Nr(e){if(!e.fn)return;oa(e);const t=ui;yh(e,e.value,t)}function yh(e,t,n){let r;const s=Se,a=Pe;Pe=Se=e;try{r=e.fn(t)}catch(l){return e.pure&&(e.state=sn,e.owned&&e.owned.forEach(oa),e.owned=null),e.updatedAt=n+1,$a(l)}finally{Pe=a,Se=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?vc(e,r):e.value=r,e.updatedAt=n)}function va(e,t,n,r=sn,s){const a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Se,context:Se?Se.context:null,pure:n};return Se===null||Se!==fc&&(Se.owned?Se.owned.push(a):Se.owned=[a]),a}function Wa(e){if(e.state===0)return;if(e.state===za)return Ka(e);if(e.suspense&&Ae(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ui);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===sn)Nr(e);else if(e.state===za){const r=$t;$t=null,an(()=>Ka(e,t[0]),!1),$t=r}}function an(e,t){if($t)return e();let n=!1;t||($t=[]),Wt?n=!0:Wt=[],ui++;try{const r=e();return wh(n),r}catch(r){n||(Wt=null),$t=null,$a(r)}}function wh(e){if($t&&($c($t),$t=null),e)return;const t=Wt;Wt=null,t.length&&an(()=>gc(t),!1)}function $c(e){for(let t=0;t<e.length;t++)Wa(e[t])}function kh(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Wa(r)}for(t=0;t<n;t++)Wa(e[t])}function Ka(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===sn?r!==t&&(!r.updatedAt||r.updatedAt<ui)&&Wa(r):s===za&&Ka(r,t)}}}function _c(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=za,n.pure?$t.push(n):Wt.push(n),n.observers&&_c(n))}}function oa(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const a=s.pop(),l=n.observerSlots.pop();r<s.length&&(a.sourceSlots[l]=r,s[r]=a,n.observerSlots[r]=l)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)oa(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)oa(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function ds(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Vl(e,t,n){try{for(const r of t)r(e)}catch(r){$a(r,n&&n.owner||null)}}function $a(e,t=Se){const n=na&&t&&t.context&&t.context[na],r=ds(e);if(!n)throw r;Wt?Wt.push({fn(){Vl(r,n,t)},state:sn}):Vl(r,n,t)}function us(e){if(typeof e=="function"&&!e.length)return us(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=us(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Sh(e,t){return function(r){let s;return P(()=>s=Ae(()=>(Se.context={...Se.context,[e]:r.value},hi(()=>r.children))),void 0),s}}const Ch=Symbol("fallback");function Gl(e){for(let t=0;t<e.length;t++)e[t]()}function Ah(e,t,n={}){let r=[],s=[],a=[],l=0,o=t.length>1?[]:null;return ze(()=>Gl(a)),()=>{let c=e()||[],u=c.length,h,f;return c[os],Ae(()=>{let m,y,v,$,k,C,w,b,A;if(u===0)l!==0&&(Gl(a),a=[],r=[],s=[],l=0,o&&(o=[])),n.fallback&&(r=[Ch],s[0]=ra(S=>(a[0]=S,n.fallback())),l=1);else if(l===0){for(s=new Array(u),f=0;f<u;f++)r[f]=c[f],s[f]=ra(g);l=u}else{for(v=new Array(u),$=new Array(u),o&&(k=new Array(u)),C=0,w=Math.min(l,u);C<w&&r[C]===c[C];C++);for(w=l-1,b=u-1;w>=C&&b>=C&&r[w]===c[b];w--,b--)v[b]=s[w],$[b]=a[w],o&&(k[b]=o[w]);for(m=new Map,y=new Array(b+1),f=b;f>=C;f--)A=c[f],h=m.get(A),y[f]=h===void 0?-1:h,m.set(A,f);for(h=C;h<=w;h++)A=r[h],f=m.get(A),f!==void 0&&f!==-1?(v[f]=s[h],$[f]=a[h],o&&(k[f]=o[h]),f=y[f],m.set(A,f)):a[h]();for(f=C;f<u;f++)f in v?(s[f]=v[f],a[f]=$[f],o&&(o[f]=k[f],o[f](f))):s[f]=ra(g);s=s.slice(0,l=u),r=c.slice(0)}return s});function g(m){if(a[f]=m,o){const[y,v]=O(f);return o[f]=v,t(c[f],y)}return t(c[f])}}}function i(e,t){return Ae(()=>e(t||{}))}function Sa(){return!0}const hs={get(e,t,n){return t===Kt?n:e.get(t)},has(e,t){return t===Kt?!0:e.has(t)},set:Sa,deleteProperty:Sa,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Sa,deleteProperty:Sa}},ownKeys(e){return e.keys()}};function Ni(e){return(e=typeof e=="function"?e():e)?e:{}}function Th(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Fe(...e){let t=!1;for(let l=0;l<e.length;l++){const o=e[l];t=t||!!o&&Kt in o,e[l]=typeof o=="function"?(t=!0,N(o)):o}if(hc&&t)return new Proxy({get(l){for(let o=e.length-1;o>=0;o--){const c=Ni(e[o])[l];if(c!==void 0)return c}},has(l){for(let o=e.length-1;o>=0;o--)if(l in Ni(e[o]))return!0;return!1},keys(){const l=[];for(let o=0;o<e.length;o++)l.push(...Object.keys(Ni(e[o])));return[...new Set(l)]}},hs);const n={},r=Object.create(null);for(let l=e.length-1;l>=0;l--){const o=e[l];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let u=c.length-1;u>=0;u--){const h=c[u];if(h==="__proto__"||h==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,h);if(!r[h])r[h]=f.get?{enumerable:!0,configurable:!0,get:Th.bind(n[h]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const g=n[h];g&&(f.get?g.push(f.get.bind(o)):f.value!==void 0&&g.push(()=>f.value))}}}const s={},a=Object.keys(r);for(let l=a.length-1;l>=0;l--){const o=a[l],c=r[o];c&&c.get?Object.defineProperty(s,o,c):s[o]=c?c.value:void 0}return s}function gi(e,...t){if(hc&&Kt in e){const s=new Set(t.length>1?t.flat():t[0]),a=t.map(l=>new Proxy({get(o){return l.includes(o)?e[o]:void 0},has(o){return l.includes(o)&&o in e},keys(){return l.filter(o=>o in e)}},hs));return a.push(new Proxy({get(l){return s.has(l)?void 0:e[l]},has(l){return s.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!s.has(l))}},hs)),a}const n={},r=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const a=Object.getOwnPropertyDescriptor(e,s),l=!a.get&&!a.set&&a.enumerable&&a.writable&&a.configurable;let o=!1,c=0;for(const u of t)u.includes(s)&&(o=!0,l?r[c][s]=a.value:Object.defineProperty(r[c],s,a)),++c;o||(l?n[s]=a.value:Object.defineProperty(n,s,a))}return[...r,n]}const bc=e=>`Stale read from <${e}>.`;function H(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Ah(()=>e.each,e.children,t||void 0))}function x(e){const t=e.keyed,n=N(()=>e.when,void 0,void 0),r=t?n:N(n,void 0,{equals:(s,a)=>!s==!a});return N(()=>{const s=r();if(s){const a=e.children;return typeof a=="function"&&a.length>0?Ae(()=>a(t?s:()=>{if(!Ae(r))throw bc("Show");return n()})):a}return e.fallback},void 0,void 0)}function z(e){const t=hi(()=>e.children),n=N(()=>{const r=t(),s=Array.isArray(r)?r:[r];let a=()=>{};for(let l=0;l<s.length;l++){const o=l,c=s[l],u=a,h=N(()=>u()?void 0:c.when,void 0,void 0),f=c.keyed?h:N(h,void 0,{equals:(g,m)=>!g==!m});a=()=>u()||(f()?[o,h,c]:void 0)}return a});return N(()=>{const r=n()();if(!r)return e.fallback;const[s,a,l]=r,o=l.children;return typeof o=="function"&&o.length>0?Ae(()=>o(l.keyed?a():()=>{var u;if(((u=Ae(n)())==null?void 0:u[0])!==s)throw bc("Match");return a()})):o},void 0,void 0)}function M(e){return e}let pr;function xh(){pr&&[...pr].forEach(e=>e())}function ct(e){let t;const[n,r]=O(t,void 0);return pr||(pr=new Set),pr.add(r),ze(()=>pr.delete(r)),N(()=>{let s;if(s=n()){const a=e.fallback;return typeof a=="function"&&a.length?Ae(()=>a(s,()=>r())):a}return $h(()=>e.children,r)},void 0,void 0)}const Ih=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Eh=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Ih]),Lh=new Set(["innerHTML","textContent","innerText","children"]),Ph=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Mh=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Dh(e,t){const n=Mh[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Rh=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Nh=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),Oh={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Fh(e,t,n){let r=n.length,s=t.length,a=r,l=0,o=0,c=t[s-1].nextSibling,u=null;for(;l<s||o<a;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[a-1];)s--,a--;if(s===l){const h=a<r?o?n[o-1].nextSibling:n[a-o]:c;for(;o<a;)e.insertBefore(n[o++],h)}else if(a===o)for(;l<s;)(!u||!u.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[a-1]&&n[o]===t[s-1]){const h=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--a],h),t[s]=n[a]}else{if(!u){u=new Map;let f=o;for(;f<a;)u.set(n[f],f++)}const h=u.get(t[l]);if(h!=null)if(o<h&&h<a){let f=l,g=1,m;for(;++f<s&&f<a&&!((m=u.get(t[f]))==null||m!==h+g);)g++;if(g>h-o){const y=t[l];for(;o<h;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const Hl="_$DX_DELEGATE";function Bh(e,t,n,r={}){let s;return ra(a=>{s=a,t===document?e():d(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function p(e,t,n,r){let s;const a=()=>{const o=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:r?o.firstChild:o.content.firstChild},l=t?()=>Ae(()=>document.importNode(s||(s=a()),!0)):()=>(s||(s=a())).cloneNode(!0);return l.cloneNode=l,l}function $e(e,t=window.document){const n=t[Hl]||(t[Hl]=new Set);for(let r=0,s=e.length;r<s;r++){const a=e[r];n.has(a)||(n.add(a),t.addEventListener(a,qh))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Uh(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function Vh(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Bt(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ja(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=a=>s.call(e,n[1],a))}else e.addEventListener(t,n,typeof n!="function"&&n)}function Gh(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let a,l;for(a=0,l=s.length;a<l;a++){const o=s[a];!o||o==="undefined"||t[o]||(jl(e,o,!1),delete n[o])}for(a=0,l=r.length;a<l;a++){const o=r[a],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(jl(e,o,!0),n[o]=c)}return n}function Hh(e,t,n){if(!t)return n?G(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,a;for(a in n)t[a]==null&&r.removeProperty(a),delete n[a];for(a in t)s=t[a],s!==n[a]&&(r.setProperty(a,s),n[a]=s);return n}function Lt(e,t={},n,r){const s={};return r||P(()=>s.children=ca(e,t.children,s.children)),P(()=>typeof t.ref=="function"&&ge(t.ref,e)),P(()=>jh(e,t,n,!0,s,!0)),s}function ge(e,t,n){return Ae(()=>e(t,n))}function d(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ca(e,t,r,n);P(s=>ca(e,t(),s,n),r)}function jh(e,t,n,r,s={},a=!1){t||(t={});for(const l in s)if(!(l in t)){if(l==="children")continue;s[l]=Yl(e,l,null,s[l],n,a,t)}for(const l in t){if(l==="children")continue;const o=t[l];s[l]=Yl(e,l,o,s[l],n,a,t)}}function Yh(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function jl(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,a=r.length;s<a;s++)e.classList.toggle(r[s],n)}function Yl(e,t,n,r,s,a,l){let o,c,u,h,f;if(t==="style")return Hh(e,n,r);if(t==="classList")return Gh(e,n,r);if(n===r)return r;if(t==="ref")a||n(e);else if(t.slice(0,3)==="on:"){const g=t.slice(3);r&&e.removeEventListener(g,r,typeof r!="function"&&r),n&&e.addEventListener(g,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const g=t.slice(10);r&&e.removeEventListener(g,r,!0),n&&e.addEventListener(g,n,!0)}else if(t.slice(0,2)==="on"){const g=t.slice(2).toLowerCase(),m=Rh.has(g);if(!m&&r){const y=Array.isArray(r)?r[0]:r;e.removeEventListener(g,y)}(m||n)&&(Ja(e,g,n,m),m&&$e([g]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")Vh(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(u=Lh.has(t))||!s&&((h=Dh(t,e.tagName))||(c=Eh.has(t)))||(o=e.nodeName.includes("-")||"is"in l))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?Bt(e,n):o&&!c&&!u?e[Yh(t)]=n:e[h||t]=n;else{const g=s&&t.indexOf(":")>-1&&Oh[t.split(":")[0]];g?Uh(e,g,t,n):G(e,Ph[t]||t,n)}return n}function qh(e){let t=e.target;const n=`$$${e.type}`,r=e.target,s=e.currentTarget,a=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),l=()=>{const c=t[n];if(c&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?c.call(t,u,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&a(t.host),!0},o=()=>{for(;l()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();a(c[0]);for(let u=0;u<c.length-2&&(t=c[u],!!l());u++){if(t._$host){t=t._$host,o();break}if(t.parentNode===s)break}}else o();a(r)}function ca(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const a=typeof t,l=r!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,a==="string"||a==="number"){if(a==="number"&&(t=t.toString(),t===n))return n;if(l){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=or(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||a==="boolean")n=or(e,n,r);else{if(a==="function")return P(()=>{let o=t();for(;typeof o=="function";)o=o();n=ca(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(gs(o,t,n,s))return P(()=>n=ca(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=or(e,n,r),l)return n}else c?n.length===0?ql(e,o,r):Fh(e,n,o):(n&&or(e),ql(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=or(e,n,r,t);or(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function gs(e,t,n,r){let s=!1;for(let a=0,l=t.length;a<l;a++){let o=t[a],c=n&&n[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))s=gs(e,o,c)||s;else if(u==="function")if(r){for(;typeof o=="function";)o=o();s=gs(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const h=String(o);c&&c.nodeType===3&&c.data===h?e.push(c):e.push(document.createTextNode(h))}}return s}function ql(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function or(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let a=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!a&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else a=!0}}else e.insertBefore(s,n);return[s]}const zh=!1,Wh="http://www.w3.org/2000/svg";function Kh(e,t=!1){return t?document.createElementNS(Wh,e):document.createElement(e)}function Jh(e,t){const n=N(e);return N(()=>{const r=n();switch(typeof r){case"function":return Ae(()=>r(t));case"string":const s=Nh.has(r),a=Kh(r,s);return Lt(a,t,s),a}})}function Oi(e){const[,t]=gi(e,["component"]);return Jh(()=>e.component,t)}function yc(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,a){if(n)return!(n=!1);const l={to:s,options:a,defaultPrevented:!1,preventDefault:()=>l.defaultPrevented=!0};for(const o of e)o.listener({...l,from:o.location,retry:c=>{c&&(n=!0),o.navigate(s,{...a,resolve:!1})}});return!l.defaultPrevented}return{subscribe:t,confirm:r}}let fs;function Gs(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),fs=window.history.state._depth}Gs();function Xh(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function Zh(e,t){let n=!1;return()=>{const r=fs;Gs();const s=r==null?null:fs-r;if(n){n=!1;return}s&&t(s)?(n=!0,window.history.go(-s)):e()}}const Qh=/^(?:[a-z0-9]+:)?\/\//i,eg=/^\/+|(\/)\/+$/g,wc="http://sr";function Wn(e,t=!1){const n=e.replace(eg,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function Ha(e,t,n){if(Qh.test(t))return;const r=Wn(e),s=n&&Wn(n);let a="";return!s||t.startsWith("/")?a=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?a=r+s:a=s,(a||"/")+Wn(t,!a)}function tg(e,t){if(e==null)throw new Error(t);return e}function ng(e,t){return Wn(e).replace(/\/*(\*.*)?$/g,"")+Wn(t)}function kc(e){const t={};return e.searchParams.forEach((n,r)=>{r in t?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),t}function rg(e,t,n){const[r,s]=e.split("/*",2),a=r.split("/").filter(Boolean),l=a.length;return o=>{const c=o.split("/").filter(Boolean),u=c.length-l;if(u<0||u>0&&s===void 0&&!t)return null;const h={path:l?"":"/",params:{}},f=g=>n===void 0?void 0:n[g];for(let g=0;g<l;g++){const m=a[g],y=m[0]===":",v=y?c[g]:c[g].toLowerCase(),$=y?m.slice(1):m.toLowerCase();if(y&&Fi(v,f($)))h.params[$]=v;else if(y||!Fi(v,$))return null;h.path+=`/${v}`}if(s){const g=u?c.slice(-u).join("/"):"";if(Fi(g,f(s)))h.params[s]=g;else return null}return h}}function Fi(e,t){const n=r=>r===e;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function ag(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,a)=>s+(a.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function Sc(e){const t=new Map,n=Rr();return new Proxy({},{get(r,s){return t.has(s)||mc(n,()=>t.set(s,N(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function ig(e,t){const n=new URLSearchParams(e);Object.entries(t).forEach(([s,a])=>{a==null||a===""||a instanceof Array&&!a.length?n.delete(s):a instanceof Array?(n.delete(s),a.forEach(l=>{n.append(s,String(l))})):n.set(s,String(a))});const r=n.toString();return r?`?${r}`:""}function Cc(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return Cc(r).reduce((a,l)=>[...a,...s.map(o=>o+l)],[])}const sg=100,Ac=Zt(),Hs=Zt(),_a=()=>tg(jt(Ac),"<A> and 'use' router primitives can be only used inside a Route."),lg=()=>jt(Hs)||_a().base,og=e=>{const t=lg();return N(()=>t.resolvePath(e()))},cg=e=>{const t=_a();return N(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},pn=()=>_a().navigatorFactory(),Qt=()=>_a().location,ne=()=>_a().params,xe=()=>{const e=Qt(),t=pn(),n=(r,s)=>{const a=Ae(()=>ig(e.search,r)+e.hash);t(a,{scroll:!1,resolve:!1,...s})};return[e.query,n]};function dg(e,t=""){const{component:n,preload:r,load:s,children:a,info:l}=e,o=!a||Array.isArray(a)&&!a.length,c={key:e,component:n,preload:r||s,info:l};return Tc(e.path).reduce((u,h)=>{for(const f of Cc(h)){const g=ng(t,f);let m=o?g:g.split("/*",1)[0];m=m.split("/").map(y=>y.startsWith(":")||y.startsWith("*")?y:encodeURIComponent(y)).join("/"),u.push({...c,originalPath:h,pattern:m,matcher:rg(m,!o,e.matchFilters)})}return u},[])}function ug(e,t=0){return{routes:e,score:ag(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const a=e[s],l=a.matcher(n);if(!l)return null;r.unshift({...l,route:a})}return r}}}function Tc(e){return Array.isArray(e)?e:[e]}function xc(e,t="",n=[],r=[]){const s=Tc(e);for(let a=0,l=s.length;a<l;a++){const o=s[a];if(o&&typeof o=="object"){o.hasOwnProperty("path")||(o.path="");const c=dg(o,t);for(const u of c){n.push(u);const h=Array.isArray(o.children)&&o.children.length===0;if(o.children&&!h)xc(o.children,u.pattern,n,r);else{const f=ug([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((a,l)=>l.score-a.score)}function Bi(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function hg(e,t,n){const r=new URL(wc),s=N(h=>{const f=e();try{return new URL(f,r)}catch{return console.error(`Invalid path ${f}`),h}},r,{equals:(h,f)=>h.href===f.href}),a=N(()=>s().pathname),l=N(()=>s().search,!0),o=N(()=>s().hash),c=()=>"",u=le(l,()=>kc(s()));return{get pathname(){return a()},get search(){return l()},get hash(){return o()},get state(){return t()},get key(){return c()},query:n?n(u):Sc(u)}}let jn;function gg(){return jn}function fg(e,t,n,r={}){const{signal:[s,a],utils:l={}}=e,o=l.parsePath||(V=>V),c=l.renderPath||(V=>V),u=l.beforeLeave||yc(),h=Ha("",r.base||"");if(h===void 0)throw new Error(`${h} is not a valid base path`);h&&!s().value&&a({value:h,replace:!0,scroll:!1});const[f,g]=O(!1);let m;const y=(V,X)=>{X.value===v()&&X.state===k()||(m===void 0&&g(!0),jn=V,m=X,_h(()=>{m===X&&($(m.value),C(m.state),xh(),A[1](j=>j.filter(K=>K.pending)))}).finally(()=>{m===X&&Oe(()=>{jn=void 0,V==="navigate"&&R(m),g(!1),m=void 0})}))},[v,$]=O(s().value),[k,C]=O(s().state),w=hg(v,k,l.queryWrapper),b=[],A=O([]),S=N(()=>typeof r.transformUrl=="function"?Bi(t(),r.transformUrl(w.pathname)):Bi(t(),w.pathname)),_=()=>{const V=S(),X={};for(let j=0;j<V.length;j++)Object.assign(X,V[j].params);return X},T=l.paramsWrapper?l.paramsWrapper(_,t):Sc(_),I={pattern:h,path:()=>h,outlet:()=>null,resolvePath(V){return Ha(h,V)}};return P(le(s,V=>y("native",V),{defer:!0})),{base:I,location:w,params:T,isRouting:f,renderPath:c,parsePath:o,navigatorFactory:L,matches:S,beforeLeave:u,preloadRoute:B,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:A};function E(V,X,j){Ae(()=>{if(typeof X=="number"){X&&(l.go?l.go(X):console.warn("Router integration does not support relative routing"));return}const K=!X||X[0]==="?",{replace:ae,resolve:re,scroll:Q,state:J}={replace:!1,resolve:!K,scroll:!0,...j},pe=re?V.resolvePath(X):Ha(K&&w.pathname||"",X);if(pe===void 0)throw new Error(`Path '${X}' is not a routable path`);if(b.length>=sg)throw new Error("Too many redirects");const ve=v();(pe!==ve||J!==k())&&(zh||u.confirm(pe,j)&&(b.push({value:ve,replace:ae,scroll:Q,state:k()}),y("navigate",{value:pe,state:J})))})}function L(V){return V=V||jt(Hs)||I,(X,j)=>E(V,X,j)}function R(V){const X=b[0];X&&(a({...V,replace:X.replace,scroll:X.scroll}),b.length=0)}function B(V,X){const j=Bi(t(),V.pathname),K=jn;jn="preload";for(let ae in j){const{route:re,params:Q}=j[ae];re.component&&re.component.preload&&re.component.preload();const{preload:J}=re;X&&J&&mc(n(),()=>J({params:Q,location:{pathname:V.pathname,search:V.search,hash:V.hash,query:kc(V),state:null,key:""},intent:"preload"}))}jn=K}}function mg(e,t,n,r){const{base:s,location:a,params:l}=e,{pattern:o,component:c,preload:u}=r().route,h=N(()=>r().path);c&&c.preload&&c.preload();const f=u?u({params:l,location:a,intent:jn||"initial"}):void 0;return{parent:t,pattern:o,path:h,outlet:()=>c?i(c,{params:l,location:a,data:f,get children(){return n()}}):n(),resolvePath(m){return Ha(s.path(),m,h())}}}const pg=e=>t=>{const{base:n}=t,r=hi(()=>t.children),s=N(()=>xc(r(),t.base||""));let a;const l=fg(e,s,()=>a,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(l),i(Ac.Provider,{value:l,get children(){return i(vg,{routerState:l,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[N(()=>(a=Rr())&&null),i($g,{routerState:l,get branches(){return s()}})]}})}})};function vg(e){const t=e.routerState.location,n=e.routerState.params,r=N(()=>e.preload&&Ae(()=>{e.preload({params:n,location:t,intent:gg()||"initial"})}));return i(x,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:s=>i(s,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function $g(e){const t=[];let n;const r=N(le(e.routerState.matches,(s,a,l)=>{let o=a&&s.length===a.length;const c=[];for(let u=0,h=s.length;u<h;u++){const f=a&&a[u],g=s[u];l&&f&&g.route.key===f.route.key?c[u]=l[u]:(o=!1,t[u]&&t[u](),ra(m=>{t[u]=m,c[u]=mg(e.routerState,c[u-1]||e.routerState.base,zl(()=>r()[u+1]),()=>e.routerState.matches()[u])}))}return t.splice(s.length).forEach(u=>u()),l&&o?l:(n=c[0],c)}));return zl(()=>r()&&n)()}const zl=e=>()=>i(x,{get when(){return e()},keyed:!0,children:t=>i(Hs.Provider,{value:t,get children(){return t.outlet()}})}),oe=e=>{const t=hi(()=>e.children);return Fe(e,{get children(){return t()}})};function _g([e,t],n,r){return[e,r?s=>t(r(s)):t]}function bg(e){let t=!1;const n=s=>typeof s=="string"?{value:s}:s,r=_g(O(n(e.get()),{equals:(s,a)=>s.value===a.value&&s.state===a.state}),void 0,s=>(!t&&e.set(s),s));return e.init&&ze(e.init((s=e.get())=>{t=!0,r[1](n(s)),t=!1})),pg({signal:r,create:e.create,utils:e.utils})}function yg(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function wg(e,t){const n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const kg=new Map;function Sg(e=!0,t=!1,n="/_server",r){return s=>{const a=s.base.path(),l=s.navigatorFactory(s.base);let o,c;function u(v){return v.namespaceURI==="http://www.w3.org/2000/svg"}function h(v){if(v.defaultPrevented||v.button!==0||v.metaKey||v.altKey||v.ctrlKey||v.shiftKey)return;const $=v.composedPath().find(S=>S instanceof Node&&S.nodeName.toUpperCase()==="A");if(!$||t&&!$.hasAttribute("link"))return;const k=u($),C=k?$.href.baseVal:$.href;if((k?$.target.baseVal:$.target)||!C&&!$.hasAttribute("state"))return;const b=($.getAttribute("rel")||"").split(/\s+/);if($.hasAttribute("download")||b&&b.includes("external"))return;const A=k?new URL(C,document.baseURI):new URL(C);if(!(A.origin!==window.location.origin||a&&A.pathname&&!A.pathname.toLowerCase().startsWith(a.toLowerCase())))return[$,A]}function f(v){const $=h(v);if(!$)return;const[k,C]=$,w=s.parsePath(C.pathname+C.search+C.hash),b=k.getAttribute("state");v.preventDefault(),l(w,{resolve:!1,replace:k.hasAttribute("replace"),scroll:!k.hasAttribute("noscroll"),state:b?JSON.parse(b):void 0})}function g(v){const $=h(v);if(!$)return;const[k,C]=$;r&&(C.pathname=r(C.pathname)),s.preloadRoute(C,k.getAttribute("preload")!=="false")}function m(v){clearTimeout(o);const $=h(v);if(!$)return c=null;const[k,C]=$;c!==k&&(r&&(C.pathname=r(C.pathname)),o=setTimeout(()=>{s.preloadRoute(C,k.getAttribute("preload")!=="false"),c=k},20))}function y(v){if(v.defaultPrevented)return;let $=v.submitter&&v.submitter.hasAttribute("formaction")?v.submitter.getAttribute("formaction"):v.target.getAttribute("action");if(!$)return;if(!$.startsWith("https://action/")){const C=new URL($,wc);if($=s.parsePath(C.pathname+C.search),!$.startsWith(n))return}if(v.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const k=kg.get($);if(k){v.preventDefault();const C=new FormData(v.target,v.submitter);k.call({r:s,f:v.target},v.target.enctype==="multipart/form-data"?C:new URLSearchParams(C))}}$e(["click","submit"]),document.addEventListener("click",f),e&&(document.addEventListener("mousemove",m,{passive:!0}),document.addEventListener("focusin",g,{passive:!0}),document.addEventListener("touchstart",g,{passive:!0})),document.addEventListener("submit",y),ze(()=>{document.removeEventListener("click",f),e&&(document.removeEventListener("mousemove",m),document.removeEventListener("focusin",g),document.removeEventListener("touchstart",g)),document.removeEventListener("submit",y)})}}function Cg(e){const t=()=>{const r=window.location.pathname.replace(/^\/+/,"/")+window.location.search,s=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:r+window.location.hash,state:s}},n=yc();return bg({get:t,set({value:r,replace:s,scroll:a,state:l}){s?window.history.replaceState(Xh(l),"",r):window.history.pushState(l,"",r),wg(decodeURIComponent(window.location.hash.slice(1)),a),Gs()},init:r=>yg(window,"popstate",Zh(r,s=>{if(s&&s<0)return!n.confirm(s);{const a=t();return!n.confirm(a.value,{state:a.state})}})),create:Sg(e.preload,e.explicitLinks,e.actionBase,e.transformUrl),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var Ag=p("<a>");function U(e){e=Fe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=gi(e,["href","state","class","activeClass","inactiveClass","end"]),n=og(()=>e.href),r=cg(n),s=Qt(),a=N(()=>{const l=n();if(l===void 0)return[!1,!1];const o=Wn(l.split(/[?#]/,1)[0]).toLowerCase(),c=decodeURI(Wn(s.pathname).toLowerCase());return[e.end?o===c:c.startsWith(o+"/")||c===o,o===c]});return(()=>{var l=Ag();return Lt(l,Fe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!a()[0],[e.activeClass]:a()[0],...t.classList}},link:"",get"aria-current"(){return a()[1]?"page":void 0}}),!1,!1),l})()}function hn(e){const t=pn(),n=Qt(),{href:r,state:s}=e,a=typeof r=="function"?r({navigate:t,location:n}):r;return t(a,{replace:!0,state:s}),null}const ms=Symbol("store-raw"),br=Symbol("store-node"),gn=Symbol("store-has"),Ic=Symbol("store-self");function Ec(e){let t=e[Kt];if(!t&&(Object.defineProperty(e,Kt,{value:t=new Proxy(e,Ig)}),!Array.isArray(e))){const n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let s=0,a=n.length;s<a;s++){const l=n[s];r[l].get&&Object.defineProperty(e,l,{enumerable:r[l].enumerable,get:r[l].get.bind(t)})}}return t}function An(e){let t;return e!=null&&typeof e=="object"&&(e[Kt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function Pr(e,t=new Set){let n,r,s,a;if(n=e!=null&&e[ms])return n;if(!An(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let l=0,o=e.length;l<o;l++)s=e[l],(r=Pr(s,t))!==s&&(e[l]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const l=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,u=l.length;c<u;c++)a=l[c],!o[a].get&&(s=e[a],(r=Pr(s,t))!==s&&(e[a]=r))}return e}function Xa(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function da(e,t,n){if(e[t])return e[t];const[r,s]=O(n,{equals:!1,internal:!0});return r.$=s,e[t]=r}function Tg(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===Kt||t===br||(delete n.value,delete n.writable,n.get=()=>e[Kt][t]),n}function Lc(e){cs()&&da(Xa(e,br),Ic)()}function xg(e){return Lc(e),Reflect.ownKeys(e)}const Ig={get(e,t,n){if(t===ms)return e;if(t===Kt)return n;if(t===os)return Lc(e),n;const r=Xa(e,br),s=r[t];let a=s?s():e[t];if(t===br||t===gn||t==="__proto__")return a;if(!s){const l=Object.getOwnPropertyDescriptor(e,t);cs()&&(typeof a!="function"||e.hasOwnProperty(t))&&!(l&&l.get)&&(a=da(r,t,a)())}return An(a)?Ec(a):a},has(e,t){return t===ms||t===Kt||t===os||t===br||t===gn||t==="__proto__"?!0:(cs()&&da(Xa(e,gn),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:xg,getOwnPropertyDescriptor:Tg};function Nt(e,t,n,r=!1){if(!r&&e[t]===n)return;const s=e[t],a=e.length;n===void 0?(delete e[t],e[gn]&&e[gn][t]&&s!==void 0&&e[gn][t].$()):(e[t]=n,e[gn]&&e[gn][t]&&s===void 0&&e[gn][t].$());let l=Xa(e,br),o;if((o=da(l,t,s))&&o.$(()=>n),Array.isArray(e)&&e.length!==a){for(let c=e.length;c<a;c++)(o=l[c])&&o.$();(o=da(l,"length",a))&&o.$(e.length)}(o=l[Ic])&&o.$()}function Pc(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];Nt(e,s,t[s])}}function Eg(e,t){if(typeof t=="function"&&(t=t(e)),t=Pr(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const s=t[n];e[n]!==s&&Nt(e,n,s)}Nt(e,"length",r)}else Pc(e,t)}function Qr(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const l=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)Qr(e,[r[c]].concat(t),n);return}else if(o&&l==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&Qr(e,[c].concat(t),n);return}else if(o&&l==="object"){const{from:c=0,to:u=e.length-1,by:h=1}=r;for(let f=c;f<=u;f+=h)Qr(e,[f].concat(t),n);return}else if(t.length>1){Qr(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let a=t[0];typeof a=="function"&&(a=a(s,n),a===s)||r===void 0&&a==null||(a=Pr(a),r===void 0||An(s)&&An(a)&&!Array.isArray(a)?Pc(s,a):Nt(e,r,a))}function We(...[e,t]){const n=Pr(e||{}),r=Array.isArray(n),s=Ec(n);function a(...l){Oe(()=>{r&&l.length===1?Eg(n,l[0]):Qr(n,l)})}return[s,a]}const ps=Symbol("store-root");function hr(e,t,n,r,s){const a=t[n];if(e===a)return;const l=Array.isArray(e);if(n!==ps&&(!An(e)||!An(a)||l!==Array.isArray(a)||s&&e[s]!==a[s])){Nt(t,n,e);return}if(l){if(e.length&&a.length&&(!r||s&&e[0]&&e[0][s]!=null)){let u,h,f,g,m,y,v,$;for(f=0,g=Math.min(a.length,e.length);f<g&&(a[f]===e[f]||s&&a[f]&&e[f]&&a[f][s]===e[f][s]);f++)hr(e[f],a,f,r,s);const k=new Array(e.length),C=new Map;for(g=a.length-1,m=e.length-1;g>=f&&m>=f&&(a[g]===e[m]||s&&a[g]&&e[m]&&a[g][s]===e[m][s]);g--,m--)k[m]=a[g];if(f>m||f>g){for(h=f;h<=m;h++)Nt(a,h,e[h]);for(;h<e.length;h++)Nt(a,h,k[h]),hr(e[h],a,h,r,s);a.length>e.length&&Nt(a,"length",e.length);return}for(v=new Array(m+1),h=m;h>=f;h--)y=e[h],$=s&&y?y[s]:y,u=C.get($),v[h]=u===void 0?-1:u,C.set($,h);for(u=f;u<=g;u++)y=a[u],$=s&&y?y[s]:y,h=C.get($),h!==void 0&&h!==-1&&(k[h]=a[u],h=v[h],C.set($,h));for(h=f;h<e.length;h++)h in k?(Nt(a,h,k[h]),hr(e[h],a,h,r,s)):Nt(a,h,e[h])}else for(let u=0,h=e.length;u<h;u++)hr(e[u],a,u,r,s);a.length>e.length&&Nt(a,"length",e.length);return}const o=Object.keys(e);for(let u=0,h=o.length;u<h;u++)hr(e[o[u]],a,o[u],r,s);const c=Object.keys(a);for(let u=0,h=c.length;u<h;u++)e[c[u]]===void 0&&Nt(a,c[u],void 0)}function Jt(e,t={}){const{merge:n,key:r="id"}=t,s=Pr(e);return a=>{if(!An(a)||!An(s))return s;const l=hr(s,{[ps]:a},ps,n,r);return l===void 0?a:l}}const Mc=Zt(),js=()=>jt(Mc),Dc=Zt(),tt=()=>jt(Dc),Rc=Zt(),Ys=()=>jt(Rc),Nc=Zt(),ce=()=>jt(Nc),Oc=Zt(),en=()=>jt(Oc),Fc=Zt(),qs=()=>jt(Fc),Bc=Zt(),zs=()=>jt(Bc),Uc=Zt(),Vc=()=>jt(Uc),Ws=Zt(),vn=()=>jt(Ws);var Lg=p("<div class=cp-install-pwa-container>Install as Progressive Web App to get more screen space.<button>Install</button><button>Not now");function Pg(){const{isTouch:e,isPWA:t}=en(),[n,r]=O(!1),[s,a]=O(!1);let l;return window.addEventListener("beforeinstallprompt",o=>{l=o,r(!0)}),i(x,{get when(){return N(()=>!!(n()&&e()))()&&!t()},get children(){var o=Lg(),c=o.firstChild,u=c.nextSibling,h=u.nextSibling;return d(o,i(x,{get when(){return s()},children:" Failed to install"}),u),u.$$click=async()=>{if(l!==null){l.prompt();const{outcome:f}=await l.userChoice;if(f==="accepted")return l=null,r(!1)}a(!0)},h.$$click=()=>r(!1),o}})}$e(["click"]);const Tn=location.hostname==="localhost",zt={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};zt.flavorTexts=fi(zt);const Kn={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};Kn.flavorTexts=fi(Kn);const ua={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};ua.flavorTexts=fi(ua);const Sn={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};Sn.flavorTexts=fi(Sn);const Gc={CN:{flavorText:"China"},JP:{flavorText:"Japan"},KR:{flavorText:"South Korea"},TW:{flavorText:"Taiwan"}},Ks={anime:{api:"ANIME",flavorText:"Anime"},comic:{api:"COMIC",flavorText:"Comic"},doujinshi:{api:"DOUJINSHI",flavorText:"Doujinshi"},game:{api:"GAME",flavorText:"Game"},light_novel:{api:"LIGHT_NOVEL",flavorText:"Light Novel"},live_action:{api:"LIVE_ACTION",flavorText:"Live Action"},manga:{api:"MANGA",flavorText:"Manga"},multimedia_project:{api:"MULTIMEDIA_PROJECT",flavorText:"Multimedia Project"},novel:{api:"NOVEL",flavorText:"Novel"},original:{api:"ORIGINAL",flavorText:"Original"},other:{api:"OTHER",flavorText:"Other"},picture_book:{api:"PICTURE_BOOK",flavorText:"Picture Book"},video_game:{api:"VIDEO_GAME",flavorText:"Video Game"},visual_novel:{api:"VISUAL_NOVEL",flavorText:"Visual Novel"},web_novel:{api:"WEB_NOVEL",flavorText:"Web Novel"}};function fi(e){return Object.values(e).reduce((t,n)=>Object.values(n).reduce((r,s)=>Object.entries(s).reduce((a,[l,o])=>(a[l]=o.flavorText,a),r),t),{})}const Mn="anilist",Qn="jikan",Hc="animethemes",Wl="LOB_DEV_BRANCH",vs="ani",Za="mal",mi="only-if-cached",Mg="default",Dg="fetch-once",Rg="reload",jc="no-store",ba="anime",Yc="manga",Ng="ANIME",qc="Japanese",zc="Not yet aired",Og="Finished Airing",Fg="Currently Airing",Bg="Publishing",Kl="Finished",Ug="Discontinued",Vg="On Hiatus",ha=e=>typeof e=="object"&&e,Js=(e,...t)=>{ed(t.length<1,"Give more objects");for(const n of t)Wc(e,n);return e},Wc=(e,t)=>{for(const n in t)e[n]??(e[n]=t[n]),ha(e[n])&&ha(t[n])?Wc(e[n],t[n]):e[n]=t[n]},Gg=(e,...t)=>{ed(t.length<1,"Give more objects");for(const n of t)Kc(e,n);return e},Kc=(e,t)=>{for(const n in t){if(n in e)ha(e[n])||(e[n]=t[n]);else continue;ha(t[n])&&Kc(e[n],t[n])}},F=(e,t="Not true")=>{if(!e)throw new Error(t)},Jc=(e,t="Not false")=>F(!e,t),Hg=(e="Assert unreachable")=>F(!1,e),It=(e,t="Value",n="")=>F(typeof e=="string",t+" is not type of string. "+n),fn=(e,t="Value",n="")=>F(typeof e=="function",t+" is not type of function. "+n),Xc=(e,t="Value",n="")=>F(Number.isInteger(e),t+" is not type of integer. "+n),pi=(e,t="Value",n="")=>{const r=t+" is not integer. "+n;F(typeof e=="string"||Number.isInteger(e),r),F(e&&Number.isInteger(+e),r)},jg=(e,t="Value is not type Array",n)=>{vi(Array.isArray(e),t)},Zc=(e,t="Value is not type String",n)=>{vi(typeof e=="string",t)},Qc=(e,t="Value is not type Integer",n)=>{vi(Number.isInteger(e),t)},Yg=(e,t="Value is not thruthy",n)=>{vi(e,t)},ed=(e,t="Value is not falsy",n)=>{qg(e,t)},qg=(e,t,n)=>{e&&td(t)},vi=(e,t,n)=>{e||td(t)},td=(e,t)=>{throw e??(e="Assertion failed."),new Error(e)},Dn=e=>Array.isArray(e);function Xt(e,t){if(e){if(Dn(e))return Object.fromEntries(e.map(n=>[n,!0]))}else return t||null;return{[e]:!0}}function Ke(e){return Dn(e)?e:e?[e]:[]}const zg=(...e)=>{const t=[];for(const n of e)t.push(...Ke(n));return t},Jl=(e,t)=>(e=Ke(e),e.includes(t)),Wg=(e,...t)=>Ke(e).filter(n=>!t.includes(n)),Xl=(e,t,n)=>(e=Ke(e),(n===void 0?e.includes(t):n)?e=Wg(e,t):e.push(t),e);function vr(e){return new Set(Ke(e))}function Kg(e){F(Dn(e),"Not array");const t=new Map;return e.forEach(n=>t.set(n.toLowerCase(),n)),Array.from(t.values())}function ea(e,t){return e===t?!0:typeof e!=typeof t?!1:Dn(e)?e.length===t.length&&e.every((n,r)=>ea(n,t[r])):!1}function qt(e){return Dn(e)?e[0]:e}function nd(e,t,n=0,r=e.length-1){for(;n<=r;){const s=(r+n)/2|0,a=t(e[s],s,e);if(a===0)return s;a<0?r=s-1:n=s+1}return-1}function yr(e,t,n=0,r=e.length-1){let s=null;for(;n<=r;){const l=(r+n)/2|0;if(s=t(e[l],l,e),s===0)return l;s<0?r=l-1:n=l+1}return s===null?0:((r+n)/2|0)==e.length-1?s<0?e.length-1:e.length:s<0?r+1:n-1}const Jg=(e,t,n)=>(fn(t),!Dn(e)||e.length===0?n:e.find(t)??e[0]??n),Xg=(e,t,n)=>!Dn(e)||e.length===0?n:e.at(t%e.length);function ga(e,t){if(Dn(e))return e[Math.round((e.length-1)*t)]}const Ne=e=>e!==1?"s":"",Je=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Xs=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},Zg=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"China";case"TW":return"Taiwan";case"KR":return"South Korea";default:return"Japan"}},Mr=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Je(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}};function Qg(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Je(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:return console.error("Unknown status"),e}}const ye=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Zl=e=>{if(e!=null)return F(typeof e=="number","Number is not typeof number"),Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e)},Xe=e=>(F(e!=null,"No title given"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Ge=e=>(F(e.type,"type is missing"),F("id"in e,"id is missing"),"/ani/"+e.type.toLowerCase()+"/"+e.id+"/"+Xe(e.title.userPreferred)),Qa=e=>{if(F("year"in e,"No year found"),F("month"in e,"No month found"),F("day"in e,"No day found"),!e.year&&!e.month&&!e.day)return"";if(e.year&&!e.month&&!e.day)return e.year.toString();const t={};return e.year&&(t.year="numeric"),e.month&&(t.month="short"),e.day&&(t.day="numeric"),new Date(e.year||1970,e.month-1||0,e.day||1).toLocaleDateString("us-US",t)},rd=e=>{const t=new Date(e),n={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString("us-US",n)};function Ca(e,t){t&&e(Ge(t))}const Zs=e=>typeof e=="function",ad=e=>Zs(e)?e():e,ef=(e,t)=>{fn(e);const n=[];for(const r of t){const s=ad(r);if(s===void 0)return;n.push(s)}return e(...n)},Me=(e,...t)=>N(()=>ef(e,t)),tf=[mi,Mg,Dg,Rg,jc],xn=e=>N(()=>{for(const t of tf)if(ad(e[t]))return t});class nf{constructor(t={}){this.expiresInSeconds=t.expiresInSeconds,this.fetchOnDebug=t.fetchOnDebug||!1,this.storeName=t.storeName||"",this.type=t.type||"default",this.saveToSessionStorage=t.saveToSessionStorage,F(typeof t=="object","Settings must be object"),F(!t.active||typeof t.active=="function","settings.active should a signal"),F(t.type==="no-store"||Number.isInteger(t.expiresInSeconds),"Give explicit expiration time. 0 if the data never expires"),F(t.type==="no-store"||t.expiresInSeconds>0,"Expiration time should be more than 0"),F(t.type!=="no-store"||!t.storeName,"StoreName is not used because cache type is no-store"),F(!t.saveToSessionStorage||typeof t.saveToSessionStorage=="function","saveToSessionStorage is not function")}}class Qs{constructor(t,n,r){F(t,"URL is missing"),this.url=t,this.options=n,this.formatResponse=r,this.settings=new nf({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365})}get cacheKey(){var t;return`${this.url}${((t=JSON.stringify(this.options))==null?void 0:t.replaceAll('"',""))||""}${this.formatResponse||""}`}}const $i=(e,t)=>(e&&(e.settings.type=t),e),rf=(e,t)=>(yf(e.url),af(e,t).finally(()=>wf(e.url))),af=(e,t)=>{const n={...e.options||{},signal:t};if(n.body&&(n.body=JSON.stringify(e.options.body)),n.cache??(n.cache="default"),Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",n);case 2:return fetch("https://http.codes/500",n);case 3:return fetch("https://http.codes/cors",n)}else return e.delay?new Promise((r,s)=>{fetch(e.url,n).then(a=>setTimeout(()=>r(a),e.delay)).catch(s)}):fetch(e.url,n)},Aa={},Ta={};let Ui=0;const sf=async(e,t)=>{var s,a,l;try{const{resolve:o,promise:c}=Promise.withResolvers();for(let u=0;u<3&&!t.aborted;u++){bf(e.url)&&(Ia(e.url,o),await c);try{var n=await(Aa[s=e.cacheKey]??(Aa[s]=rf(e,t)))}catch{if(t.aborted)return null}finally{delete Aa[e.cacheKey]}const h=$f(e.url,(n==null?void 0:n.status)||"cors");if((n==null?void 0:n.status)===429&&n.headers.get("Retry-After")){Ia(e.url,o);const f=parseInt(n.headers.get("Retry-After"));await new Promise(g=>setTimeout(g,f*1e3));continue}else if((n==null?void 0:n.status)===400&&Ui<3){if(Ia(e.url,o),(await n.json()).errors.some(g=>g.message==="Invalid token")){Ui++,await new Promise(g=>setTimeout(g,3e3));continue}}else if(h){Ia(e.url,o),await new Promise(f=>setTimeout(f,h));continue}else if(!(n!=null&&n.ok))return null;e.url.includes(Mn)&&(Ui=0);try{var r=await(Ta[a=e.cacheKey]??(Ta[a]=n.json()))}catch(f){return console.error(f),null}finally{delete Ta[e.cacheKey]}return((l=e.formatResponse)==null?void 0:l.call(e,r))||r}}finally{_f(e.url)}return null},ya=(e,t,n=1)=>{const r=[];let s=null,a=!1;async function l(...c){r.push(async()=>{r.shift(),a=!0,await e(...c),a=!1,o(t)}),r.length==n+1&&r.shift(),!a&&(s===null?o():o(t))}return l.bufferSize=()=>r.length,l;function o(c){const u=r[0];clearTimeout(s),s=null,u&&(c?s=setTimeout(u,c):(a=!0,u()))}},id=e=>{let t;const n=(r,...s)=>{clearTimeout(t),t=setTimeout(()=>e(...s),r)};return ze(()=>clearTimeout(t)),n},lf=e=>{const t=new Date;return t.setMilliseconds(t.getMilliseconds()+e),t},of=e=>lf(e*1e3),fa=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},cf=e=>!isNaN(e)&&typeof e=="number",df=(e,t)=>{const n=Number(e);return cf(n)?n:t},uf=(e,t)=>Math.max(e??t,t??e),xa=(e,t,n)=>e+n*(t-e),Ql=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",hf=e=>{if(!(e!=null&&e.length))return"";switch(e){case Og:case Kl:return Kl;case zc:return"Not yet released";case Fg:case Bg:return"Releasing";case Ug:return"Cancelled";case Vg:return"On hiatus";default:return console.error("Unknown media format"),e}},sd=(e,t)=>"/mal/"+e+"/"+t.mal_id+"/"+Jn(t.title),gf=e=>"/mal/character/"+e.mal_id+"/"+Jn(e.name),ld=e=>{It(e.type,"Media type"),Xc(e.id,"Media id");const t="/ani/"+e.type.toLowerCase()+"/"+e.id;return e.title.userPreferred?t+"/"+Jn(e.title.userPreferred):t},ff=()=>location.hostname==="kassu11.github.io"?24951:location.port==5173?7936:location.port==5174?31649:-1,Jn=e=>(It(e,"title"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),mf=e=>e!==1?"s":"",Dr=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",pf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},vf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"ANIME":case"COMIC":case"DOUJINSHI":case"GAME":case"MANGA":case"NOVEL":case"ORIGINAL":case"OTHER":return Dr(e);case"LIGHT_NOVEL":case"LIVE_ACTION":case"MULTIMEDIA_PROJECT":case"PICTURE_BOOK":case"VISUAL_NOVEL":case"VIDEO_GAME":case"WEB_NOVEL":return Dr(e.replace("_"," "));default:return console.error("Unknown media format"),e}},$s=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Dr(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}},od=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CANCELLED":case"FINISHED":case"HIATUS":case"NOT_YET_RELEASED":case"RELEASING":return Dr(e.replaceAll("_"," "));default:return console.error("Unknown media format"),e}},$f=(e,t)=>{if(e.includes(Mn))switch(t){case 429:return 25e3;case 500:return 3e3;case"cors":return 4e4}if(e.includes(Qn))switch(t){case 429:return 1e3}if(e.includes(Hc))switch(t){case 429:return 25e3}},Ia=(e,t)=>{e.includes(Mn)?Lm(t):e.includes(Qn)&&Rm(t)},_f=e=>{e.includes(Mn)?Pm():e.includes(Qn)&&Nm()},bf=e=>{if(e.includes(Mn))return Ot!==null;if(e.includes(Qn))return Ft!==null},yf=e=>{e.includes(Mn)?Em():e.includes(Qn)&&Dm()},wf=e=>{e.includes(Mn)?Mm():e.includes(Qn)&&Om()},er=(e,t,n={},r)=>{F(t.length>10,"Query must be above of length 10");const s={"Content-Type":"application/json"};return e&&(s.Authorization="Bearer "+e),new Qs("https://graphql.anilist.co",{method:"POST",headers:s,body:{query:t,variables:n}},r)},el=(e,t,n={},r)=>{const s=er(e,t,n,r);return $i(s,jc)},In=(e,t)=>new Qs(e,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},t),tl=e=>e.data.Page,cd=(e,t,n=1)=>el(e,xd,{...t,page:n},tl),kf=(e,t)=>{const n=cd(e,t,"pageless");return $i(n,mi)},Sf=({token:e,id:t,isMalId:n,type:r})=>n?dd(e,r,t):er(e,nl,{id:t},s=>s.data.Media),tn=(e,t)=>{var r,s;F(t.id_in||t.idMal_in,"Missing list for ids");const n=((r=t.id_in)==null?void 0:r.length)||((s=t.idMal_in)==null?void 0:s.length);if(n)return er(e,nm(n),t,a=>Object.values(a.data).map(l=>l.media).flat())},Cf=(e,t,n=1)=>er(e,Nf,{id:t,page:n},r=>r.data.Media.recommendations),dd=(e,t,n)=>er(e,nl,{idMal:n,type:t.toUpperCase()},r=>r.data.Media),Af=({token:e,id:t,...n})=>{if(t)return er(e,Ad,{id:t,...n},tl)},Tf=e=>{switch(e){case"airing":return["AIRING"];case"activity":return["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"];case"forum":return["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"];case"follows":return["FOLLOWING"];case"media":return["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"];case"all":return;default:Hg("Unknown notification type")}},ud=(e,t,n=1)=>{const r=Tf(t);return el(e,Gn,{page:n,types:r},tl)},xf=(e,t)=>{const n=ud(e,t,"pageless");return $i(n,mi)},hd=(e,t,n=1)=>el(e,Td,{id:t,page:n},r=>r.data.Media),If=(e,t)=>{const n=hd(e,t,"pageless");return $i(n,mi)},Ef=({name:e,type:t,token:n})=>(F(e,"Name is missing"),er(n,_s,{userName:e.toLowerCase(),type:t.toUpperCase()},r=>r.data.MediaListCollection)),gd=(e,t)=>{switch(It(e,"type"),pi(t,"id"),e){case ba:return In(vd(t),n=>n.data);case Yc:return In($d(t),n=>n.data)}},fd=(e,t)=>{switch(It(e,"type"),pi(t,"id"),e){case ba:return In(_d(t),n=>n.data);case Yc:return In(bd(t),n=>n.data)}},md=(e,t)=>{if(It(e,"type"),pi(t,"id"),e===ba)return In(yd(t),n=>n.data)},Lf=e=>(pi(e,"id"),In(Uf(e),t=>t.data)),eo=e=>{var t,n;return((n=(t=e.anime)==null?void 0:t[0])==null?void 0:n.animethemes)??[]},Pf=({id:e,api:t,type:n})=>{if(n===ba)switch(t){case vs:return In(pd(e),eo);case Za:return In(Ff(e),eo)}};class Mf{constructor(t,n,r){F(t,"Missing cacheKey"),F(r,"Don't cache empty data"),F(n,"Expiration date is missing"),this.data=r,this.cacheKey=t,this.expires=of(n)}}const nl=be`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
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
}`,Df=be`query ($page: Int, $id: Int, $type: LikeableType) {
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
}`,Rf=be`query (
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
}`,Nf=be`query media($id: Int, $page: Int) {
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
}`,Of=be`mutation (
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
}`,pd=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Ff=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Bf=e=>`https://api.animethemes.moe/artist/${e}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`,vd=e=>`https://api.jikan.moe/v4/anime/${e}/full`,$d=e=>`https://api.jikan.moe/v4/manga/${e}/full`,_d=e=>`https://api.jikan.moe/v4/anime/${e}/characters`,bd=e=>`https://api.jikan.moe/v4/manga/${e}/characters`,Uf=e=>`https://api.jikan.moe/v4/characters/${e}/full`,yd=e=>`https://api.jikan.moe/v4/anime/${e}/staff`,Vf=(e,t)=>`https://api.jikan.moe/v4/${e}?${t}`,Gf=(e,t)=>`https://api.jikan.moe/v4/seasons/${e}?${t}`,Hf=e=>`https://api.jikan.moe/v4/genres/${e}`,jf=be`query ($id: Int, $page: Int) {
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
}`,Yf=be`query ($id: Int) {
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
}`,Gn=be`query ($page: Int, $types: [NotificationType]) {
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
}`,wd=e=>be`query ($name: String) {
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
}`,qf=wd("anime"),zf=wd("manga"),kd=e=>be`query ($name: String) {
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
}`,Wf=kd("manga"),Kf=kd("anime"),Sd=e=>be`query ($name: String) {
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
}`,Jf=Sd("manga"),Xf=Sd("anime"),Zf=be`query ($name: String) {
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
}`,Qf=be`query ($name: String) {
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
}`,Cd=e=>be`query ($name: String) {
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
}`,em=Cd("manga"),tm=Cd("anime"),nm=e=>be`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
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
}`,rm=e=>be`query ($ids: [Int]) {
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
}`,am=be`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,im=be`query ($id: Int!, $page: Int) {
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
}`,sm=be`query ($id: Int!, $page: Int) {
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
}`,Ad=be`query ($id: Int, $page: Int, $perPage: Int) {
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
}`,lm=be`mutation (
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
}`,om=be`query (
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
}`,_s=be`query ($userId: Int, $userName: String, $type: MediaType) {
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
}`,Td=be`query media($id: Int, $page: Int) {
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
}`,cm=be`query media($id: Int, $page: Int) {
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
}`,dm=be`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,um=be`mutation (
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
}`,hm=be`mutation ($id: Int, $type: LikeableType) {
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
}`,xd=be`query (
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
}`,to=be`query ($userId: Int, $type: MediaType, $perPage: Int) {
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
}`,gm=be`query ($userId: Int, $statusIn: [MediaListStatus]) {
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
}`,Id=be`mutation (
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
}`,Vi=be`query staff(
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
}`,fm=be`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
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
}`,no=be`query character(
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
}`,mm=be`query {
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
}`,pm=be`query {
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
}`,vm=be`query (
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
}`,ro=be`query (
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
}`,$m=be`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,_m=be`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,bm=be`query ($mediaId: Int) {
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
}`,ym=be`query ($id: Int, $name: String) {
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
}`,wm=be`query ($id: Int, $type: ActivityType, $page: Int) {
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
}`,km=be`query {
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
}`;function be(e,...t){const n=[];for(let s=0;s<e.length;s++)n.push(e[s],t[s]||"");const r=/\s*([{}():,[\]])\s*/g;return n.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}const bs=["WINTER","SPRING","SUMMER","FALL"],ja=(e=7)=>{const t=new Date;t.setDate(t.getDate()+e);const n=t.getFullYear(),r=Sm(t.getMonth());return F(Number.isInteger(e),"Offsetdays is not an integer"),{season:r,seasonYear:n,nextSeason:$r(r,n,1).season,nextYear:$r(r,n,1).year}};function $r(e,t,n=0){F(typeof t=="number","year is not a number"),F(typeof e=="string","season is not a string");const r=n%4,s=Math.trunc(n/4),a=bs.indexOf(e.toUpperCase());return(a+r<0||a+r>3)&&(t+=r/Math.abs(r)),{year:t+s,season:bs[(4+a+r)%4]}}function Sm(e){return bs[Math.floor(e/3)]}var wr,kr,ma,Tt,Sr,pa,Cr,Ar,Tr,xr,Ht,ys,Ed,ws,Ld;const El=class El{constructor({start:t,limit:n,interval:r=60,fillAmount:s=1,pool:a,defaultDelay:l=30}){ut(this,Ht);ut(this,wr,[]);ut(this,kr,null);ut(this,ma,null);ut(this,Tt);ut(this,Sr);ut(this,pa);ut(this,Cr);ut(this,Ar);ut(this,Tr);ut(this,xr,Promise.resolve());ht(this,Tt,t),ht(this,Sr,n),ht(this,pa,r),ht(this,Cr,s),ht(this,Tr,l),ht(this,Ar,a),Et(this,Ht,ys).call(this)}requestToken(){return Ee(this,Tt)>0?(Mi(this,Tt)._--,!0):!1}enqueue(t){return ht(this,xr,Ee(this,xr).then(t).catch(n=>{console.error("Request error:",n)})),Ee(this,xr)}getDefaultDelay(){return Ee(this,Tr)}getsNextToken(){const{promise:t,resolve:n}=Promise.withResolvers();return this.addToBucket(n),t}addToBucket(t){Ee(this,wr).push(t)}delayBucket(t){Et(this,Ht,Ed).call(this,t||Ee(this,Tr))}};wr=new WeakMap,kr=new WeakMap,ma=new WeakMap,Tt=new WeakMap,Sr=new WeakMap,pa=new WeakMap,Cr=new WeakMap,Ar=new WeakMap,Tr=new WeakMap,xr=new WeakMap,Ht=new WeakSet,ys=function(){clearInterval(Ee(this,kr)),ht(this,kr,setInterval(()=>Et(this,Ht,ws).call(this),Ee(this,pa)*1e3))},Ed=function(t){ht(this,Tt,0),clearInterval(Ee(this,kr)),clearTimeout(Ee(this,ma)),ht(this,ma,setTimeout(()=>{Et(this,Ht,ys).call(this),Et(this,Ht,ws).call(this)},t*1e3))},ws=function(){var n;Ee(this,Ar)instanceof El?ht(this,Tt,Math.min(Ee(this,Tt)+Math.min(Ee(this,Cr),Et(n=Ee(this,Ar),Ht,Ld).call(n)),Ee(this,Sr))):ht(this,Tt,Math.min(Ee(this,Tt)+Ee(this,Cr),Ee(this,Sr)));const t=Ee(this,wr).slice();Ee(this,wr).length=0,t.forEach(r=>r())},Ld=function(){return Ee(this,Tt)>0?Mi(this,Tt)._--:Ee(this,Tt)};let kn=El;const Gi=Tn,Ce=_i({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),Cm=_i({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),pt=_i({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),ao=_i({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),Hi={animeThemes:new kn({start:90,limit:90,interval:60,defaultDelay:20}),anilist:new kn({start:5,limit:5,interval:2,defaultDelay:20,pool:new kn({start:60,limit:90,interval:60,fillAmount:60})}),jikan:new kn({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new kn({start:3,limit:3,interval:1.25,pool:new kn({start:60,limit:60,interval:60,fillAmount:60})})})};function io(e,t,n){let r=null;const s=t.reduce((a,l)=>(l.active&&(l.key==="season"?r=l.value:a.push(`${l.key}=${l.value}`)),a),[]);return n>1&&s.push(`page=${n}`),r?se.getJson(Gf(r,s.sort().join("&")),a=>(a.data.forEach(l=>{l.titles=l.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),a)):se.getJson(Vf(e,s.sort().join("&")),a=>(a.data.forEach(l=>{l.titles=l.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),a))}const ue={animeThemes:{themesByAniListId:pt(e=>se.getJson(pd(e))),artisBySlug:pt(e=>se.getJson(Bf(e)))},myAnimeList:{animeById:pt(e=>se.getJson(vd(e),t=>t.data)),mangaById:pt(e=>se.getJson($d(e),t=>t.data)),animeCharactersById:pt(e=>se.getJson(_d(e),t=>t.data)),mangaCharactersById:pt(e=>se.getJson(bd(e),t=>t.data)),animeStaffById:pt(e=>se.getJson(yd(e))),mediaSearch:pt(io),mediaSearchCache:ao(io),genresAndThemes:pt(e=>se.getJson(Hf(e),t=>{const n=new Set,r=["genres","genres","themes"],s={genres:[],themes:[]};let a=0;return t.data.reduce((l,o)=>n.has(o.mal_id)?l:(o.name<l&&(a=Math.min(a+1,r.length-1)),s[r[a]].push(o),n.add(o.mal_id),o.name),""),s.genres.sort(),{translations:{[e]:Object.fromEntries(t.data.map(l=>[l.name,l.mal_id]))},...s}}))},anilist:{mediaId:Ce((e,t)=>se.authAnilist(t,nl,{id:e,perPage:6})),rateRecommendation:async(e,t,n,r,s)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!=null,"Id missing"),F(n!=null,"Rating missing"),F(r!=null,"MediaId missing"),F(s!=null,"MediaRecommendationId missing"),await se.authAnilist(e,Of,{id:t,rating:n,mediaId:r,mediaRecommendationId:s},l=>l.data.SaveRecommendation).send()),userByName:Ce((e,t)=>(F(e,"Name is missing"),se.authAnilist(t,ym,{name:e},n=>n.data.User))),toggleFollow:async(e,t)=>(F(t,"id is missing"),await se.authAnilist(e,am,{id:t},r=>r.data.ToggleFollow).send()),userFollowing:Ce((e,t=1,n)=>(F(e,"id is missing"),se.authAnilist(n,sm,{id:e,page:t},r=>r.data.Page))),userAnimeStats:Ce((e,t)=>se.authAnilist(t,qf,{name:e},n=>n.data.User.statistics.anime)),userMangaStats:Ce((e,t)=>se.authAnilist(t,zf,{name:e},n=>n.data.User.statistics.manga)),userAnimeGenres:Ce((e,t)=>se.authAnilist(t,Kf,{name:e},n=>n.data.User.statistics.anime.genres)),userMangaGenres:Ce((e,t)=>se.authAnilist(t,Wf,{name:e},n=>n.data.User.statistics.manga.genres)),userAnimeTags:Ce((e,t)=>se.authAnilist(t,Xf,{name:e},n=>n.data.User.statistics.anime.tags)),userMangaTags:Ce((e,t)=>se.authAnilist(t,Jf,{name:e},n=>n.data.User.statistics.manga.tags)),userAnimeStudios:Ce((e,t)=>se.authAnilist(t,Zf,{name:e},n=>n.data.User.statistics.anime.studios)),userAnimeVoiceActors:Ce((e,t)=>se.authAnilist(t,Qf,{name:e},n=>n.data.User.statistics.anime.voiceActors)),userAnimeStaff:Ce((e,t)=>se.authAnilist(t,tm,{name:e},n=>n.data.User.statistics.anime.staff)),userMangaStaff:Ce((e,t)=>se.authAnilist(t,em,{name:e},n=>n.data.User.statistics.manga.staff)),characterIds:pt((e,t)=>se.authAnilist(t,rm(e),{ids:e},n=>Object.values(n.data).map(r=>r.characters).flat())),userFollowers:Ce((e,t=1,n)=>(F(e,"id is missing"),se.authAnilist(n,im,{id:e,page:t},r=>r.data.Page))),activityByUserId:Ce((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,wm,{id:e}))),activityById:Ce((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,Yf,{id:e},n=>n.data.Activity))),listOfActivityLikes:pt((e,t)=>(F(e,"Id is missing"),se.authAnilist(t,Df,{id:e,type:"ACTIVITY"},n=>n.data.Page))),activityRepliesById:Ce((e,t,n)=>(F(e,"Id is missing"),se.authAnilist(n,jf,{id:e,page:t},r=>r.data.Page))),notifications:Cm((e,t,n=1)=>{switch(t){case"airing":return se.authAnilist(e,Gn,{page:n,types:["AIRING"]},r=>r.data.Page);case"activity":return se.authAnilist(e,Gn,{page:n,types:["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"]},r=>r.data.Page);case"forum":return se.authAnilist(e,Gn,{page:n,types:["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"]},r=>r.data.Page);case"follows":return se.authAnilist(e,Gn,{page:n,types:["FOLLOWING"]},r=>r.data.Page);case"media":return se.authAnilist(e,Gn,{page:n,types:["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"]},r=>r.data.Page);case"all":default:return se.authAnilist(e,Gn,{page:n},r=>r.data.Page)}}),searchUsers:pt((e,t,n)=>(F(e,"Search is missing"),se.authAnilist(n,Rf,{search:e,page:t},r=>r.data.Page))),mediaListByUserName:Ce((e,t,n)=>(F(e,"Name is missing"),se.authAnilist(n,_s,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),mediaListByUserNameFetchOnce:pt((e,t,n)=>(F(e,"Name is missing"),se.authAnilist(n,_s,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),favouritesByUserId:Ce((e,t,n)=>(F(e,"Id is missing"),F(t,"Page is missing"),se.authAnilist(n,om,{id:e,page:t},r=>r.data.User.favourites))),mutateFavourites:async(e,t)=>await se.authAnilist(e,lm,t).send(),characterInfoById:Ce((e,t)=>se.authAnilist(t,no,{id:e},n=>n.data.Character)),characterMediaById:Ce((e,t,n={})=>se.authAnilist(e,no,{...n,page:n.page||1,sort:n.sort||"POPULARITY_DESC",onList:n.onList,withRoles:n.withRoles||!0,id:t},r=>r.data.Character.media)),staffInfoById:Ce((e,t)=>se.authAnilist(t,Vi,{id:e},n=>n.data.Staff)),studioInfoAndMediaById:Ce((e,t={},n)=>se.authAnilist(n,fm,{...t,page:t.page||1,sort:t.sort||"START_DATE_DESC",onList:t.onList,id:e},r=>r.data.Studio)),staffCharactersById:Ce((e,t,n={})=>se.authAnilist(e,Vi,{...n,characterPage:n.characterPage||1,sort:n.sort||"START_DATE_DESC",onList:n.onList,withCharacterRoles:!0,id:t},r=>r.data.Staff.characterMedia)),staffMediaById:Ce((e,t,n,r)=>se.authAnilist(e,Vi,{...r,staffPage:r.staffPage||1,sort:r.sort||"START_DATE_DESC",onList:r.onList,withStaffRoles:!0,id:t,type:n},s=>s.data.Staff.staffMedia)),genresAndTags:pt(()=>se.anilist($m,{},e=>e.data)),externalSources:pt(e=>se.anilist(_m,{type:e||void 0},t=>t.data.ExternalLinkSourceCollection)),characters:Ce((e,t=1,n)=>se.authAnilist(n,Td,{id:e,page:t},r=>r.data.Media)),allMediaStaff:Ce((e,t=1,n)=>se.authAnilist(n,cm,{id:e,page:t},r=>r.data.Media)),trendingMedia:Ce(e=>{const t=ja();return se.authAnilist(e,mm,{season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingAnime:Ce(e=>{const t=ja();return se.authAnilist(e,vm,{type:"ANIME",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingManga:Ce(e=>{const t=ja();return se.authAnilist(e,pm,{type:"MANGA",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),mediaListEntry:async(e,t)=>(F(t,"MediaId missing"),F(typeof e!="function","This specific api doesnt support signals"),await se.authAnilist(e,bm,{mediaId:t}).send()),getActivity:Ce((e,t,n=1)=>se.authAnilist(e,xd,{...t,page:n},r=>r.data.Page)),searchMedia:pt((e,t,n,r={})=>{const s=t.reduce((a,l)=>(l.active&&(a[l.key]=l.value),a),{page:n});return Object.entries(r).forEach(([a,l])=>{a==="format"||a==="season"||a==="seasonYear"?s[a]=l:a==="episodeGreater"?s[a]=Math.max(l,s[a]||0):(s[a]&&(s[a]=[l,s[a]].flat()),s[a]??(s[a]=l))}),se.authAnilist(e,ro,s,a=>a.data.Page)}),searchMediaCache:ao((e,t,n)=>{const r=t.reduce((s,a)=>(a.active&&(s[a.key]=a.value),s),{page:n});return se.authAnilist(e,ro,r,s=>s.data.Page)}),friendsMediaScore:Ce((e,t,n)=>se.authAnilist(e,Ad,{id:t,...n})),mutateMedia:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t,"Variables missing"),F(t.id||t.mediaId,"No mutation id given"),await se.authAnilist(e,Id,t,r=>r.data.SaveMediaListEntry).send()),deleteMediaListEntry:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!==void 0,"Variables missing"),await se.authAnilist(e,dm,{id:t}).send()),toggleActivityLike:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t.id||t.mediaId,"No mutation id given"),await se.authAnilist(e,hm,{...t,type:"ACTIVITY"}).send()),toggleFavourite:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),await se.authAnilist(e,um,t).send()),wachingAnime:Ce((e,t)=>se.authAnilist(t,to,{userId:e,type:"ANIME",perPage:40})),readingManga:Ce((e,t)=>se.authAnilist(t,to,{userId:e,type:"MANGA",perPage:40}))}};var zn,Ir,Er,Ln,Pd,Md,Dd;const la=class la{constructor(t,{method:n="POST",headers:r,body:s},a){ut(this,Ln);Re(this,"expires");ut(this,zn);ut(this,Ir);ut(this,Er);F(t,"Url missing"),F(n,"Method missing"),n==="POST"&&F(s,"Body is missing");const l={"Content-Type":"application/json"};this.url=t,this.method=n,this.headers=r||l,this.body=s,this.fromCache=!0,ht(this,zn,a),this.cacheKey=Et(this,Ln,Pd).call(this)}abort(){var t;(t=Ee(this,Ir))==null||t.abort()}async send(){var s;const t=Et(this,Ln,Md).call(this);ht(this,Ir,new AbortController),ht(this,Er,Ee(this,Ir).signal);const n=await t.enqueue(async()=>{for(;;){if(Ee(this,Er).aborted)return null;if(document.hidden){const{promise:o,resolve:c}=Promise.withResolvers();document.addEventListener("visibilitychange",c,{once:!0}),await o}if(!t.requestToken()){await Promise.race([t.getsNextToken(),new Promise(o=>Ee(this,Er).addEventListener("abort",o))]);continue}const l=await Et(this,Ln,Dd).call(this);if(l.status===429){console.warn("429 received, backing off...",this.url);const o=parseInt(l.headers.get("Retry-After"))||t.getDefaultDelay();await new Promise(c=>setTimeout(c,o*1e3));continue}if(l.status===500&&this.url.includes("anilist")){console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds"),await new Promise(o=>setTimeout(o,2e3));continue}return l}});if(n==null)return null;if(this.status=n.status,!n.ok)return this.error=!0,this;const r=await n.json();return this.data=((s=Ee(this,zn))==null?void 0:s.call(this,r))||r,this.fromCache=!1,this}static anilist(t,n={},r){return la.authAnilist(null,t,n,r)}static authAnilist(t,n,r={},s){F(n.length>10,"Query must be above of length 10");const a={"Content-Type":"application/json"};return t&&(a.Authorization="Bearer "+t),new la("https://graphql.anilist.co",{method:"POST",headers:a,body:{query:n,variables:r}},s)}static getJson(t,n){return new la(t,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},n)}};zn=new WeakMap,Ir=new WeakMap,Er=new WeakMap,Ln=new WeakSet,Pd=function(){let t=`${this.url}-${this.method}`;if(this.body){const n=JSON.stringify(this.body).replaceAll('"',"");t+=n}if(this.headers){const n=JSON.stringify(this.headers).replaceAll('"',"");t+=n}if(Ee(this,zn)){const n=Ee(this,zn).toString().replace(/[\n\t\r ]+/g,"");t+=n}return t},Md=function(){if(this.url.startsWith("https://graphql.anilist.co"))return Hi.anilist;if(this.url.startsWith("https://api.jikan.moe"))return Hi.jikan;if(this.url.startsWith("https://api.animethemes.moe"))return Hi.animeThemes;F(!1,`Fetch to url "${this.url}" does not have any rate limits`)},Dd=function(){const t={method:this.method,headers:this.headers,body:JSON.stringify(this.body),cache:"default"};return Math.random()>1?(console.log("Error route"),fetch("http://127.0.0.1:3000/api/version",t)):fetch(this.url,t)};let se=la;const ji=new Map,Ea=new Map;function _i(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(n){return(...r)=>{const[s,a]=O(void 0),[l,o]=O(!1),[c,u]=O(!1),[h,f]=O(!0);let g=null;const m=e.type=="default"||e.type=="only-if-cached",y=(Gi==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&m==!1,v=(w,b)=>{if(typeof w=="function"&&(w=w(Ae(s))),w=structuredClone(w),F(Ae(s)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof w=="object","Data should always be JSON object data"),e.type!=="no-store"&&(ji.set(g.cacheKey,w),e.storeName)){f(!1);const A=qe.fetchCache();A.onsuccess=S=>{const _=S.target.result,I=qe.store(_,e.storeName,"readwrite",()=>f(!0),()=>f(!0)).put(w);b&&(I.onsuccess=b)}}},$=w=>{w.cacheKey===g.cacheKey&&a(w)},k=w=>{typeof w=="function"&&(w=w(Ae(s))),a(w)},C=async()=>{if(e.type==="only-if-cached")return u(!1),a(null);Ea.has(g.cacheKey)||Ea.set(g.cacheKey,g.send());const w=await Ea.get(g.cacheKey);if(Ea.delete(g.cacheKey),w!==null){if(e.expiresInSeconds){const b=new Date;w.expires=b.setSeconds(b.getSeconds()+e.expiresInSeconds)}Oe(()=>{w.error?(o(!0),console.assert(!Gi,"Fetch error, not saving data to cache")):(v(w),$(w)),u(!1)})}};return W(()=>{const w=r.map(A=>typeof A=="function"?A():A);if(w.some(A=>A===void 0))return;g==null||g.abort(),g=n(...w),Gi&&console.log("Fetching",e.type,g.body||g.url),Oe(()=>{u(!0),o(!1)});const b=ji.get(g.cacheKey);if(b&&b.expires>new Date)if($({...b,fromCache:!0}),e.type==="fetch-once"){u(!1);return}else y===!1&&u(!1);else if(e.type!=="no-store"&&e.storeName){const A=qe.fetchCache();A.onerror=C,A.onsuccess=S=>{const _=S.target.result,I=qe.store(_,e.storeName,"readonly").get(g.cacheKey);I.onerror=C,I.onsuccess=E=>{if(E.target.result&&(F(E.target.result.expires,"Cache should have a expiration date"),F(E.target.result.data,"Cache should always have data"),E.target.result.expires>new Date)){y==!1&&u(!1);const L={...E.target.result,fromCache:!0};return e.type!=="only-if-cached"&&ji.set(L.cacheKey,L),$(L)}y==!1&&C()}}}else y==!1&&C();y&&C()}),Object.defineProperties(s,{error:{get:()=>l()},loading:{get:()=>c()},indexedDBClosed:{get:()=>h()}}),ze(()=>g==null?void 0:g.abort()),[s,{mutate:k,refetch:C,mutateCache:v}]}}}var Lr,Ya;const _r=class _r{static store(t,n,r,s,a){const l=t.transaction(n,r);return s?l.onerror=s:l.onerror=console.warn,a&&(l.oncomplete=a),l.objectStore(n)}static fetchCache(t){const n=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var a,l;const s=r.target.result;switch(r.oldVersion){case 0:Et(a=_r,Lr,Ya).call(a,s,"results",{keyPath:"cacheKey"});case 1:Et(l=_r,Lr,Ya).call(l,s,"debug",{keyPath:"cacheKey"})}},n}static user(t){const n=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var a;const s=r.target.result;switch(r.oldVersion){case 0:Et(a=_r,Lr,Ya).call(a,s,"data")}},n}};Lr=new WeakSet,Ya=function(t,n,r){t.objectStoreNames.contains(n)||t.createObjectStore(n,r)},ut(_r,Lr);let qe=_r;class un{constructor(t,n,r){F(t,"CacheKey is missing"),this.cacheKey=t,this.data=n,this.cacheType=r}}const Yi={},nt=e=>al({cacheTypeSignal:()=>null,disableNullValues:!1,senderDisabledSignal:()=>!1,fetcherSignal:e}),En=(e,t)=>al({cacheTypeSignal:e,disableNullValues:!0,senderDisabledSignal:()=>!1,enableDebugLogs:!1,fetcherSignal:t}),rl=(e,t)=>al({cacheTypeSignal:()=>null,disableNullValues:!0,senderDisabledSignal:e,enableDebugLogs:!1,fetcherSignal:t}),al=({cacheTypeSignal:e,disableNullValues:t,senderDisabledSignal:n,enableDebugLogs:r,fetcherSignal:s,fetchOnDebug:a})=>{fn(e,"cacheTypeSignal is not a function"),fn(n,"senderDisabledSignal is not a function"),fn(s,"fetcherSignal is not a function");const[l,o,c]=Im(void 0),[u,h]=O(!1),[f,g]=O(!1),[m,y]=O(!0);let v=null,$=null;const k=I=>{if(typeof I=="function"){const{data:E,cacheType:L}=Ae(l)||{};return I(new un(v.cacheKey,E,L))}return I},C=(I,E)=>{var j,K;const L=k(I),R=new Mf(L.cacheKey,v.settings.expiresInSeconds,structuredClone(L.data));R.cacheKey===v.cacheKey&&c(L);const{type:B,storeName:V}=v.settings;if(B==="no-store"||!V)return;(K=(j=v.settings).saveToSessionStorage)==null||K.call(j,R),Yi[R.cacheKey]=R,y(!1);const X=qe.fetchCache();X.onsuccess=ae=>{const re=ae.target.result,J=qe.store(re,V,"readwrite",()=>y(!0),()=>y(!0)).put(R);E&&(J.onsuccess=E)}},w=I=>{F(I instanceof un),I.cacheKey===v.cacheKey&&o(I)},b=I=>{I=k(I),F(I instanceof un),o(I)},A=(I,E)=>{I=k(I),C(I,E),b(I)},S=async(I,E)=>{if(I!==v)return;if(F(I,"fetcher should not be undefined"),E==="only-if-cached"){Oe(()=>{t||(o(new un(I.cacheKey,null)),g(!1))});return}$==null||$.abort();const L=new AbortController;$=L;const R=await sf(I,L.signal);R===null?I===v&&Oe(()=>{h(!0),g(!1),!L.signal.aborted&&!t&&o(new un(I.cacheKey,null))}):Oe(()=>{const B=new un(I.cacheKey,R);C(B),w(B),I===v&&g(!1)})},_=N(I=>{const E=s(),L=e()||(E==null?void 0:E.settings.type)||I;if(v!==E)return L;switch(It(I,"prev","If fetcher is same as currentFetcher why is there no previous cacheType"),I){case"only-if-cached":if(L==="default")return L;case"default":if(L==="fetch-once")return L;case"fetch-once":if(L==="reload"||L==="no-store")return L}return I}),T=N(()=>{const I=s(),E=n();return v!==I?E:!1});return P(()=>{if(T())return;const I=s();if(!I){v=null,o(void 0);return}F(I instanceof Qs);const E=_();It(E,"caheType");const L=Tn&&!I.settings.fetchOnDebug&&!a&&E!=="no-store",R=!L&&(E==="fetch-once"||E==="reload"||E==="no-store"),B=I.cacheKey;if(v=I,Oe(()=>{h(!1),g(!0)}),B in Yi){const V=Yi[B];if(L||E==="only-if-cached"||E==="fetch-once"||E==="default"){Oe(()=>{o(new un(V.cacheKey,V.data,"local")),g(!1)});return}else o(new un(V.cacheKey,V.data,"local"))}else if(E!=="no-store"&&I.settings.storeName){const V=qe.fetchCache(),X=()=>!R&&S(I,E);V.onerror=X,V.onsuccess=j=>{const K=j.target.result,re=qe.store(K,I.settings.storeName,"readonly").get(B);re.onerror=X,re.onsuccess=Q=>{const J=Q.target.result;if(J&&(F(J.expires,"Cache should have a expiration date"),F(J.data,"Cache should always have data"),J.expires>new Date)){const pe=new un(B,J.data,"indexedDB");R?w(pe):Oe(()=>{w(pe),g(!1)});return}X()}}}R&&S(I,E)}),Object.defineProperties(l,{error:{get:()=>u()},loading:{get:()=>f()},indexedDBClosed:{get:()=>m()}}),ze(()=>$==null?void 0:$.abort()),[l,{mutate:b,refetch:()=>S(Ae(s),Ae(s).settings.type),mutateCache:C,mutateBoth:A}]},Rd=(e,t)=>{const[n,r]=O(localStorage.getItem(e)??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,o),o})}]},Am=e=>{if(e==="true")return!0;if(e==="false")return!1},so=(e,t)=>{const[n,r]=O(Am(localStorage.getItem(e))??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,String(o)),o})}]},Tm=e=>{try{return JSON.parse(e)}catch{return null}},xm=(e,t)=>{const[n,r]=O(Tm(localStorage.getItem(e))??t);return[n,a=>{r(l=>{const o=typeof a=="function"?a(l):a;return o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o)),o})}]},il=(e=!0)=>O(Tn===e),lo=e=>{fn(e);const[t,n]=O();return P(()=>{const r=e();n(r)}),[t,n]},Im=e=>{const[t,n]=O(0);let r=e;return[()=>(t(),r),o=>(r=typeof o=="function"?o(r):o,n(u=>u+1),r),o=>(r=typeof o=="function"?o(r):o,r)]},Em=()=>{Oe(()=>{Nd(e=>e+1),Fd(e=>e+1),Od(e=>e+1),Bd(e=>e+1)})};let Ot=null;const Lm=e=>{Ot===null?(Ot=[e],e()):Ot.includes(e)||Ot.push(e)},Pm=()=>{Ot==null||Ot.shift();const e=Ot==null?void 0:Ot[0];e?e():Ot=null},Mm=()=>{setTimeout(()=>Nd(e=>e-1),1e3),setTimeout(()=>Od(e=>e-1),3e3),setTimeout(()=>Fd(e=>e-1),5e3),setTimeout(()=>Bd(e=>e-1),1e4)},[P3,Nd]=O(0),[M3,Od]=O(0),[ei,Fd]=O(0),[D3,Bd]=O(0),Dm=()=>{Oe(()=>{Ud(e=>e+1),Vd(e=>e+1),Gd(e=>e+1),Hd(e=>e+1)})};let Ft=null;const Rm=e=>{Ft===null?(Ft=[e],e()):Ft.includes(e)||Ft.push(e)},Nm=()=>{Ft==null||Ft.shift();const e=Ft==null?void 0:Ft[0];e?e():Ft=null},Om=()=>{setTimeout(()=>Ud(e=>e-1),1e3),setTimeout(()=>Vd(e=>e-1),2e3),setTimeout(()=>Gd(e=>e-1),5e3),setTimeout(()=>Hd(e=>e-1),1e4)},[bi,Ud]=O(0),[Fm,Vd]=O(0),[R3,Gd]=O(0),[N3,Hd]=O(0),[oo,Bm]=We({}),ks=7*24*60*60,cr=24*60*60,Ss=new Date/1e3;function jd(e,t){try{return JSON.parse(e)||t}catch{return t}}function sl(e,t){try{return JSON.stringify(e)||t}catch{return t}}function Yd(e,t){const n=localStorage[e];return n?jd(n,t):t}function Um(e,t){const n=sl(t);n?localStorage[e]=n:localStorage.removeItem(e)}const Vm=(e,t)=>{const[n,r]=O(Yd(e,t));return[n,a=>{r(l=>{const o=Zs(a)?a(l):a;return Um(e,o),o})}]},ti={"https://graphql.anilist.co":{limit:60,remaining:60,resetTime:0,requests:[],timeToWait:e=>{var u,h,f,g,m,y,v;const t=new Date;if(e.resetTime>t)return e.resetTime-t;if(e.remaining===0){const{end:$,start:k}=e.requests.at(-e.limit)??{},C=($||k||t)+6e4;return Math.max(C-t,0)}const n=((u=e.requests.at(-4))==null?void 0:u.start)+9e4||t,r=Math.min(((h=e.requests.at(-3))==null?void 0:h.start)+1e3,n)||t,s=Math.min(((f=e.requests.at(-4))==null?void 0:f.start)+2e3,n)||t,a=((g=e.requests.at(-6))==null?void 0:g.start)+5e3||t,l=e.remaining<=10&&((m=e.requests.at(-1))==null?void 0:m.start)+1e3||t,o=e.remaining<=5&&((y=e.requests.at(-1))==null?void 0:y.start)+2e3||t,c=e.remaining<=2&&((v=e.requests.at(-1))==null?void 0:v.start)+4e3||t;return Math.max(t,r,s,a,l,o,c)-t}}};function Gm(e){const t=qd(e);if(!t)return;const n=new Date().getTime();t.requests.push({start:n}),t.requests=t.requests.filter(r=>n-r.start>12e4),jm()}function qd(e){const[t]=e,n=Object.keys(ti).find(r=>t.includes(r));if(n)return Hm(),ti[n]}function Hm(){const e=Yd("LOB-external-rate-limits",{});Gg(ti,e)}function jm(){localStorage["LOB-external-rate-limits"]=JSON.stringify(ti)}function Ym(e){const t=qd(e);if(!t)return 0;const n=t.timeToWait(t);return Qc(n,"Rate limit delay did not return number"),n}const[Yn,ni]=Vm("LOB-authed-used-data"),[Cn,Cs]=O(sessionStorage["LOB-token"]);sessionStorage.removeItem("LOB-token");var uc;const[qm,zd]=O((uc=Yn())==null?void 0:uc.data.id),zm=()=>{const e=qe.user();e.onsuccess=t=>{const n=t.target.result,r=qe.store(n,"data","readwrite");r.delete("access_token"),r.delete("auth_profile_info"),Oe(()=>{Cs(null),zd(null),ni(null)})}};function qi(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t+=(t<<1)+(t<<4)+(t<<7)+(t<<8)+(t<<24);return(t>>>0).toString(16)}const Wm=(e,t,n)=>{if(!e.objectStoreNames.contains(t))return e.createObjectStore(t,n)},Wd=(e,t)=>{const n=indexedDB.open("legendary-octo-barnacle-cache2",1);return n.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:{const a=Wm(s,"fetches",{keyPath:"cacheKey"});a.createIndex("Cache key","cacheKey",{unique:!0}),a.createIndex("Name","name",{unique:!1}),a.createIndex("Data","data",{unique:!1}),a.createIndex("Expiration","expires",{unique:!1}),a.createIndex("Last modified","modified",{unique:!1})}}},new Promise((r,s)=>{n.onerror=s,n.onsuccess=a=>{const l=a.target.result;Yg(l.objectStoreNames.contains(e),`Unknown store name "${e}"`);const o=l.transaction(e,t);r(o.objectStore(e))}})},Kd=async(e,t,n)=>{const{promise:r,resolve:s,reject:a}=Promise.withResolvers(),o=(await Wd(e,"readwrite")).put(t,n);return o.onerror=a,o.onsuccess=s,await r},Km=async(e,t)=>{const n=await Wd(e,"readonly");return await Jm(n,t)},Jm=(e,t)=>new Promise((n,r)=>{const s=e.get(t);s.onsuccess=a=>n(a.target.result),s.onerror=r});function Xm(e,t){const n=sessionStorage[e];return n?jd(n,t):t}function Zm(e,t,n){sessionStorage[e]=sl(t,n)}function Qm(e,t,n=ep){Zc(e),ha(t==null?void 0:t.body)&&(t.body=JSON.stringify(t.body));const r=[e,t];return r.cacheKey=n(e,t),r}function ll(e,t,n){Zc(e);const r=Cn(),s={"Content-Type":"application/json"};return r&&(s.Authorization=`Bearer ${r}`),Qm("https://graphql.anilist.co",{method:"POST",headers:s,signal:n,body:{query:e,variables:t}})}function ep(e,t){const n=sl(t,"missing");return qi(e)+qi(n)+qi(e+n)}function Jd(e){if(Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",e[1]);case 2:return fetch("https://http.codes/500",e[1]);case 3:return fetch("https://http.codes/cors",e[1])}return tp(e)}const La={};async function tp(e){var r,s;const t=(r=e==null?void 0:e[1])==null?void 0:r.signal;for(let a=0;a<3&&!(t!=null&&t.aborted);a++){try{var n=await(La[s=e.cacheKey]??(La[s]=np(e)))}catch{if(t!=null&&t.aborted)return null}finally{delete La[e.cacheKey]}if(n!=null&&n.ok)break;const l=await rp(e,n,a);if(!l)break;await new Promise(o=>setTimeout(o,l))}return n}function np(e){return Gm(e),fetch(...e)}async function rp(e,t,n){var o;const r=(t==null?void 0:t.status)||"cors",s=(o=t==null?void 0:t.headers)==null?void 0:o.get("Retry-After");if(s)return parseInt(s)*1e3;const[a]=e;if(a.includes(Mn))switch(r){case 400:{if(n<2){const{errors:c}=await t.json();var l=c.some(u=>u.message==="Invalid token")}return l?3e3:0}case 429:return 25e3;case 500:return 3e3;case 502:return 15e3;case"cors":return 6e4}if(a.includes(Qn))switch(r){case 429:return 1e3}if(a.includes(Hc))switch(r){case 429:return 25e3}}const ap=[{url:"anilist",queue:[],timeout:null},{url:"jikan",queue:[],timeout:null},{url:"animeTheme",queue:[],timeout:null}],co={parse:e=>e.json(),queue:!0,cache:{get:()=>null,set:()=>{}},active:()=>!0,setValue:()=>{},onStart:()=>{},onError:()=>{},onFetch:()=>{}};async function ip(e,t={}){var h,f,g,m,y;if(!e)return;jg(e),t=Js({...co,cache:{...co.cache}},t);const n=performance.now();(h=t.onStart)==null||h.call(t,performance.now()-n);var r=t.file?await(await fetch("/legendary-octo-barnacle/"+t.file)).json():await((g=(f=t.cache)==null?void 0:f.get)==null?void 0:g.call(f,e));const s=(m=t.active)==null?void 0:m.call(t,r);if(r&&t.setValue(r,{fetcher:e}),!s){(y=t.onStop)==null||y.call(t,performance.now()-n);return}const[a,{signal:l}]=e,o=ap.find(v=>a.includes(v.url));async function c(){var v,$,k,C,w;if((v=t.onFetch)==null||v.call(t,performance.now()-n),(l==null?void 0:l.aborded)!==!0)try{const b=await Jd(e);if(!(b!=null&&b.ok))throw b;const A=await t.parse(b);if(t.setValue({data:A,cache:!1}),A){const S={cacheKey:e.cacheKey,data:A,expires:t.expires||new Date().getTime()+2592e6,modified:new Date().getTime()};t.name&&(S.name=t.name),(k=($=t.cache)==null?void 0:$.set)==null||k.call($,S,{fetcher:e})}}catch(b){(C=t.onError)==null||C.call(t,b)}(w=t.onStop)==null||w.call(t,performance.now()-n),clearTimeout(o.timeout),o.timeout=setTimeout(u,10)}if(t.queue===!1){c();return}else o.queue.push({event:c,fetcher:e}),u();function u(){if(!o.queue.length)return;const{event:v,fetcher:$}=o.queue.at(-1),k=Ym($);k===0?(o.queue.pop(),v()):(clearTimeout(o.timeout),o.timeout=setTimeout(u,k))}}const uo=new Set,ho={name:"AniList fetch",active:e=>{if(e){if(Tn)return!1}else return!0;return!uo.has(e.cacheKey)},cache:{get:async e=>{const t=Tn?null:Xm(e.cacheKey,null);return t||await Km("fetches",e.cacheKey)},set:async e=>{uo.add(e.cacheKey),Zm(e.cacheKey,e),await Kd("fetches",e)}},onError:async e=>{if(!e)return;const{errors:t}=await e.json();for(const{message:n,status:r}of t)r===400&&n==="Invalid token"&&zm()},setValue:e=>console.error("Missing setValue",e)};function Xd(e,t=ho){if(t){const{cache:n,...r}=ho;t=Js({...r,cache:{...n}},t)}ip(e,t)}var sp=p("<li data-k-8fed7792><button data-k-8fed7792>Logout"),lp=p("<li data-k-8fed7792>"),op=p('<img data-k-8fed7792 alt="Profile avatar">'),cp=p("<li data-k-8fed7792 class=profile>"),dp=p("<li data-k-8fed7792><a data-k-8fed7792>Login with AniList"),up=p("<nav data-k-8fed7792 class=main-navigation><ul data-k-8fed7792><li data-k-8fed7792></li><li data-k-8fed7792></li><li data-k-8fed7792></li><li data-k-8fed7792>");const hp=`https://anilist.co/api/v2/oauth/authorize?client_id=${ff()}&response_type=token`;function gp(){const{logoutUser:e}=ce();return W(()=>{if(!Cn())return;const n=ll(km,{},new AbortController().signal);Xd(n,{name:"AniList authed user",setValue:r=>{Oe(()=>{ni({data:r.data.data.Viewer}),zd(r.data.data.Viewer.id)})}})}),(()=>{var t=up(),n=t.firstChild,r=n.firstChild,s=r.nextSibling,a=s.nextSibling,l=a.nextSibling;return d(r,i(U,{href:"/",children:"Home"})),d(s,i(U,{href:"/browse/anime",children:"Anime"})),d(a,i(U,{href:"/browse/manga",children:"Manga"})),d(l,i(U,{href:"/browse/media",children:"Search"})),d(n,i(z,{get children(){return[i(M,{get when(){return Cn()},get children(){return[(()=>{var o=sp(),c=o.firstChild;return c.$$click=()=>e(),o})(),i(x,{get when(){return Yn()},get children(){return[(()=>{var o=lp();return d(o,i(U,{href:"/notifications",get children(){return["Notifications (",N(()=>Yn().data.unreadNotificationCount),")"]}})),o})(),(()=>{var o=cp();return d(o,i(U,{get href(){return"/user/"+Yn().data.name},get children(){return[N(()=>Yn().data.name),(()=>{var c=op();return P(()=>G(c,"src",Yn().data.avatar.large)),c})()]}})),o})()]}})]}}),i(M,{get when(){return!Cn()},get children(){var o=dp(),c=o.firstChild;return G(c,"href",hp),o}})]}}),null),t})()}$e(["click"]);var fp=p("<main data-k-c7a289e2 id=page-content>"),mp=p("<footer data-k-c7a289e2 class=main-footer>"),pp=p("<div data-k-c7a289e2 class=dev-branch><p data-k-c7a289e2>Preview: </p><button data-k-c7a289e2>Back to Production");const vp=e=>fetch("http://localhost:"+e,{signal:AbortSignal.timeout(100)}).then(()=>!0).catch(()=>!1);function $p(e){let t=new AbortController;return W(()=>{t.abort(),t=new AbortController,window.addEventListener("keydown",async n=>{if(n.target!==document.body||n.shiftKey||n.ctrlKey)return;const{port:r,hostname:s,href:a,origin:l}=location;n.key==="d"&&n.altKey&&(n.preventDefault(),s==="localhost"?r!=5174&&await vp(5174)?window.open(a.replace(l,"http://localhost:5174")):window.open(a.replace(l,"https://kassu11.github.io")):window.open(a.replace(l,"http://localhost:5173")))},{signal:t.signal})}),[i(gp,{}),i(x,{get when(){return localStorage.getItem(Wl)},children:n=>(()=>{var r=pp(),s=r.firstChild;s.firstChild;var a=s.nextSibling;return d(s,n,null),a.$$click=()=>{localStorage.removeItem(Wl),location.reload()},r})()}),i(Pg,{}),(()=>{var n=fp();return d(n,()=>e.children),n})(),mp()]}$e(["click"]);var _p=p("<p>");const[zi,bp]=O(Ss);setInterval(()=>bp(new Date/1e3),1e3*30);function yp(e){const t=e.airingAt<zi(),n=N(()=>{const s=Math.abs(e.airingAt-zi());return t?ks-s%ks:s}),r=N(s=>s===!1&&e.airingAt<zi()?(e.setAiringEpisode(a=>a+1),!0):s,!1);return[i(x,{get when(){return!t&&r()},children:"aired in"}),(()=>{var s=_p();return d(s,i(x,{get when(){return Math.floor(n()/3600/24)},children:a=>[a,"d "]}),null),d(s,i(x,{get when(){return Math.floor(n()/3600%24)},children:a=>[a,"h "]}),null),d(s,i(x,{get when(){return Math.floor(n()%3600/60)},children:a=>[a,"m "]}),null),s})()]}var wp=p('<button data-k-9c12ef02 class="cp-current-card-hover-info normal">Completed'),kp=p("<button data-k-9c12ef02 class=cp-current-card-hover-info> <span data-k-9c12ef02 class=plus>+"),Sp=p("<img data-k-9c12ef02 alt=Cover.>"),Cp=p("<div data-k-9c12ef02 class=is-behind-container>"),Ap=p("<div data-k-9c12ef02 class=cp-current-card-info><p data-k-9c12ef02>Ep "),Tp=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> behind"),xp=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> left"),Ip=p("<p data-k-9c12ef02> chapter<! data-k-9c12ef02> left"),Ep=p('<div data-k-9c12ef02 class=hover data-tooltip-positions="right left middle"><p data-k-9c12ef02 class=line-clamp></p><p data-k-9c12ef02 class=progress-status>Progress: ');function Lp(e){if(!(e!=null&&e.episode))return null;if((e==null?void 0:e.airingAt)<Ss){const t=Math.abs(e.airingAt-Ss);return e.episode+Math.floor(t/ks)+1}return e.episode}function Pp(e){const t=ya(async(n,r)=>{const s=ll(Id,{mediaId:n,progress:r},AbortSignal.timeout(3e4));try{const a=await Jd(s);if(a.status!==200)return;const l=await a.json();Qc(l.data.SaveMediaListEntry.progress,"No progress found"),e.data.progress=l.data.SaveMediaListEntry.progress,l.data.SaveMediaListEntry.status==="COMPLETED"?e.mutateCache(o=>{for(const{lists:c}of Object.values(o.data.data))for(const u of c)u.entries=u.entries.filter(h=>h.media.id!==n);return o}):e.mutateCache(o=>o)}catch{console.error("Error")}},250,2);return i(z,{get fallback(){return(()=>{var n=kp(),r=n.firstChild;return n.$$click=s=>{s.preventDefault(),t(e.data.media.id,e.progress()+1),e.setProgress(a=>a+1)},d(n,()=>e.progress,r),n})()},get children(){return i(M,{get when(){return e.data.media.episodes===e.progress()||e.data.media.chapters===e.progress()},get children(){var n=wp();return n.$$click=r=>r.preventDefault(),n}})}})}function Mp(e){const[t,n]=O(e.data.progress),[r,s]=O(Lp(e.data.media.nextAiringEpisode)),a=N(()=>r()>t()+1),l=()=>r()-(t()+1),o=()=>Math.min(l()/10,.45),c=()=>1/(l()-o())*100;return i(U,{get href(){return Ge(e.data.media)},"data-tooltip-trigger":!0,class:"cp-current-card",get children(){return[(()=>{var u=Sp();return P(()=>G(u,"src",e.data.media.coverImage.large)),u})(),i(x,{get when(){var u;return(u=e.data.media.nextAiringEpisode)==null?void 0:u.airingAt},get children(){var u=Ap(),h=u.firstChild;return h.firstChild,d(h,r,null),d(u,i(yp,{get airingAt(){return e.data.media.nextAiringEpisode.airingAt},setAiringEpisode:s}),null),d(u,i(x,{get when(){return a()},get children(){var f=Cp();return P(g=>(g=`repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${c()*(1-o())}%, transparent ${c()*(1-o())}%, transparent ${c()}%)`)!=null?f.style.setProperty("background",g):f.style.removeProperty("background")),f}}),null),u}}),i(Pp,{get data(){return e.data},get mutateCache(){return e.mutateCache},progress:t,setProgress:n}),(()=>{var u=Ep(),h=u.firstChild,f=h.nextSibling;return f.firstChild,d(u,i(z,{get children(){return[i(M,{get when(){return N(()=>!!r())()&&a()},get children(){var g=Tp(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>r()-(t()+1),m),d(g,()=>r()-(t()+1)>1&&"s",y),g}}),i(M,{get when(){return N(()=>r()==null)()&&e.data.media.episodes-t()>0},get children(){var g=xp(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.episodes-t(),m),d(g,()=>e.data.media.episodes-t()>1&&"s",y),g}}),i(M,{get when(){return e.data.media.chapters-t()>0},get children(){var g=Ip(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.chapters-t(),m),d(g,()=>e.data.media.chapters-t()>1&&"s",y),g}})]}}),h),d(h,()=>e.data.media.title.userPreferred),d(f,t,null),d(f,i(x,{get when(){return e.data.media.episodes},get children(){return["/",N(()=>e.data.media.episodes)]}}),null),d(f,i(x,{get when(){return e.data.media.chapters},get children(){return["/",N(()=>e.data.media.chapters)]}}),null),u})()]}})}$e(["click"]);var Dp=p('<div data-k-ea0ffbeb class="grid-column-auto-fill current">');function Rp(e){return i(x,{get when(){return e.cards.length},get children(){var t=Dp();return d(t,i(H,{get each(){return e.cards},children:n=>i(Mp,{data:n,get mutateCache(){return e.mutateCache}})})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}var Np=p("<div data-k-b9535d1e class=pg-home-current>");function Op(){const[e,t]=O(),[n,r]=O(!1);let s,a;W(()=>{const o=qm();if(!Cn()||!o)return;s==null||s.abort(),s=new AbortController;const u=ll(gm,{userId:o,statusIn:["CURRENT","REPEATING"]},s.signal);Xd(u,{name:"Currently watching",onStart:()=>{r(!0)},onStop:()=>{r(!1)},setValue:h=>{a=h,t(Fp(h))}})});const l=o=>{a!=null&&a.cacheKey&&(o=Zs(o)?o(a):o,o&&Kd("fetches",o))};return(()=>{var o=Np();return d(o,i(H,{get each(){return e()},children:c=>i(Rp,{get cards(){return c.entries},mutateCache:l,get loading(){return n()}})})),o})()}function Fp(e){const t=[];for(const r of Object.values(e.data.data))for(const{name:s,entries:a}of r.lists){const l=[],o={name:s,entries:[]};for(const c of a)c.media.nextAiringEpisode?l.push(c):o.entries.push(c);l.sort((c,u)=>c.media.nextAiringEpisode.airingAt-u.media.nextAiringEpisode.airingAt),l.length<5?o.entries.unshift(...l):t.push({name:s+" (Airing)",entries:l}),t.push(o)}return t}const mn=(e,t)=>{let n;const r=()=>clearTimeout(n);return Rr()&&ze(r),Object.assign((...a)=>{n!==void 0&&r(),n=setTimeout(()=>e(...a),t)},{clear:r})};function tr(e,t,n){let r;(function(c){c[c.Ready=0]="Ready",c[c.Leading=1]="Leading",c[c.Trailing=2]="Trailing"})(r||(r={}));let s=r.Ready;const a=e(c=>{s===r.Trailing&&t(...c),s=r.Ready},n),l=(...c)=>{s!==r.Trailing&&(s===r.Ready&&t(...c),s+=1),a(c)},o=()=>{s=r.Ready,a.clear()};return Rr()&&ze(o),Object.assign(l,{clear:o})}var Bp=p("<span>");function Xn(e){const[t,n]=gi(e,["class"]);return(()=>{var r=Bp();return Lt(r,Fe({get class(){return"cp-loader-circle "+t.class||""}},n),!1,!1),r})()}var Up=p("<tool-tip inert role=tooltip>",!0,!1,!1);function xt(e){return(()=>{var t=Up();return Lt(t,e,!1,!1),t._$owner=Rr(),P(()=>G(t,"tip-position",e.tipPosition)),t})()}function ol(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let nr=ol();function Zd(e){nr=e}const aa={exec:()=>null};function Le(e,t=""){let n=typeof e=="string"?e:e.source;const r={replace:(s,a)=>{let l=typeof a=="string"?a:a.source;return l=l.replace(yt.caret,"$1"),n=n.replace(s,l),r},getRegex:()=>new RegExp(n,t)};return r}const yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Vp=/^(?:[ \t]*(?:\n|$))+/,Gp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Hp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wa=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,jp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,cl=/(?:[*+-]|\d{1,9}[.)])/,Qd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,eu=Le(Qd).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Yp=Le(Qd).replace(/bull/g,cl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),dl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qp=/^[^\n]+/,ul=/(?!\s*\])(?:\\.|[^\[\]\\])+/,zp=Le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ul).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wp=Le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,cl).getRegex(),yi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",hl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Kp=Le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",hl).replace("tag",yi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),tu=Le(dl).replace("hr",wa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),Jp=Le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",tu).getRegex(),gl={blockquote:Jp,code:Gp,def:zp,fences:Hp,heading:jp,hr:wa,html:Kp,lheading:eu,list:Wp,newline:Vp,paragraph:tu,table:aa,text:qp},go=Le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex(),Xp={...gl,lheading:Yp,table:go,paragraph:Le(dl).replace("hr",wa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",go).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",yi).getRegex()},Zp={...gl,html:Le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",hl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:aa,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Le(dl).replace("hr",wa).replace("heading",` *#{1,6} *[^
]`).replace("lheading",eu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ev=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,nu=/^( {2,}|\\)\n(?!\s*$)/,tv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,wi=/[\p{P}\p{S}]/u,fl=/[\s\p{P}\p{S}]/u,ru=/[^\s\p{P}\p{S}]/u,nv=Le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,fl).getRegex(),au=/(?!~)[\p{P}\p{S}]/u,rv=/(?!~)[\s\p{P}\p{S}]/u,av=/(?:[^\s\p{P}\p{S}]|~)/u,iv=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,iu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sv=Le(iu,"u").replace(/punct/g,wi).getRegex(),lv=Le(iu,"u").replace(/punct/g,au).getRegex(),su="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ov=Le(su,"gu").replace(/notPunctSpace/g,ru).replace(/punctSpace/g,fl).replace(/punct/g,wi).getRegex(),cv=Le(su,"gu").replace(/notPunctSpace/g,av).replace(/punctSpace/g,rv).replace(/punct/g,au).getRegex(),dv=Le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ru).replace(/punctSpace/g,fl).replace(/punct/g,wi).getRegex(),uv=Le(/\\(punct)/,"gu").replace(/punct/g,wi).getRegex(),hv=Le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gv=Le(hl).replace("(?:-->|$)","-->").getRegex(),fv=Le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ri=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,mv=Le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",ri).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lu=Le(/^!?\[(label)\]\[(ref)\]/).replace("label",ri).replace("ref",ul).getRegex(),ou=Le(/^!?\[(ref)\](?:\[\])?/).replace("ref",ul).getRegex(),pv=Le("reflink|nolink(?!\\()","g").replace("reflink",lu).replace("nolink",ou).getRegex(),ml={_backpedal:aa,anyPunctuation:uv,autolink:hv,blockSkip:iv,br:nu,code:ev,del:aa,emStrongLDelim:sv,emStrongRDelimAst:ov,emStrongRDelimUnd:dv,escape:Qp,link:mv,nolink:ou,punctuation:nv,reflink:lu,reflinkSearch:pv,tag:fv,text:tv,url:aa},vv={...ml,link:Le(/^!?\[(label)\]\((.*?)\)/).replace("label",ri).getRegex(),reflink:Le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ri).getRegex()},As={...ml,emStrongRDelimAst:cv,emStrongLDelim:lv,url:Le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},$v={...As,br:Le(nu).replace("{2,}","*").getRegex(),text:Le(As.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Pa={normal:gl,gfm:Xp,pedantic:Zp},jr={normal:ml,gfm:As,breaks:$v,pedantic:vv},_v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},fo=e=>_v[e];function rn(e,t){if(t){if(yt.escapeTest.test(e))return e.replace(yt.escapeReplace,fo)}else if(yt.escapeTestNoEncode.test(e))return e.replace(yt.escapeReplaceNoEncode,fo);return e}function mo(e){try{e=encodeURI(e).replace(yt.percentDecode,"%")}catch{return null}return e}function po(e,t){var a;const n=e.replace(yt.findPipe,(l,o,c)=>{let u=!1,h=o;for(;--h>=0&&c[h]==="\\";)u=!u;return u?"|":" |"}),r=n.split(yt.splitPipe);let s=0;if(r[0].trim()||r.shift(),r.length>0&&!((a=r.at(-1))!=null&&a.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(yt.slashPipe,"|");return r}function Yr(e,t,n){const r=e.length;if(r===0)return"";let s=0;for(;s<r&&e.charAt(r-s-1)===t;)s++;return e.slice(0,r-s)}function bv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1}function vo(e,t,n,r,s){const a=t.href,l=t.title||null,o=e[1].replace(s.other.outputLinkReplace,"$1");if(e[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:n,href:a,title:l,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:n,href:a,title:l,text:o}}function yv(e,t,n){const r=e.match(n.other.indentCodeCompensation);if(r===null)return t;const s=r[1];return t.split(`
`).map(a=>{const l=a.match(n.other.beginningSpace);if(l===null)return a;const[o]=l;return o.length>=s.length?a.slice(s.length):a}).join(`
`)}class ai{constructor(t){Re(this,"options");Re(this,"rules");Re(this,"lexer");this.options=t||nr}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const r=n[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yr(r,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const r=n[0],s=yv(r,n[3]||"",this.rules);return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:s}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let r=n[2].trim();if(this.rules.other.endingHash.test(r)){const s=Yr(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:Yr(n[0],`
`)}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){let r=Yr(n[0],`
`).split(`
`),s="",a="";const l=[];for(;r.length>0;){let o=!1;const c=[];let u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),o=!0;else if(!o)c.push(r[u]);else break;r=r.slice(u);const h=c.join(`
`),f=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${h}`:h,a=a?`${a}
${f}`:f;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,l,!0),this.lexer.state.top=g,r.length===0)break;const m=l.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.blockquote(v);l[l.length-1]=$,s=s.substring(0,s.length-y.raw.length)+$.raw,a=a.substring(0,a.length-y.text.length)+$.text;break}else if((m==null?void 0:m.type)==="list"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.list(v);l[l.length-1]=$,s=s.substring(0,s.length-m.raw.length)+$.raw,a=a.substring(0,a.length-y.raw.length)+$.raw,r=v.substring(l.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:l,text:a}}}list(t){let n=this.rules.block.list.exec(t);if(n){let r=n[1].trim();const s=r.length>1,a={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");const l=this.rules.other.listItemRegex(r);let o=!1;for(;t;){let u=!1,h="",f="";if(!(n=l.exec(t))||this.rules.block.hr.test(t))break;h=n[0],t=t.substring(h.length);let g=n[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),m=t.split(`
`,1)[0],y=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):y?v=n[1].length+1:(v=n[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=n[1].length),y&&this.rules.other.blankLine.test(m)&&(h+=m+`
`,t=t.substring(m.length+1),u=!0),!u){const C=this.rules.other.nextBulletRegex(v),w=this.rules.other.hrRegex(v),b=this.rules.other.fencesBeginRegex(v),A=this.rules.other.headingBeginRegex(v),S=this.rules.other.htmlBeginRegex(v);for(;t;){const _=t.split(`
`,1)[0];let T;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),T=m):T=m.replace(this.rules.other.tabCharGlobal,"    "),b.test(m)||A.test(m)||S.test(m)||C.test(m)||w.test(m))break;if(T.search(this.rules.other.nonSpaceChar)>=v||!m.trim())f+=`
`+T.slice(v);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||b.test(g)||A.test(g)||w.test(g))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),h+=_+`
`,t=t.substring(_.length+1),g=T.slice(v)}}a.loose||(o?a.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(o=!0));let $=null,k;this.options.gfm&&($=this.rules.other.listIsTask.exec(f),$&&(k=$[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),a.items.push({type:"list_item",raw:h,task:!!$,checked:k,loose:!1,text:f,tokens:[]}),a.raw+=h}const c=a.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let u=0;u<a.items.length;u++)if(this.lexer.state.top=!1,a.items[u].tokens=this.lexer.blockTokens(a.items[u].text,[]),!a.loose){const h=a.items[u].tokens.filter(g=>g.type==="space"),f=h.length>0&&h.some(g=>this.rules.other.anyLine.test(g.raw));a.loose=f}if(a.loose)for(let u=0;u<a.items.length;u++)a.items[u].loose=!0;return a}}html(t){const n=this.rules.block.html.exec(t);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(t){const n=this.rules.block.def.exec(t);if(n){const r=n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=n[2]?n[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:s,title:a}}}table(t){var o;const n=this.rules.block.table.exec(t);if(!n||!this.rules.other.tableDelimiter.test(n[2]))return;const r=po(n[1]),s=n[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=(o=n[3])!=null&&o.trim()?n[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],l={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===s.length){for(const c of s)this.rules.other.tableAlignRight.test(c)?l.align.push("right"):this.rules.other.tableAlignCenter.test(c)?l.align.push("center"):this.rules.other.tableAlignLeft.test(c)?l.align.push("left"):l.align.push(null);for(let c=0;c<r.length;c++)l.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:l.align[c]});for(const c of a)l.rows.push(po(c,l.header.length).map((u,h)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:l.align[h]})));return l}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:n[1]}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&this.rules.other.startATag.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const r=n[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const l=Yr(r.slice(0,-1),"\\");if((r.length-l.length)%2===0)return}else{const l=bv(n[2],"()");if(l>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+l;n[2]=n[2].substring(0,l),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let s=n[2],a="";if(this.options.pedantic){const l=this.rules.other.pedanticHrefTitle.exec(s);l&&(s=l[1],a=l[3])}else a=n[3]?n[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),vo(n,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer,this.rules)}}reflink(t,n){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){const s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=n[s.toLowerCase()];if(!a){const l=r[0].charAt(0);return{type:"text",raw:l,text:l}}return vo(r,a,r[0],this.lexer,this.rules)}}emStrong(t,n,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const l=[...s[0]].length-1;let o,c,u=l,h=0;const f=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*t.length+l);(s=f.exec(n))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(c=[...o].length,s[3]||s[4]){u+=c;continue}else if((s[5]||s[6])&&l%3&&!((l+c)%3)){h+=c;continue}if(u-=c,u>0)continue;c=Math.min(c,c+u+h);const g=[...s[0]][0].length,m=t.slice(0,l+s.index+g+c);if(Math.min(l,c)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let r=n[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(r),a=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&a&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:n[0],text:r}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t){const n=this.rules.inline.autolink.exec(t);if(n){let r,s;return n[2]==="@"?(r=n[1],s="mailto:"+r):(r=n[1],s=r),{type:"link",raw:n[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){var r;let n;if(n=this.rules.inline.url.exec(t)){let s,a;if(n[2]==="@")s=n[0],a="mailto:"+s;else{let l;do l=n[0],n[0]=((r=this.rules.inline._backpedal.exec(n[0]))==null?void 0:r[0])??"";while(l!==n[0]);s=n[0],n[1]==="www."?a="http://"+n[0]:a=n[0]}return{type:"link",raw:n[0],text:s,href:a,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){const n=this.rules.inline.text.exec(t);if(n){const r=this.lexer.state.inRawBlock;return{type:"text",raw:n[0],text:n[0],escaped:r}}}}class Ut{constructor(t){Re(this,"tokens");Re(this,"options");Re(this,"state");Re(this,"tokenizer");Re(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||nr,this.options.tokenizer=this.options.tokenizer||new ai,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:yt,block:Pa.normal,inline:jr.normal};this.options.pedantic?(n.block=Pa.pedantic,n.inline=jr.pedantic):this.options.gfm&&(n.block=Pa.gfm,this.options.breaks?n.inline=jr.breaks:n.inline=jr.gfm),this.tokenizer.rules=n}static get rules(){return{block:Pa,inline:jr}}static lex(t,n){return new Ut(n).lex(t)}static lexInline(t,n){return new Ut(n).inlineTokens(t)}lex(t){t=t.replace(yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var s,a,l;for(this.options.pedantic&&(t=t.replace(yt.tabCharGlobal,"    ").replace(yt.spaceLine,""));t;){let o;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(u=>(o=u.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const u=n.at(-1);o.raw.length===1&&u!==void 0?u.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.raw,this.inlineQueue.at(-1).src=u.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((l=this.options.extensions)!=null&&l.startBlock){let u=1/0;const h=t.slice(1);let f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},h),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(c=t.substring(0,u+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const u=n.at(-1);r&&(u==null?void 0:u.type)==="paragraph"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o),r=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,u;let r=t,s=null;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)h.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a=!1,l="";for(;t;){a||(l=""),a=!1;let h;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(g=>(h=g.call({lexer:this},t,n))?(t=t.substring(h.raw.length),n.push(h),!0):!1))continue;if(h=this.tokenizer.escape(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.tag(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.link(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(h.raw.length);const g=n.at(-1);h.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(h=this.tokenizer.emStrong(t,r,l)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.codespan(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.br(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.del(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.autolink(t)){t=t.substring(h.raw.length),n.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(t))){t=t.substring(h.raw.length),n.push(h);continue}let f=t;if((u=this.options.extensions)!=null&&u.startInline){let g=1/0;const m=t.slice(1);let y;this.options.extensions.startInline.forEach(v=>{y=v.call({lexer:this},m),typeof y=="number"&&y>=0&&(g=Math.min(g,y))}),g<1/0&&g>=0&&(f=t.substring(0,g+1))}if(h=this.tokenizer.inlineText(f)){t=t.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(l=h.raw.slice(-1)),a=!0;const g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(t){const g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class ii{constructor(t){Re(this,"options");Re(this,"parser");this.options=t||nr}space(t){return""}code({text:t,lang:n,escaped:r}){var l;const s=(l=(n||"").match(yt.notSpaceStart))==null?void 0:l[0],a=t.replace(yt.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${rn(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:n,tokens:r}){const s=this.parser.parseInline(r),a=mo(t);if(a===null)return s;t=a;let l='<a href="'+t+'"';return n&&(l+=' title="'+rn(n)+'"'),l+=">"+s+"</a>",l}image({href:t,title:n,text:r}){const s=mo(t);if(s===null)return rn(r);t=s;let a=`<img src="${t}" alt="${r}"`;return n&&(a+=` title="${rn(n)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:rn(t.text)}}class pl{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}}class Vt{constructor(t){Re(this,"options");Re(this,"renderer");Re(this,"textRenderer");this.options=t||nr,this.options.renderer=this.options.renderer||new ii,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pl}static parse(t,n){return new Vt(n).parse(t)}static parseInline(t,n){return new Vt(n).parseInline(t)}parse(t,n=!0){var s,a;let r="";for(let l=0;l<t.length;l++){const o=t[l];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[o.type]){const u=o,h=this.options.extensions.renderers[u.type].call({parser:this},u);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type)){r+=h||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let u=c,h=this.renderer.text(u);for(;l+1<t.length&&t[l+1].type==="text";)u=t[++l],h+=`
`+this.renderer.text(u);n?r+=this.renderer.paragraph({type:"paragraph",raw:h,text:h,tokens:[{type:"text",raw:h,text:h,escaped:!0}]}):r+=h;continue}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}parseInline(t,n=this.renderer){var s,a;let r="";for(let l=0;l<t.length;l++){const o=t[l];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[o.type]){const u=this.options.extensions.renderers[o.type].call({parser:this},o);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=u||"";continue}}const c=o;switch(c.type){case"escape":{r+=n.text(c);break}case"html":{r+=n.html(c);break}case"link":{r+=n.link(c);break}case"image":{r+=n.image(c);break}case"strong":{r+=n.strong(c);break}case"em":{r+=n.em(c);break}case"codespan":{r+=n.codespan(c);break}case"br":{r+=n.br(c);break}case"del":{r+=n.del(c);break}case"text":{r+=n.text(c);break}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}}class ia{constructor(t){Re(this,"options");Re(this,"block");this.options=t||nr}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}}Re(ia,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class wv{constructor(...t){Re(this,"defaults",ol());Re(this,"options",this.setOptions);Re(this,"parse",this.parseMarkdown(!0));Re(this,"parseInline",this.parseMarkdown(!1));Re(this,"Parser",Vt);Re(this,"Renderer",ii);Re(this,"TextRenderer",pl);Re(this,"Lexer",Ut);Re(this,"Tokenizer",ai);Re(this,"Hooks",ia);this.use(...t)}walkTokens(t,n){var s,a;let r=[];for(const l of t)switch(r=r.concat(n.call(this,l)),l.type){case"table":{const o=l;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,n));for(const c of o.rows)for(const u of c)r=r.concat(this.walkTokens(u.tokens,n));break}case"list":{const o=l;r=r.concat(this.walkTokens(o.items,n));break}default:{const o=l;(a=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&a[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const u=o[c].flat(1/0);r=r.concat(this.walkTokens(u,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...t){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{const s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){const l=n.renderers[a.name];l?n.renderers[a.name]=function(...o){let c=a.renderer.apply(this,o);return c===!1&&(c=l.apply(this,o)),c}:n.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const l=n[a.level];l?l.unshift(a.tokenizer):n[a.level]=[a.tokenizer],a.start&&(a.level==="block"?n.startBlock?n.startBlock.push(a.start):n.startBlock=[a.start]:a.level==="inline"&&(n.startInline?n.startInline.push(a.start):n.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(n.childTokens[a.name]=a.childTokens)}),s.extensions=n),r.renderer){const a=this.defaults.renderer||new ii(this.defaults);for(const l in r.renderer){if(!(l in a))throw new Error(`renderer '${l}' does not exist`);if(["options","parser"].includes(l))continue;const o=l,c=r.renderer[o],u=a[o];a[o]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f||""}}s.renderer=a}if(r.tokenizer){const a=this.defaults.tokenizer||new ai(this.defaults);for(const l in r.tokenizer){if(!(l in a))throw new Error(`tokenizer '${l}' does not exist`);if(["options","rules","lexer"].includes(l))continue;const o=l,c=r.tokenizer[o],u=a[o];a[o]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f}}s.tokenizer=a}if(r.hooks){const a=this.defaults.hooks||new ia;for(const l in r.hooks){if(!(l in a))throw new Error(`hook '${l}' does not exist`);if(["options","block"].includes(l))continue;const o=l,c=r.hooks[o],u=a[o];ia.passThroughHooks.has(l)?a[o]=h=>{if(this.defaults.async)return Promise.resolve(c.call(a,h)).then(g=>u.call(a,g));const f=c.call(a,h);return u.call(a,f)}:a[o]=(...h)=>{let f=c.apply(a,h);return f===!1&&(f=u.apply(a,h)),f}}s.hooks=a}if(r.walkTokens){const a=this.defaults.walkTokens,l=r.walkTokens;s.walkTokens=function(o){let c=[];return c.push(l.call(this,o)),a&&(c=c.concat(a.call(this,o))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,n){return Ut.lex(t,n??this.defaults)}parser(t,n){return Vt.parse(t,n??this.defaults)}parseMarkdown(t){return(r,s)=>{const a={...s},l={...this.defaults,...a},o=this.onError(!!l.silent,!!l.async);if(this.defaults.async===!0&&a.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));l.hooks&&(l.hooks.options=l,l.hooks.block=t);const c=l.hooks?l.hooks.provideLexer():t?Ut.lex:Ut.lexInline,u=l.hooks?l.hooks.provideParser():t?Vt.parse:Vt.parseInline;if(l.async)return Promise.resolve(l.hooks?l.hooks.preprocess(r):r).then(h=>c(h,l)).then(h=>l.hooks?l.hooks.processAllTokens(h):h).then(h=>l.walkTokens?Promise.all(this.walkTokens(h,l.walkTokens)).then(()=>h):h).then(h=>u(h,l)).then(h=>l.hooks?l.hooks.postprocess(h):h).catch(o);try{l.hooks&&(r=l.hooks.preprocess(r));let h=c(r,l);l.hooks&&(h=l.hooks.processAllTokens(h)),l.walkTokens&&this.walkTokens(h,l.walkTokens);let f=u(h,l);return l.hooks&&(f=l.hooks.postprocess(f)),f}catch(h){return o(h)}}}onError(t,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const s="<p>An error occurred:</p><pre>"+rn(r.message+"",!0)+"</pre>";return n?Promise.resolve(s):s}if(n)return Promise.reject(r);throw r}}}const Zn=new wv;function Te(e,t){return Zn.parse(e,t)}Te.options=Te.setOptions=function(e){return Zn.setOptions(e),Te.defaults=Zn.defaults,Zd(Te.defaults),Te};Te.getDefaults=ol;Te.defaults=nr;Te.use=function(...e){return Zn.use(...e),Te.defaults=Zn.defaults,Zd(Te.defaults),Te};Te.walkTokens=function(e,t){return Zn.walkTokens(e,t)};Te.parseInline=Zn.parseInline;Te.Parser=Vt;Te.parser=Vt.parse;Te.Renderer=ii;Te.TextRenderer=pl;Te.Lexer=Ut;Te.lexer=Ut.lex;Te.Tokenizer=ai;Te.Hooks=ia;Te.parse=Te;Te.options;Te.setOptions;Te.use;Te.walkTokens;Te.parseInline;Vt.parse;Ut.lex;/*! @license DOMPurify 3.4.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.1/LICENSE */const{entries:cu,setPrototypeOf:$o,isFrozen:kv,getPrototypeOf:Sv,getOwnPropertyDescriptor:Cv}=Object;let{freeze:wt,seal:Gt,create:gr}=Object,{apply:Ts,construct:xs}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});Gt||(Gt=function(t){return t});Ts||(Ts=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),a=2;a<r;a++)s[a-2]=arguments[a];return t.apply(n,s)});xs||(xs=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});const qr=Qe(Array.prototype.forEach),Av=Qe(Array.prototype.lastIndexOf),_o=Qe(Array.prototype.pop),zr=Qe(Array.prototype.push),Tv=Qe(Array.prototype.splice),bt=Array.isArray,ta=Qe(String.prototype.toLowerCase),Wi=Qe(String.prototype.toString),bo=Qe(String.prototype.match),dr=Qe(String.prototype.replace),yo=Qe(String.prototype.indexOf),xv=Qe(String.prototype.trim),Iv=Qe(Number.prototype.toString),Ev=Qe(Boolean.prototype.toString),wo=typeof BigInt>"u"?null:Qe(BigInt.prototype.toString),ko=typeof Symbol>"u"?null:Qe(Symbol.prototype.toString),Ye=Qe(Object.prototype.hasOwnProperty),Wr=Qe(Object.prototype.toString),gt=Qe(RegExp.prototype.test),Ma=Lv(TypeError);function Qe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ts(e,t,r)}}function Lv(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return xs(e,n)}}function we(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ta;if($o&&$o(e,null),!bt(t))return e;let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){const a=n(s);a!==s&&(kv(t)||(t[r]=a),s=a)}e[s]=!0}return e}function Pv(e){for(let t=0;t<e.length;t++)Ye(e,t)||(e[t]=null);return e}function At(e){const t=gr(null);for(const[n,r]of cu(e))Ye(e,n)&&(bt(r)?t[n]=Pv(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=At(r):t[n]=r);return t}function Mv(e){switch(typeof e){case"string":return e;case"number":return Iv(e);case"boolean":return Ev(e);case"bigint":return wo?wo(e):"0";case"symbol":return ko?ko(e):"Symbol()";case"undefined":return Wr(e);case"function":case"object":{if(e===null)return Wr(e);const t=e,n=fr(t,"toString");if(typeof n=="function"){const r=n(t);return typeof r=="string"?r:Wr(r)}return Wr(e)}default:return Wr(e)}}function fr(e,t){for(;e!==null;){const r=Cv(e,t);if(r){if(r.get)return Qe(r.get);if(typeof r.value=="function")return Qe(r.value)}e=Sv(e)}function n(){return null}return n}function Dv(e){try{return gt(e,""),!0}catch{return!1}}const So=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ki=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ji=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Rv=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Xi=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Nv=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Co=wt(["#text"]),Ao=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Zi=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),To=wt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Da=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ov=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fv=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Bv=Gt(/\$\{[\w\W]*/gm),Uv=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Vv=Gt(/^aria-[\-\w]+$/),du=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gv=Gt(/^(?:\w+script|data):/i),Hv=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),uu=Gt(/^html$/i),jv=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i);var xo=Object.freeze({__proto__:null,ARIA_ATTR:Vv,ATTR_WHITESPACE:Hv,CUSTOM_ELEMENT:jv,DATA_ATTR:Uv,DOCTYPE_NAME:uu,ERB_EXPR:Fv,IS_ALLOWED_URI:du,IS_SCRIPT_OR_DATA:Gv,MUSTACHE_EXPR:Ov,TMPLIT_EXPR:Bv});const Kr={element:1,text:3,progressingInstruction:7,comment:8,document:9},Yv=function(){return typeof window>"u"?null:window},qv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));const a="dompurify"+(r?"#"+r:"");try{return t.createPolicy(a,{createHTML(l){return l},createScriptURL(l){return l}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Io=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yv();const t=me=>hu(me);if(t.version="3.4.1",t.removed=[],!e||!e.document||e.document.nodeType!==Kr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const r=n,s=r.currentScript,{DocumentFragment:a,HTMLTemplateElement:l,Node:o,Element:c,NodeFilter:u,NamedNodeMap:h=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,y=c.prototype,v=fr(y,"cloneNode"),$=fr(y,"remove"),k=fr(y,"nextSibling"),C=fr(y,"childNodes"),w=fr(y,"parentNode");if(typeof l=="function"){const me=n.createElement("template");me.content&&me.content.ownerDocument&&(n=me.content.ownerDocument)}let b,A="";const{implementation:S,createNodeIterator:_,createDocumentFragment:T,getElementsByTagName:I}=n,{importNode:E}=r;let L=Io();t.isSupported=typeof cu=="function"&&typeof w=="function"&&S&&S.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:B,TMPLIT_EXPR:V,DATA_ATTR:X,ARIA_ATTR:j,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:ae,CUSTOM_ELEMENT:re}=xo;let{IS_ALLOWED_URI:Q}=xo,J=null;const pe=we({},[...So,...Ki,...Ji,...Xi,...Co]);let ve=null;const fe=we({},[...Ao,...Zi,...To,...Da]);let ee=Object.seal(gr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),q=null,He=null;const De=Object.seal(gr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Be=!0,et=!0,Pt=!1,Mt=!0,rt=!1,kt=!0,at=!1,dt=!1,Dt=!1,ft=!1,te=!1,Z=!1,_e=!0,ke=!1;const it="user-content-";let _t=!0,Ie=!1,Ve={},st=null;const Rn=we({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let rr=null;const ar=we({},["audio","video","img","source","image","track"]);let ir=null;const Br=we({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nn="http://www.w3.org/1998/Math/MathML",On="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml";let ln=lt,sr=!1,Ur=null;const Ai=we({},[Nn,On,lt],Wi);let Vr=we({},["mi","mo","mn","ms","mtext"]),lr=we({},["annotation-xml"]);const Ti=we({},["title","style","font","a","script"]);let Fn=null;const xi=["application/xhtml+xml","text/html"],on="text/html";let je=null,he=null;const cn=n.createElement("form"),nn=function(D){return D instanceof RegExp||D instanceof Function},Gr=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(he&&he===D)return;(!D||typeof D!="object")&&(D={}),D=At(D),Fn=xi.indexOf(D.PARSER_MEDIA_TYPE)===-1?on:D.PARSER_MEDIA_TYPE,je=Fn==="application/xhtml+xml"?Wi:ta,J=Ye(D,"ALLOWED_TAGS")&&bt(D.ALLOWED_TAGS)?we({},D.ALLOWED_TAGS,je):pe,ve=Ye(D,"ALLOWED_ATTR")&&bt(D.ALLOWED_ATTR)?we({},D.ALLOWED_ATTR,je):fe,Ur=Ye(D,"ALLOWED_NAMESPACES")&&bt(D.ALLOWED_NAMESPACES)?we({},D.ALLOWED_NAMESPACES,Wi):Ai,ir=Ye(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)?we(At(Br),D.ADD_URI_SAFE_ATTR,je):Br,rr=Ye(D,"ADD_DATA_URI_TAGS")&&bt(D.ADD_DATA_URI_TAGS)?we(At(ar),D.ADD_DATA_URI_TAGS,je):ar,st=Ye(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)?we({},D.FORBID_CONTENTS,je):Rn,q=Ye(D,"FORBID_TAGS")&&bt(D.FORBID_TAGS)?we({},D.FORBID_TAGS,je):At({}),He=Ye(D,"FORBID_ATTR")&&bt(D.FORBID_ATTR)?we({},D.FORBID_ATTR,je):At({}),Ve=Ye(D,"USE_PROFILES")?D.USE_PROFILES&&typeof D.USE_PROFILES=="object"?At(D.USE_PROFILES):D.USE_PROFILES:!1,Be=D.ALLOW_ARIA_ATTR!==!1,et=D.ALLOW_DATA_ATTR!==!1,Pt=D.ALLOW_UNKNOWN_PROTOCOLS||!1,Mt=D.ALLOW_SELF_CLOSE_IN_ATTR!==!1,rt=D.SAFE_FOR_TEMPLATES||!1,kt=D.SAFE_FOR_XML!==!1,at=D.WHOLE_DOCUMENT||!1,ft=D.RETURN_DOM||!1,te=D.RETURN_DOM_FRAGMENT||!1,Z=D.RETURN_TRUSTED_TYPE||!1,Dt=D.FORCE_BODY||!1,_e=D.SANITIZE_DOM!==!1,ke=D.SANITIZE_NAMED_PROPS||!1,_t=D.KEEP_CONTENT!==!1,Ie=D.IN_PLACE||!1,Q=Dv(D.ALLOWED_URI_REGEXP)?D.ALLOWED_URI_REGEXP:du,ln=typeof D.NAMESPACE=="string"?D.NAMESPACE:lt,Vr=Ye(D,"MATHML_TEXT_INTEGRATION_POINTS")&&D.MATHML_TEXT_INTEGRATION_POINTS&&typeof D.MATHML_TEXT_INTEGRATION_POINTS=="object"?At(D.MATHML_TEXT_INTEGRATION_POINTS):we({},["mi","mo","mn","ms","mtext"]),lr=Ye(D,"HTML_INTEGRATION_POINTS")&&D.HTML_INTEGRATION_POINTS&&typeof D.HTML_INTEGRATION_POINTS=="object"?At(D.HTML_INTEGRATION_POINTS):we({},["annotation-xml"]);const Y=Ye(D,"CUSTOM_ELEMENT_HANDLING")&&D.CUSTOM_ELEMENT_HANDLING&&typeof D.CUSTOM_ELEMENT_HANDLING=="object"?At(D.CUSTOM_ELEMENT_HANDLING):gr(null);if(ee=gr(null),Ye(Y,"tagNameCheck")&&nn(Y.tagNameCheck)&&(ee.tagNameCheck=Y.tagNameCheck),Ye(Y,"attributeNameCheck")&&nn(Y.attributeNameCheck)&&(ee.attributeNameCheck=Y.attributeNameCheck),Ye(Y,"allowCustomizedBuiltInElements")&&typeof Y.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=Y.allowCustomizedBuiltInElements),rt&&(et=!1),te&&(ft=!0),Ve&&(J=we({},Co),ve=gr(null),Ve.html===!0&&(we(J,So),we(ve,Ao)),Ve.svg===!0&&(we(J,Ki),we(ve,Zi),we(ve,Da)),Ve.svgFilters===!0&&(we(J,Ji),we(ve,Zi),we(ve,Da)),Ve.mathMl===!0&&(we(J,Xi),we(ve,To),we(ve,Da))),De.tagCheck=null,De.attributeCheck=null,Ye(D,"ADD_TAGS")&&(typeof D.ADD_TAGS=="function"?De.tagCheck=D.ADD_TAGS:bt(D.ADD_TAGS)&&(J===pe&&(J=At(J)),we(J,D.ADD_TAGS,je))),Ye(D,"ADD_ATTR")&&(typeof D.ADD_ATTR=="function"?De.attributeCheck=D.ADD_ATTR:bt(D.ADD_ATTR)&&(ve===fe&&(ve=At(ve)),we(ve,D.ADD_ATTR,je))),Ye(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)&&we(ir,D.ADD_URI_SAFE_ATTR,je),Ye(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)&&(st===Rn&&(st=At(st)),we(st,D.FORBID_CONTENTS,je)),Ye(D,"ADD_FORBID_CONTENTS")&&bt(D.ADD_FORBID_CONTENTS)&&(st===Rn&&(st=At(st)),we(st,D.ADD_FORBID_CONTENTS,je)),_t&&(J["#text"]=!0),at&&we(J,["html","head","body"]),J.table&&(we(J,["tbody"]),delete q.tbody),D.TRUSTED_TYPES_POLICY){if(typeof D.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ma('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof D.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ma('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');b=D.TRUSTED_TYPES_POLICY,A=b.createHTML("")}else b===void 0&&(b=qv(m,s)),b!==null&&typeof A=="string"&&(A=b.createHTML(""));wt&&wt(D),he=D},Bn=we({},[...Ki,...Ji,...Rv]),Hr=we({},[...Xi,...Nv]),Un=function(D){let Y=w(D);(!Y||!Y.tagName)&&(Y={namespaceURI:ln,tagName:"template"});const de=ta(D.tagName),Ue=ta(Y.tagName);return Ur[D.namespaceURI]?D.namespaceURI===On?Y.namespaceURI===lt?de==="svg":Y.namespaceURI===Nn?de==="svg"&&(Ue==="annotation-xml"||Vr[Ue]):!!Bn[de]:D.namespaceURI===Nn?Y.namespaceURI===lt?de==="math":Y.namespaceURI===On?de==="math"&&lr[Ue]:!!Hr[de]:D.namespaceURI===lt?Y.namespaceURI===On&&!lr[Ue]||Y.namespaceURI===Nn&&!Vr[Ue]?!1:!Hr[de]&&(Ti[de]||!Bn[de]):!!(Fn==="application/xhtml+xml"&&Ur[D.namespaceURI]):!1},St=function(D){zr(t.removed,{element:D});try{w(D).removeChild(D)}catch{$(D)}},Vn=function(D,Y){try{zr(t.removed,{attribute:Y.getAttributeNode(D),from:Y})}catch{zr(t.removed,{attribute:null,from:Y})}if(Y.removeAttribute(D),D==="is")if(ft||te)try{St(Y)}catch{}else try{Y.setAttribute(D,"")}catch{}},Ll=function(D){let Y=null,de=null;if(Dt)D="<remove></remove>"+D;else{const Ze=bo(D,/^[\r\n\t ]+/);de=Ze&&Ze[0]}Fn==="application/xhtml+xml"&&ln===lt&&(D='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+D+"</body></html>");const Ue=b?b.createHTML(D):D;if(ln===lt)try{Y=new g().parseFromString(Ue,Fn)}catch{}if(!Y||!Y.documentElement){Y=S.createDocument(ln,"template",null);try{Y.documentElement.innerHTML=sr?A:Ue}catch{}}const mt=Y.body||Y.documentElement;return D&&de&&mt.insertBefore(n.createTextNode(de),mt.childNodes[0]||null),ln===lt?I.call(Y,at?"html":"body")[0]:at?Y.documentElement:mt},Pl=function(D){return _.call(D.ownerDocument||D,D,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ii=function(D){return D instanceof f&&(typeof D.nodeName!="string"||typeof D.textContent!="string"||typeof D.removeChild!="function"||!(D.attributes instanceof h)||typeof D.removeAttribute!="function"||typeof D.setAttribute!="function"||typeof D.namespaceURI!="string"||typeof D.insertBefore!="function"||typeof D.hasChildNodes!="function")},Ei=function(D){return typeof o=="function"&&D instanceof o};function dn(me,D,Y){qr(me,de=>{de.call(t,D,Y,he)})}const Ml=function(D){let Y=null;if(dn(L.beforeSanitizeElements,D,null),Ii(D))return St(D),!0;const de=je(D.nodeName);if(dn(L.uponSanitizeElement,D,{tagName:de,allowedTags:J}),kt&&D.hasChildNodes()&&!Ei(D.firstElementChild)&&gt(/<[/\w!]/g,D.innerHTML)&&gt(/<[/\w!]/g,D.textContent)||kt&&D.namespaceURI===lt&&de==="style"&&Ei(D.firstElementChild)||D.nodeType===Kr.progressingInstruction||kt&&D.nodeType===Kr.comment&&gt(/<[/\w]/g,D.data))return St(D),!0;if(q[de]||!(De.tagCheck instanceof Function&&De.tagCheck(de))&&!J[de]){if(!q[de]&&Rl(de)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,de)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(de)))return!1;if(_t&&!st[de]){const Ue=w(D)||D.parentNode,mt=C(D)||D.childNodes;if(mt&&Ue){const Ze=mt.length;for(let Ct=Ze-1;Ct>=0;--Ct){const Rt=v(mt[Ct],!0);Ue.insertBefore(Rt,k(D))}}}return St(D),!0}return D instanceof c&&!Un(D)||(de==="noscript"||de==="noembed"||de==="noframes")&&gt(/<\/no(script|embed|frames)/i,D.innerHTML)?(St(D),!0):(rt&&D.nodeType===Kr.text&&(Y=D.textContent,qr([R,B,V],Ue=>{Y=dr(Y,Ue," ")}),D.textContent!==Y&&(zr(t.removed,{element:D.cloneNode()}),D.textContent=Y)),dn(L.afterSanitizeElements,D,null),!1)},Dl=function(D,Y,de){if(He[Y]||_e&&(Y==="id"||Y==="name")&&(de in n||de in cn))return!1;if(!(et&&!He[Y]&&gt(X,Y))){if(!(Be&&gt(j,Y))){if(!(De.attributeCheck instanceof Function&&De.attributeCheck(Y,D))){if(!ve[Y]||He[Y]){if(!(Rl(D)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,D)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(D))&&(ee.attributeNameCheck instanceof RegExp&&gt(ee.attributeNameCheck,Y)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck(Y,D))||Y==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,de)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(de))))return!1}else if(!ir[Y]){if(!gt(Q,dr(de,ae,""))){if(!((Y==="src"||Y==="xlink:href"||Y==="href")&&D!=="script"&&yo(de,"data:")===0&&rr[D])){if(!(Pt&&!gt(K,dr(de,ae,"")))){if(de)return!1}}}}}}}return!0},ch=we({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Rl=function(D){return!ch[ta(D)]&&gt(re,D)},Nl=function(D){dn(L.beforeSanitizeAttributes,D,null);const{attributes:Y}=D;if(!Y||Ii(D))return;const de={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0};let Ue=Y.length;for(;Ue--;){const mt=Y[Ue],{name:Ze,namespaceURI:Ct,value:Rt}=mt,Yt=je(Ze),Li=Rt;let ot=Ze==="value"?Li:xv(Li);if(de.attrName=Yt,de.attrValue=ot,de.keepAttr=!0,de.forceKeepAttr=void 0,dn(L.uponSanitizeAttribute,D,de),ot=de.attrValue,ke&&(Yt==="id"||Yt==="name")&&yo(ot,it)!==0&&(Vn(Ze,D),ot=it+ot),kt&&gt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ot)){Vn(Ze,D);continue}if(Yt==="attributename"&&bo(ot,"href")){Vn(Ze,D);continue}if(de.forceKeepAttr)continue;if(!de.keepAttr){Vn(Ze,D);continue}if(!Mt&&gt(/\/>/i,ot)){Vn(Ze,D);continue}rt&&qr([R,B,V],Bl=>{ot=dr(ot,Bl," ")});const Fl=je(D.nodeName);if(!Dl(Fl,Yt,ot)){Vn(Ze,D);continue}if(b&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!Ct)switch(m.getAttributeType(Fl,Yt)){case"TrustedHTML":{ot=b.createHTML(ot);break}case"TrustedScriptURL":{ot=b.createScriptURL(ot);break}}if(ot!==Li)try{Ct?D.setAttributeNS(Ct,Ze,ot):D.setAttribute(Ze,ot),Ii(D)?St(D):_o(t.removed)}catch{Vn(Ze,D)}}dn(L.afterSanitizeAttributes,D,null)},Ol=function(D){let Y=null;const de=Pl(D);for(dn(L.beforeSanitizeShadowDOM,D,null);Y=de.nextNode();)dn(L.uponSanitizeShadowNode,Y,null),Ml(Y),Nl(Y),Y.content instanceof a&&Ol(Y.content);dn(L.afterSanitizeShadowDOM,D,null)};return t.sanitize=function(me){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},Y=null,de=null,Ue=null,mt=null;if(sr=!me,sr&&(me="<!-->"),typeof me!="string"&&!Ei(me)&&(me=Mv(me),typeof me!="string"))throw Ma("dirty is not a string, aborting");if(!t.isSupported)return me;if(dt||Gr(D),t.removed=[],typeof me=="string"&&(Ie=!1),Ie){const Rt=me.nodeName;if(typeof Rt=="string"){const Yt=je(Rt);if(!J[Yt]||q[Yt])throw Ma("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof o)Y=Ll("<!---->"),de=Y.ownerDocument.importNode(me,!0),de.nodeType===Kr.element&&de.nodeName==="BODY"||de.nodeName==="HTML"?Y=de:Y.appendChild(de);else{if(!ft&&!rt&&!at&&me.indexOf("<")===-1)return b&&Z?b.createHTML(me):me;if(Y=Ll(me),!Y)return ft?null:Z?A:""}Y&&Dt&&St(Y.firstChild);const Ze=Pl(Ie?me:Y);for(;Ue=Ze.nextNode();)Ml(Ue),Nl(Ue),Ue.content instanceof a&&Ol(Ue.content);if(Ie)return me;if(ft){if(rt){Y.normalize();let Rt=Y.innerHTML;qr([R,B,V],Yt=>{Rt=dr(Rt,Yt," ")}),Y.innerHTML=Rt}if(te)for(mt=T.call(Y.ownerDocument);Y.firstChild;)mt.appendChild(Y.firstChild);else mt=Y;return(ve.shadowroot||ve.shadowrootmode)&&(mt=E.call(r,mt,!0)),mt}let Ct=at?Y.outerHTML:Y.innerHTML;return at&&J["!doctype"]&&Y.ownerDocument&&Y.ownerDocument.doctype&&Y.ownerDocument.doctype.name&&gt(uu,Y.ownerDocument.doctype.name)&&(Ct="<!DOCTYPE "+Y.ownerDocument.doctype.name+`>
`+Ct),rt&&qr([R,B,V],Rt=>{Ct=dr(Ct,Rt," ")}),b&&Z?b.createHTML(Ct):Ct},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Gr(me),dt=!0},t.clearConfig=function(){he=null,dt=!1},t.isValidAttribute=function(me,D,Y){he||Gr({});const de=je(me),Ue=je(D);return Dl(de,Ue,Y)},t.addHook=function(me,D){typeof D=="function"&&zr(L[me],D)},t.removeHook=function(me,D){if(D!==void 0){const Y=Av(L[me],D);return Y===-1?void 0:Tv(L[me],Y,1)[0]}return _o(L[me])},t.removeHooks=function(me){L[me]=[]},t.removeAllHooks=function(){L=Io()},t}var gu=hu();const zv="_spoiler_fn1ga_1",Eo={spoiler:zv};var fu=p("<div>");const Wv={name:"spoiler",level:"inline",start(e){var t;return(t=e.match(/~!/))==null?void 0:t.index},tokenizer(e){const t=/^~!([^!~]+)!~/.exec(e);if(t)return{type:"spoiler",raw:t[0],text:t[1]}},renderer(e){return`<details class="${Eo.spoiler}"><summary><span class="${Eo.text}">${Te.parseInline(e.text)}</span></summary></details>`}};Te.use({extensions:[Wv]});function vl(e){if(!e.children)return null;const t=Te(e.children),n=gu.sanitize(t),r=(()=>{var s=fu();return s.innerHTML=n,s})();return i(H,{get each(){return r.childNodes},children:s=>s})}const Kv=/([^\n])\n([^\n])/g,Jv=(e,t,n)=>t+"<br>"+n;function si(e){const t=N(()=>{if(!e.text)return[];const n=e.singleLineBreaks?e.text.replace(Kv,Jv):e.text,r=Te(n),s=gu.sanitize(r);return[...(()=>{var l=fu();return l.innerHTML=s,l})().childNodes]});return i(H,{get each(){return t()},children:n=>n})}var Xv=p("<time class=cp-created-at>");function qn(e){const[t,n]=O(Math.max(1,Math.abs(new Date/1e3-e.createdAt)));let r=null;return t()<60?r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3):t()<3600&&(r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3*60)),ze(()=>clearInterval(r)),(()=>{var s=Xv();return d(s,i(z,{get children(){return[i(M,{get when(){return Math.floor(t()/3600/24/365.25)},children:a=>[a," years",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24/30)},children:a=>[a," month",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24/7)},children:a=>[a," week",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600/24)},children:a=>[a," day",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()/3600%24)},children:a=>[a," hour",N(()=>Ne(a()))," ago"]}),i(M,{get when(){return Math.floor(t()%3600/60)},children:a=>[a," minute",N(()=>Ne(a()))," ago "]}),i(M,{get when(){return Math.floor(t()%3600%60)},children:a=>[a," second",N(()=>Ne(a()))," ago "]})]}})),P(a=>{var l=new Date(e.createdAt*1e3).toISOString(),o=new Date(e.createdAt*1e3).toLocaleString();return l!==a.e&&G(s,"datetime",a.e=l),o!==a.t&&G(s,"title",a.t=o),a},{e:void 0,t:void 0}),s})()}var Zv=p("<div>"),Lo=p("<img class=profile alt=Profile>"),Qv=p("<div class=header>"),e$=p("<div class=content>"),t$=p("<div class=footer>"),n$=p("<img class=cover alt=Cover>"),Po=p("<p> "),r$=p("<div class=main>"),a$=p("<div class=right>"),i$=p("<ol>"),s$=p("<button class=cp-activity-like>Like "),l$=p('<li><img alt="Profile picture">');function $l(e){const t=Fe({hideProfile:!1,small:!1,wrapper:n=>(()=>{var r=Zv();return Lt(r,n,!1,!1),r})()},e);return F(typeof t.hideProfile=="boolean","hideProfile needs to be boolean"),F(typeof t.small=="boolean","small needs to be boolean"),i(z,{get children(){return[i(M,{get when(){return t.activity.type==="TEXT"},get children(){return i(Oi,{get component(){return t.wrapper},class:"activity-card-text",get children(){return[(()=>{var n=Qv();return d(n,i(U,{get href(){return"/user/"+t.activity.user.name},class:"activity-profile-header",get children(){return[(()=>{var r=Lo();return P(()=>G(r,"src",t.activity.user.avatar.large)),r})(),N(()=>t.activity.user.name)]}}),null),d(n,i(qn,{get createdAt(){return t.activity.createdAt}}),null),n})(),(()=>{var n=e$();return d(n,i(vl,{get children(){return t.activity.text}})),n})(),(()=>{var n=t$();return d(n,i(Mo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}})),n})()]}})}}),i(M,{get when(){return t.activity.type==="ANIME_LIST"||t.activity.type==="MANGA_LIST"},get children(){return i(Oi,{get component(){return t.wrapper},class:"activity-card-media",get classList(){return{small:t.small}},get children(){return[i(U,{get href(){return Ge(t.activity.media)},get children(){var n=n$();return P(()=>G(n,"src",t.activity.media.coverImage.large)),n}}),(()=>{var n=r$();return d(n,i(z,{get children(){return[i(M,{get when(){return t.hideProfile===!0},get children(){var r=Po(),s=r.firstChild;return d(r,()=>Je(t.activity.status),s),d(r,i(x,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,i(U,{get href(){return Ge(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),r}}),i(M,{get when(){return t.hideProfile===!1},get children(){return[i(U,{get href(){return"/user/"+t.activity.user.name},get children(){return t.activity.user.name}}),(()=>{var r=Po(),s=r.firstChild;return d(r,()=>Je(t.activity.status),s),d(r,i(x,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,i(U,{get href(){return Ge(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),d(r,i(U,{get href(){return"/user/"+t.activity.user.name},get children(){var a=Lo();return P(()=>G(a,"src",t.activity.user.avatar.large)),a}}),null),r})()]}})]}})),n})(),(()=>{var n=a$();return d(n,i(qn,{get createdAt(){return t.activity.createdAt}}),null),d(n,i(Mo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}}),null),n})()]}})}}),i(M,{get when(){return t.activity.type==="MESSAGE"},get children(){return i(Oi,{get component(){return t.wrapper},children:"message"})}})]}})}function Mo(e){const[t,n]=O(e.activity.isLiked),[r,s]=O(e.activity.likeCount),{accessToken:a}=ce(),[l,o]=O(void 0),[c]=ue.anilist.listOfActivityLikes(e.activity.id,a,l);let u=e.activity.isLiked;const h=ya(async(f,g,m)=>{if(m!==u){const y=await ue.anilist.toggleActivityLike(f,{id:g});F(!y.fromCache,"Mutation should never be cached"),y.status===200&&(e.activity.likeCount=y.data.data.ToggleLike.likeCount,e.activity.isLiked=y.data.data.ToggleLike.isLiked,e.mutateCache(v=>v),u===y.data.data.ToggleLike.isLiked&&(s(y.data.data.ToggleLike.likeCount),n(y.data.data.ToggleLike.isLiked)),u=m)}},500);return(()=>{var f=s$();return f.firstChild,f.$$click=()=>{n(g=>{F(typeof g=="boolean");const m=+!g*2-1;return s(y=>y+m),h(a(),e.activity.id,!g),!g})},f.$$mousemove=()=>r()&&o(!0),d(f,r,null),d(f,i(x,{get when(){var g;return N(()=>!!l())()&&((g=c())==null?void 0:g.data.likes.length)},get children(){return i(xt,{tipPosition:"left",get children(){var g=i$();return d(g,i(H,{get each(){return c().data.likes},children:m=>(()=>{var y=l$(),v=y.firstChild;return d(y,()=>m.name,null),P(()=>G(v,"src",m.avatar.large)),y})()})),g}})}}),null),P(()=>f.classList.toggle("active",!!t())),f})()}$e(["mousemove","click"]);var o$=p('<ol data-k-82ba8cab class="flex-space-between activity">'),c$=p("<button data-k-82ba8cab>Refresh"),d$=p("<li data-k-82ba8cab>");function u$(e){const{accessToken:t}=ce(),[n,r]=O(e.cache.length?void 0:1),s=Me(cd,t,e.variables,n),[a]=rl(e.isDebug,s);let l=0;const[o,c]=O(!1),[u,h]=O(!0),f=id(h),g=new Set,m=tr(mn,b=>!a.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var S,_;const b=Ae(o),A=Ae(u);if(k.has((S=e.cache.at(-1))==null?void 0:S.id)&&b)return Math.max(Math.floor(e.cache.length/25)+1,l+1);if(k.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const T=[...k.difference(g)].sort((L,R)=>R-L);if(!T.length)return;const I=ga(T,.5),E=nd(e.cache,L=>L.id-I);return E==-1?void 0:Math.ceil((E+1)/25)}}let $=0;W(le(a,b=>{var T,I,E,L,R;if(!((T=b==null?void 0:b.data)!=null&&T.activities.length))return;b.data.activities.forEach(B=>{g.add(B.id)});const A=((I=b.data.activities[0])==null?void 0:I.createdAt)||0,S=((E=ga(b.data.activities,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-S)*1e3,15e3));l=Math.max(l,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f(_,!0),l=1):b.data.pageInfo.currentPage>e.cache.length/25&&(((L=b.data.activities.at(-1))==null?void 0:L.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(h(!0),c(!1),l=0,$=0)),e.updateCache(b),y()}));const k=new Set,C=b=>{for(const A of b){const S=parseInt(A.target.dataset.id);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[i(x,{get when(){return N(()=>!!a.loading)()&&n()===1},get children(){return i(Xn,{class:"refresh",get children(){return i(xt,{tipPosition:"bottom",get children(){return i(x,{get when(){return e.cache.length===0},fallback:"Fetching fresh activities",children:"Loading activities"})}})}})}}),(()=>{var b=o$();return d(b,i(H,{get each(){return e.cache},children:A=>{let S;return Pn(()=>w.observe(S)),i($l,{activity:A,get mutateCache(){return e.mutateCache},wrapper:_=>(()=>{var T=d$(),I=S;return typeof I=="function"?ge(I,T):S=T,Lt(T,_,!1,!1),P(()=>G(T,"data-id",A.id)),T})()})}})),P(()=>b.classList.toggle("loading",!!(a.loading&&n()===1))),b})(),i(z,{get children(){return[i(M,{get when(){return a.loading&&n()>l&&e.cache.length},get children(){return i(Xn,{class:"new",get children(){return i(xt,{tipPosition:"bottom",children:"Loading activities"})}})}}),i(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh activity feed to load more",(()=>{var b=c$();return b.$$click=()=>r(1),b})()]}})]}})]}$e(["click"]);var h$=p("<button>debug: ");function g$(e){const{accessToken:t}=ce(),n=Me(kf,t,e.variables),[r,{mutateCache:s,mutateBoth:a}]=nt(n),l=u=>{var h,f;(f=(h=u==null?void 0:u.data)==null?void 0:h.activities)!=null&&f.length&&a(g=>{var S,_,T;if(!((S=g==null?void 0:g.data)!=null&&S.length))return g.data=[u.data.activities],g;const m=u.data.activities.at(-1).id,y=yr(g.data[0],I=>I.id-m),v=((_=g.data[0][y])==null?void 0:_.id)===m;if(u.data.pageInfo.currentPage===1)return v?(g.data[0].splice(0,y+1,...u.data.activities),g):(g.data.unshift(u.data.activities),g.data.length=Math.min(g.data.length,5),g);const $=u.data.activities[0].id,k=yr(g.data[0],I=>I.id-$);if(k===0&&g.data[0][k].id!==$||(g.data[0].splice(k,y-k+v,...u.data.activities),v||g.data.length===1))return g;const w=yr(g.data[1],I=>I.id-m);if(((T=g.data[1][w])==null?void 0:T.id)!==m)return g;const[A]=g.data.splice(1,1);return A.splice(0,w+1),g.data[0].push(...A),g})},[o,c]=il();return i(x,{get when(){return!r.loading},get children(){return[i(x,{get when(){return Tn},get children(){var u=h$();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),i(u$,Fe({get cache(){var u,h;return((h=(u=r())==null?void 0:u.data)==null?void 0:h[0])||[]},isDebug:o,updateCache:l,mutateCache:s},e))]}})}$e(["click"]);var f$=p("<div><h2>Activity</h2><div><button>All</button><button>Text Status</button><button>List Progress</button></div><button>Following</button><button>Global");function m$(){const[e,t]=Rd("LOB_ACTIVITY_TYPE",void 0),[n,r]=so("LOB_ACTIVITY_IS_FOLLOWING",!0),[s,a]=so("LOB_ACTIVITY_HAS_REPLIES",void 0),[l,o]=xm("LOB_ACTIVITY_QUERY",{isFollowing:!0});return W(()=>{o(c=>{const u={...c,activityType:e(),isFollowing:n(),hasReplies:s()};for(const h of Object.keys(u))if(u[h]!==c[h])return u;return c})}),(()=>{var c=f$(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.nextSibling,y=h.nextSibling,v=y.nextSibling;return f.$$click=()=>t(void 0),g.$$click=()=>t("TEXT"),m.$$click=()=>t("MEDIA_LIST"),y.$$click=()=>{Oe(()=>{r(!0),a(void 0)})},v.$$click=()=>{Oe(()=>{r(!1),a(!0)})},d(c,i(x,{get when(){return l()},keyed:!0,get children(){return i(g$,{get variables(){return l()}})}}),null),c})()}$e(["click"]);var p$=p("<div data-k-9b8ac37b class=pg-home>");function v$(){const{accessToken:e,authUserData:t}=ce();return document.title="Home - LOB",i(x,{get when(){return t()},get children(){var n=p$();return d(n,i(Op,{get token(){return e()},get userId(){return t().data.id}}),null),d(n,i(m$,{get token(){return e()}}),null),n}})}function $$(){const t=Qt().hash.substring(1),r=new URLSearchParams(t).get("access_token");if(document.title="Authentication - LOB",(r==null?void 0:r.length)>50){const{setAccessToken:s}=ce();s(r)}return i(hn,{href:"/"})}function _$(e){const[t,{mutate:n}]=vh(async()=>new Promise(o=>{const c=()=>o(null),u=qe.user(c);u.onsuccess=h=>{const f=h.target.result,m=qe.store(f,"data","readonly",c).get("access_token");m.onsuccess=y=>o(y.target.result||null),m.onerror=c}})),r=o=>{Oe(()=>{Cs(o),n(o)})};W(()=>{const o=t();o!==void 0&&Cs(o)}),window.addEventListener("beforeunload",()=>{const o=Cn();o&&(sessionStorage["LOB-token"]=o)});const s=qe.user();s.onsuccess=o=>{const c=o.target.result,h=qe.store(c,"data","readonly").get("auth_profile_info");h.onsuccess=f=>{f.target.result!=null&&ni(f.target.result)}};const a=o=>{const c=qe.user();c.onsuccess=u=>{const h=u.target.result,g=qe.store(h,"data","readwrite").put(o,"access_token");g.onsuccess=()=>r(o)}},l=()=>{const o=qe.user();o.onsuccess=c=>{const u=c.target.result,h=qe.store(u,"data","readwrite");h.delete("access_token"),h.delete("auth_profile_info"),r(null),ni(null)}};return i(Nc.Provider,{value:{accessToken:Cn,setAccessToken:a,authUserData:Yn,logoutUser:l},get children(){return i(x,{get when(){return Cn()!==void 0},get children(){return e.children}})}})}function _n(e){const[t,n]=O(window.matchMedia(e).matches),r=window.matchMedia(e),s=a=>n(a.matches);return r.addEventListener("change",s),ze(()=>r.removeEventListener("change",s)),t}function b$(e){const t=_n("(max-width: 30em)"),n=_n("(max-width: 48em)"),r=_n("(max-width: 64em)"),s=_n("(max-width: 80em)"),a=_n("(max-width: 90em)"),l=_n("(max-width: 160em)"),o=_n("(hover: none) and (pointer: coarse)"),c=_n("(display-mode: standalone)");return i(Oc.Provider,{value:{isMobilSmall:t,isMobilLarge:n,isTablet:r,isLaptop:s,isDesktop:a,isDesktopLarge:l,isTouch:o,isPWA:c},get children(){return e.children}})}var y$=p("<div>Intersection");function $n(e){let t=y$();Pn(()=>{s.observe(t)}),ze(()=>{s.disconnect()});const n={rootMargin:e.rootMargin||"800px"},r=a=>{a[0].isIntersecting!==!1&&(s.unobserve(a[0].target),e.onIntersection())},s=new IntersectionObserver(r,n);return i(z,{fallback:t,get children(){return[i(M,{get when(){return e.fetchResponse()},get children(){return e.children(e.fetchResponse.loading&&e.loading)}}),i(M,{get when(){return e.fetchResponse.loading},get children(){return e.loadingElement||"loading..."}})]}})}var w$=p("<div data-k-d1a22b47 class=multi-input-footer><button data-k-d1a22b47>Cancel</button><button data-k-d1a22b47>Ok"),k$=p("<form data-k-d1a22b47 class=multi-input><button data-k-d1a22b47 class=open-multi-input>Rating</button><dialog data-k-d1a22b47><div data-k-d1a22b47 class=wrapper><div data-k-d1a22b47 class=scroll-wrapper>"),S$=p("<li data-k-d1a22b47><label data-k-d1a22b47>G - All ages <input data-k-d1a22b47 type=checkbox name=rating value=g>"),C$=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG - Children <input data-k-d1a22b47 type=checkbox name=rating value=pg>"),A$=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG-13 - Teen 13 or older <input data-k-d1a22b47 type=checkbox name=rating value=pg13>"),T$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R - 17+ (violence & profanity) <input data-k-d1a22b47 type=checkbox name=rating value=r17>"),x$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - Mild nudity <input data-k-d1a22b47 type=checkbox name=rating value=r>"),I$=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - (violence, profanity & mild nudity)<input data-k-d1a22b47 type=checkbox name=rating value=r>"),E$=p("<ol data-k-d1a22b47><li data-k-d1a22b47><label data-k-d1a22b47>Any rating <input data-k-d1a22b47 type=checkbox name=rating value=any></label></li><li data-k-d1a22b47><label data-k-d1a22b47>Rx - Hentai <input data-k-d1a22b47 type=checkbox name=rating value=rx>");function L$(){const[e,t]=xe(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=k$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const _=S.currentTarget.querySelectorAll("input").length,I=new FormData(S.currentTarget).getAll("rating");S.target.value==="any"?S.target.checked?t({rating:"any"}):t({rating:void 0}):S.target.checked&&_-1===I.length?t({rating:"any"}):t({rating:I.filter(E=>E!=="any")})},m.addEventListener("submit",S=>{S.preventDefault()});var C=u;typeof C=="function"?ge(C,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const S=o.signal;s=e.rating,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",_=>{_.target===a&&a.addEventListener("touchend",T=>{T.target===a&&(T.preventDefault(),h())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==a&&h(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",h);var b=a;typeof b=="function"?ge(b,v):a=v;var A=l;return typeof A=="function"?ge(A,k):l=k,d(k,i(g,{})),d($,i(x,{get when(){return n()},get children(){var S=w$(),_=S.firstChild,T=_.nextSibling;return _.$$click=()=>{h(),t({rating:s})},T.$$click=h,S}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=We({});return W(()=>{Array.isArray(m.rating)?v(Jt(m.rating.reduce(($,k)=>({...$,[k]:!0}),{}))):v(Jt({[m.rating]:!0}))}),(()=>{var $=E$(),k=$.firstChild,C=k.firstChild,w=C.firstChild,b=w.nextSibling,A=k.nextSibling,S=A.firstChild,_=S.firstChild,T=_.nextSibling;return d($,i(x,{get when(){return m.malSearch==="true"},get children(){return[(()=>{var I=S$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.g),I})(),(()=>{var I=C$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.pg),I})(),(()=>{var I=A$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.pg13),I})(),(()=>{var I=T$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.r17),I})(),(()=>{var I=x$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.r),I})()]}}),A),d($,i(x,{get when(){return m.malSearch!=="true"},get children(){var I=I$(),E=I.firstChild,L=E.firstChild,R=L.nextSibling;return P(()=>R.checked=y.any||y.r),I}}),A),P(()=>b.checked=y.any),P(()=>T.checked=y.any||y.rx),$})()}}$e(["input","click"]);var P$=p('<label data-k-48bbc0c0 class=switch><input data-k-48bbc0c0 type=checkbox><span data-k-48bbc0c0 class="slider round">');function M$(e){return(()=>{var t=P$(),n=t.firstChild;return Lt(n,e,!1,!1),t})()}var D$=p("<div data-k-93c05ee9 class=multi-input-footer><button data-k-93c05ee9>Cancel</button><button data-k-93c05ee9>Ok"),R$=p('<form data-k-93c05ee9 class=multi-input><button data-k-93c05ee9 class=open-multi-input>Genres</button><dialog data-k-93c05ee9><div data-k-93c05ee9 class=wrapper><div data-k-93c05ee9 class=multi-input-header><input data-k-93c05ee9 type=search placeholder="Filter genres"></div><div data-k-93c05ee9 class=scroll-wrapper>'),Do=p("<h3 data-k-93c05ee9>Genres"),Ra=p("<ol data-k-93c05ee9>"),N$=p("<h3 data-k-93c05ee9>Tags"),O$=p("<h3 data-k-93c05ee9>Themes"),Na=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=excludeGenre>"),Oa=p("<li data-k-93c05ee9><label data-k-93c05ee9>"),Fa=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=genre>");function F$(e){const[t,n]=xe(),{isTouch:r}=en(),[s,a]=O("");let l=!1,o,c,u,h,f,g;function m(){c.close(),l=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(le(r,m)),(()=>{var $=R$(),k=$.firstChild,C=k.nextSibling,w=C.firstChild,b=w.firstChild,A=b.firstChild,S=b.nextSibling;$.$$input=L=>{const R=L.target.closest("li"),B=L.target.name;!L.target.checked&&!R.classList.contains("exclude")?(R.classList.add("exclude"),L.target.checked=!0,L.target.name="excludeGenre"):R.classList.contains("exclude")&&R.classList.remove("exclude");const V=new FormData(L.currentTarget);R.classList.contains("exclude")?n({[B]:V.getAll(B),[L.target.name]:V.getAll(L.target.name)}):n({[L.target.name]:V.getAll(L.target.name)})},$.addEventListener("submit",L=>{L.preventDefault()});var _=g;typeof _=="function"?ge(_,$):g=$,k.$$click=()=>{if(l)m();else{h=new AbortController;const L=h.signal;o=t.genre,r()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:L}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",B=>{B.target===c&&(B.preventDefault(),m())},{once:!0,signal:L})},{signal:L})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:L}),c.show()),l=!0}};var T=f;typeof T=="function"?ge(T,k):f=k,C.addEventListener("close",m);var I=c;typeof I=="function"?ge(I,C):c=C,A.$$input=L=>{L.stopPropagation(),a(L.target.value.toLowerCase())};var E=u;return typeof E=="function"?ge(E,S):u=S,d(S,i(v,{})),d(w,i(x,{get when(){return r()},get children(){var L=D$(),R=L.firstChild,B=R.nextSibling;return R.$$click=()=>{m(),n({genre:o})},B.$$click=m,L}}),null),P(()=>$.classList.toggle("mobile",!!r())),$})();function v(){const[$]=xe(),[k,C]=We({include:{},exclude:{}});return W(()=>{C(Jt({include:Xt($.genre,{}),exclude:Xt($.excludeGenre,{})}))}),i(z,{get children(){return[i(M,{get when(){return e.engine==="ani"},get children(){return i(x,{get when(){return e.aniGenres()},fallback:"Loading...",get children(){return[Do(),(()=>{var w=Ra();return d(w,i(H,{get each(){return e.aniGenres().data.genres},children:b=>(()=>{var A=Oa(),S=A.firstChild;return d(S,b,null),d(S,i(x,{get when(){return k.exclude[b]},get fallback(){return(()=>{var _=Fa();return _.value=b,P(()=>_.checked=k.include[b]),_})()},get children(){var _=Na();return _.value=b,P(()=>_.checked=k.exclude[b]),_}}),null),P(_=>{var T=!!k.exclude[b],I=!b.toLowerCase().includes(s());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})(),N$(),(()=>{var w=Ra();return d(w,i(H,{get each(){return e.aniGenres().data.tags},children:b=>(()=>{var A=Oa(),S=A.firstChild;return d(S,()=>b.name,null),d(S,i(x,{get when(){return k.exclude[b.name]},get fallback(){return(()=>{var _=Fa();return P(()=>_.value=b.name),P(()=>_.checked=k.include[b.name]),_})()},get children(){var _=Na();return P(()=>_.value=b.name),P(()=>_.checked=k.exclude[b.name]),_}}),null),P(_=>{var T=!!k.exclude[b.name],I=!b.name.toLowerCase().includes(s());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})()]}})}}),i(M,{get when(){return e.engine==="mal"},get children(){return i(x,{get when(){return e.malGenres()},fallback:"Loading...",get children(){return[Do(),(()=>{var w=Ra();return d(w,i(H,{get each(){return e.malGenres().data.genres},children:b=>(()=>{var A=Oa(),S=A.firstChild;return d(S,()=>b.name,null),d(S,i(x,{get when(){return k.exclude[b.name]},get fallback(){return(()=>{var _=Fa();return P(()=>_.value=b.name),P(()=>_.checked=k.include[b.name]),_})()},get children(){var _=Na();return P(()=>_.value=b.name),P(()=>_.checked=k.exclude[b.name]),_}}),null),P(_=>{var T=!!k.exclude[b.name],I=!b.name.toLowerCase().includes(s());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})(),O$(),(()=>{var w=Ra();return d(w,i(H,{get each(){return e.malGenres().data.themes},children:b=>(()=>{var A=Oa(),S=A.firstChild;return d(S,()=>b.name,null),d(S,i(x,{get when(){return k.exclude[b.name]},get fallback(){return(()=>{var _=Fa();return P(()=>_.value=b.name),P(()=>_.checked=k.include[b.name]),_})()},get children(){var _=Na();return P(()=>_.value=b.name),P(()=>_.checked=k.exclude[b.name]),_}}),null),P(_=>{var T=!!k.exclude[b.name],I=!b.name.toLowerCase().includes(s());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})()]}})}})]}})}}$e(["input","click"]);var B$=p('<div data-k-4bf0065c class=cp-two-headed-range><div data-k-4bf0065c class="point start"></div><div data-k-4bf0065c class="point end"></div><div data-k-4bf0065c class=progress-bar>');function mu(e){F(e.onChange,"onChange is missing");const t=Fe({min:0,max:100,separation:1},e),n=Fe({value:[t.min,t.max]},t);let r,s;W(le(()=>n.minValue,h=>{c(r,h||n.min)})),W(le(()=>n.maxValue,h=>{c(s,h||n.max)}));let a;Pn(()=>{o.observe(a)}),ze(()=>{o.disconnect()});const l=h=>{h[0].isIntersecting===!0&&(c(s,n.maxValue),c(r,n.minValue))},o=new IntersectionObserver(l);return(()=>{var h=B$(),f=h.firstChild,g=f.nextSibling;h.$$mousedown=u,h.$$touchstart=u;var m=a;typeof m=="function"?ge(m,h):a=h;var y=r;typeof y=="function"?ge(y,f):r=f,f.style.setProperty("--percentage","0%");var v=s;return typeof v=="function"?ge(v,g):s=g,g.style.setProperty("--percentage","100%"),P($=>{var k=n.min,C=n.max;return k!==$.e&&(($.e=k)!=null?f.style.setProperty("--value",k):f.style.removeProperty("--value")),C!==$.t&&(($.t=C)!=null?g.style.setProperty("--value",C):g.style.removeProperty("--value")),$},{e:void 0,t:void 0}),h})();function c(h,f){const g=h.closest(".cp-two-headed-range"),m=g.querySelector(".point.start"),y=g.querySelector(".point.end"),v=m.getBoundingClientRect(),$=y.getBoundingClientRect(),k=g.getBoundingClientRect();if(h===m){const C=$.left-k.left-v.width/2,b=Math.min(1,Math.max(0,(f-n.min)/(parseInt(y.style.getPropertyValue("--value"))-n.min)))*C/k.width;g.querySelector(".progress-bar").style.left=`${(b*100).toFixed(1)}%`,g.querySelector(".progress-bar").style.width=`${(parseInt(y.style.getPropertyValue("--percentage"))-b*100).toFixed(1)}%`,h.style.setProperty("--percentage",(b*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}else if(h===y){const C=k.width-(v.right-k.left)-$.width/2,w=parseInt(m.style.getPropertyValue("--value")),b=Math.min(1,Math.max(0,(f-w)/(n.max-w)))*C,A=(v.right-k.left+$.width/2+b)/k.width;g.querySelector(".progress-bar").style.width=`${(A*100-parseInt(m.style.getPropertyValue("--percentage"))).toFixed(1)}%`,h.style.setProperty("--percentage",(A*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}}function u(h){h.preventDefault();const f=new AbortController,g=f.signal,m=h.target.closest(".cp-two-headed-range"),y=h.clientX||h.touches[0].clientX,v=m.querySelector(".point.start").getBoundingClientRect(),$=m.querySelector(".point.end").getBoundingClientRect(),k=Math.min(Math.abs(y-v.left),Math.abs(y-v.right)),C=Math.min(Math.abs(y-$.left),Math.abs(y-$.right));let w,b,A=0;h.target.classList.contains("start")?(w=h.target,b=m.querySelector(".point.end")):h.target.classList.contains("end")?(w=h.target,b=m.querySelector(".point.start")):k<C?(w=m.querySelector(".point.start"),b=m.querySelector(".point.end")):(w=m.querySelector(".point.end"),b=m.querySelector(".point.start"));const S=w.classList.contains("end"),_=m.getBoundingClientRect(),T=w.getBoundingClientRect(),I=b.getBoundingClientRect();let E,L=_.left;S?(E=_.width-(I.right-_.left)-I.width/2,L=I.right+I.width/2):E=I.left-_.left-T.width/2,h.target===w&&(A=y-(T.left+T.width/2)),R(y);function R(B){const V=Math.max(Math.min(1,(B-A-L)/E),0),X=S?parseInt(b.style.getPropertyValue("--value"))+n.separation:n.min,j=S?n.max:parseInt(b.style.getPropertyValue("--value"))-n.separation,K=S?(_.width-E)/_.width:0,ae=S?1:E/_.width,re=Math.max(Math.min(ae,(B-A-_.left)/_.width),K);S?m.querySelector(".progress-bar").style.width=`${(re*100-parseInt(b.style.getPropertyValue("--percentage"))).toFixed(1)}%`:(m.querySelector(".progress-bar").style.left=`${(re*100).toFixed(1)}%`,m.querySelector(".progress-bar").style.width=`${(parseInt(b.style.getPropertyValue("--percentage"))-re*100).toFixed(1)}%`),w.style.setProperty("--percentage",(re*100).toFixed(1)+"%"),w.style.setProperty("--value",X+Math.round((j-X)*V))}w.classList.add("active"),g.addEventListener("abort",()=>{w.classList.remove("active"),S?n.onChange([parseInt(b.style.getPropertyValue("--value")),parseInt(w.style.getPropertyValue("--value"))]):n.onChange([parseInt(w.style.getPropertyValue("--value")),parseInt(b.style.getPropertyValue("--value"))])}),window.addEventListener("mousemove",B=>{B.preventDefault(),B.buttons===1?R(B.clientX):f.abort()},{signal:g}),window.addEventListener("touchmove",B=>{B.preventDefault();const[{clientX:V}]=B.touches;R(V)},{signal:g}),window.addEventListener("touchend",()=>{f.abort()},{signal:g,once:!0})}}$e(["touchstart","mousedown"]);const bn=ja(),Qi={trending:{order:"trending"},popular:{order:"popularity"},novel:{format:"lightnovel"},finished:{order:"end_date_filtered",status:"complete"},new:{order:"id"},"top-100":{order:"score"},"finished-manga":{order:"end_date_filtered",status:"complete",format:"manga"},"finished-novel":{order:"end_date_filtered",status:"complete",format:"lightnovel"},ani:{tba:{season:"tba",status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{country:"KR"}},mal:{tba:{status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{format:"manhwa"}}};function U$(e,...t){return t.some(n=>n in e&&(e[n]==null||e[n].length===0))}function ki(){const e=ne(),t=Qt(),n=pn(),[r,s]=xe();return[a=>H$(r,e,a),(a,l)=>j$(r,s,e,n,t,a,l)]}function V$(){const e=ne(),t=Qt(),n=pn(),[r]=xe();return s=>Y$(r,e,n,t,s)}function G$(){const e=ne(),t=Qt(),n=pn(),[r]=xe();return()=>n(`/search/${e.type}${bl(r,e,t,{})}`,{scroll:!1})}function H$(e,t,n){return e[n]||_l(e,t)[n]}function _l(e,t,n){return Is(e.malSearch==="true",t.header,t.type,n)||{}}function Is(e,t,n,r){var l,o,c;const s=r||t;if(s!=null&&s.match(/^(summer|fall|spring|winter)-\d+$/)){const[u,h]=s.split("-");return{year:h,season:u,order:"title_romaji",sort:"ASC"}}const a=e?"mal":"ani";return Qi[s]||((l=Qi[a])==null?void 0:l[s])||((c=(o=Qi[a])==null?void 0:o[n])==null?void 0:c[s])}function j$(e,t,n,r,s,a,l){var u;const o=_l(e,n),c=(...h)=>bl(e,n,s,...h);if(U$(a,...Object.keys(o)))return r(`/search/${n.type}${c(a)}`,{scroll:!1,...l});if((u=n.header)!=null&&u.match(/^(summer|fall|spring|winter)-\d+$/)){const{season:h=o.season,year:f=o.year,...g}=a,m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...l})}if(n.header==="this-season"||n.header==="next-season"){const{season:h=e.season,year:f=e.year,...g}=a;if(h!=null&&f!=null){const m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...l})}}t(a,l)}function Y$(e,t,n,r,s){const a=Is(e.malSearch==="true",t.header,t.type),l=Is(e.malSearch==="true",t.header,s);return!a||l?n("/"+t.mode+"/"+s+(t.header?"/"+t.header:"")+r.search):n(`/search/${s}${bl(e,t,r,{},!0)}`,{scroll:!1})}function bl(e,t,n,r,s=!0,a){const l=_l(e,t,a),o=Object.fromEntries(new URLSearchParams(n.search)),c=[...new URLSearchParams(n.search)].filter(([g,m])=>!(g in r||!s&&g in l&&l[g]==m)).map(([g,m])=>`${g}=${m}`),u=s===!1?[]:Object.entries(l).filter(([g])=>!(g in r||g in o)).map(([g,m])=>`${g}=${m}`),h=Object.entries(r).filter(([,g])=>q$(g)).map(([g,m])=>Array.isArray(m)?m.map(y=>`${g}=${y}`).join("&"):`${g}=${m}`),f=u.concat(c).concat(h).join("&");return f.length?"?"+f:""}function q$(e){return e!=null&&e.length!=0}var z$=p("<button data-k-53d51b9e>Cancel"),W$=p("<button data-k-53d51b9e>Ok"),K$=p('<form data-k-53d51b9e class=multi-input><button data-k-53d51b9e class=open-multi-input>Year</button><dialog data-k-53d51b9e closedby=any><div data-k-53d51b9e class=wrapper><div data-k-53d51b9e class=multi-input-header><input data-k-53d51b9e type=search placeholder="Search year"></div><div data-k-53d51b9e class=scroll-wrapper></div><div data-k-53d51b9e class=multi-input-footer><div data-k-53d51b9e class=flex-space-between><input data-k-53d51b9e type=number inputmode=numeric name=startYear><input data-k-53d51b9e type=number inputmode=numeric name=endYear>'),J$=p("<ol data-k-53d51b9e>"),X$=p("<li data-k-53d51b9e><label data-k-53d51b9e> <input data-k-53d51b9e type=radio name=year>");function Z$(){const[e,t]=ki(),{isTouch:n}=en(),[r,s]=O(""),a=new Date().getFullYear()+2;let l=!1,o={},c,u,h,f,g;const m=tr(mn,(k,C)=>t(k,C),100);function y(){c.close(),l=!1,h==null||h.abort(),t({preventFetch:void 0})}function v(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(le(n,y)),(()=>{var k=K$(),C=k.firstChild,w=C.nextSibling,b=w.firstChild,A=b.firstChild,S=A.firstChild,_=A.nextSibling,T=_.nextSibling,I=T.firstChild,E=I.firstChild,L=E.nextSibling;k.$$input=j=>{j.target.name==="year"&&m({[j.target.name]:j.target.checked?j.target.value:void 0,season:e("season"),startYear:void 0,endYear:void 0})},k.addEventListener("submit",j=>{j.preventDefault()});var R=g;typeof R=="function"?ge(R,k):g=k,C.$$click=()=>{if(l)y();else{h=new AbortController;const j=h.signal;o={year:e("year"),startYear:e("startYear"),endYear:e("endYear")},n()?(c.showModal(),m({preventFetch:!0}),v(),window.addEventListener("resize",v,{signal:j}),c.addEventListener("touchstart",K=>{K.target===c&&c.addEventListener("touchend",ae=>{ae.target===c&&(ae.preventDefault(),y())},{once:!0,signal:j})},{signal:j})):(window.addEventListener("mousedown",K=>K.target!==f&&K.target.closest("dialog")!==c&&y(),{signal:j}),c.show()),l=!0}};var B=f;typeof B=="function"?ge(B,C):f=C,w.addEventListener("close",y);var V=c;typeof V=="function"?ge(V,w):c=w,S.$$input=j=>{j.stopPropagation(),s(j.target.value.toLowerCase())};var X=u;return typeof X=="function"?ge(X,_):u=_,d(_,i($,{})),d(T,i(mu,{min:1970,max:a,separation:1,get minValue(){return+e("startYear")||1970},get maxValue(){return+e("endYear")||a},onChange:([j,K])=>m({startYear:j,endYear:K,year:void 0})}),I),E.$$beforeinput=j=>{var K;(K=j.data)!=null&&K.toLowerCase().includes("e")&&j.preventDefault()},E.addEventListener("blur",j=>j.target.value=e("startYear")||1970),E.addEventListener("change",j=>{m({startYear:Math.min(+j.target.value,+e("endYear")||a),endYear:Math.max(+j.target.value,+e("endYear")||a),year:void 0})}),L.$$beforeinput=j=>{var K;(K=j.data)!=null&&K.toLowerCase().includes("e")&&j.preventDefault()},L.addEventListener("blur",j=>j.target.value=e("endYear")||a),L.addEventListener("change",j=>{m({startYear:Math.min(+j.target.value,+e("startYear")||1970),endYear:Math.max(+j.target.value,+e("startYear")||1970),year:void 0})}),d(T,i(x,{get when(){return n()},get children(){return[(()=>{var j=z$();return j.$$click=()=>{y(),t(o)},j})(),(()=>{var j=W$();return j.$$click=y,j})()]}}),null),P(()=>k.classList.toggle("mobile",!!n())),P(()=>E.value=+e("startYear")||1970),P(()=>L.value=+e("endYear")||a),k})();function $(){return(()=>{var k=J$();return d(k,i(H,{get each(){return Array.from({length:Math.abs(a-1969)},(C,w)=>a-w)},children:C=>(()=>{var w=X$(),b=w.firstChild,A=b.firstChild,S=A.nextSibling;return d(b,C,A),S.value=C,P(()=>w.classList.toggle("hidden",!C.toString().startsWith(r()))),P(()=>S.checked=e("year")==C),w})()})),k})()}}$e(["input","click","beforeinput"]);var Q$=p("<div data-k-ddc3fe99 class=multi-input-footer><button data-k-ddc3fe99>Cancel</button><button data-k-ddc3fe99>Ok"),e1=p("<form data-k-ddc3fe99 class=multi-input><button data-k-ddc3fe99 class=open-multi-input>Formats</button><dialog data-k-ddc3fe99><div data-k-ddc3fe99 class=wrapper><div data-k-ddc3fe99 class=scroll-wrapper>"),t1=p("<ol data-k-ddc3fe99>"),n1=p("<li data-k-ddc3fe99><label data-k-ddc3fe99><input data-k-ddc3fe99 type=checkbox name=format>");function r1(){const[e,t]=xe(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=e1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const T=new FormData(S.currentTarget).getAll("format");t({format:T})},m.addEventListener("submit",S=>{S.preventDefault()});var C=u;typeof C=="function"?ge(C,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const S=o.signal;s=e.format,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",_=>{_.target===a&&a.addEventListener("touchend",T=>{T.target===a&&(T.preventDefault(),h())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==a&&h(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",h);var b=a;typeof b=="function"?ge(b,v):a=v;var A=l;return typeof A=="function"?ge(A,k):l=k,d(k,i(g,{})),d($,i(x,{get when(){return n()},get children(){var S=Q$(),_=S.firstChild,T=_.nextSibling;return _.$$click=()=>{h(),t({format:s})},T.$$click=h,S}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=We({}),$=ne();W(()=>{v(Jt(Xt(m.format,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani";return(()=>{var C=t1();return d(C,i(H,{get each(){return Object.entries(Kn[k()][$.type]||{})},fallback:"Something went wrong",children:([w,b])=>(()=>{var A=n1(),S=A.firstChild,_=S.firstChild;return d(S,()=>b.flavorText,_),_.value=w,P(()=>_.checked=y[w]),A})()})),C})()}}$e(["input","click"]);var a1=p("<div data-k-3f80fe5b class=multi-input-footer><button data-k-3f80fe5b>Cancel</button><button data-k-3f80fe5b>Ok"),i1=p("<form data-k-3f80fe5b class=multi-input><div data-k-3f80fe5b class=open-button-wrapper><button data-k-3f80fe5b class=open-multi-input>Sort order</button><button data-k-3f80fe5b type=button></button></div><dialog data-k-3f80fe5b><div data-k-3f80fe5b class=wrapper><div data-k-3f80fe5b class=scroll-wrapper>"),s1=p("<ol data-k-3f80fe5b>"),l1=p("<li data-k-3f80fe5b><label data-k-3f80fe5b><input data-k-3f80fe5b type=radio name=order>");function o1(){const[e,t]=xe(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=i1(),y=m.firstChild,v=y.firstChild,$=v.nextSibling,k=y.nextSibling,C=k.firstChild,w=C.firstChild;m.$$input=T=>{t({order:T.target.value})},m.addEventListener("submit",T=>{T.preventDefault()});var b=u;typeof b=="function"?ge(b,m):u=m,v.$$click=()=>{if(r)h();else{o=new AbortController;const T=o.signal;s=e.order,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:T}),a.addEventListener("touchstart",I=>{I.target===a&&a.addEventListener("touchend",E=>{E.target===a&&(E.preventDefault(),h())},{once:!0,signal:T})},{signal:T})):(window.addEventListener("mousedown",I=>I.target!==c&&I.target.closest("dialog")!==a&&h(),{signal:T}),a.show()),r=!0}};var A=c;typeof A=="function"?ge(A,v):c=v,$.$$click=()=>t({sort:e.sort?void 0:"ASC"}),d($,()=>e.sort||"DESC"),k.addEventListener("close",h);var S=a;typeof S=="function"?ge(S,k):a=k;var _=l;return typeof _=="function"?ge(_,w):l=w,d(w,i(g,{})),d(C,i(x,{get when(){return n()},get children(){var T=a1(),I=T.firstChild,E=I.nextSibling;return I.$$click=()=>{h(),t({order:s})},E.$$click=h,T}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=We({}),$=ne();W(()=>{v(Jt(Xt(m.order,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(zt[k()][$.type]||{}).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=s1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var S=l1(),_=S.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),P(()=>T.value=A.alternative_key||b),P(()=>T.checked=y[b]||A.alternative_key&&y[A.alternative_key]),S})()})),w})()}}$e(["input","click"]);var c1=p("<div data-k-d25d331a class=multi-input-footer><button data-k-d25d331a>Cancel</button><button data-k-d25d331a>Ok"),d1=p("<form data-k-d25d331a class=multi-input><button data-k-d25d331a class=open-multi-input>Status</button><dialog data-k-d25d331a><div data-k-d25d331a class=wrapper><div data-k-d25d331a class=scroll-wrapper>"),u1=p("<ol data-k-d25d331a>"),h1=p("<li data-k-d25d331a><label data-k-d25d331a><input data-k-d25d331a type=radio name=status>");function g1(){const[e,t]=xe(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=d1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{t({[S.target.name]:S.target.value})},m.addEventListener("submit",S=>{S.preventDefault()});var C=u;typeof C=="function"?ge(C,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const S=o.signal;s=e.status,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",_=>{_.target===a&&a.addEventListener("touchend",T=>{T.target===a&&(T.preventDefault(),h())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==a&&h(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",h);var b=a;typeof b=="function"?ge(b,v):a=v;var A=l;return typeof A=="function"?ge(A,k):l=k,d(k,i(g,{})),d($,i(x,{get when(){return n()},get children(){var S=c1(),_=S.firstChild,T=_.nextSibling;return _.$$click=()=>{h(),t({status:s})},T.$$click=h,S}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=We({}),$=ne();W(()=>{v(Jt(Xt(m.status,{})))});const k=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(Sn[k()][$.type]||{}).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=u1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var S=h1(),_=S.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),T.value=b,P(()=>T.checked=y[b]),S})()})),w})()}}$e(["input","click"]);var f1=p("<div data-k-829b0f47 class=multi-input-footer><button data-k-829b0f47>Cancel</button><button data-k-829b0f47>Ok"),m1=p("<form data-k-829b0f47 class=multi-input><button data-k-829b0f47 class=open-multi-input>Country</button><dialog data-k-829b0f47><div data-k-829b0f47 class=wrapper><div data-k-829b0f47 class=scroll-wrapper>"),p1=p("<ol data-k-829b0f47>"),v1=p("<li data-k-829b0f47><label data-k-829b0f47><input data-k-829b0f47 type=radio name=country>");function $1(){const[e,t]=xe(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=m1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{t({[S.target.name]:S.target.value})},m.addEventListener("submit",S=>{S.preventDefault()});var C=u;typeof C=="function"?ge(C,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const S=o.signal;s=e.country,n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",_=>{_.target===a&&a.addEventListener("touchend",T=>{T.target===a&&(T.preventDefault(),h())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==a&&h(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",h);var b=a;typeof b=="function"?ge(b,v):a=v;var A=l;return typeof A=="function"?ge(A,k):l=k,d(k,i(g,{})),d($,i(x,{get when(){return n()},get children(){var S=f1(),_=S.firstChild,T=_.nextSibling;return _.$$click=()=>{h(),t({country:s})},T.$$click=h,S}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=We({});W(()=>{v(Jt(Xt(m.country,{})))});const $=()=>Object.entries(Gc).sort(([,k],[,C])=>k.flavorText.localeCompare(C));return(()=>{var k=p1();return d(k,i(H,{get each(){return $()},fallback:"Something went wrong",children:([C,w])=>(()=>{var b=v1(),A=b.firstChild,S=A.firstChild;return d(A,()=>w.flavorText,S),S.value=C,P(()=>S.checked=y[C]),b})()})),k})()}}$e(["input","click"]);var _1=p("<div data-k-de2dabd3 class=multi-input-footer><button data-k-de2dabd3>Cancel</button><button data-k-de2dabd3>Ok"),b1=p('<form data-k-de2dabd3 class=multi-input><button data-k-de2dabd3 class=open-multi-input>Source</button><dialog data-k-de2dabd3><div data-k-de2dabd3 class=wrapper><div data-k-de2dabd3 class=multi-input-header><input data-k-de2dabd3 type=search placeholder="Filter sources"></div><div data-k-de2dabd3 class=scroll-wrapper>'),y1=p("<ol data-k-de2dabd3>"),w1=p("<li data-k-de2dabd3><label data-k-de2dabd3><input data-k-de2dabd3 type=radio name=source>");function k1(){const[e,t]=xe(),[n,r]=O(""),{isTouch:s}=en();let a=!1,l,o,c,u,h,f;function g(){o.close(),a=!1,u==null||u.abort(),t({preventFetch:void 0})}function m(){c.classList.toggle("has-scroll-bar",c.scrollHeight-c.clientHeight>0)}return W(le(s,g)),(()=>{var v=b1(),$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=C.firstChild,b=w.firstChild,A=w.nextSibling;v.$$input=E=>{t({[E.target.name]:E.target.value})},v.addEventListener("submit",E=>{E.preventDefault()});var S=f;typeof S=="function"?ge(S,v):f=v,$.$$click=()=>{if(a)g();else{u=new AbortController;const E=u.signal;l=e.source,s()?(o.showModal(),t({preventFetch:!0}),m(),window.addEventListener("resize",m,{signal:E}),o.addEventListener("touchstart",L=>{L.target===o&&o.addEventListener("touchend",R=>{R.target===o&&(R.preventDefault(),g())},{once:!0,signal:E})},{signal:E})):(window.addEventListener("mousedown",L=>L.target!==h&&L.target.closest("dialog")!==o&&g(),{signal:E}),o.show()),a=!0}};var _=h;typeof _=="function"?ge(_,$):h=$,k.addEventListener("close",g);var T=o;typeof T=="function"?ge(T,k):o=k,b.$$input=E=>{E.stopPropagation(),r(E.target.value.toLowerCase())};var I=c;return typeof I=="function"?ge(I,A):c=A,d(A,i(y,{})),d(C,i(x,{get when(){return s()},get children(){var E=_1(),L=E.firstChild,R=L.nextSibling;return L.$$click=()=>{g(),t({source:l})},R.$$click=g,E}}),null),P(()=>v.classList.toggle("mobile",!!s())),v})();function y(){const[v]=xe(),[$,k]=We({});W(()=>{k(Jt(Xt(v.source,{})))});const C=()=>Object.entries(Ks).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=y1();return d(w,i(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var S=w1(),_=S.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),T.value=b,P(()=>S.classList.toggle("hidden",!A.flavorText.toLowerCase().includes(n()))),P(()=>T.checked=$[b]),S})()})),w})()}}$e(["input","click"]);var S1=p("<div data-k-86a7e743 class=multi-input-footer><button data-k-86a7e743>Cancel</button><button data-k-86a7e743>Ok"),C1=p('<form data-k-86a7e743 class=multi-input><button data-k-86a7e743 class=open-multi-input>ExternalSources</button><dialog data-k-86a7e743><div data-k-86a7e743 class=wrapper><div data-k-86a7e743 class=multi-input-header><input data-k-86a7e743 type=search placeholder="Filter external sources"></div><div data-k-86a7e743 class=scroll-wrapper>'),A1=p("<ol data-k-86a7e743>"),T1=p('<img data-k-86a7e743 alt="External source logo">'),x1=p("<sup data-k-86a7e743>"),I1=p("<li data-k-86a7e743><label data-k-86a7e743><div data-k-86a7e743 class=grid-wrapper><span data-k-86a7e743></span></div><input data-k-86a7e743 type=checkbox name=externalSource>");function E1(e){const[t,n]=xe(),[r,s]=O(""),{isTouch:a}=en();let l=!1,o,c,u,h,f,g;function m(){c.close(),l=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(le(a,m)),(()=>{var $=C1(),k=$.firstChild,C=k.nextSibling,w=C.firstChild,b=w.firstChild,A=b.firstChild,S=b.nextSibling;$.$$input=L=>{const R=new FormData(L.currentTarget);n({[L.target.name]:R.getAll(L.target.name)})},$.addEventListener("submit",L=>{L.preventDefault()});var _=g;typeof _=="function"?ge(_,$):g=$,k.$$click=()=>{if(l)m();else{h=new AbortController;const L=h.signal;o=t.externalSource,a()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:L}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",B=>{B.target===c&&(B.preventDefault(),m())},{once:!0,signal:L})},{signal:L})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:L}),c.show()),l=!0}};var T=f;typeof T=="function"?ge(T,k):f=k,C.addEventListener("close",m);var I=c;typeof I=="function"?ge(I,C):c=C,A.$$input=L=>{L.stopPropagation(),s(L.target.value.toLowerCase())};var E=u;return typeof E=="function"?ge(E,S):u=S,d(S,i(v,{})),d(w,i(x,{get when(){return a()},get children(){var L=S1(),R=L.firstChild,B=R.nextSibling;return R.$$click=()=>{m(),n({externalSource:o})},B.$$click=m,L}}),null),P(()=>$.classList.toggle("mobile",!!a())),$})();function v(){const[$]=xe(),[k,C]=We({});return W(()=>{C(Jt(Xt($.externalSource,{})))}),(()=>{var w=A1();return d(w,i(H,{get each(){var b;return((b=e.sources())==null?void 0:b.data)||[]},fallback:"Loading",children:b=>(()=>{var A=I1(),S=A.firstChild,_=S.firstChild,T=_.firstChild,I=_.nextSibling;return d(_,i(x,{get when(){return b.icon},get children(){var E=T1();return P(L=>{var R=b.icon,B=b.color;return R!==L.e&&G(E,"src",L.e=R),B!==L.t&&((L.t=B)!=null?E.style.setProperty("background-color",B):E.style.removeProperty("background-color")),L},{e:void 0,t:void 0}),E}}),T),d(T,()=>b.site,null),d(T,i(x,{get when(){return b.language},get children(){var E=x1();return d(E,()=>b.language),E}}),null),P(()=>A.classList.toggle("hidden",!b.site.toLowerCase().includes(r()))),P(()=>I.value=b.id),P(()=>I.checked=k[b.id]),A})()})),w})()}}$e(["input","click"]);var L1=p("<div data-k-b93bd9f3 class=multi-input-footer><button data-k-b93bd9f3>Cancel</button><button data-k-b93bd9f3>Ok"),P1=p("<form data-k-b93bd9f3 class=multi-input><button data-k-b93bd9f3 class=open-multi-input>Seasons</button><dialog data-k-b93bd9f3><div data-k-b93bd9f3 class=wrapper><div data-k-b93bd9f3 class=scroll-wrapper>"),M1=p("<ol data-k-b93bd9f3>"),D1=p("<li data-k-b93bd9f3><label data-k-b93bd9f3><input data-k-b93bd9f3 type=radio name=season>");function R1(){const[e,t]=ki(),{isTouch:n}=en();let r=!1,s,a,l,o,c,u;function h(){a.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){l.classList.toggle("has-scroll-bar",l.scrollHeight-l.clientHeight>0)}return W(le(n,h)),(()=>{var m=P1(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,k=$.firstChild;m.$$input=S=>{const T=new FormData(S.currentTarget).getAll("season");t({season:T,year:e("year")})},m.addEventListener("submit",S=>{S.preventDefault()});var C=u;typeof C=="function"?ge(C,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const S=o.signal;s=e("season"),n()?(a.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:S}),a.addEventListener("touchstart",_=>{_.target===a&&a.addEventListener("touchend",T=>{T.target===a&&(T.preventDefault(),h())},{once:!0,signal:S})},{signal:S})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==a&&h(),{signal:S}),a.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",h);var b=a;typeof b=="function"?ge(b,v):a=v;var A=l;return typeof A=="function"?ge(A,k):l=k,d(k,i(g,{})),d($,i(x,{get when(){return n()},get children(){var S=L1(),_=S.firstChild,T=_.nextSibling;return _.$$click=()=>{h(),t({season:s})},T.$$click=h,S}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const m=ne(),[y,v]=We({});W(()=>{v(Jt(Xt(e("season"),{})))});const $=()=>e("malSearch")==="true"&&(m.type==="anime"||m.type==="manga")?"mal":"ani";return(()=>{var k=M1();return d(k,i(H,{get each(){var C;return Object.entries(((C=ua[$()])==null?void 0:C[m.type])||{})},fallback:"Something went wrong",children:([C,w])=>i(x,{when:C!=="tba",get children(){var b=D1(),A=b.firstChild,S=A.firstChild;return d(A,()=>w.flavorText,S),S.value=C,P(()=>S.checked=y[C]),b}})})),k})()}}$e(["input","click"]);var N1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 0.01 512.01 511.99"><path fill=currentColor d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">');function pu(){return N1()}var O1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">');function F1(){return O1()}var B1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0.03 447.99 512.02"><path fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">');function U1(){return B1()}var V1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 65.1 512 381.8"><path fill=currentColor d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">');function G1(){return V1()}var H1=p('<svg viewBox="0 0 16 16"xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z">');function j1(){return H1()}var Y1=p('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path fill=currentColor d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">');function ka(e){return(()=>{var t=Y1();return Lt(t,e,!0,!0),t})()}var q1=p("<tool-tip2 data-k-6bfde80e inert role=tooltip>",!0,!1,!1);function z1(e){return It(e.positions,"positions"),(()=>{var t=q1();return Lt(t,e,!1,!1),t._$owner=Rr(),P(()=>G(t,"data-tooltip-positions",e.positions)),t})()}var W1=p("<li data-k-5face4dc>"),K1=p("<button data-k-5face4dc class=cp-media-action-item data-tooltip-trigger>");function Jr(e){return(()=>{var t=W1();return d(t,i(vu,e)),t})()}function vu(e){return It(e.label,"label"),fn(e.onClick,"onClick"),(()=>{var t=K1();return Ja(t,"click",e.onClick,!0),d(t,()=>e.children,null),d(t,i(z1,{positions:"left right",get children(){return e.label}}),null),P(()=>t.classList.toggle("big",!!e.big)),t})()}$e(["click"]);var J1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z">');function X1(){return J1()}var Z1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z">');function Q1(){return Z1()}var $u=p("<div data-k-2ffecdb9 class=score> "),_u=p("<div data-k-2ffecdb9 class=wrapper><img data-k-2ffecdb9 class=absolute-inset alt=Cover.>"),e_=p("<div data-k-2ffecdb9 class=list-status>"),bu=p("<p data-k-2ffecdb9 class=line-clamp>"),yu=p('<li data-k-2ffecdb9 class="cp-media-card inline-container">'),t_=p("<ul data-k-2ffecdb9 class=cp-media-card-quick-action-items>"),n_=p('<div data-k-2ffecdb9 class="absolute-inset recommendation-rating-wrapper"><div data-k-2ffecdb9 class=flex-space-between><div data-k-2ffecdb9><button data-k-2ffecdb9></button><button data-k-2ffecdb9></button></div><span data-k-2ffecdb9>'),wu=p("<li data-k-2ffecdb9 class=cp-character-card>"),r_=p("<img data-k-2ffecdb9>"),a_=p("<div data-k-2ffecdb9 class=grid><span data-k-2ffecdb9></span><span data-k-2ffecdb9>");function ku(e){return F(e.media,"Missing media"),(()=>{var t=yu();return d(t,i(U,{class:"block-link",get href(){return ld(e.media)},get children(){return[(()=>{var n=_u(),r=n.firstChild;return d(n,i(x,{get when(){return e.media.averageScore},get children(){var s=$u(),a=s.firstChild;return d(s,i(ka,{}),a),d(s,()=>e.media.averageScore/10,null),s}}),null),d(n,()=>e.children,null),P(()=>G(r,"src",e.media.coverImage.large)),n})(),(()=>{var n=bu();return d(n,i(x,{get when(){var r;return(r=e.media.mediaListEntry)==null?void 0:r.status},get children(){var r=e_();return P(()=>G(r,"data-status",e.media.mediaListEntry.status)),r}}),null),d(n,()=>e.media.title.userPreferred,null),n})()]}})),t})()}function i_(e){return F(e.media,"Missing media"),(()=>{var t=yu();return d(t,i(U,{class:"block-link",get href(){return sd(e.type,e.media)},get children(){return[(()=>{var n=_u(),r=n.firstChild;return d(n,i(x,{get when(){return e.media.score},get children(){var s=$u(),a=s.firstChild;return d(s,i(ka,{}),a),d(s,()=>e.media.score,null),s}}),null),d(n,()=>e.children,null),P(()=>G(r,"src",e.media.images.webp.large_image_url)),n})(),(()=>{var n=bu();return d(n,i(x,{get when(){return e.media.titles},get fallback(){return e.media.title},get children(){return i(z,{get children(){return[i(M,{get when(){return e.media.titles.English},get children(){return e.media.titles.English}}),i(M,{get when(){return e.media.titles.Default},get children(){return e.media.titles.Default}})]}})}})),n})()]}})),t})()}function Si(e){return F(e.media,"Missing media"),i(ku,Fe(e,{get children(){return i(Su,e)}}))}function Es(e){return F(e.media,"Missing media"),It(e.type),i(i_,Fe(e,{get children(){return i(x,{get when(){return oo[e.media.mal_id]},get children(){return i(Su,{get media(){return oo[e.media.mal_id]}})}})}}))}function Su(e){const{openEditor:t}=Ys(),{accessToken:n}=ce();return F(e.media,"Missing media"),i(x,{get when(){return n()},get children(){var r=t_();return d(r,i(Jr,{label:"Edit media",onClick:s=>{s.preventDefault(),t(e.media)},get children(){return i(pu,{})}}),null),d(r,i(Jr,{label:"Set to planning",onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"PLANNING"})},get children(){return i(F1,{})}}),null),d(r,i(Jr,{get label(){return"Set to "+(e.media.type==="ANIME"?"watching":"reading")},onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"CURRENT"})},get children(){return i(U1,{})}}),null),d(r,i(Jr,{label:"Set to completed",onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"COMPLETED"})},get children(){return i(G1,{})}}),null),d(r,i(Jr,{get label(){return"Set to "+(e.media.type==="ANIME"?"rewatching":"rereading")},onClick:s=>{s.preventDefault(),ue.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"REPEAT"})},get children(){return i(j1,{})}}),null),r}})}function s_(e){return F(e.node,"Missing node"),fn(e.handleRateUp,"handleRateUp"),fn(e.handleRateDown,"handleRateDown"),It(e.userRating,"userRating"),Xc(e.rating,"rating"),i(ku,{get media(){return e.node.mediaRecommendation},get children(){var t=n_(),n=t.firstChild,r=n.firstChild,s=r.firstChild,a=s.nextSibling,l=r.nextSibling;return Ja(s,"click",e.handleRateUp,!0),s.style.setProperty("--color","lime"),d(s,i(X1,{})),Ja(a,"click",e.handleRateDown,!0),a.style.setProperty("--color","crimson"),d(a,i(Q1,{})),d(l,i(x,{get when(){return e.rating>0},children:"+"}),null),d(l,()=>e.rating,null),P(o=>{var c=e.userRating==="RATE_UP",u=e.userRating==="RATE_DOWN";return c!==o.e&&s.classList.toggle("active",o.e=c),u!==o.t&&a.classList.toggle("active",o.t=u),o},{e:void 0,t:void 0}),t}})}function Cu(e){return F(e.character,"character"),It(e.role,"role"),(()=>{var t=wu();return d(t,i(Ls,{get href(){return gf(e.character)},get src(){return e.character.images.webp.image_url},get name(){return e.character.name},get extra(){return e.role},alt:"Character."}),null),d(t,i(x,{get when(){return e.voiceActor},get children(){return i(Ls,{get href(){return e.voiceActor.person.url},get src(){return e.voiceActor.person.images.jpg.image_url},get name(){return e.voiceActor.person.name},get extra(){return e.voiceActor.language},alt:"Voice actor.",class:"dir-rtl"})}}),null),t})()}function yl(e){return F(e.staff,"staff"),F(e.positions,"positions"),(()=>{var t=wu();return d(t,i(Ls,{get href(){return e.staff.url},get src(){return e.staff.images.jpg.image_url},get name(){return e.staff.name},get extra(){return e.positions.join(", ")},alt:"Staff."})),t})()}function Ls(e){return It(e.alt),i(U,{className:"clean-link flex",get class(){return e.class},get href(){return e.href},get children(){return[(()=>{var t=r_();return P(n=>{var r=e.src,s=e.alt;return r!==n.e&&G(t,"src",n.e=r),s!==n.t&&G(t,"alt",n.t=s),n},{e:void 0,t:void 0}),t})(),(()=>{var t=a_(),n=t.firstChild,r=n.nextSibling;return d(n,()=>e.name),d(r,()=>e.extra),t})()]}})}$e(["click"]);var l_=p("<section data-k-1bb8fda2>");function Au(e){return(()=>{var t=l_();return Lt(t,e,!1,!1),t})()}var o_=p("<button data-k-89909c33>TBA"),c_=p("<button data-k-89909c33>Current season"),d_=p("<button data-k-89909c33>Next season"),u_=p("<div data-k-89909c33>"),h_=p("<div data-k-89909c33 class=search-page><div data-k-89909c33 class=header-row><h1 data-k-89909c33></h1><select data-k-89909c33 name=type id=type><option data-k-89909c33 value=anime>Anime</option><option data-k-89909c33 value=manga>Manga</option><option data-k-89909c33 value=media>Media</option></select></div><div data-k-89909c33 class=grid-column-auto-fill><input data-k-89909c33 type=search><span data-k-89909c33><p data-k-89909c33>Search MAL</p></span><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hideMyAnime id=hideMyAnime><label data-k-89909c33 for=hideMyAnime> Hide my </label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=showMyAnime id=showMyAnime><label data-k-89909c33 for=showMyAnime> Only show my </label></div><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hasNotLicense id=hasNotLicense><label data-k-89909c33 for=hasNotLicense> Licensed</label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=hasLicense id=hasLicense><label data-k-89909c33 for=hasLicense> Unlicensed"),g_=p('<ol data-k-89909c33 class="flex-space-between cp-search-season-controls"><li data-k-89909c33><button data-k-89909c33>&lt;</button></li><li data-k-89909c33><button data-k-89909c33>>'),f_=p("<h1 data-k-89909c33> "),es=p("<h1 data-k-89909c33>"),m_=p("<h1 data-k-89909c33>TBA"),p_=p('<ol data-k-89909c33 class="search-page-content grid-column-auto-fill">'),v_=p("<li data-k-89909c33 class=item><button data-k-89909c33><h3 data-k-89909c33></h3><p data-k-89909c33>"),$_=p("<ol data-k-89909c33 class=search-meta-tags><li data-k-89909c33><button data-k-89909c33>Clear all"),__=p("<li data-k-89909c33><button data-k-89909c33>"),Ps=p("<li data-k-89909c33 class=grid-full-span><h2 data-k-89909c33>");class ie{constructor({url:t,key:n,value:r,active:s=!0,visuallyDisabled:a=!1,reason:l,desc:o,name:c,hidden:u=!1,canClear:h=!0,addUrl:f}){F(!s||n,"key missing"),F(u||c,"Name is missing"),F(!h||!s||t,"Url is missing"),F(h||u,"Don't show user meta tags they can't clear"),F(typeof s=="boolean","active is not boolean"),F(typeof a=="boolean","visuallyDisabled is not boolean"),F(typeof u=="boolean","hidden is not boolean"),F(typeof h=="boolean","canClear is not boolean"),this.name=c,this.url=t,this.addUrl=f,this.key=n,this.value=r,this.active=s,this.visuallyDisabled=a,this.reason=l,this.desc=o,this.hidden=u,this.canClear=h}match(t={}){return this.name===t.name&&ea(this.url,t.url)&&ea(this.addUrl,t.addUrl)&&this.key===t.key&&ea(this.value,t.value)&&this.active===t.active&&this.visuallyDisabled===t.visuallyDisabled&&this.reason===t.reason&&this.desc===t.desc&&this.hidden===t.hidden&&this.canClear===t.canClear}looseMatch(t={}){return this.key===t.key&&ea(this.value,t.value)&&this.active===t.active}}function b_(){var $,k,C,w,b,A,S;const e=ne(),[t]=xe(),[n]=ki(),r=e.type,s=t.malSearch==="true"&&e.type!=="media"?"mal":"ani",a=s==="ani"?"mal":"ani",l=[];let o=t.preventFetch==="true";const[c]=Ke(n("season"));if(c&&s===vs){const{api:_,flavorText:T}=((k=($=ua[s])==null?void 0:$[r])==null?void 0:k[c])||{flavorText:Sn.flavorTexts[c]||c};l.push(new ie({name:T,url:`season=${c}`,key:"season",value:_,active:_!==void 0,visuallyDisabled:_===void 0}))}const[u]=Ke(n("year"));let h=!1,f=!1,g=!1;if(c&&u&&s===Za){const{api:_,flavorText:T}=((w=(C=ua[s])==null?void 0:C[r])==null?void 0:w[c])||{flavorText:Sn.flavorTexts[c]||c};l.push(new ie({name:T,url:`season=${c}`,key:"season",value:u+"/"+_,active:_!==void 0,visuallyDisabled:_===void 0})),l.push(new ie({name:u,url:`year=${u}`,active:!1})),g=!0}else u&&(h=!0,f=!0,s==="ani"?c&&r==="anime"?l.push(new ie({name:u,url:`year=${u}`,active:!0,key:"seasonYear",value:u})):l.push(new ie({name:u,url:`year=${u}`,active:!0,key:"year",value:`${u}%`})):s==="mal"&&(l.push(new ie({name:u,url:`year=${u}`,active:!0,key:"start_date",value:`${u}-01-01`})),l.push(new ie({hidden:!0,canClear:!1,key:"end_date",value:`${u}-12-31`}))));if(Jc(g&&s===vs,"Season disabling should only have on MAL search"),t.q&&l.push(new ie({url:"q="+t.q,key:s==="ani"?"search":"q",value:t.q,name:"Search: "+t.q,active:!g,visuallyDisabled:g})),s==="ani"&&(e.type==="anime"?l.push(new ie({key:"type",value:"ANIME",hidden:!0,canClear:!1})):e.type==="manga"?l.push(new ie({key:"type",value:"MANGA",hidden:!0,canClear:!1})):e.type==="media"&&l.push(new ie({key:"type",value:void 0,hidden:!0,canClear:!1}))),t.rating===void 0)s==="ani"?l.push(new ie({key:"isAdult",value:!1,hidden:!0,canClear:!1})):s==="mal"&&l.push(new ie({key:"sfw",value:!0,hidden:!0,canClear:!1}));else{const _=Xt(t.rating);if(_.any)s==="ani"?l.push(new ie({name:"Any rating",url:"rating=any",key:"isAdult",value:void 0})):s==="mal"&&l.push(new ie({name:"Any rating",url:"rating=any",active:!1,visuallyDisabled:g}));else{const T={g:"G - All ages",pg:"PG - Children",pg13:"PG-13",r17:"R - 17+",r:"R+",rx:"Rx - Hentai"};new Set([t.rating].flat()).forEach(E=>{E==="g"||E==="pg"||E==="pg13"||E==="r17"?l.push(new ie({name:T[E],url:`rating=${E}`,key:"rating",value:E,visuallyDisabled:s==="ani"||g,active:s==="mal"&&!g})):(E==="r"||E==="rx")&&l.push(new ie({name:T[E],url:`rating=${E}`,key:"rating",value:E,active:s==="mal"&&!g,visuallyDisabled:g}))}),s==="ani"&&(_.rx&&(_.g||_.pg||_.pg13||_.r17||_.r)?l.push(new ie({key:"isAdult",value:void 0,hidden:!0,canClear:!1})):l.push(new ie({key:"isAdult",value:_.rx===!0,hidden:!0,canClear:!1})))}}if(t.genre){const[,_,T]=[...vr(t.genre)].reduce(m,["genre"]);s==="ani"?(_.length&&l.push(new ie({key:"genres",value:_,hidden:!0,canClear:!1})),T.length&&l.push(new ie({key:"tags",value:T,hidden:!0,canClear:!1}))):s==="mal"&&_.length&&l.push(new ie({key:"genres",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}if(t.excludeGenre){const[,_,T]=[...vr(t.excludeGenre)].reduce(m,["excludeGenre"]);s==="ani"?(_.length&&l.push(new ie({key:"excludedGenres",value:_,hidden:!0,canClear:!1})),T.length&&l.push(new ie({key:"excludeTags",value:T,hidden:!0,canClear:!1}))):s==="mal"&&_.length&&l.push(new ie({key:"genres_exclude",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}function m([_,T=[],I=[]],E){let L=!1;return s==="ani"?Hn.genres===null?o=!0:Hn.tags[E]?I.push(E):Hn.genres[E]?T.push(E):L=!0:s==="mal"&&(Hn[r]===null?o=!0:Number.isInteger(Hn[r][E])?T.push(Hn[r][E]):L=!0),l.push(new ie({name:E,url:`${_}=${E}`,active:!1,visuallyDisabled:L||g})),[_,T,I]}const[y]=[+t.startYear].flat();y&&(f=!0,s==="ani"?l.push(new ie({name:`Year greater than ${y-1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearGreater",value:parseInt(`${y-1}9999`)})):s==="mal"&&l.push(new ie({name:`Year greater than ${y-1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`startYear=${y}`,key:"start_date",value:`${y}-01-01`})));const[v]=[+t.endYear].flat();v&&(h=!0,s==="ani"?l.push(new ie({name:`Year lesser than ${v+1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearLesser",value:parseInt(`${v+1}0000`)})):s==="mal"&&l.push(new ie({name:`Year lesser than ${v+1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`endYear=${v}`,key:"start_date",value:`${v}-12-31`}))),t.onList==="true"&&l.push(new ie({name:`Show my ${r}`,active:s==="ani",visuallyDisabled:s!=="ani",url:"onList=true",key:"onList",value:!0})),t.onList==="false"&&l.push(new ie({name:`Hide my ${r}`,active:s==="ani",visuallyDisabled:s!=="ani",url:"onList=false",key:"onList",value:!1}));{const _=[];vr(n("format")).forEach(T=>{var R;const{api:I,flavorText:E}=((R=Kn[s][r])==null?void 0:R[T])||{},L=E||Kn.flavorTexts[T]||T;s==="ani"&&I&&_.push(I),I?g&&s===Za?l.push(new ie({name:"Format: "+E,key:"filter",value:I,url:`format=${T}`})):l.push(new ie({name:"Format: "+E,active:s==="mal",key:"type",value:I,url:`format=${T}`})):l.push(new ie({name:"Format: "+L,active:!1,visuallyDisabled:!0,url:`format=${T}`}))}),_.length&&l.push(new ie({key:"format",value:_,canClear:!1,hidden:!0}))}{const _=[];let T=!1,I=!1;vr(n("order")).forEach(L=>{var ae,re,Q;let R=L;if(L===zt.ani.anime.duration.alternative_key)R="duration",l.push(new ie({name:"Duration greater than 0",url:`order=${L}`,active:s==="ani",visuallyDisabled:s!=="ani",addUrl:`order=${R}`,key:"durationGreater",value:0}));else if(L===zt.mal.anime.episodes.alternative_key)R="episodes",s==="ani"?r==="anime"?l.push(new ie({name:"Episodes greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="manga"?l.push(new ie({name:"Chapters greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="media"&&l.push(new ie({name:"Episodes/Chapters greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):s==="mal"&&l.push(new ie({name:"Status complete",url:`order=${L}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(L===zt.mal.manga.volumes.alternative_key)R="volumes",s==="ani"?l.push(new ie({name:"Volumes greater than 0",url:`order=${L}`,addUrl:`order=${R}`,active:r==="manga"&&!g,visuallyDisabled:r!=="manga"||g,key:"volumeGreater",value:0})):s==="mal"&&l.push(new ie({name:"Status complete",url:`order=${L}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(L===zt.mal.anime.end_date.alternative_key){R="end_date";const J={name:"Only valid dates",active:!h&&!g,hidden:h,url:`order=${L}`,addUrl:`order=${R}`};s==="ani"?l.push(new ie({...J,key:"endDateGreater",value:0})):s==="mal"&&l.push(new ie({...J,key:"end_date",value:`${new Date().getFullYear()+100}-01-01`,visuallyDisabled:g}))}else if(L===zt.mal.anime.start_date.alternative_key){R="start_date";const J={name:"Only valid dates",active:!f&&!g,hidden:f,url:`order=${L}`,addUrl:`order=${R}`};s==="ani"?l.push(new ie({...J,key:"yearGreater",value:0})):s==="mal"&&l.push(new ie({...J,key:"start_date",value:"0000-01-01",visuallyDisabled:g}))}const{api:B,flavorText:V,reverse:X}=((ae=zt[s][r])==null?void 0:ae[R])||{},j=V||((Q=(re=zt[s==="ani"?"mal":"ani"][r])==null?void 0:re[R])==null?void 0:Q.flavorText)||zt.flavorTexts[R]||L;s==="ani"&&B?t.sort==="ASC"?_.push(B):_.push(B+"_DESC"):s==="mal"&&X&&(I=!0);const K=[`order=${L}`];t.sort&&K.push(`sort=${t.sort}`),B?(T||(T=s==="mal"),l.push(new ie({name:"Sort: "+V,active:s==="mal"&&!g,visuallyDisabled:g,key:"order_by",value:B,url:K}))):l.push(new ie({name:"Sort: "+j,active:!1,visuallyDisabled:!0,url:K}))}),F(_.length===0||s==="ani","validAniOrder should not have anilist orders when engine is mal"),F(T===!1||s==="mal","validMalOrder should be false if engine is ani"),s==="ani"?_.length?l.push(new ie({key:"sort",value:_,canClear:!1,hidden:!0})):t.q?l.push(new ie({key:"sort",value:"SEARCH_MATCH",canClear:!1,hidden:!0})):l.push(new ie({key:"sort",value:"POPULARITY_DESC",canClear:!1,hidden:!0})):s==="mal"&&(!T&&!t.q&&(I=!0,l.push(new ie({key:"order_by",value:"popularity",canClear:!1,hidden:!0,active:!g,visuallyDisabled:g}))),I?l.push(new ie({key:"sort",value:t.sort==="ASC"?"desc":"asc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})):l.push(new ie({key:"sort",value:t.sort==="ASC"?"asc":"desc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})))}if(n("status")){const[_]=Ke(n("status")),{api:T,flavorText:I}=((b=Sn[s][r])==null?void 0:b[_])||{flavorText:((S=(A=Sn[a][r])==null?void 0:A[_])==null?void 0:S.flavorText)||Sn.flavorTexts[_]||_};l.push(new ie({name:I,active:!!T,visuallyDisabled:!T,key:"status",value:T,url:`status=${_}`}))}if(n("country")){const[_]=Ke(n("country")),{flavorText:T}=Gc[_]||{flavorText:_};l.push(new ie({name:T,active:s==="ani",visuallyDisabled:s!=="ani",key:"countryOfOrigin",value:_,url:`country=${_}`}))}if(t.source){const[_]=Ke(t.source),{api:T,flavorText:I}=Ks[_]||{flavorText:_};l.push(new ie({name:I,active:s==="ani",visuallyDisabled:s!=="ani",key:"source",value:T,url:`source=${_}`}))}if(t.license!==void 0){const _=t.license==="true";l.push(new ie({name:_?"Licensed":"Unlicensed",active:s==="ani",visuallyDisabled:s!=="ani",key:"isLicensed",value:_,url:`license=${_}`}))}if(t.externalSource!==void 0){const _=Ke(t.externalSource).map(Number);_.forEach(T=>{l.push(new ie({name:y_[T]||T,active:!1,visuallyDisabled:s!=="ani",url:`externalSource=${T}`}))}),l.push(new ie({active:s==="ani",hidden:!0,canClear:!1,key:"licensedBy",value:_}))}if(t.episodeGreater!==void 0){const[_]=Ke(t.episodeGreater).map(Number),T={active:s==="ani",visuallyDisabled:s!=="ani",key:"episodeGreater",value:Math.max(_+1,0),url:`episodeGreater=${_}`};r==="manga"?l.push(new ie({name:`Chapters greater than ${_}`,...T})):r==="anime"?l.push(new ie({name:`Episodes greater than ${_}`,...T})):r==="media"&&l.push(new ie({name:`Episode/Chapters greater than ${_}`,...T}))}if(t.episodeLesser!==void 0){const[_]=Ke(t.episodeLesser).map(Number),T={active:s==="ani",visuallyDisabled:s!=="ani",key:"episodeLesser",value:Math.max(_,0),url:`episodeLesser=${_}`};r==="manga"?l.push(new ie({name:`Chapters lesser than ${_}`,...T})):r==="anime"?l.push(new ie({name:`Episodes lesser than ${_}`,...T})):r==="media"&&l.push(new ie({name:`Episode/Chapters lesser than ${_}`,...T}))}if(t.rank){const[_]=Ke(t.rank);l.push(new ie({name:`Tags above ${_}%`,url:`rank=${_}`,key:"minimumTagRank",value:_,active:s==="ani",visuallyDisabled:s!=="ani"}))}return[r,s,l,o]}const[Hn,Ro]=We({anime:null,manga:null,genres:null,tags:null}),[y_,w_]=We({});function k_(e){const t=V$(),n=ne(),[r,s]=xe(),[a,l]=O(),[o,c]=O(),[u,h]=O(),[f,g]=O(),[m,y]=O(),[v,$]=O(),[k]=ue.anilist.genresAndTags(()=>r.malSearch!=="true"||void 0),[C]=ue.anilist.externalSources(()=>r.malSearch!=="true"||n.type==="media"?null:n.type==="anime"||n.type==="manga"?n.type.toUpperCase():void 0),[w]=ue.myAnimeList.genresAndThemes(()=>r.malSearch==="true"&&(n.type==="anime"||n.type==="manga")?n.type:void 0),b=mn(s,300),A=tr(mn,(S,_,T)=>{Oe(()=>{g(S),y(_),$(I=>{const E=(I==null?void 0:I.filter(R=>R.active))||[],L=T.filter(R=>R.active);return E.length===L.length&&E.every((R,B)=>R.looseMatch(L[B]))?I:T})})},300);return W(le(w,S=>{S&&Ro(S.data.translations)})),W(le(k,S=>{S&&Ro({genres:Xt(S.data.genres),tags:S.data.tags.reduce((_,T)=>(_[T.name]=T,_),{})})})),W(le(C,S=>{S&&w_(S.data.reduce((_,T)=>(_[T.id]=T.site,_),{}))})),W(()=>{const[S,_,T,I]=b_();I||Oe(()=>{l(S),c(_),h(E=>(E==null?void 0:E.length)===T.length&&T.every((L,R)=>L.match(E[R]))?E:T),A(S,_,T)})}),(()=>{var S=h_(),_=S.firstChild,T=_.firstChild,I=T.nextSibling,E=_.nextSibling,L=E.firstChild,R=L.nextSibling;R.firstChild;var B=R.nextSibling,V=B.firstChild,X=V.nextSibling;X.firstChild;var j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling;ae.firstChild;var re=B.nextSibling,Q=re.firstChild,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling;return d(T,()=>Je(n.mode)),I.addEventListener("change",fe=>t(fe.target.value)),L.$$input=fe=>{b({q:fe.target.value})},d(R,i(M$,{get disabled(){return n.type==="media"},name:"malSearch",get checked(){return r.malSearch==="true"&&n.type!=="media"},onInput:fe=>{s({malSearch:fe.target.checked||void 0})}}),null),V.$$input=fe=>{s({onList:fe.target.checked?!1:void 0})},d(X,()=>n.type,null),K.$$input=fe=>{s({onList:fe.target.checked||void 0})},d(ae,()=>n.type,null),Q.$$input=fe=>{s({license:fe.target.checked||void 0})},ve.$$input=fe=>{s({license:fe.target.checked?!1:void 0})},d(E,i(L$,{}),null),d(E,i(F$,{aniGenres:k,malGenres:w,translation:Hn,get engine(){return o()},showAdult:!0}),null),d(E,i(Z$,{}),null),d(E,i(r1,{}),null),d(E,i(o1,{}),null),d(E,i(g1,{}),null),d(E,i($1,{}),null),d(E,i(k1,{}),null),d(E,i(R1,{}),null),d(E,i(E1,{sources:C}),null),d(E,i(mu,{min:0,max:500,separation:1,get minValue(){return+r.episodeGreater||0},get maxValue(){return+r.episodeLesser||500},onChange:([fe,ee])=>s({episodeLesser:ee,episodeGreater:fe})}),null),d(E,i(x,{get when(){return n.type==="anime"},get children(){var fe=u_();return d(fe,i(U,{get href(){return"/search/anime/tba"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return o_()}}),null),d(fe,i(U,{get href(){return"/search/anime/this-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return c_()}}),null),d(fe,i(U,{get href(){return"/search/anime/next-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return d_()}}),null),fe}}),null),d(S,i(Mc.Provider,{value:{searchType:a,searchEngine:o,searchVariables:u,debouncedSearchType:f,debouncedSearchEngine:m,debouncedSearchVariables:v},get children(){return e.children}}),null),P(()=>G(L,"placeholder","Search "+(n.type||"All"))),P(()=>I.value=n.type),P(()=>L.value=r.q||""),P(()=>V.checked=r.onList==="false"),P(()=>K.checked=r.onList==="true"),P(()=>Q.checked=r.license==="true"),P(()=>ve.checked=r.license==="false"),S})()}function S_(e){const t=ne(),[n]=xe(),[r,s]=ki(),{debouncedSearchEngine:a,debouncedSearchType:l,searchVariables:o,debouncedSearchVariables:c}=js(),u=pn();return[i(z,{get children(){return i(M,{get when(){var h;return((h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){var h=g_(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild;return g.$$click=()=>{const v=$r(qt(r("season")),+qt(r("year")),-1);s({year:v.year,season:v.season.toLowerCase()})},d(h,i(H,{each:["winter","spring","summer","fall"],children:v=>(()=>{var $=v_(),k=$.firstChild,C=k.firstChild,w=C.nextSibling;return k.$$click=()=>s({season:v,year:+qt(r("year"))}),d(C,()=>Je(v)),d(w,()=>qt(r("year"))),P(()=>$.classList.toggle("selected",v===qt(r("season")))),$})()}),m),y.$$click=()=>{const v=$r(qt(r("season")),+qt(r("year")),1);s({year:v.year,season:v.season.toLowerCase()})},h}})}}),i(z,{get children(){return[i(M,{get when(){var h;return(h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/)},get children(){var h=f_(),f=h.firstChild;return d(h,()=>Je(t.header.split("-")[0]),f),d(h,()=>t.header.split("-")[1],null),h}}),i(M,{get when(){return t.header==="this-season"},get children(){var h=es();return d(h,i(x,{get when(){return n.season||n.year},fallback:"Current season",get children(){return[N(()=>Je(qt(r("season"))))," ",N(()=>qt(r("year")))]}})),h}}),i(M,{get when(){return t.header==="next-season"},get children(){var h=es();return d(h,i(x,{get when(){return n.season||n.year},fallback:"Next season",get children(){return[N(()=>Je(qt(r("season"))))," ",N(()=>qt(r("year")))]}})),h}}),i(M,{get when(){return t.header==="tba"},get children(){return m_()}}),i(M,{get when(){return t.header},get children(){var h=es();return d(h,()=>t.header),h}})]}}),N(()=>e.children),i(x,{get when(){var h;return(h=o())==null?void 0:h.filter(f=>!f.hidden)},children:h=>i(x,{get when(){return h().length},get children(){return["Tags:",(()=>{var f=$_(),g=f.firstChild,m=g.firstChild;return d(f,i(H,{get each(){return h()},children:y=>i(x,{get when(){return!y.hidden},get children(){var v=__(),$=v.firstChild;return $.$$click=()=>{const k={};Ke(y.url).forEach(C=>{const[w,...b]=C.split("="),A=b.join("=");k[w]=Ke(k[w]||n[w]).filter(S=>S!==A)}),Ke(y.addUrl).forEach(C=>{const[w,...b]=C.split("="),A=b.join("=");k[w]??(k[w]=Ke(n[w])),k[w].push(A)}),s(k)},d($,()=>y.name),P(()=>v.classList.toggle("disabled",!!y.visuallyDisabled)),v}})}),g),m.$$click=()=>{n.malSearch==="true"?u("/search/"+t.type+"?malSearch=true"):u("/search/"+t.type)},f})()]}})}),i(Au,{get children(){var h=p_();return d(h,i(z,{get children(){return[i(M,{get when(){return a()==="ani"},get children(){return i(z,{get children(){return[i(M,{get when(){var f;return((f=t.header)==null?void 0:f.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){return[i(x,{get when(){var f;return(f=c().find(g=>g.key==="seasonYear"))==null?void 0:f.value},children:f=>i(x,{get when(){var g;return(g=c().find(m=>m.key==="season"))==null?void 0:g.value},children:g=>i(x,{get when(){return c().filter(m=>m.key==="format").length===0||c().some(m=>{var y;return m.key==="format"&&((y=m.value)==null?void 0:y.includes("TV"))})},get children(){return i(Ms,{page:1,get variables(){return c()},title:"Leftovers",groupCards:!1,get extraVariables(){return{seasonYear:$r(g(),+f(),-1).year,season:$r(g(),+f(),-1).season,episodeGreater:16,format:"TV"}}})}})})}),i(Ms,{page:1,get variables(){return c()},extraVariables:{sort:"FORMAT"}})]}}),i(M,{when:!0,get children(){return i(Tu,{nestLevel:1,page:1,get variables(){return c()}})}})]}})}}),i(M,{get when(){return a()==="mal"},get children(){return i(z,{get children(){return[i(M,{get when(){return l()==="anime"},get children(){return i(Ds,{nestLevel:1,type:"anime",page:1,get variables(){return c()}})}}),i(M,{get when(){return l()==="manga"},get children(){return i(Ds,{nestLevel:1,type:"manga",page:1,get variables(){return c()}})}})]}})}})]}})),h}})]}function C_(){G$()()}function Tu(e){const{accessToken:t}=ce(),{debouncedSearchVariables:n}=js(),[r,s]=O(void 0),[a]=ue.anilist.searchMediaCache(t,n,e.page),[l]=ue.anilist.searchMedia(t,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O();return W(le(a,u=>u&&c(u.data.media))),W(le(l,u=>u&&c(u.data.media))),i($n,{onIntersection:()=>s(e.variables),fetchResponse:l,get loadingElement(){return N(()=>!!o())()&&i(Rs,{get data(){return o()}})},get loading(){return e.loading},children:u=>[i(Rs,{get data(){return o()}}),i(x,{get when(){return l().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return l().data.media},get keyed(){return e.nestLevel===1},get children(){return i(x,{get when(){return e.variables},children:h=>i(x,{when:u===!1,fallback:"Fetch cooldown",get children(){return i(Tu,{get variables(){return h()},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return l.loading}})}})})}})}})]})}function Ms(e){const t=Fe({groupCards:!0},e);F(t.page,"page is missing"),F(t.extraVariables,"extraVariables is missing");const{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.searchMedia(n,()=>t.variables,t.page,()=>t.extraVariables);return W(le(a,l=>{l!=null&&l.data.pageInfo.hasNextPage&&s(t.variables)})),i(x,{get when(){return a()},get children(){return[i(x,{get when(){return N(()=>!!t.title)()&&a().data.media.length},get children(){var l=Ps(),o=l.firstChild;return d(o,()=>t.title),l}}),i(z,{get children(){return[i(M,{get when(){return t.groupCards},get children(){return i(A_,{get data(){return a().data.media},get lastFormat(){return t.previousFormat||"Unknown format"}})}}),i(M,{get when(){return t.groupCards===!1},get children(){return i(Rs,{get data(){return a().data.media}})}})]}}),i(x,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(Ms,{get variables(){return r()},get extraVariables(){return t.extraVariables},get page(){return t.page+1},get previousFormat(){var l;return((l=a().data.media.at(-1))==null?void 0:l.format)||"Unknown format"}})}})]}})}const No=new Set;function Ds(e){const{accessToken:t}=ce(),{debouncedSearchVariables:n}=js(),[r,s]=O(void 0),[a]=ue.myAnimeList.mediaSearchCache(e.type,n,e.page),[l]=ue.myAnimeList.mediaSearch(e.type,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O(),u=N(m=>{var $;const y=new Set;($=o())==null||$.forEach(k=>y.add(k.mal_id));const v=[...y.difference(No)];return v.length?(v.forEach(k=>No.add(k)),v):m||[]}),f=Me(tn,t,()=>({idMal_in:u(),type:e.type.toUpperCase()})),[g]=nt(f);return W(le(g,m=>{var v;if(!((v=m==null?void 0:m.data)!=null&&v.length))return;const y=Object.fromEntries(Object.values(m.data).map($=>[$.idMal,$]));Bm(y)})),W(le(a,m=>m&&c(m.data.data))),W(le(l,m=>m&&c(m.data.data))),i($n,{rootMargin:"200px",onIntersection:()=>s(e.variables),fetchResponse:l,get loadingElement(){return N(()=>!!o())()&&i(Oo,{get data(){return o()}})},get loading(){return e.loading},children:m=>[i(Oo,{get data(){return o()}}),i(x,{get when(){return l().data.pagination.has_next_page},get children(){return i(x,{get when(){return l().data.data},get keyed(){return e.nestLevel===1},get children(){return i(x,{get when(){return e.variables},children:y=>i(x,{when:m===!1,fallback:"Fetch cooldown",get children(){return i(Ds,{get variables(){return y()},get type(){return e.type},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return l.loading}})}})})}})}})]})}function Oo(e){const t=ne();return i(H,{get each(){return e.data},children:n=>i(Es,{media:n,get type(){return t.type}})})}function A_(e){return[i(x,{get when(){return e.data[0]&&e.lastFormat!==e.data[0].format},get children(){var t=Ps(),n=t.firstChild;return d(n,()=>Mr(e.data[0].format)||"Unknown format"),t}}),i(H,{get each(){return e.data},children:(t,n)=>[i(x,{get when(){return N(()=>n()>0)()&&e.data[n()-1].format!==t.format},get children(){var r=Ps(),s=r.firstChild;return d(s,()=>Mr(t.format)),r}}),i(Si,{media:t})]})]}function Rs(e){return i(H,{get each(){return e.data},children:t=>i(Si,{media:t})})}$e(["input","click"]);var T_=p("<div data-k-f58f9d48>Error user not found"),x_=p("<img data-k-f58f9d48 class=banner alt=Banner>"),I_=p("<button data-k-f58f9d48>"),E_=p("<span data-k-f58f9d48 class=user-profile-following-badge>Follows you"),L_=p("<div data-k-f58f9d48 class=user-page><div data-k-f58f9d48 class=profile-banner-container><div data-k-f58f9d48 class=user-profile-container><img data-k-f58f9d48 class=profile alt=Profile><div data-k-f58f9d48 class=content><h2 data-k-f58f9d48><a data-k-f58f9d48 target=_blank></a></h2><p data-k-f58f9d48>Joined <! data-k-f58f9d48> (<! data-k-f58f9d48> days)</p></div></div></div><nav data-k-f58f9d48 class=profile-navigation><ul data-k-f58f9d48><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48>"),P_=p("<div data-k-f58f9d48 class=banner>");function M_(e){const t=ne(),{accessToken:n}=ce(),[r,{mutateCache:s}]=ue.anilist.userByName(()=>t.name,n),a=l=>{s(o=>(o.data.isFollowing=l,r().data.isFollowing=l,o))};return W(le(r,l=>{l&&(document.title=`${l.data.name} profile - LOB`)})),i(Dc.Provider,{value:{user:()=>r().data,following:a},get children(){return i(z,{get children(){return[i(M,{get when(){return N(()=>{var l;return!!((l=r())!=null&&l.data)})()&&(!r.loading||r().data.name===t.name)},get children(){return i(D_,{get children(){return e.children}})}}),i(M,{get when(){var l;return(l=r())==null?void 0:l.error},get children(){return T_()}})]}})}})}function D_(e){const{user:t,following:n}=tt(),{authUserData:r,accessToken:s}=ce(),[a,l]=O(t().isFollowing);return W(()=>{l(t().isFollowing)}),(()=>{var o=L_(),c=o.firstChild,u=c.firstChild,h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.firstChild,y=g.nextSibling,v=y.firstChild,$=v.nextSibling,k=$.nextSibling,C=k.nextSibling;C.nextSibling;var w=c.nextSibling,b=w.firstChild,A=b.firstChild,S=A.nextSibling,_=S.nextSibling,T=_.nextSibling,I=T.nextSibling,E=I.nextSibling;return d(c,i(x,{get when(){return t().bannerImage},get fallback(){return P_()},get children(){var L=x_();return P(()=>G(L,"src",t().bannerImage)),L}}),u),d(f,i(x,{get when(){var L;return t().id!==((L=r())==null?void 0:L.data.id)},get children(){var L=I_();return L.$$click=async()=>{l(B=>!B);const R=await ue.anilist.toggleFollow(s(),t().id);R.status===200?n(R.data.isFollowing):l(t().isFollowing)},d(L,i(x,{get when(){return a()},fallback:"Follow",children:"Following"})),L}}),g),d(m,()=>t().name),d(g,i(x,{get when(){return t().isFollower},get children(){return E_()}}),null),d(y,()=>rd(t().createdAt*1e3),$),d(y,()=>Math.floor((new Date-t().createdAt*1e3)/1e3/60/60/24),C),d(A,i(U,{href:"",children:"Overview"})),d(S,i(U,{href:"anime",children:"Anime list"})),d(_,i(U,{href:"manga",children:"Manga list"})),d(T,i(U,{href:"favourites",children:"Favourites"})),d(I,i(U,{href:"stats",children:"Stats"})),d(E,i(U,{href:"socials",children:"Socials"})),d(o,()=>e.children,null),P(L=>{var R=t().options.profileColor,B=t().avatar.large,V="https://anilist.co/user/"+t().name;return R!==L.e&&((L.e=R)!=null?o.style.setProperty("--user-color",R):o.style.removeProperty("--user-color")),B!==L.t&&G(h,"src",L.t=B),V!==L.a&&G(m,"href",L.a=V),L},{e:void 0,t:void 0,a:void 0}),o})()}$e(["click"]);var R_=p("<p data-k-fa035f06 class=time>");function ts(e){const t=ne();return(()=>{var n=R_();return d(n,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[i(x,{get when(){return Math.floor(e.stats.minutesWatched/60/24)},children:r=>[N(()=>ye(r()))," day",N(()=>Ne(r()))," "]}),i(x,{get when(){return Math.floor(e.stats.minutesWatched/60%24)},children:r=>[N(()=>ye(r()))," hour",N(()=>Ne(r()))," "]}),i(x,{get when(){return e.stats.minutesWatched<60},get children(){return[N(()=>e.stats.minutesWatched)," minute",N(()=>Ne(e.stats.minutesWatched))]}})]}}),i(M,{get when(){return t.type==="manga"},get children(){return["Chapters read ",N(()=>ye(e.stats.chaptersRead))]}})]}})),n})()}var N_=p("<section data-k-9dc7c2b9 class=user-profile-stats-formats><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Format distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Status distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Country distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler>"),ns=p("<li data-k-9dc7c2b9><div data-k-9dc7c2b9><div data-k-9dc7c2b9 class=container><p data-k-9dc7c2b9></p></div></div><div data-k-9dc7c2b9 class=right><p data-k-9dc7c2b9>%</p><p data-k-9dc7c2b9>/");function O_(e){const[t,n]=O(),r=ne(),{user:s}=tt();return W(()=>{n(e.formats.reduce((a,l)=>a+l.count,0))}),(()=>{var a=N_(),l=a.firstChild,o=l.firstChild,c=o.nextSibling,u=l.nextSibling,h=u.firstChild,f=h.nextSibling,g=u.nextSibling,m=g.firstChild,y=m.nextSibling;return d(c,i(H,{get each(){return e.formats},children:v=>(()=>{var $=ns(),k=$.firstChild,C=k.firstChild,w=C.firstChild,b=k.nextSibling,A=b.firstChild,S=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"/?format="+v.format},get children(){return Mr(v.format)}}),w),d(w,()=>v.meanScore||""),d(k,i(ts,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),d(f,i(H,{get each(){return e.statuses},children:v=>(()=>{var $=ns(),k=$.firstChild,C=k.firstChild,w=C.firstChild,b=k.nextSibling,A=b.firstChild,S=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"?userStatus="+v.status},get children(){return i(z,{get fallback(){return Je(v.status)},get children(){return[i(M,{get when(){return v.status==="CURRENT"},get children(){return i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Watching"}),i(M,{get when(){return r.type==="manga"},children:"Reading"})]}})}}),i(M,{get when(){return v.status==="REPEATING"},get children(){return i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatching"}),i(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})}})]}})}}),w),d(w,()=>v.meanScore||""),d(k,i(ts,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),d(y,i(H,{get each(){return e.countries},children:v=>(()=>{var $=ns(),k=$.firstChild,C=k.firstChild,w=C.firstChild,b=k.nextSibling,A=b.firstChild,S=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,i(U,{class:"title",get href(){return"/user/"+s().name+"/"+r.type+"?countryOfOrigin="+v.country},get children(){return Zg(v.country)}}),w),d(w,()=>v.meanScore||""),d(k,i(ts,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),S),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),a})()}var F_=p("<div data-k-9dd95ab0 class=scroll-line-chart>"),B_=p("<div data-k-9dd95ab0 class=scroll-bar-chart>");function U_(e){let t=0,n=0,r=NaN,s;return(()=>{var a=F_();a.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,s.style.userSelect="none",s.scrollTo(n-c,0)}else{s.style.userSelect=null,t=o.clientX,n=s.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(s.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var l=s;return typeof l=="function"?ge(l,a):s=a,d(a,()=>e.children),a})()}function xu(e){let t=0,n=0,r=NaN,s;return(()=>{var a=B_();a.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,s.style.userSelect="none",s.scrollTo(n-c,0)}else{s.style.userSelect=null,t=o.clientX,n=s.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(s.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var l=s;return typeof l=="function"?ge(l,a):s=a,d(a,()=>e.children),a})()}$e(["mousemove"]);var V_=p("<button data-k-3e65cd93>Hours Watched"),G_=p("<button data-k-3e65cd93>Chapters Read"),H_=p("<ol data-k-3e65cd93>"),j_=p("<section data-k-3e65cd93><div data-k-3e65cd93 class=flex-space-between><h2 data-k-3e65cd93>Score distributions</h2><div data-k-3e65cd93><button data-k-3e65cd93>"),Y_=p("<li data-k-3e65cd93><p data-k-3e65cd93></p><div data-k-3e65cd93></div><p data-k-3e65cd93>");function q_(e){const t=ne(),[n,r]=O("count"),[s,a]=O(0);return W(()=>{const l=e.data.reduce((o,c)=>Math.max(o,c[n()]),0);a(l)}),(()=>{var l=j_(),o=l.firstChild,c=o.firstChild,u=c.nextSibling,h=u.firstChild;return h.$$click=()=>r("count"),d(h,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),i(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(u,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var f=V_();return f.$$click=()=>r("minutesWatched"),f}}),i(M,{get when(){return t.type==="manga"},get children(){var f=G_();return f.$$click=()=>r("chaptersRead"),f}})]}}),null),d(l,i(xu,{get children(){var f=H_();return d(f,i(H,{get each(){return e.data},children:g=>(()=>{var m=Y_(),y=m.firstChild,v=y.nextSibling,$=v.nextSibling;return d(y,()=>g.score),d($,i(x,{get when(){return n()==="minutesWatched"},get fallback(){return ye(g[n()])},get children(){return ye(Math.ceil(g[n()]/60))}})),P(k=>(k=`${g[n()]/s()*85}%`)!=null?v.style.setProperty("height",k):v.style.removeProperty("height")),m})()})),f}}),null),l})()}$e(["click"]);var z_=p("<button data-k-d05f0288>Hours Watched"),W_=p("<button data-k-d05f0288>Chapters Read"),K_=p("<div data-k-d05f0288><button data-k-d05f0288></button><button data-k-d05f0288>Mean Score");function Or(e){const t=ne();return(()=>{var n=K_(),r=n.firstChild,s=r.nextSibling;return r.$$click=()=>e.setState("count"),d(r,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),i(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(n,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var a=z_();return a.$$click=()=>e.setState("minutesWatched"),a}}),i(M,{get when(){return t.type==="manga"},get children(){var a=W_();return a.$$click=()=>e.setState("chaptersRead"),a}})]}}),s),s.$$click=()=>e.setState("meanScore"),n})()}$e(["click"]);var J_=p("<ol data-k-614cd53d>"),X_=p("<section data-k-614cd53d><div data-k-614cd53d class=flex-space-between><h2 data-k-614cd53d>Episode count"),Z_=p("<li data-k-614cd53d><p data-k-614cd53d class=no-wrap></p><div data-k-614cd53d></div><p data-k-614cd53d>");function Q_(e){const[t,n]=O("count"),[r,s]=O(0);return W(()=>{const a=e.data.reduce((l,o)=>Math.max(l,o[t()]),0);s(a)}),(()=>{var a=X_(),l=a.firstChild;return l.firstChild,d(l,i(Or,{setState:n}),null),d(a,i(xu,{get children(){var o=J_();return d(o,i(H,{get each(){return e.data},children:c=>(()=>{var u=Z_(),h=u.firstChild,f=h.nextSibling,g=f.nextSibling;return d(h,()=>c.length||"Unknown"),d(g,i(x,{get when(){return t()==="minutesWatched"},get fallback(){return ye(c[t()])},get children(){return ye(Math.ceil(c[t()]/60))}})),P(m=>(m=`${c[t()]/r()*85}%`)!=null?f.style.setProperty("height",m):f.style.removeProperty("height")),u})()})),o}}),null),a})()}function eb(e){var s;const[t,n]=O(((s=e())==null?void 0:s.getBoundingClientRect().width)||0),r=()=>{var a;n(((a=e())==null?void 0:a.getBoundingClientRect().width)||0)};return W(le(e,r)),window.addEventListener("resize",r),ze(()=>{window.removeEventListener("resize",r)}),t}var tb=p("<svg data-k-ecb119dc><path data-k-ecb119dc stroke=none stroke-width=0 fill=var(--background-350)></path><rect data-k-ecb119dc x=0 width=100% height=60 fill=var(--background-300) stroke=none pointer-events=all></rect><path data-k-ecb119dc stroke=black stroke-width=5 fill=transparent>"),nb=p("<section data-k-ecb119dc class=no-motion><div data-k-ecb119dc class=flex-space-between><h2 data-k-ecb119dc>"),rb=p("<svg data-k-ecb119dc><g data-k-ecb119dc class=item><rect data-k-ecb119dc y=0 height=100% fill=none stroke=none pointer-events=all></rect><circle data-k-ecb119dc r=6 pointer-events=none></circle><text data-k-ecb119dc fill=currentColor class=text y=0 text-anchor=middle></text><text data-k-ecb119dc fill=currentColor class=year y=304 text-anchor=middle></svg>",!1,!0,!1);function Fo(e){let t;const[n,r]=O(0),s=eb(()=>t),[a,l]=O("count"),o=32,c=64,u=60,h=()=>Math.max(50,s()/e.data.length),f=v=>o+v*h(),g=v=>Math.ceil((1-v/n())*200+c);W(()=>{const v=e.data.reduce(($,k)=>Math.max($,k[a()]),0);r(v)}),W(le(s,()=>{t==null||t.classList.add("no-motion"),setTimeout(()=>{t==null||t.classList.remove("no-motion")},100)}));const m=N(()=>e.data.map(($,k,C)=>k===0?"M"+f(k)+" "+g($[a()]):k<C.length-1?"S"+xa(f(k),f(k-1),.35)+" "+xa(g($[a()]),g($[a()])+(g(C[k-1][a()])-g(C[k+1][a()]))/2,.35)+","+f(k)+" "+g($[a()]):"S"+xa(f(k),f(k-1),.35)+" "+xa(g($[a()]),g(C[k-1][a()]),.35)+","+f(k)+" "+g($[a()])).join("")),y=N(()=>m()+"L"+f(e.data.length-1)+" "+g(0)+u+"L"+o+" "+g(0)+u);return i(x,{get when(){return e.data.length},get children(){var v=nb(),$=v.firstChild,k=$.firstChild,C=t;return typeof C=="function"?ge(C,v):t=v,d(k,()=>e.heading),d($,i(Or,{setState:l}),null),d(v,i(U_,{get children(){var w=tb(),b=w.firstChild,A=b.nextSibling,S=A.nextSibling;return d(w,i(H,{get each(){return e.data},children:(_,T)=>(()=>{var I=rb(),E=I.firstChild,L=E.nextSibling,R=L.nextSibling,B=R.nextSibling;return d(R,i(x,{get when(){return a()==="minutesWatched"},get fallback(){return ye(_[a()])},get children(){return ye(Math.ceil(_[a()]/60))}})),d(B,()=>_.releaseYear||_.startYear),P(V=>{var X=f(T())-h()/2,j=h(),K=f(T()),ae=g(_[a()]),re=f(T()),Q=`0 ${g(_[a()])-10}px`,J=f(T());return X!==V.e&&G(E,"x",V.e=X),j!==V.t&&G(E,"width",V.t=j),K!==V.a&&G(L,"cx",V.a=K),ae!==V.o&&G(L,"cy",V.o=ae),re!==V.i&&G(R,"x",V.i=re),Q!==V.n&&((V.n=Q)!=null?R.style.setProperty("translate",Q):R.style.removeProperty("translate")),J!==V.s&&G(B,"x",V.s=J),V},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),I})()}),null),P(_=>{var T=f(e.data.length-1)+o,I=g(0)+u,E=y(),L=g(0),R=m();return T!==_.e&&G(w,"width",_.e=T),I!==_.t&&G(w,"height",_.t=I),E!==_.a&&G(b,"d",_.a=E),L!==_.o&&G(A,"y",_.o=L),R!==_.i&&G(S,"d",_.i=R),_},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),w}}),null),v}})}var ab=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"><path data-k-c7f2c6bd fill=currentColor d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z">'),ib=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">'),sb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">'),lb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z">'),ob=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">'),cb=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path data-k-c7f2c6bd fill=currentColor d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">'),db=p('<section data-k-c7f2c6bd class=user-profile-stats-header-section><ul data-k-c7f2c6bd class=user-profile-stats-general-header><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Total </p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Mean score</p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Standard Deviation');function ub(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStats(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Iu,{get stats(){return n().data}})}})}function hb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaStats(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Iu,{get stats(){return n().data}})}})}function Iu(e){const t=ne(),{user:n}=tt();return[(()=>{var r=db(),s=r.firstChild,a=s.firstChild,l=a.firstChild,o=l.nextSibling,c=o.firstChild,u=c.nextSibling;u.firstChild;var h=a.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.nextSibling,v=h.nextSibling,$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=C.nextSibling,b=v.nextSibling,A=b.firstChild,S=A.nextSibling,_=S.firstChild,T=_.nextSibling,I=b.nextSibling,E=I.firstChild,L=E.nextSibling,R=L.firstChild,B=I.nextSibling,V=B.firstChild,X=V.nextSibling,j=X.firstChild;return d(l,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return ab()}}),i(M,{get when(){return t.type==="manga"},get children(){return ib()}})]}})),d(c,()=>ye(n().statistics[t.type].count||0)),d(u,()=>t.type,null),d(f,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return sb()}}),i(M,{get when(){return t.type==="manga"},get children(){return lb()}})]}})),d(m,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return ye(n().statistics.anime.episodesWatched||0)}}),i(M,{get when(){return t.type==="manga"},get children(){return ye(n().statistics.manga.chaptersRead||0)}})]}})),d(y,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Episodes watched"}),i(M,{get when(){return t.type==="manga"},children:"Chapters read"})]}})),d($,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return ob()}}),i(M,{get when(){return t.type==="manga"},get children(){return cb()}})]}})),d(C,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return((n().statistics.anime.minutesWatched||0)/60/24).toFixed(1)}}),i(M,{get when(){return t.type==="manga"},get children(){return n().statistics.manga.volumesRead||0}})]}})),d(w,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Days watched"}),i(M,{get when(){return t.type==="manga"},children:"Volumes read"})]}})),d(_,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var K;return((((K=e.stats.statuses.find(ae=>ae.status==="PLANNING"))==null?void 0:K.minutesWatched)||0)/60/24).toFixed(1)}}),i(M,{get when(){return t.type==="manga"},get children(){var K;return((K=e.stats.statuses.find(ae=>ae.status==="PLANNING"))==null?void 0:K.chaptersRead)||0}})]}})),d(T,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},children:"Days planned"}),i(M,{get when(){return t.type==="manga"},children:"Chapters planned"})]}})),d(R,()=>(n().statistics[t.type].meanScore||0).toFixed(2)),d(j,()=>(n().statistics[t.type].standardDeviation||0).toFixed(1)),r})(),i(q_,{get data(){return e.stats.scores.sort((r,s)=>r.score-s.score)}}),i(Q_,{get data(){return e.stats.lengths.sort((r,s)=>(parseInt(r.length)||1/0)-(parseInt(s.length)||1/0))}}),i(O_,{get formats(){return e.stats.formats},get statuses(){return e.stats.statuses},get countries(){return e.stats.countries}}),i(Fo,{heading:"Release year",get data(){return e.stats.releaseYears.sort((r,s)=>r.releaseYear-s.releaseYear)}}),i(Fo,{heading:"Watch year",get data(){return e.stats.startYears.sort((r,s)=>r.startYear-s.startYear)}})]}var Bo=p("<p data-k-3a6faa9d class=value>"),gb=p("<p data-k-3a6faa9d class=title>Time watched"),fb=p("<p data-k-3a6faa9d class=title>Chapters read"),mb=p("<ol data-k-3a6faa9d class=flex-space-between><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Count</p></li><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Mean score</p></li><li data-k-3a6faa9d>");function pb(e){const t=ne();return(()=>{var n=mb(),r=n.firstChild,s=r.firstChild,a=r.nextSibling,l=a.firstChild,o=a.nextSibling;return d(s,()=>ye(e.genre.count||0)),d(l,()=>e.genre.meanScore||0),d(o,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var c=Bo();return d(c,i(x,{get when(){return Math.floor(e.genre.minutesWatched/60/24)},children:u=>[N(()=>ye(u()))," day",N(()=>Ne(u()))," "]}),null),d(c,i(x,{get when(){return Math.floor(e.genre.minutesWatched/60%24)},children:u=>[N(()=>ye(u()))," hour",N(()=>Ne(u()))," "]}),null),d(c,i(x,{get when(){return e.genre.minutesWatched<60},get children(){return[N(()=>e.genre.minutesWatched)," minute",N(()=>Ne(e.genre.minutesWatched))]}}),null),c})(),gb()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var c=Bo();return d(c,()=>ye(e.genre.chaptersRead)),c})(),fb()]}})]}})),n})()}var vb=p("<div data-k-ac00d55b class=inline-container><ol data-k-ac00d55b class=grid-reel-auto-fill>"),$b=p('<img data-k-ac00d55b class=cover-image alt="Media cover">'),_b=p("<li data-k-ac00d55b>"),bb=p("<div data-k-ac00d55b class=cover-image>");function yb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return W(le(()=>e.mediaIds,()=>{c=!0})),W(le(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=vb(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(h,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=_b();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(x,{get when(){return e.store[f]},get fallback(){return bb()},get children(){var m=$b();return P(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var wb=p("<ol data-k-28186292 class=grid-column-auto-fill>"),kb=p("<li data-k-28186292 class=item><div data-k-28186292 class=header><div data-k-28186292 class=flex-space-between><h2 data-k-28186292></h2><p data-k-28186292 class=ranking>#</p></div></div><div data-k-28186292 class=wrapper><div data-k-28186292 class=flex-space-between><p data-k-28186292>User ");function Sb(e){const t=ne(),{user:n}=tt();return(()=>{var r=wb();return d(r,i(H,{get each(){return e.genres.sort((s,a)=>a[e.state()]-s[e.state()]||s.genre.localeCompare(a.genre))},children:(s,a)=>(()=>{var l=kb(),o=l.firstChild,c=o.firstChild,u=c.firstChild,h=u.nextSibling;h.firstChild;var f=o.nextSibling,g=f.firstChild,m=g.firstChild;return m.firstChild,d(u,i(U,{get href(){return"/search/"+t.type+"?onList=false&genre="+s.genre},get children(){return s.genre}})),d(h,()=>a()+1,null),d(o,i(pb,{genre:s}),null),d(m,()=>t.type,null),d(g,i(U,{get href(){return"/user/"+n().name+"/"+t.type+"?genre="+s.genre},children:"Show all"}),null),d(f,i(yb,{get store(){return e.store},get setStore(){return e.setStore},get mediaIds(){return s.mediaIds},get allMediaIds(){return e.mediaIds()},get mutate(){return e.mutate}}),null),l})()})),r})()}var Cb=p("<section data-k-c1e76fe3 class=user-profile-stats-genres><div data-k-c1e76fe3 class=flex-space-between><h2 data-k-c1e76fe3>Genres");function Ab(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeGenres(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Eu,{get genres(){return n().data}})}})}function Tb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaGenres(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Eu,{get genres(){return n().data}})}})}function Eu(e){const{accessToken:t}=ce(),[n,r]=O(new Set),[s,a]=O("count"),o=Me(tn,t,()=>({id_in:[...n()]})),[c,{mutate:u}]=nt(o),[h,f]=We({});return W(le(()=>e.genres,g=>{r(m=>{const y=new Set(g.map(v=>v.mediaIds.slice(0,6)).flat());return y.difference(m).size?y:m})})),W(le(c,g=>{g==null||g.data.forEach(m=>f(m.id,m))})),(()=>{var g=Cb(),m=g.firstChild;return m.firstChild,d(m,i(Or,{setState:a}),null),d(g,i(Sb,{get genres(){return e.genres},state:s,store:h,setStore:f,mediaIds:n,mutate:u}),null),g})()}var xb=p("<section data-k-c5aa48c0 class=user-profile-stats-genres><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0>Tags</h2></div><ol data-k-c5aa48c0 class=grid-column-auto-fill>"),Uo=p("<p data-k-c5aa48c0 class=value>"),Ib=p("<p data-k-c5aa48c0 class=title>Time watched"),Eb=p("<p data-k-c5aa48c0 class=title>Chapters read"),Lb=p('<li data-k-c5aa48c0 class=item><div data-k-c5aa48c0 class=header><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0></h2><p data-k-c5aa48c0 class=ranking>#</p></div><ol data-k-c5aa48c0 class=flex-space-between><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Count</p></li><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Mean score</p></li><li data-k-c5aa48c0></li></ol></div><div data-k-c5aa48c0 class="wrapper tags"><div data-k-c5aa48c0 class=flex-space-between><p data-k-c5aa48c0>User '),Pb=p("<div data-k-c5aa48c0 class=inline-container><ol data-k-c5aa48c0 class=grid-reel-auto-fill>"),Mb=p('<img data-k-c5aa48c0 class=cover-image alt="Media cover">'),Db=p("<li data-k-c5aa48c0>"),Rb=p("<div data-k-c5aa48c0 class=cover-image> ");function Nb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeTags(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Lu,{get genres(){return n().data}})}})}function Ob(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaTags(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Lu,{get genres(){return n().data}})}})}function Lu(e){const t=ne(),{user:n}=tt(),{accessToken:r}=ce(),[s,a]=O(new Set),[l,o]=O("count"),c=Me(tn,r,()=>({id_in:[...s()]})),[u,{mutate:h}]=nt(c),[f,g]=We({});return W(le(()=>e.genres,m=>{a(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(le(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=xb(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:o}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[l()]-$[l()]||$.tag.name.localeCompare(k.tag.name))},children:($,k)=>(()=>{var C=Lb(),w=C.firstChild,b=w.firstChild,A=b.firstChild,S=A.nextSibling;S.firstChild;var _=b.nextSibling,T=_.firstChild,I=T.firstChild,E=T.nextSibling,L=E.firstChild,R=E.nextSibling,B=w.nextSibling,V=B.firstChild,X=V.firstChild;return X.firstChild,d(A,i(U,{get href(){return"/search/"+t.type+"?onList=false&tag="+$.tag.name},get children(){return $.tag.name}})),d(S,()=>k()+1,null),d(I,()=>ye($.count||0)),d(L,()=>$.meanScore||0),d(R,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var j=Uo();return d(j,i(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(j,i(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(j,i(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),j})(),Ib()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var j=Uo();return d(j,()=>ye($.chaptersRead)),j})(),Eb()]}})]}})),d(X,()=>t.type,null),d(V,i(U,{get href(){return"/user/"+n().name+"/"+t.type+"?tag="+$.tag.name},children:"Show all"}),null),d(B,i(Fb,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return s()},mutate:h}),null),C})()})),m})()}function Fb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),a=Me(tn,n,()=>({id_in:[...r()]})),[l]=nt(a);let o=!1;return W(le(()=>e.mediaIds,()=>{o=!0})),W(le(l,c=>{c==null||c.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var c=Pb(),u=c.firstChild;return u.addEventListener("scroll",()=>{if(!o)return;o=!1;const f=new Set(e.mediaIds).difference(e.allMediaIds);f.forEach(g=>e.allMediaIds.add(g)),s(f)}),d(u,i(H,{get each(){return e.mediaIds},children:h=>(()=>{var f=Db();return d(f,i(U,{get href(){var g;return"/ani/"+t.type+"/"+h+"/"+Xe(((g=e.store[h])==null?void 0:g.title.userPreferred)||"")},get children(){return i(x,{get when(){return e.store[h]},get fallback(){return Rb()},get children(){var g=Mb();return P(()=>G(g,"src",e.store[h].coverImage.large)),g}})}})),f})()})),c})()}var Bb=p("<section data-k-306b0b72 class=user-profile-stats-genres><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72>Studios</h2></div><ol data-k-306b0b72 class=grid-column-auto-fill>"),Vo=p("<p data-k-306b0b72 class=value>"),Ub=p("<p data-k-306b0b72 class=title>Time watched"),Vb=p("<p data-k-306b0b72 class=title>Chapters read"),Gb=p('<li data-k-306b0b72 class=item><div data-k-306b0b72 class=header><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72></h2><p data-k-306b0b72 class=ranking>#</p></div><ol data-k-306b0b72 class=flex-space-between><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Count</p></li><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Mean score</p></li><li data-k-306b0b72></li></ol></div><div data-k-306b0b72 class="wrapper tags">'),Hb=p("<div data-k-306b0b72 class=inline-container><ol data-k-306b0b72 class=grid-reel-auto-fill>"),jb=p('<img data-k-306b0b72 class=cover-image alt="Media cover">'),Yb=p("<li data-k-306b0b72>"),qb=p("<div data-k-306b0b72 class=cover-image> ");function zb(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStudios(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Wb,{get genres(){return n().data}})}})}function Wb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=nt(c),[f,g]=We({});return W(le(()=>e.genres,m=>{s(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(le(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=Bb(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:l}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[a()]-$[a()]||$.studio.name.localeCompare(k.studio.name))},children:($,k)=>(()=>{var C=Gb(),w=C.firstChild,b=w.firstChild,A=b.firstChild,S=A.nextSibling;S.firstChild;var _=b.nextSibling,T=_.firstChild,I=T.firstChild,E=T.nextSibling,L=E.firstChild,R=E.nextSibling,B=w.nextSibling;return d(A,i(U,{get href(){return"/ani/studio/"+$.studio.id+"/"+Xe($.studio.name)},get children(){return $.studio.name}})),d(S,()=>k()+1,null),d(I,()=>ye($.count||0)),d(L,()=>$.meanScore||0),d(R,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var V=Vo();return d(V,i(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:X=>[N(()=>ye(X()))," day",N(()=>Ne(X()))," "]}),null),d(V,i(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:X=>[N(()=>ye(X()))," hour",N(()=>Ne(X()))," "]}),null),d(V,i(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),V})(),Ub()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var V=Vo();return d(V,()=>ye($.chaptersRead)),V})(),Vb()]}})]}})),d(B,i(Kb,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:h})),C})()})),m})()}function Kb(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return W(le(()=>e.mediaIds,()=>{c=!0})),W(le(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=Hb(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(h,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=Yb();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(x,{get when(){return e.store[f]},get fallback(){return qb()},get children(){var m=jb();return P(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var Jb=p("<button data-k-8711eb31>Time Watched"),Xb=p("<button data-k-8711eb31>Chapters Read"),Zb=p('<section data-k-8711eb31 class=user-profile-stats-genres><div data-k-8711eb31 class=flex-space-between><h2 data-k-8711eb31>Voice actors</h2><div data-k-8711eb31><button data-k-8711eb31>Anime</button><button data-k-8711eb31>Characters</button></div><div data-k-8711eb31><button data-k-8711eb31>Count</button><button data-k-8711eb31>Mean Score</button></div></div><ol data-k-8711eb31 class="grid-column-auto-fill staff">'),Go=p("<p data-k-8711eb31 class=value>"),Qb=p("<p data-k-8711eb31 class=title>Time watched"),ey=p("<p data-k-8711eb31 class=title>Chapters read"),ty=p('<li data-k-8711eb31 class=item><div data-k-8711eb31 class="flex-space-between staff-name-wrapper"><h2 data-k-8711eb31></h2><p data-k-8711eb31 class=ranking>#</p></div><div data-k-8711eb31 class=inline-container><div data-k-8711eb31 class=main-content><img data-k-8711eb31 class=staff-cover alt="Staff profile cover"><ol data-k-8711eb31 class="flex-space-between stats"><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Count</p></li><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Mean score</p></li><li data-k-8711eb31></li></ol><div data-k-8711eb31 class=wrapper>'),ny=p("<div data-k-8711eb31 class=inline-container><ol data-k-8711eb31 class=grid-reel-auto-fill>"),ry=p('<img data-k-8711eb31 class=cover-image alt="Media cover">'),Ho=p("<li data-k-8711eb31>"),jo=p("<div data-k-8711eb31 class=cover-image> "),ay=p('<img data-k-8711eb31 class=cover-image alt="Character cover">');function iy(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeVoiceActors(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(sy,{get genres(){return n().data}})}})}function sy(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O(new Set),[o,c]=O("count"),[u,h]=O("media"),g=Me(tn,n,()=>u()==="media"?{id_in:[...r()]}:void 0),[m]=nt(g),[y]=ue.anilist.characterIds(()=>a().size>0&&u()==="characters"?[...a()]:void 0,n),[v,$]=We({}),[k,C]=We({});return W(le(()=>e.genres,w=>{s(b=>{const A=new Set(w.map(S=>S.mediaIds.slice(0,6)).flat());return A.difference(b).size?A:b}),l(new Set(w.map(b=>b.characterIds.slice(0,6)).flat()))})),W(le(m,w=>{w==null||w.data.forEach(b=>$(b.id,b))})),W(le(y,w=>{w==null||w.data.forEach(b=>C(b.id,b))})),(()=>{var w=Zb(),b=w.firstChild,A=b.firstChild,S=A.nextSibling,_=S.firstChild,T=_.nextSibling,I=S.nextSibling,E=I.firstChild,L=E.nextSibling,R=b.nextSibling;return _.$$click=()=>h("media"),T.$$click=()=>h("characters"),E.$$click=()=>c("count"),d(I,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){var B=Jb();return B.$$click=()=>c("minutesWatched"),B}}),i(M,{get when(){return t.type==="manga"},get children(){var B=Xb();return B.$$click=()=>c("chaptersRead"),B}})]}}),L),L.$$click=()=>c("meanScore"),d(R,i(H,{get each(){return e.genres.sort((B,V)=>V[o()]-B[o()]||B.voiceActor.name.userPreferred.localeCompare(V.voiceActor.name.userPreferred))},children:(B,V)=>(()=>{var X=ty(),j=X.firstChild,K=j.firstChild,ae=K.nextSibling;ae.firstChild;var re=j.nextSibling,Q=re.firstChild,J=Q.firstChild,pe=J.nextSibling,ve=pe.firstChild,fe=ve.firstChild,ee=ve.nextSibling,q=ee.firstChild,He=ee.nextSibling,De=pe.nextSibling;return d(K,i(U,{get href(){return"/ani/staff/"+B.voiceActor.id+"/"+Xe(B.voiceActor.name.userPreferred)},get children(){return B.voiceActor.name.userPreferred}})),d(ae,()=>V()+1,null),d(fe,()=>ye(B.count||0)),d(q,()=>B.meanScore||0),d(He,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Be=Go();return d(Be,i(x,{get when(){return Math.floor(B.minutesWatched/60/24)},children:et=>[N(()=>ye(et()))," day",N(()=>Ne(et()))," "]}),null),d(Be,i(x,{get when(){return Math.floor(B.minutesWatched/60%24)},children:et=>[N(()=>ye(et()))," hour",N(()=>Ne(et()))," "]}),null),d(Be,i(x,{get when(){return B.minutesWatched<60},get children(){return[N(()=>B.minutesWatched)," minute",N(()=>Ne(B.minutesWatched))]}}),null),Be})(),Qb()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Be=Go();return d(Be,()=>ye(B.chaptersRead)),Be})(),ey()]}})]}})),d(De,i(ly,{mediaStore:v,setMediaStore:$,characterStore:k,setCharacterStore:C,get pageType(){return u()},get mediaIds(){return B.mediaIds},get allMediaIds(){return r()},get characterIds(){return B.characterIds},get allCharacterIds(){return a()}})),P(()=>G(J,"src",B.voiceActor.image.large)),X})()})),w})()}function ly(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O(new Set),c=Me(tn,n,()=>({id_in:[...r()]})),[u]=nt(c),[h]=ue.anilist.characterIds(()=>a().size>0?[...a()]:void 0,n);let f,g=!1;W(()=>{e.mediaIds,e.characterIds,g=!0});let m=!1;return W(()=>{e.pageType,m=!0,g=!0,f.scrollLeft=0}),W(le(u,y=>{y==null||y.data.forEach(v=>e.setMediaStore(v.id,v))})),W(le(h,y=>{y==null||y.data.forEach(v=>e.setCharacterStore(v.id,v))})),(()=>{var y=ny(),v=y.firstChild;v.addEventListener("scroll",()=>{if(g){if(m){m=!1;return}if(g=!1,e.pageType==="media"){const C=new Set(e.mediaIds).difference(e.allMediaIds);C.forEach(w=>e.allMediaIds.add(w)),s(C)}else{const C=new Set(e.characterIds).difference(e.allCharacterIds);C.forEach(w=>e.allCharacterIds.add(w)),l(C)}}});var $=f;return typeof $=="function"?ge($,v):f=v,d(v,i(z,{get children(){return[i(M,{get when(){return e.pageType==="media"},get children(){return i(H,{get each(){return e.mediaIds},children:k=>(()=>{var C=Ho();return d(C,i(U,{get href(){var w;return"/ani/"+t.type+"/"+k+"/"+Xe(((w=e.mediaStore[k])==null?void 0:w.title.userPreferred)||"")},get children(){return i(x,{get when(){return e.mediaStore[k]},get fallback(){return jo()},get children(){var w=ry();return P(()=>G(w,"src",e.mediaStore[k].coverImage.large)),w}})}})),C})()})}}),i(M,{get when(){return e.pageType==="characters"},get children(){return i(H,{get each(){return e.characterIds},children:k=>(()=>{var C=Ho();return d(C,i(U,{get href(){var w;return"/ani/character/"+k+"/"+Xe(((w=e.characterStore[k])==null?void 0:w.name.userPreferred)||"")},get children(){return i(x,{get when(){return e.characterStore[k]},get fallback(){return jo()},get children(){var w=ay();return P(()=>G(w,"src",e.characterStore[k].image.large)),w}})}})),C})()})}})]}})),y})()}$e(["click"]);var oy=p('<section data-k-63df6417 class=user-profile-stats-genres><div data-k-63df6417 class=flex-space-between><h2 data-k-63df6417>Staff</h2></div><ol data-k-63df6417 class="grid-column-auto-fill staff">'),Yo=p("<p data-k-63df6417 class=value>"),cy=p("<p data-k-63df6417 class=title>Time watched"),dy=p("<p data-k-63df6417 class=title>Chapters read"),uy=p('<li data-k-63df6417 class=item><div data-k-63df6417 class="flex-space-between staff-name-wrapper"><h2 data-k-63df6417></h2><p data-k-63df6417 class=ranking>#</p></div><div data-k-63df6417 class=inline-container><div data-k-63df6417 class=main-content><img data-k-63df6417 class=staff-cover alt="Staff profile cover"><ol data-k-63df6417 class="flex-space-between stats"><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Count</p></li><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Mean score</p></li><li data-k-63df6417></li></ol><div data-k-63df6417 class=wrapper>'),hy=p("<div data-k-63df6417 class=inline-container><ol data-k-63df6417 class=grid-reel-auto-fill>"),gy=p('<img data-k-63df6417 class=cover-image alt="Media cover">'),fy=p("<li data-k-63df6417>"),my=p("<div data-k-63df6417 class=cover-image> ");function py(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userAnimeStaff(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Pu,{get genres(){return n().data}})}})}function vy(){const e=ne(),{accessToken:t}=ce(),[n]=ue.anilist.userMangaStaff(()=>e.name,t);return i(x,{get when(){return n()},get children(){return i(Pu,{get genres(){return n().data}})}})}function Pu(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),[a,l]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=nt(c),[f,g]=We({});return W(le(()=>e.genres,m=>{s(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(le(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=oy(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,i(Or,{setState:l}),null),d(v,i(H,{get each(){return e.genres.sort(($,k)=>k[a()]-$[a()]||$.staff.name.userPreferred.localeCompare(k.staff.name.userPreferred))},children:($,k)=>(()=>{var C=uy(),w=C.firstChild,b=w.firstChild,A=b.nextSibling;A.firstChild;var S=w.nextSibling,_=S.firstChild,T=_.firstChild,I=T.nextSibling,E=I.firstChild,L=E.firstChild,R=E.nextSibling,B=R.firstChild,V=R.nextSibling,X=I.nextSibling;return d(b,i(U,{get href(){return"/ani/staff/"+$.staff.id+"/"+Xe($.staff.name.userPreferred)},get children(){return $.staff.name.userPreferred}})),d(A,()=>k()+1,null),d(L,()=>ye($.count||0)),d(B,()=>$.meanScore||0),d(V,i(z,{get children(){return[i(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var j=Yo();return d(j,i(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(j,i(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(j,i(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),j})(),cy()]}}),i(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var j=Yo();return d(j,()=>ye($.chaptersRead)),j})(),dy()]}})]}})),d(X,i($y,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:h})),P(()=>G(T,"src",$.staff.image.large)),C})()})),m})()}function $y(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(new Set),l=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(l);let c=!1;return W(le(()=>e.mediaIds,()=>{c=!0})),W(le(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=hy(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),s(g)}),d(h,i(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=fy();return d(g,i(U,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Xe(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return i(x,{get when(){return e.store[f]},get fallback(){return my()},get children(){var m=gy();return P(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}const _y="_theme-container_4h5lo_1",by="_header_4h5lo_5",yy="_details_4h5lo_11",wy="_play-button-container_4h5lo_16",ky="_play-button_4h5lo_16",Sy="_spoiler_4h5lo_31",ur={themeContainer:_y,header:by,details:yy,playButtonContainer:wy,playButton:ky,spoiler:Sy};var Cy=p("<video src controls autoplay>"),Ay=p("<div><h2>Themes"),Ty=p("<p>"),xy=p("<div><div><p>"),Iy=p("<p>Spoilers"),Ey=p("<div><p>v</p><p>Ep: </p><div>"),Ly=p("<div><button>play</button><span></span><span></span><span>");function Py(){const e=ne(),[t]=xe(),{anilistData:n}=vn(),r=Cy(),s=Me(Pf,()=>({id:e.id,api:t.isMalId!=null?Za:e.api,type:e.type})),[a]=nt(s);return W(()=>{e.id,e.api,e.type,r.src=""}),i(ct,{fallback:"AnimeThemes error",get children(){return i(x,{get when(){var l,o;return N(()=>!!a())()&&((o=(l=n())==null?void 0:l.data)==null?void 0:o.type)===Ng},get children(){var l=Ay();return l.firstChild,d(l,i(H,{get each(){return a().data},children:o=>i(Mu,{theme:o,video:r})}),null),d(l,r,null),l}})}})}function Mu(e){F(e.video,"Missing video element for playback"),F(e.theme,"Theme data is missing");let t=!1;return i(ct,{fallback:"AnimeThemes row error",get children(){var n=xy(),r=n.firstChild,s=r.firstChild;return d(s,()=>e.theme.slug),d(r,i(x,{get when(){return e.theme.song},get children(){var a=Ty();return d(a,()=>e.theme.song.title,null),d(a,i(z,{get children(){return[i(M,{get when(){return e.mainArtist},get children(){return i(x,{get when(){var l;return((l=e.theme.song.artists)==null?void 0:l.length)>1},children:" feat "})}}),i(M,{get when(){var l;return(l=e.theme.song.artists)==null?void 0:l.length},children:" by "})]}}),null),d(a,i(H,{get each(){return e.theme.song.artists},children:l=>i(x,{get when(){return!e.mainArtist||l.slug!==e.mainArtist},get children(){return[i(x,{when:t,fallback:t=!0,children:" & "}),i(U,{get href(){return"/artist/"+l.slug},get children(){return l.name}})]}})}),null),a}}),null),d(n,i(H,{get each(){return e.theme.animethemeentries},children:a=>(()=>{var l=Ey(),o=l.firstChild;o.firstChild;var c=o.nextSibling;c.firstChild;var u=c.nextSibling;return d(o,()=>a.version||1,null),d(c,()=>a.episodes||"-",null),d(l,i(x,{get when(){return a.spoiler},get children(){var h=Iy();return P(()=>h.className=ur.spoiler),h}}),u),d(u,i(H,{get each(){return a.videos},children:h=>(()=>{var f=Ly(),g=f.firstChild,m=g.nextSibling,y=m.nextSibling,v=y.nextSibling;return g.$$click=()=>e.video.src=h.link,d(m,()=>h.resolution),d(y,()=>h.source),d(v,()=>h.nc&&"NC"),P(()=>f.className=ur.playButton),f})()})),P(h=>{var f=ur.details,g=ur.playButtonContainer;return f!==h.e&&(l.className=h.e=f),g!==h.t&&(u.className=h.t=g),h},{e:void 0,t:void 0}),l})()}),null),P(a=>{var l=ur.themeContainer,o=ur.header;return l!==a.e&&(n.className=a.e=l),o!==a.t&&(r.className=a.t=o),a},{e:void 0,t:void 0}),n}})}$e(["click"]);const My="_themes_1brzn_1",qo={themes:My};var Dy=p("<video src controls autoplay>"),Ry=p("<h1>Artist"),Ny=p("<p>"),Oy=p("<img alt=Artist>"),zo=p("<div>"),Fy=p('<img src=https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg alt="Artist missing">');function By(){const e=ne(),[t]=ue.animeThemes.artisBySlug(()=>e.name),n=Dy();return document.title="Artist - LOB",[Ry(),i(x,{get when(){return t()},get children(){return[(()=>{var r=Ny();return d(r,()=>t().data.artist.name),r})(),i(x,{get when(){return t().data.artist.images.length},get fallback(){return Fy()},get children(){var r=Oy();return P(()=>G(r,"src",t().data.artist.images[0].link)),r}}),(()=>{var r=zo();return d(r,i(H,{get each(){return t().data.artist.songs},children:s=>(()=>{var a=zo();return d(a,i(H,{get each(){return s.animethemes},children:l=>i(Mu,{theme:l,video:n,get mainArtist(){return e.name}})})),P(()=>Bt(a,qo.episode)),a})()})),P(()=>Bt(r,qo.themes)),r})(),n]}})]}var Uy=p("<div class=notification-page><ol class=flex-space-between><li><button>All</button></li><li><button>Airing</button></li><li><button>Activity</button></li><li><button>Forum</button></li><li><button>Follows</button></li><li><button>Media"),Vy=p("<button>debug: "),Gy=p("<ol class=notifications-container>"),Hy=p("<button>Refresh"),Ba=p('<img alt="Media cover">'),rs=p("<div class=content><p>"),jy=p("<div class=content>"),Yy=p("<li>");function qy(){const[e,t]=O("all");return document.title="Notifications - LOB",(()=>{var n=Uy(),r=n.firstChild,s=r.firstChild,a=s.firstChild,l=s.nextSibling,o=l.firstChild,c=l.nextSibling,u=c.firstChild,h=c.nextSibling,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=g.nextSibling,v=y.firstChild;return a.$$click=()=>t("all"),o.$$click=()=>t("airing"),u.$$click=()=>t("activity"),f.$$click=()=>t("forum"),m.$$click=()=>t("follows"),v.$$click=()=>t("media"),d(n,i(zy,{type:e}),null),n})()}function zy(e){const{accessToken:t}=ce(),n=Me(xf,t,e.type),[r,{mutateBoth:s}]=nt(n),a=c=>{var u,h;(h=(u=c==null?void 0:c.data)==null?void 0:u.notifications)!=null&&h.length&&s(f=>{var A,S,_;if(!((A=f==null?void 0:f.data)!=null&&A.length))return f.data=[c.data.notifications],f;const g=c.data.notifications.at(-1).id,m=yr(f.data[0],T=>T.id-g),y=((S=f.data[0][m])==null?void 0:S.id)===g;if(c.data.pageInfo.currentPage===1)return y?(f.data[0].splice(0,m+1,...c.data.notifications),f):(f.data.unshift(c.data.notifications),f.data.length=Math.min(f.data.length,5),f);const v=c.data.notifications[0].id,$=yr(f.data[0],T=>T.id-v);if($===0&&f.data[0][$].id!==v||(f.data[0].splice($,m-$+y,...c.data.notifications),y||f.data.length===1))return f;const C=yr(f.data[1],T=>T.id-g);if(((_=f.data[1][C])==null?void 0:_.id)!==g)return f;const[b]=f.data.splice(1,1);return b.splice(0,C+1),f.data[0].push(...b),f})},[l,o]=il();return i(x,{get when(){return!r.loading},get children(){return[i(x,{get when(){return Tn},get children(){var c=Vy();return c.firstChild,c.$$click=()=>o(u=>!u),d(c,()=>""+l(),null),c}}),i(Wy,Fe({get cache(){var c,u;return((u=(c=r())==null?void 0:c.data)==null?void 0:u[0])||[]},updateCache:a,isDebug:l},e))]}})}function Wy(e){const{accessToken:t}=ce(),[n,r]=O(e.cache.length?void 0:1),s=Me(ud,t,e.type,n),[a]=rl(e.isDebug,s);let l=0;const[o,c]=O(!1),[u,h]=O(!0),f=id(h),g=new Set,m=tr(mn,b=>!a.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var S,_;const b=Ae(o),A=Ae(u);if(k.has((S=e.cache.at(-1))==null?void 0:S.id)&&b)return Math.max(Math.floor(e.cache.length/15)+1,l+1);if(k.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const T=[...k.difference(g)].sort((L,R)=>R-L);if(!T.length)return;const I=ga(T,.5),E=nd(e.cache,L=>L.id-I);return E==-1?void 0:Math.ceil((E+1)/15)}}let $=0;W(le(a,b=>{var T,I,E,L,R;if(!((T=b==null?void 0:b.data)!=null&&T.notifications.length))return;b.data.notifications.forEach(B=>{g.add(B.id)});const A=((I=b.data.notifications[0])==null?void 0:I.createdAt)||0,S=((E=ga(b.data.notifications,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-S)*1e3,15e3));l=Math.max(l,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f(_,!0),l=1):b.data.pageInfo.currentPage>e.cache.length/15&&(((L=b.data.notifications.at(-1))==null?void 0:L.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(h(!0),c(!1),l=0,$=0)),e.updateCache(b),y()}));const k=new Set,C=b=>{for(const A of b){const S=parseInt(A.target.dataset.id);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[i(x,{get when(){return N(()=>!!a.loading)()&&n()===1},get children(){return i(Xn,{class:"refresh",get children(){return i(xt,{tipPosition:"bottom",get children(){return i(x,{get when(){return e.cache.length===0},fallback:"Fetching fresh notifications",children:"Loading notifications"})}})}})}}),(()=>{var b=Gy();return d(b,i(H,{get each(){return e.cache},children:A=>{let S;return Pn(()=>w.observe(S)),(()=>{var _=Yy(),T=S;return typeof T=="function"?ge(T,_):S=_,d(_,i(z,{get fallback(){return'Notification type "'+A.type+'" not supported.'},get children(){return[i(M,{get when(){return A.type==="RELATED_MEDIA_ADDITION"},get children(){return[i(U,{get href(){return Ge(A.media)},get children(){var I=Ba();return P(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=rs(),E=I.firstChild;return d(E,i(U,{get href(){return Ge(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.context,null),d(I,i(qn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="AIRING"},get children(){return[i(U,{get href(){return Ge(A.media)},get children(){var I=Ba();return P(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=rs(),E=I.firstChild;return d(E,()=>A.contexts[0],null),d(E,()=>A.episode,null),d(E,()=>A.contexts[1],null),d(E,i(U,{get href(){return Ge(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.contexts[2],null),d(I,i(qn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="ACTIVITY_REPLY_LIKE"||A.type==="ACTIVITY_LIKE"||A.type==="ACTIVITY_REPLY"},get children(){return[i(U,{get href(){return"/user/"+A.user.name},get children(){var I=Ba();return P(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=jy();return d(I,i(U,{get href(){return"/activity/"+A.activityId},get children(){return[N(()=>A.user.name),N(()=>A.context)]}}),null),d(I,i(qn,{get createdAt(){return A.createdAt}}),null),I})()]}}),i(M,{get when(){return A.type==="FOLLOWING"},get children(){return[i(U,{get href(){return"/user/"+A.user.name},get children(){var I=Ba();return P(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=rs(),E=I.firstChild;return d(E,i(U,{get href(){return"/user/"+A.user.name},get children(){return A.user.name}}),null),d(E,()=>A.context,null),d(I,i(qn,{get createdAt(){return A.createdAt}}),null),I})()]}})]}})),P(()=>G(_,"data-id",A.id)),_})()}})),P(()=>b.classList.toggle("loading",!!(a.loading&&n()===1))),b})(),i(z,{get children(){return[i(M,{get when(){return a.loading&&n()>l&&e.cache.length},get children(){return i(Xn,{class:"new",get children(){return i(xt,{tipPosition:"bottom",children:"Loading notifications"})}})}}),i(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh notification feed to load more",(()=>{var b=Hy();return b.$$click=()=>r(1),b})()]}})]}})]}$e(["click"]);var Du=p("<ol class=grid-column-auto-fill>"),Ky=p("<div class=entities-page>"),Jy=p("<button>debug: "),Xy=p("<select name=roles id=roles>"),Zy=p("<option>"),Qy=p("<img class=entity-image alt=Character>"),Ru=p("<div class=content><p class=line-clamp></p><p>"),e0=p('<p class="line-clamp small">'),t0=p("<span class=role-notes>(<!>)"),n0=p("<div class=content><p class=voice-actor-language>"),r0=p('<img class=entity-image alt="Voice actor">'),Nu=p("<li class=entities-page-entity>"),a0=p("<p class=line-clamp>"),i0=p("<img class=entity-image alt=Staff>"),s0=p('<li class="entities-page-entity loading"><div class=entity-left><div class=entity-image></div><div class=content><p class=line-clamp></p></div></div><div class=entity-right><div class=content><p class=line-clamp></p></div><div class=entity-image>');function l0(){const[e,t]=O(),[n]=ue.myAnimeList.animeCharactersById(e);return i(Ci,{type:"CHARACTER",setIdMal:t,malData:n})}function o0(){const[e,t]=O(),[n]=ue.myAnimeList.mangaCharactersById(e);return i(Ci,{type:"CHARACTER",setIdMal:t,malData:n})}function c0(){const[e,t]=O(),[n]=ue.myAnimeList.animeStaffById(e);return i(Ci,{type:"STAFF",setIdMal:t,malData:n})}function d0(){const[,e]=O();return i(Ci,{type:"STAFF",setIdMal:e})}function Ci(e){const t=ne();return(()=>{var n=Ky();return d(n,i(z,{get children(){return[i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(u0,{})}}),i(M,{get when(){return e.type==="STAFF"},get children(){var r=Du();return d(r,i(Ou,{get id(){return t.id},page:1,get setIdMal(){return e.setIdMal}})),r}})]}})),n})()}function as(e,t,n,r){for(let s=e;s<=t;s++)n[r[s].id]=s;return n}function u0(e){const t=ne(),{accessToken:n}=ce(),r=Me(If,n,()=>t.id),[s,{mutateBoth:a}]=nt(r),l=(u,h)=>{var f,g;(g=(f=u==null?void 0:u.data)==null?void 0:f.characters.edges)!=null&&g.length&&a(m=>{var y,v;if(!((v=(y=m==null?void 0:m.data)==null?void 0:y.items)!=null&&v.length))return m.data={items:u.data.characters.edges,indices:as(0,u.data.characters.edges.length-1,{},u.data.characters.edges),roles:h},m;for(let $=0;$<u.data.characters.edges.length;$++){const k=u.data.characters.edges[$],C=$+(u.data.characters.pageInfo.currentPage-1)*u.data.characters.pageInfo.perPage,w=m.data.indices[k.id];if(k.id in m.data.indices){if(w<C)for(let b=w;b<C;b++)m.data.items[b]=m.data.items[b+1];else if(w>C)for(let b=C;b>w;b--)m.data.items[b]=m.data.items[b-1];m.data.items[C]=k,as(Math.min(C,w),Math.max(C,w),m.data.indices,m.data.items)}else m.data.items.splice(C,0,k),as(C,m.data.items.length-1,m.data.indices,m.data.items)}return m.data.roles=h,m})},[o,c]=il();return i(x,{get when(){return!s.loading},get children(){return[i(x,{get when(){return Tn},get children(){var u=Jy();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),i(h0,Fe({get cache(){var u,h;return((h=(u=s())==null?void 0:u.data)==null?void 0:h.items)||[]},get roles(){var u,h;return((h=(u=s())==null?void 0:u.data)==null?void 0:h.roles)||[]},updateCache:l,isDebug:o},e))]}})}function h0(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(e.cache.length?void 0:1),a=Me(hd,n,()=>t.id,r),[l]=rl(e.isDebug,a),o=N(b=>{var A,S;return b&&((S=(A=l())==null?void 0:A.data)==null?void 0:S.characters.pageInfo.hasNextPage)!==!1},!0),[c,u]=O({language:"Japanese",dubGroup:null}),h=N(()=>{var b,A;return((A=(b=l())==null?void 0:b.data)==null?void 0:A.countryOfOrigin)||"JP"}),f=N(()=>{var A,S,_;if(((_=(S=(A=l())==null?void 0:A.data)==null?void 0:S.characters)==null?void 0:_.pageInfo.currentPage)!==1)return e.roles;const b=new Map;for(const T of l().data.characters.edges)for(const I of T.voiceActorRoles){const E=I.voiceActor.language+I.dubGroup;b.has(E)===!1&&b.set(E,{language:I.voiceActor.language,dubGroup:I.dubGroup})}return[...b.values()]});P(()=>{if(f().length){const b=Xs(h()),A=f().findIndex(_=>_.language===b),S=A!==-1?A:f().findIndex(_=>_.language==="Japanese");u(f()[S===-1?0:S])}});const g=new Set,m=tr(mn,b=>!l.loading&&s(b),1e3);function y(){const b=$();b&&m(b)}const v=25;function $(){const b=Ae(o),A=Math.ceil(e.cache.length/v);if(k.has(A)&&!g.has(A))return A;if(k.has(A)&&b&&g.has(A))return A+1;{const S=[...k.difference(g)].sort((_,T)=>T-_);return S.length?ga(S,.5):void 0}}W(le(l,b=>{var A;(A=b==null?void 0:b.data)!=null&&A.characters.edges.length&&(F(v===b.data.characters.pageInfo.perPage,"Page count is wrong"),g.add(b.data.characters.pageInfo.currentPage),e.updateCache(b,f()),y())}));const k=new Set,C=b=>{for(const A of b){const S=parseInt(A.target.dataset.page);F(Number.isInteger(S)),A.isIntersecting?k.add(S):k.delete(S)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[i(x,{get when(){return f().length},get children(){var b=Xy();return b.addEventListener("change",A=>u(f()[A.target.value])),d(b,i(H,{get each(){return f()},children:(A,S)=>(()=>{var _=Zy();return d(_,()=>A.language,null),d(_,i(x,{get when(){return A.dubGroup},get children(){return[" (",N(()=>A.dubGroup),")"]}}),null),P(()=>_.value=S()),_})()})),P(()=>b.value=f().findIndex(A=>A===c())),b}}),(()=>{var b=Du();return d(b,i(H,{get each(){return e.cache},children:(A,S)=>i(x,{get when(){return A.voiceActorRoles.filter(_=>_.voiceActor.language===c().language&&_.dubGroup===c().dubGroup)},children:_=>i(x,{get when(){return _().length},get fallback(){return i(Wo,{edge:A,get page(){return Math.ceil((S()+1)/v)},intersectionObserver:w})},get children(){return i(H,{get each(){return _()},children:T=>i(Wo,{edge:A,get i(){return S()},actorRole:T,get page(){return Math.ceil((S()+1)/v)},intersectionObserver:w})})}})})})),b})(),i(x,{get when(){return l.loading&&r()>Math.ceil(e.cache.length/v)&&e.cache.length},get children(){return i(Xn,{class:"new",get children(){return i(xt,{tipPosition:"bottom",children:"Loading characters"})}})}})]}function Ou(e){const[t,n]=O(e.page===1?1:void 0),{accessToken:r}=ce(),[s]=ue.anilist.allMediaStaff(()=>e.id,t,r);return e.page===1&&W(()=>{s()&&e.setIdMal(s().data.idMal??void 0)}),i($n,{onIntersection:()=>n(e.page),fetchResponse:s,get loadingElement(){return i(f0,{})},get loading(){return e.loading},children:a=>[i(H,{get each(){return s().data.staff.edges},children:l=>i(g0,{edge:l})}),i(x,{get when(){return s().data.staff.pageInfo.hasNextPage},get children(){return i(x,{when:a===!1,fallback:"Fetch cooldown",get children(){return i(Ou,{get id(){return e.id},get page(){return e.page+1},get loading(){return s.loading}})}})}})]})}function Wo(e){let t;return Pn(()=>e.intersectionObserver.observe(t)),(()=>{var n=Nu(),r=t;return typeof r=="function"?ge(r,n):t=n,d(n,i(U,{get href(){return"/ani/character/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var s=Qy();return P(()=>G(s,"src",e.edge.node.image.large)),s})(),(()=>{var s=Ru(),a=s.firstChild,l=a.nextSibling;return d(a,()=>e.edge.node.name.userPreferred),d(l,()=>Je(e.edge.role)),s})()]}}),null),d(n,i(x,{get when(){return e.actorRole},get children(){return i(U,{get href(){return"/ani/staff/"+e.actorRole.voiceActor.id},class:"entity-right",get children(){return[(()=>{var s=n0(),a=s.firstChild;return d(s,i(x,{get when(){return e.actorRole.roleNotes},get fallback(){return(()=>{var l=a0();return d(l,()=>e.actorRole.voiceActor.name.userPreferred),l})()},get children(){return[(()=>{var l=e0();return d(l,()=>e.actorRole.voiceActor.name.userPreferred),l})(),(()=>{var l=t0(),o=l.firstChild,c=o.nextSibling;return c.nextSibling,d(l,()=>e.actorRole.roleNotes,c),l})()]}}),a),d(a,()=>e.actorRole.voiceActor.language),s})(),(()=>{var s=r0();return P(()=>G(s,"src",e.actorRole.voiceActor.image.large)),s})()]}})}}),null),P(()=>G(n,"data-page",e.page)),n})()}function g0(e){return(()=>{var t=Nu();return d(t,i(U,{get href(){return"/ani/staff/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var n=i0();return P(()=>G(n,"src",e.edge.node.image.large)),n})(),(()=>{var n=Ru(),r=n.firstChild,s=r.nextSibling;return d(r,()=>e.edge.node.name.userPreferred),d(s,()=>Je(e.edge.role)),n})()]}})),t})()}function f0(){return i(H,{get each(){return Array(3)},children:()=>s0()})}$e(["click"]);var m0=p('<svg aria-hidden=true class=svg-heart focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 31.97 512.01 448.01"><path fill=currentColor d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">');function p0(){return m0()}var v0=p('<svg class=svg-anilist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 2.95 24 18.1"><path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z">');function wl(){return v0()}var $0=p('<svg class=svg-myanimelist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 7.19 24 9.63"><path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z">');function kl(){return $0()}var _0=p('<label class="cp-toggle-favourite-button flex-no-shrink"><input type=checkbox id=favourite-toggle name=favourite-toggle>'),b0=p("<div class=grid-center><span class=visually-hidden>Anilist favourites: "),y0=p("<div class=grid-center><span class=visually-hidden>MyAnimeList favourites: "),w0=p("<div class=flex-no-shrink>");function Fr(e){const{accessToken:t}=ce();let n=null;const r=ya(async(l,o,c)=>{if(c!==n){const u=await ue.anilist.toggleFavourite(l,o);Jc(u.fromCache,"Mutation should never be cached"),e.mutateCache(c,o)}n=c},500),s=()=>!e.idType||!e.onChange||!e.variableId||!e.mutateCache||!e.idType;return(()=>{var l=_0(),o=l.firstChild;return o.addEventListener("change",c=>{if(Ae(s))return;const u=e.idType;F(u==="MANGA"||u==="ANIME"||u==="STAFF"||u==="CHARACTER"||u==="STUDIO","Missing idType"),e.onChange(c.target.checked),r(t(),{[e.idType]:e.variableId},c.target.checked)}),d(l,i(p0,{}),null),d(l,i(a,{}),null),P(c=>{var u=!!s(),h=s();return u!==c.e&&l.classList.toggle("disabled",c.e=u),h!==c.t&&(o.disabled=c.t=h),c},{e:void 0,t:void 0}),P(()=>o.checked=e.checked),l})();function a(){const l=()=>"jikanValue"in e||e.jikanLoading,o=()=>"anilistValue"in e||e.anilistLoading;return i(x,{get when(){return l()||o()},get children(){var c=w0();return d(c,i(x,{get when(){return o()},get children(){var u=b0();return u.firstChild,d(u,i(wl,{}),null),d(u,i(z,{get children(){return[i(M,{get when(){return e.anilistLoading},children:"..."}),i(M,{get when(){return e.anilistValue!=null},get children(){return Zl(e.anilistValue)}}),i(M,{get when(){return e.anilistValue==null},children:"N/A"})]}}),null),u}}),null),d(c,i(x,{get when(){return l()},get children(){var u=y0();return u.firstChild,d(u,i(kl,{}),null),d(u,i(z,{get children(){return[i(M,{get when(){return e.jikanLoading},children:"..."}),i(M,{get when(){return e.jikanValue!=null},get children(){return Zl(e.jikanValue)}}),i(M,{get when(){return e.jikanValue==null},children:"N/A"})]}}),null),u}}),null),c}})}}var k0=p("<li><strong>Birth:</strong> "),S0=p("<li><strong>Age:</strong> "),C0=p("<li><strong>Gender:</strong> "),A0=p("<li><strong>Active years: </strong>"),T0=p("<li><strong>Home town:</strong> "),x0=p("<li><strong>Blood type:</strong> "),li=p("<li>"),I0=p("<div class=entity-page-header><img class=cover><div class=row><h1></h1><p class=entity-page-alternative-names></p></div><ul class=description>"),E0=p("<form class=entity-page-form><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=CHAPTERS>CHAPTERS</option><option value=CHAPTERS_DESC>CHAPTERS_DESC</option><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=SEARCH_MATCH>SEARCH_MATCH</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=TYPE>TYPE</option><option value=TYPE_DESC>TYPE_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC</option><option value=VOLUMES>VOLUMES</option><option value=VOLUMES_DESC>VOLUMES_DESC"),L0=p("<div class=entity-page>"),P0=p("<select>"),M0=p("<details class=entity-page-details open><summary class=entity-page-summary><h2></h2><div><label><input type=checkbox> Show years</label></div></summary><ol class=grid-column-auto-fill>"),D0=p("<option>"),Ko=p("<li class=entity-page-grid-year-header><h3>"),Fu=p("<img>"),Sl=p("<div class=list-status>"),Bu=p("<span class=role> "),Cl=p("<p>"),Uu=p("<ol>"),R0=p("<li class=entity-page-media-voice-actor>"),Vu=p("<span>"),Jo=p("<span class=role> (<!>)"),N0=p('<img alt="Staff profile"class=background>'),Gu=p("<img alt=Character class=background>"),O0=p("<li><div class=entity-page-character-cover>");function F0(){const e=ne(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.characterInfoById(()=>e.id,t);return document.title="Character - LOB",i(Hu,{type:"CHARACTER",entityInfo:n,mutateEntityInfoCache:r})}function B0(){const e=ne(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.staffInfoById(()=>e.id,t);return document.title="Staff - LOB",i(Hu,{type:"STAFF",entityInfo:n,mutateEntityInfoCache:r})}function Hu(e){const[t,n]=xe(),r=tr(mn,n,300),[s,a]=O(),[l,o]=O(!1);return W(le(e.entityInfo,c=>{o(c==null?void 0:c.data.isFavourite)})),W(()=>{a({onList:t.list?t.list==="true":void 0,sort:t.sort})}),(()=>{var c=L0();return d(c,i(x,{get when(){return e.entityInfo()},get children(){return[(()=>{var u=I0(),h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling;return d(g,()=>e.entityInfo().data.name.userPreferred),d(m,()=>[...Ke(e.entityInfo().data.name.native),...Ke(e.entityInfo().data.name.alternative)].join(", ")),d(f,i(Fr,{get checked(){return l()},get idType(){return e.type},get variableId(){return e.entityInfo().data.id},get anilistValue(){return e.entityInfo().data.favourites},onChange:o,mutateCache:v=>{e.entityInfo().data.isFavourite=v,e.mutateEntityInfoCache($=>$)}}),null),d(y,i(x,{get when(){return Qa(e.entityInfo().data.dateOfBirth)},get children(){var v=k0(),$=v.firstChild;return $.nextSibling,d(v,()=>Qa(e.entityInfo().data.dateOfBirth),null),v}}),null),d(y,i(x,{get when(){return e.entityInfo().data.age},get children(){var v=S0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.age,null),v}}),null),d(y,i(x,{get when(){return e.entityInfo().data.gender},get children(){var v=C0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.gender,null),v}}),null),d(y,i(x,{get when(){var v;return(v=e.entityInfo().data.yearsActive)==null?void 0:v.length},get children(){var v=A0();return v.firstChild,d(v,()=>e.entityInfo().data.yearsActive.join("-"),null),d(v,i(z,{get children(){return[i(M,{get when(){var $;return N(()=>{var k;return!!((k=e.entityInfo().data.dateOfDeath)!=null&&k.year)})()&&e.entityInfo().data.yearsActive.at(-1)!==(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)},get children(){return["-",N(()=>e.entityInfo().data.dateOfDeath.year)]}}),i(M,{get when(){var $;return(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)==null},children:"-Present"})]}}),null),v}}),null),d(y,i(x,{get when(){return e.entityInfo().data.homeTown},get children(){var v=T0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.homeTown,null),v}}),null),d(y,i(x,{get when(){return e.entityInfo().data.bloodType},get children(){var v=x0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.bloodType,null),v}}),null),d(y,i(x,{get when(){return e.entityInfo().data.description},get children(){var v=li();return d(v,i(vl,{get children(){return e.entityInfo().data.description}})),v}}),null),P(v=>{var $=e.entityInfo().data.image.large,k=Je(e.type)+" profile";return $!==v.e&&G(h,"src",v.e=$),k!==v.t&&G(h,"alt",v.t=k),v},{e:void 0,t:void 0}),u})(),(()=>{var u=E0(),h=u.firstChild,f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.nextSibling,v=y.firstChild,$=h.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,b=w.nextSibling,A=b.nextSibling,S=A.nextSibling,_=S.nextSibling,T=_.nextSibling,I=T.nextSibling,E=I.nextSibling,L=E.nextSibling,R=L.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling,re=ae.nextSibling,Q=re.nextSibling,J=Q.nextSibling;return u.addEventListener("submit",pe=>pe.preventDefault()),g.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),v.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),$.addEventListener("change",pe=>r({sort:pe.target.value})),P(()=>g.checked=t.list==="false"),P(()=>v.checked=t.list==="true"),P(()=>j.value=e.type==="CHARACTER"&&t.sort!=="POPULARITY_DESC"?"":"POPULARITY_DESC"),P(()=>J.value=e.type==="STAFF"&&t.sort!=="START_DATE_DESC"?"":"START_DATE_DESC"),P(()=>$.value=t.sort||""),u})()]}}),null),d(c,i(z,{get children(){return[i(M,{get when(){return e.type==="STAFF"},get children(){return[i(Ua,{get variables(){return s()},type:"CHARACTER",showYears:!0,title:"Characters"}),i(Ua,{get variables(){return s()},type:"ANIME",title:"Anime staff roles"}),i(Ua,{get variables(){return s()},type:"MANGA",title:"Manga staff roles"})]}}),i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(Ua,{get variables(){return s()},type:"MEDIA",title:"Media entries"})}})]}}),null),c})()}function Ua(e){F(e.title,"title missing"),F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(e.showYears||!1),[r,s]=O(!1),[a,l]=O([]),[o,c]=O(["Japanese"]);return e.type==="MEDIA"&&W(()=>{a().length&&c(a().find(u=>u==="Japanese")||a().find(u=>u==="Chinese")||a()[0])}),(()=>{var u=M0(),h=u.firstChild,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.firstChild,v=h.nextSibling;return d(f,()=>e.title),y.addEventListener("change",$=>{$.preventDefault(),n($.target.checked)}),d(g,i(x,{get when(){return N(()=>e.type==="MEDIA")()&&a().length},get children(){var $=P0();return $.$$input=k=>c(k.target.value),d($,i(H,{get each(){return a()},children:k=>(()=>{var C=D0();return C.value=k,d(C,k),C})()})),P(()=>$.value=o()),$}}),null),d(v,i(z,{get children(){return[i(M,{get when(){return e.type==="CHARACTER"},get children(){return i(Yu,{setVisible:s,get variables(){return e.variables},showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="ANIME"},get children(){return i(Ns,{setVisible:s,get variables(){return e.variables},type:"ANIME",showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="MANGA"},get children(){return i(Ns,{setVisible:s,get variables(){return e.variables},type:"MANGA",showYears:t,nestLevel:1})}}),i(M,{get when(){return e.type==="MEDIA"},get children(){return i(ju,{setVisible:s,get variables(){return e.variables},showYears:t,setLanguages:l,language:o,nestLevel:1})}})]}})),P(()=>u.classList.toggle("hidden",!r())),P(()=>y.checked=t()),u})()}function ju(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.characterMediaById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(le(a,l=>{e.setVisible((l==null?void 0:l.data.edges.length)>0);const o=new Set;for(const c of(l==null?void 0:l.data.edges)||[])for(const u of c.voiceActorRoles)o.add(u.voiceActor.language);e.setLanguages([...o])})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:l=>[i(U0,{get language(){return e.language},get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(x,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return a().data.edges},get keyed(){return e.nestLevel===1},get children(){return i(x,{get when(){return e.variables},children:o=>i(x,{when:l===!1,fallback:"Fetch cooldown",get children(){return i(ju,{get variables(){var c;return{...o(),page:(((c=o())==null?void 0:c.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastYearGroup(){var c,u;return((u=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return a.loading}})}})})}})}})]})}function Yu(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.staffCharactersById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(le(a,l=>{e.setVisible((l==null?void 0:l.data.edges.length)>0)})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:l=>[i(G0,{get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(x,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return a().data.edges},get keyed(){return e.nestLevel===1},get children(){return i(x,{get when(){return e.variables},children:o=>i(x,{when:l===!1,fallback:"Fetch cooldown",get children(){return i(Yu,{get variables(){var c;return{...o(),characterPage:(((c=o())==null?void 0:c.characterPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get lastYearGroup(){var c,u;return((u=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return a.loading}})}})})}})}})]})}function Ns(e){F(e.type,"Type is missing"),F(e.nestLevel,"nestLevel is missing");const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a,{mutate:l}]=ue.anilist.staffMediaById(n,()=>t.id,e.type,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(le(a,o=>{e.setVisible((o==null?void 0:o.data.edges.length)>0)})),W(le(a,o=>{if(!e.lastMediaId||!(o!=null&&o.data.edges.length))return;const c=structuredClone(o.data.edges),u=[];for(const h of o.data.edges){if(h.node.id!==e.lastMediaId)break;u.push(c.shift())}u.length!==0&&(e.mutate(h=>(h.data.edges=[...h.data.edges,...u],{...h})),l(h=>(h.data.edges=c,{...h})))})),i($n,{onIntersection:()=>s(e.variables),fetchResponse:a,get loading(){return e.loading},children:o=>[i(V0,{get edges(){return a().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),i(x,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return e.variables},get keyed(){return e.nestLevel===1},get children(){return i(x,{when:o===!1,fallback:"Fetch cooldown",get children(){return i(Ns,{get variables(){var c;return{...e.variables,staffPage:(((c=e.variables)==null?void 0:c.staffPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},mutate:l,get type(){return e.type},get lastYearGroup(){var c,u;return((u=(c=a().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get lastMediaId(){var c;return(c=a().data.edges.at(-1))==null?void 0:c.node.id},get loading(){return a.loading}})}})}})}})]})}function Al(e){return i(x,{get when(){return e.showYears()},get children(){return i(z,{get children(){return[i(M,{get when(){return e.index()===0},get children(){return i(x,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Ko(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),i(M,{when:!0,get children(){return i(x,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Ko(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function U0(e){return F(e.showYears,"showYears signal is missing"),F(e.language,"language signal is missing"),i(H,{get each(){return e.edges},children:(t,n)=>[i(Al,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),i(x,{get when(){return t.voiceActorRoles.filter(r=>r.voiceActor.language===e.language())},children:r=>(()=>{var s=R0();return d(s,i(U,{get href(){return Ge(t.node)},get children(){var a=Fu();return P(l=>{var o=t.node.coverImage.large,c=Je(t.node.type)+" cover";return o!==l.e&&G(a,"src",l.e=o),c!==l.t&&G(a,"alt",l.t=c),l},{e:void 0,t:void 0}),a}}),null),d(s,i(U,{get href(){return Ge(t.node)},get children(){var a=Cl();return d(a,i(x,{get when(){var l;return(l=t.node.mediaListEntry)==null?void 0:l.status},get children(){var l=Sl();return P(()=>G(l,"data-status",t.node.mediaListEntry.status)),l}}),null),d(a,()=>t.node.title.userPreferred,null),d(a,i(x,{get when(){return t.characterRole},get children(){var l=Bu();return l.firstChild,d(l,()=>Je(t.characterRole),null),l}}),null),a}}),null),d(s,i(x,{get when(){return r().length},get children(){var a=Uu();return d(a,i(H,{get each(){return r()},children:l=>(()=>{var o=li();return d(o,i(U,{class:"actor",get href(){return"/ani/staff/"+l.voiceActor.id+"/"+Xe(l.voiceActor.name.userPreferred)},get children(){return[(()=>{var c=Vu();return d(c,()=>l.voiceActor.name.userPreferred),c})(),i(x,{get when(){return l.roleNotes},get children(){var c=Jo(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>l.roleNotes,h),c}}),i(x,{get when(){return l.dubGroup},get children(){var c=Jo(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>l.dubGroup,h),c}}),(()=>{var c=N0();return P(()=>G(c,"src",l.voiceActor.image.large)),c})()]}})),o})()})),a}}),null),s})()})]})}function V0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{const s=n.at(-1);return(s==null?void 0:s.node.id)!==r.node.id?(r.staffRoles=[r.staffRole],n.push(r)):s!=null&&s.staffRoles&&s.staffRoles.push(r.staffRole),n};return i(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[i(Al,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),(()=>{var s=li();return d(s,i(U,{get href(){return Ge(n.node)},get children(){return[(()=>{var a=Gu();return P(()=>G(a,"src",n.node.coverImage.large)),a})(),(()=>{var a=Cl();return d(a,i(x,{get when(){var l;return(l=n.node.mediaListEntry)==null?void 0:l.status},get children(){var l=Sl();return P(()=>G(l,"data-status",n.node.mediaListEntry.status)),l}}),null),d(a,()=>n.node.title.userPreferred,null),a})(),i(x,{get when(){return n.staffRoles},get children(){var a=Uu();return d(a,i(H,{get each(){return n.staffRoles},children:l=>(()=>{var o=li();return d(o,l),o})()})),a}})]}})),s})()]})}function G0(e){return F(e.showYears,"showYears signal is missing"),i(H,{get each(){return e.edges},children:(t,n)=>i(H,{get each(){return t.characters},children:r=>i(x,{when:r,get children(){return[i(Al,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),(()=>{var s=O0(),a=s.firstChild;return d(a,i(U,{get href(){return"/ani/character/"+r.id+"/"+Xe(r.name.userPreferred)},get children(){var l=Gu();return P(()=>G(l,"src",r.image.large)),l}}),null),d(a,i(U,{class:"media",get href(){return Ge(t.node)},get children(){var l=Fu();return P(o=>{var c=t.node.coverImage.large,u=Je(t.node.type)+" cover";return c!==o.e&&G(l,"src",o.e=c),u!==o.t&&G(l,"alt",o.t=u),o},{e:void 0,t:void 0}),l}}),null),d(s,i(U,{get href(){return"/ani/character/"+r.id+"/"+Xe(r.name.userPreferred)},get children(){return[(()=>{var l=Vu();return d(l,()=>r.name.userPreferred),l})(),(()=>{var l=Bu();return l.firstChild,d(l,()=>Je(t.characterRole),null),l})()]}}),null),d(s,i(U,{get href(){return Ge(t.node)},get children(){var l=Cl();return d(l,i(x,{get when(){var o;return(o=t.node.mediaListEntry)==null?void 0:o.status},get children(){var o=Sl();return P(()=>G(o,"data-status",t.node.mediaListEntry.status)),o}}),null),d(l,()=>t.node.title.userPreferred,null),l}}),null),s})()]}})})})}$e(["input"]);var H0=p("<div class=flex-space-between><h1>"),j0=p("<form><label><input type=checkbox> Show years</label><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option value=POPULARITY_DESC>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC"),Y0=p("<ol class=grid-column-auto-fill>"),q0=p("<div class=studio-page>"),Xo=p("<li class=grid-full-span><h3>");function z0(){const e=ne(),{accessToken:t}=ce(),[n,r]=xe(),s=tr(mn,r,300),[a,l]=O(),[o,c]=O(!0),[u,{mutateCache:h}]=ue.anilist.studioInfoAndMediaById(()=>e.id,a,t);document.title="Studio - LOB";const[f,g]=O(!1);return W(le(u,m=>{g(m==null?void 0:m.data.isFavourite)})),W(()=>{l({onList:n.list?n.list==="true":void 0,sort:n.sort})}),(()=>{var m=q0();return d(m,i(x,{get when(){return u()},get children(){return[(()=>{var y=H0(),v=y.firstChild;return d(v,()=>u().data.name),d(y,i(Fr,{get checked(){return f()},get variableId(){return e.id},idType:"STUDIO",get anilistValue(){return u().data.favourites},onChange:g,mutateCache:$=>{u().data.isFavourite=$,h(k=>k)}}),null),y})(),(()=>{var y=j0(),v=y.firstChild,$=v.firstChild,k=v.nextSibling,C=k.firstChild,w=C.firstChild,b=C.nextSibling,A=b.nextSibling,S=A.firstChild,_=k.nextSibling,T=_.firstChild,I=T.nextSibling,E=I.nextSibling,L=E.nextSibling,R=L.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=j.nextSibling,ae=K.nextSibling,re=ae.nextSibling,Q=re.nextSibling,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling,fe=ve.nextSibling,ee=fe.nextSibling;return y.addEventListener("submit",q=>q.preventDefault()),$.addEventListener("change",q=>c(q.target.checked)),w.addEventListener("change",q=>s({list:q.target.checked?q.target.value:void 0})),S.addEventListener("change",q=>s({list:q.target.checked?q.target.value:void 0})),_.addEventListener("change",q=>s({sort:q.target.value})),P(()=>$.checked=o()),P(()=>w.checked=n.list==="false"),P(()=>S.checked=n.list==="true"),P(()=>ee.value=n.sort==="START_DATE_DESC"?"START_DATE_DESC":""),P(()=>_.value=n.sort||""),y})(),i(Au,{get children(){var y=Y0();return d(y,i(qu,{get variables(){return a()},studioInfo:u,showYears:o,nestLevel:1})),y}})]}})),m})()}function qu(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(void 0),[a]=ue.anilist.studioInfoAndMediaById(()=>t.id,e.nestLevel===1?void 0:r,n),l=e.studioInfo||a;return i($n,{onIntersection:()=>s(e.variables),fetchResponse:l,get loading(){return e.loading},children:o=>[i(K0,{get edges(){return l().data.media.edges},get showYears(){return e.showYears},get lastMediaId(){return e.lastMediaId},get lastYearGroup(){return e.lastYearGroup}}),i(x,{get when(){return l().data.media.pageInfo.hasNextPage},get children(){return i(x,{get when(){return l().data.media.edges},get keyed(){return e.nestLevel===1},get children(){return i(x,{get when(){return e.variables},children:c=>i(x,{when:o===!1,fallback:"Fetch cooldown",get children(){return i(qu,{get variables(){var u;return{...c(),page:(((u=c())==null?void 0:u.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastMediaId(){var u;return(u=l().data.media.edges.at(-1))==null?void 0:u.node.id},get lastYearGroup(){var u,h;return((h=(u=l().data.media.edges.at(-1))==null?void 0:u.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function W0(e){return i(x,{get when(){return e.showYears()},get children(){return i(z,{get children(){return[i(M,{get when(){return e.index()===0},get children(){return i(x,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Xo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),i(M,{when:!0,get children(){return i(x,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Xo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function K0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{var s;return((s=n.at(-1))==null?void 0:s.node.id)!==r.node.id&&e.lastMediaId!==r.node.id&&n.push(r),n};return i(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[i(W0,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),i(Si,{get media(){return n.node}})]})}var J0=p("<div data-k-8e2716fd class=activity-page>"),X0=p("<img data-k-8e2716fd class=profile alt=Profile>"),Z0=p("<div data-k-8e2716fd class=activity-message-card><div data-k-8e2716fd class=header></div><div data-k-8e2716fd class=content>");function Q0(){const{accessToken:e}=ce(),t=ne(),[n]=ue.anilist.activityById(()=>t.id,e),[r]=ue.anilist.activityRepliesById(()=>t.id,1,e);return document.title="Activity - LOB",(()=>{var s=J0();return d(s,i(x,{get when(){var a;return(a=n())==null?void 0:a.data},get children(){return i($l,{get activity(){return n().data},mutateCache:a=>console.log("mutate",a)})}}),null),d(s,i(x,{get when(){var a;return(a=r())==null?void 0:a.data},get children(){return i(H,{get each(){return r().data.activityReplies},children:a=>(()=>{var l=Z0(),o=l.firstChild,c=o.nextSibling;return d(o,i(U,{get href(){return"/user/"+a.user.name},class:"message-card-profile-header",get children(){return[(()=>{var u=X0();return P(()=>G(u,"src",a.user.avatar.large)),u})(),N(()=>a.user.name)]}}),null),d(o,i(qn,{get createdAt(){return a.createdAt}}),null),d(c,i(vl,{get children(){return a.text}})),l})()})}}),null),s})()}function e2(e){const t=ne(),n=Qt();return i(x,{get when(){return!n.search},get fallback(){return i(hn,{get href(){return"/search/"+t.type+n.search}})},get children(){return e.children}})}var t2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"fill=currentColor>'),n2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"fill=currentColor>'),r2=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"fill=currentColor>');function sa(e){return F("score"in e,"Score is missing"),i(z,{get children(){return[i(M,{get when(){return e.score>=75},get children(){var t=t2();return P(()=>G(t,"class",`good ${e.class||""}`)),t}}),i(M,{get when(){return e.score>=60},get children(){var t=n2();return P(()=>G(t,"class",`average ${e.class||""}`)),t}}),i(M,{get when(){return e.score>=0},get children(){var t=r2();return P(()=>G(t,"class",`bad ${e.class||""}`)),t}})]}})}var a2=p("<label>"),i2=p("<p>"),s2=p("<input type=number inputmode=numeric min=0 max=10>"),l2=p("<input type=number inputmode=numeric min=0 max=100>"),o2=p("<input type=number inputmode=decimal min=0 max=10 step=.1>"),c2=p("<div class=score-star-input>"),d2=p("<div class=score-emoji-input>"),zu=p("<label class=radio-container><input type=radio class=radio>");function Zo(e){F(e.format,"Score format is missing"),F(e.onChange,"onChange is missing (give signal)");const t=Fe({name:"score",id:"score",value:0},e),[n]=gi(t,["id","name","value"]),r={onBeforeInput:s=>{var a;(a=s.data)!=null&&a.toLowerCase().includes("e")&&s.preventDefault()},onBlur:s=>s.target.value=n.value};return[i(x,{get when(){return e.label},get children(){return i(z,{get children(){return[i(M,{get when(){return e.format==="POINT_10"||e.format==="POINT_100"||e.format==="POINT_10_DECIMAL"},get children(){var s=a2();return d(s,()=>e.label),P(()=>G(s,"for",n.id)),s}}),i(M,{get when(){return e.format==="POINT_5"||e.format==="POINT_3"},get children(){var s=i2();return d(s,()=>e.label),s}})]}})}}),i(z,{get children(){return[i(M,{get when(){return e.format==="POINT_10"},get children(){var s=s2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Math.floor(Number(a.target.value)||0);e.onChange(Math.max(0,Math.min(l,10)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_100"},get children(){var s=l2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Math.floor(Number(a.target.value)||0);e.onChange(Math.max(0,Math.min(l,100)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){var s=o2();return Lt(s,Fe(n,r,{onChange:a=>{const l=Number((Number(a.target.value)||0).toFixed(1));e.onChange(Math.max(0,Math.min(l,10)))}}),!1,!1),s}}),i(M,{get when(){return e.format==="POINT_5"},get children(){var s=c2();return d(s,i(u2,Fe(n,{get onChange(){return e.onChange}}))),s}}),i(M,{get when(){return e.format==="POINT_3"},get children(){var s=d2();return d(s,i(h2,Fe(n,{get onChange(){return e.onChange}}))),s}})]}})]}function u2(e){return i(H,{each:[1,2,3,4,5],children:t=>(()=>{var n=zu(),r=n.firstChild;return r.$$click=s=>{e.value==s.target.value?(s.target.checked=!1,e.onChange(0)):e.onChange(+s.target.value)},r.value=t,d(n,i(ka,{class:"score-star"}),null),P(s=>{var a=t<=e.value,l=e.name,o=e.id;return a!==s.e&&n.classList.toggle("selected",s.e=a),l!==s.t&&G(r,"name",s.t=l),o!==s.a&&G(r,"id",s.a=o),s},{e:void 0,t:void 0,a:void 0}),P(()=>r.checked=e.value==t),n})()})}function h2(e){const t=["",0,60,80];return i(H,{each:[1,2,3],children:n=>(()=>{var r=zu(),s=r.firstChild;return s.$$click=a=>{e.value==a.target.value?(a.target.checked=!1,e.onChange(0)):e.onChange(+a.target.value)},s.value=n,d(r,i(sa,{get score(){return t[n]}}),null),P(a=>{var l=n==e.value,o=e.name,c=e.id;return l!==a.e&&r.classList.toggle("selected",a.e=l),o!==a.t&&G(s,"name",a.t=o),c!==a.a&&G(s,"id",a.a=c),a},{e:void 0,t:void 0,a:void 0}),P(()=>s.checked=e.value==n),r})()})}$e(["click"]);var g2=p("<form class=exit-media-editor method=dialog><button>Close"),f2=p("<img class=banner alt=Banner>"),m2=p('<div class="media-editor-input volume-progress"><label for=progress-volumes>Volume Progress</label><input type=number inputmode=numeric id=progress-volumes name=progressVolumes min=0>'),p2=p("<p class=advanced-scoring-header>Advanced scoring"),v2=p("<ul>"),$2=p("<hr>"),_2=p("<button type=button>Delete"),b2=p('<form method=dialog><header class=media-editor-header><img class=cover alt=Cover><h2 class="line-clamp header"></h2><div class=container><button type=submit>Save</button></div></header><div class=media-editor-body><div><div class="media-editor-input status"><label for=status>Status</label><select name=status id=status><option value=none disabled hidden>Select status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select></div><div class="media-editor-input score"></div><div class="media-editor-input progress"><label for=progress></label><input type=number inputmode=numeric id=progress name=progress min=0></div><div class="media-editor-input start-date"><label for=start-date>Start date</label><input type=date id=start-date name=startedAt></div><div class="media-editor-input finish-date"><label for=end-date>Finish date</label><input type=date id=end-date name=completedAt></div><div class="media-editor-input repeat"><label for=repeat></label><input type=number inputmode=numeric id=repeat name=repeat min=0></div><div class="media-editor-input notes"><label for=notes>Notes</label><textarea type=text id=notes placeholder=Notes... name=notes></textarea></div></div><div><h3>Custom Lists</h3><div><input type=checkbox name=hiddenFromStatusLists id=hide-from-status><label for=hide-from-status> Hide from status lists</label></div><div><input type=checkbox name=private id=private><label for=private> Private'),y2=p("<dialog class=media-editor-warning-dialog><p>Are you sure you want to delete this media entry</p><form method=dialog><button>Yes</button><button>No"),w2=p("<dialog class=media-editor>"),k2=p('<div class="media-editor-input advanced-score">'),S2=p("<li><input type=checkbox name=customLists><label> ");function C2(e,t){F(!t,"Should not be able to edit if not authenticated");const[n,r]=O(),[s,a]=O(),[l,o]=O(),[c,u]=O(),[h,f]=O(),[g,m]=O(),[y,v]=O(),[$,k]=O(),[C,w]=O(),[b,A]=O(),[S,_]=O(),[T,I]=O(),[E,L]=O(),[R,B]=O(),[V,X]=O(),[j,K]=O(),[ae,re]=O(),[Q,J]=O(),[pe,ve]=O();function fe(ee,q){Oe(()=>{var He,De,Be,et,Pt,Mt,rt,kt,at,dt,Dt,ft;k(ee==null?void 0:ee.data.mediaListOptions.scoreFormat),o(()=>(q==null?void 0:q.type)==="ANIME"?ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoringEnabled:(q==null?void 0:q.type)==="MANGA"?ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoringEnabled:!1),u(()=>(q==null?void 0:q.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoring)||[]:(q==null?void 0:q.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoring)||[]:[]),f(()=>(q==null?void 0:q.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.customLists)||[]:(q==null?void 0:q.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.customLists)||[]:[]),r(((He=q==null?void 0:q.mediaListEntry)==null?void 0:He.score)??""),a(((De=q==null?void 0:q.mediaListEntry)==null?void 0:De.advancedScores)??{}),v(((Be=q==null?void 0:q.mediaListEntry)==null?void 0:Be.status)??"none"),A(((et=q==null?void 0:q.mediaListEntry)==null?void 0:et.progress)??""),_(((Pt=q==null?void 0:q.mediaListEntry)==null?void 0:Pt.progressVolumes)??""),I((q==null?void 0:q.episodes)??(q==null?void 0:q.chapters)??null),L(oi((Mt=q==null?void 0:q.mediaListEntry)==null?void 0:Mt.startedAt)),B(oi((rt=q==null?void 0:q.mediaListEntry)==null?void 0:rt.completedAt)),X(((kt=q==null?void 0:q.mediaListEntry)==null?void 0:kt.repeat)??""),K(((at=q==null?void 0:q.mediaListEntry)==null?void 0:at.notes)||""),w((q==null?void 0:q.isFavourite)||!1),ve(((dt=q==null?void 0:q.mediaListEntry)==null?void 0:dt.private)||!1),J(((Dt=q==null?void 0:q.mediaListEntry)==null?void 0:Dt.hiddenFromStatusLists)||!1),m(((ft=q==null?void 0:q.mediaListEntry)==null?void 0:ft.customLists)||{})})}return fe(e,t),[{score:n,setScore:r,advancedScores:s,setAdvancedScores:a,advancedScoresEnabled:l,setAdvancedScoresEnabled:o,advancedScoring:c,setAdvancedScoring:u,customLists:h,setCustomLists:f,mediaCustomLists:g,setMediaCustomLists:m,status:y,setStatus:v,format:$,setFormat:k,progress:b,setProgress:A,volumeProgress:S,setvolumeProgress:_,maxProgress:T,setMaxProgress:I,startedAt:E,setStartedAt:L,completedAt:R,setCompletedAt:B,isFavourite:C,setIsFavourite:w,repeat:V,setRepeat:X,notes:j,setNotes:K,like:ae,setLike:re,hideFromStatus:Q,setHideFromStatus:J,mediaPrivate:pe,setMediaPrivate:ve},fe]}function A2(e){const[t,n]=O(void 0),[r,s]=O(void 0),{accessToken:a,authUserData:l}=ce(),[o,c]=C2();let u,h;const f=async m=>{var k,C,w,b,A,S,_,T,I,E,L,R,B,V,X,j,K,ae;const v=new FormData(m.currentTarget).entries().reduce((re,[Q,J])=>(Array.isArray(re[Q])?re[Q].push(J||null):Q in re?re[Q]=[re[Q],J||null]:re[Q]=J||null,re),{}),$={};if(Number.isNaN(+v.progress)===!1&&v.progress!=(((k=t().mediaListEntry)==null?void 0:k.progress)||0)&&($.progress=Number(v.progress)),Number.isNaN(+v.progressVolumes)===!1&&v.progressVolumes!=(((C=t().mediaListEntry)==null?void 0:C.progressVolumes)||0)&&($.progressVolumes=Number(v.progressVolumes)),Number.isNaN(+v.score)===!1&&v.score!=(((w=t().mediaListEntry)==null?void 0:w.score)||0)&&($.score=Number(v.score)),Number.isNaN(+v.repeat)===!1&&v.repeat!=(((b=t().mediaListEntry)==null?void 0:b.repeat)||0)&&($.repeat=Number(v.repeat)),o.advancedScoresEnabled()){const Q=o.advancedScoring().map((fe,ee)=>v["advanced-scores-"+ee]).map(fe=>Number(fe||0)),J=!Q.some(Number.isNaN),pe=Object.values(((A=t().mediaListEntry)==null?void 0:A.advancedScores)||{}),ve=Q.some((fe,ee)=>fe!=pe[ee]);J&&ve&&($.advancedScores=Q)}if(F(v.status!="none"||((S=t().mediaListEntry)==null?void 0:S.score)==null,"Replacing current status with default none value"),v.status=="none"||((_=t().mediaListEntry)==null?void 0:_.status)==v.status||($.status=v.status),(v.startedAt||"")!=oi((T=t().mediaListEntry)==null?void 0:T.startedAt)){const[re,Q,J]=v.startedAt.split("-");$.startedAt={year:re,month:Q,day:J}}if((v.completedAt||"")!=oi((I=t().mediaListEntry)==null?void 0:I.completedAt)){const[re,Q,J]=v.completedAt.split("-");$.completedAt={year:re,month:Q,day:J}}if(v.notes!=((E=t().mediaListEntry)==null?void 0:E.notes)&&($.notes=v.notes),v.customLists||(L=t().mediaListEntry)!=null&&L.customLists){const re=v.customLists||[],Q=Array.isArray(re)?re:[re];(Q.length>0&&((R=t().mediaListEntry)==null?void 0:R.customLists)==null||(B=t().mediaListEntry)!=null&&B.customLists&&Object.entries((V=t().mediaListEntry)==null?void 0:V.customLists).some(([pe,ve])=>Q.includes(pe)!==ve))&&($.customLists=Q)}if(v.hiddenFromStatusLists==="on"!=(((X=t().mediaListEntry)==null?void 0:X.hiddenFromStatusLists)??!1)&&($.hiddenFromStatusLists=v.hiddenFromStatusLists==="on"),v.private==="on"!=(((j=t().mediaListEntry)==null?void 0:j.private)??!1)&&($.private=v.private==="on"),m.submitter.type==="submit"&&Object.keys($).length>0){$.mediaId=t().id;for(const[Q,J]of Object.entries($))F(Number.isNaN(J)===!1,`Key "${Q}" is NaN`);const re=await ue.anilist.mutateMedia(a(),$);re.status===200&&((ae=(K=r())==null?void 0:K.mutateMedia)==null||ae.call(K,re.data))}};async function g(m,y){F("id"in m,"Missing editor id"),Oe(()=>{n(m),s(y),c(l(),m)}),u.showModal();const v=await ue.anilist.mediaListEntry(a(),m.id);Oe(()=>{n(v.data.data.Media),c(l(),v.data.data.Media)})}return i(Rc.Provider,{value:{openEditor:g},get children(){return[(()=>{var m=w2(),y=u;return typeof y=="function"?ge(y,m):u=m,d(m,i(x,{get when(){return t()},get children(){return[g2(),(()=>{var v=b2(),$=v.firstChild,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,b=w.firstChild,A=$.nextSibling,S=A.firstChild,_=S.firstChild,T=_.firstChild,I=T.nextSibling,E=I.firstChild,L=E.nextSibling,R=L.nextSibling,B=R.nextSibling,V=B.nextSibling,X=V.nextSibling,j=X.nextSibling,K=_.nextSibling,ae=K.nextSibling,re=ae.firstChild,Q=re.nextSibling,J=ae.nextSibling,pe=J.firstChild,ve=pe.nextSibling,fe=J.nextSibling,ee=fe.firstChild,q=ee.nextSibling,He=fe.nextSibling,De=He.firstChild,Be=De.nextSibling,et=He.nextSibling,Pt=et.firstChild,Mt=Pt.nextSibling,rt=S.nextSibling,kt=rt.firstChild,at=kt.nextSibling,dt=at.firstChild,Dt=at.nextSibling,ft=Dt.firstChild;return v.addEventListener("submit",f),d($,i(x,{get when(){return t().bannerImage},get children(){var te=f2();return P(()=>G(te,"src",t().bannerImage)),te}}),k),d(C,()=>{var te;return(te=t().title)==null?void 0:te.userPreferred}),d(w,i(Fr,{get checked(){return o.isFavourite()},get idType(){return t().type},get variableId(){return t().id},get onChange(){return o.setIsFavourite},mutateCache:(te,Z)=>{var _e,ke;(ke=(_e=r())==null?void 0:_e.setIsFavourite)==null||ke.call(_e,te,Z)}}),b),I.addEventListener("change",te=>{o.setStatus(te.target.value),(te.target.value==="CURRENT"||te.target.value==="COMPLETED")&&o.startedAt()===""&&o.setStartedAt(new Date().toISOString().substring(0,10)),te.target.value==="COMPLETED"&&((o.progress()===""||o.progress()==0)&&o.maxProgress()>0&&o.setProgress(o.maxProgress()),(o.volumeProgress()===""||o.volumeProgress()==0)&&t().volumes>0&&o.setvolumeProgress(t().volumes),o.completedAt()===""&&o.setCompletedAt(new Date().toISOString().substring(0,10)))}),d(R,i(z,{get children(){return[i(M,{get when(){return t().type==="MANGA"},children:" Reading"}),i(M,{get when(){return t().type==="ANIME"},children:" Watching"})]}})),d(j,i(z,{get children(){return[i(M,{get when(){return t().type==="MANGA"},children:"Rereading"}),i(M,{get when(){return t().type==="ANIME"},children:"Rewatching"})]}})),d(K,i(Zo,{get value(){return o.score()},label:"Score",get onChange(){return o.setScore},get format(){return o.format()}})),d(re,i(z,{get children(){return[i(M,{get when(){return t().type==="ANIME"},children:"Episode Progress"}),i(M,{get when(){return t().type==="MANGA"},children:"Chapter Progress"})]}})),Q.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Q.addEventListener("blur",te=>te.target.value=o.progress()),Q.addEventListener("change",te=>o.setProgress(Math.max(0,Math.min(+te.target.value,o.maxProgress()??1/0)))),d(S,i(x,{get when(){return t().type==="MANGA"},get children(){var te=m2(),Z=te.firstChild,_e=Z.nextSibling;return _e.$$beforeinput=ke=>{var it;(it=ke.data)!=null&&it.toLowerCase().includes("e")&&ke.preventDefault()},_e.addEventListener("blur",ke=>ke.target.value=o.volumeProgress()),_e.addEventListener("change",ke=>o.setvolumeProgress(Math.max(0,Math.min(+ke.target.value,t().volumes??1/0)))),P(()=>G(_e,"max",t().volumes)),P(()=>_e.value=o.volumeProgress()),te}}),J),ve.addEventListener("change",te=>o.setStartedAt(te.target.value)),q.addEventListener("change",te=>o.setCompletedAt(te.target.value)),d(De,i(z,{get children(){return[i(M,{get when(){return t().type==="ANIME"},children:"Total Rewatches"}),i(M,{get when(){return t().type==="MANGA"},children:"Total Rereads"})]}})),Be.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Be.addEventListener("blur",te=>te.target.value=o.repeat()),Be.addEventListener("change",te=>o.setRepeat(Math.max(0,Math.min(+te.target.value,Number.MAX_SAFE_INTEGER)))),Mt.addEventListener("change",te=>o.setNotes(te.target.value)),d(S,i(x,{get when(){return N(()=>!!o.advancedScoresEnabled())()&&o.advancedScoring().length},get children(){return[p2(),i(H,{get each(){return o.advancedScoring()},children:(te,Z)=>(()=>{var _e=k2();return d(_e,i(Zo,{get value(){return o.advancedScores()[te]??""},get id(){return"advanced-score-"+Z()},get name(){return"advanced-scores-"+Z()},label:te,onChange:ke=>{o.setAdvancedScores(it=>{const _t={...it,[te]:ke};let Ie=0,Ve=0;return Object.values(_t).forEach(st=>{Ie+=st>0,Ve+=st||0}),F(Ie!==0||Ve===0,"Total is 0"),Number.isNaN(Ve)===!1&&typeof Ve=="number"&&Ie>0&&o.setScore(()=>{switch(o.format()){case"POINT_10":return Math.max(0,Math.min(Math.round(Ve/Ie),10));case"POINT_100":return Math.max(0,Math.min(Math.round(Ve/Ie),100));case"POINT_10_DECIMAL":return Math.max(0,Math.min(Number((Ve/Ie).toFixed(1)),10));case"POINT_5":return Math.max(0,Math.min(Math.round(Ve/Ie),5));case"POINT_3":return Math.max(0,Math.min(Math.round(Ve/Ie),3));default:F(!1,`Format "${o.format()}" not found`)}}),_t})},get format(){return o.format()}})),_e})()})]}}),null),d(rt,i(x,{get when(){var te;return(te=o.customLists())==null?void 0:te.length},get children(){return[(()=>{var te=v2();return d(te,i(H,{get each(){return o.customLists()},children:(Z,_e)=>(()=>{var ke=S2(),it=ke.firstChild,_t=it.nextSibling;return _t.firstChild,it.addEventListener("change",Ie=>o.setMediaCustomLists(Ve=>({...Ve,[Z]:Ie.target.checked}))),it.value=Z,d(_t,Z,null),P(Ie=>{var Ve="custom-list-"+_e(),st="custom-list-"+_e();return Ve!==Ie.e&&G(it,"id",Ie.e=Ve),st!==Ie.t&&G(_t,"for",Ie.t=st),Ie},{e:void 0,t:void 0}),P(()=>{var Ie;return it.checked=(Ie=o.mediaCustomLists())==null?void 0:Ie[Z]}),ke})()})),te})(),$2()]}}),at),dt.addEventListener("change",te=>o.setHideFromStatus(te.target.checked)),ft.addEventListener("change",te=>o.setMediaPrivate(te.target.checked)),d(rt,i(x,{get when(){return t().mediaListEntry},get children(){var te=_2();return te.$$click=()=>h.showModal(),te}}),null),P(te=>{var it,_t;var Z=(it=t().coverImage)==null?void 0:it.large,_e="media-editor-input-grid "+((_t=t().type)==null?void 0:_t.toLowerCase())||"",ke=o.maxProgress();return Z!==te.e&&G(k,"src",te.e=Z),_e!==te.t&&Bt(S,te.t=_e),ke!==te.a&&G(Q,"max",te.a=ke),te},{e:void 0,t:void 0,a:void 0}),P(()=>I.value=o.status()),P(()=>Q.value=o.progress()),P(()=>ve.value=o.startedAt()),P(()=>q.value=o.completedAt()),P(()=>Be.value=o.repeat()),P(()=>Mt.value=o.notes()),P(()=>dt.checked=o.hideFromStatus()),P(()=>ft.checked=o.mediaPrivate()),v})(),(()=>{var v=y2(),$=v.firstChild,k=$.nextSibling,C=k.firstChild,w=h;return typeof w=="function"?ge(w,v):h=v,C.$$click=async()=>{var b,A;u.close(),(A=(b=r())==null?void 0:b.deleteMedia)==null||A.call(b)},v})()]}})),m})(),N(()=>e.children)]}})}function oi(e){if(!e||!e.day||!e.month||!e.year)return"";const t=String(e.day).padStart(2,"0"),n=String(e.month).padStart(2,"0");return`${e.year}-${n}-${t}`}$e(["beforeinput","click"]);function T2(e){return new Worker("/legendary-octo-barnacle/branches/rework-change-fetching-and-caching/assets/compare-media-list-Bb83H1p-.js",{name:e==null?void 0:e.name})}var x2=p("<div class=score-component-container>");function Tl(e){return i(x,{get when(){return e.score!==0},get children(){var t=x2();return d(t,i(z,{get children(){return[i(M,{get when(){return e.format==="POINT_10"},get children(){return[N(()=>e.score),"/10"]}}),i(M,{get when(){return e.format==="POINT_100"},get children(){return[N(()=>e.score),"/100"]}}),i(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){return[N(()=>e.score),"/10"]}}),i(M,{get when(){return e.format==="POINT_5"},get children(){return[N(()=>e.score),"/5 ",i(ka,{class:"score-star"})]}}),i(M,{get when(){return e.format==="POINT_3"},get children(){return i(z,{get children(){return[i(M,{get when(){return e.score===1},get children(){return i(sa,{class:"score-emoji",score:0})}}),i(M,{get when(){return e.score===2},get children(){return i(sa,{class:"score-emoji",score:70})}}),i(M,{get when(){return e.score===3},get children(){return i(sa,{class:"score-emoji",score:80})}})]}})}})]}})),t}})}var I2=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z">');function ci(){return I2()}var E2=p("<ol><li><button>All "),L2=p("<option value>All formats"),P2=p("<option value>Any User Status"),M2=p("<option value>Any Status"),D2=p("<option value>All genres"),R2=p("<option value>All countries"),N2=p("<option value>All ratings"),O2=p("<option value=chapters>Chapters"),F2=p("<option value=episodes>Episodes"),B2=p("<option value=volumes>Volumes"),U2=p("<i>(default is all users)"),V2=p("<button>Reset filters"),G2=p('<div class=pg-compare><div><ul class=pg-compare-users></ul></div><div class=pg-compare-filter-panel><input type=text placeholder=Search><select name=format><option value hidden>Format</option><option value=MOVIE>Movie</option><option value=MUSIC>Music</option><option value=ONA>Ona</option><option value=OVA>Ova</option><option value=SPECIAL>Special</option><option value=TV>TV</option><option value=TV_SHORT>TV short</option></select><select name=userStatus><option value hidden>User Status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select><select name=status><option value hidden>Status</option><option value=RELEASING>Releasing</option><option value=FINISHED>Finished</option><option value=NOT_YET_RELEASED>Not Yet Released</option><option value=CANCELLED>Cancelled</option></select><select name=genre><option value hidden>Genre</option><option value=Action>Action</option><option value=Adventure>Adventure</option><option value=Comedy>Comedy</option><option value=Drama>Drama</option><option value=Ecchi>Ecchi</option><option value=Fantasy>Fantasy</option><option value=Hentai>Hentai</option><option value=Horror>Horror</option><option value="Mahou Shoujo">Mahou Shoujo</option><option value=Mecha>Mecha</option><option value=Music>Music</option><option value=Mystery>Mystery</option><option value=Psychological>Psychological</option><option value=Romance>Romance</option><option value=Sci-Fi>Sci-Fi</option><option value="Slice of Life">Slice of Life</option><option value=Sports>Sports</option><option value=Supernatural>Supernatural</option><option value=Thriller>Thriller</option></select><select name=countryOfOrigin><option value hidden>Country</option><option value=CN>China</option><option value=JP>Japan</option><option value=KR>South Korea</option><option value=TW>Taiwan</option></select><select name=isAdult><option value hidden>Age rating</option><option value=false>R-17+</option><option value=true>R-18</option></select><input type=number name=year placeholder="Release year"max=9999 min=0><label for=repeat><input type=checkbox name=repeat id=repeat> </label><label for=missingScore><input type=checkbox name=missingScore id=missingScore> Allow missing scores</label><label for=reverse><input type=checkbox name=reverse id=reverse> Reverse order</label><select name=sort><option value=completedAt>Completed Date</option><option value=averageScore>Global Score</option><option value=updatedAt>Last updated</option><option value=popularity>Popularity</option><option value=releaseDate>Release Date</option><option value=repeat></option><option value=title>Title</option><option value=score>User score</option></select><label for=reviewsNeeded>Reviews needed: <input type=number inputmode=numeric min=1 name=reviewsNeeded id=reviewsNeeded><button class=help>?'),H2=p("<li><button> "),j2=p("<ol>"),Y2=p('<form class=pg-compare-user-search><input type=search name=user id=user placeholder="Search users">'),q2=p('<li><img alt="Profile picture">'),z2=p('<p class=error>No user found with name: "<!>"'),W2=p("<img>"),K2=p("<p>"),J2=p("<label><input type=checkbox name=enable> Disable <button>?"),X2=p("<label><input type=checkbox name=enable> Filter out <button>?"),Z2=p("<li><button>Remove"),Q2=p("<p>Loading user data"),ew=p("<h1>Total <!> "),tw=p('<ol class="pg-compare-content grid-column-auto-fill">'),nw=p('<img loading=lazy class=bg inert alt="Background banner">',!0,!1,!1),Qo=p("<div class=cp-card-repeat>"),rw=p('<img class=cover loading=lazy alt="Media cover">',!0,!1,!1),aw=p("<br>"),iw=p("<span>"),sw=p('<div class="footer flex-space-between"><span>'),lw=p('<div class=cover-wrapper><div class="header flex-space-between"><div class=score> '),ow=p("<div class=pg-compare-card-content><p class=title></p><ol class=pg-compare-media-users></ol><ul class=flex-bullet-separator>"),cw=p('<li class="pg-compare-media-card inline-container"><div class=wrapper>'),dw=p('<img class=profile alt="Profile picture">'),uw=p("<span class=status>"),ec=p("<li>");const hw=()=>{const e=df(sessionStorage.getItem(window.location.href),0);return Array(e).fill({id:-1,coverImage:{}})};function gw(){const e=Qt(),[t,n]=xe(),r=ne(),[s,a]=We([]),[l,o]=We({}),[c,u]=O(hw()),h=Q=>{sessionStorage.setItem(window.location.href,Q.length),u(Q)},[f,g]=O([]),[m,y]=O([]),[v,$]=O(!0);W(le(()=>t.user,Q=>{const J=vr(Q);a(Jt([...J],[]))}));const k=()=>t.search||"",C=()=>t.format||"",w=()=>t.reviewsNeeded||f().length,b=()=>t.status||"",A=()=>t.genre||"",S=()=>t.countryOfOrigin||"",_=()=>t.year||"",T=()=>t.private==="true",I=()=>t.notes==="true",E=()=>t.repeat==="true",L=()=>t.missingStart==="true",R=()=>t.missingScore!=="false",B=()=>t.reverse==="true",V=()=>t.sort||"score",X=()=>t.userStatus||"",j=()=>{if(t.isAdult==="true")return!0;if(t.isAdult==="false")return!1};let K;function ae(){if(!window.Worker)return;K=K instanceof Worker?K:new T2;const Q={includeKeys:f(),excludeKeys:m(),search:k(),format:C(),status:b(),genre:A(),reverse:B(),countryOfOrigin:S(),missingStart:L(),missingScore:R(),isAdult:j(),year:+_()||void 0,private:T(),notes:I(),repeat:E(),reviewsNeeded:w(),sort:V(),type:r.type,userStatus:X()};K.postMessage(Q),$(!0),K.onmessage=J=>{if(J.data==="success"){const pe=qe.user();pe.onsuccess=ve=>{const fe=ve.target.result,q=qe.store(fe,"data","readonly").get("compare_list");q.onerror=()=>$(!1),q.onsuccess=He=>{$(!1),h(He.target.result||[])}}}else $(!1),console.error("Error")}}W(ae),document.title=`Compare ${r.type} - LOB`;const re=pn();return i(Bc.Provider,{value:{compareMediaList:c,includeKeys:f,setIncludeKeys:g,setExcludeKeys:y,users:l,storeUsers:o,loading:v},get children(){var Q=G2(),J=Q.firstChild,pe=J.firstChild,ve=J.nextSibling,fe=ve.firstChild,ee=fe.nextSibling,q=ee.firstChild,He=q.nextSibling,De=ee.nextSibling,Be=De.firstChild,et=Be.nextSibling,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=De.nextSibling,Dt=dt.firstChild,ft=Dt.nextSibling,te=dt.nextSibling,Z=te.firstChild,_e=Z.nextSibling,ke=te.nextSibling,it=ke.firstChild,_t=it.nextSibling,Ie=ke.nextSibling,Ve=Ie.firstChild,st=Ve.nextSibling,Rn=Ie.nextSibling,rr=Rn.nextSibling,ar=rr.firstChild;ar.nextSibling;var ir=rr.nextSibling,Br=ir.firstChild,Nn=ir.nextSibling,On=Nn.firstChild,lt=Nn.nextSibling,ln=lt.firstChild,sr=ln.nextSibling,Ur=sr.nextSibling,Ai=Ur.nextSibling,Vr=Ai.nextSibling,lr=Vr.nextSibling,Ti=lr.nextSibling;Ti.nextSibling;var Fn=lt.nextSibling,xi=Fn.firstChild,on=xi.nextSibling,je=on.nextSibling;return je.firstChild,d(Q,i(fw,{}),J),d(pe,i(H,{each:s,children:he=>i(mw,{name:he})})),fe.$$input=he=>n({search:he.target.value||void 0}),d(ve,i(x,{get when(){},get children(){var he=E2(),cn=he.firstChild,nn=cn.firstChild,Gr=nn.firstChild;return nn.$$click=()=>re(""),d(nn,i(x,{get when(){return r.list===void 0},children:"> "}),Gr),d(nn,()=>null.data.total,null),d(he,i(H,{get each(){return null.data.lists},children:Bn=>(()=>{var Hr=H2(),Un=Hr.firstChild,St=Un.firstChild;return Un.$$click=()=>re(Bn.name),d(Un,i(x,{get when(){return decodeURI(r.list)===Bn.name},children:"> "}),St),d(Un,()=>Bn.name,St),d(Un,()=>Bn.entries.length,null),Hr})()}),null),he}}),ee),ee.addEventListener("change",he=>n({format:he.target.value||void 0})),d(ee,i(x,{get when(){return C()},get children(){return L2()}}),He),De.addEventListener("change",he=>n({userStatus:he.target.value||void 0})),d(De,i(x,{get when(){return X()},get children(){return P2()}}),et),d(Pt,i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Watching"}),i(M,{get when(){return r.type==="manga"},children:"Reading"})]}})),d(at,i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatching"}),i(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})),dt.addEventListener("change",he=>n({status:he.target.value||void 0})),d(dt,i(x,{get when(){return b()},get children(){return M2()}}),ft),te.addEventListener("change",he=>n({genre:he.target.value||void 0})),d(te,i(x,{get when(){return A()},get children(){return D2()}}),_e),ke.addEventListener("change",he=>n({countryOfOrigin:he.target.value||void 0})),d(ke,i(x,{get when(){return S()},get children(){return R2()}}),_t),Ie.addEventListener("change",he=>n({isAdult:he.target.value||void 0})),d(Ie,i(x,{get when(){return j()!==void 0},get children(){return N2()}}),st),Rn.$$input=he=>n({year:he.target.value||void 0}),ar.addEventListener("change",he=>n({repeat:he.target.checked?"true":void 0})),d(rr,i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatched"}),i(M,{get when(){return r.type==="manga"},children:"Reread"})]}}),null),Br.addEventListener("change",he=>n({missingScore:he.target.checked?void 0:"false"})),On.addEventListener("change",he=>n({reverse:he.target.checked?"true":void 0})),lt.addEventListener("change",he=>n({sort:he.target.value==="score"?void 0:he.target.value})),d(lt,i(x,{get when(){return r.type==="manga"},get children(){return O2()}}),ln),d(lt,i(x,{get when(){return r.type==="anime"},get children(){return F2()}}),sr),d(lr,i(z,{get children(){return[i(M,{get when(){return r.type==="anime"},children:"Rewatches"}),i(M,{get when(){return r.type==="manga"},children:"Rereads"})]}})),d(lt,i(x,{get when(){return r.type==="manga"},get children(){return B2()}}),null),on.$$input=he=>n({reviewsNeeded:he.target.value==f().length?void 0:he.target.value}),on.$$beforeinput=he=>{var cn;(cn=he.data)!=null&&cn.toLowerCase().includes("e")&&he.preventDefault()},on.addEventListener("blur",he=>n({reviewsNeeded:Number(he.target.value)>=f().length?void 0:+he.target.value||""})),d(je,i(xt,{tipPosition:"bottom",get children(){return["Count of how many users need to have the ",N(()=>r.type)," on their list ",U2()]}}),null),d(ve,i(z,{get children(){return i(M,{get when(){return new URLSearchParams(e.search).keys().some(he=>he!=="user")},get children(){var he=V2();return he.$$click=()=>{n({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,reviewsNeeded:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0})},he.style.setProperty("background","var(--crimson-400)"),he}})}}),null),d(Q,i(pw,{}),null),P(he=>{var cn=f().length,nn=f().length+" (All)";return cn!==he.e&&G(on,"max",he.e=cn),nn!==he.t&&G(on,"placeholder",he.t=nn),he},{e:void 0,t:void 0}),P(()=>fe.value=k()),P(()=>ee.value=C()||""),P(()=>De.value=X()||""),P(()=>dt.value=b()||""),P(()=>te.value=A()||""),P(()=>ke.value=S()||""),P(()=>Ie.value=j()===void 0?"":String(j())),P(()=>Rn.value=_()),P(()=>ar.checked=E()),P(()=>Br.checked=R()),P(()=>On.checked=B()),P(()=>lt.value=V()),P(()=>on.value=w()),Q}})}function fw(){const[e,t]=O(""),[n,r]=O(0),[s,a]=O(void 0),{accessToken:l}=ce(),[o,{mutate:c}]=ue.anilist.searchUsers(s,1,l),u=mn(a,300),[h,f]=xe();let g;W(le(n,y=>{const v=g==null?void 0:g.querySelectorAll("li")[y],$=g==null?void 0:g.querySelector("ol");if(!v||!$)return;const{height:k,top:C}=$.getBoundingClientRect(),{top:w,bottom:b}=v.getBoundingClientRect(),A=b-C-k;A>0&&($.scrollTop+=A);const S=w-C;S<0&&($.scrollTop+=S)}));function m(y){y=(y==null?void 0:y.trim())||"",y&&f({user:Kg([...vr(h.user).add(y)])}),Oe(()=>{u(void 0),c(void 0),r(0),t("")})}return(()=>{var y=Y2(),v=y.firstChild;y.addEventListener("submit",k=>{var C,w,b;k.preventDefault(),m(((b=(w=(C=o())==null?void 0:C.data.users)==null?void 0:w[n()])==null?void 0:b.name)||e())}),y.$$keydown=k=>{var w,b,A;const C=((A=(b=(w=o())==null?void 0:w.data)==null?void 0:b.users)==null?void 0:A.length)||0;C&&(k.key==="ArrowDown"?(k.preventDefault(),r(S=>(S+1)%C)):k.key==="ArrowUp"&&(k.preventDefault(),r(S=>(C+S-1)%C)))};var $=g;return typeof $=="function"?ge($,y):g=y,v.$$input=k=>{Oe(()=>{t(k.target.value),r(0),u(k.target.value.trim()||void 0),c(void 0)})},d(y,i(x,{get when(){return e()},get children(){var k=j2();return d(k,i(H,{get each(){var C;return(C=o())==null?void 0:C.data.users},children:(C,w)=>(()=>{var b=q2(),A=b.firstChild;return b.addEventListener("mouseenter",()=>r(w())),b.$$click=()=>m(C.name),d(b,()=>C.name,null),P(S=>{var _=n()===w(),T=C.avatar.large;return _!==S.e&&b.classList.toggle("selected",S.e=_),T!==S.t&&G(A,"src",S.t=T),S},{e:void 0,t:void 0}),b})()})),k}}),null),P(()=>v.value=e()),y})()}function mw(e){F(e.name,"Name is missing");const t=ne(),{setIncludeKeys:n,setExcludeKeys:r,storeUsers:s}=zs(),[a,l]=xe(),{accessToken:o}=ce(),[c,u]=lo(()=>!Jl(a.disabled,e.name)),[h,f]=lo(()=>Jl(a.exclude,e.name)),[g]=ue.anilist.mediaListByUserNameFetchOnce(()=>e.name,()=>t.type.toUpperCase(),o);function m(k,C){return c()&&h()===C?[...new Set([...k,g().cacheKey])]:k.filter(w=>w!==g().cacheKey)}function y(){n(k=>k.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),r(k=>k.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),l({user:Ke(a.user).filter(k=>k!==e.name)})}W(()=>{g()&&(s(g().data.user.name,g().data.user),g.indexedDBClosed&&(n(k=>m(k,!1)),r(k=>m(k,!0))))});const v=k=>{u(!k.target.checked),l({disabled:Xl(a.disabled,e.name,!k.target.checked)})},$=k=>{f(!k.target.checked),l({exclude:Xl(a.exclude,e.name,!k.target.checked)})};return(()=>{var k=Z2(),C=k.firstChild;return d(k,i(z,{get children(){return[i(M,{get when(){return g.error},get children(){var w=z2(),b=w.firstChild,A=b.nextSibling;return A.nextSibling,d(w,()=>e.name,A),w}}),i(M,{get when(){return g()||g.loading},get children(){return[i(x,{get when(){return g()},get fallback(){return i(Xn,{get children(){return i(xt,{tipPosition:"right",get children(){return Q2()}})}})},get children(){var w=W2();return P(b=>{var A=g().data.user.avatar.large,S=g().data.user.name+" profile picture";return A!==b.e&&G(w,"src",b.e=A),S!==b.t&&G(w,"alt",b.t=S),b},{e:void 0,t:void 0}),w}}),(()=>{var w=K2();return d(w,i(x,{get when(){return g()},get fallback(){return e.name},get children(){return g().data.user.name}})),w})(),(()=>{var w=J2(),b=w.firstChild,A=b.nextSibling,S=A.nextSibling;return S.firstChild,b.addEventListener("change",v),d(S,i(xt,{tipPosition:"bottom",children:"Disabling a user removes them from search and filtering, just like removing them."}),null),P(()=>b.checked=!c()),w})(),(()=>{var w=X2(),b=w.firstChild,A=b.nextSibling,S=A.nextSibling;return S.firstChild,b.addEventListener("change",$),d(S,i(xt,{tipPosition:"bottom",get children(){return["Filters out all ",N(()=>t.type)," from user ",N(()=>{var _,T,I;return((I=(T=(_=g())==null?void 0:_.data)==null?void 0:T.user)==null?void 0:I.name)||e.name})]}}),null),P(()=>b.checked=h()),w})()]}})]}}),C),C.$$click=()=>{var w;return y((w=g())==null?void 0:w.cacheKey)},P(w=>{var b=!c(),A=!!h();return b!==w.e&&k.classList.toggle("disabled",w.e=b),A!==w.t&&k.classList.toggle("exclude",w.t=A),w},{e:void 0,t:void 0}),k})()}function pw(){const{compareMediaList:e,loading:t,includeKeys:n}=zs(),[r]=xe(),s=ne();return[(()=>{var a=ew(),l=a.firstChild,o=l.nextSibling;return o.nextSibling,d(a,()=>s.type,o),d(a,()=>e().length,null),a})(),(()=>{var a=tw();return d(a,i(Xn,{}),null),d(a,i(x,{get when(){return e()},keyed:!0,get children(){return i(_w,{})}}),null),P(()=>a.classList.toggle("loading",!!t())),a})(),i(x,{get when(){return e().length===0},get children(){return i(z,{fallback:"No content",get children(){return[i(M,{get when(){return t()},children:"Loading content"}),i(M,{get when(){return!r.user},children:"No users selected"}),i(M,{get when(){return n().length===0},children:"All users are disabled"})]}})}})]}const[vw,$w]=We([]);function _w(){const{compareMediaList:e,users:t}=zs(),n=ne(),r=[];function s(c){r.push(c)}Pn(()=>{r.forEach(c=>o.observe(c))}),ze(()=>{o.disconnect()});const a={rootMargin:"500px"},l=c=>{for(const u of c)$w(u.target.dataset.index,u.isIntersecting)},o=new IntersectionObserver(l,a);return i(H,{get each(){return e()},children:(c,u)=>(()=>{var h=cw(),f=h.firstChild;return ge(s,h,()=>!0),d(f,i(x,{get when(){return vw[u()]&&c.id!==-1},get children(){return[i(x,{get when(){return c.bannerImage},get children(){var g=nw();return P(()=>G(g,"src",c.bannerImage)),g}}),(()=>{var g=lw(),m=g.firstChild,y=m.firstChild,v=y.firstChild;return d(m,i(x,{get when(){return c.repeat},get children(){var $=Qo();return d($,i(xt,{tipPosition:"right",get children(){return["Compined ",N(()=>n.type==="anime"?"rewatches":"rereads")," ",N(()=>c.repeat)]}}),null),d($,()=>c.repeat,null),d($,i(ci,{}),null),$}}),y),d(y,i(xt,{tipPosition:"right",children:"Global average score"}),v),d(y,i(ka,{}),v),d(y,()=>c.averageScore/10||"N/A",null),d(g,i(U,{class:"cover-link",get href(){return Ge(c)},get children(){var $=rw();return P(()=>G($,"src",c.coverImage.large)),$}}),null),d(g,i(x,{get when(){return c.episodes||c.chapters||c.volumes||c.score},get children(){var $=sw(),k=$.firstChild;return d(k,i(z,{get children(){return[i(M,{get when(){return n.type==="anime"},get children(){return i(x,{get when(){return c.episodes},get children(){return["Ep ",N(()=>c.episodes)]}})}}),i(M,{get when(){return n.type==="manga"},get children(){return[i(x,{get when(){return c.chapters},get children(){return["Ch ",N(()=>c.chapters)]}}),aw(),i(x,{get when(){return c.volumes},get children(){return["Vol ",N(()=>c.volumes)]}})]}})]}})),d($,i(x,{get when(){return c.score},get children(){var C=iw();return d(C,()=>Math.round(c.score*100)/100,null),d(C,i(xt,{tipPosition:"right",children:"Users average score"}),null),C}}),null),$}}),null),P(()=>G(g,"href",Ge(c))),g})(),(()=>{var g=ow(),m=g.firstChild,y=m.nextSibling,v=y.nextSibling;return d(m,()=>c.title.userPreferred),d(y,i(H,{get each(){return c.mediaEntries},children:$=>(()=>{var k=ec();return d(k,i(U,{get href(){return"/user/"+$.name},class:"name",get children(){return[(()=>{var C=dw();return P(()=>G(C,"src",t[$.name].avatar.large)),C})(),N(()=>$.name)]}}),null),d(k,i(x,{get when(){return $.status!=="COMPLETED"},get children(){var C=uw();return d(C,()=>Qg($.status,n.type)),C}}),null),d(k,i(x,{get when(){return $.repeat},get children(){var C=Qo();return d(C,()=>$.repeat,null),d(C,i(ci,{}),null),C}}),null),d(k,i(Tl,{get score(){return $.score},get format(){return t[$.name].mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),k})()})),d(v,i(x,{get when(){var $;return($=Object.entries(Kn.ani.media).find(([,k])=>k.api===c.format))==null?void 0:$[0]},children:$=>(()=>{var k=ec();return d(k,i(z,{get children(){return[i(M,{get when(){return c.countryOfOrigin!=="JP"},get children(){return i(U,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()+"&country="+c.countryOfOrigin},get children(){return[N(()=>Mr(c.format))," (",N(()=>Xs(c.countryOfOrigin)),")"]}})}}),i(M,{get when(){return c.countryOfOrigin==="JP"},get children(){return i(U,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()},get children(){return Mr(c.format)}})}})]}})),k})()}),null),d(v,i(z,{get children(){return[i(M,{get when(){return n.type==="manga"},get children(){return i(z,{get children(){return[i(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return i(U,{get href(){return"/search/manga?year="+c.startDate.year},get children(){return c.startDate.year}})}}),i(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return i(U,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),i(M,{get when(){return n.type==="anime"},get children(){return i(z,{get children(){return[i(M,{get when(){return c.seasonYear&&c.season},get children(){return i(U,{get href(){return"/search/anime/"+c.season.toLowerCase()+"-"+c.seasonYear},get children(){return[N(()=>Je(c.season))," ",N(()=>c.seasonYear)]}})}}),i(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return i(U,{get href(){return"/search/anime?year="+c.startDate.year},get children(){return c.startDate.year}})}}),i(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return i(U,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}}),null),g})()]}})),P(g=>{var m=u(),y=c.coverImage.color;return m!==g.e&&G(h,"data-index",g.e=m),y!==g.t&&((g.t=y)!=null?h.style.setProperty("--color",y):h.style.removeProperty("--color")),g},{e:void 0,t:void 0}),h})()})}$e(["input","click","beforeinput","keydown"]);var bw=p("<button>Watch trailer"),yw=p("<iframe frameborder=0 allowfullscreen>"),ww=p("<dialog class=cp-trailer-dialog><div class=wrapper><form method=dialog class=close><button>Close trailer");function Wu(e){const[t,n]=O(!1);let r;return i(x,{get when(){return e.id},get children(){return[(()=>{var s=bw();return s.$$click=()=>{r.showModal(),n(!0)},s})(),(()=>{var s=ww(),a=s.firstChild,l=a.firstChild;s.$$click=c=>c.target===r&&r.close();var o=r;return typeof o=="function"?ge(o,s):r=s,s.addEventListener("close",()=>n(!1)),d(a,i(x,{get when(){return t()},get children(){return i(z,{get children(){return i(M,{get when(){return e.site==="youtube"},get children(){var c=yw();return P(()=>G(c,"src","https://www.youtube-nocookie.com/embed/"+e.id+"?enablejsapi=1&wmode=opaque&autoplay=1")),c}})}})}}),l),s})()]}})}$e(["click"]);var kw=p("<div data-k-0bff354a class=scores><div data-k-0bff354a><p data-k-0bff354a>Mean</p><span data-k-0bff354a></span></div><div data-k-0bff354a><p data-k-0bff354a>Average</p><span data-k-0bff354a></span></div><p data-k-0bff354a class=anilist-users> Users</p><div data-k-0bff354a><p data-k-0bff354a>MAL</p><span data-k-0bff354a></span></div><p data-k-0bff354a> Users");function Ku(){const{anilistData:e,jikanData:t}=vn();return(()=>{var n=kw(),r=n.firstChild,s=r.firstChild,a=s.nextSibling,l=r.nextSibling,o=l.firstChild,c=o.nextSibling,u=l.nextSibling,h=u.firstChild,f=u.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling,v=y.firstChild;return d(a,i(x,{get when(){var $,k;return((k=($=e())==null?void 0:$.data)==null?void 0:k.meanScore)>0},fallback:"N/A",get children(){var $,k;return((((k=($=e())==null?void 0:$.data)==null?void 0:k.meanScore)||0)/10).toFixed(1)}})),d(c,i(x,{get when(){var $,k;return((k=($=e())==null?void 0:$.data)==null?void 0:k.averageScore)>0},fallback:"N/A",get children(){var $,k;return((((k=($=e())==null?void 0:$.data)==null?void 0:k.averageScore)||0)/10).toFixed(1)}})),d(u,i(x,{get when(){var $,k,C;return(C=(k=($=e())==null?void 0:$.data)==null?void 0:k.stats.scoreDistribution)==null?void 0:C.reduce((w,b)=>b.amount+w,0)},fallback:"-",get children(){var $,k,C;return fa((C=(k=($=e())==null?void 0:$.data)==null?void 0:k.stats.scoreDistribution)==null?void 0:C.reduce((w,b)=>b.amount+w,0))}}),h),d(m,i(z,{fallback:"N/A",get children(){return[i(M,{get when(){return t.loading},children:"..."}),i(M,{get when(){var $;return(($=t())==null?void 0:$.data.score)>0},get children(){return(t().data.score||0).toFixed(2)}})]}})),d(y,i(x,{get when(){var $,k;return(k=($=t())==null?void 0:$.data)==null?void 0:k.scored_by},fallback:"-",get children(){return fa(t().data.scored_by)}}),v),n})()}var Sw=p('<svg class=svg-external-source xmlns=http://www.w3.org/2000/svg viewBox="4 3 17 17"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7">');function Ju(){return Sw()}var Cw=p('<svg aria-hidden=true class=svg-link focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">');function Aw(){return Cw()}var Tw=p("<li data-k-e748b7cf><a data-k-e748b7cf target=_blank>"),xw=p("<div data-k-e748b7cf class=external><h2 data-k-e748b7cf>External links</h2><ul data-k-e748b7cf>"),Iw=p('<img data-k-e748b7cf alt="Site favicon.">'),Ew=p("<sup data-k-e748b7cf>"),Lw=p("<li data-k-e748b7cf class=cp-external-link><div data-k-e748b7cf class=icon></div><span data-k-e748b7cf><a data-k-e748b7cf target=_blank>");function Xu(e){return i(ct,{fallback:"External links error",get children(){return i(x,{get when(){var t;return e.hastag||((t=e.externalLinks)==null?void 0:t.length)},get children(){var t=xw(),n=t.firstChild,r=n.nextSibling;return d(r,i(x,{get when(){return e.hashtag},get children(){var s=Tw(),a=s.firstChild;return d(a,()=>e.hashtag),P(()=>G(a,"href",`https://nitter.net/search?q=${e.hashtag.replaceAll("#","%23")}`)),s}}),null),d(r,i(H,{get each(){return e.externalLinks},children:s=>(()=>{var a=Lw(),l=a.firstChild,o=l.nextSibling,c=o.firstChild;return d(l,i(x,{get when(){return s.icon},get fallback(){return i(Aw,{})},get children(){var u=Iw();return P(()=>G(u,"src",s.icon)),u}})),d(c,()=>s.site||s.name),d(o,i(x,{get when(){return s.language},get children(){var u=Ew();return d(u,i(z,{get fallback(){return s.language},get children(){return[i(M,{get when(){return s.language==="Japanese"},children:"JP"}),i(M,{get when(){return s.language==="English"},children:"EN"})]}})),u}}),null),d(o,i(x,{get when(){return s.notes},get children(){return[" (",N(()=>s.notes),")"]}}),null),P(u=>{var h=s.color,f=s.url;return h!==u.e&&((u.e=h)!=null?l.style.setProperty("background",h):l.style.removeProperty("background")),f!==u.t&&G(c,"href",u.t=f),u},{e:void 0,t:void 0}),a})()}),null),t}})}})}var Pw=p("<span class=visually-hidden>Switch to anilist mode"),Mw=p("<div><h2>Studios</h2><ol>"),Dw=p("<div><h2>Producers</h2><ol>"),Rw=p("<aside class=left><img alt=Cover><div class=cp-media-api-switcher><a class=active target=_black><span class=visually-hidden>Go to MyAnimeList"),Nw=p("<li>Source: "),Ow=p("<div class=header><h1></h1><ul class=flex-bullet-separator><li></li><li></li><li></li></ul><ul><li>Members: </li><li>Ranked: #</li><li>Popularity: #"),Fw=p("<div class=pg-media-info-jikan><div class=body>"),tc=p("<li><a target=_black>"),Bw=p("<li>Author<!>: "),Uw=p("<a>"),Vw=p("<div class=pg-media-jikan-desc>"),Gw=p("<div><strong>Background"),Hw=p("<div class=relations><h2>Relations</h2><ol class=grid-column-auto-fill>"),jw=p("<h2>Characters"),nc=p("<div><ol class=grid-column-auto-fill>"),Yw=p("<h2>Staff"),qw=p('<p class="name line-clamp">'),zw=p("<p class=type> (<!>)"),Ww=p("<li>");function Kw(e){const t=ne(),{accessToken:n}=ce(),r=Me(gd,()=>t.type,()=>t.id),s=xn({"only-if-cached":()=>bi()}),[a]=En(s,r),l=Me(dd,n,()=>t.type,()=>t.id),[o,{mutateBoth:c}]=nt(l),[u,h]=O();P(le(o,g=>{var m;h(((m=g==null?void 0:g.data)==null?void 0:m.isFavourite)??!1)}));const f=(g,m)=>{var v,$,k,C;const y=m[($=(v=o())==null?void 0:v.data)==null?void 0:$.type]??null;((C=(k=o())==null?void 0:k.data)==null?void 0:C.id)===y&&(h(g),c(w=>(w.data.isFavourite=g,w)))};return i(ct,{fallback:"Jikan media error",get children(){return i(Ws.Provider,{value:{anilistData:o,jikanData:a},get children(){var g=Fw(),m=g.firstChild;return d(g,i(x,{get when(){return a()},get children(){var y=Rw(),v=y.firstChild,$=v.nextSibling,k=$.firstChild;return k.firstChild,d($,i(x,{get when(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get children(){return i(U,{get href(){var C,w,b,A;return"/ani/"+t.type+"/"+((w=(C=o())==null?void 0:C.data)==null?void 0:w.id)+"/"+Jn((A=(b=o())==null?void 0:b.data)==null?void 0:A.title.userPreferred)},get children(){return[Pw(),i(wl,{})]}})}}),k),d(k,i(kl,{}),null),d(k,i(Ju,{}),null),d(y,i(Ku,{}),null),d(y,i(Fr,{get checked(){return u()},onChange:h,get idType(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.type},get variableId(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get anilistValue(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.favourites},get jikanValue(){var C;return(C=a())==null?void 0:C.data.favorites},mutateCache:f}),null),d(y,i(Wu,{get id(){var C,w;return(w=(C=a())==null?void 0:C.data.trailer)==null?void 0:w.youtube_id},site:"youtube"}),null),d(y,i(x,{get when(){var C,w;return(w=(C=a())==null?void 0:C.data.studios)==null?void 0:w.length},get children(){var C=Mw(),w=C.firstChild,b=w.nextSibling;return d(b,i(H,{get each(){var A;return(A=a())==null?void 0:A.data.studios},children:A=>(()=>{var S=tc(),_=S.firstChild;return d(_,()=>A.name),P(()=>G(_,"href",A.url)),S})()})),C}}),null),d(y,i(x,{get when(){var C,w;return(w=(C=a())==null?void 0:C.data.producers)==null?void 0:w.length},get children(){var C=Dw(),w=C.firstChild,b=w.nextSibling;return d(b,i(H,{get each(){var A;return(A=a())==null?void 0:A.data.producers},children:A=>(()=>{var S=tc(),_=S.firstChild;return d(_,()=>A.name),P(()=>G(_,"href",A.url)),S})()})),C}}),null),d(y,i(Xu,{get externalLinks(){var C;return(C=a())==null?void 0:C.data.external}}),null),P(C=>{var A;var w=a().data.images.webp.large_image_url,b=(A=a())==null?void 0:A.data.url;return w!==C.e&&G(v,"src",C.e=w),b!==C.t&&G(k,"href",C.t=b),C},{e:void 0,t:void 0}),y}}),m),d(m,i(x,{get when(){return a()},get children(){var y=Ow(),v=y.firstChild,$=v.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,b=$.nextSibling,A=b.firstChild;A.firstChild;var S=A.nextSibling;S.firstChild;var _=S.nextSibling;return _.firstChild,d(v,()=>a().data.title),d(k,i(z,{get children(){return[i(M,{get when(){return N(()=>!!a().data.year)()&&a().data.season},get children(){return i(U,{get href(){return"/search/"+t.type+"?year="+a().data.year+"&season="+a().data.season+"&malSearch=true"},get children(){return[N(()=>Ql(a().data.season))," ",N(()=>a().data.year)]}})}}),i(M,{get when(){return a().data.season},get children(){return i(U,{get href(){return"/search/"+t.type+"?season="+a().data.season+"&malSearch=true"},get children(){return Ql(a().data.season)}})}}),i(M,{get when(){return a().data.year},get children(){return i(U,{get href(){return"/search/"+t.type+"?year="+a().data.year+"&malSearch=true"},get children(){return a().data.year}})}}),i(M,{get when(){var T,I,E,L,R,B;return((E=(I=(T=a().data.aired)==null?void 0:T.prop)==null?void 0:I.from)==null?void 0:E.year)||((B=(R=(L=a().data.published)==null?void 0:L.prop)==null?void 0:R.from)==null?void 0:B.year)},children:T=>i(U,{get href(){return"/search/"+t.type+"?year="+T()+"&malSearch=true"},get children(){return T()}})}),i(M,{get when(){var T,I,E,L,R,B;return((E=(I=(T=a().data.aired)==null?void 0:T.prop)==null?void 0:I.to)==null?void 0:E.year)||((B=(R=(L=a().data.published)==null?void 0:L.prop)==null?void 0:R.to)==null?void 0:B.year)},children:T=>i(U,{get href(){return"/search/"+t.type+"?year="+T()+"&malSearch=true"},get children(){return T()}})}),i(M,{get when(){return a().data.status==zc},get children(){return i(U,{get href(){return"/search/"+t.type+"/tba"},children:"TBA"})}})]}})),d(C,i(U,{get href(){return"/search/"+t.type+"?format="+a().data.type.toLowerCase()+"&malSearch=true"},get children(){return a().data.type}})),d(w,()=>{var T;return hf((T=a())==null?void 0:T.data.status)}),d(b,i(x,{get when(){var T;return(T=a())==null?void 0:T.data.source},get children(){var T=Nw();return T.firstChild,d(T,i(U,{get href(){return"/search/"+t.type+"?source="+a().data.source},get children(){var I;return(I=a())==null?void 0:I.data.source}}),null),T}}),A),d(A,()=>fa(a().data.members||0)||"N/A",null),d(S,()=>a().data.rank||"N/A",null),d(_,()=>a().data.popularity||"N/A",null),d(b,i(x,{get when(){var T;return(T=a().data.authors)==null?void 0:T.length},children:T=>(()=>{var I=Bw(),E=I.firstChild,L=E.nextSibling;return L.nextSibling,d(I,()=>mf(T()),L),d(I,i(H,{get each(){return a().data.authors},children:(R,B)=>[(()=>{var V=Uw();return d(V,()=>R.name),P(()=>G(V,"href",R.url)),V})(),i(x,{get when(){return B()<T()-1},children:" & "})]}),null),I})()}),null),y}}),null),d(m,()=>e.children,null),g}})}})}function Jw(){const e=ne(),{jikanData:t}=vn(),n=Me(fd,()=>e.type,()=>e.id),r=xn({"only-if-cached":()=>bi()||t.loading}),[s]=En(r,n),a=Me(md,()=>e.type,()=>e.id),l=xn({"only-if-cached":()=>Fm()||s.loading}),[o]=En(l,a);return[i(x,{get when(){return t()},get children(){return[i(x,{get when(){return t().data.synopsis},get children(){var c=Vw();return d(c,i(si,{get text(){return t().data.synopsis},singleLineBreaks:!0})),c}}),i(x,{get when(){return t().data.background},get children(){var c=Gw();return c.firstChild,d(c,i(si,{get text(){return t().data.background}}),null),c}}),i(x,{get when(){var c;return(c=t().data.relations)==null?void 0:c.length},get children(){var c=Hw(),u=c.firstChild,h=u.nextSibling;return d(h,i(H,{get each(){return t().data.relations},children:f=>i(H,{get each(){return f.entry},children:g=>(()=>{var m=Ww();return d(m,i(U,{class:"item",get href(){return sd(g.type,{mal_id:g.mal_id,title:g.name})},get children(){return[(()=>{var y=qw();return d(y,()=>g.name),y})(),(()=>{var y=zw(),v=y.firstChild,$=v.nextSibling;return $.nextSibling,d(y,()=>f.relation,v),d(y,()=>Dr(g.type),$),y})()]}})),m})()})})),c}}),i(x,{get when(){return s()},get children(){var c=nc(),u=c.firstChild;return d(c,i(U,{href:"characters",get children(){return jw()}}),u),d(u,i(H,{get each(){return s().data.slice(0,6)},children:({voice_actors:h,...f})=>i(Cu,Fe({get voiceActor(){return Jg(h,({language:g})=>g===qc)}},f))})),c}}),i(x,{get when(){return o()},get children(){var c=nc(),u=c.firstChild;return d(c,i(U,{href:"staff",get children(){return Yw()}}),u),d(u,i(H,{get each(){return o().data.slice(0,6)},children:({person:h,positions:f})=>i(yl,{staff:h,positions:f})})),c}}),N(()=>console.log("jikan",t()))]}}),N(()=>console.log("characters",s()))]}let Os,Fs;function Xw({target:e}){const t=e.querySelector("[data-tooltip-positions]");t&&(Os=t,di(t))}function Zu(){Fs&&di(Fs),Os&&di(Os)}let is;function Qu({target:e}){if(e===is||!e)return;is=e;const t=e.matches("[data-tooltip-trigger]")?e:e.closest("[data-tooltip-trigger]");if(!t)return;const n=t.querySelector("[data-tooltip-positions]");let r=0;s();function s(){t.matches(":hover")?(Fs=n,di(n)):(r++<500||is!==e)&&requestAnimationFrame(s)}}function di(e){const t=e.dataset.tooltipPositions.split(" "),n=e.closest("[data-tooltip-wrapper]"),r=n==null?void 0:n.getBoundingClientRect(),s=document.body.getBoundingClientRect(),a=e.classList.value;for(const l of t){e.classList.remove(...t),e.classList.add(l);let o=e.getBoundingClientRect();if(!(r&&(o.left<r.left||o.right>r.right||o.top<r.top||o.bottom>r.bottom))&&!(o.left<0||o.right>s.width||o.top<0||o.bottom>s.height))return}e.classList=a}window.addEventListener("focusin",Xw);window.addEventListener("pointermove",Qu);window.addEventListener("pointerdown",Qu);window.addEventListener("scroll",Zu,{passive:!0});window.addEventListener("resize",Zu,{passive:!0});var Zw=p("<select>"),Qw=p("<div><ol>"),ek=p("<option>");function tk(){const e=ne(),{jikanData:t}=vn(),n=Me(fd,()=>e.type,()=>e.id),r=xn({"only-if-cached":()=>bi()||t.loading}),[s]=En(r,n),[a,l]=Rd(qc),o=N(()=>{var f;const c=new Set,u=(f=s())==null?void 0:f.data;if(!(u!=null&&u.length))return[];u.forEach(g=>{var m;(m=g.voice_actors)==null||m.forEach(y=>c.add(y.language))});const h=[...c].sort();return l(g=>c.has(g)?g:h[0]),h});return i(ct,{fallback:"MAL characters error",get children(){return i(x,{get when(){return t()},get children(){return i(x,{get when(){return s()},get children(){var c=Qw(),u=c.firstChild;return d(c,i(x,{get when(){return o().length},get children(){var h=Zw();return h.addEventListener("change",f=>l(f.target.value)),d(h,i(H,{get each(){return o()},children:f=>(()=>{var g=ek();return g.value=f,d(g,f),g})()})),P(()=>h.value=a()),h}}),u),d(u,i(H,{get each(){return s().data},children:({voice_actors:h,...f})=>i(Cu,Fe({get voiceActor(){return h==null?void 0:h.find(g=>g.language===a())},get language(){return a()}},f))})),P(()=>u.className=`grid-column-auto-fill ${e.type||""}`),c}})}})}})}var nk=p("<div><ol class=grid-column-auto-fill>");function rk(){const e=ne(),{jikanData:t}=vn(),n=Me(md,ba,()=>e.id),r=xn({"only-if-cached":()=>bi()||t.loading}),[s]=En(r,n);return i(ct,{fallback:"MAL staff page error",get children(){return i(x,{get when(){return t()},get children(){return i(x,{get when(){return s()},get children(){var a=nk(),l=a.firstChild;return d(l,i(H,{get each(){return s().data},children:({person:o,positions:c})=>i(yl,{staff:o,positions:c})})),a}})}})}})}var rc=p('<ol data-k-eb389524 class="grid-column-auto-fill card">'),ak=p("<ol data-k-eb389524 class=grid-column-auto-fill>"),ik=p('<div data-k-eb389524 class="page-normal pg-jikan-character"><div data-k-eb389524 class=header><img data-k-eb389524 alt="Character profile."><div data-k-eb389524 class=grid><div data-k-eb389524><h1 data-k-eb389524></h1><p data-k-eb389524></p></div></div><div data-k-eb389524>'),sk=p("<details data-k-eb389524 open><summary data-k-eb389524><h2 data-k-eb389524>");function lk(){const e=ne(),t=Me(Lf,()=>e.id),[n]=nt(t);return P(()=>{var s,a;const r=(a=(s=n())==null?void 0:s.data)==null?void 0:a.name;r&&(document.title=r)}),i(ct,{fallback:"Jikan character error",get children(){return i(x,{get when(){return n()},get children(){var r=ik(),s=r.firstChild,a=s.firstChild,l=a.nextSibling,o=l.firstChild,c=o.firstChild,u=c.nextSibling,h=l.nextSibling;return d(c,()=>n().data.name),d(u,()=>zg(n().data.name_kanji,n().data.nicknames).join(", ")),d(l,i(Fr,{get jikanValue(){return n().data.favorites}}),null),d(h,i(si,{get text(){return n().data.about},singleLineBreaks:!0})),d(r,i(ss,{title:"Anime",get children(){var f=rc();return d(f,i(H,{get each(){return n().data.anime},children:g=>i(Es,{type:"anime",get media(){return g.anime}})})),f}}),null),d(r,i(ss,{title:"Manga",get children(){var f=rc();return d(f,i(H,{get each(){return n().data.manga},children:g=>i(Es,{type:"manga",get media(){return g.manga}})})),f}}),null),d(r,i(ss,{title:"Voice actors",get children(){var f=ak();return d(f,i(H,{get each(){return n().data.voices},children:g=>i(yl,{get staff(){return g.person},get positions(){return[g.language]}})})),f}}),null),P(()=>G(a,"src",n().data.images.webp.image_url)),r}})}})}function ss(e){return(()=>{var t=sk(),n=t.firstChild,r=n.firstChild;return d(r,()=>e.title),d(t,()=>e.children,null),t})()}var ok=p("<div data-k-47610970><h3 data-k-47610970>Activity</h3><div data-k-47610970 class=activity-history-container><ol data-k-47610970 class=activity-history-header-list></ol><ol data-k-47610970 class=activity-history-list>"),ck=p("<li data-k-47610970 class=activity-history-header>"),dk=p("<li data-k-47610970 class=activity-item>"),uk=p("<p data-k-47610970>"),hk=p("<p data-k-47610970>Amount: ");function gk(e){const t=fk()/1e3,n=N(()=>{var u,h,f;const a=new Date/1e3,l=[];(u=e.history)==null||u.forEach((g,m,y)=>{var $;const v=g.date-uf(($=y[m-1])==null?void 0:$.date,t-cr);if(!(g.date<t||g.date>a+cr)){for(let k=Math.floor(v/cr)-1;k>0;k--)l.push({date:g.date-cr*k});l.push(g)}});const o=(f=(h=e.history)==null?void 0:h.at(-1))==null?void 0:f.date,c=Math.floor((a-o)/cr);for(let g=1;g<c;g++)l.push({date:o+cr*g});return l}),r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return i(x,{get when(){return e.history.at(-1).date>t},get children(){var a=ok(),l=a.firstChild,o=l.nextSibling,c=o.firstChild,u=c.nextSibling;return d(c,i(H,{each:r,children:(h,f)=>(()=>{var g=ck();return d(g,()=>Xg(r,f()+eh)),g})()})),d(u,i(H,{get each(){return n()},children:h=>(()=>{var f=dk();return d(f,i(s,{get date(){return h.date*1e3},get amount(){return h.amount}})),P(()=>G(f,"data-level",h.level)),f})()})),a}});function s(a){const l=o=>{if(o<(t+5184e3)*1e3)return"right";if(o>(t+10368e3)*1e3)return"left"};return i(xt,{get tipPosition(){return l(a.date)},get children(){return[(()=>{var o=uk();return d(o,()=>rd(a.date)),o})(),(()=>{var o=hk();return o.firstChild,d(o,()=>a.amount||0,null),o})()]}})}}const eh=1,fk=()=>{const[e]=new Date().toISOString().split("T"),t=new Date(`${e}T00:00`);return t.setDate(t.getDate()-182),t.setDate(t.getDate()-t.getDay()+eh),t.getTime()};var mk=p("<p>"),pk=p("<p> (fancy)"),vk=p("<p> (extra fancy)"),$k=p("<div class=user-favourites><h3>Favourite animes</h3><ol class=grid-reel-auto-fill>"),_k=p("<div class=user-favourites><h3>Favourite manga</h3><ol class=grid-reel-auto-fill>"),bk=p("<div class=user-favourites><h3>Favourite characters</h3><ol class=grid-reel-auto-fill>"),yk=p("<div class=user-favourites><h3>Favourite staff</h3><ol class=grid-reel-auto-fill>"),wk=p("<div class=user-favourites-studio><h3>Favourite studio</h3><ol>"),kk=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total anime</p></div><div class=profile-progress-item><p class=header></p><p>Days watched</p></div><div class=profile-progress-item><p class=header></p><p>Episodes watched</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),Sk=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total manga</p></div><div class=profile-progress-item><p class=header></p><p>Chapters read</p></div><div class=profile-progress-item><p class=header></p><p>Volumes read</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),Ck=p("<div class=user-profile-overview-body><div class=user-info-container></div><div class=user-activity-container><div class=user-profile-progress></div><div class=user-profile-genres></div><div class=user-profile-activity>"),Va=p("<img alt=Cover>"),mr=p("<li class=item>"),Ak=p("<div class=user-genres-overview><h3></h3><ol>"),Tk=p("<span>%");function xk(){const{user:e}=tt(),{accessToken:t}=ce(),[n,{mutateCache:r}]=ue.anilist.activityByUserId(()=>e().id||void 0,t);return(()=>{var s=Ck(),a=s.firstChild,l=a.nextSibling,o=l.firstChild,c=o.nextSibling,u=c.nextSibling;return d(a,i(z,{get children(){return[i(M,{get when(){return e().donatorTier===1},get children(){var h=mk();return d(h,()=>e().donatorBadge),h}}),i(M,{get when(){return e().donatorTier===2},get children(){var h=pk(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}}),i(M,{get when(){return e().donatorTier===3},get children(){var h=vk(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}})]}}),null),d(a,i(gk,{get history(){var h;return((h=e().stats)==null?void 0:h.activityHistory)||[]}}),null),d(a,i(x,{get when(){return e().favourites.anime.edges.length},get children(){var h=$k(),f=h.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.anime.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return Ge(m.node)},get children(){var v=Va();return P(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(a,i(x,{get when(){return e().favourites.manga.edges.length},get children(){var h=_k(),f=h.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.manga.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return Ge(m.node)},get children(){var v=Va();return P(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(a,i(x,{get when(){return e().favourites.characters.edges.length},get children(){var h=bk(),f=h.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.characters.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/character/"+m.node.id+"/"+Xe(m.node.name.userPreferred)},get children(){var v=Va();return P(()=>G(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(a,i(x,{get when(){return e().favourites.staff.edges.length},get children(){var h=yk(),f=h.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.staff.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/staff/"+m.node.id+"/"+Xe(m.node.name.userPreferred)},get children(){var v=Va();return P(()=>G(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(a,i(x,{get when(){return e().favourites.studios.edges.length},get children(){var h=wk(),f=h.firstChild,g=f.nextSibling;return d(g,i(H,{get each(){return e().favourites.studios.edges},children:m=>(()=>{var y=mr();return d(y,i(U,{get href(){return"/ani/studio/"+m.node.id+"/"+Xe(m.node.name)},get children(){return m.node.name}})),y})()})),h}}),null),d(o,i(x,{get when(){return e().statistics.anime.count},get children(){var h=kk(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,k=v.nextSibling,C=k.firstChild;return d(g,()=>ye(e().statistics.anime.count)),d(y,()=>(e().statistics.anime.minutesWatched/60/24).toFixed(1)),d($,()=>ye(e().statistics.anime.episodesWatched)),d(C,()=>e().statistics.anime.meanScore),h}}),null),d(o,i(x,{get when(){return e().statistics.manga.count},get children(){var h=Sk(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,k=v.nextSibling,C=k.firstChild;return d(g,()=>ye(e().statistics.manga.count)),d(y,()=>ye(e().statistics.manga.chaptersRead)),d($,()=>ye(e().statistics.manga.volumesRead)),d(C,()=>e().statistics.manga.meanScore),h}}),null),d(c,i(ac,{title:"Anime genre overview",type:"anime",get genres(){return e().statistics.anime.genrePreview},get total(){return e().statistics.anime.count}}),null),d(c,i(ac,{title:"Manga genre overview",type:"manga",get genres(){return e().statistics.manga.genrePreview},get total(){return e().statistics.manga.count}}),null),d(u,i(H,{get each(){var h;return(h=n())==null?void 0:h.data.data.Page.activities},children:h=>i($l,{activity:h,mutateCache:r,hideProfile:!0,small:!0})})),s})()}function ac(e){F(e.genres,"Genres missing"),F(e.title,"Title missing");const{user:t}=tt();return i(x,{get when(){return e.total},get children(){var n=Ak(),r=n.firstChild,s=r.nextSibling;return d(r,()=>e.title),d(s,i(H,{get each(){return e.genres},children:a=>(()=>{var l=mr();return d(l,i(U,{get href(){return"/user/"+t().name+"/"+e.type+"?genre="+a.genre},get children(){return[N(()=>a.genre)," ",(()=>{var o=Tk(),c=o.firstChild;return d(o,()=>Math.round(a.count/e.total*100),c),o})()]}})),l})()})),n}})}function Ik(e){return new Worker("/legendary-octo-barnacle/branches/rework-change-fetching-and-caching/assets/user-media-list-O67hlifX.js",{name:e==null?void 0:e.name})}var Ek=p("<button data-k-cd7ed032>+");function ls(e){const[t,n]=O(e.entry[e.progressKey]),{triggerProgressIncrease:r,isOwnProfile:s}=qs();return W(le(()=>e.entry,a=>n(a[e.progressKey]),{defer:!0})),[N(()=>e.label)," ",N(t),i(x,{get when(){return t()<e.entry.media[e.maxProgressKey]},get children(){return["/",N(()=>e.entry.media[e.maxProgressKey])]}}),i(x,{get when(){return s()},get children(){return i(x,{get when(){return e.entry.media[e.maxProgressKey]===null||t()<e.entry.media[e.maxProgressKey]},get children(){var a=Ek();return a.$$click=l=>{l.preventDefault(),n(o=>{const c=Math.min(e.entry.media[e.maxProgressKey]||o+1,o+1);return r(e.entry.media.id,c,e.progressKey),c})},a}})}})]}$e(["click"]);var Lk=p("<br>"),Pk=p("<p>");function Mk(e){return(()=>{var t=Pk();return d(t,i(z,{get children(){return[i(M,{get when(){return e.entry.media.type==="ANIME"},get children(){return i(ls,Fe(e,{label:"Ep",progressKey:"progress",maxProgressKey:"episodes"}))}}),i(M,{get when(){return e.entry.media.type==="MANGA"},get children(){return[i(ls,Fe(e,{label:"Ch",progressKey:"progress",maxProgressKey:"chapters"})),Lk(),i(ls,Fe(e,{label:"Vol",progressKey:"progressVolumes",maxProgressKey:"volumes"}))]}})]}})),t})()}var Dk=p("<div data-k-406f27d4>"),th=p("<h2 data-k-406f27d4>"),nh=p("<ol data-k-406f27d4 class=user-profile-media-list-grid>"),Rk=p('<div data-k-406f27d4 class="badge repeat">'),Nk=p('<div data-k-406f27d4 class="badge notes"><svg data-k-406f27d4 aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path data-k-406f27d4 fill=currentColor d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z">'),Ok=p("<p data-k-406f27d4 class=adult-warning>18+"),Fk=p("<div data-k-406f27d4 class=container><img data-k-406f27d4 class=cover alt=Cover.><div data-k-406f27d4 class=card-header></div><div data-k-406f27d4 class=card-footer><p data-k-406f27d4></p><div data-k-406f27d4 class=scores>"),rh=p("<li data-k-406f27d4 class=card>");function Bk(e){const[t,n]=We({}),r=ne(),{user:s}=tt(),{openEditor:a}=Ys(),{isOwnProfile:l}=qs(),o=u=>{for(const h of u)n(h.target.dataset.list,h.target.dataset.index,h.isIntersecting)},c=new IntersectionObserver(o,{rootMargin:"500px"});return ze(()=>{c.disconnect()}),W(()=>{var u,h;(u=e.listData())!=null&&u.data&&(ah[r.name]=(h=e.listData())==null?void 0:h.data.lists.map(f=>({name:f.name,entries:new Int8Array(f.entries.length)})))}),(()=>{var u=Dk();return d(u,i(x,{get when(){var h;return(h=e.listData())==null?void 0:h.data},get fallback(){return i(Uk,{})},get children(){return i(H,{get each(){return e.listData().data.lists},children:h=>(n(h.name,{}),i(x,{get when(){return N(()=>!!h.entries.length)()&&(!r.list||decodeURIComponent(r.list)===h.name)},get children(){return[(()=>{var f=th();return d(f,()=>h.name),f})(),(()=>{var f=nh();return d(f,i(H,{get each(){return h.entries},children:(g,m)=>{let y;return Pn(()=>c.observe(y)),ze(()=>c.unobserve(y)),(()=>{var v=rh(),$=y;return typeof $=="function"?ge($,v):y=v,d(v,i(x,{get when(){return t[h.name][m()]},get children(){return i(U,{class:"clean-link",get href(){return Ge(g.media)},get children(){var k=Fk(),C=k.firstChild,w=C.nextSibling,b=w.nextSibling,A=b.firstChild,S=A.nextSibling;return d(w,i(x,{get when(){return g.repeat},get children(){var _=Rk();return d(_,()=>g.repeat,null),d(_,i(ci,{}),null),P(()=>G(_,"label","Rewatched "+g.repeat+" times")),_}}),null),d(w,i(x,{get when(){return g.notes},get children(){var _=Nk();return P(()=>G(_,"label",g.notes)),_}}),null),d(b,i(x,{get when(){return g.media.isAdult},get children(){return Ok()}}),A),d(A,()=>g.media.title.userPreferred),d(S,i(Mk,{entry:g}),null),d(S,i(Tl,{get score(){return g.score},get format(){return s().mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),d(k,i(x,{get when(){return l()},get children(){return i(vu,{big:!0,label:"Edit media",onClick:_=>{_.preventDefault(),a({...g.media,mediaListEntry:g},{mutateMedia:T=>{T=Js(g,T),e.mutateMediaListCache(I=>{function E(L,R){const B=I.data.lists.findIndex(X=>X.name===L&&X.isCustomList===R);B===-1&&I.data.lists.push({name:L,isCustomList:!1,isCompletedList:!1,entries:[]});const V=I.data.lists.at(B);V.entries.push(T),e.listData().data.indecies[g.media.id].push([B===-1?I.data.lists.length-1:B,V.entries.length-1])}if(e.listData().data.indecies[g.media.id].forEach(([L,R])=>{I.data.lists[L].entries.splice(R,1)}),e.listData().data.indecies[g.media.id]=[],!T.hiddenFromStatusLists){const L=sh(T.status,r.type);E(L,!1)}for(const[L,R]of Object.entries(T.customLists??{}))R&&E(L,!0);return I},e.updateListInfo)},deleteMedia:()=>{e.mutateMediaListCache(T=>(e.listData().data.indecies[g.media.id].forEach(([I,E])=>{T.data.lists[I].entries.splice(E,1)}),T),e.updateListInfo)}})},get children(){return i(pu,{})}})}}),null),P(()=>G(C,"src",g.media.coverImage.large)),k}})}})),P(k=>{var C=m(),w=h.name;return C!==k.e&&G(v,"data-index",k.e=C),w!==k.t&&G(v,"data-list",k.t=w),k},{e:void 0,t:void 0}),v})()}})),f})()]}}))})}})),u})()}const ah={};function Uk(){const e=ne(),t=N(()=>ah[e.name]??[]);return i(H,{get each(){return t()},children:n=>i(x,{get when(){return N(()=>!!n.entries.length)()&&(!e.list||decodeURIComponent(e.list)===n.name)},get children(){return[(()=>{var r=th();return d(r,()=>n.name),r})(),(()=>{var r=nh();return d(r,i(H,{get each(){return n.entries},children:()=>rh()})),r})()]}})})}var Vk=p("<ol><li><button>All "),Gk=p("<li><button> ");function Hk(e){const t=ih(),n=ne();return i(x,{get when(){var r;return(r=e.listData())==null?void 0:r.data},get children(){var r=Vk(),s=r.firstChild,a=s.firstChild,l=a.firstChild;return a.$$click=()=>t(""),d(a,i(x,{get when(){return n.list===void 0},children:"> "}),l),d(a,()=>e.listData().data.total,null),d(r,i(H,{get each(){return e.listData().data.lists},children:o=>(()=>{var c=Gk(),u=c.firstChild,h=u.firstChild;return u.$$click=()=>t(encodeURIComponent(o.name)),d(u,i(x,{get when(){return decodeURIComponent(n.list)===o.name},children:"> "}),h),d(u,()=>o.name,h),d(u,()=>o.entries.length,null),c})()}),null),r}})}$e(["click"]);var jk=p("<option data-k-4ded799d value>All formats"),Yk=p("<option data-k-4ded799d value>Any User Status"),qk=p("<option data-k-4ded799d value>Any Status"),zk=p("<option data-k-4ded799d value>All genres"),Wk=p("<option data-k-4ded799d value>All countries"),Kk=p("<option data-k-4ded799d value>All ratings"),Jk=p("<option data-k-4ded799d value>All studios"),Xk=p("<select data-k-4ded799d name=studio><option data-k-4ded799d value hidden>Studio"),Zk=p("<option data-k-4ded799d value>All tags"),Qk=p("<label data-k-4ded799d for=private><input data-k-4ded799d type=checkbox name=private id=private> Private"),eS=p("<button data-k-4ded799d>Compare with your list"),tS=p("<button data-k-4ded799d>Open in compare page"),nS=p('<div data-k-4ded799d class=user-profile-media-list-search><input data-k-4ded799d type=text placeholder=Search><select data-k-4ded799d name=format><option data-k-4ded799d value hidden>Format</option><option data-k-4ded799d value=MOVIE>Movie</option><option data-k-4ded799d value=MUSIC>Music</option><option data-k-4ded799d value=ONA>Ona</option><option data-k-4ded799d value=OVA>Ova</option><option data-k-4ded799d value=SPECIAL>Special</option><option data-k-4ded799d value=TV>TV</option><option data-k-4ded799d value=TV_SHORT>TV short</option></select><select data-k-4ded799d name=userStatus><option data-k-4ded799d value hidden>User Status</option><option data-k-4ded799d value=COMPLETED>Completed</option><option data-k-4ded799d value=CURRENT></option><option data-k-4ded799d value=DROPPED>Dropped</option><option data-k-4ded799d value=PAUSED>Paused</option><option data-k-4ded799d value=PLANNING>Planning</option><option data-k-4ded799d value=REPEATING></option></select><select data-k-4ded799d name=status><option data-k-4ded799d value hidden>Status</option><option data-k-4ded799d value=RELEASING>Releasing</option><option data-k-4ded799d value=FINISHED>Finished</option><option data-k-4ded799d value=NOT_YET_RELEASED>Not Yet Released</option><option data-k-4ded799d value=CANCELLED>Cancelled</option></select><select data-k-4ded799d name=genre><option data-k-4ded799d value hidden>Genre</option><option data-k-4ded799d value=Action>Action</option><option data-k-4ded799d value=Adventure>Adventure</option><option data-k-4ded799d value=Comedy>Comedy</option><option data-k-4ded799d value=Drama>Drama</option><option data-k-4ded799d value=Ecchi>Ecchi</option><option data-k-4ded799d value=Fantasy>Fantasy</option><option data-k-4ded799d value=Hentai>Hentai</option><option data-k-4ded799d value=Horror>Horror</option><option data-k-4ded799d value="Mahou Shoujo">Mahou Shoujo</option><option data-k-4ded799d value=Mecha>Mecha</option><option data-k-4ded799d value=Music>Music</option><option data-k-4ded799d value=Mystery>Mystery</option><option data-k-4ded799d value=Psychological>Psychological</option><option data-k-4ded799d value=Romance>Romance</option><option data-k-4ded799d value=Sci-Fi>Sci-Fi</option><option data-k-4ded799d value="Slice of Life">Slice of Life</option><option data-k-4ded799d value=Sports>Sports</option><option data-k-4ded799d value=Supernatural>Supernatural</option><option data-k-4ded799d value=Thriller>Thriller</option></select><select data-k-4ded799d name=countryOfOrigin><option data-k-4ded799d value hidden>Country</option><option data-k-4ded799d value=CN>China</option><option data-k-4ded799d value=JP>Japan</option><option data-k-4ded799d value=KR>South Korea</option><option data-k-4ded799d value=TW>Taiwan</option></select><select data-k-4ded799d name=isAdult><option data-k-4ded799d value hidden>Age rating</option><option data-k-4ded799d value=false>R-17+</option><option data-k-4ded799d value=true>R-18</option></select><select data-k-4ded799d name=tag><option data-k-4ded799d value hidden>Tag</option></select><input data-k-4ded799d type=number placeholder="Release year"max=9999 min=0><label data-k-4ded799d for=notes><input data-k-4ded799d type=checkbox name=notes id=notes> Notes</label><label data-k-4ded799d for=repeat><input data-k-4ded799d type=checkbox name=repeat id=repeat> </label><label data-k-4ded799d for=missingStart><input data-k-4ded799d type=checkbox name=missingStart id=missingStart> Missing start date</label><label data-k-4ded799d for=missingScore><input data-k-4ded799d type=checkbox name=missingScore id=missingScore> Missing score</label><label data-k-4ded799d for=reverse><input data-k-4ded799d type=checkbox name=reverse id=reverse> Reverse order</label><select data-k-4ded799d name=sort><option data-k-4ded799d value=score>Score</option><option data-k-4ded799d value=title>Title</option><option data-k-4ded799d value=progress>Progress</option><option data-k-4ded799d value=updatedAt>Last Updated</option><option data-k-4ded799d value=startedAt>Start Date</option><option data-k-4ded799d value=completedAt>Completed Date</option><option data-k-4ded799d value=releaseDate>Release Date</option><option data-k-4ded799d value=averageScore>Average Score</option><option data-k-4ded799d value=popularity>Popularity</option><option data-k-4ded799d value=repeat>'),ic=p("<option data-k-4ded799d>"),rS=p("<button data-k-4ded799d>Remove filters"),aS=p("<button data-k-4ded799d>Back to home");function iS(e){const t=ih(),n=Qt(),{authUserData:r}=ce(),{isOwnProfile:s}=qs(),{user:a}=tt(),l=ne();return(()=>{var c=nS(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=h.nextSibling,y=m.firstChild,v=y.nextSibling,$=v.nextSibling,k=$.nextSibling,C=k.nextSibling,w=C.nextSibling,b=w.nextSibling,A=m.nextSibling,S=A.firstChild,_=S.nextSibling,T=A.nextSibling,I=T.firstChild,E=I.nextSibling,L=T.nextSibling,R=L.firstChild,B=R.nextSibling,V=L.nextSibling,X=V.firstChild,j=X.nextSibling,K=V.nextSibling;K.firstChild;var ae=K.nextSibling,re=ae.nextSibling,Q=re.firstChild,J=re.nextSibling,pe=J.firstChild;pe.nextSibling;var ve=J.nextSibling,fe=ve.firstChild,ee=ve.nextSibling,q=ee.firstChild,He=ee.nextSibling,De=He.firstChild,Be=He.nextSibling,et=Be.firstChild,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=at.nextSibling,Dt=dt.nextSibling,ft=Dt.nextSibling,te=ft.nextSibling;return u.$$input=Z=>e.setSearchParams({search:Z.target.value||void 0}),d(c,i(Hk,{get listData(){return e.listData}}),h),h.addEventListener("change",Z=>e.setSearchParams({format:Z.target.value||void 0})),d(h,i(x,{get when(){return e.format()},get children(){return jk()}}),g),m.addEventListener("change",Z=>e.setSearchParams({userStatus:Z.target.value||void 0})),d(m,i(x,{get when(){return e.userStatus()},get children(){return Yk()}}),v),d($,i(z,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Watching"}),i(M,{get when(){return l.type==="manga"},children:"Reading"})]}})),d(b,i(z,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatching"}),i(M,{get when(){return l.type==="manga"},children:"Rereading"})]}})),A.addEventListener("change",Z=>e.setSearchParams({status:Z.target.value||void 0})),d(A,i(x,{get when(){return e.status()},get children(){return qk()}}),_),T.addEventListener("change",Z=>e.setSearchParams({genre:Z.target.value||void 0})),d(T,i(x,{get when(){return e.genre()},get children(){return zk()}}),E),L.addEventListener("change",Z=>e.setSearchParams({countryOfOrigin:Z.target.value||void 0})),d(L,i(x,{get when(){return e.countryOfOrigin()},get children(){return Wk()}}),B),V.addEventListener("change",Z=>e.setSearchParams({isAdult:Z.target.value||void 0})),d(V,i(x,{get when(){return e.isAdult()!==void 0},get children(){return Kk()}}),j),d(c,i(x,{get when(){return l.type==="anime"},get children(){var Z=Xk();return Z.firstChild,Z.addEventListener("change",_e=>e.setSearchParams({studio:_e.target.value||void 0})),d(Z,i(x,{get when(){return e.studio()},get children(){return Jk()}}),null),d(Z,i(H,{get each(){var _e,ke;return(ke=(_e=e.listData())==null?void 0:_e.data)==null?void 0:ke.studios},children:_e=>(()=>{var ke=ic();return ke.value=_e,d(ke,_e),P(()=>ke.selected=_e==e.studio()),ke})()}),null),P(()=>Z.value=e.studio()),Z}}),K),K.addEventListener("change",Z=>e.setSearchParams({tag:Z.target.value||void 0})),d(K,i(x,{get when(){return e.tag()},get children(){return Zk()}}),null),d(K,i(H,{get each(){var Z,_e;return(_e=(Z=e.listData())==null?void 0:Z.data)==null?void 0:_e.tags},children:Z=>(()=>{var _e=ic();return _e.value=Z,d(_e,Z),P(()=>_e.selected=Z==e.tag()),_e})()}),null),ae.$$input=Z=>e.setSearchParams({year:Z.target.value||void 0}),d(c,i(x,{get when(){return s()},get children(){var Z=Qk(),_e=Z.firstChild;return _e.addEventListener("change",ke=>e.setSearchParams({private:ke.target.checked?"true":void 0})),P(()=>_e.checked=e.privateFilter()),Z}}),re),Q.addEventListener("change",Z=>e.setSearchParams({notes:Z.target.checked?"true":void 0})),pe.addEventListener("change",Z=>e.setSearchParams({repeat:Z.target.checked?"true":void 0})),d(J,i(z,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatched"}),i(M,{get when(){return l.type==="manga"},children:"Reread"})]}}),null),fe.addEventListener("change",Z=>e.setSearchParams({missingStart:Z.target.checked?"true":void 0})),q.addEventListener("change",Z=>e.setSearchParams({missingScore:Z.target.checked?"true":void 0})),De.addEventListener("change",Z=>e.setSearchParams({reverse:Z.target.checked?"true":void 0})),Be.addEventListener("change",Z=>e.setSearchParams({sort:Z.target.value==="score"?void 0:Z.target.value})),d(te,i(z,{get children(){return[i(M,{get when(){return l.type==="anime"},children:"Rewatches"}),i(M,{get when(){return l.type==="manga"},children:"Rereads"})]}})),d(c,i(z,{get children(){return[i(M,{get when(){var Z,_e;return N(()=>!s())()&&((_e=(Z=r())==null?void 0:Z.data)==null?void 0:_e.name)},get children(){return i(U,{get href(){return"/compare/"+l.type+"?user="+a().name+"&user="+r().data.name},get children(){return eS()}})}}),i(M,{when:!0,get children(){return i(U,{get href(){return"/compare/"+l.type+"?user="+a().name},get children(){return tS()}})}})]}}),null),d(c,i(o,{}),null),P(()=>u.value=e.search()),P(()=>h.value=e.format()||""),P(()=>m.value=e.userStatus()||""),P(()=>A.value=e.status()||""),P(()=>T.value=e.genre()),P(()=>L.value=e.countryOfOrigin()||""),P(()=>V.value=e.isAdult()===void 0?"":String(e.isAdult())),P(()=>K.value=e.tag()),P(()=>ae.value=e.year()),P(()=>Q.checked=e.notesFilter()),P(()=>pe.checked=e.rewatchedFilter()),P(()=>fe.checked=e.missingStartFilter()),P(()=>q.checked=e.missingScoreFilter()),P(()=>De.checked=e.reverse()),P(()=>Be.value=e.sort()),c})();function o(){return i(z,{get children(){return[i(M,{get when(){return n.search},get children(){var c=rS();return c.$$click=()=>{e.setSearchParams({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0,studio:void 0,tag:void 0})},c.style.setProperty("background","skyblue"),c}}),i(M,{get when(){return l.list},get children(){var c=aS();return c.$$click=()=>{t("")},c.style.setProperty("background","lime"),c}})]}})}}$e(["input","click"]);var sS=p("<div data-k-45f62037 class=user-profile-media-list-body>");const ih=()=>{const e=pn(),{user:t}=tt(),n=ne();return r=>{e(`/user/${t().name}/${n.type}${r?"/"+r:""}${location.search}`,{replace:!0})}};function sc(){const{user:e}=tt(),t=ne(),{accessToken:n,authUserData:r}=ce(),s=N(()=>Ef({token:n(),name:e().name,type:t.type})),a=xn({default:()=>ei()>2}),[l,{mutateCache:o}]=En(a,s),[c,u]=xe(),[h,f]=O({});let g;W(le(e,ae=>{ae&&(document.title=`${ae.name} ${t.type} - LOB`)})),document.title="Authentication - LOB";const m=ae=>{u(ae,{replace:!0})},y=()=>c.search||"",v=()=>c.format||"",$=()=>c.status||"",k=()=>c.genre||"",C=()=>c.countryOfOrigin||"",w=()=>{if(c.isAdult==="true")return!0;if(c.isAdult==="false")return!1},b=()=>c.year||"",A=()=>c.private==="true",S=()=>c.notes==="true",_=()=>c.repeat==="true",T=()=>c.missingStart==="true",I=()=>c.missingScore==="true",E=()=>c.reverse==="true",L=()=>c.sort||"score",R=()=>c.userStatus||"",B=()=>c.studio||"",V=()=>c.tag||"",X=ya(async(ae,re,Q)=>{F(Q,"Progress key is undefined");const J=await ue.anilist.mutateMedia(n(),{mediaId:ae,[Q]:re});J.status===200&&o(pe=>{function ve(fe,ee){const q=pe.data.lists.findIndex(De=>De.name===fe&&De.isCustomList===ee);q===-1&&pe.data.lists.push({name:fe,isCustomList:!1,isCompletedList:!1,entries:[]});const He=pe.data.lists.at(q);He.entries.push(J.data),h().data.indecies[ae].push([q===-1?pe.data.lists.length-1:q,He.entries.length-1])}if(h().data.indecies[ae].forEach(([fe,ee])=>{pe.data.lists[fe].entries.splice(ee,1)}),h().data.indecies[ae]=[],!J.data.hiddenFromStatusLists){const fe=sh(J.data.status,t.type);ve(fe,!1)}for(const[fe,ee]of Object.entries(J.data.customLists??{}))ee&&ve(fe,!0);return pe})},250,2),j=()=>{var ae,re;if(window.Worker&&((ae=l())!=null&&ae.data)){g=g instanceof Worker?g:new Ik;const Q={data:(re=l())==null?void 0:re.data,search:y(),format:v(),status:$(),genre:k(),reverse:E(),countryOfOrigin:C(),missingStart:T(),missingScore:I(),isAdult:w(),year:+b()||void 0,private:A(),notes:S(),repeat:_(),sort:L(),studio:B(),type:t.type,userStatus:R(),tag:V()};g.postMessage(Q),g.onmessage=f}};W(j),ze(()=>{g instanceof Worker&&g.terminate()});function K(){var ae;return e().id===((ae=r())==null?void 0:ae.data.id)}return i(Fc.Provider,{value:{triggerProgressIncrease:X,isOwnProfile:K},get children(){var ae=sS();return d(ae,i(iS,{listData:h,setSearchParams:m,search:y,format:v,status:$,genre:k,countryOfOrigin:C,isAdult:w,year:b,privateFilter:A,notesFilter:S,rewatchedFilter:_,missingStartFilter:T,missingScoreFilter:I,reverse:E,sort:L,userStatus:R,studio:B,tag:V}),null),d(ae,i(Bk,{listData:h,mutateMediaListCache:o,updateListInfo:j}),null),ae}})}function sh(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Je(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:F(!1,"Unkown status: "+e)}}var lS=p("<button data-k-1fe26ca9 class=cp-delete-favourite>Delete");function Xr(e){const{authUserData:t,accessToken:n}=ce(),{user:r}=tt();return F(e.onClick,"onClick is missing"),F(e.mutate,"mutate is missing"),i(x,{get when(){var s;return r().id===((s=t())==null?void 0:s.data.id)},get children(){var s=lS();return s.$$click=async a=>{a.preventDefault(),e.onClick(),(await ue.anilist.toggleFavourite(n(),{mangaId:e.mangaId,animeId:e.animeId,staffId:e.staffId,characterId:e.characterId,studioId:e.studioId})).status===200&&e.mutate()},s}})}$e(["click"]);var Ga=p("<img data-k-81c02ac9 alt=Cover>"),oS=p("<li data-k-81c02ac9>");function cS(e){const[t,n]=O(!1),{setAllEdges:r,type:s}=Vc(),a=l=>r(o=>o.filter(c=>c.node.id!==l));return(()=>{var l=oS();return d(l,i(z,{get children(){return[i(M,{when:s==="anime",get children(){return i(U,{get href(){return Ge(e.edge.node)},get children(){return[i(Xr,{get animeId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ga();return P(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),i(M,{when:s==="manga",get children(){return i(U,{get href(){return Ge(e.edge.node)},get children(){return[i(Xr,{get mangaId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ga();return P(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),i(M,{when:s==="characters",get children(){return i(U,{get href(){return"/ani/character/"+e.edge.node.id+"/"+Xe(e.edge.node.name.userPreferred)},get children(){return[i(Xr,{get characterId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ga();return P(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),i(M,{when:s==="staff",get children(){return i(U,{get href(){return"/ani/staff/"+e.edge.node.id+"/"+Xe(e.edge.node.name.userPreferred)},get children(){return[i(Xr,{get staffId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),(()=>{var o=Ga();return P(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),i(M,{when:s==="studios",get children(){return i(U,{get href(){return"/ani/studio/"+e.edge.node.id+"/"+Xe(e.edge.node.name)},get children(){return[i(Xr,{get studioId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>a(e.edge.node.id)}),N(()=>e.edge.node.name)]}})}})]}})),P(o=>{var c=!!t(),u=e.edge.node.id;return c!==o.e&&l.classList.toggle("hidden",o.e=c),u!==o.t&&G(l,"data-id",o.t=u),o},{e:void 0,t:void 0}),l})()}function lh(e){const{user:t}=tt(),{type:n,allEdges:r}=Vc(),{accessToken:s}=ce(),[a,l]=O(void 0),[o,{mutateCache:c}]=ue.anilist.favouritesByUserId(()=>t().id||void 0,e.page===1?()=>e.page:a,s);return W(()=>{var u,h,f,g;((h=(u=o())==null?void 0:u.data[n])==null?void 0:h.edges.length)>0&&Ae(r).splice((e.page-1)*25,25,...o().data[n].edges),e.page===1&&e.setVisible(((g=(f=o())==null?void 0:f.data[n])==null?void 0:g.edges.length)>0)}),W(le(r,u=>{Ae(o).data[n].edges=u.slice((e.page-1)*25,e.page*25),c(h=>h)},{defer:!0})),i($n,{rootMargin:"100px",onIntersection:()=>l(e.page),get loading(){return e.loading},fetchResponse:o,children:u=>[i(H,{get each(){var h;return(h=o())==null?void 0:h.data[n].edges},children:h=>i(cS,{edge:h})}),i(x,{get when(){return o().data[n].pageInfo.hasNextPage},get children(){return i(x,{when:u===!1,fallback:"Fetch cooldown",get children(){return i(lh,{get page(){return e.page+1},get loading(){return o.loading}})}})}})]})}var dS=p("<button data-k-05269ec0>Save"),uS=p("<button data-k-05269ec0>Cancel"),hS=p("<button data-k-05269ec0>Reorder"),gS=p("<details data-k-05269ec0 open><summary data-k-05269ec0><h3 data-k-05269ec0></h3></summary><ol data-k-05269ec0>");function Zr(e){F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(!1),[r,s]=O(!1),[a,l]=O([]),{accessToken:o,authUserData:c}=ce(),{user:u}=tt();let h,f,g,m;const y=()=>{s(!1),a().forEach(C=>{const w=h.querySelector(`li[data-id="${C.node.id}"]`);w&&h.append(w)})},v=C=>{if(!r())return;const w=C.target.closest("li");if(!w)return;w.classList.add("dragging");const b=w.getBoundingClientRect();if(C.type==="touchstart"){const A=C.touches[0];g=A.clientX-b.x,m=A.clientY-b.y}else g=C.clientX-b.x,m=C.clientY-b.y;f=w},$=C=>{var b,A;if(!r()||!f)return;if(C.type==="touchmove"){const S=C.touches[0],_=(b=document.elementFromPoint(S.clientX,S.clientY))==null?void 0:b.closest("li");_&&(f.nextElementSibling===_?_.after(f):_.before(f)),w()}else C.buttons===1&&((A=C.target)==null?void 0:A.tagName)==="LI"?f.nextElementSibling===C.target?C.target.after(f):C.target.before(f):C.buttons!==1&&k();C.buttons===1&&w();function w(){const S=f.getBoundingClientRect();let _=0,T=0,I=C.clientX,E=C.clientY;if(C.type==="touchmove"){const L=C.touches[0];I=L.clientX,E=L.clientY}f.style.transform&&([_,T]=f.style.transform.match(/-?[\d.]+(?=px)/g).map(Number)),f.style.transform=`translate(${_+(I-(S.x+g))}px, ${T+(E-(S.y+m))}px)`}},k=()=>{f&&(f.style.transform=null,f.classList.remove("dragging")),f=null};return(()=>{var C=gS(),w=C.firstChild,b=w.firstChild,A=w.nextSibling;return d(b,()=>e.title),d(w,i(x,{get when(){var S;return u().id===((S=c())==null?void 0:S.data.id)},get children(){return i(z,{get children(){return[i(M,{get when(){return r()},get children(){return[(()=>{var S=dS();return S.$$click=async()=>{const _=[...h.childNodes].map(E=>+E.dataset.id),T=_.map((E,L)=>L+1);let I;e.type==="anime"?I=await ue.anilist.mutateFavourites(o(),{animeIds:_,animeOrder:T}):e.type==="manga"?I=await ue.anilist.mutateFavourites(o(),{mangaIds:_,mangaOrder:T}):e.type==="studios"?I=await ue.anilist.mutateFavourites(o(),{studioIds:_,studioOrder:T}):e.type==="staff"?I=await ue.anilist.mutateFavourites(o(),{staffIds:_,staffOrder:T}):e.type==="characters"&&(I=await ue.anilist.mutateFavourites(o(),{characterIds:_,characterOrder:T})),I.status===200?(l(E=>{const L=Object.fromEntries(E.map((R,B)=>[R.node.id,B]));return E.map((R,B)=>E[L[_[B]]])}),s(!1)):(y(),console.error("mutation failed"))},S})(),(()=>{var S=uS();return S.$$click=y,S})()]}}),i(M,{get when(){return!r()},get children(){var S=hS();return S.$$click=()=>s(_=>!_),S}})]}})}}),null),A.$$touchstart=v,A.$$mousedown=v,A.$$touchend=k,A.$$touchmove=$,A.$$mousemove=$,ge(S=>h=S,A),d(A,i(Uc.Provider,{get value(){return{type:e.type,setAllEdges:l,allEdges:a}},get children(){return i(x,{get when(){return u().id},keyed:!0,get children(){return i(lh,{page:1,setVisible:n})}})}})),P(S=>{var _=!t(),T=!!r(),I=e.type!=="studios",E=e.type==="studios";return _!==S.e&&C.classList.toggle("hidden",S.e=_),T!==S.t&&A.classList.toggle("reorder",S.t=T),I!==S.a&&A.classList.toggle("grid",S.a=I),E!==S.o&&A.classList.toggle("flex",S.o=E),S},{e:void 0,t:void 0,a:void 0,o:void 0}),C})()}$e(["click","mousemove","touchmove","touchend","mousedown","touchstart"]);var fS=p("<div data-k-821c40e4 class=user-profile-favourites>");function mS(){const{user:e}=tt();return W(le(e,t=>{document.title=`${t.name} favourites - LOB`})),(()=>{var t=fS();return d(t,i(Zr,{title:"Favourite animes",type:"anime"}),null),d(t,i(Zr,{title:"Favourite characters",type:"characters"}),null),d(t,i(Zr,{title:"Favourite manga",type:"manga"}),null),d(t,i(Zr,{title:"Favourite staff",type:"staff"}),null),d(t,i(Zr,{title:"Favourite studios",type:"studios"}),null),t})()}var pS=p("<div data-k-011bdddf class=user-profile-stats-page><div data-k-011bdddf><ol data-k-011bdddf><li data-k-011bdddf>Anime stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li><li data-k-011bdddf>Manga stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li></ol></div><div data-k-011bdddf class=content>");function vS(e){const{user:t}=tt();return W(()=>{document.title=`${t().name} stats - LOB`}),(()=>{var n=pS(),r=n.firstChild,s=r.firstChild,a=s.firstChild,l=a.firstChild,o=l.nextSibling,c=o.firstChild,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling,g=f.nextSibling,m=g.nextSibling,y=a.nextSibling,v=y.firstChild,$=v.nextSibling,k=$.firstChild,C=k.nextSibling,w=C.nextSibling,b=w.nextSibling,A=r.nextSibling;return d(c,i(U,{get href(){return"/user/"+t().name+"/stats/anime/overview"},children:"Overview"})),d(u,i(U,{get href(){return"/user/"+t().name+"/stats/anime/genres"},children:"Genres"})),d(h,i(U,{get href(){return"/user/"+t().name+"/stats/anime/tags"},children:"Tags"})),d(f,i(U,{get href(){return"/user/"+t().name+"/stats/anime/voice-actors"},children:"Voice actors"})),d(g,i(U,{get href(){return"/user/"+t().name+"/stats/anime/studios"},children:"Studios"})),d(m,i(U,{get href(){return"/user/"+t().name+"/stats/anime/staff"},children:"Staff"})),d(k,i(U,{get href(){return"/user/"+t().name+"/stats/manga/overview"},children:"Overview"})),d(C,i(U,{get href(){return"/user/"+t().name+"/stats/manga/genres"},children:"Genres"})),d(w,i(U,{get href(){return"/user/"+t().name+"/stats/manga/tags"},children:"Tags"})),d(b,i(U,{get href(){return"/user/"+t().name+"/stats/manga/staff"},children:"Staff"})),d(A,()=>e.children),n})()}var $S=p("<div data-k-f2870773><h2 data-k-f2870773>Relations</h2><ol data-k-f2870773 class=grid-column-auto-fill>"),_S=p("<img data-k-f2870773 alt=Cover>"),bS=p("<div data-k-f2870773 class=content><span data-k-f2870773 class=type></span><span data-k-f2870773 class=line-clamp></span><p data-k-f2870773 class=flex-bullet-separator><span data-k-f2870773></span><span data-k-f2870773>"),yS=p("<li data-k-f2870773>");function wS(e){return i(ct,{fallback:"Anilist relations preview error",get children(){return i(x,{get when(){var t;return(t=e.relations)==null?void 0:t.edges.length},get children(){var t=$S(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.relations.edges},children:s=>(()=>{var a=yS();return d(a,i(U,{get href(){return ld(s.node)},class:"media-page-relation",get children(){return[(()=>{var l=_S();return P(()=>G(l,"src",s.node.coverImage.large)),l})(),(()=>{var l=bS(),o=l.firstChild,c=o.nextSibling,u=c.nextSibling,h=u.firstChild,f=h.nextSibling;return d(o,()=>s.relationType),d(c,()=>s.node.title.userPreferred),d(h,()=>$s(s.node.format)),d(f,()=>od(s.node.status)),l})()]}})),a})()})),t}})}})}const kS="_character-container_1mdg4_1",SS="_character_1mdg4_1",CS="_character-left_1mdg4_21",AS="_character-right_1mdg4_21",TS="_content_1mdg4_26",yn={characterContainer:kS,character:SS,characterLeft:CS,characterRight:AS,content:TS};var xS=p("<h2>Characters"),IS=p("<div><ol class=grid-column-auto-fill>"),ES=p("<img alt=Character>"),lc=p("<div><p></p><p>"),LS=p("<li>"),PS=p('<img alt="Voice actor">');const oc=(e,t)=>{const n=Xs(t);return n!=="Japanese"&&e.some(r=>r.voiceActors.some(s=>s.language===n))?n:"Japanese"};function MS(e){const t=Fe({characters:[],countryOfOrigin:"JP"},e),[n,r]=O(oc(t.characters,t.countryOfOrigin));return W(()=>{r(oc(t.characters,t.countryOfOrigin))}),i(ct,{fallback:"Characters error",get children(){return i(x,{get when(){return t.characters.length},get children(){var s=IS(),a=s.firstChild;return d(s,i(U,{href:"characters",get children(){return xS()}}),a),d(a,i(H,{get each(){return t.characters},children:l=>(()=>{var o=LS();return d(o,i(U,{get href(){return"/ani/character/"+l.node.id+"/"+Xe(l.node.name.userPreferred)},get class(){return yn.characterLeft},get children(){return[(()=>{var c=ES();return P(()=>G(c,"src",l.node.image.large)),c})(),(()=>{var c=lc(),u=c.firstChild,h=u.nextSibling;return d(u,()=>l.node.name.userPreferred),d(h,()=>l.role),P(f=>{var g=yn.content,m=yn.lineClamp;return g!==f.e&&Bt(c,f.e=g),m!==f.t&&Bt(u,f.t=m),f},{e:void 0,t:void 0}),c})()]}}),null),d(o,i(x,{get when(){return l.voiceActors.find(c=>c.language===n())},children:c=>i(U,{get href(){return"/ani/staff/"+c().id+"/"+Xe(c().name.userPreferred)},get class(){return yn.characterRight},get children(){return[(()=>{var u=lc(),h=u.firstChild,f=h.nextSibling;return d(h,()=>c().name.userPreferred),d(f,()=>c().language),P(g=>{var m=yn.content,y=yn.lineClamp;return m!==g.e&&Bt(u,g.e=m),y!==g.t&&Bt(h,g.t=y),g},{e:void 0,t:void 0}),u})(),(()=>{var u=PS();return P(()=>G(u,"src",c().image.large)),u})()]}})}),null),P(()=>Bt(o,yn.character)),o})()})),P(()=>Bt(s,yn.characterContainer)),s}})}})}var DS=p("<h2 data-k-b8cc53b3>Staff"),RS=p('<div data-k-b8cc53b3><ol data-k-b8cc53b3 class="grid-row-clamp grid-column-auto-fill">'),NS=p('<img data-k-b8cc53b3 alt="Staff profile">'),OS=p("<div data-k-b8cc53b3><p data-k-b8cc53b3></p><p data-k-b8cc53b3>"),FS=p("<li data-k-b8cc53b3>");function BS(e){return i(ct,{fallback:"Anilist staff preview error",get children(){return i(x,{get when(){return e.staff},get children(){var t=RS(),n=t.firstChild;return d(t,i(U,{href:"staff",get children(){return DS()}}),n),d(n,i(H,{get each(){return e.staff},children:r=>(()=>{var s=FS();return d(s,i(U,{get href(){return"/ani/staff/"+r.node.id+"/"+Jn(r.node.name.userPreferred)},get children(){return[(()=>{var a=NS();return P(()=>G(a,"src",r.node.image.large)),a})(),(()=>{var a=OS(),l=a.firstChild,o=l.nextSibling;return d(l,()=>r.node.name.userPreferred),d(o,()=>r.role),a})()]}})),s})()})),t}})}})}var US=p("<p class=friend-list-status>");function VS(e){return(()=>{var t=US();return d(t,i(z,{get fallback(){return e.friend.status},get children(){return[i(M,{get when(){return e.friend.status==="COMPLETED"},children:"Completed"}),i(M,{get when(){return e.friend.status==="CURRENT"},get children(){return i(z,{get children(){return[i(M,{get when(){return e.type==="ANIME"},children:"Watching"}),i(M,{get when(){return e.type==="MANGA"},children:"Reading"})]}})}}),i(M,{get when(){return e.friend.status==="DROPPED"},children:"Dropped"}),i(M,{get when(){return e.friend.status==="PAUSED"},children:"Paused"}),i(M,{get when(){return e.friend.status==="PLANNING"},children:"Planning"}),i(M,{get when(){return e.friend.status==="REPEATING"},get children(){return i(z,{get children(){return[i(M,{get when(){return e.type==="ANIME"},children:"Rewatching"}),i(M,{get when(){return e.type==="MANGA"},children:"Rereading"})]}})}})]}}),null),d(t,i(x,{get when(){return e.friend.progress>0&&e.friend.progress!==e.media.episodes&&e.friend.progress!==e.media.chapters},get children(){return i(z,{get children(){return[i(M,{get when(){return e.type==="ANIME"},get children(){return[" Ep. ",N(()=>e.friend.progress)]}}),i(M,{get when(){return e.type==="MANGA"},get children(){return[" Ch. ",N(()=>e.friend.progress)]}})]}})}}),null),d(t,i(x,{get when(){return e.friend.progressVolumes>0&&e.friend.progressVolumes!==e.media.volumes},get children(){return[" ","Vol. ",N(()=>e.friend.progressVolumes)]}}),null),t})()}const GS="_friend-container_8e4dk_1",HS="_friend_8e4dk_1",jS="_friend-repeat_8e4dk_35",Bs={friendContainer:GS,friend:HS,friendRepeat:jS};var YS=p("<div><ul>"),qS=p('<img alt="User profile">'),zS=p("<p>"),WS=p("<div>"),KS=p("<li>");function JS(){const e=ne(),[t]=xe(),{accessToken:n,authUserData:r}=ce(),{anilistData:s}=vn(),a=Me(Af,()=>{var h,f;return{token:n(),id:t.isMalId!=null?(f=(h=s())==null?void 0:h.data)==null?void 0:f.id:e.id,page:1,perPage:8}}),l=xn({default:()=>ei()>1,"only-if-cached":()=>ei()>2}),[o]=En(l,a),[c,u]=O();return P(()=>{var h,f,g;(f=(h=s())==null?void 0:h.data)!=null&&f.mediaListEntry&&r()?u({...(g=s().data)==null?void 0:g.mediaListEntry,user:r().data}):u(null)}),i(ct,{fallback:"Friends error",get children(){return i(x,{get when(){return N(()=>{var h,f;return!!(((f=(h=o())==null?void 0:h.data)!=null&&f.mediaList.length||c())&&s())})()&&r()},get children(){var h=YS(),f=h.firstChild;return d(f,i(x,{get when(){return c()},get children(){return i(cc,{get friend(){return c()}})}}),null),d(f,i(H,{get each(){var g,m;return(m=(g=o())==null?void 0:g.data)==null?void 0:m.mediaList},children:g=>i(x,{get when(){var m;return g.user.id!==((m=r())==null?void 0:m.data.id)},get children(){return i(cc,{friend:g})}})}),null),P(()=>Bt(h,Bs.friendContainer)),h}})}})}function cc(e){const{anilistData:t}=vn();return(()=>{var n=KS();return d(n,i(U,{get class(){return Bs.friend},get href(){return"/user/"+e.friend.user.name},get children(){return[(()=>{var r=qS();return P(()=>G(r,"src",e.friend.user.avatar.large)),r})(),(()=>{var r=zS();return d(r,()=>e.friend.user.name),r})(),i(VS,{get friend(){return e.friend},get media(){var r;return(r=t())==null?void 0:r.data},get type(){var r;return(r=t())==null?void 0:r.data.type}}),i(x,{get when(){return e.friend.repeat},get children(){var r=WS();return d(r,()=>e.friend.repeat,null),d(r,i(ci,{}),null),P(()=>Bt(r,Bs.friendRepeat)),r}}),i(Tl,{get format(){return e.friend.user.mediaListOptions.scoreFormat},get score(){return e.friend.score}})]}})),n})()}var XS=p("<button data-k-c63ce0c8>Show"),ZS=p('<div data-k-c63ce0c8 class=recommendations><div data-k-c63ce0c8 class=flex-space-between><h2 data-k-c63ce0c8>Recommendations</h2><div data-k-c63ce0c8></div></div><ol data-k-c63ce0c8 class="grid-column-auto-fill recommendations">');function QS(e){const t=ne(),[n,r]=O(!1),[s,a]=O();return W(le(()=>t.id,l=>{r(!1),a(l)})),i(x,{get when(){var l;return((l=e.recommendations)==null?void 0:l.nodes.length)>0},get children(){var l=ZS(),o=l.firstChild,c=o.firstChild,u=c.nextSibling,h=o.nextSibling;return d(u,i(x,{get when(){return e.recommendations.pageInfo.total>e.recommendations.nodes.length},get children(){var f=XS();return f.firstChild,f.$$click=()=>r(g=>!g),d(f,i(x,{get when(){return n()},fallback:" more",children:" less"}),null),f}})),d(h,i(z,{get children(){return[i(M,{get when(){return!n()},get children(){return i(Us,{get nodes(){return e.recommendations.nodes},get mutateCache(){return e.mutateCache}})}}),i(M,{get when(){return n()},get children(){return i(oh,{get id(){return s()},page:1,get mutateOldCardsCache(){return e.mutateCache},get oldCards(){return e.recommendations.nodes}})}})]}})),l}})}function oh(e){const{accessToken:t}=ce(),[n,r]=O(void 0),s=Me(Cf,t,n,e.page),[a,{mutateCache:l}]=nt(s),o=(c,u)=>l(h=>(h.data.nodes[c]=u,h));return i($n,{onIntersection:()=>r(e.id),fetchResponse:a,get loadingElement(){return i(Us,{get nodes(){return e.oldCards||[]},get mutateCache(){return e.mutateCache}})},get loading(){return e.loading},children:c=>[i(Us,{get nodes(){return a().data.nodes},mutateCache:o,get mutateOldCardsCache(){return e.mutateOldCardsCache},get oldCards(){return e.oldCards}}),i(x,{get when(){return a().data.pageInfo.hasNextPage},get children(){return i(x,{when:c===!1,fallback:"Fetch cooldown",get children(){return i(oh,{get id(){return n()},get page(){return e.page+1},get loading(){return a.loading}})}})}})]})}function Us(e){return F(!e.oldCards==!e.mutateOldCardsCache,"These two props needs to be used together"),i(H,{get each(){return e.nodes},children:(t,n)=>i(x,{get when(){return t.mediaRecommendation},get children(){return i(eC,{node:t,mutateCache:r=>{Oe(()=>{var s;n()<((s=e.oldCards)==null?void 0:s.length)&&e.mutateOldCardsCache(n(),r),e.mutateCache(n(),r)})}})}})})}function eC(e){const t=ne(),{accessToken:n}=ce(),[r,s]=O(e.node.userRating),[a,l]=O(e.node.rating);let o=e.node.userRating;const c=ya(async(f,g,m,y,v)=>{if(m!==o){const $=await ue.anilist.rateRecommendation(f,g,m,y,v);F(!$.fromCache,"Mutation should never be cached"),$.status===200&&e.mutateCache($.data)}o=m},1e3);return i(s_,{get node(){return e.node},get rating(){return a()},get userRating(){return r()},handleRateUp:f=>{f.preventDefault(),s(g=>g==="RATE_UP"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),l(m=>m-1),"NO_RATING"):(c(n(),e.node.id,"RATE_UP",t.id,e.node.mediaRecommendation.id),l(m=>m+1),"RATE_UP"))},handleRateDown:f=>{f.preventDefault(),s(g=>g==="RATE_DOWN"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),l(m=>m+1),"NO_RATING"):(c(n(),e.node.id,"RATE_DOWN",t.id,e.node.mediaRecommendation.id),l(m=>m-1),"RATE_DOWN"))}})}$e(["click"]);var tC=p("<h1>"),nC=p("<ul class=flex-bullet-separator><li></li><li>"),rC=p("<li>Source: "),aC=p("<ul><li>Members: </li><li>Favourites: "),iC=p("<div class=pg-ani-media-info>"),sC=p("<li>");function lC(){const{anilistData:e}=vn();return i(ct,{fallback:"Anilist media page info error",get children(){var t=iC();return d(t,i(x,{get when(){var n;return(n=e())==null?void 0:n.data},get children(){return[(()=>{var n=tC();return d(n,()=>{var r;return(r=e())==null?void 0:r.data.title.userPreferred}),n})(),(()=>{var n=nC(),r=n.firstChild,s=r.nextSibling;return d(r,i(z,{get children(){return[i(M,{get when(){var a;return((a=e())==null?void 0:a.data.type)==="MANGA"},get children(){return i(z,{get children(){return[i(M,{get when(){var a,l;return(l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year},get children(){return i(U,{get href(){var a;return"/search/manga?year="+((a=e())==null?void 0:a.data.startDate.year)},get children(){var a;return(a=e())==null?void 0:a.data.startDate.year}})}}),i(M,{get when(){var a,l;return((l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year)==null},get children(){return i(U,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),i(M,{get when(){var a;return((a=e())==null?void 0:a.data.type)==="ANIME"},get children(){return i(z,{get children(){return[i(M,{get when(){var a;return N(()=>{var l;return!!((l=e())!=null&&l.data.seasonYear)})()&&((a=e())==null?void 0:a.data.season)},get children(){return i(U,{get href(){var a,l;return"/search/anime/"+((a=e())==null?void 0:a.data.season.toLowerCase())+"-"+((l=e())==null?void 0:l.data.seasonYear)},get children(){return[N(()=>{var a;return Dr((a=e())==null?void 0:a.data.season)})," ",N(()=>{var a;return(a=e())==null?void 0:a.data.seasonYear})]}})}}),i(M,{get when(){var a,l;return(l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year},get children(){return i(U,{get href(){var a;return"/search/anime?year="+((a=e())==null?void 0:a.data.startDate.year)},get children(){var a;return(a=e())==null?void 0:a.data.startDate.year}})}}),i(M,{get when(){var a,l;return((l=(a=e())==null?void 0:a.data.startDate)==null?void 0:l.year)==null},get children(){return i(U,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}})),d(n,i(x,{get when(){var a;return(a=Object.entries(Kn.ani.media).find(([,l])=>{var o;return l.api===((o=e())==null?void 0:o.data.format)}))==null?void 0:a[0]},children:a=>(()=>{var l=sC();return d(l,i(z,{get children(){return[i(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)!=="JP"},get children(){return i(U,{get href(){var o,c;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+a()+"&country="+((c=e())==null?void 0:c.data.countryOfOrigin)},get children(){return[N(()=>{var o;return $s((o=e())==null?void 0:o.data.format)})," (",N(()=>{var o;return pf((o=e())==null?void 0:o.data.countryOfOrigin)}),")"]}})}}),i(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)==="JP"},get children(){return i(U,{get href(){var o;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+a()},get children(){var o;return $s((o=e())==null?void 0:o.data.format)}})}})]}})),l})()}),s),d(s,()=>{var a;return od((a=e())==null?void 0:a.data.status)}),n})(),(()=>{var n=aC(),r=n.firstChild;r.firstChild;var s=r.nextSibling;return s.firstChild,d(n,i(x,{get when(){var a;return(a=e())==null?void 0:a.data.source},get children(){var a=rC();return a.firstChild,d(a,i(U,{get href(){var l;return"/search/"+((l=e())==null?void 0:l.data.type.toLowerCase())+"?source="+Object.entries(Ks).find(([,o])=>{var c;return o.api===((c=e())==null?void 0:c.data.source)})[0]},get children(){var l;return vf((l=e())==null?void 0:l.data.source)}}),null),a}}),r),d(r,()=>{var a;return fa((a=e())==null?void 0:a.data.popularity)},null),d(s,()=>{var a;return fa((a=e())==null?void 0:a.data.favourites)},null),n})()]}})),t}})}var oC=p("<h2 data-k-c68b4600>Tags"),cC=p("<button data-k-c68b4600>"),dC=p("<div data-k-c68b4600 class=pg-media-tags><div data-k-c68b4600 class=flex-space-between></div><ol data-k-c68b4600>"),uC=p("<span data-k-c68b4600>%"),hC=p("<li data-k-c68b4600>");const gC=e=>{const[t,n]=O(!1);W(le(()=>e.tags,()=>{n(!1)}));function r(){const s=[];for(const a of e.tags){if(a.rank<90&&s.length>=3)break;(t()||!a.isMediaSpoiler&&!a.isGeneralSpoiler)&&s.push(`genre=${a.name}`)}return s}return i(ct,{fallback:"Tags error",get children(){return i(x,{get when(){var s;return(s=e.tags)==null?void 0:s.length},get children(){var s=dC(),a=s.firstChild,l=a.nextSibling;return d(a,i(U,{get href(){return"/search/"+e.type.toLowerCase()+"?"+r().join("&")},get children(){return oC()}}),null),d(a,i(x,{get when(){return e.tags.some(o=>o.isMediaSpoiler||o.isGeneralSpoiler)},get children(){var o=cC();return o.$$click=()=>n(c=>!c),d(o,i(x,{get when(){return!t()},fallback:"Hide spoilers",children:"Show spoilers"})),o}}),null),d(l,i(H,{get each(){return e.tags},children:o=>(()=>{var c=hC();return d(c,i(U,{get href(){return"/search/"+e.type.toLowerCase()+"?genre="+o.name+"&rank="+o.rank},get children(){return[N(()=>o.name)," ",(()=>{var u=uC(),h=u.firstChild;return d(u,()=>o.rank,h),u})()]}})),P(u=>{var h=!!(o.isMediaSpoiler||o.isGeneralSpoiler),f=!!((o.isMediaSpoiler||o.isGeneralSpoiler)&&!t()),g=o.description;return h!==u.e&&c.classList.toggle("spoiler",u.e=h),f!==u.t&&c.classList.toggle("hidden",u.t=f),g!==u.a&&G(c,"title",u.a=g),u},{e:void 0,t:void 0,a:void 0}),c})()})),P(()=>s.classList.toggle("loading",!!e.loading)),s}})}})};$e(["click"]);var fC=p("<div data-k-203e4d26 class=wrapper><h2 data-k-203e4d26></h2><ul data-k-203e4d26 class=genres>"),mC=p("<li data-k-203e4d26 class=genre>");const pC=e=>i(ct,{fallback:"Genres error",get children(){return i(x,{get when(){var t;return(t=e.genres)==null?void 0:t.length},get children(){var t=fC(),n=t.firstChild,r=n.nextSibling;return d(n,i(U,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?"+e.genres.map(s=>"genre="+s).join("&")},children:"Genres"})),d(r,i(H,{get each(){return e.genres},children:s=>(()=>{var a=mC();return d(a,i(U,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?genre="+s},children:s})),a})()})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var vC=p("<div data-k-737e8a49 class=pg-media-ranking><h2 data-k-737e8a49>Ranking</h2><ul data-k-737e8a49>"),$C=p("<li data-k-737e8a49>#<! data-k-737e8a49> <! data-k-737e8a49> <! data-k-737e8a49> ");const _C=e=>i(ct,{fallback:"Ranking error",get children(){return i(x,{get when(){return e.rankings},get children(){var t=vC(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.rankings},children:s=>(()=>{var a=$C(),l=a.firstChild,o=l.nextSibling,c=o.nextSibling,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling;return f.nextSibling,d(a,()=>s.rank,o),d(a,()=>s.context,u),d(a,()=>s.season,f),d(a,()=>s.year,null),a})()})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var bC=p("<li data-k-439c0d70>Episodes: "),yC=p("<li data-k-439c0d70>Volumes: "),wC=p("<li data-k-439c0d70>Chapters: "),kC=p("<li data-k-439c0d70>Duration: <! data-k-439c0d70> mins"),SC=p("<li data-k-439c0d70>English: "),CC=p("<li data-k-439c0d70>Romaji: "),AC=p("<li data-k-439c0d70>Native: "),TC=p("<li data-k-439c0d70>Synonyms:<ul data-k-439c0d70>"),xC=p("<div data-k-439c0d70><h2 data-k-439c0d70>Extra info</h2><ul data-k-439c0d70>"),IC=p("<li data-k-439c0d70>Start Date: "),EC=p("<li data-k-439c0d70>End Date: "),LC=p("<li data-k-439c0d70>");const PC=e=>{const{authUserData:t}=ce();return i(ct,{fallback:"ExtraInfo error",get children(){return i(x,{get when(){return e.media},get children(){var n=xC(),r=n.firstChild,s=r.nextSibling;return d(s,i(x,{get when(){return e.media.episodes},get children(){var a=bC();return a.firstChild,d(a,()=>e.media.episodes,null),a}}),null),d(s,i(x,{get when(){return e.media.volumes},get children(){var a=yC();return a.firstChild,d(a,()=>e.media.volumes,null),a}}),null),d(s,i(x,{get when(){return e.media.chapters},get children(){var a=wC();return a.firstChild,d(a,()=>e.media.chapters,null),a}}),null),d(s,i(x,{get when(){return e.media.duration},get children(){var a=kC(),l=a.firstChild,o=l.nextSibling;return o.nextSibling,d(a,()=>e.media.duration,o),a}}),null),d(s,i(x,{get when(){return Qa(e.media.startDate)},children:a=>(()=>{var l=IC();return l.firstChild,d(l,a,null),l})()}),null),d(s,i(x,{get when(){return Qa(e.media.endDate)},children:a=>(()=>{var l=EC();return l.firstChild,d(l,a,null),l})()}),null),d(s,i(x,{get when(){return!t()||t().data.options.titleLanguage!=="ENGLISH"},get children(){var a=SC();return a.firstChild,d(a,()=>e.media.title.english,null),a}}),null),d(s,i(x,{get when(){return!t()||t().data.options.titleLanguage!=="ROMAJI"},get children(){var a=CC();return a.firstChild,d(a,()=>e.media.title.romaji,null),a}}),null),d(s,i(x,{get when(){return!t()||t().data.options.titleLanguage!=="NATIVE"},get children(){var a=AC();return a.firstChild,d(a,()=>e.media.title.native,null),a}}),null),d(s,i(x,{get when(){return e.media.synonyms.length},get children(){var a=TC(),l=a.firstChild,o=l.nextSibling;return d(o,i(H,{get each(){return e.media.synonyms},children:c=>(()=>{var u=LC();return d(u,c),u})()})),a}}),null),P(()=>n.classList.toggle("loading",!!e.loading)),n}})}})};var MC=p("<div data-k-611537d3 class=pg-media-banner><img data-k-611537d3 alt=Banner>");const DC=e=>i(x,{get when(){return e.src},get children(){var t=MC(),n=t.firstChild;return P(r=>{var s=!!e.loading,a=e.src;return s!==r.e&&t.classList.toggle("loading",r.e=s),a!==r.t&&G(n,"src",r.t=a),r},{e:void 0,t:void 0}),t}});var RC=p("<img data-k-543bd5d1 alt=Cover class=media-page-cover>"),NC=p("<a data-k-543bd5d1 target=_black class=active><span data-k-543bd5d1 class=visually-hidden>Go to Anilist"),OC=p("<span data-k-543bd5d1 class=visually-hidden>Switch to MyAnimeList mode"),FC=p("<div data-k-543bd5d1 class=cp-media-api-switcher>"),BC=p("<button data-k-543bd5d1>"),UC=p("<div data-k-543bd5d1 class=media-page-content><aside data-k-543bd5d1 class=media-page-left-aside></aside><section data-k-543bd5d1 class=media-page-main>"),VC=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Studios</h2><ol data-k-543bd5d1>"),Vs=p("<li data-k-543bd5d1>"),GC=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Producers</h2><ol data-k-543bd5d1>"),HC=p("<div data-k-543bd5d1 class=media-page-description>"),jC=p('<div data-k-543bd5d1 class="no-overflow media-page-watch-episodes"><h2 data-k-543bd5d1>Watch</h2><ol data-k-543bd5d1 class=grid-reel-auto-fill>'),YC=p('<a data-k-543bd5d1 target=_black><img data-k-543bd5d1 alt="Episode thumbnail"><div data-k-543bd5d1 class=wrapper><p data-k-543bd5d1>');function qC(e){const t=ne(),[n]=xe(),{accessToken:r}=ce(),[s,a]=O(),l=Me(Sf,()=>({token:r(),id:t.id,isMalId:n.isMalId!=null,type:t.type})),o=xn({default:()=>ei()>2}),[c,{mutateBoth:u}]=En(o,l),h=N(()=>{var b;const w=(b=c())==null?void 0:b.data;if(!(!w||w.idMal==null||w.type.toLowerCase()!==t.type))return w.idMal});P(le(c,w=>{var b;a(((b=w==null?void 0:w.data)==null?void 0:b.isFavourite)??!1)}));const f=Me(gd,()=>t.type,h),[g]=nt(f),m=N(()=>{var w,b,A,S;if((w=c())!=null&&w.data.idMal&&((A=(b=g())==null?void 0:b.data)==null?void 0:A.mal_id)===((S=c())==null?void 0:S.data.idMal))return g()}),{openEditor:y}=Ys(),v=pn();P(()=>{var w,b;(w=c())!=null&&w.data&&t.sub?document.title=`${c().data.title.userPreferred} - ${t.sub} - LOB`:(b=c())!=null&&b.data&&(document.title=`${c().data.title.userPreferred} - LOB`)});const $=new AbortController;Pn(()=>{window.addEventListener("keydown",w=>{if(w.target!==document.body||w.shiftKey||w.altKey)return;function b(A){var S,_,T,I,E;return w.preventDefault(),(E=(I=(T=(_=(S=c())==null?void 0:S.data)==null?void 0:_.relations)==null?void 0:T.edges)==null?void 0:I.find(L=>(L==null?void 0:L.relationType)===A))==null?void 0:E.node}if(w.key==="l"&&!w.ctrlKey||w.key==="ArrowRight"&&w.ctrlKey)Ca(v,b("SEQUEL"));else if(w.key==="h"&&!w.ctrlKey||w.key==="ArrowLeft"&&w.ctrlKey)Ca(v,b("PREQUEL"));else if(w.key==="j"&&!w.ctrlKey||w.key==="ArrowDown"&&w.ctrlKey){const A=b("ADAPTATION")||b("ALTERNATIVE");Ca(v,A)}else(w.key==="k"&&!w.ctrlKey||w.key==="ArrowUp"&&w.ctrlKey)&&Ca(v,b("SOURCE")||b("PARENT"))},{signal:$.signal})}),ze(()=>$.abort());const k=()=>{var w;return c.loading&&((w=c())==null?void 0:w.data.id)!=t.id},C=(w,b)=>{var S,_,T,I;const A=b[(_=(S=c())==null?void 0:S.data)==null?void 0:_.type]??null;((I=(T=c())==null?void 0:T.data)==null?void 0:I.id)===A&&(a(w),u(E=>(E.data.isFavourite=w,E)))};return i(ct,{fallback:"Media page error",get children(){return i(Ws.Provider,{value:{anilistData:c,mutateBothAnilistData:u,jikanData:m},get children(){return[i(DC,{get src(){var w,b;return(b=(w=c())==null?void 0:w.data)==null?void 0:b.bannerImage},get loading(){return k()}}),(()=>{var w=UC(),b=w.firstChild,A=b.nextSibling;return d(b,i(x,{get when(){var S;return(S=c())==null?void 0:S.data},get children(){return[(()=>{var S=RC();return P(()=>{var _,T;return G(S,"src",(T=(_=c())==null?void 0:_.data)==null?void 0:T.coverImage.large)}),S})(),(()=>{var S=FC();return d(S,i(x,{get when(){var _;return(_=c())==null?void 0:_.data.id},get children(){var _=NC();return _.firstChild,d(_,i(wl,{}),null),d(_,i(Ju,{}),null),P(()=>{var T;return G(_,"href","https://anilist.co/"+t.type+"/"+(((T=c())==null?void 0:T.data.id)??t.id))}),_}}),null),d(S,i(x,{get when(){var _;return(_=c())==null?void 0:_.data.idMal},get children(){return i(U,{get href(){var _;return"/mal/"+t.type+"/"+((_=c())==null?void 0:_.data.idMal)+"/"+t.name},get children(){return[OC(),i(kl,{})]}})}}),null),S})(),i(Ku,{}),i(x,{get when(){return r()},get children(){return[(()=>{var S=BC();return S.$$click=()=>{var _;y((_=c())==null?void 0:_.data,{setIsFavourite:C,mutateMedia:T=>{var I,E;((E=(I=c())==null?void 0:I.data)==null?void 0:E.id)===(T==null?void 0:T.media.id)&&u(L=>(L.data.mediaListEntry=T,L))}})},d(S,()=>{var _,T;return((T=(_=c())==null?void 0:_.data.mediaListEntry)==null?void 0:T.status)||"Edit"}),S})(),i(Fr,{get checked(){return s()},onChange:a,get idType(){var S;return(S=c())==null?void 0:S.data.type},get variableId(){var S;return(S=c())==null?void 0:S.data.id},get anilistValue(){var S;return(S=c())==null?void 0:S.data.favourites},get jikanValue(){var S;return(S=m())==null?void 0:S.data.favorites},mutateCache:C})]}}),i(Wu,{get id(){var S,_,T;return(T=(_=(S=c())==null?void 0:S.data)==null?void 0:_.trailer)==null?void 0:T.id},get site(){var S,_,T;return(T=(_=(S=c())==null?void 0:S.data)==null?void 0:_.trailer)==null?void 0:T.site}}),i(x,{get when(){var S;return(S=c())==null?void 0:S.data.studios.edges.filter(_=>_.isMain)},children:S=>i(x,{get when(){return S().length>0},get children(){var _=VC(),T=_.firstChild,I=T.nextSibling;return d(I,i(H,{get each(){return S()},children:E=>(()=>{var L=Vs();return d(L,i(U,{get href(){return"/ani/studio/"+E.node.id+"/"+Jn(E.node.name)},get children(){return E.node.name}})),L})()})),_}})}),i(x,{get when(){var S;return(S=c())==null?void 0:S.data.studios.edges.filter(_=>_.isMain===!1)},children:S=>i(x,{get when(){return S().length>0},get children(){var _=GC(),T=_.firstChild,I=T.nextSibling;return d(I,i(H,{get each(){return S()},children:E=>(()=>{var L=Vs();return d(L,i(U,{get href(){return"/ani/studio/"+E.node.id+"/"+Jn(E.node.name)},get children(){return E.node.name}})),L})()})),_}})}),i(Xu,{get hashtag(){var S;return(S=c())==null?void 0:S.data.hashtag},get externalLinks(){var S;return(S=c())==null?void 0:S.data.externalLinks}}),i(PC,{get media(){var S;return(S=c())==null?void 0:S.data},get loading(){return k()}}),i(_C,{get rankings(){var S;return(S=c())==null?void 0:S.data.rankings},get loading(){return k()}}),i(pC,{get genres(){var S;return(S=c())==null?void 0:S.data.genres},get type(){var S;return(S=c())==null?void 0:S.data.type},get loading(){return k()}}),i(gC,{get tags(){var S;return(S=c())==null?void 0:S.data.tags},get type(){var S;return(S=c())==null?void 0:S.data.type},get loading(){return k()}})]}})),d(A,i(lC,{}),null),d(A,()=>e.children,null),P(()=>w.classList.toggle("loading",!!k())),w})()]}})}})}function zC(){const{accessToken:e}=ce(),{anilistData:t,mutateBothAnilistData:n}=vn();return i(ct,{fallback:"Media page home content error",get children(){return i(x,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[i(x,{get when(){return t().data.description},get children(){var r=HC();return d(r,i(si,{get text(){return t().data.description}})),r}}),i(wS,{get relations(){return t().data.relations}}),i(MS,{get characters(){return t().data.characterPreview.edges},get countryOfOrigin(){return t().data.countryOfOrigin}}),i(BS,{get staff(){return t().data.staffPreview.edges}}),i(x,{get when(){return e()},get children(){return i(JS,{})}}),i(Py,{}),i(KC,{get streamingEpisodes(){return t().data.streamingEpisodes}}),i(QS,{get recommendations(){return t().data.recommendations},mutateCache:(r,s)=>{n(a=>(a.data.recommendations.nodes[r]=s,a))}})]}})}})}function WC(){const e=ne(),t=Qt();return i(hn,{get href(){return"/ani/"+e.type+"/"+e.id+"/"+(e.name||"")+t.search}})}function KC(e){return i(x,{get when(){var t;return(t=e.streamingEpisodes)==null?void 0:t.length},get children(){var t=jC(),n=t.firstChild,r=n.nextSibling;return d(r,i(H,{get each(){return e.streamingEpisodes},children:s=>(()=>{var a=Vs();return d(a,i(z,{get children(){return i(M,{get when(){return s.site==="Crunchyroll"},get children(){var l=YC(),o=l.firstChild,c=o.nextSibling,u=c.firstChild;return d(u,()=>s.title),P(h=>{var f=s.url,g=s.thumbnail;return f!==h.e&&G(l,"href",h.e=f),g!==h.t&&G(o,"src",h.t=g),h},{e:void 0,t:void 0}),l}})}})),a})()})),t}})}$e(["click"]);var JC=p('<img alt="User profile">'),XC=p("<p>"),ZC=p("<li>"),QC=p("<button>Load more");function xl(e){F(e.page,"Page is missing");const{user:t}=tt(),{accessToken:n}=ce(),[r]=ue.anilist.userFollowers(()=>t().id,e.page,n),[s,a]=O(!1);return i(x,{get when(){return r()},get children(){return[i(H,{get each(){return r().data.followers},children:l=>(()=>{var o=ZC();return d(o,i(U,{get href(){return"/user/"+l.name},get children(){return[(()=>{var c=JC();return P(()=>G(c,"src",l.avatar.large)),c})(),(()=>{var c=XC();return d(c,()=>l.name),c})()]}})),o})()}),i(x,{get when(){return r().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return s()},get fallback(){return(()=>{var l=QC();return l.$$click=()=>a(!0),l})()},get children(){return i(xl,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var e3=p('<img alt="User profile">'),t3=p("<p>"),n3=p("<button>Unfollow"),r3=p("<li>"),a3=p("<button>Load more");function i3(e){F(e.page,"Page is missing");const{user:t}=tt(),{authUserData:n,accessToken:r}=ce(),[s]=ue.anilist.userFollowing(()=>t().id,e.page,r),[a,l]=O(!1);return i(x,{get when(){return s()},get children(){return[i(H,{get each(){return s().data.following},children:o=>(()=>{var c=r3();return d(c,i(U,{get href(){return"/user/"+o.name},get children(){return[(()=>{var u=e3();return P(()=>G(u,"src",o.avatar.large)),u})(),(()=>{var u=t3();return d(u,()=>o.name),u})(),i(x,{get when(){var u;return t().id===((u=n())==null?void 0:u.data.id)},get children(){var u=n3();return u.$$click=async h=>{h.preventDefault()},u}})]}})),c})()}),i(x,{get when(){return s().data.pageInfo.hasNextPage},get children(){return i(x,{get when(){return a()},get fallback(){return(()=>{var o=a3();return o.$$click=()=>l(!0),o})()},get children(){return i(xl,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var dc=p("<ol class=user-profile-social-grid>"),s3=p("<div class=user-profile-socials-page><ul><li><button>Following</button></li><li><button>Followers");function l3(){const{user:e}=tt(),[t,n]=O("following");return W(le(e,r=>{document.title=`${r.name} socials - LOB`})),(()=>{var r=s3(),s=r.firstChild,a=s.firstChild,l=a.firstChild,o=a.nextSibling,c=o.firstChild;return l.$$click=()=>n("following"),c.$$click=()=>n("followers"),d(r,i(z,{get children(){return[i(M,{get when(){return t()==="following"},get children(){var u=dc();return d(u,i(x,{get when(){return e().id},keyed:!0,get children(){return i(i3,{page:1})}})),u}}),i(M,{get when(){return t()==="followers"},get children(){var u=dc();return d(u,i(x,{get when(){return e().id},keyed:!0,get children(){return i(xl,{page:1})}})),u}})]}}),null),r})()}$e(["click"]);var o3=p("<h2 data-k-a9353a86>"),c3=p("<span data-k-a9353a86>View all"),d3=p("<section data-k-a9353a86><ol data-k-a9353a86 class=grid-reel-auto-fill>");function vt(e){return F("href"in e,"Link is missing"),(()=>{var t=d3(),n=t.firstChild;return d(t,i(U,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=o3();return d(r,()=>e.title),r})(),c3()]}}),n),d(n,i(H,{get each(){return e.data},children:r=>i(Si,{media:r})})),t})()}var u3=p("<h2 data-k-a96044c6>"),h3=p("<section data-k-a96044c6><ol data-k-a96044c6 class=vertical-search-card-row>"),g3=p("<img data-k-a96044c6 class=cover alt=Cover.>"),f3=p('<li data-k-a96044c6 class=vertical-search-card><p data-k-a96044c6 class=ranking>#<span data-k-a96044c6></span></p><div data-k-a96044c6 class=vertical-search-card-body><div data-k-a96044c6 class="vertical-search-card-content clamp"><ol data-k-a96044c6 class=vertical-search-card-genre-list></ol></div><div data-k-a96044c6 class=vertical-search-card-info><div data-k-a96044c6 class=vertical-search-card-score><div data-k-a96044c6 class=clamp><p data-k-a96044c6>%</p><p data-k-a96044c6> users</p></div></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6></p><p data-k-a96044c6></p></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6> </p><p data-k-a96044c6>'),m3=p("<li data-k-a96044c6 class=vertical-search-card-genre>");function Il(e){return F("href"in e,"Link is missing"),It(e.type,"type"),(()=>{var t=h3(),n=t.firstChild;return d(t,i(U,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=u3();return d(r,()=>e.title),r})(),"View all"]}}),n),d(n,i(H,{get each(){return e.data},children:(r,s)=>(()=>{var a=f3(),l=a.firstChild,o=l.firstChild,c=o.nextSibling,u=l.nextSibling,h=u.firstChild,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=m.firstChild,v=y.firstChild,$=v.firstChild,k=v.nextSibling,C=k.firstChild,w=m.nextSibling,b=w.firstChild,A=b.nextSibling,S=w.nextSibling,_=S.firstChild,T=_.firstChild,I=_.nextSibling;return d(c,()=>s()+1),d(u,i(U,{class:"cover-container",get href(){return Ge(r)},get children(){var E=g3();return P(()=>G(E,"src",r.coverImage.large)),E}}),h),d(h,i(U,{class:"line-clamp",get href(){return Ge(r)},get children(){return r.title.userPreferred}}),f),d(f,i(H,{get each(){return r.genres},children:E=>(()=>{var L=m3();return d(L,i(U,{get href(){return`/search${e.type?"/"+e.type:""}?genre=`+E},children:E})),L})()})),d(m,i(sa,{get score(){return r.averageScore}}),y),d(v,()=>r.averageScore,$),d(k,()=>ye(r.popularity),C),d(b,()=>Mr(r.format)),d(A,i(z,{get children(){return[i(M,{get when(){return r.type==="ANIME"},get children(){return i(x,{get when(){return r.episodes},fallback:"Ongoing",get children(){return[N(()=>ye(r.episodes))," Episode",i(x,{get when(){return r.episodes>1},children:"s"})]}})}}),i(M,{get when(){return r.type==="MANGA"},get children(){return i(x,{get when(){return r.chapters},fallback:"Ongoing",get children(){return[N(()=>ye(r.chapters))," Chapter",i(x,{get when(){return r.chapters>1},children:"s"})]}})}})]}})),d(_,()=>Je(r.season),T),d(_,()=>r.seasonYear,null),d(I,()=>Je(r.status)),P(E=>(E=r.coverImage.color)!=null?a.style.setProperty("--media-background-color",E):a.style.removeProperty("--media-background-color")),a})()})),t})()}var p3=p("<div data-k-bc27f66a class=browse-content>");function v3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingManga(e);return document.title="Browse manga - LOB",i(x,{get when(){return t()},get children(){var n=p3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/manga/trending",title:"Trending now"}),null),d(n,i(vt,{get data(){return t().data.data.novel.media},href:"/search/manga/novel",title:"Popular light novels"}),null),d(n,i(vt,{get data(){return t().data.data.manhwa.media},href:"/search/manga/manhwa",title:"Popular Manhwas"}),null),d(n,i(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished-manga",title:"Recently finished mangas"}),null),d(n,i(vt,{get data(){return t().data.data.finishedNovel.media},href:"/search/manga/finished-novel",title:"Recently finished light novels"}),null),d(n,i(vt,{get data(){return t().data.data.popular.media},href:"/search/manga/popular",title:"All time popular"}),null),d(n,i(Il,{get data(){return t().data.data.top.media},type:"manga",href:"/search/manga/top-100",title:"Top 100 manga"}),null),n}})}var $3=p("<div data-k-ac073097 class=browse-content>");function _3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingAnime(e);return document.title="Browse anime - LOB",i(x,{get when(){return t()},get children(){var n=$3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/anime/trending",title:"Trending now"}),null),d(n,i(vt,{get data(){return t().data.data.season.media},href:"/search/anime/this-season?order=popularity",title:"Popular this season"}),null),d(n,i(vt,{get data(){return t().data.data.nextSeason.media},href:"/search/anime/next-season?order=popularity",title:"Upcoming next season"}),null),d(n,i(vt,{get data(){return t().data.data.finished.media},href:"/search/anime/finished",title:"Recently finished"}),null),d(n,i(vt,{get data(){return t().data.data.popular.media},href:"/search/anime/popular",title:"All time popular"}),null),d(n,i(Il,{get data(){return t().data.data.top.media},type:"anime",href:"/search/anime/top-100",title:"Top 100 anime"}),null),n}})}var b3=p("<div data-k-49f3f573 class=browse-content>");function y3(){const{accessToken:e}=ce(),[t]=ue.anilist.trendingMedia(e);return document.title="Browse media - LOB",i(x,{get when(){return t()},get children(){var n=b3();return d(n,i(vt,{get data(){return t().data.data.trending.media},href:"/search/media/trending",title:"Trending anime and manga"}),null),d(n,i(vt,{get data(){return t().data.data.newAnime.media},href:"/search/anime/new",title:"Newly added anime"}),null),d(n,i(vt,{get data(){return t().data.data.newManga.media},href:"/search/manga/new",title:"Newly added manga"}),null),d(n,i(vt,{get data(){return t().data.data.finishedAnime.media},href:"/search/anime/finished",title:"Recently finished anime"}),null),d(n,i(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished",title:"Recently finished manga"}),null),d(n,i(Il,{get data(){return t().data.data.top.media},type:"media",href:"/search/media/top-100",title:"Top 100 anime and manga"}),null),n}})}var w3=p("<div data-k-77b7dd9c>This is div text");function k3(){return w3()}var S3=p("<div>Not fould 404");const C3=document.getElementById("root"),wn={id:/^\d+$/},A3={type:"anime",header:e=>e.match(/^(summer|fall|spring|winter)-\d+$/)?!0:["finished","this-season","new","tba","next-season","trending","popular","top-100"].includes(e)},T3={type:"manga",header:["finished","finished-manga","tba","finished-novel","novel","new","manhwa","trending","popular","top-100"]},x3={type:"media",header:["finished","trending","popular","top-100","tba"]};Bh(()=>i(_$,{get children(){return i(b$,{get children(){return i(A2,{get children(){return i(Cg,{root:$p,base:"/legendary-octo-barnacle",get children(){return[i(oe,{path:"/",component:v$}),i(oe,{path:"/authentication",component:$$}),i(oe,{path:"/notifications",component:qy}),i(oe,{path:"/settings",component:k3}),i(oe,{path:"/activity/:id",matchFilters:wn,component:Q0}),i(oe,{path:"/compare",get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"anime"})}),i(oe,{path:"/:type",matchFilters:{type:["anime","manga"]},component:gw}),i(oe,{path:"*",component:()=>i(hn,{href:"/compare"})})]}}),i(oe,{path:"/:mode",matchFilters:{mode:["browse","search"]},component:k_,get children(){return[i(oe,{path:"/",matchFilters:{mode:"browse"},component:e2,get children(){return[i(oe,{path:"/:type",matchFilters:{type:"media"},component:y3}),i(oe,{path:"/:type",matchFilters:{type:"anime"},component:_3}),i(oe,{path:"/:type",matchFilters:{type:"manga"},component:v3})]}}),i(oe,{path:"/",matchFilters:{mode:"search"},component:S_,get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"media"})}),i(oe,{path:"/:type",matchFilters:{type:["anime","manga","media"]},get children(){return[i(oe,{path:"/:header?",matchFilters:A3}),i(oe,{path:"/:header?",matchFilters:T3}),i(oe,{path:"/:header?",matchFilters:x3}),i(oe,{path:"/:header?",component:C_})]}})]}})]}}),i(oe,{path:"/artist/:name",component:By}),i(oe,{path:"/:api",get children(){return[i(oe,{path:"/:sub/:id/:name?",matchFilters:{api:"ani"},get children(){return[i(oe,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:F0}),i(oe,{path:"/",get matchFilters(){return{...wn,sub:"staff"}},component:B0}),i(oe,{path:"/",get matchFilters(){return{...wn,sub:"studio"}},component:z0})]}}),i(oe,{path:"/:sub/:id/:name?",matchFilters:{api:"mal"},get children(){return i(oe,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:lk})}})]}}),i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,type:["anime","manga"]}},component:WC}),i(oe,{path:"/:api",get children(){return[i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"ani"}},component:qC,get children(){return[i(oe,{path:"/",matchFilters:{type:["anime","manga"]},component:zC}),i(oe,{path:"/:sub",matchFilters:{sub:"characters"},get children(){return[i(oe,{path:"/",matchFilters:{type:"anime"},component:l0}),i(oe,{path:"/",matchFilters:{type:"manga"},component:o0})]}}),i(oe,{path:"/:sub",matchFilters:{sub:"staff"},get children(){return[i(oe,{path:"/",matchFilters:{type:"anime"},component:c0}),i(oe,{path:"/",matchFilters:{type:"manga"},component:d0})]}})]}}),i(oe,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"mal"}},component:Kw,get children(){return[i(oe,{path:"/",matchFilters:{type:["anime","manga"]},component:Jw}),i(oe,{path:"/:sub",get children(){return[i(oe,{path:"/",matchFilters:{sub:"characters",type:["anime","manga"]},component:tk}),i(oe,{path:"/",matchFilters:{sub:"staff",type:"anime"},component:rk})]}})]}})]}}),i(oe,{path:"/user/:name",component:M_,get children(){return[i(oe,{path:"/",component:xk}),i(oe,{path:"/:type/:list?",matchFilters:{type:"anime"},component:sc}),i(oe,{path:"/:type/:list?",matchFilters:{type:"manga"},component:sc}),i(oe,{path:"/favourites",component:mS}),i(oe,{path:"/stats",component:vS,get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"anime"})}),i(oe,{path:"/:type",matchFilters:{type:"anime"},get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"overview"})}),i(oe,{path:"/overview",component:ub}),i(oe,{path:"/genres",component:Ab}),i(oe,{path:"/tags",component:Nb}),i(oe,{path:"/studios",component:zb}),i(oe,{path:"/staff",component:py}),i(oe,{path:"/voice-actors",component:iy})]}}),i(oe,{path:"/:type",matchFilters:{type:"manga"},get children(){return[i(oe,{path:"/",component:()=>i(hn,{href:"overview"})}),i(oe,{path:"/overview",component:hb}),i(oe,{path:"/genres",component:Tb}),i(oe,{path:"/tags",component:Ob}),i(oe,{path:"/staff",component:vy})]}})]}}),i(oe,{path:"/socials",component:l3})]}}),i(oe,{path:"*404",component:()=>S3()})]}})}})}})}}),C3);
