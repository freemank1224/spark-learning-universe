
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AgeGroup = "6-8" | "9-12" | "13-15" | "16-18";

interface AgeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgeSelect: (age: AgeGroup) => void;
}

const ageGroups: { id: AgeGroup; title: string; description: string }[] = [
  {
    id: "6-8",
    title: "Explorers",
    description: "Fun visuals and simple challenges for young learners",
  },
  {
    id: "9-12",
    title: "Discoverers",
    description: "Interactive stories and basic coding challenges",
  },
  {
    id: "13-15",
    title: "Inventors",
    description: "More complex coding and project-based learning",
  },
  {
    id: "16-18",
    title: "Innovators",
    description: "Advanced projects and career preparation",
  },
];

const AgeSelectModal = ({ isOpen, onClose, onAgeSelect }: AgeSelectModalProps) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);

  const handleSelect = (age: AgeGroup) => {
    setSelectedAge(age);
  };

  const handleConfirm = () => {
    if (selectedAge) {
      onAgeSelect(selectedAge);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to SparkLearn!</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Help us personalize your learning experience by selecting your age group
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {ageGroups.map((group) => (
            <Card 
              key={group.id}
              className={`cursor-pointer transition-all ${
                selectedAge === group.id 
                  ? "border-2 border-apple-blue shadow-md" 
                  : "border hover:border-apple-gray hover:shadow-sm"
              }`}
              onClick={() => handleSelect(group.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle>{group.title}</CardTitle>
                <CardDescription className="text-sm">{group.id} years</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-apple-gray">{group.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedAge}
            className="w-full sm:w-auto px-8 bg-apple-blue hover:bg-blue-700 text-white"
          >
            Start My Adventure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeSelectModal;
