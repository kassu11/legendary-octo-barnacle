var Nu=Object.defineProperty;var Es=e=>{throw TypeError(e)};var Ou=(e,t,n)=>t in e?Nu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Re=(e,t,n)=>Ou(e,typeof t!="symbol"?t+"":t,n),Ai=(e,t,n)=>t.has(e)||Es("Cannot "+n);var Ee=(e,t,n)=>(Ai(e,t,"read from private field"),n?n.call(e):t.get(e)),ut=(e,t,n)=>t.has(e)?Es("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ht=(e,t,n,r)=>(Ai(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),Et=(e,t,n)=>(Ai(e,t,"access private method"),n);var xi=(e,t,n,r)=>({set _(l){ht(e,t,l,n)},get _(){return Ee(e,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();const Fu=!1,Uu=(e,t)=>e===t,Kt=Symbol("solid-proxy"),ec=typeof Proxy=="function",rl=Symbol("solid-track"),Ha={equals:Uu};let ea=null,tc=lc;const ln=1,Ya=2,nc={owned:null,cleanups:null,context:null,owner:null},Ti={};var Se=null;let Ii=null,Bu=null,Pe=null,$t=null,qt=null,li=0;function ta(e,t){const n=Pe,r=Se,l=e.length===0,i=t===void 0?r:t,s=l?nc:{owned:null,cleanups:null,context:i?i.context:null,owner:i},o=l?e:()=>e(()=>Ae(()=>la(s)));Se=s,Pe=null;try{return an(o,!0)}finally{Pe=n,Se=r}}function O(e,t){t=t?Object.assign({},Ha,t):Ha;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=l=>(typeof l=="function"&&(l=l(n.value)),ic(n,l));return[ac.bind(n),r]}function Vu(e,t,n){const r=ma(e,t,!0,ln);Pr(r)}function L(e,t,n){const r=ma(e,t,!1,ln);Pr(r)}function q(e,t,n){tc=Ku;const r=ma(e,t,!1,ln);r.user=!0,qt?qt.push(r):Pr(r)}function N(e,t,n){n=n?Object.assign({},Ha,n):Ha;const r=ma(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Pr(r),ac.bind(r)}function Gu(e){return e&&typeof e=="object"&&"then"in e}function Hu(e,t,n){let r,l,i;r=!0,l=e,i={};let s=null,o=Ti,c=!1,h="initialValue"in i,u=typeof r=="function"&&N(r);const f=new Set,[g,m]=(i.storage||O)(i.initialValue),[y,v]=O(void 0),[$,S]=O(void 0,{equals:!1}),[C,w]=O(h?"ready":"unresolved");function b(T,I,E,P){return s===T&&(s=null,P!==void 0&&(h=!0),(T===o||I===o)&&i.onHydrated&&queueMicrotask(()=>i.onHydrated(P,{value:I})),o=Ti,A(I,E)),I}function A(T,I){an(()=>{I===void 0&&m(()=>T),w(I!==void 0?"errored":h?"ready":"unresolved"),v(I);for(const E of f.keys())E.decrement();f.clear()},!1)}function k(){const T=zu,I=g(),E=y();if(E!==void 0&&!s)throw E;return Pe&&Pe.user,I}function _(T=!0){if(T!==!1&&c)return;c=!1;const I=u?u():r;if(I==null||I===!1){b(s,Ae(g));return}const E=o!==Ti?o:Ae(()=>l(I,{value:g(),refetching:T}));return Gu(E)?(s=E,"value"in E?(E.status==="success"?b(s,E.value,void 0,I):b(s,void 0,il(E.value),I),E):(c=!0,queueMicrotask(()=>c=!1),an(()=>{w(h?"refreshing":"pending"),S()},!1),E.then(P=>b(E,P,void 0,I),P=>b(E,void 0,il(P),I)))):(b(s,E,void 0,I),E)}return Object.defineProperties(k,{state:{get:()=>C()},error:{get:()=>y()},loading:{get(){const T=C();return T==="pending"||T==="refreshing"}},latest:{get(){if(!h)return k();const T=y();if(T&&!s)throw T;return g()}}}),u?Vu(()=>_(!1)):_(!1),[k,{refetch:_,mutate:m}]}function je(e){return an(e,!1)}function Ae(e){if(Pe===null)return e();const t=Pe;Pe=null;try{return e()}finally{Pe=t}}function oe(e,t,n){const r=Array.isArray(e);let l,i=n&&n.defer;return s=>{let o;if(r){o=Array(e.length);for(let h=0;h<e.length;h++)o[h]=e[h]()}else o=e();if(i)return i=!1,s;const c=Ae(()=>t(o,l,s));return l=o,c}}function En(e){q(()=>Ae(e))}function ze(e){return Se===null||(Se.cleanups===null?Se.cleanups=[e]:Se.cleanups.push(e)),e}function Yu(e,t){ea||(ea=Symbol("error")),Se=ma(void 0,void 0,!0),Se.context={...Se.context,[ea]:[t]};try{return e()}catch(n){pa(n)}finally{Se=Se.owner}}function al(){return Pe}function Lr(){return Se}function rc(e,t){const n=Se,r=Pe;Se=e,Pe=null;try{return an(t,!0)}catch(l){pa(l)}finally{Se=n,Pe=r}}function ju(e){const t=Pe,n=Se;return Promise.resolve().then(()=>{Pe=t,Se=n;let r;return an(e,!1),Pe=Se=null,r?r.done:void 0})}const[LC,PC]=O(!1);function Zt(e,t){const n=Symbol("context");return{id:n,Provider:Ju(n),defaultValue:e}}function Yt(e){let t;return Se&&Se.context&&(t=Se.context[e.id])!==void 0?t:e.defaultValue}function si(e){const t=N(e),n=N(()=>ll(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let zu;function ac(){if(this.sources&&this.state)if(this.state===ln)Pr(this);else{const e=$t;$t=null,an(()=>za(this),!1),$t=e}if(Pe){const e=this.observers?this.observers.length:0;Pe.sources?(Pe.sources.push(this),Pe.sourceSlots.push(e)):(Pe.sources=[this],Pe.sourceSlots=[e]),this.observers?(this.observers.push(Pe),this.observerSlots.push(Pe.sources.length-1)):(this.observers=[Pe],this.observerSlots=[Pe.sources.length-1])}return this.value}function ic(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&an(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],s=Ii&&Ii.running;s&&Ii.disposed.has(i),(s?!i.tState:!i.state)&&(i.pure?$t.push(i):qt.push(i),i.observers&&sc(i)),s||(i.state=ln)}if($t.length>1e6)throw $t=[],new Error},!1)),t}function Pr(e){if(!e.fn)return;la(e);const t=li;Wu(e,e.value,t)}function Wu(e,t,n){let r;const l=Se,i=Pe;Pe=Se=e;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=ln,e.owned&&e.owned.forEach(la),e.owned=null),e.updatedAt=n+1,pa(s)}finally{Pe=i,Se=l}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ic(e,r):e.value=r,e.updatedAt=n)}function ma(e,t,n,r=ln,l){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Se,context:Se?Se.context:null,pure:n};return Se===null||Se!==nc&&(Se.owned?Se.owned.push(i):Se.owned=[i]),i}function ja(e){if(e.state===0)return;if(e.state===Ya)return za(e);if(e.suspense&&Ae(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<li);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===ln)Pr(e);else if(e.state===Ya){const r=$t;$t=null,an(()=>za(e,t[0]),!1),$t=r}}function an(e,t){if($t)return e();let n=!1;t||($t=[]),qt?n=!0:qt=[],li++;try{const r=e();return qu(n),r}catch(r){n||(qt=null),$t=null,pa(r)}}function qu(e){if($t&&(lc($t),$t=null),e)return;const t=qt;qt=null,t.length&&an(()=>tc(t),!1)}function lc(e){for(let t=0;t<e.length;t++)ja(e[t])}function Ku(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:ja(r)}for(t=0;t<n;t++)ja(e[t])}function za(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const l=r.state;l===ln?r!==t&&(!r.updatedAt||r.updatedAt<li)&&ja(r):l===Ya&&za(r,t)}}}function sc(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Ya,n.pure?$t.push(n):qt.push(n),n.observers&&sc(n))}}function la(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const i=l.pop(),s=n.observerSlots.pop();r<l.length&&(i.sourceSlots[s]=r,l[r]=i,n.observerSlots[r]=s)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)la(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)la(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function il(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ls(e,t,n){try{for(const r of t)r(e)}catch(r){pa(r,n&&n.owner||null)}}function pa(e,t=Se){const n=ea&&t&&t.context&&t.context[ea],r=il(e);if(!n)throw r;qt?qt.push({fn(){Ls(r,n,t)},state:ln}):Ls(r,n,t)}function ll(e){if(typeof e=="function"&&!e.length)return ll(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=ll(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Ju(e,t){return function(r){let l;return L(()=>l=Ae(()=>(Se.context={...Se.context,[e]:r.value},si(()=>r.children))),void 0),l}}const Xu=Symbol("fallback");function Ps(e){for(let t=0;t<e.length;t++)e[t]()}function Zu(e,t,n={}){let r=[],l=[],i=[],s=0,o=t.length>1?[]:null;return ze(()=>Ps(i)),()=>{let c=e()||[],h=c.length,u,f;return c[rl],Ae(()=>{let m,y,v,$,S,C,w,b,A;if(h===0)s!==0&&(Ps(i),i=[],r=[],l=[],s=0,o&&(o=[])),n.fallback&&(r=[Xu],l[0]=ta(k=>(i[0]=k,n.fallback())),s=1);else if(s===0){for(l=new Array(h),f=0;f<h;f++)r[f]=c[f],l[f]=ta(g);s=h}else{for(v=new Array(h),$=new Array(h),o&&(S=new Array(h)),C=0,w=Math.min(s,h);C<w&&r[C]===c[C];C++);for(w=s-1,b=h-1;w>=C&&b>=C&&r[w]===c[b];w--,b--)v[b]=l[w],$[b]=i[w],o&&(S[b]=o[w]);for(m=new Map,y=new Array(b+1),f=b;f>=C;f--)A=c[f],u=m.get(A),y[f]=u===void 0?-1:u,m.set(A,f);for(u=C;u<=w;u++)A=r[u],f=m.get(A),f!==void 0&&f!==-1?(v[f]=l[u],$[f]=i[u],o&&(S[f]=o[u]),f=y[f],m.set(A,f)):i[u]();for(f=C;f<h;f++)f in v?(l[f]=v[f],i[f]=$[f],o&&(o[f]=S[f],o[f](f))):l[f]=ta(g);l=l.slice(0,s=h),r=c.slice(0)}return l});function g(m){if(i[f]=m,o){const[y,v]=O(f);return o[f]=v,t(c[f],y)}return t(c[f])}}}function a(e,t){return Ae(()=>e(t||{}))}function wa(){return!0}const sl={get(e,t,n){return t===Kt?n:e.get(t)},has(e,t){return t===Kt?!0:e.has(t)},set:wa,deleteProperty:wa,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:wa,deleteProperty:wa}},ownKeys(e){return e.keys()}};function Ei(e){return(e=typeof e=="function"?e():e)?e:{}}function Qu(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Oe(...e){let t=!1;for(let s=0;s<e.length;s++){const o=e[s];t=t||!!o&&Kt in o,e[s]=typeof o=="function"?(t=!0,N(o)):o}if(ec&&t)return new Proxy({get(s){for(let o=e.length-1;o>=0;o--){const c=Ei(e[o])[s];if(c!==void 0)return c}},has(s){for(let o=e.length-1;o>=0;o--)if(s in Ei(e[o]))return!0;return!1},keys(){const s=[];for(let o=0;o<e.length;o++)s.push(...Object.keys(Ei(e[o])));return[...new Set(s)]}},sl);const n={},r=Object.create(null);for(let s=e.length-1;s>=0;s--){const o=e[s];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let h=c.length-1;h>=0;h--){const u=c[h];if(u==="__proto__"||u==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,u);if(!r[u])r[u]=f.get?{enumerable:!0,configurable:!0,get:Qu.bind(n[u]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const g=n[u];g&&(f.get?g.push(f.get.bind(o)):f.value!==void 0&&g.push(()=>f.value))}}}const l={},i=Object.keys(r);for(let s=i.length-1;s>=0;s--){const o=i[s],c=r[o];c&&c.get?Object.defineProperty(l,o,c):l[o]=c?c.value:void 0}return l}function oi(e,...t){if(ec&&Kt in e){const l=new Set(t.length>1?t.flat():t[0]),i=t.map(s=>new Proxy({get(o){return s.includes(o)?e[o]:void 0},has(o){return s.includes(o)&&o in e},keys(){return s.filter(o=>o in e)}},sl));return i.push(new Proxy({get(s){return l.has(s)?void 0:e[s]},has(s){return l.has(s)?!1:s in e},keys(){return Object.keys(e).filter(s=>!l.has(s))}},sl)),i}const n={},r=t.map(()=>({}));for(const l of Object.getOwnPropertyNames(e)){const i=Object.getOwnPropertyDescriptor(e,l),s=!i.get&&!i.set&&i.enumerable&&i.writable&&i.configurable;let o=!1,c=0;for(const h of t)h.includes(l)&&(o=!0,s?r[c][l]=i.value:Object.defineProperty(r[c],l,i)),++c;o||(s?n[l]=i.value:Object.defineProperty(n,l,i))}return[...r,n]}const oc=e=>`Stale read from <${e}>.`;function H(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Zu(()=>e.each,e.children,t||void 0))}function x(e){const t=e.keyed,n=N(()=>e.when,void 0,void 0),r=t?n:N(n,void 0,{equals:(l,i)=>!l==!i});return N(()=>{const l=r();if(l){const i=e.children;return typeof i=="function"&&i.length>0?Ae(()=>i(t?l:()=>{if(!Ae(r))throw oc("Show");return n()})):i}return e.fallback},void 0,void 0)}function W(e){const t=si(()=>e.children),n=N(()=>{const r=t(),l=Array.isArray(r)?r:[r];let i=()=>{};for(let s=0;s<l.length;s++){const o=s,c=l[s],h=i,u=N(()=>h()?void 0:c.when,void 0,void 0),f=c.keyed?u:N(u,void 0,{equals:(g,m)=>!g==!m});i=()=>h()||(f()?[o,u,c]:void 0)}return i});return N(()=>{const r=n()();if(!r)return e.fallback;const[l,i,s]=r,o=s.children;return typeof o=="function"&&o.length>0?Ae(()=>o(s.keyed?i():()=>{var h;if(((h=Ae(n)())==null?void 0:h[0])!==l)throw oc("Match");return i()})):o},void 0,void 0)}function M(e){return e}let hr;function eh(){hr&&[...hr].forEach(e=>e())}function ct(e){let t;const[n,r]=O(t,void 0);return hr||(hr=new Set),hr.add(r),ze(()=>hr.delete(r)),N(()=>{let l;if(l=n()){const i=e.fallback;return typeof i=="function"&&i.length?Ae(()=>i(l,()=>r())):i}return Yu(()=>e.children,r)},void 0,void 0)}const th=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],nh=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...th]),rh=new Set(["innerHTML","textContent","innerText","children"]),ah=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),ih=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function lh(e,t){const n=ih[e];return typeof n=="object"?n[t]?n.$:void 0:n}const sh=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),oh=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),ch={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function dh(e,t,n){let r=n.length,l=t.length,i=r,s=0,o=0,c=t[l-1].nextSibling,h=null;for(;s<l||o<i;){if(t[s]===n[o]){s++,o++;continue}for(;t[l-1]===n[i-1];)l--,i--;if(l===s){const u=i<r?o?n[o-1].nextSibling:n[i-o]:c;for(;o<i;)e.insertBefore(n[o++],u)}else if(i===o)for(;s<l;)(!h||!h.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[i-1]&&n[o]===t[l-1]){const u=t[--l].nextSibling;e.insertBefore(n[o++],t[s++].nextSibling),e.insertBefore(n[--i],u),t[l]=n[i]}else{if(!h){h=new Map;let f=o;for(;f<i;)h.set(n[f],f++)}const u=h.get(t[s]);if(u!=null)if(o<u&&u<i){let f=s,g=1,m;for(;++f<l&&f<i&&!((m=h.get(t[f]))==null||m!==u+g);)g++;if(g>u-o){const y=t[s];for(;o<u;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[s++])}else s++;else t[s++].remove()}}}const Ms="_$DX_DELEGATE";function uh(e,t,n,r={}){let l;return ta(i=>{l=i,t===document?e():d(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{l(),t.textContent=""}}function p(e,t,n,r){let l;const i=()=>{const o=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:r?o.firstChild:o.content.firstChild},s=t?()=>Ae(()=>document.importNode(l||(l=i()),!0)):()=>(l||(l=i())).cloneNode(!0);return s.cloneNode=s,s}function $e(e,t=window.document){const n=t[Ms]||(t[Ms]=new Set);for(let r=0,l=e.length;r<l;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,$h))}}function G(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function hh(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function gh(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Ut(e,t){t==null?e.removeAttribute("class"):e.className=t}function Wa(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const l=n[0];e.addEventListener(t,n[0]=i=>l.call(e,n[1],i))}else e.addEventListener(t,n,typeof n!="function"&&n)}function fh(e,t,n={}){const r=Object.keys(t||{}),l=Object.keys(n);let i,s;for(i=0,s=l.length;i<s;i++){const o=l[i];!o||o==="undefined"||t[o]||(Ds(e,o,!1),delete n[o])}for(i=0,s=r.length;i<s;i++){const o=r[i],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(Ds(e,o,!0),n[o]=c)}return n}function mh(e,t,n){if(!t)return n?G(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let l,i;for(i in n)t[i]==null&&r.removeProperty(i),delete n[i];for(i in t)l=t[i],l!==n[i]&&(r.setProperty(i,l),n[i]=l);return n}function Lt(e,t={},n,r){const l={};return r||L(()=>l.children=sa(e,t.children,l.children)),L(()=>typeof t.ref=="function"&&ge(t.ref,e)),L(()=>ph(e,t,n,!0,l,!0)),l}function ge(e,t,n){return Ae(()=>e(t,n))}function d(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return sa(e,t,r,n);L(l=>sa(e,t(),l,n),r)}function ph(e,t,n,r,l={},i=!1){t||(t={});for(const s in l)if(!(s in t)){if(s==="children")continue;l[s]=Rs(e,s,null,l[s],n,i,t)}for(const s in t){if(s==="children")continue;const o=t[s];l[s]=Rs(e,s,o,l[s],n,i,t)}}function vh(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Ds(e,t,n){const r=t.trim().split(/\s+/);for(let l=0,i=r.length;l<i;l++)e.classList.toggle(r[l],n)}function Rs(e,t,n,r,l,i,s){let o,c,h,u,f;if(t==="style")return mh(e,n,r);if(t==="classList")return fh(e,n,r);if(n===r)return r;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const g=t.slice(3);r&&e.removeEventListener(g,r,typeof r!="function"&&r),n&&e.addEventListener(g,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const g=t.slice(10);r&&e.removeEventListener(g,r,!0),n&&e.addEventListener(g,n,!0)}else if(t.slice(0,2)==="on"){const g=t.slice(2).toLowerCase(),m=sh.has(g);if(!m&&r){const y=Array.isArray(r)?r[0]:r;e.removeEventListener(g,y)}(m||n)&&(Wa(e,g,n,m),m&&$e([g]))}else if(t.slice(0,5)==="attr:")G(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")gh(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(h=rh.has(t))||!l&&((u=lh(t,e.tagName))||(c=nh.has(t)))||(o=e.nodeName.includes("-")||"is"in s))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?Ut(e,n):o&&!c&&!h?e[vh(t)]=n:e[u||t]=n;else{const g=l&&t.indexOf(":")>-1&&ch[t.split(":")[0]];g?hh(e,g,t,n):G(e,ah[t]||t,n)}return n}function $h(e){let t=e.target;const n=`$$${e.type}`,r=e.target,l=e.currentTarget,i=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),s=()=>{const c=t[n];if(c&&!t.disabled){const h=t[`${n}Data`];if(h!==void 0?c.call(t,h,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&i(t.host),!0},o=()=>{for(;s()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();i(c[0]);for(let h=0;h<c.length-2&&(t=c[h],!!s());h++){if(t._$host){t=t._$host,o();break}if(t.parentNode===l)break}}else o();i(r)}function sa(e,t,n,r,l){for(;typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(i==="number"&&(t=t.toString(),t===n))return n;if(s){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=ar(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean")n=ar(e,n,r);else{if(i==="function")return L(()=>{let o=t();for(;typeof o=="function";)o=o();n=sa(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(ol(o,t,n,l))return L(()=>n=sa(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=ar(e,n,r),s)return n}else c?n.length===0?Ns(e,o,r):dh(e,n,o):(n&&ar(e),Ns(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=ar(e,n,r,t);ar(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ol(e,t,n,r){let l=!1;for(let i=0,s=t.length;i<s;i++){let o=t[i],c=n&&n[e.length],h;if(!(o==null||o===!0||o===!1))if((h=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))l=ol(e,o,c)||l;else if(h==="function")if(r){for(;typeof o=="function";)o=o();l=ol(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||l}else e.push(o),l=!0;else{const u=String(o);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return l}function Ns(e,t,n=null){for(let r=0,l=t.length;r<l;r++)e.insertBefore(t[r],n)}function ar(e,t,n,r){if(n===void 0)return e.textContent="";const l=r||document.createTextNode("");if(t.length){let i=!1;for(let s=t.length-1;s>=0;s--){const o=t[s];if(l!==o){const c=o.parentNode===e;!i&&!s?c?e.replaceChild(l,o):e.insertBefore(l,n):c&&o.remove()}else i=!0}}else e.insertBefore(l,n);return[l]}const _h=!1,bh="http://www.w3.org/2000/svg";function yh(e,t=!1){return t?document.createElementNS(bh,e):document.createElement(e)}function wh(e,t){const n=N(e);return N(()=>{const r=n();switch(typeof r){case"function":return Ae(()=>r(t));case"string":const l=oh.has(r),i=yh(r,l);return Lt(i,t,l),i}})}function Li(e){const[,t]=oi(e,["component"]);return wh(()=>e.component,t)}function cc(){let e=new Set;function t(l){return e.add(l),()=>e.delete(l)}let n=!1;function r(l,i){if(n)return!(n=!1);const s={to:l,options:i,defaultPrevented:!1,preventDefault:()=>s.defaultPrevented=!0};for(const o of e)o.listener({...s,from:o.location,retry:c=>{c&&(n=!0),o.navigate(l,{...i,resolve:!1})}});return!s.defaultPrevented}return{subscribe:t,confirm:r}}let cl;function Rl(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),cl=window.history.state._depth}Rl();function kh(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function Sh(e,t){let n=!1;return()=>{const r=cl;Rl();const l=r==null?null:cl-r;if(n){n=!1;return}l&&t(l)?(n=!0,window.history.go(-l)):e()}}const Ch=/^(?:[a-z0-9]+:)?\/\//i,Ah=/^\/+|(\/)\/+$/g,dc="http://sr";function Yn(e,t=!1){const n=e.replace(Ah,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function Ba(e,t,n){if(Ch.test(t))return;const r=Yn(e),l=n&&Yn(n);let i="";return!l||t.startsWith("/")?i=r:l.toLowerCase().indexOf(r.toLowerCase())!==0?i=r+l:i=l,(i||"/")+Yn(t,!i)}function xh(e,t){if(e==null)throw new Error(t);return e}function Th(e,t){return Yn(e).replace(/\/*(\*.*)?$/g,"")+Yn(t)}function uc(e){const t={};return e.searchParams.forEach((n,r)=>{r in t?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),t}function Ih(e,t,n){const[r,l]=e.split("/*",2),i=r.split("/").filter(Boolean),s=i.length;return o=>{const c=o.split("/").filter(Boolean),h=c.length-s;if(h<0||h>0&&l===void 0&&!t)return null;const u={path:s?"":"/",params:{}},f=g=>n===void 0?void 0:n[g];for(let g=0;g<s;g++){const m=i[g],y=m[0]===":",v=y?c[g]:c[g].toLowerCase(),$=y?m.slice(1):m.toLowerCase();if(y&&Pi(v,f($)))u.params[$]=v;else if(y||!Pi(v,$))return null;u.path+=`/${v}`}if(l){const g=h?c.slice(-h).join("/"):"";if(Pi(g,f(l)))u.params[l]=g;else return null}return u}}function Pi(e,t){const n=r=>r===e;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function Eh(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((l,i)=>l+(i.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function hc(e){const t=new Map,n=Lr();return new Proxy({},{get(r,l){return t.has(l)||rc(n,()=>t.set(l,N(()=>e()[l]))),t.get(l)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function Lh(e,t){const n=new URLSearchParams(e);Object.entries(t).forEach(([l,i])=>{i==null||i===""||i instanceof Array&&!i.length?n.delete(l):i instanceof Array?(n.delete(l),i.forEach(s=>{n.append(l,String(s))})):n.set(l,String(i))});const r=n.toString();return r?`?${r}`:""}function gc(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const l=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)l.push(n+=t[1]),r=r.slice(t[0].length);return gc(r).reduce((i,s)=>[...i,...l.map(o=>o+s)],[])}const Ph=100,fc=Zt(),Nl=Zt(),va=()=>xh(Yt(fc),"<A> and 'use' router primitives can be only used inside a Route."),Mh=()=>Yt(Nl)||va().base,Dh=e=>{const t=Mh();return N(()=>t.resolvePath(e()))},Rh=e=>{const t=va();return N(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},pn=()=>va().navigatorFactory(),Qt=()=>va().location,ne=()=>va().params,Te=()=>{const e=Qt(),t=pn(),n=(r,l)=>{const i=Ae(()=>Lh(e.search,r)+e.hash);t(i,{scroll:!1,resolve:!1,...l})};return[e.query,n]};function Nh(e,t=""){const{component:n,preload:r,load:l,children:i,info:s}=e,o=!i||Array.isArray(i)&&!i.length,c={key:e,component:n,preload:r||l,info:s};return mc(e.path).reduce((h,u)=>{for(const f of gc(u)){const g=Th(t,f);let m=o?g:g.split("/*",1)[0];m=m.split("/").map(y=>y.startsWith(":")||y.startsWith("*")?y:encodeURIComponent(y)).join("/"),h.push({...c,originalPath:u,pattern:m,matcher:Ih(m,!o,e.matchFilters)})}return h},[])}function Oh(e,t=0){return{routes:e,score:Eh(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let l=e.length-1;l>=0;l--){const i=e[l],s=i.matcher(n);if(!s)return null;r.unshift({...s,route:i})}return r}}}function mc(e){return Array.isArray(e)?e:[e]}function pc(e,t="",n=[],r=[]){const l=mc(e);for(let i=0,s=l.length;i<s;i++){const o=l[i];if(o&&typeof o=="object"){o.hasOwnProperty("path")||(o.path="");const c=Nh(o,t);for(const h of c){n.push(h);const u=Array.isArray(o.children)&&o.children.length===0;if(o.children&&!u)pc(o.children,h.pattern,n,r);else{const f=Oh([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((i,s)=>s.score-i.score)}function Mi(e,t){for(let n=0,r=e.length;n<r;n++){const l=e[n].matcher(t);if(l)return l}return[]}function Fh(e,t,n){const r=new URL(dc),l=N(u=>{const f=e();try{return new URL(f,r)}catch{return console.error(`Invalid path ${f}`),u}},r,{equals:(u,f)=>u.href===f.href}),i=N(()=>l().pathname),s=N(()=>l().search,!0),o=N(()=>l().hash),c=()=>"",h=oe(s,()=>uc(l()));return{get pathname(){return i()},get search(){return s()},get hash(){return o()},get state(){return t()},get key(){return c()},query:n?n(h):hc(h)}}let Vn;function Uh(){return Vn}function Bh(e,t,n,r={}){const{signal:[l,i],utils:s={}}=e,o=s.parsePath||(V=>V),c=s.renderPath||(V=>V),h=s.beforeLeave||cc(),u=Ba("",r.base||"");if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!l().value&&i({value:u,replace:!0,scroll:!1});const[f,g]=O(!1);let m;const y=(V,X)=>{X.value===v()&&X.state===S()||(m===void 0&&g(!0),Vn=V,m=X,ju(()=>{m===X&&($(m.value),C(m.state),eh(),A[1](Y=>Y.filter(K=>K.pending)))}).finally(()=>{m===X&&je(()=>{Vn=void 0,V==="navigate"&&R(m),g(!1),m=void 0})}))},[v,$]=O(l().value),[S,C]=O(l().state),w=Fh(v,S,s.queryWrapper),b=[],A=O([]),k=N(()=>typeof r.transformUrl=="function"?Mi(t(),r.transformUrl(w.pathname)):Mi(t(),w.pathname)),_=()=>{const V=k(),X={};for(let Y=0;Y<V.length;Y++)Object.assign(X,V[Y].params);return X},T=s.paramsWrapper?s.paramsWrapper(_,t):hc(_),I={pattern:u,path:()=>u,outlet:()=>null,resolvePath(V){return Ba(u,V)}};return L(oe(l,V=>y("native",V),{defer:!0})),{base:I,location:w,params:T,isRouting:f,renderPath:c,parsePath:o,navigatorFactory:P,matches:k,beforeLeave:h,preloadRoute:U,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:A};function E(V,X,Y){Ae(()=>{if(typeof X=="number"){X&&(s.go?s.go(X):console.warn("Router integration does not support relative routing"));return}const K=!X||X[0]==="?",{replace:le,resolve:re,scroll:Q,state:J}={replace:!1,resolve:!K,scroll:!0,...Y},pe=re?V.resolvePath(X):Ba(K&&w.pathname||"",X);if(pe===void 0)throw new Error(`Path '${X}' is not a routable path`);if(b.length>=Ph)throw new Error("Too many redirects");const ve=v();(pe!==ve||J!==S())&&(_h||h.confirm(pe,Y)&&(b.push({value:ve,replace:le,scroll:Q,state:S()}),y("navigate",{value:pe,state:J})))})}function P(V){return V=V||Yt(Nl)||I,(X,Y)=>E(V,X,Y)}function R(V){const X=b[0];X&&(i({...V,replace:X.replace,scroll:X.scroll}),b.length=0)}function U(V,X){const Y=Mi(t(),V.pathname),K=Vn;Vn="preload";for(let le in Y){const{route:re,params:Q}=Y[le];re.component&&re.component.preload&&re.component.preload();const{preload:J}=re;X&&J&&rc(n(),()=>J({params:Q,location:{pathname:V.pathname,search:V.search,hash:V.hash,query:uc(V),state:null,key:""},intent:"preload"}))}Vn=K}}function Vh(e,t,n,r){const{base:l,location:i,params:s}=e,{pattern:o,component:c,preload:h}=r().route,u=N(()=>r().path);c&&c.preload&&c.preload();const f=h?h({params:s,location:i,intent:Vn||"initial"}):void 0;return{parent:t,pattern:o,path:u,outlet:()=>c?a(c,{params:s,location:i,data:f,get children(){return n()}}):n(),resolvePath(m){return Ba(l.path(),m,u())}}}const Gh=e=>t=>{const{base:n}=t,r=si(()=>t.children),l=N(()=>pc(r(),t.base||""));let i;const s=Bh(e,l,()=>i,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(s),a(fc.Provider,{value:s,get children(){return a(Hh,{routerState:s,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[N(()=>(i=Lr())&&null),a(Yh,{routerState:s,get branches(){return l()}})]}})}})};function Hh(e){const t=e.routerState.location,n=e.routerState.params,r=N(()=>e.preload&&Ae(()=>{e.preload({params:n,location:t,intent:Uh()||"initial"})}));return a(x,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:l=>a(l,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function Yh(e){const t=[];let n;const r=N(oe(e.routerState.matches,(l,i,s)=>{let o=i&&l.length===i.length;const c=[];for(let h=0,u=l.length;h<u;h++){const f=i&&i[h],g=l[h];s&&f&&g.route.key===f.route.key?c[h]=s[h]:(o=!1,t[h]&&t[h](),ta(m=>{t[h]=m,c[h]=Vh(e.routerState,c[h-1]||e.routerState.base,Os(()=>r()[h+1]),()=>e.routerState.matches()[h])}))}return t.splice(l.length).forEach(h=>h()),s&&o?s:(n=c[0],c)}));return Os(()=>r()&&n)()}const Os=e=>()=>a(x,{get when(){return e()},keyed:!0,children:t=>a(Nl.Provider,{value:t,get children(){return t.outlet()}})}),ce=e=>{const t=si(()=>e.children);return Oe(e,{get children(){return t()}})};function jh([e,t],n,r){return[e,r?l=>t(r(l)):t]}function zh(e){let t=!1;const n=l=>typeof l=="string"?{value:l}:l,r=jh(O(n(e.get()),{equals:(l,i)=>l.value===i.value&&l.state===i.state}),void 0,l=>(!t&&e.set(l),l));return e.init&&ze(e.init((l=e.get())=>{t=!0,r[1](n(l)),t=!1})),Gh({signal:r,create:e.create,utils:e.utils})}function Wh(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function qh(e,t){const n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const Kh=new Map;function Jh(e=!0,t=!1,n="/_server",r){return l=>{const i=l.base.path(),s=l.navigatorFactory(l.base);let o,c;function h(v){return v.namespaceURI==="http://www.w3.org/2000/svg"}function u(v){if(v.defaultPrevented||v.button!==0||v.metaKey||v.altKey||v.ctrlKey||v.shiftKey)return;const $=v.composedPath().find(k=>k instanceof Node&&k.nodeName.toUpperCase()==="A");if(!$||t&&!$.hasAttribute("link"))return;const S=h($),C=S?$.href.baseVal:$.href;if((S?$.target.baseVal:$.target)||!C&&!$.hasAttribute("state"))return;const b=($.getAttribute("rel")||"").split(/\s+/);if($.hasAttribute("download")||b&&b.includes("external"))return;const A=S?new URL(C,document.baseURI):new URL(C);if(!(A.origin!==window.location.origin||i&&A.pathname&&!A.pathname.toLowerCase().startsWith(i.toLowerCase())))return[$,A]}function f(v){const $=u(v);if(!$)return;const[S,C]=$,w=l.parsePath(C.pathname+C.search+C.hash),b=S.getAttribute("state");v.preventDefault(),s(w,{resolve:!1,replace:S.hasAttribute("replace"),scroll:!S.hasAttribute("noscroll"),state:b?JSON.parse(b):void 0})}function g(v){const $=u(v);if(!$)return;const[S,C]=$;r&&(C.pathname=r(C.pathname)),l.preloadRoute(C,S.getAttribute("preload")!=="false")}function m(v){clearTimeout(o);const $=u(v);if(!$)return c=null;const[S,C]=$;c!==S&&(r&&(C.pathname=r(C.pathname)),o=setTimeout(()=>{l.preloadRoute(C,S.getAttribute("preload")!=="false"),c=S},20))}function y(v){if(v.defaultPrevented)return;let $=v.submitter&&v.submitter.hasAttribute("formaction")?v.submitter.getAttribute("formaction"):v.target.getAttribute("action");if(!$)return;if(!$.startsWith("https://action/")){const C=new URL($,dc);if($=l.parsePath(C.pathname+C.search),!$.startsWith(n))return}if(v.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const S=Kh.get($);if(S){v.preventDefault();const C=new FormData(v.target,v.submitter);S.call({r:l,f:v.target},v.target.enctype==="multipart/form-data"?C:new URLSearchParams(C))}}$e(["click","submit"]),document.addEventListener("click",f),e&&(document.addEventListener("mousemove",m,{passive:!0}),document.addEventListener("focusin",g,{passive:!0}),document.addEventListener("touchstart",g,{passive:!0})),document.addEventListener("submit",y),ze(()=>{document.removeEventListener("click",f),e&&(document.removeEventListener("mousemove",m),document.removeEventListener("focusin",g),document.removeEventListener("touchstart",g)),document.removeEventListener("submit",y)})}}function Xh(e){const t=()=>{const r=window.location.pathname.replace(/^\/+/,"/")+window.location.search,l=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:r+window.location.hash,state:l}},n=cc();return zh({get:t,set({value:r,replace:l,scroll:i,state:s}){l?window.history.replaceState(kh(s),"",r):window.history.pushState(s,"",r),qh(decodeURIComponent(window.location.hash.slice(1)),i),Rl()},init:r=>Wh(window,"popstate",Sh(r,l=>{if(l&&l<0)return!n.confirm(l);{const i=t();return!n.confirm(i.value,{state:i.state})}})),create:Jh(e.preload,e.explicitLinks,e.actionBase,e.transformUrl),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var Zh=p("<a>");function B(e){e=Oe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=oi(e,["href","state","class","activeClass","inactiveClass","end"]),n=Dh(()=>e.href),r=Rh(n),l=Qt(),i=N(()=>{const s=n();if(s===void 0)return[!1,!1];const o=Yn(s.split(/[?#]/,1)[0]).toLowerCase(),c=decodeURI(Yn(l.pathname).toLowerCase());return[e.end?o===c:c.startsWith(o+"/")||c===o,o===c]});return(()=>{var s=Zh();return Lt(s,Oe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!i()[0],[e.activeClass]:i()[0],...t.classList}},link:"",get"aria-current"(){return i()[1]?"page":void 0}}),!1,!1),s})()}function hn(e){const t=pn(),n=Qt(),{href:r,state:l}=e,i=typeof r=="function"?r({navigate:t,location:n}):r;return t(i,{replace:!0,state:l}),null}const dl=Symbol("store-raw"),pr=Symbol("store-node"),gn=Symbol("store-has"),vc=Symbol("store-self");function $c(e){let t=e[Kt];if(!t&&(Object.defineProperty(e,Kt,{value:t=new Proxy(e,tg)}),!Array.isArray(e))){const n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let l=0,i=n.length;l<i;l++){const s=n[l];r[s].get&&Object.defineProperty(e,s,{enumerable:r[s].enumerable,get:r[s].get.bind(t)})}}return t}function Cn(e){let t;return e!=null&&typeof e=="object"&&(e[Kt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function Tr(e,t=new Set){let n,r,l,i;if(n=e!=null&&e[dl])return n;if(!Cn(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,o=e.length;s<o;s++)l=e[s],(r=Tr(l,t))!==l&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,h=s.length;c<h;c++)i=s[c],!o[i].get&&(l=e[i],(r=Tr(l,t))!==l&&(e[i]=r))}return e}function qa(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function oa(e,t,n){if(e[t])return e[t];const[r,l]=O(n,{equals:!1,internal:!0});return r.$=l,e[t]=r}function Qh(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===Kt||t===pr||(delete n.value,delete n.writable,n.get=()=>e[Kt][t]),n}function _c(e){al()&&oa(qa(e,pr),vc)()}function eg(e){return _c(e),Reflect.ownKeys(e)}const tg={get(e,t,n){if(t===dl)return e;if(t===Kt)return n;if(t===rl)return _c(e),n;const r=qa(e,pr),l=r[t];let i=l?l():e[t];if(t===pr||t===gn||t==="__proto__")return i;if(!l){const s=Object.getOwnPropertyDescriptor(e,t);al()&&(typeof i!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(i=oa(r,t,i)())}return Cn(i)?$c(i):i},has(e,t){return t===dl||t===Kt||t===rl||t===pr||t===gn||t==="__proto__"?!0:(al()&&oa(qa(e,gn),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:eg,getOwnPropertyDescriptor:Qh};function Nt(e,t,n,r=!1){if(!r&&e[t]===n)return;const l=e[t],i=e.length;n===void 0?(delete e[t],e[gn]&&e[gn][t]&&l!==void 0&&e[gn][t].$()):(e[t]=n,e[gn]&&e[gn][t]&&l===void 0&&e[gn][t].$());let s=qa(e,pr),o;if((o=oa(s,t,l))&&o.$(()=>n),Array.isArray(e)&&e.length!==i){for(let c=e.length;c<i;c++)(o=s[c])&&o.$();(o=oa(s,"length",i))&&o.$(e.length)}(o=s[vc])&&o.$()}function bc(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const l=n[r];Nt(e,l,t[l])}}function ng(e,t){if(typeof t=="function"&&(t=t(e)),t=Tr(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const l=t[n];e[n]!==l&&Nt(e,n,l)}Nt(e,"length",r)}else bc(e,t)}function Xr(e,t,n=[]){let r,l=e;if(t.length>1){r=t.shift();const s=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)Xr(e,[r[c]].concat(t),n);return}else if(o&&s==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&Xr(e,[c].concat(t),n);return}else if(o&&s==="object"){const{from:c=0,to:h=e.length-1,by:u=1}=r;for(let f=c;f<=h;f+=u)Xr(e,[f].concat(t),n);return}else if(t.length>1){Xr(e[r],t,[r].concat(n));return}l=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(l,n),i===l)||r===void 0&&i==null||(i=Tr(i),r===void 0||Cn(l)&&Cn(i)&&!Array.isArray(i)?bc(l,i):Nt(e,r,i))}function We(...[e,t]){const n=Tr(e||{}),r=Array.isArray(n),l=$c(n);function i(...s){je(()=>{r&&s.length===1?ng(n,s[0]):Xr(n,s)})}return[l,i]}const ul=Symbol("store-root");function or(e,t,n,r,l){const i=t[n];if(e===i)return;const s=Array.isArray(e);if(n!==ul&&(!Cn(e)||!Cn(i)||s!==Array.isArray(i)||l&&e[l]!==i[l])){Nt(t,n,e);return}if(s){if(e.length&&i.length&&(!r||l&&e[0]&&e[0][l]!=null)){let h,u,f,g,m,y,v,$;for(f=0,g=Math.min(i.length,e.length);f<g&&(i[f]===e[f]||l&&i[f]&&e[f]&&i[f][l]===e[f][l]);f++)or(e[f],i,f,r,l);const S=new Array(e.length),C=new Map;for(g=i.length-1,m=e.length-1;g>=f&&m>=f&&(i[g]===e[m]||l&&i[g]&&e[m]&&i[g][l]===e[m][l]);g--,m--)S[m]=i[g];if(f>m||f>g){for(u=f;u<=m;u++)Nt(i,u,e[u]);for(;u<e.length;u++)Nt(i,u,S[u]),or(e[u],i,u,r,l);i.length>e.length&&Nt(i,"length",e.length);return}for(v=new Array(m+1),u=m;u>=f;u--)y=e[u],$=l&&y?y[l]:y,h=C.get($),v[u]=h===void 0?-1:h,C.set($,u);for(h=f;h<=g;h++)y=i[h],$=l&&y?y[l]:y,u=C.get($),u!==void 0&&u!==-1&&(S[u]=i[h],u=v[u],C.set($,u));for(u=f;u<e.length;u++)u in S?(Nt(i,u,S[u]),or(e[u],i,u,r,l)):Nt(i,u,e[u])}else for(let h=0,u=e.length;h<u;h++)or(e[h],i,h,r,l);i.length>e.length&&Nt(i,"length",e.length);return}const o=Object.keys(e);for(let h=0,u=o.length;h<u;h++)or(e[o[h]],i,o[h],r,l);const c=Object.keys(i);for(let h=0,u=c.length;h<u;h++)e[c[h]]===void 0&&Nt(i,c[h],void 0)}function Jt(e,t={}){const{merge:n,key:r="id"}=t,l=Tr(e);return i=>{if(!Cn(i)||!Cn(l))return l;const s=or(l,{[ul]:i},ul,n,r);return s===void 0?i:s}}const yc=Zt(),Ol=()=>Yt(yc),wc=Zt(),tt=()=>Yt(wc),kc=Zt(),Fl=()=>Yt(kc),Sc=Zt(),ie=()=>Yt(Sc),Cc=Zt(),en=()=>Yt(Cc),Ac=Zt(),Ul=()=>Yt(Ac),xc=Zt(),Bl=()=>Yt(xc),Tc=Zt(),Ic=()=>Yt(Tc),Vl=Zt(),vn=()=>Yt(Vl);var rg=p("<div class=cp-install-pwa-container>Install as Progressive Web App to get more screen space.<button>Install</button><button>Not now");function ag(){const{isTouch:e,isPWA:t}=en(),[n,r]=O(!1),[l,i]=O(!1);let s;return window.addEventListener("beforeinstallprompt",o=>{s=o,r(!0)}),a(x,{get when(){return N(()=>!!(n()&&e()))()&&!t()},get children(){var o=rg(),c=o.firstChild,h=c.nextSibling,u=h.nextSibling;return d(o,a(x,{get when(){return l()},children:" Failed to install"}),h),h.$$click=async()=>{if(s!==null){s.prompt();const{outcome:f}=await s.userChoice;if(f==="accepted")return s=null,r(!1)}i(!0)},u.$$click=()=>r(!1),o}})}$e(["click"]);const Mr=location.hostname==="localhost",Wt={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};Wt.flavorTexts=ci(Wt);const jn={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};jn.flavorTexts=ci(jn);const ca={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};ca.flavorTexts=ci(ca);const Sn={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};Sn.flavorTexts=ci(Sn);const Ec={CN:{flavorText:"China"},JP:{flavorText:"Japan"},KR:{flavorText:"South Korea"},TW:{flavorText:"Taiwan"}},Gl={anime:{api:"ANIME",flavorText:"Anime"},comic:{api:"COMIC",flavorText:"Comic"},doujinshi:{api:"DOUJINSHI",flavorText:"Doujinshi"},game:{api:"GAME",flavorText:"Game"},light_novel:{api:"LIGHT_NOVEL",flavorText:"Light Novel"},live_action:{api:"LIVE_ACTION",flavorText:"Live Action"},manga:{api:"MANGA",flavorText:"Manga"},multimedia_project:{api:"MULTIMEDIA_PROJECT",flavorText:"Multimedia Project"},novel:{api:"NOVEL",flavorText:"Novel"},original:{api:"ORIGINAL",flavorText:"Original"},other:{api:"OTHER",flavorText:"Other"},picture_book:{api:"PICTURE_BOOK",flavorText:"Picture Book"},video_game:{api:"VIDEO_GAME",flavorText:"Video Game"},visual_novel:{api:"VISUAL_NOVEL",flavorText:"Visual Novel"},web_novel:{api:"WEB_NOVEL",flavorText:"Web Novel"}};function ci(e){return Object.values(e).reduce((t,n)=>Object.values(n).reduce((r,l)=>Object.entries(l).reduce((i,[s,o])=>(i[s]=o.flavorText,i),r),t),{})}const Kn="anilist",Dr="jikan",ig="animethemes",Fs="LOB_DEV_BRANCH",hl="ani",Ka="mal",di="only-if-cached",lg="default",sg="fetch-once",og="reload",Lc="no-store",$a="anime",Pc="manga",cg="ANIME",Mc="Japanese",Dc="Not yet aired",dg="Finished Airing",ug="Currently Airing",hg="Publishing",Us="Finished",gg="Discontinued",fg="On Hiatus",F=(e,t="Not true")=>{if(!e)throw new Error(t)},Rc=(e,t="Not false")=>F(!e,t),mg=(e="Assert unreachable")=>F(!1,e),It=(e,t="Value",n="")=>F(typeof e=="string",t+" is not type of string. "+n),fn=(e,t="Value",n="")=>F(typeof e=="function",t+" is not type of function. "+n),Nc=(e,t="Value",n="")=>F(Number.isInteger(e),t+" is not type of integer. "+n),ui=(e,t="Value",n="")=>{const r=t+" is not integer. "+n;F(typeof e=="string"||Number.isInteger(e),r),F(e&&Number.isInteger(+e),r)},Jn=(e,t,n={},r)=>{F(t.length>10,"Query must be above of length 10");const l={"Content-Type":"application/json"};return e&&(l.Authorization="Bearer "+e),new Xl("https://graphql.anilist.co",{method:"POST",headers:l,body:{query:t,variables:n}},r)},Hl=(e,t,n={},r)=>{const l=Jn(e,t,n,r);return fi(l,Lc)},An=(e,t)=>new Xl(e,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},t),Yl=e=>e.data.Page,Oc=(e,t,n=1)=>Hl(e,nd,{...t,page:n},Yl),pg=(e,t)=>{const n=Oc(e,t,"pageless");return fi(n,di)},vg=({token:e,id:t,isMalId:n,type:r})=>n?Fc(e,r,t):Jn(e,jl,{id:t},l=>l.data.Media),tn=(e,t)=>{var r,l;F(t.id_in||t.idMal_in,"Missing list for ids");const n=((r=t.id_in)==null?void 0:r.length)||((l=t.idMal_in)==null?void 0:l.length);if(n)return Jn(e,Kg(n),t,i=>Object.values(i.data).map(s=>s.media).flat())},$g=(e,t,n=1)=>Jn(e,Ig,{id:t,page:n},r=>r.data.Media.recommendations),Fc=(e,t,n)=>Jn(e,jl,{idMal:n,type:t.toUpperCase()},r=>r.data.Media),_g=({token:e,id:t,...n})=>{if(t)return Jn(e,ed,{id:t,...n},Yl)},bg=e=>{switch(e){case"airing":return["AIRING"];case"activity":return["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"];case"forum":return["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"];case"follows":return["FOLLOWING"];case"media":return["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"];case"all":return;default:mg("Unknown notification type")}},Uc=(e,t,n=1)=>{const r=bg(t);return Hl(e,Un,{page:n,types:r},Yl)},yg=(e,t)=>{const n=Uc(e,t,"pageless");return fi(n,di)},Bc=(e,t,n=1)=>Hl(e,td,{id:t,page:n},r=>r.data.Media),wg=(e,t)=>{const n=Bc(e,t,"pageless");return fi(n,di)},kg=({name:e,type:t,token:n})=>(F(e,"Name is missing"),Jn(n,gl,{userName:e.toLowerCase(),type:t.toUpperCase()},r=>r.data.MediaListCollection)),Vc=(e,t)=>{switch(It(e,"type"),ui(t,"id"),e){case $a:return An(jc(t),n=>n.data);case Pc:return An(zc(t),n=>n.data)}},Gc=(e,t)=>{switch(It(e,"type"),ui(t,"id"),e){case $a:return An(Wc(t),n=>n.data);case Pc:return An(qc(t),n=>n.data)}},Hc=(e,t)=>{if(It(e,"type"),ui(t,"id"),e===$a)return An(Kc(t),n=>n.data)},Sg=e=>(ui(e,"id"),An(Mg(e),t=>t.data)),Bs=e=>{var t,n;return((n=(t=e.anime)==null?void 0:t[0])==null?void 0:n.animethemes)??[]},Cg=({id:e,api:t,type:n})=>{if(n===$a)switch(t){case hl:return An(Yc(e),Bs);case Ka:return An(Lg(e),Bs)}};class Ag{constructor(t,n,r){F(t,"Missing cacheKey"),F(r,"Don't cache empty data"),F(n,"Expiration date is missing"),this.data=r,this.cacheKey=t,this.expires=Jf(n)}}const jl=be`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
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
}`,xg=be`query ($page: Int, $id: Int, $type: LikeableType) {
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
}`,Tg=be`query (
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
}`,Ig=be`query media($id: Int, $page: Int) {
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
}`,Eg=be`mutation (
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
}`,Yc=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Lg=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,Pg=e=>`https://api.animethemes.moe/artist/${e}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`,jc=e=>`https://api.jikan.moe/v4/anime/${e}/full`,zc=e=>`https://api.jikan.moe/v4/manga/${e}/full`,Wc=e=>`https://api.jikan.moe/v4/anime/${e}/characters`,qc=e=>`https://api.jikan.moe/v4/manga/${e}/characters`,Mg=e=>`https://api.jikan.moe/v4/characters/${e}/full`,Kc=e=>`https://api.jikan.moe/v4/anime/${e}/staff`,Dg=(e,t)=>`https://api.jikan.moe/v4/${e}?${t}`,Rg=(e,t)=>`https://api.jikan.moe/v4/seasons/${e}?${t}`,Ng=e=>`https://api.jikan.moe/v4/genres/${e}`,Og=be`query ($id: Int, $page: Int) {
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
}`,Fg=be`query ($id: Int) {
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
}`,Un=be`query ($page: Int, $types: [NotificationType]) {
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
}`,Jc=e=>be`query ($name: String) {
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
}`,Ug=Jc("anime"),Bg=Jc("manga"),Xc=e=>be`query ($name: String) {
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
}`,Vg=Xc("manga"),Gg=Xc("anime"),Zc=e=>be`query ($name: String) {
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
}`,Hg=Zc("manga"),Yg=Zc("anime"),jg=be`query ($name: String) {
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
}`,zg=be`query ($name: String) {
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
}`,Qc=e=>be`query ($name: String) {
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
}`,Wg=Qc("manga"),qg=Qc("anime"),Kg=e=>be`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
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
}`,Jg=e=>be`query ($ids: [Int]) {
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
}`,Xg=be`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,Zg=be`query ($id: Int!, $page: Int) {
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
}`,Qg=be`query ($id: Int!, $page: Int) {
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
}`,ed=be`query ($id: Int, $page: Int, $perPage: Int) {
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
}`,ef=be`mutation (
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
}`,tf=be`query (
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
}`,gl=be`query ($userId: Int, $userName: String, $type: MediaType) {
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
          theme
        }
        mangaList {
          sectionOrder
          customLists
          splitCompletedSectionByFormat
          theme
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
}`,td=be`query media($id: Int, $page: Int) {
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
}`,nf=be`query media($id: Int, $page: Int) {
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
}`,rf=be`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,af=be`mutation (
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
}`,lf=be`mutation ($id: Int, $type: LikeableType) {
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
}`,nd=be`query (
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
}`,Vs=be`query ($userId: Int, $type: MediaType, $perPage: Int) {
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
}`,sf=be`mutation (
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
}`,Di=be`query staff(
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
}`,of=be`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
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
}`,Gs=be`query character(
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
}`,cf=be`query {
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
}`,df=be`query {
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
}`,uf=be`query (
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
}`,Hs=be`query (
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
}`,hf=be`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,gf=be`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,ff=be`query ($mediaId: Int) {
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
}`,mf=be`query ($id: Int, $name: String) {
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
}`,pf=be`query ($id: Int, $type: ActivityType, $page: Int) {
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
}`,vf=be`query {
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
}`;function be(e,...t){const n=[];for(let l=0;l<e.length;l++)n.push(e[l],t[l]||"");const r=/\s*([{}():,[\]])\s*/g;return n.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}const fl=["WINTER","SPRING","SUMMER","FALL"],Va=(e=7)=>{const t=new Date;t.setDate(t.getDate()+e);const n=t.getFullYear(),r=$f(t.getMonth());return F(Number.isInteger(e),"Offsetdays is not an integer"),{season:r,seasonYear:n,nextSeason:gr(r,n,1).season,nextYear:gr(r,n,1).year}};function gr(e,t,n=0){F(typeof t=="number","year is not a number"),F(typeof e=="string","season is not a string");const r=n%4,l=Math.trunc(n/4),i=fl.indexOf(e.toUpperCase());return(i+r<0||i+r>3)&&(t+=r/Math.abs(r)),{year:t+l,season:fl[(4+i+r)%4]}}function $f(e){return fl[Math.floor(e/3)]}var $r,_r,ga,xt,br,fa,yr,wr,kr,Sr,Ht,ml,rd,pl,ad;const bs=class bs{constructor({start:t,limit:n,interval:r=60,fillAmount:l=1,pool:i,defaultDelay:s=30}){ut(this,Ht);ut(this,$r,[]);ut(this,_r,null);ut(this,ga,null);ut(this,xt);ut(this,br);ut(this,fa);ut(this,yr);ut(this,wr);ut(this,kr);ut(this,Sr,Promise.resolve());ht(this,xt,t),ht(this,br,n),ht(this,fa,r),ht(this,yr,l),ht(this,kr,s),ht(this,wr,i),Et(this,Ht,ml).call(this)}requestToken(){return Ee(this,xt)>0?(xi(this,xt)._--,!0):!1}enqueue(t){return ht(this,Sr,Ee(this,Sr).then(t).catch(n=>{console.error("Request error:",n)})),Ee(this,Sr)}getDefaultDelay(){return Ee(this,kr)}getsNextToken(){const{promise:t,resolve:n}=Promise.withResolvers();return this.addToBucket(n),t}addToBucket(t){Ee(this,$r).push(t)}delayBucket(t){Et(this,Ht,rd).call(this,t||Ee(this,kr))}};$r=new WeakMap,_r=new WeakMap,ga=new WeakMap,xt=new WeakMap,br=new WeakMap,fa=new WeakMap,yr=new WeakMap,wr=new WeakMap,kr=new WeakMap,Sr=new WeakMap,Ht=new WeakSet,ml=function(){clearInterval(Ee(this,_r)),ht(this,_r,setInterval(()=>Et(this,Ht,pl).call(this),Ee(this,fa)*1e3))},rd=function(t){ht(this,xt,0),clearInterval(Ee(this,_r)),clearTimeout(Ee(this,ga)),ht(this,ga,setTimeout(()=>{Et(this,Ht,ml).call(this),Et(this,Ht,pl).call(this)},t*1e3))},pl=function(){var n;Ee(this,wr)instanceof bs?ht(this,xt,Math.min(Ee(this,xt)+Math.min(Ee(this,yr),Et(n=Ee(this,wr),Ht,ad).call(n)),Ee(this,br))):ht(this,xt,Math.min(Ee(this,xt)+Ee(this,yr),Ee(this,br)));const t=Ee(this,$r).slice();Ee(this,$r).length=0,t.forEach(r=>r())},ad=function(){return Ee(this,xt)>0?xi(this,xt)._--:Ee(this,xt)};let kn=bs;const Ri=Mr,Ce=hi({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),_f=hi({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),pt=hi({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),Ys=hi({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),Ni={animeThemes:new kn({start:90,limit:90,interval:60,defaultDelay:20}),anilist:new kn({start:5,limit:5,interval:2,defaultDelay:20,pool:new kn({start:60,limit:90,interval:60,fillAmount:60})}),jikan:new kn({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new kn({start:3,limit:3,interval:1.25,pool:new kn({start:60,limit:60,interval:60,fillAmount:60})})})};function js(e,t,n){let r=null;const l=t.reduce((i,s)=>(s.active&&(s.key==="season"?r=s.value:i.push(`${s.key}=${s.value}`)),i),[]);return n>1&&l.push(`page=${n}`),r?ae.getJson(Rg(r,l.sort().join("&")),i=>(i.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),i)):ae.getJson(Dg(e,l.sort().join("&")),i=>(i.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),i))}const de={animeThemes:{themesByAniListId:pt(e=>ae.getJson(Yc(e))),artisBySlug:pt(e=>ae.getJson(Pg(e)))},myAnimeList:{animeById:pt(e=>ae.getJson(jc(e),t=>t.data)),mangaById:pt(e=>ae.getJson(zc(e),t=>t.data)),animeCharactersById:pt(e=>ae.getJson(Wc(e),t=>t.data)),mangaCharactersById:pt(e=>ae.getJson(qc(e),t=>t.data)),animeStaffById:pt(e=>ae.getJson(Kc(e))),mediaSearch:pt(js),mediaSearchCache:Ys(js),genresAndThemes:pt(e=>ae.getJson(Ng(e),t=>{const n=new Set,r=["genres","genres","themes"],l={genres:[],themes:[]};let i=0;return t.data.reduce((s,o)=>n.has(o.mal_id)?s:(o.name<s&&(i=Math.min(i+1,r.length-1)),l[r[i]].push(o),n.add(o.mal_id),o.name),""),l.genres.sort(),{translations:{[e]:Object.fromEntries(t.data.map(s=>[s.name,s.mal_id]))},...l}}))},anilist:{mediaId:Ce((e,t)=>ae.authAnilist(t,jl,{id:e,perPage:6})),rateRecommendation:async(e,t,n,r,l)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!=null,"Id missing"),F(n!=null,"Rating missing"),F(r!=null,"MediaId missing"),F(l!=null,"MediaRecommendationId missing"),await ae.authAnilist(e,Eg,{id:t,rating:n,mediaId:r,mediaRecommendationId:l},s=>s.data.SaveRecommendation).send()),userByName:Ce((e,t)=>(F(e,"Name is missing"),ae.authAnilist(t,mf,{name:e},n=>n.data.User))),toggleFollow:async(e,t)=>(F(t,"id is missing"),await ae.authAnilist(e,Xg,{id:t},r=>r.data.ToggleFollow).send()),userFollowing:Ce((e,t=1,n)=>(F(e,"id is missing"),ae.authAnilist(n,Qg,{id:e,page:t},r=>r.data.Page))),userAnimeStats:Ce((e,t)=>ae.authAnilist(t,Ug,{name:e},n=>n.data.User.statistics.anime)),userMangaStats:Ce((e,t)=>ae.authAnilist(t,Bg,{name:e},n=>n.data.User.statistics.manga)),userAnimeGenres:Ce((e,t)=>ae.authAnilist(t,Gg,{name:e},n=>n.data.User.statistics.anime.genres)),userMangaGenres:Ce((e,t)=>ae.authAnilist(t,Vg,{name:e},n=>n.data.User.statistics.manga.genres)),userAnimeTags:Ce((e,t)=>ae.authAnilist(t,Yg,{name:e},n=>n.data.User.statistics.anime.tags)),userMangaTags:Ce((e,t)=>ae.authAnilist(t,Hg,{name:e},n=>n.data.User.statistics.manga.tags)),userAnimeStudios:Ce((e,t)=>ae.authAnilist(t,jg,{name:e},n=>n.data.User.statistics.anime.studios)),userAnimeVoiceActors:Ce((e,t)=>ae.authAnilist(t,zg,{name:e},n=>n.data.User.statistics.anime.voiceActors)),userAnimeStaff:Ce((e,t)=>ae.authAnilist(t,qg,{name:e},n=>n.data.User.statistics.anime.staff)),userMangaStaff:Ce((e,t)=>ae.authAnilist(t,Wg,{name:e},n=>n.data.User.statistics.manga.staff)),characterIds:pt((e,t)=>ae.authAnilist(t,Jg(e),{ids:e},n=>Object.values(n.data).map(r=>r.characters).flat())),userFollowers:Ce((e,t=1,n)=>(F(e,"id is missing"),ae.authAnilist(n,Zg,{id:e,page:t},r=>r.data.Page))),activityByUserId:Ce((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,pf,{id:e}))),activityById:Ce((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,Fg,{id:e},n=>n.data.Activity))),listOfActivityLikes:pt((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,xg,{id:e,type:"ACTIVITY"},n=>n.data.Page))),activityRepliesById:Ce((e,t,n)=>(F(e,"Id is missing"),ae.authAnilist(n,Og,{id:e,page:t},r=>r.data.Page))),notifications:_f((e,t,n=1)=>{switch(t){case"airing":return ae.authAnilist(e,Un,{page:n,types:["AIRING"]},r=>r.data.Page);case"activity":return ae.authAnilist(e,Un,{page:n,types:["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"]},r=>r.data.Page);case"forum":return ae.authAnilist(e,Un,{page:n,types:["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"]},r=>r.data.Page);case"follows":return ae.authAnilist(e,Un,{page:n,types:["FOLLOWING"]},r=>r.data.Page);case"media":return ae.authAnilist(e,Un,{page:n,types:["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"]},r=>r.data.Page);case"all":default:return ae.authAnilist(e,Un,{page:n},r=>r.data.Page)}}),searchUsers:pt((e,t,n)=>(F(e,"Search is missing"),ae.authAnilist(n,Tg,{search:e,page:t},r=>r.data.Page))),mediaListByUserName:Ce((e,t,n)=>(F(e,"Name is missing"),ae.authAnilist(n,gl,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),mediaListByUserNameFetchOnce:pt((e,t,n)=>(F(e,"Name is missing"),ae.authAnilist(n,gl,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),favouritesByUserId:Ce((e,t,n)=>(F(e,"Id is missing"),F(t,"Page is missing"),ae.authAnilist(n,tf,{id:e,page:t},r=>r.data.User.favourites))),mutateFavourites:async(e,t)=>await ae.authAnilist(e,ef,t).send(),characterInfoById:Ce((e,t)=>ae.authAnilist(t,Gs,{id:e},n=>n.data.Character)),characterMediaById:Ce((e,t,n={})=>ae.authAnilist(e,Gs,{...n,page:n.page||1,sort:n.sort||"POPULARITY_DESC",onList:n.onList,withRoles:n.withRoles||!0,id:t},r=>r.data.Character.media)),staffInfoById:Ce((e,t)=>ae.authAnilist(t,Di,{id:e},n=>n.data.Staff)),studioInfoAndMediaById:Ce((e,t={},n)=>ae.authAnilist(n,of,{...t,page:t.page||1,sort:t.sort||"START_DATE_DESC",onList:t.onList,id:e},r=>r.data.Studio)),staffCharactersById:Ce((e,t,n={})=>ae.authAnilist(e,Di,{...n,characterPage:n.characterPage||1,sort:n.sort||"START_DATE_DESC",onList:n.onList,withCharacterRoles:!0,id:t},r=>r.data.Staff.characterMedia)),staffMediaById:Ce((e,t,n,r)=>ae.authAnilist(e,Di,{...r,staffPage:r.staffPage||1,sort:r.sort||"START_DATE_DESC",onList:r.onList,withStaffRoles:!0,id:t,type:n},l=>l.data.Staff.staffMedia)),genresAndTags:pt(()=>ae.anilist(hf,{},e=>e.data)),externalSources:pt(e=>ae.anilist(gf,{type:e||void 0},t=>t.data.ExternalLinkSourceCollection)),characters:Ce((e,t=1,n)=>ae.authAnilist(n,td,{id:e,page:t},r=>r.data.Media)),allMediaStaff:Ce((e,t=1,n)=>ae.authAnilist(n,nf,{id:e,page:t},r=>r.data.Media)),trendingMedia:Ce(e=>{const t=Va();return ae.authAnilist(e,cf,{season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingAnime:Ce(e=>{const t=Va();return ae.authAnilist(e,uf,{type:"ANIME",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingManga:Ce(e=>{const t=Va();return ae.authAnilist(e,df,{type:"MANGA",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),mediaListEntry:async(e,t)=>(F(t,"MediaId missing"),F(typeof e!="function","This specific api doesnt support signals"),await ae.authAnilist(e,ff,{mediaId:t}).send()),getAuthUserData:Ce(e=>ae.authAnilist(e,vf,{},t=>t.data.Viewer)),getActivity:Ce((e,t,n=1)=>ae.authAnilist(e,nd,{...t,page:n},r=>r.data.Page)),searchMedia:pt((e,t,n,r={})=>{const l=t.reduce((i,s)=>(s.active&&(i[s.key]=s.value),i),{page:n});return Object.entries(r).forEach(([i,s])=>{i==="format"||i==="season"||i==="seasonYear"?l[i]=s:i==="episodeGreater"?l[i]=Math.max(s,l[i]||0):(l[i]&&(l[i]=[s,l[i]].flat()),l[i]??(l[i]=s))}),ae.authAnilist(e,Hs,l,i=>i.data.Page)}),searchMediaCache:Ys((e,t,n)=>{const r=t.reduce((l,i)=>(i.active&&(l[i.key]=i.value),l),{page:n});return ae.authAnilist(e,Hs,r,l=>l.data.Page)}),friendsMediaScore:Ce((e,t,n)=>ae.authAnilist(e,ed,{id:t,...n})),mutateMedia:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t,"Variables missing"),F(t.id||t.mediaId,"No mutation id given"),await ae.authAnilist(e,sf,t,r=>r.data.SaveMediaListEntry).send()),deleteMediaListEntry:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!==void 0,"Variables missing"),await ae.authAnilist(e,rf,{id:t}).send()),toggleActivityLike:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t.id||t.mediaId,"No mutation id given"),await ae.authAnilist(e,lf,{...t,type:"ACTIVITY"}).send()),toggleFavourite:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),await ae.authAnilist(e,af,t).send()),wachingAnime:Ce((e,t)=>ae.authAnilist(t,Vs,{userId:e,type:"ANIME",perPage:40})),readingManga:Ce((e,t)=>ae.authAnilist(t,Vs,{userId:e,type:"MANGA",perPage:40}))}};var Hn,Cr,Ar,In,id,ld,sd;const ia=class ia{constructor(t,{method:n="POST",headers:r,body:l},i){ut(this,In);Re(this,"expires");ut(this,Hn);ut(this,Cr);ut(this,Ar);F(t,"Url missing"),F(n,"Method missing"),n==="POST"&&F(l,"Body is missing");const s={"Content-Type":"application/json"};this.url=t,this.method=n,this.headers=r||s,this.body=l,this.fromCache=!0,ht(this,Hn,i),this.cacheKey=Et(this,In,id).call(this)}abort(){var t;(t=Ee(this,Cr))==null||t.abort()}async send(){var l;const t=Et(this,In,ld).call(this);ht(this,Cr,new AbortController),ht(this,Ar,Ee(this,Cr).signal);const n=await t.enqueue(async()=>{for(;;){if(Ee(this,Ar).aborted)return null;if(document.hidden){const{promise:o,resolve:c}=Promise.withResolvers();document.addEventListener("visibilitychange",c,{once:!0}),await o}if(!t.requestToken()){await Promise.race([t.getsNextToken(),new Promise(o=>Ee(this,Ar).addEventListener("abort",o))]);continue}const s=await Et(this,In,sd).call(this);if(s.status===429){console.warn("429 received, backing off...",this.url);const o=parseInt(s.headers.get("Retry-After"))||t.getDefaultDelay();await new Promise(c=>setTimeout(c,o*1e3));continue}if(s.status===500&&this.url.includes("anilist")){console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds"),await new Promise(o=>setTimeout(o,2e3));continue}return s}});if(n==null)return null;if(this.status=n.status,!n.ok)return this.error=!0,this;const r=await n.json();return this.data=((l=Ee(this,Hn))==null?void 0:l.call(this,r))||r,this.fromCache=!1,this}static anilist(t,n={},r){return ia.authAnilist(null,t,n,r)}static authAnilist(t,n,r={},l){F(n.length>10,"Query must be above of length 10");const i={"Content-Type":"application/json"};return t&&(i.Authorization="Bearer "+t),new ia("https://graphql.anilist.co",{method:"POST",headers:i,body:{query:n,variables:r}},l)}static getJson(t,n){return new ia(t,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},n)}};Hn=new WeakMap,Cr=new WeakMap,Ar=new WeakMap,In=new WeakSet,id=function(){let t=`${this.url}-${this.method}`;if(this.body){const n=JSON.stringify(this.body).replaceAll('"',"");t+=n}if(this.headers){const n=JSON.stringify(this.headers).replaceAll('"',"");t+=n}if(Ee(this,Hn)){const n=Ee(this,Hn).toString().replace(/[\n\t\r ]+/g,"");t+=n}return t},ld=function(){if(this.url.startsWith("https://graphql.anilist.co"))return Ni.anilist;if(this.url.startsWith("https://api.jikan.moe"))return Ni.jikan;if(this.url.startsWith("https://api.animethemes.moe"))return Ni.animeThemes;F(!1,`Fetch to url "${this.url}" does not have any rate limits`)},sd=function(){const t={method:this.method,headers:this.headers,body:JSON.stringify(this.body),cache:"default"};return Math.random()>1?(console.log("Error route"),fetch("http://127.0.0.1:3000/api/version",t)):fetch(this.url,t)};let ae=ia;const Oi=new Map,ka=new Map;function hi(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(n){return(...r)=>{const[l,i]=O(void 0),[s,o]=O(!1),[c,h]=O(!1),[u,f]=O(!0);let g=null;const m=e.type=="default"||e.type=="only-if-cached",y=(Ri==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&m==!1,v=(w,b)=>{if(typeof w=="function"&&(w=w(Ae(l))),w=structuredClone(w),F(Ae(l)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof w=="object","Data should always be JSON object data"),e.type!=="no-store"&&(Oi.set(g.cacheKey,w),e.storeName)){f(!1);const A=Ze.fetchCache();A.onsuccess=k=>{const _=k.target.result,I=Ze.store(_,e.storeName,"readwrite",()=>f(!0),()=>f(!0)).put(w);b&&(I.onsuccess=b)}}},$=w=>{w.cacheKey===g.cacheKey&&i(w)},S=w=>{typeof w=="function"&&(w=w(Ae(l))),i(w)},C=async()=>{if(e.type==="only-if-cached")return h(!1),i(null);ka.has(g.cacheKey)||ka.set(g.cacheKey,g.send());const w=await ka.get(g.cacheKey);if(ka.delete(g.cacheKey),w!==null){if(e.expiresInSeconds){const b=new Date;w.expires=b.setSeconds(b.getSeconds()+e.expiresInSeconds)}je(()=>{w.error?(o(!0),console.assert(!Ri,"Fetch error, not saving data to cache")):(v(w),$(w)),h(!1)})}};return q(()=>{const w=r.map(A=>typeof A=="function"?A():A);if(w.some(A=>A===void 0))return;g==null||g.abort(),g=n(...w),Ri&&console.log("Fetching",e.type,g.body||g.url),je(()=>{h(!0),o(!1)});const b=Oi.get(g.cacheKey);if(b&&b.expires>new Date)if($({...b,fromCache:!0}),e.type==="fetch-once"){h(!1);return}else y===!1&&h(!1);else if(e.type!=="no-store"&&e.storeName){const A=Ze.fetchCache();A.onerror=C,A.onsuccess=k=>{const _=k.target.result,I=Ze.store(_,e.storeName,"readonly").get(g.cacheKey);I.onerror=C,I.onsuccess=E=>{if(E.target.result&&(F(E.target.result.expires,"Cache should have a expiration date"),F(E.target.result.data,"Cache should always have data"),E.target.result.expires>new Date)){y==!1&&h(!1);const P={...E.target.result,fromCache:!0};return e.type!=="only-if-cached"&&Oi.set(P.cacheKey,P),$(P)}y==!1&&C()}}}else y==!1&&C();y&&C()}),Object.defineProperties(l,{error:{get:()=>s()},loading:{get:()=>c()},indexedDBClosed:{get:()=>u()}}),ze(()=>g==null?void 0:g.abort()),[l,{mutate:S,refetch:C,mutateCache:v}]}}}var xr,Ga;const mr=class mr{static store(t,n,r,l,i){const s=t.transaction(n,r);return l?s.onerror=l:s.onerror=console.warn,i&&(s.oncomplete=i),s.objectStore(n)}static fetchCache(t){const n=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var i,s;const l=r.target.result;switch(r.oldVersion){case 0:Et(i=mr,xr,Ga).call(i,l,"results",{keyPath:"cacheKey"});case 1:Et(s=mr,xr,Ga).call(s,l,"debug",{keyPath:"cacheKey"})}},n}static user(t){const n=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var i;const l=r.target.result;switch(r.oldVersion){case 0:Et(i=mr,xr,Ga).call(i,l,"data")}},n}};xr=new WeakSet,Ga=function(t,n,r){t.objectStoreNames.contains(n)||t.createObjectStore(n,r)},ut(mr,xr);let Ze=mr;class un{constructor(t,n,r){F(t,"CacheKey is missing"),this.cacheKey=t,this.data=n,this.cacheType=r}}const Fi={},nt=e=>Wl({cacheTypeSignal:()=>null,disableNullValues:!1,senderDisabledSignal:()=>!1,fetcherSignal:e}),xn=(e,t)=>Wl({cacheTypeSignal:e,disableNullValues:!0,senderDisabledSignal:()=>!1,enableDebugLogs:!1,fetcherSignal:t}),zl=(e,t)=>Wl({cacheTypeSignal:()=>null,disableNullValues:!0,senderDisabledSignal:e,enableDebugLogs:!1,fetcherSignal:t}),Wl=({cacheTypeSignal:e,disableNullValues:t,senderDisabledSignal:n,enableDebugLogs:r,fetcherSignal:l,fetchOnDebug:i})=>{fn(e,"cacheTypeSignal is not a function"),fn(n,"senderDisabledSignal is not a function"),fn(l,"fetcherSignal is not a function");const[s,o,c]=kf(void 0),[h,u]=O(!1),[f,g]=O(!1),[m,y]=O(!0);let v=null,$=null;const S=I=>{if(typeof I=="function"){const{data:E,cacheType:P}=Ae(s)||{};return I(new un(v.cacheKey,E,P))}return I},C=(I,E)=>{var Y,K;const P=S(I),R=new Ag(P.cacheKey,v.settings.expiresInSeconds,structuredClone(P.data));R.cacheKey===v.cacheKey&&c(P);const{type:U,storeName:V}=v.settings;if(U==="no-store"||!V)return;(K=(Y=v.settings).saveToSessionStorage)==null||K.call(Y,R),Fi[R.cacheKey]=R,y(!1);const X=Ze.fetchCache();X.onsuccess=le=>{const re=le.target.result,J=Ze.store(re,V,"readwrite",()=>y(!0),()=>y(!0)).put(R);E&&(J.onsuccess=E)}},w=I=>{F(I instanceof un),I.cacheKey===v.cacheKey&&o(I)},b=I=>{I=S(I),F(I instanceof un),o(I)},A=(I,E)=>{I=S(I),C(I,E),b(I)},k=async(I,E)=>{if(I!==v)return;if(F(I,"fetcher should not be undefined"),E==="only-if-cached"){je(()=>{t||(o(new un(I.cacheKey,null)),g(!1))});return}$==null||$.abort();const P=new AbortController;$=P;const R=await qf(I,P.signal);R===null?I===v&&je(()=>{u(!0),g(!1),!P.signal.aborted&&!t&&o(new un(I.cacheKey,null))}):je(()=>{const U=new un(I.cacheKey,R);C(U),w(U),I===v&&g(!1)})},_=N(I=>{const E=l(),P=e()||(E==null?void 0:E.settings.type)||I;if(v!==E)return P;switch(It(I,"prev","If fetcher is same as currentFetcher why is there no previous cacheType"),I){case"only-if-cached":if(P==="default")return P;case"default":if(P==="fetch-once")return P;case"fetch-once":if(P==="reload"||P==="no-store")return P}return I}),T=N(()=>{const I=l(),E=n();return v!==I?E:!1});return L(()=>{if(T())return;const I=l();if(!I){v=null,o(void 0);return}F(I instanceof Xl);const E=_();It(E,"caheType");const P=Mr&&!I.settings.fetchOnDebug&&!i&&E!=="no-store",R=!P&&(E==="fetch-once"||E==="reload"||E==="no-store"),U=I.cacheKey;if(v=I,je(()=>{u(!1),g(!0)}),U in Fi){const V=Fi[U];if(P||E==="only-if-cached"||E==="fetch-once"||E==="default"){je(()=>{o(new un(V.cacheKey,V.data,"local")),g(!1)});return}else o(new un(V.cacheKey,V.data,"local"))}else if(E!=="no-store"&&I.settings.storeName){const V=Ze.fetchCache(),X=()=>!R&&k(I,E);V.onerror=X,V.onsuccess=Y=>{const K=Y.target.result,re=Ze.store(K,I.settings.storeName,"readonly").get(U);re.onerror=X,re.onsuccess=Q=>{const J=Q.target.result;if(J&&(F(J.expires,"Cache should have a expiration date"),F(J.data,"Cache should always have data"),J.expires>new Date)){const pe=new un(U,J.data,"indexedDB");R?w(pe):je(()=>{w(pe),g(!1)});return}X()}}}R&&k(I,E)}),Object.defineProperties(s,{error:{get:()=>h()},loading:{get:()=>f()},indexedDBClosed:{get:()=>m()}}),ze(()=>$==null?void 0:$.abort()),[s,{mutate:b,refetch:()=>k(Ae(l),Ae(l).settings.type),mutateCache:C,mutateBoth:A}]},ql=(e,t)=>{const[n,r]=O(localStorage.getItem(e)??t);return[n,i=>{r(s=>{const o=typeof i=="function"?i(s):i;return o==null?localStorage.removeItem(e):localStorage.setItem(e,o),o})}]},bf=e=>{if(e==="true")return!0;if(e==="false")return!1},zs=(e,t)=>{const[n,r]=O(bf(localStorage.getItem(e))??t);return[n,i=>{r(s=>{const o=typeof i=="function"?i(s):i;return o==null?localStorage.removeItem(e):localStorage.setItem(e,String(o)),o})}]},yf=e=>{try{return JSON.parse(e)}catch{return null}},wf=(e,t)=>{const[n,r]=O(yf(localStorage.getItem(e))??t);return[n,i=>{r(s=>{const o=typeof i=="function"?i(s):i;return o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o)),o})}]},Kl=(e=!0)=>O(Mr===e),Ws=e=>{fn(e);const[t,n]=O();return L(()=>{const r=e();n(r)}),[t,n]},kf=e=>{const[t,n]=O(0);let r=e;return[()=>(t(),r),o=>(r=typeof o=="function"?o(r):o,n(h=>h+1),r),o=>(r=typeof o=="function"?o(r):o,r)]},Sf=()=>{je(()=>{od(e=>e+1),dd(e=>e+1),cd(e=>e+1),ud(e=>e+1)})};let Ot=null;const Cf=e=>{Ot===null?(Ot=[e],e()):Ot.includes(e)||Ot.push(e)},Af=()=>{Ot==null||Ot.shift();const e=Ot==null?void 0:Ot[0];e?e():Ot=null},xf=()=>{setTimeout(()=>od(e=>e-1),1e3),setTimeout(()=>cd(e=>e-1),3e3),setTimeout(()=>dd(e=>e-1),5e3),setTimeout(()=>ud(e=>e-1),1e4)},[MC,od]=O(0),[DC,cd]=O(0),[Ja,dd]=O(0),[RC,ud]=O(0),Tf=()=>{je(()=>{hd(e=>e+1),gd(e=>e+1),fd(e=>e+1),md(e=>e+1)})};let Ft=null;const If=e=>{Ft===null?(Ft=[e],e()):Ft.includes(e)||Ft.push(e)},Ef=()=>{Ft==null||Ft.shift();const e=Ft==null?void 0:Ft[0];e?e():Ft=null},Lf=()=>{setTimeout(()=>hd(e=>e-1),1e3),setTimeout(()=>gd(e=>e-1),2e3),setTimeout(()=>fd(e=>e-1),5e3),setTimeout(()=>md(e=>e-1),1e4)},[gi,hd]=O(0),[Pf,gd]=O(0),[NC,fd]=O(0),[OC,md]=O(0),[qs,Mf]=We({}),da=7*24*60*60,ir=24*60*60,vl=new Date/1e3,Ln=e=>Array.isArray(e);function Xt(e,t){if(e){if(Ln(e))return Object.fromEntries(e.map(n=>[n,!0]))}else return t||null;return{[e]:!0}}function qe(e){return Ln(e)?e:e?[e]:[]}const Df=(...e)=>{const t=[];for(const n of e)t.push(...qe(n));return t},Ks=(e,t)=>(e=qe(e),e.includes(t)),Rf=(e,...t)=>qe(e).filter(n=>!t.includes(n)),Js=(e,t,n)=>(e=qe(e),(n===void 0?e.includes(t):n)?e=Rf(e,t):e.push(t),e);function fr(e){return new Set(qe(e))}function Nf(e){F(Ln(e),"Not array");const t=new Map;return e.forEach(n=>t.set(n.toLowerCase(),n)),Array.from(t.values())}function Zr(e,t){return e===t?!0:typeof e!=typeof t?!1:Ln(e)?e.length===t.length&&e.every((n,r)=>Zr(n,t[r])):!1}function zt(e){return Ln(e)?e[0]:e}function pd(e,t,n=0,r=e.length-1){for(;n<=r;){const l=(r+n)/2|0,i=t(e[l],l,e);if(i===0)return l;i<0?r=l-1:n=l+1}return-1}function vr(e,t,n=0,r=e.length-1){let l=null;for(;n<=r;){const s=(r+n)/2|0;if(l=t(e[s],s,e),l===0)return s;l<0?r=s-1:n=s+1}return l===null?0:((r+n)/2|0)==e.length-1?l<0?e.length-1:e.length:l<0?r+1:n-1}const Of=(e,t,n)=>(fn(t),!Ln(e)||e.length===0?n:e.find(t)??e[0]??n),Ff=(e,t,n)=>!Ln(e)||e.length===0?n:e.at(t%e.length);function ua(e,t){if(Ln(e))return e[Math.round((e.length-1)*t)]}const Ne=e=>e!==1?"s":"",Ke=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Jl=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},Uf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"China";case"TW":return"Taiwan";case"KR":return"South Korea";default:return"Japan"}},Ir=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Ke(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}};function Bf(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Ke(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:return console.error("Unknown status"),e}}const ye=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Xs=e=>{if(e!=null)return F(typeof e=="number","Number is not typeof number"),Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e)},Je=e=>(F(e!=null,"No title given"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Ve=e=>(F(e.type,"type is missing"),F("id"in e,"id is missing"),"/ani/"+e.type.toLowerCase()+"/"+e.id+"/"+Je(e.title.userPreferred)),Xa=e=>{if(F("year"in e,"No year found"),F("month"in e,"No month found"),F("day"in e,"No day found"),!e.year&&!e.month&&!e.day)return"";if(e.year&&!e.month&&!e.day)return e.year.toString();const t={};return e.year&&(t.year="numeric"),e.month&&(t.month="short"),e.day&&(t.day="numeric"),new Date(e.year||1970,e.month-1||0,e.day||1).toLocaleDateString("us-US",t)},vd=e=>{const t=new Date(e),n={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString("us-US",n)};function Sa(e,t){t&&e(Ve(t))}const Zs=e=>typeof e=="object"&&e,Vf=(e,...t)=>{(void 0)(t.length<1,"Give more objects");for(const n of t)$d(e,n);return e},$d=(e,t)=>{for(const n in t)e[n]??(e[n]=t[n]),Zs(e[n])&&Zs(t[n])?$d(e[n],t[n]):e[n]=t[n]},Gf=e=>typeof e=="function",_d=e=>Gf(e)?e():e,Hf=(e,t)=>{fn(e);const n=[];for(const r of t){const l=_d(r);if(l===void 0)return;n.push(l)}return e(...n)},Me=(e,...t)=>N(()=>Hf(e,t)),Yf=[di,lg,sg,og,Lc],Tn=e=>N(()=>{for(const t of Yf)if(_d(e[t]))return t});class jf{constructor(t={}){this.expiresInSeconds=t.expiresInSeconds,this.fetchOnDebug=t.fetchOnDebug||!1,this.storeName=t.storeName||"",this.type=t.type||"default",this.saveToSessionStorage=t.saveToSessionStorage,F(typeof t=="object","Settings must be object"),F(!t.active||typeof t.active=="function","settings.active should a signal"),F(t.type==="no-store"||Number.isInteger(t.expiresInSeconds),"Give explicit expiration time. 0 if the data never expires"),F(t.type==="no-store"||t.expiresInSeconds>0,"Expiration time should be more than 0"),F(t.type!=="no-store"||!t.storeName,"StoreName is not used because cache type is no-store"),F(!t.saveToSessionStorage||typeof t.saveToSessionStorage=="function","saveToSessionStorage is not function")}}class Xl{constructor(t,n,r){F(t,"URL is missing"),this.url=t,this.options=n,this.formatResponse=r,this.settings=new jf({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365})}get cacheKey(){var t;return`${this.url}${((t=JSON.stringify(this.options))==null?void 0:t.replaceAll('"',""))||""}${this.formatResponse||""}`}}const fi=(e,t)=>(e&&(e.settings.type=t),e),zf=(e,t)=>(cm(e.url),Wf(e,t).finally(()=>dm(e.url))),Wf=(e,t)=>{const n={...e.options||{},signal:t};if(n.body&&(n.body=JSON.stringify(e.options.body)),n.cache??(n.cache="default"),Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",n);case 2:return fetch("https://http.codes/500",n);case 3:return fetch("https://http.codes/cors",n)}else return e.delay?new Promise((r,l)=>{fetch(e.url,n).then(i=>setTimeout(()=>r(i),e.delay)).catch(l)}):fetch(e.url,n)},Ca={},Aa={};let Ui=0;const qf=async(e,t)=>{var l,i,s;try{const{resolve:o,promise:c}=Promise.withResolvers();for(let h=0;h<3&&!t.aborted;h++){om(e.url)&&(Ta(e.url,o),await c);try{var n=await(Ca[l=e.cacheKey]??(Ca[l]=zf(e,t)))}catch{if(t.aborted)return null}finally{delete Ca[e.cacheKey]}const u=lm(e.url,(n==null?void 0:n.status)||"cors");if((n==null?void 0:n.status)===429&&n.headers.get("Retry-After")){Ta(e.url,o);const f=parseInt(n.headers.get("Retry-After"));await new Promise(g=>setTimeout(g,f*1e3));continue}else if((n==null?void 0:n.status)===400&&Ui<3){if(Ta(e.url,o),(await n.json()).errors.some(g=>g.message==="Invalid token")){Ui++,await new Promise(g=>setTimeout(g,3e3));continue}}else if(u){Ta(e.url,o),await new Promise(f=>setTimeout(f,u));continue}else if(!(n!=null&&n.ok))return null;e.url.includes(Kn)&&(Ui=0);try{var r=await(Aa[i=e.cacheKey]??(Aa[i]=n.json()))}catch(f){return console.error(f),null}finally{delete Aa[e.cacheKey]}return((s=e.formatResponse)==null?void 0:s.call(e,r))||r}}finally{sm(e.url)}return null},_a=(e,t,n=1)=>{const r=[];let l=null,i=!1;async function s(...c){r.push(async()=>{r.shift(),i=!0,await e(...c),i=!1,o(t)}),r.length==n+1&&r.shift(),!i&&(l===null?o():o(t))}return s.bufferSize=()=>r.length,s;function o(c){const h=r[0];clearTimeout(l),l=null,h&&(c?l=setTimeout(h,c):(i=!0,h()))}},bd=e=>{let t;const n=(r,...l)=>{clearTimeout(t),t=setTimeout(()=>e(...l),r)};return ze(()=>clearTimeout(t)),n},Kf=e=>{const t=new Date;return t.setMilliseconds(t.getMilliseconds()+e),t},Jf=e=>Kf(e*1e3),ha=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Xf=e=>!isNaN(e)&&typeof e=="number",Zf=(e,t)=>{const n=Number(e);return Xf(n)?n:t},Qf=(e,t)=>Math.max(e??t,t??e),xa=(e,t,n)=>e+n*(t-e),Qs=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",em=e=>{if(!(e!=null&&e.length))return"";switch(e){case dg:case Us:return Us;case Dc:return"Not yet released";case ug:case hg:return"Releasing";case gg:return"Cancelled";case fg:return"On hiatus";default:return console.error("Unknown media format"),e}},yd=(e,t)=>"/mal/"+e+"/"+t.mal_id+"/"+zn(t.title),tm=e=>"/mal/character/"+e.mal_id+"/"+zn(e.name),wd=e=>{It(e.type,"Media type"),Nc(e.id,"Media id");const t="/ani/"+e.type.toLowerCase()+"/"+e.id;return e.title.userPreferred?t+"/"+zn(e.title.userPreferred):t},nm=()=>location.hostname==="kassu11.github.io"?24951:location.port==5173?7936:location.port==5174?31649:-1,zn=e=>(It(e,"title"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),rm=e=>e!==1?"s":"",Er=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",am=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},im=e=>{if(!(e!=null&&e.length))return"";switch(e){case"ANIME":case"COMIC":case"DOUJINSHI":case"GAME":case"MANGA":case"NOVEL":case"ORIGINAL":case"OTHER":return Er(e);case"LIGHT_NOVEL":case"LIVE_ACTION":case"MULTIMEDIA_PROJECT":case"PICTURE_BOOK":case"VISUAL_NOVEL":case"VIDEO_GAME":case"WEB_NOVEL":return Er(e.replace("_"," "));default:return console.error("Unknown media format"),e}},$l=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Er(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}},kd=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CANCELLED":case"FINISHED":case"HIATUS":case"NOT_YET_RELEASED":case"RELEASING":return Er(e.replaceAll("_"," "));default:return console.error("Unknown media format"),e}},lm=(e,t)=>{if(e.includes(Kn))switch(t){case 429:return 25e3;case 500:return 3e3;case"cors":return 4e4}if(e.includes(Dr))switch(t){case 429:return 1e3}if(e.includes(ig))switch(t){case 429:return 25e3}},Ta=(e,t)=>{e.includes(Kn)?Cf(t):e.includes(Dr)&&If(t)},sm=e=>{e.includes(Kn)?Af():e.includes(Dr)&&Ef()},om=e=>{if(e.includes(Kn))return Ot!==null;if(e.includes(Dr))return Ft!==null},cm=e=>{e.includes(Kn)?Sf():e.includes(Dr)&&Tf()},dm=e=>{e.includes(Kn)?xf():e.includes(Dr)&&Lf()};var um=p("<li data-k-c7a289e2><button data-k-c7a289e2>Logout"),hm=p("<li data-k-c7a289e2>"),gm=p('<img data-k-c7a289e2 alt="Profile avatar">'),fm=p("<li data-k-c7a289e2 class=profile>"),mm=p("<nav data-k-c7a289e2 class=main-navigation><ul data-k-c7a289e2><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2>"),pm=p("<main data-k-c7a289e2 id=page-content>"),vm=p("<footer data-k-c7a289e2 class=main-footer>"),$m=p("<li data-k-c7a289e2><a data-k-c7a289e2>Login with AniList"),_m=p("<div data-k-c7a289e2 class=dev-branch><p data-k-c7a289e2>Preview: </p><button data-k-c7a289e2>Back to Production");const bm=e=>fetch("http://localhost:"+e,{signal:AbortSignal.timeout(100)}).then(()=>!0).catch(()=>!1);function ym(e){const t=`https://anilist.co/api/v2/oauth/authorize?client_id=${nm()}&response_type=token`,{accessToken:n,authUserData:r,logoutUser:l}=ie();let i=new AbortController;return q(()=>{i.abort(),i=new AbortController,window.addEventListener("keydown",async s=>{if(s.target!==document.body||s.shiftKey||s.ctrlKey)return;const{port:o,hostname:c,href:h,origin:u}=location;s.key==="d"&&s.altKey&&(s.preventDefault(),c==="localhost"?o!=5174&&await bm(5174)?window.open(h.replace(u,"http://localhost:5174")):window.open(h.replace(u,"https://kassu11.github.io")):window.open(h.replace(u,"http://localhost:5173")))},{signal:i.signal})}),[(()=>{var s=mm(),o=s.firstChild,c=o.firstChild,h=c.nextSibling,u=h.nextSibling,f=u.nextSibling;return d(c,a(B,{href:"/",children:"Home"})),d(h,a(B,{href:"/browse/anime",children:"Anime"})),d(u,a(B,{href:"/browse/manga",children:"Manga"})),d(f,a(B,{href:"/browse/media",children:"Search"})),d(o,a(x,{get when(){return n()},get fallback(){return(()=>{var g=$m(),m=g.firstChild;return G(m,"href",t),g})()},get children(){return[(()=>{var g=um(),m=g.firstChild;return m.$$click=()=>l(),g})(),a(x,{get when(){return r()},get children(){return[(()=>{var g=hm();return d(g,a(B,{href:"/notifications",get children(){return["Notifications (",N(()=>r().data.unreadNotificationCount),")"]}})),g})(),(()=>{var g=fm();return d(g,a(B,{get href(){return"/user/"+r().data.name},get children(){return[N(()=>r().data.name),(()=>{var m=gm();return L(()=>G(m,"src",r().data.avatar.large)),m})()]}})),g})()]}})]}}),null),s})(),a(x,{get when(){return localStorage.getItem(Fs)},children:s=>(()=>{var o=_m(),c=o.firstChild;c.firstChild;var h=c.nextSibling;return d(c,s,null),h.$$click=()=>{localStorage.removeItem(Fs),location.reload()},o})()}),a(ag,{}),(()=>{var s=pm();return d(s,()=>e.children),s})(),vm()]}$e(["click"]);var wm=p("<p>");const[Bi,km]=O(vl);setInterval(()=>km(new Date/1e3),1e3*30);function Sm(e){const t=e.airingAt<Bi(),n=N(()=>{const l=Math.abs(e.airingAt-Bi());return t?da-l%da:l}),r=N(l=>l===!1&&e.airingAt<Bi()?(e.setAiringEpisode(i=>i+1),!0):l,!1);return[a(x,{get when(){return!t&&r()},children:"aired in"}),(()=>{var l=wm();return d(l,a(x,{get when(){return Math.floor(n()/3600/24)},children:i=>[i,"d "]}),null),d(l,a(x,{get when(){return Math.floor(n()/3600%24)},children:i=>[i,"h "]}),null),d(l,a(x,{get when(){return Math.floor(n()%3600/60)},children:i=>[i,"m "]}),null),l})()]}var Cm=p('<button data-k-9c12ef02 class="cp-current-card-hover-info normal">Completed'),Am=p("<button data-k-9c12ef02 class=cp-current-card-hover-info> <span data-k-9c12ef02 class=plus>+"),xm=p("<img data-k-9c12ef02 alt=Cover.>"),Tm=p("<div data-k-9c12ef02 class=is-behind-container>"),Im=p("<div data-k-9c12ef02 class=cp-current-card-info><p data-k-9c12ef02>Ep "),Em=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> behind"),Lm=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> left"),Pm=p("<p data-k-9c12ef02> chapter<! data-k-9c12ef02> left"),Mm=p('<div data-k-9c12ef02 class=hover data-tooltip-positions="right left middle"><p data-k-9c12ef02 class=line-clamp></p><p data-k-9c12ef02 class=progress-status>Progress: ');function Dm(e){if(!(e!=null&&e.episode))return null;if((e==null?void 0:e.airingAt)<vl){const t=Math.abs(e.airingAt-vl);return e.episode+Math.floor(t/da)+1}return e.episode}function Rm(e){const{accessToken:t}=ie(),n=_a(async(r,l,i)=>{const s=await de.anilist.mutateMedia(r,{mediaId:l,progress:i});s.status===200&&(F(s.data.progress,"No progress found"),e.data.progress=s.data.progress,s.data.status==="COMPLETED"?e.mutateCache(o=>(o.data.data.Page.mediaList=o.data.data.Page.mediaList.filter(c=>c.id!==e.data.id),o)):e.mutateCache(o=>o))},250,2);return a(W,{get fallback(){return(()=>{var r=Am(),l=r.firstChild;return r.$$click=i=>{i.preventDefault(),n(t(),e.data.media.id,e.progress()+1),e.setProgress(s=>s+1)},d(r,()=>e.progress,l),r})()},get children(){return a(M,{get when(){return e.data.media.episodes===e.progress()||e.data.media.chapters===e.progress()},get children(){var r=Cm();return r.$$click=l=>l.preventDefault(),r}})}})}function Nm(e){const[t,n]=O(e.data.progress),[r,l]=O(Dm(e.data.media.nextAiringEpisode)),i=N(()=>r()>t()+1),s=()=>r()-(t()+1),o=()=>Math.min(s()/10,.45),c=()=>1/(s()-o())*100;return a(B,{get href(){return Ve(e.data.media)},"data-tooltip-trigger":!0,class:"cp-current-card",get children(){return[(()=>{var h=xm();return L(()=>G(h,"src",e.data.media.coverImage.large)),h})(),a(x,{get when(){var h;return(h=e.data.media.nextAiringEpisode)==null?void 0:h.airingAt},get children(){var h=Im(),u=h.firstChild;return u.firstChild,d(u,r,null),d(h,a(Sm,{get airingAt(){return e.data.media.nextAiringEpisode.airingAt},setAiringEpisode:l}),null),d(h,a(x,{get when(){return i()},get children(){var f=Tm();return L(g=>(g=`repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${c()*(1-o())}%, transparent ${c()*(1-o())}%, transparent ${c()}%)`)!=null?f.style.setProperty("background",g):f.style.removeProperty("background")),f}}),null),h}}),a(Rm,{get data(){return e.data},get mutateCache(){return e.mutateCache},progress:t,setProgress:n}),(()=>{var h=Mm(),u=h.firstChild,f=u.nextSibling;return f.firstChild,d(h,a(W,{get children(){return[a(M,{get when(){return N(()=>!!r())()&&i()},get children(){var g=Em(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>r()-(t()+1),m),d(g,()=>r()-(t()+1)>1&&"s",y),g}}),a(M,{get when(){return N(()=>r()==null)()&&e.data.media.episodes-t()>0},get children(){var g=Lm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.episodes-t(),m),d(g,()=>e.data.media.episodes-t()>1&&"s",y),g}}),a(M,{get when(){return e.data.media.chapters-t()>0},get children(){var g=Pm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.chapters-t(),m),d(g,()=>e.data.media.chapters-t()>1&&"s",y),g}})]}}),u),d(u,()=>e.data.media.title.userPreferred),d(f,t,null),d(f,a(x,{get when(){return e.data.media.episodes},get children(){return["/",N(()=>e.data.media.episodes)]}}),null),d(f,a(x,{get when(){return e.data.media.chapters},get children(){return["/",N(()=>e.data.media.chapters)]}}),null),h})()]}})}$e(["click"]);var Om=p('<div data-k-ea0ffbeb class="grid-column-auto-fill current">');function Vi(e){return a(x,{get when(){return e.cards.length},get children(){var t=Om();return d(t,a(H,{get each(){return e.cards},children:n=>a(Nm,{data:n,get mutateCache(){return e.mutateCache}})})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}var Fm=p("<button data-k-b9535d1e>Picture mode"),Um=p("<button data-k-b9535d1e>Text mode"),Bm=p("<div data-k-b9535d1e class=pg-home-current>");const Gi=0,eo=1;function Vm(e){const{isDeveloper:t}=ie(),[n,{mutateCache:r}]=de.anilist.wachingAnime(e.userId,e.token),[l,{mutateCache:i}]=de.anilist.readingManga(e.userId,e.token),s=new Date/1e3,o=f=>{if(f==null)return null;if(f<s){const g=(s-f)%da;return s+(da-g)}return f},c=(f,g)=>{var v,$;const m=o((v=f.media.nextAiringEpisode)==null?void 0:v.airingAt),y=o(($=g.media.nextAiringEpisode)==null?void 0:$.airingAt);return m&&y?m-y:m==y?0:m==null?1:-1},[h,u]=ql("LOB_CURRENTLY_WATCHING_MODE",Gi);return[a(x,{get when(){return t()},get children(){return[(()=>{var f=Fm();return f.$$click=()=>u(Gi),f})(),(()=>{var f=Um();return f.$$click=()=>u(eo),f})()]}}),(()=>{var f=Bm();return d(f,a(x,{get when(){return n()},get children(){return[a(Vi,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status!=="FINISHED").toSorted(c)},mutateCache:r,get loading(){return n.loading}}),a(Vi,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status==="FINISHED")},mutateCache:r,get loading(){return n.loading}})]}}),null),d(f,a(x,{get when(){return l()},get children(){return a(Vi,{get cards(){return l().data.data.Page.mediaList},mutateCache:i,get loading(){return l.loading}})}}),null),L(g=>{var m=h()==Gi,y=h()==eo;return m!==g.e&&f.classList.toggle("picture",g.e=m),y!==g.t&&f.classList.toggle("text",g.t=y),g},{e:void 0,t:void 0}),f})()]}$e(["click"]);const mn=(e,t)=>{let n;const r=()=>clearTimeout(n);return Lr()&&ze(r),Object.assign((...i)=>{n!==void 0&&r(),n=setTimeout(()=>e(...i),t)},{clear:r})};function Xn(e,t,n){let r;(function(c){c[c.Ready=0]="Ready",c[c.Leading=1]="Leading",c[c.Trailing=2]="Trailing"})(r||(r={}));let l=r.Ready;const i=e(c=>{l===r.Trailing&&t(...c),l=r.Ready},n),s=(...c)=>{l!==r.Trailing&&(l===r.Ready&&t(...c),l+=1),i(c)},o=()=>{l=r.Ready,i.clear()};return Lr()&&ze(o),Object.assign(s,{clear:o})}var Gm=p("<span>");function Wn(e){const[t,n]=oi(e,["class"]);return(()=>{var r=Gm();return Lt(r,Oe({get class(){return"cp-loader-circle "+t.class||""}},n),!1,!1),r})()}var Hm=p("<tool-tip inert role=tooltip>",!0,!1,!1);function Tt(e){return(()=>{var t=Hm();return Lt(t,e,!1,!1),t._$owner=Lr(),L(()=>G(t,"tip-position",e.tipPosition)),t})()}function Zl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Zn=Zl();function Sd(e){Zn=e}const na={exec:()=>null};function Le(e,t=""){let n=typeof e=="string"?e:e.source;const r={replace:(l,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(yt.caret,"$1"),n=n.replace(l,s),r},getRegex:()=>new RegExp(n,t)};return r}const yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ym=/^(?:[ \t]*(?:\n|$))+/,jm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,zm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ba=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ql=/(?:[*+-]|\d{1,9}[.)])/,Cd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ad=Le(Cd).replace(/bull/g,Ql).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),qm=Le(Cd).replace(/bull/g,Ql).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),es=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Km=/^[^\n]+/,ts=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Jm=Le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xm=Le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ql).getRegex(),mi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ns=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Zm=Le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ns).replace("tag",mi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xd=Le(es).replace("hr",ba).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mi).getRegex(),Qm=Le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xd).getRegex(),rs={blockquote:Qm,code:jm,def:Jm,fences:zm,heading:Wm,hr:ba,html:Zm,lheading:Ad,list:Xm,newline:Ym,paragraph:xd,table:na,text:Km},to=Le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ba).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mi).getRegex(),ep={...rs,lheading:qm,table:to,paragraph:Le(es).replace("hr",ba).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",to).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mi).getRegex()},tp={...rs,html:Le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ns).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:na,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Le(es).replace("hr",ba).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ad).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},np=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Td=/^( {2,}|\\)\n(?!\s*$)/,ap=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,pi=/[\p{P}\p{S}]/u,as=/[\s\p{P}\p{S}]/u,Id=/[^\s\p{P}\p{S}]/u,ip=Le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,as).getRegex(),Ed=/(?!~)[\p{P}\p{S}]/u,lp=/(?!~)[\s\p{P}\p{S}]/u,sp=/(?:[^\s\p{P}\p{S}]|~)/u,op=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Ld=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cp=Le(Ld,"u").replace(/punct/g,pi).getRegex(),dp=Le(Ld,"u").replace(/punct/g,Ed).getRegex(),Pd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",up=Le(Pd,"gu").replace(/notPunctSpace/g,Id).replace(/punctSpace/g,as).replace(/punct/g,pi).getRegex(),hp=Le(Pd,"gu").replace(/notPunctSpace/g,sp).replace(/punctSpace/g,lp).replace(/punct/g,Ed).getRegex(),gp=Le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Id).replace(/punctSpace/g,as).replace(/punct/g,pi).getRegex(),fp=Le(/\\(punct)/,"gu").replace(/punct/g,pi).getRegex(),mp=Le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pp=Le(ns).replace("(?:-->|$)","-->").getRegex(),vp=Le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Za=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,$p=Le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Za).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Md=Le(/^!?\[(label)\]\[(ref)\]/).replace("label",Za).replace("ref",ts).getRegex(),Dd=Le(/^!?\[(ref)\](?:\[\])?/).replace("ref",ts).getRegex(),_p=Le("reflink|nolink(?!\\()","g").replace("reflink",Md).replace("nolink",Dd).getRegex(),is={_backpedal:na,anyPunctuation:fp,autolink:mp,blockSkip:op,br:Td,code:rp,del:na,emStrongLDelim:cp,emStrongRDelimAst:up,emStrongRDelimUnd:gp,escape:np,link:$p,nolink:Dd,punctuation:ip,reflink:Md,reflinkSearch:_p,tag:vp,text:ap,url:na},bp={...is,link:Le(/^!?\[(label)\]\((.*?)\)/).replace("label",Za).getRegex(),reflink:Le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Za).getRegex()},_l={...is,emStrongRDelimAst:hp,emStrongLDelim:dp,url:Le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},yp={..._l,br:Le(Td).replace("{2,}","*").getRegex(),text:Le(_l.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ia={normal:rs,gfm:ep,pedantic:tp},Gr={normal:is,gfm:_l,breaks:yp,pedantic:bp},wp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},no=e=>wp[e];function rn(e,t){if(t){if(yt.escapeTest.test(e))return e.replace(yt.escapeReplace,no)}else if(yt.escapeTestNoEncode.test(e))return e.replace(yt.escapeReplaceNoEncode,no);return e}function ro(e){try{e=encodeURI(e).replace(yt.percentDecode,"%")}catch{return null}return e}function ao(e,t){var i;const n=e.replace(yt.findPipe,(s,o,c)=>{let h=!1,u=o;for(;--u>=0&&c[u]==="\\";)h=!h;return h?"|":" |"}),r=n.split(yt.splitPipe);let l=0;if(r[0].trim()||r.shift(),r.length>0&&!((i=r.at(-1))!=null&&i.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;l<r.length;l++)r[l]=r[l].trim().replace(yt.slashPipe,"|");return r}function Hr(e,t,n){const r=e.length;if(r===0)return"";let l=0;for(;l<r&&e.charAt(r-l-1)===t;)l++;return e.slice(0,r-l)}function kp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1}function io(e,t,n,r,l){const i=t.href,s=t.title||null,o=e[1].replace(l.other.outputLinkReplace,"$1");if(e[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:n,href:i,title:s,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:n,href:i,title:s,text:o}}function Sp(e,t,n){const r=e.match(n.other.indentCodeCompensation);if(r===null)return t;const l=r[1];return t.split(`
`).map(i=>{const s=i.match(n.other.beginningSpace);if(s===null)return i;const[o]=s;return o.length>=l.length?i.slice(l.length):i}).join(`
`)}class Qa{constructor(t){Re(this,"options");Re(this,"rules");Re(this,"lexer");this.options=t||Zn}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const r=n[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Hr(r,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const r=n[0],l=Sp(r,n[3]||"",this.rules);return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:l}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let r=n[2].trim();if(this.rules.other.endingHash.test(r)){const l=Hr(r,"#");(this.options.pedantic||!l||this.rules.other.endingSpaceChar.test(l))&&(r=l.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:Hr(n[0],`
`)}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){let r=Hr(n[0],`
`).split(`
`),l="",i="";const s=[];for(;r.length>0;){let o=!1;const c=[];let h;for(h=0;h<r.length;h++)if(this.rules.other.blockquoteStart.test(r[h]))c.push(r[h]),o=!0;else if(!o)c.push(r[h]);else break;r=r.slice(h);const u=c.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");l=l?`${l}
${u}`:u,i=i?`${i}
${f}`:f;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=g,r.length===0)break;const m=s.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.blockquote(v);s[s.length-1]=$,l=l.substring(0,l.length-y.raw.length)+$.raw,i=i.substring(0,i.length-y.text.length)+$.text;break}else if((m==null?void 0:m.type)==="list"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.list(v);s[s.length-1]=$,l=l.substring(0,l.length-m.raw.length)+$.raw,i=i.substring(0,i.length-y.raw.length)+$.raw,r=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:l,tokens:s,text:i}}}list(t){let n=this.rules.block.list.exec(t);if(n){let r=n[1].trim();const l=r.length>1,i={type:"list",raw:"",ordered:l,start:l?+r.slice(0,-1):"",loose:!1,items:[]};r=l?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=l?r:"[*+-]");const s=this.rules.other.listItemRegex(r);let o=!1;for(;t;){let h=!1,u="",f="";if(!(n=s.exec(t))||this.rules.block.hr.test(t))break;u=n[0],t=t.substring(u.length);let g=n[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),m=t.split(`
`,1)[0],y=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):y?v=n[1].length+1:(v=n[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=n[1].length),y&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,t=t.substring(m.length+1),h=!0),!h){const C=this.rules.other.nextBulletRegex(v),w=this.rules.other.hrRegex(v),b=this.rules.other.fencesBeginRegex(v),A=this.rules.other.headingBeginRegex(v),k=this.rules.other.htmlBeginRegex(v);for(;t;){const _=t.split(`
`,1)[0];let T;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),T=m):T=m.replace(this.rules.other.tabCharGlobal,"    "),b.test(m)||A.test(m)||k.test(m)||C.test(m)||w.test(m))break;if(T.search(this.rules.other.nonSpaceChar)>=v||!m.trim())f+=`
`+T.slice(v);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||b.test(g)||A.test(g)||w.test(g))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),u+=_+`
`,t=t.substring(_.length+1),g=T.slice(v)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0));let $=null,S;this.options.gfm&&($=this.rules.other.listIsTask.exec(f),$&&(S=$[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:u,task:!!$,checked:S,loose:!1,text:f,tokens:[]}),i.raw+=u}const c=i.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let h=0;h<i.items.length;h++)if(this.lexer.state.top=!1,i.items[h].tokens=this.lexer.blockTokens(i.items[h].text,[]),!i.loose){const u=i.items[h].tokens.filter(g=>g.type==="space"),f=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));i.loose=f}if(i.loose)for(let h=0;h<i.items.length;h++)i.items[h].loose=!0;return i}}html(t){const n=this.rules.block.html.exec(t);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(t){const n=this.rules.block.def.exec(t);if(n){const r=n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),l=n[2]?n[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:l,title:i}}}table(t){var o;const n=this.rules.block.table.exec(t);if(!n||!this.rules.other.tableDelimiter.test(n[2]))return;const r=ao(n[1]),l=n[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=n[3])!=null&&o.trim()?n[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===l.length){for(const c of l)this.rules.other.tableAlignRight.test(c)?s.align.push("right"):this.rules.other.tableAlignCenter.test(c)?s.align.push("center"):this.rules.other.tableAlignLeft.test(c)?s.align.push("left"):s.align.push(null);for(let c=0;c<r.length;c++)s.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:s.align[c]});for(const c of i)s.rows.push(ao(c,s.header.length).map((h,u)=>({text:h,tokens:this.lexer.inline(h),header:!1,align:s.align[u]})));return s}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:n[1]}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&this.rules.other.startATag.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const r=n[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const s=Hr(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{const s=kp(n[2],"()");if(s>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+s;n[2]=n[2].substring(0,s),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let l=n[2],i="";if(this.options.pedantic){const s=this.rules.other.pedanticHrefTitle.exec(l);s&&(l=s[1],i=s[3])}else i=n[3]?n[3].slice(1,-1):"";return l=l.trim(),this.rules.other.startAngleBracket.test(l)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?l=l.slice(1):l=l.slice(1,-1)),io(n,{href:l&&l.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer,this.rules)}}reflink(t,n){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){const l=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=n[l.toLowerCase()];if(!i){const s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return io(r,i,r[0],this.lexer,this.rules)}}emStrong(t,n,r=""){let l=this.rules.inline.emStrongLDelim.exec(t);if(!l||l[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(l[1]||l[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const s=[...l[0]].length-1;let o,c,h=s,u=0;const f=l[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*t.length+s);(l=f.exec(n))!=null;){if(o=l[1]||l[2]||l[3]||l[4]||l[5]||l[6],!o)continue;if(c=[...o].length,l[3]||l[4]){h+=c;continue}else if((l[5]||l[6])&&s%3&&!((s+c)%3)){u+=c;continue}if(h-=c,h>0)continue;c=Math.min(c,c+h+u);const g=[...l[0]][0].length,m=t.slice(0,s+l.index+g+c);if(Math.min(s,c)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let r=n[2].replace(this.rules.other.newLineCharGlobal," ");const l=this.rules.other.nonSpaceChar.test(r),i=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return l&&i&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:n[0],text:r}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t){const n=this.rules.inline.autolink.exec(t);if(n){let r,l;return n[2]==="@"?(r=n[1],l="mailto:"+r):(r=n[1],l=r),{type:"link",raw:n[0],text:r,href:l,tokens:[{type:"text",raw:r,text:r}]}}}url(t){var r;let n;if(n=this.rules.inline.url.exec(t)){let l,i;if(n[2]==="@")l=n[0],i="mailto:"+l;else{let s;do s=n[0],n[0]=((r=this.rules.inline._backpedal.exec(n[0]))==null?void 0:r[0])??"";while(s!==n[0]);l=n[0],n[1]==="www."?i="http://"+n[0]:i=n[0]}return{type:"link",raw:n[0],text:l,href:i,tokens:[{type:"text",raw:l,text:l}]}}}inlineText(t){const n=this.rules.inline.text.exec(t);if(n){const r=this.lexer.state.inRawBlock;return{type:"text",raw:n[0],text:n[0],escaped:r}}}}class Bt{constructor(t){Re(this,"tokens");Re(this,"options");Re(this,"state");Re(this,"tokenizer");Re(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Zn,this.options.tokenizer=this.options.tokenizer||new Qa,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:yt,block:Ia.normal,inline:Gr.normal};this.options.pedantic?(n.block=Ia.pedantic,n.inline=Gr.pedantic):this.options.gfm&&(n.block=Ia.gfm,this.options.breaks?n.inline=Gr.breaks:n.inline=Gr.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ia,inline:Gr}}static lex(t,n){return new Bt(n).lex(t)}static lexInline(t,n){return new Bt(n).inlineTokens(t)}lex(t){t=t.replace(yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var l,i,s;for(this.options.pedantic&&(t=t.replace(yt.tabCharGlobal,"    ").replace(yt.spaceLine,""));t;){let o;if((i=(l=this.options.extensions)==null?void 0:l.block)!=null&&i.some(h=>(o=h.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const h=n.at(-1);o.raw.length===1&&h!==void 0?h.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.at(-1).src=h.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((s=this.options.extensions)!=null&&s.startBlock){let h=1/0;const u=t.slice(1);let f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},u),typeof f=="number"&&f>=0&&(h=Math.min(h,f))}),h<1/0&&h>=0&&(c=t.substring(0,h+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const h=n.at(-1);r&&(h==null?void 0:h.type)==="paragraph"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):n.push(o),r=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const h=n.at(-1);(h==null?void 0:h.type)==="text"?(h.raw+=`
`+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):n.push(o);continue}if(t){const h="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,h;let r=t,l=null;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)u.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,l.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i=!1,s="";for(;t;){i||(s=""),i=!1;let u;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(g=>(u=g.call({lexer:this},t,n))?(t=t.substring(u.raw.length),n.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);const g=n.at(-1);u.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=u.raw,g.text+=u.text):n.push(u);continue}if(u=this.tokenizer.emStrong(t,r,s)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),n.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),n.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),n.push(u);continue}let f=t;if((h=this.options.extensions)!=null&&h.startInline){let g=1/0;const m=t.slice(1);let y;this.options.extensions.startInline.forEach(v=>{y=v.call({lexer:this},m),typeof y=="number"&&y>=0&&(g=Math.min(g,y))}),g<1/0&&g>=0&&(f=t.substring(0,g+1))}if(u=this.tokenizer.inlineText(f)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(s=u.raw.slice(-1)),i=!0;const g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=u.raw,g.text+=u.text):n.push(u);continue}if(t){const g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class ei{constructor(t){Re(this,"options");Re(this,"parser");this.options=t||Zn}space(t){return""}code({text:t,lang:n,escaped:r}){var s;const l=(s=(n||"").match(yt.notSpaceStart))==null?void 0:s[0],i=t.replace(yt.endingNewline,"")+`
`;return l?'<pre><code class="language-'+rn(l)+'">'+(r?i:rn(i,!0))+`</code></pre>
`:"<pre><code>"+(r?i:rn(i,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:n}){return`<h${n}>${this.parser.parseInline(t)}</h${n}>
`}hr(t){return`<hr>
`}list(t){const n=t.ordered,r=t.start;let l="";for(let o=0;o<t.items.length;o++){const c=t.items[o];l+=this.listitem(c)}const i=n?"ol":"ul",s=n&&r!==1?' start="'+r+'"':"";return"<"+i+s+`>
`+l+"</"+i+`>
`}listitem(t){var r;let n="";if(t.task){const l=this.checkbox({checked:!!t.checked});t.loose?((r=t.tokens[0])==null?void 0:r.type)==="paragraph"?(t.tokens[0].text=l+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=l+" "+rn(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:l+" ",text:l+" ",escaped:!0}):n+=l+" "}return n+=this.parser.parse(t.tokens,!!t.loose),`<li>${n}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let n="",r="";for(let i=0;i<t.header.length;i++)r+=this.tablecell(t.header[i]);n+=this.tablerow({text:r});let l="";for(let i=0;i<t.rows.length;i++){const s=t.rows[i];r="";for(let o=0;o<s.length;o++)r+=this.tablecell(s[o]);l+=this.tablerow({text:r})}return l&&(l=`<tbody>${l}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+l+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){const n=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+n+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${rn(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:n,tokens:r}){const l=this.parser.parseInline(r),i=ro(t);if(i===null)return l;t=i;let s='<a href="'+t+'"';return n&&(s+=' title="'+rn(n)+'"'),s+=">"+l+"</a>",s}image({href:t,title:n,text:r}){const l=ro(t);if(l===null)return rn(r);t=l;let i=`<img src="${t}" alt="${r}"`;return n&&(i+=` title="${rn(n)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:rn(t.text)}}class ls{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}}class Vt{constructor(t){Re(this,"options");Re(this,"renderer");Re(this,"textRenderer");this.options=t||Zn,this.options.renderer=this.options.renderer||new ei,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ls}static parse(t,n){return new Vt(n).parse(t)}static parseInline(t,n){return new Vt(n).parseInline(t)}parse(t,n=!0){var l,i;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((i=(l=this.options.extensions)==null?void 0:l.renderers)!=null&&i[o.type]){const h=o,u=this.options.extensions.renderers[h.type].call({parser:this},h);if(u!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(h.type)){r+=u||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let h=c,u=this.renderer.text(h);for(;s+1<t.length&&t[s+1].type==="text";)h=t[++s],u+=`
`+this.renderer.text(h);n?r+=this.renderer.paragraph({type:"paragraph",raw:u,text:u,tokens:[{type:"text",raw:u,text:u,escaped:!0}]}):r+=u;continue}default:{const h='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return r}parseInline(t,n=this.renderer){var l,i;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((i=(l=this.options.extensions)==null?void 0:l.renderers)!=null&&i[o.type]){const h=this.options.extensions.renderers[o.type].call({parser:this},o);if(h!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=h||"";continue}}const c=o;switch(c.type){case"escape":{r+=n.text(c);break}case"html":{r+=n.html(c);break}case"link":{r+=n.link(c);break}case"image":{r+=n.image(c);break}case"strong":{r+=n.strong(c);break}case"em":{r+=n.em(c);break}case"codespan":{r+=n.codespan(c);break}case"br":{r+=n.br(c);break}case"del":{r+=n.del(c);break}case"text":{r+=n.text(c);break}default:{const h='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return r}}class ra{constructor(t){Re(this,"options");Re(this,"block");this.options=t||Zn}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?Bt.lex:Bt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}}Re(ra,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class Cp{constructor(...t){Re(this,"defaults",Zl());Re(this,"options",this.setOptions);Re(this,"parse",this.parseMarkdown(!0));Re(this,"parseInline",this.parseMarkdown(!1));Re(this,"Parser",Vt);Re(this,"Renderer",ei);Re(this,"TextRenderer",ls);Re(this,"Lexer",Bt);Re(this,"Tokenizer",Qa);Re(this,"Hooks",ra);this.use(...t)}walkTokens(t,n){var l,i;let r=[];for(const s of t)switch(r=r.concat(n.call(this,s)),s.type){case"table":{const o=s;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,n));for(const c of o.rows)for(const h of c)r=r.concat(this.walkTokens(h.tokens,n));break}case"list":{const o=s;r=r.concat(this.walkTokens(o.items,n));break}default:{const o=s;(i=(l=this.defaults.extensions)==null?void 0:l.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const h=o[c].flat(1/0);r=r.concat(this.walkTokens(h,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...t){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{const l={...r};if(l.async=this.defaults.async||l.async||!1,r.extensions&&(r.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const s=n.renderers[i.name];s?n.renderers[i.name]=function(...o){let c=i.renderer.apply(this,o);return c===!1&&(c=s.apply(this,o)),c}:n.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=n[i.level];s?s.unshift(i.tokenizer):n[i.level]=[i.tokenizer],i.start&&(i.level==="block"?n.startBlock?n.startBlock.push(i.start):n.startBlock=[i.start]:i.level==="inline"&&(n.startInline?n.startInline.push(i.start):n.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(n.childTokens[i.name]=i.childTokens)}),l.extensions=n),r.renderer){const i=this.defaults.renderer||new ei(this.defaults);for(const s in r.renderer){if(!(s in i))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;const o=s,c=r.renderer[o],h=i[o];i[o]=(...u)=>{let f=c.apply(i,u);return f===!1&&(f=h.apply(i,u)),f||""}}l.renderer=i}if(r.tokenizer){const i=this.defaults.tokenizer||new Qa(this.defaults);for(const s in r.tokenizer){if(!(s in i))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const o=s,c=r.tokenizer[o],h=i[o];i[o]=(...u)=>{let f=c.apply(i,u);return f===!1&&(f=h.apply(i,u)),f}}l.tokenizer=i}if(r.hooks){const i=this.defaults.hooks||new ra;for(const s in r.hooks){if(!(s in i))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;const o=s,c=r.hooks[o],h=i[o];ra.passThroughHooks.has(s)?i[o]=u=>{if(this.defaults.async)return Promise.resolve(c.call(i,u)).then(g=>h.call(i,g));const f=c.call(i,u);return h.call(i,f)}:i[o]=(...u)=>{let f=c.apply(i,u);return f===!1&&(f=h.apply(i,u)),f}}l.hooks=i}if(r.walkTokens){const i=this.defaults.walkTokens,s=r.walkTokens;l.walkTokens=function(o){let c=[];return c.push(s.call(this,o)),i&&(c=c.concat(i.call(this,o))),c}}this.defaults={...this.defaults,...l}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,n){return Bt.lex(t,n??this.defaults)}parser(t,n){return Vt.parse(t,n??this.defaults)}parseMarkdown(t){return(r,l)=>{const i={...l},s={...this.defaults,...i},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);const c=s.hooks?s.hooks.provideLexer():t?Bt.lex:Bt.lexInline,h=s.hooks?s.hooks.provideParser():t?Vt.parse:Vt.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(r):r).then(u=>c(u,s)).then(u=>s.hooks?s.hooks.processAllTokens(u):u).then(u=>s.walkTokens?Promise.all(this.walkTokens(u,s.walkTokens)).then(()=>u):u).then(u=>h(u,s)).then(u=>s.hooks?s.hooks.postprocess(u):u).catch(o);try{s.hooks&&(r=s.hooks.preprocess(r));let u=c(r,s);s.hooks&&(u=s.hooks.processAllTokens(u)),s.walkTokens&&this.walkTokens(u,s.walkTokens);let f=h(u,s);return s.hooks&&(f=s.hooks.postprocess(f)),f}catch(u){return o(u)}}}onError(t,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const l="<p>An error occurred:</p><pre>"+rn(r.message+"",!0)+"</pre>";return n?Promise.resolve(l):l}if(n)return Promise.reject(r);throw r}}}const qn=new Cp;function xe(e,t){return qn.parse(e,t)}xe.options=xe.setOptions=function(e){return qn.setOptions(e),xe.defaults=qn.defaults,Sd(xe.defaults),xe};xe.getDefaults=Zl;xe.defaults=Zn;xe.use=function(...e){return qn.use(...e),xe.defaults=qn.defaults,Sd(xe.defaults),xe};xe.walkTokens=function(e,t){return qn.walkTokens(e,t)};xe.parseInline=qn.parseInline;xe.Parser=Vt;xe.parser=Vt.parse;xe.Renderer=ei;xe.TextRenderer=ls;xe.Lexer=Bt;xe.lexer=Bt.lex;xe.Tokenizer=Qa;xe.Hooks=ra;xe.parse=xe;xe.options;xe.setOptions;xe.use;xe.walkTokens;xe.parseInline;Vt.parse;Bt.lex;/*! @license DOMPurify 3.4.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.1/LICENSE */const{entries:Rd,setPrototypeOf:lo,isFrozen:Ap,getPrototypeOf:xp,getOwnPropertyDescriptor:Tp}=Object;let{freeze:wt,seal:Gt,create:cr}=Object,{apply:bl,construct:yl}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});Gt||(Gt=function(t){return t});bl||(bl=function(t,n){for(var r=arguments.length,l=new Array(r>2?r-2:0),i=2;i<r;i++)l[i-2]=arguments[i];return t.apply(n,l)});yl||(yl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];return new t(...r)});const Yr=Qe(Array.prototype.forEach),Ip=Qe(Array.prototype.lastIndexOf),so=Qe(Array.prototype.pop),jr=Qe(Array.prototype.push),Ep=Qe(Array.prototype.splice),bt=Array.isArray,Qr=Qe(String.prototype.toLowerCase),Hi=Qe(String.prototype.toString),oo=Qe(String.prototype.match),lr=Qe(String.prototype.replace),co=Qe(String.prototype.indexOf),Lp=Qe(String.prototype.trim),Pp=Qe(Number.prototype.toString),Mp=Qe(Boolean.prototype.toString),uo=typeof BigInt>"u"?null:Qe(BigInt.prototype.toString),ho=typeof Symbol>"u"?null:Qe(Symbol.prototype.toString),Ye=Qe(Object.prototype.hasOwnProperty),zr=Qe(Object.prototype.toString),gt=Qe(RegExp.prototype.test),Ea=Dp(TypeError);function Qe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),l=1;l<n;l++)r[l-1]=arguments[l];return bl(e,t,r)}}function Dp(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return yl(e,n)}}function we(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qr;if(lo&&lo(e,null),!bt(t))return e;let r=t.length;for(;r--;){let l=t[r];if(typeof l=="string"){const i=n(l);i!==l&&(Ap(t)||(t[r]=i),l=i)}e[l]=!0}return e}function Rp(e){for(let t=0;t<e.length;t++)Ye(e,t)||(e[t]=null);return e}function At(e){const t=cr(null);for(const[n,r]of Rd(e))Ye(e,n)&&(bt(r)?t[n]=Rp(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=At(r):t[n]=r);return t}function Np(e){switch(typeof e){case"string":return e;case"number":return Pp(e);case"boolean":return Mp(e);case"bigint":return uo?uo(e):"0";case"symbol":return ho?ho(e):"Symbol()";case"undefined":return zr(e);case"function":case"object":{if(e===null)return zr(e);const t=e,n=dr(t,"toString");if(typeof n=="function"){const r=n(t);return typeof r=="string"?r:zr(r)}return zr(e)}default:return zr(e)}}function dr(e,t){for(;e!==null;){const r=Tp(e,t);if(r){if(r.get)return Qe(r.get);if(typeof r.value=="function")return Qe(r.value)}e=xp(e)}function n(){return null}return n}function Op(e){try{return gt(e,""),!0}catch{return!1}}const go=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yi=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ji=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fp=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),zi=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Up=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),fo=wt(["#text"]),mo=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Wi=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),po=wt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),La=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bp=Gt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vp=Gt(/<%[\w\W]*|[\w\W]*%>/gm),Gp=Gt(/\$\{[\w\W]*/gm),Hp=Gt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yp=Gt(/^aria-[\-\w]+$/),Nd=Gt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jp=Gt(/^(?:\w+script|data):/i),zp=Gt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Od=Gt(/^html$/i),Wp=Gt(/^[a-z][.\w]*(-[.\w]+)+$/i);var vo=Object.freeze({__proto__:null,ARIA_ATTR:Yp,ATTR_WHITESPACE:zp,CUSTOM_ELEMENT:Wp,DATA_ATTR:Hp,DOCTYPE_NAME:Od,ERB_EXPR:Vp,IS_ALLOWED_URI:Nd,IS_SCRIPT_OR_DATA:jp,MUSTACHE_EXPR:Bp,TMPLIT_EXPR:Gp});const Wr={element:1,text:3,progressingInstruction:7,comment:8,document:9},qp=function(){return typeof window>"u"?null:window},Kp=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const l="data-tt-policy-suffix";n&&n.hasAttribute(l)&&(r=n.getAttribute(l));const i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},$o=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:qp();const t=me=>Fd(me);if(t.version="3.4.1",t.removed=[],!e||!e.document||e.document.nodeType!==Wr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const r=n,l=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:o,Element:c,NodeFilter:h,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,y=c.prototype,v=dr(y,"cloneNode"),$=dr(y,"remove"),S=dr(y,"nextSibling"),C=dr(y,"childNodes"),w=dr(y,"parentNode");if(typeof s=="function"){const me=n.createElement("template");me.content&&me.content.ownerDocument&&(n=me.content.ownerDocument)}let b,A="";const{implementation:k,createNodeIterator:_,createDocumentFragment:T,getElementsByTagName:I}=n,{importNode:E}=r;let P=$o();t.isSupported=typeof Rd=="function"&&typeof w=="function"&&k&&k.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:U,TMPLIT_EXPR:V,DATA_ATTR:X,ARIA_ATTR:Y,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:le,CUSTOM_ELEMENT:re}=vo;let{IS_ALLOWED_URI:Q}=vo,J=null;const pe=we({},[...go,...Yi,...ji,...zi,...fo]);let ve=null;const fe=we({},[...mo,...Wi,...po,...La]);let ee=Object.seal(cr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,Ge=null;const De=Object.seal(cr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Fe=!0,et=!0,Pt=!1,Mt=!0,rt=!1,kt=!0,at=!1,dt=!1,Dt=!1,ft=!1,te=!1,Z=!1,_e=!0,ke=!1;const it="user-content-";let _t=!0,Ie=!1,Be={},lt=null;const Pn=we({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Qn=null;const er=we({},["audio","video","img","source","image","track"]);let tr=null;const Or=we({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Mn="http://www.w3.org/1998/Math/MathML",Dn="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml";let sn=st,nr=!1,Fr=null;const bi=we({},[Mn,Dn,st],Hi);let Ur=we({},["mi","mo","mn","ms","mtext"]),rr=we({},["annotation-xml"]);const yi=we({},["title","style","font","a","script"]);let Rn=null;const wi=["application/xhtml+xml","text/html"],on="text/html";let He=null,he=null;const cn=n.createElement("form"),nn=function(D){return D instanceof RegExp||D instanceof Function},Br=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(he&&he===D)return;(!D||typeof D!="object")&&(D={}),D=At(D),Rn=wi.indexOf(D.PARSER_MEDIA_TYPE)===-1?on:D.PARSER_MEDIA_TYPE,He=Rn==="application/xhtml+xml"?Hi:Qr,J=Ye(D,"ALLOWED_TAGS")&&bt(D.ALLOWED_TAGS)?we({},D.ALLOWED_TAGS,He):pe,ve=Ye(D,"ALLOWED_ATTR")&&bt(D.ALLOWED_ATTR)?we({},D.ALLOWED_ATTR,He):fe,Fr=Ye(D,"ALLOWED_NAMESPACES")&&bt(D.ALLOWED_NAMESPACES)?we({},D.ALLOWED_NAMESPACES,Hi):bi,tr=Ye(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)?we(At(Or),D.ADD_URI_SAFE_ATTR,He):Or,Qn=Ye(D,"ADD_DATA_URI_TAGS")&&bt(D.ADD_DATA_URI_TAGS)?we(At(er),D.ADD_DATA_URI_TAGS,He):er,lt=Ye(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)?we({},D.FORBID_CONTENTS,He):Pn,z=Ye(D,"FORBID_TAGS")&&bt(D.FORBID_TAGS)?we({},D.FORBID_TAGS,He):At({}),Ge=Ye(D,"FORBID_ATTR")&&bt(D.FORBID_ATTR)?we({},D.FORBID_ATTR,He):At({}),Be=Ye(D,"USE_PROFILES")?D.USE_PROFILES&&typeof D.USE_PROFILES=="object"?At(D.USE_PROFILES):D.USE_PROFILES:!1,Fe=D.ALLOW_ARIA_ATTR!==!1,et=D.ALLOW_DATA_ATTR!==!1,Pt=D.ALLOW_UNKNOWN_PROTOCOLS||!1,Mt=D.ALLOW_SELF_CLOSE_IN_ATTR!==!1,rt=D.SAFE_FOR_TEMPLATES||!1,kt=D.SAFE_FOR_XML!==!1,at=D.WHOLE_DOCUMENT||!1,ft=D.RETURN_DOM||!1,te=D.RETURN_DOM_FRAGMENT||!1,Z=D.RETURN_TRUSTED_TYPE||!1,Dt=D.FORCE_BODY||!1,_e=D.SANITIZE_DOM!==!1,ke=D.SANITIZE_NAMED_PROPS||!1,_t=D.KEEP_CONTENT!==!1,Ie=D.IN_PLACE||!1,Q=Op(D.ALLOWED_URI_REGEXP)?D.ALLOWED_URI_REGEXP:Nd,sn=typeof D.NAMESPACE=="string"?D.NAMESPACE:st,Ur=Ye(D,"MATHML_TEXT_INTEGRATION_POINTS")&&D.MATHML_TEXT_INTEGRATION_POINTS&&typeof D.MATHML_TEXT_INTEGRATION_POINTS=="object"?At(D.MATHML_TEXT_INTEGRATION_POINTS):we({},["mi","mo","mn","ms","mtext"]),rr=Ye(D,"HTML_INTEGRATION_POINTS")&&D.HTML_INTEGRATION_POINTS&&typeof D.HTML_INTEGRATION_POINTS=="object"?At(D.HTML_INTEGRATION_POINTS):we({},["annotation-xml"]);const j=Ye(D,"CUSTOM_ELEMENT_HANDLING")&&D.CUSTOM_ELEMENT_HANDLING&&typeof D.CUSTOM_ELEMENT_HANDLING=="object"?At(D.CUSTOM_ELEMENT_HANDLING):cr(null);if(ee=cr(null),Ye(j,"tagNameCheck")&&nn(j.tagNameCheck)&&(ee.tagNameCheck=j.tagNameCheck),Ye(j,"attributeNameCheck")&&nn(j.attributeNameCheck)&&(ee.attributeNameCheck=j.attributeNameCheck),Ye(j,"allowCustomizedBuiltInElements")&&typeof j.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=j.allowCustomizedBuiltInElements),rt&&(et=!1),te&&(ft=!0),Be&&(J=we({},fo),ve=cr(null),Be.html===!0&&(we(J,go),we(ve,mo)),Be.svg===!0&&(we(J,Yi),we(ve,Wi),we(ve,La)),Be.svgFilters===!0&&(we(J,ji),we(ve,Wi),we(ve,La)),Be.mathMl===!0&&(we(J,zi),we(ve,po),we(ve,La))),De.tagCheck=null,De.attributeCheck=null,Ye(D,"ADD_TAGS")&&(typeof D.ADD_TAGS=="function"?De.tagCheck=D.ADD_TAGS:bt(D.ADD_TAGS)&&(J===pe&&(J=At(J)),we(J,D.ADD_TAGS,He))),Ye(D,"ADD_ATTR")&&(typeof D.ADD_ATTR=="function"?De.attributeCheck=D.ADD_ATTR:bt(D.ADD_ATTR)&&(ve===fe&&(ve=At(ve)),we(ve,D.ADD_ATTR,He))),Ye(D,"ADD_URI_SAFE_ATTR")&&bt(D.ADD_URI_SAFE_ATTR)&&we(tr,D.ADD_URI_SAFE_ATTR,He),Ye(D,"FORBID_CONTENTS")&&bt(D.FORBID_CONTENTS)&&(lt===Pn&&(lt=At(lt)),we(lt,D.FORBID_CONTENTS,He)),Ye(D,"ADD_FORBID_CONTENTS")&&bt(D.ADD_FORBID_CONTENTS)&&(lt===Pn&&(lt=At(lt)),we(lt,D.ADD_FORBID_CONTENTS,He)),_t&&(J["#text"]=!0),at&&we(J,["html","head","body"]),J.table&&(we(J,["tbody"]),delete z.tbody),D.TRUSTED_TYPES_POLICY){if(typeof D.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ea('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof D.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ea('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');b=D.TRUSTED_TYPES_POLICY,A=b.createHTML("")}else b===void 0&&(b=Kp(m,l)),b!==null&&typeof A=="string"&&(A=b.createHTML(""));wt&&wt(D),he=D},Nn=we({},[...Yi,...ji,...Fp]),Vr=we({},[...zi,...Up]),On=function(D){let j=w(D);(!j||!j.tagName)&&(j={namespaceURI:sn,tagName:"template"});const ue=Qr(D.tagName),Ue=Qr(j.tagName);return Fr[D.namespaceURI]?D.namespaceURI===Dn?j.namespaceURI===st?ue==="svg":j.namespaceURI===Mn?ue==="svg"&&(Ue==="annotation-xml"||Ur[Ue]):!!Nn[ue]:D.namespaceURI===Mn?j.namespaceURI===st?ue==="math":j.namespaceURI===Dn?ue==="math"&&rr[Ue]:!!Vr[ue]:D.namespaceURI===st?j.namespaceURI===Dn&&!rr[Ue]||j.namespaceURI===Mn&&!Ur[Ue]?!1:!Vr[ue]&&(yi[ue]||!Nn[ue]):!!(Rn==="application/xhtml+xml"&&Fr[D.namespaceURI]):!1},St=function(D){jr(t.removed,{element:D});try{w(D).removeChild(D)}catch{$(D)}},Fn=function(D,j){try{jr(t.removed,{attribute:j.getAttributeNode(D),from:j})}catch{jr(t.removed,{attribute:null,from:j})}if(j.removeAttribute(D),D==="is")if(ft||te)try{St(j)}catch{}else try{j.setAttribute(D,"")}catch{}},ys=function(D){let j=null,ue=null;if(Dt)D="<remove></remove>"+D;else{const Xe=oo(D,/^[\r\n\t ]+/);ue=Xe&&Xe[0]}Rn==="application/xhtml+xml"&&sn===st&&(D='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+D+"</body></html>");const Ue=b?b.createHTML(D):D;if(sn===st)try{j=new g().parseFromString(Ue,Rn)}catch{}if(!j||!j.documentElement){j=k.createDocument(sn,"template",null);try{j.documentElement.innerHTML=nr?A:Ue}catch{}}const mt=j.body||j.documentElement;return D&&ue&&mt.insertBefore(n.createTextNode(ue),mt.childNodes[0]||null),sn===st?I.call(j,at?"html":"body")[0]:at?j.documentElement:mt},ws=function(D){return _.call(D.ownerDocument||D,D,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},ki=function(D){return D instanceof f&&(typeof D.nodeName!="string"||typeof D.textContent!="string"||typeof D.removeChild!="function"||!(D.attributes instanceof u)||typeof D.removeAttribute!="function"||typeof D.setAttribute!="function"||typeof D.namespaceURI!="string"||typeof D.insertBefore!="function"||typeof D.hasChildNodes!="function")},Si=function(D){return typeof o=="function"&&D instanceof o};function dn(me,D,j){Yr(me,ue=>{ue.call(t,D,j,he)})}const ks=function(D){let j=null;if(dn(P.beforeSanitizeElements,D,null),ki(D))return St(D),!0;const ue=He(D.nodeName);if(dn(P.uponSanitizeElement,D,{tagName:ue,allowedTags:J}),kt&&D.hasChildNodes()&&!Si(D.firstElementChild)&&gt(/<[/\w!]/g,D.innerHTML)&&gt(/<[/\w!]/g,D.textContent)||kt&&D.namespaceURI===st&&ue==="style"&&Si(D.firstElementChild)||D.nodeType===Wr.progressingInstruction||kt&&D.nodeType===Wr.comment&&gt(/<[/\w]/g,D.data))return St(D),!0;if(z[ue]||!(De.tagCheck instanceof Function&&De.tagCheck(ue))&&!J[ue]){if(!z[ue]&&Cs(ue)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,ue)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(ue)))return!1;if(_t&&!lt[ue]){const Ue=w(D)||D.parentNode,mt=C(D)||D.childNodes;if(mt&&Ue){const Xe=mt.length;for(let Ct=Xe-1;Ct>=0;--Ct){const Rt=v(mt[Ct],!0);Ue.insertBefore(Rt,S(D))}}}return St(D),!0}return D instanceof c&&!On(D)||(ue==="noscript"||ue==="noembed"||ue==="noframes")&&gt(/<\/no(script|embed|frames)/i,D.innerHTML)?(St(D),!0):(rt&&D.nodeType===Wr.text&&(j=D.textContent,Yr([R,U,V],Ue=>{j=lr(j,Ue," ")}),D.textContent!==j&&(jr(t.removed,{element:D.cloneNode()}),D.textContent=j)),dn(P.afterSanitizeElements,D,null),!1)},Ss=function(D,j,ue){if(Ge[j]||_e&&(j==="id"||j==="name")&&(ue in n||ue in cn))return!1;if(!(et&&!Ge[j]&&gt(X,j))){if(!(Fe&&gt(Y,j))){if(!(De.attributeCheck instanceof Function&&De.attributeCheck(j,D))){if(!ve[j]||Ge[j]){if(!(Cs(D)&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,D)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(D))&&(ee.attributeNameCheck instanceof RegExp&&gt(ee.attributeNameCheck,j)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck(j,D))||j==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&gt(ee.tagNameCheck,ue)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(ue))))return!1}else if(!tr[j]){if(!gt(Q,lr(ue,le,""))){if(!((j==="src"||j==="xlink:href"||j==="href")&&D!=="script"&&co(ue,"data:")===0&&Qn[D])){if(!(Pt&&!gt(K,lr(ue,le,"")))){if(ue)return!1}}}}}}}return!0},Ru=we({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Cs=function(D){return!Ru[Qr(D)]&&gt(re,D)},As=function(D){dn(P.beforeSanitizeAttributes,D,null);const{attributes:j}=D;if(!j||ki(D))return;const ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0};let Ue=j.length;for(;Ue--;){const mt=j[Ue],{name:Xe,namespaceURI:Ct,value:Rt}=mt,jt=He(Xe),Ci=Rt;let ot=Xe==="value"?Ci:Lp(Ci);if(ue.attrName=jt,ue.attrValue=ot,ue.keepAttr=!0,ue.forceKeepAttr=void 0,dn(P.uponSanitizeAttribute,D,ue),ot=ue.attrValue,ke&&(jt==="id"||jt==="name")&&co(ot,it)!==0&&(Fn(Xe,D),ot=it+ot),kt&&gt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,ot)){Fn(Xe,D);continue}if(jt==="attributename"&&oo(ot,"href")){Fn(Xe,D);continue}if(ue.forceKeepAttr)continue;if(!ue.keepAttr){Fn(Xe,D);continue}if(!Mt&&gt(/\/>/i,ot)){Fn(Xe,D);continue}rt&&Yr([R,U,V],Is=>{ot=lr(ot,Is," ")});const Ts=He(D.nodeName);if(!Ss(Ts,jt,ot)){Fn(Xe,D);continue}if(b&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!Ct)switch(m.getAttributeType(Ts,jt)){case"TrustedHTML":{ot=b.createHTML(ot);break}case"TrustedScriptURL":{ot=b.createScriptURL(ot);break}}if(ot!==Ci)try{Ct?D.setAttributeNS(Ct,Xe,ot):D.setAttribute(Xe,ot),ki(D)?St(D):so(t.removed)}catch{Fn(Xe,D)}}dn(P.afterSanitizeAttributes,D,null)},xs=function(D){let j=null;const ue=ws(D);for(dn(P.beforeSanitizeShadowDOM,D,null);j=ue.nextNode();)dn(P.uponSanitizeShadowNode,j,null),ks(j),As(j),j.content instanceof i&&xs(j.content);dn(P.afterSanitizeShadowDOM,D,null)};return t.sanitize=function(me){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},j=null,ue=null,Ue=null,mt=null;if(nr=!me,nr&&(me="<!-->"),typeof me!="string"&&!Si(me)&&(me=Np(me),typeof me!="string"))throw Ea("dirty is not a string, aborting");if(!t.isSupported)return me;if(dt||Br(D),t.removed=[],typeof me=="string"&&(Ie=!1),Ie){const Rt=me.nodeName;if(typeof Rt=="string"){const jt=He(Rt);if(!J[jt]||z[jt])throw Ea("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof o)j=ys("<!---->"),ue=j.ownerDocument.importNode(me,!0),ue.nodeType===Wr.element&&ue.nodeName==="BODY"||ue.nodeName==="HTML"?j=ue:j.appendChild(ue);else{if(!ft&&!rt&&!at&&me.indexOf("<")===-1)return b&&Z?b.createHTML(me):me;if(j=ys(me),!j)return ft?null:Z?A:""}j&&Dt&&St(j.firstChild);const Xe=ws(Ie?me:j);for(;Ue=Xe.nextNode();)ks(Ue),As(Ue),Ue.content instanceof i&&xs(Ue.content);if(Ie)return me;if(ft){if(rt){j.normalize();let Rt=j.innerHTML;Yr([R,U,V],jt=>{Rt=lr(Rt,jt," ")}),j.innerHTML=Rt}if(te)for(mt=T.call(j.ownerDocument);j.firstChild;)mt.appendChild(j.firstChild);else mt=j;return(ve.shadowroot||ve.shadowrootmode)&&(mt=E.call(r,mt,!0)),mt}let Ct=at?j.outerHTML:j.innerHTML;return at&&J["!doctype"]&&j.ownerDocument&&j.ownerDocument.doctype&&j.ownerDocument.doctype.name&&gt(Od,j.ownerDocument.doctype.name)&&(Ct="<!DOCTYPE "+j.ownerDocument.doctype.name+`>
`+Ct),rt&&Yr([R,U,V],Rt=>{Ct=lr(Ct,Rt," ")}),b&&Z?b.createHTML(Ct):Ct},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Br(me),dt=!0},t.clearConfig=function(){he=null,dt=!1},t.isValidAttribute=function(me,D,j){he||Br({});const ue=He(me),Ue=He(D);return Ss(ue,Ue,j)},t.addHook=function(me,D){typeof D=="function"&&jr(P[me],D)},t.removeHook=function(me,D){if(D!==void 0){const j=Ip(P[me],D);return j===-1?void 0:Ep(P[me],j,1)[0]}return so(P[me])},t.removeHooks=function(me){P[me]=[]},t.removeAllHooks=function(){P=$o()},t}var Ud=Fd();const Jp="_spoiler_fn1ga_1",_o={spoiler:Jp};var Bd=p("<div>");const Xp={name:"spoiler",level:"inline",start(e){var t;return(t=e.match(/~!/))==null?void 0:t.index},tokenizer(e){const t=/^~!([^!~]+)!~/.exec(e);if(t)return{type:"spoiler",raw:t[0],text:t[1]}},renderer(e){return`<details class="${_o.spoiler}"><summary><span class="${_o.text}">${xe.parseInline(e.text)}</span></summary></details>`}};xe.use({extensions:[Xp]});function ss(e){if(!e.children)return null;const t=xe(e.children),n=Ud.sanitize(t),r=(()=>{var l=Bd();return l.innerHTML=n,l})();return a(H,{get each(){return r.childNodes},children:l=>l})}const Zp=/([^\n])\n([^\n])/g,Qp=(e,t,n)=>t+"<br>"+n;function ti(e){const t=N(()=>{if(!e.text)return[];const n=e.singleLineBreaks?e.text.replace(Zp,Qp):e.text,r=xe(n),l=Ud.sanitize(r);return[...(()=>{var s=Bd();return s.innerHTML=l,s})().childNodes]});return a(H,{get each(){return t()},children:n=>n})}var ev=p("<time class=cp-created-at>");function Gn(e){const[t,n]=O(Math.max(1,Math.abs(new Date/1e3-e.createdAt)));let r=null;return t()<60?r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3):t()<3600&&(r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3*60)),ze(()=>clearInterval(r)),(()=>{var l=ev();return d(l,a(W,{get children(){return[a(M,{get when(){return Math.floor(t()/3600/24/365.25)},children:i=>[i," years",N(()=>Ne(i()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/30)},children:i=>[i," month",N(()=>Ne(i()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/7)},children:i=>[i," week",N(()=>Ne(i()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24)},children:i=>[i," day",N(()=>Ne(i()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600%24)},children:i=>[i," hour",N(()=>Ne(i()))," ago"]}),a(M,{get when(){return Math.floor(t()%3600/60)},children:i=>[i," minute",N(()=>Ne(i()))," ago "]}),a(M,{get when(){return Math.floor(t()%3600%60)},children:i=>[i," second",N(()=>Ne(i()))," ago "]})]}})),L(i=>{var s=new Date(e.createdAt*1e3).toISOString(),o=new Date(e.createdAt*1e3).toLocaleString();return s!==i.e&&G(l,"datetime",i.e=s),o!==i.t&&G(l,"title",i.t=o),i},{e:void 0,t:void 0}),l})()}var tv=p("<div>"),bo=p("<img class=profile alt=Profile>"),nv=p("<div class=header>"),rv=p("<div class=content>"),av=p("<div class=footer>"),iv=p("<img class=cover alt=Cover>"),yo=p("<p> "),lv=p("<div class=main>"),sv=p("<div class=right>"),ov=p("<ol>"),cv=p("<button class=cp-activity-like>Like "),dv=p('<li><img alt="Profile picture">');function os(e){const t=Oe({hideProfile:!1,small:!1,wrapper:n=>(()=>{var r=tv();return Lt(r,n,!1,!1),r})()},e);return F(typeof t.hideProfile=="boolean","hideProfile needs to be boolean"),F(typeof t.small=="boolean","small needs to be boolean"),a(W,{get children(){return[a(M,{get when(){return t.activity.type==="TEXT"},get children(){return a(Li,{get component(){return t.wrapper},class:"activity-card-text",get children(){return[(()=>{var n=nv();return d(n,a(B,{get href(){return"/user/"+t.activity.user.name},class:"activity-profile-header",get children(){return[(()=>{var r=bo();return L(()=>G(r,"src",t.activity.user.avatar.large)),r})(),N(()=>t.activity.user.name)]}}),null),d(n,a(Gn,{get createdAt(){return t.activity.createdAt}}),null),n})(),(()=>{var n=rv();return d(n,a(ss,{get children(){return t.activity.text}})),n})(),(()=>{var n=av();return d(n,a(wo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}})),n})()]}})}}),a(M,{get when(){return t.activity.type==="ANIME_LIST"||t.activity.type==="MANGA_LIST"},get children(){return a(Li,{get component(){return t.wrapper},class:"activity-card-media",get classList(){return{small:t.small}},get children(){return[a(B,{get href(){return Ve(t.activity.media)},get children(){var n=iv();return L(()=>G(n,"src",t.activity.media.coverImage.large)),n}}),(()=>{var n=lv();return d(n,a(W,{get children(){return[a(M,{get when(){return t.hideProfile===!0},get children(){var r=yo(),l=r.firstChild;return d(r,()=>Ke(t.activity.status),l),d(r,a(x,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),r}}),a(M,{get when(){return t.hideProfile===!1},get children(){return[a(B,{get href(){return"/user/"+t.activity.user.name},get children(){return t.activity.user.name}}),(()=>{var r=yo(),l=r.firstChild;return d(r,()=>Ke(t.activity.status),l),d(r,a(x,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),d(r,a(B,{get href(){return"/user/"+t.activity.user.name},get children(){var i=bo();return L(()=>G(i,"src",t.activity.user.avatar.large)),i}}),null),r})()]}})]}})),n})(),(()=>{var n=sv();return d(n,a(Gn,{get createdAt(){return t.activity.createdAt}}),null),d(n,a(wo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}}),null),n})()]}})}}),a(M,{get when(){return t.activity.type==="MESSAGE"},get children(){return a(Li,{get component(){return t.wrapper},children:"message"})}})]}})}function wo(e){const[t,n]=O(e.activity.isLiked),[r,l]=O(e.activity.likeCount),{accessToken:i}=ie(),[s,o]=O(void 0),[c]=de.anilist.listOfActivityLikes(e.activity.id,i,s);let h=e.activity.isLiked;const u=_a(async(f,g,m)=>{if(m!==h){const y=await de.anilist.toggleActivityLike(f,{id:g});F(!y.fromCache,"Mutation should never be cached"),y.status===200&&(e.activity.likeCount=y.data.data.ToggleLike.likeCount,e.activity.isLiked=y.data.data.ToggleLike.isLiked,e.mutateCache(v=>v),h===y.data.data.ToggleLike.isLiked&&(l(y.data.data.ToggleLike.likeCount),n(y.data.data.ToggleLike.isLiked)),h=m)}},500);return(()=>{var f=cv();return f.firstChild,f.$$click=()=>{n(g=>{F(typeof g=="boolean");const m=+!g*2-1;return l(y=>y+m),u(i(),e.activity.id,!g),!g})},f.$$mousemove=()=>r()&&o(!0),d(f,r,null),d(f,a(x,{get when(){var g;return N(()=>!!s())()&&((g=c())==null?void 0:g.data.likes.length)},get children(){return a(Tt,{tipPosition:"left",get children(){var g=ov();return d(g,a(H,{get each(){return c().data.likes},children:m=>(()=>{var y=dv(),v=y.firstChild;return d(y,()=>m.name,null),L(()=>G(v,"src",m.avatar.large)),y})()})),g}})}}),null),L(()=>f.classList.toggle("active",!!t())),f})()}$e(["mousemove","click"]);var uv=p('<ol data-k-82ba8cab class="flex-space-between activity">'),hv=p("<button data-k-82ba8cab>Refresh"),gv=p("<li data-k-82ba8cab>");function fv(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),l=Me(Oc,t,e.variables,n),[i]=zl(e.isDebug,l);let s=0;const[o,c]=O(!1),[h,u]=O(!0),f=bd(u),g=new Set,m=Xn(mn,b=>!i.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var k,_;const b=Ae(o),A=Ae(h);if(S.has((k=e.cache.at(-1))==null?void 0:k.id)&&b)return Math.max(Math.floor(e.cache.length/25)+1,s+1);if(S.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const T=[...S.difference(g)].sort((P,R)=>R-P);if(!T.length)return;const I=ua(T,.5),E=pd(e.cache,P=>P.id-I);return E==-1?void 0:Math.ceil((E+1)/25)}}let $=0;q(oe(i,b=>{var T,I,E,P,R;if(!((T=b==null?void 0:b.data)!=null&&T.activities.length))return;b.data.activities.forEach(U=>{g.add(U.id)});const A=((I=b.data.activities[0])==null?void 0:I.createdAt)||0,k=((E=ua(b.data.activities,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-k)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(u(!1),c(!0),f(_,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/25&&(((P=b.data.activities.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(u(!0),c(!1),s=0,$=0)),e.updateCache(b),y()}));const S=new Set,C=b=>{for(const A of b){const k=parseInt(A.target.dataset.id);F(Number.isInteger(k)),A.isIntersecting?S.add(k):S.delete(k)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[a(x,{get when(){return N(()=>!!i.loading)()&&n()===1},get children(){return a(Wn,{class:"refresh",get children(){return a(Tt,{tipPosition:"bottom",get children(){return a(x,{get when(){return e.cache.length===0},fallback:"Fetching fresh activities",children:"Loading activities"})}})}})}}),(()=>{var b=uv();return d(b,a(H,{get each(){return e.cache},children:A=>{let k;return En(()=>w.observe(k)),a(os,{activity:A,get mutateCache(){return e.mutateCache},wrapper:_=>(()=>{var T=gv(),I=k;return typeof I=="function"?ge(I,T):k=T,Lt(T,_,!1,!1),L(()=>G(T,"data-id",A.id)),T})()})}})),L(()=>b.classList.toggle("loading",!!(i.loading&&n()===1))),b})(),a(W,{get children(){return[a(M,{get when(){return i.loading&&n()>s&&e.cache.length},get children(){return a(Wn,{class:"new",get children(){return a(Tt,{tipPosition:"bottom",children:"Loading activities"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh activity feed to load more",(()=>{var b=hv();return b.$$click=()=>r(1),b})()]}})]}})]}$e(["click"]);var mv=p("<button>debug: ");function pv(e){const{accessToken:t}=ie(),n=Me(pg,t,e.variables),[r,{mutateCache:l,mutateBoth:i}]=nt(n),s=h=>{var u,f;(f=(u=h==null?void 0:h.data)==null?void 0:u.activities)!=null&&f.length&&i(g=>{var k,_,T;if(!((k=g==null?void 0:g.data)!=null&&k.length))return g.data=[h.data.activities],g;const m=h.data.activities.at(-1).id,y=vr(g.data[0],I=>I.id-m),v=((_=g.data[0][y])==null?void 0:_.id)===m;if(h.data.pageInfo.currentPage===1)return v?(g.data[0].splice(0,y+1,...h.data.activities),g):(g.data.unshift(h.data.activities),g.data.length=Math.min(g.data.length,5),g);const $=h.data.activities[0].id,S=vr(g.data[0],I=>I.id-$);if(S===0&&g.data[0][S].id!==$||(g.data[0].splice(S,y-S+v,...h.data.activities),v||g.data.length===1))return g;const w=vr(g.data[1],I=>I.id-m);if(((T=g.data[1][w])==null?void 0:T.id)!==m)return g;const[A]=g.data.splice(1,1);return A.splice(0,w+1),g.data[0].push(...A),g})},[o,c]=Kl();return a(x,{get when(){return!r.loading},get children(){return[a(x,{get when(){return Mr},get children(){var h=mv();return h.firstChild,h.$$click=()=>c(u=>!u),d(h,()=>""+o(),null),h}}),a(fv,Oe({get cache(){var h,u;return((u=(h=r())==null?void 0:h.data)==null?void 0:u[0])||[]},isDebug:o,updateCache:s,mutateCache:l},e))]}})}$e(["click"]);var vv=p("<div><h2>Activity</h2><div><button>All</button><button>Text Status</button><button>List Progress</button></div><button>Following</button><button>Global");function $v(){const[e,t]=ql("LOB_ACTIVITY_TYPE",void 0),[n,r]=zs("LOB_ACTIVITY_IS_FOLLOWING",!0),[l,i]=zs("LOB_ACTIVITY_HAS_REPLIES",void 0),[s,o]=wf("LOB_ACTIVITY_QUERY",{isFollowing:!0});return q(()=>{o(c=>{const h={...c,activityType:e(),isFollowing:n(),hasReplies:l()};for(const u of Object.keys(h))if(h[u]!==c[u])return h;return c})}),(()=>{var c=vv(),h=c.firstChild,u=h.nextSibling,f=u.firstChild,g=f.nextSibling,m=g.nextSibling,y=u.nextSibling,v=y.nextSibling;return f.$$click=()=>t(void 0),g.$$click=()=>t("TEXT"),m.$$click=()=>t("MEDIA_LIST"),y.$$click=()=>{je(()=>{r(!0),i(void 0)})},v.$$click=()=>{je(()=>{r(!1),i(!0)})},d(c,a(x,{get when(){return s()},keyed:!0,get children(){return a(pv,{get variables(){return s()}})}}),null),c})()}$e(["click"]);var _v=p("<div data-k-9b8ac37b class=pg-home>");function bv(){const{accessToken:e,authUserData:t}=ie();return document.title="Home - LOB",a(x,{get when(){return t()},get children(){var n=_v();return d(n,a(Vm,{get token(){return e()},get userId(){return t().data.id}}),null),d(n,a($v,{get token(){return e()}}),null),n}})}function yv(){const t=Qt().hash.substring(1),r=new URLSearchParams(t).get("access_token");if(document.title="Authentication - LOB",(r==null?void 0:r.length)>50){const{setAccessToken:l}=ie();l(r)}return a(hn,{href:"/"})}function wv(e){const[t,{mutate:n}]=Hu(async()=>new Promise(h=>{const u=()=>h(null),f=Ze.user(u);f.onsuccess=g=>{const m=g.target.result,v=Ze.store(m,"data","readonly",u).get("access_token");v.onsuccess=$=>h($.target.result||null),v.onerror=u}})),[r,{mutate:l}]=de.anilist.getAuthUserData(()=>t()??void 0),i=Ze.user();i.onsuccess=h=>{const u=h.target.result,g=Ze.store(u,"data","readonly").get("auth_profile_info");g.onsuccess=m=>{m.target.result!=null&&l(m.target.result)}};const s=h=>{const u=Ze.user();u.onsuccess=f=>{const g=f.target.result,y=Ze.store(g,"data","readwrite").put(h,"access_token");y.onsuccess=()=>n(h)}},o=()=>{const h=Ze.user();h.onsuccess=u=>{const f=u.target.result,g=Ze.store(f,"data","readwrite");g.delete("access_token"),g.delete("auth_profile_info"),n(null),l(null)}},c=N(()=>{var h,u;return((u=(h=r())==null?void 0:h.data)==null?void 0:u.id)===5137809});return a(Sc.Provider,{value:{accessToken:t,setAccessToken:s,authUserData:r,logoutUser:o,isDeveloper:c},get children(){return a(x,{get when(){return!t.loading},get children(){return e.children}})}})}function _n(e){const[t,n]=O(window.matchMedia(e).matches),r=window.matchMedia(e),l=i=>n(i.matches);return r.addEventListener("change",l),ze(()=>r.removeEventListener("change",l)),t}function kv(e){const t=_n("(max-width: 30em)"),n=_n("(max-width: 48em)"),r=_n("(max-width: 64em)"),l=_n("(max-width: 80em)"),i=_n("(max-width: 90em)"),s=_n("(max-width: 160em)"),o=_n("(hover: none) and (pointer: coarse)"),c=_n("(display-mode: standalone)");return a(Cc.Provider,{value:{isMobilSmall:t,isMobilLarge:n,isTablet:r,isLaptop:l,isDesktop:i,isDesktopLarge:s,isTouch:o,isPWA:c},get children(){return e.children}})}var Sv=p("<div>Intersection");function $n(e){let t=Sv();En(()=>{l.observe(t)}),ze(()=>{l.disconnect()});const n={rootMargin:e.rootMargin||"800px"},r=i=>{i[0].isIntersecting!==!1&&(l.unobserve(i[0].target),e.onIntersection())},l=new IntersectionObserver(r,n);return a(W,{fallback:t,get children(){return[a(M,{get when(){return e.fetchResponse()},get children(){return e.children(e.fetchResponse.loading&&e.loading)}}),a(M,{get when(){return e.fetchResponse.loading},get children(){return e.loadingElement||"loading..."}})]}})}var Cv=p("<div data-k-d1a22b47 class=multi-input-footer><button data-k-d1a22b47>Cancel</button><button data-k-d1a22b47>Ok"),Av=p("<form data-k-d1a22b47 class=multi-input><button data-k-d1a22b47 class=open-multi-input>Rating</button><dialog data-k-d1a22b47><div data-k-d1a22b47 class=wrapper><div data-k-d1a22b47 class=scroll-wrapper>"),xv=p("<li data-k-d1a22b47><label data-k-d1a22b47>G - All ages <input data-k-d1a22b47 type=checkbox name=rating value=g>"),Tv=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG - Children <input data-k-d1a22b47 type=checkbox name=rating value=pg>"),Iv=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG-13 - Teen 13 or older <input data-k-d1a22b47 type=checkbox name=rating value=pg13>"),Ev=p("<li data-k-d1a22b47><label data-k-d1a22b47>R - 17+ (violence & profanity) <input data-k-d1a22b47 type=checkbox name=rating value=r17>"),Lv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - Mild nudity <input data-k-d1a22b47 type=checkbox name=rating value=r>"),Pv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - (violence, profanity & mild nudity)<input data-k-d1a22b47 type=checkbox name=rating value=r>"),Mv=p("<ol data-k-d1a22b47><li data-k-d1a22b47><label data-k-d1a22b47>Any rating <input data-k-d1a22b47 type=checkbox name=rating value=any></label></li><li data-k-d1a22b47><label data-k-d1a22b47>Rx - Hentai <input data-k-d1a22b47 type=checkbox name=rating value=rx>");function Dv(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=Av(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,S=$.firstChild;m.$$input=k=>{const _=k.currentTarget.querySelectorAll("input").length,I=new FormData(k.currentTarget).getAll("rating");k.target.value==="any"?k.target.checked?t({rating:"any"}):t({rating:void 0}):k.target.checked&&_-1===I.length?t({rating:"any"}):t({rating:I.filter(E=>E!=="any")})},m.addEventListener("submit",k=>{k.preventDefault()});var C=h;typeof C=="function"?ge(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const k=o.signal;l=e.rating,n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:k}),i.addEventListener("touchstart",_=>{_.target===i&&i.addEventListener("touchend",T=>{T.target===i&&(T.preventDefault(),u())},{once:!0,signal:k})},{signal:k})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==i&&u(),{signal:k}),i.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",u);var b=i;typeof b=="function"?ge(b,v):i=v;var A=s;return typeof A=="function"?ge(A,S):s=S,d(S,a(g,{})),d($,a(x,{get when(){return n()},get children(){var k=Cv(),_=k.firstChild,T=_.nextSibling;return _.$$click=()=>{u(),t({rating:l})},T.$$click=u,k}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({});return q(()=>{Array.isArray(m.rating)?v(Jt(m.rating.reduce(($,S)=>({...$,[S]:!0}),{}))):v(Jt({[m.rating]:!0}))}),(()=>{var $=Mv(),S=$.firstChild,C=S.firstChild,w=C.firstChild,b=w.nextSibling,A=S.nextSibling,k=A.firstChild,_=k.firstChild,T=_.nextSibling;return d($,a(x,{get when(){return m.malSearch==="true"},get children(){return[(()=>{var I=xv(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.g),I})(),(()=>{var I=Tv(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.pg),I})(),(()=>{var I=Iv(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.pg13),I})(),(()=>{var I=Ev(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r17),I})(),(()=>{var I=Lv(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r),I})()]}}),A),d($,a(x,{get when(){return m.malSearch!=="true"},get children(){var I=Pv(),E=I.firstChild,P=E.firstChild,R=P.nextSibling;return L(()=>R.checked=y.any||y.r),I}}),A),L(()=>b.checked=y.any),L(()=>T.checked=y.any||y.rx),$})()}}$e(["input","click"]);var Rv=p('<label data-k-48bbc0c0 class=switch><input data-k-48bbc0c0 type=checkbox><span data-k-48bbc0c0 class="slider round">');function Nv(e){return(()=>{var t=Rv(),n=t.firstChild;return Lt(n,e,!1,!1),t})()}var Ov=p("<div data-k-93c05ee9 class=multi-input-footer><button data-k-93c05ee9>Cancel</button><button data-k-93c05ee9>Ok"),Fv=p('<form data-k-93c05ee9 class=multi-input><button data-k-93c05ee9 class=open-multi-input>Genres</button><dialog data-k-93c05ee9><div data-k-93c05ee9 class=wrapper><div data-k-93c05ee9 class=multi-input-header><input data-k-93c05ee9 type=search placeholder="Filter genres"></div><div data-k-93c05ee9 class=scroll-wrapper>'),ko=p("<h3 data-k-93c05ee9>Genres"),Pa=p("<ol data-k-93c05ee9>"),Uv=p("<h3 data-k-93c05ee9>Tags"),Bv=p("<h3 data-k-93c05ee9>Themes"),Ma=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=excludeGenre>"),Da=p("<li data-k-93c05ee9><label data-k-93c05ee9>"),Ra=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=genre>");function Vv(e){const[t,n]=Te(),{isTouch:r}=en(),[l,i]=O("");let s=!1,o,c,h,u,f,g;function m(){c.close(),s=!1,u==null||u.abort(),n({preventFetch:void 0})}function y(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(oe(r,m)),(()=>{var $=Fv(),S=$.firstChild,C=S.nextSibling,w=C.firstChild,b=w.firstChild,A=b.firstChild,k=b.nextSibling;$.$$input=P=>{const R=P.target.closest("li"),U=P.target.name;!P.target.checked&&!R.classList.contains("exclude")?(R.classList.add("exclude"),P.target.checked=!0,P.target.name="excludeGenre"):R.classList.contains("exclude")&&R.classList.remove("exclude");const V=new FormData(P.currentTarget);R.classList.contains("exclude")?n({[U]:V.getAll(U),[P.target.name]:V.getAll(P.target.name)}):n({[P.target.name]:V.getAll(P.target.name)})},$.addEventListener("submit",P=>{P.preventDefault()});var _=g;typeof _=="function"?ge(_,$):g=$,S.$$click=()=>{if(s)m();else{u=new AbortController;const P=u.signal;o=t.genre,r()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),s=!0}};var T=f;typeof T=="function"?ge(T,S):f=S,C.addEventListener("close",m);var I=c;typeof I=="function"?ge(I,C):c=C,A.$$input=P=>{P.stopPropagation(),i(P.target.value.toLowerCase())};var E=h;return typeof E=="function"?ge(E,k):h=k,d(k,a(v,{})),d(w,a(x,{get when(){return r()},get children(){var P=Ov(),R=P.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({genre:o})},U.$$click=m,P}}),null),L(()=>$.classList.toggle("mobile",!!r())),$})();function v(){const[$]=Te(),[S,C]=We({include:{},exclude:{}});return q(()=>{C(Jt({include:Xt($.genre,{}),exclude:Xt($.excludeGenre,{})}))}),a(W,{get children(){return[a(M,{get when(){return e.engine==="ani"},get children(){return a(x,{get when(){return e.aniGenres()},fallback:"Loading...",get children(){return[ko(),(()=>{var w=Pa();return d(w,a(H,{get each(){return e.aniGenres().data.genres},children:b=>(()=>{var A=Da(),k=A.firstChild;return d(k,b,null),d(k,a(x,{get when(){return S.exclude[b]},get fallback(){return(()=>{var _=Ra();return _.value=b,L(()=>_.checked=S.include[b]),_})()},get children(){var _=Ma();return _.value=b,L(()=>_.checked=S.exclude[b]),_}}),null),L(_=>{var T=!!S.exclude[b],I=!b.toLowerCase().includes(l());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})(),Uv(),(()=>{var w=Pa();return d(w,a(H,{get each(){return e.aniGenres().data.tags},children:b=>(()=>{var A=Da(),k=A.firstChild;return d(k,()=>b.name,null),d(k,a(x,{get when(){return S.exclude[b.name]},get fallback(){return(()=>{var _=Ra();return L(()=>_.value=b.name),L(()=>_.checked=S.include[b.name]),_})()},get children(){var _=Ma();return L(()=>_.value=b.name),L(()=>_.checked=S.exclude[b.name]),_}}),null),L(_=>{var T=!!S.exclude[b.name],I=!b.name.toLowerCase().includes(l());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})()]}})}}),a(M,{get when(){return e.engine==="mal"},get children(){return a(x,{get when(){return e.malGenres()},fallback:"Loading...",get children(){return[ko(),(()=>{var w=Pa();return d(w,a(H,{get each(){return e.malGenres().data.genres},children:b=>(()=>{var A=Da(),k=A.firstChild;return d(k,()=>b.name,null),d(k,a(x,{get when(){return S.exclude[b.name]},get fallback(){return(()=>{var _=Ra();return L(()=>_.value=b.name),L(()=>_.checked=S.include[b.name]),_})()},get children(){var _=Ma();return L(()=>_.value=b.name),L(()=>_.checked=S.exclude[b.name]),_}}),null),L(_=>{var T=!!S.exclude[b.name],I=!b.name.toLowerCase().includes(l());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})(),Bv(),(()=>{var w=Pa();return d(w,a(H,{get each(){return e.malGenres().data.themes},children:b=>(()=>{var A=Da(),k=A.firstChild;return d(k,()=>b.name,null),d(k,a(x,{get when(){return S.exclude[b.name]},get fallback(){return(()=>{var _=Ra();return L(()=>_.value=b.name),L(()=>_.checked=S.include[b.name]),_})()},get children(){var _=Ma();return L(()=>_.value=b.name),L(()=>_.checked=S.exclude[b.name]),_}}),null),L(_=>{var T=!!S.exclude[b.name],I=!b.name.toLowerCase().includes(l());return T!==_.e&&A.classList.toggle("exclude",_.e=T),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),w})()]}})}})]}})}}$e(["input","click"]);var Gv=p('<div data-k-4bf0065c class=cp-two-headed-range><div data-k-4bf0065c class="point start"></div><div data-k-4bf0065c class="point end"></div><div data-k-4bf0065c class=progress-bar>');function Vd(e){F(e.onChange,"onChange is missing");const t=Oe({min:0,max:100,separation:1},e),n=Oe({value:[t.min,t.max]},t);let r,l;q(oe(()=>n.minValue,u=>{c(r,u||n.min)})),q(oe(()=>n.maxValue,u=>{c(l,u||n.max)}));let i;En(()=>{o.observe(i)}),ze(()=>{o.disconnect()});const s=u=>{u[0].isIntersecting===!0&&(c(l,n.maxValue),c(r,n.minValue))},o=new IntersectionObserver(s);return(()=>{var u=Gv(),f=u.firstChild,g=f.nextSibling;u.$$mousedown=h,u.$$touchstart=h;var m=i;typeof m=="function"?ge(m,u):i=u;var y=r;typeof y=="function"?ge(y,f):r=f,f.style.setProperty("--percentage","0%");var v=l;return typeof v=="function"?ge(v,g):l=g,g.style.setProperty("--percentage","100%"),L($=>{var S=n.min,C=n.max;return S!==$.e&&(($.e=S)!=null?f.style.setProperty("--value",S):f.style.removeProperty("--value")),C!==$.t&&(($.t=C)!=null?g.style.setProperty("--value",C):g.style.removeProperty("--value")),$},{e:void 0,t:void 0}),u})();function c(u,f){const g=u.closest(".cp-two-headed-range"),m=g.querySelector(".point.start"),y=g.querySelector(".point.end"),v=m.getBoundingClientRect(),$=y.getBoundingClientRect(),S=g.getBoundingClientRect();if(u===m){const C=$.left-S.left-v.width/2,b=Math.min(1,Math.max(0,(f-n.min)/(parseInt(y.style.getPropertyValue("--value"))-n.min)))*C/S.width;g.querySelector(".progress-bar").style.left=`${(b*100).toFixed(1)}%`,g.querySelector(".progress-bar").style.width=`${(parseInt(y.style.getPropertyValue("--percentage"))-b*100).toFixed(1)}%`,u.style.setProperty("--percentage",(b*100||0).toFixed(1)+"%"),u.style.setProperty("--value",f)}else if(u===y){const C=S.width-(v.right-S.left)-$.width/2,w=parseInt(m.style.getPropertyValue("--value")),b=Math.min(1,Math.max(0,(f-w)/(n.max-w)))*C,A=(v.right-S.left+$.width/2+b)/S.width;g.querySelector(".progress-bar").style.width=`${(A*100-parseInt(m.style.getPropertyValue("--percentage"))).toFixed(1)}%`,u.style.setProperty("--percentage",(A*100||0).toFixed(1)+"%"),u.style.setProperty("--value",f)}}function h(u){u.preventDefault();const f=new AbortController,g=f.signal,m=u.target.closest(".cp-two-headed-range"),y=u.clientX||u.touches[0].clientX,v=m.querySelector(".point.start").getBoundingClientRect(),$=m.querySelector(".point.end").getBoundingClientRect(),S=Math.min(Math.abs(y-v.left),Math.abs(y-v.right)),C=Math.min(Math.abs(y-$.left),Math.abs(y-$.right));let w,b,A=0;u.target.classList.contains("start")?(w=u.target,b=m.querySelector(".point.end")):u.target.classList.contains("end")?(w=u.target,b=m.querySelector(".point.start")):S<C?(w=m.querySelector(".point.start"),b=m.querySelector(".point.end")):(w=m.querySelector(".point.end"),b=m.querySelector(".point.start"));const k=w.classList.contains("end"),_=m.getBoundingClientRect(),T=w.getBoundingClientRect(),I=b.getBoundingClientRect();let E,P=_.left;k?(E=_.width-(I.right-_.left)-I.width/2,P=I.right+I.width/2):E=I.left-_.left-T.width/2,u.target===w&&(A=y-(T.left+T.width/2)),R(y);function R(U){const V=Math.max(Math.min(1,(U-A-P)/E),0),X=k?parseInt(b.style.getPropertyValue("--value"))+n.separation:n.min,Y=k?n.max:parseInt(b.style.getPropertyValue("--value"))-n.separation,K=k?(_.width-E)/_.width:0,le=k?1:E/_.width,re=Math.max(Math.min(le,(U-A-_.left)/_.width),K);k?m.querySelector(".progress-bar").style.width=`${(re*100-parseInt(b.style.getPropertyValue("--percentage"))).toFixed(1)}%`:(m.querySelector(".progress-bar").style.left=`${(re*100).toFixed(1)}%`,m.querySelector(".progress-bar").style.width=`${(parseInt(b.style.getPropertyValue("--percentage"))-re*100).toFixed(1)}%`),w.style.setProperty("--percentage",(re*100).toFixed(1)+"%"),w.style.setProperty("--value",X+Math.round((Y-X)*V))}w.classList.add("active"),g.addEventListener("abort",()=>{w.classList.remove("active"),k?n.onChange([parseInt(b.style.getPropertyValue("--value")),parseInt(w.style.getPropertyValue("--value"))]):n.onChange([parseInt(w.style.getPropertyValue("--value")),parseInt(b.style.getPropertyValue("--value"))])}),window.addEventListener("mousemove",U=>{U.preventDefault(),U.buttons===1?R(U.clientX):f.abort()},{signal:g}),window.addEventListener("touchmove",U=>{U.preventDefault();const[{clientX:V}]=U.touches;R(V)},{signal:g}),window.addEventListener("touchend",()=>{f.abort()},{signal:g,once:!0})}}$e(["touchstart","mousedown"]);const bn=Va(),qi={trending:{order:"trending"},popular:{order:"popularity"},novel:{format:"lightnovel"},finished:{order:"end_date_filtered",status:"complete"},new:{order:"id"},"top-100":{order:"score"},"finished-manga":{order:"end_date_filtered",status:"complete",format:"manga"},"finished-novel":{order:"end_date_filtered",status:"complete",format:"lightnovel"},ani:{tba:{season:"tba",status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{country:"KR"}},mal:{tba:{status:"upcoming"},anime:{"this-season":{year:bn.seasonYear,season:bn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:bn.nextYear,season:bn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{format:"manhwa"}}};function Hv(e,...t){return t.some(n=>n in e&&(e[n]==null||e[n].length===0))}function vi(){const e=ne(),t=Qt(),n=pn(),[r,l]=Te();return[i=>zv(r,e,i),(i,s)=>Wv(r,l,e,n,t,i,s)]}function Yv(){const e=ne(),t=Qt(),n=pn(),[r]=Te();return l=>qv(r,e,n,t,l)}function jv(){const e=ne(),t=Qt(),n=pn(),[r]=Te();return()=>n(`/search/${e.type}${ds(r,e,t,{})}`,{scroll:!1})}function zv(e,t,n){return e[n]||cs(e,t)[n]}function cs(e,t,n){return wl(e.malSearch==="true",t.header,t.type,n)||{}}function wl(e,t,n,r){var s,o,c;const l=r||t;if(l!=null&&l.match(/^(summer|fall|spring|winter)-\d+$/)){const[h,u]=l.split("-");return{year:u,season:h,order:"title_romaji",sort:"ASC"}}const i=e?"mal":"ani";return qi[l]||((s=qi[i])==null?void 0:s[l])||((c=(o=qi[i])==null?void 0:o[n])==null?void 0:c[l])}function Wv(e,t,n,r,l,i,s){var h;const o=cs(e,n),c=(...u)=>ds(e,n,l,...u);if(Hv(i,...Object.keys(o)))return r(`/search/${n.type}${c(i)}`,{scroll:!1,...s});if((h=n.header)!=null&&h.match(/^(summer|fall|spring|winter)-\d+$/)){const{season:u=o.season,year:f=o.year,...g}=i,m=`${u}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}if(n.header==="this-season"||n.header==="next-season"){const{season:u=e.season,year:f=e.year,...g}=i;if(u!=null&&f!=null){const m=`${u}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}}t(i,s)}function qv(e,t,n,r,l){const i=wl(e.malSearch==="true",t.header,t.type),s=wl(e.malSearch==="true",t.header,l);return!i||s?n("/"+t.mode+"/"+l+(t.header?"/"+t.header:"")+r.search):n(`/search/${l}${ds(e,t,r,{},!0)}`,{scroll:!1})}function ds(e,t,n,r,l=!0,i){const s=cs(e,t,i),o=Object.fromEntries(new URLSearchParams(n.search)),c=[...new URLSearchParams(n.search)].filter(([g,m])=>!(g in r||!l&&g in s&&s[g]==m)).map(([g,m])=>`${g}=${m}`),h=l===!1?[]:Object.entries(s).filter(([g])=>!(g in r||g in o)).map(([g,m])=>`${g}=${m}`),u=Object.entries(r).filter(([,g])=>Kv(g)).map(([g,m])=>Array.isArray(m)?m.map(y=>`${g}=${y}`).join("&"):`${g}=${m}`),f=h.concat(c).concat(u).join("&");return f.length?"?"+f:""}function Kv(e){return e!=null&&e.length!=0}var Jv=p("<button data-k-53d51b9e>Cancel"),Xv=p("<button data-k-53d51b9e>Ok"),Zv=p('<form data-k-53d51b9e class=multi-input><button data-k-53d51b9e class=open-multi-input>Year</button><dialog data-k-53d51b9e closedby=any><div data-k-53d51b9e class=wrapper><div data-k-53d51b9e class=multi-input-header><input data-k-53d51b9e type=search placeholder="Search year"></div><div data-k-53d51b9e class=scroll-wrapper></div><div data-k-53d51b9e class=multi-input-footer><div data-k-53d51b9e class=flex-space-between><input data-k-53d51b9e type=number inputmode=numeric name=startYear><input data-k-53d51b9e type=number inputmode=numeric name=endYear>'),Qv=p("<ol data-k-53d51b9e>"),e$=p("<li data-k-53d51b9e><label data-k-53d51b9e> <input data-k-53d51b9e type=radio name=year>");function t$(){const[e,t]=vi(),{isTouch:n}=en(),[r,l]=O(""),i=new Date().getFullYear()+2;let s=!1,o={},c,h,u,f,g;const m=Xn(mn,(S,C)=>t(S,C),100);function y(){c.close(),s=!1,u==null||u.abort(),t({preventFetch:void 0})}function v(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(oe(n,y)),(()=>{var S=Zv(),C=S.firstChild,w=C.nextSibling,b=w.firstChild,A=b.firstChild,k=A.firstChild,_=A.nextSibling,T=_.nextSibling,I=T.firstChild,E=I.firstChild,P=E.nextSibling;S.$$input=Y=>{Y.target.name==="year"&&m({[Y.target.name]:Y.target.checked?Y.target.value:void 0,season:e("season"),startYear:void 0,endYear:void 0})},S.addEventListener("submit",Y=>{Y.preventDefault()});var R=g;typeof R=="function"?ge(R,S):g=S,C.$$click=()=>{if(s)y();else{u=new AbortController;const Y=u.signal;o={year:e("year"),startYear:e("startYear"),endYear:e("endYear")},n()?(c.showModal(),m({preventFetch:!0}),v(),window.addEventListener("resize",v,{signal:Y}),c.addEventListener("touchstart",K=>{K.target===c&&c.addEventListener("touchend",le=>{le.target===c&&(le.preventDefault(),y())},{once:!0,signal:Y})},{signal:Y})):(window.addEventListener("mousedown",K=>K.target!==f&&K.target.closest("dialog")!==c&&y(),{signal:Y}),c.show()),s=!0}};var U=f;typeof U=="function"?ge(U,C):f=C,w.addEventListener("close",y);var V=c;typeof V=="function"?ge(V,w):c=w,k.$$input=Y=>{Y.stopPropagation(),l(Y.target.value.toLowerCase())};var X=h;return typeof X=="function"?ge(X,_):h=_,d(_,a($,{})),d(T,a(Vd,{min:1970,max:i,separation:1,get minValue(){return+e("startYear")||1970},get maxValue(){return+e("endYear")||i},onChange:([Y,K])=>m({startYear:Y,endYear:K,year:void 0})}),I),E.$$beforeinput=Y=>{var K;(K=Y.data)!=null&&K.toLowerCase().includes("e")&&Y.preventDefault()},E.addEventListener("blur",Y=>Y.target.value=e("startYear")||1970),E.addEventListener("change",Y=>{m({startYear:Math.min(+Y.target.value,+e("endYear")||i),endYear:Math.max(+Y.target.value,+e("endYear")||i),year:void 0})}),P.$$beforeinput=Y=>{var K;(K=Y.data)!=null&&K.toLowerCase().includes("e")&&Y.preventDefault()},P.addEventListener("blur",Y=>Y.target.value=e("endYear")||i),P.addEventListener("change",Y=>{m({startYear:Math.min(+Y.target.value,+e("startYear")||1970),endYear:Math.max(+Y.target.value,+e("startYear")||1970),year:void 0})}),d(T,a(x,{get when(){return n()},get children(){return[(()=>{var Y=Jv();return Y.$$click=()=>{y(),t(o)},Y})(),(()=>{var Y=Xv();return Y.$$click=y,Y})()]}}),null),L(()=>S.classList.toggle("mobile",!!n())),L(()=>E.value=+e("startYear")||1970),L(()=>P.value=+e("endYear")||i),S})();function $(){return(()=>{var S=Qv();return d(S,a(H,{get each(){return Array.from({length:Math.abs(i-1969)},(C,w)=>i-w)},children:C=>(()=>{var w=e$(),b=w.firstChild,A=b.firstChild,k=A.nextSibling;return d(b,C,A),k.value=C,L(()=>w.classList.toggle("hidden",!C.toString().startsWith(r()))),L(()=>k.checked=e("year")==C),w})()})),S})()}}$e(["input","click","beforeinput"]);var n$=p("<div data-k-ddc3fe99 class=multi-input-footer><button data-k-ddc3fe99>Cancel</button><button data-k-ddc3fe99>Ok"),r$=p("<form data-k-ddc3fe99 class=multi-input><button data-k-ddc3fe99 class=open-multi-input>Formats</button><dialog data-k-ddc3fe99><div data-k-ddc3fe99 class=wrapper><div data-k-ddc3fe99 class=scroll-wrapper>"),a$=p("<ol data-k-ddc3fe99>"),i$=p("<li data-k-ddc3fe99><label data-k-ddc3fe99><input data-k-ddc3fe99 type=checkbox name=format>");function l$(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=r$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,S=$.firstChild;m.$$input=k=>{const T=new FormData(k.currentTarget).getAll("format");t({format:T})},m.addEventListener("submit",k=>{k.preventDefault()});var C=h;typeof C=="function"?ge(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const k=o.signal;l=e.format,n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:k}),i.addEventListener("touchstart",_=>{_.target===i&&i.addEventListener("touchend",T=>{T.target===i&&(T.preventDefault(),u())},{once:!0,signal:k})},{signal:k})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==i&&u(),{signal:k}),i.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",u);var b=i;typeof b=="function"?ge(b,v):i=v;var A=s;return typeof A=="function"?ge(A,S):s=S,d(S,a(g,{})),d($,a(x,{get when(){return n()},get children(){var k=n$(),_=k.firstChild,T=_.nextSibling;return _.$$click=()=>{u(),t({format:l})},T.$$click=u,k}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.format,{})))});const S=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani";return(()=>{var C=a$();return d(C,a(H,{get each(){return Object.entries(jn[S()][$.type]||{})},fallback:"Something went wrong",children:([w,b])=>(()=>{var A=i$(),k=A.firstChild,_=k.firstChild;return d(k,()=>b.flavorText,_),_.value=w,L(()=>_.checked=y[w]),A})()})),C})()}}$e(["input","click"]);var s$=p("<div data-k-3f80fe5b class=multi-input-footer><button data-k-3f80fe5b>Cancel</button><button data-k-3f80fe5b>Ok"),o$=p("<form data-k-3f80fe5b class=multi-input><div data-k-3f80fe5b class=open-button-wrapper><button data-k-3f80fe5b class=open-multi-input>Sort order</button><button data-k-3f80fe5b type=button></button></div><dialog data-k-3f80fe5b><div data-k-3f80fe5b class=wrapper><div data-k-3f80fe5b class=scroll-wrapper>"),c$=p("<ol data-k-3f80fe5b>"),d$=p("<li data-k-3f80fe5b><label data-k-3f80fe5b><input data-k-3f80fe5b type=radio name=order>");function u$(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=o$(),y=m.firstChild,v=y.firstChild,$=v.nextSibling,S=y.nextSibling,C=S.firstChild,w=C.firstChild;m.$$input=T=>{t({order:T.target.value})},m.addEventListener("submit",T=>{T.preventDefault()});var b=h;typeof b=="function"?ge(b,m):h=m,v.$$click=()=>{if(r)u();else{o=new AbortController;const T=o.signal;l=e.order,n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:T}),i.addEventListener("touchstart",I=>{I.target===i&&i.addEventListener("touchend",E=>{E.target===i&&(E.preventDefault(),u())},{once:!0,signal:T})},{signal:T})):(window.addEventListener("mousedown",I=>I.target!==c&&I.target.closest("dialog")!==i&&u(),{signal:T}),i.show()),r=!0}};var A=c;typeof A=="function"?ge(A,v):c=v,$.$$click=()=>t({sort:e.sort?void 0:"ASC"}),d($,()=>e.sort||"DESC"),S.addEventListener("close",u);var k=i;typeof k=="function"?ge(k,S):i=S;var _=s;return typeof _=="function"?ge(_,w):s=w,d(w,a(g,{})),d(C,a(x,{get when(){return n()},get children(){var T=s$(),I=T.firstChild,E=I.nextSibling;return I.$$click=()=>{u(),t({order:l})},E.$$click=u,T}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.order,{})))});const S=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(Wt[S()][$.type]||{}).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=c$();return d(w,a(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var k=d$(),_=k.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),L(()=>T.value=A.alternative_key||b),L(()=>T.checked=y[b]||A.alternative_key&&y[A.alternative_key]),k})()})),w})()}}$e(["input","click"]);var h$=p("<div data-k-d25d331a class=multi-input-footer><button data-k-d25d331a>Cancel</button><button data-k-d25d331a>Ok"),g$=p("<form data-k-d25d331a class=multi-input><button data-k-d25d331a class=open-multi-input>Status</button><dialog data-k-d25d331a><div data-k-d25d331a class=wrapper><div data-k-d25d331a class=scroll-wrapper>"),f$=p("<ol data-k-d25d331a>"),m$=p("<li data-k-d25d331a><label data-k-d25d331a><input data-k-d25d331a type=radio name=status>");function p$(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=g$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,S=$.firstChild;m.$$input=k=>{t({[k.target.name]:k.target.value})},m.addEventListener("submit",k=>{k.preventDefault()});var C=h;typeof C=="function"?ge(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const k=o.signal;l=e.status,n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:k}),i.addEventListener("touchstart",_=>{_.target===i&&i.addEventListener("touchend",T=>{T.target===i&&(T.preventDefault(),u())},{once:!0,signal:k})},{signal:k})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==i&&u(),{signal:k}),i.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",u);var b=i;typeof b=="function"?ge(b,v):i=v;var A=s;return typeof A=="function"?ge(A,S):s=S,d(S,a(g,{})),d($,a(x,{get when(){return n()},get children(){var k=h$(),_=k.firstChild,T=_.nextSibling;return _.$$click=()=>{u(),t({status:l})},T.$$click=u,k}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({}),$=ne();q(()=>{v(Jt(Xt(m.status,{})))});const S=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",C=()=>Object.entries(Sn[S()][$.type]||{}).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=f$();return d(w,a(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var k=m$(),_=k.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),T.value=b,L(()=>T.checked=y[b]),k})()})),w})()}}$e(["input","click"]);var v$=p("<div data-k-829b0f47 class=multi-input-footer><button data-k-829b0f47>Cancel</button><button data-k-829b0f47>Ok"),$$=p("<form data-k-829b0f47 class=multi-input><button data-k-829b0f47 class=open-multi-input>Country</button><dialog data-k-829b0f47><div data-k-829b0f47 class=wrapper><div data-k-829b0f47 class=scroll-wrapper>"),_$=p("<ol data-k-829b0f47>"),b$=p("<li data-k-829b0f47><label data-k-829b0f47><input data-k-829b0f47 type=radio name=country>");function y$(){const[e,t]=Te(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=$$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,S=$.firstChild;m.$$input=k=>{t({[k.target.name]:k.target.value})},m.addEventListener("submit",k=>{k.preventDefault()});var C=h;typeof C=="function"?ge(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const k=o.signal;l=e.country,n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:k}),i.addEventListener("touchstart",_=>{_.target===i&&i.addEventListener("touchend",T=>{T.target===i&&(T.preventDefault(),u())},{once:!0,signal:k})},{signal:k})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==i&&u(),{signal:k}),i.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",u);var b=i;typeof b=="function"?ge(b,v):i=v;var A=s;return typeof A=="function"?ge(A,S):s=S,d(S,a(g,{})),d($,a(x,{get when(){return n()},get children(){var k=v$(),_=k.firstChild,T=_.nextSibling;return _.$$click=()=>{u(),t({country:l})},T.$$click=u,k}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Te(),[y,v]=We({});q(()=>{v(Jt(Xt(m.country,{})))});const $=()=>Object.entries(Ec).sort(([,S],[,C])=>S.flavorText.localeCompare(C));return(()=>{var S=_$();return d(S,a(H,{get each(){return $()},fallback:"Something went wrong",children:([C,w])=>(()=>{var b=b$(),A=b.firstChild,k=A.firstChild;return d(A,()=>w.flavorText,k),k.value=C,L(()=>k.checked=y[C]),b})()})),S})()}}$e(["input","click"]);var w$=p("<div data-k-de2dabd3 class=multi-input-footer><button data-k-de2dabd3>Cancel</button><button data-k-de2dabd3>Ok"),k$=p('<form data-k-de2dabd3 class=multi-input><button data-k-de2dabd3 class=open-multi-input>Source</button><dialog data-k-de2dabd3><div data-k-de2dabd3 class=wrapper><div data-k-de2dabd3 class=multi-input-header><input data-k-de2dabd3 type=search placeholder="Filter sources"></div><div data-k-de2dabd3 class=scroll-wrapper>'),S$=p("<ol data-k-de2dabd3>"),C$=p("<li data-k-de2dabd3><label data-k-de2dabd3><input data-k-de2dabd3 type=radio name=source>");function A$(){const[e,t]=Te(),[n,r]=O(""),{isTouch:l}=en();let i=!1,s,o,c,h,u,f;function g(){o.close(),i=!1,h==null||h.abort(),t({preventFetch:void 0})}function m(){c.classList.toggle("has-scroll-bar",c.scrollHeight-c.clientHeight>0)}return q(oe(l,g)),(()=>{var v=k$(),$=v.firstChild,S=$.nextSibling,C=S.firstChild,w=C.firstChild,b=w.firstChild,A=w.nextSibling;v.$$input=E=>{t({[E.target.name]:E.target.value})},v.addEventListener("submit",E=>{E.preventDefault()});var k=f;typeof k=="function"?ge(k,v):f=v,$.$$click=()=>{if(i)g();else{h=new AbortController;const E=h.signal;s=e.source,l()?(o.showModal(),t({preventFetch:!0}),m(),window.addEventListener("resize",m,{signal:E}),o.addEventListener("touchstart",P=>{P.target===o&&o.addEventListener("touchend",R=>{R.target===o&&(R.preventDefault(),g())},{once:!0,signal:E})},{signal:E})):(window.addEventListener("mousedown",P=>P.target!==u&&P.target.closest("dialog")!==o&&g(),{signal:E}),o.show()),i=!0}};var _=u;typeof _=="function"?ge(_,$):u=$,S.addEventListener("close",g);var T=o;typeof T=="function"?ge(T,S):o=S,b.$$input=E=>{E.stopPropagation(),r(E.target.value.toLowerCase())};var I=c;return typeof I=="function"?ge(I,A):c=A,d(A,a(y,{})),d(C,a(x,{get when(){return l()},get children(){var E=w$(),P=E.firstChild,R=P.nextSibling;return P.$$click=()=>{g(),t({source:s})},R.$$click=g,E}}),null),L(()=>v.classList.toggle("mobile",!!l())),v})();function y(){const[v]=Te(),[$,S]=We({});q(()=>{S(Jt(Xt(v.source,{})))});const C=()=>Object.entries(Gl).sort(([,w],[,b])=>w.flavorText.localeCompare(b));return(()=>{var w=S$();return d(w,a(H,{get each(){return C()},fallback:"Something went wrong",children:([b,A])=>(()=>{var k=C$(),_=k.firstChild,T=_.firstChild;return d(_,()=>A.flavorText,T),T.value=b,L(()=>k.classList.toggle("hidden",!A.flavorText.toLowerCase().includes(n()))),L(()=>T.checked=$[b]),k})()})),w})()}}$e(["input","click"]);var x$=p("<div data-k-86a7e743 class=multi-input-footer><button data-k-86a7e743>Cancel</button><button data-k-86a7e743>Ok"),T$=p('<form data-k-86a7e743 class=multi-input><button data-k-86a7e743 class=open-multi-input>ExternalSources</button><dialog data-k-86a7e743><div data-k-86a7e743 class=wrapper><div data-k-86a7e743 class=multi-input-header><input data-k-86a7e743 type=search placeholder="Filter external sources"></div><div data-k-86a7e743 class=scroll-wrapper>'),I$=p("<ol data-k-86a7e743>"),E$=p('<img data-k-86a7e743 alt="External source logo">'),L$=p("<sup data-k-86a7e743>"),P$=p("<li data-k-86a7e743><label data-k-86a7e743><div data-k-86a7e743 class=grid-wrapper><span data-k-86a7e743></span></div><input data-k-86a7e743 type=checkbox name=externalSource>");function M$(e){const[t,n]=Te(),[r,l]=O(""),{isTouch:i}=en();let s=!1,o,c,h,u,f,g;function m(){c.close(),s=!1,u==null||u.abort(),n({preventFetch:void 0})}function y(){h.classList.toggle("has-scroll-bar",h.scrollHeight-h.clientHeight>0)}return q(oe(i,m)),(()=>{var $=T$(),S=$.firstChild,C=S.nextSibling,w=C.firstChild,b=w.firstChild,A=b.firstChild,k=b.nextSibling;$.$$input=P=>{const R=new FormData(P.currentTarget);n({[P.target.name]:R.getAll(P.target.name)})},$.addEventListener("submit",P=>{P.preventDefault()});var _=g;typeof _=="function"?ge(_,$):g=$,S.$$click=()=>{if(s)m();else{u=new AbortController;const P=u.signal;o=t.externalSource,i()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),s=!0}};var T=f;typeof T=="function"?ge(T,S):f=S,C.addEventListener("close",m);var I=c;typeof I=="function"?ge(I,C):c=C,A.$$input=P=>{P.stopPropagation(),l(P.target.value.toLowerCase())};var E=h;return typeof E=="function"?ge(E,k):h=k,d(k,a(v,{})),d(w,a(x,{get when(){return i()},get children(){var P=x$(),R=P.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({externalSource:o})},U.$$click=m,P}}),null),L(()=>$.classList.toggle("mobile",!!i())),$})();function v(){const[$]=Te(),[S,C]=We({});return q(()=>{C(Jt(Xt($.externalSource,{})))}),(()=>{var w=I$();return d(w,a(H,{get each(){var b;return((b=e.sources())==null?void 0:b.data)||[]},fallback:"Loading",children:b=>(()=>{var A=P$(),k=A.firstChild,_=k.firstChild,T=_.firstChild,I=_.nextSibling;return d(_,a(x,{get when(){return b.icon},get children(){var E=E$();return L(P=>{var R=b.icon,U=b.color;return R!==P.e&&G(E,"src",P.e=R),U!==P.t&&((P.t=U)!=null?E.style.setProperty("background-color",U):E.style.removeProperty("background-color")),P},{e:void 0,t:void 0}),E}}),T),d(T,()=>b.site,null),d(T,a(x,{get when(){return b.language},get children(){var E=L$();return d(E,()=>b.language),E}}),null),L(()=>A.classList.toggle("hidden",!b.site.toLowerCase().includes(r()))),L(()=>I.value=b.id),L(()=>I.checked=S[b.id]),A})()})),w})()}}$e(["input","click"]);var D$=p("<div data-k-b93bd9f3 class=multi-input-footer><button data-k-b93bd9f3>Cancel</button><button data-k-b93bd9f3>Ok"),R$=p("<form data-k-b93bd9f3 class=multi-input><button data-k-b93bd9f3 class=open-multi-input>Seasons</button><dialog data-k-b93bd9f3><div data-k-b93bd9f3 class=wrapper><div data-k-b93bd9f3 class=scroll-wrapper>"),N$=p("<ol data-k-b93bd9f3>"),O$=p("<li data-k-b93bd9f3><label data-k-b93bd9f3><input data-k-b93bd9f3 type=radio name=season>");function F$(){const[e,t]=vi(),{isTouch:n}=en();let r=!1,l,i,s,o,c,h;function u(){i.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return q(oe(n,u)),(()=>{var m=R$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,S=$.firstChild;m.$$input=k=>{const T=new FormData(k.currentTarget).getAll("season");t({season:T,year:e("year")})},m.addEventListener("submit",k=>{k.preventDefault()});var C=h;typeof C=="function"?ge(C,m):h=m,y.$$click=()=>{if(r)u();else{o=new AbortController;const k=o.signal;l=e("season"),n()?(i.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:k}),i.addEventListener("touchstart",_=>{_.target===i&&i.addEventListener("touchend",T=>{T.target===i&&(T.preventDefault(),u())},{once:!0,signal:k})},{signal:k})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==i&&u(),{signal:k}),i.show()),r=!0}};var w=c;typeof w=="function"?ge(w,y):c=y,v.addEventListener("close",u);var b=i;typeof b=="function"?ge(b,v):i=v;var A=s;return typeof A=="function"?ge(A,S):s=S,d(S,a(g,{})),d($,a(x,{get when(){return n()},get children(){var k=D$(),_=k.firstChild,T=_.nextSibling;return _.$$click=()=>{u(),t({season:l})},T.$$click=u,k}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const m=ne(),[y,v]=We({});q(()=>{v(Jt(Xt(e("season"),{})))});const $=()=>e("malSearch")==="true"&&(m.type==="anime"||m.type==="manga")?"mal":"ani";return(()=>{var S=N$();return d(S,a(H,{get each(){var C;return Object.entries(((C=ca[$()])==null?void 0:C[m.type])||{})},fallback:"Something went wrong",children:([C,w])=>a(x,{when:C!=="tba",get children(){var b=O$(),A=b.firstChild,k=A.firstChild;return d(A,()=>w.flavorText,k),k.value=C,L(()=>k.checked=y[C]),b}})})),S})()}}$e(["input","click"]);var U$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 0.01 512.01 511.99"><path fill=currentColor d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">');function Gd(){return U$()}var B$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">');function V$(){return B$()}var G$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0.03 447.99 512.02"><path fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">');function H$(){return G$()}var Y$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 65.1 512 381.8"><path fill=currentColor d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">');function j$(){return Y$()}var z$=p('<svg viewBox="0 0 16 16"xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z">');function W$(){return z$()}var q$=p('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path fill=currentColor d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">');function ya(e){return(()=>{var t=q$();return Lt(t,e,!0,!0),t})()}var K$=p("<tool-tip2 data-k-6bfde80e inert role=tooltip>",!0,!1,!1);function J$(e){return It(e.positions,"positions"),(()=>{var t=K$();return Lt(t,e,!1,!1),t._$owner=Lr(),L(()=>G(t,"data-tooltip-positions",e.positions)),t})()}var X$=p("<li data-k-5face4dc>"),Z$=p("<button data-k-5face4dc class=cp-media-action-item data-tooltip-trigger>");function qr(e){return(()=>{var t=X$();return d(t,a(Hd,e)),t})()}function Hd(e){return It(e.label,"label"),fn(e.onClick,"onClick"),(()=>{var t=Z$();return Wa(t,"click",e.onClick,!0),d(t,()=>e.children,null),d(t,a(J$,{positions:"left right",get children(){return e.label}}),null),L(()=>t.classList.toggle("big",!!e.big)),t})()}$e(["click"]);var Q$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z">');function e1(){return Q$()}var t1=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z">');function n1(){return t1()}var Yd=p("<div data-k-2ffecdb9 class=score> "),jd=p("<div data-k-2ffecdb9 class=wrapper><img data-k-2ffecdb9 class=absolute-inset alt=Cover.>"),r1=p("<div data-k-2ffecdb9 class=list-status>"),zd=p("<p data-k-2ffecdb9 class=line-clamp>"),Wd=p('<li data-k-2ffecdb9 class="cp-media-card inline-container">'),a1=p("<ul data-k-2ffecdb9 class=cp-media-card-quick-action-items>"),i1=p('<div data-k-2ffecdb9 class="absolute-inset recommendation-rating-wrapper"><div data-k-2ffecdb9 class=flex-space-between><div data-k-2ffecdb9><button data-k-2ffecdb9></button><button data-k-2ffecdb9></button></div><span data-k-2ffecdb9>'),qd=p("<li data-k-2ffecdb9 class=cp-character-card>"),l1=p("<img data-k-2ffecdb9>"),s1=p("<div data-k-2ffecdb9 class=grid><span data-k-2ffecdb9></span><span data-k-2ffecdb9>");function Kd(e){return F(e.media,"Missing media"),(()=>{var t=Wd();return d(t,a(B,{class:"block-link",get href(){return wd(e.media)},get children(){return[(()=>{var n=jd(),r=n.firstChild;return d(n,a(x,{get when(){return e.media.averageScore},get children(){var l=Yd(),i=l.firstChild;return d(l,a(ya,{}),i),d(l,()=>e.media.averageScore/10,null),l}}),null),d(n,()=>e.children,null),L(()=>G(r,"src",e.media.coverImage.large)),n})(),(()=>{var n=zd();return d(n,a(x,{get when(){var r;return(r=e.media.mediaListEntry)==null?void 0:r.status},get children(){var r=r1();return L(()=>G(r,"data-status",e.media.mediaListEntry.status)),r}}),null),d(n,()=>e.media.title.userPreferred,null),n})()]}})),t})()}function o1(e){return F(e.media,"Missing media"),(()=>{var t=Wd();return d(t,a(B,{class:"block-link",get href(){return yd(e.type,e.media)},get children(){return[(()=>{var n=jd(),r=n.firstChild;return d(n,a(x,{get when(){return e.media.score},get children(){var l=Yd(),i=l.firstChild;return d(l,a(ya,{}),i),d(l,()=>e.media.score,null),l}}),null),d(n,()=>e.children,null),L(()=>G(r,"src",e.media.images.webp.large_image_url)),n})(),(()=>{var n=zd();return d(n,a(x,{get when(){return e.media.titles},get fallback(){return e.media.title},get children(){return a(W,{get children(){return[a(M,{get when(){return e.media.titles.English},get children(){return e.media.titles.English}}),a(M,{get when(){return e.media.titles.Default},get children(){return e.media.titles.Default}})]}})}})),n})()]}})),t})()}function $i(e){return F(e.media,"Missing media"),a(Kd,Oe(e,{get children(){return a(Jd,e)}}))}function kl(e){return F(e.media,"Missing media"),It(e.type),a(o1,Oe(e,{get children(){return a(x,{get when(){return qs[e.media.mal_id]},get children(){return a(Jd,{get media(){return qs[e.media.mal_id]}})}})}}))}function Jd(e){const{openEditor:t}=Fl(),{accessToken:n}=ie();return F(e.media,"Missing media"),a(x,{get when(){return n()},get children(){var r=a1();return d(r,a(qr,{label:"Edit media",onClick:l=>{l.preventDefault(),t(e.media)},get children(){return a(Gd,{})}}),null),d(r,a(qr,{label:"Set to planning",onClick:l=>{l.preventDefault(),de.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"PLANNING"})},get children(){return a(V$,{})}}),null),d(r,a(qr,{get label(){return"Set to "+(e.media.type==="ANIME"?"watching":"reading")},onClick:l=>{l.preventDefault(),de.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"CURRENT"})},get children(){return a(H$,{})}}),null),d(r,a(qr,{label:"Set to completed",onClick:l=>{l.preventDefault(),de.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"COMPLETED"})},get children(){return a(j$,{})}}),null),d(r,a(qr,{get label(){return"Set to "+(e.media.type==="ANIME"?"rewatching":"rereading")},onClick:l=>{l.preventDefault(),de.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"REPEAT"})},get children(){return a(W$,{})}}),null),r}})}function c1(e){return F(e.node,"Missing node"),fn(e.handleRateUp,"handleRateUp"),fn(e.handleRateDown,"handleRateDown"),It(e.userRating,"userRating"),Nc(e.rating,"rating"),a(Kd,{get media(){return e.node.mediaRecommendation},get children(){var t=i1(),n=t.firstChild,r=n.firstChild,l=r.firstChild,i=l.nextSibling,s=r.nextSibling;return Wa(l,"click",e.handleRateUp,!0),l.style.setProperty("--color","lime"),d(l,a(e1,{})),Wa(i,"click",e.handleRateDown,!0),i.style.setProperty("--color","crimson"),d(i,a(n1,{})),d(s,a(x,{get when(){return e.rating>0},children:"+"}),null),d(s,()=>e.rating,null),L(o=>{var c=e.userRating==="RATE_UP",h=e.userRating==="RATE_DOWN";return c!==o.e&&l.classList.toggle("active",o.e=c),h!==o.t&&i.classList.toggle("active",o.t=h),o},{e:void 0,t:void 0}),t}})}function Xd(e){return F(e.character,"character"),It(e.role,"role"),(()=>{var t=qd();return d(t,a(Sl,{get href(){return tm(e.character)},get src(){return e.character.images.webp.image_url},get name(){return e.character.name},get extra(){return e.role},alt:"Character."}),null),d(t,a(x,{get when(){return e.voiceActor},get children(){return a(Sl,{get href(){return e.voiceActor.person.url},get src(){return e.voiceActor.person.images.jpg.image_url},get name(){return e.voiceActor.person.name},get extra(){return e.voiceActor.language},alt:"Voice actor.",class:"dir-rtl"})}}),null),t})()}function us(e){return F(e.staff,"staff"),F(e.positions,"positions"),(()=>{var t=qd();return d(t,a(Sl,{get href(){return e.staff.url},get src(){return e.staff.images.jpg.image_url},get name(){return e.staff.name},get extra(){return e.positions.join(", ")},alt:"Staff."})),t})()}function Sl(e){return It(e.alt),a(B,{className:"clean-link flex",get class(){return e.class},get href(){return e.href},get children(){return[(()=>{var t=l1();return L(n=>{var r=e.src,l=e.alt;return r!==n.e&&G(t,"src",n.e=r),l!==n.t&&G(t,"alt",n.t=l),n},{e:void 0,t:void 0}),t})(),(()=>{var t=s1(),n=t.firstChild,r=n.nextSibling;return d(n,()=>e.name),d(r,()=>e.extra),t})()]}})}$e(["click"]);var d1=p("<section data-k-1bb8fda2>");function Zd(e){return(()=>{var t=d1();return Lt(t,e,!1,!1),t})()}var u1=p("<button data-k-89909c33>TBA"),h1=p("<button data-k-89909c33>Current season"),g1=p("<button data-k-89909c33>Next season"),f1=p("<div data-k-89909c33>"),m1=p("<div data-k-89909c33 class=search-page><div data-k-89909c33 class=header-row><h1 data-k-89909c33></h1><select data-k-89909c33 name=type id=type><option data-k-89909c33 value=anime>Anime</option><option data-k-89909c33 value=manga>Manga</option><option data-k-89909c33 value=media>Media</option></select></div><div data-k-89909c33 class=grid-column-auto-fill><input data-k-89909c33 type=search><span data-k-89909c33><p data-k-89909c33>Search MAL</p></span><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hideMyAnime id=hideMyAnime><label data-k-89909c33 for=hideMyAnime> Hide my </label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=showMyAnime id=showMyAnime><label data-k-89909c33 for=showMyAnime> Only show my </label></div><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hasNotLicense id=hasNotLicense><label data-k-89909c33 for=hasNotLicense> Licensed</label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=hasLicense id=hasLicense><label data-k-89909c33 for=hasLicense> Unlicensed"),p1=p('<ol data-k-89909c33 class="flex-space-between cp-search-season-controls"><li data-k-89909c33><button data-k-89909c33>&lt;</button></li><li data-k-89909c33><button data-k-89909c33>>'),v1=p("<h1 data-k-89909c33> "),Ki=p("<h1 data-k-89909c33>"),$1=p("<h1 data-k-89909c33>TBA"),_1=p('<ol data-k-89909c33 class="search-page-content grid-column-auto-fill">'),b1=p("<li data-k-89909c33 class=item><button data-k-89909c33><h3 data-k-89909c33></h3><p data-k-89909c33>"),y1=p("<ol data-k-89909c33 class=search-meta-tags><li data-k-89909c33><button data-k-89909c33>Clear all"),w1=p("<li data-k-89909c33><button data-k-89909c33>"),Cl=p("<li data-k-89909c33 class=grid-full-span><h2 data-k-89909c33>");class se{constructor({url:t,key:n,value:r,active:l=!0,visuallyDisabled:i=!1,reason:s,desc:o,name:c,hidden:h=!1,canClear:u=!0,addUrl:f}){F(!l||n,"key missing"),F(h||c,"Name is missing"),F(!u||!l||t,"Url is missing"),F(u||h,"Don't show user meta tags they can't clear"),F(typeof l=="boolean","active is not boolean"),F(typeof i=="boolean","visuallyDisabled is not boolean"),F(typeof h=="boolean","hidden is not boolean"),F(typeof u=="boolean","canClear is not boolean"),this.name=c,this.url=t,this.addUrl=f,this.key=n,this.value=r,this.active=l,this.visuallyDisabled=i,this.reason=s,this.desc=o,this.hidden=h,this.canClear=u}match(t={}){return this.name===t.name&&Zr(this.url,t.url)&&Zr(this.addUrl,t.addUrl)&&this.key===t.key&&Zr(this.value,t.value)&&this.active===t.active&&this.visuallyDisabled===t.visuallyDisabled&&this.reason===t.reason&&this.desc===t.desc&&this.hidden===t.hidden&&this.canClear===t.canClear}looseMatch(t={}){return this.key===t.key&&Zr(this.value,t.value)&&this.active===t.active}}function k1(){var $,S,C,w,b,A,k;const e=ne(),[t]=Te(),[n]=vi(),r=e.type,l=t.malSearch==="true"&&e.type!=="media"?"mal":"ani",i=l==="ani"?"mal":"ani",s=[];let o=t.preventFetch==="true";const[c]=qe(n("season"));if(c&&l===hl){const{api:_,flavorText:T}=((S=($=ca[l])==null?void 0:$[r])==null?void 0:S[c])||{flavorText:Sn.flavorTexts[c]||c};s.push(new se({name:T,url:`season=${c}`,key:"season",value:_,active:_!==void 0,visuallyDisabled:_===void 0}))}const[h]=qe(n("year"));let u=!1,f=!1,g=!1;if(c&&h&&l===Ka){const{api:_,flavorText:T}=((w=(C=ca[l])==null?void 0:C[r])==null?void 0:w[c])||{flavorText:Sn.flavorTexts[c]||c};s.push(new se({name:T,url:`season=${c}`,key:"season",value:h+"/"+_,active:_!==void 0,visuallyDisabled:_===void 0})),s.push(new se({name:h,url:`year=${h}`,active:!1})),g=!0}else h&&(u=!0,f=!0,l==="ani"?c&&r==="anime"?s.push(new se({name:h,url:`year=${h}`,active:!0,key:"seasonYear",value:h})):s.push(new se({name:h,url:`year=${h}`,active:!0,key:"year",value:`${h}%`})):l==="mal"&&(s.push(new se({name:h,url:`year=${h}`,active:!0,key:"start_date",value:`${h}-01-01`})),s.push(new se({hidden:!0,canClear:!1,key:"end_date",value:`${h}-12-31`}))));if(Rc(g&&l===hl,"Season disabling should only have on MAL search"),t.q&&s.push(new se({url:"q="+t.q,key:l==="ani"?"search":"q",value:t.q,name:"Search: "+t.q,active:!g,visuallyDisabled:g})),l==="ani"&&(e.type==="anime"?s.push(new se({key:"type",value:"ANIME",hidden:!0,canClear:!1})):e.type==="manga"?s.push(new se({key:"type",value:"MANGA",hidden:!0,canClear:!1})):e.type==="media"&&s.push(new se({key:"type",value:void 0,hidden:!0,canClear:!1}))),t.rating===void 0)l==="ani"?s.push(new se({key:"isAdult",value:!1,hidden:!0,canClear:!1})):l==="mal"&&s.push(new se({key:"sfw",value:!0,hidden:!0,canClear:!1}));else{const _=Xt(t.rating);if(_.any)l==="ani"?s.push(new se({name:"Any rating",url:"rating=any",key:"isAdult",value:void 0})):l==="mal"&&s.push(new se({name:"Any rating",url:"rating=any",active:!1,visuallyDisabled:g}));else{const T={g:"G - All ages",pg:"PG - Children",pg13:"PG-13",r17:"R - 17+",r:"R+",rx:"Rx - Hentai"};new Set([t.rating].flat()).forEach(E=>{E==="g"||E==="pg"||E==="pg13"||E==="r17"?s.push(new se({name:T[E],url:`rating=${E}`,key:"rating",value:E,visuallyDisabled:l==="ani"||g,active:l==="mal"&&!g})):(E==="r"||E==="rx")&&s.push(new se({name:T[E],url:`rating=${E}`,key:"rating",value:E,active:l==="mal"&&!g,visuallyDisabled:g}))}),l==="ani"&&(_.rx&&(_.g||_.pg||_.pg13||_.r17||_.r)?s.push(new se({key:"isAdult",value:void 0,hidden:!0,canClear:!1})):s.push(new se({key:"isAdult",value:_.rx===!0,hidden:!0,canClear:!1})))}}if(t.genre){const[,_,T]=[...fr(t.genre)].reduce(m,["genre"]);l==="ani"?(_.length&&s.push(new se({key:"genres",value:_,hidden:!0,canClear:!1})),T.length&&s.push(new se({key:"tags",value:T,hidden:!0,canClear:!1}))):l==="mal"&&_.length&&s.push(new se({key:"genres",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}if(t.excludeGenre){const[,_,T]=[...fr(t.excludeGenre)].reduce(m,["excludeGenre"]);l==="ani"?(_.length&&s.push(new se({key:"excludedGenres",value:_,hidden:!0,canClear:!1})),T.length&&s.push(new se({key:"excludeTags",value:T,hidden:!0,canClear:!1}))):l==="mal"&&_.length&&s.push(new se({key:"genres_exclude",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}function m([_,T=[],I=[]],E){let P=!1;return l==="ani"?Bn.genres===null?o=!0:Bn.tags[E]?I.push(E):Bn.genres[E]?T.push(E):P=!0:l==="mal"&&(Bn[r]===null?o=!0:Number.isInteger(Bn[r][E])?T.push(Bn[r][E]):P=!0),s.push(new se({name:E,url:`${_}=${E}`,active:!1,visuallyDisabled:P||g})),[_,T,I]}const[y]=[+t.startYear].flat();y&&(f=!0,l==="ani"?s.push(new se({name:`Year greater than ${y-1}`,active:!h,visuallyDisabled:!!h,url:`startYear=${y}`,key:"yearGreater",value:parseInt(`${y-1}9999`)})):l==="mal"&&s.push(new se({name:`Year greater than ${y-1}`,active:!h&&!g,visuallyDisabled:!!h||g,url:`startYear=${y}`,key:"start_date",value:`${y}-01-01`})));const[v]=[+t.endYear].flat();v&&(u=!0,l==="ani"?s.push(new se({name:`Year lesser than ${v+1}`,active:!h,visuallyDisabled:!!h,url:`startYear=${y}`,key:"yearLesser",value:parseInt(`${v+1}0000`)})):l==="mal"&&s.push(new se({name:`Year lesser than ${v+1}`,active:!h&&!g,visuallyDisabled:!!h||g,url:`endYear=${v}`,key:"start_date",value:`${v}-12-31`}))),t.onList==="true"&&s.push(new se({name:`Show my ${r}`,active:l==="ani",visuallyDisabled:l!=="ani",url:"onList=true",key:"onList",value:!0})),t.onList==="false"&&s.push(new se({name:`Hide my ${r}`,active:l==="ani",visuallyDisabled:l!=="ani",url:"onList=false",key:"onList",value:!1}));{const _=[];fr(n("format")).forEach(T=>{var R;const{api:I,flavorText:E}=((R=jn[l][r])==null?void 0:R[T])||{},P=E||jn.flavorTexts[T]||T;l==="ani"&&I&&_.push(I),I?g&&l===Ka?s.push(new se({name:"Format: "+E,key:"filter",value:I,url:`format=${T}`})):s.push(new se({name:"Format: "+E,active:l==="mal",key:"type",value:I,url:`format=${T}`})):s.push(new se({name:"Format: "+P,active:!1,visuallyDisabled:!0,url:`format=${T}`}))}),_.length&&s.push(new se({key:"format",value:_,canClear:!1,hidden:!0}))}{const _=[];let T=!1,I=!1;fr(n("order")).forEach(P=>{var le,re,Q;let R=P;if(P===Wt.ani.anime.duration.alternative_key)R="duration",s.push(new se({name:"Duration greater than 0",url:`order=${P}`,active:l==="ani",visuallyDisabled:l!=="ani",addUrl:`order=${R}`,key:"durationGreater",value:0}));else if(P===Wt.mal.anime.episodes.alternative_key)R="episodes",l==="ani"?r==="anime"?s.push(new se({name:"Episodes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="manga"?s.push(new se({name:"Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="media"&&s.push(new se({name:"Episodes/Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):l==="mal"&&s.push(new se({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===Wt.mal.manga.volumes.alternative_key)R="volumes",l==="ani"?s.push(new se({name:"Volumes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,active:r==="manga"&&!g,visuallyDisabled:r!=="manga"||g,key:"volumeGreater",value:0})):l==="mal"&&s.push(new se({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===Wt.mal.anime.end_date.alternative_key){R="end_date";const J={name:"Only valid dates",active:!u&&!g,hidden:u,url:`order=${P}`,addUrl:`order=${R}`};l==="ani"?s.push(new se({...J,key:"endDateGreater",value:0})):l==="mal"&&s.push(new se({...J,key:"end_date",value:`${new Date().getFullYear()+100}-01-01`,visuallyDisabled:g}))}else if(P===Wt.mal.anime.start_date.alternative_key){R="start_date";const J={name:"Only valid dates",active:!f&&!g,hidden:f,url:`order=${P}`,addUrl:`order=${R}`};l==="ani"?s.push(new se({...J,key:"yearGreater",value:0})):l==="mal"&&s.push(new se({...J,key:"start_date",value:"0000-01-01",visuallyDisabled:g}))}const{api:U,flavorText:V,reverse:X}=((le=Wt[l][r])==null?void 0:le[R])||{},Y=V||((Q=(re=Wt[l==="ani"?"mal":"ani"][r])==null?void 0:re[R])==null?void 0:Q.flavorText)||Wt.flavorTexts[R]||P;l==="ani"&&U?t.sort==="ASC"?_.push(U):_.push(U+"_DESC"):l==="mal"&&X&&(I=!0);const K=[`order=${P}`];t.sort&&K.push(`sort=${t.sort}`),U?(T||(T=l==="mal"),s.push(new se({name:"Sort: "+V,active:l==="mal"&&!g,visuallyDisabled:g,key:"order_by",value:U,url:K}))):s.push(new se({name:"Sort: "+Y,active:!1,visuallyDisabled:!0,url:K}))}),F(_.length===0||l==="ani","validAniOrder should not have anilist orders when engine is mal"),F(T===!1||l==="mal","validMalOrder should be false if engine is ani"),l==="ani"?_.length?s.push(new se({key:"sort",value:_,canClear:!1,hidden:!0})):t.q?s.push(new se({key:"sort",value:"SEARCH_MATCH",canClear:!1,hidden:!0})):s.push(new se({key:"sort",value:"POPULARITY_DESC",canClear:!1,hidden:!0})):l==="mal"&&(!T&&!t.q&&(I=!0,s.push(new se({key:"order_by",value:"popularity",canClear:!1,hidden:!0,active:!g,visuallyDisabled:g}))),I?s.push(new se({key:"sort",value:t.sort==="ASC"?"desc":"asc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})):s.push(new se({key:"sort",value:t.sort==="ASC"?"asc":"desc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})))}if(n("status")){const[_]=qe(n("status")),{api:T,flavorText:I}=((b=Sn[l][r])==null?void 0:b[_])||{flavorText:((k=(A=Sn[i][r])==null?void 0:A[_])==null?void 0:k.flavorText)||Sn.flavorTexts[_]||_};s.push(new se({name:I,active:!!T,visuallyDisabled:!T,key:"status",value:T,url:`status=${_}`}))}if(n("country")){const[_]=qe(n("country")),{flavorText:T}=Ec[_]||{flavorText:_};s.push(new se({name:T,active:l==="ani",visuallyDisabled:l!=="ani",key:"countryOfOrigin",value:_,url:`country=${_}`}))}if(t.source){const[_]=qe(t.source),{api:T,flavorText:I}=Gl[_]||{flavorText:_};s.push(new se({name:I,active:l==="ani",visuallyDisabled:l!=="ani",key:"source",value:T,url:`source=${_}`}))}if(t.license!==void 0){const _=t.license==="true";s.push(new se({name:_?"Licensed":"Unlicensed",active:l==="ani",visuallyDisabled:l!=="ani",key:"isLicensed",value:_,url:`license=${_}`}))}if(t.externalSource!==void 0){const _=qe(t.externalSource).map(Number);_.forEach(T=>{s.push(new se({name:S1[T]||T,active:!1,visuallyDisabled:l!=="ani",url:`externalSource=${T}`}))}),s.push(new se({active:l==="ani",hidden:!0,canClear:!1,key:"licensedBy",value:_}))}if(t.episodeGreater!==void 0){const[_]=qe(t.episodeGreater).map(Number),T={active:l==="ani",visuallyDisabled:l!=="ani",key:"episodeGreater",value:Math.max(_+1,0),url:`episodeGreater=${_}`};r==="manga"?s.push(new se({name:`Chapters greater than ${_}`,...T})):r==="anime"?s.push(new se({name:`Episodes greater than ${_}`,...T})):r==="media"&&s.push(new se({name:`Episode/Chapters greater than ${_}`,...T}))}if(t.episodeLesser!==void 0){const[_]=qe(t.episodeLesser).map(Number),T={active:l==="ani",visuallyDisabled:l!=="ani",key:"episodeLesser",value:Math.max(_,0),url:`episodeLesser=${_}`};r==="manga"?s.push(new se({name:`Chapters lesser than ${_}`,...T})):r==="anime"?s.push(new se({name:`Episodes lesser than ${_}`,...T})):r==="media"&&s.push(new se({name:`Episode/Chapters lesser than ${_}`,...T}))}if(t.rank){const[_]=qe(t.rank);s.push(new se({name:`Tags above ${_}%`,url:`rank=${_}`,key:"minimumTagRank",value:_,active:l==="ani",visuallyDisabled:l!=="ani"}))}return[r,l,s,o]}const[Bn,So]=We({anime:null,manga:null,genres:null,tags:null}),[S1,C1]=We({});function A1(e){const t=Yv(),n=ne(),[r,l]=Te(),[i,s]=O(),[o,c]=O(),[h,u]=O(),[f,g]=O(),[m,y]=O(),[v,$]=O(),[S]=de.anilist.genresAndTags(()=>r.malSearch!=="true"||void 0),[C]=de.anilist.externalSources(()=>r.malSearch!=="true"||n.type==="media"?null:n.type==="anime"||n.type==="manga"?n.type.toUpperCase():void 0),[w]=de.myAnimeList.genresAndThemes(()=>r.malSearch==="true"&&(n.type==="anime"||n.type==="manga")?n.type:void 0),b=mn(l,300),A=Xn(mn,(k,_,T)=>{je(()=>{g(k),y(_),$(I=>{const E=(I==null?void 0:I.filter(R=>R.active))||[],P=T.filter(R=>R.active);return E.length===P.length&&E.every((R,U)=>R.looseMatch(P[U]))?I:T})})},300);return q(oe(w,k=>{k&&So(k.data.translations)})),q(oe(S,k=>{k&&So({genres:Xt(k.data.genres),tags:k.data.tags.reduce((_,T)=>(_[T.name]=T,_),{})})})),q(oe(C,k=>{k&&C1(k.data.reduce((_,T)=>(_[T.id]=T.site,_),{}))})),q(()=>{const[k,_,T,I]=k1();I||je(()=>{s(k),c(_),u(E=>(E==null?void 0:E.length)===T.length&&T.every((P,R)=>P.match(E[R]))?E:T),A(k,_,T)})}),(()=>{var k=m1(),_=k.firstChild,T=_.firstChild,I=T.nextSibling,E=_.nextSibling,P=E.firstChild,R=P.nextSibling;R.firstChild;var U=R.nextSibling,V=U.firstChild,X=V.nextSibling;X.firstChild;var Y=X.nextSibling,K=Y.nextSibling,le=K.nextSibling;le.firstChild;var re=U.nextSibling,Q=re.firstChild,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling;return d(T,()=>Ke(n.mode)),I.addEventListener("change",fe=>t(fe.target.value)),P.$$input=fe=>{b({q:fe.target.value})},d(R,a(Nv,{get disabled(){return n.type==="media"},name:"malSearch",get checked(){return r.malSearch==="true"&&n.type!=="media"},onInput:fe=>{l({malSearch:fe.target.checked||void 0})}}),null),V.$$input=fe=>{l({onList:fe.target.checked?!1:void 0})},d(X,()=>n.type,null),K.$$input=fe=>{l({onList:fe.target.checked||void 0})},d(le,()=>n.type,null),Q.$$input=fe=>{l({license:fe.target.checked||void 0})},ve.$$input=fe=>{l({license:fe.target.checked?!1:void 0})},d(E,a(Dv,{}),null),d(E,a(Vv,{aniGenres:S,malGenres:w,translation:Bn,get engine(){return o()},showAdult:!0}),null),d(E,a(t$,{}),null),d(E,a(l$,{}),null),d(E,a(u$,{}),null),d(E,a(p$,{}),null),d(E,a(y$,{}),null),d(E,a(A$,{}),null),d(E,a(F$,{}),null),d(E,a(M$,{sources:C}),null),d(E,a(Vd,{min:0,max:500,separation:1,get minValue(){return+r.episodeGreater||0},get maxValue(){return+r.episodeLesser||500},onChange:([fe,ee])=>l({episodeLesser:ee,episodeGreater:fe})}),null),d(E,a(x,{get when(){return n.type==="anime"},get children(){var fe=f1();return d(fe,a(B,{get href(){return"/search/anime/tba"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return u1()}}),null),d(fe,a(B,{get href(){return"/search/anime/this-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return h1()}}),null),d(fe,a(B,{get href(){return"/search/anime/next-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return g1()}}),null),fe}}),null),d(k,a(yc.Provider,{value:{searchType:i,searchEngine:o,searchVariables:h,debouncedSearchType:f,debouncedSearchEngine:m,debouncedSearchVariables:v},get children(){return e.children}}),null),L(()=>G(P,"placeholder","Search "+(n.type||"All"))),L(()=>I.value=n.type),L(()=>P.value=r.q||""),L(()=>V.checked=r.onList==="false"),L(()=>K.checked=r.onList==="true"),L(()=>Q.checked=r.license==="true"),L(()=>ve.checked=r.license==="false"),k})()}function x1(e){const t=ne(),[n]=Te(),[r,l]=vi(),{debouncedSearchEngine:i,debouncedSearchType:s,searchVariables:o,debouncedSearchVariables:c}=Ol(),h=pn();return[a(W,{get children(){return a(M,{get when(){var u;return((u=t.header)==null?void 0:u.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){var u=p1(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild;return g.$$click=()=>{const v=gr(zt(r("season")),+zt(r("year")),-1);l({year:v.year,season:v.season.toLowerCase()})},d(u,a(H,{each:["winter","spring","summer","fall"],children:v=>(()=>{var $=b1(),S=$.firstChild,C=S.firstChild,w=C.nextSibling;return S.$$click=()=>l({season:v,year:+zt(r("year"))}),d(C,()=>Ke(v)),d(w,()=>zt(r("year"))),L(()=>$.classList.toggle("selected",v===zt(r("season")))),$})()}),m),y.$$click=()=>{const v=gr(zt(r("season")),+zt(r("year")),1);l({year:v.year,season:v.season.toLowerCase()})},u}})}}),a(W,{get children(){return[a(M,{get when(){var u;return(u=t.header)==null?void 0:u.match(/^(summer|fall|spring|winter)-\d+$/)},get children(){var u=v1(),f=u.firstChild;return d(u,()=>Ke(t.header.split("-")[0]),f),d(u,()=>t.header.split("-")[1],null),u}}),a(M,{get when(){return t.header==="this-season"},get children(){var u=Ki();return d(u,a(x,{get when(){return n.season||n.year},fallback:"Current season",get children(){return[N(()=>Ke(zt(r("season"))))," ",N(()=>zt(r("year")))]}})),u}}),a(M,{get when(){return t.header==="next-season"},get children(){var u=Ki();return d(u,a(x,{get when(){return n.season||n.year},fallback:"Next season",get children(){return[N(()=>Ke(zt(r("season"))))," ",N(()=>zt(r("year")))]}})),u}}),a(M,{get when(){return t.header==="tba"},get children(){return $1()}}),a(M,{get when(){return t.header},get children(){var u=Ki();return d(u,()=>t.header),u}})]}}),N(()=>e.children),a(x,{get when(){var u;return(u=o())==null?void 0:u.filter(f=>!f.hidden)},children:u=>a(x,{get when(){return u().length},get children(){return["Tags:",(()=>{var f=y1(),g=f.firstChild,m=g.firstChild;return d(f,a(H,{get each(){return u()},children:y=>a(x,{get when(){return!y.hidden},get children(){var v=w1(),$=v.firstChild;return $.$$click=()=>{const S={};qe(y.url).forEach(C=>{const[w,...b]=C.split("="),A=b.join("=");S[w]=qe(S[w]||n[w]).filter(k=>k!==A)}),qe(y.addUrl).forEach(C=>{const[w,...b]=C.split("="),A=b.join("=");S[w]??(S[w]=qe(n[w])),S[w].push(A)}),l(S)},d($,()=>y.name),L(()=>v.classList.toggle("disabled",!!y.visuallyDisabled)),v}})}),g),m.$$click=()=>{n.malSearch==="true"?h("/search/"+t.type+"?malSearch=true"):h("/search/"+t.type)},f})()]}})}),a(Zd,{get children(){var u=_1();return d(u,a(W,{get children(){return[a(M,{get when(){return i()==="ani"},get children(){return a(W,{get children(){return[a(M,{get when(){var f;return((f=t.header)==null?void 0:f.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){return[a(x,{get when(){var f;return(f=c().find(g=>g.key==="seasonYear"))==null?void 0:f.value},children:f=>a(x,{get when(){var g;return(g=c().find(m=>m.key==="season"))==null?void 0:g.value},children:g=>a(x,{get when(){return c().filter(m=>m.key==="format").length===0||c().some(m=>{var y;return m.key==="format"&&((y=m.value)==null?void 0:y.includes("TV"))})},get children(){return a(Al,{page:1,get variables(){return c()},title:"Leftovers",groupCards:!1,get extraVariables(){return{seasonYear:gr(g(),+f(),-1).year,season:gr(g(),+f(),-1).season,episodeGreater:16,format:"TV"}}})}})})}),a(Al,{page:1,get variables(){return c()},extraVariables:{sort:"FORMAT"}})]}}),a(M,{when:!0,get children(){return a(Qd,{nestLevel:1,page:1,get variables(){return c()}})}})]}})}}),a(M,{get when(){return i()==="mal"},get children(){return a(W,{get children(){return[a(M,{get when(){return s()==="anime"},get children(){return a(xl,{nestLevel:1,type:"anime",page:1,get variables(){return c()}})}}),a(M,{get when(){return s()==="manga"},get children(){return a(xl,{nestLevel:1,type:"manga",page:1,get variables(){return c()}})}})]}})}})]}})),u}})]}function T1(){jv()()}function Qd(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Ol(),[r,l]=O(void 0),[i]=de.anilist.searchMediaCache(t,n,e.page),[s]=de.anilist.searchMedia(t,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O();return q(oe(i,h=>h&&c(h.data.media))),q(oe(s,h=>h&&c(h.data.media))),a($n,{onIntersection:()=>l(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a(Tl,{get data(){return o()}})},get loading(){return e.loading},children:h=>[a(Tl,{get data(){return o()}}),a(x,{get when(){return s().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return s().data.media},get keyed(){return e.nestLevel===1},get children(){return a(x,{get when(){return e.variables},children:u=>a(x,{when:h===!1,fallback:"Fetch cooldown",get children(){return a(Qd,{get variables(){return u()},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function Al(e){const t=Oe({groupCards:!0},e);F(t.page,"page is missing"),F(t.extraVariables,"extraVariables is missing");const{accessToken:n}=ie(),[r,l]=O(void 0),[i]=de.anilist.searchMedia(n,()=>t.variables,t.page,()=>t.extraVariables);return q(oe(i,s=>{s!=null&&s.data.pageInfo.hasNextPage&&l(t.variables)})),a(x,{get when(){return i()},get children(){return[a(x,{get when(){return N(()=>!!t.title)()&&i().data.media.length},get children(){var s=Cl(),o=s.firstChild;return d(o,()=>t.title),s}}),a(W,{get children(){return[a(M,{get when(){return t.groupCards},get children(){return a(I1,{get data(){return i().data.media},get lastFormat(){return t.previousFormat||"Unknown format"}})}}),a(M,{get when(){return t.groupCards===!1},get children(){return a(Tl,{get data(){return i().data.media}})}})]}}),a(x,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(Al,{get variables(){return r()},get extraVariables(){return t.extraVariables},get page(){return t.page+1},get previousFormat(){var s;return((s=i().data.media.at(-1))==null?void 0:s.format)||"Unknown format"}})}})]}})}const Co=new Set;function xl(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Ol(),[r,l]=O(void 0),[i]=de.myAnimeList.mediaSearchCache(e.type,n,e.page),[s]=de.myAnimeList.mediaSearch(e.type,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O(),h=N(m=>{var $;const y=new Set;($=o())==null||$.forEach(S=>y.add(S.mal_id));const v=[...y.difference(Co)];return v.length?(v.forEach(S=>Co.add(S)),v):m||[]}),f=Me(tn,t,()=>({idMal_in:h(),type:e.type.toUpperCase()})),[g]=nt(f);return q(oe(g,m=>{var v;if(!((v=m==null?void 0:m.data)!=null&&v.length))return;const y=Object.fromEntries(Object.values(m.data).map($=>[$.idMal,$]));Mf(y)})),q(oe(i,m=>m&&c(m.data.data))),q(oe(s,m=>m&&c(m.data.data))),a($n,{rootMargin:"200px",onIntersection:()=>l(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a(Ao,{get data(){return o()}})},get loading(){return e.loading},children:m=>[a(Ao,{get data(){return o()}}),a(x,{get when(){return s().data.pagination.has_next_page},get children(){return a(x,{get when(){return s().data.data},get keyed(){return e.nestLevel===1},get children(){return a(x,{get when(){return e.variables},children:y=>a(x,{when:m===!1,fallback:"Fetch cooldown",get children(){return a(xl,{get variables(){return y()},get type(){return e.type},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function Ao(e){const t=ne();return a(H,{get each(){return e.data},children:n=>a(kl,{media:n,get type(){return t.type}})})}function I1(e){return[a(x,{get when(){return e.data[0]&&e.lastFormat!==e.data[0].format},get children(){var t=Cl(),n=t.firstChild;return d(n,()=>Ir(e.data[0].format)||"Unknown format"),t}}),a(H,{get each(){return e.data},children:(t,n)=>[a(x,{get when(){return N(()=>n()>0)()&&e.data[n()-1].format!==t.format},get children(){var r=Cl(),l=r.firstChild;return d(l,()=>Ir(t.format)),r}}),a($i,{media:t})]})]}function Tl(e){return a(H,{get each(){return e.data},children:t=>a($i,{media:t})})}$e(["input","click"]);var E1=p("<div data-k-f58f9d48>Error user not found"),L1=p("<img data-k-f58f9d48 class=banner alt=Banner>"),P1=p("<button data-k-f58f9d48>"),M1=p("<span data-k-f58f9d48 class=user-profile-following-badge>Follows you"),D1=p("<div data-k-f58f9d48 class=user-page><div data-k-f58f9d48 class=profile-banner-container><div data-k-f58f9d48 class=user-profile-container><img data-k-f58f9d48 class=profile alt=Profile><div data-k-f58f9d48 class=content><h2 data-k-f58f9d48><a data-k-f58f9d48 target=_blank></a></h2><p data-k-f58f9d48>Joined <! data-k-f58f9d48> (<! data-k-f58f9d48> days)</p></div></div></div><nav data-k-f58f9d48 class=profile-navigation><ul data-k-f58f9d48><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48>"),R1=p("<div data-k-f58f9d48 class=banner>");function N1(e){const t=ne(),{accessToken:n}=ie(),[r,{mutateCache:l}]=de.anilist.userByName(()=>t.name,n),i=s=>{l(o=>(o.data.isFollowing=s,r().data.isFollowing=s,o))};return q(oe(r,s=>{s&&(document.title=`${s.data.name} profile - LOB`)})),a(wc.Provider,{value:{user:()=>r().data,following:i},get children(){return a(W,{get children(){return[a(M,{get when(){return N(()=>{var s;return!!((s=r())!=null&&s.data)})()&&(!r.loading||r().data.name===t.name)},get children(){return a(O1,{get children(){return e.children}})}}),a(M,{get when(){var s;return(s=r())==null?void 0:s.error},get children(){return E1()}})]}})}})}function O1(e){const{user:t,following:n}=tt(),{authUserData:r,accessToken:l}=ie(),[i,s]=O(t().isFollowing);return q(()=>{s(t().isFollowing)}),(()=>{var o=D1(),c=o.firstChild,h=c.firstChild,u=h.firstChild,f=u.nextSibling,g=f.firstChild,m=g.firstChild,y=g.nextSibling,v=y.firstChild,$=v.nextSibling,S=$.nextSibling,C=S.nextSibling;C.nextSibling;var w=c.nextSibling,b=w.firstChild,A=b.firstChild,k=A.nextSibling,_=k.nextSibling,T=_.nextSibling,I=T.nextSibling,E=I.nextSibling;return d(c,a(x,{get when(){return t().bannerImage},get fallback(){return R1()},get children(){var P=L1();return L(()=>G(P,"src",t().bannerImage)),P}}),h),d(f,a(x,{get when(){var P;return t().id!==((P=r())==null?void 0:P.data.id)},get children(){var P=P1();return P.$$click=async()=>{s(U=>!U);const R=await de.anilist.toggleFollow(l(),t().id);R.status===200?n(R.data.isFollowing):s(t().isFollowing)},d(P,a(x,{get when(){return i()},fallback:"Follow",children:"Following"})),P}}),g),d(m,()=>t().name),d(g,a(x,{get when(){return t().isFollower},get children(){return M1()}}),null),d(y,()=>vd(t().createdAt*1e3),$),d(y,()=>Math.floor((new Date-t().createdAt*1e3)/1e3/60/60/24),C),d(A,a(B,{href:"",children:"Overview"})),d(k,a(B,{href:"anime",children:"Anime list"})),d(_,a(B,{href:"manga",children:"Manga list"})),d(T,a(B,{href:"favourites",children:"Favourites"})),d(I,a(B,{href:"stats",children:"Stats"})),d(E,a(B,{href:"socials",children:"Socials"})),d(o,()=>e.children,null),L(P=>{var R=t().options.profileColor,U=t().avatar.large,V="https://anilist.co/user/"+t().name;return R!==P.e&&((P.e=R)!=null?o.style.setProperty("--user-color",R):o.style.removeProperty("--user-color")),U!==P.t&&G(u,"src",P.t=U),V!==P.a&&G(m,"href",P.a=V),P},{e:void 0,t:void 0,a:void 0}),o})()}$e(["click"]);var F1=p("<p data-k-fa035f06 class=time>");function Ji(e){const t=ne();return(()=>{var n=F1();return d(n,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[a(x,{get when(){return Math.floor(e.stats.minutesWatched/60/24)},children:r=>[N(()=>ye(r()))," day",N(()=>Ne(r()))," "]}),a(x,{get when(){return Math.floor(e.stats.minutesWatched/60%24)},children:r=>[N(()=>ye(r()))," hour",N(()=>Ne(r()))," "]}),a(x,{get when(){return e.stats.minutesWatched<60},get children(){return[N(()=>e.stats.minutesWatched)," minute",N(()=>Ne(e.stats.minutesWatched))]}})]}}),a(M,{get when(){return t.type==="manga"},get children(){return["Chapters read ",N(()=>ye(e.stats.chaptersRead))]}})]}})),n})()}var U1=p("<section data-k-9dc7c2b9 class=user-profile-stats-formats><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Format distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Status distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Country distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler>"),Xi=p("<li data-k-9dc7c2b9><div data-k-9dc7c2b9><div data-k-9dc7c2b9 class=container><p data-k-9dc7c2b9></p></div></div><div data-k-9dc7c2b9 class=right><p data-k-9dc7c2b9>%</p><p data-k-9dc7c2b9>/");function B1(e){const[t,n]=O(),r=ne(),{user:l}=tt();return q(()=>{n(e.formats.reduce((i,s)=>i+s.count,0))}),(()=>{var i=U1(),s=i.firstChild,o=s.firstChild,c=o.nextSibling,h=s.nextSibling,u=h.firstChild,f=u.nextSibling,g=h.nextSibling,m=g.firstChild,y=m.nextSibling;return d(c,a(H,{get each(){return e.formats},children:v=>(()=>{var $=Xi(),S=$.firstChild,C=S.firstChild,w=C.firstChild,b=S.nextSibling,A=b.firstChild,k=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,a(B,{class:"title",get href(){return"/user/"+l().name+"/"+r.type+"/?format="+v.format},get children(){return Ir(v.format)}}),w),d(w,()=>v.meanScore||""),d(S,a(Ji,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),k),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),d(f,a(H,{get each(){return e.statuses},children:v=>(()=>{var $=Xi(),S=$.firstChild,C=S.firstChild,w=C.firstChild,b=S.nextSibling,A=b.firstChild,k=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,a(B,{class:"title",get href(){return"/user/"+l().name+"/"+r.type+"?userStatus="+v.status},get children(){return a(W,{get fallback(){return Ke(v.status)},get children(){return[a(M,{get when(){return v.status==="CURRENT"},get children(){return a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})}}),a(M,{get when(){return v.status==="REPEATING"},get children(){return a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})}})]}})}}),w),d(w,()=>v.meanScore||""),d(S,a(Ji,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),k),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),d(y,a(H,{get each(){return e.countries},children:v=>(()=>{var $=Xi(),S=$.firstChild,C=S.firstChild,w=C.firstChild,b=S.nextSibling,A=b.firstChild,k=A.firstChild,_=A.nextSibling,T=_.firstChild;return d(C,a(B,{class:"title",get href(){return"/user/"+l().name+"/"+r.type+"?countryOfOrigin="+v.country},get children(){return Uf(v.country)}}),w),d(w,()=>v.meanScore||""),d(S,a(Ji,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),k),d(_,()=>ye(v.count),T),d(_,t,null),$})()})),i})()}var V1=p("<div data-k-9dd95ab0 class=scroll-line-chart>"),G1=p("<div data-k-9dd95ab0 class=scroll-bar-chart>");function H1(e){let t=0,n=0,r=NaN,l;return(()=>{var i=V1();i.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,l.style.userSelect="none",l.scrollTo(n-c,0)}else{l.style.userSelect=null,t=o.clientX,n=l.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const h=(u,f,g)=>{Math.abs(g)<.5||(l.scrollBy(-g*2,0),requestAnimationFrame(m=>h(u,m,g*(f-u<200?.99:.95))))};requestAnimationFrame(u=>h(u,u,c))}}};var s=l;return typeof s=="function"?ge(s,i):l=i,d(i,()=>e.children),i})()}function eu(e){let t=0,n=0,r=NaN,l;return(()=>{var i=G1();i.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,l.style.userSelect="none",l.scrollTo(n-c,0)}else{l.style.userSelect=null,t=o.clientX,n=l.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const h=(u,f,g)=>{Math.abs(g)<.5||(l.scrollBy(-g*2,0),requestAnimationFrame(m=>h(u,m,g*(f-u<200?.99:.95))))};requestAnimationFrame(u=>h(u,u,c))}}};var s=l;return typeof s=="function"?ge(s,i):l=i,d(i,()=>e.children),i})()}$e(["mousemove"]);var Y1=p("<button data-k-3e65cd93>Hours Watched"),j1=p("<button data-k-3e65cd93>Chapters Read"),z1=p("<ol data-k-3e65cd93>"),W1=p("<section data-k-3e65cd93><div data-k-3e65cd93 class=flex-space-between><h2 data-k-3e65cd93>Score distributions</h2><div data-k-3e65cd93><button data-k-3e65cd93>"),q1=p("<li data-k-3e65cd93><p data-k-3e65cd93></p><div data-k-3e65cd93></div><p data-k-3e65cd93>");function K1(e){const t=ne(),[n,r]=O("count"),[l,i]=O(0);return q(()=>{const s=e.data.reduce((o,c)=>Math.max(o,c[n()]),0);i(s)}),(()=>{var s=W1(),o=s.firstChild,c=o.firstChild,h=c.nextSibling,u=h.firstChild;return u.$$click=()=>r("count"),d(u,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(h,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var f=Y1();return f.$$click=()=>r("minutesWatched"),f}}),a(M,{get when(){return t.type==="manga"},get children(){var f=j1();return f.$$click=()=>r("chaptersRead"),f}})]}}),null),d(s,a(eu,{get children(){var f=z1();return d(f,a(H,{get each(){return e.data},children:g=>(()=>{var m=q1(),y=m.firstChild,v=y.nextSibling,$=v.nextSibling;return d(y,()=>g.score),d($,a(x,{get when(){return n()==="minutesWatched"},get fallback(){return ye(g[n()])},get children(){return ye(Math.ceil(g[n()]/60))}})),L(S=>(S=`${g[n()]/l()*85}%`)!=null?v.style.setProperty("height",S):v.style.removeProperty("height")),m})()})),f}}),null),s})()}$e(["click"]);var J1=p("<button data-k-d05f0288>Hours Watched"),X1=p("<button data-k-d05f0288>Chapters Read"),Z1=p("<div data-k-d05f0288><button data-k-d05f0288></button><button data-k-d05f0288>Mean Score");function Rr(e){const t=ne();return(()=>{var n=Z1(),r=n.firstChild,l=r.nextSibling;return r.$$click=()=>e.setState("count"),d(r,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(n,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var i=J1();return i.$$click=()=>e.setState("minutesWatched"),i}}),a(M,{get when(){return t.type==="manga"},get children(){var i=X1();return i.$$click=()=>e.setState("chaptersRead"),i}})]}}),l),l.$$click=()=>e.setState("meanScore"),n})()}$e(["click"]);var Q1=p("<ol data-k-614cd53d>"),e_=p("<section data-k-614cd53d><div data-k-614cd53d class=flex-space-between><h2 data-k-614cd53d>Episode count"),t_=p("<li data-k-614cd53d><p data-k-614cd53d class=no-wrap></p><div data-k-614cd53d></div><p data-k-614cd53d>");function n_(e){const[t,n]=O("count"),[r,l]=O(0);return q(()=>{const i=e.data.reduce((s,o)=>Math.max(s,o[t()]),0);l(i)}),(()=>{var i=e_(),s=i.firstChild;return s.firstChild,d(s,a(Rr,{setState:n}),null),d(i,a(eu,{get children(){var o=Q1();return d(o,a(H,{get each(){return e.data},children:c=>(()=>{var h=t_(),u=h.firstChild,f=u.nextSibling,g=f.nextSibling;return d(u,()=>c.length||"Unknown"),d(g,a(x,{get when(){return t()==="minutesWatched"},get fallback(){return ye(c[t()])},get children(){return ye(Math.ceil(c[t()]/60))}})),L(m=>(m=`${c[t()]/r()*85}%`)!=null?f.style.setProperty("height",m):f.style.removeProperty("height")),h})()})),o}}),null),i})()}function r_(e){var l;const[t,n]=O(((l=e())==null?void 0:l.getBoundingClientRect().width)||0),r=()=>{var i;n(((i=e())==null?void 0:i.getBoundingClientRect().width)||0)};return q(oe(e,r)),window.addEventListener("resize",r),ze(()=>{window.removeEventListener("resize",r)}),t}var a_=p("<svg data-k-ecb119dc><path data-k-ecb119dc stroke=none stroke-width=0 fill=var(--background-350)></path><rect data-k-ecb119dc x=0 width=100% height=60 fill=var(--background-300) stroke=none pointer-events=all></rect><path data-k-ecb119dc stroke=black stroke-width=5 fill=transparent>"),i_=p("<section data-k-ecb119dc class=no-motion><div data-k-ecb119dc class=flex-space-between><h2 data-k-ecb119dc>"),l_=p("<svg data-k-ecb119dc><g data-k-ecb119dc class=item><rect data-k-ecb119dc y=0 height=100% fill=none stroke=none pointer-events=all></rect><circle data-k-ecb119dc r=6 pointer-events=none></circle><text data-k-ecb119dc fill=currentColor class=text y=0 text-anchor=middle></text><text data-k-ecb119dc fill=currentColor class=year y=304 text-anchor=middle></svg>",!1,!0,!1);function xo(e){let t;const[n,r]=O(0),l=r_(()=>t),[i,s]=O("count"),o=32,c=64,h=60,u=()=>Math.max(50,l()/e.data.length),f=v=>o+v*u(),g=v=>Math.ceil((1-v/n())*200+c);q(()=>{const v=e.data.reduce(($,S)=>Math.max($,S[i()]),0);r(v)}),q(oe(l,()=>{t==null||t.classList.add("no-motion"),setTimeout(()=>{t==null||t.classList.remove("no-motion")},100)}));const m=N(()=>e.data.map(($,S,C)=>S===0?"M"+f(S)+" "+g($[i()]):S<C.length-1?"S"+xa(f(S),f(S-1),.35)+" "+xa(g($[i()]),g($[i()])+(g(C[S-1][i()])-g(C[S+1][i()]))/2,.35)+","+f(S)+" "+g($[i()]):"S"+xa(f(S),f(S-1),.35)+" "+xa(g($[i()]),g(C[S-1][i()]),.35)+","+f(S)+" "+g($[i()])).join("")),y=N(()=>m()+"L"+f(e.data.length-1)+" "+g(0)+h+"L"+o+" "+g(0)+h);return a(x,{get when(){return e.data.length},get children(){var v=i_(),$=v.firstChild,S=$.firstChild,C=t;return typeof C=="function"?ge(C,v):t=v,d(S,()=>e.heading),d($,a(Rr,{setState:s}),null),d(v,a(H1,{get children(){var w=a_(),b=w.firstChild,A=b.nextSibling,k=A.nextSibling;return d(w,a(H,{get each(){return e.data},children:(_,T)=>(()=>{var I=l_(),E=I.firstChild,P=E.nextSibling,R=P.nextSibling,U=R.nextSibling;return d(R,a(x,{get when(){return i()==="minutesWatched"},get fallback(){return ye(_[i()])},get children(){return ye(Math.ceil(_[i()]/60))}})),d(U,()=>_.releaseYear||_.startYear),L(V=>{var X=f(T())-u()/2,Y=u(),K=f(T()),le=g(_[i()]),re=f(T()),Q=`0 ${g(_[i()])-10}px`,J=f(T());return X!==V.e&&G(E,"x",V.e=X),Y!==V.t&&G(E,"width",V.t=Y),K!==V.a&&G(P,"cx",V.a=K),le!==V.o&&G(P,"cy",V.o=le),re!==V.i&&G(R,"x",V.i=re),Q!==V.n&&((V.n=Q)!=null?R.style.setProperty("translate",Q):R.style.removeProperty("translate")),J!==V.s&&G(U,"x",V.s=J),V},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),I})()}),null),L(_=>{var T=f(e.data.length-1)+o,I=g(0)+h,E=y(),P=g(0),R=m();return T!==_.e&&G(w,"width",_.e=T),I!==_.t&&G(w,"height",_.t=I),E!==_.a&&G(b,"d",_.a=E),P!==_.o&&G(A,"y",_.o=P),R!==_.i&&G(k,"d",_.i=R),_},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),w}}),null),v}})}var s_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"><path data-k-c7f2c6bd fill=currentColor d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z">'),o_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">'),c_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">'),d_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z">'),u_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">'),h_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path data-k-c7f2c6bd fill=currentColor d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">'),g_=p('<section data-k-c7f2c6bd class=user-profile-stats-header-section><ul data-k-c7f2c6bd class=user-profile-stats-general-header><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Total </p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Mean score</p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Standard Deviation');function f_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeStats(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(tu,{get stats(){return n().data}})}})}function m_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userMangaStats(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(tu,{get stats(){return n().data}})}})}function tu(e){const t=ne(),{user:n}=tt();return[(()=>{var r=g_(),l=r.firstChild,i=l.firstChild,s=i.firstChild,o=s.nextSibling,c=o.firstChild,h=c.nextSibling;h.firstChild;var u=i.nextSibling,f=u.firstChild,g=f.nextSibling,m=g.firstChild,y=m.nextSibling,v=u.nextSibling,$=v.firstChild,S=$.nextSibling,C=S.firstChild,w=C.nextSibling,b=v.nextSibling,A=b.firstChild,k=A.nextSibling,_=k.firstChild,T=_.nextSibling,I=b.nextSibling,E=I.firstChild,P=E.nextSibling,R=P.firstChild,U=I.nextSibling,V=U.firstChild,X=V.nextSibling,Y=X.firstChild;return d(s,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return s_()}}),a(M,{get when(){return t.type==="manga"},get children(){return o_()}})]}})),d(c,()=>ye(n().statistics[t.type].count||0)),d(h,()=>t.type,null),d(f,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return c_()}}),a(M,{get when(){return t.type==="manga"},get children(){return d_()}})]}})),d(m,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return ye(n().statistics.anime.episodesWatched||0)}}),a(M,{get when(){return t.type==="manga"},get children(){return ye(n().statistics.manga.chaptersRead||0)}})]}})),d(y,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Episodes watched"}),a(M,{get when(){return t.type==="manga"},children:"Chapters read"})]}})),d($,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return u_()}}),a(M,{get when(){return t.type==="manga"},get children(){return h_()}})]}})),d(C,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return((n().statistics.anime.minutesWatched||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){return n().statistics.manga.volumesRead||0}})]}})),d(w,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days watched"}),a(M,{get when(){return t.type==="manga"},children:"Volumes read"})]}})),d(_,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var K;return((((K=e.stats.statuses.find(le=>le.status==="PLANNING"))==null?void 0:K.minutesWatched)||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){var K;return((K=e.stats.statuses.find(le=>le.status==="PLANNING"))==null?void 0:K.chaptersRead)||0}})]}})),d(T,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days planned"}),a(M,{get when(){return t.type==="manga"},children:"Chapters planned"})]}})),d(R,()=>(n().statistics[t.type].meanScore||0).toFixed(2)),d(Y,()=>(n().statistics[t.type].standardDeviation||0).toFixed(1)),r})(),a(K1,{get data(){return e.stats.scores.sort((r,l)=>r.score-l.score)}}),a(n_,{get data(){return e.stats.lengths.sort((r,l)=>(parseInt(r.length)||1/0)-(parseInt(l.length)||1/0))}}),a(B1,{get formats(){return e.stats.formats},get statuses(){return e.stats.statuses},get countries(){return e.stats.countries}}),a(xo,{heading:"Release year",get data(){return e.stats.releaseYears.sort((r,l)=>r.releaseYear-l.releaseYear)}}),a(xo,{heading:"Watch year",get data(){return e.stats.startYears.sort((r,l)=>r.startYear-l.startYear)}})]}var To=p("<p data-k-3a6faa9d class=value>"),p_=p("<p data-k-3a6faa9d class=title>Time watched"),v_=p("<p data-k-3a6faa9d class=title>Chapters read"),$_=p("<ol data-k-3a6faa9d class=flex-space-between><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Count</p></li><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Mean score</p></li><li data-k-3a6faa9d>");function __(e){const t=ne();return(()=>{var n=$_(),r=n.firstChild,l=r.firstChild,i=r.nextSibling,s=i.firstChild,o=i.nextSibling;return d(l,()=>ye(e.genre.count||0)),d(s,()=>e.genre.meanScore||0),d(o,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var c=To();return d(c,a(x,{get when(){return Math.floor(e.genre.minutesWatched/60/24)},children:h=>[N(()=>ye(h()))," day",N(()=>Ne(h()))," "]}),null),d(c,a(x,{get when(){return Math.floor(e.genre.minutesWatched/60%24)},children:h=>[N(()=>ye(h()))," hour",N(()=>Ne(h()))," "]}),null),d(c,a(x,{get when(){return e.genre.minutesWatched<60},get children(){return[N(()=>e.genre.minutesWatched)," minute",N(()=>Ne(e.genre.minutesWatched))]}}),null),c})(),p_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var c=To();return d(c,()=>ye(e.genre.chaptersRead)),c})(),v_()]}})]}})),n})()}var b_=p("<div data-k-ac00d55b class=inline-container><ol data-k-ac00d55b class=grid-reel-auto-fill>"),y_=p('<img data-k-ac00d55b class=cover-image alt="Media cover">'),w_=p("<li data-k-ac00d55b>"),k_=p("<div data-k-ac00d55b class=cover-image>");function S_(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),s=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(s);let c=!1;return q(oe(()=>e.mediaIds,()=>{c=!0})),q(oe(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=b_(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),l(g)}),d(u,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=w_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Je(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(x,{get when(){return e.store[f]},get fallback(){return k_()},get children(){var m=y_();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}var C_=p("<ol data-k-28186292 class=grid-column-auto-fill>"),A_=p("<li data-k-28186292 class=item><div data-k-28186292 class=header><div data-k-28186292 class=flex-space-between><h2 data-k-28186292></h2><p data-k-28186292 class=ranking>#</p></div></div><div data-k-28186292 class=wrapper><div data-k-28186292 class=flex-space-between><p data-k-28186292>User ");function x_(e){const t=ne(),{user:n}=tt();return(()=>{var r=C_();return d(r,a(H,{get each(){return e.genres.sort((l,i)=>i[e.state()]-l[e.state()]||l.genre.localeCompare(i.genre))},children:(l,i)=>(()=>{var s=A_(),o=s.firstChild,c=o.firstChild,h=c.firstChild,u=h.nextSibling;u.firstChild;var f=o.nextSibling,g=f.firstChild,m=g.firstChild;return m.firstChild,d(h,a(B,{get href(){return"/search/"+t.type+"?onList=false&genre="+l.genre},get children(){return l.genre}})),d(u,()=>i()+1,null),d(o,a(__,{genre:l}),null),d(m,()=>t.type,null),d(g,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?genre="+l.genre},children:"Show all"}),null),d(f,a(S_,{get store(){return e.store},get setStore(){return e.setStore},get mediaIds(){return l.mediaIds},get allMediaIds(){return e.mediaIds()},get mutate(){return e.mutate}}),null),s})()})),r})()}var T_=p("<section data-k-c1e76fe3 class=user-profile-stats-genres><div data-k-c1e76fe3 class=flex-space-between><h2 data-k-c1e76fe3>Genres");function I_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeGenres(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(nu,{get genres(){return n().data}})}})}function E_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userMangaGenres(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(nu,{get genres(){return n().data}})}})}function nu(e){const{accessToken:t}=ie(),[n,r]=O(new Set),[l,i]=O("count"),o=Me(tn,t,()=>({id_in:[...n()]})),[c,{mutate:h}]=nt(o),[u,f]=We({});return q(oe(()=>e.genres,g=>{r(m=>{const y=new Set(g.map(v=>v.mediaIds.slice(0,6)).flat());return y.difference(m).size?y:m})})),q(oe(c,g=>{g==null||g.data.forEach(m=>f(m.id,m))})),(()=>{var g=T_(),m=g.firstChild;return m.firstChild,d(m,a(Rr,{setState:i}),null),d(g,a(x_,{get genres(){return e.genres},state:l,store:u,setStore:f,mediaIds:n,mutate:h}),null),g})()}var L_=p("<section data-k-c5aa48c0 class=user-profile-stats-genres><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0>Tags</h2></div><ol data-k-c5aa48c0 class=grid-column-auto-fill>"),Io=p("<p data-k-c5aa48c0 class=value>"),P_=p("<p data-k-c5aa48c0 class=title>Time watched"),M_=p("<p data-k-c5aa48c0 class=title>Chapters read"),D_=p('<li data-k-c5aa48c0 class=item><div data-k-c5aa48c0 class=header><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0></h2><p data-k-c5aa48c0 class=ranking>#</p></div><ol data-k-c5aa48c0 class=flex-space-between><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Count</p></li><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Mean score</p></li><li data-k-c5aa48c0></li></ol></div><div data-k-c5aa48c0 class="wrapper tags"><div data-k-c5aa48c0 class=flex-space-between><p data-k-c5aa48c0>User '),R_=p("<div data-k-c5aa48c0 class=inline-container><ol data-k-c5aa48c0 class=grid-reel-auto-fill>"),N_=p('<img data-k-c5aa48c0 class=cover-image alt="Media cover">'),O_=p("<li data-k-c5aa48c0>"),F_=p("<div data-k-c5aa48c0 class=cover-image> ");function U_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeTags(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(ru,{get genres(){return n().data}})}})}function B_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userMangaTags(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(ru,{get genres(){return n().data}})}})}function ru(e){const t=ne(),{user:n}=tt(),{accessToken:r}=ie(),[l,i]=O(new Set),[s,o]=O("count"),c=Me(tn,r,()=>({id_in:[...l()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(oe(()=>e.genres,m=>{i(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(oe(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=L_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Rr,{setState:o}),null),d(v,a(H,{get each(){return e.genres.sort(($,S)=>S[s()]-$[s()]||$.tag.name.localeCompare(S.tag.name))},children:($,S)=>(()=>{var C=D_(),w=C.firstChild,b=w.firstChild,A=b.firstChild,k=A.nextSibling;k.firstChild;var _=b.nextSibling,T=_.firstChild,I=T.firstChild,E=T.nextSibling,P=E.firstChild,R=E.nextSibling,U=w.nextSibling,V=U.firstChild,X=V.firstChild;return X.firstChild,d(A,a(B,{get href(){return"/search/"+t.type+"?onList=false&tag="+$.tag.name},get children(){return $.tag.name}})),d(k,()=>S()+1,null),d(I,()=>ye($.count||0)),d(P,()=>$.meanScore||0),d(R,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Y=Io();return d(Y,a(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(Y,a(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(Y,a(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),Y})(),P_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Y=Io();return d(Y,()=>ye($.chaptersRead)),Y})(),M_()]}})]}})),d(X,()=>t.type,null),d(V,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?tag="+$.tag.name},children:"Show all"}),null),d(U,a(V_,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return l()},mutate:u}),null),C})()})),m})()}function V_(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),i=Me(tn,n,()=>({id_in:[...r()]})),[s]=nt(i);let o=!1;return q(oe(()=>e.mediaIds,()=>{o=!0})),q(oe(s,c=>{c==null||c.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var c=R_(),h=c.firstChild;return h.addEventListener("scroll",()=>{if(!o)return;o=!1;const f=new Set(e.mediaIds).difference(e.allMediaIds);f.forEach(g=>e.allMediaIds.add(g)),l(f)}),d(h,a(H,{get each(){return e.mediaIds},children:u=>(()=>{var f=O_();return d(f,a(B,{get href(){var g;return"/ani/"+t.type+"/"+u+"/"+Je(((g=e.store[u])==null?void 0:g.title.userPreferred)||"")},get children(){return a(x,{get when(){return e.store[u]},get fallback(){return F_()},get children(){var g=N_();return L(()=>G(g,"src",e.store[u].coverImage.large)),g}})}})),f})()})),c})()}var G_=p("<section data-k-306b0b72 class=user-profile-stats-genres><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72>Studios</h2></div><ol data-k-306b0b72 class=grid-column-auto-fill>"),Eo=p("<p data-k-306b0b72 class=value>"),H_=p("<p data-k-306b0b72 class=title>Time watched"),Y_=p("<p data-k-306b0b72 class=title>Chapters read"),j_=p('<li data-k-306b0b72 class=item><div data-k-306b0b72 class=header><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72></h2><p data-k-306b0b72 class=ranking>#</p></div><ol data-k-306b0b72 class=flex-space-between><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Count</p></li><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Mean score</p></li><li data-k-306b0b72></li></ol></div><div data-k-306b0b72 class="wrapper tags">'),z_=p("<div data-k-306b0b72 class=inline-container><ol data-k-306b0b72 class=grid-reel-auto-fill>"),W_=p('<img data-k-306b0b72 class=cover-image alt="Media cover">'),q_=p("<li data-k-306b0b72>"),K_=p("<div data-k-306b0b72 class=cover-image> ");function J_(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeStudios(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(X_,{get genres(){return n().data}})}})}function X_(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),[i,s]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(oe(()=>e.genres,m=>{l(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(oe(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=G_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Rr,{setState:s}),null),d(v,a(H,{get each(){return e.genres.sort(($,S)=>S[i()]-$[i()]||$.studio.name.localeCompare(S.studio.name))},children:($,S)=>(()=>{var C=j_(),w=C.firstChild,b=w.firstChild,A=b.firstChild,k=A.nextSibling;k.firstChild;var _=b.nextSibling,T=_.firstChild,I=T.firstChild,E=T.nextSibling,P=E.firstChild,R=E.nextSibling,U=w.nextSibling;return d(A,a(B,{get href(){return"/ani/studio/"+$.studio.id+"/"+Je($.studio.name)},get children(){return $.studio.name}})),d(k,()=>S()+1,null),d(I,()=>ye($.count||0)),d(P,()=>$.meanScore||0),d(R,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var V=Eo();return d(V,a(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:X=>[N(()=>ye(X()))," day",N(()=>Ne(X()))," "]}),null),d(V,a(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:X=>[N(()=>ye(X()))," hour",N(()=>Ne(X()))," "]}),null),d(V,a(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),V})(),H_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var V=Eo();return d(V,()=>ye($.chaptersRead)),V})(),Y_()]}})]}})),d(U,a(Z_,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:u})),C})()})),m})()}function Z_(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),s=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(s);let c=!1;return q(oe(()=>e.mediaIds,()=>{c=!0})),q(oe(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=z_(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),l(g)}),d(u,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=q_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Je(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(x,{get when(){return e.store[f]},get fallback(){return K_()},get children(){var m=W_();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}var Q_=p("<button data-k-8711eb31>Time Watched"),eb=p("<button data-k-8711eb31>Chapters Read"),tb=p('<section data-k-8711eb31 class=user-profile-stats-genres><div data-k-8711eb31 class=flex-space-between><h2 data-k-8711eb31>Voice actors</h2><div data-k-8711eb31><button data-k-8711eb31>Anime</button><button data-k-8711eb31>Characters</button></div><div data-k-8711eb31><button data-k-8711eb31>Count</button><button data-k-8711eb31>Mean Score</button></div></div><ol data-k-8711eb31 class="grid-column-auto-fill staff">'),Lo=p("<p data-k-8711eb31 class=value>"),nb=p("<p data-k-8711eb31 class=title>Time watched"),rb=p("<p data-k-8711eb31 class=title>Chapters read"),ab=p('<li data-k-8711eb31 class=item><div data-k-8711eb31 class="flex-space-between staff-name-wrapper"><h2 data-k-8711eb31></h2><p data-k-8711eb31 class=ranking>#</p></div><div data-k-8711eb31 class=inline-container><div data-k-8711eb31 class=main-content><img data-k-8711eb31 class=staff-cover alt="Staff profile cover"><ol data-k-8711eb31 class="flex-space-between stats"><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Count</p></li><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Mean score</p></li><li data-k-8711eb31></li></ol><div data-k-8711eb31 class=wrapper>'),ib=p("<div data-k-8711eb31 class=inline-container><ol data-k-8711eb31 class=grid-reel-auto-fill>"),lb=p('<img data-k-8711eb31 class=cover-image alt="Media cover">'),Po=p("<li data-k-8711eb31>"),Mo=p("<div data-k-8711eb31 class=cover-image> "),sb=p('<img data-k-8711eb31 class=cover-image alt="Character cover">');function ob(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeVoiceActors(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(cb,{get genres(){return n().data}})}})}function cb(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),[i,s]=O(new Set),[o,c]=O("count"),[h,u]=O("media"),g=Me(tn,n,()=>h()==="media"?{id_in:[...r()]}:void 0),[m]=nt(g),[y]=de.anilist.characterIds(()=>i().size>0&&h()==="characters"?[...i()]:void 0,n),[v,$]=We({}),[S,C]=We({});return q(oe(()=>e.genres,w=>{l(b=>{const A=new Set(w.map(k=>k.mediaIds.slice(0,6)).flat());return A.difference(b).size?A:b}),s(new Set(w.map(b=>b.characterIds.slice(0,6)).flat()))})),q(oe(m,w=>{w==null||w.data.forEach(b=>$(b.id,b))})),q(oe(y,w=>{w==null||w.data.forEach(b=>C(b.id,b))})),(()=>{var w=tb(),b=w.firstChild,A=b.firstChild,k=A.nextSibling,_=k.firstChild,T=_.nextSibling,I=k.nextSibling,E=I.firstChild,P=E.nextSibling,R=b.nextSibling;return _.$$click=()=>u("media"),T.$$click=()=>u("characters"),E.$$click=()=>c("count"),d(I,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var U=Q_();return U.$$click=()=>c("minutesWatched"),U}}),a(M,{get when(){return t.type==="manga"},get children(){var U=eb();return U.$$click=()=>c("chaptersRead"),U}})]}}),P),P.$$click=()=>c("meanScore"),d(R,a(H,{get each(){return e.genres.sort((U,V)=>V[o()]-U[o()]||U.voiceActor.name.userPreferred.localeCompare(V.voiceActor.name.userPreferred))},children:(U,V)=>(()=>{var X=ab(),Y=X.firstChild,K=Y.firstChild,le=K.nextSibling;le.firstChild;var re=Y.nextSibling,Q=re.firstChild,J=Q.firstChild,pe=J.nextSibling,ve=pe.firstChild,fe=ve.firstChild,ee=ve.nextSibling,z=ee.firstChild,Ge=ee.nextSibling,De=pe.nextSibling;return d(K,a(B,{get href(){return"/ani/staff/"+U.voiceActor.id+"/"+Je(U.voiceActor.name.userPreferred)},get children(){return U.voiceActor.name.userPreferred}})),d(le,()=>V()+1,null),d(fe,()=>ye(U.count||0)),d(z,()=>U.meanScore||0),d(Ge,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Fe=Lo();return d(Fe,a(x,{get when(){return Math.floor(U.minutesWatched/60/24)},children:et=>[N(()=>ye(et()))," day",N(()=>Ne(et()))," "]}),null),d(Fe,a(x,{get when(){return Math.floor(U.minutesWatched/60%24)},children:et=>[N(()=>ye(et()))," hour",N(()=>Ne(et()))," "]}),null),d(Fe,a(x,{get when(){return U.minutesWatched<60},get children(){return[N(()=>U.minutesWatched)," minute",N(()=>Ne(U.minutesWatched))]}}),null),Fe})(),nb()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Fe=Lo();return d(Fe,()=>ye(U.chaptersRead)),Fe})(),rb()]}})]}})),d(De,a(db,{mediaStore:v,setMediaStore:$,characterStore:S,setCharacterStore:C,get pageType(){return h()},get mediaIds(){return U.mediaIds},get allMediaIds(){return r()},get characterIds(){return U.characterIds},get allCharacterIds(){return i()}})),L(()=>G(J,"src",U.voiceActor.image.large)),X})()})),w})()}function db(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),[i,s]=O(new Set),c=Me(tn,n,()=>({id_in:[...r()]})),[h]=nt(c),[u]=de.anilist.characterIds(()=>i().size>0?[...i()]:void 0,n);let f,g=!1;q(()=>{e.mediaIds,e.characterIds,g=!0});let m=!1;return q(()=>{e.pageType,m=!0,g=!0,f.scrollLeft=0}),q(oe(h,y=>{y==null||y.data.forEach(v=>e.setMediaStore(v.id,v))})),q(oe(u,y=>{y==null||y.data.forEach(v=>e.setCharacterStore(v.id,v))})),(()=>{var y=ib(),v=y.firstChild;v.addEventListener("scroll",()=>{if(g){if(m){m=!1;return}if(g=!1,e.pageType==="media"){const C=new Set(e.mediaIds).difference(e.allMediaIds);C.forEach(w=>e.allMediaIds.add(w)),l(C)}else{const C=new Set(e.characterIds).difference(e.allCharacterIds);C.forEach(w=>e.allCharacterIds.add(w)),s(C)}}});var $=f;return typeof $=="function"?ge($,v):f=v,d(v,a(W,{get children(){return[a(M,{get when(){return e.pageType==="media"},get children(){return a(H,{get each(){return e.mediaIds},children:S=>(()=>{var C=Po();return d(C,a(B,{get href(){var w;return"/ani/"+t.type+"/"+S+"/"+Je(((w=e.mediaStore[S])==null?void 0:w.title.userPreferred)||"")},get children(){return a(x,{get when(){return e.mediaStore[S]},get fallback(){return Mo()},get children(){var w=lb();return L(()=>G(w,"src",e.mediaStore[S].coverImage.large)),w}})}})),C})()})}}),a(M,{get when(){return e.pageType==="characters"},get children(){return a(H,{get each(){return e.characterIds},children:S=>(()=>{var C=Po();return d(C,a(B,{get href(){var w;return"/ani/character/"+S+"/"+Je(((w=e.characterStore[S])==null?void 0:w.name.userPreferred)||"")},get children(){return a(x,{get when(){return e.characterStore[S]},get fallback(){return Mo()},get children(){var w=sb();return L(()=>G(w,"src",e.characterStore[S].image.large)),w}})}})),C})()})}})]}})),y})()}$e(["click"]);var ub=p('<section data-k-63df6417 class=user-profile-stats-genres><div data-k-63df6417 class=flex-space-between><h2 data-k-63df6417>Staff</h2></div><ol data-k-63df6417 class="grid-column-auto-fill staff">'),Do=p("<p data-k-63df6417 class=value>"),hb=p("<p data-k-63df6417 class=title>Time watched"),gb=p("<p data-k-63df6417 class=title>Chapters read"),fb=p('<li data-k-63df6417 class=item><div data-k-63df6417 class="flex-space-between staff-name-wrapper"><h2 data-k-63df6417></h2><p data-k-63df6417 class=ranking>#</p></div><div data-k-63df6417 class=inline-container><div data-k-63df6417 class=main-content><img data-k-63df6417 class=staff-cover alt="Staff profile cover"><ol data-k-63df6417 class="flex-space-between stats"><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Count</p></li><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Mean score</p></li><li data-k-63df6417></li></ol><div data-k-63df6417 class=wrapper>'),mb=p("<div data-k-63df6417 class=inline-container><ol data-k-63df6417 class=grid-reel-auto-fill>"),pb=p('<img data-k-63df6417 class=cover-image alt="Media cover">'),vb=p("<li data-k-63df6417>"),$b=p("<div data-k-63df6417 class=cover-image> ");function _b(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userAnimeStaff(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(au,{get genres(){return n().data}})}})}function bb(){const e=ne(),{accessToken:t}=ie(),[n]=de.anilist.userMangaStaff(()=>e.name,t);return a(x,{get when(){return n()},get children(){return a(au,{get genres(){return n().data}})}})}function au(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),[i,s]=O("count"),c=Me(tn,n,()=>({id_in:[...r()]})),[h,{mutate:u}]=nt(c),[f,g]=We({});return q(oe(()=>e.genres,m=>{l(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),q(oe(h,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=ub(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Rr,{setState:s}),null),d(v,a(H,{get each(){return e.genres.sort(($,S)=>S[i()]-$[i()]||$.staff.name.userPreferred.localeCompare(S.staff.name.userPreferred))},children:($,S)=>(()=>{var C=fb(),w=C.firstChild,b=w.firstChild,A=b.nextSibling;A.firstChild;var k=w.nextSibling,_=k.firstChild,T=_.firstChild,I=T.nextSibling,E=I.firstChild,P=E.firstChild,R=E.nextSibling,U=R.firstChild,V=R.nextSibling,X=I.nextSibling;return d(b,a(B,{get href(){return"/ani/staff/"+$.staff.id+"/"+Je($.staff.name.userPreferred)},get children(){return $.staff.name.userPreferred}})),d(A,()=>S()+1,null),d(P,()=>ye($.count||0)),d(U,()=>$.meanScore||0),d(V,a(W,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Y=Do();return d(Y,a(x,{get when(){return Math.floor($.minutesWatched/60/24)},children:K=>[N(()=>ye(K()))," day",N(()=>Ne(K()))," "]}),null),d(Y,a(x,{get when(){return Math.floor($.minutesWatched/60%24)},children:K=>[N(()=>ye(K()))," hour",N(()=>Ne(K()))," "]}),null),d(Y,a(x,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),Y})(),hb()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Y=Do();return d(Y,()=>ye($.chaptersRead)),Y})(),gb()]}})]}})),d(X,a(yb,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:u})),L(()=>G(T,"src",$.staff.image.large)),C})()})),m})()}function yb(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(new Set),s=Me(tn,n,()=>({id_in:[...r()]})),[o]=nt(s);let c=!1;return q(oe(()=>e.mediaIds,()=>{c=!0})),q(oe(o,h=>{h==null||h.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var h=mb(),u=h.firstChild;return u.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),l(g)}),d(u,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=vb();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Je(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(x,{get when(){return e.store[f]},get fallback(){return $b()},get children(){var m=pb();return L(()=>G(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),h})()}const wb="_theme-container_4h5lo_1",kb="_header_4h5lo_5",Sb="_details_4h5lo_11",Cb="_play-button-container_4h5lo_16",Ab="_play-button_4h5lo_16",xb="_spoiler_4h5lo_31",sr={themeContainer:wb,header:kb,details:Sb,playButtonContainer:Cb,playButton:Ab,spoiler:xb};var Tb=p("<video src controls autoplay>"),Ib=p("<div><h2>Themes"),Eb=p("<p>"),Lb=p("<div><div><p>"),Pb=p("<p>Spoilers"),Mb=p("<div><p>v</p><p>Ep: </p><div>"),Db=p("<div><button>play</button><span></span><span></span><span>");function Rb(){const e=ne(),[t]=Te(),{anilistData:n}=vn(),r=Tb(),l=Me(Cg,()=>({id:e.id,api:t.isMalId!=null?Ka:e.api,type:e.type})),[i]=nt(l);return q(()=>{e.id,e.api,e.type,r.src=""}),a(ct,{fallback:"AnimeThemes error",get children(){return a(x,{get when(){var s,o;return N(()=>!!i())()&&((o=(s=n())==null?void 0:s.data)==null?void 0:o.type)===cg},get children(){var s=Ib();return s.firstChild,d(s,a(H,{get each(){return i().data},children:o=>a(iu,{theme:o,video:r})}),null),d(s,r,null),s}})}})}function iu(e){F(e.video,"Missing video element for playback"),F(e.theme,"Theme data is missing");let t=!1;return a(ct,{fallback:"AnimeThemes row error",get children(){var n=Lb(),r=n.firstChild,l=r.firstChild;return d(l,()=>e.theme.slug),d(r,a(x,{get when(){return e.theme.song},get children(){var i=Eb();return d(i,()=>e.theme.song.title,null),d(i,a(W,{get children(){return[a(M,{get when(){return e.mainArtist},get children(){return a(x,{get when(){var s;return((s=e.theme.song.artists)==null?void 0:s.length)>1},children:" feat "})}}),a(M,{get when(){var s;return(s=e.theme.song.artists)==null?void 0:s.length},children:" by "})]}}),null),d(i,a(H,{get each(){return e.theme.song.artists},children:s=>a(x,{get when(){return!e.mainArtist||s.slug!==e.mainArtist},get children(){return[a(x,{when:t,fallback:t=!0,children:" & "}),a(B,{get href(){return"/artist/"+s.slug},get children(){return s.name}})]}})}),null),i}}),null),d(n,a(H,{get each(){return e.theme.animethemeentries},children:i=>(()=>{var s=Mb(),o=s.firstChild;o.firstChild;var c=o.nextSibling;c.firstChild;var h=c.nextSibling;return d(o,()=>i.version||1,null),d(c,()=>i.episodes||"-",null),d(s,a(x,{get when(){return i.spoiler},get children(){var u=Pb();return L(()=>u.className=sr.spoiler),u}}),h),d(h,a(H,{get each(){return i.videos},children:u=>(()=>{var f=Db(),g=f.firstChild,m=g.nextSibling,y=m.nextSibling,v=y.nextSibling;return g.$$click=()=>e.video.src=u.link,d(m,()=>u.resolution),d(y,()=>u.source),d(v,()=>u.nc&&"NC"),L(()=>f.className=sr.playButton),f})()})),L(u=>{var f=sr.details,g=sr.playButtonContainer;return f!==u.e&&(s.className=u.e=f),g!==u.t&&(h.className=u.t=g),u},{e:void 0,t:void 0}),s})()}),null),L(i=>{var s=sr.themeContainer,o=sr.header;return s!==i.e&&(n.className=i.e=s),o!==i.t&&(r.className=i.t=o),i},{e:void 0,t:void 0}),n}})}$e(["click"]);const Nb="_themes_1brzn_1",Ro={themes:Nb};var Ob=p("<video src controls autoplay>"),Fb=p("<h1>Artist"),Ub=p("<p>"),Bb=p("<img alt=Artist>"),No=p("<div>"),Vb=p('<img src=https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg alt="Artist missing">');function Gb(){const e=ne(),[t]=de.animeThemes.artisBySlug(()=>e.name),n=Ob();return document.title="Artist - LOB",[Fb(),a(x,{get when(){return t()},get children(){return[(()=>{var r=Ub();return d(r,()=>t().data.artist.name),r})(),a(x,{get when(){return t().data.artist.images.length},get fallback(){return Vb()},get children(){var r=Bb();return L(()=>G(r,"src",t().data.artist.images[0].link)),r}}),(()=>{var r=No();return d(r,a(H,{get each(){return t().data.artist.songs},children:l=>(()=>{var i=No();return d(i,a(H,{get each(){return l.animethemes},children:s=>a(iu,{theme:s,video:n,get mainArtist(){return e.name}})})),L(()=>Ut(i,Ro.episode)),i})()})),L(()=>Ut(r,Ro.themes)),r})(),n]}})]}var Hb=p("<div class=notification-page><ol class=flex-space-between><li><button>All</button></li><li><button>Airing</button></li><li><button>Activity</button></li><li><button>Forum</button></li><li><button>Follows</button></li><li><button>Media"),Yb=p("<button>debug: "),jb=p("<ol class=notifications-container>"),zb=p("<button>Refresh"),Na=p('<img alt="Media cover">'),Zi=p("<div class=content><p>"),Wb=p("<div class=content>"),qb=p("<li>");function Kb(){const[e,t]=O("all");return document.title="Notifications - LOB",(()=>{var n=Hb(),r=n.firstChild,l=r.firstChild,i=l.firstChild,s=l.nextSibling,o=s.firstChild,c=s.nextSibling,h=c.firstChild,u=c.nextSibling,f=u.firstChild,g=u.nextSibling,m=g.firstChild,y=g.nextSibling,v=y.firstChild;return i.$$click=()=>t("all"),o.$$click=()=>t("airing"),h.$$click=()=>t("activity"),f.$$click=()=>t("forum"),m.$$click=()=>t("follows"),v.$$click=()=>t("media"),d(n,a(Jb,{type:e}),null),n})()}function Jb(e){const{accessToken:t}=ie(),n=Me(yg,t,e.type),[r,{mutateBoth:l}]=nt(n),i=c=>{var h,u;(u=(h=c==null?void 0:c.data)==null?void 0:h.notifications)!=null&&u.length&&l(f=>{var A,k,_;if(!((A=f==null?void 0:f.data)!=null&&A.length))return f.data=[c.data.notifications],f;const g=c.data.notifications.at(-1).id,m=vr(f.data[0],T=>T.id-g),y=((k=f.data[0][m])==null?void 0:k.id)===g;if(c.data.pageInfo.currentPage===1)return y?(f.data[0].splice(0,m+1,...c.data.notifications),f):(f.data.unshift(c.data.notifications),f.data.length=Math.min(f.data.length,5),f);const v=c.data.notifications[0].id,$=vr(f.data[0],T=>T.id-v);if($===0&&f.data[0][$].id!==v||(f.data[0].splice($,m-$+y,...c.data.notifications),y||f.data.length===1))return f;const C=vr(f.data[1],T=>T.id-g);if(((_=f.data[1][C])==null?void 0:_.id)!==g)return f;const[b]=f.data.splice(1,1);return b.splice(0,C+1),f.data[0].push(...b),f})},[s,o]=Kl();return a(x,{get when(){return!r.loading},get children(){return[a(x,{get when(){return Mr},get children(){var c=Yb();return c.firstChild,c.$$click=()=>o(h=>!h),d(c,()=>""+s(),null),c}}),a(Xb,Oe({get cache(){var c,h;return((h=(c=r())==null?void 0:c.data)==null?void 0:h[0])||[]},updateCache:i,isDebug:s},e))]}})}function Xb(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),l=Me(Uc,t,e.type,n),[i]=zl(e.isDebug,l);let s=0;const[o,c]=O(!1),[h,u]=O(!0),f=bd(u),g=new Set,m=Xn(mn,b=>!i.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var k,_;const b=Ae(o),A=Ae(h);if(S.has((k=e.cache.at(-1))==null?void 0:k.id)&&b)return Math.max(Math.floor(e.cache.length/15)+1,s+1);if(S.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const T=[...S.difference(g)].sort((P,R)=>R-P);if(!T.length)return;const I=ua(T,.5),E=pd(e.cache,P=>P.id-I);return E==-1?void 0:Math.ceil((E+1)/15)}}let $=0;q(oe(i,b=>{var T,I,E,P,R;if(!((T=b==null?void 0:b.data)!=null&&T.notifications.length))return;b.data.notifications.forEach(U=>{g.add(U.id)});const A=((I=b.data.notifications[0])==null?void 0:I.createdAt)||0,k=((E=ua(b.data.notifications,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-k)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(u(!1),c(!0),f(_,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/15&&(((P=b.data.notifications.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(u(!0),c(!1),s=0,$=0)),e.updateCache(b),y()}));const S=new Set,C=b=>{for(const A of b){const k=parseInt(A.target.dataset.id);F(Number.isInteger(k)),A.isIntersecting?S.add(k):S.delete(k)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[a(x,{get when(){return N(()=>!!i.loading)()&&n()===1},get children(){return a(Wn,{class:"refresh",get children(){return a(Tt,{tipPosition:"bottom",get children(){return a(x,{get when(){return e.cache.length===0},fallback:"Fetching fresh notifications",children:"Loading notifications"})}})}})}}),(()=>{var b=jb();return d(b,a(H,{get each(){return e.cache},children:A=>{let k;return En(()=>w.observe(k)),(()=>{var _=qb(),T=k;return typeof T=="function"?ge(T,_):k=_,d(_,a(W,{get fallback(){return'Notification type "'+A.type+'" not supported.'},get children(){return[a(M,{get when(){return A.type==="RELATED_MEDIA_ADDITION"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var I=Na();return L(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=Zi(),E=I.firstChild;return d(E,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.context,null),d(I,a(Gn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="AIRING"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var I=Na();return L(()=>G(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=Zi(),E=I.firstChild;return d(E,()=>A.contexts[0],null),d(E,()=>A.episode,null),d(E,()=>A.contexts[1],null),d(E,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.contexts[2],null),d(I,a(Gn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="ACTIVITY_REPLY_LIKE"||A.type==="ACTIVITY_LIKE"||A.type==="ACTIVITY_REPLY"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var I=Na();return L(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=Wb();return d(I,a(B,{get href(){return"/activity/"+A.activityId},get children(){return[N(()=>A.user.name),N(()=>A.context)]}}),null),d(I,a(Gn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="FOLLOWING"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var I=Na();return L(()=>G(I,"src",A.user.avatar.large)),I}}),(()=>{var I=Zi(),E=I.firstChild;return d(E,a(B,{get href(){return"/user/"+A.user.name},get children(){return A.user.name}}),null),d(E,()=>A.context,null),d(I,a(Gn,{get createdAt(){return A.createdAt}}),null),I})()]}})]}})),L(()=>G(_,"data-id",A.id)),_})()}})),L(()=>b.classList.toggle("loading",!!(i.loading&&n()===1))),b})(),a(W,{get children(){return[a(M,{get when(){return i.loading&&n()>s&&e.cache.length},get children(){return a(Wn,{class:"new",get children(){return a(Tt,{tipPosition:"bottom",children:"Loading notifications"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh notification feed to load more",(()=>{var b=zb();return b.$$click=()=>r(1),b})()]}})]}})]}$e(["click"]);var lu=p("<ol class=grid-column-auto-fill>"),Zb=p("<div class=entities-page>"),Qb=p("<button>debug: "),ey=p("<select name=roles id=roles>"),ty=p("<option>"),ny=p("<img class=entity-image alt=Character>"),su=p("<div class=content><p class=line-clamp></p><p>"),ry=p('<p class="line-clamp small">'),ay=p("<span class=role-notes>(<!>)"),iy=p("<div class=content><p class=voice-actor-language>"),ly=p('<img class=entity-image alt="Voice actor">'),ou=p("<li class=entities-page-entity>"),sy=p("<p class=line-clamp>"),oy=p("<img class=entity-image alt=Staff>"),cy=p('<li class="entities-page-entity loading"><div class=entity-left><div class=entity-image></div><div class=content><p class=line-clamp></p></div></div><div class=entity-right><div class=content><p class=line-clamp></p></div><div class=entity-image>');function dy(){const[e,t]=O(),[n]=de.myAnimeList.animeCharactersById(e);return a(_i,{type:"CHARACTER",setIdMal:t,malData:n})}function uy(){const[e,t]=O(),[n]=de.myAnimeList.mangaCharactersById(e);return a(_i,{type:"CHARACTER",setIdMal:t,malData:n})}function hy(){const[e,t]=O(),[n]=de.myAnimeList.animeStaffById(e);return a(_i,{type:"STAFF",setIdMal:t,malData:n})}function gy(){const[,e]=O();return a(_i,{type:"STAFF",setIdMal:e})}function _i(e){const t=ne();return(()=>{var n=Zb();return d(n,a(W,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(fy,{})}}),a(M,{get when(){return e.type==="STAFF"},get children(){var r=lu();return d(r,a(cu,{get id(){return t.id},page:1,get setIdMal(){return e.setIdMal}})),r}})]}})),n})()}function Qi(e,t,n,r){for(let l=e;l<=t;l++)n[r[l].id]=l;return n}function fy(e){const t=ne(),{accessToken:n}=ie(),r=Me(wg,n,()=>t.id),[l,{mutateBoth:i}]=nt(r),s=(h,u)=>{var f,g;(g=(f=h==null?void 0:h.data)==null?void 0:f.characters.edges)!=null&&g.length&&i(m=>{var y,v;if(!((v=(y=m==null?void 0:m.data)==null?void 0:y.items)!=null&&v.length))return m.data={items:h.data.characters.edges,indices:Qi(0,h.data.characters.edges.length-1,{},h.data.characters.edges),roles:u},m;for(let $=0;$<h.data.characters.edges.length;$++){const S=h.data.characters.edges[$],C=$+(h.data.characters.pageInfo.currentPage-1)*h.data.characters.pageInfo.perPage,w=m.data.indices[S.id];if(S.id in m.data.indices){if(w<C)for(let b=w;b<C;b++)m.data.items[b]=m.data.items[b+1];else if(w>C)for(let b=C;b>w;b--)m.data.items[b]=m.data.items[b-1];m.data.items[C]=S,Qi(Math.min(C,w),Math.max(C,w),m.data.indices,m.data.items)}else m.data.items.splice(C,0,S),Qi(C,m.data.items.length-1,m.data.indices,m.data.items)}return m.data.roles=u,m})},[o,c]=Kl();return a(x,{get when(){return!l.loading},get children(){return[a(x,{get when(){return Mr},get children(){var h=Qb();return h.firstChild,h.$$click=()=>c(u=>!u),d(h,()=>""+o(),null),h}}),a(my,Oe({get cache(){var h,u;return((u=(h=l())==null?void 0:h.data)==null?void 0:u.items)||[]},get roles(){var h,u;return((u=(h=l())==null?void 0:h.data)==null?void 0:u.roles)||[]},updateCache:s,isDebug:o},e))]}})}function my(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(e.cache.length?void 0:1),i=Me(Bc,n,()=>t.id,r),[s]=zl(e.isDebug,i),o=N(b=>{var A,k;return b&&((k=(A=s())==null?void 0:A.data)==null?void 0:k.characters.pageInfo.hasNextPage)!==!1},!0),[c,h]=O({language:"Japanese",dubGroup:null}),u=N(()=>{var b,A;return((A=(b=s())==null?void 0:b.data)==null?void 0:A.countryOfOrigin)||"JP"}),f=N(()=>{var A,k,_;if(((_=(k=(A=s())==null?void 0:A.data)==null?void 0:k.characters)==null?void 0:_.pageInfo.currentPage)!==1)return e.roles;const b=new Map;for(const T of s().data.characters.edges)for(const I of T.voiceActorRoles){const E=I.voiceActor.language+I.dubGroup;b.has(E)===!1&&b.set(E,{language:I.voiceActor.language,dubGroup:I.dubGroup})}return[...b.values()]});L(()=>{if(f().length){const b=Jl(u()),A=f().findIndex(_=>_.language===b),k=A!==-1?A:f().findIndex(_=>_.language==="Japanese");h(f()[k===-1?0:k])}});const g=new Set,m=Xn(mn,b=>!s.loading&&l(b),1e3);function y(){const b=$();b&&m(b)}const v=25;function $(){const b=Ae(o),A=Math.ceil(e.cache.length/v);if(S.has(A)&&!g.has(A))return A;if(S.has(A)&&b&&g.has(A))return A+1;{const k=[...S.difference(g)].sort((_,T)=>T-_);return k.length?ua(k,.5):void 0}}q(oe(s,b=>{var A;(A=b==null?void 0:b.data)!=null&&A.characters.edges.length&&(F(v===b.data.characters.pageInfo.perPage,"Page count is wrong"),g.add(b.data.characters.pageInfo.currentPage),e.updateCache(b,f()),y())}));const S=new Set,C=b=>{for(const A of b){const k=parseInt(A.target.dataset.page);F(Number.isInteger(k)),A.isIntersecting?S.add(k):S.delete(k)}y()},w=new IntersectionObserver(C,{rootMargin:"500px"});return ze(()=>w.disconnect()),[a(x,{get when(){return f().length},get children(){var b=ey();return b.addEventListener("change",A=>h(f()[A.target.value])),d(b,a(H,{get each(){return f()},children:(A,k)=>(()=>{var _=ty();return d(_,()=>A.language,null),d(_,a(x,{get when(){return A.dubGroup},get children(){return[" (",N(()=>A.dubGroup),")"]}}),null),L(()=>_.value=k()),_})()})),L(()=>b.value=f().findIndex(A=>A===c())),b}}),(()=>{var b=lu();return d(b,a(H,{get each(){return e.cache},children:(A,k)=>a(x,{get when(){return A.voiceActorRoles.filter(_=>_.voiceActor.language===c().language&&_.dubGroup===c().dubGroup)},children:_=>a(x,{get when(){return _().length},get fallback(){return a(Oo,{edge:A,get page(){return Math.ceil((k()+1)/v)},intersectionObserver:w})},get children(){return a(H,{get each(){return _()},children:T=>a(Oo,{edge:A,get i(){return k()},actorRole:T,get page(){return Math.ceil((k()+1)/v)},intersectionObserver:w})})}})})})),b})(),a(x,{get when(){return s.loading&&r()>Math.ceil(e.cache.length/v)&&e.cache.length},get children(){return a(Wn,{class:"new",get children(){return a(Tt,{tipPosition:"bottom",children:"Loading characters"})}})}})]}function cu(e){const[t,n]=O(e.page===1?1:void 0),{accessToken:r}=ie(),[l]=de.anilist.allMediaStaff(()=>e.id,t,r);return e.page===1&&q(()=>{l()&&e.setIdMal(l().data.idMal??void 0)}),a($n,{onIntersection:()=>n(e.page),fetchResponse:l,get loadingElement(){return a(vy,{})},get loading(){return e.loading},children:i=>[a(H,{get each(){return l().data.staff.edges},children:s=>a(py,{edge:s})}),a(x,{get when(){return l().data.staff.pageInfo.hasNextPage},get children(){return a(x,{when:i===!1,fallback:"Fetch cooldown",get children(){return a(cu,{get id(){return e.id},get page(){return e.page+1},get loading(){return l.loading}})}})}})]})}function Oo(e){let t;return En(()=>e.intersectionObserver.observe(t)),(()=>{var n=ou(),r=t;return typeof r=="function"?ge(r,n):t=n,d(n,a(B,{get href(){return"/ani/character/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var l=ny();return L(()=>G(l,"src",e.edge.node.image.large)),l})(),(()=>{var l=su(),i=l.firstChild,s=i.nextSibling;return d(i,()=>e.edge.node.name.userPreferred),d(s,()=>Ke(e.edge.role)),l})()]}}),null),d(n,a(x,{get when(){return e.actorRole},get children(){return a(B,{get href(){return"/ani/staff/"+e.actorRole.voiceActor.id},class:"entity-right",get children(){return[(()=>{var l=iy(),i=l.firstChild;return d(l,a(x,{get when(){return e.actorRole.roleNotes},get fallback(){return(()=>{var s=sy();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})()},get children(){return[(()=>{var s=ry();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})(),(()=>{var s=ay(),o=s.firstChild,c=o.nextSibling;return c.nextSibling,d(s,()=>e.actorRole.roleNotes,c),s})()]}}),i),d(i,()=>e.actorRole.voiceActor.language),l})(),(()=>{var l=ly();return L(()=>G(l,"src",e.actorRole.voiceActor.image.large)),l})()]}})}}),null),L(()=>G(n,"data-page",e.page)),n})()}function py(e){return(()=>{var t=ou();return d(t,a(B,{get href(){return"/ani/staff/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var n=oy();return L(()=>G(n,"src",e.edge.node.image.large)),n})(),(()=>{var n=su(),r=n.firstChild,l=r.nextSibling;return d(r,()=>e.edge.node.name.userPreferred),d(l,()=>Ke(e.edge.role)),n})()]}})),t})()}function vy(){return a(H,{get each(){return Array(3)},children:()=>cy()})}$e(["click"]);var $y=p('<svg aria-hidden=true class=svg-heart focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 31.97 512.01 448.01"><path fill=currentColor d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">');function _y(){return $y()}var by=p('<svg class=svg-anilist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 2.95 24 18.1"><path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z">');function hs(){return by()}var yy=p('<svg class=svg-myanimelist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 7.19 24 9.63"><path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z">');function gs(){return yy()}var wy=p('<label class="cp-toggle-favourite-button flex-no-shrink"><input type=checkbox id=favourite-toggle name=favourite-toggle>'),ky=p("<div class=grid-center><span class=visually-hidden>Anilist favourites: "),Sy=p("<div class=grid-center><span class=visually-hidden>MyAnimeList favourites: "),Cy=p("<div class=flex-no-shrink>");function Nr(e){const{accessToken:t}=ie();let n=null;const r=_a(async(s,o,c)=>{if(c!==n){const h=await de.anilist.toggleFavourite(s,o);Rc(h.fromCache,"Mutation should never be cached"),e.mutateCache(c,o)}n=c},500),l=()=>!e.idType||!e.onChange||!e.variableId||!e.mutateCache||!e.idType;return(()=>{var s=wy(),o=s.firstChild;return o.addEventListener("change",c=>{if(Ae(l))return;const h=e.idType;F(h==="MANGA"||h==="ANIME"||h==="STAFF"||h==="CHARACTER"||h==="STUDIO","Missing idType"),e.onChange(c.target.checked),r(t(),{[e.idType]:e.variableId},c.target.checked)}),d(s,a(_y,{}),null),d(s,a(i,{}),null),L(c=>{var h=!!l(),u=l();return h!==c.e&&s.classList.toggle("disabled",c.e=h),u!==c.t&&(o.disabled=c.t=u),c},{e:void 0,t:void 0}),L(()=>o.checked=e.checked),s})();function i(){const s=()=>"jikanValue"in e||e.jikanLoading,o=()=>"anilistValue"in e||e.anilistLoading;return a(x,{get when(){return s()||o()},get children(){var c=Cy();return d(c,a(x,{get when(){return o()},get children(){var h=ky();return h.firstChild,d(h,a(hs,{}),null),d(h,a(W,{get children(){return[a(M,{get when(){return e.anilistLoading},children:"..."}),a(M,{get when(){return e.anilistValue!=null},get children(){return Xs(e.anilistValue)}}),a(M,{get when(){return e.anilistValue==null},children:"N/A"})]}}),null),h}}),null),d(c,a(x,{get when(){return s()},get children(){var h=Sy();return h.firstChild,d(h,a(gs,{}),null),d(h,a(W,{get children(){return[a(M,{get when(){return e.jikanLoading},children:"..."}),a(M,{get when(){return e.jikanValue!=null},get children(){return Xs(e.jikanValue)}}),a(M,{get when(){return e.jikanValue==null},children:"N/A"})]}}),null),h}}),null),c}})}}var Ay=p("<li><strong>Birth:</strong> "),xy=p("<li><strong>Age:</strong> "),Ty=p("<li><strong>Gender:</strong> "),Iy=p("<li><strong>Active years: </strong>"),Ey=p("<li><strong>Home town:</strong> "),Ly=p("<li><strong>Blood type:</strong> "),ni=p("<li>"),Py=p("<div class=entity-page-header><img class=cover><div class=row><h1></h1><p class=entity-page-alternative-names></p></div><ul class=description>"),My=p("<form class=entity-page-form><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=CHAPTERS>CHAPTERS</option><option value=CHAPTERS_DESC>CHAPTERS_DESC</option><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=SEARCH_MATCH>SEARCH_MATCH</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=TYPE>TYPE</option><option value=TYPE_DESC>TYPE_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC</option><option value=VOLUMES>VOLUMES</option><option value=VOLUMES_DESC>VOLUMES_DESC"),Dy=p("<div class=entity-page>"),Ry=p("<select>"),Ny=p("<details class=entity-page-details open><summary class=entity-page-summary><h2></h2><div><label><input type=checkbox> Show years</label></div></summary><ol class=grid-column-auto-fill>"),Oy=p("<option>"),Fo=p("<li class=entity-page-grid-year-header><h3>"),du=p("<img>"),fs=p("<div class=list-status>"),uu=p("<span class=role> "),ms=p("<p>"),hu=p("<ol>"),Fy=p("<li class=entity-page-media-voice-actor>"),gu=p("<span>"),Uo=p("<span class=role> (<!>)"),Uy=p('<img alt="Staff profile"class=background>'),fu=p("<img alt=Character class=background>"),By=p("<li><div class=entity-page-character-cover>");function Vy(){const e=ne(),{accessToken:t}=ie(),[n,{mutateCache:r}]=de.anilist.characterInfoById(()=>e.id,t);return document.title="Character - LOB",a(mu,{type:"CHARACTER",entityInfo:n,mutateEntityInfoCache:r})}function Gy(){const e=ne(),{accessToken:t}=ie(),[n,{mutateCache:r}]=de.anilist.staffInfoById(()=>e.id,t);return document.title="Staff - LOB",a(mu,{type:"STAFF",entityInfo:n,mutateEntityInfoCache:r})}function mu(e){const[t,n]=Te(),r=Xn(mn,n,300),[l,i]=O(),[s,o]=O(!1);return q(oe(e.entityInfo,c=>{o(c==null?void 0:c.data.isFavourite)})),q(()=>{i({onList:t.list?t.list==="true":void 0,sort:t.sort})}),(()=>{var c=Dy();return d(c,a(x,{get when(){return e.entityInfo()},get children(){return[(()=>{var h=Py(),u=h.firstChild,f=u.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling;return d(g,()=>e.entityInfo().data.name.userPreferred),d(m,()=>[...qe(e.entityInfo().data.name.native),...qe(e.entityInfo().data.name.alternative)].join(", ")),d(f,a(Nr,{get checked(){return s()},get idType(){return e.type},get variableId(){return e.entityInfo().data.id},get anilistValue(){return e.entityInfo().data.favourites},onChange:o,mutateCache:v=>{e.entityInfo().data.isFavourite=v,e.mutateEntityInfoCache($=>$)}}),null),d(y,a(x,{get when(){return Xa(e.entityInfo().data.dateOfBirth)},get children(){var v=Ay(),$=v.firstChild;return $.nextSibling,d(v,()=>Xa(e.entityInfo().data.dateOfBirth),null),v}}),null),d(y,a(x,{get when(){return e.entityInfo().data.age},get children(){var v=xy(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.age,null),v}}),null),d(y,a(x,{get when(){return e.entityInfo().data.gender},get children(){var v=Ty(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.gender,null),v}}),null),d(y,a(x,{get when(){var v;return(v=e.entityInfo().data.yearsActive)==null?void 0:v.length},get children(){var v=Iy();return v.firstChild,d(v,()=>e.entityInfo().data.yearsActive.join("-"),null),d(v,a(W,{get children(){return[a(M,{get when(){var $;return N(()=>{var S;return!!((S=e.entityInfo().data.dateOfDeath)!=null&&S.year)})()&&e.entityInfo().data.yearsActive.at(-1)!==(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)},get children(){return["-",N(()=>e.entityInfo().data.dateOfDeath.year)]}}),a(M,{get when(){var $;return(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)==null},children:"-Present"})]}}),null),v}}),null),d(y,a(x,{get when(){return e.entityInfo().data.homeTown},get children(){var v=Ey(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.homeTown,null),v}}),null),d(y,a(x,{get when(){return e.entityInfo().data.bloodType},get children(){var v=Ly(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.bloodType,null),v}}),null),d(y,a(x,{get when(){return e.entityInfo().data.description},get children(){var v=ni();return d(v,a(ss,{get children(){return e.entityInfo().data.description}})),v}}),null),L(v=>{var $=e.entityInfo().data.image.large,S=Ke(e.type)+" profile";return $!==v.e&&G(u,"src",v.e=$),S!==v.t&&G(u,"alt",v.t=S),v},{e:void 0,t:void 0}),h})(),(()=>{var h=My(),u=h.firstChild,f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.nextSibling,v=y.firstChild,$=u.nextSibling,S=$.firstChild,C=S.nextSibling,w=C.nextSibling,b=w.nextSibling,A=b.nextSibling,k=A.nextSibling,_=k.nextSibling,T=_.nextSibling,I=T.nextSibling,E=I.nextSibling,P=E.nextSibling,R=P.nextSibling,U=R.nextSibling,V=U.nextSibling,X=V.nextSibling,Y=X.nextSibling,K=Y.nextSibling,le=K.nextSibling,re=le.nextSibling,Q=re.nextSibling,J=Q.nextSibling;return h.addEventListener("submit",pe=>pe.preventDefault()),g.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),v.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),$.addEventListener("change",pe=>r({sort:pe.target.value})),L(()=>g.checked=t.list==="false"),L(()=>v.checked=t.list==="true"),L(()=>Y.value=e.type==="CHARACTER"&&t.sort!=="POPULARITY_DESC"?"":"POPULARITY_DESC"),L(()=>J.value=e.type==="STAFF"&&t.sort!=="START_DATE_DESC"?"":"START_DATE_DESC"),L(()=>$.value=t.sort||""),h})()]}}),null),d(c,a(W,{get children(){return[a(M,{get when(){return e.type==="STAFF"},get children(){return[a(Oa,{get variables(){return l()},type:"CHARACTER",showYears:!0,title:"Characters"}),a(Oa,{get variables(){return l()},type:"ANIME",title:"Anime staff roles"}),a(Oa,{get variables(){return l()},type:"MANGA",title:"Manga staff roles"})]}}),a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(Oa,{get variables(){return l()},type:"MEDIA",title:"Media entries"})}})]}}),null),c})()}function Oa(e){F(e.title,"title missing"),F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(e.showYears||!1),[r,l]=O(!1),[i,s]=O([]),[o,c]=O(["Japanese"]);return e.type==="MEDIA"&&q(()=>{i().length&&c(i().find(h=>h==="Japanese")||i().find(h=>h==="Chinese")||i()[0])}),(()=>{var h=Ny(),u=h.firstChild,f=u.firstChild,g=f.nextSibling,m=g.firstChild,y=m.firstChild,v=u.nextSibling;return d(f,()=>e.title),y.addEventListener("change",$=>{$.preventDefault(),n($.target.checked)}),d(g,a(x,{get when(){return N(()=>e.type==="MEDIA")()&&i().length},get children(){var $=Ry();return $.$$input=S=>c(S.target.value),d($,a(H,{get each(){return i()},children:S=>(()=>{var C=Oy();return C.value=S,d(C,S),C})()})),L(()=>$.value=o()),$}}),null),d(v,a(W,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(vu,{setVisible:l,get variables(){return e.variables},showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="ANIME"},get children(){return a(Il,{setVisible:l,get variables(){return e.variables},type:"ANIME",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MANGA"},get children(){return a(Il,{setVisible:l,get variables(){return e.variables},type:"MANGA",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MEDIA"},get children(){return a(pu,{setVisible:l,get variables(){return e.variables},showYears:t,setLanguages:s,language:o,nestLevel:1})}})]}})),L(()=>h.classList.toggle("hidden",!r())),L(()=>y.checked=t()),h})()}function pu(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(void 0),[i]=de.anilist.characterMediaById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(oe(i,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0);const o=new Set;for(const c of(s==null?void 0:s.data.edges)||[])for(const h of c.voiceActorRoles)o.add(h.voiceActor.language);e.setLanguages([...o])})),a($n,{onIntersection:()=>l(e.variables),fetchResponse:i,get loading(){return e.loading},children:s=>[a(Hy,{get language(){return e.language},get edges(){return i().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(x,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return i().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(x,{get when(){return e.variables},children:o=>a(x,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(pu,{get variables(){var c;return{...o(),page:(((c=o())==null?void 0:c.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastYearGroup(){var c,h;return((h=(c=i().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return i.loading}})}})})}})}})]})}function vu(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(void 0),[i]=de.anilist.staffCharactersById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(oe(i,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0)})),a($n,{onIntersection:()=>l(e.variables),fetchResponse:i,get loading(){return e.loading},children:s=>[a(jy,{get edges(){return i().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(x,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return i().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(x,{get when(){return e.variables},children:o=>a(x,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(vu,{get variables(){var c;return{...o(),characterPage:(((c=o())==null?void 0:c.characterPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get lastYearGroup(){var c,h;return((h=(c=i().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return i.loading}})}})})}})}})]})}function Il(e){F(e.type,"Type is missing"),F(e.nestLevel,"nestLevel is missing");const t=ne(),{accessToken:n}=ie(),[r,l]=O(void 0),[i,{mutate:s}]=de.anilist.staffMediaById(n,()=>t.id,e.type,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&q(oe(i,o=>{e.setVisible((o==null?void 0:o.data.edges.length)>0)})),q(oe(i,o=>{if(!e.lastMediaId||!(o!=null&&o.data.edges.length))return;const c=structuredClone(o.data.edges),h=[];for(const u of o.data.edges){if(u.node.id!==e.lastMediaId)break;h.push(c.shift())}h.length!==0&&(e.mutate(u=>(u.data.edges=[...u.data.edges,...h],{...u})),s(u=>(u.data.edges=c,{...u})))})),a($n,{onIntersection:()=>l(e.variables),fetchResponse:i,get loading(){return e.loading},children:o=>[a(Yy,{get edges(){return i().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(x,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return e.variables},get keyed(){return e.nestLevel===1},get children(){return a(x,{when:o===!1,fallback:"Fetch cooldown",get children(){return a(Il,{get variables(){var c;return{...e.variables,staffPage:(((c=e.variables)==null?void 0:c.staffPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},mutate:s,get type(){return e.type},get lastYearGroup(){var c,h;return((h=(c=i().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:h.year)||"TBA"},get lastMediaId(){var c;return(c=i().data.edges.at(-1))==null?void 0:c.node.id},get loading(){return i.loading}})}})}})}})]})}function ps(e){return a(x,{get when(){return e.showYears()},get children(){return a(W,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(x,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Fo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(x,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Fo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function Hy(e){return F(e.showYears,"showYears signal is missing"),F(e.language,"language signal is missing"),a(H,{get each(){return e.edges},children:(t,n)=>[a(ps,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),a(x,{get when(){return t.voiceActorRoles.filter(r=>r.voiceActor.language===e.language())},children:r=>(()=>{var l=Fy();return d(l,a(B,{get href(){return Ve(t.node)},get children(){var i=du();return L(s=>{var o=t.node.coverImage.large,c=Ke(t.node.type)+" cover";return o!==s.e&&G(i,"src",s.e=o),c!==s.t&&G(i,"alt",s.t=c),s},{e:void 0,t:void 0}),i}}),null),d(l,a(B,{get href(){return Ve(t.node)},get children(){var i=ms();return d(i,a(x,{get when(){var s;return(s=t.node.mediaListEntry)==null?void 0:s.status},get children(){var s=fs();return L(()=>G(s,"data-status",t.node.mediaListEntry.status)),s}}),null),d(i,()=>t.node.title.userPreferred,null),d(i,a(x,{get when(){return t.characterRole},get children(){var s=uu();return s.firstChild,d(s,()=>Ke(t.characterRole),null),s}}),null),i}}),null),d(l,a(x,{get when(){return r().length},get children(){var i=hu();return d(i,a(H,{get each(){return r()},children:s=>(()=>{var o=ni();return d(o,a(B,{class:"actor",get href(){return"/ani/staff/"+s.voiceActor.id+"/"+Je(s.voiceActor.name.userPreferred)},get children(){return[(()=>{var c=gu();return d(c,()=>s.voiceActor.name.userPreferred),c})(),a(x,{get when(){return s.roleNotes},get children(){var c=Uo(),h=c.firstChild,u=h.nextSibling;return u.nextSibling,d(c,()=>s.roleNotes,u),c}}),a(x,{get when(){return s.dubGroup},get children(){var c=Uo(),h=c.firstChild,u=h.nextSibling;return u.nextSibling,d(c,()=>s.dubGroup,u),c}}),(()=>{var c=Uy();return L(()=>G(c,"src",s.voiceActor.image.large)),c})()]}})),o})()})),i}}),null),l})()})]})}function Yy(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{const l=n.at(-1);return(l==null?void 0:l.node.id)!==r.node.id?(r.staffRoles=[r.staffRole],n.push(r)):l!=null&&l.staffRoles&&l.staffRoles.push(r.staffRole),n};return a(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(ps,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),(()=>{var l=ni();return d(l,a(B,{get href(){return Ve(n.node)},get children(){return[(()=>{var i=fu();return L(()=>G(i,"src",n.node.coverImage.large)),i})(),(()=>{var i=ms();return d(i,a(x,{get when(){var s;return(s=n.node.mediaListEntry)==null?void 0:s.status},get children(){var s=fs();return L(()=>G(s,"data-status",n.node.mediaListEntry.status)),s}}),null),d(i,()=>n.node.title.userPreferred,null),i})(),a(x,{get when(){return n.staffRoles},get children(){var i=hu();return d(i,a(H,{get each(){return n.staffRoles},children:s=>(()=>{var o=ni();return d(o,s),o})()})),i}})]}})),l})()]})}function jy(e){return F(e.showYears,"showYears signal is missing"),a(H,{get each(){return e.edges},children:(t,n)=>a(H,{get each(){return t.characters},children:r=>a(x,{when:r,get children(){return[a(ps,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),(()=>{var l=By(),i=l.firstChild;return d(i,a(B,{get href(){return"/ani/character/"+r.id+"/"+Je(r.name.userPreferred)},get children(){var s=fu();return L(()=>G(s,"src",r.image.large)),s}}),null),d(i,a(B,{class:"media",get href(){return Ve(t.node)},get children(){var s=du();return L(o=>{var c=t.node.coverImage.large,h=Ke(t.node.type)+" cover";return c!==o.e&&G(s,"src",o.e=c),h!==o.t&&G(s,"alt",o.t=h),o},{e:void 0,t:void 0}),s}}),null),d(l,a(B,{get href(){return"/ani/character/"+r.id+"/"+Je(r.name.userPreferred)},get children(){return[(()=>{var s=gu();return d(s,()=>r.name.userPreferred),s})(),(()=>{var s=uu();return s.firstChild,d(s,()=>Ke(t.characterRole),null),s})()]}}),null),d(l,a(B,{get href(){return Ve(t.node)},get children(){var s=ms();return d(s,a(x,{get when(){var o;return(o=t.node.mediaListEntry)==null?void 0:o.status},get children(){var o=fs();return L(()=>G(o,"data-status",t.node.mediaListEntry.status)),o}}),null),d(s,()=>t.node.title.userPreferred,null),s}}),null),l})()]}})})})}$e(["input"]);var zy=p("<div class=flex-space-between><h1>"),Wy=p("<form><label><input type=checkbox> Show years</label><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option value=POPULARITY_DESC>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC"),qy=p("<ol class=grid-column-auto-fill>"),Ky=p("<div class=studio-page>"),Bo=p("<li class=grid-full-span><h3>");function Jy(){const e=ne(),{accessToken:t}=ie(),[n,r]=Te(),l=Xn(mn,r,300),[i,s]=O(),[o,c]=O(!0),[h,{mutateCache:u}]=de.anilist.studioInfoAndMediaById(()=>e.id,i,t);document.title="Studio - LOB";const[f,g]=O(!1);return q(oe(h,m=>{g(m==null?void 0:m.data.isFavourite)})),q(()=>{s({onList:n.list?n.list==="true":void 0,sort:n.sort})}),(()=>{var m=Ky();return d(m,a(x,{get when(){return h()},get children(){return[(()=>{var y=zy(),v=y.firstChild;return d(v,()=>h().data.name),d(y,a(Nr,{get checked(){return f()},get variableId(){return e.id},idType:"STUDIO",get anilistValue(){return h().data.favourites},onChange:g,mutateCache:$=>{h().data.isFavourite=$,u(S=>S)}}),null),y})(),(()=>{var y=Wy(),v=y.firstChild,$=v.firstChild,S=v.nextSibling,C=S.firstChild,w=C.firstChild,b=C.nextSibling,A=b.nextSibling,k=A.firstChild,_=S.nextSibling,T=_.firstChild,I=T.nextSibling,E=I.nextSibling,P=E.nextSibling,R=P.nextSibling,U=R.nextSibling,V=U.nextSibling,X=V.nextSibling,Y=X.nextSibling,K=Y.nextSibling,le=K.nextSibling,re=le.nextSibling,Q=re.nextSibling,J=Q.nextSibling,pe=J.nextSibling,ve=pe.nextSibling,fe=ve.nextSibling,ee=fe.nextSibling;return y.addEventListener("submit",z=>z.preventDefault()),$.addEventListener("change",z=>c(z.target.checked)),w.addEventListener("change",z=>l({list:z.target.checked?z.target.value:void 0})),k.addEventListener("change",z=>l({list:z.target.checked?z.target.value:void 0})),_.addEventListener("change",z=>l({sort:z.target.value})),L(()=>$.checked=o()),L(()=>w.checked=n.list==="false"),L(()=>k.checked=n.list==="true"),L(()=>ee.value=n.sort==="START_DATE_DESC"?"START_DATE_DESC":""),L(()=>_.value=n.sort||""),y})(),a(Zd,{get children(){var y=qy();return d(y,a($u,{get variables(){return i()},studioInfo:h,showYears:o,nestLevel:1})),y}})]}})),m})()}function $u(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(void 0),[i]=de.anilist.studioInfoAndMediaById(()=>t.id,e.nestLevel===1?void 0:r,n),s=e.studioInfo||i;return a($n,{onIntersection:()=>l(e.variables),fetchResponse:s,get loading(){return e.loading},children:o=>[a(Zy,{get edges(){return s().data.media.edges},get showYears(){return e.showYears},get lastMediaId(){return e.lastMediaId},get lastYearGroup(){return e.lastYearGroup}}),a(x,{get when(){return s().data.media.pageInfo.hasNextPage},get children(){return a(x,{get when(){return s().data.media.edges},get keyed(){return e.nestLevel===1},get children(){return a(x,{get when(){return e.variables},children:c=>a(x,{when:o===!1,fallback:"Fetch cooldown",get children(){return a($u,{get variables(){var h;return{...c(),page:(((h=c())==null?void 0:h.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastMediaId(){var h;return(h=s().data.media.edges.at(-1))==null?void 0:h.node.id},get lastYearGroup(){var h,u;return((u=(h=s().data.media.edges.at(-1))==null?void 0:h.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return s.loading}})}})})}})}})]})}function Xy(e){return a(x,{get when(){return e.showYears()},get children(){return a(W,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(x,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Bo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(x,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Bo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function Zy(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{var l;return((l=n.at(-1))==null?void 0:l.node.id)!==r.node.id&&e.lastMediaId!==r.node.id&&n.push(r),n};return a(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(Xy,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),a($i,{get media(){return n.node}})]})}var Qy=p("<div data-k-8e2716fd class=activity-page>"),e0=p("<img data-k-8e2716fd class=profile alt=Profile>"),t0=p("<div data-k-8e2716fd class=activity-message-card><div data-k-8e2716fd class=header></div><div data-k-8e2716fd class=content>");function n0(){const{accessToken:e}=ie(),t=ne(),[n]=de.anilist.activityById(()=>t.id,e),[r]=de.anilist.activityRepliesById(()=>t.id,1,e);return document.title="Activity - LOB",(()=>{var l=Qy();return d(l,a(x,{get when(){var i;return(i=n())==null?void 0:i.data},get children(){return a(os,{get activity(){return n().data},mutateCache:i=>console.log("mutate",i)})}}),null),d(l,a(x,{get when(){var i;return(i=r())==null?void 0:i.data},get children(){return a(H,{get each(){return r().data.activityReplies},children:i=>(()=>{var s=t0(),o=s.firstChild,c=o.nextSibling;return d(o,a(B,{get href(){return"/user/"+i.user.name},class:"message-card-profile-header",get children(){return[(()=>{var h=e0();return L(()=>G(h,"src",i.user.avatar.large)),h})(),N(()=>i.user.name)]}}),null),d(o,a(Gn,{get createdAt(){return i.createdAt}}),null),d(c,a(ss,{get children(){return i.text}})),s})()})}}),null),l})()}function r0(e){const t=ne(),n=Qt();return a(x,{get when(){return!n.search},get fallback(){return a(hn,{get href(){return"/search/"+t.type+n.search}})},get children(){return e.children}})}var a0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"fill=currentColor>'),i0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"fill=currentColor>'),l0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"fill=currentColor>');function aa(e){return F("score"in e,"Score is missing"),a(W,{get children(){return[a(M,{get when(){return e.score>=75},get children(){var t=a0();return L(()=>G(t,"class",`good ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=60},get children(){var t=i0();return L(()=>G(t,"class",`average ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=0},get children(){var t=l0();return L(()=>G(t,"class",`bad ${e.class||""}`)),t}})]}})}var s0=p("<label>"),o0=p("<p>"),c0=p("<input type=number inputmode=numeric min=0 max=10>"),d0=p("<input type=number inputmode=numeric min=0 max=100>"),u0=p("<input type=number inputmode=decimal min=0 max=10 step=.1>"),h0=p("<div class=score-star-input>"),g0=p("<div class=score-emoji-input>"),_u=p("<label class=radio-container><input type=radio class=radio>");function Vo(e){F(e.format,"Score format is missing"),F(e.onChange,"onChange is missing (give signal)");const t=Oe({name:"score",id:"score",value:0},e),[n]=oi(t,["id","name","value"]),r={onBeforeInput:l=>{var i;(i=l.data)!=null&&i.toLowerCase().includes("e")&&l.preventDefault()},onBlur:l=>l.target.value=n.value};return[a(x,{get when(){return e.label},get children(){return a(W,{get children(){return[a(M,{get when(){return e.format==="POINT_10"||e.format==="POINT_100"||e.format==="POINT_10_DECIMAL"},get children(){var l=s0();return d(l,()=>e.label),L(()=>G(l,"for",n.id)),l}}),a(M,{get when(){return e.format==="POINT_5"||e.format==="POINT_3"},get children(){var l=o0();return d(l,()=>e.label),l}})]}})}}),a(W,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){var l=c0();return Lt(l,Oe(n,r,{onChange:i=>{const s=Math.floor(Number(i.target.value)||0);e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),l}}),a(M,{get when(){return e.format==="POINT_100"},get children(){var l=d0();return Lt(l,Oe(n,r,{onChange:i=>{const s=Math.floor(Number(i.target.value)||0);e.onChange(Math.max(0,Math.min(s,100)))}}),!1,!1),l}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){var l=u0();return Lt(l,Oe(n,r,{onChange:i=>{const s=Number((Number(i.target.value)||0).toFixed(1));e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),l}}),a(M,{get when(){return e.format==="POINT_5"},get children(){var l=h0();return d(l,a(f0,Oe(n,{get onChange(){return e.onChange}}))),l}}),a(M,{get when(){return e.format==="POINT_3"},get children(){var l=g0();return d(l,a(m0,Oe(n,{get onChange(){return e.onChange}}))),l}})]}})]}function f0(e){return a(H,{each:[1,2,3,4,5],children:t=>(()=>{var n=_u(),r=n.firstChild;return r.$$click=l=>{e.value==l.target.value?(l.target.checked=!1,e.onChange(0)):e.onChange(+l.target.value)},r.value=t,d(n,a(ya,{class:"score-star"}),null),L(l=>{var i=t<=e.value,s=e.name,o=e.id;return i!==l.e&&n.classList.toggle("selected",l.e=i),s!==l.t&&G(r,"name",l.t=s),o!==l.a&&G(r,"id",l.a=o),l},{e:void 0,t:void 0,a:void 0}),L(()=>r.checked=e.value==t),n})()})}function m0(e){const t=["",0,60,80];return a(H,{each:[1,2,3],children:n=>(()=>{var r=_u(),l=r.firstChild;return l.$$click=i=>{e.value==i.target.value?(i.target.checked=!1,e.onChange(0)):e.onChange(+i.target.value)},l.value=n,d(r,a(aa,{get score(){return t[n]}}),null),L(i=>{var s=n==e.value,o=e.name,c=e.id;return s!==i.e&&r.classList.toggle("selected",i.e=s),o!==i.t&&G(l,"name",i.t=o),c!==i.a&&G(l,"id",i.a=c),i},{e:void 0,t:void 0,a:void 0}),L(()=>l.checked=e.value==n),r})()})}$e(["click"]);var p0=p("<form class=exit-media-editor method=dialog><button>Close"),v0=p("<img class=banner alt=Banner>"),$0=p('<div class="media-editor-input volume-progress"><label for=progress-volumes>Volume Progress</label><input type=number inputmode=numeric id=progress-volumes name=progressVolumes min=0>'),_0=p("<p class=advanced-scoring-header>Advanced scoring"),b0=p("<ul>"),y0=p("<hr>"),w0=p("<button type=button>Delete"),k0=p('<form method=dialog><header class=media-editor-header><img class=cover alt=Cover><h2 class="line-clamp header"></h2><div class=container><button type=submit>Save</button></div></header><div class=media-editor-body><div><div class="media-editor-input status"><label for=status>Status</label><select name=status id=status><option value=none disabled hidden>Select status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select></div><div class="media-editor-input score"></div><div class="media-editor-input progress"><label for=progress></label><input type=number inputmode=numeric id=progress name=progress min=0></div><div class="media-editor-input start-date"><label for=start-date>Start date</label><input type=date id=start-date name=startedAt></div><div class="media-editor-input finish-date"><label for=end-date>Finish date</label><input type=date id=end-date name=completedAt></div><div class="media-editor-input repeat"><label for=repeat></label><input type=number inputmode=numeric id=repeat name=repeat min=0></div><div class="media-editor-input notes"><label for=notes>Notes</label><textarea type=text id=notes placeholder=Notes... name=notes></textarea></div></div><div><h3>Custom Lists</h3><div><input type=checkbox name=hiddenFromStatusLists id=hide-from-status><label for=hide-from-status> Hide from status lists</label></div><div><input type=checkbox name=private id=private><label for=private> Private'),S0=p("<dialog class=media-editor-warning-dialog><p>Are you sure you want to delete this media entry</p><form method=dialog><button>Yes</button><button>No"),C0=p("<dialog class=media-editor>"),A0=p('<div class="media-editor-input advanced-score">'),x0=p("<li><input type=checkbox name=customLists><label> ");function T0(e,t){F(!t,"Should not be able to edit if not authenticated");const[n,r]=O(),[l,i]=O(),[s,o]=O(),[c,h]=O(),[u,f]=O(),[g,m]=O(),[y,v]=O(),[$,S]=O(),[C,w]=O(),[b,A]=O(),[k,_]=O(),[T,I]=O(),[E,P]=O(),[R,U]=O(),[V,X]=O(),[Y,K]=O(),[le,re]=O(),[Q,J]=O(),[pe,ve]=O();function fe(ee,z){je(()=>{var Ge,De,Fe,et,Pt,Mt,rt,kt,at,dt,Dt,ft;S(ee==null?void 0:ee.data.mediaListOptions.scoreFormat),o(()=>(z==null?void 0:z.type)==="ANIME"?ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoringEnabled:(z==null?void 0:z.type)==="MANGA"?ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoringEnabled:!1),h(()=>(z==null?void 0:z.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.advancedScoring)||[]:(z==null?void 0:z.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.advancedScoring)||[]:[]),f(()=>(z==null?void 0:z.type)==="ANIME"?(ee==null?void 0:ee.data.mediaListOptions.animeList.customLists)||[]:(z==null?void 0:z.type)==="MANGA"?(ee==null?void 0:ee.data.mediaListOptions.mangaList.customLists)||[]:[]),r(((Ge=z==null?void 0:z.mediaListEntry)==null?void 0:Ge.score)??""),i(((De=z==null?void 0:z.mediaListEntry)==null?void 0:De.advancedScores)??{}),v(((Fe=z==null?void 0:z.mediaListEntry)==null?void 0:Fe.status)??"none"),A(((et=z==null?void 0:z.mediaListEntry)==null?void 0:et.progress)??""),_(((Pt=z==null?void 0:z.mediaListEntry)==null?void 0:Pt.progressVolumes)??""),I((z==null?void 0:z.episodes)??(z==null?void 0:z.chapters)??null),P(ri((Mt=z==null?void 0:z.mediaListEntry)==null?void 0:Mt.startedAt)),U(ri((rt=z==null?void 0:z.mediaListEntry)==null?void 0:rt.completedAt)),X(((kt=z==null?void 0:z.mediaListEntry)==null?void 0:kt.repeat)??""),K(((at=z==null?void 0:z.mediaListEntry)==null?void 0:at.notes)||""),w((z==null?void 0:z.isFavourite)||!1),ve(((dt=z==null?void 0:z.mediaListEntry)==null?void 0:dt.private)||!1),J(((Dt=z==null?void 0:z.mediaListEntry)==null?void 0:Dt.hiddenFromStatusLists)||!1),m(((ft=z==null?void 0:z.mediaListEntry)==null?void 0:ft.customLists)||{})})}return fe(e,t),[{score:n,setScore:r,advancedScores:l,setAdvancedScores:i,advancedScoresEnabled:s,setAdvancedScoresEnabled:o,advancedScoring:c,setAdvancedScoring:h,customLists:u,setCustomLists:f,mediaCustomLists:g,setMediaCustomLists:m,status:y,setStatus:v,format:$,setFormat:S,progress:b,setProgress:A,volumeProgress:k,setvolumeProgress:_,maxProgress:T,setMaxProgress:I,startedAt:E,setStartedAt:P,completedAt:R,setCompletedAt:U,isFavourite:C,setIsFavourite:w,repeat:V,setRepeat:X,notes:Y,setNotes:K,like:le,setLike:re,hideFromStatus:Q,setHideFromStatus:J,mediaPrivate:pe,setMediaPrivate:ve},fe]}function I0(e){const[t,n]=O(void 0),[r,l]=O(void 0),{accessToken:i,authUserData:s}=ie(),[o,c]=T0();let h,u;const f=async m=>{var S,C,w,b,A,k,_,T,I,E,P,R,U,V,X,Y,K,le;const v=new FormData(m.currentTarget).entries().reduce((re,[Q,J])=>(Array.isArray(re[Q])?re[Q].push(J||null):Q in re?re[Q]=[re[Q],J||null]:re[Q]=J||null,re),{}),$={};if(Number.isNaN(+v.progress)===!1&&v.progress!=(((S=t().mediaListEntry)==null?void 0:S.progress)||0)&&($.progress=Number(v.progress)),Number.isNaN(+v.progressVolumes)===!1&&v.progressVolumes!=(((C=t().mediaListEntry)==null?void 0:C.progressVolumes)||0)&&($.progressVolumes=Number(v.progressVolumes)),Number.isNaN(+v.score)===!1&&v.score!=(((w=t().mediaListEntry)==null?void 0:w.score)||0)&&($.score=Number(v.score)),Number.isNaN(+v.repeat)===!1&&v.repeat!=(((b=t().mediaListEntry)==null?void 0:b.repeat)||0)&&($.repeat=Number(v.repeat)),o.advancedScoresEnabled()){const Q=o.advancedScoring().map((fe,ee)=>v["advanced-scores-"+ee]).map(fe=>Number(fe||0)),J=!Q.some(Number.isNaN),pe=Object.values(((A=t().mediaListEntry)==null?void 0:A.advancedScores)||{}),ve=Q.some((fe,ee)=>fe!=pe[ee]);J&&ve&&($.advancedScores=Q)}if(F(v.status!="none"||((k=t().mediaListEntry)==null?void 0:k.score)==null,"Replacing current status with default none value"),v.status=="none"||((_=t().mediaListEntry)==null?void 0:_.status)==v.status||($.status=v.status),(v.startedAt||"")!=ri((T=t().mediaListEntry)==null?void 0:T.startedAt)){const[re,Q,J]=v.startedAt.split("-");$.startedAt={year:re,month:Q,day:J}}if((v.completedAt||"")!=ri((I=t().mediaListEntry)==null?void 0:I.completedAt)){const[re,Q,J]=v.completedAt.split("-");$.completedAt={year:re,month:Q,day:J}}if(v.notes!=((E=t().mediaListEntry)==null?void 0:E.notes)&&($.notes=v.notes),v.customLists||(P=t().mediaListEntry)!=null&&P.customLists){const re=v.customLists||[],Q=Array.isArray(re)?re:[re];(Q.length>0&&((R=t().mediaListEntry)==null?void 0:R.customLists)==null||(U=t().mediaListEntry)!=null&&U.customLists&&Object.entries((V=t().mediaListEntry)==null?void 0:V.customLists).some(([pe,ve])=>Q.includes(pe)!==ve))&&($.customLists=Q)}if(v.hiddenFromStatusLists==="on"!=(((X=t().mediaListEntry)==null?void 0:X.hiddenFromStatusLists)??!1)&&($.hiddenFromStatusLists=v.hiddenFromStatusLists==="on"),v.private==="on"!=(((Y=t().mediaListEntry)==null?void 0:Y.private)??!1)&&($.private=v.private==="on"),m.submitter.type==="submit"&&Object.keys($).length>0){$.mediaId=t().id;for(const[Q,J]of Object.entries($))F(Number.isNaN(J)===!1,`Key "${Q}" is NaN`);const re=await de.anilist.mutateMedia(i(),$);re.status===200&&((le=(K=r())==null?void 0:K.mutateMedia)==null||le.call(K,re.data))}};async function g(m,y){F("id"in m,"Missing editor id"),je(()=>{n(m),l(y),c(s(),m)}),h.showModal();const v=await de.anilist.mediaListEntry(i(),m.id);je(()=>{n(v.data.data.Media),c(s(),v.data.data.Media)})}return a(kc.Provider,{value:{openEditor:g},get children(){return[(()=>{var m=C0(),y=h;return typeof y=="function"?ge(y,m):h=m,d(m,a(x,{get when(){return t()},get children(){return[p0(),(()=>{var v=k0(),$=v.firstChild,S=$.firstChild,C=S.nextSibling,w=C.nextSibling,b=w.firstChild,A=$.nextSibling,k=A.firstChild,_=k.firstChild,T=_.firstChild,I=T.nextSibling,E=I.firstChild,P=E.nextSibling,R=P.nextSibling,U=R.nextSibling,V=U.nextSibling,X=V.nextSibling,Y=X.nextSibling,K=_.nextSibling,le=K.nextSibling,re=le.firstChild,Q=re.nextSibling,J=le.nextSibling,pe=J.firstChild,ve=pe.nextSibling,fe=J.nextSibling,ee=fe.firstChild,z=ee.nextSibling,Ge=fe.nextSibling,De=Ge.firstChild,Fe=De.nextSibling,et=Ge.nextSibling,Pt=et.firstChild,Mt=Pt.nextSibling,rt=k.nextSibling,kt=rt.firstChild,at=kt.nextSibling,dt=at.firstChild,Dt=at.nextSibling,ft=Dt.firstChild;return v.addEventListener("submit",f),d($,a(x,{get when(){return t().bannerImage},get children(){var te=v0();return L(()=>G(te,"src",t().bannerImage)),te}}),S),d(C,()=>{var te;return(te=t().title)==null?void 0:te.userPreferred}),d(w,a(Nr,{get checked(){return o.isFavourite()},get idType(){return t().type},get variableId(){return t().id},get onChange(){return o.setIsFavourite},mutateCache:(te,Z)=>{var _e,ke;(ke=(_e=r())==null?void 0:_e.setIsFavourite)==null||ke.call(_e,te,Z)}}),b),I.addEventListener("change",te=>{o.setStatus(te.target.value),(te.target.value==="CURRENT"||te.target.value==="COMPLETED")&&o.startedAt()===""&&o.setStartedAt(new Date().toISOString().substring(0,10)),te.target.value==="COMPLETED"&&((o.progress()===""||o.progress()==0)&&o.maxProgress()>0&&o.setProgress(o.maxProgress()),(o.volumeProgress()===""||o.volumeProgress()==0)&&t().volumes>0&&o.setvolumeProgress(t().volumes),o.completedAt()===""&&o.setCompletedAt(new Date().toISOString().substring(0,10)))}),d(R,a(W,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:" Reading"}),a(M,{get when(){return t().type==="ANIME"},children:" Watching"})]}})),d(Y,a(W,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:"Rereading"}),a(M,{get when(){return t().type==="ANIME"},children:"Rewatching"})]}})),d(K,a(Vo,{get value(){return o.score()},label:"Score",get onChange(){return o.setScore},get format(){return o.format()}})),d(re,a(W,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Episode Progress"}),a(M,{get when(){return t().type==="MANGA"},children:"Chapter Progress"})]}})),Q.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Q.addEventListener("blur",te=>te.target.value=o.progress()),Q.addEventListener("change",te=>o.setProgress(Math.max(0,Math.min(+te.target.value,o.maxProgress()??1/0)))),d(k,a(x,{get when(){return t().type==="MANGA"},get children(){var te=$0(),Z=te.firstChild,_e=Z.nextSibling;return _e.$$beforeinput=ke=>{var it;(it=ke.data)!=null&&it.toLowerCase().includes("e")&&ke.preventDefault()},_e.addEventListener("blur",ke=>ke.target.value=o.volumeProgress()),_e.addEventListener("change",ke=>o.setvolumeProgress(Math.max(0,Math.min(+ke.target.value,t().volumes??1/0)))),L(()=>G(_e,"max",t().volumes)),L(()=>_e.value=o.volumeProgress()),te}}),J),ve.addEventListener("change",te=>o.setStartedAt(te.target.value)),z.addEventListener("change",te=>o.setCompletedAt(te.target.value)),d(De,a(W,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Total Rewatches"}),a(M,{get when(){return t().type==="MANGA"},children:"Total Rereads"})]}})),Fe.$$beforeinput=te=>{var Z;(Z=te.data)!=null&&Z.toLowerCase().includes("e")&&te.preventDefault()},Fe.addEventListener("blur",te=>te.target.value=o.repeat()),Fe.addEventListener("change",te=>o.setRepeat(Math.max(0,Math.min(+te.target.value,Number.MAX_SAFE_INTEGER)))),Mt.addEventListener("change",te=>o.setNotes(te.target.value)),d(k,a(x,{get when(){return N(()=>!!o.advancedScoresEnabled())()&&o.advancedScoring().length},get children(){return[_0(),a(H,{get each(){return o.advancedScoring()},children:(te,Z)=>(()=>{var _e=A0();return d(_e,a(Vo,{get value(){return o.advancedScores()[te]??""},get id(){return"advanced-score-"+Z()},get name(){return"advanced-scores-"+Z()},label:te,onChange:ke=>{o.setAdvancedScores(it=>{const _t={...it,[te]:ke};let Ie=0,Be=0;return Object.values(_t).forEach(lt=>{Ie+=lt>0,Be+=lt||0}),F(Ie!==0||Be===0,"Total is 0"),Number.isNaN(Be)===!1&&typeof Be=="number"&&Ie>0&&o.setScore(()=>{switch(o.format()){case"POINT_10":return Math.max(0,Math.min(Math.round(Be/Ie),10));case"POINT_100":return Math.max(0,Math.min(Math.round(Be/Ie),100));case"POINT_10_DECIMAL":return Math.max(0,Math.min(Number((Be/Ie).toFixed(1)),10));case"POINT_5":return Math.max(0,Math.min(Math.round(Be/Ie),5));case"POINT_3":return Math.max(0,Math.min(Math.round(Be/Ie),3));default:F(!1,`Format "${o.format()}" not found`)}}),_t})},get format(){return o.format()}})),_e})()})]}}),null),d(rt,a(x,{get when(){var te;return(te=o.customLists())==null?void 0:te.length},get children(){return[(()=>{var te=b0();return d(te,a(H,{get each(){return o.customLists()},children:(Z,_e)=>(()=>{var ke=x0(),it=ke.firstChild,_t=it.nextSibling;return _t.firstChild,it.addEventListener("change",Ie=>o.setMediaCustomLists(Be=>({...Be,[Z]:Ie.target.checked}))),it.value=Z,d(_t,Z,null),L(Ie=>{var Be="custom-list-"+_e(),lt="custom-list-"+_e();return Be!==Ie.e&&G(it,"id",Ie.e=Be),lt!==Ie.t&&G(_t,"for",Ie.t=lt),Ie},{e:void 0,t:void 0}),L(()=>{var Ie;return it.checked=(Ie=o.mediaCustomLists())==null?void 0:Ie[Z]}),ke})()})),te})(),y0()]}}),at),dt.addEventListener("change",te=>o.setHideFromStatus(te.target.checked)),ft.addEventListener("change",te=>o.setMediaPrivate(te.target.checked)),d(rt,a(x,{get when(){return t().mediaListEntry},get children(){var te=w0();return te.$$click=()=>u.showModal(),te}}),null),L(te=>{var it,_t;var Z=(it=t().coverImage)==null?void 0:it.large,_e="media-editor-input-grid "+((_t=t().type)==null?void 0:_t.toLowerCase())||"",ke=o.maxProgress();return Z!==te.e&&G(S,"src",te.e=Z),_e!==te.t&&Ut(k,te.t=_e),ke!==te.a&&G(Q,"max",te.a=ke),te},{e:void 0,t:void 0,a:void 0}),L(()=>I.value=o.status()),L(()=>Q.value=o.progress()),L(()=>ve.value=o.startedAt()),L(()=>z.value=o.completedAt()),L(()=>Fe.value=o.repeat()),L(()=>Mt.value=o.notes()),L(()=>dt.checked=o.hideFromStatus()),L(()=>ft.checked=o.mediaPrivate()),v})(),(()=>{var v=S0(),$=v.firstChild,S=$.nextSibling,C=S.firstChild,w=u;return typeof w=="function"?ge(w,v):u=v,C.$$click=async()=>{var b,A;h.close(),(A=(b=r())==null?void 0:b.deleteMedia)==null||A.call(b)},v})()]}})),m})(),N(()=>e.children)]}})}function ri(e){if(!e||!e.day||!e.month||!e.year)return"";const t=String(e.day).padStart(2,"0"),n=String(e.month).padStart(2,"0");return`${e.year}-${n}-${t}`}$e(["beforeinput","click"]);function E0(e){return new Worker("/legendary-octo-barnacle/branches/fix-log-out-when-token-is-invalid/assets/compare-media-list-BpF31zhq.js",{name:e==null?void 0:e.name})}var L0=p("<div class=score-component-container>");function vs(e){return a(x,{get when(){return e.score!==0},get children(){var t=L0();return d(t,a(W,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_100"},get children(){return[N(()=>e.score),"/100"]}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_5"},get children(){return[N(()=>e.score),"/5 ",a(ya,{class:"score-star"})]}}),a(M,{get when(){return e.format==="POINT_3"},get children(){return a(W,{get children(){return[a(M,{get when(){return e.score===1},get children(){return a(aa,{class:"score-emoji",score:0})}}),a(M,{get when(){return e.score===2},get children(){return a(aa,{class:"score-emoji",score:70})}}),a(M,{get when(){return e.score===3},get children(){return a(aa,{class:"score-emoji",score:80})}})]}})}})]}})),t}})}var P0=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z">');function ai(){return P0()}var M0=p("<ol><li><button>All "),D0=p("<option value>All formats"),R0=p("<option value>Any User Status"),N0=p("<option value>Any Status"),O0=p("<option value>All genres"),F0=p("<option value>All countries"),U0=p("<option value>All ratings"),B0=p("<option value=chapters>Chapters"),V0=p("<option value=episodes>Episodes"),G0=p("<option value=volumes>Volumes"),H0=p("<i>(default is all users)"),Y0=p("<button>Reset filters"),j0=p('<div class=pg-compare><div><ul class=pg-compare-users></ul></div><div class=pg-compare-filter-panel><input type=text placeholder=Search><select name=format><option value hidden>Format</option><option value=MOVIE>Movie</option><option value=MUSIC>Music</option><option value=ONA>Ona</option><option value=OVA>Ova</option><option value=SPECIAL>Special</option><option value=TV>TV</option><option value=TV_SHORT>TV short</option></select><select name=userStatus><option value hidden>User Status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select><select name=status><option value hidden>Status</option><option value=RELEASING>Releasing</option><option value=FINISHED>Finished</option><option value=NOT_YET_RELEASED>Not Yet Released</option><option value=CANCELLED>Cancelled</option></select><select name=genre><option value hidden>Genre</option><option value=Action>Action</option><option value=Adventure>Adventure</option><option value=Comedy>Comedy</option><option value=Drama>Drama</option><option value=Ecchi>Ecchi</option><option value=Fantasy>Fantasy</option><option value=Hentai>Hentai</option><option value=Horror>Horror</option><option value="Mahou Shoujo">Mahou Shoujo</option><option value=Mecha>Mecha</option><option value=Music>Music</option><option value=Mystery>Mystery</option><option value=Psychological>Psychological</option><option value=Romance>Romance</option><option value=Sci-Fi>Sci-Fi</option><option value="Slice of Life">Slice of Life</option><option value=Sports>Sports</option><option value=Supernatural>Supernatural</option><option value=Thriller>Thriller</option></select><select name=countryOfOrigin><option value hidden>Country</option><option value=CN>China</option><option value=JP>Japan</option><option value=KR>South Korea</option><option value=TW>Taiwan</option></select><select name=isAdult><option value hidden>Age rating</option><option value=false>R-17+</option><option value=true>R-18</option></select><input type=number name=year placeholder="Release year"max=9999 min=0><label for=repeat><input type=checkbox name=repeat id=repeat> </label><label for=missingScore><input type=checkbox name=missingScore id=missingScore> Allow missing scores</label><label for=reverse><input type=checkbox name=reverse id=reverse> Reverse order</label><select name=sort><option value=completedAt>Completed Date</option><option value=averageScore>Global Score</option><option value=updatedAt>Last updated</option><option value=popularity>Popularity</option><option value=releaseDate>Release Date</option><option value=repeat></option><option value=title>Title</option><option value=score>User score</option></select><label for=reviewsNeeded>Reviews needed: <input type=number inputmode=numeric min=1 name=reviewsNeeded id=reviewsNeeded><button class=help>?'),z0=p("<li><button> "),W0=p("<ol>"),q0=p('<form class=pg-compare-user-search><input type=search name=user id=user placeholder="Search users">'),K0=p('<li><img alt="Profile picture">'),J0=p('<p class=error>No user found with name: "<!>"'),X0=p("<img>"),Z0=p("<p>"),Q0=p("<label><input type=checkbox name=enable> Disable <button>?"),e2=p("<label><input type=checkbox name=enable> Filter out <button>?"),t2=p("<li><button>Remove"),n2=p("<p>Loading user data"),r2=p("<h1>Total <!> "),a2=p('<ol class="pg-compare-content grid-column-auto-fill">'),i2=p('<img loading=lazy class=bg inert alt="Background banner">',!0,!1,!1),Go=p("<div class=cp-card-repeat>"),l2=p('<img class=cover loading=lazy alt="Media cover">',!0,!1,!1),s2=p("<br>"),o2=p("<span>"),c2=p('<div class="footer flex-space-between"><span>'),d2=p('<div class=cover-wrapper><div class="header flex-space-between"><div class=score> '),u2=p("<div class=pg-compare-card-content><p class=title></p><ol class=pg-compare-media-users></ol><ul class=flex-bullet-separator>"),h2=p('<li class="pg-compare-media-card inline-container"><div class=wrapper>'),g2=p('<img class=profile alt="Profile picture">'),f2=p("<span class=status>"),Ho=p("<li>");const m2=()=>{const e=Zf(sessionStorage.getItem(window.location.href),0);return Array(e).fill({id:-1,coverImage:{}})};function p2(){const e=Qt(),[t,n]=Te(),r=ne(),[l,i]=We([]),[s,o]=We({}),[c,h]=O(m2()),u=Q=>{sessionStorage.setItem(window.location.href,Q.length),h(Q)},[f,g]=O([]),[m,y]=O([]),[v,$]=O(!0);q(oe(()=>t.user,Q=>{const J=fr(Q);i(Jt([...J],[]))}));const S=()=>t.search||"",C=()=>t.format||"",w=()=>t.reviewsNeeded||f().length,b=()=>t.status||"",A=()=>t.genre||"",k=()=>t.countryOfOrigin||"",_=()=>t.year||"",T=()=>t.private==="true",I=()=>t.notes==="true",E=()=>t.repeat==="true",P=()=>t.missingStart==="true",R=()=>t.missingScore!=="false",U=()=>t.reverse==="true",V=()=>t.sort||"score",X=()=>t.userStatus||"",Y=()=>{if(t.isAdult==="true")return!0;if(t.isAdult==="false")return!1};let K;function le(){if(!window.Worker)return;K=K instanceof Worker?K:new E0;const Q={includeKeys:f(),excludeKeys:m(),search:S(),format:C(),status:b(),genre:A(),reverse:U(),countryOfOrigin:k(),missingStart:P(),missingScore:R(),isAdult:Y(),year:+_()||void 0,private:T(),notes:I(),repeat:E(),reviewsNeeded:w(),sort:V(),type:r.type,userStatus:X()};K.postMessage(Q),$(!0),K.onmessage=J=>{if(J.data==="success"){const pe=Ze.user();pe.onsuccess=ve=>{const fe=ve.target.result,z=Ze.store(fe,"data","readonly").get("compare_list");z.onerror=()=>$(!1),z.onsuccess=Ge=>{$(!1),u(Ge.target.result||[])}}}else $(!1),console.error("Error")}}q(le),document.title=`Compare ${r.type} - LOB`;const re=pn();return a(xc.Provider,{value:{compareMediaList:c,includeKeys:f,setIncludeKeys:g,setExcludeKeys:y,users:s,storeUsers:o,loading:v},get children(){var Q=j0(),J=Q.firstChild,pe=J.firstChild,ve=J.nextSibling,fe=ve.firstChild,ee=fe.nextSibling,z=ee.firstChild,Ge=z.nextSibling,De=ee.nextSibling,Fe=De.firstChild,et=Fe.nextSibling,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=De.nextSibling,Dt=dt.firstChild,ft=Dt.nextSibling,te=dt.nextSibling,Z=te.firstChild,_e=Z.nextSibling,ke=te.nextSibling,it=ke.firstChild,_t=it.nextSibling,Ie=ke.nextSibling,Be=Ie.firstChild,lt=Be.nextSibling,Pn=Ie.nextSibling,Qn=Pn.nextSibling,er=Qn.firstChild;er.nextSibling;var tr=Qn.nextSibling,Or=tr.firstChild,Mn=tr.nextSibling,Dn=Mn.firstChild,st=Mn.nextSibling,sn=st.firstChild,nr=sn.nextSibling,Fr=nr.nextSibling,bi=Fr.nextSibling,Ur=bi.nextSibling,rr=Ur.nextSibling,yi=rr.nextSibling;yi.nextSibling;var Rn=st.nextSibling,wi=Rn.firstChild,on=wi.nextSibling,He=on.nextSibling;return He.firstChild,d(Q,a(v2,{}),J),d(pe,a(H,{each:l,children:he=>a($2,{name:he})})),fe.$$input=he=>n({search:he.target.value||void 0}),d(ve,a(x,{get when(){},get children(){var he=M0(),cn=he.firstChild,nn=cn.firstChild,Br=nn.firstChild;return nn.$$click=()=>re(""),d(nn,a(x,{get when(){return r.list===void 0},children:"> "}),Br),d(nn,()=>null.data.total,null),d(he,a(H,{get each(){return null.data.lists},children:Nn=>(()=>{var Vr=z0(),On=Vr.firstChild,St=On.firstChild;return On.$$click=()=>re(Nn.name),d(On,a(x,{get when(){return decodeURI(r.list)===Nn.name},children:"> "}),St),d(On,()=>Nn.name,St),d(On,()=>Nn.entries.length,null),Vr})()}),null),he}}),ee),ee.addEventListener("change",he=>n({format:he.target.value||void 0})),d(ee,a(x,{get when(){return C()},get children(){return D0()}}),Ge),De.addEventListener("change",he=>n({userStatus:he.target.value||void 0})),d(De,a(x,{get when(){return X()},get children(){return R0()}}),et),d(Pt,a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})),d(at,a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})),dt.addEventListener("change",he=>n({status:he.target.value||void 0})),d(dt,a(x,{get when(){return b()},get children(){return N0()}}),ft),te.addEventListener("change",he=>n({genre:he.target.value||void 0})),d(te,a(x,{get when(){return A()},get children(){return O0()}}),_e),ke.addEventListener("change",he=>n({countryOfOrigin:he.target.value||void 0})),d(ke,a(x,{get when(){return k()},get children(){return F0()}}),_t),Ie.addEventListener("change",he=>n({isAdult:he.target.value||void 0})),d(Ie,a(x,{get when(){return Y()!==void 0},get children(){return U0()}}),lt),Pn.$$input=he=>n({year:he.target.value||void 0}),er.addEventListener("change",he=>n({repeat:he.target.checked?"true":void 0})),d(Qn,a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatched"}),a(M,{get when(){return r.type==="manga"},children:"Reread"})]}}),null),Or.addEventListener("change",he=>n({missingScore:he.target.checked?void 0:"false"})),Dn.addEventListener("change",he=>n({reverse:he.target.checked?"true":void 0})),st.addEventListener("change",he=>n({sort:he.target.value==="score"?void 0:he.target.value})),d(st,a(x,{get when(){return r.type==="manga"},get children(){return B0()}}),sn),d(st,a(x,{get when(){return r.type==="anime"},get children(){return V0()}}),nr),d(rr,a(W,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatches"}),a(M,{get when(){return r.type==="manga"},children:"Rereads"})]}})),d(st,a(x,{get when(){return r.type==="manga"},get children(){return G0()}}),null),on.$$input=he=>n({reviewsNeeded:he.target.value==f().length?void 0:he.target.value}),on.$$beforeinput=he=>{var cn;(cn=he.data)!=null&&cn.toLowerCase().includes("e")&&he.preventDefault()},on.addEventListener("blur",he=>n({reviewsNeeded:Number(he.target.value)>=f().length?void 0:+he.target.value||""})),d(He,a(Tt,{tipPosition:"bottom",get children(){return["Count of how many users need to have the ",N(()=>r.type)," on their list ",H0()]}}),null),d(ve,a(W,{get children(){return a(M,{get when(){return new URLSearchParams(e.search).keys().some(he=>he!=="user")},get children(){var he=Y0();return he.$$click=()=>{n({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,reviewsNeeded:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0})},he.style.setProperty("background","var(--crimson-400)"),he}})}}),null),d(Q,a(_2,{}),null),L(he=>{var cn=f().length,nn=f().length+" (All)";return cn!==he.e&&G(on,"max",he.e=cn),nn!==he.t&&G(on,"placeholder",he.t=nn),he},{e:void 0,t:void 0}),L(()=>fe.value=S()),L(()=>ee.value=C()||""),L(()=>De.value=X()||""),L(()=>dt.value=b()||""),L(()=>te.value=A()||""),L(()=>ke.value=k()||""),L(()=>Ie.value=Y()===void 0?"":String(Y())),L(()=>Pn.value=_()),L(()=>er.checked=E()),L(()=>Or.checked=R()),L(()=>Dn.checked=U()),L(()=>st.value=V()),L(()=>on.value=w()),Q}})}function v2(){const[e,t]=O(""),[n,r]=O(0),[l,i]=O(void 0),{accessToken:s}=ie(),[o,{mutate:c}]=de.anilist.searchUsers(l,1,s),h=mn(i,300),[u,f]=Te();let g;q(oe(n,y=>{const v=g==null?void 0:g.querySelectorAll("li")[y],$=g==null?void 0:g.querySelector("ol");if(!v||!$)return;const{height:S,top:C}=$.getBoundingClientRect(),{top:w,bottom:b}=v.getBoundingClientRect(),A=b-C-S;A>0&&($.scrollTop+=A);const k=w-C;k<0&&($.scrollTop+=k)}));function m(y){y=(y==null?void 0:y.trim())||"",y&&f({user:Nf([...fr(u.user).add(y)])}),je(()=>{h(void 0),c(void 0),r(0),t("")})}return(()=>{var y=q0(),v=y.firstChild;y.addEventListener("submit",S=>{var C,w,b;S.preventDefault(),m(((b=(w=(C=o())==null?void 0:C.data.users)==null?void 0:w[n()])==null?void 0:b.name)||e())}),y.$$keydown=S=>{var w,b,A;const C=((A=(b=(w=o())==null?void 0:w.data)==null?void 0:b.users)==null?void 0:A.length)||0;C&&(S.key==="ArrowDown"?(S.preventDefault(),r(k=>(k+1)%C)):S.key==="ArrowUp"&&(S.preventDefault(),r(k=>(C+k-1)%C)))};var $=g;return typeof $=="function"?ge($,y):g=y,v.$$input=S=>{je(()=>{t(S.target.value),r(0),h(S.target.value.trim()||void 0),c(void 0)})},d(y,a(x,{get when(){return e()},get children(){var S=W0();return d(S,a(H,{get each(){var C;return(C=o())==null?void 0:C.data.users},children:(C,w)=>(()=>{var b=K0(),A=b.firstChild;return b.addEventListener("mouseenter",()=>r(w())),b.$$click=()=>m(C.name),d(b,()=>C.name,null),L(k=>{var _=n()===w(),T=C.avatar.large;return _!==k.e&&b.classList.toggle("selected",k.e=_),T!==k.t&&G(A,"src",k.t=T),k},{e:void 0,t:void 0}),b})()})),S}}),null),L(()=>v.value=e()),y})()}function $2(e){F(e.name,"Name is missing");const t=ne(),{setIncludeKeys:n,setExcludeKeys:r,storeUsers:l}=Bl(),[i,s]=Te(),{accessToken:o}=ie(),[c,h]=Ws(()=>!Ks(i.disabled,e.name)),[u,f]=Ws(()=>Ks(i.exclude,e.name)),[g]=de.anilist.mediaListByUserNameFetchOnce(()=>e.name,()=>t.type.toUpperCase(),o);function m(S,C){return c()&&u()===C?[...new Set([...S,g().cacheKey])]:S.filter(w=>w!==g().cacheKey)}function y(){n(S=>S.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),r(S=>S.filter(C=>{var w;return C!==((w=g())==null?void 0:w.cacheKey)})),s({user:qe(i.user).filter(S=>S!==e.name)})}q(()=>{g()&&(l(g().data.user.name,g().data.user),g.indexedDBClosed&&(n(S=>m(S,!1)),r(S=>m(S,!0))))});const v=S=>{h(!S.target.checked),s({disabled:Js(i.disabled,e.name,!S.target.checked)})},$=S=>{f(!S.target.checked),s({exclude:Js(i.exclude,e.name,!S.target.checked)})};return(()=>{var S=t2(),C=S.firstChild;return d(S,a(W,{get children(){return[a(M,{get when(){return g.error},get children(){var w=J0(),b=w.firstChild,A=b.nextSibling;return A.nextSibling,d(w,()=>e.name,A),w}}),a(M,{get when(){return g()||g.loading},get children(){return[a(x,{get when(){return g()},get fallback(){return a(Wn,{get children(){return a(Tt,{tipPosition:"right",get children(){return n2()}})}})},get children(){var w=X0();return L(b=>{var A=g().data.user.avatar.large,k=g().data.user.name+" profile picture";return A!==b.e&&G(w,"src",b.e=A),k!==b.t&&G(w,"alt",b.t=k),b},{e:void 0,t:void 0}),w}}),(()=>{var w=Z0();return d(w,a(x,{get when(){return g()},get fallback(){return e.name},get children(){return g().data.user.name}})),w})(),(()=>{var w=Q0(),b=w.firstChild,A=b.nextSibling,k=A.nextSibling;return k.firstChild,b.addEventListener("change",v),d(k,a(Tt,{tipPosition:"bottom",children:"Disabling a user removes them from search and filtering, just like removing them."}),null),L(()=>b.checked=!c()),w})(),(()=>{var w=e2(),b=w.firstChild,A=b.nextSibling,k=A.nextSibling;return k.firstChild,b.addEventListener("change",$),d(k,a(Tt,{tipPosition:"bottom",get children(){return["Filters out all ",N(()=>t.type)," from user ",N(()=>{var _,T,I;return((I=(T=(_=g())==null?void 0:_.data)==null?void 0:T.user)==null?void 0:I.name)||e.name})]}}),null),L(()=>b.checked=u()),w})()]}})]}}),C),C.$$click=()=>{var w;return y((w=g())==null?void 0:w.cacheKey)},L(w=>{var b=!c(),A=!!u();return b!==w.e&&S.classList.toggle("disabled",w.e=b),A!==w.t&&S.classList.toggle("exclude",w.t=A),w},{e:void 0,t:void 0}),S})()}function _2(){const{compareMediaList:e,loading:t,includeKeys:n}=Bl(),[r]=Te(),l=ne();return[(()=>{var i=r2(),s=i.firstChild,o=s.nextSibling;return o.nextSibling,d(i,()=>l.type,o),d(i,()=>e().length,null),i})(),(()=>{var i=a2();return d(i,a(Wn,{}),null),d(i,a(x,{get when(){return e()},keyed:!0,get children(){return a(w2,{})}}),null),L(()=>i.classList.toggle("loading",!!t())),i})(),a(x,{get when(){return e().length===0},get children(){return a(W,{fallback:"No content",get children(){return[a(M,{get when(){return t()},children:"Loading content"}),a(M,{get when(){return!r.user},children:"No users selected"}),a(M,{get when(){return n().length===0},children:"All users are disabled"})]}})}})]}const[b2,y2]=We([]);function w2(){const{compareMediaList:e,users:t}=Bl(),n=ne(),r=[];function l(c){r.push(c)}En(()=>{r.forEach(c=>o.observe(c))}),ze(()=>{o.disconnect()});const i={rootMargin:"500px"},s=c=>{for(const h of c)y2(h.target.dataset.index,h.isIntersecting)},o=new IntersectionObserver(s,i);return a(H,{get each(){return e()},children:(c,h)=>(()=>{var u=h2(),f=u.firstChild;return ge(l,u,()=>!0),d(f,a(x,{get when(){return b2[h()]&&c.id!==-1},get children(){return[a(x,{get when(){return c.bannerImage},get children(){var g=i2();return L(()=>G(g,"src",c.bannerImage)),g}}),(()=>{var g=d2(),m=g.firstChild,y=m.firstChild,v=y.firstChild;return d(m,a(x,{get when(){return c.repeat},get children(){var $=Go();return d($,a(Tt,{tipPosition:"right",get children(){return["Compined ",N(()=>n.type==="anime"?"rewatches":"rereads")," ",N(()=>c.repeat)]}}),null),d($,()=>c.repeat,null),d($,a(ai,{}),null),$}}),y),d(y,a(Tt,{tipPosition:"right",children:"Global average score"}),v),d(y,a(ya,{}),v),d(y,()=>c.averageScore/10||"N/A",null),d(g,a(B,{class:"cover-link",get href(){return Ve(c)},get children(){var $=l2();return L(()=>G($,"src",c.coverImage.large)),$}}),null),d(g,a(x,{get when(){return c.episodes||c.chapters||c.volumes||c.score},get children(){var $=c2(),S=$.firstChild;return d(S,a(W,{get children(){return[a(M,{get when(){return n.type==="anime"},get children(){return a(x,{get when(){return c.episodes},get children(){return["Ep ",N(()=>c.episodes)]}})}}),a(M,{get when(){return n.type==="manga"},get children(){return[a(x,{get when(){return c.chapters},get children(){return["Ch ",N(()=>c.chapters)]}}),s2(),a(x,{get when(){return c.volumes},get children(){return["Vol ",N(()=>c.volumes)]}})]}})]}})),d($,a(x,{get when(){return c.score},get children(){var C=o2();return d(C,()=>Math.round(c.score*100)/100,null),d(C,a(Tt,{tipPosition:"right",children:"Users average score"}),null),C}}),null),$}}),null),L(()=>G(g,"href",Ve(c))),g})(),(()=>{var g=u2(),m=g.firstChild,y=m.nextSibling,v=y.nextSibling;return d(m,()=>c.title.userPreferred),d(y,a(H,{get each(){return c.mediaEntries},children:$=>(()=>{var S=Ho();return d(S,a(B,{get href(){return"/user/"+$.name},class:"name",get children(){return[(()=>{var C=g2();return L(()=>G(C,"src",t[$.name].avatar.large)),C})(),N(()=>$.name)]}}),null),d(S,a(x,{get when(){return $.status!=="COMPLETED"},get children(){var C=f2();return d(C,()=>Bf($.status,n.type)),C}}),null),d(S,a(x,{get when(){return $.repeat},get children(){var C=Go();return d(C,()=>$.repeat,null),d(C,a(ai,{}),null),C}}),null),d(S,a(vs,{get score(){return $.score},get format(){return t[$.name].mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),S})()})),d(v,a(x,{get when(){var $;return($=Object.entries(jn.ani.media).find(([,S])=>S.api===c.format))==null?void 0:$[0]},children:$=>(()=>{var S=Ho();return d(S,a(W,{get children(){return[a(M,{get when(){return c.countryOfOrigin!=="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()+"&country="+c.countryOfOrigin},get children(){return[N(()=>Ir(c.format))," (",N(()=>Jl(c.countryOfOrigin)),")"]}})}}),a(M,{get when(){return c.countryOfOrigin==="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()},get children(){return Ir(c.format)}})}})]}})),S})()}),null),d(v,a(W,{get children(){return[a(M,{get when(){return n.type==="manga"},get children(){return a(W,{get children(){return[a(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return a(B,{get href(){return"/search/manga?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){return n.type==="anime"},get children(){return a(W,{get children(){return[a(M,{get when(){return c.seasonYear&&c.season},get children(){return a(B,{get href(){return"/search/anime/"+c.season.toLowerCase()+"-"+c.seasonYear},get children(){return[N(()=>Ke(c.season))," ",N(()=>c.seasonYear)]}})}}),a(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return a(B,{get href(){return"/search/anime?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}}),null),g})()]}})),L(g=>{var m=h(),y=c.coverImage.color;return m!==g.e&&G(u,"data-index",g.e=m),y!==g.t&&((g.t=y)!=null?u.style.setProperty("--color",y):u.style.removeProperty("--color")),g},{e:void 0,t:void 0}),u})()})}$e(["input","click","beforeinput","keydown"]);var k2=p("<button>Watch trailer"),S2=p("<iframe frameborder=0 allowfullscreen>"),C2=p("<dialog class=cp-trailer-dialog><div class=wrapper><form method=dialog class=close><button>Close trailer");function bu(e){const[t,n]=O(!1);let r;return a(x,{get when(){return e.id},get children(){return[(()=>{var l=k2();return l.$$click=()=>{r.showModal(),n(!0)},l})(),(()=>{var l=C2(),i=l.firstChild,s=i.firstChild;l.$$click=c=>c.target===r&&r.close();var o=r;return typeof o=="function"?ge(o,l):r=l,l.addEventListener("close",()=>n(!1)),d(i,a(x,{get when(){return t()},get children(){return a(W,{get children(){return a(M,{get when(){return e.site==="youtube"},get children(){var c=S2();return L(()=>G(c,"src","https://www.youtube-nocookie.com/embed/"+e.id+"?enablejsapi=1&wmode=opaque&autoplay=1")),c}})}})}}),s),l})()]}})}$e(["click"]);var A2=p("<div data-k-0bff354a class=scores><div data-k-0bff354a><p data-k-0bff354a>Mean</p><span data-k-0bff354a></span></div><div data-k-0bff354a><p data-k-0bff354a>Average</p><span data-k-0bff354a></span></div><p data-k-0bff354a class=anilist-users> Users</p><div data-k-0bff354a><p data-k-0bff354a>MAL</p><span data-k-0bff354a></span></div><p data-k-0bff354a> Users");function yu(){const{anilistData:e,jikanData:t}=vn();return(()=>{var n=A2(),r=n.firstChild,l=r.firstChild,i=l.nextSibling,s=r.nextSibling,o=s.firstChild,c=o.nextSibling,h=s.nextSibling,u=h.firstChild,f=h.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling,v=y.firstChild;return d(i,a(x,{get when(){var $,S;return((S=($=e())==null?void 0:$.data)==null?void 0:S.meanScore)>0},fallback:"N/A",get children(){var $,S;return((((S=($=e())==null?void 0:$.data)==null?void 0:S.meanScore)||0)/10).toFixed(1)}})),d(c,a(x,{get when(){var $,S;return((S=($=e())==null?void 0:$.data)==null?void 0:S.averageScore)>0},fallback:"N/A",get children(){var $,S;return((((S=($=e())==null?void 0:$.data)==null?void 0:S.averageScore)||0)/10).toFixed(1)}})),d(h,a(x,{get when(){var $,S,C;return(C=(S=($=e())==null?void 0:$.data)==null?void 0:S.stats.scoreDistribution)==null?void 0:C.reduce((w,b)=>b.amount+w,0)},fallback:"-",get children(){var $,S,C;return ha((C=(S=($=e())==null?void 0:$.data)==null?void 0:S.stats.scoreDistribution)==null?void 0:C.reduce((w,b)=>b.amount+w,0))}}),u),d(m,a(W,{fallback:"N/A",get children(){return[a(M,{get when(){return t.loading},children:"..."}),a(M,{get when(){var $;return(($=t())==null?void 0:$.data.score)>0},get children(){return(t().data.score||0).toFixed(2)}})]}})),d(y,a(x,{get when(){var $,S;return(S=($=t())==null?void 0:$.data)==null?void 0:S.scored_by},fallback:"-",get children(){return ha(t().data.scored_by)}}),v),n})()}var x2=p('<svg class=svg-external-source xmlns=http://www.w3.org/2000/svg viewBox="4 3 17 17"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7">');function wu(){return x2()}var T2=p('<svg aria-hidden=true class=svg-link focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">');function I2(){return T2()}var E2=p("<li data-k-e748b7cf><a data-k-e748b7cf target=_blank>"),L2=p("<div data-k-e748b7cf class=external><h2 data-k-e748b7cf>External links</h2><ul data-k-e748b7cf>"),P2=p('<img data-k-e748b7cf alt="Site favicon.">'),M2=p("<sup data-k-e748b7cf>"),D2=p("<li data-k-e748b7cf class=cp-external-link><div data-k-e748b7cf class=icon></div><span data-k-e748b7cf><a data-k-e748b7cf target=_blank>");function ku(e){return a(ct,{fallback:"External links error",get children(){return a(x,{get when(){var t;return e.hastag||((t=e.externalLinks)==null?void 0:t.length)},get children(){var t=L2(),n=t.firstChild,r=n.nextSibling;return d(r,a(x,{get when(){return e.hashtag},get children(){var l=E2(),i=l.firstChild;return d(i,()=>e.hashtag),L(()=>G(i,"href",`https://nitter.net/search?q=${e.hashtag.replaceAll("#","%23")}`)),l}}),null),d(r,a(H,{get each(){return e.externalLinks},children:l=>(()=>{var i=D2(),s=i.firstChild,o=s.nextSibling,c=o.firstChild;return d(s,a(x,{get when(){return l.icon},get fallback(){return a(I2,{})},get children(){var h=P2();return L(()=>G(h,"src",l.icon)),h}})),d(c,()=>l.site||l.name),d(o,a(x,{get when(){return l.language},get children(){var h=M2();return d(h,a(W,{get fallback(){return l.language},get children(){return[a(M,{get when(){return l.language==="Japanese"},children:"JP"}),a(M,{get when(){return l.language==="English"},children:"EN"})]}})),h}}),null),d(o,a(x,{get when(){return l.notes},get children(){return[" (",N(()=>l.notes),")"]}}),null),L(h=>{var u=l.color,f=l.url;return u!==h.e&&((h.e=u)!=null?s.style.setProperty("background",u):s.style.removeProperty("background")),f!==h.t&&G(c,"href",h.t=f),h},{e:void 0,t:void 0}),i})()}),null),t}})}})}var R2=p("<span class=visually-hidden>Switch to anilist mode"),N2=p("<div><h2>Studios</h2><ol>"),O2=p("<div><h2>Producers</h2><ol>"),F2=p("<aside class=left><img alt=Cover><div class=cp-media-api-switcher><a class=active target=_black><span class=visually-hidden>Go to MyAnimeList"),U2=p("<li>Source: "),B2=p("<div class=header><h1></h1><ul class=flex-bullet-separator><li></li><li></li><li></li></ul><ul><li>Members: </li><li>Ranked: #</li><li>Popularity: #"),V2=p("<div class=pg-media-info-jikan><div class=body>"),Yo=p("<li><a target=_black>"),G2=p("<li>Author<!>: "),H2=p("<a>"),Y2=p("<div class=pg-media-jikan-desc>"),j2=p("<div><strong>Background"),z2=p("<div class=relations><h2>Relations</h2><ol class=grid-column-auto-fill>"),W2=p("<h2>Characters"),jo=p("<div><ol class=grid-column-auto-fill>"),q2=p("<h2>Staff"),K2=p('<p class="name line-clamp">'),J2=p("<p class=type> (<!>)"),X2=p("<li>");function Z2(e){const t=ne(),{accessToken:n}=ie(),r=Me(Vc,()=>t.type,()=>t.id),l=Tn({"only-if-cached":()=>gi()}),[i]=xn(l,r),s=Me(Fc,n,()=>t.type,()=>t.id),[o,{mutateBoth:c}]=nt(s),[h,u]=O();L(oe(o,g=>{var m;u(((m=g==null?void 0:g.data)==null?void 0:m.isFavourite)??!1)}));const f=(g,m)=>{var v,$,S,C;const y=m[($=(v=o())==null?void 0:v.data)==null?void 0:$.type]??null;((C=(S=o())==null?void 0:S.data)==null?void 0:C.id)===y&&(u(g),c(w=>(w.data.isFavourite=g,w)))};return a(ct,{fallback:"Jikan media error",get children(){return a(Vl.Provider,{value:{anilistData:o,jikanData:i},get children(){var g=V2(),m=g.firstChild;return d(g,a(x,{get when(){return i()},get children(){var y=F2(),v=y.firstChild,$=v.nextSibling,S=$.firstChild;return S.firstChild,d($,a(x,{get when(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get children(){return a(B,{get href(){var C,w,b,A;return"/ani/"+t.type+"/"+((w=(C=o())==null?void 0:C.data)==null?void 0:w.id)+"/"+zn((A=(b=o())==null?void 0:b.data)==null?void 0:A.title.userPreferred)},get children(){return[R2(),a(hs,{})]}})}}),S),d(S,a(gs,{}),null),d(S,a(wu,{}),null),d(y,a(yu,{}),null),d(y,a(Nr,{get checked(){return h()},onChange:u,get idType(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.type},get variableId(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.id},get anilistValue(){var C,w;return(w=(C=o())==null?void 0:C.data)==null?void 0:w.favourites},get jikanValue(){var C;return(C=i())==null?void 0:C.data.favorites},mutateCache:f}),null),d(y,a(bu,{get id(){var C,w;return(w=(C=i())==null?void 0:C.data.trailer)==null?void 0:w.youtube_id},site:"youtube"}),null),d(y,a(x,{get when(){var C,w;return(w=(C=i())==null?void 0:C.data.studios)==null?void 0:w.length},get children(){var C=N2(),w=C.firstChild,b=w.nextSibling;return d(b,a(H,{get each(){var A;return(A=i())==null?void 0:A.data.studios},children:A=>(()=>{var k=Yo(),_=k.firstChild;return d(_,()=>A.name),L(()=>G(_,"href",A.url)),k})()})),C}}),null),d(y,a(x,{get when(){var C,w;return(w=(C=i())==null?void 0:C.data.producers)==null?void 0:w.length},get children(){var C=O2(),w=C.firstChild,b=w.nextSibling;return d(b,a(H,{get each(){var A;return(A=i())==null?void 0:A.data.producers},children:A=>(()=>{var k=Yo(),_=k.firstChild;return d(_,()=>A.name),L(()=>G(_,"href",A.url)),k})()})),C}}),null),d(y,a(ku,{get externalLinks(){var C;return(C=i())==null?void 0:C.data.external}}),null),L(C=>{var A;var w=i().data.images.webp.large_image_url,b=(A=i())==null?void 0:A.data.url;return w!==C.e&&G(v,"src",C.e=w),b!==C.t&&G(S,"href",C.t=b),C},{e:void 0,t:void 0}),y}}),m),d(m,a(x,{get when(){return i()},get children(){var y=B2(),v=y.firstChild,$=v.nextSibling,S=$.firstChild,C=S.nextSibling,w=C.nextSibling,b=$.nextSibling,A=b.firstChild;A.firstChild;var k=A.nextSibling;k.firstChild;var _=k.nextSibling;return _.firstChild,d(v,()=>i().data.title),d(S,a(W,{get children(){return[a(M,{get when(){return N(()=>!!i().data.year)()&&i().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+i().data.year+"&season="+i().data.season+"&malSearch=true"},get children(){return[N(()=>Qs(i().data.season))," ",N(()=>i().data.year)]}})}}),a(M,{get when(){return i().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?season="+i().data.season+"&malSearch=true"},get children(){return Qs(i().data.season)}})}}),a(M,{get when(){return i().data.year},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+i().data.year+"&malSearch=true"},get children(){return i().data.year}})}}),a(M,{get when(){var T,I,E,P,R,U;return((E=(I=(T=i().data.aired)==null?void 0:T.prop)==null?void 0:I.from)==null?void 0:E.year)||((U=(R=(P=i().data.published)==null?void 0:P.prop)==null?void 0:R.from)==null?void 0:U.year)},children:T=>a(B,{get href(){return"/search/"+t.type+"?year="+T()+"&malSearch=true"},get children(){return T()}})}),a(M,{get when(){var T,I,E,P,R,U;return((E=(I=(T=i().data.aired)==null?void 0:T.prop)==null?void 0:I.to)==null?void 0:E.year)||((U=(R=(P=i().data.published)==null?void 0:P.prop)==null?void 0:R.to)==null?void 0:U.year)},children:T=>a(B,{get href(){return"/search/"+t.type+"?year="+T()+"&malSearch=true"},get children(){return T()}})}),a(M,{get when(){return i().data.status==Dc},get children(){return a(B,{get href(){return"/search/"+t.type+"/tba"},children:"TBA"})}})]}})),d(C,a(B,{get href(){return"/search/"+t.type+"?format="+i().data.type.toLowerCase()+"&malSearch=true"},get children(){return i().data.type}})),d(w,()=>{var T;return em((T=i())==null?void 0:T.data.status)}),d(b,a(x,{get when(){var T;return(T=i())==null?void 0:T.data.source},get children(){var T=U2();return T.firstChild,d(T,a(B,{get href(){return"/search/"+t.type+"?source="+i().data.source},get children(){var I;return(I=i())==null?void 0:I.data.source}}),null),T}}),A),d(A,()=>ha(i().data.members||0)||"N/A",null),d(k,()=>i().data.rank||"N/A",null),d(_,()=>i().data.popularity||"N/A",null),d(b,a(x,{get when(){var T;return(T=i().data.authors)==null?void 0:T.length},children:T=>(()=>{var I=G2(),E=I.firstChild,P=E.nextSibling;return P.nextSibling,d(I,()=>rm(T()),P),d(I,a(H,{get each(){return i().data.authors},children:(R,U)=>[(()=>{var V=H2();return d(V,()=>R.name),L(()=>G(V,"href",R.url)),V})(),a(x,{get when(){return U()<T()-1},children:" & "})]}),null),I})()}),null),y}}),null),d(m,()=>e.children,null),g}})}})}function Q2(){const e=ne(),{jikanData:t}=vn(),n=Me(Gc,()=>e.type,()=>e.id),r=Tn({"only-if-cached":()=>gi()||t.loading}),[l]=xn(r,n),i=Me(Hc,()=>e.type,()=>e.id),s=Tn({"only-if-cached":()=>Pf()||l.loading}),[o]=xn(s,i);return[a(x,{get when(){return t()},get children(){return[a(x,{get when(){return t().data.synopsis},get children(){var c=Y2();return d(c,a(ti,{get text(){return t().data.synopsis},singleLineBreaks:!0})),c}}),a(x,{get when(){return t().data.background},get children(){var c=j2();return c.firstChild,d(c,a(ti,{get text(){return t().data.background}}),null),c}}),a(x,{get when(){var c;return(c=t().data.relations)==null?void 0:c.length},get children(){var c=z2(),h=c.firstChild,u=h.nextSibling;return d(u,a(H,{get each(){return t().data.relations},children:f=>a(H,{get each(){return f.entry},children:g=>(()=>{var m=X2();return d(m,a(B,{class:"item",get href(){return yd(g.type,{mal_id:g.mal_id,title:g.name})},get children(){return[(()=>{var y=K2();return d(y,()=>g.name),y})(),(()=>{var y=J2(),v=y.firstChild,$=v.nextSibling;return $.nextSibling,d(y,()=>f.relation,v),d(y,()=>Er(g.type),$),y})()]}})),m})()})})),c}}),a(x,{get when(){return l()},get children(){var c=jo(),h=c.firstChild;return d(c,a(B,{href:"characters",get children(){return W2()}}),h),d(h,a(H,{get each(){return l().data.slice(0,6)},children:({voice_actors:u,...f})=>a(Xd,Oe({get voiceActor(){return Of(u,({language:g})=>g===Mc)}},f))})),c}}),a(x,{get when(){return o()},get children(){var c=jo(),h=c.firstChild;return d(c,a(B,{href:"staff",get children(){return q2()}}),h),d(h,a(H,{get each(){return o().data.slice(0,6)},children:({person:u,positions:f})=>a(us,{staff:u,positions:f})})),c}}),N(()=>console.log("jikan",t()))]}}),N(()=>console.log("characters",l()))]}let El,Ll;function ew({target:e}){const t=e.querySelector("[data-tooltip-positions]");t&&(El=t,ii(t))}function Su(){Ll&&ii(Ll),El&&ii(El)}let el;function Cu({target:e}){if(e===el||!e)return;el=e;const t=e.matches("[data-tooltip-trigger]")?e:e.closest("[data-tooltip-trigger]");if(!t)return;const n=t.querySelector("[data-tooltip-positions]");let r=0;l();function l(){t.matches(":hover")?(Ll=n,ii(n)):(r++<500||el!==e)&&requestAnimationFrame(l)}}function ii(e){const t=e.dataset.tooltipPositions.split(" "),n=e.closest("[data-tooltip-wrapper]"),r=n==null?void 0:n.getBoundingClientRect(),l=document.body.getBoundingClientRect(),i=e.classList.value;for(const s of t){e.classList.remove(...t),e.classList.add(s);let o=e.getBoundingClientRect();if(!(r&&(o.left<r.left||o.right>r.right||o.top<r.top||o.bottom>r.bottom))&&!(o.left<0||o.right>l.width||o.top<0||o.bottom>l.height))return}e.classList=i}window.addEventListener("focusin",ew);window.addEventListener("pointermove",Cu);window.addEventListener("pointerdown",Cu);window.addEventListener("scroll",Su,{passive:!0});window.addEventListener("resize",Su,{passive:!0});var tw=p("<select>"),nw=p("<div><ol>"),rw=p("<option>");function aw(){const e=ne(),{jikanData:t}=vn(),n=Me(Gc,()=>e.type,()=>e.id),r=Tn({"only-if-cached":()=>gi()||t.loading}),[l]=xn(r,n),[i,s]=ql(Mc),o=N(()=>{var f;const c=new Set,h=(f=l())==null?void 0:f.data;if(!(h!=null&&h.length))return[];h.forEach(g=>{var m;(m=g.voice_actors)==null||m.forEach(y=>c.add(y.language))});const u=[...c].sort();return s(g=>c.has(g)?g:u[0]),u});return a(ct,{fallback:"MAL characters error",get children(){return a(x,{get when(){return t()},get children(){return a(x,{get when(){return l()},get children(){var c=nw(),h=c.firstChild;return d(c,a(x,{get when(){return o().length},get children(){var u=tw();return u.addEventListener("change",f=>s(f.target.value)),d(u,a(H,{get each(){return o()},children:f=>(()=>{var g=rw();return g.value=f,d(g,f),g})()})),L(()=>u.value=i()),u}}),h),d(h,a(H,{get each(){return l().data},children:({voice_actors:u,...f})=>a(Xd,Oe({get voiceActor(){return u==null?void 0:u.find(g=>g.language===i())},get language(){return i()}},f))})),L(()=>h.className=`grid-column-auto-fill ${e.type||""}`),c}})}})}})}var iw=p("<div><ol class=grid-column-auto-fill>");function lw(){const e=ne(),{jikanData:t}=vn(),n=Me(Hc,$a,()=>e.id),r=Tn({"only-if-cached":()=>gi()||t.loading}),[l]=xn(r,n);return a(ct,{fallback:"MAL staff page error",get children(){return a(x,{get when(){return t()},get children(){return a(x,{get when(){return l()},get children(){var i=iw(),s=i.firstChild;return d(s,a(H,{get each(){return l().data},children:({person:o,positions:c})=>a(us,{staff:o,positions:c})})),i}})}})}})}var zo=p('<ol data-k-eb389524 class="grid-column-auto-fill card">'),sw=p("<ol data-k-eb389524 class=grid-column-auto-fill>"),ow=p('<div data-k-eb389524 class="page-normal pg-jikan-character"><div data-k-eb389524 class=header><img data-k-eb389524 alt="Character profile."><div data-k-eb389524 class=grid><div data-k-eb389524><h1 data-k-eb389524></h1><p data-k-eb389524></p></div></div><div data-k-eb389524>'),cw=p("<details data-k-eb389524 open><summary data-k-eb389524><h2 data-k-eb389524>");function dw(){const e=ne(),t=Me(Sg,()=>e.id),[n]=nt(t);return L(()=>{var l,i;const r=(i=(l=n())==null?void 0:l.data)==null?void 0:i.name;r&&(document.title=r)}),a(ct,{fallback:"Jikan character error",get children(){return a(x,{get when(){return n()},get children(){var r=ow(),l=r.firstChild,i=l.firstChild,s=i.nextSibling,o=s.firstChild,c=o.firstChild,h=c.nextSibling,u=s.nextSibling;return d(c,()=>n().data.name),d(h,()=>Df(n().data.name_kanji,n().data.nicknames).join(", ")),d(s,a(Nr,{get jikanValue(){return n().data.favorites}}),null),d(u,a(ti,{get text(){return n().data.about},singleLineBreaks:!0})),d(r,a(tl,{title:"Anime",get children(){var f=zo();return d(f,a(H,{get each(){return n().data.anime},children:g=>a(kl,{type:"anime",get media(){return g.anime}})})),f}}),null),d(r,a(tl,{title:"Manga",get children(){var f=zo();return d(f,a(H,{get each(){return n().data.manga},children:g=>a(kl,{type:"manga",get media(){return g.manga}})})),f}}),null),d(r,a(tl,{title:"Voice actors",get children(){var f=sw();return d(f,a(H,{get each(){return n().data.voices},children:g=>a(us,{get staff(){return g.person},get positions(){return[g.language]}})})),f}}),null),L(()=>G(i,"src",n().data.images.webp.image_url)),r}})}})}function tl(e){return(()=>{var t=cw(),n=t.firstChild,r=n.firstChild;return d(r,()=>e.title),d(t,()=>e.children,null),t})()}var uw=p("<div data-k-47610970><h3 data-k-47610970>Activity</h3><div data-k-47610970 class=activity-history-container><ol data-k-47610970 class=activity-history-header-list></ol><ol data-k-47610970 class=activity-history-list>"),hw=p("<li data-k-47610970 class=activity-history-header>"),gw=p("<li data-k-47610970 class=activity-item>"),fw=p("<p data-k-47610970>"),mw=p("<p data-k-47610970>Amount: ");function pw(e){const t=vw()/1e3,n=N(()=>{var h,u,f;const i=new Date/1e3,s=[];(h=e.history)==null||h.forEach((g,m,y)=>{var $;const v=g.date-Qf(($=y[m-1])==null?void 0:$.date,t-ir);if(!(g.date<t||g.date>i+ir)){for(let S=Math.floor(v/ir)-1;S>0;S--)s.push({date:g.date-ir*S});s.push(g)}});const o=(f=(u=e.history)==null?void 0:u.at(-1))==null?void 0:f.date,c=Math.floor((i-o)/ir);for(let g=1;g<c;g++)s.push({date:o+ir*g});return s}),r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return a(x,{get when(){return e.history.at(-1).date>t},get children(){var i=uw(),s=i.firstChild,o=s.nextSibling,c=o.firstChild,h=c.nextSibling;return d(c,a(H,{each:r,children:(u,f)=>(()=>{var g=hw();return d(g,()=>Ff(r,f()+Au)),g})()})),d(h,a(H,{get each(){return n()},children:u=>(()=>{var f=gw();return d(f,a(l,{get date(){return u.date*1e3},get amount(){return u.amount}})),L(()=>G(f,"data-level",u.level)),f})()})),i}});function l(i){const s=o=>{if(o<(t+5184e3)*1e3)return"right";if(o>(t+10368e3)*1e3)return"left"};return a(Tt,{get tipPosition(){return s(i.date)},get children(){return[(()=>{var o=fw();return d(o,()=>vd(i.date)),o})(),(()=>{var o=mw();return o.firstChild,d(o,()=>i.amount||0,null),o})()]}})}}const Au=1,vw=()=>{const[e]=new Date().toISOString().split("T"),t=new Date(`${e}T00:00`);return t.setDate(t.getDate()-182),t.setDate(t.getDate()-t.getDay()+Au),t.getTime()};var $w=p("<p>"),_w=p("<p> (fancy)"),bw=p("<p> (extra fancy)"),yw=p("<div class=user-favourites><h3>Favourite animes</h3><ol class=grid-reel-auto-fill>"),ww=p("<div class=user-favourites><h3>Favourite manga</h3><ol class=grid-reel-auto-fill>"),kw=p("<div class=user-favourites><h3>Favourite characters</h3><ol class=grid-reel-auto-fill>"),Sw=p("<div class=user-favourites><h3>Favourite staff</h3><ol class=grid-reel-auto-fill>"),Cw=p("<div class=user-favourites-studio><h3>Favourite studio</h3><ol>"),Aw=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total anime</p></div><div class=profile-progress-item><p class=header></p><p>Days watched</p></div><div class=profile-progress-item><p class=header></p><p>Episodes watched</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),xw=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total manga</p></div><div class=profile-progress-item><p class=header></p><p>Chapters read</p></div><div class=profile-progress-item><p class=header></p><p>Volumes read</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),Tw=p("<div class=user-profile-overview-body><div class=user-info-container></div><div class=user-activity-container><div class=user-profile-progress></div><div class=user-profile-genres></div><div class=user-profile-activity>"),Fa=p("<img alt=Cover>"),ur=p("<li class=item>"),Iw=p("<div class=user-genres-overview><h3></h3><ol>"),Ew=p("<span>%");function Lw(){const{user:e}=tt(),{accessToken:t}=ie(),[n,{mutateCache:r}]=de.anilist.activityByUserId(()=>e().id||void 0,t);return(()=>{var l=Tw(),i=l.firstChild,s=i.nextSibling,o=s.firstChild,c=o.nextSibling,h=c.nextSibling;return d(i,a(W,{get children(){return[a(M,{get when(){return e().donatorTier===1},get children(){var u=$w();return d(u,()=>e().donatorBadge),u}}),a(M,{get when(){return e().donatorTier===2},get children(){var u=_w(),f=u.firstChild;return d(u,()=>e().donatorBadge,f),u}}),a(M,{get when(){return e().donatorTier===3},get children(){var u=bw(),f=u.firstChild;return d(u,()=>e().donatorBadge,f),u}})]}}),null),d(i,a(pw,{get history(){var u;return((u=e().stats)==null?void 0:u.activityHistory)||[]}}),null),d(i,a(x,{get when(){return e().favourites.anime.edges.length},get children(){var u=yw(),f=u.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.anime.edges},children:m=>(()=>{var y=ur();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Fa();return L(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),u}}),null),d(i,a(x,{get when(){return e().favourites.manga.edges.length},get children(){var u=ww(),f=u.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.manga.edges},children:m=>(()=>{var y=ur();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Fa();return L(()=>G(v,"src",m.node.coverImage.large)),v}})),y})()})),u}}),null),d(i,a(x,{get when(){return e().favourites.characters.edges.length},get children(){var u=kw(),f=u.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.characters.edges},children:m=>(()=>{var y=ur();return d(y,a(B,{get href(){return"/ani/character/"+m.node.id+"/"+Je(m.node.name.userPreferred)},get children(){var v=Fa();return L(()=>G(v,"src",m.node.image.large)),v}})),y})()})),u}}),null),d(i,a(x,{get when(){return e().favourites.staff.edges.length},get children(){var u=Sw(),f=u.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.staff.edges},children:m=>(()=>{var y=ur();return d(y,a(B,{get href(){return"/ani/staff/"+m.node.id+"/"+Je(m.node.name.userPreferred)},get children(){var v=Fa();return L(()=>G(v,"src",m.node.image.large)),v}})),y})()})),u}}),null),d(i,a(x,{get when(){return e().favourites.studios.edges.length},get children(){var u=Cw(),f=u.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.studios.edges},children:m=>(()=>{var y=ur();return d(y,a(B,{get href(){return"/ani/studio/"+m.node.id+"/"+Je(m.node.name)},get children(){return m.node.name}})),y})()})),u}}),null),d(o,a(x,{get when(){return e().statistics.anime.count},get children(){var u=Aw(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,S=v.nextSibling,C=S.firstChild;return d(g,()=>ye(e().statistics.anime.count)),d(y,()=>(e().statistics.anime.minutesWatched/60/24).toFixed(1)),d($,()=>ye(e().statistics.anime.episodesWatched)),d(C,()=>e().statistics.anime.meanScore),u}}),null),d(o,a(x,{get when(){return e().statistics.manga.count},get children(){var u=xw(),f=u.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,S=v.nextSibling,C=S.firstChild;return d(g,()=>ye(e().statistics.manga.count)),d(y,()=>ye(e().statistics.manga.chaptersRead)),d($,()=>ye(e().statistics.manga.volumesRead)),d(C,()=>e().statistics.manga.meanScore),u}}),null),d(c,a(Wo,{title:"Anime genre overview",type:"anime",get genres(){return e().statistics.anime.genrePreview},get total(){return e().statistics.anime.count}}),null),d(c,a(Wo,{title:"Manga genre overview",type:"manga",get genres(){return e().statistics.manga.genrePreview},get total(){return e().statistics.manga.count}}),null),d(h,a(H,{get each(){var u;return(u=n())==null?void 0:u.data.data.Page.activities},children:u=>a(os,{activity:u,mutateCache:r,hideProfile:!0,small:!0})})),l})()}function Wo(e){F(e.genres,"Genres missing"),F(e.title,"Title missing");const{user:t}=tt();return a(x,{get when(){return e.total},get children(){var n=Iw(),r=n.firstChild,l=r.nextSibling;return d(r,()=>e.title),d(l,a(H,{get each(){return e.genres},children:i=>(()=>{var s=ur();return d(s,a(B,{get href(){return"/user/"+t().name+"/"+e.type+"?genre="+i.genre},get children(){return[N(()=>i.genre)," ",(()=>{var o=Ew(),c=o.firstChild;return d(o,()=>Math.round(i.count/e.total*100),c),o})()]}})),s})()})),n}})}function Pw(e){return new Worker("/legendary-octo-barnacle/branches/fix-log-out-when-token-is-invalid/assets/user-media-list-O67hlifX.js",{name:e==null?void 0:e.name})}var Mw=p("<button data-k-cd7ed032>+");function nl(e){const[t,n]=O(e.entry[e.progressKey]),{triggerProgressIncrease:r,isOwnProfile:l}=Ul();return q(oe(()=>e.entry,i=>n(i[e.progressKey]),{defer:!0})),[N(()=>e.label)," ",N(t),a(x,{get when(){return t()<e.entry.media[e.maxProgressKey]},get children(){return["/",N(()=>e.entry.media[e.maxProgressKey])]}}),a(x,{get when(){return l()},get children(){return a(x,{get when(){return e.entry.media[e.maxProgressKey]===null||t()<e.entry.media[e.maxProgressKey]},get children(){var i=Mw();return i.$$click=s=>{s.preventDefault(),n(o=>{const c=Math.min(e.entry.media[e.maxProgressKey]||o+1,o+1);return r(e.entry.media.id,c,e.progressKey),c})},i}})}})]}$e(["click"]);var Dw=p("<br>"),Rw=p("<p>");function Nw(e){return(()=>{var t=Rw();return d(t,a(W,{get children(){return[a(M,{get when(){return e.entry.media.type==="ANIME"},get children(){return a(nl,Oe(e,{label:"Ep",progressKey:"progress",maxProgressKey:"episodes"}))}}),a(M,{get when(){return e.entry.media.type==="MANGA"},get children(){return[a(nl,Oe(e,{label:"Ch",progressKey:"progress",maxProgressKey:"chapters"})),Dw(),a(nl,Oe(e,{label:"Vol",progressKey:"progressVolumes",maxProgressKey:"volumes"}))]}})]}})),t})()}var Ow=p("<div data-k-406f27d4>"),xu=p("<h2 data-k-406f27d4>"),Tu=p("<ol data-k-406f27d4 class=user-profile-media-list-grid>"),Fw=p('<div data-k-406f27d4 class="badge repeat">'),Uw=p('<div data-k-406f27d4 class="badge notes"><svg data-k-406f27d4 aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path data-k-406f27d4 fill=currentColor d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z">'),Bw=p("<p data-k-406f27d4 class=adult-warning>18+"),Vw=p("<div data-k-406f27d4 class=container><img data-k-406f27d4 class=cover alt=Cover.><div data-k-406f27d4 class=card-header></div><div data-k-406f27d4 class=card-footer><p data-k-406f27d4></p><div data-k-406f27d4 class=scores>"),Iu=p("<li data-k-406f27d4 class=card>");function Gw(e){const[t,n]=We({}),r=ne(),{user:l}=tt(),{openEditor:i}=Fl(),{isOwnProfile:s}=Ul(),o=h=>{for(const u of h)n(u.target.dataset.list,u.target.dataset.index,u.isIntersecting)},c=new IntersectionObserver(o,{rootMargin:"500px"});return ze(()=>{c.disconnect()}),q(()=>{var h,u;(h=e.listData())!=null&&h.data&&(Eu[r.name]=(u=e.listData())==null?void 0:u.data.lists.map(f=>({name:f.name,entries:new Int8Array(f.entries.length)})))}),(()=>{var h=Ow();return d(h,a(x,{get when(){var u;return(u=e.listData())==null?void 0:u.data},get fallback(){return a(Hw,{})},get children(){return a(H,{get each(){return e.listData().data.lists},children:u=>(n(u.name,{}),a(x,{get when(){return N(()=>!!u.entries.length)()&&(!r.list||decodeURI(r.list)===u.name)},get children(){return[(()=>{var f=xu();return d(f,()=>u.name),f})(),(()=>{var f=Tu();return d(f,a(H,{get each(){return u.entries},children:(g,m)=>{let y;return En(()=>c.observe(y)),ze(()=>c.unobserve(y)),(()=>{var v=Iu(),$=y;return typeof $=="function"?ge($,v):y=v,d(v,a(x,{get when(){return t[u.name][m()]},get children(){return a(B,{class:"clean-link",get href(){return Ve(g.media)},get children(){var S=Vw(),C=S.firstChild,w=C.nextSibling,b=w.nextSibling,A=b.firstChild,k=A.nextSibling;return d(w,a(x,{get when(){return g.repeat},get children(){var _=Fw();return d(_,()=>g.repeat,null),d(_,a(ai,{}),null),L(()=>G(_,"label","Rewatched "+g.repeat+" times")),_}}),null),d(w,a(x,{get when(){return g.notes},get children(){var _=Uw();return L(()=>G(_,"label",g.notes)),_}}),null),d(b,a(x,{get when(){return g.media.isAdult},get children(){return Bw()}}),A),d(A,()=>g.media.title.userPreferred),d(k,a(Nw,{entry:g}),null),d(k,a(vs,{get score(){return g.score},get format(){return l().mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),d(S,a(x,{get when(){return s()},get children(){return a(Hd,{big:!0,label:"Edit media",onClick:_=>{_.preventDefault(),i({...g.media,mediaListEntry:g},{mutateMedia:T=>{T=Vf(g,T),e.mutateMediaListCache(I=>{function E(P,R){const U=I.data.lists.findIndex(X=>X.name===P&&X.isCustomList===R);U===-1&&I.data.lists.push({name:P,isCustomList:!1,isCompletedList:!1,entries:[]});const V=I.data.lists.at(U);V.entries.push(T),e.listData().data.indecies[g.media.id].push([U===-1?I.data.lists.length-1:U,V.entries.length-1])}if(e.listData().data.indecies[g.media.id].forEach(([P,R])=>{I.data.lists[P].entries.splice(R,1)}),e.listData().data.indecies[g.media.id]=[],!T.hiddenFromStatusLists){const P=Pu(T.status,r.type);E(P,!1)}for(const[P,R]of Object.entries(T.customLists??{}))R&&E(P,!0);return I},e.updateListInfo)},deleteMedia:()=>{e.mutateMediaListCache(T=>(e.listData().data.indecies[g.media.id].forEach(([I,E])=>{T.data.lists[I].entries.splice(E,1)}),T),e.updateListInfo)}})},get children(){return a(Gd,{})}})}}),null),L(()=>G(C,"src",g.media.coverImage.large)),S}})}})),L(S=>{var C=m(),w=u.name;return C!==S.e&&G(v,"data-index",S.e=C),w!==S.t&&G(v,"data-list",S.t=w),S},{e:void 0,t:void 0}),v})()}})),f})()]}}))})}})),h})()}const Eu={};function Hw(){const e=ne(),t=N(()=>Eu[e.name]??[]);return a(H,{get each(){return t()},children:n=>a(x,{get when(){return N(()=>!!n.entries.length)()&&(!e.list||decodeURI(e.list)===n.name)},get children(){return[(()=>{var r=xu();return d(r,()=>n.name),r})(),(()=>{var r=Tu();return d(r,a(H,{get each(){return n.entries},children:()=>Iu()})),r})()]}})})}var Yw=p("<ol><li><button>All "),jw=p("<li><button> ");function zw(e){const t=Lu(),n=ne();return a(x,{get when(){var r;return(r=e.listData())==null?void 0:r.data},get children(){var r=Yw(),l=r.firstChild,i=l.firstChild,s=i.firstChild;return i.$$click=()=>t(""),d(i,a(x,{get when(){return n.list===void 0},children:"> "}),s),d(i,()=>e.listData().data.total,null),d(r,a(H,{get each(){return e.listData().data.lists},children:o=>(()=>{var c=jw(),h=c.firstChild,u=h.firstChild;return h.$$click=()=>t(o.name),d(h,a(x,{get when(){return decodeURI(n.list)===o.name},children:"> "}),u),d(h,()=>o.name,u),d(h,()=>o.entries.length,null),c})()}),null),r}})}$e(["click"]);var Ww=p("<option data-k-4ded799d value>All formats"),qw=p("<option data-k-4ded799d value>Any User Status"),Kw=p("<option data-k-4ded799d value>Any Status"),Jw=p("<option data-k-4ded799d value>All genres"),Xw=p("<option data-k-4ded799d value>All countries"),Zw=p("<option data-k-4ded799d value>All ratings"),Qw=p("<option data-k-4ded799d value>All studios"),ek=p("<select data-k-4ded799d name=studio><option data-k-4ded799d value hidden>Studio"),tk=p("<option data-k-4ded799d value>All tags"),nk=p("<label data-k-4ded799d for=private><input data-k-4ded799d type=checkbox name=private id=private> Private"),rk=p("<button data-k-4ded799d>Compare with your list"),ak=p("<button data-k-4ded799d>Open in compare page"),ik=p('<div data-k-4ded799d class=user-profile-media-list-search><input data-k-4ded799d type=text placeholder=Search><select data-k-4ded799d name=format><option data-k-4ded799d value hidden>Format</option><option data-k-4ded799d value=MOVIE>Movie</option><option data-k-4ded799d value=MUSIC>Music</option><option data-k-4ded799d value=ONA>Ona</option><option data-k-4ded799d value=OVA>Ova</option><option data-k-4ded799d value=SPECIAL>Special</option><option data-k-4ded799d value=TV>TV</option><option data-k-4ded799d value=TV_SHORT>TV short</option></select><select data-k-4ded799d name=userStatus><option data-k-4ded799d value hidden>User Status</option><option data-k-4ded799d value=COMPLETED>Completed</option><option data-k-4ded799d value=CURRENT></option><option data-k-4ded799d value=DROPPED>Dropped</option><option data-k-4ded799d value=PAUSED>Paused</option><option data-k-4ded799d value=PLANNING>Planning</option><option data-k-4ded799d value=REPEATING></option></select><select data-k-4ded799d name=status><option data-k-4ded799d value hidden>Status</option><option data-k-4ded799d value=RELEASING>Releasing</option><option data-k-4ded799d value=FINISHED>Finished</option><option data-k-4ded799d value=NOT_YET_RELEASED>Not Yet Released</option><option data-k-4ded799d value=CANCELLED>Cancelled</option></select><select data-k-4ded799d name=genre><option data-k-4ded799d value hidden>Genre</option><option data-k-4ded799d value=Action>Action</option><option data-k-4ded799d value=Adventure>Adventure</option><option data-k-4ded799d value=Comedy>Comedy</option><option data-k-4ded799d value=Drama>Drama</option><option data-k-4ded799d value=Ecchi>Ecchi</option><option data-k-4ded799d value=Fantasy>Fantasy</option><option data-k-4ded799d value=Hentai>Hentai</option><option data-k-4ded799d value=Horror>Horror</option><option data-k-4ded799d value="Mahou Shoujo">Mahou Shoujo</option><option data-k-4ded799d value=Mecha>Mecha</option><option data-k-4ded799d value=Music>Music</option><option data-k-4ded799d value=Mystery>Mystery</option><option data-k-4ded799d value=Psychological>Psychological</option><option data-k-4ded799d value=Romance>Romance</option><option data-k-4ded799d value=Sci-Fi>Sci-Fi</option><option data-k-4ded799d value="Slice of Life">Slice of Life</option><option data-k-4ded799d value=Sports>Sports</option><option data-k-4ded799d value=Supernatural>Supernatural</option><option data-k-4ded799d value=Thriller>Thriller</option></select><select data-k-4ded799d name=countryOfOrigin><option data-k-4ded799d value hidden>Country</option><option data-k-4ded799d value=CN>China</option><option data-k-4ded799d value=JP>Japan</option><option data-k-4ded799d value=KR>South Korea</option><option data-k-4ded799d value=TW>Taiwan</option></select><select data-k-4ded799d name=isAdult><option data-k-4ded799d value hidden>Age rating</option><option data-k-4ded799d value=false>R-17+</option><option data-k-4ded799d value=true>R-18</option></select><select data-k-4ded799d name=tag><option data-k-4ded799d value hidden>Tag</option></select><input data-k-4ded799d type=number placeholder="Release year"max=9999 min=0><label data-k-4ded799d for=notes><input data-k-4ded799d type=checkbox name=notes id=notes> Notes</label><label data-k-4ded799d for=repeat><input data-k-4ded799d type=checkbox name=repeat id=repeat> </label><label data-k-4ded799d for=missingStart><input data-k-4ded799d type=checkbox name=missingStart id=missingStart> Missing start date</label><label data-k-4ded799d for=missingScore><input data-k-4ded799d type=checkbox name=missingScore id=missingScore> Missing score</label><label data-k-4ded799d for=reverse><input data-k-4ded799d type=checkbox name=reverse id=reverse> Reverse order</label><select data-k-4ded799d name=sort><option data-k-4ded799d value=score>Score</option><option data-k-4ded799d value=title>Title</option><option data-k-4ded799d value=progress>Progress</option><option data-k-4ded799d value=updatedAt>Last Updated</option><option data-k-4ded799d value=startedAt>Start Date</option><option data-k-4ded799d value=completedAt>Completed Date</option><option data-k-4ded799d value=releaseDate>Release Date</option><option data-k-4ded799d value=averageScore>Average Score</option><option data-k-4ded799d value=popularity>Popularity</option><option data-k-4ded799d value=repeat>'),qo=p("<option data-k-4ded799d>"),lk=p("<button data-k-4ded799d>Remove filters"),sk=p("<button data-k-4ded799d>Back to home");function ok(e){const t=Lu(),n=Qt(),{authUserData:r}=ie(),{isOwnProfile:l}=Ul(),{user:i}=tt(),s=ne();return(()=>{var c=ik(),h=c.firstChild,u=h.nextSibling,f=u.firstChild,g=f.nextSibling,m=u.nextSibling,y=m.firstChild,v=y.nextSibling,$=v.nextSibling,S=$.nextSibling,C=S.nextSibling,w=C.nextSibling,b=w.nextSibling,A=m.nextSibling,k=A.firstChild,_=k.nextSibling,T=A.nextSibling,I=T.firstChild,E=I.nextSibling,P=T.nextSibling,R=P.firstChild,U=R.nextSibling,V=P.nextSibling,X=V.firstChild,Y=X.nextSibling,K=V.nextSibling;K.firstChild;var le=K.nextSibling,re=le.nextSibling,Q=re.firstChild,J=re.nextSibling,pe=J.firstChild;pe.nextSibling;var ve=J.nextSibling,fe=ve.firstChild,ee=ve.nextSibling,z=ee.firstChild,Ge=ee.nextSibling,De=Ge.firstChild,Fe=Ge.nextSibling,et=Fe.firstChild,Pt=et.nextSibling,Mt=Pt.nextSibling,rt=Mt.nextSibling,kt=rt.nextSibling,at=kt.nextSibling,dt=at.nextSibling,Dt=dt.nextSibling,ft=Dt.nextSibling,te=ft.nextSibling;return h.$$input=Z=>e.setSearchParams({search:Z.target.value||void 0}),d(c,a(zw,{get listData(){return e.listData}}),u),u.addEventListener("change",Z=>e.setSearchParams({format:Z.target.value||void 0})),d(u,a(x,{get when(){return e.format()},get children(){return Ww()}}),g),m.addEventListener("change",Z=>e.setSearchParams({userStatus:Z.target.value||void 0})),d(m,a(x,{get when(){return e.userStatus()},get children(){return qw()}}),v),d($,a(W,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Watching"}),a(M,{get when(){return s.type==="manga"},children:"Reading"})]}})),d(b,a(W,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatching"}),a(M,{get when(){return s.type==="manga"},children:"Rereading"})]}})),A.addEventListener("change",Z=>e.setSearchParams({status:Z.target.value||void 0})),d(A,a(x,{get when(){return e.status()},get children(){return Kw()}}),_),T.addEventListener("change",Z=>e.setSearchParams({genre:Z.target.value||void 0})),d(T,a(x,{get when(){return e.genre()},get children(){return Jw()}}),E),P.addEventListener("change",Z=>e.setSearchParams({countryOfOrigin:Z.target.value||void 0})),d(P,a(x,{get when(){return e.countryOfOrigin()},get children(){return Xw()}}),U),V.addEventListener("change",Z=>e.setSearchParams({isAdult:Z.target.value||void 0})),d(V,a(x,{get when(){return e.isAdult()!==void 0},get children(){return Zw()}}),Y),d(c,a(x,{get when(){return s.type==="anime"},get children(){var Z=ek();return Z.firstChild,Z.addEventListener("change",_e=>e.setSearchParams({studio:_e.target.value||void 0})),d(Z,a(x,{get when(){return e.studio()},get children(){return Qw()}}),null),d(Z,a(H,{get each(){var _e,ke;return(ke=(_e=e.listData())==null?void 0:_e.data)==null?void 0:ke.studios},children:_e=>(()=>{var ke=qo();return ke.value=_e,d(ke,_e),L(()=>ke.selected=_e==e.studio()),ke})()}),null),L(()=>Z.value=e.studio()),Z}}),K),K.addEventListener("change",Z=>e.setSearchParams({tag:Z.target.value||void 0})),d(K,a(x,{get when(){return e.tag()},get children(){return tk()}}),null),d(K,a(H,{get each(){var Z,_e;return(_e=(Z=e.listData())==null?void 0:Z.data)==null?void 0:_e.tags},children:Z=>(()=>{var _e=qo();return _e.value=Z,d(_e,Z),L(()=>_e.selected=Z==e.tag()),_e})()}),null),le.$$input=Z=>e.setSearchParams({year:Z.target.value||void 0}),d(c,a(x,{get when(){return l()},get children(){var Z=nk(),_e=Z.firstChild;return _e.addEventListener("change",ke=>e.setSearchParams({private:ke.target.checked?"true":void 0})),L(()=>_e.checked=e.privateFilter()),Z}}),re),Q.addEventListener("change",Z=>e.setSearchParams({notes:Z.target.checked?"true":void 0})),pe.addEventListener("change",Z=>e.setSearchParams({repeat:Z.target.checked?"true":void 0})),d(J,a(W,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatched"}),a(M,{get when(){return s.type==="manga"},children:"Reread"})]}}),null),fe.addEventListener("change",Z=>e.setSearchParams({missingStart:Z.target.checked?"true":void 0})),z.addEventListener("change",Z=>e.setSearchParams({missingScore:Z.target.checked?"true":void 0})),De.addEventListener("change",Z=>e.setSearchParams({reverse:Z.target.checked?"true":void 0})),Fe.addEventListener("change",Z=>e.setSearchParams({sort:Z.target.value==="score"?void 0:Z.target.value})),d(te,a(W,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatches"}),a(M,{get when(){return s.type==="manga"},children:"Rereads"})]}})),d(c,a(W,{get children(){return[a(M,{get when(){var Z,_e;return N(()=>!l())()&&((_e=(Z=r())==null?void 0:Z.data)==null?void 0:_e.name)},get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+i().name+"&user="+r().data.name},get children(){return rk()}})}}),a(M,{when:!0,get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+i().name},get children(){return ak()}})}})]}}),null),d(c,a(o,{}),null),L(()=>h.value=e.search()),L(()=>u.value=e.format()||""),L(()=>m.value=e.userStatus()||""),L(()=>A.value=e.status()||""),L(()=>T.value=e.genre()),L(()=>P.value=e.countryOfOrigin()||""),L(()=>V.value=e.isAdult()===void 0?"":String(e.isAdult())),L(()=>K.value=e.tag()),L(()=>le.value=e.year()),L(()=>Q.checked=e.notesFilter()),L(()=>pe.checked=e.rewatchedFilter()),L(()=>fe.checked=e.missingStartFilter()),L(()=>z.checked=e.missingScoreFilter()),L(()=>De.checked=e.reverse()),L(()=>Fe.value=e.sort()),c})();function o(){return a(W,{get children(){return[a(M,{get when(){return n.search},get children(){var c=lk();return c.$$click=()=>{e.setSearchParams({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0,studio:void 0,tag:void 0})},c.style.setProperty("background","skyblue"),c}}),a(M,{get when(){return s.list},get children(){var c=sk();return c.$$click=()=>{t("")},c.style.setProperty("background","lime"),c}})]}})}}$e(["input","click"]);var ck=p("<div data-k-45f62037 class=user-profile-media-list-body>");const Lu=()=>{const e=pn(),{user:t}=tt(),n=ne();return r=>{e(`/user/${t().name}/${n.type}${r?"/"+r:""}${location.search}`,{replace:!0})}};function Ko(){const{user:e}=tt(),t=ne(),{accessToken:n,authUserData:r}=ie(),l=N(()=>kg({token:n(),name:e().name,type:t.type})),i=Tn({default:()=>Ja()>2}),[s,{mutateCache:o}]=xn(i,l),[c,h]=Te(),[u,f]=O({});let g;q(oe(e,le=>{le&&(document.title=`${le.name} ${t.type} - LOB`)})),document.title="Authentication - LOB";const m=le=>{h(le,{replace:!0})},y=()=>c.search||"",v=()=>c.format||"",$=()=>c.status||"",S=()=>c.genre||"",C=()=>c.countryOfOrigin||"",w=()=>{if(c.isAdult==="true")return!0;if(c.isAdult==="false")return!1},b=()=>c.year||"",A=()=>c.private==="true",k=()=>c.notes==="true",_=()=>c.repeat==="true",T=()=>c.missingStart==="true",I=()=>c.missingScore==="true",E=()=>c.reverse==="true",P=()=>c.sort||"score",R=()=>c.userStatus||"",U=()=>c.studio||"",V=()=>c.tag||"",X=_a(async(le,re,Q)=>{F(Q,"Progress key is undefined");const J=await de.anilist.mutateMedia(n(),{mediaId:le,[Q]:re});J.status===200&&o(pe=>{function ve(fe,ee){const z=pe.data.lists.findIndex(De=>De.name===fe&&De.isCustomList===ee);z===-1&&pe.data.lists.push({name:fe,isCustomList:!1,isCompletedList:!1,entries:[]});const Ge=pe.data.lists.at(z);Ge.entries.push(J.data),u().data.indecies[le].push([z===-1?pe.data.lists.length-1:z,Ge.entries.length-1])}if(u().data.indecies[le].forEach(([fe,ee])=>{pe.data.lists[fe].entries.splice(ee,1)}),u().data.indecies[le]=[],!J.data.hiddenFromStatusLists){const fe=Pu(J.data.status,t.type);ve(fe,!1)}for(const[fe,ee]of Object.entries(J.data.customLists??{}))ee&&ve(fe,!0);return pe})},250,2),Y=()=>{var le,re;if(window.Worker&&((le=s())!=null&&le.data)){g=g instanceof Worker?g:new Pw;const Q={data:(re=s())==null?void 0:re.data,search:y(),format:v(),status:$(),genre:S(),reverse:E(),countryOfOrigin:C(),missingStart:T(),missingScore:I(),isAdult:w(),year:+b()||void 0,private:A(),notes:k(),repeat:_(),sort:P(),studio:U(),type:t.type,userStatus:R(),tag:V()};g.postMessage(Q),g.onmessage=f}};q(Y),ze(()=>{g instanceof Worker&&g.terminate()});function K(){var le;return e().id===((le=r())==null?void 0:le.data.id)}return a(Ac.Provider,{value:{triggerProgressIncrease:X,isOwnProfile:K},get children(){var le=ck();return d(le,a(ok,{listData:u,setSearchParams:m,search:y,format:v,status:$,genre:S,countryOfOrigin:C,isAdult:w,year:b,privateFilter:A,notesFilter:k,rewatchedFilter:_,missingStartFilter:T,missingScoreFilter:I,reverse:E,sort:P,userStatus:R,studio:U,tag:V}),null),d(le,a(Gw,{listData:u,mutateMediaListCache:o,updateListInfo:Y}),null),le}})}function Pu(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return Ke(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:F(!1,"Unkown status: "+e)}}var dk=p("<button data-k-1fe26ca9 class=cp-delete-favourite>Delete");function Kr(e){const{authUserData:t,accessToken:n}=ie(),{user:r}=tt();return F(e.onClick,"onClick is missing"),F(e.mutate,"mutate is missing"),a(x,{get when(){var l;return r().id===((l=t())==null?void 0:l.data.id)},get children(){var l=dk();return l.$$click=async i=>{i.preventDefault(),e.onClick(),(await de.anilist.toggleFavourite(n(),{mangaId:e.mangaId,animeId:e.animeId,staffId:e.staffId,characterId:e.characterId,studioId:e.studioId})).status===200&&e.mutate()},l}})}$e(["click"]);var Ua=p("<img data-k-81c02ac9 alt=Cover>"),uk=p("<li data-k-81c02ac9>");function hk(e){const[t,n]=O(!1),{setAllEdges:r,type:l}=Ic(),i=s=>r(o=>o.filter(c=>c.node.id!==s));return(()=>{var s=uk();return d(s,a(W,{get children(){return[a(M,{when:l==="anime",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Kr,{get animeId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>i(e.edge.node.id)}),(()=>{var o=Ua();return L(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:l==="manga",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Kr,{get mangaId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>i(e.edge.node.id)}),(()=>{var o=Ua();return L(()=>G(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:l==="characters",get children(){return a(B,{get href(){return"/ani/character/"+e.edge.node.id+"/"+Je(e.edge.node.name.userPreferred)},get children(){return[a(Kr,{get characterId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>i(e.edge.node.id)}),(()=>{var o=Ua();return L(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:l==="staff",get children(){return a(B,{get href(){return"/ani/staff/"+e.edge.node.id+"/"+Je(e.edge.node.name.userPreferred)},get children(){return[a(Kr,{get staffId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>i(e.edge.node.id)}),(()=>{var o=Ua();return L(()=>G(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:l==="studios",get children(){return a(B,{get href(){return"/ani/studio/"+e.edge.node.id+"/"+Je(e.edge.node.name)},get children(){return[a(Kr,{get studioId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>i(e.edge.node.id)}),N(()=>e.edge.node.name)]}})}})]}})),L(o=>{var c=!!t(),h=e.edge.node.id;return c!==o.e&&s.classList.toggle("hidden",o.e=c),h!==o.t&&G(s,"data-id",o.t=h),o},{e:void 0,t:void 0}),s})()}function Mu(e){const{user:t}=tt(),{type:n,allEdges:r}=Ic(),{accessToken:l}=ie(),[i,s]=O(void 0),[o,{mutateCache:c}]=de.anilist.favouritesByUserId(()=>t().id||void 0,e.page===1?()=>e.page:i,l);return q(()=>{var h,u,f,g;((u=(h=o())==null?void 0:h.data[n])==null?void 0:u.edges.length)>0&&Ae(r).splice((e.page-1)*25,25,...o().data[n].edges),e.page===1&&e.setVisible(((g=(f=o())==null?void 0:f.data[n])==null?void 0:g.edges.length)>0)}),q(oe(r,h=>{Ae(o).data[n].edges=h.slice((e.page-1)*25,e.page*25),c(u=>u)},{defer:!0})),a($n,{rootMargin:"100px",onIntersection:()=>s(e.page),get loading(){return e.loading},fetchResponse:o,children:h=>[a(H,{get each(){var u;return(u=o())==null?void 0:u.data[n].edges},children:u=>a(hk,{edge:u})}),a(x,{get when(){return o().data[n].pageInfo.hasNextPage},get children(){return a(x,{when:h===!1,fallback:"Fetch cooldown",get children(){return a(Mu,{get page(){return e.page+1},get loading(){return o.loading}})}})}})]})}var gk=p("<button data-k-05269ec0>Save"),fk=p("<button data-k-05269ec0>Cancel"),mk=p("<button data-k-05269ec0>Reorder"),pk=p("<details data-k-05269ec0 open><summary data-k-05269ec0><h3 data-k-05269ec0></h3></summary><ol data-k-05269ec0>");function Jr(e){F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(!1),[r,l]=O(!1),[i,s]=O([]),{accessToken:o,authUserData:c}=ie(),{user:h}=tt();let u,f,g,m;const y=()=>{l(!1),i().forEach(C=>{const w=u.querySelector(`li[data-id="${C.node.id}"]`);w&&u.append(w)})},v=C=>{if(!r())return;const w=C.target.closest("li");if(!w)return;w.classList.add("dragging");const b=w.getBoundingClientRect();if(C.type==="touchstart"){const A=C.touches[0];g=A.clientX-b.x,m=A.clientY-b.y}else g=C.clientX-b.x,m=C.clientY-b.y;f=w},$=C=>{var b,A;if(!r()||!f)return;if(C.type==="touchmove"){const k=C.touches[0],_=(b=document.elementFromPoint(k.clientX,k.clientY))==null?void 0:b.closest("li");_&&(f.nextElementSibling===_?_.after(f):_.before(f)),w()}else C.buttons===1&&((A=C.target)==null?void 0:A.tagName)==="LI"?f.nextElementSibling===C.target?C.target.after(f):C.target.before(f):C.buttons!==1&&S();C.buttons===1&&w();function w(){const k=f.getBoundingClientRect();let _=0,T=0,I=C.clientX,E=C.clientY;if(C.type==="touchmove"){const P=C.touches[0];I=P.clientX,E=P.clientY}f.style.transform&&([_,T]=f.style.transform.match(/-?[\d.]+(?=px)/g).map(Number)),f.style.transform=`translate(${_+(I-(k.x+g))}px, ${T+(E-(k.y+m))}px)`}},S=()=>{f&&(f.style.transform=null,f.classList.remove("dragging")),f=null};return(()=>{var C=pk(),w=C.firstChild,b=w.firstChild,A=w.nextSibling;return d(b,()=>e.title),d(w,a(x,{get when(){var k;return h().id===((k=c())==null?void 0:k.data.id)},get children(){return a(W,{get children(){return[a(M,{get when(){return r()},get children(){return[(()=>{var k=gk();return k.$$click=async()=>{const _=[...u.childNodes].map(E=>+E.dataset.id),T=_.map((E,P)=>P+1);let I;e.type==="anime"?I=await de.anilist.mutateFavourites(o(),{animeIds:_,animeOrder:T}):e.type==="manga"?I=await de.anilist.mutateFavourites(o(),{mangaIds:_,mangaOrder:T}):e.type==="studios"?I=await de.anilist.mutateFavourites(o(),{studioIds:_,studioOrder:T}):e.type==="staff"?I=await de.anilist.mutateFavourites(o(),{staffIds:_,staffOrder:T}):e.type==="characters"&&(I=await de.anilist.mutateFavourites(o(),{characterIds:_,characterOrder:T})),I.status===200?(s(E=>{const P=Object.fromEntries(E.map((R,U)=>[R.node.id,U]));return E.map((R,U)=>E[P[_[U]]])}),l(!1)):(y(),console.error("mutation failed"))},k})(),(()=>{var k=fk();return k.$$click=y,k})()]}}),a(M,{get when(){return!r()},get children(){var k=mk();return k.$$click=()=>l(_=>!_),k}})]}})}}),null),A.$$touchstart=v,A.$$mousedown=v,A.$$touchend=S,A.$$touchmove=$,A.$$mousemove=$,ge(k=>u=k,A),d(A,a(Tc.Provider,{get value(){return{type:e.type,setAllEdges:s,allEdges:i}},get children(){return a(x,{get when(){return h().id},keyed:!0,get children(){return a(Mu,{page:1,setVisible:n})}})}})),L(k=>{var _=!t(),T=!!r(),I=e.type!=="studios",E=e.type==="studios";return _!==k.e&&C.classList.toggle("hidden",k.e=_),T!==k.t&&A.classList.toggle("reorder",k.t=T),I!==k.a&&A.classList.toggle("grid",k.a=I),E!==k.o&&A.classList.toggle("flex",k.o=E),k},{e:void 0,t:void 0,a:void 0,o:void 0}),C})()}$e(["click","mousemove","touchmove","touchend","mousedown","touchstart"]);var vk=p("<div data-k-821c40e4 class=user-profile-favourites>");function $k(){const{user:e}=tt();return q(oe(e,t=>{document.title=`${t.name} favourites - LOB`})),(()=>{var t=vk();return d(t,a(Jr,{title:"Favourite animes",type:"anime"}),null),d(t,a(Jr,{title:"Favourite characters",type:"characters"}),null),d(t,a(Jr,{title:"Favourite manga",type:"manga"}),null),d(t,a(Jr,{title:"Favourite staff",type:"staff"}),null),d(t,a(Jr,{title:"Favourite studios",type:"studios"}),null),t})()}var _k=p("<div data-k-011bdddf class=user-profile-stats-page><div data-k-011bdddf><ol data-k-011bdddf><li data-k-011bdddf>Anime stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li><li data-k-011bdddf>Manga stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li></ol></div><div data-k-011bdddf class=content>");function bk(e){const{user:t}=tt();return q(()=>{document.title=`${t().name} stats - LOB`}),(()=>{var n=_k(),r=n.firstChild,l=r.firstChild,i=l.firstChild,s=i.firstChild,o=s.nextSibling,c=o.firstChild,h=c.nextSibling,u=h.nextSibling,f=u.nextSibling,g=f.nextSibling,m=g.nextSibling,y=i.nextSibling,v=y.firstChild,$=v.nextSibling,S=$.firstChild,C=S.nextSibling,w=C.nextSibling,b=w.nextSibling,A=r.nextSibling;return d(c,a(B,{get href(){return"/user/"+t().name+"/stats/anime/overview"},children:"Overview"})),d(h,a(B,{get href(){return"/user/"+t().name+"/stats/anime/genres"},children:"Genres"})),d(u,a(B,{get href(){return"/user/"+t().name+"/stats/anime/tags"},children:"Tags"})),d(f,a(B,{get href(){return"/user/"+t().name+"/stats/anime/voice-actors"},children:"Voice actors"})),d(g,a(B,{get href(){return"/user/"+t().name+"/stats/anime/studios"},children:"Studios"})),d(m,a(B,{get href(){return"/user/"+t().name+"/stats/anime/staff"},children:"Staff"})),d(S,a(B,{get href(){return"/user/"+t().name+"/stats/manga/overview"},children:"Overview"})),d(C,a(B,{get href(){return"/user/"+t().name+"/stats/manga/genres"},children:"Genres"})),d(w,a(B,{get href(){return"/user/"+t().name+"/stats/manga/tags"},children:"Tags"})),d(b,a(B,{get href(){return"/user/"+t().name+"/stats/manga/staff"},children:"Staff"})),d(A,()=>e.children),n})()}var yk=p("<div data-k-f2870773><h2 data-k-f2870773>Relations</h2><ol data-k-f2870773 class=grid-column-auto-fill>"),wk=p("<img data-k-f2870773 alt=Cover>"),kk=p("<div data-k-f2870773 class=content><span data-k-f2870773 class=type></span><span data-k-f2870773 class=line-clamp></span><p data-k-f2870773 class=flex-bullet-separator><span data-k-f2870773></span><span data-k-f2870773>"),Sk=p("<li data-k-f2870773>");function Ck(e){return a(ct,{fallback:"Anilist relations preview error",get children(){return a(x,{get when(){var t;return(t=e.relations)==null?void 0:t.edges.length},get children(){var t=yk(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.relations.edges},children:l=>(()=>{var i=Sk();return d(i,a(B,{get href(){return wd(l.node)},class:"media-page-relation",get children(){return[(()=>{var s=wk();return L(()=>G(s,"src",l.node.coverImage.large)),s})(),(()=>{var s=kk(),o=s.firstChild,c=o.nextSibling,h=c.nextSibling,u=h.firstChild,f=u.nextSibling;return d(o,()=>l.relationType),d(c,()=>l.node.title.userPreferred),d(u,()=>$l(l.node.format)),d(f,()=>kd(l.node.status)),s})()]}})),i})()})),t}})}})}const Ak="_character-container_1mdg4_1",xk="_character_1mdg4_1",Tk="_character-left_1mdg4_21",Ik="_character-right_1mdg4_21",Ek="_content_1mdg4_26",yn={characterContainer:Ak,character:xk,characterLeft:Tk,characterRight:Ik,content:Ek};var Lk=p("<h2>Characters"),Pk=p("<div><ol class=grid-column-auto-fill>"),Mk=p("<img alt=Character>"),Jo=p("<div><p></p><p>"),Dk=p("<li>"),Rk=p('<img alt="Voice actor">');const Xo=(e,t)=>{const n=Jl(t);return n!=="Japanese"&&e.some(r=>r.voiceActors.some(l=>l.language===n))?n:"Japanese"};function Nk(e){const t=Oe({characters:[],countryOfOrigin:"JP"},e),[n,r]=O(Xo(t.characters,t.countryOfOrigin));return q(()=>{r(Xo(t.characters,t.countryOfOrigin))}),a(ct,{fallback:"Characters error",get children(){return a(x,{get when(){return t.characters.length},get children(){var l=Pk(),i=l.firstChild;return d(l,a(B,{href:"characters",get children(){return Lk()}}),i),d(i,a(H,{get each(){return t.characters},children:s=>(()=>{var o=Dk();return d(o,a(B,{get href(){return"/ani/character/"+s.node.id+"/"+Je(s.node.name.userPreferred)},get class(){return yn.characterLeft},get children(){return[(()=>{var c=Mk();return L(()=>G(c,"src",s.node.image.large)),c})(),(()=>{var c=Jo(),h=c.firstChild,u=h.nextSibling;return d(h,()=>s.node.name.userPreferred),d(u,()=>s.role),L(f=>{var g=yn.content,m=yn.lineClamp;return g!==f.e&&Ut(c,f.e=g),m!==f.t&&Ut(h,f.t=m),f},{e:void 0,t:void 0}),c})()]}}),null),d(o,a(x,{get when(){return s.voiceActors.find(c=>c.language===n())},children:c=>a(B,{get href(){return"/ani/staff/"+c().id+"/"+Je(c().name.userPreferred)},get class(){return yn.characterRight},get children(){return[(()=>{var h=Jo(),u=h.firstChild,f=u.nextSibling;return d(u,()=>c().name.userPreferred),d(f,()=>c().language),L(g=>{var m=yn.content,y=yn.lineClamp;return m!==g.e&&Ut(h,g.e=m),y!==g.t&&Ut(u,g.t=y),g},{e:void 0,t:void 0}),h})(),(()=>{var h=Rk();return L(()=>G(h,"src",c().image.large)),h})()]}})}),null),L(()=>Ut(o,yn.character)),o})()})),L(()=>Ut(l,yn.characterContainer)),l}})}})}var Ok=p("<h2 data-k-b8cc53b3>Staff"),Fk=p('<div data-k-b8cc53b3><ol data-k-b8cc53b3 class="grid-row-clamp grid-column-auto-fill">'),Uk=p('<img data-k-b8cc53b3 alt="Staff profile">'),Bk=p("<div data-k-b8cc53b3><p data-k-b8cc53b3></p><p data-k-b8cc53b3>"),Vk=p("<li data-k-b8cc53b3>");function Gk(e){return a(ct,{fallback:"Anilist staff preview error",get children(){return a(x,{get when(){return e.staff},get children(){var t=Fk(),n=t.firstChild;return d(t,a(B,{href:"staff",get children(){return Ok()}}),n),d(n,a(H,{get each(){return e.staff},children:r=>(()=>{var l=Vk();return d(l,a(B,{get href(){return"/ani/staff/"+r.node.id+"/"+zn(r.node.name.userPreferred)},get children(){return[(()=>{var i=Uk();return L(()=>G(i,"src",r.node.image.large)),i})(),(()=>{var i=Bk(),s=i.firstChild,o=s.nextSibling;return d(s,()=>r.node.name.userPreferred),d(o,()=>r.role),i})()]}})),l})()})),t}})}})}var Hk=p("<p class=friend-list-status>");function Yk(e){return(()=>{var t=Hk();return d(t,a(W,{get fallback(){return e.friend.status},get children(){return[a(M,{get when(){return e.friend.status==="COMPLETED"},children:"Completed"}),a(M,{get when(){return e.friend.status==="CURRENT"},get children(){return a(W,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Watching"}),a(M,{get when(){return e.type==="MANGA"},children:"Reading"})]}})}}),a(M,{get when(){return e.friend.status==="DROPPED"},children:"Dropped"}),a(M,{get when(){return e.friend.status==="PAUSED"},children:"Paused"}),a(M,{get when(){return e.friend.status==="PLANNING"},children:"Planning"}),a(M,{get when(){return e.friend.status==="REPEATING"},get children(){return a(W,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Rewatching"}),a(M,{get when(){return e.type==="MANGA"},children:"Rereading"})]}})}})]}}),null),d(t,a(x,{get when(){return e.friend.progress>0&&e.friend.progress!==e.media.episodes&&e.friend.progress!==e.media.chapters},get children(){return a(W,{get children(){return[a(M,{get when(){return e.type==="ANIME"},get children(){return[" Ep. ",N(()=>e.friend.progress)]}}),a(M,{get when(){return e.type==="MANGA"},get children(){return[" Ch. ",N(()=>e.friend.progress)]}})]}})}}),null),d(t,a(x,{get when(){return e.friend.progressVolumes>0&&e.friend.progressVolumes!==e.media.volumes},get children(){return[" ","Vol. ",N(()=>e.friend.progressVolumes)]}}),null),t})()}const jk="_friend-container_8e4dk_1",zk="_friend_8e4dk_1",Wk="_friend-repeat_8e4dk_35",Pl={friendContainer:jk,friend:zk,friendRepeat:Wk};var qk=p("<div><ul>"),Kk=p('<img alt="User profile">'),Jk=p("<p>"),Xk=p("<div>"),Zk=p("<li>");function Qk(){const e=ne(),[t]=Te(),{accessToken:n,authUserData:r}=ie(),{anilistData:l}=vn(),i=Me(_g,()=>{var u,f;return{token:n(),id:t.isMalId!=null?(f=(u=l())==null?void 0:u.data)==null?void 0:f.id:e.id,page:1,perPage:8}}),s=Tn({default:()=>Ja()>1,"only-if-cached":()=>Ja()>2}),[o]=xn(s,i),[c,h]=O();return L(()=>{var u,f,g;(f=(u=l())==null?void 0:u.data)!=null&&f.mediaListEntry&&r()?h({...(g=l().data)==null?void 0:g.mediaListEntry,user:r().data}):h(null)}),a(ct,{fallback:"Friends error",get children(){return a(x,{get when(){return N(()=>{var u,f;return!!(((f=(u=o())==null?void 0:u.data)!=null&&f.mediaList.length||c())&&l())})()&&r()},get children(){var u=qk(),f=u.firstChild;return d(f,a(x,{get when(){return c()},get children(){return a(Zo,{get friend(){return c()}})}}),null),d(f,a(H,{get each(){var g,m;return(m=(g=o())==null?void 0:g.data)==null?void 0:m.mediaList},children:g=>a(x,{get when(){var m;return g.user.id!==((m=r())==null?void 0:m.data.id)},get children(){return a(Zo,{friend:g})}})}),null),L(()=>Ut(u,Pl.friendContainer)),u}})}})}function Zo(e){const{anilistData:t}=vn();return(()=>{var n=Zk();return d(n,a(B,{get class(){return Pl.friend},get href(){return"/user/"+e.friend.user.name},get children(){return[(()=>{var r=Kk();return L(()=>G(r,"src",e.friend.user.avatar.large)),r})(),(()=>{var r=Jk();return d(r,()=>e.friend.user.name),r})(),a(Yk,{get friend(){return e.friend},get media(){var r;return(r=t())==null?void 0:r.data},get type(){var r;return(r=t())==null?void 0:r.data.type}}),a(x,{get when(){return e.friend.repeat},get children(){var r=Xk();return d(r,()=>e.friend.repeat,null),d(r,a(ai,{}),null),L(()=>Ut(r,Pl.friendRepeat)),r}}),a(vs,{get format(){return e.friend.user.mediaListOptions.scoreFormat},get score(){return e.friend.score}})]}})),n})()}var eS=p("<button data-k-c63ce0c8>Show"),tS=p('<div data-k-c63ce0c8 class=recommendations><div data-k-c63ce0c8 class=flex-space-between><h2 data-k-c63ce0c8>Recommendations</h2><div data-k-c63ce0c8></div></div><ol data-k-c63ce0c8 class="grid-column-auto-fill recommendations">');function nS(e){const t=ne(),[n,r]=O(!1),[l,i]=O();return q(oe(()=>t.id,s=>{r(!1),i(s)})),a(x,{get when(){var s;return((s=e.recommendations)==null?void 0:s.nodes.length)>0},get children(){var s=tS(),o=s.firstChild,c=o.firstChild,h=c.nextSibling,u=o.nextSibling;return d(h,a(x,{get when(){return e.recommendations.pageInfo.total>e.recommendations.nodes.length},get children(){var f=eS();return f.firstChild,f.$$click=()=>r(g=>!g),d(f,a(x,{get when(){return n()},fallback:" more",children:" less"}),null),f}})),d(u,a(W,{get children(){return[a(M,{get when(){return!n()},get children(){return a(Ml,{get nodes(){return e.recommendations.nodes},get mutateCache(){return e.mutateCache}})}}),a(M,{get when(){return n()},get children(){return a(Du,{get id(){return l()},page:1,get mutateOldCardsCache(){return e.mutateCache},get oldCards(){return e.recommendations.nodes}})}})]}})),s}})}function Du(e){const{accessToken:t}=ie(),[n,r]=O(void 0),l=Me($g,t,n,e.page),[i,{mutateCache:s}]=nt(l),o=(c,h)=>s(u=>(u.data.nodes[c]=h,u));return a($n,{onIntersection:()=>r(e.id),fetchResponse:i,get loadingElement(){return a(Ml,{get nodes(){return e.oldCards||[]},get mutateCache(){return e.mutateCache}})},get loading(){return e.loading},children:c=>[a(Ml,{get nodes(){return i().data.nodes},mutateCache:o,get mutateOldCardsCache(){return e.mutateOldCardsCache},get oldCards(){return e.oldCards}}),a(x,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(x,{when:c===!1,fallback:"Fetch cooldown",get children(){return a(Du,{get id(){return n()},get page(){return e.page+1},get loading(){return i.loading}})}})}})]})}function Ml(e){return F(!e.oldCards==!e.mutateOldCardsCache,"These two props needs to be used together"),a(H,{get each(){return e.nodes},children:(t,n)=>a(x,{get when(){return t.mediaRecommendation},get children(){return a(rS,{node:t,mutateCache:r=>{je(()=>{var l;n()<((l=e.oldCards)==null?void 0:l.length)&&e.mutateOldCardsCache(n(),r),e.mutateCache(n(),r)})}})}})})}function rS(e){const t=ne(),{accessToken:n}=ie(),[r,l]=O(e.node.userRating),[i,s]=O(e.node.rating);let o=e.node.userRating;const c=_a(async(f,g,m,y,v)=>{if(m!==o){const $=await de.anilist.rateRecommendation(f,g,m,y,v);F(!$.fromCache,"Mutation should never be cached"),$.status===200&&e.mutateCache($.data)}o=m},1e3);return a(c1,{get node(){return e.node},get rating(){return i()},get userRating(){return r()},handleRateUp:f=>{f.preventDefault(),l(g=>g==="RATE_UP"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"NO_RATING"):(c(n(),e.node.id,"RATE_UP",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"RATE_UP"))},handleRateDown:f=>{f.preventDefault(),l(g=>g==="RATE_DOWN"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"NO_RATING"):(c(n(),e.node.id,"RATE_DOWN",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"RATE_DOWN"))}})}$e(["click"]);var aS=p("<h1>"),iS=p("<ul class=flex-bullet-separator><li></li><li>"),lS=p("<li>Source: "),sS=p("<ul><li>Members: </li><li>Favourites: "),oS=p("<div class=pg-ani-media-info>"),cS=p("<li>");function dS(){const{anilistData:e}=vn();return a(ct,{fallback:"Anilist media page info error",get children(){var t=oS();return d(t,a(x,{get when(){var n;return(n=e())==null?void 0:n.data},get children(){return[(()=>{var n=aS();return d(n,()=>{var r;return(r=e())==null?void 0:r.data.title.userPreferred}),n})(),(()=>{var n=iS(),r=n.firstChild,l=r.nextSibling;return d(r,a(W,{get children(){return[a(M,{get when(){var i;return((i=e())==null?void 0:i.data.type)==="MANGA"},get children(){return a(W,{get children(){return[a(M,{get when(){var i,s;return(s=(i=e())==null?void 0:i.data.startDate)==null?void 0:s.year},get children(){return a(B,{get href(){var i;return"/search/manga?year="+((i=e())==null?void 0:i.data.startDate.year)},get children(){var i;return(i=e())==null?void 0:i.data.startDate.year}})}}),a(M,{get when(){var i,s;return((s=(i=e())==null?void 0:i.data.startDate)==null?void 0:s.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){var i;return((i=e())==null?void 0:i.data.type)==="ANIME"},get children(){return a(W,{get children(){return[a(M,{get when(){var i;return N(()=>{var s;return!!((s=e())!=null&&s.data.seasonYear)})()&&((i=e())==null?void 0:i.data.season)},get children(){return a(B,{get href(){var i,s;return"/search/anime/"+((i=e())==null?void 0:i.data.season.toLowerCase())+"-"+((s=e())==null?void 0:s.data.seasonYear)},get children(){return[N(()=>{var i;return Er((i=e())==null?void 0:i.data.season)})," ",N(()=>{var i;return(i=e())==null?void 0:i.data.seasonYear})]}})}}),a(M,{get when(){var i,s;return(s=(i=e())==null?void 0:i.data.startDate)==null?void 0:s.year},get children(){return a(B,{get href(){var i;return"/search/anime?year="+((i=e())==null?void 0:i.data.startDate.year)},get children(){var i;return(i=e())==null?void 0:i.data.startDate.year}})}}),a(M,{get when(){var i,s;return((s=(i=e())==null?void 0:i.data.startDate)==null?void 0:s.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}})),d(n,a(x,{get when(){var i;return(i=Object.entries(jn.ani.media).find(([,s])=>{var o;return s.api===((o=e())==null?void 0:o.data.format)}))==null?void 0:i[0]},children:i=>(()=>{var s=cS();return d(s,a(W,{get children(){return[a(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)!=="JP"},get children(){return a(B,{get href(){var o,c;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+i()+"&country="+((c=e())==null?void 0:c.data.countryOfOrigin)},get children(){return[N(()=>{var o;return $l((o=e())==null?void 0:o.data.format)})," (",N(()=>{var o;return am((o=e())==null?void 0:o.data.countryOfOrigin)}),")"]}})}}),a(M,{get when(){var o;return((o=e())==null?void 0:o.data.countryOfOrigin)==="JP"},get children(){return a(B,{get href(){var o;return"/search/"+((o=e())==null?void 0:o.data.type.toLowerCase())+"?format="+i()},get children(){var o;return $l((o=e())==null?void 0:o.data.format)}})}})]}})),s})()}),l),d(l,()=>{var i;return kd((i=e())==null?void 0:i.data.status)}),n})(),(()=>{var n=sS(),r=n.firstChild;r.firstChild;var l=r.nextSibling;return l.firstChild,d(n,a(x,{get when(){var i;return(i=e())==null?void 0:i.data.source},get children(){var i=lS();return i.firstChild,d(i,a(B,{get href(){var s;return"/search/"+((s=e())==null?void 0:s.data.type.toLowerCase())+"?source="+Object.entries(Gl).find(([,o])=>{var c;return o.api===((c=e())==null?void 0:c.data.source)})[0]},get children(){var s;return im((s=e())==null?void 0:s.data.source)}}),null),i}}),r),d(r,()=>{var i;return ha((i=e())==null?void 0:i.data.popularity)},null),d(l,()=>{var i;return ha((i=e())==null?void 0:i.data.favourites)},null),n})()]}})),t}})}var uS=p("<h2 data-k-c68b4600>Tags"),hS=p("<button data-k-c68b4600>"),gS=p("<div data-k-c68b4600 class=pg-media-tags><div data-k-c68b4600 class=flex-space-between></div><ol data-k-c68b4600>"),fS=p("<span data-k-c68b4600>%"),mS=p("<li data-k-c68b4600>");const pS=e=>{const[t,n]=O(!1);q(oe(()=>e.tags,()=>{n(!1)}));function r(){const l=[];for(const i of e.tags){if(i.rank<90&&l.length>=3)break;(t()||!i.isMediaSpoiler&&!i.isGeneralSpoiler)&&l.push(`genre=${i.name}`)}return l}return a(ct,{fallback:"Tags error",get children(){return a(x,{get when(){var l;return(l=e.tags)==null?void 0:l.length},get children(){var l=gS(),i=l.firstChild,s=i.nextSibling;return d(i,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?"+r().join("&")},get children(){return uS()}}),null),d(i,a(x,{get when(){return e.tags.some(o=>o.isMediaSpoiler||o.isGeneralSpoiler)},get children(){var o=hS();return o.$$click=()=>n(c=>!c),d(o,a(x,{get when(){return!t()},fallback:"Hide spoilers",children:"Show spoilers"})),o}}),null),d(s,a(H,{get each(){return e.tags},children:o=>(()=>{var c=mS();return d(c,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?genre="+o.name+"&rank="+o.rank},get children(){return[N(()=>o.name)," ",(()=>{var h=fS(),u=h.firstChild;return d(h,()=>o.rank,u),h})()]}})),L(h=>{var u=!!(o.isMediaSpoiler||o.isGeneralSpoiler),f=!!((o.isMediaSpoiler||o.isGeneralSpoiler)&&!t()),g=o.description;return u!==h.e&&c.classList.toggle("spoiler",h.e=u),f!==h.t&&c.classList.toggle("hidden",h.t=f),g!==h.a&&G(c,"title",h.a=g),h},{e:void 0,t:void 0,a:void 0}),c})()})),L(()=>l.classList.toggle("loading",!!e.loading)),l}})}})};$e(["click"]);var vS=p("<div data-k-203e4d26 class=wrapper><h2 data-k-203e4d26></h2><ul data-k-203e4d26 class=genres>"),$S=p("<li data-k-203e4d26 class=genre>");const _S=e=>a(ct,{fallback:"Genres error",get children(){return a(x,{get when(){var t;return(t=e.genres)==null?void 0:t.length},get children(){var t=vS(),n=t.firstChild,r=n.nextSibling;return d(n,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?"+e.genres.map(l=>"genre="+l).join("&")},children:"Genres"})),d(r,a(H,{get each(){return e.genres},children:l=>(()=>{var i=$S();return d(i,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?genre="+l},children:l})),i})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var bS=p("<div data-k-737e8a49 class=pg-media-ranking><h2 data-k-737e8a49>Ranking</h2><ul data-k-737e8a49>"),yS=p("<li data-k-737e8a49>#<! data-k-737e8a49> <! data-k-737e8a49> <! data-k-737e8a49> ");const wS=e=>a(ct,{fallback:"Ranking error",get children(){return a(x,{get when(){return e.rankings},get children(){var t=bS(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.rankings},children:l=>(()=>{var i=yS(),s=i.firstChild,o=s.nextSibling,c=o.nextSibling,h=c.nextSibling,u=h.nextSibling,f=u.nextSibling;return f.nextSibling,d(i,()=>l.rank,o),d(i,()=>l.context,h),d(i,()=>l.season,f),d(i,()=>l.year,null),i})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var kS=p("<li data-k-439c0d70>Episodes: "),SS=p("<li data-k-439c0d70>Volumes: "),CS=p("<li data-k-439c0d70>Chapters: "),AS=p("<li data-k-439c0d70>Duration: <! data-k-439c0d70> mins"),xS=p("<li data-k-439c0d70>English: "),TS=p("<li data-k-439c0d70>Romaji: "),IS=p("<li data-k-439c0d70>Native: "),ES=p("<li data-k-439c0d70>Synonyms:<ul data-k-439c0d70>"),LS=p("<div data-k-439c0d70><h2 data-k-439c0d70>Extra info</h2><ul data-k-439c0d70>"),PS=p("<li data-k-439c0d70>Start Date: "),MS=p("<li data-k-439c0d70>End Date: "),DS=p("<li data-k-439c0d70>");const RS=e=>{const{authUserData:t}=ie();return a(ct,{fallback:"ExtraInfo error",get children(){return a(x,{get when(){return e.media},get children(){var n=LS(),r=n.firstChild,l=r.nextSibling;return d(l,a(x,{get when(){return e.media.episodes},get children(){var i=kS();return i.firstChild,d(i,()=>e.media.episodes,null),i}}),null),d(l,a(x,{get when(){return e.media.volumes},get children(){var i=SS();return i.firstChild,d(i,()=>e.media.volumes,null),i}}),null),d(l,a(x,{get when(){return e.media.chapters},get children(){var i=CS();return i.firstChild,d(i,()=>e.media.chapters,null),i}}),null),d(l,a(x,{get when(){return e.media.duration},get children(){var i=AS(),s=i.firstChild,o=s.nextSibling;return o.nextSibling,d(i,()=>e.media.duration,o),i}}),null),d(l,a(x,{get when(){return Xa(e.media.startDate)},children:i=>(()=>{var s=PS();return s.firstChild,d(s,i,null),s})()}),null),d(l,a(x,{get when(){return Xa(e.media.endDate)},children:i=>(()=>{var s=MS();return s.firstChild,d(s,i,null),s})()}),null),d(l,a(x,{get when(){return!t()||t().data.options.titleLanguage!=="ENGLISH"},get children(){var i=xS();return i.firstChild,d(i,()=>e.media.title.english,null),i}}),null),d(l,a(x,{get when(){return!t()||t().data.options.titleLanguage!=="ROMAJI"},get children(){var i=TS();return i.firstChild,d(i,()=>e.media.title.romaji,null),i}}),null),d(l,a(x,{get when(){return!t()||t().data.options.titleLanguage!=="NATIVE"},get children(){var i=IS();return i.firstChild,d(i,()=>e.media.title.native,null),i}}),null),d(l,a(x,{get when(){return e.media.synonyms.length},get children(){var i=ES(),s=i.firstChild,o=s.nextSibling;return d(o,a(H,{get each(){return e.media.synonyms},children:c=>(()=>{var h=DS();return d(h,c),h})()})),i}}),null),L(()=>n.classList.toggle("loading",!!e.loading)),n}})}})};var NS=p("<div data-k-611537d3 class=pg-media-banner><img data-k-611537d3 alt=Banner>");const OS=e=>a(x,{get when(){return e.src},get children(){var t=NS(),n=t.firstChild;return L(r=>{var l=!!e.loading,i=e.src;return l!==r.e&&t.classList.toggle("loading",r.e=l),i!==r.t&&G(n,"src",r.t=i),r},{e:void 0,t:void 0}),t}});var FS=p("<img data-k-543bd5d1 alt=Cover class=media-page-cover>"),US=p("<a data-k-543bd5d1 target=_black class=active><span data-k-543bd5d1 class=visually-hidden>Go to Anilist"),BS=p("<span data-k-543bd5d1 class=visually-hidden>Switch to MyAnimeList mode"),VS=p("<div data-k-543bd5d1 class=cp-media-api-switcher>"),GS=p("<button data-k-543bd5d1>"),HS=p("<div data-k-543bd5d1 class=media-page-content><aside data-k-543bd5d1 class=media-page-left-aside></aside><section data-k-543bd5d1 class=media-page-main>"),YS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Studios</h2><ol data-k-543bd5d1>"),Dl=p("<li data-k-543bd5d1>"),jS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Producers</h2><ol data-k-543bd5d1>"),zS=p("<div data-k-543bd5d1 class=media-page-description>"),WS=p('<div data-k-543bd5d1 class="no-overflow media-page-watch-episodes"><h2 data-k-543bd5d1>Watch</h2><ol data-k-543bd5d1 class=grid-reel-auto-fill>'),qS=p('<a data-k-543bd5d1 target=_black><img data-k-543bd5d1 alt="Episode thumbnail"><div data-k-543bd5d1 class=wrapper><p data-k-543bd5d1>');function KS(e){const t=ne(),[n]=Te(),{accessToken:r}=ie(),[l,i]=O(),s=Me(vg,()=>({token:r(),id:t.id,isMalId:n.isMalId!=null,type:t.type})),o=Tn({default:()=>Ja()>2}),[c,{mutateBoth:h}]=xn(o,s),u=N(()=>{var b;const w=(b=c())==null?void 0:b.data;if(!(!w||w.idMal==null||w.type.toLowerCase()!==t.type))return w.idMal});L(oe(c,w=>{var b;i(((b=w==null?void 0:w.data)==null?void 0:b.isFavourite)??!1)}));const f=Me(Vc,()=>t.type,u),[g]=nt(f),m=N(()=>{var w,b,A,k;if((w=c())!=null&&w.data.idMal&&((A=(b=g())==null?void 0:b.data)==null?void 0:A.mal_id)===((k=c())==null?void 0:k.data.idMal))return g()}),{openEditor:y}=Fl(),v=pn();L(()=>{var w,b;(w=c())!=null&&w.data&&t.sub?document.title=`${c().data.title.userPreferred} - ${t.sub} - LOB`:(b=c())!=null&&b.data&&(document.title=`${c().data.title.userPreferred} - LOB`)});const $=new AbortController;En(()=>{window.addEventListener("keydown",w=>{if(w.target!==document.body||w.shiftKey||w.altKey)return;function b(A){var k,_,T,I,E;return w.preventDefault(),(E=(I=(T=(_=(k=c())==null?void 0:k.data)==null?void 0:_.relations)==null?void 0:T.edges)==null?void 0:I.find(P=>(P==null?void 0:P.relationType)===A))==null?void 0:E.node}if(w.key==="l"&&!w.ctrlKey||w.key==="ArrowRight"&&w.ctrlKey)Sa(v,b("SEQUEL"));else if(w.key==="h"&&!w.ctrlKey||w.key==="ArrowLeft"&&w.ctrlKey)Sa(v,b("PREQUEL"));else if(w.key==="j"&&!w.ctrlKey||w.key==="ArrowDown"&&w.ctrlKey){const A=b("ADAPTATION")||b("ALTERNATIVE");Sa(v,A)}else(w.key==="k"&&!w.ctrlKey||w.key==="ArrowUp"&&w.ctrlKey)&&Sa(v,b("SOURCE")||b("PARENT"))},{signal:$.signal})}),ze(()=>$.abort());const S=()=>{var w;return c.loading&&((w=c())==null?void 0:w.data.id)!=t.id},C=(w,b)=>{var k,_,T,I;const A=b[(_=(k=c())==null?void 0:k.data)==null?void 0:_.type]??null;((I=(T=c())==null?void 0:T.data)==null?void 0:I.id)===A&&(i(w),h(E=>(E.data.isFavourite=w,E)))};return a(ct,{fallback:"Media page error",get children(){return a(Vl.Provider,{value:{anilistData:c,mutateBothAnilistData:h,jikanData:m},get children(){return[a(OS,{get src(){var w,b;return(b=(w=c())==null?void 0:w.data)==null?void 0:b.bannerImage},get loading(){return S()}}),(()=>{var w=HS(),b=w.firstChild,A=b.nextSibling;return d(b,a(x,{get when(){var k;return(k=c())==null?void 0:k.data},get children(){return[(()=>{var k=FS();return L(()=>{var _,T;return G(k,"src",(T=(_=c())==null?void 0:_.data)==null?void 0:T.coverImage.large)}),k})(),(()=>{var k=VS();return d(k,a(x,{get when(){var _;return(_=c())==null?void 0:_.data.id},get children(){var _=US();return _.firstChild,d(_,a(hs,{}),null),d(_,a(wu,{}),null),L(()=>{var T;return G(_,"href","https://anilist.co/"+t.type+"/"+(((T=c())==null?void 0:T.data.id)??t.id))}),_}}),null),d(k,a(x,{get when(){var _;return(_=c())==null?void 0:_.data.idMal},get children(){return a(B,{get href(){var _;return"/mal/"+t.type+"/"+((_=c())==null?void 0:_.data.idMal)+"/"+t.name},get children(){return[BS(),a(gs,{})]}})}}),null),k})(),a(yu,{}),a(x,{get when(){return r()},get children(){return[(()=>{var k=GS();return k.$$click=()=>{var _;y((_=c())==null?void 0:_.data,{setIsFavourite:C,mutateMedia:T=>{var I,E;((E=(I=c())==null?void 0:I.data)==null?void 0:E.id)===(T==null?void 0:T.media.id)&&h(P=>(P.data.mediaListEntry=T,P))}})},d(k,()=>{var _,T;return((T=(_=c())==null?void 0:_.data.mediaListEntry)==null?void 0:T.status)||"Edit"}),k})(),a(Nr,{get checked(){return l()},onChange:i,get idType(){var k;return(k=c())==null?void 0:k.data.type},get variableId(){var k;return(k=c())==null?void 0:k.data.id},get anilistValue(){var k;return(k=c())==null?void 0:k.data.favourites},get jikanValue(){var k;return(k=m())==null?void 0:k.data.favorites},mutateCache:C})]}}),a(bu,{get id(){var k,_,T;return(T=(_=(k=c())==null?void 0:k.data)==null?void 0:_.trailer)==null?void 0:T.id},get site(){var k,_,T;return(T=(_=(k=c())==null?void 0:k.data)==null?void 0:_.trailer)==null?void 0:T.site}}),a(x,{get when(){var k;return(k=c())==null?void 0:k.data.studios.edges.filter(_=>_.isMain)},children:k=>a(x,{get when(){return k().length>0},get children(){var _=YS(),T=_.firstChild,I=T.nextSibling;return d(I,a(H,{get each(){return k()},children:E=>(()=>{var P=Dl();return d(P,a(B,{get href(){return"/ani/studio/"+E.node.id+"/"+zn(E.node.name)},get children(){return E.node.name}})),P})()})),_}})}),a(x,{get when(){var k;return(k=c())==null?void 0:k.data.studios.edges.filter(_=>_.isMain===!1)},children:k=>a(x,{get when(){return k().length>0},get children(){var _=jS(),T=_.firstChild,I=T.nextSibling;return d(I,a(H,{get each(){return k()},children:E=>(()=>{var P=Dl();return d(P,a(B,{get href(){return"/ani/studio/"+E.node.id+"/"+zn(E.node.name)},get children(){return E.node.name}})),P})()})),_}})}),a(ku,{get hashtag(){var k;return(k=c())==null?void 0:k.data.hashtag},get externalLinks(){var k;return(k=c())==null?void 0:k.data.externalLinks}}),a(RS,{get media(){var k;return(k=c())==null?void 0:k.data},get loading(){return S()}}),a(wS,{get rankings(){var k;return(k=c())==null?void 0:k.data.rankings},get loading(){return S()}}),a(_S,{get genres(){var k;return(k=c())==null?void 0:k.data.genres},get type(){var k;return(k=c())==null?void 0:k.data.type},get loading(){return S()}}),a(pS,{get tags(){var k;return(k=c())==null?void 0:k.data.tags},get type(){var k;return(k=c())==null?void 0:k.data.type},get loading(){return S()}})]}})),d(A,a(dS,{}),null),d(A,()=>e.children,null),L(()=>w.classList.toggle("loading",!!S())),w})()]}})}})}function JS(){const{accessToken:e}=ie(),{anilistData:t,mutateBothAnilistData:n}=vn();return a(ct,{fallback:"Media page home content error",get children(){return a(x,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[a(x,{get when(){return t().data.description},get children(){var r=zS();return d(r,a(ti,{get text(){return t().data.description}})),r}}),a(Ck,{get relations(){return t().data.relations}}),a(Nk,{get characters(){return t().data.characterPreview.edges},get countryOfOrigin(){return t().data.countryOfOrigin}}),a(Gk,{get staff(){return t().data.staffPreview.edges}}),a(x,{get when(){return e()},get children(){return a(Qk,{})}}),a(Rb,{}),a(ZS,{get streamingEpisodes(){return t().data.streamingEpisodes}}),a(nS,{get recommendations(){return t().data.recommendations},mutateCache:(r,l)=>{n(i=>(i.data.recommendations.nodes[r]=l,i))}})]}})}})}function XS(){const e=ne(),t=Qt();return a(hn,{get href(){return"/ani/"+e.type+"/"+e.id+"/"+(e.name||"")+t.search}})}function ZS(e){return a(x,{get when(){var t;return(t=e.streamingEpisodes)==null?void 0:t.length},get children(){var t=WS(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.streamingEpisodes},children:l=>(()=>{var i=Dl();return d(i,a(W,{get children(){return a(M,{get when(){return l.site==="Crunchyroll"},get children(){var s=qS(),o=s.firstChild,c=o.nextSibling,h=c.firstChild;return d(h,()=>l.title),L(u=>{var f=l.url,g=l.thumbnail;return f!==u.e&&G(s,"href",u.e=f),g!==u.t&&G(o,"src",u.t=g),u},{e:void 0,t:void 0}),s}})}})),i})()})),t}})}$e(["click"]);var QS=p('<img alt="User profile">'),eC=p("<p>"),tC=p("<li>"),nC=p("<button>Load more");function $s(e){F(e.page,"Page is missing");const{user:t}=tt(),{accessToken:n}=ie(),[r]=de.anilist.userFollowers(()=>t().id,e.page,n),[l,i]=O(!1);return a(x,{get when(){return r()},get children(){return[a(H,{get each(){return r().data.followers},children:s=>(()=>{var o=tC();return d(o,a(B,{get href(){return"/user/"+s.name},get children(){return[(()=>{var c=QS();return L(()=>G(c,"src",s.avatar.large)),c})(),(()=>{var c=eC();return d(c,()=>s.name),c})()]}})),o})()}),a(x,{get when(){return r().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return l()},get fallback(){return(()=>{var s=nC();return s.$$click=()=>i(!0),s})()},get children(){return a($s,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var rC=p('<img alt="User profile">'),aC=p("<p>"),iC=p("<button>Unfollow"),lC=p("<li>"),sC=p("<button>Load more");function oC(e){F(e.page,"Page is missing");const{user:t}=tt(),{authUserData:n,accessToken:r}=ie(),[l]=de.anilist.userFollowing(()=>t().id,e.page,r),[i,s]=O(!1);return a(x,{get when(){return l()},get children(){return[a(H,{get each(){return l().data.following},children:o=>(()=>{var c=lC();return d(c,a(B,{get href(){return"/user/"+o.name},get children(){return[(()=>{var h=rC();return L(()=>G(h,"src",o.avatar.large)),h})(),(()=>{var h=aC();return d(h,()=>o.name),h})(),a(x,{get when(){var h;return t().id===((h=n())==null?void 0:h.data.id)},get children(){var h=iC();return h.$$click=async u=>{u.preventDefault()},h}})]}})),c})()}),a(x,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(x,{get when(){return i()},get fallback(){return(()=>{var o=sC();return o.$$click=()=>s(!0),o})()},get children(){return a($s,{get page(){return e.page+1}})}})}})]}})}$e(["click"]);var Qo=p("<ol class=user-profile-social-grid>"),cC=p("<div class=user-profile-socials-page><ul><li><button>Following</button></li><li><button>Followers");function dC(){const{user:e}=tt(),[t,n]=O("following");return q(oe(e,r=>{document.title=`${r.name} socials - LOB`})),(()=>{var r=cC(),l=r.firstChild,i=l.firstChild,s=i.firstChild,o=i.nextSibling,c=o.firstChild;return s.$$click=()=>n("following"),c.$$click=()=>n("followers"),d(r,a(W,{get children(){return[a(M,{get when(){return t()==="following"},get children(){var h=Qo();return d(h,a(x,{get when(){return e().id},keyed:!0,get children(){return a(oC,{page:1})}})),h}}),a(M,{get when(){return t()==="followers"},get children(){var h=Qo();return d(h,a(x,{get when(){return e().id},keyed:!0,get children(){return a($s,{page:1})}})),h}})]}}),null),r})()}$e(["click"]);var uC=p("<h2 data-k-a9353a86>"),hC=p("<span data-k-a9353a86>View all"),gC=p("<section data-k-a9353a86><ol data-k-a9353a86 class=grid-reel-auto-fill>");function vt(e){return F("href"in e,"Link is missing"),(()=>{var t=gC(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=uC();return d(r,()=>e.title),r})(),hC()]}}),n),d(n,a(H,{get each(){return e.data},children:r=>a($i,{media:r})})),t})()}var fC=p("<h2 data-k-a96044c6>"),mC=p("<section data-k-a96044c6><ol data-k-a96044c6 class=vertical-search-card-row>"),pC=p("<img data-k-a96044c6 class=cover alt=Cover.>"),vC=p('<li data-k-a96044c6 class=vertical-search-card><p data-k-a96044c6 class=ranking>#<span data-k-a96044c6></span></p><div data-k-a96044c6 class=vertical-search-card-body><div data-k-a96044c6 class="vertical-search-card-content clamp"><ol data-k-a96044c6 class=vertical-search-card-genre-list></ol></div><div data-k-a96044c6 class=vertical-search-card-info><div data-k-a96044c6 class=vertical-search-card-score><div data-k-a96044c6 class=clamp><p data-k-a96044c6>%</p><p data-k-a96044c6> users</p></div></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6></p><p data-k-a96044c6></p></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6> </p><p data-k-a96044c6>'),$C=p("<li data-k-a96044c6 class=vertical-search-card-genre>");function _s(e){return F("href"in e,"Link is missing"),It(e.type,"type"),(()=>{var t=mC(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=fC();return d(r,()=>e.title),r})(),"View all"]}}),n),d(n,a(H,{get each(){return e.data},children:(r,l)=>(()=>{var i=vC(),s=i.firstChild,o=s.firstChild,c=o.nextSibling,h=s.nextSibling,u=h.firstChild,f=u.firstChild,g=u.nextSibling,m=g.firstChild,y=m.firstChild,v=y.firstChild,$=v.firstChild,S=v.nextSibling,C=S.firstChild,w=m.nextSibling,b=w.firstChild,A=b.nextSibling,k=w.nextSibling,_=k.firstChild,T=_.firstChild,I=_.nextSibling;return d(c,()=>l()+1),d(h,a(B,{class:"cover-container",get href(){return Ve(r)},get children(){var E=pC();return L(()=>G(E,"src",r.coverImage.large)),E}}),u),d(u,a(B,{class:"line-clamp",get href(){return Ve(r)},get children(){return r.title.userPreferred}}),f),d(f,a(H,{get each(){return r.genres},children:E=>(()=>{var P=$C();return d(P,a(B,{get href(){return`/search${e.type?"/"+e.type:""}?genre=`+E},children:E})),P})()})),d(m,a(aa,{get score(){return r.averageScore}}),y),d(v,()=>r.averageScore,$),d(S,()=>ye(r.popularity),C),d(b,()=>Ir(r.format)),d(A,a(W,{get children(){return[a(M,{get when(){return r.type==="ANIME"},get children(){return a(x,{get when(){return r.episodes},fallback:"Ongoing",get children(){return[N(()=>ye(r.episodes))," Episode",a(x,{get when(){return r.episodes>1},children:"s"})]}})}}),a(M,{get when(){return r.type==="MANGA"},get children(){return a(x,{get when(){return r.chapters},fallback:"Ongoing",get children(){return[N(()=>ye(r.chapters))," Chapter",a(x,{get when(){return r.chapters>1},children:"s"})]}})}})]}})),d(_,()=>Ke(r.season),T),d(_,()=>r.seasonYear,null),d(I,()=>Ke(r.status)),L(E=>(E=r.coverImage.color)!=null?i.style.setProperty("--media-background-color",E):i.style.removeProperty("--media-background-color")),i})()})),t})()}var _C=p("<div data-k-bc27f66a class=browse-content>");function bC(){const{accessToken:e}=ie(),[t]=de.anilist.trendingManga(e);return document.title="Browse manga - LOB",a(x,{get when(){return t()},get children(){var n=_C();return d(n,a(vt,{get data(){return t().data.data.trending.media},href:"/search/manga/trending",title:"Trending now"}),null),d(n,a(vt,{get data(){return t().data.data.novel.media},href:"/search/manga/novel",title:"Popular light novels"}),null),d(n,a(vt,{get data(){return t().data.data.manhwa.media},href:"/search/manga/manhwa",title:"Popular Manhwas"}),null),d(n,a(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished-manga",title:"Recently finished mangas"}),null),d(n,a(vt,{get data(){return t().data.data.finishedNovel.media},href:"/search/manga/finished-novel",title:"Recently finished light novels"}),null),d(n,a(vt,{get data(){return t().data.data.popular.media},href:"/search/manga/popular",title:"All time popular"}),null),d(n,a(_s,{get data(){return t().data.data.top.media},type:"manga",href:"/search/manga/top-100",title:"Top 100 manga"}),null),n}})}var yC=p("<div data-k-ac073097 class=browse-content>");function wC(){const{accessToken:e}=ie(),[t]=de.anilist.trendingAnime(e);return document.title="Browse anime - LOB",a(x,{get when(){return t()},get children(){var n=yC();return d(n,a(vt,{get data(){return t().data.data.trending.media},href:"/search/anime/trending",title:"Trending now"}),null),d(n,a(vt,{get data(){return t().data.data.season.media},href:"/search/anime/this-season?order=popularity",title:"Popular this season"}),null),d(n,a(vt,{get data(){return t().data.data.nextSeason.media},href:"/search/anime/next-season?order=popularity",title:"Upcoming next season"}),null),d(n,a(vt,{get data(){return t().data.data.finished.media},href:"/search/anime/finished",title:"Recently finished"}),null),d(n,a(vt,{get data(){return t().data.data.popular.media},href:"/search/anime/popular",title:"All time popular"}),null),d(n,a(_s,{get data(){return t().data.data.top.media},type:"anime",href:"/search/anime/top-100",title:"Top 100 anime"}),null),n}})}var kC=p("<div data-k-49f3f573 class=browse-content>");function SC(){const{accessToken:e}=ie(),[t]=de.anilist.trendingMedia(e);return document.title="Browse media - LOB",a(x,{get when(){return t()},get children(){var n=kC();return d(n,a(vt,{get data(){return t().data.data.trending.media},href:"/search/media/trending",title:"Trending anime and manga"}),null),d(n,a(vt,{get data(){return t().data.data.newAnime.media},href:"/search/anime/new",title:"Newly added anime"}),null),d(n,a(vt,{get data(){return t().data.data.newManga.media},href:"/search/manga/new",title:"Newly added manga"}),null),d(n,a(vt,{get data(){return t().data.data.finishedAnime.media},href:"/search/anime/finished",title:"Recently finished anime"}),null),d(n,a(vt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished",title:"Recently finished manga"}),null),d(n,a(_s,{get data(){return t().data.data.top.media},type:"media",href:"/search/media/top-100",title:"Top 100 anime and manga"}),null),n}})}var CC=p("<div>Not fould 404");const AC=document.getElementById("root"),wn={id:/^\d+$/},xC={type:"anime",header:e=>e.match(/^(summer|fall|spring|winter)-\d+$/)?!0:["finished","this-season","new","tba","next-season","trending","popular","top-100"].includes(e)},TC={type:"manga",header:["finished","finished-manga","tba","finished-novel","novel","new","manhwa","trending","popular","top-100"]},IC={type:"media",header:["finished","trending","popular","top-100","tba"]};uh(()=>a(wv,{get children(){return a(kv,{get children(){return a(I0,{get children(){return a(Xh,{root:ym,base:"/legendary-octo-barnacle",get children(){return[a(ce,{path:"/",component:bv}),a(ce,{path:"/authentication",component:yv}),a(ce,{path:"/notifications",component:Kb}),a(ce,{path:"/activity/:id",matchFilters:wn,component:n0}),a(ce,{path:"/compare",get children(){return[a(ce,{path:"/",component:()=>a(hn,{href:"anime"})}),a(ce,{path:"/:type",matchFilters:{type:["anime","manga"]},component:p2}),a(ce,{path:"*",component:()=>a(hn,{href:"/compare"})})]}}),a(ce,{path:"/:mode",matchFilters:{mode:["browse","search"]},component:A1,get children(){return[a(ce,{path:"/",matchFilters:{mode:"browse"},component:r0,get children(){return[a(ce,{path:"/:type",matchFilters:{type:"media"},component:SC}),a(ce,{path:"/:type",matchFilters:{type:"anime"},component:wC}),a(ce,{path:"/:type",matchFilters:{type:"manga"},component:bC})]}}),a(ce,{path:"/",matchFilters:{mode:"search"},component:x1,get children(){return[a(ce,{path:"/",component:()=>a(hn,{href:"media"})}),a(ce,{path:"/:type",matchFilters:{type:["anime","manga","media"]},get children(){return[a(ce,{path:"/:header?",matchFilters:xC}),a(ce,{path:"/:header?",matchFilters:TC}),a(ce,{path:"/:header?",matchFilters:IC}),a(ce,{path:"/:header?",component:T1})]}})]}})]}}),a(ce,{path:"/artist/:name",component:Gb}),a(ce,{path:"/:api",get children(){return[a(ce,{path:"/:sub/:id/:name?",matchFilters:{api:"ani"},get children(){return[a(ce,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:Vy}),a(ce,{path:"/",get matchFilters(){return{...wn,sub:"staff"}},component:Gy}),a(ce,{path:"/",get matchFilters(){return{...wn,sub:"studio"}},component:Jy})]}}),a(ce,{path:"/:sub/:id/:name?",matchFilters:{api:"mal"},get children(){return a(ce,{path:"/",get matchFilters(){return{...wn,sub:"character"}},component:dw})}})]}}),a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,type:["anime","manga"]}},component:XS}),a(ce,{path:"/:api",get children(){return[a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"ani"}},component:KS,get children(){return[a(ce,{path:"/",matchFilters:{type:["anime","manga"]},component:JS}),a(ce,{path:"/:sub",matchFilters:{sub:"characters"},get children(){return[a(ce,{path:"/",matchFilters:{type:"anime"},component:dy}),a(ce,{path:"/",matchFilters:{type:"manga"},component:uy})]}}),a(ce,{path:"/:sub",matchFilters:{sub:"staff"},get children(){return[a(ce,{path:"/",matchFilters:{type:"anime"},component:hy}),a(ce,{path:"/",matchFilters:{type:"manga"},component:gy})]}})]}}),a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{...wn,api:"mal"}},component:Z2,get children(){return[a(ce,{path:"/",matchFilters:{type:["anime","manga"]},component:Q2}),a(ce,{path:"/:sub",get children(){return[a(ce,{path:"/",matchFilters:{sub:"characters",type:["anime","manga"]},component:aw}),a(ce,{path:"/",matchFilters:{sub:"staff",type:"anime"},component:lw})]}})]}})]}}),a(ce,{path:"/user/:name",component:N1,get children(){return[a(ce,{path:"/",component:Lw}),a(ce,{path:"/:type/:list?",matchFilters:{type:"anime"},component:Ko}),a(ce,{path:"/:type/:list?",matchFilters:{type:"manga"},component:Ko}),a(ce,{path:"/favourites",component:$k}),a(ce,{path:"/stats",component:bk,get children(){return[a(ce,{path:"/",component:()=>a(hn,{href:"anime"})}),a(ce,{path:"/:type",matchFilters:{type:"anime"},get children(){return[a(ce,{path:"/",component:()=>a(hn,{href:"overview"})}),a(ce,{path:"/overview",component:f_}),a(ce,{path:"/genres",component:I_}),a(ce,{path:"/tags",component:U_}),a(ce,{path:"/studios",component:J_}),a(ce,{path:"/staff",component:_b}),a(ce,{path:"/voice-actors",component:ob})]}}),a(ce,{path:"/:type",matchFilters:{type:"manga"},get children(){return[a(ce,{path:"/",component:()=>a(hn,{href:"overview"})}),a(ce,{path:"/overview",component:m_}),a(ce,{path:"/genres",component:E_}),a(ce,{path:"/tags",component:B_}),a(ce,{path:"/staff",component:bb})]}})]}}),a(ce,{path:"/socials",component:dC})]}}),a(ce,{path:"*404",component:()=>CC()})]}})}})}})}}),AC);
