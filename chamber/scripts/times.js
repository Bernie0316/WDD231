// copyright year
const year = document.querySelector('#currentyear');
year.textContent = new Date().getFullYear()

// last modified
const modified = document.querySelector('#lastModified');
modified.textContent = `Last Update: ${document.lastModified}`;