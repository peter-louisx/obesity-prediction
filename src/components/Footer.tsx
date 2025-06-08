import { Heart } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            HealthPredict - AI-Powered Obesity Risk Assessment
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 HealthPredict. All rights reserved. This tool is for
            informational purposes only and should not replace professional
            medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
