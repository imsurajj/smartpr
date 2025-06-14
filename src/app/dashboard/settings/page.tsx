"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [githubToken, setGithubToken] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [autoReview, setAutoReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load settings from localStorage
    const settings = localStorage.getItem("smartprr-settings");
    if (settings) {
      const parsed = JSON.parse(settings);
      setGithubToken(parsed.githubToken || "");
      setOpenaiKey(parsed.openaiKey || "");
      setAutoReview(parsed.autoReview || false);
    }
  }, []);

  const handleSave = () => {
    try {
      const settings = {
        githubToken,
        openaiKey,
        autoReview,
      };
      localStorage.setItem("smartprr-settings", JSON.stringify(settings));
      
      // Update environment variables
      if (typeof window !== "undefined") {
        (window as any).process = (window as any).process || {};
        (window as any).process.env = (window as any).process.env || {};
        (window as any).process.env.NEXT_PUBLIC_GITHUB_TOKEN = githubToken;
        (window as any).process.env.NEXT_PUBLIC_OPENAI_KEY = openaiKey;
      }

      setSaved(true);
      setError(null);
      setTimeout(() => setSaved(false), 3000);
    } catch (_err: unknown) {
      setError("Failed to save settings");
      setSaved(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your API keys and application settings.
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="mb-2 flex gap-2">
          <TabsTrigger value="api" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary">API Configuration</TabsTrigger>
          <TabsTrigger value="github" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary">GitHub Integration</TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary">Preferences</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>AI Provider Settings</CardTitle>
                <CardDescription>
                  Configure your AI provider and API keys.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>OpenAI API Key</Label>
                  <Input
                    type="password"
                    placeholder="Enter your OpenAI API key"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Currently using demo mode. API key not required.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Integration</CardTitle>
                <CardDescription>
                  Configure your GitHub access token for PR reviews.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>GitHub Personal Access Token</Label>
                  <Input
                    type="password"
                    placeholder="Enter your GitHub token"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Required scopes: repo, pull_requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Review Preferences</CardTitle>
                <CardDescription>
                  Configure how SmartPR behaves during code reviews.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic PR Review</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically review PRs when they are opened or updated
                    </p>
                  </div>
                  <Switch
                    checked={autoReview}
                    onCheckedChange={setAutoReview}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave}>Save Settings</Button>
        {saved && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            Settings saved successfully
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}
      </div>
      <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold">Working on this update</span>
    </div>
  );
} 