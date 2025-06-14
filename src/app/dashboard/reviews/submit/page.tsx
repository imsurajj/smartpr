"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { githubService } from "@/lib/github";
import { Badge } from "@/components/ui/badge";
import { Loader2, GitPullRequest, Code, AlertCircle, CheckCircle, BarChart, ArrowDown, Copy, AlertTriangle, Lightbulb, Zap, Shield, FileText, FileCode, BarChart2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateReview } from "@/lib/demo-data";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SubmitReviewPage() {
  const [prUrl, setPrUrl] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState<"quick" | "thorough" | "security">("quick");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [prFiles, setPrFiles] = useState<Array<any>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of textarea when code changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [code]);

  // Auto scroll to results when they're ready
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  // Loading progress simulation
  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [isLoading]);

  const handlePrSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setPrFiles([]);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Demo PR review data
      const demoFiles = [
        { filename: "src/components/Button.tsx", content: "// Demo content", patch: "Demo patch" },
        { filename: "src/utils/helpers.ts", content: "// Demo content", patch: "Demo patch" }
      ];
      
      setPrFiles(demoFiles);
      
      const reviews = demoFiles.map(file => ({
        filename: file.filename,
        review: generateReview(file.content, reviewMode)
      }));

      setResult({
        type: 'pr',
        reviews,
        summary: generatePrSummary(reviews),
      });
    } catch (err) {
      setError("Failed to analyze pull request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code.trim()) {
      setError("Please enter some code to review");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reviewResult = generateReview(code, reviewMode);
      setResult({
        type: 'code',
        review: reviewResult,
      });
    } catch (err) {
      setError("Failed to analyze code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePrSummary = (reviews: any[]) => {
    const totalIssues = reviews.reduce((sum, r) => sum + r.review.issues.length, 0);
    const avgScore = reviews.reduce((sum, r) => sum + r.review.score, 0) / reviews.length;
    return {
      totalFiles: reviews.length,
      totalIssues,
      avgScore: Math.round(avgScore),
    };
  };

  const renderMetrics = (review: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(review.metrics).map(([key, value]: [string, any]) => (
          <Card key={key} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm capitalize flex items-center gap-2">
                {key === "complexity" && <Code className="h-4 w-4" />}
                {key === "maintainability" && <GitPullRequest className="h-4 w-4" />}
                {key === "testCoverage" && <CheckCircle className="h-4 w-4" />}
                {key === "duplicateCode" && <Copy className="h-4 w-4" />}
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold">{value}%</div>
                <div className="text-xs text-muted-foreground pb-1">
                  {value >= 90 ? "Excellent" : value >= 80 ? "Good" : value >= 70 ? "Fair" : "Needs Improvement"}
                </div>
              </div>
              <Progress value={value} className="h-2 mt-2" />
            </CardContent>
            <div 
              className={cn(
                "absolute bottom-0 left-0 h-1 w-full",
                value >= 90 ? "bg-green-500" : 
                value >= 80 ? "bg-blue-500" : 
                value >= 70 ? "bg-yellow-500" : 
                "bg-red-500"
              )} 
            />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Metric Explanations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Complexity:</span> Measures code complexity using metrics like cyclomatic complexity and nesting levels.
            </div>
            <div>
              <span className="font-medium">Maintainability:</span> Evaluates how easy the code is to maintain based on structure, documentation, and patterns.
            </div>
            <div>
              <span className="font-medium">Test Coverage:</span> Percentage of code covered by tests, including unit and integration tests.
            </div>
            <div>
              <span className="font-medium">Duplicate Code:</span> Percentage of repeated code patterns that could be refactored.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="font-medium">Errors:</span> {review.issues.filter((i: any) => i.severity === "error").length}
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Warnings:</span> {review.issues.filter((i: any) => i.severity === "warning").length}
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Suggestions:</span> {review.issues.filter((i: any) => i.severity === "suggestion").length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderIssues = (issues: any[]) => (
    <div className="space-y-4">
      {issues.map((issue: any, index: number) => (
        <Card key={index} className={cn(
          "border-l-4",
          issue.severity === "error" ? "border-l-destructive" :
          issue.severity === "warning" ? "border-l-yellow-500" :
          "border-l-blue-500"
        )}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    issue.severity === "error" ? "destructive" :
                    issue.severity === "warning" ? "default" :
                    "secondary"
                  }
                  className="capitalize"
                >
                  {issue.severity}
                </Badge>
                <span className="font-medium">{issue.type}</span>
              </div>
              {issue.line && (
                <Badge variant="outline" className="text-xs">
                  Line {issue.line}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{issue.description}</p>
            {issue.suggestions && (
              <div className="pl-4 border-l-2 border-muted space-y-2">
                <p className="text-sm font-medium">Suggested Fixes:</p>
                <ul className="list-disc list-inside space-y-1">
                  {issue.suggestions.map((suggestion: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {issue.codeExample && (
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-xs overflow-x-auto">
                  <code>{issue.codeExample}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSuggestions = (review: any) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            Performance Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {review.suggestions.performance.map((suggestion: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {review.suggestions.security.map((suggestion: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {review.suggestions.bestPractices.map((suggestion: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Demo Mode Tag */}
      <span className="inline-block mb-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold">Demo Mode: Using Sample Data</span>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Submit Code Review</h2>
        <p className="text-muted-foreground">
          Submit your code or pull request for AI-powered review.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-2">
          <Select value={reviewMode} onValueChange={(value: any) => setReviewMode(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select review mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick">Quick Review</SelectItem>
              <SelectItem value="thorough">Thorough Analysis</SelectItem>
              <SelectItem value="security">Security Audit</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {reviewMode === "quick" && "Fast overview of code quality"}
            {reviewMode === "thorough" && "Detailed analysis with best practices"}
            {reviewMode === "security" && "Focus on security vulnerabilities"}
          </p>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="code" className="space-y-4">
            <TabsList className="flex gap-2">
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary"
              >
                <Code className="h-4 w-4" />
                Code Review
              </TabsTrigger>
              <TabsTrigger
                value="pr"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary"
              >
                <GitPullRequest className="h-4 w-4" />
                Pull Request
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Review
                  </CardTitle>
                  <CardDescription>
                    Paste your code below for instant analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCodeSubmit} className="space-y-3">
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        placeholder="Paste your code here..."
                        className="font-mono h-[160px] resize-none border-border focus:ring-0 focus:border-border bg-gray-50/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {code.split('\n').length} lines
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !code.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          Analyze Code
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pr" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pull Request Review</CardTitle>
                  <CardDescription>
                    Enter a GitHub pull request URL for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="https://github.com/owner/repo/pull/123"
                      value={prUrl}
                      onChange={(e) => setPrUrl(e.target.value)}
                    />
                    <Button
                      className="w-full"
                      onClick={handlePrSubmit}
                      disabled={isLoading || !prUrl.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing PR...
                        </>
                      ) : (
                        "Analyze Pull Request"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {isLoading && (
          <Card>
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p>Analyzing your code...</p>
                </div>
                <Progress value={loadingProgress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">
                  {loadingProgress < 30 && "Parsing code structure..."}
                  {loadingProgress >= 30 && loadingProgress < 60 && "Running analysis..."}
                  {loadingProgress >= 60 && loadingProgress < 90 && "Generating suggestions..."}
                  {loadingProgress >= 90 && "Finalizing results..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/15 text-destructive p-4 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Results</CardTitle>
                  <Badge
                    variant={
                      result.type === "pr"
                        ? result.summary.avgScore >= 90
                          ? "default"
                          : result.summary.avgScore >= 80
                          ? "secondary"
                          : "destructive"
                        : result.review.score >= 90
                        ? "default"
                        : result.review.score >= 80
                        ? "secondary"
                        : "destructive"
                    }
                    className="h-6"
                  >
                    Score:{" "}
                    {result.type === "pr"
                      ? result.summary.avgScore
                      : result.review.score}
                    %
                  </Badge>
                </div>
                <CardDescription>
                  {result.type === "pr"
                    ? `Analyzed ${result.summary.totalFiles} files and found ${result.summary.totalIssues} issues`
                    : result.review.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {result.type === "code" && (
                  <>
                    {renderMetrics(result.review)}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Issues Found</h3>
                      {renderIssues(result.review.issues)}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
                      {renderSuggestions(result.review)}
                    </div>
                  </>
                )}

                {result.type === "pr" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Pull Request Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="font-medium">Files Changed:</span> {result.reviews.length}
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-destructive" />
                            <span className="font-medium">Total Issues:</span> {result.summary.totalIssues}
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-primary" />
                            <span className="font-medium">Average Score:</span> {result.summary.avgScore}%
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Impact Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm">
                              This PR has a <span className="font-medium">{
                                result.summary.avgScore >= 90 ? "low" :
                                result.summary.avgScore >= 80 ? "moderate" :
                                "high"
                              } risk factor</span> based on:
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li>Number of files changed</li>
                              <li>Complexity of changes</li>
                              <li>Security implications</li>
                              <li>Test coverage</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {result.reviews.map((fileReview: any, index: number) => (
                      <div key={index} className="space-y-6 pt-6 border-t first:border-t-0 first:pt-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileCode className="h-5 w-5" />
                            {fileReview.filename}
                          </h3>
                          <Badge
                            variant={
                              fileReview.review.score >= 90 ? "default" :
                              fileReview.review.score >= 80 ? "secondary" :
                              "destructive"
                            }
                            className="h-6"
                          >
                            Score: {fileReview.review.score}%
                          </Badge>
                        </div>
                        {renderMetrics(fileReview.review)}
                        <div className="space-y-4">
                          <h4 className="font-medium">Issues Found</h4>
                          {renderIssues(fileReview.review.issues)}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium">Improvement Suggestions</h4>
                          {renderSuggestions(fileReview.review)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
} 