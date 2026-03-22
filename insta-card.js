import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class InstaCard extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-card";
  }

  constructor() {
    super();
    this.imgUrl = "";
    this.pageLink = "";
    this.user = "user";
    this.text = "";
    this.data1 = null;
  }

  static get properties() {
    return {
      imgUrl: { type: String },
      pageLink: { type: String },
      user: { type: String },
      text: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .cardBox {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          max-width: 460px;
          margin: auto;
        }

        .topPart {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e06030;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .usernameText {
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }

        .imageFox {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
        }

        .bottomPart {
          padding: 12px;
        }

        .captionText {
          font-size: 14px;
          color: #333;
          margin: 0 0 8px 0;
        }

        .linkText {
          font-size: 12px;
          color: #0095f6;
          text-decoration: none;
        }

        .linkText:hover {
          text-decoration: underline;
        }
      `,
    ];
  }

  render() {
    let imageToShow = this.imgUrl;
    let linkToShow = this.pageLink;
    let userName = this.user;
    let captionText = this.text;

    let firstLetter = "";
    if (userName) {
      firstLetter = userName.charAt(0).toUpperCase();
    }

    let linkPart = ``;

    if (linkToShow) {
      linkPart = html`
        <a class="linkText" href="${linkToShow}" target="_blank">
          see original
        </a>
      `;
    }

    return html`
      <div class="cardBox">
        <div class="topPart">
          <div class="circle">${firstLetter}</div>
          <span class="usernameText">${userName}</span>
        </div>

        <img class="imageFox" src="${imageToShow}" alt="a fox" />

        <div class="bottomPart">
          <p class="captionText">
            <strong>${userName}: </strong>${captionText}
          </p>
          ${linkPart}
        </div>
      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);