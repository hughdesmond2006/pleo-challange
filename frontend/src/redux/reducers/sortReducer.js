// available sort field names: date, amount
const defaultState = {
    sortField: 'date',
    isAscending: false
};

const sortReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SORT":
            //add all properties of old state to new one, assign in immutable way
            state = {
                ...state,
                sortField: action.payload.sortFieldName,
                isAscending: action.payload.isAscending
            };
            break;
        default:
            break;
    }
    return state;
};

export default sortReducer;