import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AddDomain = () => {
  const navigate = useNavigate();
  const [domainName, setDomainName] = useState("");

  const handleAddDomain = () => {
    // Placeholder for adding domain functionality
    console.log("Adding domain:", domainName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-wide inline-block">
            ADD DOMAIN
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mt-4 rounded-full" />
        </div>

        {/* Add Domain Form */}
        <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Plus className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Create New Domain
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-foreground/80 mb-2 font-medium">
                Domain Name
              </label>
              <Input
                type="text"
                placeholder="Enter domain name..."
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="input-modern h-12 text-lg"
              />
            </div>

            <Button
              onClick={handleAddDomain}
              className="btn-hero w-full text-lg h-14"
            >
              Add Domain
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDomain;
