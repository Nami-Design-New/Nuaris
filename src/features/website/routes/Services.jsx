import AdditionalServices from "../components/services/AdditionalServices";
import Benifits from "../components/services/Benifits";
import ServicesSection from "../components/services/ServicesSection";
import SectionHeader from "../Layout/SectionHeader";

export default function Services() {
  return (
    <>
      <SectionHeader title={"Services"} />
      <ServicesSection />
      <AdditionalServices />
      <Benifits />
    </>
  );
}
