export type resultsType = {
    next?: {
        page: number | null,
        limit: number | null 
    },
    previous?: {
        page: number | null,
        limit: number | null
    },
    results: Object[]
}