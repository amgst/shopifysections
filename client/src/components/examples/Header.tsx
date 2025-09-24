import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        shopName="Demo Fashion Store" 
        installedSectionsCount={7}
      />
      <div className="p-8">
        <p className="text-muted-foreground">
          Header is sticky and includes theme toggle, search, and profile menu.
          Try switching between light and dark modes!
        </p>
      </div>
    </div>
  );
}