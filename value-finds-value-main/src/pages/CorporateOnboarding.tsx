
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';

const CorporateOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    role: '',
    challengeTitle: '',
    challengeDescription: '',
    openTo: {
      proofOfConcept: false,
      pilots: false,
      acquisitions: false,
      partnerships: false,
      hackathons: false,
    },
    budget: '',
    contactName: '',
    contactEmail: '',
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
      openTo: {
        ...prev.openTo,
        [name]: !prev.openTo[name as keyof typeof prev.openTo],
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
    console.log('Corporate form submitted:', formData);
    
    toast.success('Your challenge has been posted successfully!');
    navigate('/marketplace');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
            Post a Challenge Worth Solving
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="organizationName">Organization Name*</Label>
                <Input 
                  id="organizationName" 
                  name="organizationName" 
                  value={formData.organizationName} 
                  onChange={handleChange} 
                  className="mt-1" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry / Sector*</Label>
                <Select onValueChange={(value) => handleSelectChange('industry', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="role">Your Role*</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="e.g., Innovation Manager, CTO, etc." 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="challengeTitle">Challenge Title*</Label>
                <Input 
                  id="challengeTitle" 
                  name="challengeTitle" 
                  value={formData.challengeTitle} 
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="Give it a name" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="challengeDescription">Describe Your Challenge*</Label>
                <Textarea 
                  id="challengeDescription" 
                  name="challengeDescription" 
                  value={formData.challengeDescription} 
                  onChange={handleChange} 
                  className="mt-1" 
                  placeholder="What problem are you hoping to solve?" 
                  maxLength={500}
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.challengeDescription.length}/500 characters
                </p>
              </div>
              
              <div>
                <Label className="mb-2 block">What are you open to?</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="proofOfConcept" 
                      checked={formData.openTo.proofOfConcept} 
                      onCheckedChange={() => handleCheckboxChange('proofOfConcept')} 
                    />
                    <Label htmlFor="proofOfConcept" className="font-normal">Proof of Concept</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pilots" 
                      checked={formData.openTo.pilots} 
                      onCheckedChange={() => handleCheckboxChange('pilots')} 
                    />
                    <Label htmlFor="pilots" className="font-normal">Pilots</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acquisitions" 
                      checked={formData.openTo.acquisitions} 
                      onCheckedChange={() => handleCheckboxChange('acquisitions')} 
                    />
                    <Label htmlFor="acquisitions" className="font-normal">Acquisitions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="partnerships" 
                      checked={formData.openTo.partnerships} 
                      onCheckedChange={() => handleCheckboxChange('partnerships')} 
                    />
                    <Label htmlFor="partnerships" className="font-normal">Partnerships</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hackathons" 
                      checked={formData.openTo.hackathons} 
                      onCheckedChange={() => handleCheckboxChange('hackathons')} 
                    />
                    <Label htmlFor="hackathons" className="font-normal">Hackathons</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Do you have budget for solving this?*</Label>
                <RadioGroup onValueChange={(value) => handleSelectChange('budget', value)} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="budget-yes" />
                    <Label htmlFor="budget-yes" className="font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="budget-no" />
                    <Label htmlFor="budget-no" className="font-normal">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="depends" id="budget-depends" />
                    <Label htmlFor="budget-depends" className="font-normal">Depends</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Point of Contact (Name)*</Label>
                  <Input 
                    id="contactName" 
                    name="contactName" 
                    value={formData.contactName} 
                    onChange={handleChange} 
                    className="mt-1" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Point of Contact (Email)*</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    value={formData.contactEmail} 
                    onChange={handleChange} 
                    className="mt-1" 
                    type="email" 
                    required 
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-blue-700 hover:bg-blue-800 text-white"
              >
                Submit Challenge
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CorporateOnboarding;
