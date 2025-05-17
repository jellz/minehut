export interface IdeaGen {
    combinations: Record<string, string[]>;
    sentences: string[];
}

export interface IdeaGenResponse {
    response: string;
    sentence: string;
    replacements: Record<CombinationType, string[]>;
}

export type CombinationType = 'people' | 'sites' | 'things' | 'functions' | 'adj' | 'price' | 'says' | 'badsoft' | 'drama' | 'crash' | 'ban' | 'code' | 'worse' | 'ac1' | 'forks' | 'payment' | 'document' | 'events' | 'platforms';