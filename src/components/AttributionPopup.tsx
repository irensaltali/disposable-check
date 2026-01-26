import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const attributionDomains = [
    { name: "irensaltali.com", url: "https://irensaltali.com", description: "Personal website & portfolio" },
    { name: "sendfax.pro", url: "https://sendfax.pro", description: "Professional fax service" },
    { name: "zenrise.app", url: "https://zenrise.app", description: "Wellness & productivity app" },
];

interface AttributionPopupProps {
    trigger?: React.ReactNode;
}

export function AttributionPopup({ trigger }: AttributionPopupProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="link" className="h-auto p-0 text-amber-600 dark:text-amber-400 font-medium">
                        <Info className="mr-1 h-3 w-3" />
                        Attribution Required
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="text-xl">📋</span> Attribution Requirements
                    </DialogTitle>
                    <DialogDescription>
                        Free tier API usage requires a visible backlink to one of our partner sites.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">How to Attribute</h4>
                        <p className="text-sm text-muted-foreground">
                            Add a visible link on your website or application footer, credits page, or API documentation. The link must be:
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                            <li>Publicly visible (not hidden or cloaked)</li>
                            <li>A dofollow link (no rel="nofollow")</li>
                            <li>Active for as long as you use the API</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Choose One Link</h4>
                        <div className="space-y-2">
                            {attributionDomains.map((domain) => (
                                <a
                                    key={domain.name}
                                    href={domain.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors group"
                                >
                                    <div>
                                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                            {domain.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{domain.description}</p>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                        <h4 className="font-medium text-sm">Example Attribution</h4>
                        <div className="bg-muted p-3 rounded-md">
                            <code className="text-xs">
                                {`<a href="https://irensaltali.com">Powered by DisposableCheck</a>`}
                            </code>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
