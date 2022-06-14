let x = document.querySelector('a.passwordBTN')
let password = document.querySelector('.password')
let pdiv = document.querySelector('.passwordDIV')
let adiv = document.querySelector('.addDIV')

function hash(text) {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr   = text.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

x.addEventListener('click', () => {
    if(hash(password.value) == -122826213) {
        pdiv.classList.add('hidden')
        adiv.classList.remove('hidden')
    }
})