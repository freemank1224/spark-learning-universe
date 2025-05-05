
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface AIGeneratedImageSectionProps {
  imageUrl: string;
}

const AIGeneratedImageSection = ({ imageUrl }: AIGeneratedImageSectionProps) => {
  return (
    <div className="w-full h-[30vh] relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-bg"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          transform: 'translateY(0px)'
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 bg-theme-dark/40 hover:bg-theme-dark/60 backdrop-blur-sm border-theme-stone/30"
            >
              <Image className="h-4 w-4 text-theme-cream" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-theme-dark border-theme-stone/20">
            <DialogHeader>
              <DialogTitle className="text-theme-cream">AI-Generated Scene</DialogTitle>
              <DialogDescription className="text-theme-stone">
                This image is dynamically generated based on your current learning context.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <div className="rounded-md overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="AI generated scene visualization" 
                  className="w-full h-auto" 
                />
              </div>
              <p className="text-sm text-theme-stone">
                The image depicts Leonardo da Vinci's workshop in Florence, where he conducted 
                his pioneering studies on flight and aerodynamics.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-theme-dark"></div>
      
      <div className="absolute bottom-4 left-4 backdrop-blur-md bg-theme-dark/40 px-3 py-2 rounded-md border border-theme-stone/20">
        <span className="text-xs font-medium text-theme-cream">Renaissance Era • Chapter 2</span>
      </div>
    </div>
  );
};

export default AIGeneratedImageSection;
