import Home1 from "./homes/home-1";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Home 1 || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Home1 />
    </>
  );
}
