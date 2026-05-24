import{b as e,f as t,i as n,m as r,n as i,p as a,u as o,x as s,y as c}from"./index-H_rnZJRX.js";import{t as l}from"./usePageActive-CHNhT3mj.js";import{t as u}from"./ViewContainer-BjVLypI7.js";import{t as d}from"./ArrowButton-qLw2ONOY.js";var f=e(),p=s(c(),1),m,h,g,_,v,y,b,x,S=`transform`,C=S+`Origin`,w,T=function(e){var t=e.ownerDocument||e;for(!(S in e.style)&&(`msTransform`in e.style)&&(S=`msTransform`,C=S+`Origin`);t.parentNode&&(t=t.parentNode););if(h=window,b=new re,t){m=t,g=t.documentElement,_=t.body,x=m.createElementNS(`http://www.w3.org/2000/svg`,`g`),x.style.transform=`none`;var n=t.createElement(`div`),r=t.createElement(`div`),i=t&&(t.body||t.firstElementChild);i&&i.appendChild&&(i.appendChild(n),n.appendChild(r),n.style.position=`static`,n.style.transform=`translate3d(0,0,1px)`,w=r.offsetParent!==n,i.removeChild(n))}return t},E=function(e){for(var t,n;e&&e!==_;)n=e._gsap,n&&n.uncache&&n.get(e,`x`),n&&!n.scaleX&&!n.scaleY&&n.renderTransform&&(n.scaleX=n.scaleY=1e-4,n.renderTransform(1,n),t?t.push(n):t=[n]),e=e.parentNode;return t},D=[],O=[],k=function(){return h.pageYOffset||m.scrollTop||g.scrollTop||_.scrollTop||0},A=function(){return h.pageXOffset||m.scrollLeft||g.scrollLeft||_.scrollLeft||0},j=function(e){return e.ownerSVGElement||((e.tagName+``).toLowerCase()===`svg`?e:null)},M=function e(t){if(h.getComputedStyle(t).position===`fixed`)return!0;if(t=t.parentNode,t&&t.nodeType===1)return e(t)},N=function e(t,n){if(t.parentNode&&(m||T(t))){var r=j(t),i=r?r.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`:`http://www.w3.org/1999/xhtml`,a=r?n?`rect`:`g`:`div`,o=n===2?100:0,s=n===3?100:0,c={position:`absolute`,display:`block`,pointerEvents:`none`,margin:`0`,padding:`0`},l=m.createElementNS?m.createElementNS(i.replace(/^https/,`http`),a):m.createElement(a);return n&&(r?(y||=e(t),l.setAttribute(`width`,.01),l.setAttribute(`height`,.01),l.setAttribute(`transform`,`translate(`+o+`,`+s+`)`),l.setAttribute(`fill`,`transparent`),y.appendChild(l)):(v||(v=e(t),Object.assign(v.style,c)),Object.assign(l.style,c,{width:`0.1px`,height:`0.1px`,top:s+`px`,left:o+`px`}),v.appendChild(l))),l}throw`Need document and parent.`},ee=function(e){for(var t=new re,n=0;n<e.numberOfItems;n++)t.multiply(e.getItem(n).matrix);return t},te=function(e){var t=e.getCTM(),n;return t||(n=e.style[S],e.style[S]=`none`,e.appendChild(x),t=x.getCTM(),e.removeChild(x),n?e.style[S]=n:e.style.removeProperty(S.replace(/([A-Z])/g,`-$1`).toLowerCase())),t||b.clone()},ne=function(e,t){var n=j(e),r=e===n,i=n?D:O,a=e.parentNode,o=a&&!n&&a.shadowRoot&&a.shadowRoot.appendChild?a.shadowRoot:a,s,c,l,u,d,f;if(e===h)return e;if(i.length||i.push(N(e,1),N(e,2),N(e,3)),s=n?y:v,n)r?(l=te(e),u=-l.e/l.a,d=-l.f/l.d,c=b):e.getBBox?(l=e.getBBox(),c=e.transform?e.transform.baseVal:{},c=c.numberOfItems?c.numberOfItems>1?ee(c):c.getItem(0).matrix:b,u=c.a*l.x+c.c*l.y,d=c.b*l.x+c.d*l.y):(c=new re,u=d=0),t&&e.tagName.toLowerCase()===`g`&&(u=d=0),(r||!e.getBoundingClientRect().width?n:a).appendChild(s),s.setAttribute(`transform`,`matrix(`+c.a+`,`+c.b+`,`+c.c+`,`+c.d+`,`+(c.e+u)+`,`+(c.f+d)+`)`);else{if(u=d=0,w)for(c=e.offsetParent,l=e;(l&&=l.parentNode)&&l!==c&&l.parentNode;)(h.getComputedStyle(l)[S]+``).length>4&&(u=l.offsetLeft,d=l.offsetTop,l=0);if(f=h.getComputedStyle(e),f.position!==`absolute`&&f.position!==`fixed`)for(c=e.offsetParent;a&&a!==c;)u+=a.scrollLeft||0,d+=a.scrollTop||0,a=a.parentNode;l=s.style,l.top=e.offsetTop-d+`px`,l.left=e.offsetLeft-u+`px`,l[S]=f[S],l[C]=f[C],l.position=f.position===`fixed`?`fixed`:`absolute`,o.appendChild(s)}return s},P=function(e,t,n,r,i,a,o){return e.a=t,e.b=n,e.c=r,e.d=i,e.e=a,e.f=o,e},re=function(){function e(e,t,n,r,i,a){e===void 0&&(e=1),t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=1),i===void 0&&(i=0),a===void 0&&(a=0),P(this,e,t,n,r,i,a)}var t=e.prototype;return t.inverse=function(){var e=this.a,t=this.b,n=this.c,r=this.d,i=this.e,a=this.f,o=e*r-t*n||1e-10;return P(this,r/o,-t/o,-n/o,e/o,(n*a-r*i)/o,-(e*a-t*i)/o)},t.multiply=function(e){var t=this.a,n=this.b,r=this.c,i=this.d,a=this.e,o=this.f,s=e.a,c=e.c,l=e.b,u=e.d,d=e.e,f=e.f;return P(this,s*t+l*r,s*n+l*i,c*t+u*r,c*n+u*i,a+d*t+f*r,o+d*n+f*i)},t.clone=function(){return new e(this.a,this.b,this.c,this.d,this.e,this.f)},t.equals=function(e){var t=this.a,n=this.b,r=this.c,i=this.d,a=this.e,o=this.f;return t===e.a&&n===e.b&&r===e.c&&i===e.d&&a===e.e&&o===e.f},t.apply=function(e,t){t===void 0&&(t={});var n=e.x,r=e.y,i=this.a,a=this.b,o=this.c,s=this.d,c=this.e,l=this.f;return t.x=n*i+r*o+c||0,t.y=n*a+r*s+l||0,t},e}();function ie(e,t,n,r){if(!e||!e.parentNode||(m||T(e)).documentElement===e)return new re;var i=E(e),a=j(e)?D:O,o=ne(e,n),s=a[0].getBoundingClientRect(),c=a[1].getBoundingClientRect(),l=a[2].getBoundingClientRect(),u=o.parentNode,d=!r&&M(e),f=new re((c.left-s.left)/100,(c.top-s.top)/100,(l.left-s.left)/100,(l.top-s.top)/100,s.left+(d?0:A()),s.top+(d?0:k()));if(u.removeChild(o),i)for(s=i.length;s--;)c=i[s],c.scaleX=c.scaleY=0,c.renderTransform(1,c);return t?f.inverse():f}function ae(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function F(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var I,L,oe,se,R,z,ce,le,ue,de,B,fe,pe,me,he,ge,_e,ve,ye,be,xe=0,Se=function(){return typeof window<`u`},V=function(){return I||Se()&&(I=window.gsap)&&I.registerPlugin&&I},Ce=function(e){return typeof e==`function`},we=function(e){return typeof e==`object`},Te=function(e){return e===void 0},Ee=function(){return!1},De=`transform`,Oe=`transformOrigin`,H=function(e){return Math.round(e*1e4)/1e4},ke=Array.isArray,Ae=function(e,t){var n=oe.createElementNS?oe.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):oe.createElement(e);return n.style?n:oe.createElement(e)},je=180/Math.PI,Me=0x56bc75e2d63100000,Ne=new re,Pe=Date.now||function(){return new Date().getTime()},U=[],Fe={},Ie=0,Le=/^(?:a|input|textarea|button|select)$/i,Re=0,ze={},Be={},Ve=function(e,t){var n={},r;for(r in e)n[r]=t?e[r]*t:e[r];return n},He=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ue=function e(t,n){for(var r=t.length,i;r--;)n?t[r].style.touchAction=n:t[r].style.removeProperty(`touch-action`),i=t[r].children,i&&i.length&&e(i,n)},W=function(){return U.forEach(function(e){return e()})},We=function(e){U.push(e),U.length===1&&I.ticker.add(W)},G=function(){return!U.length&&I.ticker.remove(W)},Ge=function(e){for(var t=U.length;t--;)U[t]===e&&U.splice(t,1);I.to(G,{overwrite:!0,delay:15,duration:0,onComplete:G,data:`_draggable`})},Ke=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},K=function(e,t,n,r){if(e.addEventListener){var i=pe[t];r||=B?{passive:!1}:null,e.addEventListener(i||t,n,r),i&&t!==i&&e.addEventListener(t,n,r)}},q=function(e,t,n,r){if(e.removeEventListener){var i=pe[t];e.removeEventListener(i||t,n,r),i&&t!==i&&e.removeEventListener(t,n,r)}},qe=function(e){e.preventDefault&&e.preventDefault(),e.preventManipulation&&e.preventManipulation()},Je=function(e,t){for(var n=e.length;n--;)if(e[n].identifier===t)return!0},J=function e(t){me=t.touches&&xe<t.touches.length,q(t.target,`touchend`,e)},Ye=function(e){me=e.touches&&xe<e.touches.length,K(e.target,`touchend`,J)},Xe=function(e){return L.pageYOffset||e.scrollTop||e.documentElement.scrollTop||e.body.scrollTop||0},Ze=function(e){return L.pageXOffset||e.scrollLeft||e.documentElement.scrollLeft||e.body.scrollLeft||0},Qe=function e(t,n){K(t,`scroll`,n),et(t.parentNode)||e(t.parentNode,n)},$e=function e(t,n){q(t,`scroll`,n),et(t.parentNode)||e(t.parentNode,n)},et=function(e){return!e||e===se||e.nodeType===9||e===oe.body||e===L||!e.nodeType||!e.parentNode},Y=function(e,t){var n=t===`x`?`Width`:`Height`,r=`scroll`+n,i=`client`+n;return Math.max(0,et(e)?Math.max(se[r],R[r])-(L[`inner`+n]||se[i]||R[i]):e[r]-e[i])},tt=function e(t,n){var r=Y(t,`x`),i=Y(t,`y`);et(t)?t=Be:e(t.parentNode,n),t._gsMaxScrollX=r,t._gsMaxScrollY=i,n||(t._gsScrollX=t.scrollLeft||0,t._gsScrollY=t.scrollTop||0)},nt=function(e,t,n){var r=e.style;r&&(Te(r[t])&&(t=ue(t,e)||t),n==null?r.removeProperty&&r.removeProperty(t.replace(/([A-Z])/g,`-$1`).toLowerCase()):r[t]=n)},rt=function(e){return L.getComputedStyle(e instanceof Element?e:e.host||(e.parentNode||{}).host||e)},it={},at=function(e){if(e===L)return it.left=it.top=0,it.width=it.right=se.clientWidth||e.innerWidth||R.clientWidth||0,it.height=it.bottom=(e.innerHeight||0)-20<se.clientHeight?se.clientHeight:e.innerHeight||R.clientHeight||0,it;var t=e.ownerDocument||oe,n=Te(e.pageX)?!e.nodeType&&!Te(e.left)&&!Te(e.top)?e:de(e)[0].getBoundingClientRect():{left:e.pageX-Ze(t),top:e.pageY-Xe(t),right:e.pageX-Ze(t)+1,bottom:e.pageY-Xe(t)+1};return Te(n.right)&&!Te(n.width)?(n.right=n.left+n.width,n.bottom=n.top+n.height):Te(n.width)&&(n={width:n.right-n.left,height:n.bottom-n.top,right:n.right,left:n.left,bottom:n.bottom,top:n.top}),n},X=function(e,t,n){var r=e.vars,i=r[n],a=e._listeners[t],o;return Ce(i)&&(o=i.apply(r.callbackScope||e,r[n+`Params`]||[e.pointerEvent])),a&&e.dispatchEvent(t)===!1&&(o=!1),o},ot=function(e,t){var n=de(e)[0],r,i,a;return!n.nodeType&&n!==L?Te(e.left)?(i=e.min||e.minX||e.minRotation||0,r=e.min||e.minY||0,{left:i,top:r,width:(e.max||e.maxX||e.maxRotation||0)-i,height:(e.max||e.maxY||0)-r}):(a={x:0,y:0},{left:e.left-a.x,top:e.top-a.y,width:e.width,height:e.height}):ct(n,t)},st={},ct=function(e,t){t=de(t)[0];var n=e.getBBox&&e.ownerSVGElement,r=e.ownerDocument||oe,i,a,o,s,c,l,u,d,f,p,m,h,g;if(e===L)o=Xe(r),i=Ze(r),a=i+(r.documentElement.clientWidth||e.innerWidth||r.body.clientWidth||0),s=o+((e.innerHeight||0)-20<r.documentElement.clientHeight?r.documentElement.clientHeight:e.innerHeight||r.body.clientHeight||0);else if(t===L||Te(t))return e.getBoundingClientRect();else i=o=0,n?(p=e.getBBox(),m=p.width,h=p.height):(e.viewBox&&(p=e.viewBox.baseVal)&&(i=p.x||0,o=p.y||0,m=p.width,h=p.height),m||(g=rt(e),p=g.boxSizing===`border-box`,m=(parseFloat(g.width)||e.clientWidth||0)+(p?0:parseFloat(g.borderLeftWidth)+parseFloat(g.borderRightWidth)),h=(parseFloat(g.height)||e.clientHeight||0)+(p?0:parseFloat(g.borderTopWidth)+parseFloat(g.borderBottomWidth)))),a=m,s=h;return e===t?{left:i,top:o,width:a-i,height:s-o}:(c=ie(t,!0).multiply(ie(e)),l=c.apply({x:i,y:o}),u=c.apply({x:a,y:o}),d=c.apply({x:a,y:s}),f=c.apply({x:i,y:s}),i=Math.min(l.x,u.x,d.x,f.x),o=Math.min(l.y,u.y,d.y,f.y),{left:i,top:o,width:Math.max(l.x,u.x,d.x,f.x)-i,height:Math.max(l.y,u.y,d.y,f.y)-o})},lt=function(e,t,n,r,i,a){var o={},s,c,l;if(t)if(i!==1&&t instanceof Array){if(o.end=s=[],l=t.length,we(t[0]))for(c=0;c<l;c++)s[c]=Ve(t[c],i);else for(c=0;c<l;c++)s[c]=t[c]*i;n+=1.1,r-=1.1}else Ce(t)?o.end=function(n){var r=t.call(e,n),a,o;if(i!==1)if(we(r)){for(o in a={},r)a[o]=r[o]*i;r=a}else r*=i;return r}:o.end=t;return(n||n===0)&&(o.max=n),(r||r===0)&&(o.min=r),a&&(o.velocity=0),o},ut=function e(t){var n;return!t||!t.getAttribute||t===R?!1:(n=t.getAttribute(`data-clickable`))===`true`||n!==`false`&&(Le.test(t.nodeName+``)||t.getAttribute(`contentEditable`)===`true`)?!0:e(t.parentNode)},dt=function(e,t){for(var n=e.length,r;n--;)r=e[n],r.ondragstart=r.onselectstart=t?null:Ee,I.set(r,{lazy:!0,userSelect:t?`text`:`none`})},ft=function e(t){if(rt(t).position===`fixed`)return!0;if(t=t.parentNode,t&&t.nodeType===1)return e(t)},pt,Z,mt=function(e,t){e=I.utils.toArray(e)[0],t||={};var n=document.createElement(`div`),r=n.style,i=e.firstChild,a=0,o=0,s=e.scrollTop,c=e.scrollLeft,l=e.scrollWidth,u=e.scrollHeight,d=0,f=0,p=0,m,h,g,_,v,y;pt&&t.force3D!==!1?(v=`translate3d(`,y=`px,0px)`):De&&(v=`translate(`,y=`px)`),this.scrollTop=function(e,t){if(!arguments.length)return-this.top();this.top(-e,t)},this.scrollLeft=function(e,t){if(!arguments.length)return-this.left();this.left(-e,t)},this.left=function(n,i){if(!arguments.length)return-(e.scrollLeft+o);var s=e.scrollLeft-c,l=o;if((s>2||s<-2)&&!i){c=e.scrollLeft,I.killTweensOf(this,{left:1,scrollLeft:1}),this.left(-c),t.onKill&&t.onKill();return}n=-n,n<0?(o=n-.5|0,n=0):n>f?(o=n-f|0,n=f):o=0,(o||l)&&(this._skip||(r[De]=v+-o+`px,`+-a+y),o+d>=0&&(r.paddingRight=o+d+`px`)),e.scrollLeft=n|0,c=e.scrollLeft},this.top=function(n,i){if(!arguments.length)return-(e.scrollTop+a);var c=e.scrollTop-s,l=a;if((c>2||c<-2)&&!i){s=e.scrollTop,I.killTweensOf(this,{top:1,scrollTop:1}),this.top(-s),t.onKill&&t.onKill();return}n=-n,n<0?(a=n-.5|0,n=0):n>p?(a=n-p|0,n=p):a=0,(a||l)&&(this._skip||(r[De]=v+-o+`px,`+-a+y)),e.scrollTop=n|0,s=e.scrollTop},this.maxScrollTop=function(){return p},this.maxScrollLeft=function(){return f},this.disable=function(){for(i=n.firstChild;i;)_=i.nextSibling,e.appendChild(i),i=_;e===n.parentNode&&e.removeChild(n)},this.enable=function(){if(i=e.firstChild,i!==n){for(;i;)_=i.nextSibling,n.appendChild(i),i=_;e.appendChild(n),this.calibrate()}},this.calibrate=function(t){var i=e.clientWidth===m,_,v,y;s=e.scrollTop,c=e.scrollLeft,!(i&&e.clientHeight===h&&n.offsetHeight===g&&l===e.scrollWidth&&u===e.scrollHeight&&!t)&&((a||o)&&(v=this.left(),y=this.top(),this.left(-e.scrollLeft),this.top(-e.scrollTop)),_=rt(e),(!i||t)&&(r.display=`block`,r.width=`auto`,r.paddingRight=`0px`,d=Math.max(0,e.scrollWidth-e.clientWidth),d&&(d+=parseFloat(_.paddingLeft)+(Z?parseFloat(_.paddingRight):0))),r.display=`inline-block`,r.position=`relative`,r.overflow=`visible`,r.verticalAlign=`top`,r.boxSizing=`content-box`,r.width=`100%`,r.paddingRight=d+`px`,Z&&(r.paddingBottom=_.paddingBottom),m=e.clientWidth,h=e.clientHeight,l=e.scrollWidth,u=e.scrollHeight,f=e.scrollWidth-m,p=e.scrollHeight-h,g=n.offsetHeight,r.display=`block`,(v||y)&&(this.left(v),this.top(y)))},this.content=n,this.element=e,this._skip=!1,this.enable()},ht=function(e){if(Se()&&document.body){var t=window&&window.navigator;L=window,oe=document,se=oe.documentElement,R=oe.body,z=Ae(`div`),ve=!!window.PointerEvent,ce=Ae(`div`),ce.style.cssText=`visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab`,_e=ce.style.cursor===`grab`?`grab`:`move`,he=t&&t.userAgent.toLowerCase().indexOf(`android`)!==-1,fe=`ontouchstart`in se&&`orientation`in L||t&&(t.MaxTouchPoints>0||t.msMaxTouchPoints>0),Z=function(){var e=Ae(`div`),t=Ae(`div`),n=t.style,r=R,i;return n.display=`inline-block`,n.position=`relative`,e.style.cssText=`width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden`,e.appendChild(t),r.appendChild(e),i=t.offsetHeight+18>e.scrollHeight,r.removeChild(e),i}(),pe=function(e){for(var t=e.split(`,`),n=(`onpointerdown`in z?`pointerdown,pointermove,pointerup,pointercancel`:`onmspointerdown`in z?`MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel`:e).split(`,`),r={},i=4;--i>-1;)r[t[i]]=n[i],r[n[i]]=t[i];try{se.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:function(){B=1}}))}catch{}return r}(`touchstart,touchmove,touchend,touchcancel`),K(oe,`touchcancel`,Ee),K(L,`touchmove`,Ee),R&&R.addEventListener(`touchstart`,Ee),K(oe,`contextmenu`,function(){for(var e in Fe)Fe[e].isPressed&&Fe[e].endDrag()}),I=le=V()}I?(ge=I.plugins.inertia,ye=I.core.context||function(){},ue=I.utils.checkPrefix,De=ue(De),Oe=ue(Oe),de=I.utils.toArray,be=I.core.getStyleSaver,pt=!!ue(`perspective`)):e&&console.warn(`Please gsap.registerPlugin(Draggable)`)},gt=function(e){F(t,e);function t(n,r){var i=e.call(this)||this;le||ht(1),n=de(n)[0],i.styles=be&&be(n,`transform,left,top`),ge||=I.plugins.inertia,i.vars=r=Ve(r||{}),i.target=n,i.x=i.y=i.rotation=0,i.dragResistance=parseFloat(r.dragResistance)||0,i.edgeResistance=isNaN(r.edgeResistance)?1:parseFloat(r.edgeResistance)||0,i.lockAxis=r.lockAxis,i.autoScroll=r.autoScroll||0,i.lockedAxis=null,i.allowEventDefault=!!r.allowEventDefault,I.getProperty(n,`x`);var a=(r.type||`x,y`).toLowerCase(),o=~a.indexOf(`x`)||~a.indexOf(`y`),s=a.indexOf(`rotation`)!==-1,c=s?`rotation`:o?`x`:`left`,l=o?`y`:`top`,u=!!(~a.indexOf(`x`)||~a.indexOf(`left`)||a===`scroll`),d=!!(~a.indexOf(`y`)||~a.indexOf(`top`)||a===`scroll`),f=r.minimumMovement||2,p=ae(i),m=de(r.trigger||r.handle||n),h={},g=0,_=!1,v=r.autoScrollMarginTop||40,y=r.autoScrollMarginRight||40,b=r.autoScrollMarginBottom||40,x=r.autoScrollMarginLeft||40,S=r.clickableTest||ut,C=0,w=n._gsap||I.core.getCache(n),T=ft(n),E=function(e,t){return parseFloat(w.get(n,e,t))},D=n.ownerDocument||oe,O,k,A,j,M,N,ee,te,ne,P,F,R,z,ue,B,Se,V,Ee,De,Ae,U,Le,W,G,Ke,J,Y,it,ct,pt,Z,gt,Q,_t=function(e){return qe(e),e.stopImmediatePropagation&&e.stopImmediatePropagation(),!1},vt=function e(t){if(p.autoScroll&&p.isDragging&&(_||V)){var r=n,i=p.autoScroll*15,a,c,l,f,m,h,g,S;for(_=!1,Be.scrollTop=L.pageYOffset==null?D.documentElement.scrollTop==null?D.body.scrollTop:D.documentElement.scrollTop:L.pageYOffset,Be.scrollLeft=L.pageXOffset==null?D.documentElement.scrollLeft==null?D.body.scrollLeft:D.documentElement.scrollLeft:L.pageXOffset,f=p.pointerX-Be.scrollLeft,m=p.pointerY-Be.scrollTop;r&&!c;)c=et(r.parentNode),a=c?Be:r.parentNode,l=c?{bottom:Math.max(se.clientHeight,L.innerHeight||0),right:Math.max(se.clientWidth,L.innerWidth||0),left:0,top:0}:a.getBoundingClientRect(),h=g=0,d&&(S=a._gsMaxScrollY-a.scrollTop,S<0?g=S:m>l.bottom-b&&S?(_=!0,g=Math.min(S,i*(1-Math.max(0,l.bottom-m)/b)|0)):m<l.top+v&&a.scrollTop&&(_=!0,g=-Math.min(a.scrollTop,i*(1-Math.max(0,m-l.top)/v)|0)),g&&(a.scrollTop+=g)),u&&(S=a._gsMaxScrollX-a.scrollLeft,S<0?h=S:f>l.right-y&&S?(_=!0,h=Math.min(S,i*(1-Math.max(0,l.right-f)/y)|0)):f<l.left+x&&a.scrollLeft&&(_=!0,h=-Math.min(a.scrollLeft,i*(1-Math.max(0,f-l.left)/x)|0)),h&&(a.scrollLeft+=h)),c&&(h||g)&&(L.scrollTo(a.scrollLeft,a.scrollTop),jt(p.pointerX+h,p.pointerY+g)),r=a}if(V){var C=p.x,T=p.y;s?(p.deltaX=C-parseFloat(w.rotation),p.rotation=C,w.rotation=C+`deg`,w.renderTransform(1,w)):k?(d&&(p.deltaY=T-k.top(),k.top(T)),u&&(p.deltaX=C-k.left(),k.left(C))):o?(d&&(p.deltaY=T-parseFloat(w.y),w.y=T+`px`),u&&(p.deltaX=C-parseFloat(w.x),w.x=C+`px`),w.renderTransform(1,w)):(d&&(p.deltaY=T-parseFloat(n.style.top||0),n.style.top=T+`px`),u&&(p.deltaX=C-parseFloat(n.style.left||0),n.style.left=C+`px`)),te&&!t&&!it&&(it=!0,X(p,`drag`,`onDrag`)===!1&&(u&&(p.x-=p.deltaX),d&&(p.y-=p.deltaY),e(!0)),it=!1)}V=!1},yt=function(e,t){var r=p.x,i=p.y,a,c;n._gsap||(w=I.core.getCache(n)),w.uncache&&I.getProperty(n,`x`),o?(p.x=parseFloat(w.x),p.y=parseFloat(w.y)):s?p.x=p.rotation=H(parseFloat(w.rotation)):k?(p.y=k.top(),p.x=k.left()):(p.y=parseFloat(n.style.top||(c=rt(n))&&c.top)||0,p.x=parseFloat(n.style.left||(c||{}).left)||0),(De||Ae||U)&&!t&&(p.isDragging||p.isThrowing)&&(U&&(ze.x=p.x,ze.y=p.y,a=U(ze),a.x!==p.x&&(p.x=a.x,V=!0),a.y!==p.y&&(p.y=a.y,V=!0)),De&&(a=De(p.x),a!==p.x&&(p.x=a,s&&(p.rotation=a),V=!0)),Ae&&(a=Ae(p.y),a!==p.y&&(p.y=a),V=!0)),V&&vt(!0),e||(p.deltaX=p.x-r,p.deltaY=p.y-i,X(p,`throwupdate`,`onThrowUpdate`))},bt=function(e,t,n,r){return t??=-Me,n??=Me,Ce(e)?function(i){var a=p.isPressed?1-p.edgeResistance:1;return e.call(p,(i>n?n+(i-n)*a:i<t?t+(i-t)*a:i)*r)*r}:ke(e)?function(r){for(var i=e.length,a=0,o=Me,s,c;--i>-1;)s=e[i],c=s-r,c<0&&(c=-c),c<o&&s>=t&&s<=n&&(a=i,o=c);return e[a]}:isNaN(e)?function(e){return e}:function(){return e*r}},xt=function(e,t,n,r,i,a,o){return a=a&&a<Me?a*a:Me,Ce(e)?function(s){var c=p.isPressed?1-p.edgeResistance:1,l=s.x,u=s.y,d,f,m;return s.x=l=l>n?n+(l-n)*c:l<t?t+(l-t)*c:l,s.y=u=u>i?i+(u-i)*c:u<r?r+(u-r)*c:u,d=e.call(p,s),d!==s&&(s.x=d.x,s.y=d.y),o!==1&&(s.x*=o,s.y*=o),a<Me&&(f=s.x-l,m=s.y-u,f*f+m*m>a&&(s.x=l,s.y=u)),s}:ke(e)?function(t){for(var n=e.length,r=0,i=Me,o,s,c,l;--n>-1;)c=e[n],o=c.x-t.x,s=c.y-t.y,l=o*o+s*s,l<i&&(r=n,i=l);return i<=a?e[r]:t}:function(e){return e}},St=function(){var e,t,i,a;ee=!1,k?(k.calibrate(),p.minX=F=-k.maxScrollLeft(),p.minY=z=-k.maxScrollTop(),p.maxX=P=p.maxY=R=0,ee=!0):r.bounds&&(e=ot(r.bounds,n.parentNode),s?(p.minX=F=e.left,p.maxX=P=e.left+e.width,p.minY=z=p.maxY=R=0):!Te(r.bounds.maxX)||!Te(r.bounds.maxY)?(e=r.bounds,p.minX=F=e.minX,p.minY=z=e.minY,p.maxX=P=e.maxX,p.maxY=R=e.maxY):(t=ot(n,n.parentNode),p.minX=F=Math.round(E(c,`px`)+e.left-t.left),p.minY=z=Math.round(E(l,`px`)+e.top-t.top),p.maxX=P=Math.round(F+(e.width-t.width)),p.maxY=R=Math.round(z+(e.height-t.height))),F>P&&(p.minX=P,p.maxX=P=F,F=p.minX),z>R&&(p.minY=R,p.maxY=R=z,z=p.minY),s&&(p.minRotation=F,p.maxRotation=P),ee=!0),r.liveSnap&&(i=r.liveSnap===!0?r.snap||{}:r.liveSnap,a=ke(i)||Ce(i),s?(De=bt(a?i:i.rotation,F,P,1),Ae=null):i.points?U=xt(a?i:i.points,F,P,z,R,i.radius,k?-1:1):(u&&(De=bt(a?i:i.x||i.left||i.scrollLeft,F,P,k?-1:1)),d&&(Ae=bt(a?i:i.y||i.top||i.scrollTop,z,R,k?-1:1))))},Ct=function(){p.isThrowing=!1,X(p,`throwcomplete`,`onThrowComplete`)},wt=function(){p.isThrowing=!1},Tt=function(e,t){var i,a,o,f;e&&ge?(e===!0&&(i=r.snap||r.liveSnap||{},a=ke(i)||Ce(i),e={resistance:(r.throwResistance||r.resistance||1e3)/(s?10:1)},s?e.rotation=lt(p,a?i:i.rotation,P,F,1,t):(u&&(e[c]=lt(p,a?i:i.points||i.x||i.left,P,F,k?-1:1,t||p.lockedAxis===`x`)),d&&(e[l]=lt(p,a?i:i.points||i.y||i.top,R,z,k?-1:1,t||p.lockedAxis===`y`)),(i.points||ke(i)&&we(i[0]))&&(e.linkedProps=c+`,`+l,e.radius=i.radius))),p.isThrowing=!0,f=isNaN(r.overshootTolerance)?r.edgeResistance===1?0:1-p.edgeResistance+.2:r.overshootTolerance,e.duration||={max:Math.max(r.minDuration||0,`maxDuration`in r?r.maxDuration:2),min:isNaN(r.minDuration)?f===0||we(e)&&e.resistance>1e3?0:.5:r.minDuration,overshoot:f},p.tween=o=I.to(k||n,{inertia:e,data:`_draggable`,inherit:!1,onComplete:Ct,onInterrupt:wt,onUpdate:r.fastMode?X:yt,onUpdateParams:r.fastMode?[p,`onthrowupdate`,`onThrowUpdate`]:i&&i.radius?[!1,!0]:[]}),r.fastMode||(k&&(k._skip=!0),o.render(1e9,!0,!0),yt(!0,!0),p.endX=p.x,p.endY=p.y,s&&(p.endRotation=p.x),o.play(0),yt(!0,!0),k&&(k._skip=!1))):ee&&p.applyBounds()},Et=function(e){var t=G,r;G=ie(n.parentNode,!0),e&&p.isPressed&&!G.equals(t||new re)&&(r=t.inverse().apply({x:A,y:j}),G.apply(r,r),A=r.x,j=r.y),G.equals(Ne)&&(G=null)},Dt=function(){var e=1-p.edgeResistance,t=T?Ze(D):0,r=T?Xe(D):0,i,a,u;o&&(w.x=E(c,`px`)+`px`,w.y=E(l,`px`)+`px`,w.renderTransform()),Et(!1),st.x=p.pointerX-t,st.y=p.pointerY-r,G&&G.apply(st,st),A=st.x,j=st.y,V&&(jt(p.pointerX,p.pointerY),vt(!0)),gt=ie(n),k?(St(),N=k.top(),M=k.left()):(Ot()?(yt(!0,!0),St()):p.applyBounds(),s?(i=n.ownerSVGElement?[w.xOrigin-n.getBBox().x,w.yOrigin-n.getBBox().y]:(rt(n)[Oe]||`0 0`).split(` `),Se=p.rotationOrigin=ie(n).apply({x:parseFloat(i[0])||0,y:parseFloat(i[1])||0}),yt(!0,!0),a=p.pointerX-Se.x-t,u=Se.y-p.pointerY+r,M=p.x,N=p.y=Math.atan2(u,a)*je):(N=E(l,`px`),M=E(c,`px`))),ee&&e&&(M>P?M=P+(M-P)/e:M<F&&(M=F-(F-M)/e),s||(N>R?N=R+(N-R)/e:N<z&&(N=z-(z-N)/e))),p.startX=M=H(M),p.startY=N=H(N)},Ot=function(){return p.tween&&p.tween.isActive()},kt=function(){ce.parentNode&&!Ot()&&!p.isDragging&&ce.parentNode.removeChild(ce)},$=function(e,i){var a;if(!O||p.isPressed||!e||(e.type===`mousedown`||e.type===`pointerdown`)&&!i&&Pe()-C<30&&pe[p.pointerEvent.type]){Z&&e&&O&&qe(e);return}if(Ke=Ot(),Q=!1,p.pointerEvent=e,pe[e.type]?(W=~e.type.indexOf(`touch`)?e.currentTarget||e.target:D,K(W,`touchend`,Mt),K(W,`touchmove`,At),K(W,`touchcancel`,Mt),K(D,`touchstart`,Ye)):(W=null,K(D,`mousemove`,At)),Y=null,(!ve||!W)&&(K(D,`mouseup`,Mt),e&&e.target&&K(e.target,`mouseup`,Mt)),Le=S.call(p,e.target)&&r.dragClickables===!1&&!i,Le){K(e.target,`change`,Mt),X(p,`pressInit`,`onPressInit`),X(p,`press`,`onPress`),dt(m,!0),Z=!1;return}if(J=!W||u===d||p.vars.allowNativeTouchScrolling===!1||p.vars.allowContextMenu&&e&&(e.ctrlKey||e.which>2)?!1:u?`y`:`x`,Z=!J&&!p.allowEventDefault,Z&&(qe(e),K(L,`touchforcechange`,qe)),e.changedTouches?(e=ue=e.changedTouches[0],B=e.identifier):e.pointerId?B=e.pointerId:ue=B=null,xe++,We(vt),j=p.pointerY=e.pageY,A=p.pointerX=e.pageX,X(p,`pressInit`,`onPressInit`),(J||p.autoScroll)&&tt(n.parentNode),n.parentNode&&p.autoScroll&&!k&&!s&&n.parentNode._gsMaxScrollX&&!ce.parentNode&&!n.getBBox&&(ce.style.width=n.parentNode.scrollWidth+`px`,n.parentNode.appendChild(ce)),Dt(),p.tween&&p.tween.kill(),p.isThrowing=!1,I.killTweensOf(k||n,h,!0),k&&I.killTweensOf(n,{scrollTo:1},!0),p.tween=p.lockedAxis=null,(r.zIndexBoost||!s&&!k&&r.zIndexBoost!==!1)&&(n.style.zIndex=t.zIndex++),p.isPressed=!0,te=!!(r.onDrag||p._listeners.drag),ne=!!(r.onMove||p._listeners.move),r.cursor!==!1||r.activeCursor)for(a=m.length;--a>-1;)I.set(m[a],{cursor:r.activeCursor||r.cursor||(_e===`grab`?`grabbing`:_e)});X(p,`press`,`onPress`),ge&&ge.track(k||n,o?`x,y`:s?`rotation`:`top,left`)},At=function(e){var t=e,r,i,a,o,s,c;if(!O||me||!p.isPressed||!e){Z&&e&&O&&qe(e);return}if(p.pointerEvent=e,r=e.changedTouches,r){if(e=r[0],e!==ue&&e.identifier!==B){for(o=r.length;--o>-1&&(e=r[o]).identifier!==B&&e.target!==n;);if(o<0)return}}else if(e.pointerId&&B&&e.pointerId!==B)return;if(W&&J&&!Y&&(st.x=e.pageX-(T?Ze(D):0),st.y=e.pageY-(T?Xe(D):0),G&&G.apply(st,st),i=st.x,a=st.y,s=Math.abs(i-A),c=Math.abs(a-j),(s!==c&&(s>f||c>f)||he&&J===Y)&&(Y=s>c&&u?`x`:`y`,J&&Y!==J&&K(L,`touchforcechange`,qe),p.vars.lockAxisOnTouchScroll!==!1&&u&&d&&(p.lockedAxis=Y===`x`?`y`:`x`,Ce(p.vars.onLockAxis)&&p.vars.onLockAxis.call(p,t)),he&&J===Y))){Mt(t);return}!p.allowEventDefault&&(!J||Y&&J!==Y)&&t.cancelable!==!1?(qe(t),Z=!0):Z&&=!1,p.autoScroll&&(_=!0),jt(e.pageX,e.pageY,ne)},jt=function(e,t,n){var r=1-p.dragResistance,i=1-p.edgeResistance,a=p.pointerX,o=p.pointerY,c=N,l=p.x,m=p.y,h=p.endX,g=p.endY,_=p.endRotation,v=V,y,b,x,S,C,w;p.pointerX=e,p.pointerY=t,T&&(e-=Ze(D),t-=Xe(D)),s?(S=H(Math.atan2(Se.y-t,e-Se.x)*je),C=p.y-S,C>180?(N-=360,p.y=S):C<-180&&(N+=360,p.y=S),G&&(w=e*G.a+t*G.c+G.e,t=e*G.b+t*G.d+G.f,e=w),p.x!==M||Math.max(Math.abs(A-e),Math.abs(j-t))>f?(p.y=S,x=H(M+(N-S)*r)):x=M):(G&&(w=e*G.a+t*G.c+G.e,t=e*G.b+t*G.d+G.f,e=w),b=t-j,y=e-A,b<f&&b>-f&&(b=0),y<f&&y>-f&&(y=0),(p.lockAxis||p.lockedAxis)&&(y||b)&&(w=p.lockedAxis,w||(p.lockedAxis=w=u&&Math.abs(y)>Math.abs(b)?`y`:d?`x`:null,w&&Ce(p.vars.onLockAxis)&&p.vars.onLockAxis.call(p,p.pointerEvent)),w===`y`?b=0:w===`x`&&(y=0)),x=H(M+y*r),S=H(N+b*r)),(De||Ae||U)&&(p.x!==x||p.y!==S&&!s)&&(U&&(ze.x=x,ze.y=S,w=U(ze),x=H(w.x),S=H(w.y)),De&&(x=H(De(x))),Ae&&(S=H(Ae(S)))),ee&&(x>P?x=P+Math.round((x-P)*i):x<F&&(x=F+Math.round((x-F)*i)),s||(S>R?S=Math.round(R+(S-R)*i):S<z&&(S=Math.round(z+(S-z)*i)))),(p.x!==x||p.y!==S&&!s)&&(s?(p.endRotation=p.x=p.endX=H(x),V=!0):(d&&(p.y=p.endY=S,V=!0),u&&(p.x=p.endX=x,V=!0)),!n||X(p,`move`,`onMove`)!==!1?!p.isDragging&&p.isPressed&&(p.isDragging=Q=!0,X(p,`dragstart`,`onDragStart`)):(p.pointerX=a,p.pointerY=o,N=c,p.x=l,p.y=m,p.endX=h,p.endY=g,p.endRotation=_,V=v))},Mt=function e(t,i){if(!O||!p.isPressed||t&&B!=null&&!i&&(t.pointerId&&t.pointerId!==B&&t.target!==n||t.changedTouches&&!Je(t.changedTouches,B))){Z&&t&&O&&qe(t);return}p.isPressed=!1;var a=t,o=p.isDragging,s=p.vars.allowContextMenu&&t&&(t.ctrlKey||t.which>2),c=I.delayedCall(.001,kt),l,u,d,f,h;if(W?(q(W,`touchend`,e),q(W,`touchmove`,At),q(W,`touchcancel`,e),q(D,`touchstart`,Ye)):q(D,`mousemove`,At),q(L,`touchforcechange`,qe),(!ve||!W)&&(q(D,`mouseup`,e),t&&t.target&&q(t.target,`mouseup`,e)),V=!1,o&&(g=Re=Pe(),p.isDragging=!1),Ge(vt),Le&&!s){t&&(q(t.target,`change`,e),p.pointerEvent=a),dt(m,!1),X(p,`release`,`onRelease`),X(p,`click`,`onClick`),Le=!1;return}for(u=m.length;--u>-1;)nt(m[u],`cursor`,r.cursor||(r.cursor===!1?null:_e));if(xe--,t){if(l=t.changedTouches,l&&(t=l[0],t!==ue&&t.identifier!==B)){for(u=l.length;--u>-1&&(t=l[u]).identifier!==B&&t.target!==n;);if(u<0&&!i)return}p.pointerEvent=a,p.pointerX=t.pageX,p.pointerY=t.pageY}return s&&a?(qe(a),Z=!0,X(p,`release`,`onRelease`)):a&&!o?(Z=!1,Ke&&(r.snap||r.bounds)&&Tt(r.inertia||r.throwProps),X(p,`release`,`onRelease`),(!he||a.type!==`touchmove`)&&a.type.indexOf(`cancel`)===-1&&(X(p,`click`,`onClick`),Pe()-C<300&&X(p,`doubleclick`,`onDoubleClick`),f=a.target||n,C=Pe(),h=function(){C!==ct&&p.enabled()&&!p.isPressed&&!a.defaultPrevented&&(f.click?f.click():D.createEvent&&(d=D.createEvent(`MouseEvents`),d.initMouseEvent(`click`,!0,!0,L,1,p.pointerEvent.screenX,p.pointerEvent.screenY,p.pointerX,p.pointerY,!1,!1,!1,!1,0,null),f.dispatchEvent(d)))},!he&&!a.defaultPrevented&&I.delayedCall(.05,h))):(Tt(r.inertia||r.throwProps),!p.allowEventDefault&&a&&(r.dragClickables!==!1||!S.call(p,a.target))&&o&&(!J||Y&&J===Y)&&a.cancelable!==!1?(Z=!0,qe(a)):Z=!1,X(p,`release`,`onRelease`)),Ot()&&c.duration(p.tween.duration()),o&&X(p,`dragend`,`onDragEnd`),!0},Nt=function(e){if(e&&p.isDragging&&!k){var t=e.target||n.parentNode,r=t.scrollLeft-t._gsScrollX,i=t.scrollTop-t._gsScrollY;(r||i)&&(G?(A-=r*G.a+i*G.c,j-=i*G.d+r*G.b):(A-=r,j-=i),t._gsScrollX+=r,t._gsScrollY+=i,jt(p.pointerX,p.pointerY))}},Pt=function(e){var t=Pe(),n=t-C<100,r=t-g<50,i=n&&ct===C,a=p.pointerEvent&&p.pointerEvent.defaultPrevented,o=n&&pt===C,s=e.isTrusted||e.isTrusted==null&&n&&i;if((i||r&&p.vars.suppressClickOnDrag!==!1)&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),n&&!(p.pointerEvent&&p.pointerEvent.defaultPrevented)&&(!i||s&&!o)){s&&i&&(pt=C),ct=C;return}(p.isPressed||r||n)&&(!s||!e.detail||!n||a)&&qe(e),!n&&!r&&!Q&&(e&&e.target&&(p.pointerEvent=e),X(p,`click`,`onClick`))},Ft=function(e){return G?{x:e.x*G.a+e.y*G.c+G.e,y:e.x*G.b+e.y*G.d+G.f}:{x:e.x,y:e.y}};return Ee=t.get(n),Ee&&Ee.kill(),i.startDrag=function(e,t){var r,i,a,o;$(e||p.pointerEvent,!0),t&&!p.hitTest(e||p.pointerEvent)&&(r=at(e||p.pointerEvent),i=at(n),a=Ft({x:r.left+r.width/2,y:r.top+r.height/2}),o=Ft({x:i.left+i.width/2,y:i.top+i.height/2}),A-=a.x-o.x,j-=a.y-o.y),p.isDragging||(p.isDragging=Q=!0,X(p,`dragstart`,`onDragStart`))},i.drag=At,i.endDrag=function(e){return Mt(e||p.pointerEvent,!0)},i.timeSinceDrag=function(){return p.isDragging?0:(Pe()-g)/1e3},i.timeSinceClick=function(){return(Pe()-C)/1e3},i.hitTest=function(e,n){return t.hitTest(p.target,e,n)},i.getDirection=function(e,t){var r=e===`velocity`&&ge?e:we(e)&&!s?`element`:`start`,i,a,o,u,d,f;return r===`element`&&(d=at(p.target),f=at(e)),i=r===`start`?p.x-M:r===`velocity`?ge.getVelocity(n,c):d.left+d.width/2-(f.left+f.width/2),s?i<0?`counter-clockwise`:`clockwise`:(t||=2,a=r===`start`?p.y-N:r===`velocity`?ge.getVelocity(n,l):d.top+d.height/2-(f.top+f.height/2),o=Math.abs(i/a),u=o<1/t?``:i<0?`left`:`right`,o<t&&(u!==``&&(u+=`-`),u+=a<0?`up`:`down`),u)},i.applyBounds=function(e,t){var i,a,o,c,l,f;if(e&&r.bounds!==e)return r.bounds=e,p.update(!0,t);if(yt(!0),St(),ee&&!Ot()){if(i=p.x,a=p.y,i>P?i=P:i<F&&(i=F),a>R?a=R:a<z&&(a=z),(p.x!==i||p.y!==a)&&(o=!0,p.x=p.endX=i,s?p.endRotation=i:p.y=p.endY=a,V=!0,vt(!0),p.autoScroll&&!p.isDragging))for(tt(n.parentNode),c=n,Be.scrollTop=L.pageYOffset==null?D.documentElement.scrollTop==null?D.body.scrollTop:D.documentElement.scrollTop:L.pageYOffset,Be.scrollLeft=L.pageXOffset==null?D.documentElement.scrollLeft==null?D.body.scrollLeft:D.documentElement.scrollLeft:L.pageXOffset;c&&!f;)f=et(c.parentNode),l=f?Be:c.parentNode,d&&l.scrollTop>l._gsMaxScrollY&&(l.scrollTop=l._gsMaxScrollY),u&&l.scrollLeft>l._gsMaxScrollX&&(l.scrollLeft=l._gsMaxScrollX),c=l;p.isThrowing&&(o||p.endX>P||p.endX<F||p.endY>R||p.endY<z)&&Tt(r.inertia||r.throwProps,o)}return p},i.update=function(e,t,r){if(t&&p.isPressed){if(s)p.x=p.y=H(parseFloat(w.rotation));else{var i=ie(n),a=gt.apply({x:p.x-M,y:p.y-N}),o=ie(n.parentNode,!0);o.apply({x:i.e-a.x,y:i.f-a.y},a),p.x=H(p.x-(a.x-o.e)),p.y=H(p.y-(a.y-o.f))}vt(!0),Dt()}var c=p.x,l=p.y;return Et(!t),e?p.applyBounds():(V&&r&&vt(!0),yt(!0)),t&&(jt(p.pointerX,p.pointerY),V&&vt(!0)),p.isPressed&&!t&&(u&&Math.abs(c-p.x)>.01||d&&Math.abs(l-p.y)>.01&&!s)&&Dt(),p.autoScroll&&(tt(n.parentNode,p.isDragging),_=p.isDragging,vt(!0),$e(n,Nt),Qe(n,Nt)),p},i.enable=function(e){var t={lazy:!0},i,a,c;if(r.cursor!==!1&&(t.cursor=r.cursor||_e),I.utils.checkPrefix(`touchCallout`)&&(t.touchCallout=`none`),e!==`soft`){for(Ue(m,u===d?`none`:r.allowNativeTouchScrolling&&n.scrollHeight===n.clientHeight==(n.scrollWidth===n.clientHeight)||r.allowEventDefault?`manipulation`:u?`pan-y`:`pan-x`),a=m.length;--a>-1;)c=m[a],ve||K(c,`mousedown`,$),K(c,`touchstart`,$),K(c,`click`,Pt,!0),I.set(c,t),c.getBBox&&c.ownerSVGElement&&u!==d&&I.set(c.ownerSVGElement,{touchAction:r.allowNativeTouchScrolling||r.allowEventDefault?`manipulation`:u?`pan-y`:`pan-x`}),r.allowContextMenu||K(c,`contextmenu`,_t);dt(m,!1)}return Qe(n,Nt),O=!0,ge&&e!==`soft`&&ge.track(k||n,o?`x,y`:s?`rotation`:`top,left`),n._gsDragID=i=n._gsDragID||`d`+ Ie++,Fe[i]=p,k&&(k.enable(),k.element._gsDragID=i),(r.bounds||s)&&Dt(),r.bounds&&p.applyBounds(),p},i.disable=function(e){for(var t=p.isDragging,r=m.length,i;--r>-1;)nt(m[r],`cursor`,null);if(e!==`soft`){for(Ue(m,null),r=m.length;--r>-1;)i=m[r],nt(i,`touchCallout`,null),q(i,`mousedown`,$),q(i,`touchstart`,$),q(i,`click`,Pt,!0),q(i,`contextmenu`,_t);dt(m,!0),W&&(q(W,`touchcancel`,Mt),q(W,`touchend`,Mt),q(W,`touchmove`,At)),q(D,`mouseup`,Mt),q(D,`mousemove`,At)}return $e(n,Nt),O=!1,ge&&e!==`soft`&&(ge.untrack(k||n,o?`x,y`:s?`rotation`:`top,left`),p.tween&&p.tween.kill()),k&&k.disable(),Ge(vt),p.isDragging=p.isPressed=Le=!1,t&&X(p,`dragend`,`onDragEnd`),p},i.enabled=function(e,t){return arguments.length?e?p.enable(t):p.disable(t):O},i.kill=function(){return p.isThrowing=!1,p.tween&&p.tween.kill(),p.disable(),I.set(m,{clearProps:`userSelect`}),delete Fe[n._gsDragID],p},i.revert=function(){this.kill(),this.styles&&this.styles.revert()},~a.indexOf(`scroll`)&&(k=i.scrollProxy=new mt(n,He({onKill:function(){p.isPressed&&Mt(null)}},r)),n.style.overflowY=d&&!fe?`auto`:`hidden`,n.style.overflowX=u&&!fe?`auto`:`hidden`,n=k.content),s?h.rotation=1:(u&&(h[c]=1),d&&(h[l]=1)),w.force3D=`force3D`in r?r.force3D:!0,ye(ae(i)),i.enable(),i}return t.register=function(e){I=e,ht()},t.create=function(e,n){return le||ht(!0),de(e).map(function(e){return new t(e,n)})},t.get=function(e){return Fe[(de(e)[0]||{})._gsDragID]},t.timeSinceDrag=function(){return(Pe()-Re)/1e3},t.hitTest=function(e,t,n){if(e===t)return!1;var r=at(e),i=at(t),a=r.top,o=r.left,s=r.right,c=r.bottom,l=r.width,u=r.height,d=i.left>s||i.right<o||i.top>c||i.bottom<a,f,p,m;return d||!n?!d:(m=(n+``).indexOf(`%`)!==-1,n=parseFloat(n)||0,f={left:Math.max(o,i.left),top:Math.max(a,i.top)},f.width=Math.min(s,i.right)-f.left,f.height=Math.min(c,i.bottom)-f.top,f.width<0||f.height<0?!1:m?(n*=.01,p=f.width*f.height,p>=l*u*n||p>=i.width*i.height*n):f.width>n&&f.height>n)},t}(function(){function e(e){this._listeners={},this.target=e||this}var t=e.prototype;return t.addEventListener=function(e,t){var n=this._listeners[e]||(this._listeners[e]=[]);~n.indexOf(t)||n.push(t)},t.removeEventListener=function(e,t){var n=this._listeners[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},t.dispatchEvent=function(e){var t=this,n;return(this._listeners[e]||[]).forEach(function(r){return r.call(t,{type:e,target:t.target})===!1&&(n=!1)}),n},e}());Ke(gt.prototype,{pointerX:0,pointerY:0,startX:0,startY:0,deltaX:0,deltaY:0,isDragging:!1,isPressed:!1}),gt.zIndex=1e3,gt.version=`3.15.0`,V()&&I.registerPlugin(gt);var Q=[{id:`celdf`,name:`CELDF`,isCompact:!0,flexBasis:`calc(35.5% - 64px)`,quote:`"HKW exceeded our expectations in their creative design and development of our branding, and in providing us with innovative web development and solutions."`,attribution:`Emelyn Lybarger, Outreach Coordinator`,services:[`Website Design`,`Graphic Design`,`Branding`,`Logo Design`],image:`/hkw-site-2026/assets/celdf-Dl_YNkRQ.png`,navIcon:`/hkw-site-2026/assets/celdf-default-CDngsrVd.png`,heroImage:{width:800.18,height:617.28,aspectRatio:`800.18 / 617.28`,maxWidth:`none`,rotation:-.491,desktop:{x:-65,y:-55},mobile:{x:75,y:-150}},navButton:{desktop:{width:112,height:127,x:0,y:10},mobile:{width:56,height:56,x:0,y:0}}},{id:`voxus`,name:`Voxus PR`,flexBasis:`calc(35.5% - 64px)`,isWide:!0,letterSpacing:`-0.24px`,quote:`“We communicate for a living, but HKW helped us crystalize our brand message.”`,attribution:`Kevin Pedraja, Partner at Voxus PR`,services:[`Website Design`,`Web Development`,`Branding`],image:`/hkw-site-2026/assets/voxus-pr-CPaZ5RTJ.png`,navIcon:`/hkw-site-2026/assets/voxus-pr-default-CHWS348_.png`,heroImage:{width:641.456,height:677.632,aspectRatio:`641.456 / 677.632`,maxWidth:`none`,desktop:{x:140,y:-135},mobile:{x:0,y:0}},navButton:{desktop:{width:132,height:132,x:0,y:10},mobile:{width:56,height:56,x:0,y:0}}},{id:`lumiere`,name:`Lumiere Work`,isCompact:!0,flexBasis:`calc(38.5% - 64px)`,maxWidth:`395px`,letterSpacing:`-0.48px`,quote:`“HKW took something as abstract as consciousness-based leadership and translated it into a site that actually feels like the work: structured, luminous, and alive. Professional, thoughtful, and a pleasure to collaborate with from start to finish.”`,attribution:`Kathi Joy, Founder at Lumiere Work`,services:[`Logo Design`,`Website Design`,`Collateral Design`,`Website Development`,`Branding`],image:`/hkw-site-2026/assets/lumierework-NZXjsBwH.png`,navIcon:`/hkw-site-2026/assets/lumiere-default-CyN9wiaT.png`,heroImage:{width:1276.895,height:841.004,aspectRatio:`249 / 164`,rotation:26,desktop:{x:0,y:140},mobile:{x:0,y:0}},navButton:{desktop:{width:132,height:132,x:0,y:30},mobile:{width:56,height:56,x:0,y:0}}},{id:`rogue-heart`,name:`Rogue Heart Media`,flexBasis:`calc(41.5% - 64px)`,letterSpacing:`-0.4px`,quote:`“It has been our joy to work with HKW - on as many occasions as we can foster, really! Trust is well-placed with them, to create sites of lasting value, as well as the characteristic flair & function that you need.”`,attribution:`Megan Kennedy, Founder & Creative Director`,services:[`Website Design`,`Website Development`],image:`/hkw-site-2026/assets/rogue-heart-media-y9LaflFf.png`,navIcon:`/hkw-site-2026/assets/rogue-heart-default-DoUXddy9.png`,heroImage:{width:715,height:483,aspectRatio:`715 / 483`,maxWidth:`none`,desktop:{x:-36,y:26},mobile:{x:0,y:0}},navButton:{desktop:{width:132,height:132,x:0,y:20},mobile:{width:56,height:56,x:0,y:0}}},{id:`conviva`,name:`Conviva`,flexBasis:`calc(35.5% - 64px)`,quote:`"HKW felt like full-fledged members of my team."`,attribution:`Paula Mantle, Marketing Director at Conviva`,services:[`Web Design`,`Illustration`,`Collateral Design`,`Branding`,`Physical Spaces`,`Email Marketing`,`SEO, SEM, Content`,`Creation`],image:`/hkw-site-2026/assets/conviva-BCnBBSAF.png`,navIcon:`/hkw-site-2026/assets/conviva-default-CAoPthqb.svg`,heroImage:{width:1100.37,desktop:{x:-285,y:-220},mobile:{x:0,y:0}},navButton:{desktop:{width:88,height:94,x:0,y:40},mobile:{width:56,height:56,x:0,y:0}}},{id:`scar`,name:`SCAR`,flexBasis:`calc(46.5% - 64px)`,letterSpacing:`-0.4px`,maxWidth:472,isWide:!0,quote:`Working with HKW's web design team has been one of the easiest experiences for our organization — they understood our vision right away and have continued to turn it into a site we’re proud to share with our community.`,attribution:`Evee Polanski, Director of Operations`,services:[`Web Design`,`Web Development`],image:`/hkw-site-2026/assets/scar-BvEvilv_.png`,navIcon:`/hkw-site-2026/assets/scar-default-BVtIbfUG.png`,heroImage:{width:603.41,desktop:{x:20,y:-55},mobile:{x:0,y:0}},navButton:{desktop:{width:84.086,height:174.45,x:0,y:-10},mobile:{width:56,height:56,x:0,y:0}}},{id:`reltio`,name:`Reltio`,flexBasis:`calc(42.5% - 64px)`,quote:`From strategy to launch, HKW is the rare agency that combines rock-solid reliability, outstanding design & UI/UX, and genuine partnership — all wrapped up in a team you'll actually love working with.`,attribution:`Sr. Director, Global Digital & Web Marketing`,services:[`Web Design`,`Web Development`,`Marketing Support`],image:`/hkw-site-2026/assets/reltio-Bk6X8a5a.png`,navIcon:`/hkw-site-2026/assets/reltio-default-DUNUScM3.png`,heroImage:{width:685.556,aspectRatio:`297 / 262`,desktop:{x:-60,y:-110},mobile:{x:0,y:0}},navButton:{desktop:{width:103,height:123,x:0,y:20},mobile:{width:56,height:56,x:0,y:0}}},{id:`inclusively`,name:`Inclusively`,flexBasis:`calc(51.5% - 64px)`,isWide:!0,maxWidth:483,quote:`"The expertise and attention to detail by the entire team was evident throughout the project..."`,attribution:`Tiffany Meehan, VP of Marketing at Inclusively`,services:[`Logo Redesign`,`Web Design`,`Illustration System`,`Web Development`,`Animation`],image:`/hkw-site-2026/assets/inclusively-CBrkXK5E.png`,navIcon:`/hkw-site-2026/assets/inclusively-default-Ci26ipxf.png`,heroImage:{width:739.35,height:580.98,aspectRatio:`127 / 103`,maxWidth:`none`,desktop:{x:-80,y:-75},mobile:{x:0,y:0}},navButton:{desktop:{width:44,height:95,x:0,y:25},mobile:{width:56,height:56,x:0,y:0}}},{id:`computercare`,name:`ComputerCare`,isCompact:!0,letterSpacing:`-0.4px`,quote:`“HKW has done many wonderful projects for us over the years. Most recently they helped us implement a new and modern looking website, as well as a huge integration project for our website to connect to our internal systems, which has automated so much of our manual processes. They built a user friendly interface for our customers, and keep our site well maintained.”`,attribution:`Melissa Marsh, Senior Business Systems Analyst at ComputerCare`,services:[`Web Design`,`Web Development`],image:`/hkw-site-2026/assets/computer-care-B8oz9GWd.png`,navIcon:`/hkw-site-2026/assets/computer-care-default-B6giQ6XC.png`,heroImage:{width:567.471,height:569.456,aspectRatio:`285 / 286`,maxWidth:`none`,desktop:{x:40,y:-50},mobile:{x:0,y:0}},navButton:{desktop:{width:122,height:74.18,x:0,y:45},mobile:{width:56,height:56,x:0,y:0}}}],_t={desktop:{width:96,height:96,x:0,y:0},mobile:{width:56,height:56,x:0,y:0}},vt=(e,t=!1)=>{let n=t?_t.mobile:_t.desktop,r=t?e?.mobile:e?.desktop;return{width:r?.width??n.width,height:r?.height??n.height,x:r?.x??n.x,y:r?.y??n.y}},yt=()=>(0,f.jsxs)(`svg`,{width:`214`,height:`150`,viewBox:`0 0 214 150`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,f.jsx)(`path`,{d:`M106.579 141.806C165.439 141.806 213.159 134.062 213.159 124.509C213.159 114.955 165.439 107.221 106.579 107.221C47.7193 107.221 0 114.965 0 124.509C0 134.052 47.7193 141.806 106.579 141.806Z`,fill:`#1C2D38`}),(0,f.jsx)(`g`,{children:(0,f.jsxs)(`g`,{id:`marmot-character-idle`,children:[(0,f.jsx)(`path`,{d:`M44.174 138.778C44.174 138.778 44.2294 138.787 44.257 138.797C45.9646 139.064 47.7275 139.341 49.5551 139.609C49.592 139.609 49.6197 139.618 49.6566 139.627C51.4934 139.895 53.3856 140.163 55.3331 140.43C55.3608 140.43 55.3885 140.43 55.4162 140.44C57.3822 140.707 59.4036 140.966 61.4803 141.215C61.4895 141.215 61.508 141.215 61.5172 141.215C75.4731 142.922 91.8102 144.307 109.181 144.575L144.846 143.402C149.636 142.987 154.445 142.461 159.236 141.806C159.245 141.806 159.254 141.806 159.273 141.806C163.269 141.252 167.247 140.624 171.207 139.886C175.176 139.147 179.117 138.317 183.012 137.375L180.289 126.373L183.908 130.665C183.908 130.665 181.36 123.429 179.348 119.137C177.336 114.845 169.832 102.375 169.961 93.1263C170.099 83.8778 153.873 50.8989 143.286 51.9696L69.8243 61.3565C69.8243 61.3565 41.9403 92.591 39.5313 114.309C37.9991 128.136 38.5713 134.892 39.199 137.984C40.7773 138.252 42.4387 138.529 44.1555 138.797L44.174 138.778Z`,fill:`#DF9F59`}),(0,f.jsx)(`path`,{d:`M61.222 125.782C61.222 125.782 56.2193 134.542 60.1513 140.08C60.1513 140.08 58.7207 136.508 61.4066 133.822C63.188 132.04 63.7049 135.778 62.708 141.353C82.5065 143.725 106.911 145.424 132.229 144.233C133.752 132.179 136.115 113.054 136.475 107.904C137.01 100.215 133.262 91.2803 133.262 91.2803C133.262 91.2803 136.124 93.0709 137.019 98.0736C137.019 98.0736 137.822 92.0464 133.401 83.8594C133.401 83.8594 133.133 83.1302 132.949 81.8011C133.013 81.8103 133.069 81.8287 133.133 81.8564C135.542 82.7979 136.484 86.2869 136.484 86.2869C136.751 83.204 135.413 81.3303 135.413 81.3303C134.342 79.392 133.586 77.4168 133.059 75.6169C133.244 74.3986 133.539 73.0694 133.982 71.6295C136.308 64.1255 121.651 64.1255 121.651 64.1255L102.886 63.9409L73.7472 71.2696C73.7472 71.2696 59.2652 87.7083 58.7299 97.5475C58.1945 107.378 61.2312 120.78 61.2312 120.78L57.4746 129.354L61.2312 125.782H61.222Z`,fill:`#F3B271`}),(0,f.jsx)(`path`,{d:`M126.46 84.127C129.321 86.2684 130.217 93.957 130.217 93.957C130.217 93.957 132.007 83.407 129.857 77.1583C128.703 73.7893 127.752 70.7342 127.125 68.6297C127.623 67.3745 128.122 66.1284 128.583 64.8823C125.399 64.107 122.168 64.107 122.168 64.107L103.403 63.9316L74.2642 71.2603C74.2642 71.2603 73.3043 72.3494 71.8736 74.1401C70.5999 75.7276 71.0245 79.5766 70.443 81.5056C69.843 83.5178 68.9754 85.1884 68.68 87.3483C67.9878 92.3879 68.5877 97.6028 70.4522 102.338C70.3599 97.5567 71.569 92.7755 73.9227 88.6128C73.7104 90.5419 73.4981 92.554 74.1627 94.3816C74.8918 96.4122 76.5994 97.9444 77.504 99.9104C78.8977 102.938 78.1685 106.556 76.7194 109.556C78.5931 107.027 80.0238 104.175 80.9191 101.156C82.1928 103.584 84.0573 105.439 85.0357 108.07C86.3648 111.642 85.3957 114.346 85.3957 117.9C82.5805 127.951 86.1987 131.569 86.1987 131.569C86.1987 131.569 86.1987 124.333 91.026 119.903C95.8533 115.481 94.238 102.615 94.238 102.615C94.238 102.615 105.36 110.119 98.3915 126.474C98.3915 126.474 104.428 122.45 105.36 110.119L103.883 99.7996C103.883 99.7996 111.932 110.257 109.92 119.1C107.908 127.951 108.711 131.966 108.711 131.966C108.711 131.966 111.923 124.73 115.55 119.903C119.168 115.075 119.971 107.036 117.156 97.7782C117.156 97.7782 126.008 104.212 124.393 115.075C124.393 115.075 130.318 107.654 125.565 95.7199C124.78 90.7726 124.116 82.3548 126.442 84.1085L126.46 84.127Z`,fill:`#FEE3CA`}),(0,f.jsx)(`path`,{d:`M65.5146 61.615C65.5146 61.615 52.8233 70.3743 44.064 82.3457C44.064 82.3457 35.3046 93.2463 34.0586 103.621L36.3846 99.5135C36.3846 99.5135 35.9415 101.664 35.6277 104.645C35.12 107.645 34.8339 111.402 35.1385 115.952C36.0338 129.539 42.1072 134.542 42.1072 134.542C42.1072 134.542 40.1412 130.61 39.6059 127.388C39.6059 127.388 39.7443 127.868 40.012 128.542C39.2366 125.69 38.6644 122.229 38.7936 118.398L43.1687 103.446C43.1687 103.446 50.5158 114.9 58.9059 108.171C59.2751 107.876 59.6627 107.654 60.0412 107.47C59.8289 106.371 59.4874 105.033 58.9151 103.796L64.0932 106.122C64.0932 106.122 61.9518 102.91 60.6965 100.049L65.6992 104.156L63.7332 97.7229C63.7332 97.7229 68.7359 99.6889 69.9912 104.516C69.9912 104.516 70.8865 99.5136 68.9205 96.6522C66.9545 93.7909 67.4898 79.8536 76.4245 71.4542C85.3592 63.0549 65.5238 61.6242 65.5238 61.6242L65.5146 61.615Z`,fill:`#935F35`}),(0,f.jsx)(`path`,{d:`M69.8616 81.6073C69.8616 81.6073 69.8893 81.5519 69.917 81.4688C69.9908 81.275 70.0647 81.0812 70.1477 80.8873C71.5046 77.3615 77.0795 61.9842 70.6831 62.6026C63.6775 63.2764 56.7919 68.6575 56.3857 68.9806C52.4537 72.5157 47.8941 77.1215 44.0821 82.3364C44.0821 82.3364 41.9961 84.9393 39.7163 88.7975C41.0085 87.9114 42.1807 87.4037 42.8361 87.8745C44.8021 89.3051 36.938 88.2344 38.5441 104.498C38.5441 104.498 38.1841 99.4951 40.6854 96.8092C43.1868 94.1232 40.3255 114.863 40.3255 114.863C40.3255 114.863 43.5098 109.722 43.8975 103.861C43.8975 103.861 51.3 116.432 59.9393 106.916C59.727 105.938 59.404 104.821 58.9148 103.778L64.0928 106.104C64.0928 106.104 61.9515 102.892 60.6962 100.03L65.6989 104.138L63.7329 97.7045C63.7329 97.7045 68.7356 99.6705 69.9908 104.489C69.9908 104.489 70.8862 99.4859 68.9201 96.6246C67.6464 94.7693 67.4249 88.2437 69.8708 81.5888L69.8616 81.6073Z`,fill:`#AD7149`}),(0,f.jsx)(`path`,{d:`M58.9975 103.842C57.6499 102.19 50.8658 94.3632 45.6878 97.5014C40.1959 100.833 35.8208 119.118 40.002 129.17C39.8359 128.57 39.6882 127.97 39.5959 127.398C39.5959 127.398 40.002 128.874 40.8512 130.305C42.7249 134.006 45.5401 136.711 49.4259 140.809L54.0779 146.531C54.0779 146.531 58.0929 133.443 54.8993 124.85L56.9299 117.217L58.1852 112.214C58.1852 112.214 58.5452 109.177 60.3266 109.713C60.3266 109.713 60.142 106.501 58.896 103.815L58.9975 103.861V103.842Z`,fill:`#935F35`}),(0,f.jsx)(`path`,{d:`M59.0162 103.852C54.872 97.5568 46.8695 95.4062 44.8112 98.1937C43.1867 100.409 43.4359 103.907 43.6759 105.569C43.759 105.015 43.8328 104.452 43.8697 103.87C43.8513 104.138 43.7959 105.089 43.842 106.492C43.9713 110.516 44.9404 118.241 50.1369 123.816C51.5307 125.312 52.9429 126.345 54.3089 127.028L56.9302 117.198L58.1855 112.196C58.1855 112.196 58.5455 109.159 60.3269 109.694C60.3269 109.694 60.1515 106.482 58.8962 103.796L59.0162 103.852Z`,fill:`#AD7149`}),(0,f.jsxs)(`g`,{id:`coffee-mug`,children:[(0,f.jsx)(`path`,{d:`M59.8965 105.107L64.4342 138.091C65.0792 142.784 69.0446 146.282 73.7321 146.298L89.529 146.35C94.4901 146.367 98.6136 142.491 98.9541 137.488L101.156 105.211`,fill:`#415441`}),(0,f.jsx)(`path`,{d:`M101.516 105.625C101.513 107.611 92.1841 109.18 80.6766 109.13C69.1727 109.079 59.846 107.428 59.8493 105.442C59.8527 103.456 69.1813 101.887 80.6889 101.938C92.1928 101.988 101.52 103.639 101.516 105.625Z`,fill:`#415441`}),(0,f.jsx)(`mask`,{id:`mask0_5064_2326`,style:{maskType:`alpha`},maskUnits:`userSpaceOnUse`,x:`59`,y:`101`,width:`43`,height:`9`,children:(0,f.jsx)(`path`,{d:`M101.514 105.604C101.51 107.601 92.1809 109.19 80.6745 109.151C69.1717 109.112 59.8468 107.461 59.8512 105.464C59.8557 103.466 69.1843 101.878 80.6908 101.916C92.1936 101.955 101.519 103.606 101.514 105.604Z`,fill:`#007F75`})}),(0,f.jsx)(`g`,{mask:`url(#mask0_5064_2326)`,children:(0,f.jsx)(`path`,{d:`M101.275 106.755C101.286 108.302 92.0333 109.629 80.6055 109.72C69.1813 109.81 59.9079 108.63 59.8972 107.083C59.8866 105.537 69.1392 104.209 80.567 104.119C91.9912 104.028 101.265 105.209 101.275 106.755Z`,fill:`#61330D`})}),(0,f.jsx)(`path`,{d:`M89.8429 121.311L68.5791 121.309C68.3184 121.309 68.1055 121.523 68.1055 121.785L68.1052 131.937C68.1052 132.199 68.3181 132.413 68.5788 132.413L89.8428 132.415C90.1032 132.415 90.3161 132.201 90.3162 131.939L90.3164 121.786C90.3164 121.525 90.1035 121.311 89.8429 121.311ZM88.1064 123.683L86.5384 129.997C86.5036 130.137 86.353 130.255 86.2094 130.255L85.3688 130.255C85.2247 130.255 85.0719 130.137 85.0352 129.997L84.0311 126.177C84.0044 126.083 83.9329 126.022 83.849 126.022C83.7623 126.022 83.6913 126.085 83.6678 126.184L82.7971 129.997C82.7652 130.137 82.6176 130.255 82.4747 130.255L81.6051 130.255C81.4609 130.255 81.3079 130.137 81.2712 129.997L79.9105 124.833C79.8718 124.685 79.7701 124.593 79.6457 124.593C79.569 124.593 79.4922 124.628 79.4233 124.694L78.562 125.516C78.4228 125.649 78.2787 125.786 78.4051 126.17L79.7527 130.02L79.7596 130.04C79.7677 130.062 79.7712 130.079 79.7712 130.094C79.7712 130.183 79.6994 130.255 79.611 130.255L78.5853 130.255C78.439 130.255 78.2769 130.136 78.2315 129.997L77.3495 127.283C77.2839 127.074 77.1731 127.03 77.0916 127.03C77.0131 127.03 76.9324 127.071 76.8451 127.154L76.3934 127.585C76.1805 127.788 76.119 127.932 76.119 128.227L76.119 130.009C76.1189 130.144 76.0094 130.254 75.8746 130.254L75.0202 130.254C74.8855 130.254 74.7759 130.144 74.7759 130.009L74.776 127.68C74.776 127.44 74.582 127.246 74.3439 127.246L72.0793 127.246C71.8409 127.246 71.6472 127.44 71.6472 127.68L71.6471 130.009C71.6471 130.144 71.5376 130.254 71.4028 130.254L70.5526 130.254C70.4179 130.254 70.3083 130.144 70.3083 130.008L70.3085 123.714C70.3085 123.579 70.4181 123.469 70.5528 123.469L71.403 123.469C71.5377 123.469 71.6473 123.579 71.6473 123.714L71.6473 125.711C71.6473 125.95 71.8412 126.145 72.0794 126.145L74.3439 126.145C74.5823 126.145 74.776 125.951 74.776 125.711L74.7761 123.714C74.7761 123.579 74.8857 123.469 75.0204 123.469L75.8748 123.469C76.0096 123.469 76.1191 123.579 76.1191 123.715L76.1191 125.711C76.1191 125.914 76.2294 125.986 76.3239 125.986C76.39 125.986 76.4579 125.954 76.5263 125.892L78.9493 123.673C79.0937 123.541 79.2452 123.469 79.2827 123.469L79.7676 123.469L80.6247 123.469C80.7676 123.469 80.9155 123.587 80.9475 123.727L81.8828 127.87C81.902 127.95 81.9714 128.006 82.0516 128.006C82.1315 128.006 82.1984 127.951 82.2179 127.869L83.1605 123.727C83.1926 123.587 83.3404 123.47 83.4833 123.47L84.236 123.47C84.3796 123.47 84.5307 123.588 84.5657 123.728L85.6061 127.874C85.6248 127.949 85.6942 128.002 85.7746 128.002C85.858 128.002 85.9249 127.948 85.9412 127.868L86.8048 123.727C86.8339 123.588 86.9786 123.47 87.1205 123.47L87.9415 123.47C88.002 123.47 88.0518 123.491 88.0822 123.53C88.1123 123.57 88.1209 123.624 88.1064 123.683Z`,fill:`white`}),(0,f.jsxs)(`g`,{id:`coffee-steam`,opacity:`0.82`,children:[(0,f.jsx)(`path`,{id:`steam-wisp-1`,d:`M76.322 103.25C74.055 99.0771 74.213 94.8089 76.779 92.3077C79.346 89.8064 79.374 86.7871 78.165 84.1473`,stroke:`#FCFAE5`,strokeWidth:`2.4`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,f.jsx)(`path`,{id:`steam-wisp-2`,d:`M83.004 102.927C85.099 98.8948 84.964 94.6645 82.747 92.3908C80.531 90.1171 80.421 87.1254 81.566 84.2273`,stroke:`#FCFAE5`,strokeWidth:`2.35`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,f.jsx)(`path`,{id:`steam-wisp-3`,d:`M88.846 103.748C91.329 100.343 92.04 96.6419 90.309 94.1038C88.578 91.5657 88.661 88.5279 90.055 85.9246`,stroke:`#FEE3CA`,strokeWidth:`2.1`,strokeLinecap:`round`,strokeLinejoin:`round`})]})]}),(0,f.jsx)(`path`,{d:`M67.7755 123.032C64.9788 121.278 62.7267 119.626 62.7267 119.626L62.2837 115.334C62.1637 114.226 62.496 112.98 62.1544 111.919C61.6191 110.267 59.8839 108.661 57.9917 109.261C56.2934 109.796 53.6166 111.67 54.595 113.996C54.595 113.996 50.3031 117.392 51.6414 120.253C52.9798 123.115 53.8751 122.755 53.8751 122.755C53.8751 122.755 51.0138 123.382 52.7121 127.047C54.4104 130.711 55.7488 130.711 59.4131 132.585C61.1945 133.499 63.2528 133.859 65.2373 133.609C66.3633 133.471 68.2924 133.176 68.5047 131.81C68.837 129.779 65.1819 127.896 63.6959 127.231C65.0896 127.868 70.3046 130.443 71.0614 128.117C71.7629 125.948 69.4923 124.121 67.8955 123.124C67.8494 123.096 67.8032 123.069 67.7571 123.041L67.7755 123.032Z`,fill:`#4F4030`}),(0,f.jsx)(`path`,{d:`M58.8498 113.553C58.8498 113.553 57.576 110.534 60.7327 110.867C63.8801 111.199 68.2367 115.962 68.2367 115.962L59.1174 113.746`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M65.4218 130.748C65.4218 130.748 63.4835 129.779 63.4096 131.865C63.3358 133.951 72.6581 134.329 72.6581 134.329L65.4218 130.748Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M68.2649 128.745L74.6152 129.899C72.5015 128.422 70.3601 126.964 67.9603 126.041C67.6465 125.921 67.3142 125.801 66.9727 125.828C65.8559 125.912 66.0312 127.102 66.5758 127.739C66.5851 127.758 66.6035 127.767 66.6127 127.776C67.0743 128.284 67.665 128.561 68.3018 128.773L68.2557 128.736L68.2649 128.745Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M148.805 114.992C148.999 106.427 145.703 98.4612 139.676 97.2152C135.993 96.4583 132.061 97.5198 129.542 98.4705L129.837 98.6551C129.837 98.6551 127.686 99.5873 127.013 101.729L119.767 104.655L118.687 106.399C118.687 106.399 114.524 107.996 113.989 108.66C113.454 109.325 106.328 114.402 106.328 114.402C106.328 114.402 98.3902 123.096 99.424 137.172C99.5994 139.535 100.679 141.842 100.855 144.095C100.855 144.141 100.855 144.196 100.855 144.261C100.799 145.451 99.7655 149.965 98.6025 149.863C106.402 150.556 114.423 148.599 121.022 144.39C121.022 146.144 120.385 147.897 119.269 149.254C123.154 148.691 127.234 148.063 130.705 146.125C131.868 145.479 133.584 143.218 134.71 142.968C135.597 142.765 138.91 144.538 137.47 145.525C139.362 144.233 141.347 143.088 143.414 142.11C143.885 141.889 144.384 141.676 144.891 141.556C146.608 138.547 147.891 134.661 148.916 130.646C150.42 124.795 148.583 123.567 148.786 114.992H148.805Z`,fill:`#935F35`}),(0,f.jsx)(`path`,{d:`M134.526 137.135C134.923 138.289 135.412 139.415 135.837 140.421C135.154 136.434 138.56 133.009 141.753 130.545C144.947 128.071 148.593 125.145 148.658 121.103C148.676 121.278 148.685 121.463 148.713 121.638C149.248 115.804 148.759 107.23 146.47 103.178C143.507 97.9259 138.532 95.6368 133.105 97.3721C132.191 97.6582 130.761 98.2951 129.007 99.1443C128.324 99.6242 127.41 100.455 127.004 101.738L119.758 104.664L118.678 106.408C118.678 106.408 114.516 108.005 113.98 108.67C113.445 109.334 106.319 114.411 106.319 114.411C106.319 114.411 102.378 118.74 100.412 126.216C100.8 127.139 101.197 128.062 101.51 129.003C102.923 133.203 103.07 137.827 101.926 142.11C103.347 141.224 104.113 139.609 104.806 138.086C106.781 133.729 108.664 129.327 110.454 124.887C112.06 130.019 111.405 135.824 108.673 140.458C114.193 136.286 117.045 129.566 119.657 123.161C120.718 125.247 119.814 127.813 120.386 130.083C121.004 132.566 123.238 134.265 125.324 135.751C123.921 131.976 122.573 127.564 124.687 124.139C125.546 122.745 126.884 121.73 127.964 120.503C129.099 119.22 129.967 117.697 130.493 116.063C130.622 118.001 130.391 120.549 129.219 123.595C126.385 130.96 130.714 133.988 130.714 133.988C130.659 132.262 130.622 130.443 130.945 128.754C131.204 128.053 131.591 127.388 132.154 126.816C132.154 126.816 132.007 132.862 134.517 137.144L134.526 137.135Z`,fill:`#AD7149`}),(0,f.jsx)(`path`,{d:`M102.968 116.801C100.587 115.278 98.1133 113.082 95.3996 112.288C94.209 111.937 90.6738 111.549 90.0277 110.479C89.2616 109.196 90.8584 107.931 91.9107 107.544C92.6029 107.285 93.3506 107.23 94.0982 107.211C98.944 107.11 103.291 110.063 107.943 111.18C113.574 112.537 117.035 120.586 116.61 126.622C116.186 132.659 111.894 135.861 108.276 136.655C104.657 137.449 97.6794 137.163 96.2119 136.895C94.7351 136.618 93.0091 133.932 97.2918 133.545C101.584 133.157 104.002 131.957 104.002 131.957C104.002 131.957 98.5101 131.006 94.0797 131.394C89.6493 131.782 88.4494 131.108 88.7263 128.699C89.0032 126.29 102.682 124.582 102.682 124.582C102.682 124.582 95.6858 123.345 90.2216 123.207C84.0559 123.059 85.5419 118.638 91.5784 118.657C97.6148 118.675 102.977 116.811 102.977 116.811L102.968 116.801Z`,fill:`#4F4030`}),(0,f.jsx)(`path`,{d:`M84.499 109.334C84.499 109.334 93.0737 105.956 95.012 107.922C96.9504 109.888 88.8371 110.525 84.499 109.334Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M81.1396 121.481C81.1396 121.481 88.9944 117.623 91.0342 120.641C92.6864 123.087 82.5795 122.745 81.1396 121.481Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M83.8438 130.969C83.8438 130.969 90.1479 126.271 92.4462 128.607C94.3014 130.499 85.3206 131.856 83.8438 130.969Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M89.6035 136.48C89.6035 136.48 95.5384 132.612 97.4675 134.837C99.0366 136.646 90.8773 137.357 89.6035 136.48Z`,fill:`#281F17`}),(0,f.jsx)(`path`,{d:`M176.154 104.369C175.867 102.929 175.489 101.526 175.046 100.169C173.966 94.5293 172.831 90.865 171.88 88.5205C171.788 88.0313 171.732 87.7452 171.732 87.7452C173.071 89.7574 175.489 94.4462 175.489 94.4462C175.627 86.2684 169.729 80.7765 170.662 80.9057C171.603 81.0442 174.954 85.4654 174.954 85.4654C173.883 81.3119 171.529 77.9152 169.683 74.897C168.05 72.2387 166.148 69.442 164.136 66.8392C159.096 61.2181 151.223 56.9538 146.34 59.4551C141.365 62.0026 141.698 70.7065 141.707 70.845C141.707 70.845 140.498 83.7117 135.403 88.6774C130.308 93.634 129.099 98.1936 129.099 98.1936L129.763 98.5997C129.551 98.4705 128.379 99.5227 128.268 99.652C126.616 101.553 128.25 105.485 129.265 107.378C130.816 110.294 133.409 112.399 136.538 113.423C146.451 116.691 148.897 116.109 148.897 116.109C148.897 116.109 151.112 125.902 148.777 132.317C147.688 135.317 146.165 138.704 144.854 141.483C145.325 141.363 145.814 141.326 146.285 141.455C147.227 141.713 147.9 142.969 147.254 143.707C151.297 141.806 155.118 139.443 158.626 136.674C158.607 137.975 158.589 139.277 158.561 140.578C160.518 139.48 162.281 138.04 163.767 136.36C165.197 134.735 165.917 132.206 167.385 130.757C170.016 128.154 176.126 132.557 174.538 135.861C174.538 135.852 176.68 131.422 173.2 123.124C173.2 123.124 175.609 123.659 176.818 126.881C176.818 126.881 176.68 118.435 171.991 110.128L172.341 110.414C174.954 113.442 177.889 116.294 177.889 116.294C177.889 116.294 178.156 114.549 176.144 104.359L176.154 104.369Z`,fill:`#935F35`}),(0,f.jsx)(`path`,{d:`M170.431 94.8523C169.49 82.8624 165.115 71.8694 160.5 63.304C158.294 61.1257 152.783 56.5199 147.614 58.8735C140.969 61.901 141.698 70.8541 141.698 70.8541C141.698 70.8541 140.489 83.7208 135.394 88.6866C130.299 93.6431 129.09 98.2028 129.09 98.2028C129.09 98.2028 129.754 98.5997 129.754 98.6089C129.487 98.452 128.361 99.5965 128.25 99.7626C126.635 102.218 127.982 106.27 129.348 108.55C131.12 111.503 134.083 113.442 137.277 114.577C138.818 115.121 140.415 115.491 142.03 115.749C142.63 115.841 148.021 116.091 148.067 116.238C148.067 116.238 148.907 118.887 148.777 122.376C149.165 126.973 148.51 131.652 146.83 135.954C152.322 131.062 156.06 124.25 157.297 117.004C156.964 121.942 158.423 127.01 161.413 130.96C160.841 125.551 161.884 119.976 164.367 115.14C164.468 117.106 164.256 119.081 163.73 120.973C169.13 111.522 170.625 99.9196 167.801 89.4065C169.01 91.0126 170.016 92.8955 170.422 94.8615L170.431 94.8523Z`,fill:`#AD7149`}),(0,f.jsxs)(`g`,{id:`left-ear`,children:[(0,f.jsx)(`path`,{d:`M129.376 13.6464C129.376 13.6464 137.028 11.7727 137.268 6.4654C137.508 1.14889 128.02 1.22273 125.26 6.29926C122.5 11.3758 129.376 13.6464 129.376 13.6464Z`,fill:`#A4673A`}),(0,f.jsx)(`path`,{d:`M136.668 4.28709C134.573 1.30578 127.558 2.04419 125.26 6.29924C124.134 8.376 124.623 9.99126 125.592 11.1635C126.922 8.02526 130.614 1.18579 136.678 4.28709H136.668Z`,fill:`#B2783B`})]}),(0,f.jsxs)(`g`,{id:`right-ear`,children:[(0,f.jsx)(`path`,{d:`M83.4759 11.828C83.4759 11.828 78.2886 7.98829 79.1839 2.801C80.0793 -2.37705 86.9649 0.207359 87.9433 5.83769C88.9309 11.468 83.4759 11.828 83.4759 11.828Z`,fill:`#A4673A`}),(0,f.jsx)(`path`,{d:`M87.9434 5.83772C87.085 0.881185 81.6577 -1.71246 79.7471 1.25962C81.5654 1.60113 84.1683 3.31792 86.0697 9.68665C86.1804 10.0743 86.3004 10.4066 86.4204 10.7112C87.5095 9.87125 88.3956 8.40367 87.9526 5.84695L87.9434 5.83772Z`,fill:`#B2783B`})]}),(0,f.jsx)(`path`,{d:`M155.064 56.4554C155.064 56.4554 142.41 37.6631 139.779 25.2025C137.149 12.742 128.002 7.58236 126.534 7.48083C125.076 7.3793 82.5255 9.23454 82.5255 9.23454C82.5255 9.23454 82.2301 17.2185 76.8767 22.7658C71.5232 28.313 65.5791 33.8695 65.5791 43.801C65.5791 53.7326 110.373 62.8888 110.373 62.8888L147.662 57.5261C149.72 59.1598 152.701 62.1965 153.108 66.35C153.108 66.35 154.372 61.3381 153.283 56.7139L155.074 56.4554H155.064Z`,fill:`#A4673A`}),(0,f.jsx)(`path`,{d:`M155.35 57.3323C154.122 47.9731 143.046 46.4409 135.754 43.6626C131.37 41.992 126.967 40.2106 123.008 37.6631C119.187 35.1895 115.153 31.922 114.904 27.0209C114.673 22.6735 117.174 18.6584 119.427 15.1233C120.47 13.4896 121.642 11.9113 123.045 10.5729C123.792 9.86221 126.608 7.30549 127.789 7.76699C127.789 7.76699 121.365 5.23796 119.611 4.64724C117.857 4.06574 85.1462 5.81022 85.1462 5.81022L82.7556 9.34533C83.0325 9.06843 84.5554 14.0527 84.5924 14.3296C85.1277 18.8154 83.6509 23.7534 80.9926 27.5101C77.8452 31.9682 71.901 34.3311 67.5168 37.3493C64.3693 39.5183 60.6773 42.0474 59.099 45.684C59.099 45.684 62.8925 41.8905 64.7939 41.7428C64.7939 41.7428 58.0744 48.1669 57.6406 51.822C57.6406 51.822 61.5818 47.4377 63.1879 47.1516C63.1879 47.1516 57.6406 54.1664 58.6652 60.8767C58.8128 61.8458 59.2743 62.935 59.9943 64.0703C59.4959 62.7134 60.142 61.3289 60.7788 60.1383C60.7788 60.1383 62.071 65.3809 64.8401 69.516C64.8401 69.516 64.8585 69.5252 64.8678 69.5344L64.7016 65.9717C64.7016 65.9717 67.1845 69.0729 68.7536 72.5804C68.9105 72.1742 69.0582 71.5466 68.8921 70.7897C68.8736 70.7067 68.8644 70.6328 68.8921 70.559C68.9382 70.4575 70.2304 72.2481 70.3319 72.4419C71.5965 74.6664 73.7286 75.9401 75.9438 77.0754C79.9773 79.1522 84.4539 80.5736 88.9489 81.2012C91.6441 81.5797 94.2562 81.4412 96.9606 81.4781C102.794 81.5612 108.655 81.2658 114.488 80.8505C117.821 79.669 121.383 78.0722 123.663 76.1062C123.663 76.1062 121.928 78.4876 118.734 80.5274C119.159 80.4905 119.593 80.4628 120.017 80.4259C122.251 79.4198 125.02 77.9246 127.171 75.9586C127.171 75.9586 126.857 78.1092 125.14 80.029L135.422 74.934C135.422 74.934 133.798 77.7307 131.176 79.5398C133.918 79.1891 136.604 78.5799 139.022 77.2785C142.142 75.5894 144.791 72.968 146.72 69.9959C146.914 69.6914 147.107 69.3868 147.283 69.0637C147.477 71.1128 146.12 73.1526 146.12 73.1526C153.808 68.9622 149.526 56.5016 149.526 56.5016C154.787 56.9908 154.39 68.473 154.39 68.473C154.39 68.473 156.725 67.6977 155.359 57.277L155.35 57.3323Z`,fill:`#B2783B`}),(0,f.jsx)(`path`,{d:`M125.731 6.20701C125.731 6.20701 125.777 6.17932 125.805 6.16086C113.354 -1.32471 96.8503 -1.48162 84.2605 5.75474C86.4203 15.1694 85.5158 25.7101 79.747 33.4541C76.1565 38.2722 70.6739 42.195 69.6309 48.1114C70.3416 47.2069 71.043 46.3116 71.7538 45.407C70.0554 49.8928 69.8893 54.9416 71.3015 59.5197C71.4769 58.3937 71.6522 57.2768 71.8276 56.1508C73.1936 61.8273 77.1626 66.7561 82.2668 69.5897C87.371 72.4233 93.5182 73.2079 99.2408 72.0634C103.284 71.2511 107.253 69.3867 110.012 66.3869C112.689 63.8763 114.055 61.4119 114.055 61.4119C114.249 66.5715 110.068 69.5897 110.068 69.5897C110.068 69.5897 113.769 67.3468 117.562 62.2888C121.356 57.2307 120.092 49.7267 120.092 49.7267L121.458 53.4279C121.458 53.4279 122.824 48.1668 117.95 40.7735C115.901 37.663 114.203 34.1371 113.39 30.482C112.477 26.4208 113.557 22.8119 115.126 19.0368C117.295 13.8218 120.839 9.04063 125.722 6.19778L125.731 6.20701Z`,fill:`#DF975E`}),(0,f.jsx)(`path`,{d:`M93.4187 52.2007V34.6451C93.4187 34.5067 89.939 34.839 89.6806 34.8759C87.8715 35.162 86.1362 35.7066 84.5948 36.5096C82.2873 37.7003 80.4874 39.4078 79.1399 41.2908C77.6723 43.3583 76.5924 45.6843 76.3985 48.1118C76.2232 50.2808 76.2416 52.9852 78.4384 54.5636C80.5521 56.0865 83.6349 55.6435 86.0162 54.8035L93.4187 52.1915V52.2007Z`,fill:`#F9BE71`}),(0,f.jsx)(`path`,{d:`M94.6835 34.6912C94.6835 34.6912 94.3789 34.6636 93.862 34.6543L93.7051 52.2006C93.7051 52.2006 100.526 58.8001 109.092 55.2742C117.657 51.7391 107.929 32.5406 94.6835 34.6912Z`,fill:`#F9BE71`}),(0,f.jsx)(`path`,{d:`M85.7491 36.9341C86.0445 36.0018 86.6998 35.2357 87.5675 34.8019C88.8412 34.165 91.158 33.4728 95.1176 33.7128C102.059 34.1373 103.379 36.9894 102.954 40.1276C102.529 43.2659 97.5728 47.3271 94.167 47.3086C90.7518 47.2902 86.7644 43.6904 85.7491 41.023C85.1584 39.4723 85.4261 37.9494 85.7491 36.9341Z`,fill:`#BB7D39`}),(0,f.jsx)(`path`,{d:`M82.6836 55.5327C82.6836 55.5327 85.5357 66.7288 93.0028 66.5534C100.47 66.378 104.199 56.4096 104.199 56.4096C104.199 56.4096 97.1102 55.9758 93.4274 52.2007C93.4274 52.2007 87.5294 55.3574 82.6928 55.5327H82.6836Z`,fill:`#38190E`}),(0,f.jsx)(`path`,{d:`M93.4279 52.2007C93.4279 52.2007 88.896 53.9359 87.5576 54.4528L88.1299 59.0402L97.766 59.5017L99.2798 55.5143C95.717 54.3975 93.4372 52.2007 93.4372 52.2007H93.4279Z`,fill:`#F3F3F3`}),(0,f.jsx)(`path`,{d:`M80.7915 55.4773C85.2034 55.0527 89.4308 53.3636 93.5105 51.656C95.9195 53.8897 99.1315 55.3388 102.39 55.8095C103.433 56.1418 104.513 56.271 105.62 56.4372C103.405 56.9356 101.088 56.7418 98.9562 55.9203C96.7963 55.1634 94.8119 54.0743 93.0859 52.5236L93.5935 52.6159C91.5629 53.4836 89.5046 54.2958 87.3817 54.9604C85.2773 55.5973 82.9328 56.271 80.7822 55.468L80.7915 55.4773Z`,fill:`#BB7D39`}),(0,f.jsx)(`path`,{d:`M101.808 60.8399C93.5288 58.5047 88.6923 65.215 88.6923 65.215H88.6738C89.9014 66.0641 91.3321 66.5903 93.0027 66.5533C97.0178 66.461 99.953 63.5259 101.808 60.8399Z`,fill:`#841A1A`}),(0,f.jsxs)(`g`,{id:`left-eye`,children:[(0,f.jsx)(`path`,{d:`M121.383 19.3136C121.383 19.3136 121.918 11.0619 125.998 10.7481C130.078 10.4343 130.17 13.3325 134.056 13.3325C134.056 13.3325 132.2 14.0986 128.979 13.1018C126.838 12.4003 123.035 11.5511 121.383 19.3136Z`,fill:`#2B1E15`}),(0,f.jsx)(`path`,{d:`M128.129 20.7536C130.087 20.7536 131.674 18.8733 131.674 16.5539C131.674 14.2345 130.087 12.3542 128.129 12.3542C126.172 12.3542 124.585 14.2345 124.585 16.5539C124.585 18.8733 126.172 20.7536 128.129 20.7536Z`,fill:`#2B1E15`}),(0,f.jsx)(`path`,{d:`M129.782 15.234C130.21 15.234 130.557 14.8869 130.557 14.4587C130.557 14.0305 130.21 13.6833 129.782 13.6833C129.354 13.6833 129.007 14.0305 129.007 14.4587C129.007 14.8869 129.354 15.234 129.782 15.234Z`,fill:`white`})]}),(0,f.jsxs)(`g`,{id:`right-eye`,children:[(0,f.jsx)(`path`,{d:`M82.7738 9.56665L79.8848 11.6896C79.8848 11.6896 82.5522 10.545 83.3645 13.9048C84.1767 17.2645 84.1767 18.769 84.1767 18.769C84.1767 18.769 85.4412 12.9356 82.7738 9.56665Z`,fill:`#2B1E15`}),(0,f.jsx)(`path`,{d:`M82.8662 18.8612C83.7124 18.8612 84.3984 17.2454 84.3984 15.2523C84.3984 13.2591 83.7124 11.6433 82.8662 11.6433C82.02 11.6433 81.334 13.2591 81.334 15.2523C81.334 17.2454 82.02 18.8612 82.8662 18.8612Z`,fill:`#2B1E15`}),(0,f.jsx)(`path`,{d:`M83.4288 13.8494C83.8366 13.8494 84.1672 13.5188 84.1672 13.111C84.1672 12.7032 83.8366 12.3726 83.4288 12.3726C83.021 12.3726 82.6904 12.7032 82.6904 13.111C82.6904 13.5188 83.021 13.8494 83.4288 13.8494Z`,fill:`white`})]}),(0,f.jsx)(`path`,{d:`M88.959 14.2094C88.959 14.2094 101.604 8.69908 114.692 15.9816L114.554 18.1045C114.554 18.1045 102.813 9.88053 89.2728 16.0554`,fill:`#1C2D38`}),(0,f.jsx)(`path`,{d:`M81.8146 6.78844C77.7349 7.00074 74.5875 11.2742 74.7905 16.36C74.9936 21.4365 78.4641 25.387 82.5438 25.1747C86.6235 24.9624 89.7709 20.6889 89.5678 15.6031C89.3648 10.5266 85.8943 6.57615 81.8146 6.78844ZM82.4607 22.9872C79.3225 23.1533 76.6458 20.1074 76.4889 16.2031C76.332 12.2896 78.7502 8.99443 81.8977 8.83751C85.0359 8.6806 87.7126 11.7173 87.8695 15.6216C88.0264 19.5351 85.6082 22.8303 82.4607 22.9872Z`,fill:`#1C2D38`}),(0,f.jsx)(`path`,{d:`M123.848 8.54211C118.532 8.7544 114.424 13.0279 114.692 18.1137C114.951 23.1902 119.482 27.1406 124.808 26.9284C130.134 26.7161 134.232 22.4426 133.964 17.3568C133.706 12.2803 129.174 8.32982 123.848 8.54211ZM124.697 24.7408C120.599 24.907 117.12 21.8611 116.917 17.9567C116.713 14.0432 119.87 10.7481 123.968 10.5912C128.066 10.425 131.546 13.4709 131.749 17.3753C131.952 21.2888 128.796 24.5839 124.697 24.7408Z`,fill:`#1C2D38`})]})})]}),bt=t`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`,xt=t`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`,St=t`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -1.6px, 0);
  }
`,Ct=t`
  0% {
    opacity: 0;
    transform: translate3d(-1px, 5px, 0) scale(0.82);
  }

  20% {
    opacity: 0.5;
  }

  62% {
    opacity: 0.26;
  }

  100% {
    opacity: 0;
    transform: translate3d(-5px, -15px, 0) scale(1.08);
  }
`,wt=t`
  0% {
    opacity: 0;
    transform: translate3d(0, 5px, 0) scale(0.8);
  }

  18% {
    opacity: 0.56;
  }

  58% {
    opacity: 0.28;
    transform: translate3d(2px, -6px, 0) scale(0.94);
  }

  100% {
    opacity: 0;
    transform: translate3d(4px, -16px, 0) scale(1.05);
  }
`,Tt=t`
  0% {
    opacity: 0;
    transform: translate3d(1px, 5px, 0) scale(0.78);
  }

  22% {
    opacity: 0.48;
  }

  56% {
    opacity: 0.22;
    transform: translate3d(-2px, -6px, 0) scale(0.94);
  }

  100% {
    opacity: 0;
    transform: translate3d(-4px, -15px, 0) scale(1.04);
  }
`,Et=t`
  0%,
  8%,
  32%,
  100% {
    transform: translateY(0) scaleY(1);
  }

  8.4%,
  32.4% {
    transform: translateY(0.45px) scaleY(0.42);
  }

  8.8%,
  9.35%,
  32.8%,
  33.35% {
    transform: translateY(0.9px) scaleY(0.08);
  }

  9.8%,
  33.8% {
    transform: translateY(0.2px) scaleY(0.66);
  }
`,Dt=t`
  0%,
  100% {
    transform: rotate(0deg);
  }

  14% {
    transform: rotate(-5deg) translateY(-0.75px);
  }

  22% {
    transform: rotate(2.6deg) translateY(0.1px);
  }

  30% {
    transform: rotate(-1.4deg) translateY(-0.35px);
  }

  38% {
    transform: rotate(0deg);
  }
`,Ot=t`
  0%,
  100% {
    transform: rotate(0deg);
  }

  12% {
    transform: rotate(5.4deg) translateY(-0.55px);
  }

  20% {
    transform: rotate(-2.4deg) translateY(0.05px);
  }

  28% {
    transform: rotate(1.6deg) translateY(-0.3px);
  }

  36% {
    transform: rotate(0deg);
  }
`,kt=({$state:e})=>e===`leaving`?a`
      animation: ${xt} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
      pointer-events: none;
      z-index: 1;
    `:e===`entering`?a`
      animation: ${bt} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
      z-index: 2;
    `:a`
    opacity: 1;
    z-index: 2;
  `,$=(e,t)=>e==null||e===``?t:typeof e==`number`?`${e}px`:e,At=(e,t)=>e===void 0?t:typeof e==`number`?`${e}deg`:e,jt=e=>$(e,`auto`),Mt=r(u)`
  overflow: hidden;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    background: linear-gradient(
      to top,
      white 70%,
      transparent 70%,
      transparent 100%
    );
    overflow-y: auto;
  }
