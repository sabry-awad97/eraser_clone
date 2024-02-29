import { v } from 'convex/values';
import { Doc } from '../convex/_generated/dataModel';
import { mutation, query } from './_generated/server';

export const getUsers = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .collect();

    return users;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('users', args);
  },
});

export type User = Doc<'users'>;
