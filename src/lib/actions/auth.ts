'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { LoginFormType, RegisterFormType } from '../models/Auth'
import { loginSchema, signupSchema } from '@/validators/auth'
import { updateProfileApi } from '../supabase/profiles'
import { getServerActionError } from '@/utils/error'
import { AuthError, PostgrestError } from '@supabase/supabase-js'

export async function login(payload: LoginFormType) {
  const { email, password } = payload;

  const { error: ValidationError } = loginSchema.safeParse({
    email, password
  })

  if (ValidationError) return getServerActionError(422, ValidationError.issues)


  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword(payload)

  if (error) return getServerActionError(error.status, error as AuthError, error?.message)

  revalidatePath('/', 'layout')
  redirect('/private')
}

export async function signup(payload: RegisterFormType) {
  const { first_name, last_name, email, password } = payload;

  const { error: ValidationError } = signupSchema.safeParse({
    first_name, last_name, email, password
  })

  if (ValidationError) return getServerActionError(422, ValidationError.issues)

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    ...payload, options: {
      data: { first_name, last_name }
    }
  })

  if (error || !data?.user?.id) return getServerActionError(500, error as AuthError)

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", 'layout')
  redirect("/")
}