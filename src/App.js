import React, { useState, useEffect } from 'react';
import { FileText, Database, ArrowRight, Cpu } from 'lucide-react';

const IntelligentDocumentProcessor = () => {
  const [step, setStep] = useState(0);
  const [extractedData, setExtractedData] = useState({});
  const [scanProgress, setScanProgress] = useState(0);
  const [currentLLM, setCurrentLLM] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 0) {
      const scanInterval = setInterval(() => {
        setScanProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(scanInterval);
            return 100;
          }
          return prevProgress + 5; // Increased from 2 to 5 for faster scanning
        });
      }, 20); // Decreased from 50 to 20 for faster updates
      return () => clearInterval(scanInterval);
    } else {
      setScanProgress(0);
    }
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      const llms = ['LLAMA 3.1', 'GPT', 'Claude Sonnet'];
      let llmIndex = 0;
      const llmInterval = setInterval(() => {
        setCurrentLLM(llms[llmIndex]);
        llmIndex = (llmIndex + 1) % llms.length;
      }, 1000);
      return () => clearInterval(llmInterval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      setExtractedData({
        fields: true,
        table: true,
        handwriting: true,
        stamp: true,
        signature: true
      });
    }
  }, [step]);

  const DocumentImage = () => (
    <div className={`relative w-full bg-white rounded-lg shadow-lg p-8 space-y-8 transition-all duration-500 ${step > 0 ? 'opacity-25 blur-sm' : ''}`}>
      {step === 0 && (
        <div 
          className="absolute inset-0 bg-blue-200 opacity-50 z-10 pointer-events-none"
          style={{
            clipPath: `inset(0 0 ${100 - scanProgress}% 0)`,
            transition: 'clip-path 0.02s linear'
          }}
        />
      )}
      <div className="p-4 rounded-lg border border-gray-200">
        <h2 className="text-purple-600 font-bold mb-2">FIELDS</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr><td className="font-semibold">Full Name</td><td>Vignesh Kalimuthu</td></tr>
            <tr><td className="font-semibold">Date Of Birth</td><td>01-10-1990</td></tr>
            <tr><td className="font-semibold">Country Of Birth</td><td>Germany</td></tr>
            <tr><td className="font-semibold">Email</td><td>hello@vignesh.com</td></tr>
          </tbody>
        </table>
      </div>
      <div className="p-4 rounded-lg border border-gray-200">
        <h2 className="text-purple-600 font-bold mb-2">TABLE</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Item</th><th className="p-2">Ordered</th><th className="p-2">Shipped</th><th className="p-2">Num.</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2">Hard drive</td><td className="p-2">125</td><td className="p-2">125</td><td className="p-2">34146684</td></tr>
            <tr><td className="p-2">Camera</td><td className="p-2">3000</td><td className="p-2">2500</td><td className="p-2">73460004</td></tr>
            <tr><td className="p-2">PDA</td><td className="p-2">14,000</td><td className="p-2">12,000</td><td className="p-2">25697005</td></tr>
            <tr><td className="p-2">PDA</td><td className="p-2">150</td><td className="p-2">150</td><td className="p-2">34877066</td></tr>
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1 p-4 rounded-lg border border-gray-200">
          <h2 className="text-purple-600 font-bold mb-2">HANDWRITING</h2>
          <p className="text-xs italic">I can declare that the goods are packed in accordance with the packaging guidelines. Fragile or special items are contained within a protective seal. If the seal is broken these goods must be inspected as soon as possible and then returned to us immediately.</p>
        </div>
        <div className="flex-1 flex space-x-4 p-4 rounded-lg border border-gray-200">
          <div className="flex-1">
            <h2 className="text-purple-600 font-bold mb-2">STAMP</h2>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
                <span className="text-green-500 text-sm">Verified</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-purple-600 font-bold mb-2">SIGNATURE</h2>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
                <span className="text-green-500 text-sm">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LLMProcessing = () => (
    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <Cpu className="w-24 h-24 text-blue-500 mx-auto mb-4" />
        <p className="text-xl font-semibold">Processing with {currentLLM}</p>
        <p className="text-md mt-2">Analyzing document structure and content</p>
        <p className="text-md">Identifying key information across various invoice formats</p>
      </div>
    </div>
  );

  const ExtractedData = () => (
    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Extracted Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-3 rounded">
            <h3 className="font-semibold">Fields</h3>
            <p>Name: Vignesh Kalimuthu</p>
            <p>DOB: 01-10-1990</p>
            <p>Country: Germany</p>
            <p>Email: hello@vignesh.com</p>
          </div>
          <div className="bg-blue-100 p-3 rounded">
            <h3 className="font-semibold">Table Data</h3>
            <p>4 items processed</p>
            <p>Total Ordered: 17,275</p>
            <p>Total Shipped: 14,775</p>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <h3 className="font-semibold">Handwriting</h3>
            <p>Declaration text recognized</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <h3 className="font-semibold">Verification</h3>
            <p>Stamp: Verified</p>
            <p>Signature: Verified</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DatabaseStorage = () => (
    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <Database className="w-24 h-24 text-purple-500 mx-auto mb-4" />
        <p className="text-xl font-semibold">Storing data in database...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Intelligent Document Processor</h1>
        <div className="flex justify-between items-center mb-4">
          <FileText className={`w-12 h-12 ${step >= 0 ? 'text-purple-500' : 'text-gray-300'}`} />
          <ArrowRight className={`w-12 h-12 ${step >= 1 ? 'text-blue-500' : 'text-gray-300'}`} />
          <Cpu className={`w-12 h-12 ${step >= 2 ? 'text-green-500' : 'text-gray-300'}`} />
          <ArrowRight className={`w-12 h-12 ${step >= 3 ? 'text-blue-500' : 'text-gray-300'}`} />
          <Database className={`w-12 h-12 ${step >= 4 ? 'text-green-500' : 'text-gray-300'}`} />
        </div>
        <div className="h-2 bg-gray-200 rounded mb-8">
          <div 
            className="h-2 bg-purple-500 rounded transition-all duration-500 ease-in-out"
            style={{ width: `${(step + 1) * 25}%` }}
          ></div>
        </div>
        <div className="relative">
          <DocumentImage />
          <LLMProcessing />
          <ExtractedData />
          <DatabaseStorage />
        </div>
        <div className="mt-8 text-center text-xl font-semibold">
          {step === 0 && <p>Scanning document... {scanProgress}%</p>}
          {step === 1 && <p>Processing with {currentLLM}...</p>}
          {step === 2 && <p>Extracting and processing information...</p>}
          {step === 3 && <p>Storing extracted data in database...</p>}
          {step === 4 && <p>Process complete!</p>}
        </div>
      </div>
    </div>
  );
};

export default IntelligentDocumentProcessor;
