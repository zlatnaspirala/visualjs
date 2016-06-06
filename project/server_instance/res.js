/////////////////////////////////////////////////////
//Developer : Nikola Lukic zlatnaspirala@gmail.com 
/////////////////////////////////////////////////////
/*
Make javascript resources objects
*/
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//High definition
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 var dl  = require('delivery');
var fs = require("fs");
var path = require('path');
var mysql      = require('mysql');
var express    = require("express");
var app = express();
var http = require('http');
var https = require('https');
var mkdirp = require('mkdirp')
//includer
function read(f) {return fs.readFileSync(f).toString();}
function include(f) {eval.apply(global, [read(f)]);}
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

//include("config.js");
var APPLICATION = require('./config.js');

var FILE_STRING = "";
var SUM_OF_IMAGES = 0;
//##############################################
// LIST OFF ALL FILES
//##############################################
function GET_FILES_NAME(path , name_of_animation_path , main_length ){
fs.readdir(path, function(err, items) {

    for (var i=0; i<items.length; i++) {
	
	if (  i == 0 ) {
    FILE_STRING += ' \n RESOURCE.'+name_of_animation_path+'={"source":[';	
	SUM_OF_IMAGES++;
	}
	 
     
	 
		FILE_STRING  = " "+ FILE_STRING + "'"+ name_of_animation_path + "/" + items[i] + "' , \n" ;
		
		if (  (i+1) == items.length  && main_length == false) {
		
		//console.log(">>>>>>>>>>>>>>>" , name_of_animation_path);
		FILE_STRING += " ] }; \n";  
		
		}
		
       if (  (i+1) == items.length  && main_length == true) {
	  
	    FILE_STRING += " ] }; SYS.DEBUG.LOG('Resources loaded. ' + "+SUM_OF_IMAGES+"); \n  RESOURCE.SUM = "+SUM_OF_IMAGES+"; ";
        CreateFile( APPLICATION.PATH_OF_WWW + "res/animations/resource.nidza"  ,  FILE_STRING );
		 
	   }		 
	   
    }
		
});
}
//##############################################
// LIST OFF ALL DIRECTORY
//##############################################
console.log(APPLICATION.PATH_OF_WWW);
var LIST_OFF_ALL_ANIMATION_DIR  =  getDirectories( APPLICATION.PATH_OF_WWW + "res/animations/" );
//console.log(LIST_OFF_ALL_ANIMATION_DIR);

var local__x  =  -1;
  console.log("   ");
  console.log("......................................");
  console.log("Resources objects generator");
  console.log("......................................");
for (var i in LIST_OFF_ALL_ANIMATION_DIR) {
  
  local__x++;
  
  val = LIST_OFF_ALL_ANIMATION_DIR[i];
  console.log("Obj Created :" , LIST_OFF_ALL_ANIMATION_DIR[i]);
  
  if (  (local__x+1) == LIST_OFF_ALL_ANIMATION_DIR.length ) {
  //console.log("POSLEDNJI");
  GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "res/animations/" + val , val , true );
  
  }else {
  //console.log("NIJE POSLEDNJI");
  GET_FILES_NAME(APPLICATION.PATH_OF_WWW + "res/animations/" + val , val , false );
  
  }
    
}

function CreateFile(path_ , CONTENT ){

	fs.writeFile(  path_ , CONTENT, function(err) {
 
	if(err) {
        return console.log(err);
    }else
	{
	//console.log("List of the resources object names : " , LIST_OFF_ALL_ANIMATION_DIR ); 
	console.log("......................................");
	console.log("   ");
    console.log("The resources file was created DONE.");
	console.log("   ");
	
	}
	
}); 

}