'use server'

import { revalidatePath } from 'next/cache'
import { AuthError, createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

import { createUserSchema, loginSchema, signupSchema } from '@/validators/auth'
import { getServerActionError } from '@/utils/error'
import { serverApi } from '../supabase/serverApi'
import { getRoleByName } from '../supabase/roles'
import { updateProfileApi } from '../supabase/profiles'
import { CreateUserFormType, LoginFormType, RegisterFormType } from '../models/Auth'

export async function login(payload: LoginFormType) {
  const { error: ValidationError } = loginSchema.safeParse(payload)
  if (ValidationError) return getServerActionError(422, ValidationError.issues)

  const { error } = await serverApi().auth.signInWithPassword(payload)

  if (error) return getServerActionError(error.status, error as AuthError, error?.message)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(payload: RegisterFormType) {
  const { first_name, last_name } = payload;

  const { error: ValidationError } = signupSchema.safeParse(payload)
  if (ValidationError) return getServerActionError(422, ValidationError.issues)

  const { data, error } = await serverApi().auth.signUp({
    ...payload, options: {
      data: { first_name, last_name }
    }
  })

  if (error || !data?.user?.id) return getServerActionError(500, error as AuthError)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const { error } = await serverApi().auth.signOut();

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", 'layout')
  redirect("/")
}

export async function createUserWithRole(payload: CreateUserFormType) {
  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_KEY ?? "")

  const { first_name, last_name, email, password, role_id } = payload;

  const { error: ValidationError } = createUserSchema.safeParse(payload)
  if (ValidationError) return getServerActionError(422, ValidationError.issues)

  const { error, data } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name,
      last_name
    }
  })

  if (error) return getServerActionError(500, error)

  const result = await serverApi().from("profiles").update({ role_id: +role_id }).eq("id", data.user?.id)
  if (result?.error) return getServerActionError(500, result?.error)

  revalidatePath("/dashboard/users", 'layout')
}