import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col min-h-screen">
        <div className="flex-grow flex-1">
          <section className="border-t border-gray-200 bg-gray-50">
            <MaxWidthWrapper className="py-20">
              <div>Hello</div>
            </MaxWidthWrapper>
          </section>
        </div>
      </main>
    </>
  );
}
