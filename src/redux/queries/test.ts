const funObject = {
  someFunc(arg: string) { console.log('someFunc', arg) },
  someOtherFunc(arg1: string, arg2: string) { console.log('someOtherFunc', arg1, arg2) },
};


function callFunction(functionName: keyof FunObject, functionArgs: string[]) {
  funObject[functionName](...functionArgs);
}
callFunction('someFunc', ['arg']);
callFunction('someOtherFunc', ['arg1', 'arg2']);

type FunObject = {
  someFunc(arg: string): void;
  someOtherFunc(arg1: string, arg2: string): void;
}
