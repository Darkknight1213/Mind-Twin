import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalNav from "./components/GlobalNav";
import FloatingChatButton from "./components/FloatingChatButton";
import QuickActionsMenu from "./components/QuickActionsMenu";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import LessonDetailNew from "./pages/LessonDetailNew";
import LessonDetail2 from "./pages/LessonDetail2";
import LessonDetail3 from "./pages/LessonDetail3";
import Journal from "./pages/Journal";
import TherapyLibrary from "./pages/TherapyLibrary";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalNav />
        <FloatingChatButton />
        <QuickActionsMenu />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/1" element={<LessonDetailNew />} />
          <Route path="/lesson/2" element={<LessonDetail2 />} />
          <Route path="/lesson/3" element={<LessonDetail3 />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/library" element={<TherapyLibrary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
