import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, Download, Eye } from "lucide-react";
import type { Section } from "@shared/schema";

interface SectionCardProps {
  section: Section;
  onPreview: (section: Section) => void;
  onInstall: (section: Section) => void;
}

export default function SectionCard({ section, onPreview, onInstall }: SectionCardProps) {
  const handlePreview = () => {
    console.log('Preview triggered for section:', section.name);
    onPreview(section);
  };

  const handleInstall = () => {
    console.log('Install triggered for section:', section.name);
    onInstall(section);
  };

  return (
    <Card className="group hover-elevate transition-all duration-200 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={section.previewImage} 
            alt={section.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePreview}
                className="bg-background/80 backdrop-blur-sm"
                data-testid="button-preview"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {section.isPopular && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Popular
              </Badge>
            )}
            {section.isFree ? (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                ${section.price}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm leading-tight" data-testid="text-section-name">
            {section.name}
          </h3>
          {section.rating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span data-testid="text-rating">{section.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2" data-testid="text-description">
          {section.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="outline" data-testid="badge-category">
            {section.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span data-testid="text-downloads">{section.downloads.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleInstall}
          data-testid="button-install"
        >
          {section.isFree ? 'Add Section' : 'Install Section'}
        </Button>
      </CardFooter>
    </Card>
  );
}