import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink, CheckCircle2 } from 'lucide-react';

const schemes = [
  {
    name: 'PM-KISAN',
    description: 'Income support of ₹6,000 per year to farmer families',
    eligibility: 'Small and marginal farmers',
    benefit: '₹6,000/year in 3 installments',
    deadline: 'Ongoing',
    status: 'active',
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing and recommendations',
    eligibility: 'All farmers',
    benefit: 'Free soil health card every 3 years',
    deadline: 'Ongoing',
    status: 'active',
  },
  {
    name: 'Kisan Credit Card',
    description: 'Easy credit access for farmers',
    eligibility: 'All farmers',
    benefit: 'Loan up to ₹3 lakh at 4% interest',
    deadline: 'Ongoing',
    status: 'active',
  },
];

export default function Subsidies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Government Schemes & Subsidies</h1>
        <p className="text-gray-600">Apply for farm subsidies, loans, and grants</p>
      </div>

      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <Card key={idx} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{scheme.name}</h3>
                      <Badge className="bg-green-100 text-green-700">{scheme.status}</Badge>
                    </div>
                    <p className="text-gray-600 mt-1">{scheme.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="text-gray-500">Eligibility: <span className="text-gray-700">{scheme.eligibility}</span></span>
                      <span className="text-gray-500">Benefit: <span className="text-green-600 font-medium">{scheme.benefit}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
