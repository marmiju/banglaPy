// Server Component
import ProblemPage from "@/app/components/clientPages/problem";
import { getProblem } from "@/utils/functions/GetProblem";

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
    const { id } = params;


  return <ProblemPage id={id} />;
};

export default Page;
