import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import request = require("request-promise");

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameClient = ((elem, client) => elem.element(by.name('client')).getText().then(text => text === client));
let sameCode = ((elem, code) => elem.element(by.name('code')).getText().then(text => text === code));
let sameText= ((elem, code) => elem.element(by.name('paidDelivered')).getText().then(text => text === code));
let notpaid = ((elem) => elem.element(by.name('paid')).getAttribute('class').then(value => value === 'false'));
let notdelivered = ((elem) => elem.element(by.name('delivered')).getAttribute('class').then(value => value === 'false'));
let delivered = ((elem) => elem.element(by.name('delivered')).getAttribute('class').then(value => value === 'true'));
let sameDate = ((elem, date) => elem.element(by.name('deliverDate')).getText().then(text => text === date));



defineSupportCode(function ({ Given, When, Then }) {

    Given(/^eu estou na pagina de pedidos pendentes$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('ApGui');
        await $("a[name='pedidos']").click();
    })

    Given(/^eu tenho o pedido "(\d*)" cadastrado ao cliente "([^\"]*)" com data de pedido "([^\"]*)" e data de entrega "([^\"]*)"$/, async (code, client, pedido, entrega) => {
        var options:any = {method: 'POST', uri: ("http://localhost:3000/pedidos"), body:{"cliente": {"nome": client}, "entregue" : false, "pago": false, "dataPedido": pedido, "dataEntrega":entrega}, json: true};
        request(options);
        request.post("localhost:3000/pedidos", );
    });

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

    Given(/^o pedido "(\d*)" esta marcado como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code) && delivered(elem)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu marcar o pedido "(\d*)" como entregue$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await samecode.first().all(by.name('delivered')).first().$("input[type='checkbox']").click();
    });

    When(/^eu marcar o pedido "(\d*)" como pago$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await samecode.first().all(by.name('paid')).first().$("input[type='checkbox']").click();
    });


    Then(/^eu vejo o pedido "(\d*)" na lista de pedidos pendentes$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^eu vejo o pedido "(\d*)" na lista de pedidos pendentes com atraso$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.first().$("td[class='outdated']").then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^eu nao vejo o pedido "(\d*)" na lista de pedidos pendentes$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('pendentes'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Then(/^eu vejo o pedido "(\d*)" no historico$/, async (code) => {
        var all : ElementArrayFinder = element.all(by.name('historicoLista'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^o pedido "(\d*)" estara marcado como entregue e pago com "([^\"]*)"$/, async (code, text) => {
        var all : ElementArrayFinder = element.all(by.name('historicoLista'));
        await all;
        var samecode = all.filter((elem => sameCode(elem,code)));
        await samecode;
        samecode = samecode.filter((elem => sameText(elem,text)));
        await samecode.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });




})