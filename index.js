import { footer, header, main, nav } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();
}

render(store.home);

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".fa-bars");
  const menu = document.querySelector("nav > ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("hidden--mobile");
    });
  }
});

router.hooks({
  before: (done, match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    switch (view) {
      case "itemsForSale":
        axios.get("https://fakestoreapi.com/products")
          .then(response => {
            store.itemsForSale.items = response.data;
            done();
          })
          .catch(error => {
            console.log("Failed to fetch data:", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: (match) => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    render(store[view]);
  },
  after: () => {
    router.updatePageLinks();
  }
});

router.on({
  "/": () => render(),
  ":view": match => {
    const view = match.data.view ? camelCase(match.data.view) : "home";
    if (view in store) {
      render(store[view]);
    } else {
      render(store.viewNotFound);
      console.log(`View ${view} not defined`);
    }
  }
}).resolve();
