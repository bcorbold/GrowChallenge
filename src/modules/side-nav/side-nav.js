require('./side-nav.scss');

import $ from 'jquery';

const sideNaveTemplate = `
<div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" id="closeNav" class="closebtn" >&times;</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Clients</a>
  <a href="#">Contact</a>
</div>
`;

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  document.getElementById('openNav').addEventListener('click', () => openNav());
  document.getElementById('closeNav').addEventListener('click', () => closeNav());
}

/* Set the width of the side navigation to 250px */
export function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}