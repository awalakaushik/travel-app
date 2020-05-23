import { handleSubmit, handleSave } from '../client/js/app';
import 'babel-polyfill';

describe('Given handleSubmit(), expect it to be defined' , () => {
    test('It should be defined', async () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe('Given handleSubmit(), expect it to be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});

describe('Given handleSave(), expect it to be defined' , () => {
    test('It should be defined', async () => {
        expect(handleSave).toBeDefined();
    });
});

describe('Given handleSave(), expect it to be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSave).toBe("function");
    });
});