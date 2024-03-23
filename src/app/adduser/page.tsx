import SubmitBtn from "@/app/components/SubmitBtn";
import registerUser from "../api/adduserapi";
import { redirect } from "next/navigation";
import CustomInput from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import Container from "../components/Container";


const submitHandler = async (formData: FormData) => {
  "use server";
  try {
    const res = await registerUser({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
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
        <CustomInput type="text" placeholder="Email" name="email"/>
        <CustomInput type="password" placeholder="Password" name="password"/>
        <CustomBtn type="submit" label="Register"/>
      </form>
      </Container>
    </>
  );
}
