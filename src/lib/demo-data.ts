// Types
export interface CodeIssue {
  severity: 'error' | 'warning' | 'suggestion';
  type: string;
  description: string;
  suggestions: string[];
  line?: number;
  column?: number;
}

export interface ReviewResult {
  score: number;
  summary: string;
  issues: CodeIssue[];
  metrics: {
    complexity: number;
    maintainability: number;
    testCoverage: number;
    duplicateCode: number;
  };
  suggestions: {
    performance: string[];
    security: string[];
    bestPractices: string[];
  };
}

// Mock review history
export const reviewHistory = [
  {
    id: '1',
    date: new Date(2024, 2, 15, 14, 30),
    type: 'pull_request',
    repository: 'frontend/main-app',
    prNumber: '#456',
    score: 95,
    status: 'completed',
    issues: { errors: 0, warnings: 2, suggestions: 3 }
  },
  {
    id: '2',
    date: new Date(2024, 2, 15, 11, 45),
    type: 'code_review',
    fileName: 'AuthService.ts',
    score: 78,
    status: 'completed',
    issues: { errors: 3, warnings: 5, suggestions: 4 }
  },
  {
    id: '3',
    date: new Date(2024, 2, 15, 10, 15),
    type: 'pull_request',
    repository: 'backend/api',
    prNumber: '#789',
    score: 88,
    status: 'completed',
    issues: { errors: 1, warnings: 3, suggestions: 6 }
  },
  {
    id: '4',
    date: new Date(2024, 2, 14, 16, 20),
    type: 'code_review',
    fileName: 'PaymentProcessor.ts',
    score: 72,
    status: 'completed',
    issues: { errors: 4, warnings: 6, suggestions: 3 }
  },
  {
    id: '5',
    date: new Date(2024, 2, 14, 14, 30),
    type: 'pull_request',
    repository: 'mobile/react-native-app',
    prNumber: '#234',
    score: 91,
    status: 'completed',
    issues: { errors: 1, warnings: 2, suggestions: 5 }
  },
  {
    id: '6',
    date: new Date(2024, 2, 14, 11, 45),
    type: 'code_review',
    fileName: 'DataSync.ts',
    score: 85,
    status: 'completed',
    issues: { errors: 2, warnings: 4, suggestions: 7 }
  },
  {
    id: '7',
    date: new Date(2024, 2, 13, 15, 30),
    type: 'pull_request',
    repository: 'shared/components',
    prNumber: '#567',
    score: 94,
    status: 'completed',
    issues: { errors: 0, warnings: 3, suggestions: 4 }
  },
  {
    id: '8',
    date: new Date(2024, 2, 13, 14, 20),
    type: 'code_review',
    fileName: 'UserProfile.tsx',
    score: 89,
    status: 'completed',
    issues: { errors: 1, warnings: 3, suggestions: 5 }
  },
  {
    id: '9',
    date: new Date(2024, 2, 13, 11, 30),
    type: 'pull_request',
    repository: 'infra/terraform',
    prNumber: '#345',
    score: 76,
    status: 'completed',
    issues: { errors: 3, warnings: 7, suggestions: 4 }
  },
  {
    id: '10',
    date: new Date(2024, 2, 13, 10, 15),
    type: 'code_review',
    fileName: 'DatabaseMigration.ts',
    score: 82,
    status: 'completed',
    issues: { errors: 2, warnings: 4, suggestions: 6 }
  },
  {
    id: '11',
    date: new Date(2024, 2, 12, 16, 45),
    type: 'pull_request',
    repository: 'backend/auth-service',
    prNumber: '#678',
    score: 93,
    status: 'completed',
    issues: { errors: 0, warnings: 4, suggestions: 3 }
  },
  {
    id: '12',
    date: new Date(2024, 2, 12, 14, 30),
    type: 'code_review',
    fileName: 'NotificationService.ts',
    score: 87,
    status: 'completed',
    issues: { errors: 1, warnings: 3, suggestions: 5 }
  },
  {
    id: '13',
    date: new Date(2024, 2, 12, 11, 20),
    type: 'pull_request',
    repository: 'frontend/dashboard',
    prNumber: '#890',
    score: 79,
    status: 'completed',
    issues: { errors: 3, warnings: 5, suggestions: 4 }
  },
  {
    id: '14',
    date: new Date(2024, 2, 12, 10, 15),
    type: 'code_review',
    fileName: 'Analytics.ts',
    score: 88,
    status: 'completed',
    issues: { errors: 1, warnings: 4, suggestions: 6 }
  },
  {
    id: '15',
    date: new Date(2024, 2, 11, 16, 30),
    type: 'pull_request',
    repository: 'mobile/ios-components',
    prNumber: '#432',
    score: 90,
    status: 'completed',
    issues: { errors: 1, warnings: 2, suggestions: 5 }
  },
  {
    id: '16',
    date: new Date(2024, 2, 11, 14, 45),
    type: 'code_review',
    fileName: 'SecurityMiddleware.ts',
    score: 75,
    status: 'completed',
    issues: { errors: 4, warnings: 6, suggestions: 3 }
  },
  {
    id: '17',
    date: new Date(2024, 2, 11, 11, 30),
    type: 'pull_request',
    repository: 'shared/utils',
    prNumber: '#765',
    score: 92,
    status: 'completed',
    issues: { errors: 0, warnings: 3, suggestions: 4 }
  },
  {
    id: '18',
    date: new Date(2024, 2, 11, 10, 15),
    type: 'code_review',
    fileName: 'CacheManager.ts',
    score: 86,
    status: 'completed',
    issues: { errors: 1, warnings: 4, suggestions: 5 }
  },
  {
    id: '19',
    date: new Date(2024, 2, 10, 16, 45),
    type: 'pull_request',
    repository: 'infra/kubernetes',
    prNumber: '#543',
    score: 81,
    status: 'completed',
    issues: { errors: 2, warnings: 5, suggestions: 4 }
  },
  {
    id: '20',
    date: new Date(2024, 2, 10, 14, 30),
    type: 'code_review',
    fileName: 'LoadBalancer.ts',
    score: 84,
    status: 'completed',
    issues: { errors: 2, warnings: 3, suggestions: 6 }
  },
  {
    id: '21',
    date: new Date(2024, 2, 10, 11, 20),
    type: 'pull_request',
    repository: 'backend/graphql',
    prNumber: '#987',
    score: 89,
    status: 'completed',
    issues: { errors: 1, warnings: 3, suggestions: 5 }
  },
  {
    id: '22',
    date: new Date(2024, 2, 10, 10, 15),
    type: 'code_review',
    fileName: 'QueryOptimizer.ts',
    score: 83,
    status: 'completed',
    issues: { errors: 2, warnings: 4, suggestions: 5 }
  },
  {
    id: '23',
    date: new Date(2024, 2, 9, 16, 30),
    type: 'pull_request',
    repository: 'frontend/design-system',
    prNumber: '#654',
    score: 96,
    status: 'completed',
    issues: { errors: 0, warnings: 1, suggestions: 4 }
  },
  {
    id: '24',
    date: new Date(2024, 2, 9, 14, 45),
    type: 'code_review',
    fileName: 'ThemeProvider.tsx',
    score: 91,
    status: 'completed',
    issues: { errors: 0, warnings: 3, suggestions: 4 }
  },
  {
    id: '25',
    date: new Date(2024, 2, 9, 11, 30),
    type: 'pull_request',
    repository: 'shared/testing',
    prNumber: '#876',
    score: 88,
    status: 'completed',
    issues: { errors: 1, warnings: 3, suggestions: 5 }
  }
];

