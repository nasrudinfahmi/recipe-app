import AboutSect from "../components/sections/home/AboutSect";
import ContactSect from "../components/sections/home/ContactsSect";
import HeroSect from "../components/sections/home/HeroSect";
import RecipeSect from "../components/sections/home/RecipeSect";

export default function Home() {
  return (
    <main className="padding-inline bg-orange-50/20">
      <HeroSect />
      <RecipeSect />
      <AboutSect />
      <ContactSect />
    </main>
  )
}
