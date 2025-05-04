
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from 'lucide-react';

interface Standard {
  code: string;
  description: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  ngssStandards: Standard[];
  cstaStandards: Standard[];
}

const courseModules: Record<string, CourseModule> = {
  renaissance: {
    id: "renaissance",
    title: "Renaissance Revolution with Da Vinci",
    description: "Join Leonardo da Vinci to explore the convergence of art and science during the Renaissance. Design flying machines, study human anatomy, and learn the principles of perspective drawing while coding interactive simulations.",
    ngssStandards: [
      { code: "MS-ETS1-1", description: "Define criteria and constraints of a design problem" },
      { code: "MS-ETS1-2", description: "Evaluate competing design solutions" },
      { code: "HS-PS2-1", description: "Analyze data to support Newton's Second Law" }
    ],
    cstaStandards: [
      { code: "2-AP-10", description: "Use flowcharts and/or pseudocode to address complex problems" },
      { code: "2-AP-13", description: "Decompose problems and subproblems into parts" },
      { code: "3A-AP-17", description: "Recursively solve problems" }
    ]
  },
  industrial: {
    id: "industrial",
    title: "Industrial Revolution with Faraday",
    description: "Discover the principles of electricity and magnetism with Michael Faraday. Build virtual circuits, explore electromagnetic induction, and develop simulations of motors and generators.",
    ngssStandards: [
      { code: "MS-PS2-3", description: "Ask questions about data to determine factors affecting electric force" },
      { code: "MS-PS2-5", description: "Magnetic fields and their relation to electric currents" },
      { code: "HS-PS3-5", description: "Develop and use models of energy transfer" }
    ],
    cstaStandards: [
      { code: "2-AP-11", description: "Create clearly named variables with appropriate types" },
      { code: "2-AP-16", description: "Incorporate existing code or media into programs" },
      { code: "3A-AP-14", description: "Use lists to simplify solutions and generalize computation problems" }
    ]
  },
  digital: {
    id: "digital",
    title: "Computing Pioneers with Ada Lovelace",
    description: "Travel back to the origins of computing with Ada Lovelace. Learn about algorithms, program flow control, and create your own calculator while exploring the foundations of computer science.",
    ngssStandards: [
      { code: "MS-ETS1-4", description: "Develop a model for iterative testing" },
      { code: "HS-ETS1-2", description: "Design solutions to complex real-world problems" },
      { code: "HS-ETS1-3", description: "Evaluate solutions to complex real-world problems" }
    ],
    cstaStandards: [
      { code: "2-AP-12", description: "Design and develop programs that utilize control structures" },
      { code: "2-AP-14", description: "Create procedures with parameters to organize code" },
      { code: "3A-AP-16", description: "Design and implement algorithms" }
    ]
  }
};

const CoursePreviewSection = () => {
  const [activeModule, setActiveModule] = useState<string>("renaissance");
  const currentModule = courseModules[activeModule];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Course Previews</h2>
          
          <Tabs defaultValue="renaissance" className="w-full" onValueChange={setActiveModule}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="renaissance">Renaissance</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
              <TabsTrigger value="digital">Digital Era</TabsTrigger>
            </TabsList>
            
            {Object.entries(courseModules).map(([id, module]) => (
              <TabsContent key={id} value={id} className="focus:outline-none">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-64 bg-apple-light-gray flex items-center justify-center">
                    <p className="text-apple-gray">Course banner image for {module.title}</p>
                  </div>
                  
                  <div className="glass-effect p-8">
                    <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                    <p className="text-apple-gray mb-6">{module.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-3">NGSS Standards</h4>
                        <ul className="space-y-3">
                          {module.ngssStandards.map((standard) => (
                            <li key={standard.code} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-apple-blue mr-2 flex-shrink-0 mt-0.5" />
                              <span>
                                <span className="font-medium">{standard.code}:</span> {standard.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-3">CSTA Standards</h4>
                        <ul className="space-y-3">
                          {module.cstaStandards.map((standard) => (
                            <li key={standard.code} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-apple-purple mr-2 flex-shrink-0 mt-0.5" />
                              <span>
                                <span className="font-medium">{standard.code}:</span> {standard.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="bg-apple-blue hover:bg-blue-700 text-white px-8">
                        Start Module
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CoursePreviewSection;
