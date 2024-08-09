/*
    flow of the program.
    1. main(); observer consitneuously tracking entire page until it's not find the element
    2. main(); stop the observer of entire body
    3. get the languge change button and start a observer to track if user change the languges
    4. 

*/
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

// configration to observe every Change happen 
const config = {
    childList: true, // Observe direct children additions/removals
    subtree: true,   // Observe all descendants
    characterData: true, // Observe changes to text nodes
    attributes: true // Observe changes to attributes
}

// Global variable to store the observer
let observer;
function findLanguageBtn() {
    // Select buttons based on the given class
    const languageButtons = [...document.querySelectorAll(
        'button.focus\\:outline-none.inline-flex.bg-transparent.dark\\:bg-dark-transparent.text-text-secondary.dark\\:text-text-secondary.active\\:bg-transparent.dark\\:active\\:bg-dark-transparent.hover\\:bg-fill-secondary.dark\\:hover\\:bg-fill-secondary.px-1\\.5.py-0\\.5.text-sm.font-normal.group'
    )];

    // Search for the button with text matching the languageExtension
    for (const btn of languageButtons) {
        if (btn.textContent in languageExtension) {
            return btn;
        }
    }
    return null;
}
function findQuestionBody(){
    const elements = [...document.querySelectorAll("div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5")];
    if(elements.length === 0) return;
    for(const element of elements){
        if(element.children.length < 3) return null;
        const [title, btns, questionBody] = elements[0].children;
        const difficulty = determineDifficulty(btns.textContent)
        if(!difficulty) return null;
        return {
            title: title.textContent, 
            difficulty, 
            questionMarkup: questionBody.innerHTML,
        }
    }
    return null;

    function determineDifficulty(str) {
        // Define regular expressions for each difficulty level
        const regexMedium = /^Medium/;
        const regexEasy = /^Easy/;
        const regexHard = /^Hard/;
    
        // Check which substring the string starts with
        if (regexMedium.test(str)) return 'Medium';
        if (regexEasy.test(str)) return 'Easy';
        if (regexHard.test(str)) return 'Hard';
        return null; 
    }
}
function main() {
    const langBtn = findLanguageBtn();
    const questionBody = findQuestionBody();
    // Log the found button
    console.log(questionBody);
    console.log(langBtn);

    // Stop observing entire page is anything
    if (langBtn) {
        observer?.disconnect();

        // Optionally, start a new observer to watch changes in langBtn if needed
        observeLangBtn(langBtn);
    }
}

function observeDOMChanges(callback) {
    // Create a new MutationObserver
    observer = new MutationObserver((mutationsList) => {
        // Run the callback
        callback();
    });

    // Start observing the document body for all types of mutations
    observer.observe(document.body, config);
}

function observeLangBtn(langBtn) {
    // Create a new MutationObserver specifically for the langBtn
    const langBtnObserver = new MutationObserver(() => {
        // You can add specific logic to handle changes related to langBtn
        console.log('Changes detected in langBtn:', langBtn);
    });

    // Start observing the specific button for relevant mutations
    langBtnObserver.observe(langBtn, config);
}

// Start observing for changes
observeDOMChanges(main);


