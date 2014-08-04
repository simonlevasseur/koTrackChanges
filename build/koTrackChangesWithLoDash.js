// koTrackChanges 1.0.0 | (c) 2014 Simon LeVasseur |  http://www.opensource.org/licenses/mit-license
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash include="isEqual,isArray,clone"`
 */
;(function(){function n(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function t(n){n.length=0,j.length<E&&j.push(n)}function e(n,t){var e;t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var o=Array(0>e?0:e);++r<e;)o[r]=n[t+r];return o}function r(){}function o(n){function t(){if(o){var n=e(o);nt.apply(n,arguments)}if(this instanceof t){var a=i(r.prototype),n=r.apply(a,n||arguments);return b(n)?n:a}return r.apply(u,n||arguments)}var r=n[0],o=n[2],u=n[4];return lt(t,n),t
}function u(r,o,i,a,c){if(i){var f=i(r);if(typeof f!="undefined")return f}if(!b(r))return r;var l=U.call(r);if(!L[l]||!ft.nodeClass&&n(r))return r;var p=at[l];switch(l){case D:case P:return new p(+r);case I:case R:return new p(r);case N:return f=p(r.source,w.exec(r)),f.lastIndex=r.lastIndex,f}if(l=pt(r),o){var s=!a;a||(a=j.pop()||[]),c||(c=j.pop()||[]);for(var g=a.length;g--;)if(a[g]==r)return c[g];f=l?p(r.length):{}}else f=l?e(r):dt({},r);return l&&(Z.call(r,"index")&&(f.index=r.index),Z.call(r,"input")&&(f.input=r.input)),o?(a.push(r),c.push(f),(l?bt:ht)(r,function(n,t){f[t]=u(n,o,i,a,c)
}),s&&(t(a),t(c)),f):f}function i(n){return b(n)?ot(n):{}}function a(n,t,e){if(typeof n!="function")return h;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(ft.funcNames&&(r=!n.name),r=r||!ft.funcDecomp,!r)){var o=Y.call(n);ft.funcNames||(r=!x.test(o)),r||(r=O.test(o),lt(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)
};case 4:return function(e,r,o,u){return n.call(t,e,r,o,u)}}return v(n,t)}function c(n){function t(){var n=p?f:this;if(u){var v=e(u);nt.apply(v,arguments)}return(a||g)&&(v||(v=e(arguments)),a&&nt.apply(v,a),g&&v.length<l)?(o|=16,c([r,y?o:-4&o,v,null,f,l])):(v||(v=arguments),s&&(r=n[d]),this instanceof t?(n=i(r.prototype),v=r.apply(n,v),b(v)?v:n):r.apply(n,v))}var r=n[0],o=n[1],u=n[2],a=n[3],f=n[4],l=n[5],p=1&o,s=2&o,g=4&o,y=8&o,d=r;return lt(t,n),t}function f(e,r,o,u,i,a){if(o){var c=o(e,r);if(typeof c!="undefined")return!!c
}if(e===r)return 0!==e||1/e==1/r;if(e===e&&!(e&&z[typeof e]||r&&z[typeof r]))return false;if(null==e||null==r)return e===r;var l=U.call(e),p=U.call(r);if(l==A&&(l=B),p==A&&(p=B),l!=p)return false;switch(l){case D:case P:return+e==+r;case I:return e!=+e?r!=+r:0==e?1/e==1/r:e==+r;case N:case R:return e==r+""}if(p=l==C,!p){var s=Z.call(e,"__wrapped__"),b=Z.call(r,"__wrapped__");if(s||b)return f(s?e.__wrapped__:e,b?r.__wrapped__:r,o,u,i,a);if(l!=B||!ft.nodeClass&&(n(e)||n(r)))return false;if(l=!ft.argsObject&&g(e)?Object:e.constructor,s=!ft.argsObject&&g(r)?Object:r.constructor,l!=s&&!(y(l)&&l instanceof l&&y(s)&&s instanceof s)&&"constructor"in e&&"constructor"in r)return false
}for(l=!i,i||(i=j.pop()||[]),a||(a=j.pop()||[]),s=i.length;s--;)if(i[s]==e)return a[s]==r;var d=0,c=true;if(i.push(e),a.push(r),p){if(s=e.length,d=r.length,(c=d==s)||u)for(;d--;)if(p=s,b=r[d],u)for(;p--&&!(c=f(e[p],b,o,u,i,a)););else if(!(c=f(e[d],b,o,u,i,a)))break}else vt(r,function(n,t,r){return Z.call(r,t)?(d++,c=Z.call(e,t)&&f(e[t],n,o,u,i,a)):void 0}),c&&!u&&vt(e,function(n,t,e){return Z.call(e,t)?c=-1<--d:void 0});return i.pop(),a.pop(),l&&(t(i),t(a)),c}function l(n,t,r,u,i,a){var f=1&t,p=4&t,s=16&t,g=32&t;
if(!(2&t||y(n)))throw new TypeError;s&&!r.length&&(t&=-17,s=r=false),g&&!u.length&&(t&=-33,g=u=false);var b=n&&n.__bindData__;return b&&true!==b?(b=e(b),b[2]&&(b[2]=e(b[2])),b[3]&&(b[3]=e(b[3])),!f||1&b[1]||(b[4]=i),!f&&1&b[1]&&(t|=8),!p||4&b[1]||(b[5]=a),s&&nt.apply(b[2]||(b[2]=[]),r),g&&et.apply(b[3]||(b[3]=[]),u),b[1]|=t,l.apply(null,b)):(1==t||17===t?o:c)([n,t,r,u,i,a])}function p(){T.h=S,T.b=T.c=T.g=T.i="",T.e="t",T.j=true;for(var n,t=0;n=arguments[t];t++)for(var e in n)T[e]=n[e];t=T.a,T.d=/^[^,]+/.exec(t)[0],n=Function,t="return function("+t+"){",e=T;
var r="var n,t="+e.d+",E="+e.e+";if(!t)return E;"+e.i+";";e.b?(r+="var u=t.length;n=-1;if("+e.b+"){",ft.unindexedChars&&(r+="if(s(t)){t=t.split('')}"),r+="while(++n<u){"+e.g+";}}else{"):ft.nonEnumArgs&&(r+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+e.g+";}}else{"),ft.enumPrototypes&&(r+="var G=typeof t=='function';"),ft.enumErrorProps&&(r+="var F=t===k||t instanceof Error;");var o=[];if(ft.enumPrototypes&&o.push('!(G&&n=="prototype")'),ft.enumErrorProps&&o.push('!(F&&(n=="message"||n=="name"))'),e.j&&e.f)r+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}";
else if(r+="for(n in t){",e.j&&o.push("m.call(t, n)"),o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}",ft.nonEnumShadows){for(r+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)r+="n='"+e.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",e.j||(r+="||(!x[n]&&t[n]!==A[n])"),r+="){"+e.g+"}";r+="}"}return(e.b||ft.nonEnumArgs)&&(r+="}"),r+=e.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+r+"}")(a,F,W,Z,_,g,pt,d,T.f,M,z,ct,R,Q,U)}function s(n){return typeof n=="function"&&X.test(n)
}function g(n){return n&&typeof n=="object"&&typeof n.length=="number"&&U.call(n)==A||false}function y(n){return typeof n=="function"}function b(n){return!(!n||!z[typeof n])}function d(n){return typeof n=="string"||n&&typeof n=="object"&&U.call(n)==R||false}function v(n,t){return 2<arguments.length?l(n,17,e(arguments,2),null,t):l(n,1,null,null,t)}function h(n){return n}function m(){}var j=[],_={},E=40,w=/\w*$/,x=/^\s*function[ \n\r\t]+\w/,O=/\bthis\b/,S="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),A="[object Arguments]",C="[object Array]",D="[object Boolean]",P="[object Date]",F="[object Error]",I="[object Number]",B="[object Object]",N="[object RegExp]",R="[object String]",L={"[object Function]":false};
L[A]=L[C]=L[D]=L[P]=L[I]=L[B]=L[N]=L[R]=true;var $={configurable:false,enumerable:false,value:null,writable:false},T={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},z={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},K=z[typeof window]&&window||this,q=z[typeof exports]&&exports&&!exports.nodeType&&exports,G=z[typeof module]&&module&&!module.nodeType&&module,J=G&&G.exports===q&&q,H=z[typeof global]&&global;!H||H.global!==H&&H.window!==H||(K=H);var V=[],W=Error.prototype,M=Object.prototype,Q=String.prototype,U=M.toString,X=RegExp("^"+(U+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Y=Function.prototype.toString,Z=M.hasOwnProperty,nt=V.push,tt=M.propertyIsEnumerable,et=V.unshift,rt=function(){try{var n={},t=s(t=Object.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ot=s(ot=Object.create)&&ot,ut=s(ut=Array.isArray)&&ut,it=s(it=Object.keys)&&it,at={};at[C]=Array,at[D]=Boolean,at[P]=Date,at["[object Function]"]=Function,at[B]=Object,at[I]=Number,at[N]=RegExp,at[R]=String;var ct={};ct[C]=ct[P]=ct[I]={constructor:true,toLocaleString:true,toString:true,valueOf:true},ct[D]=ct[R]={constructor:true,toString:true,valueOf:true},ct[F]=ct["[object Function]"]=ct[N]={constructor:true,toString:true},ct[B]={constructor:true},function(){for(var n=S.length;n--;){var t,e=S[n];
for(t in ct)Z.call(ct,t)&&!Z.call(ct[t],e)&&(ct[t][e]=false)}}();var ft=r.support={};!function(){function n(){this.x=1}var t={0:1,length:1},e=[];n.prototype={valueOf:1,y:1};for(var r in new n)e.push(r);for(r in arguments);ft.argsClass=U.call(arguments)==A,ft.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),ft.enumErrorProps=tt.call(W,"message")||tt.call(W,"name"),ft.enumPrototypes=tt.call(n,"prototype"),ft.funcDecomp=!s(K.k)&&O.test(function(){return this}),ft.funcNames=typeof Function.name=="string",ft.nonEnumArgs=0!=r,ft.nonEnumShadows=!/valueOf/.test(e),ft.spliceObjects=(V.splice.call(t,0,1),!t[0]),ft.unindexedChars="xx"!="x"[0]+Object("x")[0];
try{ft.nodeClass=!(U.call(document)==B&&!({toString:0}+""))}catch(o){ft.nodeClass=true}}(1),ot||(i=function(){function n(){}return function(t){if(b(t)){n.prototype=t;var e=new n;n.prototype=null}return e||K.Object()}}());var lt=rt?function(n,t){$.value=t,rt(n,"__bindData__",$)}:m;ft.argsClass||(g=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&Z.call(n,"callee")&&!tt.call(n,"callee")||false});var pt=ut||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&U.call(n)==C||false
},st=p({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),H=it?function(n){return b(n)?ft.enumPrototypes&&typeof n=="function"||ft.nonEnumArgs&&n.length&&g(n)?st(n):it(n):[]}:st,ut={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:H,g:"if(e(t[n],n,g)===false)return E"},gt={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:H,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},yt={i:"if(!B[typeof t])return E;"+ut.i,b:false},bt=p(ut),dt=p(gt,{i:gt.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),vt=p(ut,yt,{j:false}),ht=p(ut,yt);
y(/x/)&&(y=function(n){return typeof n=="function"&&"[object Function]"==U.call(n)}),r.assign=dt,r.bind=v,r.forIn=vt,r.forOwn=ht,r.keys=H,r.extend=dt,r.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),u(n,t,typeof e=="function"&&a(e,r,1))},r.identity=h,r.isArguments=g,r.isArray=pt,r.isEqual=function(n,t,e,r){return f(n,t,typeof e=="function"&&a(e,r,2))},r.isFunction=y,r.isObject=b,r.isString=d,r.noop=m,r.VERSION="2.4.1",typeof define=="function"&&typeof define.amd=="object"&&define.amd?(K._=r, define(function(){return r
})):q&&G?J?(G.exports=r)._=r:q._=r:K._=r}).call(this);

;(function (factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("ko"), require("underscore"), exports);
    } else if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["ko", "underscore", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, _, ko.trackChanges = {});
    }
}(function (ko, _, exports) {
    'use strict';

    var api = exports,
        groups = {};

    /***************/
    /***** API *****/
    /***************/
    api.Group = function (values) {
        // Get editables
        var tempArray = [];
        this.editables = ko.observableArray([]);

        /* istanbul ignore else */
        if (values) {
            /* istanbul ignore else */
            if (!_.isArray(values) && !(ko.isObservable(values) && 'push' in values)) {
                values = [values];
            }

            ko.utils.arrayForEach(ko.unwrap(values), function (val) {
                /* istanbul ignore else */
                if (ko.isObservable(val)) {
                    if (!val.isDirty) {
                        val.extend({ trackChanges: true });
                    }
                    tempArray.push(val);
                }
            });

            this.editables(tempArray);
        }

        this.changes = ko.computed(this.getChanges, this);
        this.isDirty = ko.computed(this.getIsDirty, this);
    };

    api.Group.prototype = {
        getChanges: function () {
            var changes = [];
            ko.utils.arrayForEach(this.editables(), function (obs) {
                if (obs.isDirty()) {
                    changes.push(obs);
                }
            });
            return changes;
        },
        getIsDirty: function () {
            return this.changes().length > 0;
        },
        refreshIsDirty: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.refreshIsDirty();
            });
        },
        commitAll: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.commit();
            });
        },
        rollbackAll: function () {
            ko.utils.arrayForEach(this.editables(), function (obs) {
                obs.rollback();
            });
        },
        add: function (list) {
            if (!_.isArray(list) && !(ko.isObservable(list) && 'push' in list)) {
                list = [list];
            }

            var editables = this.editables;
            ko.utils.arrayForEach(ko.unwrap(list), function (target) {
                /* istanbul ignore else */
                if (ko.isObservable(target)) {
                    if (!target.isDirty) {
                        target.extend({ trackChanges: true });
                    }
                    editables.push(target);
                }
            });
        },
        remove: function (list) {
            if (!_.isArray(list) && !(ko.isObservable(list) && 'push' in list)) {
                list = [list];
            }

            this.editables.removeAll(list);
        },
        dispose: function () {
            this.changes.dispose();
            this.isDirty.dispose();

            // Delete group reference in groups object if it exists
            for (var prop in groups) {
                /* istanbul ignore else */
                if (groups.hasOwnProperty(prop) && groups[prop] === this) {
                    delete groups[prop];
                }
            }
        }
    };

    api.getGroup = function (topic) {
        return groups[topic];
    };

    /***********************/
    /***** KO EXTENDER *****/
    /***********************/
    ko.extenders.trackChanges = function (target, options) {
        var forceIsDirtyRefresh = ko.observable();

        // Remember the default value
        target.oldValue = ko.observable(_.clone(target(), true));

        // Add isDirty flag to observable
        target.isDirty = ko.computed(function () {
            forceIsDirtyRefresh();
            if (!options.onlyIf || (options.onlyIf && options.onlyIf.call(target)) ) {
                return !_.isEqual(target(), target.oldValue());
            }

            return false;
        });

        // Method to re-evaluate the isDirty computed
        target.refreshIsDirty = function () {
            forceIsDirtyRefresh.valueHasMutated();
        };

        // Sets the old value as the current value
        target.rollback = function rollback() {
            this(_.clone(this.oldValue(), true));
        };

        // Sets the current value as the old value
        target.commit = function commit() {
            this.oldValue(_.clone(this(), true));
        };

        // Add to group if topic was provided
        if (typeof options == 'string' || options instanceof String) {
            if (groups[options]) {
                groups[options].editables.push(target);
            } else {
                groups[options] = new api.Group([target]);
            }
        }

        return target;
    };
}));