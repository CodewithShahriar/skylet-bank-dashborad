import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ShieldCheck, Globe, CreditCard as CardIcon, DollarSign, Zap, Lock, RefreshCw, ShoppingCart, Film, Coffee, Plane, Utensils, Car, Music } from 'lucide-react';
import { useBankData } from '@/contexts/BankDataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Card Chip Component
const CardChip = () => (
  <div className="h-6 w-9 bg-yellow-200/80  grid grid-cols-3 grid-rows-3 gap-px p-px">
    {Array(9).fill(0).map((_, i) => (
      <div key={i} className="bg-yellow-300/90" />
    ))}
  </div>
);

// Card Contactless Component
const CardContactless = () => (
  <div className="h-5 w-5 ml-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  </div>
);

// Prepaid Card Component
const PrepaidCard = () => (
  <div className="relative overflow-hidden text-white p-5 rounded-xl shadow-lg w-full">
    <img
      src="https://i.ibb.co.com/tMjGvWgv/Whats-App-Image-2025-05-10-at-02-00-20-7c89c285.jpg"
      alt="Prepaid Card"
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

// Virtual Card Component
const VirtualCard = () => (
  <div className="relative overflow-hidden text-white p-5 rounded-xl shadow-lg w-full">
    <img
      src="https://i.ibb.co.com/B5TMy5bd/Whats-App-Image-2025-05-10-at-02-00-19-b3d6501d.jpg"
      alt="Virtual Card"
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

// Debit Card Component
const DebitCard = () => (
  <div className="relative overflow-hidden text-white p-5 rounded-xl shadow-lg w-full">
    <img
      src="https://i.ibb.co.com/Z6tBMxJR/Whats-App-Image-2025-05-09-at-19-39-46-13ba0ebe.jpg"
      alt="Debit Card"
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

// Credit Card Component
const CreditCardComponent = () => (
  <div className="relative overflow-hidden text-white p-5 rounded-xl shadow-lg w-full">
    <img
      src="https://i.ibb.co.com/kVbjXQrh/Whats-App-Image-2025-05-09-at-19-39-45-6ae55998.jpg"
      alt="Credit Card"
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

// Card Details Component
const CardDetails = ({ type, number, expiry, active, limit }: { 
  type: string, 
  number: string, 
  expiry: string,
  active: boolean,
  limit?: number
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Card Type</span>
            <span className="font-medium text-gray-700">{type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Card Number</span>
            <span className="font-medium text-gray-700">{number}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Card Status</span>
            <span className={`px-2 py-1 ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs rounded-full`}>
              {active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Expiry Date</span>
            <span className="font-medium text-gray-700">{expiry}</span>
          </div>
          {limit && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Credit Limit</span>
              <span className="font-medium text-gray-700">${limit.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm">Block Card</Button>
          <Button variant="outline" size="sm">Card Settings</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Cards Component
const Cards = () => {
  const { accounts } = useBankData();
  const [activeTab, setActiveTab] = useState('debit');

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-skylet-blue via-skylet-light-blue to-skylet-green">
        My Cards
      </h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="mb-2">
          <TabsTrigger value="debit" className={activeTab === 'debit' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-900' : ''}>Debit Card</TabsTrigger>
          <TabsTrigger value="credit" className={activeTab === 'credit' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-900' : ''}>Credit Card</TabsTrigger>
          <TabsTrigger value="prepaid" className={activeTab === 'prepaid' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-900' : ''}>Prepaid Card</TabsTrigger>
          <TabsTrigger value="virtual" className={activeTab === 'virtual' ? 'data-[state=active]:bg-white data-[state=active]:text-gray-900' : ''}>Virtual Card</TabsTrigger>
        </TabsList>
        
        <TabsContent value="debit">
          {/* Debit Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side: Card Display */}
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="p-5 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Debit Card</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="relative transition-transform duration-200 transform hover:scale-105">
                    <DebitCard />
                  </div>
                </div>
              </div>
              <CardDetails 
                type="Visa Debit"
                number="**** **** **** 9703"
                expiry="12/34"
                active={true}
              />
            </div>

            {/* Right Side: Recent Activity */}
            <div className="flex flex-col space-y-4">
              <Card className="p-4 border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {/* Transaction 1 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                          <ShoppingCart size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Shwapno - Gulshan</h4>
                          <p className="text-sm text-gray-500">May 10, 2025 • 10:30 AM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">-  ৳ 2540</span>
                    </li>

                    {/* Transaction 2 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-50 text-gray-600 rounded-full">
                          <CardIcon size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">City Bank ATM Withdraw</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 8:00 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- ৳ 15000</span>
                    </li>

                    {/* Transaction 3 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-full">
                          <Utensils size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Herfy Banani</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 3:45 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- ৳ 1500</span>
                    </li>

                    {/* Transaction 4 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-50 text-red-600 rounded-full">
                         <Utensils size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Burger King</h4>
                          <p className="text-sm text-gray-500">May 8, 2025 • 1:15 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- ৳ 1330</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="credit">
          {/* Credit Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side: Card Display */}
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="p-5 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Credit Card</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="relative transition-transform duration-200 transform hover:scale-105">
                    <CreditCardComponent />
                  </div>
                </div>
              </div>
              <CardDetails 
                type="Mastercard Credit"
                number="**** **** **** 4365"
                expiry="06/32"
                active={true}
                limit={10000}
              />
            </div>

            {/* Right Side: Credit Utilization */}
            <div className="flex flex-col space-y-4">
              <Card className="p-4 border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 font-semibold">Credit Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-gray-700">Used: $7,561.47</div>
                      <div className="text-gray-500">Total: $10,000.00</div>
                    </div>

                    {/* Additional Features */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-gray-700">Payment Protection</span>
                        </div>
                        <span className="text-green-500">Active</span>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-gray-700">International Usage</span>
                        </div>
                        <span className="text-red-500">Disabled</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="p-4 border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {/* Transaction 1 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                          <ShoppingCart size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Daraz BD</h4>
                          <p className="text-sm text-gray-500">May 10, 2025 • 10:30 AM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $120.00</span>
                    </li>

                    {/* Transaction 2 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-full">
                          <Film size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">NOVO Cinemas</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 8:00 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $15.99</span>
                    </li>

                    {/* Transaction 3 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full">
                          <Coffee size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Gloria Jean's Coffees</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 3:45 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $8.50</span>
                    </li>

                    {/* Transaction 4 */}
                    
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prepaid">
          {/* Prepaid Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side: Card Display */}
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="p-5 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Prepaid Card</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="relative transition-transform duration-200 transform hover:scale-105">
                    <PrepaidCard />
                  </div>
                </div>
              </div>
              <CardDetails 
                type="Prepaid Travel Card"
                number="**** **** **** 1234"
                expiry="08/28"
                active={true}
              />
            </div>

            {/* Right Side: Recent Activity */}
            <div className="flex flex-col space-y-4">
              <Card className="p-4 border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {/* Transaction 1 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                          <ShoppingCart size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Duty Free - DXB Airport</h4>
                          <p className="text-sm text-gray-500">May 10, 2025 • 10:30 AM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $120.00</span>
                    </li>

                    {/* Transaction 2 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                          <Car size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Uber Ride</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 8:00 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $15.99</span>
                    </li>

                    {/* Transaction 3 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full">
                          <Coffee size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Starbucks</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 3:45 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $8.50</span>
                    </li>

                    {/* Transaction 4 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-50 text-red-600 rounded-full">
                          <Plane size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Dubai Airlines</h4>
                          <p className="text-sm text-gray-500">May 8, 2025 • 1:15 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $500.00</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="virtual">
          {/* Virtual Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side: Card Display */}
            <div className="md:col-span-2 flex flex-col h-full">
              <div className="p-5 bg-white rounded-lg mb-4 border border-gray-200 shadow-sm">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Virtual Card</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="relative transition-transform duration-200 transform hover:scale-105">
                    <VirtualCard />
                  </div>
                </div>
              </div>
              <CardDetails 
                type="Virtual Card"
                number="**** **** **** 5678"
                expiry="01/30"
                active={true}
              />
            </div>

            {/* Right Side: Recent Activity */}
            <div className="flex flex-col space-y-4">
              <Card className="p-4 border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {/* Transaction 1 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                           <Film size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Amazon Prime</h4>
                          <p className="text-sm text-gray-500">May 10, 2025 • 10:30 AM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $120.00</span>
                    </li>

                    {/* Transaction 2 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-full">
                          <Film size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Netflix</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 8:00 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $15.99</span>
                    </li>

                    {/* Transaction 3 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-full">
                          <Zap size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Google Play</h4>
                          <p className="text-sm text-gray-500">May 9, 2025 • 3:45 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $8.50</span>
                    </li>

                    {/* Transaction 4 */}
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-50 text-gray-600 rounded-full">
                          <Globe size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Fiverr - Service Payment</h4>
                          <p className="text-sm text-gray-500">May 8, 2025 • 1:15 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $500.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-full">
                          <Music size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">Spotify Premium</h4>
                          <p className="text-sm text-gray-500">May 8, 2025 • 1:15 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">- $500.00</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Card Security */}
      <Card>
        <CardHeader>
          <CardTitle>Card Security</CardTitle>
          <CardDescription>Manage your card security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h4 className="font-medium text-gray-800">Online Payments</h4>
                <p className="text-sm text-gray-500">Enable or disable online payments</p>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mr-2">Enabled</span>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h4 className="font-medium text-gray-800">International Transactions</h4>
                <p className="text-sm text-gray-500">Enable or disable international usage</p>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full mr-2">Disabled</span>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">Transaction Limit</h4>
                <p className="text-sm text-gray-500">Set your daily transaction limit</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-gray-700">$50,000</span>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="transition-all hover:shadow-md hover:border-blue-200">
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 p-3 rounded-full bg-blue-50 text-blue-600">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Freeze Card</h3>
              <p className="text-sm text-gray-500">Temporarily lock your card</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md hover:border-blue-200">
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 p-3 rounded-full bg-blue-50 text-blue-600">
              <RefreshCw size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Reset PIN</h3>
              <p className="text-sm text-gray-500">Change your card PIN</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md hover:border-blue-200">
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 p-3 rounded-full bg-blue-50 text-blue-600">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Activate Card</h3>
              <p className="text-sm text-gray-500">Activate a new card</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
