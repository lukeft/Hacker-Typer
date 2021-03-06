/// <reference path="../AppDefinitions.d.ts"/>

interface EventRecord{
  listener:Function;
  context:any;
}


class AbstractEventType {

  private eventHash = {};

  public addListener(event, listener: (sender: Object) => void, context: Object): void{

    if(!this.eventStored(event)){
      this.eventHash[event] = new Array<EventRecord>();
    }

    this.eventHash[event].push({listener:listener, context:context});
  }

  public removeListener(event, listener: (sender: Object) => void ): void{

    if(this.eventStored(event)){
      _(this.eventHash[event]).forEach((record:EventRecord)=>{
        if(listener === record.listener){

          record.listener = ()=>{};
          record.context = null;
        }
      });
    }
  }

  public trigger(event, ...args:any[]): void{

    if(this.eventStored(event)){

      _(this.eventHash[event]).forEach((record:EventRecord)=>{

          record.listener.apply(record.context, args);
      });
    }
  }

  public removeAllListeners(): void{

    this.eventHash = {};
  }

  private eventStored(event):Boolean{

    return typeof this.eventHash[event] !== 'undefined';
  }
}

export = AbstractEventType;