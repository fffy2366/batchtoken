const axios = require("axios").default;

axios.defaults.timeout = 10000; // 超时10秒
axios.defaults.headers["Content-Type"] = "application/json";

export class Api {
  // private host = "https://stagingkrapi.meta.auto";
  private host = "https://krapi.meta.auto";
  private address = "";
  private token: string | undefined;
  // private headers: {} | undefined;
  constructor(token = "") {
    this.token = token;
  }

  async post(url: string, payload: any, options = {} as any) {
    options.headers = this.getHeaders();
    return axios.post(url, payload, options);
  }

  async get(url: string, options = {}) {
    return axios.get(url, options);
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + this.token,
    };
  }

  getAddress() {
    return this.address;
  }

  async login(address: string, sign: string, ts: string) {
    const payload = {
      address,
      sign,
      ts,
    };
    const loginResponse = await this.post(this.host + "/users/login", payload);
    // console.log("loginResponse: %o", loginResponse);
    this.token = loginResponse.data.token ?? "";
    this.address = address;
    return this.token;
  }

  async build(clazz: number) {
    const payload = {
      clazz,
    };
    const buildResponse = await this.post(
      this.host + "/starship/build",
      payload
    );
    return buildResponse.data ?? "";
  }

  async synthesis(ids: number[]) {
    const payload = {
      ids,
    };
    const buildResponse = await this.post(
      this.host + "/starship/synthesis",
      payload
    );
    return buildResponse.data ?? "";
  }

  async getStarshipList(params: {
    start: 0;
    limit: 10;
    address: string;
    clazz: number;
    level: number;
    dispatching: number;
  }) {
    const list = await this.get(this.host + "/starship/warehouse", {
      headers: this.getHeaders(),
      params,
    });
    return list.data ?? {};
  }

  async walletMe() {
    const me = await this.get(this.host + "/wallets/me", {
      headers: this.getHeaders(),
    });
    return me.data ?? {};
  }
}
