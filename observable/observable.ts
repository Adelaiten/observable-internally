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

    /**
     * @method
     * This method is used to add implementation details on what client wants to do with data stream
     * provided by observable
     * @param onNext
     * this param is used to provide implementation details of what should be done if data is provided
     * from the stream
     * @param onError
     * this param is used to provide implementation details of what should be done if data is not provided
     * due an error
     * @param onCompleted
     * this param is used to provide implementation details of what should be done if observable did everything
     * it was meant to
     */
    subscribe(onNext: any, onError?: any, onCompleted?: any) {
        if (typeof onNext === 'function') {
            return this._subscribe({
                onNext: onNext,
                onError: onError || (() => {}),
                onCompleted: onCompleted || (() => {})
            })
        }
        return this._subscribe(onNext);
    }

    /**
     * @method
     * this method returns observable that emits value provided as parameter
     * @param args
     * arguments to be emitted by observable
     */
    static of(...args) {
        return new Observable((obs) => {
            args.forEach(val => obs.onNext(val));
            obs.onCompleted();

            return {
                unsubscribe: () => {
                    obs = {
                        onNext: () => {},
                        onError: () => {},
                        onCompleted: () => {}
                    }
                }
            }
        })
    }
    /**
     * @method
     * this method takes array as an argument and returns observable that's emitting values
     * provided by this array
     * @param args
     * array of elements that are going to be emitted by inner observable
     */

    static from(args: any[]) {
        return new Observable((obs) => {
            for(const element of args) {
                obs.onNext(element);
            }
            obs.onCompleted();
            
            return {
                unsubscribe:  () => {
                    obs = {
                        onNext: () => {},
                        onError: () => {},
                        onCompleted: () => {}
                    }
                }
            }
        })
    }


    /**
     * 
     * @method
     * fromEvent method creates new observable that listen to certain event
     * @param source 
     * Source element that observable is going to listen
     * @param event 
     * event that should be listened
     */
    static fromEvent(source, event) {
        return new Observable((obs) => {
            const eventCallback = (event) => obs.onNext(event);
            source.addEventListener(event, eventCallback);

            return {
                unsubscribe: () => source.removeEventListener(event, eventCallback)
            }
        })
    }
}