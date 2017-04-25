export default function (err, req, res, next) {
    let { status =500, message = 'server eRRor'} = err;

    return res
        .status(status)
        .json({message})
};
