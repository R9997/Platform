import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["admin", "manager", "employee"]),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  permissions: z.array(z.string()).default([]),
})

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["planning", "active", "completed", "paused"]).default("planning"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  budget: z.number().positive().optional(),
  teamId: z.string().uuid().optional(),
})

export const taskSchema = z.object({
  title: z.string().min(3, "Task title must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "review", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  assigneeId: z.string().uuid().optional(),
  projectId: z.string().uuid(),
  dueDate: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
})

export const leadSchema = z.object({
  name: z.string().min(2, "Lead name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z
    .enum(["new", "contacted", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"])
    .default("new"),
  source: z.string().min(1, "Source is required"),
  value: z.number().positive().optional(),
  notes: z.string().optional(),
  assigneeId: z.string().uuid().optional(),
})

export const teamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  description: z.string().optional(),
})

export type UserInput = z.infer<typeof userSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type TaskInput = z.infer<typeof taskSchema>
export type LeadInput = z.infer<typeof leadSchema>
export type TeamInput = z.infer<typeof teamSchema>
