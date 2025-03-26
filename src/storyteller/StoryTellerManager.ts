import { Minehut } from '../Minehut';
import { IdeaGen, CombinationType, IdeaGenResponse } from './StoryTellerResponse';

/**
 * The Minehut StoryTeller Manager
 */
export class StoryTellerManager {
    client: Minehut;

    private endpoint = 'https://raw.githubusercontent.com/Minehut/storyteller/refs/heads/main/idea_gen.json';
    private _storytellerData: IdeaGen = {
        combinations: {},
        sentences: []
    }

    constructor(client: Minehut) {
        this.client = client;
        this.refresh();
    }

    /**
     * The StoryTeller data is only fetched once when the class is initialized. This method can be used to refresh the data.
     */
    async refresh() {
        const { combinations, sentences } = await fetch(this.endpoint).then(res => res.json()) as IdeaGen;
        this._storytellerData = { combinations, sentences };
    }

    /**
     * Returns a list of all the unparsed sentences without any replacements
     * @returns {string[]} The unparsed sentences
     */
    getUnparsedSentences() {
        return this._storytellerData.sentences;
    }

    /**
     * Returns a list of all the combination types
     * @returns {CombinationType[]} The combination types
     */
    getCombinationTypes() {
        return Object.keys(this._storytellerData.combinations) as CombinationType[];
    }

    /**
     * Returns a list of all the different combinations for a specific combination type
     * @param type The combination type
     * @returns {string[]} The combinations
     */
    getCombinations({ type }: { type: CombinationType }) {
        return this._storytellerData.combinations[type];
    }

    /**
     * Generates a random sentence
     * @returns {Promise<IdeaGenResponse>} The generated sentence with replacements
     */
    generateSentence() {
        return this.replaceStory(this._storytellerData.combinations, this._storytellerData.sentences);
    }

    /**
     * This method is used internally in the generateSentence method to replace the story. But it can also be used to replace a story with custom combinations and sentences.
     * @param combinations A record of combination types and their respective words
     * @param sentences A list of sentences to choose from
     * @returns 
     */
    replaceStory(combinations: Record<string, string[]>, sentences: string[]): IdeaGenResponse {
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        let replacedSentence = randomSentence;
        const matches = replacedSentence.match(/\[(.*?)\]/g) || [];
        const replacements: Record<string, string[]> = {};
    
        for (const match of matches) {
            const combination = match.slice(1, -1);
            const words = combinations[combination];
            const randomReplacement = words[Math.floor(Math.random() * words.length)];
            replacedSentence = replacedSentence.replace(match, randomReplacement);
    
            if (!replacements[combination]) {
                replacements[combination] = [];
            }
            replacements[combination].push(randomReplacement);
        }
    
        return {
            response: replacedSentence,
            sentence: randomSentence,
            replacements,
        };
    }
}