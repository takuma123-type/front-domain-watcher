import React, { useCallback } from "react";

export default function SignUp() {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

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
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm mb-2">
                  パスワード確認:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 text-lg border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border"
                />
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
}