`,Nt=r.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 0;
  padding: min(32.8125vh, 336px) 0 0
    ${({$isWide:e})=>e?`calc(clamp(132px, 17.5vw, 252px) - 60px)`:`clamp(132px, 17.5vw, 252px)`};

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    padding: 252px 72px 190px
      ${({$isWide:e})=>e?`calc(clamp(132px, 17.5vw, 180px) - 60px)`:`clamp(132px, 17.5vw, 180px)`};
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    align-items: flex-start;
    padding: 112px 20px 36px;
  }
`,Pt=r.div`
  display: flex;
  align-items: flex-start;
  gap: 64px;
  width: min(calc(100vw - clamp(132px, 17.5vw, 252px)), 1044px);
  min-height: 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    gap: 36px;
    width: min(100%, 1000px);
    height: 460px;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    width: 100%;
    height: auto;
  }
`,Ft=r.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${({$layout:e})=>$(e?.flexBasis,`calc(52.5% - 64px)`)};
  max-width: ${({$layout:e})=>$(e?.maxWidth,`424px`)};
  display: grid;
  align-content: start;
  min-width: 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    flex-basis: 340px;
    min-height: 460px;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    flex-basis: auto;
    width: 100%;
    gap: 16px;
    min-height: 0;
  }
`,It=r(r.div`
  grid-area: 1 / 1;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  row-gap: ${({$compactCopy:e})=>e?`40px`:`45px`};
  min-width: 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    row-gap: 16px;
    min-height: 0;
  }
