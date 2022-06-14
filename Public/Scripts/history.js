
let rows = document.getElementsByTagName('tr');
console.log(typeof rows)

Object.values(rows).forEach(row => {
    row.addEventListener('click', () => {
        console.log('added listener')
        toGame(row.id);
    });
});

function toGame(game) {
    console.log(game)
    let form = document.querySelector(`form#${game}`);
    form.submit();
};
