import { Button } from "@/components/ui/button";
import { Brain, FileCheck, TrendingUp, Users } from "lucide-react";

export const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse-glow">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Resume
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Screener
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Intelligent resume analysis powered by AI. Upload resumes, compare against job descriptions, 
            and get instant insights on candidate fit with detailed skill gap analysis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button variant="hero" size="lg" className="text-lg" onClick={scrollToUpload}>
            Start Screening Resumes
          </Button>
          <Button variant="outline-hero" size="lg" className="text-lg" onClick={scrollToUpload}>
            View Demo
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <FileCheck className="w-8 h-8 text-white mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Format Support</h3>
            <p className="text-white/80">Upload PDF, DOCX, or TXT resumes with intelligent content extraction</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-white mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Analysis</h3>
            <p className="text-white/80">AI-powered skill matching with detailed fit percentage calculations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Users className="w-8 h-8 text-white mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Detailed Reports</h3>
            <p className="text-white/80">Comprehensive candidate reports with skill gaps and recommendations</p>
          </div>
        </div>
      </div>
    </section>
  );
};