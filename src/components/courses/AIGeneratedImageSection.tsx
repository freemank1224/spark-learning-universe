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
    <div className="w-full sticky top-0 z-30">
      <div className="relative overflow-hidden transition-all duration-300 ease-in-out h-[28vh]">
        {/* 背景图片 */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: `url('${imageUrl}')`,
          }}
        />
        
        {/* 渐变遮罩 - 增强底部对比度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-theme-dark/90"></div>
        
        {/* 放大按钮 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-4 right-4 bg-theme-dark/40 hover:bg-theme-dark/60 backdrop-blur-sm border-theme-stone/30 rounded-full shadow-lg"
            >
              <Image className="h-4 w-4 text-theme-cream" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-theme-dark border-theme-stone/20">
            <DialogHeader>
              <DialogTitle className="text-theme-cream">飞行原理研究</DialogTitle>
              <DialogDescription className="text-theme-stone">
                达芬奇工作室 - 基于您当前学习内容动态生成的场景。
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
                该图像展示了列奥纳多·达·芬奇在佛罗伦萨的工作室，他在此进行了开创性的飞行和空气动力学研究。
                通过观察鸟类和自然，达芬奇设计了多种飞行机器的概念图。
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* 章节信息 */}
        <div className="absolute left-0 right-0 bottom-0 backdrop-blur-md bg-theme-dark/60 transition-all duration-300">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-theme-cream transition-all duration-300">
                  与达芬奇一起学习
                </h2>
                <div className="flex items-center space-x-2 text-theme-stone text-sm">
                  <span>文艺复兴时代 • 第二章：飞行的科学</span>
                </div>
              </div>
              <div className="text-xs text-theme-stone bg-theme-navy/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                预计用时: 45 分钟
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedImageSection;
