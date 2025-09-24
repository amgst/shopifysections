import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Star, Download, Heart, Code, Settings } from "lucide-react";
import type { Section } from "@shared/schema";

interface SectionPreviewModalProps {
  section: Section | null;
  isOpen: boolean;
  onClose: () => void;
  onInstall: (section: Section) => void;
}

export default function SectionPreviewModal({ 
  section, 
  isOpen, 
  onClose, 
  onInstall 
}: SectionPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'settings'>('preview');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!section) return null;

  const handleInstall = () => {
    console.log('Install triggered from preview modal:', section.name);
    onInstall(section);
    onClose();
  };

  const handleFavorite = () => {
    console.log('Favorite toggled:', !isFavorited);
    setIsFavorited(!isFavorited);
  };

  const handleTabChange = (tab: 'preview' | 'code' | 'settings') => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Preview Area */}
          <div className="lg:col-span-2 bg-muted/30">
            <DialogHeader className="p-6 border-b bg-background">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-semibold" data-testid="text-modal-title">
                  {section.name}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFavorite}
                    data-testid="button-favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                  <Button onClick={handleInstall} data-testid="button-install-modal">
                    {section.isFree ? 'Add Section' : `Install - $${section.price}`}
                  </Button>
                </div>
              </div>
            </DialogHeader>

            {/* Tab Navigation */}
            <div className="flex border-b bg-background">
              <Button
                variant={activeTab === 'preview' ? 'default' : 'ghost'}
                className="rounded-none border-r"
                onClick={() => handleTabChange('preview')}
                data-testid="tab-preview"
              >
                Preview
              </Button>
              <Button
                variant={activeTab === 'code' ? 'default' : 'ghost'}
                className="rounded-none border-r"
                onClick={() => handleTabChange('code')}
                data-testid="tab-code"
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="rounded-none"
                onClick={() => handleTabChange('settings')}
                data-testid="tab-settings"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto p-6">
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                        <Code className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium">Live Preview</p>
                      <p className="text-sm text-muted-foreground">
                        Interactive preview would appear here
                      </p>
                    </div>
                  </div>
                  <img 
                    src={section.previewImage} 
                    alt={section.name}
                    className="w-full rounded-lg border"
                    data-testid="img-preview"
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-auto">
                      <code data-testid="text-liquid-code">
                        {section.liquidCode || `<!-- ${section.name} Section -->
<div class="section-${section.category.toLowerCase().replace(/\s+/g, '-')}">
  <div class="container">
    <h2>{{ section.settings.heading | default: '${section.name}' }}</h2>
    <p>{{ section.settings.description | default: '${section.description}' }}</p>
  </div>
</div>

{% schema %}
{
  "name": "${section.name}",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "${section.name}"
    },
    {
      "type": "textarea",
      "id": "description", 
      "label": "Description",
      "default": "${section.description}"
    }
  ]
}
{% endschema %}`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium">Customizable Settings</p>
                    <p className="text-sm text-muted-foreground">
                      Configure colors, fonts, spacing and content after installation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="bg-background border-l p-6 overflow-auto">
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {section.isPopular && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
                <Badge variant="outline" data-testid="badge-category-modal">
                  {section.category}
                </Badge>
                {section.isFree ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Free
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    ${section.price}
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground" data-testid="text-description-modal">
                  {section.description}
                </p>
              </div>

              <Separator />

              {/* Stats */}
              <div className="space-y-3">
                <h4 className="font-semibold">Stats</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Downloads</span>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span data-testid="text-downloads-modal">{section.downloads.toLocaleString()}</span>
                  </div>
                </div>
                {section.rating && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span data-testid="text-rating-modal">{section.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fully responsive design</li>
                  <li>• Customizable colors & fonts</li>
                  <li>• Mobile optimized</li>
                  <li>• SEO friendly</li>
                  <li>• Easy to customize</li>
                </ul>
              </div>

              <Separator />

              {/* Installation Note */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Installation:</strong> This section will be automatically added to your theme. 
                  You can then drag and drop it anywhere in your store using the theme editor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}