`)`
  ${kt}
  display: flex;
  flex-direction: column;
  gap: 45px;

  .quote-and-attribution {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`,Lt=r.h2`
  font-size: ${({theme:e})=>e.typography.h4.size};
  text-box: ${({theme:e})=>e.typography.textBox};
  font-weight: ${({theme:e})=>e.font.weight.bold};
  font-variation-settings:
    'wdth' ${({theme:e})=>e.font.width.condensed},
    'wght' ${({theme:e})=>e.font.weight.bold};
  line-height: 1;
  letter-spacing: -0.96px;
  color: ${({theme:e})=>e.colors.orange.base};

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    margin-top: 24px;
  }
`,Rt=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({theme:e})=>e.colors.blue.dark};
`,zt=r.p`
  ${o(`h5`)}
  font-size: 20px;
  letter-spacing: ${({$letterSpacing:e})=>$(e,`-0.24px`)};
  font-variation-settings:
    'wdth' ${({theme:e})=>e.font.width.regular},
    'wght' ${({theme:e})=>e.font.weight.medium};
  color: ${({theme:e})=>e.colors.blue.dark};

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    font-size: 18px;
  }
`,Bt=r.p`
  font-size: ${({theme:e})=>e.typography.bodyMedium.size};
  font-weight: ${({theme:e})=>e.font.weight.medium};
  font-variation-settings:
    'wdth' ${({theme:e})=>e.font.width.semicondensed},
    'wght' ${({theme:e})=>e.font.weight.regular},
    'slnt' ${({theme:e})=>e.font.slant.italic};
  line-height: 1.1;

  font-style: italic;
  color: ${({theme:e})=>e.colors.blue.dark};
  opacity: 0.8;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    font-size: 16px;
  }
`,Vt=r.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
`,Ht=r.li`
  font-size: ${({$compactCopy:e})=>e?`16px`:`18px`};
  letter-spacing: 0;
  font-weight: ${({theme:e})=>e.font.weight.semibold};
  font-variation-settings:
    'wdth' ${({theme:e})=>e.font.width.regular},
    'wght' ${({theme:e})=>e.font.weight.semibold};
  line-height: 1.5;
  color: ${({theme:e})=>e.colors.blue.dark};

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    font-size: 16px;
  }
