const ids = {
    baseId: 'gnar-app',
    footer() {
        return `${this.baseId}-content-info`;
    },
    joke(jokeId) {
        return `${this.baseId}-joke-${jokeId}`;
    },
    mainContent() {
        return `${this.baseId}-main-content`;
    },
    skipLink() {
        return `${this.baseId}-skip-nav`;
    },
    refetchButton() {
        return `${this.baseId}-refetch`;
    },
};

export default ids;
