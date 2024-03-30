"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";


const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  }
]
const DashboardPage = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h1>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartes AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-23 space-y-4">
        {tools.map((tool)=>(
          <Card key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.color)}>
                <tool.icon className={cn("w-8 h-8", tool.bgColor)} /> 
              </div>
            </div>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;