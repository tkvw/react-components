class Backend {
    constructor(services, options) {
        this.init(services, options);
        this.type = 'backend';
    }
    init(services, options) {
        this.services = services;
        this.options = options;
    }

    read(language, namespace, callback) {
        debugger;
    }
}
Backend.type = 'backend';
export default Backend;
