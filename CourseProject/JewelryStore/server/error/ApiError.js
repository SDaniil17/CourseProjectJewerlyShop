class ApiError extends Error{
    constructor(status, message){
        super();
        this.status=status
        this.message=message
    }_

    static BadRequest (message){
        return new ApiError(404,message)
    }
}

module.exports= ApiError