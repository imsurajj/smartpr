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
import { BarChart2, GitPullRequest, AlertCircle, Lightbulb } from "lucide-react";

// Mock data - replace with real data later
const metrics = {
  totalReviews: 125,
  activeReviews: 3,
  totalIssues: 450,
  totalSuggestions: 275,
};

const recentActivity = [
  {
    id: 1,
    type: "review_completed",
    repo: "user/repo",
    prNumber: "123",
    timestamp: new Date(2024, 1, 15, 14, 30),
    details: "Found 5 issues and 3 suggestions",
  },
  {
    id: 2,
    type: "review_started",
    repo: "org/project",
    prNumber: "456",
    timestamp: new Date(2024, 1, 15, 13, 45),
    details: "Review in progress",
  },
  {
    id: 3,
    type: "issue_fixed",
    repo: "user/repo",
    prNumber: "122",
    timestamp: new Date(2024, 1, 15, 12, 15),
    details: "Security vulnerability fixed",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your code reviews.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              Pull requests reviewed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reviews</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeReviews}</div>
            <p className="text-xs text-muted-foreground">
              Reviews in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Found</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              Across all reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suggestions</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalSuggestions}</div>
            <p className="text-xs text-muted-foreground">
              Improvement ideas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest code review activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.repo} #{activity.prNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      activity.type === "review_completed"
                        ? "success"
                        : activity.type === "review_started"
                        ? "warning"
                        : "default"
                    }
                  >
                    {activity.type.replace("_", " ")}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Activity</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 