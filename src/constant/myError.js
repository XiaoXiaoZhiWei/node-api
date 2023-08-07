class MyError extends Error {
    constructor({code, message, result}) {
        super(message)
        console.log(`code=${code}`);
        this.code = code 
        this.message = message
        this.result = result
        this.name = 'MyError'
    }
}

module.exports = MyError;