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
// document.addEventListener("DOMContentLoaded", () => {
//   const menuToggle = document.querySelector(".fa-bars");
//   const menu = document.querySelector("nav > ul");
//   if (menuToggle) {
//     menuToggle.addEventListener("click", () => {
//       menu.classList.toggle("hidden--mobile");
//     });
//   }
// });
router.hooks({
  // We pass in the `done` function to the before hook handler to allow the function to tell Navigo we are finished with the before hook.
  // The `match` parameter is the data that is passed from Navigo to the before hook handler with details about the route being accessed.
  // https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#match
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
      case "reviews":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.REVIEW_API_URL}/reviews`)
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.reviews.reviews = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      default:
        // We must call done for all views so we include default for the views that don't have cases above.
        done();
      // break is not needed since it is the last condition, if you move default higher in the stack then you should add the break statement.
    }
  },
  already: match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    render(store[view]);
    // add menu toggle to bars icon in nav bar
    // document.querySelector(".fa-bars").addEventListener("click", () => {
    //   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    // });
  },
  after: match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    router.updatePageLinks();
    // add menu toggle to bars icon in nav bar
    // document.querySelector(".fa-bars").addEventListener("click", () => {
    //   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    // });
    if (view === "reviews") {
      // Add an event handler for the submit button on the form
      document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        // Get the form element
        const inputList = event.target.elements;
        console.log("Input Element List", inputList);
        // Create a request body object to send to the API
        const requestData = {
          name: inputList.name.value,
          review: inputList.review.value,
          rating: inputList.rating.value,
          date: inputList.date.value,
        };
        // Log the request body to the console
        console.log("request Body", requestData);
        axios
          // Make a POST request to the API to create a new pizza
          .post(`${process.env.REVIEW_API_URL}/reviews`, requestData)
          .then(response => {
          //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
            store.reviews.reviews.push(response.data);
            router.navigate("/reviews");
          })
          // If there is an error log it to the console
          .catch(error => {
            console.log("It puked", error);
          });
      });
    }
  }
});
// router.hooks({
//   before: (done, match) => {
//     const view = match?.data?.view ? camelCase(match.data.view) : "home";
//     switch (view) {
//       case "itemsForSale":
//         axios.get("https://fakestoreapi.com/products")
//           .then(response => {
//             store.itemsForSale.items = response.data;
//             done();
//           })
//           .catch(error => {
//             console.log("Failed to fetch data:", error);
//             done();
//           });
//         break;
//       default:
//         done();
//     }
//   },
//   already: (match) => {
//     const view = match?.data?.view ? camelCase(match.data.view) : "home";
//     render(store[view]);
//   },
//   after: () => {
//     router.updatePageLinks();
//   }
// });
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