export enum SearchOperation {
    GREATER_THAN = 'GREATER_THAN',
    LESS_THAN = 'LESS_THAN',
    GREATER_THAN_EQUAL = 'GREATER_THAN_EQUAL',
    LESS_THAN_EQUAL = 'LESS_THAN_EQUAL',
    NOT_EQUAL = 'NOT_EQUAL',
    EQUAL = 'EQUAL',
    MATCH = 'MATCH',
    MATCH_START = 'MATCH_START',
    MATCH_END = 'MATCH_END',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    IS_NULL = 'IS_NULL',
    IS_NOT_NULL = 'IS_NOT_NULL',
    BETWEEN = 'BETWEEN',
    OR_LESS_THAN = 'OR_LESS_THAN',
    OR_EQUAL = 'OR_EQUAL',
}

export interface SearchCriteria {
    key: string;
    value: string | string[] | number | number[] | null;
    searchType?: SearchOperation;
}
