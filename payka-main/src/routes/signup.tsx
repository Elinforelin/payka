import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Welcome!</h1>
          <Link to="/" className="text-sm text-[#a48574]">
            Close
          </Link>
        </div>

        <p className="text-sm text-[#6b5f59]">
          Let’s get started with a free Shopline account.
        </p>

        <div className="space-y-3">
          <input
            className="w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none"
            placeholder="Fullname"
          />
          <input
            className="w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none"
            placeholder="Password"
          />
        </div>

        <button className="rounded-full bg-[#a48574] px-6 py-3 text-sm font-semibold text-white">
          Sign Up
        </button>

        <div className="text-center text-xs text-[#6b5f59]">
          Or sign up with
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-full border border-[#eadfd7] px-4 py-2 text-sm">
            Apple
          </button>
          <button className="flex-1 rounded-full border border-[#eadfd7] px-4 py-2 text-sm">
            Google
          </button>
        </div>

        <p className="text-center text-xs text-[#6b5f59]">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-[#a48574]">
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}
