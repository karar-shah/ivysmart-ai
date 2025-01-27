import { auth, signIn } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>

      {session?.user ? (
        <div>
          <img src={session!.user!.image!} alt="User Avatar" />
        </div>
      ) : null}
    </>
  );
}
