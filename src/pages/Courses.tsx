
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, Search } from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CourseCategory = "all" | "programming" | "science" | "creativity";

interface CourseItem {
  id: number;
  title: string;
  description: string;
  path: string;
  image?: string;
  category: CourseCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
}

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const coursesList: CourseItem[] = [
    {
      id: 1,
      title: "编程基础入门课程",
      description: "通过互动练习学习编程基础概念，适合初学者",
      path: "/course1",
      category: "programming",
      difficulty: "beginner",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "计算思维与问题解决",
      description: "培养解决复杂问题的能力，提升逻辑思维能力",
      path: "/course2",
      category: "science",
      difficulty: "intermediate",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "创意编程项目",
      description: "学习创建自己的互动游戏和动画，释放创造力",
      path: "/course3",
      category: "creativity",
      difficulty: "intermediate",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
  ];

  const filteredCourses = coursesList.filter(course => {
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-theme-dark">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2 text-theme-cream">探索课程</h1>
          <p className="text-theme-stone">发现适合您的学习旅程，从基础知识到高级概念，根据您的兴趣和技能水平定制学习路径。</p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-stone" size={18} />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-theme-dark border border-theme-stone/30 rounded-md text-theme-cream focus:ring-1 focus:ring-theme-glow/50 focus:outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={`${
                activeCategory === "all" ? 'bg-theme-navy text-theme-cream' : 'bg-transparent border-theme-stone/30 text-theme-stone'
              }`}
            >
              全部
            </Button>
            <Button
              variant={activeCategory === "programming" ? "default" : "outline"}
              onClick={() => setActiveCategory("programming")}
              className={`${
                activeCategory === "programming" ? 'bg-theme-navy text-theme-cream' : 'bg-transparent border-theme-stone/30 text-theme-stone'
              }`}
            >
              编程
            </Button>
            <Button
              variant={activeCategory === "science" ? "default" : "outline"}
              onClick={() => setActiveCategory("science")}
              className={`${
                activeCategory === "science" ? 'bg-theme-navy text-theme-cream' : 'bg-transparent border-theme-stone/30 text-theme-stone'
              }`}
            >
              科学
            </Button>
            <Button
              variant={activeCategory === "creativity" ? "default" : "outline"}
              onClick={() => setActiveCategory("creativity")}
              className={`${
                activeCategory === "creativity" ? 'bg-theme-navy text-theme-cream' : 'bg-transparent border-theme-stone/30 text-theme-stone'
              }`}
            >
              创意
            </Button>
            <Button size="icon" variant="outline" className="bg-transparent border-theme-stone/30 text-theme-stone">
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-theme-dark/70 border-theme-stone/20 hover:border-theme-stone/40 transition-all duration-200 hover:shadow-lg">
              <div className="h-48 overflow-hidden rounded-t-md">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full bg-theme-navy/20 flex items-center justify-center">
                    <BookOpen className="text-theme-stone h-12 w-12" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-theme-cream">{course.title}</CardTitle>
                <CardDescription className="text-theme-stone">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 rounded-full bg-theme-navy/30 text-theme-cream text-xs">
                    {course.difficulty === "beginner" ? "入门" : 
                     course.difficulty === "intermediate" ? "进阶" : "高级"}
                  </span>
                  <div className="flex items-center">
                    <span className="text-theme-gold">★</span>
                    <span className="ml-1 text-theme-stone">{course.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-theme-navy hover:bg-theme-navy/90">
                  <Link to={course.path}>开始学习</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-theme-stone text-lg">没有找到匹配的课程，请尝试不同的搜索条件。</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
