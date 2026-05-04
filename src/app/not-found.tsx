import { Footer } from "@/components/Footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <div className="mb-auto w-full">
        
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-white">not found</p>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
