import { v } from 'convex/values';
import { Doc } from '../convex/_generated/dataModel';
import { mutation, query } from './_generated/server';

export const getTeams = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const teams = await ctx.db
      .query('teams')
      .filter(q => q.eq(q.field('owner'), args.email))
      .collect();

    return teams;
  },
});

export const createTeam = mutation({
  args: { teamName: v.string(), owner: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('teams', args);
    return result;
  },
});

export type Team = Doc<'teams'>;
