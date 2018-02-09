import 'airbnb-js-shims';
import { configure, setAddon } from "@storybook/react";
import infoAddon from "@storybook/addon-info";
import { setOptions } from "@storybook/addon-options";


const req = require.context('../packages', true, /\.stories\.js$/)

function loadStories() {
    req.keys().forEach((filename) => req(filename))
}

setOptions({
    name: "TKVW Components",
    url: "https://test.com",
    goFullScreen: false,
    showLeftPanel: true,
    showDownPanel: true,
    showSearchBox: false,
    downPanelInRight: true,
    sortStoriesByKind: true
});

setAddon(infoAddon);

configure(loadStories, module);