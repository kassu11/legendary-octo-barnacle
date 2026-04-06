var Tu=Object.defineProperty;var Cs=e=>{throw TypeError(e)};var Iu=(e,t,n)=>t in e?Tu(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var De=(e,t,n)=>Iu(e,typeof t!="symbol"?t+"":t,n),bi=(e,t,n)=>t.has(e)||Cs("Cannot "+n);var Ie=(e,t,n)=>(bi(e,t,"read from private field"),n?n.call(e):t.get(e)),st=(e,t,n)=>t.has(e)?Cs("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),ot=(e,t,n,r)=>(bi(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),Tt=(e,t,n)=>(bi(e,t,"access private method"),n);var yi=(e,t,n,r)=>({set _(i){ot(e,t,i,n)},get _(){return Ie(e,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const Eu=!1,Lu=(e,t)=>e===t,jt=Symbol("solid-proxy"),zo=typeof Proxy=="function",Xi=Symbol("solid-track"),Ua={equals:Lu};let qr=null,Wo=Zo;const rn=1,Ba=2,qo={owned:null,cleanups:null,context:null,owner:null},wi={};var ke=null;let ki=null,Pu=null,Le=null,ft=null,Yt=null,ni=0;function Kr(e,t){const n=Le,r=ke,i=e.length===0,l=t===void 0?r:t,s=i?qo:{owned:null,cleanups:null,context:l?l.context:null,owner:l},o=i?e:()=>e(()=>Ce(()=>ea(s)));ke=s,Le=null;try{return nn(o,!0)}finally{Le=n,ke=r}}function O(e,t){t=t?Object.assign({},Ua,t):Ua;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(n.value)),Xo(n,i));return[Jo.bind(n),r]}function Mu(e,t,n){const r=ca(e,t,!0,rn);Ar(r)}function P(e,t,n){const r=ca(e,t,!1,rn);Ar(r)}function W(e,t,n){Wo=Vu;const r=ca(e,t,!1,rn);r.user=!0,Yt?Yt.push(r):Ar(r)}function N(e,t,n){n=n?Object.assign({},Ua,n):Ua;const r=ca(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Ar(r),Jo.bind(r)}function Du(e){return e&&typeof e=="object"&&"then"in e}function Ru(e,t,n){let r,i,l;r=!0,i=e,l={};let s=null,o=wi,c=!1,u="initialValue"in l,h=typeof r=="function"&&N(r);const f=new Set,[g,m]=(l.storage||O)(l.initialValue),[y,v]=O(void 0),[$,C]=O(void 0,{equals:!1}),[S,k]=O(u?"ready":"unresolved");function b(x,I,E,L){return s===x&&(s=null,L!==void 0&&(u=!0),(x===o||I===o)&&l.onHydrated&&queueMicrotask(()=>l.onHydrated(L,{value:I})),o=wi,A(I,E)),I}function A(x,I){nn(()=>{I===void 0&&m(()=>x),k(I!==void 0?"errored":u?"ready":"unresolved"),v(I);for(const E of f.keys())E.decrement();f.clear()},!1)}function w(){const x=Fu,I=g(),E=y();if(E!==void 0&&!s)throw E;return Le&&Le.user,I}function _(x=!0){if(x!==!1&&c)return;c=!1;const I=h?h():r;if(I==null||I===!1){b(s,Ce(g));return}const E=o!==wi?o:Ce(()=>i(I,{value:g(),refetching:x}));return Du(E)?(s=E,"value"in E?(E.status==="success"?b(s,E.value,void 0,I):b(s,void 0,Qi(E.value),I),E):(c=!0,queueMicrotask(()=>c=!1),nn(()=>{k(u?"refreshing":"pending"),C()},!1),E.then(L=>b(E,L,void 0,I),L=>b(E,void 0,Qi(L),I)))):(b(s,E,void 0,I),E)}return Object.defineProperties(w,{state:{get:()=>S()},error:{get:()=>y()},loading:{get(){const x=S();return x==="pending"||x==="refreshing"}},latest:{get(){if(!u)return w();const x=y();if(x&&!s)throw x;return g()}}}),h?Mu(()=>_(!1)):_(!1),[w,{refetch:_,mutate:m}]}function Ge(e){return nn(e,!1)}function Ce(e){if(Le===null)return e();const t=Le;Le=null;try{return e()}finally{Le=t}}function ce(e,t,n){const r=Array.isArray(e);let i,l=n&&n.defer;return s=>{let o;if(r){o=Array(e.length);for(let u=0;u<e.length;u++)o[u]=e[u]()}else o=e();if(l)return l=!1,s;const c=Ce(()=>t(o,i,s));return i=o,c}}function Tn(e){W(()=>Ce(e))}function He(e){return ke===null||(ke.cleanups===null?ke.cleanups=[e]:ke.cleanups.push(e)),e}function Nu(e,t){qr||(qr=Symbol("error")),ke=ca(void 0,void 0,!0),ke.context={...ke.context,[qr]:[t]};try{return e()}catch(n){da(n)}finally{ke=ke.owner}}function Zi(){return Le}function Cr(){return ke}function Ko(e,t){const n=ke,r=Le;ke=e,Le=null;try{return nn(t,!0)}catch(i){da(i)}finally{ke=n,Le=r}}function Ou(e){const t=Le,n=ke;return Promise.resolve().then(()=>{Le=t,ke=n;let r;return nn(e,!1),Le=ke=null,r?r.done:void 0})}const[bC,yC]=O(!1);function qt(e,t){const n=Symbol("context");return{id:n,Provider:Gu(n),defaultValue:e}}function Ut(e){let t;return ke&&ke.context&&(t=ke.context[e.id])!==void 0?t:e.defaultValue}function ri(e){const t=N(e),n=N(()=>el(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let Fu;function Jo(){if(this.sources&&this.state)if(this.state===rn)Ar(this);else{const e=ft;ft=null,nn(()=>Ga(this),!1),ft=e}if(Le){const e=this.observers?this.observers.length:0;Le.sources?(Le.sources.push(this),Le.sourceSlots.push(e)):(Le.sources=[this],Le.sourceSlots=[e]),this.observers?(this.observers.push(Le),this.observerSlots.push(Le.sources.length-1)):(this.observers=[Le],this.observerSlots=[Le.sources.length-1])}return this.value}function Xo(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&nn(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],s=ki&&ki.running;s&&ki.disposed.has(l),(s?!l.tState:!l.state)&&(l.pure?ft.push(l):Yt.push(l),l.observers&&Qo(l)),s||(l.state=rn)}if(ft.length>1e6)throw ft=[],new Error},!1)),t}function Ar(e){if(!e.fn)return;ea(e);const t=ni;Uu(e,e.value,t)}function Uu(e,t,n){let r;const i=ke,l=Le;Le=ke=e;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=rn,e.owned&&e.owned.forEach(ea),e.owned=null),e.updatedAt=n+1,da(s)}finally{Le=l,ke=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Xo(e,r):e.value=r,e.updatedAt=n)}function ca(e,t,n,r=rn,i){const l={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:ke,context:ke?ke.context:null,pure:n};return ke===null||ke!==qo&&(ke.owned?ke.owned.push(l):ke.owned=[l]),l}function Va(e){if(e.state===0)return;if(e.state===Ba)return Ga(e);if(e.suspense&&Ce(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ni);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===rn)Ar(e);else if(e.state===Ba){const r=ft;ft=null,nn(()=>Ga(e,t[0]),!1),ft=r}}function nn(e,t){if(ft)return e();let n=!1;t||(ft=[]),Yt?n=!0:Yt=[],ni++;try{const r=e();return Bu(n),r}catch(r){n||(Yt=null),ft=null,da(r)}}function Bu(e){if(ft&&(Zo(ft),ft=null),e)return;const t=Yt;Yt=null,t.length&&nn(()=>Wo(t),!1)}function Zo(e){for(let t=0;t<e.length;t++)Va(e[t])}function Vu(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Va(r)}for(t=0;t<n;t++)Va(e[t])}function Ga(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===rn?r!==t&&(!r.updatedAt||r.updatedAt<ni)&&Va(r):i===Ba&&Ga(r,t)}}}function Qo(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Ba,n.pure?ft.push(n):Yt.push(n),n.observers&&Qo(n))}}function ea(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),s=n.observerSlots.pop();r<i.length&&(l.sourceSlots[s]=r,i[r]=l,n.observerSlots[r]=s)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)ea(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ea(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Qi(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function As(e,t,n){try{for(const r of t)r(e)}catch(r){da(r,n&&n.owner||null)}}function da(e,t=ke){const n=qr&&t&&t.context&&t.context[qr],r=Qi(e);if(!n)throw r;Yt?Yt.push({fn(){As(r,n,t)},state:rn}):As(r,n,t)}function el(e){if(typeof e=="function"&&!e.length)return el(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=el(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Gu(e,t){return function(r){let i;return P(()=>i=Ce(()=>(ke.context={...ke.context,[e]:r.value},ri(()=>r.children))),void 0),i}}const Hu=Symbol("fallback");function xs(e){for(let t=0;t<e.length;t++)e[t]()}function Yu(e,t,n={}){let r=[],i=[],l=[],s=0,o=t.length>1?[]:null;return He(()=>xs(l)),()=>{let c=e()||[],u=c.length,h,f;return c[Xi],Ce(()=>{let m,y,v,$,C,S,k,b,A;if(u===0)s!==0&&(xs(l),l=[],r=[],i=[],s=0,o&&(o=[])),n.fallback&&(r=[Hu],i[0]=Kr(w=>(l[0]=w,n.fallback())),s=1);else if(s===0){for(i=new Array(u),f=0;f<u;f++)r[f]=c[f],i[f]=Kr(g);s=u}else{for(v=new Array(u),$=new Array(u),o&&(C=new Array(u)),S=0,k=Math.min(s,u);S<k&&r[S]===c[S];S++);for(k=s-1,b=u-1;k>=S&&b>=S&&r[k]===c[b];k--,b--)v[b]=i[k],$[b]=l[k],o&&(C[b]=o[k]);for(m=new Map,y=new Array(b+1),f=b;f>=S;f--)A=c[f],h=m.get(A),y[f]=h===void 0?-1:h,m.set(A,f);for(h=S;h<=k;h++)A=r[h],f=m.get(A),f!==void 0&&f!==-1?(v[f]=i[h],$[f]=l[h],o&&(C[f]=o[h]),f=y[f],m.set(A,f)):l[h]();for(f=S;f<u;f++)f in v?(i[f]=v[f],l[f]=$[f],o&&(o[f]=C[f],o[f](f))):i[f]=Kr(g);i=i.slice(0,s=u),r=c.slice(0)}return i});function g(m){if(l[f]=m,o){const[y,v]=O(f);return o[f]=v,t(c[f],y)}return t(c[f])}}}function a(e,t){return Ce(()=>e(t||{}))}function va(){return!0}const tl={get(e,t,n){return t===jt?n:e.get(t)},has(e,t){return t===jt?!0:e.has(t)},set:va,deleteProperty:va,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:va,deleteProperty:va}},ownKeys(e){return e.keys()}};function Si(e){return(e=typeof e=="function"?e():e)?e:{}}function ju(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Oe(...e){let t=!1;for(let s=0;s<e.length;s++){const o=e[s];t=t||!!o&&jt in o,e[s]=typeof o=="function"?(t=!0,N(o)):o}if(zo&&t)return new Proxy({get(s){for(let o=e.length-1;o>=0;o--){const c=Si(e[o])[s];if(c!==void 0)return c}},has(s){for(let o=e.length-1;o>=0;o--)if(s in Si(e[o]))return!0;return!1},keys(){const s=[];for(let o=0;o<e.length;o++)s.push(...Object.keys(Si(e[o])));return[...new Set(s)]}},tl);const n={},r=Object.create(null);for(let s=e.length-1;s>=0;s--){const o=e[s];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let u=c.length-1;u>=0;u--){const h=c[u];if(h==="__proto__"||h==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,h);if(!r[h])r[h]=f.get?{enumerable:!0,configurable:!0,get:ju.bind(n[h]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const g=n[h];g&&(f.get?g.push(f.get.bind(o)):f.value!==void 0&&g.push(()=>f.value))}}}const i={},l=Object.keys(r);for(let s=l.length-1;s>=0;s--){const o=l[s],c=r[o];c&&c.get?Object.defineProperty(i,o,c):i[o]=c?c.value:void 0}return i}function ai(e,...t){if(zo&&jt in e){const i=new Set(t.length>1?t.flat():t[0]),l=t.map(s=>new Proxy({get(o){return s.includes(o)?e[o]:void 0},has(o){return s.includes(o)&&o in e},keys(){return s.filter(o=>o in e)}},tl));return l.push(new Proxy({get(s){return i.has(s)?void 0:e[s]},has(s){return i.has(s)?!1:s in e},keys(){return Object.keys(e).filter(s=>!i.has(s))}},tl)),l}const n={},r=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const l=Object.getOwnPropertyDescriptor(e,i),s=!l.get&&!l.set&&l.enumerable&&l.writable&&l.configurable;let o=!1,c=0;for(const u of t)u.includes(i)&&(o=!0,s?r[c][i]=l.value:Object.defineProperty(r[c],i,l)),++c;o||(s?n[i]=l.value:Object.defineProperty(n,i,l))}return[...r,n]}const ec=e=>`Stale read from <${e}>.`;function H(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Yu(()=>e.each,e.children,t||void 0))}function T(e){const t=e.keyed,n=N(()=>e.when,void 0,void 0),r=t?n:N(n,void 0,{equals:(i,l)=>!i==!l});return N(()=>{const i=r();if(i){const l=e.children;return typeof l=="function"&&l.length>0?Ce(()=>l(t?i:()=>{if(!Ce(r))throw ec("Show");return n()})):l}return e.fallback},void 0,void 0)}function z(e){const t=ri(()=>e.children),n=N(()=>{const r=t(),i=Array.isArray(r)?r:[r];let l=()=>{};for(let s=0;s<i.length;s++){const o=s,c=i[s],u=l,h=N(()=>u()?void 0:c.when,void 0,void 0),f=c.keyed?h:N(h,void 0,{equals:(g,m)=>!g==!m});l=()=>u()||(f()?[o,h,c]:void 0)}return l});return N(()=>{const r=n()();if(!r)return e.fallback;const[i,l,s]=r,o=s.children;return typeof o=="function"&&o.length>0?Ce(()=>o(s.keyed?l():()=>{var u;if(((u=Ce(n)())==null?void 0:u[0])!==i)throw ec("Match");return l()})):o},void 0,void 0)}function M(e){return e}let lr;function zu(){lr&&[...lr].forEach(e=>e())}function at(e){let t;const[n,r]=O(t,void 0);return lr||(lr=new Set),lr.add(r),He(()=>lr.delete(r)),N(()=>{let i;if(i=n()){const l=e.fallback;return typeof l=="function"&&l.length?Ce(()=>l(i,()=>r())):l}return Nu(()=>e.children,r)},void 0,void 0)}const Wu=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],qu=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Wu]),Ku=new Set(["innerHTML","textContent","innerText","children"]),Ju=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Xu=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Zu(e,t){const n=Xu[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Qu=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),eh=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),th={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function nh(e,t,n){let r=n.length,i=t.length,l=r,s=0,o=0,c=t[i-1].nextSibling,u=null;for(;s<i||o<l;){if(t[s]===n[o]){s++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===s){const h=l<r?o?n[o-1].nextSibling:n[l-o]:c;for(;o<l;)e.insertBefore(n[o++],h)}else if(l===o)for(;s<i;)(!u||!u.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[l-1]&&n[o]===t[i-1]){const h=t[--i].nextSibling;e.insertBefore(n[o++],t[s++].nextSibling),e.insertBefore(n[--l],h),t[i]=n[l]}else{if(!u){u=new Map;let f=o;for(;f<l;)u.set(n[f],f++)}const h=u.get(t[s]);if(h!=null)if(o<h&&h<l){let f=s,g=1,m;for(;++f<i&&f<l&&!((m=u.get(t[f]))==null||m!==h+g);)g++;if(g>h-o){const y=t[s];for(;o<h;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[s++])}else s++;else t[s++].remove()}}}const Ts="_$DX_DELEGATE";function rh(e,t,n,r={}){let i;return Kr(l=>{i=l,t===document?e():d(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function p(e,t,n,r){let i;const l=()=>{const o=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:r?o.firstChild:o.content.firstChild},s=t?()=>Ce(()=>document.importNode(i||(i=l()),!0)):()=>(i||(i=l())).cloneNode(!0);return s.cloneNode=s,s}function _e(e,t=window.document){const n=t[Ts]||(t[Ts]=new Set);for(let r=0,i=e.length;r<i;r++){const l=e[r];n.has(l)||(n.add(l),t.addEventListener(l,dh))}}function V(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ah(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function ih(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Dt(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ha(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n,typeof n!="function"&&n)}function lh(e,t,n={}){const r=Object.keys(t||{}),i=Object.keys(n);let l,s;for(l=0,s=i.length;l<s;l++){const o=i[l];!o||o==="undefined"||t[o]||(Is(e,o,!1),delete n[o])}for(l=0,s=r.length;l<s;l++){const o=r[l],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(Is(e,o,!0),n[o]=c)}return n}function sh(e,t,n){if(!t)return n?V(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&r.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(r.setProperty(l,i),n[l]=i);return n}function It(e,t={},n,r){const i={};return r||P(()=>i.children=ta(e,t.children,i.children)),P(()=>typeof t.ref=="function"&&fe(t.ref,e)),P(()=>oh(e,t,n,!0,i,!0)),i}function fe(e,t,n){return Ce(()=>e(t,n))}function d(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ta(e,t,r,n);P(i=>ta(e,t(),i,n),r)}function oh(e,t,n,r,i={},l=!1){t||(t={});for(const s in i)if(!(s in t)){if(s==="children")continue;i[s]=Es(e,s,null,i[s],n,l,t)}for(const s in t){if(s==="children")continue;const o=t[s];i[s]=Es(e,s,o,i[s],n,l,t)}}function ch(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Is(e,t,n){const r=t.trim().split(/\s+/);for(let i=0,l=r.length;i<l;i++)e.classList.toggle(r[i],n)}function Es(e,t,n,r,i,l,s){let o,c,u,h,f;if(t==="style")return sh(e,n,r);if(t==="classList")return lh(e,n,r);if(n===r)return r;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const g=t.slice(3);r&&e.removeEventListener(g,r,typeof r!="function"&&r),n&&e.addEventListener(g,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const g=t.slice(10);r&&e.removeEventListener(g,r,!0),n&&e.addEventListener(g,n,!0)}else if(t.slice(0,2)==="on"){const g=t.slice(2).toLowerCase(),m=Qu.has(g);if(!m&&r){const y=Array.isArray(r)?r[0]:r;e.removeEventListener(g,y)}(m||n)&&(Ha(e,g,n,m),m&&_e([g]))}else if(t.slice(0,5)==="attr:")V(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")ih(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(u=Ku.has(t))||!i&&((h=Zu(t,e.tagName))||(c=qu.has(t)))||(o=e.nodeName.includes("-")||"is"in s))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?Dt(e,n):o&&!c&&!u?e[ch(t)]=n:e[h||t]=n;else{const g=i&&t.indexOf(":")>-1&&th[t.split(":")[0]];g?ah(e,g,t,n):V(e,Ju[t]||t,n)}return n}function dh(e){let t=e.target;const n=`$$${e.type}`,r=e.target,i=e.currentTarget,l=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),s=()=>{const c=t[n];if(c&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?c.call(t,u,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&l(t.host),!0},o=()=>{for(;s()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();l(c[0]);for(let u=0;u<c.length-2&&(t=c[u],!!s());u++){if(t._$host){t=t._$host,o();break}if(t.parentNode===i)break}}else o();l(r)}function ta(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(s){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=tr(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=tr(e,n,r);else{if(l==="function")return P(()=>{let o=t();for(;typeof o=="function";)o=o();n=ta(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(nl(o,t,n,i))return P(()=>n=ta(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=tr(e,n,r),s)return n}else c?n.length===0?Ls(e,o,r):nh(e,n,o):(n&&tr(e),Ls(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=tr(e,n,r,t);tr(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function nl(e,t,n,r){let i=!1;for(let l=0,s=t.length;l<s;l++){let o=t[l],c=n&&n[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=nl(e,o,c)||i;else if(u==="function")if(r){for(;typeof o=="function";)o=o();i=nl(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||i}else e.push(o),i=!0;else{const h=String(o);c&&c.nodeType===3&&c.data===h?e.push(c):e.push(document.createTextNode(h))}}return i}function Ls(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function tr(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let l=!1;for(let s=t.length-1;s>=0;s--){const o=t[s];if(i!==o){const c=o.parentNode===e;!l&&!s?c?e.replaceChild(i,o):e.insertBefore(i,n):c&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const uh=!1,hh="http://www.w3.org/2000/svg";function gh(e,t=!1){return t?document.createElementNS(hh,e):document.createElement(e)}function fh(e,t){const n=N(e);return N(()=>{const r=n();switch(typeof r){case"function":return Ce(()=>r(t));case"string":const i=eh.has(r),l=gh(r,i);return It(l,t,i),l}})}function Ci(e){const[,t]=ai(e,["component"]);return fh(()=>e.component,t)}function tc(){let e=new Set;function t(i){return e.add(i),()=>e.delete(i)}let n=!1;function r(i,l){if(n)return!(n=!1);const s={to:i,options:l,defaultPrevented:!1,preventDefault:()=>s.defaultPrevented=!0};for(const o of e)o.listener({...s,from:o.location,retry:c=>{c&&(n=!0),o.navigate(i,{...l,resolve:!1})}});return!s.defaultPrevented}return{subscribe:t,confirm:r}}let rl;function Il(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),rl=window.history.state._depth}Il();function mh(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function ph(e,t){let n=!1;return()=>{const r=rl;Il();const i=r==null?null:rl-r;if(n){n=!1;return}i&&t(i)?(n=!0,window.history.go(-i)):e()}}const vh=/^(?:[a-z0-9]+:)?\/\//i,$h=/^\/+|(\/)\/+$/g,nc="http://sr";function Gn(e,t=!1){const n=e.replace($h,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function Ra(e,t,n){if(vh.test(t))return;const r=Gn(e),i=n&&Gn(n);let l="";return!i||t.startsWith("/")?l=r:i.toLowerCase().indexOf(r.toLowerCase())!==0?l=r+i:l=i,(l||"/")+Gn(t,!l)}function _h(e,t){if(e==null)throw new Error(t);return e}function bh(e,t){return Gn(e).replace(/\/*(\*.*)?$/g,"")+Gn(t)}function rc(e){const t={};return e.searchParams.forEach((n,r)=>{r in t?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),t}function yh(e,t,n){const[r,i]=e.split("/*",2),l=r.split("/").filter(Boolean),s=l.length;return o=>{const c=o.split("/").filter(Boolean),u=c.length-s;if(u<0||u>0&&i===void 0&&!t)return null;const h={path:s?"":"/",params:{}},f=g=>n===void 0?void 0:n[g];for(let g=0;g<s;g++){const m=l[g],y=m[0]===":",v=y?c[g]:c[g].toLowerCase(),$=y?m.slice(1):m.toLowerCase();if(y&&Ai(v,f($)))h.params[$]=v;else if(y||!Ai(v,$))return null;h.path+=`/${v}`}if(i){const g=u?c.slice(-u).join("/"):"";if(Ai(g,f(i)))h.params[i]=g;else return null}return h}}function Ai(e,t){const n=r=>r===e;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function wh(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((i,l)=>i+(l.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function ac(e){const t=new Map,n=Cr();return new Proxy({},{get(r,i){return t.has(i)||Ko(n,()=>t.set(i,N(()=>e()[i]))),t.get(i)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function kh(e,t){const n=new URLSearchParams(e);Object.entries(t).forEach(([i,l])=>{l==null||l===""||l instanceof Array&&!l.length?n.delete(i):l instanceof Array?(n.delete(i),l.forEach(s=>{n.append(i,String(s))})):n.set(i,String(l))});const r=n.toString();return r?`?${r}`:""}function ic(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const i=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)i.push(n+=t[1]),r=r.slice(t[0].length);return ic(r).reduce((l,s)=>[...l,...i.map(o=>o+s)],[])}const Sh=100,lc=qt(),El=qt(),ua=()=>_h(Ut(lc),"<A> and 'use' router primitives can be only used inside a Route."),Ch=()=>Ut(El)||ua().base,Ah=e=>{const t=Ch();return N(()=>t.resolvePath(e()))},xh=e=>{const t=ua();return N(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},gn=()=>ua().navigatorFactory(),Kt=()=>ua().location,ee=()=>ua().params,xe=()=>{const e=Kt(),t=gn(),n=(r,i)=>{const l=Ce(()=>kh(e.search,r)+e.hash);t(l,{scroll:!1,resolve:!1,...i})};return[e.query,n]};function Th(e,t=""){const{component:n,preload:r,load:i,children:l,info:s}=e,o=!l||Array.isArray(l)&&!l.length,c={key:e,component:n,preload:r||i,info:s};return sc(e.path).reduce((u,h)=>{for(const f of ic(h)){const g=bh(t,f);let m=o?g:g.split("/*",1)[0];m=m.split("/").map(y=>y.startsWith(":")||y.startsWith("*")?y:encodeURIComponent(y)).join("/"),u.push({...c,originalPath:h,pattern:m,matcher:yh(m,!o,e.matchFilters)})}return u},[])}function Ih(e,t=0){return{routes:e,score:wh(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let i=e.length-1;i>=0;i--){const l=e[i],s=l.matcher(n);if(!s)return null;r.unshift({...s,route:l})}return r}}}function sc(e){return Array.isArray(e)?e:[e]}function oc(e,t="",n=[],r=[]){const i=sc(e);for(let l=0,s=i.length;l<s;l++){const o=i[l];if(o&&typeof o=="object"){o.hasOwnProperty("path")||(o.path="");const c=Th(o,t);for(const u of c){n.push(u);const h=Array.isArray(o.children)&&o.children.length===0;if(o.children&&!h)oc(o.children,u.pattern,n,r);else{const f=Ih([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((l,s)=>s.score-l.score)}function xi(e,t){for(let n=0,r=e.length;n<r;n++){const i=e[n].matcher(t);if(i)return i}return[]}function Eh(e,t,n){const r=new URL(nc),i=N(h=>{const f=e();try{return new URL(f,r)}catch{return console.error(`Invalid path ${f}`),h}},r,{equals:(h,f)=>h.href===f.href}),l=N(()=>i().pathname),s=N(()=>i().search,!0),o=N(()=>i().hash),c=()=>"",u=ce(s,()=>rc(i()));return{get pathname(){return l()},get search(){return s()},get hash(){return o()},get state(){return t()},get key(){return c()},query:n?n(u):ac(u)}}let Un;function Lh(){return Un}function Ph(e,t,n,r={}){const{signal:[i,l],utils:s={}}=e,o=s.parsePath||(G=>G),c=s.renderPath||(G=>G),u=s.beforeLeave||tc(),h=Ra("",r.base||"");if(h===void 0)throw new Error(`${h} is not a valid base path`);h&&!i().value&&l({value:h,replace:!0,scroll:!1});const[f,g]=O(!1);let m;const y=(G,J)=>{J.value===v()&&J.state===C()||(m===void 0&&g(!0),Un=G,m=J,Ou(()=>{m===J&&($(m.value),S(m.state),zu(),A[1](Y=>Y.filter(q=>q.pending)))}).finally(()=>{m===J&&Ge(()=>{Un=void 0,G==="navigate"&&R(m),g(!1),m=void 0})}))},[v,$]=O(i().value),[C,S]=O(i().state),k=Eh(v,C,s.queryWrapper),b=[],A=O([]),w=N(()=>typeof r.transformUrl=="function"?xi(t(),r.transformUrl(k.pathname)):xi(t(),k.pathname)),_=()=>{const G=w(),J={};for(let Y=0;Y<G.length;Y++)Object.assign(J,G[Y].params);return J},x=s.paramsWrapper?s.paramsWrapper(_,t):ac(_),I={pattern:h,path:()=>h,outlet:()=>null,resolvePath(G){return Ra(h,G)}};return P(ce(i,G=>y("native",G),{defer:!0})),{base:I,location:k,params:x,isRouting:f,renderPath:c,parsePath:o,navigatorFactory:L,matches:w,beforeLeave:u,preloadRoute:U,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:A};function E(G,J,Y){Ce(()=>{if(typeof J=="number"){J&&(s.go?s.go(J):console.warn("Router integration does not support relative routing"));return}const q=!J||J[0]==="?",{replace:le,resolve:Z,scroll:te,state:X}={replace:!1,resolve:!q,scroll:!0,...Y},pe=Z?G.resolvePath(J):Ra(q&&k.pathname||"",J);if(pe===void 0)throw new Error(`Path '${J}' is not a routable path`);if(b.length>=Sh)throw new Error("Too many redirects");const $e=v();(pe!==$e||X!==C())&&(uh||u.confirm(pe,Y)&&(b.push({value:$e,replace:le,scroll:te,state:C()}),y("navigate",{value:pe,state:X})))})}function L(G){return G=G||Ut(El)||I,(J,Y)=>E(G,J,Y)}function R(G){const J=b[0];J&&(l({...G,replace:J.replace,scroll:J.scroll}),b.length=0)}function U(G,J){const Y=xi(t(),G.pathname),q=Un;Un="preload";for(let le in Y){const{route:Z,params:te}=Y[le];Z.component&&Z.component.preload&&Z.component.preload();const{preload:X}=Z;J&&X&&Ko(n(),()=>X({params:te,location:{pathname:G.pathname,search:G.search,hash:G.hash,query:rc(G),state:null,key:""},intent:"preload"}))}Un=q}}function Mh(e,t,n,r){const{base:i,location:l,params:s}=e,{pattern:o,component:c,preload:u}=r().route,h=N(()=>r().path);c&&c.preload&&c.preload();const f=u?u({params:s,location:l,intent:Un||"initial"}):void 0;return{parent:t,pattern:o,path:h,outlet:()=>c?a(c,{params:s,location:l,data:f,get children(){return n()}}):n(),resolvePath(m){return Ra(i.path(),m,h())}}}const Dh=e=>t=>{const{base:n}=t,r=ri(()=>t.children),i=N(()=>oc(r(),t.base||""));let l;const s=Ph(e,i,()=>l,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(s),a(lc.Provider,{value:s,get children(){return a(Rh,{routerState:s,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[N(()=>(l=Cr())&&null),a(Nh,{routerState:s,get branches(){return i()}})]}})}})};function Rh(e){const t=e.routerState.location,n=e.routerState.params,r=N(()=>e.preload&&Ce(()=>{e.preload({params:n,location:t,intent:Lh()||"initial"})}));return a(T,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:i=>a(i,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function Nh(e){const t=[];let n;const r=N(ce(e.routerState.matches,(i,l,s)=>{let o=l&&i.length===l.length;const c=[];for(let u=0,h=i.length;u<h;u++){const f=l&&l[u],g=i[u];s&&f&&g.route.key===f.route.key?c[u]=s[u]:(o=!1,t[u]&&t[u](),Kr(m=>{t[u]=m,c[u]=Mh(e.routerState,c[u-1]||e.routerState.base,Ps(()=>r()[u+1]),()=>e.routerState.matches()[u])}))}return t.splice(i.length).forEach(u=>u()),s&&o?s:(n=c[0],c)}));return Ps(()=>r()&&n)()}const Ps=e=>()=>a(T,{get when(){return e()},keyed:!0,children:t=>a(El.Provider,{value:t,get children(){return t.outlet()}})}),de=e=>{const t=ri(()=>e.children);return Oe(e,{get children(){return t()}})};function Oh([e,t],n,r){return[e,r?i=>t(r(i)):t]}function Fh(e){let t=!1;const n=i=>typeof i=="string"?{value:i}:i,r=Oh(O(n(e.get()),{equals:(i,l)=>i.value===l.value&&i.state===l.state}),void 0,i=>(!t&&e.set(i),i));return e.init&&He(e.init((i=e.get())=>{t=!0,r[1](n(i)),t=!1})),Dh({signal:r,create:e.create,utils:e.utils})}function Uh(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Bh(e,t){const n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const Vh=new Map;function Gh(e=!0,t=!1,n="/_server",r){return i=>{const l=i.base.path(),s=i.navigatorFactory(i.base);let o,c;function u(v){return v.namespaceURI==="http://www.w3.org/2000/svg"}function h(v){if(v.defaultPrevented||v.button!==0||v.metaKey||v.altKey||v.ctrlKey||v.shiftKey)return;const $=v.composedPath().find(w=>w instanceof Node&&w.nodeName.toUpperCase()==="A");if(!$||t&&!$.hasAttribute("link"))return;const C=u($),S=C?$.href.baseVal:$.href;if((C?$.target.baseVal:$.target)||!S&&!$.hasAttribute("state"))return;const b=($.getAttribute("rel")||"").split(/\s+/);if($.hasAttribute("download")||b&&b.includes("external"))return;const A=C?new URL(S,document.baseURI):new URL(S);if(!(A.origin!==window.location.origin||l&&A.pathname&&!A.pathname.toLowerCase().startsWith(l.toLowerCase())))return[$,A]}function f(v){const $=h(v);if(!$)return;const[C,S]=$,k=i.parsePath(S.pathname+S.search+S.hash),b=C.getAttribute("state");v.preventDefault(),s(k,{resolve:!1,replace:C.hasAttribute("replace"),scroll:!C.hasAttribute("noscroll"),state:b?JSON.parse(b):void 0})}function g(v){const $=h(v);if(!$)return;const[C,S]=$;r&&(S.pathname=r(S.pathname)),i.preloadRoute(S,C.getAttribute("preload")!=="false")}function m(v){clearTimeout(o);const $=h(v);if(!$)return c=null;const[C,S]=$;c!==C&&(r&&(S.pathname=r(S.pathname)),o=setTimeout(()=>{i.preloadRoute(S,C.getAttribute("preload")!=="false"),c=C},20))}function y(v){if(v.defaultPrevented)return;let $=v.submitter&&v.submitter.hasAttribute("formaction")?v.submitter.getAttribute("formaction"):v.target.getAttribute("action");if(!$)return;if(!$.startsWith("https://action/")){const S=new URL($,nc);if($=i.parsePath(S.pathname+S.search),!$.startsWith(n))return}if(v.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const C=Vh.get($);if(C){v.preventDefault();const S=new FormData(v.target,v.submitter);C.call({r:i,f:v.target},v.target.enctype==="multipart/form-data"?S:new URLSearchParams(S))}}_e(["click","submit"]),document.addEventListener("click",f),e&&(document.addEventListener("mousemove",m,{passive:!0}),document.addEventListener("focusin",g,{passive:!0}),document.addEventListener("touchstart",g,{passive:!0})),document.addEventListener("submit",y),He(()=>{document.removeEventListener("click",f),e&&(document.removeEventListener("mousemove",m),document.removeEventListener("focusin",g),document.removeEventListener("touchstart",g)),document.removeEventListener("submit",y)})}}function Hh(e){const t=()=>{const r=window.location.pathname.replace(/^\/+/,"/")+window.location.search,i=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:r+window.location.hash,state:i}},n=tc();return Fh({get:t,set({value:r,replace:i,scroll:l,state:s}){i?window.history.replaceState(mh(s),"",r):window.history.pushState(s,"",r),Bh(decodeURIComponent(window.location.hash.slice(1)),l),Il()},init:r=>Uh(window,"popstate",ph(r,i=>{if(i&&i<0)return!n.confirm(i);{const l=t();return!n.confirm(l.value,{state:l.state})}})),create:Gh(e.preload,e.explicitLinks,e.actionBase,e.transformUrl),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var Yh=p("<a>");function B(e){e=Oe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=ai(e,["href","state","class","activeClass","inactiveClass","end"]),n=Ah(()=>e.href),r=xh(n),i=Kt(),l=N(()=>{const s=n();if(s===void 0)return[!1,!1];const o=Gn(s.split(/[?#]/,1)[0]).toLowerCase(),c=decodeURI(Gn(i.pathname).toLowerCase());return[e.end?o===c:c.startsWith(o+"/")||c===o,o===c]});return(()=>{var s=Yh();return It(s,Oe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!l()[0],[e.activeClass]:l()[0],...t.classList}},link:"",get"aria-current"(){return l()[1]?"page":void 0}}),!1,!1),s})()}function dn(e){const t=gn(),n=Kt(),{href:r,state:i}=e,l=typeof r=="function"?r({navigate:t,location:n}):r;return t(l,{replace:!0,state:i}),null}const al=Symbol("store-raw"),dr=Symbol("store-node"),un=Symbol("store-has"),cc=Symbol("store-self");function dc(e){let t=e[jt];if(!t&&(Object.defineProperty(e,jt,{value:t=new Proxy(e,Wh)}),!Array.isArray(e))){const n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let i=0,l=n.length;i<l;i++){const s=n[i];r[s].get&&Object.defineProperty(e,s,{enumerable:r[s].enumerable,get:r[s].get.bind(t)})}}return t}function wn(e){let t;return e!=null&&typeof e=="object"&&(e[jt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function wr(e,t=new Set){let n,r,i,l;if(n=e!=null&&e[al])return n;if(!wn(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,o=e.length;s<o;s++)i=e[s],(r=wr(i,t))!==i&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,u=s.length;c<u;c++)l=s[c],!o[l].get&&(i=e[l],(r=wr(i,t))!==i&&(e[l]=r))}return e}function Ya(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function na(e,t,n){if(e[t])return e[t];const[r,i]=O(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function jh(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===jt||t===dr||(delete n.value,delete n.writable,n.get=()=>e[jt][t]),n}function uc(e){Zi()&&na(Ya(e,dr),cc)()}function zh(e){return uc(e),Reflect.ownKeys(e)}const Wh={get(e,t,n){if(t===al)return e;if(t===jt)return n;if(t===Xi)return uc(e),n;const r=Ya(e,dr),i=r[t];let l=i?i():e[t];if(t===dr||t===un||t==="__proto__")return l;if(!i){const s=Object.getOwnPropertyDescriptor(e,t);Zi()&&(typeof l!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(l=na(r,t,l)())}return wn(l)?dc(l):l},has(e,t){return t===al||t===jt||t===Xi||t===dr||t===un||t==="__proto__"?!0:(Zi()&&na(Ya(e,un),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:zh,getOwnPropertyDescriptor:jh};function Lt(e,t,n,r=!1){if(!r&&e[t]===n)return;const i=e[t],l=e.length;n===void 0?(delete e[t],e[un]&&e[un][t]&&i!==void 0&&e[un][t].$()):(e[t]=n,e[un]&&e[un][t]&&i===void 0&&e[un][t].$());let s=Ya(e,dr),o;if((o=na(s,t,i))&&o.$(()=>n),Array.isArray(e)&&e.length!==l){for(let c=e.length;c<l;c++)(o=s[c])&&o.$();(o=na(s,"length",l))&&o.$(e.length)}(o=s[cc])&&o.$()}function hc(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const i=n[r];Lt(e,i,t[i])}}function qh(e,t){if(typeof t=="function"&&(t=t(e)),t=wr(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const i=t[n];e[n]!==i&&Lt(e,n,i)}Lt(e,"length",r)}else hc(e,t)}function zr(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();const s=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)zr(e,[r[c]].concat(t),n);return}else if(o&&s==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&zr(e,[c].concat(t),n);return}else if(o&&s==="object"){const{from:c=0,to:u=e.length-1,by:h=1}=r;for(let f=c;f<=u;f+=h)zr(e,[f].concat(t),n);return}else if(t.length>1){zr(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let l=t[0];typeof l=="function"&&(l=l(i,n),l===i)||r===void 0&&l==null||(l=wr(l),r===void 0||wn(i)&&wn(l)&&!Array.isArray(l)?hc(i,l):Lt(e,r,l))}function Ye(...[e,t]){const n=wr(e||{}),r=Array.isArray(n),i=dc(n);function l(...s){Ge(()=>{r&&s.length===1?qh(n,s[0]):zr(n,s)})}return[i,l]}const il=Symbol("store-root");function ar(e,t,n,r,i){const l=t[n];if(e===l)return;const s=Array.isArray(e);if(n!==il&&(!wn(e)||!wn(l)||s!==Array.isArray(l)||i&&e[i]!==l[i])){Lt(t,n,e);return}if(s){if(e.length&&l.length&&(!r||i&&e[0]&&e[0][i]!=null)){let u,h,f,g,m,y,v,$;for(f=0,g=Math.min(l.length,e.length);f<g&&(l[f]===e[f]||i&&l[f]&&e[f]&&l[f][i]===e[f][i]);f++)ar(e[f],l,f,r,i);const C=new Array(e.length),S=new Map;for(g=l.length-1,m=e.length-1;g>=f&&m>=f&&(l[g]===e[m]||i&&l[g]&&e[m]&&l[g][i]===e[m][i]);g--,m--)C[m]=l[g];if(f>m||f>g){for(h=f;h<=m;h++)Lt(l,h,e[h]);for(;h<e.length;h++)Lt(l,h,C[h]),ar(e[h],l,h,r,i);l.length>e.length&&Lt(l,"length",e.length);return}for(v=new Array(m+1),h=m;h>=f;h--)y=e[h],$=i&&y?y[i]:y,u=S.get($),v[h]=u===void 0?-1:u,S.set($,h);for(u=f;u<=g;u++)y=l[u],$=i&&y?y[i]:y,h=S.get($),h!==void 0&&h!==-1&&(C[h]=l[u],h=v[h],S.set($,h));for(h=f;h<e.length;h++)h in C?(Lt(l,h,C[h]),ar(e[h],l,h,r,i)):Lt(l,h,e[h])}else for(let u=0,h=e.length;u<h;u++)ar(e[u],l,u,r,i);l.length>e.length&&Lt(l,"length",e.length);return}const o=Object.keys(e);for(let u=0,h=o.length;u<h;u++)ar(e[o[u]],l,o[u],r,i);const c=Object.keys(l);for(let u=0,h=c.length;u<h;u++)e[c[u]]===void 0&&Lt(l,c[u],void 0)}function zt(e,t={}){const{merge:n,key:r="id"}=t,i=wr(e);return l=>{if(!wn(l)||!wn(i))return i;const s=ar(i,{[il]:l},il,n,r);return s===void 0?l:s}}const gc=qt(),Ll=()=>Ut(gc),fc=qt(),Ze=()=>Ut(fc),mc=qt(),Pl=()=>Ut(mc),pc=qt(),ie=()=>Ut(pc),vc=qt(),Jt=()=>Ut(vc),$c=qt(),Ml=()=>Ut($c),_c=qt(),Dl=()=>Ut(_c),bc=qt(),yc=()=>Ut(bc),Rl=qt(),fn=()=>Ut(Rl);var Kh=p("<div class=cp-install-pwa-container>Install as Progressive Web App to get more screen space.<button>Install</button><button>Not now");function Jh(){const{isTouch:e,isPWA:t}=Jt(),[n,r]=O(!1),[i,l]=O(!1);let s;return window.addEventListener("beforeinstallprompt",o=>{s=o,r(!0)}),a(T,{get when(){return N(()=>!!(n()&&e()))()&&!t()},get children(){var o=Kh(),c=o.firstChild,u=c.nextSibling,h=u.nextSibling;return d(o,a(T,{get when(){return i()},children:" Failed to install"}),u),u.$$click=async()=>{if(s!==null){s.prompt();const{outcome:f}=await s.userChoice;if(f==="accepted")return s=null,r(!1)}l(!0)},h.$$click=()=>r(!1),o}})}_e(["click"]);const xr=location.hostname==="localhost",Ht={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};Ht.flavorTexts=ii(Ht);const Hn={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};Hn.flavorTexts=ii(Hn);const ra={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};ra.flavorTexts=ii(ra);const yn={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};yn.flavorTexts=ii(yn);const wc={CN:{flavorText:"China"},JP:{flavorText:"Japan"},KR:{flavorText:"South Korea"},TW:{flavorText:"Taiwan"}},Nl={anime:{api:"ANIME",flavorText:"Anime"},comic:{api:"COMIC",flavorText:"Comic"},doujinshi:{api:"DOUJINSHI",flavorText:"Doujinshi"},game:{api:"GAME",flavorText:"Game"},light_novel:{api:"LIGHT_NOVEL",flavorText:"Light Novel"},live_action:{api:"LIVE_ACTION",flavorText:"Live Action"},manga:{api:"MANGA",flavorText:"Manga"},multimedia_project:{api:"MULTIMEDIA_PROJECT",flavorText:"Multimedia Project"},novel:{api:"NOVEL",flavorText:"Novel"},original:{api:"ORIGINAL",flavorText:"Original"},other:{api:"OTHER",flavorText:"Other"},picture_book:{api:"PICTURE_BOOK",flavorText:"Picture Book"},video_game:{api:"VIDEO_GAME",flavorText:"Video Game"},visual_novel:{api:"VISUAL_NOVEL",flavorText:"Visual Novel"},web_novel:{api:"WEB_NOVEL",flavorText:"Web Novel"}};function ii(e){return Object.values(e).reduce((t,n)=>Object.values(n).reduce((r,i)=>Object.entries(i).reduce((l,[s,o])=>(l[s]=o.flavorText,l),r),t),{})}const Wn="anilist",Tr="jikan",Xh="animethemes",Ms="LOB_DEV_BRANCH",ll="ani",ja="mal",li="only-if-cached",Zh="default",Qh="fetch-once",eg="reload",kc="no-store",ha="anime",Sc="manga",tg="ANIME",Cc="Japanese",Ac="Not yet aired",ng="Finished Airing",rg="Currently Airing",ag="Publishing",Ds="Finished",ig="Discontinued",lg="On Hiatus",F=(e,t="Not true")=>{if(!e)throw new Error(t)},Ol=(e,t="Not false")=>F(!e,t),sg=(e="Assert unreachable")=>F(!1,e),Ct=(e,t="Value",n="")=>F(typeof e=="string",t+" is not type of string. "+n),hn=(e,t="Value",n="")=>F(typeof e=="function",t+" is not type of function. "+n),xc=(e,t="Value",n="")=>F(Number.isInteger(e),t+" is not type of integer. "+n),si=(e,t="Value",n="")=>{const r=t+" is not integer. "+n;F(typeof e=="string"||Number.isInteger(e),r),F(e&&Number.isInteger(+e),r)},qn=(e,t,n={},r)=>{F(t.length>10,"Query must be above of length 10");const i={"Content-Type":"application/json"};return e&&(i.Authorization="Bearer "+e),new zl("https://graphql.anilist.co",{method:"POST",headers:i,body:{query:t,variables:n}},r)},Fl=(e,t,n={},r)=>{const i=qn(e,t,n,r);return di(i,kc)},kn=(e,t)=>new zl(e,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},t),Ul=e=>e.data.Page,Tc=(e,t,n=1)=>Fl(e,Wc,{...t,page:n},Ul),og=(e,t)=>{const n=Tc(e,t,"pageless");return di(n,li)},cg=({token:e,id:t,isMalId:n,type:r})=>n?Ic(e,r,t):qn(e,Bl,{id:t},i=>i.data.Media),Xt=(e,t)=>{var r,i;F(t.id_in||t.idMal_in,"Missing list for ids");const n=((r=t.id_in)==null?void 0:r.length)||((i=t.idMal_in)==null?void 0:i.length);if(n)return qn(e,Ug(n),t,l=>Object.values(l.data).map(s=>s.media).flat())},dg=(e,t,n=1)=>qn(e,_g,{id:t,page:n},r=>r.data.Media.recommendations),Ic=(e,t,n)=>qn(e,Bl,{idMal:n,type:t.toUpperCase()},r=>r.data.Media),ug=({token:e,id:t,...n})=>{if(t)return qn(e,jc,{id:t,...n},Ul)},hg=e=>{switch(e){case"airing":return["AIRING"];case"activity":return["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"];case"forum":return["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"];case"follows":return["FOLLOWING"];case"media":return["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"];case"all":return;default:sg("Unknown notification type")}},Ec=(e,t,n=1)=>{const r=hg(t);return Fl(e,Nn,{page:n,types:r},Ul)},gg=(e,t)=>{const n=Ec(e,t,"pageless");return di(n,li)},Lc=(e,t,n=1)=>Fl(e,zc,{id:t,page:n},r=>r.data.Media),fg=(e,t)=>{const n=Lc(e,t,"pageless");return di(n,li)},mg=({name:e,type:t,token:n})=>(F(e,"Name is missing"),qn(n,sl,{userName:e.toLowerCase(),type:t.toUpperCase()},r=>r.data.MediaListCollection)),Pc=(e,t)=>{switch(Ct(e,"type"),si(t,"id"),e){case ha:return kn(Nc(t),n=>n.data);case Sc:return kn(Oc(t),n=>n.data)}},Mc=(e,t)=>{switch(Ct(e,"type"),si(t,"id"),e){case ha:return kn(Fc(t),n=>n.data);case Sc:return kn(Uc(t),n=>n.data)}},Dc=(e,t)=>{if(Ct(e,"type"),si(t,"id"),e===ha)return kn(Bc(t),n=>n.data)},pg=e=>(si(e,"id"),kn(kg(e),t=>t.data)),Bl=be`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
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
}`,vg=be`query ($page: Int, $id: Int, $type: LikeableType) {
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
}`,$g=be`query (
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
}`,_g=be`query media($id: Int, $page: Int) {
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
}`,bg=be`mutation (
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
}`,Rc=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,yg=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,wg=e=>`https://api.animethemes.moe/artist/${e}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`,Nc=e=>`https://api.jikan.moe/v4/anime/${e}/full`,Oc=e=>`https://api.jikan.moe/v4/manga/${e}/full`,Fc=e=>`https://api.jikan.moe/v4/anime/${e}/characters`,Uc=e=>`https://api.jikan.moe/v4/manga/${e}/characters`,kg=e=>`https://api.jikan.moe/v4/characters/${e}/full`,Bc=e=>`https://api.jikan.moe/v4/anime/${e}/staff`,Sg=(e,t)=>`https://api.jikan.moe/v4/${e}?${t}`,Cg=(e,t)=>`https://api.jikan.moe/v4/seasons/${e}?${t}`,Ag=e=>`https://api.jikan.moe/v4/genres/${e}`,xg=be`query ($id: Int, $page: Int) {
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
}`,Tg=be`query ($id: Int) {
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
}`,Nn=be`query ($page: Int, $types: [NotificationType]) {
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
}`,Vc=e=>be`query ($name: String) {
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
}`,Ig=Vc("anime"),Eg=Vc("manga"),Gc=e=>be`query ($name: String) {
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
}`,Lg=Gc("manga"),Pg=Gc("anime"),Hc=e=>be`query ($name: String) {
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
}`,Mg=Hc("manga"),Dg=Hc("anime"),Rg=be`query ($name: String) {
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
}`,Ng=be`query ($name: String) {
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
}`,Yc=e=>be`query ($name: String) {
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
}`,Og=Yc("manga"),Fg=Yc("anime"),Ug=e=>be`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
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
}`,Bg=e=>be`query ($ids: [Int]) {
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
}`,Vg=be`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,Gg=be`query ($id: Int!, $page: Int) {
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
}`,Hg=be`query ($id: Int!, $page: Int) {
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
}`,jc=be`query ($id: Int, $page: Int, $perPage: Int) {
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
}`,Yg=be`mutation (
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
}`,jg=be`query (
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
}`,sl=be`query ($userId: Int, $userName: String, $type: MediaType) {
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
}`,zc=be`query media($id: Int, $page: Int) {
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
}`,zg=be`query media($id: Int, $page: Int) {
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
}`,Wg=be`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,qg=be`mutation (
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
}`,Kg=be`mutation ($id: Int, $type: LikeableType) {
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
}`,Wc=be`query (
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
}`,Rs=be`query ($userId: Int, $type: MediaType, $perPage: Int) {
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
}`,Jg=be`mutation (
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
}`,Ti=be`query staff(
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
}`,Xg=be`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
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
}`,Ns=be`query character(
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
}`,Zg=be`query {
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
}`,Qg=be`query {
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
}`,ef=be`query (
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
}`,Os=be`query (
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
}`,tf=be`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,nf=be`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,rf=be`query ($mediaId: Int) {
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
}`,af=be`query ($id: Int, $name: String) {
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
}`,lf=be`query ($id: Int, $type: ActivityType, $page: Int) {
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
}`,sf=be`query {
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
}`;function be(e,...t){const n=[];for(let i=0;i<e.length;i++)n.push(e[i],t[i]||"");const r=/\s*([{}():,\[\]])\s*/g;return n.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}const ol=["WINTER","SPRING","SUMMER","FALL"],Na=(e=7)=>{const t=new Date;t.setDate(t.getDate()+e);const n=t.getFullYear(),r=of(t.getMonth());return F(Number.isInteger(e),"Offsetdays is not an integer"),{season:r,seasonYear:n,nextSeason:sr(r,n,1).season,nextYear:sr(r,n,1).year}};function sr(e,t,n=0){F(typeof t=="number","year is not a number"),F(typeof e=="string","season is not a string");const r=n%4,i=Math.trunc(n/4),l=ol.indexOf(e.toUpperCase());return(l+r<0||l+r>3)&&(t+=r/Math.abs(r)),{year:t+i,season:ol[(4+l+r)%4]}}function of(e){return ol[Math.floor(e/3)]}var hr,gr,sa,kt,fr,oa,mr,pr,vr,$r,Ft,cl,qc,dl,Kc;const ms=class ms{constructor({start:t,limit:n,interval:r=60,fillAmount:i=1,pool:l,defaultDelay:s=30}){st(this,Ft);st(this,hr,[]);st(this,gr,null);st(this,sa,null);st(this,kt);st(this,fr);st(this,oa);st(this,mr);st(this,pr);st(this,vr);st(this,$r,Promise.resolve());ot(this,kt,t),ot(this,fr,n),ot(this,oa,r),ot(this,mr,i),ot(this,vr,s),ot(this,pr,l),Tt(this,Ft,cl).call(this)}requestToken(){return Ie(this,kt)>0?(yi(this,kt)._--,!0):!1}enqueue(t){return ot(this,$r,Ie(this,$r).then(t).catch(n=>{console.error("Request error:",n)})),Ie(this,$r)}getDefaultDelay(){return Ie(this,vr)}getsNextToken(){const{promise:t,resolve:n}=Promise.withResolvers();return this.addToBucket(n),t}addToBucket(t){Ie(this,hr).push(t)}delayBucket(t){Tt(this,Ft,qc).call(this,t||Ie(this,vr))}};hr=new WeakMap,gr=new WeakMap,sa=new WeakMap,kt=new WeakMap,fr=new WeakMap,oa=new WeakMap,mr=new WeakMap,pr=new WeakMap,vr=new WeakMap,$r=new WeakMap,Ft=new WeakSet,cl=function(){clearInterval(Ie(this,gr)),ot(this,gr,setInterval(()=>Tt(this,Ft,dl).call(this),Ie(this,oa)*1e3))},qc=function(t){ot(this,kt,0),clearInterval(Ie(this,gr)),clearTimeout(Ie(this,sa)),ot(this,sa,setTimeout(()=>{Tt(this,Ft,cl).call(this),Tt(this,Ft,dl).call(this)},t*1e3))},dl=function(){var n;Ie(this,pr)instanceof ms?ot(this,kt,Math.min(Ie(this,kt)+Math.min(Ie(this,mr),Tt(n=Ie(this,pr),Ft,Kc).call(n)),Ie(this,fr))):ot(this,kt,Math.min(Ie(this,kt)+Ie(this,mr),Ie(this,fr)));const t=Ie(this,hr).slice();Ie(this,hr).length=0,t.forEach(r=>r())},Kc=function(){return Ie(this,kt)>0?yi(this,kt)._--:Ie(this,kt)};let bn=ms;const Ii=xr,Se=oi({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),cf=oi({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),ht=oi({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),Fs=oi({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),Ei={animeThemes:new bn({start:90,limit:90,interval:60,defaultDelay:20}),anilist:new bn({start:5,limit:5,interval:2,defaultDelay:20,pool:new bn({start:60,limit:90,interval:60,fillAmount:60})}),jikan:new bn({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new bn({start:3,limit:3,interval:1.25,pool:new bn({start:60,limit:60,interval:60,fillAmount:60})})})};function Us(e,t,n){let r=null;const i=t.reduce((l,s)=>(s.active&&(s.key==="season"?r=s.value:l.push(`${s.key}=${s.value}`)),l),[]);return n>1&&i.push(`page=${n}`),r?ae.getJson(Cg(r,i.sort().join("&")),l=>(l.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),l)):ae.getJson(Sg(e,i.sort().join("&")),l=>(l.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),l))}const oe={animeThemes:{themesByAniListId:ht(e=>ae.getJson(Rc(e))),artisBySlug:ht(e=>ae.getJson(wg(e)))},myAnimeList:{animeById:ht(e=>ae.getJson(Nc(e),t=>t.data)),mangaById:ht(e=>ae.getJson(Oc(e),t=>t.data)),animeCharactersById:ht(e=>ae.getJson(Fc(e),t=>t.data)),mangaCharactersById:ht(e=>ae.getJson(Uc(e),t=>t.data)),animeStaffById:ht(e=>ae.getJson(Bc(e))),mediaSearch:ht(Us),mediaSearchCache:Fs(Us),genresAndThemes:ht(e=>ae.getJson(Ag(e),t=>{const n=new Set,r=["genres","genres","themes"],i={genres:[],themes:[]};let l=0;return t.data.reduce((s,o)=>n.has(o.mal_id)?s:(o.name<s&&(l=Math.min(l+1,r.length-1)),i[r[l]].push(o),n.add(o.mal_id),o.name),""),i.genres.sort(),{translations:{[e]:Object.fromEntries(t.data.map(s=>[s.name,s.mal_id]))},...i}}))},anilist:{mediaId:Se((e,t)=>ae.authAnilist(t,Bl,{id:e,perPage:6})),rateRecommendation:async(e,t,n,r,i)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!=null,"Id missing"),F(n!=null,"Rating missing"),F(r!=null,"MediaId missing"),F(i!=null,"MediaRecommendationId missing"),await ae.authAnilist(e,bg,{id:t,rating:n,mediaId:r,mediaRecommendationId:i},s=>s.data.SaveRecommendation).send()),userByName:Se((e,t)=>(F(e,"Name is missing"),ae.authAnilist(t,af,{name:e},n=>n.data.User))),toggleFollow:async(e,t)=>(F(t,"id is missing"),await ae.authAnilist(e,Vg,{id:t},r=>r.data.ToggleFollow).send()),userFollowing:Se((e,t=1,n)=>(F(e,"id is missing"),ae.authAnilist(n,Hg,{id:e,page:t},r=>r.data.Page))),userAnimeStats:Se((e,t)=>ae.authAnilist(t,Ig,{name:e},n=>n.data.User.statistics.anime)),userMangaStats:Se((e,t)=>ae.authAnilist(t,Eg,{name:e},n=>n.data.User.statistics.manga)),userAnimeGenres:Se((e,t)=>ae.authAnilist(t,Pg,{name:e},n=>n.data.User.statistics.anime.genres)),userMangaGenres:Se((e,t)=>ae.authAnilist(t,Lg,{name:e},n=>n.data.User.statistics.manga.genres)),userAnimeTags:Se((e,t)=>ae.authAnilist(t,Dg,{name:e},n=>n.data.User.statistics.anime.tags)),userMangaTags:Se((e,t)=>ae.authAnilist(t,Mg,{name:e},n=>n.data.User.statistics.manga.tags)),userAnimeStudios:Se((e,t)=>ae.authAnilist(t,Rg,{name:e},n=>n.data.User.statistics.anime.studios)),userAnimeVoiceActors:Se((e,t)=>ae.authAnilist(t,Ng,{name:e},n=>n.data.User.statistics.anime.voiceActors)),userAnimeStaff:Se((e,t)=>ae.authAnilist(t,Fg,{name:e},n=>n.data.User.statistics.anime.staff)),userMangaStaff:Se((e,t)=>ae.authAnilist(t,Og,{name:e},n=>n.data.User.statistics.manga.staff)),characterIds:ht((e,t)=>ae.authAnilist(t,Bg(e),{ids:e},n=>Object.values(n.data).map(r=>r.characters).flat())),userFollowers:Se((e,t=1,n)=>(F(e,"id is missing"),ae.authAnilist(n,Gg,{id:e,page:t},r=>r.data.Page))),activityByUserId:Se((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,lf,{id:e}))),activityById:Se((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,Tg,{id:e},n=>n.data.Activity))),listOfActivityLikes:ht((e,t)=>(F(e,"Id is missing"),ae.authAnilist(t,vg,{id:e,type:"ACTIVITY"},n=>n.data.Page))),activityRepliesById:Se((e,t,n)=>(F(e,"Id is missing"),ae.authAnilist(n,xg,{id:e,page:t},r=>r.data.Page))),notifications:cf((e,t,n=1)=>{switch(t){case"airing":return ae.authAnilist(e,Nn,{page:n,types:["AIRING"]},r=>r.data.Page);case"activity":return ae.authAnilist(e,Nn,{page:n,types:["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"]},r=>r.data.Page);case"forum":return ae.authAnilist(e,Nn,{page:n,types:["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"]},r=>r.data.Page);case"follows":return ae.authAnilist(e,Nn,{page:n,types:["FOLLOWING"]},r=>r.data.Page);case"media":return ae.authAnilist(e,Nn,{page:n,types:["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"]},r=>r.data.Page);case"all":default:return ae.authAnilist(e,Nn,{page:n},r=>r.data.Page)}}),searchUsers:ht((e,t,n)=>(F(e,"Search is missing"),ae.authAnilist(n,$g,{search:e,page:t},r=>r.data.Page))),mediaListByUserName:Se((e,t,n)=>(F(e,"Name is missing"),ae.authAnilist(n,sl,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),mediaListByUserNameFetchOnce:ht((e,t,n)=>(F(e,"Name is missing"),ae.authAnilist(n,sl,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),favouritesByUserId:Se((e,t,n)=>(F(e,"Id is missing"),F(t,"Page is missing"),ae.authAnilist(n,jg,{id:e,page:t},r=>r.data.User.favourites))),mutateFavourites:async(e,t)=>await ae.authAnilist(e,Yg,t).send(),characterInfoById:Se((e,t)=>ae.authAnilist(t,Ns,{id:e},n=>n.data.Character)),characterMediaById:Se((e,t,n={})=>ae.authAnilist(e,Ns,{...n,page:n.page||1,sort:n.sort||"POPULARITY_DESC",onList:n.onList,withRoles:n.withRoles||!0,id:t},r=>r.data.Character.media)),staffInfoById:Se((e,t)=>ae.authAnilist(t,Ti,{id:e},n=>n.data.Staff)),studioInfoAndMediaById:Se((e,t={},n)=>ae.authAnilist(n,Xg,{...t,page:t.page||1,sort:t.sort||"START_DATE_DESC",onList:t.onList,id:e},r=>r.data.Studio)),staffCharactersById:Se((e,t,n={})=>ae.authAnilist(e,Ti,{...n,characterPage:n.characterPage||1,sort:n.sort||"START_DATE_DESC",onList:n.onList,withCharacterRoles:!0,id:t},r=>r.data.Staff.characterMedia)),staffMediaById:Se((e,t,n,r)=>ae.authAnilist(e,Ti,{...r,staffPage:r.staffPage||1,sort:r.sort||"START_DATE_DESC",onList:r.onList,withStaffRoles:!0,id:t,type:n},i=>i.data.Staff.staffMedia)),genresAndTags:ht(()=>ae.anilist(tf,{},e=>e.data)),externalSources:ht(e=>ae.anilist(nf,{type:e||void 0},t=>t.data.ExternalLinkSourceCollection)),characters:Se((e,t=1,n)=>ae.authAnilist(n,zc,{id:e,page:t},r=>r.data.Media)),allMediaStaff:Se((e,t=1,n)=>ae.authAnilist(n,zg,{id:e,page:t},r=>r.data.Media)),trendingMedia:Se(e=>{const t=Na();return ae.authAnilist(e,Zg,{season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingAnime:Se(e=>{const t=Na();return ae.authAnilist(e,ef,{type:"ANIME",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingManga:Se(e=>{const t=Na();return ae.authAnilist(e,Qg,{type:"MANGA",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),mediaListEntry:async(e,t)=>(F(t,"MediaId missing"),F(typeof e!="function","This specific api doesnt support signals"),await ae.authAnilist(e,rf,{mediaId:t}).send()),getAuthUserData:Se(e=>ae.authAnilist(e,sf,{},t=>t.data.Viewer)),getActivity:Se((e,t,n=1)=>ae.authAnilist(e,Wc,{...t,page:n},r=>r.data.Page)),searchMedia:ht((e,t,n,r={})=>{const i=t.reduce((l,s)=>(s.active&&(l[s.key]=s.value),l),{page:n});return Object.entries(r).forEach(([l,s])=>{l==="format"||l==="season"||l==="seasonYear"?i[l]=s:l==="episodeGreater"?i[l]=Math.max(s,i[l]||0):(i[l]&&(i[l]=[s,i[l]].flat()),i[l]??(i[l]=s))}),ae.authAnilist(e,Os,i,l=>l.data.Page)}),searchMediaCache:Fs((e,t,n)=>{const r=t.reduce((i,l)=>(l.active&&(i[l.key]=l.value),i),{page:n});return ae.authAnilist(e,Os,r,i=>i.data.Page)}),friendsMediaScore:Se((e,t,n)=>ae.authAnilist(e,jc,{id:t,...n})),mutateMedia:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t,"Variables missing"),F(t.id||t.mediaId,"No mutation id given"),await ae.authAnilist(e,Jg,t,r=>r.data.SaveMediaListEntry).send()),deleteMediaListEntry:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!==void 0,"Variables missing"),await ae.authAnilist(e,Wg,{id:t}).send()),toggleActivityLike:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t.id||t.mediaId,"No mutation id given"),await ae.authAnilist(e,Kg,{...t,type:"ACTIVITY"}).send()),toggleFavourite:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),await ae.authAnilist(e,qg,t).send()),wachingAnime:Se((e,t)=>ae.authAnilist(t,Rs,{userId:e,type:"ANIME",perPage:40})),readingManga:Se((e,t)=>ae.authAnilist(t,Rs,{userId:e,type:"MANGA",perPage:40}))}};var Vn,_r,br,xn,Jc,Xc,Zc;const Qr=class Qr{constructor(t,{method:n="POST",headers:r,body:i},l){st(this,xn);De(this,"expires");st(this,Vn);st(this,_r);st(this,br);F(t,"Url missing"),F(n,"Method missing"),n==="POST"&&F(i,"Body is missing");const s={"Content-Type":"application/json"};this.url=t,this.method=n,this.headers=r||s,this.body=i,this.fromCache=!0,ot(this,Vn,l),this.cacheKey=Tt(this,xn,Jc).call(this)}abort(){var t;(t=Ie(this,_r))==null||t.abort()}async send(){var i;const t=Tt(this,xn,Xc).call(this);ot(this,_r,new AbortController),ot(this,br,Ie(this,_r).signal);const n=await t.enqueue(async()=>{for(;;){if(Ie(this,br).aborted)return null;if(document.hidden){const{promise:o,resolve:c}=Promise.withResolvers();document.addEventListener("visibilitychange",c,{once:!0}),await o}if(!t.requestToken()){await Promise.race([t.getsNextToken(),new Promise(o=>Ie(this,br).addEventListener("abort",o))]);continue}const s=await Tt(this,xn,Zc).call(this);if(s.status===429){console.warn("429 received, backing off...",this.url);const o=parseInt(s.headers.get("Retry-After"))||t.getDefaultDelay();await new Promise(c=>setTimeout(c,o*1e3));continue}if(s.status===500&&this.url.includes("anilist")){console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds"),await new Promise(o=>setTimeout(o,2e3));continue}return s}});if(n==null)return null;if(this.status=n.status,!n.ok)return this.error=!0,this;const r=await n.json();return this.data=((i=Ie(this,Vn))==null?void 0:i.call(this,r))||r,this.fromCache=!1,this}static anilist(t,n={},r){return Qr.authAnilist(null,t,n,r)}static authAnilist(t,n,r={},i){F(n.length>10,"Query must be above of length 10");const l={"Content-Type":"application/json"};return t&&(l.Authorization="Bearer "+t),new Qr("https://graphql.anilist.co",{method:"POST",headers:l,body:{query:n,variables:r}},i)}static getJson(t,n){return new Qr(t,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},n)}};Vn=new WeakMap,_r=new WeakMap,br=new WeakMap,xn=new WeakSet,Jc=function(){let t=`${this.url}-${this.method}`;if(this.body){const n=JSON.stringify(this.body).replaceAll('"',"");t+=n}if(this.headers){const n=JSON.stringify(this.headers).replaceAll('"',"");t+=n}if(Ie(this,Vn)){const n=Ie(this,Vn).toString().replace(/[\n\t\r ]+/g,"");t+=n}return t},Xc=function(){if(this.url.startsWith("https://graphql.anilist.co"))return Ei.anilist;if(this.url.startsWith("https://api.jikan.moe"))return Ei.jikan;if(this.url.startsWith("https://api.animethemes.moe"))return Ei.animeThemes;F(!1,`Fetch to url "${this.url}" does not have any rate limits`)},Zc=function(){const t={method:this.method,headers:this.headers,body:JSON.stringify(this.body),cache:"default"};return Math.random()>1?(console.log("Error route"),fetch("http://127.0.0.1:3000/api/version",t)):fetch(this.url,t)};let ae=Qr;const Li=new Map,$a=new Map;function oi(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(n){return(...r)=>{const[i,l]=O(void 0),[s,o]=O(!1),[c,u]=O(!1),[h,f]=O(!0);let g=null;const m=e.type=="default"||e.type=="only-if-cached",y=(Ii==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&m==!1,v=(k,b)=>{if(typeof k=="function"&&(k=k(Ce(i))),k=structuredClone(k),F(Ce(i)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof k=="object","Data should always be JSON object data"),e.type!=="no-store"&&(Li.set(g.cacheKey,k),e.storeName)){f(!1);const A=Je.fetchCache();A.onsuccess=w=>{const _=w.target.result,I=Je.store(_,e.storeName,"readwrite",()=>f(!0),()=>f(!0)).put(k);b&&(I.onsuccess=b)}}},$=k=>{k.cacheKey===g.cacheKey&&l(k)},C=k=>{typeof k=="function"&&(k=k(Ce(i))),l(k)},S=async()=>{if(e.type==="only-if-cached")return u(!1),l(null);$a.has(g.cacheKey)||$a.set(g.cacheKey,g.send());const k=await $a.get(g.cacheKey);if($a.delete(g.cacheKey),k!==null){if(e.expiresInSeconds){const b=new Date;k.expires=b.setSeconds(b.getSeconds()+e.expiresInSeconds)}Ge(()=>{k.error?(o(!0),console.assert(!Ii,"Fetch error, not saving data to cache")):(v(k),$(k)),u(!1)})}};return W(()=>{const k=r.map(A=>typeof A=="function"?A():A);if(k.some(A=>A===void 0))return;g==null||g.abort(),g=n(...k),Ii&&console.log("Fetching",e.type,g.body||g.url),Ge(()=>{u(!0),o(!1)});const b=Li.get(g.cacheKey);if(b&&b.expires>new Date)if($({...b,fromCache:!0}),e.type==="fetch-once"){u(!1);return}else y===!1&&u(!1);else if(e.type!=="no-store"&&e.storeName){const A=Je.fetchCache();A.onerror=S,A.onsuccess=w=>{const _=w.target.result,I=Je.store(_,e.storeName,"readonly").get(g.cacheKey);I.onerror=S,I.onsuccess=E=>{if(E.target.result&&(F(E.target.result.expires,"Cache should have a expiration date"),F(E.target.result.data,"Cache should always have data"),E.target.result.expires>new Date)){y==!1&&u(!1);const L={...E.target.result,fromCache:!0};return e.type!=="only-if-cached"&&Li.set(L.cacheKey,L),$(L)}y==!1&&S()}}}else y==!1&&S();y&&S()}),Object.defineProperties(i,{error:{get:()=>s()},loading:{get:()=>c()},indexedDBClosed:{get:()=>h()}}),He(()=>g==null?void 0:g.abort()),[i,{mutate:C,refetch:S,mutateCache:v}]}}}var yr,Oa;const cr=class cr{static store(t,n,r,i,l){const s=t.transaction(n,r);return i?s.onerror=i:s.onerror=console.warn,l&&(s.oncomplete=l),s.objectStore(n)}static fetchCache(t){const n=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var l,s;const i=r.target.result;switch(r.oldVersion){case 0:Tt(l=cr,yr,Oa).call(l,i,"results",{keyPath:"cacheKey"});case 1:Tt(s=cr,yr,Oa).call(s,i,"debug",{keyPath:"cacheKey"})}},n}static user(t){const n=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var l;const i=r.target.result;switch(r.oldVersion){case 0:Tt(l=cr,yr,Oa).call(l,i,"data")}},n}};yr=new WeakSet,Oa=function(t,n,r){t.objectStoreNames.contains(n)||t.createObjectStore(n,r)},st(cr,yr);let Je=cr;const Bs=e=>{var t,n;return((n=(t=e.anime)==null?void 0:t[0])==null?void 0:n.animethemes)??[]},df=({id:e,api:t,type:n})=>{if(n===ha)switch(t){case ll:return kn(Rc(e),Bs);case ja:return kn(yg(e),Bs)}};class uf{constructor(t,n,r){F(t,"Missing cacheKey"),F(r,"Don't cache empty data"),F(n,"Expiration date is missing"),this.data=r,this.cacheKey=t,this.expires=Gf(n)}}class cn{constructor(t,n,r){F(t,"CacheKey is missing"),this.cacheKey=t,this.data=n,this.cacheType=r}}const Pi={},Qe=e=>Gl({cacheTypeSignal:()=>null,disableNullValues:!1,senderDisabledSignal:()=>!1,fetcherSignal:e}),Sn=(e,t)=>Gl({cacheTypeSignal:e,disableNullValues:!0,senderDisabledSignal:()=>!1,enableDebugLogs:!1,fetcherSignal:t}),Vl=(e,t)=>Gl({cacheTypeSignal:()=>null,disableNullValues:!0,senderDisabledSignal:e,enableDebugLogs:!1,fetcherSignal:t}),Gl=({cacheTypeSignal:e,disableNullValues:t,senderDisabledSignal:n,enableDebugLogs:r,fetcherSignal:i,fetchOnDebug:l})=>{hn(e,"cacheTypeSignal is not a function"),hn(n,"senderDisabledSignal is not a function"),hn(i,"fetcherSignal is not a function");const[s,o,c]=mf(void 0),[u,h]=O(!1),[f,g]=O(!1),[m,y]=O(!0);let v=null,$=null;const C=I=>{if(typeof I=="function"){const{data:E,cacheType:L}=Ce(s)||{};return I(new cn(v.cacheKey,E,L))}return I},S=(I,E)=>{var Y,q;const L=C(I),R=new uf(L.cacheKey,v.settings.expiresInSeconds,structuredClone(L.data));R.cacheKey===v.cacheKey&&c(L);const{type:U,storeName:G}=v.settings;if(U==="no-store"||!G)return;(q=(Y=v.settings).saveToSessionStorage)==null||q.call(Y,R),Pi[R.cacheKey]=R,y(!1);const J=Je.fetchCache();J.onsuccess=le=>{const Z=le.target.result,X=Je.store(Z,G,"readwrite",()=>y(!0),()=>y(!0)).put(R);E&&(X.onsuccess=E)}},k=I=>{F(I instanceof cn),I.cacheKey===v.cacheKey&&o(I)},b=I=>{I=C(I),F(I instanceof cn),o(I)},A=(I,E)=>{I=C(I),S(I,E),b(I)},w=async(I,E)=>{if(I!==v)return;if(F(I,"fetcher should not be undefined"),E==="only-if-cached"){Ge(()=>{t||(o(new cn(I.cacheKey,null)),g(!1))});return}$==null||$.abort();const L=new AbortController;$=L;const R=await Bf(I,L.signal);R===null?I===v&&Ge(()=>{h(!0),g(!1),!L.signal.aborted&&!t&&o(new cn(I.cacheKey,null))}):Ge(()=>{const U=new cn(I.cacheKey,R);S(U),k(U),I===v&&g(!1)})},_=N(I=>{const E=i(),L=e()||(E==null?void 0:E.settings.type)||I;if(v!==E)return L;switch(Ct(I,"prev","If fetcher is same as currentFetcher why is there no previous cacheType"),I){case"only-if-cached":if(L==="default")return L;case"default":if(L==="fetch-once")return L;case"fetch-once":if(L==="reload"||L==="no-store")return L}return I}),x=N(()=>{const I=i(),E=n();return v!==I?E:!1});return P(()=>{if(x())return;const I=i();if(!I){v=null,o(void 0);return}F(I instanceof zl);const E=_();Ct(E,"caheType");const L=xr&&!I.settings.fetchOnDebug&&!l&&E!=="no-store",R=!L&&(E==="fetch-once"||E==="reload"||E==="no-store"),U=I.cacheKey;if(v=I,Ge(()=>{h(!1),g(!0)}),U in Pi){const G=Pi[U];if(L||E==="only-if-cached"||E==="fetch-once"||E==="default"){Ge(()=>{o(new cn(G.cacheKey,G.data,"local")),g(!1)});return}else o(new cn(G.cacheKey,G.data,"local"))}else if(E!=="no-store"&&I.settings.storeName){const G=Je.fetchCache(),J=()=>!R&&w(I,E);G.onerror=J,G.onsuccess=Y=>{const q=Y.target.result,Z=Je.store(q,I.settings.storeName,"readonly").get(U);Z.onerror=J,Z.onsuccess=te=>{const X=te.target.result;if(X&&(F(X.expires,"Cache should have a expiration date"),F(X.data,"Cache should always have data"),X.expires>new Date)){const pe=new cn(U,X.data,"indexedDB");R?k(pe):Ge(()=>{k(pe),g(!1)});return}J()}}}R&&w(I,E)}),Object.defineProperties(s,{error:{get:()=>u()},loading:{get:()=>f()},indexedDBClosed:{get:()=>m()}}),He(()=>$==null?void 0:$.abort()),[s,{mutate:b,refetch:()=>w(Ce(i),Ce(i).settings.type),mutateCache:S,mutateBoth:A}]},Hl=(e,t)=>{const[n,r]=O(localStorage.getItem(e)??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,o),o})}]},hf=e=>{if(e==="true")return!0;if(e==="false")return!1},Vs=(e,t)=>{const[n,r]=O(hf(localStorage.getItem(e))??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,String(o)),o})}]},gf=e=>{try{return JSON.parse(e)}catch{}},ff=(e,t)=>{const[n,r]=O(gf(localStorage.getItem(e))??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o)),o})}]},Yl=(e=!0)=>O(xr===e),Gs=e=>{hn(e);const[t,n]=O();return P(()=>{const r=e();n(r)}),[t,n]},mf=e=>{const[t,n]=O(0);let r=e;return[()=>(t(),r),o=>(r=typeof o=="function"?o(r):o,n(u=>u+1),r),o=>(r=typeof o=="function"?o(r):o,r)]},pf=()=>{Ge(()=>{Qc(e=>e+1),td(e=>e+1),ed(e=>e+1),nd(e=>e+1)})};let Pt=null;const vf=e=>{Pt===null?(Pt=[e],e()):Pt.includes(e)||Pt.push(e)},$f=()=>{Pt==null||Pt.shift();const e=Pt==null?void 0:Pt[0];e?e():Pt=null},_f=()=>{setTimeout(()=>Qc(e=>e-1),1e3),setTimeout(()=>ed(e=>e-1),3e3),setTimeout(()=>td(e=>e-1),5e3),setTimeout(()=>nd(e=>e-1),1e4)},[wC,Qc]=O(0),[kC,ed]=O(0),[za,td]=O(0),[SC,nd]=O(0),bf=()=>{Ge(()=>{rd(e=>e+1),ad(e=>e+1),id(e=>e+1),ld(e=>e+1)})};let Mt=null;const yf=e=>{Mt===null?(Mt=[e],e()):Mt.includes(e)||Mt.push(e)},wf=()=>{Mt==null||Mt.shift();const e=Mt==null?void 0:Mt[0];e?e():Mt=null},kf=()=>{setTimeout(()=>rd(e=>e-1),1e3),setTimeout(()=>ad(e=>e-1),2e3),setTimeout(()=>id(e=>e-1),5e3),setTimeout(()=>ld(e=>e-1),1e4)},[ci,rd]=O(0),[Sf,ad]=O(0),[CC,id]=O(0),[AC,ld]=O(0),[Hs,Cf]=Ye({}),aa=7*24*60*60,nr=24*60*60,ul=new Date/1e3,In=e=>Array.isArray(e);function Wt(e,t){if(e){if(In(e))return Object.fromEntries(e.map(n=>[n,!0]))}else return t||null;return{[e]:!0}}function We(e){return In(e)?e:e?[e]:[]}const Af=(...e)=>{const t=[];for(const n of e)t.push(...We(n));return t},Ys=(e,t)=>(e=We(e),e.includes(t)),xf=(e,...t)=>We(e).filter(n=>!t.includes(n)),js=(e,t,n)=>(e=We(e),(n===void 0?e.includes(t):n)?e=xf(e,t):e.push(t),e);function or(e){return new Set(We(e))}function Tf(e){F(In(e),"Not array");const t=new Map;return e.forEach(n=>t.set(n.toLowerCase(),n)),Array.from(t.values())}function Wr(e,t){return e===t?!0:typeof e!=typeof t?!1:In(e)?e.length===t.length&&e.every((n,r)=>Wr(n,t[r])):!1}function Vt(e){return In(e)?e[0]:e}function sd(e,t,n=0,r=e.length-1){for(;n<=r;){const i=(r+n)/2|0,l=t(e[i],i,e);if(l===0)return i;l<0?r=i-1:n=i+1}return-1}function ur(e,t,n=0,r=e.length-1){let i=null;for(;n<=r;){const s=(r+n)/2|0;if(i=t(e[s],s,e),i===0)return s;i<0?r=s-1:n=s+1}return i===null?0:((r+n)/2|0)==e.length-1?i<0?e.length-1:e.length:i<0?r+1:n-1}const If=(e,t,n)=>(hn(t),!In(e)||e.length===0?n:e.find(t)??e[0]??n),Ef=(e,t,n)=>!In(e)||e.length===0?n:e.at(t%e.length);function ia(e,t){if(In(e))return e[Math.round((e.length-1)*t)]}const Ne=e=>e!==1?"s":"",qe=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",jl=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},Lf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"China";case"TW":return"Taiwan";case"KR":return"South Korea";default:return"Japan"}},kr=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return qe(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}};function Pf(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return qe(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:return console.error("Unknown status"),e}}const ye=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},zs=e=>{if(e!=null)return F(typeof e=="number","Number is not typeof number"),Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e)},Ke=e=>(F(e!=null,"No title given"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Ve=e=>(F(e.type,"type is missing"),F("id"in e,"id is missing"),"/ani/"+e.type.toLowerCase()+"/"+e.id+"/"+Ke(e.title.userPreferred)),Wa=e=>{if(F("year"in e,"No year found"),F("month"in e,"No month found"),F("day"in e,"No day found"),!e.year&&!e.month&&!e.day)return"";if(e.year&&!e.month&&!e.day)return e.year.toString();const t={};return e.year&&(t.year="numeric"),e.month&&(t.month="short"),e.day&&(t.day="numeric"),new Date(e.year||1970,e.month-1||0,e.day||1).toLocaleDateString("us-US",t)},od=e=>{const t=new Date(e),n={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString("us-US",n)};function _a(e,t){t&&e(Ve(t))}const Ws=e=>typeof e=="object"&&e,Mf=(e,...t)=>{Ol(t.length<1,"Give more objects");for(const n of t)cd(e,n);return e},cd=(e,t)=>{for(const n in t)e[n]??(e[n]=t[n]),Ws(e[n])&&Ws(t[n])?cd(e[n],t[n]):e[n]=t[n]},Df=e=>typeof e=="function",dd=e=>Df(e)?e():e,Rf=(e,t)=>{hn(e);const n=[];for(const r of t){const i=dd(r);if(i===void 0)return;n.push(i)}return e(...n)},Pe=(e,...t)=>N(()=>Rf(e,t)),Nf=[li,Zh,Qh,eg,kc],Cn=e=>N(()=>{for(const t of Nf)if(dd(e[t]))return t});class Of{constructor(t={}){this.expiresInSeconds=t.expiresInSeconds,this.fetchOnDebug=t.fetchOnDebug||!1,this.storeName=t.storeName||"",this.type=t.type||"default",this.saveToSessionStorage=t.saveToSessionStorage,F(typeof t=="object","Settings must be object"),F(!t.active||typeof t.active=="function","settings.active should a signal"),F(t.type==="no-store"||Number.isInteger(t.expiresInSeconds),"Give explicit expiration time. 0 if the data never expires"),F(t.type==="no-store"||t.expiresInSeconds>0,"Expiration time should be more than 0"),F(t.type!=="no-store"||!t.storeName,"StoreName is not used because cache type is no-store"),F(!t.saveToSessionStorage||typeof t.saveToSessionStorage=="function","saveToSessionStorage is not function")}}class zl{constructor(t,n,r){F(t,"URL is missing"),this.url=t,this.options=n,this.formatResponse=r,this.settings=new Of({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365})}get cacheKey(){var t;return`${this.url}${((t=JSON.stringify(this.options))==null?void 0:t.replaceAll('"',""))||""}${this.formatResponse||""}`}}const di=(e,t)=>(e&&(e.settings.type=t),e),Ff=(e,t)=>(tm(e.url),Uf(e,t).finally(()=>nm(e.url))),Uf=(e,t)=>{const n={...e.options||{},signal:t};if(n.body&&(n.body=JSON.stringify(e.options.body)),n.cache??(n.cache="default"),Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",n);case 2:return fetch("https://http.codes/500",n);case 3:return fetch("https://http.codes/cors",n)}else return e.delay?new Promise((r,i)=>{fetch(e.url,n).then(l=>setTimeout(()=>r(l),e.delay)).catch(i)}):fetch(e.url,n)},ba={},ya={};let Mi=0;const Bf=async(e,t)=>{var i,l,s;try{const{resolve:o,promise:c}=Promise.withResolvers();for(let u=0;u<3&&!t.aborted;u++){em(e.url)&&(ka(e.url,o),await c);try{var n=await(ba[i=e.cacheKey]??(ba[i]=Ff(e,t)))}catch{if(t.aborted)return null}finally{delete ba[e.cacheKey]}const h=Zf(e.url,(n==null?void 0:n.status)||"cors");if((n==null?void 0:n.status)===429&&n.headers.get("Retry-After")){ka(e.url,o);const f=parseInt(n.headers.get("Retry-After"));await new Promise(g=>setTimeout(g,f*1e3));continue}else if((n==null?void 0:n.status)===400&&Mi<3){if(ka(e.url,o),(await n.json()).errors.some(g=>g.message==="Invalid token")){Mi++,await new Promise(g=>setTimeout(g,3e3));continue}}else if(h){ka(e.url,o),await new Promise(f=>setTimeout(f,h));continue}else if(!(n!=null&&n.ok))return null;e.url.includes(Wn)&&(Mi=0);try{var r=await(ya[l=e.cacheKey]??(ya[l]=n.json()))}catch(f){return console.error(f),null}finally{delete ya[e.cacheKey]}return((s=e.formatResponse)==null?void 0:s.call(e,r))||r}}catch{}finally{Qf(e.url)}return null},ga=(e,t,n=1)=>{const r=[];let i=null,l=!1;async function s(...c){r.push(async()=>{r.shift(),l=!0,await e(...c),l=!1,o(t)}),r.length==n+1&&r.shift(),!l&&(i===null?o():o(t))}return s.bufferSize=()=>r.length,s;function o(c){const u=r[0];clearTimeout(i),i=null,u&&(c?i=setTimeout(u,c):(l=!0,u()))}},ud=e=>{let t;const n=(r,...i)=>{clearTimeout(t),setTimeout(()=>e(...i),r)};return He(()=>clearTimeout(t)),n},Vf=e=>{const t=new Date;return t.setMilliseconds(t.getMilliseconds()+e),t},Gf=e=>Vf(e*1e3),la=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Hf=e=>!isNaN(e)&&typeof e=="number",Yf=(e,t)=>{const n=Number(e);return Hf(n)?n:t},jf=(e,t)=>Math.max(e??t,t??e),wa=(e,t,n)=>e+n*(t-e),qs=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",zf=e=>{if(!(e!=null&&e.length))return"";switch(e){case ng:case Ds:return Ds;case Ac:return"Not yet released";case rg:case ag:return"Releasing";case ig:return"Cancelled";case lg:return"On hiatus";default:return console.error("Unknown media format"),e}},hd=(e,t)=>"/mal/"+e+"/"+t.mal_id+"/"+Yn(t.title),Wf=e=>"/mal/character/"+e.mal_id+"/"+Yn(e.name),gd=e=>{Ct(e.type,"Media type"),xc(e.id,"Media id");const t="/ani/"+e.type.toLowerCase()+"/"+e.id;return e.title.userPreferred?t+"/"+Yn(e.title.userPreferred):t},qf=()=>location.hostname==="kassu11.github.io"?24951:location.port==5173?7936:location.port==5174?31649:-1,Yn=e=>(Ct(e,"title"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Kf=e=>e!==1?"s":"",Sr=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Jf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},Xf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"ANIME":case"COMIC":case"DOUJINSHI":case"GAME":case"MANGA":case"NOVEL":case"ORIGINAL":case"OTHER":return Sr(e);case"LIGHT_NOVEL":case"LIVE_ACTION":case"MULTIMEDIA_PROJECT":case"PICTURE_BOOK":case"VISUAL_NOVEL":case"VIDEO_GAME":case"WEB_NOVEL":return Sr(e.replace("_"," "));default:return console.error("Unknown media format"),e}},hl=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return Sr(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}},fd=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CANCELLED":case"FINISHED":case"HIATUS":case"NOT_YET_RELEASED":case"RELEASING":return Sr(e.replaceAll("_"," "));default:return console.error("Unknown media format"),e}},Zf=(e,t)=>{if(e.includes(Wn))switch(t){case 429:return 25e3;case 500:return 3e3;case"cors":return 4e4}if(e.includes(Tr))switch(t){case 429:return 1e3}if(e.includes(Xh))switch(t){case 429:return 25e3}},ka=(e,t)=>{e.includes(Wn)?vf(t):e.includes(Tr)&&yf(t)},Qf=e=>{e.includes(Wn)?$f():e.includes(Tr)&&wf()},em=e=>{if(e.includes(Wn))return Pt!==null;if(e.includes(Tr))return Mt!==null},tm=e=>{e.includes(Wn)?pf():e.includes(Tr)&&bf()},nm=e=>{e.includes(Wn)?_f():e.includes(Tr)&&kf()};var rm=p("<li data-k-c7a289e2><button data-k-c7a289e2>Logout"),am=p("<li data-k-c7a289e2>"),im=p('<img data-k-c7a289e2 alt="Profile avatar">'),lm=p("<li data-k-c7a289e2 class=profile>"),sm=p("<nav data-k-c7a289e2 class=main-navigation><ul data-k-c7a289e2><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2>"),om=p("<main data-k-c7a289e2 id=page-content>"),cm=p("<footer data-k-c7a289e2 class=main-footer>"),dm=p("<li data-k-c7a289e2><a data-k-c7a289e2>Login with AniList"),um=p("<div data-k-c7a289e2 class=dev-branch><p data-k-c7a289e2>Preview: </p><button data-k-c7a289e2>Back to Production");const hm=e=>fetch("http://localhost:"+e,{signal:AbortSignal.timeout(100)}).then(t=>!0).catch(t=>!1);function gm(e){const t=`https://anilist.co/api/v2/oauth/authorize?client_id=${qf()}&response_type=token`,{accessToken:n,authUserData:r,logoutUser:i}=ie();let l=new AbortController;return W(()=>{l.abort(),l=new AbortController,window.addEventListener("keydown",async s=>{if(s.target!==document.body||s.shiftKey||s.ctrlKey)return;const{port:o,hostname:c,href:u,origin:h}=location;s.key==="d"&&s.altKey&&(s.preventDefault(),c==="localhost"?o!=5174&&await hm(5174)?window.open(u.replace(h,"http://localhost:5174")):window.open(u.replace(h,"https://kassu11.github.io")):window.open(u.replace(h,"http://localhost:5173")))},{signal:l.signal})}),[(()=>{var s=sm(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling;return d(c,a(B,{href:"/",children:"Home"})),d(u,a(B,{href:"/browse/anime",children:"Anime"})),d(h,a(B,{href:"/browse/manga",children:"Manga"})),d(f,a(B,{href:"/browse/media",children:"Search"})),d(o,a(T,{get when(){return n()},get fallback(){return(()=>{var g=dm(),m=g.firstChild;return V(m,"href",t),g})()},get children(){return[(()=>{var g=rm(),m=g.firstChild;return m.$$click=()=>i(),g})(),a(T,{get when(){return r()},get children(){return[(()=>{var g=am();return d(g,a(B,{href:"/notifications",get children(){return["Notifications (",N(()=>r().data.unreadNotificationCount),")"]}})),g})(),(()=>{var g=lm();return d(g,a(B,{get href(){return"/user/"+r().data.name},get children(){return[N(()=>r().data.name),(()=>{var m=im();return P(()=>V(m,"src",r().data.avatar.large)),m})()]}})),g})()]}})]}}),null),s})(),a(T,{get when(){return localStorage.getItem(Ms)},children:s=>(()=>{var o=um(),c=o.firstChild;c.firstChild;var u=c.nextSibling;return d(c,s,null),u.$$click=()=>{localStorage.removeItem(Ms),location.reload()},o})()}),a(Jh,{}),(()=>{var s=om();return d(s,()=>e.children),s})(),cm()]}_e(["click"]);var fm=p("<p>");const[Di,mm]=O(ul);setInterval(()=>mm(new Date/1e3),1e3*30);function pm(e){const t=e.airingAt<Di(),n=N(()=>{const i=Math.abs(e.airingAt-Di());return t?aa-i%aa:i}),r=N(i=>i===!1&&e.airingAt<Di()?(e.setAiringEpisode(l=>l+1),!0):i,!1);return[a(T,{get when(){return!t&&r()},children:"aired in"}),(()=>{var i=fm();return d(i,a(T,{get when(){return Math.floor(n()/3600/24)},children:l=>[l,"d "]}),null),d(i,a(T,{get when(){return Math.floor(n()/3600%24)},children:l=>[l,"h "]}),null),d(i,a(T,{get when(){return Math.floor(n()%3600/60)},children:l=>[l,"m "]}),null),i})()]}var vm=p('<button data-k-9c12ef02 class="cp-current-card-hover-info normal">Completed'),$m=p("<button data-k-9c12ef02 class=cp-current-card-hover-info> <span data-k-9c12ef02 class=plus>+"),_m=p("<img data-k-9c12ef02 alt=Cover.>"),bm=p("<div data-k-9c12ef02 class=is-behind-container>"),ym=p("<div data-k-9c12ef02 class=cp-current-card-info><p data-k-9c12ef02>Ep "),wm=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> behind"),km=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> left"),Sm=p("<p data-k-9c12ef02> chapter<! data-k-9c12ef02> left"),Cm=p('<div data-k-9c12ef02 class=hover data-tooltip-positions="right left middle"><p data-k-9c12ef02 class=line-clamp></p><p data-k-9c12ef02 class=progress-status>Progress: ');function Am(e){if(!(e!=null&&e.episode))return null;if((e==null?void 0:e.airingAt)<ul){const t=Math.abs(e.airingAt-ul);return e.episode+Math.floor(t/aa)+1}return e.episode}function xm(e){const{accessToken:t}=ie(),n=ga(async(r,i,l)=>{const s=await oe.anilist.mutateMedia(r,{mediaId:i,progress:l});s.status===200&&(F(s.data.progress,"No progress found"),e.data.progress=s.data.progress,s.data.status==="COMPLETED"?e.mutateCache(o=>(o.data.data.Page.mediaList=o.data.data.Page.mediaList.filter(c=>c.id!==e.data.id),o)):e.mutateCache(o=>o))},250,2);return a(z,{get fallback(){return(()=>{var r=$m(),i=r.firstChild;return r.$$click=l=>{l.preventDefault(),n(t(),e.data.media.id,e.progress()+1),e.setProgress(s=>s+1)},d(r,()=>e.progress,i),r})()},get children(){return a(M,{get when(){return e.data.media.episodes===e.progress()||e.data.media.chapters===e.progress()},get children(){var r=vm();return r.$$click=i=>i.preventDefault(),r}})}})}function Tm(e){const[t,n]=O(e.data.progress),[r,i]=O(Am(e.data.media.nextAiringEpisode)),l=N(()=>r()>t()+1),s=()=>r()-(t()+1),o=()=>Math.min(s()/10,.45),c=()=>1/(s()-o())*100;return a(B,{get href(){return Ve(e.data.media)},"data-tooltip-trigger":!0,class:"cp-current-card",get children(){return[(()=>{var u=_m();return P(()=>V(u,"src",e.data.media.coverImage.large)),u})(),a(T,{get when(){var u;return(u=e.data.media.nextAiringEpisode)==null?void 0:u.airingAt},get children(){var u=ym(),h=u.firstChild;return h.firstChild,d(h,r,null),d(u,a(pm,{get airingAt(){return e.data.media.nextAiringEpisode.airingAt},setAiringEpisode:i}),null),d(u,a(T,{get when(){return l()},get children(){var f=bm();return P(g=>(g=`repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${c()*(1-o())}%, transparent ${c()*(1-o())}%, transparent ${c()}%)`)!=null?f.style.setProperty("background",g):f.style.removeProperty("background")),f}}),null),u}}),a(xm,{get data(){return e.data},get mutateCache(){return e.mutateCache},progress:t,setProgress:n}),(()=>{var u=Cm(),h=u.firstChild,f=h.nextSibling;return f.firstChild,d(u,a(z,{get children(){return[a(M,{get when(){return N(()=>!!r())()&&l()},get children(){var g=wm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>r()-(t()+1),m),d(g,()=>r()-(t()+1)>1&&"s",y),g}}),a(M,{get when(){return N(()=>r()==null)()&&e.data.media.episodes-t()>0},get children(){var g=km(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.episodes-t(),m),d(g,()=>e.data.media.episodes-t()>1&&"s",y),g}}),a(M,{get when(){return e.data.media.chapters-t()>0},get children(){var g=Sm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.chapters-t(),m),d(g,()=>e.data.media.chapters-t()>1&&"s",y),g}})]}}),h),d(h,()=>e.data.media.title.userPreferred),d(f,t,null),d(f,a(T,{get when(){return e.data.media.episodes},get children(){return["/",N(()=>e.data.media.episodes)]}}),null),d(f,a(T,{get when(){return e.data.media.chapters},get children(){return["/",N(()=>e.data.media.chapters)]}}),null),u})()]}})}_e(["click"]);var Im=p('<div data-k-ea0ffbeb class="grid-column-auto-fill current">');function Ri(e){return a(T,{get when(){return e.cards.length},get children(){var t=Im();return d(t,a(H,{get each(){return e.cards},children:n=>a(Tm,{data:n,get mutateCache(){return e.mutateCache}})})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}var Em=p("<button data-k-b9535d1e>Picture mode"),Lm=p("<button data-k-b9535d1e>Text mode"),Pm=p("<div data-k-b9535d1e class=pg-home-current>");const Ni=0,Ks=1;function Mm(e){const{isDeveloper:t}=ie(),[n,{mutateCache:r}]=oe.anilist.wachingAnime(e.userId,e.token),[i,{mutateCache:l}]=oe.anilist.readingManga(e.userId,e.token),s=new Date/1e3,o=f=>{if(f==null)return null;if(f<s){const g=(s-f)%aa;return s+(aa-g)}return f},c=(f,g)=>{var v,$;const m=o((v=f.media.nextAiringEpisode)==null?void 0:v.airingAt),y=o(($=g.media.nextAiringEpisode)==null?void 0:$.airingAt);return m&&y?m-y:m==y?0:m==null?1:-1},[u,h]=Hl("LOB_CURRENTLY_WATCHING_MODE",Ni);return[a(T,{get when(){return t()},get children(){return[(()=>{var f=Em();return f.$$click=()=>h(Ni),f})(),(()=>{var f=Lm();return f.$$click=()=>h(Ks),f})()]}}),(()=>{var f=Pm();return d(f,a(T,{get when(){return n()},get children(){return[a(Ri,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status!=="FINISHED").toSorted(c)},mutateCache:r,get loading(){return n.loading}}),a(Ri,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status==="FINISHED")},mutateCache:r,get loading(){return n.loading}})]}}),null),d(f,a(T,{get when(){return i()},get children(){return a(Ri,{get cards(){return i().data.data.Page.mediaList},mutateCache:l,get loading(){return i.loading}})}}),null),P(g=>{var m=u()==Ni,y=u()==Ks;return m!==g.e&&f.classList.toggle("picture",g.e=m),y!==g.t&&f.classList.toggle("text",g.t=y),g},{e:void 0,t:void 0}),f})()]}_e(["click"]);const tn=(e,t)=>{let n;const r=()=>clearTimeout(n);return Cr()&&He(r),Object.assign((...l)=>{n!==void 0&&r(),n=setTimeout(()=>e(...l),t)},{clear:r})};function An(e,t,n){let r;(function(c){c[c.Ready=0]="Ready",c[c.Leading=1]="Leading",c[c.Trailing=2]="Trailing"})(r||(r={}));let i=r.Ready;const l=e(c=>{i===r.Trailing&&t(...c),i=r.Ready},n),s=(...c)=>{i!==r.Trailing&&(i===r.Ready&&t(...c),i+=1),l(c)},o=()=>{i=r.Ready,l.clear()};return Cr()&&He(o),Object.assign(s,{clear:o})}var Dm=p("<span>");function jn(e){const[t,n]=ai(e,["class"]);return(()=>{var r=Dm();return It(r,Oe({get class(){return"cp-loader-circle "+t.class||""}},n),!1,!1),r})()}var Rm=p("<tool-tip inert role=tooltip>",!0,!1,!1);function St(e){return(()=>{var t=Rm();return It(t,e,!1,!1),t._$owner=Cr(),P(()=>V(t,"tip-position",e.tipPosition)),t})()}function Wl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Kn=Wl();function md(e){Kn=e}const Jr={exec:()=>null};function Ee(e,t=""){let n=typeof e=="string"?e:e.source;const r={replace:(i,l)=>{let s=typeof l=="string"?l:l.source;return s=s.replace($t.caret,"$1"),n=n.replace(i,s),r},getRegex:()=>new RegExp(n,t)};return r}const $t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Nm=/^(?:[ \t]*(?:\n|$))+/,Om=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fa=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Um=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ql=/(?:[*+-]|\d{1,9}[.)])/,pd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vd=Ee(pd).replace(/bull/g,ql).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bm=Ee(pd).replace(/bull/g,ql).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Kl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Vm=/^[^\n]+/,Jl=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Gm=Ee(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Jl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Hm=Ee(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ql).getRegex(),ui="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Xl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ym=Ee("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Xl).replace("tag",ui).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),$d=Ee(Kl).replace("hr",fa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex(),jm=Ee(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",$d).getRegex(),Zl={blockquote:jm,code:Om,def:Gm,fences:Fm,heading:Um,hr:fa,html:Ym,lheading:vd,list:Hm,newline:Nm,paragraph:$d,table:Jr,text:Vm},Js=Ee("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex(),zm={...Zl,lheading:Bm,table:Js,paragraph:Ee(Kl).replace("hr",fa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Js).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ui).getRegex()},Wm={...Zl,html:Ee(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Xl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ee(Kl).replace("hr",fa).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},qm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Km=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_d=/^( {2,}|\\)\n(?!\s*$)/,Jm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,hi=/[\p{P}\p{S}]/u,Ql=/[\s\p{P}\p{S}]/u,bd=/[^\s\p{P}\p{S}]/u,Xm=Ee(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ql).getRegex(),yd=/(?!~)[\p{P}\p{S}]/u,Zm=/(?!~)[\s\p{P}\p{S}]/u,Qm=/(?:[^\s\p{P}\p{S}]|~)/u,ep=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,wd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,tp=Ee(wd,"u").replace(/punct/g,hi).getRegex(),np=Ee(wd,"u").replace(/punct/g,yd).getRegex(),kd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",rp=Ee(kd,"gu").replace(/notPunctSpace/g,bd).replace(/punctSpace/g,Ql).replace(/punct/g,hi).getRegex(),ap=Ee(kd,"gu").replace(/notPunctSpace/g,Qm).replace(/punctSpace/g,Zm).replace(/punct/g,yd).getRegex(),ip=Ee("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bd).replace(/punctSpace/g,Ql).replace(/punct/g,hi).getRegex(),lp=Ee(/\\(punct)/,"gu").replace(/punct/g,hi).getRegex(),sp=Ee(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),op=Ee(Xl).replace("(?:-->|$)","-->").getRegex(),cp=Ee("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",op).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qa=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,dp=Ee(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",qa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Sd=Ee(/^!?\[(label)\]\[(ref)\]/).replace("label",qa).replace("ref",Jl).getRegex(),Cd=Ee(/^!?\[(ref)\](?:\[\])?/).replace("ref",Jl).getRegex(),up=Ee("reflink|nolink(?!\\()","g").replace("reflink",Sd).replace("nolink",Cd).getRegex(),es={_backpedal:Jr,anyPunctuation:lp,autolink:sp,blockSkip:ep,br:_d,code:Km,del:Jr,emStrongLDelim:tp,emStrongRDelimAst:rp,emStrongRDelimUnd:ip,escape:qm,link:dp,nolink:Cd,punctuation:Xm,reflink:Sd,reflinkSearch:up,tag:cp,text:Jm,url:Jr},hp={...es,link:Ee(/^!?\[(label)\]\((.*?)\)/).replace("label",qa).getRegex(),reflink:Ee(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",qa).getRegex()},gl={...es,emStrongRDelimAst:ap,emStrongLDelim:np,url:Ee(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},gp={...gl,br:Ee(_d).replace("{2,}","*").getRegex(),text:Ee(gl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Sa={normal:Zl,gfm:zm,pedantic:Wm},Nr={normal:es,gfm:gl,breaks:gp,pedantic:hp},fp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xs=e=>fp[e];function en(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,Xs)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,Xs);return e}function Zs(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function Qs(e,t){var l;const n=e.replace($t.findPipe,(s,o,c)=>{let u=!1,h=o;for(;--h>=0&&c[h]==="\\";)u=!u;return u?"|":" |"}),r=n.split($t.splitPipe);let i=0;if(r[0].trim()||r.shift(),r.length>0&&!((l=r.at(-1))!=null&&l.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace($t.slashPipe,"|");return r}function Or(e,t,n){const r=e.length;if(r===0)return"";let i=0;for(;i<r&&e.charAt(r-i-1)===t;)i++;return e.slice(0,r-i)}function mp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1}function eo(e,t,n,r,i){const l=t.href,s=t.title||null,o=e[1].replace(i.other.outputLinkReplace,"$1");if(e[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:n,href:l,title:s,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:n,href:l,title:s,text:o}}function pp(e,t,n){const r=e.match(n.other.indentCodeCompensation);if(r===null)return t;const i=r[1];return t.split(`
`).map(l=>{const s=l.match(n.other.beginningSpace);if(s===null)return l;const[o]=s;return o.length>=i.length?l.slice(i.length):l}).join(`
`)}class Ka{constructor(t){De(this,"options");De(this,"rules");De(this,"lexer");this.options=t||Kn}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const r=n[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Or(r,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const r=n[0],i=pp(r,n[3]||"",this.rules);return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:i}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let r=n[2].trim();if(this.rules.other.endingHash.test(r)){const i=Or(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:Or(n[0],`
`)}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){let r=Or(n[0],`
`).split(`
`),i="",l="";const s=[];for(;r.length>0;){let o=!1;const c=[];let u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),o=!0;else if(!o)c.push(r[u]);else break;r=r.slice(u);const h=c.join(`
`),f=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${h}`:h,l=l?`${l}
${f}`:f;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=g,r.length===0)break;const m=s.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.blockquote(v);s[s.length-1]=$,i=i.substring(0,i.length-y.raw.length)+$.raw,l=l.substring(0,l.length-y.text.length)+$.text;break}else if((m==null?void 0:m.type)==="list"){const y=m,v=y.raw+`
`+r.join(`
`),$=this.list(v);s[s.length-1]=$,i=i.substring(0,i.length-m.raw.length)+$.raw,l=l.substring(0,l.length-y.raw.length)+$.raw,r=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:l}}}list(t){let n=this.rules.block.list.exec(t);if(n){let r=n[1].trim();const i=r.length>1,l={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");const s=this.rules.other.listItemRegex(r);let o=!1;for(;t;){let u=!1,h="",f="";if(!(n=s.exec(t))||this.rules.block.hr.test(t))break;h=n[0],t=t.substring(h.length);let g=n[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),m=t.split(`
`,1)[0],y=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):y?v=n[1].length+1:(v=n[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=n[1].length),y&&this.rules.other.blankLine.test(m)&&(h+=m+`
`,t=t.substring(m.length+1),u=!0),!u){const S=this.rules.other.nextBulletRegex(v),k=this.rules.other.hrRegex(v),b=this.rules.other.fencesBeginRegex(v),A=this.rules.other.headingBeginRegex(v),w=this.rules.other.htmlBeginRegex(v);for(;t;){const _=t.split(`
`,1)[0];let x;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),x=m):x=m.replace(this.rules.other.tabCharGlobal,"    "),b.test(m)||A.test(m)||w.test(m)||S.test(m)||k.test(m))break;if(x.search(this.rules.other.nonSpaceChar)>=v||!m.trim())f+=`
`+x.slice(v);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||b.test(g)||A.test(g)||k.test(g))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),h+=_+`
`,t=t.substring(_.length+1),g=x.slice(v)}}l.loose||(o?l.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(o=!0));let $=null,C;this.options.gfm&&($=this.rules.other.listIsTask.exec(f),$&&(C=$[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),l.items.push({type:"list_item",raw:h,task:!!$,checked:C,loose:!1,text:f,tokens:[]}),l.raw+=h}const c=l.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;l.raw=l.raw.trimEnd();for(let u=0;u<l.items.length;u++)if(this.lexer.state.top=!1,l.items[u].tokens=this.lexer.blockTokens(l.items[u].text,[]),!l.loose){const h=l.items[u].tokens.filter(g=>g.type==="space"),f=h.length>0&&h.some(g=>this.rules.other.anyLine.test(g.raw));l.loose=f}if(l.loose)for(let u=0;u<l.items.length;u++)l.items[u].loose=!0;return l}}html(t){const n=this.rules.block.html.exec(t);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(t){const n=this.rules.block.def.exec(t);if(n){const r=n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=n[2]?n[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",l=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:i,title:l}}}table(t){var o;const n=this.rules.block.table.exec(t);if(!n||!this.rules.other.tableDelimiter.test(n[2]))return;const r=Qs(n[1]),i=n[2].replace(this.rules.other.tableAlignChars,"").split("|"),l=(o=n[3])!=null&&o.trim()?n[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===i.length){for(const c of i)this.rules.other.tableAlignRight.test(c)?s.align.push("right"):this.rules.other.tableAlignCenter.test(c)?s.align.push("center"):this.rules.other.tableAlignLeft.test(c)?s.align.push("left"):s.align.push(null);for(let c=0;c<r.length;c++)s.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:s.align[c]});for(const c of l)s.rows.push(Qs(c,s.header.length).map((u,h)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:s.align[h]})));return s}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:n[1]}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&this.rules.other.startATag.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const r=n[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const s=Or(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{const s=mp(n[2],"()");if(s>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+s;n[2]=n[2].substring(0,s),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let i=n[2],l="";if(this.options.pedantic){const s=this.rules.other.pedanticHrefTitle.exec(i);s&&(i=s[1],l=s[3])}else l=n[3]?n[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),eo(n,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:l&&l.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer,this.rules)}}reflink(t,n){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){const i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),l=n[i.toLowerCase()];if(!l){const s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return eo(r,l,r[0],this.lexer,this.rules)}}emStrong(t,n,r=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const s=[...i[0]].length-1;let o,c,u=s,h=0;const f=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*t.length+s);(i=f.exec(n))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(c=[...o].length,i[3]||i[4]){u+=c;continue}else if((i[5]||i[6])&&s%3&&!((s+c)%3)){h+=c;continue}if(u-=c,u>0)continue;c=Math.min(c,c+u+h);const g=[...i[0]][0].length,m=t.slice(0,s+i.index+g+c);if(Math.min(s,c)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let r=n[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(r),l=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&l&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:n[0],text:r}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t){const n=this.rules.inline.autolink.exec(t);if(n){let r,i;return n[2]==="@"?(r=n[1],i="mailto:"+r):(r=n[1],i=r),{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(t){var r;let n;if(n=this.rules.inline.url.exec(t)){let i,l;if(n[2]==="@")i=n[0],l="mailto:"+i;else{let s;do s=n[0],n[0]=((r=this.rules.inline._backpedal.exec(n[0]))==null?void 0:r[0])??"";while(s!==n[0]);i=n[0],n[1]==="www."?l="http://"+n[0]:l=n[0]}return{type:"link",raw:n[0],text:i,href:l,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){const n=this.rules.inline.text.exec(t);if(n){const r=this.lexer.state.inRawBlock;return{type:"text",raw:n[0],text:n[0],escaped:r}}}}class Rt{constructor(t){De(this,"tokens");De(this,"options");De(this,"state");De(this,"tokenizer");De(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Kn,this.options.tokenizer=this.options.tokenizer||new Ka,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:$t,block:Sa.normal,inline:Nr.normal};this.options.pedantic?(n.block=Sa.pedantic,n.inline=Nr.pedantic):this.options.gfm&&(n.block=Sa.gfm,this.options.breaks?n.inline=Nr.breaks:n.inline=Nr.gfm),this.tokenizer.rules=n}static get rules(){return{block:Sa,inline:Nr}}static lex(t,n){return new Rt(n).lex(t)}static lexInline(t,n){return new Rt(n).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var i,l,s;for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let o;if((l=(i=this.options.extensions)==null?void 0:i.block)!=null&&l.some(u=>(o=u.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const u=n.at(-1);o.raw.length===1&&u!==void 0?u.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.raw,this.inlineQueue.at(-1).src=u.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((s=this.options.extensions)!=null&&s.startBlock){let u=1/0;const h=t.slice(1);let f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},h),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(c=t.substring(0,u+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const u=n.at(-1);r&&(u==null?void 0:u.type)==="paragraph"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o),r=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,u;let r=t,i=null;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)h.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let l=!1,s="";for(;t;){l||(s=""),l=!1;let h;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(g=>(h=g.call({lexer:this},t,n))?(t=t.substring(h.raw.length),n.push(h),!0):!1))continue;if(h=this.tokenizer.escape(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.tag(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.link(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(h.raw.length);const g=n.at(-1);h.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(h=this.tokenizer.emStrong(t,r,s)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.codespan(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.br(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.del(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.autolink(t)){t=t.substring(h.raw.length),n.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(t))){t=t.substring(h.raw.length),n.push(h);continue}let f=t;if((u=this.options.extensions)!=null&&u.startInline){let g=1/0;const m=t.slice(1);let y;this.options.extensions.startInline.forEach(v=>{y=v.call({lexer:this},m),typeof y=="number"&&y>=0&&(g=Math.min(g,y))}),g<1/0&&g>=0&&(f=t.substring(0,g+1))}if(h=this.tokenizer.inlineText(f)){t=t.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(s=h.raw.slice(-1)),l=!0;const g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(t){const g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class Ja{constructor(t){De(this,"options");De(this,"parser");this.options=t||Kn}space(t){return""}code({text:t,lang:n,escaped:r}){var s;const i=(s=(n||"").match($t.notSpaceStart))==null?void 0:s[0],l=t.replace($t.endingNewline,"")+`
`;return i?'<pre><code class="language-'+en(i)+'">'+(r?l:en(l,!0))+`</code></pre>
`:"<pre><code>"+(r?l:en(l,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:n}){return`<h${n}>${this.parser.parseInline(t)}</h${n}>
`}hr(t){return`<hr>
`}list(t){const n=t.ordered,r=t.start;let i="";for(let o=0;o<t.items.length;o++){const c=t.items[o];i+=this.listitem(c)}const l=n?"ol":"ul",s=n&&r!==1?' start="'+r+'"':"";return"<"+l+s+`>
`+i+"</"+l+`>
`}listitem(t){var r;let n="";if(t.task){const i=this.checkbox({checked:!!t.checked});t.loose?((r=t.tokens[0])==null?void 0:r.type)==="paragraph"?(t.tokens[0].text=i+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=i+" "+en(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):n+=i+" "}return n+=this.parser.parse(t.tokens,!!t.loose),`<li>${n}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let n="",r="";for(let l=0;l<t.header.length;l++)r+=this.tablecell(t.header[l]);n+=this.tablerow({text:r});let i="";for(let l=0;l<t.rows.length;l++){const s=t.rows[l];r="";for(let o=0;o<s.length;o++)r+=this.tablecell(s[o]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){const n=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+n+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${en(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:n,tokens:r}){const i=this.parser.parseInline(r),l=Zs(t);if(l===null)return i;t=l;let s='<a href="'+t+'"';return n&&(s+=' title="'+en(n)+'"'),s+=">"+i+"</a>",s}image({href:t,title:n,text:r}){const i=Zs(t);if(i===null)return en(r);t=i;let l=`<img src="${t}" alt="${r}"`;return n&&(l+=` title="${en(n)}"`),l+=">",l}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:en(t.text)}}class ts{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}}class Nt{constructor(t){De(this,"options");De(this,"renderer");De(this,"textRenderer");this.options=t||Kn,this.options.renderer=this.options.renderer||new Ja,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ts}static parse(t,n){return new Nt(n).parse(t)}static parseInline(t,n){return new Nt(n).parseInline(t)}parse(t,n=!0){var i,l;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((l=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&l[o.type]){const u=o,h=this.options.extensions.renderers[u.type].call({parser:this},u);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type)){r+=h||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let u=c,h=this.renderer.text(u);for(;s+1<t.length&&t[s+1].type==="text";)u=t[++s],h+=`
`+this.renderer.text(u);n?r+=this.renderer.paragraph({type:"paragraph",raw:h,text:h,tokens:[{type:"text",raw:h,text:h,escaped:!0}]}):r+=h;continue}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}parseInline(t,n=this.renderer){var i,l;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((l=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&l[o.type]){const u=this.options.extensions.renderers[o.type].call({parser:this},o);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=u||"";continue}}const c=o;switch(c.type){case"escape":{r+=n.text(c);break}case"html":{r+=n.html(c);break}case"link":{r+=n.link(c);break}case"image":{r+=n.image(c);break}case"strong":{r+=n.strong(c);break}case"em":{r+=n.em(c);break}case"codespan":{r+=n.codespan(c);break}case"br":{r+=n.br(c);break}case"del":{r+=n.del(c);break}case"text":{r+=n.text(c);break}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}}class Xr{constructor(t){De(this,"options");De(this,"block");this.options=t||Kn}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?Rt.lex:Rt.lexInline}provideParser(){return this.block?Nt.parse:Nt.parseInline}}De(Xr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class vp{constructor(...t){De(this,"defaults",Wl());De(this,"options",this.setOptions);De(this,"parse",this.parseMarkdown(!0));De(this,"parseInline",this.parseMarkdown(!1));De(this,"Parser",Nt);De(this,"Renderer",Ja);De(this,"TextRenderer",ts);De(this,"Lexer",Rt);De(this,"Tokenizer",Ka);De(this,"Hooks",Xr);this.use(...t)}walkTokens(t,n){var i,l;let r=[];for(const s of t)switch(r=r.concat(n.call(this,s)),s.type){case"table":{const o=s;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,n));for(const c of o.rows)for(const u of c)r=r.concat(this.walkTokens(u.tokens,n));break}case"list":{const o=s;r=r.concat(this.walkTokens(o.items,n));break}default:{const o=s;(l=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&l[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const u=o[c].flat(1/0);r=r.concat(this.walkTokens(u,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...t){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{const i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(l=>{if(!l.name)throw new Error("extension name required");if("renderer"in l){const s=n.renderers[l.name];s?n.renderers[l.name]=function(...o){let c=l.renderer.apply(this,o);return c===!1&&(c=s.apply(this,o)),c}:n.renderers[l.name]=l.renderer}if("tokenizer"in l){if(!l.level||l.level!=="block"&&l.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=n[l.level];s?s.unshift(l.tokenizer):n[l.level]=[l.tokenizer],l.start&&(l.level==="block"?n.startBlock?n.startBlock.push(l.start):n.startBlock=[l.start]:l.level==="inline"&&(n.startInline?n.startInline.push(l.start):n.startInline=[l.start]))}"childTokens"in l&&l.childTokens&&(n.childTokens[l.name]=l.childTokens)}),i.extensions=n),r.renderer){const l=this.defaults.renderer||new Ja(this.defaults);for(const s in r.renderer){if(!(s in l))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;const o=s,c=r.renderer[o],u=l[o];l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f||""}}i.renderer=l}if(r.tokenizer){const l=this.defaults.tokenizer||new Ka(this.defaults);for(const s in r.tokenizer){if(!(s in l))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const o=s,c=r.tokenizer[o],u=l[o];l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f}}i.tokenizer=l}if(r.hooks){const l=this.defaults.hooks||new Xr;for(const s in r.hooks){if(!(s in l))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;const o=s,c=r.hooks[o],u=l[o];Xr.passThroughHooks.has(s)?l[o]=h=>{if(this.defaults.async)return Promise.resolve(c.call(l,h)).then(g=>u.call(l,g));const f=c.call(l,h);return u.call(l,f)}:l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f}}i.hooks=l}if(r.walkTokens){const l=this.defaults.walkTokens,s=r.walkTokens;i.walkTokens=function(o){let c=[];return c.push(s.call(this,o)),l&&(c=c.concat(l.call(this,o))),c}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,n){return Rt.lex(t,n??this.defaults)}parser(t,n){return Nt.parse(t,n??this.defaults)}parseMarkdown(t){return(r,i)=>{const l={...i},s={...this.defaults,...l},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&l.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);const c=s.hooks?s.hooks.provideLexer():t?Rt.lex:Rt.lexInline,u=s.hooks?s.hooks.provideParser():t?Nt.parse:Nt.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(r):r).then(h=>c(h,s)).then(h=>s.hooks?s.hooks.processAllTokens(h):h).then(h=>s.walkTokens?Promise.all(this.walkTokens(h,s.walkTokens)).then(()=>h):h).then(h=>u(h,s)).then(h=>s.hooks?s.hooks.postprocess(h):h).catch(o);try{s.hooks&&(r=s.hooks.preprocess(r));let h=c(r,s);s.hooks&&(h=s.hooks.processAllTokens(h)),s.walkTokens&&this.walkTokens(h,s.walkTokens);let f=u(h,s);return s.hooks&&(f=s.hooks.postprocess(f)),f}catch(h){return o(h)}}}onError(t,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const i="<p>An error occurred:</p><pre>"+en(r.message+"",!0)+"</pre>";return n?Promise.resolve(i):i}if(n)return Promise.reject(r);throw r}}}const zn=new vp;function Ae(e,t){return zn.parse(e,t)}Ae.options=Ae.setOptions=function(e){return zn.setOptions(e),Ae.defaults=zn.defaults,md(Ae.defaults),Ae};Ae.getDefaults=Wl;Ae.defaults=Kn;Ae.use=function(...e){return zn.use(...e),Ae.defaults=zn.defaults,md(Ae.defaults),Ae};Ae.walkTokens=function(e,t){return zn.walkTokens(e,t)};Ae.parseInline=zn.parseInline;Ae.Parser=Nt;Ae.parser=Nt.parse;Ae.Renderer=Ja;Ae.TextRenderer=ts;Ae.Lexer=Rt;Ae.lexer=Rt.lex;Ae.Tokenizer=Ka;Ae.Hooks=Xr;Ae.parse=Ae;Ae.options;Ae.setOptions;Ae.use;Ae.walkTokens;Ae.parseInline;Nt.parse;Rt.lex;/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */const{entries:Ad,setPrototypeOf:to,isFrozen:$p,getPrototypeOf:_p,getOwnPropertyDescriptor:bp}=Object;let{freeze:_t,seal:Ot,create:xd}=Object,{apply:fl,construct:ml}=typeof Reflect<"u"&&Reflect;_t||(_t=function(t){return t});Ot||(Ot=function(t){return t});fl||(fl=function(t,n,r){return t.apply(n,r)});ml||(ml=function(t,n){return new t(...n)});const Ca=bt(Array.prototype.forEach),yp=bt(Array.prototype.lastIndexOf),no=bt(Array.prototype.pop),Fr=bt(Array.prototype.push),wp=bt(Array.prototype.splice),Fa=bt(String.prototype.toLowerCase),Oi=bt(String.prototype.toString),ro=bt(String.prototype.match),Ur=bt(String.prototype.replace),kp=bt(String.prototype.indexOf),Sp=bt(String.prototype.trim),Gt=bt(Object.prototype.hasOwnProperty),vt=bt(RegExp.prototype.test),Br=Cp(TypeError);function bt(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return fl(e,t,r)}}function Cp(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ml(e,n)}}function we(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fa;to&&to(e,null);let r=t.length;for(;r--;){let i=t[r];if(typeof i=="string"){const l=n(i);l!==i&&($p(t)||(t[r]=l),i=l)}e[i]=!0}return e}function Ap(e){for(let t=0;t<e.length;t++)Gt(e,t)||(e[t]=null);return e}function On(e){const t=xd(null);for(const[n,r]of Ad(e))Gt(e,n)&&(Array.isArray(r)?t[n]=Ap(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=On(r):t[n]=r);return t}function Vr(e,t){for(;e!==null;){const r=bp(e,t);if(r){if(r.get)return bt(r.get);if(typeof r.value=="function")return bt(r.value)}e=_p(e)}function n(){return null}return n}const ao=_t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fi=_t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ui=_t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),xp=_t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Bi=_t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tp=_t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),io=_t(["#text"]),lo=_t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Vi=_t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),so=_t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Aa=_t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ip=Ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ep=Ot(/<%[\w\W]*|[\w\W]*%>/gm),Lp=Ot(/\$\{[\w\W]*/gm),Pp=Ot(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mp=Ot(/^aria-[\-\w]+$/),Td=Ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Dp=Ot(/^(?:\w+script|data):/i),Rp=Ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Id=Ot(/^html$/i),Np=Ot(/^[a-z][.\w]*(-[.\w]+)+$/i);var oo=Object.freeze({__proto__:null,ARIA_ATTR:Mp,ATTR_WHITESPACE:Rp,CUSTOM_ELEMENT:Np,DATA_ATTR:Pp,DOCTYPE_NAME:Id,ERB_EXPR:Ep,IS_ALLOWED_URI:Td,IS_SCRIPT_OR_DATA:Dp,MUSTACHE_EXPR:Ip,TMPLIT_EXPR:Lp});const Gr={element:1,text:3,progressingInstruction:7,comment:8,document:9},Op=function(){return typeof window>"u"?null:window},Fp=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(r=n.getAttribute(i));const l="dompurify"+(r?"#"+r:"");try{return t.createPolicy(l,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+l+" could not be created."),null}},co=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ed(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Op();const t=me=>Ed(me);if(t.version="3.2.4",t.removed=[],!e||!e.document||e.document.nodeType!==Gr.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const r=n,i=r.currentScript,{DocumentFragment:l,HTMLTemplateElement:s,Node:o,Element:c,NodeFilter:u,NamedNodeMap:h=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,y=c.prototype,v=Vr(y,"cloneNode"),$=Vr(y,"remove"),C=Vr(y,"nextSibling"),S=Vr(y,"childNodes"),k=Vr(y,"parentNode");if(typeof s=="function"){const me=n.createElement("template");me.content&&me.content.ownerDocument&&(n=me.content.ownerDocument)}let b,A="";const{implementation:w,createNodeIterator:_,createDocumentFragment:x,getElementsByTagName:I}=n,{importNode:E}=r;let L=co();t.isSupported=typeof Ad=="function"&&typeof k=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:U,TMPLIT_EXPR:G,DATA_ATTR:J,ARIA_ATTR:Y,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:le,CUSTOM_ELEMENT:Z}=oo;let{IS_ALLOWED_URI:te}=oo,X=null;const pe=we({},[...ao,...Fi,...Ui,...Bi,...io]);let $e=null;const he=we({},[...lo,...Vi,...so,...Aa]);let ne=Object.seal(xd(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),j=null,Ue=null,et=!0,Re=!0,tt=!1,Bt=!0,ct=!1,yt=!0,dt=!1,nt=!1,At=!1,mt=!1,rt=!1,re=!1,Q=!0,ve=!1;const Te="user-content-";let Xe=!0,je=!1,Me={},Be=null;const Et=we({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Jn=null;const Xn=we({},["audio","video","img","source","image","track"]);let Zn=null;const Lr=we({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),En="http://www.w3.org/1998/Math/MathML",Ln="http://www.w3.org/2000/svg",it="http://www.w3.org/1999/xhtml";let an=it,Qn=!1,Pr=null;const pi=we({},[En,Ln,it],Oi);let er=we({},["mi","mo","mn","ms","mtext"]),Pn=we({},["annotation-xml"]);const vi=we({},["title","style","font","a","script"]);let Mn=null;const $i=["application/xhtml+xml","text/html"],ln="text/html";let ze=null,ge=null;const sn=n.createElement("form"),Zt=function(D){return D instanceof RegExp||D instanceof Function},Mr=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ge&&ge===D)){if((!D||typeof D!="object")&&(D={}),D=On(D),Mn=$i.indexOf(D.PARSER_MEDIA_TYPE)===-1?ln:D.PARSER_MEDIA_TYPE,ze=Mn==="application/xhtml+xml"?Oi:Fa,X=Gt(D,"ALLOWED_TAGS")?we({},D.ALLOWED_TAGS,ze):pe,$e=Gt(D,"ALLOWED_ATTR")?we({},D.ALLOWED_ATTR,ze):he,Pr=Gt(D,"ALLOWED_NAMESPACES")?we({},D.ALLOWED_NAMESPACES,Oi):pi,Zn=Gt(D,"ADD_URI_SAFE_ATTR")?we(On(Lr),D.ADD_URI_SAFE_ATTR,ze):Lr,Jn=Gt(D,"ADD_DATA_URI_TAGS")?we(On(Xn),D.ADD_DATA_URI_TAGS,ze):Xn,Be=Gt(D,"FORBID_CONTENTS")?we({},D.FORBID_CONTENTS,ze):Et,j=Gt(D,"FORBID_TAGS")?we({},D.FORBID_TAGS,ze):{},Ue=Gt(D,"FORBID_ATTR")?we({},D.FORBID_ATTR,ze):{},Me=Gt(D,"USE_PROFILES")?D.USE_PROFILES:!1,et=D.ALLOW_ARIA_ATTR!==!1,Re=D.ALLOW_DATA_ATTR!==!1,tt=D.ALLOW_UNKNOWN_PROTOCOLS||!1,Bt=D.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ct=D.SAFE_FOR_TEMPLATES||!1,yt=D.SAFE_FOR_XML!==!1,dt=D.WHOLE_DOCUMENT||!1,mt=D.RETURN_DOM||!1,rt=D.RETURN_DOM_FRAGMENT||!1,re=D.RETURN_TRUSTED_TYPE||!1,At=D.FORCE_BODY||!1,Q=D.SANITIZE_DOM!==!1,ve=D.SANITIZE_NAMED_PROPS||!1,Xe=D.KEEP_CONTENT!==!1,je=D.IN_PLACE||!1,te=D.ALLOWED_URI_REGEXP||Td,an=D.NAMESPACE||it,er=D.MATHML_TEXT_INTEGRATION_POINTS||er,Pn=D.HTML_INTEGRATION_POINTS||Pn,ne=D.CUSTOM_ELEMENT_HANDLING||{},D.CUSTOM_ELEMENT_HANDLING&&Zt(D.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ne.tagNameCheck=D.CUSTOM_ELEMENT_HANDLING.tagNameCheck),D.CUSTOM_ELEMENT_HANDLING&&Zt(D.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ne.attributeNameCheck=D.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),D.CUSTOM_ELEMENT_HANDLING&&typeof D.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=D.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ct&&(Re=!1),rt&&(mt=!0),Me&&(X=we({},io),$e=[],Me.html===!0&&(we(X,ao),we($e,lo)),Me.svg===!0&&(we(X,Fi),we($e,Vi),we($e,Aa)),Me.svgFilters===!0&&(we(X,Ui),we($e,Vi),we($e,Aa)),Me.mathMl===!0&&(we(X,Bi),we($e,so),we($e,Aa))),D.ADD_TAGS&&(X===pe&&(X=On(X)),we(X,D.ADD_TAGS,ze)),D.ADD_ATTR&&($e===he&&($e=On($e)),we($e,D.ADD_ATTR,ze)),D.ADD_URI_SAFE_ATTR&&we(Zn,D.ADD_URI_SAFE_ATTR,ze),D.FORBID_CONTENTS&&(Be===Et&&(Be=On(Be)),we(Be,D.FORBID_CONTENTS,ze)),Xe&&(X["#text"]=!0),dt&&we(X,["html","head","body"]),X.table&&(we(X,["tbody"]),delete j.tbody),D.TRUSTED_TYPES_POLICY){if(typeof D.TRUSTED_TYPES_POLICY.createHTML!="function")throw Br('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof D.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Br('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');b=D.TRUSTED_TYPES_POLICY,A=b.createHTML("")}else b===void 0&&(b=Fp(m,i)),b!==null&&typeof A=="string"&&(A=b.createHTML(""));_t&&_t(D),ge=D}},Dn=we({},[...Fi,...Ui,...xp]),Dr=we({},[...Bi,...Tp]),Rn=function(D){let K=k(D);(!K||!K.tagName)&&(K={namespaceURI:an,tagName:"template"});const ue=Fa(D.tagName),Fe=Fa(K.tagName);return Pr[D.namespaceURI]?D.namespaceURI===Ln?K.namespaceURI===it?ue==="svg":K.namespaceURI===En?ue==="svg"&&(Fe==="annotation-xml"||er[Fe]):!!Dn[ue]:D.namespaceURI===En?K.namespaceURI===it?ue==="math":K.namespaceURI===Ln?ue==="math"&&Pn[Fe]:!!Dr[ue]:D.namespaceURI===it?K.namespaceURI===Ln&&!Pn[Fe]||K.namespaceURI===En&&!er[Fe]?!1:!Dr[ue]&&(vi[ue]||!Dn[ue]):!!(Mn==="application/xhtml+xml"&&Pr[D.namespaceURI]):!1},xt=function(D){Fr(t.removed,{element:D});try{k(D).removeChild(D)}catch{$(D)}},pa=function(D,K){try{Fr(t.removed,{attribute:K.getAttributeNode(D),from:K})}catch{Fr(t.removed,{attribute:null,from:K})}if(K.removeAttribute(D),D==="is")if(mt||rt)try{xt(K)}catch{}else try{K.setAttribute(D,"")}catch{}},ps=function(D){let K=null,ue=null;if(At)D="<remove></remove>"+D;else{const lt=ro(D,/^[\r\n\t ]+/);ue=lt&&lt[0]}Mn==="application/xhtml+xml"&&an===it&&(D='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+D+"</body></html>");const Fe=b?b.createHTML(D):D;if(an===it)try{K=new g().parseFromString(Fe,Mn)}catch{}if(!K||!K.documentElement){K=w.createDocument(an,"template",null);try{K.documentElement.innerHTML=Qn?A:Fe}catch{}}const ut=K.body||K.documentElement;return D&&ue&&ut.insertBefore(n.createTextNode(ue),ut.childNodes[0]||null),an===it?I.call(K,dt?"html":"body")[0]:dt?K.documentElement:ut},vs=function(D){return _.call(D.ownerDocument||D,D,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},_i=function(D){return D instanceof f&&(typeof D.nodeName!="string"||typeof D.textContent!="string"||typeof D.removeChild!="function"||!(D.attributes instanceof h)||typeof D.removeAttribute!="function"||typeof D.setAttribute!="function"||typeof D.namespaceURI!="string"||typeof D.insertBefore!="function"||typeof D.hasChildNodes!="function")},$s=function(D){return typeof o=="function"&&D instanceof o};function on(me,D,K){Ca(me,ue=>{ue.call(t,D,K,ge)})}const _s=function(D){let K=null;if(on(L.beforeSanitizeElements,D,null),_i(D))return xt(D),!0;const ue=ze(D.nodeName);if(on(L.uponSanitizeElement,D,{tagName:ue,allowedTags:X}),D.hasChildNodes()&&!$s(D.firstElementChild)&&vt(/<[/\w]/g,D.innerHTML)&&vt(/<[/\w]/g,D.textContent)||D.nodeType===Gr.progressingInstruction||yt&&D.nodeType===Gr.comment&&vt(/<[/\w]/g,D.data))return xt(D),!0;if(!X[ue]||j[ue]){if(!j[ue]&&ys(ue)&&(ne.tagNameCheck instanceof RegExp&&vt(ne.tagNameCheck,ue)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(ue)))return!1;if(Xe&&!Be[ue]){const Fe=k(D)||D.parentNode,ut=S(D)||D.childNodes;if(ut&&Fe){const lt=ut.length;for(let wt=lt-1;wt>=0;--wt){const Qt=v(ut[wt],!0);Qt.__removalCount=(D.__removalCount||0)+1,Fe.insertBefore(Qt,C(D))}}}return xt(D),!0}return D instanceof c&&!Rn(D)||(ue==="noscript"||ue==="noembed"||ue==="noframes")&&vt(/<\/no(script|embed|frames)/i,D.innerHTML)?(xt(D),!0):(ct&&D.nodeType===Gr.text&&(K=D.textContent,Ca([R,U,G],Fe=>{K=Ur(K,Fe," ")}),D.textContent!==K&&(Fr(t.removed,{element:D.cloneNode()}),D.textContent=K)),on(L.afterSanitizeElements,D,null),!1)},bs=function(D,K,ue){if(Q&&(K==="id"||K==="name")&&(ue in n||ue in sn))return!1;if(!(Re&&!Ue[K]&&vt(J,K))){if(!(et&&vt(Y,K))){if(!$e[K]||Ue[K]){if(!(ys(D)&&(ne.tagNameCheck instanceof RegExp&&vt(ne.tagNameCheck,D)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(D))&&(ne.attributeNameCheck instanceof RegExp&&vt(ne.attributeNameCheck,K)||ne.attributeNameCheck instanceof Function&&ne.attributeNameCheck(K))||K==="is"&&ne.allowCustomizedBuiltInElements&&(ne.tagNameCheck instanceof RegExp&&vt(ne.tagNameCheck,ue)||ne.tagNameCheck instanceof Function&&ne.tagNameCheck(ue))))return!1}else if(!Zn[K]){if(!vt(te,Ur(ue,le,""))){if(!((K==="src"||K==="xlink:href"||K==="href")&&D!=="script"&&kp(ue,"data:")===0&&Jn[D])){if(!(tt&&!vt(q,Ur(ue,le,"")))){if(ue)return!1}}}}}}return!0},ys=function(D){return D!=="annotation-xml"&&ro(D,Z)},ws=function(D){on(L.beforeSanitizeAttributes,D,null);const{attributes:K}=D;if(!K||_i(D))return;const ue={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0};let Fe=K.length;for(;Fe--;){const ut=K[Fe],{name:lt,namespaceURI:wt,value:Qt}=ut,Rr=ze(lt);let pt=lt==="value"?Qt:Sp(Qt);if(ue.attrName=Rr,ue.attrValue=pt,ue.keepAttr=!0,ue.forceKeepAttr=void 0,on(L.uponSanitizeAttribute,D,ue),pt=ue.attrValue,ve&&(Rr==="id"||Rr==="name")&&(pa(lt,D),pt=Te+pt),yt&&vt(/((--!?|])>)|<\/(style|title)/i,pt)){pa(lt,D);continue}if(ue.forceKeepAttr||(pa(lt,D),!ue.keepAttr))continue;if(!Bt&&vt(/\/>/i,pt)){pa(lt,D);continue}ct&&Ca([R,U,G],Ss=>{pt=Ur(pt,Ss," ")});const ks=ze(D.nodeName);if(bs(ks,Rr,pt)){if(b&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!wt)switch(m.getAttributeType(ks,Rr)){case"TrustedHTML":{pt=b.createHTML(pt);break}case"TrustedScriptURL":{pt=b.createScriptURL(pt);break}}try{wt?D.setAttributeNS(wt,lt,pt):D.setAttribute(lt,pt),_i(D)?xt(D):no(t.removed)}catch{}}}on(L.afterSanitizeAttributes,D,null)},xu=function me(D){let K=null;const ue=vs(D);for(on(L.beforeSanitizeShadowDOM,D,null);K=ue.nextNode();)on(L.uponSanitizeShadowNode,K,null),_s(K),ws(K),K.content instanceof l&&me(K.content);on(L.afterSanitizeShadowDOM,D,null)};return t.sanitize=function(me){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},K=null,ue=null,Fe=null,ut=null;if(Qn=!me,Qn&&(me="<!-->"),typeof me!="string"&&!$s(me))if(typeof me.toString=="function"){if(me=me.toString(),typeof me!="string")throw Br("dirty is not a string, aborting")}else throw Br("toString is not a function");if(!t.isSupported)return me;if(nt||Mr(D),t.removed=[],typeof me=="string"&&(je=!1),je){if(me.nodeName){const Qt=ze(me.nodeName);if(!X[Qt]||j[Qt])throw Br("root node is forbidden and cannot be sanitized in-place")}}else if(me instanceof o)K=ps("<!---->"),ue=K.ownerDocument.importNode(me,!0),ue.nodeType===Gr.element&&ue.nodeName==="BODY"||ue.nodeName==="HTML"?K=ue:K.appendChild(ue);else{if(!mt&&!ct&&!dt&&me.indexOf("<")===-1)return b&&re?b.createHTML(me):me;if(K=ps(me),!K)return mt?null:re?A:""}K&&At&&xt(K.firstChild);const lt=vs(je?me:K);for(;Fe=lt.nextNode();)_s(Fe),ws(Fe),Fe.content instanceof l&&xu(Fe.content);if(je)return me;if(mt){if(rt)for(ut=x.call(K.ownerDocument);K.firstChild;)ut.appendChild(K.firstChild);else ut=K;return($e.shadowroot||$e.shadowrootmode)&&(ut=E.call(r,ut,!0)),ut}let wt=dt?K.outerHTML:K.innerHTML;return dt&&X["!doctype"]&&K.ownerDocument&&K.ownerDocument.doctype&&K.ownerDocument.doctype.name&&vt(Id,K.ownerDocument.doctype.name)&&(wt="<!DOCTYPE "+K.ownerDocument.doctype.name+`>
`+wt),ct&&Ca([R,U,G],Qt=>{wt=Ur(wt,Qt," ")}),b&&re?b.createHTML(wt):wt},t.setConfig=function(){let me=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Mr(me),nt=!0},t.clearConfig=function(){ge=null,nt=!1},t.isValidAttribute=function(me,D,K){ge||Mr({});const ue=ze(me),Fe=ze(D);return bs(ue,Fe,K)},t.addHook=function(me,D){typeof D=="function"&&Fr(L[me],D)},t.removeHook=function(me,D){if(D!==void 0){const K=yp(L[me],D);return K===-1?void 0:wp(L[me],K,1)[0]}return no(L[me])},t.removeHooks=function(me){L[me]=[]},t.removeAllHooks=function(){L=co()},t}var Ld=Ed();const Up="_spoiler_fn1ga_1",uo={spoiler:Up};var Pd=p("<div>");const Bp={name:"spoiler",level:"inline",start(e){var t;return(t=e.match(/~!/))==null?void 0:t.index},tokenizer(e){const t=/^~!([^!~]+)!~/.exec(e);if(t)return{type:"spoiler",raw:t[0],text:t[1]}},renderer(e){return`<details class="${uo.spoiler}"><summary><span class="${uo.text}">${Ae.parseInline(e.text)}</span></summary></details>`}};Ae.use({extensions:[Bp]});function ns(e){if(!e.children)return null;const t=Ae(e.children),n=Ld.sanitize(t),r=(()=>{var i=Pd();return i.innerHTML=n,i})();return a(H,{get each(){return r.childNodes},children:i=>i})}const Vp=/([^\n])\n([^\n])/g,Gp=(e,t,n)=>t+"<br>"+n;function Xa(e){const t=N(()=>{if(!e.text)return[];const n=e.singleLineBreaks?e.text.replace(Vp,Gp):e.text,r=Ae(n),i=Ld.sanitize(r);return[...(()=>{var s=Pd();return s.innerHTML=i,s})().childNodes]});return a(H,{get each(){return t()},children:n=>n})}var Hp=p("<time class=cp-created-at>");function Bn(e){const[t,n]=O(Math.max(1,Math.abs(new Date/1e3-e.createdAt)));let r=null;return t()<60?r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3):t()<3600&&(r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3*60)),He(()=>clearInterval(r)),(()=>{var i=Hp();return d(i,a(z,{get children(){return[a(M,{get when(){return Math.floor(t()/3600/24/365.25)},children:l=>[l," years",N(()=>Ne(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/30)},children:l=>[l," month",N(()=>Ne(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/7)},children:l=>[l," week",N(()=>Ne(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24)},children:l=>[l," day",N(()=>Ne(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600%24)},children:l=>[l," hour",N(()=>Ne(l()))," ago"]}),a(M,{get when(){return Math.floor(t()%3600/60)},children:l=>[l," minute",N(()=>Ne(l()))," ago "]}),a(M,{get when(){return Math.floor(t()%3600%60)},children:l=>[l," second",N(()=>Ne(l()))," ago "]})]}})),P(l=>{var s=new Date(e.createdAt*1e3).toISOString(),o=new Date(e.createdAt*1e3).toLocaleString();return s!==l.e&&V(i,"datetime",l.e=s),o!==l.t&&V(i,"title",l.t=o),l},{e:void 0,t:void 0}),i})()}var Yp=p("<div>"),ho=p("<img class=profile alt=Profile>"),jp=p("<div class=header>"),zp=p("<div class=content>"),Wp=p("<div class=footer>"),qp=p("<img class=cover alt=Cover>"),go=p("<p> "),Kp=p("<div class=main>"),Jp=p("<div class=right>"),Xp=p("<ol>"),Zp=p("<button class=cp-activity-like>Like "),Qp=p('<li><img alt="Profile picture">');function rs(e){const t=Oe({hideProfile:!1,small:!1,wrapper:n=>(()=>{var r=Yp();return It(r,n,!1,!1),r})()},e);return F(typeof t.hideProfile=="boolean","hideProfile needs to be boolean"),F(typeof t.small=="boolean","small needs to be boolean"),a(z,{get children(){return[a(M,{get when(){return t.activity.type==="TEXT"},get children(){return a(Ci,{get component(){return t.wrapper},class:"activity-card-text",get children(){return[(()=>{var n=jp();return d(n,a(B,{get href(){return"/user/"+t.activity.user.name},class:"activity-profile-header",get children(){return[(()=>{var r=ho();return P(()=>V(r,"src",t.activity.user.avatar.large)),r})(),N(()=>t.activity.user.name)]}}),null),d(n,a(Bn,{get createdAt(){return t.activity.createdAt}}),null),n})(),(()=>{var n=zp();return d(n,a(ns,{get children(){return t.activity.text}})),n})(),(()=>{var n=Wp();return d(n,a(fo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}})),n})()]}})}}),a(M,{get when(){return t.activity.type==="ANIME_LIST"||t.activity.type==="MANGA_LIST"},get children(){return a(Ci,{get component(){return t.wrapper},class:"activity-card-media",get classList(){return{small:t.small}},get children(){return[a(B,{get href(){return Ve(t.activity.media)},get children(){var n=qp();return P(()=>V(n,"src",t.activity.media.coverImage.large)),n}}),(()=>{var n=Kp();return d(n,a(z,{get children(){return[a(M,{get when(){return t.hideProfile===!0},get children(){var r=go(),i=r.firstChild;return d(r,()=>qe(t.activity.status),i),d(r,a(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),r}}),a(M,{get when(){return t.hideProfile===!1},get children(){return[a(B,{get href(){return"/user/"+t.activity.user.name},get children(){return t.activity.user.name}}),(()=>{var r=go(),i=r.firstChild;return d(r,()=>qe(t.activity.status),i),d(r,a(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),d(r,a(B,{get href(){return"/user/"+t.activity.user.name},get children(){var l=ho();return P(()=>V(l,"src",t.activity.user.avatar.large)),l}}),null),r})()]}})]}})),n})(),(()=>{var n=Jp();return d(n,a(Bn,{get createdAt(){return t.activity.createdAt}}),null),d(n,a(fo,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}}),null),n})()]}})}}),a(M,{get when(){return t.activity.type==="MESSAGE"},get children(){return a(Ci,{get component(){return t.wrapper},children:"message"})}})]}})}function fo(e){const[t,n]=O(e.activity.isLiked),[r,i]=O(e.activity.likeCount),{accessToken:l}=ie(),[s,o]=O(void 0),[c]=oe.anilist.listOfActivityLikes(e.activity.id,l,s);let u=e.activity.isLiked;const h=ga(async(f,g,m)=>{if(m!==u){const y=await oe.anilist.toggleActivityLike(f,{id:g});F(!y.fromCache,"Mutation should never be cached"),y.status===200&&(e.activity.likeCount=y.data.data.ToggleLike.likeCount,e.activity.isLiked=y.data.data.ToggleLike.isLiked,e.mutateCache(v=>v),u===y.data.data.ToggleLike.isLiked&&(i(y.data.data.ToggleLike.likeCount),n(y.data.data.ToggleLike.isLiked)),u=m)}},500);return(()=>{var f=Zp();return f.firstChild,f.$$click=()=>{n(g=>{F(typeof g=="boolean");const m=+!g*2-1;return i(y=>y+m),h(l(),e.activity.id,!g),!g})},f.$$mousemove=()=>r()&&o(!0),d(f,r,null),d(f,a(T,{get when(){var g;return N(()=>!!s())()&&((g=c())==null?void 0:g.data.likes.length)},get children(){return a(St,{tipPosition:"left",get children(){var g=Xp();return d(g,a(H,{get each(){return c().data.likes},children:m=>(()=>{var y=Qp(),v=y.firstChild;return d(y,()=>m.name,null),P(()=>V(v,"src",m.avatar.large)),y})()})),g}})}}),null),P(()=>f.classList.toggle("active",!!t())),f})()}_e(["mousemove","click"]);var ev=p('<ol data-k-82ba8cab class="flex-space-between activity">'),tv=p("<button data-k-82ba8cab>Refresh"),nv=p("<li data-k-82ba8cab>");function rv(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),i=Pe(Tc,t,e.variables,n),[l]=Vl(e.isDebug,i);let s=0;const[o,c]=O(!1),[u,h]=O(!0),f=ud(h),g=new Set,m=An(tn,b=>!l.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var w,_;const b=Ce(o),A=Ce(u);if(C.has((w=e.cache.at(-1))==null?void 0:w.id)&&b)return Math.max(Math.floor(e.cache.length/25)+1,s+1);if(C.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const x=[...C.difference(g)].sort((L,R)=>R-L);if(!x.length)return;const I=ia(x,.5),E=sd(e.cache,L=>L.id-I);return E==-1?void 0:Math.ceil((E+1)/25)}}let $=0;W(ce(l,b=>{var x,I,E,L,R;if(!((x=b==null?void 0:b.data)!=null&&x.activities.length))return;b.data.activities.forEach(U=>{g.add(U.id)});const A=((I=b.data.activities[0])==null?void 0:I.createdAt)||0,w=((E=ia(b.data.activities,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-w)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f(_,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/25&&(((L=b.data.activities.at(-1))==null?void 0:L.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(h(!0),c(!1),s=0,$=0)),e.updateCache(b),y()}));const C=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.id);F(Number.isInteger(w)),A.isIntersecting?C.add(w):C.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return He(()=>k.disconnect()),[a(T,{get when(){return N(()=>!!l.loading)()&&n()===1},get children(){return a(jn,{class:"refresh",get children(){return a(St,{tipPosition:"bottom",get children(){return a(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh activities",children:"Loading activities"})}})}})}}),(()=>{var b=ev();return d(b,a(H,{get each(){return e.cache},children:A=>{let w;return Tn(()=>k.observe(w)),a(rs,{activity:A,get mutateCache(){return e.mutateCache},wrapper:_=>(()=>{var x=nv(),I=w;return typeof I=="function"?fe(I,x):w=x,It(x,_,!1,!1),P(()=>V(x,"data-id",A.id)),x})()})}})),P(()=>b.classList.toggle("loading",!!(l.loading&&n()===1))),b})(),a(z,{get children(){return[a(M,{get when(){return l.loading&&n()>s&&e.cache.length},get children(){return a(jn,{class:"new",get children(){return a(St,{tipPosition:"bottom",children:"Loading activities"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh activity feed to load more",(()=>{var b=tv();return b.$$click=()=>r(1),b})()]}})]}})]}_e(["click"]);var av=p("<button>debug: ");function iv(e){const{accessToken:t}=ie(),n=Pe(og,t,e.variables),[r,{mutateCache:i,mutateBoth:l}]=Qe(n),s=u=>{var h,f;(f=(h=u==null?void 0:u.data)==null?void 0:h.activities)!=null&&f.length&&l(g=>{var w,_,x;if(!((w=g==null?void 0:g.data)!=null&&w.length))return g.data=[u.data.activities],g;const m=u.data.activities.at(-1).id,y=ur(g.data[0],I=>I.id-m),v=((_=g.data[0][y])==null?void 0:_.id)===m;if(u.data.pageInfo.currentPage===1)return v?(g.data[0].splice(0,y+1,...u.data.activities),g):(g.data.unshift(u.data.activities),g.data.length=Math.min(g.data.length,5),g);const $=u.data.activities[0].id,C=ur(g.data[0],I=>I.id-$);if(C===0&&g.data[0][C].id!==$||(g.data[0].splice(C,y-C+v,...u.data.activities),v||g.data.length===1))return g;const k=ur(g.data[1],I=>I.id-m);if(((x=g.data[1][k])==null?void 0:x.id)!==m)return g;const[A]=g.data.splice(1,1);return A.splice(0,k+1),g.data[0].push(...A),g})},[o,c]=Yl();return a(T,{get when(){return!r.loading},get children(){return[a(T,{get when(){return xr},get children(){var u=av();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),a(rv,Oe({get cache(){var u,h;return((h=(u=r())==null?void 0:u.data)==null?void 0:h[0])||[]},isDebug:o,updateCache:s,mutateCache:i},e))]}})}_e(["click"]);var lv=p("<div><h2>Activity</h2><div><button>All</button><button>Text Status</button><button>List Progress</button></div><button>Following</button><button>Global");function sv(){const[e,t]=Hl("LOB_ACTIVITY_TYPE",void 0),[n,r]=Vs("LOB_ACTIVITY_IS_FOLLOWING",!0),[i,l]=Vs("LOB_ACTIVITY_HAS_REPLIES",void 0),[s,o]=ff("LOB_ACTIVITY_QUERY",{isFollowing:!0});return W(()=>{o(c=>{const u={...c,activityType:e(),isFollowing:n(),hasReplies:i()};for(const h of Object.keys(u))if(u[h]!==c[h])return u;return c})}),(()=>{var c=lv(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.nextSibling,y=h.nextSibling,v=y.nextSibling;return f.$$click=()=>t(void 0),g.$$click=()=>t("TEXT"),m.$$click=()=>t("MEDIA_LIST"),y.$$click=()=>{Ge(()=>{r(!0),l(void 0)})},v.$$click=()=>{Ge(()=>{r(!1),l(!0)})},d(c,a(T,{get when(){return s()},keyed:!0,get children(){return a(iv,{get variables(){return s()}})}}),null),c})()}_e(["click"]);var ov=p("<div data-k-9b8ac37b class=pg-home>");function cv(){const{accessToken:e,authUserData:t}=ie();return document.title="Home - LOB",a(T,{get when(){return t()},get children(){var n=ov();return d(n,a(Mm,{get token(){return e()},get userId(){return t().data.id}}),null),d(n,a(sv,{get token(){return e()}}),null),n}})}function dv(){const t=Kt().hash.substring(1),r=new URLSearchParams(t).get("access_token");if(document.title="Authentication - LOB",(r==null?void 0:r.length)>50){const{setAccessToken:i}=ie();i(r)}return a(dn,{href:"/"})}function uv(e){const[t,{mutate:n}]=Ru(async()=>new Promise(u=>{const h=()=>u(null),f=Je.user(h);f.onsuccess=g=>{const m=g.target.result,v=Je.store(m,"data","readonly",h).get("access_token");v.onsuccess=$=>u($.target.result||null),v.onerror=h}})),[r,{mutate:i}]=oe.anilist.getAuthUserData(()=>t()??void 0),l=Je.user();l.onsuccess=u=>{const h=u.target.result,g=Je.store(h,"data","readonly").get("auth_profile_info");g.onsuccess=m=>{m.target.result!=null&&i(m.target.result)}};const s=u=>{const h=Je.user();h.onsuccess=f=>{const g=f.target.result,y=Je.store(g,"data","readwrite").put(u,"access_token");y.onsuccess=()=>n(u)}},o=()=>{const u=Je.user();u.onsuccess=h=>{const f=h.target.result,g=Je.store(f,"data","readwrite");g.delete("access_token"),g.delete("auth_profile_info"),n(null),i(null)}},c=N(()=>{var u,h;return((h=(u=r())==null?void 0:u.data)==null?void 0:h.id)===5137809});return a(pc.Provider,{value:{accessToken:t,setAccessToken:s,authUserData:r,logoutUser:o,isDeveloper:c},get children(){return a(T,{get when(){return!t.loading},get children(){return e.children}})}})}function pn(e){const[t,n]=O(window.matchMedia(e).matches),r=window.matchMedia(e),i=l=>n(l.matches);return r.addEventListener("change",i),He(()=>r.removeEventListener("change",i)),t}function hv(e){const t=pn("(max-width: 30em)"),n=pn("(max-width: 48em)"),r=pn("(max-width: 64em)"),i=pn("(max-width: 80em)"),l=pn("(max-width: 90em)"),s=pn("(max-width: 160em)"),o=pn("(hover: none) and (pointer: coarse)"),c=pn("(display-mode: standalone)");return a(vc.Provider,{value:{isMobilSmall:t,isMobilLarge:n,isTablet:r,isLaptop:i,isDesktop:l,isDesktopLarge:s,isTouch:o,isPWA:c},get children(){return e.children}})}var gv=p("<div>Intersection");function mn(e){let t=gv();Tn(()=>{i.observe(t)}),He(()=>{i.disconnect()});const n={rootMargin:e.rootMargin||"800px"},r=l=>{l[0].isIntersecting!==!1&&(i.unobserve(l[0].target),e.onIntersection())},i=new IntersectionObserver(r,n);return a(z,{fallback:t,get children(){return[a(M,{get when(){return e.fetchResponse()},get children(){return e.children(e.fetchResponse.loading&&e.loading)}}),a(M,{get when(){return e.fetchResponse.loading},get children(){return e.loadingElement||"loading..."}})]}})}var fv=p("<div data-k-d1a22b47 class=multi-input-footer><button data-k-d1a22b47>Cancel</button><button data-k-d1a22b47>Ok"),mv=p("<form data-k-d1a22b47 class=multi-input><button data-k-d1a22b47 class=open-multi-input>Rating</button><dialog data-k-d1a22b47><div data-k-d1a22b47 class=wrapper><div data-k-d1a22b47 class=scroll-wrapper>"),pv=p("<li data-k-d1a22b47><label data-k-d1a22b47>G - All ages <input data-k-d1a22b47 type=checkbox name=rating value=g>"),vv=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG - Children <input data-k-d1a22b47 type=checkbox name=rating value=pg>"),$v=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG-13 - Teen 13 or older <input data-k-d1a22b47 type=checkbox name=rating value=pg13>"),_v=p("<li data-k-d1a22b47><label data-k-d1a22b47>R - 17+ (violence & profanity) <input data-k-d1a22b47 type=checkbox name=rating value=r17>"),bv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - Mild nudity <input data-k-d1a22b47 type=checkbox name=rating value=r>"),yv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - (violence, profanity & mild nudity)<input data-k-d1a22b47 type=checkbox name=rating value=r>"),wv=p("<ol data-k-d1a22b47><li data-k-d1a22b47><label data-k-d1a22b47>Any rating <input data-k-d1a22b47 type=checkbox name=rating value=any></label></li><li data-k-d1a22b47><label data-k-d1a22b47>Rx - Hentai <input data-k-d1a22b47 type=checkbox name=rating value=rx>");function kv(e){const[t,n]=xe(),{isTouch:r}=Jt();let i=!1,l,s,o,c,u,h;function f(){s.close(),i=!1,c==null||c.abort(),n({preventFetch:void 0})}function g(){o.classList.toggle("has-scroll-bar",o.scrollHeight-o.clientHeight>0)}return W(ce(r,f)),(()=>{var y=mv(),v=y.firstChild,$=v.nextSibling,C=$.firstChild,S=C.firstChild;y.$$input=_=>{const x=_.currentTarget.querySelectorAll("input").length,E=new FormData(_.currentTarget).getAll("rating");_.target.value==="any"?_.target.checked?n({rating:"any"}):n({rating:void 0}):_.target.checked&&x-1===E.length?n({rating:"any"}):n({rating:E.filter(L=>L!=="any")})},y.addEventListener("submit",_=>{_.preventDefault()});var k=h;typeof k=="function"?fe(k,y):h=y,v.$$click=()=>{if(i)f();else{c=new AbortController;const _=c.signal;l=t.rating,r()?(s.showModal(),n({preventFetch:!0}),g(),window.addEventListener("resize",g,{signal:_}),s.addEventListener("touchstart",x=>{x.target===s&&s.addEventListener("touchend",I=>{I.target===s&&(I.preventDefault(),f())},{once:!0,signal:_})},{signal:_})):(window.addEventListener("mousedown",x=>x.target!==u&&x.target.closest("dialog")!==s&&f(),{signal:_}),s.show()),i=!0}};var b=u;typeof b=="function"?fe(b,v):u=v,$.addEventListener("close",f);var A=s;typeof A=="function"?fe(A,$):s=$;var w=o;return typeof w=="function"?fe(w,S):o=S,d(S,a(m,{})),d(C,a(T,{get when(){return r()},get children(){var _=fv(),x=_.firstChild,I=x.nextSibling;return x.$$click=()=>{f(),n({rating:l})},I.$$click=f,_}}),null),P(()=>y.classList.toggle("mobile",!!r())),y})();function m(){const[y]=xe(),[v,$]=Ye({});return W(()=>{Array.isArray(y.rating)?$(zt(y.rating.reduce((C,S)=>({...C,[S]:!0}),{}))):$(zt({[y.rating]:!0}))}),(()=>{var C=wv(),S=C.firstChild,k=S.firstChild,b=k.firstChild,A=b.nextSibling,w=S.nextSibling,_=w.firstChild,x=_.firstChild,I=x.nextSibling;return d(C,a(T,{get when(){return y.malSearch==="true"},get children(){return[(()=>{var E=pv(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.g),E})(),(()=>{var E=vv(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.pg),E})(),(()=>{var E=$v(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.pg13),E})(),(()=>{var E=_v(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.r17),E})(),(()=>{var E=bv(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.r),E})()]}}),w),d(C,a(T,{get when(){return y.malSearch!=="true"},get children(){var E=yv(),L=E.firstChild,R=L.firstChild,U=R.nextSibling;return P(()=>U.checked=v.any||v.r),E}}),w),P(()=>A.checked=v.any),P(()=>I.checked=v.any||v.rx),C})()}}_e(["input","click"]);var Sv=p('<label data-k-48bbc0c0 class=switch><input data-k-48bbc0c0 type=checkbox><span data-k-48bbc0c0 class="slider round">');function Cv(e){return(()=>{var t=Sv(),n=t.firstChild;return It(n,e,!1,!1),t})()}var Av=p("<div data-k-93c05ee9 class=multi-input-footer><button data-k-93c05ee9>Cancel</button><button data-k-93c05ee9>Ok"),xv=p('<form data-k-93c05ee9 class=multi-input><button data-k-93c05ee9 class=open-multi-input>Genres</button><dialog data-k-93c05ee9><div data-k-93c05ee9 class=wrapper><div data-k-93c05ee9 class=multi-input-header><input data-k-93c05ee9 type=search placeholder="Filter genres"></div><div data-k-93c05ee9 class=scroll-wrapper>'),mo=p("<h3 data-k-93c05ee9>Genres"),xa=p("<ol data-k-93c05ee9>"),Tv=p("<h3 data-k-93c05ee9>Tags"),Iv=p("<h3 data-k-93c05ee9>Themes"),Ta=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=excludeGenre>"),Ia=p("<li data-k-93c05ee9><label data-k-93c05ee9>"),Ea=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=genre>");function Ev(e){const[t,n]=xe(),{isTouch:r}=Jt(),[i,l]=O("");let s=!1,o,c,u,h,f,g;function m(){c.close(),s=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(ce(r,m)),(()=>{var $=xv(),C=$.firstChild,S=C.nextSibling,k=S.firstChild,b=k.firstChild,A=b.firstChild,w=b.nextSibling;$.$$input=L=>{const R=L.target.closest("li"),U=L.target.name;!L.target.checked&&!R.classList.contains("exclude")?(R.classList.add("exclude"),L.target.checked=!0,L.target.name="excludeGenre"):R.classList.contains("exclude")&&R.classList.remove("exclude");const G=new FormData(L.currentTarget);R.classList.contains("exclude")?n({[U]:G.getAll(U),[L.target.name]:G.getAll(L.target.name)}):n({[L.target.name]:G.getAll(L.target.name)})},$.addEventListener("submit",L=>{L.preventDefault()});var _=g;typeof _=="function"?fe(_,$):g=$,C.$$click=()=>{if(s)m();else{h=new AbortController;const L=h.signal;o=t.genre,r()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:L}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:L})},{signal:L})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:L}),c.show()),s=!0}};var x=f;typeof x=="function"?fe(x,C):f=C,S.addEventListener("close",m);var I=c;typeof I=="function"?fe(I,S):c=S,A.$$input=L=>{L.stopPropagation(),l(L.target.value.toLowerCase())};var E=u;return typeof E=="function"?fe(E,w):u=w,d(w,a(v,{})),d(k,a(T,{get when(){return r()},get children(){var L=Av(),R=L.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({genre:o})},U.$$click=m,L}}),null),P(()=>$.classList.toggle("mobile",!!r())),$})();function v(){const[$]=xe(),[C,S]=Ye({include:{},exclude:{}});return W(()=>{S(zt({include:Wt($.genre,{}),exclude:Wt($.excludeGenre,{})}))}),a(z,{get children(){return[a(M,{get when(){return e.engine==="ani"},get children(){return a(T,{get when(){return e.aniGenres()},fallback:"Loading...",get children(){return[mo(),(()=>{var k=xa();return d(k,a(H,{get each(){return e.aniGenres().data.genres},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,b,null),d(w,a(T,{get when(){return C.exclude[b]},get fallback(){return(()=>{var _=Ea();return _.value=b,P(()=>_.checked=C.include[b]),_})()},get children(){var _=Ta();return _.value=b,P(()=>_.checked=C.exclude[b]),_}}),null),P(_=>{var x=!!C.exclude[b],I=!b.toLowerCase().includes(i());return x!==_.e&&A.classList.toggle("exclude",_.e=x),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),k})(),Tv(),(()=>{var k=xa();return d(k,a(H,{get each(){return e.aniGenres().data.tags},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return C.exclude[b.name]},get fallback(){return(()=>{var _=Ea();return P(()=>_.value=b.name),P(()=>_.checked=C.include[b.name]),_})()},get children(){var _=Ta();return P(()=>_.value=b.name),P(()=>_.checked=C.exclude[b.name]),_}}),null),P(_=>{var x=!!C.exclude[b.name],I=!b.name.toLowerCase().includes(i());return x!==_.e&&A.classList.toggle("exclude",_.e=x),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),k})()]}})}}),a(M,{get when(){return e.engine==="mal"},get children(){return a(T,{get when(){return e.malGenres()},fallback:"Loading...",get children(){return[mo(),(()=>{var k=xa();return d(k,a(H,{get each(){return e.malGenres().data.genres},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return C.exclude[b.name]},get fallback(){return(()=>{var _=Ea();return P(()=>_.value=b.name),P(()=>_.checked=C.include[b.name]),_})()},get children(){var _=Ta();return P(()=>_.value=b.name),P(()=>_.checked=C.exclude[b.name]),_}}),null),P(_=>{var x=!!C.exclude[b.name],I=!b.name.toLowerCase().includes(i());return x!==_.e&&A.classList.toggle("exclude",_.e=x),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),k})(),Iv(),(()=>{var k=xa();return d(k,a(H,{get each(){return e.malGenres().data.themes},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return C.exclude[b.name]},get fallback(){return(()=>{var _=Ea();return P(()=>_.value=b.name),P(()=>_.checked=C.include[b.name]),_})()},get children(){var _=Ta();return P(()=>_.value=b.name),P(()=>_.checked=C.exclude[b.name]),_}}),null),P(_=>{var x=!!C.exclude[b.name],I=!b.name.toLowerCase().includes(i());return x!==_.e&&A.classList.toggle("exclude",_.e=x),I!==_.t&&A.classList.toggle("hidden",_.t=I),_},{e:void 0,t:void 0}),A})()})),k})()]}})}})]}})}}_e(["input","click"]);var Lv=p('<div data-k-4bf0065c class=cp-two-headed-range><div data-k-4bf0065c class="point start"></div><div data-k-4bf0065c class="point end"></div><div data-k-4bf0065c class=progress-bar>');function Md(e){F(e.onChange,"onChange is missing");const t=Oe({min:0,max:100,separation:1},e),n=Oe({value:[t.min,t.max]},t);let r,i;W(ce(()=>n.minValue,h=>{c(r,h||n.min)})),W(ce(()=>n.maxValue,h=>{c(i,h||n.max)}));let l;Tn(()=>{o.observe(l)}),He(()=>{o.disconnect()});const s=h=>{h[0].isIntersecting===!0&&(c(i,n.maxValue),c(r,n.minValue))},o=new IntersectionObserver(s);return(()=>{var h=Lv(),f=h.firstChild,g=f.nextSibling;h.$$mousedown=u,h.$$touchstart=u;var m=l;typeof m=="function"?fe(m,h):l=h;var y=r;typeof y=="function"?fe(y,f):r=f,f.style.setProperty("--percentage","0%");var v=i;return typeof v=="function"?fe(v,g):i=g,g.style.setProperty("--percentage","100%"),P($=>{var C=n.min,S=n.max;return C!==$.e&&(($.e=C)!=null?f.style.setProperty("--value",C):f.style.removeProperty("--value")),S!==$.t&&(($.t=S)!=null?g.style.setProperty("--value",S):g.style.removeProperty("--value")),$},{e:void 0,t:void 0}),h})();function c(h,f){const g=h.closest(".cp-two-headed-range"),m=g.querySelector(".point.start"),y=g.querySelector(".point.end"),v=m.getBoundingClientRect(),$=y.getBoundingClientRect(),C=g.getBoundingClientRect();if(h===m){const S=$.left-C.left-v.width/2,b=Math.min(1,Math.max(0,(f-n.min)/(parseInt(y.style.getPropertyValue("--value"))-n.min)))*S/C.width;g.querySelector(".progress-bar").style.left=`${(b*100).toFixed(1)}%`,g.querySelector(".progress-bar").style.width=`${(parseInt(y.style.getPropertyValue("--percentage"))-b*100).toFixed(1)}%`,h.style.setProperty("--percentage",(b*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}else if(h===y){const S=C.width-(v.right-C.left)-$.width/2,k=parseInt(m.style.getPropertyValue("--value")),b=Math.min(1,Math.max(0,(f-k)/(n.max-k)))*S,A=(v.right-C.left+$.width/2+b)/C.width;g.querySelector(".progress-bar").style.width=`${(A*100-parseInt(m.style.getPropertyValue("--percentage"))).toFixed(1)}%`,h.style.setProperty("--percentage",(A*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}}function u(h){h.preventDefault();const f=new AbortController,g=f.signal,m=h.target.closest(".cp-two-headed-range"),y=h.clientX||h.touches[0].clientX,v=m.querySelector(".point.start").getBoundingClientRect(),$=m.querySelector(".point.end").getBoundingClientRect(),C=Math.min(Math.abs(y-v.left),Math.abs(y-v.right)),S=Math.min(Math.abs(y-$.left),Math.abs(y-$.right));let k,b,A=0;h.target.classList.contains("start")?(k=h.target,b=m.querySelector(".point.end")):h.target.classList.contains("end")?(k=h.target,b=m.querySelector(".point.start")):C<S?(k=m.querySelector(".point.start"),b=m.querySelector(".point.end")):(k=m.querySelector(".point.end"),b=m.querySelector(".point.start"));const w=k.classList.contains("end"),_=m.getBoundingClientRect(),x=k.getBoundingClientRect(),I=b.getBoundingClientRect();let E,L=_.left;w?(E=_.width-(I.right-_.left)-I.width/2,L=I.right+I.width/2):E=I.left-_.left-x.width/2,h.target===k&&(A=y-(x.left+x.width/2)),R(y);function R(U){const G=Math.max(Math.min(1,(U-A-L)/E),0),J=w?parseInt(b.style.getPropertyValue("--value"))+n.separation:n.min,Y=w?n.max:parseInt(b.style.getPropertyValue("--value"))-n.separation,q=w?(_.width-E)/_.width:0,le=w?1:E/_.width,Z=Math.max(Math.min(le,(U-A-_.left)/_.width),q);w?m.querySelector(".progress-bar").style.width=`${(Z*100-parseInt(b.style.getPropertyValue("--percentage"))).toFixed(1)}%`:(m.querySelector(".progress-bar").style.left=`${(Z*100).toFixed(1)}%`,m.querySelector(".progress-bar").style.width=`${(parseInt(b.style.getPropertyValue("--percentage"))-Z*100).toFixed(1)}%`),k.style.setProperty("--percentage",(Z*100).toFixed(1)+"%"),k.style.setProperty("--value",J+Math.round((Y-J)*G))}k.classList.add("active"),g.addEventListener("abort",()=>{k.classList.remove("active"),w?n.onChange([parseInt(b.style.getPropertyValue("--value")),parseInt(k.style.getPropertyValue("--value"))]):n.onChange([parseInt(k.style.getPropertyValue("--value")),parseInt(b.style.getPropertyValue("--value"))])}),window.addEventListener("mousemove",U=>{U.preventDefault(),U.buttons===1?R(U.clientX):f.abort()},{signal:g}),window.addEventListener("touchmove",U=>{U.preventDefault();const[{clientX:G}]=U.touches;R(G)},{signal:g}),window.addEventListener("touchend",()=>{f.abort()},{signal:g,once:!0})}}_e(["touchstart","mousedown"]);const vn=Na(),Gi={trending:{order:"trending"},popular:{order:"popularity"},novel:{format:"lightnovel"},finished:{order:"end_date_filtered",status:"complete"},new:{order:"id"},"top-100":{order:"score"},"finished-manga":{order:"end_date_filtered",status:"complete",format:"manga"},"finished-novel":{order:"end_date_filtered",status:"complete",format:"lightnovel"},ani:{tba:{season:"tba",status:"upcoming"},anime:{"this-season":{year:vn.seasonYear,season:vn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:vn.nextYear,season:vn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{country:"KR"}},mal:{tba:{status:"upcoming"},anime:{"this-season":{year:vn.seasonYear,season:vn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:vn.nextYear,season:vn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{format:"manhwa"}}};function Pv(e,...t){return t.some(n=>n in e&&(e[n]==null||e[n].length===0))}function gi(){const e=ee(),t=Kt(),n=gn(),[r,i]=xe();return[l=>Rv(r,e,l),(l,s)=>Nv(r,i,e,n,t,l,s)]}function Mv(){const e=ee(),t=Kt(),n=gn(),[r]=xe();return i=>Ov(r,e,n,t,i)}function Dv(){const e=ee(),t=Kt(),n=gn(),[r]=xe();return()=>n(`/search/${e.type}${is(r,e,t,{})}`,{scroll:!1})}function Rv(e,t,n){return e[n]||as(e,t)[n]}function as(e,t,n){return pl(e.malSearch==="true",t.header,t.type,n)||{}}function pl(e,t,n,r){var s,o,c;const i=r||t;if(i!=null&&i.match(/^(summer|fall|spring|winter)-\d+$/)){const[u,h]=i.split("-");return{year:h,season:u,order:"title_romaji",sort:"ASC"}}const l=e?"mal":"ani";return Gi[i]||((s=Gi[l])==null?void 0:s[i])||((c=(o=Gi[l])==null?void 0:o[n])==null?void 0:c[i])}function Nv(e,t,n,r,i,l,s){var u;const o=as(e,n),c=(...h)=>is(e,n,i,...h);if(Pv(l,...Object.keys(o)))return r(`/search/${n.type}${c(l)}`,{scroll:!1,...s});if((u=n.header)!=null&&u.match(/^(summer|fall|spring|winter)-\d+$/)){const{season:h=o.season,year:f=o.year,...g}=l,m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}if(n.header==="this-season"||n.header==="next-season"){const{season:h=e.season,year:f=e.year,...g}=l;if(h!=null&&f!=null){const m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}}t(l,s)}function Ov(e,t,n,r,i){const l=pl(e.malSearch==="true",t.header,t.type),s=pl(e.malSearch==="true",t.header,i);return!l||s?n("/"+t.mode+"/"+i+(t.header?"/"+t.header:"")+r.search):n(`/search/${i}${is(e,t,r,{},!0)}`,{scroll:!1})}function is(e,t,n,r,i=!0,l){const s=as(e,t,l),o=Object.fromEntries(new URLSearchParams(n.search)),c=[...new URLSearchParams(n.search)].filter(([g,m])=>!(g in r||!i&&g in s&&s[g]==m)).map(([g,m])=>`${g}=${m}`),u=i===!1?[]:Object.entries(s).filter(([g])=>!(g in r||g in o)).map(([g,m])=>`${g}=${m}`),h=Object.entries(r).filter(([,g])=>Fv(g)).map(([g,m])=>Array.isArray(m)?m.map(y=>`${g}=${y}`).join("&"):`${g}=${m}`),f=u.concat(c).concat(h).join("&");return f.length?"?"+f:""}function Fv(e){return e!=null&&e.length!=0}var Uv=p("<button data-k-53d51b9e>Cancel"),Bv=p("<button data-k-53d51b9e>Ok"),Vv=p('<form data-k-53d51b9e class=multi-input><button data-k-53d51b9e class=open-multi-input>Year</button><dialog data-k-53d51b9e closedby=any><div data-k-53d51b9e class=wrapper><div data-k-53d51b9e class=multi-input-header><input data-k-53d51b9e type=search placeholder="Search year"></div><div data-k-53d51b9e class=scroll-wrapper></div><div data-k-53d51b9e class=multi-input-footer><div data-k-53d51b9e class=flex-space-between><input data-k-53d51b9e type=number inputmode=numeric name=startYear><input data-k-53d51b9e type=number inputmode=numeric name=endYear>'),Gv=p("<ol data-k-53d51b9e>"),Hv=p("<li data-k-53d51b9e><label data-k-53d51b9e> <input data-k-53d51b9e type=radio name=year>");function Yv(){const[e,t]=gi(),{isTouch:n}=Jt(),[r,i]=O(""),l=new Date().getFullYear()+2;let s=!1,o={},c,u,h,f,g;const m=An(tn,(C,S)=>t(C,S),100);function y(){c.close(),s=!1,h==null||h.abort(),t({preventFetch:void 0})}function v(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(ce(n,y)),(()=>{var C=Vv(),S=C.firstChild,k=S.nextSibling,b=k.firstChild,A=b.firstChild,w=A.firstChild,_=A.nextSibling,x=_.nextSibling,I=x.firstChild,E=I.firstChild,L=E.nextSibling;C.$$input=Y=>{Y.target.name==="year"&&m({[Y.target.name]:Y.target.checked?Y.target.value:void 0,season:e("season"),startYear:void 0,endYear:void 0})},C.addEventListener("submit",Y=>{Y.preventDefault()});var R=g;typeof R=="function"?fe(R,C):g=C,S.$$click=()=>{if(s)y();else{h=new AbortController;const Y=h.signal;o={year:e("year"),startYear:e("startYear"),endYear:e("endYear")},n()?(c.showModal(),m({preventFetch:!0}),v(),window.addEventListener("resize",v,{signal:Y}),c.addEventListener("touchstart",q=>{q.target===c&&c.addEventListener("touchend",le=>{le.target===c&&(le.preventDefault(),y())},{once:!0,signal:Y})},{signal:Y})):(window.addEventListener("mousedown",q=>q.target!==f&&q.target.closest("dialog")!==c&&y(),{signal:Y}),c.show()),s=!0}};var U=f;typeof U=="function"?fe(U,S):f=S,k.addEventListener("close",y);var G=c;typeof G=="function"?fe(G,k):c=k,w.$$input=Y=>{Y.stopPropagation(),i(Y.target.value.toLowerCase())};var J=u;return typeof J=="function"?fe(J,_):u=_,d(_,a($,{})),d(x,a(Md,{min:1970,max:l,separation:1,get minValue(){return+e("startYear")||1970},get maxValue(){return+e("endYear")||l},onChange:([Y,q])=>m({startYear:Y,endYear:q,year:void 0})}),I),E.$$beforeinput=Y=>{var q;(q=Y.data)!=null&&q.toLowerCase().includes("e")&&Y.preventDefault()},E.addEventListener("blur",Y=>Y.target.value=e("startYear")||1970),E.addEventListener("change",Y=>{m({startYear:Math.min(+Y.target.value,+e("endYear")||l),endYear:Math.max(+Y.target.value,+e("endYear")||l),year:void 0})}),L.$$beforeinput=Y=>{var q;(q=Y.data)!=null&&q.toLowerCase().includes("e")&&Y.preventDefault()},L.addEventListener("blur",Y=>Y.target.value=e("endYear")||l),L.addEventListener("change",Y=>{m({startYear:Math.min(+Y.target.value,+e("startYear")||1970),endYear:Math.max(+Y.target.value,+e("startYear")||1970),year:void 0})}),d(x,a(T,{get when(){return n()},get children(){return[(()=>{var Y=Uv();return Y.$$click=()=>{y(),t(o)},Y})(),(()=>{var Y=Bv();return Y.$$click=y,Y})()]}}),null),P(()=>C.classList.toggle("mobile",!!n())),P(()=>E.value=+e("startYear")||1970),P(()=>L.value=+e("endYear")||l),C})();function $(){return(()=>{var C=Gv();return d(C,a(H,{get each(){return Array.from({length:Math.abs(l-1969)},(S,k)=>l-k)},children:S=>(()=>{var k=Hv(),b=k.firstChild,A=b.firstChild,w=A.nextSibling;return d(b,S,A),w.value=S,P(()=>k.classList.toggle("hidden",!S.toString().startsWith(r()))),P(()=>w.checked=e("year")==S),k})()})),C})()}}_e(["input","click","beforeinput"]);var jv=p("<div data-k-ddc3fe99 class=multi-input-footer><button data-k-ddc3fe99>Cancel</button><button data-k-ddc3fe99>Ok"),zv=p("<form data-k-ddc3fe99 class=multi-input><button data-k-ddc3fe99 class=open-multi-input>Formats</button><dialog data-k-ddc3fe99><div data-k-ddc3fe99 class=wrapper><div data-k-ddc3fe99 class=scroll-wrapper>"),Wv=p("<ol data-k-ddc3fe99>"),qv=p("<li data-k-ddc3fe99><label data-k-ddc3fe99><input data-k-ddc3fe99 type=checkbox name=format>");function Kv(){const[e,t]=xe(),{isTouch:n}=Jt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(ce(n,h)),(()=>{var m=zv(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,C=$.firstChild;m.$$input=w=>{const x=new FormData(w.currentTarget).getAll("format");t({format:x})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?fe(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.format,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",_=>{_.target===l&&l.addEventListener("touchend",x=>{x.target===l&&(x.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?fe(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?fe(b,v):l=v;var A=s;return typeof A=="function"?fe(A,C):s=C,d(C,a(g,{})),d($,a(T,{get when(){return n()},get children(){var w=jv(),_=w.firstChild,x=_.nextSibling;return _.$$click=()=>{h(),t({format:i})},x.$$click=h,w}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=Ye({}),$=ee();W(()=>{v(zt(Wt(m.format,{})))});const C=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani";return(()=>{var S=Wv();return d(S,a(H,{get each(){return Object.entries(Hn[C()][$.type]||{})},fallback:"Something went wrong",children:([k,b])=>(()=>{var A=qv(),w=A.firstChild,_=w.firstChild;return d(w,()=>b.flavorText,_),_.value=k,P(()=>_.checked=y[k]),A})()})),S})()}}_e(["input","click"]);var Jv=p("<div data-k-3f80fe5b class=multi-input-footer><button data-k-3f80fe5b>Cancel</button><button data-k-3f80fe5b>Ok"),Xv=p("<form data-k-3f80fe5b class=multi-input><div data-k-3f80fe5b class=open-button-wrapper><button data-k-3f80fe5b class=open-multi-input>Sort order</button><button data-k-3f80fe5b type=button></button></div><dialog data-k-3f80fe5b><div data-k-3f80fe5b class=wrapper><div data-k-3f80fe5b class=scroll-wrapper>"),Zv=p("<ol data-k-3f80fe5b>"),Qv=p("<li data-k-3f80fe5b><label data-k-3f80fe5b><input data-k-3f80fe5b type=radio name=order>");function e$(){const[e,t]=xe(),{isTouch:n}=Jt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(ce(n,h)),(()=>{var m=Xv(),y=m.firstChild,v=y.firstChild,$=v.nextSibling,C=y.nextSibling,S=C.firstChild,k=S.firstChild;m.$$input=x=>{t({order:x.target.value})},m.addEventListener("submit",x=>{x.preventDefault()});var b=u;typeof b=="function"?fe(b,m):u=m,v.$$click=()=>{if(r)h();else{o=new AbortController;const x=o.signal;i=e.order,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:x}),l.addEventListener("touchstart",I=>{I.target===l&&l.addEventListener("touchend",E=>{E.target===l&&(E.preventDefault(),h())},{once:!0,signal:x})},{signal:x})):(window.addEventListener("mousedown",I=>I.target!==c&&I.target.closest("dialog")!==l&&h(),{signal:x}),l.show()),r=!0}};var A=c;typeof A=="function"?fe(A,v):c=v,$.$$click=()=>t({sort:e.sort?void 0:"ASC"}),d($,()=>e.sort||"DESC"),C.addEventListener("close",h);var w=l;typeof w=="function"?fe(w,C):l=C;var _=s;return typeof _=="function"?fe(_,k):s=k,d(k,a(g,{})),d(S,a(T,{get when(){return n()},get children(){var x=Jv(),I=x.firstChild,E=I.nextSibling;return I.$$click=()=>{h(),t({order:i})},E.$$click=h,x}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=Ye({}),$=ee();W(()=>{v(zt(Wt(m.order,{})))});const C=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",S=()=>Object.entries(Ht[C()][$.type]||{}).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=Zv();return d(k,a(H,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=Qv(),_=w.firstChild,x=_.firstChild;return d(_,()=>A.flavorText,x),P(()=>x.value=A.alternative_key||b),P(()=>x.checked=y[b]||A.alternative_key&&y[A.alternative_key]),w})()})),k})()}}_e(["input","click"]);var t$=p("<div data-k-d25d331a class=multi-input-footer><button data-k-d25d331a>Cancel</button><button data-k-d25d331a>Ok"),n$=p("<form data-k-d25d331a class=multi-input><button data-k-d25d331a class=open-multi-input>Status</button><dialog data-k-d25d331a><div data-k-d25d331a class=wrapper><div data-k-d25d331a class=scroll-wrapper>"),r$=p("<ol data-k-d25d331a>"),a$=p("<li data-k-d25d331a><label data-k-d25d331a><input data-k-d25d331a type=radio name=status>");function i$(){const[e,t]=xe(),{isTouch:n}=Jt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(ce(n,h)),(()=>{var m=n$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,C=$.firstChild;m.$$input=w=>{t({[w.target.name]:w.target.value})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?fe(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.status,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",_=>{_.target===l&&l.addEventListener("touchend",x=>{x.target===l&&(x.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?fe(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?fe(b,v):l=v;var A=s;return typeof A=="function"?fe(A,C):s=C,d(C,a(g,{})),d($,a(T,{get when(){return n()},get children(){var w=t$(),_=w.firstChild,x=_.nextSibling;return _.$$click=()=>{h(),t({status:i})},x.$$click=h,w}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=Ye({}),$=ee();W(()=>{v(zt(Wt(m.status,{})))});const C=()=>m.malSearch==="true"&&($.type==="anime"||$.type==="manga")?"mal":"ani",S=()=>Object.entries(yn[C()][$.type]||{}).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=r$();return d(k,a(H,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=a$(),_=w.firstChild,x=_.firstChild;return d(_,()=>A.flavorText,x),x.value=b,P(()=>x.checked=y[b]),w})()})),k})()}}_e(["input","click"]);var l$=p("<div data-k-829b0f47 class=multi-input-footer><button data-k-829b0f47>Cancel</button><button data-k-829b0f47>Ok"),s$=p("<form data-k-829b0f47 class=multi-input><button data-k-829b0f47 class=open-multi-input>Country</button><dialog data-k-829b0f47><div data-k-829b0f47 class=wrapper><div data-k-829b0f47 class=scroll-wrapper>"),o$=p("<ol data-k-829b0f47>"),c$=p("<li data-k-829b0f47><label data-k-829b0f47><input data-k-829b0f47 type=radio name=country>");function d$(){const[e,t]=xe(),{isTouch:n}=Jt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(ce(n,h)),(()=>{var m=s$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,C=$.firstChild;m.$$input=w=>{t({[w.target.name]:w.target.value})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?fe(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.country,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",_=>{_.target===l&&l.addEventListener("touchend",x=>{x.target===l&&(x.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?fe(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?fe(b,v):l=v;var A=s;return typeof A=="function"?fe(A,C):s=C,d(C,a(g,{})),d($,a(T,{get when(){return n()},get children(){var w=l$(),_=w.firstChild,x=_.nextSibling;return _.$$click=()=>{h(),t({country:i})},x.$$click=h,w}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=xe(),[y,v]=Ye({});W(()=>{v(zt(Wt(m.country,{})))});const $=()=>Object.entries(wc).sort(([,C],[,S])=>C.flavorText.localeCompare(S));return(()=>{var C=o$();return d(C,a(H,{get each(){return $()},fallback:"Something went wrong",children:([S,k])=>(()=>{var b=c$(),A=b.firstChild,w=A.firstChild;return d(A,()=>k.flavorText,w),w.value=S,P(()=>w.checked=y[S]),b})()})),C})()}}_e(["input","click"]);var u$=p("<div data-k-de2dabd3 class=multi-input-footer><button data-k-de2dabd3>Cancel</button><button data-k-de2dabd3>Ok"),h$=p('<form data-k-de2dabd3 class=multi-input><button data-k-de2dabd3 class=open-multi-input>Source</button><dialog data-k-de2dabd3><div data-k-de2dabd3 class=wrapper><div data-k-de2dabd3 class=multi-input-header><input data-k-de2dabd3 type=search placeholder="Filter sources"></div><div data-k-de2dabd3 class=scroll-wrapper>'),g$=p("<ol data-k-de2dabd3>"),f$=p("<li data-k-de2dabd3><label data-k-de2dabd3><input data-k-de2dabd3 type=radio name=source>");function m$(){const[e,t]=xe(),[n,r]=O(""),{isTouch:i}=Jt();let l=!1,s,o,c,u,h,f;function g(){o.close(),l=!1,u==null||u.abort(),t({preventFetch:void 0})}function m(){c.classList.toggle("has-scroll-bar",c.scrollHeight-c.clientHeight>0)}return W(ce(i,g)),(()=>{var v=h$(),$=v.firstChild,C=$.nextSibling,S=C.firstChild,k=S.firstChild,b=k.firstChild,A=k.nextSibling;v.$$input=E=>{t({[E.target.name]:E.target.value})},v.addEventListener("submit",E=>{E.preventDefault()});var w=f;typeof w=="function"?fe(w,v):f=v,$.$$click=()=>{if(l)g();else{u=new AbortController;const E=u.signal;s=e.source,i()?(o.showModal(),t({preventFetch:!0}),m(),window.addEventListener("resize",m,{signal:E}),o.addEventListener("touchstart",L=>{L.target===o&&o.addEventListener("touchend",R=>{R.target===o&&(R.preventDefault(),g())},{once:!0,signal:E})},{signal:E})):(window.addEventListener("mousedown",L=>L.target!==h&&L.target.closest("dialog")!==o&&g(),{signal:E}),o.show()),l=!0}};var _=h;typeof _=="function"?fe(_,$):h=$,C.addEventListener("close",g);var x=o;typeof x=="function"?fe(x,C):o=C,b.$$input=E=>{E.stopPropagation(),r(E.target.value.toLowerCase())};var I=c;return typeof I=="function"?fe(I,A):c=A,d(A,a(y,{})),d(S,a(T,{get when(){return i()},get children(){var E=u$(),L=E.firstChild,R=L.nextSibling;return L.$$click=()=>{g(),t({source:s})},R.$$click=g,E}}),null),P(()=>v.classList.toggle("mobile",!!i())),v})();function y(){const[v]=xe(),[$,C]=Ye({});W(()=>{C(zt(Wt(v.source,{})))});const S=()=>Object.entries(Nl).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=g$();return d(k,a(H,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=f$(),_=w.firstChild,x=_.firstChild;return d(_,()=>A.flavorText,x),x.value=b,P(()=>w.classList.toggle("hidden",!A.flavorText.toLowerCase().includes(n()))),P(()=>x.checked=$[b]),w})()})),k})()}}_e(["input","click"]);var p$=p("<div data-k-86a7e743 class=multi-input-footer><button data-k-86a7e743>Cancel</button><button data-k-86a7e743>Ok"),v$=p('<form data-k-86a7e743 class=multi-input><button data-k-86a7e743 class=open-multi-input>ExternalSources</button><dialog data-k-86a7e743><div data-k-86a7e743 class=wrapper><div data-k-86a7e743 class=multi-input-header><input data-k-86a7e743 type=search placeholder="Filter external sources"></div><div data-k-86a7e743 class=scroll-wrapper>'),$$=p("<ol data-k-86a7e743>"),_$=p('<img data-k-86a7e743 alt="External source logo">'),b$=p("<sup data-k-86a7e743>"),y$=p("<li data-k-86a7e743><label data-k-86a7e743><div data-k-86a7e743 class=grid-wrapper><span data-k-86a7e743></span></div><input data-k-86a7e743 type=checkbox name=externalSource>");function w$(e){const[t,n]=xe(),[r,i]=O(""),{isTouch:l}=Jt();let s=!1,o,c,u,h,f,g;function m(){c.close(),s=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(ce(l,m)),(()=>{var $=v$(),C=$.firstChild,S=C.nextSibling,k=S.firstChild,b=k.firstChild,A=b.firstChild,w=b.nextSibling;$.$$input=L=>{const R=new FormData(L.currentTarget);n({[L.target.name]:R.getAll(L.target.name)})},$.addEventListener("submit",L=>{L.preventDefault()});var _=g;typeof _=="function"?fe(_,$):g=$,C.$$click=()=>{if(s)m();else{h=new AbortController;const L=h.signal;o=t.externalSource,l()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:L}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:L})},{signal:L})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:L}),c.show()),s=!0}};var x=f;typeof x=="function"?fe(x,C):f=C,S.addEventListener("close",m);var I=c;typeof I=="function"?fe(I,S):c=S,A.$$input=L=>{L.stopPropagation(),i(L.target.value.toLowerCase())};var E=u;return typeof E=="function"?fe(E,w):u=w,d(w,a(v,{})),d(k,a(T,{get when(){return l()},get children(){var L=p$(),R=L.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({externalSource:o})},U.$$click=m,L}}),null),P(()=>$.classList.toggle("mobile",!!l())),$})();function v(){const[$]=xe(),[C,S]=Ye({});return W(()=>{S(zt(Wt($.externalSource,{})))}),(()=>{var k=$$();return d(k,a(H,{get each(){var b;return((b=e.sources())==null?void 0:b.data)||[]},fallback:"Loading",children:b=>(()=>{var A=y$(),w=A.firstChild,_=w.firstChild,x=_.firstChild,I=_.nextSibling;return d(_,a(T,{get when(){return b.icon},get children(){var E=_$();return P(L=>{var R=b.icon,U=b.color;return R!==L.e&&V(E,"src",L.e=R),U!==L.t&&((L.t=U)!=null?E.style.setProperty("background-color",U):E.style.removeProperty("background-color")),L},{e:void 0,t:void 0}),E}}),x),d(x,()=>b.site,null),d(x,a(T,{get when(){return b.language},get children(){var E=b$();return d(E,()=>b.language),E}}),null),P(()=>A.classList.toggle("hidden",!b.site.toLowerCase().includes(r()))),P(()=>I.value=b.id),P(()=>I.checked=C[b.id]),A})()})),k})()}}_e(["input","click"]);var k$=p("<div data-k-b93bd9f3 class=multi-input-footer><button data-k-b93bd9f3>Cancel</button><button data-k-b93bd9f3>Ok"),S$=p("<form data-k-b93bd9f3 class=multi-input><button data-k-b93bd9f3 class=open-multi-input>Seasons</button><dialog data-k-b93bd9f3><div data-k-b93bd9f3 class=wrapper><div data-k-b93bd9f3 class=scroll-wrapper>"),C$=p("<ol data-k-b93bd9f3>"),A$=p("<li data-k-b93bd9f3><label data-k-b93bd9f3><input data-k-b93bd9f3 type=radio name=season>");function x$(){const[e,t]=gi(),{isTouch:n}=Jt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(ce(n,h)),(()=>{var m=S$(),y=m.firstChild,v=y.nextSibling,$=v.firstChild,C=$.firstChild;m.$$input=w=>{const x=new FormData(w.currentTarget).getAll("season");t({season:x,year:e("year")})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?fe(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e("season"),n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",_=>{_.target===l&&l.addEventListener("touchend",x=>{x.target===l&&(x.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",_=>_.target!==c&&_.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?fe(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?fe(b,v):l=v;var A=s;return typeof A=="function"?fe(A,C):s=C,d(C,a(g,{})),d($,a(T,{get when(){return n()},get children(){var w=k$(),_=w.firstChild,x=_.nextSibling;return _.$$click=()=>{h(),t({season:i})},x.$$click=h,w}}),null),P(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const m=ee(),[y,v]=Ye({});W(()=>{v(zt(Wt(e("season"),{})))});const $=()=>e("malSearch")==="true"&&(m.type==="anime"||m.type==="manga")?"mal":"ani";return(()=>{var C=C$();return d(C,a(H,{get each(){var S;return Object.entries(((S=ra[$()])==null?void 0:S[m.type])||{})},fallback:"Something went wrong",children:([S,k])=>a(T,{when:S!=="tba",get children(){var b=A$(),A=b.firstChild,w=A.firstChild;return d(A,()=>k.flavorText,w),w.value=S,P(()=>w.checked=y[S]),b}})})),C})()}}_e(["input","click"]);var T$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 0.01 512.01 511.99"><path fill=currentColor d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">');function Dd(){return T$()}var I$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">');function E$(){return I$()}var L$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0.03 447.99 512.02"><path fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">');function P$(){return L$()}var M$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 65.1 512 381.8"><path fill=currentColor d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">');function D$(){return M$()}var R$=p('<svg viewBox="0 0 16 16"xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z">');function N$(){return R$()}var O$=p('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path fill=currentColor d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">');function ma(e){return(()=>{var t=O$();return It(t,e,!0,!0),t})()}var F$=p("<tool-tip2 data-k-6bfde80e inert role=tooltip>",!0,!1,!1);function U$(e){return Ct(e.positions,"positions"),(()=>{var t=F$();return It(t,e,!1,!1),t._$owner=Cr(),P(()=>V(t,"data-tooltip-positions",e.positions)),t})()}var B$=p("<li data-k-5face4dc>"),V$=p("<button data-k-5face4dc class=cp-media-action-item data-tooltip-trigger>");function Hr(e){return(()=>{var t=B$();return d(t,a(Rd,e)),t})()}function Rd(e){return Ct(e.label,"label"),hn(e.onClick,"onClick"),(()=>{var t=V$();return Ha(t,"click",e.onClick,!0),d(t,()=>e.children,null),d(t,a(U$,{positions:"left right",get children(){return e.label}}),null),P(()=>t.classList.toggle("big",!!e.big)),t})()}_e(["click"]);var G$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z">');function H$(){return G$()}var Y$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z">');function j$(){return Y$()}var Nd=p("<div data-k-2ffecdb9 class=score> "),Od=p("<div data-k-2ffecdb9 class=wrapper><img data-k-2ffecdb9 class=absolute-inset alt=Cover.>"),z$=p("<div data-k-2ffecdb9 class=list-status>"),Fd=p("<p data-k-2ffecdb9 class=line-clamp>"),Ud=p('<li data-k-2ffecdb9 class="cp-media-card inline-container">'),W$=p("<ul data-k-2ffecdb9 class=cp-media-card-quick-action-items>"),q$=p('<div data-k-2ffecdb9 class="absolute-inset recommendation-rating-wrapper"><div data-k-2ffecdb9 class=flex-space-between><div data-k-2ffecdb9><button data-k-2ffecdb9></button><button data-k-2ffecdb9></button></div><span data-k-2ffecdb9>'),Bd=p("<li data-k-2ffecdb9 class=cp-character-card>"),K$=p("<img data-k-2ffecdb9>"),J$=p("<div data-k-2ffecdb9 class=grid><span data-k-2ffecdb9></span><span data-k-2ffecdb9>");function Vd(e){return F(e.media,"Missing media"),(()=>{var t=Ud();return d(t,a(B,{class:"block-link",get href(){return gd(e.media)},get children(){return[(()=>{var n=Od(),r=n.firstChild;return d(n,a(T,{get when(){return e.media.averageScore},get children(){var i=Nd(),l=i.firstChild;return d(i,a(ma,{}),l),d(i,()=>e.media.averageScore/10,null),i}}),null),d(n,()=>e.children,null),P(()=>V(r,"src",e.media.coverImage.large)),n})(),(()=>{var n=Fd();return d(n,a(T,{get when(){var r;return(r=e.media.mediaListEntry)==null?void 0:r.status},get children(){var r=z$();return P(()=>V(r,"data-status",e.media.mediaListEntry.status)),r}}),null),d(n,()=>e.media.title.userPreferred,null),n})()]}})),t})()}function X$(e){return F(e.media,"Missing media"),(()=>{var t=Ud();return d(t,a(B,{class:"block-link",get href(){return hd(e.type,e.media)},get children(){return[(()=>{var n=Od(),r=n.firstChild;return d(n,a(T,{get when(){return e.media.score},get children(){var i=Nd(),l=i.firstChild;return d(i,a(ma,{}),l),d(i,()=>e.media.score,null),i}}),null),d(n,()=>e.children,null),P(()=>V(r,"src",e.media.images.webp.large_image_url)),n})(),(()=>{var n=Fd();return d(n,a(T,{get when(){return e.media.titles},get fallback(){return e.media.title},get children(){return a(z,{get children(){return[a(M,{get when(){return e.media.titles.English},get children(){return e.media.titles.English}}),a(M,{get when(){return e.media.titles.Default},get children(){return e.media.titles.Default}})]}})}})),n})()]}})),t})()}function fi(e){return F(e.media,"Missing media"),a(Vd,Oe(e,{get children(){return a(Gd,e)}}))}function vl(e){return F(e.media,"Missing media"),Ct(e.type),a(X$,Oe(e,{get children(){return a(T,{get when(){return Hs[e.media.mal_id]},get children(){return a(Gd,{get media(){return Hs[e.media.mal_id]}})}})}}))}function Gd(e){const{openEditor:t}=Pl(),{accessToken:n}=ie();return F(e.media,"Missing media"),a(T,{get when(){return n()},get children(){var r=W$();return d(r,a(Hr,{label:"Edit media",onClick:i=>{i.preventDefault(),t(e.media)},get children(){return a(Dd,{})}}),null),d(r,a(Hr,{label:"Set to planning",onClick:i=>{i.preventDefault(),oe.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"PLANNING"})},get children(){return a(E$,{})}}),null),d(r,a(Hr,{get label(){return"Set to "+(e.media.type==="ANIME"?"watching":"reading")},onClick:i=>{i.preventDefault(),oe.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"CURRENT"})},get children(){return a(P$,{})}}),null),d(r,a(Hr,{label:"Set to completed",onClick:i=>{i.preventDefault(),oe.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"COMPLETED"})},get children(){return a(D$,{})}}),null),d(r,a(Hr,{get label(){return"Set to "+(e.media.type==="ANIME"?"rewatching":"rereading")},onClick:i=>{i.preventDefault(),oe.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"REPEAT"})},get children(){return a(N$,{})}}),null),r}})}function Z$(e){return F(e.node,"Missing node"),hn(e.handleRateUp,"handleRateUp"),hn(e.handleRateDown,"handleRateDown"),Ct(e.userRating,"userRating"),xc(e.rating,"rating"),a(Vd,{get media(){return e.node.mediaRecommendation},get children(){var t=q$(),n=t.firstChild,r=n.firstChild,i=r.firstChild,l=i.nextSibling,s=r.nextSibling;return Ha(i,"click",e.handleRateUp,!0),i.style.setProperty("--color","lime"),d(i,a(H$,{})),Ha(l,"click",e.handleRateDown,!0),l.style.setProperty("--color","crimson"),d(l,a(j$,{})),d(s,a(T,{get when(){return e.rating>0},children:"+"}),null),d(s,()=>e.rating,null),P(o=>{var c=e.userRating==="RATE_UP",u=e.userRating==="RATE_DOWN";return c!==o.e&&i.classList.toggle("active",o.e=c),u!==o.t&&l.classList.toggle("active",o.t=u),o},{e:void 0,t:void 0}),t}})}function Hd(e){return F(e.character,"character"),Ct(e.role,"role"),(()=>{var t=Bd();return d(t,a($l,{get href(){return Wf(e.character)},get src(){return e.character.images.webp.image_url},get name(){return e.character.name},get extra(){return e.role},alt:"Character."}),null),d(t,a(T,{get when(){return e.voiceActor},get children(){return a($l,{get href(){return e.voiceActor.person.url},get src(){return e.voiceActor.person.images.jpg.image_url},get name(){return e.voiceActor.person.name},get extra(){return e.voiceActor.language},alt:"Voice actor.",class:"dir-rtl"})}}),null),t})()}function ls(e){return F(e.staff,"staff"),F(e.positions,"positions"),(()=>{var t=Bd();return d(t,a($l,{get href(){return e.staff.url},get src(){return e.staff.images.jpg.image_url},get name(){return e.staff.name},get extra(){return e.positions.join(", ")},alt:"Staff."})),t})()}function $l(e){return Ct(e.alt),a(B,{className:"clean-link flex",get class(){return e.class},get href(){return e.href},get children(){return[(()=>{var t=K$();return P(n=>{var r=e.src,i=e.alt;return r!==n.e&&V(t,"src",n.e=r),i!==n.t&&V(t,"alt",n.t=i),n},{e:void 0,t:void 0}),t})(),(()=>{var t=J$(),n=t.firstChild,r=n.nextSibling;return d(n,()=>e.name),d(r,()=>e.extra),t})()]}})}_e(["click"]);var Q$=p("<section data-k-1bb8fda2>");function Yd(e){return(()=>{var t=Q$();return It(t,e,!1,!1),t})()}var e1=p("<button data-k-89909c33>TBA"),t1=p("<button data-k-89909c33>Current season"),n1=p("<button data-k-89909c33>Next season"),r1=p("<div data-k-89909c33>"),a1=p("<div data-k-89909c33 class=search-page><div data-k-89909c33 class=header-row><h1 data-k-89909c33></h1><select data-k-89909c33 name=type id=type><option data-k-89909c33 value=anime>Anime</option><option data-k-89909c33 value=manga>Manga</option><option data-k-89909c33 value=media>Media</option></select></div><div data-k-89909c33 class=grid-column-auto-fill><input data-k-89909c33 type=search><span data-k-89909c33><p data-k-89909c33>Search MAL</p></span><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hideMyAnime id=hideMyAnime><label data-k-89909c33 for=hideMyAnime> Hide my </label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=showMyAnime id=showMyAnime><label data-k-89909c33 for=showMyAnime> Only show my </label></div><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hasNotLicense id=hasNotLicense><label data-k-89909c33 for=hasNotLicense> Licensed</label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=hasLicense id=hasLicense><label data-k-89909c33 for=hasLicense> Unlicensed"),i1=p('<ol data-k-89909c33 class="flex-space-between cp-search-season-controls"><li data-k-89909c33><button data-k-89909c33>&lt;</button></li><li data-k-89909c33><button data-k-89909c33>>'),l1=p("<h1 data-k-89909c33> "),Hi=p("<h1 data-k-89909c33>"),s1=p("<h1 data-k-89909c33>TBA"),o1=p('<ol data-k-89909c33 class="search-page-content grid-column-auto-fill">'),c1=p("<li data-k-89909c33 class=item><button data-k-89909c33><h3 data-k-89909c33></h3><p data-k-89909c33>"),d1=p("<ol data-k-89909c33 class=search-meta-tags><li data-k-89909c33><button data-k-89909c33>Clear all"),u1=p("<li data-k-89909c33><button data-k-89909c33>"),_l=p("<li data-k-89909c33 class=grid-full-span><h2 data-k-89909c33>");class se{constructor({url:t,key:n,value:r,active:i=!0,visuallyDisabled:l=!1,reason:s,desc:o,name:c,hidden:u=!1,canClear:h=!0,addUrl:f}){F(!i||n,"key missing"),F(u||c,"Name is missing"),F(!h||!i||t,"Url is missing"),F(h||u,"Don't show user meta tags they can't clear"),F(typeof i=="boolean","active is not boolean"),F(typeof l=="boolean","visuallyDisabled is not boolean"),F(typeof u=="boolean","hidden is not boolean"),F(typeof h=="boolean","canClear is not boolean"),this.name=c,this.url=t,this.addUrl=f,this.key=n,this.value=r,this.active=i,this.visuallyDisabled=l,this.reason=s,this.desc=o,this.hidden=u,this.canClear=h}match(t={}){return this.name===t.name&&Wr(this.url,t.url)&&Wr(this.addUrl,t.addUrl)&&this.key===t.key&&Wr(this.value,t.value)&&this.active===t.active&&this.visuallyDisabled===t.visuallyDisabled&&this.reason===t.reason&&this.desc===t.desc&&this.hidden===t.hidden&&this.canClear===t.canClear}looseMatch(t={}){return this.key===t.key&&Wr(this.value,t.value)&&this.active===t.active}}function h1(){var $,C,S,k,b,A,w;const e=ee(),[t]=xe(),[n]=gi(),r=e.type,i=t.malSearch==="true"&&e.type!=="media"?"mal":"ani",l=i==="ani"?"mal":"ani",s=[];let o=t.preventFetch==="true";const[c]=We(n("season"));if(c&&i===ll){const{api:_,flavorText:x}=((C=($=ra[i])==null?void 0:$[r])==null?void 0:C[c])||{flavorText:yn.flavorTexts[c]||c};s.push(new se({name:x,url:`season=${c}`,key:"season",value:_,active:_!==void 0,visuallyDisabled:_===void 0}))}const[u]=We(n("year"));let h=!1,f=!1,g=!1;if(c&&u&&i===ja){const{api:_,flavorText:x}=((k=(S=ra[i])==null?void 0:S[r])==null?void 0:k[c])||{flavorText:yn.flavorTexts[c]||c};s.push(new se({name:x,url:`season=${c}`,key:"season",value:u+"/"+_,active:_!==void 0,visuallyDisabled:_===void 0})),s.push(new se({name:u,url:`year=${u}`,active:!1})),g=!0}else u&&(h=!0,f=!0,i==="ani"?c&&r==="anime"?s.push(new se({name:u,url:`year=${u}`,active:!0,key:"seasonYear",value:u})):s.push(new se({name:u,url:`year=${u}`,active:!0,key:"year",value:`${u}%`})):i==="mal"&&(s.push(new se({name:u,url:`year=${u}`,active:!0,key:"start_date",value:`${u}-01-01`})),s.push(new se({hidden:!0,canClear:!1,key:"end_date",value:`${u}-12-31`}))));if(Ol(g&&i===ll,"Season disabling should only have on MAL search"),t.q&&s.push(new se({url:"q="+t.q,key:i==="ani"?"search":"q",value:t.q,name:"Search: "+t.q,active:!g,visuallyDisabled:g})),i==="ani"&&(e.type==="anime"?s.push(new se({key:"type",value:"ANIME",hidden:!0,canClear:!1})):e.type==="manga"?s.push(new se({key:"type",value:"MANGA",hidden:!0,canClear:!1})):e.type==="media"&&s.push(new se({key:"type",value:void 0,hidden:!0,canClear:!1}))),t.rating===void 0)i==="ani"?s.push(new se({key:"isAdult",value:!1,hidden:!0,canClear:!1})):i==="mal"&&s.push(new se({key:"sfw",value:!0,hidden:!0,canClear:!1}));else{const _=Wt(t.rating);if(_.any)i==="ani"?s.push(new se({name:"Any rating",url:"rating=any",key:"isAdult",value:void 0})):i==="mal"&&s.push(new se({name:"Any rating",url:"rating=any",active:!1,visuallyDisabled:g}));else{const x={g:"G - All ages",pg:"PG - Children",pg13:"PG-13",r17:"R - 17+",r:"R+",rx:"Rx - Hentai"};new Set([t.rating].flat()).forEach(E=>{E==="g"||E==="pg"||E==="pg13"||E==="r17"?s.push(new se({name:x[E],url:`rating=${E}`,key:"rating",value:E,visuallyDisabled:i==="ani"||g,active:i==="mal"&&!g})):(E==="r"||E==="rx")&&s.push(new se({name:x[E],url:`rating=${E}`,key:"rating",value:E,active:i==="mal"&&!g,visuallyDisabled:g}))}),i==="ani"&&(_.rx&&(_.g||_.pg||_.pg13||_.r17||_.r)?s.push(new se({key:"isAdult",value:void 0,hidden:!0,canClear:!1})):s.push(new se({key:"isAdult",value:_.rx===!0,hidden:!0,canClear:!1})))}}if(t.genre){const[,_,x]=[...or(t.genre)].reduce(m,["genre"]);i==="ani"?(_.length&&s.push(new se({key:"genres",value:_,hidden:!0,canClear:!1})),x.length&&s.push(new se({key:"tags",value:x,hidden:!0,canClear:!1}))):i==="mal"&&_.length&&s.push(new se({key:"genres",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}if(t.excludeGenre){const[,_,x]=[...or(t.excludeGenre)].reduce(m,["excludeGenre"]);i==="ani"?(_.length&&s.push(new se({key:"excludedGenres",value:_,hidden:!0,canClear:!1})),x.length&&s.push(new se({key:"excludeTags",value:x,hidden:!0,canClear:!1}))):i==="mal"&&_.length&&s.push(new se({key:"genres_exclude",value:_.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}function m([_,x=[],I=[]],E){let L=!1;return i==="ani"?Fn.genres===null?o=!0:Fn.tags[E]?I.push(E):Fn.genres[E]?x.push(E):L=!0:i==="mal"&&(Fn[r]===null?o=!0:Number.isInteger(Fn[r][E])?x.push(Fn[r][E]):L=!0),s.push(new se({name:E,url:`${_}=${E}`,active:!1,visuallyDisabled:L||g})),[_,x,I]}const[y]=[+t.startYear].flat();y&&(f=!0,i==="ani"?s.push(new se({name:`Year greater than ${y-1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearGreater",value:parseInt(`${y-1}9999`)})):i==="mal"&&s.push(new se({name:`Year greater than ${y-1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`startYear=${y}`,key:"start_date",value:`${y}-01-01`})));const[v]=[+t.endYear].flat();v&&(h=!0,i==="ani"?s.push(new se({name:`Year lesser than ${v+1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearLesser",value:parseInt(`${v+1}0000`)})):i==="mal"&&s.push(new se({name:`Year lesser than ${v+1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`endYear=${v}`,key:"start_date",value:`${v}-12-31`}))),t.onList==="true"&&s.push(new se({name:`Show my ${r}`,active:i==="ani",visuallyDisabled:i!=="ani",url:"onList=true",key:"onList",value:!0})),t.onList==="false"&&s.push(new se({name:`Hide my ${r}`,active:i==="ani",visuallyDisabled:i!=="ani",url:"onList=false",key:"onList",value:!1}));{const _=[];or(n("format")).forEach(x=>{var R;const{api:I,flavorText:E}=((R=Hn[i][r])==null?void 0:R[x])||{},L=E||Hn.flavorTexts[x]||x;i==="ani"&&I&&_.push(I),I?g&&i===ja?s.push(new se({name:"Format: "+E,key:"filter",value:I,url:`format=${x}`})):s.push(new se({name:"Format: "+E,active:i==="mal",key:"type",value:I,url:`format=${x}`})):s.push(new se({name:"Format: "+L,active:!1,visuallyDisabled:!0,url:`format=${x}`}))}),_.length&&s.push(new se({key:"format",value:_,canClear:!1,hidden:!0}))}{const _=[];let x=!1,I=!1;or(n("order")).forEach(L=>{var le,Z,te;let R=L;if(L===Ht.ani.anime.duration.alternative_key)R="duration",s.push(new se({name:"Duration greater than 0",url:`order=${L}`,active:i==="ani",visuallyDisabled:i!=="ani",addUrl:`order=${R}`,key:"durationGreater",value:0}));else if(L===Ht.mal.anime.episodes.alternative_key)R="episodes",i==="ani"?r==="anime"?s.push(new se({name:"Episodes greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="manga"?s.push(new se({name:"Chapters greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="media"&&s.push(new se({name:"Episodes/Chapters greater than 0",url:`order=${L}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):i==="mal"&&s.push(new se({name:"Status complete",url:`order=${L}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(L===Ht.mal.manga.volumes.alternative_key)R="volumes",i==="ani"?s.push(new se({name:"Volumes greater than 0",url:`order=${L}`,addUrl:`order=${R}`,active:r==="manga"&&!g,visuallyDisabled:r!=="manga"||g,key:"volumeGreater",value:0})):i==="mal"&&s.push(new se({name:"Status complete",url:`order=${L}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(L===Ht.mal.anime.end_date.alternative_key){R="end_date";const X={name:"Only valid dates",active:!h&&!g,hidden:h,url:`order=${L}`,addUrl:`order=${R}`};i==="ani"?s.push(new se({...X,key:"endDateGreater",value:0})):i==="mal"&&s.push(new se({...X,key:"end_date",value:`${new Date().getFullYear()+100}-01-01`,visuallyDisabled:g}))}else if(L===Ht.mal.anime.start_date.alternative_key){R="start_date";const X={name:"Only valid dates",active:!f&&!g,hidden:f,url:`order=${L}`,addUrl:`order=${R}`};i==="ani"?s.push(new se({...X,key:"yearGreater",value:0})):i==="mal"&&s.push(new se({...X,key:"start_date",value:"0000-01-01",visuallyDisabled:g}))}const{api:U,flavorText:G,reverse:J}=((le=Ht[i][r])==null?void 0:le[R])||{},Y=G||((te=(Z=Ht[i==="ani"?"mal":"ani"][r])==null?void 0:Z[R])==null?void 0:te.flavorText)||Ht.flavorTexts[R]||L;i==="ani"&&U?t.sort==="ASC"?_.push(U):_.push(U+"_DESC"):i==="mal"&&J&&(I=!0);const q=[`order=${L}`];t.sort&&q.push(`sort=${t.sort}`),U?(x||(x=i==="mal"),s.push(new se({name:"Sort: "+G,active:i==="mal"&&!g,visuallyDisabled:g,key:"order_by",value:U,url:q}))):s.push(new se({name:"Sort: "+Y,active:!1,visuallyDisabled:!0,url:q}))}),F(_.length===0||i==="ani","validAniOrder should not have anilist orders when engine is mal"),F(x===!1||i==="mal","validMalOrder should be false if engine is ani"),i==="ani"?_.length?s.push(new se({key:"sort",value:_,canClear:!1,hidden:!0})):t.q?s.push(new se({key:"sort",value:"SEARCH_MATCH",canClear:!1,hidden:!0})):s.push(new se({key:"sort",value:"POPULARITY_DESC",canClear:!1,hidden:!0})):i==="mal"&&(!x&&!t.q&&(I=!0,s.push(new se({key:"order_by",value:"popularity",canClear:!1,hidden:!0,active:!g,visuallyDisabled:g}))),I?s.push(new se({key:"sort",value:t.sort==="ASC"?"desc":"asc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})):s.push(new se({key:"sort",value:t.sort==="ASC"?"asc":"desc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})))}if(n("status")){const[_]=We(n("status")),{api:x,flavorText:I}=((b=yn[i][r])==null?void 0:b[_])||{flavorText:((w=(A=yn[l][r])==null?void 0:A[_])==null?void 0:w.flavorText)||yn.flavorTexts[_]||_};s.push(new se({name:I,active:!!x,visuallyDisabled:!x,key:"status",value:x,url:`status=${_}`}))}if(n("country")){const[_]=We(n("country")),{flavorText:x}=wc[_]||{flavorText:_};s.push(new se({name:x,active:i==="ani",visuallyDisabled:i!=="ani",key:"countryOfOrigin",value:_,url:`country=${_}`}))}if(t.source){const[_]=We(t.source),{api:x,flavorText:I}=Nl[_]||{flavorText:_};s.push(new se({name:I,active:i==="ani",visuallyDisabled:i!=="ani",key:"source",value:x,url:`source=${_}`}))}if(t.license!==void 0){const _=t.license==="true";s.push(new se({name:_?"Licensed":"Unlicensed",active:i==="ani",visuallyDisabled:i!=="ani",key:"isLicensed",value:_,url:`license=${_}`}))}if(t.externalSource!==void 0){const _=We(t.externalSource).map(Number);_.forEach(x=>{s.push(new se({name:g1[x]||x,active:!1,visuallyDisabled:i!=="ani",url:`externalSource=${x}`}))}),s.push(new se({active:i==="ani",hidden:!0,canClear:!1,key:"licensedBy",value:_}))}if(t.episodeGreater!==void 0){const[_]=We(t.episodeGreater).map(Number),x={active:i==="ani",visuallyDisabled:i!=="ani",key:"episodeGreater",value:Math.max(_+1,0),url:`episodeGreater=${_}`};r==="manga"?s.push(new se({name:`Chapters greater than ${_}`,...x})):r==="anime"?s.push(new se({name:`Episodes greater than ${_}`,...x})):r==="media"&&s.push(new se({name:`Episode/Chapters greater than ${_}`,...x}))}if(t.episodeLesser!==void 0){const[_]=We(t.episodeLesser).map(Number),x={active:i==="ani",visuallyDisabled:i!=="ani",key:"episodeLesser",value:Math.max(_,0),url:`episodeLesser=${_}`};r==="manga"?s.push(new se({name:`Chapters lesser than ${_}`,...x})):r==="anime"?s.push(new se({name:`Episodes lesser than ${_}`,...x})):r==="media"&&s.push(new se({name:`Episode/Chapters lesser than ${_}`,...x}))}if(t.rank){const[_]=We(t.rank);s.push(new se({name:`Tags above ${_}%`,url:`rank=${_}`,key:"minimumTagRank",value:_,active:i==="ani",visuallyDisabled:i!=="ani"}))}return[r,i,s,o]}const[Fn,po]=Ye({anime:null,manga:null,genres:null,tags:null}),[g1,f1]=Ye({});function m1(e){gn();const t=Mv(),n=ee(),[r,i]=xe(),[l,s]=O(),[o,c]=O(),[u,h]=O(),[f,g]=O(),[m,y]=O(),[v,$]=O(),[C]=oe.anilist.genresAndTags(()=>r.malSearch!=="true"||void 0),[S]=oe.anilist.externalSources(()=>r.malSearch!=="true"||n.type==="media"?null:n.type==="anime"||n.type==="manga"?n.type.toUpperCase():void 0),[k]=oe.myAnimeList.genresAndThemes(()=>r.malSearch==="true"&&(n.type==="anime"||n.type==="manga")?n.type:void 0),b=tn(i,300);An(tn,i,100);const A=An(tn,(w,_,x)=>{Ge(()=>{g(w),y(_),$(I=>{const E=(I==null?void 0:I.filter(R=>R.active))||[],L=x.filter(R=>R.active);return E.length===L.length&&E.every((R,U)=>R.looseMatch(L[U]))?I:x})})},300);return W(ce(k,w=>{w&&po(w.data.translations)})),W(ce(C,w=>{w&&po({genres:Wt(w.data.genres),tags:w.data.tags.reduce((_,x)=>(_[x.name]=x,_),{})})})),W(ce(S,w=>{w&&f1(w.data.reduce((_,x)=>(_[x.id]=x.site,_),{}))})),W(()=>{const[w,_,x,I]=h1();I||Ge(()=>{s(w),c(_),h(E=>(E==null?void 0:E.length)===x.length&&x.every((L,R)=>L.match(E[R]))?E:x),A(w,_,x)})}),(()=>{var w=a1(),_=w.firstChild,x=_.firstChild,I=x.nextSibling,E=_.nextSibling,L=E.firstChild,R=L.nextSibling;R.firstChild;var U=R.nextSibling,G=U.firstChild,J=G.nextSibling;J.firstChild;var Y=J.nextSibling,q=Y.nextSibling,le=q.nextSibling;le.firstChild;var Z=U.nextSibling,te=Z.firstChild,X=te.nextSibling,pe=X.nextSibling,$e=pe.nextSibling;return d(x,()=>qe(n.mode)),I.addEventListener("change",he=>t(he.target.value)),L.$$input=he=>{b({q:he.target.value})},d(R,a(Cv,{get disabled(){return n.type==="media"},name:"malSearch",get checked(){return r.malSearch==="true"&&n.type!=="media"},onInput:he=>{i({malSearch:he.target.checked||void 0})}}),null),G.$$input=he=>{i({onList:he.target.checked?!1:void 0})},d(J,()=>n.type,null),q.$$input=he=>{i({onList:he.target.checked||void 0})},d(le,()=>n.type,null),te.$$input=he=>{i({license:he.target.checked||void 0})},$e.$$input=he=>{i({license:he.target.checked?!1:void 0})},d(E,a(kv,{}),null),d(E,a(Ev,{aniGenres:C,malGenres:k,translation:Fn,get engine(){return o()},showAdult:!0}),null),d(E,a(Yv,{}),null),d(E,a(Kv,{}),null),d(E,a(e$,{}),null),d(E,a(i$,{}),null),d(E,a(d$,{}),null),d(E,a(m$,{}),null),d(E,a(x$,{}),null),d(E,a(w$,{sources:S}),null),d(E,a(Md,{min:0,max:500,separation:1,get minValue(){return+r.episodeGreater||0},get maxValue(){return+r.episodeLesser||500},onChange:([he,ne])=>i({episodeLesser:ne,episodeGreater:he})}),null),d(E,a(T,{get when(){return n.type==="anime"},get children(){var he=r1();return d(he,a(B,{get href(){return"/search/anime/tba"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return e1()}}),null),d(he,a(B,{get href(){return"/search/anime/this-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return t1()}}),null),d(he,a(B,{get href(){return"/search/anime/next-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return n1()}}),null),he}}),null),d(w,a(gc.Provider,{value:{searchType:l,searchEngine:o,searchVariables:u,debouncedSearchType:f,debouncedSearchEngine:m,debouncedSearchVariables:v},get children(){return e.children}}),null),P(()=>V(L,"placeholder","Search "+(n.type||"All"))),P(()=>I.value=n.type),P(()=>L.value=r.q||""),P(()=>G.checked=r.onList==="false"),P(()=>q.checked=r.onList==="true"),P(()=>te.checked=r.license==="true"),P(()=>$e.checked=r.license==="false"),w})()}function p1(e){const t=ee(),[n]=xe(),[r,i]=gi(),{debouncedSearchEngine:l,debouncedSearchType:s,searchVariables:o,debouncedSearchVariables:c}=Ll(),u=gn();return[a(z,{get children(){return a(M,{get when(){var h;return((h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){var h=i1(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild;return g.$$click=()=>{const v=sr(Vt(r("season")),+Vt(r("year")),-1);i({year:v.year,season:v.season.toLowerCase()})},d(h,a(H,{each:["winter","spring","summer","fall"],children:v=>(()=>{var $=c1(),C=$.firstChild,S=C.firstChild,k=S.nextSibling;return C.$$click=()=>i({season:v,year:+Vt(r("year"))}),d(S,()=>qe(v)),d(k,()=>Vt(r("year"))),P(()=>$.classList.toggle("selected",v===Vt(r("season")))),$})()}),m),y.$$click=()=>{const v=sr(Vt(r("season")),+Vt(r("year")),1);i({year:v.year,season:v.season.toLowerCase()})},h}})}}),a(z,{get children(){return[a(M,{get when(){var h;return(h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/)},get children(){var h=l1(),f=h.firstChild;return d(h,()=>qe(t.header.split("-")[0]),f),d(h,()=>t.header.split("-")[1],null),h}}),a(M,{get when(){return t.header==="this-season"},get children(){var h=Hi();return d(h,a(T,{get when(){return n.season||n.year},fallback:"Current season",get children(){return[N(()=>qe(Vt(r("season"))))," ",N(()=>Vt(r("year")))]}})),h}}),a(M,{get when(){return t.header==="next-season"},get children(){var h=Hi();return d(h,a(T,{get when(){return n.season||n.year},fallback:"Next season",get children(){return[N(()=>qe(Vt(r("season"))))," ",N(()=>Vt(r("year")))]}})),h}}),a(M,{get when(){return t.header==="tba"},get children(){return s1()}}),a(M,{get when(){return t.header},get children(){var h=Hi();return d(h,()=>t.header),h}})]}}),N(()=>e.children),a(T,{get when(){var h;return(h=o())==null?void 0:h.filter(f=>!f.hidden)},children:h=>a(T,{get when(){return h().length},get children(){return["Tags:",(()=>{var f=d1(),g=f.firstChild,m=g.firstChild;return d(f,a(H,{get each(){return h()},children:y=>a(T,{get when(){return!y.hidden},get children(){var v=u1(),$=v.firstChild;return $.$$click=()=>{const C={};We(y.url).forEach(S=>{const[k,...b]=S.split("="),A=b.join("=");C[k]=We(C[k]||n[k]).filter(w=>w!==A)}),We(y.addUrl).forEach(S=>{const[k,...b]=S.split("="),A=b.join("=");C[k]??(C[k]=We(n[k])),C[k].push(A)}),i(C)},d($,()=>y.name),P(()=>v.classList.toggle("disabled",!!y.visuallyDisabled)),v}})}),g),m.$$click=()=>{n.malSearch==="true"?u("/search/"+t.type+"?malSearch=true"):u("/search/"+t.type)},f})()]}})}),a(Yd,{get children(){var h=o1();return d(h,a(z,{get children(){return[a(M,{get when(){return l()==="ani"},get children(){return a(z,{get children(){return[a(M,{get when(){var f;return((f=t.header)==null?void 0:f.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){return[a(T,{get when(){var f;return(f=c().find(g=>g.key==="seasonYear"))==null?void 0:f.value},children:f=>a(T,{get when(){var g;return(g=c().find(m=>m.key==="season"))==null?void 0:g.value},children:g=>a(T,{get when(){return c().filter(m=>m.key==="format").length===0||c().some(m=>{var y;return m.key==="format"&&((y=m.value)==null?void 0:y.includes("TV"))})},get children(){return a(bl,{page:1,get variables(){return c()},title:"Leftovers",groupCards:!1,get extraVariables(){return{seasonYear:sr(g(),+f(),-1).year,season:sr(g(),+f(),-1).season,episodeGreater:16,format:"TV"}}})}})})}),a(bl,{page:1,get variables(){return c()},extraVariables:{sort:"FORMAT"}})]}}),a(M,{when:!0,get children(){return a(jd,{nestLevel:1,page:1,get variables(){return c()}})}})]}})}}),a(M,{get when(){return l()==="mal"},get children(){return a(z,{get children(){return[a(M,{get when(){return s()==="anime"},get children(){return a(yl,{nestLevel:1,type:"anime",page:1,get variables(){return c()}})}}),a(M,{get when(){return s()==="manga"},get children(){return a(yl,{nestLevel:1,type:"manga",page:1,get variables(){return c()}})}})]}})}})]}})),h}})]}function v1(){Dv()()}function jd(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Ll(),[r,i]=O(void 0),[l]=oe.anilist.searchMediaCache(t,n,e.page),[s]=oe.anilist.searchMedia(t,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O();return W(ce(l,u=>u&&c(u.data.media))),W(ce(s,u=>u&&c(u.data.media))),a(mn,{onIntersection:()=>i(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a(wl,{get data(){return o()}})},get loading(){return e.loading},children:u=>[a(wl,{get data(){return o()}}),a(T,{get when(){return s().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return s().data.media},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:h=>a(T,{when:u===!1,fallback:"Fetch cooldown",get children(){return a(jd,{get variables(){return h()},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function bl(e){const t=Oe({groupCards:!0},e);F(t.page,"page is missing"),F(t.extraVariables,"extraVariables is missing");const{accessToken:n}=ie(),[r,i]=O(void 0),[l]=oe.anilist.searchMedia(n,()=>t.variables,t.page,()=>t.extraVariables);return W(ce(l,s=>{s!=null&&s.data.pageInfo.hasNextPage&&i(t.variables)})),a(T,{get when(){return l()},get children(){return[a(T,{get when(){return N(()=>!!t.title)()&&l().data.media.length},get children(){var s=_l(),o=s.firstChild;return d(o,()=>t.title),s}}),a(z,{get children(){return[a(M,{get when(){return t.groupCards},get children(){return a($1,{get data(){return l().data.media},get lastFormat(){return t.previousFormat||"Unknown format"}})}}),a(M,{get when(){return t.groupCards===!1},get children(){return a(wl,{get data(){return l().data.media}})}})]}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(bl,{get variables(){return r()},get extraVariables(){return t.extraVariables},get page(){return t.page+1},get previousFormat(){var s;return((s=l().data.media.at(-1))==null?void 0:s.format)||"Unknown format"}})}})]}})}const vo=new Set;function yl(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Ll(),[r,i]=O(void 0),[l]=oe.myAnimeList.mediaSearchCache(e.type,n,e.page),[s]=oe.myAnimeList.mediaSearch(e.type,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O(),u=N(m=>{var $;const y=new Set;($=o())==null||$.forEach(C=>y.add(C.mal_id));const v=[...y.difference(vo)];return v.length?(v.forEach(C=>vo.add(C)),v):m||[]}),f=Pe(Xt,t,()=>({idMal_in:u(),type:e.type.toUpperCase()})),[g]=Qe(f);return W(ce(g,m=>{var v;if(!((v=m==null?void 0:m.data)!=null&&v.length))return;const y=Object.fromEntries(Object.values(m.data).map($=>[$.idMal,$]));Cf(y)})),W(ce(l,m=>m&&c(m.data.data))),W(ce(s,m=>m&&c(m.data.data))),a(mn,{rootMargin:"200px",onIntersection:()=>i(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a($o,{get data(){return o()}})},get loading(){return e.loading},children:m=>[a($o,{get data(){return o()}}),a(T,{get when(){return s().data.pagination.has_next_page},get children(){return a(T,{get when(){return s().data.data},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:y=>a(T,{when:m===!1,fallback:"Fetch cooldown",get children(){return a(yl,{get variables(){return y()},get type(){return e.type},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function $o(e){const t=ee();return a(H,{get each(){return e.data},children:n=>a(vl,{media:n,get type(){return t.type}})})}function $1(e){return[a(T,{get when(){return e.data[0]&&e.lastFormat!==e.data[0].format},get children(){var t=_l(),n=t.firstChild;return d(n,()=>kr(e.data[0].format)||"Unknown format"),t}}),a(H,{get each(){return e.data},children:(t,n)=>[a(T,{get when(){return N(()=>n()>0)()&&e.data[n()-1].format!==t.format},get children(){var r=_l(),i=r.firstChild;return d(i,()=>kr(t.format)),r}}),a(fi,{media:t})]})]}function wl(e){return a(H,{get each(){return e.data},children:t=>a(fi,{media:t})})}_e(["input","click"]);var _1=p("<div data-k-f58f9d48>Error user not found"),b1=p("<img data-k-f58f9d48 class=banner alt=Banner>"),y1=p("<button data-k-f58f9d48>"),w1=p("<span data-k-f58f9d48 class=user-profile-following-badge>Follows you"),k1=p("<div data-k-f58f9d48 class=user-page><div data-k-f58f9d48 class=profile-banner-container><div data-k-f58f9d48 class=user-profile-container><img data-k-f58f9d48 class=profile alt=Profile><div data-k-f58f9d48 class=content><h2 data-k-f58f9d48><a data-k-f58f9d48 target=_blank></a></h2><p data-k-f58f9d48>Joined <! data-k-f58f9d48> (<! data-k-f58f9d48> days)</p></div></div></div><nav data-k-f58f9d48 class=profile-navigation><ul data-k-f58f9d48><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48>"),S1=p("<div data-k-f58f9d48 class=banner>");function C1(e){const t=ee(),{accessToken:n}=ie(),[r,{mutateCache:i}]=oe.anilist.userByName(()=>t.name,n),l=s=>{i(o=>(o.data.isFollowing=s,r().data.isFollowing=s,o))};return W(ce(r,s=>{s&&(document.title=`${s.data.name} profile - LOB`)})),a(fc.Provider,{value:{user:()=>r().data,following:l},get children(){return a(z,{get children(){return[a(M,{get when(){return N(()=>{var s;return!!((s=r())!=null&&s.data)})()&&(!r.loading||r().data.name===t.name)},get children(){return a(A1,{get children(){return e.children}})}}),a(M,{get when(){var s;return(s=r())==null?void 0:s.error},get children(){return _1()}})]}})}})}function A1(e){const{user:t,following:n}=Ze(),{authUserData:r,accessToken:i}=ie(),[l,s]=O(t().isFollowing);return W(()=>{s(t().isFollowing)}),(()=>{var o=k1(),c=o.firstChild,u=c.firstChild,h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.firstChild,y=g.nextSibling,v=y.firstChild,$=v.nextSibling,C=$.nextSibling,S=C.nextSibling;S.nextSibling;var k=c.nextSibling,b=k.firstChild,A=b.firstChild,w=A.nextSibling,_=w.nextSibling,x=_.nextSibling,I=x.nextSibling,E=I.nextSibling;return d(c,a(T,{get when(){return t().bannerImage},get fallback(){return S1()},get children(){var L=b1();return P(()=>V(L,"src",t().bannerImage)),L}}),u),d(f,a(T,{get when(){var L;return t().id!==((L=r())==null?void 0:L.data.id)},get children(){var L=y1();return L.$$click=async()=>{s(U=>!U);const R=await oe.anilist.toggleFollow(i(),t().id);R.status===200?n(R.data.isFollowing):s(t().isFollowing)},d(L,a(T,{get when(){return l()},fallback:"Follow",children:"Following"})),L}}),g),d(m,()=>t().name),d(g,a(T,{get when(){return t().isFollower},get children(){return w1()}}),null),d(y,()=>od(t().createdAt*1e3),$),d(y,()=>Math.floor((new Date-t().createdAt*1e3)/1e3/60/60/24),S),d(A,a(B,{href:"",children:"Overview"})),d(w,a(B,{href:"anime",children:"Anime list"})),d(_,a(B,{href:"manga",children:"Manga list"})),d(x,a(B,{href:"favourites",children:"Favourites"})),d(I,a(B,{href:"stats",children:"Stats"})),d(E,a(B,{href:"socials",children:"Socials"})),d(o,()=>e.children,null),P(L=>{var R=t().options.profileColor,U=t().avatar.large,G="https://anilist.co/user/"+t().name;return R!==L.e&&((L.e=R)!=null?o.style.setProperty("--user-color",R):o.style.removeProperty("--user-color")),U!==L.t&&V(h,"src",L.t=U),G!==L.a&&V(m,"href",L.a=G),L},{e:void 0,t:void 0,a:void 0}),o})()}_e(["click"]);var x1=p("<p data-k-fa035f06 class=time>");function Yi(e){const t=ee();return(()=>{var n=x1();return d(n,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[a(T,{get when(){return Math.floor(e.stats.minutesWatched/60/24)},children:r=>[N(()=>ye(r()))," day",N(()=>Ne(r()))," "]}),a(T,{get when(){return Math.floor(e.stats.minutesWatched/60%24)},children:r=>[N(()=>ye(r()))," hour",N(()=>Ne(r()))," "]}),a(T,{get when(){return e.stats.minutesWatched<60},get children(){return[N(()=>e.stats.minutesWatched)," minute",N(()=>Ne(e.stats.minutesWatched))]}})]}}),a(M,{get when(){return t.type==="manga"},get children(){return["Chapters read ",N(()=>ye(e.stats.chaptersRead))]}})]}})),n})()}var T1=p("<section data-k-9dc7c2b9 class=user-profile-stats-formats><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Format distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Status distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Country distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler>"),ji=p("<li data-k-9dc7c2b9><div data-k-9dc7c2b9><div data-k-9dc7c2b9 class=container><p data-k-9dc7c2b9></p></div></div><div data-k-9dc7c2b9 class=right><p data-k-9dc7c2b9>%</p><p data-k-9dc7c2b9>/");function I1(e){const[t,n]=O(),r=ee(),{user:i}=Ze();return W(()=>{n(e.formats.reduce((l,s)=>l+s.count,0))}),(()=>{var l=T1(),s=l.firstChild,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=h.nextSibling,g=u.nextSibling,m=g.firstChild,y=m.nextSibling;return d(c,a(H,{get each(){return e.formats},children:v=>(()=>{var $=ji(),C=$.firstChild,S=C.firstChild,k=S.firstChild,b=C.nextSibling,A=b.firstChild,w=A.firstChild,_=A.nextSibling,x=_.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"/?format="+v.format},get children(){return kr(v.format)}}),k),d(k,()=>v.meanScore||""),d(C,a(Yi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d(_,()=>ye(v.count),x),d(_,t,null),$})()})),d(f,a(H,{get each(){return e.statuses},children:v=>(()=>{var $=ji(),C=$.firstChild,S=C.firstChild,k=S.firstChild,b=C.nextSibling,A=b.firstChild,w=A.firstChild,_=A.nextSibling,x=_.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"?userStatus="+v.status},get children(){return a(z,{get fallback(){return qe(v.status)},get children(){return[a(M,{get when(){return v.status==="CURRENT"},get children(){return a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})}}),a(M,{get when(){return v.status==="REPEATING"},get children(){return a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})}})]}})}}),k),d(k,()=>v.meanScore||""),d(C,a(Yi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d(_,()=>ye(v.count),x),d(_,t,null),$})()})),d(y,a(H,{get each(){return e.countries},children:v=>(()=>{var $=ji(),C=$.firstChild,S=C.firstChild,k=S.firstChild,b=C.nextSibling,A=b.firstChild,w=A.firstChild,_=A.nextSibling,x=_.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"?countryOfOrigin="+v.country},get children(){return Lf(v.country)}}),k),d(k,()=>v.meanScore||""),d(C,a(Yi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d(_,()=>ye(v.count),x),d(_,t,null),$})()})),l})()}var E1=p("<div data-k-9dd95ab0 class=scroll-line-chart>"),L1=p("<div data-k-9dd95ab0 class=scroll-bar-chart>");function P1(e){let t=0,n=0,r=NaN,i;return(()=>{var l=E1();l.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,i.style.userSelect="none",i.scrollTo(n-c,0)}else{i.style.userSelect=null,t=o.clientX,n=i.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(i.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var s=i;return typeof s=="function"?fe(s,l):i=l,d(l,()=>e.children),l})()}function zd(e){let t=0,n=0,r=NaN,i;return(()=>{var l=L1();l.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,i.style.userSelect="none",i.scrollTo(n-c,0)}else{i.style.userSelect=null,t=o.clientX,n=i.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(i.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var s=i;return typeof s=="function"?fe(s,l):i=l,d(l,()=>e.children),l})()}_e(["mousemove"]);var M1=p("<button data-k-3e65cd93>Hours Watched"),D1=p("<button data-k-3e65cd93>Chapters Read"),R1=p("<ol data-k-3e65cd93>"),N1=p("<section data-k-3e65cd93><div data-k-3e65cd93 class=flex-space-between><h2 data-k-3e65cd93>Score distributions</h2><div data-k-3e65cd93><button data-k-3e65cd93>"),O1=p("<li data-k-3e65cd93><p data-k-3e65cd93></p><div data-k-3e65cd93></div><p data-k-3e65cd93>");function F1(e){const t=ee(),[n,r]=O("count"),[i,l]=O(0);return W(()=>{const s=e.data.reduce((o,c)=>Math.max(o,c[n()]),0);l(s)}),(()=>{var s=N1(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=u.firstChild;return h.$$click=()=>r("count"),d(h,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(u,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var f=M1();return f.$$click=()=>r("minutesWatched"),f}}),a(M,{get when(){return t.type==="manga"},get children(){var f=D1();return f.$$click=()=>r("chaptersRead"),f}})]}}),null),d(s,a(zd,{get children(){var f=R1();return d(f,a(H,{get each(){return e.data},children:g=>(()=>{var m=O1(),y=m.firstChild,v=y.nextSibling,$=v.nextSibling;return d(y,()=>g.score),d($,a(T,{get when(){return n()==="minutesWatched"},get fallback(){return ye(g[n()])},get children(){return ye(Math.ceil(g[n()]/60))}})),P(C=>(C=`${g[n()]/i()*85}%`)!=null?v.style.setProperty("height",C):v.style.removeProperty("height")),m})()})),f}}),null),s})()}_e(["click"]);var U1=p("<button data-k-d05f0288>Hours Watched"),B1=p("<button data-k-d05f0288>Chapters Read"),V1=p("<div data-k-d05f0288><button data-k-d05f0288></button><button data-k-d05f0288>Mean Score");function Ir(e){const t=ee();return(()=>{var n=V1(),r=n.firstChild,i=r.nextSibling;return r.$$click=()=>e.setState("count"),d(r,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(n,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var l=U1();return l.$$click=()=>e.setState("minutesWatched"),l}}),a(M,{get when(){return t.type==="manga"},get children(){var l=B1();return l.$$click=()=>e.setState("chaptersRead"),l}})]}}),i),i.$$click=()=>e.setState("meanScore"),n})()}_e(["click"]);var G1=p("<ol data-k-614cd53d>"),H1=p("<section data-k-614cd53d><div data-k-614cd53d class=flex-space-between><h2 data-k-614cd53d>Episode count"),Y1=p("<li data-k-614cd53d><p data-k-614cd53d class=no-wrap></p><div data-k-614cd53d></div><p data-k-614cd53d>");function j1(e){ee();const[t,n]=O("count"),[r,i]=O(0);return W(()=>{const l=e.data.reduce((s,o)=>Math.max(s,o[t()]),0);i(l)}),(()=>{var l=H1(),s=l.firstChild;return s.firstChild,d(s,a(Ir,{setState:n}),null),d(l,a(zd,{get children(){var o=G1();return d(o,a(H,{get each(){return e.data},children:c=>(()=>{var u=Y1(),h=u.firstChild,f=h.nextSibling,g=f.nextSibling;return d(h,()=>c.length||"Unknown"),d(g,a(T,{get when(){return t()==="minutesWatched"},get fallback(){return ye(c[t()])},get children(){return ye(Math.ceil(c[t()]/60))}})),P(m=>(m=`${c[t()]/r()*85}%`)!=null?f.style.setProperty("height",m):f.style.removeProperty("height")),u})()})),o}}),null),l})()}function z1(e){var i;const[t,n]=O(((i=e())==null?void 0:i.getBoundingClientRect().width)||0),r=()=>{var l;n(((l=e())==null?void 0:l.getBoundingClientRect().width)||0)};return W(ce(e,r)),window.addEventListener("resize",r),He(()=>{window.removeEventListener("resize",r)}),t}var W1=p("<svg data-k-ecb119dc><path data-k-ecb119dc stroke=none stroke-width=0 fill=var(--background-350)></path><rect data-k-ecb119dc x=0 width=100% height=60 fill=var(--background-300) stroke=none pointer-events=all></rect><path data-k-ecb119dc stroke=black stroke-width=5 fill=transparent>"),q1=p("<section data-k-ecb119dc class=no-motion><div data-k-ecb119dc class=flex-space-between><h2 data-k-ecb119dc>"),K1=p("<svg data-k-ecb119dc><g data-k-ecb119dc class=item><rect data-k-ecb119dc y=0 height=100% fill=none stroke=none pointer-events=all></rect><circle data-k-ecb119dc r=6 pointer-events=none></circle><text data-k-ecb119dc fill=currentColor class=text y=0 text-anchor=middle></text><text data-k-ecb119dc fill=currentColor class=year y=304 text-anchor=middle></svg>",!1,!0,!1);function _o(e){let t;ee();const[n,r]=O(0),i=z1(()=>t),[l,s]=O("count"),o=32,c=64,u=60,h=()=>Math.max(50,i()/e.data.length),f=v=>o+v*h(),g=v=>Math.ceil((1-v/n())*200+c);W(()=>{const v=e.data.reduce(($,C)=>Math.max($,C[l()]),0);r(v)}),W(ce(i,()=>{t==null||t.classList.add("no-motion"),setTimeout(()=>{t==null||t.classList.remove("no-motion")},100)}));const m=N(()=>e.data.map(($,C,S)=>C===0?"M"+f(C)+" "+g($[l()]):C<S.length-1?"S"+wa(f(C),f(C-1),.35)+" "+wa(g($[l()]),g($[l()])+(g(S[C-1][l()])-g(S[C+1][l()]))/2,.35)+","+f(C)+" "+g($[l()]):"S"+wa(f(C),f(C-1),.35)+" "+wa(g($[l()]),g(S[C-1][l()]),.35)+","+f(C)+" "+g($[l()])).join("")),y=N(()=>m()+"L"+f(e.data.length-1)+" "+g(0)+u+"L"+o+" "+g(0)+u);return a(T,{get when(){return e.data.length},get children(){var v=q1(),$=v.firstChild,C=$.firstChild,S=t;return typeof S=="function"?fe(S,v):t=v,d(C,()=>e.heading),d($,a(Ir,{setState:s}),null),d(v,a(P1,{get children(){var k=W1(),b=k.firstChild,A=b.nextSibling,w=A.nextSibling;return d(k,a(H,{get each(){return e.data},children:(_,x)=>(()=>{var I=K1(),E=I.firstChild,L=E.nextSibling,R=L.nextSibling,U=R.nextSibling;return d(R,a(T,{get when(){return l()==="minutesWatched"},get fallback(){return ye(_[l()])},get children(){return ye(Math.ceil(_[l()]/60))}})),d(U,()=>_.releaseYear||_.startYear),P(G=>{var J=f(x())-h()/2,Y=h(),q=f(x()),le=g(_[l()]),Z=f(x()),te=`0 ${g(_[l()])-10}px`,X=f(x());return J!==G.e&&V(E,"x",G.e=J),Y!==G.t&&V(E,"width",G.t=Y),q!==G.a&&V(L,"cx",G.a=q),le!==G.o&&V(L,"cy",G.o=le),Z!==G.i&&V(R,"x",G.i=Z),te!==G.n&&((G.n=te)!=null?R.style.setProperty("translate",te):R.style.removeProperty("translate")),X!==G.s&&V(U,"x",G.s=X),G},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),I})()}),null),P(_=>{var x=f(e.data.length-1)+o,I=g(0)+u,E=y(),L=g(0),R=m();return x!==_.e&&V(k,"width",_.e=x),I!==_.t&&V(k,"height",_.t=I),E!==_.a&&V(b,"d",_.a=E),L!==_.o&&V(A,"y",_.o=L),R!==_.i&&V(w,"d",_.i=R),_},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),k}}),null),v}})}var J1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"><path data-k-c7f2c6bd fill=currentColor d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z">'),X1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">'),Z1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">'),Q1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z">'),e_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">'),t_=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path data-k-c7f2c6bd fill=currentColor d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">'),n_=p('<section data-k-c7f2c6bd class=user-profile-stats-header-section><ul data-k-c7f2c6bd class=user-profile-stats-general-header><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Total </p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Mean score</p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Standard Deviation');function r_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeStats(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Wd,{get stats(){return n().data}})}})}function a_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userMangaStats(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Wd,{get stats(){return n().data}})}})}function Wd(e){const t=ee(),{user:n}=Ze();return[(()=>{var r=n_(),i=r.firstChild,l=i.firstChild,s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling;u.firstChild;var h=l.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.nextSibling,v=h.nextSibling,$=v.firstChild,C=$.nextSibling,S=C.firstChild,k=S.nextSibling,b=v.nextSibling,A=b.firstChild,w=A.nextSibling,_=w.firstChild,x=_.nextSibling,I=b.nextSibling,E=I.firstChild,L=E.nextSibling,R=L.firstChild,U=I.nextSibling,G=U.firstChild,J=G.nextSibling,Y=J.firstChild;return d(s,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return J1()}}),a(M,{get when(){return t.type==="manga"},get children(){return X1()}})]}})),d(c,()=>ye(n().statistics[t.type].count||0)),d(u,()=>t.type,null),d(f,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return Z1()}}),a(M,{get when(){return t.type==="manga"},get children(){return Q1()}})]}})),d(m,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return ye(n().statistics.anime.episodesWatched||0)}}),a(M,{get when(){return t.type==="manga"},get children(){return ye(n().statistics.manga.chaptersRead||0)}})]}})),d(y,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Episodes watched"}),a(M,{get when(){return t.type==="manga"},children:"Chapters read"})]}})),d($,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return e_()}}),a(M,{get when(){return t.type==="manga"},get children(){return t_()}})]}})),d(S,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return((n().statistics.anime.minutesWatched||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){return n().statistics.manga.volumesRead||0}})]}})),d(k,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days watched"}),a(M,{get when(){return t.type==="manga"},children:"Volumes read"})]}})),d(_,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var q;return((((q=e.stats.statuses.find(le=>le.status==="PLANNING"))==null?void 0:q.minutesWatched)||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){var q;return((q=e.stats.statuses.find(le=>le.status==="PLANNING"))==null?void 0:q.chaptersRead)||0}})]}})),d(x,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days planned"}),a(M,{get when(){return t.type==="manga"},children:"Chapters planned"})]}})),d(R,()=>(n().statistics[t.type].meanScore||0).toFixed(2)),d(Y,()=>(n().statistics[t.type].standardDeviation||0).toFixed(1)),r})(),a(F1,{get data(){return e.stats.scores.sort((r,i)=>r.score-i.score)}}),a(j1,{get data(){return e.stats.lengths.sort((r,i)=>(parseInt(r.length)||1/0)-(parseInt(i.length)||1/0))}}),a(I1,{get formats(){return e.stats.formats},get statuses(){return e.stats.statuses},get countries(){return e.stats.countries}}),a(_o,{heading:"Release year",get data(){return e.stats.releaseYears.sort((r,i)=>r.releaseYear-i.releaseYear)}}),a(_o,{heading:"Watch year",get data(){return e.stats.startYears.sort((r,i)=>r.startYear-i.startYear)}})]}var bo=p("<p data-k-3a6faa9d class=value>"),i_=p("<p data-k-3a6faa9d class=title>Time watched"),l_=p("<p data-k-3a6faa9d class=title>Chapters read"),s_=p("<ol data-k-3a6faa9d class=flex-space-between><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Count</p></li><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Mean score</p></li><li data-k-3a6faa9d>");function o_(e){const t=ee();return(()=>{var n=s_(),r=n.firstChild,i=r.firstChild,l=r.nextSibling,s=l.firstChild,o=l.nextSibling;return d(i,()=>ye(e.genre.count||0)),d(s,()=>e.genre.meanScore||0),d(o,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var c=bo();return d(c,a(T,{get when(){return Math.floor(e.genre.minutesWatched/60/24)},children:u=>[N(()=>ye(u()))," day",N(()=>Ne(u()))," "]}),null),d(c,a(T,{get when(){return Math.floor(e.genre.minutesWatched/60%24)},children:u=>[N(()=>ye(u()))," hour",N(()=>Ne(u()))," "]}),null),d(c,a(T,{get when(){return e.genre.minutesWatched<60},get children(){return[N(()=>e.genre.minutesWatched)," minute",N(()=>Ne(e.genre.minutesWatched))]}}),null),c})(),i_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var c=bo();return d(c,()=>ye(e.genre.chaptersRead)),c})(),l_()]}})]}})),n})()}var c_=p("<div data-k-ac00d55b class=inline-container><ol data-k-ac00d55b class=grid-reel-auto-fill>"),d_=p('<img data-k-ac00d55b class=cover-image alt="Media cover">'),u_=p("<li data-k-ac00d55b>"),h_=p("<div data-k-ac00d55b class=cover-image>");function g_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Xt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(ce(()=>e.mediaIds,()=>{c=!0})),W(ce(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=c_(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=u_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return h_()},get children(){var m=d_();return P(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var f_=p("<ol data-k-28186292 class=grid-column-auto-fill>"),m_=p("<li data-k-28186292 class=item><div data-k-28186292 class=header><div data-k-28186292 class=flex-space-between><h2 data-k-28186292></h2><p data-k-28186292 class=ranking>#</p></div></div><div data-k-28186292 class=wrapper><div data-k-28186292 class=flex-space-between><p data-k-28186292>User ");function p_(e){const t=ee(),{user:n}=Ze();return(()=>{var r=f_();return d(r,a(H,{get each(){return e.genres.sort((i,l)=>l[e.state()]-i[e.state()]||i.genre.localeCompare(l.genre))},children:(i,l)=>(()=>{var s=m_(),o=s.firstChild,c=o.firstChild,u=c.firstChild,h=u.nextSibling;h.firstChild;var f=o.nextSibling,g=f.firstChild,m=g.firstChild;return m.firstChild,d(u,a(B,{get href(){return"/search/"+t.type+"?onList=false&genre="+i.genre},get children(){return i.genre}})),d(h,()=>l()+1,null),d(o,a(o_,{genre:i}),null),d(m,()=>t.type,null),d(g,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?genre="+i.genre},children:"Show all"}),null),d(f,a(g_,{get store(){return e.store},get setStore(){return e.setStore},get mediaIds(){return i.mediaIds},get allMediaIds(){return e.mediaIds()},get mutate(){return e.mutate}}),null),s})()})),r})()}var v_=p("<section data-k-c1e76fe3 class=user-profile-stats-genres><div data-k-c1e76fe3 class=flex-space-between><h2 data-k-c1e76fe3>Genres");function $_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeGenres(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(qd,{get genres(){return n().data}})}})}function __(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userMangaGenres(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(qd,{get genres(){return n().data}})}})}function qd(e){const{accessToken:t}=ie(),[n,r]=O(new Set),[i,l]=O("count"),o=Pe(Xt,t,()=>({id_in:[...n()]})),[c,{mutate:u}]=Qe(o),[h,f]=Ye({});return W(ce(()=>e.genres,g=>{r(m=>{const y=new Set(g.map(v=>v.mediaIds.slice(0,6)).flat());return y.difference(m).size?y:m})})),W(ce(c,g=>{g==null||g.data.forEach(m=>f(m.id,m))})),(()=>{var g=v_(),m=g.firstChild;return m.firstChild,d(m,a(Ir,{setState:l}),null),d(g,a(p_,{get genres(){return e.genres},state:i,store:h,setStore:f,mediaIds:n,mutate:u}),null),g})()}var b_=p("<section data-k-c5aa48c0 class=user-profile-stats-genres><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0>Tags</h2></div><ol data-k-c5aa48c0 class=grid-column-auto-fill>"),yo=p("<p data-k-c5aa48c0 class=value>"),y_=p("<p data-k-c5aa48c0 class=title>Time watched"),w_=p("<p data-k-c5aa48c0 class=title>Chapters read"),k_=p('<li data-k-c5aa48c0 class=item><div data-k-c5aa48c0 class=header><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0></h2><p data-k-c5aa48c0 class=ranking>#</p></div><ol data-k-c5aa48c0 class=flex-space-between><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Count</p></li><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Mean score</p></li><li data-k-c5aa48c0></li></ol></div><div data-k-c5aa48c0 class="wrapper tags"><div data-k-c5aa48c0 class=flex-space-between><p data-k-c5aa48c0>User '),S_=p("<div data-k-c5aa48c0 class=inline-container><ol data-k-c5aa48c0 class=grid-reel-auto-fill>"),C_=p('<img data-k-c5aa48c0 class=cover-image alt="Media cover">'),A_=p("<li data-k-c5aa48c0>"),x_=p("<div data-k-c5aa48c0 class=cover-image> ");function T_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeTags(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Kd,{get genres(){return n().data}})}})}function I_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userMangaTags(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Kd,{get genres(){return n().data}})}})}function Kd(e){const t=ee(),{user:n}=Ze(),{accessToken:r}=ie(),[i,l]=O(new Set),[s,o]=O("count"),c=Pe(Xt,r,()=>({id_in:[...i()]})),[u,{mutate:h}]=Qe(c),[f,g]=Ye({});return W(ce(()=>e.genres,m=>{l(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(ce(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=b_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Ir,{setState:o}),null),d(v,a(H,{get each(){return e.genres.sort(($,C)=>C[s()]-$[s()]||$.tag.name.localeCompare(C.tag.name))},children:($,C)=>(()=>{var S=k_(),k=S.firstChild,b=k.firstChild,A=b.firstChild,w=A.nextSibling;w.firstChild;var _=b.nextSibling,x=_.firstChild,I=x.firstChild,E=x.nextSibling,L=E.firstChild,R=E.nextSibling,U=k.nextSibling,G=U.firstChild,J=G.firstChild;return J.firstChild,d(A,a(B,{get href(){return"/search/"+t.type+"?onList=false&tag="+$.tag.name},get children(){return $.tag.name}})),d(w,()=>C()+1,null),d(I,()=>ye($.count||0)),d(L,()=>$.meanScore||0),d(R,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Y=yo();return d(Y,a(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:q=>[N(()=>ye(q()))," day",N(()=>Ne(q()))," "]}),null),d(Y,a(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:q=>[N(()=>ye(q()))," hour",N(()=>Ne(q()))," "]}),null),d(Y,a(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),Y})(),y_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Y=yo();return d(Y,()=>ye($.chaptersRead)),Y})(),w_()]}})]}})),d(J,()=>t.type,null),d(G,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?tag="+$.tag.name},children:"Show all"}),null),d(U,a(E_,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return i()},mutate:h}),null),S})()})),m})()}function E_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),l=Pe(Xt,n,()=>({id_in:[...r()]})),[s]=Qe(l);let o=!1;return W(ce(()=>e.mediaIds,()=>{o=!0})),W(ce(s,c=>{c==null||c.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var c=S_(),u=c.firstChild;return u.addEventListener("scroll",()=>{if(!o)return;o=!1;const f=new Set(e.mediaIds).difference(e.allMediaIds);f.forEach(g=>e.allMediaIds.add(g)),i(f)}),d(u,a(H,{get each(){return e.mediaIds},children:h=>(()=>{var f=A_();return d(f,a(B,{get href(){var g;return"/ani/"+t.type+"/"+h+"/"+Ke(((g=e.store[h])==null?void 0:g.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[h]},get fallback(){return x_()},get children(){var g=C_();return P(()=>V(g,"src",e.store[h].coverImage.large)),g}})}})),f})()})),c})()}var L_=p("<section data-k-306b0b72 class=user-profile-stats-genres><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72>Studios</h2></div><ol data-k-306b0b72 class=grid-column-auto-fill>"),wo=p("<p data-k-306b0b72 class=value>"),P_=p("<p data-k-306b0b72 class=title>Time watched"),M_=p("<p data-k-306b0b72 class=title>Chapters read"),D_=p('<li data-k-306b0b72 class=item><div data-k-306b0b72 class=header><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72></h2><p data-k-306b0b72 class=ranking>#</p></div><ol data-k-306b0b72 class=flex-space-between><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Count</p></li><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Mean score</p></li><li data-k-306b0b72></li></ol></div><div data-k-306b0b72 class="wrapper tags">'),R_=p("<div data-k-306b0b72 class=inline-container><ol data-k-306b0b72 class=grid-reel-auto-fill>"),N_=p('<img data-k-306b0b72 class=cover-image alt="Media cover">'),O_=p("<li data-k-306b0b72>"),F_=p("<div data-k-306b0b72 class=cover-image> ");function U_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeStudios(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(B_,{get genres(){return n().data}})}})}function B_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O("count"),c=Pe(Xt,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=Qe(c),[f,g]=Ye({});return W(ce(()=>e.genres,m=>{i(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(ce(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=L_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Ir,{setState:s}),null),d(v,a(H,{get each(){return e.genres.sort(($,C)=>C[l()]-$[l()]||$.studio.name.localeCompare(C.studio.name))},children:($,C)=>(()=>{var S=D_(),k=S.firstChild,b=k.firstChild,A=b.firstChild,w=A.nextSibling;w.firstChild;var _=b.nextSibling,x=_.firstChild,I=x.firstChild,E=x.nextSibling,L=E.firstChild,R=E.nextSibling,U=k.nextSibling;return d(A,a(B,{get href(){return"/ani/studio/"+$.studio.id+"/"+Ke($.studio.name)},get children(){return $.studio.name}})),d(w,()=>C()+1,null),d(I,()=>ye($.count||0)),d(L,()=>$.meanScore||0),d(R,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var G=wo();return d(G,a(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:J=>[N(()=>ye(J()))," day",N(()=>Ne(J()))," "]}),null),d(G,a(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:J=>[N(()=>ye(J()))," hour",N(()=>Ne(J()))," "]}),null),d(G,a(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),G})(),P_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var G=wo();return d(G,()=>ye($.chaptersRead)),G})(),M_()]}})]}})),d(U,a(V_,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:h})),S})()})),m})()}function V_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Xt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(ce(()=>e.mediaIds,()=>{c=!0})),W(ce(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=R_(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=O_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return F_()},get children(){var m=N_();return P(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var G_=p("<button data-k-8711eb31>Time Watched"),H_=p("<button data-k-8711eb31>Chapters Read"),Y_=p('<section data-k-8711eb31 class=user-profile-stats-genres><div data-k-8711eb31 class=flex-space-between><h2 data-k-8711eb31>Voice actors</h2><div data-k-8711eb31><button data-k-8711eb31>Anime</button><button data-k-8711eb31>Characters</button></div><div data-k-8711eb31><button data-k-8711eb31>Count</button><button data-k-8711eb31>Mean Score</button></div></div><ol data-k-8711eb31 class="grid-column-auto-fill staff">'),ko=p("<p data-k-8711eb31 class=value>"),j_=p("<p data-k-8711eb31 class=title>Time watched"),z_=p("<p data-k-8711eb31 class=title>Chapters read"),W_=p('<li data-k-8711eb31 class=item><div data-k-8711eb31 class="flex-space-between staff-name-wrapper"><h2 data-k-8711eb31></h2><p data-k-8711eb31 class=ranking>#</p></div><div data-k-8711eb31 class=inline-container><div data-k-8711eb31 class=main-content><img data-k-8711eb31 class=staff-cover alt="Staff profile cover"><ol data-k-8711eb31 class="flex-space-between stats"><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Count</p></li><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Mean score</p></li><li data-k-8711eb31></li></ol><div data-k-8711eb31 class=wrapper>'),q_=p("<div data-k-8711eb31 class=inline-container><ol data-k-8711eb31 class=grid-reel-auto-fill>"),K_=p('<img data-k-8711eb31 class=cover-image alt="Media cover">'),So=p("<li data-k-8711eb31>"),Co=p("<div data-k-8711eb31 class=cover-image> "),J_=p('<img data-k-8711eb31 class=cover-image alt="Character cover">');function X_(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeVoiceActors(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Z_,{get genres(){return n().data}})}})}function Z_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O(new Set),[o,c]=O("count"),[u,h]=O("media"),g=Pe(Xt,n,()=>u()==="media"?{id_in:[...r()]}:void 0),[m]=Qe(g),[y]=oe.anilist.characterIds(()=>l().size>0&&u()==="characters"?[...l()]:void 0,n),[v,$]=Ye({}),[C,S]=Ye({});return W(ce(()=>e.genres,k=>{i(b=>{const A=new Set(k.map(w=>w.mediaIds.slice(0,6)).flat());return A.difference(b).size?A:b}),s(new Set(k.map(b=>b.characterIds.slice(0,6)).flat()))})),W(ce(m,k=>{k==null||k.data.forEach(b=>$(b.id,b))})),W(ce(y,k=>{k==null||k.data.forEach(b=>S(b.id,b))})),(()=>{var k=Y_(),b=k.firstChild,A=b.firstChild,w=A.nextSibling,_=w.firstChild,x=_.nextSibling,I=w.nextSibling,E=I.firstChild,L=E.nextSibling,R=b.nextSibling;return _.$$click=()=>h("media"),x.$$click=()=>h("characters"),E.$$click=()=>c("count"),d(I,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var U=G_();return U.$$click=()=>c("minutesWatched"),U}}),a(M,{get when(){return t.type==="manga"},get children(){var U=H_();return U.$$click=()=>c("chaptersRead"),U}})]}}),L),L.$$click=()=>c("meanScore"),d(R,a(H,{get each(){return e.genres.sort((U,G)=>G[o()]-U[o()]||U.voiceActor.name.userPreferred.localeCompare(G.voiceActor.name.userPreferred))},children:(U,G)=>(()=>{var J=W_(),Y=J.firstChild,q=Y.firstChild,le=q.nextSibling;le.firstChild;var Z=Y.nextSibling,te=Z.firstChild,X=te.firstChild,pe=X.nextSibling,$e=pe.firstChild,he=$e.firstChild,ne=$e.nextSibling,j=ne.firstChild,Ue=ne.nextSibling,et=pe.nextSibling;return d(q,a(B,{get href(){return"/ani/staff/"+U.voiceActor.id+"/"+Ke(U.voiceActor.name.userPreferred)},get children(){return U.voiceActor.name.userPreferred}})),d(le,()=>G()+1,null),d(he,()=>ye(U.count||0)),d(j,()=>U.meanScore||0),d(Ue,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Re=ko();return d(Re,a(T,{get when(){return Math.floor(U.minutesWatched/60/24)},children:tt=>[N(()=>ye(tt()))," day",N(()=>Ne(tt()))," "]}),null),d(Re,a(T,{get when(){return Math.floor(U.minutesWatched/60%24)},children:tt=>[N(()=>ye(tt()))," hour",N(()=>Ne(tt()))," "]}),null),d(Re,a(T,{get when(){return U.minutesWatched<60},get children(){return[N(()=>U.minutesWatched)," minute",N(()=>Ne(U.minutesWatched))]}}),null),Re})(),j_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Re=ko();return d(Re,()=>ye(U.chaptersRead)),Re})(),z_()]}})]}})),d(et,a(Q_,{mediaStore:v,setMediaStore:$,characterStore:C,setCharacterStore:S,get pageType(){return u()},get mediaIds(){return U.mediaIds},get allMediaIds(){return r()},get characterIds(){return U.characterIds},get allCharacterIds(){return l()}})),P(()=>V(X,"src",U.voiceActor.image.large)),J})()})),k})()}function Q_(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O(new Set),c=Pe(Xt,n,()=>({id_in:[...r()]})),[u]=Qe(c),[h]=oe.anilist.characterIds(()=>l().size>0?[...l()]:void 0,n);let f,g=!1;W(()=>{e.mediaIds,e.characterIds,g=!0});let m=!1;return W(()=>{e.pageType,m=!0,g=!0,f.scrollLeft=0}),W(ce(u,y=>{y==null||y.data.forEach(v=>e.setMediaStore(v.id,v))})),W(ce(h,y=>{y==null||y.data.forEach(v=>e.setCharacterStore(v.id,v))})),(()=>{var y=q_(),v=y.firstChild;v.addEventListener("scroll",()=>{if(g){if(m){m=!1;return}if(g=!1,e.pageType==="media"){const S=new Set(e.mediaIds).difference(e.allMediaIds);S.forEach(k=>e.allMediaIds.add(k)),i(S)}else{const S=new Set(e.characterIds).difference(e.allCharacterIds);S.forEach(k=>e.allCharacterIds.add(k)),s(S)}}});var $=f;return typeof $=="function"?fe($,v):f=v,d(v,a(z,{get children(){return[a(M,{get when(){return e.pageType==="media"},get children(){return a(H,{get each(){return e.mediaIds},children:C=>(()=>{var S=So();return d(S,a(B,{get href(){var k;return"/ani/"+t.type+"/"+C+"/"+Ke(((k=e.mediaStore[C])==null?void 0:k.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.mediaStore[C]},get fallback(){return Co()},get children(){var k=K_();return P(()=>V(k,"src",e.mediaStore[C].coverImage.large)),k}})}})),S})()})}}),a(M,{get when(){return e.pageType==="characters"},get children(){return a(H,{get each(){return e.characterIds},children:C=>(()=>{var S=So();return d(S,a(B,{get href(){var k;return"/ani/character/"+C+"/"+Ke(((k=e.characterStore[C])==null?void 0:k.name.userPreferred)||"")},get children(){return a(T,{get when(){return e.characterStore[C]},get fallback(){return Co()},get children(){var k=J_();return P(()=>V(k,"src",e.characterStore[C].image.large)),k}})}})),S})()})}})]}})),y})()}_e(["click"]);var eb=p('<section data-k-63df6417 class=user-profile-stats-genres><div data-k-63df6417 class=flex-space-between><h2 data-k-63df6417>Staff</h2></div><ol data-k-63df6417 class="grid-column-auto-fill staff">'),Ao=p("<p data-k-63df6417 class=value>"),tb=p("<p data-k-63df6417 class=title>Time watched"),nb=p("<p data-k-63df6417 class=title>Chapters read"),rb=p('<li data-k-63df6417 class=item><div data-k-63df6417 class="flex-space-between staff-name-wrapper"><h2 data-k-63df6417></h2><p data-k-63df6417 class=ranking>#</p></div><div data-k-63df6417 class=inline-container><div data-k-63df6417 class=main-content><img data-k-63df6417 class=staff-cover alt="Staff profile cover"><ol data-k-63df6417 class="flex-space-between stats"><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Count</p></li><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Mean score</p></li><li data-k-63df6417></li></ol><div data-k-63df6417 class=wrapper>'),ab=p("<div data-k-63df6417 class=inline-container><ol data-k-63df6417 class=grid-reel-auto-fill>"),ib=p('<img data-k-63df6417 class=cover-image alt="Media cover">'),lb=p("<li data-k-63df6417>"),sb=p("<div data-k-63df6417 class=cover-image> ");function ob(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userAnimeStaff(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Jd,{get genres(){return n().data}})}})}function cb(){const e=ee(),{accessToken:t}=ie(),[n]=oe.anilist.userMangaStaff(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Jd,{get genres(){return n().data}})}})}function Jd(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O("count"),c=Pe(Xt,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=Qe(c),[f,g]=Ye({});return W(ce(()=>e.genres,m=>{i(y=>{const v=new Set(m.map($=>$.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(ce(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=eb(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Ir,{setState:s}),null),d(v,a(H,{get each(){return e.genres.sort(($,C)=>C[l()]-$[l()]||$.staff.name.userPreferred.localeCompare(C.staff.name.userPreferred))},children:($,C)=>(()=>{var S=rb(),k=S.firstChild,b=k.firstChild,A=b.nextSibling;A.firstChild;var w=k.nextSibling,_=w.firstChild,x=_.firstChild,I=x.nextSibling,E=I.firstChild,L=E.firstChild,R=E.nextSibling,U=R.firstChild,G=R.nextSibling,J=I.nextSibling;return d(b,a(B,{get href(){return"/ani/staff/"+$.staff.id+"/"+Ke($.staff.name.userPreferred)},get children(){return $.staff.name.userPreferred}})),d(A,()=>C()+1,null),d(L,()=>ye($.count||0)),d(U,()=>$.meanScore||0),d(G,a(z,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Y=Ao();return d(Y,a(T,{get when(){return Math.floor($.minutesWatched/60/24)},children:q=>[N(()=>ye(q()))," day",N(()=>Ne(q()))," "]}),null),d(Y,a(T,{get when(){return Math.floor($.minutesWatched/60%24)},children:q=>[N(()=>ye(q()))," hour",N(()=>Ne(q()))," "]}),null),d(Y,a(T,{get when(){return $.minutesWatched<60},get children(){return[N(()=>$.minutesWatched)," minute",N(()=>Ne($.minutesWatched))]}}),null),Y})(),tb()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Y=Ao();return d(Y,()=>ye($.chaptersRead)),Y})(),nb()]}})]}})),d(J,a(db,{store:f,setStore:g,get mediaIds(){return $.mediaIds},get allMediaIds(){return r()},mutate:h})),P(()=>V(x,"src",$.staff.image.large)),S})()})),m})()}function db(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Xt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(ce(()=>e.mediaIds,()=>{c=!0})),W(ce(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=ab(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(H,{get each(){return e.mediaIds},children:f=>(()=>{var g=lb();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return sb()},get children(){var m=ib();return P(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}const ub="_theme-container_4h5lo_1",hb="_header_4h5lo_5",gb="_details_4h5lo_11",fb="_play-button-container_4h5lo_16",mb="_play-button_4h5lo_16",pb="_spoiler_4h5lo_31",rr={themeContainer:ub,header:hb,details:gb,playButtonContainer:fb,playButton:mb,spoiler:pb};var vb=p("<video src controls autoplay>"),$b=p("<div><h2>Themes"),_b=p("<p>"),bb=p("<div><div><p>"),yb=p("<p>Spoilers"),wb=p("<div><p>v</p><p>Ep: </p><div>"),kb=p("<div><button>play</button><span></span><span></span><span>");function Sb(){const e=ee(),[t]=xe(),{anilistData:n}=fn(),r=vb(),i=Pe(df,()=>({id:e.id,api:t.isMalId!=null?ja:e.api,type:e.type})),[l]=Qe(i);return W(()=>{e.id,e.api,e.type,r.src=""}),a(at,{fallback:"AnimeThemes error",get children(){return a(T,{get when(){var s,o;return N(()=>!!l())()&&((o=(s=n())==null?void 0:s.data)==null?void 0:o.type)===tg},get children(){var s=$b();return s.firstChild,d(s,a(H,{get each(){return l().data},children:o=>a(Xd,{theme:o,video:r})}),null),d(s,r,null),s}})}})}function Xd(e){F(e.video,"Missing video element for playback"),F(e.theme,"Theme data is missing");let t=!1;return a(at,{fallback:"AnimeThemes row error",get children(){var n=bb(),r=n.firstChild,i=r.firstChild;return d(i,()=>e.theme.slug),d(r,a(T,{get when(){return e.theme.song},get children(){var l=_b();return d(l,()=>e.theme.song.title,null),d(l,a(z,{get children(){return[a(M,{get when(){return e.mainArtist},get children(){return a(T,{get when(){var s;return((s=e.theme.song.artists)==null?void 0:s.length)>1},children:" feat "})}}),a(M,{get when(){var s;return(s=e.theme.song.artists)==null?void 0:s.length},children:" by "})]}}),null),d(l,a(H,{get each(){return e.theme.song.artists},children:s=>a(T,{get when(){return!e.mainArtist||s.slug!==e.mainArtist},get children(){return[a(T,{when:t,fallback:t=!0,children:" & "}),a(B,{get href(){return"/artist/"+s.slug},get children(){return s.name}})]}})}),null),l}}),null),d(n,a(H,{get each(){return e.theme.animethemeentries},children:l=>(()=>{var s=wb(),o=s.firstChild;o.firstChild;var c=o.nextSibling;c.firstChild;var u=c.nextSibling;return d(o,()=>l.version||1,null),d(c,()=>l.episodes||"-",null),d(s,a(T,{get when(){return l.spoiler},get children(){var h=yb();return P(()=>h.className=rr.spoiler),h}}),u),d(u,a(H,{get each(){return l.videos},children:h=>(()=>{var f=kb(),g=f.firstChild,m=g.nextSibling,y=m.nextSibling,v=y.nextSibling;return g.$$click=()=>e.video.src=h.link,d(m,()=>h.resolution),d(y,()=>h.source),d(v,()=>h.nc&&"NC"),P(()=>f.className=rr.playButton),f})()})),P(h=>{var f=rr.details,g=rr.playButtonContainer;return f!==h.e&&(s.className=h.e=f),g!==h.t&&(u.className=h.t=g),h},{e:void 0,t:void 0}),s})()}),null),P(l=>{var s=rr.themeContainer,o=rr.header;return s!==l.e&&(n.className=l.e=s),o!==l.t&&(r.className=l.t=o),l},{e:void 0,t:void 0}),n}})}_e(["click"]);const Cb="_themes_1brzn_1",xo={themes:Cb};var Ab=p("<video src controls autoplay>"),xb=p("<h1>Artist"),Tb=p("<p>"),Ib=p("<img alt=Artist>"),To=p("<div>"),Eb=p('<img src=https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg alt="Artist missing">');function Lb(){const e=ee(),[t]=oe.animeThemes.artisBySlug(()=>e.name),n=Ab();return document.title="Artist - LOB",[xb(),a(T,{get when(){return t()},get children(){return[(()=>{var r=Tb();return d(r,()=>t().data.artist.name),r})(),a(T,{get when(){return t().data.artist.images.length},get fallback(){return Eb()},get children(){var r=Ib();return P(()=>V(r,"src",t().data.artist.images[0].link)),r}}),(()=>{var r=To();return d(r,a(H,{get each(){return t().data.artist.songs},children:i=>(()=>{var l=To();return d(l,a(H,{get each(){return i.animethemes},children:s=>a(Xd,{theme:s,video:n,get mainArtist(){return e.name}})})),P(()=>Dt(l,xo.episode)),l})()})),P(()=>Dt(r,xo.themes)),r})(),n]}})]}var Pb=p("<div class=notification-page><ol class=flex-space-between><li><button>All</button></li><li><button>Airing</button></li><li><button>Activity</button></li><li><button>Forum</button></li><li><button>Follows</button></li><li><button>Media"),Mb=p("<button>debug: "),Db=p("<ol class=notifications-container>"),Rb=p("<button>Refresh"),La=p('<img alt="Media cover">'),zi=p("<div class=content><p>"),Nb=p("<div class=content>"),Ob=p("<li>");function Fb(){const[e,t]=O("all");return document.title="Notifications - LOB",(()=>{var n=Pb(),r=n.firstChild,i=r.firstChild,l=i.firstChild,s=i.nextSibling,o=s.firstChild,c=s.nextSibling,u=c.firstChild,h=c.nextSibling,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=g.nextSibling,v=y.firstChild;return l.$$click=()=>t("all"),o.$$click=()=>t("airing"),u.$$click=()=>t("activity"),f.$$click=()=>t("forum"),m.$$click=()=>t("follows"),v.$$click=()=>t("media"),d(n,a(Ub,{type:e}),null),n})()}function Ub(e){const{accessToken:t}=ie(),n=Pe(gg,t,e.type),[r,{mutateBoth:i}]=Qe(n),l=c=>{var u,h;(h=(u=c==null?void 0:c.data)==null?void 0:u.notifications)!=null&&h.length&&i(f=>{var A,w,_;if(!((A=f==null?void 0:f.data)!=null&&A.length))return f.data=[c.data.notifications],f;const g=c.data.notifications.at(-1).id,m=ur(f.data[0],x=>x.id-g),y=((w=f.data[0][m])==null?void 0:w.id)===g;if(c.data.pageInfo.currentPage===1)return y?(f.data[0].splice(0,m+1,...c.data.notifications),f):(f.data.unshift(c.data.notifications),f.data.length=Math.min(f.data.length,5),f);const v=c.data.notifications[0].id,$=ur(f.data[0],x=>x.id-v);if($===0&&f.data[0][$].id!==v||(f.data[0].splice($,m-$+y,...c.data.notifications),y||f.data.length===1))return f;const S=ur(f.data[1],x=>x.id-g);if(((_=f.data[1][S])==null?void 0:_.id)!==g)return f;const[b]=f.data.splice(1,1);return b.splice(0,S+1),f.data[0].push(...b),f})},[s,o]=Yl();return a(T,{get when(){return!r.loading},get children(){return[a(T,{get when(){return xr},get children(){var c=Mb();return c.firstChild,c.$$click=()=>o(u=>!u),d(c,()=>""+s(),null),c}}),a(Bb,Oe({get cache(){var c,u;return((u=(c=r())==null?void 0:c.data)==null?void 0:u[0])||[]},updateCache:l,isDebug:s},e))]}})}function Bb(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),i=Pe(Ec,t,e.type,n),[l]=Vl(e.isDebug,i);let s=0;const[o,c]=O(!1),[u,h]=O(!0),f=ud(h),g=new Set,m=An(tn,b=>!l.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var w,_;const b=Ce(o),A=Ce(u);if(C.has((w=e.cache.at(-1))==null?void 0:w.id)&&b)return Math.max(Math.floor(e.cache.length/15)+1,s+1);if(C.has((_=e.cache[0])==null?void 0:_.id)&&A)return 1;if(b){const x=[...C.difference(g)].sort((L,R)=>R-L);if(!x.length)return;const I=ia(x,.5),E=sd(e.cache,L=>L.id-I);return E==-1?void 0:Math.ceil((E+1)/15)}}let $=0;W(ce(l,b=>{var x,I,E,L,R;if(!((x=b==null?void 0:b.data)!=null&&x.notifications.length))return;b.data.notifications.forEach(U=>{g.add(U.id)});const A=((I=b.data.notifications[0])==null?void 0:I.createdAt)||0,w=((E=ia(b.data.notifications,.5))==null?void 0:E.createdAt)||A,_=Math.min(1e3*60*5,Math.max((A-w)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f(_,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/15&&(((L=b.data.notifications.at(-1))==null?void 0:L.id)>((R=e.cache.at(-1))==null?void 0:R.id)?$+=1:$=0,$>2&&(h(!0),c(!1),s=0,$=0)),e.updateCache(b),y()}));const C=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.id);F(Number.isInteger(w)),A.isIntersecting?C.add(w):C.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return He(()=>k.disconnect()),[a(T,{get when(){return N(()=>!!l.loading)()&&n()===1},get children(){return a(jn,{class:"refresh",get children(){return a(St,{tipPosition:"bottom",get children(){return a(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh notifications",children:"Loading notifications"})}})}})}}),(()=>{var b=Db();return d(b,a(H,{get each(){return e.cache},children:A=>{let w;return Tn(()=>k.observe(w)),(()=>{var _=Ob(),x=w;return typeof x=="function"?fe(x,_):w=_,d(_,a(z,{get fallback(){return'Notification type "'+A.type+'" not supported.'},get children(){return[a(M,{get when(){return A.type==="RELATED_MEDIA_ADDITION"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var I=La();return P(()=>V(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=zi(),E=I.firstChild;return d(E,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.context,null),d(I,a(Bn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="AIRING"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var I=La();return P(()=>V(I,"src",A.media.coverImage.large)),I}}),(()=>{var I=zi(),E=I.firstChild;return d(E,()=>A.contexts[0],null),d(E,()=>A.episode,null),d(E,()=>A.contexts[1],null),d(E,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(E,()=>A.contexts[2],null),d(I,a(Bn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="ACTIVITY_REPLY_LIKE"||A.type==="ACTIVITY_LIKE"||A.type==="ACTIVITY_REPLY"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var I=La();return P(()=>V(I,"src",A.user.avatar.large)),I}}),(()=>{var I=Nb();return d(I,a(B,{get href(){return"/activity/"+A.activityId},get children(){return[N(()=>A.user.name),N(()=>A.context)]}}),null),d(I,a(Bn,{get createdAt(){return A.createdAt}}),null),I})()]}}),a(M,{get when(){return A.type==="FOLLOWING"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var I=La();return P(()=>V(I,"src",A.user.avatar.large)),I}}),(()=>{var I=zi(),E=I.firstChild;return d(E,a(B,{get href(){return"/user/"+A.user.name},get children(){return A.user.name}}),null),d(E,()=>A.context,null),d(I,a(Bn,{get createdAt(){return A.createdAt}}),null),I})()]}})]}})),P(()=>V(_,"data-id",A.id)),_})()}})),P(()=>b.classList.toggle("loading",!!(l.loading&&n()===1))),b})(),a(z,{get children(){return[a(M,{get when(){return l.loading&&n()>s&&e.cache.length},get children(){return a(jn,{class:"new",get children(){return a(St,{tipPosition:"bottom",children:"Loading notifications"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh notification feed to load more",(()=>{var b=Rb();return b.$$click=()=>r(1),b})()]}})]}})]}_e(["click"]);var Zd=p("<ol class=grid-column-auto-fill>"),Vb=p("<div class=entities-page>"),Gb=p("<button>debug: "),Hb=p("<select name=roles id=roles>"),Yb=p("<option>"),jb=p("<img class=entity-image alt=Character>"),Qd=p("<div class=content><p class=line-clamp></p><p>"),zb=p('<p class="line-clamp small">'),Wb=p("<span class=role-notes>(<!>)"),qb=p("<div class=content><p class=voice-actor-language>"),Kb=p('<img class=entity-image alt="Voice actor">'),eu=p("<li class=entities-page-entity>"),Jb=p("<p class=line-clamp>"),Xb=p("<img class=entity-image alt=Staff>"),Zb=p('<li class="entities-page-entity loading"><div class=entity-left><div class=entity-image></div><div class=content><p class=line-clamp></p></div></div><div class=entity-right><div class=content><p class=line-clamp></p></div><div class=entity-image>');function Qb(){const[e,t]=O(),[n]=oe.myAnimeList.animeCharactersById(e);return a(mi,{type:"CHARACTER",setIdMal:t,malData:n})}function e0(){const[e,t]=O(),[n]=oe.myAnimeList.mangaCharactersById(e);return a(mi,{type:"CHARACTER",setIdMal:t,malData:n})}function t0(){const[e,t]=O(),[n]=oe.myAnimeList.animeStaffById(e);return a(mi,{type:"STAFF",setIdMal:t,malData:n})}function n0(){const[e,t]=O();return a(mi,{type:"STAFF",setIdMal:t})}function mi(e){const t=ee();return(()=>{var n=Vb();return d(n,a(z,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(r0,{})}}),a(M,{get when(){return e.type==="STAFF"},get children(){var r=Zd();return d(r,a(tu,{get id(){return t.id},page:1,get setIdMal(){return e.setIdMal}})),r}})]}})),n})()}function Wi(e,t,n,r){for(let i=e;i<=t;i++)n[r[i].id]=i;return n}function r0(e){const t=ee(),{accessToken:n}=ie(),r=Pe(fg,n,()=>t.id),[i,{mutateBoth:l}]=Qe(r),s=(u,h)=>{var f,g;(g=(f=u==null?void 0:u.data)==null?void 0:f.characters.edges)!=null&&g.length&&l(m=>{var y,v;if(!((v=(y=m==null?void 0:m.data)==null?void 0:y.items)!=null&&v.length))return m.data={items:u.data.characters.edges,indices:Wi(0,u.data.characters.edges.length-1,{},u.data.characters.edges),roles:h},m;for(let $=0;$<u.data.characters.edges.length;$++){const C=u.data.characters.edges[$],S=$+(u.data.characters.pageInfo.currentPage-1)*u.data.characters.pageInfo.perPage,k=m.data.indices[C.id];if(C.id in m.data.indices){if(k<S)for(let b=k;b<S;b++)m.data.items[b]=m.data.items[b+1];else if(k>S)for(let b=S;b>k;b--)m.data.items[b]=m.data.items[b-1];m.data.items[S]=C,Wi(Math.min(S,k),Math.max(S,k),m.data.indices,m.data.items)}else m.data.items.splice(S,0,C),Wi(S,m.data.items.length-1,m.data.indices,m.data.items)}return m.data.roles=h,m})},[o,c]=Yl();return a(T,{get when(){return!i.loading},get children(){return[a(T,{get when(){return xr},get children(){var u=Gb();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),a(a0,Oe({get cache(){var u,h;return((h=(u=i())==null?void 0:u.data)==null?void 0:h.items)||[]},get roles(){var u,h;return((h=(u=i())==null?void 0:u.data)==null?void 0:h.roles)||[]},updateCache:s,isDebug:o},e))]}})}function a0(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(e.cache.length?void 0:1),l=Pe(Lc,n,()=>t.id,r),[s]=Vl(e.isDebug,l),o=N(b=>{var A,w;return b&&((w=(A=s())==null?void 0:A.data)==null?void 0:w.characters.pageInfo.hasNextPage)!==!1},!0),[c,u]=O({language:"Japanese",dubGroup:null}),h=N(()=>{var b,A;return((A=(b=s())==null?void 0:b.data)==null?void 0:A.countryOfOrigin)||"JP"}),f=N(()=>{var A,w,_;if(((_=(w=(A=s())==null?void 0:A.data)==null?void 0:w.characters)==null?void 0:_.pageInfo.currentPage)!==1)return e.roles;const b=new Map;for(const x of s().data.characters.edges)for(const I of x.voiceActorRoles){const E=I.voiceActor.language+I.dubGroup;b.has(E)===!1&&b.set(E,{language:I.voiceActor.language,dubGroup:I.dubGroup})}return[...b.values()]});P(()=>{if(f().length){const b=jl(h()),A=f().findIndex(_=>_.language===b),w=A!==-1?A:f().findIndex(_=>_.language==="Japanese");u(f()[w===-1?0:w])}});const g=new Set,m=An(tn,b=>!s.loading&&i(b),1e3);function y(){const b=$();b&&m(b)}const v=25;function $(){const b=Ce(o),A=Math.ceil(e.cache.length/v);if(C.has(A)&&!g.has(A))return A;if(C.has(A)&&b&&g.has(A))return A+1;{const w=[...C.difference(g)].sort((_,x)=>x-_);return w.length?ia(w,.5):void 0}}W(ce(s,b=>{var A;(A=b==null?void 0:b.data)!=null&&A.characters.edges.length&&(F(v===b.data.characters.pageInfo.perPage,"Page count is wrong"),g.add(b.data.characters.pageInfo.currentPage),e.updateCache(b,f()),y())}));const C=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.page);F(Number.isInteger(w)),A.isIntersecting?C.add(w):C.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return He(()=>k.disconnect()),[a(T,{get when(){return f().length},get children(){var b=Hb();return b.addEventListener("change",A=>u(f()[A.target.value])),d(b,a(H,{get each(){return f()},children:(A,w)=>(()=>{var _=Yb();return d(_,()=>A.language,null),d(_,a(T,{get when(){return A.dubGroup},get children(){return[" (",N(()=>A.dubGroup),")"]}}),null),P(()=>_.value=w()),_})()})),P(()=>b.value=f().findIndex(A=>A===c())),b}}),(()=>{var b=Zd();return d(b,a(H,{get each(){return e.cache},children:(A,w)=>a(T,{get when(){return A.voiceActorRoles.filter(_=>_.voiceActor.language===c().language&&_.dubGroup===c().dubGroup)},children:_=>a(T,{get when(){return _().length},get fallback(){return a(Io,{edge:A,get page(){return Math.ceil((w()+1)/v)},intersectionObserver:k})},get children(){return a(H,{get each(){return _()},children:x=>a(Io,{edge:A,get i(){return w()},actorRole:x,get page(){return Math.ceil((w()+1)/v)},intersectionObserver:k})})}})})})),b})(),a(T,{get when(){return s.loading&&r()>Math.ceil(e.cache.length/v)&&e.cache.length},get children(){return a(jn,{class:"new",get children(){return a(St,{tipPosition:"bottom",children:"Loading characters"})}})}})]}function tu(e){const[t,n]=O(e.page===1?1:void 0),{accessToken:r}=ie(),[i]=oe.anilist.allMediaStaff(()=>e.id,t,r);return e.page===1&&W(()=>{i()&&e.setIdMal(i().data.idMal??void 0)}),a(mn,{onIntersection:()=>n(e.page),fetchResponse:i,get loadingElement(){return a(l0,{})},get loading(){return e.loading},children:l=>[a(H,{get each(){return i().data.staff.edges},children:s=>a(i0,{edge:s})}),a(T,{get when(){return i().data.staff.pageInfo.hasNextPage},get children(){return a(T,{when:l===!1,fallback:"Fetch cooldown",get children(){return a(tu,{get id(){return e.id},get page(){return e.page+1},get loading(){return i.loading}})}})}})]})}function Io(e){let t;return Tn(()=>e.intersectionObserver.observe(t)),(()=>{var n=eu(),r=t;return typeof r=="function"?fe(r,n):t=n,d(n,a(B,{get href(){return"/ani/character/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var i=jb();return P(()=>V(i,"src",e.edge.node.image.large)),i})(),(()=>{var i=Qd(),l=i.firstChild,s=l.nextSibling;return d(l,()=>e.edge.node.name.userPreferred),d(s,()=>qe(e.edge.role)),i})()]}}),null),d(n,a(T,{get when(){return e.actorRole},get children(){return a(B,{get href(){return"/ani/staff/"+e.actorRole.voiceActor.id},class:"entity-right",get children(){return[(()=>{var i=qb(),l=i.firstChild;return d(i,a(T,{get when(){return e.actorRole.roleNotes},get fallback(){return(()=>{var s=Jb();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})()},get children(){return[(()=>{var s=zb();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})(),(()=>{var s=Wb(),o=s.firstChild,c=o.nextSibling;return c.nextSibling,d(s,()=>e.actorRole.roleNotes,c),s})()]}}),l),d(l,()=>e.actorRole.voiceActor.language),i})(),(()=>{var i=Kb();return P(()=>V(i,"src",e.actorRole.voiceActor.image.large)),i})()]}})}}),null),P(()=>V(n,"data-page",e.page)),n})()}function i0(e){return(()=>{var t=eu();return d(t,a(B,{get href(){return"/ani/staff/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var n=Xb();return P(()=>V(n,"src",e.edge.node.image.large)),n})(),(()=>{var n=Qd(),r=n.firstChild,i=r.nextSibling;return d(r,()=>e.edge.node.name.userPreferred),d(i,()=>qe(e.edge.role)),n})()]}})),t})()}function l0(){return a(H,{get each(){return Array(3)},children:()=>Zb()})}_e(["click"]);var s0=p('<svg aria-hidden=true class=svg-heart focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 31.97 512.01 448.01"><path fill=currentColor d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">');function o0(){return s0()}var c0=p('<svg class=svg-anilist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 2.95 24 18.1"><path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z">');function ss(){return c0()}var d0=p('<svg class=svg-myanimelist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 7.19 24 9.63"><path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z">');function os(){return d0()}var u0=p('<label class="cp-toggle-favourite-button flex-no-shrink"><input type=checkbox id=favourite-toggle name=favourite-toggle>'),h0=p("<div class=grid-center><span class=visually-hidden>Anilist favourites: "),g0=p("<div class=grid-center><span class=visually-hidden>MyAnimeList favourites: "),f0=p("<div class=flex-no-shrink>");function Er(e){const{accessToken:t}=ie();let n=null;const r=ga(async(s,o,c)=>{if(c!==n){const u=await oe.anilist.toggleFavourite(s,o);Ol(u.fromCache,"Mutation should never be cached"),e.mutateCache(c,o)}n=c},500),i=()=>!e.idType||!e.onChange||!e.variableId||!e.mutateCache||!e.idType;return(()=>{var s=u0(),o=s.firstChild;return o.addEventListener("change",c=>{if(Ce(i))return;const u=e.idType;F(u==="MANGA"||u==="ANIME"||u==="STAFF"||u==="CHARACTER"||u==="STUDIO","Missing idType"),e.onChange(c.target.checked),r(t(),{[e.idType]:e.variableId},c.target.checked)}),d(s,a(o0,{}),null),d(s,a(l,{}),null),P(c=>{var u=!!i(),h=i();return u!==c.e&&s.classList.toggle("disabled",c.e=u),h!==c.t&&(o.disabled=c.t=h),c},{e:void 0,t:void 0}),P(()=>o.checked=e.checked),s})();function l(){const s=()=>"jikanValue"in e||e.jikanLoading,o=()=>"anilistValue"in e||e.anilistLoading;return a(T,{get when(){return s()||o()},get children(){var c=f0();return d(c,a(T,{get when(){return o()},get children(){var u=h0();return u.firstChild,d(u,a(ss,{}),null),d(u,a(z,{get children(){return[a(M,{get when(){return e.anilistLoading},children:"..."}),a(M,{get when(){return e.anilistValue!=null},get children(){return zs(e.anilistValue)}}),a(M,{get when(){return e.anilistValue==null},children:"N/A"})]}}),null),u}}),null),d(c,a(T,{get when(){return s()},get children(){var u=g0();return u.firstChild,d(u,a(os,{}),null),d(u,a(z,{get children(){return[a(M,{get when(){return e.jikanLoading},children:"..."}),a(M,{get when(){return e.jikanValue!=null},get children(){return zs(e.jikanValue)}}),a(M,{get when(){return e.jikanValue==null},children:"N/A"})]}}),null),u}}),null),c}})}}var m0=p("<li><strong>Birth:</strong> "),p0=p("<li><strong>Age:</strong> "),v0=p("<li><strong>Gender:</strong> "),$0=p("<li><strong>Active years: </strong>"),_0=p("<li><strong>Home town:</strong> "),b0=p("<li><strong>Blood type:</strong> "),Za=p("<li>"),y0=p("<div class=entity-page-header><img class=cover><div class=row><h1></h1><p class=entity-page-alternative-names></p></div><ul class=description>"),w0=p("<form class=entity-page-form><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=CHAPTERS>CHAPTERS</option><option value=CHAPTERS_DESC>CHAPTERS_DESC</option><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=SEARCH_MATCH>SEARCH_MATCH</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=TYPE>TYPE</option><option value=TYPE_DESC>TYPE_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC</option><option value=VOLUMES>VOLUMES</option><option value=VOLUMES_DESC>VOLUMES_DESC"),k0=p("<div class=entity-page>"),S0=p("<select>"),C0=p("<details class=entity-page-details open><summary class=entity-page-summary><h2></h2><div><label><input type=checkbox> Show years</label></div></summary><ol class=grid-column-auto-fill>"),A0=p("<option>"),Eo=p("<li class=entity-page-grid-year-header><h3>"),nu=p("<img>"),cs=p("<div class=list-status>"),ru=p("<span class=role> "),ds=p("<p>"),au=p("<ol>"),x0=p("<li class=entity-page-media-voice-actor>"),iu=p("<span>"),Lo=p("<span class=role> (<!>)"),T0=p('<img alt="Staff profile"class=background>'),lu=p("<img alt=Character class=background>"),I0=p("<li><div class=entity-page-character-cover>");function E0(){const e=ee(),{accessToken:t}=ie(),[n,{mutateCache:r}]=oe.anilist.characterInfoById(()=>e.id,t);return document.title="Character - LOB",a(su,{type:"CHARACTER",entityInfo:n,mutateEntityInfoCache:r})}function L0(){const e=ee(),{accessToken:t}=ie(),[n,{mutateCache:r}]=oe.anilist.staffInfoById(()=>e.id,t);return document.title="Staff - LOB",a(su,{type:"STAFF",entityInfo:n,mutateEntityInfoCache:r})}function su(e){ee();const[t,n]=xe(),r=An(tn,n,300),[i,l]=O(),[s,o]=O(!1);return W(ce(e.entityInfo,c=>{o(c==null?void 0:c.data.isFavourite)})),W(()=>{l({onList:t.list?t.list==="true":void 0,sort:t.sort})}),(()=>{var c=k0();return d(c,a(T,{get when(){return e.entityInfo()},get children(){return[(()=>{var u=y0(),h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling;return d(g,()=>e.entityInfo().data.name.userPreferred),d(m,()=>[...We(e.entityInfo().data.name.native),...We(e.entityInfo().data.name.alternative)].join(", ")),d(f,a(Er,{get checked(){return s()},get idType(){return e.type},get variableId(){return e.entityInfo().data.id},get anilistValue(){return e.entityInfo().data.favourites},onChange:o,mutateCache:v=>{e.entityInfo().data.isFavourite=v,e.mutateEntityInfoCache($=>$)}}),null),d(y,a(T,{get when(){return Wa(e.entityInfo().data.dateOfBirth)},get children(){var v=m0(),$=v.firstChild;return $.nextSibling,d(v,()=>Wa(e.entityInfo().data.dateOfBirth),null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.age},get children(){var v=p0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.age,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.gender},get children(){var v=v0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.gender,null),v}}),null),d(y,a(T,{get when(){var v;return(v=e.entityInfo().data.yearsActive)==null?void 0:v.length},get children(){var v=$0();return v.firstChild,d(v,()=>e.entityInfo().data.yearsActive.join("-"),null),d(v,a(z,{get children(){return[a(M,{get when(){var $;return N(()=>{var C;return!!((C=e.entityInfo().data.dateOfDeath)!=null&&C.year)})()&&e.entityInfo().data.yearsActive.at(-1)!==(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)},get children(){return["-",N(()=>e.entityInfo().data.dateOfDeath.year)]}}),a(M,{get when(){var $;return(($=e.entityInfo().data.dateOfDeath)==null?void 0:$.year)==null},children:"-Present"})]}}),null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.homeTown},get children(){var v=_0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.homeTown,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.bloodType},get children(){var v=b0(),$=v.firstChild;return $.nextSibling,d(v,()=>e.entityInfo().data.bloodType,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.description},get children(){var v=Za();return d(v,a(ns,{get children(){return e.entityInfo().data.description}})),v}}),null),P(v=>{var $=e.entityInfo().data.image.large,C=qe(e.type)+" profile";return $!==v.e&&V(h,"src",v.e=$),C!==v.t&&V(h,"alt",v.t=C),v},{e:void 0,t:void 0}),u})(),(()=>{var u=w0(),h=u.firstChild,f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.nextSibling,v=y.firstChild,$=h.nextSibling,C=$.firstChild,S=C.nextSibling,k=S.nextSibling,b=k.nextSibling,A=b.nextSibling,w=A.nextSibling,_=w.nextSibling,x=_.nextSibling,I=x.nextSibling,E=I.nextSibling,L=E.nextSibling,R=L.nextSibling,U=R.nextSibling,G=U.nextSibling,J=G.nextSibling,Y=J.nextSibling,q=Y.nextSibling,le=q.nextSibling,Z=le.nextSibling,te=Z.nextSibling,X=te.nextSibling;return u.addEventListener("submit",pe=>pe.preventDefault()),g.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),v.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),$.addEventListener("change",pe=>r({sort:pe.target.value})),P(()=>g.checked=t.list==="false"),P(()=>v.checked=t.list==="true"),P(()=>Y.value=e.type==="CHARACTER"&&t.sort!=="POPULARITY_DESC"?"":"POPULARITY_DESC"),P(()=>X.value=e.type==="STAFF"&&t.sort!=="START_DATE_DESC"?"":"START_DATE_DESC"),P(()=>$.value=t.sort||""),u})()]}}),null),d(c,a(z,{get children(){return[a(M,{get when(){return e.type==="STAFF"},get children(){return[a(Pa,{get variables(){return i()},type:"CHARACTER",showYears:!0,title:"Characters"}),a(Pa,{get variables(){return i()},type:"ANIME",title:"Anime staff roles"}),a(Pa,{get variables(){return i()},type:"MANGA",title:"Manga staff roles"})]}}),a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(Pa,{get variables(){return i()},type:"MEDIA",title:"Media entries"})}})]}}),null),c})()}function Pa(e){F(e.title,"title missing"),F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(e.showYears||!1),[r,i]=O(!1),[l,s]=O([]),[o,c]=O(["Japanese"]);return e.type==="MEDIA"&&W(()=>{l().length&&c(l().find(u=>u==="Japanese")||l().find(u=>u==="Chinese")||l()[0])}),(()=>{var u=C0(),h=u.firstChild,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.firstChild,v=h.nextSibling;return d(f,()=>e.title),y.addEventListener("change",$=>{$.preventDefault(),n($.target.checked)}),d(g,a(T,{get when(){return N(()=>e.type==="MEDIA")()&&l().length},get children(){var $=S0();return $.$$input=C=>c(C.target.value),d($,a(H,{get each(){return l()},children:C=>(()=>{var S=A0();return S.value=C,d(S,C),S})()})),P(()=>$.value=o()),$}}),null),d(v,a(z,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(cu,{setVisible:i,get variables(){return e.variables},showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="ANIME"},get children(){return a(kl,{setVisible:i,get variables(){return e.variables},type:"ANIME",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MANGA"},get children(){return a(kl,{setVisible:i,get variables(){return e.variables},type:"MANGA",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MEDIA"},get children(){return a(ou,{setVisible:i,get variables(){return e.variables},showYears:t,setLanguages:s,language:o,nestLevel:1})}})]}})),P(()=>u.classList.toggle("hidden",!r())),P(()=>y.checked=t()),u})()}function ou(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=oe.anilist.characterMediaById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(ce(l,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0);const o=new Set;for(const c of(s==null?void 0:s.data.edges)||[])for(const u of c.voiceActorRoles)o.add(u.voiceActor.language);e.setLanguages([...o])})),a(mn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:s=>[a(P0,{get language(){return e.language},get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:o=>a(T,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(ou,{get variables(){var c;return{...o(),page:(((c=o())==null?void 0:c.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function cu(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=oe.anilist.staffCharactersById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(ce(l,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0)})),a(mn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:s=>[a(D0,{get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:o=>a(T,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(cu,{get variables(){var c;return{...o(),characterPage:(((c=o())==null?void 0:c.characterPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function kl(e){F(e.type,"Type is missing"),F(e.nestLevel,"nestLevel is missing");const t=ee(),{accessToken:n}=ie(),[r,i]=O(void 0),[l,{mutate:s}]=oe.anilist.staffMediaById(n,()=>t.id,e.type,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(ce(l,o=>{e.setVisible((o==null?void 0:o.data.edges.length)>0)})),W(ce(l,o=>{if(!e.lastMediaId||!(o!=null&&o.data.edges.length))return;const c=structuredClone(o.data.edges),u=[];for(const h of o.data.edges){if(h.node.id!==e.lastMediaId)break;u.push(c.shift())}u.length!==0&&(e.mutate(h=>(h.data.edges=[...h.data.edges,...u],{...h})),s(h=>(h.data.edges=c,{...h})))})),a(mn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:o=>[a(M0,{get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return e.variables},get keyed(){return e.nestLevel===1},get children(){return a(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return a(kl,{get variables(){var c;return{...e.variables,staffPage:(((c=e.variables)==null?void 0:c.staffPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},mutate:s,get type(){return e.type},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get lastMediaId(){var c;return(c=l().data.edges.at(-1))==null?void 0:c.node.id},get loading(){return l.loading}})}})}})}})]})}function us(e){return a(T,{get when(){return e.showYears()},get children(){return a(z,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Eo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Eo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function P0(e){return F(e.showYears,"showYears signal is missing"),F(e.language,"language signal is missing"),a(H,{get each(){return e.edges},children:(t,n)=>[a(us,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),a(T,{get when(){return t.voiceActorRoles.filter(r=>r.voiceActor.language===e.language())},children:r=>(()=>{var i=x0();return d(i,a(B,{get href(){return Ve(t.node)},get children(){var l=nu();return P(s=>{var o=t.node.coverImage.large,c=qe(t.node.type)+" cover";return o!==s.e&&V(l,"src",s.e=o),c!==s.t&&V(l,"alt",s.t=c),s},{e:void 0,t:void 0}),l}}),null),d(i,a(B,{get href(){return Ve(t.node)},get children(){var l=ds();return d(l,a(T,{get when(){var s;return(s=t.node.mediaListEntry)==null?void 0:s.status},get children(){var s=cs();return P(()=>V(s,"data-status",t.node.mediaListEntry.status)),s}}),null),d(l,()=>t.node.title.userPreferred,null),d(l,a(T,{get when(){return t.characterRole},get children(){var s=ru();return s.firstChild,d(s,()=>qe(t.characterRole),null),s}}),null),l}}),null),d(i,a(T,{get when(){return r().length},get children(){var l=au();return d(l,a(H,{get each(){return r()},children:s=>(()=>{var o=Za();return d(o,a(B,{class:"actor",get href(){return"/ani/staff/"+s.voiceActor.id+"/"+Ke(s.voiceActor.name.userPreferred)},get children(){return[(()=>{var c=iu();return d(c,()=>s.voiceActor.name.userPreferred),c})(),a(T,{get when(){return s.roleNotes},get children(){var c=Lo(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>s.roleNotes,h),c}}),a(T,{get when(){return s.dubGroup},get children(){var c=Lo(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>s.dubGroup,h),c}}),(()=>{var c=T0();return P(()=>V(c,"src",s.voiceActor.image.large)),c})()]}})),o})()})),l}}),null),i})()})]})}function M0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{const i=n.at(-1);return(i==null?void 0:i.node.id)!==r.node.id?(r.staffRoles=[r.staffRole],n.push(r)):i!=null&&i.staffRoles&&i.staffRoles.push(r.staffRole),n};return a(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(us,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),(()=>{var i=Za();return d(i,a(B,{get href(){return Ve(n.node)},get children(){return[(()=>{var l=lu();return P(()=>V(l,"src",n.node.coverImage.large)),l})(),(()=>{var l=ds();return d(l,a(T,{get when(){var s;return(s=n.node.mediaListEntry)==null?void 0:s.status},get children(){var s=cs();return P(()=>V(s,"data-status",n.node.mediaListEntry.status)),s}}),null),d(l,()=>n.node.title.userPreferred,null),l})(),a(T,{get when(){return n.staffRoles},get children(){var l=au();return d(l,a(H,{get each(){return n.staffRoles},children:s=>(()=>{var o=Za();return d(o,s),o})()})),l}})]}})),i})()]})}function D0(e){return F(e.showYears,"showYears signal is missing"),a(H,{get each(){return e.edges},children:(t,n)=>a(H,{get each(){return t.characters},children:r=>a(T,{when:r,get children(){return[a(us,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),(()=>{var i=I0(),l=i.firstChild;return d(l,a(B,{get href(){return"/ani/character/"+r.id+"/"+Ke(r.name.userPreferred)},get children(){var s=lu();return P(()=>V(s,"src",r.image.large)),s}}),null),d(l,a(B,{class:"media",get href(){return Ve(t.node)},get children(){var s=nu();return P(o=>{var c=t.node.coverImage.large,u=qe(t.node.type)+" cover";return c!==o.e&&V(s,"src",o.e=c),u!==o.t&&V(s,"alt",o.t=u),o},{e:void 0,t:void 0}),s}}),null),d(i,a(B,{get href(){return"/ani/character/"+r.id+"/"+Ke(r.name.userPreferred)},get children(){return[(()=>{var s=iu();return d(s,()=>r.name.userPreferred),s})(),(()=>{var s=ru();return s.firstChild,d(s,()=>qe(t.characterRole),null),s})()]}}),null),d(i,a(B,{get href(){return Ve(t.node)},get children(){var s=ds();return d(s,a(T,{get when(){var o;return(o=t.node.mediaListEntry)==null?void 0:o.status},get children(){var o=cs();return P(()=>V(o,"data-status",t.node.mediaListEntry.status)),o}}),null),d(s,()=>t.node.title.userPreferred,null),s}}),null),i})()]}})})})}_e(["input"]);var R0=p("<div class=flex-space-between><h1>"),N0=p("<form><label><input type=checkbox> Show years</label><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option value=POPULARITY_DESC>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC"),O0=p("<ol class=grid-column-auto-fill>"),F0=p("<div class=studio-page>"),Po=p("<li class=grid-full-span><h3>");function U0(){const e=ee(),{accessToken:t}=ie(),[n,r]=xe(),i=An(tn,r,300),[l,s]=O(),[o,c]=O(!0),[u,{mutateCache:h}]=oe.anilist.studioInfoAndMediaById(()=>e.id,l,t);document.title="Studio - LOB";const[f,g]=O(!1);return W(ce(u,m=>{g(m==null?void 0:m.data.isFavourite)})),W(()=>{s({onList:n.list?n.list==="true":void 0,sort:n.sort})}),(()=>{var m=F0();return d(m,a(T,{get when(){return u()},get children(){return[(()=>{var y=R0(),v=y.firstChild;return d(v,()=>u().data.name),d(y,a(Er,{get checked(){return f()},get variableId(){return e.id},idType:"STUDIO",get anilistValue(){return u().data.favourites},onChange:g,mutateCache:$=>{u().data.isFavourite=$,h(C=>C)}}),null),y})(),(()=>{var y=N0(),v=y.firstChild,$=v.firstChild,C=v.nextSibling,S=C.firstChild,k=S.firstChild,b=S.nextSibling,A=b.nextSibling,w=A.firstChild,_=C.nextSibling,x=_.firstChild,I=x.nextSibling,E=I.nextSibling,L=E.nextSibling,R=L.nextSibling,U=R.nextSibling,G=U.nextSibling,J=G.nextSibling,Y=J.nextSibling,q=Y.nextSibling,le=q.nextSibling,Z=le.nextSibling,te=Z.nextSibling,X=te.nextSibling,pe=X.nextSibling,$e=pe.nextSibling,he=$e.nextSibling,ne=he.nextSibling;return y.addEventListener("submit",j=>j.preventDefault()),$.addEventListener("change",j=>c(j.target.checked)),k.addEventListener("change",j=>i({list:j.target.checked?j.target.value:void 0})),w.addEventListener("change",j=>i({list:j.target.checked?j.target.value:void 0})),_.addEventListener("change",j=>i({sort:j.target.value})),P(()=>$.checked=o()),P(()=>k.checked=n.list==="false"),P(()=>w.checked=n.list==="true"),P(()=>ne.value=n.sort==="START_DATE_DESC"?"START_DATE_DESC":""),P(()=>_.value=n.sort||""),y})(),a(Yd,{get children(){var y=O0();return d(y,a(du,{get variables(){return l()},studioInfo:u,showYears:o,nestLevel:1})),y}})]}})),m})()}function du(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=oe.anilist.studioInfoAndMediaById(()=>t.id,e.nestLevel===1?void 0:r,n),s=e.studioInfo||l;return a(mn,{onIntersection:()=>i(e.variables),fetchResponse:s,get loading(){return e.loading},children:o=>[a(V0,{get edges(){return s().data.media.edges},get showYears(){return e.showYears},get lastMediaId(){return e.lastMediaId},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return s().data.media.pageInfo.hasNextPage},get children(){return a(T,{get when(){return s().data.media.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:c=>a(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return a(du,{get variables(){var u;return{...c(),page:(((u=c())==null?void 0:u.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastMediaId(){var u;return(u=s().data.media.edges.at(-1))==null?void 0:u.node.id},get lastYearGroup(){var u,h;return((h=(u=s().data.media.edges.at(-1))==null?void 0:u.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return s.loading}})}})})}})}})]})}function B0(e){return a(T,{get when(){return e.showYears()},get children(){return a(z,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Po(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Po(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function V0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{var i;return((i=n.at(-1))==null?void 0:i.node.id)!==r.node.id&&e.lastMediaId!==r.node.id&&n.push(r),n};return a(H,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(B0,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),a(fi,{get media(){return n.node}})]})}var G0=p("<div data-k-8e2716fd class=activity-page>"),H0=p("<img data-k-8e2716fd class=profile alt=Profile>"),Y0=p("<div data-k-8e2716fd class=activity-message-card><div data-k-8e2716fd class=header></div><div data-k-8e2716fd class=content>");function j0(){const{accessToken:e}=ie(),t=ee(),[n]=oe.anilist.activityById(()=>t.id,e),[r]=oe.anilist.activityRepliesById(()=>t.id,1,e);return document.title="Activity - LOB",(()=>{var i=G0();return d(i,a(T,{get when(){var l;return(l=n())==null?void 0:l.data},get children(){return a(rs,{get activity(){return n().data},mutateCache:l=>console.log("mutate",l)})}}),null),d(i,a(T,{get when(){var l;return(l=r())==null?void 0:l.data},get children(){return a(H,{get each(){return r().data.activityReplies},children:l=>(()=>{var s=Y0(),o=s.firstChild,c=o.nextSibling;return d(o,a(B,{get href(){return"/user/"+l.user.name},class:"message-card-profile-header",get children(){return[(()=>{var u=H0();return P(()=>V(u,"src",l.user.avatar.large)),u})(),N(()=>l.user.name)]}}),null),d(o,a(Bn,{get createdAt(){return l.createdAt}}),null),d(c,a(ns,{get children(){return l.text}})),s})()})}}),null),i})()}function z0(e){const t=ee(),n=Kt();return a(T,{get when(){return!n.search},get fallback(){return a(dn,{get href(){return"/search/"+t.type+n.search}})},get children(){return e.children}})}var W0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"fill=currentColor>'),q0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"fill=currentColor>'),K0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"fill=currentColor>');function Zr(e){return F("score"in e,"Score is missing"),a(z,{get children(){return[a(M,{get when(){return e.score>=75},get children(){var t=W0();return P(()=>V(t,"class",`good ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=60},get children(){var t=q0();return P(()=>V(t,"class",`average ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=0},get children(){var t=K0();return P(()=>V(t,"class",`bad ${e.class||""}`)),t}})]}})}var J0=p("<label>"),X0=p("<p>"),Z0=p("<input type=number inputmode=numeric min=0 max=10>"),Q0=p("<input type=number inputmode=numeric min=0 max=100>"),ey=p("<input type=number inputmode=decimal min=0 max=10 step=.1>"),ty=p("<div class=score-star-input>"),ny=p("<div class=score-emoji-input>"),uu=p("<label class=radio-container><input type=radio class=radio>");function Mo(e){F(e.format,"Score format is missing"),F(e.onChange,"onChange is missing (give signal)");const t=Oe({name:"score",id:"score",value:0},e),[n]=ai(t,["id","name","value"]),r={onBeforeInput:i=>{var l;(l=i.data)!=null&&l.toLowerCase().includes("e")&&i.preventDefault()},onBlur:i=>i.target.value=n.value};return[a(T,{get when(){return e.label},get children(){return a(z,{get children(){return[a(M,{get when(){return e.format==="POINT_10"||e.format==="POINT_100"||e.format==="POINT_10_DECIMAL"},get children(){var i=J0();return d(i,()=>e.label),P(()=>V(i,"for",n.id)),i}}),a(M,{get when(){return e.format==="POINT_5"||e.format==="POINT_3"},get children(){var i=X0();return d(i,()=>e.label),i}})]}})}}),a(z,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){var i=Z0();return It(i,Oe(n,r,{onChange:l=>{const s=Math.floor(Number(l.target.value)||0);e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_100"},get children(){var i=Q0();return It(i,Oe(n,r,{onChange:l=>{const s=Math.floor(Number(l.target.value)||0);e.onChange(Math.max(0,Math.min(s,100)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){var i=ey();return It(i,Oe(n,r,{onChange:l=>{const s=Number((Number(l.target.value)||0).toFixed(1));e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_5"},get children(){var i=ty();return d(i,a(ry,Oe(n,{get onChange(){return e.onChange}}))),i}}),a(M,{get when(){return e.format==="POINT_3"},get children(){var i=ny();return d(i,a(ay,Oe(n,{get onChange(){return e.onChange}}))),i}})]}})]}function ry(e){return a(H,{each:[1,2,3,4,5],children:t=>(()=>{var n=uu(),r=n.firstChild;return r.$$click=i=>{e.value==i.target.value?(i.target.checked=!1,e.onChange(0)):e.onChange(+i.target.value)},r.value=t,d(n,a(ma,{class:"score-star"}),null),P(i=>{var l=t<=e.value,s=e.name,o=e.id;return l!==i.e&&n.classList.toggle("selected",i.e=l),s!==i.t&&V(r,"name",i.t=s),o!==i.a&&V(r,"id",i.a=o),i},{e:void 0,t:void 0,a:void 0}),P(()=>r.checked=e.value==t),n})()})}function ay(e){const t=["",0,60,80];return a(H,{each:[1,2,3],children:n=>(()=>{var r=uu(),i=r.firstChild;return i.$$click=l=>{e.value==l.target.value?(l.target.checked=!1,e.onChange(0)):e.onChange(+l.target.value)},i.value=n,d(r,a(Zr,{get score(){return t[n]}}),null),P(l=>{var s=n==e.value,o=e.name,c=e.id;return s!==l.e&&r.classList.toggle("selected",l.e=s),o!==l.t&&V(i,"name",l.t=o),c!==l.a&&V(i,"id",l.a=c),l},{e:void 0,t:void 0,a:void 0}),P(()=>i.checked=e.value==n),r})()})}_e(["click"]);var iy=p("<form class=exit-media-editor method=dialog><button>Close"),ly=p("<img class=banner alt=Banner>"),sy=p('<div class="media-editor-input volume-progress"><label for=progress-volumes>Volume Progress</label><input type=number inputmode=numeric id=progress-volumes name=progressVolumes min=0>'),oy=p("<p class=advanced-scoring-header>Advanced scoring"),cy=p("<ul>"),dy=p("<hr>"),uy=p("<button type=button>Delete"),hy=p('<form method=dialog><header class=media-editor-header><img class=cover alt=Cover><h2 class="line-clamp header"></h2><div class=container><button type=submit>Save</button></div></header><div class=media-editor-body><div><div class="media-editor-input status"><label for=status>Status</label><select name=status id=status><option value=none disabled hidden>Select status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select></div><div class="media-editor-input score"></div><div class="media-editor-input progress"><label for=progress></label><input type=number inputmode=numeric id=progress name=progress min=0></div><div class="media-editor-input start-date"><label for=start-date>Start date</label><input type=date id=start-date name=startedAt></div><div class="media-editor-input finish-date"><label for=end-date>Finish date</label><input type=date id=end-date name=completedAt></div><div class="media-editor-input repeat"><label for=repeat></label><input type=number inputmode=numeric id=repeat name=repeat min=0></div><div class="media-editor-input notes"><label for=notes>Notes</label><textarea type=text id=notes placeholder=Notes... name=notes></textarea></div></div><div><h3>Custom Lists</h3><div><input type=checkbox name=hiddenFromStatusLists id=hide-from-status><label for=hide-from-status> Hide from status lists</label></div><div><input type=checkbox name=private id=private><label for=private> Private'),gy=p("<dialog class=media-editor-warning-dialog><p>Are you sure you want to delete this media entry</p><form method=dialog><button>Yes</button><button>No"),fy=p("<dialog class=media-editor>"),my=p('<div class="media-editor-input advanced-score">'),py=p("<li><input type=checkbox name=customLists><label> ");function vy(e,t){F(!0,"Should not be able to edit if not authenticated");const[n,r]=O(),[i,l]=O(),[s,o]=O(),[c,u]=O(),[h,f]=O(),[g,m]=O(),[y,v]=O(),[$,C]=O(),[S,k]=O(),[b,A]=O(),[w,_]=O(),[x,I]=O(),[E,L]=O(),[R,U]=O(),[G,J]=O(),[Y,q]=O(),[le,Z]=O(),[te,X]=O(),[pe,$e]=O();function he(ne,j){Ge(()=>{var Ue,et,Re,tt,Bt,ct,yt,dt,nt,At,mt,rt;C(ne==null?void 0:ne.data.mediaListOptions.scoreFormat),o(()=>(j==null?void 0:j.type)==="ANIME"?ne==null?void 0:ne.data.mediaListOptions.animeList.advancedScoringEnabled:(j==null?void 0:j.type)==="MANGA"?ne==null?void 0:ne.data.mediaListOptions.mangaList.advancedScoringEnabled:!1),u(()=>(j==null?void 0:j.type)==="ANIME"?(ne==null?void 0:ne.data.mediaListOptions.animeList.advancedScoring)||[]:(j==null?void 0:j.type)==="MANGA"?(ne==null?void 0:ne.data.mediaListOptions.mangaList.advancedScoring)||[]:[]),f(()=>(j==null?void 0:j.type)==="ANIME"?(ne==null?void 0:ne.data.mediaListOptions.animeList.customLists)||[]:(j==null?void 0:j.type)==="MANGA"?(ne==null?void 0:ne.data.mediaListOptions.mangaList.customLists)||[]:[]),r(((Ue=j==null?void 0:j.mediaListEntry)==null?void 0:Ue.score)??""),l(((et=j==null?void 0:j.mediaListEntry)==null?void 0:et.advancedScores)??{}),v(((Re=j==null?void 0:j.mediaListEntry)==null?void 0:Re.status)??"none"),A(((tt=j==null?void 0:j.mediaListEntry)==null?void 0:tt.progress)??""),_(((Bt=j==null?void 0:j.mediaListEntry)==null?void 0:Bt.progressVolumes)??""),I((j==null?void 0:j.episodes)??(j==null?void 0:j.chapters)??null),L(Qa((ct=j==null?void 0:j.mediaListEntry)==null?void 0:ct.startedAt)),U(Qa((yt=j==null?void 0:j.mediaListEntry)==null?void 0:yt.completedAt)),J(((dt=j==null?void 0:j.mediaListEntry)==null?void 0:dt.repeat)??""),q(((nt=j==null?void 0:j.mediaListEntry)==null?void 0:nt.notes)||""),k((j==null?void 0:j.isFavourite)||!1),$e(((At=j==null?void 0:j.mediaListEntry)==null?void 0:At.private)||!1),X(((mt=j==null?void 0:j.mediaListEntry)==null?void 0:mt.hiddenFromStatusLists)||!1),m(((rt=j==null?void 0:j.mediaListEntry)==null?void 0:rt.customLists)||{})})}return he(e,t),[{score:n,setScore:r,advancedScores:i,setAdvancedScores:l,advancedScoresEnabled:s,setAdvancedScoresEnabled:o,advancedScoring:c,setAdvancedScoring:u,customLists:h,setCustomLists:f,mediaCustomLists:g,setMediaCustomLists:m,status:y,setStatus:v,format:$,setFormat:C,progress:b,setProgress:A,volumeProgress:w,setvolumeProgress:_,maxProgress:x,setMaxProgress:I,startedAt:E,setStartedAt:L,completedAt:R,setCompletedAt:U,isFavourite:S,setIsFavourite:k,repeat:G,setRepeat:J,notes:Y,setNotes:q,like:le,setLike:Z,hideFromStatus:te,setHideFromStatus:X,mediaPrivate:pe,setMediaPrivate:$e},he]}function $y(e){const[t,n]=O(void 0),[r,i]=O(void 0),{accessToken:l,authUserData:s}=ie(),[o,c]=vy();let u,h;const f=async m=>{var C,S,k,b,A,w,_,x,I,E,L,R,U,G,J,Y,q,le;const v=new FormData(m.currentTarget).entries().reduce((Z,[te,X])=>(Array.isArray(Z[te])?Z[te].push(X||null):te in Z?Z[te]=[Z[te],X||null]:Z[te]=X||null,Z),{}),$={};if(Number.isNaN(+v.progress)===!1&&v.progress!=(((C=t().mediaListEntry)==null?void 0:C.progress)||0)&&($.progress=Number(v.progress)),Number.isNaN(+v.progressVolumes)===!1&&v.progressVolumes!=(((S=t().mediaListEntry)==null?void 0:S.progressVolumes)||0)&&($.progressVolumes=Number(v.progressVolumes)),Number.isNaN(+v.score)===!1&&v.score!=(((k=t().mediaListEntry)==null?void 0:k.score)||0)&&($.score=Number(v.score)),Number.isNaN(+v.repeat)===!1&&v.repeat!=(((b=t().mediaListEntry)==null?void 0:b.repeat)||0)&&($.repeat=Number(v.repeat)),o.advancedScoresEnabled()){const te=o.advancedScoring().map((he,ne)=>v["advanced-scores-"+ne]).map(he=>Number(he||0)),X=!te.some(Number.isNaN),pe=Object.values(((A=t().mediaListEntry)==null?void 0:A.advancedScores)||{}),$e=te.some((he,ne)=>he!=pe[ne]);X&&$e&&($.advancedScores=te)}if(F(v.status!="none"||((w=t().mediaListEntry)==null?void 0:w.score)==null,"Replacing current status with default none value"),v.status=="none"||((_=t().mediaListEntry)==null?void 0:_.status)==v.status||($.status=v.status),(v.startedAt||"")!=Qa((x=t().mediaListEntry)==null?void 0:x.startedAt)){const[Z,te,X]=v.startedAt.split("-");$.startedAt={year:Z,month:te,day:X}}if((v.completedAt||"")!=Qa((I=t().mediaListEntry)==null?void 0:I.completedAt)){const[Z,te,X]=v.completedAt.split("-");$.completedAt={year:Z,month:te,day:X}}if(v.notes!=((E=t().mediaListEntry)==null?void 0:E.notes)&&($.notes=v.notes),v.customLists||(L=t().mediaListEntry)!=null&&L.customLists){const Z=v.customLists||[],te=Array.isArray(Z)?Z:[Z];(te.length>0&&((R=t().mediaListEntry)==null?void 0:R.customLists)==null||(U=t().mediaListEntry)!=null&&U.customLists&&Object.entries((G=t().mediaListEntry)==null?void 0:G.customLists).some(([pe,$e])=>te.includes(pe)!==$e))&&($.customLists=te)}if(v.hiddenFromStatusLists==="on"!=(((J=t().mediaListEntry)==null?void 0:J.hiddenFromStatusLists)??!1)&&($.hiddenFromStatusLists=v.hiddenFromStatusLists==="on"),v.private==="on"!=(((Y=t().mediaListEntry)==null?void 0:Y.private)??!1)&&($.private=v.private==="on"),m.submitter.type==="submit"&&Object.keys($).length>0){$.mediaId=t().id;for(const[te,X]of Object.entries($))F(Number.isNaN(X)===!1,`Key "${te}" is NaN`);const Z=await oe.anilist.mutateMedia(l(),$);Z.status===200&&((le=(q=r())==null?void 0:q.mutateMedia)==null||le.call(q,Z.data))}};async function g(m,y){F("id"in m,"Missing editor id"),Ge(()=>{n(m),i(y),c(s(),m)}),u.showModal();const v=await oe.anilist.mediaListEntry(l(),m.id);Ge(()=>{n(v.data.data.Media),c(s(),v.data.data.Media)})}return a(mc.Provider,{value:{openEditor:g},get children(){return[(()=>{var m=fy(),y=u;return typeof y=="function"?fe(y,m):u=m,d(m,a(T,{get when(){return t()},get children(){return[iy(),(()=>{var v=hy(),$=v.firstChild,C=$.firstChild,S=C.nextSibling,k=S.nextSibling,b=k.firstChild,A=$.nextSibling,w=A.firstChild,_=w.firstChild,x=_.firstChild,I=x.nextSibling,E=I.firstChild,L=E.nextSibling,R=L.nextSibling,U=R.nextSibling,G=U.nextSibling,J=G.nextSibling,Y=J.nextSibling,q=_.nextSibling,le=q.nextSibling,Z=le.firstChild,te=Z.nextSibling,X=le.nextSibling,pe=X.firstChild,$e=pe.nextSibling,he=X.nextSibling,ne=he.firstChild,j=ne.nextSibling,Ue=he.nextSibling,et=Ue.firstChild,Re=et.nextSibling,tt=Ue.nextSibling,Bt=tt.firstChild,ct=Bt.nextSibling,yt=w.nextSibling,dt=yt.firstChild,nt=dt.nextSibling,At=nt.firstChild,mt=nt.nextSibling,rt=mt.firstChild;return v.addEventListener("submit",f),d($,a(T,{get when(){return t().bannerImage},get children(){var re=ly();return P(()=>V(re,"src",t().bannerImage)),re}}),C),d(S,()=>{var re;return(re=t().title)==null?void 0:re.userPreferred}),d(k,a(Er,{get checked(){return o.isFavourite()},get idType(){return t().type},get variableId(){return t().id},get onChange(){return o.setIsFavourite},mutateCache:(re,Q)=>{var ve,Te;(Te=(ve=r())==null?void 0:ve.setIsFavourite)==null||Te.call(ve,re,Q)}}),b),I.addEventListener("change",re=>{o.setStatus(re.target.value),(re.target.value==="CURRENT"||re.target.value==="COMPLETED")&&o.startedAt()===""&&o.setStartedAt(new Date().toISOString().substring(0,10)),re.target.value==="COMPLETED"&&((o.progress()===""||o.progress()==0)&&o.maxProgress()>0&&o.setProgress(o.maxProgress()),(o.volumeProgress()===""||o.volumeProgress()==0)&&t().volumes>0&&o.setvolumeProgress(t().volumes),o.completedAt()===""&&o.setCompletedAt(new Date().toISOString().substring(0,10)))}),d(R,a(z,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:" Reading"}),a(M,{get when(){return t().type==="ANIME"},children:" Watching"})]}})),d(Y,a(z,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:"Rereading"}),a(M,{get when(){return t().type==="ANIME"},children:"Rewatching"})]}})),d(q,a(Mo,{get value(){return o.score()},label:"Score",get onChange(){return o.setScore},get format(){return o.format()}})),d(Z,a(z,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Episode Progress"}),a(M,{get when(){return t().type==="MANGA"},children:"Chapter Progress"})]}})),te.$$beforeinput=re=>{var Q;(Q=re.data)!=null&&Q.toLowerCase().includes("e")&&re.preventDefault()},te.addEventListener("blur",re=>re.target.value=o.progress()),te.addEventListener("change",re=>o.setProgress(Math.max(0,Math.min(+re.target.value,o.maxProgress()??1/0)))),d(w,a(T,{get when(){return t().type==="MANGA"},get children(){var re=sy(),Q=re.firstChild,ve=Q.nextSibling;return ve.$$beforeinput=Te=>{var Xe;(Xe=Te.data)!=null&&Xe.toLowerCase().includes("e")&&Te.preventDefault()},ve.addEventListener("blur",Te=>Te.target.value=o.volumeProgress()),ve.addEventListener("change",Te=>o.setvolumeProgress(Math.max(0,Math.min(+Te.target.value,t().volumes??1/0)))),P(()=>V(ve,"max",t().volumes)),P(()=>ve.value=o.volumeProgress()),re}}),X),$e.addEventListener("change",re=>o.setStartedAt(re.target.value)),j.addEventListener("change",re=>o.setCompletedAt(re.target.value)),d(et,a(z,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Total Rewatches"}),a(M,{get when(){return t().type==="MANGA"},children:"Total Rereads"})]}})),Re.$$beforeinput=re=>{var Q;(Q=re.data)!=null&&Q.toLowerCase().includes("e")&&re.preventDefault()},Re.addEventListener("blur",re=>re.target.value=o.repeat()),Re.addEventListener("change",re=>o.setRepeat(Math.max(0,Math.min(+re.target.value,Number.MAX_SAFE_INTEGER)))),ct.addEventListener("change",re=>o.setNotes(re.target.value)),d(w,a(T,{get when(){return N(()=>!!o.advancedScoresEnabled())()&&o.advancedScoring().length},get children(){return[oy(),a(H,{get each(){return o.advancedScoring()},children:(re,Q)=>(()=>{var ve=my();return d(ve,a(Mo,{get value(){return o.advancedScores()[re]??""},get id(){return"advanced-score-"+Q()},get name(){return"advanced-scores-"+Q()},label:re,onChange:Te=>{o.setAdvancedScores(Xe=>{const je={...Xe,[re]:Te};let Me=0,Be=0;return Object.values(je).forEach(Et=>{Me+=Et>0,Be+=Et||0}),F(Me!==0||Be===0,"Total is 0"),Number.isNaN(Be)===!1&&typeof Be=="number"&&Me>0&&o.setScore(()=>{switch(o.format()){case"POINT_10":return Math.max(0,Math.min(Math.round(Be/Me),10));case"POINT_100":return Math.max(0,Math.min(Math.round(Be/Me),100));case"POINT_10_DECIMAL":return Math.max(0,Math.min(Number((Be/Me).toFixed(1)),10));case"POINT_5":return Math.max(0,Math.min(Math.round(Be/Me),5));case"POINT_3":return Math.max(0,Math.min(Math.round(Be/Me),3));default:F(!1,`Format "${o.format()}" not found`)}}),je})},get format(){return o.format()}})),ve})()})]}}),null),d(yt,a(T,{get when(){var re;return(re=o.customLists())==null?void 0:re.length},get children(){return[(()=>{var re=cy();return d(re,a(H,{get each(){return o.customLists()},children:(Q,ve)=>(()=>{var Te=py(),Xe=Te.firstChild,je=Xe.nextSibling;return je.firstChild,Xe.addEventListener("change",Me=>o.setMediaCustomLists(Be=>({...Be,[Q]:Me.target.checked}))),Xe.value=Q,d(je,Q,null),P(Me=>{var Be="custom-list-"+ve(),Et="custom-list-"+ve();return Be!==Me.e&&V(Xe,"id",Me.e=Be),Et!==Me.t&&V(je,"for",Me.t=Et),Me},{e:void 0,t:void 0}),P(()=>{var Me;return Xe.checked=(Me=o.mediaCustomLists())==null?void 0:Me[Q]}),Te})()})),re})(),dy()]}}),nt),At.addEventListener("change",re=>o.setHideFromStatus(re.target.checked)),rt.addEventListener("change",re=>o.setMediaPrivate(re.target.checked)),d(yt,a(T,{get when(){return t().mediaListEntry},get children(){var re=uy();return re.$$click=()=>h.showModal(),re}}),null),P(re=>{var Xe,je;var Q=(Xe=t().coverImage)==null?void 0:Xe.large,ve="media-editor-input-grid "+((je=t().type)==null?void 0:je.toLowerCase())||"",Te=o.maxProgress();return Q!==re.e&&V(C,"src",re.e=Q),ve!==re.t&&Dt(w,re.t=ve),Te!==re.a&&V(te,"max",re.a=Te),re},{e:void 0,t:void 0,a:void 0}),P(()=>I.value=o.status()),P(()=>te.value=o.progress()),P(()=>$e.value=o.startedAt()),P(()=>j.value=o.completedAt()),P(()=>Re.value=o.repeat()),P(()=>ct.value=o.notes()),P(()=>At.checked=o.hideFromStatus()),P(()=>rt.checked=o.mediaPrivate()),v})(),(()=>{var v=gy(),$=v.firstChild,C=$.nextSibling,S=C.firstChild,k=h;return typeof k=="function"?fe(k,v):h=v,S.$$click=async()=>{var b,A;u.close(),await oe.anilist.deleteMediaListEntry(l(),t().mediaListEntry.id),(A=(b=r())==null?void 0:b.deleteMedia)==null||A.call(b)},v})()]}})),m})(),N(()=>e.children)]}})}function Qa(e){if(!e||!e.day||!e.month||!e.year)return"";const t=String(e.day).padStart(2,"0"),n=String(e.month).padStart(2,"0");return`${e.year}-${n}-${t}`}_e(["beforeinput","click"]);function _y(e){return new Worker("/legendary-octo-barnacle/branches/feature-add-sorting-options-to-compare-page/assets/compare-media-list-Cn777iQO.js",{name:e==null?void 0:e.name})}var by=p("<div class=score-component-container>");function hs(e){return a(T,{get when(){return e.score!==0},get children(){var t=by();return d(t,a(z,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_100"},get children(){return[N(()=>e.score),"/100"]}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_5"},get children(){return[N(()=>e.score),"/5 ",a(ma,{class:"score-star"})]}}),a(M,{get when(){return e.format==="POINT_3"},get children(){return a(z,{get children(){return[a(M,{get when(){return e.score===1},get children(){return a(Zr,{class:"score-emoji",score:0})}}),a(M,{get when(){return e.score===2},get children(){return a(Zr,{class:"score-emoji",score:70})}}),a(M,{get when(){return e.score===3},get children(){return a(Zr,{class:"score-emoji",score:80})}})]}})}})]}})),t}})}var yy=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z">');function ei(){return yy()}var wy=p("<ol><li><button>All "),ky=p("<option value>All formats"),Sy=p("<option value>Any User Status"),Cy=p("<option value>Any Status"),Ay=p("<option value>All genres"),xy=p("<option value>All countries"),Ty=p("<option value>All ratings"),Iy=p("<option value=chapters>Chapters"),Ey=p("<option value=episodes>Episodes"),Ly=p("<option value=volumes>Volumes"),Py=p("<i>(default is all users)"),My=p("<button>Reset filters"),Dy=p('<div class=pg-compare><div><ul class=pg-compare-users></ul></div><div class=pg-compare-filter-panel><input type=text placeholder=Search><select name=format><option value hidden>Format</option><option value=MOVIE>Movie</option><option value=MUSIC>Music</option><option value=ONA>Ona</option><option value=OVA>Ova</option><option value=SPECIAL>Special</option><option value=TV>TV</option><option value=TV_SHORT>TV short</option></select><select name=userStatus><option value hidden>User Status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select><select name=status><option value hidden>Status</option><option value=RELEASING>Releasing</option><option value=FINISHED>Finished</option><option value=NOT_YET_RELEASED>Not Yet Released</option><option value=CANCELLED>Cancelled</option></select><select name=genre><option value hidden>Genre</option><option value=Action>Action</option><option value=Adventure>Adventure</option><option value=Comedy>Comedy</option><option value=Drama>Drama</option><option value=Ecchi>Ecchi</option><option value=Fantasy>Fantasy</option><option value=Hentai>Hentai</option><option value=Horror>Horror</option><option value="Mahou Shoujo">Mahou Shoujo</option><option value=Mecha>Mecha</option><option value=Music>Music</option><option value=Mystery>Mystery</option><option value=Psychological>Psychological</option><option value=Romance>Romance</option><option value=Sci-Fi>Sci-Fi</option><option value="Slice of Life">Slice of Life</option><option value=Sports>Sports</option><option value=Supernatural>Supernatural</option><option value=Thriller>Thriller</option></select><select name=countryOfOrigin><option value hidden>Country</option><option value=CN>China</option><option value=JP>Japan</option><option value=KR>South Korea</option><option value=TW>Taiwan</option></select><select name=isAdult><option value hidden>Age rating</option><option value=false>R-17+</option><option value=true>R-18</option></select><input type=number name=year placeholder="Release year"max=9999 min=0><label for=repeat><input type=checkbox name=repeat id=repeat> </label><label for=missingScore><input type=checkbox name=missingScore id=missingScore> Allow missing scores</label><label for=reverse><input type=checkbox name=reverse id=reverse> Reverse order</label><select name=sort><option value=completedAt>Completed Date</option><option value=averageScore>Global Score</option><option value=updatedAt>Last updated</option><option value=popularity>Popularity</option><option value=releaseDate>Release Date</option><option value=repeat></option><option value=title>Title</option><option value=score>User score</option></select><label for=reviewsNeeded>Reviews needed: <input type=number inputmode=numeric min=1 name=reviewsNeeded id=reviewsNeeded><button class=help>?'),Ry=p("<li><button> "),Ny=p("<ol>"),Oy=p('<form class=pg-compare-user-search><input type=search name=user id=user placeholder="Search users">'),Fy=p('<li><img alt="Profile picture">'),Uy=p('<p class=error>No user found with name: "<!>"'),By=p("<img>"),Vy=p("<p>"),Gy=p("<label><input type=checkbox name=enable> Disable <button>?"),Hy=p("<label><input type=checkbox name=enable> Filter out <button>?"),Yy=p("<li><button>Remove"),jy=p("<p>Loading user data"),zy=p("<h1>Total <!> "),Wy=p('<ol class="pg-compare-content grid-column-auto-fill">'),qy=p('<img loading=lazy class=bg inert alt="Background banner">',!0,!1,!1),Do=p("<div class=cp-card-repeat>"),Ky=p('<img class=cover loading=lazy alt="Media cover">',!0,!1,!1),Jy=p("<br>"),Xy=p("<span>"),Zy=p('<div class="footer flex-space-between"><span>'),Qy=p('<div class=cover-wrapper><div class="header flex-space-between"><div class=score> '),e2=p("<div class=pg-compare-card-content><p class=title></p><ol class=pg-compare-media-users></ol><ul class=flex-bullet-separator>"),t2=p('<li class="pg-compare-media-card inline-container"><div class=wrapper>'),n2=p('<img class=profile alt="Profile picture">'),r2=p("<span class=status>"),Ro=p("<li>");const a2=()=>{const e=Yf(sessionStorage.getItem(window.location.href),0);return Array(e).fill({id:-1,coverImage:{}})};function i2(){const e=Kt(),[t,n]=xe(),r=ee(),[i,l]=Ye([]),[s,o]=Ye({}),[c,u]=O(a2()),h=Z=>{sessionStorage.setItem(window.location.href,Z.length),u(Z)},[f,g]=O([]),[m,y]=O([]),[v,$]=O(!0);W(ce(()=>t.user,Z=>{const te=or(Z);l(zt([...te],[]))}));const C=()=>t.search||"",S=()=>t.format||"",k=()=>t.reviewsNeeded||f().length,b=()=>t.status||"",A=()=>t.genre||"",w=()=>t.countryOfOrigin||"",_=()=>t.year||"",x=()=>t.private==="true",I=()=>t.notes==="true",E=()=>t.repeat==="true",L=()=>t.missingStart==="true",R=()=>t.missingScore!=="false",U=()=>t.reverse==="true",G=()=>t.sort||"score",J=()=>t.userStatus||"",Y=()=>{if(t.isAdult==="true")return!0;if(t.isAdult==="false")return!1};let q;function le(){if(!window.Worker)return;q=q instanceof Worker?q:new _y;const Z={includeKeys:f(),excludeKeys:m(),search:C(),format:S(),status:b(),genre:A(),reverse:U(),countryOfOrigin:w(),missingStart:L(),missingScore:R(),isAdult:Y(),year:+_()||void 0,private:x(),notes:I(),repeat:E(),reviewsNeeded:k(),sort:G(),type:r.type,userStatus:J()};q.postMessage(Z),$(!0),q.onmessage=te=>{if(te.data==="success"){const X=Je.user();X.onsuccess=pe=>{const $e=pe.target.result,ne=Je.store($e,"data","readonly").get("compare_list");ne.onerror=()=>$(!1),ne.onsuccess=j=>{$(!1),h(j.target.result||[])}}}else $(!1),console.error("Error")}}return W(le),document.title=`Compare ${r.type} - LOB`,a(_c.Provider,{value:{compareMediaList:c,includeKeys:f,setIncludeKeys:g,setExcludeKeys:y,users:s,storeUsers:o,loading:v},get children(){var Z=Dy(),te=Z.firstChild,X=te.firstChild,pe=te.nextSibling,$e=pe.firstChild,he=$e.nextSibling,ne=he.firstChild,j=ne.nextSibling,Ue=he.nextSibling,et=Ue.firstChild,Re=et.nextSibling,tt=Re.nextSibling,Bt=tt.nextSibling,ct=Bt.nextSibling,yt=ct.nextSibling,dt=yt.nextSibling,nt=Ue.nextSibling,At=nt.firstChild,mt=At.nextSibling,rt=nt.nextSibling,re=rt.firstChild,Q=re.nextSibling,ve=rt.nextSibling,Te=ve.firstChild,Xe=Te.nextSibling,je=ve.nextSibling,Me=je.firstChild,Be=Me.nextSibling,Et=je.nextSibling,Jn=Et.nextSibling,Xn=Jn.firstChild;Xn.nextSibling;var Zn=Jn.nextSibling,Lr=Zn.firstChild,En=Zn.nextSibling,Ln=En.firstChild,it=En.nextSibling,an=it.firstChild,Qn=an.nextSibling,Pr=Qn.nextSibling,pi=Pr.nextSibling,er=pi.nextSibling,Pn=er.nextSibling,vi=Pn.nextSibling;vi.nextSibling;var Mn=it.nextSibling,$i=Mn.firstChild,ln=$i.nextSibling,ze=ln.nextSibling;return ze.firstChild,d(Z,a(l2,{}),te),d(X,a(H,{each:i,children:ge=>a(s2,{name:ge})})),$e.$$input=ge=>n({search:ge.target.value||void 0}),d(pe,a(T,{get when(){},get children(){var ge=wy(),sn=ge.firstChild,Zt=sn.firstChild,Mr=Zt.firstChild;return Zt.$$click=()=>navigate(""),d(Zt,a(T,{get when(){return r.list===void 0},children:"> "}),Mr),d(Zt,()=>null.data.total,null),d(ge,a(H,{get each(){return null.data.lists},children:Dn=>(()=>{var Dr=Ry(),Rn=Dr.firstChild,xt=Rn.firstChild;return Rn.$$click=()=>navigate(Dn.name),d(Rn,a(T,{get when(){return decodeURI(r.list)===Dn.name},children:"> "}),xt),d(Rn,()=>Dn.name,xt),d(Rn,()=>Dn.entries.length,null),Dr})()}),null),ge}}),he),he.addEventListener("change",ge=>n({format:ge.target.value||void 0})),d(he,a(T,{get when(){return S()},get children(){return ky()}}),j),Ue.addEventListener("change",ge=>n({userStatus:ge.target.value||void 0})),d(Ue,a(T,{get when(){return J()},get children(){return Sy()}}),Re),d(tt,a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})),d(dt,a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})),nt.addEventListener("change",ge=>n({status:ge.target.value||void 0})),d(nt,a(T,{get when(){return b()},get children(){return Cy()}}),mt),rt.addEventListener("change",ge=>n({genre:ge.target.value||void 0})),d(rt,a(T,{get when(){return A()},get children(){return Ay()}}),Q),ve.addEventListener("change",ge=>n({countryOfOrigin:ge.target.value||void 0})),d(ve,a(T,{get when(){return w()},get children(){return xy()}}),Xe),je.addEventListener("change",ge=>n({isAdult:ge.target.value||void 0})),d(je,a(T,{get when(){return Y()!==void 0},get children(){return Ty()}}),Be),Et.$$input=ge=>n({year:ge.target.value||void 0}),Xn.addEventListener("change",ge=>n({repeat:ge.target.checked?"true":void 0})),d(Jn,a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatched"}),a(M,{get when(){return r.type==="manga"},children:"Reread"})]}}),null),Lr.addEventListener("change",ge=>n({missingScore:ge.target.checked?void 0:"false"})),Ln.addEventListener("change",ge=>n({reverse:ge.target.checked?"true":void 0})),it.addEventListener("change",ge=>n({sort:ge.target.value==="score"?void 0:ge.target.value})),d(it,a(T,{get when(){return r.type==="manga"},get children(){return Iy()}}),an),d(it,a(T,{get when(){return r.type==="anime"},get children(){return Ey()}}),Qn),d(Pn,a(z,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatches"}),a(M,{get when(){return r.type==="manga"},children:"Rereads"})]}})),d(it,a(T,{get when(){return r.type==="manga"},get children(){return Ly()}}),null),ln.$$input=ge=>n({reviewsNeeded:ge.target.value==f().length?void 0:ge.target.value}),ln.$$beforeinput=ge=>{var sn;(sn=ge.data)!=null&&sn.toLowerCase().includes("e")&&ge.preventDefault()},ln.addEventListener("blur",ge=>n({reviewsNeeded:Number(ge.target.value)>=f().length?void 0:+ge.target.value||""})),d(ze,a(St,{tipPosition:"bottom",get children(){return["Count of how many users need to have the ",N(()=>r.type)," on their list ",Py()]}}),null),d(pe,a(z,{get children(){return a(M,{get when(){return new URLSearchParams(e.search).keys().some(ge=>ge!=="user")},get children(){var ge=My();return ge.$$click=()=>{n({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,reviewsNeeded:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0})},ge.style.setProperty("background","var(--crimson-400)"),ge}})}}),null),d(Z,a(o2,{}),null),P(ge=>{var sn=f().length,Zt=f().length+" (All)";return sn!==ge.e&&V(ln,"max",ge.e=sn),Zt!==ge.t&&V(ln,"placeholder",ge.t=Zt),ge},{e:void 0,t:void 0}),P(()=>$e.value=C()),P(()=>he.value=S()||""),P(()=>Ue.value=J()||""),P(()=>nt.value=b()||""),P(()=>rt.value=A()||""),P(()=>ve.value=w()||""),P(()=>je.value=Y()===void 0?"":String(Y())),P(()=>Et.value=_()),P(()=>Xn.checked=E()),P(()=>Lr.checked=R()),P(()=>Ln.checked=U()),P(()=>it.value=G()),P(()=>ln.value=k()),Z}})}function l2(){const[e,t]=O(""),[n,r]=O(0),[i,l]=O(void 0),{accessToken:s}=ie(),[o,{mutate:c}]=oe.anilist.searchUsers(i,1,s),u=tn(l,300),[h,f]=xe();let g;W(ce(n,y=>{const v=g==null?void 0:g.querySelectorAll("li")[y],$=g==null?void 0:g.querySelector("ol");if(!v||!$)return;const{height:C,top:S}=$.getBoundingClientRect(),{top:k,bottom:b}=v.getBoundingClientRect(),A=b-S-C;A>0&&($.scrollTop+=A);const w=k-S;w<0&&($.scrollTop+=w)}));function m(y){y=(y==null?void 0:y.trim())||"",y&&f({user:Tf([...or(h.user).add(y)])}),Ge(()=>{u(void 0),c(void 0),r(0),t("")})}return(()=>{var y=Oy(),v=y.firstChild;y.addEventListener("submit",C=>{var S,k,b;C.preventDefault(),m(((b=(k=(S=o())==null?void 0:S.data.users)==null?void 0:k[n()])==null?void 0:b.name)||e())}),y.$$keydown=C=>{var k,b,A;const S=((A=(b=(k=o())==null?void 0:k.data)==null?void 0:b.users)==null?void 0:A.length)||0;S&&(C.key==="ArrowDown"?(C.preventDefault(),r(w=>(w+1)%S)):C.key==="ArrowUp"&&(C.preventDefault(),r(w=>(S+w-1)%S)))};var $=g;return typeof $=="function"?fe($,y):g=y,v.$$input=C=>{Ge(()=>{t(C.target.value),r(0),u(C.target.value.trim()||void 0),c(void 0)})},d(y,a(T,{get when(){return e()},get children(){var C=Ny();return d(C,a(H,{get each(){var S;return(S=o())==null?void 0:S.data.users},children:(S,k)=>(()=>{var b=Fy(),A=b.firstChild;return b.addEventListener("mouseenter",()=>r(k())),b.$$click=()=>m(S.name),d(b,()=>S.name,null),P(w=>{var _=n()===k(),x=S.avatar.large;return _!==w.e&&b.classList.toggle("selected",w.e=_),x!==w.t&&V(A,"src",w.t=x),w},{e:void 0,t:void 0}),b})()})),C}}),null),P(()=>v.value=e()),y})()}function s2(e){F(e.name,"Name is missing");const t=ee(),{setIncludeKeys:n,setExcludeKeys:r,storeUsers:i}=Dl(),[l,s]=xe(),{accessToken:o}=ie(),[c,u]=Gs(()=>!Ys(l.disabled,e.name)),[h,f]=Gs(()=>Ys(l.exclude,e.name)),[g,{mutateCache:m}]=oe.anilist.mediaListByUserNameFetchOnce(()=>e.name,()=>t.type.toUpperCase(),o);function y(S,k){return c()&&h()===k?[...new Set([...S,g().cacheKey])]:S.filter(b=>b!==g().cacheKey)}function v(){n(S=>S.filter(k=>{var b;return k!==((b=g())==null?void 0:b.cacheKey)})),r(S=>S.filter(k=>{var b;return k!==((b=g())==null?void 0:b.cacheKey)})),s({user:We(l.user).filter(S=>S!==e.name)})}W(()=>{g()&&(i(g().data.user.name,g().data.user),g.indexedDBClosed&&(n(S=>y(S,!1)),r(S=>y(S,!0))))});const $=S=>{u(!S.target.checked),s({disabled:js(l.disabled,e.name,!S.target.checked)})},C=S=>{f(!S.target.checked),s({exclude:js(l.exclude,e.name,!S.target.checked)})};return(()=>{var S=Yy(),k=S.firstChild;return d(S,a(z,{get children(){return[a(M,{get when(){return g.error},get children(){var b=Uy(),A=b.firstChild,w=A.nextSibling;return w.nextSibling,d(b,()=>e.name,w),b}}),a(M,{get when(){return g()||g.loading},get children(){return[a(T,{get when(){return g()},get fallback(){return a(jn,{get children(){return a(St,{tipPosition:"right",get children(){return jy()}})}})},get children(){var b=By();return P(A=>{var w=g().data.user.avatar.large,_=g().data.user.name+" profile picture";return w!==A.e&&V(b,"src",A.e=w),_!==A.t&&V(b,"alt",A.t=_),A},{e:void 0,t:void 0}),b}}),(()=>{var b=Vy();return d(b,a(T,{get when(){return g()},get fallback(){return e.name},get children(){return g().data.user.name}})),b})(),(()=>{var b=Gy(),A=b.firstChild,w=A.nextSibling,_=w.nextSibling;return _.firstChild,A.addEventListener("change",$),d(_,a(St,{tipPosition:"bottom",children:"Disabling a user removes them from search and filtering, just like removing them."}),null),P(()=>A.checked=!c()),b})(),(()=>{var b=Hy(),A=b.firstChild,w=A.nextSibling,_=w.nextSibling;return _.firstChild,A.addEventListener("change",C),d(_,a(St,{tipPosition:"bottom",get children(){return["Filters out all ",N(()=>t.type)," from user ",N(()=>{var x,I,E;return((E=(I=(x=g())==null?void 0:x.data)==null?void 0:I.user)==null?void 0:E.name)||e.name})]}}),null),P(()=>A.checked=h()),b})()]}})]}}),k),k.$$click=()=>{var b;return v((b=g())==null?void 0:b.cacheKey)},P(b=>{var A=!c(),w=!!h();return A!==b.e&&S.classList.toggle("disabled",b.e=A),w!==b.t&&S.classList.toggle("exclude",b.t=w),b},{e:void 0,t:void 0}),S})()}function o2(){const{compareMediaList:e,loading:t,includeKeys:n}=Dl(),[r]=xe(),i=ee();return[(()=>{var l=zy(),s=l.firstChild,o=s.nextSibling;return o.nextSibling,d(l,()=>i.type,o),d(l,()=>e().length,null),l})(),(()=>{var l=Wy();return d(l,a(jn,{}),null),d(l,a(T,{get when(){return e()},keyed:!0,get children(){return a(u2,{})}}),null),P(()=>l.classList.toggle("loading",!!t())),l})(),a(T,{get when(){return e().length===0},get children(){return a(z,{fallback:"No content",get children(){return[a(M,{get when(){return t()},children:"Loading content"}),a(M,{get when(){return!r.user},children:"No users selected"}),a(M,{get when(){return n().length===0},children:"All users are disabled"})]}})}})]}const[c2,d2]=Ye([]);function u2(){const{compareMediaList:e,users:t}=Dl(),n=ee(),r=[];function i(c){r.push(c)}Tn(()=>{r.forEach(c=>o.observe(c))}),He(()=>{o.disconnect()});const l={rootMargin:"500px"},s=c=>{for(const u of c)d2(u.target.dataset.index,u.isIntersecting)},o=new IntersectionObserver(s,l);return a(H,{get each(){return e()},children:(c,u)=>(()=>{var h=t2(),f=h.firstChild;return fe(i,h,()=>!0),d(f,a(T,{get when(){return c2[u()]&&c.id!==-1},get children(){return[a(T,{get when(){return c.bannerImage},get children(){var g=qy();return P(()=>V(g,"src",c.bannerImage)),g}}),(()=>{var g=Qy(),m=g.firstChild,y=m.firstChild,v=y.firstChild;return d(m,a(T,{get when(){return c.repeat},get children(){var $=Do();return d($,a(St,{tipPosition:"right",get children(){return["Compined ",N(()=>n.type==="anime"?"rewatches":"rereads")," ",N(()=>c.repeat)]}}),null),d($,()=>c.repeat,null),d($,a(ei,{}),null),$}}),y),d(y,a(St,{tipPosition:"right",children:"Global average score"}),v),d(y,a(ma,{}),v),d(y,()=>c.averageScore/10||"N/A",null),d(g,a(B,{class:"cover-link",get href(){return Ve(c)},get children(){var $=Ky();return P(()=>V($,"src",c.coverImage.large)),$}}),null),d(g,a(T,{get when(){return c.episodes||c.chapters||c.volumes||c.score},get children(){var $=Zy(),C=$.firstChild;return d(C,a(z,{get children(){return[a(M,{get when(){return n.type==="anime"},get children(){return a(T,{get when(){return c.episodes},get children(){return["Ep ",N(()=>c.episodes)]}})}}),a(M,{get when(){return n.type==="manga"},get children(){return[a(T,{get when(){return c.chapters},get children(){return["Ch ",N(()=>c.chapters)]}}),Jy(),a(T,{get when(){return c.volumes},get children(){return["Vol ",N(()=>c.volumes)]}})]}})]}})),d($,a(T,{get when(){return c.score},get children(){var S=Xy();return d(S,()=>Math.round(c.score*100)/100,null),d(S,a(St,{tipPosition:"right",children:"Users average score"}),null),S}}),null),$}}),null),P(()=>V(g,"href",Ve(c))),g})(),(()=>{var g=e2(),m=g.firstChild,y=m.nextSibling,v=y.nextSibling;return d(m,()=>c.title.userPreferred),d(y,a(H,{get each(){return c.mediaEntries},children:$=>(()=>{var C=Ro();return d(C,a(B,{get href(){return"/user/"+$.name},class:"name",get children(){return[(()=>{var S=n2();return P(()=>V(S,"src",t[$.name].avatar.large)),S})(),N(()=>$.name)]}}),null),d(C,a(T,{get when(){return $.status!=="COMPLETED"},get children(){var S=r2();return d(S,()=>Pf($.status,n.type)),S}}),null),d(C,a(T,{get when(){return $.repeat},get children(){var S=Do();return d(S,()=>$.repeat,null),d(S,a(ei,{}),null),S}}),null),d(C,a(hs,{get score(){return $.score},get format(){return t[$.name].mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),C})()})),d(v,a(T,{get when(){var $;return($=Object.entries(Hn.ani.media).find(([,C])=>C.api===c.format))==null?void 0:$[0]},children:$=>(()=>{var C=Ro();return d(C,a(z,{get children(){return[a(M,{get when(){return c.countryOfOrigin!=="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()+"&country="+c.countryOfOrigin},get children(){return[N(()=>kr(c.format))," (",N(()=>jl(c.countryOfOrigin)),")"]}})}}),a(M,{get when(){return c.countryOfOrigin==="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+$()},get children(){return kr(c.format)}})}})]}})),C})()}),null),d(v,a(z,{get children(){return[a(M,{get when(){return n.type==="manga"},get children(){return a(z,{get children(){return[a(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return a(B,{get href(){return"/search/manga?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){return n.type==="anime"},get children(){return a(z,{get children(){return[a(M,{get when(){return c.seasonYear&&c.season},get children(){return a(B,{get href(){return"/search/anime/"+c.season.toLowerCase()+"-"+c.seasonYear},get children(){return[N(()=>qe(c.season))," ",N(()=>c.seasonYear)]}})}}),a(M,{get when(){var $;return($=c.startDate)==null?void 0:$.year},get children(){return a(B,{get href(){return"/search/anime?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var $;return(($=c.startDate)==null?void 0:$.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}}),null),g})()]}})),P(g=>{var m=u(),y=c.coverImage.color;return m!==g.e&&V(h,"data-index",g.e=m),y!==g.t&&((g.t=y)!=null?h.style.setProperty("--color",y):h.style.removeProperty("--color")),g},{e:void 0,t:void 0}),h})()})}_e(["input","click","beforeinput","keydown"]);var h2=p("<button>Watch trailer"),g2=p("<iframe frameborder=0 allowfullscreen>"),f2=p("<dialog class=cp-trailer-dialog><div class=wrapper><form method=dialog class=close><button>Close trailer");function hu(e){const[t,n]=O(!1);let r;return a(T,{get when(){return e.id},get children(){return[(()=>{var i=h2();return i.$$click=()=>{r.showModal(),n(!0)},i})(),(()=>{var i=f2(),l=i.firstChild,s=l.firstChild;i.$$click=c=>c.target===r&&r.close();var o=r;return typeof o=="function"?fe(o,i):r=i,i.addEventListener("close",()=>n(!1)),d(l,a(T,{get when(){return t()},get children(){return a(z,{get children(){return a(M,{get when(){return e.site==="youtube"},get children(){var c=g2();return P(()=>V(c,"src","https://www.youtube-nocookie.com/embed/"+e.id+"?enablejsapi=1&wmode=opaque&autoplay=1")),c}})}})}}),s),i})()]}})}_e(["click"]);var m2=p("<div data-k-0bff354a class=scores><div data-k-0bff354a><p data-k-0bff354a>Mean</p><span data-k-0bff354a></span></div><div data-k-0bff354a><p data-k-0bff354a>Average</p><span data-k-0bff354a></span></div><p data-k-0bff354a class=anilist-users> Users</p><div data-k-0bff354a><p data-k-0bff354a>MAL</p><span data-k-0bff354a></span></div><p data-k-0bff354a> Users");function gu(){const{anilistData:e,jikanData:t}=fn();return(()=>{var n=m2(),r=n.firstChild,i=r.firstChild,l=i.nextSibling,s=r.nextSibling,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=u.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling,v=y.firstChild;return d(l,a(T,{get when(){var $,C;return((C=($=e())==null?void 0:$.data)==null?void 0:C.meanScore)>0},fallback:"N/A",get children(){var $,C;return((((C=($=e())==null?void 0:$.data)==null?void 0:C.meanScore)||0)/10).toFixed(1)}})),d(c,a(T,{get when(){var $,C;return((C=($=e())==null?void 0:$.data)==null?void 0:C.averageScore)>0},fallback:"N/A",get children(){var $,C;return((((C=($=e())==null?void 0:$.data)==null?void 0:C.averageScore)||0)/10).toFixed(1)}})),d(u,a(T,{get when(){var $,C,S;return(S=(C=($=e())==null?void 0:$.data)==null?void 0:C.stats.scoreDistribution)==null?void 0:S.reduce((k,b)=>b.amount+k,0)},fallback:"-",get children(){var $,C,S;return la((S=(C=($=e())==null?void 0:$.data)==null?void 0:C.stats.scoreDistribution)==null?void 0:S.reduce((k,b)=>b.amount+k,0))}}),h),d(m,a(z,{fallback:"N/A",get children(){return[a(M,{get when(){return t.loading},children:"..."}),a(M,{get when(){var $;return(($=t())==null?void 0:$.data.score)>0},get children(){return(t().data.score||0).toFixed(2)}})]}})),d(y,a(T,{get when(){var $,C;return(C=($=t())==null?void 0:$.data)==null?void 0:C.scored_by},fallback:"-",get children(){return la(t().data.scored_by)}}),v),n})()}var p2=p('<svg class=svg-external-source xmlns=http://www.w3.org/2000/svg viewBox="4 3 17 17"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7">');function fu(){return p2()}var v2=p('<svg aria-hidden=true class=svg-link focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">');function $2(){return v2()}var _2=p("<li data-k-e748b7cf><a data-k-e748b7cf target=_blank>"),b2=p("<div data-k-e748b7cf class=external><h2 data-k-e748b7cf>External links</h2><ul data-k-e748b7cf>"),y2=p('<img data-k-e748b7cf alt="Site favicon.">'),w2=p("<sup data-k-e748b7cf>"),k2=p("<li data-k-e748b7cf class=cp-external-link><div data-k-e748b7cf class=icon></div><span data-k-e748b7cf><a data-k-e748b7cf target=_blank>");function mu(e){return a(at,{fallback:"External links error",get children(){return a(T,{get when(){var t;return e.hastag||((t=e.externalLinks)==null?void 0:t.length)},get children(){var t=b2(),n=t.firstChild,r=n.nextSibling;return d(r,a(T,{get when(){return e.hashtag},get children(){var i=_2(),l=i.firstChild;return d(l,()=>e.hashtag),P(()=>V(l,"href",`https://nitter.net/search?q=${e.hashtag.replaceAll("#","%23")}`)),i}}),null),d(r,a(H,{get each(){return e.externalLinks},children:i=>(()=>{var l=k2(),s=l.firstChild,o=s.nextSibling,c=o.firstChild;return d(s,a(T,{get when(){return i.icon},get fallback(){return a($2,{})},get children(){var u=y2();return P(()=>V(u,"src",i.icon)),u}})),d(c,()=>i.site||i.name),d(o,a(T,{get when(){return i.language},get children(){var u=w2();return d(u,a(z,{get fallback(){return i.language},get children(){return[a(M,{get when(){return i.language==="Japanese"},children:"JP"}),a(M,{get when(){return i.language==="English"},children:"EN"})]}})),u}}),null),d(o,a(T,{get when(){return i.notes},get children(){return[" (",N(()=>i.notes),")"]}}),null),P(u=>{var h=i.color,f=i.url;return h!==u.e&&((u.e=h)!=null?s.style.setProperty("background",h):s.style.removeProperty("background")),f!==u.t&&V(c,"href",u.t=f),u},{e:void 0,t:void 0}),l})()}),null),t}})}})}var S2=p("<span class=visually-hidden>Switch to anilist mode"),C2=p("<div><h2>Studios</h2><ol>"),A2=p("<div><h2>Producers</h2><ol>"),x2=p("<aside class=left><img alt=Cover><div class=cp-media-api-switcher><a class=active target=_black><span class=visually-hidden>Go to MyAnimeList"),T2=p("<li>Source: "),I2=p("<div class=header><h1></h1><ul class=flex-bullet-separator><li></li><li></li><li></li></ul><ul><li>Members: </li><li>Ranked: #</li><li>Popularity: #"),E2=p("<div class=pg-media-info-jikan><div class=body>"),No=p("<li><a target=_black>"),L2=p("<li>Author<!>: "),P2=p("<a>"),M2=p("<div class=pg-media-jikan-desc>"),D2=p("<div><strong>Background"),R2=p("<div class=relations><h2>Relations</h2><ol class=grid-column-auto-fill>"),N2=p("<h2>Characters"),Oo=p("<div><ol class=grid-column-auto-fill>"),O2=p("<h2>Staff"),F2=p('<p class="name line-clamp">'),U2=p("<p class=type> (<!>)"),B2=p("<li>");function V2(e){const t=ee(),{accessToken:n}=ie(),r=Pe(Pc,()=>t.type,()=>t.id),i=Cn({"only-if-cached":()=>ci()}),[l]=Sn(i,r),s=Pe(Ic,n,()=>t.type,()=>t.id),[o,{mutateBoth:c}]=Qe(s),[u,h]=O();P(ce(o,g=>{var m;h(((m=g==null?void 0:g.data)==null?void 0:m.isFavourite)??!1)}));const f=(g,m)=>{var v,$,C,S;const y=m[($=(v=o())==null?void 0:v.data)==null?void 0:$.type]??null;((S=(C=o())==null?void 0:C.data)==null?void 0:S.id)===y&&(h(g),c(k=>(k.data.isFavourite=g,k)))};return a(at,{fallback:"Jikan media error",get children(){return a(Rl.Provider,{value:{anilistData:o,jikanData:l},get children(){var g=E2(),m=g.firstChild;return d(g,a(T,{get when(){return l()},get children(){var y=x2(),v=y.firstChild,$=v.nextSibling,C=$.firstChild;return C.firstChild,d($,a(T,{get when(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.id},get children(){return a(B,{get href(){var S,k,b,A;return"/ani/"+t.type+"/"+((k=(S=o())==null?void 0:S.data)==null?void 0:k.id)+"/"+Yn((A=(b=o())==null?void 0:b.data)==null?void 0:A.title.userPreferred)},get children(){return[S2(),a(ss,{})]}})}}),C),d(C,a(os,{}),null),d(C,a(fu,{}),null),d(y,a(gu,{}),null),d(y,a(Er,{get checked(){return u()},onChange:h,get idType(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.type},get variableId(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.id},get anilistValue(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.favourites},get jikanValue(){var S;return(S=l())==null?void 0:S.data.favorites},mutateCache:f}),null),d(y,a(hu,{get id(){var S,k;return(k=(S=l())==null?void 0:S.data.trailer)==null?void 0:k.youtube_id},site:"youtube"}),null),d(y,a(T,{get when(){var S,k;return(k=(S=l())==null?void 0:S.data.studios)==null?void 0:k.length},get children(){var S=C2(),k=S.firstChild,b=k.nextSibling;return d(b,a(H,{get each(){var A;return(A=l())==null?void 0:A.data.studios},children:A=>(()=>{var w=No(),_=w.firstChild;return d(_,()=>A.name),P(()=>V(_,"href",A.url)),w})()})),S}}),null),d(y,a(T,{get when(){var S,k;return(k=(S=l())==null?void 0:S.data.producers)==null?void 0:k.length},get children(){var S=A2(),k=S.firstChild,b=k.nextSibling;return d(b,a(H,{get each(){var A;return(A=l())==null?void 0:A.data.producers},children:A=>(()=>{var w=No(),_=w.firstChild;return d(_,()=>A.name),P(()=>V(_,"href",A.url)),w})()})),S}}),null),d(y,a(mu,{get externalLinks(){var S;return(S=l())==null?void 0:S.data.external}}),null),P(S=>{var A;var k=l().data.images.webp.large_image_url,b=(A=l())==null?void 0:A.data.url;return k!==S.e&&V(v,"src",S.e=k),b!==S.t&&V(C,"href",S.t=b),S},{e:void 0,t:void 0}),y}}),m),d(m,a(T,{get when(){return l()},get children(){var y=I2(),v=y.firstChild,$=v.nextSibling,C=$.firstChild,S=C.nextSibling,k=S.nextSibling,b=$.nextSibling,A=b.firstChild;A.firstChild;var w=A.nextSibling;w.firstChild;var _=w.nextSibling;return _.firstChild,d(v,()=>l().data.title),d(C,a(z,{get children(){return[a(M,{get when(){return N(()=>!!l().data.year)()&&l().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+l().data.year+"&season="+l().data.season+"&malSearch=true"},get children(){return[N(()=>qs(l().data.season))," ",N(()=>l().data.year)]}})}}),a(M,{get when(){return l().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?season="+l().data.season+"&malSearch=true"},get children(){return qs(l().data.season)}})}}),a(M,{get when(){return l().data.year},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+l().data.year+"&malSearch=true"},get children(){return l().data.year}})}}),a(M,{get when(){var x,I,E,L,R,U;return((E=(I=(x=l().data.aired)==null?void 0:x.prop)==null?void 0:I.from)==null?void 0:E.year)||((U=(R=(L=l().data.published)==null?void 0:L.prop)==null?void 0:R.from)==null?void 0:U.year)},children:x=>a(B,{get href(){return"/search/"+t.type+"?year="+x()+"&malSearch=true"},get children(){return x()}})}),a(M,{get when(){var x,I,E,L,R,U;return((E=(I=(x=l().data.aired)==null?void 0:x.prop)==null?void 0:I.to)==null?void 0:E.year)||((U=(R=(L=l().data.published)==null?void 0:L.prop)==null?void 0:R.to)==null?void 0:U.year)},children:x=>a(B,{get href(){return"/search/"+t.type+"?year="+x()+"&malSearch=true"},get children(){return x()}})}),a(M,{get when(){return l().data.status==Ac},get children(){return a(B,{get href(){return"/search/"+t.type+"/tba"},children:"TBA"})}})]}})),d(S,a(B,{get href(){return"/search/"+t.type+"?format="+l().data.type.toLowerCase()+"&malSearch=true"},get children(){return l().data.type}})),d(k,()=>{var x;return zf((x=l())==null?void 0:x.data.status)}),d(b,a(T,{get when(){var x;return(x=l())==null?void 0:x.data.source},get children(){var x=T2();return x.firstChild,d(x,a(B,{get href(){return"/search/"+t.type+"?source="+l().data.source},get children(){var I;return(I=l())==null?void 0:I.data.source}}),null),x}}),A),d(A,()=>la(l().data.members||0)||"N/A",null),d(w,()=>l().data.rank||"N/A",null),d(_,()=>l().data.popularity||"N/A",null),d(b,a(T,{get when(){var x;return(x=l().data.authors)==null?void 0:x.length},children:x=>(()=>{var I=L2(),E=I.firstChild,L=E.nextSibling;return L.nextSibling,d(I,()=>Kf(x()),L),d(I,a(H,{get each(){return l().data.authors},children:(R,U)=>[(()=>{var G=P2();return d(G,()=>R.name),P(()=>V(G,"href",R.url)),G})(),a(T,{get when(){return U()<x()-1},children:" & "})]}),null),I})()}),null),y}}),null),d(m,()=>e.children,null),g}})}})}function G2(){const e=ee(),{jikanData:t}=fn(),n=Pe(Mc,()=>e.type,()=>e.id),r=Cn({"only-if-cached":()=>ci()||t.loading}),[i]=Sn(r,n),l=Pe(Dc,()=>e.type,()=>e.id),s=Cn({"only-if-cached":()=>Sf()||i.loading}),[o]=Sn(s,l);return[a(T,{get when(){return t()},get children(){return[a(T,{get when(){return t().data.synopsis},get children(){var c=M2();return d(c,a(Xa,{get text(){return t().data.synopsis},singleLineBreaks:!0})),c}}),a(T,{get when(){return t().data.background},get children(){var c=D2();return c.firstChild,d(c,a(Xa,{get text(){return t().data.background}}),null),c}}),a(T,{get when(){var c;return(c=t().data.relations)==null?void 0:c.length},get children(){var c=R2(),u=c.firstChild,h=u.nextSibling;return d(h,a(H,{get each(){return t().data.relations},children:f=>a(H,{get each(){return f.entry},children:g=>(()=>{var m=B2();return d(m,a(B,{class:"item",get href(){return hd(g.type,{mal_id:g.mal_id,title:g.name})},get children(){return[(()=>{var y=F2();return d(y,()=>g.name),y})(),(()=>{var y=U2(),v=y.firstChild,$=v.nextSibling;return $.nextSibling,d(y,()=>f.relation,v),d(y,()=>Sr(g.type),$),y})()]}})),m})()})})),c}}),a(T,{get when(){return i()},get children(){var c=Oo(),u=c.firstChild;return d(c,a(B,{href:"characters",get children(){return N2()}}),u),d(u,a(H,{get each(){return i().data.slice(0,6)},children:({voice_actors:h,...f})=>a(Hd,Oe({get voiceActor(){return If(h,({language:g})=>g===Cc)}},f))})),c}}),a(T,{get when(){return o()},get children(){var c=Oo(),u=c.firstChild;return d(c,a(B,{href:"staff",get children(){return O2()}}),u),d(u,a(H,{get each(){return o().data.slice(0,6)},children:({person:h,positions:f})=>a(ls,{staff:h,positions:f})})),c}}),N(()=>console.log("jikan",t()))]}}),N(()=>console.log("characters",i()))]}let Sl,Cl;function H2({target:e}){const t=e.querySelector("[data-tooltip-positions]");t&&(Sl=t,ti(t))}function pu(){Cl&&ti(Cl),Sl&&ti(Sl)}let qi;function vu({target:e}){if(e===qi||!e)return;qi=e;const t=e.matches("[data-tooltip-trigger]")?e:e.closest("[data-tooltip-trigger]");if(!t)return;const n=t.querySelector("[data-tooltip-positions]");let r=0;i();function i(){t.matches(":hover")?(Cl=n,ti(n)):(r++<500||qi!==e)&&requestAnimationFrame(i)}}function ti(e){const t=e.dataset.tooltipPositions.split(" "),n=e.closest("[data-tooltip-wrapper]"),r=n==null?void 0:n.getBoundingClientRect(),i=document.body.getBoundingClientRect(),l=e.classList.value;for(const s of t){e.classList.remove(...t),e.classList.add(s);let o=e.getBoundingClientRect();if(!(r&&(o.left<r.left||o.right>r.right||o.top<r.top||o.bottom>r.bottom))&&!(o.left<0||o.right>i.width||o.top<0||o.bottom>i.height))return}e.classList=l}window.addEventListener("focusin",H2);window.addEventListener("pointermove",vu);window.addEventListener("pointerdown",vu);window.addEventListener("scroll",pu,{passive:!0});window.addEventListener("resize",pu,{passive:!0});var Y2=p("<select>"),j2=p("<div><ol>"),z2=p("<option>");function W2(){const e=ee(),{jikanData:t}=fn(),n=Pe(Mc,()=>e.type,()=>e.id),r=Cn({"only-if-cached":()=>ci()||t.loading}),[i]=Sn(r,n),[l,s]=Hl(Cc),o=N(()=>{var f;const c=new Set,u=(f=i())==null?void 0:f.data;if(!(u!=null&&u.length))return[];u.forEach(g=>{var m;(m=g.voice_actors)==null||m.forEach(y=>c.add(y.language))});const h=[...c].sort();return s(g=>c.has(g)?g:h[0]),h});return a(at,{fallback:"MAL characters error",get children(){return a(T,{get when(){return t()},get children(){return a(T,{get when(){return i()},get children(){var c=j2(),u=c.firstChild;return d(c,a(T,{get when(){return o().length},get children(){var h=Y2();return h.addEventListener("change",f=>s(f.target.value)),d(h,a(H,{get each(){return o()},children:f=>(()=>{var g=z2();return g.value=f,d(g,f),g})()})),P(()=>h.value=l()),h}}),u),d(u,a(H,{get each(){return i().data},children:({voice_actors:h,...f})=>a(Hd,Oe({get voiceActor(){return h==null?void 0:h.find(g=>g.language===l())},get language(){return l()}},f))})),P(()=>u.className=`grid-column-auto-fill ${e.type||""}`),c}})}})}})}var q2=p("<div><ol class=grid-column-auto-fill>");function K2(){const e=ee(),{jikanData:t}=fn(),n=Pe(Dc,ha,()=>e.id),r=Cn({"only-if-cached":()=>ci()||t.loading}),[i]=Sn(r,n);return a(at,{fallback:"MAL staff page error",get children(){return a(T,{get when(){return t()},get children(){return a(T,{get when(){return i()},get children(){var l=q2(),s=l.firstChild;return d(s,a(H,{get each(){return i().data},children:({person:o,positions:c})=>a(ls,{staff:o,positions:c})})),l}})}})}})}var Fo=p('<ol data-k-eb389524 class="grid-column-auto-fill card">'),J2=p("<ol data-k-eb389524 class=grid-column-auto-fill>"),X2=p('<div data-k-eb389524 class="page-normal pg-jikan-character"><div data-k-eb389524 class=header><img data-k-eb389524 alt="Character profile."><div data-k-eb389524 class=grid><div data-k-eb389524><h1 data-k-eb389524></h1><p data-k-eb389524></p></div></div><div data-k-eb389524>'),Z2=p("<details data-k-eb389524 open><summary data-k-eb389524><h2 data-k-eb389524>");function Q2(){const e=ee(),t=Pe(pg,()=>e.id),[n]=Qe(t);return P(()=>{var i,l;const r=(l=(i=n())==null?void 0:i.data)==null?void 0:l.name;r&&(document.title=r)}),a(at,{fallback:"Jikan character error",get children(){return a(T,{get when(){return n()},get children(){var r=X2(),i=r.firstChild,l=i.firstChild,s=l.nextSibling,o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=s.nextSibling;return d(c,()=>n().data.name),d(u,()=>Af(n().data.name_kanji,n().data.nicknames).join(", ")),d(s,a(Er,{get jikanValue(){return n().data.favorites}}),null),d(h,a(Xa,{get text(){return n().data.about},singleLineBreaks:!0})),d(r,a(Ki,{title:"Anime",get children(){var f=Fo();return d(f,a(H,{get each(){return n().data.anime},children:g=>a(vl,{type:"anime",get media(){return g.anime}})})),f}}),null),d(r,a(Ki,{title:"Manga",get children(){var f=Fo();return d(f,a(H,{get each(){return n().data.manga},children:g=>a(vl,{type:"manga",get media(){return g.manga}})})),f}}),null),d(r,a(Ki,{title:"Voice actors",get children(){var f=J2();return d(f,a(H,{get each(){return n().data.voices},children:g=>a(ls,{get staff(){return g.person},get positions(){return[g.language]}})})),f}}),null),P(()=>V(l,"src",n().data.images.webp.image_url)),r}})}})}function Ki(e){return(()=>{var t=Z2(),n=t.firstChild,r=n.firstChild;return d(r,()=>e.title),d(t,()=>e.children,null),t})()}var ew=p("<div data-k-47610970><h3 data-k-47610970>Activity</h3><div data-k-47610970 class=activity-history-container><ol data-k-47610970 class=activity-history-header-list></ol><ol data-k-47610970 class=activity-history-list>"),tw=p("<li data-k-47610970 class=activity-history-header>"),nw=p("<li data-k-47610970 class=activity-item>"),rw=p("<p data-k-47610970>"),aw=p("<p data-k-47610970>Amount: ");function iw(e){const t=lw()/1e3,n=N(()=>{var u,h,f;const l=new Date/1e3,s=[];(u=e.history)==null||u.forEach((g,m,y)=>{var $;const v=g.date-jf(($=y[m-1])==null?void 0:$.date,t-nr);if(!(g.date<t||g.date>l+nr)){for(let C=Math.floor(v/nr)-1;C>0;C--)s.push({date:g.date-nr*C});s.push(g)}});const o=(f=(h=e.history)==null?void 0:h.at(-1))==null?void 0:f.date,c=Math.floor((l-o)/nr);for(let g=1;g<c;g++)s.push({date:o+nr*g});return s}),r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return a(T,{get when(){return e.history.at(-1).date>t},get children(){var l=ew(),s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling;return d(c,a(H,{each:r,children:(h,f)=>(()=>{var g=tw();return d(g,()=>Ef(r,f()+$u)),g})()})),d(u,a(H,{get each(){return n()},children:h=>(()=>{var f=nw();return d(f,a(i,{get date(){return h.date*1e3},get amount(){return h.amount}})),P(()=>V(f,"data-level",h.level)),f})()})),l}});function i(l){const s=o=>{if(o<(t+5184e3)*1e3)return"right";if(o>(t+10368e3)*1e3)return"left"};return a(St,{get tipPosition(){return s(l.date)},get children(){return[(()=>{var o=rw();return d(o,()=>od(l.date)),o})(),(()=>{var o=aw();return o.firstChild,d(o,()=>l.amount||0,null),o})()]}})}}const $u=1,lw=()=>{const[e]=new Date().toISOString().split("T"),t=new Date(`${e}T00:00`);return t.setDate(t.getDate()-182),t.setDate(t.getDate()-t.getDay()+$u),t.getTime()};var sw=p("<p>"),ow=p("<p> (fancy)"),cw=p("<p> (extra fancy)"),dw=p("<div class=user-favourites><h3>Favourite animes</h3><ol class=grid-reel-auto-fill>"),uw=p("<div class=user-favourites><h3>Favourite manga</h3><ol class=grid-reel-auto-fill>"),hw=p("<div class=user-favourites><h3>Favourite characters</h3><ol class=grid-reel-auto-fill>"),gw=p("<div class=user-favourites><h3>Favourite staff</h3><ol class=grid-reel-auto-fill>"),fw=p("<div class=user-favourites-studio><h3>Favourite studio</h3><ol>"),mw=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total anime</p></div><div class=profile-progress-item><p class=header></p><p>Days watched</p></div><div class=profile-progress-item><p class=header></p><p>Episodes watched</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),pw=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total manga</p></div><div class=profile-progress-item><p class=header></p><p>Chapters read</p></div><div class=profile-progress-item><p class=header></p><p>Volumes read</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),vw=p("<div class=user-profile-overview-body><div class=user-info-container></div><div class=user-activity-container><div class=user-profile-progress></div><div class=user-profile-genres></div><div class=user-profile-activity>"),Ma=p("<img alt=Cover>"),ir=p("<li class=item>"),$w=p("<div class=user-genres-overview><h3></h3><ol>"),_w=p("<span>%");function bw(){const{user:e}=Ze(),{accessToken:t}=ie(),[n,{mutateCache:r}]=oe.anilist.activityByUserId(()=>e().id||void 0,t);return(()=>{var i=vw(),l=i.firstChild,s=l.nextSibling,o=s.firstChild,c=o.nextSibling,u=c.nextSibling;return d(l,a(z,{get children(){return[a(M,{get when(){return e().donatorTier===1},get children(){var h=sw();return d(h,()=>e().donatorBadge),h}}),a(M,{get when(){return e().donatorTier===2},get children(){var h=ow(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}}),a(M,{get when(){return e().donatorTier===3},get children(){var h=cw(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}})]}}),null),d(l,a(iw,{get history(){var h;return((h=e().stats)==null?void 0:h.activityHistory)||[]}}),null),d(l,a(T,{get when(){return e().favourites.anime.edges.length},get children(){var h=dw(),f=h.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.anime.edges},children:m=>(()=>{var y=ir();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Ma();return P(()=>V(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.manga.edges.length},get children(){var h=uw(),f=h.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.manga.edges},children:m=>(()=>{var y=ir();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Ma();return P(()=>V(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.characters.edges.length},get children(){var h=hw(),f=h.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.characters.edges},children:m=>(()=>{var y=ir();return d(y,a(B,{get href(){return"/ani/character/"+m.node.id+"/"+Ke(m.node.name.userPreferred)},get children(){var v=Ma();return P(()=>V(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.staff.edges.length},get children(){var h=gw(),f=h.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.staff.edges},children:m=>(()=>{var y=ir();return d(y,a(B,{get href(){return"/ani/staff/"+m.node.id+"/"+Ke(m.node.name.userPreferred)},get children(){var v=Ma();return P(()=>V(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.studios.edges.length},get children(){var h=fw(),f=h.firstChild,g=f.nextSibling;return d(g,a(H,{get each(){return e().favourites.studios.edges},children:m=>(()=>{var y=ir();return d(y,a(B,{get href(){return"/ani/studio/"+m.node.id+"/"+Ke(m.node.name)},get children(){return m.node.name}})),y})()})),h}}),null),d(o,a(T,{get when(){return e().statistics.anime.count},get children(){var h=mw(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,C=v.nextSibling,S=C.firstChild;return d(g,()=>ye(e().statistics.anime.count)),d(y,()=>(e().statistics.anime.minutesWatched/60/24).toFixed(1)),d($,()=>ye(e().statistics.anime.episodesWatched)),d(S,()=>e().statistics.anime.meanScore),h}}),null),d(o,a(T,{get when(){return e().statistics.manga.count},get children(){var h=pw(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,$=v.firstChild,C=v.nextSibling,S=C.firstChild;return d(g,()=>ye(e().statistics.manga.count)),d(y,()=>ye(e().statistics.manga.chaptersRead)),d($,()=>ye(e().statistics.manga.volumesRead)),d(S,()=>e().statistics.manga.meanScore),h}}),null),d(c,a(Uo,{title:"Anime genre overview",type:"anime",get genres(){return e().statistics.anime.genrePreview},get total(){return e().statistics.anime.count}}),null),d(c,a(Uo,{title:"Manga genre overview",type:"manga",get genres(){return e().statistics.manga.genrePreview},get total(){return e().statistics.manga.count}}),null),d(u,a(H,{get each(){var h;return(h=n())==null?void 0:h.data.data.Page.activities},children:h=>a(rs,{activity:h,mutateCache:r,hideProfile:!0,small:!0})})),i})()}function Uo(e){F(e.genres,"Genres missing"),F(e.title,"Title missing");const{user:t}=Ze();return a(T,{get when(){return e.total},get children(){var n=$w(),r=n.firstChild,i=r.nextSibling;return d(r,()=>e.title),d(i,a(H,{get each(){return e.genres},children:l=>(()=>{var s=ir();return d(s,a(B,{get href(){return"/user/"+t().name+"/"+e.type+"?genre="+l.genre},get children(){return[N(()=>l.genre)," ",(()=>{var o=_w(),c=o.firstChild;return d(o,()=>Math.round(l.count/e.total*100),c),o})()]}})),s})()})),n}})}function yw(e){return new Worker("/legendary-octo-barnacle/branches/feature-add-sorting-options-to-compare-page/assets/user-media-list-O67hlifX.js",{name:e==null?void 0:e.name})}var ww=p("<button data-k-cd7ed032>+");function Ji(e){const[t,n]=O(e.entry[e.progressKey]),{triggerProgressIncrease:r,isOwnProfile:i}=Ml();return W(ce(()=>e.entry,l=>n(l[e.progressKey]),{defer:!0})),[N(()=>e.label)," ",N(t),a(T,{get when(){return t()<e.entry.media[e.maxProgressKey]},get children(){return["/",N(()=>e.entry.media[e.maxProgressKey])]}}),a(T,{get when(){return i()},get children(){return a(T,{get when(){return e.entry.media[e.maxProgressKey]===null||t()<e.entry.media[e.maxProgressKey]},get children(){var l=ww();return l.$$click=s=>{s.preventDefault(),n(o=>{const c=Math.min(e.entry.media[e.maxProgressKey]||o+1,o+1);return r(e.entry.media.id,c,e.progressKey),c})},l}})}})]}_e(["click"]);var kw=p("<br>"),Sw=p("<p>");function Cw(e){return(()=>{var t=Sw();return d(t,a(z,{get children(){return[a(M,{get when(){return e.entry.media.type==="ANIME"},get children(){return a(Ji,Oe(e,{label:"Ep",progressKey:"progress",maxProgressKey:"episodes"}))}}),a(M,{get when(){return e.entry.media.type==="MANGA"},get children(){return[a(Ji,Oe(e,{label:"Ch",progressKey:"progress",maxProgressKey:"chapters"})),kw(),a(Ji,Oe(e,{label:"Vol",progressKey:"progressVolumes",maxProgressKey:"volumes"}))]}})]}})),t})()}var Aw=p("<div data-k-406f27d4>"),_u=p("<h2 data-k-406f27d4>"),bu=p("<ol data-k-406f27d4 class=user-profile-media-list-grid>"),xw=p('<div data-k-406f27d4 class="badge repeat">'),Tw=p('<div data-k-406f27d4 class="badge notes"><svg data-k-406f27d4 aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path data-k-406f27d4 fill=currentColor d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z">'),Iw=p("<p data-k-406f27d4 class=adult-warning>18+"),Ew=p("<div data-k-406f27d4 class=container><img data-k-406f27d4 class=cover alt=Cover.><div data-k-406f27d4 class=card-header></div><div data-k-406f27d4 class=card-footer><p data-k-406f27d4></p><div data-k-406f27d4 class=scores>"),yu=p("<li data-k-406f27d4 class=card>");function Lw(e){const[t,n]=Ye({}),r=ee(),{user:i}=Ze(),{openEditor:l}=Pl(),{isOwnProfile:s}=Ml(),o=u=>{for(const h of u)n(h.target.dataset.list,h.target.dataset.index,h.isIntersecting)},c=new IntersectionObserver(o,{rootMargin:"500px"});return He(()=>{c.disconnect()}),W(()=>{var u,h;(u=e.listData())!=null&&u.data&&(wu[r.name]=(h=e.listData())==null?void 0:h.data.lists.map(f=>({name:f.name,entries:new Int8Array(f.entries.length)})))}),(()=>{var u=Aw();return d(u,a(T,{get when(){var h;return(h=e.listData())==null?void 0:h.data},get fallback(){return a(Pw,{})},get children(){return a(H,{get each(){return e.listData().data.lists},children:h=>(n(h.name,{}),a(T,{get when(){return N(()=>!!h.entries.length)()&&(!r.list||decodeURI(r.list)===h.name)},get children(){return[(()=>{var f=_u();return d(f,()=>h.name),f})(),(()=>{var f=bu();return d(f,a(H,{get each(){return h.entries},children:(g,m)=>{let y;return Tn(()=>c.observe(y)),He(()=>c.unobserve(y)),(()=>{var v=yu(),$=y;return typeof $=="function"?fe($,v):y=v,d(v,a(T,{get when(){return t[h.name][m()]},get children(){return a(B,{class:"clean-link",get href(){return Ve(g.media)},get children(){var C=Ew(),S=C.firstChild,k=S.nextSibling,b=k.nextSibling,A=b.firstChild,w=A.nextSibling;return d(k,a(T,{get when(){return g.repeat},get children(){var _=xw();return d(_,()=>g.repeat,null),d(_,a(ei,{}),null),P(()=>V(_,"label","Rewatched "+g.repeat+" times")),_}}),null),d(k,a(T,{get when(){return g.notes},get children(){var _=Tw();return P(()=>V(_,"label",g.notes)),_}}),null),d(b,a(T,{get when(){return g.media.isAdult},get children(){return Iw()}}),A),d(A,()=>g.media.title.userPreferred),d(w,a(Cw,{entry:g}),null),d(w,a(hs,{get score(){return g.score},get format(){return i().mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),d(C,a(T,{get when(){return s()},get children(){return a(Rd,{big:!0,label:"Edit media",onClick:_=>{_.preventDefault(),l({...g.media,mediaListEntry:g},{mutateMedia:x=>{x=Mf(g,x),e.mutateMediaListCache(I=>{function E(L,R){const U=I.data.lists.findIndex(J=>J.name===L&&J.isCustomList===R);U===-1&&I.data.lists.push({name:L,isCustomList:!1,isCompletedList:!1,entries:[]});const G=I.data.lists.at(U);G.entries.push(x),e.listData().data.indecies[g.media.id].push([U===-1?I.data.lists.length-1:U,G.entries.length-1])}if(e.listData().data.indecies[g.media.id].forEach(([L,R])=>{I.data.lists[L].entries.splice(R,1)}),e.listData().data.indecies[g.media.id]=[],!x.hiddenFromStatusLists){const L=Su(x.status,r.type);E(L,!1)}for(const[L,R]of Object.entries(x.customLists??{}))R&&E(L,!0);return I},e.updateListInfo)},deleteMedia:()=>{e.mutateMediaListCache(x=>(e.listData().data.indecies[g.media.id].forEach(([I,E])=>{x.data.lists[I].entries.splice(E,1)}),x),e.updateListInfo)}})},get children(){return a(Dd,{})}})}}),null),P(()=>V(S,"src",g.media.coverImage.large)),C}})}})),P(C=>{var S=m(),k=h.name;return S!==C.e&&V(v,"data-index",C.e=S),k!==C.t&&V(v,"data-list",C.t=k),C},{e:void 0,t:void 0}),v})()}})),f})()]}}))})}})),u})()}const wu={};function Pw(){const e=ee(),t=N(()=>wu[e.name]??[]);return a(H,{get each(){return t()},children:n=>a(T,{get when(){return N(()=>!!n.entries.length)()&&(!e.list||decodeURI(e.list)===n.name)},get children(){return[(()=>{var r=_u();return d(r,()=>n.name),r})(),(()=>{var r=bu();return d(r,a(H,{get each(){return n.entries},children:()=>yu()})),r})()]}})})}var Mw=p("<ol><li><button>All "),Dw=p("<li><button> ");function Rw(e){const t=ku(),n=ee();return a(T,{get when(){var r;return(r=e.listData())==null?void 0:r.data},get children(){var r=Mw(),i=r.firstChild,l=i.firstChild,s=l.firstChild;return l.$$click=()=>t(""),d(l,a(T,{get when(){return n.list===void 0},children:"> "}),s),d(l,()=>e.listData().data.total,null),d(r,a(H,{get each(){return e.listData().data.lists},children:o=>(()=>{var c=Dw(),u=c.firstChild,h=u.firstChild;return u.$$click=()=>t(o.name),d(u,a(T,{get when(){return decodeURI(n.list)===o.name},children:"> "}),h),d(u,()=>o.name,h),d(u,()=>o.entries.length,null),c})()}),null),r}})}_e(["click"]);var Nw=p("<option data-k-4ded799d value>All formats"),Ow=p("<option data-k-4ded799d value>Any User Status"),Fw=p("<option data-k-4ded799d value>Any Status"),Uw=p("<option data-k-4ded799d value>All genres"),Bw=p("<option data-k-4ded799d value>All countries"),Vw=p("<option data-k-4ded799d value>All ratings"),Gw=p("<option data-k-4ded799d value>All studios"),Hw=p("<select data-k-4ded799d name=studio><option data-k-4ded799d value hidden>Studio"),Yw=p("<option data-k-4ded799d value>All tags"),jw=p("<label data-k-4ded799d for=private><input data-k-4ded799d type=checkbox name=private id=private> Private"),zw=p("<button data-k-4ded799d>Compare with your list"),Ww=p("<button data-k-4ded799d>Open in compare page"),qw=p('<div data-k-4ded799d class=user-profile-media-list-search><input data-k-4ded799d type=text placeholder=Search><select data-k-4ded799d name=format><option data-k-4ded799d value hidden>Format</option><option data-k-4ded799d value=MOVIE>Movie</option><option data-k-4ded799d value=MUSIC>Music</option><option data-k-4ded799d value=ONA>Ona</option><option data-k-4ded799d value=OVA>Ova</option><option data-k-4ded799d value=SPECIAL>Special</option><option data-k-4ded799d value=TV>TV</option><option data-k-4ded799d value=TV_SHORT>TV short</option></select><select data-k-4ded799d name=userStatus><option data-k-4ded799d value hidden>User Status</option><option data-k-4ded799d value=COMPLETED>Completed</option><option data-k-4ded799d value=CURRENT></option><option data-k-4ded799d value=DROPPED>Dropped</option><option data-k-4ded799d value=PAUSED>Paused</option><option data-k-4ded799d value=PLANNING>Planning</option><option data-k-4ded799d value=REPEATING></option></select><select data-k-4ded799d name=status><option data-k-4ded799d value hidden>Status</option><option data-k-4ded799d value=RELEASING>Releasing</option><option data-k-4ded799d value=FINISHED>Finished</option><option data-k-4ded799d value=NOT_YET_RELEASED>Not Yet Released</option><option data-k-4ded799d value=CANCELLED>Cancelled</option></select><select data-k-4ded799d name=genre><option data-k-4ded799d value hidden>Genre</option><option data-k-4ded799d value=Action>Action</option><option data-k-4ded799d value=Adventure>Adventure</option><option data-k-4ded799d value=Comedy>Comedy</option><option data-k-4ded799d value=Drama>Drama</option><option data-k-4ded799d value=Ecchi>Ecchi</option><option data-k-4ded799d value=Fantasy>Fantasy</option><option data-k-4ded799d value=Hentai>Hentai</option><option data-k-4ded799d value=Horror>Horror</option><option data-k-4ded799d value="Mahou Shoujo">Mahou Shoujo</option><option data-k-4ded799d value=Mecha>Mecha</option><option data-k-4ded799d value=Music>Music</option><option data-k-4ded799d value=Mystery>Mystery</option><option data-k-4ded799d value=Psychological>Psychological</option><option data-k-4ded799d value=Romance>Romance</option><option data-k-4ded799d value=Sci-Fi>Sci-Fi</option><option data-k-4ded799d value="Slice of Life">Slice of Life</option><option data-k-4ded799d value=Sports>Sports</option><option data-k-4ded799d value=Supernatural>Supernatural</option><option data-k-4ded799d value=Thriller>Thriller</option></select><select data-k-4ded799d name=countryOfOrigin><option data-k-4ded799d value hidden>Country</option><option data-k-4ded799d value=CN>China</option><option data-k-4ded799d value=JP>Japan</option><option data-k-4ded799d value=KR>South Korea</option><option data-k-4ded799d value=TW>Taiwan</option></select><select data-k-4ded799d name=isAdult><option data-k-4ded799d value hidden>Age rating</option><option data-k-4ded799d value=false>R-17+</option><option data-k-4ded799d value=true>R-18</option></select><select data-k-4ded799d name=tag><option data-k-4ded799d value hidden>Tag</option></select><input data-k-4ded799d type=number placeholder="Release year"max=9999 min=0><label data-k-4ded799d for=notes><input data-k-4ded799d type=checkbox name=notes id=notes> Notes</label><label data-k-4ded799d for=repeat><input data-k-4ded799d type=checkbox name=repeat id=repeat> </label><label data-k-4ded799d for=missingStart><input data-k-4ded799d type=checkbox name=missingStart id=missingStart> Missing start date</label><label data-k-4ded799d for=missingScore><input data-k-4ded799d type=checkbox name=missingScore id=missingScore> Missing score</label><label data-k-4ded799d for=reverse><input data-k-4ded799d type=checkbox name=reverse id=reverse> Reverse order</label><select data-k-4ded799d name=sort><option data-k-4ded799d value=score>Score</option><option data-k-4ded799d value=title>Title</option><option data-k-4ded799d value=progress>Progress</option><option data-k-4ded799d value=updatedAt>Last Updated</option><option data-k-4ded799d value=startedAt>Start Date</option><option data-k-4ded799d value=completedAt>Completed Date</option><option data-k-4ded799d value=releaseDate>Release Date</option><option data-k-4ded799d value=averageScore>Average Score</option><option data-k-4ded799d value=popularity>Popularity</option><option data-k-4ded799d value=repeat>'),Bo=p("<option data-k-4ded799d>"),Kw=p("<button data-k-4ded799d>Remove filters"),Jw=p("<button data-k-4ded799d>Back to home");function Xw(e){const t=ku(),n=Kt(),{authUserData:r}=ie(),{isOwnProfile:i}=Ml(),{user:l}=Ze(),s=ee();return(()=>{var c=qw(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=h.nextSibling,y=m.firstChild,v=y.nextSibling,$=v.nextSibling,C=$.nextSibling,S=C.nextSibling,k=S.nextSibling,b=k.nextSibling,A=m.nextSibling,w=A.firstChild,_=w.nextSibling,x=A.nextSibling,I=x.firstChild,E=I.nextSibling,L=x.nextSibling,R=L.firstChild,U=R.nextSibling,G=L.nextSibling,J=G.firstChild,Y=J.nextSibling,q=G.nextSibling;q.firstChild;var le=q.nextSibling,Z=le.nextSibling,te=Z.firstChild,X=Z.nextSibling,pe=X.firstChild;pe.nextSibling;var $e=X.nextSibling,he=$e.firstChild,ne=$e.nextSibling,j=ne.firstChild,Ue=ne.nextSibling,et=Ue.firstChild,Re=Ue.nextSibling,tt=Re.firstChild,Bt=tt.nextSibling,ct=Bt.nextSibling,yt=ct.nextSibling,dt=yt.nextSibling,nt=dt.nextSibling,At=nt.nextSibling,mt=At.nextSibling,rt=mt.nextSibling,re=rt.nextSibling;return u.$$input=Q=>e.setSearchParams({search:Q.target.value||void 0}),d(c,a(Rw,{get listData(){return e.listData}}),h),h.addEventListener("change",Q=>e.setSearchParams({format:Q.target.value||void 0})),d(h,a(T,{get when(){return e.format()},get children(){return Nw()}}),g),m.addEventListener("change",Q=>e.setSearchParams({userStatus:Q.target.value||void 0})),d(m,a(T,{get when(){return e.userStatus()},get children(){return Ow()}}),v),d($,a(z,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Watching"}),a(M,{get when(){return s.type==="manga"},children:"Reading"})]}})),d(b,a(z,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatching"}),a(M,{get when(){return s.type==="manga"},children:"Rereading"})]}})),A.addEventListener("change",Q=>e.setSearchParams({status:Q.target.value||void 0})),d(A,a(T,{get when(){return e.status()},get children(){return Fw()}}),_),x.addEventListener("change",Q=>e.setSearchParams({genre:Q.target.value||void 0})),d(x,a(T,{get when(){return e.genre()},get children(){return Uw()}}),E),L.addEventListener("change",Q=>e.setSearchParams({countryOfOrigin:Q.target.value||void 0})),d(L,a(T,{get when(){return e.countryOfOrigin()},get children(){return Bw()}}),U),G.addEventListener("change",Q=>e.setSearchParams({isAdult:Q.target.value||void 0})),d(G,a(T,{get when(){return e.isAdult()!==void 0},get children(){return Vw()}}),Y),d(c,a(T,{get when(){return s.type==="anime"},get children(){var Q=Hw();return Q.firstChild,Q.addEventListener("change",ve=>e.setSearchParams({studio:ve.target.value||void 0})),d(Q,a(T,{get when(){return e.studio()},get children(){return Gw()}}),null),d(Q,a(H,{get each(){var ve,Te;return(Te=(ve=e.listData())==null?void 0:ve.data)==null?void 0:Te.studios},children:ve=>(()=>{var Te=Bo();return Te.value=ve,d(Te,ve),P(()=>Te.selected=ve==e.studio()),Te})()}),null),P(()=>Q.value=e.studio()),Q}}),q),q.addEventListener("change",Q=>e.setSearchParams({tag:Q.target.value||void 0})),d(q,a(T,{get when(){return e.tag()},get children(){return Yw()}}),null),d(q,a(H,{get each(){var Q,ve;return(ve=(Q=e.listData())==null?void 0:Q.data)==null?void 0:ve.tags},children:Q=>(()=>{var ve=Bo();return ve.value=Q,d(ve,Q),P(()=>ve.selected=Q==e.tag()),ve})()}),null),le.$$input=Q=>e.setSearchParams({year:Q.target.value||void 0}),d(c,a(T,{get when(){return i()},get children(){var Q=jw(),ve=Q.firstChild;return ve.addEventListener("change",Te=>e.setSearchParams({private:Te.target.checked?"true":void 0})),P(()=>ve.checked=e.privateFilter()),Q}}),Z),te.addEventListener("change",Q=>e.setSearchParams({notes:Q.target.checked?"true":void 0})),pe.addEventListener("change",Q=>e.setSearchParams({repeat:Q.target.checked?"true":void 0})),d(X,a(z,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatched"}),a(M,{get when(){return s.type==="manga"},children:"Reread"})]}}),null),he.addEventListener("change",Q=>e.setSearchParams({missingStart:Q.target.checked?"true":void 0})),j.addEventListener("change",Q=>e.setSearchParams({missingScore:Q.target.checked?"true":void 0})),et.addEventListener("change",Q=>e.setSearchParams({reverse:Q.target.checked?"true":void 0})),Re.addEventListener("change",Q=>e.setSearchParams({sort:Q.target.value==="score"?void 0:Q.target.value})),d(re,a(z,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatches"}),a(M,{get when(){return s.type==="manga"},children:"Rereads"})]}})),d(c,a(z,{get children(){return[a(M,{get when(){var Q,ve;return N(()=>!i())()&&((ve=(Q=r())==null?void 0:Q.data)==null?void 0:ve.name)},get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+l().name+"&user="+r().data.name},get children(){return zw()}})}}),a(M,{when:!0,get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+l().name},get children(){return Ww()}})}})]}}),null),d(c,a(o,{}),null),P(()=>u.value=e.search()),P(()=>h.value=e.format()||""),P(()=>m.value=e.userStatus()||""),P(()=>A.value=e.status()||""),P(()=>x.value=e.genre()),P(()=>L.value=e.countryOfOrigin()||""),P(()=>G.value=e.isAdult()===void 0?"":String(e.isAdult())),P(()=>q.value=e.tag()),P(()=>le.value=e.year()),P(()=>te.checked=e.notesFilter()),P(()=>pe.checked=e.rewatchedFilter()),P(()=>he.checked=e.missingStartFilter()),P(()=>j.checked=e.missingScoreFilter()),P(()=>et.checked=e.reverse()),P(()=>Re.value=e.sort()),c})();function o(){return a(z,{get children(){return[a(M,{get when(){return n.search},get children(){var c=Kw();return c.$$click=()=>{e.setSearchParams({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0,studio:void 0,tag:void 0})},c.style.setProperty("background","skyblue"),c}}),a(M,{get when(){return s.list},get children(){var c=Jw();return c.$$click=()=>{t("")},c.style.setProperty("background","lime"),c}})]}})}}_e(["input","click"]);var Zw=p("<div data-k-45f62037 class=user-profile-media-list-body>");const ku=()=>{const e=gn(),{user:t}=Ze(),n=ee();return r=>{e(`/user/${t().name}/${n.type}${r?"/"+r:""}${location.search}`,{replace:!0})}};function Vo(){const{user:e}=Ze(),t=ee(),{accessToken:n,authUserData:r}=ie(),i=N(()=>mg({token:n(),name:e().name,type:t.type})),l=Cn({default:()=>za()>2}),[s,{mutateCache:o}]=Sn(l,i),[c,u]=xe(),[h,f]=O({});let g;W(ce(e,le=>{le&&(document.title=`${le.name} ${t.type} - LOB`)})),document.title="Authentication - LOB";const m=le=>{u(le,{replace:!0})},y=()=>c.search||"",v=()=>c.format||"",$=()=>c.status||"",C=()=>c.genre||"",S=()=>c.countryOfOrigin||"",k=()=>{if(c.isAdult==="true")return!0;if(c.isAdult==="false")return!1},b=()=>c.year||"",A=()=>c.private==="true",w=()=>c.notes==="true",_=()=>c.repeat==="true",x=()=>c.missingStart==="true",I=()=>c.missingScore==="true",E=()=>c.reverse==="true",L=()=>c.sort||"score",R=()=>c.userStatus||"",U=()=>c.studio||"",G=()=>c.tag||"",J=ga(async(le,Z,te)=>{F(te,"Progress key is undefined");const X=await oe.anilist.mutateMedia(n(),{mediaId:le,[te]:Z});X.status===200&&o(pe=>{function $e(he,ne){const j=pe.data.lists.findIndex(et=>et.name===he&&et.isCustomList===ne);j===-1&&pe.data.lists.push({name:he,isCustomList:!1,isCompletedList:!1,entries:[]});const Ue=pe.data.lists.at(j);Ue.entries.push(X.data),h().data.indecies[le].push([j===-1?pe.data.lists.length-1:j,Ue.entries.length-1])}if(h().data.indecies[le].forEach(([he,ne])=>{pe.data.lists[he].entries.splice(ne,1)}),h().data.indecies[le]=[],!X.data.hiddenFromStatusLists){const he=Su(X.data.status,t.type);$e(he,!1)}for(const[he,ne]of Object.entries(X.data.customLists??{}))ne&&$e(he,!0);return pe})},250,2),Y=()=>{var le,Z;if(window.Worker&&((le=s())!=null&&le.data)){g=g instanceof Worker?g:new yw;const te={data:(Z=s())==null?void 0:Z.data,search:y(),format:v(),status:$(),genre:C(),reverse:E(),countryOfOrigin:S(),missingStart:x(),missingScore:I(),isAdult:k(),year:+b()||void 0,private:A(),notes:w(),repeat:_(),sort:L(),studio:U(),type:t.type,userStatus:R(),tag:G()};g.postMessage(te),g.onmessage=f}};W(Y),He(()=>{g instanceof Worker&&g.terminate()});function q(){var le;return e().id===((le=r())==null?void 0:le.data.id)}return a($c.Provider,{value:{triggerProgressIncrease:J,isOwnProfile:q},get children(){var le=Zw();return d(le,a(Xw,{listData:h,setSearchParams:m,search:y,format:v,status:$,genre:C,countryOfOrigin:S,isAdult:k,year:b,privateFilter:A,notesFilter:w,rewatchedFilter:_,missingStartFilter:x,missingScoreFilter:I,reverse:E,sort:L,userStatus:R,studio:U,tag:G}),null),d(le,a(Lw,{listData:h,mutateMediaListCache:o,updateListInfo:Y}),null),le}})}function Su(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return qe(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:F(!1,"Unkown status: "+e)}}var Qw=p("<button data-k-1fe26ca9 class=cp-delete-favourite>Delete");function Yr(e){const{authUserData:t,accessToken:n}=ie(),{user:r}=Ze();return F(e.onClick,"onClick is missing"),F(e.mutate,"mutate is missing"),a(T,{get when(){var i;return r().id===((i=t())==null?void 0:i.data.id)},get children(){var i=Qw();return i.$$click=async l=>{l.preventDefault(),e.onClick(),(await oe.anilist.toggleFavourite(n(),{mangaId:e.mangaId,animeId:e.animeId,staffId:e.staffId,characterId:e.characterId,studioId:e.studioId})).status===200&&e.mutate()},i}})}_e(["click"]);var Da=p("<img data-k-81c02ac9 alt=Cover>"),ek=p("<li data-k-81c02ac9>");function tk(e){const[t,n]=O(!1),{setAllEdges:r,type:i}=yc(),l=s=>r(o=>o.filter(c=>c.node.id!==s));return(()=>{var s=ek();return d(s,a(z,{get children(){return[a(M,{when:i==="anime",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Yr,{get animeId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return P(()=>V(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:i==="manga",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Yr,{get mangaId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return P(()=>V(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:i==="characters",get children(){return a(B,{get href(){return"/ani/character/"+e.edge.node.id+"/"+Ke(e.edge.node.name.userPreferred)},get children(){return[a(Yr,{get characterId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return P(()=>V(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:i==="staff",get children(){return a(B,{get href(){return"/ani/staff/"+e.edge.node.id+"/"+Ke(e.edge.node.name.userPreferred)},get children(){return[a(Yr,{get staffId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return P(()=>V(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:i==="studios",get children(){return a(B,{get href(){return"/ani/studio/"+e.edge.node.id+"/"+Ke(e.edge.node.name)},get children(){return[a(Yr,{get studioId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),N(()=>e.edge.node.name)]}})}})]}})),P(o=>{var c=!!t(),u=e.edge.node.id;return c!==o.e&&s.classList.toggle("hidden",o.e=c),u!==o.t&&V(s,"data-id",o.t=u),o},{e:void 0,t:void 0}),s})()}function Cu(e){const{user:t}=Ze(),{type:n,allEdges:r}=yc(),{accessToken:i}=ie(),[l,s]=O(void 0),[o,{mutateCache:c}]=oe.anilist.favouritesByUserId(()=>t().id||void 0,e.page===1?()=>e.page:l,i);return W(()=>{var u,h,f,g,m,y;((h=(u=o())==null?void 0:u.data[n])==null?void 0:h.edges.length)>0&&Ce(r).splice((e.page-1)*25,25,...(g=(f=o())==null?void 0:f.data[n])==null?void 0:g.edges),e.page===1&&e.setVisible(((y=(m=o())==null?void 0:m.data[n])==null?void 0:y.edges.length)>0)}),W(ce(r,u=>{Ce(o).data[n].edges=u.slice((e.page-1)*25,e.page*25),c(h=>h)},{defer:!0})),a(mn,{rootMargin:"100px",onIntersection:()=>s(e.page),get loading(){return e.loading},fetchResponse:o,children:u=>[a(H,{get each(){var h;return(h=o())==null?void 0:h.data[n].edges},children:h=>a(tk,{edge:h})}),a(T,{get when(){return o().data[n].pageInfo.hasNextPage},get children(){return a(T,{when:u===!1,fallback:"Fetch cooldown",get children(){return a(Cu,{get page(){return e.page+1},get loading(){return o.loading}})}})}})]})}var nk=p("<button data-k-05269ec0>Save"),rk=p("<button data-k-05269ec0>Cancel"),ak=p("<button data-k-05269ec0>Reorder"),ik=p("<details data-k-05269ec0 open><summary data-k-05269ec0><h3 data-k-05269ec0></h3></summary><ol data-k-05269ec0>");function jr(e){F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(!1),[r,i]=O(!1),[l,s]=O([]),{accessToken:o,authUserData:c}=ie(),{user:u}=Ze();let h,f,g,m;const y=()=>{i(!1),l().forEach(S=>{const k=h.querySelector(`li[data-id="${S.node.id}"]`);k&&h.append(k)})},v=S=>{if(!r())return;const k=S.target.closest("li");if(!k)return;k.classList.add("dragging");const b=k.getBoundingClientRect();if(S.type==="touchstart"){const A=S.touches[0];g=A.clientX-b.x,m=A.clientY-b.y}else g=S.clientX-b.x,m=S.clientY-b.y;f=k},$=S=>{var b,A;if(!r()||!f)return;if(S.type==="touchmove"){const w=S.touches[0],_=(b=document.elementFromPoint(w.clientX,w.clientY))==null?void 0:b.closest("li");_&&(f.nextElementSibling===_?_.after(f):_.before(f)),k()}else S.buttons===1&&((A=S.target)==null?void 0:A.tagName)==="LI"?f.nextElementSibling===S.target?S.target.after(f):S.target.before(f):S.buttons!==1&&C();S.buttons===1&&k();function k(){const w=f.getBoundingClientRect();let _=0,x=0,I=S.clientX,E=S.clientY;if(S.type==="touchmove"){const L=S.touches[0];I=L.clientX,E=L.clientY}f.style.transform&&([_,x]=f.style.transform.match(/-?[\d.]+(?=px)/g).map(Number)),f.style.transform=`translate(${_+(I-(w.x+g))}px, ${x+(E-(w.y+m))}px)`}},C=()=>{f&&(f.style.transform=null,f.classList.remove("dragging")),f=null};return(()=>{var S=ik(),k=S.firstChild,b=k.firstChild,A=k.nextSibling;return d(b,()=>e.title),d(k,a(T,{get when(){var w;return u().id===((w=c())==null?void 0:w.data.id)},get children(){return a(z,{get children(){return[a(M,{get when(){return r()},get children(){return[(()=>{var w=nk();return w.$$click=async()=>{const _=[...h.childNodes].map(E=>+E.dataset.id),x=_.map((E,L)=>L+1);let I;e.type==="anime"?I=await oe.anilist.mutateFavourites(o(),{animeIds:_,animeOrder:x}):e.type==="manga"?I=await oe.anilist.mutateFavourites(o(),{mangaIds:_,mangaOrder:x}):e.type==="studios"?I=await oe.anilist.mutateFavourites(o(),{studioIds:_,studioOrder:x}):e.type==="staff"?I=await oe.anilist.mutateFavourites(o(),{staffIds:_,staffOrder:x}):e.type==="characters"&&(I=await oe.anilist.mutateFavourites(o(),{characterIds:_,characterOrder:x})),I.status===200?(s(E=>{const L=Object.fromEntries(E.map((R,U)=>[R.node.id,U]));return E.map((R,U)=>E[L[_[U]]])}),i(!1)):(y(),console.error("mutation failed"))},w})(),(()=>{var w=rk();return w.$$click=y,w})()]}}),a(M,{get when(){return!r()},get children(){var w=ak();return w.$$click=()=>i(_=>!_),w}})]}})}}),null),A.$$touchstart=v,A.$$mousedown=v,A.$$touchend=C,A.$$touchmove=$,A.$$mousemove=$,fe(w=>h=w,A),d(A,a(bc.Provider,{get value(){return{type:e.type,setAllEdges:s,allEdges:l}},get children(){return a(T,{get when(){return u().id},keyed:!0,get children(){return a(Cu,{page:1,setVisible:n})}})}})),P(w=>{var _=!t(),x=!!r(),I=e.type!=="studios",E=e.type==="studios";return _!==w.e&&S.classList.toggle("hidden",w.e=_),x!==w.t&&A.classList.toggle("reorder",w.t=x),I!==w.a&&A.classList.toggle("grid",w.a=I),E!==w.o&&A.classList.toggle("flex",w.o=E),w},{e:void 0,t:void 0,a:void 0,o:void 0}),S})()}_e(["click","mousemove","touchmove","touchend","mousedown","touchstart"]);var lk=p("<div data-k-821c40e4 class=user-profile-favourites>");function sk(){const{user:e}=Ze();return W(ce(e,t=>{document.title=`${t.name} favourites - LOB`})),(()=>{var t=lk();return d(t,a(jr,{title:"Favourite animes",type:"anime"}),null),d(t,a(jr,{title:"Favourite characters",type:"characters"}),null),d(t,a(jr,{title:"Favourite manga",type:"manga"}),null),d(t,a(jr,{title:"Favourite staff",type:"staff"}),null),d(t,a(jr,{title:"Favourite studios",type:"studios"}),null),t})()}var ok=p("<div data-k-011bdddf class=user-profile-stats-page><div data-k-011bdddf><ol data-k-011bdddf><li data-k-011bdddf>Anime stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li><li data-k-011bdddf>Manga stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li></ol></div><div data-k-011bdddf class=content>");function ck(e){const{user:t}=Ze();return W(()=>{document.title=`${t().name} stats - LOB`}),(()=>{var n=ok(),r=n.firstChild,i=r.firstChild,l=i.firstChild,s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling,g=f.nextSibling,m=g.nextSibling,y=l.nextSibling,v=y.firstChild,$=v.nextSibling,C=$.firstChild,S=C.nextSibling,k=S.nextSibling,b=k.nextSibling,A=r.nextSibling;return d(c,a(B,{get href(){return"/user/"+t().name+"/stats/anime/overview"},children:"Overview"})),d(u,a(B,{get href(){return"/user/"+t().name+"/stats/anime/genres"},children:"Genres"})),d(h,a(B,{get href(){return"/user/"+t().name+"/stats/anime/tags"},children:"Tags"})),d(f,a(B,{get href(){return"/user/"+t().name+"/stats/anime/voice-actors"},children:"Voice actors"})),d(g,a(B,{get href(){return"/user/"+t().name+"/stats/anime/studios"},children:"Studios"})),d(m,a(B,{get href(){return"/user/"+t().name+"/stats/anime/staff"},children:"Staff"})),d(C,a(B,{get href(){return"/user/"+t().name+"/stats/manga/overview"},children:"Overview"})),d(S,a(B,{get href(){return"/user/"+t().name+"/stats/manga/genres"},children:"Genres"})),d(k,a(B,{get href(){return"/user/"+t().name+"/stats/manga/tags"},children:"Tags"})),d(b,a(B,{get href(){return"/user/"+t().name+"/stats/manga/staff"},children:"Staff"})),d(A,()=>e.children),n})()}var dk=p("<div data-k-f2870773><h2 data-k-f2870773>Relations</h2><ol data-k-f2870773 class=grid-column-auto-fill>"),uk=p("<img data-k-f2870773 alt=Cover>"),hk=p("<div data-k-f2870773 class=content><span data-k-f2870773 class=type></span><span data-k-f2870773 class=line-clamp></span><p data-k-f2870773 class=flex-bullet-separator><span data-k-f2870773></span><span data-k-f2870773>"),gk=p("<li data-k-f2870773>");function fk(e){return a(at,{fallback:"Anilist relations preview error",get children(){return a(T,{get when(){var t;return(t=e.relations)==null?void 0:t.edges.length},get children(){var t=dk(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.relations.edges},children:i=>(()=>{var l=gk();return d(l,a(B,{get href(){return gd(i.node)},class:"media-page-relation",get children(){return[(()=>{var s=uk();return P(()=>V(s,"src",i.node.coverImage.large)),s})(),(()=>{var s=hk(),o=s.firstChild,c=o.nextSibling,u=c.nextSibling,h=u.firstChild,f=h.nextSibling;return d(o,()=>i.relationType),d(c,()=>i.node.title.userPreferred),d(h,()=>hl(i.node.format)),d(f,()=>fd(i.node.status)),s})()]}})),l})()})),t}})}})}const mk="_character-container_1mdg4_1",pk="_character_1mdg4_1",vk="_character-left_1mdg4_21",$k="_character-right_1mdg4_21",_k="_content_1mdg4_26",$n={characterContainer:mk,character:pk,characterLeft:vk,characterRight:$k,content:_k};var bk=p("<h2>Characters"),yk=p("<div><ol class=grid-column-auto-fill>"),wk=p("<img alt=Character>"),Go=p("<div><p></p><p>"),kk=p("<li>"),Sk=p('<img alt="Voice actor">');const Ho=(e,t)=>{const n=jl(t);return n!=="Japanese"&&e.some(r=>r.voiceActors.some(i=>i.language===n))?n:"Japanese"};function Ck(e){const t=Oe({characters:[],countryOfOrigin:"JP"},e),[n,r]=O(Ho(t.characters,t.countryOfOrigin));return W(()=>{r(Ho(t.characters,t.countryOfOrigin))}),a(at,{fallback:"Characters error",get children(){return a(T,{get when(){return t.characters.length},get children(){var i=yk(),l=i.firstChild;return d(i,a(B,{href:"characters",get children(){return bk()}}),l),d(l,a(H,{get each(){return t.characters},children:s=>(()=>{var o=kk();return d(o,a(B,{get href(){return"/ani/character/"+s.node.id+"/"+Ke(s.node.name.userPreferred)},get class(){return $n.characterLeft},get children(){return[(()=>{var c=wk();return P(()=>V(c,"src",s.node.image.large)),c})(),(()=>{var c=Go(),u=c.firstChild,h=u.nextSibling;return d(u,()=>s.node.name.userPreferred),d(h,()=>s.role),P(f=>{var g=$n.content,m=$n.lineClamp;return g!==f.e&&Dt(c,f.e=g),m!==f.t&&Dt(u,f.t=m),f},{e:void 0,t:void 0}),c})()]}}),null),d(o,a(T,{get when(){return s.voiceActors.find(c=>c.language===n())},children:c=>a(B,{get href(){return"/ani/staff/"+c().id+"/"+Ke(c().name.userPreferred)},get class(){return $n.characterRight},get children(){return[(()=>{var u=Go(),h=u.firstChild,f=h.nextSibling;return d(h,()=>c().name.userPreferred),d(f,()=>c().language),P(g=>{var m=$n.content,y=$n.lineClamp;return m!==g.e&&Dt(u,g.e=m),y!==g.t&&Dt(h,g.t=y),g},{e:void 0,t:void 0}),u})(),(()=>{var u=Sk();return P(()=>V(u,"src",c().image.large)),u})()]}})}),null),P(()=>Dt(o,$n.character)),o})()})),P(()=>Dt(i,$n.characterContainer)),i}})}})}var Ak=p("<h2 data-k-b8cc53b3>Staff"),xk=p('<div data-k-b8cc53b3><ol data-k-b8cc53b3 class="grid-row-clamp grid-column-auto-fill">'),Tk=p('<img data-k-b8cc53b3 alt="Staff profile">'),Ik=p("<div data-k-b8cc53b3><p data-k-b8cc53b3></p><p data-k-b8cc53b3>"),Ek=p("<li data-k-b8cc53b3>");function Lk(e){return a(at,{fallback:"Anilist staff preview error",get children(){return a(T,{get when(){return e.staff},get children(){var t=xk(),n=t.firstChild;return d(t,a(B,{href:"staff",get children(){return Ak()}}),n),d(n,a(H,{get each(){return e.staff},children:r=>(()=>{var i=Ek();return d(i,a(B,{get href(){return"/ani/staff/"+r.node.id+"/"+Yn(r.node.name.userPreferred)},get children(){return[(()=>{var l=Tk();return P(()=>V(l,"src",r.node.image.large)),l})(),(()=>{var l=Ik(),s=l.firstChild,o=s.nextSibling;return d(s,()=>r.node.name.userPreferred),d(o,()=>r.role),l})()]}})),i})()})),t}})}})}var Pk=p("<p class=friend-list-status>");function Mk(e){return(()=>{var t=Pk();return d(t,a(z,{get fallback(){return e.friend.status},get children(){return[a(M,{get when(){return e.friend.status==="COMPLETED"},children:"Completed"}),a(M,{get when(){return e.friend.status==="CURRENT"},get children(){return a(z,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Watching"}),a(M,{get when(){return e.type==="MANGA"},children:"Reading"})]}})}}),a(M,{get when(){return e.friend.status==="DROPPED"},children:"Dropped"}),a(M,{get when(){return e.friend.status==="PAUSED"},children:"Paused"}),a(M,{get when(){return e.friend.status==="PLANNING"},children:"Planning"}),a(M,{get when(){return e.friend.status==="REPEATING"},get children(){return a(z,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Rewatching"}),a(M,{get when(){return e.type==="MANGA"},children:"Rereading"})]}})}})]}}),null),d(t,a(T,{get when(){return e.friend.progress>0&&e.friend.progress!==e.media.episodes&&e.friend.progress!==e.media.chapters},get children(){return a(z,{get children(){return[a(M,{get when(){return e.type==="ANIME"},get children(){return[" Ep. ",N(()=>e.friend.progress)]}}),a(M,{get when(){return e.type==="MANGA"},get children(){return[" Ch. ",N(()=>e.friend.progress)]}})]}})}}),null),d(t,a(T,{get when(){return e.friend.progressVolumes>0&&e.friend.progressVolumes!==e.media.volumes},get children(){return[" ","Vol. ",N(()=>e.friend.progressVolumes)]}}),null),t})()}const Dk="_friend-container_8e4dk_1",Rk="_friend_8e4dk_1",Nk="_friend-repeat_8e4dk_35",Al={friendContainer:Dk,friend:Rk,friendRepeat:Nk};var Ok=p("<div><ul>"),Fk=p('<img alt="User profile">'),Uk=p("<p>"),Bk=p("<div>"),Vk=p("<li>");function Gk(){const e=ee(),[t]=xe(),{accessToken:n,authUserData:r}=ie(),{anilistData:i}=fn(),l=Pe(ug,()=>{var h,f;return{token:n(),id:t.isMalId!=null?(f=(h=i())==null?void 0:h.data)==null?void 0:f.id:e.id,page:1,perPage:8}}),s=Cn({default:()=>za()>1,"only-if-cached":()=>za()>2}),[o]=Sn(s,l),[c,u]=O();return P(()=>{var h,f,g;(f=(h=i())==null?void 0:h.data)!=null&&f.mediaListEntry&&r()?u({...(g=i().data)==null?void 0:g.mediaListEntry,user:r().data}):u(null)}),a(at,{fallback:"Friends error",get children(){return a(T,{get when(){return N(()=>{var h,f;return!!(((f=(h=o())==null?void 0:h.data)!=null&&f.mediaList.length||c())&&i())})()&&r()},get children(){var h=Ok(),f=h.firstChild;return d(f,a(T,{get when(){return c()},get children(){return a(Yo,{get friend(){return c()}})}}),null),d(f,a(H,{get each(){var g,m;return(m=(g=o())==null?void 0:g.data)==null?void 0:m.mediaList},children:g=>a(T,{get when(){var m;return g.user.id!==((m=r())==null?void 0:m.data.id)},get children(){return a(Yo,{friend:g})}})}),null),P(()=>Dt(h,Al.friendContainer)),h}})}})}function Yo(e){const{anilistData:t}=fn();return(()=>{var n=Vk();return d(n,a(B,{get class(){return Al.friend},get href(){return"/user/"+e.friend.user.name},get children(){return[(()=>{var r=Fk();return P(()=>V(r,"src",e.friend.user.avatar.large)),r})(),(()=>{var r=Uk();return d(r,()=>e.friend.user.name),r})(),a(Mk,{get friend(){return e.friend},get media(){var r;return(r=t())==null?void 0:r.data},get type(){var r;return(r=t())==null?void 0:r.data.type}}),a(T,{get when(){return e.friend.repeat},get children(){var r=Bk();return d(r,()=>e.friend.repeat,null),d(r,a(ei,{}),null),P(()=>Dt(r,Al.friendRepeat)),r}}),a(hs,{get format(){return e.friend.user.mediaListOptions.scoreFormat},get score(){return e.friend.score}})]}})),n})()}var Hk=p("<button data-k-c63ce0c8>Show"),Yk=p('<div data-k-c63ce0c8 class=recommendations><div data-k-c63ce0c8 class=flex-space-between><h2 data-k-c63ce0c8>Recommendations</h2><div data-k-c63ce0c8></div></div><ol data-k-c63ce0c8 class="grid-column-auto-fill recommendations">');function jk(e){const t=ee(),[n,r]=O(!1),[i,l]=O();return W(ce(()=>t.id,s=>{r(!1),l(s)})),a(T,{get when(){var s;return((s=e.recommendations)==null?void 0:s.nodes.length)>0},get children(){var s=Yk(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=o.nextSibling;return d(u,a(T,{get when(){return e.recommendations.pageInfo.total>e.recommendations.nodes.length},get children(){var f=Hk();return f.firstChild,f.$$click=()=>r(g=>!g),d(f,a(T,{get when(){return n()},fallback:" more",children:" less"}),null),f}})),d(h,a(z,{get children(){return[a(M,{get when(){return!n()},get children(){return a(xl,{get nodes(){return e.recommendations.nodes},get mutateCache(){return e.mutateCache}})}}),a(M,{get when(){return n()},get children(){return a(Au,{get id(){return i()},page:1,get mutateOldCardsCache(){return e.mutateCache},get oldCards(){return e.recommendations.nodes}})}})]}})),s}})}function Au(e){const{accessToken:t}=ie(),[n,r]=O(void 0),i=Pe(dg,t,n,e.page),[l,{mutateCache:s}]=Qe(i),o=(c,u)=>s(h=>(h.data.nodes[c]=u,h));return a(mn,{onIntersection:()=>r(e.id),fetchResponse:l,get loadingElement(){return a(xl,{get nodes(){return e.oldCards||[]},get mutateCache(){return e.mutateCache}})},get loading(){return e.loading},children:c=>[a(xl,{get nodes(){return l().data.nodes},mutateCache:o,get mutateOldCardsCache(){return e.mutateOldCardsCache},get oldCards(){return e.oldCards}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{when:c===!1,fallback:"Fetch cooldown",get children(){return a(Au,{get id(){return n()},get page(){return e.page+1},get loading(){return l.loading}})}})}})]})}function xl(e){return F(!e.oldCards==!e.mutateOldCardsCache,"These two props needs to be used together"),a(H,{get each(){return e.nodes},children:(t,n)=>a(T,{get when(){return t.mediaRecommendation},get children(){return a(zk,{node:t,mutateCache:r=>{Ge(()=>{var i;n()<((i=e.oldCards)==null?void 0:i.length)&&e.mutateOldCardsCache(n(),r),e.mutateCache(n(),r)})}})}})})}function zk(e){const t=ee(),{accessToken:n}=ie(),[r,i]=O(e.node.userRating),[l,s]=O(e.node.rating);let o=e.node.userRating;const c=ga(async(f,g,m,y,v)=>{if(m!==o){const $=await oe.anilist.rateRecommendation(f,g,m,y,v);F(!$.fromCache,"Mutation should never be cached"),$.status===200&&e.mutateCache($.data)}o=m},1e3);return a(Z$,{get node(){return e.node},get rating(){return l()},get userRating(){return r()},handleRateUp:f=>{f.preventDefault(),i(g=>g==="RATE_UP"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"NO_RATING"):(c(n(),e.node.id,"RATE_UP",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"RATE_UP"))},handleRateDown:f=>{f.preventDefault(),i(g=>g==="RATE_DOWN"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"NO_RATING"):(c(n(),e.node.id,"RATE_DOWN",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"RATE_DOWN"))}})}_e(["click"]);var Wk=p("<h1>"),qk=p("<ul class=flex-bullet-separator><li></li><li>"),Kk=p("<li>Source: "),Jk=p("<ul><li>Members: </li><li>Favourites: "),Xk=p("<div class=pg-ani-media-info>"),Zk=p("<li>");function Qk(e){const{anilistData:t}=fn();return a(at,{fallback:"Anilist media page info error",get children(){var n=Xk();return d(n,a(T,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[(()=>{var r=Wk();return d(r,()=>{var i;return(i=t())==null?void 0:i.data.title.userPreferred}),r})(),(()=>{var r=qk(),i=r.firstChild,l=i.nextSibling;return d(i,a(z,{get children(){return[a(M,{get when(){var s;return((s=t())==null?void 0:s.data.type)==="MANGA"},get children(){return a(z,{get children(){return[a(M,{get when(){var s,o;return(o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year},get children(){return a(B,{get href(){var s;return"/search/manga?year="+((s=t())==null?void 0:s.data.startDate.year)},get children(){var s;return(s=t())==null?void 0:s.data.startDate.year}})}}),a(M,{get when(){var s,o;return((o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){var s;return((s=t())==null?void 0:s.data.type)==="ANIME"},get children(){return a(z,{get children(){return[a(M,{get when(){var s;return N(()=>{var o;return!!((o=t())!=null&&o.data.seasonYear)})()&&((s=t())==null?void 0:s.data.season)},get children(){return a(B,{get href(){var s,o;return"/search/anime/"+((s=t())==null?void 0:s.data.season.toLowerCase())+"-"+((o=t())==null?void 0:o.data.seasonYear)},get children(){return[N(()=>{var s;return Sr((s=t())==null?void 0:s.data.season)})," ",N(()=>{var s;return(s=t())==null?void 0:s.data.seasonYear})]}})}}),a(M,{get when(){var s,o;return(o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year},get children(){return a(B,{get href(){var s;return"/search/anime?year="+((s=t())==null?void 0:s.data.startDate.year)},get children(){var s;return(s=t())==null?void 0:s.data.startDate.year}})}}),a(M,{get when(){var s,o;return((o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}})),d(r,a(T,{get when(){var s;return(s=Object.entries(Hn.ani.media).find(([,o])=>{var c;return o.api===((c=t())==null?void 0:c.data.format)}))==null?void 0:s[0]},children:s=>(()=>{var o=Zk();return d(o,a(z,{get children(){return[a(M,{get when(){var c;return((c=t())==null?void 0:c.data.countryOfOrigin)!=="JP"},get children(){return a(B,{get href(){var c,u;return"/search/"+((c=t())==null?void 0:c.data.type.toLowerCase())+"?format="+s()+"&country="+((u=t())==null?void 0:u.data.countryOfOrigin)},get children(){return[N(()=>{var c;return hl((c=t())==null?void 0:c.data.format)})," (",N(()=>{var c;return Jf((c=t())==null?void 0:c.data.countryOfOrigin)}),")"]}})}}),a(M,{get when(){var c;return((c=t())==null?void 0:c.data.countryOfOrigin)==="JP"},get children(){return a(B,{get href(){var c;return"/search/"+((c=t())==null?void 0:c.data.type.toLowerCase())+"?format="+s()},get children(){var c;return hl((c=t())==null?void 0:c.data.format)}})}})]}})),o})()}),l),d(l,()=>{var s;return fd((s=t())==null?void 0:s.data.status)}),r})(),(()=>{var r=Jk(),i=r.firstChild;i.firstChild;var l=i.nextSibling;return l.firstChild,d(r,a(T,{get when(){var s;return(s=t())==null?void 0:s.data.source},get children(){var s=Kk();return s.firstChild,d(s,a(B,{get href(){var o;return"/search/"+((o=t())==null?void 0:o.data.type.toLowerCase())+"?source="+Object.entries(Nl).find(([,c])=>{var u;return c.api===((u=t())==null?void 0:u.data.source)})[0]},get children(){var o;return Xf((o=t())==null?void 0:o.data.source)}}),null),s}}),i),d(i,()=>{var s;return la((s=t())==null?void 0:s.data.popularity)},null),d(l,()=>{var s;return la((s=t())==null?void 0:s.data.favourites)},null),r})()]}})),n}})}var eS=p("<h2 data-k-c68b4600>Tags"),tS=p("<button data-k-c68b4600>"),nS=p("<div data-k-c68b4600 class=pg-media-tags><div data-k-c68b4600 class=flex-space-between></div><ol data-k-c68b4600>"),rS=p("<span data-k-c68b4600>%"),aS=p("<li data-k-c68b4600>");const iS=e=>{const[t,n]=O(!1);W(ce(()=>e.tags,()=>{n(!1)}));function r(){const i=[];for(const l of e.tags){if(l.rank<90&&i.length>=3)break;(t()||!l.isMediaSpoiler&&!l.isGeneralSpoiler)&&i.push(`genre=${l.name}`)}return i}return a(at,{fallback:"Tags error",get children(){return a(T,{get when(){var i;return(i=e.tags)==null?void 0:i.length},get children(){var i=nS(),l=i.firstChild,s=l.nextSibling;return d(l,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?"+r().join("&")},get children(){return eS()}}),null),d(l,a(T,{get when(){return e.tags.some(o=>o.isMediaSpoiler||o.isGeneralSpoiler)},get children(){var o=tS();return o.$$click=()=>n(c=>!c),d(o,a(T,{get when(){return!t()},fallback:"Hide spoilers",children:"Show spoilers"})),o}}),null),d(s,a(H,{get each(){return e.tags},children:o=>(()=>{var c=aS();return d(c,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?genre="+o.name+"&rank="+o.rank},get children(){return[N(()=>o.name)," ",(()=>{var u=rS(),h=u.firstChild;return d(u,()=>o.rank,h),u})()]}})),P(u=>{var h=!!(o.isMediaSpoiler||o.isGeneralSpoiler),f=!!((o.isMediaSpoiler||o.isGeneralSpoiler)&&!t()),g=o.description;return h!==u.e&&c.classList.toggle("spoiler",u.e=h),f!==u.t&&c.classList.toggle("hidden",u.t=f),g!==u.a&&V(c,"title",u.a=g),u},{e:void 0,t:void 0,a:void 0}),c})()})),P(()=>i.classList.toggle("loading",!!e.loading)),i}})}})};_e(["click"]);var lS=p("<div data-k-203e4d26 class=wrapper><h2 data-k-203e4d26></h2><ul data-k-203e4d26 class=genres>"),sS=p("<li data-k-203e4d26 class=genre>");const oS=e=>a(at,{fallback:"Genres error",get children(){return a(T,{get when(){var t;return(t=e.genres)==null?void 0:t.length},get children(){var t=lS(),n=t.firstChild,r=n.nextSibling;return d(n,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?"+e.genres.map(i=>"genre="+i).join("&")},children:"Genres"})),d(r,a(H,{get each(){return e.genres},children:i=>(()=>{var l=sS();return d(l,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?genre="+i},children:i})),l})()})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var cS=p("<div data-k-737e8a49 class=pg-media-ranking><h2 data-k-737e8a49>Ranking</h2><ul data-k-737e8a49>"),dS=p("<li data-k-737e8a49>#<! data-k-737e8a49> <! data-k-737e8a49> <! data-k-737e8a49> ");const uS=e=>a(at,{fallback:"Ranking error",get children(){return a(T,{get when(){return e.rankings},get children(){var t=cS(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.rankings},children:i=>(()=>{var l=dS(),s=l.firstChild,o=s.nextSibling,c=o.nextSibling,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling;return f.nextSibling,d(l,()=>i.rank,o),d(l,()=>i.context,u),d(l,()=>i.season,f),d(l,()=>i.year,null),l})()})),P(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var hS=p("<li data-k-439c0d70>Episodes: "),gS=p("<li data-k-439c0d70>Volumes: "),fS=p("<li data-k-439c0d70>Chapters: "),mS=p("<li data-k-439c0d70>Duration: <! data-k-439c0d70> mins"),pS=p("<li data-k-439c0d70>English: "),vS=p("<li data-k-439c0d70>Romaji: "),$S=p("<li data-k-439c0d70>Native: "),_S=p("<li data-k-439c0d70>Synonyms:<ul data-k-439c0d70>"),bS=p("<div data-k-439c0d70><h2 data-k-439c0d70>Extra info</h2><ul data-k-439c0d70>"),yS=p("<li data-k-439c0d70>Start Date: "),wS=p("<li data-k-439c0d70>End Date: "),kS=p("<li data-k-439c0d70>");const SS=e=>{const{authUserData:t}=ie();return a(at,{fallback:"ExtraInfo error",get children(){return a(T,{get when(){return e.media},get children(){var n=bS(),r=n.firstChild,i=r.nextSibling;return d(i,a(T,{get when(){return e.media.episodes},get children(){var l=hS();return l.firstChild,d(l,()=>e.media.episodes,null),l}}),null),d(i,a(T,{get when(){return e.media.volumes},get children(){var l=gS();return l.firstChild,d(l,()=>e.media.volumes,null),l}}),null),d(i,a(T,{get when(){return e.media.chapters},get children(){var l=fS();return l.firstChild,d(l,()=>e.media.chapters,null),l}}),null),d(i,a(T,{get when(){return e.media.duration},get children(){var l=mS(),s=l.firstChild,o=s.nextSibling;return o.nextSibling,d(l,()=>e.media.duration,o),l}}),null),d(i,a(T,{get when(){return Wa(e.media.startDate)},children:l=>(()=>{var s=yS();return s.firstChild,d(s,l,null),s})()}),null),d(i,a(T,{get when(){return Wa(e.media.endDate)},children:l=>(()=>{var s=wS();return s.firstChild,d(s,l,null),s})()}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="ENGLISH"},get children(){var l=pS();return l.firstChild,d(l,()=>e.media.title.english,null),l}}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="ROMAJI"},get children(){var l=vS();return l.firstChild,d(l,()=>e.media.title.romaji,null),l}}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="NATIVE"},get children(){var l=$S();return l.firstChild,d(l,()=>e.media.title.native,null),l}}),null),d(i,a(T,{get when(){return e.media.synonyms.length},get children(){var l=_S(),s=l.firstChild,o=s.nextSibling;return d(o,a(H,{get each(){return e.media.synonyms},children:c=>(()=>{var u=kS();return d(u,c),u})()})),l}}),null),P(()=>n.classList.toggle("loading",!!e.loading)),n}})}})};var CS=p("<div data-k-611537d3 class=pg-media-banner><img data-k-611537d3 alt=Banner>");const AS=e=>a(T,{get when(){return e.src},get children(){var t=CS(),n=t.firstChild;return P(r=>{var i=!!e.loading,l=e.src;return i!==r.e&&t.classList.toggle("loading",r.e=i),l!==r.t&&V(n,"src",r.t=l),r},{e:void 0,t:void 0}),t}});var xS=p("<img data-k-543bd5d1 alt=Cover class=media-page-cover>"),TS=p("<a data-k-543bd5d1 target=_black class=active><span data-k-543bd5d1 class=visually-hidden>Go to Anilist"),IS=p("<span data-k-543bd5d1 class=visually-hidden>Switch to MyAnimeList mode"),ES=p("<div data-k-543bd5d1 class=cp-media-api-switcher>"),LS=p("<button data-k-543bd5d1>"),PS=p("<div data-k-543bd5d1 class=media-page-content><aside data-k-543bd5d1 class=media-page-left-aside></aside><section data-k-543bd5d1 class=media-page-main>"),MS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Studios</h2><ol data-k-543bd5d1>"),Tl=p("<li data-k-543bd5d1>"),DS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Producers</h2><ol data-k-543bd5d1>"),RS=p("<div data-k-543bd5d1 class=media-page-description>"),NS=p('<div data-k-543bd5d1 class="no-overflow media-page-watch-episodes"><h2 data-k-543bd5d1>Watch</h2><ol data-k-543bd5d1 class=grid-reel-auto-fill>'),OS=p('<a data-k-543bd5d1 target=_black><img data-k-543bd5d1 alt="Episode thumbnail"><div data-k-543bd5d1 class=wrapper><p data-k-543bd5d1>');function FS(e){const t=ee(),[n]=xe(),{accessToken:r}=ie(),[i,l]=O(),s=Pe(cg,()=>({token:r(),id:t.id,isMalId:n.isMalId!=null,type:t.type})),o=Cn({default:()=>za()>2}),[c,{mutateBoth:u}]=Sn(o,s),h=N(()=>{var b;const k=(b=c())==null?void 0:b.data;if(!(!k||k.idMal==null||k.type.toLowerCase()!==t.type))return k.idMal});P(ce(c,k=>{var b;l(((b=k==null?void 0:k.data)==null?void 0:b.isFavourite)??!1)}));const f=Pe(Pc,()=>t.type,h),[g]=Qe(f),m=N(()=>{var k,b,A,w;if((k=c())!=null&&k.data.idMal&&((A=(b=g())==null?void 0:b.data)==null?void 0:A.mal_id)===((w=c())==null?void 0:w.data.idMal))return g()}),{openEditor:y}=Pl(),v=gn();P(()=>{var k,b;(k=c())!=null&&k.data&&t.sub?document.title=`${c().data.title.userPreferred} - ${t.sub} - LOB`:(b=c())!=null&&b.data&&(document.title=`${c().data.title.userPreferred} - LOB`)});const $=new AbortController;Tn(()=>{window.addEventListener("keydown",k=>{if(k.target!==document.body||k.shiftKey||k.altKey)return;function b(A){var w,_,x,I,E;return k.preventDefault(),(E=(I=(x=(_=(w=c())==null?void 0:w.data)==null?void 0:_.relations)==null?void 0:x.edges)==null?void 0:I.find(L=>(L==null?void 0:L.relationType)===A))==null?void 0:E.node}if(k.key==="l"&&!k.ctrlKey||k.key==="ArrowRight"&&k.ctrlKey)_a(v,b("SEQUEL"));else if(k.key==="h"&&!k.ctrlKey||k.key==="ArrowLeft"&&k.ctrlKey)_a(v,b("PREQUEL"));else if(k.key==="j"&&!k.ctrlKey||k.key==="ArrowDown"&&k.ctrlKey){const A=b("ADAPTATION")||b("ALTERNATIVE");_a(v,A)}else(k.key==="k"&&!k.ctrlKey||k.key==="ArrowUp"&&k.ctrlKey)&&_a(v,b("SOURCE")||b("PARENT"))},{signal:$.signal})}),He(()=>$.abort());const C=()=>{var k;return c.loading&&((k=c())==null?void 0:k.data.id)!=t.id},S=(k,b)=>{var w,_,x,I;const A=b[(_=(w=c())==null?void 0:w.data)==null?void 0:_.type]??null;((I=(x=c())==null?void 0:x.data)==null?void 0:I.id)===A&&(l(k),u(E=>(E.data.isFavourite=k,E)))};return a(at,{fallback:"Media page error",get children(){return a(Rl.Provider,{value:{anilistData:c,mutateBothAnilistData:u,jikanData:m},get children(){return[a(AS,{get src(){var k,b;return(b=(k=c())==null?void 0:k.data)==null?void 0:b.bannerImage},get loading(){return C()}}),(()=>{var k=PS(),b=k.firstChild,A=b.nextSibling;return d(b,a(T,{get when(){var w;return(w=c())==null?void 0:w.data},get children(){return[(()=>{var w=xS();return P(()=>{var _,x;return V(w,"src",(x=(_=c())==null?void 0:_.data)==null?void 0:x.coverImage.large)}),w})(),(()=>{var w=ES();return d(w,a(T,{get when(){var _;return(_=c())==null?void 0:_.data.id},get children(){var _=TS();return _.firstChild,d(_,a(ss,{}),null),d(_,a(fu,{}),null),P(()=>{var x;return V(_,"href","https://anilist.co/"+t.type+"/"+(((x=c())==null?void 0:x.data.id)??t.id))}),_}}),null),d(w,a(T,{get when(){var _;return(_=c())==null?void 0:_.data.idMal},get children(){return a(B,{get href(){var _;return"/mal/"+t.type+"/"+((_=c())==null?void 0:_.data.idMal)+"/"+t.name},get children(){return[IS(),a(os,{})]}})}}),null),w})(),a(gu,{}),a(T,{get when(){return r()},get children(){return[(()=>{var w=LS();return w.$$click=()=>{var _;y((_=c())==null?void 0:_.data,{setIsFavourite:S,mutateMedia:x=>{var I,E;((E=(I=c())==null?void 0:I.data)==null?void 0:E.id)===(x==null?void 0:x.media.id)&&u(L=>(L.data.mediaListEntry=x,L))}})},d(w,()=>{var _,x;return((x=(_=c())==null?void 0:_.data.mediaListEntry)==null?void 0:x.status)||"Edit"}),w})(),a(Er,{get checked(){return i()},onChange:l,get idType(){var w;return(w=c())==null?void 0:w.data.type},get variableId(){var w;return(w=c())==null?void 0:w.data.id},get anilistValue(){var w;return(w=c())==null?void 0:w.data.favourites},get jikanValue(){var w;return(w=m())==null?void 0:w.data.favorites},mutateCache:S})]}}),a(hu,{get id(){var w,_,x;return(x=(_=(w=c())==null?void 0:w.data)==null?void 0:_.trailer)==null?void 0:x.id},get site(){var w,_,x;return(x=(_=(w=c())==null?void 0:w.data)==null?void 0:_.trailer)==null?void 0:x.site}}),a(T,{get when(){var w;return(w=c())==null?void 0:w.data.studios.edges.filter(_=>_.isMain)},children:w=>a(T,{get when(){return w().length>0},get children(){var _=MS(),x=_.firstChild,I=x.nextSibling;return d(I,a(H,{get each(){return w()},children:E=>(()=>{var L=Tl();return d(L,a(B,{get href(){return"/ani/studio/"+E.node.id+"/"+Yn(E.node.name)},get children(){return E.node.name}})),L})()})),_}})}),a(T,{get when(){var w;return(w=c())==null?void 0:w.data.studios.edges.filter(_=>_.isMain===!1)},children:w=>a(T,{get when(){return w().length>0},get children(){var _=DS(),x=_.firstChild,I=x.nextSibling;return d(I,a(H,{get each(){return w()},children:E=>(()=>{var L=Tl();return d(L,a(B,{get href(){return"/ani/studio/"+E.node.id+"/"+Yn(E.node.name)},get children(){return E.node.name}})),L})()})),_}})}),a(mu,{get hashtag(){var w;return(w=c())==null?void 0:w.data.hashtag},get externalLinks(){var w;return(w=c())==null?void 0:w.data.externalLinks}}),a(SS,{get media(){var w;return(w=c())==null?void 0:w.data},get loading(){return C()}}),a(uS,{get rankings(){var w;return(w=c())==null?void 0:w.data.rankings},get loading(){return C()}}),a(oS,{get genres(){var w;return(w=c())==null?void 0:w.data.genres},get type(){var w;return(w=c())==null?void 0:w.data.type},get loading(){return C()}}),a(iS,{get tags(){var w;return(w=c())==null?void 0:w.data.tags},get type(){var w;return(w=c())==null?void 0:w.data.type},get loading(){return C()}})]}})),d(A,a(Qk,{}),null),d(A,()=>e.children,null),P(()=>k.classList.toggle("loading",!!C())),k})()]}})}})}function US(){const{accessToken:e}=ie(),{anilistData:t,mutateBothAnilistData:n}=fn();return a(at,{fallback:"Media page home content error",get children(){return a(T,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[a(T,{get when(){return t().data.description},get children(){var r=RS();return d(r,a(Xa,{get text(){return t().data.description}})),r}}),a(fk,{get relations(){return t().data.relations}}),a(Ck,{get characters(){return t().data.characterPreview.edges},get countryOfOrigin(){return t().data.countryOfOrigin}}),a(Lk,{get staff(){return t().data.staffPreview.edges}}),a(T,{get when(){return e()},get children(){return a(Gk,{})}}),a(Sb,{}),a(VS,{get streamingEpisodes(){return t().data.streamingEpisodes}}),a(jk,{get recommendations(){return t().data.recommendations},mutateCache:(r,i)=>{n(l=>(l.data.recommendations.nodes[r]=i,l))}})]}})}})}function BS(){const e=ee(),t=Kt();return a(dn,{get href(){return"/ani/"+e.type+"/"+e.id+"/"+(e.name||"")+t.search}})}function VS(e){return a(T,{get when(){var t;return(t=e.streamingEpisodes)==null?void 0:t.length},get children(){var t=NS(),n=t.firstChild,r=n.nextSibling;return d(r,a(H,{get each(){return e.streamingEpisodes},children:i=>(()=>{var l=Tl();return d(l,a(z,{get children(){return a(M,{get when(){return i.site==="Crunchyroll"},get children(){var s=OS(),o=s.firstChild,c=o.nextSibling,u=c.firstChild;return d(u,()=>i.title),P(h=>{var f=i.url,g=i.thumbnail;return f!==h.e&&V(s,"href",h.e=f),g!==h.t&&V(o,"src",h.t=g),h},{e:void 0,t:void 0}),s}})}})),l})()})),t}})}_e(["click"]);var GS=p('<img alt="User profile">'),HS=p("<p>"),YS=p("<li>"),jS=p("<button>Load more");function gs(e){F(e.page,"Page is missing");const{user:t}=Ze(),{accessToken:n}=ie(),[r]=oe.anilist.userFollowers(()=>t().id,e.page,n),[i,l]=O(!1);return a(T,{get when(){return r()},get children(){return[a(H,{get each(){return r().data.followers},children:s=>(()=>{var o=YS();return d(o,a(B,{get href(){return"/user/"+s.name},get children(){return[(()=>{var c=GS();return P(()=>V(c,"src",s.avatar.large)),c})(),(()=>{var c=HS();return d(c,()=>s.name),c})()]}})),o})()}),a(T,{get when(){return r().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return i()},get fallback(){return(()=>{var s=jS();return s.$$click=()=>l(!0),s})()},get children(){return a(gs,{get page(){return e.page+1}})}})}})]}})}_e(["click"]);var zS=p('<img alt="User profile">'),WS=p("<p>"),qS=p("<button>Unfollow"),KS=p("<li>"),JS=p("<button>Load more");function XS(e){F(e.page,"Page is missing");const{user:t}=Ze(),{authUserData:n,accessToken:r}=ie(),[i]=oe.anilist.userFollowing(()=>t().id,e.page,r),[l,s]=O(!1);return a(T,{get when(){return i()},get children(){return[a(H,{get each(){return i().data.following},children:o=>(()=>{var c=KS();return d(c,a(B,{get href(){return"/user/"+o.name},get children(){return[(()=>{var u=zS();return P(()=>V(u,"src",o.avatar.large)),u})(),(()=>{var u=WS();return d(u,()=>o.name),u})(),a(T,{get when(){var u;return t().id===((u=n())==null?void 0:u.data.id)},get children(){var u=qS();return u.$$click=async h=>{h.preventDefault(),await oe.anilist.toggleFollow(r(),o.id)},u}})]}})),c})()}),a(T,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l()},get fallback(){return(()=>{var o=JS();return o.$$click=()=>s(!0),o})()},get children(){return a(gs,{get page(){return e.page+1}})}})}})]}})}_e(["click"]);var jo=p("<ol class=user-profile-social-grid>"),ZS=p("<div class=user-profile-socials-page><ul><li><button>Following</button></li><li><button>Followers");function QS(){const{user:e}=Ze(),[t,n]=O("following");return W(ce(e,r=>{document.title=`${r.name} socials - LOB`})),(()=>{var r=ZS(),i=r.firstChild,l=i.firstChild,s=l.firstChild,o=l.nextSibling,c=o.firstChild;return s.$$click=()=>n("following"),c.$$click=()=>n("followers"),d(r,a(z,{get children(){return[a(M,{get when(){return t()==="following"},get children(){var u=jo();return d(u,a(T,{get when(){return e().id},keyed:!0,get children(){return a(XS,{page:1})}})),u}}),a(M,{get when(){return t()==="followers"},get children(){var u=jo();return d(u,a(T,{get when(){return e().id},keyed:!0,get children(){return a(gs,{page:1})}})),u}})]}}),null),r})()}_e(["click"]);var eC=p("<h2 data-k-a9353a86>"),tC=p("<span data-k-a9353a86>View all"),nC=p("<section data-k-a9353a86><ol data-k-a9353a86 class=grid-reel-auto-fill>");function gt(e){return F("href"in e,"Link is missing"),(()=>{var t=nC(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=eC();return d(r,()=>e.title),r})(),tC()]}}),n),d(n,a(H,{get each(){return e.data},children:r=>a(fi,{media:r})})),t})()}var rC=p("<h2 data-k-a96044c6>"),aC=p("<section data-k-a96044c6><ol data-k-a96044c6 class=vertical-search-card-row>"),iC=p("<img data-k-a96044c6 class=cover alt=Cover.>"),lC=p('<li data-k-a96044c6 class=vertical-search-card><p data-k-a96044c6 class=ranking>#<span data-k-a96044c6></span></p><div data-k-a96044c6 class=vertical-search-card-body><div data-k-a96044c6 class="vertical-search-card-content clamp"><ol data-k-a96044c6 class=vertical-search-card-genre-list></ol></div><div data-k-a96044c6 class=vertical-search-card-info><div data-k-a96044c6 class=vertical-search-card-score><div data-k-a96044c6 class=clamp><p data-k-a96044c6>%</p><p data-k-a96044c6> users</p></div></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6></p><p data-k-a96044c6></p></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6> </p><p data-k-a96044c6>'),sC=p("<li data-k-a96044c6 class=vertical-search-card-genre>");function fs(e){return F("href"in e,"Link is missing"),Ct(e.type,"type"),(()=>{var t=aC(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=rC();return d(r,()=>e.title),r})(),"View all"]}}),n),d(n,a(H,{get each(){return e.data},children:(r,i)=>(()=>{var l=lC(),s=l.firstChild,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=m.firstChild,v=y.firstChild,$=v.firstChild,C=v.nextSibling,S=C.firstChild,k=m.nextSibling,b=k.firstChild,A=b.nextSibling,w=k.nextSibling,_=w.firstChild,x=_.firstChild,I=_.nextSibling;return d(c,()=>i()+1),d(u,a(B,{class:"cover-container",get href(){return Ve(r)},get children(){var E=iC();return P(()=>V(E,"src",r.coverImage.large)),E}}),h),d(h,a(B,{class:"line-clamp",get href(){return Ve(r)},get children(){return r.title.userPreferred}}),f),d(f,a(H,{get each(){return r.genres},children:E=>(()=>{var L=sC();return d(L,a(B,{get href(){return`/search${e.type?"/"+e.type:""}?genre=`+E},children:E})),L})()})),d(m,a(Zr,{get score(){return r.averageScore}}),y),d(v,()=>r.averageScore,$),d(C,()=>ye(r.popularity),S),d(b,()=>kr(r.format)),d(A,a(z,{get children(){return[a(M,{get when(){return r.type==="ANIME"},get children(){return a(T,{get when(){return r.episodes},fallback:"Ongoing",get children(){return[N(()=>ye(r.episodes))," Episode",a(T,{get when(){return r.episodes>1},children:"s"})]}})}}),a(M,{get when(){return r.type==="MANGA"},get children(){return a(T,{get when(){return r.chapters},fallback:"Ongoing",get children(){return[N(()=>ye(r.chapters))," Chapter",a(T,{get when(){return r.chapters>1},children:"s"})]}})}})]}})),d(_,()=>qe(r.season),x),d(_,()=>r.seasonYear,null),d(I,()=>qe(r.status)),P(E=>(E=r.coverImage.color)!=null?l.style.setProperty("--media-background-color",E):l.style.removeProperty("--media-background-color")),l})()})),t})()}var oC=p("<div data-k-bc27f66a class=browse-content>");function cC(){const{accessToken:e}=ie(),[t]=oe.anilist.trendingManga(e);return document.title="Browse manga - LOB",a(T,{get when(){return t()},get children(){var n=oC();return d(n,a(gt,{get data(){return t().data.data.trending.media},href:"/search/manga/trending",title:"Trending now"}),null),d(n,a(gt,{get data(){return t().data.data.novel.media},href:"/search/manga/novel",title:"Popular light novels"}),null),d(n,a(gt,{get data(){return t().data.data.manhwa.media},href:"/search/manga/manhwa",title:"Popular Manhwas"}),null),d(n,a(gt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished-manga",title:"Recently finished mangas"}),null),d(n,a(gt,{get data(){return t().data.data.finishedNovel.media},href:"/search/manga/finished-novel",title:"Recently finished light novels"}),null),d(n,a(gt,{get data(){return t().data.data.popular.media},href:"/search/manga/popular",title:"All time popular"}),null),d(n,a(fs,{get data(){return t().data.data.top.media},type:"manga",href:"/search/manga/top-100",title:"Top 100 manga"}),null),n}})}var dC=p("<div data-k-ac073097 class=browse-content>");function uC(){const{accessToken:e}=ie(),[t]=oe.anilist.trendingAnime(e);return document.title="Browse anime - LOB",a(T,{get when(){return t()},get children(){var n=dC();return d(n,a(gt,{get data(){return t().data.data.trending.media},href:"/search/anime/trending",title:"Trending now"}),null),d(n,a(gt,{get data(){return t().data.data.season.media},href:"/search/anime/this-season?order=popularity",title:"Popular this season"}),null),d(n,a(gt,{get data(){return t().data.data.nextSeason.media},href:"/search/anime/next-season?order=popularity",title:"Upcoming next season"}),null),d(n,a(gt,{get data(){return t().data.data.finished.media},href:"/search/anime/finished",title:"Recently finished"}),null),d(n,a(gt,{get data(){return t().data.data.popular.media},href:"/search/anime/popular",title:"All time popular"}),null),d(n,a(fs,{get data(){return t().data.data.top.media},type:"anime",href:"/search/anime/top-100",title:"Top 100 anime"}),null),n}})}var hC=p("<div data-k-49f3f573 class=browse-content>");function gC(){const{accessToken:e}=ie(),[t]=oe.anilist.trendingMedia(e);return document.title="Browse media - LOB",a(T,{get when(){return t()},get children(){var n=hC();return d(n,a(gt,{get data(){return t().data.data.trending.media},href:"/search/media/trending",title:"Trending anime and manga"}),null),d(n,a(gt,{get data(){return t().data.data.newAnime.media},href:"/search/anime/new",title:"Newly added anime"}),null),d(n,a(gt,{get data(){return t().data.data.newManga.media},href:"/search/manga/new",title:"Newly added manga"}),null),d(n,a(gt,{get data(){return t().data.data.finishedAnime.media},href:"/search/anime/finished",title:"Recently finished anime"}),null),d(n,a(gt,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished",title:"Recently finished manga"}),null),d(n,a(fs,{get data(){return t().data.data.top.media},type:"media",href:"/search/media/top-100",title:"Top 100 anime and manga"}),null),n}})}var fC=p("<div>Not fould 404");const mC=document.getElementById("root"),_n={id:/^\d+$/},pC={type:"anime",header:e=>e.match(/^(summer|fall|spring|winter)-\d+$/)?!0:["finished","this-season","new","tba","next-season","trending","popular","top-100"].includes(e)},vC={type:"manga",header:["finished","finished-manga","tba","finished-novel","novel","new","manhwa","trending","popular","top-100"]},$C={type:"media",header:["finished","trending","popular","top-100","tba"]};rh(()=>a(uv,{get children(){return a(hv,{get children(){return a($y,{get children(){return a(Hh,{root:gm,base:"/legendary-octo-barnacle",get children(){return[a(de,{path:"/",component:cv}),a(de,{path:"/authentication",component:dv}),a(de,{path:"/notifications",component:Fb}),a(de,{path:"/activity/:id",matchFilters:_n,component:j0}),a(de,{path:"/compare",get children(){return[a(de,{path:"/",component:()=>a(dn,{href:"anime"})}),a(de,{path:"/:type",matchFilters:{type:["anime","manga"]},component:i2}),a(de,{path:"*",component:()=>a(dn,{href:"/compare"})})]}}),a(de,{path:"/:mode",matchFilters:{mode:["browse","search"]},component:m1,get children(){return[a(de,{path:"/",matchFilters:{mode:"browse"},component:z0,get children(){return[a(de,{path:"/:type",matchFilters:{type:"media"},component:gC}),a(de,{path:"/:type",matchFilters:{type:"anime"},component:uC}),a(de,{path:"/:type",matchFilters:{type:"manga"},component:cC})]}}),a(de,{path:"/",matchFilters:{mode:"search"},component:p1,get children(){return[a(de,{path:"/",component:()=>a(dn,{href:"media"})}),a(de,{path:"/:type",matchFilters:{type:["anime","manga","media"]},get children(){return[a(de,{path:"/:header?",matchFilters:pC}),a(de,{path:"/:header?",matchFilters:vC}),a(de,{path:"/:header?",matchFilters:$C}),a(de,{path:"/:header?",component:v1})]}})]}})]}}),a(de,{path:"/artist/:name",component:Lb}),a(de,{path:"/:api",get children(){return[a(de,{path:"/:sub/:id/:name?",matchFilters:{api:"ani"},get children(){return[a(de,{path:"/",get matchFilters(){return{..._n,sub:"character"}},component:E0}),a(de,{path:"/",get matchFilters(){return{..._n,sub:"staff"}},component:L0}),a(de,{path:"/",get matchFilters(){return{..._n,sub:"studio"}},component:U0})]}}),a(de,{path:"/:sub/:id/:name?",matchFilters:{api:"mal"},get children(){return a(de,{path:"/",get matchFilters(){return{..._n,sub:"character"}},component:Q2})}})]}}),a(de,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,type:["anime","manga"]}},component:BS}),a(de,{path:"/:api",get children(){return[a(de,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,api:"ani"}},component:FS,get children(){return[a(de,{path:"/",matchFilters:{type:["anime","manga"]},component:US}),a(de,{path:"/:sub",matchFilters:{sub:"characters"},get children(){return[a(de,{path:"/",matchFilters:{type:"anime"},component:Qb}),a(de,{path:"/",matchFilters:{type:"manga"},component:e0})]}}),a(de,{path:"/:sub",matchFilters:{sub:"staff"},get children(){return[a(de,{path:"/",matchFilters:{type:"anime"},component:t0}),a(de,{path:"/",matchFilters:{type:"manga"},component:n0})]}})]}}),a(de,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,api:"mal"}},component:V2,get children(){return[a(de,{path:"/",matchFilters:{type:["anime","manga"]},component:G2}),a(de,{path:"/:sub",get children(){return[a(de,{path:"/",matchFilters:{sub:"characters",type:["anime","manga"]},component:W2}),a(de,{path:"/",matchFilters:{sub:"staff",type:"anime"},component:K2})]}})]}})]}}),a(de,{path:"/user/:name",component:C1,get children(){return[a(de,{path:"/",component:bw}),a(de,{path:"/:type/:list?",matchFilters:{type:"anime"},component:Vo}),a(de,{path:"/:type/:list?",matchFilters:{type:"manga"},component:Vo}),a(de,{path:"/favourites",component:sk}),a(de,{path:"/stats",component:ck,get children(){return[a(de,{path:"/",component:()=>a(dn,{href:"anime"})}),a(de,{path:"/:type",matchFilters:{type:"anime"},get children(){return[a(de,{path:"/",component:()=>a(dn,{href:"overview"})}),a(de,{path:"/overview",component:r_}),a(de,{path:"/genres",component:$_}),a(de,{path:"/tags",component:T_}),a(de,{path:"/studios",component:U_}),a(de,{path:"/staff",component:ob}),a(de,{path:"/voice-actors",component:X_})]}}),a(de,{path:"/:type",matchFilters:{type:"manga"},get children(){return[a(de,{path:"/",component:()=>a(dn,{href:"overview"})}),a(de,{path:"/overview",component:a_}),a(de,{path:"/genres",component:__}),a(de,{path:"/tags",component:I_}),a(de,{path:"/staff",component:cb})]}})]}}),a(de,{path:"/socials",component:QS})]}}),a(de,{path:"*404",component:()=>fC()})]}})}})}})}}),mC);
