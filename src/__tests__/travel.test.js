import {getTripCity, getTripStartDate, getCountdown} from '../client/js/travel';
import 'babel-polyfill';

// Test if the method is defined
describe('Check if getTripCity() method is defined' , () => {
    test('Returns true', async () => {
        expect(getTripCity).toBeDefined();
    });
});

describe('Check if getTripStartDate() method is defined' , () => {
    test('Returns true', async () => {
        expect(getTripStartDate).toBeDefined();
    });
});

describe('Check if getCountdown() method is defined' , () => {
    test('Returns true', async () => {
        expect(getCountdown).toBeDefined();
    });
});

describe('Given a trip start date, getCountdown() returns a number to indicate the number of days left for the trip.' , () => {
    const startDate = "05/30/2020";
    test('Returns a number', async () => {
        const response = getCountdown(startDate);
        expect(response).toBeDefined();
        expect(typeof response).toBe("number");
    });
});
