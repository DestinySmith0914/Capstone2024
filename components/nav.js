import html from "html-literal";
import navItem from "./navItem.js";

export default navItems => {
  return html`
    <nav>
      <ul class="hiddenThingy">
        ${navItems.map(item => navItem(item)).join("")}
      </ul>
    </nav>
  `;
};
