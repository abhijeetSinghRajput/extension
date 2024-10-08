/*
    flow of the program.
    1. main(); observer consitneuously tracking entire page until it's not find the element
    2. main(); stop the observer of entire body
    3. get the languge change button and start a observer to track if user change the languges
    4. 

*/
const BASE_URL = 'https://leetcode.com/problems';
function getQuestionRoute() {
    const url = window.location.href;
    let route = '';
    if (url.startsWith(BASE_URL)) {
        const path = url.substring(BASE_URL.length);
        const segments = path.split('/');
        if (segments[1]) route = segments[1];
    }
    return route;
}
const languageExtension = {
    "C++": ".cpp",         // C++ source files
    "Java": ".java",       // Java source files
    "Python": ".py",       // Python source files
    "Python3": ".py",      // Python 3 source files (same as Python)
    "C#": ".cs",           // C# source files
    "JavaScript": ".js",   // JavaScript source files
    "TypeScript": ".ts",   // TypeScript source files
    "PHP": ".php",         // PHP source files
    "Swift": ".swift",     // Swift source files
    "Kotlin": ".kt",       // Kotlin source files
    "Dart": ".dart",       // Dart source files
    "Go": ".go",           // Go source files
    "Ruby": ".rb",         // Ruby source files
    "Scala": ".scala",     // Scala source files
    "Rust": ".rs",         // Rust source files
    "Racket": ".rkt",      // Racket source files
    "Erlang": ".erl",      // Erlang source files
    "Elixir": ".ex"        // Elixir source files
};
let observer = null;

// configration to observe every Change happen 
const config = {
    childList: true,        // Observe direct children additions/removals
    subtree: true,          // Observe all descendants
    characterData: true,    // Observe changes to text nodes
    attributes: true        // Observe changes to attributes
}

let submitBtn = null;
let descriptionTab = null;
let acceptedTab = null;
let descriptionBtn = null;
let i = 0;

function main() {
    submitBtn = getSubmitBtn();
    descriptionBtn = document.getElementById('description_tab');
    if (!submitBtn || !descriptionBtn) return;

    // go to description tab at least once to load the question description
    descriptionBtn.click();
    observer.disconnect();
    submitBtn.onclick = () => {
        // Start polling after button click
        pollForTabs();
    };


}

observer = new MutationObserver(main);
observer.observe(document.body, { childList: true, subtree: true });

function getSubmitBtn() {
    const btns = [...document.querySelectorAll('button[data-e2e-locator="console-submit-button"].font-medium.items-center.whitespace-nowrap.focus\\:outline-none.inline-flex.relative.select-none.rounded-none.px-3.py-1\\.5.bg-transparent.dark\\:bg-transparent.text-green-60.dark\\:text-green-60')];
    if (btns.length !== 1) return null;
    return btns[0];
}

function getDescriptionBtn() {
    const tab_btns = [...document.querySelectorAll('.flexlayout__tab_button_content')];
    for (const btn of tab_btns) {
        if (btn.textContent === 'DescriptionDescription') {
            return btn;
        }
    }
    return null;
}

function pollForTabs() {
    const interval = 500; // Check every 500ms
    const maxAttempts = 50; // Max number of attempts before giving up
    let attempts = 0;

    const intervalId = setInterval(() => {
        selectTabs();
        console.log('attemps: ', attempts, 'acceptedTab:', Boolean(acceptedTab), 'descriptionTab:', Boolean(descriptionTab));
        if (acceptedTab && descriptionTab) {
            clearInterval(intervalId);
            console.log('Tabs found.');
            isSubmissionAccepted();
            // run any function
        } else if (++attempts >= maxAttempts) {
            clearInterval(intervalId);
            console.log('Failed to find all tabs within the time limit.');
        }
    }, interval);
}

function selectTabs() {
    let tabs = [...document.querySelectorAll('.flexlayout__tab')];

    descriptionTab = null;
    acceptedTab = null;

    for (const tab of tabs) {
        if (/^\d+\. /.test(tab.textContent)) {
            descriptionTab = tab;
        } else if (tab.textContent.startsWith(' All Submissions')) {
            acceptedTab = tab;
        }
    }

}

function isSubmissionAccepted() {
    console.log(descriptionTab?.textContent, acceptedTab?.textContent);
    let container = acceptedTab.querySelector(".mx-auto.flex.w-full.max-w-\\[700px\\].flex-col.gap-4.px-4.py-3");
    const observer = new MutationObserver(() => {
        console.log(container);
    })
    observer.observe(container, { childList: true, subtree: true });
}
