'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  teamName: z.string().min(2, {
    message: 'Team name must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const TeamCreation = () => {
  const createTeam = useMutation(api.team.createTeam);
  const { user } = useKindeBrowserClient();
  const nextRouter = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
    },
  });

  const { teamName } = form.watch();

  const onSubmit = async (values: FormValues) => {
    if (!user?.email) return;

    const result = await createTeam({
      teamName: values.teamName,
      owner: user.email,
    });

    console.log(result);
    nextRouter.push('/dashboard');
    toast('Team created successfully !!!');
  };

  return (
    <div className="my-16 px-6 md:px-16">
      <Image
        src="/logo.png"
        alt="logo"
        width={200}
        height={200}
        style={{
          width: 'auto',
          height: 'auto',
        }}
      />

      <div className="mt-8 flex flex-col items-center">
        <h1 className="py-3 text-[40px] font-bold">
          What should we call your team?
        </h1>

        <p className="text-gray-500">
          You can always change this later from settings.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 w-[40%]">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">Team Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Team Name"
                      className="mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-9 w-full bg-blue-500 hover:bg-blue-600"
              disabled={!teamName.length}
            >
              Create Team
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TeamCreation;
