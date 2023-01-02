import { Blob, GetStartPage } from "../components";

export default function Home() {
  return (
    <div className="overflow-x-hidden h-screen relative">
      <Blob size={100} type="light"  fromX={-30} fromY={130} rotate={80} />
      <Blob size={130} type="light"  fromX={270} fromY={400} rotate={80} />
      <Blob size={85} type="dark"  fromX={85} fromY={550} rotate={80} />

      <GetStartPage />
    </div>
  );
}
