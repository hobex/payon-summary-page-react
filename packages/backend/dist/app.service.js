"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const got_1 = require("got");
const https_proxy_agent_1 = require("https-proxy-agent");
let AppService = class AppService {
    async createCheckout() {
        const data = new URLSearchParams();
        data.append('entityId', process.env.ENTITY_ID);
        data.append('amount', '1.00');
        data.append('currency', 'EUR');
        data.append('paymentType', 'DB');
        data.append('customParameters[SHOPPER_ResultUrl]', 'http://localhost:3000/result');
        const config = {
            headers: {
                Authorization: process.env.TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
            responseType: 'json',
        };
        if (process.env.HTTP_PROXY)
            config.agent = { https: new https_proxy_agent_1.HttpsProxyAgent(process.env.HTTP_PROXY) };
        const res = await got_1.default.post(`${process.env.OPPWA_URL}/v1/checkouts`, config);
        const checkout = res.body;
        return checkout.id;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map