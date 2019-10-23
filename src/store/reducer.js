//Reducer for storing component data which can be used in other components

const initialState = {
    registration: {
        userName: '',
        firstName: '',
        lastname: '',
        companyName: '',
        password: ''
    },
    codes: ''
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SAVE_USERNAME') {

        return {
            ...initialState,
            registration: action.regis
        }
    }
    if (action.type === 'SAVE_ID') {

        return {
            ...initialState,
            codes: action.codes
        }
    }
    return state;
};

export default reducer;