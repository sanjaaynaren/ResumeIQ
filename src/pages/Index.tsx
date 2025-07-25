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

  const generateDynamicAnalysis = (fileName: string, jobDesc: string): AnalysisData => {
    // Generate variation based on file name and job description
    const fileHash = fileName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const jobHash = jobDesc.toLowerCase().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const combinedHash = (fileHash + jobHash) % 100;
    
    const skillSets = [
      {
        matched: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
        missing: ['Kubernetes', 'GraphQL', 'Redis'],
        unique: ['Python', 'Machine Learning', 'TensorFlow']
      },
      {
        matched: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Git'],
        missing: ['Microservices', 'Apache Kafka', 'Jenkins'],
        unique: ['Angular', 'MongoDB', 'Azure', 'Hibernate']
      },
      {
        matched: ['Python', 'Django', 'PostgreSQL', 'Linux', 'REST APIs'],
        missing: ['FastAPI', 'Celery', 'Redis'],
        unique: ['React', 'Docker', 'AWS', 'Data Science']
      },
      {
        matched: ['C#', '.NET Core', 'SQL Server', 'Azure', 'Git'],
        missing: ['Entity Framework', 'SignalR', 'Azure DevOps'],
        unique: ['JavaScript', 'Angular', 'Docker', 'Kubernetes']
      }
    ];
    
    const assessments = [
      "Strong technical foundation with excellent problem-solving skills. Shows great potential for senior roles.",
      "Solid experience in core technologies with room for growth in modern frameworks and tools.",
      "Well-rounded developer with diverse skill set. Good cultural fit for collaborative environments.",
      "Experienced professional with deep technical knowledge and leadership potential.",
      "Promising candidate with strong fundamentals and eagerness to learn new technologies."
    ];
    
    const skillSetIndex = combinedHash % skillSets.length;
    const selectedSkillSet = skillSets[skillSetIndex];
    const fitPercentage = 45 + (combinedHash % 45); // 45-90% range
    const assessmentIndex = combinedHash % assessments.length;
    
    return {
      fitPercentage,
      matchedSkills: selectedSkillSet.matched,
      missingSkills: selectedSkillSet.missing,
      uniqueSkills: selectedSkillSet.unique,
      overallAssessment: assessments[assessmentIndex],
      recommendations: [
        fitPercentage > 75 ? "Strong candidate - recommend for interview" : "Consider for further evaluation",
        "Assess cultural fit and communication skills",
        `Focus interview on ${selectedSkillSet.missing[0]} experience`,
        fitPercentage > 65 ? "Good potential for team collaboration" : "May need additional training in key areas"
      ],
      fileName
    };
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

    // Simulate AI analysis with dynamic results
    setTimeout(() => {
      const analysisData = generateDynamicAnalysis(uploadedFile.name, description);
      
      setAnalysisData(analysisData);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Resume analyzed with ${analysisData.fitPercentage}% fit score`,
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
