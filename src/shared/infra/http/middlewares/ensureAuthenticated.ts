import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

// import { SimpleConsoleLogger } from 'typeorm';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction){
  
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("Token missing", 401);
  }
  
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token, 
      '722d403f7619c1c277a7c2c8deb4ba40'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
  
    if (!user){
      throw new AppError("User dos not exists!", 401)
    }

    request.user = {
      id: user_id
    }

    return next();

  } catch (e) {
    throw new AppError(`Invalid token! ${e}`, 401)
  }
}