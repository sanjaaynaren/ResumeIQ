import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FileUpload } from '@/components/FileUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { useToast } from '@/hooks/use-toast';

interface AnalysisData {
  fitPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  uniqueSkills: string[];
  overallAssessment: string;
  recommendations: string[];
  candidateName?: string;
  fileName: string;
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAnalysisData(null);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for analysis`,
    });
  };

  const handleJobDescriptionSubmit = async (description: string) => {
    if (!uploadedFile) {
      toast({
        title: "No resume uploaded",
        description: "Please upload a resume file first",
        variant: "destructive",
      });
      return;
    }

    setJobDescription(description);
    setIsAnalyzing(true);

    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      const mockAnalysisData: AnalysisData = {
        fitPercentage: 78,
        matchedSkills: [
          'JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 
          'RESTful APIs', 'Agile', 'Docker'
        ],
        missingSkills: [
          'Kubernetes', 'GraphQL', 'Redis', 'CI/CD', 'React Native'
        ],
        uniqueSkills: [
          'Python', 'Machine Learning', 'TensorFlow', 'Vue.js', 'PostgreSQL', 'Jenkins'
        ],
        overallAssessment: "This candidate demonstrates strong technical capabilities with excellent proficiency in core web development technologies. They have extensive experience in JavaScript, React, and Node.js, which aligns well with the job requirements. The candidate shows additional valuable skills in Python and Machine Learning that could bring extra value to the team.",
        recommendations: [
          "Consider for technical interview - strong match in core technologies",
          "Evaluate Machine Learning experience as potential added value",
          "Assess willingness to learn Kubernetes and GraphQL",
          "Strong cultural fit for Agile development environment",
          "Consider for senior-level position based on skill diversity"
        ],
        fileName: uploadedFile.name
      };

      setAnalysisData(mockAnalysisData);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Resume analyzed with ${mockAnalysisData.fitPercentage}% fit score`,
      });
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setJobDescription('');
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-12" id="upload-section">
        {!analysisData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1">
              <JobDescriptionInput
                onSubmit={handleJobDescriptionSubmit}
                isLoading={isAnalyzing}
              />
            </div>
            <div className="order-1 lg:order-2">
              <FileUpload
                onFileUpload={handleFileUpload}
                isLoading={isAnalyzing}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <AnalysisResults data={analysisData} />
            <div className="text-center">
              <button
                onClick={resetAnalysis}
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
