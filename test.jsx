import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain at least 3 characters"),
  emailId: z.string().email("Please enter a valid email"),
  password: z.string().regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-primary tracking-wide">
              CODEXA
            </h1>

            <p className="text-base-content/70 mt-2">
              Master Data Structures & Algorithms
            </p>

            <h2 className="text-2xl font-bold mt-6">Create Your Account</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input {...register("firstName")}  type="text"  placeholder="Enter your name"  className="input input-bordered w-full" />

                {errors.firstName && ( <p className="text-error text-sm mt-1"> {errors.firstName.message} </p> )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input {...register("emailId")}  type="email"  placeholder="Enter your email"  className="input input-bordered w-full"  />

              {errors.emailId && ( <p className="text-error text-sm mt-1"> {errors.emailId.message}  </p>  )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input {...register("password")}  type="password"  placeholder="Enter password"  className="input input-bordered w-full" />

              {errors.password && ( <p className="text-error text-sm mt-1"> {errors.password.message} </p> )}
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full mt-4">Sign Up</button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <span className="text-primary cursor-pointer ml-1 hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;