import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameClient = ((elem, client) => elem.element(by.name('client')).getText().then(text => text === client));
let sameCode = ((elem, code) => elem.element(by.name('code')).getText().then(text => text === code));
let notpaid = ((elem) => elem.element(by.name('paid')).getAttribute('class').then(value => value === 'false'));
let notdelivered = ((elem) => elem.element(by.name('delivered')).getAttribute('class').then(value => value === 'false'));
let sameDate = ((elem, date) => elem.element(by.name('deliverDate')).getText().then(text => text === date));

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^eu estou na pagina de pedidos pendentes$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('ApGui');
        await $("a[name='pedidos']").click();
    })

    Given(/^eu vejo o pedido "(\d*)" cadastrado ao cliente "([^\"]*)" na lista de pendentes$/, async (code, client) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code) && sameClient(elem,client)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^o pedido "(\d*)" nao esta marcado como pago$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code) && notpaid(elem)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^o pedido "(\d*)" nao esta marcado como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code) && notdelivered(elem)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu marcar o pedido "(\d*)" como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await samecode.first().all(by.name('delivered')).first().$("input[type='checkbox']").click();
    });

    Then(/^eu vejo o pedido "(\d*)" na lista de pedidos pendentes$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})