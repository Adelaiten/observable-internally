import { Observer } from "./observer";

export class Observable {
    private _subscribe: any;
    /**
     * @constructor
     * @param subscribe 
     * This subscribe param is implementation details of what 
     * observable should do. Later this subscribe will be provided
     * with subscribe method params "onNext", "onError" and "onCompleted"
     */
    constructor(subscribe?: any) {
        if(subscribe) {
            this._subscribe = subscribe;
        }
    }

    subscribe(observer: Observer) {
        
    }
}