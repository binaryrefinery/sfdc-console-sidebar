let orgName = window.location.hostname.split('.')[0];
let base = '## Dev Console: ';
let titleElement = document.querySelector('title');
titleElement.innerText = base + ' ' + orgName.toUpperCase();
