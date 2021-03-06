class Typer {

  private typedText:string = '';
  private fullText:string = '';
  private index:number = 0;

  public setText(text:string):void{

    this.typedText = '';
    this.fullText = text;
    this.index = 0;
  }



  public typeSingleLetter():void{

    if(this.notAtEndOfWord()){
      this.typedText += this.getNextCharacter();
      this.index++;

      if(this.getCurrentCharacter() === '\t'){
        this.typeSingleLetter();
      }
    }
  }

  public typeFullWord():void{
    if(this.notAtEndOfWord()){
      do{
        this.typeSingleLetter();
      }while(!/[\s\t\b\n\r\.,:\(\)\{\}]/.test(this.getNextCharacter()) && this.notAtEndOfWord())
    }
  }

  public typeFullLine():void{
    if(this.notAtEndOfWord()){
      do{
        this.typeSingleLetter();
      }while(!/\n/.test(this.getCurrentCharacter()) && this.notAtEndOfWord())
    }
  }

  public backspace():void{
    if(this.index>0){
      this.index--;
      this.typedText = this.typedText.substring(0, this.index);
    }
  }

  public getText():string{
    return this.typedText;
  }

  private notAtEndOfWord():boolean{
    return this.typedText.length < this.fullText.length;
  }

  private getNextCharacter():string{
    return this.fullText.charAt(this.index);
  }

  private getCurrentCharacter():string{
    return this.typedText.charAt(this.index -1);
  }

}

export = Typer;
