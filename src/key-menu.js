export function disableKeyAndMenu () {
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 123 || (e.shiftKey && e.ctrlKey && e.keyCode === 73)) {
            e.returnValue = false;
            return false;
        }
    });
    window.addEventListener('contextmenu', (e) => {
        e.returnValue = false;
        return false;
    });
}