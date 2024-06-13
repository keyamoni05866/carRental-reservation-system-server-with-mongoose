import config from "../config";
import AppError from "../errors/AppError";
import { USER_Role } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";
import { catchAsync } from "../modules/utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req, res, next) => {
    const header = req.headers.authorization;
    console.log("header", header);
    if (header && header.startsWith("Bearer")) {
      const token = header.split(" ")[1];
      console.log("token", token);

      const verifiedToken = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      );
      const { role, email } = verifiedToken as JwtPayload;

      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError(401, "User not Found");
      }

      if (!requiredRoles.includes(role)) {
        res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    next();
  });
};

export default auth;
