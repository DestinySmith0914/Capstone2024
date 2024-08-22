// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});

import { footer, header, main, nav } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
  ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
}

render();
