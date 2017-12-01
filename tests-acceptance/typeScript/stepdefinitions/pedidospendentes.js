"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));
let sameClient = ((elem, client) => elem.element(protractor_1.by.name('client')).getText().then(text => text === client));
let sameCode = ((elem, code) => elem.element(protractor_1.by.name('code')).getText().then(text => text === code));
let paid = ((elem) => elem.element(protractor_1.by.name('paid')).getAttribute('value').then(value => value === 'true'));
let delivered = ((elem) => elem.element(protractor_1.by.name('delivered')).getAttribute('value').then(value => value === 'true'));
let canceled = ((elem) => elem.element(protractor_1.by.name('canceled')).getAttribute('value').then(value => value === 'true'));
let sameDate = ((elem, date) => elem.element(protractor_1.by.name('deliverDate')).getText().then(text => text === date));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na pagina de pedidos pendentes$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('ApGui');
        yield protractor_1.$("a[name='pedidos']").click();
    }));
    Given(/^eu vejo o pedido "(\d*)" cadastrado ao cliente "([^\"]*) na lista de pendentes"$/, (code, client) => __awaiter(this, void 0, void 0, function* () {
        var all = protractor_1.element.all(protractor_1.by.name('pendentes'));
        yield all;
        var samecode = all.filter((elem => sameCode(elem, code)));
        yield samecode;
        yield samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var samecodename = samecodename.filter(elem => sameClient(elem, client));
        yield samecodename.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Given(/^o pedido "(\d*)" nao esta marcado como pago$/, (code) => __awaiter(this, void 0, void 0, function* () {
        var all = protractor_1.element.all(protractor_1.by.name('pendentes'));
        yield all;
        var samecode = all.filter((elem => sameCode(elem, code)));
        yield samecode;
        var notpaid = samecode.filter(elem => !paid(elem));
        yield notpaid.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Given(/^o pedido "(\d*)" nao esta marcado como entregue$/, (code) => __awaiter(this, void 0, void 0, function* () {
        var all = protractor_1.element.all(protractor_1.by.name('pendentes'));
        yield all;
        var samecode = all.filter((elem => sameCode(elem, code)));
        yield samecode;
        var notdelivered = samecode.filter(elem => !delivered(elem));
        yield notdelivered.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^eu marcar o pedido "(\d*)" como entregue$/, (code) => __awaiter(this, void 0, void 0, function* () {
        var all = protractor_1.element.all(protractor_1.by.name('pendentes'));
        yield all;
        var samecode = all.filter((elem => sameCode(elem, code)));
        yield samecode;
        yield samecode.element(protractor_1.by.name('deliveredd')).click();
    }));
    Then(/^eu vejo o pedido "(\d*)" na lista de pedidos pendentes$/, (code) => __awaiter(this, void 0, void 0, function* () {
        var all = protractor_1.element.all(protractor_1.by.name('pendentes'));
        yield all;
        var samecode = all.filter((elem => sameCode(elem, code)));
        yield samecode;
        yield samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
