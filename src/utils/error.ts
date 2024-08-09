import { notifications } from "@mantine/notifications"
import { AuthError, PostgrestError } from "@supabase/supabase-js"
import { ZodIssue } from "zod"

import classes from './Notification.module.css';

export type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  message: string;
  body: AuthError | ZodIssue[] | PostgrestError | null
}

const ErrorMessage = {
  422: "Invalid inputs passed",
  500: "Something went wrong, please try again"
}

export const getServerActionError = (status: number = 500, body: AuthError | ZodIssue[] | PostgrestError, message: string = ErrorMessage[500]) => {
  const response: ErrorResponse = {
    type: "error",
    title: "",
    status,
    message,
    body: JSON.parse(JSON.stringify(body))
  }

  switch (status) {
    case 400:
      response.title = "Auth Error"
      break;
    case 422:
      response.title = "Validation Error"
      break;
    case 500:
    default:
      response.title = "Server Error"
      break;
  }

  return response
}

export const setValidationError = <T>(body: ZodIssue[], setFieldError: (a: string, b: string) => void) => {
  body.forEach((item) => {
    setFieldError(String(item.path[0]), item.message);
  });
}

export const notifyError = (error: ErrorResponse) => {
  notifications.show({
    color: "red",
    title: error?.title,
    message: error?.message,
    classNames: classes,
    position: "top-right"
  })
}