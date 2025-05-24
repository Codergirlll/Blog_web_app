

exports.ErrorHandling = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const success = String(statusCode).startsWith('2');

    console.log("Error: ", err.message);

    res.status(statusCode).json({
        success,
        message: 'Internal Server Error',
    });
}