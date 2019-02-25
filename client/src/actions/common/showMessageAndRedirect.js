import history from '../../history';
import { CLEAR_MESSAGE } from '../messagesActions/types';
import { showMessage } from 'actions';

import { store } from 'store';

// function which takes a message and location to redirect

export default function showMessageAndRedirect(message, whereToRedirect) {
    store.dispatch(showMessage(message));
    setTimeout(() => {
        history.push(whereToRedirect);
        store.dispatch({ type: CLEAR_MESSAGE });
    }, 3000);
}