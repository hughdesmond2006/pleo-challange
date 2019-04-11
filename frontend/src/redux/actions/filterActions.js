export function changeFilterText(queryText) {
    return {
        type: "FILTER_TEXT",
        payload: queryText
    };
}

export function changeFilterField(filterFieldName) {
    return {
        type: "FILTER_FIELD",
        payload: filterFieldName
    };
}

export function toggleReceiptsOnly() {
    return {
        type: "TOGGLE_RECEIPTS_ONLY"
    };
}