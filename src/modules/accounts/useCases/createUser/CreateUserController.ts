import { Request, Response} from 'express';
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {name, email, password, driver_licence} = request.body;

    const createUserCase = container.resolve(CreateUserUseCase);

    await createUserCase.execute({
      name, email, password, driver_licence
    });

    return response.status(201).send();
  }
}

export { CreateUserController }