`,Ut=r.div`
  position: relative;
  flex: 0 0 60.5%;
  height: 841px;
  min-width: 0;
  display: grid;
  align-items: start;
  justify-items: start;
  min-height: 0;
  overflow: visible;

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    flex: 1 1 auto;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    width: 100%;
  }
`,Wt=r(r.div`
  position: absolute;
  inset: 0;
  grid-area: 1 / 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  pointer-events: none;
  overflow: visible;
  width: ${({$layout:e})=>jt(e?.width)};
  max-width: ${({$layout:e})=>$(e?.maxWidth,`none`)};

  img {
    display: block;
    width: 100%;
    aspect-ratio: ${({$layout:e})=>e?.aspectRatio??`auto`};
    transform: rotate(
      ${({$layout:e})=>At(e?.rotation,`0deg`)}
    );
    transform-origin: center;
    translate: ${({$layout:e})=>$(e?.desktop?.x,`0`)}
      ${({$layout:e})=>$(e?.desktop?.y,`0`)};
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;

    img {
      width: min(100%, 360px);
      max-width: 100%;
      max-height: 260px;
      object-fit: contain;
      transform: none;
      translate: ${({$layout:e})=>$(e?.mobile?.x,`0`)}
        ${({$layout:e})=>$(e?.mobile?.y,`0`)};
    }
  }
