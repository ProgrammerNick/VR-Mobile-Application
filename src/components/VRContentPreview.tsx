import { useEffect, useState } from "react";
import {
  X,
  Play,
  Star,
  Clock,
  Download,
  Users,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface VRContentDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  developer: string;
  category: string;
  duration: string;
  rating: number;
  totalRatings: number;
  price?: number;
  thumbnails: string[];
  features: string[];
  requirements: string[];
  ageRating: string;
  releaseDate: string;
  fileSize: string;
  reviews: Review[];
  screenshots: string[];
}

interface VRContentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  content: VRContentDetails | null;
  purchased: boolean;
  onPlay: (id: string) => void;
  onPurchase: (id: string, price: number) => void;
}

export function VRContentPreview({
  isOpen,
  onClose,
  content,
  purchased,
  onPlay,
  onPurchase,
}: VRContentPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">(
    "overview"
  );

  if (!content) return null;

  const allImages = [content.thumbnails[0], ...content.screenshots];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const getRatingDistribution = () => {
    if (!content) return [0, 0, 0, 0, 0];
    const { rating, totalRatings } = content;
    const distribution = [0, 0, 0, 0, 0];

    // A simple algorithm to create a plausible rating distribution
    const fiveStarRatings = Math.round(totalRatings * (rating / 5));
    distribution[4] = fiveStarRatings;

    const fourStarRatings = Math.round((totalRatings - fiveStarRatings) * 0.5);
    distribution[3] = fourStarRatings;

    const threeStarRatings = Math.round(
      (totalRatings - fiveStarRatings - fourStarRatings) * 0.3
    );
    distribution[2] = threeStarRatings;

    const twoStarRatings = Math.round(
      (totalRatings - fiveStarRatings - fourStarRatings - threeStarRatings) *
        0.2
    );
    distribution[1] = twoStarRatings;

    const oneStarRatings =
      totalRatings -
      fiveStarRatings -
      fourStarRatings -
      threeStarRatings -
      twoStarRatings;
    distribution[0] = oneStarRatings;

    return distribution.reverse();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setCurrentImageIndex(0);
        onClose();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col overflow-auto">
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <DialogHeader className="flex-row items-center justify-between p-4 border-b">
            <h2 className="text-xl">{content.title}</h2>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Image Gallery */}
            <div className="relative h-64 bg-black">
              <ImageWithFallback
                src={allImages[currentImageIndex]}
                alt={content.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Content Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{content.category}</Badge>
                    <Badge variant="outline">{content.ageRating}</Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(content.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{content.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({content.totalRatings} ratings)
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    By {content.developer} • Released {content.releaseDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                {content.price && !purchased ? (
                  <>
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => onPurchase(content.id, content.price)}
                    >
                      Purchase
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => onPlay(content.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Trailer
                    </Button>
                  </>
                ) : purchased ? (
                  <>
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => onPlay(content.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => onPlay(content.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Free
                  </Button>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm">{content.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm">Single Player</p>
                  <p className="text-xs text-muted-foreground">Mode</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm">{content.fileSize}</p>
                  <p className="text-xs text-muted-foreground">Size</p>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "reviews"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({content.totalRatings})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="mb-2">About This Experience</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {content.longDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="mb-3">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {content.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="mb-3">System Requirements</h3>
                    <div className="space-y-1">
                      {content.requirements.map((req, index) => (
                        <p
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {req}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Rating Overview */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-3xl mb-1">{content.rating}</div>
                          <div className="flex justify-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(content.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {content.totalRatings} ratings
                          </p>
                        </div>

                        <div className="flex-1">
                          {getRatingDistribution().map((count, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 mb-1"
                            >
                              <span className="text-sm w-2">{5 - index}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <Progress
                                value={(count / content.totalRatings) * 100}
                                className="flex-1 h-2"
                              />
                              <span className="text-sm text-muted-foreground w-8">
                                {count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {content.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {review.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">
                                  {review.username}
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {review.comment}
                              </p>
                              <button className="text-xs text-muted-foreground hover:text-foreground">
                                👍 Helpful ({review.helpful})
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
