import Generator from "../component/Generator";
import Header from "../component/Header";
import { MainContainer } from "./Styled";

const Main = () => {
  return (
    <MainContainer>
      <Header />
      <Generator />
    </MainContainer>
  );
};

export default Main;
