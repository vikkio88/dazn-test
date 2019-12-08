export const cache = {
    driver() {
        if (window && window.localStorage) return window.localStorage;

        return {};
    },

    get(key) {
        const item = this.driver().getItem(key);
        return JSON.parse(item);
    },

    set(key, value) {
        this.driver().setItem(key, JSON.stringify(value));
    },

    forget(key) {
        this.driver().removeItem(key);
    }
}