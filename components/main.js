import html from "html-literal";
import * as views from "../views";

export default state => html`
  ${views[state.view](state)}
`;

{
  /* <section id="jumbotron">
    <h2>Handmade knives, trinkets and more..</h2>
    <a href="index.html">"Call to Action" "Button"</a>
  </section> */
}
