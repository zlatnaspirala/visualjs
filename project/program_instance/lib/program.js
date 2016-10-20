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
function PROGRAM(o,m){var n=this;this.DRAW_INTERVAL= APPLICATION.PROGRAM.RENDER_SPEED;this.UPDATE_INTERVAL= 15;this.BASELINE= "\x6D\x69\x64\x64\x6C\x65";this.GLOBAL_TRANSLATE= 0;this.DO_GLOBAL_TRANSLATE= false;n.TRANSLATE= function(p){n.GLOBAL_TRANSLATE= p;n.DO_GLOBAL_TRANSLATE= true};this.GAME_MAP= function(){var q=this;this.TOTAL_LEFT= 2;this.TOTAL_RIGHT= 4;this.TOTAL_UP= 2;this.TOTAL_DOWN= 4;this.LEFT= function(){return q.TOTAL_LEFT* -VIEW.W()};this.WIDTH= function(){return q.TOTAL_RIGHT* VIEW.W()};this.UP= function(){return q.TOTAL_UP* -VIEW.H()};this.HEIGHT= function(){return q.TOTAL_DOWN* VIEW.W()};this.CLEAR_MAP= true};n.MAP=  new n.GAME_MAP();this.AUTO_UPDATE=  new Array();this.ENGINE=  new ENGINE(m);o.textAlign= "\x73\x74\x61\x72\x74";o.textBaseline= this.BASELINE;this.DRAW= function(){if(n.MAP.CLEAR_MAP== true){o.clearRect(n.MAP.LEFT(),n.MAP.UP(),n.MAP.WIDTH(),n.MAP.HEIGHT())};if(n.DO_GLOBAL_TRANSLATE== true){n.DO_GLOBAL_TRANSLATE= false;o.translate(n.GLOBAL_TRANSLATE,0)};n.ENGINE.DRAW_MODULES(o);setTimeout(function(){n.UPDATE()},this.UPDATE_INTERVAL)};this.UPDATE= function(){n.ENGINE.UPDATE_MODULES();for(var p=0;p< this.AUTO_UPDATE;p++){ROOT.AUTO_UPDATE[p].UPDATE()};setTimeout(function(){n.DRAW()},this.DRAW_INTERVAL)}}