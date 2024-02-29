import { v } from 'convex/values';
import { Doc } from '../convex/_generated/dataModel';
import { mutation, query } from './_generated/server';

export const getFiles = query({
  args: { teamId: v.id('teams') },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query('files')
      .filter(q => q.eq(q.field('teamId'), args.teamId))
      .collect();

    return users;
  },
});

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.id('teams'),
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('files', args);
  },
});

export type File = Doc<'files'>;
