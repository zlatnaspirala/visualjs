/*
Created by Nikola Lukic zlatnaspirala@gmail.com
Copyright (c) 2016 by Nikola Lukic , All Rights Reserved. 


Quick Summary
A highly permissive license nearly identical to the MIT license but with some added trademark restrictions.


Can
 Commercial Use 
Describes the ability to use the software for commercial purposes.
 Modify 
Describes the ability to modify the software and create derivatives.
 Distribute 
Describes the ability to distribute original or modified (derivative) works.
 Sublicense 
Describes the ability for you to grant/extend a license to the software.
 Private Use 
Describes the ability to use/modify software freely without distributing it.

Cannot
 Hold Liable 
Describes the warranty and if the software/license owner can be charged for damages.
 Use Trademark 
Describes the allowance of using contributors' names, trademarks or logos.

Must
 Include Copyright 
Describes whether the original copyright must be retained.
 Include License 
Including the full text of license in modified software.


*//***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
Number.prototype.BalanceStyle= function(a,h,b){var f=this,a=isNaN(a= Math.abs(a))?2:a,b=b== undefined?"\x2E":b,h=h== undefined?"\x2C":h,g=f< 0?"\x2D":"",c=parseInt(f= Math.abs(+f|| 0).toFixed(a))+ "",d=(d= c.length)> 3?d% 3:0;return g+ (d?c.substr(0,d)+ h:"")+ c.substr(d).replace(/(\d{3})(?=\d)/g,"\x24\x31"+ h)+ (a?b+ Math.abs(f- c).toFixed(a).slice(2):"")};function removeItem(P){var S,o=arguments,R=o.length,Q;while(R> 1&& P.length){S= o[--R];while((Q= P.indexOf(S))!=  -1){P.splice(Q,1)}};return P}Array.prototype.unset= function(k){if(this.indexOf(k)!=  -1){this.splice(this.indexOf(k),1)}};Array.prototype.ACCESS_MODULE= function(l){for(var m=0;m< this.length;m++){if(this[m].NAME== l){return this[m]}}};Array.prototype.ACCESS= function(l){for(var m=0;m< this.length;m++){if(this[m].NAME== l){return this[m]}}};Element.prototype.remove= function(){this.parentElement.removeChild(this)};NodeList.prototype.remove= HTMLCollection.prototype.remove= function(){for(var c=this.length- 1;c>= 0;c--){if(this[c]&& this[c].parentElement){this[c].parentElement.removeChild(this[c])}}}