import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, MapPin, CreditCard, Briefcase, Upload, 
  Lock, FileText, CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  RadioGroup, RadioGroupItem 
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";

type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, title: "Personal Info", icon: <User className="h-5 w-5" /> },
  { id: 2, title: "Address", icon: <MapPin className="h-5 w-5" /> },
  { id: 3, title: "Account Type", icon: <CreditCard className="h-5 w-5" /> },
  { id: 4, title: "Employment", icon: <Briefcase className="h-5 w-5" /> },
  { id: 5, title: "Documents", icon: <Upload className="h-5 w-5" /> },
  { id: 6, title: "Security", icon: <Lock className="h-5 w-5" /> },
  { id: 7, title: "Terms", icon: <FileText className="h-5 w-5" /> },
  { id: 8, title: "Review", icon: <CheckCircle className="h-5 w-5" /> }
];

// Form data interface
interface AccountFormData {
  // Personal Info
  fullName: string;
  dateOfBirth: string;
  gender: string;
  idNumber: string;
  contactNumber: string;
  email: string;
  
  // Address
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  
  // Account Type
  accountType: string;
  currency: string;
  initialDeposit: string;
  
  // Employment
  occupation: string;
  monthlyIncome: string;
  incomeSource: string;
  
  // Documents
  idFront: File | null;
  idBack: File | null;
  photo: File | null;
  addressProof: File | null;
  
  // Security
  username: string;
  password: string;
  securityQuestion1: string;
  securityAnswer1: string;
  
  // Terms
  agreeToTerms: boolean;
}

const AccountOpeningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<AccountFormData>({
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: "male",
      idNumber: "",
      contactNumber: "",
      email: "",
      presentAddress: "",
      permanentAddress: "",
      city: "",
      postalCode: "",
      accountType: "savings",
      currency: "USD",
      initialDeposit: "",
      occupation: "",
      monthlyIncome: "",
      incomeSource: "",
      idFront: null,
      idBack: null,
      photo: null,
      addressProof: null,
      username: "",
      password: "",
      securityQuestion1: "",
      securityAnswer1: "",
      agreeToTerms: false
    }
  });
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async (data: AccountFormData) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would submit the data to the server
      console.log("Form submitted with data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsComplete(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="male" id="male" />
                        <FormLabel htmlFor="male" className="cursor-pointer">Male</FormLabel>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="female" id="female" />
                        <FormLabel htmlFor="female" className="cursor-pointer">Female</FormLabel>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="other" id="other" />
                        <FormLabel htmlFor="other" className="cursor-pointer">Other</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID or Passport Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your ID number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="presentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your current address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your permanent address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City / District</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {[
                        { value: 'savings', label: 'Savings Account' },
                        { value: 'current', label: 'Current Account' },
                        { value: 'student', label: 'Student Account' },
                        { value: 'joint', label: 'Joint Account' },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <FormLabel htmlFor={option.value} className="cursor-pointer font-medium w-full">{option.label}</FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Currency Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {[
                        { value: 'BDT', label: 'Bangladeshi Taka (BDT)' },
                        // { value: 'EUR', label: 'Euro (EUR)' },
                        // { value: 'GBP', label: 'British Pound (GBP)' },
                        // { value: 'JPY', label: 'Japanese Yen (JPY)' },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                          <RadioGroupItem value={option.value} id={`currency-${option.value}`} />
                          <FormLabel htmlFor={`currency-${option.value}`} className="cursor-pointer font-medium w-full">{option.label}</FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="initialDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Deposit Amount (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your occupation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your monthly income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="incomeSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source of Income</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your source of income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Please upload clear, readable images of the following documents:
            </div>
            
            <FormField
              control={form.control}
              name="idFront"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload NID/Passport (Front)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      {...field} 
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="idBack"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload NID/Passport (Back)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      {...field} 
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload a Passport-size Photo</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      {...field} 
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addressProof"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Proof of Address (utility bill or rental agreement)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*, application/pdf" 
                      {...field} 
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Create your login credentials and security settings:
            </div>
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter desired username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a strong password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="securityQuestion1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Question</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., What was your first pet's name?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="securityAnswer1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Your answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 7:
        return (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Please review our terms and conditions carefully before proceeding:
            </div>
            
            <div className="border rounded-md">
              <ScrollArea className="h-64 p-4">
                <div className="text-sm">
                  <h4 className="font-medium mb-2">Terms and Conditions</h4>
                  
                  <p className="mb-2">1. <strong>Account Opening:</strong> By submitting this application, you confirm that all information provided is accurate and complete. Skylet Bank reserves the right to verify all information and may reject applications that contain inaccurate information.</p>
                  
                  <p className="mb-2">2. <strong>Account Usage:</strong> Your account must only be used for legal purposes. Any suspicious activities may be reported to relevant authorities.</p>
                  
                  <p className="mb-2">3. <strong>Fees and Charges:</strong> Account maintenance fees, transaction fees, and other charges will be applied as per our current fee schedule, which may change from time to time.</p>
                  
                  <p className="mb-2">4. <strong>Privacy Policy:</strong> Your personal information will be handled in accordance with our privacy policy. We may share your information with credit reference agencies and fraud prevention services.</p>
                  
                  <p className="mb-2">5. <strong>Online Banking:</strong> When using our online banking services, you agree to maintain the confidentiality of your login credentials and immediately notify us of any unauthorized access.</p>
                  
                  <p className="mb-2">6. <strong>Communication:</strong> By providing your email and phone number, you consent to receive communications from us regarding your account and services.</p>
                  
                  <p className="mb-2">7. <strong>Changes to Terms:</strong> Skylet Bank may modify these terms and conditions at any time, with notice to account holders.</p>
                  
                  <p className="mb-2">8. <strong>Termination:</strong> We reserve the right to close your account if it is misused or in violation of any terms and conditions.</p>
                  
                  <p className="mb-2">9. <strong>Liability:</strong> Skylet Bank shall not be liable for any loss resulting from circumstances beyond our reasonable control.</p>
                  
                  <p>10. <strong>Governing Law:</strong> These terms and conditions are governed by the laws of the jurisdiction in which your account is opened.</p>
                </div>
              </ScrollArea>
            </div>
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      I have read and agree to the terms and conditions
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        );
        
      case 8: {
        const values = form.getValues();
        return (
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground mb-4">
              Please review all information before submitting. You can go back to any section to make changes.
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" /> Personal Information
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>Name:</strong> {values.fullName}</p>
                  <p><strong>Date of Birth:</strong> {values.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {values.gender}</p>
                  <p><strong>ID Number:</strong> {values.idNumber}</p>
                  <p><strong>Contact:</strong> {values.contactNumber}</p>
                  <p><strong>Email:</strong> {values.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> Address Details
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(2)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>Present Address:</strong> {values.presentAddress}</p>
                  <p><strong>Permanent Address:</strong> {values.permanentAddress}</p>
                  <p><strong>City:</strong> {values.city}</p>
                  <p><strong>Postal Code:</strong> {values.postalCode}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" /> Account Details
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(3)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>Account Type:</strong> {values.accountType}</p>
                  <p><strong>Currency:</strong> {values.currency}</p>
                  <p><strong>Initial Deposit:</strong> {values.initialDeposit || 'None specified'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> Employment Details
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(4)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>Occupation:</strong> {values.occupation}</p>
                  <p><strong>Monthly Income:</strong> {values.monthlyIncome}</p>
                  <p><strong>Income Source:</strong> {values.incomeSource}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-2" /> Documents
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(5)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>ID Front:</strong> {values.idFront ? values.idFront.name : 'Not uploaded'}</p>
                  <p><strong>ID Back:</strong> {values.idBack ? values.idBack.name : 'Not uploaded'}</p>
                  <p><strong>Photo:</strong> {values.photo ? values.photo.name : 'Not uploaded'}</p>
                  <p><strong>Address Proof:</strong> {values.addressProof ? values.addressProof.name : 'Not uploaded'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-md mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2" /> Security Details
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs" 
                    onClick={() => goToStep(6)}
                  >
                    Edit
                  </Button>
                </h3>
                <div className="bg-muted/50 p-3 rounded-md text-sm">
                  <p><strong>Username:</strong> {values.username}</p>
                  <p><strong>Password:</strong> ••••••••</p>
                  <p><strong>Security Question:</strong> {values.securityQuestion1}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
        
      default:
        return null;
    }
  };
  
  // Success screen after submission
  if (isComplete) {
    return (
      <Card className="w-full mx-auto max-w-3xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Success!</CardTitle>
          <CardDescription>
            Your account has been created successfully!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center pb-6">
          <p className="text-gray-600 mb-6">
            Your account will be activated within a few working days. You will be notified once it's ready to use.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Button variant="outline">
              Download Application Copy (PDF)
            </Button>
            
            <Button>
              Return to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="hidden sm:flex justify-between mb-4">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={cn(
                "flex flex-col items-center",
                (step.id < currentStep) && "text-blue-600",
                (step.id === currentStep) && "text-blue-600 font-medium",
                (step.id > currentStep) && "text-gray-400"
              )}
              style={{ width: `${100 / steps.length}%` }}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1",
                  (step.id < currentStep) && "bg-blue-600 text-white",
                  (step.id === currentStep) && "border-2 border-blue-600 text-blue-600",
                  (step.id > currentStep) && "border border-gray-300 text-gray-400"
                )}
              >
                {step.id}
              </div>
              <div className="text-xs text-center">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile view */}
        <div className="sm:hidden flex items-center justify-between mb-4 px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <span className="text-sm font-medium">
            Step {currentStep} of {steps.length}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={nextStep}
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
        </div>
        
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / Math.max(steps.length - 1, 1)) * 100}%` }}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center">
            {steps.find(step => step.id === currentStep)?.icon}
            <CardTitle className="ml-2">
              {steps.find(step => step.id === currentStep)?.title}
            </CardTitle>
          </div>
          <CardDescription>
            {currentStep === 1 && "Please provide your personal information"}
            {currentStep === 2 && "Please provide your address details"}
            {currentStep === 3 && "Choose your preferred account type and settings"}
            {currentStep === 4 && "Provide your employment and income details"}
            {currentStep === 5 && "Upload the required documentation"}
            {currentStep === 6 && "Set up your online banking credentials"}
            {currentStep === 7 && "Review and accept our terms and conditions"}
            {currentStep === 8 && "Review all information before submission"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {renderStepContent()}
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button 
              type="button"
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isSubmitting || !form.getValues().agreeToTerms}
              className={isSubmitting ? "opacity-70" : ""}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountOpeningForm;