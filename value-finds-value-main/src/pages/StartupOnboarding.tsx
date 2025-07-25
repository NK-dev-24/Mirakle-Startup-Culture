
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const StartupOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupName: '',
    website: '',
    description: '',
    industry: '',
    stage: '',
    opportunities: {
      paidPilots: false,
      strategicPartnerships: false,
      productFeedback: false,
      mentorship: false,
    },
    demoLink: '',
    founderName: '',
    founderEmail: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      opportunities: {
        ...prev.opportunities,
        [name]: !prev.opportunities[name as keyof typeof prev.opportunities],
      },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Startup form submitted:', formData);
    
    toast.success('Your profile has been submitted successfully!');
    navigate('/marketplace');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
            Let's Match You with the Right Problem
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="startupName">Startup Name*</Label>
                <Input 
                  id="startupName" 
                  name="startupName" 
                  value={formData.startupName} 
                  onChange={handleChange} 
                  className="mt-1" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website / Product Link (Optional)</Label>
                <Input 
                  id="website" 
                  name="website" 
                  value={formData.website} 
                  onChange={handleChange} 
                  className="mt-1" 
                  type="url"
                  placeholder="https://"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Brief Description (max 300 chars)*</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="What problem are you solving?"
                  maxLength={300}
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/300 characters
                </p>
              </div>
              
              <div>
                <Label htmlFor="industry">What industry are you focused on?*</Label>
                <Select onValueChange={(value) => handleSelectChange('industry', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="sustainability">Sustainability</SelectItem>
                    <SelectItem value="enterprise">Enterprise SaaS</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="ai">AI & Machine Learning</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="stage">Stage*</Label>
                <Select onValueChange={(value) => handleSelectChange('stage', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="launched">Launched</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">What kind of opportunities are you looking for?</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="paidPilots" 
                      checked={formData.opportunities.paidPilots} 
                      onCheckedChange={() => handleCheckboxChange('paidPilots')} 
                    />
                    <Label htmlFor="paidPilots" className="font-normal">Paid Pilots</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="strategicPartnerships" 
                      checked={formData.opportunities.strategicPartnerships} 
                      onCheckedChange={() => handleCheckboxChange('strategicPartnerships')} 
                    />
                    <Label htmlFor="strategicPartnerships" className="font-normal">Strategic Partnerships</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="productFeedback" 
                      checked={formData.opportunities.productFeedback} 
                      onCheckedChange={() => handleCheckboxChange('productFeedback')} 
                    />
                    <Label htmlFor="productFeedback" className="font-normal">Product Feedback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mentorship" 
                      checked={formData.opportunities.mentorship} 
                      onCheckedChange={() => handleCheckboxChange('mentorship')} 
                    />
                    <Label htmlFor="mentorship" className="font-normal">Mentorship</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="demoLink">Upload Deck / Demo Link (Optional)</Label>
                <Input 
                  id="demoLink" 
                  name="demoLink" 
                  value={formData.demoLink} 
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="https://..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founderName">Founder Name*</Label>
                  <Input 
                    id="founderName" 
                    name="founderName" 
                    value={formData.founderName} 
                    onChange={handleChange} 
                    className="mt-1" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="founderEmail">Founder Email*</Label>
                  <Input 
                    id="founderEmail" 
                    name="founderEmail" 
                    value={formData.founderEmail} 
                    onChange={handleChange} 
                    className="mt-1" 
                    type="email" 
                    required 
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-accent-orange hover:bg-orange-600 text-white"
              >
                Submit Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartupOnboarding;
