export function changeSortField(sortFieldName) {
    return {
        type: "SORT_FIELD",
        payload: sortFieldName
    };
}

export function toggleSortDirection() {
    return {
        type: "TOGGLE_SORT_DIRECTION"
    };
}