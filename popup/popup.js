const write = document.querySelector('h1');
const popUP = document.querySelector('.pop-up');
const theme = document.getElementById('theme');


theme.addEventListener('click', () => {
    popUP.classList.toggle('white');
});

let text = write.innerText;
let animation = [];

list = [
    'leetcode',
    'github',
];

let i = 0;
const SPEED = 10;
const INTERVAL = 2500;
const vowel = /^[aeiou]$/;

animate(list[i++]);
function animate(text) {
    text = text.toUpperCase();
    animation = [];
    write.classList.add('writing');

    if(vowel.test(text[0])){
    }

    let str = "";
    let count = 0;
    for (const char of text) {
        for (let i = 'A'.charCodeAt(0); i <= char.charCodeAt(0); ++i) {
            animation.push(str + String.fromCharCode(i));
        }
        str += char;
    }

    for (const str of animation) {
        setTimeout(() => {
            write.textContent = str;
        }, SPEED * count++);
    }

    //cursor will blink once the writing stop
    setTimeout(() => {
        write.classList.remove('writing');
    }, SPEED * count);

    setTimeout(() => {
        animate(list[i]);
        i = (i + 1) % list.length;
    }, SPEED * count + INTERVAL);

}