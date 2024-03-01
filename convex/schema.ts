import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }),
  teams: defineTable({
    teamName: v.string(),
    owner: v.string(),
  }),
  files: defineTable({
    fileName: v.string(),
    teamId: v.id('teams'),
    owner: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  }),
});