`)`
  ${kt}
`,Gt=r.svg`
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: auto;
  overflow: visible;
  pointer-events: none;
  transform: translateY(
    ${({$isActive:e,$isEntryComplete:t})=>!e&&!t?`-20px`:`0`}
  );
  transition: transform 500ms ease;
  will-change: transform;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    transform: translateY(128%);
  }
`,Kt=r.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: min(calc(100% - 144px), 1296px);
  transform: translateX(-50%);
  pointer-events: auto;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    display: none;
  }

  @media (min-width: ${({theme:e})=>e.breakpoints.mobile}) and (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    bottom: -36px;
  }
`,qt=r.div`
  width: min(100%, ${({$viewportWidth:e})=>`${e}px`});
  overflow-x: hidden;
  overflow-y: visible;
  cursor: ${({$dragging:e})=>e?`grabbing`:`grab`};
  touch-action: pan-y;
  user-select: none;
`,Jt=r.div`
  overflow-y: hidden;
  display: flex;
  gap: 24px;
  width: max-content;
  will-change: transform;
`;r.div`
  display: none;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    display: block;
    width: calc(100% + 8px);
    margin-right: -8px;
    overflow-x: auto;
    pointer-events: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`,r.div`
  display: flex;
  gap: 8px;
  width: max-content;
  padding: 4px 8px 8px 0;
`;var Yt=r.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${({$layout:e})=>`${e.width}px`};
  height: ${({$layout:e})=>`${e.height}px`};
  padding: 0;
  border: none;
  border-radius: ${({$compact:e,$layout:t})=>`${Math.min(t.width,t.height,e?18:28)}px`};
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  transform: translate(${({$layout:e})=>`${e.x}px, ${e.y}px`});

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.yellow.gold};
    outline-offset: 4px;
  }
