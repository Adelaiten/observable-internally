export interface Observer {
    onNext: (val) => any;
    onError: (val) => any;
    onCompleted: (val) => any;
}