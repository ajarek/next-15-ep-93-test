import { HeroHeader } from '@/components/Header'
import HeroSection from '@/components/Hero-section'
import Features from '@/components/Features-1'
import CallToAction from '@/components/Call-to-action'
import FooterSection from '@/components/Footer'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'

const Home = async () => {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className='min-h-screen w-full flex flex-col '>
      <HeroHeader />
      <HeroSection />
      <Features />
      <CallToAction />
      <FooterSection />
    </div>
  )
}
export default Home
