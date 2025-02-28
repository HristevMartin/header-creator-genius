
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-36 md:pt-40 px-4 md:px-6 container mx-auto">
        <section className="flex flex-col items-center justify-center min-h-[70vh]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 text-center mb-6">
            Discover extraordinary hotels
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-10 font-light">
            Handpicked luxury and boutique hotels for the discerning traveler
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-none hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide text-sm font-light">
            Explore Our Collection
          </button>
        </section>
      </main>
    </div>
  );
};

export default Index;
