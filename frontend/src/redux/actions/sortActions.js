export function applySort(sortFieldName, isAscending) {
    return {
        type: "SORT",
        payload: {
            sortFieldName,
            isAscending
        }
    };
}