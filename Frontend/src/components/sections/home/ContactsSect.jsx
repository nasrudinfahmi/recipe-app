import { Suspense } from "react";
import Subtitle from "../../elements/SubTitleSect";
import Title from "../../elements/TitleSect";
import Lottie from "lottie-react";
import ContactAnim from '../../../assets/imgs/contactAnimation.json'
import FormContact from '../../fragments/FormContact'

export default function ContactSect() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const [email] = e.target
    const message = e.target.children[1].innerHTML
    console.log({ email: email.value, message });
  }

  return (
    <section className="w-full min-h-screen mt-32 pb-12" id="contact">
      <Title>Kontak</Title>
      <Subtitle>Jangan Ragu Untuk Menghubungi Tim Kami, Kami Siap Membantu!</Subtitle>
      <div className="mt-10 flex items-center gap-5">
        <div className="hidden sm:block sm:w-1/2 self-start">
          <Suspense fallback={<h1>Loading ...</h1>}>
            <Lottie animationData={ContactAnim} loop={true} />
          </Suspense>
        </div>
        <FormContact handleSubmit={handleSubmit} />
      </div>
    </section>
  )
}