// Analytics data
export const analyticsData = {
  reviewsByDay: [
    { date: '2024-03-10', count: 5 },
    { date: '2024-03-11', count: 8 },
    { date: '2024-03-12', count: 6 },
    { date: '2024-03-13', count: 10 },
    { date: '2024-03-14', count: 7 },
    { date: '2024-03-15', count: 12 }
  ],
  issuesByType: {
    security: 25,
    performance: 30,
    codeStyle: 45,
    bestPractices: 35,
    accessibility: 15
  },
  averageScores: {
    lastWeek: 87,
    lastMonth: 85,
    overall: 86
  }
};

// Generate review based on mode
export function generateReview(code: string, mode: 'quick' | 'thorough' | 'security'): ReviewResult {
  const baseIssues: CodeIssue[] = [
    {
      severity: 'warning',
      type: 'Code Style',
      description: 'Consider using more descriptive variable names',
      suggestions: ['Rename variables to reflect their purpose', 'Add comments to explain complex logic'],
      line: 15,
      column: 3
    },
    {
      severity: 'suggestion',
      type: 'Performance',
      description: 'Potential performance optimization opportunities',
      suggestions: ['Consider memoizing expensive computations', 'Use React.memo for pure components'],
      line: 23,
      column: 5
    }
  ];

  // Add mode-specific issues
  if (mode === 'thorough' || mode === 'security') {
    baseIssues.push({
      severity: 'error',
      type: 'Security',
      description: 'Potential XSS vulnerability in user input handling',
      suggestions: ['Sanitize user input', 'Implement proper input validation', 'Use DOMPurify for HTML content'],
      line: 45,
      column: 10
    });
  }

  if (mode === 'thorough') {
    baseIssues.push({
      severity: 'warning',
      type: 'Accessibility',
      description: 'Missing ARIA labels on interactive elements',
      suggestions: ['Add aria-label attributes', 'Ensure proper heading hierarchy'],
      line: 32,
      column: 8
    });
  }

  if (mode === 'security') {
    baseIssues.push({
      severity: 'error',
      type: 'Security',
      description: 'Insecure dependency detected',
      suggestions: ['Update package to latest version', 'Review security advisories'],
      line: 1,
      column: 1
    });
  }

  return {
    score: mode === 'thorough' ? 85 : mode === 'security' ? 78 : 90,
    summary: generateSummary(mode, baseIssues),
    issues: baseIssues,
    metrics: {
      complexity: Math.floor(Math.random() * 30) + 70,
      maintainability: Math.floor(Math.random() * 20) + 80,
      testCoverage: Math.floor(Math.random() * 40) + 60,
      duplicateCode: Math.floor(Math.random() * 10)
    },
    suggestions: {
      performance: [
        'Implement code splitting for large components',
        'Use React.lazy for dynamic imports',
        'Optimize images and assets'
      ],
      security: [
        'Implement Content Security Policy',
        'Use HTTPS for all external requests',
        'Validate and sanitize all user inputs'
      ],
      bestPractices: [
        'Follow React hooks best practices',
        'Implement proper error boundaries',
        'Use TypeScript for better type safety'
      ]
    }
  };
}

function generateSummary(mode: string, issues: CodeIssue[]): string {
  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const suggestionCount = issues.filter(i => i.severity === 'suggestion').length;

  switch (mode) {
    case 'quick':
      return `Quick analysis complete. Found ${errorCount} errors, ${warningCount} warnings, and ${suggestionCount} suggestions. Overall code quality is good with some minor improvements possible.`;
    case 'thorough':
      return `Comprehensive analysis complete. Identified ${errorCount} critical issues, ${warningCount} potential improvements, and ${suggestionCount} optimization opportunities. Code structure is solid but requires attention to best practices and accessibility.`;
    case 'security':
      return `Security audit complete. Detected ${errorCount} security vulnerabilities, ${warningCount} security warnings, and ${suggestionCount} security best practice recommendations. Immediate attention required for critical security issues.`;
    default:
      return `Analysis complete. Found ${errorCount} errors, ${warningCount} warnings, and ${suggestionCount} suggestions.`;
  }
} 