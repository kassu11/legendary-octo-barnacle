var ku=Object.defineProperty;var ks=e=>{throw TypeError(e)};var Su=(e,t,n)=>t in e?ku(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var De=(e,t,n)=>Su(e,typeof t!="symbol"?t+"":t,n),$i=(e,t,n)=>t.has(e)||ks("Cannot "+n);var Ie=(e,t,n)=>($i(e,t,"read from private field"),n?n.call(e):t.get(e)),lt=(e,t,n)=>t.has(e)?ks("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),st=(e,t,n,r)=>($i(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),It=(e,t,n)=>($i(e,t,"access private method"),n);var _i=(e,t,n,r)=>({set _(i){st(e,t,i,n)},get _(){return Ie(e,t,r)}});(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const Cu=!1,xu=(e,t)=>e===t,zt=Symbol("solid-proxy"),Yo=typeof Proxy=="function",Ki=Symbol("solid-track"),Ua={equals:xu};let zr=null,jo=Jo;const an=1,Ba=2,zo={owned:null,cleanups:null,context:null,owner:null},bi={};var ke=null;let yi=null,Au=null,Le=null,gt=null,jt=null,ti=0;function Wr(e,t){const n=Le,r=ke,i=e.length===0,l=t===void 0?r:t,s=i?zo:{owned:null,cleanups:null,context:l?l.context:null,owner:l},o=i?e:()=>e(()=>Ce(()=>Zr(s)));ke=s,Le=null;try{return rn(o,!0)}finally{Le=n,ke=r}}function O(e,t){t=t?Object.assign({},Ua,t):Ua;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=i=>(typeof i=="function"&&(i=i(n.value)),Ko(n,i));return[qo.bind(n),r]}function Tu(e,t,n){const r=sa(e,t,!0,an);Sr(r)}function L(e,t,n){const r=sa(e,t,!1,an);Sr(r)}function W(e,t,n){jo=Nu;const r=sa(e,t,!1,an);r.user=!0,jt?jt.push(r):Sr(r)}function N(e,t,n){n=n?Object.assign({},Ua,n):Ua;const r=sa(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Sr(r),qo.bind(r)}function Iu(e){return e&&typeof e=="object"&&"then"in e}function Eu(e,t,n){let r,i,l;r=!0,i=e,l={};let s=null,o=bi,c=!1,u="initialValue"in l,h=typeof r=="function"&&N(r);const f=new Set,[g,m]=(l.storage||O)(l.initialValue),[y,v]=O(void 0),[_,x]=O(void 0,{equals:!1}),[S,k]=O(u?"ready":"unresolved");function b(C,E,I,P){return s===C&&(s=null,P!==void 0&&(u=!0),(C===o||E===o)&&l.onHydrated&&queueMicrotask(()=>l.onHydrated(P,{value:E})),o=bi,A(E,I)),E}function A(C,E){rn(()=>{E===void 0&&m(()=>C),k(E!==void 0?"errored":u?"ready":"unresolved"),v(E);for(const I of f.keys())I.decrement();f.clear()},!1)}function w(){const C=Mu,E=g(),I=y();if(I!==void 0&&!s)throw I;return Le&&Le.user,E}function $(C=!0){if(C!==!1&&c)return;c=!1;const E=h?h():r;if(E==null||E===!1){b(s,Ce(g));return}const I=o!==bi?o:Ce(()=>i(E,{value:g(),refetching:C}));return Iu(I)?(s=I,"value"in I?(I.status==="success"?b(s,I.value,void 0,E):b(s,void 0,Xi(I.value),E),I):(c=!0,queueMicrotask(()=>c=!1),rn(()=>{k(u?"refreshing":"pending"),x()},!1),I.then(P=>b(I,P,void 0,E),P=>b(I,void 0,Xi(P),E)))):(b(s,I,void 0,E),I)}return Object.defineProperties(w,{state:{get:()=>S()},error:{get:()=>y()},loading:{get(){const C=S();return C==="pending"||C==="refreshing"}},latest:{get(){if(!u)return w();const C=y();if(C&&!s)throw C;return g()}}}),h?Tu(()=>$(!1)):$(!1),[w,{refetch:$,mutate:m}]}function He(e){return rn(e,!1)}function Ce(e){if(Le===null)return e();const t=Le;Le=null;try{return e()}finally{Le=t}}function se(e,t,n){const r=Array.isArray(e);let i,l=n&&n.defer;return s=>{let o;if(r){o=Array(e.length);for(let u=0;u<e.length;u++)o[u]=e[u]()}else o=e();if(l)return l=!1,s;const c=Ce(()=>t(o,i,s));return i=o,c}}function xn(e){W(()=>Ce(e))}function Ye(e){return ke===null||(ke.cleanups===null?ke.cleanups=[e]:ke.cleanups.push(e)),e}function Lu(e,t){zr||(zr=Symbol("error")),ke=sa(void 0,void 0,!0),ke.context={...ke.context,[zr]:[t]};try{return e()}catch(n){oa(n)}finally{ke=ke.owner}}function Ji(){return Le}function kr(){return ke}function Wo(e,t){const n=ke,r=Le;ke=e,Le=null;try{return rn(t,!0)}catch(i){oa(i)}finally{ke=n,Le=r}}function Pu(e){const t=Le,n=ke;return Promise.resolve().then(()=>{Le=t,ke=n;let r;return rn(e,!1),Le=ke=null,r?r.done:void 0})}const[fC,mC]=O(!1);function Kt(e,t){const n=Symbol("context");return{id:n,Provider:Ou(n),defaultValue:e}}function Bt(e){let t;return ke&&ke.context&&(t=ke.context[e.id])!==void 0?t:e.defaultValue}function ni(e){const t=N(e),n=N(()=>Zi(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let Mu;function qo(){if(this.sources&&this.state)if(this.state===an)Sr(this);else{const e=gt;gt=null,rn(()=>Ga(this),!1),gt=e}if(Le){const e=this.observers?this.observers.length:0;Le.sources?(Le.sources.push(this),Le.sourceSlots.push(e)):(Le.sources=[this],Le.sourceSlots=[e]),this.observers?(this.observers.push(Le),this.observerSlots.push(Le.sources.length-1)):(this.observers=[Le],this.observerSlots=[Le.sources.length-1])}return this.value}function Ko(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&rn(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],s=yi&&yi.running;s&&yi.disposed.has(l),(s?!l.tState:!l.state)&&(l.pure?gt.push(l):jt.push(l),l.observers&&Xo(l)),s||(l.state=an)}if(gt.length>1e6)throw gt=[],new Error},!1)),t}function Sr(e){if(!e.fn)return;Zr(e);const t=ti;Du(e,e.value,t)}function Du(e,t,n){let r;const i=ke,l=Le;Le=ke=e;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=an,e.owned&&e.owned.forEach(Zr),e.owned=null),e.updatedAt=n+1,oa(s)}finally{Le=l,ke=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ko(e,r):e.value=r,e.updatedAt=n)}function sa(e,t,n,r=an,i){const l={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:ke,context:ke?ke.context:null,pure:n};return ke===null||ke!==zo&&(ke.owned?ke.owned.push(l):ke.owned=[l]),l}function Va(e){if(e.state===0)return;if(e.state===Ba)return Ga(e);if(e.suspense&&Ce(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ti);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===an)Sr(e);else if(e.state===Ba){const r=gt;gt=null,rn(()=>Ga(e,t[0]),!1),gt=r}}function rn(e,t){if(gt)return e();let n=!1;t||(gt=[]),jt?n=!0:jt=[],ti++;try{const r=e();return Ru(n),r}catch(r){n||(jt=null),gt=null,oa(r)}}function Ru(e){if(gt&&(Jo(gt),gt=null),e)return;const t=jt;jt=null,t.length&&rn(()=>jo(t),!1)}function Jo(e){for(let t=0;t<e.length;t++)Va(e[t])}function Nu(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:Va(r)}for(t=0;t<n;t++)Va(e[t])}function Ga(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const i=r.state;i===an?r!==t&&(!r.updatedAt||r.updatedAt<ti)&&Va(r):i===Ba&&Ga(r,t)}}}function Xo(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Ba,n.pure?gt.push(n):jt.push(n),n.observers&&Xo(n))}}function Zr(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const l=i.pop(),s=n.observerSlots.pop();r<i.length&&(l.sourceSlots[s]=r,i[r]=l,n.observerSlots[r]=s)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)Zr(e.tOwned[t]);delete e.tOwned}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Zr(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Xi(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ss(e,t,n){try{for(const r of t)r(e)}catch(r){oa(r,n&&n.owner||null)}}function oa(e,t=ke){const n=zr&&t&&t.context&&t.context[zr],r=Xi(e);if(!n)throw r;jt?jt.push({fn(){Ss(r,n,t)},state:an}):Ss(r,n,t)}function Zi(e){if(typeof e=="function"&&!e.length)return Zi(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=Zi(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function Ou(e,t){return function(r){let i;return L(()=>i=Ce(()=>(ke.context={...ke.context,[e]:r.value},ni(()=>r.children))),void 0),i}}const Fu=Symbol("fallback");function Cs(e){for(let t=0;t<e.length;t++)e[t]()}function Uu(e,t,n={}){let r=[],i=[],l=[],s=0,o=t.length>1?[]:null;return Ye(()=>Cs(l)),()=>{let c=e()||[],u=c.length,h,f;return c[Ki],Ce(()=>{let m,y,v,_,x,S,k,b,A;if(u===0)s!==0&&(Cs(l),l=[],r=[],i=[],s=0,o&&(o=[])),n.fallback&&(r=[Fu],i[0]=Wr(w=>(l[0]=w,n.fallback())),s=1);else if(s===0){for(i=new Array(u),f=0;f<u;f++)r[f]=c[f],i[f]=Wr(g);s=u}else{for(v=new Array(u),_=new Array(u),o&&(x=new Array(u)),S=0,k=Math.min(s,u);S<k&&r[S]===c[S];S++);for(k=s-1,b=u-1;k>=S&&b>=S&&r[k]===c[b];k--,b--)v[b]=i[k],_[b]=l[k],o&&(x[b]=o[k]);for(m=new Map,y=new Array(b+1),f=b;f>=S;f--)A=c[f],h=m.get(A),y[f]=h===void 0?-1:h,m.set(A,f);for(h=S;h<=k;h++)A=r[h],f=m.get(A),f!==void 0&&f!==-1?(v[f]=i[h],_[f]=l[h],o&&(x[f]=o[h]),f=y[f],m.set(A,f)):l[h]();for(f=S;f<u;f++)f in v?(i[f]=v[f],l[f]=_[f],o&&(o[f]=x[f],o[f](f))):i[f]=Wr(g);i=i.slice(0,s=u),r=c.slice(0)}return i});function g(m){if(l[f]=m,o){const[y,v]=O(f);return o[f]=v,t(c[f],y)}return t(c[f])}}}function a(e,t){return Ce(()=>e(t||{}))}function va(){return!0}const Qi={get(e,t,n){return t===zt?n:e.get(t)},has(e,t){return t===zt?!0:e.has(t)},set:va,deleteProperty:va,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:va,deleteProperty:va}},ownKeys(e){return e.keys()}};function wi(e){return(e=typeof e=="function"?e():e)?e:{}}function Bu(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Fe(...e){let t=!1;for(let s=0;s<e.length;s++){const o=e[s];t=t||!!o&&zt in o,e[s]=typeof o=="function"?(t=!0,N(o)):o}if(Yo&&t)return new Proxy({get(s){for(let o=e.length-1;o>=0;o--){const c=wi(e[o])[s];if(c!==void 0)return c}},has(s){for(let o=e.length-1;o>=0;o--)if(s in wi(e[o]))return!0;return!1},keys(){const s=[];for(let o=0;o<e.length;o++)s.push(...Object.keys(wi(e[o])));return[...new Set(s)]}},Qi);const n={},r=Object.create(null);for(let s=e.length-1;s>=0;s--){const o=e[s];if(!o)continue;const c=Object.getOwnPropertyNames(o);for(let u=c.length-1;u>=0;u--){const h=c[u];if(h==="__proto__"||h==="constructor")continue;const f=Object.getOwnPropertyDescriptor(o,h);if(!r[h])r[h]=f.get?{enumerable:!0,configurable:!0,get:Bu.bind(n[h]=[f.get.bind(o)])}:f.value!==void 0?f:void 0;else{const g=n[h];g&&(f.get?g.push(f.get.bind(o)):f.value!==void 0&&g.push(()=>f.value))}}}const i={},l=Object.keys(r);for(let s=l.length-1;s>=0;s--){const o=l[s],c=r[o];c&&c.get?Object.defineProperty(i,o,c):i[o]=c?c.value:void 0}return i}function ri(e,...t){if(Yo&&zt in e){const i=new Set(t.length>1?t.flat():t[0]),l=t.map(s=>new Proxy({get(o){return s.includes(o)?e[o]:void 0},has(o){return s.includes(o)&&o in e},keys(){return s.filter(o=>o in e)}},Qi));return l.push(new Proxy({get(s){return i.has(s)?void 0:e[s]},has(s){return i.has(s)?!1:s in e},keys(){return Object.keys(e).filter(s=>!i.has(s))}},Qi)),l}const n={},r=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const l=Object.getOwnPropertyDescriptor(e,i),s=!l.get&&!l.set&&l.enumerable&&l.writable&&l.configurable;let o=!1,c=0;for(const u of t)u.includes(i)&&(o=!0,s?r[c][i]=l.value:Object.defineProperty(r[c],i,l)),++c;o||(s?n[i]=l.value:Object.defineProperty(n,i,l))}return[...r,n]}const Zo=e=>`Stale read from <${e}>.`;function Y(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(Uu(()=>e.each,e.children,t||void 0))}function T(e){const t=e.keyed,n=N(()=>e.when,void 0,void 0),r=t?n:N(n,void 0,{equals:(i,l)=>!i==!l});return N(()=>{const i=r();if(i){const l=e.children;return typeof l=="function"&&l.length>0?Ce(()=>l(t?i:()=>{if(!Ce(r))throw Zo("Show");return n()})):l}return e.fallback},void 0,void 0)}function j(e){const t=ni(()=>e.children),n=N(()=>{const r=t(),i=Array.isArray(r)?r:[r];let l=()=>{};for(let s=0;s<i.length;s++){const o=s,c=i[s],u=l,h=N(()=>u()?void 0:c.when,void 0,void 0),f=c.keyed?h:N(h,void 0,{equals:(g,m)=>!g==!m});l=()=>u()||(f()?[o,h,c]:void 0)}return l});return N(()=>{const r=n()();if(!r)return e.fallback;const[i,l,s]=r,o=s.children;return typeof o=="function"&&o.length>0?Ce(()=>o(s.keyed?l():()=>{var u;if(((u=Ce(n)())==null?void 0:u[0])!==i)throw Zo("Match");return l()})):o},void 0,void 0)}function M(e){return e}let ar;function Vu(){ar&&[...ar].forEach(e=>e())}function rt(e){let t;const[n,r]=O(t,void 0);return ar||(ar=new Set),ar.add(r),Ye(()=>ar.delete(r)),N(()=>{let i;if(i=n()){const l=e.fallback;return typeof l=="function"&&l.length?Ce(()=>l(i,()=>r())):l}return Lu(()=>e.children,r)},void 0,void 0)}const Gu=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Hu=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Gu]),Yu=new Set(["innerHTML","textContent","innerText","children"]),ju=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),zu=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Wu(e,t){const n=zu[e];return typeof n=="object"?n[t]?n.$:void 0:n}const qu=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ku=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),Ju={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Xu(e,t,n){let r=n.length,i=t.length,l=r,s=0,o=0,c=t[i-1].nextSibling,u=null;for(;s<i||o<l;){if(t[s]===n[o]){s++,o++;continue}for(;t[i-1]===n[l-1];)i--,l--;if(i===s){const h=l<r?o?n[o-1].nextSibling:n[l-o]:c;for(;o<l;)e.insertBefore(n[o++],h)}else if(l===o)for(;s<i;)(!u||!u.has(t[s]))&&t[s].remove(),s++;else if(t[s]===n[l-1]&&n[o]===t[i-1]){const h=t[--i].nextSibling;e.insertBefore(n[o++],t[s++].nextSibling),e.insertBefore(n[--l],h),t[i]=n[l]}else{if(!u){u=new Map;let f=o;for(;f<l;)u.set(n[f],f++)}const h=u.get(t[s]);if(h!=null)if(o<h&&h<l){let f=s,g=1,m;for(;++f<i&&f<l&&!((m=u.get(t[f]))==null||m!==h+g);)g++;if(g>h-o){const y=t[s];for(;o<h;)e.insertBefore(n[o++],y)}else e.replaceChild(n[o++],t[s++])}else s++;else t[s++].remove()}}}const xs="_$DX_DELEGATE";function Zu(e,t,n,r={}){let i;return Wr(l=>{i=l,t===document?e():d(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{i(),t.textContent=""}}function p(e,t,n,r){let i;const l=()=>{const o=r?document.createElementNS("http://www.w3.org/1998/Math/MathML","template"):document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:r?o.firstChild:o.content.firstChild},s=t?()=>Ce(()=>document.importNode(i||(i=l()),!0)):()=>(i||(i=l())).cloneNode(!0);return s.cloneNode=s,s}function _e(e,t=window.document){const n=t[xs]||(t[xs]=new Set);for(let r=0,i=e.length;r<i;r++){const l=e[r];n.has(l)||(n.add(l),t.addEventListener(l,ih))}}function V(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Qu(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function eh(e,t,n){n?e.setAttribute(t,""):e.removeAttribute(t)}function Rt(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ha(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=l=>i.call(e,n[1],l))}else e.addEventListener(t,n,typeof n!="function"&&n)}function th(e,t,n={}){const r=Object.keys(t||{}),i=Object.keys(n);let l,s;for(l=0,s=i.length;l<s;l++){const o=i[l];!o||o==="undefined"||t[o]||(As(e,o,!1),delete n[o])}for(l=0,s=r.length;l<s;l++){const o=r[l],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(As(e,o,!0),n[o]=c)}return n}function nh(e,t,n){if(!t)return n?V(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let i,l;for(l in n)t[l]==null&&r.removeProperty(l),delete n[l];for(l in t)i=t[l],i!==n[l]&&(r.setProperty(l,i),n[l]=i);return n}function Et(e,t={},n,r){const i={};return r||L(()=>i.children=Qr(e,t.children,i.children)),L(()=>typeof t.ref=="function"&&ue(t.ref,e)),L(()=>rh(e,t,n,!0,i,!0)),i}function ue(e,t,n){return Ce(()=>e(t,n))}function d(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return Qr(e,t,r,n);L(i=>Qr(e,t(),i,n),r)}function rh(e,t,n,r,i={},l=!1){t||(t={});for(const s in i)if(!(s in t)){if(s==="children")continue;i[s]=Ts(e,s,null,i[s],n,l,t)}for(const s in t){if(s==="children")continue;const o=t[s];i[s]=Ts(e,s,o,i[s],n,l,t)}}function ah(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function As(e,t,n){const r=t.trim().split(/\s+/);for(let i=0,l=r.length;i<l;i++)e.classList.toggle(r[i],n)}function Ts(e,t,n,r,i,l,s){let o,c,u,h,f;if(t==="style")return nh(e,n,r);if(t==="classList")return th(e,n,r);if(n===r)return r;if(t==="ref")l||n(e);else if(t.slice(0,3)==="on:"){const g=t.slice(3);r&&e.removeEventListener(g,r,typeof r!="function"&&r),n&&e.addEventListener(g,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const g=t.slice(10);r&&e.removeEventListener(g,r,!0),n&&e.addEventListener(g,n,!0)}else if(t.slice(0,2)==="on"){const g=t.slice(2).toLowerCase(),m=qu.has(g);if(!m&&r){const y=Array.isArray(r)?r[0]:r;e.removeEventListener(g,y)}(m||n)&&(Ha(e,g,n,m),m&&_e([g]))}else if(t.slice(0,5)==="attr:")V(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")eh(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(u=Yu.has(t))||!i&&((h=Wu(t,e.tagName))||(c=Hu.has(t)))||(o=e.nodeName.includes("-")||"is"in s))f&&(t=t.slice(5),c=!0),t==="class"||t==="className"?Rt(e,n):o&&!c&&!u?e[ah(t)]=n:e[h||t]=n;else{const g=i&&t.indexOf(":")>-1&&Ju[t.split(":")[0]];g?Qu(e,g,t,n):V(e,ju[t]||t,n)}return n}function ih(e){let t=e.target;const n=`$$${e.type}`,r=e.target,i=e.currentTarget,l=c=>Object.defineProperty(e,"target",{configurable:!0,value:c}),s=()=>{const c=t[n];if(c&&!t.disabled){const u=t[`${n}Data`];if(u!==void 0?c.call(t,u,e):c.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&l(t.host),!0},o=()=>{for(;s()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),e.composedPath){const c=e.composedPath();l(c[0]);for(let u=0;u<c.length-2&&(t=c[u],!!s());u++){if(t._$host){t=t._$host,o();break}if(t.parentNode===i)break}}else o();l(r)}function Qr(e,t,n,r,i){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,s=r!==void 0;if(e=s&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(l==="number"&&(t=t.toString(),t===n))return n;if(s){let o=n[0];o&&o.nodeType===3?o.data!==t&&(o.data=t):o=document.createTextNode(t),n=Qn(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean")n=Qn(e,n,r);else{if(l==="function")return L(()=>{let o=t();for(;typeof o=="function";)o=o();n=Qr(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(el(o,t,n,i))return L(()=>n=Qr(e,o,n,r,!0)),()=>n;if(o.length===0){if(n=Qn(e,n,r),s)return n}else c?n.length===0?Is(e,o,r):Xu(e,n,o):(n&&Qn(e),Is(e,o));n=o}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=Qn(e,n,r,t);Qn(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function el(e,t,n,r){let i=!1;for(let l=0,s=t.length;l<s;l++){let o=t[l],c=n&&n[e.length],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=el(e,o,c)||i;else if(u==="function")if(r){for(;typeof o=="function";)o=o();i=el(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||i}else e.push(o),i=!0;else{const h=String(o);c&&c.nodeType===3&&c.data===h?e.push(c):e.push(document.createTextNode(h))}}return i}function Is(e,t,n=null){for(let r=0,i=t.length;r<i;r++)e.insertBefore(t[r],n)}function Qn(e,t,n,r){if(n===void 0)return e.textContent="";const i=r||document.createTextNode("");if(t.length){let l=!1;for(let s=t.length-1;s>=0;s--){const o=t[s];if(i!==o){const c=o.parentNode===e;!l&&!s?c?e.replaceChild(i,o):e.insertBefore(i,n):c&&o.remove()}else l=!0}}else e.insertBefore(i,n);return[i]}const lh=!1,sh="http://www.w3.org/2000/svg";function oh(e,t=!1){return t?document.createElementNS(sh,e):document.createElement(e)}function ch(e,t){const n=N(e);return N(()=>{const r=n();switch(typeof r){case"function":return Ce(()=>r(t));case"string":const i=Ku.has(r),l=oh(r,i);return Et(l,t,i),l}})}function ki(e){const[,t]=ri(e,["component"]);return ch(()=>e.component,t)}function Qo(){let e=new Set;function t(i){return e.add(i),()=>e.delete(i)}let n=!1;function r(i,l){if(n)return!(n=!1);const s={to:i,options:l,defaultPrevented:!1,preventDefault:()=>s.defaultPrevented=!0};for(const o of e)o.listener({...s,from:o.location,retry:c=>{c&&(n=!0),o.navigate(i,{...l,resolve:!1})}});return!s.defaultPrevented}return{subscribe:t,confirm:r}}let tl;function Al(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),tl=window.history.state._depth}Al();function dh(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function uh(e,t){let n=!1;return()=>{const r=tl;Al();const i=r==null?null:tl-r;if(n){n=!1;return}i&&t(i)?(n=!0,window.history.go(-i)):e()}}const hh=/^(?:[a-z0-9]+:)?\/\//i,gh=/^\/+|(\/)\/+$/g,ec="http://sr";function Fn(e,t=!1){const n=e.replace(gh,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function Ra(e,t,n){if(hh.test(t))return;const r=Fn(e),i=n&&Fn(n);let l="";return!i||t.startsWith("/")?l=r:i.toLowerCase().indexOf(r.toLowerCase())!==0?l=r+i:l=i,(l||"/")+Fn(t,!l)}function fh(e,t){if(e==null)throw new Error(t);return e}function mh(e,t){return Fn(e).replace(/\/*(\*.*)?$/g,"")+Fn(t)}function tc(e){const t={};return e.searchParams.forEach((n,r)=>{r in t?Array.isArray(t[r])?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),t}function ph(e,t,n){const[r,i]=e.split("/*",2),l=r.split("/").filter(Boolean),s=l.length;return o=>{const c=o.split("/").filter(Boolean),u=c.length-s;if(u<0||u>0&&i===void 0&&!t)return null;const h={path:s?"":"/",params:{}},f=g=>n===void 0?void 0:n[g];for(let g=0;g<s;g++){const m=l[g],y=m[0]===":",v=y?c[g]:c[g].toLowerCase(),_=y?m.slice(1):m.toLowerCase();if(y&&Si(v,f(_)))h.params[_]=v;else if(y||!Si(v,_))return null;h.path+=`/${v}`}if(i){const g=u?c.slice(-u).join("/"):"";if(Si(g,f(i)))h.params[i]=g;else return null}return h}}function Si(e,t){const n=r=>r===e;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function vh(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((i,l)=>i+(l.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function nc(e){const t=new Map,n=kr();return new Proxy({},{get(r,i){return t.has(i)||Wo(n,()=>t.set(i,N(()=>e()[i]))),t.get(i)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function $h(e,t){const n=new URLSearchParams(e);Object.entries(t).forEach(([i,l])=>{l==null||l===""||l instanceof Array&&!l.length?n.delete(i):l instanceof Array?(n.delete(i),l.forEach(s=>{n.append(i,String(s))})):n.set(i,String(l))});const r=n.toString();return r?`?${r}`:""}function rc(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const i=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)i.push(n+=t[1]),r=r.slice(t[0].length);return rc(r).reduce((l,s)=>[...l,...i.map(o=>o+s)],[])}const _h=100,ac=Kt(),Tl=Kt(),ca=()=>fh(Bt(ac),"<A> and 'use' router primitives can be only used inside a Route."),bh=()=>Bt(Tl)||ca().base,yh=e=>{const t=bh();return N(()=>t.resolvePath(e()))},wh=e=>{const t=ca();return N(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},un=()=>ca().navigatorFactory(),Jt=()=>ca().location,te=()=>ca().params,Ae=()=>{const e=Jt(),t=un(),n=(r,i)=>{const l=Ce(()=>$h(e.search,r)+e.hash);t(l,{scroll:!1,resolve:!1,...i})};return[e.query,n]};function kh(e,t=""){const{component:n,preload:r,load:i,children:l,info:s}=e,o=!l||Array.isArray(l)&&!l.length,c={key:e,component:n,preload:r||i,info:s};return ic(e.path).reduce((u,h)=>{for(const f of rc(h)){const g=mh(t,f);let m=o?g:g.split("/*",1)[0];m=m.split("/").map(y=>y.startsWith(":")||y.startsWith("*")?y:encodeURIComponent(y)).join("/"),u.push({...c,originalPath:h,pattern:m,matcher:ph(m,!o,e.matchFilters)})}return u},[])}function Sh(e,t=0){return{routes:e,score:vh(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let i=e.length-1;i>=0;i--){const l=e[i],s=l.matcher(n);if(!s)return null;r.unshift({...s,route:l})}return r}}}function ic(e){return Array.isArray(e)?e:[e]}function lc(e,t="",n=[],r=[]){const i=ic(e);for(let l=0,s=i.length;l<s;l++){const o=i[l];if(o&&typeof o=="object"){o.hasOwnProperty("path")||(o.path="");const c=kh(o,t);for(const u of c){n.push(u);const h=Array.isArray(o.children)&&o.children.length===0;if(o.children&&!h)lc(o.children,u.pattern,n,r);else{const f=Sh([...n],r.length);r.push(f)}n.pop()}}}return n.length?r:r.sort((l,s)=>s.score-l.score)}function Ci(e,t){for(let n=0,r=e.length;n<r;n++){const i=e[n].matcher(t);if(i)return i}return[]}function Ch(e,t,n){const r=new URL(ec),i=N(h=>{const f=e();try{return new URL(f,r)}catch{return console.error(`Invalid path ${f}`),h}},r,{equals:(h,f)=>h.href===f.href}),l=N(()=>i().pathname),s=N(()=>i().search,!0),o=N(()=>i().hash),c=()=>"",u=se(s,()=>tc(i()));return{get pathname(){return l()},get search(){return s()},get hash(){return o()},get state(){return t()},get key(){return c()},query:n?n(u):nc(u)}}let Rn;function xh(){return Rn}function Ah(e,t,n,r={}){const{signal:[i,l],utils:s={}}=e,o=s.parsePath||(H=>H),c=s.renderPath||(H=>H),u=s.beforeLeave||Qo(),h=Ra("",r.base||"");if(h===void 0)throw new Error(`${h} is not a valid base path`);h&&!i().value&&l({value:h,replace:!0,scroll:!1});const[f,g]=O(!1);let m;const y=(H,J)=>{J.value===v()&&J.state===x()||(m===void 0&&g(!0),Rn=H,m=J,Pu(()=>{m===J&&(_(m.value),S(m.state),Vu(),A[1](G=>G.filter(q=>q.pending)))}).finally(()=>{m===J&&He(()=>{Rn=void 0,H==="navigate"&&R(m),g(!1),m=void 0})}))},[v,_]=O(i().value),[x,S]=O(i().state),k=Ch(v,x,s.queryWrapper),b=[],A=O([]),w=N(()=>typeof r.transformUrl=="function"?Ci(t(),r.transformUrl(k.pathname)):Ci(t(),k.pathname)),$=()=>{const H=w(),J={};for(let G=0;G<H.length;G++)Object.assign(J,H[G].params);return J},C=s.paramsWrapper?s.paramsWrapper($,t):nc($),E={pattern:h,path:()=>h,outlet:()=>null,resolvePath(H){return Ra(h,H)}};return L(se(i,H=>y("native",H),{defer:!0})),{base:E,location:k,params:C,isRouting:f,renderPath:c,parsePath:o,navigatorFactory:P,matches:w,beforeLeave:u,preloadRoute:U,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:A};function I(H,J,G){Ce(()=>{if(typeof J=="number"){J&&(s.go?s.go(J):console.warn("Router integration does not support relative routing"));return}const q=!J||J[0]==="?",{replace:he,resolve:Z,scroll:X,state:Q}={replace:!1,resolve:!q,scroll:!0,...G},pe=Z?H.resolvePath(J):Ra(q&&k.pathname||"",J);if(pe===void 0)throw new Error(`Path '${J}' is not a routable path`);if(b.length>=_h)throw new Error("Too many redirects");const ge=v();(pe!==ge||Q!==x())&&(lh||u.confirm(pe,G)&&(b.push({value:ge,replace:he,scroll:X,state:x()}),y("navigate",{value:pe,state:Q})))})}function P(H){return H=H||Bt(Tl)||E,(J,G)=>I(H,J,G)}function R(H){const J=b[0];J&&(l({...H,replace:J.replace,scroll:J.scroll}),b.length=0)}function U(H,J){const G=Ci(t(),H.pathname),q=Rn;Rn="preload";for(let he in G){const{route:Z,params:X}=G[he];Z.component&&Z.component.preload&&Z.component.preload();const{preload:Q}=Z;J&&Q&&Wo(n(),()=>Q({params:X,location:{pathname:H.pathname,search:H.search,hash:H.hash,query:tc(H),state:null,key:""},intent:"preload"}))}Rn=q}}function Th(e,t,n,r){const{base:i,location:l,params:s}=e,{pattern:o,component:c,preload:u}=r().route,h=N(()=>r().path);c&&c.preload&&c.preload();const f=u?u({params:s,location:l,intent:Rn||"initial"}):void 0;return{parent:t,pattern:o,path:h,outlet:()=>c?a(c,{params:s,location:l,data:f,get children(){return n()}}):n(),resolvePath(m){return Ra(i.path(),m,h())}}}const Ih=e=>t=>{const{base:n}=t,r=ni(()=>t.children),i=N(()=>lc(r(),t.base||""));let l;const s=Ah(e,i,()=>l,{base:n,singleFlight:t.singleFlight,transformUrl:t.transformUrl});return e.create&&e.create(s),a(ac.Provider,{value:s,get children(){return a(Eh,{routerState:s,get root(){return t.root},get preload(){return t.rootPreload||t.rootLoad},get children(){return[N(()=>(l=kr())&&null),a(Lh,{routerState:s,get branches(){return i()}})]}})}})};function Eh(e){const t=e.routerState.location,n=e.routerState.params,r=N(()=>e.preload&&Ce(()=>{e.preload({params:n,location:t,intent:xh()||"initial"})}));return a(T,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:i=>a(i,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function Lh(e){const t=[];let n;const r=N(se(e.routerState.matches,(i,l,s)=>{let o=l&&i.length===l.length;const c=[];for(let u=0,h=i.length;u<h;u++){const f=l&&l[u],g=i[u];s&&f&&g.route.key===f.route.key?c[u]=s[u]:(o=!1,t[u]&&t[u](),Wr(m=>{t[u]=m,c[u]=Th(e.routerState,c[u-1]||e.routerState.base,Es(()=>r()[u+1]),()=>e.routerState.matches()[u])}))}return t.splice(i.length).forEach(u=>u()),s&&o?s:(n=c[0],c)}));return Es(()=>r()&&n)()}const Es=e=>()=>a(T,{get when(){return e()},keyed:!0,children:t=>a(Tl.Provider,{value:t,get children(){return t.outlet()}})}),ce=e=>{const t=ni(()=>e.children);return Fe(e,{get children(){return t()}})};function Ph([e,t],n,r){return[e,r?i=>t(r(i)):t]}function Mh(e){let t=!1;const n=i=>typeof i=="string"?{value:i}:i,r=Ph(O(n(e.get()),{equals:(i,l)=>i.value===l.value&&i.state===l.state}),void 0,i=>(!t&&e.set(i),i));return e.init&&Ye(e.init((i=e.get())=>{t=!0,r[1](n(i)),t=!1})),Ih({signal:r,create:e.create,utils:e.utils})}function Dh(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Rh(e,t){const n=e&&document.getElementById(e);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const Nh=new Map;function Oh(e=!0,t=!1,n="/_server",r){return i=>{const l=i.base.path(),s=i.navigatorFactory(i.base);let o,c;function u(v){return v.namespaceURI==="http://www.w3.org/2000/svg"}function h(v){if(v.defaultPrevented||v.button!==0||v.metaKey||v.altKey||v.ctrlKey||v.shiftKey)return;const _=v.composedPath().find(w=>w instanceof Node&&w.nodeName.toUpperCase()==="A");if(!_||t&&!_.hasAttribute("link"))return;const x=u(_),S=x?_.href.baseVal:_.href;if((x?_.target.baseVal:_.target)||!S&&!_.hasAttribute("state"))return;const b=(_.getAttribute("rel")||"").split(/\s+/);if(_.hasAttribute("download")||b&&b.includes("external"))return;const A=x?new URL(S,document.baseURI):new URL(S);if(!(A.origin!==window.location.origin||l&&A.pathname&&!A.pathname.toLowerCase().startsWith(l.toLowerCase())))return[_,A]}function f(v){const _=h(v);if(!_)return;const[x,S]=_,k=i.parsePath(S.pathname+S.search+S.hash),b=x.getAttribute("state");v.preventDefault(),s(k,{resolve:!1,replace:x.hasAttribute("replace"),scroll:!x.hasAttribute("noscroll"),state:b?JSON.parse(b):void 0})}function g(v){const _=h(v);if(!_)return;const[x,S]=_;r&&(S.pathname=r(S.pathname)),i.preloadRoute(S,x.getAttribute("preload")!=="false")}function m(v){clearTimeout(o);const _=h(v);if(!_)return c=null;const[x,S]=_;c!==x&&(r&&(S.pathname=r(S.pathname)),o=setTimeout(()=>{i.preloadRoute(S,x.getAttribute("preload")!=="false"),c=x},20))}function y(v){if(v.defaultPrevented)return;let _=v.submitter&&v.submitter.hasAttribute("formaction")?v.submitter.getAttribute("formaction"):v.target.getAttribute("action");if(!_)return;if(!_.startsWith("https://action/")){const S=new URL(_,ec);if(_=i.parsePath(S.pathname+S.search),!_.startsWith(n))return}if(v.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const x=Nh.get(_);if(x){v.preventDefault();const S=new FormData(v.target,v.submitter);x.call({r:i,f:v.target},v.target.enctype==="multipart/form-data"?S:new URLSearchParams(S))}}_e(["click","submit"]),document.addEventListener("click",f),e&&(document.addEventListener("mousemove",m,{passive:!0}),document.addEventListener("focusin",g,{passive:!0}),document.addEventListener("touchstart",g,{passive:!0})),document.addEventListener("submit",y),Ye(()=>{document.removeEventListener("click",f),e&&(document.removeEventListener("mousemove",m),document.removeEventListener("focusin",g),document.removeEventListener("touchstart",g)),document.removeEventListener("submit",y)})}}function Fh(e){const t=()=>{const r=window.location.pathname.replace(/^\/+/,"/")+window.location.search,i=window.history.state&&window.history.state._depth&&Object.keys(window.history.state).length===1?void 0:window.history.state;return{value:r+window.location.hash,state:i}},n=Qo();return Mh({get:t,set({value:r,replace:i,scroll:l,state:s}){i?window.history.replaceState(dh(s),"",r):window.history.pushState(s,"",r),Rh(decodeURIComponent(window.location.hash.slice(1)),l),Al()},init:r=>Dh(window,"popstate",uh(r,i=>{if(i&&i<0)return!n.confirm(i);{const l=t();return!n.confirm(l.value,{state:l.state})}})),create:Oh(e.preload,e.explicitLinks,e.actionBase,e.transformUrl),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var Uh=p("<a>");function B(e){e=Fe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=ri(e,["href","state","class","activeClass","inactiveClass","end"]),n=yh(()=>e.href),r=wh(n),i=Jt(),l=N(()=>{const s=n();if(s===void 0)return[!1,!1];const o=Fn(s.split(/[?#]/,1)[0]).toLowerCase(),c=decodeURI(Fn(i.pathname).toLowerCase());return[e.end?o===c:c.startsWith(o+"/")||c===o,o===c]});return(()=>{var s=Uh();return Et(s,Fe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!l()[0],[e.activeClass]:l()[0],...t.classList}},link:"",get"aria-current"(){return l()[1]?"page":void 0}}),!1,!1),s})()}function on(e){const t=un(),n=Jt(),{href:r,state:i}=e,l=typeof r=="function"?r({navigate:t,location:n}):r;return t(l,{replace:!0,state:i}),null}const nl=Symbol("store-raw"),or=Symbol("store-node"),cn=Symbol("store-has"),sc=Symbol("store-self");function oc(e){let t=e[zt];if(!t&&(Object.defineProperty(e,zt,{value:t=new Proxy(e,Gh)}),!Array.isArray(e))){const n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e);for(let i=0,l=n.length;i<l;i++){const s=n[i];r[s].get&&Object.defineProperty(e,s,{enumerable:r[s].enumerable,get:r[s].get.bind(t)})}}return t}function wn(e){let t;return e!=null&&typeof e=="object"&&(e[zt]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function br(e,t=new Set){let n,r,i,l;if(n=e!=null&&e[nl])return n;if(!wn(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let s=0,o=e.length;s<o;s++)i=e[s],(r=br(i,t))!==i&&(e[s]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const s=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,u=s.length;c<u;c++)l=s[c],!o[l].get&&(i=e[l],(r=br(i,t))!==i&&(e[l]=r))}return e}function Ya(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function ea(e,t,n){if(e[t])return e[t];const[r,i]=O(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function Bh(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===zt||t===or||(delete n.value,delete n.writable,n.get=()=>e[zt][t]),n}function cc(e){Ji()&&ea(Ya(e,or),sc)()}function Vh(e){return cc(e),Reflect.ownKeys(e)}const Gh={get(e,t,n){if(t===nl)return e;if(t===zt)return n;if(t===Ki)return cc(e),n;const r=Ya(e,or),i=r[t];let l=i?i():e[t];if(t===or||t===cn||t==="__proto__")return l;if(!i){const s=Object.getOwnPropertyDescriptor(e,t);Ji()&&(typeof l!="function"||e.hasOwnProperty(t))&&!(s&&s.get)&&(l=ea(r,t,l)())}return wn(l)?oc(l):l},has(e,t){return t===nl||t===zt||t===Ki||t===or||t===cn||t==="__proto__"?!0:(Ji()&&ea(Ya(e,cn),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:Vh,getOwnPropertyDescriptor:Bh};function Pt(e,t,n,r=!1){if(!r&&e[t]===n)return;const i=e[t],l=e.length;n===void 0?(delete e[t],e[cn]&&e[cn][t]&&i!==void 0&&e[cn][t].$()):(e[t]=n,e[cn]&&e[cn][t]&&i===void 0&&e[cn][t].$());let s=Ya(e,or),o;if((o=ea(s,t,i))&&o.$(()=>n),Array.isArray(e)&&e.length!==l){for(let c=e.length;c<l;c++)(o=s[c])&&o.$();(o=ea(s,"length",l))&&o.$(e.length)}(o=s[sc])&&o.$()}function dc(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const i=n[r];Pt(e,i,t[i])}}function Hh(e,t){if(typeof t=="function"&&(t=t(e)),t=br(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const i=t[n];e[n]!==i&&Pt(e,n,i)}Pt(e,"length",r)}else dc(e,t)}function Yr(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();const s=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let c=0;c<r.length;c++)Yr(e,[r[c]].concat(t),n);return}else if(o&&s==="function"){for(let c=0;c<e.length;c++)r(e[c],c)&&Yr(e,[c].concat(t),n);return}else if(o&&s==="object"){const{from:c=0,to:u=e.length-1,by:h=1}=r;for(let f=c;f<=u;f+=h)Yr(e,[f].concat(t),n);return}else if(t.length>1){Yr(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let l=t[0];typeof l=="function"&&(l=l(i,n),l===i)||r===void 0&&l==null||(l=br(l),r===void 0||wn(i)&&wn(l)&&!Array.isArray(l)?dc(i,l):Pt(e,r,l))}function je(...[e,t]){const n=br(e||{}),r=Array.isArray(n),i=oc(n);function l(...s){He(()=>{r&&s.length===1?Hh(n,s[0]):Yr(n,s)})}return[i,l]}const rl=Symbol("store-root");function nr(e,t,n,r,i){const l=t[n];if(e===l)return;const s=Array.isArray(e);if(n!==rl&&(!wn(e)||!wn(l)||s!==Array.isArray(l)||i&&e[i]!==l[i])){Pt(t,n,e);return}if(s){if(e.length&&l.length&&(!r||i&&e[0]&&e[0][i]!=null)){let u,h,f,g,m,y,v,_;for(f=0,g=Math.min(l.length,e.length);f<g&&(l[f]===e[f]||i&&l[f]&&e[f]&&l[f][i]===e[f][i]);f++)nr(e[f],l,f,r,i);const x=new Array(e.length),S=new Map;for(g=l.length-1,m=e.length-1;g>=f&&m>=f&&(l[g]===e[m]||i&&l[g]&&e[m]&&l[g][i]===e[m][i]);g--,m--)x[m]=l[g];if(f>m||f>g){for(h=f;h<=m;h++)Pt(l,h,e[h]);for(;h<e.length;h++)Pt(l,h,x[h]),nr(e[h],l,h,r,i);l.length>e.length&&Pt(l,"length",e.length);return}for(v=new Array(m+1),h=m;h>=f;h--)y=e[h],_=i&&y?y[i]:y,u=S.get(_),v[h]=u===void 0?-1:u,S.set(_,h);for(u=f;u<=g;u++)y=l[u],_=i&&y?y[i]:y,h=S.get(_),h!==void 0&&h!==-1&&(x[h]=l[u],h=v[h],S.set(_,h));for(h=f;h<e.length;h++)h in x?(Pt(l,h,x[h]),nr(e[h],l,h,r,i)):Pt(l,h,e[h])}else for(let u=0,h=e.length;u<h;u++)nr(e[u],l,u,r,i);l.length>e.length&&Pt(l,"length",e.length);return}const o=Object.keys(e);for(let u=0,h=o.length;u<h;u++)nr(e[o[u]],l,o[u],r,i);const c=Object.keys(l);for(let u=0,h=c.length;u<h;u++)e[c[u]]===void 0&&Pt(l,c[u],void 0)}function Wt(e,t={}){const{merge:n,key:r="id"}=t,i=br(e);return l=>{if(!wn(l)||!wn(i))return i;const s=nr(i,{[rl]:l},rl,n,r);return s===void 0?l:s}}const uc=Kt(),Il=()=>Bt(uc),hc=Kt(),Ze=()=>Bt(hc),gc=Kt(),El=()=>Bt(gc),fc=Kt(),ie=()=>Bt(fc),mc=Kt(),Xt=()=>Bt(mc),pc=Kt(),Ll=()=>Bt(pc),vc=Kt(),Pl=()=>Bt(vc),$c=Kt(),_c=()=>Bt($c),Ml=Kt(),hn=()=>Bt(Ml);var Yh=p("<div class=cp-install-pwa-container>Install as Progressive Web App to get more screen space.<button>Install</button><button>Not now");function jh(){const{isTouch:e,isPWA:t}=Xt(),[n,r]=O(!1),[i,l]=O(!1);let s;return window.addEventListener("beforeinstallprompt",o=>{s=o,r(!0)}),a(T,{get when(){return N(()=>!!(n()&&e()))()&&!t()},get children(){var o=Yh(),c=o.firstChild,u=c.nextSibling,h=u.nextSibling;return d(o,a(T,{get when(){return i()},children:" Failed to install"}),u),u.$$click=async()=>{if(s!==null){s.prompt();const{outcome:f}=await s.userChoice;if(f==="accepted")return s=null,r(!1)}l(!0)},h.$$click=()=>r(!1),o}})}_e(["click"]);const Cr=location.hostname==="localhost",Yt={mal:{anime:{end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"episodes",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"}},manga:{episodes:{api:"chapters",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"end_date",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"favorites",flavorText:"Favorites"},id:{api:"mal_id",flavorText:"ID"},popularity:{api:"popularity",flavorText:"Popularity",reverse:!0},rank:{api:"rank",flavorText:"Rank"},scored_by:{api:"scored_by",flavorText:"Ratings"},score:{api:"score",flavorText:"Score"},start_date:{api:"start_date",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"title",flavorText:"Title"},volumes:{api:"volumes",flavorText:"Volumes",alternative_key:"volumes_filtered"}}},ani:{anime:{duration:{api:"DURATION",flavorText:"Duration",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}},manga:{episodes:{api:"CHAPTERS",flavorText:"Chapters",alternative_key:"episodes_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"},volumes:{api:"DURATION",flavorText:"Volumes",alternative_key:"volumes_filtered"}},media:{duration:{api:"DURATION",flavorText:"Duration / Volumes",alternative_key:"duration_filtered"},end_date:{api:"END_DATE",flavorText:"End date",alternative_key:"end_date_filtered"},episodes:{api:"CHAPTERS",flavorText:"Episodes / Chapters",alternative_key:"episodes_filtered"},favorites:{api:"FAVOURITES",flavorText:"Favorites"},id:{api:"ID",flavorText:"ID"},popularity:{api:"POPULARITY",flavorText:"Popularity"},score:{api:"SCORE",flavorText:"Score"},start_date:{api:"START_DATE",flavorText:"Start date",alternative_key:"start_date_filtered"},title:{api:"TITLE_NATIVE",flavorText:"Title (Native)"},title_english:{api:"TITLE_ENGLISH",flavorText:"Title (English)"},title_romaji:{api:"TITLE_ROMAJI",flavorText:"Title (Romaji)"},trending:{api:"TRENDING",flavorText:"Trending"},updated_at:{api:"UPDATED_AT",flavorText:"Updated"}}}};Yt.flavorTexts=ai(Yt);const Un={mal:{anime:{cm:{api:"cm",flavorText:"CM"},movie:{api:"movie",flavorText:"Movie"},music:{api:"music",flavorText:"Music"},ona:{api:"ona",flavorText:"ONA"},ova:{api:"ova",flavorText:"OVA"},pv:{api:"pv",flavorText:"PV"},special:{api:"special",flavorText:"Special"},tv:{api:"tv",flavorText:"TV"},tv_special:{api:"tv_special",flavorText:"TV special"}},manga:{doujin:{api:"doujin",flavorText:"Doujin"},lightnovel:{api:"lightnovel",flavorText:"Light novel"},manga:{api:"manga",flavorText:"Manga"},manhua:{api:"manhua",flavorText:"Manhua"},manhwa:{api:"manhwa",flavorText:"Manhwa"},novel:{api:"novel",flavorText:"Novel"},one_shot:{api:"oneshot",flavorText:"One-shot"}}},ani:{anime:{movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},ona:{api:"ONA",flavorText:"ONA"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}},manga:{manga:{api:"MANGA",flavorText:"Manga"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"}},media:{manga:{api:"MANGA",flavorText:"Manga"},movie:{api:"MOVIE",flavorText:"Movie"},music:{api:"MUSIC",flavorText:"Music"},lightnovel:{api:"NOVEL",flavorText:"Light novel"},ona:{api:"ONA",flavorText:"ONA"},one_shot:{api:"ONE_SHOT",flavorText:"One-shot"},ova:{api:"OVA",flavorText:"OVA"},special:{api:"SPECIAL",flavorText:"Special"},tv:{api:"TV",flavorText:"TV"},tv_short:{api:"TV_SHORT",flavorText:"TV short"}}}};Un.flavorTexts=ai(Un);const ta={ani:{anime:{winter:{api:"WINTER",flavorText:"Winter"},spring:{api:"SPRING",flavorText:"Spring"},summer:{api:"SUMMER",flavorText:"Summer"},fall:{api:"FALL",flavorText:"Fall"},tba:{api:null,flavorText:"TBA"}}},mal:{anime:{winter:{api:"winter",flavorText:"Winter"},spring:{api:"spring",flavorText:"Spring"},summer:{api:"summer",flavorText:"Summer"},fall:{api:"fall",flavorText:"Fall"}}}};ta.flavorTexts=ai(ta);const yn={mal:{anime:{releasing:{api:"airing",flavorText:"Airing"},complete:{api:"complete",flavorText:"Complete"},upcoming:{api:"upcoming",flavorText:"Upcoming"}},manga:{cancelled:{api:"discontinued",flavorText:"Cancelled"},complete:{api:"complete",flavorText:"Complete"},hiatus:{api:"hiatus",flavorText:"Hiatus"},publishing:{api:"publishing",flavorText:"Publishing"}}},ani:{anime:{releasing:{api:"RELEASING",flavorText:"Airing"},cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"}},manga:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}},media:{cancelled:{api:"CANCELLED",flavorText:"Cancelled"},complete:{api:"FINISHED",flavorText:"Complete"},hiatus:{api:"HIATUS",flavorText:"Hiatus"},upcoming:{api:"NOT_YET_RELEASED",flavorText:"Upcoming"},releasing:{api:"RELEASING",flavorText:"Releasing"}}}};yn.flavorTexts=ai(yn);const bc={CN:{flavorText:"China"},JP:{flavorText:"Japan"},KR:{flavorText:"South Korea"},TW:{flavorText:"Taiwan"}},Dl={anime:{api:"ANIME",flavorText:"Anime"},comic:{api:"COMIC",flavorText:"Comic"},doujinshi:{api:"DOUJINSHI",flavorText:"Doujinshi"},game:{api:"GAME",flavorText:"Game"},light_novel:{api:"LIGHT_NOVEL",flavorText:"Light Novel"},live_action:{api:"LIVE_ACTION",flavorText:"Live Action"},manga:{api:"MANGA",flavorText:"Manga"},multimedia_project:{api:"MULTIMEDIA_PROJECT",flavorText:"Multimedia Project"},novel:{api:"NOVEL",flavorText:"Novel"},original:{api:"ORIGINAL",flavorText:"Original"},other:{api:"OTHER",flavorText:"Other"},picture_book:{api:"PICTURE_BOOK",flavorText:"Picture Book"},video_game:{api:"VIDEO_GAME",flavorText:"Video Game"},visual_novel:{api:"VISUAL_NOVEL",flavorText:"Visual Novel"},web_novel:{api:"WEB_NOVEL",flavorText:"Web Novel"}};function ai(e){return Object.values(e).reduce((t,n)=>Object.values(n).reduce((r,i)=>Object.entries(i).reduce((l,[s,o])=>(l[s]=o.flavorText,l),r),t),{})}const jn="anilist",xr="jikan",zh="animethemes",al="ani",ja="mal",ii="only-if-cached",Wh="default",qh="fetch-once",Kh="reload",yc="no-store",da="anime",wc="manga",Jh="ANIME",kc="Japanese",Sc="Not yet aired",Xh="Finished Airing",Zh="Currently Airing",Qh="Publishing",Ls="Finished",eg="Discontinued",tg="On Hiatus",F=(e,t="Not true")=>{if(!e)throw new Error(t)},Rl=(e,t="Not false")=>F(!e,t),ng=(e="Assert unreachable")=>F(!1,e),xt=(e,t="Value",n="")=>F(typeof e=="string",t+" is not type of string. "+n),dn=(e,t="Value",n="")=>F(typeof e=="function",t+" is not type of function. "+n),Cc=(e,t="Value",n="")=>F(Number.isInteger(e),t+" is not type of integer. "+n),li=(e,t="Value",n="")=>{const r=t+" is not integer. "+n;F(typeof e=="string"||Number.isInteger(e),r),F(e&&Number.isInteger(+e),r)},Ar=(e,t,n={},r)=>{F(t.length>10,"Query must be above of length 10");const i={"Content-Type":"application/json"};return e&&(i.Authorization="Bearer "+e),new Yl("https://graphql.anilist.co",{method:"POST",headers:i,body:{query:t,variables:n}},r)},Nl=(e,t,n={},r)=>{const i=Ar(e,t,n,r);return ci(i,yc)},kn=(e,t)=>new Yl(e,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},t),Ol=e=>e.data.Page,xc=(e,t,n=1)=>Nl(e,jc,{...t,page:n},Ol),rg=(e,t)=>{const n=xc(e,t,"pageless");return ci(n,ii)},ag=({token:e,id:t,isMalId:n,type:r})=>n?Ac(e,r,t):Ar(e,Fl,{id:t},i=>i.data.Media),Zt=(e,t)=>{var r,i;F(t.id_in||t.idMal_in,"Missing list for ids");const n=((r=t.id_in)==null?void 0:r.length)||((i=t.idMal_in)==null?void 0:i.length);if(n)return Ar(e,Mg(n),t,l=>Object.values(l.data).map(s=>s.media).flat())},ig=(e,t,n=1)=>Ar(e,gg,{id:t,page:n},r=>r.data.Media.recommendations),Ac=(e,t,n)=>Ar(e,Fl,{idMal:n,type:t.toUpperCase()},r=>r.data.Media),lg=({token:e,id:t,...n})=>{if(t)return Ar(e,Hc,{id:t,...n},Ol)},sg=e=>{switch(e){case"airing":return["AIRING"];case"activity":return["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"];case"forum":return["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"];case"follows":return["FOLLOWING"];case"media":return["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"];case"all":return;default:ng("Unknown notification type")}},Tc=(e,t,n=1)=>{const r=sg(t);return Nl(e,Pn,{page:n,types:r},Ol)},og=(e,t)=>{const n=Tc(e,t,"pageless");return ci(n,ii)},Ic=(e,t,n=1)=>Nl(e,Yc,{id:t,page:n},r=>r.data.Media),cg=(e,t)=>{const n=Ic(e,t,"pageless");return ci(n,ii)},Ec=(e,t)=>{switch(xt(e,"type"),li(t,"id"),e){case da:return kn(Dc(t),n=>n.data);case wc:return kn(Rc(t),n=>n.data)}},Lc=(e,t)=>{switch(xt(e,"type"),li(t,"id"),e){case da:return kn(Nc(t),n=>n.data);case wc:return kn(Oc(t),n=>n.data)}},Pc=(e,t)=>{if(xt(e,"type"),li(t,"id"),e===da)return kn(Fc(t),n=>n.data)},dg=e=>(li(e,"id"),kn(vg(e),t=>t.data)),Fl=be`query media($id: Int, $idMal: Int, $type: MediaType, $isAdult: Boolean) {
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
}`,ug=be`query ($page: Int, $id: Int, $type: LikeableType) {
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
}`,hg=be`query (
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
}`,gg=be`query media($id: Int, $page: Int) {
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
}`,fg=be`mutation (
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
}`,Mc=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,mg=e=>`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=MyAnimeList&filter[external_id]=${e}&include=animethemes.animethemeentries.videos.audio,animethemes.song.artists`,pg=e=>`https://api.animethemes.moe/artist/${e}?include=songs.animethemes.anime,songs.animethemes.animethemeentries.videos.audio,songs.animethemes.song.artists,resources,images`,Dc=e=>`https://api.jikan.moe/v4/anime/${e}/full`,Rc=e=>`https://api.jikan.moe/v4/manga/${e}/full`,Nc=e=>`https://api.jikan.moe/v4/anime/${e}/characters`,Oc=e=>`https://api.jikan.moe/v4/manga/${e}/characters`,vg=e=>`https://api.jikan.moe/v4/characters/${e}/full`,Fc=e=>`https://api.jikan.moe/v4/anime/${e}/staff`,$g=(e,t)=>`https://api.jikan.moe/v4/${e}?${t}`,_g=(e,t)=>`https://api.jikan.moe/v4/seasons/${e}?${t}`,bg=e=>`https://api.jikan.moe/v4/genres/${e}`,yg=be`query ($id: Int, $page: Int) {
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
}`,wg=be`query ($id: Int) {
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
}`,Pn=be`query ($page: Int, $types: [NotificationType]) {
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
}`,Uc=e=>be`query ($name: String) {
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
}`,kg=Uc("anime"),Sg=Uc("manga"),Bc=e=>be`query ($name: String) {
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
}`,Cg=Bc("manga"),xg=Bc("anime"),Vc=e=>be`query ($name: String) {
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
}`,Ag=Vc("manga"),Tg=Vc("anime"),Ig=be`query ($name: String) {
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
}`,Eg=be`query ($name: String) {
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
}`,Gc=e=>be`query ($name: String) {
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
}`,Lg=Gc("manga"),Pg=Gc("anime"),Mg=e=>be`query ($type: MediaType, $id_in: [Int], $idMal_in: [Int]) {
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
}`,Dg=e=>be`query ($ids: [Int]) {
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
}`,Rg=be`mutation ($id: Int) {
  ToggleFollow(userId: $id) {
    id
    name
    isFollowing
  }
}`,Ng=be`query ($id: Int!, $page: Int) {
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
}`,Og=be`query ($id: Int!, $page: Int) {
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
}`,Hc=be`query ($id: Int, $page: Int, $perPage: Int) {
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
}`,Fg=be`mutation (
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
}`,Ug=be`query (
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
}`,Ps=be`query ($userId: Int, $userName: String, $type: MediaType) {
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
}`,Yc=be`query media($id: Int, $page: Int) {
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
}`,Bg=be`query media($id: Int, $page: Int) {
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
}`,Vg=be`mutation ($id: Int) {
  DeleteMediaListEntry(id: $id) {
    deleted
  }
}`,Gg=be`mutation (
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
}`,Hg=be`mutation ($id: Int, $type: LikeableType) {
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
}`,jc=be`query (
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
}`,Ms=be`query ($userId: Int, $type: MediaType, $perPage: Int) {
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
}`,Yg=be`mutation (
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
}`,xi=be`query staff(
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
}`,jg=be`query ($id: Int, $page: Int, $sort: [MediaSort], $onList: Boolean) {
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
}`,Ds=be`query character(
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
}`,zg=be`query {
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
}`,Wg=be`query {
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
}`,qg=be`query (
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
}`,Rs=be`query (
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
}`,Kg=be`query{genres:GenreCollection tags:MediaTagCollection{name description category isAdult}}`,Jg=be`query($type:ExternalLinkMediaType){ExternalLinkSourceCollection(mediaType:$type,type:STREAMING){id url site type language color icon}}`,Xg=be`query ($mediaId: Int) {
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
}`,Zg=be`query ($id: Int, $name: String) {
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
}`,Qg=be`query ($id: Int, $type: ActivityType, $page: Int) {
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
}`,ef=be`query {
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
}`;function be(e,...t){const n=[];for(let i=0;i<e.length;i++)n.push(e[i],t[i]||"");const r=/\s*([{}():,\[\]])\s*/g;return n.join("").replace(/\n|\r/g," ").replace(r,"$1").replace(/\s{2,}/g," ")}const il=["WINTER","SPRING","SUMMER","FALL"],Na=(e=7)=>{const t=new Date;t.setDate(t.getDate()+e);const n=t.getFullYear(),r=tf(t.getMonth());return F(Number.isInteger(e),"Offsetdays is not an integer"),{season:r,seasonYear:n,nextSeason:ir(r,n,1).season,nextYear:ir(r,n,1).year}};function ir(e,t,n=0){F(typeof t=="number","year is not a number"),F(typeof e=="string","season is not a string");const r=n%4,i=Math.trunc(n/4),l=il.indexOf(e.toUpperCase());return(l+r<0||l+r>3)&&(t+=r/Math.abs(r)),{year:t+i,season:il[(4+l+r)%4]}}function tf(e){return il[Math.floor(e/3)]}var dr,ur,ia,St,hr,la,gr,fr,mr,pr,Ut,ll,zc,sl,Wc;const gs=class gs{constructor({start:t,limit:n,interval:r=60,fillAmount:i=1,pool:l,defaultDelay:s=30}){lt(this,Ut);lt(this,dr,[]);lt(this,ur,null);lt(this,ia,null);lt(this,St);lt(this,hr);lt(this,la);lt(this,gr);lt(this,fr);lt(this,mr);lt(this,pr,Promise.resolve());st(this,St,t),st(this,hr,n),st(this,la,r),st(this,gr,i),st(this,mr,s),st(this,fr,l),It(this,Ut,ll).call(this)}requestToken(){return Ie(this,St)>0?(_i(this,St)._--,!0):!1}enqueue(t){return st(this,pr,Ie(this,pr).then(t).catch(n=>{console.error("Request error:",n)})),Ie(this,pr)}getDefaultDelay(){return Ie(this,mr)}getsNextToken(){const{promise:t,resolve:n}=Promise.withResolvers();return this.addToBucket(n),t}addToBucket(t){Ie(this,dr).push(t)}delayBucket(t){It(this,Ut,zc).call(this,t||Ie(this,mr))}};dr=new WeakMap,ur=new WeakMap,ia=new WeakMap,St=new WeakMap,hr=new WeakMap,la=new WeakMap,gr=new WeakMap,fr=new WeakMap,mr=new WeakMap,pr=new WeakMap,Ut=new WeakSet,ll=function(){clearInterval(Ie(this,ur)),st(this,ur,setInterval(()=>It(this,Ut,sl).call(this),Ie(this,la)*1e3))},zc=function(t){st(this,St,0),clearInterval(Ie(this,ur)),clearTimeout(Ie(this,ia)),st(this,ia,setTimeout(()=>{It(this,Ut,ll).call(this),It(this,Ut,sl).call(this)},t*1e3))},sl=function(){var n;Ie(this,fr)instanceof gs?st(this,St,Math.min(Ie(this,St)+Math.min(Ie(this,gr),It(n=Ie(this,fr),Ut,Wc).call(n)),Ie(this,hr))):st(this,St,Math.min(Ie(this,St)+Ie(this,gr),Ie(this,hr)));const t=Ie(this,dr).slice();Ie(this,dr).length=0,t.forEach(r=>r())},Wc=function(){return Ie(this,St)>0?_i(this,St)._--:Ie(this,St)};let bn=gs;const Ai=Cr,Se=si({storeName:"results",type:"reload",expiresInSeconds:60*60*24*365}),nf=si({storeName:"results",type:"reload",expiresInSeconds:60*60*7}),ut=si({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365}),Ns=si({storeName:"results",type:"only-if-cached",expiresInSeconds:60*60*24*365}),Ti={animeThemes:new bn({start:90,limit:90,interval:60,defaultDelay:20}),anilist:new bn({start:5,limit:5,interval:2,defaultDelay:20,pool:new bn({start:60,limit:90,interval:60,fillAmount:60})}),jikan:new bn({start:1,limit:1,interval:1/3,defaultDelay:1,pool:new bn({start:3,limit:3,interval:1.25,pool:new bn({start:60,limit:60,interval:60,fillAmount:60})})})};function Os(e,t,n){let r=null;const i=t.reduce((l,s)=>(s.active&&(s.key==="season"?r=s.value:l.push(`${s.key}=${s.value}`)),l),[]);return n>1&&i.push(`page=${n}`),r?re.getJson(_g(r,i.sort().join("&")),l=>(l.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),l)):re.getJson($g(e,i.sort().join("&")),l=>(l.data.forEach(s=>{s.titles=s.titles.reduce((o,c)=>(o[c.type]=c.title,o),{})}),l))}const ae={animeThemes:{themesByAniListId:ut(e=>re.getJson(Mc(e))),artisBySlug:ut(e=>re.getJson(pg(e)))},myAnimeList:{animeById:ut(e=>re.getJson(Dc(e),t=>t.data)),mangaById:ut(e=>re.getJson(Rc(e),t=>t.data)),animeCharactersById:ut(e=>re.getJson(Nc(e),t=>t.data)),mangaCharactersById:ut(e=>re.getJson(Oc(e),t=>t.data)),animeStaffById:ut(e=>re.getJson(Fc(e))),mediaSearch:ut(Os),mediaSearchCache:Ns(Os),genresAndThemes:ut(e=>re.getJson(bg(e),t=>{const n=new Set,r=["genres","genres","themes"],i={genres:[],themes:[]};let l=0;return t.data.reduce((s,o)=>n.has(o.mal_id)?s:(o.name<s&&(l=Math.min(l+1,r.length-1)),i[r[l]].push(o),n.add(o.mal_id),o.name),""),i.genres.sort(),{translations:{[e]:Object.fromEntries(t.data.map(s=>[s.name,s.mal_id]))},...i}}))},anilist:{mediaId:Se((e,t)=>re.authAnilist(t,Fl,{id:e,perPage:6})),rateRecommendation:async(e,t,n,r,i)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!=null,"Id missing"),F(n!=null,"Rating missing"),F(r!=null,"MediaId missing"),F(i!=null,"MediaRecommendationId missing"),await re.authAnilist(e,fg,{id:t,rating:n,mediaId:r,mediaRecommendationId:i},s=>s.data.SaveRecommendation).send()),userByName:Se((e,t)=>(F(e,"Name is missing"),re.authAnilist(t,Zg,{name:e},n=>n.data.User))),toggleFollow:async(e,t)=>(F(t,"id is missing"),await re.authAnilist(e,Rg,{id:t},r=>r.data.ToggleFollow).send()),userFollowing:Se((e,t=1,n)=>(F(e,"id is missing"),re.authAnilist(n,Og,{id:e,page:t},r=>r.data.Page))),userAnimeStats:Se((e,t)=>re.authAnilist(t,kg,{name:e},n=>n.data.User.statistics.anime)),userMangaStats:Se((e,t)=>re.authAnilist(t,Sg,{name:e},n=>n.data.User.statistics.manga)),userAnimeGenres:Se((e,t)=>re.authAnilist(t,xg,{name:e},n=>n.data.User.statistics.anime.genres)),userMangaGenres:Se((e,t)=>re.authAnilist(t,Cg,{name:e},n=>n.data.User.statistics.manga.genres)),userAnimeTags:Se((e,t)=>re.authAnilist(t,Tg,{name:e},n=>n.data.User.statistics.anime.tags)),userMangaTags:Se((e,t)=>re.authAnilist(t,Ag,{name:e},n=>n.data.User.statistics.manga.tags)),userAnimeStudios:Se((e,t)=>re.authAnilist(t,Ig,{name:e},n=>n.data.User.statistics.anime.studios)),userAnimeVoiceActors:Se((e,t)=>re.authAnilist(t,Eg,{name:e},n=>n.data.User.statistics.anime.voiceActors)),userAnimeStaff:Se((e,t)=>re.authAnilist(t,Pg,{name:e},n=>n.data.User.statistics.anime.staff)),userMangaStaff:Se((e,t)=>re.authAnilist(t,Lg,{name:e},n=>n.data.User.statistics.manga.staff)),characterIds:ut((e,t)=>re.authAnilist(t,Dg(e),{ids:e},n=>Object.values(n.data).map(r=>r.characters).flat())),userFollowers:Se((e,t=1,n)=>(F(e,"id is missing"),re.authAnilist(n,Ng,{id:e,page:t},r=>r.data.Page))),activityByUserId:Se((e,t)=>(F(e,"Id is missing"),re.authAnilist(t,Qg,{id:e}))),activityById:Se((e,t)=>(F(e,"Id is missing"),re.authAnilist(t,wg,{id:e},n=>n.data.Activity))),listOfActivityLikes:ut((e,t)=>(F(e,"Id is missing"),re.authAnilist(t,ug,{id:e,type:"ACTIVITY"},n=>n.data.Page))),activityRepliesById:Se((e,t,n)=>(F(e,"Id is missing"),re.authAnilist(n,yg,{id:e,page:t},r=>r.data.Page))),notifications:nf((e,t,n=1)=>{switch(t){case"airing":return re.authAnilist(e,Pn,{page:n,types:["AIRING"]},r=>r.data.Page);case"activity":return re.authAnilist(e,Pn,{page:n,types:["ACTIVITY_MESSAGE","ACTIVITY_MENTION","ACTIVITY_REPLY","ACTIVITY_LIKE","ACTIVITY_REPLY_LIKE"]},r=>r.data.Page);case"forum":return re.authAnilist(e,Pn,{page:n,types:["THREAD_COMMENT_REPLY","THREAD_SUBSCRIBED","THREAD_COMMENT_MENTION","THREAD_LIKE","THREAD_COMMENT_LIKE"]},r=>r.data.Page);case"follows":return re.authAnilist(e,Pn,{page:n,types:["FOLLOWING"]},r=>r.data.Page);case"media":return re.authAnilist(e,Pn,{page:n,types:["RELATED_MEDIA_ADDITION","MEDIA_DATA_CHANGE","MEDIA_MERGE","MEDIA_DELETION"]},r=>r.data.Page);case"all":default:return re.authAnilist(e,Pn,{page:n},r=>r.data.Page)}}),searchUsers:ut((e,t,n)=>(F(e,"Search is missing"),re.authAnilist(n,hg,{search:e,page:t},r=>r.data.Page))),mediaListByUserName:Se((e,t,n)=>(F(e,"Name is missing"),re.authAnilist(n,Ps,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),mediaListByUserNameFetchOnce:ut((e,t,n)=>(F(e,"Name is missing"),re.authAnilist(n,Ps,{userName:e.toLowerCase(),type:t},r=>r.data.MediaListCollection))),favouritesByUserId:Se((e,t,n)=>(F(e,"Id is missing"),F(t,"Page is missing"),re.authAnilist(n,Ug,{id:e,page:t},r=>r.data.User.favourites))),mutateFavourites:async(e,t)=>await re.authAnilist(e,Fg,t).send(),characterInfoById:Se((e,t)=>re.authAnilist(t,Ds,{id:e},n=>n.data.Character)),characterMediaById:Se((e,t,n={})=>re.authAnilist(e,Ds,{...n,page:n.page||1,sort:n.sort||"POPULARITY_DESC",onList:n.onList,withRoles:n.withRoles||!0,id:t},r=>r.data.Character.media)),staffInfoById:Se((e,t)=>re.authAnilist(t,xi,{id:e},n=>n.data.Staff)),studioInfoAndMediaById:Se((e,t={},n)=>re.authAnilist(n,jg,{...t,page:t.page||1,sort:t.sort||"START_DATE_DESC",onList:t.onList,id:e},r=>r.data.Studio)),staffCharactersById:Se((e,t,n={})=>re.authAnilist(e,xi,{...n,characterPage:n.characterPage||1,sort:n.sort||"START_DATE_DESC",onList:n.onList,withCharacterRoles:!0,id:t},r=>r.data.Staff.characterMedia)),staffMediaById:Se((e,t,n,r)=>re.authAnilist(e,xi,{...r,staffPage:r.staffPage||1,sort:r.sort||"START_DATE_DESC",onList:r.onList,withStaffRoles:!0,id:t,type:n},i=>i.data.Staff.staffMedia)),genresAndTags:ut(()=>re.anilist(Kg,{},e=>e.data)),externalSources:ut(e=>re.anilist(Jg,{type:e||void 0},t=>t.data.ExternalLinkSourceCollection)),characters:Se((e,t=1,n)=>re.authAnilist(n,Yc,{id:e,page:t},r=>r.data.Media)),allMediaStaff:Se((e,t=1,n)=>re.authAnilist(n,Bg,{id:e,page:t},r=>r.data.Media)),trendingMedia:Se(e=>{const t=Na();return re.authAnilist(e,zg,{season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingAnime:Se(e=>{const t=Na();return re.authAnilist(e,qg,{type:"ANIME",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),trendingManga:Se(e=>{const t=Na();return re.authAnilist(e,Wg,{type:"MANGA",season:t.season,seasonYear:t.seasonYear,nextSeason:t.nextSeason,nextYear:t.nextYear})}),mediaListEntry:async(e,t)=>(F(t,"MediaId missing"),F(typeof e!="function","This specific api doesnt support signals"),await re.authAnilist(e,Xg,{mediaId:t}).send()),getAuthUserData:Se(e=>re.authAnilist(e,ef,{},t=>t.data.Viewer)),getActivity:Se((e,t,n=1)=>re.authAnilist(e,jc,{...t,page:n},r=>r.data.Page)),searchMedia:ut((e,t,n,r={})=>{const i=t.reduce((l,s)=>(s.active&&(l[s.key]=s.value),l),{page:n});return Object.entries(r).forEach(([l,s])=>{l==="format"||l==="season"||l==="seasonYear"?i[l]=s:l==="episodeGreater"?i[l]=Math.max(s,i[l]||0):(i[l]&&(i[l]=[s,i[l]].flat()),i[l]??(i[l]=s))}),re.authAnilist(e,Rs,i,l=>l.data.Page)}),searchMediaCache:Ns((e,t,n)=>{const r=t.reduce((i,l)=>(l.active&&(i[l.key]=l.value),i),{page:n});return re.authAnilist(e,Rs,r,i=>i.data.Page)}),friendsMediaScore:Se((e,t,n)=>re.authAnilist(e,Hc,{id:t,...n})),mutateMedia:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t,"Variables missing"),F(t.id||t.mediaId,"No mutation id given"),await re.authAnilist(e,Yg,t,r=>r.data.SaveMediaListEntry).send()),deleteMediaListEntry:async(e,t)=>(F(e,"Token is missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t!==void 0,"Variables missing"),await re.authAnilist(e,Vg,{id:t}).send()),toggleActivityLike:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),F(t.id||t.mediaId,"No mutation id given"),await re.authAnilist(e,Hg,{...t,type:"ACTIVITY"}).send()),toggleFavourite:async(e,t)=>(F(e,"Token is missing"),F(t,"Variables missing"),F(typeof e!="function","This specific api doesnt support signals"),await re.authAnilist(e,Gg,t).send()),wachingAnime:Se((e,t)=>re.authAnilist(t,Ms,{userId:e,type:"ANIME",perPage:40})),readingManga:Se((e,t)=>re.authAnilist(t,Ms,{userId:e,type:"MANGA",perPage:40}))}};var On,vr,$r,Cn,qc,Kc,Jc;const Xr=class Xr{constructor(t,{method:n="POST",headers:r,body:i},l){lt(this,Cn);De(this,"expires");lt(this,On);lt(this,vr);lt(this,$r);F(t,"Url missing"),F(n,"Method missing"),n==="POST"&&F(i,"Body is missing");const s={"Content-Type":"application/json"};this.url=t,this.method=n,this.headers=r||s,this.body=i,this.fromCache=!0,st(this,On,l),this.cacheKey=It(this,Cn,qc).call(this)}abort(){var t;(t=Ie(this,vr))==null||t.abort()}async send(){var i;const t=It(this,Cn,Kc).call(this);st(this,vr,new AbortController),st(this,$r,Ie(this,vr).signal);const n=await t.enqueue(async()=>{for(;;){if(Ie(this,$r).aborted)return null;if(document.hidden){const{promise:o,resolve:c}=Promise.withResolvers();document.addEventListener("visibilitychange",c,{once:!0}),await o}if(!t.requestToken()){await Promise.race([t.getsNextToken(),new Promise(o=>Ie(this,$r).addEventListener("abort",o))]);continue}const s=await It(this,Cn,Jc).call(this);if(s.status===429){console.warn("429 received, backing off...",this.url);const o=parseInt(s.headers.get("Retry-After"))||t.getDefaultDelay();await new Promise(c=>setTimeout(c,o*1e3));continue}if(s.status===500&&this.url.includes("anilist")){console.warn("500 received, the request was probably fine, but anilist has lot of traffic. Resend after 2 seconds"),await new Promise(o=>setTimeout(o,2e3));continue}return s}});if(n==null)return null;if(this.status=n.status,!n.ok)return this.error=!0,this;const r=await n.json();return this.data=((i=Ie(this,On))==null?void 0:i.call(this,r))||r,this.fromCache=!1,this}static anilist(t,n={},r){return Xr.authAnilist(null,t,n,r)}static authAnilist(t,n,r={},i){F(n.length>10,"Query must be above of length 10");const l={"Content-Type":"application/json"};return t&&(l.Authorization="Bearer "+t),new Xr("https://graphql.anilist.co",{method:"POST",headers:l,body:{query:n,variables:r}},i)}static getJson(t,n){return new Xr(t,{method:"GET",cache:"default",headers:{"Content-Type":"application/json"}},n)}};On=new WeakMap,vr=new WeakMap,$r=new WeakMap,Cn=new WeakSet,qc=function(){let t=`${this.url}-${this.method}`;if(this.body){const n=JSON.stringify(this.body).replaceAll('"',"");t+=n}if(this.headers){const n=JSON.stringify(this.headers).replaceAll('"',"");t+=n}if(Ie(this,On)){const n=Ie(this,On).toString().replace(/[\n\t\r ]+/g,"");t+=n}return t},Kc=function(){if(this.url.startsWith("https://graphql.anilist.co"))return Ti.anilist;if(this.url.startsWith("https://api.jikan.moe"))return Ti.jikan;if(this.url.startsWith("https://api.animethemes.moe"))return Ti.animeThemes;F(!1,`Fetch to url "${this.url}" does not have any rate limits`)},Jc=function(){const t={method:this.method,headers:this.headers,body:JSON.stringify(this.body),cache:"default"};return Math.random()>1?(console.log("Error route"),fetch("http://127.0.0.1:3000/api/version",t)):fetch(this.url,t)};let re=Xr;const Ii=new Map,$a=new Map;function si(e){return e.storeName??(e.storeName=""),e.fetchOnDebug??(e.fetchOnDebug=!1),e.type??(e.type="default"),F(e.type==="no-store"||Number.isInteger(e.expiresInSeconds),"Give explisite expiration time. 0 if the data never expires"),F(e.type==="no-store"||e.expiresInSeconds>0,"Expiration time should be more than 0"),F(e.type!=="no-store"||!e.storeName,"StoreName is not used because cache type is no-store"),function(n){return(...r)=>{const[i,l]=O(void 0),[s,o]=O(!1),[c,u]=O(!1),[h,f]=O(!0);let g=null;const m=e.type=="default"||e.type=="only-if-cached",y=(Ai==!1||e.fetchOnDebug||e.type=="no-store"||!e.storeName)&&m==!1,v=(k,b)=>{if(typeof k=="function"&&(k=k(Ce(i))),k=structuredClone(k),F(Ce(i)!==null||e.type!=="only-if-cached","Can't mutate null data"),F(typeof k=="object","Data should always be JSON object data"),e.type!=="no-store"&&(Ii.set(g.cacheKey,k),e.storeName)){f(!1);const A=Ge.fetchCache();A.onsuccess=w=>{const $=w.target.result,E=Ge.store($,e.storeName,"readwrite",()=>f(!0),()=>f(!0)).put(k);b&&(E.onsuccess=b)}}},_=k=>{k.cacheKey===g.cacheKey&&l(k)},x=k=>{typeof k=="function"&&(k=k(Ce(i))),l(k)},S=async()=>{if(e.type==="only-if-cached")return u(!1),l(null);$a.has(g.cacheKey)||$a.set(g.cacheKey,g.send());const k=await $a.get(g.cacheKey);if($a.delete(g.cacheKey),k!==null){if(e.expiresInSeconds){const b=new Date;k.expires=b.setSeconds(b.getSeconds()+e.expiresInSeconds)}He(()=>{k.error?(o(!0),console.assert(!Ai,"Fetch error, not saving data to cache")):(v(k),_(k)),u(!1)})}};return W(()=>{const k=r.map(A=>typeof A=="function"?A():A);if(k.some(A=>A===void 0))return;g==null||g.abort(),g=n(...k),Ai&&console.log("Fetching",e.type,g.body||g.url),He(()=>{u(!0),o(!1)});const b=Ii.get(g.cacheKey);if(b&&b.expires>new Date)if(_({...b,fromCache:!0}),e.type==="fetch-once"){u(!1);return}else y===!1&&u(!1);else if(e.type!=="no-store"&&e.storeName){const A=Ge.fetchCache();A.onerror=S,A.onsuccess=w=>{const $=w.target.result,E=Ge.store($,e.storeName,"readonly").get(g.cacheKey);E.onerror=S,E.onsuccess=I=>{if(I.target.result&&(F(I.target.result.expires,"Cache should have a expiration date"),F(I.target.result.data,"Cache should always have data"),I.target.result.expires>new Date)){y==!1&&u(!1);const P={...I.target.result,fromCache:!0};return e.type!=="only-if-cached"&&Ii.set(P.cacheKey,P),_(P)}y==!1&&S()}}}else y==!1&&S();y&&S()}),Object.defineProperties(i,{error:{get:()=>s()},loading:{get:()=>c()},indexedDBClosed:{get:()=>h()}}),Ye(()=>g==null?void 0:g.abort()),[i,{mutate:x,refetch:S,mutateCache:v}]}}}var _r,Oa;const sr=class sr{static store(t,n,r,i,l){const s=t.transaction(n,r);return i?s.onerror=i:s.onerror=console.warn,l&&(s.oncomplete=l),s.objectStore(n)}static fetchCache(t){const n=indexedDB.open("legendary-octo-barnacle-cache",2);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var l,s;const i=r.target.result;switch(r.oldVersion){case 0:It(l=sr,_r,Oa).call(l,i,"results",{keyPath:"cacheKey"});case 1:It(s=sr,_r,Oa).call(s,i,"debug",{keyPath:"cacheKey"})}},n}static user(t){const n=indexedDB.open("legendary-octo-barnacle-users",1);return t&&(n.onerror=t),n.onupgradeneeded=r=>{var l;const i=r.target.result;switch(r.oldVersion){case 0:It(l=sr,_r,Oa).call(l,i,"data")}},n}};_r=new WeakSet,Oa=function(t,n,r){t.objectStoreNames.contains(n)||t.createObjectStore(n,r)},lt(sr,_r);let Ge=sr;const Fs=e=>{var t,n;return((n=(t=e.anime)==null?void 0:t[0])==null?void 0:n.animethemes)??[]},rf=({id:e,api:t,type:n})=>{if(n===da)switch(t){case al:return kn(Mc(e),Fs);case ja:return kn(mg(e),Fs)}};class af{constructor(t,n,r){F(t,"Missing cacheKey"),F(r,"Don't cache empty data"),F(n,"Expiration date is missing"),this.data=r,this.cacheKey=t,this.expires=Nf(n)}}class sn{constructor(t,n,r){F(t,"CacheKey is missing"),this.cacheKey=t,this.data=n,this.cacheType=r}}const Ei={},Qe=e=>Bl(()=>null,!1,()=>!1,!1,e),Bn=(e,t)=>Bl(e,!0,()=>!1,!1,t),Ul=(e,t)=>Bl(()=>null,!0,e,!1,t),Bl=(e,t,n,r,i)=>{dn(e,"cacheTypeSignal is not a function"),dn(n,"senderDisabledSignal is not a function"),dn(i,"fetcherSignal is not a function");const[l,s,o]=cf(void 0),[c,u]=O(!1),[h,f]=O(!1),[g,m]=O(!0);let y=null,v=null;const _=C=>{if(typeof C=="function"){const{data:E,cacheType:I}=Ce(l)||{};return C(new sn(y.cacheKey,E,I))}return C},x=(C,E)=>{var J,G;const I=_(C),P=new af(I.cacheKey,y.settings.expiresInSeconds,structuredClone(I.data));P.cacheKey===y.cacheKey&&o(I);const{type:R,storeName:U}=y.settings;if(R==="no-store"||!U)return;(G=(J=y.settings).saveToSessionStorage)==null||G.call(J,P),Ei[P.cacheKey]=P,m(!1);const H=Ge.fetchCache();H.onsuccess=q=>{const he=q.target.result,X=Ge.store(he,U,"readwrite",()=>m(!0),()=>m(!0)).put(P);E&&(X.onsuccess=E)}},S=C=>{F(C instanceof sn),C.cacheKey===y.cacheKey&&s(C)},k=C=>{C=_(C),F(C instanceof sn),s(C)},b=(C,E)=>{C=_(C),x(C,E),k(C)},A=async(C,E)=>{if(C!==y)return;if(F(C,"fetcher should not be undefined"),E==="only-if-cached"){He(()=>{t||(s(new sn(C.cacheKey,null)),f(!1))});return}v==null||v.abort();const I=new AbortController;v=I;const P=await Df(C,I.signal);P===null?C===y&&He(()=>{u(!0),f(!1),!I.signal.aborted&&!t&&s(new sn(C.cacheKey,null))}):He(()=>{const R=new sn(C.cacheKey,P);x(R),S(R),C===y&&f(!1)})},w=N(C=>{const E=i(),I=e()||(E==null?void 0:E.settings.type)||C;if(y!==E)return I;switch(xt(C,"prev","If fetcher is same as currentFetcher why is there no previous cacheType"),C){case"only-if-cached":if(I==="default")return I;case"default":if(I==="fetch-once")return I;case"fetch-once":if(I==="reload"||I==="no-store")return I}return C}),$=N(()=>{const C=i(),E=n();return y!==C?E:!1});return L(()=>{if($())return;const C=i();if(!C){y=null,s(void 0);return}F(C instanceof Yl);const E=w();xt(E,"caheType");const I=Cr&&!C.settings.fetchOnDebug&&E!=="no-store",P=!I&&(E==="fetch-once"||E==="reload"||E==="no-store"),R=C.cacheKey;if(y=C,He(()=>{u(!1),f(!0)}),R in Ei){const U=Ei[R];if(I||E==="only-if-cached"||E==="fetch-once"||E==="default"){He(()=>{s(new sn(U.cacheKey,U.data,"local")),f(!1)});return}else s(new sn(U.cacheKey,U.data,"local"))}else if(E!=="no-store"&&C.settings.storeName){const U=Ge.fetchCache(),H=()=>!P&&A(C,E);U.onerror=H,U.onsuccess=J=>{const G=J.target.result,he=Ge.store(G,C.settings.storeName,"readonly").get(R);he.onerror=H,he.onsuccess=Z=>{const X=Z.target.result;if(X&&(F(X.expires,"Cache should have a expiration date"),F(X.data,"Cache should always have data"),X.expires>new Date)){const Q=new sn(R,X.data,"indexedDB");P?S(Q):He(()=>{S(Q),f(!1)});return}H()}}}P&&A(C,E)}),Object.defineProperties(l,{error:{get:()=>c()},loading:{get:()=>h()},indexedDBClosed:{get:()=>g()}}),Ye(()=>v==null?void 0:v.abort()),[l,{mutate:k,refetch:()=>A(Ce(i),Ce(i).settings.type),mutateCache:x,mutateBoth:b}]},Vl=(e,t)=>{const[n,r]=O(localStorage.getItem(e)??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,o),o})}]},lf=e=>{if(e==="true")return!0;if(e==="false")return!1},Us=(e,t)=>{const[n,r]=O(lf(localStorage.getItem(e))??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,String(o)),o})}]},sf=e=>{try{return JSON.parse(e)}catch{}},of=(e,t)=>{const[n,r]=O(sf(localStorage.getItem(e))??t);return[n,l=>{r(s=>{const o=typeof l=="function"?l(s):l;return o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o)),o})}]},Gl=(e=!0)=>O(Cr===e),Bs=e=>{dn(e);const[t,n]=O();return L(()=>{const r=e();n(r)}),[t,n]},cf=e=>{const[t,n]=O(0);let r=e;return[()=>(t(),r),o=>(r=typeof o=="function"?o(r):o,n(u=>u+1),r),o=>(r=typeof o=="function"?o(r):o,r)]},df=()=>{He(()=>{Xc(e=>e+1),Qc(e=>e+1),Zc(e=>e+1),ed(e=>e+1)})};let Mt=null;const uf=e=>{Mt===null?(Mt=[e],e()):Mt.includes(e)||Mt.push(e)},hf=()=>{Mt==null||Mt.shift();const e=Mt==null?void 0:Mt[0];e?e():Mt=null},gf=()=>{setTimeout(()=>Xc(e=>e-1),1e3),setTimeout(()=>Zc(e=>e-1),3e3),setTimeout(()=>Qc(e=>e-1),5e3),setTimeout(()=>ed(e=>e-1),1e4)},[pC,Xc]=O(0),[vC,Zc]=O(0),[ol,Qc]=O(0),[$C,ed]=O(0),ff=()=>{He(()=>{td(e=>e+1),nd(e=>e+1),rd(e=>e+1),ad(e=>e+1)})};let Dt=null;const mf=e=>{Dt===null?(Dt=[e],e()):Dt.includes(e)||Dt.push(e)},pf=()=>{Dt==null||Dt.shift();const e=Dt==null?void 0:Dt[0];e?e():Dt=null},vf=()=>{setTimeout(()=>td(e=>e-1),1e3),setTimeout(()=>nd(e=>e-1),2e3),setTimeout(()=>rd(e=>e-1),5e3),setTimeout(()=>ad(e=>e-1),1e4)},[oi,td]=O(0),[$f,nd]=O(0),[_C,rd]=O(0),[bC,ad]=O(0),[Vs,_f]=je({}),na=7*24*60*60,er=24*60*60,cl=new Date/1e3,An=e=>Array.isArray(e);function qt(e,t){if(e){if(An(e))return Object.fromEntries(e.map(n=>[n,!0]))}else return t||null;return{[e]:!0}}function We(e){return An(e)?e:e?[e]:[]}const bf=(...e)=>{const t=[];for(const n of e)t.push(...We(n));return t},Gs=(e,t)=>(e=We(e),e.includes(t)),yf=(e,...t)=>We(e).filter(n=>!t.includes(n)),Hs=(e,t,n)=>(e=We(e),(n===void 0?e.includes(t):n)?e=yf(e,t):e.push(t),e);function lr(e){return new Set(We(e))}function wf(e){F(An(e),"Not array");const t=new Map;return e.forEach(n=>t.set(n.toLowerCase(),n)),Array.from(t.values())}function jr(e,t){return e===t?!0:typeof e!=typeof t?!1:An(e)?e.length===t.length&&e.every((n,r)=>jr(n,t[r])):!1}function Gt(e){return An(e)?e[0]:e}function id(e,t,n=0,r=e.length-1){for(;n<=r;){const i=(r+n)/2|0,l=t(e[i],i,e);if(l===0)return i;l<0?r=i-1:n=i+1}return-1}function cr(e,t,n=0,r=e.length-1){let i=null;for(;n<=r;){const s=(r+n)/2|0;if(i=t(e[s],s,e),i===0)return s;i<0?r=s-1:n=s+1}return i===null?0:((r+n)/2|0)==e.length-1?i<0?e.length-1:e.length:i<0?r+1:n-1}const kf=(e,t,n)=>(dn(t),!An(e)||e.length===0?n:e.find(t)??e[0]??n),Sf=(e,t,n)=>!An(e)||e.length===0?n:e.at(t%e.length);function ra(e,t){if(An(e))return e[Math.round((e.length-1)*t)]}const Oe=e=>e!==1?"s":"",qe=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Hl=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},Cf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"China";case"TW":return"Taiwan";case"KR":return"South Korea";default:return"Japan"}},yr=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return qe(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}};function xf(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return qe(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:return console.error("Unknown status"),e}}const ye=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Ys=e=>{if(e!=null)return F(typeof e=="number","Number is not typeof number"),Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1}).format(e)},Ke=e=>(F(e!=null,"No title given"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Ve=e=>(F(e.type,"type is missing"),F("id"in e,"id is missing"),"/ani/"+e.type.toLowerCase()+"/"+e.id+"/"+Ke(e.title.userPreferred)),za=e=>{if(F("year"in e,"No year found"),F("month"in e,"No month found"),F("day"in e,"No day found"),!e.year&&!e.month&&!e.day)return"";if(e.year&&!e.month&&!e.day)return e.year.toString();const t={};return e.year&&(t.year="numeric"),e.month&&(t.month="short"),e.day&&(t.day="numeric"),new Date(e.year||1970,e.month-1||0,e.day||1).toLocaleDateString("us-US",t)},ld=e=>{const t=new Date(e),n={year:"numeric",month:"short",day:"numeric"};return t.toLocaleDateString("us-US",n)};function _a(e,t){t&&e(Ve(t))}const js=e=>typeof e=="object"&&e,Af=(e,...t)=>{Rl(t.length<1,"Give more objects");for(const n of t)sd(e,n);return e},sd=(e,t)=>{for(const n in t)e[n]??(e[n]=t[n]),js(e[n])&&js(t[n])?sd(e[n],t[n]):e[n]=t[n]},Tf=e=>typeof e=="function",od=e=>Tf(e)?e():e,If=(e,t)=>{dn(e);const n=[];for(const r of t){const i=od(r);if(i===void 0)return;n.push(i)}return e(...n)},Pe=(e,...t)=>N(()=>If(e,t)),Ef=[ii,Wh,qh,Kh,yc],Vn=e=>N(()=>{for(const t of Ef)if(od(e[t]))return t});class Lf{constructor(t={}){this.expiresInSeconds=t.expiresInSeconds,this.fetchOnDebug=t.fetchOnDebug||!1,this.storeName=t.storeName||"",this.type=t.type||"default",this.saveToSessionStorage=t.saveToSessionStorage,F(typeof t=="object","Settings must be object"),F(!t.active||typeof t.active=="function","settings.active should a signal"),F(t.type==="no-store"||Number.isInteger(t.expiresInSeconds),"Give explicit expiration time. 0 if the data never expires"),F(t.type==="no-store"||t.expiresInSeconds>0,"Expiration time should be more than 0"),F(t.type!=="no-store"||!t.storeName,"StoreName is not used because cache type is no-store"),F(!t.saveToSessionStorage||typeof t.saveToSessionStorage=="function","saveToSessionStorage is not function")}}class Yl{constructor(t,n,r){F(t,"URL is missing"),this.url=t,this.options=n,this.formatResponse=r,this.settings=new Lf({storeName:"results",type:"fetch-once",expiresInSeconds:60*60*24*365})}get cacheKey(){var t;return`${this.url}${((t=JSON.stringify(this.options))==null?void 0:t.replaceAll('"',""))||""}${this.formatResponse||""}`}}const ci=(e,t)=>(e&&(e.settings.type=t),e),Pf=(e,t)=>(Kf(e.url),Mf(e,t).finally(()=>Jf(e.url))),Mf=(e,t)=>{const n={...e.options||{},signal:t};if(n.body&&(n.body=JSON.stringify(e.options.body)),n.cache??(n.cache="default"),Math.random()>1)switch(console.log("Error route"),Math.ceil(Math.random()*3)){case 1:return fetch("https://http.codes/429",n);case 2:return fetch("https://http.codes/500",n);case 3:return fetch("https://http.codes/cors",n)}else return e.delay?new Promise((r,i)=>{fetch(e.url,n).then(l=>setTimeout(()=>r(l),e.delay)).catch(i)}):fetch(e.url,n)},ba={},ya={};let Li=0;const Df=async(e,t)=>{var i,l,s;try{const{resolve:o,promise:c}=Promise.withResolvers();for(let u=0;u<3&&!t.aborted;u++){qf(e.url)&&(ka(e.url,o),await c);try{var n=await(ba[i=e.cacheKey]??(ba[i]=Pf(e,t)))}catch{if(t.aborted)return null}finally{delete ba[e.cacheKey]}const h=zf(e.url,(n==null?void 0:n.status)||"cors");if((n==null?void 0:n.status)===429&&n.headers.get("Retry-After")){ka(e.url,o);const f=parseInt(n.headers.get("Retry-After"));await new Promise(g=>setTimeout(g,f*1e3));continue}else if((n==null?void 0:n.status)===400&&Li<3){if(ka(e.url,o),(await n.json()).errors.some(g=>g.message==="Invalid token")){Li++,await new Promise(g=>setTimeout(g,3e3));continue}}else if(h){ka(e.url,o),await new Promise(f=>setTimeout(f,h));continue}else if(!(n!=null&&n.ok))return null;e.url.includes(jn)&&(Li=0);try{var r=await(ya[l=e.cacheKey]??(ya[l]=n.json()))}catch(f){return console.error(f),null}finally{delete ya[e.cacheKey]}return((s=e.formatResponse)==null?void 0:s.call(e,r))||r}}catch{}finally{Wf(e.url)}return null},ua=(e,t,n=1)=>{const r=[];let i=null,l=!1;async function s(...c){r.push(async()=>{r.shift(),l=!0,await e(...c),l=!1,o(t)}),r.length==n+1&&r.shift(),!l&&(i===null?o():o(t))}return s.bufferSize=()=>r.length,s;function o(c){const u=r[0];clearTimeout(i),i=null,u&&(c?i=setTimeout(u,c):(l=!0,u()))}},cd=e=>{let t;const n=(r,...i)=>{clearTimeout(t),setTimeout(()=>e(...i),r)};return Ye(()=>clearTimeout(t)),n},Rf=e=>{const t=new Date;return t.setMilliseconds(t.getMilliseconds()+e),t},Nf=e=>Rf(e*1e3),aa=e=>{if(e!=null)return Intl.NumberFormat("ja-JP").format(e)},Of=e=>!isNaN(e)&&typeof e=="number",Ff=(e,t)=>{const n=Number(e);return Of(n)?n:t},Uf=(e,t)=>Math.max(e??t,t??e),wa=(e,t,n)=>e+n*(t-e),zs=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Bf=e=>{if(!(e!=null&&e.length))return"";switch(e){case Xh:case Ls:return Ls;case Sc:return"Not yet released";case Zh:case Qh:return"Releasing";case eg:return"Cancelled";case tg:return"On hiatus";default:return console.error("Unknown media format"),e}},dd=(e,t)=>"/mal/"+e+"/"+t.mal_id+"/"+Gn(t.title),Vf=e=>"/mal/character/"+e.mal_id+"/"+Gn(e.name),ud=e=>{xt(e.type,"Media type"),Cc(e.id,"Media id");const t="/ani/"+e.type.toLowerCase()+"/"+e.id;return e.title.userPreferred?t+"/"+Gn(e.title.userPreferred):t},Gf=()=>location.hostname==="kassu11.github.io"?24951:location.port==5173?7936:location.port==5174?31649:-1,Gn=e=>(xt(e,"title"),encodeURI(e.toLowerCase().replace(/[#%?]+/g,"").replace(/[/\\\-\u2010-\u2015_{}[\]]+/g," ").trim().replace(/ +/g,"-"))),Hf=e=>e!==1?"s":"",wr=e=>e!=null&&e.length?e[0].toUpperCase()+e.substring(1).toLowerCase():"",Yf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CN":return"Chinese";case"TW":return"Taiwanese";case"KR":return"Korean";default:return"Japanese"}},jf=e=>{if(!(e!=null&&e.length))return"";switch(e){case"ANIME":case"COMIC":case"DOUJINSHI":case"GAME":case"MANGA":case"NOVEL":case"ORIGINAL":case"OTHER":return wr(e);case"LIGHT_NOVEL":case"LIVE_ACTION":case"MULTIMEDIA_PROJECT":case"PICTURE_BOOK":case"VISUAL_NOVEL":case"VIDEO_GAME":case"WEB_NOVEL":return wr(e.replace("_"," "));default:return console.error("Unknown media format"),e}},dl=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CM":case"ONA":case"OVA":case"PV":case"TV":return e;case"DOUJIN":case"LIGHTNOVEL":case"MANGA":case"MANHUA":case"MANHWA":case"MOVIE":case"MUSIC":case"NOVEL":case"ONE-SHOT":case"SPECIAL":return wr(e);case"ONE_SHOT":return"One-shot";case"TV_SHORT":return"TV short";case"TV_SPECIAL":return"TV special";default:return console.error("Unknown media format"),e}},hd=e=>{if(!(e!=null&&e.length))return"";switch(e){case"CANCELLED":case"FINISHED":case"HIATUS":case"NOT_YET_RELEASED":case"RELEASING":return wr(e.replaceAll("_"," "));default:return console.error("Unknown media format"),e}},zf=(e,t)=>{if(e.includes(jn))switch(t){case 429:return 25e3;case 500:return 3e3;case"cors":return 4e4}if(e.includes(xr))switch(t){case 429:return 1e3}if(e.includes(zh))switch(t){case 429:return 25e3}},ka=(e,t)=>{e.includes(jn)?uf(t):e.includes(xr)&&mf(t)},Wf=e=>{e.includes(jn)?hf():e.includes(xr)&&pf()},qf=e=>{if(e.includes(jn))return Mt!==null;if(e.includes(xr))return Dt!==null},Kf=e=>{e.includes(jn)?df():e.includes(xr)&&ff()},Jf=e=>{e.includes(jn)?gf():e.includes(xr)&&vf()};var Xf=p("<li data-k-c7a289e2><button data-k-c7a289e2>Logout"),Zf=p("<li data-k-c7a289e2>"),Qf=p('<img data-k-c7a289e2 alt="Profile avatar">'),em=p("<li data-k-c7a289e2 class=profile>"),tm=p("<nav data-k-c7a289e2 class=main-navigation><ul data-k-c7a289e2><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2></li><li data-k-c7a289e2>"),nm=p("<main data-k-c7a289e2 id=page-content>"),rm=p("<footer data-k-c7a289e2 class=main-footer>"),am=p("<li data-k-c7a289e2><a data-k-c7a289e2>Login with AniList");function im(e){const t=`https://anilist.co/api/v2/oauth/authorize?client_id=${Gf()}&response_type=token`,{accessToken:n,authUserData:r,logoutUser:i}=ie();let l=new AbortController;return W(()=>{var o,c;l.abort(),l=new AbortController;const s=(c=(o=r())==null?void 0:o.data)==null?void 0:c.name;window.addEventListener("keydown",u=>{u.target!==document.body||u.shiftKey||u.ctrlKey||u.key==="d"&&u.altKey&&s==="kassu11"&&(u.preventDefault(),location.hostname!="localhost"?window.open(location.href.replace(location.origin,"http://localhost:5173")):location.port==5173?window.open(location.href.replace(5173,5174)):window.open(location.href.replace(location.origin,"https://kassu11.github.io")))},{signal:l.signal})}),[(()=>{var s=tm(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling;return d(c,a(B,{href:"/",children:"Home"})),d(u,a(B,{href:"/browse/anime",children:"Anime"})),d(h,a(B,{href:"/browse/manga",children:"Manga"})),d(f,a(B,{href:"/browse/media",children:"Search"})),d(o,a(T,{get when(){return n()},get fallback(){return(()=>{var g=am(),m=g.firstChild;return V(m,"href",t),g})()},get children(){return[(()=>{var g=Xf(),m=g.firstChild;return m.$$click=()=>i(),g})(),a(T,{get when(){return r()},get children(){return[(()=>{var g=Zf();return d(g,a(B,{href:"/notifications",get children(){return["Notifications (",N(()=>r().data.unreadNotificationCount),")"]}})),g})(),(()=>{var g=em();return d(g,a(B,{get href(){return"/user/"+r().data.name},get children(){return[N(()=>r().data.name),(()=>{var m=Qf();return L(()=>V(m,"src",r().data.avatar.large)),m})()]}})),g})()]}})]}}),null),s})(),a(jh,{}),(()=>{var s=nm();return d(s,()=>e.children),s})(),rm()]}_e(["click"]);var lm=p("<p>");const[Pi,sm]=O(cl);setInterval(()=>sm(new Date/1e3),1e3*30);function om(e){const t=e.airingAt<Pi(),n=N(()=>{const i=Math.abs(e.airingAt-Pi());return t?na-i%na:i}),r=N(i=>i===!1&&e.airingAt<Pi()?(e.setAiringEpisode(l=>l+1),!0):i,!1);return[a(T,{get when(){return!t&&r()},children:"aired in"}),(()=>{var i=lm();return d(i,a(T,{get when(){return Math.floor(n()/3600/24)},children:l=>[l,"d "]}),null),d(i,a(T,{get when(){return Math.floor(n()/3600%24)},children:l=>[l,"h "]}),null),d(i,a(T,{get when(){return Math.floor(n()%3600/60)},children:l=>[l,"m "]}),null),i})()]}var cm=p('<button data-k-9c12ef02 class="cp-current-card-hover-info normal">Completed'),dm=p("<button data-k-9c12ef02 class=cp-current-card-hover-info> <span data-k-9c12ef02 class=plus>+"),um=p("<img data-k-9c12ef02 alt=Cover.>"),hm=p("<div data-k-9c12ef02 class=is-behind-container>"),gm=p("<div data-k-9c12ef02 class=cp-current-card-info><p data-k-9c12ef02>Ep "),fm=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> behind"),mm=p("<p data-k-9c12ef02> episode<! data-k-9c12ef02> left"),pm=p("<p data-k-9c12ef02> chapter<! data-k-9c12ef02> left"),vm=p('<div data-k-9c12ef02 class=hover data-tooltip-positions="right left middle"><p data-k-9c12ef02 class=line-clamp></p><p data-k-9c12ef02 class=progress-status>Progress: ');function $m(e){if(!(e!=null&&e.episode))return null;if((e==null?void 0:e.airingAt)<cl){const t=Math.abs(e.airingAt-cl);return e.episode+Math.floor(t/na)+1}return e.episode}function _m(e){const{accessToken:t}=ie(),n=ua(async(r,i,l)=>{const s=await ae.anilist.mutateMedia(r,{mediaId:i,progress:l});s.status===200&&(F(s.data.progress,"No progress found"),e.data.progress=s.data.progress,s.data.status==="COMPLETED"?e.mutateCache(o=>(o.data.data.Page.mediaList=o.data.data.Page.mediaList.filter(c=>c.id!==e.data.id),o)):e.mutateCache(o=>o))},250,2);return a(j,{get fallback(){return(()=>{var r=dm(),i=r.firstChild;return r.$$click=l=>{l.preventDefault(),n(t(),e.data.media.id,e.progress()+1),e.setProgress(s=>s+1)},d(r,()=>e.progress,i),r})()},get children(){return a(M,{get when(){return e.data.media.episodes===e.progress()||e.data.media.chapters===e.progress()},get children(){var r=cm();return r.$$click=i=>i.preventDefault(),r}})}})}function bm(e){const[t,n]=O(e.data.progress),[r,i]=O($m(e.data.media.nextAiringEpisode)),l=N(()=>r()>t()+1),s=()=>r()-(t()+1),o=()=>Math.min(s()/10,.45),c=()=>1/(s()-o())*100;return a(B,{get href(){return Ve(e.data.media)},"data-tooltip-trigger":!0,class:"cp-current-card",get children(){return[(()=>{var u=um();return L(()=>V(u,"src",e.data.media.coverImage.large)),u})(),a(T,{get when(){var u;return(u=e.data.media.nextAiringEpisode)==null?void 0:u.airingAt},get children(){var u=gm(),h=u.firstChild;return h.firstChild,d(h,r,null),d(u,a(om,{get airingAt(){return e.data.media.nextAiringEpisode.airingAt},setAiringEpisode:i}),null),d(u,a(T,{get when(){return l()},get children(){var f=hm();return L(g=>(g=`repeating-linear-gradient(90deg, var(--red-400), var(--red-400) ${c()*(1-o())}%, transparent ${c()*(1-o())}%, transparent ${c()}%)`)!=null?f.style.setProperty("background",g):f.style.removeProperty("background")),f}}),null),u}}),a(_m,{get data(){return e.data},get mutateCache(){return e.mutateCache},progress:t,setProgress:n}),(()=>{var u=vm(),h=u.firstChild,f=h.nextSibling;return f.firstChild,d(u,a(j,{get children(){return[a(M,{get when(){return N(()=>!!r())()&&l()},get children(){var g=fm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>r()-(t()+1),m),d(g,()=>r()-(t()+1)>1&&"s",y),g}}),a(M,{get when(){return N(()=>r()==null)()&&e.data.media.episodes-t()>0},get children(){var g=mm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.episodes-t(),m),d(g,()=>e.data.media.episodes-t()>1&&"s",y),g}}),a(M,{get when(){return e.data.media.chapters-t()>0},get children(){var g=pm(),m=g.firstChild,y=m.nextSibling;return y.nextSibling,d(g,()=>e.data.media.chapters-t(),m),d(g,()=>e.data.media.chapters-t()>1&&"s",y),g}})]}}),h),d(h,()=>e.data.media.title.userPreferred),d(f,t,null),d(f,a(T,{get when(){return e.data.media.episodes},get children(){return["/",N(()=>e.data.media.episodes)]}}),null),d(f,a(T,{get when(){return e.data.media.chapters},get children(){return["/",N(()=>e.data.media.chapters)]}}),null),u})()]}})}_e(["click"]);var ym=p('<div data-k-ea0ffbeb class="grid-column-auto-fill current">');function Mi(e){return a(T,{get when(){return e.cards.length},get children(){var t=ym();return d(t,a(Y,{get each(){return e.cards},children:n=>a(bm,{data:n,get mutateCache(){return e.mutateCache}})})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}var wm=p("<button data-k-b9535d1e>Picture mode"),km=p("<button data-k-b9535d1e>Text mode"),Sm=p("<div data-k-b9535d1e class=pg-home-current>");const Di=0,Ws=1;function Cm(e){const{isDeveloper:t}=ie(),[n,{mutateCache:r}]=ae.anilist.wachingAnime(e.userId,e.token),[i,{mutateCache:l}]=ae.anilist.readingManga(e.userId,e.token),s=new Date/1e3,o=f=>{if(f==null)return null;if(f<s){const g=(s-f)%na;return s+(na-g)}return f},c=(f,g)=>{var v,_;const m=o((v=f.media.nextAiringEpisode)==null?void 0:v.airingAt),y=o((_=g.media.nextAiringEpisode)==null?void 0:_.airingAt);return m&&y?m-y:m==y?0:m==null?1:-1},[u,h]=Vl("LOB_CURRENTLY_WATCHING_MODE",Di);return[a(T,{get when(){return t()},get children(){return[(()=>{var f=wm();return f.$$click=()=>h(Di),f})(),(()=>{var f=km();return f.$$click=()=>h(Ws),f})()]}}),(()=>{var f=Sm();return d(f,a(T,{get when(){return n()},get children(){return[a(Mi,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status!=="FINISHED").toSorted(c)},mutateCache:r,get loading(){return n.loading}}),a(Mi,{get cards(){return n().data.data.Page.mediaList.filter(g=>g.media.status==="FINISHED")},mutateCache:r,get loading(){return n.loading}})]}}),null),d(f,a(T,{get when(){return i()},get children(){return a(Mi,{get cards(){return i().data.data.Page.mediaList},mutateCache:l,get loading(){return i.loading}})}}),null),L(g=>{var m=u()==Di,y=u()==Ws;return m!==g.e&&f.classList.toggle("picture",g.e=m),y!==g.t&&f.classList.toggle("text",g.t=y),g},{e:void 0,t:void 0}),f})()]}_e(["click"]);const nn=(e,t)=>{let n;const r=()=>clearTimeout(n);return kr()&&Ye(r),Object.assign((...l)=>{n!==void 0&&r(),n=setTimeout(()=>e(...l),t)},{clear:r})};function Sn(e,t,n){let r;(function(c){c[c.Ready=0]="Ready",c[c.Leading=1]="Leading",c[c.Trailing=2]="Trailing"})(r||(r={}));let i=r.Ready;const l=e(c=>{i===r.Trailing&&t(...c),i=r.Ready},n),s=(...c)=>{i!==r.Trailing&&(i===r.Ready&&t(...c),i+=1),l(c)},o=()=>{i=r.Ready,l.clear()};return kr()&&Ye(o),Object.assign(s,{clear:o})}var xm=p("<span>");function Hn(e){const[t,n]=ri(e,["class"]);return(()=>{var r=xm();return Et(r,Fe({get class(){return"cp-loader-circle "+t.class||""}},n),!1,!1),r})()}var Am=p("<tool-tip inert role=tooltip>",!0,!1,!1);function Ct(e){return(()=>{var t=Am();return Et(t,e,!1,!1),t._$owner=kr(),L(()=>V(t,"tip-position",e.tipPosition)),t})()}function jl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let zn=jl();function gd(e){zn=e}const qr={exec:()=>null};function Ee(e,t=""){let n=typeof e=="string"?e:e.source;const r={replace:(i,l)=>{let s=typeof l=="string"?l:l.source;return s=s.replace($t.caret,"$1"),n=n.replace(i,s),r},getRegex:()=>new RegExp(n,t)};return r}const $t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Tm=/^(?:[ \t]*(?:\n|$))+/,Im=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Em=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ha=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Lm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,zl=/(?:[*+-]|\d{1,9}[.)])/,fd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,md=Ee(fd).replace(/bull/g,zl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Pm=Ee(fd).replace(/bull/g,zl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Wl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Mm=/^[^\n]+/,ql=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Dm=Ee(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ql).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rm=Ee(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,zl).getRegex(),di="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Kl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Nm=Ee("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Kl).replace("tag",di).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pd=Ee(Wl).replace("hr",ha).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex(),Om=Ee(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",pd).getRegex(),Jl={blockquote:Om,code:Im,def:Dm,fences:Em,heading:Lm,hr:ha,html:Nm,lheading:md,list:Rm,newline:Tm,paragraph:pd,table:qr,text:Mm},qs=Ee("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ha).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex(),Fm={...Jl,lheading:Pm,table:qs,paragraph:Ee(Wl).replace("hr",ha).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",di).getRegex()},Um={...Jl,html:Ee(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Kl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:qr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ee(Wl).replace("hr",ha).replace("heading",` *#{1,6} *[^
]`).replace("lheading",md).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Vm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,vd=/^( {2,}|\\)\n(?!\s*$)/,Gm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ui=/[\p{P}\p{S}]/u,Xl=/[\s\p{P}\p{S}]/u,$d=/[^\s\p{P}\p{S}]/u,Hm=Ee(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xl).getRegex(),_d=/(?!~)[\p{P}\p{S}]/u,Ym=/(?!~)[\s\p{P}\p{S}]/u,jm=/(?:[^\s\p{P}\p{S}]|~)/u,zm=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,bd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Wm=Ee(bd,"u").replace(/punct/g,ui).getRegex(),qm=Ee(bd,"u").replace(/punct/g,_d).getRegex(),yd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Km=Ee(yd,"gu").replace(/notPunctSpace/g,$d).replace(/punctSpace/g,Xl).replace(/punct/g,ui).getRegex(),Jm=Ee(yd,"gu").replace(/notPunctSpace/g,jm).replace(/punctSpace/g,Ym).replace(/punct/g,_d).getRegex(),Xm=Ee("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,$d).replace(/punctSpace/g,Xl).replace(/punct/g,ui).getRegex(),Zm=Ee(/\\(punct)/,"gu").replace(/punct/g,ui).getRegex(),Qm=Ee(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ep=Ee(Kl).replace("(?:-->|$)","-->").getRegex(),tp=Ee("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ep).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Wa=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,np=Ee(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Wa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wd=Ee(/^!?\[(label)\]\[(ref)\]/).replace("label",Wa).replace("ref",ql).getRegex(),kd=Ee(/^!?\[(ref)\](?:\[\])?/).replace("ref",ql).getRegex(),rp=Ee("reflink|nolink(?!\\()","g").replace("reflink",wd).replace("nolink",kd).getRegex(),Zl={_backpedal:qr,anyPunctuation:Zm,autolink:Qm,blockSkip:zm,br:vd,code:Vm,del:qr,emStrongLDelim:Wm,emStrongRDelimAst:Km,emStrongRDelimUnd:Xm,escape:Bm,link:np,nolink:kd,punctuation:Hm,reflink:wd,reflinkSearch:rp,tag:tp,text:Gm,url:qr},ap={...Zl,link:Ee(/^!?\[(label)\]\((.*?)\)/).replace("label",Wa).getRegex(),reflink:Ee(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wa).getRegex()},ul={...Zl,emStrongRDelimAst:Jm,emStrongLDelim:qm,url:Ee(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},ip={...ul,br:Ee(vd).replace("{2,}","*").getRegex(),text:Ee(ul.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Sa={normal:Jl,gfm:Fm,pedantic:Um},Dr={normal:Zl,gfm:ul,breaks:ip,pedantic:ap},lp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ks=e=>lp[e];function tn(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,Ks)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,Ks);return e}function Js(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function Xs(e,t){var l;const n=e.replace($t.findPipe,(s,o,c)=>{let u=!1,h=o;for(;--h>=0&&c[h]==="\\";)u=!u;return u?"|":" |"}),r=n.split($t.splitPipe);let i=0;if(r[0].trim()||r.shift(),r.length>0&&!((l=r.at(-1))!=null&&l.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace($t.slashPipe,"|");return r}function Rr(e,t,n){const r=e.length;if(r===0)return"";let i=0;for(;i<r&&e.charAt(r-i-1)===t;)i++;return e.slice(0,r-i)}function sp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return-1}function Zs(e,t,n,r,i){const l=t.href,s=t.title||null,o=e[1].replace(i.other.outputLinkReplace,"$1");if(e[0].charAt(0)!=="!"){r.state.inLink=!0;const c={type:"link",raw:n,href:l,title:s,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,c}return{type:"image",raw:n,href:l,title:s,text:o}}function op(e,t,n){const r=e.match(n.other.indentCodeCompensation);if(r===null)return t;const i=r[1];return t.split(`
`).map(l=>{const s=l.match(n.other.beginningSpace);if(s===null)return l;const[o]=s;return o.length>=i.length?l.slice(i.length):l}).join(`
`)}class qa{constructor(t){De(this,"options");De(this,"rules");De(this,"lexer");this.options=t||zn}space(t){const n=this.rules.block.newline.exec(t);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(t){const n=this.rules.block.code.exec(t);if(n){const r=n[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Rr(r,`
`)}}}fences(t){const n=this.rules.block.fences.exec(t);if(n){const r=n[0],i=op(r,n[3]||"",this.rules);return{type:"code",raw:r,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:i}}}heading(t){const n=this.rules.block.heading.exec(t);if(n){let r=n[2].trim();if(this.rules.other.endingHash.test(r)){const i=Rr(r,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(r=i.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){const n=this.rules.block.hr.exec(t);if(n)return{type:"hr",raw:Rr(n[0],`
`)}}blockquote(t){const n=this.rules.block.blockquote.exec(t);if(n){let r=Rr(n[0],`
`).split(`
`),i="",l="";const s=[];for(;r.length>0;){let o=!1;const c=[];let u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))c.push(r[u]),o=!0;else if(!o)c.push(r[u]);else break;r=r.slice(u);const h=c.join(`
`),f=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${h}`:h,l=l?`${l}
${f}`:f;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=g,r.length===0)break;const m=s.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const y=m,v=y.raw+`
`+r.join(`
`),_=this.blockquote(v);s[s.length-1]=_,i=i.substring(0,i.length-y.raw.length)+_.raw,l=l.substring(0,l.length-y.text.length)+_.text;break}else if((m==null?void 0:m.type)==="list"){const y=m,v=y.raw+`
`+r.join(`
`),_=this.list(v);s[s.length-1]=_,i=i.substring(0,i.length-m.raw.length)+_.raw,l=l.substring(0,l.length-y.raw.length)+_.raw,r=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:s,text:l}}}list(t){let n=this.rules.block.list.exec(t);if(n){let r=n[1].trim();const i=r.length>1,l={type:"list",raw:"",ordered:i,start:i?+r.slice(0,-1):"",loose:!1,items:[]};r=i?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=i?r:"[*+-]");const s=this.rules.other.listItemRegex(r);let o=!1;for(;t;){let u=!1,h="",f="";if(!(n=s.exec(t))||this.rules.block.hr.test(t))break;h=n[0],t=t.substring(h.length);let g=n[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),m=t.split(`
`,1)[0],y=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):y?v=n[1].length+1:(v=n[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=n[1].length),y&&this.rules.other.blankLine.test(m)&&(h+=m+`
`,t=t.substring(m.length+1),u=!0),!u){const S=this.rules.other.nextBulletRegex(v),k=this.rules.other.hrRegex(v),b=this.rules.other.fencesBeginRegex(v),A=this.rules.other.headingBeginRegex(v),w=this.rules.other.htmlBeginRegex(v);for(;t;){const $=t.split(`
`,1)[0];let C;if(m=$,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),C=m):C=m.replace(this.rules.other.tabCharGlobal,"    "),b.test(m)||A.test(m)||w.test(m)||S.test(m)||k.test(m))break;if(C.search(this.rules.other.nonSpaceChar)>=v||!m.trim())f+=`
`+C.slice(v);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||b.test(g)||A.test(g)||k.test(g))break;f+=`
`+m}!y&&!m.trim()&&(y=!0),h+=$+`
`,t=t.substring($.length+1),g=C.slice(v)}}l.loose||(o?l.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(o=!0));let _=null,x;this.options.gfm&&(_=this.rules.other.listIsTask.exec(f),_&&(x=_[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),l.items.push({type:"list_item",raw:h,task:!!_,checked:x,loose:!1,text:f,tokens:[]}),l.raw+=h}const c=l.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;l.raw=l.raw.trimEnd();for(let u=0;u<l.items.length;u++)if(this.lexer.state.top=!1,l.items[u].tokens=this.lexer.blockTokens(l.items[u].text,[]),!l.loose){const h=l.items[u].tokens.filter(g=>g.type==="space"),f=h.length>0&&h.some(g=>this.rules.other.anyLine.test(g.raw));l.loose=f}if(l.loose)for(let u=0;u<l.items.length;u++)l.items[u].loose=!0;return l}}html(t){const n=this.rules.block.html.exec(t);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(t){const n=this.rules.block.def.exec(t);if(n){const r=n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=n[2]?n[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",l=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:r,raw:n[0],href:i,title:l}}}table(t){var o;const n=this.rules.block.table.exec(t);if(!n||!this.rules.other.tableDelimiter.test(n[2]))return;const r=Xs(n[1]),i=n[2].replace(this.rules.other.tableAlignChars,"").split("|"),l=(o=n[3])!=null&&o.trim()?n[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:n[0],header:[],align:[],rows:[]};if(r.length===i.length){for(const c of i)this.rules.other.tableAlignRight.test(c)?s.align.push("right"):this.rules.other.tableAlignCenter.test(c)?s.align.push("center"):this.rules.other.tableAlignLeft.test(c)?s.align.push("left"):s.align.push(null);for(let c=0;c<r.length;c++)s.header.push({text:r[c],tokens:this.lexer.inline(r[c]),header:!0,align:s.align[c]});for(const c of l)s.rows.push(Xs(c,s.header.length).map((u,h)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:s.align[h]})));return s}}lheading(t){const n=this.rules.block.lheading.exec(t);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(t){const n=this.rules.block.paragraph.exec(t);if(n){const r=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:r,tokens:this.lexer.inline(r)}}}text(t){const n=this.rules.block.text.exec(t);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(t){const n=this.rules.inline.escape.exec(t);if(n)return{type:"escape",raw:n[0],text:n[1]}}tag(t){const n=this.rules.inline.tag.exec(t);if(n)return!this.lexer.state.inLink&&this.rules.other.startATag.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(t){const n=this.rules.inline.link.exec(t);if(n){const r=n[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;const s=Rr(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{const s=sp(n[2],"()");if(s>-1){const c=(n[0].indexOf("!")===0?5:4)+n[1].length+s;n[2]=n[2].substring(0,s),n[0]=n[0].substring(0,c).trim(),n[3]=""}}let i=n[2],l="";if(this.options.pedantic){const s=this.rules.other.pedanticHrefTitle.exec(i);s&&(i=s[1],l=s[3])}else l=n[3]?n[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?i=i.slice(1):i=i.slice(1,-1)),Zs(n,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:l&&l.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer,this.rules)}}reflink(t,n){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){const i=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),l=n[i.toLowerCase()];if(!l){const s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return Zs(r,l,r[0],this.lexer,this.rules)}}emStrong(t,n,r=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!i||i[3]&&r.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!r||this.rules.inline.punctuation.exec(r)){const s=[...i[0]].length-1;let o,c,u=s,h=0;const f=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,n=n.slice(-1*t.length+s);(i=f.exec(n))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(c=[...o].length,i[3]||i[4]){u+=c;continue}else if((i[5]||i[6])&&s%3&&!((s+c)%3)){h+=c;continue}if(u-=c,u>0)continue;c=Math.min(c,c+u+h);const g=[...i[0]][0].length,m=t.slice(0,s+i.index+g+c);if(Math.min(s,c)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(t){const n=this.rules.inline.code.exec(t);if(n){let r=n[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(r),l=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return i&&l&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:n[0],text:r}}}br(t){const n=this.rules.inline.br.exec(t);if(n)return{type:"br",raw:n[0]}}del(t){const n=this.rules.inline.del.exec(t);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(t){const n=this.rules.inline.autolink.exec(t);if(n){let r,i;return n[2]==="@"?(r=n[1],i="mailto:"+r):(r=n[1],i=r),{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}url(t){var r;let n;if(n=this.rules.inline.url.exec(t)){let i,l;if(n[2]==="@")i=n[0],l="mailto:"+i;else{let s;do s=n[0],n[0]=((r=this.rules.inline._backpedal.exec(n[0]))==null?void 0:r[0])??"";while(s!==n[0]);i=n[0],n[1]==="www."?l="http://"+n[0]:l=n[0]}return{type:"link",raw:n[0],text:i,href:l,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){const n=this.rules.inline.text.exec(t);if(n){const r=this.lexer.state.inRawBlock;return{type:"text",raw:n[0],text:n[0],escaped:r}}}}class Nt{constructor(t){De(this,"tokens");De(this,"options");De(this,"state");De(this,"tokenizer");De(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||zn,this.options.tokenizer=this.options.tokenizer||new qa,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:$t,block:Sa.normal,inline:Dr.normal};this.options.pedantic?(n.block=Sa.pedantic,n.inline=Dr.pedantic):this.options.gfm&&(n.block=Sa.gfm,this.options.breaks?n.inline=Dr.breaks:n.inline=Dr.gfm),this.tokenizer.rules=n}static get rules(){return{block:Sa,inline:Dr}}static lex(t,n){return new Nt(n).lex(t)}static lexInline(t,n){return new Nt(n).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var i,l,s;for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let o;if((l=(i=this.options.extensions)==null?void 0:i.block)!=null&&l.some(u=>(o=u.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);const u=n.at(-1);o.raw.length===1&&u!==void 0?u.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.raw,this.inlineQueue.at(-1).src=u.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let c=t;if((s=this.options.extensions)!=null&&s.startBlock){let u=1/0;const h=t.slice(1);let f;this.options.extensions.startBlock.forEach(g=>{f=g.call({lexer:this},h),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(c=t.substring(0,u+1))}if(this.state.top&&(o=this.tokenizer.paragraph(c))){const u=n.at(-1);r&&(u==null?void 0:u.type)==="paragraph"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o),r=c.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=`
`+o.raw,u.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(o);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var o,c,u;let r=t,i=null;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)h.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let l=!1,s="";for(;t;){l||(s=""),l=!1;let h;if((c=(o=this.options.extensions)==null?void 0:o.inline)!=null&&c.some(g=>(h=g.call({lexer:this},t,n))?(t=t.substring(h.raw.length),n.push(h),!0):!1))continue;if(h=this.tokenizer.escape(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.tag(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.link(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(h.raw.length);const g=n.at(-1);h.type==="text"&&(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(h=this.tokenizer.emStrong(t,r,s)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.codespan(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.br(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.del(t)){t=t.substring(h.raw.length),n.push(h);continue}if(h=this.tokenizer.autolink(t)){t=t.substring(h.raw.length),n.push(h);continue}if(!this.state.inLink&&(h=this.tokenizer.url(t))){t=t.substring(h.raw.length),n.push(h);continue}let f=t;if((u=this.options.extensions)!=null&&u.startInline){let g=1/0;const m=t.slice(1);let y;this.options.extensions.startInline.forEach(v=>{y=v.call({lexer:this},m),typeof y=="number"&&y>=0&&(g=Math.min(g,y))}),g<1/0&&g>=0&&(f=t.substring(0,g+1))}if(h=this.tokenizer.inlineText(f)){t=t.substring(h.raw.length),h.raw.slice(-1)!=="_"&&(s=h.raw.slice(-1)),l=!0;const g=n.at(-1);(g==null?void 0:g.type)==="text"?(g.raw+=h.raw,g.text+=h.text):n.push(h);continue}if(t){const g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class Ka{constructor(t){De(this,"options");De(this,"parser");this.options=t||zn}space(t){return""}code({text:t,lang:n,escaped:r}){var s;const i=(s=(n||"").match($t.notSpaceStart))==null?void 0:s[0],l=t.replace($t.endingNewline,"")+`
`;return i?'<pre><code class="language-'+tn(i)+'">'+(r?l:tn(l,!0))+`</code></pre>
`:"<pre><code>"+(r?l:tn(l,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}heading({tokens:t,depth:n}){return`<h${n}>${this.parser.parseInline(t)}</h${n}>
`}hr(t){return`<hr>
`}list(t){const n=t.ordered,r=t.start;let i="";for(let o=0;o<t.items.length;o++){const c=t.items[o];i+=this.listitem(c)}const l=n?"ol":"ul",s=n&&r!==1?' start="'+r+'"':"";return"<"+l+s+`>
`+i+"</"+l+`>
`}listitem(t){var r;let n="";if(t.task){const i=this.checkbox({checked:!!t.checked});t.loose?((r=t.tokens[0])==null?void 0:r.type)==="paragraph"?(t.tokens[0].text=i+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=i+" "+tn(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):n+=i+" "}return n+=this.parser.parse(t.tokens,!!t.loose),`<li>${n}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let n="",r="";for(let l=0;l<t.header.length;l++)r+=this.tablecell(t.header[l]);n+=this.tablerow({text:r});let i="";for(let l=0;l<t.rows.length;l++){const s=t.rows[l];r="";for(let o=0;o<s.length;o++)r+=this.tablecell(s[o]);i+=this.tablerow({text:r})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){const n=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+n+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${tn(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:n,tokens:r}){const i=this.parser.parseInline(r),l=Js(t);if(l===null)return i;t=l;let s='<a href="'+t+'"';return n&&(s+=' title="'+tn(n)+'"'),s+=">"+i+"</a>",s}image({href:t,title:n,text:r}){const i=Js(t);if(i===null)return tn(r);t=i;let l=`<img src="${t}" alt="${r}"`;return n&&(l+=` title="${tn(n)}"`),l+=">",l}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:tn(t.text)}}class Ql{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}}class Ot{constructor(t){De(this,"options");De(this,"renderer");De(this,"textRenderer");this.options=t||zn,this.options.renderer=this.options.renderer||new Ka,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ql}static parse(t,n){return new Ot(n).parse(t)}static parseInline(t,n){return new Ot(n).parseInline(t)}parse(t,n=!0){var i,l;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((l=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&l[o.type]){const u=o,h=this.options.extensions.renderers[u.type].call({parser:this},u);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(u.type)){r+=h||"";continue}}const c=o;switch(c.type){case"space":{r+=this.renderer.space(c);continue}case"hr":{r+=this.renderer.hr(c);continue}case"heading":{r+=this.renderer.heading(c);continue}case"code":{r+=this.renderer.code(c);continue}case"table":{r+=this.renderer.table(c);continue}case"blockquote":{r+=this.renderer.blockquote(c);continue}case"list":{r+=this.renderer.list(c);continue}case"html":{r+=this.renderer.html(c);continue}case"paragraph":{r+=this.renderer.paragraph(c);continue}case"text":{let u=c,h=this.renderer.text(u);for(;s+1<t.length&&t[s+1].type==="text";)u=t[++s],h+=`
`+this.renderer.text(u);n?r+=this.renderer.paragraph({type:"paragraph",raw:h,text:h,tokens:[{type:"text",raw:h,text:h,escaped:!0}]}):r+=h;continue}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}parseInline(t,n=this.renderer){var i,l;let r="";for(let s=0;s<t.length;s++){const o=t[s];if((l=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&l[o.type]){const u=this.options.extensions.renderers[o.type].call({parser:this},o);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=u||"";continue}}const c=o;switch(c.type){case"escape":{r+=n.text(c);break}case"html":{r+=n.html(c);break}case"link":{r+=n.link(c);break}case"image":{r+=n.image(c);break}case"strong":{r+=n.strong(c);break}case"em":{r+=n.em(c);break}case"codespan":{r+=n.codespan(c);break}case"br":{r+=n.br(c);break}case"del":{r+=n.del(c);break}case"text":{r+=n.text(c);break}default:{const u='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}}class Kr{constructor(t){De(this,"options");De(this,"block");this.options=t||zn}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}provideLexer(){return this.block?Nt.lex:Nt.lexInline}provideParser(){return this.block?Ot.parse:Ot.parseInline}}De(Kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class cp{constructor(...t){De(this,"defaults",jl());De(this,"options",this.setOptions);De(this,"parse",this.parseMarkdown(!0));De(this,"parseInline",this.parseMarkdown(!1));De(this,"Parser",Ot);De(this,"Renderer",Ka);De(this,"TextRenderer",Ql);De(this,"Lexer",Nt);De(this,"Tokenizer",qa);De(this,"Hooks",Kr);this.use(...t)}walkTokens(t,n){var i,l;let r=[];for(const s of t)switch(r=r.concat(n.call(this,s)),s.type){case"table":{const o=s;for(const c of o.header)r=r.concat(this.walkTokens(c.tokens,n));for(const c of o.rows)for(const u of c)r=r.concat(this.walkTokens(u.tokens,n));break}case"list":{const o=s;r=r.concat(this.walkTokens(o.items,n));break}default:{const o=s;(l=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&l[o.type]?this.defaults.extensions.childTokens[o.type].forEach(c=>{const u=o[c].flat(1/0);r=r.concat(this.walkTokens(u,n))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,n)))}}return r}use(...t){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{const i={...r};if(i.async=this.defaults.async||i.async||!1,r.extensions&&(r.extensions.forEach(l=>{if(!l.name)throw new Error("extension name required");if("renderer"in l){const s=n.renderers[l.name];s?n.renderers[l.name]=function(...o){let c=l.renderer.apply(this,o);return c===!1&&(c=s.apply(this,o)),c}:n.renderers[l.name]=l.renderer}if("tokenizer"in l){if(!l.level||l.level!=="block"&&l.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const s=n[l.level];s?s.unshift(l.tokenizer):n[l.level]=[l.tokenizer],l.start&&(l.level==="block"?n.startBlock?n.startBlock.push(l.start):n.startBlock=[l.start]:l.level==="inline"&&(n.startInline?n.startInline.push(l.start):n.startInline=[l.start]))}"childTokens"in l&&l.childTokens&&(n.childTokens[l.name]=l.childTokens)}),i.extensions=n),r.renderer){const l=this.defaults.renderer||new Ka(this.defaults);for(const s in r.renderer){if(!(s in l))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;const o=s,c=r.renderer[o],u=l[o];l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f||""}}i.renderer=l}if(r.tokenizer){const l=this.defaults.tokenizer||new qa(this.defaults);for(const s in r.tokenizer){if(!(s in l))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;const o=s,c=r.tokenizer[o],u=l[o];l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f}}i.tokenizer=l}if(r.hooks){const l=this.defaults.hooks||new Kr;for(const s in r.hooks){if(!(s in l))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;const o=s,c=r.hooks[o],u=l[o];Kr.passThroughHooks.has(s)?l[o]=h=>{if(this.defaults.async)return Promise.resolve(c.call(l,h)).then(g=>u.call(l,g));const f=c.call(l,h);return u.call(l,f)}:l[o]=(...h)=>{let f=c.apply(l,h);return f===!1&&(f=u.apply(l,h)),f}}i.hooks=l}if(r.walkTokens){const l=this.defaults.walkTokens,s=r.walkTokens;i.walkTokens=function(o){let c=[];return c.push(s.call(this,o)),l&&(c=c.concat(l.call(this,o))),c}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,n){return Nt.lex(t,n??this.defaults)}parser(t,n){return Ot.parse(t,n??this.defaults)}parseMarkdown(t){return(r,i)=>{const l={...i},s={...this.defaults,...l},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&l.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof r>"u"||r===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof r!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"));s.hooks&&(s.hooks.options=s,s.hooks.block=t);const c=s.hooks?s.hooks.provideLexer():t?Nt.lex:Nt.lexInline,u=s.hooks?s.hooks.provideParser():t?Ot.parse:Ot.parseInline;if(s.async)return Promise.resolve(s.hooks?s.hooks.preprocess(r):r).then(h=>c(h,s)).then(h=>s.hooks?s.hooks.processAllTokens(h):h).then(h=>s.walkTokens?Promise.all(this.walkTokens(h,s.walkTokens)).then(()=>h):h).then(h=>u(h,s)).then(h=>s.hooks?s.hooks.postprocess(h):h).catch(o);try{s.hooks&&(r=s.hooks.preprocess(r));let h=c(r,s);s.hooks&&(h=s.hooks.processAllTokens(h)),s.walkTokens&&this.walkTokens(h,s.walkTokens);let f=u(h,s);return s.hooks&&(f=s.hooks.postprocess(f)),f}catch(h){return o(h)}}}onError(t,n){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){const i="<p>An error occurred:</p><pre>"+tn(r.message+"",!0)+"</pre>";return n?Promise.resolve(i):i}if(n)return Promise.reject(r);throw r}}}const Yn=new cp;function xe(e,t){return Yn.parse(e,t)}xe.options=xe.setOptions=function(e){return Yn.setOptions(e),xe.defaults=Yn.defaults,gd(xe.defaults),xe};xe.getDefaults=jl;xe.defaults=zn;xe.use=function(...e){return Yn.use(...e),xe.defaults=Yn.defaults,gd(xe.defaults),xe};xe.walkTokens=function(e,t){return Yn.walkTokens(e,t)};xe.parseInline=Yn.parseInline;xe.Parser=Ot;xe.parser=Ot.parse;xe.Renderer=Ka;xe.TextRenderer=Ql;xe.Lexer=Nt;xe.lexer=Nt.lex;xe.Tokenizer=qa;xe.Hooks=Kr;xe.parse=xe;xe.options;xe.setOptions;xe.use;xe.walkTokens;xe.parseInline;Ot.parse;Nt.lex;/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */const{entries:Sd,setPrototypeOf:Qs,isFrozen:dp,getPrototypeOf:up,getOwnPropertyDescriptor:hp}=Object;let{freeze:_t,seal:Ft,create:Cd}=Object,{apply:hl,construct:gl}=typeof Reflect<"u"&&Reflect;_t||(_t=function(t){return t});Ft||(Ft=function(t){return t});hl||(hl=function(t,n,r){return t.apply(n,r)});gl||(gl=function(t,n){return new t(...n)});const Ca=bt(Array.prototype.forEach),gp=bt(Array.prototype.lastIndexOf),eo=bt(Array.prototype.pop),Nr=bt(Array.prototype.push),fp=bt(Array.prototype.splice),Fa=bt(String.prototype.toLowerCase),Ri=bt(String.prototype.toString),to=bt(String.prototype.match),Or=bt(String.prototype.replace),mp=bt(String.prototype.indexOf),pp=bt(String.prototype.trim),Ht=bt(Object.prototype.hasOwnProperty),vt=bt(RegExp.prototype.test),Fr=vp(TypeError);function bt(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return hl(e,t,r)}}function vp(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return gl(e,n)}}function we(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Fa;Qs&&Qs(e,null);let r=t.length;for(;r--;){let i=t[r];if(typeof i=="string"){const l=n(i);l!==i&&(dp(t)||(t[r]=l),i=l)}e[i]=!0}return e}function $p(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function Mn(e){const t=Cd(null);for(const[n,r]of Sd(e))Ht(e,n)&&(Array.isArray(r)?t[n]=$p(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Mn(r):t[n]=r);return t}function Ur(e,t){for(;e!==null;){const r=hp(e,t);if(r){if(r.get)return bt(r.get);if(typeof r.value=="function")return bt(r.value)}e=up(e)}function n(){return null}return n}const no=_t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ni=_t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Oi=_t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_p=_t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fi=_t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),bp=_t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ro=_t(["#text"]),ao=_t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ui=_t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),io=_t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xa=_t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),yp=Ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm),wp=Ft(/<%[\w\W]*|[\w\W]*%>/gm),kp=Ft(/\$\{[\w\W]*/gm),Sp=Ft(/^data-[\-\w.\u00B7-\uFFFF]+$/),Cp=Ft(/^aria-[\-\w]+$/),xd=Ft(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),xp=Ft(/^(?:\w+script|data):/i),Ap=Ft(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ad=Ft(/^html$/i),Tp=Ft(/^[a-z][.\w]*(-[.\w]+)+$/i);var lo=Object.freeze({__proto__:null,ARIA_ATTR:Cp,ATTR_WHITESPACE:Ap,CUSTOM_ELEMENT:Tp,DATA_ATTR:Sp,DOCTYPE_NAME:Ad,ERB_EXPR:wp,IS_ALLOWED_URI:xd,IS_SCRIPT_OR_DATA:xp,MUSTACHE_EXPR:yp,TMPLIT_EXPR:kp});const Br={element:1,text:3,progressingInstruction:7,comment:8,document:9},Ip=function(){return typeof window>"u"?null:window},Ep=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(r=n.getAttribute(i));const l="dompurify"+(r?"#"+r:"");try{return t.createPolicy(l,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+l+" could not be created."),null}},so=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Td(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ip();const t=fe=>Td(fe);if(t.version="3.2.4",t.removed=[],!e||!e.document||e.document.nodeType!==Br.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const r=n,i=r.currentScript,{DocumentFragment:l,HTMLTemplateElement:s,Node:o,Element:c,NodeFilter:u,NamedNodeMap:h=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:m}=e,y=c.prototype,v=Ur(y,"cloneNode"),_=Ur(y,"remove"),x=Ur(y,"nextSibling"),S=Ur(y,"childNodes"),k=Ur(y,"parentNode");if(typeof s=="function"){const fe=n.createElement("template");fe.content&&fe.content.ownerDocument&&(n=fe.content.ownerDocument)}let b,A="";const{implementation:w,createNodeIterator:$,createDocumentFragment:C,getElementsByTagName:E}=n,{importNode:I}=r;let P=so();t.isSupported=typeof Sd=="function"&&typeof k=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:U,TMPLIT_EXPR:H,DATA_ATTR:J,ARIA_ATTR:G,IS_SCRIPT_OR_DATA:q,ATTR_WHITESPACE:he,CUSTOM_ELEMENT:Z}=lo;let{IS_ALLOWED_URI:X}=lo,Q=null;const pe=we({},[...no,...Ni,...Oi,...Fi,...ro]);let ge=null;const me=we({},[...ao,...Ui,...io,...xa]);let oe=Object.seal(Cd(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,Je=null,ft=!0,Re=!0,et=!1,Vt=!0,ot=!1,yt=!0,ct=!1,tt=!1,At=!1,mt=!1,nt=!1,ne=!1,ee=!0,$e=!1;const Te="user-content-";let Xe=!0,ze=!1,Me={},Be=null;const Lt=we({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Wn=null;const qn=we({},["audio","video","img","source","image","track"]);let Kn=null;const Er=we({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Tn="http://www.w3.org/1998/Math/MathML",In="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml";let fn=at,En=!1,Lr=null;const fa=we({},[Tn,In,at],Ri);let Jn=we({},["mi","mo","mn","ms","mtext"]),Xn=we({},["annotation-xml"]);const mi=we({},["title","style","font","a","script"]);let Tt=null;const ma=["application/xhtml+xml","text/html"],ve="text/html";let Ne=null,wt=null;const pi=n.createElement("form"),Ln=function(D){return D instanceof RegExp||D instanceof Function},Zn=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(wt&&wt===D)){if((!D||typeof D!="object")&&(D={}),D=Mn(D),Tt=ma.indexOf(D.PARSER_MEDIA_TYPE)===-1?ve:D.PARSER_MEDIA_TYPE,Ne=Tt==="application/xhtml+xml"?Ri:Fa,Q=Ht(D,"ALLOWED_TAGS")?we({},D.ALLOWED_TAGS,Ne):pe,ge=Ht(D,"ALLOWED_ATTR")?we({},D.ALLOWED_ATTR,Ne):me,Lr=Ht(D,"ALLOWED_NAMESPACES")?we({},D.ALLOWED_NAMESPACES,Ri):fa,Kn=Ht(D,"ADD_URI_SAFE_ATTR")?we(Mn(Er),D.ADD_URI_SAFE_ATTR,Ne):Er,Wn=Ht(D,"ADD_DATA_URI_TAGS")?we(Mn(qn),D.ADD_DATA_URI_TAGS,Ne):qn,Be=Ht(D,"FORBID_CONTENTS")?we({},D.FORBID_CONTENTS,Ne):Lt,z=Ht(D,"FORBID_TAGS")?we({},D.FORBID_TAGS,Ne):{},Je=Ht(D,"FORBID_ATTR")?we({},D.FORBID_ATTR,Ne):{},Me=Ht(D,"USE_PROFILES")?D.USE_PROFILES:!1,ft=D.ALLOW_ARIA_ATTR!==!1,Re=D.ALLOW_DATA_ATTR!==!1,et=D.ALLOW_UNKNOWN_PROTOCOLS||!1,Vt=D.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ot=D.SAFE_FOR_TEMPLATES||!1,yt=D.SAFE_FOR_XML!==!1,ct=D.WHOLE_DOCUMENT||!1,mt=D.RETURN_DOM||!1,nt=D.RETURN_DOM_FRAGMENT||!1,ne=D.RETURN_TRUSTED_TYPE||!1,At=D.FORCE_BODY||!1,ee=D.SANITIZE_DOM!==!1,$e=D.SANITIZE_NAMED_PROPS||!1,Xe=D.KEEP_CONTENT!==!1,ze=D.IN_PLACE||!1,X=D.ALLOWED_URI_REGEXP||xd,fn=D.NAMESPACE||at,Jn=D.MATHML_TEXT_INTEGRATION_POINTS||Jn,Xn=D.HTML_INTEGRATION_POINTS||Xn,oe=D.CUSTOM_ELEMENT_HANDLING||{},D.CUSTOM_ELEMENT_HANDLING&&Ln(D.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=D.CUSTOM_ELEMENT_HANDLING.tagNameCheck),D.CUSTOM_ELEMENT_HANDLING&&Ln(D.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=D.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),D.CUSTOM_ELEMENT_HANDLING&&typeof D.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=D.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ot&&(Re=!1),nt&&(mt=!0),Me&&(Q=we({},ro),ge=[],Me.html===!0&&(we(Q,no),we(ge,ao)),Me.svg===!0&&(we(Q,Ni),we(ge,Ui),we(ge,xa)),Me.svgFilters===!0&&(we(Q,Oi),we(ge,Ui),we(ge,xa)),Me.mathMl===!0&&(we(Q,Fi),we(ge,io),we(ge,xa))),D.ADD_TAGS&&(Q===pe&&(Q=Mn(Q)),we(Q,D.ADD_TAGS,Ne)),D.ADD_ATTR&&(ge===me&&(ge=Mn(ge)),we(ge,D.ADD_ATTR,Ne)),D.ADD_URI_SAFE_ATTR&&we(Kn,D.ADD_URI_SAFE_ATTR,Ne),D.FORBID_CONTENTS&&(Be===Lt&&(Be=Mn(Be)),we(Be,D.FORBID_CONTENTS,Ne)),Xe&&(Q["#text"]=!0),ct&&we(Q,["html","head","body"]),Q.table&&(we(Q,["tbody"]),delete z.tbody),D.TRUSTED_TYPES_POLICY){if(typeof D.TRUSTED_TYPES_POLICY.createHTML!="function")throw Fr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof D.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Fr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');b=D.TRUSTED_TYPES_POLICY,A=b.createHTML("")}else b===void 0&&(b=Ep(m,i)),b!==null&&typeof A=="string"&&(A=b.createHTML(""));_t&&_t(D),wt=D}},mn=we({},[...Ni,...Oi,..._p]),Pr=we({},[...Fi,...bp]),yu=function(D){let K=k(D);(!K||!K.tagName)&&(K={namespaceURI:fn,tagName:"template"});const de=Fa(D.tagName),Ue=Fa(K.tagName);return Lr[D.namespaceURI]?D.namespaceURI===In?K.namespaceURI===at?de==="svg":K.namespaceURI===Tn?de==="svg"&&(Ue==="annotation-xml"||Jn[Ue]):!!mn[de]:D.namespaceURI===Tn?K.namespaceURI===at?de==="math":K.namespaceURI===In?de==="math"&&Xn[Ue]:!!Pr[de]:D.namespaceURI===at?K.namespaceURI===In&&!Xn[Ue]||K.namespaceURI===Tn&&!Jn[Ue]?!1:!Pr[de]&&(mi[de]||!mn[de]):!!(Tt==="application/xhtml+xml"&&Lr[D.namespaceURI]):!1},Qt=function(D){Nr(t.removed,{element:D});try{k(D).removeChild(D)}catch{_(D)}},pa=function(D,K){try{Nr(t.removed,{attribute:K.getAttributeNode(D),from:K})}catch{Nr(t.removed,{attribute:null,from:K})}if(K.removeAttribute(D),D==="is")if(mt||nt)try{Qt(K)}catch{}else try{K.setAttribute(D,"")}catch{}},fs=function(D){let K=null,de=null;if(At)D="<remove></remove>"+D;else{const it=to(D,/^[\r\n\t ]+/);de=it&&it[0]}Tt==="application/xhtml+xml"&&fn===at&&(D='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+D+"</body></html>");const Ue=b?b.createHTML(D):D;if(fn===at)try{K=new g().parseFromString(Ue,Tt)}catch{}if(!K||!K.documentElement){K=w.createDocument(fn,"template",null);try{K.documentElement.innerHTML=En?A:Ue}catch{}}const dt=K.body||K.documentElement;return D&&de&&dt.insertBefore(n.createTextNode(de),dt.childNodes[0]||null),fn===at?E.call(K,ct?"html":"body")[0]:ct?K.documentElement:dt},ms=function(D){return $.call(D.ownerDocument||D,D,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},vi=function(D){return D instanceof f&&(typeof D.nodeName!="string"||typeof D.textContent!="string"||typeof D.removeChild!="function"||!(D.attributes instanceof h)||typeof D.removeAttribute!="function"||typeof D.setAttribute!="function"||typeof D.namespaceURI!="string"||typeof D.insertBefore!="function"||typeof D.hasChildNodes!="function")},ps=function(D){return typeof o=="function"&&D instanceof o};function ln(fe,D,K){Ca(fe,de=>{de.call(t,D,K,wt)})}const vs=function(D){let K=null;if(ln(P.beforeSanitizeElements,D,null),vi(D))return Qt(D),!0;const de=Ne(D.nodeName);if(ln(P.uponSanitizeElement,D,{tagName:de,allowedTags:Q}),D.hasChildNodes()&&!ps(D.firstElementChild)&&vt(/<[/\w]/g,D.innerHTML)&&vt(/<[/\w]/g,D.textContent)||D.nodeType===Br.progressingInstruction||yt&&D.nodeType===Br.comment&&vt(/<[/\w]/g,D.data))return Qt(D),!0;if(!Q[de]||z[de]){if(!z[de]&&_s(de)&&(oe.tagNameCheck instanceof RegExp&&vt(oe.tagNameCheck,de)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(de)))return!1;if(Xe&&!Be[de]){const Ue=k(D)||D.parentNode,dt=S(D)||D.childNodes;if(dt&&Ue){const it=dt.length;for(let kt=it-1;kt>=0;--kt){const en=v(dt[kt],!0);en.__removalCount=(D.__removalCount||0)+1,Ue.insertBefore(en,x(D))}}}return Qt(D),!0}return D instanceof c&&!yu(D)||(de==="noscript"||de==="noembed"||de==="noframes")&&vt(/<\/no(script|embed|frames)/i,D.innerHTML)?(Qt(D),!0):(ot&&D.nodeType===Br.text&&(K=D.textContent,Ca([R,U,H],Ue=>{K=Or(K,Ue," ")}),D.textContent!==K&&(Nr(t.removed,{element:D.cloneNode()}),D.textContent=K)),ln(P.afterSanitizeElements,D,null),!1)},$s=function(D,K,de){if(ee&&(K==="id"||K==="name")&&(de in n||de in pi))return!1;if(!(Re&&!Je[K]&&vt(J,K))){if(!(ft&&vt(G,K))){if(!ge[K]||Je[K]){if(!(_s(D)&&(oe.tagNameCheck instanceof RegExp&&vt(oe.tagNameCheck,D)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(D))&&(oe.attributeNameCheck instanceof RegExp&&vt(oe.attributeNameCheck,K)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(K))||K==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&vt(oe.tagNameCheck,de)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(de))))return!1}else if(!Kn[K]){if(!vt(X,Or(de,he,""))){if(!((K==="src"||K==="xlink:href"||K==="href")&&D!=="script"&&mp(de,"data:")===0&&Wn[D])){if(!(et&&!vt(q,Or(de,he,"")))){if(de)return!1}}}}}}return!0},_s=function(D){return D!=="annotation-xml"&&to(D,Z)},bs=function(D){ln(P.beforeSanitizeAttributes,D,null);const{attributes:K}=D;if(!K||vi(D))return;const de={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0};let Ue=K.length;for(;Ue--;){const dt=K[Ue],{name:it,namespaceURI:kt,value:en}=dt,Mr=Ne(it);let pt=it==="value"?en:pp(en);if(de.attrName=Mr,de.attrValue=pt,de.keepAttr=!0,de.forceKeepAttr=void 0,ln(P.uponSanitizeAttribute,D,de),pt=de.attrValue,$e&&(Mr==="id"||Mr==="name")&&(pa(it,D),pt=Te+pt),yt&&vt(/((--!?|])>)|<\/(style|title)/i,pt)){pa(it,D);continue}if(de.forceKeepAttr||(pa(it,D),!de.keepAttr))continue;if(!Vt&&vt(/\/>/i,pt)){pa(it,D);continue}ot&&Ca([R,U,H],ws=>{pt=Or(pt,ws," ")});const ys=Ne(D.nodeName);if($s(ys,Mr,pt)){if(b&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!kt)switch(m.getAttributeType(ys,Mr)){case"TrustedHTML":{pt=b.createHTML(pt);break}case"TrustedScriptURL":{pt=b.createScriptURL(pt);break}}try{kt?D.setAttributeNS(kt,it,pt):D.setAttribute(it,pt),vi(D)?Qt(D):eo(t.removed)}catch{}}}ln(P.afterSanitizeAttributes,D,null)},wu=function fe(D){let K=null;const de=ms(D);for(ln(P.beforeSanitizeShadowDOM,D,null);K=de.nextNode();)ln(P.uponSanitizeShadowNode,K,null),vs(K),bs(K),K.content instanceof l&&fe(K.content);ln(P.afterSanitizeShadowDOM,D,null)};return t.sanitize=function(fe){let D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},K=null,de=null,Ue=null,dt=null;if(En=!fe,En&&(fe="<!-->"),typeof fe!="string"&&!ps(fe))if(typeof fe.toString=="function"){if(fe=fe.toString(),typeof fe!="string")throw Fr("dirty is not a string, aborting")}else throw Fr("toString is not a function");if(!t.isSupported)return fe;if(tt||Zn(D),t.removed=[],typeof fe=="string"&&(ze=!1),ze){if(fe.nodeName){const en=Ne(fe.nodeName);if(!Q[en]||z[en])throw Fr("root node is forbidden and cannot be sanitized in-place")}}else if(fe instanceof o)K=fs("<!---->"),de=K.ownerDocument.importNode(fe,!0),de.nodeType===Br.element&&de.nodeName==="BODY"||de.nodeName==="HTML"?K=de:K.appendChild(de);else{if(!mt&&!ot&&!ct&&fe.indexOf("<")===-1)return b&&ne?b.createHTML(fe):fe;if(K=fs(fe),!K)return mt?null:ne?A:""}K&&At&&Qt(K.firstChild);const it=ms(ze?fe:K);for(;Ue=it.nextNode();)vs(Ue),bs(Ue),Ue.content instanceof l&&wu(Ue.content);if(ze)return fe;if(mt){if(nt)for(dt=C.call(K.ownerDocument);K.firstChild;)dt.appendChild(K.firstChild);else dt=K;return(ge.shadowroot||ge.shadowrootmode)&&(dt=I.call(r,dt,!0)),dt}let kt=ct?K.outerHTML:K.innerHTML;return ct&&Q["!doctype"]&&K.ownerDocument&&K.ownerDocument.doctype&&K.ownerDocument.doctype.name&&vt(Ad,K.ownerDocument.doctype.name)&&(kt="<!DOCTYPE "+K.ownerDocument.doctype.name+`>
`+kt),ot&&Ca([R,U,H],en=>{kt=Or(kt,en," ")}),b&&ne?b.createHTML(kt):kt},t.setConfig=function(){let fe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Zn(fe),tt=!0},t.clearConfig=function(){wt=null,tt=!1},t.isValidAttribute=function(fe,D,K){wt||Zn({});const de=Ne(fe),Ue=Ne(D);return $s(de,Ue,K)},t.addHook=function(fe,D){typeof D=="function"&&Nr(P[fe],D)},t.removeHook=function(fe,D){if(D!==void 0){const K=gp(P[fe],D);return K===-1?void 0:fp(P[fe],K,1)[0]}return eo(P[fe])},t.removeHooks=function(fe){P[fe]=[]},t.removeAllHooks=function(){P=so()},t}var Id=Td();const Lp="_spoiler_fn1ga_1",oo={spoiler:Lp};var Ed=p("<div>");const Pp={name:"spoiler",level:"inline",start(e){var t;return(t=e.match(/~!/))==null?void 0:t.index},tokenizer(e){const t=/^~!([^!~]+)!~/.exec(e);if(t)return{type:"spoiler",raw:t[0],text:t[1]}},renderer(e){return`<details class="${oo.spoiler}"><summary><span class="${oo.text}">${xe.parseInline(e.text)}</span></summary></details>`}};xe.use({extensions:[Pp]});function es(e){if(!e.children)return null;const t=xe(e.children),n=Id.sanitize(t),r=(()=>{var i=Ed();return i.innerHTML=n,i})();return a(Y,{get each(){return r.childNodes},children:i=>i})}const Mp=/([^\n])\n([^\n])/g,Dp=(e,t,n)=>t+"<br>"+n;function Ja(e){const t=N(()=>{if(!e.text)return[];const n=e.singleLineBreaks?e.text.replace(Mp,Dp):e.text,r=xe(n),i=Id.sanitize(r);return[...(()=>{var s=Ed();return s.innerHTML=i,s})().childNodes]});return a(Y,{get each(){return t()},children:n=>n})}var Rp=p("<time class=cp-created-at>");function Nn(e){const[t,n]=O(Math.max(1,Math.abs(new Date/1e3-e.createdAt)));let r=null;return t()<60?r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3):t()<3600&&(r=setInterval(()=>n(Math.max(1,Math.abs(new Date/1e3-e.createdAt))),1e3*60)),Ye(()=>clearInterval(r)),(()=>{var i=Rp();return d(i,a(j,{get children(){return[a(M,{get when(){return Math.floor(t()/3600/24/365.25)},children:l=>[l," years",N(()=>Oe(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/30)},children:l=>[l," month",N(()=>Oe(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24/7)},children:l=>[l," week",N(()=>Oe(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600/24)},children:l=>[l," day",N(()=>Oe(l()))," ago "]}),a(M,{get when(){return Math.floor(t()/3600%24)},children:l=>[l," hour",N(()=>Oe(l()))," ago"]}),a(M,{get when(){return Math.floor(t()%3600/60)},children:l=>[l," minute",N(()=>Oe(l()))," ago "]}),a(M,{get when(){return Math.floor(t()%3600%60)},children:l=>[l," second",N(()=>Oe(l()))," ago "]})]}})),L(l=>{var s=new Date(e.createdAt*1e3).toISOString(),o=new Date(e.createdAt*1e3).toLocaleString();return s!==l.e&&V(i,"datetime",l.e=s),o!==l.t&&V(i,"title",l.t=o),l},{e:void 0,t:void 0}),i})()}var Np=p("<div>"),co=p("<img class=profile alt=Profile>"),Op=p("<div class=header>"),Fp=p("<div class=content>"),Up=p("<div class=footer>"),Bp=p("<img class=cover alt=Cover>"),uo=p("<p> "),Vp=p("<div class=main>"),Gp=p("<div class=right>"),Hp=p("<ol>"),Yp=p("<button class=cp-activity-like>Like "),jp=p('<li><img alt="Profile picture">');function ts(e){const t=Fe({hideProfile:!1,small:!1,wrapper:n=>(()=>{var r=Np();return Et(r,n,!1,!1),r})()},e);return F(typeof t.hideProfile=="boolean","hideProfile needs to be boolean"),F(typeof t.small=="boolean","small needs to be boolean"),a(j,{get children(){return[a(M,{get when(){return t.activity.type==="TEXT"},get children(){return a(ki,{get component(){return t.wrapper},class:"activity-card-text",get children(){return[(()=>{var n=Op();return d(n,a(B,{get href(){return"/user/"+t.activity.user.name},class:"activity-profile-header",get children(){return[(()=>{var r=co();return L(()=>V(r,"src",t.activity.user.avatar.large)),r})(),N(()=>t.activity.user.name)]}}),null),d(n,a(Nn,{get createdAt(){return t.activity.createdAt}}),null),n})(),(()=>{var n=Fp();return d(n,a(es,{get children(){return t.activity.text}})),n})(),(()=>{var n=Up();return d(n,a(ho,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}})),n})()]}})}}),a(M,{get when(){return t.activity.type==="ANIME_LIST"||t.activity.type==="MANGA_LIST"},get children(){return a(ki,{get component(){return t.wrapper},class:"activity-card-media",get classList(){return{small:t.small}},get children(){return[a(B,{get href(){return Ve(t.activity.media)},get children(){var n=Bp();return L(()=>V(n,"src",t.activity.media.coverImage.large)),n}}),(()=>{var n=Vp();return d(n,a(j,{get children(){return[a(M,{get when(){return t.hideProfile===!0},get children(){var r=uo(),i=r.firstChild;return d(r,()=>qe(t.activity.status),i),d(r,a(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),r}}),a(M,{get when(){return t.hideProfile===!1},get children(){return[a(B,{get href(){return"/user/"+t.activity.user.name},get children(){return t.activity.user.name}}),(()=>{var r=uo(),i=r.firstChild;return d(r,()=>qe(t.activity.status),i),d(r,a(T,{get when(){return t.activity.status!=="rewatched"&&t.activity.status!=="reread"&&t.activity.progress},get children(){return[N(()=>t.activity.progress)," of "]}}),null),d(r,a(B,{get href(){return Ve(t.activity.media)},get children(){return t.activity.media.title.userPreferred}}),null),d(r,a(B,{get href(){return"/user/"+t.activity.user.name},get children(){var l=co();return L(()=>V(l,"src",t.activity.user.avatar.large)),l}}),null),r})()]}})]}})),n})(),(()=>{var n=Gp();return d(n,a(Nn,{get createdAt(){return t.activity.createdAt}}),null),d(n,a(ho,{get mutateCache(){return t.mutateCache},get activity(){return t.activity}}),null),n})()]}})}}),a(M,{get when(){return t.activity.type==="MESSAGE"},get children(){return a(ki,{get component(){return t.wrapper},children:"message"})}})]}})}function ho(e){const[t,n]=O(e.activity.isLiked),[r,i]=O(e.activity.likeCount),{accessToken:l}=ie(),[s,o]=O(void 0),[c]=ae.anilist.listOfActivityLikes(e.activity.id,l,s);let u=e.activity.isLiked;const h=ua(async(f,g,m)=>{if(m!==u){const y=await ae.anilist.toggleActivityLike(f,{id:g});F(!y.fromCache,"Mutation should never be cached"),y.status===200&&(e.activity.likeCount=y.data.data.ToggleLike.likeCount,e.activity.isLiked=y.data.data.ToggleLike.isLiked,e.mutateCache(v=>v),u===y.data.data.ToggleLike.isLiked&&(i(y.data.data.ToggleLike.likeCount),n(y.data.data.ToggleLike.isLiked)),u=m)}},500);return(()=>{var f=Yp();return f.firstChild,f.$$click=()=>{n(g=>{F(typeof g=="boolean");const m=+!g*2-1;return i(y=>y+m),h(l(),e.activity.id,!g),!g})},f.$$mousemove=()=>r()&&o(!0),d(f,r,null),d(f,a(T,{get when(){var g;return N(()=>!!s())()&&((g=c())==null?void 0:g.data.likes.length)},get children(){return a(Ct,{tipPosition:"left",get children(){var g=Hp();return d(g,a(Y,{get each(){return c().data.likes},children:m=>(()=>{var y=jp(),v=y.firstChild;return d(y,()=>m.name,null),L(()=>V(v,"src",m.avatar.large)),y})()})),g}})}}),null),L(()=>f.classList.toggle("active",!!t())),f})()}_e(["mousemove","click"]);var zp=p('<ol data-k-82ba8cab class="flex-space-between activity">'),Wp=p("<button data-k-82ba8cab>Refresh"),qp=p("<li data-k-82ba8cab>");function Kp(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),i=Pe(xc,t,e.variables,n),[l]=Ul(e.isDebug,i);let s=0;const[o,c]=O(!1),[u,h]=O(!0),f=cd(h),g=new Set,m=Sn(nn,b=>!l.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var w,$;const b=Ce(o),A=Ce(u);if(x.has((w=e.cache.at(-1))==null?void 0:w.id)&&b)return Math.max(Math.floor(e.cache.length/25)+1,s+1);if(x.has(($=e.cache[0])==null?void 0:$.id)&&A)return 1;if(b){const C=[...x.difference(g)].sort((P,R)=>R-P);if(!C.length)return;const E=ra(C,.5),I=id(e.cache,P=>P.id-E);return I==-1?void 0:Math.ceil((I+1)/25)}}let _=0;W(se(l,b=>{var C,E,I,P,R;if(!((C=b==null?void 0:b.data)!=null&&C.activities.length))return;b.data.activities.forEach(U=>{g.add(U.id)});const A=((E=b.data.activities[0])==null?void 0:E.createdAt)||0,w=((I=ra(b.data.activities,.5))==null?void 0:I.createdAt)||A,$=Math.min(1e3*60*5,Math.max((A-w)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f($,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/25&&(((P=b.data.activities.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?_+=1:_=0,_>2&&(h(!0),c(!1),s=0,_=0)),e.updateCache(b),y()}));const x=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.id);F(Number.isInteger(w)),A.isIntersecting?x.add(w):x.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return Ye(()=>k.disconnect()),[a(T,{get when(){return N(()=>!!l.loading)()&&n()===1},get children(){return a(Hn,{class:"refresh",get children(){return a(Ct,{tipPosition:"bottom",get children(){return a(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh activities",children:"Loading activities"})}})}})}}),(()=>{var b=zp();return d(b,a(Y,{get each(){return e.cache},children:A=>{let w;return xn(()=>k.observe(w)),a(ts,{activity:A,get mutateCache(){return e.mutateCache},wrapper:$=>(()=>{var C=qp(),E=w;return typeof E=="function"?ue(E,C):w=C,Et(C,$,!1,!1),L(()=>V(C,"data-id",A.id)),C})()})}})),L(()=>b.classList.toggle("loading",!!(l.loading&&n()===1))),b})(),a(j,{get children(){return[a(M,{get when(){return l.loading&&n()>s&&e.cache.length},get children(){return a(Hn,{class:"new",get children(){return a(Ct,{tipPosition:"bottom",children:"Loading activities"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh activity feed to load more",(()=>{var b=Wp();return b.$$click=()=>r(1),b})()]}})]}})]}_e(["click"]);var Jp=p("<button>debug: ");function Xp(e){const{accessToken:t}=ie(),n=Pe(rg,t,e.variables),[r,{mutateCache:i,mutateBoth:l}]=Qe(n),s=u=>{var h,f;(f=(h=u==null?void 0:u.data)==null?void 0:h.activities)!=null&&f.length&&l(g=>{var w,$,C;if(!((w=g==null?void 0:g.data)!=null&&w.length))return g.data=[u.data.activities],g;const m=u.data.activities.at(-1).id,y=cr(g.data[0],E=>E.id-m),v=(($=g.data[0][y])==null?void 0:$.id)===m;if(u.data.pageInfo.currentPage===1)return v?(g.data[0].splice(0,y+1,...u.data.activities),g):(g.data.unshift(u.data.activities),g.data.length=Math.min(g.data.length,5),g);const _=u.data.activities[0].id,x=cr(g.data[0],E=>E.id-_);if(x===0&&g.data[0][x].id!==_||(g.data[0].splice(x,y-x+v,...u.data.activities),v||g.data.length===1))return g;const k=cr(g.data[1],E=>E.id-m);if(((C=g.data[1][k])==null?void 0:C.id)!==m)return g;const[A]=g.data.splice(1,1);return A.splice(0,k+1),g.data[0].push(...A),g})},[o,c]=Gl();return a(T,{get when(){return!r.loading},get children(){return[a(T,{get when(){return Cr},get children(){var u=Jp();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),a(Kp,Fe({get cache(){var u,h;return((h=(u=r())==null?void 0:u.data)==null?void 0:h[0])||[]},isDebug:o,updateCache:s,mutateCache:i},e))]}})}_e(["click"]);var Zp=p("<div><h2>Activity</h2><div><button>All</button><button>Text Status</button><button>List Progress</button></div><button>Following</button><button>Global");function Qp(){const[e,t]=Vl("LOB_ACTIVITY_TYPE",void 0),[n,r]=Us("LOB_ACTIVITY_IS_FOLLOWING",!0),[i,l]=Us("LOB_ACTIVITY_HAS_REPLIES",void 0),[s,o]=of("LOB_ACTIVITY_QUERY",{isFollowing:!0});return W(()=>{o(c=>{const u={...c,activityType:e(),isFollowing:n(),hasReplies:i()};for(const h of Object.keys(u))if(u[h]!==c[h])return u;return c})}),(()=>{var c=Zp(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.nextSibling,y=h.nextSibling,v=y.nextSibling;return f.$$click=()=>t(void 0),g.$$click=()=>t("TEXT"),m.$$click=()=>t("MEDIA_LIST"),y.$$click=()=>{He(()=>{r(!0),l(void 0)})},v.$$click=()=>{He(()=>{r(!1),l(!0)})},d(c,a(T,{get when(){return s()},keyed:!0,get children(){return a(Xp,{get variables(){return s()}})}}),null),c})()}_e(["click"]);var ev=p("<div data-k-9b8ac37b class=pg-home>");function tv(){const{accessToken:e,authUserData:t}=ie();return document.title="Home - LOB",a(T,{get when(){return t()},get children(){var n=ev();return d(n,a(Cm,{get token(){return e()},get userId(){return t().data.id}}),null),d(n,a(Qp,{get token(){return e()}}),null),n}})}function nv(){const t=Jt().hash.substring(1),r=new URLSearchParams(t).get("access_token");if(document.title="Authentication - LOB",(r==null?void 0:r.length)>50){const{setAccessToken:i}=ie();i(r)}return a(on,{href:"/"})}function rv(e){const[t,{mutate:n}]=Eu(async()=>new Promise(u=>{const h=()=>u(null),f=Ge.user(h);f.onsuccess=g=>{const m=g.target.result,v=Ge.store(m,"data","readonly",h).get("access_token");v.onsuccess=_=>u(_.target.result||null),v.onerror=h}})),[r,{mutate:i}]=ae.anilist.getAuthUserData(()=>t()??void 0),l=Ge.user();l.onsuccess=u=>{const h=u.target.result,g=Ge.store(h,"data","readonly").get("auth_profile_info");g.onsuccess=m=>{m.target.result!=null&&i(m.target.result)}};const s=u=>{const h=Ge.user();h.onsuccess=f=>{const g=f.target.result,y=Ge.store(g,"data","readwrite").put(u,"access_token");y.onsuccess=()=>n(u)}},o=()=>{const u=Ge.user();u.onsuccess=h=>{const f=h.target.result,g=Ge.store(f,"data","readwrite");g.delete("access_token"),g.delete("auth_profile_info"),n(null),i(null)}},c=N(()=>{var u,h;return((h=(u=r())==null?void 0:u.data)==null?void 0:h.id)===5137809});return a(fc.Provider,{value:{accessToken:t,setAccessToken:s,authUserData:r,logoutUser:o,isDeveloper:c},get children(){return a(T,{get when(){return!t.loading},get children(){return e.children}})}})}function pn(e){const[t,n]=O(window.matchMedia(e).matches),r=window.matchMedia(e),i=l=>n(l.matches);return r.addEventListener("change",i),Ye(()=>r.removeEventListener("change",i)),t}function av(e){const t=pn("(max-width: 30em)"),n=pn("(max-width: 48em)"),r=pn("(max-width: 64em)"),i=pn("(max-width: 80em)"),l=pn("(max-width: 90em)"),s=pn("(max-width: 160em)"),o=pn("(hover: none) and (pointer: coarse)"),c=pn("(display-mode: standalone)");return a(mc.Provider,{value:{isMobilSmall:t,isMobilLarge:n,isTablet:r,isLaptop:i,isDesktop:l,isDesktopLarge:s,isTouch:o,isPWA:c},get children(){return e.children}})}var iv=p("<div>Intersection");function gn(e){let t=iv();xn(()=>{i.observe(t)}),Ye(()=>{i.disconnect()});const n={rootMargin:e.rootMargin||"800px"},r=l=>{l[0].isIntersecting!==!1&&(i.unobserve(l[0].target),e.onIntersection())},i=new IntersectionObserver(r,n);return a(j,{fallback:t,get children(){return[a(M,{get when(){return e.fetchResponse()},get children(){return e.children(e.fetchResponse.loading&&e.loading)}}),a(M,{get when(){return e.fetchResponse.loading},get children(){return e.loadingElement||"loading..."}})]}})}var lv=p("<div data-k-d1a22b47 class=multi-input-footer><button data-k-d1a22b47>Cancel</button><button data-k-d1a22b47>Ok"),sv=p("<form data-k-d1a22b47 class=multi-input><button data-k-d1a22b47 class=open-multi-input>Rating</button><dialog data-k-d1a22b47><div data-k-d1a22b47 class=wrapper><div data-k-d1a22b47 class=scroll-wrapper>"),ov=p("<li data-k-d1a22b47><label data-k-d1a22b47>G - All ages <input data-k-d1a22b47 type=checkbox name=rating value=g>"),cv=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG - Children <input data-k-d1a22b47 type=checkbox name=rating value=pg>"),dv=p("<li data-k-d1a22b47><label data-k-d1a22b47>PG-13 - Teen 13 or older <input data-k-d1a22b47 type=checkbox name=rating value=pg13>"),uv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R - 17+ (violence & profanity) <input data-k-d1a22b47 type=checkbox name=rating value=r17>"),hv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - Mild nudity <input data-k-d1a22b47 type=checkbox name=rating value=r>"),gv=p("<li data-k-d1a22b47><label data-k-d1a22b47>R+ - (violence, profanity & mild nudity)<input data-k-d1a22b47 type=checkbox name=rating value=r>"),fv=p("<ol data-k-d1a22b47><li data-k-d1a22b47><label data-k-d1a22b47>Any rating <input data-k-d1a22b47 type=checkbox name=rating value=any></label></li><li data-k-d1a22b47><label data-k-d1a22b47>Rx - Hentai <input data-k-d1a22b47 type=checkbox name=rating value=rx>");function mv(e){const[t,n]=Ae(),{isTouch:r}=Xt();let i=!1,l,s,o,c,u,h;function f(){s.close(),i=!1,c==null||c.abort(),n({preventFetch:void 0})}function g(){o.classList.toggle("has-scroll-bar",o.scrollHeight-o.clientHeight>0)}return W(se(r,f)),(()=>{var y=sv(),v=y.firstChild,_=v.nextSibling,x=_.firstChild,S=x.firstChild;y.$$input=$=>{const C=$.currentTarget.querySelectorAll("input").length,I=new FormData($.currentTarget).getAll("rating");$.target.value==="any"?$.target.checked?n({rating:"any"}):n({rating:void 0}):$.target.checked&&C-1===I.length?n({rating:"any"}):n({rating:I.filter(P=>P!=="any")})},y.addEventListener("submit",$=>{$.preventDefault()});var k=h;typeof k=="function"?ue(k,y):h=y,v.$$click=()=>{if(i)f();else{c=new AbortController;const $=c.signal;l=t.rating,r()?(s.showModal(),n({preventFetch:!0}),g(),window.addEventListener("resize",g,{signal:$}),s.addEventListener("touchstart",C=>{C.target===s&&s.addEventListener("touchend",E=>{E.target===s&&(E.preventDefault(),f())},{once:!0,signal:$})},{signal:$})):(window.addEventListener("mousedown",C=>C.target!==u&&C.target.closest("dialog")!==s&&f(),{signal:$}),s.show()),i=!0}};var b=u;typeof b=="function"?ue(b,v):u=v,_.addEventListener("close",f);var A=s;typeof A=="function"?ue(A,_):s=_;var w=o;return typeof w=="function"?ue(w,S):o=S,d(S,a(m,{})),d(x,a(T,{get when(){return r()},get children(){var $=lv(),C=$.firstChild,E=C.nextSibling;return C.$$click=()=>{f(),n({rating:l})},E.$$click=f,$}}),null),L(()=>y.classList.toggle("mobile",!!r())),y})();function m(){const[y]=Ae(),[v,_]=je({});return W(()=>{Array.isArray(y.rating)?_(Wt(y.rating.reduce((x,S)=>({...x,[S]:!0}),{}))):_(Wt({[y.rating]:!0}))}),(()=>{var x=fv(),S=x.firstChild,k=S.firstChild,b=k.firstChild,A=b.nextSibling,w=S.nextSibling,$=w.firstChild,C=$.firstChild,E=C.nextSibling;return d(x,a(T,{get when(){return y.malSearch==="true"},get children(){return[(()=>{var I=ov(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.g),I})(),(()=>{var I=cv(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.pg),I})(),(()=>{var I=dv(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.pg13),I})(),(()=>{var I=uv(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.r17),I})(),(()=>{var I=hv(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.r),I})()]}}),w),d(x,a(T,{get when(){return y.malSearch!=="true"},get children(){var I=gv(),P=I.firstChild,R=P.firstChild,U=R.nextSibling;return L(()=>U.checked=v.any||v.r),I}}),w),L(()=>A.checked=v.any),L(()=>E.checked=v.any||v.rx),x})()}}_e(["input","click"]);var pv=p('<label data-k-48bbc0c0 class=switch><input data-k-48bbc0c0 type=checkbox><span data-k-48bbc0c0 class="slider round">');function vv(e){return(()=>{var t=pv(),n=t.firstChild;return Et(n,e,!1,!1),t})()}var $v=p("<div data-k-93c05ee9 class=multi-input-footer><button data-k-93c05ee9>Cancel</button><button data-k-93c05ee9>Ok"),_v=p('<form data-k-93c05ee9 class=multi-input><button data-k-93c05ee9 class=open-multi-input>Genres</button><dialog data-k-93c05ee9><div data-k-93c05ee9 class=wrapper><div data-k-93c05ee9 class=multi-input-header><input data-k-93c05ee9 type=search placeholder="Filter genres"></div><div data-k-93c05ee9 class=scroll-wrapper>'),go=p("<h3 data-k-93c05ee9>Genres"),Aa=p("<ol data-k-93c05ee9>"),bv=p("<h3 data-k-93c05ee9>Tags"),yv=p("<h3 data-k-93c05ee9>Themes"),Ta=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=excludeGenre>"),Ia=p("<li data-k-93c05ee9><label data-k-93c05ee9>"),Ea=p("<input data-k-93c05ee9 type=checkbox data-steps=2 name=genre>");function wv(e){const[t,n]=Ae(),{isTouch:r}=Xt(),[i,l]=O("");let s=!1,o,c,u,h,f,g;function m(){c.close(),s=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(se(r,m)),(()=>{var _=_v(),x=_.firstChild,S=x.nextSibling,k=S.firstChild,b=k.firstChild,A=b.firstChild,w=b.nextSibling;_.$$input=P=>{const R=P.target.closest("li"),U=P.target.name;!P.target.checked&&!R.classList.contains("exclude")?(R.classList.add("exclude"),P.target.checked=!0,P.target.name="excludeGenre"):R.classList.contains("exclude")&&R.classList.remove("exclude");const H=new FormData(P.currentTarget);R.classList.contains("exclude")?n({[U]:H.getAll(U),[P.target.name]:H.getAll(P.target.name)}):n({[P.target.name]:H.getAll(P.target.name)})},_.addEventListener("submit",P=>{P.preventDefault()});var $=g;typeof $=="function"?ue($,_):g=_,x.$$click=()=>{if(s)m();else{h=new AbortController;const P=h.signal;o=t.genre,r()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),s=!0}};var C=f;typeof C=="function"?ue(C,x):f=x,S.addEventListener("close",m);var E=c;typeof E=="function"?ue(E,S):c=S,A.$$input=P=>{P.stopPropagation(),l(P.target.value.toLowerCase())};var I=u;return typeof I=="function"?ue(I,w):u=w,d(w,a(v,{})),d(k,a(T,{get when(){return r()},get children(){var P=$v(),R=P.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({genre:o})},U.$$click=m,P}}),null),L(()=>_.classList.toggle("mobile",!!r())),_})();function v(){const[_]=Ae(),[x,S]=je({include:{},exclude:{}});return W(()=>{S(Wt({include:qt(_.genre,{}),exclude:qt(_.excludeGenre,{})}))}),a(j,{get children(){return[a(M,{get when(){return e.engine==="ani"},get children(){return a(T,{get when(){return e.aniGenres()},fallback:"Loading...",get children(){return[go(),(()=>{var k=Aa();return d(k,a(Y,{get each(){return e.aniGenres().data.genres},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,b,null),d(w,a(T,{get when(){return x.exclude[b]},get fallback(){return(()=>{var $=Ea();return $.value=b,L(()=>$.checked=x.include[b]),$})()},get children(){var $=Ta();return $.value=b,L(()=>$.checked=x.exclude[b]),$}}),null),L($=>{var C=!!x.exclude[b],E=!b.toLowerCase().includes(i());return C!==$.e&&A.classList.toggle("exclude",$.e=C),E!==$.t&&A.classList.toggle("hidden",$.t=E),$},{e:void 0,t:void 0}),A})()})),k})(),bv(),(()=>{var k=Aa();return d(k,a(Y,{get each(){return e.aniGenres().data.tags},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return x.exclude[b.name]},get fallback(){return(()=>{var $=Ea();return L(()=>$.value=b.name),L(()=>$.checked=x.include[b.name]),$})()},get children(){var $=Ta();return L(()=>$.value=b.name),L(()=>$.checked=x.exclude[b.name]),$}}),null),L($=>{var C=!!x.exclude[b.name],E=!b.name.toLowerCase().includes(i());return C!==$.e&&A.classList.toggle("exclude",$.e=C),E!==$.t&&A.classList.toggle("hidden",$.t=E),$},{e:void 0,t:void 0}),A})()})),k})()]}})}}),a(M,{get when(){return e.engine==="mal"},get children(){return a(T,{get when(){return e.malGenres()},fallback:"Loading...",get children(){return[go(),(()=>{var k=Aa();return d(k,a(Y,{get each(){return e.malGenres().data.genres},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return x.exclude[b.name]},get fallback(){return(()=>{var $=Ea();return L(()=>$.value=b.name),L(()=>$.checked=x.include[b.name]),$})()},get children(){var $=Ta();return L(()=>$.value=b.name),L(()=>$.checked=x.exclude[b.name]),$}}),null),L($=>{var C=!!x.exclude[b.name],E=!b.name.toLowerCase().includes(i());return C!==$.e&&A.classList.toggle("exclude",$.e=C),E!==$.t&&A.classList.toggle("hidden",$.t=E),$},{e:void 0,t:void 0}),A})()})),k})(),yv(),(()=>{var k=Aa();return d(k,a(Y,{get each(){return e.malGenres().data.themes},children:b=>(()=>{var A=Ia(),w=A.firstChild;return d(w,()=>b.name,null),d(w,a(T,{get when(){return x.exclude[b.name]},get fallback(){return(()=>{var $=Ea();return L(()=>$.value=b.name),L(()=>$.checked=x.include[b.name]),$})()},get children(){var $=Ta();return L(()=>$.value=b.name),L(()=>$.checked=x.exclude[b.name]),$}}),null),L($=>{var C=!!x.exclude[b.name],E=!b.name.toLowerCase().includes(i());return C!==$.e&&A.classList.toggle("exclude",$.e=C),E!==$.t&&A.classList.toggle("hidden",$.t=E),$},{e:void 0,t:void 0}),A})()})),k})()]}})}})]}})}}_e(["input","click"]);var kv=p('<div data-k-4bf0065c class=cp-two-headed-range><div data-k-4bf0065c class="point start"></div><div data-k-4bf0065c class="point end"></div><div data-k-4bf0065c class=progress-bar>');function Ld(e){F(e.onChange,"onChange is missing");const t=Fe({min:0,max:100,separation:1},e),n=Fe({value:[t.min,t.max]},t);let r,i;W(se(()=>n.minValue,h=>{c(r,h||n.min)})),W(se(()=>n.maxValue,h=>{c(i,h||n.max)}));let l;xn(()=>{o.observe(l)}),Ye(()=>{o.disconnect()});const s=h=>{h[0].isIntersecting===!0&&(c(i,n.maxValue),c(r,n.minValue))},o=new IntersectionObserver(s);return(()=>{var h=kv(),f=h.firstChild,g=f.nextSibling;h.$$mousedown=u,h.$$touchstart=u;var m=l;typeof m=="function"?ue(m,h):l=h;var y=r;typeof y=="function"?ue(y,f):r=f,f.style.setProperty("--percentage","0%");var v=i;return typeof v=="function"?ue(v,g):i=g,g.style.setProperty("--percentage","100%"),L(_=>{var x=n.min,S=n.max;return x!==_.e&&((_.e=x)!=null?f.style.setProperty("--value",x):f.style.removeProperty("--value")),S!==_.t&&((_.t=S)!=null?g.style.setProperty("--value",S):g.style.removeProperty("--value")),_},{e:void 0,t:void 0}),h})();function c(h,f){const g=h.closest(".cp-two-headed-range"),m=g.querySelector(".point.start"),y=g.querySelector(".point.end"),v=m.getBoundingClientRect(),_=y.getBoundingClientRect(),x=g.getBoundingClientRect();if(h===m){const S=_.left-x.left-v.width/2,b=Math.min(1,Math.max(0,(f-n.min)/(parseInt(y.style.getPropertyValue("--value"))-n.min)))*S/x.width;g.querySelector(".progress-bar").style.left=`${(b*100).toFixed(1)}%`,g.querySelector(".progress-bar").style.width=`${(parseInt(y.style.getPropertyValue("--percentage"))-b*100).toFixed(1)}%`,h.style.setProperty("--percentage",(b*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}else if(h===y){const S=x.width-(v.right-x.left)-_.width/2,k=parseInt(m.style.getPropertyValue("--value")),b=Math.min(1,Math.max(0,(f-k)/(n.max-k)))*S,A=(v.right-x.left+_.width/2+b)/x.width;g.querySelector(".progress-bar").style.width=`${(A*100-parseInt(m.style.getPropertyValue("--percentage"))).toFixed(1)}%`,h.style.setProperty("--percentage",(A*100||0).toFixed(1)+"%"),h.style.setProperty("--value",f)}}function u(h){h.preventDefault();const f=new AbortController,g=f.signal,m=h.target.closest(".cp-two-headed-range"),y=h.clientX||h.touches[0].clientX,v=m.querySelector(".point.start").getBoundingClientRect(),_=m.querySelector(".point.end").getBoundingClientRect(),x=Math.min(Math.abs(y-v.left),Math.abs(y-v.right)),S=Math.min(Math.abs(y-_.left),Math.abs(y-_.right));let k,b,A=0;h.target.classList.contains("start")?(k=h.target,b=m.querySelector(".point.end")):h.target.classList.contains("end")?(k=h.target,b=m.querySelector(".point.start")):x<S?(k=m.querySelector(".point.start"),b=m.querySelector(".point.end")):(k=m.querySelector(".point.end"),b=m.querySelector(".point.start"));const w=k.classList.contains("end"),$=m.getBoundingClientRect(),C=k.getBoundingClientRect(),E=b.getBoundingClientRect();let I,P=$.left;w?(I=$.width-(E.right-$.left)-E.width/2,P=E.right+E.width/2):I=E.left-$.left-C.width/2,h.target===k&&(A=y-(C.left+C.width/2)),R(y);function R(U){const H=Math.max(Math.min(1,(U-A-P)/I),0),J=w?parseInt(b.style.getPropertyValue("--value"))+n.separation:n.min,G=w?n.max:parseInt(b.style.getPropertyValue("--value"))-n.separation,q=w?($.width-I)/$.width:0,he=w?1:I/$.width,Z=Math.max(Math.min(he,(U-A-$.left)/$.width),q);w?m.querySelector(".progress-bar").style.width=`${(Z*100-parseInt(b.style.getPropertyValue("--percentage"))).toFixed(1)}%`:(m.querySelector(".progress-bar").style.left=`${(Z*100).toFixed(1)}%`,m.querySelector(".progress-bar").style.width=`${(parseInt(b.style.getPropertyValue("--percentage"))-Z*100).toFixed(1)}%`),k.style.setProperty("--percentage",(Z*100).toFixed(1)+"%"),k.style.setProperty("--value",J+Math.round((G-J)*H))}k.classList.add("active"),g.addEventListener("abort",()=>{k.classList.remove("active"),w?n.onChange([parseInt(b.style.getPropertyValue("--value")),parseInt(k.style.getPropertyValue("--value"))]):n.onChange([parseInt(k.style.getPropertyValue("--value")),parseInt(b.style.getPropertyValue("--value"))])}),window.addEventListener("mousemove",U=>{U.preventDefault(),U.buttons===1?R(U.clientX):f.abort()},{signal:g}),window.addEventListener("touchmove",U=>{U.preventDefault();const[{clientX:H}]=U.touches;R(H)},{signal:g}),window.addEventListener("touchend",()=>{f.abort()},{signal:g,once:!0})}}_e(["touchstart","mousedown"]);const vn=Na(),Bi={trending:{order:"trending"},popular:{order:"popularity"},novel:{format:"lightnovel"},finished:{order:"end_date_filtered",status:"complete"},new:{order:"id"},"top-100":{order:"score"},"finished-manga":{order:"end_date_filtered",status:"complete",format:"manga"},"finished-novel":{order:"end_date_filtered",status:"complete",format:"lightnovel"},ani:{tba:{season:"tba",status:"upcoming"},anime:{"this-season":{year:vn.seasonYear,season:vn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:vn.nextYear,season:vn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{country:"KR"}},mal:{tba:{status:"upcoming"},anime:{"this-season":{year:vn.seasonYear,season:vn.season.toLowerCase(),order:"title_romaji",sort:"ASC"},"next-season":{year:vn.nextYear,season:vn.nextSeason.toLowerCase(),order:"title_romaji",sort:"ASC"}},manhwa:{format:"manhwa"}}};function Sv(e,...t){return t.some(n=>n in e&&(e[n]==null||e[n].length===0))}function hi(){const e=te(),t=Jt(),n=un(),[r,i]=Ae();return[l=>Av(r,e,l),(l,s)=>Tv(r,i,e,n,t,l,s)]}function Cv(){const e=te(),t=Jt(),n=un(),[r]=Ae();return i=>Iv(r,e,n,t,i)}function xv(){const e=te(),t=Jt(),n=un(),[r]=Ae();return()=>n(`/search/${e.type}${rs(r,e,t,{})}`,{scroll:!1})}function Av(e,t,n){return e[n]||ns(e,t)[n]}function ns(e,t,n){return fl(e.malSearch==="true",t.header,t.type,n)||{}}function fl(e,t,n,r){var s,o,c;const i=r||t;if(i!=null&&i.match(/^(summer|fall|spring|winter)-\d+$/)){const[u,h]=i.split("-");return{year:h,season:u,order:"title_romaji",sort:"ASC"}}const l=e?"mal":"ani";return Bi[i]||((s=Bi[l])==null?void 0:s[i])||((c=(o=Bi[l])==null?void 0:o[n])==null?void 0:c[i])}function Tv(e,t,n,r,i,l,s){var u;const o=ns(e,n),c=(...h)=>rs(e,n,i,...h);if(Sv(l,...Object.keys(o)))return r(`/search/${n.type}${c(l)}`,{scroll:!1,...s});if((u=n.header)!=null&&u.match(/^(summer|fall|spring|winter)-\d+$/)){const{season:h=o.season,year:f=o.year,...g}=l,m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}if(n.header==="this-season"||n.header==="next-season"){const{season:h=e.season,year:f=e.year,...g}=l;if(h!=null&&f!=null){const m=`${h}-${f}`;return r(`/search/${n.type}/${m}${c(g,!1,m)}`,{scroll:!1,...s})}}t(l,s)}function Iv(e,t,n,r,i){const l=fl(e.malSearch==="true",t.header,t.type),s=fl(e.malSearch==="true",t.header,i);return!l||s?n("/"+t.mode+"/"+i+(t.header?"/"+t.header:"")+r.search):n(`/search/${i}${rs(e,t,r,{},!0)}`,{scroll:!1})}function rs(e,t,n,r,i=!0,l){const s=ns(e,t,l),o=Object.fromEntries(new URLSearchParams(n.search)),c=[...new URLSearchParams(n.search)].filter(([g,m])=>!(g in r||!i&&g in s&&s[g]==m)).map(([g,m])=>`${g}=${m}`),u=i===!1?[]:Object.entries(s).filter(([g])=>!(g in r||g in o)).map(([g,m])=>`${g}=${m}`),h=Object.entries(r).filter(([,g])=>Ev(g)).map(([g,m])=>Array.isArray(m)?m.map(y=>`${g}=${y}`).join("&"):`${g}=${m}`),f=u.concat(c).concat(h).join("&");return f.length?"?"+f:""}function Ev(e){return e!=null&&e.length!=0}var Lv=p("<button data-k-53d51b9e>Cancel"),Pv=p("<button data-k-53d51b9e>Ok"),Mv=p('<form data-k-53d51b9e class=multi-input><button data-k-53d51b9e class=open-multi-input>Year</button><dialog data-k-53d51b9e closedby=any><div data-k-53d51b9e class=wrapper><div data-k-53d51b9e class=multi-input-header><input data-k-53d51b9e type=search placeholder="Search year"></div><div data-k-53d51b9e class=scroll-wrapper></div><div data-k-53d51b9e class=multi-input-footer><div data-k-53d51b9e class=flex-space-between><input data-k-53d51b9e type=number inputmode=numeric name=startYear><input data-k-53d51b9e type=number inputmode=numeric name=endYear>'),Dv=p("<ol data-k-53d51b9e>"),Rv=p("<li data-k-53d51b9e><label data-k-53d51b9e> <input data-k-53d51b9e type=radio name=year>");function Nv(){const[e,t]=hi(),{isTouch:n}=Xt(),[r,i]=O(""),l=new Date().getFullYear()+2;let s=!1,o={},c,u,h,f,g;const m=Sn(nn,(x,S)=>t(x,S),100);function y(){c.close(),s=!1,h==null||h.abort(),t({preventFetch:void 0})}function v(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(se(n,y)),(()=>{var x=Mv(),S=x.firstChild,k=S.nextSibling,b=k.firstChild,A=b.firstChild,w=A.firstChild,$=A.nextSibling,C=$.nextSibling,E=C.firstChild,I=E.firstChild,P=I.nextSibling;x.$$input=G=>{G.target.name==="year"&&m({[G.target.name]:G.target.checked?G.target.value:void 0,season:e("season"),startYear:void 0,endYear:void 0})},x.addEventListener("submit",G=>{G.preventDefault()});var R=g;typeof R=="function"?ue(R,x):g=x,S.$$click=()=>{if(s)y();else{h=new AbortController;const G=h.signal;o={year:e("year"),startYear:e("startYear"),endYear:e("endYear")},n()?(c.showModal(),m({preventFetch:!0}),v(),window.addEventListener("resize",v,{signal:G}),c.addEventListener("touchstart",q=>{q.target===c&&c.addEventListener("touchend",he=>{he.target===c&&(he.preventDefault(),y())},{once:!0,signal:G})},{signal:G})):(window.addEventListener("mousedown",q=>q.target!==f&&q.target.closest("dialog")!==c&&y(),{signal:G}),c.show()),s=!0}};var U=f;typeof U=="function"?ue(U,S):f=S,k.addEventListener("close",y);var H=c;typeof H=="function"?ue(H,k):c=k,w.$$input=G=>{G.stopPropagation(),i(G.target.value.toLowerCase())};var J=u;return typeof J=="function"?ue(J,$):u=$,d($,a(_,{})),d(C,a(Ld,{min:1970,max:l,separation:1,get minValue(){return+e("startYear")||1970},get maxValue(){return+e("endYear")||l},onChange:([G,q])=>m({startYear:G,endYear:q,year:void 0})}),E),I.$$beforeinput=G=>{var q;(q=G.data)!=null&&q.toLowerCase().includes("e")&&G.preventDefault()},I.addEventListener("blur",G=>G.target.value=e("startYear")||1970),I.addEventListener("change",G=>{m({startYear:Math.min(+G.target.value,+e("endYear")||l),endYear:Math.max(+G.target.value,+e("endYear")||l),year:void 0})}),P.$$beforeinput=G=>{var q;(q=G.data)!=null&&q.toLowerCase().includes("e")&&G.preventDefault()},P.addEventListener("blur",G=>G.target.value=e("endYear")||l),P.addEventListener("change",G=>{m({startYear:Math.min(+G.target.value,+e("startYear")||1970),endYear:Math.max(+G.target.value,+e("startYear")||1970),year:void 0})}),d(C,a(T,{get when(){return n()},get children(){return[(()=>{var G=Lv();return G.$$click=()=>{y(),t(o)},G})(),(()=>{var G=Pv();return G.$$click=y,G})()]}}),null),L(()=>x.classList.toggle("mobile",!!n())),L(()=>I.value=+e("startYear")||1970),L(()=>P.value=+e("endYear")||l),x})();function _(){return(()=>{var x=Dv();return d(x,a(Y,{get each(){return Array.from({length:Math.abs(l-1969)},(S,k)=>l-k)},children:S=>(()=>{var k=Rv(),b=k.firstChild,A=b.firstChild,w=A.nextSibling;return d(b,S,A),w.value=S,L(()=>k.classList.toggle("hidden",!S.toString().startsWith(r()))),L(()=>w.checked=e("year")==S),k})()})),x})()}}_e(["input","click","beforeinput"]);var Ov=p("<div data-k-ddc3fe99 class=multi-input-footer><button data-k-ddc3fe99>Cancel</button><button data-k-ddc3fe99>Ok"),Fv=p("<form data-k-ddc3fe99 class=multi-input><button data-k-ddc3fe99 class=open-multi-input>Formats</button><dialog data-k-ddc3fe99><div data-k-ddc3fe99 class=wrapper><div data-k-ddc3fe99 class=scroll-wrapper>"),Uv=p("<ol data-k-ddc3fe99>"),Bv=p("<li data-k-ddc3fe99><label data-k-ddc3fe99><input data-k-ddc3fe99 type=checkbox name=format>");function Vv(){const[e,t]=Ae(),{isTouch:n}=Xt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(se(n,h)),(()=>{var m=Fv(),y=m.firstChild,v=y.nextSibling,_=v.firstChild,x=_.firstChild;m.$$input=w=>{const C=new FormData(w.currentTarget).getAll("format");t({format:C})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?ue(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.format,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",$=>{$.target===l&&l.addEventListener("touchend",C=>{C.target===l&&(C.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",$=>$.target!==c&&$.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?ue(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?ue(b,v):l=v;var A=s;return typeof A=="function"?ue(A,x):s=x,d(x,a(g,{})),d(_,a(T,{get when(){return n()},get children(){var w=Ov(),$=w.firstChild,C=$.nextSibling;return $.$$click=()=>{h(),t({format:i})},C.$$click=h,w}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Ae(),[y,v]=je({}),_=te();W(()=>{v(Wt(qt(m.format,{})))});const x=()=>m.malSearch==="true"&&(_.type==="anime"||_.type==="manga")?"mal":"ani";return(()=>{var S=Uv();return d(S,a(Y,{get each(){return Object.entries(Un[x()][_.type]||{})},fallback:"Something went wrong",children:([k,b])=>(()=>{var A=Bv(),w=A.firstChild,$=w.firstChild;return d(w,()=>b.flavorText,$),$.value=k,L(()=>$.checked=y[k]),A})()})),S})()}}_e(["input","click"]);var Gv=p("<div data-k-3f80fe5b class=multi-input-footer><button data-k-3f80fe5b>Cancel</button><button data-k-3f80fe5b>Ok"),Hv=p("<form data-k-3f80fe5b class=multi-input><div data-k-3f80fe5b class=open-button-wrapper><button data-k-3f80fe5b class=open-multi-input>Sort order</button><button data-k-3f80fe5b type=button></button></div><dialog data-k-3f80fe5b><div data-k-3f80fe5b class=wrapper><div data-k-3f80fe5b class=scroll-wrapper>"),Yv=p("<ol data-k-3f80fe5b>"),jv=p("<li data-k-3f80fe5b><label data-k-3f80fe5b><input data-k-3f80fe5b type=radio name=order>");function zv(){const[e,t]=Ae(),{isTouch:n}=Xt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(se(n,h)),(()=>{var m=Hv(),y=m.firstChild,v=y.firstChild,_=v.nextSibling,x=y.nextSibling,S=x.firstChild,k=S.firstChild;m.$$input=C=>{t({order:C.target.value})},m.addEventListener("submit",C=>{C.preventDefault()});var b=u;typeof b=="function"?ue(b,m):u=m,v.$$click=()=>{if(r)h();else{o=new AbortController;const C=o.signal;i=e.order,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:C}),l.addEventListener("touchstart",E=>{E.target===l&&l.addEventListener("touchend",I=>{I.target===l&&(I.preventDefault(),h())},{once:!0,signal:C})},{signal:C})):(window.addEventListener("mousedown",E=>E.target!==c&&E.target.closest("dialog")!==l&&h(),{signal:C}),l.show()),r=!0}};var A=c;typeof A=="function"?ue(A,v):c=v,_.$$click=()=>t({sort:e.sort?void 0:"ASC"}),d(_,()=>e.sort||"DESC"),x.addEventListener("close",h);var w=l;typeof w=="function"?ue(w,x):l=x;var $=s;return typeof $=="function"?ue($,k):s=k,d(k,a(g,{})),d(S,a(T,{get when(){return n()},get children(){var C=Gv(),E=C.firstChild,I=E.nextSibling;return E.$$click=()=>{h(),t({order:i})},I.$$click=h,C}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Ae(),[y,v]=je({}),_=te();W(()=>{v(Wt(qt(m.order,{})))});const x=()=>m.malSearch==="true"&&(_.type==="anime"||_.type==="manga")?"mal":"ani",S=()=>Object.entries(Yt[x()][_.type]||{}).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=Yv();return d(k,a(Y,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=jv(),$=w.firstChild,C=$.firstChild;return d($,()=>A.flavorText,C),L(()=>C.value=A.alternative_key||b),L(()=>C.checked=y[b]||A.alternative_key&&y[A.alternative_key]),w})()})),k})()}}_e(["input","click"]);var Wv=p("<div data-k-d25d331a class=multi-input-footer><button data-k-d25d331a>Cancel</button><button data-k-d25d331a>Ok"),qv=p("<form data-k-d25d331a class=multi-input><button data-k-d25d331a class=open-multi-input>Status</button><dialog data-k-d25d331a><div data-k-d25d331a class=wrapper><div data-k-d25d331a class=scroll-wrapper>"),Kv=p("<ol data-k-d25d331a>"),Jv=p("<li data-k-d25d331a><label data-k-d25d331a><input data-k-d25d331a type=radio name=status>");function Xv(){const[e,t]=Ae(),{isTouch:n}=Xt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(se(n,h)),(()=>{var m=qv(),y=m.firstChild,v=y.nextSibling,_=v.firstChild,x=_.firstChild;m.$$input=w=>{t({[w.target.name]:w.target.value})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?ue(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.status,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",$=>{$.target===l&&l.addEventListener("touchend",C=>{C.target===l&&(C.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",$=>$.target!==c&&$.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?ue(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?ue(b,v):l=v;var A=s;return typeof A=="function"?ue(A,x):s=x,d(x,a(g,{})),d(_,a(T,{get when(){return n()},get children(){var w=Wv(),$=w.firstChild,C=$.nextSibling;return $.$$click=()=>{h(),t({status:i})},C.$$click=h,w}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Ae(),[y,v]=je({}),_=te();W(()=>{v(Wt(qt(m.status,{})))});const x=()=>m.malSearch==="true"&&(_.type==="anime"||_.type==="manga")?"mal":"ani",S=()=>Object.entries(yn[x()][_.type]||{}).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=Kv();return d(k,a(Y,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=Jv(),$=w.firstChild,C=$.firstChild;return d($,()=>A.flavorText,C),C.value=b,L(()=>C.checked=y[b]),w})()})),k})()}}_e(["input","click"]);var Zv=p("<div data-k-829b0f47 class=multi-input-footer><button data-k-829b0f47>Cancel</button><button data-k-829b0f47>Ok"),Qv=p("<form data-k-829b0f47 class=multi-input><button data-k-829b0f47 class=open-multi-input>Country</button><dialog data-k-829b0f47><div data-k-829b0f47 class=wrapper><div data-k-829b0f47 class=scroll-wrapper>"),e$=p("<ol data-k-829b0f47>"),t$=p("<li data-k-829b0f47><label data-k-829b0f47><input data-k-829b0f47 type=radio name=country>");function n$(){const[e,t]=Ae(),{isTouch:n}=Xt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(se(n,h)),(()=>{var m=Qv(),y=m.firstChild,v=y.nextSibling,_=v.firstChild,x=_.firstChild;m.$$input=w=>{t({[w.target.name]:w.target.value})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?ue(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e.country,n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",$=>{$.target===l&&l.addEventListener("touchend",C=>{C.target===l&&(C.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",$=>$.target!==c&&$.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?ue(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?ue(b,v):l=v;var A=s;return typeof A=="function"?ue(A,x):s=x,d(x,a(g,{})),d(_,a(T,{get when(){return n()},get children(){var w=Zv(),$=w.firstChild,C=$.nextSibling;return $.$$click=()=>{h(),t({country:i})},C.$$click=h,w}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const[m]=Ae(),[y,v]=je({});W(()=>{v(Wt(qt(m.country,{})))});const _=()=>Object.entries(bc).sort(([,x],[,S])=>x.flavorText.localeCompare(S));return(()=>{var x=e$();return d(x,a(Y,{get each(){return _()},fallback:"Something went wrong",children:([S,k])=>(()=>{var b=t$(),A=b.firstChild,w=A.firstChild;return d(A,()=>k.flavorText,w),w.value=S,L(()=>w.checked=y[S]),b})()})),x})()}}_e(["input","click"]);var r$=p("<div data-k-de2dabd3 class=multi-input-footer><button data-k-de2dabd3>Cancel</button><button data-k-de2dabd3>Ok"),a$=p('<form data-k-de2dabd3 class=multi-input><button data-k-de2dabd3 class=open-multi-input>Source</button><dialog data-k-de2dabd3><div data-k-de2dabd3 class=wrapper><div data-k-de2dabd3 class=multi-input-header><input data-k-de2dabd3 type=search placeholder="Filter sources"></div><div data-k-de2dabd3 class=scroll-wrapper>'),i$=p("<ol data-k-de2dabd3>"),l$=p("<li data-k-de2dabd3><label data-k-de2dabd3><input data-k-de2dabd3 type=radio name=source>");function s$(){const[e,t]=Ae(),[n,r]=O(""),{isTouch:i}=Xt();let l=!1,s,o,c,u,h,f;function g(){o.close(),l=!1,u==null||u.abort(),t({preventFetch:void 0})}function m(){c.classList.toggle("has-scroll-bar",c.scrollHeight-c.clientHeight>0)}return W(se(i,g)),(()=>{var v=a$(),_=v.firstChild,x=_.nextSibling,S=x.firstChild,k=S.firstChild,b=k.firstChild,A=k.nextSibling;v.$$input=I=>{t({[I.target.name]:I.target.value})},v.addEventListener("submit",I=>{I.preventDefault()});var w=f;typeof w=="function"?ue(w,v):f=v,_.$$click=()=>{if(l)g();else{u=new AbortController;const I=u.signal;s=e.source,i()?(o.showModal(),t({preventFetch:!0}),m(),window.addEventListener("resize",m,{signal:I}),o.addEventListener("touchstart",P=>{P.target===o&&o.addEventListener("touchend",R=>{R.target===o&&(R.preventDefault(),g())},{once:!0,signal:I})},{signal:I})):(window.addEventListener("mousedown",P=>P.target!==h&&P.target.closest("dialog")!==o&&g(),{signal:I}),o.show()),l=!0}};var $=h;typeof $=="function"?ue($,_):h=_,x.addEventListener("close",g);var C=o;typeof C=="function"?ue(C,x):o=x,b.$$input=I=>{I.stopPropagation(),r(I.target.value.toLowerCase())};var E=c;return typeof E=="function"?ue(E,A):c=A,d(A,a(y,{})),d(S,a(T,{get when(){return i()},get children(){var I=r$(),P=I.firstChild,R=P.nextSibling;return P.$$click=()=>{g(),t({source:s})},R.$$click=g,I}}),null),L(()=>v.classList.toggle("mobile",!!i())),v})();function y(){const[v]=Ae(),[_,x]=je({});W(()=>{x(Wt(qt(v.source,{})))});const S=()=>Object.entries(Dl).sort(([,k],[,b])=>k.flavorText.localeCompare(b));return(()=>{var k=i$();return d(k,a(Y,{get each(){return S()},fallback:"Something went wrong",children:([b,A])=>(()=>{var w=l$(),$=w.firstChild,C=$.firstChild;return d($,()=>A.flavorText,C),C.value=b,L(()=>w.classList.toggle("hidden",!A.flavorText.toLowerCase().includes(n()))),L(()=>C.checked=_[b]),w})()})),k})()}}_e(["input","click"]);var o$=p("<div data-k-86a7e743 class=multi-input-footer><button data-k-86a7e743>Cancel</button><button data-k-86a7e743>Ok"),c$=p('<form data-k-86a7e743 class=multi-input><button data-k-86a7e743 class=open-multi-input>ExternalSources</button><dialog data-k-86a7e743><div data-k-86a7e743 class=wrapper><div data-k-86a7e743 class=multi-input-header><input data-k-86a7e743 type=search placeholder="Filter external sources"></div><div data-k-86a7e743 class=scroll-wrapper>'),d$=p("<ol data-k-86a7e743>"),u$=p('<img data-k-86a7e743 alt="External source logo">'),h$=p("<sup data-k-86a7e743>"),g$=p("<li data-k-86a7e743><label data-k-86a7e743><div data-k-86a7e743 class=grid-wrapper><span data-k-86a7e743></span></div><input data-k-86a7e743 type=checkbox name=externalSource>");function f$(e){const[t,n]=Ae(),[r,i]=O(""),{isTouch:l}=Xt();let s=!1,o,c,u,h,f,g;function m(){c.close(),s=!1,h==null||h.abort(),n({preventFetch:void 0})}function y(){u.classList.toggle("has-scroll-bar",u.scrollHeight-u.clientHeight>0)}return W(se(l,m)),(()=>{var _=c$(),x=_.firstChild,S=x.nextSibling,k=S.firstChild,b=k.firstChild,A=b.firstChild,w=b.nextSibling;_.$$input=P=>{const R=new FormData(P.currentTarget);n({[P.target.name]:R.getAll(P.target.name)})},_.addEventListener("submit",P=>{P.preventDefault()});var $=g;typeof $=="function"?ue($,_):g=_,x.$$click=()=>{if(s)m();else{h=new AbortController;const P=h.signal;o=t.externalSource,l()?(c.showModal(),n({preventFetch:!0}),y(),window.addEventListener("resize",y,{signal:P}),c.addEventListener("touchstart",R=>{R.target===c&&c.addEventListener("touchend",U=>{U.target===c&&(U.preventDefault(),m())},{once:!0,signal:P})},{signal:P})):(window.addEventListener("mousedown",R=>R.target!==f&&R.target.closest("dialog")!==c&&m(),{signal:P}),c.show()),s=!0}};var C=f;typeof C=="function"?ue(C,x):f=x,S.addEventListener("close",m);var E=c;typeof E=="function"?ue(E,S):c=S,A.$$input=P=>{P.stopPropagation(),i(P.target.value.toLowerCase())};var I=u;return typeof I=="function"?ue(I,w):u=w,d(w,a(v,{})),d(k,a(T,{get when(){return l()},get children(){var P=o$(),R=P.firstChild,U=R.nextSibling;return R.$$click=()=>{m(),n({externalSource:o})},U.$$click=m,P}}),null),L(()=>_.classList.toggle("mobile",!!l())),_})();function v(){const[_]=Ae(),[x,S]=je({});return W(()=>{S(Wt(qt(_.externalSource,{})))}),(()=>{var k=d$();return d(k,a(Y,{get each(){var b;return((b=e.sources())==null?void 0:b.data)||[]},fallback:"Loading",children:b=>(()=>{var A=g$(),w=A.firstChild,$=w.firstChild,C=$.firstChild,E=$.nextSibling;return d($,a(T,{get when(){return b.icon},get children(){var I=u$();return L(P=>{var R=b.icon,U=b.color;return R!==P.e&&V(I,"src",P.e=R),U!==P.t&&((P.t=U)!=null?I.style.setProperty("background-color",U):I.style.removeProperty("background-color")),P},{e:void 0,t:void 0}),I}}),C),d(C,()=>b.site,null),d(C,a(T,{get when(){return b.language},get children(){var I=h$();return d(I,()=>b.language),I}}),null),L(()=>A.classList.toggle("hidden",!b.site.toLowerCase().includes(r()))),L(()=>E.value=b.id),L(()=>E.checked=x[b.id]),A})()})),k})()}}_e(["input","click"]);var m$=p("<div data-k-b93bd9f3 class=multi-input-footer><button data-k-b93bd9f3>Cancel</button><button data-k-b93bd9f3>Ok"),p$=p("<form data-k-b93bd9f3 class=multi-input><button data-k-b93bd9f3 class=open-multi-input>Seasons</button><dialog data-k-b93bd9f3><div data-k-b93bd9f3 class=wrapper><div data-k-b93bd9f3 class=scroll-wrapper>"),v$=p("<ol data-k-b93bd9f3>"),$$=p("<li data-k-b93bd9f3><label data-k-b93bd9f3><input data-k-b93bd9f3 type=radio name=season>");function _$(){const[e,t]=hi(),{isTouch:n}=Xt();let r=!1,i,l,s,o,c,u;function h(){l.close(),r=!1,o==null||o.abort(),t({preventFetch:void 0})}function f(){s.classList.toggle("has-scroll-bar",s.scrollHeight-s.clientHeight>0)}return W(se(n,h)),(()=>{var m=p$(),y=m.firstChild,v=y.nextSibling,_=v.firstChild,x=_.firstChild;m.$$input=w=>{const C=new FormData(w.currentTarget).getAll("season");t({season:C,year:e("year")})},m.addEventListener("submit",w=>{w.preventDefault()});var S=u;typeof S=="function"?ue(S,m):u=m,y.$$click=()=>{if(r)h();else{o=new AbortController;const w=o.signal;i=e("season"),n()?(l.showModal(),t({preventFetch:!0}),f(),window.addEventListener("resize",f,{signal:w}),l.addEventListener("touchstart",$=>{$.target===l&&l.addEventListener("touchend",C=>{C.target===l&&(C.preventDefault(),h())},{once:!0,signal:w})},{signal:w})):(window.addEventListener("mousedown",$=>$.target!==c&&$.target.closest("dialog")!==l&&h(),{signal:w}),l.show()),r=!0}};var k=c;typeof k=="function"?ue(k,y):c=y,v.addEventListener("close",h);var b=l;typeof b=="function"?ue(b,v):l=v;var A=s;return typeof A=="function"?ue(A,x):s=x,d(x,a(g,{})),d(_,a(T,{get when(){return n()},get children(){var w=m$(),$=w.firstChild,C=$.nextSibling;return $.$$click=()=>{h(),t({season:i})},C.$$click=h,w}}),null),L(()=>m.classList.toggle("mobile",!!n())),m})();function g(){const m=te(),[y,v]=je({});W(()=>{v(Wt(qt(e("season"),{})))});const _=()=>e("malSearch")==="true"&&(m.type==="anime"||m.type==="manga")?"mal":"ani";return(()=>{var x=v$();return d(x,a(Y,{get each(){var S;return Object.entries(((S=ta[_()])==null?void 0:S[m.type])||{})},fallback:"Something went wrong",children:([S,k])=>a(T,{when:S!=="tba",get children(){var b=$$(),A=b.firstChild,w=A.firstChild;return d(A,()=>k.flavorText,w),w.value=S,L(()=>w.checked=y[S]),b}})})),x})()}}_e(["input","click"]);var b$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 0.01 512.01 511.99"><path fill=currentColor d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">');function Pd(){return b$()}var y$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">');function w$(){return y$()}var k$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0.03 447.99 512.02"><path fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">');function S$(){return k$()}var C$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 65.1 512 381.8"><path fill=currentColor d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">');function x$(){return C$()}var A$=p('<svg viewBox="0 0 16 16"xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.5179,0.713177 12.5743,1.32796 13.4526,2.14597 L14.2929,1.30564 C14.9229,0.675676 16,1.12184 16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1218,6.00002 10.6757,4.92288 11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z">');function T$(){return A$()}var I$=p('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path fill=currentColor d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">');function ga(e){return(()=>{var t=I$();return Et(t,e,!0,!0),t})()}var E$=p("<tool-tip2 data-k-6bfde80e inert role=tooltip>",!0,!1,!1);function L$(e){return xt(e.positions,"positions"),(()=>{var t=E$();return Et(t,e,!1,!1),t._$owner=kr(),L(()=>V(t,"data-tooltip-positions",e.positions)),t})()}var P$=p("<li data-k-5face4dc>"),M$=p("<button data-k-5face4dc class=cp-media-action-item data-tooltip-trigger>");function Vr(e){return(()=>{var t=P$();return d(t,a(Md,e)),t})()}function Md(e){return xt(e.label,"label"),dn(e.onClick,"onClick"),(()=>{var t=M$();return Ha(t,"click",e.onClick,!0),d(t,()=>e.children,null),d(t,a(L$,{positions:"left right",get children(){return e.label}}),null),L(()=>t.classList.toggle("big",!!e.big)),t})()}_e(["click"]);var D$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z">');function R$(){return D$()}var N$=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z">');function O$(){return N$()}var Dd=p("<div data-k-2ffecdb9 class=score> "),Rd=p("<div data-k-2ffecdb9 class=wrapper><img data-k-2ffecdb9 class=absolute-inset alt=Cover.>"),F$=p("<div data-k-2ffecdb9 class=list-status>"),Nd=p("<p data-k-2ffecdb9 class=line-clamp>"),Od=p('<li data-k-2ffecdb9 class="cp-media-card inline-container">'),U$=p("<ul data-k-2ffecdb9 class=cp-media-card-quick-action-items>"),B$=p('<div data-k-2ffecdb9 class="absolute-inset recommendation-rating-wrapper"><div data-k-2ffecdb9 class=flex-space-between><div data-k-2ffecdb9><button data-k-2ffecdb9></button><button data-k-2ffecdb9></button></div><span data-k-2ffecdb9>'),Fd=p("<li data-k-2ffecdb9 class=cp-character-card>"),V$=p("<img data-k-2ffecdb9>"),G$=p("<div data-k-2ffecdb9 class=grid><span data-k-2ffecdb9></span><span data-k-2ffecdb9>");function Ud(e){return F(e.media,"Missing media"),(()=>{var t=Od();return d(t,a(B,{class:"block-link",get href(){return ud(e.media)},get children(){return[(()=>{var n=Rd(),r=n.firstChild;return d(n,a(T,{get when(){return e.media.averageScore},get children(){var i=Dd(),l=i.firstChild;return d(i,a(ga,{}),l),d(i,()=>e.media.averageScore/10,null),i}}),null),d(n,()=>e.children,null),L(()=>V(r,"src",e.media.coverImage.large)),n})(),(()=>{var n=Nd();return d(n,a(T,{get when(){var r;return(r=e.media.mediaListEntry)==null?void 0:r.status},get children(){var r=F$();return L(()=>V(r,"data-status",e.media.mediaListEntry.status)),r}}),null),d(n,()=>e.media.title.userPreferred,null),n})()]}})),t})()}function H$(e){return F(e.media,"Missing media"),(()=>{var t=Od();return d(t,a(B,{class:"block-link",get href(){return dd(e.type,e.media)},get children(){return[(()=>{var n=Rd(),r=n.firstChild;return d(n,a(T,{get when(){return e.media.score},get children(){var i=Dd(),l=i.firstChild;return d(i,a(ga,{}),l),d(i,()=>e.media.score,null),i}}),null),d(n,()=>e.children,null),L(()=>V(r,"src",e.media.images.webp.large_image_url)),n})(),(()=>{var n=Nd();return d(n,a(T,{get when(){return e.media.titles},get fallback(){return e.media.title},get children(){return a(j,{get children(){return[a(M,{get when(){return e.media.titles.English},get children(){return e.media.titles.English}}),a(M,{get when(){return e.media.titles.Default},get children(){return e.media.titles.Default}})]}})}})),n})()]}})),t})()}function gi(e){return F(e.media,"Missing media"),a(Ud,Fe(e,{get children(){return a(Bd,e)}}))}function ml(e){return F(e.media,"Missing media"),xt(e.type),a(H$,Fe(e,{get children(){return a(T,{get when(){return Vs[e.media.mal_id]},get children(){return a(Bd,{get media(){return Vs[e.media.mal_id]}})}})}}))}function Bd(e){const{openEditor:t}=El(),{accessToken:n}=ie();return F(e.media,"Missing media"),a(T,{get when(){return n()},get children(){var r=U$();return d(r,a(Vr,{label:"Edit media",onClick:i=>{i.preventDefault(),t(e.media)},get children(){return a(Pd,{})}}),null),d(r,a(Vr,{label:"Set to planning",onClick:i=>{i.preventDefault(),ae.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"PLANNING"})},get children(){return a(w$,{})}}),null),d(r,a(Vr,{get label(){return"Set to "+(e.media.type==="ANIME"?"watching":"reading")},onClick:i=>{i.preventDefault(),ae.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"CURRENT"})},get children(){return a(S$,{})}}),null),d(r,a(Vr,{label:"Set to completed",onClick:i=>{i.preventDefault(),ae.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"COMPLETED"})},get children(){return a(x$,{})}}),null),d(r,a(Vr,{get label(){return"Set to "+(e.media.type==="ANIME"?"rewatching":"rereading")},onClick:i=>{i.preventDefault(),ae.anilist.mutateMedia(n(),{mediaId:e.media.id,status:"REPEAT"})},get children(){return a(T$,{})}}),null),r}})}function Y$(e){return F(e.node,"Missing node"),dn(e.handleRateUp,"handleRateUp"),dn(e.handleRateDown,"handleRateDown"),xt(e.userRating,"userRating"),Cc(e.rating,"rating"),a(Ud,{get media(){return e.node.mediaRecommendation},get children(){var t=B$(),n=t.firstChild,r=n.firstChild,i=r.firstChild,l=i.nextSibling,s=r.nextSibling;return Ha(i,"click",e.handleRateUp,!0),i.style.setProperty("--color","lime"),d(i,a(R$,{})),Ha(l,"click",e.handleRateDown,!0),l.style.setProperty("--color","crimson"),d(l,a(O$,{})),d(s,a(T,{get when(){return e.rating>0},children:"+"}),null),d(s,()=>e.rating,null),L(o=>{var c=e.userRating==="RATE_UP",u=e.userRating==="RATE_DOWN";return c!==o.e&&i.classList.toggle("active",o.e=c),u!==o.t&&l.classList.toggle("active",o.t=u),o},{e:void 0,t:void 0}),t}})}function Vd(e){return F(e.character,"character"),xt(e.role,"role"),(()=>{var t=Fd();return d(t,a(pl,{get href(){return Vf(e.character)},get src(){return e.character.images.webp.image_url},get name(){return e.character.name},get extra(){return e.role},alt:"Character."}),null),d(t,a(T,{get when(){return e.voiceActor},get children(){return a(pl,{get href(){return e.voiceActor.person.url},get src(){return e.voiceActor.person.images.jpg.image_url},get name(){return e.voiceActor.person.name},get extra(){return e.voiceActor.language},alt:"Voice actor.",class:"dir-rtl"})}}),null),t})()}function as(e){return F(e.staff,"staff"),F(e.positions,"positions"),(()=>{var t=Fd();return d(t,a(pl,{get href(){return e.staff.url},get src(){return e.staff.images.jpg.image_url},get name(){return e.staff.name},get extra(){return e.positions.join(", ")},alt:"Staff."})),t})()}function pl(e){return xt(e.alt),a(B,{className:"clean-link flex",get class(){return e.class},get href(){return e.href},get children(){return[(()=>{var t=V$();return L(n=>{var r=e.src,i=e.alt;return r!==n.e&&V(t,"src",n.e=r),i!==n.t&&V(t,"alt",n.t=i),n},{e:void 0,t:void 0}),t})(),(()=>{var t=G$(),n=t.firstChild,r=n.nextSibling;return d(n,()=>e.name),d(r,()=>e.extra),t})()]}})}_e(["click"]);var j$=p("<section data-k-1bb8fda2>");function Gd(e){return(()=>{var t=j$();return Et(t,e,!1,!1),t})()}var z$=p("<button data-k-89909c33>TBA"),W$=p("<button data-k-89909c33>Current season"),q$=p("<button data-k-89909c33>Next season"),K$=p("<div data-k-89909c33>"),J$=p("<div data-k-89909c33 class=search-page><div data-k-89909c33 class=header-row><h1 data-k-89909c33></h1><select data-k-89909c33 name=type id=type><option data-k-89909c33 value=anime>Anime</option><option data-k-89909c33 value=manga>Manga</option><option data-k-89909c33 value=media>Media</option></select></div><div data-k-89909c33 class=grid-column-auto-fill><input data-k-89909c33 type=search><span data-k-89909c33><p data-k-89909c33>Search MAL</p></span><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hideMyAnime id=hideMyAnime><label data-k-89909c33 for=hideMyAnime> Hide my </label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=showMyAnime id=showMyAnime><label data-k-89909c33 for=showMyAnime> Only show my </label></div><div data-k-89909c33><input data-k-89909c33 type=checkbox name=hasNotLicense id=hasNotLicense><label data-k-89909c33 for=hasNotLicense> Licensed</label><br data-k-89909c33><input data-k-89909c33 type=checkbox name=hasLicense id=hasLicense><label data-k-89909c33 for=hasLicense> Unlicensed"),X$=p('<ol data-k-89909c33 class="flex-space-between cp-search-season-controls"><li data-k-89909c33><button data-k-89909c33>&lt;</button></li><li data-k-89909c33><button data-k-89909c33>>'),Z$=p("<h1 data-k-89909c33> "),Vi=p("<h1 data-k-89909c33>"),Q$=p("<h1 data-k-89909c33>TBA"),e1=p('<ol data-k-89909c33 class="search-page-content grid-column-auto-fill">'),t1=p("<li data-k-89909c33 class=item><button data-k-89909c33><h3 data-k-89909c33></h3><p data-k-89909c33>"),n1=p("<ol data-k-89909c33 class=search-meta-tags><li data-k-89909c33><button data-k-89909c33>Clear all"),r1=p("<li data-k-89909c33><button data-k-89909c33>"),vl=p("<li data-k-89909c33 class=grid-full-span><h2 data-k-89909c33>");class le{constructor({url:t,key:n,value:r,active:i=!0,visuallyDisabled:l=!1,reason:s,desc:o,name:c,hidden:u=!1,canClear:h=!0,addUrl:f}){F(!i||n,"key missing"),F(u||c,"Name is missing"),F(!h||!i||t,"Url is missing"),F(h||u,"Don't show user meta tags they can't clear"),F(typeof i=="boolean","active is not boolean"),F(typeof l=="boolean","visuallyDisabled is not boolean"),F(typeof u=="boolean","hidden is not boolean"),F(typeof h=="boolean","canClear is not boolean"),this.name=c,this.url=t,this.addUrl=f,this.key=n,this.value=r,this.active=i,this.visuallyDisabled=l,this.reason=s,this.desc=o,this.hidden=u,this.canClear=h}match(t={}){return this.name===t.name&&jr(this.url,t.url)&&jr(this.addUrl,t.addUrl)&&this.key===t.key&&jr(this.value,t.value)&&this.active===t.active&&this.visuallyDisabled===t.visuallyDisabled&&this.reason===t.reason&&this.desc===t.desc&&this.hidden===t.hidden&&this.canClear===t.canClear}looseMatch(t={}){return this.key===t.key&&jr(this.value,t.value)&&this.active===t.active}}function a1(){var _,x,S,k,b,A,w;const e=te(),[t]=Ae(),[n]=hi(),r=e.type,i=t.malSearch==="true"&&e.type!=="media"?"mal":"ani",l=i==="ani"?"mal":"ani",s=[];let o=t.preventFetch==="true";const[c]=We(n("season"));if(c&&i===al){const{api:$,flavorText:C}=((x=(_=ta[i])==null?void 0:_[r])==null?void 0:x[c])||{flavorText:yn.flavorTexts[c]||c};s.push(new le({name:C,url:`season=${c}`,key:"season",value:$,active:$!==void 0,visuallyDisabled:$===void 0}))}const[u]=We(n("year"));let h=!1,f=!1,g=!1;if(c&&u&&i===ja){const{api:$,flavorText:C}=((k=(S=ta[i])==null?void 0:S[r])==null?void 0:k[c])||{flavorText:yn.flavorTexts[c]||c};s.push(new le({name:C,url:`season=${c}`,key:"season",value:u+"/"+$,active:$!==void 0,visuallyDisabled:$===void 0})),s.push(new le({name:u,url:`year=${u}`,active:!1})),g=!0}else u&&(h=!0,f=!0,i==="ani"?c&&r==="anime"?s.push(new le({name:u,url:`year=${u}`,active:!0,key:"seasonYear",value:u})):s.push(new le({name:u,url:`year=${u}`,active:!0,key:"year",value:`${u}%`})):i==="mal"&&(s.push(new le({name:u,url:`year=${u}`,active:!0,key:"start_date",value:`${u}-01-01`})),s.push(new le({hidden:!0,canClear:!1,key:"end_date",value:`${u}-12-31`}))));if(Rl(g&&i===al,"Season disabling should only have on MAL search"),t.q&&s.push(new le({url:"q="+t.q,key:i==="ani"?"search":"q",value:t.q,name:"Search: "+t.q,active:!g,visuallyDisabled:g})),i==="ani"&&(e.type==="anime"?s.push(new le({key:"type",value:"ANIME",hidden:!0,canClear:!1})):e.type==="manga"?s.push(new le({key:"type",value:"MANGA",hidden:!0,canClear:!1})):e.type==="media"&&s.push(new le({key:"type",value:void 0,hidden:!0,canClear:!1}))),t.rating===void 0)i==="ani"?s.push(new le({key:"isAdult",value:!1,hidden:!0,canClear:!1})):i==="mal"&&s.push(new le({key:"sfw",value:!0,hidden:!0,canClear:!1}));else{const $=qt(t.rating);if($.any)i==="ani"?s.push(new le({name:"Any rating",url:"rating=any",key:"isAdult",value:void 0})):i==="mal"&&s.push(new le({name:"Any rating",url:"rating=any",active:!1,visuallyDisabled:g}));else{const C={g:"G - All ages",pg:"PG - Children",pg13:"PG-13",r17:"R - 17+",r:"R+",rx:"Rx - Hentai"};new Set([t.rating].flat()).forEach(I=>{I==="g"||I==="pg"||I==="pg13"||I==="r17"?s.push(new le({name:C[I],url:`rating=${I}`,key:"rating",value:I,visuallyDisabled:i==="ani"||g,active:i==="mal"&&!g})):(I==="r"||I==="rx")&&s.push(new le({name:C[I],url:`rating=${I}`,key:"rating",value:I,active:i==="mal"&&!g,visuallyDisabled:g}))}),i==="ani"&&($.rx&&($.g||$.pg||$.pg13||$.r17||$.r)?s.push(new le({key:"isAdult",value:void 0,hidden:!0,canClear:!1})):s.push(new le({key:"isAdult",value:$.rx===!0,hidden:!0,canClear:!1})))}}if(t.genre){const[,$,C]=[...lr(t.genre)].reduce(m,["genre"]);i==="ani"?($.length&&s.push(new le({key:"genres",value:$,hidden:!0,canClear:!1})),C.length&&s.push(new le({key:"tags",value:C,hidden:!0,canClear:!1}))):i==="mal"&&$.length&&s.push(new le({key:"genres",value:$.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}if(t.excludeGenre){const[,$,C]=[...lr(t.excludeGenre)].reduce(m,["excludeGenre"]);i==="ani"?($.length&&s.push(new le({key:"excludedGenres",value:$,hidden:!0,canClear:!1})),C.length&&s.push(new le({key:"excludeTags",value:C,hidden:!0,canClear:!1}))):i==="mal"&&$.length&&s.push(new le({key:"genres_exclude",value:$.join(","),hidden:!0,canClear:!1,active:!g,visuallyDisabled:g}))}function m([$,C=[],E=[]],I){let P=!1;return i==="ani"?Dn.genres===null?o=!0:Dn.tags[I]?E.push(I):Dn.genres[I]?C.push(I):P=!0:i==="mal"&&(Dn[r]===null?o=!0:Number.isInteger(Dn[r][I])?C.push(Dn[r][I]):P=!0),s.push(new le({name:I,url:`${$}=${I}`,active:!1,visuallyDisabled:P||g})),[$,C,E]}const[y]=[+t.startYear].flat();y&&(f=!0,i==="ani"?s.push(new le({name:`Year greater than ${y-1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearGreater",value:parseInt(`${y-1}9999`)})):i==="mal"&&s.push(new le({name:`Year greater than ${y-1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`startYear=${y}`,key:"start_date",value:`${y}-01-01`})));const[v]=[+t.endYear].flat();v&&(h=!0,i==="ani"?s.push(new le({name:`Year lesser than ${v+1}`,active:!u,visuallyDisabled:!!u,url:`startYear=${y}`,key:"yearLesser",value:parseInt(`${v+1}0000`)})):i==="mal"&&s.push(new le({name:`Year lesser than ${v+1}`,active:!u&&!g,visuallyDisabled:!!u||g,url:`endYear=${v}`,key:"start_date",value:`${v}-12-31`}))),t.onList==="true"&&s.push(new le({name:`Show my ${r}`,active:i==="ani",visuallyDisabled:i!=="ani",url:"onList=true",key:"onList",value:!0})),t.onList==="false"&&s.push(new le({name:`Hide my ${r}`,active:i==="ani",visuallyDisabled:i!=="ani",url:"onList=false",key:"onList",value:!1}));{const $=[];lr(n("format")).forEach(C=>{var R;const{api:E,flavorText:I}=((R=Un[i][r])==null?void 0:R[C])||{},P=I||Un.flavorTexts[C]||C;i==="ani"&&E&&$.push(E),E?g&&i===ja?s.push(new le({name:"Format: "+I,key:"filter",value:E,url:`format=${C}`})):s.push(new le({name:"Format: "+I,active:i==="mal",key:"type",value:E,url:`format=${C}`})):s.push(new le({name:"Format: "+P,active:!1,visuallyDisabled:!0,url:`format=${C}`}))}),$.length&&s.push(new le({key:"format",value:$,canClear:!1,hidden:!0}))}{const $=[];let C=!1,E=!1;lr(n("order")).forEach(P=>{var he,Z,X;let R=P;if(P===Yt.ani.anime.duration.alternative_key)R="duration",s.push(new le({name:"Duration greater than 0",url:`order=${P}`,active:i==="ani",visuallyDisabled:i!=="ani",addUrl:`order=${R}`,key:"durationGreater",value:0}));else if(P===Yt.mal.anime.episodes.alternative_key)R="episodes",i==="ani"?r==="anime"?s.push(new le({name:"Episodes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="manga"?s.push(new le({name:"Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):r==="media"&&s.push(new le({name:"Episodes/Chapters greater than 0",url:`order=${P}`,addUrl:`order=${R}`,key:"chapterGreater",value:0})):i==="mal"&&s.push(new le({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===Yt.mal.manga.volumes.alternative_key)R="volumes",i==="ani"?s.push(new le({name:"Volumes greater than 0",url:`order=${P}`,addUrl:`order=${R}`,active:r==="manga"&&!g,visuallyDisabled:r!=="manga"||g,key:"volumeGreater",value:0})):i==="mal"&&s.push(new le({name:"Status complete",url:`order=${P}`,addUrl:`order=${R}`,key:"status",value:"complete",active:!g,visuallyDisabled:g}));else if(P===Yt.mal.anime.end_date.alternative_key){R="end_date";const Q={name:"Only valid dates",active:!h&&!g,hidden:h,url:`order=${P}`,addUrl:`order=${R}`};i==="ani"?s.push(new le({...Q,key:"endDateGreater",value:0})):i==="mal"&&s.push(new le({...Q,key:"end_date",value:`${new Date().getFullYear()+100}-01-01`,visuallyDisabled:g}))}else if(P===Yt.mal.anime.start_date.alternative_key){R="start_date";const Q={name:"Only valid dates",active:!f&&!g,hidden:f,url:`order=${P}`,addUrl:`order=${R}`};i==="ani"?s.push(new le({...Q,key:"yearGreater",value:0})):i==="mal"&&s.push(new le({...Q,key:"start_date",value:"0000-01-01",visuallyDisabled:g}))}const{api:U,flavorText:H,reverse:J}=((he=Yt[i][r])==null?void 0:he[R])||{},G=H||((X=(Z=Yt[i==="ani"?"mal":"ani"][r])==null?void 0:Z[R])==null?void 0:X.flavorText)||Yt.flavorTexts[R]||P;i==="ani"&&U?t.sort==="ASC"?$.push(U):$.push(U+"_DESC"):i==="mal"&&J&&(E=!0);const q=[`order=${P}`];t.sort&&q.push(`sort=${t.sort}`),U?(C||(C=i==="mal"),s.push(new le({name:"Sort: "+H,active:i==="mal"&&!g,visuallyDisabled:g,key:"order_by",value:U,url:q}))):s.push(new le({name:"Sort: "+G,active:!1,visuallyDisabled:!0,url:q}))}),F($.length===0||i==="ani","validAniOrder should not have anilist orders when engine is mal"),F(C===!1||i==="mal","validMalOrder should be false if engine is ani"),i==="ani"?$.length?s.push(new le({key:"sort",value:$,canClear:!1,hidden:!0})):t.q?s.push(new le({key:"sort",value:"SEARCH_MATCH",canClear:!1,hidden:!0})):s.push(new le({key:"sort",value:"POPULARITY_DESC",canClear:!1,hidden:!0})):i==="mal"&&(!C&&!t.q&&(E=!0,s.push(new le({key:"order_by",value:"popularity",canClear:!1,hidden:!0,active:!g,visuallyDisabled:g}))),E?s.push(new le({key:"sort",value:t.sort==="ASC"?"desc":"asc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})):s.push(new le({key:"sort",value:t.sort==="ASC"?"asc":"desc",hidden:!0,canClear:!1,active:!g,visuallyDisabled:g})))}if(n("status")){const[$]=We(n("status")),{api:C,flavorText:E}=((b=yn[i][r])==null?void 0:b[$])||{flavorText:((w=(A=yn[l][r])==null?void 0:A[$])==null?void 0:w.flavorText)||yn.flavorTexts[$]||$};s.push(new le({name:E,active:!!C,visuallyDisabled:!C,key:"status",value:C,url:`status=${$}`}))}if(n("country")){const[$]=We(n("country")),{flavorText:C}=bc[$]||{flavorText:$};s.push(new le({name:C,active:i==="ani",visuallyDisabled:i!=="ani",key:"countryOfOrigin",value:$,url:`country=${$}`}))}if(t.source){const[$]=We(t.source),{api:C,flavorText:E}=Dl[$]||{flavorText:$};s.push(new le({name:E,active:i==="ani",visuallyDisabled:i!=="ani",key:"source",value:C,url:`source=${$}`}))}if(t.license!==void 0){const $=t.license==="true";s.push(new le({name:$?"Licensed":"Unlicensed",active:i==="ani",visuallyDisabled:i!=="ani",key:"isLicensed",value:$,url:`license=${$}`}))}if(t.externalSource!==void 0){const $=We(t.externalSource).map(Number);$.forEach(C=>{s.push(new le({name:i1[C]||C,active:!1,visuallyDisabled:i!=="ani",url:`externalSource=${C}`}))}),s.push(new le({active:i==="ani",hidden:!0,canClear:!1,key:"licensedBy",value:$}))}if(t.episodeGreater!==void 0){const[$]=We(t.episodeGreater).map(Number),C={active:i==="ani",visuallyDisabled:i!=="ani",key:"episodeGreater",value:Math.max($+1,0),url:`episodeGreater=${$}`};r==="manga"?s.push(new le({name:`Chapters greater than ${$}`,...C})):r==="anime"?s.push(new le({name:`Episodes greater than ${$}`,...C})):r==="media"&&s.push(new le({name:`Episode/Chapters greater than ${$}`,...C}))}if(t.episodeLesser!==void 0){const[$]=We(t.episodeLesser).map(Number),C={active:i==="ani",visuallyDisabled:i!=="ani",key:"episodeLesser",value:Math.max($,0),url:`episodeLesser=${$}`};r==="manga"?s.push(new le({name:`Chapters lesser than ${$}`,...C})):r==="anime"?s.push(new le({name:`Episodes lesser than ${$}`,...C})):r==="media"&&s.push(new le({name:`Episode/Chapters lesser than ${$}`,...C}))}if(t.rank){const[$]=We(t.rank);s.push(new le({name:`Tags above ${$}%`,url:`rank=${$}`,key:"minimumTagRank",value:$,active:i==="ani",visuallyDisabled:i!=="ani"}))}return[r,i,s,o]}const[Dn,fo]=je({anime:null,manga:null,genres:null,tags:null}),[i1,l1]=je({});function s1(e){un();const t=Cv(),n=te(),[r,i]=Ae(),[l,s]=O(),[o,c]=O(),[u,h]=O(),[f,g]=O(),[m,y]=O(),[v,_]=O(),[x]=ae.anilist.genresAndTags(()=>r.malSearch!=="true"||void 0),[S]=ae.anilist.externalSources(()=>r.malSearch!=="true"||n.type==="media"?null:n.type==="anime"||n.type==="manga"?n.type.toUpperCase():void 0),[k]=ae.myAnimeList.genresAndThemes(()=>r.malSearch==="true"&&(n.type==="anime"||n.type==="manga")?n.type:void 0),b=nn(i,300);Sn(nn,i,100);const A=Sn(nn,(w,$,C)=>{He(()=>{g(w),y($),_(E=>{const I=(E==null?void 0:E.filter(R=>R.active))||[],P=C.filter(R=>R.active);return I.length===P.length&&I.every((R,U)=>R.looseMatch(P[U]))?E:C})})},300);return W(se(k,w=>{w&&fo(w.data.translations)})),W(se(x,w=>{w&&fo({genres:qt(w.data.genres),tags:w.data.tags.reduce(($,C)=>($[C.name]=C,$),{})})})),W(se(S,w=>{w&&l1(w.data.reduce(($,C)=>($[C.id]=C.site,$),{}))})),W(()=>{const[w,$,C,E]=a1();E||He(()=>{s(w),c($),h(I=>(I==null?void 0:I.length)===C.length&&C.every((P,R)=>P.match(I[R]))?I:C),A(w,$,C)})}),(()=>{var w=J$(),$=w.firstChild,C=$.firstChild,E=C.nextSibling,I=$.nextSibling,P=I.firstChild,R=P.nextSibling;R.firstChild;var U=R.nextSibling,H=U.firstChild,J=H.nextSibling;J.firstChild;var G=J.nextSibling,q=G.nextSibling,he=q.nextSibling;he.firstChild;var Z=U.nextSibling,X=Z.firstChild,Q=X.nextSibling,pe=Q.nextSibling,ge=pe.nextSibling;return d(C,()=>qe(n.mode)),E.addEventListener("change",me=>t(me.target.value)),P.$$input=me=>{b({q:me.target.value})},d(R,a(vv,{get disabled(){return n.type==="media"},name:"malSearch",get checked(){return r.malSearch==="true"&&n.type!=="media"},onInput:me=>{i({malSearch:me.target.checked||void 0})}}),null),H.$$input=me=>{i({onList:me.target.checked?!1:void 0})},d(J,()=>n.type,null),q.$$input=me=>{i({onList:me.target.checked||void 0})},d(he,()=>n.type,null),X.$$input=me=>{i({license:me.target.checked||void 0})},ge.$$input=me=>{i({license:me.target.checked?!1:void 0})},d(I,a(mv,{}),null),d(I,a(wv,{aniGenres:x,malGenres:k,translation:Dn,get engine(){return o()},showAdult:!0}),null),d(I,a(Nv,{}),null),d(I,a(Vv,{}),null),d(I,a(zv,{}),null),d(I,a(Xv,{}),null),d(I,a(n$,{}),null),d(I,a(s$,{}),null),d(I,a(_$,{}),null),d(I,a(f$,{sources:S}),null),d(I,a(Ld,{min:0,max:500,separation:1,get minValue(){return+r.episodeGreater||0},get maxValue(){return+r.episodeLesser||500},onChange:([me,oe])=>i({episodeLesser:oe,episodeGreater:me})}),null),d(I,a(T,{get when(){return n.type==="anime"},get children(){var me=K$();return d(me,a(B,{get href(){return"/search/anime/tba"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return z$()}}),null),d(me,a(B,{get href(){return"/search/anime/this-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return W$()}}),null),d(me,a(B,{get href(){return"/search/anime/next-season"+(r.malSearch==="true"?"?malSearch=true":"")},get children(){return q$()}}),null),me}}),null),d(w,a(uc.Provider,{value:{searchType:l,searchEngine:o,searchVariables:u,debouncedSearchType:f,debouncedSearchEngine:m,debouncedSearchVariables:v},get children(){return e.children}}),null),L(()=>V(P,"placeholder","Search "+(n.type||"All"))),L(()=>E.value=n.type),L(()=>P.value=r.q||""),L(()=>H.checked=r.onList==="false"),L(()=>q.checked=r.onList==="true"),L(()=>X.checked=r.license==="true"),L(()=>ge.checked=r.license==="false"),w})()}function o1(e){const t=te(),[n]=Ae(),[r,i]=hi(),{debouncedSearchEngine:l,debouncedSearchType:s,searchVariables:o,debouncedSearchVariables:c}=Il(),u=un();return[a(j,{get children(){return a(M,{get when(){var h;return((h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){var h=X$(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild;return g.$$click=()=>{const v=ir(Gt(r("season")),+Gt(r("year")),-1);i({year:v.year,season:v.season.toLowerCase()})},d(h,a(Y,{each:["winter","spring","summer","fall"],children:v=>(()=>{var _=t1(),x=_.firstChild,S=x.firstChild,k=S.nextSibling;return x.$$click=()=>i({season:v,year:+Gt(r("year"))}),d(S,()=>qe(v)),d(k,()=>Gt(r("year"))),L(()=>_.classList.toggle("selected",v===Gt(r("season")))),_})()}),m),y.$$click=()=>{const v=ir(Gt(r("season")),+Gt(r("year")),1);i({year:v.year,season:v.season.toLowerCase()})},h}})}}),a(j,{get children(){return[a(M,{get when(){var h;return(h=t.header)==null?void 0:h.match(/^(summer|fall|spring|winter)-\d+$/)},get children(){var h=Z$(),f=h.firstChild;return d(h,()=>qe(t.header.split("-")[0]),f),d(h,()=>t.header.split("-")[1],null),h}}),a(M,{get when(){return t.header==="this-season"},get children(){var h=Vi();return d(h,a(T,{get when(){return n.season||n.year},fallback:"Current season",get children(){return[N(()=>qe(Gt(r("season"))))," ",N(()=>Gt(r("year")))]}})),h}}),a(M,{get when(){return t.header==="next-season"},get children(){var h=Vi();return d(h,a(T,{get when(){return n.season||n.year},fallback:"Next season",get children(){return[N(()=>qe(Gt(r("season"))))," ",N(()=>Gt(r("year")))]}})),h}}),a(M,{get when(){return t.header==="tba"},get children(){return Q$()}}),a(M,{get when(){return t.header},get children(){var h=Vi();return d(h,()=>t.header),h}})]}}),N(()=>e.children),a(T,{get when(){var h;return(h=o())==null?void 0:h.filter(f=>!f.hidden)},children:h=>a(T,{get when(){return h().length},get children(){return["Tags:",(()=>{var f=n1(),g=f.firstChild,m=g.firstChild;return d(f,a(Y,{get each(){return h()},children:y=>a(T,{get when(){return!y.hidden},get children(){var v=r1(),_=v.firstChild;return _.$$click=()=>{const x={};We(y.url).forEach(S=>{const[k,...b]=S.split("="),A=b.join("=");x[k]=We(x[k]||n[k]).filter(w=>w!==A)}),We(y.addUrl).forEach(S=>{const[k,...b]=S.split("="),A=b.join("=");x[k]??(x[k]=We(n[k])),x[k].push(A)}),i(x)},d(_,()=>y.name),L(()=>v.classList.toggle("disabled",!!y.visuallyDisabled)),v}})}),g),m.$$click=()=>{n.malSearch==="true"?u("/search/"+t.type+"?malSearch=true"):u("/search/"+t.type)},f})()]}})}),a(Gd,{get children(){var h=e1();return d(h,a(j,{get children(){return[a(M,{get when(){return l()==="ani"},get children(){return a(j,{get children(){return[a(M,{get when(){var f;return((f=t.header)==null?void 0:f.match(/^(summer|fall|spring|winter)-\d+$/))||t.header==="this-season"||t.header==="next-season"},get children(){return[a(T,{get when(){var f;return(f=c().find(g=>g.key==="seasonYear"))==null?void 0:f.value},children:f=>a(T,{get when(){var g;return(g=c().find(m=>m.key==="season"))==null?void 0:g.value},children:g=>a(T,{get when(){return c().filter(m=>m.key==="format").length===0||c().some(m=>{var y;return m.key==="format"&&((y=m.value)==null?void 0:y.includes("TV"))})},get children(){return a($l,{page:1,get variables(){return c()},title:"Leftovers",groupCards:!1,get extraVariables(){return{seasonYear:ir(g(),+f(),-1).year,season:ir(g(),+f(),-1).season,episodeGreater:16,format:"TV"}}})}})})}),a($l,{page:1,get variables(){return c()},extraVariables:{sort:"FORMAT"}})]}}),a(M,{when:!0,get children(){return a(Hd,{nestLevel:1,page:1,get variables(){return c()}})}})]}})}}),a(M,{get when(){return l()==="mal"},get children(){return a(j,{get children(){return[a(M,{get when(){return s()==="anime"},get children(){return a(_l,{nestLevel:1,type:"anime",page:1,get variables(){return c()}})}}),a(M,{get when(){return s()==="manga"},get children(){return a(_l,{nestLevel:1,type:"manga",page:1,get variables(){return c()}})}})]}})}})]}})),h}})]}function c1(){xv()()}function Hd(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Il(),[r,i]=O(void 0),[l]=ae.anilist.searchMediaCache(t,n,e.page),[s]=ae.anilist.searchMedia(t,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O();return W(se(l,u=>u&&c(u.data.media))),W(se(s,u=>u&&c(u.data.media))),a(gn,{onIntersection:()=>i(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a(bl,{get data(){return o()}})},get loading(){return e.loading},children:u=>[a(bl,{get data(){return o()}}),a(T,{get when(){return s().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return s().data.media},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:h=>a(T,{when:u===!1,fallback:"Fetch cooldown",get children(){return a(Hd,{get variables(){return h()},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function $l(e){const t=Fe({groupCards:!0},e);F(t.page,"page is missing"),F(t.extraVariables,"extraVariables is missing");const{accessToken:n}=ie(),[r,i]=O(void 0),[l]=ae.anilist.searchMedia(n,()=>t.variables,t.page,()=>t.extraVariables);return W(se(l,s=>{s!=null&&s.data.pageInfo.hasNextPage&&i(t.variables)})),a(T,{get when(){return l()},get children(){return[a(T,{get when(){return N(()=>!!t.title)()&&l().data.media.length},get children(){var s=vl(),o=s.firstChild;return d(o,()=>t.title),s}}),a(j,{get children(){return[a(M,{get when(){return t.groupCards},get children(){return a(d1,{get data(){return l().data.media},get lastFormat(){return t.previousFormat||"Unknown format"}})}}),a(M,{get when(){return t.groupCards===!1},get children(){return a(bl,{get data(){return l().data.media}})}})]}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a($l,{get variables(){return r()},get extraVariables(){return t.extraVariables},get page(){return t.page+1},get previousFormat(){var s;return((s=l().data.media.at(-1))==null?void 0:s.format)||"Unknown format"}})}})]}})}const mo=new Set;function _l(e){const{accessToken:t}=ie(),{debouncedSearchVariables:n}=Il(),[r,i]=O(void 0),[l]=ae.myAnimeList.mediaSearchCache(e.type,n,e.page),[s]=ae.myAnimeList.mediaSearch(e.type,e.nestLevel===1?()=>e.variables:r,e.page),[o,c]=O(),u=N(m=>{var _;const y=new Set;(_=o())==null||_.forEach(x=>y.add(x.mal_id));const v=[...y.difference(mo)];return v.length?(v.forEach(x=>mo.add(x)),v):m||[]}),f=Pe(Zt,t,()=>({idMal_in:u(),type:e.type.toUpperCase()})),[g]=Qe(f);return W(se(g,m=>{var v;if(!((v=m==null?void 0:m.data)!=null&&v.length))return;const y=Object.fromEntries(Object.values(m.data).map(_=>[_.idMal,_]));_f(y)})),W(se(l,m=>m&&c(m.data.data))),W(se(s,m=>m&&c(m.data.data))),a(gn,{rootMargin:"200px",onIntersection:()=>i(e.variables),fetchResponse:s,get loadingElement(){return N(()=>!!o())()&&a(po,{get data(){return o()}})},get loading(){return e.loading},children:m=>[a(po,{get data(){return o()}}),a(T,{get when(){return s().data.pagination.has_next_page},get children(){return a(T,{get when(){return s().data.data},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:y=>a(T,{when:m===!1,fallback:"Fetch cooldown",get children(){return a(_l,{get variables(){return y()},get type(){return e.type},get page(){return e.page+1},get nestLevel(){return e.nestLevel+1},get loading(){return s.loading}})}})})}})}})]})}function po(e){const t=te();return a(Y,{get each(){return e.data},children:n=>a(ml,{media:n,get type(){return t.type}})})}function d1(e){return[a(T,{get when(){return e.data[0]&&e.lastFormat!==e.data[0].format},get children(){var t=vl(),n=t.firstChild;return d(n,()=>yr(e.data[0].format)||"Unknown format"),t}}),a(Y,{get each(){return e.data},children:(t,n)=>[a(T,{get when(){return N(()=>n()>0)()&&e.data[n()-1].format!==t.format},get children(){var r=vl(),i=r.firstChild;return d(i,()=>yr(t.format)),r}}),a(gi,{media:t})]})]}function bl(e){return a(Y,{get each(){return e.data},children:t=>a(gi,{media:t})})}_e(["input","click"]);var u1=p("<div data-k-f58f9d48>Error user not found"),h1=p("<img data-k-f58f9d48 class=banner alt=Banner>"),g1=p("<button data-k-f58f9d48>"),f1=p("<span data-k-f58f9d48 class=user-profile-following-badge>Follows you"),m1=p("<div data-k-f58f9d48 class=user-page><div data-k-f58f9d48 class=profile-banner-container><div data-k-f58f9d48 class=user-profile-container><img data-k-f58f9d48 class=profile alt=Profile><div data-k-f58f9d48 class=content><h2 data-k-f58f9d48><a data-k-f58f9d48 target=_blank></a></h2><p data-k-f58f9d48>Joined <! data-k-f58f9d48> (<! data-k-f58f9d48> days)</p></div></div></div><nav data-k-f58f9d48 class=profile-navigation><ul data-k-f58f9d48><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48></li><li data-k-f58f9d48>"),p1=p("<div data-k-f58f9d48 class=banner>");function v1(e){const t=te(),{accessToken:n}=ie(),[r,{mutateCache:i}]=ae.anilist.userByName(()=>t.name,n),l=s=>{i(o=>(o.data.isFollowing=s,r().data.isFollowing=s,o))};return W(se(r,s=>{s&&(document.title=`${s.data.name} profile - LOB`)})),a(hc.Provider,{value:{user:()=>r().data,following:l},get children(){return a(j,{get children(){return[a(M,{get when(){return N(()=>{var s;return!!((s=r())!=null&&s.data)})()&&(!r.loading||r().data.name===t.name)},get children(){return a($1,{get children(){return e.children}})}}),a(M,{get when(){var s;return(s=r())==null?void 0:s.error},get children(){return u1()}})]}})}})}function $1(e){const{user:t,following:n}=Ze(),{authUserData:r,accessToken:i}=ie(),[l,s]=O(t().isFollowing);return W(()=>{s(t().isFollowing)}),(()=>{var o=m1(),c=o.firstChild,u=c.firstChild,h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.firstChild,y=g.nextSibling,v=y.firstChild,_=v.nextSibling,x=_.nextSibling,S=x.nextSibling;S.nextSibling;var k=c.nextSibling,b=k.firstChild,A=b.firstChild,w=A.nextSibling,$=w.nextSibling,C=$.nextSibling,E=C.nextSibling,I=E.nextSibling;return d(c,a(T,{get when(){return t().bannerImage},get fallback(){return p1()},get children(){var P=h1();return L(()=>V(P,"src",t().bannerImage)),P}}),u),d(f,a(T,{get when(){var P;return t().id!==((P=r())==null?void 0:P.data.id)},get children(){var P=g1();return P.$$click=async()=>{s(U=>!U);const R=await ae.anilist.toggleFollow(i(),t().id);R.status===200?n(R.data.isFollowing):s(t().isFollowing)},d(P,a(T,{get when(){return l()},fallback:"Follow",children:"Following"})),P}}),g),d(m,()=>t().name),d(g,a(T,{get when(){return t().isFollower},get children(){return f1()}}),null),d(y,()=>ld(t().createdAt*1e3),_),d(y,()=>Math.floor((new Date-t().createdAt*1e3)/1e3/60/60/24),S),d(A,a(B,{href:"",children:"Overview"})),d(w,a(B,{href:"anime",children:"Anime list"})),d($,a(B,{href:"manga",children:"Manga list"})),d(C,a(B,{href:"favourites",children:"Favourites"})),d(E,a(B,{href:"stats",children:"Stats"})),d(I,a(B,{href:"socials",children:"Socials"})),d(o,()=>e.children,null),L(P=>{var R=t().options.profileColor,U=t().avatar.large,H="https://anilist.co/user/"+t().name;return R!==P.e&&((P.e=R)!=null?o.style.setProperty("--user-color",R):o.style.removeProperty("--user-color")),U!==P.t&&V(h,"src",P.t=U),H!==P.a&&V(m,"href",P.a=H),P},{e:void 0,t:void 0,a:void 0}),o})()}_e(["click"]);var _1=p("<p data-k-fa035f06 class=time>");function Gi(e){const t=te();return(()=>{var n=_1();return d(n,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[a(T,{get when(){return Math.floor(e.stats.minutesWatched/60/24)},children:r=>[N(()=>ye(r()))," day",N(()=>Oe(r()))," "]}),a(T,{get when(){return Math.floor(e.stats.minutesWatched/60%24)},children:r=>[N(()=>ye(r()))," hour",N(()=>Oe(r()))," "]}),a(T,{get when(){return e.stats.minutesWatched<60},get children(){return[N(()=>e.stats.minutesWatched)," minute",N(()=>Oe(e.stats.minutesWatched))]}})]}}),a(M,{get when(){return t.type==="manga"},get children(){return["Chapters read ",N(()=>ye(e.stats.chaptersRead))]}})]}})),n})()}var b1=p("<section data-k-9dc7c2b9 class=user-profile-stats-formats><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Format distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Status distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler></div></div><div data-k-9dc7c2b9><h2 data-k-9dc7c2b9>Country distribution</h2><ol data-k-9dc7c2b9></ol><div data-k-9dc7c2b9 class=filler>"),Hi=p("<li data-k-9dc7c2b9><div data-k-9dc7c2b9><div data-k-9dc7c2b9 class=container><p data-k-9dc7c2b9></p></div></div><div data-k-9dc7c2b9 class=right><p data-k-9dc7c2b9>%</p><p data-k-9dc7c2b9>/");function y1(e){const[t,n]=O(),r=te(),{user:i}=Ze();return W(()=>{n(e.formats.reduce((l,s)=>l+s.count,0))}),(()=>{var l=b1(),s=l.firstChild,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=h.nextSibling,g=u.nextSibling,m=g.firstChild,y=m.nextSibling;return d(c,a(Y,{get each(){return e.formats},children:v=>(()=>{var _=Hi(),x=_.firstChild,S=x.firstChild,k=S.firstChild,b=x.nextSibling,A=b.firstChild,w=A.firstChild,$=A.nextSibling,C=$.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"/?format="+v.format},get children(){return yr(v.format)}}),k),d(k,()=>v.meanScore||""),d(x,a(Gi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d($,()=>ye(v.count),C),d($,t,null),_})()})),d(f,a(Y,{get each(){return e.statuses},children:v=>(()=>{var _=Hi(),x=_.firstChild,S=x.firstChild,k=S.firstChild,b=x.nextSibling,A=b.firstChild,w=A.firstChild,$=A.nextSibling,C=$.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"?userStatus="+v.status},get children(){return a(j,{get fallback(){return qe(v.status)},get children(){return[a(M,{get when(){return v.status==="CURRENT"},get children(){return a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})}}),a(M,{get when(){return v.status==="REPEATING"},get children(){return a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})}})]}})}}),k),d(k,()=>v.meanScore||""),d(x,a(Gi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d($,()=>ye(v.count),C),d($,t,null),_})()})),d(y,a(Y,{get each(){return e.countries},children:v=>(()=>{var _=Hi(),x=_.firstChild,S=x.firstChild,k=S.firstChild,b=x.nextSibling,A=b.firstChild,w=A.firstChild,$=A.nextSibling,C=$.firstChild;return d(S,a(B,{class:"title",get href(){return"/user/"+i().name+"/"+r.type+"?countryOfOrigin="+v.country},get children(){return Cf(v.country)}}),k),d(k,()=>v.meanScore||""),d(x,a(Gi,{stats:v}),null),d(A,()=>(v.count/t()*100).toFixed(2),w),d($,()=>ye(v.count),C),d($,t,null),_})()})),l})()}var w1=p("<div data-k-9dd95ab0 class=scroll-line-chart>"),k1=p("<div data-k-9dd95ab0 class=scroll-bar-chart>");function S1(e){let t=0,n=0,r=NaN,i;return(()=>{var l=w1();l.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,i.style.userSelect="none",i.scrollTo(n-c,0)}else{i.style.userSelect=null,t=o.clientX,n=i.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(i.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var s=i;return typeof s=="function"?ue(s,l):i=l,d(l,()=>e.children),l})()}function Yd(e){let t=0,n=0,r=NaN,i;return(()=>{var l=k1();l.$$mousemove=o=>{if(o.buttons===1){o.preventDefault();const c=o.clientX-t;r=o.clientX,i.style.userSelect="none",i.scrollTo(n-c,0)}else{i.style.userSelect=null,t=o.clientX,n=i.scrollLeft;const c=o.clientX-r;if(r=NaN,Math.abs(c)>.1){const u=(h,f,g)=>{Math.abs(g)<.5||(i.scrollBy(-g*2,0),requestAnimationFrame(m=>u(h,m,g*(f-h<200?.99:.95))))};requestAnimationFrame(h=>u(h,h,c))}}};var s=i;return typeof s=="function"?ue(s,l):i=l,d(l,()=>e.children),l})()}_e(["mousemove"]);var C1=p("<button data-k-3e65cd93>Hours Watched"),x1=p("<button data-k-3e65cd93>Chapters Read"),A1=p("<ol data-k-3e65cd93>"),T1=p("<section data-k-3e65cd93><div data-k-3e65cd93 class=flex-space-between><h2 data-k-3e65cd93>Score distributions</h2><div data-k-3e65cd93><button data-k-3e65cd93>"),I1=p("<li data-k-3e65cd93><p data-k-3e65cd93></p><div data-k-3e65cd93></div><p data-k-3e65cd93>");function E1(e){const t=te(),[n,r]=O("count"),[i,l]=O(0);return W(()=>{const s=e.data.reduce((o,c)=>Math.max(o,c[n()]),0);l(s)}),(()=>{var s=T1(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=u.firstChild;return h.$$click=()=>r("count"),d(h,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(u,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var f=C1();return f.$$click=()=>r("minutesWatched"),f}}),a(M,{get when(){return t.type==="manga"},get children(){var f=x1();return f.$$click=()=>r("chaptersRead"),f}})]}}),null),d(s,a(Yd,{get children(){var f=A1();return d(f,a(Y,{get each(){return e.data},children:g=>(()=>{var m=I1(),y=m.firstChild,v=y.nextSibling,_=v.nextSibling;return d(y,()=>g.score),d(_,a(T,{get when(){return n()==="minutesWatched"},get fallback(){return ye(g[n()])},get children(){return ye(Math.ceil(g[n()]/60))}})),L(x=>(x=`${g[n()]/i()*85}%`)!=null?v.style.setProperty("height",x):v.style.removeProperty("height")),m})()})),f}}),null),s})()}_e(["click"]);var L1=p("<button data-k-d05f0288>Hours Watched"),P1=p("<button data-k-d05f0288>Chapters Read"),M1=p("<div data-k-d05f0288><button data-k-d05f0288></button><button data-k-d05f0288>Mean Score");function Tr(e){const t=te();return(()=>{var n=M1(),r=n.firstChild,i=r.nextSibling;return r.$$click=()=>e.setState("count"),d(r,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Titles Watched"}),a(M,{get when(){return t.type==="manga"},children:"Titles read"})]}})),d(n,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var l=L1();return l.$$click=()=>e.setState("minutesWatched"),l}}),a(M,{get when(){return t.type==="manga"},get children(){var l=P1();return l.$$click=()=>e.setState("chaptersRead"),l}})]}}),i),i.$$click=()=>e.setState("meanScore"),n})()}_e(["click"]);var D1=p("<ol data-k-614cd53d>"),R1=p("<section data-k-614cd53d><div data-k-614cd53d class=flex-space-between><h2 data-k-614cd53d>Episode count"),N1=p("<li data-k-614cd53d><p data-k-614cd53d class=no-wrap></p><div data-k-614cd53d></div><p data-k-614cd53d>");function O1(e){te();const[t,n]=O("count"),[r,i]=O(0);return W(()=>{const l=e.data.reduce((s,o)=>Math.max(s,o[t()]),0);i(l)}),(()=>{var l=R1(),s=l.firstChild;return s.firstChild,d(s,a(Tr,{setState:n}),null),d(l,a(Yd,{get children(){var o=D1();return d(o,a(Y,{get each(){return e.data},children:c=>(()=>{var u=N1(),h=u.firstChild,f=h.nextSibling,g=f.nextSibling;return d(h,()=>c.length||"Unknown"),d(g,a(T,{get when(){return t()==="minutesWatched"},get fallback(){return ye(c[t()])},get children(){return ye(Math.ceil(c[t()]/60))}})),L(m=>(m=`${c[t()]/r()*85}%`)!=null?f.style.setProperty("height",m):f.style.removeProperty("height")),u})()})),o}}),null),l})()}function F1(e){var i;const[t,n]=O(((i=e())==null?void 0:i.getBoundingClientRect().width)||0),r=()=>{var l;n(((l=e())==null?void 0:l.getBoundingClientRect().width)||0)};return W(se(e,r)),window.addEventListener("resize",r),Ye(()=>{window.removeEventListener("resize",r)}),t}var U1=p("<svg data-k-ecb119dc><path data-k-ecb119dc stroke=none stroke-width=0 fill=var(--background-350)></path><rect data-k-ecb119dc x=0 width=100% height=60 fill=var(--background-300) stroke=none pointer-events=all></rect><path data-k-ecb119dc stroke=black stroke-width=5 fill=transparent>"),B1=p("<section data-k-ecb119dc class=no-motion><div data-k-ecb119dc class=flex-space-between><h2 data-k-ecb119dc>"),V1=p("<svg data-k-ecb119dc><g data-k-ecb119dc class=item><rect data-k-ecb119dc y=0 height=100% fill=none stroke=none pointer-events=all></rect><circle data-k-ecb119dc r=6 pointer-events=none></circle><text data-k-ecb119dc fill=currentColor class=text y=0 text-anchor=middle></text><text data-k-ecb119dc fill=currentColor class=year y=304 text-anchor=middle></svg>",!1,!0,!1);function vo(e){let t;te();const[n,r]=O(0),i=F1(()=>t),[l,s]=O("count"),o=32,c=64,u=60,h=()=>Math.max(50,i()/e.data.length),f=v=>o+v*h(),g=v=>Math.ceil((1-v/n())*200+c);W(()=>{const v=e.data.reduce((_,x)=>Math.max(_,x[l()]),0);r(v)}),W(se(i,()=>{t==null||t.classList.add("no-motion"),setTimeout(()=>{t==null||t.classList.remove("no-motion")},100)}));const m=N(()=>e.data.map((_,x,S)=>x===0?"M"+f(x)+" "+g(_[l()]):x<S.length-1?"S"+wa(f(x),f(x-1),.35)+" "+wa(g(_[l()]),g(_[l()])+(g(S[x-1][l()])-g(S[x+1][l()]))/2,.35)+","+f(x)+" "+g(_[l()]):"S"+wa(f(x),f(x-1),.35)+" "+wa(g(_[l()]),g(S[x-1][l()]),.35)+","+f(x)+" "+g(_[l()])).join("")),y=N(()=>m()+"L"+f(e.data.length-1)+" "+g(0)+u+"L"+o+" "+g(0)+u);return a(T,{get when(){return e.data.length},get children(){var v=B1(),_=v.firstChild,x=_.firstChild,S=t;return typeof S=="function"?ue(S,v):t=v,d(x,()=>e.heading),d(_,a(Tr,{setState:s}),null),d(v,a(S1,{get children(){var k=U1(),b=k.firstChild,A=b.nextSibling,w=A.nextSibling;return d(k,a(Y,{get each(){return e.data},children:($,C)=>(()=>{var E=V1(),I=E.firstChild,P=I.nextSibling,R=P.nextSibling,U=R.nextSibling;return d(R,a(T,{get when(){return l()==="minutesWatched"},get fallback(){return ye($[l()])},get children(){return ye(Math.ceil($[l()]/60))}})),d(U,()=>$.releaseYear||$.startYear),L(H=>{var J=f(C())-h()/2,G=h(),q=f(C()),he=g($[l()]),Z=f(C()),X=`0 ${g($[l()])-10}px`,Q=f(C());return J!==H.e&&V(I,"x",H.e=J),G!==H.t&&V(I,"width",H.t=G),q!==H.a&&V(P,"cx",H.a=q),he!==H.o&&V(P,"cy",H.o=he),Z!==H.i&&V(R,"x",H.i=Z),X!==H.n&&((H.n=X)!=null?R.style.setProperty("translate",X):R.style.removeProperty("translate")),Q!==H.s&&V(U,"x",H.s=Q),H},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),E})()}),null),L($=>{var C=f(e.data.length-1)+o,E=g(0)+u,I=y(),P=g(0),R=m();return C!==$.e&&V(k,"width",$.e=C),E!==$.t&&V(k,"height",$.t=E),I!==$.a&&V(b,"d",$.a=I),P!==$.o&&V(A,"y",$.o=P),R!==$.i&&V(w,"d",$.i=R),$},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),k}}),null),v}})}var G1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"><path data-k-c7f2c6bd fill=currentColor d="M592 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h245.1v32h-160c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-160v-32H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h512v288z">'),H1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">'),Y1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z">'),j1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z">'),z1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">'),W1=p('<svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 576 512"><path data-k-c7f2c6bd fill=currentColor d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">'),q1=p('<section data-k-c7f2c6bd class=user-profile-stats-header-section><ul data-k-c7f2c6bd class=user-profile-stats-general-header><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Total </p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title></p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"><path data-k-c7f2c6bd fill=currentColor d="M109.25 173.25c24.99-24.99 24.99-65.52 0-90.51-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 25 25 65.52 25 90.51 0zm256 165.49c-24.99-24.99-65.52-24.99-90.51 0-24.99 24.99-24.99 65.52 0 90.51 24.99 24.99 65.52 24.99 90.51 0 25-24.99 25-65.51 0-90.51zm-1.94-231.43l-22.62-22.62c-12.5-12.5-32.76-12.5-45.25 0L20.69 359.44c-12.5 12.5-12.5 32.76 0 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.25 0l274.75-274.75c12.5-12.49 12.5-32.75 0-45.25z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Mean score</p></div></li><li data-k-c7f2c6bd><div data-k-c7f2c6bd class=svg-container><svg data-k-c7f2c6bd aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"><path data-k-c7f2c6bd fill=currentColor d="M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div><div data-k-c7f2c6bd class=right><p data-k-c7f2c6bd class=value></p><p data-k-c7f2c6bd class=title>Standard Deviation');function K1(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeStats(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(jd,{get stats(){return n().data}})}})}function J1(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userMangaStats(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(jd,{get stats(){return n().data}})}})}function jd(e){const t=te(),{user:n}=Ze();return[(()=>{var r=q1(),i=r.firstChild,l=i.firstChild,s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling;u.firstChild;var h=l.nextSibling,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.nextSibling,v=h.nextSibling,_=v.firstChild,x=_.nextSibling,S=x.firstChild,k=S.nextSibling,b=v.nextSibling,A=b.firstChild,w=A.nextSibling,$=w.firstChild,C=$.nextSibling,E=b.nextSibling,I=E.firstChild,P=I.nextSibling,R=P.firstChild,U=E.nextSibling,H=U.firstChild,J=H.nextSibling,G=J.firstChild;return d(s,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return G1()}}),a(M,{get when(){return t.type==="manga"},get children(){return H1()}})]}})),d(c,()=>ye(n().statistics[t.type].count||0)),d(u,()=>t.type,null),d(f,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return Y1()}}),a(M,{get when(){return t.type==="manga"},get children(){return j1()}})]}})),d(m,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return ye(n().statistics.anime.episodesWatched||0)}}),a(M,{get when(){return t.type==="manga"},get children(){return ye(n().statistics.manga.chaptersRead||0)}})]}})),d(y,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Episodes watched"}),a(M,{get when(){return t.type==="manga"},children:"Chapters read"})]}})),d(_,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return z1()}}),a(M,{get when(){return t.type==="manga"},get children(){return W1()}})]}})),d(S,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return((n().statistics.anime.minutesWatched||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){return n().statistics.manga.volumesRead||0}})]}})),d(k,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days watched"}),a(M,{get when(){return t.type==="manga"},children:"Volumes read"})]}})),d($,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var q;return((((q=e.stats.statuses.find(he=>he.status==="PLANNING"))==null?void 0:q.minutesWatched)||0)/60/24).toFixed(1)}}),a(M,{get when(){return t.type==="manga"},get children(){var q;return((q=e.stats.statuses.find(he=>he.status==="PLANNING"))==null?void 0:q.chaptersRead)||0}})]}})),d(C,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},children:"Days planned"}),a(M,{get when(){return t.type==="manga"},children:"Chapters planned"})]}})),d(R,()=>(n().statistics[t.type].meanScore||0).toFixed(2)),d(G,()=>(n().statistics[t.type].standardDeviation||0).toFixed(1)),r})(),a(E1,{get data(){return e.stats.scores.sort((r,i)=>r.score-i.score)}}),a(O1,{get data(){return e.stats.lengths.sort((r,i)=>(parseInt(r.length)||1/0)-(parseInt(i.length)||1/0))}}),a(y1,{get formats(){return e.stats.formats},get statuses(){return e.stats.statuses},get countries(){return e.stats.countries}}),a(vo,{heading:"Release year",get data(){return e.stats.releaseYears.sort((r,i)=>r.releaseYear-i.releaseYear)}}),a(vo,{heading:"Watch year",get data(){return e.stats.startYears.sort((r,i)=>r.startYear-i.startYear)}})]}var $o=p("<p data-k-3a6faa9d class=value>"),X1=p("<p data-k-3a6faa9d class=title>Time watched"),Z1=p("<p data-k-3a6faa9d class=title>Chapters read"),Q1=p("<ol data-k-3a6faa9d class=flex-space-between><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Count</p></li><li data-k-3a6faa9d><p data-k-3a6faa9d class=value></p><p data-k-3a6faa9d class=title>Mean score</p></li><li data-k-3a6faa9d>");function e_(e){const t=te();return(()=>{var n=Q1(),r=n.firstChild,i=r.firstChild,l=r.nextSibling,s=l.firstChild,o=l.nextSibling;return d(i,()=>ye(e.genre.count||0)),d(s,()=>e.genre.meanScore||0),d(o,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var c=$o();return d(c,a(T,{get when(){return Math.floor(e.genre.minutesWatched/60/24)},children:u=>[N(()=>ye(u()))," day",N(()=>Oe(u()))," "]}),null),d(c,a(T,{get when(){return Math.floor(e.genre.minutesWatched/60%24)},children:u=>[N(()=>ye(u()))," hour",N(()=>Oe(u()))," "]}),null),d(c,a(T,{get when(){return e.genre.minutesWatched<60},get children(){return[N(()=>e.genre.minutesWatched)," minute",N(()=>Oe(e.genre.minutesWatched))]}}),null),c})(),X1()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var c=$o();return d(c,()=>ye(e.genre.chaptersRead)),c})(),Z1()]}})]}})),n})()}var t_=p("<div data-k-ac00d55b class=inline-container><ol data-k-ac00d55b class=grid-reel-auto-fill>"),n_=p('<img data-k-ac00d55b class=cover-image alt="Media cover">'),r_=p("<li data-k-ac00d55b>"),a_=p("<div data-k-ac00d55b class=cover-image>");function i_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Zt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(se(()=>e.mediaIds,()=>{c=!0})),W(se(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=t_(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(Y,{get each(){return e.mediaIds},children:f=>(()=>{var g=r_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return a_()},get children(){var m=n_();return L(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var l_=p("<ol data-k-28186292 class=grid-column-auto-fill>"),s_=p("<li data-k-28186292 class=item><div data-k-28186292 class=header><div data-k-28186292 class=flex-space-between><h2 data-k-28186292></h2><p data-k-28186292 class=ranking>#</p></div></div><div data-k-28186292 class=wrapper><div data-k-28186292 class=flex-space-between><p data-k-28186292>User ");function o_(e){const t=te(),{user:n}=Ze();return(()=>{var r=l_();return d(r,a(Y,{get each(){return e.genres.sort((i,l)=>l[e.state()]-i[e.state()]||i.genre.localeCompare(l.genre))},children:(i,l)=>(()=>{var s=s_(),o=s.firstChild,c=o.firstChild,u=c.firstChild,h=u.nextSibling;h.firstChild;var f=o.nextSibling,g=f.firstChild,m=g.firstChild;return m.firstChild,d(u,a(B,{get href(){return"/search/"+t.type+"?onList=false&genre="+i.genre},get children(){return i.genre}})),d(h,()=>l()+1,null),d(o,a(e_,{genre:i}),null),d(m,()=>t.type,null),d(g,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?genre="+i.genre},children:"Show all"}),null),d(f,a(i_,{get store(){return e.store},get setStore(){return e.setStore},get mediaIds(){return i.mediaIds},get allMediaIds(){return e.mediaIds()},get mutate(){return e.mutate}}),null),s})()})),r})()}var c_=p("<section data-k-c1e76fe3 class=user-profile-stats-genres><div data-k-c1e76fe3 class=flex-space-between><h2 data-k-c1e76fe3>Genres");function d_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeGenres(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(zd,{get genres(){return n().data}})}})}function u_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userMangaGenres(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(zd,{get genres(){return n().data}})}})}function zd(e){const{accessToken:t}=ie(),[n,r]=O(new Set),[i,l]=O("count"),o=Pe(Zt,t,()=>({id_in:[...n()]})),[c,{mutate:u}]=Qe(o),[h,f]=je({});return W(se(()=>e.genres,g=>{r(m=>{const y=new Set(g.map(v=>v.mediaIds.slice(0,6)).flat());return y.difference(m).size?y:m})})),W(se(c,g=>{g==null||g.data.forEach(m=>f(m.id,m))})),(()=>{var g=c_(),m=g.firstChild;return m.firstChild,d(m,a(Tr,{setState:l}),null),d(g,a(o_,{get genres(){return e.genres},state:i,store:h,setStore:f,mediaIds:n,mutate:u}),null),g})()}var h_=p("<section data-k-c5aa48c0 class=user-profile-stats-genres><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0>Tags</h2></div><ol data-k-c5aa48c0 class=grid-column-auto-fill>"),_o=p("<p data-k-c5aa48c0 class=value>"),g_=p("<p data-k-c5aa48c0 class=title>Time watched"),f_=p("<p data-k-c5aa48c0 class=title>Chapters read"),m_=p('<li data-k-c5aa48c0 class=item><div data-k-c5aa48c0 class=header><div data-k-c5aa48c0 class=flex-space-between><h2 data-k-c5aa48c0></h2><p data-k-c5aa48c0 class=ranking>#</p></div><ol data-k-c5aa48c0 class=flex-space-between><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Count</p></li><li data-k-c5aa48c0><p data-k-c5aa48c0 class=value></p><p data-k-c5aa48c0 class=title>Mean score</p></li><li data-k-c5aa48c0></li></ol></div><div data-k-c5aa48c0 class="wrapper tags"><div data-k-c5aa48c0 class=flex-space-between><p data-k-c5aa48c0>User '),p_=p("<div data-k-c5aa48c0 class=inline-container><ol data-k-c5aa48c0 class=grid-reel-auto-fill>"),v_=p('<img data-k-c5aa48c0 class=cover-image alt="Media cover">'),$_=p("<li data-k-c5aa48c0>"),__=p("<div data-k-c5aa48c0 class=cover-image> ");function b_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeTags(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Wd,{get genres(){return n().data}})}})}function y_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userMangaTags(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Wd,{get genres(){return n().data}})}})}function Wd(e){const t=te(),{user:n}=Ze(),{accessToken:r}=ie(),[i,l]=O(new Set),[s,o]=O("count"),c=Pe(Zt,r,()=>({id_in:[...i()]})),[u,{mutate:h}]=Qe(c),[f,g]=je({});return W(se(()=>e.genres,m=>{l(y=>{const v=new Set(m.map(_=>_.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(se(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=h_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Tr,{setState:o}),null),d(v,a(Y,{get each(){return e.genres.sort((_,x)=>x[s()]-_[s()]||_.tag.name.localeCompare(x.tag.name))},children:(_,x)=>(()=>{var S=m_(),k=S.firstChild,b=k.firstChild,A=b.firstChild,w=A.nextSibling;w.firstChild;var $=b.nextSibling,C=$.firstChild,E=C.firstChild,I=C.nextSibling,P=I.firstChild,R=I.nextSibling,U=k.nextSibling,H=U.firstChild,J=H.firstChild;return J.firstChild,d(A,a(B,{get href(){return"/search/"+t.type+"?onList=false&tag="+_.tag.name},get children(){return _.tag.name}})),d(w,()=>x()+1,null),d(E,()=>ye(_.count||0)),d(P,()=>_.meanScore||0),d(R,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var G=_o();return d(G,a(T,{get when(){return Math.floor(_.minutesWatched/60/24)},children:q=>[N(()=>ye(q()))," day",N(()=>Oe(q()))," "]}),null),d(G,a(T,{get when(){return Math.floor(_.minutesWatched/60%24)},children:q=>[N(()=>ye(q()))," hour",N(()=>Oe(q()))," "]}),null),d(G,a(T,{get when(){return _.minutesWatched<60},get children(){return[N(()=>_.minutesWatched)," minute",N(()=>Oe(_.minutesWatched))]}}),null),G})(),g_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var G=_o();return d(G,()=>ye(_.chaptersRead)),G})(),f_()]}})]}})),d(J,()=>t.type,null),d(H,a(B,{get href(){return"/user/"+n().name+"/"+t.type+"?tag="+_.tag.name},children:"Show all"}),null),d(U,a(w_,{store:f,setStore:g,get mediaIds(){return _.mediaIds},get allMediaIds(){return i()},mutate:h}),null),S})()})),m})()}function w_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),l=Pe(Zt,n,()=>({id_in:[...r()]})),[s]=Qe(l);let o=!1;return W(se(()=>e.mediaIds,()=>{o=!0})),W(se(s,c=>{c==null||c.data.forEach(u=>e.setStore(u.id,u))})),(()=>{var c=p_(),u=c.firstChild;return u.addEventListener("scroll",()=>{if(!o)return;o=!1;const f=new Set(e.mediaIds).difference(e.allMediaIds);f.forEach(g=>e.allMediaIds.add(g)),i(f)}),d(u,a(Y,{get each(){return e.mediaIds},children:h=>(()=>{var f=$_();return d(f,a(B,{get href(){var g;return"/ani/"+t.type+"/"+h+"/"+Ke(((g=e.store[h])==null?void 0:g.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[h]},get fallback(){return __()},get children(){var g=v_();return L(()=>V(g,"src",e.store[h].coverImage.large)),g}})}})),f})()})),c})()}var k_=p("<section data-k-306b0b72 class=user-profile-stats-genres><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72>Studios</h2></div><ol data-k-306b0b72 class=grid-column-auto-fill>"),bo=p("<p data-k-306b0b72 class=value>"),S_=p("<p data-k-306b0b72 class=title>Time watched"),C_=p("<p data-k-306b0b72 class=title>Chapters read"),x_=p('<li data-k-306b0b72 class=item><div data-k-306b0b72 class=header><div data-k-306b0b72 class=flex-space-between><h2 data-k-306b0b72></h2><p data-k-306b0b72 class=ranking>#</p></div><ol data-k-306b0b72 class=flex-space-between><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Count</p></li><li data-k-306b0b72><p data-k-306b0b72 class=value></p><p data-k-306b0b72 class=title>Mean score</p></li><li data-k-306b0b72></li></ol></div><div data-k-306b0b72 class="wrapper tags">'),A_=p("<div data-k-306b0b72 class=inline-container><ol data-k-306b0b72 class=grid-reel-auto-fill>"),T_=p('<img data-k-306b0b72 class=cover-image alt="Media cover">'),I_=p("<li data-k-306b0b72>"),E_=p("<div data-k-306b0b72 class=cover-image> ");function L_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeStudios(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(P_,{get genres(){return n().data}})}})}function P_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O("count"),c=Pe(Zt,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=Qe(c),[f,g]=je({});return W(se(()=>e.genres,m=>{i(y=>{const v=new Set(m.map(_=>_.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(se(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=k_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Tr,{setState:s}),null),d(v,a(Y,{get each(){return e.genres.sort((_,x)=>x[l()]-_[l()]||_.studio.name.localeCompare(x.studio.name))},children:(_,x)=>(()=>{var S=x_(),k=S.firstChild,b=k.firstChild,A=b.firstChild,w=A.nextSibling;w.firstChild;var $=b.nextSibling,C=$.firstChild,E=C.firstChild,I=C.nextSibling,P=I.firstChild,R=I.nextSibling,U=k.nextSibling;return d(A,a(B,{get href(){return"/ani/studio/"+_.studio.id+"/"+Ke(_.studio.name)},get children(){return _.studio.name}})),d(w,()=>x()+1,null),d(E,()=>ye(_.count||0)),d(P,()=>_.meanScore||0),d(R,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var H=bo();return d(H,a(T,{get when(){return Math.floor(_.minutesWatched/60/24)},children:J=>[N(()=>ye(J()))," day",N(()=>Oe(J()))," "]}),null),d(H,a(T,{get when(){return Math.floor(_.minutesWatched/60%24)},children:J=>[N(()=>ye(J()))," hour",N(()=>Oe(J()))," "]}),null),d(H,a(T,{get when(){return _.minutesWatched<60},get children(){return[N(()=>_.minutesWatched)," minute",N(()=>Oe(_.minutesWatched))]}}),null),H})(),S_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var H=bo();return d(H,()=>ye(_.chaptersRead)),H})(),C_()]}})]}})),d(U,a(M_,{store:f,setStore:g,get mediaIds(){return _.mediaIds},get allMediaIds(){return r()},mutate:h})),S})()})),m})()}function M_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Zt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(se(()=>e.mediaIds,()=>{c=!0})),W(se(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=A_(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(Y,{get each(){return e.mediaIds},children:f=>(()=>{var g=I_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return E_()},get children(){var m=T_();return L(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}var D_=p("<button data-k-8711eb31>Time Watched"),R_=p("<button data-k-8711eb31>Chapters Read"),N_=p('<section data-k-8711eb31 class=user-profile-stats-genres><div data-k-8711eb31 class=flex-space-between><h2 data-k-8711eb31>Voice actors</h2><div data-k-8711eb31><button data-k-8711eb31>Anime</button><button data-k-8711eb31>Characters</button></div><div data-k-8711eb31><button data-k-8711eb31>Count</button><button data-k-8711eb31>Mean Score</button></div></div><ol data-k-8711eb31 class="grid-column-auto-fill staff">'),yo=p("<p data-k-8711eb31 class=value>"),O_=p("<p data-k-8711eb31 class=title>Time watched"),F_=p("<p data-k-8711eb31 class=title>Chapters read"),U_=p('<li data-k-8711eb31 class=item><div data-k-8711eb31 class="flex-space-between staff-name-wrapper"><h2 data-k-8711eb31></h2><p data-k-8711eb31 class=ranking>#</p></div><div data-k-8711eb31 class=inline-container><div data-k-8711eb31 class=main-content><img data-k-8711eb31 class=staff-cover alt="Staff profile cover"><ol data-k-8711eb31 class="flex-space-between stats"><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Count</p></li><li data-k-8711eb31><p data-k-8711eb31 class=value></p><p data-k-8711eb31 class=title>Mean score</p></li><li data-k-8711eb31></li></ol><div data-k-8711eb31 class=wrapper>'),B_=p("<div data-k-8711eb31 class=inline-container><ol data-k-8711eb31 class=grid-reel-auto-fill>"),V_=p('<img data-k-8711eb31 class=cover-image alt="Media cover">'),wo=p("<li data-k-8711eb31>"),ko=p("<div data-k-8711eb31 class=cover-image> "),G_=p('<img data-k-8711eb31 class=cover-image alt="Character cover">');function H_(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeVoiceActors(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(Y_,{get genres(){return n().data}})}})}function Y_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O(new Set),[o,c]=O("count"),[u,h]=O("media"),g=Pe(Zt,n,()=>u()==="media"?{id_in:[...r()]}:void 0),[m]=Qe(g),[y]=ae.anilist.characterIds(()=>l().size>0&&u()==="characters"?[...l()]:void 0,n),[v,_]=je({}),[x,S]=je({});return W(se(()=>e.genres,k=>{i(b=>{const A=new Set(k.map(w=>w.mediaIds.slice(0,6)).flat());return A.difference(b).size?A:b}),s(new Set(k.map(b=>b.characterIds.slice(0,6)).flat()))})),W(se(m,k=>{k==null||k.data.forEach(b=>_(b.id,b))})),W(se(y,k=>{k==null||k.data.forEach(b=>S(b.id,b))})),(()=>{var k=N_(),b=k.firstChild,A=b.firstChild,w=A.nextSibling,$=w.firstChild,C=$.nextSibling,E=w.nextSibling,I=E.firstChild,P=I.nextSibling,R=b.nextSibling;return $.$$click=()=>h("media"),C.$$click=()=>h("characters"),I.$$click=()=>c("count"),d(E,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){var U=D_();return U.$$click=()=>c("minutesWatched"),U}}),a(M,{get when(){return t.type==="manga"},get children(){var U=R_();return U.$$click=()=>c("chaptersRead"),U}})]}}),P),P.$$click=()=>c("meanScore"),d(R,a(Y,{get each(){return e.genres.sort((U,H)=>H[o()]-U[o()]||U.voiceActor.name.userPreferred.localeCompare(H.voiceActor.name.userPreferred))},children:(U,H)=>(()=>{var J=U_(),G=J.firstChild,q=G.firstChild,he=q.nextSibling;he.firstChild;var Z=G.nextSibling,X=Z.firstChild,Q=X.firstChild,pe=Q.nextSibling,ge=pe.firstChild,me=ge.firstChild,oe=ge.nextSibling,z=oe.firstChild,Je=oe.nextSibling,ft=pe.nextSibling;return d(q,a(B,{get href(){return"/ani/staff/"+U.voiceActor.id+"/"+Ke(U.voiceActor.name.userPreferred)},get children(){return U.voiceActor.name.userPreferred}})),d(he,()=>H()+1,null),d(me,()=>ye(U.count||0)),d(z,()=>U.meanScore||0),d(Je,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var Re=yo();return d(Re,a(T,{get when(){return Math.floor(U.minutesWatched/60/24)},children:et=>[N(()=>ye(et()))," day",N(()=>Oe(et()))," "]}),null),d(Re,a(T,{get when(){return Math.floor(U.minutesWatched/60%24)},children:et=>[N(()=>ye(et()))," hour",N(()=>Oe(et()))," "]}),null),d(Re,a(T,{get when(){return U.minutesWatched<60},get children(){return[N(()=>U.minutesWatched)," minute",N(()=>Oe(U.minutesWatched))]}}),null),Re})(),O_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var Re=yo();return d(Re,()=>ye(U.chaptersRead)),Re})(),F_()]}})]}})),d(ft,a(j_,{mediaStore:v,setMediaStore:_,characterStore:x,setCharacterStore:S,get pageType(){return u()},get mediaIds(){return U.mediaIds},get allMediaIds(){return r()},get characterIds(){return U.characterIds},get allCharacterIds(){return l()}})),L(()=>V(Q,"src",U.voiceActor.image.large)),J})()})),k})()}function j_(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O(new Set),c=Pe(Zt,n,()=>({id_in:[...r()]})),[u]=Qe(c),[h]=ae.anilist.characterIds(()=>l().size>0?[...l()]:void 0,n);let f,g=!1;W(()=>{e.mediaIds,e.characterIds,g=!0});let m=!1;return W(()=>{e.pageType,m=!0,g=!0,f.scrollLeft=0}),W(se(u,y=>{y==null||y.data.forEach(v=>e.setMediaStore(v.id,v))})),W(se(h,y=>{y==null||y.data.forEach(v=>e.setCharacterStore(v.id,v))})),(()=>{var y=B_(),v=y.firstChild;v.addEventListener("scroll",()=>{if(g){if(m){m=!1;return}if(g=!1,e.pageType==="media"){const S=new Set(e.mediaIds).difference(e.allMediaIds);S.forEach(k=>e.allMediaIds.add(k)),i(S)}else{const S=new Set(e.characterIds).difference(e.allCharacterIds);S.forEach(k=>e.allCharacterIds.add(k)),s(S)}}});var _=f;return typeof _=="function"?ue(_,v):f=v,d(v,a(j,{get children(){return[a(M,{get when(){return e.pageType==="media"},get children(){return a(Y,{get each(){return e.mediaIds},children:x=>(()=>{var S=wo();return d(S,a(B,{get href(){var k;return"/ani/"+t.type+"/"+x+"/"+Ke(((k=e.mediaStore[x])==null?void 0:k.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.mediaStore[x]},get fallback(){return ko()},get children(){var k=V_();return L(()=>V(k,"src",e.mediaStore[x].coverImage.large)),k}})}})),S})()})}}),a(M,{get when(){return e.pageType==="characters"},get children(){return a(Y,{get each(){return e.characterIds},children:x=>(()=>{var S=wo();return d(S,a(B,{get href(){var k;return"/ani/character/"+x+"/"+Ke(((k=e.characterStore[x])==null?void 0:k.name.userPreferred)||"")},get children(){return a(T,{get when(){return e.characterStore[x]},get fallback(){return ko()},get children(){var k=G_();return L(()=>V(k,"src",e.characterStore[x].image.large)),k}})}})),S})()})}})]}})),y})()}_e(["click"]);var z_=p('<section data-k-63df6417 class=user-profile-stats-genres><div data-k-63df6417 class=flex-space-between><h2 data-k-63df6417>Staff</h2></div><ol data-k-63df6417 class="grid-column-auto-fill staff">'),So=p("<p data-k-63df6417 class=value>"),W_=p("<p data-k-63df6417 class=title>Time watched"),q_=p("<p data-k-63df6417 class=title>Chapters read"),K_=p('<li data-k-63df6417 class=item><div data-k-63df6417 class="flex-space-between staff-name-wrapper"><h2 data-k-63df6417></h2><p data-k-63df6417 class=ranking>#</p></div><div data-k-63df6417 class=inline-container><div data-k-63df6417 class=main-content><img data-k-63df6417 class=staff-cover alt="Staff profile cover"><ol data-k-63df6417 class="flex-space-between stats"><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Count</p></li><li data-k-63df6417><p data-k-63df6417 class=value></p><p data-k-63df6417 class=title>Mean score</p></li><li data-k-63df6417></li></ol><div data-k-63df6417 class=wrapper>'),J_=p("<div data-k-63df6417 class=inline-container><ol data-k-63df6417 class=grid-reel-auto-fill>"),X_=p('<img data-k-63df6417 class=cover-image alt="Media cover">'),Z_=p("<li data-k-63df6417>"),Q_=p("<div data-k-63df6417 class=cover-image> ");function eb(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userAnimeStaff(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(qd,{get genres(){return n().data}})}})}function tb(){const e=te(),{accessToken:t}=ie(),[n]=ae.anilist.userMangaStaff(()=>e.name,t);return a(T,{get when(){return n()},get children(){return a(qd,{get genres(){return n().data}})}})}function qd(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),[l,s]=O("count"),c=Pe(Zt,n,()=>({id_in:[...r()]})),[u,{mutate:h}]=Qe(c),[f,g]=je({});return W(se(()=>e.genres,m=>{i(y=>{const v=new Set(m.map(_=>_.mediaIds.slice(0,6)).flat());return v.difference(y).size?v:y})})),W(se(u,m=>{m==null||m.data.forEach(y=>g(y.id,y))})),(()=>{var m=z_(),y=m.firstChild;y.firstChild;var v=y.nextSibling;return d(y,a(Tr,{setState:s}),null),d(v,a(Y,{get each(){return e.genres.sort((_,x)=>x[l()]-_[l()]||_.staff.name.userPreferred.localeCompare(x.staff.name.userPreferred))},children:(_,x)=>(()=>{var S=K_(),k=S.firstChild,b=k.firstChild,A=b.nextSibling;A.firstChild;var w=k.nextSibling,$=w.firstChild,C=$.firstChild,E=C.nextSibling,I=E.firstChild,P=I.firstChild,R=I.nextSibling,U=R.firstChild,H=R.nextSibling,J=E.nextSibling;return d(b,a(B,{get href(){return"/ani/staff/"+_.staff.id+"/"+Ke(_.staff.name.userPreferred)},get children(){return _.staff.name.userPreferred}})),d(A,()=>x()+1,null),d(P,()=>ye(_.count||0)),d(U,()=>_.meanScore||0),d(H,a(j,{get children(){return[a(M,{get when(){return t.type==="anime"},get children(){return[(()=>{var G=So();return d(G,a(T,{get when(){return Math.floor(_.minutesWatched/60/24)},children:q=>[N(()=>ye(q()))," day",N(()=>Oe(q()))," "]}),null),d(G,a(T,{get when(){return Math.floor(_.minutesWatched/60%24)},children:q=>[N(()=>ye(q()))," hour",N(()=>Oe(q()))," "]}),null),d(G,a(T,{get when(){return _.minutesWatched<60},get children(){return[N(()=>_.minutesWatched)," minute",N(()=>Oe(_.minutesWatched))]}}),null),G})(),W_()]}}),a(M,{get when(){return t.type==="manga"},get children(){return[(()=>{var G=So();return d(G,()=>ye(_.chaptersRead)),G})(),q_()]}})]}})),d(J,a(nb,{store:f,setStore:g,get mediaIds(){return _.mediaIds},get allMediaIds(){return r()},mutate:h})),L(()=>V(C,"src",_.staff.image.large)),S})()})),m})()}function nb(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(new Set),s=Pe(Zt,n,()=>({id_in:[...r()]})),[o]=Qe(s);let c=!1;return W(se(()=>e.mediaIds,()=>{c=!0})),W(se(o,u=>{u==null||u.data.forEach(h=>e.setStore(h.id,h))})),(()=>{var u=J_(),h=u.firstChild;return h.addEventListener("scroll",()=>{if(!c)return;c=!1;const g=new Set(e.mediaIds).difference(e.allMediaIds);g.forEach(m=>e.allMediaIds.add(m)),i(g)}),d(h,a(Y,{get each(){return e.mediaIds},children:f=>(()=>{var g=Z_();return d(g,a(B,{get href(){var m;return"/ani/"+t.type+"/"+f+"/"+Ke(((m=e.store[f])==null?void 0:m.title.userPreferred)||"")},get children(){return a(T,{get when(){return e.store[f]},get fallback(){return Q_()},get children(){var m=X_();return L(()=>V(m,"src",e.store[f].coverImage.large)),m}})}})),g})()})),u})()}const rb="_theme-container_4h5lo_1",ab="_header_4h5lo_5",ib="_details_4h5lo_11",lb="_play-button-container_4h5lo_16",sb="_play-button_4h5lo_16",ob="_spoiler_4h5lo_31",tr={themeContainer:rb,header:ab,details:ib,playButtonContainer:lb,playButton:sb,spoiler:ob};var cb=p("<video src controls autoplay>"),db=p("<div><h2>Themes"),ub=p("<p>"),hb=p("<div><div><p>"),gb=p("<p>Spoilers"),fb=p("<div><p>v</p><p>Ep: </p><div>"),mb=p("<div><button>play</button><span></span><span></span><span>");function pb(){const e=te(),[t]=Ae(),{anilistData:n}=hn(),r=cb(),i=Pe(rf,()=>({id:e.id,api:t.isMalId!=null?ja:e.api,type:e.type})),[l]=Qe(i);return W(()=>{e.id,e.api,e.type,r.src=""}),a(rt,{fallback:"AnimeThemes error",get children(){return a(T,{get when(){var s,o;return N(()=>!!l())()&&((o=(s=n())==null?void 0:s.data)==null?void 0:o.type)===Jh},get children(){var s=db();return s.firstChild,d(s,a(Y,{get each(){return l().data},children:o=>a(Kd,{theme:o,video:r})}),null),d(s,r,null),s}})}})}function Kd(e){F(e.video,"Missing video element for playback"),F(e.theme,"Theme data is missing");let t=!1;return a(rt,{fallback:"AnimeThemes row error",get children(){var n=hb(),r=n.firstChild,i=r.firstChild;return d(i,()=>e.theme.slug),d(r,a(T,{get when(){return e.theme.song},get children(){var l=ub();return d(l,()=>e.theme.song.title,null),d(l,a(j,{get children(){return[a(M,{get when(){return e.mainArtist},get children(){return a(T,{get when(){var s;return((s=e.theme.song.artists)==null?void 0:s.length)>1},children:" feat "})}}),a(M,{get when(){var s;return(s=e.theme.song.artists)==null?void 0:s.length},children:" by "})]}}),null),d(l,a(Y,{get each(){return e.theme.song.artists},children:s=>a(T,{get when(){return!e.mainArtist||s.slug!==e.mainArtist},get children(){return[a(T,{when:t,fallback:t=!0,children:" & "}),a(B,{get href(){return"/artist/"+s.slug},get children(){return s.name}})]}})}),null),l}}),null),d(n,a(Y,{get each(){return e.theme.animethemeentries},children:l=>(()=>{var s=fb(),o=s.firstChild;o.firstChild;var c=o.nextSibling;c.firstChild;var u=c.nextSibling;return d(o,()=>l.version||1,null),d(c,()=>l.episodes||"-",null),d(s,a(T,{get when(){return l.spoiler},get children(){var h=gb();return L(()=>h.className=tr.spoiler),h}}),u),d(u,a(Y,{get each(){return l.videos},children:h=>(()=>{var f=mb(),g=f.firstChild,m=g.nextSibling,y=m.nextSibling,v=y.nextSibling;return g.$$click=()=>e.video.src=h.link,d(m,()=>h.resolution),d(y,()=>h.source),d(v,()=>h.nc&&"NC"),L(()=>f.className=tr.playButton),f})()})),L(h=>{var f=tr.details,g=tr.playButtonContainer;return f!==h.e&&(s.className=h.e=f),g!==h.t&&(u.className=h.t=g),h},{e:void 0,t:void 0}),s})()}),null),L(l=>{var s=tr.themeContainer,o=tr.header;return s!==l.e&&(n.className=l.e=s),o!==l.t&&(r.className=l.t=o),l},{e:void 0,t:void 0}),n}})}_e(["click"]);const vb="_themes_1brzn_1",Co={themes:vb};var $b=p("<video src controls autoplay>"),_b=p("<h1>Artist"),bb=p("<p>"),yb=p("<img alt=Artist>"),xo=p("<div>"),wb=p('<img src=https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg alt="Artist missing">');function kb(){const e=te(),[t]=ae.animeThemes.artisBySlug(()=>e.name),n=$b();return document.title="Artist - LOB",[_b(),a(T,{get when(){return t()},get children(){return[(()=>{var r=bb();return d(r,()=>t().data.artist.name),r})(),a(T,{get when(){return t().data.artist.images.length},get fallback(){return wb()},get children(){var r=yb();return L(()=>V(r,"src",t().data.artist.images[0].link)),r}}),(()=>{var r=xo();return d(r,a(Y,{get each(){return t().data.artist.songs},children:i=>(()=>{var l=xo();return d(l,a(Y,{get each(){return i.animethemes},children:s=>a(Kd,{theme:s,video:n,get mainArtist(){return e.name}})})),L(()=>Rt(l,Co.episode)),l})()})),L(()=>Rt(r,Co.themes)),r})(),n]}})]}var Sb=p("<div class=notification-page><ol class=flex-space-between><li><button>All</button></li><li><button>Airing</button></li><li><button>Activity</button></li><li><button>Forum</button></li><li><button>Follows</button></li><li><button>Media"),Cb=p("<button>debug: "),xb=p("<ol class=notifications-container>"),Ab=p("<button>Refresh"),La=p('<img alt="Media cover">'),Yi=p("<div class=content><p>"),Tb=p("<div class=content>"),Ib=p("<li>");function Eb(){const[e,t]=O("all");return document.title="Notifications - LOB",(()=>{var n=Sb(),r=n.firstChild,i=r.firstChild,l=i.firstChild,s=i.nextSibling,o=s.firstChild,c=s.nextSibling,u=c.firstChild,h=c.nextSibling,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=g.nextSibling,v=y.firstChild;return l.$$click=()=>t("all"),o.$$click=()=>t("airing"),u.$$click=()=>t("activity"),f.$$click=()=>t("forum"),m.$$click=()=>t("follows"),v.$$click=()=>t("media"),d(n,a(Lb,{type:e}),null),n})()}function Lb(e){const{accessToken:t}=ie(),n=Pe(og,t,e.type),[r,{mutateBoth:i}]=Qe(n),l=c=>{var u,h;(h=(u=c==null?void 0:c.data)==null?void 0:u.notifications)!=null&&h.length&&i(f=>{var A,w,$;if(!((A=f==null?void 0:f.data)!=null&&A.length))return f.data=[c.data.notifications],f;const g=c.data.notifications.at(-1).id,m=cr(f.data[0],C=>C.id-g),y=((w=f.data[0][m])==null?void 0:w.id)===g;if(c.data.pageInfo.currentPage===1)return y?(f.data[0].splice(0,m+1,...c.data.notifications),f):(f.data.unshift(c.data.notifications),f.data.length=Math.min(f.data.length,5),f);const v=c.data.notifications[0].id,_=cr(f.data[0],C=>C.id-v);if(_===0&&f.data[0][_].id!==v||(f.data[0].splice(_,m-_+y,...c.data.notifications),y||f.data.length===1))return f;const S=cr(f.data[1],C=>C.id-g);if((($=f.data[1][S])==null?void 0:$.id)!==g)return f;const[b]=f.data.splice(1,1);return b.splice(0,S+1),f.data[0].push(...b),f})},[s,o]=Gl();return a(T,{get when(){return!r.loading},get children(){return[a(T,{get when(){return Cr},get children(){var c=Cb();return c.firstChild,c.$$click=()=>o(u=>!u),d(c,()=>""+s(),null),c}}),a(Pb,Fe({get cache(){var c,u;return((u=(c=r())==null?void 0:c.data)==null?void 0:u[0])||[]},updateCache:l,isDebug:s},e))]}})}function Pb(e){const{accessToken:t}=ie(),[n,r]=O(e.cache.length?void 0:1),i=Pe(Tc,t,e.type,n),[l]=Ul(e.isDebug,i);let s=0;const[o,c]=O(!1),[u,h]=O(!0),f=cd(h),g=new Set,m=Sn(nn,b=>!l.loading&&r(b),1e3);function y(){const b=v();b&&m(b)}function v(){var w,$;const b=Ce(o),A=Ce(u);if(x.has((w=e.cache.at(-1))==null?void 0:w.id)&&b)return Math.max(Math.floor(e.cache.length/15)+1,s+1);if(x.has(($=e.cache[0])==null?void 0:$.id)&&A)return 1;if(b){const C=[...x.difference(g)].sort((P,R)=>R-P);if(!C.length)return;const E=ra(C,.5),I=id(e.cache,P=>P.id-E);return I==-1?void 0:Math.ceil((I+1)/15)}}let _=0;W(se(l,b=>{var C,E,I,P,R;if(!((C=b==null?void 0:b.data)!=null&&C.notifications.length))return;b.data.notifications.forEach(U=>{g.add(U.id)});const A=((E=b.data.notifications[0])==null?void 0:E.createdAt)||0,w=((I=ra(b.data.notifications,.5))==null?void 0:I.createdAt)||A,$=Math.min(1e3*60*5,Math.max((A-w)*1e3,15e3));s=Math.max(s,b.data.pageInfo.currentPage),b.data.pageInfo.currentPage===1?(h(!1),c(!0),f($,!0),s=1):b.data.pageInfo.currentPage>e.cache.length/15&&(((P=b.data.notifications.at(-1))==null?void 0:P.id)>((R=e.cache.at(-1))==null?void 0:R.id)?_+=1:_=0,_>2&&(h(!0),c(!1),s=0,_=0)),e.updateCache(b),y()}));const x=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.id);F(Number.isInteger(w)),A.isIntersecting?x.add(w):x.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return Ye(()=>k.disconnect()),[a(T,{get when(){return N(()=>!!l.loading)()&&n()===1},get children(){return a(Hn,{class:"refresh",get children(){return a(Ct,{tipPosition:"bottom",get children(){return a(T,{get when(){return e.cache.length===0},fallback:"Fetching fresh notifications",children:"Loading notifications"})}})}})}}),(()=>{var b=xb();return d(b,a(Y,{get each(){return e.cache},children:A=>{let w;return xn(()=>k.observe(w)),(()=>{var $=Ib(),C=w;return typeof C=="function"?ue(C,$):w=$,d($,a(j,{get fallback(){return'Notification type "'+A.type+'" not supported.'},get children(){return[a(M,{get when(){return A.type==="RELATED_MEDIA_ADDITION"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var E=La();return L(()=>V(E,"src",A.media.coverImage.large)),E}}),(()=>{var E=Yi(),I=E.firstChild;return d(I,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(I,()=>A.context,null),d(E,a(Nn,{get createdAt(){return A.createdAt}}),null),E})()]}}),a(M,{get when(){return A.type==="AIRING"},get children(){return[a(B,{get href(){return Ve(A.media)},get children(){var E=La();return L(()=>V(E,"src",A.media.coverImage.large)),E}}),(()=>{var E=Yi(),I=E.firstChild;return d(I,()=>A.contexts[0],null),d(I,()=>A.episode,null),d(I,()=>A.contexts[1],null),d(I,a(B,{get href(){return Ve(A.media)},get children(){return A.media.title.userPreferred}}),null),d(I,()=>A.contexts[2],null),d(E,a(Nn,{get createdAt(){return A.createdAt}}),null),E})()]}}),a(M,{get when(){return A.type==="ACTIVITY_REPLY_LIKE"||A.type==="ACTIVITY_LIKE"||A.type==="ACTIVITY_REPLY"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var E=La();return L(()=>V(E,"src",A.user.avatar.large)),E}}),(()=>{var E=Tb();return d(E,a(B,{get href(){return"/activity/"+A.activityId},get children(){return[N(()=>A.user.name),N(()=>A.context)]}}),null),d(E,a(Nn,{get createdAt(){return A.createdAt}}),null),E})()]}}),a(M,{get when(){return A.type==="FOLLOWING"},get children(){return[a(B,{get href(){return"/user/"+A.user.name},get children(){var E=La();return L(()=>V(E,"src",A.user.avatar.large)),E}}),(()=>{var E=Yi(),I=E.firstChild;return d(I,a(B,{get href(){return"/user/"+A.user.name},get children(){return A.user.name}}),null),d(I,()=>A.context,null),d(E,a(Nn,{get createdAt(){return A.createdAt}}),null),E})()]}})]}})),L(()=>V($,"data-id",A.id)),$})()}})),L(()=>b.classList.toggle("loading",!!(l.loading&&n()===1))),b})(),a(j,{get children(){return[a(M,{get when(){return l.loading&&n()>s&&e.cache.length},get children(){return a(Hn,{class:"new",get children(){return a(Ct,{tipPosition:"bottom",children:"Loading notifications"})}})}}),a(M,{get when(){return!o()&&e.cache.length},get children(){return["Refresh notification feed to load more",(()=>{var b=Ab();return b.$$click=()=>r(1),b})()]}})]}})]}_e(["click"]);var Jd=p("<ol class=grid-column-auto-fill>"),Mb=p("<div class=entities-page>"),Db=p("<button>debug: "),Rb=p("<select name=roles id=roles>"),Nb=p("<option>"),Ob=p("<img class=entity-image alt=Character>"),Xd=p("<div class=content><p class=line-clamp></p><p>"),Fb=p('<p class="line-clamp small">'),Ub=p("<span class=role-notes>(<!>)"),Bb=p("<div class=content><p class=voice-actor-language>"),Vb=p('<img class=entity-image alt="Voice actor">'),Zd=p("<li class=entities-page-entity>"),Gb=p("<p class=line-clamp>"),Hb=p("<img class=entity-image alt=Staff>"),Yb=p('<li class="entities-page-entity loading"><div class=entity-left><div class=entity-image></div><div class=content><p class=line-clamp></p></div></div><div class=entity-right><div class=content><p class=line-clamp></p></div><div class=entity-image>');function jb(){const[e,t]=O(),[n]=ae.myAnimeList.animeCharactersById(e);return a(fi,{type:"CHARACTER",setIdMal:t,malData:n})}function zb(){const[e,t]=O(),[n]=ae.myAnimeList.mangaCharactersById(e);return a(fi,{type:"CHARACTER",setIdMal:t,malData:n})}function Wb(){const[e,t]=O(),[n]=ae.myAnimeList.animeStaffById(e);return a(fi,{type:"STAFF",setIdMal:t,malData:n})}function qb(){const[e,t]=O();return a(fi,{type:"STAFF",setIdMal:t})}function fi(e){const t=te();return(()=>{var n=Mb();return d(n,a(j,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(Kb,{})}}),a(M,{get when(){return e.type==="STAFF"},get children(){var r=Jd();return d(r,a(Qd,{get id(){return t.id},page:1,get setIdMal(){return e.setIdMal}})),r}})]}})),n})()}function ji(e,t,n,r){for(let i=e;i<=t;i++)n[r[i].id]=i;return n}function Kb(e){const t=te(),{accessToken:n}=ie(),r=Pe(cg,n,()=>t.id),[i,{mutateBoth:l}]=Qe(r),s=(u,h)=>{var f,g;(g=(f=u==null?void 0:u.data)==null?void 0:f.characters.edges)!=null&&g.length&&l(m=>{var y,v;if(!((v=(y=m==null?void 0:m.data)==null?void 0:y.items)!=null&&v.length))return m.data={items:u.data.characters.edges,indices:ji(0,u.data.characters.edges.length-1,{},u.data.characters.edges),roles:h},m;for(let _=0;_<u.data.characters.edges.length;_++){const x=u.data.characters.edges[_],S=_+(u.data.characters.pageInfo.currentPage-1)*u.data.characters.pageInfo.perPage,k=m.data.indices[x.id];if(x.id in m.data.indices){if(k<S)for(let b=k;b<S;b++)m.data.items[b]=m.data.items[b+1];else if(k>S)for(let b=S;b>k;b--)m.data.items[b]=m.data.items[b-1];m.data.items[S]=x,ji(Math.min(S,k),Math.max(S,k),m.data.indices,m.data.items)}else m.data.items.splice(S,0,x),ji(S,m.data.items.length-1,m.data.indices,m.data.items)}return m.data.roles=h,m})},[o,c]=Gl();return a(T,{get when(){return!i.loading},get children(){return[a(T,{get when(){return Cr},get children(){var u=Db();return u.firstChild,u.$$click=()=>c(h=>!h),d(u,()=>""+o(),null),u}}),a(Jb,Fe({get cache(){var u,h;return((h=(u=i())==null?void 0:u.data)==null?void 0:h.items)||[]},get roles(){var u,h;return((h=(u=i())==null?void 0:u.data)==null?void 0:h.roles)||[]},updateCache:s,isDebug:o},e))]}})}function Jb(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(e.cache.length?void 0:1),l=Pe(Ic,n,()=>t.id,r),[s]=Ul(e.isDebug,l),o=N(b=>{var A,w;return b&&((w=(A=s())==null?void 0:A.data)==null?void 0:w.characters.pageInfo.hasNextPage)!==!1},!0),[c,u]=O({language:"Japanese",dubGroup:null}),h=N(()=>{var b,A;return((A=(b=s())==null?void 0:b.data)==null?void 0:A.countryOfOrigin)||"JP"}),f=N(()=>{var A,w,$;if((($=(w=(A=s())==null?void 0:A.data)==null?void 0:w.characters)==null?void 0:$.pageInfo.currentPage)!==1)return e.roles;const b=new Map;for(const C of s().data.characters.edges)for(const E of C.voiceActorRoles){const I=E.voiceActor.language+E.dubGroup;b.has(I)===!1&&b.set(I,{language:E.voiceActor.language,dubGroup:E.dubGroup})}return[...b.values()]});L(()=>{if(f().length){const b=Hl(h()),A=f().findIndex($=>$.language===b),w=A!==-1?A:f().findIndex($=>$.language==="Japanese");u(f()[w===-1?0:w])}});const g=new Set,m=Sn(nn,b=>!s.loading&&i(b),1e3);function y(){const b=_();b&&m(b)}const v=25;function _(){const b=Ce(o),A=Math.ceil(e.cache.length/v);if(x.has(A)&&!g.has(A))return A;if(x.has(A)&&b&&g.has(A))return A+1;{const w=[...x.difference(g)].sort(($,C)=>C-$);return w.length?ra(w,.5):void 0}}W(se(s,b=>{var A;(A=b==null?void 0:b.data)!=null&&A.characters.edges.length&&(F(v===b.data.characters.pageInfo.perPage,"Page count is wrong"),g.add(b.data.characters.pageInfo.currentPage),e.updateCache(b,f()),y())}));const x=new Set,S=b=>{for(const A of b){const w=parseInt(A.target.dataset.page);F(Number.isInteger(w)),A.isIntersecting?x.add(w):x.delete(w)}y()},k=new IntersectionObserver(S,{rootMargin:"500px"});return Ye(()=>k.disconnect()),[a(T,{get when(){return f().length},get children(){var b=Rb();return b.addEventListener("change",A=>u(f()[A.target.value])),d(b,a(Y,{get each(){return f()},children:(A,w)=>(()=>{var $=Nb();return d($,()=>A.language,null),d($,a(T,{get when(){return A.dubGroup},get children(){return[" (",N(()=>A.dubGroup),")"]}}),null),L(()=>$.value=w()),$})()})),L(()=>b.value=f().findIndex(A=>A===c())),b}}),(()=>{var b=Jd();return d(b,a(Y,{get each(){return e.cache},children:(A,w)=>a(T,{get when(){return A.voiceActorRoles.filter($=>$.voiceActor.language===c().language&&$.dubGroup===c().dubGroup)},children:$=>a(T,{get when(){return $().length},get fallback(){return a(Ao,{edge:A,get page(){return Math.ceil((w()+1)/v)},intersectionObserver:k})},get children(){return a(Y,{get each(){return $()},children:C=>a(Ao,{edge:A,get i(){return w()},actorRole:C,get page(){return Math.ceil((w()+1)/v)},intersectionObserver:k})})}})})})),b})(),a(T,{get when(){return s.loading&&r()>Math.ceil(e.cache.length/v)&&e.cache.length},get children(){return a(Hn,{class:"new",get children(){return a(Ct,{tipPosition:"bottom",children:"Loading characters"})}})}})]}function Qd(e){const[t,n]=O(e.page===1?1:void 0),{accessToken:r}=ie(),[i]=ae.anilist.allMediaStaff(()=>e.id,t,r);return e.page===1&&W(()=>{i()&&e.setIdMal(i().data.idMal??void 0)}),a(gn,{onIntersection:()=>n(e.page),fetchResponse:i,get loadingElement(){return a(Zb,{})},get loading(){return e.loading},children:l=>[a(Y,{get each(){return i().data.staff.edges},children:s=>a(Xb,{edge:s})}),a(T,{get when(){return i().data.staff.pageInfo.hasNextPage},get children(){return a(T,{when:l===!1,fallback:"Fetch cooldown",get children(){return a(Qd,{get id(){return e.id},get page(){return e.page+1},get loading(){return i.loading}})}})}})]})}function Ao(e){let t;return xn(()=>e.intersectionObserver.observe(t)),(()=>{var n=Zd(),r=t;return typeof r=="function"?ue(r,n):t=n,d(n,a(B,{get href(){return"/ani/character/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var i=Ob();return L(()=>V(i,"src",e.edge.node.image.large)),i})(),(()=>{var i=Xd(),l=i.firstChild,s=l.nextSibling;return d(l,()=>e.edge.node.name.userPreferred),d(s,()=>qe(e.edge.role)),i})()]}}),null),d(n,a(T,{get when(){return e.actorRole},get children(){return a(B,{get href(){return"/ani/staff/"+e.actorRole.voiceActor.id},class:"entity-right",get children(){return[(()=>{var i=Bb(),l=i.firstChild;return d(i,a(T,{get when(){return e.actorRole.roleNotes},get fallback(){return(()=>{var s=Gb();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})()},get children(){return[(()=>{var s=Fb();return d(s,()=>e.actorRole.voiceActor.name.userPreferred),s})(),(()=>{var s=Ub(),o=s.firstChild,c=o.nextSibling;return c.nextSibling,d(s,()=>e.actorRole.roleNotes,c),s})()]}}),l),d(l,()=>e.actorRole.voiceActor.language),i})(),(()=>{var i=Vb();return L(()=>V(i,"src",e.actorRole.voiceActor.image.large)),i})()]}})}}),null),L(()=>V(n,"data-page",e.page)),n})()}function Xb(e){return(()=>{var t=Zd();return d(t,a(B,{get href(){return"/ani/staff/"+e.edge.node.id},class:"entity-left",get children(){return[(()=>{var n=Hb();return L(()=>V(n,"src",e.edge.node.image.large)),n})(),(()=>{var n=Xd(),r=n.firstChild,i=r.nextSibling;return d(r,()=>e.edge.node.name.userPreferred),d(i,()=>qe(e.edge.role)),n})()]}})),t})()}function Zb(){return a(Y,{get each(){return Array(3)},children:()=>Yb()})}_e(["click"]);var Qb=p('<svg aria-hidden=true class=svg-heart focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="-0.01 31.97 512.01 448.01"><path fill=currentColor d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">');function e0(){return Qb()}var t0=p('<svg class=svg-anilist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 2.95 24 18.1"><path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z">');function is(){return t0()}var n0=p('<svg class=svg-myanimelist stroke=currentColor fill=currentColor stroke-width=0 role=img xmlns=http://www.w3.org/2000/svg viewBox="0 7.19 24 9.63"><path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z">');function ls(){return n0()}var r0=p('<label class="cp-toggle-favourite-button flex-no-shrink"><input type=checkbox id=favourite-toggle name=favourite-toggle>'),a0=p("<div class=grid-center><span class=visually-hidden>Anilist favourites: "),i0=p("<div class=grid-center><span class=visually-hidden>MyAnimeList favourites: "),l0=p("<div class=flex-no-shrink>");function Ir(e){const{accessToken:t}=ie();let n=null;const r=ua(async(s,o,c)=>{if(c!==n){const u=await ae.anilist.toggleFavourite(s,o);Rl(u.fromCache,"Mutation should never be cached"),e.mutateCache(c,o)}n=c},500),i=()=>!e.idType||!e.onChange||!e.variableId||!e.mutateCache||!e.idType;return(()=>{var s=r0(),o=s.firstChild;return o.addEventListener("change",c=>{if(Ce(i))return;const u=e.idType;F(u==="MANGA"||u==="ANIME"||u==="STAFF"||u==="CHARACTER"||u==="STUDIO","Missing idType"),e.onChange(c.target.checked),r(t(),{[e.idType]:e.variableId},c.target.checked)}),d(s,a(e0,{}),null),d(s,a(l,{}),null),L(c=>{var u=!!i(),h=i();return u!==c.e&&s.classList.toggle("disabled",c.e=u),h!==c.t&&(o.disabled=c.t=h),c},{e:void 0,t:void 0}),L(()=>o.checked=e.checked),s})();function l(){const s=()=>"jikanValue"in e||e.jikanLoading,o=()=>"anilistValue"in e||e.anilistLoading;return a(T,{get when(){return s()||o()},get children(){var c=l0();return d(c,a(T,{get when(){return o()},get children(){var u=a0();return u.firstChild,d(u,a(is,{}),null),d(u,a(j,{get children(){return[a(M,{get when(){return e.anilistLoading},children:"..."}),a(M,{get when(){return e.anilistValue!=null},get children(){return Ys(e.anilistValue)}}),a(M,{get when(){return e.anilistValue==null},children:"N/A"})]}}),null),u}}),null),d(c,a(T,{get when(){return s()},get children(){var u=i0();return u.firstChild,d(u,a(ls,{}),null),d(u,a(j,{get children(){return[a(M,{get when(){return e.jikanLoading},children:"..."}),a(M,{get when(){return e.jikanValue!=null},get children(){return Ys(e.jikanValue)}}),a(M,{get when(){return e.jikanValue==null},children:"N/A"})]}}),null),u}}),null),c}})}}var s0=p("<li><strong>Birth:</strong> "),o0=p("<li><strong>Age:</strong> "),c0=p("<li><strong>Gender:</strong> "),d0=p("<li><strong>Active years: </strong>"),u0=p("<li><strong>Home town:</strong> "),h0=p("<li><strong>Blood type:</strong> "),Xa=p("<li>"),g0=p("<div class=entity-page-header><img class=cover><div class=row><h1></h1><p class=entity-page-alternative-names></p></div><ul class=description>"),f0=p("<form class=entity-page-form><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=CHAPTERS>CHAPTERS</option><option value=CHAPTERS_DESC>CHAPTERS_DESC</option><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=SEARCH_MATCH>SEARCH_MATCH</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=TYPE>TYPE</option><option value=TYPE_DESC>TYPE_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC</option><option value=VOLUMES>VOLUMES</option><option value=VOLUMES_DESC>VOLUMES_DESC"),m0=p("<div class=entity-page>"),p0=p("<select>"),v0=p("<details class=entity-page-details open><summary class=entity-page-summary><h2></h2><div><label><input type=checkbox> Show years</label></div></summary><ol class=grid-column-auto-fill>"),$0=p("<option>"),To=p("<li class=entity-page-grid-year-header><h3>"),eu=p("<img>"),ss=p("<div class=list-status>"),tu=p("<span class=role> "),os=p("<p>"),nu=p("<ol>"),_0=p("<li class=entity-page-media-voice-actor>"),ru=p("<span>"),Io=p("<span class=role> (<!>)"),b0=p('<img alt="Staff profile"class=background>'),au=p("<img alt=Character class=background>"),y0=p("<li><div class=entity-page-character-cover>");function w0(){const e=te(),{accessToken:t}=ie(),[n,{mutateCache:r}]=ae.anilist.characterInfoById(()=>e.id,t);return document.title="Character - LOB",a(iu,{type:"CHARACTER",entityInfo:n,mutateEntityInfoCache:r})}function k0(){const e=te(),{accessToken:t}=ie(),[n,{mutateCache:r}]=ae.anilist.staffInfoById(()=>e.id,t);return document.title="Staff - LOB",a(iu,{type:"STAFF",entityInfo:n,mutateEntityInfoCache:r})}function iu(e){te();const[t,n]=Ae(),r=Sn(nn,n,300),[i,l]=O(),[s,o]=O(!1);return W(se(e.entityInfo,c=>{o(c==null?void 0:c.data.isFavourite)})),W(()=>{l({onList:t.list?t.list==="true":void 0,sort:t.sort})}),(()=>{var c=m0();return d(c,a(T,{get when(){return e.entityInfo()},get children(){return[(()=>{var u=g0(),h=u.firstChild,f=h.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling;return d(g,()=>e.entityInfo().data.name.userPreferred),d(m,()=>[...We(e.entityInfo().data.name.native),...We(e.entityInfo().data.name.alternative)].join(", ")),d(f,a(Ir,{get checked(){return s()},get idType(){return e.type},get variableId(){return e.entityInfo().data.id},get anilistValue(){return e.entityInfo().data.favourites},onChange:o,mutateCache:v=>{e.entityInfo().data.isFavourite=v,e.mutateEntityInfoCache(_=>_)}}),null),d(y,a(T,{get when(){return za(e.entityInfo().data.dateOfBirth)},get children(){var v=s0(),_=v.firstChild;return _.nextSibling,d(v,()=>za(e.entityInfo().data.dateOfBirth),null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.age},get children(){var v=o0(),_=v.firstChild;return _.nextSibling,d(v,()=>e.entityInfo().data.age,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.gender},get children(){var v=c0(),_=v.firstChild;return _.nextSibling,d(v,()=>e.entityInfo().data.gender,null),v}}),null),d(y,a(T,{get when(){var v;return(v=e.entityInfo().data.yearsActive)==null?void 0:v.length},get children(){var v=d0();return v.firstChild,d(v,()=>e.entityInfo().data.yearsActive.join("-"),null),d(v,a(j,{get children(){return[a(M,{get when(){var _;return N(()=>{var x;return!!((x=e.entityInfo().data.dateOfDeath)!=null&&x.year)})()&&e.entityInfo().data.yearsActive.at(-1)!==((_=e.entityInfo().data.dateOfDeath)==null?void 0:_.year)},get children(){return["-",N(()=>e.entityInfo().data.dateOfDeath.year)]}}),a(M,{get when(){var _;return((_=e.entityInfo().data.dateOfDeath)==null?void 0:_.year)==null},children:"-Present"})]}}),null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.homeTown},get children(){var v=u0(),_=v.firstChild;return _.nextSibling,d(v,()=>e.entityInfo().data.homeTown,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.bloodType},get children(){var v=h0(),_=v.firstChild;return _.nextSibling,d(v,()=>e.entityInfo().data.bloodType,null),v}}),null),d(y,a(T,{get when(){return e.entityInfo().data.description},get children(){var v=Xa();return d(v,a(es,{get children(){return e.entityInfo().data.description}})),v}}),null),L(v=>{var _=e.entityInfo().data.image.large,x=qe(e.type)+" profile";return _!==v.e&&V(h,"src",v.e=_),x!==v.t&&V(h,"alt",v.t=x),v},{e:void 0,t:void 0}),u})(),(()=>{var u=f0(),h=u.firstChild,f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.nextSibling,v=y.firstChild,_=h.nextSibling,x=_.firstChild,S=x.nextSibling,k=S.nextSibling,b=k.nextSibling,A=b.nextSibling,w=A.nextSibling,$=w.nextSibling,C=$.nextSibling,E=C.nextSibling,I=E.nextSibling,P=I.nextSibling,R=P.nextSibling,U=R.nextSibling,H=U.nextSibling,J=H.nextSibling,G=J.nextSibling,q=G.nextSibling,he=q.nextSibling,Z=he.nextSibling,X=Z.nextSibling,Q=X.nextSibling;return u.addEventListener("submit",pe=>pe.preventDefault()),g.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),v.addEventListener("change",pe=>r({list:pe.target.checked?pe.target.value:void 0})),_.addEventListener("change",pe=>r({sort:pe.target.value})),L(()=>g.checked=t.list==="false"),L(()=>v.checked=t.list==="true"),L(()=>G.value=e.type==="CHARACTER"&&t.sort!=="POPULARITY_DESC"?"":"POPULARITY_DESC"),L(()=>Q.value=e.type==="STAFF"&&t.sort!=="START_DATE_DESC"?"":"START_DATE_DESC"),L(()=>_.value=t.sort||""),u})()]}}),null),d(c,a(j,{get children(){return[a(M,{get when(){return e.type==="STAFF"},get children(){return[a(Pa,{get variables(){return i()},type:"CHARACTER",showYears:!0,title:"Characters"}),a(Pa,{get variables(){return i()},type:"ANIME",title:"Anime staff roles"}),a(Pa,{get variables(){return i()},type:"MANGA",title:"Manga staff roles"})]}}),a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(Pa,{get variables(){return i()},type:"MEDIA",title:"Media entries"})}})]}}),null),c})()}function Pa(e){F(e.title,"title missing"),F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(e.showYears||!1),[r,i]=O(!1),[l,s]=O([]),[o,c]=O(["Japanese"]);return e.type==="MEDIA"&&W(()=>{l().length&&c(l().find(u=>u==="Japanese")||l().find(u=>u==="Chinese")||l()[0])}),(()=>{var u=v0(),h=u.firstChild,f=h.firstChild,g=f.nextSibling,m=g.firstChild,y=m.firstChild,v=h.nextSibling;return d(f,()=>e.title),y.addEventListener("change",_=>{_.preventDefault(),n(_.target.checked)}),d(g,a(T,{get when(){return N(()=>e.type==="MEDIA")()&&l().length},get children(){var _=p0();return _.$$input=x=>c(x.target.value),d(_,a(Y,{get each(){return l()},children:x=>(()=>{var S=$0();return S.value=x,d(S,x),S})()})),L(()=>_.value=o()),_}}),null),d(v,a(j,{get children(){return[a(M,{get when(){return e.type==="CHARACTER"},get children(){return a(su,{setVisible:i,get variables(){return e.variables},showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="ANIME"},get children(){return a(yl,{setVisible:i,get variables(){return e.variables},type:"ANIME",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MANGA"},get children(){return a(yl,{setVisible:i,get variables(){return e.variables},type:"MANGA",showYears:t,nestLevel:1})}}),a(M,{get when(){return e.type==="MEDIA"},get children(){return a(lu,{setVisible:i,get variables(){return e.variables},showYears:t,setLanguages:s,language:o,nestLevel:1})}})]}})),L(()=>u.classList.toggle("hidden",!r())),L(()=>y.checked=t()),u})()}function lu(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=ae.anilist.characterMediaById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(se(l,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0);const o=new Set;for(const c of(s==null?void 0:s.data.edges)||[])for(const u of c.voiceActorRoles)o.add(u.voiceActor.language);e.setLanguages([...o])})),a(gn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:s=>[a(S0,{get language(){return e.language},get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:o=>a(T,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(lu,{get variables(){var c;return{...o(),page:(((c=o())==null?void 0:c.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function su(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=ae.anilist.staffCharactersById(n,()=>t.id,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(se(l,s=>{e.setVisible((s==null?void 0:s.data.edges.length)>0)})),a(gn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:s=>[a(x0,{get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l().data.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:o=>a(T,{when:s===!1,fallback:"Fetch cooldown",get children(){return a(su,{get variables(){var c;return{...o(),characterPage:(((c=o())==null?void 0:c.characterPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get loading(){return l.loading}})}})})}})}})]})}function yl(e){F(e.type,"Type is missing"),F(e.nestLevel,"nestLevel is missing");const t=te(),{accessToken:n}=ie(),[r,i]=O(void 0),[l,{mutate:s}]=ae.anilist.staffMediaById(n,()=>t.id,e.type,e.nestLevel===1?()=>e.variables:r);return e.nestLevel===1&&W(se(l,o=>{e.setVisible((o==null?void 0:o.data.edges.length)>0)})),W(se(l,o=>{if(!e.lastMediaId||!(o!=null&&o.data.edges.length))return;const c=structuredClone(o.data.edges),u=[];for(const h of o.data.edges){if(h.node.id!==e.lastMediaId)break;u.push(c.shift())}u.length!==0&&(e.mutate(h=>(h.data.edges=[...h.data.edges,...u],{...h})),s(h=>(h.data.edges=c,{...h})))})),a(gn,{onIntersection:()=>i(e.variables),fetchResponse:l,get loading(){return e.loading},children:o=>[a(C0,{get edges(){return l().data.edges},get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return e.variables},get keyed(){return e.nestLevel===1},get children(){return a(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return a(yl,{get variables(){var c;return{...e.variables,staffPage:(((c=e.variables)==null?void 0:c.staffPage)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},mutate:s,get type(){return e.type},get lastYearGroup(){var c,u;return((u=(c=l().data.edges.at(-1))==null?void 0:c.node.startDate)==null?void 0:u.year)||"TBA"},get lastMediaId(){var c;return(c=l().data.edges.at(-1))==null?void 0:c.node.id},get loading(){return l.loading}})}})}})}})]})}function cs(e){return a(T,{get when(){return e.showYears()},get children(){return a(j,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=To(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=To(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function S0(e){return F(e.showYears,"showYears signal is missing"),F(e.language,"language signal is missing"),a(Y,{get each(){return e.edges},children:(t,n)=>[a(cs,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),a(T,{get when(){return t.voiceActorRoles.filter(r=>r.voiceActor.language===e.language())},children:r=>(()=>{var i=_0();return d(i,a(B,{get href(){return Ve(t.node)},get children(){var l=eu();return L(s=>{var o=t.node.coverImage.large,c=qe(t.node.type)+" cover";return o!==s.e&&V(l,"src",s.e=o),c!==s.t&&V(l,"alt",s.t=c),s},{e:void 0,t:void 0}),l}}),null),d(i,a(B,{get href(){return Ve(t.node)},get children(){var l=os();return d(l,a(T,{get when(){var s;return(s=t.node.mediaListEntry)==null?void 0:s.status},get children(){var s=ss();return L(()=>V(s,"data-status",t.node.mediaListEntry.status)),s}}),null),d(l,()=>t.node.title.userPreferred,null),d(l,a(T,{get when(){return t.characterRole},get children(){var s=tu();return s.firstChild,d(s,()=>qe(t.characterRole),null),s}}),null),l}}),null),d(i,a(T,{get when(){return r().length},get children(){var l=nu();return d(l,a(Y,{get each(){return r()},children:s=>(()=>{var o=Xa();return d(o,a(B,{class:"actor",get href(){return"/ani/staff/"+s.voiceActor.id+"/"+Ke(s.voiceActor.name.userPreferred)},get children(){return[(()=>{var c=ru();return d(c,()=>s.voiceActor.name.userPreferred),c})(),a(T,{get when(){return s.roleNotes},get children(){var c=Io(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>s.roleNotes,h),c}}),a(T,{get when(){return s.dubGroup},get children(){var c=Io(),u=c.firstChild,h=u.nextSibling;return h.nextSibling,d(c,()=>s.dubGroup,h),c}}),(()=>{var c=b0();return L(()=>V(c,"src",s.voiceActor.image.large)),c})()]}})),o})()})),l}}),null),i})()})]})}function C0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{const i=n.at(-1);return(i==null?void 0:i.node.id)!==r.node.id?(r.staffRoles=[r.staffRole],n.push(r)):i!=null&&i.staffRoles&&i.staffRoles.push(r.staffRole),n};return a(Y,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(cs,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),(()=>{var i=Xa();return d(i,a(B,{get href(){return Ve(n.node)},get children(){return[(()=>{var l=au();return L(()=>V(l,"src",n.node.coverImage.large)),l})(),(()=>{var l=os();return d(l,a(T,{get when(){var s;return(s=n.node.mediaListEntry)==null?void 0:s.status},get children(){var s=ss();return L(()=>V(s,"data-status",n.node.mediaListEntry.status)),s}}),null),d(l,()=>n.node.title.userPreferred,null),l})(),a(T,{get when(){return n.staffRoles},get children(){var l=nu();return d(l,a(Y,{get each(){return n.staffRoles},children:s=>(()=>{var o=Xa();return d(o,s),o})()})),l}})]}})),i})()]})}function x0(e){return F(e.showYears,"showYears signal is missing"),a(Y,{get each(){return e.edges},children:(t,n)=>a(Y,{get each(){return t.characters},children:r=>a(T,{when:r,get children(){return[a(cs,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:t,get edges(){return e.edges},index:n}),(()=>{var i=y0(),l=i.firstChild;return d(l,a(B,{get href(){return"/ani/character/"+r.id+"/"+Ke(r.name.userPreferred)},get children(){var s=au();return L(()=>V(s,"src",r.image.large)),s}}),null),d(l,a(B,{class:"media",get href(){return Ve(t.node)},get children(){var s=eu();return L(o=>{var c=t.node.coverImage.large,u=qe(t.node.type)+" cover";return c!==o.e&&V(s,"src",o.e=c),u!==o.t&&V(s,"alt",o.t=u),o},{e:void 0,t:void 0}),s}}),null),d(i,a(B,{get href(){return"/ani/character/"+r.id+"/"+Ke(r.name.userPreferred)},get children(){return[(()=>{var s=ru();return d(s,()=>r.name.userPreferred),s})(),(()=>{var s=tu();return s.firstChild,d(s,()=>qe(t.characterRole),null),s})()]}}),null),d(i,a(B,{get href(){return Ve(t.node)},get children(){var s=os();return d(s,a(T,{get when(){var o;return(o=t.node.mediaListEntry)==null?void 0:o.status},get children(){var o=ss();return L(()=>V(o,"data-status",t.node.mediaListEntry.status)),o}}),null),d(s,()=>t.node.title.userPreferred,null),s}}),null),i})()]}})})})}_e(["input"]);var A0=p("<div class=flex-space-between><h1>"),T0=p("<form><label><input type=checkbox> Show years</label><div><label><input type=checkbox name=list value=false> Hide from my list</label><br><label><input type=checkbox name=list value=true> Only show my list</label></div><select name=sort><option value=DURATION>DURATION</option><option value=DURATION_DESC>DURATION_DESC</option><option value=END_DATE>END_DATE</option><option value=END_DATE_DESC>END_DATE_DESC</option><option value=EPISODES>EPISODES</option><option value=EPISODES_DESC>EPISODES_DESC</option><option value=FAVOURITES>FAVOURITES</option><option value=FAVOURITES_DESC>FAVOURITES_DESC</option><option value=FORMAT>FORMAT</option><option value=FORMAT_DESC>FORMAT_DESC</option><option value=ID>ID</option><option value=ID_DESC>ID_DESC</option><option value=POPULARITY>POPULARITY</option><option value=POPULARITY_DESC>POPULARITY_DESC</option><option value=SCORE>SCORE</option><option value=SCORE_DESC>SCORE_DESC</option><option value=START_DATE>START_DATE</option><option>START_DATE_DESC</option><option value=STATUS>STATUS</option><option value=STATUS_DESC>STATUS_DESC</option><option value=TITLE_ENGLISH>TITLE_ENGLISH</option><option value=TITLE_ENGLISH_DESC>TITLE_ENGLISH_DESC</option><option value=TITLE_NATIVE>TITLE_NATIVE</option><option value=TITLE_NATIVE_DESC>TITLE_NATIVE_DESC</option><option value=TITLE_ROMAJI>TITLE_ROMAJI</option><option value=TITLE_ROMAJI_DESC>TITLE_ROMAJI_DESC</option><option value=TRENDING>TRENDING</option><option value=TRENDING_DESC>TRENDING_DESC</option><option value=UPDATED_AT>UPDATED_AT</option><option value=UPDATED_AT_DESC>UPDATED_AT_DESC"),I0=p("<ol class=grid-column-auto-fill>"),E0=p("<div class=studio-page>"),Eo=p("<li class=grid-full-span><h3>");function L0(){const e=te(),{accessToken:t}=ie(),[n,r]=Ae(),i=Sn(nn,r,300),[l,s]=O(),[o,c]=O(!0),[u,{mutateCache:h}]=ae.anilist.studioInfoAndMediaById(()=>e.id,l,t);document.title="Studio - LOB";const[f,g]=O(!1);return W(se(u,m=>{g(m==null?void 0:m.data.isFavourite)})),W(()=>{s({onList:n.list?n.list==="true":void 0,sort:n.sort})}),(()=>{var m=E0();return d(m,a(T,{get when(){return u()},get children(){return[(()=>{var y=A0(),v=y.firstChild;return d(v,()=>u().data.name),d(y,a(Ir,{get checked(){return f()},get variableId(){return e.id},idType:"STUDIO",get anilistValue(){return u().data.favourites},onChange:g,mutateCache:_=>{u().data.isFavourite=_,h(x=>x)}}),null),y})(),(()=>{var y=T0(),v=y.firstChild,_=v.firstChild,x=v.nextSibling,S=x.firstChild,k=S.firstChild,b=S.nextSibling,A=b.nextSibling,w=A.firstChild,$=x.nextSibling,C=$.firstChild,E=C.nextSibling,I=E.nextSibling,P=I.nextSibling,R=P.nextSibling,U=R.nextSibling,H=U.nextSibling,J=H.nextSibling,G=J.nextSibling,q=G.nextSibling,he=q.nextSibling,Z=he.nextSibling,X=Z.nextSibling,Q=X.nextSibling,pe=Q.nextSibling,ge=pe.nextSibling,me=ge.nextSibling,oe=me.nextSibling;return y.addEventListener("submit",z=>z.preventDefault()),_.addEventListener("change",z=>c(z.target.checked)),k.addEventListener("change",z=>i({list:z.target.checked?z.target.value:void 0})),w.addEventListener("change",z=>i({list:z.target.checked?z.target.value:void 0})),$.addEventListener("change",z=>i({sort:z.target.value})),L(()=>_.checked=o()),L(()=>k.checked=n.list==="false"),L(()=>w.checked=n.list==="true"),L(()=>oe.value=n.sort==="START_DATE_DESC"?"START_DATE_DESC":""),L(()=>$.value=n.sort||""),y})(),a(Gd,{get children(){var y=I0();return d(y,a(ou,{get variables(){return l()},studioInfo:u,showYears:o,nestLevel:1})),y}})]}})),m})()}function ou(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(void 0),[l]=ae.anilist.studioInfoAndMediaById(()=>t.id,e.nestLevel===1?void 0:r,n),s=e.studioInfo||l;return a(gn,{onIntersection:()=>i(e.variables),fetchResponse:s,get loading(){return e.loading},children:o=>[a(M0,{get edges(){return s().data.media.edges},get showYears(){return e.showYears},get lastMediaId(){return e.lastMediaId},get lastYearGroup(){return e.lastYearGroup}}),a(T,{get when(){return s().data.media.pageInfo.hasNextPage},get children(){return a(T,{get when(){return s().data.media.edges},get keyed(){return e.nestLevel===1},get children(){return a(T,{get when(){return e.variables},children:c=>a(T,{when:o===!1,fallback:"Fetch cooldown",get children(){return a(ou,{get variables(){var u;return{...c(),page:(((u=c())==null?void 0:u.page)||1)+1}},get nestLevel(){return e.nestLevel+1},get showYears(){return e.showYears},get language(){return e.language},get lastMediaId(){var u;return(u=s().data.media.edges.at(-1))==null?void 0:u.node.id},get lastYearGroup(){var u,h;return((h=(u=s().data.media.edges.at(-1))==null?void 0:u.node.startDate)==null?void 0:h.year)||"TBA"},get loading(){return s.loading}})}})})}})}})]})}function P0(e){return a(T,{get when(){return e.showYears()},get children(){return a(j,{get children(){return[a(M,{get when(){return e.index()===0},get children(){return a(T,{get when(){var t;return e.lastYearGroup!==(((t=e.edge.node.startDate)==null?void 0:t.year)||"TBA")},get children(){var t=Eo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}}),a(M,{when:!0,get children(){return a(T,{get when(){var t,n;return((t=e.edges[e.index()-1].node.startDate)==null?void 0:t.year)!==((n=e.edge.node.startDate)==null?void 0:n.year)},get children(){var t=Eo(),n=t.firstChild;return d(n,()=>{var r;return((r=e.edge.node.startDate)==null?void 0:r.year)||"TBA"}),t}})}})]}})}})}function M0(e){F(e.showYears,"showYears signal is missing");const t=(n,r)=>{var i;return((i=n.at(-1))==null?void 0:i.node.id)!==r.node.id&&e.lastMediaId!==r.node.id&&n.push(r),n};return a(Y,{get each(){return e.edges.reduce(t,[])},children:(n,r)=>[a(P0,{get showYears(){return e.showYears},get lastYearGroup(){return e.lastYearGroup},edge:n,get edges(){return e.edges},index:r}),a(gi,{get media(){return n.node}})]})}var D0=p("<div data-k-8e2716fd class=activity-page>"),R0=p("<img data-k-8e2716fd class=profile alt=Profile>"),N0=p("<div data-k-8e2716fd class=activity-message-card><div data-k-8e2716fd class=header></div><div data-k-8e2716fd class=content>");function O0(){const{accessToken:e}=ie(),t=te(),[n]=ae.anilist.activityById(()=>t.id,e),[r]=ae.anilist.activityRepliesById(()=>t.id,1,e);return document.title="Activity - LOB",(()=>{var i=D0();return d(i,a(T,{get when(){var l;return(l=n())==null?void 0:l.data},get children(){return a(ts,{get activity(){return n().data},mutateCache:l=>console.log("mutate",l)})}}),null),d(i,a(T,{get when(){var l;return(l=r())==null?void 0:l.data},get children(){return a(Y,{get each(){return r().data.activityReplies},children:l=>(()=>{var s=N0(),o=s.firstChild,c=o.nextSibling;return d(o,a(B,{get href(){return"/user/"+l.user.name},class:"message-card-profile-header",get children(){return[(()=>{var u=R0();return L(()=>V(u,"src",l.user.avatar.large)),u})(),N(()=>l.user.name)]}}),null),d(o,a(Nn,{get createdAt(){return l.createdAt}}),null),d(c,a(es,{get children(){return l.text}})),s})()})}}),null),i})()}function F0(e){const t=te(),n=Jt();return a(T,{get when(){return!n.search},get fallback(){return a(on,{get href(){return"/search/"+t.type+n.search}})},get children(){return e.children}})}var U0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534ZM16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5ZM9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"fill=currentColor>'),B0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.25 16C8.25 15.5858 8.58579 15.25 9 15.25H15C15.4142 15.25 15.75 15.5858 15.75 16C15.75 16.4142 15.4142 16.75 15 16.75H9C8.58579 16.75 8.25 16.4142 8.25 16ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"fill=currentColor>'),V0=p('<svg data-k-65587ffa viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path data-k-65587ffa fill-rule=evenodd clip-rule=evenodd d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12ZM10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5ZM8.39747 17.4466C8.64413 17.7794 9.11385 17.8492 9.44661 17.6025C10.175 17.0627 11.0541 16.75 12 16.75C12.9459 16.75 13.825 17.0627 14.5534 17.6025C14.8862 17.8492 15.3559 17.7794 15.6025 17.4466C15.8492 17.1138 15.7794 16.6441 15.4466 16.3975C14.4742 15.6767 13.285 15.25 12 15.25C10.715 15.25 9.5258 15.6767 8.55339 16.3975C8.22062 16.6441 8.15082 17.1138 8.39747 17.4466Z"fill=currentColor>');function Jr(e){return F("score"in e,"Score is missing"),a(j,{get children(){return[a(M,{get when(){return e.score>=75},get children(){var t=U0();return L(()=>V(t,"class",`good ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=60},get children(){var t=B0();return L(()=>V(t,"class",`average ${e.class||""}`)),t}}),a(M,{get when(){return e.score>=0},get children(){var t=V0();return L(()=>V(t,"class",`bad ${e.class||""}`)),t}})]}})}var G0=p("<label>"),H0=p("<p>"),Y0=p("<input type=number inputmode=numeric min=0 max=10>"),j0=p("<input type=number inputmode=numeric min=0 max=100>"),z0=p("<input type=number inputmode=decimal min=0 max=10 step=.1>"),W0=p("<div class=score-star-input>"),q0=p("<div class=score-emoji-input>"),cu=p("<label class=radio-container><input type=radio class=radio>");function Lo(e){F(e.format,"Score format is missing"),F(e.onChange,"onChange is missing (give signal)");const t=Fe({name:"score",id:"score",value:0},e),[n]=ri(t,["id","name","value"]),r={onBeforeInput:i=>{var l;(l=i.data)!=null&&l.toLowerCase().includes("e")&&i.preventDefault()},onBlur:i=>i.target.value=n.value};return[a(T,{get when(){return e.label},get children(){return a(j,{get children(){return[a(M,{get when(){return e.format==="POINT_10"||e.format==="POINT_100"||e.format==="POINT_10_DECIMAL"},get children(){var i=G0();return d(i,()=>e.label),L(()=>V(i,"for",n.id)),i}}),a(M,{get when(){return e.format==="POINT_5"||e.format==="POINT_3"},get children(){var i=H0();return d(i,()=>e.label),i}})]}})}}),a(j,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){var i=Y0();return Et(i,Fe(n,r,{onChange:l=>{const s=Math.floor(Number(l.target.value)||0);e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_100"},get children(){var i=j0();return Et(i,Fe(n,r,{onChange:l=>{const s=Math.floor(Number(l.target.value)||0);e.onChange(Math.max(0,Math.min(s,100)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){var i=z0();return Et(i,Fe(n,r,{onChange:l=>{const s=Number((Number(l.target.value)||0).toFixed(1));e.onChange(Math.max(0,Math.min(s,10)))}}),!1,!1),i}}),a(M,{get when(){return e.format==="POINT_5"},get children(){var i=W0();return d(i,a(K0,Fe(n,{get onChange(){return e.onChange}}))),i}}),a(M,{get when(){return e.format==="POINT_3"},get children(){var i=q0();return d(i,a(J0,Fe(n,{get onChange(){return e.onChange}}))),i}})]}})]}function K0(e){return a(Y,{each:[1,2,3,4,5],children:t=>(()=>{var n=cu(),r=n.firstChild;return r.$$click=i=>{e.value==i.target.value?(i.target.checked=!1,e.onChange(0)):e.onChange(+i.target.value)},r.value=t,d(n,a(ga,{class:"score-star"}),null),L(i=>{var l=t<=e.value,s=e.name,o=e.id;return l!==i.e&&n.classList.toggle("selected",i.e=l),s!==i.t&&V(r,"name",i.t=s),o!==i.a&&V(r,"id",i.a=o),i},{e:void 0,t:void 0,a:void 0}),L(()=>r.checked=e.value==t),n})()})}function J0(e){const t=["",0,60,80];return a(Y,{each:[1,2,3],children:n=>(()=>{var r=cu(),i=r.firstChild;return i.$$click=l=>{e.value==l.target.value?(l.target.checked=!1,e.onChange(0)):e.onChange(+l.target.value)},i.value=n,d(r,a(Jr,{get score(){return t[n]}}),null),L(l=>{var s=n==e.value,o=e.name,c=e.id;return s!==l.e&&r.classList.toggle("selected",l.e=s),o!==l.t&&V(i,"name",l.t=o),c!==l.a&&V(i,"id",l.a=c),l},{e:void 0,t:void 0,a:void 0}),L(()=>i.checked=e.value==n),r})()})}_e(["click"]);var X0=p("<form class=exit-media-editor method=dialog><button>Close"),Z0=p("<img class=banner alt=Banner>"),Q0=p('<div class="media-editor-input volume-progress"><label for=progress-volumes>Volume Progress</label><input type=number inputmode=numeric id=progress-volumes name=progressVolumes min=0>'),ey=p("<p class=advanced-scoring-header>Advanced scoring"),ty=p("<ul>"),ny=p("<hr>"),ry=p("<button type=button>Delete"),ay=p('<form method=dialog><header class=media-editor-header><img class=cover alt=Cover><h2 class="line-clamp header"></h2><div class=container><button type=submit>Save</button></div></header><div class=media-editor-body><div><div class="media-editor-input status"><label for=status>Status</label><select name=status id=status><option value=none disabled hidden>Select status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select></div><div class="media-editor-input score"></div><div class="media-editor-input progress"><label for=progress></label><input type=number inputmode=numeric id=progress name=progress min=0></div><div class="media-editor-input start-date"><label for=start-date>Start date</label><input type=date id=start-date name=startedAt></div><div class="media-editor-input finish-date"><label for=end-date>Finish date</label><input type=date id=end-date name=completedAt></div><div class="media-editor-input repeat"><label for=repeat></label><input type=number inputmode=numeric id=repeat name=repeat min=0></div><div class="media-editor-input notes"><label for=notes>Notes</label><textarea type=text id=notes placeholder=Notes... name=notes></textarea></div></div><div><h3>Custom Lists</h3><div><input type=checkbox name=hiddenFromStatusLists id=hide-from-status><label for=hide-from-status> Hide from status lists</label></div><div><input type=checkbox name=private id=private><label for=private> Private'),iy=p("<dialog class=media-editor-warning-dialog><p>Are you sure you want to delete this media entry</p><form method=dialog><button>Yes</button><button>No"),ly=p("<dialog class=media-editor>"),sy=p('<div class="media-editor-input advanced-score">'),oy=p("<li><input type=checkbox name=customLists><label> ");function cy(e,t){F(!0,"Should not be able to edit if not authenticated");const[n,r]=O(),[i,l]=O(),[s,o]=O(),[c,u]=O(),[h,f]=O(),[g,m]=O(),[y,v]=O(),[_,x]=O(),[S,k]=O(),[b,A]=O(),[w,$]=O(),[C,E]=O(),[I,P]=O(),[R,U]=O(),[H,J]=O(),[G,q]=O(),[he,Z]=O(),[X,Q]=O(),[pe,ge]=O();function me(oe,z){He(()=>{var Je,ft,Re,et,Vt,ot,yt,ct,tt,At,mt,nt;x(oe==null?void 0:oe.data.mediaListOptions.scoreFormat),o(()=>(z==null?void 0:z.type)==="ANIME"?oe==null?void 0:oe.data.mediaListOptions.animeList.advancedScoringEnabled:(z==null?void 0:z.type)==="MANGA"?oe==null?void 0:oe.data.mediaListOptions.mangaList.advancedScoringEnabled:!1),u(()=>(z==null?void 0:z.type)==="ANIME"?(oe==null?void 0:oe.data.mediaListOptions.animeList.advancedScoring)||[]:(z==null?void 0:z.type)==="MANGA"?(oe==null?void 0:oe.data.mediaListOptions.mangaList.advancedScoring)||[]:[]),f(()=>(z==null?void 0:z.type)==="ANIME"?(oe==null?void 0:oe.data.mediaListOptions.animeList.customLists)||[]:(z==null?void 0:z.type)==="MANGA"?(oe==null?void 0:oe.data.mediaListOptions.mangaList.customLists)||[]:[]),r(((Je=z==null?void 0:z.mediaListEntry)==null?void 0:Je.score)??""),l(((ft=z==null?void 0:z.mediaListEntry)==null?void 0:ft.advancedScores)??{}),v(((Re=z==null?void 0:z.mediaListEntry)==null?void 0:Re.status)??"none"),A(((et=z==null?void 0:z.mediaListEntry)==null?void 0:et.progress)??""),$(((Vt=z==null?void 0:z.mediaListEntry)==null?void 0:Vt.progressVolumes)??""),E((z==null?void 0:z.episodes)??(z==null?void 0:z.chapters)??null),P(Za((ot=z==null?void 0:z.mediaListEntry)==null?void 0:ot.startedAt)),U(Za((yt=z==null?void 0:z.mediaListEntry)==null?void 0:yt.completedAt)),J(((ct=z==null?void 0:z.mediaListEntry)==null?void 0:ct.repeat)??""),q(((tt=z==null?void 0:z.mediaListEntry)==null?void 0:tt.notes)||""),k((z==null?void 0:z.isFavourite)||!1),ge(((At=z==null?void 0:z.mediaListEntry)==null?void 0:At.private)||!1),Q(((mt=z==null?void 0:z.mediaListEntry)==null?void 0:mt.hiddenFromStatusLists)||!1),m(((nt=z==null?void 0:z.mediaListEntry)==null?void 0:nt.customLists)||{})})}return me(e,t),[{score:n,setScore:r,advancedScores:i,setAdvancedScores:l,advancedScoresEnabled:s,setAdvancedScoresEnabled:o,advancedScoring:c,setAdvancedScoring:u,customLists:h,setCustomLists:f,mediaCustomLists:g,setMediaCustomLists:m,status:y,setStatus:v,format:_,setFormat:x,progress:b,setProgress:A,volumeProgress:w,setvolumeProgress:$,maxProgress:C,setMaxProgress:E,startedAt:I,setStartedAt:P,completedAt:R,setCompletedAt:U,isFavourite:S,setIsFavourite:k,repeat:H,setRepeat:J,notes:G,setNotes:q,like:he,setLike:Z,hideFromStatus:X,setHideFromStatus:Q,mediaPrivate:pe,setMediaPrivate:ge},me]}function dy(e){const[t,n]=O(void 0),[r,i]=O(void 0),{accessToken:l,authUserData:s}=ie(),[o,c]=cy();let u,h;const f=async m=>{var x,S,k,b,A,w,$,C,E,I,P,R,U,H,J,G,q,he;const v=new FormData(m.currentTarget).entries().reduce((Z,[X,Q])=>(Array.isArray(Z[X])?Z[X].push(Q||null):X in Z?Z[X]=[Z[X],Q||null]:Z[X]=Q||null,Z),{}),_={};if(Number.isNaN(+v.progress)===!1&&v.progress!=(((x=t().mediaListEntry)==null?void 0:x.progress)||0)&&(_.progress=Number(v.progress)),Number.isNaN(+v.progressVolumes)===!1&&v.progressVolumes!=(((S=t().mediaListEntry)==null?void 0:S.progressVolumes)||0)&&(_.progressVolumes=Number(v.progressVolumes)),Number.isNaN(+v.score)===!1&&v.score!=(((k=t().mediaListEntry)==null?void 0:k.score)||0)&&(_.score=Number(v.score)),Number.isNaN(+v.repeat)===!1&&v.repeat!=(((b=t().mediaListEntry)==null?void 0:b.repeat)||0)&&(_.repeat=Number(v.repeat)),o.advancedScoresEnabled()){const X=o.advancedScoring().map((me,oe)=>v["advanced-scores-"+oe]).map(me=>Number(me||0)),Q=!X.some(Number.isNaN),pe=Object.values(((A=t().mediaListEntry)==null?void 0:A.advancedScores)||{}),ge=X.some((me,oe)=>me!=pe[oe]);Q&&ge&&(_.advancedScores=X)}if(F(v.status!="none"||((w=t().mediaListEntry)==null?void 0:w.score)==null,"Replacing current status with default none value"),v.status=="none"||(($=t().mediaListEntry)==null?void 0:$.status)==v.status||(_.status=v.status),(v.startedAt||"")!=Za((C=t().mediaListEntry)==null?void 0:C.startedAt)){const[Z,X,Q]=v.startedAt.split("-");_.startedAt={year:Z,month:X,day:Q}}if((v.completedAt||"")!=Za((E=t().mediaListEntry)==null?void 0:E.completedAt)){const[Z,X,Q]=v.completedAt.split("-");_.completedAt={year:Z,month:X,day:Q}}if(v.notes!=((I=t().mediaListEntry)==null?void 0:I.notes)&&(_.notes=v.notes),v.customLists||(P=t().mediaListEntry)!=null&&P.customLists){const Z=v.customLists||[],X=Array.isArray(Z)?Z:[Z];(X.length>0&&((R=t().mediaListEntry)==null?void 0:R.customLists)==null||(U=t().mediaListEntry)!=null&&U.customLists&&Object.entries((H=t().mediaListEntry)==null?void 0:H.customLists).some(([pe,ge])=>X.includes(pe)!==ge))&&(_.customLists=X)}if(v.hiddenFromStatusLists==="on"!=(((J=t().mediaListEntry)==null?void 0:J.hiddenFromStatusLists)??!1)&&(_.hiddenFromStatusLists=v.hiddenFromStatusLists==="on"),v.private==="on"!=(((G=t().mediaListEntry)==null?void 0:G.private)??!1)&&(_.private=v.private==="on"),m.submitter.type==="submit"&&Object.keys(_).length>0){_.mediaId=t().id;for(const[X,Q]of Object.entries(_))F(Number.isNaN(Q)===!1,`Key "${X}" is NaN`);const Z=await ae.anilist.mutateMedia(l(),_);Z.status===200&&((he=(q=r())==null?void 0:q.mutateMedia)==null||he.call(q,Z.data))}};async function g(m,y){F("id"in m,"Missing editor id"),He(()=>{n(m),i(y),c(s(),m)}),u.showModal();const v=await ae.anilist.mediaListEntry(l(),m.id);He(()=>{n(v.data.data.Media),c(s(),v.data.data.Media)})}return a(gc.Provider,{value:{openEditor:g},get children(){return[(()=>{var m=ly(),y=u;return typeof y=="function"?ue(y,m):u=m,d(m,a(T,{get when(){return t()},get children(){return[X0(),(()=>{var v=ay(),_=v.firstChild,x=_.firstChild,S=x.nextSibling,k=S.nextSibling,b=k.firstChild,A=_.nextSibling,w=A.firstChild,$=w.firstChild,C=$.firstChild,E=C.nextSibling,I=E.firstChild,P=I.nextSibling,R=P.nextSibling,U=R.nextSibling,H=U.nextSibling,J=H.nextSibling,G=J.nextSibling,q=$.nextSibling,he=q.nextSibling,Z=he.firstChild,X=Z.nextSibling,Q=he.nextSibling,pe=Q.firstChild,ge=pe.nextSibling,me=Q.nextSibling,oe=me.firstChild,z=oe.nextSibling,Je=me.nextSibling,ft=Je.firstChild,Re=ft.nextSibling,et=Je.nextSibling,Vt=et.firstChild,ot=Vt.nextSibling,yt=w.nextSibling,ct=yt.firstChild,tt=ct.nextSibling,At=tt.firstChild,mt=tt.nextSibling,nt=mt.firstChild;return v.addEventListener("submit",f),d(_,a(T,{get when(){return t().bannerImage},get children(){var ne=Z0();return L(()=>V(ne,"src",t().bannerImage)),ne}}),x),d(S,()=>{var ne;return(ne=t().title)==null?void 0:ne.userPreferred}),d(k,a(Ir,{get checked(){return o.isFavourite()},get idType(){return t().type},get variableId(){return t().id},get onChange(){return o.setIsFavourite},mutateCache:(ne,ee)=>{var $e,Te;(Te=($e=r())==null?void 0:$e.setIsFavourite)==null||Te.call($e,ne,ee)}}),b),E.addEventListener("change",ne=>{o.setStatus(ne.target.value),(ne.target.value==="CURRENT"||ne.target.value==="COMPLETED")&&o.startedAt()===""&&o.setStartedAt(new Date().toISOString().substring(0,10)),ne.target.value==="COMPLETED"&&((o.progress()===""||o.progress()==0)&&o.maxProgress()>0&&o.setProgress(o.maxProgress()),(o.volumeProgress()===""||o.volumeProgress()==0)&&t().volumes>0&&o.setvolumeProgress(t().volumes),o.completedAt()===""&&o.setCompletedAt(new Date().toISOString().substring(0,10)))}),d(R,a(j,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:" Reading"}),a(M,{get when(){return t().type==="ANIME"},children:" Watching"})]}})),d(G,a(j,{get children(){return[a(M,{get when(){return t().type==="MANGA"},children:"Rereading"}),a(M,{get when(){return t().type==="ANIME"},children:"Rewatching"})]}})),d(q,a(Lo,{get value(){return o.score()},label:"Score",get onChange(){return o.setScore},get format(){return o.format()}})),d(Z,a(j,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Episode Progress"}),a(M,{get when(){return t().type==="MANGA"},children:"Chapter Progress"})]}})),X.$$beforeinput=ne=>{var ee;(ee=ne.data)!=null&&ee.toLowerCase().includes("e")&&ne.preventDefault()},X.addEventListener("blur",ne=>ne.target.value=o.progress()),X.addEventListener("change",ne=>o.setProgress(Math.max(0,Math.min(+ne.target.value,o.maxProgress()??1/0)))),d(w,a(T,{get when(){return t().type==="MANGA"},get children(){var ne=Q0(),ee=ne.firstChild,$e=ee.nextSibling;return $e.$$beforeinput=Te=>{var Xe;(Xe=Te.data)!=null&&Xe.toLowerCase().includes("e")&&Te.preventDefault()},$e.addEventListener("blur",Te=>Te.target.value=o.volumeProgress()),$e.addEventListener("change",Te=>o.setvolumeProgress(Math.max(0,Math.min(+Te.target.value,t().volumes??1/0)))),L(()=>V($e,"max",t().volumes)),L(()=>$e.value=o.volumeProgress()),ne}}),Q),ge.addEventListener("change",ne=>o.setStartedAt(ne.target.value)),z.addEventListener("change",ne=>o.setCompletedAt(ne.target.value)),d(ft,a(j,{get children(){return[a(M,{get when(){return t().type==="ANIME"},children:"Total Rewatches"}),a(M,{get when(){return t().type==="MANGA"},children:"Total Rereads"})]}})),Re.$$beforeinput=ne=>{var ee;(ee=ne.data)!=null&&ee.toLowerCase().includes("e")&&ne.preventDefault()},Re.addEventListener("blur",ne=>ne.target.value=o.repeat()),Re.addEventListener("change",ne=>o.setRepeat(Math.max(0,Math.min(+ne.target.value,Number.MAX_SAFE_INTEGER)))),ot.addEventListener("change",ne=>o.setNotes(ne.target.value)),d(w,a(T,{get when(){return N(()=>!!o.advancedScoresEnabled())()&&o.advancedScoring().length},get children(){return[ey(),a(Y,{get each(){return o.advancedScoring()},children:(ne,ee)=>(()=>{var $e=sy();return d($e,a(Lo,{get value(){return o.advancedScores()[ne]??""},get id(){return"advanced-score-"+ee()},get name(){return"advanced-scores-"+ee()},label:ne,onChange:Te=>{o.setAdvancedScores(Xe=>{const ze={...Xe,[ne]:Te};let Me=0,Be=0;return Object.values(ze).forEach(Lt=>{Me+=Lt>0,Be+=Lt||0}),F(Me!==0||Be===0,"Total is 0"),Number.isNaN(Be)===!1&&typeof Be=="number"&&Me>0&&o.setScore(()=>{switch(o.format()){case"POINT_10":return Math.max(0,Math.min(Math.round(Be/Me),10));case"POINT_100":return Math.max(0,Math.min(Math.round(Be/Me),100));case"POINT_10_DECIMAL":return Math.max(0,Math.min(Number((Be/Me).toFixed(1)),10));case"POINT_5":return Math.max(0,Math.min(Math.round(Be/Me),5));case"POINT_3":return Math.max(0,Math.min(Math.round(Be/Me),3));default:F(!1,`Format "${o.format()}" not found`)}}),ze})},get format(){return o.format()}})),$e})()})]}}),null),d(yt,a(T,{get when(){var ne;return(ne=o.customLists())==null?void 0:ne.length},get children(){return[(()=>{var ne=ty();return d(ne,a(Y,{get each(){return o.customLists()},children:(ee,$e)=>(()=>{var Te=oy(),Xe=Te.firstChild,ze=Xe.nextSibling;return ze.firstChild,Xe.addEventListener("change",Me=>o.setMediaCustomLists(Be=>({...Be,[ee]:Me.target.checked}))),Xe.value=ee,d(ze,ee,null),L(Me=>{var Be="custom-list-"+$e(),Lt="custom-list-"+$e();return Be!==Me.e&&V(Xe,"id",Me.e=Be),Lt!==Me.t&&V(ze,"for",Me.t=Lt),Me},{e:void 0,t:void 0}),L(()=>{var Me;return Xe.checked=(Me=o.mediaCustomLists())==null?void 0:Me[ee]}),Te})()})),ne})(),ny()]}}),tt),At.addEventListener("change",ne=>o.setHideFromStatus(ne.target.checked)),nt.addEventListener("change",ne=>o.setMediaPrivate(ne.target.checked)),d(yt,a(T,{get when(){return t().mediaListEntry},get children(){var ne=ry();return ne.$$click=()=>h.showModal(),ne}}),null),L(ne=>{var Xe,ze;var ee=(Xe=t().coverImage)==null?void 0:Xe.large,$e="media-editor-input-grid "+((ze=t().type)==null?void 0:ze.toLowerCase())||"",Te=o.maxProgress();return ee!==ne.e&&V(x,"src",ne.e=ee),$e!==ne.t&&Rt(w,ne.t=$e),Te!==ne.a&&V(X,"max",ne.a=Te),ne},{e:void 0,t:void 0,a:void 0}),L(()=>E.value=o.status()),L(()=>X.value=o.progress()),L(()=>ge.value=o.startedAt()),L(()=>z.value=o.completedAt()),L(()=>Re.value=o.repeat()),L(()=>ot.value=o.notes()),L(()=>At.checked=o.hideFromStatus()),L(()=>nt.checked=o.mediaPrivate()),v})(),(()=>{var v=iy(),_=v.firstChild,x=_.nextSibling,S=x.firstChild,k=h;return typeof k=="function"?ue(k,v):h=v,S.$$click=async()=>{var b,A;u.close(),await ae.anilist.deleteMediaListEntry(l(),t().mediaListEntry.id),(A=(b=r())==null?void 0:b.deleteMedia)==null||A.call(b)},v})()]}})),m})(),N(()=>e.children)]}})}function Za(e){if(!e||!e.day||!e.month||!e.year)return"";const t=String(e.day).padStart(2,"0"),n=String(e.month).padStart(2,"0");return`${e.year}-${n}-${t}`}_e(["beforeinput","click"]);function uy(e){return new Worker("/legendary-octo-barnacle/branches/feature-add-dev-branch-preview-to-production/assets/compare-media-list-DnsOtD_g.js",{name:e==null?void 0:e.name})}var hy=p("<div class=score-component-container>");function ds(e){return a(T,{get when(){return e.score!==0},get children(){var t=hy();return d(t,a(j,{get children(){return[a(M,{get when(){return e.format==="POINT_10"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_100"},get children(){return[N(()=>e.score),"/100"]}}),a(M,{get when(){return e.format==="POINT_10_DECIMAL"},get children(){return[N(()=>e.score),"/10"]}}),a(M,{get when(){return e.format==="POINT_5"},get children(){return[N(()=>e.score),"/5 ",a(ga,{class:"score-star"})]}}),a(M,{get when(){return e.format==="POINT_3"},get children(){return a(j,{get children(){return[a(M,{get when(){return e.score===1},get children(){return a(Jr,{class:"score-emoji",score:0})}}),a(M,{get when(){return e.score===2},get children(){return a(Jr,{class:"score-emoji",score:70})}}),a(M,{get when(){return e.score===3},get children(){return a(Jr,{class:"score-emoji",score:80})}})]}})}})]}})),t}})}var gy=p('<svg aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z">');function Qa(){return gy()}var fy=p("<ol><li><button>All "),my=p("<option value>All formats"),py=p("<option value>Any User Status"),vy=p("<option value>Any Status"),$y=p("<option value>All genres"),_y=p("<option value>All countries"),by=p("<option value>All ratings"),yy=p("<option value=chapters>Chapters"),wy=p("<option value=episodes>Episodes"),ky=p("<option value=volumes>Volumes"),Sy=p("<i>(default is all users)"),Cy=p("<button>Reset filters"),xy=p('<div class=pg-compare><div><ul class=pg-compare-users></ul></div><div class=pg-compare-filter-panel><input type=text placeholder=Search><select name=format><option value hidden>Format</option><option value=MOVIE>Movie</option><option value=MUSIC>Music</option><option value=ONA>Ona</option><option value=OVA>Ova</option><option value=SPECIAL>Special</option><option value=TV>TV</option><option value=TV_SHORT>TV short</option></select><select name=userStatus><option value hidden>User Status</option><option value=COMPLETED>Completed</option><option value=CURRENT></option><option value=DROPPED>Dropped</option><option value=PAUSED>Paused</option><option value=PLANNING>Planning</option><option value=REPEATING></option></select><select name=status><option value hidden>Status</option><option value=RELEASING>Releasing</option><option value=FINISHED>Finished</option><option value=NOT_YET_RELEASED>Not Yet Released</option><option value=CANCELLED>Cancelled</option></select><select name=genre><option value hidden>Genre</option><option value=Action>Action</option><option value=Adventure>Adventure</option><option value=Comedy>Comedy</option><option value=Drama>Drama</option><option value=Ecchi>Ecchi</option><option value=Fantasy>Fantasy</option><option value=Hentai>Hentai</option><option value=Horror>Horror</option><option value="Mahou Shoujo">Mahou Shoujo</option><option value=Mecha>Mecha</option><option value=Music>Music</option><option value=Mystery>Mystery</option><option value=Psychological>Psychological</option><option value=Romance>Romance</option><option value=Sci-Fi>Sci-Fi</option><option value="Slice of Life">Slice of Life</option><option value=Sports>Sports</option><option value=Supernatural>Supernatural</option><option value=Thriller>Thriller</option></select><select name=countryOfOrigin><option value hidden>Country</option><option value=CN>China</option><option value=JP>Japan</option><option value=KR>South Korea</option><option value=TW>Taiwan</option></select><select name=isAdult><option value hidden>Age rating</option><option value=false>R-17+</option><option value=true>R-18</option></select><input type=number name=year placeholder="Release year"max=9999 min=0><label for=repeat><input type=checkbox name=repeat id=repeat> </label><label for=missingScore><input type=checkbox name=missingScore id=missingScore> Allow missing scores</label><label for=reverse><input type=checkbox name=reverse id=reverse> Reverse order</label><select name=sort><option value=averageScore>Global Score</option><option value=popularity>Popularity</option><option value=releaseDate>Release Date</option><option value=repeat></option><option value=score>User score</option><option value=title>Title</option></select><label for=reviewsNeeded>Reviews needed: <input type=number inputmode=numeric min=1 name=reviewsNeeded id=reviewsNeeded><button class=help>?'),Ay=p("<li><button> "),Ty=p("<ol>"),Iy=p('<form class=pg-compare-user-search><input type=search name=user id=user placeholder="Search users">'),Ey=p('<li><img alt="Profile picture">'),Ly=p('<p class=error>No user found with name: "<!>"'),Py=p("<img>"),My=p("<p>"),Dy=p("<label><input type=checkbox name=enable> Disable <button>?"),Ry=p("<label><input type=checkbox name=enable> Filter out <button>?"),Ny=p("<li><button>Remove"),Oy=p("<p>Loading user data"),Fy=p("<h1>Total <!> "),Uy=p('<ol class="pg-compare-content grid-column-auto-fill">'),By=p('<img loading=lazy class=bg inert alt="Background banner">',!0,!1,!1),Po=p("<div class=cp-card-repeat>"),Vy=p('<img class=cover loading=lazy alt="Media cover">',!0,!1,!1),Gy=p("<br>"),Hy=p("<span>"),Yy=p('<div class="footer flex-space-between"><span>'),jy=p('<div class=cover-wrapper><div class="header flex-space-between"><div class=score> '),zy=p("<div class=pg-compare-card-content><p class=title></p><ol class=pg-compare-media-users></ol><ul class=flex-bullet-separator>"),Wy=p('<li class="pg-compare-media-card inline-container"><div class=wrapper>'),qy=p('<img class=profile alt="Profile picture">'),Ky=p("<span class=status>"),Mo=p("<li>");const Jy=()=>{const e=Ff(sessionStorage.getItem(window.location.href),0);return Array(e).fill({id:-1,coverImage:{}})};function Xy(){const e=Jt(),[t,n]=Ae(),r=te(),[i,l]=je([]),[s,o]=je({}),[c,u]=O(Jy()),h=Z=>{sessionStorage.setItem(window.location.href,Z.length),u(Z)},[f,g]=O([]),[m,y]=O([]),[v,_]=O(!0);W(se(()=>t.user,Z=>{const X=lr(Z);l(Wt([...X],[]))}));const x=()=>t.search||"",S=()=>t.format||"",k=()=>t.reviewsNeeded||f().length,b=()=>t.status||"",A=()=>t.genre||"",w=()=>t.countryOfOrigin||"",$=()=>t.year||"",C=()=>t.private==="true",E=()=>t.notes==="true",I=()=>t.repeat==="true",P=()=>t.missingStart==="true",R=()=>t.missingScore!=="false",U=()=>t.reverse==="true",H=()=>t.sort||"score",J=()=>t.userStatus||"",G=()=>{if(t.isAdult==="true")return!0;if(t.isAdult==="false")return!1};let q;function he(){if(!window.Worker)return;q=q instanceof Worker?q:new uy;const Z={includeKeys:f(),excludeKeys:m(),search:x(),format:S(),status:b(),genre:A(),reverse:U(),countryOfOrigin:w(),missingStart:P(),missingScore:R(),isAdult:G(),year:+$()||void 0,private:C(),notes:E(),repeat:I(),reviewsNeeded:k(),sort:H(),type:r.type,userStatus:J()};q.postMessage(Z),_(!0),q.onmessage=X=>{if(X.data==="success"){const Q=Ge.user();Q.onsuccess=pe=>{const ge=pe.target.result,oe=Ge.store(ge,"data","readonly").get("compare_list");oe.onerror=()=>_(!1),oe.onsuccess=z=>{_(!1),h(z.target.result||[])}}}else _(!1),console.error("Error")}}return W(he),document.title=`Compare ${r.type} - LOB`,a(vc.Provider,{value:{compareMediaList:c,includeKeys:f,setIncludeKeys:g,setExcludeKeys:y,users:s,storeUsers:o,loading:v},get children(){var Z=xy(),X=Z.firstChild,Q=X.firstChild,pe=X.nextSibling,ge=pe.firstChild,me=ge.nextSibling,oe=me.firstChild,z=oe.nextSibling,Je=me.nextSibling,ft=Je.firstChild,Re=ft.nextSibling,et=Re.nextSibling,Vt=et.nextSibling,ot=Vt.nextSibling,yt=ot.nextSibling,ct=yt.nextSibling,tt=Je.nextSibling,At=tt.firstChild,mt=At.nextSibling,nt=tt.nextSibling,ne=nt.firstChild,ee=ne.nextSibling,$e=nt.nextSibling,Te=$e.firstChild,Xe=Te.nextSibling,ze=$e.nextSibling,Me=ze.firstChild,Be=Me.nextSibling,Lt=ze.nextSibling,Wn=Lt.nextSibling,qn=Wn.firstChild;qn.nextSibling;var Kn=Wn.nextSibling,Er=Kn.firstChild,Tn=Kn.nextSibling,In=Tn.firstChild,at=Tn.nextSibling,fn=at.firstChild,En=fn.nextSibling,Lr=En.nextSibling,fa=Lr.nextSibling,Jn=fa.nextSibling;Jn.nextSibling;var Xn=at.nextSibling,mi=Xn.firstChild,Tt=mi.nextSibling,ma=Tt.nextSibling;return ma.firstChild,d(Z,a(Zy,{}),X),d(Q,a(Y,{each:i,children:ve=>a(Qy,{name:ve})})),ge.$$input=ve=>n({search:ve.target.value||void 0}),d(pe,a(T,{get when(){},get children(){var ve=fy(),Ne=ve.firstChild,wt=Ne.firstChild,pi=wt.firstChild;return wt.$$click=()=>navigate(""),d(wt,a(T,{get when(){return r.list===void 0},children:"> "}),pi),d(wt,()=>null.data.total,null),d(ve,a(Y,{get each(){return null.data.lists},children:Ln=>(()=>{var Zn=Ay(),mn=Zn.firstChild,Pr=mn.firstChild;return mn.$$click=()=>navigate(Ln.name),d(mn,a(T,{get when(){return decodeURI(r.list)===Ln.name},children:"> "}),Pr),d(mn,()=>Ln.name,Pr),d(mn,()=>Ln.entries.length,null),Zn})()}),null),ve}}),me),me.addEventListener("change",ve=>n({format:ve.target.value||void 0})),d(me,a(T,{get when(){return S()},get children(){return my()}}),z),Je.addEventListener("change",ve=>n({userStatus:ve.target.value||void 0})),d(Je,a(T,{get when(){return J()},get children(){return py()}}),Re),d(et,a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Watching"}),a(M,{get when(){return r.type==="manga"},children:"Reading"})]}})),d(ct,a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatching"}),a(M,{get when(){return r.type==="manga"},children:"Rereading"})]}})),tt.addEventListener("change",ve=>n({status:ve.target.value||void 0})),d(tt,a(T,{get when(){return b()},get children(){return vy()}}),mt),nt.addEventListener("change",ve=>n({genre:ve.target.value||void 0})),d(nt,a(T,{get when(){return A()},get children(){return $y()}}),ee),$e.addEventListener("change",ve=>n({countryOfOrigin:ve.target.value||void 0})),d($e,a(T,{get when(){return w()},get children(){return _y()}}),Xe),ze.addEventListener("change",ve=>n({isAdult:ve.target.value||void 0})),d(ze,a(T,{get when(){return G()!==void 0},get children(){return by()}}),Be),Lt.$$input=ve=>n({year:ve.target.value||void 0}),qn.addEventListener("change",ve=>n({repeat:ve.target.checked?"true":void 0})),d(Wn,a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatched"}),a(M,{get when(){return r.type==="manga"},children:"Reread"})]}}),null),Er.addEventListener("change",ve=>n({missingScore:ve.target.checked?void 0:"false"})),In.addEventListener("change",ve=>n({reverse:ve.target.checked?"true":void 0})),at.addEventListener("change",ve=>n({sort:ve.target.value==="score"?void 0:ve.target.value})),d(at,a(T,{get when(){return r.type==="manga"},get children(){return yy()}}),En),d(at,a(T,{get when(){return r.type==="anime"},get children(){return wy()}}),En),d(fa,a(j,{get children(){return[a(M,{get when(){return r.type==="anime"},children:"Rewatches"}),a(M,{get when(){return r.type==="manga"},children:"Rereads"})]}})),d(at,a(T,{get when(){return r.type==="manga"},get children(){return ky()}}),null),Tt.$$input=ve=>n({reviewsNeeded:ve.target.value==f().length?void 0:ve.target.value}),Tt.$$beforeinput=ve=>{var Ne;(Ne=ve.data)!=null&&Ne.toLowerCase().includes("e")&&ve.preventDefault()},Tt.addEventListener("blur",ve=>n({reviewsNeeded:Number(ve.target.value)>=f().length?void 0:+ve.target.value||""})),d(ma,a(Ct,{tipPosition:"bottom",get children(){return["Count of how many users need to have the ",N(()=>r.type)," on their list ",Sy()]}}),null),d(pe,a(j,{get children(){return a(M,{get when(){return new URLSearchParams(e.search).keys().some(ve=>ve!=="user")},get children(){var ve=Cy();return ve.$$click=()=>{n({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,reviewsNeeded:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0})},ve.style.setProperty("background","var(--crimson-400)"),ve}})}}),null),d(Z,a(e2,{}),null),L(ve=>{var Ne=f().length,wt=f().length+" (All)";return Ne!==ve.e&&V(Tt,"max",ve.e=Ne),wt!==ve.t&&V(Tt,"placeholder",ve.t=wt),ve},{e:void 0,t:void 0}),L(()=>ge.value=x()),L(()=>me.value=S()||""),L(()=>Je.value=J()||""),L(()=>tt.value=b()||""),L(()=>nt.value=A()||""),L(()=>$e.value=w()||""),L(()=>ze.value=G()===void 0?"":String(G())),L(()=>Lt.value=$()),L(()=>qn.checked=I()),L(()=>Er.checked=R()),L(()=>In.checked=U()),L(()=>at.value=H()),L(()=>Tt.value=k()),Z}})}function Zy(){const[e,t]=O(""),[n,r]=O(0),[i,l]=O(void 0),{accessToken:s}=ie(),[o,{mutate:c}]=ae.anilist.searchUsers(i,1,s),u=nn(l,300),[h,f]=Ae();let g;W(se(n,y=>{const v=g==null?void 0:g.querySelectorAll("li")[y],_=g==null?void 0:g.querySelector("ol");if(!v||!_)return;const{height:x,top:S}=_.getBoundingClientRect(),{top:k,bottom:b}=v.getBoundingClientRect(),A=b-S-x;A>0&&(_.scrollTop+=A);const w=k-S;w<0&&(_.scrollTop+=w)}));function m(y){y=(y==null?void 0:y.trim())||"",y&&f({user:wf([...lr(h.user).add(y)])}),He(()=>{u(void 0),c(void 0),r(0),t("")})}return(()=>{var y=Iy(),v=y.firstChild;y.addEventListener("submit",x=>{var S,k,b;x.preventDefault(),m(((b=(k=(S=o())==null?void 0:S.data.users)==null?void 0:k[n()])==null?void 0:b.name)||e())}),y.$$keydown=x=>{var k,b,A;const S=((A=(b=(k=o())==null?void 0:k.data)==null?void 0:b.users)==null?void 0:A.length)||0;S&&(x.key==="ArrowDown"?(x.preventDefault(),r(w=>(w+1)%S)):x.key==="ArrowUp"&&(x.preventDefault(),r(w=>(S+w-1)%S)))};var _=g;return typeof _=="function"?ue(_,y):g=y,v.$$input=x=>{He(()=>{t(x.target.value),r(0),u(x.target.value.trim()||void 0),c(void 0)})},d(y,a(T,{get when(){return e()},get children(){var x=Ty();return d(x,a(Y,{get each(){var S;return(S=o())==null?void 0:S.data.users},children:(S,k)=>(()=>{var b=Ey(),A=b.firstChild;return b.addEventListener("mouseenter",()=>r(k())),b.$$click=()=>m(S.name),d(b,()=>S.name,null),L(w=>{var $=n()===k(),C=S.avatar.large;return $!==w.e&&b.classList.toggle("selected",w.e=$),C!==w.t&&V(A,"src",w.t=C),w},{e:void 0,t:void 0}),b})()})),x}}),null),L(()=>v.value=e()),y})()}function Qy(e){F(e.name,"Name is missing");const t=te(),{setIncludeKeys:n,setExcludeKeys:r,storeUsers:i}=Pl(),[l,s]=Ae(),{accessToken:o}=ie(),[c,u]=Bs(()=>!Gs(l.disabled,e.name)),[h,f]=Bs(()=>Gs(l.exclude,e.name)),[g,{mutateCache:m}]=ae.anilist.mediaListByUserNameFetchOnce(()=>e.name,()=>t.type.toUpperCase(),o);function y(S,k){return c()&&h()===k?[...new Set([...S,g().cacheKey])]:S.filter(b=>b!==g().cacheKey)}function v(){n(S=>S.filter(k=>{var b;return k!==((b=g())==null?void 0:b.cacheKey)})),r(S=>S.filter(k=>{var b;return k!==((b=g())==null?void 0:b.cacheKey)})),s({user:We(l.user).filter(S=>S!==e.name)})}W(()=>{g()&&(i(g().data.user.name,g().data.user),g.indexedDBClosed&&(n(S=>y(S,!1)),r(S=>y(S,!0))))});const _=S=>{u(!S.target.checked),s({disabled:Hs(l.disabled,e.name,!S.target.checked)})},x=S=>{f(!S.target.checked),s({exclude:Hs(l.exclude,e.name,!S.target.checked)})};return(()=>{var S=Ny(),k=S.firstChild;return d(S,a(j,{get children(){return[a(M,{get when(){return g.error},get children(){var b=Ly(),A=b.firstChild,w=A.nextSibling;return w.nextSibling,d(b,()=>e.name,w),b}}),a(M,{get when(){return g()||g.loading},get children(){return[a(T,{get when(){return g()},get fallback(){return a(Hn,{get children(){return a(Ct,{tipPosition:"right",get children(){return Oy()}})}})},get children(){var b=Py();return L(A=>{var w=g().data.user.avatar.large,$=g().data.user.name+" profile picture";return w!==A.e&&V(b,"src",A.e=w),$!==A.t&&V(b,"alt",A.t=$),A},{e:void 0,t:void 0}),b}}),(()=>{var b=My();return d(b,a(T,{get when(){return g()},get fallback(){return e.name},get children(){return g().data.user.name}})),b})(),(()=>{var b=Dy(),A=b.firstChild,w=A.nextSibling,$=w.nextSibling;return $.firstChild,A.addEventListener("change",_),d($,a(Ct,{tipPosition:"bottom",children:"Disabling a user removes them from search and filtering, just like removing them."}),null),L(()=>A.checked=!c()),b})(),(()=>{var b=Ry(),A=b.firstChild,w=A.nextSibling,$=w.nextSibling;return $.firstChild,A.addEventListener("change",x),d($,a(Ct,{tipPosition:"bottom",get children(){return["Filters out all ",N(()=>t.type)," from user ",N(()=>{var C,E,I;return((I=(E=(C=g())==null?void 0:C.data)==null?void 0:E.user)==null?void 0:I.name)||e.name})]}}),null),L(()=>A.checked=h()),b})()]}})]}}),k),k.$$click=()=>{var b;return v((b=g())==null?void 0:b.cacheKey)},L(b=>{var A=!c(),w=!!h();return A!==b.e&&S.classList.toggle("disabled",b.e=A),w!==b.t&&S.classList.toggle("exclude",b.t=w),b},{e:void 0,t:void 0}),S})()}function e2(){const{compareMediaList:e,loading:t,includeKeys:n}=Pl(),[r]=Ae(),i=te();return[(()=>{var l=Fy(),s=l.firstChild,o=s.nextSibling;return o.nextSibling,d(l,()=>i.type,o),d(l,()=>e().length,null),l})(),(()=>{var l=Uy();return d(l,a(Hn,{}),null),d(l,a(T,{get when(){return e()},keyed:!0,get children(){return a(r2,{})}}),null),L(()=>l.classList.toggle("loading",!!t())),l})(),a(T,{get when(){return e().length===0},get children(){return a(j,{fallback:"No content",get children(){return[a(M,{get when(){return t()},children:"Loading content"}),a(M,{get when(){return!r.user},children:"No users selected"}),a(M,{get when(){return n().length===0},children:"All users are disabled"})]}})}})]}const[t2,n2]=je([]);function r2(){const{compareMediaList:e,users:t}=Pl(),n=te(),r=[];function i(c){r.push(c)}xn(()=>{r.forEach(c=>o.observe(c))}),Ye(()=>{o.disconnect()});const l={rootMargin:"500px"},s=c=>{for(const u of c)n2(u.target.dataset.index,u.isIntersecting)},o=new IntersectionObserver(s,l);return a(Y,{get each(){return e()},children:(c,u)=>(()=>{var h=Wy(),f=h.firstChild;return ue(i,h,()=>!0),d(f,a(T,{get when(){return t2[u()]&&c.id!==-1},get children(){return[a(T,{get when(){return c.bannerImage},get children(){var g=By();return L(()=>V(g,"src",c.bannerImage)),g}}),(()=>{var g=jy(),m=g.firstChild,y=m.firstChild,v=y.firstChild;return d(m,a(T,{get when(){return c.repeat},get children(){var _=Po();return d(_,a(Ct,{tipPosition:"right",get children(){return["Compined ",N(()=>n.type==="anime"?"rewatches":"rereads")," ",N(()=>c.repeat)]}}),null),d(_,()=>c.repeat,null),d(_,a(Qa,{}),null),_}}),y),d(y,a(Ct,{tipPosition:"right",children:"Global average score"}),v),d(y,a(ga,{}),v),d(y,()=>c.averageScore/10||"N/A",null),d(g,a(B,{class:"cover-link",get href(){return Ve(c)},get children(){var _=Vy();return L(()=>V(_,"src",c.coverImage.large)),_}}),null),d(g,a(T,{get when(){return c.episodes||c.chapters||c.volumes||c.score},get children(){var _=Yy(),x=_.firstChild;return d(x,a(j,{get children(){return[a(M,{get when(){return n.type==="anime"},get children(){return a(T,{get when(){return c.episodes},get children(){return["Ep ",N(()=>c.episodes)]}})}}),a(M,{get when(){return n.type==="manga"},get children(){return[a(T,{get when(){return c.chapters},get children(){return["Ch ",N(()=>c.chapters)]}}),Gy(),a(T,{get when(){return c.volumes},get children(){return["Vol ",N(()=>c.volumes)]}})]}})]}})),d(_,a(T,{get when(){return c.score},get children(){var S=Hy();return d(S,()=>Math.round(c.score*100)/100,null),d(S,a(Ct,{tipPosition:"right",children:"Users average score"}),null),S}}),null),_}}),null),L(()=>V(g,"href",Ve(c))),g})(),(()=>{var g=zy(),m=g.firstChild,y=m.nextSibling,v=y.nextSibling;return d(m,()=>c.title.userPreferred),d(y,a(Y,{get each(){return c.mediaEntries},children:_=>(()=>{var x=Mo();return d(x,a(B,{get href(){return"/user/"+_.name},class:"name",get children(){return[(()=>{var S=qy();return L(()=>V(S,"src",t[_.name].avatar.large)),S})(),N(()=>_.name)]}}),null),d(x,a(T,{get when(){return _.status!=="COMPLETED"},get children(){var S=Ky();return d(S,()=>xf(_.status,n.type)),S}}),null),d(x,a(T,{get when(){return _.repeat},get children(){var S=Po();return d(S,()=>_.repeat,null),d(S,a(Qa,{}),null),S}}),null),d(x,a(ds,{get score(){return _.score},get format(){return t[_.name].mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),x})()})),d(v,a(T,{get when(){var _;return(_=Object.entries(Un.ani.media).find(([,x])=>x.api===c.format))==null?void 0:_[0]},children:_=>(()=>{var x=Mo();return d(x,a(j,{get children(){return[a(M,{get when(){return c.countryOfOrigin!=="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+_()+"&country="+c.countryOfOrigin},get children(){return[N(()=>yr(c.format))," (",N(()=>Hl(c.countryOfOrigin)),")"]}})}}),a(M,{get when(){return c.countryOfOrigin==="JP"},get children(){return a(B,{get href(){return"/search/"+c.type.toLowerCase()+"?format="+_()},get children(){return yr(c.format)}})}})]}})),x})()}),null),d(v,a(j,{get children(){return[a(M,{get when(){return n.type==="manga"},get children(){return a(j,{get children(){return[a(M,{get when(){var _;return(_=c.startDate)==null?void 0:_.year},get children(){return a(B,{get href(){return"/search/manga?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var _;return((_=c.startDate)==null?void 0:_.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){return n.type==="anime"},get children(){return a(j,{get children(){return[a(M,{get when(){return c.seasonYear&&c.season},get children(){return a(B,{get href(){return"/search/anime/"+c.season.toLowerCase()+"-"+c.seasonYear},get children(){return[N(()=>qe(c.season))," ",N(()=>c.seasonYear)]}})}}),a(M,{get when(){var _;return(_=c.startDate)==null?void 0:_.year},get children(){return a(B,{get href(){return"/search/anime?year="+c.startDate.year},get children(){return c.startDate.year}})}}),a(M,{get when(){var _;return((_=c.startDate)==null?void 0:_.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}}),null),g})()]}})),L(g=>{var m=u(),y=c.coverImage.color;return m!==g.e&&V(h,"data-index",g.e=m),y!==g.t&&((g.t=y)!=null?h.style.setProperty("--color",y):h.style.removeProperty("--color")),g},{e:void 0,t:void 0}),h})()})}_e(["input","click","beforeinput","keydown"]);var a2=p("<button>Watch trailer"),i2=p("<iframe frameborder=0 allowfullscreen>"),l2=p("<dialog class=cp-trailer-dialog><div class=wrapper><form method=dialog class=close><button>Close trailer");function du(e){const[t,n]=O(!1);let r;return a(T,{get when(){return e.id},get children(){return[(()=>{var i=a2();return i.$$click=()=>{r.showModal(),n(!0)},i})(),(()=>{var i=l2(),l=i.firstChild,s=l.firstChild;i.$$click=c=>c.target===r&&r.close();var o=r;return typeof o=="function"?ue(o,i):r=i,i.addEventListener("close",()=>n(!1)),d(l,a(T,{get when(){return t()},get children(){return a(j,{get children(){return a(M,{get when(){return e.site==="youtube"},get children(){var c=i2();return L(()=>V(c,"src","https://www.youtube-nocookie.com/embed/"+e.id+"?enablejsapi=1&wmode=opaque&autoplay=1")),c}})}})}}),s),i})()]}})}_e(["click"]);var s2=p("<div data-k-0bff354a class=scores><div data-k-0bff354a><p data-k-0bff354a>Mean</p><span data-k-0bff354a></span></div><div data-k-0bff354a><p data-k-0bff354a>Average</p><span data-k-0bff354a></span></div><p data-k-0bff354a class=anilist-users> Users</p><div data-k-0bff354a><p data-k-0bff354a>MAL</p><span data-k-0bff354a></span></div><p data-k-0bff354a> Users");function uu(){const{anilistData:e,jikanData:t}=hn();return(()=>{var n=s2(),r=n.firstChild,i=r.firstChild,l=i.nextSibling,s=r.nextSibling,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=u.nextSibling,g=f.firstChild,m=g.nextSibling,y=f.nextSibling,v=y.firstChild;return d(l,a(T,{get when(){var _,x;return((x=(_=e())==null?void 0:_.data)==null?void 0:x.meanScore)>0},fallback:"N/A",get children(){var _,x;return((((x=(_=e())==null?void 0:_.data)==null?void 0:x.meanScore)||0)/10).toFixed(1)}})),d(c,a(T,{get when(){var _,x;return((x=(_=e())==null?void 0:_.data)==null?void 0:x.averageScore)>0},fallback:"N/A",get children(){var _,x;return((((x=(_=e())==null?void 0:_.data)==null?void 0:x.averageScore)||0)/10).toFixed(1)}})),d(u,a(T,{get when(){var _,x,S;return(S=(x=(_=e())==null?void 0:_.data)==null?void 0:x.stats.scoreDistribution)==null?void 0:S.reduce((k,b)=>b.amount+k,0)},fallback:"-",get children(){var _,x,S;return aa((S=(x=(_=e())==null?void 0:_.data)==null?void 0:x.stats.scoreDistribution)==null?void 0:S.reduce((k,b)=>b.amount+k,0))}}),h),d(m,a(j,{fallback:"N/A",get children(){return[a(M,{get when(){return t.loading},children:"..."}),a(M,{get when(){var _;return((_=t())==null?void 0:_.data.score)>0},get children(){return(t().data.score||0).toFixed(2)}})]}})),d(y,a(T,{get when(){var _,x;return(x=(_=t())==null?void 0:_.data)==null?void 0:x.scored_by},fallback:"-",get children(){return aa(t().data.scored_by)}}),v),n})()}var o2=p('<svg class=svg-external-source xmlns=http://www.w3.org/2000/svg viewBox="4 3 17 17"><path fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7">');function hu(){return o2()}var c2=p('<svg aria-hidden=true class=svg-link focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path fill=currentColor d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">');function d2(){return c2()}var u2=p("<li data-k-e748b7cf><a data-k-e748b7cf target=_blank>"),h2=p("<div data-k-e748b7cf class=external><h2 data-k-e748b7cf>External links</h2><ul data-k-e748b7cf>"),g2=p('<img data-k-e748b7cf alt="Site favicon.">'),f2=p("<sup data-k-e748b7cf>"),m2=p("<li data-k-e748b7cf class=cp-external-link><div data-k-e748b7cf class=icon></div><span data-k-e748b7cf><a data-k-e748b7cf target=_blank>");function gu(e){return a(rt,{fallback:"External links error",get children(){return a(T,{get when(){var t;return e.hastag||((t=e.externalLinks)==null?void 0:t.length)},get children(){var t=h2(),n=t.firstChild,r=n.nextSibling;return d(r,a(T,{get when(){return e.hashtag},get children(){var i=u2(),l=i.firstChild;return d(l,()=>e.hashtag),L(()=>V(l,"href",`https://nitter.net/search?q=${e.hashtag.replaceAll("#","%23")}`)),i}}),null),d(r,a(Y,{get each(){return e.externalLinks},children:i=>(()=>{var l=m2(),s=l.firstChild,o=s.nextSibling,c=o.firstChild;return d(s,a(T,{get when(){return i.icon},get fallback(){return a(d2,{})},get children(){var u=g2();return L(()=>V(u,"src",i.icon)),u}})),d(c,()=>i.site||i.name),d(o,a(T,{get when(){return i.language},get children(){var u=f2();return d(u,a(j,{get fallback(){return i.language},get children(){return[a(M,{get when(){return i.language==="Japanese"},children:"JP"}),a(M,{get when(){return i.language==="English"},children:"EN"})]}})),u}}),null),d(o,a(T,{get when(){return i.notes},get children(){return[" (",N(()=>i.notes),")"]}}),null),L(u=>{var h=i.color,f=i.url;return h!==u.e&&((u.e=h)!=null?s.style.setProperty("background",h):s.style.removeProperty("background")),f!==u.t&&V(c,"href",u.t=f),u},{e:void 0,t:void 0}),l})()}),null),t}})}})}var p2=p("<span class=visually-hidden>Switch to anilist mode"),v2=p("<div><h2>Studios</h2><ol>"),$2=p("<div><h2>Producers</h2><ol>"),_2=p("<aside class=left><img alt=Cover><div class=cp-media-api-switcher><a class=active target=_black><span class=visually-hidden>Go to MyAnimeList"),b2=p("<li>Source: "),y2=p("<div class=header><h1></h1><ul class=flex-bullet-separator><li></li><li></li><li></li></ul><ul><li>Members: </li><li>Ranked: #</li><li>Popularity: #"),w2=p("<div class=pg-media-info-jikan><div class=body>"),Do=p("<li><a target=_black>"),k2=p("<li>Author<!>: "),S2=p("<a>"),C2=p("<div class=pg-media-jikan-desc>"),x2=p("<div><strong>Background"),A2=p("<div class=relations><h2>Relations</h2><ol class=grid-column-auto-fill>"),T2=p("<h2>Characters"),Ro=p("<div><ol class=grid-column-auto-fill>"),I2=p("<h2>Staff"),E2=p('<p class="name line-clamp">'),L2=p("<p class=type> (<!>)"),P2=p("<li>");function M2(e){const t=te(),{accessToken:n}=ie(),r=Pe(Ec,()=>t.type,()=>t.id),i=Vn({"only-if-cached":()=>oi()}),[l]=Bn(i,r),s=Pe(Ac,n,()=>t.type,()=>t.id),[o,{mutateBoth:c}]=Qe(s),[u,h]=O();L(se(o,g=>{var m;h(((m=g==null?void 0:g.data)==null?void 0:m.isFavourite)??!1)}));const f=(g,m)=>{var v,_,x,S;const y=m[(_=(v=o())==null?void 0:v.data)==null?void 0:_.type]??null;((S=(x=o())==null?void 0:x.data)==null?void 0:S.id)===y&&(h(g),c(k=>(k.data.isFavourite=g,k)))};return a(rt,{fallback:"Jikan media error",get children(){return a(Ml.Provider,{value:{anilistData:o,jikanData:l},get children(){var g=w2(),m=g.firstChild;return d(g,a(T,{get when(){return l()},get children(){var y=_2(),v=y.firstChild,_=v.nextSibling,x=_.firstChild;return x.firstChild,d(_,a(T,{get when(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.id},get children(){return a(B,{get href(){var S,k,b,A;return"/ani/"+t.type+"/"+((k=(S=o())==null?void 0:S.data)==null?void 0:k.id)+"/"+Gn((A=(b=o())==null?void 0:b.data)==null?void 0:A.title.userPreferred)},get children(){return[p2(),a(is,{})]}})}}),x),d(x,a(ls,{}),null),d(x,a(hu,{}),null),d(y,a(uu,{}),null),d(y,a(Ir,{get checked(){return u()},onChange:h,get idType(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.type},get variableId(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.id},get anilistValue(){var S,k;return(k=(S=o())==null?void 0:S.data)==null?void 0:k.favourites},get jikanValue(){var S;return(S=l())==null?void 0:S.data.favorites},mutateCache:f}),null),d(y,a(du,{get id(){var S,k;return(k=(S=l())==null?void 0:S.data.trailer)==null?void 0:k.youtube_id},site:"youtube"}),null),d(y,a(T,{get when(){var S,k;return(k=(S=l())==null?void 0:S.data.studios)==null?void 0:k.length},get children(){var S=v2(),k=S.firstChild,b=k.nextSibling;return d(b,a(Y,{get each(){var A;return(A=l())==null?void 0:A.data.studios},children:A=>(()=>{var w=Do(),$=w.firstChild;return d($,()=>A.name),L(()=>V($,"href",A.url)),w})()})),S}}),null),d(y,a(T,{get when(){var S,k;return(k=(S=l())==null?void 0:S.data.producers)==null?void 0:k.length},get children(){var S=$2(),k=S.firstChild,b=k.nextSibling;return d(b,a(Y,{get each(){var A;return(A=l())==null?void 0:A.data.producers},children:A=>(()=>{var w=Do(),$=w.firstChild;return d($,()=>A.name),L(()=>V($,"href",A.url)),w})()})),S}}),null),d(y,a(gu,{get externalLinks(){var S;return(S=l())==null?void 0:S.data.external}}),null),L(S=>{var A;var k=l().data.images.webp.large_image_url,b=(A=l())==null?void 0:A.data.url;return k!==S.e&&V(v,"src",S.e=k),b!==S.t&&V(x,"href",S.t=b),S},{e:void 0,t:void 0}),y}}),m),d(m,a(T,{get when(){return l()},get children(){var y=y2(),v=y.firstChild,_=v.nextSibling,x=_.firstChild,S=x.nextSibling,k=S.nextSibling,b=_.nextSibling,A=b.firstChild;A.firstChild;var w=A.nextSibling;w.firstChild;var $=w.nextSibling;return $.firstChild,d(v,()=>l().data.title),d(x,a(j,{get children(){return[a(M,{get when(){return N(()=>!!l().data.year)()&&l().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+l().data.year+"&season="+l().data.season+"&malSearch=true"},get children(){return[N(()=>zs(l().data.season))," ",N(()=>l().data.year)]}})}}),a(M,{get when(){return l().data.season},get children(){return a(B,{get href(){return"/search/"+t.type+"?season="+l().data.season+"&malSearch=true"},get children(){return zs(l().data.season)}})}}),a(M,{get when(){return l().data.year},get children(){return a(B,{get href(){return"/search/"+t.type+"?year="+l().data.year+"&malSearch=true"},get children(){return l().data.year}})}}),a(M,{get when(){var C,E,I,P,R,U;return((I=(E=(C=l().data.aired)==null?void 0:C.prop)==null?void 0:E.from)==null?void 0:I.year)||((U=(R=(P=l().data.published)==null?void 0:P.prop)==null?void 0:R.from)==null?void 0:U.year)},children:C=>a(B,{get href(){return"/search/"+t.type+"?year="+C()+"&malSearch=true"},get children(){return C()}})}),a(M,{get when(){var C,E,I,P,R,U;return((I=(E=(C=l().data.aired)==null?void 0:C.prop)==null?void 0:E.to)==null?void 0:I.year)||((U=(R=(P=l().data.published)==null?void 0:P.prop)==null?void 0:R.to)==null?void 0:U.year)},children:C=>a(B,{get href(){return"/search/"+t.type+"?year="+C()+"&malSearch=true"},get children(){return C()}})}),a(M,{get when(){return l().data.status==Sc},get children(){return a(B,{get href(){return"/search/"+t.type+"/tba"},children:"TBA"})}})]}})),d(S,a(B,{get href(){return"/search/"+t.type+"?format="+l().data.type.toLowerCase()+"&malSearch=true"},get children(){return l().data.type}})),d(k,()=>{var C;return Bf((C=l())==null?void 0:C.data.status)}),d(b,a(T,{get when(){var C;return(C=l())==null?void 0:C.data.source},get children(){var C=b2();return C.firstChild,d(C,a(B,{get href(){return"/search/"+t.type+"?source="+l().data.source},get children(){var E;return(E=l())==null?void 0:E.data.source}}),null),C}}),A),d(A,()=>aa(l().data.members||0)||"N/A",null),d(w,()=>l().data.rank||"N/A",null),d($,()=>l().data.popularity||"N/A",null),d(b,a(T,{get when(){var C;return(C=l().data.authors)==null?void 0:C.length},children:C=>(()=>{var E=k2(),I=E.firstChild,P=I.nextSibling;return P.nextSibling,d(E,()=>Hf(C()),P),d(E,a(Y,{get each(){return l().data.authors},children:(R,U)=>[(()=>{var H=S2();return d(H,()=>R.name),L(()=>V(H,"href",R.url)),H})(),a(T,{get when(){return U()<C()-1},children:" & "})]}),null),E})()}),null),y}}),null),d(m,()=>e.children,null),g}})}})}function D2(){const e=te(),{jikanData:t}=hn(),n=Pe(Lc,()=>e.type,()=>e.id),r=Vn({"only-if-cached":()=>oi()||t.loading}),[i]=Bn(r,n),l=Pe(Pc,()=>e.type,()=>e.id),s=Vn({"only-if-cached":()=>$f()||i.loading}),[o]=Bn(s,l);return[a(T,{get when(){return t()},get children(){return[a(T,{get when(){return t().data.synopsis},get children(){var c=C2();return d(c,a(Ja,{get text(){return t().data.synopsis},singleLineBreaks:!0})),c}}),a(T,{get when(){return t().data.background},get children(){var c=x2();return c.firstChild,d(c,a(Ja,{get text(){return t().data.background}}),null),c}}),a(T,{get when(){var c;return(c=t().data.relations)==null?void 0:c.length},get children(){var c=A2(),u=c.firstChild,h=u.nextSibling;return d(h,a(Y,{get each(){return t().data.relations},children:f=>a(Y,{get each(){return f.entry},children:g=>(()=>{var m=P2();return d(m,a(B,{class:"item",get href(){return dd(g.type,{mal_id:g.mal_id,title:g.name})},get children(){return[(()=>{var y=E2();return d(y,()=>g.name),y})(),(()=>{var y=L2(),v=y.firstChild,_=v.nextSibling;return _.nextSibling,d(y,()=>f.relation,v),d(y,()=>wr(g.type),_),y})()]}})),m})()})})),c}}),a(T,{get when(){return i()},get children(){var c=Ro(),u=c.firstChild;return d(c,a(B,{href:"characters",get children(){return T2()}}),u),d(u,a(Y,{get each(){return i().data.slice(0,6)},children:({voice_actors:h,...f})=>a(Vd,Fe({get voiceActor(){return kf(h,({language:g})=>g===kc)}},f))})),c}}),a(T,{get when(){return o()},get children(){var c=Ro(),u=c.firstChild;return d(c,a(B,{href:"staff",get children(){return I2()}}),u),d(u,a(Y,{get each(){return o().data.slice(0,6)},children:({person:h,positions:f})=>a(as,{staff:h,positions:f})})),c}}),N(()=>console.log("jikan",t()))]}}),N(()=>console.log("characters",i()))]}let wl,kl;function R2({target:e}){const t=e.querySelector("[data-tooltip-positions]");t&&(wl=t,ei(t))}function fu(){kl&&ei(kl),wl&&ei(wl)}let zi;function mu({target:e}){if(e===zi||!e)return;zi=e;const t=e.matches("[data-tooltip-trigger]")?e:e.closest("[data-tooltip-trigger]");if(!t)return;const n=t.querySelector("[data-tooltip-positions]");let r=0;i();function i(){t.matches(":hover")?(kl=n,ei(n)):(r++<500||zi!==e)&&requestAnimationFrame(i)}}function ei(e){const t=e.dataset.tooltipPositions.split(" "),n=e.closest("[data-tooltip-wrapper]"),r=n==null?void 0:n.getBoundingClientRect(),i=document.body.getBoundingClientRect(),l=e.classList.value;for(const s of t){e.classList.remove(...t),e.classList.add(s);let o=e.getBoundingClientRect();if(!(r&&(o.left<r.left||o.right>r.right||o.top<r.top||o.bottom>r.bottom))&&!(o.left<0||o.right>i.width||o.top<0||o.bottom>i.height))return}e.classList=l}window.addEventListener("focusin",R2);window.addEventListener("pointermove",mu);window.addEventListener("pointerdown",mu);window.addEventListener("scroll",fu,{passive:!0});window.addEventListener("resize",fu,{passive:!0});var N2=p("<select>"),O2=p("<div><ol>"),F2=p("<option>");function U2(){const e=te(),{jikanData:t}=hn(),n=Pe(Lc,()=>e.type,()=>e.id),r=Vn({"only-if-cached":()=>oi()||t.loading}),[i]=Bn(r,n),[l,s]=Vl(kc),o=N(()=>{var f;const c=new Set,u=(f=i())==null?void 0:f.data;if(!(u!=null&&u.length))return[];u.forEach(g=>{var m;(m=g.voice_actors)==null||m.forEach(y=>c.add(y.language))});const h=[...c].sort();return s(g=>c.has(g)?g:h[0]),h});return a(rt,{fallback:"MAL characters error",get children(){return a(T,{get when(){return t()},get children(){return a(T,{get when(){return i()},get children(){var c=O2(),u=c.firstChild;return d(c,a(T,{get when(){return o().length},get children(){var h=N2();return h.addEventListener("change",f=>s(f.target.value)),d(h,a(Y,{get each(){return o()},children:f=>(()=>{var g=F2();return g.value=f,d(g,f),g})()})),L(()=>h.value=l()),h}}),u),d(u,a(Y,{get each(){return i().data},children:({voice_actors:h,...f})=>a(Vd,Fe({get voiceActor(){return h==null?void 0:h.find(g=>g.language===l())},get language(){return l()}},f))})),L(()=>u.className=`grid-column-auto-fill ${e.type||""}`),c}})}})}})}var B2=p("<div><ol class=grid-column-auto-fill>");function V2(){const e=te(),{jikanData:t}=hn(),n=Pe(Pc,da,()=>e.id),r=Vn({"only-if-cached":()=>oi()||t.loading}),[i]=Bn(r,n);return a(rt,{fallback:"MAL staff page error",get children(){return a(T,{get when(){return t()},get children(){return a(T,{get when(){return i()},get children(){var l=B2(),s=l.firstChild;return d(s,a(Y,{get each(){return i().data},children:({person:o,positions:c})=>a(as,{staff:o,positions:c})})),l}})}})}})}var No=p('<ol data-k-eb389524 class="grid-column-auto-fill card">'),G2=p("<ol data-k-eb389524 class=grid-column-auto-fill>"),H2=p('<div data-k-eb389524 class="page-normal pg-jikan-character"><div data-k-eb389524 class=header><img data-k-eb389524 alt="Character profile."><div data-k-eb389524 class=grid><div data-k-eb389524><h1 data-k-eb389524></h1><p data-k-eb389524></p></div></div><div data-k-eb389524>'),Y2=p("<details data-k-eb389524 open><summary data-k-eb389524><h2 data-k-eb389524>");function j2(){const e=te(),t=Pe(dg,()=>e.id),[n]=Qe(t);return L(()=>{var i,l;const r=(l=(i=n())==null?void 0:i.data)==null?void 0:l.name;r&&(document.title=r)}),a(rt,{fallback:"Jikan character error",get children(){return a(T,{get when(){return n()},get children(){var r=H2(),i=r.firstChild,l=i.firstChild,s=l.nextSibling,o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=s.nextSibling;return d(c,()=>n().data.name),d(u,()=>bf(n().data.name_kanji,n().data.nicknames).join(", ")),d(s,a(Ir,{get jikanValue(){return n().data.favorites}}),null),d(h,a(Ja,{get text(){return n().data.about},singleLineBreaks:!0})),d(r,a(Wi,{title:"Anime",get children(){var f=No();return d(f,a(Y,{get each(){return n().data.anime},children:g=>a(ml,{type:"anime",get media(){return g.anime}})})),f}}),null),d(r,a(Wi,{title:"Manga",get children(){var f=No();return d(f,a(Y,{get each(){return n().data.manga},children:g=>a(ml,{type:"manga",get media(){return g.manga}})})),f}}),null),d(r,a(Wi,{title:"Voice actors",get children(){var f=G2();return d(f,a(Y,{get each(){return n().data.voices},children:g=>a(as,{get staff(){return g.person},get positions(){return[g.language]}})})),f}}),null),L(()=>V(l,"src",n().data.images.webp.image_url)),r}})}})}function Wi(e){return(()=>{var t=Y2(),n=t.firstChild,r=n.firstChild;return d(r,()=>e.title),d(t,()=>e.children,null),t})()}var z2=p("<div data-k-47610970><h3 data-k-47610970>Activity</h3><div data-k-47610970 class=activity-history-container><ol data-k-47610970 class=activity-history-header-list></ol><ol data-k-47610970 class=activity-history-list>"),W2=p("<li data-k-47610970 class=activity-history-header>"),q2=p("<li data-k-47610970 class=activity-item>"),K2=p("<p data-k-47610970>"),J2=p("<p data-k-47610970>Amount: ");function X2(e){const t=Z2()/1e3,n=N(()=>{var u,h,f;const l=new Date/1e3,s=[];(u=e.history)==null||u.forEach((g,m,y)=>{var _;const v=g.date-Uf((_=y[m-1])==null?void 0:_.date,t-er);if(!(g.date<t||g.date>l+er)){for(let x=Math.floor(v/er)-1;x>0;x--)s.push({date:g.date-er*x});s.push(g)}});const o=(f=(h=e.history)==null?void 0:h.at(-1))==null?void 0:f.date,c=Math.floor((l-o)/er);for(let g=1;g<c;g++)s.push({date:o+er*g});return s}),r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return a(T,{get when(){return e.history.at(-1).date>t},get children(){var l=z2(),s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling;return d(c,a(Y,{each:r,children:(h,f)=>(()=>{var g=W2();return d(g,()=>Sf(r,f()+pu)),g})()})),d(u,a(Y,{get each(){return n()},children:h=>(()=>{var f=q2();return d(f,a(i,{get date(){return h.date*1e3},get amount(){return h.amount}})),L(()=>V(f,"data-level",h.level)),f})()})),l}});function i(l){const s=o=>{if(o<(t+5184e3)*1e3)return"right";if(o>(t+10368e3)*1e3)return"left"};return a(Ct,{get tipPosition(){return s(l.date)},get children(){return[(()=>{var o=K2();return d(o,()=>ld(l.date)),o})(),(()=>{var o=J2();return o.firstChild,d(o,()=>l.amount||0,null),o})()]}})}}const pu=1,Z2=()=>{const[e]=new Date().toISOString().split("T"),t=new Date(`${e}T00:00`);return t.setDate(t.getDate()-182),t.setDate(t.getDate()-t.getDay()+pu),t.getTime()};var Q2=p("<p>"),ew=p("<p> (fancy)"),tw=p("<p> (extra fancy)"),nw=p("<div class=user-favourites><h3>Favourite animes</h3><ol class=grid-reel-auto-fill>"),rw=p("<div class=user-favourites><h3>Favourite manga</h3><ol class=grid-reel-auto-fill>"),aw=p("<div class=user-favourites><h3>Favourite characters</h3><ol class=grid-reel-auto-fill>"),iw=p("<div class=user-favourites><h3>Favourite staff</h3><ol class=grid-reel-auto-fill>"),lw=p("<div class=user-favourites-studio><h3>Favourite studio</h3><ol>"),sw=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total anime</p></div><div class=profile-progress-item><p class=header></p><p>Days watched</p></div><div class=profile-progress-item><p class=header></p><p>Episodes watched</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),ow=p("<div class=container><div class=profile-progress-item><p class=header></p><p>Total manga</p></div><div class=profile-progress-item><p class=header></p><p>Chapters read</p></div><div class=profile-progress-item><p class=header></p><p>Volumes read</p></div><div class=profile-progress-item><p class=header></p><p>Mean score"),cw=p("<div class=user-profile-overview-body><div class=user-info-container></div><div class=user-activity-container><div class=user-profile-progress></div><div class=user-profile-genres></div><div class=user-profile-activity>"),Ma=p("<img alt=Cover>"),rr=p("<li class=item>"),dw=p("<div class=user-genres-overview><h3></h3><ol>"),uw=p("<span>%");function hw(){const{user:e}=Ze(),{accessToken:t}=ie(),[n,{mutateCache:r}]=ae.anilist.activityByUserId(()=>e().id||void 0,t);return(()=>{var i=cw(),l=i.firstChild,s=l.nextSibling,o=s.firstChild,c=o.nextSibling,u=c.nextSibling;return d(l,a(j,{get children(){return[a(M,{get when(){return e().donatorTier===1},get children(){var h=Q2();return d(h,()=>e().donatorBadge),h}}),a(M,{get when(){return e().donatorTier===2},get children(){var h=ew(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}}),a(M,{get when(){return e().donatorTier===3},get children(){var h=tw(),f=h.firstChild;return d(h,()=>e().donatorBadge,f),h}})]}}),null),d(l,a(X2,{get history(){var h;return((h=e().stats)==null?void 0:h.activityHistory)||[]}}),null),d(l,a(T,{get when(){return e().favourites.anime.edges.length},get children(){var h=nw(),f=h.firstChild,g=f.nextSibling;return d(g,a(Y,{get each(){return e().favourites.anime.edges},children:m=>(()=>{var y=rr();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Ma();return L(()=>V(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.manga.edges.length},get children(){var h=rw(),f=h.firstChild,g=f.nextSibling;return d(g,a(Y,{get each(){return e().favourites.manga.edges},children:m=>(()=>{var y=rr();return d(y,a(B,{get href(){return Ve(m.node)},get children(){var v=Ma();return L(()=>V(v,"src",m.node.coverImage.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.characters.edges.length},get children(){var h=aw(),f=h.firstChild,g=f.nextSibling;return d(g,a(Y,{get each(){return e().favourites.characters.edges},children:m=>(()=>{var y=rr();return d(y,a(B,{get href(){return"/ani/character/"+m.node.id+"/"+Ke(m.node.name.userPreferred)},get children(){var v=Ma();return L(()=>V(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.staff.edges.length},get children(){var h=iw(),f=h.firstChild,g=f.nextSibling;return d(g,a(Y,{get each(){return e().favourites.staff.edges},children:m=>(()=>{var y=rr();return d(y,a(B,{get href(){return"/ani/staff/"+m.node.id+"/"+Ke(m.node.name.userPreferred)},get children(){var v=Ma();return L(()=>V(v,"src",m.node.image.large)),v}})),y})()})),h}}),null),d(l,a(T,{get when(){return e().favourites.studios.edges.length},get children(){var h=lw(),f=h.firstChild,g=f.nextSibling;return d(g,a(Y,{get each(){return e().favourites.studios.edges},children:m=>(()=>{var y=rr();return d(y,a(B,{get href(){return"/ani/studio/"+m.node.id+"/"+Ke(m.node.name)},get children(){return m.node.name}})),y})()})),h}}),null),d(o,a(T,{get when(){return e().statistics.anime.count},get children(){var h=sw(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,_=v.firstChild,x=v.nextSibling,S=x.firstChild;return d(g,()=>ye(e().statistics.anime.count)),d(y,()=>(e().statistics.anime.minutesWatched/60/24).toFixed(1)),d(_,()=>ye(e().statistics.anime.episodesWatched)),d(S,()=>e().statistics.anime.meanScore),h}}),null),d(o,a(T,{get when(){return e().statistics.manga.count},get children(){var h=ow(),f=h.firstChild,g=f.firstChild,m=f.nextSibling,y=m.firstChild,v=m.nextSibling,_=v.firstChild,x=v.nextSibling,S=x.firstChild;return d(g,()=>ye(e().statistics.manga.count)),d(y,()=>ye(e().statistics.manga.chaptersRead)),d(_,()=>ye(e().statistics.manga.volumesRead)),d(S,()=>e().statistics.manga.meanScore),h}}),null),d(c,a(Oo,{title:"Anime genre overview",type:"anime",get genres(){return e().statistics.anime.genrePreview},get total(){return e().statistics.anime.count}}),null),d(c,a(Oo,{title:"Manga genre overview",type:"manga",get genres(){return e().statistics.manga.genrePreview},get total(){return e().statistics.manga.count}}),null),d(u,a(Y,{get each(){var h;return(h=n())==null?void 0:h.data.data.Page.activities},children:h=>a(ts,{activity:h,mutateCache:r,hideProfile:!0,small:!0})})),i})()}function Oo(e){F(e.genres,"Genres missing"),F(e.title,"Title missing");const{user:t}=Ze();return a(T,{get when(){return e.total},get children(){var n=dw(),r=n.firstChild,i=r.nextSibling;return d(r,()=>e.title),d(i,a(Y,{get each(){return e.genres},children:l=>(()=>{var s=rr();return d(s,a(B,{get href(){return"/user/"+t().name+"/"+e.type+"?genre="+l.genre},get children(){return[N(()=>l.genre)," ",(()=>{var o=uw(),c=o.firstChild;return d(o,()=>Math.round(l.count/e.total*100),c),o})()]}})),s})()})),n}})}function gw(e){return new Worker("/legendary-octo-barnacle/branches/feature-add-dev-branch-preview-to-production/assets/user-media-list-BL7blnTC.js",{name:e==null?void 0:e.name})}var fw=p("<button data-k-cd7ed032>+");function qi(e){const[t,n]=O(e.entry[e.progressKey]),{triggerProgressIncrease:r,isOwnProfile:i}=Ll();return W(se(()=>e.entry,l=>n(l[e.progressKey]),{defer:!0})),[N(()=>e.label)," ",N(t),a(T,{get when(){return t()<e.entry.media[e.maxProgressKey]},get children(){return["/",N(()=>e.entry.media[e.maxProgressKey])]}}),a(T,{get when(){return i()},get children(){return a(T,{get when(){return e.entry.media[e.maxProgressKey]===null||t()<e.entry.media[e.maxProgressKey]},get children(){var l=fw();return l.$$click=s=>{s.preventDefault(),n(o=>{const c=Math.min(e.entry.media[e.maxProgressKey]||o+1,o+1);return r(e.entry.media.id,c,e.progressKey),c})},l}})}})]}_e(["click"]);var mw=p("<br>"),pw=p("<p>");function vw(e){return(()=>{var t=pw();return d(t,a(j,{get children(){return[a(M,{get when(){return e.entry.media.type==="ANIME"},get children(){return a(qi,Fe(e,{label:"Ep",progressKey:"progress",maxProgressKey:"episodes"}))}}),a(M,{get when(){return e.entry.media.type==="MANGA"},get children(){return[a(qi,Fe(e,{label:"Ch",progressKey:"progress",maxProgressKey:"chapters"})),mw(),a(qi,Fe(e,{label:"Vol",progressKey:"progressVolumes",maxProgressKey:"volumes"}))]}})]}})),t})()}var $w=p("<div data-k-406f27d4>"),_w=p("<h2 data-k-406f27d4>"),bw=p("<ol data-k-406f27d4 class=user-profile-media-list-grid>"),yw=p('<div data-k-406f27d4 class="badge repeat">'),ww=p('<div data-k-406f27d4 class="badge notes"><svg data-k-406f27d4 aria-hidden=true focusable=false role=img xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"><path data-k-406f27d4 fill=currentColor d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z">'),kw=p("<p data-k-406f27d4 class=adult-warning>18+"),Sw=p("<div data-k-406f27d4 class=container><img data-k-406f27d4 class=cover alt=Cover.><div data-k-406f27d4 class=card-header></div><div data-k-406f27d4 class=card-footer><p data-k-406f27d4></p><div data-k-406f27d4 class=scores>"),Cw=p("<li data-k-406f27d4 class=card>");function xw(e){const[t,n]=je({}),r=te(),{user:i}=Ze(),{openEditor:l}=El(),{isOwnProfile:s}=Ll(),o=u=>{for(const h of u)n(h.target.dataset.list,h.target.dataset.index,h.isIntersecting)},c=new IntersectionObserver(o,{rootMargin:"500px"});return Ye(()=>{c.disconnect()}),(()=>{var u=$w();return d(u,a(T,{get when(){var h;return(h=e.listData())==null?void 0:h.data},get children(){return a(Y,{get each(){return e.listData().data.lists},children:h=>(n(h.name,{}),a(T,{get when(){return N(()=>!!h.entries.length)()&&(!r.list||decodeURI(r.list)===h.name)},get children(){return[(()=>{var f=_w();return d(f,()=>h.name),f})(),(()=>{var f=bw();return d(f,a(Y,{get each(){return h.entries},children:(g,m)=>{let y;return xn(()=>c.observe(y)),Ye(()=>c.unobserve(y)),(()=>{var v=Cw(),_=y;return typeof _=="function"?ue(_,v):y=v,d(v,a(T,{get when(){return t[h.name][m()]},get children(){return a(B,{class:"clean-link",get href(){return Ve(g.media)},get children(){var x=Sw(),S=x.firstChild,k=S.nextSibling,b=k.nextSibling,A=b.firstChild,w=A.nextSibling;return d(k,a(T,{get when(){return g.repeat},get children(){var $=yw();return d($,()=>g.repeat,null),d($,a(Qa,{}),null),L(()=>V($,"label","Rewatched "+g.repeat+" times")),$}}),null),d(k,a(T,{get when(){return g.notes},get children(){var $=ww();return L(()=>V($,"label",g.notes)),$}}),null),d(b,a(T,{get when(){return g.media.isAdult},get children(){return kw()}}),A),d(A,()=>g.media.title.userPreferred),d(w,a(vw,{entry:g}),null),d(w,a(ds,{get score(){return g.score},get format(){return i().mediaListOptions.scoreFormat||"POINT_10_DECIMAL"}}),null),d(x,a(T,{get when(){return s()},get children(){return a(Md,{big:!0,label:"Edit media",onClick:$=>{$.preventDefault(),l({...g.media,mediaListEntry:g},{mutateMedia:C=>{C=Af(g,C),e.mutateMediaListCache(E=>{function I(P,R){const U=E.data.lists.findIndex(J=>J.name===P&&J.isCustomList===R);U===-1&&E.data.lists.push({name:P,isCustomList:!1,isCompletedList:!1,entries:[]});const H=E.data.lists.at(U);H.entries.push(C),e.listData().data.indecies[g.media.id].push([U===-1?E.data.lists.length-1:U,H.entries.length-1])}if(e.listData().data.indecies[g.media.id].forEach(([P,R])=>{E.data.lists[P].entries.splice(R,1)}),e.listData().data.indecies[g.media.id]=[],!C.hiddenFromStatusLists){const P=$u(C.status,r.type);I(P,!1)}for(const[P,R]of Object.entries(C.customLists??{}))R&&I(P,!0);return E},e.updateListInfo)},deleteMedia:()=>{e.mutateMediaListCache(C=>(e.listData().data.indecies[g.media.id].forEach(([E,I])=>{C.data.lists[E].entries.splice(I,1)}),C),e.updateListInfo)}})},get children(){return a(Pd,{})}})}}),null),L(()=>V(S,"src",g.media.coverImage.large)),x}})}})),L(x=>{var S=m(),k=h.name;return S!==x.e&&V(v,"data-index",x.e=S),k!==x.t&&V(v,"data-list",x.t=k),x},{e:void 0,t:void 0}),v})()}})),f})()]}}))})}})),u})()}var Aw=p("<ol><li><button>All "),Tw=p("<li><button> ");function Iw(e){const t=vu(),n=te();return a(T,{get when(){var r;return(r=e.listData())==null?void 0:r.data},get children(){var r=Aw(),i=r.firstChild,l=i.firstChild,s=l.firstChild;return l.$$click=()=>t(""),d(l,a(T,{get when(){return n.list===void 0},children:"> "}),s),d(l,()=>e.listData().data.total,null),d(r,a(Y,{get each(){return e.listData().data.lists},children:o=>(()=>{var c=Tw(),u=c.firstChild,h=u.firstChild;return u.$$click=()=>t(o.name),d(u,a(T,{get when(){return decodeURI(n.list)===o.name},children:"> "}),h),d(u,()=>o.name,h),d(u,()=>o.entries.length,null),c})()}),null),r}})}_e(["click"]);var Ew=p("<option data-k-4ded799d value>All formats"),Lw=p("<option data-k-4ded799d value>Any User Status"),Pw=p("<option data-k-4ded799d value>Any Status"),Mw=p("<option data-k-4ded799d value>All genres"),Dw=p("<option data-k-4ded799d value>All countries"),Rw=p("<option data-k-4ded799d value>All ratings"),Nw=p("<option data-k-4ded799d value>All studios"),Ow=p("<select data-k-4ded799d name=studio><option data-k-4ded799d value hidden>Studio"),Fw=p("<option data-k-4ded799d value>All tags"),Uw=p("<label data-k-4ded799d for=private><input data-k-4ded799d type=checkbox name=private id=private> Private"),Bw=p("<button data-k-4ded799d>Compare with your list"),Vw=p("<button data-k-4ded799d>Open in compare page"),Gw=p('<div data-k-4ded799d class=user-profile-media-list-search><input data-k-4ded799d type=text placeholder=Search><select data-k-4ded799d name=format><option data-k-4ded799d value hidden>Format</option><option data-k-4ded799d value=MOVIE>Movie</option><option data-k-4ded799d value=MUSIC>Music</option><option data-k-4ded799d value=ONA>Ona</option><option data-k-4ded799d value=OVA>Ova</option><option data-k-4ded799d value=SPECIAL>Special</option><option data-k-4ded799d value=TV>TV</option><option data-k-4ded799d value=TV_SHORT>TV short</option></select><select data-k-4ded799d name=userStatus><option data-k-4ded799d value hidden>User Status</option><option data-k-4ded799d value=COMPLETED>Completed</option><option data-k-4ded799d value=CURRENT></option><option data-k-4ded799d value=DROPPED>Dropped</option><option data-k-4ded799d value=PAUSED>Paused</option><option data-k-4ded799d value=PLANNING>Planning</option><option data-k-4ded799d value=REPEATING></option></select><select data-k-4ded799d name=status><option data-k-4ded799d value hidden>Status</option><option data-k-4ded799d value=RELEASING>Releasing</option><option data-k-4ded799d value=FINISHED>Finished</option><option data-k-4ded799d value=NOT_YET_RELEASED>Not Yet Released</option><option data-k-4ded799d value=CANCELLED>Cancelled</option></select><select data-k-4ded799d name=genre><option data-k-4ded799d value hidden>Genre</option><option data-k-4ded799d value=Action>Action</option><option data-k-4ded799d value=Adventure>Adventure</option><option data-k-4ded799d value=Comedy>Comedy</option><option data-k-4ded799d value=Drama>Drama</option><option data-k-4ded799d value=Ecchi>Ecchi</option><option data-k-4ded799d value=Fantasy>Fantasy</option><option data-k-4ded799d value=Hentai>Hentai</option><option data-k-4ded799d value=Horror>Horror</option><option data-k-4ded799d value="Mahou Shoujo">Mahou Shoujo</option><option data-k-4ded799d value=Mecha>Mecha</option><option data-k-4ded799d value=Music>Music</option><option data-k-4ded799d value=Mystery>Mystery</option><option data-k-4ded799d value=Psychological>Psychological</option><option data-k-4ded799d value=Romance>Romance</option><option data-k-4ded799d value=Sci-Fi>Sci-Fi</option><option data-k-4ded799d value="Slice of Life">Slice of Life</option><option data-k-4ded799d value=Sports>Sports</option><option data-k-4ded799d value=Supernatural>Supernatural</option><option data-k-4ded799d value=Thriller>Thriller</option></select><select data-k-4ded799d name=countryOfOrigin><option data-k-4ded799d value hidden>Country</option><option data-k-4ded799d value=CN>China</option><option data-k-4ded799d value=JP>Japan</option><option data-k-4ded799d value=KR>South Korea</option><option data-k-4ded799d value=TW>Taiwan</option></select><select data-k-4ded799d name=isAdult><option data-k-4ded799d value hidden>Age rating</option><option data-k-4ded799d value=false>R-17+</option><option data-k-4ded799d value=true>R-18</option></select><select data-k-4ded799d name=tag><option data-k-4ded799d value hidden>Tag</option></select><input data-k-4ded799d type=number placeholder="Release year"max=9999 min=0><label data-k-4ded799d for=notes><input data-k-4ded799d type=checkbox name=notes id=notes> Notes</label><label data-k-4ded799d for=repeat><input data-k-4ded799d type=checkbox name=repeat id=repeat> </label><label data-k-4ded799d for=missingStart><input data-k-4ded799d type=checkbox name=missingStart id=missingStart> Missing start date</label><label data-k-4ded799d for=missingScore><input data-k-4ded799d type=checkbox name=missingScore id=missingScore> Missing score</label><label data-k-4ded799d for=reverse><input data-k-4ded799d type=checkbox name=reverse id=reverse> Reverse order</label><select data-k-4ded799d name=sort><option data-k-4ded799d value=score>Score</option><option data-k-4ded799d value=title>Title</option><option data-k-4ded799d value=progress>Progress</option><option data-k-4ded799d value=updatedAt>Last Updated</option><option data-k-4ded799d value=startedAt>Start Date</option><option data-k-4ded799d value=completedAt>Completed Date</option><option data-k-4ded799d value=releaseDate>Release Date</option><option data-k-4ded799d value=averageScore>Average Score</option><option data-k-4ded799d value=popularity>Popularity</option><option data-k-4ded799d value=repeat>'),Fo=p("<option data-k-4ded799d>"),Hw=p("<button data-k-4ded799d>Remove filters"),Yw=p("<button data-k-4ded799d>Back to home");function jw(e){const t=vu(),n=Jt(),{authUserData:r}=ie(),{isOwnProfile:i}=Ll(),{user:l}=Ze(),s=te();return(()=>{var c=Gw(),u=c.firstChild,h=u.nextSibling,f=h.firstChild,g=f.nextSibling,m=h.nextSibling,y=m.firstChild,v=y.nextSibling,_=v.nextSibling,x=_.nextSibling,S=x.nextSibling,k=S.nextSibling,b=k.nextSibling,A=m.nextSibling,w=A.firstChild,$=w.nextSibling,C=A.nextSibling,E=C.firstChild,I=E.nextSibling,P=C.nextSibling,R=P.firstChild,U=R.nextSibling,H=P.nextSibling,J=H.firstChild,G=J.nextSibling,q=H.nextSibling;q.firstChild;var he=q.nextSibling,Z=he.nextSibling,X=Z.firstChild,Q=Z.nextSibling,pe=Q.firstChild;pe.nextSibling;var ge=Q.nextSibling,me=ge.firstChild,oe=ge.nextSibling,z=oe.firstChild,Je=oe.nextSibling,ft=Je.firstChild,Re=Je.nextSibling,et=Re.firstChild,Vt=et.nextSibling,ot=Vt.nextSibling,yt=ot.nextSibling,ct=yt.nextSibling,tt=ct.nextSibling,At=tt.nextSibling,mt=At.nextSibling,nt=mt.nextSibling,ne=nt.nextSibling;return u.$$input=ee=>e.setSearchParams({search:ee.target.value||void 0}),d(c,a(Iw,{get listData(){return e.listData}}),h),h.addEventListener("change",ee=>e.setSearchParams({format:ee.target.value||void 0})),d(h,a(T,{get when(){return e.format()},get children(){return Ew()}}),g),m.addEventListener("change",ee=>e.setSearchParams({userStatus:ee.target.value||void 0})),d(m,a(T,{get when(){return e.userStatus()},get children(){return Lw()}}),v),d(_,a(j,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Watching"}),a(M,{get when(){return s.type==="manga"},children:"Reading"})]}})),d(b,a(j,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatching"}),a(M,{get when(){return s.type==="manga"},children:"Rereading"})]}})),A.addEventListener("change",ee=>e.setSearchParams({status:ee.target.value||void 0})),d(A,a(T,{get when(){return e.status()},get children(){return Pw()}}),$),C.addEventListener("change",ee=>e.setSearchParams({genre:ee.target.value||void 0})),d(C,a(T,{get when(){return e.genre()},get children(){return Mw()}}),I),P.addEventListener("change",ee=>e.setSearchParams({countryOfOrigin:ee.target.value||void 0})),d(P,a(T,{get when(){return e.countryOfOrigin()},get children(){return Dw()}}),U),H.addEventListener("change",ee=>e.setSearchParams({isAdult:ee.target.value||void 0})),d(H,a(T,{get when(){return e.isAdult()!==void 0},get children(){return Rw()}}),G),d(c,a(T,{get when(){return s.type==="anime"},get children(){var ee=Ow();return ee.firstChild,ee.addEventListener("change",$e=>e.setSearchParams({studio:$e.target.value||void 0})),d(ee,a(T,{get when(){return e.studio()},get children(){return Nw()}}),null),d(ee,a(Y,{get each(){var $e,Te;return(Te=($e=e.listData())==null?void 0:$e.data)==null?void 0:Te.studios},children:$e=>(()=>{var Te=Fo();return Te.value=$e,d(Te,$e),L(()=>Te.selected=$e==e.studio()),Te})()}),null),L(()=>ee.value=e.studio()),ee}}),q),q.addEventListener("change",ee=>e.setSearchParams({tag:ee.target.value||void 0})),d(q,a(T,{get when(){return e.tag()},get children(){return Fw()}}),null),d(q,a(Y,{get each(){var ee,$e;return($e=(ee=e.listData())==null?void 0:ee.data)==null?void 0:$e.tags},children:ee=>(()=>{var $e=Fo();return $e.value=ee,d($e,ee),L(()=>$e.selected=ee==e.tag()),$e})()}),null),he.$$input=ee=>e.setSearchParams({year:ee.target.value||void 0}),d(c,a(T,{get when(){return i()},get children(){var ee=Uw(),$e=ee.firstChild;return $e.addEventListener("change",Te=>e.setSearchParams({private:Te.target.checked?"true":void 0})),L(()=>$e.checked=e.privateFilter()),ee}}),Z),X.addEventListener("change",ee=>e.setSearchParams({notes:ee.target.checked?"true":void 0})),pe.addEventListener("change",ee=>e.setSearchParams({repeat:ee.target.checked?"true":void 0})),d(Q,a(j,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatched"}),a(M,{get when(){return s.type==="manga"},children:"Reread"})]}}),null),me.addEventListener("change",ee=>e.setSearchParams({missingStart:ee.target.checked?"true":void 0})),z.addEventListener("change",ee=>e.setSearchParams({missingScore:ee.target.checked?"true":void 0})),ft.addEventListener("change",ee=>e.setSearchParams({reverse:ee.target.checked?"true":void 0})),Re.addEventListener("change",ee=>e.setSearchParams({sort:ee.target.value==="score"?void 0:ee.target.value})),d(ne,a(j,{get children(){return[a(M,{get when(){return s.type==="anime"},children:"Rewatches"}),a(M,{get when(){return s.type==="manga"},children:"Rereads"})]}})),d(c,a(j,{get children(){return[a(M,{get when(){var ee,$e;return N(()=>!i())()&&(($e=(ee=r())==null?void 0:ee.data)==null?void 0:$e.name)},get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+l().name+"&user="+r().data.name},get children(){return Bw()}})}}),a(M,{when:!0,get children(){return a(B,{get href(){return"/compare/"+s.type+"?user="+l().name},get children(){return Vw()}})}})]}}),null),d(c,a(o,{}),null),L(()=>u.value=e.search()),L(()=>h.value=e.format()||""),L(()=>m.value=e.userStatus()||""),L(()=>A.value=e.status()||""),L(()=>C.value=e.genre()),L(()=>P.value=e.countryOfOrigin()||""),L(()=>H.value=e.isAdult()===void 0?"":String(e.isAdult())),L(()=>q.value=e.tag()),L(()=>he.value=e.year()),L(()=>X.checked=e.notesFilter()),L(()=>pe.checked=e.rewatchedFilter()),L(()=>me.checked=e.missingStartFilter()),L(()=>z.checked=e.missingScoreFilter()),L(()=>ft.checked=e.reverse()),L(()=>Re.value=e.sort()),c})();function o(){return a(j,{get children(){return[a(M,{get when(){return n.search},get children(){var c=Hw();return c.$$click=()=>{e.setSearchParams({search:void 0,format:void 0,status:void 0,genre:void 0,countryOfOrigin:void 0,missingStart:void 0,missingScore:void 0,isAdult:void 0,year:void 0,private:void 0,notes:void 0,repeat:void 0,sort:void 0,userStatus:void 0,studio:void 0,tag:void 0})},c.style.setProperty("background","skyblue"),c}}),a(M,{get when(){return s.list},get children(){var c=Yw();return c.$$click=()=>{t("")},c.style.setProperty("background","lime"),c}})]}})}}_e(["input","click"]);var zw=p("<div data-k-45f62037 class=user-profile-media-list-body>");const vu=()=>{const e=un(),{user:t}=Ze(),n=te();return r=>{e(`/user/${t().name}/${n.type}${r?"/"+r:""}${location.search}`,{replace:!0})}};function Uo(){const{user:e}=Ze(),t=te(),{accessToken:n,authUserData:r}=ie(),[i,{mutateCache:l}]=ae.anilist.mediaListByUserName(()=>e().name||void 0,()=>t.type.toUpperCase(),n),[s,o]=Ae(),[c,u]=O({});let h;W(se(e,G=>{G&&(document.title=`${G.name} ${t.type} - LOB`)})),document.title="Authentication - LOB";const f=G=>{o(G,{replace:!0})},g=()=>s.search||"",m=()=>s.format||"",y=()=>s.status||"",v=()=>s.genre||"",_=()=>s.countryOfOrigin||"",x=()=>{if(s.isAdult==="true")return!0;if(s.isAdult==="false")return!1},S=()=>s.year||"",k=()=>s.private==="true",b=()=>s.notes==="true",A=()=>s.repeat==="true",w=()=>s.missingStart==="true",$=()=>s.missingScore==="true",C=()=>s.reverse==="true",E=()=>s.sort||"score",I=()=>s.userStatus||"",P=()=>s.studio||"",R=()=>s.tag||"",U=ua(async(G,q,he)=>{F(he,"Progress key is undefined");const Z=await ae.anilist.mutateMedia(n(),{mediaId:G,[he]:q});Z.status===200&&l(X=>{function Q(pe,ge){const me=X.data.lists.findIndex(z=>z.name===pe&&z.isCustomList===ge);me===-1&&X.data.lists.push({name:pe,isCustomList:!1,isCompletedList:!1,entries:[]});const oe=X.data.lists.at(me);oe.entries.push(Z.data),c().data.indecies[G].push([me===-1?X.data.lists.length-1:me,oe.entries.length-1])}if(c().data.indecies[G].forEach(([pe,ge])=>{X.data.lists[pe].entries.splice(ge,1)}),c().data.indecies[G]=[],!Z.data.hiddenFromStatusLists){const pe=$u(Z.data.status,t.type);Q(pe,!1)}for(const[pe,ge]of Object.entries(Z.data.customLists??{}))ge&&Q(pe,!0);return X})},250,2),H=()=>{if(window.Worker&&i()){h=h instanceof Worker?h:new gw;const G={cacheKey:i().cacheKey,search:g(),format:m(),status:y(),genre:v(),reverse:C(),countryOfOrigin:_(),missingStart:w(),missingScore:$(),isAdult:x(),year:+S()||void 0,private:k(),notes:b(),repeat:A(),sort:E(),studio:P(),type:t.type,userStatus:I(),tag:R()};h.postMessage(G),h.onmessage=q=>{if(q.data==="success"){const he=Ge.user();he.onsuccess=Z=>{const X=Z.target.result,pe=Ge.store(X,"data","readonly").get("media_list");pe.onsuccess=ge=>{u(ge.target.result||{})}}}else console.error("Error")}}};W(H),Ye(()=>{h instanceof Worker&&h.terminate()});function J(){var G;return e().id===((G=r())==null?void 0:G.data.id)}return a(pc.Provider,{value:{triggerProgressIncrease:U,isOwnProfile:J},get children(){var G=zw();return d(G,a(jw,{listData:c,setSearchParams:f,search:g,format:m,status:y,genre:v,countryOfOrigin:_,isAdult:x,year:S,privateFilter:k,notesFilter:b,rewatchedFilter:A,missingStartFilter:w,missingScoreFilter:$,reverse:C,sort:E,userStatus:I,studio:P,tag:R}),null),d(G,a(xw,{listData:c,mutateMediaListCache:l,updateListInfo:H}),null),G}})}function $u(e,t){switch(e){case"COMPLETED":case"DROPPED":case"PAUSED":case"PLANNING":return qe(e);case"CURRENT":return t==="anime"?"Watching":"Reading";case"REPEATING":return t==="anime"?"Rewatching":"Rereading";default:F(!1,"Unkown status: "+e)}}var Ww=p("<button data-k-1fe26ca9 class=cp-delete-favourite>Delete");function Gr(e){const{authUserData:t,accessToken:n}=ie(),{user:r}=Ze();return F(e.onClick,"onClick is missing"),F(e.mutate,"mutate is missing"),a(T,{get when(){var i;return r().id===((i=t())==null?void 0:i.data.id)},get children(){var i=Ww();return i.$$click=async l=>{l.preventDefault(),e.onClick(),(await ae.anilist.toggleFavourite(n(),{mangaId:e.mangaId,animeId:e.animeId,staffId:e.staffId,characterId:e.characterId,studioId:e.studioId})).status===200&&e.mutate()},i}})}_e(["click"]);var Da=p("<img data-k-81c02ac9 alt=Cover>"),qw=p("<li data-k-81c02ac9>");function Kw(e){const[t,n]=O(!1),{setAllEdges:r,type:i}=_c(),l=s=>r(o=>o.filter(c=>c.node.id!==s));return(()=>{var s=qw();return d(s,a(j,{get children(){return[a(M,{when:i==="anime",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Gr,{get animeId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return L(()=>V(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:i==="manga",get children(){return a(B,{get href(){return Ve(e.edge.node)},get children(){return[a(Gr,{get mangaId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return L(()=>V(o,"src",e.edge.node.coverImage.large)),o})()]}})}}),a(M,{when:i==="characters",get children(){return a(B,{get href(){return"/ani/character/"+e.edge.node.id+"/"+Ke(e.edge.node.name.userPreferred)},get children(){return[a(Gr,{get characterId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return L(()=>V(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:i==="staff",get children(){return a(B,{get href(){return"/ani/staff/"+e.edge.node.id+"/"+Ke(e.edge.node.name.userPreferred)},get children(){return[a(Gr,{get staffId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),(()=>{var o=Da();return L(()=>V(o,"src",e.edge.node.image.large)),o})()]}})}}),a(M,{when:i==="studios",get children(){return a(B,{get href(){return"/ani/studio/"+e.edge.node.id+"/"+Ke(e.edge.node.name)},get children(){return[a(Gr,{get studioId(){return e.edge.node.id},onClick:()=>n(!0),mutate:()=>l(e.edge.node.id)}),N(()=>e.edge.node.name)]}})}})]}})),L(o=>{var c=!!t(),u=e.edge.node.id;return c!==o.e&&s.classList.toggle("hidden",o.e=c),u!==o.t&&V(s,"data-id",o.t=u),o},{e:void 0,t:void 0}),s})()}function _u(e){const{user:t}=Ze(),{type:n,allEdges:r}=_c(),{accessToken:i}=ie(),[l,s]=O(void 0),[o,{mutateCache:c}]=ae.anilist.favouritesByUserId(()=>t().id||void 0,e.page===1?()=>e.page:l,i);return W(()=>{var u,h,f,g,m,y;((h=(u=o())==null?void 0:u.data[n])==null?void 0:h.edges.length)>0&&Ce(r).splice((e.page-1)*25,25,...(g=(f=o())==null?void 0:f.data[n])==null?void 0:g.edges),e.page===1&&e.setVisible(((y=(m=o())==null?void 0:m.data[n])==null?void 0:y.edges.length)>0)}),W(se(r,u=>{Ce(o).data[n].edges=u.slice((e.page-1)*25,e.page*25),c(h=>h)},{defer:!0})),a(gn,{rootMargin:"100px",onIntersection:()=>s(e.page),get loading(){return e.loading},fetchResponse:o,children:u=>[a(Y,{get each(){var h;return(h=o())==null?void 0:h.data[n].edges},children:h=>a(Kw,{edge:h})}),a(T,{get when(){return o().data[n].pageInfo.hasNextPage},get children(){return a(T,{when:u===!1,fallback:"Fetch cooldown",get children(){return a(_u,{get page(){return e.page+1},get loading(){return o.loading}})}})}})]})}var Jw=p("<button data-k-05269ec0>Save"),Xw=p("<button data-k-05269ec0>Cancel"),Zw=p("<button data-k-05269ec0>Reorder"),Qw=p("<details data-k-05269ec0 open><summary data-k-05269ec0><h3 data-k-05269ec0></h3></summary><ol data-k-05269ec0>");function Hr(e){F(e.title,"title missing"),F(e.type,"type missing");const[t,n]=O(!1),[r,i]=O(!1),[l,s]=O([]),{accessToken:o,authUserData:c}=ie(),{user:u}=Ze();let h,f,g,m;const y=()=>{i(!1),l().forEach(S=>{const k=h.querySelector(`li[data-id="${S.node.id}"]`);k&&h.append(k)})},v=S=>{if(!r())return;const k=S.target.closest("li");if(!k)return;k.classList.add("dragging");const b=k.getBoundingClientRect();if(S.type==="touchstart"){const A=S.touches[0];g=A.clientX-b.x,m=A.clientY-b.y}else g=S.clientX-b.x,m=S.clientY-b.y;f=k},_=S=>{var b,A;if(!r()||!f)return;if(S.type==="touchmove"){const w=S.touches[0],$=(b=document.elementFromPoint(w.clientX,w.clientY))==null?void 0:b.closest("li");$&&(f.nextElementSibling===$?$.after(f):$.before(f)),k()}else S.buttons===1&&((A=S.target)==null?void 0:A.tagName)==="LI"?f.nextElementSibling===S.target?S.target.after(f):S.target.before(f):S.buttons!==1&&x();S.buttons===1&&k();function k(){const w=f.getBoundingClientRect();let $=0,C=0,E=S.clientX,I=S.clientY;if(S.type==="touchmove"){const P=S.touches[0];E=P.clientX,I=P.clientY}f.style.transform&&([$,C]=f.style.transform.match(/-?[\d.]+(?=px)/g).map(Number)),f.style.transform=`translate(${$+(E-(w.x+g))}px, ${C+(I-(w.y+m))}px)`}},x=()=>{f&&(f.style.transform=null,f.classList.remove("dragging")),f=null};return(()=>{var S=Qw(),k=S.firstChild,b=k.firstChild,A=k.nextSibling;return d(b,()=>e.title),d(k,a(T,{get when(){var w;return u().id===((w=c())==null?void 0:w.data.id)},get children(){return a(j,{get children(){return[a(M,{get when(){return r()},get children(){return[(()=>{var w=Jw();return w.$$click=async()=>{const $=[...h.childNodes].map(I=>+I.dataset.id),C=$.map((I,P)=>P+1);let E;e.type==="anime"?E=await ae.anilist.mutateFavourites(o(),{animeIds:$,animeOrder:C}):e.type==="manga"?E=await ae.anilist.mutateFavourites(o(),{mangaIds:$,mangaOrder:C}):e.type==="studios"?E=await ae.anilist.mutateFavourites(o(),{studioIds:$,studioOrder:C}):e.type==="staff"?E=await ae.anilist.mutateFavourites(o(),{staffIds:$,staffOrder:C}):e.type==="characters"&&(E=await ae.anilist.mutateFavourites(o(),{characterIds:$,characterOrder:C})),E.status===200?(s(I=>{const P=Object.fromEntries(I.map((R,U)=>[R.node.id,U]));return I.map((R,U)=>I[P[$[U]]])}),i(!1)):(y(),console.error("mutation failed"))},w})(),(()=>{var w=Xw();return w.$$click=y,w})()]}}),a(M,{get when(){return!r()},get children(){var w=Zw();return w.$$click=()=>i($=>!$),w}})]}})}}),null),A.$$touchstart=v,A.$$mousedown=v,A.$$touchend=x,A.$$touchmove=_,A.$$mousemove=_,ue(w=>h=w,A),d(A,a($c.Provider,{get value(){return{type:e.type,setAllEdges:s,allEdges:l}},get children(){return a(T,{get when(){return u().id},keyed:!0,get children(){return a(_u,{page:1,setVisible:n})}})}})),L(w=>{var $=!t(),C=!!r(),E=e.type!=="studios",I=e.type==="studios";return $!==w.e&&S.classList.toggle("hidden",w.e=$),C!==w.t&&A.classList.toggle("reorder",w.t=C),E!==w.a&&A.classList.toggle("grid",w.a=E),I!==w.o&&A.classList.toggle("flex",w.o=I),w},{e:void 0,t:void 0,a:void 0,o:void 0}),S})()}_e(["click","mousemove","touchmove","touchend","mousedown","touchstart"]);var ek=p("<div data-k-821c40e4 class=user-profile-favourites>");function tk(){const{user:e}=Ze();return W(se(e,t=>{document.title=`${t.name} favourites - LOB`})),(()=>{var t=ek();return d(t,a(Hr,{title:"Favourite animes",type:"anime"}),null),d(t,a(Hr,{title:"Favourite characters",type:"characters"}),null),d(t,a(Hr,{title:"Favourite manga",type:"manga"}),null),d(t,a(Hr,{title:"Favourite staff",type:"staff"}),null),d(t,a(Hr,{title:"Favourite studios",type:"studios"}),null),t})()}var nk=p("<div data-k-011bdddf class=user-profile-stats-page><div data-k-011bdddf><ol data-k-011bdddf><li data-k-011bdddf>Anime stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li><li data-k-011bdddf>Manga stats<ol data-k-011bdddf><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li><li data-k-011bdddf></li></ol></li></ol></div><div data-k-011bdddf class=content>");function rk(e){const{user:t}=Ze();return W(()=>{document.title=`${t().name} stats - LOB`}),(()=>{var n=nk(),r=n.firstChild,i=r.firstChild,l=i.firstChild,s=l.firstChild,o=s.nextSibling,c=o.firstChild,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling,g=f.nextSibling,m=g.nextSibling,y=l.nextSibling,v=y.firstChild,_=v.nextSibling,x=_.firstChild,S=x.nextSibling,k=S.nextSibling,b=k.nextSibling,A=r.nextSibling;return d(c,a(B,{get href(){return"/user/"+t().name+"/stats/anime/overview"},children:"Overview"})),d(u,a(B,{get href(){return"/user/"+t().name+"/stats/anime/genres"},children:"Genres"})),d(h,a(B,{get href(){return"/user/"+t().name+"/stats/anime/tags"},children:"Tags"})),d(f,a(B,{get href(){return"/user/"+t().name+"/stats/anime/voice-actors"},children:"Voice actors"})),d(g,a(B,{get href(){return"/user/"+t().name+"/stats/anime/studios"},children:"Studios"})),d(m,a(B,{get href(){return"/user/"+t().name+"/stats/anime/staff"},children:"Staff"})),d(x,a(B,{get href(){return"/user/"+t().name+"/stats/manga/overview"},children:"Overview"})),d(S,a(B,{get href(){return"/user/"+t().name+"/stats/manga/genres"},children:"Genres"})),d(k,a(B,{get href(){return"/user/"+t().name+"/stats/manga/tags"},children:"Tags"})),d(b,a(B,{get href(){return"/user/"+t().name+"/stats/manga/staff"},children:"Staff"})),d(A,()=>e.children),n})()}var ak=p("<div data-k-f2870773><h2 data-k-f2870773>Relations</h2><ol data-k-f2870773 class=grid-column-auto-fill>"),ik=p("<img data-k-f2870773 alt=Cover>"),lk=p("<div data-k-f2870773 class=content><span data-k-f2870773 class=type></span><span data-k-f2870773 class=line-clamp></span><p data-k-f2870773 class=flex-bullet-separator><span data-k-f2870773></span><span data-k-f2870773>"),sk=p("<li data-k-f2870773>");function ok(e){return a(rt,{fallback:"Anilist relations preview error",get children(){return a(T,{get when(){var t;return(t=e.relations)==null?void 0:t.edges.length},get children(){var t=ak(),n=t.firstChild,r=n.nextSibling;return d(r,a(Y,{get each(){return e.relations.edges},children:i=>(()=>{var l=sk();return d(l,a(B,{get href(){return ud(i.node)},class:"media-page-relation",get children(){return[(()=>{var s=ik();return L(()=>V(s,"src",i.node.coverImage.large)),s})(),(()=>{var s=lk(),o=s.firstChild,c=o.nextSibling,u=c.nextSibling,h=u.firstChild,f=h.nextSibling;return d(o,()=>i.relationType),d(c,()=>i.node.title.userPreferred),d(h,()=>dl(i.node.format)),d(f,()=>hd(i.node.status)),s})()]}})),l})()})),t}})}})}const ck="_character-container_1mdg4_1",dk="_character_1mdg4_1",uk="_character-left_1mdg4_21",hk="_character-right_1mdg4_21",gk="_content_1mdg4_26",$n={characterContainer:ck,character:dk,characterLeft:uk,characterRight:hk,content:gk};var fk=p("<h2>Characters"),mk=p("<div><ol class=grid-column-auto-fill>"),pk=p("<img alt=Character>"),Bo=p("<div><p></p><p>"),vk=p("<li>"),$k=p('<img alt="Voice actor">');const Vo=(e,t)=>{const n=Hl(t);return n!=="Japanese"&&e.some(r=>r.voiceActors.some(i=>i.language===n))?n:"Japanese"};function _k(e){const t=Fe({characters:[],countryOfOrigin:"JP"},e),[n,r]=O(Vo(t.characters,t.countryOfOrigin));return W(()=>{r(Vo(t.characters,t.countryOfOrigin))}),a(rt,{fallback:"Characters error",get children(){return a(T,{get when(){return t.characters.length},get children(){var i=mk(),l=i.firstChild;return d(i,a(B,{href:"characters",get children(){return fk()}}),l),d(l,a(Y,{get each(){return t.characters},children:s=>(()=>{var o=vk();return d(o,a(B,{get href(){return"/ani/character/"+s.node.id+"/"+Ke(s.node.name.userPreferred)},get class(){return $n.characterLeft},get children(){return[(()=>{var c=pk();return L(()=>V(c,"src",s.node.image.large)),c})(),(()=>{var c=Bo(),u=c.firstChild,h=u.nextSibling;return d(u,()=>s.node.name.userPreferred),d(h,()=>s.role),L(f=>{var g=$n.content,m=$n.lineClamp;return g!==f.e&&Rt(c,f.e=g),m!==f.t&&Rt(u,f.t=m),f},{e:void 0,t:void 0}),c})()]}}),null),d(o,a(T,{get when(){return s.voiceActors.find(c=>c.language===n())},children:c=>a(B,{get href(){return"/ani/staff/"+c().id+"/"+Ke(c().name.userPreferred)},get class(){return $n.characterRight},get children(){return[(()=>{var u=Bo(),h=u.firstChild,f=h.nextSibling;return d(h,()=>c().name.userPreferred),d(f,()=>c().language),L(g=>{var m=$n.content,y=$n.lineClamp;return m!==g.e&&Rt(u,g.e=m),y!==g.t&&Rt(h,g.t=y),g},{e:void 0,t:void 0}),u})(),(()=>{var u=$k();return L(()=>V(u,"src",c().image.large)),u})()]}})}),null),L(()=>Rt(o,$n.character)),o})()})),L(()=>Rt(i,$n.characterContainer)),i}})}})}var bk=p("<h2 data-k-b8cc53b3>Staff"),yk=p('<div data-k-b8cc53b3><ol data-k-b8cc53b3 class="grid-row-clamp grid-column-auto-fill">'),wk=p('<img data-k-b8cc53b3 alt="Staff profile">'),kk=p("<div data-k-b8cc53b3><p data-k-b8cc53b3></p><p data-k-b8cc53b3>"),Sk=p("<li data-k-b8cc53b3>");function Ck(e){return a(rt,{fallback:"Anilist staff preview error",get children(){return a(T,{get when(){return e.staff},get children(){var t=yk(),n=t.firstChild;return d(t,a(B,{href:"staff",get children(){return bk()}}),n),d(n,a(Y,{get each(){return e.staff},children:r=>(()=>{var i=Sk();return d(i,a(B,{get href(){return"/ani/staff/"+r.node.id+"/"+Gn(r.node.name.userPreferred)},get children(){return[(()=>{var l=wk();return L(()=>V(l,"src",r.node.image.large)),l})(),(()=>{var l=kk(),s=l.firstChild,o=s.nextSibling;return d(s,()=>r.node.name.userPreferred),d(o,()=>r.role),l})()]}})),i})()})),t}})}})}var xk=p("<p class=friend-list-status>");function Ak(e){return(()=>{var t=xk();return d(t,a(j,{get fallback(){return e.friend.status},get children(){return[a(M,{get when(){return e.friend.status==="COMPLETED"},children:"Completed"}),a(M,{get when(){return e.friend.status==="CURRENT"},get children(){return a(j,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Watching"}),a(M,{get when(){return e.type==="MANGA"},children:"Reading"})]}})}}),a(M,{get when(){return e.friend.status==="DROPPED"},children:"Dropped"}),a(M,{get when(){return e.friend.status==="PAUSED"},children:"Paused"}),a(M,{get when(){return e.friend.status==="PLANNING"},children:"Planning"}),a(M,{get when(){return e.friend.status==="REPEATING"},get children(){return a(j,{get children(){return[a(M,{get when(){return e.type==="ANIME"},children:"Rewatching"}),a(M,{get when(){return e.type==="MANGA"},children:"Rereading"})]}})}})]}}),null),d(t,a(T,{get when(){return e.friend.progress>0&&e.friend.progress!==e.media.episodes&&e.friend.progress!==e.media.chapters},get children(){return a(j,{get children(){return[a(M,{get when(){return e.type==="ANIME"},get children(){return[" Ep. ",N(()=>e.friend.progress)]}}),a(M,{get when(){return e.type==="MANGA"},get children(){return[" Ch. ",N(()=>e.friend.progress)]}})]}})}}),null),d(t,a(T,{get when(){return e.friend.progressVolumes>0&&e.friend.progressVolumes!==e.media.volumes},get children(){return[" ","Vol. ",N(()=>e.friend.progressVolumes)]}}),null),t})()}const Tk="_friend-container_8e4dk_1",Ik="_friend_8e4dk_1",Ek="_friend-repeat_8e4dk_35",Sl={friendContainer:Tk,friend:Ik,friendRepeat:Ek};var Lk=p("<div><ul>"),Pk=p('<img alt="User profile">'),Mk=p("<p>"),Dk=p("<div>"),Rk=p("<li>");function Nk(){const e=te(),[t]=Ae(),{accessToken:n,authUserData:r}=ie(),{anilistData:i}=hn(),l=Pe(lg,()=>{var h,f;return{token:n(),id:t.isMalId!=null?(f=(h=i())==null?void 0:h.data)==null?void 0:f.id:e.id,page:1,perPage:8}}),s=Vn({default:()=>ol()>1,"only-if-cached":()=>ol()>2}),[o]=Bn(s,l),[c,u]=O();return L(()=>{var h,f,g;(f=(h=i())==null?void 0:h.data)!=null&&f.mediaListEntry&&r()?u({...(g=i().data)==null?void 0:g.mediaListEntry,user:r().data}):u(null)}),a(rt,{fallback:"Friends error",get children(){return a(T,{get when(){return N(()=>{var h,f;return!!(((f=(h=o())==null?void 0:h.data)!=null&&f.mediaList.length||c())&&i())})()&&r()},get children(){var h=Lk(),f=h.firstChild;return d(f,a(T,{get when(){return c()},get children(){return a(Go,{get friend(){return c()}})}}),null),d(f,a(Y,{get each(){var g,m;return(m=(g=o())==null?void 0:g.data)==null?void 0:m.mediaList},children:g=>a(T,{get when(){var m;return g.user.id!==((m=r())==null?void 0:m.data.id)},get children(){return a(Go,{friend:g})}})}),null),L(()=>Rt(h,Sl.friendContainer)),h}})}})}function Go(e){const{anilistData:t}=hn();return(()=>{var n=Rk();return d(n,a(B,{get class(){return Sl.friend},get href(){return"/user/"+e.friend.user.name},get children(){return[(()=>{var r=Pk();return L(()=>V(r,"src",e.friend.user.avatar.large)),r})(),(()=>{var r=Mk();return d(r,()=>e.friend.user.name),r})(),a(Ak,{get friend(){return e.friend},get media(){var r;return(r=t())==null?void 0:r.data},get type(){var r;return(r=t())==null?void 0:r.data.type}}),a(T,{get when(){return e.friend.repeat},get children(){var r=Dk();return d(r,()=>e.friend.repeat,null),d(r,a(Qa,{}),null),L(()=>Rt(r,Sl.friendRepeat)),r}}),a(ds,{get format(){return e.friend.user.mediaListOptions.scoreFormat},get score(){return e.friend.score}})]}})),n})()}var Ok=p("<button data-k-c63ce0c8>Show"),Fk=p('<div data-k-c63ce0c8 class=recommendations><div data-k-c63ce0c8 class=flex-space-between><h2 data-k-c63ce0c8>Recommendations</h2><div data-k-c63ce0c8></div></div><ol data-k-c63ce0c8 class="grid-column-auto-fill recommendations">');function Uk(e){const t=te(),[n,r]=O(!1),[i,l]=O();return W(se(()=>t.id,s=>{r(!1),l(s)})),a(T,{get when(){var s;return((s=e.recommendations)==null?void 0:s.nodes.length)>0},get children(){var s=Fk(),o=s.firstChild,c=o.firstChild,u=c.nextSibling,h=o.nextSibling;return d(u,a(T,{get when(){return e.recommendations.pageInfo.total>e.recommendations.nodes.length},get children(){var f=Ok();return f.firstChild,f.$$click=()=>r(g=>!g),d(f,a(T,{get when(){return n()},fallback:" more",children:" less"}),null),f}})),d(h,a(j,{get children(){return[a(M,{get when(){return!n()},get children(){return a(Cl,{get nodes(){return e.recommendations.nodes},get mutateCache(){return e.mutateCache}})}}),a(M,{get when(){return n()},get children(){return a(bu,{get id(){return i()},page:1,get mutateOldCardsCache(){return e.mutateCache},get oldCards(){return e.recommendations.nodes}})}})]}})),s}})}function bu(e){const{accessToken:t}=ie(),[n,r]=O(void 0),i=Pe(ig,t,n,e.page),[l,{mutateCache:s}]=Qe(i),o=(c,u)=>s(h=>(h.data.nodes[c]=u,h));return a(gn,{onIntersection:()=>r(e.id),fetchResponse:l,get loadingElement(){return a(Cl,{get nodes(){return e.oldCards||[]},get mutateCache(){return e.mutateCache}})},get loading(){return e.loading},children:c=>[a(Cl,{get nodes(){return l().data.nodes},mutateCache:o,get mutateOldCardsCache(){return e.mutateOldCardsCache},get oldCards(){return e.oldCards}}),a(T,{get when(){return l().data.pageInfo.hasNextPage},get children(){return a(T,{when:c===!1,fallback:"Fetch cooldown",get children(){return a(bu,{get id(){return n()},get page(){return e.page+1},get loading(){return l.loading}})}})}})]})}function Cl(e){return F(!e.oldCards==!e.mutateOldCardsCache,"These two props needs to be used together"),a(Y,{get each(){return e.nodes},children:(t,n)=>a(T,{get when(){return t.mediaRecommendation},get children(){return a(Bk,{node:t,mutateCache:r=>{He(()=>{var i;n()<((i=e.oldCards)==null?void 0:i.length)&&e.mutateOldCardsCache(n(),r),e.mutateCache(n(),r)})}})}})})}function Bk(e){const t=te(),{accessToken:n}=ie(),[r,i]=O(e.node.userRating),[l,s]=O(e.node.rating);let o=e.node.userRating;const c=ua(async(f,g,m,y,v)=>{if(m!==o){const _=await ae.anilist.rateRecommendation(f,g,m,y,v);F(!_.fromCache,"Mutation should never be cached"),_.status===200&&e.mutateCache(_.data)}o=m},1e3);return a(Y$,{get node(){return e.node},get rating(){return l()},get userRating(){return r()},handleRateUp:f=>{f.preventDefault(),i(g=>g==="RATE_UP"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"NO_RATING"):(c(n(),e.node.id,"RATE_UP",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"RATE_UP"))},handleRateDown:f=>{f.preventDefault(),i(g=>g==="RATE_DOWN"?(c(n(),e.node.id,"NO_RATING",t.id,e.node.mediaRecommendation.id),s(m=>m+1),"NO_RATING"):(c(n(),e.node.id,"RATE_DOWN",t.id,e.node.mediaRecommendation.id),s(m=>m-1),"RATE_DOWN"))}})}_e(["click"]);var Vk=p("<h1>"),Gk=p("<ul class=flex-bullet-separator><li></li><li>"),Hk=p("<li>Source: "),Yk=p("<ul><li>Members: </li><li>Favourites: "),jk=p("<div class=pg-ani-media-info>"),zk=p("<li>");function Wk(e){const{anilistData:t}=hn();return a(rt,{fallback:"Anilist media page info error",get children(){var n=jk();return d(n,a(T,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[(()=>{var r=Vk();return d(r,()=>{var i;return(i=t())==null?void 0:i.data.title.userPreferred}),r})(),(()=>{var r=Gk(),i=r.firstChild,l=i.nextSibling;return d(i,a(j,{get children(){return[a(M,{get when(){var s;return((s=t())==null?void 0:s.data.type)==="MANGA"},get children(){return a(j,{get children(){return[a(M,{get when(){var s,o;return(o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year},get children(){return a(B,{get href(){var s;return"/search/manga?year="+((s=t())==null?void 0:s.data.startDate.year)},get children(){var s;return(s=t())==null?void 0:s.data.startDate.year}})}}),a(M,{get when(){var s,o;return((o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year)==null},get children(){return a(B,{href:"/search/manga/tba",children:"TBA"})}})]}})}}),a(M,{get when(){var s;return((s=t())==null?void 0:s.data.type)==="ANIME"},get children(){return a(j,{get children(){return[a(M,{get when(){var s;return N(()=>{var o;return!!((o=t())!=null&&o.data.seasonYear)})()&&((s=t())==null?void 0:s.data.season)},get children(){return a(B,{get href(){var s,o;return"/search/anime/"+((s=t())==null?void 0:s.data.season.toLowerCase())+"-"+((o=t())==null?void 0:o.data.seasonYear)},get children(){return[N(()=>{var s;return wr((s=t())==null?void 0:s.data.season)})," ",N(()=>{var s;return(s=t())==null?void 0:s.data.seasonYear})]}})}}),a(M,{get when(){var s,o;return(o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year},get children(){return a(B,{get href(){var s;return"/search/anime?year="+((s=t())==null?void 0:s.data.startDate.year)},get children(){var s;return(s=t())==null?void 0:s.data.startDate.year}})}}),a(M,{get when(){var s,o;return((o=(s=t())==null?void 0:s.data.startDate)==null?void 0:o.year)==null},get children(){return a(B,{href:"/search/anime/tba",children:"TBA"})}})]}})}})]}})),d(r,a(T,{get when(){var s;return(s=Object.entries(Un.ani.media).find(([,o])=>{var c;return o.api===((c=t())==null?void 0:c.data.format)}))==null?void 0:s[0]},children:s=>(()=>{var o=zk();return d(o,a(j,{get children(){return[a(M,{get when(){var c;return((c=t())==null?void 0:c.data.countryOfOrigin)!=="JP"},get children(){return a(B,{get href(){var c,u;return"/search/"+((c=t())==null?void 0:c.data.type.toLowerCase())+"?format="+s()+"&country="+((u=t())==null?void 0:u.data.countryOfOrigin)},get children(){return[N(()=>{var c;return dl((c=t())==null?void 0:c.data.format)})," (",N(()=>{var c;return Yf((c=t())==null?void 0:c.data.countryOfOrigin)}),")"]}})}}),a(M,{get when(){var c;return((c=t())==null?void 0:c.data.countryOfOrigin)==="JP"},get children(){return a(B,{get href(){var c;return"/search/"+((c=t())==null?void 0:c.data.type.toLowerCase())+"?format="+s()},get children(){var c;return dl((c=t())==null?void 0:c.data.format)}})}})]}})),o})()}),l),d(l,()=>{var s;return hd((s=t())==null?void 0:s.data.status)}),r})(),(()=>{var r=Yk(),i=r.firstChild;i.firstChild;var l=i.nextSibling;return l.firstChild,d(r,a(T,{get when(){var s;return(s=t())==null?void 0:s.data.source},get children(){var s=Hk();return s.firstChild,d(s,a(B,{get href(){var o;return"/search/"+((o=t())==null?void 0:o.data.type.toLowerCase())+"?source="+Object.entries(Dl).find(([,c])=>{var u;return c.api===((u=t())==null?void 0:u.data.source)})[0]},get children(){var o;return jf((o=t())==null?void 0:o.data.source)}}),null),s}}),i),d(i,()=>{var s;return aa((s=t())==null?void 0:s.data.popularity)},null),d(l,()=>{var s;return aa((s=t())==null?void 0:s.data.favourites)},null),r})()]}})),n}})}var qk=p("<h2 data-k-c68b4600>Tags"),Kk=p("<button data-k-c68b4600>"),Jk=p("<div data-k-c68b4600 class=pg-media-tags><div data-k-c68b4600 class=flex-space-between></div><ol data-k-c68b4600>"),Xk=p("<span data-k-c68b4600>%"),Zk=p("<li data-k-c68b4600>");const Qk=e=>{const[t,n]=O(!1);W(se(()=>e.tags,()=>{n(!1)}));function r(){const i=[];for(const l of e.tags){if(l.rank<90&&i.length>=3)break;(t()||!l.isMediaSpoiler&&!l.isGeneralSpoiler)&&i.push(`genre=${l.name}`)}return i}return a(rt,{fallback:"Tags error",get children(){return a(T,{get when(){var i;return(i=e.tags)==null?void 0:i.length},get children(){var i=Jk(),l=i.firstChild,s=l.nextSibling;return d(l,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?"+r().join("&")},get children(){return qk()}}),null),d(l,a(T,{get when(){return e.tags.some(o=>o.isMediaSpoiler||o.isGeneralSpoiler)},get children(){var o=Kk();return o.$$click=()=>n(c=>!c),d(o,a(T,{get when(){return!t()},fallback:"Hide spoilers",children:"Show spoilers"})),o}}),null),d(s,a(Y,{get each(){return e.tags},children:o=>(()=>{var c=Zk();return d(c,a(B,{get href(){return"/search/"+e.type.toLowerCase()+"?genre="+o.name+"&rank="+o.rank},get children(){return[N(()=>o.name)," ",(()=>{var u=Xk(),h=u.firstChild;return d(u,()=>o.rank,h),u})()]}})),L(u=>{var h=!!(o.isMediaSpoiler||o.isGeneralSpoiler),f=!!((o.isMediaSpoiler||o.isGeneralSpoiler)&&!t()),g=o.description;return h!==u.e&&c.classList.toggle("spoiler",u.e=h),f!==u.t&&c.classList.toggle("hidden",u.t=f),g!==u.a&&V(c,"title",u.a=g),u},{e:void 0,t:void 0,a:void 0}),c})()})),L(()=>i.classList.toggle("loading",!!e.loading)),i}})}})};_e(["click"]);var eS=p("<div data-k-203e4d26 class=wrapper><h2 data-k-203e4d26></h2><ul data-k-203e4d26 class=genres>"),tS=p("<li data-k-203e4d26 class=genre>");const nS=e=>a(rt,{fallback:"Genres error",get children(){return a(T,{get when(){var t;return(t=e.genres)==null?void 0:t.length},get children(){var t=eS(),n=t.firstChild,r=n.nextSibling;return d(n,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?"+e.genres.map(i=>"genre="+i).join("&")},children:"Genres"})),d(r,a(Y,{get each(){return e.genres},children:i=>(()=>{var l=tS();return d(l,a(B,{class:"clean-link",get href(){return"/search/"+e.type.toLowerCase()+"?genre="+i},children:i})),l})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var rS=p("<div data-k-737e8a49 class=pg-media-ranking><h2 data-k-737e8a49>Ranking</h2><ul data-k-737e8a49>"),aS=p("<li data-k-737e8a49>#<! data-k-737e8a49> <! data-k-737e8a49> <! data-k-737e8a49> ");const iS=e=>a(rt,{fallback:"Ranking error",get children(){return a(T,{get when(){return e.rankings},get children(){var t=rS(),n=t.firstChild,r=n.nextSibling;return d(r,a(Y,{get each(){return e.rankings},children:i=>(()=>{var l=aS(),s=l.firstChild,o=s.nextSibling,c=o.nextSibling,u=c.nextSibling,h=u.nextSibling,f=h.nextSibling;return f.nextSibling,d(l,()=>i.rank,o),d(l,()=>i.context,u),d(l,()=>i.season,f),d(l,()=>i.year,null),l})()})),L(()=>t.classList.toggle("loading",!!e.loading)),t}})}});var lS=p("<li data-k-439c0d70>Episodes: "),sS=p("<li data-k-439c0d70>Volumes: "),oS=p("<li data-k-439c0d70>Chapters: "),cS=p("<li data-k-439c0d70>Duration: <! data-k-439c0d70> mins"),dS=p("<li data-k-439c0d70>English: "),uS=p("<li data-k-439c0d70>Romaji: "),hS=p("<li data-k-439c0d70>Native: "),gS=p("<li data-k-439c0d70>Synonyms:<ul data-k-439c0d70>"),fS=p("<div data-k-439c0d70><h2 data-k-439c0d70>Extra info</h2><ul data-k-439c0d70>"),mS=p("<li data-k-439c0d70>Start Date: "),pS=p("<li data-k-439c0d70>End Date: "),vS=p("<li data-k-439c0d70>");const $S=e=>{const{authUserData:t}=ie();return a(rt,{fallback:"ExtraInfo error",get children(){return a(T,{get when(){return e.media},get children(){var n=fS(),r=n.firstChild,i=r.nextSibling;return d(i,a(T,{get when(){return e.media.episodes},get children(){var l=lS();return l.firstChild,d(l,()=>e.media.episodes,null),l}}),null),d(i,a(T,{get when(){return e.media.volumes},get children(){var l=sS();return l.firstChild,d(l,()=>e.media.volumes,null),l}}),null),d(i,a(T,{get when(){return e.media.chapters},get children(){var l=oS();return l.firstChild,d(l,()=>e.media.chapters,null),l}}),null),d(i,a(T,{get when(){return e.media.duration},get children(){var l=cS(),s=l.firstChild,o=s.nextSibling;return o.nextSibling,d(l,()=>e.media.duration,o),l}}),null),d(i,a(T,{get when(){return za(e.media.startDate)},children:l=>(()=>{var s=mS();return s.firstChild,d(s,l,null),s})()}),null),d(i,a(T,{get when(){return za(e.media.endDate)},children:l=>(()=>{var s=pS();return s.firstChild,d(s,l,null),s})()}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="ENGLISH"},get children(){var l=dS();return l.firstChild,d(l,()=>e.media.title.english,null),l}}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="ROMAJI"},get children(){var l=uS();return l.firstChild,d(l,()=>e.media.title.romaji,null),l}}),null),d(i,a(T,{get when(){return!t()||t().data.options.titleLanguage!=="NATIVE"},get children(){var l=hS();return l.firstChild,d(l,()=>e.media.title.native,null),l}}),null),d(i,a(T,{get when(){return e.media.synonyms.length},get children(){var l=gS(),s=l.firstChild,o=s.nextSibling;return d(o,a(Y,{get each(){return e.media.synonyms},children:c=>(()=>{var u=vS();return d(u,c),u})()})),l}}),null),L(()=>n.classList.toggle("loading",!!e.loading)),n}})}})};var _S=p("<div data-k-611537d3 class=pg-media-banner><img data-k-611537d3 alt=Banner>");const bS=e=>a(T,{get when(){return e.src},get children(){var t=_S(),n=t.firstChild;return L(r=>{var i=!!e.loading,l=e.src;return i!==r.e&&t.classList.toggle("loading",r.e=i),l!==r.t&&V(n,"src",r.t=l),r},{e:void 0,t:void 0}),t}});var yS=p("<img data-k-543bd5d1 alt=Cover class=media-page-cover>"),wS=p("<a data-k-543bd5d1 target=_black class=active><span data-k-543bd5d1 class=visually-hidden>Go to Anilist"),kS=p("<span data-k-543bd5d1 class=visually-hidden>Switch to MyAnimeList mode"),SS=p("<div data-k-543bd5d1 class=cp-media-api-switcher>"),CS=p("<button data-k-543bd5d1>"),xS=p("<div data-k-543bd5d1 class=media-page-content><aside data-k-543bd5d1 class=media-page-left-aside></aside><section data-k-543bd5d1 class=media-page-main>"),AS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Studios</h2><ol data-k-543bd5d1>"),xl=p("<li data-k-543bd5d1>"),TS=p("<div data-k-543bd5d1><h2 data-k-543bd5d1>Producers</h2><ol data-k-543bd5d1>"),IS=p("<div data-k-543bd5d1 class=media-page-description>"),ES=p('<div data-k-543bd5d1 class="no-overflow media-page-watch-episodes"><h2 data-k-543bd5d1>Watch</h2><ol data-k-543bd5d1 class=grid-reel-auto-fill>'),LS=p('<a data-k-543bd5d1 target=_black><img data-k-543bd5d1 alt="Episode thumbnail"><div data-k-543bd5d1 class=wrapper><p data-k-543bd5d1>');function PS(e){const t=te(),[n]=Ae(),{accessToken:r}=ie(),[i,l]=O(),s=Pe(ag,()=>({token:r(),id:t.id,isMalId:n.isMalId!=null,type:t.type})),o=Vn({default:()=>ol()>2}),[c,{mutateBoth:u}]=Bn(o,s),h=N(()=>{var b;const k=(b=c())==null?void 0:b.data;if(!(!k||k.idMal==null||k.type.toLowerCase()!==t.type))return k.idMal});L(se(c,k=>{var b;l(((b=k==null?void 0:k.data)==null?void 0:b.isFavourite)??!1)}));const f=Pe(Ec,()=>t.type,h),[g]=Qe(f),m=N(()=>{var k,b,A,w;if((k=c())!=null&&k.data.idMal&&((A=(b=g())==null?void 0:b.data)==null?void 0:A.mal_id)===((w=c())==null?void 0:w.data.idMal))return g()}),{openEditor:y}=El(),v=un();L(()=>{var k,b;(k=c())!=null&&k.data&&t.sub?document.title=`${c().data.title.userPreferred} - ${t.sub} - LOB`:(b=c())!=null&&b.data&&(document.title=`${c().data.title.userPreferred} - LOB`)});const _=new AbortController;xn(()=>{window.addEventListener("keydown",k=>{if(k.target!==document.body||k.shiftKey||k.altKey)return;function b(A){var w,$,C,E,I;return k.preventDefault(),(I=(E=(C=($=(w=c())==null?void 0:w.data)==null?void 0:$.relations)==null?void 0:C.edges)==null?void 0:E.find(P=>(P==null?void 0:P.relationType)===A))==null?void 0:I.node}if(k.key==="l"&&!k.ctrlKey||k.key==="ArrowRight"&&k.ctrlKey)_a(v,b("SEQUEL"));else if(k.key==="h"&&!k.ctrlKey||k.key==="ArrowLeft"&&k.ctrlKey)_a(v,b("PREQUEL"));else if(k.key==="j"&&!k.ctrlKey||k.key==="ArrowDown"&&k.ctrlKey){const A=b("ADAPTATION")||b("ALTERNATIVE");_a(v,A)}else(k.key==="k"&&!k.ctrlKey||k.key==="ArrowUp"&&k.ctrlKey)&&_a(v,b("SOURCE")||b("PARENT"))},{signal:_.signal})}),Ye(()=>_.abort());const x=()=>{var k;return c.loading&&((k=c())==null?void 0:k.data.id)!=t.id},S=(k,b)=>{var w,$,C,E;const A=b[($=(w=c())==null?void 0:w.data)==null?void 0:$.type]??null;((E=(C=c())==null?void 0:C.data)==null?void 0:E.id)===A&&(l(k),u(I=>(I.data.isFavourite=k,I)))};return a(rt,{fallback:"Media page error",get children(){return a(Ml.Provider,{value:{anilistData:c,mutateBothAnilistData:u,jikanData:m},get children(){return[a(bS,{get src(){var k,b;return(b=(k=c())==null?void 0:k.data)==null?void 0:b.bannerImage},get loading(){return x()}}),(()=>{var k=xS(),b=k.firstChild,A=b.nextSibling;return d(b,a(T,{get when(){var w;return(w=c())==null?void 0:w.data},get children(){return[(()=>{var w=yS();return L(()=>{var $,C;return V(w,"src",(C=($=c())==null?void 0:$.data)==null?void 0:C.coverImage.large)}),w})(),(()=>{var w=SS();return d(w,a(T,{get when(){var $;return($=c())==null?void 0:$.data.id},get children(){var $=wS();return $.firstChild,d($,a(is,{}),null),d($,a(hu,{}),null),L(()=>{var C;return V($,"href","https://anilist.co/"+t.type+"/"+(((C=c())==null?void 0:C.data.id)??t.id))}),$}}),null),d(w,a(T,{get when(){var $;return($=c())==null?void 0:$.data.idMal},get children(){return a(B,{get href(){var $;return"/mal/"+t.type+"/"+(($=c())==null?void 0:$.data.idMal)+"/"+t.name},get children(){return[kS(),a(ls,{})]}})}}),null),w})(),a(uu,{}),a(T,{get when(){return r()},get children(){return[(()=>{var w=CS();return w.$$click=()=>{var $;y(($=c())==null?void 0:$.data,{setIsFavourite:S,mutateMedia:C=>{var E,I;((I=(E=c())==null?void 0:E.data)==null?void 0:I.id)===(C==null?void 0:C.media.id)&&u(P=>(P.data.mediaListEntry=C,P))}})},d(w,()=>{var $,C;return((C=($=c())==null?void 0:$.data.mediaListEntry)==null?void 0:C.status)||"Edit"}),w})(),a(Ir,{get checked(){return i()},onChange:l,get idType(){var w;return(w=c())==null?void 0:w.data.type},get variableId(){var w;return(w=c())==null?void 0:w.data.id},get anilistValue(){var w;return(w=c())==null?void 0:w.data.favourites},get jikanValue(){var w;return(w=m())==null?void 0:w.data.favorites},mutateCache:S})]}}),a(du,{get id(){var w,$,C;return(C=($=(w=c())==null?void 0:w.data)==null?void 0:$.trailer)==null?void 0:C.id},get site(){var w,$,C;return(C=($=(w=c())==null?void 0:w.data)==null?void 0:$.trailer)==null?void 0:C.site}}),a(T,{get when(){var w;return(w=c())==null?void 0:w.data.studios.edges.filter($=>$.isMain)},children:w=>a(T,{get when(){return w().length>0},get children(){var $=AS(),C=$.firstChild,E=C.nextSibling;return d(E,a(Y,{get each(){return w()},children:I=>(()=>{var P=xl();return d(P,a(B,{get href(){return"/ani/studio/"+I.node.id+"/"+Gn(I.node.name)},get children(){return I.node.name}})),P})()})),$}})}),a(T,{get when(){var w;return(w=c())==null?void 0:w.data.studios.edges.filter($=>$.isMain===!1)},children:w=>a(T,{get when(){return w().length>0},get children(){var $=TS(),C=$.firstChild,E=C.nextSibling;return d(E,a(Y,{get each(){return w()},children:I=>(()=>{var P=xl();return d(P,a(B,{get href(){return"/ani/studio/"+I.node.id+"/"+Gn(I.node.name)},get children(){return I.node.name}})),P})()})),$}})}),a(gu,{get hashtag(){var w;return(w=c())==null?void 0:w.data.hashtag},get externalLinks(){var w;return(w=c())==null?void 0:w.data.externalLinks}}),a($S,{get media(){var w;return(w=c())==null?void 0:w.data},get loading(){return x()}}),a(iS,{get rankings(){var w;return(w=c())==null?void 0:w.data.rankings},get loading(){return x()}}),a(nS,{get genres(){var w;return(w=c())==null?void 0:w.data.genres},get type(){var w;return(w=c())==null?void 0:w.data.type},get loading(){return x()}}),a(Qk,{get tags(){var w;return(w=c())==null?void 0:w.data.tags},get type(){var w;return(w=c())==null?void 0:w.data.type},get loading(){return x()}})]}})),d(A,a(Wk,{}),null),d(A,()=>e.children,null),L(()=>k.classList.toggle("loading",!!x())),k})()]}})}})}function MS(){const{accessToken:e}=ie(),{anilistData:t,mutateBothAnilistData:n}=hn();return a(rt,{fallback:"Media page home content error",get children(){return a(T,{get when(){var r;return(r=t())==null?void 0:r.data},get children(){return[a(T,{get when(){return t().data.description},get children(){var r=IS();return d(r,a(Ja,{get text(){return t().data.description}})),r}}),a(ok,{get relations(){return t().data.relations}}),a(_k,{get characters(){return t().data.characterPreview.edges},get countryOfOrigin(){return t().data.countryOfOrigin}}),a(Ck,{get staff(){return t().data.staffPreview.edges}}),a(T,{get when(){return e()},get children(){return a(Nk,{})}}),a(pb,{}),a(RS,{get streamingEpisodes(){return t().data.streamingEpisodes}}),a(Uk,{get recommendations(){return t().data.recommendations},mutateCache:(r,i)=>{n(l=>(l.data.recommendations.nodes[r]=i,l))}})]}})}})}function DS(){const e=te(),t=Jt();return a(on,{get href(){return"/ani/"+e.type+"/"+e.id+"/"+(e.name||"")+t.search}})}function RS(e){return a(T,{get when(){var t;return(t=e.streamingEpisodes)==null?void 0:t.length},get children(){var t=ES(),n=t.firstChild,r=n.nextSibling;return d(r,a(Y,{get each(){return e.streamingEpisodes},children:i=>(()=>{var l=xl();return d(l,a(j,{get children(){return a(M,{get when(){return i.site==="Crunchyroll"},get children(){var s=LS(),o=s.firstChild,c=o.nextSibling,u=c.firstChild;return d(u,()=>i.title),L(h=>{var f=i.url,g=i.thumbnail;return f!==h.e&&V(s,"href",h.e=f),g!==h.t&&V(o,"src",h.t=g),h},{e:void 0,t:void 0}),s}})}})),l})()})),t}})}_e(["click"]);var NS=p('<img alt="User profile">'),OS=p("<p>"),FS=p("<li>"),US=p("<button>Load more");function us(e){F(e.page,"Page is missing");const{user:t}=Ze(),{accessToken:n}=ie(),[r]=ae.anilist.userFollowers(()=>t().id,e.page,n),[i,l]=O(!1);return a(T,{get when(){return r()},get children(){return[a(Y,{get each(){return r().data.followers},children:s=>(()=>{var o=FS();return d(o,a(B,{get href(){return"/user/"+s.name},get children(){return[(()=>{var c=NS();return L(()=>V(c,"src",s.avatar.large)),c})(),(()=>{var c=OS();return d(c,()=>s.name),c})()]}})),o})()}),a(T,{get when(){return r().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return i()},get fallback(){return(()=>{var s=US();return s.$$click=()=>l(!0),s})()},get children(){return a(us,{get page(){return e.page+1}})}})}})]}})}_e(["click"]);var BS=p('<img alt="User profile">'),VS=p("<p>"),GS=p("<button>Unfollow"),HS=p("<li>"),YS=p("<button>Load more");function jS(e){F(e.page,"Page is missing");const{user:t}=Ze(),{authUserData:n,accessToken:r}=ie(),[i]=ae.anilist.userFollowing(()=>t().id,e.page,r),[l,s]=O(!1);return a(T,{get when(){return i()},get children(){return[a(Y,{get each(){return i().data.following},children:o=>(()=>{var c=HS();return d(c,a(B,{get href(){return"/user/"+o.name},get children(){return[(()=>{var u=BS();return L(()=>V(u,"src",o.avatar.large)),u})(),(()=>{var u=VS();return d(u,()=>o.name),u})(),a(T,{get when(){var u;return t().id===((u=n())==null?void 0:u.data.id)},get children(){var u=GS();return u.$$click=async h=>{h.preventDefault(),await ae.anilist.toggleFollow(r(),o.id)},u}})]}})),c})()}),a(T,{get when(){return i().data.pageInfo.hasNextPage},get children(){return a(T,{get when(){return l()},get fallback(){return(()=>{var o=YS();return o.$$click=()=>s(!0),o})()},get children(){return a(us,{get page(){return e.page+1}})}})}})]}})}_e(["click"]);var Ho=p("<ol class=user-profile-social-grid>"),zS=p("<div class=user-profile-socials-page><ul><li><button>Following</button></li><li><button>Followers");function WS(){const{user:e}=Ze(),[t,n]=O("following");return W(se(e,r=>{document.title=`${r.name} socials - LOB`})),(()=>{var r=zS(),i=r.firstChild,l=i.firstChild,s=l.firstChild,o=l.nextSibling,c=o.firstChild;return s.$$click=()=>n("following"),c.$$click=()=>n("followers"),d(r,a(j,{get children(){return[a(M,{get when(){return t()==="following"},get children(){var u=Ho();return d(u,a(T,{get when(){return e().id},keyed:!0,get children(){return a(jS,{page:1})}})),u}}),a(M,{get when(){return t()==="followers"},get children(){var u=Ho();return d(u,a(T,{get when(){return e().id},keyed:!0,get children(){return a(us,{page:1})}})),u}})]}}),null),r})()}_e(["click"]);var qS=p("<h2 data-k-a9353a86>"),KS=p("<span data-k-a9353a86>View all"),JS=p("<section data-k-a9353a86><ol data-k-a9353a86 class=grid-reel-auto-fill>");function ht(e){return F("href"in e,"Link is missing"),(()=>{var t=JS(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=qS();return d(r,()=>e.title),r})(),KS()]}}),n),d(n,a(Y,{get each(){return e.data},children:r=>a(gi,{media:r})})),t})()}var XS=p("<h2 data-k-a96044c6>"),ZS=p("<section data-k-a96044c6><ol data-k-a96044c6 class=vertical-search-card-row>"),QS=p("<img data-k-a96044c6 class=cover alt=Cover.>"),eC=p('<li data-k-a96044c6 class=vertical-search-card><p data-k-a96044c6 class=ranking>#<span data-k-a96044c6></span></p><div data-k-a96044c6 class=vertical-search-card-body><div data-k-a96044c6 class="vertical-search-card-content clamp"><ol data-k-a96044c6 class=vertical-search-card-genre-list></ol></div><div data-k-a96044c6 class=vertical-search-card-info><div data-k-a96044c6 class=vertical-search-card-score><div data-k-a96044c6 class=clamp><p data-k-a96044c6>%</p><p data-k-a96044c6> users</p></div></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6></p><p data-k-a96044c6></p></div><div data-k-a96044c6 class=clamp><p data-k-a96044c6> </p><p data-k-a96044c6>'),tC=p("<li data-k-a96044c6 class=vertical-search-card-genre>");function hs(e){return F("href"in e,"Link is missing"),xt(e.type,"type"),(()=>{var t=ZS(),n=t.firstChild;return d(t,a(B,{get href(){return e.href},class:"header",get children(){return[(()=>{var r=XS();return d(r,()=>e.title),r})(),"View all"]}}),n),d(n,a(Y,{get each(){return e.data},children:(r,i)=>(()=>{var l=eC(),s=l.firstChild,o=s.firstChild,c=o.nextSibling,u=s.nextSibling,h=u.firstChild,f=h.firstChild,g=h.nextSibling,m=g.firstChild,y=m.firstChild,v=y.firstChild,_=v.firstChild,x=v.nextSibling,S=x.firstChild,k=m.nextSibling,b=k.firstChild,A=b.nextSibling,w=k.nextSibling,$=w.firstChild,C=$.firstChild,E=$.nextSibling;return d(c,()=>i()+1),d(u,a(B,{class:"cover-container",get href(){return Ve(r)},get children(){var I=QS();return L(()=>V(I,"src",r.coverImage.large)),I}}),h),d(h,a(B,{class:"line-clamp",get href(){return Ve(r)},get children(){return r.title.userPreferred}}),f),d(f,a(Y,{get each(){return r.genres},children:I=>(()=>{var P=tC();return d(P,a(B,{get href(){return`/search${e.type?"/"+e.type:""}?genre=`+I},children:I})),P})()})),d(m,a(Jr,{get score(){return r.averageScore}}),y),d(v,()=>r.averageScore,_),d(x,()=>ye(r.popularity),S),d(b,()=>yr(r.format)),d(A,a(j,{get children(){return[a(M,{get when(){return r.type==="ANIME"},get children(){return a(T,{get when(){return r.episodes},fallback:"Ongoing",get children(){return[N(()=>ye(r.episodes))," Episode",a(T,{get when(){return r.episodes>1},children:"s"})]}})}}),a(M,{get when(){return r.type==="MANGA"},get children(){return a(T,{get when(){return r.chapters},fallback:"Ongoing",get children(){return[N(()=>ye(r.chapters))," Chapter",a(T,{get when(){return r.chapters>1},children:"s"})]}})}})]}})),d($,()=>qe(r.season),C),d($,()=>r.seasonYear,null),d(E,()=>qe(r.status)),L(I=>(I=r.coverImage.color)!=null?l.style.setProperty("--media-background-color",I):l.style.removeProperty("--media-background-color")),l})()})),t})()}var nC=p("<div data-k-bc27f66a class=browse-content>");function rC(){const{accessToken:e}=ie(),[t]=ae.anilist.trendingManga(e);return document.title="Browse manga - LOB",a(T,{get when(){return t()},get children(){var n=nC();return d(n,a(ht,{get data(){return t().data.data.trending.media},href:"/search/manga/trending",title:"Trending now"}),null),d(n,a(ht,{get data(){return t().data.data.novel.media},href:"/search/manga/novel",title:"Popular light novels"}),null),d(n,a(ht,{get data(){return t().data.data.manhwa.media},href:"/search/manga/manhwa",title:"Popular Manhwas"}),null),d(n,a(ht,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished-manga",title:"Recently finished mangas"}),null),d(n,a(ht,{get data(){return t().data.data.finishedNovel.media},href:"/search/manga/finished-novel",title:"Recently finished light novels"}),null),d(n,a(ht,{get data(){return t().data.data.popular.media},href:"/search/manga/popular",title:"All time popular"}),null),d(n,a(hs,{get data(){return t().data.data.top.media},type:"manga",href:"/search/manga/top-100",title:"Top 100 manga"}),null),n}})}var aC=p("<div data-k-ac073097 class=browse-content>");function iC(){const{accessToken:e}=ie(),[t]=ae.anilist.trendingAnime(e);return document.title="Browse anime - LOB",a(T,{get when(){return t()},get children(){var n=aC();return d(n,a(ht,{get data(){return t().data.data.trending.media},href:"/search/anime/trending",title:"Trending now"}),null),d(n,a(ht,{get data(){return t().data.data.season.media},href:"/search/anime/this-season?order=popularity",title:"Popular this season"}),null),d(n,a(ht,{get data(){return t().data.data.nextSeason.media},href:"/search/anime/next-season?order=popularity",title:"Upcoming next season"}),null),d(n,a(ht,{get data(){return t().data.data.finished.media},href:"/search/anime/finished",title:"Recently finished"}),null),d(n,a(ht,{get data(){return t().data.data.popular.media},href:"/search/anime/popular",title:"All time popular"}),null),d(n,a(hs,{get data(){return t().data.data.top.media},type:"anime",href:"/search/anime/top-100",title:"Top 100 anime"}),null),n}})}var lC=p("<div data-k-49f3f573 class=browse-content>");function sC(){const{accessToken:e}=ie(),[t]=ae.anilist.trendingMedia(e);return document.title="Browse media - LOB",a(T,{get when(){return t()},get children(){var n=lC();return d(n,a(ht,{get data(){return t().data.data.trending.media},href:"/search/media/trending",title:"Trending anime and manga"}),null),d(n,a(ht,{get data(){return t().data.data.newAnime.media},href:"/search/anime/new",title:"Newly added anime"}),null),d(n,a(ht,{get data(){return t().data.data.newManga.media},href:"/search/manga/new",title:"Newly added manga"}),null),d(n,a(ht,{get data(){return t().data.data.finishedAnime.media},href:"/search/anime/finished",title:"Recently finished anime"}),null),d(n,a(ht,{get data(){return t().data.data.finishedManga.media},href:"/search/manga/finished",title:"Recently finished manga"}),null),d(n,a(hs,{get data(){return t().data.data.top.media},type:"media",href:"/search/media/top-100",title:"Top 100 anime and manga"}),null),n}})}var oC=p("<div>Not fould 404");const cC=document.getElementById("root"),_n={id:/^\d+$/},dC={type:"anime",header:e=>e.match(/^(summer|fall|spring|winter)-\d+$/)?!0:["finished","this-season","new","tba","next-season","trending","popular","top-100"].includes(e)},uC={type:"manga",header:["finished","finished-manga","tba","finished-novel","novel","new","manhwa","trending","popular","top-100"]},hC={type:"media",header:["finished","trending","popular","top-100","tba"]};Zu(()=>a(rv,{get children(){return a(av,{get children(){return a(dy,{get children(){return a(Fh,{root:im,base:"/legendary-octo-barnacle",get children(){return[a(ce,{path:"/",component:tv}),a(ce,{path:"/authentication",component:nv}),a(ce,{path:"/notifications",component:Eb}),a(ce,{path:"/activity/:id",matchFilters:_n,component:O0}),a(ce,{path:"/compare",get children(){return[a(ce,{path:"/",component:()=>a(on,{href:"anime"})}),a(ce,{path:"/:type",matchFilters:{type:["anime","manga"]},component:Xy}),a(ce,{path:"*",component:()=>a(on,{href:"/compare"})})]}}),a(ce,{path:"/:mode",matchFilters:{mode:["browse","search"]},component:s1,get children(){return[a(ce,{path:"/",matchFilters:{mode:"browse"},component:F0,get children(){return[a(ce,{path:"/:type",matchFilters:{type:"media"},component:sC}),a(ce,{path:"/:type",matchFilters:{type:"anime"},component:iC}),a(ce,{path:"/:type",matchFilters:{type:"manga"},component:rC})]}}),a(ce,{path:"/",matchFilters:{mode:"search"},component:o1,get children(){return[a(ce,{path:"/",component:()=>a(on,{href:"media"})}),a(ce,{path:"/:type",matchFilters:{type:["anime","manga","media"]},get children(){return[a(ce,{path:"/:header?",matchFilters:dC}),a(ce,{path:"/:header?",matchFilters:uC}),a(ce,{path:"/:header?",matchFilters:hC}),a(ce,{path:"/:header?",component:c1})]}})]}})]}}),a(ce,{path:"/artist/:name",component:kb}),a(ce,{path:"/:api",get children(){return[a(ce,{path:"/:sub/:id/:name?",matchFilters:{api:"ani"},get children(){return[a(ce,{path:"/",get matchFilters(){return{..._n,sub:"character"}},component:w0}),a(ce,{path:"/",get matchFilters(){return{..._n,sub:"staff"}},component:k0}),a(ce,{path:"/",get matchFilters(){return{..._n,sub:"studio"}},component:L0})]}}),a(ce,{path:"/:sub/:id/:name?",matchFilters:{api:"mal"},get children(){return a(ce,{path:"/",get matchFilters(){return{..._n,sub:"character"}},component:j2})}})]}}),a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,type:["anime","manga"]}},component:DS}),a(ce,{path:"/:api",get children(){return[a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,api:"ani"}},component:PS,get children(){return[a(ce,{path:"/",matchFilters:{type:["anime","manga"]},component:MS}),a(ce,{path:"/:sub",matchFilters:{sub:"characters"},get children(){return[a(ce,{path:"/",matchFilters:{type:"anime"},component:jb}),a(ce,{path:"/",matchFilters:{type:"manga"},component:zb})]}}),a(ce,{path:"/:sub",matchFilters:{sub:"staff"},get children(){return[a(ce,{path:"/",matchFilters:{type:"anime"},component:Wb}),a(ce,{path:"/",matchFilters:{type:"manga"},component:qb})]}})]}}),a(ce,{path:"/:type/:id/:name?",get matchFilters(){return{..._n,api:"mal"}},component:M2,get children(){return[a(ce,{path:"/",matchFilters:{type:["anime","manga"]},component:D2}),a(ce,{path:"/:sub",get children(){return[a(ce,{path:"/",matchFilters:{sub:"characters",type:["anime","manga"]},component:U2}),a(ce,{path:"/",matchFilters:{sub:"staff",type:"anime"},component:V2})]}})]}})]}}),a(ce,{path:"/user/:name",component:v1,get children(){return[a(ce,{path:"/",component:hw}),a(ce,{path:"/:type/:list?",matchFilters:{type:"anime"},component:Uo}),a(ce,{path:"/:type/:list?",matchFilters:{type:"manga"},component:Uo}),a(ce,{path:"/favourites",component:tk}),a(ce,{path:"/stats",component:rk,get children(){return[a(ce,{path:"/",component:()=>a(on,{href:"anime"})}),a(ce,{path:"/:type",matchFilters:{type:"anime"},get children(){return[a(ce,{path:"/",component:()=>a(on,{href:"overview"})}),a(ce,{path:"/overview",component:K1}),a(ce,{path:"/genres",component:d_}),a(ce,{path:"/tags",component:b_}),a(ce,{path:"/studios",component:L_}),a(ce,{path:"/staff",component:eb}),a(ce,{path:"/voice-actors",component:H_})]}}),a(ce,{path:"/:type",matchFilters:{type:"manga"},get children(){return[a(ce,{path:"/",component:()=>a(on,{href:"overview"})}),a(ce,{path:"/overview",component:J1}),a(ce,{path:"/genres",component:u_}),a(ce,{path:"/tags",component:y_}),a(ce,{path:"/staff",component:tb})]}})]}}),a(ce,{path:"/socials",component:WS})]}}),a(ce,{path:"*404",component:()=>oC()})]}})}})}})}}),cC);
