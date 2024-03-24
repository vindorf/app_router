import registerUser from "../api/adduserapi";
import { redirect } from "next/navigation";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import Container from "../components/Container";


const submitHandler = async (formData: FormData) => {
  "use server";
  const pw = formData.get("password") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const emailRegex = /^\S+@\S+\.\S+$/;
  if(!pw||!email||!name) {
    return {error: 'Please fill in all fields'}
  }
  if(pw.length < 8) {
    return {error: 'Password must be at least 8 characters'}
  }
  if(!emailRegex.test(email)) {
    redirect("/register");
  }
  try {
    const res = await registerUser({
      name: name,
      email: email,
      password: pw,
    });
    console.log("USER", res.user);
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
        <CustomInput type="text" placeholder="Name" name="name"/>
        <CustomInput type="text" placeholder="Valid email format" name="email"/>
        <CustomInput type="password" placeholder="Password 8 char" name="password"/>
        <CustomBtn type="submit" label="Register"/>
      </form>
      </Container>
    </>
  );
}