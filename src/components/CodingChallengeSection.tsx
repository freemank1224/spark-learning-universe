
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Code, Lightbulb, PanelLeft, PanelRight } from 'lucide-react';

const challengeCode = `import turtle
import math

# Create a turtle object
flying_machine = turtle.Turtle()
flying_machine.speed(0)
screen = turtle.Screen()
screen.bgcolor("skyblue")

# Function to draw wings
def draw_wing(t, size):
    t.pendown()
    t.right(60)
    
    # Draw wing outline
    for i in range(10):
        t.forward(size/10)
        t.left(5)
    
    for i in range(10):
        t.forward(size/20)
        t.left(4)
        
    for i in range(10):
        t.forward(size/15)
        t.left(6)
    
    t.left(140)
    t.forward(size * 0.8)
    t.penup()
    
# Function to draw Leonardo's flying machine
def draw_flying_machine():
    # Draw the central frame
    flying_machine.penup()
    flying_machine.goto(0, -50)
    flying_machine.pendown()
    flying_machine.color("brown")
    flying_machine.begin_fill()
    flying_machine.circle(50)
    flying_machine.end_fill()
    
    # Draw the left wing
    flying_machine.penup()
    flying_machine.goto(0, 0)
    flying_machine.color("tan")
    flying_machine.begin_fill()
    draw_wing(flying_machine, 200)
    flying_machine.end_fill()
    
    # Draw the right wing
    flying_machine.penup()
    flying_machine.goto(0, 0)
    flying_machine.setheading(0)
    flying_machine.color("tan")
    flying_machine.begin_fill()
    flying_machine.left(180)
    draw_wing(flying_machine, 200)
    flying_machine.end_fill()
    
    # Hide the turtle
    flying_machine.hideturtle()

# Call the function
draw_flying_machine()

# Your challenge: Add the propeller to the flying machine!
# Hint: Use a loop to draw a circular propeller at the center

# Write your code here:
def draw_propeller():
    # Add your code to draw the propeller
    flying_machine.penup()
    flying_machine.goto(0, 0)
    flying_machine.pendown()
    flying_machine.color("black")
    
    # TODO: Complete the propeller code
    
# Call your function
draw_propeller()

turtle.exitonclick()`;

const CodingChallengeSection = () => {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn by Coding
          </h2>
          <p className="text-lg text-apple-gray">
            Apply concepts through interactive programming challenges designed for all skill levels
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Card className="border shadow-lg">
            <CardHeader className="border-b bg-apple-light-gray">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Da Vinci's Flying Machine Challenge</CardTitle>
                  <CardDescription>Recreate and improve Leonardo's famous aerial invention</CardDescription>
                </div>
                <Tabs defaultValue="python" className="w-[200px]">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="blockly">Blockly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="flex h-[500px]">
                {!isPanelCollapsed && (
                  <div className="w-1/3 border-r p-4 bg-white overflow-y-auto">
                    <h4 className="font-bold text-lg mb-4">Instructions</h4>
                    
                    <div className="prose max-w-none text-sm">
                      <p>
                        In this challenge, you will work with Leonardo da Vinci's flying machine design. 
                        We've already created the basic structure of the ornithopter.
                      </p>
                      
                      <h5 className="font-semibold mt-4 mb-2">Your tasks:</h5>
                      <ol className="list-decimal pl-4 space-y-2">
                        <li>Understand the existing code that draws the wings and frame</li>
                        <li>Complete the <code>draw_propeller()</code> function to add a propeller to the flying machine</li>
                        <li>Add a feature that makes the wings flap (advanced)</li>
                      </ol>
                      
                      <h5 className="font-semibold mt-4 mb-2">Concepts used:</h5>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Functions and parameters</li>
                        <li>Loops and conditionals</li>
                        <li>Basic geometry and coordinates</li>
                        <li>Turtle graphics</li>
                      </ul>
                      
                      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                        <div className="flex">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Hint:</p>
                            <p>
                              For the propeller, use a loop with the <code>turtle.forward()</code> and <code>turtle.left()</code> commands 
                              to create a circular pattern.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={`${isPanelCollapsed ? 'w-1/2' : 'w-1/3'} border-r`}>
                  <div className="h-full bg-gray-900 text-white p-4 font-mono text-sm overflow-auto">
                    <pre>{challengeCode}</pre>
                  </div>
                </div>
                
                <div className={`${isPanelCollapsed ? 'w-1/2' : 'w-1/3'} relative bg-white`}>
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-64 h-64 bg-sky-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <p className="text-apple-gray">Code output preview</p>
                      </div>
                      <Button className="bg-apple-blue hover:bg-blue-700 text-white">
                        <Play className="mr-2 h-4 w-4" />
                        Run Code
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t p-4 bg-gray-50 flex justify-between">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
              >
                {isPanelCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
              </Button>
              
              <div className="space-x-2">
                <Button variant="outline">
                  <Code className="mr-2 h-4 w-4" />
                  Get AI Help
                </Button>
                <Button className="bg-apple-blue hover:bg-blue-700 text-white">
                  Submit Solution
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CodingChallengeSection;
