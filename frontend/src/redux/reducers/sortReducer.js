const defaultState = {
    sortField: 'date',
    isAscending: false
};

const sortReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SORT_FIELD":
            //add all properties of old state to new one, assign in immutable way
            state = {
                ...state,
                sortField: action.payload
            };
            break;
        case "TOGGLE_SORT_DIRECTION":
            state = {
                ...state,
                isAscending: !state.isAscending
            };
            break;
        default:
            break;
    }
    return state;
};

export default sortReducer;