`,Xt=r.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`,Zt=r.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: darken;
  pointer-events: none;
  filter: ${({$current:e,theme:t})=>e?`drop-shadow(-3px 5px 0 ${t.colors.orange.base})`:`none`};
  transition: filter 200ms ease;

  ${Yt}:hover &,
  ${Yt}:focus-visible & {
    filter: drop-shadow(-3px 5px 0 ${({theme:e})=>e.colors.orange.base});
  }
`,Qt=r.span`
  width: ${({$compact:e})=>e?`10px`:`14px`};
  height: ${({$compact:e})=>e?`10px`:`14px`};
  border-radius: 50%;
  background: ${({$current:e,theme:t})=>e?t.colors.orange.base:t.colors.blue.dark};
  opacity: ${({$current:e})=>e?1:.28};
  transition:
    opacity 200ms ease,
    background-color 200ms ease;

  ${Yt}:hover &,
  ${Yt}:focus-visible & {
    background: ${({theme:e})=>e.colors.orange.base};
    opacity: 1;
  }
`,$t=r.div`
  position: absolute;
  top: 142px;
  right: 114.84px;
  z-index: 2;
  pointer-events: none;

  #marmot-character-idle,
  #left-ear,
  #right-ear,
  #left-eye,
  #right-eye,
  #coffee-steam path {
    transform-box: fill-box;
    will-change: transform, opacity;
  }

  #marmot-character-idle {
    transform-origin: center bottom;
    animation: ${St} 5.4s ease-in-out 420ms infinite;
  }

  #left-ear {
    transform-origin: center bottom;
    animation: ${Dt} 6.1s ease-in-out 560ms infinite;
  }

  #right-ear {
    transform-origin: center bottom;
    animation: ${Ot} 5.8s ease-in-out 660ms infinite;
  }

  #left-eye,
  #right-eye {
    transform-origin: center;
    animation: ${Et} 8.4s ease-in-out 720ms infinite;
  }

  #coffee-steam {
    pointer-events: none;
  }

  #coffee-steam path {
    opacity: 0;
    transform-origin: center bottom;
  }

  #steam-wisp-1 {
    animation: ${Ct} 3.4s ease-out 620ms infinite;
  }

  #steam-wisp-2 {
    animation: ${wt} 3.15s ease-out 920ms infinite;
  }

  #steam-wisp-3 {
    animation: ${Tt} 2.95s ease-out 1.18s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    #marmot-character-idle,
    #left-ear,
    #right-ear,
    #left-eye,
    #right-eye,
    #coffee-steam path {
      animation: none;
      transform: none;
    }

    #coffee-steam path {
      opacity: 0;
    }
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    right: 72px;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    display: none;
  }
