import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const shiftSchema = z.object({
    id: z.string(),
    employeeId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    // role: z.string(),
})

export type Shift = z.infer<typeof shiftSchema>