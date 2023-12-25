import React, { Suspense } from "react";
import RegisterForm from "@/components/post/register/RegisterForm";

function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}

export default RegisterPage;