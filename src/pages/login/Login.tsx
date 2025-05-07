import React, { useState } from "react";
import { TextInput, PasswordInput, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import useAuth from "@/utils/hooks/useAuth";
import Button from "@/components/Button";

const Login = () => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      username: "emilys",
      password: "emilyspass",
    },
    validate: {
      username: (value) =>
        value.trim().length === 0 ? "Required" : null,
      password: (value) =>
        value.length < 6 ? "At least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    try {
      const result = await signIn(values);
      const status = result?.status;
      toast[status === "success" ? "success" : "error"](result?.message);
    } catch (error) {
      toast.error("Something went wrong, please try later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        className="hidden lg:flex text-white py-8"
        sx={{
          backgroundImage: `url('/images/login-side-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flex: 1,
        }}
      >
        <div className="px-4 xl:px-20 flex flex-col justify-between">
          <div>
            <img
              src="/images/script-assist.png"
              alt="Script Assist"
              width={150}
            />
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <div className="inline-block border-2 border-white rounded-full overflow-hidden">
                <img src="/images/ben.png" width={50} alt="Image with Border" />
              </div>
              <div className="flex flex-col">
                <h5 className="text-md font-medium">Ben Hamburger</h5>
                <h5 className="text-sm">CTO, Onward</h5>
              </div>
            </div>
            <p className="text-xl mt-3">
              Streamline your medical cannabis prescribing with our intuitive,
              secure, and fully integrated platform.
            </p>
          </div>
          <div>
            <p className="text-[16px]">
              Copyright © {new Date().getFullYear()} Script Assist.
            </p>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          flex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, padding: 24 }}>
          <h3>Welcome back!</h3>
          <h5 className="text-[16px]">
            Please enter your credentials to login.
          </h5>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
              styles={{
                input: {
                  backgroundColor: "transparent",
                },
              }}
              required
              error={form.errors.username}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
              required
              className="mt-4"
              error={form.errors.password}
            />
            <Group position="right" mt="md" className="mt-8">
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in" : "Login"}
              </Button>
            </Group>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
