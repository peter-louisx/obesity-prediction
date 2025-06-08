import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Predict Your Health
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Take Control Today
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI-powered obesity prediction tool analyzes your health
            metrics to provide an accurate risk assesment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#form"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Prediction <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
