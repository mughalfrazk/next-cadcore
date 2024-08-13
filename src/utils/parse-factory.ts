import { z } from 'zod'

/**
 * Common zod parser for capturing and logging parse errors
 * https://github.com/colinhacks/zod/issues/105
 */
export const parseFactory =
  <T extends z.ZodTypeAny>(schema: T, name: string, skipLog?: boolean) =>
    (data: unknown): z.infer<T> => {
      if (!skipLog) {
        console.debug(`Parsing schema ${name}`)
      }
      try {
        return schema.parse(data)
      } catch (err) {
        console.error(err)
        throw err
      }
    }
