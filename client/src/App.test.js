import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "./App";
import Books from "./App";
import { getBook, res } from "./components/Books";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render( < App / > , div);
    ReactDOM.unmountComponentAtNode(div);
});

// Testing fetch()
it("Testing Api", () => {
    done => {
        function callBack(data) {
            expect(data).toBe(res);
            done();
        }
        callBack();
        const div = document.createElement("div");
        ReactDOM.renderer( < Book / > , div);
        ReactDOM.unmountComponentAtNode(div);
    };
});

// Snapshot Testing
it("The test works!", () => {
    const component = renderer.create( < Books / > );
    let app = component.toJSON();
    expect(app).toMatchSnapshot();
});