import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
  disabled?: boolean;
  accept?: Record<string, string[]>;
}

export const FileUpload = ({ onFileUpload, isLoading = false, disabled = false, accept }: FileUploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Use setTimeout to avoid state update during render
            setTimeout(() => onFileUpload(file), 0);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept || {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false,
    disabled: disabled || isLoading
  });

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-6 bg-gradient-secondary border border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Resume</h3>
          <p className="text-sm text-muted-foreground">
            Support for PDF, DOCX, and TXT files up to 10MB
          </p>
        </div>

        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
              isDragActive 
                ? "border-primary bg-primary/5 shadow-glow" 
                : "border-border hover:border-primary/50 hover:bg-muted/50",
              isLoading && "pointer-events-none opacity-50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              {isDragActive ? (
                <p className="text-lg font-medium text-primary">Drop the resume here...</p>
              ) : (
                <>
                  <p className="text-lg font-medium text-foreground">
                    Drag & drop a resume here, or{" "}
                    <span className="text-primary hover:underline">browse files</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOCX, TXT files supported
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {uploadProgress === 100 ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="text-foreground font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadProgress === 100 && (
              <Button
                variant="outline"
                onClick={removeFile}
                className="w-full"
              >
                Upload Different File
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};