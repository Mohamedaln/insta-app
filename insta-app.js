import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./insta-card.js";

class InstaApp extends DDDSuper(LitElement) {
  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    this.posts1 = [];
    this.idx1 = 0;
    this.dark1 = false;
    // true while waiting for data
    this.loading1 = true;
  }

  static get properties() {
    return {
      ...super.properties,
      posts1: { type: Array },
      idx1: { type: Number },
      dark1: { type: Boolean },
      loading1: { type: Boolean },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100vh;
          background-color: #fafafa;
          padding: 16px;
        }

        :host([dark1]) {
          background-color: #111;
          color: white;
        }

        .main1 {
          max-width: 460px;
          margin: auto;
        }

        .topBar1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .siteTitle1 {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }

        :host([dark1]) .siteTitle1 {
          color: white;
        }

        .darkBtn1 {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          background: #333;
          color: white;
          cursor: pointer;
          font-size: 13px;
        }

        :host([dark1]) .darkBtn1 {
          background: white;
          color: black;
        }

        /* loading placeholder so page doesnt flash */
        .loadBox1 {
          background: #eee;
          border-radius: 10px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-size: 14px;
        }

        :host([dark1]) .loadBox1 {
          background: #333;
          color: #666;
        }

        .navRow1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .navBtn1 {
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          background: #3897f0;
          color: white;
          cursor: pointer;
          font-size: 14px;
        }

        .navBtn1:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .counter1 {
          font-size: 13px;
          color: #888;
        }

        :host([dark1]) .counter1 {
          color: #aaa;
        }

        .dots1 {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .dot1 {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ccc;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        .dot1.active1 {
          background: #3897f0;
        }

        .shareBtn1 {
          display: block;
          margin: 12px auto 0;
          padding: 7px 18px;
          background: #5851db;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
        }

        @media (max-width: 500px) {
          .main1 {
            max-width: 100%;
          }
          .navBtn1 {
            padding: 6px 12px;
            font-size: 13px;
          }
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkUrl1();
    this.getData1();
  }

  checkUrl1() {
    var url1 = new URLSearchParams(window.location.search);
    var idx = url1.get("activeIndex");
    if (idx !== null) {
      this.idx1 = parseInt(idx);
    }
  }

  updateUrl1() {
    var newUrl = window.location.pathname + "?activeIndex=" + this.idx1;
    window.history.pushState({}, "", newUrl);
  }

  async getData1() {
    var url1 = "";
    if (window.location.hostname === "localhost") {
      url1 = "/data.json";
    } else {
      url1 = "/api/data";
    }
    var res1 = await fetch(url1);
    var json1 = await res1.json();
    this.posts1 = json1.data;
    // done loading
    this.loading1 = false;
  }

  goNext1() {
    var n1 = this.idx1;
    n1 = n1 + 1;
    if (n1 < this.posts1.length) {
      this.idx1 = n1;
      this.updateUrl1();
    }
  }

  goPrev1() {
    var n1 = this.idx1;
    n1 = n1 - 1;
    if (n1 >= 0) {
      this.idx1 = n1;
      this.updateUrl1();
    }
  }

  goTo1(i2) {
    this.idx1 = i2;
    this.updateUrl1();
  }

  toggleDark1() {
    this.dark1 = !this.dark1;
    if (this.dark1) {
      this.setAttribute("dark1", "");
    } else {
      this.removeAttribute("dark1");
    }
  }

  sharePost1() {
    var url2 = window.location.href;
    navigator.clipboard.writeText(url2);
    alert("link copied!");
  }

  render() {
    var curPost1 = this.posts1[this.idx1];
    var total1 = this.posts1.length;
    var prevOff1 = this.idx1 === 0;
    var nextOff1 = this.idx1 === total1 - 1;

    return html`
      <div class="main1">

        <div class="topBar1">
          <div class="siteTitle1">FoxGram</div>
          <button class="darkBtn1" @click="${this.toggleDark1}">
            ${this.dark1 ? "light mode" : "dark mode"}
          </button>
        </div>

        <!-- show placeholder while loading to avoid flash -->
        ${this.loading1
          ? html`<div class="loadBox1">loading foxes...</div>`
          : html`
            <insta-card
              imgUrl="${curPost1.thumb}"
              fullImg="${curPost1.full}"
              user="${curPost1.authorName}"
              text="${curPost1.description}"
              authorImg="${curPost1.authorImg}"
              userSince="${curPost1.userSince}"
              channel="${curPost1.channel}"
              postId="${String(curPost1.id)}"
              postName="${curPost1.name}"
              postDate="${curPost1.date}"
              ?dark1="${this.dark1}"
            ></insta-card>
          `
        }

        <div class="navRow1">
          <button
            class="navBtn1"
            @click="${this.goPrev1}"
            ?disabled="${prevOff1}"
            title="previous image"
          >prev</button>

          <span class="counter1">${this.idx1 + 1} of ${total1}</span>

          <button
            class="navBtn1"
            @click="${this.goNext1}"
            ?disabled="${nextOff1}"
            title="next image"
          >next</button>
        </div>

        <div class="dots1">
          ${this.posts1.map(
            (p1, i2) => html`
              <button
                class="dot1 ${this.idx1 === i2 ? "active1" : ""}"
                @click="${() => this.goTo1(i2)}"
                title="go to image ${i2 + 1}"
              ></button>
            `
          )}
        </div>

        <button class="shareBtn1" @click="${this.sharePost1}">
          share this fox
        </button>

      </div>
    `;
  }
}

customElements.define("insta-app", InstaApp);