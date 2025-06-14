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
import { reviewHistory } from "@/lib/demo-data";

const statusColors = {
  completed: "secondary",
  in_progress: "default",
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
              <TableHead>Type</TableHead>
              <TableHead>Repository / File</TableHead>
              <TableHead>PR #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Reviewed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewHistory.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.type === 'pull_request' ? 'Pull Request' : 'Code Review'}
                </TableCell>
                <TableCell>
                  {review.type === 'pull_request' ? review.repository : review.fileName}
                </TableCell>
                <TableCell>
                  {review.type === 'pull_request' ? review.prNumber : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[review.status as keyof typeof statusColors] || 'default'}>
                    {review.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{review.score}</TableCell>
                <TableCell>
                  {review.issues.errors + review.issues.warnings + review.issues.suggestions}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(review.date, { addSuffix: true })}
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