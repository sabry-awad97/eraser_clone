import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Header from './_components/Header';
import Hero from './_components/Hero';

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    console.log(user);
  }

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

export default Home;
