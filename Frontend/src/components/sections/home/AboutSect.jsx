import Subtitle from "../../elements/SubTitleSect";
import Title from "../../elements/TitleSect";
import { ABOUT_CONTENT } from "../../../utils/constant";

export default function AboutSect() {
  return (
    <section className='min-h-screen mt-32' id="about">
      <Title>Tentang</Title>
      <Subtitle>Komitmen Kami dalam Membagikan Kesenangan Memasak dan Makan</Subtitle>

      <div className="mt-12 grid md:grid-cols-2 gap-4 md:gap-8">
        {ABOUT_CONTENT.map(content => (
          <article key={content.title}>
            <h2 className="text-3xl leading-tight mb-3 pt-6 text-orange-900">{content.title}</h2>
            <p className="text-orange-950">{content.paragraph}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
