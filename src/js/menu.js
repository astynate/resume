let state = false;

const changeMenuState = () => {
    state = !state;
    document.querySelector('.menu').id = state ? 'opened' : null;
}