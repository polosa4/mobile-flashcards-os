import { AsyncStorage } from 'react-native';
import {

    decks,
    //_getDecks
    //_getQuestions,
    //_saveQuestion,
    //_saveQuestionAnswer,
} from './_Data.js'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export function getData() {
    return decks;
}

export async function getDeck(id) {
    try {
        const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

        return JSON.parse(storeResults)[id];
    } catch (err) {
        console.log(err);
    }
}

export async function saveDeckTitleAS(title) {
    try {
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    title,
                    questions: []
                }
            })
        );
    } catch (err) {
        console.log(err);
    }
}

export async function removeDeckAS(key) {
    try {
        const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        const data = JSON.parse(results);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

export async function getDecks() {
    try {
        const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

        if (storeResults === null) {
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
        }

        return storeResults === null ? decks : JSON.parse(storeResults);
    } catch (err) {
        console.log(err);
    }
}

export async function addCardToDeckAS(title, card) {
    try {
        const deck = await getDeck(title);

        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (err) {
        console.log(err);
    }
}

