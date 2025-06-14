"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { 
  BarChart2, 
  GitPullRequest, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Code,
  Plus,
  ArrowRight,
  Clock,
  Zap
} from "lucide-react";
import { analyticsData, reviewHistory } from "@/lib/demo-data";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const totalReviews = analyticsData.reviewsByDay.reduce((sum, day) => sum + day.count, 0);
  const todayReviews = analyticsData.reviewsByDay[analyticsData.reviewsByDay.length - 1].count;
  const averageScore = analyticsData.averageScores.lastWeek;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your code reviews today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push('/dashboard/reviews/submit')}>
              <Plus className="mr-2 h-4 w-4" />
              New Review
            </Button>
            <Button variant="outline" onClick={() => router.push('/dashboard/reviews')}>
              View All Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You've completed <span className="font-medium text-foreground">{todayReviews} reviews</span> today, with an average score of <span className="font-medium text-foreground">{averageScore}%</span>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Total of <span className="font-medium text-foreground">{totalReviews} reviews</span> completed, helping improve code quality across <span className="font-medium text-foreground">3 repositories</span>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                Active PRs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have <span className="font-medium text-foreground">3 active reviews</span> pending, with <span className="font-medium text-foreground">2 high-priority</span> items.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.reviewsByDay.reduce((sum, day) => sum + day.count, 0)}</div>
            <p className="text-xs text-muted-foreground">
              +{analyticsData.reviewsByDay[analyticsData.reviewsByDay.length - 1].count} today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageScores.lastWeek}%</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(analyticsData.issuesByType).reduce((a, b) => a + b, 0)}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="destructive" className="h-5">
                <XCircle className="h-3 w-3 mr-1" />
                {analyticsData.issuesByType.security}
              </Badge>
              <Badge variant="default" className="h-5">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {analyticsData.issuesByType.performance}
              </Badge>
              <Badge variant="secondary" className="h-5">
                <Lightbulb className="h-3 w-3 mr-1" />
                {analyticsData.issuesByType.bestPractices}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reviews</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 PRs, 1 code review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest code reviews and pull request analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {item.type === "pull_request" ? (
                    <GitPullRequest className="h-5 w-5 text-primary" />
                  ) : (
                    <Code className="h-5 w-5 text-primary" />
                  )}
                  <div>
                    <div className="font-medium">
                      {item.type === "pull_request"
                        ? `Pull Request ${item.prNumber}`
                        : item.fileName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.type === "pull_request"
                        ? item.repository
                        : "Code Review"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={item.score >= 90 ? "default" : item.score >= 80 ? "secondary" : "destructive"}
                    className="h-6"
                  >
                    Score: {item.score}
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="destructive" className="h-6">
                      {item.issues.errors} errors
                    </Badge>
                    <Badge variant="default" className="h-6">
                      {item.issues.warnings} warnings
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(item.date, { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 