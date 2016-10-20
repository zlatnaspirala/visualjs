

if ('speechSynthesis' in window) {
 // Synthesis support
 speechSynthesis.getVoices().forEach(function(voice) {console.log(voice.name, voice.default ? '(default)' :'');});
   
 
SYS.VOICE.SPEAK = function(text){
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; 
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.text = text;
msg.lang = 'en-US';
msg.onend = function(e) {console.log('SPEAK Finished in ' + event.elapsedTime + ' seconds.');};
speechSynthesis.speak(msg); 
 }; 
 SYS.DEBUG.LOG("speechSynthesis support"); 
}
else {
	
SYS.DEBUG.WARNING("speechSynthesis not supported."); 	
}


if ('webkitSpeechRecognition' in window) {


 function LISTEN( what , doThat ) {
 
var ROOT = this;
ROOT.WHAT = what;
ROOT.doThat = doThat;
ROOT.recognition = new webkitSpeechRecognition();
ROOT.recognition.continuous = true;
ROOT.recognition.interimResults = false;
ROOT.recognition.interim = true;
ROOT.recognition.onstart = function() { console.log("START") }  
ROOT.recognition.onerror = function(event) {console.log("ON ERROR - try again " + event)
try{

}catch(e){}

 }
ROOT.recognition.onend = function() { console.log("ON END") }
ROOT.recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
		
		
     console.log( event.results[i][0].transcript + " You tell ." )
	 
  if (ROOT.WHAT == event.results[i][0].transcript || ROOT.WHAT+" " == event.results[i][0].transcript || " "+ ROOT.WHAT == event.results[i][0].transcript) {
		 
		 
		 ROOT.doThat();
		 break;
		 console.log("REGOGNIZE")
		 
	 }

  }
  }
}


ROOT.recognition.start()

}

SYS.VOICE.LISTEN = LISTEN;






SYS.DEBUG.LOG("SpeechRecognition support");  
}