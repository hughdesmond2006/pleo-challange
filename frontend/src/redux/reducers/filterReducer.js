const defaultState = {
    filterText: '',
    filterField: 'all',
    hasReceiptsOnly: false
};

const filterReducer = (state = defaultState, action) => {
    switch(action.type){
        case "FILTER_TEXT":
            //add all properties of old state to new one, assign in immutable way
            state = {
                ...state,
                filterText: action.payload
            };
            break;
        case "FILTER_FIELD":
            state = {
                ...state,
                filterField: action.payload
            };
            break;
        case "TOGGLE_RECEIPTS_ONLY":
            state = {
                ...state,
                hasReceiptsOnly: !state.hasReceiptsOnly
            };
            break;
        default:
            break;
    }
    return state;
};

export default filterReducer;