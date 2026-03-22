import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./insta-card.js";

class InstaApp extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    this.imgUrl = "";
    this.pageLink = "";
    this.data1 = null;
  }

  static get properties() {
    return {
      imgUrl: { type: String },
      pageLink: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: #fafafa;
          min-height: 100vh;
          padding: 16px;
        }

        .main {
          max-width: 460px;
          margin: auto;
        }

        .myButton {
          display: block;
          margin: 20px auto;
          padding: 8px 20px;
          background-color: #3897f0;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .myButton:hover {
          background-color: #2277cc;
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getData();
  }

  async getData() {
    let response = await fetch("https://randomfox.ca/floof/");

    let json = await response.json();

    this.data1 = json;

    let img = this.data1.image;
    let link = this.data1.link;

    this.imgUrl = img;
    this.pageLink = link;
  }

  buttonClick() {
    this.getData();
  }

  render() {
    let imageToShow = this.imgUrl;
    let linkToShow = this.pageLink;

    return html`
      <div class="main">
        <insta-card
          imgUrl="${imageToShow}"
          pageLink="${linkToShow}"
          user="randomfox"
          text="look at this little guy"
        ></insta-card>

        <button class="myButton" @click="${this.buttonClick}">new fox</button>
      </div>
    `;
  }
}

customElements.define("insta-app", InstaApp);