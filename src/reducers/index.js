import {combineReducers} from 'redux';

import {posts_reducer} from './posts_reducer';
import {users_reducer} from './users_reducer';
import {chats_reducer} from './chats_reducer';
import {user_reducer} from './user_reducer';
import {auth_reducer} from './auth_reducer';

export const root_reducer = combineReducers({
    posts: posts_reducer,
    users: users_reducer,
    auth: auth_reducer,
    user: user_reducer,
    chats: chats_reducer
});