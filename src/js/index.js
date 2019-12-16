require('../scss/index.scss');
// import '../index.html';

// var addFun = require('./testObj');

// console.log('addFUn', addFun);

import addFun from './testObj.js';
console.log('addFUn', addFun);

alert('Benson');

const hello = `Hello, Wrold`;
const arr = ['one', 'two', 'three'];

arr.forEach(item => console.log(item));

const arr2 = [...arr, 'four'];

console.log($);

import axios from 'axios';
axios.get('../').then(res => console.log(res));

$(function() {});