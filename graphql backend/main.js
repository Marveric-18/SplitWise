var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Name = {
    name: "Pluto",
};
var Animal = __assign({ bark: "bow bow", purr: "", name: "" }, Name);
var Responses = [];
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

var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(value, _next) {
        var _this = this;
        // acccess identifier : function argument and type declaration : function defination
        this.getNext = function () {
            return _this._next;
        };
        this.setNext = function (_next) {
            _this._next = _next;
        };
        this.getValue = function () {
            return _this.value;
        };
        this.value = value;
        this._next = _next;
    }
    return LinkedListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList(value) {
        var _this = this;
        this.appendToList = function (value) {
            var tempNode = _this._start;
            while ((tempNode === null || tempNode === void 0 ? void 0 : tempNode.getNext()) !== undefined) {
                tempNode = tempNode === null || tempNode === void 0 ? void 0 : tempNode.getNext();
            }
            console.log(tempNode === null || tempNode === void 0 ? void 0 : tempNode.getValue());
            tempNode === null || tempNode === void 0 ? void 0 : tempNode.setNext(new LinkedListNode(value, undefined));
        };
        this.printLinkedList = function () {
            console.log("List Elements: ");
            var tempNode = _this._start;
            while (tempNode !== undefined) {
                console.log(tempNode.getValue(), " ");
                tempNode = tempNode.getNext();
            }
        };
        this._start = new LinkedListNode(value, undefined);
    }
    return LinkedList;
}());
var myLinkedList = new LinkedList(3);
myLinkedList.appendToList(6);
myLinkedList.appendToList(19);
myLinkedList.appendToList(191);
myLinkedList.printLinkedList();
