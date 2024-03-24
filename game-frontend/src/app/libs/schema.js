import { z } from 'zod';

const zUsername = z.string().min(3, {message: "least 3"});
const zPositionName = z.enum(["city", "cityCrew"]);
const zPosition = z.object({
  row: z.number({message: "row is not a number"}),
  col: z.number({message: "col is not a number"}),
})
const zBudget = z.number()

export const zGamePostBody = z.object({
  username: zUsername,
})

export const zGameDeleteBody = z.object({
  username: zUsername,
})

export const zPlayGetBody = z.object({
  username: zUsername,
})

export const zPlayPostBody = z.object({
  username: zUsername,
  positionName: zPositionName,
  position: zPosition
})

export const zPlayDeleteBody = z.object({
  username: zUsername,
  positionName: zPositionName,
  position: zPosition
})

export const zInfoPostBody = z.object({
  username: zUsername,
  budget: zBudget,
  position: zPosition
})