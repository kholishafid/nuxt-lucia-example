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
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "~/components/ui/toast";
import { credentialsSchema } from "~/lib/schema";

const schema = toTypedSchema(credentialsSchema);

const { errors, defineField, meta } = useForm({
  validationSchema: schema,
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const { toast } = useToast();

async function signup(e: Event) {
  const loadingToast = toast({
    open: true,
    title: "Please Wait...",
    description: "Creating user",
    variant: "default",
  });
  await $fetch("/api/signup", {
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
}
</script>

<template>
  <main class="w-screen h-screen grid place-items-center">
    <Card class="w-full max-w-sm border-none shadow-none">
      <form @submit.prevent="signup">
        <CardHeader>
          <CardTitle class="text-2xl"> Sign up </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              autocomplete="username"
              v-model="username"
              v-bind="usernameAttrs"
              required
            />
            <small class="text-rose-500">{{ errors.username }}</small>
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              placeholder="******"
              type="password"
              name="password"
              autocomplete="new-password"
              v-model="password"
              v-bind="passwordAttrs"
              required
            />
            <small class="text-rose-500">{{ errors.password }}</small>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col">
          <Button
            class="w-full"
            type="submit"
            :disabled="!meta.touched || !meta.valid"
          >
            Create an account
          </Button>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <NuxtLink href="/signin" class="underline text-blue-600">
              Sign in
            </NuxtLink>
          </div>
        </CardFooter>
      </form>
    </Card>
  </main>
</template>
