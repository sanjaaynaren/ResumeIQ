import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Target,
  Users,
  Brain
} from "lucide-react";

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

interface AnalysisResultsProps {
  data: AnalysisData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const getFitColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getFitGradient = (percentage: number) => {
    if (percentage >= 80) return "from-success to-success/80";
    if (percentage >= 60) return "from-warning to-warning/80";
    return "from-destructive to-destructive/80";
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header Card */}
      <Card className="p-6 bg-gradient-primary border-0 text-white shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Analysis Complete</h2>
              <p className="text-white/90">{data.fileName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getFitColor(data.fitPercentage)}`}>
              {data.fitPercentage}%
            </div>
            <p className="text-white/80 text-sm">Fit Score</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Job Compatibility</span>
            <span className="font-medium">{data.fitPercentage}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getFitGradient(data.fitPercentage)} transition-all duration-1000 ease-out`}
              style={{ width: `${data.fitPercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Skills Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Matched Skills */}
        <Card className="p-6 shadow-card border-success/20">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-success">Matched Skills</h3>
              <p className="text-xs text-muted-foreground">{data.matchedSkills.length} skills found</p>
            </div>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {data.matchedSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="mr-2 mb-2 bg-success/10 text-success border-success/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="p-6 shadow-card border-warning/20">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-warning">Skill Gaps</h3>
              <p className="text-xs text-muted-foreground">{data.missingSkills.length} skills missing</p>
            </div>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {data.missingSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="mr-2 mb-2 bg-warning/10 text-warning border-warning/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Unique Skills */}
        <Card className="p-6 shadow-card border-primary/20">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Unique Skills</h3>
              <p className="text-xs text-muted-foreground">{data.uniqueSkills.length} additional skills</p>
            </div>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {data.uniqueSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="mr-2 mb-2 bg-primary/10 text-primary border-primary/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Assessment & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Assessment */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Overall Assessment</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{data.overallAssessment}</p>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {recommendation}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};