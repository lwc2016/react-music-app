const { promisify } = require("util");
const Validator = require("standard-validator");

module.exports = (rules) => {
    return async (ctx, next) => {
        const validator = new Validator(ctx.request.body, rules);
        const validate = promisify(validator.validate);
        try{
            await validate.call(validator);
            await next();
        }catch(error){
            ctx.body = {
                status: 400,
                errorMsg: error
            }
        }
    }
}