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
  let valid = ""

  if (!pw || !email || !name) {
    redirect(`/register/error_1`)
    
    }

  if (pw.length < 8) {
    redirect(`/register/error_2`)
  }
  if (!emailRegex.test(email)) {
    redirect(`/register/error_3`)
  }
  try {
    const res = await registerUser({
      name: name,
      email: email,
      password: pw,
    });
    if(res.status === 200) {
      valid = 'ok';
    }else if (res.status === 400) {
      valid = 'error';
    }
    
  } catch (error) {
    console.log(error);
  }
  
  if(valid === 'ok') {
    redirect('/login');
  }else if (valid === 'error') {
    redirect('/register/error_4') 
  }
};

export default async function () {
  return (
    <div className="m-44 mt-16">
      <Container 
      className='text-white'
      label="Register">
        <form className="flex flex-col items-center  w-56 p-3 gap-3" action={submitHandler}>
          <ErrorBoundary>
            <CustomInput type="text" placeholder="Name" name="name" />
            <CustomInput
              type="text"
              placeholder="Email"
              name="email"
            />
            <CustomInput
              type="password"
              placeholder="Password"
              name="password"
            />
          </ErrorBoundary>
          <CustomBtn 
          className='border-t w-full'
          type="submit" label="Register" />
        </form>
      </Container>
    </div>
  );
}
