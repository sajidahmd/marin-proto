
"use client";

import StatCard from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Ship, Users, ListChecks, MessageSquare, UserPlus } from 'lucide-react';

export default function DashboardHomePage() {
  const recentActivities = [
    { icon: Briefcase, text: 'New company "Oceanic Ltd" applied for membership.', color: 'text-blue-500' },
    { icon: Ship, text: 'Vessel "Sea Queen" status updated to "Under Maintenance".', color: 'text-orange-500' },
    { icon: UserPlus, text: 'Employee "John Doe" assigned to "Sea Queen".', color: 'text-green-500' },
    { icon: ListChecks, text: 'Quotation #QTN-2024-07-001 approved.', color: 'text-purple-500' },
    { icon: MessageSquare, text: 'New interaction logged for "Global Exporters".', color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      {/* The h1 for Dashboard title is now part of DashboardHeader or implicitly handled by breadcrumb */}
      {/* <h1 className="text-3xl font-bold text-foreground">Dashboard</h1> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Companies" value="12" icon={Briefcase} />
        <StatCard title="Vessels" value="34" icon={Ship} />
        <StatCard title="Employees" value="87" icon={Users} />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className={`p-2 bg-muted rounded-full ${activity.color}`}>
                  <activity.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground pt-1">{activity.text}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

    