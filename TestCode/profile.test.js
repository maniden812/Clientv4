
// function checkProfile() {
//     var fullName = document.getElementById('fullName').value;
//     var address1 = document.getElementById('address1').value;
//     var address2 = document.getElementById('address2').value;
//     var city = document.getElementById('city').value;
//     var state = document.getElementById('state').value;
//     var zipcode = document.getElementById('zipcode').value;

//     var errorMsg = '';

//     if (fullName.length === 0) {
//         errorMsg = 'Empty Full Name\n';
//     }
//     if (address1 === 0) {
//         errorMsg = 'Empty Address 1\n';
//     }
//     if (city === 0) {
//         errorMsg = 'Empty City\n';
//     }
//     if (state === 0) {
//         errorMsg = 'Empty State\n';
//     }
//     if (zipcode === 0) {
//         errorMsg = 'Empty Zipcode\n';
//     }
// }
import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import {render, fireEvent, screen} from '@testing-library/react';
import Profile from '../pages/Profile/profile';
// import TestRenderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
//const profilemodule = require('../pages/profile');
test('check if values are empty', () => {
     const wrapper = shallow( < Profile /> );
    // const instance = wrapper.instance();
    expect(true).toBe(true);
    const [fullname, address1, address2, city, state, zipcode] = Profile(fullname, address1, address2, city, state, zipcode);

    expect(fullname).not.toBeNull();
    // creat object that mimics db and check if params are empty 
    expect(fullname).toBeLessThanOrEqual(50);

    expect(address1).not.toBeNull();
    expect(address1).toBeLessThanOrEqual(100);

    expect(address2).toBeLessThanOrEqual(100);

    expect(city).not.toBeNull();
    expect(city).toBeLessThanOrEqual(100);

    expect(state).not.toBeNull();

    expect(zipcode).not.toBeNull();
    expect(zipcode).toBeLessThanOrEqual(9);
    expect(zipcode).toBeGreaterThanOrEqual(5);
});