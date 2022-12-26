const keys = {
    baseStore: ['app'],
    randomJoke() {
        return [...this.baseStore, 'random'];
    },
};

export default keys;
