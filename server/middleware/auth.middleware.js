// import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';


const isLoggedIn = (req,res,next) => {
    try{
        const { token } = req.cookies;

        if(!token){
            return next(new AppError('Unauthenicated , please login again' , 401))
        }
        
        // console.log(token);
        // console.log("Rohan");
        const userDetails = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = userDetails;

        next();
        
    }catch(e){
        return next(
            new AppError(e.message , 505)
        )
    }
}



export default isLoggedIn;