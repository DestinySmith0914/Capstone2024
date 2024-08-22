import html from "html-literal";


export default navItems => {
  return html`
    <nav>
      <i class="fas fa-bars"></i>
      <ul class="">
        ${navItems.map(item => navItem(item)).join("")}
      </ul>
    </nav>
  `;
};
