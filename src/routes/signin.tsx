import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <section className="mx-auto w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#a48574]">
            Jewelry Studio
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2f2a27]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-[#6b5f59]">
            Sign in to access your account and favorites.
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label
              className="text-sm font-medium text-[#6b5f59]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-[#6b5f59]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-[#6b5f59]"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#a48574] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a48574]/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6b5f59]">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-[#a48574]">
            Create an account
          </Link>
        </div>
      </section>
    </main>
  );
}
