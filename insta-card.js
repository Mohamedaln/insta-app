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
    this.postDate = "";
    this.dark1 = false;
    this.visible1 = false;
    this.liked1 = false;
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
      postDate: { type: String },
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

        .imgBox1 {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cardBox.dark1 .imgBox1 {
          background: #333;
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

        .bottomPart {
          padding: 12px;
        }

        /* like button row */
        .likeRow1 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .likeBtn1 {
          background: none;
          border: 1px solid #ddd;
          border-radius: 20px;
          cursor: pointer;
          font-size: 16px;
          padding: 4px 10px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cardBox.dark1 .likeBtn1 {
          border-color: #555;
        }

        .likeBtn1:hover {
          background: #fff0f0;
        }

        .cardBox.dark1 .likeBtn1:hover {
          background: #3a2a2a;
        }

        .likeCnt1 {
          font-size: 13px;
          color: #555;
        }

        .cardBox.dark1 .likeCnt1 {
          color: #aaa;
        }

        .captionText {
          font-size: 14px;
          color: #333;
          margin: 0 0 8px 0;
        }

        .cardBox.dark1 .captionText {
          color: #ddd;
        }

        /* date and author info */
        .metaRow1 {
          margin-top: 6px;
          font-size: 11px;
          color: #aaa;
          display: flex;
          justify-content: space-between;
        }

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

  connectedCallback() {
    super.connectedCallback();
    this.obs1 = new IntersectionObserver((entries) => {
      var e1 = entries[0];
      if (e1.isIntersecting) {
        this.visible1 = true;
        this.obs1.disconnect();
      }
    });
    this.obs1.observe(this);
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('postId') && this.postId) {
      this.liked1 = false;
      this.likeCount1 = 0;
      this.loadLikes1();
    }
  }

  loadLikes1() {
    var key1 = "likes_" + this.postId;
    var saved1 = localStorage.getItem(key1);
    if (saved1 !== null) {
      var data1 = JSON.parse(saved1);
      this.liked1 = data1.liked1;
      this.likeCount1 = data1.count1;
    }
  }

  saveLikes1() {
    var key1 = "likes_" + this.postId;
    var data1 = {
      liked1: this.liked1,
      count1: this.likeCount1
    };
    localStorage.setItem(key1, JSON.stringify(data1));
  }

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

        <div class="topPart">
          <img class="avatarImg1" src="${this.authorImg}" alt="author photo" />
          <div class="userInfo1">
            <span class="usernameText">${this.user}</span>
            <span class="channelText1">${this.channel}</span>
          </div>
        </div>

        <div class="imgBox1">
          ${this.visible1
            ? html`<img class="imageFox" src="${this.imgUrl}" alt="${this.postName}" />`
            : html`<span class="loadingTxt1">loading image...</span>`
          }
        </div>

        <div class="bottomPart">

          <div class="likeRow1">
            <button class="likeBtn1" @click="${this.toggleLike1}" title="like this post">
              ${heartIcon1} ${this.likeCount1}
            </button>
            <span class="likeCnt1">${this.likeCount1 === 1 ? "like" : "likes"}</span>
          </div>

          <p class="captionText">
            <strong>${this.user}: </strong>${this.text}
          </p>

          <div class="metaRow1">
            <span>member since ${this.userSince}</span>
            <span>${this.postDate}</span>
          </div>

        </div>

      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);