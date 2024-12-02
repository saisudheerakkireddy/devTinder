const adminAuth = (req,res,next) => {

    const token = 'xyz';

    const adminAuthorised = token === 'xyz';

    if(!adminAuthorised){

        res.status(401).send("not authorised");
    }

    else{
    //     res.send("Authorised");
        next();
    }




}


module.exports ={ adminAuth}