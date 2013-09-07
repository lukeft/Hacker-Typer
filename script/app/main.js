/*
* Adapted from Hacker-Typer by Simone Masiero - https://github.com/duiker101/Hacker-Typer
*/

define(
function(){


$( document ).keydown(
	function ( event ) { 
		Typer.addText( event );
	}
);

var App = function(){}

App.prototype.start = function(){

};

var Typer={
	text: '',
	index:0,
	file:'static/js.txt',
	init: function(){
		$.get(Typer.file,function(data){
			Typer.text=data;
			document.title = Typer.file + ' :: Line 0, Column 0';
		});
	},

	type : function(){
		Typer.index++;
	},

	backspace : function(){
		if(Typer.index>0){
			Typer.index--;
		}
	},

	getText : function (){
		return Typer.text.substring(0,Typer.index);
	},
	
	
	addText:function(key){
		if(Typer.text !== ''){
			if(key.keyCode!=8){ // backspace
				Typer.type();
			}else{
				Typer.backspace();	
			}
			var text = Typer.getText();
			
			myCodeMirror.setValue(text);
			myCodeMirror.setCursor(Typer.index, Typer.index);

			//$('#debug').html(Typer.index);
			var cursor = myCodeMirror.getCursor();
			$('.statusbar').html('Line ' + cursor.line + ', Column ' + cursor.ch);
			document.title = Typer.file + ' :: Line ' + cursor.line + ', Column ' + cursor.ch;
			window.scrollBy(0,50);
		}

		// let F11 pass through but capture all other keys
		if(key.keyCode != 122){ 
			if(key.preventDefault){
				key.preventDefault()	
			}
			key.returnValue = false;
		}
	}
};

Typer.init();
var myCodeMirror = CodeMirror($('.viewport')[0],{mode: "javascript", lineNumbers: true});
myCodeMirror.focus();
});