//
// exention icon toggle on/ off
//

let extensionIconToggleOn = {
    "128": "extensionIconToggleOn128x128.png"
};

let extensionIconToggleOff = {
    "128": "extensionIconToggleOff128x128.png"
};

let extensionIconToggle = false;

chrome.action.onClicked.addListener((tab) => {
    extensionIconToggle = !extensionIconToggle;
    
    let iconPath;
    if (extensionIconToggle) {
        iconPath = extensionIconToggleOn
        chrome.alarms.create("refresh", { periodInMinutes: 1 });

    } else {
        iconPath = extensionIconToggleOff
        chrome.alarms.clear("refresh")
    }

    chrome.action.setIcon({path:iconPath})
});

//
// sets the listeners
//

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "refresh") {
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, (tabs) => {
                console.log(tabs.length)
                chrome.tabs.reload(tabs[0].id);
                console.log("refreshed");
        });
    }
});