import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/index'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:
            const { title } = action;
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            };
        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(card)
                }
            };
        case REMOVE_DECK:
            const { id } = action;
            // return ({ [id]: value, ...remainingDecks } = state);
            const { [id]: value, ...remainingDecks } = state;
            // console.log(remainingDecks);
            return remainingDecks;
        default:
            return state
    }
}

