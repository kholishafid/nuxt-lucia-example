<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputErrorMsg from "@/components/input-error-msg.vue";
import { toast } from "@/components/ui/toast";
import { credentialsSchema } from "@/lib/schema";

const schema = toTypedSchema(credentialsSchema);

const { handleSubmit, meta, defineField, errors } = useForm({
  validationSchema: schema,
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const login = handleSubmit(async () => {
  const loadingToast = toast({
    open: true,
    title: "Please Wait...",
    description: "Authenticating...",
    variant: "default",
  });
  await $fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  }).catch((e) => {
    toast({
      title: "Oh no, something went wrong!",
      description: e.response._data.message,
      variant: "destructive",
    });
    loadingToast.dismiss();
    return;
  });
  await navigateTo("/");
  setTimeout(() => {
    loadingToast.dismiss();
  }, 300);
});
</script>

<template>
  <main class="w-screen h-screen grid place-items-center">
    <Card class="w-full max-w-sm border-none shadow-none">
      <form method="post" action="/api/login" @submit="login">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="text"
              required
              v-model="username"
              v-bind="usernameAttrs"
            />
            <InputErrorMsg name="username" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="********"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              v-bind="passwordAttrs"
            />
            <InputErrorMsg name="password" />
          </div>
        </CardContent>
        <CardFooter class="flex flex-col">
          <Button class="w-full" :disabled="!meta.touched || !meta.valid">
            Login
          </Button>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <NuxtLink href="/signup" class="underline text-blue-600">
              Sign up
            </NuxtLink>
          </div>
        </CardFooter>
      </form>
    </Card>
  </main>
</template>
