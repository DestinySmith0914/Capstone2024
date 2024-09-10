import html from "html-literal";

export default state => html`
  <section id="items-for-sale">
    <h2>Available Items</h2>
    <div class="items-grid">
      ${state.items
        .map(
          item => `
            <div class="item-slots">
              <img src="${item.image}" alt="${item.title}" />
              <h2>${item.title}</h2>   <!-- Corrected to </h2> -->
              <p>${item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
            `
        )
        .join("")}
    </div>
  </section>
`;
