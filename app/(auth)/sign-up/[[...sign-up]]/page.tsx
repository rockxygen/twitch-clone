import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

const SignUpPage = () => {
    return ( 
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <SignUp />
            </Suspense>
        </div>
    );
}
 
export default SignUpPage;