export type resultsType = {
    next: {
        page: number,
        limit: number
    },
    previous: {
        page: number,
        limit: number
    },
    results: Object[]
}