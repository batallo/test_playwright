type TestType<A> = {
    dynamicTypeProp: A
    staticTypeProp: number
    nullProp: null
}

type TestTypeWithString = TestType<string>
type TestTypeWithNumber = TestType<number>

const myVariable: TestType<number> = {
    dynamicTypeProp: 10,
    staticTypeProp: 5,
    nullProp: null
}

///

type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // A is true
type B = IsString<12>;   // B is false

///

function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("some string");
let output2 = identity<number>(100);