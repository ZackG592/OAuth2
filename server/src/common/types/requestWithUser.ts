import { Request } from "@nestjs/common"
import { User } from "@prisma/client"
import { SafeUserData } from "./safeUserData"


interface RequestWithUser extends Request {
    user:User
}

interface RequestWithSafeUserData extends Request {
    user:SafeUserData
}

export type {RequestWithUser,RequestWithSafeUserData}