import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Footer: React.FC = () => {
  const {
    t
  } = useTranslation();
  return <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/lovable-uploads/903c5086-f6a7-42aa-a254-a6621d3600bf.png" alt="PropertyEval Logo" className="h-8 w-8" />
              <h3 className="text-lg font-bold text-foreground">OpenHome

            </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Professional property valuation and real estate investigation services. 
              Get accurate estimates and comprehensive property analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-muted-foreground hover:text-primary transition-colors">
                  Get Estimate
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>contact@propertyeval.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Real Estate Ave<br />Property City, PC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2024 OpenHouse. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;