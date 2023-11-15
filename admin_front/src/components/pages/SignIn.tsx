import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionsRepository } from "../../infrastructure/repositories/SessionsRepository";
import {
  InvalidParameterError,
  FailSignUpError
} from "../../infrastructure/repositories";
import {
  CreateSessionInput,
  CreateSessionUsecase,
} from "../../usecases/CreateSessionUsecase";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error_message, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const input = new CreateSessionInput({
        username: email,
        password: password,
      });
      const sessionRepository = new SessionsRepository();
      const usecase = new CreateSessionUsecase(input, sessionRepository);
      await usecase.create();
      navigate("/");
    } catch (error) {
      if (error instanceof InvalidParameterError) {
        setErrorMessage('EmailまたはPasswordが入力されていません');
      } else if (error instanceof FailSignUpError){
        setErrorMessage('sign upに失敗しました');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <section className="min-h-screen flex flex-col bg-blueGray-100">
        <div className="container mx-auto p-4 sm:p-8">
          <div className="rounded-lg shadow-lg p-8 sm:p-16">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Soeur管理者ログイン
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-2">
                  メールアドレス:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 text-lg border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm mb-2">
                  パスワード:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 text-lg border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4 mb-4">
                {error_message && (
                  <p className="text-red-500 text-center">
                    {error_message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-xl text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
