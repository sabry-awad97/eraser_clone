import dynamic, { DynamicOptionsLoadingProps } from 'next/dynamic';
import { PropsWithChildren } from 'react';

interface Props extends NonNullable<PropsWithChildren> {
  LoadingComponent?: (
    loadingProps: DynamicOptionsLoadingProps,
  ) => JSX.Element | null;
}

const NoSSR = ({ children }: NonNullable<PropsWithChildren>) => children;

const DynamicNoSSR = ({ children, LoadingComponent }: Props) => {
  const DynamicNoSSRWithLoading = dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
    loading: LoadingComponent,
  });

  return <DynamicNoSSRWithLoading>{children}</DynamicNoSSRWithLoading>;
};

export default DynamicNoSSR;
