import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600 font-medium">{rating}/5</span>
    </div>
  );
};
export default StarRating;
