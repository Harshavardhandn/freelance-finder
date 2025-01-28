import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Freelancer {
  id: string;
  name: string;
  expertise: string;
  skills: string[];
  budget: number;
  rating: number;
  image: string;
}

const SKILLS = [
  "React", "Node.js", "UI/UX", "React Native", "Android", "iOS",
  "Content Creation"
];

const ADDITIONAL_SKILLS = [
  "Graphic Design", "Machine Learning", "Data Science",
  "AWS", "DevOps", "Blockchain", "Game Design", "Cybersecurity", "3D Animation"
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Expert"];

const FREELANCERS: Freelancer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    expertise: "Frontend Development",
    skills: ["React", "UI/UX", "React Native"],
    budget: 75,
    rating: 4.8,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Michael Chen",
    expertise: "Full Stack Development",
    skills: ["React", "Node.js", "AWS"],
    budget: 95,
    rating: 4.9,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Emma Davis",
    expertise: "UI/UX Design",
    skills: ["UI/UX", "Graphic Design", "Content Creation"],
    budget: 65,
    rating: 4.7,
    image: "/placeholder.svg"
  }
];

const FreelancerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [budget, setBudget] = useState([200]);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const displayedSkills = showAllSkills ? [...SKILLS, ...ADDITIONAL_SKILLS] : SKILLS;

  const filteredFreelancers = FREELANCERS.filter((freelancer) => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => freelancer.skills.includes(skill));
    
    const matchesBudget = freelancer.budget <= budget[0];

    return matchesSearch && matchesSkills && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Freelancers</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Input
                type="text"
                placeholder="Search by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-6"
              />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Skills</h3>
                <div className="grid grid-cols-1 gap-2">
                  {displayedSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSkills([...selectedSkills, skill]);
                          } else {
                            setSelectedSkills(selectedSkills.filter(s => s !== skill));
                          }
                        }}
                      />
                      <label htmlFor={skill} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {skill}
                      </label>
                    </div>
                  ))}
                  {!showAllSkills && (
                    <button
                      onClick={() => setShowAllSkills(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                    >
                      + More
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Experience Level</h3>
                <div className="grid grid-cols-1 gap-2">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLevels([...selectedLevels, level]);
                          } else {
                            setSelectedLevels(selectedLevels.filter(l => l !== level));
                          }
                        }}
                      />
                      <label htmlFor={level} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Maximum Budget ($/hr)</h3>
                <Slider
                  defaultValue={[200]}
                  max={200}
                  step={5}
                  value={budget}
                  onValueChange={setBudget}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  Up to ${budget[0]}/hr
                </div>
              </div>
            </div>
          </div>

          {/* Freelancers List Section */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <Card
                  key={freelancer.id}
                  className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/freelancer/${freelancer.id}`)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={freelancer.image}
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{freelancer.name}</h3>
                      <p className="text-gray-600">{freelancer.expertise}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {freelancer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{freelancer.rating}</span>
                        </div>
                        <span className="text-lg font-semibold">${freelancer.budget}/hr</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerList;