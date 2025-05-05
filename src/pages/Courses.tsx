import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Courses = () => {
  const coursesList = [
    {
      id: 1,
      title: "编程基础入门课程",
      description: "通过互动练习学习编程基础概念，适合初学者",
      path: "/course1",
    },
    {
      id: 2,
      title: "计算思维与问题解决",
      description: "培养解决复杂问题的能力，提升逻辑思维能力",
      path: "/course2",
    },
    {
      id: 3,
      title: "创意编程项目",
      description: "学习创建自己的互动游戏和动画，释放创造力",
      path: "/course3",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">课程目录</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesList.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">课程预览图</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={course.path}>开始学习</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;