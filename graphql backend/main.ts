interface Dog {
  name: string;
  bark: string;
}

interface Cat {
  name: string;
  purr: string;
}

type AnimalType = Dog & Cat;

const Name: {} = {
  name: "Pluto",
};

const Animal: AnimalType = {
  bark: "bow bow",
  purr: "",
  name: "",
  ...Name,
};

interface ResponseStatus {
  code: Number;
  message: String;
  data?: {};
}

const Responses: ResponseStatus[] = [];

Responses.push({
  code: 400,
  message: "Not Found",
});

Responses.push({
  code: 201,
  message: "OK",
});

Responses.push({
  code: 200,
  message: "Successsful",
  data: {
    _id: "My Id My Rules",
  },
});

// Day 2

console.log("Day 2")

class LinkedListNode<T> {
    private value: T;
    private _next: LinkedListNode<T> | undefined;

    constructor(value: T, _next?: LinkedListNode<T> | undefined){
        this.value = value;
        this._next = _next;
    }

    // acccess identifier : function argument and type declaration : function defination
    public getNext:  () => LinkedListNode<T> | undefined = () => {
        return this._next;
    }

    public setNext : (_next: LinkedListNode<T>) => void = (_next) => {
        this._next = _next;
    }

    public getValue : () =>  T = () => {
        return this.value;
    }
}


class LinkedList<T>{
    private _start: LinkedListNode<T> | undefined;

    constructor(value: T){
        this._start = new LinkedListNode(value, undefined);
    }

    public appendToList : (value: T) => void = (value) => {
        let tempNode = this._start;
        while(tempNode?.getNext() !== undefined){
            tempNode = tempNode?.getNext();
        }
        console.log(tempNode?.getValue())
        tempNode?.setNext(new LinkedListNode(value, undefined));
    }

    public printLinkedList : ()=> void = () => {
        console.log("List Elements: ");
        let tempNode = this._start;
        while(tempNode !== undefined){
            console.log(tempNode.getValue(), " ");
            tempNode = tempNode.getNext();
        }
    }
}


const myLinkedList = new LinkedList<number>(3);
myLinkedList.appendToList(6);
myLinkedList.appendToList(19);
myLinkedList.appendToList(191);

myLinkedList.printLinkedList();