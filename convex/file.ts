import { v } from 'convex/values';
import { Doc } from '../convex/_generated/dataModel';
import { mutation, query } from './_generated/server';

export const getFiles = query({
  args: { teamId: v.id('teams') },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query('files')
      .filter(q => q.eq(q.field('teamId'), args.teamId))
      .order('desc')
      .collect();

    return users;
  },
});

export const getFileById = query({
  args: {
    _id: v.id('files'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.id('teams'),
    owner: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('files', args);
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id('files'),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export type File = Doc<'files'>;
