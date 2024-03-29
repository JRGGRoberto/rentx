import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe ("Authenticate User", () => {
  beforeEach(()=> {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user ", async () =>{
    const user: ICreateUserDTO = {
      driver_licence: "000123",
      email: "user@test.com",
      password: "123456",
      name: "Fulano"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should be not able to authenticate an noneexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "useraa@ttt.com",
        password: "password"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should to be able to authenticate with incorrect password", async () =>{
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_licence: "000123",
        email: "user@test.com",
        password: "123456",
        name: "Fulano"
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123456A"
      });
    }).rejects.toBeInstanceOf(AppError);


  });
});