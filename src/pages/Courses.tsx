
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center mb-12">Courses</h1>
          <p className="text-center text-apple-gray">
            Course listing page will be implemented in future iterations.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
