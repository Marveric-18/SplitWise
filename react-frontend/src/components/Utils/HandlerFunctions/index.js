const handlerTextInput = (input) => {
    if(!input || input.length === 0) return { value: input, error: "Please fill the input field"};
    return { value: input, error: ""};
}

const handlerNumberInput = ( min, max) => {
    return function(input){
        if( !input || isNaN(input)) {
            return { value: input, error: `Input value should be number between ${min} and ${max}`}
        }
        else return {value: parseInt(input), error: ""};
    }
}

export {
    handlerTextInput,
    handlerNumberInput
}