import { About1, About2 } from "@/components/About";
import { CounterSection1 } from "@/components/CounterSection";
import { Cta2, Cta5 } from "@/components/Cta";

import PageBanner from "@/components/PageBanner";
import { Team1 } from "@/components/Team";
// import { Team2 } from "@/components/Team";
import DanboxLayout from "@/layout/DanboxLayout";

const AboutPage = () => {
  return (
    <DanboxLayout>
      <PageBanner pageName="About Us" />
      <About1 />
      {/* <Cta5 /> */}
      {/* <About2 containerClass="section-padding pb-0" /> */}
      {/* <CounterSection1 /> */}
      {/* <Team /> */}
      {/* <Gallery1 /> */}
      {/* <Cta2 /> */}
    </DanboxLayout>
  );
};

export default AboutPage;
