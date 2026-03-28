import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./insta-card.js";

class InstaApp extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    // holds the array of posts from our JSON file
    this.posts = [];
  }

  static get properties() {
    return {
      posts: { type: Array },
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
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // load data as soon as the element connects to the page
    this.getData();
  }

  async getData() {
    // fetch from our own JSON file instead of randomfox
    let response = await fetch("/api/data");
    let json = await response.json();

    // store the array of posts so the page re-renders
    this.posts = json.data;
  }

  render() {
    return html`
      <div class="main">

        <!-- loop over every post and make a card for each one -->
        ${this.posts.map(
          (post) => html`
            <insta-card
              imgUrl="${post.image}"
              user="mygallery"
              text="${post.description}"
            ></insta-card>
          `
        )}

      </div>
    `;
  }
}

customElements.define("insta-app", InstaApp);