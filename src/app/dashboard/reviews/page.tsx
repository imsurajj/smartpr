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
  rejected: "destructive",
  declined: "destructive",
} as const;

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Review History</h2>
        <p className="text-sm text-muted-foreground">
          View and manage your code review history.
        </p>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-primary">Type</TableHead>
              <TableHead className="text-primary">Repository / File</TableHead>
              <TableHead className="text-primary">PR #</TableHead>
              <TableHead className="text-primary">Status</TableHead>
              <TableHead className="text-primary">Score</TableHead>
              <TableHead className="text-primary">Issues</TableHead>
              <TableHead className="text-primary">Reviewed</TableHead>
              <TableHead className="text-primary text-right">Actions</TableHead>
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
                  <Badge
                    className={
                      review.status === 'completed'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : review.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : (review.status === 'rejected' || review.status === 'declined')
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }
                  >
                    {review.status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
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