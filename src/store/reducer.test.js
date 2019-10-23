import reducer from './reducer';

//reducer test for testing redux actions
describe('registration user',()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            registration: {
                userName: '',
                firstName: '',
                lastname: '',
                companyName: '',
                password: ''
            },
            codes: ''
        });
    });
    it('should store data when trigered',()=>{
        expect(reducer({
            registration: {
                userName: '',
                firstName: '',
                lastname: '',
                companyName: '',
                password: ''
            },
            codes: ''
        },{
            type:'SAVE_USERNAME',
            registration: {
                userName:'some value',
                firstName: 'some value',
                lastname:'some value',
                companyName:'some value',
                password: 'some value'
            },
            codes: ''
        })).toEqual({
            registration: {
                userName:'some value',
                firstName: 'some value',
                lastname:'some value',
                companyName:'some value',
                password: 'some value'
            },
            codes: ''
        });
    });
    it('should store data of userName when trigered',()=>{
        expect(reducer({
            registration: {
                userName: '',
                firstName: '',
                lastname: '',
                companyName: '',
                password: ''
            },
            codes: ''
        },{
            type:'SAVE_ID',
            registration: {
                userName:'',
                firstName: '',
                lastname:'',
                companyName:'',
                password: ''
            },
            codes: 'some value'
        })).toEqual({
            registration: {
                userName:'',
                firstName: '',
                lastname:'',
                companyName:'',
                password: ''
            },
            codes: 'some value'
        });
    });
});