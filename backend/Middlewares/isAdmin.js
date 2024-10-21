export default async function isAdmin (req, res, next){
    if (req.userDetails.userType === "organisation"){
        console.log("yaha hu", req.userDetails.userType)
        req.isadmin = true

    }
    else{
        req.isadmin = false
    }

    next()
}