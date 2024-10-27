import { PostgrestError } from "@supabase/supabase-js"

const ServerResponseType = {
  Success: "Success Response",
  Error: "Something won't wrong, please try again."
}

enum ServerResponseEnum {
  ERROR = "Error",
  SUCCESS = "Success"
}

function isError<T>(result: T) {
  return (<PostgrestError>result).code !== undefined && (<PostgrestError>result).hint !== undefined
}

export const ServerResponse = <T>(result?: T | PostgrestError, title?: string, message?: string) => {
  let type = isError(result) ? ServerResponseEnum.ERROR : ServerResponseEnum.SUCCESS

  return {
    type,
    title,
    message: message ?? ServerResponseType[type],
    result
  }
}