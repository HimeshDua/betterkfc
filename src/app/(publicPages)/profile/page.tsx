'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useSessions} from '@/contexts/UserContext';

export default function ProfilePage() {
  const {user, valid} = useSessions();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.location || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve({success: true, message: 'Profile updated successfully!'});
          } else {
            resolve({
              success: false,
              error: 'Failed to update profile. Please try again.'
            });
          }
        }, 1500)
      );

      const data = response as {
        success: boolean;
        message?: string;
        error?: string;
      };

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'An unknown error occurred.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!valid) {
    return (
      <div className="bg-background text-foreground min-h-[90vh] flex flex-col">
        <div className="sticky top-14 z-20 bg-background py-4 px-4 sm:px-6 md:py-6 border-b border-border flex items-center justify-center shadow-sm">
          <Link
            href="/"
            className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Profile
          </h1>
        </div>
        <div className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
          <Card className="w-full max-w-md bg-card border border-border shadow-md text-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-foreground">
                Access Denied
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                You must be signed in to view your profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col px-6 pb-6 gap-4">
              <Button variant="default" className="w-full" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="/signup">Create an Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-[90vh] flex flex-col">
      <div className="sticky top-14 z-20 bg-background py-4 px-4 sm:px-6 md:py-6 border-b border-border flex items-center justify-center shadow-sm">
        <Link
          href="/"
          className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          My Profile
        </h1>
      </div>

      <div className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-card border border-border shadow-md p-6">
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="text-2xl md:text-3xl text-foreground">
              Personal Information
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Keep your profile up to date for a smoother experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription className="text-red-500">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                <AlertDescription>
                  Profile updated successfully!
                </AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-input text-foreground border-input"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-input text-foreground border-input"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 bg-input text-foreground border-input"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-foreground">
                    Delivery Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 bg-input text-foreground border-input"
                    disabled={loading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-lg py-3 mt-6"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center pt-8"></CardFooter>
        </Card>
      </div>
    </div>
  );
}
