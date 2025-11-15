(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))o(m);new MutationObserver(m=>{for(const b of m)if(b.type==="childList")for(const p of b.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function f(m){const b={};return m.integrity&&(b.integrity=m.integrity),m.referrerPolicy&&(b.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?b.credentials="include":m.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function o(m){if(m.ep)return;m.ep=!0;const b=f(m);fetch(m.href,b)}})();function z0(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Yc={exports:{}},Zn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var um;function C0(){if(um)return Zn;um=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.fragment");function f(o,m,b){var p=null;if(b!==void 0&&(p=""+b),m.key!==void 0&&(p=""+m.key),"key"in m){b={};for(var N in m)N!=="key"&&(b[N]=m[N])}else b=m;return m=b.ref,{$$typeof:s,type:o,key:p,ref:m!==void 0?m:null,props:b}}return Zn.Fragment=c,Zn.jsx=f,Zn.jsxs=f,Zn}var cm;function w0(){return cm||(cm=1,Yc.exports=C0()),Yc.exports}var r=w0(),Gc={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var om;function O0(){if(om)return me;om=1;var s=Symbol.for("react.transitional.element"),c=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),m=Symbol.for("react.profiler"),b=Symbol.for("react.consumer"),p=Symbol.for("react.context"),N=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),A=Symbol.for("react.activity"),G=Symbol.iterator;function I(g){return g===null||typeof g!="object"?null:(g=G&&g[G]||g["@@iterator"],typeof g=="function"?g:null)}var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,D={};function V(g,U,K){this.props=g,this.context=U,this.refs=D,this.updater=K||z}V.prototype.isReactComponent={},V.prototype.setState=function(g,U){if(typeof g!="object"&&typeof g!="function"&&g!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,g,U,"setState")},V.prototype.forceUpdate=function(g){this.updater.enqueueForceUpdate(this,g,"forceUpdate")};function Z(){}Z.prototype=V.prototype;function W(g,U,K){this.props=g,this.context=U,this.refs=D,this.updater=K||z}var ae=W.prototype=new Z;ae.constructor=W,R(ae,V.prototype),ae.isPureReactComponent=!0;var ie=Array.isArray;function ue(){}var J={H:null,A:null,T:null,S:null},Y=Object.prototype.hasOwnProperty;function q(g,U,K){var P=K.ref;return{$$typeof:s,type:g,key:U,ref:P!==void 0?P:null,props:K}}function $(g,U){return q(g.type,U,g.props)}function ee(g){return typeof g=="object"&&g!==null&&g.$$typeof===s}function re(g){var U={"=":"=0",":":"=2"};return"$"+g.replace(/[=:]/g,function(K){return U[K]})}var Te=/\/+/g;function Me(g,U){return typeof g=="object"&&g!==null&&g.key!=null?re(""+g.key):U.toString(36)}function Xe(g){switch(g.status){case"fulfilled":return g.value;case"rejected":throw g.reason;default:switch(typeof g.status=="string"?g.then(ue,ue):(g.status="pending",g.then(function(U){g.status==="pending"&&(g.status="fulfilled",g.value=U)},function(U){g.status==="pending"&&(g.status="rejected",g.reason=U)})),g.status){case"fulfilled":return g.value;case"rejected":throw g.reason}}throw g}function O(g,U,K,P,X){var F=typeof g;(F==="undefined"||F==="boolean")&&(g=null);var oe=!1;if(g===null)oe=!0;else switch(F){case"bigint":case"string":case"number":oe=!0;break;case"object":switch(g.$$typeof){case s:case c:oe=!0;break;case S:return oe=g._init,O(oe(g._payload),U,K,P,X)}}if(oe)return X=X(g),oe=P===""?"."+Me(g,0):P,ie(X)?(K="",oe!=null&&(K=oe.replace(Te,"$&/")+"/"),O(X,U,K,"",function(_e){return _e})):X!=null&&(ee(X)&&(X=$(X,K+(X.key==null||g&&g.key===X.key?"":(""+X.key).replace(Te,"$&/")+"/")+oe)),U.push(X)),1;oe=0;var ke=P===""?".":P+":";if(ie(g))for(var we=0;we<g.length;we++)P=g[we],F=ke+Me(P,we),oe+=O(P,U,K,F,X);else if(we=I(g),typeof we=="function")for(g=we.call(g),we=0;!(P=g.next()).done;)P=P.value,F=ke+Me(P,we++),oe+=O(P,U,K,F,X);else if(F==="object"){if(typeof g.then=="function")return O(Xe(g),U,K,P,X);throw U=String(g),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(g).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return oe}function M(g,U,K){if(g==null)return g;var P=[],X=0;return O(g,P,"","",function(F){return U.call(K,F,X++)}),P}function Q(g){if(g._status===-1){var U=g._result;U=U(),U.then(function(K){(g._status===0||g._status===-1)&&(g._status=1,g._result=K)},function(K){(g._status===0||g._status===-1)&&(g._status=2,g._result=K)}),g._status===-1&&(g._status=0,g._result=U)}if(g._status===1)return g._result.default;throw g._result}var le=typeof reportError=="function"?reportError:function(g){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof g=="object"&&g!==null&&typeof g.message=="string"?String(g.message):String(g),error:g});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",g);return}console.error(g)},fe={map:M,forEach:function(g,U,K){M(g,function(){U.apply(this,arguments)},K)},count:function(g){var U=0;return M(g,function(){U++}),U},toArray:function(g){return M(g,function(U){return U})||[]},only:function(g){if(!ee(g))throw Error("React.Children.only expected to receive a single React element child.");return g}};return me.Activity=A,me.Children=fe,me.Component=V,me.Fragment=f,me.Profiler=m,me.PureComponent=W,me.StrictMode=o,me.Suspense=j,me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J,me.__COMPILER_RUNTIME={__proto__:null,c:function(g){return J.H.useMemoCache(g)}},me.cache=function(g){return function(){return g.apply(null,arguments)}},me.cacheSignal=function(){return null},me.cloneElement=function(g,U,K){if(g==null)throw Error("The argument must be a React element, but you passed "+g+".");var P=R({},g.props),X=g.key;if(U!=null)for(F in U.key!==void 0&&(X=""+U.key),U)!Y.call(U,F)||F==="key"||F==="__self"||F==="__source"||F==="ref"&&U.ref===void 0||(P[F]=U[F]);var F=arguments.length-2;if(F===1)P.children=K;else if(1<F){for(var oe=Array(F),ke=0;ke<F;ke++)oe[ke]=arguments[ke+2];P.children=oe}return q(g.type,X,P)},me.createContext=function(g){return g={$$typeof:p,_currentValue:g,_currentValue2:g,_threadCount:0,Provider:null,Consumer:null},g.Provider=g,g.Consumer={$$typeof:b,_context:g},g},me.createElement=function(g,U,K){var P,X={},F=null;if(U!=null)for(P in U.key!==void 0&&(F=""+U.key),U)Y.call(U,P)&&P!=="key"&&P!=="__self"&&P!=="__source"&&(X[P]=U[P]);var oe=arguments.length-2;if(oe===1)X.children=K;else if(1<oe){for(var ke=Array(oe),we=0;we<oe;we++)ke[we]=arguments[we+2];X.children=ke}if(g&&g.defaultProps)for(P in oe=g.defaultProps,oe)X[P]===void 0&&(X[P]=oe[P]);return q(g,F,X)},me.createRef=function(){return{current:null}},me.forwardRef=function(g){return{$$typeof:N,render:g}},me.isValidElement=ee,me.lazy=function(g){return{$$typeof:S,_payload:{_status:-1,_result:g},_init:Q}},me.memo=function(g,U){return{$$typeof:h,type:g,compare:U===void 0?null:U}},me.startTransition=function(g){var U=J.T,K={};J.T=K;try{var P=g(),X=J.S;X!==null&&X(K,P),typeof P=="object"&&P!==null&&typeof P.then=="function"&&P.then(ue,le)}catch(F){le(F)}finally{U!==null&&K.types!==null&&(U.types=K.types),J.T=U}},me.unstable_useCacheRefresh=function(){return J.H.useCacheRefresh()},me.use=function(g){return J.H.use(g)},me.useActionState=function(g,U,K){return J.H.useActionState(g,U,K)},me.useCallback=function(g,U){return J.H.useCallback(g,U)},me.useContext=function(g){return J.H.useContext(g)},me.useDebugValue=function(){},me.useDeferredValue=function(g,U){return J.H.useDeferredValue(g,U)},me.useEffect=function(g,U){return J.H.useEffect(g,U)},me.useEffectEvent=function(g){return J.H.useEffectEvent(g)},me.useId=function(){return J.H.useId()},me.useImperativeHandle=function(g,U,K){return J.H.useImperativeHandle(g,U,K)},me.useInsertionEffect=function(g,U){return J.H.useInsertionEffect(g,U)},me.useLayoutEffect=function(g,U){return J.H.useLayoutEffect(g,U)},me.useMemo=function(g,U){return J.H.useMemo(g,U)},me.useOptimistic=function(g,U){return J.H.useOptimistic(g,U)},me.useReducer=function(g,U,K){return J.H.useReducer(g,U,K)},me.useRef=function(g){return J.H.useRef(g)},me.useState=function(g){return J.H.useState(g)},me.useSyncExternalStore=function(g,U,K){return J.H.useSyncExternalStore(g,U,K)},me.useTransition=function(){return J.H.useTransition()},me.version="19.2.0",me}var rm;function to(){return rm||(rm=1,Gc.exports=O0()),Gc.exports}var k=to();const fm=z0(k);var Xc={exports:{}},Vn={},Qc={exports:{}},Zc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dm;function R0(){return dm||(dm=1,(function(s){function c(O,M){var Q=O.length;O.push(M);e:for(;0<Q;){var le=Q-1>>>1,fe=O[le];if(0<m(fe,M))O[le]=M,O[Q]=fe,Q=le;else break e}}function f(O){return O.length===0?null:O[0]}function o(O){if(O.length===0)return null;var M=O[0],Q=O.pop();if(Q!==M){O[0]=Q;e:for(var le=0,fe=O.length,g=fe>>>1;le<g;){var U=2*(le+1)-1,K=O[U],P=U+1,X=O[P];if(0>m(K,Q))P<fe&&0>m(X,K)?(O[le]=X,O[P]=Q,le=P):(O[le]=K,O[U]=Q,le=U);else if(P<fe&&0>m(X,Q))O[le]=X,O[P]=Q,le=P;else break e}}return M}function m(O,M){var Q=O.sortIndex-M.sortIndex;return Q!==0?Q:O.id-M.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var b=performance;s.unstable_now=function(){return b.now()}}else{var p=Date,N=p.now();s.unstable_now=function(){return p.now()-N}}var j=[],h=[],S=1,A=null,G=3,I=!1,z=!1,R=!1,D=!1,V=typeof setTimeout=="function"?setTimeout:null,Z=typeof clearTimeout=="function"?clearTimeout:null,W=typeof setImmediate<"u"?setImmediate:null;function ae(O){for(var M=f(h);M!==null;){if(M.callback===null)o(h);else if(M.startTime<=O)o(h),M.sortIndex=M.expirationTime,c(j,M);else break;M=f(h)}}function ie(O){if(R=!1,ae(O),!z)if(f(j)!==null)z=!0,ue||(ue=!0,re());else{var M=f(h);M!==null&&Xe(ie,M.startTime-O)}}var ue=!1,J=-1,Y=5,q=-1;function $(){return D?!0:!(s.unstable_now()-q<Y)}function ee(){if(D=!1,ue){var O=s.unstable_now();q=O;var M=!0;try{e:{z=!1,R&&(R=!1,Z(J),J=-1),I=!0;var Q=G;try{t:{for(ae(O),A=f(j);A!==null&&!(A.expirationTime>O&&$());){var le=A.callback;if(typeof le=="function"){A.callback=null,G=A.priorityLevel;var fe=le(A.expirationTime<=O);if(O=s.unstable_now(),typeof fe=="function"){A.callback=fe,ae(O),M=!0;break t}A===f(j)&&o(j),ae(O)}else o(j);A=f(j)}if(A!==null)M=!0;else{var g=f(h);g!==null&&Xe(ie,g.startTime-O),M=!1}}break e}finally{A=null,G=Q,I=!1}M=void 0}}finally{M?re():ue=!1}}}var re;if(typeof W=="function")re=function(){W(ee)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,Me=Te.port2;Te.port1.onmessage=ee,re=function(){Me.postMessage(null)}}else re=function(){V(ee,0)};function Xe(O,M){J=V(function(){O(s.unstable_now())},M)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(O){O.callback=null},s.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<O?Math.floor(1e3/O):5},s.unstable_getCurrentPriorityLevel=function(){return G},s.unstable_next=function(O){switch(G){case 1:case 2:case 3:var M=3;break;default:M=G}var Q=G;G=M;try{return O()}finally{G=Q}},s.unstable_requestPaint=function(){D=!0},s.unstable_runWithPriority=function(O,M){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var Q=G;G=O;try{return M()}finally{G=Q}},s.unstable_scheduleCallback=function(O,M,Q){var le=s.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?le+Q:le):Q=le,O){case 1:var fe=-1;break;case 2:fe=250;break;case 5:fe=1073741823;break;case 4:fe=1e4;break;default:fe=5e3}return fe=Q+fe,O={id:S++,callback:M,priorityLevel:O,startTime:Q,expirationTime:fe,sortIndex:-1},Q>le?(O.sortIndex=Q,c(h,O),f(j)===null&&O===f(h)&&(R?(Z(J),J=-1):R=!0,Xe(ie,Q-le))):(O.sortIndex=fe,c(j,O),z||I||(z=!0,ue||(ue=!0,re()))),O},s.unstable_shouldYield=$,s.unstable_wrapCallback=function(O){var M=G;return function(){var Q=G;G=M;try{return O.apply(this,arguments)}finally{G=Q}}}})(Zc)),Zc}var mm;function U0(){return mm||(mm=1,Qc.exports=R0()),Qc.exports}var Vc={exports:{}},it={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hm;function D0(){if(hm)return it;hm=1;var s=to();function c(j){var h="https://react.dev/errors/"+j;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var S=2;S<arguments.length;S++)h+="&args[]="+encodeURIComponent(arguments[S])}return"Minified React error #"+j+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(){}var o={d:{f,r:function(){throw Error(c(522))},D:f,C:f,L:f,m:f,X:f,S:f,M:f},p:0,findDOMNode:null},m=Symbol.for("react.portal");function b(j,h,S){var A=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:m,key:A==null?null:""+A,children:j,containerInfo:h,implementation:S}}var p=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function N(j,h){if(j==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,it.createPortal=function(j,h){var S=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(c(299));return b(j,h,null,S)},it.flushSync=function(j){var h=p.T,S=o.p;try{if(p.T=null,o.p=2,j)return j()}finally{p.T=h,o.p=S,o.d.f()}},it.preconnect=function(j,h){typeof j=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,o.d.C(j,h))},it.prefetchDNS=function(j){typeof j=="string"&&o.d.D(j)},it.preinit=function(j,h){if(typeof j=="string"&&h&&typeof h.as=="string"){var S=h.as,A=N(S,h.crossOrigin),G=typeof h.integrity=="string"?h.integrity:void 0,I=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;S==="style"?o.d.S(j,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:A,integrity:G,fetchPriority:I}):S==="script"&&o.d.X(j,{crossOrigin:A,integrity:G,fetchPriority:I,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},it.preinitModule=function(j,h){if(typeof j=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var S=N(h.as,h.crossOrigin);o.d.M(j,{crossOrigin:S,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&o.d.M(j)},it.preload=function(j,h){if(typeof j=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var S=h.as,A=N(S,h.crossOrigin);o.d.L(j,S,{crossOrigin:A,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},it.preloadModule=function(j,h){if(typeof j=="string")if(h){var S=N(h.as,h.crossOrigin);o.d.m(j,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:S,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else o.d.m(j)},it.requestFormReset=function(j){o.d.r(j)},it.unstable_batchedUpdates=function(j,h){return j(h)},it.useFormState=function(j,h,S){return p.H.useFormState(j,h,S)},it.useFormStatus=function(){return p.H.useHostTransitionStatus()},it.version="19.2.0",it}var pm;function M0(){if(pm)return Vc.exports;pm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Vc.exports=D0(),Vc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gm;function B0(){if(gm)return Vn;gm=1;var s=U0(),c=to(),f=M0();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function m(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function b(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function N(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function j(e){if(b(e)!==e)throw Error(o(188))}function h(e){var t=e.alternate;if(!t){if(t=b(e),t===null)throw Error(o(188));return t!==e?null:e}for(var a=e,l=t;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return j(n),e;if(i===l)return j(n),t;i=i.sibling}throw Error(o(188))}if(a.return!==l.return)a=n,l=i;else{for(var u=!1,d=n.child;d;){if(d===a){u=!0,a=n,l=i;break}if(d===l){u=!0,l=n,a=i;break}d=d.sibling}if(!u){for(d=i.child;d;){if(d===a){u=!0,a=i,l=n;break}if(d===l){u=!0,l=i,a=n;break}d=d.sibling}if(!u)throw Error(o(189))}}if(a.alternate!==l)throw Error(o(190))}if(a.tag!==3)throw Error(o(188));return a.stateNode.current===a?e:t}function S(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=S(e),t!==null)return t;e=e.sibling}return null}var A=Object.assign,G=Symbol.for("react.element"),I=Symbol.for("react.transitional.element"),z=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),V=Symbol.for("react.profiler"),Z=Symbol.for("react.consumer"),W=Symbol.for("react.context"),ae=Symbol.for("react.forward_ref"),ie=Symbol.for("react.suspense"),ue=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),Y=Symbol.for("react.lazy"),q=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),ee=Symbol.iterator;function re(e){return e===null||typeof e!="object"?null:(e=ee&&e[ee]||e["@@iterator"],typeof e=="function"?e:null)}var Te=Symbol.for("react.client.reference");function Me(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Te?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case V:return"Profiler";case D:return"StrictMode";case ie:return"Suspense";case ue:return"SuspenseList";case q:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case z:return"Portal";case W:return e.displayName||"Context";case Z:return(e._context.displayName||"Context")+".Consumer";case ae:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case J:return t=e.displayName||null,t!==null?t:Me(e.type)||"Memo";case Y:t=e._payload,e=e._init;try{return Me(e(t))}catch{}}return null}var Xe=Array.isArray,O=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q={pending:!1,data:null,method:null,action:null},le=[],fe=-1;function g(e){return{current:e}}function U(e){0>fe||(e.current=le[fe],le[fe]=null,fe--)}function K(e,t){fe++,le[fe]=e.current,e.current=t}var P=g(null),X=g(null),F=g(null),oe=g(null);function ke(e,t){switch(K(F,t),K(X,e),K(P,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?wd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=wd(t),e=Od(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}U(P),K(P,e)}function we(){U(P),U(X),U(F)}function _e(e){e.memoizedState!==null&&K(oe,e);var t=P.current,a=Od(t,e.type);t!==a&&(K(X,e),K(P,a))}function Le(e){X.current===e&&(U(P),U(X)),oe.current===e&&(U(oe),Yn._currentValue=Q)}var bt,Jt;function _t(e){if(bt===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);bt=t&&t[1]||"",Jt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+bt+e+Jt}var Lt=!1;function Pn(e,t){if(!e||Lt)return"";Lt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var L=function(){throw Error()};if(Object.defineProperty(L.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(L,[])}catch(w){var _=w}Reflect.construct(e,[],L)}else{try{L.call()}catch(w){_=w}e.call(L.prototype)}}else{try{throw Error()}catch(w){_=w}(L=e())&&typeof L.catch=="function"&&L.catch(function(){})}}catch(w){if(w&&_&&typeof w.stack=="string")return[w.stack,_.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),u=i[0],d=i[1];if(u&&d){var y=u.split(`
`),T=d.split(`
`);for(n=l=0;l<y.length&&!y[l].includes("DetermineComponentFrameRoot");)l++;for(;n<T.length&&!T[n].includes("DetermineComponentFrameRoot");)n++;if(l===y.length||n===T.length)for(l=y.length-1,n=T.length-1;1<=l&&0<=n&&y[l]!==T[n];)n--;for(;1<=l&&0<=n;l--,n--)if(y[l]!==T[n]){if(l!==1||n!==1)do if(l--,n--,0>n||y[l]!==T[n]){var B=`
`+y[l].replace(" at new "," at ");return e.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",e.displayName)),B}while(1<=l&&0<=n);break}}}finally{Lt=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?_t(a):""}function io(e,t){switch(e.tag){case 26:case 27:case 5:return _t(e.type);case 16:return _t("Lazy");case 13:return e.child!==t&&t!==null?_t("Suspense Fallback"):_t("Suspense");case 19:return _t("SuspenseList");case 0:case 15:return Pn(e.type,!1);case 11:return Pn(e.type.render,!1);case 1:return Pn(e.type,!0);case 31:return _t("Activity");default:return""}}function Kl(e){try{var t="",a=null;do t+=io(e,a),a=e,e=e.return;while(e);return t}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var Jl=Object.prototype.hasOwnProperty,$l=s.unstable_scheduleCallback,Fl=s.unstable_cancelCallback,In=s.unstable_shouldYield,zs=s.unstable_requestPaint,Fe=s.unstable_now,Wl=s.unstable_getCurrentPriorityLevel,so=s.unstable_ImmediatePriority,uo=s.unstable_UserBlockingPriority,ei=s.unstable_NormalPriority,oh=s.unstable_LowPriority,co=s.unstable_IdlePriority,rh=s.log,fh=s.unstable_setDisableYieldValue,Pl=null,yt=null;function ma(e){if(typeof rh=="function"&&fh(e),yt&&typeof yt.setStrictMode=="function")try{yt.setStrictMode(Pl,e)}catch{}}var vt=Math.clz32?Math.clz32:hh,dh=Math.log,mh=Math.LN2;function hh(e){return e>>>=0,e===0?32:31-(dh(e)/mh|0)|0}var ti=256,ai=262144,li=4194304;function La(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ni(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var n=0,i=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var d=l&134217727;return d!==0?(l=d&~i,l!==0?n=La(l):(u&=d,u!==0?n=La(u):a||(a=d&~e,a!==0&&(n=La(a))))):(d=l&~i,d!==0?n=La(d):u!==0?n=La(u):a||(a=l&~e,a!==0&&(n=La(a)))),n===0?0:t!==0&&t!==n&&(t&i)===0&&(i=n&-n,a=t&-t,i>=a||i===32&&(a&4194048)!==0)?t:n}function Il(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ph(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function oo(){var e=li;return li<<=1,(li&62914560)===0&&(li=4194304),e}function Cs(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function en(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function gh(e,t,a,l,n,i){var u=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var d=e.entanglements,y=e.expirationTimes,T=e.hiddenUpdates;for(a=u&~a;0<a;){var B=31-vt(a),L=1<<B;d[B]=0,y[B]=-1;var _=T[B];if(_!==null)for(T[B]=null,B=0;B<_.length;B++){var w=_[B];w!==null&&(w.lane&=-536870913)}a&=~L}l!==0&&ro(e,l,0),i!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=i&~(u&~t))}function ro(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-vt(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&261930}function fo(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-vt(a),n=1<<l;n&t|e[l]&t&&(e[l]|=t),a&=~n}}function mo(e,t){var a=t&-t;return a=(a&42)!==0?1:ws(a),(a&(e.suspendedLanes|t))!==0?0:a}function ws(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Os(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ho(){var e=M.p;return e!==0?e:(e=window.event,e===void 0?32:em(e.type))}function po(e,t){var a=M.p;try{return M.p=e,t()}finally{M.p=a}}var ha=Math.random().toString(36).slice(2),et="__reactFiber$"+ha,ct="__reactProps$"+ha,il="__reactContainer$"+ha,Rs="__reactEvents$"+ha,bh="__reactListeners$"+ha,yh="__reactHandles$"+ha,go="__reactResources$"+ha,tn="__reactMarker$"+ha;function Us(e){delete e[et],delete e[ct],delete e[Rs],delete e[bh],delete e[yh]}function sl(e){var t=e[et];if(t)return t;for(var a=e.parentNode;a;){if(t=a[il]||a[et]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Ld(e);e!==null;){if(a=e[et])return a;e=Ld(e)}return t}e=a,a=e.parentNode}return null}function ul(e){if(e=e[et]||e[il]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function an(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function cl(e){var t=e[go];return t||(t=e[go]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Pe(e){e[tn]=!0}var bo=new Set,yo={};function qa(e,t){ol(e,t),ol(e+"Capture",t)}function ol(e,t){for(yo[e]=t,e=0;e<t.length;e++)bo.add(t[e])}var vh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),vo={},xo={};function xh(e){return Jl.call(xo,e)?!0:Jl.call(vo,e)?!1:vh.test(e)?xo[e]=!0:(vo[e]=!0,!1)}function ii(e,t,a){if(xh(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function si(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function $t(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}function zt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function So(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Sh(e,t,a){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(u){a=""+u,i.call(this,u)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(u){a=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ds(e){if(!e._valueTracker){var t=So(e)?"checked":"value";e._valueTracker=Sh(e,t,""+e[t])}}function No(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=So(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function ui(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Nh=/[\n"\\]/g;function Ct(e){return e.replace(Nh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ms(e,t,a,l,n,i,u,d){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+zt(t)):e.value!==""+zt(t)&&(e.value=""+zt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?Bs(e,u,zt(t)):a!=null?Bs(e,u,zt(a)):l!=null&&e.removeAttribute("value"),n==null&&i!=null&&(e.defaultChecked=!!i),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.name=""+zt(d):e.removeAttribute("name")}function Eo(e,t,a,l,n,i,u,d){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){Ds(e);return}a=a!=null?""+zt(a):"",t=t!=null?""+zt(t):a,d||t===e.value||(e.value=t),e.defaultValue=t}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=d?e.checked:!!l,e.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u),Ds(e)}function Bs(e,t,a){t==="number"&&ui(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function rl(e,t,a,l){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&l&&(e[a].defaultSelected=!0)}else{for(a=""+zt(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,l&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function jo(e,t,a){if(t!=null&&(t=""+zt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+zt(a):""}function Ao(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(o(92));if(Xe(l)){if(1<l.length)throw Error(o(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=zt(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l),Ds(e)}function fl(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Eh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function To(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||Eh.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function _o(e,t,a){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var n in t)l=t[n],t.hasOwnProperty(n)&&a[n]!==l&&To(e,n,l)}else for(var i in t)t.hasOwnProperty(i)&&To(e,i,t[i])}function Hs(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var jh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ah=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ci(e){return Ah.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ft(){}var Ls=null;function qs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dl=null,ml=null;function zo(e){var t=ul(e);if(t&&(e=t.stateNode)){var a=e[ct]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ms(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ct(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var n=l[ct]||null;if(!n)throw Error(o(90));Ms(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&No(l)}break e;case"textarea":jo(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&rl(e,!!a.multiple,t,!1)}}}var ks=!1;function Co(e,t,a){if(ks)return e(t,a);ks=!0;try{var l=e(t);return l}finally{if(ks=!1,(dl!==null||ml!==null)&&($i(),dl&&(t=dl,e=ml,ml=dl=null,zo(t),e)))for(t=0;t<e.length;t++)zo(e[t])}}function ln(e,t){var a=e.stateNode;if(a===null)return null;var l=a[ct]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(o(231,t,typeof a));return a}var Wt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ys=!1;if(Wt)try{var nn={};Object.defineProperty(nn,"passive",{get:function(){Ys=!0}}),window.addEventListener("test",nn,nn),window.removeEventListener("test",nn,nn)}catch{Ys=!1}var pa=null,Gs=null,oi=null;function wo(){if(oi)return oi;var e,t=Gs,a=t.length,l,n="value"in pa?pa.value:pa.textContent,i=n.length;for(e=0;e<a&&t[e]===n[e];e++);var u=a-e;for(l=1;l<=u&&t[a-l]===n[i-l];l++);return oi=n.slice(e,1<l?1-l:void 0)}function ri(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fi(){return!0}function Oo(){return!1}function ot(e){function t(a,l,n,i,u){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=u,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(a=e[d],this[d]=a?a(i):i[d]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?fi:Oo,this.isPropagationStopped=Oo,this}return A(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=fi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=fi)},persist:function(){},isPersistent:fi}),t}var ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},di=ot(ka),sn=A({},ka,{view:0,detail:0}),Th=ot(sn),Xs,Qs,un,mi=A({},sn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==un&&(un&&e.type==="mousemove"?(Xs=e.screenX-un.screenX,Qs=e.screenY-un.screenY):Qs=Xs=0,un=e),Xs)},movementY:function(e){return"movementY"in e?e.movementY:Qs}}),Ro=ot(mi),_h=A({},mi,{dataTransfer:0}),zh=ot(_h),Ch=A({},sn,{relatedTarget:0}),Zs=ot(Ch),wh=A({},ka,{animationName:0,elapsedTime:0,pseudoElement:0}),Oh=ot(wh),Rh=A({},ka,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Uh=ot(Rh),Dh=A({},ka,{data:0}),Uo=ot(Dh),Mh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Lh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Hh[e])?!!t[e]:!1}function Vs(){return Lh}var qh=A({},sn,{key:function(e){if(e.key){var t=Mh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ri(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vs,charCode:function(e){return e.type==="keypress"?ri(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ri(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),kh=ot(qh),Yh=A({},mi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Do=ot(Yh),Gh=A({},sn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vs}),Xh=ot(Gh),Qh=A({},ka,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zh=ot(Qh),Vh=A({},mi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Kh=ot(Vh),Jh=A({},ka,{newState:0,oldState:0}),$h=ot(Jh),Fh=[9,13,27,32],Ks=Wt&&"CompositionEvent"in window,cn=null;Wt&&"documentMode"in document&&(cn=document.documentMode);var Wh=Wt&&"TextEvent"in window&&!cn,Mo=Wt&&(!Ks||cn&&8<cn&&11>=cn),Bo=" ",Ho=!1;function Lo(e,t){switch(e){case"keyup":return Fh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var hl=!1;function Ph(e,t){switch(e){case"compositionend":return qo(t);case"keypress":return t.which!==32?null:(Ho=!0,Bo);case"textInput":return e=t.data,e===Bo&&Ho?null:e;default:return null}}function Ih(e,t){if(hl)return e==="compositionend"||!Ks&&Lo(e,t)?(e=wo(),oi=Gs=pa=null,hl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mo&&t.locale!=="ko"?null:t.data;default:return null}}var ep={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ko(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ep[e.type]:t==="textarea"}function Yo(e,t,a,l){dl?ml?ml.push(l):ml=[l]:dl=l,t=as(t,"onChange"),0<t.length&&(a=new di("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var on=null,rn=null;function tp(e){jd(e,0)}function hi(e){var t=an(e);if(No(t))return e}function Go(e,t){if(e==="change")return t}var Xo=!1;if(Wt){var Js;if(Wt){var $s="oninput"in document;if(!$s){var Qo=document.createElement("div");Qo.setAttribute("oninput","return;"),$s=typeof Qo.oninput=="function"}Js=$s}else Js=!1;Xo=Js&&(!document.documentMode||9<document.documentMode)}function Zo(){on&&(on.detachEvent("onpropertychange",Vo),rn=on=null)}function Vo(e){if(e.propertyName==="value"&&hi(rn)){var t=[];Yo(t,rn,e,qs(e)),Co(tp,t)}}function ap(e,t,a){e==="focusin"?(Zo(),on=t,rn=a,on.attachEvent("onpropertychange",Vo)):e==="focusout"&&Zo()}function lp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return hi(rn)}function np(e,t){if(e==="click")return hi(t)}function ip(e,t){if(e==="input"||e==="change")return hi(t)}function sp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var xt=typeof Object.is=="function"?Object.is:sp;function fn(e,t){if(xt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!Jl.call(t,n)||!xt(e[n],t[n]))return!1}return!0}function Ko(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jo(e,t){var a=Ko(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Ko(a)}}function $o(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$o(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fo(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ui(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=ui(e.document)}return t}function Fs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var up=Wt&&"documentMode"in document&&11>=document.documentMode,pl=null,Ws=null,dn=null,Ps=!1;function Wo(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ps||pl==null||pl!==ui(l)||(l=pl,"selectionStart"in l&&Fs(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),dn&&fn(dn,l)||(dn=l,l=as(Ws,"onSelect"),0<l.length&&(t=new di("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=pl)))}function Ya(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var gl={animationend:Ya("Animation","AnimationEnd"),animationiteration:Ya("Animation","AnimationIteration"),animationstart:Ya("Animation","AnimationStart"),transitionrun:Ya("Transition","TransitionRun"),transitionstart:Ya("Transition","TransitionStart"),transitioncancel:Ya("Transition","TransitionCancel"),transitionend:Ya("Transition","TransitionEnd")},Is={},Po={};Wt&&(Po=document.createElement("div").style,"AnimationEvent"in window||(delete gl.animationend.animation,delete gl.animationiteration.animation,delete gl.animationstart.animation),"TransitionEvent"in window||delete gl.transitionend.transition);function Ga(e){if(Is[e])return Is[e];if(!gl[e])return e;var t=gl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Po)return Is[e]=t[a];return e}var Io=Ga("animationend"),er=Ga("animationiteration"),tr=Ga("animationstart"),cp=Ga("transitionrun"),op=Ga("transitionstart"),rp=Ga("transitioncancel"),ar=Ga("transitionend"),lr=new Map,eu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");eu.push("scrollEnd");function qt(e,t){lr.set(e,t),qa(t,[e])}var pi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wt=[],bl=0,tu=0;function gi(){for(var e=bl,t=tu=bl=0;t<e;){var a=wt[t];wt[t++]=null;var l=wt[t];wt[t++]=null;var n=wt[t];wt[t++]=null;var i=wt[t];if(wt[t++]=null,l!==null&&n!==null){var u=l.pending;u===null?n.next=n:(n.next=u.next,u.next=n),l.pending=n}i!==0&&nr(a,n,i)}}function bi(e,t,a,l){wt[bl++]=e,wt[bl++]=t,wt[bl++]=a,wt[bl++]=l,tu|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function au(e,t,a,l){return bi(e,t,a,l),yi(e)}function Xa(e,t){return bi(e,null,null,t),yi(e)}function nr(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=e.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(n=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,n&&t!==null&&(n=31-vt(a),e=i.hiddenUpdates,l=e[n],l===null?e[n]=[t]:l.push(t),t.lane=a|536870912),i):null}function yi(e){if(50<Dn)throw Dn=0,fc=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var yl={};function fp(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function St(e,t,a,l){return new fp(e,t,a,l)}function lu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Pt(e,t){var a=e.alternate;return a===null?(a=St(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function ir(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function vi(e,t,a,l,n,i){var u=0;if(l=e,typeof e=="function")lu(e)&&(u=1);else if(typeof e=="string")u=g0(e,a,P.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case q:return e=St(31,a,t,n),e.elementType=q,e.lanes=i,e;case R:return Qa(a.children,n,i,t);case D:u=8,n|=24;break;case V:return e=St(12,a,t,n|2),e.elementType=V,e.lanes=i,e;case ie:return e=St(13,a,t,n),e.elementType=ie,e.lanes=i,e;case ue:return e=St(19,a,t,n),e.elementType=ue,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case W:u=10;break e;case Z:u=9;break e;case ae:u=11;break e;case J:u=14;break e;case Y:u=16,l=null;break e}u=29,a=Error(o(130,e===null?"null":typeof e,"")),l=null}return t=St(u,a,t,n),t.elementType=e,t.type=l,t.lanes=i,t}function Qa(e,t,a,l){return e=St(7,e,l,t),e.lanes=a,e}function nu(e,t,a){return e=St(6,e,null,t),e.lanes=a,e}function sr(e){var t=St(18,null,null,0);return t.stateNode=e,t}function iu(e,t,a){return t=St(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ur=new WeakMap;function Ot(e,t){if(typeof e=="object"&&e!==null){var a=ur.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Kl(t)},ur.set(e,t),t)}return{value:e,source:t,stack:Kl(t)}}var vl=[],xl=0,xi=null,mn=0,Rt=[],Ut=0,ga=null,Xt=1,Qt="";function It(e,t){vl[xl++]=mn,vl[xl++]=xi,xi=e,mn=t}function cr(e,t,a){Rt[Ut++]=Xt,Rt[Ut++]=Qt,Rt[Ut++]=ga,ga=e;var l=Xt;e=Qt;var n=32-vt(l)-1;l&=~(1<<n),a+=1;var i=32-vt(t)+n;if(30<i){var u=n-n%5;i=(l&(1<<u)-1).toString(32),l>>=u,n-=u,Xt=1<<32-vt(t)+n|a<<n|l,Qt=i+e}else Xt=1<<i|a<<n|l,Qt=e}function su(e){e.return!==null&&(It(e,1),cr(e,1,0))}function uu(e){for(;e===xi;)xi=vl[--xl],vl[xl]=null,mn=vl[--xl],vl[xl]=null;for(;e===ga;)ga=Rt[--Ut],Rt[Ut]=null,Qt=Rt[--Ut],Rt[Ut]=null,Xt=Rt[--Ut],Rt[Ut]=null}function or(e,t){Rt[Ut++]=Xt,Rt[Ut++]=Qt,Rt[Ut++]=ga,Xt=t.id,Qt=t.overflow,ga=e}var tt=null,Be=null,Se=!1,ba=null,Dt=!1,cu=Error(o(519));function ya(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw hn(Ot(t,e)),cu}function rr(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[et]=e,t[ct]=l,a){case"dialog":ye("cancel",t),ye("close",t);break;case"iframe":case"object":case"embed":ye("load",t);break;case"video":case"audio":for(a=0;a<Bn.length;a++)ye(Bn[a],t);break;case"source":ye("error",t);break;case"img":case"image":case"link":ye("error",t),ye("load",t);break;case"details":ye("toggle",t);break;case"input":ye("invalid",t),Eo(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":ye("invalid",t);break;case"textarea":ye("invalid",t),Ao(t,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||zd(t.textContent,a)?(l.popover!=null&&(ye("beforetoggle",t),ye("toggle",t)),l.onScroll!=null&&ye("scroll",t),l.onScrollEnd!=null&&ye("scrollend",t),l.onClick!=null&&(t.onclick=Ft),t=!0):t=!1,t||ya(e,!0)}function fr(e){for(tt=e.return;tt;)switch(tt.tag){case 5:case 31:case 13:Dt=!1;return;case 27:case 3:Dt=!0;return;default:tt=tt.return}}function Sl(e){if(e!==tt)return!1;if(!Se)return fr(e),Se=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Tc(e.type,e.memoizedProps)),a=!a),a&&Be&&ya(e),fr(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Be=Hd(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Be=Hd(e)}else t===27?(t=Be,Ra(e.type)?(e=Oc,Oc=null,Be=e):Be=t):Be=tt?Bt(e.stateNode.nextSibling):null;return!0}function Za(){Be=tt=null,Se=!1}function ou(){var e=ba;return e!==null&&(mt===null?mt=e:mt.push.apply(mt,e),ba=null),e}function hn(e){ba===null?ba=[e]:ba.push(e)}var ru=g(null),Va=null,ea=null;function va(e,t,a){K(ru,t._currentValue),t._currentValue=a}function ta(e){e._currentValue=ru.current,U(ru)}function fu(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function du(e,t,a,l){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var i=n.dependencies;if(i!==null){var u=n.child;i=i.firstContext;e:for(;i!==null;){var d=i;i=n;for(var y=0;y<t.length;y++)if(d.context===t[y]){i.lanes|=a,d=i.alternate,d!==null&&(d.lanes|=a),fu(i.return,a,e),l||(u=null);break e}i=d.next}}else if(n.tag===18){if(u=n.return,u===null)throw Error(o(341));u.lanes|=a,i=u.alternate,i!==null&&(i.lanes|=a),fu(u,a,e),u=null}else u=n.child;if(u!==null)u.return=n;else for(u=n;u!==null;){if(u===e){u=null;break}if(n=u.sibling,n!==null){n.return=u.return,u=n;break}u=u.return}n=u}}function Nl(e,t,a,l){e=null;for(var n=t,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var u=n.alternate;if(u===null)throw Error(o(387));if(u=u.memoizedProps,u!==null){var d=n.type;xt(n.pendingProps.value,u.value)||(e!==null?e.push(d):e=[d])}}else if(n===oe.current){if(u=n.alternate,u===null)throw Error(o(387));u.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push(Yn):e=[Yn])}n=n.return}e!==null&&du(t,e,a,l),t.flags|=262144}function Si(e){for(e=e.firstContext;e!==null;){if(!xt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ka(e){Va=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function at(e){return dr(Va,e)}function Ni(e,t){return Va===null&&Ka(e),dr(e,t)}function dr(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},ea===null){if(e===null)throw Error(o(308));ea=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ea=ea.next=t;return a}var dp=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},mp=s.unstable_scheduleCallback,hp=s.unstable_NormalPriority,Ve={$$typeof:W,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function mu(){return{controller:new dp,data:new Map,refCount:0}}function pn(e){e.refCount--,e.refCount===0&&mp(hp,function(){e.controller.abort()})}var gn=null,hu=0,El=0,jl=null;function pp(e,t){if(gn===null){var a=gn=[];hu=0,El=bc(),jl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return hu++,t.then(mr,mr),t}function mr(){if(--hu===0&&gn!==null){jl!==null&&(jl.status="fulfilled");var e=gn;gn=null,El=0,jl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function gp(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var hr=O.S;O.S=function(e,t){Pf=Fe(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&pp(e,t),hr!==null&&hr(e,t)};var Ja=g(null);function pu(){var e=Ja.current;return e!==null?e:De.pooledCache}function Ei(e,t){t===null?K(Ja,Ja.current):K(Ja,t.pool)}function pr(){var e=pu();return e===null?null:{parent:Ve._currentValue,pool:e}}var Al=Error(o(460)),gu=Error(o(474)),ji=Error(o(542)),Ai={then:function(){}};function gr(e){return e=e.status,e==="fulfilled"||e==="rejected"}function br(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Ft,Ft),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,vr(e),e;default:if(typeof t.status=="string")t.then(Ft,Ft);else{if(e=De,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=l}},function(l){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,vr(e),e}throw Fa=t,Al}}function $a(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Fa=a,Al):a}}var Fa=null;function yr(){if(Fa===null)throw Error(o(459));var e=Fa;return Fa=null,e}function vr(e){if(e===Al||e===ji)throw Error(o(483))}var Tl=null,bn=0;function Ti(e){var t=bn;return bn+=1,Tl===null&&(Tl=[]),br(Tl,e,t)}function yn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function _i(e,t){throw t.$$typeof===G?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function xr(e){function t(x,v){if(e){var E=x.deletions;E===null?(x.deletions=[v],x.flags|=16):E.push(v)}}function a(x,v){if(!e)return null;for(;v!==null;)t(x,v),v=v.sibling;return null}function l(x){for(var v=new Map;x!==null;)x.key!==null?v.set(x.key,x):v.set(x.index,x),x=x.sibling;return v}function n(x,v){return x=Pt(x,v),x.index=0,x.sibling=null,x}function i(x,v,E){return x.index=E,e?(E=x.alternate,E!==null?(E=E.index,E<v?(x.flags|=67108866,v):E):(x.flags|=67108866,v)):(x.flags|=1048576,v)}function u(x){return e&&x.alternate===null&&(x.flags|=67108866),x}function d(x,v,E,H){return v===null||v.tag!==6?(v=nu(E,x.mode,H),v.return=x,v):(v=n(v,E),v.return=x,v)}function y(x,v,E,H){var se=E.type;return se===R?B(x,v,E.props.children,H,E.key):v!==null&&(v.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===Y&&$a(se)===v.type)?(v=n(v,E.props),yn(v,E),v.return=x,v):(v=vi(E.type,E.key,E.props,null,x.mode,H),yn(v,E),v.return=x,v)}function T(x,v,E,H){return v===null||v.tag!==4||v.stateNode.containerInfo!==E.containerInfo||v.stateNode.implementation!==E.implementation?(v=iu(E,x.mode,H),v.return=x,v):(v=n(v,E.children||[]),v.return=x,v)}function B(x,v,E,H,se){return v===null||v.tag!==7?(v=Qa(E,x.mode,H,se),v.return=x,v):(v=n(v,E),v.return=x,v)}function L(x,v,E){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=nu(""+v,x.mode,E),v.return=x,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case I:return E=vi(v.type,v.key,v.props,null,x.mode,E),yn(E,v),E.return=x,E;case z:return v=iu(v,x.mode,E),v.return=x,v;case Y:return v=$a(v),L(x,v,E)}if(Xe(v)||re(v))return v=Qa(v,x.mode,E,null),v.return=x,v;if(typeof v.then=="function")return L(x,Ti(v),E);if(v.$$typeof===W)return L(x,Ni(x,v),E);_i(x,v)}return null}function _(x,v,E,H){var se=v!==null?v.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return se!==null?null:d(x,v,""+E,H);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case I:return E.key===se?y(x,v,E,H):null;case z:return E.key===se?T(x,v,E,H):null;case Y:return E=$a(E),_(x,v,E,H)}if(Xe(E)||re(E))return se!==null?null:B(x,v,E,H,null);if(typeof E.then=="function")return _(x,v,Ti(E),H);if(E.$$typeof===W)return _(x,v,Ni(x,E),H);_i(x,E)}return null}function w(x,v,E,H,se){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return x=x.get(E)||null,d(v,x,""+H,se);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case I:return x=x.get(H.key===null?E:H.key)||null,y(v,x,H,se);case z:return x=x.get(H.key===null?E:H.key)||null,T(v,x,H,se);case Y:return H=$a(H),w(x,v,E,H,se)}if(Xe(H)||re(H))return x=x.get(E)||null,B(v,x,H,se,null);if(typeof H.then=="function")return w(x,v,E,Ti(H),se);if(H.$$typeof===W)return w(x,v,E,Ni(v,H),se);_i(v,H)}return null}function te(x,v,E,H){for(var se=null,Ne=null,ne=v,ge=v=0,xe=null;ne!==null&&ge<E.length;ge++){ne.index>ge?(xe=ne,ne=null):xe=ne.sibling;var Ee=_(x,ne,E[ge],H);if(Ee===null){ne===null&&(ne=xe);break}e&&ne&&Ee.alternate===null&&t(x,ne),v=i(Ee,v,ge),Ne===null?se=Ee:Ne.sibling=Ee,Ne=Ee,ne=xe}if(ge===E.length)return a(x,ne),Se&&It(x,ge),se;if(ne===null){for(;ge<E.length;ge++)ne=L(x,E[ge],H),ne!==null&&(v=i(ne,v,ge),Ne===null?se=ne:Ne.sibling=ne,Ne=ne);return Se&&It(x,ge),se}for(ne=l(ne);ge<E.length;ge++)xe=w(ne,x,ge,E[ge],H),xe!==null&&(e&&xe.alternate!==null&&ne.delete(xe.key===null?ge:xe.key),v=i(xe,v,ge),Ne===null?se=xe:Ne.sibling=xe,Ne=xe);return e&&ne.forEach(function(Ha){return t(x,Ha)}),Se&&It(x,ge),se}function ce(x,v,E,H){if(E==null)throw Error(o(151));for(var se=null,Ne=null,ne=v,ge=v=0,xe=null,Ee=E.next();ne!==null&&!Ee.done;ge++,Ee=E.next()){ne.index>ge?(xe=ne,ne=null):xe=ne.sibling;var Ha=_(x,ne,Ee.value,H);if(Ha===null){ne===null&&(ne=xe);break}e&&ne&&Ha.alternate===null&&t(x,ne),v=i(Ha,v,ge),Ne===null?se=Ha:Ne.sibling=Ha,Ne=Ha,ne=xe}if(Ee.done)return a(x,ne),Se&&It(x,ge),se;if(ne===null){for(;!Ee.done;ge++,Ee=E.next())Ee=L(x,Ee.value,H),Ee!==null&&(v=i(Ee,v,ge),Ne===null?se=Ee:Ne.sibling=Ee,Ne=Ee);return Se&&It(x,ge),se}for(ne=l(ne);!Ee.done;ge++,Ee=E.next())Ee=w(ne,x,ge,Ee.value,H),Ee!==null&&(e&&Ee.alternate!==null&&ne.delete(Ee.key===null?ge:Ee.key),v=i(Ee,v,ge),Ne===null?se=Ee:Ne.sibling=Ee,Ne=Ee);return e&&ne.forEach(function(_0){return t(x,_0)}),Se&&It(x,ge),se}function Ue(x,v,E,H){if(typeof E=="object"&&E!==null&&E.type===R&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case I:e:{for(var se=E.key;v!==null;){if(v.key===se){if(se=E.type,se===R){if(v.tag===7){a(x,v.sibling),H=n(v,E.props.children),H.return=x,x=H;break e}}else if(v.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===Y&&$a(se)===v.type){a(x,v.sibling),H=n(v,E.props),yn(H,E),H.return=x,x=H;break e}a(x,v);break}else t(x,v);v=v.sibling}E.type===R?(H=Qa(E.props.children,x.mode,H,E.key),H.return=x,x=H):(H=vi(E.type,E.key,E.props,null,x.mode,H),yn(H,E),H.return=x,x=H)}return u(x);case z:e:{for(se=E.key;v!==null;){if(v.key===se)if(v.tag===4&&v.stateNode.containerInfo===E.containerInfo&&v.stateNode.implementation===E.implementation){a(x,v.sibling),H=n(v,E.children||[]),H.return=x,x=H;break e}else{a(x,v);break}else t(x,v);v=v.sibling}H=iu(E,x.mode,H),H.return=x,x=H}return u(x);case Y:return E=$a(E),Ue(x,v,E,H)}if(Xe(E))return te(x,v,E,H);if(re(E)){if(se=re(E),typeof se!="function")throw Error(o(150));return E=se.call(E),ce(x,v,E,H)}if(typeof E.then=="function")return Ue(x,v,Ti(E),H);if(E.$$typeof===W)return Ue(x,v,Ni(x,E),H);_i(x,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,v!==null&&v.tag===6?(a(x,v.sibling),H=n(v,E),H.return=x,x=H):(a(x,v),H=nu(E,x.mode,H),H.return=x,x=H),u(x)):a(x,v)}return function(x,v,E,H){try{bn=0;var se=Ue(x,v,E,H);return Tl=null,se}catch(ne){if(ne===Al||ne===ji)throw ne;var Ne=St(29,ne,null,x.mode);return Ne.lanes=H,Ne.return=x,Ne}finally{}}}var Wa=xr(!0),Sr=xr(!1),xa=!1;function bu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function yu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Sa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Na(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(je&2)!==0){var n=l.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),l.pending=t,t=yi(e),nr(e,null,a),t}return bi(e,l,t,a),yi(e)}function vn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,fo(e,a)}}function vu(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var u={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=u:i=i.next=u,a=a.next}while(a!==null);i===null?n=i=t:i=i.next=t}else n=i=t;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var xu=!1;function xn(){if(xu){var e=jl;if(e!==null)throw e}}function Sn(e,t,a,l){xu=!1;var n=e.updateQueue;xa=!1;var i=n.firstBaseUpdate,u=n.lastBaseUpdate,d=n.shared.pending;if(d!==null){n.shared.pending=null;var y=d,T=y.next;y.next=null,u===null?i=T:u.next=T,u=y;var B=e.alternate;B!==null&&(B=B.updateQueue,d=B.lastBaseUpdate,d!==u&&(d===null?B.firstBaseUpdate=T:d.next=T,B.lastBaseUpdate=y))}if(i!==null){var L=n.baseState;u=0,B=T=y=null,d=i;do{var _=d.lane&-536870913,w=_!==d.lane;if(w?(ve&_)===_:(l&_)===_){_!==0&&_===El&&(xu=!0),B!==null&&(B=B.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});e:{var te=e,ce=d;_=t;var Ue=a;switch(ce.tag){case 1:if(te=ce.payload,typeof te=="function"){L=te.call(Ue,L,_);break e}L=te;break e;case 3:te.flags=te.flags&-65537|128;case 0:if(te=ce.payload,_=typeof te=="function"?te.call(Ue,L,_):te,_==null)break e;L=A({},L,_);break e;case 2:xa=!0}}_=d.callback,_!==null&&(e.flags|=64,w&&(e.flags|=8192),w=n.callbacks,w===null?n.callbacks=[_]:w.push(_))}else w={lane:_,tag:d.tag,payload:d.payload,callback:d.callback,next:null},B===null?(T=B=w,y=L):B=B.next=w,u|=_;if(d=d.next,d===null){if(d=n.shared.pending,d===null)break;w=d,d=w.next,w.next=null,n.lastBaseUpdate=w,n.shared.pending=null}}while(!0);B===null&&(y=L),n.baseState=y,n.firstBaseUpdate=T,n.lastBaseUpdate=B,i===null&&(n.shared.lanes=0),_a|=u,e.lanes=u,e.memoizedState=L}}function Nr(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function Er(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Nr(a[e],t)}var _l=g(null),zi=g(0);function jr(e,t){e=ra,K(zi,e),K(_l,t),ra=e|t.baseLanes}function Su(){K(zi,ra),K(_l,_l.current)}function Nu(){ra=zi.current,U(_l),U(zi)}var Nt=g(null),Mt=null;function Ea(e){var t=e.alternate;K(Qe,Qe.current&1),K(Nt,e),Mt===null&&(t===null||_l.current!==null||t.memoizedState!==null)&&(Mt=e)}function Eu(e){K(Qe,Qe.current),K(Nt,e),Mt===null&&(Mt=e)}function Ar(e){e.tag===22?(K(Qe,Qe.current),K(Nt,e),Mt===null&&(Mt=e)):ja()}function ja(){K(Qe,Qe.current),K(Nt,Nt.current)}function Et(e){U(Nt),Mt===e&&(Mt=null),U(Qe)}var Qe=g(0);function Ci(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Cc(a)||wc(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var aa=0,he=null,Oe=null,Ke=null,wi=!1,zl=!1,Pa=!1,Oi=0,Nn=0,Cl=null,bp=0;function Ye(){throw Error(o(321))}function ju(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!xt(e[a],t[a]))return!1;return!0}function Au(e,t,a,l,n,i){return aa=i,he=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?of:ku,Pa=!1,i=a(l,n),Pa=!1,zl&&(i=_r(t,a,l,n)),Tr(e),i}function Tr(e){O.H=An;var t=Oe!==null&&Oe.next!==null;if(aa=0,Ke=Oe=he=null,wi=!1,Nn=0,Cl=null,t)throw Error(o(300));e===null||Je||(e=e.dependencies,e!==null&&Si(e)&&(Je=!0))}function _r(e,t,a,l){he=e;var n=0;do{if(zl&&(Cl=null),Nn=0,zl=!1,25<=n)throw Error(o(301));if(n+=1,Ke=Oe=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}O.H=rf,i=t(a,l)}while(zl);return i}function yp(){var e=O.H,t=e.useState()[0];return t=typeof t.then=="function"?En(t):t,e=e.useState()[0],(Oe!==null?Oe.memoizedState:null)!==e&&(he.flags|=1024),t}function Tu(){var e=Oi!==0;return Oi=0,e}function _u(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function zu(e){if(wi){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}wi=!1}aa=0,Ke=Oe=he=null,zl=!1,Nn=Oi=0,Cl=null}function ut(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ke===null?he.memoizedState=Ke=e:Ke=Ke.next=e,Ke}function Ze(){if(Oe===null){var e=he.alternate;e=e!==null?e.memoizedState:null}else e=Oe.next;var t=Ke===null?he.memoizedState:Ke.next;if(t!==null)Ke=t,Oe=e;else{if(e===null)throw he.alternate===null?Error(o(467)):Error(o(310));Oe=e,e={memoizedState:Oe.memoizedState,baseState:Oe.baseState,baseQueue:Oe.baseQueue,queue:Oe.queue,next:null},Ke===null?he.memoizedState=Ke=e:Ke=Ke.next=e}return Ke}function Ri(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function En(e){var t=Nn;return Nn+=1,Cl===null&&(Cl=[]),e=br(Cl,e,t),t=he,(Ke===null?t.memoizedState:Ke.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?of:ku),e}function Ui(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return En(e);if(e.$$typeof===W)return at(e)}throw Error(o(438,String(e)))}function Cu(e){var t=null,a=he.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=he.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Ri(),he.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=$;return t.index++,a}function la(e,t){return typeof t=="function"?t(e):t}function Di(e){var t=Ze();return wu(t,Oe,e)}function wu(e,t,a){var l=e.queue;if(l===null)throw Error(o(311));l.lastRenderedReducer=a;var n=e.baseQueue,i=l.pending;if(i!==null){if(n!==null){var u=n.next;n.next=i.next,i.next=u}t.baseQueue=n=i,l.pending=null}if(i=e.baseState,n===null)e.memoizedState=i;else{t=n.next;var d=u=null,y=null,T=t,B=!1;do{var L=T.lane&-536870913;if(L!==T.lane?(ve&L)===L:(aa&L)===L){var _=T.revertLane;if(_===0)y!==null&&(y=y.next={lane:0,revertLane:0,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),L===El&&(B=!0);else if((aa&_)===_){T=T.next,_===El&&(B=!0);continue}else L={lane:0,revertLane:T.revertLane,gesture:null,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},y===null?(d=y=L,u=i):y=y.next=L,he.lanes|=_,_a|=_;L=T.action,Pa&&a(i,L),i=T.hasEagerState?T.eagerState:a(i,L)}else _={lane:L,revertLane:T.revertLane,gesture:T.gesture,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null},y===null?(d=y=_,u=i):y=y.next=_,he.lanes|=L,_a|=L;T=T.next}while(T!==null&&T!==t);if(y===null?u=i:y.next=d,!xt(i,e.memoizedState)&&(Je=!0,B&&(a=jl,a!==null)))throw a;e.memoizedState=i,e.baseState=u,e.baseQueue=y,l.lastRenderedState=i}return n===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function Ou(e){var t=Ze(),a=t.queue;if(a===null)throw Error(o(311));a.lastRenderedReducer=e;var l=a.dispatch,n=a.pending,i=t.memoizedState;if(n!==null){a.pending=null;var u=n=n.next;do i=e(i,u.action),u=u.next;while(u!==n);xt(i,t.memoizedState)||(Je=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),a.lastRenderedState=i}return[i,l]}function zr(e,t,a){var l=he,n=Ze(),i=Se;if(i){if(a===void 0)throw Error(o(407));a=a()}else a=t();var u=!xt((Oe||n).memoizedState,a);if(u&&(n.memoizedState=a,Je=!0),n=n.queue,Du(Or.bind(null,l,n,e),[e]),n.getSnapshot!==t||u||Ke!==null&&Ke.memoizedState.tag&1){if(l.flags|=2048,wl(9,{destroy:void 0},wr.bind(null,l,n,a,t),null),De===null)throw Error(o(349));i||(aa&127)!==0||Cr(l,t,a)}return a}function Cr(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=he.updateQueue,t===null?(t=Ri(),he.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function wr(e,t,a,l){t.value=a,t.getSnapshot=l,Rr(t)&&Ur(e)}function Or(e,t,a){return a(function(){Rr(t)&&Ur(e)})}function Rr(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!xt(e,a)}catch{return!0}}function Ur(e){var t=Xa(e,2);t!==null&&ht(t,e,2)}function Ru(e){var t=ut();if(typeof e=="function"){var a=e;if(e=a(),Pa){ma(!0);try{a()}finally{ma(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},t}function Dr(e,t,a,l){return e.baseState=a,wu(e,Oe,typeof l=="function"?l:la)}function vp(e,t,a,l,n){if(Hi(e))throw Error(o(485));if(e=t.action,e!==null){var i={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){i.listeners.push(u)}};O.T!==null?a(!0):i.isTransition=!1,l(i),a=t.pending,a===null?(i.next=t.pending=i,Mr(t,i)):(i.next=a.next,t.pending=a.next=i)}}function Mr(e,t){var a=t.action,l=t.payload,n=e.state;if(t.isTransition){var i=O.T,u={};O.T=u;try{var d=a(n,l),y=O.S;y!==null&&y(u,d),Br(e,t,d)}catch(T){Uu(e,t,T)}finally{i!==null&&u.types!==null&&(i.types=u.types),O.T=i}}else try{i=a(n,l),Br(e,t,i)}catch(T){Uu(e,t,T)}}function Br(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){Hr(e,t,l)},function(l){return Uu(e,t,l)}):Hr(e,t,a)}function Hr(e,t,a){t.status="fulfilled",t.value=a,Lr(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Mr(e,a)))}function Uu(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,Lr(t),t=t.next;while(t!==l)}e.action=null}function Lr(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function qr(e,t){return t}function kr(e,t){if(Se){var a=De.formState;if(a!==null){e:{var l=he;if(Se){if(Be){t:{for(var n=Be,i=Dt;n.nodeType!==8;){if(!i){n=null;break t}if(n=Bt(n.nextSibling),n===null){n=null;break t}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){Be=Bt(n.nextSibling),l=n.data==="F!";break e}}ya(l)}l=!1}l&&(t=a[0])}}return a=ut(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qr,lastRenderedState:t},a.queue=l,a=sf.bind(null,he,l),l.dispatch=a,l=Ru(!1),i=qu.bind(null,he,!1,l.queue),l=ut(),n={state:t,dispatch:null,action:e,pending:null},l.queue=n,a=vp.bind(null,he,n,i,a),n.dispatch=a,l.memoizedState=e,[t,a,!1]}function Yr(e){var t=Ze();return Gr(t,Oe,e)}function Gr(e,t,a){if(t=wu(e,t,qr)[0],e=Di(la)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=En(t)}catch(u){throw u===Al?ji:u}else l=t;t=Ze();var n=t.queue,i=n.dispatch;return a!==t.memoizedState&&(he.flags|=2048,wl(9,{destroy:void 0},xp.bind(null,n,a),null)),[l,i,e]}function xp(e,t){e.action=t}function Xr(e){var t=Ze(),a=Oe;if(a!==null)return Gr(t,a,e);Ze(),t=t.memoizedState,a=Ze();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function wl(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=he.updateQueue,t===null&&(t=Ri(),he.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function Qr(){return Ze().memoizedState}function Mi(e,t,a,l){var n=ut();he.flags|=e,n.memoizedState=wl(1|t,{destroy:void 0},a,l===void 0?null:l)}function Bi(e,t,a,l){var n=Ze();l=l===void 0?null:l;var i=n.memoizedState.inst;Oe!==null&&l!==null&&ju(l,Oe.memoizedState.deps)?n.memoizedState=wl(t,i,a,l):(he.flags|=e,n.memoizedState=wl(1|t,i,a,l))}function Zr(e,t){Mi(8390656,8,e,t)}function Du(e,t){Bi(2048,8,e,t)}function Sp(e){he.flags|=4;var t=he.updateQueue;if(t===null)t=Ri(),he.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Vr(e){var t=Ze().memoizedState;return Sp({ref:t,nextImpl:e}),function(){if((je&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Kr(e,t){return Bi(4,2,e,t)}function Jr(e,t){return Bi(4,4,e,t)}function $r(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Fr(e,t,a){a=a!=null?a.concat([e]):null,Bi(4,4,$r.bind(null,t,e),a)}function Mu(){}function Wr(e,t){var a=Ze();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&ju(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function Pr(e,t){var a=Ze();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&ju(t,l[1]))return l[0];if(l=e(),Pa){ma(!0);try{e()}finally{ma(!1)}}return a.memoizedState=[l,t],l}function Bu(e,t,a){return a===void 0||(aa&1073741824)!==0&&(ve&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=ed(),he.lanes|=e,_a|=e,a)}function Ir(e,t,a,l){return xt(a,t)?a:_l.current!==null?(e=Bu(e,a,l),xt(e,t)||(Je=!0),e):(aa&42)===0||(aa&1073741824)!==0&&(ve&261930)===0?(Je=!0,e.memoizedState=a):(e=ed(),he.lanes|=e,_a|=e,t)}function ef(e,t,a,l,n){var i=M.p;M.p=i!==0&&8>i?i:8;var u=O.T,d={};O.T=d,qu(e,!1,t,a);try{var y=n(),T=O.S;if(T!==null&&T(d,y),y!==null&&typeof y=="object"&&typeof y.then=="function"){var B=gp(y,l);jn(e,t,B,Tt(e))}else jn(e,t,l,Tt(e))}catch(L){jn(e,t,{then:function(){},status:"rejected",reason:L},Tt())}finally{M.p=i,u!==null&&d.types!==null&&(u.types=d.types),O.T=u}}function Np(){}function Hu(e,t,a,l){if(e.tag!==5)throw Error(o(476));var n=tf(e).queue;ef(e,n,t,Q,a===null?Np:function(){return af(e),a(l)})}function tf(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Q,baseState:Q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:Q},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function af(e){var t=tf(e);t.next===null&&(t=e.alternate.memoizedState),jn(e,t.next.queue,{},Tt())}function Lu(){return at(Yn)}function lf(){return Ze().memoizedState}function nf(){return Ze().memoizedState}function Ep(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Tt();e=Sa(a);var l=Na(t,e,a);l!==null&&(ht(l,t,a),vn(l,t,a)),t={cache:mu()},e.payload=t;return}t=t.return}}function jp(e,t,a){var l=Tt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Hi(e)?uf(t,a):(a=au(e,t,a,l),a!==null&&(ht(a,e,l),cf(a,t,l)))}function sf(e,t,a){var l=Tt();jn(e,t,a,l)}function jn(e,t,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Hi(e))uf(t,n);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var u=t.lastRenderedState,d=i(u,a);if(n.hasEagerState=!0,n.eagerState=d,xt(d,u))return bi(e,t,n,0),De===null&&gi(),!1}catch{}finally{}if(a=au(e,t,n,l),a!==null)return ht(a,e,l),cf(a,t,l),!0}return!1}function qu(e,t,a,l){if(l={lane:2,revertLane:bc(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Hi(e)){if(t)throw Error(o(479))}else t=au(e,a,l,2),t!==null&&ht(t,e,2)}function Hi(e){var t=e.alternate;return e===he||t!==null&&t===he}function uf(e,t){zl=wi=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function cf(e,t,a){if((a&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,fo(e,a)}}var An={readContext:at,use:Ui,useCallback:Ye,useContext:Ye,useEffect:Ye,useImperativeHandle:Ye,useLayoutEffect:Ye,useInsertionEffect:Ye,useMemo:Ye,useReducer:Ye,useRef:Ye,useState:Ye,useDebugValue:Ye,useDeferredValue:Ye,useTransition:Ye,useSyncExternalStore:Ye,useId:Ye,useHostTransitionStatus:Ye,useFormState:Ye,useActionState:Ye,useOptimistic:Ye,useMemoCache:Ye,useCacheRefresh:Ye};An.useEffectEvent=Ye;var of={readContext:at,use:Ui,useCallback:function(e,t){return ut().memoizedState=[e,t===void 0?null:t],e},useContext:at,useEffect:Zr,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Mi(4194308,4,$r.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Mi(4194308,4,e,t)},useInsertionEffect:function(e,t){Mi(4,2,e,t)},useMemo:function(e,t){var a=ut();t=t===void 0?null:t;var l=e();if(Pa){ma(!0);try{e()}finally{ma(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=ut();if(a!==void 0){var n=a(t);if(Pa){ma(!0);try{a(t)}finally{ma(!1)}}}else n=t;return l.memoizedState=l.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=jp.bind(null,he,e),[l.memoizedState,e]},useRef:function(e){var t=ut();return e={current:e},t.memoizedState=e},useState:function(e){e=Ru(e);var t=e.queue,a=sf.bind(null,he,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Mu,useDeferredValue:function(e,t){var a=ut();return Bu(a,e,t)},useTransition:function(){var e=Ru(!1);return e=ef.bind(null,he,e.queue,!0,!1),ut().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=he,n=ut();if(Se){if(a===void 0)throw Error(o(407));a=a()}else{if(a=t(),De===null)throw Error(o(349));(ve&127)!==0||Cr(l,t,a)}n.memoizedState=a;var i={value:a,getSnapshot:t};return n.queue=i,Zr(Or.bind(null,l,i,e),[e]),l.flags|=2048,wl(9,{destroy:void 0},wr.bind(null,l,i,a,t),null),a},useId:function(){var e=ut(),t=De.identifierPrefix;if(Se){var a=Qt,l=Xt;a=(l&~(1<<32-vt(l)-1)).toString(32)+a,t="_"+t+"R_"+a,a=Oi++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=bp++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Lu,useFormState:kr,useActionState:kr,useOptimistic:function(e){var t=ut();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=qu.bind(null,he,!0,a),a.dispatch=t,[e,t]},useMemoCache:Cu,useCacheRefresh:function(){return ut().memoizedState=Ep.bind(null,he)},useEffectEvent:function(e){var t=ut(),a={impl:e};return t.memoizedState=a,function(){if((je&2)!==0)throw Error(o(440));return a.impl.apply(void 0,arguments)}}},ku={readContext:at,use:Ui,useCallback:Wr,useContext:at,useEffect:Du,useImperativeHandle:Fr,useInsertionEffect:Kr,useLayoutEffect:Jr,useMemo:Pr,useReducer:Di,useRef:Qr,useState:function(){return Di(la)},useDebugValue:Mu,useDeferredValue:function(e,t){var a=Ze();return Ir(a,Oe.memoizedState,e,t)},useTransition:function(){var e=Di(la)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:En(e),t]},useSyncExternalStore:zr,useId:lf,useHostTransitionStatus:Lu,useFormState:Yr,useActionState:Yr,useOptimistic:function(e,t){var a=Ze();return Dr(a,Oe,e,t)},useMemoCache:Cu,useCacheRefresh:nf};ku.useEffectEvent=Vr;var rf={readContext:at,use:Ui,useCallback:Wr,useContext:at,useEffect:Du,useImperativeHandle:Fr,useInsertionEffect:Kr,useLayoutEffect:Jr,useMemo:Pr,useReducer:Ou,useRef:Qr,useState:function(){return Ou(la)},useDebugValue:Mu,useDeferredValue:function(e,t){var a=Ze();return Oe===null?Bu(a,e,t):Ir(a,Oe.memoizedState,e,t)},useTransition:function(){var e=Ou(la)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:En(e),t]},useSyncExternalStore:zr,useId:lf,useHostTransitionStatus:Lu,useFormState:Xr,useActionState:Xr,useOptimistic:function(e,t){var a=Ze();return Oe!==null?Dr(a,Oe,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Cu,useCacheRefresh:nf};rf.useEffectEvent=Vr;function Yu(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:A({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Gu={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=Tt(),n=Sa(l);n.payload=t,a!=null&&(n.callback=a),t=Na(e,n,l),t!==null&&(ht(t,e,l),vn(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=Tt(),n=Sa(l);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=Na(e,n,l),t!==null&&(ht(t,e,l),vn(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Tt(),l=Sa(a);l.tag=2,t!=null&&(l.callback=t),t=Na(e,l,a),t!==null&&(ht(t,e,a),vn(t,e,a))}};function ff(e,t,a,l,n,i,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,i,u):t.prototype&&t.prototype.isPureReactComponent?!fn(a,l)||!fn(n,i):!0}function df(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&Gu.enqueueReplaceState(t,t.state,null)}function Ia(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=A({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}function mf(e){pi(e)}function hf(e){console.error(e)}function pf(e){pi(e)}function Li(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function gf(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Xu(e,t,a){return a=Sa(a),a.tag=3,a.payload={element:null},a.callback=function(){Li(e,t)},a}function bf(e){return e=Sa(e),e.tag=3,e}function yf(e,t,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;e.payload=function(){return n(i)},e.callback=function(){gf(t,a,l)}}var u=a.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){gf(t,a,l),typeof n!="function"&&(za===null?za=new Set([this]):za.add(this));var d=l.stack;this.componentDidCatch(l.value,{componentStack:d!==null?d:""})})}function Ap(e,t,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&Nl(t,a,n,!0),a=Nt.current,a!==null){switch(a.tag){case 31:case 13:return Mt===null?Fi():a.alternate===null&&Ge===0&&(Ge=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===Ai?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),hc(e,l,n)),!1;case 22:return a.flags|=65536,l===Ai?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),hc(e,l,n)),!1}throw Error(o(435,a.tag))}return hc(e,l,n),Fi(),!1}if(Se)return t=Nt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=n,l!==cu&&(e=Error(o(422),{cause:l}),hn(Ot(e,a)))):(l!==cu&&(t=Error(o(423),{cause:l}),hn(Ot(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,l=Ot(l,a),n=Xu(e.stateNode,l,n),vu(e,n),Ge!==4&&(Ge=2)),!1;var i=Error(o(520),{cause:l});if(i=Ot(i,a),Un===null?Un=[i]:Un.push(i),Ge!==4&&(Ge=2),t===null)return!0;l=Ot(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=Xu(a.stateNode,l,e),vu(a,e),!1;case 1:if(t=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(za===null||!za.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=bf(n),yf(n,e,a,l),vu(a,n),!1}a=a.return}while(a!==null);return!1}var Qu=Error(o(461)),Je=!1;function lt(e,t,a,l){t.child=e===null?Sr(t,null,a,l):Wa(t,e.child,a,l)}function vf(e,t,a,l,n){a=a.render;var i=t.ref;if("ref"in l){var u={};for(var d in l)d!=="ref"&&(u[d]=l[d])}else u=l;return Ka(t),l=Au(e,t,a,u,i,n),d=Tu(),e!==null&&!Je?(_u(e,t,n),na(e,t,n)):(Se&&d&&su(t),t.flags|=1,lt(e,t,l,n),t.child)}function xf(e,t,a,l,n){if(e===null){var i=a.type;return typeof i=="function"&&!lu(i)&&i.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=i,Sf(e,t,i,l,n)):(e=vi(a.type,null,l,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Pu(e,n)){var u=i.memoizedProps;if(a=a.compare,a=a!==null?a:fn,a(u,l)&&e.ref===t.ref)return na(e,t,n)}return t.flags|=1,e=Pt(i,l),e.ref=t.ref,e.return=t,t.child=e}function Sf(e,t,a,l,n){if(e!==null){var i=e.memoizedProps;if(fn(i,l)&&e.ref===t.ref)if(Je=!1,t.pendingProps=l=i,Pu(e,n))(e.flags&131072)!==0&&(Je=!0);else return t.lanes=e.lanes,na(e,t,n)}return Zu(e,t,a,l,n)}function Nf(e,t,a,l){var n=l.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,e!==null){for(l=t.child=e.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,t.child=null;return Ef(e,t,i,a,l)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ei(t,i!==null?i.cachePool:null),i!==null?jr(t,i):Su(),Ar(t);else return l=t.lanes=536870912,Ef(e,t,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(Ei(t,i.cachePool),jr(t,i),ja(),t.memoizedState=null):(e!==null&&Ei(t,null),Su(),ja());return lt(e,t,n,a),t.child}function Tn(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ef(e,t,a,l,n){var i=pu();return i=i===null?null:{parent:Ve._currentValue,pool:i},t.memoizedState={baseLanes:a,cachePool:i},e!==null&&Ei(t,null),Su(),Ar(t),e!==null&&Nl(e,t,l,!0),t.childLanes=n,null}function qi(e,t){return t=Yi({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function jf(e,t,a){return Wa(t,e.child,null,a),e=qi(t,t.pendingProps),e.flags|=2,Et(t),t.memoizedState=null,e}function Tp(e,t,a){var l=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Se){if(l.mode==="hidden")return e=qi(t,l),t.lanes=536870912,Tn(null,e);if(Eu(t),(e=Be)?(e=Bd(e,Dt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Xt,overflow:Qt}:null,retryLane:536870912,hydrationErrors:null},a=sr(e),a.return=t,t.child=a,tt=t,Be=null)):e=null,e===null)throw ya(t);return t.lanes=536870912,null}return qi(t,l)}var i=e.memoizedState;if(i!==null){var u=i.dehydrated;if(Eu(t),n)if(t.flags&256)t.flags&=-257,t=jf(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(Je||Nl(e,t,a,!1),n=(a&e.childLanes)!==0,Je||n){if(l=De,l!==null&&(u=mo(l,a),u!==0&&u!==i.retryLane))throw i.retryLane=u,Xa(e,u),ht(l,e,u),Qu;Fi(),t=jf(e,t,a)}else e=i.treeContext,Be=Bt(u.nextSibling),tt=t,Se=!0,ba=null,Dt=!1,e!==null&&or(t,e),t=qi(t,l),t.flags|=4096;return t}return e=Pt(e.child,{mode:l.mode,children:l.children}),e.ref=t.ref,t.child=e,e.return=t,e}function ki(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(o(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Zu(e,t,a,l,n){return Ka(t),a=Au(e,t,a,l,void 0,n),l=Tu(),e!==null&&!Je?(_u(e,t,n),na(e,t,n)):(Se&&l&&su(t),t.flags|=1,lt(e,t,a,n),t.child)}function Af(e,t,a,l,n,i){return Ka(t),t.updateQueue=null,a=_r(t,l,a,n),Tr(e),l=Tu(),e!==null&&!Je?(_u(e,t,i),na(e,t,i)):(Se&&l&&su(t),t.flags|=1,lt(e,t,a,i),t.child)}function Tf(e,t,a,l,n){if(Ka(t),t.stateNode===null){var i=yl,u=a.contextType;typeof u=="object"&&u!==null&&(i=at(u)),i=new a(l,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Gu,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=l,i.state=t.memoizedState,i.refs={},bu(t),u=a.contextType,i.context=typeof u=="object"&&u!==null?at(u):yl,i.state=t.memoizedState,u=a.getDerivedStateFromProps,typeof u=="function"&&(Yu(t,a,u,l),i.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(u=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),u!==i.state&&Gu.enqueueReplaceState(i,i.state,null),Sn(t,l,i,n),xn(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){i=t.stateNode;var d=t.memoizedProps,y=Ia(a,d);i.props=y;var T=i.context,B=a.contextType;u=yl,typeof B=="object"&&B!==null&&(u=at(B));var L=a.getDerivedStateFromProps;B=typeof L=="function"||typeof i.getSnapshotBeforeUpdate=="function",d=t.pendingProps!==d,B||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(d||T!==u)&&df(t,i,l,u),xa=!1;var _=t.memoizedState;i.state=_,Sn(t,l,i,n),xn(),T=t.memoizedState,d||_!==T||xa?(typeof L=="function"&&(Yu(t,a,L,l),T=t.memoizedState),(y=xa||ff(t,a,y,l,_,T,u))?(B||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=T),i.props=l,i.state=T,i.context=u,l=y):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{i=t.stateNode,yu(e,t),u=t.memoizedProps,B=Ia(a,u),i.props=B,L=t.pendingProps,_=i.context,T=a.contextType,y=yl,typeof T=="object"&&T!==null&&(y=at(T)),d=a.getDerivedStateFromProps,(T=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==L||_!==y)&&df(t,i,l,y),xa=!1,_=t.memoizedState,i.state=_,Sn(t,l,i,n),xn();var w=t.memoizedState;u!==L||_!==w||xa||e!==null&&e.dependencies!==null&&Si(e.dependencies)?(typeof d=="function"&&(Yu(t,a,d,l),w=t.memoizedState),(B=xa||ff(t,a,B,l,_,w,y)||e!==null&&e.dependencies!==null&&Si(e.dependencies))?(T||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,w,y),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,w,y)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=w),i.props=l,i.state=w,i.context=y,l=B):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),l=!1)}return i=l,ki(e,t),l=(t.flags&128)!==0,i||l?(i=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&l?(t.child=Wa(t,e.child,null,n),t.child=Wa(t,null,a,n)):lt(e,t,a,n),t.memoizedState=i.state,e=t.child):e=na(e,t,n),e}function _f(e,t,a,l){return Za(),t.flags|=256,lt(e,t,a,l),t.child}var Vu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ku(e){return{baseLanes:e,cachePool:pr()}}function Ju(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=At),e}function zf(e,t,a){var l=t.pendingProps,n=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(Qe.current&2)!==0),u&&(n=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(Se){if(n?Ea(t):ja(),(e=Be)?(e=Bd(e,Dt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Xt,overflow:Qt}:null,retryLane:536870912,hydrationErrors:null},a=sr(e),a.return=t,t.child=a,tt=t,Be=null)):e=null,e===null)throw ya(t);return wc(e)?t.lanes=32:t.lanes=536870912,null}var d=l.children;return l=l.fallback,n?(ja(),n=t.mode,d=Yi({mode:"hidden",children:d},n),l=Qa(l,n,a,null),d.return=t,l.return=t,d.sibling=l,t.child=d,l=t.child,l.memoizedState=Ku(a),l.childLanes=Ju(e,u,a),t.memoizedState=Vu,Tn(null,l)):(Ea(t),$u(t,d))}var y=e.memoizedState;if(y!==null&&(d=y.dehydrated,d!==null)){if(i)t.flags&256?(Ea(t),t.flags&=-257,t=Fu(e,t,a)):t.memoizedState!==null?(ja(),t.child=e.child,t.flags|=128,t=null):(ja(),d=l.fallback,n=t.mode,l=Yi({mode:"visible",children:l.children},n),d=Qa(d,n,a,null),d.flags|=2,l.return=t,d.return=t,l.sibling=d,t.child=l,Wa(t,e.child,null,a),l=t.child,l.memoizedState=Ku(a),l.childLanes=Ju(e,u,a),t.memoizedState=Vu,t=Tn(null,l));else if(Ea(t),wc(d)){if(u=d.nextSibling&&d.nextSibling.dataset,u)var T=u.dgst;u=T,l=Error(o(419)),l.stack="",l.digest=u,hn({value:l,source:null,stack:null}),t=Fu(e,t,a)}else if(Je||Nl(e,t,a,!1),u=(a&e.childLanes)!==0,Je||u){if(u=De,u!==null&&(l=mo(u,a),l!==0&&l!==y.retryLane))throw y.retryLane=l,Xa(e,l),ht(u,e,l),Qu;Cc(d)||Fi(),t=Fu(e,t,a)}else Cc(d)?(t.flags|=192,t.child=e.child,t=null):(e=y.treeContext,Be=Bt(d.nextSibling),tt=t,Se=!0,ba=null,Dt=!1,e!==null&&or(t,e),t=$u(t,l.children),t.flags|=4096);return t}return n?(ja(),d=l.fallback,n=t.mode,y=e.child,T=y.sibling,l=Pt(y,{mode:"hidden",children:l.children}),l.subtreeFlags=y.subtreeFlags&65011712,T!==null?d=Pt(T,d):(d=Qa(d,n,a,null),d.flags|=2),d.return=t,l.return=t,l.sibling=d,t.child=l,Tn(null,l),l=t.child,d=e.child.memoizedState,d===null?d=Ku(a):(n=d.cachePool,n!==null?(y=Ve._currentValue,n=n.parent!==y?{parent:y,pool:y}:n):n=pr(),d={baseLanes:d.baseLanes|a,cachePool:n}),l.memoizedState=d,l.childLanes=Ju(e,u,a),t.memoizedState=Vu,Tn(e.child,l)):(Ea(t),a=e.child,e=a.sibling,a=Pt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=a,t.memoizedState=null,a)}function $u(e,t){return t=Yi({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Yi(e,t){return e=St(22,e,null,t),e.lanes=0,e}function Fu(e,t,a){return Wa(t,e.child,null,a),e=$u(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cf(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),fu(e.return,t,a)}function Wu(e,t,a,l,n,i){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=l,u.tail=a,u.tailMode=n,u.treeForkCount=i)}function wf(e,t,a){var l=t.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var u=Qe.current,d=(u&2)!==0;if(d?(u=u&1|2,t.flags|=128):u&=1,K(Qe,u),lt(e,t,l,a),l=Se?mn:0,!d&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Cf(e,a,t);else if(e.tag===19)Cf(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&Ci(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),Wu(t,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&Ci(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}Wu(t,!0,a,null,i,l);break;case"together":Wu(t,!1,null,null,void 0,l);break;default:t.memoizedState=null}return t.child}function na(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),_a|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Nl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,a=Pt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Pt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Pu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Si(e)))}function _p(e,t,a){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),va(t,Ve,e.memoizedState.cache),Za();break;case 27:case 5:_e(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:va(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Eu(t),null;break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(Ea(t),t.flags|=128,null):(a&t.child.childLanes)!==0?zf(e,t,a):(Ea(t),e=na(e,t,a),e!==null?e.sibling:null);Ea(t);break;case 19:var n=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(Nl(e,t,a,!1),l=(a&t.childLanes)!==0),n){if(l)return wf(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),K(Qe,Qe.current),l)break;return null;case 22:return t.lanes=0,Nf(e,t,a,t.pendingProps);case 24:va(t,Ve,e.memoizedState.cache)}return na(e,t,a)}function Of(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Je=!0;else{if(!Pu(e,a)&&(t.flags&128)===0)return Je=!1,_p(e,t,a);Je=(e.flags&131072)!==0}else Je=!1,Se&&(t.flags&1048576)!==0&&cr(t,mn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var l=t.pendingProps;if(e=$a(t.elementType),t.type=e,typeof e=="function")lu(e)?(l=Ia(e,l),t.tag=1,t=Tf(null,t,e,l,a)):(t.tag=0,t=Zu(null,t,e,l,a));else{if(e!=null){var n=e.$$typeof;if(n===ae){t.tag=11,t=vf(null,t,e,l,a);break e}else if(n===J){t.tag=14,t=xf(null,t,e,l,a);break e}}throw t=Me(e)||e,Error(o(306,t,""))}}return t;case 0:return Zu(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,n=Ia(l,t.pendingProps),Tf(e,t,l,n,a);case 3:e:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(o(387));l=t.pendingProps;var i=t.memoizedState;n=i.element,yu(e,t),Sn(t,l,null,a);var u=t.memoizedState;if(l=u.cache,va(t,Ve,l),l!==i.cache&&du(t,[Ve],a,!0),xn(),l=u.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=_f(e,t,l,a);break e}else if(l!==n){n=Ot(Error(o(424)),t),hn(n),t=_f(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Be=Bt(e.firstChild),tt=t,Se=!0,ba=null,Dt=!0,a=Sr(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Za(),l===n){t=na(e,t,a);break e}lt(e,t,l,a)}t=t.child}return t;case 26:return ki(e,t),e===null?(a=Gd(t.type,null,t.pendingProps,null))?t.memoizedState=a:Se||(a=t.type,e=t.pendingProps,l=ls(F.current).createElement(a),l[et]=t,l[ct]=e,nt(l,a,e),Pe(l),t.stateNode=l):t.memoizedState=Gd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return _e(t),e===null&&Se&&(l=t.stateNode=qd(t.type,t.pendingProps,F.current),tt=t,Dt=!0,n=Be,Ra(t.type)?(Oc=n,Be=Bt(l.firstChild)):Be=n),lt(e,t,t.pendingProps.children,a),ki(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Se&&((n=l=Be)&&(l=l0(l,t.type,t.pendingProps,Dt),l!==null?(t.stateNode=l,tt=t,Be=Bt(l.firstChild),Dt=!1,n=!0):n=!1),n||ya(t)),_e(t),n=t.type,i=t.pendingProps,u=e!==null?e.memoizedProps:null,l=i.children,Tc(n,i)?l=null:u!==null&&Tc(n,u)&&(t.flags|=32),t.memoizedState!==null&&(n=Au(e,t,yp,null,null,a),Yn._currentValue=n),ki(e,t),lt(e,t,l,a),t.child;case 6:return e===null&&Se&&((e=a=Be)&&(a=n0(a,t.pendingProps,Dt),a!==null?(t.stateNode=a,tt=t,Be=null,e=!0):e=!1),e||ya(t)),null;case 13:return zf(e,t,a);case 4:return ke(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=Wa(t,null,l,a):lt(e,t,l,a),t.child;case 11:return vf(e,t,t.type,t.pendingProps,a);case 7:return lt(e,t,t.pendingProps,a),t.child;case 8:return lt(e,t,t.pendingProps.children,a),t.child;case 12:return lt(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,va(t,t.type,l.value),lt(e,t,l.children,a),t.child;case 9:return n=t.type._context,l=t.pendingProps.children,Ka(t),n=at(n),l=l(n),t.flags|=1,lt(e,t,l,a),t.child;case 14:return xf(e,t,t.type,t.pendingProps,a);case 15:return Sf(e,t,t.type,t.pendingProps,a);case 19:return wf(e,t,a);case 31:return Tp(e,t,a);case 22:return Nf(e,t,a,t.pendingProps);case 24:return Ka(t),l=at(Ve),e===null?(n=pu(),n===null&&(n=De,i=mu(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),t.memoizedState={parent:l,cache:n},bu(t),va(t,Ve,n)):((e.lanes&a)!==0&&(yu(e,t),Sn(t,null,null,a),xn()),n=e.memoizedState,i=t.memoizedState,n.parent!==l?(n={parent:l,cache:l},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),va(t,Ve,l)):(l=i.cache,va(t,Ve,l),l!==n.cache&&du(t,[Ve],a,!0))),lt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function ia(e){e.flags|=4}function Iu(e,t,a,l,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(nd())e.flags|=8192;else throw Fa=Ai,gu}else e.flags&=-16777217}function Rf(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Kd(t))if(nd())e.flags|=8192;else throw Fa=Ai,gu}function Gi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?oo():536870912,e.lanes|=t,Dl|=t)}function _n(e,t){if(!Se)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function He(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function zp(e,t,a){var l=t.pendingProps;switch(uu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return He(t),null;case 1:return He(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),ta(Ve),we(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Sl(t)?ia(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ou())),He(t),null;case 26:var n=t.type,i=t.memoizedState;return e===null?(ia(t),i!==null?(He(t),Rf(t,i)):(He(t),Iu(t,n,null,l,a))):i?i!==e.memoizedState?(ia(t),He(t),Rf(t,i)):(He(t),t.flags&=-16777217):(e=e.memoizedProps,e!==l&&ia(t),He(t),Iu(t,n,e,l,a)),null;case 27:if(Le(t),a=F.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ia(t);else{if(!l){if(t.stateNode===null)throw Error(o(166));return He(t),null}e=P.current,Sl(t)?rr(t):(e=qd(n,l,a),t.stateNode=e,ia(t))}return He(t),null;case 5:if(Le(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ia(t);else{if(!l){if(t.stateNode===null)throw Error(o(166));return He(t),null}if(i=P.current,Sl(t))rr(t);else{var u=ls(F.current);switch(i){case 1:i=u.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=u.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=u.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=u.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=u.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?u.createElement(n,{is:l.is}):u.createElement(n)}}i[et]=t,i[ct]=l;e:for(u=t.child;u!==null;){if(u.tag===5||u.tag===6)i.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=i;e:switch(nt(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&ia(t)}}return He(t),Iu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&ia(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(o(166));if(e=F.current,Sl(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,n=tt,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}e[et]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||zd(e.nodeValue,a)),e||ya(t,!0)}else e=ls(e).createTextNode(l),e[et]=t,t.stateNode=e}return He(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(l=Sl(t),a!==null){if(e===null){if(!l)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[et]=t}else Za(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;He(t),e=!1}else a=ou(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(Et(t),t):(Et(t),null);if((t.flags&128)!==0)throw Error(o(558))}return He(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=Sl(t),l!==null&&l.dehydrated!==null){if(e===null){if(!n)throw Error(o(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(o(317));n[et]=t}else Za(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;He(t),n=!1}else n=ou(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(Et(t),t):(Et(t),null)}return Et(t),(t.flags&128)!==0?(t.lanes=a,t):(a=l!==null,e=e!==null&&e.memoizedState!==null,a&&(l=t.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),Gi(t,t.updateQueue),He(t),null);case 4:return we(),e===null&&Sc(t.stateNode.containerInfo),He(t),null;case 10:return ta(t.type),He(t),null;case 19:if(U(Qe),l=t.memoizedState,l===null)return He(t),null;if(n=(t.flags&128)!==0,i=l.rendering,i===null)if(n)_n(l,!1);else{if(Ge!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Ci(e),i!==null){for(t.flags|=128,_n(l,!1),e=i.updateQueue,t.updateQueue=e,Gi(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)ir(a,e),a=a.sibling;return K(Qe,Qe.current&1|2),Se&&It(t,l.treeForkCount),t.child}e=e.sibling}l.tail!==null&&Fe()>Ki&&(t.flags|=128,n=!0,_n(l,!1),t.lanes=4194304)}else{if(!n)if(e=Ci(i),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,Gi(t,e),_n(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!Se)return He(t),null}else 2*Fe()-l.renderingStartTime>Ki&&a!==536870912&&(t.flags|=128,n=!0,_n(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(e=l.last,e!==null?e.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Fe(),e.sibling=null,a=Qe.current,K(Qe,n?a&1|2:a&1),Se&&It(t,l.treeForkCount),e):(He(t),null);case 22:case 23:return Et(t),Nu(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(a&536870912)!==0&&(t.flags&128)===0&&(He(t),t.subtreeFlags&6&&(t.flags|=8192)):He(t),a=t.updateQueue,a!==null&&Gi(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&U(Ja),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),ta(Ve),He(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function Cp(e,t){switch(uu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ta(Ve),we(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Le(t),null;case 31:if(t.memoizedState!==null){if(Et(t),t.alternate===null)throw Error(o(340));Za()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Et(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Za()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return U(Qe),null;case 4:return we(),null;case 10:return ta(t.type),null;case 22:case 23:return Et(t),Nu(),e!==null&&U(Ja),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ta(Ve),null;case 25:return null;default:return null}}function Uf(e,t){switch(uu(t),t.tag){case 3:ta(Ve),we();break;case 26:case 27:case 5:Le(t);break;case 4:we();break;case 31:t.memoizedState!==null&&Et(t);break;case 13:Et(t);break;case 19:U(Qe);break;case 10:ta(t.type);break;case 22:case 23:Et(t),Nu(),e!==null&&U(Ja);break;case 24:ta(Ve)}}function zn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&e)===e){l=void 0;var i=a.create,u=a.inst;l=i(),u.destroy=l}a=a.next}while(a!==n)}}catch(d){Ce(t,t.return,d)}}function Aa(e,t,a){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&e)===e){var u=l.inst,d=u.destroy;if(d!==void 0){u.destroy=void 0,n=t;var y=a,T=d;try{T()}catch(B){Ce(n,y,B)}}}l=l.next}while(l!==i)}}catch(B){Ce(t,t.return,B)}}function Df(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Er(t,a)}catch(l){Ce(e,e.return,l)}}}function Mf(e,t,a){a.props=Ia(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){Ce(e,t,l)}}function Cn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(n){Ce(e,t,n)}}function Zt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){Ce(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){Ce(e,t,n)}else a.current=null}function Bf(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){Ce(e,e.return,n)}}function ec(e,t,a){try{var l=e.stateNode;Wp(l,e.type,a,t),l[ct]=t}catch(n){Ce(e,e.return,n)}}function Hf(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ra(e.type)||e.tag===4}function tc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Hf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ra(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ac(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ft));else if(l!==4&&(l===27&&Ra(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(ac(e,t,a),e=e.sibling;e!==null;)ac(e,t,a),e=e.sibling}function Xi(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&Ra(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Xi(e,t,a),e=e.sibling;e!==null;)Xi(e,t,a),e=e.sibling}function Lf(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);nt(t,l,a),t[et]=e,t[ct]=a}catch(i){Ce(e,e.return,i)}}var sa=!1,$e=!1,lc=!1,qf=typeof WeakSet=="function"?WeakSet:Set,Ie=null;function wp(e,t){if(e=e.containerInfo,jc=rs,e=Fo(e),Fs(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break e}var u=0,d=-1,y=-1,T=0,B=0,L=e,_=null;t:for(;;){for(var w;L!==a||n!==0&&L.nodeType!==3||(d=u+n),L!==i||l!==0&&L.nodeType!==3||(y=u+l),L.nodeType===3&&(u+=L.nodeValue.length),(w=L.firstChild)!==null;)_=L,L=w;for(;;){if(L===e)break t;if(_===a&&++T===n&&(d=u),_===i&&++B===l&&(y=u),(w=L.nextSibling)!==null)break;L=_,_=L.parentNode}L=w}a=d===-1||y===-1?null:{start:d,end:y}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ac={focusedElem:e,selectionRange:a},rs=!1,Ie=t;Ie!==null;)if(t=Ie,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ie=e;else for(;Ie!==null;){switch(t=Ie,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)n=e[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,a=t,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var te=Ia(a.type,n);e=l.getSnapshotBeforeUpdate(te,i),l.__reactInternalSnapshotBeforeUpdate=e}catch(ce){Ce(a,a.return,ce)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)zc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":zc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,Ie=e;break}Ie=t.return}}function kf(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:ca(e,a),l&4&&zn(5,a);break;case 1:if(ca(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(u){Ce(a,a.return,u)}else{var n=Ia(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){Ce(a,a.return,u)}}l&64&&Df(a),l&512&&Cn(a,a.return);break;case 3:if(ca(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Er(e,t)}catch(u){Ce(a,a.return,u)}}break;case 27:t===null&&l&4&&Lf(a);case 26:case 5:ca(e,a),t===null&&l&4&&Bf(a),l&512&&Cn(a,a.return);break;case 12:ca(e,a);break;case 31:ca(e,a),l&4&&Xf(e,a);break;case 13:ca(e,a),l&4&&Qf(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=qp.bind(null,a),i0(e,a))));break;case 22:if(l=a.memoizedState!==null||sa,!l){t=t!==null&&t.memoizedState!==null||$e,n=sa;var i=$e;sa=l,($e=t)&&!i?oa(e,a,(a.subtreeFlags&8772)!==0):ca(e,a),sa=n,$e=i}break;case 30:break;default:ca(e,a)}}function Yf(e){var t=e.alternate;t!==null&&(e.alternate=null,Yf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Us(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var qe=null,rt=!1;function ua(e,t,a){for(a=a.child;a!==null;)Gf(e,t,a),a=a.sibling}function Gf(e,t,a){if(yt&&typeof yt.onCommitFiberUnmount=="function")try{yt.onCommitFiberUnmount(Pl,a)}catch{}switch(a.tag){case 26:$e||Zt(a,t),ua(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:$e||Zt(a,t);var l=qe,n=rt;Ra(a.type)&&(qe=a.stateNode,rt=!1),ua(e,t,a),Ln(a.stateNode),qe=l,rt=n;break;case 5:$e||Zt(a,t);case 6:if(l=qe,n=rt,qe=null,ua(e,t,a),qe=l,rt=n,qe!==null)if(rt)try{(qe.nodeType===9?qe.body:qe.nodeName==="HTML"?qe.ownerDocument.body:qe).removeChild(a.stateNode)}catch(i){Ce(a,t,i)}else try{qe.removeChild(a.stateNode)}catch(i){Ce(a,t,i)}break;case 18:qe!==null&&(rt?(e=qe,Dd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Gl(e)):Dd(qe,a.stateNode));break;case 4:l=qe,n=rt,qe=a.stateNode.containerInfo,rt=!0,ua(e,t,a),qe=l,rt=n;break;case 0:case 11:case 14:case 15:Aa(2,a,t),$e||Aa(4,a,t),ua(e,t,a);break;case 1:$e||(Zt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&Mf(a,t,l)),ua(e,t,a);break;case 21:ua(e,t,a);break;case 22:$e=(l=$e)||a.memoizedState!==null,ua(e,t,a),$e=l;break;default:ua(e,t,a)}}function Xf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Gl(e)}catch(a){Ce(t,t.return,a)}}}function Qf(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Gl(e)}catch(a){Ce(t,t.return,a)}}function Op(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new qf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new qf),t;default:throw Error(o(435,e.tag))}}function Qi(e,t){var a=Op(e);t.forEach(function(l){if(!a.has(l)){a.add(l);var n=kp.bind(null,e,l);l.then(n,n)}})}function ft(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=e,u=t,d=u;e:for(;d!==null;){switch(d.tag){case 27:if(Ra(d.type)){qe=d.stateNode,rt=!1;break e}break;case 5:qe=d.stateNode,rt=!1;break e;case 3:case 4:qe=d.stateNode.containerInfo,rt=!0;break e}d=d.return}if(qe===null)throw Error(o(160));Gf(i,u,n),qe=null,rt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Zf(t,e),t=t.sibling}var kt=null;function Zf(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ft(t,e),dt(e),l&4&&(Aa(3,e,e.return),zn(3,e),Aa(5,e,e.return));break;case 1:ft(t,e),dt(e),l&512&&($e||a===null||Zt(a,a.return)),l&64&&sa&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=kt;if(ft(t,e),dt(e),l&512&&($e||a===null||Zt(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[tn]||i[et]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),nt(i,l,a),i[et]=e,Pe(i),l=i;break e;case"link":var u=Zd("link","href",n).get(l+(a.href||""));if(u){for(var d=0;d<u.length;d++)if(i=u[d],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(d,1);break t}}i=n.createElement(l),nt(i,l,a),n.head.appendChild(i);break;case"meta":if(u=Zd("meta","content",n).get(l+(a.content||""))){for(d=0;d<u.length;d++)if(i=u[d],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(d,1);break t}}i=n.createElement(l),nt(i,l,a),n.head.appendChild(i);break;default:throw Error(o(468,l))}i[et]=e,Pe(i),l=i}e.stateNode=l}else Vd(n,e.type,e.stateNode);else e.stateNode=Qd(n,l,e.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?Vd(n,e.type,e.stateNode):Qd(n,l,e.memoizedProps)):l===null&&e.stateNode!==null&&ec(e,e.memoizedProps,a.memoizedProps)}break;case 27:ft(t,e),dt(e),l&512&&($e||a===null||Zt(a,a.return)),a!==null&&l&4&&ec(e,e.memoizedProps,a.memoizedProps);break;case 5:if(ft(t,e),dt(e),l&512&&($e||a===null||Zt(a,a.return)),e.flags&32){n=e.stateNode;try{fl(n,"")}catch(te){Ce(e,e.return,te)}}l&4&&e.stateNode!=null&&(n=e.memoizedProps,ec(e,n,a!==null?a.memoizedProps:n)),l&1024&&(lc=!0);break;case 6:if(ft(t,e),dt(e),l&4){if(e.stateNode===null)throw Error(o(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(te){Ce(e,e.return,te)}}break;case 3:if(ss=null,n=kt,kt=ns(t.containerInfo),ft(t,e),kt=n,dt(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Gl(t.containerInfo)}catch(te){Ce(e,e.return,te)}lc&&(lc=!1,Vf(e));break;case 4:l=kt,kt=ns(e.stateNode.containerInfo),ft(t,e),dt(e),kt=l;break;case 12:ft(t,e),dt(e);break;case 31:ft(t,e),dt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Qi(e,l)));break;case 13:ft(t,e),dt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Vi=Fe()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Qi(e,l)));break;case 22:n=e.memoizedState!==null;var y=a!==null&&a.memoizedState!==null,T=sa,B=$e;if(sa=T||n,$e=B||y,ft(t,e),$e=B,sa=T,dt(e),l&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||y||sa||$e||el(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){y=a=t;try{if(i=y.stateNode,n)u=i.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{d=y.stateNode;var L=y.memoizedProps.style,_=L!=null&&L.hasOwnProperty("display")?L.display:null;d.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(te){Ce(y,y.return,te)}}}else if(t.tag===6){if(a===null){y=t;try{y.stateNode.nodeValue=n?"":y.memoizedProps}catch(te){Ce(y,y.return,te)}}}else if(t.tag===18){if(a===null){y=t;try{var w=y.stateNode;n?Md(w,!0):Md(y.stateNode,!1)}catch(te){Ce(y,y.return,te)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,Qi(e,a))));break;case 19:ft(t,e),dt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Qi(e,l)));break;case 30:break;case 21:break;default:ft(t,e),dt(e)}}function dt(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(Hf(l)){a=l;break}l=l.return}if(a==null)throw Error(o(160));switch(a.tag){case 27:var n=a.stateNode,i=tc(e);Xi(e,i,n);break;case 5:var u=a.stateNode;a.flags&32&&(fl(u,""),a.flags&=-33);var d=tc(e);Xi(e,d,u);break;case 3:case 4:var y=a.stateNode.containerInfo,T=tc(e);ac(e,T,y);break;default:throw Error(o(161))}}catch(B){Ce(e,e.return,B)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Vf(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Vf(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ca(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)kf(e,t.alternate,t),t=t.sibling}function el(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Aa(4,t,t.return),el(t);break;case 1:Zt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Mf(t,t.return,a),el(t);break;case 27:Ln(t.stateNode);case 26:case 5:Zt(t,t.return),el(t);break;case 22:t.memoizedState===null&&el(t);break;case 30:el(t);break;default:el(t)}e=e.sibling}}function oa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,n=e,i=t,u=i.flags;switch(i.tag){case 0:case 11:case 15:oa(n,i,a),zn(4,i);break;case 1:if(oa(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(T){Ce(l,l.return,T)}if(l=i,n=l.updateQueue,n!==null){var d=l.stateNode;try{var y=n.shared.hiddenCallbacks;if(y!==null)for(n.shared.hiddenCallbacks=null,n=0;n<y.length;n++)Nr(y[n],d)}catch(T){Ce(l,l.return,T)}}a&&u&64&&Df(i),Cn(i,i.return);break;case 27:Lf(i);case 26:case 5:oa(n,i,a),a&&l===null&&u&4&&Bf(i),Cn(i,i.return);break;case 12:oa(n,i,a);break;case 31:oa(n,i,a),a&&u&4&&Xf(n,i);break;case 13:oa(n,i,a),a&&u&4&&Qf(n,i);break;case 22:i.memoizedState===null&&oa(n,i,a),Cn(i,i.return);break;case 30:break;default:oa(n,i,a)}t=t.sibling}}function nc(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&pn(a))}function ic(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pn(e))}function Yt(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Kf(e,t,a,l),t=t.sibling}function Kf(e,t,a,l){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Yt(e,t,a,l),n&2048&&zn(9,t);break;case 1:Yt(e,t,a,l);break;case 3:Yt(e,t,a,l),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pn(e)));break;case 12:if(n&2048){Yt(e,t,a,l),e=t.stateNode;try{var i=t.memoizedProps,u=i.id,d=i.onPostCommit;typeof d=="function"&&d(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(y){Ce(t,t.return,y)}}else Yt(e,t,a,l);break;case 31:Yt(e,t,a,l);break;case 13:Yt(e,t,a,l);break;case 23:break;case 22:i=t.stateNode,u=t.alternate,t.memoizedState!==null?i._visibility&2?Yt(e,t,a,l):wn(e,t):i._visibility&2?Yt(e,t,a,l):(i._visibility|=2,Ol(e,t,a,l,(t.subtreeFlags&10256)!==0||!1)),n&2048&&nc(u,t);break;case 24:Yt(e,t,a,l),n&2048&&ic(t.alternate,t);break;default:Yt(e,t,a,l)}}function Ol(e,t,a,l,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,u=t,d=a,y=l,T=u.flags;switch(u.tag){case 0:case 11:case 15:Ol(i,u,d,y,n),zn(8,u);break;case 23:break;case 22:var B=u.stateNode;u.memoizedState!==null?B._visibility&2?Ol(i,u,d,y,n):wn(i,u):(B._visibility|=2,Ol(i,u,d,y,n)),n&&T&2048&&nc(u.alternate,u);break;case 24:Ol(i,u,d,y,n),n&&T&2048&&ic(u.alternate,u);break;default:Ol(i,u,d,y,n)}t=t.sibling}}function wn(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,n=l.flags;switch(l.tag){case 22:wn(a,l),n&2048&&nc(l.alternate,l);break;case 24:wn(a,l),n&2048&&ic(l.alternate,l);break;default:wn(a,l)}t=t.sibling}}var On=8192;function Rl(e,t,a){if(e.subtreeFlags&On)for(e=e.child;e!==null;)Jf(e,t,a),e=e.sibling}function Jf(e,t,a){switch(e.tag){case 26:Rl(e,t,a),e.flags&On&&e.memoizedState!==null&&b0(a,kt,e.memoizedState,e.memoizedProps);break;case 5:Rl(e,t,a);break;case 3:case 4:var l=kt;kt=ns(e.stateNode.containerInfo),Rl(e,t,a),kt=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=On,On=16777216,Rl(e,t,a),On=l):Rl(e,t,a));break;default:Rl(e,t,a)}}function $f(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Rn(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ie=l,Wf(l,e)}$f(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ff(e),e=e.sibling}function Ff(e){switch(e.tag){case 0:case 11:case 15:Rn(e),e.flags&2048&&Aa(9,e,e.return);break;case 3:Rn(e);break;case 12:Rn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Zi(e)):Rn(e);break;default:Rn(e)}}function Zi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];Ie=l,Wf(l,e)}$f(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Aa(8,t,t.return),Zi(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Zi(t));break;default:Zi(t)}e=e.sibling}}function Wf(e,t){for(;Ie!==null;){var a=Ie;switch(a.tag){case 0:case 11:case 15:Aa(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:pn(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,Ie=l;else e:for(a=e;Ie!==null;){l=Ie;var n=l.sibling,i=l.return;if(Yf(l),l===a){Ie=null;break e}if(n!==null){n.return=i,Ie=n;break e}Ie=i}}}var Rp={getCacheForType:function(e){var t=at(Ve),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return at(Ve).controller.signal}},Up=typeof WeakMap=="function"?WeakMap:Map,je=0,De=null,be=null,ve=0,ze=0,jt=null,Ta=!1,Ul=!1,sc=!1,ra=0,Ge=0,_a=0,tl=0,uc=0,At=0,Dl=0,Un=null,mt=null,cc=!1,Vi=0,Pf=0,Ki=1/0,Ji=null,za=null,We=0,Ca=null,Ml=null,fa=0,oc=0,rc=null,If=null,Dn=0,fc=null;function Tt(){return(je&2)!==0&&ve!==0?ve&-ve:O.T!==null?bc():ho()}function ed(){if(At===0)if((ve&536870912)===0||Se){var e=ai;ai<<=1,(ai&3932160)===0&&(ai=262144),At=e}else At=536870912;return e=Nt.current,e!==null&&(e.flags|=32),At}function ht(e,t,a){(e===De&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(Bl(e,0),wa(e,ve,At,!1)),en(e,a),((je&2)===0||e!==De)&&(e===De&&((je&2)===0&&(tl|=a),Ge===4&&wa(e,ve,At,!1)),Vt(e))}function td(e,t,a){if((je&6)!==0)throw Error(o(327));var l=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Il(e,t),n=l?Bp(e,t):mc(e,t,!0),i=l;do{if(n===0){Ul&&!l&&wa(e,t,0,!1);break}else{if(a=e.current.alternate,i&&!Dp(a)){n=mc(e,t,!1),i=!1;continue}if(n===2){if(i=t,e.errorRecoveryDisabledLanes&i)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var d=e;n=Un;var y=d.current.memoizedState.isDehydrated;if(y&&(Bl(d,u).flags|=256),u=mc(d,u,!1),u!==2){if(sc&&!y){d.errorRecoveryDisabledLanes|=i,tl|=i,n=4;break e}i=mt,mt=n,i!==null&&(mt===null?mt=i:mt.push.apply(mt,i))}n=u}if(i=!1,n!==2)continue}}if(n===1){Bl(e,0),wa(e,t,0,!0);break}e:{switch(l=e,i=n,i){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:wa(l,t,At,!Ta);break e;case 2:mt=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(n=Vi+300-Fe(),10<n)){if(wa(l,t,At,!Ta),ni(l,0,!0)!==0)break e;fa=t,l.timeoutHandle=Rd(ad.bind(null,l,a,mt,Ji,cc,t,At,tl,Dl,Ta,i,"Throttled",-0,0),n);break e}ad(l,a,mt,Ji,cc,t,At,tl,Dl,Ta,i,null,-0,0)}}break}while(!0);Vt(e)}function ad(e,t,a,l,n,i,u,d,y,T,B,L,_,w){if(e.timeoutHandle=-1,L=t.subtreeFlags,L&8192||(L&16785408)===16785408){L={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ft},Jf(t,i,L);var te=(i&62914560)===i?Vi-Fe():(i&4194048)===i?Pf-Fe():0;if(te=y0(L,te),te!==null){fa=i,e.cancelPendingCommit=te(rd.bind(null,e,t,i,a,l,n,u,d,y,B,L,null,_,w)),wa(e,i,u,!T);return}}rd(e,t,i,a,l,n,u,d,y)}function Dp(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!xt(i(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wa(e,t,a,l){t&=~uc,t&=~tl,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var n=t;0<n;){var i=31-vt(n),u=1<<i;l[i]=-1,n&=~u}a!==0&&ro(e,a,t)}function $i(){return(je&6)===0?(Mn(0),!1):!0}function dc(){if(be!==null){if(ze===0)var e=be.return;else e=be,ea=Va=null,zu(e),Tl=null,bn=0,e=be;for(;e!==null;)Uf(e.alternate,e),e=e.return;be=null}}function Bl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,e0(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),fa=0,dc(),De=e,be=a=Pt(e.current,null),ve=t,ze=0,jt=null,Ta=!1,Ul=Il(e,t),sc=!1,Dl=At=uc=tl=_a=Ge=0,mt=Un=null,cc=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var n=31-vt(l),i=1<<n;t|=e[n],l&=~i}return ra=t,gi(),a}function ld(e,t){he=null,O.H=An,t===Al||t===ji?(t=yr(),ze=3):t===gu?(t=yr(),ze=4):ze=t===Qu?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,jt=t,be===null&&(Ge=1,Li(e,Ot(t,e.current)))}function nd(){var e=Nt.current;return e===null?!0:(ve&4194048)===ve?Mt===null:(ve&62914560)===ve||(ve&536870912)!==0?e===Mt:!1}function id(){var e=O.H;return O.H=An,e===null?An:e}function sd(){var e=O.A;return O.A=Rp,e}function Fi(){Ge=4,Ta||(ve&4194048)!==ve&&Nt.current!==null||(Ul=!0),(_a&134217727)===0&&(tl&134217727)===0||De===null||wa(De,ve,At,!1)}function mc(e,t,a){var l=je;je|=2;var n=id(),i=sd();(De!==e||ve!==t)&&(Ji=null,Bl(e,t)),t=!1;var u=Ge;e:do try{if(ze!==0&&be!==null){var d=be,y=jt;switch(ze){case 8:dc(),u=6;break e;case 3:case 2:case 9:case 6:Nt.current===null&&(t=!0);var T=ze;if(ze=0,jt=null,Hl(e,d,y,T),a&&Ul){u=0;break e}break;default:T=ze,ze=0,jt=null,Hl(e,d,y,T)}}Mp(),u=Ge;break}catch(B){ld(e,B)}while(!0);return t&&e.shellSuspendCounter++,ea=Va=null,je=l,O.H=n,O.A=i,be===null&&(De=null,ve=0,gi()),u}function Mp(){for(;be!==null;)ud(be)}function Bp(e,t){var a=je;je|=2;var l=id(),n=sd();De!==e||ve!==t?(Ji=null,Ki=Fe()+500,Bl(e,t)):Ul=Il(e,t);e:do try{if(ze!==0&&be!==null){t=be;var i=jt;t:switch(ze){case 1:ze=0,jt=null,Hl(e,t,i,1);break;case 2:case 9:if(gr(i)){ze=0,jt=null,cd(t);break}t=function(){ze!==2&&ze!==9||De!==e||(ze=7),Vt(e)},i.then(t,t);break e;case 3:ze=7;break e;case 4:ze=5;break e;case 7:gr(i)?(ze=0,jt=null,cd(t)):(ze=0,jt=null,Hl(e,t,i,7));break;case 5:var u=null;switch(be.tag){case 26:u=be.memoizedState;case 5:case 27:var d=be;if(u?Kd(u):d.stateNode.complete){ze=0,jt=null;var y=d.sibling;if(y!==null)be=y;else{var T=d.return;T!==null?(be=T,Wi(T)):be=null}break t}}ze=0,jt=null,Hl(e,t,i,5);break;case 6:ze=0,jt=null,Hl(e,t,i,6);break;case 8:dc(),Ge=6;break e;default:throw Error(o(462))}}Hp();break}catch(B){ld(e,B)}while(!0);return ea=Va=null,O.H=l,O.A=n,je=a,be!==null?0:(De=null,ve=0,gi(),Ge)}function Hp(){for(;be!==null&&!In();)ud(be)}function ud(e){var t=Of(e.alternate,e,ra);e.memoizedProps=e.pendingProps,t===null?Wi(e):be=t}function cd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Af(a,t,t.pendingProps,t.type,void 0,ve);break;case 11:t=Af(a,t,t.pendingProps,t.type.render,t.ref,ve);break;case 5:zu(t);default:Uf(a,t),t=be=ir(t,ra),t=Of(a,t,ra)}e.memoizedProps=e.pendingProps,t===null?Wi(e):be=t}function Hl(e,t,a,l){ea=Va=null,zu(t),Tl=null,bn=0;var n=t.return;try{if(Ap(e,n,t,a,ve)){Ge=1,Li(e,Ot(a,e.current)),be=null;return}}catch(i){if(n!==null)throw be=n,i;Ge=1,Li(e,Ot(a,e.current)),be=null;return}t.flags&32768?(Se||l===1?e=!0:Ul||(ve&536870912)!==0?e=!1:(Ta=e=!0,(l===2||l===9||l===3||l===6)&&(l=Nt.current,l!==null&&l.tag===13&&(l.flags|=16384))),od(t,e)):Wi(t)}function Wi(e){var t=e;do{if((t.flags&32768)!==0){od(t,Ta);return}e=t.return;var a=zp(t.alternate,t,ra);if(a!==null){be=a;return}if(t=t.sibling,t!==null){be=t;return}be=t=e}while(t!==null);Ge===0&&(Ge=5)}function od(e,t){do{var a=Cp(e.alternate,e);if(a!==null){a.flags&=32767,be=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){be=e;return}be=e=a}while(e!==null);Ge=6,be=null}function rd(e,t,a,l,n,i,u,d,y){e.cancelPendingCommit=null;do Pi();while(We!==0);if((je&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,i|=tu,gh(e,a,i,u,d,y),e===De&&(be=De=null,ve=0),Ml=t,Ca=e,fa=a,oc=i,rc=n,If=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Yp(ei,function(){return pd(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=O.T,O.T=null,n=M.p,M.p=2,u=je,je|=4;try{wp(e,t,a)}finally{je=u,M.p=n,O.T=l}}We=1,fd(),dd(),md()}}function fd(){if(We===1){We=0;var e=Ca,t=Ml,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=O.T,O.T=null;var l=M.p;M.p=2;var n=je;je|=4;try{Zf(t,e);var i=Ac,u=Fo(e.containerInfo),d=i.focusedElem,y=i.selectionRange;if(u!==d&&d&&d.ownerDocument&&$o(d.ownerDocument.documentElement,d)){if(y!==null&&Fs(d)){var T=y.start,B=y.end;if(B===void 0&&(B=T),"selectionStart"in d)d.selectionStart=T,d.selectionEnd=Math.min(B,d.value.length);else{var L=d.ownerDocument||document,_=L&&L.defaultView||window;if(_.getSelection){var w=_.getSelection(),te=d.textContent.length,ce=Math.min(y.start,te),Ue=y.end===void 0?ce:Math.min(y.end,te);!w.extend&&ce>Ue&&(u=Ue,Ue=ce,ce=u);var x=Jo(d,ce),v=Jo(d,Ue);if(x&&v&&(w.rangeCount!==1||w.anchorNode!==x.node||w.anchorOffset!==x.offset||w.focusNode!==v.node||w.focusOffset!==v.offset)){var E=L.createRange();E.setStart(x.node,x.offset),w.removeAllRanges(),ce>Ue?(w.addRange(E),w.extend(v.node,v.offset)):(E.setEnd(v.node,v.offset),w.addRange(E))}}}}for(L=[],w=d;w=w.parentNode;)w.nodeType===1&&L.push({element:w,left:w.scrollLeft,top:w.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<L.length;d++){var H=L[d];H.element.scrollLeft=H.left,H.element.scrollTop=H.top}}rs=!!jc,Ac=jc=null}finally{je=n,M.p=l,O.T=a}}e.current=t,We=2}}function dd(){if(We===2){We=0;var e=Ca,t=Ml,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=O.T,O.T=null;var l=M.p;M.p=2;var n=je;je|=4;try{kf(e,t.alternate,t)}finally{je=n,M.p=l,O.T=a}}We=3}}function md(){if(We===4||We===3){We=0,zs();var e=Ca,t=Ml,a=fa,l=If;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?We=5:(We=0,Ml=Ca=null,hd(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(za=null),Os(a),t=t.stateNode,yt&&typeof yt.onCommitFiberRoot=="function")try{yt.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=O.T,n=M.p,M.p=2,O.T=null;try{for(var i=e.onRecoverableError,u=0;u<l.length;u++){var d=l[u];i(d.value,{componentStack:d.stack})}}finally{O.T=t,M.p=n}}(fa&3)!==0&&Pi(),Vt(e),n=e.pendingLanes,(a&261930)!==0&&(n&42)!==0?e===fc?Dn++:(Dn=0,fc=e):Dn=0,Mn(0)}}function hd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,pn(t)))}function Pi(){return fd(),dd(),md(),pd()}function pd(){if(We!==5)return!1;var e=Ca,t=oc;oc=0;var a=Os(fa),l=O.T,n=M.p;try{M.p=32>a?32:a,O.T=null,a=rc,rc=null;var i=Ca,u=fa;if(We=0,Ml=Ca=null,fa=0,(je&6)!==0)throw Error(o(331));var d=je;if(je|=4,Ff(i.current),Kf(i,i.current,u,a),je=d,Mn(0,!1),yt&&typeof yt.onPostCommitFiberRoot=="function")try{yt.onPostCommitFiberRoot(Pl,i)}catch{}return!0}finally{M.p=n,O.T=l,hd(e,t)}}function gd(e,t,a){t=Ot(a,t),t=Xu(e.stateNode,t,2),e=Na(e,t,2),e!==null&&(en(e,2),Vt(e))}function Ce(e,t,a){if(e.tag===3)gd(e,e,a);else for(;t!==null;){if(t.tag===3){gd(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(za===null||!za.has(l))){e=Ot(a,e),a=bf(2),l=Na(t,a,2),l!==null&&(yf(a,l,t,e),en(l,2),Vt(l));break}}t=t.return}}function hc(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new Up;var n=new Set;l.set(t,n)}else n=l.get(t),n===void 0&&(n=new Set,l.set(t,n));n.has(a)||(sc=!0,n.add(a),e=Lp.bind(null,e,t,a),t.then(e,e))}function Lp(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,De===e&&(ve&a)===a&&(Ge===4||Ge===3&&(ve&62914560)===ve&&300>Fe()-Vi?(je&2)===0&&Bl(e,0):uc|=a,Dl===ve&&(Dl=0)),Vt(e)}function bd(e,t){t===0&&(t=oo()),e=Xa(e,t),e!==null&&(en(e,t),Vt(e))}function qp(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),bd(e,a)}function kp(e,t){var a=0;switch(e.tag){case 31:case 13:var l=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(o(314))}l!==null&&l.delete(t),bd(e,a)}function Yp(e,t){return $l(e,t)}var Ii=null,Ll=null,pc=!1,es=!1,gc=!1,Oa=0;function Vt(e){e!==Ll&&e.next===null&&(Ll===null?Ii=Ll=e:Ll=Ll.next=e),es=!0,pc||(pc=!0,Xp())}function Mn(e,t){if(!gc&&es){gc=!0;do for(var a=!1,l=Ii;l!==null;){if(e!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var u=l.suspendedLanes,d=l.pingedLanes;i=(1<<31-vt(42|e)+1)-1,i&=n&~(u&~d),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Sd(l,i))}else i=ve,i=ni(l,l===De?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||Il(l,i)||(a=!0,Sd(l,i));l=l.next}while(a);gc=!1}}function Gp(){yd()}function yd(){es=pc=!1;var e=0;Oa!==0&&Ip()&&(e=Oa);for(var t=Fe(),a=null,l=Ii;l!==null;){var n=l.next,i=vd(l,t);i===0?(l.next=null,a===null?Ii=n:a.next=n,n===null&&(Ll=a)):(a=l,(e!==0||(i&3)!==0)&&(es=!0)),l=n}We!==0&&We!==5||Mn(e),Oa!==0&&(Oa=0)}function vd(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,n=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var u=31-vt(i),d=1<<u,y=n[u];y===-1?((d&a)===0||(d&l)!==0)&&(n[u]=ph(d,t)):y<=t&&(e.expiredLanes|=d),i&=~d}if(t=De,a=ve,a=ni(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Fl(l),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Il(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&Fl(l),Os(a)){case 2:case 8:a=uo;break;case 32:a=ei;break;case 268435456:a=co;break;default:a=ei}return l=xd.bind(null,e),a=$l(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&Fl(l),e.callbackPriority=2,e.callbackNode=null,2}function xd(e,t){if(We!==0&&We!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Pi()&&e.callbackNode!==a)return null;var l=ve;return l=ni(e,e===De?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(td(e,l,t),vd(e,Fe()),e.callbackNode!=null&&e.callbackNode===a?xd.bind(null,e):null)}function Sd(e,t){if(Pi())return null;td(e,t,!0)}function Xp(){t0(function(){(je&6)!==0?$l(so,Gp):yd()})}function bc(){if(Oa===0){var e=El;e===0&&(e=ti,ti<<=1,(ti&261888)===0&&(ti=256)),Oa=e}return Oa}function Nd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ci(""+e)}function Ed(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Qp(e,t,a,l,n){if(t==="submit"&&a&&a.stateNode===n){var i=Nd((n[ct]||null).action),u=l.submitter;u&&(t=(t=u[ct]||null)?Nd(t.formAction):u.getAttribute("formAction"),t!==null&&(i=t,u=null));var d=new di("action","action",null,l,n);e.push({event:d,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Oa!==0){var y=u?Ed(n,u):new FormData(n);Hu(a,{pending:!0,data:y,method:n.method,action:i},null,y)}}else typeof i=="function"&&(d.preventDefault(),y=u?Ed(n,u):new FormData(n),Hu(a,{pending:!0,data:y,method:n.method,action:i},i,y))},currentTarget:n}]})}}for(var yc=0;yc<eu.length;yc++){var vc=eu[yc],Zp=vc.toLowerCase(),Vp=vc[0].toUpperCase()+vc.slice(1);qt(Zp,"on"+Vp)}qt(Io,"onAnimationEnd"),qt(er,"onAnimationIteration"),qt(tr,"onAnimationStart"),qt("dblclick","onDoubleClick"),qt("focusin","onFocus"),qt("focusout","onBlur"),qt(cp,"onTransitionRun"),qt(op,"onTransitionStart"),qt(rp,"onTransitionCancel"),qt(ar,"onTransitionEnd"),ol("onMouseEnter",["mouseout","mouseover"]),ol("onMouseLeave",["mouseout","mouseover"]),ol("onPointerEnter",["pointerout","pointerover"]),ol("onPointerLeave",["pointerout","pointerover"]),qa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),qa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),qa("onBeforeInput",["compositionend","keypress","textInput","paste"]),qa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),qa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),qa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Kp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bn));function jd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],n=l.event;l=l.listeners;e:{var i=void 0;if(t)for(var u=l.length-1;0<=u;u--){var d=l[u],y=d.instance,T=d.currentTarget;if(d=d.listener,y!==i&&n.isPropagationStopped())break e;i=d,n.currentTarget=T;try{i(n)}catch(B){pi(B)}n.currentTarget=null,i=y}else for(u=0;u<l.length;u++){if(d=l[u],y=d.instance,T=d.currentTarget,d=d.listener,y!==i&&n.isPropagationStopped())break e;i=d,n.currentTarget=T;try{i(n)}catch(B){pi(B)}n.currentTarget=null,i=y}}}}function ye(e,t){var a=t[Rs];a===void 0&&(a=t[Rs]=new Set);var l=e+"__bubble";a.has(l)||(Ad(t,e,2,!1),a.add(l))}function xc(e,t,a){var l=0;t&&(l|=4),Ad(a,e,l,t)}var ts="_reactListening"+Math.random().toString(36).slice(2);function Sc(e){if(!e[ts]){e[ts]=!0,bo.forEach(function(a){a!=="selectionchange"&&(Kp.has(a)||xc(a,!1,e),xc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ts]||(t[ts]=!0,xc("selectionchange",!1,t))}}function Ad(e,t,a,l){switch(em(t)){case 2:var n=S0;break;case 8:n=N0;break;default:n=Bc}a=n.bind(null,t,a,e),n=void 0,!Ys||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),l?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function Nc(e,t,a,l,n){var i=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var d=l.stateNode.containerInfo;if(d===n)break;if(u===4)for(u=l.return;u!==null;){var y=u.tag;if((y===3||y===4)&&u.stateNode.containerInfo===n)return;u=u.return}for(;d!==null;){if(u=sl(d),u===null)return;if(y=u.tag,y===5||y===6||y===26||y===27){l=i=u;continue e}d=d.parentNode}}l=l.return}Co(function(){var T=i,B=qs(a),L=[];e:{var _=lr.get(e);if(_!==void 0){var w=di,te=e;switch(e){case"keypress":if(ri(a)===0)break e;case"keydown":case"keyup":w=kh;break;case"focusin":te="focus",w=Zs;break;case"focusout":te="blur",w=Zs;break;case"beforeblur":case"afterblur":w=Zs;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=Ro;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=zh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Xh;break;case Io:case er:case tr:w=Oh;break;case ar:w=Zh;break;case"scroll":case"scrollend":w=Th;break;case"wheel":w=Kh;break;case"copy":case"cut":case"paste":w=Uh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=Do;break;case"toggle":case"beforetoggle":w=$h}var ce=(t&4)!==0,Ue=!ce&&(e==="scroll"||e==="scrollend"),x=ce?_!==null?_+"Capture":null:_;ce=[];for(var v=T,E;v!==null;){var H=v;if(E=H.stateNode,H=H.tag,H!==5&&H!==26&&H!==27||E===null||x===null||(H=ln(v,x),H!=null&&ce.push(Hn(v,H,E))),Ue)break;v=v.return}0<ce.length&&(_=new w(_,te,null,a,B),L.push({event:_,listeners:ce}))}}if((t&7)===0){e:{if(_=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",_&&a!==Ls&&(te=a.relatedTarget||a.fromElement)&&(sl(te)||te[il]))break e;if((w||_)&&(_=B.window===B?B:(_=B.ownerDocument)?_.defaultView||_.parentWindow:window,w?(te=a.relatedTarget||a.toElement,w=T,te=te?sl(te):null,te!==null&&(Ue=b(te),ce=te.tag,te!==Ue||ce!==5&&ce!==27&&ce!==6)&&(te=null)):(w=null,te=T),w!==te)){if(ce=Ro,H="onMouseLeave",x="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(ce=Do,H="onPointerLeave",x="onPointerEnter",v="pointer"),Ue=w==null?_:an(w),E=te==null?_:an(te),_=new ce(H,v+"leave",w,a,B),_.target=Ue,_.relatedTarget=E,H=null,sl(B)===T&&(ce=new ce(x,v+"enter",te,a,B),ce.target=E,ce.relatedTarget=Ue,H=ce),Ue=H,w&&te)t:{for(ce=Jp,x=w,v=te,E=0,H=x;H;H=ce(H))E++;H=0;for(var se=v;se;se=ce(se))H++;for(;0<E-H;)x=ce(x),E--;for(;0<H-E;)v=ce(v),H--;for(;E--;){if(x===v||v!==null&&x===v.alternate){ce=x;break t}x=ce(x),v=ce(v)}ce=null}else ce=null;w!==null&&Td(L,_,w,ce,!1),te!==null&&Ue!==null&&Td(L,Ue,te,ce,!0)}}e:{if(_=T?an(T):window,w=_.nodeName&&_.nodeName.toLowerCase(),w==="select"||w==="input"&&_.type==="file")var Ne=Go;else if(ko(_))if(Xo)Ne=ip;else{Ne=lp;var ne=ap}else w=_.nodeName,!w||w.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?T&&Hs(T.elementType)&&(Ne=Go):Ne=np;if(Ne&&(Ne=Ne(e,T))){Yo(L,Ne,a,B);break e}ne&&ne(e,_,T),e==="focusout"&&T&&_.type==="number"&&T.memoizedProps.value!=null&&Bs(_,"number",_.value)}switch(ne=T?an(T):window,e){case"focusin":(ko(ne)||ne.contentEditable==="true")&&(pl=ne,Ws=T,dn=null);break;case"focusout":dn=Ws=pl=null;break;case"mousedown":Ps=!0;break;case"contextmenu":case"mouseup":case"dragend":Ps=!1,Wo(L,a,B);break;case"selectionchange":if(up)break;case"keydown":case"keyup":Wo(L,a,B)}var ge;if(Ks)e:{switch(e){case"compositionstart":var xe="onCompositionStart";break e;case"compositionend":xe="onCompositionEnd";break e;case"compositionupdate":xe="onCompositionUpdate";break e}xe=void 0}else hl?Lo(e,a)&&(xe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(Mo&&a.locale!=="ko"&&(hl||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&hl&&(ge=wo()):(pa=B,Gs="value"in pa?pa.value:pa.textContent,hl=!0)),ne=as(T,xe),0<ne.length&&(xe=new Uo(xe,e,null,a,B),L.push({event:xe,listeners:ne}),ge?xe.data=ge:(ge=qo(a),ge!==null&&(xe.data=ge)))),(ge=Wh?Ph(e,a):Ih(e,a))&&(xe=as(T,"onBeforeInput"),0<xe.length&&(ne=new Uo("onBeforeInput","beforeinput",null,a,B),L.push({event:ne,listeners:xe}),ne.data=ge)),Qp(L,e,T,a,B)}jd(L,t)})}function Hn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function as(e,t){for(var a=t+"Capture",l=[];e!==null;){var n=e,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=ln(e,a),n!=null&&l.unshift(Hn(e,n,i)),n=ln(e,t),n!=null&&l.push(Hn(e,n,i))),e.tag===3)return l;e=e.return}return[]}function Jp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Td(e,t,a,l,n){for(var i=t._reactName,u=[];a!==null&&a!==l;){var d=a,y=d.alternate,T=d.stateNode;if(d=d.tag,y!==null&&y===l)break;d!==5&&d!==26&&d!==27||T===null||(y=T,n?(T=ln(a,i),T!=null&&u.unshift(Hn(a,T,y))):n||(T=ln(a,i),T!=null&&u.push(Hn(a,T,y)))),a=a.return}u.length!==0&&e.push({event:t,listeners:u})}var $p=/\r\n?/g,Fp=/\u0000|\uFFFD/g;function _d(e){return(typeof e=="string"?e:""+e).replace($p,`
`).replace(Fp,"")}function zd(e,t){return t=_d(t),_d(e)===t}function Re(e,t,a,l,n,i){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||fl(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&fl(e,""+l);break;case"className":si(e,"class",l);break;case"tabIndex":si(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":si(e,a,l);break;case"style":_o(e,l,i);break;case"data":if(t!=="object"){si(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=ci(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(t!=="input"&&Re(e,t,"name",n.name,n,null),Re(e,t,"formEncType",n.formEncType,n,null),Re(e,t,"formMethod",n.formMethod,n,null),Re(e,t,"formTarget",n.formTarget,n,null)):(Re(e,t,"encType",n.encType,n,null),Re(e,t,"method",n.method,n,null),Re(e,t,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=ci(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=Ft);break;case"onScroll":l!=null&&ye("scroll",e);break;case"onScrollEnd":l!=null&&ye("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(o(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=ci(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":ye("beforetoggle",e),ye("toggle",e),ii(e,"popover",l);break;case"xlinkActuate":$t(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":$t(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":$t(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":$t(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":$t(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":$t(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":$t(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":$t(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":$t(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":ii(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=jh.get(a)||a,ii(e,a,l))}}function Ec(e,t,a,l,n,i){switch(a){case"style":_o(e,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(o(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(o(60));e.innerHTML=a}}break;case"children":typeof l=="string"?fl(e,l):(typeof l=="number"||typeof l=="bigint")&&fl(e,""+l);break;case"onScroll":l!=null&&ye("scroll",e);break;case"onScrollEnd":l!=null&&ye("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Ft);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!yo.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),i=e[ct]||null,i=i!=null?i[a]:null,typeof i=="function"&&e.removeEventListener(t,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,n);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):ii(e,a,l)}}}function nt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ye("error",e),ye("load",e);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var u=a[i];if(u!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Re(e,t,i,u,a,null)}}n&&Re(e,t,"srcSet",a.srcSet,a,null),l&&Re(e,t,"src",a.src,a,null);return;case"input":ye("invalid",e);var d=i=u=n=null,y=null,T=null;for(l in a)if(a.hasOwnProperty(l)){var B=a[l];if(B!=null)switch(l){case"name":n=B;break;case"type":u=B;break;case"checked":y=B;break;case"defaultChecked":T=B;break;case"value":i=B;break;case"defaultValue":d=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(o(137,t));break;default:Re(e,t,l,B,a,null)}}Eo(e,i,d,y,T,u,n,!1);return;case"select":ye("invalid",e),l=u=i=null;for(n in a)if(a.hasOwnProperty(n)&&(d=a[n],d!=null))switch(n){case"value":i=d;break;case"defaultValue":u=d;break;case"multiple":l=d;default:Re(e,t,n,d,a,null)}t=i,a=u,e.multiple=!!l,t!=null?rl(e,!!l,t,!1):a!=null&&rl(e,!!l,a,!0);return;case"textarea":ye("invalid",e),i=n=l=null;for(u in a)if(a.hasOwnProperty(u)&&(d=a[u],d!=null))switch(u){case"value":l=d;break;case"defaultValue":n=d;break;case"children":i=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(o(91));break;default:Re(e,t,u,d,a,null)}Ao(e,l,n,i);return;case"option":for(y in a)if(a.hasOwnProperty(y)&&(l=a[y],l!=null))switch(y){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Re(e,t,y,l,a,null)}return;case"dialog":ye("beforetoggle",e),ye("toggle",e),ye("cancel",e),ye("close",e);break;case"iframe":case"object":ye("load",e);break;case"video":case"audio":for(l=0;l<Bn.length;l++)ye(Bn[l],e);break;case"image":ye("error",e),ye("load",e);break;case"details":ye("toggle",e);break;case"embed":case"source":case"link":ye("error",e),ye("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(T in a)if(a.hasOwnProperty(T)&&(l=a[T],l!=null))switch(T){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Re(e,t,T,l,a,null)}return;default:if(Hs(t)){for(B in a)a.hasOwnProperty(B)&&(l=a[B],l!==void 0&&Ec(e,t,B,l,a,void 0));return}}for(d in a)a.hasOwnProperty(d)&&(l=a[d],l!=null&&Re(e,t,d,l,a,null))}function Wp(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,u=null,d=null,y=null,T=null,B=null;for(w in a){var L=a[w];if(a.hasOwnProperty(w)&&L!=null)switch(w){case"checked":break;case"value":break;case"defaultValue":y=L;default:l.hasOwnProperty(w)||Re(e,t,w,null,l,L)}}for(var _ in l){var w=l[_];if(L=a[_],l.hasOwnProperty(_)&&(w!=null||L!=null))switch(_){case"type":i=w;break;case"name":n=w;break;case"checked":T=w;break;case"defaultChecked":B=w;break;case"value":u=w;break;case"defaultValue":d=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(137,t));break;default:w!==L&&Re(e,t,_,w,l,L)}}Ms(e,u,d,y,T,B,i,n);return;case"select":w=u=d=_=null;for(i in a)if(y=a[i],a.hasOwnProperty(i)&&y!=null)switch(i){case"value":break;case"multiple":w=y;default:l.hasOwnProperty(i)||Re(e,t,i,null,l,y)}for(n in l)if(i=l[n],y=a[n],l.hasOwnProperty(n)&&(i!=null||y!=null))switch(n){case"value":_=i;break;case"defaultValue":d=i;break;case"multiple":u=i;default:i!==y&&Re(e,t,n,i,l,y)}t=d,a=u,l=w,_!=null?rl(e,!!a,_,!1):!!l!=!!a&&(t!=null?rl(e,!!a,t,!0):rl(e,!!a,a?[]:"",!1));return;case"textarea":w=_=null;for(d in a)if(n=a[d],a.hasOwnProperty(d)&&n!=null&&!l.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:Re(e,t,d,null,l,n)}for(u in l)if(n=l[u],i=a[u],l.hasOwnProperty(u)&&(n!=null||i!=null))switch(u){case"value":_=n;break;case"defaultValue":w=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(o(91));break;default:n!==i&&Re(e,t,u,n,l,i)}jo(e,_,w);return;case"option":for(var te in a)if(_=a[te],a.hasOwnProperty(te)&&_!=null&&!l.hasOwnProperty(te))switch(te){case"selected":e.selected=!1;break;default:Re(e,t,te,null,l,_)}for(y in l)if(_=l[y],w=a[y],l.hasOwnProperty(y)&&_!==w&&(_!=null||w!=null))switch(y){case"selected":e.selected=_&&typeof _!="function"&&typeof _!="symbol";break;default:Re(e,t,y,_,l,w)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ce in a)_=a[ce],a.hasOwnProperty(ce)&&_!=null&&!l.hasOwnProperty(ce)&&Re(e,t,ce,null,l,_);for(T in l)if(_=l[T],w=a[T],l.hasOwnProperty(T)&&_!==w&&(_!=null||w!=null))switch(T){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(o(137,t));break;default:Re(e,t,T,_,l,w)}return;default:if(Hs(t)){for(var Ue in a)_=a[Ue],a.hasOwnProperty(Ue)&&_!==void 0&&!l.hasOwnProperty(Ue)&&Ec(e,t,Ue,void 0,l,_);for(B in l)_=l[B],w=a[B],!l.hasOwnProperty(B)||_===w||_===void 0&&w===void 0||Ec(e,t,B,_,l,w);return}}for(var x in a)_=a[x],a.hasOwnProperty(x)&&_!=null&&!l.hasOwnProperty(x)&&Re(e,t,x,null,l,_);for(L in l)_=l[L],w=a[L],!l.hasOwnProperty(L)||_===w||_==null&&w==null||Re(e,t,L,_,l,w)}function Cd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Pp(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,u=n.initiatorType,d=n.duration;if(i&&d&&Cd(u)){for(u=0,d=n.responseEnd,l+=1;l<a.length;l++){var y=a[l],T=y.startTime;if(T>d)break;var B=y.transferSize,L=y.initiatorType;B&&Cd(L)&&(y=y.responseEnd,u+=B*(y<d?1:(d-T)/(y-T)))}if(--l,t+=8*(i+u)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var jc=null,Ac=null;function ls(e){return e.nodeType===9?e:e.ownerDocument}function wd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Od(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Tc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var _c=null;function Ip(){var e=window.event;return e&&e.type==="popstate"?e===_c?!1:(_c=e,!0):(_c=null,!1)}var Rd=typeof setTimeout=="function"?setTimeout:void 0,e0=typeof clearTimeout=="function"?clearTimeout:void 0,Ud=typeof Promise=="function"?Promise:void 0,t0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ud<"u"?function(e){return Ud.resolve(null).then(e).catch(a0)}:Rd;function a0(e){setTimeout(function(){throw e})}function Ra(e){return e==="head"}function Dd(e,t){var a=t,l=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){e.removeChild(n),Gl(t);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Ln(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Ln(a);for(var i=a.firstChild;i;){var u=i.nextSibling,d=i.nodeName;i[tn]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=u}}else a==="body"&&Ln(e.ownerDocument.body);a=n}while(a);Gl(t)}function Md(e,t){var a=e;e=0;do{var l=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=l}while(a)}function zc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":zc(a),Us(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function l0(e,t,a,l){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[tn])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=Bt(e.nextSibling),e===null)break}return null}function n0(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Bt(e.nextSibling),e===null))return null;return e}function Bd(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Bt(e.nextSibling),e===null))return null;return e}function Cc(e){return e.data==="$?"||e.data==="$~"}function wc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function i0(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Oc=null;function Hd(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Bt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Ld(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function qd(e,t,a){switch(t=ls(a),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function Ln(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Us(e)}var Ht=new Map,kd=new Set;function ns(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=M.d;M.d={f:s0,r:u0,D:c0,C:o0,L:r0,m:f0,X:m0,S:d0,M:h0};function s0(){var e=da.f(),t=$i();return e||t}function u0(e){var t=ul(e);t!==null&&t.tag===5&&t.type==="form"?af(t):da.r(e)}var ql=typeof document>"u"?null:document;function Yd(e,t,a){var l=ql;if(l&&typeof t=="string"&&t){var n=Ct(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),kd.has(n)||(kd.add(n),e={rel:e,crossOrigin:a,href:t},l.querySelector(n)===null&&(t=l.createElement("link"),nt(t,"link",e),Pe(t),l.head.appendChild(t)))}}function c0(e){da.D(e),Yd("dns-prefetch",e,null)}function o0(e,t){da.C(e,t),Yd("preconnect",e,t)}function r0(e,t,a){da.L(e,t,a);var l=ql;if(l&&e&&t){var n='link[rel="preload"][as="'+Ct(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+Ct(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+Ct(a.imageSizes)+'"]')):n+='[href="'+Ct(e)+'"]';var i=n;switch(t){case"style":i=kl(e);break;case"script":i=Yl(e)}Ht.has(i)||(e=A({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Ht.set(i,e),l.querySelector(n)!==null||t==="style"&&l.querySelector(qn(i))||t==="script"&&l.querySelector(kn(i))||(t=l.createElement("link"),nt(t,"link",e),Pe(t),l.head.appendChild(t)))}}function f0(e,t){da.m(e,t);var a=ql;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+Ct(l)+'"][href="'+Ct(e)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Yl(e)}if(!Ht.has(i)&&(e=A({rel:"modulepreload",href:e},t),Ht.set(i,e),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(kn(i)))return}l=a.createElement("link"),nt(l,"link",e),Pe(l),a.head.appendChild(l)}}}function d0(e,t,a){da.S(e,t,a);var l=ql;if(l&&e){var n=cl(l).hoistableStyles,i=kl(e);t=t||"default";var u=n.get(i);if(!u){var d={loading:0,preload:null};if(u=l.querySelector(qn(i)))d.loading=5;else{e=A({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Ht.get(i))&&Rc(e,a);var y=u=l.createElement("link");Pe(y),nt(y,"link",e),y._p=new Promise(function(T,B){y.onload=T,y.onerror=B}),y.addEventListener("load",function(){d.loading|=1}),y.addEventListener("error",function(){d.loading|=2}),d.loading|=4,is(u,t,l)}u={type:"stylesheet",instance:u,count:1,state:d},n.set(i,u)}}}function m0(e,t){da.X(e,t);var a=ql;if(a&&e){var l=cl(a).hoistableScripts,n=Yl(e),i=l.get(n);i||(i=a.querySelector(kn(n)),i||(e=A({src:e,async:!0},t),(t=Ht.get(n))&&Uc(e,t),i=a.createElement("script"),Pe(i),nt(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function h0(e,t){da.M(e,t);var a=ql;if(a&&e){var l=cl(a).hoistableScripts,n=Yl(e),i=l.get(n);i||(i=a.querySelector(kn(n)),i||(e=A({src:e,async:!0,type:"module"},t),(t=Ht.get(n))&&Uc(e,t),i=a.createElement("script"),Pe(i),nt(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Gd(e,t,a,l){var n=(n=F.current)?ns(n):null;if(!n)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=kl(a.href),a=cl(n).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=kl(a.href);var i=cl(n).hoistableStyles,u=i.get(e);if(u||(n=n.ownerDocument||n,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,u),(i=n.querySelector(qn(e)))&&!i._p&&(u.instance=i,u.state.loading=5),Ht.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ht.set(e,a),i||p0(n,e,a,u.state))),t&&l===null)throw Error(o(528,""));return u}if(t&&l!==null)throw Error(o(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Yl(a),a=cl(n).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function kl(e){return'href="'+Ct(e)+'"'}function qn(e){return'link[rel="stylesheet"]['+e+"]"}function Xd(e){return A({},e,{"data-precedence":e.precedence,precedence:null})}function p0(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),nt(t,"link",a),Pe(t),e.head.appendChild(t))}function Yl(e){return'[src="'+Ct(e)+'"]'}function kn(e){return"script[async]"+e}function Qd(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+Ct(a.href)+'"]');if(l)return t.instance=l,Pe(l),l;var n=A({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),Pe(l),nt(l,"style",n),is(l,a.precedence,e),t.instance=l;case"stylesheet":n=kl(a.href);var i=e.querySelector(qn(n));if(i)return t.state.loading|=4,t.instance=i,Pe(i),i;l=Xd(a),(n=Ht.get(n))&&Rc(l,n),i=(e.ownerDocument||e).createElement("link"),Pe(i);var u=i;return u._p=new Promise(function(d,y){u.onload=d,u.onerror=y}),nt(i,"link",l),t.state.loading|=4,is(i,a.precedence,e),t.instance=i;case"script":return i=Yl(a.src),(n=e.querySelector(kn(i)))?(t.instance=n,Pe(n),n):(l=a,(n=Ht.get(i))&&(l=A({},a),Uc(l,n)),e=e.ownerDocument||e,n=e.createElement("script"),Pe(n),nt(n,"link",l),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,is(l,a.precedence,e));return t.instance}function is(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,u=0;u<l.length;u++){var d=l[u];if(d.dataset.precedence===t)i=d;else if(i!==n)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Rc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Uc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ss=null;function Zd(e,t,a){if(ss===null){var l=new Map,n=ss=new Map;n.set(a,l)}else n=ss,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var i=a[n];if(!(i[tn]||i[et]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var u=i.getAttribute(t)||"";u=e+u;var d=l.get(u);d?d.push(i):l.set(u,[i])}}return l}function Vd(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function g0(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Kd(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function b0(e,t,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=kl(l.href),i=t.querySelector(qn(n));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=us.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=i,Pe(i);return}i=t.ownerDocument||t,l=Xd(l),(n=Ht.get(n))&&Rc(l,n),i=i.createElement("link"),Pe(i);var u=i;u._p=new Promise(function(d,y){u.onload=d,u.onerror=y}),nt(i,"link",l),a.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=us.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Dc=0;function y0(e,t){return e.stylesheets&&e.count===0&&os(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var l=setTimeout(function(){if(e.stylesheets&&os(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&Dc===0&&(Dc=62500*Pp());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&os(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>Dc?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function us(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)os(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var cs=null;function os(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,cs=new Map,t.forEach(v0,e),cs=null,us.call(e))}function v0(e,t){if(!(t.state.loading&4)){var a=cs.get(e);if(a)var l=a.get(null);else{a=new Map,cs.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var u=n[i];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(a.set(u.dataset.precedence,u),l=u)}l&&a.set(null,l)}n=t.instance,u=n.getAttribute("data-precedence"),i=a.get(u)||l,i===l&&a.set(null,n),a.set(u,n),this.count++,l=us.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var Yn={$$typeof:W,Provider:null,Consumer:null,_currentValue:Q,_currentValue2:Q,_threadCount:0};function x0(e,t,a,l,n,i,u,d,y){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Cs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cs(0),this.hiddenUpdates=Cs(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=y,this.incompleteTransitions=new Map}function Jd(e,t,a,l,n,i,u,d,y,T,B,L){return e=new x0(e,t,a,u,y,T,B,L,d),t=1,i===!0&&(t|=24),i=St(3,null,null,t),e.current=i,i.stateNode=e,t=mu(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:t},bu(i),e}function $d(e){return e?(e=yl,e):yl}function Fd(e,t,a,l,n,i){n=$d(n),l.context===null?l.context=n:l.pendingContext=n,l=Sa(t),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=Na(e,l,t),a!==null&&(ht(a,e,t),vn(a,e,t))}function Wd(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Mc(e,t){Wd(e,t),(e=e.alternate)&&Wd(e,t)}function Pd(e){if(e.tag===13||e.tag===31){var t=Xa(e,67108864);t!==null&&ht(t,e,67108864),Mc(e,67108864)}}function Id(e){if(e.tag===13||e.tag===31){var t=Tt();t=ws(t);var a=Xa(e,t);a!==null&&ht(a,e,t),Mc(e,t)}}var rs=!0;function S0(e,t,a,l){var n=O.T;O.T=null;var i=M.p;try{M.p=2,Bc(e,t,a,l)}finally{M.p=i,O.T=n}}function N0(e,t,a,l){var n=O.T;O.T=null;var i=M.p;try{M.p=8,Bc(e,t,a,l)}finally{M.p=i,O.T=n}}function Bc(e,t,a,l){if(rs){var n=Hc(l);if(n===null)Nc(e,t,l,fs,a),tm(e,l);else if(j0(n,e,t,a,l))l.stopPropagation();else if(tm(e,l),t&4&&-1<E0.indexOf(e)){for(;n!==null;){var i=ul(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var u=La(i.pendingLanes);if(u!==0){var d=i;for(d.pendingLanes|=2,d.entangledLanes|=2;u;){var y=1<<31-vt(u);d.entanglements[1]|=y,u&=~y}Vt(i),(je&6)===0&&(Ki=Fe()+500,Mn(0))}}break;case 31:case 13:d=Xa(i,2),d!==null&&ht(d,i,2),$i(),Mc(i,2)}if(i=Hc(l),i===null&&Nc(e,t,l,fs,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else Nc(e,t,l,null,a)}}function Hc(e){return e=qs(e),Lc(e)}var fs=null;function Lc(e){if(fs=null,e=sl(e),e!==null){var t=b(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=p(t),e!==null)return e;e=null}else if(a===31){if(e=N(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fs=e,null}function em(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Wl()){case so:return 2;case uo:return 8;case ei:case oh:return 32;case co:return 268435456;default:return 32}default:return 32}}var qc=!1,Ua=null,Da=null,Ma=null,Gn=new Map,Xn=new Map,Ba=[],E0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function tm(e,t){switch(e){case"focusin":case"focusout":Ua=null;break;case"dragenter":case"dragleave":Da=null;break;case"mouseover":case"mouseout":Ma=null;break;case"pointerover":case"pointerout":Gn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xn.delete(t.pointerId)}}function Qn(e,t,a,l,n,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},t!==null&&(t=ul(t),t!==null&&Pd(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function j0(e,t,a,l,n){switch(t){case"focusin":return Ua=Qn(Ua,e,t,a,l,n),!0;case"dragenter":return Da=Qn(Da,e,t,a,l,n),!0;case"mouseover":return Ma=Qn(Ma,e,t,a,l,n),!0;case"pointerover":var i=n.pointerId;return Gn.set(i,Qn(Gn.get(i)||null,e,t,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,Xn.set(i,Qn(Xn.get(i)||null,e,t,a,l,n)),!0}return!1}function am(e){var t=sl(e.target);if(t!==null){var a=b(t);if(a!==null){if(t=a.tag,t===13){if(t=p(a),t!==null){e.blockedOn=t,po(e.priority,function(){Id(a)});return}}else if(t===31){if(t=N(a),t!==null){e.blockedOn=t,po(e.priority,function(){Id(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ds(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Hc(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);Ls=l,a.target.dispatchEvent(l),Ls=null}else return t=ul(a),t!==null&&Pd(t),e.blockedOn=a,!1;t.shift()}return!0}function lm(e,t,a){ds(e)&&a.delete(t)}function A0(){qc=!1,Ua!==null&&ds(Ua)&&(Ua=null),Da!==null&&ds(Da)&&(Da=null),Ma!==null&&ds(Ma)&&(Ma=null),Gn.forEach(lm),Xn.forEach(lm)}function ms(e,t){e.blockedOn===t&&(e.blockedOn=null,qc||(qc=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,A0)))}var hs=null;function nm(e){hs!==e&&(hs=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){hs===e&&(hs=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],n=e[t+2];if(typeof l!="function"){if(Lc(l||a)===null)continue;break}var i=ul(a);i!==null&&(e.splice(t,3),t-=3,Hu(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Gl(e){function t(y){return ms(y,e)}Ua!==null&&ms(Ua,e),Da!==null&&ms(Da,e),Ma!==null&&ms(Ma,e),Gn.forEach(t),Xn.forEach(t);for(var a=0;a<Ba.length;a++){var l=Ba[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Ba.length&&(a=Ba[0],a.blockedOn===null);)am(a),a.blockedOn===null&&Ba.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],u=n[ct]||null;if(typeof i=="function")u||nm(a);else if(u){var d=null;if(i&&i.hasAttribute("formAction")){if(n=i,u=i[ct]||null)d=u.formAction;else if(Lc(n)!==null)continue}else d=u.action;typeof d=="function"?a[l+1]=d:(a.splice(l,3),l-=3),nm(a)}}}function im(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(u){return n=u})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function kc(e){this._internalRoot=e}ps.prototype.render=kc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var a=t.current,l=Tt();Fd(a,l,e,t,null,null)},ps.prototype.unmount=kc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Fd(e.current,2,null,e,null,null),$i(),t[il]=null}};function ps(e){this._internalRoot=e}ps.prototype.unstable_scheduleHydration=function(e){if(e){var t=ho();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Ba.length&&t!==0&&t<Ba[a].priority;a++);Ba.splice(a,0,e),a===0&&am(e)}};var sm=c.version;if(sm!=="19.2.0")throw Error(o(527,sm,"19.2.0"));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=h(t),e=e!==null?S(e):null,e=e===null?null:e.stateNode,e};var T0={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gs.isDisabled&&gs.supportsFiber)try{Pl=gs.inject(T0),yt=gs}catch{}}return Vn.createRoot=function(e,t){if(!m(e))throw Error(o(299));var a=!1,l="",n=mf,i=hf,u=pf;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError)),t=Jd(e,1,!1,null,null,a,l,null,n,i,u,im),e[il]=t.current,Sc(e),new kc(t)},Vn.hydrateRoot=function(e,t,a){if(!m(e))throw Error(o(299));var l=!1,n="",i=mf,u=hf,d=pf,y=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(u=a.onCaughtError),a.onRecoverableError!==void 0&&(d=a.onRecoverableError),a.formState!==void 0&&(y=a.formState)),t=Jd(e,1,!0,t,a??null,l,n,y,i,u,d,im),t.context=$d(null),a=t.current,l=Tt(),l=ws(l),n=Sa(l),n.callback=null,Na(a,n,l),a=l,t.current.lanes=a,en(t,a),Vt(t),e[il]=t.current,Sc(e),new ps(t)},Vn.version="19.2.0",Vn}var bm;function H0(){if(bm)return Xc.exports;bm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(c){console.error(c)}}return s(),Xc.exports=B0(),Xc.exports}var L0=H0();function Mm(s,c){return function(){return s.apply(c,arguments)}}const{toString:q0}=Object.prototype,{getPrototypeOf:ao}=Object,{iterator:Es,toStringTag:Bm}=Symbol,js=(s=>c=>{const f=q0.call(c);return s[f]||(s[f]=f.slice(8,-1).toLowerCase())})(Object.create(null)),Gt=s=>(s=s.toLowerCase(),c=>js(c)===s),As=s=>c=>typeof c===s,{isArray:Zl}=Array,Ql=As("undefined");function Jn(s){return s!==null&&!Ql(s)&&s.constructor!==null&&!Ql(s.constructor)&&pt(s.constructor.isBuffer)&&s.constructor.isBuffer(s)}const Hm=Gt("ArrayBuffer");function k0(s){let c;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?c=ArrayBuffer.isView(s):c=s&&s.buffer&&Hm(s.buffer),c}const Y0=As("string"),pt=As("function"),Lm=As("number"),$n=s=>s!==null&&typeof s=="object",G0=s=>s===!0||s===!1,ys=s=>{if(js(s)!=="object")return!1;const c=ao(s);return(c===null||c===Object.prototype||Object.getPrototypeOf(c)===null)&&!(Bm in s)&&!(Es in s)},X0=s=>{if(!$n(s)||Jn(s))return!1;try{return Object.keys(s).length===0&&Object.getPrototypeOf(s)===Object.prototype}catch{return!1}},Q0=Gt("Date"),Z0=Gt("File"),V0=Gt("Blob"),K0=Gt("FileList"),J0=s=>$n(s)&&pt(s.pipe),$0=s=>{let c;return s&&(typeof FormData=="function"&&s instanceof FormData||pt(s.append)&&((c=js(s))==="formdata"||c==="object"&&pt(s.toString)&&s.toString()==="[object FormData]"))},F0=Gt("URLSearchParams"),[W0,P0,I0,eg]=["ReadableStream","Request","Response","Headers"].map(Gt),tg=s=>s.trim?s.trim():s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Fn(s,c,{allOwnKeys:f=!1}={}){if(s===null||typeof s>"u")return;let o,m;if(typeof s!="object"&&(s=[s]),Zl(s))for(o=0,m=s.length;o<m;o++)c.call(null,s[o],o,s);else{if(Jn(s))return;const b=f?Object.getOwnPropertyNames(s):Object.keys(s),p=b.length;let N;for(o=0;o<p;o++)N=b[o],c.call(null,s[N],N,s)}}function qm(s,c){if(Jn(s))return null;c=c.toLowerCase();const f=Object.keys(s);let o=f.length,m;for(;o-- >0;)if(m=f[o],c===m.toLowerCase())return m;return null}const al=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,km=s=>!Ql(s)&&s!==al;function Fc(){const{caseless:s,skipUndefined:c}=km(this)&&this||{},f={},o=(m,b)=>{const p=s&&qm(f,b)||b;ys(f[p])&&ys(m)?f[p]=Fc(f[p],m):ys(m)?f[p]=Fc({},m):Zl(m)?f[p]=m.slice():(!c||!Ql(m))&&(f[p]=m)};for(let m=0,b=arguments.length;m<b;m++)arguments[m]&&Fn(arguments[m],o);return f}const ag=(s,c,f,{allOwnKeys:o}={})=>(Fn(c,(m,b)=>{f&&pt(m)?s[b]=Mm(m,f):s[b]=m},{allOwnKeys:o}),s),lg=s=>(s.charCodeAt(0)===65279&&(s=s.slice(1)),s),ng=(s,c,f,o)=>{s.prototype=Object.create(c.prototype,o),s.prototype.constructor=s,Object.defineProperty(s,"super",{value:c.prototype}),f&&Object.assign(s.prototype,f)},ig=(s,c,f,o)=>{let m,b,p;const N={};if(c=c||{},s==null)return c;do{for(m=Object.getOwnPropertyNames(s),b=m.length;b-- >0;)p=m[b],(!o||o(p,s,c))&&!N[p]&&(c[p]=s[p],N[p]=!0);s=f!==!1&&ao(s)}while(s&&(!f||f(s,c))&&s!==Object.prototype);return c},sg=(s,c,f)=>{s=String(s),(f===void 0||f>s.length)&&(f=s.length),f-=c.length;const o=s.indexOf(c,f);return o!==-1&&o===f},ug=s=>{if(!s)return null;if(Zl(s))return s;let c=s.length;if(!Lm(c))return null;const f=new Array(c);for(;c-- >0;)f[c]=s[c];return f},cg=(s=>c=>s&&c instanceof s)(typeof Uint8Array<"u"&&ao(Uint8Array)),og=(s,c)=>{const o=(s&&s[Es]).call(s);let m;for(;(m=o.next())&&!m.done;){const b=m.value;c.call(s,b[0],b[1])}},rg=(s,c)=>{let f;const o=[];for(;(f=s.exec(c))!==null;)o.push(f);return o},fg=Gt("HTMLFormElement"),dg=s=>s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(f,o,m){return o.toUpperCase()+m}),ym=(({hasOwnProperty:s})=>(c,f)=>s.call(c,f))(Object.prototype),mg=Gt("RegExp"),Ym=(s,c)=>{const f=Object.getOwnPropertyDescriptors(s),o={};Fn(f,(m,b)=>{let p;(p=c(m,b,s))!==!1&&(o[b]=p||m)}),Object.defineProperties(s,o)},hg=s=>{Ym(s,(c,f)=>{if(pt(s)&&["arguments","caller","callee"].indexOf(f)!==-1)return!1;const o=s[f];if(pt(o)){if(c.enumerable=!1,"writable"in c){c.writable=!1;return}c.set||(c.set=()=>{throw Error("Can not rewrite read-only method '"+f+"'")})}})},pg=(s,c)=>{const f={},o=m=>{m.forEach(b=>{f[b]=!0})};return Zl(s)?o(s):o(String(s).split(c)),f},gg=()=>{},bg=(s,c)=>s!=null&&Number.isFinite(s=+s)?s:c;function yg(s){return!!(s&&pt(s.append)&&s[Bm]==="FormData"&&s[Es])}const vg=s=>{const c=new Array(10),f=(o,m)=>{if($n(o)){if(c.indexOf(o)>=0)return;if(Jn(o))return o;if(!("toJSON"in o)){c[m]=o;const b=Zl(o)?[]:{};return Fn(o,(p,N)=>{const j=f(p,m+1);!Ql(j)&&(b[N]=j)}),c[m]=void 0,b}}return o};return f(s,0)},xg=Gt("AsyncFunction"),Sg=s=>s&&($n(s)||pt(s))&&pt(s.then)&&pt(s.catch),Gm=((s,c)=>s?setImmediate:c?((f,o)=>(al.addEventListener("message",({source:m,data:b})=>{m===al&&b===f&&o.length&&o.shift()()},!1),m=>{o.push(m),al.postMessage(f,"*")}))(`axios@${Math.random()}`,[]):f=>setTimeout(f))(typeof setImmediate=="function",pt(al.postMessage)),Ng=typeof queueMicrotask<"u"?queueMicrotask.bind(al):typeof process<"u"&&process.nextTick||Gm,Eg=s=>s!=null&&pt(s[Es]),C={isArray:Zl,isArrayBuffer:Hm,isBuffer:Jn,isFormData:$0,isArrayBufferView:k0,isString:Y0,isNumber:Lm,isBoolean:G0,isObject:$n,isPlainObject:ys,isEmptyObject:X0,isReadableStream:W0,isRequest:P0,isResponse:I0,isHeaders:eg,isUndefined:Ql,isDate:Q0,isFile:Z0,isBlob:V0,isRegExp:mg,isFunction:pt,isStream:J0,isURLSearchParams:F0,isTypedArray:cg,isFileList:K0,forEach:Fn,merge:Fc,extend:ag,trim:tg,stripBOM:lg,inherits:ng,toFlatObject:ig,kindOf:js,kindOfTest:Gt,endsWith:sg,toArray:ug,forEachEntry:og,matchAll:rg,isHTMLForm:fg,hasOwnProperty:ym,hasOwnProp:ym,reduceDescriptors:Ym,freezeMethods:hg,toObjectSet:pg,toCamelCase:dg,noop:gg,toFiniteNumber:bg,findKey:qm,global:al,isContextDefined:km,isSpecCompliantForm:yg,toJSONObject:vg,isAsyncFn:xg,isThenable:Sg,setImmediate:Gm,asap:Ng,isIterable:Eg};function pe(s,c,f,o,m){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=s,this.name="AxiosError",c&&(this.code=c),f&&(this.config=f),o&&(this.request=o),m&&(this.response=m,this.status=m.status?m.status:null)}C.inherits(pe,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:C.toJSONObject(this.config),code:this.code,status:this.status}}});const Xm=pe.prototype,Qm={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(s=>{Qm[s]={value:s}});Object.defineProperties(pe,Qm);Object.defineProperty(Xm,"isAxiosError",{value:!0});pe.from=(s,c,f,o,m,b)=>{const p=Object.create(Xm);C.toFlatObject(s,p,function(S){return S!==Error.prototype},h=>h!=="isAxiosError");const N=s&&s.message?s.message:"Error",j=c==null&&s?s.code:c;return pe.call(p,N,j,f,o,m),s&&p.cause==null&&Object.defineProperty(p,"cause",{value:s,configurable:!0}),p.name=s&&s.name||"Error",b&&Object.assign(p,b),p};const jg=null;function Wc(s){return C.isPlainObject(s)||C.isArray(s)}function Zm(s){return C.endsWith(s,"[]")?s.slice(0,-2):s}function vm(s,c,f){return s?s.concat(c).map(function(m,b){return m=Zm(m),!f&&b?"["+m+"]":m}).join(f?".":""):c}function Ag(s){return C.isArray(s)&&!s.some(Wc)}const Tg=C.toFlatObject(C,{},null,function(c){return/^is[A-Z]/.test(c)});function Ts(s,c,f){if(!C.isObject(s))throw new TypeError("target must be an object");c=c||new FormData,f=C.toFlatObject(f,{metaTokens:!0,dots:!1,indexes:!1},!1,function(R,D){return!C.isUndefined(D[R])});const o=f.metaTokens,m=f.visitor||S,b=f.dots,p=f.indexes,j=(f.Blob||typeof Blob<"u"&&Blob)&&C.isSpecCompliantForm(c);if(!C.isFunction(m))throw new TypeError("visitor must be a function");function h(z){if(z===null)return"";if(C.isDate(z))return z.toISOString();if(C.isBoolean(z))return z.toString();if(!j&&C.isBlob(z))throw new pe("Blob is not supported. Use a Buffer instead.");return C.isArrayBuffer(z)||C.isTypedArray(z)?j&&typeof Blob=="function"?new Blob([z]):Buffer.from(z):z}function S(z,R,D){let V=z;if(z&&!D&&typeof z=="object"){if(C.endsWith(R,"{}"))R=o?R:R.slice(0,-2),z=JSON.stringify(z);else if(C.isArray(z)&&Ag(z)||(C.isFileList(z)||C.endsWith(R,"[]"))&&(V=C.toArray(z)))return R=Zm(R),V.forEach(function(W,ae){!(C.isUndefined(W)||W===null)&&c.append(p===!0?vm([R],ae,b):p===null?R:R+"[]",h(W))}),!1}return Wc(z)?!0:(c.append(vm(D,R,b),h(z)),!1)}const A=[],G=Object.assign(Tg,{defaultVisitor:S,convertValue:h,isVisitable:Wc});function I(z,R){if(!C.isUndefined(z)){if(A.indexOf(z)!==-1)throw Error("Circular reference detected in "+R.join("."));A.push(z),C.forEach(z,function(V,Z){(!(C.isUndefined(V)||V===null)&&m.call(c,V,C.isString(Z)?Z.trim():Z,R,G))===!0&&I(V,R?R.concat(Z):[Z])}),A.pop()}}if(!C.isObject(s))throw new TypeError("data must be an object");return I(s),c}function xm(s){const c={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g,function(o){return c[o]})}function lo(s,c){this._pairs=[],s&&Ts(s,this,c)}const Vm=lo.prototype;Vm.append=function(c,f){this._pairs.push([c,f])};Vm.toString=function(c){const f=c?function(o){return c.call(this,o,xm)}:xm;return this._pairs.map(function(m){return f(m[0])+"="+f(m[1])},"").join("&")};function _g(s){return encodeURIComponent(s).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Km(s,c,f){if(!c)return s;const o=f&&f.encode||_g;C.isFunction(f)&&(f={serialize:f});const m=f&&f.serialize;let b;if(m?b=m(c,f):b=C.isURLSearchParams(c)?c.toString():new lo(c,f).toString(o),b){const p=s.indexOf("#");p!==-1&&(s=s.slice(0,p)),s+=(s.indexOf("?")===-1?"?":"&")+b}return s}class Sm{constructor(){this.handlers=[]}use(c,f,o){return this.handlers.push({fulfilled:c,rejected:f,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(c){this.handlers[c]&&(this.handlers[c]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(c){C.forEach(this.handlers,function(o){o!==null&&c(o)})}}const Jm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},zg=typeof URLSearchParams<"u"?URLSearchParams:lo,Cg=typeof FormData<"u"?FormData:null,wg=typeof Blob<"u"?Blob:null,Og={isBrowser:!0,classes:{URLSearchParams:zg,FormData:Cg,Blob:wg},protocols:["http","https","file","blob","url","data"]},no=typeof window<"u"&&typeof document<"u",Pc=typeof navigator=="object"&&navigator||void 0,Rg=no&&(!Pc||["ReactNative","NativeScript","NS"].indexOf(Pc.product)<0),Ug=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Dg=no&&window.location.href||"http://localhost",Mg=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:no,hasStandardBrowserEnv:Rg,hasStandardBrowserWebWorkerEnv:Ug,navigator:Pc,origin:Dg},Symbol.toStringTag,{value:"Module"})),st={...Mg,...Og};function Bg(s,c){return Ts(s,new st.classes.URLSearchParams,{visitor:function(f,o,m,b){return st.isNode&&C.isBuffer(f)?(this.append(o,f.toString("base64")),!1):b.defaultVisitor.apply(this,arguments)},...c})}function Hg(s){return C.matchAll(/\w+|\[(\w*)]/g,s).map(c=>c[0]==="[]"?"":c[1]||c[0])}function Lg(s){const c={},f=Object.keys(s);let o;const m=f.length;let b;for(o=0;o<m;o++)b=f[o],c[b]=s[b];return c}function $m(s){function c(f,o,m,b){let p=f[b++];if(p==="__proto__")return!0;const N=Number.isFinite(+p),j=b>=f.length;return p=!p&&C.isArray(m)?m.length:p,j?(C.hasOwnProp(m,p)?m[p]=[m[p],o]:m[p]=o,!N):((!m[p]||!C.isObject(m[p]))&&(m[p]=[]),c(f,o,m[p],b)&&C.isArray(m[p])&&(m[p]=Lg(m[p])),!N)}if(C.isFormData(s)&&C.isFunction(s.entries)){const f={};return C.forEachEntry(s,(o,m)=>{c(Hg(o),m,f,0)}),f}return null}function qg(s,c,f){if(C.isString(s))try{return(c||JSON.parse)(s),C.trim(s)}catch(o){if(o.name!=="SyntaxError")throw o}return(f||JSON.stringify)(s)}const Wn={transitional:Jm,adapter:["xhr","http","fetch"],transformRequest:[function(c,f){const o=f.getContentType()||"",m=o.indexOf("application/json")>-1,b=C.isObject(c);if(b&&C.isHTMLForm(c)&&(c=new FormData(c)),C.isFormData(c))return m?JSON.stringify($m(c)):c;if(C.isArrayBuffer(c)||C.isBuffer(c)||C.isStream(c)||C.isFile(c)||C.isBlob(c)||C.isReadableStream(c))return c;if(C.isArrayBufferView(c))return c.buffer;if(C.isURLSearchParams(c))return f.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),c.toString();let N;if(b){if(o.indexOf("application/x-www-form-urlencoded")>-1)return Bg(c,this.formSerializer).toString();if((N=C.isFileList(c))||o.indexOf("multipart/form-data")>-1){const j=this.env&&this.env.FormData;return Ts(N?{"files[]":c}:c,j&&new j,this.formSerializer)}}return b||m?(f.setContentType("application/json",!1),qg(c)):c}],transformResponse:[function(c){const f=this.transitional||Wn.transitional,o=f&&f.forcedJSONParsing,m=this.responseType==="json";if(C.isResponse(c)||C.isReadableStream(c))return c;if(c&&C.isString(c)&&(o&&!this.responseType||m)){const p=!(f&&f.silentJSONParsing)&&m;try{return JSON.parse(c,this.parseReviver)}catch(N){if(p)throw N.name==="SyntaxError"?pe.from(N,pe.ERR_BAD_RESPONSE,this,null,this.response):N}}return c}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:st.classes.FormData,Blob:st.classes.Blob},validateStatus:function(c){return c>=200&&c<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};C.forEach(["delete","get","head","post","put","patch"],s=>{Wn.headers[s]={}});const kg=C.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Yg=s=>{const c={};let f,o,m;return s&&s.split(`
`).forEach(function(p){m=p.indexOf(":"),f=p.substring(0,m).trim().toLowerCase(),o=p.substring(m+1).trim(),!(!f||c[f]&&kg[f])&&(f==="set-cookie"?c[f]?c[f].push(o):c[f]=[o]:c[f]=c[f]?c[f]+", "+o:o)}),c},Nm=Symbol("internals");function Kn(s){return s&&String(s).trim().toLowerCase()}function vs(s){return s===!1||s==null?s:C.isArray(s)?s.map(vs):String(s)}function Gg(s){const c=Object.create(null),f=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=f.exec(s);)c[o[1]]=o[2];return c}const Xg=s=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());function Kc(s,c,f,o,m){if(C.isFunction(o))return o.call(this,c,f);if(m&&(c=f),!!C.isString(c)){if(C.isString(o))return c.indexOf(o)!==-1;if(C.isRegExp(o))return o.test(c)}}function Qg(s){return s.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(c,f,o)=>f.toUpperCase()+o)}function Zg(s,c){const f=C.toCamelCase(" "+c);["get","set","has"].forEach(o=>{Object.defineProperty(s,o+f,{value:function(m,b,p){return this[o].call(this,c,m,b,p)},configurable:!0})})}let gt=class{constructor(c){c&&this.set(c)}set(c,f,o){const m=this;function b(N,j,h){const S=Kn(j);if(!S)throw new Error("header name must be a non-empty string");const A=C.findKey(m,S);(!A||m[A]===void 0||h===!0||h===void 0&&m[A]!==!1)&&(m[A||j]=vs(N))}const p=(N,j)=>C.forEach(N,(h,S)=>b(h,S,j));if(C.isPlainObject(c)||c instanceof this.constructor)p(c,f);else if(C.isString(c)&&(c=c.trim())&&!Xg(c))p(Yg(c),f);else if(C.isObject(c)&&C.isIterable(c)){let N={},j,h;for(const S of c){if(!C.isArray(S))throw TypeError("Object iterator must return a key-value pair");N[h=S[0]]=(j=N[h])?C.isArray(j)?[...j,S[1]]:[j,S[1]]:S[1]}p(N,f)}else c!=null&&b(f,c,o);return this}get(c,f){if(c=Kn(c),c){const o=C.findKey(this,c);if(o){const m=this[o];if(!f)return m;if(f===!0)return Gg(m);if(C.isFunction(f))return f.call(this,m,o);if(C.isRegExp(f))return f.exec(m);throw new TypeError("parser must be boolean|regexp|function")}}}has(c,f){if(c=Kn(c),c){const o=C.findKey(this,c);return!!(o&&this[o]!==void 0&&(!f||Kc(this,this[o],o,f)))}return!1}delete(c,f){const o=this;let m=!1;function b(p){if(p=Kn(p),p){const N=C.findKey(o,p);N&&(!f||Kc(o,o[N],N,f))&&(delete o[N],m=!0)}}return C.isArray(c)?c.forEach(b):b(c),m}clear(c){const f=Object.keys(this);let o=f.length,m=!1;for(;o--;){const b=f[o];(!c||Kc(this,this[b],b,c,!0))&&(delete this[b],m=!0)}return m}normalize(c){const f=this,o={};return C.forEach(this,(m,b)=>{const p=C.findKey(o,b);if(p){f[p]=vs(m),delete f[b];return}const N=c?Qg(b):String(b).trim();N!==b&&delete f[b],f[N]=vs(m),o[N]=!0}),this}concat(...c){return this.constructor.concat(this,...c)}toJSON(c){const f=Object.create(null);return C.forEach(this,(o,m)=>{o!=null&&o!==!1&&(f[m]=c&&C.isArray(o)?o.join(", "):o)}),f}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([c,f])=>c+": "+f).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(c){return c instanceof this?c:new this(c)}static concat(c,...f){const o=new this(c);return f.forEach(m=>o.set(m)),o}static accessor(c){const o=(this[Nm]=this[Nm]={accessors:{}}).accessors,m=this.prototype;function b(p){const N=Kn(p);o[N]||(Zg(m,p),o[N]=!0)}return C.isArray(c)?c.forEach(b):b(c),this}};gt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);C.reduceDescriptors(gt.prototype,({value:s},c)=>{let f=c[0].toUpperCase()+c.slice(1);return{get:()=>s,set(o){this[f]=o}}});C.freezeMethods(gt);function Jc(s,c){const f=this||Wn,o=c||f,m=gt.from(o.headers);let b=o.data;return C.forEach(s,function(N){b=N.call(f,b,m.normalize(),c?c.status:void 0)}),m.normalize(),b}function Fm(s){return!!(s&&s.__CANCEL__)}function Vl(s,c,f){pe.call(this,s??"canceled",pe.ERR_CANCELED,c,f),this.name="CanceledError"}C.inherits(Vl,pe,{__CANCEL__:!0});function Wm(s,c,f){const o=f.config.validateStatus;!f.status||!o||o(f.status)?s(f):c(new pe("Request failed with status code "+f.status,[pe.ERR_BAD_REQUEST,pe.ERR_BAD_RESPONSE][Math.floor(f.status/100)-4],f.config,f.request,f))}function Vg(s){const c=/^([-+\w]{1,25})(:?\/\/|:)/.exec(s);return c&&c[1]||""}function Kg(s,c){s=s||10;const f=new Array(s),o=new Array(s);let m=0,b=0,p;return c=c!==void 0?c:1e3,function(j){const h=Date.now(),S=o[b];p||(p=h),f[m]=j,o[m]=h;let A=b,G=0;for(;A!==m;)G+=f[A++],A=A%s;if(m=(m+1)%s,m===b&&(b=(b+1)%s),h-p<c)return;const I=S&&h-S;return I?Math.round(G*1e3/I):void 0}}function Jg(s,c){let f=0,o=1e3/c,m,b;const p=(h,S=Date.now())=>{f=S,m=null,b&&(clearTimeout(b),b=null),s(...h)};return[(...h)=>{const S=Date.now(),A=S-f;A>=o?p(h,S):(m=h,b||(b=setTimeout(()=>{b=null,p(m)},o-A)))},()=>m&&p(m)]}const Ss=(s,c,f=3)=>{let o=0;const m=Kg(50,250);return Jg(b=>{const p=b.loaded,N=b.lengthComputable?b.total:void 0,j=p-o,h=m(j),S=p<=N;o=p;const A={loaded:p,total:N,progress:N?p/N:void 0,bytes:j,rate:h||void 0,estimated:h&&N&&S?(N-p)/h:void 0,event:b,lengthComputable:N!=null,[c?"download":"upload"]:!0};s(A)},f)},Em=(s,c)=>{const f=s!=null;return[o=>c[0]({lengthComputable:f,total:s,loaded:o}),c[1]]},jm=s=>(...c)=>C.asap(()=>s(...c)),$g=st.hasStandardBrowserEnv?((s,c)=>f=>(f=new URL(f,st.origin),s.protocol===f.protocol&&s.host===f.host&&(c||s.port===f.port)))(new URL(st.origin),st.navigator&&/(msie|trident)/i.test(st.navigator.userAgent)):()=>!0,Fg=st.hasStandardBrowserEnv?{write(s,c,f,o,m,b){const p=[s+"="+encodeURIComponent(c)];C.isNumber(f)&&p.push("expires="+new Date(f).toGMTString()),C.isString(o)&&p.push("path="+o),C.isString(m)&&p.push("domain="+m),b===!0&&p.push("secure"),document.cookie=p.join("; ")},read(s){const c=document.cookie.match(new RegExp("(^|;\\s*)("+s+")=([^;]*)"));return c?decodeURIComponent(c[3]):null},remove(s){this.write(s,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Wg(s){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(s)}function Pg(s,c){return c?s.replace(/\/?\/$/,"")+"/"+c.replace(/^\/+/,""):s}function Pm(s,c,f){let o=!Wg(c);return s&&(o||f==!1)?Pg(s,c):c}const Am=s=>s instanceof gt?{...s}:s;function nl(s,c){c=c||{};const f={};function o(h,S,A,G){return C.isPlainObject(h)&&C.isPlainObject(S)?C.merge.call({caseless:G},h,S):C.isPlainObject(S)?C.merge({},S):C.isArray(S)?S.slice():S}function m(h,S,A,G){if(C.isUndefined(S)){if(!C.isUndefined(h))return o(void 0,h,A,G)}else return o(h,S,A,G)}function b(h,S){if(!C.isUndefined(S))return o(void 0,S)}function p(h,S){if(C.isUndefined(S)){if(!C.isUndefined(h))return o(void 0,h)}else return o(void 0,S)}function N(h,S,A){if(A in c)return o(h,S);if(A in s)return o(void 0,h)}const j={url:b,method:b,data:b,baseURL:p,transformRequest:p,transformResponse:p,paramsSerializer:p,timeout:p,timeoutMessage:p,withCredentials:p,withXSRFToken:p,adapter:p,responseType:p,xsrfCookieName:p,xsrfHeaderName:p,onUploadProgress:p,onDownloadProgress:p,decompress:p,maxContentLength:p,maxBodyLength:p,beforeRedirect:p,transport:p,httpAgent:p,httpsAgent:p,cancelToken:p,socketPath:p,responseEncoding:p,validateStatus:N,headers:(h,S,A)=>m(Am(h),Am(S),A,!0)};return C.forEach(Object.keys({...s,...c}),function(S){const A=j[S]||m,G=A(s[S],c[S],S);C.isUndefined(G)&&A!==N||(f[S]=G)}),f}const Im=s=>{const c=nl({},s);let{data:f,withXSRFToken:o,xsrfHeaderName:m,xsrfCookieName:b,headers:p,auth:N}=c;if(c.headers=p=gt.from(p),c.url=Km(Pm(c.baseURL,c.url,c.allowAbsoluteUrls),s.params,s.paramsSerializer),N&&p.set("Authorization","Basic "+btoa((N.username||"")+":"+(N.password?unescape(encodeURIComponent(N.password)):""))),C.isFormData(f)){if(st.hasStandardBrowserEnv||st.hasStandardBrowserWebWorkerEnv)p.setContentType(void 0);else if(C.isFunction(f.getHeaders)){const j=f.getHeaders(),h=["content-type","content-length"];Object.entries(j).forEach(([S,A])=>{h.includes(S.toLowerCase())&&p.set(S,A)})}}if(st.hasStandardBrowserEnv&&(o&&C.isFunction(o)&&(o=o(c)),o||o!==!1&&$g(c.url))){const j=m&&b&&Fg.read(b);j&&p.set(m,j)}return c},Ig=typeof XMLHttpRequest<"u",eb=Ig&&function(s){return new Promise(function(f,o){const m=Im(s);let b=m.data;const p=gt.from(m.headers).normalize();let{responseType:N,onUploadProgress:j,onDownloadProgress:h}=m,S,A,G,I,z;function R(){I&&I(),z&&z(),m.cancelToken&&m.cancelToken.unsubscribe(S),m.signal&&m.signal.removeEventListener("abort",S)}let D=new XMLHttpRequest;D.open(m.method.toUpperCase(),m.url,!0),D.timeout=m.timeout;function V(){if(!D)return;const W=gt.from("getAllResponseHeaders"in D&&D.getAllResponseHeaders()),ie={data:!N||N==="text"||N==="json"?D.responseText:D.response,status:D.status,statusText:D.statusText,headers:W,config:s,request:D};Wm(function(J){f(J),R()},function(J){o(J),R()},ie),D=null}"onloadend"in D?D.onloadend=V:D.onreadystatechange=function(){!D||D.readyState!==4||D.status===0&&!(D.responseURL&&D.responseURL.indexOf("file:")===0)||setTimeout(V)},D.onabort=function(){D&&(o(new pe("Request aborted",pe.ECONNABORTED,s,D)),D=null)},D.onerror=function(ae){const ie=ae&&ae.message?ae.message:"Network Error",ue=new pe(ie,pe.ERR_NETWORK,s,D);ue.event=ae||null,o(ue),D=null},D.ontimeout=function(){let ae=m.timeout?"timeout of "+m.timeout+"ms exceeded":"timeout exceeded";const ie=m.transitional||Jm;m.timeoutErrorMessage&&(ae=m.timeoutErrorMessage),o(new pe(ae,ie.clarifyTimeoutError?pe.ETIMEDOUT:pe.ECONNABORTED,s,D)),D=null},b===void 0&&p.setContentType(null),"setRequestHeader"in D&&C.forEach(p.toJSON(),function(ae,ie){D.setRequestHeader(ie,ae)}),C.isUndefined(m.withCredentials)||(D.withCredentials=!!m.withCredentials),N&&N!=="json"&&(D.responseType=m.responseType),h&&([G,z]=Ss(h,!0),D.addEventListener("progress",G)),j&&D.upload&&([A,I]=Ss(j),D.upload.addEventListener("progress",A),D.upload.addEventListener("loadend",I)),(m.cancelToken||m.signal)&&(S=W=>{D&&(o(!W||W.type?new Vl(null,s,D):W),D.abort(),D=null)},m.cancelToken&&m.cancelToken.subscribe(S),m.signal&&(m.signal.aborted?S():m.signal.addEventListener("abort",S)));const Z=Vg(m.url);if(Z&&st.protocols.indexOf(Z)===-1){o(new pe("Unsupported protocol "+Z+":",pe.ERR_BAD_REQUEST,s));return}D.send(b||null)})},tb=(s,c)=>{const{length:f}=s=s?s.filter(Boolean):[];if(c||f){let o=new AbortController,m;const b=function(h){if(!m){m=!0,N();const S=h instanceof Error?h:this.reason;o.abort(S instanceof pe?S:new Vl(S instanceof Error?S.message:S))}};let p=c&&setTimeout(()=>{p=null,b(new pe(`timeout ${c} of ms exceeded`,pe.ETIMEDOUT))},c);const N=()=>{s&&(p&&clearTimeout(p),p=null,s.forEach(h=>{h.unsubscribe?h.unsubscribe(b):h.removeEventListener("abort",b)}),s=null)};s.forEach(h=>h.addEventListener("abort",b));const{signal:j}=o;return j.unsubscribe=()=>C.asap(N),j}},ab=function*(s,c){let f=s.byteLength;if(f<c){yield s;return}let o=0,m;for(;o<f;)m=o+c,yield s.slice(o,m),o=m},lb=async function*(s,c){for await(const f of nb(s))yield*ab(f,c)},nb=async function*(s){if(s[Symbol.asyncIterator]){yield*s;return}const c=s.getReader();try{for(;;){const{done:f,value:o}=await c.read();if(f)break;yield o}}finally{await c.cancel()}},Tm=(s,c,f,o)=>{const m=lb(s,c);let b=0,p,N=j=>{p||(p=!0,o&&o(j))};return new ReadableStream({async pull(j){try{const{done:h,value:S}=await m.next();if(h){N(),j.close();return}let A=S.byteLength;if(f){let G=b+=A;f(G)}j.enqueue(new Uint8Array(S))}catch(h){throw N(h),h}},cancel(j){return N(j),m.return()}},{highWaterMark:2})},_m=64*1024,{isFunction:bs}=C,ib=(({Request:s,Response:c})=>({Request:s,Response:c}))(C.global),{ReadableStream:zm,TextEncoder:Cm}=C.global,wm=(s,...c)=>{try{return!!s(...c)}catch{return!1}},sb=s=>{s=C.merge.call({skipUndefined:!0},ib,s);const{fetch:c,Request:f,Response:o}=s,m=c?bs(c):typeof fetch=="function",b=bs(f),p=bs(o);if(!m)return!1;const N=m&&bs(zm),j=m&&(typeof Cm=="function"?(z=>R=>z.encode(R))(new Cm):async z=>new Uint8Array(await new f(z).arrayBuffer())),h=b&&N&&wm(()=>{let z=!1;const R=new f(st.origin,{body:new zm,method:"POST",get duplex(){return z=!0,"half"}}).headers.has("Content-Type");return z&&!R}),S=p&&N&&wm(()=>C.isReadableStream(new o("").body)),A={stream:S&&(z=>z.body)};m&&["text","arrayBuffer","blob","formData","stream"].forEach(z=>{!A[z]&&(A[z]=(R,D)=>{let V=R&&R[z];if(V)return V.call(R);throw new pe(`Response type '${z}' is not supported`,pe.ERR_NOT_SUPPORT,D)})});const G=async z=>{if(z==null)return 0;if(C.isBlob(z))return z.size;if(C.isSpecCompliantForm(z))return(await new f(st.origin,{method:"POST",body:z}).arrayBuffer()).byteLength;if(C.isArrayBufferView(z)||C.isArrayBuffer(z))return z.byteLength;if(C.isURLSearchParams(z)&&(z=z+""),C.isString(z))return(await j(z)).byteLength},I=async(z,R)=>{const D=C.toFiniteNumber(z.getContentLength());return D??G(R)};return async z=>{let{url:R,method:D,data:V,signal:Z,cancelToken:W,timeout:ae,onDownloadProgress:ie,onUploadProgress:ue,responseType:J,headers:Y,withCredentials:q="same-origin",fetchOptions:$}=Im(z),ee=c||fetch;J=J?(J+"").toLowerCase():"text";let re=tb([Z,W&&W.toAbortSignal()],ae),Te=null;const Me=re&&re.unsubscribe&&(()=>{re.unsubscribe()});let Xe;try{if(ue&&h&&D!=="get"&&D!=="head"&&(Xe=await I(Y,V))!==0){let g=new f(R,{method:"POST",body:V,duplex:"half"}),U;if(C.isFormData(V)&&(U=g.headers.get("content-type"))&&Y.setContentType(U),g.body){const[K,P]=Em(Xe,Ss(jm(ue)));V=Tm(g.body,_m,K,P)}}C.isString(q)||(q=q?"include":"omit");const O=b&&"credentials"in f.prototype,M={...$,signal:re,method:D.toUpperCase(),headers:Y.normalize().toJSON(),body:V,duplex:"half",credentials:O?q:void 0};Te=b&&new f(R,M);let Q=await(b?ee(Te,$):ee(R,M));const le=S&&(J==="stream"||J==="response");if(S&&(ie||le&&Me)){const g={};["status","statusText","headers"].forEach(X=>{g[X]=Q[X]});const U=C.toFiniteNumber(Q.headers.get("content-length")),[K,P]=ie&&Em(U,Ss(jm(ie),!0))||[];Q=new o(Tm(Q.body,_m,K,()=>{P&&P(),Me&&Me()}),g)}J=J||"text";let fe=await A[C.findKey(A,J)||"text"](Q,z);return!le&&Me&&Me(),await new Promise((g,U)=>{Wm(g,U,{data:fe,headers:gt.from(Q.headers),status:Q.status,statusText:Q.statusText,config:z,request:Te})})}catch(O){throw Me&&Me(),O&&O.name==="TypeError"&&/Load failed|fetch/i.test(O.message)?Object.assign(new pe("Network Error",pe.ERR_NETWORK,z,Te),{cause:O.cause||O}):pe.from(O,O&&O.code,z,Te)}}},ub=new Map,eh=s=>{let c=s?s.env:{};const{fetch:f,Request:o,Response:m}=c,b=[o,m,f];let p=b.length,N=p,j,h,S=ub;for(;N--;)j=b[N],h=S.get(j),h===void 0&&S.set(j,h=N?new Map:sb(c)),S=h;return h};eh();const Ic={http:jg,xhr:eb,fetch:{get:eh}};C.forEach(Ic,(s,c)=>{if(s){try{Object.defineProperty(s,"name",{value:c})}catch{}Object.defineProperty(s,"adapterName",{value:c})}});const Om=s=>`- ${s}`,cb=s=>C.isFunction(s)||s===null||s===!1,th={getAdapter:(s,c)=>{s=C.isArray(s)?s:[s];const{length:f}=s;let o,m;const b={};for(let p=0;p<f;p++){o=s[p];let N;if(m=o,!cb(o)&&(m=Ic[(N=String(o)).toLowerCase()],m===void 0))throw new pe(`Unknown adapter '${N}'`);if(m&&(C.isFunction(m)||(m=m.get(c))))break;b[N||"#"+p]=m}if(!m){const p=Object.entries(b).map(([j,h])=>`adapter ${j} `+(h===!1?"is not supported by the environment":"is not available in the build"));let N=f?p.length>1?`since :
`+p.map(Om).join(`
`):" "+Om(p[0]):"as no adapter specified";throw new pe("There is no suitable adapter to dispatch the request "+N,"ERR_NOT_SUPPORT")}return m},adapters:Ic};function $c(s){if(s.cancelToken&&s.cancelToken.throwIfRequested(),s.signal&&s.signal.aborted)throw new Vl(null,s)}function Rm(s){return $c(s),s.headers=gt.from(s.headers),s.data=Jc.call(s,s.transformRequest),["post","put","patch"].indexOf(s.method)!==-1&&s.headers.setContentType("application/x-www-form-urlencoded",!1),th.getAdapter(s.adapter||Wn.adapter,s)(s).then(function(o){return $c(s),o.data=Jc.call(s,s.transformResponse,o),o.headers=gt.from(o.headers),o},function(o){return Fm(o)||($c(s),o&&o.response&&(o.response.data=Jc.call(s,s.transformResponse,o.response),o.response.headers=gt.from(o.response.headers))),Promise.reject(o)})}const ah="1.12.2",_s={};["object","boolean","number","function","string","symbol"].forEach((s,c)=>{_s[s]=function(o){return typeof o===s||"a"+(c<1?"n ":" ")+s}});const Um={};_s.transitional=function(c,f,o){function m(b,p){return"[Axios v"+ah+"] Transitional option '"+b+"'"+p+(o?". "+o:"")}return(b,p,N)=>{if(c===!1)throw new pe(m(p," has been removed"+(f?" in "+f:"")),pe.ERR_DEPRECATED);return f&&!Um[p]&&(Um[p]=!0,console.warn(m(p," has been deprecated since v"+f+" and will be removed in the near future"))),c?c(b,p,N):!0}};_s.spelling=function(c){return(f,o)=>(console.warn(`${o} is likely a misspelling of ${c}`),!0)};function ob(s,c,f){if(typeof s!="object")throw new pe("options must be an object",pe.ERR_BAD_OPTION_VALUE);const o=Object.keys(s);let m=o.length;for(;m-- >0;){const b=o[m],p=c[b];if(p){const N=s[b],j=N===void 0||p(N,b,s);if(j!==!0)throw new pe("option "+b+" must be "+j,pe.ERR_BAD_OPTION_VALUE);continue}if(f!==!0)throw new pe("Unknown option "+b,pe.ERR_BAD_OPTION)}}const xs={assertOptions:ob,validators:_s},Kt=xs.validators;let ll=class{constructor(c){this.defaults=c||{},this.interceptors={request:new Sm,response:new Sm}}async request(c,f){try{return await this._request(c,f)}catch(o){if(o instanceof Error){let m={};Error.captureStackTrace?Error.captureStackTrace(m):m=new Error;const b=m.stack?m.stack.replace(/^.+\n/,""):"";try{o.stack?b&&!String(o.stack).endsWith(b.replace(/^.+\n.+\n/,""))&&(o.stack+=`
`+b):o.stack=b}catch{}}throw o}}_request(c,f){typeof c=="string"?(f=f||{},f.url=c):f=c||{},f=nl(this.defaults,f);const{transitional:o,paramsSerializer:m,headers:b}=f;o!==void 0&&xs.assertOptions(o,{silentJSONParsing:Kt.transitional(Kt.boolean),forcedJSONParsing:Kt.transitional(Kt.boolean),clarifyTimeoutError:Kt.transitional(Kt.boolean)},!1),m!=null&&(C.isFunction(m)?f.paramsSerializer={serialize:m}:xs.assertOptions(m,{encode:Kt.function,serialize:Kt.function},!0)),f.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?f.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:f.allowAbsoluteUrls=!0),xs.assertOptions(f,{baseUrl:Kt.spelling("baseURL"),withXsrfToken:Kt.spelling("withXSRFToken")},!0),f.method=(f.method||this.defaults.method||"get").toLowerCase();let p=b&&C.merge(b.common,b[f.method]);b&&C.forEach(["delete","get","head","post","put","patch","common"],z=>{delete b[z]}),f.headers=gt.concat(p,b);const N=[];let j=!0;this.interceptors.request.forEach(function(R){typeof R.runWhen=="function"&&R.runWhen(f)===!1||(j=j&&R.synchronous,N.unshift(R.fulfilled,R.rejected))});const h=[];this.interceptors.response.forEach(function(R){h.push(R.fulfilled,R.rejected)});let S,A=0,G;if(!j){const z=[Rm.bind(this),void 0];for(z.unshift(...N),z.push(...h),G=z.length,S=Promise.resolve(f);A<G;)S=S.then(z[A++],z[A++]);return S}G=N.length;let I=f;for(;A<G;){const z=N[A++],R=N[A++];try{I=z(I)}catch(D){R.call(this,D);break}}try{S=Rm.call(this,I)}catch(z){return Promise.reject(z)}for(A=0,G=h.length;A<G;)S=S.then(h[A++],h[A++]);return S}getUri(c){c=nl(this.defaults,c);const f=Pm(c.baseURL,c.url,c.allowAbsoluteUrls);return Km(f,c.params,c.paramsSerializer)}};C.forEach(["delete","get","head","options"],function(c){ll.prototype[c]=function(f,o){return this.request(nl(o||{},{method:c,url:f,data:(o||{}).data}))}});C.forEach(["post","put","patch"],function(c){function f(o){return function(b,p,N){return this.request(nl(N||{},{method:c,headers:o?{"Content-Type":"multipart/form-data"}:{},url:b,data:p}))}}ll.prototype[c]=f(),ll.prototype[c+"Form"]=f(!0)});let rb=class lh{constructor(c){if(typeof c!="function")throw new TypeError("executor must be a function.");let f;this.promise=new Promise(function(b){f=b});const o=this;this.promise.then(m=>{if(!o._listeners)return;let b=o._listeners.length;for(;b-- >0;)o._listeners[b](m);o._listeners=null}),this.promise.then=m=>{let b;const p=new Promise(N=>{o.subscribe(N),b=N}).then(m);return p.cancel=function(){o.unsubscribe(b)},p},c(function(b,p,N){o.reason||(o.reason=new Vl(b,p,N),f(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(c){if(this.reason){c(this.reason);return}this._listeners?this._listeners.push(c):this._listeners=[c]}unsubscribe(c){if(!this._listeners)return;const f=this._listeners.indexOf(c);f!==-1&&this._listeners.splice(f,1)}toAbortSignal(){const c=new AbortController,f=o=>{c.abort(o)};return this.subscribe(f),c.signal.unsubscribe=()=>this.unsubscribe(f),c.signal}static source(){let c;return{token:new lh(function(m){c=m}),cancel:c}}};function fb(s){return function(f){return s.apply(null,f)}}function db(s){return C.isObject(s)&&s.isAxiosError===!0}const eo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(eo).forEach(([s,c])=>{eo[c]=s});function nh(s){const c=new ll(s),f=Mm(ll.prototype.request,c);return C.extend(f,ll.prototype,c,{allOwnKeys:!0}),C.extend(f,c,null,{allOwnKeys:!0}),f.create=function(m){return nh(nl(s,m))},f}const de=nh(Wn);de.Axios=ll;de.CanceledError=Vl;de.CancelToken=rb;de.isCancel=Fm;de.VERSION=ah;de.toFormData=Ts;de.AxiosError=pe;de.Cancel=de.CanceledError;de.all=function(c){return Promise.all(c)};de.spread=fb;de.isAxiosError=db;de.mergeConfig=nl;de.AxiosHeaders=gt;de.formToJSON=s=>$m(C.isHTMLForm(s)?new FormData(s):s);de.getAdapter=th.getAdapter;de.HttpStatusCode=eo;de.default=de;const{Axios:kb,AxiosError:Yb,CanceledError:Gb,isCancel:Xb,CancelToken:Qb,VERSION:Zb,all:Vb,Cancel:Kb,isAxiosError:Jb,spread:$b,toFormData:Fb,AxiosHeaders:Wb,HttpStatusCode:Pb,formToJSON:Ib,getAdapter:ey,mergeConfig:ty}=de,mb=s=>{let c=s.length,f;for(;c!==0;)f=Math.floor(Math.random()*c),c--,[s[c],s[f]]=[s[f],s[c]];return s},Ae="https://api.zooda.in",hb=async()=>{try{const s=await de.get("https://api.zooda.in/api/promotion");return s.data.success&&Array.isArray(s.data.data)?s.data.data.map(c=>({...c,type:c.displayType,targetUrl:c.link,_id:c._id||c.id})):Array.isArray(s.data.promotions)?s.data.promotions:Array.isArray(s.data)?s.data:[]}catch(s){return console.error("Error fetching active promotions:",s),[]}},Ns=async(s,c)=>{if(s)try{await de.post(`${Ae}/api/promotion/${s}/track`,{type:c})}catch(f){console.error(`Failed to track ${c} for promotion`,f)}},pb=({promotion:s,onClose:c,onClaimOffer:f})=>{const[o,m]=k.useState(!0);k.useEffect(()=>{Ns(s._id,"impression")},[s._id]);const b=()=>{Ns(s._id,"click"),f(s)};return o?(s.targetUrl||s.link,r.jsxs("div",{className:"promotion-banner",children:[c&&r.jsx("button",{className:"banner-close",onClick:()=>m(!1),children:"×"}),r.jsxs("div",{className:"banner-content",onClick:b,children:[r.jsx("img",{src:`${s.image}`,alt:s.name,className:"banner-image"}),r.jsxs("div",{className:"banner-info",children:[r.jsx("h4",{children:s.name}),r.jsx("p",{children:s.description}),s.discountCode&&r.jsxs("span",{className:"discount-code",children:["Use code: ",s.discountCode]}),s.couponCode&&r.jsxs("span",{className:"discount-code",children:["Use code: ",s.couponCode]})]})]})]})):null},gb=({promotion:s,onClose:c,onClaimOffer:f})=>{k.useEffect(()=>{Ns(s._id,"impression");const m=JSON.parse(localStorage.getItem("shownPromotions")||"[]");m.includes(s._id)||(m.push(s._id),localStorage.setItem("shownPromotions",JSON.stringify(m)))},[s._id]);const o=()=>{Ns(s._id,"click"),f(s)};return r.jsx("div",{className:"promotion-popup-overlay",onClick:c,children:r.jsxs("div",{className:"promotion-popup-content",onClick:m=>m.stopPropagation(),children:[r.jsx("button",{className:"banner-close",onClick:c,children:"×"}),r.jsx("img",{src:s.image,alt:s.name,className:"promotion-popup-image"}),r.jsxs("div",{className:"promotion-popup-body",children:[r.jsx("h3",{children:s.name}),r.jsx("p",{children:s.description}),(s.discountCode||s.couponCode)&&r.jsxs("div",{className:"promotion-code",children:["Use code:"," ",r.jsx("strong",{children:s.discountCode||s.couponCode})]}),r.jsx("button",{className:"promotion-popup-claim-btn",onClick:o,children:"Claim Offer Now"})]})]})})},bb=({onSelectSearchResult:s,onSearchChange:c,onBack:f})=>{var z;const[o,m]=k.useState(""),[b,p]=k.useState([]),[N,j]=k.useState(!1),[h,S]=k.useState(null);k.useEffect(()=>{A()},[]);const A=async()=>{if(Ae.includes("localhost")){p([{_id:"b1",businessName:"The Organic Store",businessDescription:"Fresh and organic groceries.",businessCategory:"Groceries",logoUrl:"https://placehold.co/80x80/004d40/ffffff?text=ORG",products:[{_id:"p1",name:"Organic Apples",price:150,category:"Fruit",tags:["fresh","fruit"],image:{url:"https://placehold.co/300x200/ff4d4d/ffffff?text=Apple"}},{_id:"p2",name:"Whole Wheat Bread",price:80,category:"Bakery",tags:["bread","whole grain"],image:{url:"https://placehold.co/300x200/ff9900/ffffff?text=Bread"}}]},{_id:"b2",businessName:"Tech Hub Electronics",businessDescription:"Latest gadgets and accessories.",businessCategory:"Electronics",logoUrl:"https://placehold.co/80x80/333333/00ccff?text=TECH",products:[{_id:"p4",name:"Wireless Mouse",price:599,category:"Accessory",tags:["computer","office"],image:{url:"https://placehold.co/300x200/007bff/ffffff?text=Mouse"}},{_id:"p5",name:"4K Monitor - UltraSharp",price:25e3,category:"Display",tags:["gaming","work"],image:{url:"https://placehold.co/300x200/9933ff/ffffff?text=Monitor"}}]}]);return}try{j(!0);const D=await(await fetch(`${Ae}/api/business/search`)).json();D.success&&Array.isArray(D.businesses)&&p(D.businesses)}catch(R){console.error("Error fetching businesses:",R)}finally{j(!1)}},G=R=>{const D=R.target.value;m(D),c(D)},I=b.filter(R=>{var W,ae,ie,ue;const D=o.toLowerCase(),V=((W=R.businessName)==null?void 0:W.toLowerCase().includes(D))||((ae=R.businessDescription)==null?void 0:ae.toLowerCase().includes(D))||((ie=R.businessCategory)==null?void 0:ie.toLowerCase().includes(D)),Z=(ue=R.products)==null?void 0:ue.some(J=>{var Y,q,$;return((Y=J.name)==null?void 0:Y.toLowerCase().includes(D))||((q=J.category)==null?void 0:q.toLowerCase().includes(D))||(($=J.tags)==null?void 0:$.some(ee=>ee.toLowerCase().includes(D)))});return V||Z});return r.jsxs("div",{className:"search-page",children:[r.jsxs("header",{className:"app-header",children:[r.jsx("button",{onClick:f,className:"back-button",children:r.jsx("span",{className:"material-icons",children:"arrow_back"})}),r.jsxs("div",{className:"search-input-wrapper",children:[r.jsx("span",{className:"material-icons search-icon",children:"search"}),r.jsx("input",{type:"text",placeholder:"Search businesses and products...",value:o,onChange:G,className:"search-page-input"}),o&&r.jsx("button",{className:"search-clear",onClick:()=>m(""),children:r.jsx("span",{className:"material-icons",children:"close"})})]})]}),r.jsx("main",{className:"search-results-container",children:N?r.jsx("div",{className:"search-loading",children:"Loading businesses..."}):I.length===0?r.jsx("div",{className:"search-no-results",children:"No businesses or products found."}):I.map(R=>{var D;return r.jsxs("div",{className:"business-block",children:[r.jsxs("div",{className:"business-card",children:[r.jsx("img",{src:R.logoUrl||"https://placehold.co/80x80?text=Logo",alt:R.businessName,className:"business-logo"}),r.jsxs("div",{className:"business-info",children:[r.jsx("h3",{children:R.businessName}),r.jsxs("div",{className:"company-stats",children:[r.jsxs("span",{className:"",children:["followers : ",R.followers]}),r.jsxs("span",{className:"",children:["ER : ",R.engagementRate]}),r.jsx("a",{href:R.businessWebsite||"#",target:"_blank",rel:"noopener noreferrer",children:r.jsx("button",{className:"visit-btn",children:"Visit site"})})]}),r.jsx("p",{children:R.businessDescription})]})]}),((D=R.products)==null?void 0:D.length)>0?r.jsx("div",{className:"products-grid",children:R.products.filter(V=>{var W,ae,ie;if(!o)return!0;const Z=o.toLowerCase();return((W=V.name)==null?void 0:W.toLowerCase().includes(Z))||((ae=V.category)==null?void 0:ae.toLowerCase().includes(Z))||((ie=V.tags)==null?void 0:ie.some(ue=>ue.toLowerCase().includes(Z)))}).map(V=>r.jsxs("div",{className:"product-card minimal",onClick:()=>S(V),children:[r.jsxs("div",{className:"product-details-text",children:[r.jsxs("p",{children:["Product: ",r.jsx("span",{className:"product-name",children:V.name})]}),r.jsxs("p",{children:["Price:",r.jsxs("span",{className:"product-price-text",children:["₹",V.price||"N/A"]})]})]}),r.jsx("button",{className:"view-btn",onClick:Z=>{Z.stopPropagation(),S(V)},title:"View Details",children:r.jsx("span",{className:"material-icons",children:"visibility"})})]},V._id))}):r.jsx("div",{className:"no-products",children:"No products listed for this business."})]},R._id)})}),h&&r.jsx("div",{className:"image-popup-overlay",onClick:()=>S(null),children:r.jsxs("div",{className:"image-popup",onClick:R=>R.stopPropagation(),children:[r.jsx("img",{src:((z=h.image)==null?void 0:z.url)||"https://placehold.co/300x200?text=Product",alt:h.name}),r.jsxs("div",{className:"popup-details",children:[r.jsx("h3",{children:h.name}),r.jsxs("span",{className:"popup-price",children:["₹",h.price||"N/A"]}),r.jsx("a",{href:h.productLink||"#",target:"_blank",rel:"noopener noreferrer",children:r.jsx("button",{className:"select-product-btn",onClick:()=>{s(h),S(null)},children:"Select Product"})})]}),r.jsx("button",{className:"close-popup",onClick:()=>S(null),children:"✕"})]})}),r.jsx("style",{jsx:!0,children:`
        /* --- General and Header Styles (Kept as before) --- */
        .search-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
        }

        .app-header {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          border-bottom: 1px solid #222;
          background: #000;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          background: #111;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          flex: 1;
          margin-left: 0.8rem;
        }

        .search-page-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
          font-size: 1rem;
        }

        .search-icon {
          color: #aaa;
          margin-right: 0.4rem;
        }

        .search-clear {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
        }

        /* Business Block */
        .business-block {
          background: #111;
          border-radius: 12px;
          margin: 1rem;
          padding: 1rem;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.05);
        }

        .business-card {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #222;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .business-logo {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
          margin-right: 1rem;
        }

        .business-info h3 {
          margin: 0;
          color: #fff;
          font-size: 1.1rem;
        }

        .business-info p {
          margin: 2px 0;
          color: #bbb;
          font-size: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .business-category {
          display: inline-block;
          background: #007bff33;
          color: #007bff;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          margin-top: 4px;
        }
        /* --- End General and Header Styles --- */


        /* --- Product Card - Minimal Text View --- */
        .products-grid {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .product-card.minimal {
          background: #1a1a1a;
          border-radius: 10px;
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        
        .product-card.minimal:hover {
            background: #222;
            transform: translateY(-1px);
        }
        
        .product-details-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            min-width: 0;
        }
        
        .product-details-text p {
            margin: 0;
            line-height: 1.4;
            color: #ccc;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .product-name {
            font-weight: 600;
            color: #fff;
        }
        
        .product-price-text {
            color: #00ff99;
            font-weight: 600;
        }


        .view-btn {
          background: #4CAF50;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
    
          margin-left: 15px; /* Add space between text and button */
          flex-shrink: 0;
        }

        .view-btn:hover {
          background: #4CAF50;
        }
        
        .no-products, .search-loading, .search-no-results {
            padding: 1rem;
            color: #aaa;
            text-align: center;
            font-style: italic;
        }

        /* --- Popup Styles --- */
        .image-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .image-popup {
          background: #111;
          padding: 1.5rem;
          border-radius: 12px;
          position: relative;
          width: 90%;
          max-width: 380px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
          text-align: center;
        }

        .image-popup img {
          width: 100%;
          max-height: 250px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .popup-details h3 {
          margin: 0 0 0.5rem 0;
          color: #fff;
          font-size: 1.4rem;
        }

        .popup-price {
          color: #00ff99;
          margin-top: 4px;
          font-weight: 700;
          font-size: 1.2rem;
          display: block;
          margin-bottom: 1rem;
        }

        .popup-description {
            color: #ccc;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }

        .select-product-btn {
            background: #00ff99;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s;
        }

        .select-product-btn:hover {
            background: #00e685;
        }

        .close-popup {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
        }
      `})]})},Xl=({title:s,onBack:c,user:f,onLogin:o,onLogout:m,onRegister:b,onMenuToggle:p,isMenuOpen:N,onSearchClick:j,onProfileClick:h})=>c?r.jsxs("header",{className:"app-header app-header--navigation",children:[r.jsx("button",{onClick:c,className:"back-button","aria-label":"Go back",children:r.jsx("span",{className:"material-icons",children:"arrow_back"})}),r.jsx("h1",{className:"header-title",children:s}),r.jsx("div",{className:"header-placeholder"})]}):s?r.jsx("header",{className:"app-header app-header--centered",children:r.jsx("h1",{className:"header-title",children:s})}):r.jsxs("header",{className:"app-header",children:[r.jsx("div",{className:"header-logo","aria-label":"Zetova logo",children:r.jsx("span",{className:"material-icons",children:"hub"})}),r.jsxs("div",{className:"search-container",onClick:j,children:[r.jsx("span",{className:"material-icons",children:"search"}),r.jsx("input",{type:"text",placeholder:"Search companies and products...",readOnly:!0,className:"search-input"})]}),r.jsx("div",{className:"account-section",children:f?r.jsx("button",{onClick:h,className:"menu-button","aria-label":"View Profile",title:"View Profile",children:r.jsx("span",{className:"material-icons",children:"account_circle"})}):r.jsx("button",{onClick:o,className:"menu-button","aria-label":"Login",title:"Login",children:r.jsx("span",{className:"material-icons",children:"login"})})}),r.jsx("button",{className:"menu-button",onClick:p,"aria-label":"Toggle menu",children:r.jsx("span",{className:"material-icons",children:N?"close":"menu"})})]}),yb=({user:s,onBack:c,onSelectCompany:f,onLogout:o,allCompanies:m})=>{const[b,p]=k.useState([]),[N,j]=k.useState(!0),[h,S]=k.useState(""),[A,G]=k.useState(!1),[I,z]=k.useState({name:s.name||"",email:s.email||"",phone:s.phone||"",bio:s.bio||"",website:s.website||""}),[R,D]=k.useState(s.profileImage||""),[V,Z]=k.useState(!1),W=k.useCallback(async()=>{var Y,q;if(s._id)try{j(!0),S("");const ee=(await de.get(`${Ae}/api/user/${s._id}/following`)).data.following||[],re=m.filter(Te=>ee.includes(Te._id));p(re)}catch($){console.error("Error fetching followed businesses:",$),S(((q=(Y=$.response)==null?void 0:Y.data)==null?void 0:q.message)||"Failed to load followed businesses.")}finally{j(!1)}},[s._id,m]),ae=Y=>{const{name:q,value:$}=Y.target;z(ee=>({...ee,[q]:$}))},ie=Y=>{var $;const q=($=Y.target.files)==null?void 0:$[0];if(q){const ee=URL.createObjectURL(q);D(ee)}},ue=async()=>{var Y,q;try{Z(!0),await de.put(`${Ae}/api/user/${s._id}`,{...I,profileImage:R}),G(!1)}catch($){console.error("Error updating profile:",$),S(((q=(Y=$.response)==null?void 0:Y.data)==null?void 0:q.message)||"Failed to update profile.")}finally{Z(!1)}},J=()=>{z({name:s.name||"",email:s.email||"",phone:s.phone||"",bio:s.bio||"",website:s.website||""}),D(s.profileImage||""),G(!1)};return k.useEffect(()=>{W()},[W]),r.jsx("div",{className:"user-profile-page",children:r.jsxs("main",{className:"profile-content",children:[r.jsx("section",{className:"profile-section",children:r.jsxs("div",{className:"profile-header-card",children:[r.jsxs("div",{className:"profile-avatar-section",children:[r.jsxs("div",{className:"profile-avatar-container",children:[R?r.jsx("img",{src:R,alt:"Profile",className:"profile-avatar"}):r.jsx("span",{className:"material-icons profile-avatar-icon",children:"account_circle"}),A&&r.jsxs("label",{htmlFor:"profile-image-upload",className:"avatar-upload-label",children:[r.jsx("span",{className:"material-icons",children:"edit"}),r.jsx("input",{id:"profile-image-upload",type:"file",accept:"image/*",onChange:ie,className:"avatar-upload-input"})]})]}),!A&&r.jsxs("button",{onClick:()=>G(!0),className:"edit-profile-btn",children:[r.jsx("span",{className:"material-icons",children:"edit"}),"Edit Profile"]})]}),r.jsx("div",{className:"profile-details",children:A?r.jsxs("div",{className:"edit-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"name",children:"Full Name"}),r.jsx("input",{type:"text",id:"name",name:"name",value:I.name,onChange:ae,className:"form-input",placeholder:"Enter your full name"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"email",children:"Email"}),r.jsx("input",{type:"email",id:"email",name:"email",value:I.email,onChange:ae,className:"form-input",placeholder:"Enter your email"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"phone",children:"Phone"}),r.jsx("input",{type:"tel",id:"phone",name:"phone",value:I.phone,onChange:ae,className:"form-input",placeholder:"Enter your phone number"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"website",children:"Website"}),r.jsx("input",{type:"url",id:"website",name:"website",value:I.website,onChange:ae,className:"form-input",placeholder:"Enter your website URL"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"bio",children:"Bio"}),r.jsx("textarea",{id:"bio",name:"bio",value:I.bio,onChange:ae,className:"form-textarea",placeholder:"Tell us about yourself...",rows:4})]}),r.jsxs("div",{className:"form-actions",children:[r.jsx("button",{onClick:J,className:"btn btn-outline",disabled:V,children:"Cancel"}),r.jsx("button",{onClick:ue,className:"btn btn-primary",disabled:V,children:V?"Saving...":"Save Changes"})]})]}):r.jsxs("div",{className:"profile-info",children:[r.jsx("h1",{className:"user-name",children:s.name}),r.jsx("p",{className:"user-email",children:s.email}),s.phone&&r.jsx("p",{className:"user-phone",children:s.phone}),s.website&&r.jsx("a",{href:s.website,className:"user-website",target:"_blank",rel:"noopener noreferrer",children:s.website}),s.bio&&r.jsx("p",{className:"user-bio",children:s.bio})]})})]})}),r.jsx("section",{className:"logout-section",children:r.jsxs("button",{onClick:o,className:"btn btn-danger logout-btn",children:[r.jsx("span",{className:"material-icons",children:"logout"}),"Logout"]})})]})})},vb=`
.user-profile-page {
  background: #000000;
  min-height: 100vh;
  color: #ffffff;
}

.user-profile-page .profile-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #363636;
  background: #000000;
  position: sticky;
  top: 0;
  z-index: 100;
}

.user-profile-page .back-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.user-profile-page .back-button:hover {
  background: #363636;
}

.user-profile-page .profile-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.user-profile-page .profile-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-profile-page .profile-section {
  margin-bottom: 30px;
}

.user-profile-page .profile-header-card {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.profile-avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #363636;
}

.profile-avatar-icon {
  font-size: 120px;
  color: #555555;
}

.avatar-upload-label {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #0095f6;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #000000;
}

.avatar-upload-label .material-icons {
  font-size: 18px;
  color: #ffffff;
}

.avatar-upload-input {
  display: none;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #363636;
  border: 1px solid #555555;
  border-radius: 6px;
  padding: 8px 16px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.edit-profile-btn:hover {
  background: #555555;
}

.profile-details {
  flex: 1;
}

.profile-info .user-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
}

.profile-info .user-email {
  font-size: 16px;
  color: #a8a8a8;
  margin: 0 0 12px 0;
}

.profile-info .user-phone,
.profile-info .user-website {
  font-size: 14px;
  color: #a8a8a8;
  margin: 0 0 8px 0;
  display: block;
}

.profile-info .user-website {
  color: #0095f6;
  text-decoration: none;
}

.profile-info .user-website:hover {
  text-decoration: underline;
}

.profile-info .user-bio {
  font-size: 16px;
  line-height: 1.5;
  color: #ffffff;
  margin: 16px 0 0 0;
}

/* Edit Form Styles */
.edit-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  width: 100%;
  background: #000000;
  border: 1px solid #363636;
  border-radius: 6px;
  padding: 12px;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #0095f6;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* Button Styles */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.user-profile-page .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.user-profile-page.btn-outline {
  background: transparent;
  border: 1px solid #363636;
  color: #ffffff;
}

.user-profile-page .btn-outline:hover:not(:disabled) {
  background: #363636;
}

.user-profile-page .btn-primary {
  background: #0095f6;
  color: #ffffff;
}

.user-profile-page .btn-primary:hover:not(:disabled) {
  background: #0081d6;
}

.user-profile-page .btn-danger {
  background: #dc2626;
  color: #ffffff;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

/* Following Section */
.following-section {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.follow-count {
  font-size: 14px;
  color: #a8a8a8;
  background: #363636;
  padding: 4px 12px;
  border-radius: 12px;
}

/* Loading, Error, and Empty States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #a8a8a8;
}

.loading-state .material-icons,
.error-state .material-icons,
.empty-state .material-icons {
  font-size: 48px;
  margin-bottom: 16px;
  color: #555555;
}

.error-state .material-icons {
  color: #dc2626;
}

.empty-subtext {
  font-size: 14px;
  margin-top: 8px;
  color: #666666;
}

/* Businesses Grid */
.businesses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.business-card {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.business-card:hover {
  border-color: #555555;
  transform: translateY(-2px);
}

.business-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #363636;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.business-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.business-avatar .material-icons {
  font-size: 24px;
  color: #a8a8a8;
}

.business-info {
  flex: 1;
}

.business-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.business-category {
  font-size: 14px;
  color: #a8a8a8;
  margin: 0 0 8px 0;
}

.business-stats {
  display: flex;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #a8a8a8;
}

.stat .material-icons {
  font-size: 14px;
}

/* Logout Section */
.logout-section {
  text-align: center;
  padding: 20px 0;
}

.logout-btn {
  min-width: 120px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-content {
    padding: 16px;
  }

  .profile-header-card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .profile-avatar-section {
    width: 100%;
  }

  .businesses-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-avatar-container {
    width: 100px;
    height: 100px;
  }

  .profile-avatar-icon {
    font-size: 100px;
  }

  .profile-info .user-name {
    font-size: 24px;
  }
}
`,ih=document.createElement("style");ih.innerText=vb;document.head.appendChild(ih);const xb=({company:s,onSelectCompany:c,user:f,onLoginClick:o})=>{const[m,b]=k.useState(!1),[p,N]=k.useState(Number(s.followers)||0);k.useEffect(()=>{(async()=>{if(f!=null&&f._id&&s._id)try{const A=await de.get(`${Ae}/api/follow/${s._id}/status/${f._id}`);A.data.success&&(b(A.data.isFollowing),typeof A.data.followers=="number"&&N(A.data.followers))}catch(A){console.error("Error checking follow status:",A)}})()},[f==null?void 0:f._id,s._id]);const j=async S=>{if(S.stopPropagation(),!(f!=null&&f._id)){o&&o();return}try{const A=await de.post(`${Ae}/api/follow/${s._id}`,{userId:f._id});A.data.success&&(b(A.data.isFollowing),N(Number(A.data.followers)||0))}catch(A){console.error("Follow error:",A)}},h=S=>{S.stopPropagation(),window.open(s.siteUrl,"_blank")};return r.jsx("article",{className:"company-card",onClick:()=>c(s),"aria-labelledby":`company-name-${s.rank}`,role:"button",tabIndex:0,children:r.jsxs("div",{className:"company-row single-line",children:[r.jsx("img",{src:s.logoUrl,alt:"Logo",className:"company-logo"}),r.jsxs("div",{className:"company-info",children:[r.jsx("h2",{id:`company-name-${s.rank}`,className:"company-name",children:s.name}),r.jsxs("div",{className:"company-stats",children:[r.jsxs("span",{children:[p," Followers"]}),r.jsxs("span",{children:[s.engagementRate,"% ER"]}),r.jsx("button",{className:"visit-btn",onClick:h,children:"Visit site"}),r.jsx("button",{className:`follow-btn ${m?"following":""}`,onClick:j,children:m?"Following":"Follow +"})]}),r.jsx("p",{className:"company-description",children:s.description})]})]})})},Sb=({onSelectCompany:s,user:c,allPromotions:f,onClaimOffer:o})=>{const[m,b]=k.useState([]),[p,N]=k.useState(!0),[j,h]=k.useState([]),[S,A]=k.useState([]),[G,I]=k.useState("All Businesses"),[z,R]=k.useState("All"),[D,V]=k.useState("All"),[Z,W]=k.useState(!1),[ae,ie]=k.useState(null),[ue,J]=k.useState([]),Y=async()=>{try{const Q=await(await fetch(`${Ae}/api/admin/categories`)).json();if(Array.isArray(Q)){const le=Q.map(fe=>fe.name);h(["All",...le])}else if(Q.success&&Array.isArray(Q.categories)){const le=Q.categories.map(fe=>fe.name);h(["All",...le])}else h(["All","Ecommerce","LMS","Technology","Food","Fashion"])}catch(M){console.error("Error fetching categories:",M),h(["All","Ecommerce","LMS","Technology","Food","Fashion"])}},q=async M=>{if(M==="All"){A(["All"]);return}try{const le=await(await fetch(`${Ae}/api/admin/categories`)).json();let fe=[];Array.isArray(le)?fe=le:le.success&&Array.isArray(le.categories)&&(fe=le.categories);const g=fe.find(U=>U.name===M);if(g&&Array.isArray(g.subcategories)){const U=g.subcategories.map(K=>K.name);A(["All",...U])}else A(["All","General"])}catch(Q){console.error("Error fetching subcategories:",Q),A(["All","General"])}},$=f.filter(M=>{const Q=M.isActive&&new Date(M.endDate)>new Date,le=M.displayType==="banner"||M.type==="banner";return Q&&le}),ee=f.filter(M=>{const Q=M.isActive&&new Date(M.endDate)>new Date,le=M.displayType==="popup"||M.type==="popup";return Q&&le&&!ue.includes(M._id)});k.useEffect(()=>{if(ee.length>0&&!Z){const M=ee[0];setTimeout(()=>{ie(M),W(!0),J(Q=>[...Q,M._id])},2e3)}},[ee.length,Z]),k.useEffect(()=>{Y()},[]),k.useEffect(()=>{q(z)},[z]),k.useEffect(()=>{(async()=>{try{N(!0);const le=await(await fetch(`${Ae}/api/business/all`)).json();if(Array.isArray(le)){const fe=await Promise.all(le.map(async(g,U)=>{try{const X=(await(await fetch(`${Ae}/api/post/${g._id}`)).json()).posts||[],ke=(await(await fetch(`${Ae}/api/product/${g._id}`)).json()).products||[],we=X.reduce((_t,Lt)=>_t+(Lt.likes||0),0),_e=X.reduce((_t,Lt)=>_t+(Lt.comments||0),0),Le=we+_e,bt=parseInt(g.followers)||1e3,Jt=bt>0?parseFloat((Le/bt*100).toFixed(1)):0;return{_id:g._id,rank:U+1,name:g.businessName||"Unnamed Business",description:g.businessDescription||"No description available",followers:g.followers||Math.floor(Math.random()*5e3).toString(),trend:"Rising",siteUrl:g.businessWebsite||"#",logoUrl:g.logoUrl||"https://placehold.co/100x100?text=No+Logo",posts:X,products:ke,totalPosts:X.length,totalProducts:ke.length,engagementRate:Jt,category:g.businessCategory||"Ecommerce",subcategory:g.subcategory||"General"}}catch{return{_id:g._id,rank:U+1,name:g.businessName||"Unnamed Business",description:g.businessDescription||"No description available",followers:g.followers||Math.floor(Math.random()*5e3).toString(),trend:"Rising",siteUrl:g.businessWebsite||"#",logoUrl:g.logoUrl,posts:[],products:[],engagementRate:0,category:g.businessCategory||"Ecommerce",subcategory:g.subcategory||"General"}}}));fe.sort((g,U)=>U.engagementRate-g.engagementRate),fe.forEach((g,U)=>g.rank=U+1),b(fe)}}catch(Q){console.error("Error fetching businesses:",Q)}finally{N(!1)}})()},[]);const re=fm.useMemo(()=>{let M=[...m];return z!=="All"&&(M=M.filter(Q=>Q.category===z)),D!=="All"&&(M=M.filter(Q=>Q.subcategory===D)),G==="Top Ranked"?M.sort((Q,le)=>le.engagementRate-Q.engagementRate):mb(M)},[m,z,D,G]),Te=fm.useMemo(()=>{const M=[];let Q=0;return re.forEach((le,fe)=>{if(M.push(le),(fe+1)%3===0&&$.length>0){const g=$[Q%$.length];M.push(g),Q++}}),M},[re,$]),Me=()=>{W(!1),ie(null)},Xe=()=>{ae&&(o(ae),Me())},O=M=>{const Q=M.target.value;R(Q),V("All")};return p?r.jsx("div",{className:"app-center",children:r.jsx("p",{className:"text-default",children:"Loading companies..."})}):r.jsxs("main",{className:"company-list-container",children:[r.jsx("div",{className:"tabs-container",children:r.jsxs("div",{className:"tabs",children:[r.jsx("button",{className:`tab ${G==="All Businesses"?"active":""}`,onClick:()=>I("All Businesses"),children:"All Businesses"}),r.jsx("button",{className:`tab ${G==="Top Ranked"?"active":""}`,onClick:()=>I("Top Ranked"),children:"Top Ranked"})]})}),r.jsxs("div",{className:"filters-container",children:[r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{htmlFor:"category-select",className:"filter-label",children:"Category:"}),r.jsx("select",{id:"category-select",value:z,onChange:O,className:"filter-select",children:j.map(M=>r.jsx("option",{value:M,children:M},M))})]}),S.length>1&&r.jsxs("div",{className:"filter-group",children:[r.jsx("label",{htmlFor:"subcategory-select",className:"filter-label",children:"Subcategory:"}),r.jsx("select",{id:"subcategory-select",value:D,onChange:M=>V(M.target.value),className:"filter-select",children:S.map(M=>r.jsx("option",{value:M,children:M},M))})]})]}),r.jsx("div",{className:"company-cards-grid",children:Te.length>0?Te.map((M,Q)=>"rank"in M?r.jsx("div",{className:"company-card-wrapper",children:r.jsx(xb,{company:{...M,engagementRate:M.engagementRate.toFixed(1)},onSelectCompany:s,user:c})},`company-${M._id}-${Q}`):r.jsx("div",{className:"banner-card-wrapper",children:r.jsx(pb,{promotion:M,onClaimOffer:o})},`banner-${M._id}-${Q}`)):r.jsx("div",{className:"no-companies-message",children:"No businesses found for selected filters."})}),Z&&ae&&r.jsx(gb,{promotion:ae,onClose:Me,onClaimOffer:Xe})]})},Nb=`
.company-list-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: #000000;
  min-height: 100vh;
}

.tabs-container {
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  background: #000000;
}

.tabs {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  background: #000000;
}

.tab {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #a8a8a8;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  background: #000000;
}

.tab.active {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.tab:hover {
  color: #ffffff;
  background: #121212;
}

.filters-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #000000;
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.filter-select {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  min-width: 150px;
}

.filter-select:focus {
  outline: none;
  border-color: #0095f6;
}

.company-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.company-card-wrapper {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.company-card-wrapper:hover {
  transform: translateY(-2px);
  border-color: #555555;
}

.banner-card-wrapper {
  grid-column: 1 / -1;
  margin: 10px 0;
}

.no-companies-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #a8a8a8;
  background: #000000;
  font-size: 16px;
}

.app-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: #000000;
}

.text-default {
  color: #ffffff;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .company-list-container {
    padding: 10px;
  }

  .tabs {
    flex-direction: row;
  }

  .tab {
    padding: 12px;
    text-align: center;
  }

  .filters-container {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    width: 100%;
  
  }

  .company-cards-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0 0px;
  }

  .banner-card-wrapper {
    grid-column: 1;
    margin: 5px 0;
  }

  .company-card-wrapper:hover {
    transform: none;
    border-color: #363636;
  }
}

/* Tablet Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .company-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .banner-card-wrapper {
    grid-column: 1 / -1;
  }
}

/* Ensure the banner appears after every 3 companies */
.company-cards-grid > .company-card-wrapper:nth-child(3n) {
  /* This ensures proper wrapping */
}

/* Global body background */
body {
  background: #000000 !important;
  color: #ffffff !important;
}

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #363636;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
`,sh=document.createElement("style");sh.innerText=Nb;document.head.appendChild(sh);const Eb=({isOpen:s,onClose:c,activePage:f,onNavClick:o,user:m,onLogin:b,onRegister:p,onLogout:N,onProfileClick:j})=>{if(!s)return null;const h=G=>{o(G),c()},S=()=>{N&&N(),c()},A=()=>{j(),c()};return r.jsx("div",{className:"mobile-menu-overlay",onClick:c,children:r.jsxs("div",{className:"mobile-menu",onClick:G=>G.stopPropagation(),children:[r.jsxs("div",{className:"mobile-menu-header",children:[r.jsxs("div",{className:"mobile-menu-logo",children:[r.jsx("span",{className:"material-icons",children:"hub"}),r.jsx("span",{className:"logo-text",children:"Zetova"})]}),r.jsx("button",{onClick:c,className:"mobile-menu-close",children:r.jsx("span",{className:"material-icons",children:"close"})})]}),r.jsxs("nav",{className:"mobile-menu-nav",children:[r.jsxs("a",{href:"#",className:`mobile-menu-item ${f==="Home"?"active":""}`,onClick:G=>{G.preventDefault(),h("Home")},children:[r.jsx("span",{className:"material-icons",children:"home"}),r.jsx("span",{children:"Home"})]}),r.jsxs("a",{href:"#",className:`mobile-menu-item ${f==="About"?"active":""}`,onClick:G=>{G.preventDefault(),h("About")},children:[r.jsx("span",{className:"material-icons",children:"info"}),r.jsx("span",{children:"About Us"})]}),r.jsxs("a",{href:"#",className:`mobile-menu-item ${f==="Posts"?"active":""}`,onClick:G=>{G.preventDefault(),h("Posts")},children:[r.jsx("span",{className:"material-icons",children:"article"}),r.jsx("span",{children:"All Posts"})]}),(m==null?void 0:m.isLoggedIn)&&r.jsxs("a",{href:"#",className:`mobile-menu-item ${f==="Profile"?"active":""}`,onClick:G=>{G.preventDefault(),A()},children:[r.jsx("span",{className:"material-icons",children:"account_circle"}),r.jsx("span",{children:"My Profile"})]})]}),r.jsx("div",{className:"mobile-menu-auth",children:m!=null&&m.isLoggedIn?r.jsxs("div",{className:"mobile-menu-user",children:[r.jsxs("span",{className:"user-greeting",children:["Hello, ",m.name]}),r.jsx("button",{onClick:S,className:"btn btn-outline",children:"Logout"})]}):r.jsxs("div",{className:"mobile-menu-auth-buttons",children:[r.jsx("button",{onClick:b,className:"btn btn-outline",children:"Login"}),r.jsx("button",{onClick:p,className:"btn btn-solid",children:"Register"})]})})]})})},jb=()=>r.jsxs("section",{className:"banner",children:[r.jsx("div",{className:"banner-content",children:r.jsx("h2",{className:"banner-title",children:"Discover Top Companies"})}),r.jsx("div",{className:"banner-image",children:r.jsx("span",{className:"material-icons",children:"trending_up"})})]}),Ab=()=>r.jsx("main",{className:"about-page",children:r.jsxs("div",{className:"about-container",children:[r.jsx("h1",{className:"about-title",children:"About Zooda"}),r.jsxs("div",{className:"about-content",children:[r.jsxs("section",{className:"about-section",children:[r.jsx("h2",{children:"Our Mission"}),r.jsx("p",{children:"Zooda connects businesses with their audience through powerful social media insights and engagement tools. We help companies showcase their products, share their stories, and build meaningful connections with their customers."})]}),r.jsxs("section",{className:"about-section",children:[r.jsx("h2",{children:"What We Offer"}),r.jsxs("div",{className:"features-grid",children:[r.jsxs("div",{className:"feature-card",children:[r.jsx("span",{className:"material-icons",children:"business"}),r.jsx("h3",{children:"Company Profiles"}),r.jsx("p",{children:"Discover and follow your favorite businesses"})]}),r.jsxs("div",{className:"feature-card",children:[r.jsx("span",{className:"material-icons",children:"feed"}),r.jsx("h3",{children:"Social Posts"}),r.jsx("p",{children:"Explore engaging content from various companies"})]}),r.jsxs("div",{className:"feature-card",children:[r.jsx("span",{className:"material-icons",children:"shopping_bag"}),r.jsx("h3",{children:"Product Showcase"}),r.jsx("p",{children:"Browse and discover amazing products"})]}),r.jsxs("div",{className:"feature-card",children:[r.jsx("span",{className:"material-icons",children:"trending_up"}),r.jsx("h3",{children:"Analytics"}),r.jsx("p",{children:"Track engagement and performance metrics"})]})]})]}),r.jsxs("section",{className:"about-section",children:[r.jsx("h2",{children:"Join Our Community"}),r.jsx("p",{children:"Whether you're a business looking to grow your presence or a customer wanting to discover new brands, Zooda provides the platform to connect, engage, and grow together."})]})]})]})}),Tb=({onSelectPost:s,user:c})=>{const[f,o]=k.useState([]),[m,b]=k.useState(!0),[p,N]=k.useState(""),[j,h]=k.useState("Following"),S=k.useCallback(async()=>{if(c!=null&&c._id)try{b(!0),N("");const z=j==="Following"?`https://api.zooda.in/api/posts/following/${c._id}`:`https://api.zooda.in/api/posts/unfollowed/${c._id}`,D=(await de.get(z)).data;if(D.success&&Array.isArray(D.posts)){const V=await Promise.all(D.posts.map(async(Z,W)=>{var Y,q,$;let ae=((q=(Y=Z.media)==null?void 0:Y[0])==null?void 0:q.url)||Z.mediaUrl||Z.imageUrl||`https://picsum.photos/600/400?random=${W}`;ae.startsWith("http")||(ae=`https://api.zooda.in${ae.startsWith("/")?"":"/"}${ae}`);let ie=null;const ue=(($=Z.business)==null?void 0:$._id)||Z.business;if(ue)try{const ee=await de.get(`https://api.zooda.in/api/companies/${ue}`);if(ee.data.success){if(ie=ee.data.company,ie.logoUrl){let re=ie.logoUrl;re.startsWith("http")||(re=`https://api.zooda.in${re.startsWith("/")?"":"/"}${re}`),ie.logoUrl=re}ie.businessName&&(ie.username=ie.businessName.toLowerCase().replace(/[\s.]/g,"_"),ie.name=ie.businessName)}}catch(ee){console.error("Error fetching company:",ee),ie={_id:ue,businessName:"Unknown Business",name:"Unknown Business",username:"unknown_business",logoUrl:null}}let J=!1;if(c!=null&&c._id&&Z._id)try{J=(await de.get(`https://api.zooda.in/api/post/${Z._id}/like-status/${c._id}`)).data.isLiked}catch(ee){console.error("Error checking like status:",ee)}return{...Z,_id:Z._id||`post-${W}`,imageUrl:ae,company:ie||{_id:ue,businessName:"Unknown Business",name:"Unknown Business",username:"unknown_business",logoUrl:null},likes:Z.likesCount||Z.likes||0,comments:Z.commentsCount||Z.comments||0,isLiked:J}}));o(V)}else throw new Error("Invalid API response format")}catch(z){console.error("Error fetching posts:",z),N(z.message||"Failed to load posts")}finally{b(!1)}},[c==null?void 0:c._id,j]),A=async(z,R)=>{if(!(c!=null&&c._id)){alert("Please login to like posts");return}try{const D=[...f],V=D[R],Z=!V.isLiked,W=Z?V.likes+1:V.likes-1;D[R]={...V,isLiked:Z,likes:W},o(D),await de.post(`https://api.zooda.in/api/post/${z}/like`,{userId:c._id})}catch(D){const V=[...f];V[R]={...V[R],isLiked:!V[R].isLiked,likes:V[R].isLiked?V[R].likes-1:V[R].likes+1},o(V),console.error("Error liking post:",D)}},G=async(z,R,D)=>{if(!(c!=null&&c._id)){alert("Please login to comment");return}if(D.trim())try{const V=await de.post(`https://api.zooda.in/api/post/${z}/comment`,{text:D,userId:c._id}),Z=[...f];return Z[R]={...Z[R],comments:V.data.commentsCount},o(Z),{success:!0}}catch(V){return console.error("Error commenting:",V),{success:!1,error:V.message}}},I=async z=>{if(navigator.share)try{await navigator.share({title:"Check out this post",text:z.content||"Interesting post",url:window.location.href})}catch{console.log("Share cancelled")}else navigator.clipboard.writeText(window.location.href),alert("Link copied to clipboard!")};return k.useEffect(()=>{S()},[S,j]),m?r.jsx("div",{className:"app-center",children:r.jsxs("p",{className:"text-default",children:["Loading ",j.toLowerCase()," posts..."]})}):p?r.jsxs("div",{className:"app-center app-error",children:[r.jsxs("p",{children:["⚠️ ",p]}),r.jsx("button",{onClick:S,className:"retry-btn",children:"Retry"})]}):r.jsxs("main",{className:"all-posts-page",children:[r.jsx("div",{className:"tabs-container",children:r.jsxs("div",{className:"tabs",children:[r.jsx("button",{className:`tab ${j==="Following"?"active":""}`,onClick:()=>h("Following"),children:"Following"}),r.jsx("button",{className:`tab ${j==="Unfollowing"?"active":""}`,onClick:()=>h("Unfollowing"),children:"Unfollowing"})]})}),f.length===0?r.jsxs("div",{className:"no-posts",children:["No ",j.toLowerCase()," posts found"]}):r.jsx("div",{className:"posts-feed",children:f.map((z,R)=>r.jsx(_b,{post:z,postIndex:R,onSelectPost:s,onLike:A,onComment:G,onShare:I,user:c},z._id))})]})},_b=({post:s,postIndex:c,onSelectPost:f,onLike:o,onComment:m,onShare:b,user:p})=>{var ae,ie,ue,J;const N=((ae=s.company)==null?void 0:ae.businessName)||((ie=s.company)==null?void 0:ie.name)||"Business Name",j=((ue=s.company)==null?void 0:ue.username)||N.toLowerCase().replace(/[\s.]/g,"_"),[h,S]=k.useState(""),[A,G]=k.useState(!1),[I,z]=k.useState([]),[R,D]=k.useState(!1),V=new Date(s.createdAt||s.date).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),Z=async()=>{if(!A&&s._id)try{const Y=await de.get(`https://api.zooda.in/api/post/${s._id}/comments`);z(Y.data.comments||[])}catch(Y){console.error("Error loading comments:",Y)}G(!A)},W=async Y=>{if(Y.preventDefault(),!(!h.trim()||!s._id)){D(!0);try{if((await m(s._id,c,h)).success){S("");const $=await de.get(`https://api.zooda.in/api/post/${s._id}/comments`);z($.data.comments||[])}}catch(q){console.error("Error submitting comment:",q)}finally{D(!1)}}};return r.jsxs("article",{className:"post-grid-item",children:[r.jsx("div",{className:"post-header",children:r.jsxs("div",{className:"business-info",children:[r.jsx("div",{className:"business-avatar",children:(J=s.company)!=null&&J.logoUrl?r.jsx("img",{src:s.company.logoUrl,alt:N,className:"business-logo"}):N.charAt(0)}),r.jsxs("div",{className:"business-details",children:[r.jsx("strong",{className:"business-name",children:N}),r.jsxs("span",{className:"business-username",children:["@",j]})]})]})}),r.jsx("div",{className:"post-image-container",onClick:()=>f(s),children:r.jsx("img",{src:s.imageUrl,alt:s.content||"Post image",className:"post-image"})}),r.jsx("div",{className:"post-engagement",children:r.jsxs("div",{className:"engagement-left",children:[r.jsx("button",{className:`like-btn ${s.isLiked?"liked":""}`,onClick:()=>o(s._id,c),children:r.jsx("span",{className:"material-icons",children:s.isLiked?"favorite":"favorite_border"})}),r.jsx("button",{className:"comment-btn",onClick:Z,children:r.jsx("span",{className:"material-icons",children:"chat_bubble_outline"})}),r.jsx("button",{className:"share-btn",onClick:()=>b(s),children:r.jsx("span",{className:"material-icons",children:"send"})})]})}),r.jsxs("div",{className:"post-content",children:[s.likes>0&&r.jsx("div",{className:"post-stats",children:r.jsxs("strong",{children:[s.likes.toLocaleString()," likes"]})}),r.jsxs("div",{className:"post-caption",children:[r.jsxs("strong",{className:"username",children:["@",j]}),r.jsx("span",{className:"caption-text",children:s.content||s.caption})]}),s.comments>0&&r.jsxs("button",{className:"view-comments",onClick:Z,children:["View all ",s.comments," comments"]}),A&&r.jsxs("div",{className:"comments-section",children:[I.map((Y,q)=>{var $;return r.jsxs("div",{className:"comment-item",children:[r.jsx("strong",{className:"comment-username",children:(($=Y.user)==null?void 0:$.name)||"User"}),r.jsx("span",{className:"comment-text",children:Y.text})]},q)}),r.jsxs("form",{onSubmit:W,className:"comment-form",children:[r.jsx("input",{type:"text",placeholder:"Add a comment...",value:h,onChange:Y=>S(Y.target.value),className:"comment-input",disabled:R}),r.jsx("button",{type:"submit",className:"comment-submit-btn",disabled:!h.trim()||R,children:R?"Posting...":"Post"})]})]}),r.jsx("div",{className:"post-date",children:V})]})]})},zb=`
.all-posts-page {
  max-width: 614px;
  margin: 0 auto;
  padding: 20px 0;
  background: #000000;
  min-height: 100vh;
}

.posts-feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-grid-item {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  overflow: hidden;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #000000;
}

.business-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.business-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.business-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.business-details {
  display: flex;
  flex-direction: column;
}

.business-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.business-username {
  font-size: 12px;
  color: #a8a8a8;
}

.post-image-container {
  cursor: pointer;
  background: #000000;
}

.post-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.post-engagement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #000000;
}

.engagement-left {
  display: flex;
  gap: 16px;
}

.like-btn, .comment-btn, .share-btn, .bookmark-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #ffffff;
}

.like-btn.liked .material-icons {
  color: #ed4956;
}

.material-icons {
  font-size: 24px;
  color: #ffffff;
  transition: transform 0.2s ease;
}

.material-icons:hover {
  transform: scale(1.1);
}

.post-content {
  padding: 0 16px 16px;
  background: #000000;
}

.post-stats {
  margin-bottom: 8px;
}

.post-stats strong {
  font-size: 14px;
  color: #ffffff;
}

.post-caption {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
  color: #ffffff;
}

.username {
  color: #ffffff;
  font-weight: 600;
  margin-right: 6px;
}

.caption-text {
  color: #ffffff;
}

.view-comments {
  background: none;
  border: none;
  color: #a8a8a8;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.view-comments:hover {
  color: #ffffff;
}

/* Comments Section */
.comments-section {
  margin: 12px 0;
  border-top: 1px solid #363636;
  padding-top: 12px;
}

.comment-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.comment-username {
  color: #ffffff;
  font-weight: 600;
}

.comment-text {
  color: #ffffff;
}

.comment-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.comment-input {
  flex: 1;
  background: #000000;
  border: 1px solid #363636;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
}

.comment-input::placeholder {
  color: #a8a8a8;
}

.comment-input:focus {
  outline: none;
  border-color: #0095f6;
}

.comment-submit-btn {
  background: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.comment-submit-btn:disabled {
  background: #363636;
  color: #a8a8a8;
  cursor: not-allowed;
}

.comment-submit-btn:not(:disabled):hover {
  opacity: 0.8;
}

.post-date {
  font-size: 10px;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 8px;
}

/* Tabs */
.tabs-container {
  border-bottom: 1px solid #363636;
  margin-bottom: 20px;
  background: #000000;
}

.tabs {
  display: flex;
  max-width: 614px;
  margin: 0 auto;
  background: #000000;
}

.tab {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #a8a8a8;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  background: #000000;
}

.tab.active {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.tab:hover {
  color: #ffffff;
  background: #121212;
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #a8a8a8;
  background: #000000;
}

.app-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background: #000000;
}

.text-default {
  color: #ffffff;
}

.app-error {
  flex-direction: column;
  gap: 12px;
  background: #000000;
}

.app-error p {
  color: #ffffff;
}

.retry-btn {
  padding: 8px 16px;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

/* Global body background */
body {
  background: #000000 !important;
  color: #ffffff !important;
}

/* Scrollbar styling for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #363636;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
`,uh=document.createElement("style");uh.innerText=zb;document.head.appendChild(uh);const Cb=({post:s,company:c,user:f})=>{var J;const o=c.name.toLowerCase().replace(/[\s.]/g,"_"),[m,b]=k.useState(s.likes||0),[p,N]=k.useState(s.comments||0),[j,h]=k.useState(""),[S,A]=k.useState(!1),[G,I]=k.useState(!1),[z,R]=k.useState([]),[D,V]=k.useState(!1);k.useEffect(()=>{const Y=async()=>{if(f!=null&&f._id&&s._id)try{const $=await de.get(`${Ae}/api/post/${s._id}/like-status/${f._id}`);A($.data.isLiked)}catch($){console.error("Error checking like status:",$)}},q=async()=>{if(s._id)try{const $=await de.get(`${Ae}/api/post/${s._id}/comments`);R($.data.comments||[])}catch($){console.error("Error loading comments:",$)}};Y(),q()},[f==null?void 0:f._id,s._id]);const Z=new Date(s.createdAt||s.date).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),W=s.mediaUrl||s.imageUrl,ae=async()=>{if(!(f!=null&&f._id)){alert("Please login to like posts");return}try{const Y=await de.post(`${Ae}/api/post/${s._id}/like`,{userId:f._id});b(Y.data.likesCount),A(Y.data.isLiked)}catch(Y){console.error("Error liking post:",Y)}},ie=async Y=>{if(Y.preventDefault(),!(!j.trim()||!s._id)){if(!(f!=null&&f._id)){alert("Please login to comment");return}V(!0);try{const q=await de.post(`${Ae}/api/post/${s._id}/comment`,{text:j,userId:f._id});N(q.data.commentsCount),h("");const $=await de.get(`${Ae}/api/post/${s._id}/comments`);R($.data.comments||[])}catch(q){console.error("Error commenting:",q)}finally{V(!1)}}},ue=async()=>{if(!G&&s._id)try{const Y=await de.get(`${Ae}/api/post/${s._id}/comments`);R(Y.data.comments||[])}catch(Y){console.error("Error loading comments:",Y)}I(!G)};return r.jsxs("article",{className:"post-grid-item",children:[r.jsx("div",{className:"post-header",children:r.jsxs("div",{className:"business-info",children:[r.jsx("div",{className:"business-avatar",children:((J=c.name)==null?void 0:J.charAt(0))||"B"}),r.jsxs("div",{className:"business-details",children:[r.jsx("strong",{className:"business-name",children:c.name||"Business Name"}),r.jsxs("span",{className:"business-username",children:["@",o]})]})]})}),r.jsx("div",{className:"post-image-container",children:r.jsx("img",{src:W,alt:s.content||s.caption||"Post image",className:"post-image"})}),r.jsx("div",{className:"post-engagement",children:r.jsxs("div",{className:"engagement-left",children:[r.jsx("button",{className:`like-btn ${S?"liked":""}`,onClick:ae,children:r.jsx("span",{className:"material-icons",children:S?"favorite":"favorite_border"})}),r.jsx("button",{className:"comment-btn",onClick:ue,children:r.jsx("span",{className:"material-icons",children:"chat_bubble_outline"})}),r.jsx("button",{className:"share-btn",children:r.jsx("span",{className:"material-icons",children:"send"})})]})}),r.jsxs("div",{className:"post-content",children:[m>0&&r.jsx("div",{className:"post-stats",children:r.jsxs("strong",{children:[m.toLocaleString()," likes"]})}),r.jsxs("div",{className:"post-caption",children:[r.jsxs("strong",{className:"username",children:["@",o]}),r.jsx("span",{className:"caption-text",children:s.content||s.caption})]}),p>0&&r.jsxs("button",{className:"view-comments",onClick:ue,children:["View all ",p," comments"]}),G&&r.jsxs("div",{className:"comments-section",children:[z.map((Y,q)=>{var $;return r.jsxs("div",{className:"comment-item",children:[r.jsx("strong",{className:"comment-username",children:(($=Y.user)==null?void 0:$.name)||"User"}),r.jsx("span",{className:"comment-text",children:Y.text})]},q)}),r.jsxs("form",{onSubmit:ie,className:"comment-form",children:[r.jsx("input",{type:"text",placeholder:"Add a comment...",value:j,onChange:Y=>h(Y.target.value),className:"comment-input",disabled:D}),r.jsx("button",{type:"submit",className:"comment-submit-btn",disabled:!j.trim()||D,children:D?"Posting...":"Post"})]})]}),r.jsx("div",{className:"post-date",children:Z})]})]})},wb=({data:s,onBack:c,user:f})=>r.jsx("div",{className:"post-detail-page",children:r.jsx("main",{className:"post-detail-content",children:r.jsx(Cb,{post:s.post,company:s.company,user:f})})}),Ob=`
.post-detail-page {
  background: #000000;
  min-height: 100vh;
  color: #ffffff;
}

.post-detail-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #363636;
  background: #000000;
  position: sticky;
  top: 0;
  z-index: 10;
}

.post-detail-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-left: 16px;
}

.back-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background: #363636;
}

.post-detail-content {
  max-width: 614px;
  margin: 0 auto;
  padding: 20px 0;
}

/* Ensure PostItem uses the same styles as PostGridItem */
.post-feed-item {
  background: #000000;
  border: 1px solid #363636;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.post-feed-item .post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #000000;
}

.post-feed-item .business-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.post-feed-item .business-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.post-feed-item .business-details {
  display: flex;
  flex-direction: column;
}

.post-feed-item .business-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.post-feed-item .business-username {
  font-size: 12px;
  color: #a8a8a8;
}

.post-feed-item .post-image-container {
  background: #000000;
}

.post-feed-item .post-image {
  width: 100%;
  height: auto;
  display: block;
}

.post-feed-item .post-engagement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #000000;
}

.post-feed-item .engagement-left {
  display: flex;
  gap: 16px;
}

.post-feed-item .like-btn,
.post-feed-item .comment-btn,
.post-feed-item .share-btn,
.post-feed-item .bookmark-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #ffffff;
}

.post-feed-item .like-btn.liked .material-icons {
  color: #ed4956;
}

.post-feed-item .material-icons {
  font-size: 24px;
  color: #ffffff;
  transition: transform 0.2s ease;
}

.post-feed-item .material-icons:hover {
  transform: scale(1.1);
}

.post-feed-item .post-content {
  padding: 0 16px 16px;
  background: #000000;
}

.post-feed-item .post-stats {
  margin-bottom: 8px;
}

.post-feed-item .post-stats strong {
  font-size: 14px;
  color: #ffffff;
}

.post-feed-item .post-caption {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
  color: #ffffff;
}

.post-feed-item .username {
  color: #ffffff;
  font-weight: 600;
  margin-right: 6px;
}

.post-feed-item .caption-text {
  color: #ffffff;
}

.post-feed-item .view-comments {
  background: none;
  border: none;
  color: #a8a8a8;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.post-feed-item .view-comments:hover {
  color: #ffffff;
}

.post-feed-item .comments-section {
  margin: 12px 0;
  border-top: 1px solid #363636;
  padding-top: 12px;
}

.post-feed-item .comment-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.post-feed-item .comment-username {
  color: #ffffff;
  font-weight: 600;
}

.post-feed-item .comment-text {
  color: #ffffff;
}

.post-feed-item .comment-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.post-feed-item .comment-input {
  flex: 1;
  background: #000000;
  border: 1px solid #363636;
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
}

.post-feed-item .comment-input::placeholder {
  color: #a8a8a8;
}

.post-feed-item .comment-input:focus {
  outline: none;
  border-color: #0095f6;
}

.post-feed-item .comment-submit-btn {
  background: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.post-feed-item .comment-submit-btn:disabled {
  background: #363636;
  color: #a8a8a8;
  cursor: not-allowed;
}

.post-feed-item .comment-submit-btn:not(:disabled):hover {
  opacity: 0.8;
}

.post-feed-item .post-date {
  font-size: 10px;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 8px;
}
`,ch=document.createElement("style");ch.innerText=Ob;document.head.appendChild(ch);const Rb=({company:s,onSelectPost:c,user:f})=>{const[o,m]=k.useState("Posts"),[b,p]=k.useState("All"),[N,j]=k.useState("All"),[h,S]=k.useState([]),[A,G]=k.useState([]),[I,z]=k.useState(!0),[R,D]=k.useState(""),[V,Z]=k.useState(parseInt(s.followers)||0),[W,ae]=k.useState(!1);k.useEffect(()=>{(async()=>{if(f!=null&&f._id&&s._id)try{const $=await de.get(`${Ae}/api/follow/${s._id}/status/${f._id}`);ae($.data.isFollowing)}catch($){console.error("Error checking follow status:",$)}})()},[f==null?void 0:f._id,s._id]),k.useEffect(()=>{(async()=>{try{z(!0);const[$,ee]=await Promise.all([fetch(`${Ae}/api/post/${s._id}`),fetch(`${Ae}/api/product/${s._id}`)]);if(!$.ok||!ee.ok)throw new Error("Failed to fetch data");const re=await $.json(),Te=await ee.json();S(re.posts||[]),G(Te.products||[]),D("")}catch($){console.error($),D("Error fetching company content. Please try again.")}finally{z(!1)}})()},[s._id]);const ie=async()=>{var q,$;if(!(f!=null&&f._id)){alert("Please login to follow companies");return}try{const ee=await de.post(`${Ae}/api/follow/${s._id}`,{userId:f._id});ee.data.success&&(Z(ee.data.followers),ae(ee.data.isFollowing))}catch(ee){console.error(ee),alert((($=(q=ee.response)==null?void 0:q.data)==null?void 0:$.message)||"An error occurred")}},ue=b==="All"?h:h.filter(q=>q.category===b),J=N==="All"?A:A.filter(q=>{var $;return($=q.tags)==null?void 0:$.map(ee=>ee.toLowerCase()).includes(N.toLowerCase())}),Y=["All","Offer","Giveaway"];return r.jsx("div",{className:"profile-page",children:r.jsxs("main",{className:"profile-content",children:[r.jsxs("section",{className:"profile-header",children:[r.jsx("img",{src:`${s.logoUrl}`,alt:s.name,className:"profile-logo"}),r.jsxs("div",{className:"profile-header-content",children:[r.jsx("h2",{className:"profile-name",children:s.name}),r.jsx("p",{className:"profile-description",children:s.description||"No description available."}),r.jsxs("div",{className:"profile-stats-grid",children:[r.jsxs("div",{className:"stat-item",children:[r.jsx("span",{className:"stat-number",children:h.length}),r.jsx("span",{className:"stat-label",children:"Posts"})]}),r.jsxs("div",{className:"stat-item",children:[r.jsx("span",{className:"stat-number",children:A.length}),r.jsx("span",{className:"stat-label",children:"Products"})]}),r.jsxs("div",{className:"stat-item",children:[r.jsx("span",{className:"stat-number",children:V}),r.jsx("span",{className:"stat-label",children:"Followers"})]}),r.jsxs("div",{className:"stat-item",children:[r.jsxs("span",{className:"stat-number",children:[s.engagementRate,"%"]}),r.jsx("span",{className:"stat-label",children:"Engagement"})]})]})]}),r.jsxs("div",{className:"profile-header-actions",children:[r.jsx("a",{href:s.siteUrl,target:"_blank",rel:"noopener noreferrer",className:"btn btn-outline",children:"Visit site"}),r.jsx("button",{className:`btn btn-solid ${W?"following":""}`,onClick:ie,children:W?"Unfollow":"Follow"})]})]}),r.jsx("hr",{className:"profile-divider"}),r.jsxs("nav",{className:"tabs profile-tabs",role:"tablist",children:[r.jsx("button",{className:`tab ${o==="Posts"?"active":""}`,onClick:()=>m("Posts"),children:"Posts"}),r.jsx("button",{className:`tab ${o==="Products"?"active":""}`,onClick:()=>m("Products"),"data-tab":"Products",children:"Products"})]}),I?r.jsx("p",{className:"text-center",children:"Loading..."}):R?r.jsx("p",{className:"text-center text-red-500",children:R}):r.jsxs(r.Fragment,{children:[o==="Posts"&&r.jsx("section",{className:"content-grid",children:ue.length>0?ue.map(q=>r.jsx("div",{className:"grid-item",onClick:()=>c(q),role:"button",children:r.jsx("img",{src:`${q.mediaUrl}`,alt:q.caption})},q._id)):r.jsx("p",{className:"text-center",children:"No posts yet."})}),o==="Products"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"product-tags flex gap-2 mb-4",children:Y.map(q=>r.jsx("button",{className:`tag-button ${N===q?"active":""}`,onClick:()=>j(q),children:q},q))}),r.jsx("section",{className:"content-grid",children:J.length>0?J.map(q=>r.jsx("div",{className:"grid-item product-item",children:r.jsxs("a",{href:q.productLink,target:"_blank",rel:"noopener noreferrer",children:[r.jsx("img",{src:`${q.image.url}`,alt:q.name,className:"product-image"}),r.jsx("div",{className:"product-info",children:r.jsxs("p",{className:"product-price",children:["₹",q.price]})})]})},q._id)):r.jsx("p",{className:"text-center",children:"No products yet."})})]})]})]})})},Ub=`
.app-footer {
  background: #000;
  border-top: 1px solid #222;
  padding: 1.5rem 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
}

.footer-logo .material-icons {
  font-size: 1.5rem;
  color: #00ff99;
}

.logo-text {
  background: linear-gradient(135deg, #00ff99, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
}

.footer-link:hover {
  color: #00ff99;
}

.footer-link.active {
  color: #00ff99;
  font-weight: 600;
}

.footer-business {
  margin-top: 0.5rem;
}

.business-registration-link {
  color: #00ccff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 1px solid #00ccff;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.business-registration-link:hover {
  background: #00ccff;
  color: #000;
}

/* Responsive Design */
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  
  .footer-links {
    gap: 2rem;
  }
  
  .footer-business {
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1rem 0.5rem;
  }
  
  .footer-links {
    gap: 1rem;
  }
  
  .footer-link {
    font-size: 0.85rem;
  }
  
  .business-registration-link {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}
`;if(typeof document<"u"){const s=document.createElement("style");s.textContent=Ub,document.head.appendChild(s)}const Db=({isOpen:s,onClose:c,onLogin:f,onOpenRegister:o})=>{const[m,b]=k.useState(""),[p,N]=k.useState(""),[j,h]=k.useState(""),[S,A]=k.useState(null),[G,I]=k.useState(""),[z,R]=k.useState(""),[D,V]=k.useState(""),[Z,W]=k.useState(!1);k.useEffect(()=>{s&&(b(""),N(""),h(""),A(null),I(""),R(""),V(""))},[s]);const ae=async q=>{var $,ee;q.preventDefault(),h(""),W(!0);try{const re=await de.post(`${Ae}/api/auth/login`,{email:m,password:p}),Te=re.data.user,Me=re.data.token,Xe={_id:Te._id,name:Te.name,email:Te.email,isLoggedIn:!0};localStorage.setItem("user",JSON.stringify(Xe)),Me&&localStorage.setItem("authToken",Me),f(Xe),b(""),N(""),h(""),c()}catch(re){h(((ee=($=re.response)==null?void 0:$.data)==null?void 0:ee.message)||"Login failed. Please try again.")}finally{W(!1)}},ie=async q=>{var $,ee;q.preventDefault(),W(!0),h("");try{(await de.post(`${Ae}/api/auth/check-email`,{email:G})).data.exists?(A("reset"),h("")):h("Email not found. Please check your email address.")}catch(re){h(((ee=($=re.response)==null?void 0:$.data)==null?void 0:ee.message)||"Error checking email. Please try again.")}finally{W(!1)}},ue=async q=>{var $,ee;if(q.preventDefault(),h(""),z!==D){h("Passwords do not match");return}if(z.length<6){h("Password must be at least 6 characters long");return}W(!0);try{await de.post(`${Ae}/api/auth/reset-password`,{email:G,newPassword:z}),h(""),alert("Password updated successfully. Please login with your new password."),A(null),I(""),R(""),V("")}catch(re){h(((ee=($=re.response)==null?void 0:$.data)==null?void 0:ee.message)||"Failed to reset password. Please try again.")}finally{W(!1)}},J=()=>{A(null),I(""),R(""),V(""),h("")},Y=()=>{c(),o()};return s?r.jsx("div",{className:"modal-overlay",children:r.jsxs("div",{className:"modal-content",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:S?S==="email"?"Forgot Password":"Reset Password":"Login"}),r.jsx("button",{onClick:c,className:"modal-close",children:r.jsx("span",{className:"material-icons",children:"close"})})]}),j&&r.jsx("div",{className:"error-message",children:j}),S?S==="email"?r.jsx(r.Fragment,{children:r.jsxs("form",{onSubmit:ie,className:"modal-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"forgot-email",children:"Enter your email"}),r.jsx("input",{id:"forgot-email",type:"email",value:G,onChange:q=>I(q.target.value),required:!0,disabled:Z,placeholder:"Enter your registered email"})]}),r.jsxs("div",{className:"forgot-password-buttons",children:[r.jsx("button",{type:"submit",className:"btn btn-solid",disabled:Z,children:Z?"Checking...":"Next"}),r.jsx("button",{type:"button",className:"btn btn-outline",onClick:J,disabled:Z,children:"Back to Login"})]})]})}):r.jsx(r.Fragment,{children:r.jsxs("form",{onSubmit:ue,className:"modal-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"new-password",children:"New Password"}),r.jsx("input",{id:"new-password",type:"password",value:z,onChange:q=>R(q.target.value),required:!0,disabled:Z,placeholder:"Enter new password",minLength:6})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"confirm-password",children:"Confirm Password"}),r.jsx("input",{id:"confirm-password",type:"password",value:D,onChange:q=>V(q.target.value),required:!0,disabled:Z,placeholder:"Confirm new password",minLength:6})]}),r.jsxs("div",{className:"forgot-password-buttons",children:[r.jsx("button",{type:"submit",className:"btn btn-solid",disabled:Z,children:Z?"Updating...":"Update Password"}),r.jsx("button",{type:"button",className:"btn btn-outline",onClick:J,disabled:Z,children:"Back to Login"})]})]})}):r.jsxs(r.Fragment,{children:[r.jsxs("form",{onSubmit:ae,className:"modal-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"login-email",children:"Email"}),r.jsx("input",{id:"login-email",type:"email",value:m,onChange:q=>b(q.target.value),required:!0,disabled:Z,placeholder:"Enter your email"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"login-password",children:"Password"}),r.jsx("input",{id:"login-password",type:"password",value:p,onChange:q=>N(q.target.value),required:!0,disabled:Z,placeholder:"Enter your password"})]}),r.jsx("button",{type:"submit",className:"btn btn-solid login-btn",disabled:Z,children:Z?"Logging in...":"Login"})]}),r.jsxs("div",{className:"modal-footer",children:[r.jsx("button",{type:"button",className:"footer-link",onClick:()=>A("email"),disabled:Z,children:"Forgot Password?"}),r.jsxs("div",{className:"register-section",children:[r.jsx("span",{children:"Don't have an account? "}),r.jsx("button",{type:"button",className:"footer-link register-link",onClick:Y,disabled:Z,children:"Register here"})]})]})]})]})}):null},Mb=({isOpen:s,onClose:c,onRegister:f,onOpenLogin:o})=>{const[m,b]=k.useState(""),[p,N]=k.useState(""),[j,h]=k.useState(""),[S,A]=k.useState([]),[G,I]=k.useState(""),[z,R]=k.useState([]),[D,V]=k.useState(!1),[Z,W]=k.useState(!1);k.useEffect(()=>{s&&(b(""),N(""),h(""),A([]),I(""),ae())},[s]);const ae=async()=>{try{V(!0);const Y=await de.get(`${Ae}/api/admin/categories`);R(Y.data)}catch(Y){console.error("Error fetching categories:",Y),I("Failed to load categories")}finally{V(!1)}},ie=async Y=>{var q,$;if(Y.preventDefault(),I(""),j.length<6){I("Password must be at least 6 characters long");return}if(S.length===0){I("Please select at least one interest");return}W(!0);try{const ee=await de.post(`${Ae}/api/auth/register`,{name:m,email:p,password:j,interests:S});if(!ee.data.success&&ee.data.message)throw new Error(ee.data.message);const re=ee.data.user||ee.data.data||ee.data,Te={_id:re._id,name:re.name,email:re.email,isLoggedIn:!1};localStorage.setItem("recentRegisteredUser",JSON.stringify(Te)),f(Te),b(""),N(""),h(""),A([]),I(""),c(),setTimeout(()=>{o()},300)}catch(ee){I((($=(q=ee.response)==null?void 0:q.data)==null?void 0:$.message)||ee.message||"Registration failed. Please try again.")}finally{W(!1)}},ue=Y=>{S.includes(Y)?A(S.filter(q=>q!==Y)):A([...S,Y])},J=()=>{c(),o()};return s?r.jsx("div",{className:"modal-overlay",children:r.jsxs("div",{className:"modal-content register-modal",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{children:"Create Account"}),r.jsx("button",{onClick:c,className:"modal-close",children:r.jsx("span",{className:"material-icons",children:"close"})})]}),G&&r.jsx("div",{className:"error-message",children:G}),r.jsxs("form",{onSubmit:ie,className:"modal-form",children:[r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"register-name",children:"Full Name"}),r.jsx("input",{id:"register-name",type:"text",value:m,onChange:Y=>b(Y.target.value),required:!0,disabled:Z,placeholder:"Enter your full name"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"register-email",children:"Email"}),r.jsx("input",{id:"register-email",type:"email",value:p,onChange:Y=>N(Y.target.value),required:!0,disabled:Z,placeholder:"Enter your email"})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{htmlFor:"register-password",children:"Password"}),r.jsx("input",{id:"register-password",type:"password",value:j,onChange:Y=>h(Y.target.value),required:!0,disabled:Z,placeholder:"Enter password (min. 6 characters)",minLength:6})]}),r.jsxs("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Select Interests"}),D?r.jsx("div",{className:"loading-text",children:"Loading categories..."}):z.length===0?r.jsx("div",{className:"no-categories-text",children:"No categories available"}):r.jsx("div",{className:"categories-section",children:z.map(Y=>r.jsxs("div",{className:"category-group",children:[r.jsxs("button",{type:"button",className:`category-btn ${S.includes(Y.name)?"active":""}`,onClick:()=>ue(Y.name),disabled:Z,children:[r.jsx("span",{className:"category-name",children:Y.name}),Y.subcategories&&Y.subcategories.length>0&&r.jsxs("span",{className:"subcount-badge",children:[Y.subcategories.length," subcategories"]})]}),Y.subcategories&&Y.subcategories.length>0&&r.jsx("div",{className:"subcategories-group",children:Y.subcategories.map(q=>r.jsx("button",{type:"button",className:`subcategory-btn ${S.includes(q.name)?"active":""}`,onClick:()=>ue(q.name),disabled:Z,children:q.name},q._id))})]},Y._id))}),S.length>0&&r.jsxs("div",{className:"selected-interests",children:[r.jsx("strong",{children:"Selected: "}),S.join(", ")]})]}),r.jsx("button",{type:"submit",className:"btn btn-solid register-btn",disabled:Z||D,children:Z?"Creating Account...":"Register"})]}),r.jsx("div",{className:"modal-footer",children:r.jsxs("div",{className:"login-section",children:[r.jsx("span",{children:"Already have an account? "}),r.jsx("button",{type:"button",className:"footer-link login-link",onClick:J,disabled:Z,children:"Login here"})]})})]})}):null},Bb=()=>{const[s,c]=k.useState(null),[f,o]=k.useState(null),[m,b]=k.useState("Home"),[p,N]=k.useState(null),[j,h]=k.useState(!1),[S,A]=k.useState(!1),[G,I]=k.useState(!1),[z,R]=k.useState([]),[D,V]=k.useState([]),[Z,W]=k.useState([]),[ae,ie]=k.useState([]),[ue,J]=k.useState(!1),[Y,q]=k.useState(""),[$,ee]=k.useState(!1);k.useEffect(()=>{const X=localStorage.getItem("user");if(X){const F=JSON.parse(X);N(F)}},[]),k.useEffect(()=>{(async()=>{try{const F=await hb();ie(F)}catch(F){console.error("Error loading all promotions:",F)}})()},[]),k.useEffect(()=>{(async()=>{try{const oe=await(await fetch(`${Ae}/api/business/all`)).json();if(Array.isArray(oe)){const we=(await Promise.all(oe.map(async(Le,bt)=>{try{const Lt=(await(await fetch(`${Ae}/api/product/${Le._id}`)).json()).products||[],Kl=(await(await fetch(`${Ae}/api/post/${Le._id}`)).json()).posts||[],Jl=Kl.reduce((Fe,Wl)=>Fe+(Wl.likes||0),0),$l=Kl.reduce((Fe,Wl)=>Fe+(Wl.comments||0),0),Fl=Jl+$l,In=parseInt(Le.followers)||1e3,zs=In>0?(Fl/In*100).toFixed(1):"0.0";return{_id:Le._id,rank:bt+1,name:Le.businessName||"Unnamed Business",description:Le.businessDescription||"No description available",followers:Le.followers||Math.floor(Math.random()*5e3).toString(),trend:"Rising",siteUrl:Le.businessWebsite||"#",logoUrl:Le.businessLogo||"https://placehold.co/100x100?text=No+Logo",posts:[],postCategories:["All"],products:Lt,productCategories:["All",...new Set(Lt.map(Fe=>Fe.category))],totalPosts:0,totalProducts:Lt.length,engagementRate:zs}}catch(Jt){return console.error(`Error loading company ${Le._id}:`,Jt),null}}))).filter(Boolean);V(we);const _e=[];we.forEach(Le=>{Le.products.forEach(bt=>{_e.push({...bt,companyId:Le._id,companyName:Le.name})})}),W(_e)}}catch(F){console.error("Error loading search data:",F)}})()},[]);const re=k.useCallback(async X=>{const F=X.toLowerCase().trim();if(q(X),!F){R([]),ee(!1);return}ee(!0),await new Promise(oe=>setTimeout(oe,300));try{const oe=D.filter(_e=>_e.name.toLowerCase().includes(F)||_e.description.toLowerCase().includes(F)).map(_e=>({id:_e._id,name:_e.name,type:"company",imageUrl:_e.logoUrl})),ke=Z.filter(_e=>{var Le,bt;return((Le=_e.name)==null?void 0:Le.toLowerCase().includes(F))||_e.category.toLowerCase().includes(F)||((bt=_e.tags)==null?void 0:bt.some(Jt=>Jt.toLowerCase().includes(F)))}).map(_e=>({id:_e._id||`product-${Math.random()}`,name:_e.name||_e.category,type:"product",companyId:_e.companyId,companyName:_e.companyName,imageUrl:_e.imageUrl,price:_e.price})),we=[...oe,...ke];R(we)}catch(oe){console.error("Search error:",oe),R([])}finally{ee(!1)}},[D,Z]),Te=X=>{if(X.type==="company"){const F=D.find(oe=>oe._id===X.id);F&&(c(F),b("Home"),o(null),J(!1))}else if(X.type==="product"&&X.companyId){const F=D.find(oe=>oe._id===X.companyId);F&&(c(F),b("Home"),o(null),J(!1),setTimeout(()=>{const oe=document.querySelector('.tab[data-tab="Products"]');oe&&oe.click()},100))}},Me=()=>{J(!0),q(""),R([])},Xe=()=>{J(!1),q(""),R([])},O=X=>{N(X)},M=X=>{N(X)},Q=()=>{N(null),localStorage.removeItem("user"),localStorage.removeItem("authToken"),le("Home")},le=X=>{b(X),c(null),o(null),J(!1)},fe=()=>{p!=null&&p.isLoggedIn?(b("Profile"),c(null),o(null),J(!1)):h(!0)},g=()=>{I(!G)},U=X=>{console.log("Claiming offer:",X),X.targetUrl&&window.open(X.targetUrl,"_blank"),alert(`Offer claimed! ${X.discountCode?`Use code: ${X.discountCode}`:X.couponCode?`Use code: ${X.couponCode}`:""}`)},K=()=>ue?null:f?r.jsx(Xl,{title:"Post",onBack:()=>o(null)}):s?r.jsx(Xl,{title:"Profile",onBack:()=>c(null)}):m==="Profile"?r.jsx(Xl,{title:"My Profile",onBack:()=>le("Home")}):m==="About"?r.jsx(Xl,{title:"About Us",onBack:()=>le("Home")}):m==="Posts"?r.jsx(Xl,{title:"Posts",onBack:()=>le("Home")}):r.jsx(Xl,{user:p||void 0,onLogin:()=>h(!0),onLogout:Q,onRegister:()=>A(!0),onMenuToggle:g,isMenuOpen:G,onSearchClick:Me,onProfileClick:fe}),P=()=>{if(ue)return r.jsx(bb,{searchQuery:Y,searchResults:z,onSelectSearchResult:Te,onSearchChange:re,onBack:Xe,loading:$});if(f)return r.jsx(wb,{data:f,onBack:()=>o(null),user:p||void 0});if(s)return r.jsx(Rb,{company:s,onSelectPost:X=>o({post:X,company:s}),user:p||void 0});switch(m){case"Profile":return p?r.jsx(yb,{user:p,onBack:()=>le("Home"),onSelectCompany:X=>c(X),onLogout:Q,allCompanies:D}):r.jsx("div",{className:"p-4 text-center",children:"Please log in to view your profile."});case"Posts":return r.jsx(Tb,{onSelectPost:X=>{const F=D.find(ke=>ke._id===X.businessId),oe={_id:X.businessId||"unknown",rank:0,name:(F==null?void 0:F.name)||"Company",description:(F==null?void 0:F.description)||"",followers:(F==null?void 0:F.followers)||"0",trend:"",siteUrl:(F==null?void 0:F.siteUrl)||"#",logoUrl:(F==null?void 0:F.logoUrl)||"",posts:[],postCategories:[],products:[],productCategories:[],engagementRate:(F==null?void 0:F.engagementRate)||"0.0"};o({post:X,company:oe})},user:p||void 0});case"About":return r.jsx(Ab,{});case"Home":default:return r.jsxs(r.Fragment,{children:[r.jsx(jb,{}),r.jsx(Sb,{onSelectCompany:X=>c(X),user:p||void 0,allPromotions:ae,onClaimOffer:U})]})}};return r.jsxs("div",{className:"app-container",children:[!ue&&r.jsxs("nav",{className:"app-nav mobile-only",children:[r.jsxs("a",{href:"#",className:`nav-item ${m==="Home"?"active":""}`,onClick:X=>{X.preventDefault(),le("Home")},children:[r.jsx("span",{className:"material-icons",children:"home"}),r.jsx("span",{className:"nav-text",children:"Home"})]}),r.jsxs("a",{href:"#",className:`nav-item ${m==="Posts"?"active":""}`,onClick:X=>{X.preventDefault(),le("Posts")},children:[r.jsx("span",{className:"material-icons",children:"article"}),r.jsx("span",{className:"nav-text",children:"Posts"})]}),p&&r.jsxs("a",{href:"#",className:`nav-item ${m==="Profile"?"active":""}`,onClick:X=>{X.preventDefault(),fe()},children:[r.jsx("span",{className:"material-icons",children:"account_circle"}),r.jsx("span",{className:"nav-text",children:"My Profile"})]})]}),r.jsxs("div",{className:"main-column",children:[K(),r.jsx(Eb,{isOpen:G,onClose:()=>I(!1),activePage:m,onNavClick:le,user:p||void 0,onLogin:()=>{h(!0),I(!1)},onRegister:()=>{A(!0),I(!1)},onLogout:Q,onProfileClick:fe}),r.jsx("div",{className:"main-wrapper",children:P()})]}),r.jsx(Db,{isOpen:j,onClose:()=>h(!1),onLogin:O,onOpenRegister:()=>{h(!1),A(!0)}}),r.jsx(Mb,{isOpen:S,onClose:()=>A(!1),onRegister:M,onOpenLogin:()=>{A(!1),h(!0)}})]})},Hb=`
.promotion-banner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.promotion-banner:hover {
  transform: translateY(-2px);
}

.banner-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.banner-content {
  display: flex;
  align-items: center;
  padding: 16px;
  color: white;
}

.banner-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
}

.banner-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.banner-info p {
  margin: 0 0 8px 0;
  font-size: 14px;
  opacity: 0.9;
}

.discount-code {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.promotion-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.promotion-popup-content {
  background: white;
  border-radius: 16px;
  max-width: 450px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: popupEnter 0.3s ease-out;
}

.promotion-popup-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.promotion-popup-body {
  padding: 20px;
  text-align: center;
  color: #333;
}

.promotion-popup-body h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
}

.promotion-popup-body p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.5;
}

.promotion-popup-claim-btn {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
}

@keyframes popupEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

`;if(typeof document<"u"){const s=document.createElement("style");s.textContent=Hb,document.head.appendChild(s)}const Dm=document.getElementById("root");Dm&&L0.createRoot(Dm).render(r.jsx(Bb,{}));
