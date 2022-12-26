const endpoints = {
    /**
     * In most enterprise projects, this value would probably come from
     * an environment variable.
     */
    baseUri: 'https://official-joke-api.appspot.com',
    getRandom() {
        return `${this.baseUri}/random_joke`;
    },
};

export default endpoints;
