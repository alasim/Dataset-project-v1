import { Main } from "components/home/Main";
import { Tags } from "components/home/Tags";
import type { NextPage } from "next";



const Home: NextPage = () => {
  return (

    <div className="flex space-x-6">
      <Tags />
      <Main />
    </div>

  );
};

export default Home;
