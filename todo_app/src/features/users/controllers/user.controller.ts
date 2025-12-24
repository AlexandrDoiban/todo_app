import { Request, Response } from 'express';
import { CreateUserBody } from '../dto/user.dto';
import { createUserService } from '../services/user.service';

export const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email or Password absent' });
  }

  try {
    const user = await createUserService({ email, password });
    return res.status(201).json({ user });
  } catch (error: any) {
    console.log('error',error)
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};
