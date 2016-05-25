import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';

let commonModule = angular.module('login.common', [
  Navbar.name,
  Hero.name,
  User.name
]);

export default commonModule;
