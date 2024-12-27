import CoreFeatures from "../components/how-it-works/CoreFeatures";
import EmpowerBussinuess from "../components/how-it-works/EmpowerBussinuess";
import Guide from "../components/how-it-works/Guide";
import SectionHeader from "../Layout/SectionHeader";

export default function HowItWorks() {
  return (
    <>
      <SectionHeader title={"How It Works"} />
      <EmpowerBussinuess />
      <CoreFeatures />
      <Guide />
    </>
  );
}
