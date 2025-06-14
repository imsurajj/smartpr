"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

// Mock data - replace with real data later
const reviews = [
  {
    id: 1,
    repo: "user/repo",
    prNumber: "123",
    status: "completed",
    issues: 5,
    suggestions: 3,
    reviewedAt: new Date(2024, 1, 15),
  },
  {
    id: 2,
    repo: "org/project",
    prNumber: "456",
    status: "in_progress",
    issues: 0,
    suggestions: 0,
    reviewedAt: new Date(2024, 1, 14),
  },
  // Add more mock reviews as needed
];

const statusColors = {
  completed: "success",
  in_progress: "warning",
  failed: "destructive",
} as const;

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Review History</h2>
        <p className="text-muted-foreground">
          View and manage your code review history.
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repository</TableHead>
              <TableHead>PR #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Suggestions</TableHead>
              <TableHead>Reviewed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.repo}</TableCell>
                <TableCell>{review.prNumber}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[review.status as keyof typeof statusColors]}>
                    {review.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{review.issues}</TableCell>
                <TableCell>{review.suggestions}</TableCell>
                <TableCell>
                  {formatDistanceToNow(review.reviewedAt, { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 