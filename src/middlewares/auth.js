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

const userAuth = (req,res,next) => {

    const token = "xyz";

    const isUserAuthorised = token ==="xyz";

    if(!isUserAuthorised){

        res.status(401).send("User is unauthorised");
    }
    else{
        res.send("user is authorised");
    }
}


module.exports ={ adminAuth, userAuth}