
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star, ThumbsUp } from "lucide-react";
import { Review } from "@/types/Vehicle";
import { vehicleReviews } from "@/data/vehicles";

interface VehicleReviewsProps {
  vehicleId: string;
  onAddReview?: (rating: number, comment: string) => void;
}

const VehicleReviews = ({ vehicleId, onAddReview }: VehicleReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(
    vehicleReviews.filter(review => review.vehicleId === vehicleId)
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmitReview = () => {
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new review
    const newReview: Review = {
      id: `r-${Date.now()}`,
      vehicleId,
      userId: localStorage.getItem("userId") || "guest-user",
      userName: localStorage.getItem("userName") || "Guest User",
      rating,
      comment,
      date: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      // Add to local state
      setReviews(prev => [newReview, ...prev]);
      
      // Call the onAddReview callback if provided
      if (onAddReview) {
        onAddReview(rating, comment);
      }
      
      // Reset form
      setRating(5);
      setComment("");
      setIsSubmitting(false);
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      });
    }, 1000);
  };
  
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Reviews and Ratings</h2>
      
      {isLoggedIn && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="review-comment">
              Your Review
            </label>
            <Textarea
              id="review-comment"
              placeholder="Share your experience with this vehicle..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <Button
            onClick={handleSubmitReview}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="font-medium mr-2">{review.userName}</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {formatDate(review.date)}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Star className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
          <p className="text-gray-500">Be the first to review this vehicle!</p>
        </div>
      )}
    </div>
  );
};

export default VehicleReviews;
