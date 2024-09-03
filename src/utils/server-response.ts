const ServerResponseType = {
  Success: "Success Response",
  Error: "Something won't wrong, please try again."
}

export const ServerResponse = <T>(type: keyof typeof ServerResponseType, result?: T, title?: string, message?: string) => {
  return { type, title, message: message ?? ServerResponseType[type], result }
}