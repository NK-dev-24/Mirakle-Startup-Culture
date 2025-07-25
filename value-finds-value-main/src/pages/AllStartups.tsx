
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AllStartups = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Layout>
      <div className="bg-gradient-to-br from-white to-brand-lightYellow py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Access Our Startup Database
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            To view our curated list of innovative startups, please login or create an account.
          </p>
          <img 
            src="/placeholder.svg" 
            alt="Startup illustration" 
            className="max-w-md mx-auto mb-8"
          />
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={() => setIsOpen(true)} className="bg-brand-yellow text-white hover:bg-amber-500 px-8">
              Login to View Startups
            </Button>
            <Button onClick={() => setIsOpen(true)} variant="outline" className="text-brand-black border-brand-black hover:bg-brand-lightYellow px-8">
              Sign Up for Free
            </Button>
          </div>
        </div>
      </div>
      
      {/* Login/Signup Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <DialogHeader>
                <DialogTitle>Welcome back</DialogTitle>
                <DialogDescription>
                  Sign in to access our startup database
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-brand-yellow hover:bg-amber-500">Login</Button>
              </DialogFooter>
            </TabsContent>
            
            <TabsContent value="signup">
              <DialogHeader>
                <DialogTitle>Create an account</DialogTitle>
                <DialogDescription>
                  Join Mirakle to connect with innovators
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-brand-yellow hover:bg-amber-500">Sign Up</Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AllStartups;
