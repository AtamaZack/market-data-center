import axios from 'axios';
import {
    LOADING_ITEMS,
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM
} from './types'

export const loadingSetItems = () => {
    return {
        type: LOADING_ITEMS
    };
};

export const getItems = () => dispatch => {
    dispatch(loadingSetItems());
    axios.get('/api/items').then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
};

export const addItem = item => dispatch => {
    axios.post('/api/items', item).then(res => 
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    )
};

export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    )
};