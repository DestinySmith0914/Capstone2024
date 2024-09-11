import html from "html-literal";
import aboutMe from "../assets/img/aboutMe.jpg";

export default () => html`
  <section id="bio">
    <h2>About The Blacksmith</h2>
    <img src="${aboutMe}" alt="pic of me" width="400px" />
    <p>
      My name is Destiny Smith. I enjoy blacksmithing and my passion for it gave
      me the idea to make this website. I want to sell my products, whether they
      be knives, axes, or other trinkets. Hopefully my items are of use for you
      and something you can keep or use for a long time!
    </p>
    <br />
    <br />
    <h3>Here are some things I would like to create in the future!</h3>
    <ul id="bullets">
      <br />
      <li>Traditional Swedish style axes</li>
      <br />
      <li>Cast iron pans</li>
      <br />
      <li>Blacksmithing tools</li>
      <br />
      <li>Fantasy swords</li>
      <br />
      <li>Even more knives!</li>
    </ul>
    <br />
    <br />
    <h3>Here are some games I like to play!</h3>
    <ul id="bullets">
      <li>Red Dead Redemption 1 & 2</li>
      <li>Green hell</li>
      <li>Katamari Damacy</li>
      <li>Minecraft</li>
      <li>Dead Space</li>
    </ul>
  </section>
`;