`,en=r(d)`
  position: absolute;
  top: 50%;
  z-index: 3;
  pointer-events: auto;
  transform: translateY(-100%);

  ${({$side:e})=>e===`left`?`left: 68px;`:`right: 68px;`}

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    ${({$side:e})=>e===`left`?`left: 20px;`:`right: 20px;`}
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    top: 95%;
  }
`;i.registerPlugin(gt);var tn=8,nn=3,rn=1,an=24,on=10,sn=500,cn=420,ln=rn*Q.length,un=(e,t)=>(e%t+t)%t,dn=(e,t)=>{let n=Math.min(tn,t);return t<=n?0:Math.max(0,Math.min(e-3,t-n))},fn=e=>{let t=Math.min(tn,e.length),n=Math.max(0,e.length-t),r=0;for(let i=0;i<=n;i+=1){let n=e.slice(i,i+t),a=n.reduce((e,t)=>e+t,0)+Math.max(0,n.length-1)*an;r=Math.max(r,a)}return r},pn=(e,t)=>e.slice(0,t).reduce((e,t)=>e+t,0)+t*an,mn=(e,t)=>{let n=Math.max(0,t-Math.min(tn,t));return Array.from({length:n+1},(t,n)=>({start:n,offset:pn(e,n)}))},hn=(e,t)=>t.reduce((t,n)=>Math.abs(n.offset-e)<Math.abs(t.offset-e)?n:t,t[0]??{start:0,offset:0}),gn=(e,t)=>e-un(e,t),_n=(e,t)=>gn(e,t)+dn(un(e,t),t),vn=(e,t,n)=>{let r=Math.max(0,t-Math.min(tn,n));return Math.max(0,Math.min(e,r))},yn=(e,t,n)=>{let r=Math.min(tn,n);return e<t?e:e>=t+r?e-r+1:t},bn=({currentVisualIndex:e,nextVisualIndex:t,currentWindowStart:n,itemCount:r})=>{let i=_n(e,r),a=_n(t,r),o=Math.abs(t-e)===1,s=n!==i,c=un(e,r),l=un(t,r),u=t>e&&c===r-1&&l===0,d=t<e&&c===0&&l===r-1;return o&&(s||u||d)?yn(t,n,r):a},xn=(e,t,n)=>{let r=Math.round((t-e)/n),i=[r-1,r,r+1].map(t=>t*n+e);return i.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,i[0])},Sn=({visualIndex:e,windowStart:t,itemCount:n,totalCount:r})=>{let i=ln,a=i+n-1;if(e>=i&&e<=a)return{visualIndex:e,windowStart:t};let o=i+un(e,n);return{visualIndex:o,windowStart:vn(t+(o-e),r,n)}},Cn=()=>Array.from({length:nn},(e,t)=>Q.map((e,n)=>({caseStudy:e,itemIndex:n,visualIndex:t*Q.length+n,isDuplicate:t!==rn}))).flat(),wn=e=>Array.from({length:nn},()=>e).flat(),Tn=({caseStudy:e,itemIndex:t,visualIndex:n,isCurrent:r,isAccessibleCurrent:i,isDuplicate:a=!1,handleSelect:o,compact:s=!1,keyPrefix:c})=>{let l=!!e.navIcon,u=vt(e.navButton,s);return(0,f.jsx)(Yt,{type:`button`,"aria-label":a?void 0:`Show ${e.name}`,"aria-current":i?`true`:void 0,"aria-hidden":a?`true`:void 0,tabIndex:a?-1:void 0,"data-nav-kind":l?`icon`:`dot`,"data-work-example":e.id,"data-work-example-region":s?`mobile-nav`:`desktop-nav`,$compact:s,$layout:u,onClick:()=>o(t,n),children:(0,f.jsx)(Xt,{children:l?(0,f.jsx)(Zt,{src:e.navIcon,alt:``,"aria-hidden":`true`,$current:r}):(0,f.jsx)(Qt,{$compact:s,$current:r})})},`${c}-${e.id}`)},En=(e,t)=>{let n=e.attribution.replace(/^[—-]\s*/,``),r=!!e.isCompact,i=e.services.length>4;return(0,f.jsxs)(It,{className:t,$state:t,"aria-hidden":t===`leaving`?`true`:void 0,"data-study-pane":t,"data-work-example":e.id,"data-work-example-region":`copy`,"data-testid":t===`active`?`work-study-active`:void 0,$compactCopy:r,children:[(0,f.jsx)(Lt,{$compactCopy:r,children:e.name}),(0,f.jsxs)(Rt,{children:[(0,f.jsx)(zt,{$compactCopy:r,$letterSpacing:e.letterSpacing,children:e.quote}),(0,f.jsxs)(Bt,{$compactCopy:r,children:[`—`,n]})]}),(0,f.jsx)(Vt,{$compactCopy:r,children:e.services.map(n=>(0,f.jsx)(Ht,{$compactCopy:r,$denseServices:i,children:n},`${e.id}-${t}-${n}`))})]},e.id)},Dn=(e,t)=>e.image?(0,f.jsx)(Wt,{$state:t,"aria-hidden":t===`leaving`?`true`:void 0,"data-study-pane":t,"data-work-example":e.id,"data-work-example-region":`hero`,$layout:e.heroImage,children:(0,f.jsx)(`img`,{src:e.image,alt:e.name})},e.id):null,On=()=>{let e=l(),[t,r]=(0,p.useState)(0),[a,o]=(0,p.useState)(0),[s,c]=(0,p.useState)(`active`),[u,d]=(0,p.useState)(ln),[m,h]=(0,p.useState)(ln),[g,_]=(0,p.useState)(!1),[v,y]=(0,p.useState)(!1),[b,x]=(0,p.useState)(!1),S=(0,p.useRef)(null),C=(0,p.useRef)(null),w=(0,p.useRef)(!1),T=(0,p.useRef)(!1),E=(0,p.useRef)(null),D=Q[a],O=(0,p.useMemo)(()=>Cn(),[]),k=(0,p.useMemo)(()=>Q.map(e=>vt(e.navButton).width),[]),A=(0,p.useMemo)(()=>wn(k),[k]),j=(0,p.useMemo)(()=>fn(A),[A]),M=(0,p.useMemo)(()=>mn(A,O.length),[O.length,A]),N=M.find(e=>e.start===m)?.offset??0,ee=M[M.length-1]?.offset??0;(0,p.useEffect)(()=>{if(!e)return;let t=window.setTimeout(()=>{y(!0)},sn);return()=>{window.clearTimeout(t)}},[e]),(0,p.useEffect)(()=>{if(s===`leaving`){let e=window.setTimeout(()=>{o(t),c(`entering`)},cn);return()=>{window.clearTimeout(e)}}if(s===`entering`){let e=window.setTimeout(()=>{c(`active`)},cn);return()=>{window.clearTimeout(e)}}},[t,s]),(0,p.useEffect)(()=>(E.current&&=(window.clearTimeout(E.current),null),()=>{E.current&&window.clearTimeout(E.current)}),[]),(0,p.useLayoutEffect)(()=>{let e=S.current;if(!e)return;let t=-N;if(!w.current||T.current){i.set(e,{x:t}),w.current=!0,T.current=!1;return}let n=i.to(e,{x:t,duration:g?0:.42,ease:`power3.out`,overwrite:!0,onComplete(){if(g)return;let e=Sn({visualIndex:u,windowStart:m,itemCount:Q.length,totalCount:O.length});e.visualIndex===u&&e.windowStart===m||(T.current=!0,d(e.visualIndex),h(e.windowStart))}});return()=>{n.kill()}},[O.length,N,u,m,g]),(0,p.useEffect)(()=>{let e=S.current;if(!e)return;if(C.current&&=(C.current.kill(),null),M.length<=1){i.set(e,{x:0});return}let t=gt.create(e,{type:`x`,bounds:{minX:-ee,maxX:0},minimumMovement:on,dragClickables:!0,allowContextMenu:!0,activeCursor:`grabbing`,cursor:`grab`,onPress(){i.killTweensOf(e)},onDragStart(){x(!0),_(!0)},onDragEnd(){let e=hn(-(t?.x??0),M);_(!1),h(e.start),E.current&&window.clearTimeout(E.current),E.current=window.setTimeout(()=>{x(!1),E.current=null},0)},onRelease(){_(!1)}})[0];return C.current=t,()=>{t.kill(),C.current=null}},[M,ee]);let te=e=>{let n=un(e,Q.length);n===t&&e===u||(h(vn(bn({currentVisualIndex:u,nextVisualIndex:e,currentWindowStart:m,itemCount:Q.length}),O.length,Q.length)),d(e),n!==t&&(c(`leaving`),r(n)))},ne=e=>{te(xn(un(e,Q.length),u,Q.length))},P=()=>te(u+1),re=()=>te(u-1),ie=(e,t)=>{if(!b){if(t===void 0){ne(e);return}te(t)}};return(0,f.jsxs)(Mt,{$isActive:e,children:[(0,f.jsx)($t,{children:(0,f.jsx)(yt,{})}),(0,f.jsx)(en,{direction:`left`,"aria-label":`Show previous work item`,onClick:re,$side:`left`}),(0,f.jsx)(en,{direction:`right`,"aria-label":`Show next work item`,onClick:P,$side:`right`}),(0,f.jsx)(Nt,{$isWide:!!D.isWide,children:(0,f.jsxs)(Pt,{children:[(0,f.jsx)(Ft,{$layout:D,children:En(D,s)}),(0,f.jsx)(Ut,{children:Dn(D,s)})]})}),(0,f.jsx)(Gt,{"aria-hidden":`true`,focusable:`false`,viewBox:`0 0 1440 1024`,shapeRendering:`geometricPrecision`,textRendering:`geometricPrecision`,$isActive:e,$isEntryComplete:v,children:(0,f.jsxs)(`g`,{transform:`translate(-1181.222193 -8.108808)`,children:[(0,f.jsx)(`path`,{transform:`translate(1200,190)`,d:`M1788 1594.81L-192 1597.59V697.728C-166.196 700.073 -140.784 700.875 -114.511 699.024C-81.6699 696.679 -49.2198 691.866 -16.3006 689.583C18.3388 687.238 53.4474 687.793 88.1651 689.212C122.179 690.508 156.036 693.1 189.894 695.63C223.83 698.16 257.922 699.95 291.701 703.714C325.246 707.417 358.556 712.168 392.414 714.328C423.534 716.303 453.639 713.65 484.134 709.392C517.053 704.763 549.268 700.135 582.735 698.345C617.296 696.494 651.857 694.704 686.419 693.1C755.307 689.829 824.273 687.546 893.317 687.546C962.518 687.608 1031.72 690.323 1100.45 696.679C1131.81 699.58 1161.83 702.11 1193.5 700.999C1223.53 699.95 1253.47 696.803 1283.11 693.47C1327.21 688.472 1371.15 681.128 1415.96 684.399C1438.71 686.065 1461.15 689.583 1483.75 692.236C1505.41 694.766 1527.38 696.432 1549.2 698.037C1627.24 703.961 1710.51 706.8 1788 695.692V1594.81Z`,fill:`#FB9D38`}),(0,f.jsx)(`g`,{transform:`translate(1181, 1000)`,children:(0,f.jsx)(n,{showWorkDirtLayer:!0,containerId:`work-dirt-foreground__container`})})]})}),(0,f.jsx)(Kt,{children:(0,f.jsx)(qt,{$dragging:g,$viewportWidth:j,children:(0,f.jsx)(Jt,{ref:S,"data-testid":`work-nav-desktop`,children:O.map(({caseStudy:e,itemIndex:n,visualIndex:r,isDuplicate:i})=>Tn({caseStudy:e,itemIndex:n,visualIndex:r,isCurrent:r===u,isAccessibleCurrent:!i&&n===t,isDuplicate:i,handleSelect:ie,keyPrefix:`desktop-${r}`}))})})})]})};export{On as default};