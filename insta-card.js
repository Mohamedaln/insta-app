import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class InstaCard extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-card";
  }

  constructor() {
    super();
    this.imgUrl = "";
    this.fullImg = "";
    this.user = "user";
    this.text = "";
    this.authorImg = "";
    this.userSince = "";
    this.channel = "";
    this.postId = "";
    this.postName = "";
    this.dark1 = false;
    // is the image visible on screen yet
    this.visible1 = false;
    // is this post liked or not
    this.liked1 = false;
    // how many likes
    this.likeCount1 = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      imgUrl: { type: String },
      fullImg: { type: String },
      user: { type: String },
      text: { type: String },
      authorImg: { type: String },
      userSince: { type: String },
      channel: { type: String },
      postId: { type: String },
      postName: { type: String },
      dark1: { type: Boolean },
      visible1: { type: Boolean },
      liked1: { type: Boolean },
      likeCount1: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
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

        .cardBox.dark1 {
          background: #222;
          border-color: #444;
          color: white;
        }

        /* top bar */
        .topPart {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .cardBox.dark1 .topPart {
          border-bottom-color: #444;
        }

        /* author avatar image */
        .avatarImg1 {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .userInfo1 {
          display: flex;
          flex-direction: column;
        }

        .usernameText {
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }

        .cardBox.dark1 .usernameText {
          color: white;
        }

        .channelText1 {
          font-size: 11px;
          color: #999;
        }

        /* the photo - only shows when visible */
        .imgBox1 {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imageFox {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          display: block;
        }

        .loadingTxt1 {
          color: #aaa;
          font-size: 13px;
        }

        /* bottom area */
        .bottomPart {
          padding: 12px;
        }

        .captionText {
          font-size: 14px;
          color: #333;
          margin: 0 0 10px 0;
        }

        .cardBox.dark1 .captionText {
          color: #ddd;
        }

        /* like button row */
        .likeRow1 {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .likeBtn1 {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 22px;
          padding: 0;
        }

        .likeCnt1 {
          font-size: 13px;
          color: #555;
        }

        .cardBox.dark1 .likeCnt1 {
          color: #aaa;
        }

        /* author details at bottom */
        .authorRow1 {
          margin-top: 8px;
          font-size: 11px;
          color: #aaa;
        }

        /* mobile */
        @media (max-width: 500px) {
          .cardBox {
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
        }
      `,
    ];
  }

  // runs when element is added to the page
  connectedCallback() {
    super.connectedCallback();
    // set up intersection observer to detect when card is visible
    this.obs1 = new IntersectionObserver((entries) => {
      var e1 = entries[0];
      if (e1.isIntersecting) {
        this.visible1 = true;
        // stop watching once visible
        this.obs1.disconnect();
      }
    });
    // start watching this element
    this.obs1.observe(this);
  }

  // this runs every time a property changes
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('postId') && this.postId) {
      // reset likes first before loading new ones
      this.liked1 = false;
      this.likeCount1 = 0;
      this.loadLikes1();
    }
  }

  // load likes saved in localstorage for this specific post
  loadLikes1() {
    console.log("loading likes for postId:", this.postId);
    // each post has its own key using the postId
    var key1 = "likes_" + this.postId;
    var saved1 = localStorage.getItem(key1);
    if (saved1 !== null) {
      var data1 = JSON.parse(saved1);
      this.liked1 = data1.liked1;
      this.likeCount1 = data1.count1;
    }
  }

  // save likes to localstorage
  saveLikes1() {
    var key1 = "likes_" + this.postId;
    var data1 = {
      liked1: this.liked1,
      count1: this.likeCount1
    };
    localStorage.setItem(key1, JSON.stringify(data1));
  }

  // toggle like on and off
  toggleLike1() {
    if (this.liked1 === false) {
      this.liked1 = true;
      this.likeCount1 = this.likeCount1 + 1;
    } else {
      this.liked1 = false;
      this.likeCount1 = this.likeCount1 - 1;
      if (this.likeCount1 < 0) {
        this.likeCount1 = 0;
      }
    }
    this.saveLikes1();
  }

  render() {
    var darkClass1 = this.dark1 ? "cardBox dark1" : "cardBox";
    var heartIcon1 = this.liked1 ? "❤️" : "🤍";

    return html`
      <div class="${darkClass1}">

        <!-- top: author info -->
        <div class="topPart">
          <img class="avatarImg1" src="${this.authorImg}" alt="author" />
          <div class="userInfo1">
            <span class="usernameText">${this.user}</span>
            <span class="channelText1">${this.channel}</span>
          </div>
        </div>

        <!-- image: only loads when visible -->
        <div class="imgBox1">
          ${this.visible1
            ? html`<img class="imageFox" src="${this.imgUrl}" alt="${this.postName}" />`
            : html`<span class="loadingTxt1">scroll to load</span>`
          }
        </div>

        <!-- bottom: caption + likes + author details -->
        <div class="bottomPart">
          <p class="captionText">
            <strong>${this.user}: </strong>${this.text}
          </p>

          <div class="likeRow1">
            <button class="likeBtn1" @click="${this.toggleLike1}">
              ${heartIcon1}
            </button>
            <span class="likeCnt1">${this.likeCount1} likes</span>
          </div>

          <div class="authorRow1">
            member since ${this.userSince}
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);