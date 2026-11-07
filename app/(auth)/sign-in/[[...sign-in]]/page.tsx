import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

const SignInPage = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <SignIn />
            </Suspense>
        </div>
    );
}
 
export default SignInPage;