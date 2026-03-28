import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class InstaCard extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-card";
  }

  constructor() {
    super();
    this.imgUrl = "";
    this.user = "user";
    this.text = "";
  }

  static get properties() {
    return {
      imgUrl: { type: String },
      user: { type: String },
      text: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          /* space between stacked cards */
          margin-bottom: 24px;
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
          margin: 0;
        }
      `,
    ];
  }

  render() {
    // first letter of username for the avatar circle
    let firstLetter = this.user ? this.user.charAt(0).toUpperCase() : "";

    return html`
      <div class="cardBox">

        <!-- top bar: avatar + username -->
        <div class="topPart">
          <div class="circle">${firstLetter}</div>
          <span class="usernameText">${this.user}</span>
        </div>

        <!-- the photo -->
        <img class="imageFox" src="${this.imgUrl}" alt="gallery image" />

        <!-- caption below the photo -->
        <div class="bottomPart">
          <p class="captionText">
            <strong>${this.user}: </strong>${this.text}
          </p>
        </div>

      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);