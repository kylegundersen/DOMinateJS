import { DOM } from '../src/index';
import { JSEventsEnum } from '../src/enum/js-events';

beforeEach(() => {
    return document.body.innerHTML = "";
});

test("Add event delegate to the page.", () => {
    var eventToggle = 0;
    DOM.addEventDelegate(JSEventsEnum.click, "#unique-id", () => { eventToggle += 1 });
    let domElement : Element = DOM.create("button", { id: "unique-id", class: "button" } );
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    getElementByID.click();
    expect(eventToggle).toBe(1);
});

test("Created element with a string.", () => {
    let domElement : Element = DOM.create("div", { id: "unique-id", class: "text-class", text: "Test Content", dataset: { test : 'test1' } });
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    expect(getElementByID.tagName).toBe("DIV");
    expect(getElementByID.classList[0]).toBe("text-class");
    expect(getElementByID.id).toBe("unique-id");
    expect(getElementByID.dataset.test).toBe("test1");
    expect(getElementByID.innerHTML).toBe("Test Content");
});

test("Created element with a node and element.", () => {
    let domInnerElement : Element = DOM.create("p");
    domInnerElement.append(document.createTextNode("Test Content"));
    let domElement : Element = DOM.create("div", { id: "unique-id", class: "text-class", append: domInnerElement });
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    expect(getElementByID.children[0].innerHTML).toBe("Test Content");
}); 

test("Created element with multiple nodes/elements, include HTML rendering.", () => {
    let domInnerElement1 : Element = DOM.create("p", { html : "<span>test</span>"});
    let domInnerElement2 : Element = DOM.create("p", { append : "test"});
    let domElement : Element = DOM.create("div", { id: "unique-id", class: "text-class", append: [domInnerElement1, domInnerElement2] });
    console.log(domElement.children[0]);
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    expect(getElementByID.children[0].innerHTML).toBe(`<span>test</span>`);
    expect(getElementByID.children[1].innerHTML).toBe("test");
}); 

test("Create an input element.", () => {
    let domElement = DOM.create("input", { id: "unique-id", class: "text-class", value: "test" });
    expect(domElement.value).toBe("test");
}); 

test("Created element events.", () => {
    var eventToggle = 0;
    let domElement : Element = DOM.create("div", { id: "unique-id", text: "test button" }, {click: () => { eventToggle += 1 }});
    document.body.append(domElement);
    let getElementByID = document.getElementById('unique-id');
    getElementByID.click();
    expect(eventToggle).toBe(1);
});

test("Detaching an element with reference and string parameter.", () => {
    let domElement : Element = DOM.create("div", { id: "unique-id", text: "test content" });
    document.body.append(domElement);
    DOM.detach(domElement);
    expect(document.getElementById('unique-id')).toBe(null);
    expect(domElement.id).toBe("unique-id");
    document.body.append(domElement);
    let domElement2 = DOM.detach("#unique-id");
    expect(document.getElementById('unique-id')).toBe(null);
    expect(domElement2.id).toBe("unique-id");
});

test("Select a single element.", () => {
    let containerElement : Element = DOM.create("div", { id: "unique-id", text: "test content" });
    document.body.append(containerElement);
    let getElements = DOM.select("#unique-id");
    expect(getElements.innerHTML).toBe("test content");
});

test("Select All elements.", () => {
    let containerElement : Element = DOM.create("div");
    containerElement.append( 
        DOM.create("div", {class: "text-class"}),
        DOM.create("div", {class: "text-class"}),
        DOM.create("div", {class: "text-class"})
        );
    document.body.append(containerElement);
    let getElements = DOM.selectAll(".text-class");
    expect(getElements.length).toBe(3);
    expect(getElements[0].classList[0]).toBe("text-class");
}); 

test("Two-way data binding with an HTML attribute using reference.", () => {
    let element : HTMLInputElement = DOM.create("input");
    let dataObject : any = {};
    DOM.bindAttribute(dataObject, "name", element, 'value');
    element.setAttribute("value", "test");
    expect(dataObject.name).toBe("test");
    dataObject.name = "test other way";
    expect(element.value).toBe("test other way");
});
    
test("Two-way data binding with an HTML attribute using selector.", () => {
    let element2 : HTMLInputElement = DOM.create("input", { id: "unique-id" });
    let dataObject : any = {};
    document.body.append(element2);
    DOM.bindAttribute(dataObject, "dataCustom", "#unique-id", 'data-custom');
    element2.setAttribute("data-custom", "test");
    expect(dataObject.dataCustom).toBe("test");
    dataObject.dataCustom = "test other way";
    expect(element2.getAttribute('data-custom')).toBe("test other way");
});

test("Get a DOM route as a string.", () => {
    let path = '/test/path';
    window.history.pushState({}, "", path);
    let currentRoute = DOM.getRoute();
    expect(currentRoute).toBe(path);
});

test("Get a DOM route as an array.", () => {
    let path = '/test/path';
    window.history.pushState({}, "", path);
    let currentRoute = DOM.getRoute(true);
    expect(currentRoute[0]).toBe('test');
    expect(currentRoute[1]).toBe('path');
});

test("Get a DOM query string as an object.", () => {
    let qs = '?test=1';
    window.history.pushState({}, "", qs);
    let data = DOM.getRouteData();
    expect(data.test).toBe("1");
});

test("Get a DOM query string as a string.", () => {
    let qs = '?test=1';
    window.history.pushState({}, "", qs);
    let data = DOM.getRouteData(false);
    expect(data).toBe('?test=1');
});

test("Get a DOM route.", () => {
    let path = '/test/path';
    DOM.setRoute(path);
    expect(path).toBe(DOM.getRoute());
});