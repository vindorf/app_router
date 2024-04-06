import registerUser from "../api/adduserapi";
import { redirect } from "next/navigation";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import Container from "../components/Container";
import ErrorBoundary from "../components/ErrorBoundary"

const submitHandler = async (formData: FormData) => {
  "use server";
  const pw = formData.get("password") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!pw || !email || !name) {
    //return { error: "Please fill in all fields" };
     //throw new Error('fill out')  
    redirect('/register_error')
    }

  if (pw.length < 8) {
    //return { error: "Password must be at least 8 characters" };
    redirect('/register_error')
  }
  if (!emailRegex.test(email)) {
    //redirect("/register");
    redirect('/register_error')
  }
  try {
    const res = await registerUser({
      name: name,
      email: email,
      password: pw,
    });
    console.log('RESPONSE',res)
  } catch (error) {
    console.log(error);
  }
  redirect("/login");
};

export default async function () {
  return (
    <>
      <Container label="Register">
        <form className="flex flex-col w-56 p-3 gap-3" action={submitHandler}>
          <ErrorBoundary>
            <CustomInput type="text" placeholder="Name" name="name" />
            <CustomInput
              type="text"
              placeholder="Valid email format"
              name="email"
            />
            <CustomInput
              type="password"
              placeholder="Password 8 char"
              name="password"
            />
          </ErrorBoundary>
          <CustomBtn type="submit" label="Register" />
        </form>
      </Container>
    </>
  );
}
