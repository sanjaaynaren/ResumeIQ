import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, Sparkles } from "lucide-react";

interface JobDescriptionInputProps {
  onSubmit: (jobDescription: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const JobDescriptionInput = ({ onSubmit, isLoading = false, disabled = false }: JobDescriptionInputProps) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      onSubmit(jobDescription.trim());
    }
  };

  const sampleJobDescription = `We are looking for a Senior Full Stack Developer to join our growing team.

Key Requirements:
• 5+ years of experience in JavaScript, React, and Node.js
• Experience with TypeScript, MongoDB, and AWS
• Strong understanding of RESTful APIs and microservices
• Knowledge of Docker and Kubernetes
• Experience with Agile development methodologies
• Bachelor's degree in Computer Science or related field

Preferred Skills:
• Experience with GraphQL and Redis
• Knowledge of DevOps practices and CI/CD pipelines
• Familiarity with machine learning frameworks
• Experience with React Native for mobile development

We offer competitive salary, health benefits, and flexible work arrangements.`;

  const handleUseSample = () => {
    setJobDescription(sampleJobDescription);
  };

  return (
    <Card className="p-6 bg-gradient-secondary border border-border/50 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="job-description" className="text-lg font-semibold">
                Job Description
              </Label>
              <p className="text-sm text-muted-foreground">
                Paste the complete job description for accurate skill matching
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseSample}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Use Sample</span>
          </Button>
        </div>

        <div className="space-y-2">
          <Textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here...

Include key requirements, preferred skills, qualifications, and any specific technologies or frameworks mentioned in the job posting."
            className="min-h-[300px] resize-none bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
            disabled={disabled || isLoading}
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{jobDescription.length} characters</span>
            <span>Minimum 100 characters recommended</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!jobDescription.trim() || jobDescription.length < 50 || isLoading || disabled}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Analyzing Resume...
            </>
          ) : (
            'Analyze Resume Fit'
          )}
        </Button>
      </form>
    </Card>
  );
};