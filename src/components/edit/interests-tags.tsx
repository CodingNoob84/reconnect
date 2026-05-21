// components/edit/interests-tags.tsx
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface InterestsTagsProps {
  field: any;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "Photography",
  "Hiking",
  "Traveling",
  "Reading",
  "Cooking",
  "Gaming",
  "Music",
  "Sports",
  "Yoga",
  "Meditation",
  "Writing",
  "Painting",
  "Gardening",
  "Cycling",
  "Swimming",
  "Dancing",
  "Volunteering",
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "DevOps",
  "Mobile Development",
  "UI/UX Design",
  "Product Management",
  "Digital Marketing",
  "Entrepreneurship",
  "Leadership",
  "Open Source",
  "Research",
  "Teaching",
  "Mentoring",
];

export const InterestsTags = ({
  field,
  suggestions = DEFAULT_SUGGESTIONS,
}: InterestsTagsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const interests = field.state.value || [];

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      field.handleChange([...interests, trimmed]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeInterest = (interestToRemove: string) => {
    field.handleChange(interests.filter((i: string) => i !== interestToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addInterest(inputValue);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      interests.length > 0
    ) {
      removeInterest(interests[interests.length - 1]);
    }
  };

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !interests.includes(s),
  );

  return (
    <div className="space-y-3">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {interests.map((interest: string, index: number) => (
            <Badge
              key={`${interest}-${index}`}
              variant="secondary"
              className="text-xs py-1.5 px-3 gap-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {interest}
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="hover:text-destructive transition-colors ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="relative">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type an interest and press Enter or comma..."
              className="rounded-xl text-xs font-medium border-border/60 flex-1"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => addInterest(inputValue)}
              className="rounded-xl text-xs gap-1"
              disabled={!inputValue.trim()}
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border border-border/60 rounded-xl shadow-lg max-h-48 overflow-auto">
              <div className="p-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                  Suggested Interests
                </p>
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addInterest(suggestion)}
                    className="w-full text-left px-2 py-1.5 text-xs rounded-lg hover:bg-accent transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground mt-2">
          Press Enter or comma to add. Click on tags to remove.
        </p>
      </div>
    </div>
  );
};
