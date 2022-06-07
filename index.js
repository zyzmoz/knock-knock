import { Route, Router } from "./assets/js/classes/router.js";
import { storybookCtrl } from './assets/js/controllers/storybookCtrl.js';

   
const authGuard = () => {

 window.location.replace('#main')
 return true
}
const routes = [
    new Route("#storybook", "/pages/dev/storybook.html", storybookCtrl, true),
    new Route("#main", "index.html"),
  ];
  
  Router.init("root", routes, authGuard);
