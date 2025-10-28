"use client";

import RecievedRequest from "@/components/profile/requests/RecievedRequest";
import SentRequest from "@/components/profile/requests/sentRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox, Send } from "lucide-react";

export default function RequestsPage() {
  return (
    //<div className="max-w-md mx-auto p-3">
    <div className="grid-cols3 xl:grid-cols-3">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Follow Requests</h1>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="w-fit gap-2">
          <TabsTrigger value="received">
            <Inbox className="mr-2 h-4 w-4" />
            Received
          </TabsTrigger>
          <TabsTrigger value="sent">
            <Send className="mr-2 h-4 w-4" />
            Sent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <RecievedRequest />
        </TabsContent>

        <TabsContent value="sent">
          <SentRequest />
        </TabsContent>
      </Tabs>
    </div>
  );
}
