
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Image, Star, Award, Rocket, CheckCircle, Wand2 } from "lucide-react";
import { api } from "@/lib/api";
import { parseImageData } from "@/lib/utils";
import type { ImageRecord } from "@/types/api";

const inspirationArtworks = [{
  id: 1,
  title: "Innocence Under Siege",
  artist: "Waleed Ajmal",
  grade: "Grade IS2A",
  imageUrl: "https://i.ibb.co/Fk1fHsXF/0-0.jpg"
}, {
  id: 2,
  title: "Duty and Destruction",
  artist: "Shaheer Afzal",
  grade: "Grade IS2A",
  imageUrl: "https://i.ibb.co/m5JPMRGm/0-3-3.jpg"
}, {
  id: 3,
  title: "Honor in the Arena",
  artist: "Mansoor Ahmed Toor",
  grade: "Grade IS2A",
  imageUrl: "https://i.ibb.co/vv1LQqZw/0-1.jpg"
}];

const features = [{
  icon: <Image className="w-6 h-6 text-primary" />,
  title: "Showcase Your Art",
  description: "Share your creative work with the school community"
}, {
  icon: <Star className="w-6 h-6 text-primary" />,
  title: "Get Recognition",
  description: "Have your artwork featured in our curated gallery"
}, {
  icon: <Award className="w-6 h-6 text-primary" />,
  title: "Win Awards",
  description: "Outstanding artworks receive special recognition"
}, {
  icon: <Rocket className="w-6 h-6 text-primary" />,
  title: "Inspire Others",
  description: "Your art can inspire fellow students to create"
}];

const Index = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<ImageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "LGS JTI ART SUBMISSIONS";
  }, []);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await api.getImages('true'); // Only get approved submissions
        setSubmissions(data);
      } catch (error) {
        console.error('Failed to load submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSubmissions();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 -z-10" />
      
      {/* Hero Section */}
      <header className="relative z-10 px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Student Art Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and celebrate the artistic talent of our students through their creative expressions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/upload">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2" />
                Submit Your Artwork
              </Button>
            </Link>
            <a href="https://www.writecream.com/ai-image-generator-free-no-sign-up/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Wand2 className="mr-2" />
                Try AI Art Generator
              </Button>
            </a>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-16 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Submit Your Art?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="glass p-6 rounded-xl text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Inspirational Artwork</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inspirationArtworks.map((artwork, index) => <motion.div key={artwork.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="group relative" onMouseEnter={() => setHoveredId(artwork.id)} onMouseLeave={() => setHoveredId(null)}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={artwork.imageUrl} alt={artwork.title} className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${hoveredId === artwork.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-sm text-primary mb-2">{artwork.grade}</p>
                      <h3 className="text-xl font-semibold text-white mb-1">{artwork.title}</h3>
                      <p className="text-gray-300">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Recent Submissions Section */}
      <section className="relative z-10 px-6 py-16 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {submissions.map((submission, index) => {
              const details = parseImageData(submission.datefield);
              return (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={api.getImageById(submission.id)}
                      alt={details.title}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <p className="text-sm text-primary">{details.grade}</p>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{details.title}</h3>
                        <p className="text-gray-300">{details.studentName}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {submissions.length === 0 && !loading && (
            <div className="text-center text-gray-400 py-12">
              <p>No approved submissions yet. Be the first to submit your artwork!</p>
              <Link to="/upload" className="inline-block mt-4">
                <Button variant="outline">
                  <Plus className="mr-2" />
                  Submit Artwork
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
