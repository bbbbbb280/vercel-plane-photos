import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Card, CardContent } from "./components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Dialog, DialogTrigger, DialogContent } from "./components/ui/dialog";

const categories = {
  "Commercial": [
    { src: "/planes/commercial1.jpg", alt: "Boeing 747" },
    { src: "/planes/commercial2.jpg", alt: "Airbus A320" }
  ],
  "Military": [
    { src: "/planes/military1.jpg", alt: "F-22 Raptor" },
    { src: "/planes/military2.jpg", alt: "F-16 Falcon" }
  ],
  "Private": [
    { src: "/planes/private1.jpg", alt: "Gulfstream G650" },
    { src: "/planes/private2.jpg", alt: "Cessna Citation" }
  ]
};

export default function PlanePortfolio() {
  const [activeTab, setActiveTab] = useState("Home");
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("");

  const filteredCategories = Object.fromEntries(
    Object.entries(categories).map(([key, images]) => [
      key,
      images.filter(img => img.alt.toLowerCase().includes(filter.toLowerCase()))
    ])
  );

  return (
    <main className={\`min-h-screen p-6 max-w-6xl mx-auto transition-colors \${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"}\`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center w-full">Plane Photography Portfolio</h1>
        <div className="absolute right-6">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mx-auto block mb-4">Select Page</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}>
          <DropdownMenuItem onClick={() => setActiveTab("Home")}>Home</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("Gallery")}>Gallery</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("List")}>Gallery List</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {activeTab === "Home" && (
        <div className="text-center mt-10">
          <p className="text-xl">Welcome to my portfolio of plane photography, featuring commercial, military, and private aircraft. Use the menu to explore.</p>
        </div>
      )}

      {activeTab === "Gallery" && (
        <>
          <input
            type="text"
            placeholder="Search planes..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={\`block w-full mb-6 p-2 rounded-lg border \${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-900"}\`}
          />
          <Tabs defaultValue="Commercial" className="w-full">
            <TabsList className="flex justify-center mb-6 gap-4">
              {Object.keys(categories).map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(filteredCategories).map(([category, images]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Card className={\`rounded-2xl overflow-hidden shadow-lg \${darkMode ? "bg-gray-900" : "bg-white"}\`}>
                          <CardContent className="p-0">
                            <img src={img.src} alt={img.alt} className="w-full h-60 object-cover cursor-pointer" />
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-transparent border-none shadow-none">
                        <img src={img.src} alt={img.alt} className="w-full h-auto rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}

      {activeTab === "List" && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">All Galleries</h2>
          <ul className="list-disc pl-6 space-y-2">
            {Object.keys(categories).map((category) => (
              <li key={category}>{category} – {categories[category].length} photo(s)</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
