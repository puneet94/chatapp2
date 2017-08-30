const INITIAL_STATE = {
    
    all: {
        users: [],
        pages: 0,
        users_loading: true,
        users_received: false,

    },
    nearby:  {
        users: [],
        pages: 0,
        users_loading: true,
        users_received: false,

    } 
}
export const users_reducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ALL_USERS_RECEIVED':
            if(action.payload.page==1){
                return {...state, all:{...state.all,users:[...action.payload.data],pages:action.payload.pages}};    
            }
            return {...state, all:{...state.all,users:[...state.all.users,...action.payload.data],pages:action.payload.pages}};
        case 'NEARBY_USERS_RECEIVED':
            if(action.payload.page==1){
                return {...state, nearby:{...state.nearby,users:[...action.payload.data],pages:action.payload.pages}};    
            }
            return {...state, nearby:{...state.nearby,users:[...state.nearby.users,...action.payload.data],pages:action.payload.pages}};
        
        default:
            return state;
    }
}