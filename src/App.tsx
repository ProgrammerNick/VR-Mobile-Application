import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthScreen } from "./components/AuthScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { StoreTab } from "./components/StoreTab";
import { FriendsTab } from "./components/FriendsTab";
import CommunityFocusedHome from "./components/CommunityFocusedHome";
import UserProfile from "./components/UserProfile";
import CommunityTab from "./components/EnhancedCommunityTab"; // Import enhanced CommunityTab
import { VRContentPreview } from "./components/VRContentPreview";
import { useVRContentData } from "./hooks/useVRContentData";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { storeItems } from "./data/storeItems";
import { getContent, getPurchases, purchaseContent } from "./services/content";
import { updateActivity } from "./services/activity";

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [vrContent, setVrContent] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [previewContent, setPreviewContent] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { getContentDetails } = useVRContentData();

  // Fetch VR content and user purchases on app load
  useEffect(() => {
    if (user) {
      fetchVRContent();
      fetchPurchases();
    }
  }, [user]);

  const fetchVRContent = async () => {
    try {
      const data = await getContent();
      setVrContent(data.content || []);
    } catch (error) {
      console.error("Error fetching VR content:", error);
      // Set some fallback content if server fails
      setVrContent([
        {
          id: "fallback-1",
          title: "VR Tutorial Island",
          description:
            "Learn the basics of VR interaction in this beginner-friendly experience.",
          category: "Tutorial",
          duration: "15 min",
          rating: 4.3,
          thumbnail:
            "https://images.unsplash.com/photo-1547930206-82ac0a7aa08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjB3b3JsZHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        },
      ]);
    }
  };

  const fetchPurchases = async () => {
    if (!user) return;
    try {
      const data = await getPurchases();
      setPurchases(data.purchases || []);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      // Set empty purchases array as fallback
      setPurchases([]);
    }
  };

  const handlePreview = async (id: string) => {
    if (!user) return;
    try {
      const details = getContentDetails(id);
      if (details) {
        setPreviewContent(details);
        setIsPreviewOpen(true);
        await updateActivity("Previewing VR experience", id);
      } else {
        toast.error("Content details not available");
      }
    } catch (error) {
      console.error("Error opening preview:", error);
      // Still try to show preview even if activity update fails
      const details = getContentDetails(id);
      if (details) {
        setPreviewContent(details);
        setIsPreviewOpen(true);
      } else {
        toast.error("Preview not available");
      }
    }
  };

  const handlePlay = async (id: string) => {
    if (!user) return;
    try {
      // Check if content is purchased (if it has a price)
      const content = vrContent.find((c: any) => c.id === id);
      if (content?.price && !purchases.includes(parseInt(content.id, 10))) {
        toast.error("Purchase required", {
          description: "You need to purchase this content to play it",
        });
        return;
      }

      await updateActivity("Playing VR experience", id);
      toast.success("Starting VR experience...", {
        description: "Make sure your headset is connected",
      });
    } catch (error) {
      console.error("Error starting VR experience:", error);
      toast.success("Starting VR experience...", {
        description: "Make sure your headset is connected",
      });
    }
  };

  const handlePurchase = async (id: string, price: number) => {
    if (!user) return;
    try {
      // Find the content item to get the correct contentId
      const contentItem = vrContent.find((c: any) => c.id === id);
      if (!contentItem) {
        throw new Error("Content not found");
      }

      // Convert contentId to number for database operations
      const contentId = parseInt(contentItem.id, 10);
      if (isNaN(contentId)) {
        throw new Error("Invalid content ID");
      }

      await purchaseContent(contentId, price);
      await fetchPurchases(); // Refresh purchases
      toast.success("Content purchased successfully!", {
        description: "You can now access this VR experience",
      });
    } catch (error: any) {
      console.error("Error purchasing content:", error);
      toast.error("Purchase failed", {
        description: error.message || "Unable to process purchase",
      });
    }
  };

  const handleBulkPurchase = async () => {
    if (!user) return;
    try {
      for (const item of storeItems) {
        const contentId = parseInt(item.contentId, 10);
        if (isNaN(contentId)) {
          console.error("Invalid content ID for item:", item);
          continue;
        }
        if (!purchases.includes(contentId)) {
          await purchaseContent(contentId, item.price);
        }
      }
      await fetchPurchases(); // Refresh purchases
      toast.success("Premium bundle purchased successfully!", {
        description: "You can now access all bundled VR experiences",
      });
    } catch (error: any) {
      console.error("Error purchasing bundle:", error);
      toast.error("Bundle purchase failed", {
        description: error.message || "Unable to process bundle purchase",
      });
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading VR Companion...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const renderActiveTab = () => {
    const tabProps = {
      onPreview: handlePreview,
      onPlay: handlePlay,
      onPurchase: handlePurchase,
      onBulkPurchase: handleBulkPurchase,
      vrContent,
      purchases,
      profile,
    };

    switch (activeTab) {
      case "home":
        return <CommunityFocusedHome onPlay={handlePlay} />;
      case "store":
        return <StoreTab {...tabProps} />;
      case "friends":
        return <FriendsTab />;
      case "community":
        return <CommunityTab />;
      case "profile":
        return <UserProfile />; // Use new UserProfile component
      default:
        return <CommunityFocusedHome onPlay={handlePlay} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{renderActiveTab()}</main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* VR Content Preview Modal */}
      <VRContentPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        content={previewContent}
        purchased={
          previewContent
            ? purchases.includes(parseInt(previewContent.id, 10))
            : false
        }
        onPlay={handlePlay}
        onPurchase={handlePurchase}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
