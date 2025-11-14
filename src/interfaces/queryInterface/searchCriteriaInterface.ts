export type SearchOperation =
    | 'GREATER_THAN'
    | 'LESS_THAN'
    | 'GREATER_THAN_EQUAL'
    | 'LESS_THAN_EQUAL'
    | 'NOT_EQUAL'
    | 'EQUAL'
    | 'MATCH'
    | 'MATCH_START'
    | 'MATCH_END'
    | 'IN'
    | 'NOT_IN'
    | 'IS_NULL'
    | 'IS_NOT_NULL'
    | 'BETWEEN'
    | 'OR_LESS_THAN'
    | 'OR_EQUAL';

export interface SearchCriteria {
    key: string;
    value: string;
    searchType?: SearchOperation;
}
