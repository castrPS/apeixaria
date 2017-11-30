import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameClient = ((elem, client) => elem.element(by.name('client')).getText().then(text => text === client));
let sameCode = ((elem, code) => elem.element(by.name('code')).getText().then(text => text === code));
let paid = ((elem) => elem.element(by.name('paid')).getAttribute('value').then(value => value === 'true'));
let delivered = ((elem) => elem.element(by.name('delivered')).getAttribute('value').then(value => value === 'true'));
let canceled = ((elem) => elem.element(by.name('canceled')).getAttribute('value').then(value => value === 'true'));
let sameDate = ((elem, date) => elem.element(by.name('deliverDate')).getText().then(text => text === date));

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^eu estou na pagina de pedidos pendentes$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('ApGui');
        await $("a[name='pedidos']").click();
    })

    Given(/^eu vejo o pedido "(\d*)" cadastrado ao cliente "([^\"]*)"$/, async (code, client) => {
        var all : ElementArrayFinder = element.all(by.name('code'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var samecodename = samecodename.filter(elem => sameClient(elem,client));
        await samecodename.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^o pedido "(\d*)" nao esta marcado como pago$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('code'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        var notpaid = samecode.filter(elem => !paid(elem));
        await notpaid.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^o pedido "(\d*)" nao esta marcado como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('code'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        var notdelivered = samecode.filter(elem => !delivered(elem));
        await notdelivered.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu marcar o pedido "(\d*)" como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('code'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        await samecode.element(by.name('deliveredd')).click();
    });

    Then(/^eu vejo o pedido "(\d*)" na pagina de pedidos pendentes$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('code'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})