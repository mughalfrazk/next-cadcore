import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please type a valid email.' }),
  password: z.string().min(8, { message: 'Password should be atleast 8 letters' }),
})

export const signupSchema = z.object({
  first_name: z.string().min(2, { message: 'First Name should be atleast 2 letters' }),
  last_name: z.string().min(2, { message: 'Last Name should be atleast 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password should be atleast 8 letters' }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export const legalNameSchema = z.object({
  first_name: z.string().min(2, { message: 'Name should be atleast 2 letters' }),
  last_name: z.string().min(2, { message: 'Name should be atleast 2 letters' }),
})
